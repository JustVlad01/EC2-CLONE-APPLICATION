<script setup>
import { ref, computed, reactive } from 'vue';
import { useSignUpStore } from "@/stores/signUpStore.js";
import InputField from "@/components/UI/InputField.vue";
import FormGroup from "@/components/UI/FormGroup.vue";
import axios from "axios";
import SubscriptionSection from "@/components/SubscriptionSection.vue";
import SubscriptionItem from "@/components/SubscriptionItem.vue";

// Import the store
const signUpStore = useSignUpStore();

// Restaurant registration progress
const progress = reactive([
  { title: 'Restaurant Details', completed: true },
  { title: 'Owner Details', completed: false },
  { title: 'Subscription', completed: false },
  { title: 'Confirmation', completed: false }
]);

// Split the data into different objects
const data = reactive({
  restaurant: {
    name: "",
    address: { country: '', city: '', county: '', eircode: ''},
    phoneNumber: '',
    email: '',
    website: '',
    openingHours: {
      monday: { open: '', close: '' },
      tuesday: { open: '', close: '' },
      wednesday: { open: '', close: '' },
      thursday: { open: '', close: '' },
      friday: { open: '', close: '' },
      week: { open: '', close: ''},
      saturday: { open: '', close: '' },
      sunday: { open: '', close: ''}
    },
    cuisineType: ''
  },
  owner: {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    username: ''
  },
  subscription: {
    plan: '',
  }
});

// Computed step which will count the current active step index
const currentStep = ref(0);

const totalSteps = computed(() => progress.length);

// Move to the next step
const nextStep = () => {
  if (currentStep.value < totalSteps.value - 1) {
    progress[currentStep.value + 1].completed = true;
    currentStep.value += 1;
  }
};

// Move to the previous step
const prevStep = () => {
  if (currentStep.value > 0) {
    progress[currentStep.value].completed = false;
    currentStep.value -= 1;
  }
};

// Function to submit the form data
const submitForm = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/hotel/create`, data);
    console.log(response.data);
  } catch (error) {
    console.error('Error submitting form:', error.response.data);
  }
};

// Track selected plan in parent component
const selectedPlan = ref(''); // To store the currently selected plan

const handleSelectPlan = (plan) => {
  selectedPlan.value = plan; // Set the selected plan in the parent
  data.subscription.plan = plan; // Store the plan in the subscription data
};

// Check if the current step is completed
const isLastStep = computed(() => currentStep.value === totalSteps.value - 1);
</script>

<template>
  <div class="sign-up-block">
    <h1>Register your restaurant now</h1>

    <!-- Progress bar -->
    <div class="sign-up-progress">
      <div class="progress-item" v-for="(item, index) in progress" :key="item.title" :class="{ completed: item.completed, active: index === currentStep }">
        <div class="progress-circle"></div>
        <span>{{ item.title }}</span>
      </div>
    </div>

    <!-- Form groups based on current step -->
    <div class="forms">
      <!-- Step 1: Restaurant Details -->
      <div v-if="currentStep === 0">
        <FormGroup label="Restaurant info">
          <InputField type="text" label="Restaurant Name" v-model="data.restaurant.name.value" required />
          <div v-if="data.restaurant.name.error">Erorr pizdec</div>
          <InputField type="text" label="Phone Number" v-model="data.restaurant.phoneNumber" required/>
          <InputField type="email" label="Restaurant Email" v-model="data.restaurant.email" required/>
        </FormGroup>
        <FormGroup label="Opening hours">
          <FormGroup sub-label="Monday to Friday">
            <InputField type="time" label="Open" v-model="data.restaurant.openingHours.week.open" required/>
            <InputField type="time" label="Close" v-model="data.restaurant.openingHours.week.close" required/>
          </FormGroup>
          <FormGroup sub-label="Weekend">
            <InputField type="time" label="Saturday open" v-model="data.restaurant.openingHours.saturday.open" required/>
            <InputField type="time" label="Saturday close" v-model="data.restaurant.openingHours.saturday.close" required/>
            <InputField type="time" label="Sunday open" v-model="data.restaurant.openingHours.sunday.open" required/>
            <InputField type="time" label="Sunday close" v-model="data.restaurant.openingHours.sunday.close" required/>
          </FormGroup>
        </FormGroup>
        <FormGroup label="Address">
          <InputField type="text" label="Country" v-model="data.restaurant.address.country" required/>
          <InputField type="text" label="County" v-model="data.restaurant.address.county" required/>
          <InputField type="text" label="City" v-model="data.restaurant.address.city" required/>
          <InputField type="text" label="Eircode" v-model="data.restaurant.address.eircode" required/>
        </FormGroup>
        <FormGroup label="Other">
          <InputField type="text" label="Website" v-model="data.restaurant.website" />
          <InputField type="text" label="Cuisine Type" v-model="data.restaurant.cuisineType" />
        </FormGroup>
      </div>

      <!-- Step 2: Owner Details -->
      <div v-if="currentStep === 1">
        <FormGroup label="General Manager data">
          <InputField type="text" label="Full Name" v-model="data.owner.name" required/>
          <InputField type="text" label="Username" v-model="data.owner.username" required/>
          <InputField type="phone" label="Phone Number" v-model="data.owner.phoneNumber" required/>
        </FormGroup>
        <FormGroup label="Credentials">
          <InputField type="password" label="Password" v-model="data.owner.password" required/>
          <InputField type="email" label="Email" v-model="data.owner.email" required/>
        </FormGroup>
      </div>

      <!-- Step 3: Subscription Details -->
      <div v-if="currentStep === 2">
        <FormGroup label="Subscription">
          <SubscriptionSection>
            <SubscriptionItem plan="Basic" price="50" :selected="selectedPlan === 'Basic'" @selectPlan="handleSelectPlan" />
            <SubscriptionItem plan="Pro" price="100" :selected="selectedPlan === 'Pro'" recommended @selectPlan="handleSelectPlan" />
            <SubscriptionItem plan="Premium" price="200" :selected="selectedPlan === 'Premium'" @selectPlan="handleSelectPlan" />
          </SubscriptionSection>
        </FormGroup>
      </div>

      <!-- Step 4: Confirmation -->
      <div v-if="currentStep === 3">
        <h2>Review your data</h2>
        <p><strong>Restaurant Name:</strong> {{ data.restaurant.name }}</p>
        <p><strong>Restaurant Address:</strong> {{ data.restaurant.address }}</p>
        <p><strong>Phone Number:</strong> {{ data.restaurant.phoneNumber }}</p>
        <p><strong>Restaurant Email:</strong> {{ data.restaurant.email }}</p>
        <p><strong>Website:</strong> {{ data.restaurant.website }}</p>
        <p><strong>Opening Hours:</strong> {{ data.restaurant.openingHours }}</p>
        <p><strong>Cuisine Type:</strong> {{ data.restaurant.cuisineType }}</p>
        <p><strong>Owner Name:</strong> {{ data.owner.name }}</p>
        <p><strong>Owner Email:</strong> {{ data.owner.email }}</p>
        <p><strong>Owner Phone Number:</strong> {{ data.owner.phoneNumber }}</p>
        <p><strong>Subscription:</strong> {{ data.subscription.plan }}</p>
        <p><strong>Business License:</strong> {{ data.subscription.businessLicense }}</p>
        <p><strong>Tax ID:</strong> {{ data.subscription.taxID }}</p>
        <p><strong>Payment Methods:</strong> {{ data.subscription.paymentMethods }}</p>
        <p><strong>Offers Delivery:</strong> {{ data.subscription.deliveryOptions ? 'Yes' : 'No' }}</p>
        <p><strong>Has Reservation System:</strong> {{ data.subscription.reservationSystem ? 'Yes' : 'No' }}</p>
      </div>

      <!-- Navigation Buttons -->
      <div class="buttons">
        <div v-if="currentStep === 0"></div>
        <button @click="prevStep" v-if="currentStep > 0">Back</button>
        <button @click="nextStep" v-if="!isLastStep">Next</button>
        <button @click="submitForm" v-if="isLastStep">Submit</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forms{
  max-width: 1100px;
  margin: 30px auto;
}

.sign-up-progress {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.progress-item {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.progress-item:not(:last-child) {
  margin-right: 20px;
}

.progress-item.completed > .progress-circle {
  background-color: #6969ff;
}

.progress-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f1f1f1;
  display: inline-block;
  border: 2px solid #000000;
  margin-bottom: 10px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #6969ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #5757d1;
}
</style>
