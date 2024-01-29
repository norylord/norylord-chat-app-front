import { type ISocketStore } from '../store'

interface ISocketService {
  isConnected: boolean
  socket: any
  makeConnection: () => void
}
interface TMessage {
  event: string
  id: number
  date: string
  username: string
  message: string
}
export class SocketService implements ISocketService {
  isConnected: boolean

  constructor (private readonly store: ISocketStore) {
    this.isConnected = false
  }

  makeConnection () {
    // this.store.socket.onopen = () => {
    //   this.isConnected = true
    // }
    // this.store.socket.onclose = () => {
    //   console.log('soсket закрыт')
    // }
    // this.store.socket.onerror = () => {
    //   console.log('soсket произошла ошибка')
    // }
  }

  sendMessage (message: TMessage) {
    this.store.socket.send(JSON.stringify(message))
  }
}
