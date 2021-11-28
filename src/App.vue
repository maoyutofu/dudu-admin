<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import Layout from './views/layout/index.vue'
// import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: "App",
  components: {
    // HelloWorld
    // Layout
  },
});
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
html,
body {
  min-height: 100%;
  height: 100%;
  padding: 0;
  margin: 0 auto;
  font-size: 10px;
}

#app {
  height: 100%;
  background-color: #fff;
}


</style>