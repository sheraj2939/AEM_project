(function (_global) {
    var getInTouchApiCallFn = (function (jsHelper) {

        var getInTouchFilterObj = {
            cityProductMasterCampaign: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.cityProductMasterCampaign(requestObj).then(function (response) {

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
            getResult: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.getResult(requestObj).then(function (response) {

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
            whatsappMsgApi: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.whatsappMsgApi(requestObj).then(function (response) {

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
            tsssEmail: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.tsssEmail(requestObj).then(function (response) {

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
        };

        return jsHelper.freezeObj(getInTouchFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'getInTouchFilterObj', getInTouchApiCallFn);

})(this || window || {});