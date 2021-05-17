import { computed, ref, watchEffect } from 'vue';
import { createDeck, shuffleDeck } from '../utils/deck';

export default function useGame(deckSize = 16) {
  const deck = ref([]);
  const flippedCards = ref([]);
  let intervalHandler;
  let elapsedTime = ref(0);

  const startNewGame = () => {
    deck.value = createDeck(deckSize);
    shuffleDeck(deck.value);
    _startTimer();
  };

  const showCard = (position) => {
    if (flippedCards.value.length >= 2) return;
    deck.value[position].isVisible = true;
    flippedCards.value = [...flippedCards.value, deck.value[position]];
  };

  watchEffect(() => {
    if (flippedCards.value.length >= 2) {
      _areFlippedCardsEqual() ? _discoverPair() : _hideFlippedCards();
    }
  });

  const pairsFound = computed(() => {
    const discoveredPairs = deck.value.filter((card) => card.isDiscovered).length / 2;
    return `${discoveredPairs} of ${deck.value.length / 2}`;
  });

  const formattedTime = computed(() => {
    return `${Math.floor(elapsedTime.value / 60)}:${('00' + Math.floor(elapsedTime.value % 60)).slice(-2)}`;
  });

  const _startTimer = () => {
    intervalHandler = setInterval(() => {
      elapsedTime.value++;
    }, 1000);
  };

  const _stopTimer = () => {
    clearInterval(intervalHandler);
    elapsedTime.value = 0;
  };

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

  return { deck, startNewGame, showCard, pairsFound, formattedTime, _stopTimer };
}
