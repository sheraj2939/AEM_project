(function (_global) {
    var languageInfoApiCallFn = (function (jsHelper) {
        var languageInfoFilterObj = {
            languageInfo: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.languageInfo(requestObj).then(function (response) {

                        var responseObj = {
                            status: "SUCCESS",
                            response: response
                        }

                        resolve(responseObj);

                    }).catch(function (error) {

                        var responseObj = {
                            status: "FAILURE",
                            response: error
                        }

                        resolve(responseObj)

                    });
                })
            },
        };
        return jsHelper.freezeObj(languageInfoFilterObj);
    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'languageInfoFilterObj', languageInfoApiCallFn);

})(this || window || {});