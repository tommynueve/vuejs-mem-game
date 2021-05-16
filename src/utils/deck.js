const cardFrontValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export const createDeck = (cards = 16) => {
  if (cards % 2 !== 0) throw Error('Deck must contain a number of cards divisible by 2.');
  const firstSetOfCards = Array.from({ length: cards }, (_, i) => ({
    key: i,
    frontValue: cardFrontValues[i < cards / 2 ? i : i - cards / 2],
    isVisible: false,
    isDiscovered: false,
  }));
  return firstSetOfCards;
};

export const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
};
