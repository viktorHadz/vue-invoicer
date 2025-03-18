import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/clients',
      name: 'clients',
      component: () => import('../views/TheClients.vue'),
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: () => import('../views/TheInvoice.vue'),
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('../views/TheEditor.vue'),
    },
  ],
})

export default router
