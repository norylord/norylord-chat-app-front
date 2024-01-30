import { defineStore } from 'pinia'
import {TMessage} from "../../messages/enitity/Messages.ts";
export interface IUserStore {
  user: {
    username: string
    id: number
  },
  messages: TMessage[]
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserStore => ({
    user: {
      username: localStorage.getItem('username') ?? '',
      id: Date.now()
    },
    messages: []
  }),
  getters: {},
  actions: {}
})
