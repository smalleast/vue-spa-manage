import Http from './http';
import Config from './config';
import Q from 'q';
import nxStore from 'next-store'

export default nx.declare({

    statics: {
        all(apis) {
            return Q.all(apis);
        },
        init() {
            this.apiWithToken();
        },
        apiWithToken() {
            let Apis = Config.API_WITH_TOKEN;
            Apis.items.forEach((item) => {
                this[item] = (method, inData, inApi, hasLoading = false) => {
                    let _item = '';
                    if (typeof inApi === 'string' && !!inApi) {
                        _item = item + '/' + inApi;
                    } else {
                        _item = item;
                    }
                    if (hasLoading) {
                        nxStore.local = {
                            nxloading: 1
                        };
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
