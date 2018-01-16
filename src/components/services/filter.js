import {IMG_SERVER} from './config';
import moment from 'moment';


Vue.filter('toImg', function (inValue) {
    return inValue ? IMG_SERVER + '/' + inValue : '';
});
Vue.filter('toDateNull', function (inValue) {
    if (inValue === 'NaNInvalid date') {
        return;
    } else {
        return inValue;
    }
});
Vue.filter('toDateFormat', function (inValue) {
    if (inValue) {
        return moment(inValue).format('YYYY-MM-DD');
    }
});
Vue.filter('dateTime', function (inValue) {
    if (inValue) {
        return moment(inValue).format('YYYY-MM-DD HH:mm:ss');
    }
});
Vue.filter('currency', function (value, _currency, decimals) {
    value = parseFloat(value);
    if (!isFinite(value) || !value && value !== 0) return '';
    _currency = _currency != null ? _currency : '$';
    decimals = decimals != null ? decimals : 2;
    let stringified = Math.abs(value).toFixed(decimals);
    let _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    let i = _int.length % 3;
    let head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
    let _float = decimals ? stringified.slice(-1 - decimals) : '';
    let sign = value < 0 ? '-' : '';
    let digitsRE = /(\d{3})(?=\d)/g;
    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
});
function _len(inVal) {
    if (inVal.toString().length === 1) {
        return '0' + inVal;
    }
    else {
        return inVal;
    }
}
Vue.filter('toTrim', function (inValue) {
    if (inValue == null) {
        return "";
    }
    var whitespace = new String(" \t\n\r");
    var str = new String(inValue);
    if (whitespace.indexOf(str.charAt(0)) != -1) {
        var j = 0, i = str.length;
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
            j++;
        }
        str = str.substring(j, i);
    }
    return str;
});
Vue.filter('nl2br', function (inMsg, inISXhtml) {
    var is_xhtml = inISXhtml || true;
    var breakTag = (is_xhtml) ? '<br />' : '<br>';
    var msg = (inMsg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    return msg;
});
function _pad(n, len) {
    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    if (isNaN(num) || isNaN(len)) {
        return n;
    }
    num = '' + num;
    while (num.length < len) {
        num = '0' + num;
    }
    return num;
}

