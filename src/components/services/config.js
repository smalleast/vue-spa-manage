/**
 * Created by dcpai on 2017/7/6.
 */


(function () {
    let NODE_ENV = process.env.NODE_ENV;
    let IMG_SERVER = 'http://zhulogic-marketing.oss-cn-shanghai.aliyuncs.com/';
    let DOMAIN = NODE_ENV === 'development' ? 'http://test.zhulogic.com:8033' : 'http://gc.zhulogic.com';
    let SERVER_URL = NODE_ENV === 'development' ? 'http://test.zhulogic.com:8042' : 'http://webapi.zhulogic.com';
    //let SERVER_URL = NODE_ENV === 'development' ? 'http://192.168.10.26:8042' : 'http://webapi.zhulogic.com';
    let PREVIEW_URL = NODE_ENV === 'development' ? 'http://f.zhulogic.com/' : 'http://f.zhulogic.com/';

    const Config = {
        IMG_SERVER: IMG_SERVER,
        SERVER_URL: SERVER_URL,
        DOMAIN: DOMAIN,
        API_WITH_TOKEN: {
            baseUrl: '/marketing_manager/',
            items: [
                'users',
                'logout',
                'brokers',
            ]
        },
        API_WITHOUT_TOKEN: {
            baseUrl: '/marketing_manager/',
            items: [
                'login'
            ]
        }
    };
    module.exports = Config;
}());
