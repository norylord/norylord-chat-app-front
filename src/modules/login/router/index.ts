import { type RouteRecordSingleView } from 'vue-router'

const loginRoutes: RouteRecordSingleView[] = [
  {
    path: '/login',
    name: 'Login',
    component: async () => await import('@/modules/login/pages/Login.vue')
  }
]

export default loginRoutes
