<template>
  <div class="hs-container">
    <h1 class="hs-title">Highscores</h1>
    <div class="new-hs-container" v-if="newTime">
      <label for="name-input" class="name-label">Your name</label>
      <div class="new-highscore score-list-item">
        <input v-model="newName" type="text" id="name-input" @keyup.enter="onNameEnter" />
        <p>{{ formatTime(newTime) }}</p>
      </div>
    </div>
    <transition-group tag="ul" name="score-list-tg" class="score-list">
      <li v-for="score in formattedScores" :key="score.name" class="score-list-item">
        <p>{{ score.name }}</p>
        <p>{{ score.formattedTime }}</p>
      </li>
    </transition-group>
  </div>
  <TheButton @onClick="this.$router.push('game')">Play Again</TheButton>
</template>

<script>
import { computed, ref } from 'vue';
import TheButton from './TheButton.vue';
import useScore from '../hooks/useScore';
import { formatTime } from '../utils/time';

export default {
  name: 'Scoreboard',
  components: {
    TheButton,
  },
  setup() {
    const { topScores, newTime, completeScorePendingName } = useScore();

    const newName = ref('');

    const onNameEnter = () => {
      if (!newName.value) return;
      completeScorePendingName(newName.value);
    };

    const formattedScores = computed(() => {
      return topScores.value.map((score) => ({ ...score, formattedTime: formatTime(score.time) }));
    });

    return { formattedScores, formatTime, newTime, newName, onNameEnter };
  },
};
</script>

<style>
.hs-container {
  border: 2px solid #000;
  border-radius: 10px;
  max-width: 20rem;
  margin: 2rem auto;
  overflow: hidden;
}

.hs-container h1 {
  background-color: #000;
  padding: 1rem;
  color: #fff;
  font-weight: 900;
}

.hs-title {
  font-size: 1.5rem;
  text-transform: uppercase;
}

.name-label {
  display: block;
  text-align: left;
  font-weight: 900;
}

.new-highscore {
  font-size: 1.25rem;
}

.new-highscore p {
  font-weight: 900;
  color: hsl(120, 100%, 25%);
}

.new-highscore input {
  padding: 0.35rem 0.6rem;
  border: 2px solid #000;
  border-radius: 10px;
  outline: none;
}

.new-hs-container {
  padding: 2rem;
  padding-bottom: 0;
}

.score-list {
  padding: 2rem;
}

.score-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.score-list-tg-enter-active,
.score-list-tg-leave-active {
  transition: all 2s ease;
}

.score-list-tg-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.score-list-tg-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
