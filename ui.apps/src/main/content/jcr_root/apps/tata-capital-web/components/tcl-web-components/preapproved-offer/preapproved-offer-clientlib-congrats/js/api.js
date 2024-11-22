(function (_global) {
    var preApprovedOffersApiCallFn = (function (jsHelper) {

        var preApprovedOffersFilterObj = {
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

            },
            preApprovedOfferMaster : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.preApprovedOfferMaster(requestObj).then(function (response) {

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
            convertToOpportuinity : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.convertToOpportuinity(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(preApprovedOffersFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'preApprovedOffersFilterObj', preApprovedOffersApiCallFn);

})(this || window || {});