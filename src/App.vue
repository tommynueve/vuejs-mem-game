<template>
  <h1 class="title">Memory Game</h1>
  <transition-group tag="ul" name="shuffle" class="container" v-if="deck !== []">
    <Card
      v-for="(card, index) in deck"
      :key="card.key"
      :frontValue="card.frontValue"
      :isVisible="card.isVisible || card.isDiscovered"
      :position="index"
      @cardBackClick="onCardClick"
    />
  </transition-group>
  <button @click="startNewGame()">New Game</button>
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
    const { deck, startNewGame, showCard } = useGame();

    onMounted(() => startNewGame());

    const onCardClick = ({ frontValue, position }) => {
      showCard(position);
      console.log(frontValue, position);
    };

    return { deck, startNewGame, onCardClick };
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
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  place-items: center;
}

.shuffle-move {
  transition: transform 0.8s ease;
}

button {
  margin-top: 2rem;
  font-size: 1.5rem;
}
</style>
