(function (_global) {
    var propRegistrationApiCallFn = (function (jsHelper) {

        var propRegistrationFilterObj = {
            propRegistration: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.propRegistration(requestObj).then(function (response) {

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
            bookInspection: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.bookInspection(requestObj).then(function (response) {

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
            interstedBroker: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.interstedBroker(requestObj).then(function (response) {

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
            propRegistrationTcfsl: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.propRegistrationTcfsl(requestObj).then(function (response) {

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
            bookInspectionTcfsl: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.bookInspectionTcfsl(requestObj).then(function (response) {

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
            interstedBrokerTcfsl: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.interstedBrokerTcfsl(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(propRegistrationFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'propRegistrationFilterObj', propRegistrationApiCallFn);

})(this || window || {});