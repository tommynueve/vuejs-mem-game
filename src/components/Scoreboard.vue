<template>
  <h1 class="hs-title">Highscores</h1>
  <ul class="score-list">
    <li v-for="(score, index) in formattedScores" :key="index" class="score-list-item">
      <p>{{ score.name }}</p>
      <p>{{ score.formattedTime }}</p>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue';
import useScore from '../hooks/useScore';
import { formatTime } from '../utils/time';

export default {
  name: 'Scoreboard',
  setup() {
    const { topScores } = useScore();

    const formattedScores = computed(() => {
      return topScores.value.map((score) => ({ ...score, formattedTime: formatTime(score.time) }));
    });

    return { formattedScores };
  },
};
</script>

<style>
.hs-title {
  font-size: 1.5rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.score-list {
  max-width: 20rem;
  margin: 0 auto;
}
.score-list-item {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}
</style>
