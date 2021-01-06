import { createWebHistory, createRouter } from 'vue-router';
import Main from '@/views/Main.vue';
import Admin from '@/views/Admin.vue';
import store from './store';
import Login from './views/Login.vue';

const routes = [
  {
    path: '/:path*/!:itemId?',
    name: 'MainDetail',
    props: true,
    component: Main,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:path*',
    name: 'Main',
    props: true,
    component: Main,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/@login/:nextUrl?',
    name: 'Login',
    props: true,
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/@admin',
    name: 'Admin',
    props: false,
    component: Admin,
    meta: {
      requiresAuth: true,
      requiresAccess: 'admin',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // check if we're in a overlay. If we are, just close it
  const { currentItem } = store.getters;
  if (currentItem && currentItem.folderPath) {
    const folderPath = `/${currentItem.folderUri}`;
    window.history.pushState({}, null, folderPath);
    store.commit('setCurrentItem', null);
    next(false);
    return;
  }

  const requiresAccess = to.matched
    .filter(record => record.meta.requiresAccess)
    .map(record => record.meta.requiresAccess);
  const requiresAuth = requiresAccess.length || to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth || requiresAccess.length) {
    store.dispatch('initialiseStore').then(() => {
      const { role } = store.getters;
      const correctAccess = !requiresAccess.length || requiresAccess.includes(role);
      const { isLoggedIn } = store.getters;
      if (!isLoggedIn || !correctAccess) {
        next({ name: 'Login', params: { nextUrl: to.fullPath }, replace: true });
      } else {
        next();
      }
    });
  } else {
    next();
  }

  // return true;
});

export default router;
