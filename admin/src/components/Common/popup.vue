<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
  visible: Boolean,
});

//Emit closing of this popup
const emit = defineEmits(["close"]);

const closePopup = () => {
  emit("close");
};
</script>

<template>
  <div v-if="visible" class="popup-all">
    <div class="black-bg" @click="closePopup"></div>
    <div class="popup">
      <div class="popup-header">
        <span class="popup-title">{{ title }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" @click="closePopup" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
        </svg>
      </div>
      <div class="popup-content">
        <slot></slot> <!-- Slot for dynamic content -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup-all {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s;
}

.black-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
}

.popup {
  background: white;
  border-radius: 10px;
  padding: 20px;
  z-index: 10;
  max-width: 400px;
  width: 90%;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.popup-title {
  font-size: 18px;
  font-weight: bold;
}

.popup-content {
  margin-top: 10px;
}

svg {
  cursor: pointer;
  background-color: #264b8d;
  padding: 5px;
  border-radius: 50%;
  color: white;
}


@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
