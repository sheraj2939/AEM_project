function renderPrePayCalcResult(calcName, instanceName) {
    if (calcName == 'calculator-personal-loan-prepay-calc') {
        partPaymentMinMax(readInputValues(calcName), instanceName)
        // console.log("prepayment input ",prepayInputs)
        var prePay = prepaymentCalculator.calculate(readInputValues(calcName));
        setPrePayValues(prePay, calcName)
    }
    else if (calcName == 'calculator-business-loan-prepay-calc') {
        var prePay = blPrepaymentCalculator.calculate(readInputValues(calcName));
        setPrePayValues(prePay, calcName)
    }
}
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
function CUMPRINC(rate, periods, value, start, end, type) {
    // Credits: algorithm inspired by Apache OpenOffice    
    // Credits: Hannes Stiebitzhofer for the translations of function and variable names    
    // Requires getFutureValue() and getPartialPayment() from Formula.js [http://stoic.com/formula/]   
    // Evaluate rate and periods (TODO: replace with secure expression evaluator)    
    rate = eval(rate);
    periods = eval(periods);
    // Return error if either rate, periods, or value are lower than or equal to zero    
    if (rate <= 0 || periods <= 0 || value <= 0) return '#NUM!';
    // Return error if start < 1, end < 1, or start > end    
    if (start < 1 || end < 1 || start > end) return '#NUM!';
    // Return error if type is neither 0 nor 1    
    if (type !== 0 && type !== 1) return '#NUM!';
    // Compute cumulative principal    
    var payment = calculatePMT(rate, periods, value, 0, type);
    var principal = 0;
    if (start === 1) {
        if (type === 0) {
            principal = payment + value * rate;
        } else {
            principal = payment;
        }
        start++;
    }
    for (var i = start; i <= end; i++) {
        if (type > 0) {
            principal += payment - (getFutureValue(rate, i - 2, payment, value, 1) - payment) * rate;
        } else {
            principal += payment - getFutureValue(rate, i - 1, payment, value, 0) * rate;
        }
    }
    // Return cumulative principal    
    return principal;
}
function getFutureValue(rate, nper, pmt, pv, type) {
    var pow = Math.pow(1 + rate, nper),
        fv;
    pv = pv || 0;
    type = type || 0;
    if (rate) {
        fv = (pmt * (1 + rate * type) * (1 - pow) / rate) - pv * pow;
    } else {
        fv = -1 * (pv + pmt * nper);
    }
    return fv;
}

function partPaymentMinMax(prepay, instanceName) {
    // debugger;/
    var annualInterestrate = prepay.rateOfInterest;
    var loanDuration = prepay.tenure;
    var loanAmount = prepay.loanAmount;
    var paymentMonthPar = prepay.partPaymentMonth;
    var interest = (annualInterestrate / 100) / 12;
    var Tenure = loanDuration;
    var getResult = calculatePMT(interest, Tenure, -loanAmount, 0, 0);
    var getMinResult = Math.floor(getResult);
    var getCump = CUMPRINC(interest, Tenure, loanAmount, (paymentMonthPar + 1), Tenure, 1);
    var getMixResult = Math.ceil(Math.abs(getCump * 0.25));
    var midPartPaymentValue = (parseInt(getMinResult) + parseInt(getMixResult)) / 2;

    var $perprepaymentpartamount = $('[data-name="partPaymentAmount"]');
    var spanMin = $("<span></span>").text('₹' + parseInt(getMinResult).toLocaleString("EN-IN"));
    var spanMax = $("<span></span>").text('₹' + parseInt(getMixResult).toLocaleString("EN-IN"));
    $($perprepaymentpartamount).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
    // $perprepaymentpartamount.parents('.calculator-details-bottom').find('.calculator-details-values .min').html('<i class="icon-indian-rupee rupee-icon"></i>' + parseInt(getMinResult).toLocaleString("en-IN") + ' ');
    // $perprepaymentpartamount.parents('.calculator-details-bottom').find('.calculator-details-values .init').html('<i class="icon-indian-rupee rupee-icon"></i>'+parseInt(midPartPaymentValue).toLocaleString("en-IN") + ' ');
    // $perprepaymentpartamount.parents('.calculator-details-bottom').find('.calculator-details-values .max').html('<i class="icon-indian-rupee rupee-icon"></i>'+parseInt(getMixResult).toLocaleString("en-IN") + ' ');
    var $perprepaymentpart = $('[data-name="partPaymentAmount"]').data('ionRangeSlider');
    setTimeout(function () {
        try {
            //  $perprepaymentpart.reset();
            if (instanceName !== "partPaymentAmount") {
                $perprepaymentpart.update({
                    min: getMinResult,
                    max: getMixResult,
                    from: resultInput,
                    extra_classes: 'no-transition'
                });
            }

            var resultInput = $perprepaymentpart.result.from;
            var commaResultFrom = resultInput.toLocaleString('en-IN');
            // $('[data-name="partPaymentAmount"]').data('min', getMinResult);
            // $('[data-name="partPaymentAmount"]').data('max', getMixResult);
            // $('[data-name="partPaymentAmount"]').data('from', resultInput);

            $('[data-name="partPaymentAmount"]')[0].dataset.min = getMinResult
            $('[data-name="partPaymentAmount"]')[0].dataset.max = getMixResult
            $('[data-name="partPaymentAmount"]')[0].dataset.from = resultInput

            $('[data-name="partPaymentAmount"]').parents('.calculator-details').find('[data-jsname="prepay-charges"]').val(commaResultFrom);

        } catch(e) {console.log(e) }
    }, 300);
}
function setPrePayValues(prePay, calcName) {
    if (prePay.revisedEMI < 0) {
        var revisedEmi = document.querySelector('[data-calc-name=' + calcName + '] .revised-emi-value');
        revisedEmi.innerText = '₹ 0 *';
    }
    else {
        var revisedEmi = document.querySelector('[data-calc-name=' + calcName + '] .revised-emi-value');
        revisedEmi.innerText = '₹' + Math.round(prePay.revisedEMI).toLocaleString("EN-IN") + '*';
    }
    if (prePay.revisedTenure < 0) {
        var revisedTenure = document.querySelector('[data-calc-name=' + calcName + '] .revised-tenure-value');
        revisedTenure.innerText = '0 Months';
    }
    else {
        var revisedTenure = document.querySelector('[data-calc-name=' + calcName + '] .revised-tenure-value');
        revisedTenure.innerText = prePay.revisedTenure.toLocaleString("EN-IN") + ' Months';
    }
    if (prePay.totalAmountPayable < 0) {
        var totalPayment = document.querySelector('[data-calc-name=' + calcName + '] .total-payment-value');
        totalPayment.innerText = '₹ 0 *';
    }
    else {
        var totalPayment = document.querySelector('[data-calc-name=' + calcName + '] .total-payment-value');
        totalPayment.innerText = '₹' + Math.round(prePay.totalAmountPayable).toLocaleString("EN-IN") + '*';
    }
    if (prePay.remainingPrinciple < 0) {

        var remainingPrincipal = document.querySelector('[data-calc-name=' + calcName + '] .remaing-principal-value');
        remainingPrincipal.innerText = '₹ 0 *';
    }
    else {

        var remainingPrincipal = document.querySelector('[data-calc-name=' + calcName + '] .remaing-principal-value');
        remainingPrincipal.innerText = '₹' + Math.round(prePay.remainingPrinciple).toLocaleString("EN-IN") + '*';
    }
}