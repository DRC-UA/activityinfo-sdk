import {AiBuilderSchema} from './AiBuilderParser'
import * as prettier from 'prettier'
import * as fs from 'node:fs'
import {match, Obj} from '@axanc/ts-utils'
import {AiBuilder} from './AiBuilder'

export class AiBuilderFile {
  constructor(
    private forms: AiBuilderSchema.Form[],
    private useQuestionCode?: boolean,
    private maxListSize = 20000,
  ) {}

  private readonly formatCode = async (textContent: string): Promise<string> => {
    return await prettier.format(textContent, {
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 200,
      tabWidth: 2,
      semi: false,
      arrowParens: 'avoid',
      proseWrap: 'preserve',
      bracketSpacing: false,
      parser: 'typescript',
    })
  }

  readonly make = async (outDir: string, fileName?: string) => {
    const [rootForm, ...subForms] = this.forms

    const filePath = outDir + '/AiType' + (fileName ?? rootForm.code) + '.ts'
    console.log(`Generate into ${filePath}`)

    const textContent = this.makeNamespace(rootForm, subForms.map(_ => this.makeNamespace(_)).join('/'))

    fs.mkdirSync(outDir, {recursive: true})
    try {
      fs.writeFileSync(filePath, await this.formatCode(textContent))
    } catch (e) {
      console.log(`${rootForm.code} contains error.`)
      fs.writeFileSync(filePath, textContent)
    }
  }

  private getQuestionKey(q: AiBuilderSchema.Question) {
    return this.useQuestionCode ? q.code : q.label
  }

  private readonly makeNamespace = (form: AiBuilderSchema.Form, additionalContent: string = ''): string => {
    return [
      `export type AiType${form.code} = AiType${form.code}.Type`,
      `export namespace AiType${form.code} {`,
      this.makeInterface(form),
      this.makeMappingFunction(form),
      this.makeChoices(form),
      additionalContent,
      '}',
    ].join('\n\n')
  }

  private readonly makeChoices = (form: AiBuilderSchema.Form) => {
    return [
      `export const options = {`,
      Obj.entries(form.choices)
        .map(([choicesKey, choices]) =>
          [
            `"${choicesKey}": { ${choices?.map(o => `"${o.label.replaceAll('"', '\\"')}": '${o.id}'`).join(',\n    ')}}`,
            choices.length > this.maxListSize ? ` as Record<string, string>` : '',
          ].join(''),
        )
        .join(',\n'),
      '}',
    ].join('\n')
  }

  private readonly makeMappingFunction = (form: AiBuilderSchema.Form) => {
    return [
      `export const buildRequest = (a: Type, recordId: string, parentRecordId: string | null = null) => {`,
      `return [`,
      `{`,
      `formId: '${form.id}',`,
      `recordId,`,
      `parentRecordId,`,
      `fields: {`,
      form.questions
        .filter(_ => _.type !== 'subform')
        .map(q => {
          const mapValue = match(q.type)
            .cases({
              enumerated: `a['${this.getQuestionKey(q)}'] ? options['${q.typeRef}'][a['${this.getQuestionKey(q)}']!] : undefined`,
              reference: (() => {
                const hasChoices = !!form.choices[q.typeRef!]
                const mapChoice = hasChoices
                  ? `options['${q.typeRef}'][a['${this.getQuestionKey(q)}']!]`
                  : `a['${this.getQuestionKey(q)}']`
                return `a['${this.getQuestionKey(q)}'] ? '${q.choicesId}' + ':' + ${mapChoice} : undefined`
              })(),
            })
            .default(() => `a['${this.getQuestionKey(q)}']`)
          return `${q.id}: ${mapValue}`
        })
        .join(',\n'),
      '}',
      '},',
      ...form.questions
        .filter(_ => _.type === 'subform')
        .map(
          _ =>
            `...(a['${this.getQuestionKey(_)}'] ?? []).flatMap((_, i) => AiType${_.typeRef}.buildRequest(_, recordId +'i'+ ('' + i).padStart(2, '0'), recordId))`,
        ),
      ']',
      '}',
    ].join('\n')
  }

  private readonly makeInterface = (form: AiBuilderSchema.Form) => {
    return [
      `type Opt<T extends keyof typeof options> = keyof (typeof options)[T]`,
      `export interface Type`,
      '{',
      form.questions
        .flatMap(q => {
          const choices = form.choices[q.typeRef!] ?? []
          const tooManyOptions = choices.length > this.maxListSize
          const skipTyping = tooManyOptions || (q.type === 'reference' && !form.choices[q.typeRef!])
          const tab = '      '
          const comment = [
            this.useQuestionCode ? (q.label ? tab + `${q.label}` : undefined) : undefined,
            q.description ? tab + `${q.description}` : undefined,
            tooManyOptions ? tab + `⚠️ Typing is omitted due to the large number of choices.` : undefined,
            tooManyOptions ? tab + `➡️ Directly use label from AiType${form.code}.options['${q.typeRef}']` : undefined,
          ].filter(_ => !!_)
          return [
            ...(comment.length > 0 ? [`/**`, ...comment, tab.slice(2) + `*/`] : []),
            `'${this.getQuestionKey(q)}'${q.required ? '' : '?'}: ${this.getType(q, skipTyping)}`,
          ]
        })
        .filter(_ => !!_)
        .join('\n'),
      '}',
    ].join('\n')
  }

  private getType(q: AiBuilderSchema.Question, skipTyping?: boolean): string {
    if (skipTyping) return 'string'
    return match(q.type)
      .cases({
        subform: `AiType${q.typeRef}[]`,
        reference: q.typeRef ? `Opt<'${q.typeRef}'>` : 'string',
        enumerated: q.typeRef ? `Opt<'${q.typeRef}'>` : 'string',
        quantity: 'number',
      })
      .default(() => 'string')
  }
}
