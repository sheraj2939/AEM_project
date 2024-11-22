function renderPmayCalcResult(calcName) {
    // debugger;
    var pmay = hlPmayCalculator.calculate(readInputValues(calcName));
    setPmayValues(pmay,calcName);
}
function setPmayValues(pmay,calcName){
    var subsidyAmount = document.querySelector('[data-calc-name='+calcName+'] .subsidy-amount');
    subsidyAmount.innerText = '₹'+Math.round(pmay.subsidyAmount).toLocaleString("EN-IN")+'*';

    var subsidyCategory = document.querySelector('[data-calc-name='+calcName+'] .subsidy-category');
    // debugger;
    subsidyCategory.innerText = pmay.category;

}