$(document).ready(function () {
    $('.js-loanDropdownItem').click(function () {
        // debugger;
        $('.js-loanDropdownItem').removeClass('active');
        $(this).addClass('active');
        var selectedLoan = $(this).text();
        var selectedItem = $(this).attr('dropdown-item');
        $('.js-loanDropdown').text(selectedLoan).removeClass('active');
        $(this).parents('[data-loanDropdown]').find('.dropdown-block').removeClass('show');
        $(this).parents('[data-loanDropdown]').find('[data-loanDropdownItem]').addClass('d-none');
        $(this).parents('[data-loanDropdown]').find('[data-loanDropdownItem="' + selectedItem + '"]').removeClass('d-none');
    });
    try {
        $(".js-range-slider").ionRangeSlider({
            skin: "round",
        });
    } catch (e) { console.log(e); }
    var $btnMinus = $('.range-btn-minus');
    var $btnPlus = $('.range-btn-plus');


    $btnMinus.on("click", function () {
        var parents = $(this).parents('.calculator-details');
        var slider = parents.find(".custom-range-slider-wrap input");
        var my_range = slider.data("ionRangeSlider");
        var minVal = slider.data('min');
        var val = my_range.old_from - slider.data('step');
        if (val >= minVal) {
            my_range.update({
                from: val,
                extra_classes: 'no-transition'
            });
            commaSeparatedValue = val.toLocaleString("en-IN");
            parents.find(".js-showCalulatorRangeValue").val(commaSeparatedValue);
        }
    });

    $btnPlus.on("click", function () {
        var parents = $(this).parents('.calculator-details');
        var slider = parents.find(".custom-range-slider-wrap input");
        var my_range = slider.data("ionRangeSlider");
        var maxVal = slider.data('max');
        var val = my_range.old_from + slider.data('step');
        if (val <= maxVal) {
            my_range.update({
                from: val,
                extra_classes: 'no-transition'
            });
            commaSeparatedValue = val.toLocaleString("en-IN");
            parents.find(".js-showCalulatorRangeValue").val(commaSeparatedValue);
        }
    });
    /*$(".input-textbox-calulator").on("input", function () {
        $this = $(this);
        var x = $this.val().replace( /[^a-zA-Z0-9\d.-]/gm, '');
        $this.val(x);
        if($this.length==1 && $this.val()=="."){
            $this.val("");
        }
    })*/
    $(".input-textbox-calulator").on("paste", function () {
        $this = $(this);
        var x = $this.val().replace(/[^a-zA-Z0-9, ]/gm, '');
        $this.val(x.replace(/./g, ''));
    })
    // Range slider start
    // if ($(".js-calculatorRangeSlider").is(":visible")) {
    //     $(".js-calculatorRangeSlider").ionRangeSlider({
    //         skin: "round",
    //         postfix: "%",
    //         prettify_enabled: true,
    //         prettify_separator: ",",
    //         onStart: rangeSliderSet,
    //         onChange: rangeSliderSet,
    //     });
    //     function rangeSliderSet(data) {           
    //         commaSeparatedValue = data.from.toLocaleString("en-IN");
    //         data.input.parents(".calculator-details").find(".js-showCalulatorRangeValue").val(commaSeparatedValue);
    //         renderEmiCalcResult();

    //     }
    // }
    // Range slider end

    // Calulator Input change start
    // $(".js-showCalulatorRangeValue").on("input",function (event) {
    //     try {
    //         if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('emi')) {
    //             // renderStampDutyCalcResult()
    //             renderEmiCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
    //         }
    //         if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('calculator-stamp-duty')) {
    //             renderStampDutyCalcResult()
    //         }
    //         if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('gst')) {
    //             renderGstCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
    //         }
    //         if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('topup')) {
    //             renderTopUpCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
    //         }
    //         // console.log($(this).parents(".calculator-content-wrap").data('calc-name'));
    //         if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('prepay')) {
    //             renderPrePayCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
    //         }
    //         if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('hl-eligibility')) {
    //             renderHlEligibilityCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
    //         }
    //         if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('foreclosure')) {
    //             renderForeclosureCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
    //         }
    //         if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('pmay')) {
    //             renderPmayCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'))
    //         }
    //         if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('microfinance')) {
    //             renderMicrofianceCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'))
    //         }
    //         if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('calculator-personal-loan-eligibility-calculator')) {

    //             renderPlEligibilityCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'))
    //         }
    //         // if($(this).parents(".banner-calc-custom").data('calc-name').includes('banner')){
    //         //     // renderStampDutyCalcResult()
    //         //     renderBannerCalcResult("pl-banner-calc");

    //         // }
    //         // renderStampDutyCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    //     var keycode = (event.keyCode ? event.keyCode : event.which);
    //     if (keycode == '13') {
    //         $(this).trigger('change');
    //     }
    //     // monthOryear = data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : data.input.closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("years") ? "months" : "";
    //     monthOrYear = $(this).closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id")?.includes("months") ? "years" : "months"
    //     // console.log("heyyyyyyyyyy",monthOryear)



    // });
    // numeric input validation


    // numeric input validation
    $('.only-numeric-input').on("input", function (e) {
        $(this).val($(this).val().replace(/[^\d-]/g, ''));
        $this = $(this);
        var parents = $(this).parents(".calculator-details");
        var slider = parents.find(".custom-range-slider-wrap input");
        var my_range = slider.data("ionRangeSlider");
        x = e.target.value
        try {
            my_range.update({
                from: x,
                extra_classes: "no-transition",
            });
        } catch (e) { console.log(e) }
        // if (x >= maxVal || x <= minVal) {
        try {
            /** apr calculator ***/
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('apr-calculator')) {
                renderAprCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
            }
            /** apr calculator ***/
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('microfinance')) {
                renderMicrofianceCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('emi')) {
                // renderStampDutyCalcResult()
                renderEmiCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('calculator-stamp-duty')) {
                renderStampDutyCalcResult()
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('topup')) {
                renderTopUpCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('gst')) {
                renderGstCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('prepay')) {
                renderPrePayCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('hl-eligibility')) {
                renderHlEligibilityCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('foreclosure')) {
                renderForeclosureCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('pmay')) {
                renderPmayCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('calculator-personal-loan-eligibility-calculator')) {
                renderPlEligibilityCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
            }
            if ($this.parents(".banner-calc-custom").data('calc-name').includes('banner')) {
                renderBannerCalcResult("pl-banner-calc");
                // $('.price-with-comma').trigger('change');
            }
            // renderStampDutyCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
        }
        catch (error) {
            // console.log(error)
        }
    });

    // numeric input with decimal allowed validation
    // $('.js-showCalulatorRangeValue.only-numeric-input-with-decimal').on("input", function (e) {
    //     //    debugger
    //     $(this).val(parseFloat($(this).val().replace(/\.{2,}/g, '.')));
    // });

    // $(".js-showCalulatorRangeValue").on("input", function () {
    //     $(this).val($(this).val().replace(/[^\d-]/g, ''));
    // })

    $(".js-showCalulatorRangeValue").on("paste", function () {
        $this = $(this);
        var x = $this.val().replace(/[^a-zA-Z0-9, ]/gm, '');
        $this.val(x);
    })
    // $(".js-showCalulatorRangeValue").on("input", function () {
    //     $this = $(this);
    //     var parents = $(this).parents(".calculator-details");
    //     var slider = parents.find(".custom-range-slider-wrap input");
    //     var my_range = slider.data("ionRangeSlider");

    // })
    // $(".js-showCalulatorRangeValue").on("input", function () {


    //     var x = $this.val();
    //     x = x;
    //     var maxVal = slider.data('max');
    //     var minVal = slider.data('min');
    //     // debugger;
    //     if (x > maxVal || x < minVal || x== "") {
    //         $('.calculated-emi').text('₹0*')
    //     } else {

    //     // console.log(my_range)

    //     // console.log("month or year",$(this).closest('.month-year-wrapper'))
    // }
    // });

    $(".js-showCalulatorRangeValue").on("blur", function () {
        // debugger;
        $this = $(this);
        var parents = $(this).parents(".calculator-details");
        var slider = parents.find(".custom-range-slider-wrap input");
        var my_range = slider.data("ionRangeSlider");

        var x = $this.val();
        x = x.replace(/,/g, "");
        // debugger;
        try {
            var maxVal = my_range.result.max;
            var minVal = my_range.result.min;
            if (x >= maxVal) {
                $this.val(Number(maxVal).toLocaleString('en-IN'));
            } else if (x <= minVal) {
                $this.val(Number(minVal).toLocaleString('en-IN'));
            } else {
                $this.val(Number(x).toLocaleString('en-IN'))
            }
        } catch (e) { console.log(e) };
        // console.log(my_range)


    });
    $(".js-showCalulatorRangeValue").on("change", function () {
        $this = $(this);
        var parents = $(this).parents(".calculator-details");
        var slider = parents.find(".custom-range-slider-wrap input");
        var my_range = slider.data("ionRangeSlider");

        var x = $this.val();
        x = x.replace(/,/g, "");
        try {
            var maxVal = my_range.result.max;
            var minVal = my_range.result.min;
            if (x >= maxVal) {
                $this.val(Number(maxVal).toLocaleString('en-IN'));
            } else if (x <= minVal) {
                $this.val(Number(minVal).toLocaleString('en-IN'));
            } else {
                $this.val(Number(x).toLocaleString('en-IN'))
            }
        } catch (e) { console.log(e) };
        // console.log(my_range)
        setTimeout(function () {
            try {
                my_range.update({
                    from: x,
                    extra_classes: "no-transition",
                });
            } catch (e) { console.log(e) }
            // console.log("helllllllllllllo",$this.parents(".calculator-content-wrap").data('calc-name'))
            try {
                /** apr calculator ***/
                if ($this.parents(".calculator-content-wrap").data('calc-name').includes('apr-calculator')) {
                    renderAprCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
                }
                /** apr calculator ***/
                if ($this.parents(".calculator-content-wrap").data('calc-name').includes('microfinance')) {
                    renderMicrofianceCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
                }
                if ($this.parents(".calculator-content-wrap").data('calc-name').includes('emi')) {
                    // renderStampDutyCalcResult()
                    renderEmiCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
                }
                if ($this.parents(".calculator-content-wrap").data('calc-name').includes('calculator-stamp-duty')) {
                    renderStampDutyCalcResult()
                }
                if ($this.parents(".calculator-content-wrap").data('calc-name').includes('topup')) {
                    renderTopUpCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
                }
                if ($this.parents(".calculator-content-wrap").data('calc-name').includes('gst')) {
                    renderGstCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
                }
                if ($this.parents(".calculator-content-wrap").data('calc-name').includes('prepay')) {
                    renderPrePayCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
                }
                if ($this.parents(".calculator-content-wrap").data('calc-name').includes('hl-eligibility')) {
                    renderHlEligibilityCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
                }
                if ($this.parents(".calculator-content-wrap").data('calc-name').includes('foreclosure')) {
                    renderForeclosureCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
                }
                if ($this.parents(".calculator-content-wrap").data('calc-name').includes('pmay')) {
                    // debugger;
                    renderPmayCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
                }
                if ($this.parents(".calculator-content-wrap").data('calc-name').includes('calculator-personal-loan-eligibility-calculator')) {
                    renderPlEligibilityCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
                }
                // renderStampDutyCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            catch (error) {
                // console.log(error)
            }
        }, 100);
        // monthOryear = $(this).parent().parent().parent().parent().find('.js_col_months.d-none').attr("id").includes("months") ? "months" : $(this).parent().parent().parent().parent().find('.js_col_months.d-none').attr("id").includes("years") ? "years" : "";
        if ($(this).parents('.calculator-details-top').siblings().find('input').hasAttr('data-month-or-year')) {
            monthOrYear = $(this).closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : $(this).closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("years") ? "months" : "";
        }

    });

    // Calulator Input change end
    /*
    $('.price-with-comma').keyup(function () {
        if ($(this).val() != "") {
            var rupeeValue = parseFloat($(this).val().replace(/,/g, ''));
            commaSeparatedValue = rupeeValue.toLocaleString('en-IN');
            $(this).val(commaSeparatedValue);
        }
        // console.log($(this))
    });*/

    var value = "";
    var localizeIn = "en-IN";
    function localizeNumberValue(value, localizeIn) {
        var localizedValue = "";
        var parsedValue = value.replaceAll(",", "");
        if (parsedValue || value === "") {
            localizedValue = Number(parsedValue) ? Number(parsedValue).toLocaleString(localizeIn) : parsedValue;
        }
        return localizedValue;
    }
    var smartInput = $('.price-with-comma-js-input')
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
        var parents = $(this).parents(".calculator-details");
        var slider = parents.find(".custom-range-slider-wrap input");
        var my_range = slider.data("ionRangeSlider");

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
        // setTimeout(function () {
        try {
            my_range.update({
                from: x,
                extra_classes: "no-transition",
            });
            ruralCalcChange();
        } catch (e) { console.log(e) }
        // if (x >= maxVal || x <= minVal) {
        try {
            /** apr calculator ***/
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('apr-calculator')) {
                renderAprCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
            }
            /** apr calculator ***/
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('microfinance')) {
                renderMicrofianceCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('emi')) {
                // renderStampDutyCalcResult()
                renderEmiCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('calculator-stamp-duty')) {
                renderStampDutyCalcResult()
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('topup')) {
                renderTopUpCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('gst')) {
                renderGstCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('prepay')) {
                renderPrePayCalcResult($this.parents(".calculator-content-wrap").data('calc-name'), data.input[0].dataset.name);
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('hl-eligibility')) {
                renderHlEligibilityCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('foreclosure')) {
                renderForeclosureCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('pmay')) {
                renderPmayCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('calculator-personal-loan-eligibility-calculator')) {
                renderPlEligibilityCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
            }
            if ($this.parents(".banner-calc-custom").data('calc-name').includes('banner')) {
                renderBannerCalcResult("pl-banner-calc");
                // $('.price-with-comma').trigger('change');
            }
            // renderStampDutyCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
        }
        catch (error) {
            // console.log(error)
        }
        // }
        // console.log("helllllllllllllo",$this.parents(".calculator-content-wrap").data('calc-name'))

        // }, 100)  ;
        // monthOryear = $(this).parent().parent().parent().parent().find('.js_col_months.d-none').attr("id").includes("months") ? "months" : $(this).parent().parent().parent().parent().find('.js_col_months.d-none').attr("id").includes("years") ? "years" : "";
        if ($(this).parents('.calculator-details-top').siblings().find('input').hasAttr('data-month-or-year')) {
            monthOrYear = $(this).closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "years" : $(this).closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("years") ? "months" : "";
        }
    })
    $('.only-numeric-decimal-js-input').on("input", function (e) {
        var regex = /^\d+(\.\d+)?$/g
        if (regex.test(e.target.value)) {
            var fixedDigits = e.target.value.length <= 4 ? e.target.value : Math.trunc(Number(e.target.value) * 100) / 100
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
                    var fixedDigits = e.target.value.length <= 4 ? e.target.value : Math.trunc(Number(e.target.value) * 100) / 100
                    $(this).val(fixedDigits);
                }
            }
        }
        $this = $(this);
        var parents = $(this).parents(".calculator-details");
        var slider = parents.find(".custom-range-slider-wrap input");
        var my_range = slider.data("ionRangeSlider");
        x = e.target.value
        try {
            my_range.update({
                from: x,
                extra_classes: "no-transition",
            });
        } catch (e) { console.log(e) }
        // if (x >= maxVal || x <= minVal) {
        try {
            /** apr calculator ***/
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('apr-calculator')) {
                renderAprCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
            }
            /** apr calculator ***/
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('microfinance')) {
                renderMicrofianceCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('emi')) {
                // renderStampDutyCalcResult()
                renderEmiCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('calculator-stamp-duty')) {
                renderStampDutyCalcResult()
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('topup')) {
                renderTopUpCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('gst')) {
                renderGstCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('prepay')) {
                renderPrePayCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('hl-eligibility')) {
                renderHlEligibilityCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('foreclosure')) {
                renderForeclosureCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('pmay')) {
                renderPmayCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
            }
            if ($this.parents(".calculator-content-wrap").data('calc-name').includes('calculator-personal-loan-eligibility-calculator')) {
                renderPlEligibilityCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
            }
            if ($this.parents(".banner-calc-custom").data('calc-name').includes('banner')) {
                renderBannerCalcResult("pl-banner-calc");
                // $('.price-with-comma').trigger('change');
            }
            // renderStampDutyCalcResult($this.parents(".calculator-content-wrap").data('calc-name'));
        }
        catch (error) {
            // console.log(error)
        }
    });
    $('[jsname="yearInput"]').on("change", function () {
        var twlEmiYear = $('[data-calc-name="calculator-two-wheeler-loans-emi-calc"] .calculator-details [jsname="yearInput"]');
        if (twlEmiYear.length === 0) {
            $(this).val(Math.round($(this).val()));
        }
    })
    $('[jsname="monthInput"]').on("change", function () {
        $(this).val(Math.round($(this).val()));
    })
    /*
    smartInput.addEventListener("input", (event) => {
        let position = smartInput.selectionStart;
        console.log(position);
        var defaultValue = event.target.value;
        var value = localizeNumberValue(event.target.value);
        // let numberValue = event.target.value.replaceAll(",", "");        // let value = numberWithCommas(event.target.value);        coverAmount = value;
        smartInput.value = value;
        smartInput.dataset.value = value;
        if (event.target.value.length === position) {
          smartInput.setSelectionRange(position, position);
          smartInput.focus();
        } else {
          if (defaultValue.length < value.length) {
            smartInput.setSelectionRange(position + 1, position + 1);
            smartInput.focus();
          } else if (defaultValue.length > value.length) {
            smartInput.setSelectionRange(position - 1, position - 1);
            smartInput.focus();
          } else {
            smartInput.setSelectionRange(position, position);
            smartInput.focus();
          }
        }
        //convert number in to all words eg . 1500 - One Thousand Five Hundred - works for value uptil 99 crores        inputToWords.innerText = numberToWords(value.replaceAll(",", ""));
        //convert number in to all words eg . 1,50,000 - 1.50 Lakh.        // inputToWords.innerText = convertToCurrency(value);   
    })*/

    /* menu tab start */
    $('[yearMonth-tab-menu]').click(function (e) {
        e.preventDefault();
        var tabMenu = $(this).attr('yearMonth-tab-menu');
        $(this).parents('[yearMonth-tab-wrapper]').find('[yearMonth-tab-menu]').removeClass('active');
        $(this).addClass('active');
        $(this).parents('[yearMonth-tab-wrapper]').find('[yearMonth-tab-contnet]').addClass('d-none');
        $(this).parents('[yearMonth-tab-wrapper]').find('[yearMonth-tab-contnet="' + tabMenu + '"]').removeClass('d-none');
        try {
            monthOrYear = $(this).closest('.month-year-wrapper').find('.js_col_months.d-none').attr("id").includes("months") ? "months" : "years";
             /** apr calculator ***/
             if ($this.parents(".calculator-content-wrap").data('calc-name').includes('apr-calculator')) {
                renderAprCalcResult($this.parents(".calculator-content-wrap").data('calc-name'))
            }
            /** apr calculator ***/
        
            if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('microfinance')) {
                renderMicrofianceCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('emi')) {
                // renderStampDutyCalcResult()
                renderEmiCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('calculator-stamp-duty')) {
                renderStampDutyCalcResult()
            }
            if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('topup')) {
                renderTopUpCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('gst')) {
                renderGstCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
            }
            // console.log($(this).parents(".calculator-content-wrap").data('calc-name'));
            if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('prepay')) {
                renderPrePayCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('hl-eligibility')) {
                renderHlEligibilityCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('foreclosure')) {
                renderForeclosureCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('pmay')) {
                renderPmayCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
            }
            if ($(this).parents(".calculator-content-wrap").data('calc-name').includes('calculator-personal-loan-eligibility-calculator')) {
                renderPlEligibilityCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
            }
            // if($(this).parents(".banner-calc-custom").data('calc-name').includes('banner')){
            //     console.log(monthOrYear)
            //     renderBannerCalcResult("pl-banner-calc");
            // }
            // renderStampDutyCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
        }
        catch (error) {
            // console.log(error)
        }

    });
    /* menu tab end */


    /* dropdown search filter start */
    $("[data-searchInput]").on('keyup', function () {
        var value = $(this).val().toLowerCase();
        $(this).parents('[data-search]').find("[data-list] li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    });
    function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    $('[data-list] li a').click(function () {
        // debugger;
        // added  for area convertion calculator 
        try {
            $(this).parents('.js-searchDropdownWrap').find('.dropdown-heading').data('rel').includes("from") ? from = camelize($(this).text()) : $(this).parents('.js-searchDropdownWrap').find('.dropdown-heading').data('rel').includes("to") ? to = camelize($(this).text()) : "";
            // if($(this).closest('.area-conversion-wrap').data('calcName')?.includes('area-convertor-calculator')){
            // debugger;
            areaCalculate()
            // }
            if (from == "" || to == "") {
                $(".inputArea ").attr('disabled', true);
            }
            else {
                $(".inputArea.inputAreaFrom").attr('disabled', false);
            }

        } catch (e) { console.log(e) }

        // console.log($(this))
        var $parent = $(this).parents('.js-searchDropdownWrap');
        $parent.find('[data-list] a').removeClass('active');
        $(this).addClass('active');
        var selectedVal = $(this).text();
        $parent.find('.dropdown-heading').text(selectedVal);
        $parent.find('.dropdown-heading').removeClass('active');
        $parent.find('.dropdownmenu').removeClass('show');
        $("[data-search]").val('');
        $(this).parents('[data-search]').find("li").show();
        // added   for gst calculator 
        try {
            gstFields = $(this).parents('.calculator-inputs-inner').find('.calculator-field-gst');
            if ($(this).closest('.calculator-content-wrap').data('calcName').includes('calculator-business-loan-gst-calculator')) {
                renderGstCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
            }
        } catch (e) {
            console.log(e);
        };
        // added   for microfinance calculator 
        // if($(this).closest('.calculator-content-wrap').data('calcName')?.includes('calculator-microfinance-loan-emi-calc')){   
        //     microProduct=$(this).text();     
        //     renderMicrofianceCalcResult($(this).parents(".calculator-content-wrap").data('calc-name'));
        // }
        try {
            renderStampDutyCalcResult();
            renderPlEligibilityCalcResult();
        } catch (e) { console.log(e) }

    });
    /* dropdown search filter end */



    $('.jsFilterText').change(function () {
        if ($(this).val().length < 1) {
            $(this).parents('.form-textbox-searchs').removeClass('opened');
        }
        stockName = $(this).val();
        var selectedStock = setInput()
        document.querySelector('.qty-calc-values').innerHTML = "₹" + Number(selectedStock[0].price).toLocaleString("EN-IN");
        document.querySelector('.las .aGreen-category').innerText = selectedStock[0].companyname + 'recognized as ' + selectedStock[0].proposedcategory + ' company';
        var textValue = $('[jsName="shareQuantity"]');

    })
    $(".jsFilterText").each(function () {
        $(this).parents('.form-textbox-searchs').find('.jsFilterText').on("keyup", function () {
            $(this).parents('.form-textbox-searchs').addClass('opened');
            var values = $(this).val().toLowerCase();
            $(this).parents('.form-textbox-searchs').find('.jsSearchResult .searchs-results-li').filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(values) > -1)
            })
        })
    })

    $('.jsSearchResult a').click(function () {
        var getText = $(this).text();
        $(this).parents('.form-textbox-searchs').find('.jsFilterText').val(getText);
        $(this).parents('.form-textbox-searchs').removeClass('opened');
    })

    // $( function() {
    //     $( ".jsFilterText" ).autocomplete({
    //       source: availableTags
    //     });
    // })


    /*Add remove js*/
    $('body').on('click', '.row-closed', function () {
        // $(this).parents('.las-stock-row').remove();
        if ($(window).width() > 767) {
            $('.las-main-inner').find('.added-msg').css('display', 'none');
            $('.las-main-inner').find('.clearall-msg').css('display', 'none');
            $('.las-main-inner').find('.remove-msg').fadeIn();
            setTimeout(function () {
                $('.las-main-inner').find('.remove-msg').fadeOut();
            }, 1000);
        } else {
            $('.las-main-inner').find('.added-xs-msg').css('display', 'none');
            $('.las-main-inner').find('.clearall-xs-msg').css('display', 'none');
            $('.las-main-inner').find('.remove-xs-msg').fadeIn();
            setTimeout(function () {
                $('.las-main-inner').find('.remove-xs-msg').fadeOut();
            }, 1500);
        }


    });

    $('.js-clear-all').click(function () {
        lasStockRow = "";
        selectedCompaniesData = [];
        $('.las-stock-table .las-stock-body').find('.las-stock-row').remove();
        if ($(window).width() > 767) {
            $('.las-main-inner').find('.added-msg').css('display', 'none');
            $('.las-main-inner').find('.remove-msg').css('display', 'none');
            $('.las-main-inner').find('.clearall-msg').fadeIn();
            setTimeout(function () {
                $('.las-main-inner').find('.clearall-msg').fadeOut();
            }, 1000);
        } else {
            $('.las-main-inner').find('.added-xs-msg').css('display', 'none');
            $('.las-main-inner').find('.remove-xs-msg').css('display', 'none');
            $('.las-main-inner').find('.clearall-xs-msg').fadeIn();
            setTimeout(function () {
                $('.las-main-inner').find('.clearall-xs-msg').fadeOut();
            }, 1500);
        }
        $('.js-stockCount').find('span').text('0');
        $('.js-clear-all').addClass('btn-disabled');
        $('.js-las-no-stock').removeClass('d-none');
        $(".las-tnv").html('₹0*');
        $(".las-ela").html('₹0*');
    })

    // var addstockrow = ' <div class="las-stock-row"><a href="javascript:void(0)" class="icon-close mob-row-closed row-closed"></a><ul><li class="stock34 las-stock-name"><div class="form-textbox-searchs"><input type="text" class="input-textbox jsFilterText" value="Reliance Industries Ltd." placeholder=""></div><p class="text-label12 success-text-info">Super Cat A company</p></li><li class="stock13" data-content="Share Rate"><p class="text14i"><span class="icon-rupee"></span>2,395</p></li><li class="stock13" data-content="Quantity"><input type="text" class="input-textbox-qty price-only-comma" placeholder="" value="10"></li><li class="stock13" data-content="Total Value"><p class="text14i"><span class="icon-rupee"></span>23,950</p></li><li class="stock18" data-content="Eligible Loan Amount"><p class="text14i"><span class="icon-rupee"></span>11,975</p></li><li class="stock9 las-stock-remove"><a href="javascript:void(0)" class="btn-links-md semibold text-gray row-closed" jsname="removeStock">Remove</a></li></ul></div>';

    // $('.js-add-stock').click(function () {
    //     if($(window).width() > 767) {
    //         $('.las-stock-table .las-stock-body').prepend(addstockrow);
    //         $('.las-main-inner').find('.remove-msg').css('display', 'none');
    //         $('.las-main-inner').find('.clearall-msg').css('display', 'none');
    //         $('.las-main-inner').find('.added-msg').fadeIn();
    //         setTimeout(function(){ 
    //             $('.las-main-inner').find('.added-msg').fadeOut();
    //         }, 1000);
    //     } else {
    //         $('.las-stock-table .las-stock-body').prepend(addstockrow);
    //         $('.las-main-inner').find('.remove-xs-msg').css('display', 'none');
    //         $('.las-main-inner').find('.clearall-xs-msg').css('display', 'none');
    //         $('.las-main-inner').find('.added-xs-msg').fadeIn();
    //         setTimeout(function(){ 
    //             $('.las-main-inner').find('.added-xs-msg').fadeOut();
    //         }, 1500);
    //     }        
    //     $('.js-clear-all').removeClass('btn-disabled');
    //     $('.js-las-no-stock').addClass('d-none');
    //     var ele_count = $('.js-stockCount').find('span').text();
    //     ele_count++;
    //     $('.js-stockCount').find('span').text(ele_count);
    //     $( function() {
    //         var availableTags1 = [
    //         //   "Dr. Reddy's Laboratories Ltd.",
    //         //   "Dr. Lal Pathlabs Ltd.",
    //         //   "Reliance Industries Ltd.",
    //         //   "Adani Enterprises Ltd.",
    //         //   "Zomato Ltd.",
    //         ];
    //         $( ".jsFilterText" ).autocomplete({
    //           source: availableTags1
    //         });
    //     })
    //     $('.price-only-comma').keyup(function () {
    //         if ($(this).val() != "") {
    //           var rupeeValue = parseFloat($(this).val().replace(/,/g, ''));
    //           commaSeparatedValue = rupeeValue.toLocaleString('en-IN');
    //           $(this).val(commaSeparatedValue);
    //         }
    //       });
    // });

    /*Drag js*/
    $('.jsDragInfoClosed').click(function () {
        $(this).parents('.file-added-box').addClass('hidden');
    })


    $('[data-file="browse"]').change(function (e) {
        $('#drag03').addClass('hidden');
        var fileName = e.target.files[0].name;
        var files_ext = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
        $(this).siblings().text(fileName);
        var ele_target = $(this).data('target');

        var iSize = ($(this)[0].files[0].size / 1024);
        iSize = (Math.round(iSize * 100) / 100)
        $(".jsFileSize").html(iSize + " KB");

        if (files_ext === 'xlsx') {
            // e.target.value = '';
            $('body').find(ele_target).css({ 'display': 'block', 'pointer-events': 'none' }).addClass('popover-show');
            $('body').append('<div class="modal-backdrop"></div>');

            $('#drag03 .file').text(fileName);
        } else {
            // e.target.value = '';
            $('.form-drag').find('.drag-panel').addClass('hidden');
            $('.form-drag').find('#drag05').removeClass('hidden');
            $('.form-drag').find('#drag05 .file-name').text(fileName);
        }
    });

    // $('[data-upload="confirm"]').click(function () {
    //     var ele_next = $(this).data('next');

    //     $('body').find('.form-drag .drag-panel').addClass('hidden');
    //     $('body').find(ele_next).removeClass('hidden');

    //     setTimeout(function () {
    //         $('body').find('.form-drag .drag-panel').addClass('hidden');
    //         // $('body').find('.form-drag #drag03').removeClass('hidden'); 
    //         $('#drag01').removeClass('hidden');
    //         $('#drag03').removeClass('hidden');
    //     }, 1000)
    // });

    $('[data-restore="restore"]').click(function () {
        var ele_next = $(this).data('next');

        $('body').find('.form-drag .drag-panel').addClass('hidden');
        $('body').find(ele_next).removeClass('hidden');
    })

    $('[data-drag="close"]').click(function () {
        var ele_prev = $(this).data('prev');
        $(this).parents('.form-drag').find('.drag-panel').addClass('hidden');
        $(this).parents('.form-drag').find(ele_prev).removeClass('hidden');
        $('#drag01').find('[data-file="browse"]').siblings().text('UPLOAD');
    });

    $('[data-dismiss="popover-modal"]').click(function () {
        $('#drag01').find('[data-file="browse"]').siblings().text('UPLOAD');

    })
});

/*single decmal*/
$('.single-dot').keypress(function (event) {
    if (event.which == 46
        && $(this).val().indexOf('.') != -1) {
        event.preventDefault();
    } // prevent if already decimal point

    if (event.which != 46 && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    } // prevent if not number/dot
});
/*single decmal*/

function ruralCalcChange() {
    if ($('[data-calc-name="calculator-rural-indivudual-emi-calc"]').length != 0) {
        $('[data-jsname="rateOfInterest"]').attr("disabled", "disabled");
        $('[data-name="rateOfInterest"]').data("ionRangeSlider").update({
            disable: true
        });
        if (parseInt($('[data-jsname="loanAmount"]').val().replace(/,/g, '')) <= 100000) {
            $('[data-jsname="rateOfInterest"]').val(27).trigger("input");
        }
        else if (parseInt($('[data-jsname="loanAmount"]').val().replace(/,/g, '')) > 100000 && parseInt($('[data-jsname="loanAmount"]').val().replace(/,/g, '')) <= 150000) {
            $('[data-jsname="rateOfInterest"]').val(26).trigger("input");
        }
        else if (parseInt($('[data-jsname="loanAmount"]').val().replace(/,/g, '')) > 150000 && parseInt($('[data-jsname="loanAmount"]').val().replace(/,/g, '')) <= 200000) {
            $('[data-jsname="rateOfInterest"]').val(25).trigger("input");
        }

    }
}

function ruralCalcChangeRange() {
    if ($('[data-calc-name="calculator-rural-indivudual-emi-calc"]').length != 0) {
        $('[data-jsname="rateOfInterest"]').attr("disabled", "disabled");
        $('[data-name="rateOfInterest"]').data("ionRangeSlider").update({
            disable: true
        });
        if (parseInt($('[data-name="loanAmount"]').val().replace(/,/g, '')) <=  100000) {
            $('[data-jsname="rateOfInterest"]').val(27).trigger("input");
        }
        else if (parseInt($('[data-name="loanAmount"]').val().replace(/,/g, '')) > 100000 && parseInt($('[data-name="loanAmount"]').val().replace(/,/g, '')) <= 150000) {
            $('[data-jsname="rateOfInterest"]').val(26).trigger("input");
        }
        else if (parseInt($('[data-name="loanAmount"]').val().replace(/,/g, '')) > 150000 && parseInt($('[data-name="loanAmount"]').val().replace(/,/g, '')) <= 200000) {
            $('[data-jsname="rateOfInterest"]').val(25).trigger("input");
        }
    }
}