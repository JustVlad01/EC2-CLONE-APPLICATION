import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeLayout from "@/layouts/HomeLayout.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import {useRestaurantStore} from "@/stores/restaurantState.js";
import OrderView from "@/views/Order/OrderView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:restaurantId',
      props: true,
      component: HomeLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'order',
          name: 'order',
          component: OrderView,
        }
        ]
    },
    {
      path: '/:pathMatch(.*)*', // 404
      name: 'not-found',
      component: NotFoundView,
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const restaurantStore = useRestaurantStore();
  const restaurantId = to.params.restaurantId;

  if (restaurantId) {
    await restaurantStore.getRestaurantData(restaurantId);
  }

  next();
});

export default router
