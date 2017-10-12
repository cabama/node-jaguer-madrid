import { di } from '@seedtag/node-sdk'
import { MessagesRepository } from '../repositories/Messages'
import { MessageModel } from '../models/Message'

@di.Provide()
export class SendMessage {
  constructor (private repository: MessagesRepository) {}

  execute (message: MessageModel): Promise<MessageModel> {
    return this.repository.save(message)
  }
}
