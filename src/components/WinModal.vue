<template>
  <div class="win-modal">
    <p v-if="isHighscore" class="win-highscore">HIGHSCORE</p>
    <p class="win-sign">You win</p>
    <p class="win-time">{{ score }}</p>
    <TheButton @onClick="this.$router.push('score')">Go to the scoreboard</TheButton>
  </div>
</template>

<script>
import TheButton from './TheButton.vue';

export default {
  name: 'WinModal',
  components: {
    TheButton,
  },
  props: {
    score: {
      type: String,
      required: true,
    },
    isHighscore: {
      type: Boolean,
    },
  },
};
</script>

<style>
.win-highscore {
  color: hsl(300deg, 100%, 50%);
  font-size: 0.6em;
  font-weight: 900;
}

.win-modal {
  width: 100%;
  height: 100%;
  background-color: hsl(0, 0%, 20%, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 5rem;
  font-weight: 700;
}

.win-sign {
  color: hsl(120, 100%, 45%);
}

.win-time {
  color: #fff;
}
</style>
