<template>
  <h1 class="title">Memory Game</h1>
  <router-view
    :deck="deck"
    :formattedTime="formattedTime"
    :remainingPairs="remainingPairs"
    :gameStatus="gameStatus"
    @cardClick="onCardClick"
    @restartClick="startNewGame"
  />
</template>

<script>
import { onMounted } from 'vue';
import useGame from './hooks/useGame';

export default {
  name: 'App',
  setup() {
    const { deck, startNewGame, showCard, remainingPairs, formattedTime, gameStatus } = useGame();

    onMounted(() => startNewGame());

    const onCardClick = ({ frontValue, position }) => {
      showCard(position);
      console.log(frontValue, position);
    };

    return { deck, startNewGame, onCardClick, remainingPairs, formattedTime, gameStatus };
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
</style>
