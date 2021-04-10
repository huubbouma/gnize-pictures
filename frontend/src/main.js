import { createApp } from 'vue';

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Breadcrumb from 'primevue/breadcrumb';
import InputSwitch from 'primevue/inputswitch';
import ProgressSpinner from 'primevue/progressspinner';
import Card from 'primevue/card';
import ToggleButton from 'primevue/togglebutton';
import ScrollTop from 'primevue/scrolltop';
import Dialog from 'primevue/dialog';
import Sidebar from 'primevue/sidebar';
import Inplace from 'primevue/inplace';

import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import { VuelidatePlugin } from '@vuelidate/core';

import axios from 'axios';
import VueAxios from 'vue-axios';

import store from './store';
import router from './router';
import App from './App.vue';

import LongPress from './directives/longpress';

import 'primevue/resources/themes/nova-vue/theme.css';
import 'primevue/resources/primevue.min.css'; // core css
import 'primeicons/primeicons.css'; // icons

import 'primeflex/primeflex.css';
import './registerServiceWorker';

const app = createApp(App);

app.use(VueAxios, axios);
app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(VuelidatePlugin);

app.component('Toast', Toast);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Breadcrumb', Breadcrumb);
app.component('InputSwitch', InputSwitch);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Card', Card);
app.component('ToggleButton', ToggleButton);
app.component('ScrollTop', ScrollTop);
app.component('Sidebar', Sidebar);
app.component('Dialog', Dialog);
app.component('Inplace', Inplace);

app.directive('longpress', LongPress.bind);

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

store.dispatch('initialiseStore');
