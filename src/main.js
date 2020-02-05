import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './router/beforeEach';
import './plugins/element';
import './plugins/vue-components';
import './plugins/vue-directives';
import './plugins/vue-filters';
import './plugins/vue-inject';
import './plugins/vue-scroll';
// css
import './assets/style/index.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
