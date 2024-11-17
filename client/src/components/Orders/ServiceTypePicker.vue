<script setup>
import {useOrderStore, orderTypes} from "@/stores/orderState.js";
import {useRestaurantStore} from "@/stores/restaurantState.js";

const orderStore = useOrderStore();
const restaurantStore = useRestaurantStore();

const selectType = (type) => {
  orderStore.type = type;
  if (orderStore.type === orderTypes.table) {
    orderStore.fetchTables(restaurantStore.restaurant._id);
  } else if (orderStore.type === orderTypes.room) {
    orderStore.fetchRooms(restaurantStore.restaurant._id);
  }
}
</script>

<template>
  <section class="service-type-picker">
    <p>Choose type of service:</p>
    <div class="options-buttons">
      <div class="option" @click="selectType(orderTypes.table)">
        Table
      </div>
      <div class="option" @click="selectType(orderTypes.room)">
        Room
      </div>
    </div>
  </section>
</template>

<style scoped>
.service-type-picker{
  max-width: 500px;
  background-color: white;
  border: 2px solid #f2f2f2;
  border-radius: 5px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
}

.service-type-picker p{
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.options-buttons{
  display: flex;
  justify-content: center;
  gap: 20px;
}

.option{
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.option:hover{
  background-color: #e6e6e6;
}
</style>