import { defineStore } from 'pinia'
import moment from 'moment'
import { cloneDeep } from 'lodash-es'


export const suiteStore = defineStore('suiteStore', {
    state: () => ({
        currentDeviceType: 'desktop',
        locations: [],
        currentLocation: null,
        selectedStores: [],
        notifyCount: {
            total: 0,
            order: 0
        },
        largeScreen: false,
        selectedDate: {
            start: moment().toDate(),
            end: moment().toDate()
        },
        selectedCompareDate: null,
        selectedTime: {
            start: '00:00:00',
            end: '23:59:59'
        },
        defaultSelectedDate: null,
        displayType: 'normal',
        brands: [],
        currentBrand: null,
        isModalChangedDate: false,
        showSideDrawer: false,
        isHaveModal: false,
        reRenderModal: false,
        reRenderSuite: false,
        resetDateOnClose: false,
        forceHeaderLogo: false,
        forceReRender: false,
        changedSelectedDate: false,
        showSelectStoreModal: false
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
         reRender() {
            if (!this.isHaveModal) {
                this.reRenderSuite = true
                setTimeout(() => {
                    this.reRenderSuite = false
                }, 100);
                console.warn('reRenderSuite')
            } else {
                this.reRenderModal = true
                setTimeout(() => {
                    this.reRenderModal = false
                }, 100);
                console.warn('reRenderModal')
            }
        },
        onShowReportModal() {
            this.isHaveModal = true
        },
        onHideReportModal() {
            /** Reset lại ngày gốc trong trường hợp
             * user thay đổi ngày ở modal fullscreen có datepicker
             */
            if (this.resetDateOnClose && !this.reRenderModal) {
                this.selectedDate = cloneDeep(this.defaultSelectedDate)
                this.resetDateOnClose = false
                this.defaultSelectedDate = null
            }
            this.isHaveModal = false
            this.forceHeaderLogo = false
        },
    }
})

