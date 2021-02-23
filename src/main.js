import Vue from 'vue';
import VueSafeHTML from 'vue-safe-html';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueSafeHTML);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
