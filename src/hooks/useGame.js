import { ref, watchEffect } from 'vue';
import { createDeck, shuffleDeck } from '../utils/deck';

export default function useGame(deckSize = 16) {
  const deck = ref([]);
  const flippedCards = ref([]);

  const startNewGame = () => {
    deck.value = createDeck(deckSize);
    shuffleDeck(deck.value);
  };

  const showCard = (position) => {
    if (flippedCards.value.length >= 2) return;
    deck.value[position].isVisible = true;
    flippedCards.value = [...flippedCards.value, deck.value[position]];
  };

  watchEffect(() => {
    if (flippedCards.value.length >= 2) {
      setTimeout(() => {
        flippedCards.value.forEach((flippedCard) => (flippedCard.isVisible = false));
        flippedCards.value = [];
      }, 1000);
    }
  });

  return { deck, startNewGame, showCard };
}
