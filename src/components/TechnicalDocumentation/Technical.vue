<template>
<div>
  <NavBar />
  
  
  <AddDocument />
 </div>
</template>

<script >
import NavBar from "../NavBar.vue";

import AddDocument from "./AddDocument.vue"

export default {
  name: "Technical",
  components: {
    NavBar,
    AddDocument,
   

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
