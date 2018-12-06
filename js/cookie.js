/**
 * Created by Bin on 2018/10/17.
 */
var cookiesUtil = {
    get: function (name) {
        var cookieName = encodeURIComponent(name) + '=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1) {
            var cookiesEnd = document.cookie.indexOf(';', cookieStart);
            if (cookiesEnd == -1) {
                cookiesEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookiesEnd));
        }
        return cookieValue;
    },
    set: function (name, value, expires) {
        var cookiesText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookiesText += '; expires=' + expires.toGMTString();
        }
        document.cookie = cookiesText;

    },
    unset: function (name) {
        this.set(name, '', new Date(0))
    }
};

function getCookie(name) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        newarr = arr[i].split("=");
        if (newarr[0] == name) {
            return newarr[1]
        }
    }
}

function setCookie(key, value, expiresDate) {

    var oDate = new Date();
    oDate.setDate(oDate.getDate() + expiresDate);
    document.cookie =
        key + "=" +
        value +
        ";expires=" +
        oDate
}

function removeCookie(key) {
    setCookie(key, "", -1)
}