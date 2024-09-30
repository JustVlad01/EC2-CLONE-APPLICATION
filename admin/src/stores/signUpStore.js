import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSignUpStore = defineStore('signUp', () => {
  const signUpPagesEnum = {
    WELCOME: 1,
    HOTEL: 2,
    REGISTER: 3,
    SIGNIN: 4,
  }

  const currentPage = ref(signUpPagesEnum.WELCOME);

  function goTo(page){
    currentPage.value = page;
  }

  return { goTo, signUpPagesEnum, currentPage}
})
