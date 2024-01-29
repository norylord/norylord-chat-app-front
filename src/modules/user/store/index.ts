import { defineStore } from 'pinia'
export interface IUserStore {
  user: {
    username: string
    id: number
  }
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserStore => ({
    user: {
      username: localStorage.getItem('username') ?? '',
      id: Date.now()
    }
  }),
  getters: {},
  actions: {}
})
