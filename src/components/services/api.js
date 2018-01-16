/**
 * Created by dcpai on 2017/7/6.
 */


import Http from './http';
import axios from 'axios';
import Config from './config';
import Q from 'q';

export default nx.declare({

    statics: {
        all(apis) {
            return Q.all(apis);
        },
        init() {
            this.apiWithoutToken();
            this.apiWithToken();
        },
        apiWithoutToken() {
            let Apis = Config.API_WITHOUT_TOKEN;
            Apis.items.forEach((item) => {
                this[item] = (method, inData, inApi) => {
                    let _item = '';
                    if (["string","number"].includes(typeof inApi) && !!inApi) {
                        _item = item + '/' + inApi;
                    } else {
                        _item = item;
                    }
                    switch (method) {
                        case 'post':
                            return Http.post(`${Apis.baseUrl}${_item}`, inData);
                            break;
                        case 'get':
                            return Http.get(`${Apis.baseUrl}${_item}`, inData);
                            break;
                        case 'put':
                            return Http.put(`${Apis.baseUrl}${_item}`, inData);
                            break;
                        case 'delete':
                            return Http.delete(`${Apis.baseUrl}${_item}`, inData);
                            break;
                        default:
                            return Http.get(`${Apis.baseUrl}${_item}`, inData);
                            break;
                    }
                };
            });
        },
        apiWithToken() {
            let Apis = Config.API_WITH_TOKEN;
            Apis.items.forEach((item) => {
                this[item] = (method, inData, inApi) => {
                    let _item = '';
                    if (["string","number"].includes(typeof inApi)&& !!inApi) {
                        _item = item + '/' + inApi;
                    } else {
                        _item = item;
                    }
                    switch (method) {
                        case 'post':
                            return Http.post(`${Apis.baseUrl}${_item}`, inData);
                            break;
                        case 'get':
                            return Http.get(`${Apis.baseUrl}${_item}`, inData);
                            break;
                        case 'put':
                            return Http.put(`${Apis.baseUrl}${_item}`, inData);
                            break;
                        case 'delete':
                            return Http.delete(`${Apis.baseUrl}${_item}`, inData);
                            break;
                        default:
                            return Http.get(`${Apis.baseUrl}${_item}`, inData);
                            break;
                    }
                };
            });
        }
    }
});
