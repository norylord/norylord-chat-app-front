import { defineStore } from 'pinia'
import { type TMessage } from '../../messages/enitity/Messages.ts'
import { getFromLocalStorage, getUsernameFromLocalStorage } from '../../../core/utils/localStorage.ts'

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
      username: getUsernameFromLocalStorage(),
      id: getFromLocalStorage('userId') ?? Date.now()
    },
    messages: []
  }),
  getters: {},
  actions: {}
})
