(function (_global) {
    var assetDisposalMisApiCallFn = (function (jsHelper) {

        var assetDisposalMisFilterObj = {

            // USER GET DATA 
            assetDisposalMis: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.assetDisposalMis(requestObj).then(function (response) {

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

            /*************** get asset disposal mis filter with query string [START] ***************/
            getAssetDisposalMISFilter: function (reqObj, queryParams) {

                return new Promise(function (resolve) {
                    apiUtility.getAssetDisposalMISFilter(reqObj, queryParams).then(function (response) {
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
            /*************** get asset disposal mis filter with query string [END] ***************/

            /************* Aseet disposal image api call ********************/
            getAssetImageAPICall : function(getUrl,method,data){
        
                    (jsHelper.isDef(data)) ? data : data = {};
                    return new Promise(function (resolve, reject) {
                       
                        $.ajax({
                            url: getUrl, /* API endpoint URL */
                            method: method, /* HTTP method (GET, POST, PUT, DELETE, etc.) */
                            data: data, /* Query parameters for conditions */
                            success: function (response) {
                                /* Resolve the promise with the API response */
                                resolve(response);
                            },
                            error: function (xhr, status, error) {
                                /* Reject the promise with the error message */
                                reject(error);
                            }
                        });
                    });
            },
            /************* Aseet disposal image api call ********************/
        };

        return jsHelper.freezeObj(assetDisposalMisFilterObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'assetDisposalMisFilterObj', assetDisposalMisApiCallFn);

})(this || window || {});