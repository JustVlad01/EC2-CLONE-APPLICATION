<script setup>
import { orderTypes, useOrderStore } from "@/stores/orderState.js";
import { computed, ref } from "vue";

const orderStore = useOrderStore();

const customerAmountTouched = ref(false);

const sectionType = computed(() => {
  return orderStore.type === orderTypes.table ? "table" : "room";
});

// Validate if the entered number exists
const validateNumber = () => {
  if (orderStore.number !== null && orderStore.number !== "") {
    orderStore.checkNumberExists();
  }
};

// Validate customersAmount (greater than 0) and only show error after interaction
const validateCustomersAmount = computed(() => {
  return orderStore.customersAmount > 0 || !customerAmountTouched.value;
});

// Button disable logic
const btnDisabled = computed(() => {
  return (
      orderStore.customersAmount > 0 &&
      orderStore.numberExists &&
      orderStore.number !== null &&
      orderStore.number !== ""
  );
});
</script>

<template>
  <section class="number-picker">
    <div class="guestAmount">
      <p>Enter number of guests:</p>
      <input
          type="number"
          v-model="orderStore.customersAmount"
          min="1"
          @blur="customerAmountTouched.value = true"
      />
    </div>
    <div v-if="!validateCustomersAmount" class="error-message">
      Please enter a valid number of guests.
    </div>
    <div class="sectionNumber">
      <p>Enter {{ sectionType }} number:</p>
      <input
          type="number"
          @input="validateNumber"
          v-model="orderStore.number"
      />
    </div>
    <div v-if="orderStore.number && !orderStore.numberExists" class="error-message">
      The selected {{ sectionType }} does not exist.
    </div>
    <div
        class="btn-blue-full"
        :class="{ disabled: !btnDisabled }"
        @click="btnDisabled ? validateNumber : null"
    >
      Continue
    </div>
  </section>
</template>

<style scoped>
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
}

.number-picker{
  max-width: 500px;
  background-color: white;
  border: 2px solid #f2f2f2;
  border-radius: 5px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.number-picker p{
  font-size: 1.2rem;
}

.number-picker input{
  width: 100px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #9a9a9a;
  margin-top: 10px;
  font-size: 2rem;
}
</style>