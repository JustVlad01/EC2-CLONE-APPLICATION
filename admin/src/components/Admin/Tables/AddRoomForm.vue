<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";
const toast = useToast();

const floors = ref([{ from: "", to: "" }]);

const addFloor = () => {
  floors.value.push({ from: "", to: "" });
};

const submitRoom = async () => {
  try {
    const payload = {
      floors: floors.value.map(floor => ({
        from: floor.from,
        to: floor.to,
      })),
    };

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/rooms/`, payload, {
      withCredentials: true,
    });

    toast.success("Rooms created successfully!");
    console.log("Room Data Submitted:", response.data);
  } catch (error) {
    console.error("Error submitting rooms:", error.response?.data || error.message);
    toast.error(error.response?.data?.error || "Failed to create rooms.");
  }
};
</script>

<template>
  <div>
    <div class="floor-form" v-for="(floor, index) in floors" :key="index">
      <label class="text-highlight-blue">Floor {{index + 1}}:</label>
      <div>
        <input v-model="floor.from" type="number" :min="(index + 1) * 100 + 1"
               placeholder="Start" />
        <span>-</span>
        <input v-model="floor.to" type="number" :min="(index + 1) * 100 + 1"
               placeholder="End" />
      </div>
    </div>
    <button @click="addFloor">Add Floor</button>
    <button @click="submitRoom">Submit Rooms</button>
  </div>
</template>

<style scoped>
.floor-form:not(:last-child) {
  margin-bottom: 20px;
}

.floor-form div {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.floor-form div input {
  width: 100px;
}

.floor-form div span {
  margin: 0 10px;
}

.floor-form div input[type="number"] {
  -moz-appearance: textfield;
}

button{
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

input {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 5px;
}

button:not(:last-child) {
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>