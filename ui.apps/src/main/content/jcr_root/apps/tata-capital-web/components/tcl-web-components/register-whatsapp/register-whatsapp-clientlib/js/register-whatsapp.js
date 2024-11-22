$(document).ready(function (){

    var phoneNumber;
    var isCheckboxChecked = $('#iAgreeTerms').is(':checked');
    var inputRequired = $('#download-app-verfiy .jsValueOK').length;
    $('#download-app-verfiy .input-textbox[data-type]').keyup(function () {
        var element = $(this);
        var ele_required = 'Field is required';
        var ele_phoneNumber = "Please enter valid number";

        phoneNumber = $(element).val();

        $(this).next('.error-msgs').remove();
        $(this).after('<span class="error-msgs" style="top: 100%"></span>');
        $(this).parents('.form-group').addClass('error');
        if ($(element).val() != '') {
            if ($(element).data('type') === 'otp-send-number') {
                if (!validateMobile(element)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_phoneNumber);
                    $('.submit-number-btn').addClass('btn-disabled');
                    $(this).addClass('jsValueOK');
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(this).removeClass('jsValueOK');
                    $('.submit-number-btn').removeClass('btn-disabled');
                }
            }
        } else {
            $(element).next('.error-msgs').text(ele_required);
            $('.submit-number-btn').addClass('btn-disabled');
        }
        if (isCheckboxChecked != true){
            $('.submit-number-btn').addClass('btn-disabled');
        }
        inputRequired = $('#download-app-verfiy .jsValueOK').length;
        // console.log(inputRequired)
        if (inputRequired === 0){
            $('.submit-number-btn').removeClass('btn-disabled');
        }
    });


    $('#download-app-verfiy .jsSumitBtn').click(function () {
        $('.submit-number-btn').addClass('btn-disabled');
        var ele_input = $('#download-app-verfiy').find('.form-textbox-new [data-type]:visible');
        var checkRequired = 'Please confirm checkbox';
        var errors = [];
        allFilled = true;
        var ele_required = "Field is required";

        $(ele_input).each(function () {
            var element = $(this);
            var ele_phoneNumber = "Please enter valid number";

            $(element).parents('.form-textbox-new').find('.error-msgs').remove();
            $(element).parents('.form-textbox-new').addClass('textboxerror');

            if (element.is(":visible")) {
                if (element.val() != '') {
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    $(element).after('<span class="error-msgs" style="top: 43px"></span>');

                    if ($(element).data('type') === 'otp-send-number') {
                        if (!validateMobile(element)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_phoneNumber);
                            errors.push(ele_phoneNumber)
                        } else {
                            userPhoneNumber = $(element).val();
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                        }
                    }
                } else {
                    $(element).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
                    errors.push(ele_required);
                }
            }
        });

        // console.log(isCheckboxChecked)
        if (isCheckboxChecked === true){
            $('#iAgreeTerms').removeClass('jsValueOK');
        } else {
            $('#iAgreeTerms').addClass('jsValueOK');
            errors.push(checkRequired)
            $('#iAgreeTerms').parents().find('.custom-checkbox-label').next('.error-msgs').text(checkRequired);
        }


        if (errors.length == 0) {
            $('#download-app-verfiy').addClass('d-none')
            $('.download-app-otp-wrap').removeClass('d-none')
            $('.jsOTPInputBox').find('.js-OtpBox .input-textbox:first-child').focus();
            //Clear
            $('#download-app-verfiy .input-textbox').val('');
            $('#download-app-verfiy .form-textbox-new').removeClass('active');
            $('.jsEnterOtp').removeClass('d-none');
            $('.jsDownloadHeading').addClass('d-none');
        }

    });


    $('#iAgreeTerms').on('change', function (){
        var checkRequired = 'Please confirm checkbox';
        $(this).parents().find('.custom-checkbox-label').next('.error-msgs').remove();
        $(this).parents().find('.custom-checkbox-label').after('<span class="error-msgs" style="top: 100%"></span>');
        isCheckboxChecked = $(this).is(':checked');
        // console.log(isCheckboxChecked)
        if (isCheckboxChecked === true){
            $(this).removeClass('jsValueOK');
        } else {
            $(this).addClass('jsValueOK');
            $(this).parents().find('.custom-checkbox-label').next('.error-msgs').text(checkRequired);
        }
        inputRequired = $('#download-app-verfiy .jsValueOK').length;
        if (inputRequired === 0){
            $('.submit-number-btn').removeClass('btn-disabled');
        } else {
            $('.submit-number-btn').addClass('btn-disabled');
        }
    })



    $(".download-app-otp-wrap .js-OtpBox .input-textbox").keyup(function () {
        if (this.value.length == this.maxLength) {
            $(this).next('.input-textbox').focus();
            $(this).next('.input-textbox').removeClass('pointer-none');
        } else {
            $(this).prev('.input-textbox').focus();
            $(this).addClass('pointer-none');
            $('.js-OtpBox .input-textbox:first').removeClass('pointer-none');
        }

        var ele_input = $('.js-OtpBox .input-textbox');
        $(ele_input).each(function () {
            if ($(this).val().length != 0) {
                $(this).parents('.download-app-otp-wrap').find('.verify-otp-btn').removeClass('btn-disabled');
            } else {
                $(this).parents('.download-app-otp-wrap').find('.verify-otp-btn').addClass('btn-disabled');
            }
        });
    })

    $('.download-app-otp-wrap .verify-otp-btn').click(function () {
        $('.download-app-otp-wrap .verify-otp-btn').addClass('btn-disabled');
        $('.jsShowWhatsappNumber').text(phoneNumber);
        var values = []
        $('.download-app-otp-wrap .js-OtpBox .input-textbox').each(function (i, ele) {
            values.push(ele.value);
        });
        // console.log(values.join(""))
        if (values.join("") == "9999") {
            $('.jsOTPVerifySuccess').removeClass('d-none');
        } else {
            $('.jsOTPVerifyFail').removeClass('d-none');
        }
        $('.jsDownloadHeading').addClass('d-none');
        $('.jsEnterOtp').addClass('d-none');
        $('.download-app-otp-wrap').addClass('d-none');
    })

    //Otp details close button
    $('.jsOTPMsgClose').click(function () {
        $('.download-app-otp-wrap .js-OtpBox .input-textbox').val('');
        $('.download-app-otp-msg').addClass('d-none');
        $('.download-app-otp-wrap').addClass('d-none');
        $('#download-app-verfiy ').removeClass('d-none');
        $('.jsEnterOtp').addClass('d-none');
        $('.jsDownloadHeading').removeClass('d-none');
        $('#iAgreeTerms').prop('checked', true);
    })

    /*otp msg try again*/
    $('.jsTryAgain').click(function () {
        $('.jsEnterOtp').removeClass('d-none');
        $('.download-app-otp-wrap').removeClass('d-none');
        $('.download-app-otp-wrap .verify-otp-btn').addClass('btn-disabled');
        $('.download-app-otp-msg').addClass('d-none');
        $('.download-app-otp-wrap .js-OtpBox .input-textbox').val('');
        $('.download-app-otp-wrap .js-OtpBox .input-textbox:first-child').focus();
    });
    /*otp msg resend*/
    $('.jsResendOtp').click(function () {
        $('.download-app-otp-wrap .verify-otp-btn').addClass('btn-disabled');
        $('.download-app-otp-wrap .js-OtpBox .input-textbox').val('');
        $('.download-app-otp-wrap .js-OtpBox .input-textbox:first-child').focus();
    });
})