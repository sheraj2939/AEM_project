; (function (_global) {
    var downloadReportApiCallFn = (function (jsHelper) {
        var downloadReportFilterObj = {

            downloadReport: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.downloadReport(requestObj).then(function (response) {
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

        return jsHelper.freezeObj(downloadReportFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'downloadReportFilterObj', downloadReportApiCallFn);

})(this || window || {});