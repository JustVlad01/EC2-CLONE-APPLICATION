<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";
import { useTablesStore } from "@/stores/tablesStore.js";

const tableNumber = ref("");
const capacity = ref("");
const toast = useToast();
const tablesStore = useTablesStore();

const submitTable = async () => {
  try {
    const payload = {
      number: tableNumber.value,
      capacity: capacity.value,
      type: "table",
    };

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/tables/`, payload, {
      withCredentials: true,
    });

    toast.success("Table added successfully!");
    console.log("Table Data Submitted:", response.data);
    await tablesStore.getTables();
  } catch (error) {
    console.error("Error submitting table:", error.response?.data || error.message);
    toast.error(error.response?.data?.error || "Failed to add table.");
  }
};
</script>

<template>
  <div>
    <div>
      <label>Table Number:</label>
      <input v-model="tableNumber" placeholder="Enter table number" />
    </div>
    <div>
      <label>Capacity:</label>
      <input v-model="capacity" type="number" placeholder="Enter capacity" />
    </div>
    <button @click="submitTable">Add Table</button>
  </div>
</template>

<style scoped>
div {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 5px;
}
</style>