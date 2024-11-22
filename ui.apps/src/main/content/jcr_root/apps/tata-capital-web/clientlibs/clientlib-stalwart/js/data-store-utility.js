
/*******************************************Data Store Utlity - Start******************************************************/
    
    /**
     * 
    */
   (function (_global) {
    
    /**
     * Data Store Name - This value to be use as attribute or key to represent Data Store indentity.
     */
    var DATA_STORE_NAME = '__dataStore__';
    var COMMON_DATA_STORE_NAME = '__common__';

    /**
     * Data Store Type Constants - Different types of Data Stores available in 
    */
    var LOCAL_STORAGE_DATA_STORE = "LOCAL_STORAGE_DATA_STORE"; 
    var SESSION_STORAGE_DATA_STORE = "SESSION_STORAGE_DATA_STORE"; 
    var IN_MEMORY_DATA_STORE = "IN_MEMORY_DATA_STORE";
    var INDEX_DB_DATA_STORE = "INDEX_DB_DATA_STORE";

    /**
     * Data Store Type Object Map
    */
    var _dataStoreObjMap = new Map();
    _dataStoreObjMap.set(LOCAL_STORAGE_DATA_STORE, new Map());
    _dataStoreObjMap.set(SESSION_STORAGE_DATA_STORE, new Map());
    _dataStoreObjMap.set(IN_MEMORY_DATA_STORE, new Map());
    _dataStoreObjMap.set(INDEX_DB_DATA_STORE, new Map());

    /**
     * Data Store Base Implementation Class Function
    */     
    function BaseDataStore(name,dataStoreType){
        var _this = this;
        if (exceptionUtility) {
            exceptionUtility.dependencyCheck([_global.jsHelper], _this.constructor.name);
        }
        var jsHelper = _global.jsHelper;
        

        // if(jsHelper.isEqRef(this.constructor,arguments.callee)){
        if(!(_this instanceof _this.constructor) && !(_this instanceof arguments.callee)){
            exceptionUtility.throwErr("Constructor "+_this.constructor.name+" requires 'new'");
        }
        if(jsHelper.isUndefined(name)){
            exceptionUtility.throwErr("'name' is mandatory!");
        }
        if(jsHelper.isUndefined(dataStoreType)){
            exceptionUtility.throwErr("'dataStoreType' is mandatory!");
        }

        jsHelper.defineReadOnlyObjProps(_this,{
            'name' : name,
            'dataStoreType' : dataStoreType,
            'dataStoreMap' : _dataStoreObjMap.get(dataStoreType)
        });

        if(jsHelper.isUndefined(_this.dataStoreMap.get(name))){
            _this.dataStoreMap.set(name,{});
        }

    };
    BaseDataStore.prototype.set = function(key,value){
        this.dataStoreMap.get(this.name)[key] = value;
        return this;
    };
    BaseDataStore.prototype.unset = function(key,setNull){
        this.dataStoreMap.get(this.name)[key] = jsHelper.isTrue(setNull) ? null : undefined;
        return this;
    };
    BaseDataStore.prototype.get = function(key){
        return this.dataStoreMap.get(this.name)[key];
    };
    BaseDataStore.prototype.delete = function(key){
        return delete(this.dataStoreMap.get(this.name)[key]);
    };

    /**
     * Data Store In Memmory Implementation Function
     */
    function InMemoryDataStore(name){
        var _this = this;
        BaseDataStore.call(_this,name,IN_MEMORY_DATA_STORE);

        jsHelper.freezeObj(_this);
    }
    jsHelper.extendFunc(BaseDataStore,InMemoryDataStore);

    /**
     * Data Store Local Storage Implementation Function
     */
    function LocalStorageDataStore(name){
        var _this = this;

        BaseDataStore.call(_this,name,LOCAL_STORAGE_DATA_STORE);

        jsHelper.freezeObj(_this);
    }
    (function(){
        /**Load Data From Local Storage - Start**/
        var dataStoreObjString = localStorage.getItem(DATA_STORE_NAME);
        if(jsHelper.isDefined(dataStoreObjString)){
            var dataStoreObj = jsHelper.parseJson(dataStoreObjString);
            if(jsHelper.not(jsHelper.isEmpObj(dataStoreObj))) {
                var localStorageDataStoreMap = _dataStoreObjMap.get(LOCAL_STORAGE_DATA_STORE);
                Object.keys(dataStoreObj).forEach(function (key) {
                    localStorageDataStoreMap.set(key, dataStoreObj[key]);
                });
            }
            localStorage.removeItem(DATA_STORE_NAME);
        }
        /**Load Data From Local Storage - End**/

        var writeData = function writeData(e){
            var localStorageDataStoreMap = _dataStoreObjMap.get(LOCAL_STORAGE_DATA_STORE);
            if(jsHelper.and(jsHelper.isDefined(localStorageDataStoreMap),jsHelper.not(jsHelper.isEqVal(localStorageDataStoreMap.size,0)))){
                var lsDataStoreObj = {};
                localStorageDataStoreMap.forEach(function(value,key){
                    lsDataStoreObj[key] = value;
                });
                localStorage.setItem(DATA_STORE_NAME,jsHelper.stringifyJson(lsDataStoreObj));
            }
        };
        window.addEventListener('beforeunload',function(e){
            writeData(e);
         });
    })();
    jsHelper.extendFunc(BaseDataStore,LocalStorageDataStore);


    /**
     * DataStore Factory
    */
    function DataStore(name,dataStoreType){
        if(jsHelper.isEqVal(dataStoreType,IN_MEMORY_DATA_STORE)){
            return new InMemoryDataStore(name);
        }else if(jsHelper.isEqVal(dataStoreType,LOCAL_STORAGE_DATA_STORE)){
            return new LocalStorageDataStore(name);
        }
    }

    /**
     * Data Store Utility
     */
    var _dataStoreUtility = (function (jsHelper) {
        if (exceptionUtility) {
            exceptionUtility.dependencyCheck([jsHelper], "Data Store Utility");
        }

        var _dataStoreUtilityObj =  {};

        /***Helper Methods - Start**/
        var _createDataStore = function (name,dataStoreType) {
            return DataStore(name,dataStoreType)
        };
        var _getDataStore = function (name,dataStoreType) {
           return jsHelper.isDefined(_dataStoreObjMap.get(dataStoreType).get(name),true) ? _createDataStore(name,dataStoreType) : null;
        };
        var _clearDataStore = function (name,dataStoreType) {
            _dataStoreObjMap.get(dataStoreType).set(name,Object.create({}));
            return this;
        };
        var _deleteDataStore = function (name,dataStoreType) {
            _dataStoreObjMap.get(dataStoreType).delete(name);
            return this;
        };
        /***Helper Methods - End**/

        var createDataStore = function createDataStore(name){
            return _createDataStore(name,IN_MEMORY_DATA_STORE);
        };
        _dataStoreUtilityObj.createDataStore = _dataStoreUtilityObj.createDS = createDataStore; 

        var createPersistentDataStore = function createPersistentDataStore(name){
            return _createDataStore(name,LOCAL_STORAGE_DATA_STORE);
        };
        _dataStoreUtilityObj.createPersistentDataStore = _dataStoreUtilityObj.createPDS = createPersistentDataStore;

        var getDataStore = function getDataStore(name){
            return _getDataStore(name,IN_MEMORY_DATA_STORE);
        };
        _dataStoreUtilityObj.getDataStore = _dataStoreUtilityObj.getDS = getDataStore;

        var getPersistentDataStore = function getPersistentDataStore(name){
            return _getDataStore(name,LOCAL_STORAGE_DATA_STORE);
        };
        _dataStoreUtilityObj.getPersistentDataStore = _dataStoreUtilityObj.getPDS = getPersistentDataStore;

        var deleteDataStore = function deletePersistentDataStore(name){
            return _deleteDataStore(name,IN_MEMORY_DATA_STORE);
        };
        _dataStoreUtilityObj.deleteDataStore = _dataStoreUtilityObj.deleteDS = deleteDataStore;

        var deletePersistentDataStore = function deletePersistentDataStore(name){
            return _deleteDataStore(name,LOCAL_STORAGE_DATA_STORE);
        };
        _dataStoreUtilityObj.deletePersistentDataStore = _dataStoreUtilityObj.deletePDS = deletePersistentDataStore;

        var clearDataStore = function clearPersistentDataStore(name){
            return _clearDataStore(name,IN_MEMORY_DATA_STORE);
        };
        _dataStoreUtilityObj.clearDataStore = _dataStoreUtilityObj.clearDS = clearDataStore;

        var clearPersistentDataStore = function clearPersistentDataStore(name){
            return _clearDataStore(name,LOCAL_STORAGE_DATA_STORE);
        };
        _dataStoreUtilityObj.clearPersistentDataStore = _dataStoreUtilityObj.clearPDS = clearPersistentDataStore;

        return jsHelper.freezeObj(_dataStoreUtilityObj);
    })(_global.jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'dataStoreUtility', _dataStoreUtility);

})(this);

/*******************************************Data Store Utlity - End******************************************************/