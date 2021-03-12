import Vue from 'vue';
import VueSafeHTML from 'vue-safe-html';
import VueI18n from 'vue-i18n'

import App from './App.vue';
import router from './router';
import translations from './translations';
import { getCurrentLocale } from './locale';

Vue.config.productionTip = false;
Vue.use(VueSafeHTML);
Vue.use(VueI18n);

console.log(getCurrentLocale(), translations);

const i18n = new VueI18n({
  locale: getCurrentLocale(),
  messages: translations,
})

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app');
