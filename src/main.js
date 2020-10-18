import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'vant/lib/icon/local.css';
import { Icon } from 'vant';
import DemoBlock from './components/demo/block';
import DemoSection from './components/demo/section';
import './components';

Vue.use(Icon);
Vue.component(DemoBlock.name, DemoBlock);
Vue.component(DemoSection.name, DemoSection);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
