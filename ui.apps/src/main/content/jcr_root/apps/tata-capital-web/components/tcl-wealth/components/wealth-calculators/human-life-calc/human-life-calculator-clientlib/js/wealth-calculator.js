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
    $('#investmentForm .input-textbox').keyup(function () {
        validateInvestmentField($(this));
    });

    if ($(window).width() > 767) {
        if ($('.investment-table-scroll').length) {
            new SimpleBar($('.investment-table-scroll')[0]);
        }
    }
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
            goalSip();

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
    if (retirementAge == '' || retirementAge > 60 || retirementAge <= currentAge) {
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
            else if ($(element).data('type') === 'years') {

                if (ele_value != '' && (parseInt(ele_value) < 5 || parseInt(ele_value) > 60)) {
                    $(element).next('.error-msgs').text(ele_years);
                    errors.push(ele_years);
                    numberYears = ele_years;
                }
                else {
                    $(element).next('.error-msgs').text('');
                }
            }
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
function validateInvestmentField(element, errors) {
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
}

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
                        var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;

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

            var getEmail = $('#getResultForm [data-type="email"]').val();
            var emailEncrypt = getEmail.replace(/(\w{2})(.*)(\w{2})@(.*)/, '$1XXXXXX$3@$4');
            $('.js-encryptEmail').text(emailEncrypt);

            $('.js-getResultFormWrap').addClass('hidden');
            $('.js-otpFormWrap').removeClass('hidden');
            $('.js-otpFormWrap #mobileOTPForm').find('.otp-col .input-textbox:first-child').focus();
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
                var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;

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

    $('.js-editNumber').click(function () {
        $('.js-getResultFormWrap').removeClass('hidden');
        $(".js-getResultFormWrap input[data-type='mobile']").focus();
        $('.js-otpFormWrap').addClass('hidden');
        $(".js-otpFormWrap input[data-type='OTP']").val('');
        $('.js-otpProceed').addClass('disabled');
    });

    getOTPAndResendOTP();
    $('#mobileOTPForm .js-otpProceed').click(function () {
        var values = [];
        // var elePage_error = $(this).data('error');
        // var elePage_thank = $(this).data('thank');
        $("#mobileOTPForm input[data-type='OTP']").each(function (i, ele) { values.push(ele.value) });

        $('.js-otpFormWrap').addClass('hidden');
        $('.js-MessageWrap').removeClass('hidden');

        if (values.join("") == "9999") {
            $('#js-errorMsgWrap').addClass('hidden');
            $('#js-thankyouWrap').removeClass('hidden');
        }
        else {
            $('#js-thankyouWrap').addClass('hidden');
            $('#js-errorMsgWrap').removeClass('hidden');
        }

        $('#mobileOTPForm').find("input[data-type='OTP']").val('');
        $('#mobileOTPForm').find('.js-otpProceed').addClass('disabled');
    });

    $('.js-tryAgainOTP').click(function () {
        $('.js-MessageWrap').addClass('hidden');
        $('.js-otpFormWrap').removeClass('hidden');

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

    $('#resendOTP').click(function () {
        $(this).parents('#mobileOTPForm').find("input[data-type='OTP']").val('');
        $(this).parents('#mobileOTPForm').find('button').addClass('disabled');
        $(this).parents('#mobileOTPForm').find('.otp-col .input-textbox:first-child').focus();
        $(this).parents('#mobileOTPForm').find('.otp-col .input-textbox').addClass('pointer-none');
        $(this).parents('#mobileOTPForm').find('.otp-col .input-textbox:first-child').removeClass('pointer-none');
    });
}