<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import {useSignUpStore} from "@/stores/signUpStore.js";

// Import the store
const signUpStore = useSignUpStore();

const welcomeTextStyles = ref({
  top: '0px',
  left: '0px',
  width: 'auto'
});

const isSpanVisible = ref(false);
const isBlockUp = ref(false);

const calculatePosition = () => {
  const welcomeTextElement = document.querySelector('.welcome-text > h1');
  if (!welcomeTextElement) return;

  // Calculate the center of the viewport
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const elementHeight = welcomeTextElement.offsetHeight;
  const elementWidth = welcomeTextElement.offsetWidth;

  // Set position to the calculated center
  welcomeTextStyles.value = {
    top: `${(viewportHeight - elementHeight) / 2}px`,
    left: `${(viewportWidth - elementWidth) / 2}px`,
    width: `${elementWidth}px`
  };
};

onMounted(async () => {
  await nextTick(); // Wait for the DOM to be fully loaded
  calculatePosition();

  // Show span after 0.5 seconds
  setTimeout(() => {
    isSpanVisible.value = true;
  }, 500);

  // Move the whole block up after the span animation finishes (1.5 seconds total)
  setTimeout(() => {
    isBlockUp.value = true;
  }, 1500);

  setTimeout(() => {
    const signUpOptions = document.querySelector('.sign-up-options');
    if (!signUpOptions) return;

    signUpOptions.style.opacity = 1;
  }, 2000);

  // Add event listener for window resize
  window.addEventListener('resize', calculatePosition);
});

// Cleanup event listener when component is unmounted
onBeforeUnmount(() => {
  window.removeEventListener('resize', calculatePosition);
});
</script>

<template>
  <div class="sign-up-block form-block">
    <div
        class="welcome-text"
        :style="welcomeTextStyles"
        :class="{ 'move-up': isBlockUp }"
    >
      <h1>Welcome</h1>
      <span :class="{ 'slide-down': isSpanVisible }">To the future of hotel management</span>
    </div>
    <div class="sign-up-options">
      <span>Register your hotel now</span>
      <div class="options-btn" @click="signUpStore.goTo(signUpStore.signUpPagesEnum.HOTEL)">Register hotel</div>
      <hr />
      <span>For staff members</span>
      <div class="options-btn" @click="signUpStore.goTo(signUpStore.signUpPagesEnum.SIGNIN)">Sign in</div>
      <div class="options-btn" @click="signUpStore.goTo(signUpStore.signUpPagesEnum.REGISTER)">Sign up</div>
    </div>
  </div>
</template>

<style scoped>
.sign-up-block {
  text-align: center;
}

.welcome-text {
  position: absolute;
  transition: top 0.5s ease;
}

.welcome-text > h1 {
  position: absolute;
  background-color: #f0f0f0;
  z-index: 10;
  padding: 0 80px;
}

.welcome-text.move-up {
  top: 50px !important; /* Slide up by 50px */
}

.welcome-text > span {
  position: absolute;
  display: inline-block;
  left: 0;
  right: 0;
  top: 100%;
  opacity: 0;
  z-index: 5;
  transition: all 0.5s ease;
  white-space: nowrap;
}

.welcome-text > span.slide-down {
  top: 35px;
  opacity: 1;
}

.sign-up-options{
  margin-top: 100px;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.sign-up-options > hr{
  margin: 20px auto;
  border: none;
  border-top: 2px solid #000000;
  max-width: 400px;
}

.sign-up-options > span{
  font-size: 1.2em;
  display: block;
}

.options-btn{
  display: inline-block;
  padding: 10px 20px;
  margin: 10px;
  background-color: #000000;
  color: #ffffff;
  cursor: pointer;
  border-radius: 5px;
}

.options-btn:hover{
  background-color: #333333;
}
</style>
