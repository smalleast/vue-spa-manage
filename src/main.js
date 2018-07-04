import Vue from 'vue';
import app from './app';
import router from './router';
import ElementUI from 'element-ui';
import store from './store';
import "babel-polyfill";
import './assets/fonts/iconfont'
import './components/services/filter'
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(app)
}).$mount('#app');

