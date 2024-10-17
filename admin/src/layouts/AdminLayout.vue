<template>
  <div>
    <Header @toggle-sidebar="toggleSidebar" />
    <div class="main-layout">
      <!-- SideBar component with toggle functionality -->
      <SideBar class="side-bar" :class="{ open: sideBarOpen }" @toggle-sidebar="toggleSidebar" />

      <!-- Main content area -->
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Admin/Header.vue";
import SideBar from "@/components/Admin/SideBar.vue";
import { ref } from "vue";

// Sidebar visibility state
const sideBarOpen = ref(true);

// Function to toggle the sidebar visibility
const toggleSidebar = () => {
  sideBarOpen.value = !sideBarOpen.value;
};
</script>

<style scoped>
.main-layout {
  display: flex;
}

/* Style for the sidebar */
.side-bar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  background-color: #4371ff;
  color: white;
  padding: 20px 0;
  transition: left 0.3s ease;
}

/* When sidebar is closed */
.side-bar.open {
  left: -200px;
}

/* Main content area */
.content {
  margin-left: 200px;
  padding: 20px;
  width: calc(100% - 200px);
  transition: margin-left 0.3s ease;
}

/* Adjust main content area when sidebar is closed */
.side-bar.open + .content {
  margin-left: 0;
  width: 100%;
}
</style>
