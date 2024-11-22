$(document).ready(function () {
    counter_stepper();
    stepper_form();
    rate_of_interest();
    years();
    form_clear();
    getResultOnWhatsappAndEmail();

    $('#retirementForm .input-textbox').keyup(function () {
        validateRetirementFields($(this));
    });
    $('#financialGoalForm .input-textbox, #irrForm .input-textbox, #inflationForm .input-textbox, #humanLifeForm .input-textbox').keyup(function () {
        validateFinancialGoalFields($(this));
    });
    /*$('#investmentForm .input-textbox').keyup(function () {
        validateInvestmentField($(this));
    });*/

    /*if ($(window).width() > 767) {
        if ($('.investment-table-scroll').length) {
            new SimpleBar($('.investment-table-scroll')[0]);
        }
    }*/
});

var otpRefNo;
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

        if ($input.val().length > 0) {
            $('.error-msgs').text('');
        }
        else {
            $('.error-msgs').text('Required');
        }
    });
}

function years() {
    $('[data-year="year"]').click(function (ele) {
        var $input = $(this).parents('[data-text="year"]').find("input");
        var ele_val = +$input.val();
        $input.next('.error-msgs').remove();

        if ($(this).hasClass('plus'))
            $input.val(Math.round((ele_val + 1)));
        else if (ele_val > 1)
            $input.val(Math.round((ele_val - 1)));

        if ($input.val() != '') {
            if ($input.val() > $input.data('maxvalue')) {
                $input.after('<span class="error-msgs" style="left: 8px;">Max ' + $input.data('maxvalue') + ' Year</span>');
            }
            else if ($input.val() < $input.data('minvalue')) {
                $input.after('<span class="error-msgs" style="left: 8px;">At least ' + $input.data('minvalue') + ' Year</span>');
            }
        }
        else {
            $input.after('<span class="error-msgs" style="left: 8px;">Required</span>');
        }
    });
}

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
        // clear btn calc analytics START 
        try {
            var ctaText = 'clear icon';
            var componentName = window.location.href.split('/').reverse().shift().split('.').shift() + '-form';
            var ctaTitle = getParentElement(ele.currentTarget, 5).querySelector('h2') 
                ? getParentElement(ele.currentTarget, 5).querySelector('h2').innerText.trim() : componentName;
            ctaInteraction(ctaText, ctaTitle, componentName, '')
        } catch (err) { console.log(err);}
        // clear btn calc analytics END
    });
}

function stepper_form() {
    $('[data-stepper="step"]').click(function (e) {
        var validated = false;
        if ($(this).parents('#retirementForm').length > 0) {
            validated = validateRetirementForm(e);
        }
        else if ($(this).parents('#financialGoalForm').length > 0) {
            validated = validateFinancialGoalsForm(e);
        }
        else if ($(this).parents('#irrForm').length > 0) {
            validated = validateFinancialGoalsForm(e);
        }
        else if ($(this).parents('#inflationForm').length > 0) {
            validated = validateFinancialGoalsForm(e);
        }
        else if ($(this).parents('#humanLifeForm').length > 0) {
            validated = validateFinancialGoalsForm(e);
        }
        if (validated) {
            var current_fs = $(this).data('current');
            var prev_fs = $(this).data('prev');
            var next_fs = $(this).data('next');
            $(this).parents('.form-wizard').find('#' + current_fs).addClass('hidden');
            $(this).parents('.form-wizard').find('#' + prev_fs).removeClass('hidden');
            $(this).parents('.form-wizard').find('#' + next_fs).removeClass('hidden');
            // next-prev calc btn analytics START
            try{
                var ctaText = e.currentTarget.innerText.trim();
                var componentName = window.location.href.split('/').reverse().shift().split('.').shift();
                var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('h2') 
                    ? getParentElement(e.currentTarget, 6).querySelector('h2').innerText.trim() : '';
                var calculatorName = ctaTitle;
                calculatorctaInteraction(ctaText,ctaTitle,calculatorName,componentName,getProductCode())
            } catch (err) {console.log(err);}
            // next-prev calc btn analytics END
            if ($(this).parents('#retirementForm').length > 0) {
                retirement();
            }
            else if ($(this).parents('#financialGoalForm').length > 0) {
                goalSip()
            }
            else if ($(this).parents('#irrForm').length > 0) {
                getIRR();
            }
            else if ($(this).parents('#inflationForm').length > 0) {
                inflactionImpact();
            }
            else if ($(this).parents('#humanLifeForm').length > 0) {
                $('[data-id="hlv"]').html('₹' + calculateHLV().toLocaleString("en-US"));
                $('[data-id="lifeCover"]').html('₹' + calculateLifeCover().toLocaleString("en-US"));
            }

            // counter
            if (next_fs == undefined) {
                var target = prev_fs;
            } else {
                var target = next_fs;
            }
            var currentStepIndex = $('.form-wizard [data-target="step"]').index($('#' + target));
            $('.calculator-pagination .numbers').text(currentStepIndex + 1);
        }
    });
}

function validateRetirementAge(retirementAge) {
    var currentAge = parseInt($('#currentAge').val());
    if (retirementAge == '' || retirementAge > 75 || retirementAge <= currentAge) {
        return false;
    }
    else {
        return true;
    }
}

function validateRetirementAgeReach(retirementAgeReach) {
    var currentAge = parseInt($('#currentAge').val());
    if (retirementAgeReach == '' || retirementAgeReach <= currentAge) {
        return false;
    }
    else {
        return true;
    }
}

function validateCurrentAge(currentAge) {
    var retirementAge = parseInt($('#retirementAge').val());
    if (currentAge == '' || currentAge < 18 || retirementAge < currentAge) {
        return false;
    }
    else {
        return true;
    }
}

function cityArraySort(arr) {
    var uniqueArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (uniqueArr.indexOf(arr[i]) === -1) {
            uniqueArr.push(arr[i]);
        }
    }
    return uniqueArr;
}

if ($("#whatsapp-email-modal [data-type='city']").length > 0) {
    var reqObj = {};
    $("#loaderCalc").removeClass("hidden");
    getInTouchFilterObj.cityProductMasterCampaign(reqObj).then(function (response) {
        if (response.status == "SUCCESS") {
            $("#loaderCalc").addClass("hidden");
            var cityArray = [];
            var responseArray = JSON.parse(response.response).Master;
            responseArray.forEach(function (ele) {
                cityArray.push(ele.city);
            })
            cityArray = cityArray.sort();
            $("[data-type='city']").html();
            $("[data-type='city']").append("<option value=''></option>");
            cityArray = cityArraySort(cityArray);
            cityArray.forEach(function (element) {
                $("[data-type='city']").append('<option value=' + element + '>' + element + '</option>');
            });
        }
        /* else {
            $('.loader').addClass('hide-loader');
            $('body').removeClass('bg-loader');
            //failure Popup
            setTimeout(function () {
                $("#failure-modal").addClass("popover-show");
            }, 80);

            $("#failure-modal").css("display", "block");
            $("body").addClass("popover-modal-open");
            $("body").append('<div class="modal-backdrop"></div>');
        } */
    })
}
/* retirement-Form */
function validateRetirementForm(e) {

    var ele_input = $('#retirementForm .input-textbox');
    var errors = [];

    $(ele_input).each(function () {
        errors = validateRetirementFields($(this), errors);
    });

    if (errors.length == 0) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }
}

//Calculation Inputs For Calculation


function validateRetirementFields(element, errors) {
    if (!errors)
        errors = [];
    var ele_value = element.val().replace(/,/g, "");
    var ele_percentage = "Invalid value";
    var ele_amount = "Greater than 1,000";
    var ele_age = "Invalid age";
    var ele_required = "Required";

    $(element).next('.error-msgs').remove();

    if (element.is(":visible")) {
        if (element.val() != '') {
            $(element).after('<span class="error-msgs"></span>');
            if ($(element).data('type') === 'currentAge') {

                if (ele_value != '' && !validateCurrentAge(ele_value)) {
                    $(element).next('.error-msgs').text(ele_age);
                    errors.push(ele_age);
                }
                else {
                    $(element).next('.error-msgs').text('');
                }
            }
            else if ($(element).data('type') === 'retirementAge') {

                if (ele_value != '' && !validateRetirementAge(ele_value)) {
                    $(element).next('.error-msgs').text(ele_age);
                    errors.push(ele_age);
                }
                else {
                    $(element).next('.error-msgs').text('');
                }
            }
            else if ($(element).data('type') === 'retirementAgeReach') {

                if (ele_value != '' && !validateRetirementAgeReach(ele_value)) {
                    $(element).next('.error-msgs').text(ele_age);
                    errors.push(ele_age);
                }
                else {
                    $(element).next('.error-msgs').text('');
                }
            }
            else if ($(element).data('type') === 'amount') {

                if (ele_value != '' && ele_value < 1000) {
                    $(element).next('.error-msgs').text(ele_amount);
                    errors.push(ele_amount);
                }
                else {
                    $(element).next('.error-msgs').text('');
                }
            }
            else if ($(element).data('type') === 'percentage') {
                var maxValue = $(element).data('maxvalue');
                if (ele_value != '' && (parseInt(ele_value) > maxValue || parseInt(ele_value) < 1)) {
                    $(element).next('.error-msgs').css('left', '34px').end().next('.error-msgs').text(ele_percentage);
                    errors.push(ele_percentage);
                }
                else {
                    $(element).next('.error-msgs').text('');
                }
            }
        } else {
            $(element).after('<span class="error-msgs">' + ele_required + '</span>');
            if ($(element).data('type') === 'percentage') {
                $(element).next('.error-msgs').css('left', '34px');
            }
            errors.push(ele_required);
        }
    }
    return errors;
}

/* financial-Goals-Form and IRR Forms */

function validateFinancialGoalsForm(e) {
    var ele_input = $('#financialGoalForm .input-textbox, #irrForm .input-textbox, #inflationForm .input-textbox, #humanLifeForm .input-textbox');
    var selectElements = $('#financialGoalForm .select2-hidden-accessible, #irrForm .select2-hidden-accessible, #inflationForm .select2-hidden-accessible, #humanLifeForm .select2-hidden-accessible');
    var errors = [];
    allFilled = true;
    var ele_required = "Field is required";
    // Select 2 validation
    $(selectElements).each(function () {
        var select = $(this);
        if ((select).is(":visible") && (select).val() == '') {
            allFilled = false;
            $(select).parents('.form-textbox-new').addClass('textboxerror');
            $('.error-msgs').remove();
            selectElements.after('<span class="error-msgs" style="top: 100%;">' + ele_required + '</span>');
            errors.push(ele_required);
        }
    });

    $(ele_input).each(function () {
        errors = validateFinancialGoalFields($(this), errors);
    });

    if (errors.length == 0) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }
}

//Calculation For Retirement Calculator

function validateFinancialGoalFields(element, errors) {
    if (!errors)
        errors = [];
    var ele_value = element.val().replace(/,/g, "");
    var ele_percentage = "Invalid value";
    var ele_amount = "Greater than 1,000";
    var ele_age = "Invalid age";
    var ele_years = "At least 5 years";
    var ele_required = "Required";

    var presentValue
    var interestRate
    var numberYears

    $(element).next('.error-msgs').remove();

    if (element.is(":visible")) {
        if (element.val() != '') {
            $(element).after('<span class="error-msgs"></span>');
            if ($(element).data('type') === 'currentAge') {

                if (ele_value != '' && !validateCurrentAge(ele_value)) {
                    $(element).next('.error-msgs').text(ele_age);
                    errors.push(ele_age);
                }
                else {
                    $(element).next('.error-msgs').text('');
                }
            }
            else if ($(element).data('type') === 'retirementAge') {

                if (ele_value != '' && !validateRetirementAge(ele_value)) {
                    $(element).next('.error-msgs').text(ele_age);
                    errors.push(ele_age);
                }
                else {
                    $(element).next('.error-msgs').text('');
                }
            }
            else if ($(element).data('type') === 'amount') {

                if (ele_value != '' && parseInt(ele_value) < 1000) {
                    $(element).next('.error-msgs').text(ele_amount);
                    errors.push(ele_amount);
                    presentValue = ele_amount
                }
                else {
                    $(element).next('.error-msgs').text('');
                }
            }
            /* else if ($(element).data('type') === 'years') {

                if (ele_value != '' && (parseInt(ele_value) < 5 || parseInt(ele_value) > 60)) {
                    $(element).next('.error-msgs').text(ele_years);
                    errors.push(ele_years);
                    numberYears = ele_years;
                }
                else {
                    $(element).next('.error-msgs').text('');
                }
            } */
            else if ($(element).data('type') === 'percentage') {
                var maxvalue = $(element).data('maxvalue');
                if (ele_value != '' && (parseInt(ele_value) > maxvalue || parseInt(ele_value) < 1)) {
                    $(element).next('.error-msgs').css('left', '34px').end().next('.error-msgs').text(ele_percentage);
                    errors.push(ele_percentage);
                    interestRate = ele_percentage;
                }
                else {
                    $(element).next('.error-msgs').text('');
                }
            }
            // $('[data-calctype="goal-calculator"]').find('.amount').text(calculateFutureValue(presentValue,interestRate,numberYears));
        } else {
            $(element).after('<span class="error-msgs">' + ele_required + '</span>');
            if ($(element).data('type') === 'percentage') {
                $(element).next('.error-msgs').css('left', '34px');
            }
            errors.push(ele_required);
        }
    }
    return errors;
}

/* Investment Form */
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

function getResultOnWhatsappAndEmail() {

    $('#whatsapp-email-modal [data-dismiss="popover-modal"]').click(function () {
        $('#whatsapp-email-modal .js-otpFormWrap, #whatsapp-email-modal .js-MessageWrap').addClass('hidden');
        $('#whatsapp-email-modal .js-getResultFormWrap').removeClass('hidden');

        $('#whatsapp-email-modal #getResultForm').find('input').val('');
        $('#whatsapp-email-modal #getResultForm').find('#termCondition').prop('checked', false);
        $('#whatsapp-email-modal #getResultForm').find('.js-select2').val(null).trigger("change");
        $('#whatsapp-email-modal #getResultForm').find('.form-textbox-new').removeClass('active');

        $('#whatsapp-email-modal #mobileOTPForm').find('.otp-col .input-textbox').val('');
        $('#whatsapp-email-modal #mobileOTPForm').find('.otp-col .input-textbox').addClass('pointer-none');
        $('#whatsapp-email-modal #mobileOTPForm').find('.otp-col .input-textbox:first-child').removeClass('pointer-none');

        $('.js-errorWrap').addClass('hidden');
        $('#js-wrong').addClass('hidden');

        $('.js-otpExpired').addClass('hidden');
        $('#js-otpExpiredMSg').addClass('hidden');

    })

    $('#getResultForm .js-proceed-btn').click(function (e) {
        var ele_input = $('#getResultForm .input-textbox');
        var selectElements = $('#getResultForm .select2-hidden-accessible');
        var checkboxElements = $('#getResultForm [data-type="checkbox"]');
        var errors = [];
        allFilled = true;
        var ele_required = "Field is required";
        var mobile = $('input[data-type="mobile"]').val();
        // Select 2 validation
        $(selectElements).each(function () {
            var select = $(this);

            if ($(select).val() == '') {
                allFilled = false;
                $(select).parents('.form-textbox-new').addClass('textboxerror');
                $(select).next('.error-msgs').remove();
                $(select).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
                errors.push(ele_required);
            } else {
                $(select).parents('.form-textbox-new').removeClass('textboxerror');
                $(select).next('.error-msgs').remove();
            }
        });

        $(ele_input).each(function () {
            var element = $(this);
            var ele_value = element.val();
            var ele_name = "Please enter full name";
            var ele_email = "Please enter valid email";
            var ele_phoneNumber = "Please enter valid number";

            $(element).next().remove();

            if (element.is(":visible")) {
                if (element.val() != '') {
                    $(element).after('<span class="error-msgs" style="top: 43px"></span>');
                    if ($(element).data('type') === 'name') {
                        var regName = /[A-Za-z]+[ ][A-Za-z]+$/;

                        if (ele_value != '' && !regName.test(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_name);
                            errors.push(ele_name);
                        }
                        else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                        }
                    }

                    if ($(element).data('type') === 'email') {
                        var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

                        if (ele_value != '' && !ele_value.match(regEmail)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_email);
                            errors.push(ele_email);
                        }
                        else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                        }
                    }

                    if ($(element).data('type') === 'mobile') {

                        if (!validateMobile(element)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_phoneNumber);
                            errors.push(ele_phoneNumber);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                        }
                    }
                } else {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
                    errors.push(ele_required);
                }
            }
        });

        $('#getResultForm [data-type="checkbox"]').next('.error-msgs').remove();
        // checkbox validation
        if (checkboxElements.prop("checked") == false) {
            checkboxElements.parents('.form-textbox-new').addClass('textboxerror');
            $(checkboxElements).parents('.custom-checkbox-label').next('.error-msgs').remove();
            checkboxElements.parents('.custom-checkbox-label').after('<span class="error-msgs">' + ele_required + '</span>');
            errors.push(ele_required);
        } else {
            $(checkboxElements).parents('.form-textbox-new').removeClass('textboxerror');
            $(checkboxElements).parents('.custom-checkbox-label').next('.error-msgs').remove();
        }

        if (errors.length == 0) {
            var getMobileNumber = $('#getResultForm [data-type="mobile"]').val();
            var lastTwoDigit = getMobileNumber.toString().slice(-2);
            $('.js-mobLastNum').text(lastTwoDigit);
            $('#callNum').text(' +91 XXXXXXXX' + lastTwoDigit);

            var getEmail = $('#getResultForm [data-type="email"]').val();
            var emailEncrypt = getEmail.replace(/(\w{2})(.*)(\w{2})@(.*)/, '$1XXXXXX$3@$4');
            $('.js-encryptEmail').text(emailEncrypt);

            var reqObj = {
                "header": {
                    "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                    "identifier": "nli"
                },
                "body": {
                    "mobileNumber": "91" + $('#whatsapp-email-modal input[data-type="mobile"]').val()
                }
            }
            $('#loaderWealth').css({ 'display': 'block' });
            getInTouchFilterObj.generateOtp(reqObj).then(function (response) {
                if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                    if (response.response.responseJson.body.otpRefNo) {
                        $('#loaderWealth').css({ 'display': 'none' });
                        otpRefNo = response.response.responseJson.body.otpRefNo;
                        clearOtpTimer();
                        otpTimerCalc();;
                        $('.js-getResultFormWrap').addClass('hidden');
                        $('.js-otpFormWrap').removeClass('hidden');
                        $('.js-otpFormWrap #mobileOTPForm').find('.otp-col .input-textbox:first-child').focus();
                        $('.js-errorWrap').addClass('hidden');
                        $('#js-wrong').addClass('hidden');
                    }
                } else {
                    $('#loaderWealth').css({ "display": 'none' })
                    console.log('somthing went wrong');
                    showFailureCalcModal();
                }
            }).catch(function (error) {
                $('#loaderWealth').css({ "display": 'none' })
                console.log('somthing went wrong');
                showFailureCalcModal();
            });
            // getResultFormSubmit Calculator analytics START
            try {
                var componentName = window.location.href.split('/').reverse().shift().split('.').shift() + '-form';
                var emailMobCity = getParentElement(e.currentTarget, 2);
                var emailId = emailMobCity && emailMobCity.querySelector('[data-type="email"]').value;
                var mobileNo = emailMobCity && emailMobCity.querySelector('[data-type="mobile"]').value;
                var city = emailMobCity && emailMobCity.querySelector('[data-type="city"]').value;
                getresultformSubmit(componentName, emailId, mobileNo, city, getProductCode());
            } catch (err) {console.log(err);}
            // getResultFormSubmit Calculator analytics END
        }
    });

    $('#getResultForm .input-textbox').keyup(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_required = "Field is required";
        var ele_name = "Please enter full name";
        var ele_email = "Please enter valid email";
        var ele_phoneNumber = "Please enter valid number";

        $(this).next('.error-msgs').remove();
        $(this).after('<span class="error-msgs" style="top: 43px"></span>');

        if ($(element).val() != '') {
            if ($(element).data('type') === 'name') {
                var regName = /[A-Za-z]+[ ][A-Za-z]+$/;

                if (ele_value != '' && !regName.test(ele_value)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_name);
                }
                else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(this).next('.error-msgs').remove();
                }
            }
            if ($(element).data('type') === 'email') {
                var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

                if (ele_value != '' && !regEmail.test(ele_value)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_email);
                }
                else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(this).next('.error-msgs').remove();
                }
            }
            if ($(element).data('type') === 'mobile') {
                if (!validateMobile(element)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_phoneNumber);
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(this).next('.error-msgs').remove();
                }
            }
        } else {
            $(element).parents('.form-textbox-new').addClass('textboxerror');
            $(element).next('.error-msgs').text(ele_required);
        }
    });

    $('#getResultForm .js-select2').on('change', function () {
        $(this).parents('.form-textbox-new').removeClass('textboxerror');
        $(this).parents('.form-textbox-new').find('.error-msgs').remove();
    });

    $('#getResultForm [data-type="checkbox"]').change(function () {
        if (this.checked) {
            $(this).parents('.form-textbox-new').removeClass('textboxerror');
            $(this).parents('.form-textbox-new').find('.error-msgs').remove();
        } else {
            $(this).parents('.form-textbox-new').addClass('textboxerror');
            $(this).parents('.form-textbox-new').append('<span class="error-msgs">Field is required</span>');
        }
    });

    $('.js-otp-proceed-btn').click(function () {
        $('.js-otpFormWrap').addClass('hidden');
        $('.js-thankyouWrap').removeClass('hidden');
    });

    $('.js-editNumber').click(function (e) {
        $('.js-getResultFormWrap').removeClass('hidden');
        $(".js-getResultFormWrap input[data-type='mobile']").focus();
        $('.js-otpFormWrap').addClass('hidden');
        $(".js-otpFormWrap input[data-type='OTP']").val('');
        $('.js-otpProceed').addClass('disabled');
        $(".jsGetOTPSent").addClass("d-none");
        $(".jsOnGetCallCalc").addClass("d-none");
        clearOtpTimer();
        try{
            var ctaText = 'edit number';
            var ctaTitle = 'Enter OTP';
            var componentName = window.location.href.split('/').reverse().shift().split('.').shift();
            var calculatorName = ''
            calculatorctaInteraction(ctaText, ctaTitle, calculatorName, componentName, getProductCode())
        } catch (err) {console.log(err);}
    });

    getOTPAndResendOTP();
    $('#resendOTP').click(function () {
        $(this).parents('#mobileOTPForm').find("input[data-type='OTP']").val('');
        $(this).parents('#mobileOTPForm').find('button').addClass('disabled');
        $(this).parents('#mobileOTPForm').find('.otp-col .input-textbox:first-child').focus();
        $(this).parents('#mobileOTPForm').find('.otp-col .input-textbox').addClass('pointer-none');
        $(this).parents('#mobileOTPForm').find('.otp-col .input-textbox:first-child').removeClass('pointer-none');
        var reqObj = {
            "header": {
                "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                "identifier": "nli"
            },
            "body": {
                "mobileNumber": "91" + $('#whatsapp-email-modal input[data-type="mobile"]').val()
            }
        }
        $('#loaderWealth').css({ 'display': 'block' });
        getInTouchFilterObj.generateOtp(reqObj).then(function (response) {
            if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                if (response.response.responseJson.body.otpRefNo) {
                    $('#loaderWealth').css({ 'display': 'none' });
                    otpRefNo = response.response.responseJson.body.otpRefNo
                    $('.js-errorWrap').addClass('hidden');
                    $('#js-wrong').addClass('hidden');
                }
            } else {
                console.log("ATP Call");
            }
        }).catch(function (error) {
            $('#loaderWealth').css({ "display": 'none' })
            console.log('somthing went wrong');
            showFailureCalcModal();;
        });
    });


    $('#mobileOTPForm .js-otpProceed').click(function (e) {
        var values = [];
        // var elePage_error = $(this).data('error');
        // var elePage_thank = $(this).data('thank');
        var otpStatus = false;
        $("#mobileOTPForm input[data-type='OTP']").each(function (i, ele) { values.push(ele.value) });

        $('.js-otpFormWrap').addClass('hidden');
        $('.js-MessageWrap').removeClass('hidden');
        var reqObj = {
            "header": {
                "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                "identifier": "nli"
            },
            "body": {
                "otpRefNo": otpRefNo,
                "otp": values.join("")
            }
        }
        $('#loaderWealth').css({ 'display': 'block' });
        getInTouchFilterObj.verifyOtp(reqObj).then(function (response) {
            if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.retStatus.toLowerCase() == 'success') {
                clearOtpTimer();                
                otpStatus = true;
                verifyOTPCalc_aa(otpStatus);
                $('#loaderWealth').css({ 'display': 'none' });
                var calcType = $('[data-calc]').attr('data-calc');
                var requestObjectForGetResult = {
                    "Master": [{
                        "name": $('#whatsapp-email-modal input[data-type="name"]').val(),
                        "city": $('#whatsapp-email-modal [data-type="city"]').val(),
                        "email": $('#whatsapp-email-modal input[data-type="email"]').val(),
                        "mobile": "91" + $('#whatsapp-email-modal input[data-type="mobile"]').val(),
                        "calcname": calcType
                    }]
                }
                $('#loaderWealth').css({ 'display': 'block' });
                getInTouchFilterObj.getResult(requestObjectForGetResult).then(function (response) {
                    if (response.status.toLowerCase() == "success") {
                        $('#loaderWealth').css({ 'display': 'none' });
                        $("#loaderCalc").addClass("hidden");
                        $('.js-errorWrap').addClass('hidden');
                        $('#js-wrong').addClass('hidden');
                    } else {
                        $('.jsFailLeaApi').removeClass('d-none');
                    }
                }).catch(function (error) {
                    $('#loaderWealth').css({ "display": 'none' })
                    console.log('somthing went wrong');
                    showFailureCalcModal();;
                });

                var calcType = $('[data-calc]').attr('data-calc');
                var whatsAppAi = {
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="
                    },
                    "body": {

                    }
                }
                if (calcType == "retirement") {
                    whatsAppAi.body.mobileNumber = "91" + $('#whatsapp-email-modal input[data-type="mobile"]').val();
                    whatsAppAi.body.templateId = "retirement_calculator_4jan";
                    whatsAppAi.body.currentAge = $('#retirementForm input[data-type="currentAge"]').val();
                    whatsAppAi.body.retirementAge = $('#retirementForm input[data-type="retirementAge"]').val();
                    whatsAppAi.body.retirementDesiredAge = $('#retirementForm input[data-type="retirementAgeReach"]').val();
                    whatsAppAi.body.lifestylePerMonthAmt = $('#retirementForm input[data-id="loanAmout"]').val().replace('₹', '');
                    whatsAppAi.body.savedAmt = $('#retirementForm input[data-id="savedAmout"]').val();
                    whatsAppAi.body.expectedInflationRate = $('#retirementForm input[data-id="inflationRate"]').val();
                    whatsAppAi.body.preRetirementRate = $('#retirementForm input[data-id="preRetirementRate"]').val();
                    whatsAppAi.body.postRetirementRate = $('#retirementForm input[data-id="postRetirementRate"]').val();
                    whatsAppAi.body.monthlySIPAmt = $('#retirementForm span[data-id="sipAmout"]').html().replace('₹', '');
                    whatsAppAi.body.monthlyExpenditureAmt = $('#retirementForm span[data-id="monthlyValue"]').html().replace('₹', '');
                    whatsAppAi.body.retirementKityAmt = $('#retirementForm span[data-id="retirementKitty"]').html().replace('₹', '');
                }
                else if (calcType == "hlv") {
                    whatsAppAi.body.mobileNumber = "91" + $('#whatsapp-email-modal input[data-type="mobile"]').val();
                    whatsAppAi.body.templateId = "human_life_value_calculator_4jan";
                    whatsAppAi.body.currentAge = $('#humanLifeForm input[data-type="currentAge"]').val();
                    whatsAppAi.body.retirementAge = $('#humanLifeForm input[data-type="retirementAge"]').val();
                    whatsAppAi.body.netMonthlyIncome = $('#humanLifeForm input[data-id="netIncome"]').val();
                    whatsAppAi.body.expectedIncomeIncrease = $('#humanLifeForm input[data-id="incomeIncrease"]').val();
                    whatsAppAi.body.expectedAvgReturn = $('#humanLifeForm input[data-id="avgReturn"]').val();
                    whatsAppAi.body.discountingRateOfInterest = $('#humanLifeForm span[data-id="doi"]').html().replace('%', '');
                    whatsAppAi.body.humanLifeValue = $('#humanLifeForm span[data-id="hlv"]').html().replace('₹', '');
                    whatsAppAi.body.insuranceCover = $('#humanLifeForm input[data-id="cover"]').val();
                    whatsAppAi.body.financialAssets = $('#humanLifeForm input[data-id="assets"]').val();
                    whatsAppAi.body.liabilities = $('#humanLifeForm input[data-id="liabilities"]').val();
                    whatsAppAi.body.lifeCover = $('#humanLifeForm span[data-id="lifeCover"]').html().substr(1, $('#humanLifeForm span[data-id="lifeCover"]').html().length);
                }
                else if (calcType == "inflationimpact") {
                    whatsAppAi.body.mobileNumber = "91" + $('#whatsapp-email-modal input[data-type="mobile"]').val();
                    whatsAppAi.body.templateId = "inflation_impact_calculator_1";
                    whatsAppAi.body.presentGoalAmt = $('#inflationForm input[data-id="presentCost"]').val();
                    whatsAppAi.body.yearsLeftToAchieveGoal = $('#inflationForm input[data-type="years"]').val();
                    whatsAppAi.body.inflationInterestRate = $('#inflationForm input[data-id="infalctionPeriod"]').val();
                    whatsAppAi.body.futureGoalAmt = $('#inflationForm span[id="finaValue"]').html().replace('₹ ', '');
                } else if (calcType == "financialgoal") {
                    whatsAppAi.body.mobileNumber = "91" + $('#whatsapp-email-modal input[data-type="mobile"]').val();
                    whatsAppAi.body.templateId = "financial_goal_calculator_1";
                    whatsAppAi.body.currentAge = $('#financialGoalForm input[data-type="years"]').val();
                    whatsAppAi.body.expectedFinancialGoalAmt = $('#financialGoalForm input[data-id="amountValue"]').val();
                    whatsAppAi.body.savedAmtToAchieveGoal = $('#financialGoalForm input[data-id="amountSavedValue"]').val();
                    whatsAppAi.body.inflationInterestRate = $('#financialGoalForm input[data-input ="inflation"]').val();
                    whatsAppAi.body.returnInterestRate = $('#financialGoalForm input[data-input="return"]').val();
                    whatsAppAi.body.goalSipAmt = $('#financialGoalForm span[id="goalSip"]').html().replace('₹', '');
                    whatsAppAi.body.goalAmtInYear = $('#financialGoalForm span[id="goalValue"]').html().replace('₹', '');
                } else if (calcType == 'irr') {
                    whatsAppAi.body.mobileNumber = "91" + $('#whatsapp-email-modal input[data-type="mobile"]').val();
                    whatsAppAi.body.templateId = "internal_rate_of_return_4jan";
                    whatsAppAi.body.initialInvestmentAmt = $('#irrForm input[id="initialAmount"]').val();
                    whatsAppAi.body.expectedAmtReceivedAtEndOfYear = $('#irrForm input[id="expectedAmount"]').val();
                    whatsAppAi.body.noOfYearsAmtReceived = $('#irrForm input[data-type="years"]').val();
                    whatsAppAi.body.internalRateOfReturnAmt = $('#irrForm #irrVal').html().replace('%', '');
                }
                else if (calcType == "investment") {
                    whatsAppAi.body.mobileNumber = "91" + $('#whatsapp-email-modal input[data-type="mobile"]').val();
                    whatsAppAi.body.templateId = "investment_calculator_1_new";
                    whatsAppAi.body.equityMFInvestmentAmt = $('#investmentForm [data-amount="Equity Mutual Fund"]').val();
                    whatsAppAi.body.equityMFInvestmentAllocation = $('#investmentForm [data-allocation="Equity Mutual Fund"]').html();
                    whatsAppAi.body.equityMFExpectedReturnOnInvestment = $('#investmentForm [data-rate="Equity Mutual Fund"]').val();
                    whatsAppAi.body.debtMutualFundFixedDepositsNCDInvestmentAmt = $('#investmentForm [data-amount="Debt Mutual Fund/Fixed Deposits/NCDs"]').val().replace('₹', '');
                    whatsAppAi.body.debtMutualFundFixedDepositsNCDInvestmentAllocation = $('#investmentForm [data-allocation="Debt Mutual Fund/Fixed Deposits/NCDs"]').html();
                    whatsAppAi.body.debtMutualFundFixedDepositsNCDExpectedReturnOnInvestment = $('#investmentForm [data-rate="Debt Mutual Fund/Fixed Deposits/NCDs"]').val().replace('%', '');
                    whatsAppAi.body.pmsAlternateInvestmentsInvestmentAmt = $('#investmentForm [data-amount="PMS / Alternate Investments"]').val().replace('₹', '');
                    whatsAppAi.body.pmsAlternateInvestmentsInvestmentAllocation = $('#investmentForm [data-allocation="PMS / Alternate Investments"]').html();
                    whatsAppAi.body.pmsAlternateInvestmentsExpectedReturnOnInvestment = $('#investmentForm [data-rate="PMS / Alternate Investments"]').val().replace('%', '');
                    whatsAppAi.body.fixedIncomeInstrumentsInvestmentAmt = $('#investmentForm [data-amount="Fixed Income Instruments (FDs/Bonds/NCDs,etc)"]').val().replace('₹', '');
                    whatsAppAi.body.fixedIncomeInstrumentsInvestmentAllocation = $('#investmentForm [data-allocation="Fixed Income Instruments (FDs/Bonds/NCDs,etc)"]').html();
                    whatsAppAi.body.fixedIncomeInstrumentsExpectedReturnOnInvestment = $('#investmentForm [data-rate="Fixed Income Instruments (FDs/Bonds/NCDs,etc)"]').val().replace('%', '');
                    whatsAppAi.body.goldInvestmentAmt = $('#investmentForm [data-amount="Gold (Paper/Physical)"]').val().replace('₹', '');
                    whatsAppAi.body.goldInvestmentAllocation = $('#investmentForm [data-allocation="Gold (Paper/Physical)"]').html();
                    whatsAppAi.body.goldExpectedReturnOnInvestment = $('#investmentForm [data-rate="Gold (Paper/Physical)"]').val().replace('%', '');
                    whatsAppAi.body.otherInvestmentAmt = $('#investmentForm [data-amount="Others"]').val().replace('₹', '');
                    whatsAppAi.body.otherInvestmentAllocation = $('#investmentForm [data-allocation="Others"]').html();
                    whatsAppAi.body.otherExpectedReturnOnInvestment = $('#investmentForm [data-rate="Others"]').val().replace('%', '');
                    whatsAppAi.body.totalValueOfInvestment = $('#investmentForm [data-id="totalValue"]').html();
                    whatsAppAi.body.futureValueOfInvestment = $('#investmentForm [data-id="futureValue"]').html().replace('₹', '');
                    whatsAppAi.body.expectedReturnOnInvestment = $('#investmentForm [data-id="expectedRate"]').html();
                }
                $('#loaderWealth').css({ 'display': 'block' });
                getInTouchFilterObj.whatsappMsgApi(whatsAppAi).then(function (response) {
                    if (response.status.toLowerCase() == "success") {
                        $('#loaderWealth').css({ 'display': 'none' });
                        $('#js-errorMsgWrap').addClass('hidden');
                        $('.js-errorWrap').addClass('hidden');
                        $('#js-wrong').addClass('hidden');
                        $('#js-thankyouWrap').removeClass('hidden');
                    } else {
                        console.log("Retray");
                    }
                }).catch(function (error) {
                    $('#loaderWealth').css({ "display": 'none' })
                    console.log('somthing went wrong');
                    showFailureCalcModal();
                });
                var emailDetails = {
                    "header": {},
                    "body": {
                        "toEmails": "",
                        "templateName": "",
                        "subject": "",
                        "templateDetails": {
                        }
                    }
                }

                if (calcType == "irr") {
                    emailDetails.body.toEmails = $('#getResultForm input[data-type="email"').val();
                    emailDetails.body.templateName = "IRR";
                    emailDetails.body.subject = "Tata Capital Wealth Internal Rate of Return Calculator personalized quote";
                    emailDetails.body.templateDetails.custName = $('#getResultForm input[data-type="name"]').val();
                    emailDetails.body.templateDetails.initialInvestment = $('#irrForm input[id="initialAmount"]').val();
                    emailDetails.body.templateDetails.expectedAmountEod = $('#irrForm input[id="expectedAmount"]').val();
                    emailDetails.body.templateDetails.noOfYears = $('#irrForm input[data-type="years"]').val();
                    emailDetails.body.templateDetails.internalRateOfReturnOnCashFlow = $('#irrForm #irrVal').html().replace('%', '');
                    emailDetails.body.templateDetails.internalRateOfReturnCashFlow = $('#irrForm #irrVal').html().replace('%', '');

                } else if (calcType == "investment") {
                    emailDetails.body.toEmails = $('#getResultForm input[data-type="email"').val();
                    emailDetails.body.templateName = "investment";
                    emailDetails.body.subject = "Tata Capital Wealth Investment Calculator personalized quote";
                    emailDetails.body.templateDetails.custName = $('#getResultForm input[data-type="name"]').val();
                    emailDetails.body.templateDetails.equityMFInvestmentAmt = $('#investmentForm [data-amount="Equity Mutual Fund"]').val();
                    emailDetails.body.templateDetails.equityMFInvestmentAllocation = $('#investmentForm [data-allocation="Equity Mutual Fund"]').html();
                    emailDetails.body.templateDetails.equityMFExpectedReturnOnInvestment = $('#investmentForm [data-rate="Equity Mutual Fund"]').val();
                    emailDetails.body.templateDetails.debtMutualFundsFixedDepositsNCDsAmt = $('#investmentForm [data-amount="Debt Mutual Fund/Fixed Deposits/NCDs"]').val().replace('₹', '');
                    emailDetails.body.templateDetails.debtMutualFundFixedDepositsNCDInvestmentAllocation = $('#investmentForm [data-allocation="Debt Mutual Fund/Fixed Deposits/NCDs"]').html();
                    emailDetails.body.templateDetails.debtMutualFundsFixedDepositsNCDsExpectedRateOfReturn = $('#investmentForm [data-rate="Debt Mutual Fund/Fixed Deposits/NCDs"]').val().replace('%', '');
                    emailDetails.body.templateDetails.pMSAlternatInvestmentsAmt = $('#investmentForm [data-amount="PMS / Alternate Investments"]').val().replace('₹', '');
                    emailDetails.body.templateDetails.pmsAlternateInvestmentsInvestmentAllocation = $('#investmentForm [data-allocation="PMS / Alternate Investments"]').html();
                    emailDetails.body.templateDetails.pMSAlternatInvestmentsExpectedRateOfReturn = $('#investmentForm [data-rate="PMS / Alternate Investments"]').val().replace('%', '');
                    emailDetails.body.templateDetails.fixedIncomeInstrumentsAmt = $('#investmentForm [data-amount="Fixed Income Instruments (FDs/Bonds/NCDs,etc)"]').val().replace('₹', '');
                    emailDetails.body.templateDetails.fixedIncomeInstrumentsInvestmentAllocation = $('#investmentForm [data-allocation="Fixed Income Instruments (FDs/Bonds/NCDs,etc)"]').html();
                    emailDetails.body.templateDetails.fixedIncomeInstrumentsExpectedRateOfReturn = $('#investmentForm [data-rate="Fixed Income Instruments (FDs/Bonds/NCDs,etc)"]').val().replace('%', '');
                    emailDetails.body.templateDetails.goldAmt = $('#investmentForm [data-amount="Gold (Paper/Physical)"]').val().replace('₹', '');
                    emailDetails.body.templateDetails.goldInvestmentAllocation = $('#investmentForm [data-allocation="Gold (Paper/Physical)"]').html();
                    emailDetails.body.templateDetails.goldExpectedRateOfReturn = $('#investmentForm [data-rate="Gold (Paper/Physical)"]').val().replace('%', '');
                    emailDetails.body.templateDetails.othersAmt = $('#investmentForm [data-amount="Others"]').val().replace('₹', '');
                    emailDetails.body.templateDetails.otherInvestmentAllocation = $('#investmentForm [data-allocation="Others"]').html();
                    emailDetails.body.templateDetails.othersExpectedRateOfReturn = $('#investmentForm [data-rate="Others"]').val().replace('%', '');
                    emailDetails.body.templateDetails.totalValueOfInvestment = $('#investmentForm [data-id="totalValue"]').html();
                    emailDetails.body.templateDetails.futureValueOfYourInvestment = $('#investmentForm [data-id="futureValue"]').html();
                    emailDetails.body.templateDetails.expectedRateOfReturn = $('#investmentForm [data-id="expectedRate"]').html();
                } else if (calcType == "inflationimpact") {
                    emailDetails.body.toEmails = $('#getResultForm input[data-type="email"').val();
                    emailDetails.body.templateName = "inflation impact";
                    emailDetails.body.subject = "Tata Capital Wealth Inflation Impact Calculator personalized quote";
                    emailDetails.body.templateDetails.custName = $('#getResultForm input[data-type="name"]').val();
                    emailDetails.body.templateDetails.PresentCostOfOurGoal = $('#inflationForm input[data-id="presentCost"]').val();
                    emailDetails.body.templateDetails.yearsToAchieveGoal = $('#inflationForm input[data-type="years"]').val();
                    emailDetails.body.templateDetails.inflationDuringtThePeriod = $('#inflationForm input[data-id="infalctionPeriod"]').val();
                    emailDetails.body.templateDetails.futureValueOfYourGoal = $('#inflationForm span[id="finaValue"]').html().replace('₹ ', '');
                    emailDetails.body.templateDetails.futureGoalValue = $('#inflationForm span[id="finaValue"]').html().replace('₹ ', '');
                } else if (calcType == "hlv") {
                    emailDetails.body.toEmails = $('#getResultForm input[data-type="email"]').val();
                    emailDetails.body.templateName = "human life value";
                    emailDetails.body.subject = "Tata Capital Wealth Human Life Value Calculator personalized quote";
                    emailDetails.body.templateDetails.custName = $('#getResultForm input[data-type="name"]').val();
                    emailDetails.body.templateDetails.currentAge = $('#humanLifeForm input[data-type="currentAge"]').val();
                    emailDetails.body.templateDetails.ageOfRetirement = $('#humanLifeForm input[data-type="retirementAge"]').val();
                    emailDetails.body.templateDetails.monthlyNetIncome = $('#humanLifeForm input[data-id="netIncome"]').val();
                    emailDetails.body.templateDetails.expectedIncreaseInIncomePerAnnum = $('#humanLifeForm input[data-id="incomeIncrease"]').val();
                    emailDetails.body.templateDetails.expectedAverageReturnOnInvestment = $('#humanLifeForm input[data-id="avgReturn"]').val();
                    emailDetails.body.templateDetails.discountingRateOfInterest = $('#humanLifeForm span[data-id="doi"]').html().replace('%', '');
                    emailDetails.body.templateDetails.humanLifeValue = $('#humanLifeForm span[data-id="hlv"]').html().replace('₹', '');
                    emailDetails.body.templateDetails.currentInsuranceCover = $('#humanLifeForm input[data-id="cover"]').val();
                    emailDetails.body.templateDetails.valueOffinancialAssetsExcludingRealEstate = $('#humanLifeForm input[data-id="assets"]').val();
                    emailDetails.body.templateDetails.liabilities = $('#humanLifeForm input[data-id="liabilities"]').val();
                    emailDetails.body.templateDetails.requiredLifeCover = $('#humanLifeForm span[data-id="lifeCover"]').html().substr(1, $('#humanLifeForm span[data-id="lifeCover"]').html().length);
                    emailDetails.body.templateDetails.lifeCover = $('#humanLifeForm span[data-id="lifeCover"]').html().substr(1, $('#humanLifeForm span[data-id="lifeCover"]').html().length);
                    emailDetails.body.templateDetails.humanLifeValuePerYear = $('#humanLifeForm span[data-id="hlv"]').html().replace('₹', '');
                } else if (calcType == "financialgoal") {
                    emailDetails.body.toEmails = $('#getResultForm input[data-type="email"]').val();
                    emailDetails.body.templateName = "financial goal calculator";
                    emailDetails.body.subject = "Tata Capital Wealth Financial Goal Calculator personalized quote";
                    emailDetails.body.templateDetails.custName = $('#getResultForm input[data-type="name"]').val();
                    emailDetails.body.templateDetails.noOfYrAchieveGoal = $('#financialGoalForm input[data-type="years"]').val();
                    emailDetails.body.templateDetails.goalAmount = $('#financialGoalForm input[data-id="amountSavedValue"]').val();
                    emailDetails.body.templateDetails.savings = $('#financialGoalForm input[data-id="amountValue"]').val();
                    emailDetails.body.templateDetails.assumedInflation = $('#financialGoalForm input[data-input ="inflation"]').val();
                    emailDetails.body.templateDetails.rateOfReturnsOnSavings = $('#financialGoalForm input[data-input="return"]').val();
                    emailDetails.body.templateDetails.monthlySIP = $('#financialGoalForm span[id="goalSip"]').html().replace('₹', '');
                    emailDetails.body.templateDetails.GoalValueInGoalYear = $('#financialGoalForm span[id="goalValue"]').html().replace('₹', '');
                    emailDetails.body.templateDetails.startAnSIP = $('#financialGoalForm span[id="goalSip"]').html().replace('₹', '');
                } else if (calcType == "retirement") {
                    emailDetails.body.toEmails = $('#getResultForm input[data-type="email"]').val();
                    emailDetails.body.templateName = "retirement quote calculator";
                    emailDetails.body.subject = "Tata Capital Wealth Retirement Calculator personalized quote";
                    emailDetails.body.templateDetails.custName = $('#getResultForm input[data-type="name"]').val();
                    emailDetails.body.templateDetails.currentAge = $('#retirementForm input[data-type="currentAge"]').val();
                    emailDetails.body.templateDetails.ageOfRetirement = $('#retirementForm input[data-type="retirementAge"]').val();
                    emailDetails.body.templateDetails.retirementPlanTillAge = $('#retirementForm input[data-type="retirementAgeReach"]').val();
                    emailDetails.body.templateDetails.costOfLiving = $('#retirementForm input[data-id="loanAmout"]').val().replace('₹', '');
                    emailDetails.body.templateDetails.savings = $('#retirementForm input[data-id="savedAmout"]').val();
                    emailDetails.body.templateDetails.expectedRateOfReturnInTheEconomy = $('#retirementForm input[data-id="inflationRate"]').val();
                    emailDetails.body.templateDetails.expectedPreRetirementRateOfReturn = $('#retirementForm input[data-id="preRetirementRate"]').val();
                    emailDetails.body.templateDetails.expectedPostRetirementRateOfReturn = $('#retirementForm input[data-id="postRetirementRate"]').val();
                    emailDetails.body.templateDetails.monthlySIP = $('#retirementForm span[data-id="sipAmout"]').html().replace('₹', '');
                    emailDetails.body.templateDetails.expectedMonthlyExpenditure = $('#retirementForm span[data-id="monthlyValue"]').html().replace('₹', '');
                    emailDetails.body.templateDetails.retirementKitty = $('#retirementForm span[data-id="retirementKitty"]').html().replace('₹', '');
                    emailDetails.body.templateDetails.startSip = $('#retirementForm span[data-id="sipAmout"]').html().replace('₹', '');
                } else { }
                $('#loaderWealth').css({ 'display': 'block' });
                getInTouchFilterObj.tsssEmail(emailDetails).then(function (response) {
                    if (response.status.toLowerCase() == "success") {
                        $('#loaderWealth').css({ 'display': 'none' });
                        $('#js-errorMsgWrap').addClass('hidden');
                        $('#js-thankyouWrap').removeClass('hidden');
                    } else {
                        $('#loaderWealth').css({ "display": 'none' })
                        console.log("Retray");
                        showFailureCalcModal();
                    }
                }).catch(function (error) {
                    $('#loaderWealth').css({ "display": 'none' })
                    console.log('somthing went wrong');
                    showFailureCalcModal();
                });

            } else if (response.response.responseJson.header.status.toLowerCase() == 'failure' && response.response.responseJson.errorBody.errorMessage && response.response.responseJson.errorBody.errorMessage.toLowerCase() == 'otp has expired!') {
                $('#loaderWealth').css({ "display": 'none' });
                $('.js-otpExpired').removeClass('hidden');
                $('#js-otpExpiredMSg').removeClass('hidden');
                $('.js-errorWrap').addClass('hidden');
                $('#js-wrong').addClass('hidden');
                otpStatus = false;
                verifyOTPCalc_aa(otpStatus);
            } else {
                $('#loaderWealth').css({ "display": 'none' });
                $('#js-thankyouWrap').addClass('hidden');
                $('.js-errorWrap').addClass('hidden');
                $('#js-wrong').addClass('hidden');
                $('#js-errorMsgWrap').removeClass('hidden');
                otpStatus = false;
                verifyOTPCalc_aa(otpStatus);
            }
        }).catch(function (error) {
            $('#loaderWealth').css({ "display": 'none' });
            $('#js-errorMsgWrap').addClass('hidden');
            $('.js-MessageWrap').addClass('hidden');
            showFailureCalcModal();
        });

        // verify calculator OTP anlaytics START
        try{
            var mobileNo = $('#whatsapp-email-modal input[data-type="mobile"]').val();
            var componentName = window.location.href.split('/').reverse().shift().split('.').shift() + '-form';
            function verifyOTPCalc_aa(otpStatus){
                var otpStatus = otpStatus ? 'success' : 'failure';
                otpverifySubmit(mobileNo, '', otpStatus, componentName, '')
            }
        } catch (err) {console.log(err);}
        // verify calculator OTP anlaytics END
        $('#mobileOTPForm').find("input[data-type='OTP']").val('');
        $('#mobileOTPForm').find('.js-otpProceed').addClass('disabled');
    });

    $('.js-tryAgainOTP').click(function () {
        $('.js-MessageWrap').addClass('hidden');
        $('.js-otpFormWrap').removeClass('hidden');

        $('.js-otpExpired').addClass('hidden');
        $('#js-otpExpiredMSg').addClass('hidden');

        $('.js-otpFormWrap #mobileOTPForm').find('.otp-col .input-textbox').addClass('pointer-none');
        $('.js-otpFormWrap #mobileOTPForm').find('.otp-col .input-textbox:first-child').removeClass('pointer-none');
        $('.js-otpFormWrap #mobileOTPForm').find('.otp-col .input-textbox:first-child').focus();
    });
}

function getOTPAndResendOTP() {

    $("#mobileOTPForm input[data-type='OTP']").keyup(function () {
        // $(this).parents('.form-textbox-new').removeClass('textboxerror');
        if (this.value.length == this.maxLength) {
            $(this).next("input[data-type='OTP']").focus();
            $(this).next('.input-textbox').removeClass('pointer-none');
        } else {
            $(this).prev("input[data-type='OTP']").focus();
            $(this).addClass('pointer-none');
        }
        $(this).parents('.form-textbox-new').addClass('fixed-active');
        var ele_input = $("input[data-type='OTP']");

        $(ele_input).each(function () {
            if ($(this).val().length != 0) {
                $(this).parents('#mobileOTPForm').find('.js-otpProceed').removeClass('disabled');
                $(this).parents('.form-textbox-new').addClass('fixed-active');
            }
            else {
                $(this).parents('#mobileOTPForm').find('.js-otpProceed').addClass('disabled');
            }
        });
        $('#mobileOTPForm .otp-col .input-textbox:first-child').removeClass('pointer-none');
    });
}

var intervalCalc;
function otpTimerCalc() {
    $(".jsGetOTPSent").addClass("d-none");
    $(".jsOnGetCallCalc").addClass("d-none");
    var timer2 = "03:00";
    $("#timer").html(timer2);
    intervalCalc = setInterval(function () {
        var timer = timer2.split(":");
        var minutes = parseInt(timer[0], 10);
        var seconds = parseInt(timer[1], 10);
        --seconds;
        minutes = seconds < 0 ? --minutes : minutes;
        seconds = seconds < 0 ? 59 : seconds;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $("#timer").html("0" + minutes + ":" + seconds);
        if (minutes < 0) clearInterval(intervalCalc);
        if (seconds <= 0 && minutes <= 0) clearInterval(intervalCalc);
        timer2 = minutes + ":" + seconds;
        if (seconds == 30 && minutes == 2) {
            $(".jsOnGetCallCalc").removeClass('d-none');
        }
        if (seconds <= 0 && minutes <= 0) {

            $(".jsOnGetCallCalc").addClass("d-none");
            $(".jsGetOTPSent").addClass("d-none");

        }
    }, 1000);
}

$(".jsOnGetCallCalc").click(function (e) {
    // getCallCta analytics START
    try{
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('.label-name') 
            ? getParentElement(e.currentTarget, 6).querySelector('.label-name').innerText.trim() : '';
        var componentName = window.location.href.split('/').reverse().shift().split('.').shift() + '-form';
        ctaInteraction(ctaText, ctaTitle, componentName, getProductCode());
    } catch (err) {console.log(err);}
    // getCallCta analytics END
    $(this).addClass("d-none");
    var reqObj = {
        "header": {
            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
            "identifier": "nli"
        },
        "body": {
            "mobileNumber": $('#whatsapp-email-modal input[data-type="mobile"]').val(),
            "otpRefNo": otpRefNo,
        }
    }
    $('#loaderWealth').css({ 'display': 'block' })
    getInTouchFilterObj.onCallOtp(reqObj).then(function (response) {
        if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.status.toLowerCase() == 'success') {
            $('#loaderWealth').css({ 'display': 'none' })
            $(this).addClass("d-none");
            $(".jsGetCallingCalc").removeClass("d-none");
            setTimeout(() => {
                $(".jsGetCallingCalc").addClass("d-none");
                $(".jsGetOTPSent").removeClass("d-none");
            }, 3000);
        }
    }).catch(function (error) {
        $('#loaderWealth').css({ "display": 'none' });
        $(".jsGetCallingCalc").addClass("d-none");
        showFailureCalcModal();
    });
    $(".height-scroll").removeAttr("style");
});

function clearOtpTimer() {
    clearInterval(intervalCalc);
}

function showFailureCalcModal() {
    if ($('.js-errorWrap').hasClass("hidden") || $('#js-wrong').hasClas('hidden')) {
        $('.js-errorWrap').removeClass('hidden');
        $('#js-wrong').removeClass('hidden');
    } else {
        $('.js-errorWrap').addClass('hidden');
        $('#js-wrong').addClass('hidden');
    }
    $('.js-getResultFormWrap').addClass('hidden');
    $(".height-scroll").removeAttr("style");
    $(".jsOnGetCallCalc").removeClass("d-none");
    $('.jsGetCallingCalc').addClass('d-none');
}