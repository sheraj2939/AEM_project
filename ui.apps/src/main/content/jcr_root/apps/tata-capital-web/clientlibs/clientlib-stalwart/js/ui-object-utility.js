/*******************************************_UI Object Utility Module - Start******************************************************/

(function (_global) {
    var _UIObjectUtility = (function (jsHelper) {
        var UIObjectUtilityObj = {};

        var _switchMonthDate = function switchMonthDate(date) {
            if (jsHelper.isDefined(date)) {
                var dateArr = date.split("/");
                var date = dateArr[0];
                var month = dateArr[1];
                dateArr[0] = month;
                dateArr[1] = date;
                date = dateArr.join('/');
            }
            return date;
        }

        var toServiceDate = function toServiceDate(date, switchMonthDate) {
            if (jsHelper.isTrue(switchMonthDate)) {
                date = _switchMonthDate(date);
            }
            if (jsHelper.isValidDate(date)) {
                if (jsHelper.isStr(date)) {
                    date = new Date(Date.parse(date));
                }
                var gmtStr = date.toString();
                var substrArr = gmtStr.substring(4, gmtStr.length - 9).split(" ");
                return [substrArr[1], substrArr[0], substrArr[2]].join("-");
            }
        }
        UIObjectUtilityObj.toServiceDate = toServiceDate;


        var getTodayServiceDate = function getTodayServiceDate() {
            return toServiceDate(new Date());
        }
        UIObjectUtilityObj.getTodayServiceDate = getTodayServiceDate;

        var toServiceAge = function toServiceAge(dob,switchMonthDate) {
            var date;
            if (jsHelper.isTrue(switchMonthDate)) {
                date = _switchMonthDate(dob);
            } else {
                date = dob;
            }
            if (jsHelper.isValidDate(date)) {
                if (jsHelper.isStr(date)) {
                    date = new Date(Date.parse(date));
                }
                return Math.abs((new Date(Date.now() - date.getTime())).getUTCFullYear() - 1970);
            }
        }
        UIObjectUtilityObj.toServiceAge = toServiceAge;

        var toServiceGender = function (gender) {
            if (jsHelper.isStr(gender)) {
                switch (gender.toLowerCase()) {
                    case "male":
                        return "M";
                    case "female":
                        return "F";
                    case "transgender":
                        return "T";
                }
            }
        }
        UIObjectUtilityObj.toServiceGender = toServiceGender;


        var toUIGender = function (gender) {
            if (jsHelper.isStr(gender)) {
                switch (gender.toLowerCase()) {
                    case "m":
                        return "Male";
                    case "f":
                        return "Female";
                    case "t":
                        return "Transgender";
                }
            }
        }
        UIObjectUtilityObj.toUIGender = toUIGender;

        var toServiceHeight = function (feet, inch) {
            return (jsHelper.isNum(jsHelper.toNum(feet)) && jsHelper.isNum(jsHelper.toNum(inch))) ? (feet + " ft " + inch + " in") : "";
        }
        UIObjectUtilityObj.toServiceHeight = toServiceHeight;

        var downloadPolicyDocument = function downloadPolicyDocument(uiObj) {
            var convertObjToQueryString = function (obj, addQm) {
                var queryString = "";
                var qm = "?";
                var amp = "&";
                if (obj && (typeof (obj) === "object")) {
                    if (addQm === true) {
                        queryString += qm;
                    }
                    Object.keys(obj).forEach(function (key, i) {
                        if (i !== 0) {
                            queryString += amp;
                        }
                        queryString += (key + "=" + obj[key]);
                    });
                }
                return queryString;
            }

            var getPolicyReo = function (policyNo) {
                if (policyNo && typeof (policyNo) === "string") {
                    var policyNoArr = policyNo.split('-');
                    return policyNoArr[policyNoArr.length - 1];
                }
                return "";
            };

            var getQueryParamString = function (policyNo, prodId) {
                var queryStringObj = {
                    "p_policy_ref": policyNo,
                    "p_policy_reo": getPolicyReo(policyNo),
                    "user_name": "ONLINE",
                    "plocationcode": "9906"
                };

                if (jsHelper.orOneWithMany(prodId, "8429", "8430", "8432")) {
                    queryStringObj["version"] = "";
                    queryStringObj["imd_code"] = "55555557";
                    queryStringObj["PRINT_FLAG"] = "ORG";
                }
                return convertObjToQueryString(queryStringObj, true);
            };

            var getActionUrl = function (prodId) {
                var bagicNxtContext = "/BagicNxt/dp";
                switch (prodId) {
                    case "8429":
                        return bagicNxtContext + "/HGIaction.do";
                    case "8430":
                        return bagicNxtContext + "/HGFaction.do";
                    case "8432":
                        return bagicNxtContext + "/ECPaction.do";
                    case "8407":
                        return "/Insurance/critical-illness/showCIpdf.do";
                }
                return "";
            }

            var getDownloadLink = function (uiObj) {
                var domainUrl;
                var customEvent = new CustomEvent("osgi:AppConfig", {
                    detail: {
                        cb: function (osgiConfigConstants, structuredOsgiConfig) {
                            var endpointUrlsObj = structuredOsgiConfig[osgiConfigConstants.ENDPOINT_URLS];
                            domainUrl = endpointUrlsObj["documentPolicyDocument"] ? endpointUrlsObj["documentPolicyDocument"] : "http://webservicesdev.bajajallianz.com";
                        }
                    }
                });
                document.dispatchEvent(customEvent);
                var commonUrl = domainUrl;
                return commonUrl + getActionUrl(uiObj.productId) + getQueryParamString(uiObj.policyNo, uiObj.productId);
            }

            var a = document.createElement('a');
            a.href = getDownloadLink(uiObj);
            a.target = "_blank";

            var body = document.getElementsByTagName('body')[0];
            body.append(a);

            a.click();
        }

        UIObjectUtilityObj.downloadPolicyDocument = downloadPolicyDocument;

        return jsHelper.freezeObj(UIObjectUtilityObj);
    })(_global.jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'UIObjectUtility', _UIObjectUtility);
})(this);

/*******************************************UI Object Utility Module - Start******************************************************/
