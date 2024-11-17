<script setup>
import {computed, ref} from 'vue';
import { required, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useMenuStore } from '@/stores/menuStore';
import ItemBlock from './ItemBlock.vue';

const props = defineProps({
  categoryIndex: Number,
});

const menuStore = useMenuStore();
const category = computed(() => menuStore.menu.categories[props.categoryIndex]);
const closedTab = ref(false);

// Validation rules for category
const rules = {
  name: { required, minLength: minLength(2) },
  description: { required, minLength: minLength(5) },
};

const v$ = useVuelidate(rules, category.value);

const onInput = (field) => {
  v$[field].$reset();
};

const addItem = () => {
  menuStore.addItemToCategory(props.categoryIndex);
};

const toggleCollapse = () => {
  closedTab.value = !closedTab.value;
};
</script>

<template>
  <div class="category">
    <h3>Category: <span class="text-highlight-blue">{{ category.name || props.categoryIndex + 1 }}</span></h3>
    <div class="collapse-icon" :class="{closed: closedTab}" @click="toggleCollapse">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"></path>
      </svg>
    </div>
  <div class="collapse" :class="{closed: closedTab}">
    <div>
      <label>Category Name:</label>
      <input v-model="v$.name.$model" @input="onInput('name')" placeholder="Enter category name" />
      <span v-if="v$.name.$error" class="error">Category name is required and must be at least 2 characters.</span>
    </div>

    <div>
      <label>Category Description:</label>
      <textarea v-model="v$.description.$model" @input="onInput('description')" placeholder="Enter category description"></textarea>
      <span v-if="v$.description.$error" class="error">Category description is required and must be at least 5 characters.</span>
    </div>

    <div v-for="item in category.items" :key="item.id">
      <ItemBlock :item="item" :category="props.categoryIndex" :itemIndex="index" />
    </div>

    <button class="addBlock" @click="addItem"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"></path>
    </svg>Add Item</button>
    <button class="removeBlock" @click="menuStore.removeCategory(categoryIndex)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
    </svg>Remove Category</button>
  </div>
  </div>
</template>

<style scoped>
.category {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.category > .collapse > div{
  margin-bottom: 10px;
}

label{
  display: block;
  margin: 5px 0;
}

input, textarea{
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error {
  color: red;
  font-size: 0.9em;
}
</style>
