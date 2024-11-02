<script setup>
import { onMounted } from "vue";
import SignUp from "@/components/SignOptions/SignOptions.vue";
import { useSignUpStore } from "@/stores/signUpStore.js";
import HotelRegistration from "@/components/SignOptions/HotelRegistration.vue";
import RegistrationForm from "@/components/SignOptions/RegistrationForm.vue";
import SignIn from "@/components/SignOptions/SignIn.vue";

const signUpStore = useSignUpStore();

const checkForVerificationCode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    signUpStore.goTo(signUpStore.signUpPagesEnum.REGISTER);
    signUpStore.setVerificationCode(code);
  }
};

onMounted(() => {
  checkForVerificationCode();
});
</script>

<template>
  <main>
    <div class="move-back" v-if="signUpStore.currentPage !== signUpStore.signUpPagesEnum.WELCOME" @click="signUpStore.goTo(signUpStore.signUpPagesEnum.WELCOME)">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"></path>
      </svg>
      Back
    </div>
    <Transition name="fade" mode="out-in">
      <sign-up v-if="signUpStore.currentPage === signUpStore.signUpPagesEnum.WELCOME" />
    </Transition>
    <Transition name="fade" mode="out-in">
      <HotelRegistration v-if="signUpStore.currentPage === signUpStore.signUpPagesEnum.HOTEL" />
    </Transition>
    <Transition name="fade" mode="out-in">
      <RegistrationForm v-if="signUpStore.currentPage === signUpStore.signUpPagesEnum.REGISTER"></RegistrationForm>
    </Transition>
    <Transition name="fade" mode="out-in">
      <SignIn v-if="signUpStore.currentPage === signUpStore.signUpPagesEnum.SIGNIN"></SignIn>
    </Transition>
  </main>
</template>

<style scoped>
.move-back {
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: #333333;
  color: white;
  display: flex;
  align-items: center;
  z-index: 10;
  cursor: pointer;
  border-radius: 5px;
  padding: 8px 10px;
}

.move-back:hover {
  background-color: #555555;
}

.move-back svg {
  margin-right: 10px;
}
</style>
