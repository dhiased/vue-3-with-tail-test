<template>
  <div>
    <NavBar />
    <div class="sideBar">
      <SideBar />
    </div>
  </div>
</template>

<script>
import NavBar from "../NavBar.vue";
import SideBar from "./SideBar.vue";

export default {
  name: "Dashboard",
  components: {
    SideBar,
    NavBar,
  },
};
</script>

<style>
.sideBar {
  display: grid;
  grid-template-columns: 1fr 5fr;
}
</style>