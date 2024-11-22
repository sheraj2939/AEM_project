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
            cityProductMaster: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.cityProductMaster(requestObj).then(function (response) {

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
            vehicleVariantMaster: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.vehicleVariantMaster(requestObj).then(function (response) {

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
            vehicleVariantMasterNew: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.vehicleVariantMasterNew(requestObj).then(function (response) {

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
            twoWheelerVariantMaster: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.twoWheelerVariantMaster(requestObj).then(function (response) {

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

            },
            eductionLoanStateCity: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.eductionLoanStateCity(requestObj).then(function (response) {
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
            educationLoanCountrylist: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.educationLoanCountrylist(requestObj).then(function (response) {
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
            educationLoanCourses: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.educationLoanCourses(requestObj).then(function (response) {
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
            educationLoanFieldlist: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.educationLoanFieldlist(requestObj).then(function (response) {
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
            educationLoanAlluniversities: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.educationLoanAlluniversities(requestObj).then(function (response) {
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
            educationLoanPincode: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.educationLoanPincode(requestObj).then(function (response) {
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
            getOffers : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.getOffers(requestObj).then(function (response) {
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
            btConvertOfferToOpportunityPost: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.btConvertOfferToOpportunityPost(requestObj).then(function (response) {
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

            pinCodeMaster: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.pinCodeMaster(requestObj).then(function (response) {
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
            financialInstitute: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.financialInstitute(requestObj).then(function (response) {
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