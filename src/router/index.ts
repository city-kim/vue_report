import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashBoard.vue')
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import('@/views/ChartList.vue')
    }
  ]
})

export default router
