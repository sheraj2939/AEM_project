(function (_global) {
    var emiPartPaymentApiCallFn = (function (jsHelper) {

        var emiPartPaymentFilterObj = {

            // USER GET DATA 
            emiPartPayment: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.emiPartPayment(requestObj).then(function (response) {

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
            prePopulateEpp: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.prePopulateEpp(requestObj).then(function (response) {

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
            emiPartPaymentCampaignGet: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.emiPartPaymentCampaignGet(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(emiPartPaymentFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'emiPartPaymentFilterObj', emiPartPaymentApiCallFn);

})(this || window || {});