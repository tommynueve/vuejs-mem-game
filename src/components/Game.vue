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
        <div class="win-modal" v-if="gameStatus === GAME_STATUS.FINISHED">
          <p class="win-sign">You win</p>
          <p class="win-time">{{ formattedTime }}</p>
          <p v-if="elapsedTime"></p>
        </div>
      </transition>
    </div>
    <button @click="startNewGame()" class="restart">Restart Game</button>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';

import Card from './Card.vue';
import useGame, { GAME_STATUS } from '../hooks/useGame';
import { formatTime } from '../utils/time';

export default {
  name: 'Game',
  components: {
    Card,
  },
  setup() {
    const { deck, startNewGame, showCard, remainingPairs, elapsedTime, gameStatus } = useGame();

    onMounted(() => startNewGame());

    const onCardClick = ({ frontValue, position }) => {
      showCard(position);
      console.log(frontValue, position);
    };

    const formattedTime = computed(() => {
      return formatTime(elapsedTime.value);
    });

    return { deck, startNewGame, onCardClick, remainingPairs, elapsedTime, formattedTime, gameStatus, GAME_STATUS };
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

.modal-enter-from {
  opacity: 0;
}

.modal-enter-active {
  transition: opacity 2s ease;
}

.shuffle-move {
  transition: transform 0.8s ease;
}

.title {
  margin: 2rem;
}

.restart {
  font-size: 1.15rem;
  text-transform: capitalize;
  border-radius: 10px;
  padding: 0.5rem 1rem;
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
