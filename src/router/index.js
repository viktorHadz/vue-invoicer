import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Missing route / leaving blank as I may want to use for authentication puroses later
    // This results in a warning when you try launching the app from route /
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
  linkActiveClass: 'router-active',
})

export default router
