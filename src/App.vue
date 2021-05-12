<template>
  <h1 class="title">Memory Game</h1>
  <ul class="container">
    <Card v-for="index in 25" :key="index" />
  </ul>
</template>

<script>
import Card from './components/Card.vue';

export default {
  name: 'App',
  components: {
    Card,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.title {
  margin: 2rem;
}

.container {
  max-width: min-content;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  place-items: center;
}
</style>
