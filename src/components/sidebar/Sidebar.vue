<script>
import SidebarLink from "./SidebarLink";
import { collapsed, toggleSidebar, sidebarWidth } from "./state";
import ReportService from "../../service/ReportServices";

export default {
  props: {},
  data() {
    return {
      myRole: null,
      myRoleNumber: null,
    };
  },
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },
  created() {
    this.reportService = new ReportService();
  },
  mounted() {
    // i put this in mounted to get the role number and hide dashboard from navbar
    this.reportService.getReportNumbers().then((data) => {
      this.numberOfReports = data;
      this.myRole = JSON.parse(localStorage.getItem("user"));
      console.log("myRole", this.myRole);

      this.myRoleNumber = this.myRole.roles[0].id;
      console.log("myRoleNumber", this.myRoleNumber);
    });
  },
};
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>D</div>
        <div>A</div>
      </span>
      <span v-else>Dashboard</span>
    </h1>

    <SidebarLink to="/Dashboard" icon="fas fa-chart-bar">Dashboard</SidebarLink>
    <SidebarLink to="/technology" icon="fas fa-sitemap">Technology</SidebarLink>
    <SidebarLink to="/theme" icon="fas fa-project-diagram">Theme</SidebarLink>
    <SidebarLink to="/folder" icon="fas fa-folder-open">Folder</SidebarLink>
    <div v-if="myRoleNumber == 1">
      <SidebarLink to="/admin" icon="fas fa-user-tie">Admins</SidebarLink>
    </div>
    <div v-if="myRoleNumber == 1">
      <SidebarLink to="/manager" icon="fas fa-user-friends"
        >Managers</SidebarLink
      >
    </div>
    <div v-if="myRoleNumber == 1">
      <SidebarLink to="/user" icon="fas fa-users">Users</SidebarLink>
    </div>
    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #0097a7;
  --sidebar-item-hover: #36c3d3;
  --sidebar-item-active: #007481;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 3em;
  font-size: 2em;
  font-weight: bold;
  font-family: Helvetica, Arial, sans-serif;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
