import { createRouter, createWebHistory } from 'vue-router'
import ClientsView from '../views/ClientsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/clients',
      name: 'clients',
      component: ClientsView,
    },
    {
      path: '/items',
      name: 'items',
      component: () => import('../views/ItemsView.vue'),
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: () => import('../views/InvoiceView.vue'),
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('../views/EditorView.vue'),
    },
  ],
})

export default router
