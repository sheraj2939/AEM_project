(function (_global) {
    var assetDisposalMisHotDealsApiCallFn = (function (jsHelper) {
        var assetDisposalMisHotDealsFilterObj = {

            // USER GET DATA 
            assetDisposalMisHotDeals: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.assetDisposalMis(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(assetDisposalMisHotDealsFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'assetDisposalMisHotDealsFilterObj', assetDisposalMisHotDealsApiCallFn);

})(this || window || {});