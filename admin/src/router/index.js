import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/Dashboard/DashboardView.vue'
import {loadLayoutMiddleware} from "@/router/middleware/loadLayoutMiddleware.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'SignLayout' }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { layout: 'AdminLayout' }
    },
    ]
})

// Before each route changing the loadLayoutMiddleware middleware is executing.
router.beforeEach(loadLayoutMiddleware)

export default router
