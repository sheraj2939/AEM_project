function getIRR() {
    var tenureYear = document.querySelector('input[data-type="years"]').value;
    var initialAmount = document.querySelector('#initialAmount').value;
    var expectedAmount = document.querySelector('#expectedAmount').value;
    var irrJson = {};
    irrJson["tenureYear"] = Number(tenureYear);
    irrJson["investmentAmount"] = Number(initialAmount.replace(/,/g, ''));
    irrJson["expectedAmount"] = Number(expectedAmount.replace(/,/g, ''));
    document.getElementById('irrVal').innerHTML = calculateIRR(irrJson) + '%';
};

function calculateIRR(data) {
    var IRRval = [];
    IRRval.push(-data.investmentAmount);
    for (i = 0; i < data.tenureYear; i++) {
        if (i == (data.tenureYear - 1)) {
            data.expectedAmount += data.investmentAmount;
        }
        IRRval.push(data.expectedAmount);
    }
    var irr = IRR(IRRval, 0.01).toFixed(2);
    console.log(irr);
    return irr
}

function IRR(values, guess) {
    var irrResult = function (values, dates, rate) {
        var r = rate + 1;
        var result = values[0];
        for (var i = 1; i < values.length; i++) {
            result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
        }
        return result;
    };
    // Calculates the first derivation
    var irrResultDeriv = function (values, dates, rate) {
        var r = rate + 1;
        var result = 0;
        for (var i = 1; i < values.length; i++) {
            var frac = (dates[i] - dates[0]) / 365;
            result -= (frac * values[i]) / Math.pow(r, frac + 1);
        }
        return result;
    };
    
    // Initialize dates and check that values contains at least one positive value and one negative value
    var dates = [];
    var positive = false;
    var negative = false;
    for (var i = 0; i < values.length; i++) {
        dates[i] = i === 0 ? 0 : dates[i - 1] + 365;
        if (values[i] > 0) positive = true;
        if (values[i] < 0) negative = true;
    }
    // Return error if values does not contain at least one positive value and one negative value
    if (!positive || !negative) return "#NUM!";
    // Initialize guess and resultRate
    var guess = typeof guess === "undefined" ? 0.1 : guess;
    var resultRate = guess;
    // Set maximum epsilon for end of iteration
    var epsMax = 1e-10;
    // Set maximum number of iterations
    var iterMax = 50;
    // Implement Newton's method
    var newRate, epsRate, resultValue;
    var iteration = 0;
    var contLoop = true;
    do {
        resultValue = irrResult(values, dates, resultRate);
        newRate =
            resultRate -
            resultValue / irrResultDeriv(values, dates, resultRate);
        epsRate = Math.abs(newRate - resultRate);
        resultRate = newRate;
        contLoop = epsRate > epsMax && Math.abs(resultValue) > epsMax;
    } while (contLoop && ++iteration < iterMax);
    if (contLoop) return "#NUM!";
    // Return internal rate of return
    return resultRate * 100;
}