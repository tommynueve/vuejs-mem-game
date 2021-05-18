import { ref, computed } from 'vue';
import { dummyScoreEntries, sortScores } from '../utils/score';

const scores = ref(dummyScoreEntries);
let newTime = ref(null);

export default function useScore() {
  const addNewScorePendingName = (time) => {
    newTime.value = time;
  };

  const completeScorePendingName = (name) => {
    scores.value = [...scores.value, { name, time: newTime.value }];
    clearNewTime();
  };

  const clearNewTime = () => (newTime.value = null);

  const topScores = computed((max = 10) => sortScores(scores.value).slice(0, max));

  const isTopScore = (time) => {
    return time < topScores.value[topScores.value.length - 1].time;
  };

  return { topScores, addNewScorePendingName, completeScorePendingName, isTopScore, newTime, clearNewTime };
}
