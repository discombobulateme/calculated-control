import Vue from 'vue';
import VueSafeHTML from 'vue-safe-html';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';

import App from './App.vue';
import router from './router';
import translations from './translations';
import { getCurrentLocale } from './locale';
import createStore from './store';

Vue.config.productionTip = false;
Vue.use(VueSafeHTML);
Vue.use(VueI18n);
Vue.use(Vuex);

const i18n = new VueI18n({
  locale: getCurrentLocale(),
  messages: translations,
})

new Vue({
  i18n,
  router,
  render: h => h(App),
  store: createStore(),
}).$mount('#app');
