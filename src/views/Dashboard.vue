<script>
import Sidebar from "@/components/sidebar/Sidebar";
import { sidebarWidth } from "@/components/sidebar/state";
import NavBar from "../components/NavBar.vue";

import AuthenticationService from "../service/AuthenticationServices";

export default {
  components: { Sidebar, NavBar },
  setup() {
    return { sidebarWidth };
  },
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.authenticationService = new AuthenticationService();
  },
  methods: {
    // this.authenticationService.getUser().then((data) => {
    //   this.user = data;
    //   console.log("data", this.user);
    // });
    // getUser() {
    // this.user = this.authenticationService.getItem("user");
    // console.log("user", this.user);
    // },
  },
};
</script>
<template>
  <div>
    <NavBar />

    <Sidebar />
    <div :style="{ 'margin-left': sidebarWidth }">
      <!-- <h1 v-if="this.user.roles.id !== 3">Dashboard Page</h1> -->
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
