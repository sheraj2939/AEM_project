/*******************************************JS Helper - Start******************************************************/

/**
 * This module consist all the required helper function .
 * This module is to enhance its implementation. Keep adding commonly used functions in this module and use this module as dependency.
 */
(function (_global) {

    var _jsHelper = (function () {

        var jsHelperObj = {};

        var not = function notOperator(boolVal) {
            return isBool(boolVal) ? !boolVal : boolVal;
        }
        jsHelperObj.notOperator = jsHelperObj.not = not;

        var and = function andOperator(condition1, condition2) {
            if (not((isBool(condition1) && isBool(condition2)))) {
                return false;
            }
            return (condition1 && condition2);
        }
        jsHelperObj.andOperator = jsHelperObj.and = and;

        var andMany = function andOperatorMany() {
            var result = true;
            for (var i in arguments) {
                result = and(result, arguments[i]);
            }
            return result;
        }
        jsHelperObj.andOperatorMany = jsHelperObj.andMany = andMany;

        var or = function orOperator(condition1, condition2) {
            if (not((isBool(condition1) && isBool(condition2)))) {
                return false;
            }
            return (condition1 || condition2);
        }
        jsHelperObj.orOperator = jsHelperObj.or = or;

        var orMany = function orOperatorMany() {
            var result = false;
            for (var i in arguments) {
                result = or(result, arguments[i]);
            }
            return result;
        }
        jsHelperObj.orOperatorMany = jsHelperObj.orMany = orMany;

        var _opOneWithMany = function _operatorOneWithMany(fnOp,args){
            if(andMany(isFunc(fnOp),isDefined(args),_isLenPropDef(args))){
                var status = isEqRef(fnOp,and);
                if(isGt(args.length,2)){
                    var value = args[0];
                    var fnBool = isEqRef(fnOp,and) ? isFalse : isTrue;
                    for(var i=1; isLt(i,args.length); i++){
                        status = fnOp(status,isEqVal(value,args[i]));
                        if(fnBool(status)){
                            break;
                        }
                    }
                }
                return status;
            }
            return false;
        };

        var orOneWithMany = function orOneWithMany(){
            return _opOneWithMany(or,arguments);
        };
        jsHelperObj.orOneWithMany = jsHelperObj.orOneWithMany = orOneWithMany;

        var andOneWithMany = function andOneWithMany(){
            return _opOneWithMany(and,arguments);
        };
        jsHelperObj.andOneWithMany = jsHelperObj.andOneWithMany = andOneWithMany;

        var ternaryFunc = function ternaryOperatorFunction(condition, conditionTrueValue, conditionFalseValue) {
            if(orMany(isUndefined(condition), isUndefined(conditionTrueValue), isUndefined(conditionFalseValue))){
                return false;
            }
            return condition ? conditionTrueValue : conditionFalseValue;
        };
        jsHelperObj.ternaryOperatorFunction = jsHelperObj.ternaryFunc = ternaryFunc;

        var isEqRef = function isEqualByReference() {
            var mingArg = 2;
            if (isLt(arguments.length, mingArg)) {
                exceptionUtility.throwErr("Minumum " + mingArg + " arguments required!")
            }
            for (var i = 0; i < arguments.length - 1; i++) {
                if (arguments[i] !== arguments[i + 1]) {
                    return false;
                }
            }
            return true;
        }
        jsHelperObj.isEqualByReference = jsHelperObj.isEqRef = isEqRef;

        var isEqVal = function isEqualByValue(val1, val2, caseInsensitive) {
            var val1Str = String(val1);
            var val2Str = String(val2);
            if (isTrue(caseInsensitive)) {
                val1Str = val1Str.toLowerCase();
                val2Str = val2Str.toLowerCase();
            }
            return isEqRef(val1Str, val2Str);
        }
        jsHelperObj.isEqualByValue = jsHelperObj.isEqVal = isEqVal;

        var isEqValMany = function isEqualByValueMany() {
            for (var i = 0; i < arguments.length - 1; i++) {
                if (!isEqVal(arguments[i], arguments[i + 1])) {
                    return false;
                }
            }
            return true;
        }
        jsHelperObj.isEqualByValueMany = jsHelperObj.isEqValMany = isEqValMany;

        var isEqValManyCI = function isEqualByValueManyCI() {
            for (var i = 0; i < arguments.length - 1; i++) {
                if (!isEqVal(arguments[i], arguments[i + 1], true)) {
                    return false;
                }
            }
            return true;
        }
        jsHelperObj.isEqualByValueManyCI = jsHelperObj.isEqValManyCI = isEqValManyCI;

        var isGt = function isGreaterThan(val1, val2) {
            return (isNum(val1) && isNum(val2)) ? (val1 > val2) : false;
        }
        jsHelperObj.isGreaterThan = jsHelperObj.isGt = isGt;

        var isLt = function isLessThan(val1, val2) {
            return (isNum(val1) && isNum(val2)) ? (val1 < val2) : false;
        }
        jsHelperObj.isLessThan = jsHelperObj.isLt = isLt;

        var isDefined = function isDefined(val,strict) {
            return not(isUndefined(val,isTrue(strict)));
        };
        jsHelperObj.isDefined = jsHelperObj.isDef = isDefined;

        var isUndefined = function isUndefined(val,strict) {
            return isTrue(strict) ? (val===undefined) : (val ? false : true);
        };
        jsHelperObj.isUndefined = jsHelperObj.isUndef = isUndefined;

        var isNull = function isNullStrict(val) {
            return isEqVal(val, null);
        };
        jsHelperObj.isNull = jsHelperObj.isNull = isNull;

        var isNonNull = function isNonNullStrict(val) {
            return !isNull(val);
        };
        jsHelperObj.isNonNull = jsHelperObj.isNonNull = isNonNull;

        var isTrue = function isBooleanTrue(val) {
            return val === true;
        };
        jsHelperObj.isTrue = isTrue;

        var isFalse = function isBooleanFalse(val) {
            return val === false;
        };
        jsHelperObj.isFalse = isFalse;

        var isFunc = function isFunction(fn) {
            return isDefined(fn) && (fn instanceof Function);
        };
        jsHelperObj.isFunction = jsHelperObj.isFunc = isFunc;

        var isObj = function isObject(obj) {
            return isDefined(obj) && (obj instanceof Object);
        };
        jsHelperObj.isObject = jsHelperObj.isObj = isObj;

        var isStr = function isString(str) {
            return isDefined(str,true) && ((str instanceof String) || (typeof (str) === String.name.toLowerCase()));
        };
        jsHelperObj.isString = jsHelperObj.isStr = isStr;

        var isNum = function isNumber(num,allowBool) {
            num = and(isTrue(allowBool),isTrue(num)) ? 1 : and(isTrue(allowBool),isFalse(num)) ? 0 : num;
            return isDefined(num,true) && ((num instanceof Number) || (typeof (num) === Number.name.toLowerCase()));
        };
        jsHelperObj.isNumber = jsHelperObj.isNum = isNum;

        var isInt = function isInteger(num) {
            return isNum(num) && Number.isSafeInteger(num);
        };
        jsHelperObj.isInteger = jsHelperObj.isInt = isInt;

        var isBool = function isBoolean(bool) {
            return ((bool instanceof Boolean) || (typeof (bool) === Boolean.name.toLowerCase()));
        };
        jsHelperObj.isBoolean = jsHelperObj.isBool = isBool;

        var isArr = function isArray(arr) {
            return Array.isArray(arr);
        };
        jsHelperObj.isArray = jsHelperObj.isArr = isArr;

        var _isLenPropDef = function isLengthPropertyDefined(val) {
            return isDefined(val,true) && isDefined(val.length,true);
        };

        var isEmpArr = function isEmptyArray(arr) {
            return _isLenPropDef(arr) && isEqVal(arr.length, 0);
        };
        jsHelperObj.isEmpArr = jsHelperObj.isEmptyArray = isEmpArr;

        var isEmpObj = function isEmptyObject(obj) {
            return isDefined(obj) && isObj(obj) && isEmpArr(Object.keys(obj));
        };
        jsHelperObj.isEmpObj = jsHelperObj.isEmptyObject = isEmpObj;

        var isFormData = function (formData) {
            return isFunc(FormData) ? (formData instanceof FormData) : false;
        };
        jsHelperObj.isFormData = jsHelperObj.isFormData = isFormData;

        var arrIncludes = function arrayIncludes(arr, val) {
            return isArr(arr) && !arr.every(function(eachVal, index, arr) {return eachVal !== val;});
        };
        jsHelperObj.arrayIncludes = jsHelperObj.arrIncludes = arrIncludes;

        var arrFill = function arrayFill(fillValue, arrOrCount) {
            return Array.apply(null, isArr(arrOrCount) ? arrOrCount : (Array(arrOrCount))).map(function () { return isObj(fillValue) ? jsHelper.cloneObj(fillValue, true) : fillValue });
        };
        jsHelperObj.arrFill = jsHelperObj.arrayFill = arrFill;

        var arrOfArrConcat = function arrayOfArrayConcat(arrOfArr) {
            return toArr(arrOfArr).reduce(function (p, n) {
                return p.concat(n)
            });
        };
        jsHelperObj.arrOfArrConcat = jsHelperObj.arrayOfArrayConcat = arrOfArrConcat;

        var isDate = function isDate(date) {
            return (date instanceof Date);
        };
        jsHelperObj.isDate = jsHelperObj.isDate = isDate;

        var isValidDate = function isValidDate(date) {
            /*if (isDate(date)) {
                return true;
            }
            var parsedDate = new Date(Date.parse(date));
            var parsedDateStr = parsedDate.toDateString();
            if (parsedDateStr === "Invalid Date") {
                return false;
            }
            return true;*/
            return isDate(date) ? true : not(((new Date(Date.parse(date))).toDateString()==="Invalid Date"));
        };
        jsHelperObj.isValidDate = jsHelperObj.isValidDate = isValidDate;

        var toObj = function toObject(obj, defaultObj) {
            return isObj(obj) ? obj : (isObj(defaultObj) ? defaultObj : Object.create({}));
        };
        jsHelperObj.toObject = jsHelperObj.toObj = toObj;

        var toArr = function toArray(arr, defaultArr) {
            return isArr(arr) ? arr : (isArr(defaultArr) ? defaultArr : Object.create([]));
        };
        jsHelperObj.toArray = jsHelperObj.toArr = toArr;

        var toStr = function toString(val, defaultVal) {
            return isDefined(val) ? String(val) : (isDefined(defaultVal) ? String(defaultVal) : String());
        };
        jsHelperObj.toString = jsHelperObj.toStr = toStr;

        var toNum = function toNumber(val, defaultVal) {
            return (and(isDefined(val,true),not(isEqVal(Number(val),Number.NaN))))
                ? Number(val) : (isNum(defaultVal,true) ? toNumber(defaultVal,Number.NaN) : Number.NaN);
        };
        jsHelperObj.toNumber = jsHelperObj.toNum = toNum;

        var objKeys = function objectKeys(obj) {
            return ternaryFunc(isObj(obj), Object.keys(obj), []);
        };
        jsHelperObj.objectKeys = jsHelperObj.objKeys = objKeys;

        var objVals = function objectValues(obj) {
            return objKeys(obj).map(function (key) {
                return obj[key];
            });
        };
        jsHelperObj.objectValues = jsHelperObj.objVals = objVals;

        var freezeObj = function freezeObject(obj) {
            return Object.freeze(obj);
        };
        jsHelperObj.freezeObject = jsHelperObj.freezeObj = freezeObj;

        var deepFreezeObj = function deepFreezeObject(obj) {
            for (var key in obj) {
                var val = obj[key];
                if (isObj(val)) {
                    deepFreezeObject(val);
                }
            }
            return freezeObj(obj);
        };
        jsHelperObj.deepFreezeObject = jsHelperObj.deepFreezeObj = deepFreezeObj;

        var toCamelCase = function StringToCamelCase(str) {
            return str.split(/[_-]|\s+/).map(function (word, index) {/*
                // If it is the first word make sure to lowercase all the chars.
                if (isEqVal(index,0)) {
                    return word.toLowerCase();
                }
                // If it is not the first word only upper case the first char and lowercase the rest.
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                */
                return isEqVal(index,0) ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }).join('');
        };
        jsHelperObj.toCamelCase = jsHelperObj.toCC = toCamelCase;

        var toSentence = function StringToSentence(str) {
            return str.split(/[_-]|\s+/).map(function (word, index) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }).join(' ');
        };
        jsHelperObj.toSentence = jsHelperObj.toSentc = toSentence;

        var _shallowCopyObj = function shallowCopyObject(obj) {
            var clone = Object.create({});
            Object.keys(toObj(obj)).forEach(function (key) {
                clone[key] = obj[key];
            });
            return clone;
        };

        var _deepCopyObj = function deepCopyObject(obj) {
            var clone = {};
            for (var i in obj) {
                clone[i] = isFunc(obj[i]) ? obj[i] : (isObj(obj[i]) ? deepCopyObject(obj[i]) : obj[i]);
            }
            return clone;
        };

        var cloneObj = function cloneObjectShallowAndDeep(obj, isDeep) {
            return isTrue(isDeep) ? _deepCopyObj(obj) : _shallowCopyObj(obj);
        };
        jsHelperObj.cloneObject = jsHelperObj.cloneObj = cloneObj;

        var defineReadOnlyObjectProperty = function defineReadOnlyObjectProperty(propContext, propName, getVal) {
            Object.defineProperty(propContext, propName, {
                get: function () {
                    return getVal;
                }
            });
            return true;
        };
        jsHelperObj.defineReadOnlyObjectProperty = jsHelperObj.defineReadOnlyObjProp = defineReadOnlyObjectProperty;

        var defineReadOnlyObjectProperties = function defineReadOnlyObjectProperties(propContext, propsObj) {
            var propertiesObj = {};
            objKeys(propsObj).forEach(function (key) {
                propertiesObj[key] = {
                    get: function () {
                        return propsObj[key];
                    }
                }
            });
            return Object.defineProperties(propContext, propertiesObj);
        };
        jsHelperObj.defineReadOnlyObjectProperties = jsHelperObj.defineReadOnlyObjProps = defineReadOnlyObjectProperties;

        var flattenObject = function flattenObject(obj) {
            /*var toReturn = {};
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if ((typeof obj[i]) == 'object') {
                    var flatObject = flattenObject(obj[i]);
                    for (var x in flatObject) {
                        if (!flatObject.hasOwnProperty(x)) continue;
                        toReturn[i + '.' + x] = flatObject[x];                    }
                } else {
                    toReturn[i] = obj[i];
                }
            }
            return toReturn;*/
            var toReturn = {};
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if (isObj(obj[i])) {
                    var flatObject = flattenObject(obj[i]);
                    for (var x in flatObject) {
                        if (!flatObject.hasOwnProperty(x)) continue;
                        toReturn[i + '.' + x] = flatObject[x];                    }
                } else {
                    toReturn[i] = obj[i];
                }
            }
            return toReturn;
        };
        jsHelperObj.flattenObject = jsHelperObj.flattenObj = flattenObject;

        var unflattenObject = function unflattenObject(obj) {
            var result = {}
            for (var i in obj) {
                var keys = i.split('.')
                keys.reduce(function (r, e, j) {
                    return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? obj[i] : {}) : [])
                }, result)
            }
            return result
        };
        jsHelperObj.unflattenObject = jsHelperObj.unflattenObj = unflattenObject;

        var mapFlatObj = function updateFlatObjByKeyMap(keyMappingObj, fromObj, toObj) {
            if (andMany(isDefined(keyMappingObj),isDefined(fromObj),isDefined(toObj))) {
                Object.keys(keyMappingObj).forEach(function (key) {
                    var fromObjKey = key;
                    var toObjKey = keyMappingObj[key];
                    toObj[toObjKey] = fromObj[fromObjKey];
                });
                return toObj;
            }
        };
        jsHelperObj.mapFlatObject = jsHelperObj.mapFlatObj = mapFlatObj;

        var parseJson = function parseJson(jsonStr) {
          return JSON.parse(jsonStr);
        };
        jsHelperObj.parseJson = parseJson;

        var stringifyJson = function stringifyJson(json) {
            return JSON.stringify(json);
        };
        jsHelperObj.stringifyJson = stringifyJson;

        var cloneJson = function (obj) {
            return parseJson(stringifyJson(obj));
        };
        jsHelperObj.cloneJson = cloneJson;
       
        var parseIntString = function(param) {
            return (typeof (param) !== "number") ? Math.round(parseInt(param)) : Math.round(param)
        };
        jsHelperObj.parseIntString = parseIntString;
        
        var extendFunc = function extendFunction(ParentFunc,ChildFunc){
            if(and(isFunc(ParentFunc),isFunc(ChildFunc))){
                ChildFunc.prototype = Object.create(ParentFunc.prototype);
                ChildFunc.prototype.constructor = ChildFunc;
                return true;
            }
            return false;
        };
        jsHelperObj.extendFunction = jsHelperObj.extendFunc = extendFunc;

        return freezeObj(jsHelperObj);
    })();

    _jsHelper.defineReadOnlyObjProp(_global, 'jsHelper', _jsHelper);
    // _jsHelper.defineReadOnlyObjProp(_global.jsHelper,'describe',"Description");


})(this);

/*******************************************JS Helper - End******************************************************/