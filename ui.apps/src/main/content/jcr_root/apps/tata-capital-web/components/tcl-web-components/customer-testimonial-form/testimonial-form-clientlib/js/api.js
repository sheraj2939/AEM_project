(function (_global) {
    var customerFeedbackApiCallFn = (function (jsHelper) {

        var customerFeedbackFilterObj = {

            // USER GET DATA 
            customerFeedback: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.customerFeedback(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(customerFeedbackFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'customerFeedbackFilterObj', customerFeedbackApiCallFn);

})(this || window || {});