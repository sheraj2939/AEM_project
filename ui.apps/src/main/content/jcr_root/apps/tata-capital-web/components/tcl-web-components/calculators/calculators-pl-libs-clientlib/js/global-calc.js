var highChartRender;
var renderApiCall;
var month = false;
var monthlyPrice = document.createElement("h4");
var amountPayableTip = document.createElement("h3");
var amountPayableTap = document.createElement("h3");
var calcDiv = document.querySelectorAll('.calculator-content-wrap');
var calcNames = [];
calcDiv.forEach(function (ele) {
    calcNames.push(ele.getAttribute('data-calc-name'))
})
var fieldNames;
var calcType = "Wholesaler";
var monthOrYear = "years";

function readInputValues(calcName) {
    // debugger;
    if (calcName == 'calculator-business-loan-gst-calculator') {
        fieldNames = document.querySelectorAll('[data-calc-name=' + calcName + '] .' + calcType + ' [data-fieldname]');
        // console.log(fieldNames)
    }
    else {
        fieldNames = document.querySelectorAll('[data-calc-name=' + calcName + '] [data-fieldname]');
    }
    inputData = {}
    fieldNames.forEach(function(fieldName)  {
        if (fieldName.hasAttribute('data-month-or-year')) {
            // console.log("MONTH OR YEAR",$(fieldName.closest('.month-year-wrapper').children('.js_col_months')))
            if (fieldName.getAttribute('data-name') == "tenure" || fieldName.getAttribute('data-name') == "requestedTenor" || fieldName.getAttribute('data-name') == "pmayTenure" || fieldName.getAttribute('data-name') == "partPaymentMonth" || fieldName.getAttribute('data-name') == "N" || fieldName.getAttribute('data-name') == "foreclosureMonth") {
                // console.log(monthOrYear)
                var monthOrYear = $(fieldName).parents('.month-year-wrapper').find('.year-month-item').find('a[class="year-month-btn-squared active"]').text().trim() === "Mo" ? "months" : "years";
                if (monthOrYear == "months") {
                    inputData[fieldName.getAttribute('data-fieldname')] = Number($(fieldName).parents('[yearMonth-tab-wrapper]').find("[data-month-or-year=" + calcName + "Month]").val().replace(/,/g, ""));
                }
                else {
                    inputData[fieldName.getAttribute('data-fieldname')] = Number($(fieldName).parents('[yearMonth-tab-wrapper]').find("[data-month-or-year=" + calcName + "Year]").val().replace(/,/g, "")) * 12

                }
            }
        }
        else {
            // console.log(fieldName.value)
            inputData[fieldName.getAttribute('data-name')] = Number(fieldName.value.replace(/,/g, ""));
        }

    })
    return inputData;
}

function emiApiCall(calcName) {
    
    if (calcName == 'calculator-business-loan-gst-calculator') {
        fieldNames = document.querySelectorAll('[data-calc-name=' + calcName + '] .' + calcType + ' [data-fieldname]');
        // console.log(fieldNames)
    }
    else {
        fieldNames = document.querySelectorAll('[data-calc-name=' + calcName + '] [data-fieldname]');
    }
    var url = window.osgiConfigObj.calcApiDomain + "/web/api/mdm/export/minmaxmaster.json?calculator-label=" + calcName;
    var promise = new Promise(function (resolve) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                data = this.response;
                var obj = JSON.parse(data);
                resolve(obj);
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    })


    return promise;
};

$(document).ready(function () {
    monthOrYear = "years";
    renderApiCall = function (e) {
        
        for (calc of calcNames) {
            if (calc == "calculator-personal-loan-eligibility-calculator") {
                //return;
                plEliRenderApi()
            }
            else if (calc == "calculator-stamp-duty") {
                //return;
            }
            else {
                emiApiCall(calc).then(function (res) {
                    
                    res.Master.forEach(function (element) {
                        fieldNames = document.querySelectorAll('[data-calc-name=' + element['calculator-label'] + '] [data-fieldname]');

                        fieldNames.forEach(function (fieldName) {
                            //    console.log(element['calculator-label'])
                            // console.log($(fieldName).parents(".calculator-content-wrap").data('calc-name'),element['calculator-label'],fieldName)
                            /* ============== EMI CALCULATORS ================= */
                            if (fieldName.dataset.fieldname == "loanAmount") {
                                fieldName.dataset.min = element['field1-min'];
                                fieldName.dataset.max = element['field1-max'];
                                fieldName.dataset.from = element['field1initial'];
                                fieldName.dataset.name = "loanAmount";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field1-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field1-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

                            }
                            if (fieldName.dataset.fieldname == "tenure") {
                                var month = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year=" + element['calculator-label'] + "Month]")
                                month.attr("data-min", Number(element['field2-min']));
                                month.attr("data-max", Number(element['field2-max']));
                                month.attr("data-from", Number(element['field2initial']));
                                month.attr("data-name", "tenure");
                                var spanMin = $("<span></span>").text(Number(element['field2-min']) + ' Months');
                                var spanMax = $("<span></span>").text(Number(element['field2-max']) + ' Months');
                                $(month).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

                                var year = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year=" + element['calculator-label'] + "Year]")
                                year.attr("data-min", Number(element['field2-min']) / 12);
                                year.attr("data-max", Number(element['field2-max']) / 12);
                                year.attr("data-from", Number(element['field2initial']) / 12);
                                year.attr("data-name", "tenure");
                                var yearMin = Number(element['field2-min']) / 12
                                var yearMax = Number(element['field2-max']) / 12
                                if (yearMin <= 1) {
                                    var span1Min = $("<span></span>").text(yearMin.toFixed(0).replace(/[.,]00$/, "") + ' Year');
                                }
                                else {
                                    var span1Min = $("<span></span>").text(yearMin.toFixed(2).replace(/[.,]00$/, "") + ' Years');

                                }
                                var span1Max = $("<span></span>").text(yearMax.toFixed(2).replace(/[.,]00$/, "") + ' Years');
                                $(year).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(span1Min, span1Max);
                            }
                            if (fieldName.dataset.fieldname == "rateOfInterest") {
                                fieldName.dataset.min = element['field3-min'];
                                fieldName.dataset.max = element['field3-max'];
                                fieldName.dataset.from = element['field3initial'];
                                fieldName.dataset.name = "rateOfInterest";
                                var spanMin = $("<span></span>").text(Number(element['field3-min']) + '% p.a');
                                var spanMax = $("<span></span>").text(Number(element['field3-max']) + '% p.a');
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            /* ============== EMI CALCULATORS ================= */

                            /* ============== GST CALCULATORS ================= */

                            if (fieldName.dataset.fieldname == "gst-cog-amt") {
                                fieldName.dataset.min = element['field1-min'];
                                fieldName.dataset.max = element['field1-max'];
                                fieldName.dataset.from = element['field1initial'];
                                fieldName.dataset.name = "netPrice";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field1-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field1-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

                            }
                            if (fieldName.dataset.fieldname == "gst-cog-profit") {
                                fieldName.dataset.min = element['field2-min'];
                                fieldName.dataset.max = element['field2-max'];
                                fieldName.dataset.from = element['field2initial'];
                                fieldName.dataset.name = "profitRatio";
                                var spanMin = $("<span></span>").text(Number(element['field2-min']) + '% p.a');
                                var spanMax = $("<span></span>").text(Number(element['field2-max']) + '% p.a');
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

                            }
                            if (fieldName.dataset.fieldname == "gst-cog-percent") {
                                fieldName.dataset.min = element['field3-min'];
                                fieldName.dataset.max = element['field3-max'];
                                fieldName.dataset.from = element['field3initial'];
                                fieldName.dataset.name = "GSTRate";
                                var spanMin = $("<span></span>").text(Number(element['field3-min']) + '% p.a');
                                var spanMax = $("<span></span>").text(Number(element['field3-max']) + '% p.a');
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);


                            }
                            if (fieldName.dataset.fieldname == "gst-w-price-amt") {
                                fieldName.dataset.min = element['field4-min'];
                                fieldName.dataset.max = element['field4-max'];
                                fieldName.dataset.from = element['field4intial'];
                                fieldName.dataset.name = "netPrice";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field4-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field4-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            if (fieldName.dataset.fieldname == "gst-w-percent") {
                                fieldName.dataset.min = element['field5-min'];
                                fieldName.dataset.max = element['field5-max'];
                                fieldName.dataset.from = element['field5intial'];
                                fieldName.dataset.name = "GSTRate";

                                var spanMin = $("<span></span>").text(Number(element['field5-min']) + '% p.a');
                                var spanMax = $("<span></span>").text(Number(element['field5-max']) + '% p.a');
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            if (fieldName.dataset.fieldname == "gst-cop-amt") {
                                fieldName.dataset.min = element['field6-min'];
                                fieldName.dataset.max = element['field6-max'];
                                fieldName.dataset.from = element['field6intial'];
                                fieldName.dataset.name = "netPrice";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field6-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field6-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

                            }
                            if (fieldName.dataset.fieldname == "gst-cop-profit") {
                                fieldName.dataset.min = element['field7-min'];
                                fieldName.dataset.max = element['field7-max'];
                                fieldName.dataset.from = element['field7intial'];
                                fieldName.dataset.name = "profitRatio";
                                var spanMin = $("<span></span>").text(Number(element['field7-min']) + '% p.a');
                                var spanMax = $("<span></span>").text(Number(element['field7-max']) + '% p.a');
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

                            }
                            if (fieldName.dataset.fieldname == "gst-cop-percent") {
                                fieldName.dataset.min = element['field8-min'];
                                fieldName.dataset.max = element['field8-max'];
                                fieldName.dataset.from = element['field8intial'];
                                fieldName.dataset.name = "GSTRate";
                                var spanMin = $("<span></span>").text(Number(element['field8-min']) + '% p.a');
                                var spanMax = $("<span></span>").text(Number(element['field8-max']) + '% p.a');
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            /* ============== GST CALCULATORS ================= */

                            /* ============== prepayment CALCULATORS ================= */

                            if (fieldName.dataset.fieldname == "prepay-loan-amt") {
                                fieldName.dataset.min = element['field1-min'];
                                fieldName.dataset.max = element['field1-max'];
                                fieldName.dataset.from = element['field1initial'];
                                fieldName.dataset.name = "loanAmount";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field1-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field1-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            //    tenor-prepay
                            if (fieldName.dataset.fieldname == "prepay-interest-rate") {
                                fieldName.dataset.min = element['field3-min'];
                                fieldName.dataset.max = element['field3-max'];
                                fieldName.dataset.from = element['field3initial'];
                                fieldName.dataset.name = "rateOfInterest";
                                var spanMin = $("<span></span>").text(Number(element['field3-min']) + '% p.a');
                                var spanMax = $("<span></span>").text(Number(element['field3-max']) + '% p.a');
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            if (fieldName.dataset.fieldname == "partPaymentMonth") {
                                // console.log($(fieldName).parent().parent().parent())
                                var month2 = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year=" + element['calculator-label'] + "Month]")
                                month2.attr("data-min", Number(element['field4-min']));
                                month2.attr("data-max", Number(element['field4-max']));
                                month2.attr("data-from", Number(element['field4intial']));
                                month2.attr("data-name", "partPaymentMonth");
                                var spanMin = $("<span></span>").text(Number(element['field4-min']) + ' Months');
                                var spanMax = $("<span></span>").text(Number(element['field4-max']) + ' Months');
                                $(month2).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

                                var year2 = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year=" + element['calculator-label'] + "Year]")
                                year2.attr("data-min", Number(element['field4-min']) / 12);
                                year2.attr("data-max", Number(element['field4-max']) / 12);
                                year2.attr("data-from", Number(element['field4intial']) / 12);
                                year2.attr("data-name", "partPaymentMonth");
                                var yearMin = Number(element['field4-min']) / 12
                                var yearMax = Number(element['field4-max']) / 12
                                if (yearMin <= 1) {
                                    var span1Min = $("<span></span>").text(yearMin.toFixed(0).replace(/[.,]00$/, "") + ' Year');
                                }
                                else {
                                    var span1Min = $("<span></span>").text(yearMin.toFixed(2).replace(/[.,]00$/, "") + ' Years');
                                }
                                var span1Max = $("<span></span>").text(parseFloat(yearMax.toFixed(2)) + ' Years');
                                $(year2).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(span1Min, span1Max);
                            }
                            if (fieldName.dataset.fieldname == "prepay-charges") {
                                fieldName.dataset.min = element['field5-min'];
                                fieldName.dataset.max = element['field5-max'];
                                fieldName.dataset.from = element['field5intial'];
                                fieldName.dataset.name = "partPaymentAmount";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field5-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field5-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            /* ============== prepayment CALCULATORS ================= */
                            /* ============== HL Eligibility CALCULATOR ================= */
                            if (fieldName.dataset.fieldname == "net-income") {
                                fieldName.dataset.min = element['field1-min'];
                                fieldName.dataset.max = element['field1-max'];
                                fieldName.dataset.from = element['field1initial'];
                                fieldName.dataset.name = "netIncome";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field1-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field1-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            if (fieldName.dataset.fieldname == "monthly-obligations") {
                                fieldName.dataset.min = element['field2-min'];
                                fieldName.dataset.max = element['field2-max'];
                                fieldName.dataset.from = element['field2initial'];
                                fieldName.dataset.name = "monthlyObligation";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field2-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field2-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            if (fieldName.dataset.fieldname == "roi-apr") {
                                fieldName.dataset.min = element['field3-min'];
                                fieldName.dataset.max = element['field3-max'];
                                fieldName.dataset.from = element['field3initial'];
                                fieldName.dataset.name = "APR";
                                var spanMin = $("<span></span>").text(Number(element['field3-min']) + '% p.a');
                                var spanMax = $("<span></span>").text(Number(element['field3-max']) + '% p.a');
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            if (fieldName.dataset.fieldname == "N") {
                                // console.log($(fieldName).parent().parent().parent().find("[data-month-or-year="+element['calculator-label']+"Month]"))
                                var month3 = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year=" + element['calculator-label'] + "Month]")
                                month3.attr("data-min", Number(element['field4-min']));
                                month3.attr("data-max", Number(element['field4-max']));
                                month3.attr("data-from", Number(element['field4intial']));
                                month3.attr("data-name", "N");
                                var spanMin = $("<span></span>").text(Number(element['field4-min']) + ' Months');
                                var spanMax = $("<span></span>").text(Number(element['field4-max']) + ' Months');
                                $(month3).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

                                var year3 = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year=" + element['calculator-label'] + "Year]")
                                year3.attr("data-min", Number(element['field4-min']) / 12);
                                year3.attr("data-max", Number(element['field4-max']) / 12);
                                year3.attr("data-from", Number(element['field4intial']) / 12);
                                year3.attr("data-name", "N");
                                var yearMin = Number(element['field4-min']) / 12
                                var yearMax = Number(element['field4-max']) / 12
                                if (yearMin <= 1) {
                                    var span1Min = $("<span></span>").text(yearMin.toFixed(0).replace(/[.,]00$/, "") + ' Year');
                                }
                                else {
                                    var span1Min = $("<span></span>").text(yearMin.toFixed(2).replace(/[.,]00$/, "") + ' Years');

                                }
                                var span1Max = $("<span></span>").text(yearMax.toFixed(2).replace(/[.,]00$/, "") + ' Years');
                                $(year3).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(span1Min, span1Max);
                            }
                            /* ============== HL Eligibility CALCULATOR ================= */
                            /* ============== ForeClosure CALCULATOR ================= */
                            // fore-loan-amt
                            // tenor
                            // fore-interest-rate
                            if (fieldName.dataset.fieldname == "foreclosureMonth") {
                                // console.log($(fieldName).parent().parent().parent().find("[data-month-or-year="+element['calculator-label']+"Month]"))
                                var month4 = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year=" + element['calculator-label'] + "Month]")
                                month4.attr("data-min", Number(element['field4-min']));
                                month4.attr("data-max", Number(element['field4-max']));
                                month4.attr("data-from", Number(element['field4intial']));
                                month4.attr("data-name", "foreclosureMonth");
                                var spanMin = $("<span></span>").text(Number(element['field4-min']) + ' Months');
                                var spanMax = $("<span></span>").text(Number(element['field4-max']) + ' Months');
                                $(month4).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

                                var year4 = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year=" + element['calculator-label'] + "Year]")
                                year4.attr("data-min", Number(element['field4-min']) / 12);
                                year4.attr("data-max", Number(element['field4-max']) / 12);
                                year4.attr("data-from", Number(element['field4intial']) / 12);
                                year4.attr("data-name", "foreclosureMonth");
                                var yearMin = Number(element['field4-min']) / 12
                                var yearMax = Number(element['field4-max']) / 12
                                if (yearMin <= 1) {
                                    var span1Min = $("<span></span>").text(yearMin.toFixed(0).replace(/[.,]00$/, "") + ' Year');
                                }
                                else {
                                    var span1Min = $("<span></span>").text(yearMin.toFixed(2).replace(/[.,]00$/, "") + ' Years');
                                }
                                var span1Max = $("<span></span>").text(yearMax.toFixed(2).replace(/[.,]00$/, "") + ' Years');
                                $(year4).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(span1Min, span1Max);
                            }
                            if (fieldName.dataset.fieldname == "foreclosure-charges") {
                                fieldName.dataset.min = element['field5-min'];
                                fieldName.dataset.max = element['field5-max'];
                                fieldName.dataset.from = element['field5intial'];
                                fieldName.dataset.name = "foreclosureCharges";
                                var spanMin = $("<span></span>").text(Number(element['field5-min']) + '% p.a');
                                var spanMax = $("<span></span>").text(Number(element['field5-max']) + '% p.a');
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            /* ============== ForeClosure CALCULATOR ================= */
                            /* ============== HL PMAY CALCULATOR ================= */

                            if (fieldName.dataset.fieldname == "income-amount") {
                                fieldName.dataset.min = element['field1-min'];
                                fieldName.dataset.max = element['field1-max'];
                                fieldName.dataset.from = element['field1initial'];
                                fieldName.dataset.name = "annualFamilyIncome";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field1-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field1-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            if (fieldName.dataset.fieldname == "loan-amount") {
                                fieldName.dataset.min = element['field2-min'];
                                fieldName.dataset.max = element['field2-max'];
                                fieldName.dataset.from = element['field2initial'];
                                fieldName.dataset.name = "inputLoanAmount";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field2-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field2-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            if (fieldName.dataset.fieldname == "pmayTenure") {
                                var month5 = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year=" + element['calculator-label'] + "Month]")
                                month5.attr("data-min", Number(element['field3-min']));
                                month5.attr("data-max", Number(element['field3-max']));
                                month5.attr("data-from", Number(element['field3initial']));
                                month5.attr("data-name", "pmayTenure");
                                var spanMin = $("<span></span>").text(Number(element['field3-min']) + ' Months');
                                var spanMax = $("<span></span>").text(Number(element['field3-max']) + ' Months');
                                $(month5).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

                                var year5 = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year=" + element['calculator-label'] + "Year]")
                                year5.attr("data-min", Number(element['field3-min']) / 12);
                                year5.attr("data-max", Number(element['field3-max']) / 12);
                                year5.attr("data-from", Number(element['field3initial']) / 12);
                                year5.attr("data-name", "pmayTenure");
                                var yearMin = Number(element['field3-min']) / 12
                                var yearMax = Number(element['field3-max']) / 12
                                if (yearMin <= 1) {
                                    var span1Min = $("<span></span>").text(yearMin.toFixed(0).replace(/[.,]00$/, "") + ' Year');
                                }
                                else {
                                    var span1Min = $("<span></span>").text(yearMin.toFixed(2).replace(/[.,]00$/, "") + ' Years');

                                }
                                var span1Max = $("<span></span>").text(yearMax.toFixed(2).replace(/[.,]00$/, "") + ' Years');
                                $(year5).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(span1Min, span1Max);
                            }

                            /* ============== HL PMAY CALCULATOR ================= */
                            /* ============== TOP UPCALCULATOR ================= */
                            if (fieldName.dataset.fieldname == "requested-loan-amount") {
                                fieldName.dataset.min = element['field1-min'];
                                fieldName.dataset.max = element['field1-max'];
                                fieldName.dataset.from = element['field1initial'];
                                fieldName.dataset.name = "requestedLoanAmt";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field1-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field1-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

                            }
                            if (fieldName.dataset.fieldname == "bt-net-salary-amt") {
                                fieldName.dataset.min = element['field2-min'];
                                fieldName.dataset.max = element['field2-max'];
                                fieldName.dataset.from = element['field2initial'];
                                fieldName.dataset.name = "netMonthlySalary";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field2-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field2-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

                            }
                            if (fieldName.dataset.fieldname == "requestedTenor") {
                                var month6 = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year=" + element['calculator-label'] + "Month]")
                                month6.attr("data-min", Number(element['field3-min']));
                                month6.attr("data-max", Number(element['field3-max']));
                                month6.attr("data-from", Number(element['field3initial']));
                                month6.attr("data-name", "requestedTenor");
                                var spanMin = $("<span></span>").text(Number(element['field3-min']) + ' Months');
                                var spanMax = $("<span></span>").text(Number(element['field3-max']) + ' Months');
                                $(month6).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);

                                var year6 = $(fieldName).parent().parent().parent().parent().find("[data-month-or-year=" + element['calculator-label'] + "Year]")
                                year6.attr("data-min", Number(element['field3-min']) / 12);
                                year6.attr("data-max", Number(element['field3-max']) / 12);
                                year6.attr("data-from", Number(element['field3initial']) / 12);
                                year6.attr("data-name", "requestedTenor");
                                var yearMin = Number(element['field3-min']) / 12
                                var yearMax = Number(element['field3-max']) / 12
                                if (yearMin <= 1) {
                                    var span1Min = $("<span></span>").text(yearMin.toFixed(0).replace(/[.,]00$/, "") + ' Year');
                                }
                                else {
                                    var span1Min = $("<span></span>").text(yearMin.toFixed(2).replace(/[.,]00$/, "") + ' Years');

                                }
                                var span1Max = $("<span></span>").text(yearMax.toFixed(2).replace(/[.,]00$/, "") + ' Years');
                                $(year6).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(span1Min, span1Max);
                            }
                            if (fieldName.dataset.fieldname == "bt-obligation-amt") {
                                fieldName.dataset.min = element['field4-min'];
                                fieldName.dataset.max = element['field4-max'];
                                fieldName.dataset.from = element['field4intial'];
                                fieldName.dataset.name = "currentMonthlyObligations";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field4-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field4-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            if (fieldName.dataset.fieldname == "bt-property-amt") {
                                fieldName.dataset.min = element['field5-min'];
                                fieldName.dataset.max = element['field5-max'];
                                fieldName.dataset.from = element['field5intial'];
                                fieldName.dataset.name = "costOfProperty";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field5-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field5-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            if (fieldName.dataset.fieldname == "bt-outstanding-amt") {
                                fieldName.dataset.min = element['field6-min'];
                                fieldName.dataset.max = element['field6-max'];
                                fieldName.dataset.from = element['field6intial'];
                                fieldName.dataset.name = "principalOutstanding";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field6-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field6-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            if (fieldName.dataset.fieldname == "bt-external-amt") {
                                fieldName.dataset.min = element['field7-min'];
                                fieldName.dataset.max = element['field7-max'];
                                fieldName.dataset.from = element['field7intial'];
                                fieldName.dataset.name = "externalBtEmi";
                                var spanMin = $("<span></span>").text('₹' + Number(element['field7-min']).toLocaleString("EN-IN"));
                                var spanMax = $("<span></span>").text('₹' + Number(element['field7-max']).toLocaleString("EN-IN"));
                                $(fieldName).closest('.custom-range-slider-wrap').find('.custom-range-label').empty().append(spanMin, spanMax);
                            }
                            /* ============== TOP UPCALCULATOR ================= */
                            /* ============== PL ELIGIBLITY ================= */

                        })

                        initialiseSliders(element['calculator-label'])
                    });
                    // renderAreaCalculator();
                    // if (e.target.text === 'Eligibility Calculator') plEliRenderApi();
                })
            }

        }
    }
    renderApiCall()
}
)


function initialiseSliders(calcName) {
    // debugger;

    $('[data-calc-name=' + calcName + '] .js-calculatorRangeSlider').ionRangeSlider({
        skin: "round",
        postfix: "%",
        prettify_enabled: true,
        prettify_separator: ",",
        onStart: function (data) {
            rangeSliderSet(data)
        },
        onChange: function (data) {
            rangeSliderSet(data)
        },
    });
    function rangeSliderSet(data) {
        commaSeparatedValue = data.from.toLocaleString("en-IN");
        data.input.parents(".calculator-details").find(".js-showCalulatorRangeValue").val(commaSeparatedValue);
        // monthOryear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("years") ? "months" : "";
        // debugger;
        // monthOryear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("years") ? "months" : "";
        try {
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('microfinance')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : "months";
                }
                renderMicrofianceCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));
            }
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('emi')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : "months";
                }
                renderEmiCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));

            }
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('calculator-stamp-duty')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : "months";
                }
                renderStampDutyCalcResult();

            }
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('topup')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : "months";
                }
                renderTopUpCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));
            }
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('gst')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : "months";
                }
                renderGstCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));
            }
            // console.log(data.input.parents(".calculator-content-wrap").data('calc-name'));
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('prepay')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : "months";
                }
                renderPrePayCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'),data.input[0].dataset.name);
            }
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('hl-eligibility')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : "months";
                }
                renderHlEligibilityCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));
            }
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('foreclosure')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : "months";
                }
                renderForeclosureCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));
            }
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('pmay')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : "months";
                }
                renderPmayCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'))
            }
            // debugger;
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes("calculator-personal-loan-eligibility-calculator")) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : "months";
                }
                renderPlEligibilityCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}
/*
function initialiseSliders(calcName) {
    // debugger;
    $('[data-calc-name=' + calcName + '] .js-calculatorRangeSlider').ionRangeSlider({
        skin: "round",
        postfix: "%",
        prettify_enabled: true,
        prettify_separator: ",",
        onStart: function (data) {
            rangeSliderSet(data)
        },
        onChange: function (data) {
            rangeSliderSet(data)
        },
    });
    function rangeSliderSet(data) {
        commaSeparatedValue = data.from.toLocaleString("en-IN");
        data.input.parents(".calculator-details").find(".js-showCalulatorRangeValue").val(commaSeparatedValue);
        // monthOryear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("years") ? "months" : "";
        // debugger;
        // monthOryear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("years") ? "months" : "";
        try {
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('emi')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id")?.includes("months") ? "years" : "months";
                }
                renderEmiCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));

            }
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('calculator-stamp-duty')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id")?.includes("months") ? "years" : "months";
                }
                renderStampDutyCalcResult();

            }
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('topup')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id")?.includes("months") ? "years" : "months";
                }
                renderTopUpCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));
            }
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('gst')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id")?.includes("months") ? "years" : "months";
                }
                renderGstCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));
            }
            // console.log(data.input.parents(".calculator-content-wrap").data('calc-name'));
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('prepay')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id")?.includes("months") ? "years" : "months";
                }
                renderPrePayCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));
            }
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('hl-eligibility')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id")?.includes("months") ? "years" : "months";
                }
                renderHlEligibilityCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));
            }
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('foreclosure')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id")?.includes("months") ? "years" : "months";
                }
                renderForeclosureCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));
            }
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('pmay')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id")?.includes("months") ? "years" : "months";
                }
                renderPmayCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'))
            }
            // debugger;
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes('microfinance')) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id")?.includes("months") ? "years" : "months";
                }
                renderMicrofianceCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));
            }
            if (data.input.parents(".calculator-content-wrap").data('calc-name').includes("calculator-personal-loan-eligibility-calculator")) {
                if (data.input.hasAttr('data-month-or-year')) {
                    monthOrYear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id")?.includes("months") ? "years" : "months";
                }
                renderPlEligibilityCalcResult(data.input.parents(".calculator-content-wrap").data('calc-name'));
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}
*/