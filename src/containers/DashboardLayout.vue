<template>
    <div class="main-wrapper" ref="mainWrapper" >
        <SideDrawer id="sideDrawer" ref="sideDrawer" v-if="$root.ready" ></SideDrawer>
        <div class="left-wrapper" v-if="$root.ready">
            <PageHeader @toogleSideDrawer="toogleSideDrawer" />
            <DxScrollView show-scrollbar="onHover">
                <div class="content-wrapper" v-loading="$root.loading">
                    <transition name="slide-fade">
                        <router-view ref="contentPage" v-if="!$suiteStored.reRenderSuite"></router-view>
                    </transition>
                </div>
                <PageFooter/>
            </DxScrollView>
        </div>
    </div>
</template>

<script>

import {
    Footer as PageFooter,
    Header as PageHeader,
    SideDrawer
} from '../layouts/dashboard'
import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'DashboardLayout',
    components: {
        PageFooter,
        PageHeader,
        SideDrawer,
    },
    data() {
        return {
            re_render: false,
            countInterval: null,
            show_select_store: false,
            store_list: [],
        }
    },
    mounted() {
        console.log(this.$root.ready)
    },
    methods: {
        toogleSideDrawer() {
            this.$refs.sideDrawer.isShow = !this.$refs.sideDrawer.isShow;
        },

        hideSideDrawer() {
            if (!this.$suiteStored.largeScreen) {
                this.$refs.sideDrawer.isShow = false;
            }
        },
        showSelectStoreModal(isShow = true) {
            if (isShow) {
                this.show_select_store = true;
            } else {
                this.show_select_store = false;
                if (this.$suiteStored.showSelectStoreModal) {
                    this.$suiteStored.showSelectStoreModal = false;
                }
            }
        },
        onSelectStores(stores) {
            this.$suiteStored.selectedStores = stores
            if (!this.$suiteStored.largeScreen) {
                this.$suiteStored.showSideDrawer = false
                this.hideSideDrawer()
            }
        },
        getSuiteNotifyCount() {
            this.getNotifyCount()
            if (this.countInterval) return
            let time = 60000
            this.countInterval = workerTimers.setInterval(() => {
                this.getNotifyCount()
            }, time)
        },

        onClickOutside(e) {
            if (e.target.classList && e.target.classList.contains('el-fold')) {
                return
            }
            if (!this.$suiteStored.largeScreen) {
                this.$suiteStored.showSideDrawer = false
                this.hideSideDrawer()
            }
        },

        onSwipeRight(e) {
            e.preventDefault();
            if (!this.$suiteStored.largeScreen) {
                this.$refs.sideDrawer.isShow = true
            }
        }
    },
    watch: {
        "$root.ready"(n, o) {
            if (n && this.$refs.mainWrapper.clientWidth > 1000) {
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$suiteStored.largeScreen = true
                        this.$suiteStored.showSideDrawer = true
                        this.$refs.sideDrawer.isShow = true
                    }, 200);
                })
            }
        },
        "$suiteStored.showSideDrawer"(isShow) {
            let body = document.getElementsByTagName('body')[0];
            this.$nextTick(() => {
                if (isShow) {
                    body.classList.add('show-drawer')
                } else {
                    body.classList.remove('show-drawer')
                }
            })
        },
    },

    beforeDestroy() {
        if (this.countInterval)  {
            workerTimers.clearInterval(this.countInterval)
        }
    }
}
</script>

<style>
.slide-fade-enter-active {
    transition: all .3s ease-in-out;
}

.slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>
