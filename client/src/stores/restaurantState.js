import { defineStore } from 'pinia';
import axios from 'axios';

export const useRestaurantStore = defineStore('restaurant', {
  state: () => ({
    restaurant: null,
    loading: false,
    error: null,
  }),
  actions: {
    async getRestaurantData(id) {
      if (this.restaurant) return;

      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/${id}`);
        this.restaurant = response.data;
      } catch (error) {
        console.error('Failed to fetch restaurant data:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});