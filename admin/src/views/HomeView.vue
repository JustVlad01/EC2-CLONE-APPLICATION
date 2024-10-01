<script setup>
import SignUp from "@/components/SignUp.vue";
import {useSignUpStore} from "@/stores/signUpStore.js";
import HotelRegistration from "@/components/HotelRegistration.vue";

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
  </main>
</template>
