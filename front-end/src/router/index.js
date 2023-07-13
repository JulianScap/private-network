import { createRouter, createWebHistory } from 'vue-router';

import PostsView from '../views/PostsView.vue';
import LinksView from '../views/LinksView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'posts',
      component: PostsView,
    },
    {
      path: '/links',
      name: 'links',
      component: LinksView,
    },
  ],
});

export default router;
