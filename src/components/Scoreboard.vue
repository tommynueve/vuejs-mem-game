<template>
  <h1>Scoreboard page</h1>
  <ul v-for="(score, index) in scores" :key="index"></ul>
</template>

<script>
import useScore from '../hooks/useScore';

export default {
  name: 'Scoreboard',
  setup() {
    const { scores } = useScore(true); // first parameter initializes a dummy scoreboard filled with fake data.

    return { scores };
  },
};
</script>

<style></style>
