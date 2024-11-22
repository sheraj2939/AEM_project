(function (_global) {
    var downloadPopupSmsApiCallFn = (function (jsHelper) {

        var downloadPopupSmsFilterObj = {

            // USER GET DATA 
            downloadPopupSms: function (requestObj) {

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

        return jsHelper.freezeObj(downloadPopupSmsFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'downloadPopupSmsFilterObj', downloadPopupSmsApiCallFn);

})(this || window || {});