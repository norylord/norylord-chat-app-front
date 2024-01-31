import { defineStore } from 'pinia'
import { type TMessage } from '../../messages/enitity/Messages.ts'
import { getFromLocalStorage } from '../../../core/utils/localStorage.ts'

export interface IUserStore {
  user: {
    username: string
    id: number
  }
  messages: TMessage[]
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserStore => ({
    user: {
      username: getFromLocalStorage('username') ?? '',
      id: getFromLocalStorage('userId') ?? Date.now()
    },
    messages: []
  }),
  getters: {},
  actions: {}
})
