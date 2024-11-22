({740:function(){function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e,r){(e=n(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r}function n(e){return e=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return String(e);if("object"!==t(r=r.call(e,"string")))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}(e),"symbol"===t(e)?e:String(e)}var r=new(function(){function t(){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function");e(this,"loanAmount",void 0),e(this,"roi",void 0),e(this,"tenure",void 0),e(this,"repaymentOption",void 0)}var r,o;return r=t,(o=[{key:"calculate",value:function(t){var e,n;switch(this.loanAmount=t.loanAmount,this.roi=t.roi/100,this.tenure=t.tenure,this.repaymentOption=t.repaymentOption,this.repaymentOption){case"monthly":return{result:e=Math.round(this.loanAmount*this.roi/12*(Math.pow(1+this.roi/12,this.tenure)/(Math.pow(1+this.roi/12,this.tenure)-1))),EMIInstallment:n=Number(this.tenure)};case"bi-monthly":return{result:e=Math.round(this.loanAmount*this.roi/24*(Math.pow(1+this.roi/24,2*this.tenure)/(Math.pow(1+this.roi/24,2*this.tenure)-1))),EMIInstallment:n=Number(2*this.tenure)};case"weekly":return{result:e=Math.round(this.loanAmount*this.roi/52*(Math.pow(1+this.roi/52,52*this.tenure)/(Math.pow(1+this.roi/52,52*this.tenure)-1))),EMIInstallment:n=Number(52*this.tenure)}}return{loanAmount,tenure,repaymentOption,EMI:e,EMIInstallment:n}}}])&&function(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,n(o.key),o)}}(r.prototype,o),Object.defineProperty(r,"prototype",{writable:!1}),t}());(window||this||{}).microFinanceCalculator={calculate:r.calculate}}})[740]();