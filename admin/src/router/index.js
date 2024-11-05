import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from '@/views/AdminPages/DashboardView.vue';
import AdminLayout from "@/layouts/AdminLayout.vue";
import { authMiddleware } from "@/middleware/adminAuth.js";
import MenuView from "@/views/AdminPages/Menu/MenuView.vue";
import MenuAddView from "@/views/AdminPages/Menu/MenuAddView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: authMiddleware,
  },
  {
    path: '/admin',
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
      },
      {
        path: 'menu',
        name: 'menu',
        redirect: '/admin/menu/all',
        children: [
          {
            path: 'all',
            name: 'allMenu',
            component: MenuView,
          },
          {
            path: 'edit/:id',
            name: 'editMenu',
            component: MenuView,
          },
          {
            path: 'add',
            name: 'addNewMenu',
            component: MenuAddView,
          }
        ]
      }
    ],
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
