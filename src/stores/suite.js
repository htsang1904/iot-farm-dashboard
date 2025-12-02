import { defineStore } from 'pinia'
import moment from 'moment'
import { cloneDeep } from 'lodash-es'


export const suiteStore = defineStore('suiteStore', {
    state: () => ({
        currentDeviceType: 'desktop',
        notifyCount: {
            total: 0,
            order: 0
        },
         showSideDrawer: false,
         largeScreen: true,
    }),
    getters: {
        isDesktop() {
            return this.currentDeviceType === 'desktop'
        },
        isMobile() {
            return this.currentDeviceType === 'phone'
        }
    },
    actions: {
    }
})

