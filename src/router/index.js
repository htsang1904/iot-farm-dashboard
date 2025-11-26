import Vue from 'vue'
import Router from 'vue-router'

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL || '/',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            name: 'App',
            component: () => import('@/containers/DashboardLayout.vue'),
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Home,
                    meta: { auth: true }
                },
                {
                    path: 'store-report',
                    name: 'StoreReport',
                    component: () => import(
                        /* webpackChunkName: "report" */
                        '../pages/OverviewReport.vue'
                    ),
                    meta: {
                        perms: Can.Permissions.Suite__Storereport__Access
                    }
                },
                {
                    path: 'onlineorders',
                    name: 'OnlineOrders',
                    component: () => import(
                        /* webpackChunkName: "online_orders" */
                        '../pages/OnlineOrders.vue'
                    ),
                    props: true,
                    meta: {
                        perms: Can.Permissions.Suite__Order__Access
                    }
                },
                {
                    path: 'timekeeping',
                    name: 'Timekeeping',
                    component: () => import(
                        /* webpackChunkName: "timekeeping" */
                        '../pages/Timekeeping.vue'
                    ),
                    meta: {
                        perms: Can.Permissions.Suite__Timekeeping__Access
                    }
                },
                {
                    path: 'period-report',
                    name: 'PeriodReport',
                    component: () => import(
                        /* webpackChunkName: "period_reports" */
                        '../pages/PeriodReport.vue'
                    ),
                    props: true
                },
                {
                    path: 'profit-report',
                    name: 'ProfitReport',
                    component: () => import(
                        /* webpackChunkName: "profit_reports" */
                        '../pages/ProfitReport.vue'
                    ),
                    props: true
                },
                {
                    path: 'menu-report',
                    name: 'MenuReport',
                    component: () => import(
                        /* webpackChunkName: "menu_reports" */
                        '../pages/MenuReport.vue'
                    ),
                    props: true
                },
                {
                    path: 'order-report',
                    name: 'OrderReport',
                    component: () => import(
                        /* webpackChunkName: "order_reports" */
                        '../pages/OrderReport.vue'
                    ),
                    props: true
                },
                {
                    path: 'customer-report',
                    name: 'CustomerReport',
                    component: () => import(/* webpackChunkName: "customer_reports" */ '../pages/CustomerReport.vue'),
                },
                {
                    path: 'inventory',
                    name: 'Inventory',
                    component: () => import(
                        /* webpackChunkName: "inventory" */
                        '../pages/Inventory.vue'
                    ),
                    props: true
                },
                {
                    path: 'cashflow',
                    name: 'CashFlow',
                    component: () => import(
                        /* webpackChunkName: "cashflow" */
                        '../pages/CashFlow.vue'
                    ),
                    props: true
                },
                {
                    path: 'transactions/quickpay',
                    name: 'QuickPayReport',
                    component: () => import(
                        /* webpackChunkName: "quickpay_reports" */
                        '../pages/QuickPayReport.vue'
                    ),
                    props: true
                },
                {
                    path: 'transactions/wallet',
                    name: 'WalletReport',
                    component: () => import(
                        /* webpackChunkName: "wallet_reports" */
                        '../pages/WalletReport.vue'
                    ),
                    props: true
                },

                {
                    path: 'exports',
                    name: 'Exports',
                    component: () => import(
                        /* webpackChunkName: "exports" */
                        '../pages/Exports.vue'
                    ),
                    props: true
                },
                ...AdminRouter
            ],
        },
        {
            path: '/login',
            component: () => import('@/containers/LoginLayout.vue'),
            children: [
                {
                    path: '/login',
                    name: 'Login',
                    component: () => import(
                        /* webpackChunkName: "auth-login" */
                        '@/pages/Login.vue'
                    ),

                    meta: {
                        title: 'Suite App'
                    },

                    beforeEnter: (to, from, next) => {
                        const authStored = authStore();
                        if (authStored.isAuth) {
                            next({ path: '/dashboard' });
                        } else {
                            next();
                        }
                    }
                }
            ]
        },

        {
            path: '*',
            name: 'NotFound',
            component: () => import(
                /* webpackChunkName: "notfound" */
                '@/containers/NotFound.vue'
            ),
            meta: {
                title: '404'
            },
            beforeRouteLeave (to, from, next) {
                window.location.href = '/#/dashboard';
            }
        },
        {
            path: '/503',
            name: 'Unavailable',
            component: () => import(
                /* webpackChunkName: "Unavailable" */
                '@/containers/Unavailable.vue'
            ),
            meta: {
                title: 'Unavailable'
            },
            beforeRouteLeave (to, from, next) {
                window.location.href = '/#/dashboard';
            }
        }
    ],
})
