import Vue from 'vue';
import Router from 'vue-router';
import nxStore from 'next-store'

Vue.use(Router);
let routers = [
    {
        path: '/',
        redirect: '/quote/list',
    },
    {
        path: '/home',
        component: resolve => require(['../views/Home.vue'], resolve),
        beforeEnter: (to, from, next) => {
            const {token} = nxStore.local;
            if (token) {
                next();
            } else {
                next({
                    path: '/login',
                    query: {redirect: to.fullPath}
                })
            }
        },
        children: [
            {
                path: '/',
                redirect: '/quote/list'
            },
            {
                path: '/user/list',
                name: 'userList',
                component: resolve => require(['../views/user/list.vue'], resolve)
            },
            {
                path: '/user/edit',
                name: 'userEdit',
                component: resolve => require(['../views/user/edit.vue'], resolve)
            },
            {
                path: '/user/updatePwd',
                name: 'updatePwd',
                component: resolve => require(['../views/user/updatePassword.vue'], resolve)
            },
            {
                path: '/quote/list',
                name: 'quoteList',
                component: resolve => require(['../views/quote/list.vue'], resolve)
            },
            {
                path: '/quote/detail/:id',
                name: 'quoteDetail',
                component: resolve => require(['../views/quote/detail.vue'], resolve)
            },
            {
                path: '/order/list',
                name: 'orderList',
                component: resolve => require(['../views/order/list.vue'], resolve)
            },
            {
                path: '/order/ship/:id',
                name: 'orderShip',
                component: resolve => require(['../views/order/ship.vue'], resolve)
            },
            {
                path: '/order/detail/:id',
                name: 'orderDetail',
                component: resolve => require(['../views/order/detail.vue'], resolve)
            },
            {
                path: '/message/list',
                name: 'messageList',
                component: resolve => require(['../views/message/list.vue'], resolve)
            },
            {
                path: '/service/list',
                name: 'serviceList',
                component: resolve => require(['../views/service/list.vue'], resolve)
            },
            {
                path: '/service/detail/:id',
                name: 'serviceDetail',
                component: resolve => require(['../views/service/detail.vue'], resolve)
            },
        ]
    },
    {
        path: '/login',
        component: resolve => require(['../views/user/login.vue'], resolve),
        beforeEnter: (to, from, next) => {
            const {token} =nxStore.local;
            if (token) {
                if (from.name) {
                    next(from.name)
                } else {
                    next('/quote/list');
                }
            } else {
                next();
            }
        },
    },
    {
        path: '*',
        redirect: '/'
    }
];
const router = new Router({
    mode: 'history',
    routes: routers
});
export default router;
