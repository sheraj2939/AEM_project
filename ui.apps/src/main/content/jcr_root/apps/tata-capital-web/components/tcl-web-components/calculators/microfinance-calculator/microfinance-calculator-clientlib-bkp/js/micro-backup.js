var microProduct = "pragati";
var tenureValue;
var repaymentValue;
var roiValue;
var productVlaue = {
    'pragati': { 'min': 5000, 'max': 75000, 'from': 10000, 'roi': 25.49 },
    'vyapar': { 'min': 25000, 'max': 75000, 'from': 35000, 'roi': 26 },
    'vyapar-vriddhi': { 'min': 50000, 'max': 200000, 'from': 60000, 'roi': 26 },
    'tatkal': { 'min': 5000, 'max': 15000, 'from': 10000, 'roi': 24 }
}

function renderMicrofianceCalcResult(calcName) {
    try {
        initializeMicrofinaceSlider(microProduct);

        var values = readInputValues(calcName);
        var microFinanceObj = {
            loanAmount: values.loanAmount,
            roi: roiValue,
            tenure: tenureValue,
            repaymentOption: repaymentValue.toLowerCase(),
        }
        var result = microFinanceCalculator.calculate(microFinanceObj);
        setMicofinanceCalcValues(result, calcName);
    }
    catch(e) {console.log(e) }
}
function setMicofinanceCalcValues(result, calcName) {
    var calculatedInstallments = document.querySelector('[data-calc-name=' + calcName + '] .installments');
    calculatedInstallments.innerText = result.EMIInstallment;

    var emiAmount = document.querySelector('[data-calc-name=' + calcName + '] .emi-amount');
    emiAmount.innerText = '₹' + result.result.toLocaleString("EN-IN") + '*';
}
$(document).ready(function () {
    try {
        for (i in productVlaue) {
            var pName = i.replace(/-/g, " ")
            $('.microfinance-companies').append('<li> <a href="javascript:void(0)">' + pName.replace(/\b\w/g, function (l) { return l.toUpperCase() }) + '</a> </li>');
            if ($('.microfinance-companies li a').text().toLowerCase() == microProduct) {
                console.log($('.microfinance-companies li a').attr("class", "active"))
            }
        }
        initializeMicrofinaceSlider(microProduct);
        if ($(".js-calculatorRangeSlider").is(":visible")) {
            $(".js-calculatorRangeSlider").ionRangeSlider({
                skin: "round",
                postfix: "%",
                prettify_enabled: true,
                prettify_separator: ",",
                onStart: rangeSliderSet,
                onChange: rangeSliderSet,
            });
            function rangeSliderSet(data) {
                commaSeparatedValue = data.from.toLocaleString("en-IN");
                data.input.parents(".calculator-details").find(".js-showCalulatorRangeValue").val(commaSeparatedValue);
                renderMicrofianceCalcResult("calculator-microfinance-loan-emi-calc");

            }
        }
        $('[data-list] li a').click(function () {
            var $parent = $(this).parents('.js-searchDropdownWrap');
            $parent.find('[data-list] a').removeClass('active');
            $(this).addClass('active');
            var selectedVal = $(this).text();
            $parent.find('.dropdown-heading').text(selectedVal);
            $parent.find('.dropdown-heading').removeClass('active');
            $parent.find('.dropdownmenu').removeClass('show');
            $("[data-search]").val('');
            $(this).parents('[data-search]').find("li").show();

            microProduct = $(this).text();
            if (microProduct.toLowerCase() != "tatkal") {
                var element = document.querySelectorAll('.microfinance-checkbox-button.button.tenure');
                if (element.length > 3) {
                    var firstChild = element[0];
                    var secondChild = element[1];
                    firstChild.remove();
                    secondChild.remove();
                }
                setRadioButton();
            } else {
                var element = '<li class="microfinance-checkbox-button button tenure"><div class="checkbox-btn-wrap"><input type="radio" name="tenure" value="6" data-input="microfinance"><a type="button" class="btn-checkbox">6</a></div></li>' +
                    '<li class="microfinance-checkbox-button button tenure"><div class="checkbox-btn-wrap"><input type="radio" name="tenure" value="9" data-input="microfinance"><a type="button" class="btn-checkbox">9</a></div></li>'
                $('.month-tenure').prepend(element)
                setRadioButton();
            }
            $('input[name="tenure"]').change(function () {
                tenureValue = $('input[name="tenure"]:checked').val();
                repaymentValue = $('input[name="repayment"]:checked').val();
                if (repaymentValue.toLowerCase() == "weekly") {
                    // console.log(tenureValue)
                    tenureValue = Number(tenureValue) / 12;
                }
                else {
                    tenureValue = tenureValue;
                }
                renderMicrofianceCalcResult("calculator-microfinance-loan-emi-calc");
            });
            $('[data-calc-name="calculator-microfinance-loan-emi-calc"] .js-calculatorRangeSlider').data("ionRangeSlider").reset();
            for (i in productVlaue) {
                if (i.toLowerCase().replace(/-/g, " ").replace(/ /g, '') == microProduct.toLowerCase().replace(/ /g, '')) {
                    $('[data-calc-name="calculator-microfinance-loan-emi-calc"] .js-calculatorRangeSlider').val(productVlaue[i].from);
                    commaSeparatedValue = productVlaue[i].from.toLocaleString("en-IN");
                    $("[data-calc-name='calculator-microfinance-loan-emi-calc'] .calculator-details").find(".js-showCalulatorRangeValue").val(commaSeparatedValue);
                    var rangeSlider = $(".js-calculatorRangeSlider").data("ionRangeSlider")
                    rangeSlider.update({
                        min: productVlaue[i].min,
                        max: productVlaue[i].max,
                        from: productVlaue[i].from,
                    })
                }
            }
            $('input[name=tenure]').prop('checked', false);
            $('input[name=repayment]').prop('checked', false);
            if ($(".js-calculatorRangeSlider").is(":visible")) {
                $(".js-calculatorRangeSlider").ionRangeSlider({
                    skin: "round",
                    postfix: "%",
                    prettify_enabled: true,
                    prettify_separator: ",",
                    onStart: rangeSliderSet,
                    onChange: rangeSliderSet,
                });
                function rangeSliderSet(data) {
                    commaSeparatedValue = data.from.toLocaleString("en-IN");
                    data.input.parents(".calculator-details").find(".js-showCalulatorRangeValue").val(commaSeparatedValue);
                    renderMicrofianceCalcResult("calculator-microfinance-loan-emi-calc");

                }
            }
            renderMicrofianceCalcResult("calculator-microfinance-loan-emi-calc");

        })
    } catch(e) { console.log(e)}

})
function initializeMicrofinaceSlider(value) {
    try {
        var fieldName = document.querySelector('[data-calc-name="calculator-microfinance-loan-emi-calc"] [data-fieldname="m-loanAmount"]')
        for (i in productVlaue) {
            if (i.toLowerCase().replace(/-/g, " ").replace(/ /g, '') == value.toLowerCase().replace(/ /g, '')) {
                fieldName.dataset.min = productVlaue[i].min;
                fieldName.dataset.max = productVlaue[i].max;
                fieldName.dataset.from = productVlaue[i].from;
                fieldName.dataset.name = "loanAmount";
                roiValue = productVlaue[i].roi;

                var mSpanMin = $("<span></span>").text('₹' + Number(productVlaue[i].min).toLocaleString("EN-IN"));
                var mSpanMax = $("<span></span>").text('₹' + Number(productVlaue[i].max).toLocaleString("EN-IN"));
                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(mSpanMin, mSpanMax);
            }
        }
        setRadioButton();
    } catch(e){console.log(e) }

}

function setRadioButton() {
    var $radioTenure = $('input[name="tenure"]');
    if (!$radioTenure.filter(':checked').length) {
        $radioTenure[0].checked = true;
        tenureValue = $radioTenure[0].value
    }
    var $radioRepayment = $('input[name="repayment"]');
    if (!$radioRepayment.filter(':checked').length) {
        $radioRepayment[0].checked = true;
        repaymentValue = $radioRepayment[0].value;
    }
}
$('input[name="tenure"]').change(function () {
    tenureValue = $('input[name="tenure"]:checked').val();
    repaymentValue = $('input[name="repayment"]:checked').val();
    if (repaymentValue.toLowerCase() == "weekly") {
        // console.log(tenureValue)
        tenureValue = Number(tenureValue) / 12;
    }
    else {
        tenureValue = tenureValue;
    }
    renderMicrofianceCalcResult("calculator-microfinance-loan-emi-calc");
});

$('input[name="repayment"]').on('change', function () {
    tenureValue = $('input[name="tenure"]:checked').val();
    repaymentValue = $('input[name="repayment"]:checked').val();
    $('[data-repayment-option]').html("EMI Amount (" + repaymentValue + ")");
    if (repaymentValue.toLowerCase() == "weekly") {
        // console.log(tenureValue)
        tenureValue = Number(tenureValue) / 12;
    }
    else {
        tenureValue = tenureValue;
    }
    renderMicrofianceCalcResult("calculator-microfinance-loan-emi-calc");



});
// $(".js-showCalulatorRangeValue").on("change", function () {
//     $this = $(this);
//     var parents = $(this).parents(".calculator-details");
//     var slider = parents.find(".custom-range-slider-wrap input");
//     // debugger
//     var my_range = slider.data("ionRangeSlider");
//     var x = $this.val();
//     x = x.replace(/,/g, "");
//     var maxVal = slider.attr('data-max');
//     var minVal =  slider.attr('data-min');
//     if (x >= maxVal) {
//         $this.val(Number(maxVal).toLocaleString('en-IN'));
//     }else if (x <= minVal) {
//         $this.val(Number(minVal).toLocaleString('en-IN'));
//     }else{
//         $this.val(Number(x).toLocaleString('en-IN'))
//     }
//     // console.log(x,maxVal,minVal)
// });

renderMicrofianceCalcResult("calculator-microfinance-loan-emi-calc");
