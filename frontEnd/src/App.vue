<!-- App.vue -->
<template>
  <div id="app">
    <AppNavbar />
    <PostList />
    
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import PostList from './components/PostList.vue';

export default {
  components: {
    PostList,
    AppNavbar
  }
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
