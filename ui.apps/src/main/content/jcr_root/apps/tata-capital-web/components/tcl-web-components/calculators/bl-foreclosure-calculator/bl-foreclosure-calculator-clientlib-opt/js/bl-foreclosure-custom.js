function renderForeclosureCalcResult(calcName) {
    var foreclosure = foreClosureCalculator.calculate(readInputValues(calcName));
    setForeclosureValues(foreclosure, calcName);
}
function setForeclosureValues(foreclosure, calcName) {
    var foreclosureAmount = document.querySelector('[data-calc-name='+calcName+'] .foreclosure-amount-value');
    var emiAmount = document.querySelector('[data-calc-name=' + calcName + '] .emi-amount-value');
    var totalPaymentAmount = document.querySelector('[data-calc-name=' + calcName + '] .total-payment-value');
    var outstandingPrinciVal = document.querySelector('[data-calc-name=' + calcName + '] .outstanding-principal-value');
    if (foreclosure.foreclosureAmount > 0 ) {
        foreclosureAmount.innerText = '₹'+Math.round(foreclosure.foreclosureAmount).toLocaleString("EN-IN")+'*';
    }else{
        foreclosureAmount.innerText = "₹0*"
    }
    if (foreclosure.emiPerMonth >0) {
        emiAmount.innerText = '₹'+Math.round(foreclosure.emiPerMonth).toLocaleString("EN-IN")+'*';
    }
    else{
        emiAmount.innerText = "₹0*"
    }
    if (foreclosure.totalAmountPayable >0) {
        totalPaymentAmount.innerText = '₹'+Math.round(foreclosure.totalAmountPayable).toLocaleString("EN-IN")+'*';
    }
    else{
        totalPaymentAmount.innerText = '₹0*'
    }
    if (foreclosure.outstandingPrincipleAtTimeOfForeclosure >0) {
        outstandingPrinciVal.innerText = '₹'+Math.round(foreclosure.outstandingPrincipleAtTimeOfForeclosure).toLocaleString("EN-IN")+'*';
    }
    else{
        outstandingPrinciVal.innerText = '₹0*'
    }

}