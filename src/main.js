import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'virtual:svg-icons-register';
import SvgIcon from '@/components/SvgIcon.vue';

import '@/assets/styles/main.css';
import '@/assets/styles/tailwind.css';

const app = createApp(App);

app.use(router);
app.component('SvgIcon', SvgIcon);
app.mount('#app');
