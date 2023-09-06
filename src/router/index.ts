import { createRouter, createWebHistory } from 'vue-router'
import Simple from '@/views/SimpleComponents.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'simple',
      component: Simple
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import('@/views/ChartList.vue')
    }
  ]
})

export default router
