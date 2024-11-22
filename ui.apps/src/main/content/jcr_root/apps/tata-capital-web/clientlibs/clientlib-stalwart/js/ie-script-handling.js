/**
 * IE Handling Script Implementation
 * **/
(function (_global) {
    if(_global){
        /**Script to Handle "name" property of all the Function objects - Start**/
        var setName = function setName(fn) {
            if(fn===Function){
                Object.defineProperty(Function.prototype, 'name', {
                    get: function() {
                        var name = "";
                        if((this.hasOwnProperty!== undefined) && (typeof(this.hasOwnProperty)==="function") && this.hasOwnProperty('name')){
                            name = (this.toString().match(/^function\s*([^\s(]+)/) || [])[1];
                            try{Object.defineProperty(this, 'name', { value: name });}
                            catch(e){console.info(this," already name defined");}
                        }
                        return name;
                    }
                });
            }
            if ((typeof(fn)==="function")) {
                var fnExpr = fn.toString().split("function ");
                var name = (fnExpr && fnExpr.length>1) ?  (fnExpr[1].split("()")[0]) : "";
                try{Object.defineProperty(fn, 'name', {get: function() {return name;}});}
                catch(e){console.info(this," already name defined");}
            }
        };
        Object.getOwnPropertyNames(_global)
            .filter(function(eachObj){return (typeof(_global[eachObj])==="function") && (_global[eachObj].name===undefined);})
            .forEach(function (fnName) { setName(_global[fnName]);});
        /**Script to Handle "name" property of all the Function objects - End**/
    }
})(window);

(function () {

	  if ( typeof window.CustomEvent === "function" ) return false;

	  function CustomEvent ( event, params ) {
	    params = params || { bubbles: false, cancelable: false, detail: undefined };
	    var evt = document.createEvent( 'CustomEvent' );
	    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
	    return evt;
	   }

	  CustomEvent.prototype = window.Event.prototype;

	  window.CustomEvent = CustomEvent;
})();

