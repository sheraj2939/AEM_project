/* (function (_global) {
    var upcomingPropertiesApiCallFn = (function (jsHelper) {
        var upcomingPropertiesFilterObj = {

            // USER GET DATA 
            upcomingProperties: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.upcomingPropertiesFilter(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(upcomingPropertiesFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'upcomingPropertiesFilterObj', upcomingPropertiesApiCallFn);

})(this || window || {}); */