import { createApp } from 'vue';

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import TabView from 'primevue/tabview';
import Galleria from 'primevue/galleria';
import Panel from 'primevue/panel';
import Breadcrumb from 'primevue/breadcrumb';

import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import { VuelidatePlugin } from '@vuelidate/core';

import axios from 'axios';
import VueAxios from 'vue-axios';

import store from './store';
import router from './router';
import App from './App.vue';

// import 'primevue/resources/themes/saga-blue/theme.css'; // theme
// import 'primevue/resources/themes/rhea/theme.css';
import 'primevue/resources/themes/nova-vue/theme.css';
import 'primevue/resources/primevue.min.css'; // core css
import 'primeicons/primeicons.css'; // icons

import 'primeflex/primeflex.css';

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
app.component('TabView', TabView);
app.component('Galleria', Galleria);
app.component('Panel', Panel);
app.component('Breadcrumb', Breadcrumb);

// const setImgSrc = (el, binding) => {
//   if (binding.oldValue === undefined || binding.value !== binding.oldValue) {
//     const imageUrl = binding.value;
//     axios({
//       method: 'get',
//       url: imageUrl,
//       responseType: 'arraybuffer',
//     })
//       .then(resp => {
//         const mimeType = resp.headers['content-type'].toLowerCase();
//         const imgBase64 = Buffer.from(resp.data, 'binary').toString('base64');
//         // eslint-disable-next-line no-param-reassign
//         el.src = `data:${mimeType};base64,${imgBase64}`;
//       })
//       .catch(() => {
//         // eslint-disable-next-line no-param-reassign
//         el.src = imageUrl;
//       });
//   }
// };

// app.directive('auth-src', {
//   beforeMount(el, binding) {
//     setImgSrc(el, binding);
//   },
//   beforeUpdate(el, binding) {
//     setImgSrc(el, binding);
//   },
// });

app.mount('#app');

store.dispatch('initialiseStore');
