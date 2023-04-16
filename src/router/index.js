import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: () => import('@/views/MenuGrid.vue')
    },
    {
      path: '/:key/details',
      name: 'details',
      component: () => import('@/views/ItemDetailsView.vue')
    },
    {
      path: '/basket',
      name: 'basket',
      component: () => import('@/views/BasketView.vue')
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: () => import('@/views/DeliveryView.vue')
    }
    ,
    {
      path: '/forbidden',
      name: 'forbidden',
      component: () => import('@/views/ForbiddenView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
