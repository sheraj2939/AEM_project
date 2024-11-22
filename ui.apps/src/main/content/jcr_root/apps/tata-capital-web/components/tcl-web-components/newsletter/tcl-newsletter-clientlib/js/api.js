(function (_global) {
    var newsLetterApiCallFn = (function (jsHelper) {

        var newsLetterFilterObj = {

            // USER GET DATA 
            newsLetter: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.newsLetter(requestObj).then(function (response) {

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
            validEmails: function (requestObj) {

                return new Promise(function (resolve) {

                    apiUtility.validEmails(requestObj).then(function (response) {

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

        return jsHelper.freezeObj(newsLetterFilterObj);

    })(jsHelper);

    
_global.jsHelper.defineReadOnlyObjProp(_global, 'newsLetterFilterObj', newsLetterApiCallFn);

})(this || window || {});