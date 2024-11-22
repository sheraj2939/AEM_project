(function (_global) {
    var loanMitraApiCallFn = (function (jsHelper) {

        var loanMitraFilterObj = {

            // USER GET DATA 
            loanMitra: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.loanMitra(requestObj).then(function (response) {

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
            validEmails: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.validEmails(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(loanMitraFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'loanMitraFilterObj', loanMitraApiCallFn);

})(this || window || {});