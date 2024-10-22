<script setup>
const props = defineProps(['label', 'subLabel']);
</script>

<template>
  <div class="form-group" :class="{sub_form: subLabel }">
    <label v-if="label">{{ label }}</label>
    <label class="sub" v-if="subLabel">{{ subLabel }}</label>
    <div class="inner">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.form-group{
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: 30px auto;
  padding: 15px;
  background-color: white;
}

.form-group > .inner{
  display: flex;
  flex-direction: column;
}

.form-group.sub_form{
  max-width: unset;
  margin: unset;
  background-color: #f0f0f0;
}

label{
  display: block;
  font-size: 1.2em;
  background-color: #7cb9ff;
  color: white;
  width: max-content;
  padding: 5px 15px;
  margin-bottom: 15px;
}

.sub{
  background-color: #5e8bd2;
  color: white;
  padding: 5px 15px;
  margin-bottom: 15px;
}

.inner{
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>