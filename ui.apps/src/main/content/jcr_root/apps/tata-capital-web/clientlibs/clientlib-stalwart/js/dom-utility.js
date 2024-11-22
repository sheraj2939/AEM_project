(function (_global) {

    var _domUtils = (function (jsHelper) {

        var domUtilsObj = {};

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        domUtilsObj.getCookie = getCookie;

        var setCookie = function setCookie(cname, cvalue, expiry) {
            var expires = jsHelper.isNum(expiry) ?  "expires="+ (new Date(Date.now()+expiry)).toUTCString() : "";
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            console.log("Cookie : ",document.cookie);
        }
        domUtilsObj.setCookie = setCookie;

        var isCookie = function isCookie(cname) {
            return jsHelper.isDef(getCookie(cname));
        }
        domUtilsObj.isCookie = isCookie;

        var getCookieExpiryInDays = function getCookieExpiryInDays(exdays) {
            return jsHelper.isNum(exdays) ? (exdays*24*60*60*1000) : 0;
        }
        domUtilsObj.getCookieExpiryInDays = domUtilsObj.getCookieExpInDays = getCookieExpiryInDays;
        
        var deleteCookie = function deleteCookie(name) {
            document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        }
        domUtilsObj.deleteCookie = domUtilsObj.deleteCookie = deleteCookie;

        var deleteAllCookies = function deleteAllCookies() {
            var res = document.cookie;
            var multiple = res.split(";");
            for(var i = 0; i < multiple.length; i++) {
                var key = multiple[i].split("=");
                document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
            }
        }
        domUtilsObj.deleteAllCookies = domUtilsObj.deleteAllCookies = deleteAllCookies;

        var redirect = function redirect(locationUrl){
            if(locationUrl && window && window.location && window.location.href){
                window.location.href = locationUrl;
            }
            return locationUrl;
        }
        domUtilsObj.redirect = domUtilsObj.redirect = redirect;

        var clearAllStorage = function clearAllStorage(){
            if(localStorage instanceof Storage){
                localStorage.clear();
            }
            if(sessionStorage instanceof Storage){
                sessionStorage.clear();
            }
            if(document && (typeof(deleteAllCookies)==="function")){
                deleteAllCookies();
            }
            return true;
        }
        domUtilsObj.clearAllStorage = domUtilsObj.clearAllStorage = clearAllStorage;

        return jsHelper.freezeObj(domUtilsObj);
    })(_global.jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'domUtils', _domUtils);
})(window || this || {});
