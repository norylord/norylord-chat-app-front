import { type ISocketStore } from '../socketStore.ts'
import { type IUserStore } from '../../user/store'
import { type TMessage } from '../../messages/enitity/Messages.ts'

interface ISocketService {
  isConnected: boolean
  initConnection: () => void
  getPreviousMessages: () => void
  sendMessage: () => void
}

export class SocketService implements ISocketService {
  isConnected: boolean

  constructor (private readonly socketStore: ISocketStore, private readonly userStore: IUserStore) {
    this.isConnected = false
  }

  initConnection () {
    this.socketStore.socket.onopen = () => {
      const connectionMessage: TMessage = {
        username: this.userStore.user.username,
        usernameId: this.userStore.user.id,
        id: Date.now(),
        date: Date.now(),
        message: '',
        event: 'connection'
      }
      this.sendMessage(connectionMessage)
      this.getPreviousMessages()
      this.socketStore.isConnected = true
      this.isConnected = true
    }
    this.socketStore.socket.onclose = () => {
      console.log('soсket закрыт')
    }
    this.socketStore.socket.onerror = () => {
      console.log('soсket произошла ошибка')
    }
    this.socketStore.socket.onmessage = ({ data }) => {
      const parsedMessage: TMessage = JSON.parse(data)
      if (parsedMessage instanceof Array) {
        this.userStore.messages = JSON.parse(data)
        return
      }

      switch (parsedMessage.event) {
        case 'usersLength': {
          this.socketStore.users = parsedMessage.message
          break
        }
        default: {
          this.userStore.messages = [...this.userStore.messages, JSON.parse(data)]
        }
      }
    }
  }

  getPreviousMessages () {
    const message: TMessage = {
      username: this.userStore.user.username,
      message: '',
      id: Date.now(),
      event: 'get-messages',
      time: new Date().getTime()
    }
    this.sendMessage(message)
  }

  sendMessage (message: TMessage) {
    this.socketStore.socket.send(JSON.stringify(message))
  }

  getUsersCount () {
    return this.socketStore.users.length
  }
}
