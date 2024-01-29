import { createApp } from 'vue'
import './assets/styles/global.scss'
import App from './App.vue'
import router from '../core/router/index.ts'
import { createPinia } from 'pinia'

const vue = createApp(App)
const pinia = createPinia()
vue.use(router)
vue.use(pinia)
vue.mount('#app')
