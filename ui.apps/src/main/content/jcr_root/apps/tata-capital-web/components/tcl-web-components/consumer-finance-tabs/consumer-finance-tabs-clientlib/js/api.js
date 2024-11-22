(function (_global) {
    var customerGrievancesApiCallFn = (function (jsHelper) {

        var customerGrievancesFilterObj = {

            // USER GET DATA 
            customerGrievancesEmail: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.customerGrievances(requestObj).then(function (response) {

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
            // CUSTOMER GRIEVANCE SFDC
            customerGrievancesNew: function (requestObj) {
                return new Promise(function (resolve) {
                    apiUtility.customerGrievancesNew(requestObj).then(function (response) {
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

        return jsHelper.freezeObj(customerGrievancesFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'customerGrievancesFilterObj', customerGrievancesApiCallFn);

})(this || window || {});