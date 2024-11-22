(function (_global) {
    var instantLoansApiCallFn = (function (jsHelper) {

        var instantLoansFilterObj = {

            generateOtp: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.generateOtp(requestObj).then(function (response) {

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
            verifyOtp: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.verifyOtp(requestObj).then(function (response) {

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
            onCallOtp: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.onCallOtp(requestObj).then(function (response) {
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
            fetchOffers : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.fetchOffers(requestObj).then(function (response) {

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
            validOffers : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.validOffers(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(instantLoansFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'instantLoansFilterObj', instantLoansApiCallFn);

})(this || window || {});