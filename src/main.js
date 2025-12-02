import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import { createPinia, PiniaVuePlugin } from 'pinia';
import { authStore, suiteStore } from '@/stores';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './plugins/element'
import './plugins/devextreme'
import '@/assets/scss/pages/main.scss';
import '@/assets/scss/base/dx.generic.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'
import { $ } from './utils/$'
import { robotLoading } from './directives'


moment.updateLocale('vi', {week: {dow: 1}})
Vue.prototype.moment = moment
Vue.use(ElementUI);
Vue.use(robotLoading)
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
        ready: false,
        loading: false,
    }
  },
  mounted() {
    setTimeout(()=>{
      this.ready = true
      // router.push('/login');
    }, 2000)
    // if (this.$authStored.isAuth && !this.$authStored.isHasProfile) {
    //     this.$authStored.getProfile()
    //         .then(res => {
    //             let storeList = this.$authStored.storeList
    //             if (storeList.count === 1) {
    //                 this.$suiteStored.selectedStores = [storeList.stores[Object.keys(storeList.stores)[0]][0]]
    //             } else {
    //                 this.$suiteStored.selectedStores = Object.keys(storeList.stores).reduce((stores, brand) => {
    //                     let brand_stores = this.$authStored.storeList.stores[brand]
    //                     stores = stores.concat(brand_stores);
    //                     return stores;
    //                 }, [])
    //             }
    //             this.ready = true;
    //             this.$socket.emit('staff_auth', getToken());
    //             this.$OneSignal.sendTag('staff_id', this.$authStored.profile.id)
    //     })
    //         .catch((error) => {
    //             this.ready = true;
    //             if (error.response && error.response.status === 401) {
    //                 this.$OneSignal.deleteTag('staff_id').then(res => {
    //                     console.warn('Deleted Staff ID')
    //                 })
    //                 router.push('/login');
    //             } else {
    //                 router.push('/503');
    //             }

    //         })
    //     this.loading = false;
    // } else {
    //     this.ready = true;
    //     this.$OneSignal.deleteTag('staff_id').then(res => {
    //         console.warn('Deleted Staff ID')
    //     })
    //     router.push('/login');
    // }
  },
  watch: {
    ready: (isReady) => {
        $.triggerEvent(document.body, !isReady ? 'start-load' : 'end-load');
    },
  }
}).$mount('#app')
