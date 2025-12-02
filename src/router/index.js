import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import { authStore } from '@/stores/auth';
export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL || '/',
    linkActiveClass: 'open active',
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
                    path: 'stores',
                    name: 'Stores',
                    component: () => import(
                        /* webpackChunkName: "report" */
                        '../pages/Stores.vue'
                    ),
                    // meta: {
                    //     perms: Can.Permissions.Suite__Storereport__Access
                    // }
                },
                {
                    path: 'invoice-report',
                    name: 'InvoiceReport',
                    component: () => import(
                        /* webpackChunkName: "online_orders" */
                        '../pages/Invoice.vue'
                    ),
                    props: true,
                    // meta: {
                    //     perms: Can.Permissions.Suite__Order__Access
                    // }
                },
                {
                    path: 'invoice-config',
                    name: 'InvoiceConfig',
                    component: () => import(
                        /* webpackChunkName: "online_orders" */
                        '../pages/ConfigInvoice.vue'
                    ),
                    props: true,
                    // meta: {
                    //     perms: Can.Permissions.Suite__Order__Access
                    // }
                },
                {
                    path: 'exports',
                    name: 'Exports',
                    component: () => import(
                        /* webpackChunkName: "online_orders" */
                        '../pages/Exports.vue'
                    ),
                    props: true,
                    // meta: {
                    //     perms: Can.Permissions.Suite__Order__Access
                    // }
                },
            ],
        },
        {
            path: '/login',
            component: () => import('@/containers/LoginLayout.vue'
        ),
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

        // {
        //     path: '*',
        //     name: 'NotFound',
        //     component: () => import(
        //         /* webpackChunkName: "notfound" */
        //         '@/containers/NotFound.vue'
        //     ),
        //     meta: {
        //         title: '404'
        //     },
        //     beforeRouteLeave (to, from, next) {
        //         window.location.href = '/#/dashboard';
        //     }
        // },
        // {
        //     path: '/503',
        //     name: 'Unavailable',
        //     component: () => import(
        //         /* webpackChunkName: "Unavailable" */
        //         '@/containers/Unavailable.vue'
        //     ),
        //     meta: {
        //         title: 'Unavailable'
        //     },
        //     beforeRouteLeave (to, from, next) {
        //         window.location.href = '/#/dashboard';
        //     }
        // }
    ],
})
