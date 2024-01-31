import { type IUserStore } from '../store'
import { computed } from 'vue'
import { setToLocalStorage } from '../../../core/utils/localStorage.ts'

interface IUserService {
  store: IUserStore

}

export class UserService implements IUserService {
  constructor (readonly store: IUserStore) {
  }

  getUsername () {
    return this.store.user.username
  }

  getUsernameLength = computed(() => {
    if (this.store.user.username !== null) {
      return this.store.user.username.length
    }
    return 0
  })

  setUsername (username: string) {
    this.store.user.username = username
  }

  setUsernameId (usernameId: number) {
    this.store.user.id = usernameId
    setToLocalStorage('userId', usernameId)
  }

  getUsernameId () {
    return this.store.user.id
  }

  getMessages () {
    return this.store.messages
  }

  getLastMessage () {
    return this.store.messages[this.store.messages.length - 1]
  }
}
