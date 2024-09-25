<script setup>
import { ref, onMounted, watch } from 'vue';
import Stripe from 'stripe'

const stripe = ref(null);
const elements = ref(null);
const clientSecret = ref(''); // You'll need to get this from your backend
const selectedPlan = ref('');
const paymentElement = ref(null);

// Mock subscription options - in a real case, you'd get these from your backend
const subscriptionPlans = [
  { id: 'basic', name: 'Basic Plan - $10/month', price: 1000 },
  { id: 'premium', name: 'Premium Plan - $30/month', price: 3000 },
  { id: 'enterprise', name: 'Enterprise Plan - $50/month', price: 5000 },
];

onMounted(async () => {
  stripe.value = await Stripe('pk_test_51PoljERu16csUmNnZMCMbAyMZ2nlOvE0dU6wtEjQ7PSykbnk2txOP2RRAqYBqtac4wggm2FHRNdFOHL94H0bIrkA008MxvbqUS');

  // Normally, you'd get the client secret when the user selects a plan
  // In this example, assume the clientSecret is fetched from your backend based on the selected plan
  // fetchClientSecret(selectedPlan.value);

  const appearance = { theme: 'stripe' };
  elements.value = stripe.value.elements({ clientSecret: clientSecret.value, appearance });
  paymentElement.value = elements.value.create('payment');
  paymentElement.value.mount('#payment-element');
});

watch(selectedPlan, async (newPlan) => {
  if (newPlan) {
    // Fetch new clientSecret for the selected plan from your backend
    // fetchClientSecret(newPlan);

    // Update the payment element with the new clientSecret
    paymentElement.value.update({ clientSecret: clientSecret.value });
  }
});
</script>

<template>
  <div>
    <h2>Select a Subscription Plan</h2>
    <select v-model="selectedPlan">
      <option disabled value="">Please select a plan</option>
      <option v-for="plan in subscriptionPlans" :key="plan.id" :value="plan.id">
        {{ plan.name }}
      </option>
    </select>

    <!-- Stripe Payment Element -->
    <div id="payment-element"></div>
  </div>
</template>

<style scoped>
#payment-element {
  margin-top: 20px;
}
</style>
