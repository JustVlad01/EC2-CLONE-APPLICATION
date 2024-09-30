<script setup>
import SignUp from "@/components/SignUp.vue";
import {useSignUpStore} from "@/stores/signUpStore.js";

const signUpStore = useSignUpStore();
</script>

<template>
  <main>
    <Transition name="fade" mode="out-in">
      <sign-up v-if="signUpStore.currentPage === signUpStore.signUpPagesEnum.WELCOME" />
    </Transition>
  </main>
</template>
