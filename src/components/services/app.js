import Config from './config';
export function constructQueryParams(params) {
    let url = constructUrl(params);
    return url.slice(0, url.length - 1);
}

function constructUrl(params = '') {
    if (typeof(params) != 'object') {
        return '';
    }
    let url = '?';
    for (let key in params) {
        let value = params[key];
        if (typeof(value) == 'object') {
            url += constructUrl(value).replace('?', '');
        } else if (value || value === 0) {
            url = `${url}${key}=${value}&`;
        }
    }
    return url;
}

export function deconstructUrl(url = '') {
    if (!url.includes('?')) {
        return;
    }
    let params = {};
    let arr = url.split('?')[1].split('&');
    arr.forEach(function (item) {
        let entries = item.split('=');
        if (entries[0] === 'pageNum' || entries[0] === 'pageSize') {
            params[entries[0]] = Number(decodeURI(entries[1]));
        } else {
            params[entries[0]] = decodeURI(entries[1]);
        }
    });
    return params;
}

export function getLocationSearch() {
    if (!window.location.search) {
        return {};
    }
    return deconstructUrl(window.location.search);
}

export function updateLocationHref(filter) {
    window.history.pushState({}, '', window.location.href.split('?')[0] +
        this.constructQueryParams(filter));
}
export function downloadFileByKey(key) {
    return new Promise(function (resolve, reject) {
        window.downloadFile(Config.IMG_SERVER + key);
        resolve('success');
    });
}
window.downloadFile = function (sUrl) {
    //iOS devices do not support downloading. We have to inform user about this.
    if (/(iP)/g.test(navigator.userAgent)) {
        alert('您的设备不支持文件下载,请在桌面浏览器中再试一次。');
        return false;
    }
    //If in Chrome or Safari - download via virtual link click
    if (window.downloadFile.isChrome || window.downloadFile.isSafari) {

        //Creating new link node.
        var link = document.createElement('a');
        link.href = sUrl;
        // link.target = '_blank';

        if (link.download !== undefined) {
            //Set HTML5 download attribute. This will prevent file from opening if supported.
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }
        //Dispatching click event.
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }

    // Force file download (whether supported by server).
    if (sUrl.indexOf('?') === -1) {
        sUrl += '?download';
    }
    window.open(sUrl, '_self');
    return true;
}
window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
