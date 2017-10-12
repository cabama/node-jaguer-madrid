import { di } from '@seedtag/node-sdk'
import { Route, Controller, Get, Post, Delete, Body, Path, Security } from 'tsoa'
import { GetMessageBySender } from '../usecases/GetMessageBySender'
import { SendMessage } from '../usecases/SendMessage'
import { MessageModel } from '../models/Message'

@Route('public/messages')
export class BlacklistController extends Controller {

  @di.Inject getMessageBySenderUseCase: GetMessageBySender
  @di.Inject sendMessageUseCase: SendMessage

  @Get('{sender}')
  async getMessages (@Path('sender') sender: string): Promise<MessageModel[]> {

    return this.getMessageBySenderUseCase
      .execute(sender)
  }

  @Post('')
  async postMessage (@Body() message: MessageModel): Promise<MessageModel> {

    return this.sendMessageUseCase
      .execute(message)
  }

  @Post('auth')
  @Security('adminRequired')
  async authenticatedPostMessage (@Body() message: MessageModel): Promise<MessageModel> {

    return this.sendMessageUseCase
      .execute(message)
  }
}
