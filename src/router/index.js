import { createRouter, createWebHistory } from 'vue-router';
import { FORBIDDEN_ROUTE_NAME } from '@/utils/constants';
import { tg } from "@/utils/telegram-sdk";

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
      path: `/${FORBIDDEN_ROUTE_NAME}`,
      name: FORBIDDEN_ROUTE_NAME,
      component: () => import('@/views/ForbiddenView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

const isProd = import.meta.env.PROD;
router.beforeEach((to, from, next) => {
  if (to.name != FORBIDDEN_ROUTE_NAME) {
    if (isProd) {
      if (tg.initData.length === 0) {
        next({ name: FORBIDDEN_ROUTE_NAME });
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router
