import { ref } from 'vue';
import { createDeck, shuffleDeck } from '../utils/deck';

export default function useGame(deckSize = 16) {
  const deck = ref([]);

  const startNewGame = () => {
    deck.value = createDeck(deckSize);
    shuffleDeck(deck.value);
  };

  return { deck, startNewGame };
}
