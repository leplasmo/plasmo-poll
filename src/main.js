// ./src/main.js

import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import hooks from '@u3u/vue-hooks';
import vuetify from './plugins/vuetify';

import App from './components/App.vue';
import store from './store';
import router from './router';

Vue.use(hooks);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  // el: '#app',
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
