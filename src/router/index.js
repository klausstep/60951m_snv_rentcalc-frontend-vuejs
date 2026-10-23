import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Flats from '@/components/Flats.vue'
import Payments from '@/components/Payments.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/flats',
      component: Flats,
    },
    {
      path: '/payments',
      component: Payments,
    },
  ],
})

export default router