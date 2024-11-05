<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const isOpen = ref(false);
const subListRef = ref(null);

const toggleList = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <li>
    <div class="sublist-header" @click="toggleList">
      <slot></slot>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="dropdown-icon" :class="{ open: isOpen }" viewBox="0 0 16 16">
        <path d="M1.5 5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5z"/>
      </svg>
    </div>
    <ul v-if="isOpen" class="sublist-items" ref="subListRef">
      <slot name="sub-items"></slot>
    </ul>
  </li>
</template>

<style scoped>
ul{
  padding: 0;
  list-style-type: disc;
}

.sublist-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 7px;
  background-color: #173db2;
  color: white;
  border-radius: 5px;
}

.sublist-header:hover {
  background-color: #1f4ed8;
}

.dropdown-icon {
  margin-left: auto;
  transition: transform 0.3s;
}

.dropdown-icon.open {
  transform: rotate(180deg);
}

.sublist-items {
  padding-left: 20px;
  margin-top: 5px;
  font-size: 14px;
}
</style>
