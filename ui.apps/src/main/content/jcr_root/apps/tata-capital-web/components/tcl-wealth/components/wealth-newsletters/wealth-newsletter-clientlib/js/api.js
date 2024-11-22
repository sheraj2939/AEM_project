(function (_global) {
    var wealthNewsLetterApiCallFn = (function (jsHelper) {

        var wealthNewsLetterFilterObj = {

            // USER GET DATA 
            wealthNewsLatter: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.wealthNewsLatter(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(wealthNewsLetterFilterObj);

    })(jsHelper);

    
_global.jsHelper.defineReadOnlyObjProp(_global, 'wealthNewsLetterFilterObj', wealthNewsLetterApiCallFn);

})(this || window || {});