<script setup>
import allergensList from "@/components/Admin/Menu/allergensList.js";
import { useMenuStore } from '@/stores/menuStore';
import {ref} from "vue";

const props = defineProps({
  item: Object,
  category: Number,
  itemIndex: Number,
});

const menuStore = useMenuStore();
const closedTab = ref(false);

// Function to delete the item directly from the store
const deleteItem = () => {
  menuStore.menu.categories[props.category].items.splice(props.itemIndex, 1);
};

const toggleCollapse = () => {
  closedTab.value = !closedTab.value;
};
</script>

<template>
  <div class="item">
    <h4>Item: <span class="text-highlight-blue">{{ item.title || 'New Item' }}</span></h4>
    <div class="collapse-icon" :class="{closed: closedTab}" @click="toggleCollapse">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"></path>
      </svg>
    </div>
    <div class="collapse" :class="{closed: closedTab}">
      <div>
        <label>Item Image:</label>
        <input type="file" />
      </div>

      <div>
        <label>Item Title:</label>
        <input v-model="item.title" placeholder="Enter item title" />
      </div>

      <div>
        <label>Item Description:</label>
        <textarea v-model="item.description" placeholder="Enter item description"></textarea>
      </div>

      <div>
        <label>Price:</label>
        <input type="number" v-model="item.price" placeholder="Enter price" />
      </div>

      <div>
        <label>Discount Price:</label>
        <input type="number" v-model="item.discountPrice" placeholder="Enter discount price" />
      </div>

      <div>
        <label>Allergens:</label>
        <div>
          <label v-for="allergen in allergensList" :key="allergen.short">
            <input type="checkbox" :value="allergen.short" v-model="item.allergens" /> {{ allergen.short }}
          </label>
        </div>
      </div>
      <button @click="item.availability = !item.availability">
        {{ item.availability ? 'Mark Unavailable' : 'Mark Available' }}
      </button>
      <button class="removeBlock" @click="deleteItem"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
      </svg>Delete item</button>
    </div>
  </div>
</template>

<style scoped>
.item {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  position: relative;
}

.collapse-icon{
  top: 7px;
}

.removeBlock {
  margin-top: 10px;
}

label {
  display: block;
}

input, textarea {
  width: 100%;
  padding: 5px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
