<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const emit = defineEmits(['toggle-sidebar']); // Emit event to parent

const handleToggle = () => {
  emit('toggle-sidebar'); // Emit the event to toggle sidebar
};

const userProfile = ref({
  name: '',
  role: '',
  priority: null,
});

async function fetchUserProfile() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
      withCredentials: true, // Include credentials for cookies if needed
    });
    userProfile.value = response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
}

// Fetch profile when component is mounted
onMounted(fetchUserProfile);
</script>

<template>
  <header>
    <div class="toggle-sidebar" @click="handleToggle">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-list" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"></path>
      </svg>
    </div>
    <div class="profile-info">
      <span class="role">{{ userProfile.role }}</span>
      <span>Welcome, {{ userProfile.name }}!</span>
    </div>
  </header>
</template>

<style scoped>
header{
  background-color: #333333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.profile-info {
  text-transform: capitalize;
  font-size: 12px;
  border-left: 1px solid white;
  padding-left: 10px;
  cursor: pointer;
}

.role{
  font-weight: bold;
  margin-right: 10px;
  background-color: #1f4ed8;
  padding: 3px 5px;
  border-radius: 5px;
  user-select: none;
}
</style>