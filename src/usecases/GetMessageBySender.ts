import { di } from '@seedtag/node-sdk'
import { MessagesRepository } from '../repositories/Messages'
import { MessageModel } from '../models/Message'

@di.Provide()
export class GetMessageBySender {
  constructor (private repository: MessagesRepository) {}

  execute (sender: string): Promise<MessageModel[]> {
    return this.repository.find({ sender })
  }
}
