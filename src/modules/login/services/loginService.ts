import { type IUserStore } from '../../user/store'
import { computed } from 'vue'

interface ILoginService {
  makeLogin: (login: string) => void
}
export class LoginService implements ILoginService {
  constructor (private readonly store: IUserStore) {
  }

  async makeLogin (login: string) {
    this.store.user.username = login
    localStorage.setItem('username', login)
  }

  isLogin = computed(() => {
    return Boolean(this.store.user.username && this.store.user.username.length > 0)
  })
}
