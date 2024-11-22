(function (_global) {
    var tchflVendorApiCallFn = (function (jsHelper) {

        var tchflVendorFilterObj = {
            tchflVendorDataGet: function (requestObj, getPara) {

                return new Promise(function (resolve) {

                    apiUtility.tchflVendorDataGet(requestObj, getPara).then(function (response) {

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
            tchflVendorDataPost: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.tchflVendorDataPost(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(tchflVendorFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'tchflVendorFilterObj', tchflVendorApiCallFn);

})(this || window || {});