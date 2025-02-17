import {AiBuilderSchema} from './AiBuilderSchema'
import * as prettier from 'prettier'
import * as fs from 'node:fs'
import {fnSwitch, Obj} from '@alexandreannic/ts-utils'

export class AiBuilderFile {
  constructor(private forms: AiBuilderSchema.Form[]) {}

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

  readonly make = async (outDir: string) => {
    const [rootForm, ...subForms] = this.forms

    const filePath = outDir + '/AiType' + rootForm.code + '.ts'
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
        .map(
          ([choicesKey, choices]) =>
            `"${choicesKey}": { ${choices?.map(o => `"${o.label.replaceAll('"', '\\"')}": '${o.id}'`).join(',\n    ')}}`,
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
          const mapValue = fnSwitch(
            q.type,
            {
              enumerated: `a.${q.code} ? options['${q.typeRef}'][a.${q.code}!] : undefined`,
              reference: `a.${q.code} ? '${q.choicesId}' + ':' + options['${q.typeRef}'][a.${q.code}!] : undefined`,
            },
            _ => `a.${q.code}`,
          )
          return `${q.id}: ${mapValue}`
        })
        .join(',\n'),
      '}',
      '},',
      ...form.questions
        .filter(_ => _.type === 'subform')
        .map(
          _ =>
            `...(a.${_.code} ?? []).flatMap((_, i) => AiType${_.typeRef}.buildRequest(_, recordId +'i'+ i, recordId))`,
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
        .flatMap(q => [
          `/**\n      ${q.label}${q.description ? '\n      ' + q.description.replaceAll(/\s/g, ' ') : ''}\n    */`,
          `${q.code}${q.required ? '' : '?'}: ${this.getType(q)}`,
        ])
        .join('\n'),
      '}',
    ].join('\n')
  }

  private getType(q: AiBuilderSchema.Question): string {
    return fnSwitch(
      q.type,
      {
        subform: `AiType${q.typeRef}[]`,
        reference: q.typeRef ? `Opt<'${q.typeRef}'>` : 'string',
        enumerated: q.typeRef ? `Opt<'${q.typeRef}'>` : 'string',
        quantity: 'number',
      },
      _ => 'string',
    )
  }
}
