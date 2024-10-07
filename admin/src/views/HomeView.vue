<script setup>
import SignUp from "@/components/SignUp.vue";
import {useSignUpStore} from "@/stores/signUpStore.js";
import HotelRegistration from "@/components/HotelRegistration.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";

const signUpStore = useSignUpStore();
</script>

<template>
  <main>
    <Transition name="fade" mode="out-in">
      <sign-up v-if="signUpStore.currentPage === signUpStore.signUpPagesEnum.WELCOME" />
    </Transition>
    <Transition name="fade" mode="out-in">
      <HotelRegistration v-if="signUpStore.currentPage === signUpStore.signUpPagesEnum.HOTEL" />
    </Transition>
    <RegistrationForm v-if="signUpStore.currentPage === signUpStore.signUpPagesEnum.REGISTER"></RegistrationForm>
  </main>
</template>
