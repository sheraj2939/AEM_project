
// (function (_global) {
//     var companyListBizCallFn = (function (jsHelper) {
var companyListBizObj = {}
try{
var plEliRenderApi = function () {
    var plEligibilityFieldnames = document.querySelectorAll('[data-calc-name="calculator-personal-loan-eligibility-calculator"] [data-fieldname]');
    plEligibilityFieldnames.forEach(function (fieldName) {
        
        if (fieldName.dataset.fieldname == "monthly-income") {
            fieldName.dataset.min = 20000;
            fieldName.dataset.max = 500000;
            fieldName.dataset.from = 100000;
            fieldName.dataset.name = "monthlyInc";
            var spanMin = $("<span></span>").text('₹ 20,000');
            var spanMax = $("<span></span>").text('₹ 5,00,000');
            $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

        }
        if (fieldName.dataset.fieldname == "monthly-expenses") {
            fieldName.dataset.min = 0;
            fieldName.dataset.max = 500000;
            fieldName.dataset.from = 50000;
            fieldName.dataset.name = "monthlyExp";
            var spanMin = $("<span></span>").text('₹ 0');
            var spanMax = $("<span></span>").text('₹ 5,00,000');
            $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

        }
        if (fieldName.dataset.fieldname == "tenure") {
            var month7 = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year='calculator-personal-loan-eligibility-calculatorMonth']")
            month7.attr("data-min", 12);
            month7.attr("data-max", 60);
            month7.attr("data-from", 36);
            month7.attr("data-name", "tenure");
            var spanMin = $("<span></span>").text(12 + ' Months');
            var spanMax = $("<span></span>").text(60 + ' Months');
            $(month7).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

            var year7 = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year='calculator-personal-loan-eligibility-calculatorYear']")
            var yearMin = 12 / 12;
            var yearMax = 60 / 12;
            var yearFrom = 36 / 12;
            year7.attr("data-min", yearMin);
            year7.attr("data-max", yearMax);
            year7.attr("data-from", yearFrom);
            year7.attr("data-name", "tenure");
            var span1Min = $("<span></span>").text(yearMin.toFixed(2).replace(/[.,]00$/, "") + ' Year');
            var span1Max = $("<span></span>").text(yearMax.toFixed(2).replace(/[.,]00$/, "") + ' Years');
            $(year7).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(span1Min, span1Max);
        }
    })

    setTimeout(function () {
        initialiseSliders("calculator-personal-loan-eligibility-calculator")
    }, 200)
}
}catch(e){console.log(e)}
$(document).ready(function () {

    plEliRenderApi();
})
var empName;
var plCompanies;
function setPlInput() {
    var filterdCompany = plCompanies.filter(function (companies) {
        return companies["company-name"] == empName;
    });
    return filterdCompany;
}
function renderPlEligibilityCalcResult(calcName) {
    
    var empData = setPlInput();
    var eligibility = readInputValues(calcName);
    eligibility["companyCat"] = empData[0]['final-category'].toLowerCase();
    var eliCalculator = eligibilityCalculator.instance
    var eliCalc = new eliCalculator(eligibility);
    var eli = eliCalc.calculate()
    //var eli = plEligibiltyCalculator.calculate(eligibility);
    setEligibilityValues(eli, calcName);

}
function setEligibilityValues(eligibility, calcName) {
    var eligibilityAmount = document.querySelector('.eligibility-amount-value');
    if (eligibility.finalAmount >= 0) {
        $('.calc-custom').css("display", "block");
        $('.eligible-custom').text("You are eligible for a Personal Loan upto");
        eligibilityAmount.innerText = '₹' + Math.round(eligibility.finalAmount).toLocaleString("en-IN") + '*';
        var congoSpan = $("<span></span>").text("Congratulations!");
        $('.congratulations-block').empty().append(congoSpan);
    }
    else {
        $('.calc-custom').css("display", "none");
        var congoSpan = $("<span></span>").text("Sorry!");
        $('.congratulations-block').empty().append(congoSpan);
        $('.eligible-custom').text("You are not eligible for a personal loan");

    }


}
// $(document).ready(function () {
$("[data-searchInput]").on('keyup', function () {
    var name = $(this).val().toLowerCase();
    
    if (name.length >= 3) {
        getPlEliApi(name);
    }
    else if(name.length == 0){
        $('.plEligibility-employee-name').empty().append('<a href="javascript:void(0)" style="pointer-events: none"><b>No Company Found</b></a> ');
    }
    else {
        $('.plEligibility-employee-name').empty().append('<a href="javascript:void(0)" style="pointer-events: none"><b>Please enter more than 3 letters</b></a> ');

    }

});
function getPlEliApi(name) {
    var reqObj = { "header": {}, "body": { "companyName": name } };
    companyListFilterObj.companyList(reqObj).then(
        function (response) {
            
            if (response.status == "SUCCESS") {
                $('.plEligibility-employee-name').empty()
                plCompanies = response.response.responseJson.body.queryResponse;
                response.response.responseJson.body.queryResponse.forEach(function (element) {
                    $('.plEligibility-employee-name').append('<li> <a href="javascript:void(0)">' + element["company-name"] + '</a> </li>');
                })
                $('.plEligibility-employee-name li a').click(function (e) {
                    // pl eligibility calc filter applied analytics START
                    try {
                        var appliedFilter = e.currentTarget.innerText.trim();
                        var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('.calculator-heading').innerText.trim();
                        var aa_productCode = '';
                        if(document.querySelector('.page-header .component-title h1') !== null){
                            var componentName = 'Eligibility Calculator'
                            aa_productCode = productCodeId
                        } else {
                            var componentName = getParentElement(e.currentTarget, 23).querySelector('.js-loanDropdown').innerText.trim() + ' Homepage Calculator';
                            var product = getParentElement(e.currentTarget, 23).querySelector('.js-loanDropdown') ? getParentElement(e.currentTarget, 23).querySelector('.js-loanDropdown').innerText.trim() : '';
                            
                            product.split(' ').forEach(function (prod) {
                                aa_productCode += prod.slice(0, 1);
                            });
                        }
                        filterApplied(ctaTitle, appliedFilter, componentName, aa_productCode);
                    } catch (error) {
                        console.log('element not found', error);
                    }
                    // pl eligibility calc filter applied analytics END
                    var $parent = $(this).parents('.js-searchDropdownWrap');
                    $parent.find('.plEligibility-employee-name a').removeClass('active');
                    $(this).addClass('active');
                    var selectedVal = $(this).text();
                    $parent.find('.dropdown-heading').text(selectedVal);
                    $parent.find('.dropdown-heading').removeClass('active');
                    $parent.find('.dropdownmenu').removeClass('show');
                    $("[data-search]").val('');
                    $(this).parents('[data-search]').find("li").show();
                    if ($(this).closest('.calculator-content-wrap').data('calcName')?.includes('calculator-personal-loan-eligibility-calculator')) {
                        empName = $(this).text();
                        renderPlEligibilityCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
                    }
                });

            }
        }).catch(function (error) { }); return jsHelper.freezeObj(companyListBizObj);
}
        // })
//     })(jsHelper); _global.jsHelper.defineReadOnlyObjProp(_global, "companyListBizObj", companyListBizCallFn);
// })(this || window || {});

