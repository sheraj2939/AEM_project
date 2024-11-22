(function (_global) {
    var dataEnrichmentApiCallFn = (function (jsHelper) {

        var dataEnrichmentFilterObj = {
            dataEnrichmentFetch: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.dataEnrichmentFetch(requestObj).then(function (response) {

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
            dataEnrichmentUpdate: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.dataEnrichmentUpdate(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(dataEnrichmentFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'dataEnrichmentFilterObj', dataEnrichmentApiCallFn);

})(this || window || {});