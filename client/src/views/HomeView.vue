<script setup>
import { useRestaurantStore } from '@/stores/restaurantState';
import { useRouter } from 'vue-router';

const restaurantStore = useRestaurantStore();
const router = useRouter();

const handleOrder = () => {
  router.push({ name: 'order' });
};

const handleBooking = () => {
  router.push({ name: 'booking' });
};
</script>

<template>
  <main>
    <!-- Header Section -->
    <header>
      <h1 class="restaurant-name">{{ restaurantStore.restaurant?.name || 'Loading...' }}</h1>
      <p class="restaurant-address">
        {{ restaurantStore.restaurant?.address?.city }},
        {{ restaurantStore.restaurant?.address?.county }},
        {{ restaurantStore.restaurant?.address?.country }},
        {{ restaurantStore.restaurant?.address?.eircode }}
      </p>
      <p class="restaurant-contact">📞 {{ restaurantStore.restaurant?.phone }} | ✉️ {{ restaurantStore.restaurant?.email }}</p>
    </header>

    <!-- Action Buttons -->
    <section class="buttons">
      <button @click="handleOrder" class="btn-order">Order Food</button>
      <button @click="handleBooking" class="btn-booking">Book a Table</button>
    </section>

    <!-- About Section -->
    <section class="about">
      <h2>About Us</h2>
      <p>Welcome to {{ restaurantStore.restaurant?.name }}! We’re here to provide the best service.</p>
    </section>

    <!-- Opening Hours Section -->
    <section class="opening-hours">
      <h2>Opening Hours</h2>
      <ul>
        <li>Weekdays: {{ restaurantStore.restaurant?.openingHours?.week?.open }} - {{ restaurantStore.restaurant?.openingHours?.week?.close }}</li>
        <li>Saturday: {{ restaurantStore.restaurant?.openingHours?.saturday?.open }} - {{ restaurantStore.restaurant?.openingHours?.saturday?.close }}</li>
        <li>Sunday: {{ restaurantStore.restaurant?.openingHours?.sunday?.open }} - {{ restaurantStore.restaurant?.openingHours?.sunday?.close }}</li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
/* General Styling */
main {
  font-family: Arial, sans-serif;
  padding: 20px;
  text-align: center;
}

/* Header Styling */
header {
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 10px;
}

.restaurant-name {
  font-size: 2.5rem;
  margin: 0;
}

.restaurant-address {
  color: #666;
  margin: 10px 0;
}

.restaurant-contact {
  font-size: 1.1rem;
  color: #444;
}

/* About Section Styling */
.about {
  margin-bottom: 20px;
}

.about h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

/* Opening Hours Section Styling */
.opening-hours {
  margin-bottom: 20px;
}

.opening-hours h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.opening-hours ul {
  list-style-type: none;
  padding: 0;
}

.opening-hours li {
  margin: 5px 0;
  font-size: 1.1rem;
  color: #555;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

button {
  padding: 15px 30px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-order {
  background-color: #4caf50;
  color: white;
}

.btn-order:hover {
  background-color: #45a049;
}

.btn-booking {
  background-color: #2196f3;
  color: white;
}

.btn-booking:hover {
  background-color: #1976d2;
}
</style>
