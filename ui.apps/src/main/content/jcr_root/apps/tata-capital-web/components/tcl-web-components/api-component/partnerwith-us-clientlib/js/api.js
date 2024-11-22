(function (_global) {
    var applyPartnerWithUsCallFn = (function (jsHelper) {

        var patrnerWithUsObj = {
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

            partnerWithUs: function (requestObj) {


                return new Promise(function (resolve) {

                    apiUtility.partnerWithUs(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(patrnerWithUsObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'patrnerWithUsObj', applyPartnerWithUsCallFn);

})(this || window || {});