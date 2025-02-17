import {Ai} from '../client/Ai'
import {AiBuilderFormArgs} from './AiBuilder'
import {AiClient} from '../client/AiClient'
import {seq} from '@alexandreannic/ts-utils'
import {slugify} from '../utils/Utils'

export namespace AiBuilderSchema {
  export type Question = {
    id: Ai.Id
    code: string
    label: string
    description?: string
    required?: boolean
    type: Ai.FormElementType
    typeRef?: string
    choicesId?: string
  }

  export interface Choice {
    id: string
    label: string
  }

  export type TypeRef = string

  export type Form = {
    id: Ai.Id
    code: string
    label: string
    questions: Question[]
    choices: Record<TypeRef, Choice[]>
  }

  export class Parser {
    constructor(
      private args: AiBuilderFormArgs,
      private formTree: Ai.FormTree,
      private sdk: AiClient,
    ) {}

    readonly parseForms = (): Promise<Form[]> => {
      return this.parseForm(this.args.formId)
    }

    private readonly parseForm = async (formId: Ai.Id): Promise<Form[]> => {
      const schema = this.formTree[formId].schema
      const ignoredInputs: Ai.FormElementType[] = ['section', 'calculated']
      const elements = schema.elements
        .filter(_ => !ignoredInputs.includes(_.type) && !this.args.questionSettings[_.label]?.skip)
        .map(_ => {
          if (this.args.questionSettings[_.label]?.skipChoices) {
            _.type = 'FREE_TEXT'
          }
          return _
        })
      const questions = elements.flatMap(this.getQuestion)
      const choices = await this.getChoices(elements)
      const subForms = await Promise.all(
        elements.filter(_ => _.type === 'subform').flatMap(_ => this.parseForm(_.typeParameters!.formId!)),
      )
      return [
        {
          id: formId,
          choices,
          questions,
          code: schema.code ?? slugify(schema.label),
          label: schema.label,
        },
        ...subForms.flatMap(_ => _),
      ]
    }

    private readonly getQuestion = (q: Ai.FormElement): Question => {
      return {
        ...q,
        choicesId: q.typeParameters?.range?.[0]?.formId,
        typeRef: this.getTypeRef(q),
      }
    }

    private readonly getTypeRef = (q: Ai.FormElement): TypeRef | undefined => {
      switch (q.type) {
        case 'reference': {
          const choicesId = q.typeParameters!.range![0].formId
          return choicesId ? this.formTree[choicesId].schema.label : undefined
        }
        case 'enumerated':
          return q.label
        case 'subform': {
          const subSchema = this.formTree[q.typeParameters!.formId!].schema
          return subSchema.code ?? slugify(subSchema.label)
        }
      }
    }

    private readonly getColumns = (question: Ai.FormElement): Ai.FormElement[] => {
      const qSettings = this.args.questionSettings[question.label]
      const choiceId = question.typeParameters?.range![0].formId
      if (!choiceId) return []

      const getDefaultColumnIds = (): Ai.FormElement[] => {
        return this.formTree[choiceId].schema.elements.filter(_ => _.required && _.key)
      }
      const getSelectedColumns = (): Ai.FormElement[] | undefined => {
        const columnsLabels = qSettings?.selectColumnByLabels
        if (!columnsLabels) return undefined
        return this.formTree[choiceId].schema.elements.filter(_ => columnsLabels.includes(_.label))
      }
      return getSelectedColumns() ?? getDefaultColumnIds()
    }

    private getChoices = async (questions: Ai.FormElement[]): Promise<Record<TypeRef, Choice[]>> => {
      const choicesFromReference = await Promise.all(
        seq(questions)
          .filter(_ => _.type === 'reference')
          .distinct(_ => _.typeParameters!.range![0].formId)
          .map(this.getChoicesFromReference)
          .get(),
      )
      const choicesFromEnum = questions.filter(_ => _.type === 'enumerated').map(this.getChoicesFromEnum)
      return seq([...choicesFromReference, ...choicesFromEnum]).groupByAndApply(
        _ => _.typeRef,
        _ => _.flatMap(_ => _.choices).get(),
      )
    }

    private readonly getChoicesFromEnum = (
      question: Ai.FormElement,
    ): {
      questionId: Ai.Id
      typeRef: TypeRef
      choices: Choice[]
    } => {
      return {
        questionId: question.id,
        typeRef: this.getTypeRef(question)!,
        choices: question.typeParameters!.values ?? [],
      }
    }

    private readonly getChoicesFromReference = async (
      question: Ai.FormElement,
    ): Promise<{
      questionId: Ai.Id
      typeRef: TypeRef
      choices: Choice[]
    }> => {
      const qSettings = this.args.questionSettings[question.label]
      const columns = this.getColumns(question)
      const choiceId = question.typeParameters!.range![0].formId
      const choices = await this.sdk.getColumns(
        choiceId,
        columns.map(_ => _.id),
        question.validationCondition?.replace(question.id + '.', ''),
      )
      const filteredChoices = (() => {
        const filter = qSettings?.filterChoices
        if (filter) return choices.filter(_ => filter(_.label))
        if (this.args.optionsLimit !== undefined) return choices.splice(0, this.args.optionsLimit)
        return choices
      })()

      return {
        questionId: question.id,
        typeRef: this.getTypeRef(question)!,
        choices: filteredChoices.map(_ => ({..._, label: this.sanitalizeNonASCIIChar(_.label)})),
      }
    }

    private readonly sanitalizeNonASCIIChar = (_: string) => _.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }
}
