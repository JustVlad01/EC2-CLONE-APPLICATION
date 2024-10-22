<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const password = ref('');

// Function to handle sign-in logic
const handleSignIn = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
      username: username.value,
      password: password.value,
    }, {withCredentials: true});

    //redirect to the dashboard
    if (response.status === 200) {
      try {
        console.log('Redirecting...');
        await router.push('/admin/dashboard');
      } catch (e) {
        console.error('Router push failed:', e);
      }
    }
  } catch (error) {
    console.error('Error during sign-in:', error.response.data);
  }
};
</script>

<template>
  <div class="sign-in-container">
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

h1 {
  margin-bottom: 20px;
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
</style>
