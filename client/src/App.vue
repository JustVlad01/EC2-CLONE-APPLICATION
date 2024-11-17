<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <component :is="$route.meta.layout || 'div'">
      <router-view />
    </component>
  </main>
</template>

<style scoped>

</style>
