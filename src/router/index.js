import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: () => import('../views/MenuGrid.vue')
    },
    {
      path: '/basket',
      name: 'basket',
      component: () => import('../views/BasketView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
