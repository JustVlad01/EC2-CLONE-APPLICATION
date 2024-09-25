<script setup>
import { ref } from 'vue';
import PlansSection from "@/components/PlansSection.vue";

const currentStep = ref(1); // To track which step is currently active

// Define emit for emitting events
const emit = defineEmits(['switchView']); // Register the custom event

// Form data (you can expand this with more fields as needed)
const formData = ref({
  hotelName: '',
  ownerName: '',
  email: '',
  phone: '',
  address: '',
  subscriptionPlan: '',
  acceptTerms: false,
});

// Steps data to track dropdown-like behavior
const steps = ref([
  { id: 1, title: 'Hotel Details', open: true },
  { id: 2, title: 'Subscription Plan', open: false },
  { id: 3, title: 'Terms and Conditions', open: false },
]);

const goBack = () => {
  emit('switchView', 'mainBlock');
}

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        username: '',
        address: {
          country: '',
          eircode: '',
          county: '',
          city: '',
          parking: 'true',
          street: '',
        },
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://localhost:3000/api/hotel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        const result = await response.json();
        console.log('Form submitted successfully:', result);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  },
};

// Function to switch between steps
const goToStep = (step) => {
  steps.value.forEach((s) => (s.open = false)); // Close all steps
  steps.value.find((s) => s.id === step).open = true; // Open the selected step
  currentStep.value = step;
};

// Function to handle Next and Back button clicks
const nextStep = () => {
  if (currentStep.value < steps.value.length) {
    goToStep(currentStep.value + 1);
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    goToStep(currentStep.value - 1);
  }
};

const submitForm = () => {
  if (formData.value.acceptTerms) {
    // Handle form submission logic here, e.g., API call
    console.log('Form submitted:', formData.value);
  } else {
    alert('You must accept the terms and conditions before submitting.');
  }
};
</script>

<template>
  <div class="registration-form">
    <!-- Step 1: Hotel Details -->
    <div class="form-step" v-for="step in steps" :key="step.id">
      <h2 class="step-header">{{ step.title }}</h2>
        <div class="step-content">
          <template v-if="step.id === 1">
            <template>
              <div>
                <form @submit.prevent="submitForm">
                  <div>
                    <label for="name">Name:</label>
                    <input type="text" v-model="formData.name" id="name" required />
                  </div>

                  <div>
                    <label for="email">Email:</label>
                    <input type="email" v-model="formData.email" id="email" required />
                  </div>

                  <div>
                    <label for="password">Password:</label>
                    <input type="password" v-model="formData.password" id="password" required />
                  </div>

                  <div>
                    <label for="username">Username:</label>
                    <input type="text" v-model="formData.username" id="username" required />
                  </div>

                  <h3>Address</h3>
                  <div>
                    <label for="country">Country:</label>
                    <input type="text" v-model="formData.address.country" id="country" required />
                  </div>

                  <div>
                    <label for="eircode">Eircode:</label>
                    <input type="text" v-model="formData.address.eircode" id="eircode" required />
                  </div>

                  <div>
                    <label for="county">County:</label>
                    <input type="text" v-model="formData.address.county" id="county" required />
                  </div>

                  <div>
                    <label for="city">City:</label>
                    <input type="text" v-model="formData.address.city" id="city" required />
                  </div>

                  <div>
                    <label for="street">Street:</label>
                    <input type="text" v-model="formData.address.street" id="street" required />
                  </div>

                  <button type="submit">Submit</button>
                </form>
              </div>
            </template>

            <div class="form-group">
              <label for="hotelName">Hotel Name:</label>
              <input v-model="formData.hotelName" type="text" id="hotelName" required />
            </div>
            <div class="form-group">
              <label for="ownerName">Owner Name:</label>
              <input v-model="formData.ownerName" type="text" id="ownerName" required />
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input v-model="formData.email" type="email" id="email" required />
            </div>
            <div class="form-group">
              <label for="phone">Phone:</label>
              <input v-model="formData.phone" type="tel" id="phone" required />
            </div>
            <div class="form-group">
              <label for="address">Address:</label>
              <input v-model="formData.address" type="text" id="address" required />
            </div>
          </template>

          <!-- Step 2: Subscription Plan -->
          <template v-if="step.id === 2">
            <PlansSection></PlansSection>
          </template>

          <!-- Step 3: Terms and Conditions -->
          <template v-if="step.id === 3">
            <div class="form-group terms">
              <h3>Terms and Conditions</h3>
              <p>Please read and accept our terms and conditions before proceeding.</p>
              <div class="accept-terms">
                <input type="checkbox" v-model="formData.acceptTerms" id="acceptTerms" />
                <label for="acceptTerms">I accept the terms and conditions</label>
              </div>
            </div>
          </template>
        </div>
      <!-- Navigation Buttons -->
      <div class="navigation-buttons">
        <button @click="submitForm" v-if="step.id === steps.length">Submit</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.registration-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
  background-color: #f9f9f9;
  color: black;
  text-align: left;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.step-header {
  font-size: 1.5em;
  cursor: pointer;
  background-color: #0a6bcb;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.step-content {
  padding: 15px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 20px;
}

.accept-terms{
  display: flex;
}

.accept-terms > input{
  width: unset !important;
  margin-right: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group.terms {
  margin-top: 20px;
}

.form-group.terms p {
  margin-bottom: 10px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.navigation-buttons button {
  padding: 10px 20px;
  background-color: #1a4d7f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.navigation-buttons button:hover {
  background-color: #082c51;
}

/* Slide-down transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
