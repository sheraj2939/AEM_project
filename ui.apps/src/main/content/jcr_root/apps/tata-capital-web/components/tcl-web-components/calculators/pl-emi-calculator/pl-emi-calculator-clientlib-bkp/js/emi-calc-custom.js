/*calculations*/
function renderEmiCalcResult(calcName) {
    if (calcName == 'calculator-personal-loan-emi-calc') {
        var emi = emiCalculator.calculate(readInputValues(calcName));
        setvalues(emi, calcName)
        highChartRender(emi.totalAmountPayable, emi.totalInterestPayable, calcName);
        
    }
    else if (calcName == 'calculator-home-loan-emi-calc') {
        var emi = hlEmiCalculator.calculate(readInputValues(calcName));
        setvalues(emi, calcName)
        highChartRender(emi.totalAmountPayable, emi.totalInterestPayable, calcName);
        
    }
    else if (calcName == 'calculator-loans-against-property-emi-calc') {
        var emi = lapEmiCalculator.calculate(readInputValues(calcName));
        setvalues(emi, calcName)
        highChartRender(emi.totalAmountPayable, emi.totalInterestPayable, calcName);
        
    }
    else if (calcName == 'calculator-business-loan-emi-calc') {
        var emi = blEmiCalculator.calculate(readInputValues(calcName));
        setvalues(emi, calcName)
        highChartRender(emi.totalAmountPayable, emi.totalInterestPayable, calcName);
        
    }
    else if (calcName == 'calculator-used-car-loans-emi-calc') {
        var emi = carEmiCalculator.calculate(readInputValues(calcName));
        setvalues(emi, calcName)
        highChartRender(emi.totalAmountPayable, emi.totalInterestPayable, calcName);
        
    }
    else if (calcName == 'calculator-two-wheeler-loans-emi-calc') {
        var emi = twEmiCalculator.calculate(readInputValues(calcName));
        setvalues(emi, calcName)
        highChartRender(emi.totalAmountPayable, emi.totalInterestPayable, calcName);
        
    }

}

function setvalues(emi,calcName){
    var calculatePrice = document.querySelector('[data-calc-name='+calcName+'] .calculated-emi');
    calculatePrice.innerText = '₹'+Math.round(emi.emiPerMonth).toLocaleString("EN-IN")+'*';
    
    var calculateTap = document.querySelector('[data-calc-name='+calcName+'] .calculated-tap');
    calculateTap.innerText='₹'+Math.round(emi.totalAmountPayable).toLocaleString("EN-IN")+'*';

    var calculateTip = document.querySelector('[data-calc-name='+calcName+'] .calculated-tip');
    calculateTip.innerText='₹'+Math.round(emi.totalInterestPayable).toLocaleString("EN-IN")+'*';

    var calculateTapMobile = document.querySelector('[data-calc-name='+calcName+'] .calculated-tap-mobile');
    calculateTapMobile.innerText='₹'+Math.round(emi.totalAmountPayable).toLocaleString("EN-IN")+'*';

    var calculateTipMobile = document.querySelector('[data-calc-name='+calcName+'] .calculated-tip-mobile');
    calculateTipMobile.innerText='₹'+Math.round(emi.totalInterestPayable).toLocaleString("EN-IN")+'*';
}

if ($('[data-calc-name="calculator-rural-indivudual-emi-calc"]').length != 0) {
    $('[data-jsname="rateOfInterest"]').attr("disabled", "disabled");
    setTimeout(() => {
        if (parseInt($('[data-jsname="loanAmount"]').val().replace(/,/g, '')) <= 100000) {
            $('[data-jsname="rateOfInterest"]').val(27).trigger("input");
        }
        else if (parseInt($('[data-jsname="loanAmount"]').val().replace(/,/g, '')) > 100000 && parseInt($('[data-jsname="loanAmount"]').val().replace(/,/g, '')) <= 150000) {
            $('[data-jsname="rateOfInterest"]').val(26).trigger("input");
        }
        else if (parseInt($('[data-jsname="loanAmount"]').val().replace(/,/g, '')) > 150000 && parseInt($('[data-jsname="loanAmount"]').val().replace(/,/g, '')) <= 200000) {
            $('[data-jsname="rateOfInterest"]').val(28).trigger("input");
        }
    }, 300);
}