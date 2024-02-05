export interface IMessage extends IMessageBody {
  reply_message?: IMessageBody
  message_img?: string
}

interface IMessageBody {
  event: string
  id: number
  date?: number
  username: string
  usernameId?: number
  message: string
  time?: any
}
