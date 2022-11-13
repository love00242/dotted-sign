import { createRouter, createWebHistory } from 'vue-router';
import Edit from '../views/Edit.vue';
import Index from '../views/Index.vue';
import History from '../views/History.vue';
import Record from '../views/Record.vue';
import Sign from '../views/Sign.vue';
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
      path: '/edit',
      name: 'edit',
      component: Edit,
    },
    {
      path: '/history',
      name: 'history',
      component: History,
    },
    {
      path: '/record',
      name: 'record',
      component: Record,
    },
    {
      path: '/sign',
      name: 'sign',
      component: Sign,
    },
    {
      path: '/finish',
      name: 'finish',
      component: Finish,
    },
  ],
});

export default router;
