import { createRouter, createWebHistory } from 'vue-router'
import Simple from '@/views/Simple.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'simple',
      component: Simple
    },
  ]
})

export default router
