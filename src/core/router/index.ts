import {
  createRouter,
  createWebHistory,
  type Router,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw
} from 'vue-router'

import { modules } from '../modules.ts'

// Components

// Pinia Store

// Unimplemented in Vuetify 3.3.1
// import { goTo } from 'vuetify/lib/services/goto/index.mjs';

/** Router Rules */
const routes: RouteRecordRaw[] = [...modules.flatMap((module) => module.routes)]

/** Vue Router */
const router: Router = createRouter({
  /**
     * History Mode
     *
     * @see {@link https://router.vuejs.org/guide/essentials/history-mode.html }
     */
  history: createWebHistory(import.meta.env.BASE_URL), // createWebHashHistory(import.meta.env.BASE_URL)
  /*
      scrollBehavior: (to, _from, savedPosition) => {
        let scrollTo: number | string = 0;

        if (to.hash) {
          scrollTo = to.hash;
        } else if (savedPosition) {
          scrollTo = savedPosition.top;
        }
        return goTo(scrollTo);
      },
      */
  routes
})

export default router
