(function (_global) {
    var offerRegisterApiCallFn = (function (jsHelper) {

        var offerRegisterFilterObj = {
            cityProductMaster: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.cityProductMaster(requestObj).then(function (response) {

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
            offerRegister : function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.offerRegister(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(offerRegisterFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'offerRegisterFilterObj', offerRegisterApiCallFn);

})(this || window || {});