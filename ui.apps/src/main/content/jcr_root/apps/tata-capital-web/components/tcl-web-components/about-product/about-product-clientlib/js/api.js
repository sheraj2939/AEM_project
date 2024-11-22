(function (_global) {
    var campaignApiCallFn = (function (jsHelper) {

        var campaignFilterObj = {
            offlineQuickCash : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.offlineQuickCash(requestObj).then(function (response) {

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
            offlineQuickCashPost : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.offlineQuickCashPost(requestObj).then(function (response) {

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
            offlineQuickCashGet : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.offlineQuickCashGet(requestObj).then(function (response) {

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
            cibil : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.cibil(requestObj).then(function (response) {

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
            cibilPost : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.cibilPost(requestObj).then(function (response) {

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
            cibilGet : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.cibilGet(requestObj).then(function (response) {

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
            preApproved : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.preApproved(requestObj).then(function (response) {

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
            preApprovedPost : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.preApprovedPost(requestObj).then(function (response) {

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
            preApprovedGet : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.preApprovedGet(requestObj).then(function (response) {

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
            closeCases : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.closeCases(requestObj).then(function (response) {

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
            closeCasesPost : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.closeCasesPost(requestObj).then(function (response) {

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
            closeCasesGet : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.closeCasesGet(requestObj).then(function (response) {

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
            hlBtTopupGet : function (requestObj,queryString) {

                return new Promise(function (resolve) {

                    apiUtility.hlBtTopupGet(requestObj,queryString).then(function (response) {

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
            hlBtTopupPost : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.hlBtTopupPost(requestObj).then(function (response) {

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
            hlBtTopup : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.hlBtTopup(requestObj).then(function (response) {

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
            hlBtTopupInternalGet : function (requestObj,queryString) {

                return new Promise(function (resolve) {

                    apiUtility.hlBtTopupInternalGet(requestObj,queryString).then(function (response) {

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
            hlBtTopupInternalPost : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.hlBtTopupInternalPost(requestObj).then(function (response) {

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
            hlBtTopupInternal : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.hlBtTopupInternal(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(campaignFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'campaignFilterObj', campaignApiCallFn);

})(this || window || {});