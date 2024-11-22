(function (_global) {
    var wealthReferearnApiCallFn = (function (jsHelper) {

        var wealthReferEarnFilterObj = {
            wealthReferearnExistingCustomer: function (reqObj, queryParams) {
                return new Promise(function (resolve) {
                    apiUtility.wealthReferearnExistingCustomer(reqObj, queryParams).then(function (response) {
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
            wealthReferringReferredRm: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.branchLocatorSMS(requestObj).then(function (response) {
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
            referralCustomer: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.referralCustomer(requestObj).then(function (response) {
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
            }
        };

        return jsHelper.freezeObj(wealthReferEarnFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'wealthReferEarnFilterObj', wealthReferearnApiCallFn);

})(this || window || {});