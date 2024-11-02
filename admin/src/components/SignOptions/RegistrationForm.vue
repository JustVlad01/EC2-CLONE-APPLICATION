<script setup>
import { ref, computed, reactive } from 'vue';
import { useSignUpStore } from "@/stores/signUpStore.js";
import InputField from "@/components/UI/InputField.vue";
import FormGroup from "@/components/UI/FormGroup.vue";
import axios from "axios";

// Import the store
const signUpStore = useSignUpStore();

// Registration progress
const progress = reactive([
  { title: 'Registration', completed: true },
  { title: 'Confirmation', completed: false }
]);

// Data structure for the registration form
const data = reactive({
  account: {
    username: '',
    password: '',
    confirmPassword: ''
  },
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: {
      country: '',
      city: '',
      state: '',
      zipCode: ''
    }
  }
});

// Validation errors tracking
const validationErrors = reactive({
  username: false,
  password: false,
  confirmPassword: false,
  email: false,
  firstName: false,
  lastName: false,
  country: false,
  city: false,
  zipCode: false,
  passwordsMatch: false
});

// Computed step to track the current step index
const currentStep = ref(0);
const totalSteps = computed(() => progress.length);

// Validation function
const validateStep = () => {
  validationErrors.username = data.account.username === '';
  validationErrors.password = data.account.password === '';
  validationErrors.confirmPassword = data.account.confirmPassword === '';
  validationErrors.firstName = data.personalInfo.firstName === '';
  validationErrors.lastName = data.personalInfo.lastName === '';
  validationErrors.email = data.personalInfo.email === '';
  validationErrors.country = data.personalInfo.address.country === '';
  validationErrors.city = data.personalInfo.address.city === '';
  validationErrors.zipCode = data.personalInfo.address.zipCode === '';
  validationErrors.passwordsMatch = data.account.password !== data.account.confirmPassword;

  return !Object.values(validationErrors).includes(true);
};

// Function to move to the next step
const nextStep = () => {
  if (validateStep() && currentStep.value < totalSteps.value - 1) {
    progress[currentStep.value + 1].completed = true;
    currentStep.value += 1;
  }
};

// Function to move to the previous step
const prevStep = () => {
  if (currentStep.value > 0) {
    progress[currentStep.value].completed = false;
    currentStep.value -= 1;
  }
};

// Function to submit the form data
const submitForm = async () => {
  if (validateStep()) {
    try {
      // Add verification code from the store to the form data
      const registrationData = {
        ...data,
        verificationCode: signUpStore.verificationCode // Attach the code from the store
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/create`, registrationData);
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error.response.data);
    }
  }
};

// Check if it's the last step of the registration
const isLastStep = computed(() => currentStep.value === totalSteps.value - 1);
</script>

<template>
  <div class="form-block">
    <h1>Register your account</h1>

    <!-- Progress bar -->
    <div class="registration-progress">
      <div class="progress-item" v-for="(item, index) in progress" :key="item.title" :class="{ completed: item.completed, active: index === currentStep }">
        <div class="progress-circle"></div>
        <span>{{ item.title }}</span>
      </div>
    </div>

    <!-- Registration form -->
    <div class="forms">
      <!-- Step 1: Registration -->
      <div v-if="currentStep === 0">
        <FormGroup label="Account Information">
          <InputField type="text" label="Username" v-model="data.account.username" :error="validationErrors.username" required />
          <InputField type="password" label="Password" v-model="data.account.password" :error="validationErrors.password" required/>
          <InputField type="password" label="Confirm Password" v-model="data.account.confirmPassword" :error="validationErrors.confirmPassword || validationErrors.passwordsMatch" required/>
        </FormGroup>
        <FormGroup label="Personal Information">
          <InputField type="text" label="First Name" v-model="data.personalInfo.firstName" :error="validationErrors.firstName" required/>
          <InputField type="text" label="Last Name" v-model="data.personalInfo.lastName" :error="validationErrors.lastName" required/>
          <InputField type="email" label="Email" v-model="data.personalInfo.email" :error="validationErrors.email" required/>
          <InputField type="text" label="Phone Number" v-model="data.personalInfo.phoneNumber" />
        </FormGroup>
        <FormGroup label="Address">
          <InputField type="text" label="Country" v-model="data.personalInfo.address.country" :error="validationErrors.country" required/>
          <InputField type="text" label="City" v-model="data.personalInfo.address.city" :error="validationErrors.city" required/>
          <InputField type="text" label="State" v-model="data.personalInfo.address.state" />
          <InputField type="text" label="Zip Code" v-model="data.personalInfo.address.zipCode" :error="validationErrors.zipCode" required/>
        </FormGroup>
      </div>

      <!-- Step 2: Confirmation -->
      <div v-if="currentStep === 1">
        <h2>Review your details</h2>
        <p><strong>Username:</strong> {{ data.account.username }}</p>
        <p><strong>Email:</strong> {{ data.personalInfo.email }}</p>
        <p><strong>Full Name:</strong> {{ data.personalInfo.firstName }} {{ data.personalInfo.lastName }}</p>
        <p><strong>Phone Number:</strong> {{ data.personalInfo.phoneNumber }}</p>
        <p><strong>Address:</strong> {{ data.personalInfo.address.country }}, {{ data.personalInfo.address.city }}, {{ data.personalInfo.address.state }}, {{ data.personalInfo.address.zipCode }}</p>
      </div>

      <!-- Navigation Buttons -->
      <div class="buttons">
        <button @click="prevStep" v-if="currentStep > 0">Back</button>
        <button @click="nextStep" v-if="!isLastStep">Next</button>
        <button @click="submitForm" v-if="isLastStep">Submit</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.registration-block {
  background-color: #f5f5f5; /* Light gray background for the container */
  padding: 40px 0; /* Add some spacing at the top and bottom */
}

.forms {
  max-width: 1100px; /* Increase the width to make the form similar to the first image */
  margin: 30px auto; /* Center the form horizontally */
  background-color: white; /* White background for the form */
  padding: 30px; /* Add some padding inside the form */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow for better separation */
  border-radius: 8px; /* Rounded corners for a smooth look */
}

.registration-progress {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.progress-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.progress-item:not(:last-child) {
  margin-right: 20px;
}

.progress-item.completed > .progress-circle {
  background-color: #6969ff; /* Fill color when a step is completed */
}

.progress-circle {
  width: 50px; /* Larger circle size to match the first image */
  height: 50px;
  border-radius: 50%;
  background-color: #f1f1f1; /* Default color */
  display: inline-block;
  border: 2px solid #000000; /* Black border for the circles */
  margin-bottom: 10px;
}

.buttons {
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #6969ff; /* Same color as the progress circle when active */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px; /* Space between buttons */
}

button:hover {
  background-color: #5757d1; /* Darker shade on hover */
}
</style>
