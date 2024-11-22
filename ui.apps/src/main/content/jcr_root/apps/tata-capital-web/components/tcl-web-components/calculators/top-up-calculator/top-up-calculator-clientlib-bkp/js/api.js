(function (_global) {
    var topUpApiCallFn = (function (jsHelper) {

        var topUpFilterObj = {

            // USER GET DATA 
            topUp: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.topUp(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(topUpFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'topUpFilterObj', topUpApiCallFn);

})(this || window || {});