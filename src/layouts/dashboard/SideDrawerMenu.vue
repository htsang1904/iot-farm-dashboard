<template>
    <el-menu :ref="isAdmin ? 'adminMenu' : 'menu'" router class="main-menu"  :default-active="currentRoute">
        <template v-for="(menuItem, index) in menuItems">
            <el-submenu
                :class="{'is-active': isSubMenuActive(menuItem)}"
                v-if="menuItem.subMenus && menuItem.subMenus.length"
                :key="(isAdmin ? 'admin' : '') + index"
                :tabindex="index"
                :index="menuItem.to">
                <template slot="title" >
                    <div class="menu-icon-box">
                        <i class="menu-icon" :class="menuItem.icon"></i>
                    </div>
                    {{menuItem.label}}
                </template>
                <template v-if="menuItem.subMenus && menuItem.subMenus.length">
                    <el-menu-item
                        v-for="(subMenu, itemIndex) in menuItem.subMenus"
                        :class="{'is-active': isSubMenuItemActive(subMenu)}"
                        :key="itemIndex"
                        :index="subMenu.to"
                        @click="onClickMenu">
                        <router-link :to="subMenu.to">
                            {{subMenu.label}}
                        </router-link>
                    </el-menu-item>
                </template>
            </el-submenu>
            <el-menu-item v-else
                :key="(isAdmin ? 'admin' : '') + index"
                :tabindex="index"
                :index="menuItem.to"
                @click="onClickMenu">
                <template slot="title" >
                    <router-link :to="menuItem.to">
                        <div class="menu-icon-box">
                            <i class="menu-icon" :class="menuItem.icon"></i>
                        </div>
                        {{menuItem.label}}
                        <div class="notify-count" v-if="notifyCount.total && countOfMenu(menuItem.to)"> {{ countOfMenu(menuItem.to) }} </div>
                    </router-link>
                </template>
            </el-menu-item>
        </template>
        <slot name="addon"></slot>
    </el-menu>
</template>
<script>
export default {
    props: {
        currentRoute: {
            type: String,
            default: ''
        },
        menuItems: {
            type: Array,
            default: () => []
        },
        isAdmin: {
            type: Boolean,
            default: false
        }

    },

    computed: {
        notifyCount() {
            return this.$suiteStored.notifyCount
        },

    },

    methods: {
        isSubMenuActive(subMenu) {
            let menuItems = subMenu.subMenus || [];
            return menuItems.some(menuItem => this.currentRoute.includes(menuItem.to));
        },

        isSubMenuItemActive(subMenu) {
            return this.currentRoute.includes(subMenu.to)
        },

        onClickMenu() {
            this.$emit('clickMenu');
        },

        open(to, isAdmin) {
            let menu = isAdmin ? this.$refs.adminMenu : this.$refs.menu;
            menu.open(to);
        },

        countOfMenu(menu) {
            let count = 0
            switch (menu) {
                case '/onlineorders':
                    count = this.notifyCount.order;
                    return count;

                case '/inventory':
                    count = this.notifyCount.inventory;
                    return count;

                default:
                    return 0;
            }
        },
    }
}
</script>
