import Vue from 'vue'
import router from './routes/index';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'components/styles/index.scss'
import App from './app.vue';
import store from './store/index';

import VQE from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.use(ElementUI, {locale});
Vue.use(VQE);

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});
