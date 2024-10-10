<script setup>
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref('');
const uniqueCode = ref('');
const isFirstTime = ref(false);
const showUniqueCodeInput = ref(false);

// Function to handle sign-in logic
const handleSignIn = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signin`, {
      username: username.value,
      password: password.value,
    });

    // Assuming response contains a field indicating if it's the user's first time
    if (response.data.isFirstTime) {
      isFirstTime.value = true;
      showUniqueCodeInput.value = true;
    } else {
      console.log('User signed in successfully');
      // Redirect to the dashboard or another page after successful sign-in
    }
  } catch (error) {
    console.error('Error during sign-in:', error.response.data);
  }
};

// Function to handle first-time unique code submission
const handleUniqueCodeSubmission = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/verify-code`, {
      username: username.value,
      uniqueCode: uniqueCode.value,
    });

    if (response.data.success) {
      console.log('Unique code verified successfully');
      // Proceed with the regular sign-in and redirect to the dashboard or another page
    } else {
      console.error('Invalid unique code');
    }
  } catch (error) {
    console.error('Error verifying unique code:', error.response.data);
  }
};
</script>

<template>
  <div class="form-block">
    <h1>Sign In</h1>
    <div class="sign-in-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button @click="handleSignIn">Sign In</button>

      <!-- Unique Code input shown only if it's the user's first time -->
      <div v-if="showUniqueCodeInput" class="unique-code-section">
        <h2>Enter Your Unique Code</h2>
        <div class="form-group">
          <label for="uniqueCode">Unique Code</label>
          <input type="text" id="uniqueCode" v-model="uniqueCode" required />
        </div>
        <button @click="handleUniqueCodeSubmission">Submit Code</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sign-in-container {
  max-width: 500px;
  margin: 50px auto;
  background-color: #f9f9f9;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

.sign-in-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #6969ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #5757d1;
}

.unique-code-section {
  margin-top: 20px;
}
</style>
