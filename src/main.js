import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import 'virtual:svg-icons-register';
import SvgIcon from '@/components/SvgIcon.vue';

//Lottie動畫
import Vue3Lottie from 'vue3-lottie';
import 'vue3-lottie/dist/style.css';

import '@/assets/styles/main.css';
import '@/assets/styles/tailwind.css';

const app = createApp(App);

app.use(router);
app.use(createPinia().use(piniaPluginPersistedstate));
app.use(Vue3Lottie);
app.component('SvgIcon', SvgIcon);
app.mount('#app');
