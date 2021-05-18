export const dummyScoreEntries = [
  { name: 'memgamePro69', time: 3 },
  { name: 'MadMax', time: 4 },
  { name: 'Henrik Larsson', time: 5 },
  { name: 'Zlatan', time: 24 },
  { name: 'xTheBesTx', time: 89 },
  { name: 'pikachu', time: 31 },
  { name: 'aaa', time: 14 },
  { name: 'bbb', time: 19 },
  { name: 'f0rest', time: 91 },
  { name: 'get_right', time: 12 },
];

export const sortScores = (scores) => scores.sort((a, b) => a.time - b.time);
