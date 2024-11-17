<script setup>
import allergensList from "@/components/Admin/Menu/allergensList.js";
import { useMenuStore } from '@/stores/menuStore';
import {onMounted, ref} from "vue";
import axios from "axios";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const props = defineProps({
  item: Object,
  category: Number,
  itemIndex: Number,
});

const menuStore = useMenuStore();
const closedTab = ref(false);
const imagePreview = ref(props.item.imageUrl || null); // Preview existing image or start with null

const deleteItem = () => {
  const category = menuStore.menu.categories[props.category];
  category.items = category.items.filter((itm) => itm.id !== props.item.id); // Only keep items that don't match the current item id
};

// Upload Image to Backend and Update Item's Image URL
const uploadImage = async (file, item) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/image/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });

    item.imageUrl = response.data.imageUrl; // Store URL in item data
    imagePreview.value = response.data.imageUrl; // Update preview
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

// Handle image file selection
const handleImageUpload = async (event, item) => {
  const file = event.target.files[0];
  if (file) await uploadImage(file, item);
};

onMounted(() => {
  Fancybox.bind('[data-fancybox]', {
    // Your options here
  });
});

// Toggle collapse for item details
const toggleCollapse = () => {
  closedTab.value = !closedTab.value;
};
</script>

<template>
  <div class="item">
    <h4>Item: <span class="text-highlight-blue">{{ item.title || 'New Item' }}</span></h4>

    <!-- Collapse Icon -->
    <div class="collapse-icon" :class="{closed: closedTab}" @click="toggleCollapse">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"></path>
      </svg>
    </div>

    <div class="collapse" :class="{closed: closedTab}">
      <!-- Image Upload Section -->
      <div>
        <label>Item Image:</label>
        <input type="file" @change="(event) => handleImageUpload(event, item)" />

        <!-- Display Image Preview -->
        <a v-if="imagePreview" :href="imagePreview" class="image-preview" data-fancybox data-caption="Single image">
          <img :src="imagePreview"  alt="image_item"/>
        </a>
      </div>

      <!-- Item Details -->
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

      <button class="removeBlock" @click="deleteItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
        </svg> Delete item
      </button>
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
  border: 1px solid #ccc;
}

.collapse-icon {
  top: 7px;
}

.image-preview {
  max-width: 300px;
  display: block;
  margin: 10px 0;
  border-radius: 5px;
  border: 2px solid #1f4ed8;
  transition: all 0.5s;
}

.image-preview:hover{
  max-width: 350px;
  transition: all 0.5s;
}

img {
  max-width: 100%;
  border-radius: 5px;
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
