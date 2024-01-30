import { defineStore } from 'pinia'
import { type TMessage } from '../../messages/enitity/Messages.ts'

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
      username: JSON.parse(localStorage.getItem('username')) ?? '',
      id: JSON.parse(localStorage.getItem('userId')) ?? Date.now()
    },
    messages: []
  }),
  getters: {},
  actions: {}
})
