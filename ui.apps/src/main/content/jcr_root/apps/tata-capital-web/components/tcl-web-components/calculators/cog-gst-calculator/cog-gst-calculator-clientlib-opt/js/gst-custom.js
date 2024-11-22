var gstFields;
var defaultGstValue;
function renderGstCalcResult(calcName) {
    getGstDefaultValue(calcName);
    var gstCalc = $('[data-calc-name='+calcName+'] .'+defaultGstValue).attr("class");
    calcType=gstCalc.split(" ").pop();
    if(calcType.toLowerCase()=="wholesaler"){
        var gst = gstWholesalerCalculator.calculate(readInputValues(calcName));
        setGstValues(gst, calcName);
    }
    if(calcType.toLowerCase()=="cog"){
        var gst = gstCogCalculator.calculate(readInputValues(calcName));
        setGstValues(gst, calcName);
    }
    if(calcType.toLowerCase()=="cop"){
        var gst = gstCopCalculator.calculate(readInputValues(calcName));
        setGstValues(gst, calcName);
    }
}

function getGstDefaultValue(calcName){
    defaultGstValue = $('[data-calc-name='+calcName+'] .dropdown-heading').text();
    // console.log(defaultGstValue);
    gstFields=$('[data-calc-name='+calcName+']').find('.calculator-field-gst');
    gstSelctedValue(gstFields,defaultGstValue)
}
function gstSelctedValue(gstFields,selectedVal){
        for(i=0;i<gstFields.length;i++){
            gstFields[i].getAttribute('class').toUpperCase().includes(selectedVal.toUpperCase())?gstFields[i].style.display="block":gstFields[i].style.display="none";
        }
    // })
}
function setGstValues(gst, calcName){
    var grossPrice = document.querySelector('[data-calc-name='+calcName+'] .gross-price-amount');
    grossPrice.innerText = '₹'+Math.round(gst["Gross Price"]).toLocaleString("EN-IN")+'*';

    var cgstAmount = document.querySelector('[data-calc-name='+calcName+'] .cgst-amount');
    cgstAmount.innerText = '₹'+Math.round(gst.CGST).toLocaleString("EN-IN")+'*';

    var igstAmount = document.querySelector('[data-calc-name='+calcName+'] .igst-amount');
    igstAmount.innerText = '₹'+Math.round(gst.IGST).toLocaleString("EN-IN")+'*';

    var totalTaxAmount = document.querySelector('[data-calc-name='+calcName+'] .total-tax-amount');
    totalTaxAmount.innerText = '₹'+Math.round(gst.totalTax).toLocaleString("EN-IN")+'*';
}

