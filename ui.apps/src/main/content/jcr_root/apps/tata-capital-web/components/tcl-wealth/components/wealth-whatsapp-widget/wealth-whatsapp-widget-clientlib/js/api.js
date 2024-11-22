(function (_global) {
    var wealthWhatsappMessageApiCallFn = (function (jsHelper) {
        var wealthWhatsappMessageFilterObj = {

            wealthWhatsappMessage: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.wealthWhatsappMessage(requestObj).then(function (response) {
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

        return jsHelper.freezeObj(wealthWhatsappMessageFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'wealthWhatsappMessageFilterObj', wealthWhatsappMessageApiCallFn);

})(this || window || {});