import { ref } from 'vue';
import { dummyScoreEntries } from '../utils/score';

export default function useScore(useDummyScores = false) {
  const scores = ref(useDummyScores ? dummyScoreEntries : []);

  return { scores };
}
