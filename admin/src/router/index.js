import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from '@/views/AdminPages/DashboardView.vue';
import AdminLayout from "@/layouts/AdminLayout.vue";
import {authMiddleware} from "@/middleware/adminAuth.js";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: authMiddleware,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminLayout,
    redirect: '/admin/dashboard',
    beforeEnter: authMiddleware,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardView,
      },
      {
        path: 'users',
        name: 'users',
        component: DashboardView,
      }
      ],
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;