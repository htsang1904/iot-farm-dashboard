import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import { createPinia, PiniaVuePlugin } from 'pinia';
import { authStore, suiteStore } from '@/stores';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './plugins/devextreme'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'
import '@/assets/scss/main.scss'

moment.updateLocale('vi', {week: {dow: 1}})
Vue.prototype.moment = moment
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.use(VueRouter);

Vue.use(PiniaVuePlugin);
const pinia = createPinia();
const authStored = {
    install(Vue, options) {
        Vue.prototype.$authStored = authStore(options.pinia)
        Vue.prototype.$suiteStored = suiteStore(options.pinia)
    }
};
Vue.use(authStored, { pinia });
new Vue({
  router,
  pinia,
  render: h => h(App),
  data() {
    return {
        ready: true,
        loading: false,
    }
  },
}).$mount('#app')
