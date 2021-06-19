<script>
import Sidebar from "@/components/sidebar/Sidebar";
import { sidebarWidth } from "@/components/sidebar/state";
import NavBar from "../components/NavBar.vue";

export default {
  components: { Sidebar, NavBar },
  setup() {
    return { sidebarWidth };
  },
};
</script>
<template>
  <div>
    <NavBar />

    <Sidebar />
    <div :style="{ 'margin-left': sidebarWidth }">
      <h1>Dashboard Page</h1>
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
