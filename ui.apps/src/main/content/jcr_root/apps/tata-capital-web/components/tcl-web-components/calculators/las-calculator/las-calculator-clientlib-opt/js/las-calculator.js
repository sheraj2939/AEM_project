({657:function(){function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e,n){(e=i(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}function i(e){return e=function(e,i){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0===n)return String(e);if("object"!==t(n=n.call(e,"string")))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(e),"symbol"===t(e)?e:String(e)}var n=new(function(){function t(){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function");e(this,"quantity",void 0),e(this,"price",void 0),e(this,"ltv",void 0)}var n,r;return n=t,(r=[{key:"calculate",value:function(t){return this.quantity=t.quantity,this.price=t.price,this.ltv=t.ltv,{totalsharevalue:t=this.quantity*this.price,eligiableAmt:t*this.ltv/100}}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,i(r.key),r)}}(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}());(window||this||{}).loanAgainstSecuirtyCalculator={calculate:n.calculate}}})[657]();