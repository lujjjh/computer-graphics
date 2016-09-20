import Vue from 'vue';
import Electron from 'vue-electron';
import Resource from 'vue-resource';
import Router from 'vue-router';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index';

import App from './App';
import routes from './routes';

Vue.use(Electron);
Vue.use(Resource);
Vue.use(Router);
Vue.use(Element);
Vue.config.debug = true;

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
});

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app');
