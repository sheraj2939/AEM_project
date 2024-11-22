(function (_global) {
    var companyListApiCallFn = (function (jsHelper) {

        var companyListFilterObj = {

            // USER GET DATA 
            companyList: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.companyList(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(companyListFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'companyListFilterObj', companyListApiCallFn);

})(this || window || {});