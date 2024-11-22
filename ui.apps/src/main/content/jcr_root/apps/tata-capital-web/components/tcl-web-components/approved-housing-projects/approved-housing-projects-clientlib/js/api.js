(function (_global) {
    var approvedProjectsApiCallFn = (function (jsHelper) {

        var approvedProjectsFilterObj = {

            // USER GET DATA 
            approvedProjects: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.approvedProjects(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(approvedProjectsFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'approvedProjectsFilterObj', approvedProjectsApiCallFn);

})(this || window || {});