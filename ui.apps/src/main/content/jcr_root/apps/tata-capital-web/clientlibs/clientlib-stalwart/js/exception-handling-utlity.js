/*******************************************Exception Handling Utility Module - Start******************************************************/

(function(_global){
    var _exceptionUtility = (function (jsHelper) {
        var exceptionUtility = {};
        
        var throwErr = function throwError(errorMsg){
            throw new Error(jsHelper.toStr(errorMsg));
        }        
        exceptionUtility.throwErr = exceptionUtility.throwError = throwErr;

        var dependencyCheck = function moduleDependencyExceptionCheck(moduleArr, moduleName) {
            if (Array.isArray(moduleArr)) {
                var filteredArr = moduleArr.filter(function (eachDependency) { return jsHelper.isDefined(eachDependency) });
                if (filteredArr.length == moduleArr.length) {
                    return;
                }
            }
            throwErr(jsHelper.toStr(moduleName) + " Module dependency missing!");
        }
        exceptionUtility.dependencyCheck = dependencyCheck;

        return jsHelper.freezeObj(exceptionUtility);
    })(_global.jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global,'exceptionUtility',_exceptionUtility);
})(this);

/*******************************************Exception Handling Utility Module - End******************************************************/