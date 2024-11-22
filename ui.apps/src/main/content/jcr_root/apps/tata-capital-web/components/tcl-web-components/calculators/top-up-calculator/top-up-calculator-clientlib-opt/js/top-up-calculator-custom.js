function renderTopUpCalcResult(calcName) {
        // debugger;
        // var calcObj =readInputValues(calcName)
        // var newCalcObj = {...calcObj,hiddenTCHFLRateofInterest:9.25} 
        var calcObj =readInputValues(calcName)
        var newCalcObj = {hiddenTCHFLRateofInterest:9.25} 
        newCalcObj = Object.assign(calcObj,newCalcObj)
        getTopUpApi(newCalcObj,calcName);
        // console.log("BT TOP UP ",topUp);
        // setbalanceTopupCalculatorValues(topUp, calcName);
        // getTopUpApi(topUp);
}
 
function setbalanceTopupCalculatorValues(topUp, calcName) {
        // console.log("heyyy",topUp)
        if (topUp.btAmount < 0 || isNaN(topUp.btAmount)) {
                var calculatedBTA = document.querySelector('[data-calc-name=' + calcName + '] .calculated-bta');
                calculatedBTA.innerText = '₹0*';
        }
        else {
                var calculatedBTA = document.querySelector('[data-calc-name=' + calcName + '] .calculated-bta')
                calculatedBTA.innerText = '₹' + Math.round(topUp.btAmount).toLocaleString("EN-IN") + '*';

        }
        if (topUp.emiFinalEligibility < 0 || isNaN(topUp.emiFinalEligibility)) {
                var emiFinalEligibility = document.querySelector('[data-calc-name=' + calcName + '] .emi-final-eligibility')
                emiFinalEligibility.innerText = '₹0*';
        }
        else {
                var emiFinalEligibility = document.querySelector('[data-calc-name=' + calcName + '] .emi-final-eligibility')
                emiFinalEligibility.innerText = '₹' + Math.round(topUp.emiFinalEligibility).toLocaleString("EN-IN") + '*';
        }
        if (topUp.totalSavings < 0 || isNaN(topUp.totalSavings)) {
                var totalSavings = document.querySelector('[data-calc-name=' + calcName + '] .total-savings')
                totalSavings.innerText = '₹0*';
        }
        else {
                var totalSavings = document.querySelector('[data-calc-name=' + calcName + '] .total-savings')
                totalSavings.innerText = '₹' + Math.round(topUp.totalSavings).toLocaleString("EN-IN") + '*';
        }
        if (topUp.finalTotalEligibility < 0 || isNaN(topUp.finalTotalEligibility)) {
                var finalTE = document.querySelector('[data-calc-name=' + calcName + '] .final-te')                
                finalTE.innerText = '₹0*';
        }
        else {
                var finalTE = document.querySelector('[data-calc-name=' + calcName + '] .final-te')                
                finalTE.innerText = '₹' + Math.round(topUp.finalTotalEligibility).toLocaleString("EN-IN") + '*';
        }
        if (topUp.topUpAmount < 0 || isNaN(topUp.topUpAmount)) {
                var topUpAmount = document.querySelector('[data-calc-name=' + calcName + '] .top-up-amount')                
                topUpAmount.innerText = '₹0*';
        }
        else {
                var topUpAmount = document.querySelector('[data-calc-name=' + calcName + '] .top-up-amount')                
                topUpAmount.innerText = '₹' + Math.round(topUp.topUpAmount).toLocaleString("EN-IN") + '*';
        }
        if (topUp.monthlySavings < 0 || isNaN(topUp.monthlySavings)) {
                var monthlySavings = document.querySelector('[data-calc-name=' + calcName + '] .monthly-savings')                
                monthlySavings.innerText = '₹0*';
        }
        else {
                var monthlySavings = document.querySelector('[data-calc-name=' + calcName + '] .monthly-savings')                
                monthlySavings.innerText = '₹' + Math.round(topUp.monthlySavings).toLocaleString("EN-IN") + '*';
        }
}

