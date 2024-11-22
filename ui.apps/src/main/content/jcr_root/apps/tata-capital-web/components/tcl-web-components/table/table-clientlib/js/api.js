(function (_global) {
    var sarfaesiPropertiesFilterObjApiCallFn = (function (jsHelper) {
        var sarfaesiPropertiesFilterObj = {

            sarfaesiProperties: function (requestObj) {
                return new Promise(function (resolve) {

                    apiUtility.sarfaesiProperties(requestObj).then(function (response) {
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
            sarfaesiPropertiesTcl: function (requestObj) {
                return new Promise(function (resolve) {

                    apiUtility.sarfaesiPropertiesTcl(requestObj).then(function (response) {
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

        return jsHelper.freezeObj(sarfaesiPropertiesFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'sarfaesiPropertiesFilterObj', sarfaesiPropertiesFilterObjApiCallFn);

})(this || window || {});