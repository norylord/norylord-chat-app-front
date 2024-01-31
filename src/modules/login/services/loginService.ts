import { type IUserStore } from '../../user/store'
import { computed } from 'vue'
import { setToLocalStorage } from '../../../core/utils/localStorage.ts'

interface ILoginService {
  makeLogin: (login: string) => void
}

export class LoginService implements ILoginService {
  constructor (private readonly store: IUserStore) {
  }

  async makeLogin (login: string) {
    console.log(login.length)
    if (login.length < 6 || login.length > 20) {
      return 'Некорректная длина ника, должно быть от 6 до 20 символов'
    }
    this.store.user.username = login
    setToLocalStorage('username', login)
  }

  isLogin = computed(() => {
    return Boolean(this.store.user.username && this.store.user.username.length > 0)
  })
}
