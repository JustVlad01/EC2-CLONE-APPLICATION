<template>
  <component :is="this.$route.meta.layoutComponent">
    <slot/>
  </component>
</template>

<script>
export default {
  name: "SignLayout",
}
</script>

<style scoped>

</style>