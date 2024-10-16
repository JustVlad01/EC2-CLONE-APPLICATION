<template>
  <component :is="this.$route.meta.layoutComponent">
    <slot/>
  </component>
</template>

<script>
export default {
  name: "AdminLayout",
}
</script>

<style scoped>

</style>