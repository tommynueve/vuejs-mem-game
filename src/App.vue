<template>
  <h1 class="title">Memory Game</h1>
  <div class="container">
    <div class="menu">
      <p>Pairs discovered: {{ pairsFound }}</p>
      <p>Time: {{ formattedTime }}</p>
    </div>
    <transition-group tag="ul" name="shuffle" class="game-grid" v-if="deck !== []">
      <Card
        v-for="(card, index) in deck"
        :key="card.key"
        :frontValue="card.frontValue"
        :isVisible="card.isVisible || card.isDiscovered"
        :position="index"
        @cardBackClick="onCardClick"
      />
    </transition-group>
    <button @click="startNewGame()" class="restart">Restart Game</button>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Card from './components/Card.vue';
import useGame from './hooks/useGame';

export default {
  name: 'App',
  components: {
    Card,
  },
  setup() {
    const { deck, startNewGame, showCard, pairsFound, formattedTime } = useGame();

    onMounted(() => startNewGame());

    const onCardClick = ({ frontValue, position }) => {
      showCard(position);
      console.log(frontValue, position);
    };

    return { deck, startNewGame, onCardClick, pairsFound, formattedTime };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.title {
  margin: 2rem;
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.shuffle-move {
  transition: transform 0.8s ease;
}

.restart {
  font-size: 1.15rem;
  text-transform: capitalize;
  border-radius: 10px;
  padding: 0.5rem 1rem;
}
</style>
