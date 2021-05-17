<template>
  <h1 class="title">Memory Game</h1>
  <div class="container">
    <div class="menu">
      <p>Pairs discovered: {{ pairsFound }}</p>
      <button @click="startNewGame()">Restart Game</button>
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
    const { deck, startNewGame, showCard, pairsFound } = useGame();

    onMounted(() => startNewGame());

    const onCardClick = ({ frontValue, position }) => {
      showCard(position);
      console.log(frontValue, position);
    };

    return { deck, startNewGame, onCardClick, pairsFound };
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
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  place-items: center;
}

.shuffle-move {
  transition: transform 0.8s ease;
}

button {
  font-size: 1.15rem;
  margin-left: 2rem;
  text-transform: capitalize;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  color: #000;
  cursor: pointer;
}
</style>
