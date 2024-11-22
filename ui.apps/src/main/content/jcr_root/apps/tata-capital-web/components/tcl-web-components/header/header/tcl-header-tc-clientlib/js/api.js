(function (_global) {
    var googleSignInApiCallFn = (function (jsHelper) {

        var googleSignInFilterObj = {

            // USER GET DATA 
            googleSignIn: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.googleSignIn(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(googleSignInFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'googleSignInFilterObj', googleSignInApiCallFn);

})(this || window || {});