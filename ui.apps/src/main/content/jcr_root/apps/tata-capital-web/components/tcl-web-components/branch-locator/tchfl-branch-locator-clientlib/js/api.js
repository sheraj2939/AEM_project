(function (_global) {
    var branchLocatorApiCallFn = (function (jsHelper) {

        var branchLocatorFilterObj = {

            // USER GET DATA 
            branchLocator: function (requestObj) {
              

                return new Promise(function (resolve) {

                    apiUtility.branchLocator(requestObj).then(function (response) {

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

            branchLocatorSMS: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.branchLocatorSMS(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(branchLocatorFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'branchLocatorFilterObj', branchLocatorApiCallFn);

})(this || window || {});