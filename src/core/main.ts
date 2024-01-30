import Vue, { createApp } from 'vue'
import './assets/styles/global.scss'
import App from './App.vue'
import router from '../core/router/index.ts'
import { createPinia } from 'pinia'
const pinia = createPinia()

const vue = createApp(App)

vue.use(router)
vue.use(pinia)
vue.mount('#app')
