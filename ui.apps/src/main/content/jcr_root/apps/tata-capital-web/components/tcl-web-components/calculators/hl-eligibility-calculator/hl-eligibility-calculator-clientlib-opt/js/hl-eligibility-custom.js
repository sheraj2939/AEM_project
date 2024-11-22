function renderHlEligibilityCalcResult(calcName) {
    var hlEligibility = hlEligibiltyCalculator.calculateEligibilityByAPR(readInputValues(calcName));
    setHlEligibilityValues(hlEligibility, calcName);
}
function setHlEligibilityValues(hlEligibility, calcName) {
    if (hlEligibility.elg < 0) {
        var totalLoanAmt = document.querySelector('[data-calc-name=' + calcName + '] .total-loan-amount');
        totalLoanAmt.innerText = '₹ 0*';
    }
    else {
        var totalLoanAmt = document.querySelector('[data-calc-name=' + calcName + '] .total-loan-amount');
        totalLoanAmt.innerText = '₹' + Math.round(hlEligibility.elg).toLocaleString("EN-IN") + '*';
    }
    if (hlEligibility.EMI < 0) {
        var hlEmi = document.querySelector('[data-calc-name=' + calcName + '] .hl-eli-emi');
        hlEmi.innerText = '₹ 0*';
    }
    else{
        var hlEmi = document.querySelector('[data-calc-name=' + calcName + '] .hl-eli-emi');
        hlEmi.innerText = '₹' + Math.round(hlEligibility.EMI).toLocaleString("EN-IN") + '*';
    }

}