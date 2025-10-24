import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Items from '../views/Items.vue'
import Areas from '../views/Areas.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { title: 'Dashboard' }
  },
  {
    path: '/items',
    name: 'Items',
    component: Items,
    meta: { title: 'Itens Escaneados' }
  },
  {
    path: '/areas',
    name: 'Areas',
    component: Areas,
    meta: { title: 'Gerenciar Áreas' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Scan App Admin` || 'Scan App Admin'
  next()
})

export default router
