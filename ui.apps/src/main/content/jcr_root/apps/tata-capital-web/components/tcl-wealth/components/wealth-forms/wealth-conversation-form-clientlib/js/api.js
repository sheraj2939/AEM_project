(function (_global) {
    var applyNowLeadGenerateApiCallFn = (function (jsHelper) {

        var applyNowLeadGenerateFilterObj = {

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
            cityMasterWealth: function (requestObj, queryString) {

                return new Promise(function (resolve) {

                    apiUtility.cityMasterWealth(requestObj, queryString).then(function (response) {

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
            applyNowLeadGenerate: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.applyNowLeadGenerate(requestObj).then(function (response) {

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
            countryMaster: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.countryMaster(requestObj).then(function (response) {

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
            wealthInsuranceCity: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.wealthInsuranceCity(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(applyNowLeadGenerateFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'applyNowLeadGenerateFilterObj', applyNowLeadGenerateApiCallFn);

})(this || window || {});