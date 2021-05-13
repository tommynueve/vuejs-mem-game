const cardFrontValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export const createDeck = (cards = 16) => {
  if (cards % 2 !== 0) throw Error('Deck must contain a number of cards divisible by 2.');
  const firstSetOfCards = Array.from({ length: cards / 2 }, (_, i) => ({
    frontValue: cardFrontValues[i],
    isVisible: false,
    isDiscovered: false,
  }));
  return [...firstSetOfCards, ...JSON.parse(JSON.stringify(firstSetOfCards))];
};

export const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
};
