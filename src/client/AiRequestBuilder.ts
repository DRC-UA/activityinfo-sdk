import {Ai} from './Ai'
import Content = Ai.Request.Content
import {MakeOptional} from '@axanc/ts-utils'
import {AiClient} from './AiClient'

export class AiRequestBuilder {
  static readonly wrapRequestContents = (content: Content[]): Ai.Request => {
    return {
      changes: content,
    }
  }

  static readonly makeRequest = (content: MakeOptional<Content, 'recordId' | 'parentRecordId'>): Content => {
    return 1 as any
  }

  static readonly makeRequestContent = (content: MakeOptional<Content, 'recordId' | 'parentRecordId'>): Content => {
    const recordId = content.recordId ?? AiClient.generateId()
    return {
      recordId,
      parentRecordId: content.parentRecordId ?? null,
      ...content,
    }
  }
}
