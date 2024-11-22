(function (_global) {
    function createApiCallFunction(apiMethod) {
        return function (requestObj) {
            return new Promise(function (resolve) {
                apiUtility[apiMethod](requestObj).then(function (response) {
                    var responseObj = {
                        status: "SUCCESS",
                        response: response
                    };
                    resolve(responseObj);
                }).catch(function (error) {
                    var responseObj = {
                        status: "FAILURE",
                        response: error
                    };
                    resolve(responseObj);
                });
            });
        };
    }
    var tsssLeadGenerateFilterObj = {
        generateOtp: createApiCallFunction('generateOtp'),
        verifyOtp: createApiCallFunction('verifyOtp'),
        onCallOtp: createApiCallFunction('onCallOtp'),
        pinCodeMaster: createApiCallFunction('pinCodeMaster'),
        tsssCompanyList: createApiCallFunction('tsssCompanyList'),
        tsssDesignationList: createApiCallFunction('tsssDesignationList'),
        tsssLeadGenerate: createApiCallFunction('tsssLeadGenerate'),
        tsssEmail: createApiCallFunction('tsssEmail'),
        validEmails: createApiCallFunction('validEmails')

    };
    _global.jsHelper.defineReadOnlyObjProp(_global, 'tsssLeadGenerateFilterObj', jsHelper.freezeObj(tsssLeadGenerateFilterObj));

})(this || window || {});
