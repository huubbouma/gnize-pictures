import { createWebHistory, createRouter } from 'vue-router';
import Main from '@/views/Main.vue';
import store from './store';
import Login from './views/Login.vue';

// https://stackoverflow.com/a/52721706
window.popStateDetected = false;
window.addEventListener('popstate', () => {
  window.popStateDetected = true;
});

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const IsItABackButton = window.popStateDetected;
  window.popStateDetected = false;

  // check if we're in a overlay. If we are, just close it
  const { currentItem } = store.getters;
  if (IsItABackButton && currentItem && currentItem.folderPath) {
    // const folderPath = `/${currentItem.folderUri}`;
    store.commit('setCurrentItem', null);
    // console.log(folderPath);
    // window.history.pushState({}, null, folderPath);
    // next(false);
    // return;
  }

  if (IsItABackButton) {
    // console.log(to.fullPath);

    if (currentItem && currentItem.folderPath) {
      // console.log(`back to folder: ${currentItem.folderUri}`);
      next({ path: `/${currentItem.folderUri}`, replace: true });
      window.history.replaceState(window.history.state, '', `/${currentItem.folderUri}`);
      return;
    }

    // traverse up the path
    let newPath = `${from.fullPath
      .split('/')
      .slice(0, -1)
      .join('/')}`;
    if (newPath === '') {
      newPath = '/';
    }
    // console.log(newPath);
    next({ path: newPath, replace: true });
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
