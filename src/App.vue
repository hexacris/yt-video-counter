<template>
  <div id="app">
    <youtubeCard></youtubeCard>
  </div>
</template>

<script>
import youtubeCard from './components/YT_Card.vue'

export default {
  name: 'App',
  components: {
    youtubeCard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
