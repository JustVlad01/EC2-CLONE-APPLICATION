<script setup>
import { ref, computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, numeric, minLength } from '@vuelidate/validators';
import InputField from "@/components/UI/InputField.vue";
import FormGroup from "@/components/UI/FormGroup.vue";
import axios from "axios";
import SubscriptionSection from "@/components/SignOptions/SubscriptionSection.vue";
import SubscriptionItem from "@/components/SignOptions/SubscriptionItem.vue";
import { useSignUpStore } from "@/stores/signUpStore.js";
import { useRouter } from "vue-router";

// Router
const router = useRouter();

// Store
const signupStore = useSignUpStore();

const errorSubmit = ref(null);

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
    name: '',
    address: { country: '', city: '', county: '', eircode: '' },
    phoneNumber: '',
    email: '',
    website: '',
    openingHours: {
      monday: { open: '', close: '' },
      tuesday: { open: '', close: '' },
      wednesday: { open: '', close: '' },
      thursday: { open: '', close: '' },
      friday: { open: '', close: '' },
      week: { open: '', close: '' },
      saturday: { open: '', close: '' },
      sunday: { open: '', close: '' }
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
    promo: ''
  }
});

// Validation rules
const rules = {
  restaurant: {
    name: { required },
    phoneNumber: { required, numeric },
    email: { required, email },
    address: {
      country: { required },
      city: { required },
      county: { required },
      eircode: { required }
    },
  },
  owner: {
    name: { required },
    email: { required, email },
    phoneNumber: { required, numeric },
    password: { required, minLength: minLength(8) },
    username: { required },
  },
};

// Vuelidate hook
const v$ = useVuelidate(rules, data);

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
  v$.value.$touch();
  if (v$.value.$invalid) {
    alert('Please fill out all required fields correctly.');
    return;
  }
  try {
    signupStore.registerHotel(data, router);
  } catch (error) {
    errorSubmit.value = error.response.data;
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
  <div class="form-block">
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
          <InputField
              type="text"
              label="Restaurant Name"
              v-model="data.restaurant.name"
              :error="v$.restaurant.name.$error ? 'Restaurant Name is required.' : ''"
              @blur="v$.restaurant.name.$touch()"
              required
          />
          <InputField
              type="text"
              label="Phone Number"
              v-model="data.restaurant.phoneNumber"
              :error="v$.restaurant.phoneNumber.$error ? 'Phone Number is required and must be numeric.' : ''"
              @blur="v$.restaurant.phoneNumber.$touch()"
              required
          />
          <InputField
              type="email"
              label="Restaurant Email"
              v-model="data.restaurant.email"
              :error="v$.restaurant.email.$error ? 'Valid Email is required.' : ''"
              @blur="v$.restaurant.email.$touch()"
              required
          />
        </FormGroup>

        <FormGroup label="Opening hours">
          <FormGroup sub-label="Monday to Friday">
            <InputField type="time" label="Open" v-model="data.restaurant.openingHours.week.open" />
            <InputField type="time" label="Close" v-model="data.restaurant.openingHours.week.close" />
          </FormGroup>
          <FormGroup sub-label="Weekend">
            <InputField type="time" label="Saturday open" v-model="data.restaurant.openingHours.saturday.open" />
            <InputField type="time" label="Saturday close" v-model="data.restaurant.openingHours.saturday.close" />
            <InputField type="time" label="Sunday open" v-model="data.restaurant.openingHours.sunday.open" />
            <InputField type="time" label="Sunday close" v-model="data.restaurant.openingHours.sunday.close" />
          </FormGroup>
        </FormGroup>
        <FormGroup label="Address">
          <InputField
              type="text"
              label="Country"
              v-model="data.restaurant.address.country"
              :error="v$.restaurant.address.country.$error ? 'Country is required.' : ''"
              @blur="v$.restaurant.address.country.$touch()"
              required />
          <InputField
              type="text"
              label="County"
              v-model="data.restaurant.address.county"
              :error="v$.restaurant.address.county.$error ? 'County is required.' : ''"
              @blur="v$.restaurant.address.county.$touch()"
              required />
          <InputField
              type="text"
              label="City"
              v-model="data.restaurant.address.city"
              :error="v$.restaurant.address.city.$error ? 'City is required.' : ''"
              @blur="v$.restaurant.address.city.$touch()"
              required />
          <InputField
              type="text"
              label="Eircode"
              v-model="data.restaurant.address.eircode"
              :error="v$.restaurant.address.eircode.$error ? 'Eircode is required.' : ''"
              @blur="v$.restaurant.address.eircode.$touch()"
              required />
        </FormGroup>
        <FormGroup label="Other">
          <InputField type="text" label="Website" v-model="data.restaurant.website" />
          <InputField type="text" label="Cuisine Type" v-model="data.restaurant.cuisineType" />
        </FormGroup>
      </div>

      <!-- Step 2: Owner Details -->
      <div v-if="currentStep === 1">
        <FormGroup label="General Manager data">
          <InputField
              type="text"
              label="Full Name"
              v-model="data.owner.name"
              :error="v$.owner.name.$error ? 'Owner Name is required.' : ''"
              @blur="v$.owner.name.$touch()"
              required
          />
          <InputField
              type="text"
              label="Username"
              v-model="data.owner.username"
              :error="v$.owner.username.$error ? 'Username is required.' : ''"
              @blur="v$.owner.username.$touch()"
              required
          />
          <InputField
              type="phone"
              label="Phone Number"
              v-model="data.owner.phoneNumber"
              :error="v$.owner.phoneNumber.$error ? 'Phone Number is required and must be numeric.' : ''"
              @blur="v$.owner.phoneNumber.$touch()"
              required
          />
        </FormGroup>
        <FormGroup label="Credentials">
          <InputField
              type="password"
              label="Password"
              v-model="data.owner.password"
              :error="v$.owner.password.$error ? 'Password must be at least 8 characters long.' : ''"
              @blur="v$.owner.password.$touch()"
              required
          />
          <InputField
              type="email"
              label="Email"
              v-model="data.owner.email"
              :error="v$.owner.email.$error ? 'Valid Email is required.' : ''"
              @blur="v$.owner.email.$touch()"
              required
          />
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
          <span class="or-divider">OR</span>
          <InputField type="text" class="center" label="Promo Code" v-model="data.subscription.promo" />
        </FormGroup>
      </div>

      <!-- Step 4: Confirmation -->
      <div v-if="currentStep === 3">
        <FormGroup label="Confirm data" class="confirm-form-group">
          <FormGroup class="confirm-group" sub-label="Restaurant Info">
            <p><strong>Restaurant Name:</strong> {{ data.restaurant.name }}</p>
            <p><strong>Address:</strong> {{ data.restaurant.address.country }}, {{ data.restaurant.address.city }}, {{ data.restaurant.address.county }} - {{ data.restaurant.address.eircode }}</p>
            <p><strong>Phone Number:</strong> {{ data.restaurant.phoneNumber }}</p>
            <p><strong>Email:</strong> {{ data.restaurant.email }}</p>
            <p><strong>Website:</strong> {{ data.restaurant.website }}</p>
            <p><strong>Opening Hours (Week):</strong> {{ data.restaurant.openingHours.week.open }} - {{ data.restaurant.openingHours.week.close }}</p>
            <p><strong>Opening Hours (Saturday):</strong> {{ data.restaurant.openingHours.saturday.open }} - {{ data.restaurant.openingHours.saturday.close }}</p>
            <p><strong>Opening Hours (Sunday):</strong> {{ data.restaurant.openingHours.sunday.open }} - {{ data.restaurant.openingHours.sunday.close }}</p>
            <p><strong>Cuisine Type:</strong> {{ data.restaurant.cuisineType }}</p>
          </FormGroup>

          <!-- Owner Data -->
          <FormGroup class="confirm-group" sub-label="Owner Details">
            <p><strong>Name:</strong> {{ data.owner.name }}</p>
            <p><strong>Username:</strong> {{ data.owner.username }}</p>
            <p><strong>Phone Number:</strong> {{ data.owner.phoneNumber }}</p>
            <p><strong>Email:</strong> {{ data.owner.email }}</p>
          </FormGroup>

          <!-- Subscription Data -->
          <FormGroup class="confirm-group" sub-label="Subscription">
            <p><strong>Selected Plan:</strong> {{ data.subscription.plan }}</p>
            <p><strong>Promo Code:</strong> {{ data.subscription.promo || 'None' }}</p>
          </FormGroup>
        </FormGroup>
        <span class="error-submit" v-if="errorSubmit">{{errorSubmit}}<span @click="errorSubmit.value = ''">X</span></span>
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

<style>
.confirm-group > .inner {
  flex-direction: column;
}

.confirm-form-group .inner {
  flex-direction: column;
}

.forms {
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

.center {
  margin: 0 auto;
}

.error-submit {
  background-color: #ff6969;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.or-divider {
  text-align: center;
  font-weight: bold;
  margin: 0 auto;
  width: 100%;
  display: block;
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
  padding: 20px 0;
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
