<template>
  <div>
    <NavBar />

    <AddLesson />
  </div>
</template>

<script >
import NavBar from "../NavBar.vue";

import AddLesson from "./AddLesson.vue";

export default {
  name: "Lesson",
  components: {
    NavBar,
    AddLesson,
  },
};
// import { defineProps, reactive } from 'vue'

// defineProps({
//   msg: String
// })

// const state = reactive({ count: 0 })
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
