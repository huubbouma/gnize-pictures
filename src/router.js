import { createWebHistory, createRouter } from 'vue-router';
import Main from '@/views/Main.vue';
import store from './store';
import Login from './views/Login.vue';

const routes = [
  {
    path: '/:path?',
    name: 'Main',
    props: true,
    component: Main,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login/:nextUrl?',
    name: 'Login',
    props: true,
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit('incrementRouteChanged');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('initialiseStore').then(() => {
      if (store.getters.isLoggedIn) {
        next();
      } else {
        next({ name: 'Login', params: { nextUrl: to.fullPath }, replace: true });
      }
    });
  } else {
    next();
  }
});

export default router;
