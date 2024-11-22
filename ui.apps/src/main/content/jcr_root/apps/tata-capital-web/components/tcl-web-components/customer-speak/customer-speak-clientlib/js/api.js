(function (_global) {
    var customerSpeakApiCallFn = (function (jsHelper) {

        var customerSpeakFilterObj = {

            // USER GET DATA 
            customerSpeak: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.customerSpeak(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(customerSpeakFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'customerSpeakFilterObj', customerSpeakApiCallFn);

})(this || window || {});