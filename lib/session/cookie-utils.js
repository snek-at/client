"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setCookie(name, val, time) {
    var date = new Date();
    var value = val;
    date.setTime(date.getTime() + (time * 1000));
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}
exports.setCookie = setCookie;
function getCookie(name) {
    var _a;
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        return (_a = parts.pop()) === null || _a === void 0 ? void 0 : _a.split(";").shift();
    }
}
exports.getCookie = getCookie;
function deleteCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}
exports.deleteCookie = deleteCookie;
function cookieChecker(name) {
    var cookie = getCookie(name);
    console.log(cookie);
    console.log("Cookiename: ", name);
    if (cookie) {
        console.log("cookie true");
        return true;
    }
    console.log("cookie false");
    return false;
}
exports.cookieChecker = cookieChecker;
