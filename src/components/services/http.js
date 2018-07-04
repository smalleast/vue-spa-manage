import nxAxios from 'next-axios';
import Config from './config';
import router from '../../router';
import nxStore from 'next-store'
import {Loading, Message} from 'element-ui'

let load = null;
const WeiPaiHttp = nx.declare({
    extends: nxAxios,
    statics: {
        instance: null,
        getInstance: function () {
            if (!WeiPaiHttp.instance) {
                WeiPaiHttp.instance = new WeiPaiHttp();
            }
            return WeiPaiHttp.instance;
        }
    },
    methods: {
        init: function () {
            const env = nx.hashlize().env;
            this.$base.init.call(this);
            this.initHeaders();
            this.setDefaults({
                timeout: 600000,
                baseURL: Config.SERVER_URL || './',
                withCredentials: true
            });
        },
        initHeaders: function () {

        },
        error: function (errorResponse) {
            this.clearLoad();
            console.log(String(errorResponse));
            if (errorResponse.response) {
                return Promise.reject(errorResponse.response.data)   // 返回接口返回的错误信息
            } else {
                let errorMsg = String(errorResponse);
                if (errorMsg.includes('Error: timeout')) {
                    console.log('请求超时,请稍后刷新');
                } else if (errorMsg.includes('Network Error')) {
                    console.log('网络出错了,请稍后刷新');
                } else {
                    console.log('出错了,稍后刷新试试');
                }
            }
        },
        toData: function (inResponse) {
           this.clearLoad();

            switch (inResponse && inResponse.data && inResponse.data.status_code) {
                case 401:
                    console.log('登录已失效401');
                    nxStore.clear('token');
                    console.log(router.currentRoute.path);
                    if (router.currentRoute.path !== '/login/') {
                        router.replace({
                            path: '/login/',
                            query: {redirect: router.currentRoute.fullPath}
                        });
                    }
                    return Promise.reject(inResponse.data);
                case 400:
                    Message.warning(inResponse.data.message);
                    return Promise.reject(inResponse);
                case 500:
                    Message.warning('服务器出错了,稍后再试');
                    return Promise.reject(inResponse);
                case 200:
                    return inResponse.data.data;
                default:
                    return inResponse.data;
            }
        },
        authorization: function (inRequest) {
            const {nxloading, token} = nxStore.local;
            if (nxloading === 1) {
                load = Loading.service();
            }
            if (token) {
                inRequest.headers.common['Authorization'] = token.accessToken;
            }
            return inRequest;
        },
        clearLoad:function () {
            nxStore.clear('nxloading');

            if (typeof load === 'object') {
                setTimeout(() => {
                    try {
                        load.close();
                    } catch (e) {
                        console.log('load:', e);
                    }
                }, 300);
            }
        }
    }
});

export default WeiPaiHttp.getInstance();



