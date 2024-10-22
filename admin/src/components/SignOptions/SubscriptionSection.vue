<script setup>

</script>

<template>
<div class="subscription-section">
  <h2>Choose your subscription</h2>
  <div class="options">
    <slot></slot>
  </div>
</div>
</template>

<style scoped>
.subscription-section{
  width: 100%;
}
.options{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>