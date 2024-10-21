<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  modelValue: String,
  required: Boolean,
  error: String
});

const emit = defineEmits(['update:modelValue']); // Emit to update parent

const errorComp = ref(props.error);

// Watch for changes in the prop `error` and update errorComp accordingly
watch(() => props.error, (newError) => {
  if (newError) {
    errorComp.value = newError; // Reset the error message when the parent changes the prop
  }
});

// Handle input change
const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};

// Handle closing the error message
const closeError = () => {
  errorComp.value = ''; // Clear the error message when user clicks on the close button
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
    <!-- Show error message with animation if error exists -->
    <transition name="fade">
      <div v-if="errorComp" class="error-message">
        {{ errorComp }}
        <span class="close" @click="closeError">X</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.input-field {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
}

.input-field label {
  margin-bottom: 5px;
}

.input-field input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #ffffa0;
  padding: 5px;
  font-size: 14px;
  color: #333;
  border-radius: 4px;
  margin-top: 5px;
}

.close {
  position: absolute;
  top: 3px;
  right: 5px;
  padding: 5px;
  cursor: pointer;
  font-size: 12px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
