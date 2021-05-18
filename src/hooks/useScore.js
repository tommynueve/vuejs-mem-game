import { ref, computed } from 'vue';
import { dummyScoreEntries, sortScores } from '../utils/score';

const scores = ref(dummyScoreEntries);

export default function useScore() {
  const addNewScore = (name, time) => {
    scores.value = [...scores.value, { name, time }];
  };

  const topScores = computed((max = 10) => sortScores(scores.value).slice(0, max));

  return { topScores, addNewScore };
}
