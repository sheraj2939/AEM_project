function renderBannerCalcResult(calcName) {
    // debugger;
    var emi = emiCalculator.calculate(readBannerInputValues(calcName));
    console.log(emi);
    setBannerCalcValues(emi, calcName)
}

function setBannerCalcValues(emi, calcName) {
    try {
        if (!isNaN(emi.emiPerMonth)) {
            var calculatePrice = document.querySelector('[data-calc-name=' + calcName + '] [data-field="bannerMonthlyEMI"]');
            calculatePrice.value = emi.emiPerMonth.toLocaleString("EN-IN");
        }
        else {
            var calculatePrice = document.querySelector('[data-calc-name=' + calcName + '] [data-field="bannerMonthlyEMI"]');
            calculatePrice.value = 0;
        }
    } catch(e) {console.log(e);}

}
function readBannerInputValues(calcName) {
    // debugger;
    fieldNames = document.querySelectorAll('[data-calc-name=' + calcName + '] [data-fieldname]');
    inputData = {}
    fieldNames.forEach(function(fieldName)  {
        if (fieldName.hasAttribute('data-month-or-year')) {
            // console.log("MONTH OR YEAR",$(fieldName.closest('.month-year-wrapper').children('.js_col_months')))
            if (fieldName.getAttribute('data-name') == "tenure" || fieldName.getAttribute('data-name') == "requestedTenor" || fieldName.getAttribute('data-name') == "pmayTenure" || fieldName.getAttribute('data-name') == "partPaymentMonth" || fieldName.getAttribute('data-name') == "N" || fieldName.getAttribute('data-name') == "foreclosureMonth") {
                // console.log(monthOrYear)
                var monthOrYear = $(fieldName).parents('.banner-month-year-wrap').find('.banner-year-month-item').find('a[class="banner-year-month-btn-squared active"]').text().trim() === "Mo" ? "months" : "years";
                console.log("inside read input ", monthOrYear)
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
    console.log(monthOrYear, inputData);
    return inputData;
}

$('[yearMonth-tab-menu]').click(function (e) {
    try {
        e.preventDefault();
        var tabMenu = $(this).attr('yearMonth-tab-menu');
        $(this).parents('[yearMonth-tab-wrapper]').find('[yearMonth-tab-menu]').removeClass('active');
        $(this).addClass('active');
        $(this).parents('[yearMonth-tab-wrapper]').find('[yearMonth-tab-contnet]').addClass('d-none');
        $(this).parents('[yearMonth-tab-wrapper]').find('[yearMonth-tab-contnet="' + tabMenu + '"]').removeClass('d-none');
        if ($(this).parents(".banner-calc-custom").data('calc-name').includes('banner')) {
            renderBannerCalcResult("pl-banner-calc");
        }
    } catch(e) {console.log(e);}
})
var bannerCalcUrl = window.osgiConfigObj.calcApiDomain+"/web/api/mdm/export/minmaxmaster.json?calculator-label=calculator-personal-loan-emi-calc";
function bannerCalcApiCall(url) {
    var promise = new Promise(function(resolve)  {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                data = this.response;
                var myArray = JSON.parse(data);
                resolve(myArray);
            }
        }

        xhr.open("GET", url, true);
        xhr.send();
    })
    return promise
}

$(document).ready(function () {
    try {
        bannerCalcApiCall(bannerCalcUrl).then(function (res) {
            res.Master.forEach(function (element) {
                fieldNames = document.querySelectorAll('[data-calc-name="pl-banner-calc"] [data-fieldname]');
                fieldNames.forEach(function (fieldName) {
                    /* ============== EMI CALCULATORS ================= */
                    if (fieldName.dataset.field == "loanAmount") {
                        // debugger;
                        fieldName.value = Number(element['field1initial']).toLocaleString("en-IN");
                        fieldName.min = element['field1-min'].toLocaleString("en-IN");
                        fieldName.max = element['field1-max'].toLocaleString("en-IN");
                        fieldName.dataset.name = "loanAmount";
                        // $('.price-with-comma').trigger('keyup');


                    }
                    if (fieldName.dataset.field == "tenure") {
                        // console.log($(fieldName).closest('.banner-month-year-wrap'))
                        var month = $(fieldName).closest('[yearMonth-tab-wrapper]').find("[data-month-or-year='pl-banner-calcMonth']");
                        month.attr("value", Number(element['field2initial']).toLocaleString("en-IN"));
                        month.attr("data-name", "tenure");
                        month.attr("min", Number(element['field2-min']).toLocaleString("en-IN"));
                        month.attr("max", Number(element['field2-max']).toLocaleString("en-IN"));
                        // console.log(month)
                        var year = $(fieldName).closest('[yearMonth-tab-wrapper]').find("[data-month-or-year='pl-banner-calcYear']")
                        year.attr("value", Number(element['field2initial']) / 12);
                        year.attr("min", Number(element['field2-min']) / 12);
                        year.attr("max", Number(element['field2-max']) / 12);
                        year.attr("data-name", "tenure");
                        // console.log(year)
                    }
                    if (fieldName.dataset.field == "rateOfInterest") {
                        fieldName.min = element['field3-min'].toLocaleString("en-IN");
                        fieldName.max = element['field3-max'].toLocaleString("en-IN");
                        fieldName.value = element['field3initial'].toLocaleString("en-IN");
                        fieldName.dataset.name = "rateOfInterest";
                    }
                    /* ============== EMI CALCULATORS ================= */
                })
            })
            renderBannerCalcResult("pl-banner-calc");
        })
    }
    catch (e) { console.log(e);}
    $('.only-numeric-decimal-js-input-banner').on("input", function (e) {
        var regex = /^\d+(\.\d+)?$/g
        if (regex.test(e.target.value)) {
            let fixedDigits = e.target.value.length <= 4 ? e.target.value : Math.trunc(Number(e.target.value) * 100) / 100
            $(this).val(fixedDigits);
        } else {
            if (e.target.value.split('.').length !== 2) {
                var newStr = e.target.value.slice(0, -1)
                // let fixedDigits = e.target.value.length <= 4 ? e.target.value : Number(e.target.value).toFixed(2)
                $(this).val(newStr);
            }
            else {
                var charReg = /[a-zA-Z\`\%\$]/g
                if (charReg.test(e.target.value)) {
                    $(this).val(e.target.value.slice(0, -1))
                } else {
                    let fixedDigits = e.target.value.length <= 4 ? e.target.value : Math.trunc(Number(e.target.value) * 100) / 100
                    $(this).val(fixedDigits);
                }
            }
        }
        renderBannerCalcResult("pl-banner-calc");

    });
        var value = '';
        var localizeIn = "en-IN";
    function localizeNumberValue(value, localizeIn) {
        var localizedValue = "";
        var parsedValue = value.replaceAll(",", "");
        if (parsedValue || value === "") {
            localizedValue = Number(parsedValue) ? Number(parsedValue).toLocaleString(localizeIn) : parsedValue;
        }
        return localizedValue;
    }
    $('.disable-emoji').bind('input', function () {
        // console.log('df')
        var val = $(this).val();
        var emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
        val = val.replace(emojiRegex, '')
        $(this).val(val);
    });
    var smartInput = $('.price-with-comma-js-input-banner')
    smartInput.on('input', function (e) {
        var charReg = /[a-zA-Z\`\%\$]/g;
        var onlyNumberReg = /^[0-9,]*$/g
        if (charReg.test(e.target.value) || !onlyNumberReg.test(e.target.value)) {
            $(this).val(e.target.value.slice(0, -1))
        } else {
            $(this).val(e.target.value);
        }
    })
    smartInput.on('input', function (event) {
        $this = $(this);

        var position = $(this)[0].selectionStart;
        var defaultValue = event.target.value;
        var value = localizeNumberValue(event.target.value);
        // value = value.replace(/,/g, "");

        var x = value.replace(/,/g, "");
        //$(this).dataset.value = value;
        if (Number(x)) {
            $(this).val(value)
            if (event.target.value.length === position) {
                $(this)[0].setSelectionRange(position, position);
                $(this)[0].focus();
            } else {
                if (defaultValue.length < value.length) {
                    $(this)[0].setSelectionRange(position + 1, position + 1);
                    $(this)[0].focus();
                } else if (defaultValue.length > value.length) {
                    if (position == 0) {
                        $(this)[0].setSelectionRange(position, position);
                    } else {
                        $(this)[0].setSelectionRange(position - 1, position - 1);
                    }
                    $(this)[0].focus();
                } else {
                    $(this)[0].setSelectionRange(position, position);
                    $(this)[0].focus();
                }
            }
        }
        renderBannerCalcResult("pl-banner-calc");

    })
    $('.only-numeric-input-banner').on("input", function (e) {
        // $(this).val($(this).val().replace(/[^\d-]/g, ''));
        var regex = /^\d+(\.\d+)?$/g
        if (regex.test(e.target.value)) {
            var fixedDigits = e.target.value.length <= 4 ? e.target.value : Math.trunc(Number(e.target.value)*100)/100
            $(this).val(fixedDigits);
        } else {
            if (e.target.value.split('.').length !== 2) {
                var newStr = e.target.value.slice(0, -1)
                // let fixedDigits = e.target.value.length <= 4 ? e.target.value : Number(e.target.value).toFixed(2)
                $(this).val(newStr);
            }
            else {
                var charReg = /[a-zA-Z\`\%\$]/g
                if (charReg.test(e.target.value)) {
                    $(this).val(e.target.value.slice(0, -1))
                } else {
                    var fixedDigits = e.target.value.length <= 4 ? e.target.value : Math.trunc(Number(e.target.value)*100)/100
                    $(this).val(fixedDigits);
                }
            }
        }
        renderBannerCalcResult("pl-banner-calc");
    })
    $(".js-showCalulatorRangeValue-banner").on("blur", (function (event) {
        // debugger;
        $this = $(this);
        var x = $this.val();
        x = x.replace(/,/g, "");
        var maxVal = $this.attr('max');
        var minVal = $this.attr('min');
        // console.log(x,minVal,maxVal,$this)
        // debugger;
        if (Number(x) >= Number(maxVal)) {
            $this.val(Number(maxVal).toLocaleString('en-IN'));
        } else if (Number(x) <= Number(minVal)) {
            $this.val(Number(minVal).toLocaleString('en-IN'));
        } else {
            $this.val(Number(x).toLocaleString('en-IN'));
        }
        renderBannerCalcResult("pl-banner-calc");

    }))
    $(".banner-input-text-calc").on("paste", function () {
        $this = $(this);
        var x = $this.val().replace(/[^a-zA-Z0-9, ]/gm, '');
        $this.val(x.replace(/./g, ''));
    })
})