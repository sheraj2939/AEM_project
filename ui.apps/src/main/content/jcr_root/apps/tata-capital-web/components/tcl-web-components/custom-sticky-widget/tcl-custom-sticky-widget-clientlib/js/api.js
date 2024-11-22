(function (_global) {
    var downLoadAppSmsApiCallFn = (function (jsHelper) {

        var downLoadAppSmsFilterObj = {

            // USER GET DATA 
            downLoadAppSms: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.downLoadAppSms(requestObj).then(function (response) {

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

            }
           
        };

        return jsHelper.freezeObj(downLoadAppSmsFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'downLoadAppSmsFilterObj', downLoadAppSmsApiCallFn);

})(this || window || {});