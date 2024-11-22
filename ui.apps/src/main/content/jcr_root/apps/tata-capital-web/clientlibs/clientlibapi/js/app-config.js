/*******************************************App Config - Start******************************************************/

(function(_global){
    var _appConfig = (function (jsHelper) {
        if (exceptionUtility) {
            exceptionUtility.dependencyCheck([jsHelper], "App Config");
        }

        var appName = "tata-capital-web";
        var contentRoot = "/content/" + appName;
        var apiRoot = contentRoot + "/tatacapitalapi";
        var apiExtension = ".json";
        return jsHelper.freezeObj({
            appName: appName,
            contentRoot: contentRoot,
            apiRoot: apiRoot,
            apiExtension: apiExtension
        });
    })(_global.jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global,'appConfig',_appConfig);
})(this);

/*******************************************App Config - Start******************************************************/