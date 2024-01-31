import { defineStore } from 'pinia'

export interface ISocketStore {
  socket: WebSocket
  isConnected: boolean
  users: Array<{ id: number, username: string }>
}

export const useSocketStore = defineStore({
  id: 'socket',
  state: (): ISocketStore => ({
    socket: new WebSocket('ws://localhost:4000'),
    isConnected: false,
    users: []
  }),
  getters: {},
  actions: {}
})
