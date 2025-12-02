import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElementLocale from 'element-ui/lib/locale'
import locale from 'element-ui/lib/locale/lang/vi'
// import SuitePopup from '@/components/common/SuitePopup.vue'
// import SuiteFullModal from '@/components/common/SuiteFullModal.vue'
import notify from 'devextreme/ui/notify';
import hideToasts from 'devextreme/ui/toast/hide_toasts';
ElementLocale.use(locale);
Vue.use(Element)
// Vue.use(SuitePopup)
// Vue.component('SuitePopup', SuitePopup)
// Vue.use(SuiteFullModal)
// Vue.component('SuiteFullModal', SuiteFullModal)

let suiteMessage = new Vue({
    methods: {
        notify(
            message,
            type = 'info',
            displayTime = 3000,
            position = 'top center',
            direction = 'down-push'
        ) {
            notify({
                message: message,
                height: 45,
                minWidth: 200,
                maxWidth: 400,
                width: '90vw',
                type: type,
                displayTime: displayTime,
                animation: {
                    show: { type: 'fade', duration: 400, from: 0, to: 1,},
                    hide: { type: 'fade', duration: 40, to: 0 },
                },
            },
            { position, direction });
        },

        hideNotify() {
            hideToasts();
        },

        error(message) {
            this.notify(message, 'error')
        },

        success(message) {
            this.notify(message, 'success')
        },

        warning(message) {
            this.notify(message, 'warning')
        }
    }
})

Vue.prototype.$suiteMessage = suiteMessage
