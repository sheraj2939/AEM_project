(function (_global) {
    var applyNowLeadGenerateApiCallFn = (function (jsHelper) {

        var applyNowLeadGenerateFilterObj = {
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
            aggregatorLeadGeneration: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.aggregatorLeadGeneration(requestObj).then(function (response) {

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
            companyNameCampaign: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.companyNameCampaign(requestObj).then(function (response) {

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

            } ,
            sugamCampaign: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.sugamCampaign(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(applyNowLeadGenerateFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'applyNowLeadGenerateFilterObj', applyNowLeadGenerateApiCallFn);

})(this || window || {});