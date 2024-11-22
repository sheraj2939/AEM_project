var investmentJson = [
    {
        investmentWays: "Equity Mutual Fund",
        amountInvest: "5,00,000",
        expReturns: "12.00",
    },
    {
        investmentWays: "Debt Mutual Fund/Fixed Deposits/NCDs",
        amountInvest: "6,00,000",
        expReturns: "7.00",
    },
    {
        investmentWays: "PMS / Alternate Investments",
        amountInvest: "30,00,000",
        expReturns: "14.00",
    },
    {
        investmentWays: "Fixed Income Instruments (FDs/Bonds/NCDs,etc)",
        amountInvest: "5,00,000",
        expReturns: "6",
    },
    {
        investmentWays: "Gold (Paper/Physical)",
        amountInvest: "1,00,000",
        expReturns: "10",
    },
    {
        investmentWays: "Others",
        amountInvest: "10,00,000",
        expReturns: "8",
    },
];

$(document).ready(function () {
    counter_stepper();
    rate_of_interest();
// years();
    form_clear();
    createInvestmentStruc(investmentJson);
    /*$('#investmentForm .input-textbox').keyup(function () {
        validateInvestmentField($(this));
    });*/

    /*if ($(window).width() > 767) {
        if ($('.investment-table-scroll').length) {
            new SimpleBar($('.investment-table-scroll')[0]);
        }
    }*/
});

function counter_stepper() {
    var ele_len = $('.form-wizard [data-target="step"]').length;
    $('.calculator-pagination .total-val').text(ele_len);
}

function rate_of_interest() {
    $('[data-count="count"]').click(function (ele) {
        var $input = $(this).parents('.range-textbox').find("input");
        var ele_val = +$input.val().replace("%", "");

        var maxValue = $input.data('maxvalue');
        if ($(this).hasClass('plus') && ele_val < maxValue) {
            $input.val(Math.round((ele_val + 0.1) * 10) / 10);
        }
        else if ($(this).hasClass('minus') && ele_val > 1) {
            $input.val(Math.round((ele_val - 0.1) * 10) / 10);
        }

        /*if ($input.val().length > 0) {
            $('.error-msgs').text('');
        }
        else {
            $('.error-msgs').text('Required');
        }*/
    });
}

/* function years() {
    $('[data-years="years"]').click(function (ele) {
        var $input = $(this).parents('[data-text="year"]').find("input");
        var ele_val = +$input.val();
        $input.next('.error-msgs').remove();

        if ($(this).hasClass('plus'))
            $input.val(Math.round((ele_val + 1)));
        else if (ele_val > 1)
            $input.val(Math.round((ele_val - 1))); */

        /*if ($input.val() != '') {
            if ($input.val() > $input.data('maxvalue')) {
                $input.after('<span class="error-msgs" style="left: 8px;">Max ' + $input.data('maxvalue') + ' Year</span>');
            }
            else if ($input.val() < $input.data('minvalue')) {
                $input.after('<span class="error-msgs" style="left: 8px;">At least ' + $input.data('minvalue') + ' Year</span>');
            }
        }
        else {
            $input.after('<span class="error-msgs" style="left: 8px;">Required</span>');
        }*/
   /*  });
} */



function form_clear() {
    $('[data-clear]').click(function (ele) {
        var ele_target = $(this).data('clear');
        var ele_input = $(ele.target).parents('.calculator-forms').find('.input-textbox');
        ele_input.each(function () {
            if ($(this).is(':visible')) {
                $(this).next('.error-msgs').remove();
                $(this).val($(this).data('value'));
            }
        });
    });
}

/*function validateInvestmentField(element, errors) {
    if (!errors)
        errors = [];
    var ele_value = element.val().replace(/,/g, "");
    // var ele_percentage = "At least 1 years";
    var ele_amount = "Greater than 1,000";
    var ele_required = "Required";

    $(element).next('.error-msgs').remove();

    if (element.is(":visible")) {
        if (element.val() != '') {
            $(element).after('<span class="error-msgs"></span>');
            if ($(element).data('type') === 'percentage') {
                var maxvalue = $(element).data('maxvalue');
                var minvalue = $(element).data('minvalue');
                if (ele_value != '') {
                    if (parseInt(ele_value) > maxvalue || parseInt(ele_value) < 1) {
                        $(element).next('.error-msgs').text('Enter value from ' + minvalue + '-' + maxvalue);
                    }
                    errors.push('Enter value from' + minvalue + '-' + maxvalue);
                }
                else {
                    $(element).next('.error-msgs').text('');
                }
            }
            else if ($(element).data('type') === 'year') {
                var maxvalue = $(element).data('maxvalue');
                if (ele_value != '') {
                    if (parseInt(ele_value) > maxvalue) {
                        $(element).next('.error-msgs').css('left', '8px').end().next('.error-msgs').text('Max ' + maxvalue + ' Year');
                    }
                    else if (parseInt(ele_value) < $(element).data('minvalue')) {
                        $(element).next('.error-msgs').css('left', '8px').end().next('.error-msgs').text('At least ' + $(element).data('minvalue') + ' Year');
                    }
                    errors.push(ele_percentage);
                }
                else {
                    $(element).next('.error-msgs').text('');
                }
            }
            else if ($(element).data('type') === 'amount') {

                if (ele_value != '' && parseInt(ele_value) < 1000) {
                    $(element).next('.error-msgs').text(ele_amount);
                    errors.push(ele_amount);
                }
                else {
                    $(element).next('.error-msgs').text('');
                }
            }
        } else {
            $(element).after('<span class="error-msgs">' + ele_required + '</span>');
            if ($(element).data('type') === 'year') {
                $('.error-msgs').css('left', '8px');
            }
            errors.push(ele_required);
        }
    }
    return errors;
}*/

function createInvestmentStruc(structureJson) {
    var total;
    var tableDiv = document.querySelector('div[data-id="investmentStructure"]');
    tableDiv.innerHTML += structureJson
        .map(function (records) {
            return (
                '<div class="las-stock-row">' +
                '<ul>' +
                '  <li class="stock35 left-align">' +
                '     <p>' + records.investmentWays + '</p>' +
                '  </li>' +
                '   <li class="stock20" data-content="Amount">' +
                '       <label class="heading-col">Investment Amount</label>' +
                '       <div class="rupee-symbol width120">' +
                '           <label class="rupee"><i class="icon-rupee"></i></label>' +
                '           <input type="text" class="input-textbox price-only-comma only-numeric-input" data-type="amount" data-amount="' + records.investmentWays + '" maxlength="12" data-value="' + records.amountInvest + '" value="' + records.amountInvest + '" autocomplete="off">' +
                '       </div>' +
                '   </li>' +
                '   <li class="stock25" data-content="Allocation">' +
                '       <label class="heading-col">Investment Allocation</label>' +
                '       <p class="heading14" data-allocation="' + records.investmentWays + '">8.77</p>' +
                '   </li>' +
                '   <li class="stock20" data-content="Expected Return">' +
                '       <label class="heading-col">Expected return on Investment</label>' +
                '       <div class="percentage-symbol width90">' +
                '           <label>%</label>' +
                '           <input  data-type="percentage" type="text" class="input-textbox text-center only-numeric-input" data-rate="' + records.investmentWays + '" data-value="' + records.expReturns + '" value="' + records.expReturns + '" data-maxvalue="13" data-minvalue="1" autocomplete="off" />' +
                '       </div>' +
                '   </li>' +
                '</ul>' +
                '</div>'
            );
        }).join("");

    var inputAmount = document.querySelectorAll("input[data-amount]");
    var valueObj = {};

    inputAmount.forEach(function (each) {
        valueObj[each.getAttribute("data-amount")] = {
            amount: each.value.replace("₹", "").replace(/,/g, ""),
        };

        each.addEventListener("input", function (e) {
            var inputCurrentAmount = document.querySelector(
                'input[data-amount = "' + e.target.getAttribute("data-amount") + '"]'
            ).value;
            valueObj[e.target.getAttribute("data-amount")]["amount"] =
                inputCurrentAmount.replace("₹", "").replace(/,/g, "");

            total = findTotalValue(valueObj);
            findAollocationValue(valueObj, total);
        });
    });
    total = findTotalValue(valueObj);
    findAollocationValue(valueObj, total);
}

function findTotalValue(calculateValues) {
    var total = 0;

    Object.keys(calculateValues).forEach(function (value) {
        var amountValue = Number(calculateValues[value]["amount"]);
        total = total + amountValue;
    });

    return total;
}

function findAollocationValue(valueObj, totalAmount) {
    var allocationSet = document.querySelectorAll("p[data-allocation]");
    allocationSet.forEach(function (each) {
        var allocationField = each.getAttribute("data-allocation");

        Object.keys(valueObj).forEach(function (value) {
            var findValue = value;
            if (findValue === allocationField) {
                var filedAmount = Number(valueObj[value]["amount"]);
                var precentageAmout = totalAmount;
                var allocationValue = filedAmount / precentageAmout;
                filedAmount === 0 && precentageAmout === 0 ? allocationValue = 0 : allocationValue;
                var allocationValuePercent = allocationValue * 100;
                each.innerHTML = allocationValuePercent.toFixed(2);
                valueObj[value]["allocatioRate"] = allocationValuePercent;
            }
        });
    });
    findAvgReturn(valueObj, totalAmount);
}
function findAvgReturn(valueObj, totalAmount) {
    var numberOfYears = document.querySelector('input[data-id="numberOfYears"]');
    var inputRate = document.querySelectorAll("input[data-rate]");

    inputRate.forEach(function (each) {
        valueObj[each.getAttribute("data-rate")]["expectedReturn"] =
            each.value;
        each.addEventListener("input", function (e) {
            valueObj[e.target.getAttribute("data-rate")]["expectedReturn"] =
                each.value;
            findFutureValue(valueObj, totalAmount);
        });
        findFutureValue(valueObj, totalAmount);
    });
}

function findFutureValue(valueObj, totalAmount) {
    var numberOfYears = document.querySelector('input[data-id="numberOfYears"]');
    $(".btn-change").on("click", function () {
        var event = new Event("input", {
            bubbles: true,
            cancelable: true,
        });
        numberOfYears.dispatchEvent(event);
    });
    numberOfYears.addEventListener("input", function () {
        var futureValue = 0;
        Object.keys(valueObj).forEach(function (value) {
            futureValue += Math.round(
                Math.pow(
                    1 + valueObj[value]["expectedReturn"] / 100,
                    numberOfYears.value
                ) * valueObj[value]["amount"]
            );
        });


        var expectedRate =
            RATE(numberOfYears.value, 0, -totalAmount, futureValue, 1, 1) * 100;
        var expectedRatePercent = document.querySelector(
            'span[data-id="expectedRate"]'
        );
        var futureValueSet = document.querySelector('span[data-id="futureValue"]');
        var totalValue = document.querySelector('span[data-id="totalValue"]');
        totalValue.innerHTML = '₹' + parseFloat(totalAmount.toFixed(2)).toLocaleString(
            "en-IN"
        );

        if(futureValue.toString().length < 12){
        futureValueSet.innerHTML = '₹' + parseFloat(
            futureValue.toFixed(2)
        ).toLocaleString("en-IN");
        }
        expectedRatePercent.innerHTML = parseFloat(
            expectedRate.toFixed(2)
        ).toLocaleString("en-IN") + '%'
    });

    var futureValue = 0;
    Object.keys(valueObj).forEach(function (value) {
        futureValue += Math.round(
            Math.pow(
                1 + valueObj[value]["expectedReturn"] / 100,
                numberOfYears.value
            ) * valueObj[value]["amount"]
        );
    });

    var expectedRate =
        RATE(numberOfYears.value, 0, -totalAmount, futureValue, 1, 1) * 100;
    var expectedRatePercent = document.querySelector(
        'span[data-id="expectedRate"]'
    );
    var futureValueSet = document.querySelector('span[data-id="futureValue"]');
    var totalValue = document.querySelector('span[data-id="totalValue"]');
    totalValue.innerHTML = '₹' + parseFloat(totalAmount.toFixed(2)).toLocaleString(
        "en-IN"
    );
if(futureValue.toString().length < 12){
    futureValueSet.innerHTML = '₹' + parseFloat(futureValue.toFixed(2)).toLocaleString(
        "en-IN"
    );
}
    expectedRatePercent.innerHTML = parseFloat(
        expectedRate.toFixed(2)
    ).toLocaleString("en-IN") + '%';
}

function RATE(periods, payment, present, future, type, guess) {
    guess = guess === undefined ? 0.01 : guess;
    future = future === undefined ? 0 : future;
    type = type === undefined ? 0 : type;
    // Set maximum epsilon for end of iteration
    var epsMax = 1e-10;
    // Set maximum number of iterations
    var iterMax = 10;
    // Implement Newton's method
    var y,
        y0,
        y1,
        x0,
        x1 = 0,
        f = 0,
        i = 0;
    var rate = guess;
    if (Math.abs(rate) < epsMax) {
        y =
            present * (1 + periods * rate) +
            payment * (1 + rate * type) * periods +
            future;
    } else {
        f = Math.exp(periods * Math.log(1 + rate));
        y = present * f + payment * (1 / rate + type) * (f - 1) + future;
    }
    y0 = present + payment * periods + future;
    y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
    i = x0 = 0;
    x1 = rate;
    while (Math.abs(y0 - y1) > epsMax && i < iterMax) {
        rate = (y1 * x0 - y0 * x1) / (y1 - y0);
        x0 = x1;
        x1 = rate;
        if (Math.abs(rate) < epsMax) {
            y =
                present * (1 + periods * rate) +
                payment * (1 + rate * type) * periods +
                future;
        } else {
            f = Math.exp(periods * Math.log(1 + rate));
            y = present * f + payment * (1 / rate + type) * (f - 1) + future;
        }
        y0 = y1;
        y1 = y;
        ++i;
    }
    return rate;
}