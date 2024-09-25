<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import RegisterRestaurant from "@/components/Registration/RegisterRestaurant.vue";

// This ref controls which component/view is shown
const currentView = ref('mainBlock'); // Default view

const switchView = (view) => {
  currentView.value = view;
};
</script>

<template>
  <div class="registration-section">
    <div @click="switchView('mainBlock')" v-if="currentView !== 'mainBlock'" class="goBack"><</div>
    <!-- Transition for smooth animation -->
    <transition name="slide-fade">
    <div class="sliding-block" v-if="currentView === 'mainBlock'">
      <!-- Main Registration Section -->
      <div key="registration" class="registration-section-inner">
        <span class="welcome-text">WELCOME</span>
        <div class="info-block">
          <span class="info-block-text">Register your restaurant</span>
          <div class="info-block-button" @click="switchView('registerRestaurant')">
            Integrate e-POS system to your restaurant
          </div>
        </div>
        <div class="info-block">
          <span class="info-block-text">Sign-in options</span>
          <div class="info-block-button" @click="switchView('registerStaff')">Register</div>
          <div class="info-block-button" @click="switchView('loginStaff')">Log-in</div>
        </div>
      </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <RegisterRestaurant v-if="currentView === 'registerRestaurant'" @switchView="switchView" class="sliding-block"></RegisterRestaurant>
    </transition>
  </div>
</template>

<style scoped>
.registration-section {
  max-width: 600px;
  margin: 30px auto;
  text-align: center;
  position: relative;
}

.sliding-block{
  position: absolute;
  left: 0;
  right: 0;
}

.welcome-text {
  font-size: 4vw;
  display: block;
}

.info-block {
  margin-bottom: 20px;
}

.goBack{
  position: absolute;
  left: -50px;
  top: 20px;
  background-color: white;
  color: black;
  font-size: 25px;
  line-height: 0.6;
  padding: 10px 9px;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  z-index: 99;
  transition: background-color 0.2s, color 0.2s;
}

.goBack:hover{
  background-color: #3f658c;
  color: white;
  transition: background-color 0.2s, color 0.2s;
}

.info-block-button {
  display: block;
  border-radius: 5px;
  outline: 2px solid #3f658c;
  background-color: #1a4d7f;
  padding: 5px 20px;
  transition: background-color 0.2s;
  margin-top: 10px;
  user-select: none;
  cursor: pointer;
}

.info-block-button:hover {
  background-color: #082c51;
  transition: background-color 0.2s;
}

.info-block-text {
  display: block;
  width: max-content;
  position: relative;
  color: #788796;
  margin: 0 auto;
}

.info-block-text:before,
.info-block-text:after {
  content: "";
  position: absolute;
  width: 70px;
  height: 2px;
  background-color: #788796;
  border-radius: 3px;
  top: 50%;
}

.info-block-text:before {
  left: -80px;
}

.info-block-text:after {
  right: -80px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100%); /* Slide in from right */
}

.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0); /* End at the original position */
}

.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0); /* Start from the original position */
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-100%); /* Slide out to the left */
}
</style>
