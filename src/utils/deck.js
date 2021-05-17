const cardFrontValues = [
  { value: 'A', image: 'GenZ.jpg' },
  { value: 'B', image: 'JustCause3.jpg' },
  { value: 'C', image: 'JustCause4.jpg' },
  { value: 'D', image: 'MadMax.jpg' },
  { value: 'E', image: 'Rage2.jpg' },
  { value: 'F', image: 'SecondExtinction.jpg' },
  { value: 'G', image: 'theHunter.jpg' },
  { value: 'H', image: 'TheHunter2.jpg' },
];

export const createDeck = (cards = 16) => {
  if (cards % 2 !== 0) throw Error('Deck must contain a number of cards divisible by 2.');
  if (cards > 16) throw Error('Maximum allowed cards is 16 (8 pairs).');
  const firstSetOfCards = Array.from({ length: cards }, (_, i) => ({
    key: i,
    frontValue: cardFrontValues[i < cards / 2 ? i : i - cards / 2].value,
    frontImage: cardFrontValues[i < cards / 2 ? i : i - cards / 2].image,
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
