<script setup>
const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  modelValue: String,
  required: Boolean
});

const emit = defineEmits(['update:modelValue']); // Define an emit to update the parent

// Update the value when the input changes
const handleInput = (event) => {
  emit('update:modelValue', event.target.value); // Emit the new value to the parent
};
</script>

<template>
  <div class="input-field">
    <label>{{ label }} <span v-if="required">*</span></label>
    <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :required="required"
        @input="handleInput"
    />
  </div>
</template>

<style scoped>
.input-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  flex: 1 1 200px;
  max-width: 500px;
  min-width: 200px;
}

.input-field label {
  margin-bottom: 5px;
}

.input-field input {
  padding: 8px;
  font-size: 16px;
}
</style>
