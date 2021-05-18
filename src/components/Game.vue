<template>
  <div class="container">
    <div class="menu">
      <p>Remaining pairs: {{ remainingPairs }}</p>
      <p>&#128337; {{ formattedTime }}</p>
    </div>
    <div class="board-container">
      <transition-group tag="ul" name="shuffle" class="game-grid" v-if="deck !== []">
        <Card
          v-for="(card, index) in deck"
          :key="card.key"
          :frontValue="card.frontValue"
          :frontImage="card.frontImage"
          :isVisible="card.isVisible"
          :isDiscovered="card.isDiscovered"
          :position="index"
          @cardBackClick="onCardClick"
        />
      </transition-group>
      <transition name="modal">
        <WinModal v-if="gameStatus === GAME_STATUS.FINISHED" :score="formattedTime" :isHighscore="isTopScore(elapsedTime)" />
      </transition>
    </div>
    <TheButton @onClick="onRestartClick">Restart Game</TheButton>
  </div>
</template>

<script>
import { onMounted, computed, watch } from 'vue';

import Card from './Card.vue';
import WinModal from './WinModal.vue';
import TheButton from './TheButton.vue';
import useGame, { GAME_STATUS } from '../hooks/useGame';
import useScore from '../hooks/useScore';
import { formatTime } from '../utils/time';

export default {
  name: 'Game',
  components: {
    Card,
    WinModal,
    TheButton,
  },
  setup() {
    const { deck, startNewGame, showCard, remainingPairs, elapsedTime, gameStatus } = useGame();
    const { isTopScore, addNewScorePendingName, clearNewTime } = useScore();

    onMounted(() => startNewGame());

    watch(gameStatus, () => {
      if (gameStatus.value === GAME_STATUS.FINISHED) {
        if (isTopScore(elapsedTime.value)) addNewScorePendingName(elapsedTime.value);
      }
    });

    const onCardClick = ({ position }) => showCard(position);

    const onRestartClick = () => {
      clearNewTime();
      startNewGame();
    };

    const formattedTime = computed(() => {
      return formatTime(elapsedTime.value);
    });

    return { deck, elapsedTime, onCardClick, remainingPairs, formattedTime, gameStatus, GAME_STATUS, isTopScore, onRestartClick };
  },
};
</script>

<style>
.board-container {
  position: relative;
}

.container {
  max-width: min-content;
  margin: 0 auto;
}

.game-grid {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  place-items: center;
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-enter-active {
  transition: opacity 1.5s ease;
}

.modal-enter-from {
  opacity: 0;
}

.shuffle-move {
  transition: transform 0.8s ease;
}

.title {
  margin: 2rem;
}
</style>
