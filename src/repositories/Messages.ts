import { di, mongoose } from '@seedtag/node-sdk'
import { MessageModel } from '../models/Message'

@di.Provide()
export class MessagesRepository {

  private schema = new mongoose.Schema({
    sender: String,
    receiver: String,
    message: String
  })

  private dbModel = mongoose.model('Messages', this.schema)

  find (query): Promise<MessageModel[]> {
    return this.dbModel.find(query).exec() as any
  }

  save (message: MessageModel): Promise<MessageModel> {
    return this.dbModel.create(message) as any
  }
}
