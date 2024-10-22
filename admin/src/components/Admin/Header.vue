<script setup>
const emit = defineEmits(['toggle-sidebar']); // Emit event to parent

const handleToggle = () => {
  emit('toggle-sidebar'); // Emit the event to toggle sidebar
};
</script>

<template>
  <header>
    <div class="toggle-sidebar" @click="handleToggle">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-list" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"></path>
      </svg>
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
</style>