<template>
<div>
<NavBar/>
<SideBar/>
</div>
</template>

<script>
import NavBar from "../NavBar.vue";
import SideBar from "./SideBar.vue"

export default {
name : "Dashboard" ,
components: {
    SideBar,
    NavBar,


}
}
</script>

<style>

</style>