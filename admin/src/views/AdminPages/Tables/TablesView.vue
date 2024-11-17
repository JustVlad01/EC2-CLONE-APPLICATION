<script setup>
import {onMounted, ref} from 'vue'
import { useTablesStore } from '@/stores/tablesStore.js'
import TableItem from "@/components/Admin/Tables/TableItem.vue";
import Popup from "@/components/Common/popup.vue";
import AddTableForm from "@/components/Admin/Tables/AddTableForm.vue";
import AddRoomForm from "@/components/Admin/Tables/AddRoomForm.vue";

const tablesStore = useTablesStore()

const showAddTablePopup = ref(false);
const showAddRoomPopup = ref(false);

const openTablePopup = () => {
  showAddTablePopup.value = true;
};

const openRoomPopup = () => {
  showAddRoomPopup.value = true;
};

tablesStore.getTables();
tablesStore.getRooms();
</script>

<template>
  <Popup v-if="showAddTablePopup" title="Add Table" :visible="showAddTablePopup" @close="showAddTablePopup = false">
    <AddTableForm />
  </Popup>

  <Popup v-if="showAddRoomPopup" title="Add Rooms" :visible="showAddRoomPopup" @close="showAddRoomPopup = false">
    <AddRoomForm />
  </Popup>
  <h1>Welcome to Tables-Rooms schema</h1>
  <span class="text-highlight-blue">All tables</span>
  <div class="title-add">
    <div class="sort">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"></path>
      </svg>
      <span>Sort by number</span>
    </div>
    <div class="text-highlight-blue" @click="openTablePopup"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"></path>
    </svg>Add Table</div>
  </div>
  <div class="items-block">
    <TableItem v-if="tablesStore.tables.length !== 0" v-for="table in tablesStore.tables" :table="table" :key="table._id" />
    <span class="info-message-block" v-else>No tables created</span>
  </div>
  <span class="text-highlight-blue">All rooms</span>
  <div class="title-add">
    <div class="sort">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"></path>
      </svg>
      <span>Sort by number</span>
    </div>
    <div class="text-highlight-blue" @click="openRoomPopup"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"></path>
    </svg>Add Rooms</div>
  </div>
  <div class="items-block">
    <TableItem v-if="tablesStore.rooms.length !== 0" v-for="table in tablesStore.rooms" :table="table" :key="table._id" />
    <span class="info-message-block" v-else>No rooms created</span>
  </div>
</template>

<style scoped>
.title-add {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.text-highlight-blue {
  cursor: pointer;
  display: flex;
  align-items: center;
}

span.text-highlight-blue {
  font-size: 20px;
  background-color: #264b8d;
}

.text-highlight-blue svg {
  margin-right: 10px;
}

.items-block {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  gap: 20px;
}
</style>