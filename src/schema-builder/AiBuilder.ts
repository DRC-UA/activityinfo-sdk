import {AiClient, Api} from '../'
import {AiBuilderSchema} from './AiBuilderParser'
import {AiBuilderFile} from './AiBuilderFile'

export type AiBuilderFormArgs = {
  optionsLimit?: number
  formId: string
  fileName?: string
  questionSettings: Partial<
    Record<
      string,
      {
        skip?: boolean
        skipChoices?: boolean
        filterChoices?: (label: string) => boolean
        selectColumnByLabels?: string[]
      }
    >
  >
}

export class AiBuilder {
  constructor(
    private props: {
      activityInfoToken: string
      outDir: string
      optionsLimit?: number
      baseUrl?: string
    },
  ) {}

  readonly generateInterface = async (args: AiBuilderFormArgs) => {
    const sdk = new AiClient(this.props.activityInfoToken, this.props.baseUrl ? new Api(this.props.baseUrl) : undefined)
    const formTree = await sdk.getForm(args.formId)
    const forms = await new AiBuilderSchema.Parser(
      {optionsLimit: this.props.optionsLimit, ...args},
      formTree,
      sdk,
    ).parseForms()
    await new AiBuilderFile(forms).make(this.props.outDir)
  }
  // readonly generateInterface = async (args: AiBuilderFormArgs) => {
  //   const sdk = new AiClient(this.props.activityInfoToken, this.props.baseUrl ? new Api(this.props.baseUrl) : undefined)
  //   const formTree = await sdk.fetchForm(args.formId)
  //   // TODO: Here we assume there won't be more than 1 nested form, and that's not good :-)
  //   const [form, subForm] = await new AiBuilderSchemParser(
  //     {optionsLimit: this.props.optionsLimit, ...args},
  //     formTree,
  //     sdk,
  //   ).parse()
  //   const fileName = args.fileName ?? slugify(formTree[args.formId].schema.label)
  //   await new AiBuilderFileMaker(fileName, form, subForm).make(this.props.outDir)
  // }
}
