/**
 * Created by dcpai on 2017/7/17.
 */
import moment from 'moment';

(function () {
    const Utils = {
        getLocationSearch: function () {
            if(!window.location.search){
                return;
            }
            let query_string = {};
            let query = window.location.search.substring(1);
            let vars = query.split("&");
            for (let i = 0; i < vars.length; i++) {
                let pair = vars[i].split("=");
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                    let arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                    query_string[pair[0]] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
            }

            return query_string;
        },
        randomString: function (len) {
            len = len || 34;
            let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            let maxPos = $chars.length;
            let pwd = '';
            for (let i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
        updateLocationHref:function(filter){
            window.history.pushState({},'',window.location.href.split('?')[0] +
                this.constructQueryParams(filter));
        },
        constructQueryParams:function (params) {
            let url = this.constructUrl(params);
            return url.slice(0,url.length-1);
        },
        constructUrl:function (params=''){
            if (typeof(params) != 'object') {
                return '';
            }
            let url = '?';
            for (let key in params) {
                let value = params[key];
                if (typeof(value) == 'object') {
                    url += this.constructUrl(value).replace('?','');
                } else if(value||value===0) {
                    url = `${url}${key}=${value}&`;
                }
            }
            return url;
        },
    };

    module.exports = Utils;
}());
