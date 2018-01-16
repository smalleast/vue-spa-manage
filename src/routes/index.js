import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../modules/Layout.vue'
import Login from '../modules/login/index.vue'
import Error404 from '../modules/404.vue'
import Home from '../modules/home/index.vue'
import BrokerList from '../modules/broker/list.vue'
import BrokerDetail from '../modules/broker/detail.vue'

Vue.use(VueRouter);
let routes = [
    {
        path: '/', component: Layout, redirect: '/home',
        children: [
            {path: 'home', component: Home}
        ]
    },
    {path: '/login', component: Login},
    {
        path: '/broker', component: Layout,
        children: [
            {path: 'list', component: BrokerList},
            {
                path: 'detail/:userId',
                component: BrokerDetail,
            },
        ]
    },
];
export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: routes
});


export const constantRouterMap = [
    {path: '/login', component: Login, hidden: true},
    {path: '/404', component: Error404, hidden: true},

]


export const asyncRouterMap = [

    {path: '*', redirect: '/404', hidden: true}
];
