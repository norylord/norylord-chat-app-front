import { type IUserStore } from '../store'

interface IUserService {
  store: IUserStore

}

export class UserService implements IUserService {
  constructor (private readonly store: IUserStore) {
  }

  getUsername () {
    return this.store.user.username
  }

  setUsername (username: string) {
    this.store.user.username = username
  }

  getMessages () {
    return this.store.messages
  }

  getLastMessage () {
    return this.store.messages[this.store.messages.length - 1]
  }
}
