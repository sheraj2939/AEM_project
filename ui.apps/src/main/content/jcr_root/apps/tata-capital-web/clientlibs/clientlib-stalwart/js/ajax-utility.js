/*******************************************AJAX Utility Module - Start******************************************************/

(function (_global) {
    var _ajaxUtility = (function (jsHelper) {
        var ajaxUtilityObj = {};
        if (exceptionUtility) {
            exceptionUtility.dependencyCheck([jsHelper], "AJAX Utility");
        }

        function postAjax(success, failure, url, data, headers) {

            var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
            xmlhttp.timeout = 300000;
            xmlhttp.open("POST", url, true);

            if (headers && jsHelper.isObject(headers)) {
                Object.keys(headers).forEach(function (key) {
                    xmlhttp.setRequestHeader(key, headers[key]);
                });
            }

            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // console.info("this.responseText: ", this.responseText);
                    if (jsHelper.isFunc(success)) {
                        try {
                            var response = JSON.parse(this.responseText).responseJson ? JSON.parse(this.responseText) : {
                                "responseJson": JSON.parse(this.responseText)
                            }
                            success(JSON.stringify(response));
                        } catch (error) {
                            success({ "success": true });
                        }

                    }
                } else if (this.readyState == 4 && this.status != 200) {
                    if (jsHelper.isFunc(failure)) {
                        failure(this.responseText);
                    }
                }
            };
            xmlhttp.onerror = function () {
                if (jsHelper.isFunc(failure)) {
                    failure(this.responseText);
                }
            }

            xmlhttp.send(data);
            return xmlhttp;
        }

        function getAjax(success, failure, url, data, headers) {
            var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
            xmlhttp.timeout = 300000;
            xmlhttp.open("GET", url, true);

            if (headers && jsHelper.isObject(headers)) {
                Object.keys(headers).forEach(function (key) {
                    xmlhttp.setRequestHeader(key, headers[key]);
                });
            }

            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // console.info("this.responseText: ", this.responseText);
                    if (jsHelper.isFunc(success)) {

                        success(this.responseText);
                    }
                } else if (this.readyState == 4 && this.status != 200) {
                    if (jsHelper.isFunc(failure)) {
                        failure(this.responseText);
                    }
                }
            };
            xmlhttp.onerror = function () {
                if (jsHelper.isFunc(failure)) {
                    failure(this.responseText);
                }
            }

            xmlhttp.send(data);
            return xmlhttp;
        }

        var postJson = function postAjaxJson(url, data) {
            /* if (!jsHelper.isObj(data)) {
                throw new Error("Request Data not defined!");
            } */
            if (!jsHelper.isObj(data.headerJson)) {
                data.headerJson = {};
            }

            var headers = {};

            var reqData = JSON.stringify(data);
            return new Promise(function (resolve, reject) {
                var success = function (response) {
                    resolve(response);
                }
                var failure = function (error) {
                    reject(error);
                }
                postAjax(success, failure, url, reqData, headers);
            });
        }
        ajaxUtilityObj.postJson = postJson;

        var getJson = function getAjaxJson(url, data) {
            if (!jsHelper.isObj(data)) {
                throw new Error("Request Data not defined!");
            }
            if (!jsHelper.isObj(data.headerJson)) {
                data.headerJson = {};
            }
            
            var headers = {};
            return new Promise(function (resolve, reject) {
                var success = function (response) {
                    resolve(response);
                }
                var failure = function (error) {
                    reject(error);
                }
                getAjax(success, failure, url, data, headers);
            });
        }
        ajaxUtilityObj.getJson = getJson;

        return jsHelper.freezeObj(ajaxUtilityObj);
    })(_global.jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'ajaxUtility', _ajaxUtility);
})(this);

/*******************************************AJAX Utility Module - End******************************************************/