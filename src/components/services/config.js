let NODE_ENV = process.env.NODE_ENV;
let PUBLISH_VERSION = '1.0.0';
let IMG_SERVER = NODE_ENV === 'development' ? 'http://oss.51xuewudao.cn/' : 'http://oss.zhulogic.com/';
let SERVER_URL = NODE_ENV === 'development' ? 'http://test.zhulogic.com:8035' : 'http://gc.zhulogic.com:8035';
//let SERVER_URL = NODE_ENV === 'development' ? 'http://192.168.10.50:8035' : 'http://webapi.zhulogic.com:8035';

export default class {
    static IMG_SERVER = IMG_SERVER;
    static SERVER_URL = SERVER_URL;
    static PUBLISH_VERSION = PUBLISH_VERSION;
    static API_WITH_TOKEN = {
        baseUrl: '/factory_api/',
        items: [
            'login',
            'message',
            'inquiry_sheet',
            'after_sale',
            'purchase_order',
            'user',
        ]
    };

}
