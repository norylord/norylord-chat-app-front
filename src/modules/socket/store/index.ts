import { defineStore } from 'pinia'
export interface ISocketStore {
  socket: WebSocket
}

export const useSocketStore = defineStore({
  id: 'socket',
  state: (): ISocketStore => ({
    socket: new WebSocket('wss://norylord-chat-app.onrender.com')
  }),
  getters: {},
  actions: {}
})
