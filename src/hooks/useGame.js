import { computed, ref, watch, watchEffect } from 'vue';
import { createDeck, shuffleDeck } from '../utils/deck';

export const GAME_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  FINISHED: 'finished',
};

export default function useGame(deckSize = 16) {
  const deck = ref([]);
  const flippedCards = ref([]);
  let intervalHandler;
  let elapsedTime = ref(0);
  let gameStatus = ref(GAME_STATUS.NOT_STARTED);

  const startNewGame = () => {
    deck.value = createDeck(deckSize);
    shuffleDeck(deck.value);
    flippedCards.value = [];
    gameStatus.value = GAME_STATUS.IN_PROGRESS;
    if (intervalHandler) _stopTimer();
    _startTimer();
  };

  const showCard = (position) => {
    if (flippedCards.value.length >= 2) return;

    deck.value[position].isVisible = true;
    flippedCards.value = [...flippedCards.value, deck.value[position]];
  };

  const remainingPairs = computed(() => {
    const totalPairs = Math.ceil(deck.value.length / 2);
    const discoveredPairs = Math.ceil(deck.value.filter((card) => card.isDiscovered).length / 2);
    return totalPairs - discoveredPairs;
  });

  const formattedTime = computed(() => {
    return `${Math.floor(elapsedTime.value / 60)}:${('00' + Math.floor(elapsedTime.value % 60)).slice(-2)}`;
  });

  const _startTimer = () => {
    elapsedTime.value = 0;
    intervalHandler = setInterval(() => {
      elapsedTime.value++;
    }, 1000);
  };

  const _stopTimer = () => clearInterval(intervalHandler);

  const _discoverPair = () => {
    flippedCards.value.forEach((flippedCard) => (flippedCard.isDiscovered = true));
    flippedCards.value = [];
  };

  const _areFlippedCardsEqual = () => {
    return flippedCards.value[0].frontValue === flippedCards.value[1].frontValue;
  };

  const _hideFlippedCards = () => {
    setTimeout(() => {
      flippedCards.value.forEach((flippedCard) => (flippedCard.isVisible = false));
      flippedCards.value = [];
    }, 1000);
  };

  watch(
    flippedCards,
    () => {
      if (flippedCards.value.length >= 2) {
        _areFlippedCardsEqual() ? _discoverPair() : _hideFlippedCards();
      }
    },
    { deep: true }
  );

  watchEffect(() => {
    if (remainingPairs.value === 0) {
      _stopTimer();
      gameStatus.value = GAME_STATUS.FINISHED;
    }
  });

  return { deck, startNewGame, showCard, remainingPairs, formattedTime, gameStatus };
}
