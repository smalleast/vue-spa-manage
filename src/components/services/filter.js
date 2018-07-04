import Vue from "vue";
import moment from 'moment';
import Config from './config';

Vue.filter('currency', function (value, _currency, decimals) {
    value = parseFloat(value);
    if (!isFinite(value) || !value && value !== 0) return '';
    _currency = _currency != null ? _currency : '$';
    decimals = decimals != null ? decimals : 2;
    let stringified = Math.abs(value).toFixed(decimals);
    let _int = decimals > 0 ? stringified.slice(0, -1 - decimals) : stringified;
    let i = _int.length % 3;
    let head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
    let _float = decimals > 0 ? stringified.slice(-1 - decimals) : '';
    let sign = value < 0 ? '-' : '';
    let digitsRE = /(\d{3})(?=\d)/g;
    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
});

Vue.filter('toImg', function (inValue) {
    return inValue ? Config.IMG_SERVER + '/' + inValue : '';
});
Vue.filter('toDateTime', function (inValue) {
    return inValue ? moment(inValue).format('YYYY-MM-DD HH:mm:ss') : ''
});
Vue.filter('toDate', function (inValue) {
    return inValue ? moment(inValue).format('YYYY-MM-DD') : ''
});
