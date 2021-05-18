import { createRouter, createWebHistory } from 'vue-router';
import Game from '../components/Game.vue';
import Scoreboard from '../components/Scoreboard.vue';

const routes = [
  {
    path: '/game',
    name: 'Game',
    component: Game,
  },
  {
    path: '/score',
    name: 'Scoreboard',
    component: Scoreboard,
  },
  { path: '/', redirect: '/game' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
