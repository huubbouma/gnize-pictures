import { createApp } from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import store from './store';
import App from './App.vue';

const app = createApp(App);

app.use(VueAxios, axios);
app.use(store);

// directive to set loaded flag when image is loaded from cache (complete)
app.directive('loaded-if-complete', {
  beforeUpdate(el, binding) {
    if (el.complete) {
      // eslint-disable-next-line no-param-reassign
      binding.value = true;
    }
  },
});

app.mount('#app');
