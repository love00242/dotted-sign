import { createRouter, createWebHistory } from 'vue-router';
import Edit from '../views/Edit.vue';
import Index from '../views/Index.vue';
import History from '../views/History.vue';
import Record from '../views/Record.vue';
import Finish from '../views/Finish.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,   
    },
    {
      path: '/',
      name: 'edit',
      component: Edit,
    },
    {
      path: '/',
      name: 'history',
      component: History,
    },
    {
      path: '/',
      name: 'record',
      component: Record,
    },
    {
      path: '/',
      name: 'finish',
      component: Finish,
    },
  ],
});

export default router;
