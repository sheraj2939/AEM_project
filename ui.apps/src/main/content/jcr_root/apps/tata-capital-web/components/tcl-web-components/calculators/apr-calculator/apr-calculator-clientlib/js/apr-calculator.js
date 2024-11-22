
function renderAprCalcResult(calcName, instanceName) {
    if (calcName == 'apr-calculator') {
        loanOrgFraction(readInputValuesApr(calcName), instanceName)
        var result = aprCalculatorLogic(readInputValuesApr(calcName));
        setvaluesApr(result, calcName)
    }

}
function loanOrgFraction(data, instanceName) {
    var loanAmtFraction = parseInt(data.loanAmount * 25) / 100
    var loanOriginationSlider = $('[data-name="loanOriginationCharges"]').data('ionRangeSlider');
    setTimeout(function () {
        try {
            if (instanceName !== "loanOriginationCharges") {
                loanOriginationSlider.update({
                    max: loanAmtFraction,
                    from: resultInput,
                    extra_classes: 'no-transition'
                });
            }
            var resultInput = loanOriginationSlider.result.from;
            var commaResultFrom = resultInput.toLocaleString('en-IN');
            $('[data-name="loanOriginationCharges"]')[0].dataset.from = resultInput
            $('[data-name="loanOriginationCharges"]').parents('.calculator-details').find('[data-jsname="apr-loan-origination-charges"]').val(commaResultFrom);
            $('[data-name="loanOriginationCharges"]')[0].dataset.max = loanAmtFraction
            var spanMax = $("<span></span>").text('₹' + Number(loanAmtFraction).toLocaleString("EN-IN"));
            var customRangeLable = $('[data-name="loanOriginationCharges"]').closest('.custom-range-slider-wrap').find('.custom-range-label').find('span')[1];
            $(customRangeLable).empty().append(spanMax);
        } catch (e) { console.log(e) }
    }, 300);
}

function readInputValuesApr(calcName) {
    fieldNames = document.querySelectorAll('[data-calc-name=' + calcName + '] [data-fieldname]');
    inputData = {}
    fieldNames.forEach(function (fieldName) {
        inputData[fieldName.getAttribute('data-name')] = Number(fieldName.value.replace(/,/g, ""));
    })
    return inputData;
}


function setvaluesApr(res, calcName) {
    var calculatePrice = document.querySelector('[data-calc-name=' + calcName + '] .calculate-price h4');
    calculatePrice.innerText = Math.round(res * 100) / 100 + "%"
}


function aprCalculatorLogic(data) {
    var LoanAmount = parseInt(data.loanAmount);
    var loanOriginationCharges = parseInt(data.loanOriginationCharges)  // it includes the PF, AMC & legal & tech costs in the calculator
    var rateOfInterest = parseFloat(data.rateOfInterest / 100);
    var tenure = parseInt(data.tenure);
    var insurancePremium = 0;
    var grossLoanAmount = LoanAmount + insurancePremium;
    var rateI = rateOfInterest / 12;
    var getPMT = parseFloat(calculatePMT(rateI, tenure, -grossLoanAmount, 0, 0).toFixed(2));
    var netLoanAmount = grossLoanAmount - loanOriginationCharges;
    var annualPercentageRate = Rate(tenure, -getPMT, netLoanAmount) * 12 * 100;
    //$('#apr-output').html(annualPercentageRate)
    return annualPercentageRate;
}


/****** pmt function [START]  ******/
function calculatePMT(rate_per_period, number_of_payments, present_value, future_value, type) {
    future_value = typeof future_value !== 'undefined' ? future_value : 0;
    type = typeof type !== 'undefined' ? type : 0;
    if (rate_per_period != 0.0) {
        // Interest rate exists       
        var q = Math.pow(1 + rate_per_period, number_of_payments);
        return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));
    } else if (number_of_payments != 0.0) {
        // No interest rate, but number of payments exists       
        return -(future_value + present_value) / number_of_payments;
    }
    return 0;
}
/****** pmt function [END]  ******/


/****** rate function [START]     ********/
function Rate(nper, pmt, pv, fv, type, guess) {
    // Sets default values for missing parameters
    fv = typeof fv !== 'undefined' ? fv : 0;
    type = typeof type !== 'undefined' ? type : 0;
    guess = typeof guess !== 'undefined' ? guess : 0.1;

    // Sets the limits for possible guesses to any
    // number between 0% and 100%
    var lowLimit = 0;
    var highLimit = 1;

    // Defines a tolerance of up to +/- 0.00005% of pmt, to accept
    // the solution as valid.
    var tolerance = Math.abs(0.00000005 * pmt);

    // Tries at most 40 times to find a solution within the tolerance.
    for (var i = 0; i < 40; i++) {

        // Resets the balance to the original pv.
        var balance = pv;

        // Calculates the balance at the end of the loan, based
        // on loan conditions.
        for (var j = 0; j < nper; j++) {
            if (type == 0) {

                // Interests applied before payment
                balance = balance * (1 + guess) + pmt;
            } else {

                // Payments applied before insterests
                balance = (balance + pmt) * (1 + guess);
            }
        }

        // Returns the guess if balance is within tolerance.  If not, adjusts
        // the limits and starts with a new guess.
        if (Math.abs(balance + fv) < tolerance) {

            return guess;
        } else if (balance + fv > 0) {

            // Sets a new highLimit knowing that
            // the current guess was too big.
            highLimit = guess;
        } else {

            // Sets a new lowLimit knowing that
            // the current guess was too small.
            lowLimit = guess;
        }


        // Calculates the new guess.
        guess = (highLimit + lowLimit) / 2;
    }

    return guess

    // Returns null if no acceptable result was found after 40 tries.
    //return guess;
}
/****** rate function [END]     ********/