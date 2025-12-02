<template>
    <div class="drawer">
        <div id="sidedrawer" :class="{show: isShow, collapsed: isCollapseMain}" >
            <div class="main-menu-wrapper">
                <div class="main-menu-scrollable">
                    <DxScrollView id="sidebar-scroll" show-scrollbar="onHover">
                        <SideDrawerMenu
                            key="suiteMenus"
                            ref="suiteMenus"
                            :currentRoute="currentRoute"
                            :menuItems="menuItems"
                            @clickMenu="onClickMenu"
                        >
                        </SideDrawerMenu>
                    </DxScrollView>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import menu from '@/config/menu';
import SideDrawerMenu from './SideDrawerMenu.vue';

export default {
    data() {
        return {
            isShow: false,
            isShowAdminMenus: false,
            isCollapseMain: false,
        }
    },

    components: {
        SideDrawerMenu
    },

    computed: {
        menuItems() {
            if (this.$authStored.haveNoStore) {
                /** Chỉ hiện Dashboard */
                return menu.filter(menuItem => menuItem.to === '/dashboard');
            }
            let menus  = menu.filter(menuItem => !menuItem.perms || this.$can.hasPermissions(...menuItem.perms));
            menus.forEach(menu => {
                if (menu.subMenus && menu.subMenus.length) {
                    menu.subMenus = menu.subMenus.filter(subMenu => !subMenu.perms || this.$can.hasPermissions(...subMenu.perms));
                }
            })
            return menus
        },
        selectedStoreCount() {
            return this.$suiteStored.selectedStores.length
        },
        isSelectAllStore() {
            return this.selectedStoreCount === this.$authStored.storeList.store_ids.length
        },
        allStoreList() {
            return [].concat.apply([], Object.values(this.$authStored.storeList.stores));
        },
        currentRoute() {
            return this.$route.path;
        },
    },

    methods: {
        onClickOutside(){
            this.isCollapseMain = false;
        },

        onClickMenu() {
            if (!this.$suiteStored.largeScreen) {
                this.isShow = false
            }
            this.onClickOutside()
        },

        onShowSelectStore() {
            this.$suiteStored.showSelectStoreModal = true
        },

        isSubMenuActive(subMenu) {
            let menuItems = subMenu.subMenus || [];
            return menuItems.some(menuItem => this.currentRoute.includes(menuItem.to));
        },

        isSubMenuItemActive(subMenu) {
            return this.currentRoute.includes(subMenu.to)
        },

        toggleCollapseActiveSubMenus() {
            this.adminMenuItems.forEach((menuItem, index) => {
                if (menuItem.subMenus && menuItem.subMenus.length) {
                    let isHaveMenuItemActive = this.isSubMenuActive(menuItem);
                    if (isHaveMenuItemActive) {
                        this.$refs.adminMenus.open(menuItem.to, true)
                    }
                }
            })
        }
    },

    watch: {
        isShow(n, o) {
            this.$suiteStored.showSideDrawer = this.isShow
            if (!n) {
                this.onClickOutside()
            }
        },

    }
}
</script>
<style lang="scss">
@import "~@/assets/scss/variables.scss";
.store-selection {
    position: relative;
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    background: $secondNavbarBg;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;

    .store-name {
        max-width: 215px;

        &.smaller {
            font-size: 90%;
        }
    }

    .change-btn {
        position: absolute;
        right: 8px;
        top: 0px;
    }
}
.store-selection-icon {
    position: absolute;
    height: 60px;
    line-height: 60px;
    width: 60px;
    text-align: center;
    top: 0;
    left: 0;
    border-radius: 5px;
    font-size: 16px !important;
}
.collapsed span{
    display: none !important;
}
.collapsed, .el-menu--collapse {
    width: 60px !important;
}
.collapsed-sub-menu {
    width: 250px;
    float: right;
}
.main-menu-wrapper {
    .main-menu .nav-item {
        padding: 5px 10px;
        overflow: hidden;
        &:first-of-type {
            padding-top: 10px;
        }
        .nav-link {
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
        }
    }
    .el-menu-item,
    .el-submenu {
        width: calc(100% - 20px);
        font-size: 16px;
        line-height: 40px;
        padding: 0 10px !important;
        margin: 8px 10px;
        border-radius: 5px;
        color: #5d5d5d;
        box-sizing: border-box;
        overflow: hidden;
        transition-duration: .1s;
        &:hover, &:focus {
            background-color: #fff;
        }
        &.is-active {
            background-color: #fff;
            color: $mainColorDarker !important;
            box-shadow: 0 1px 3px rgba(0,0,0,.1);
            i.menu-icon{
                color: #0471d1 !important;
            }
            .el-submenu__title {
                color: #151515 !important;
            }
        }
        .menu-icon-box {
            display: inline-block;
            height: 28px;
            text-align: center;
            line-height: 28px;
            margin: -2px 0 0 -5px;
            border-radius: 5px;
        }
        i.menu-icon{
            font-size: 20px !important;
            width: 28px;
            padding-right: 13px;
            margin-right: 2px;
            color: #3a5975;
            left: 0;
            &::before{
                text-align: center;
                display: block;
                width: 28px;
            }
            &.fa-dolly-flatbed,
            &.fa-user-cog {
                font-size: 18px !important;
            }
        }
        .el-submenu__title{
            height: 40px;
            line-height: 40px;
            position: relative;
            border-radius: 5px;
            font-size: 16px;
            position: relative;
            padding: 0 !important;
            color: #5d5d5d;
            &:hover {
                background-color: #F6F6F6;
            }
            i.el-submenu__icon-arrow {
                right: 0;
            }
            &:hover, &:focus {
                background: #fff;
            }
        }
        .el-menu--inline {
            border-radius: 5px;
            margin-bottom: 5px;
            .el-menu-item {
                font-size: 14px;
                margin: 5px;
            }
        }
        a {
            color: unset;
            text-decoration: unset;
            display: block;
            width: 100%;
        }
    }

    .el-submenu {
        .el-menu-item.is-active {
        background-color: #f3f3f3;
        box-shadow: none;
        // color: #5d5d5d !important;
        // box-shadow: 0 1px 3px rgba(0,0,0,.1);
        // .el-submenu__title {
        //     color: #5d5d5d !important;
        // }
    }
    }

    .el-menu-item {
        height: 40px;
        .notify-count {
            text-align: center;
            position: absolute;
            top: 8px;
            right: 5px;
            padding: 0 5px;
            background: #f56c6c;
            border: 1px solid #fff;
            height: 22px;
            color: #fff;
            line-height: 22px;
            border-radius: 5px;
            font-size: 12px;
            min-width: 22px;
            font-weight: 700;
        }
    }
    .active .el-menu-item{
        color: #fff !important;
    }
    .admin-menu-list:not(.el-menu--collapse) {
        width: 250px;
        overflow-y: auto;
        height: 100%;
    }
}
.sub-sidebar {
    width: 310px !important;
    left: -310px !important;
    z-index: 98 !important;
    &.show {
        transform: translateX(310px) !important;
    }
    .admin-main-menu {
        height: 100%;
        overflow: auto;
        .main-menu {
            height: 100%;
        }
        .super-admin-menu {
            height: fit-content;
            border-top: 1px solid #eaeaea;
        }
    }
}
</style>
