<script setup>
import {useTablesStore} from "@/stores/tablesStore.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const props = defineProps(['table'])
const tablesStore = useTablesStore()

const deleteItem = () => {
  console.log('Delete table:', props.table)
  if (!props.table.floor) {
    tablesStore.deleteTable(props.table._id)
    toast.success('Table deleted successfully!')
  } else {
    tablesStore.deleteRoom(props.table._id)
    toast.success('Room deleted successfully!')
  }
}
</script>

<template>
  <div>
    <div class="table-item">
      <div v-if="table.number" class="table-number">Table {{ table.number }}</div>
      <div v-else class="table-number">Floor {{table.floor}}</div>
      <div v-if="table.capacity" class="table-capacity">Capacity: {{ table.capacity }}</div>
      <div v-if="table.rooms && table.rooms.length > 0" class="rooms">
        <div v-for="(room, index) in table.rooms" :key="room._id">
          <span>{{ room.from }}</span>
          <span> - </span>
          <span>{{ room.to }}</span>
        </div>
      </div>
      <div class="table-actions">
        <button class="btn-edit">Edit</button>
        <button class="btn-delete" @click="deleteItem">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.table-number, .table-capacity {
  font-size: 18px;
  margin-bottom: 5px;
  color: #333;
}

.rooms div {
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: #f1f1f1;
}

.table-actions {
  margin-top: 15px;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.btn-edit, .btn-delete {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-edit {
  background-color: #007bff;
  color: white;
}

.btn-edit:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-delete:hover {
  background-color: #d32f2f;
  transform: scale(1.05);
}
</style>
