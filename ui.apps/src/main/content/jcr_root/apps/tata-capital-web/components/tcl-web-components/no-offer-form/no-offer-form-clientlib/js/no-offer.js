$(document).ready(function () {


    var isCheckboxChecked = $('#iAgreeToContact').is(':checked');

    // Clear Loan aganist form
    $('.jsClearLoanDeatils').click(function () {
        clearCompleteForm();
    })

    var feildsCount = $('#form-no-offers .jsValueOK').length;
    console.log(feildsCount);

    //Loan aganist form key up
    $('#form-no-offers .input-textbox[data-type]').keyup(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_required = 'Field is required';
        var ele_email = "Please enter valid email ID";
        var ele_name = "Please enter full name";
        var ele_phoneNumber = "Please enter valid number";
        // var ele_Date = "Please enter valid Date";
        // var ele_pannumber = "Please enter valid PAN number";
        // var ele_pannumber = "Please enter valid PAN number";
        // var ele_propValue = "Please enter a value greater than 7,50,000";
        // var ele_propRequiredValue = "Please enter a value between 1 Lakh & 20 Cr";

        $(this).next('.error-msgs').remove();
        $(this).after('<span class="error-msgs" style="top: 43px"></span>');
        $(this).parents('.form-group').addClass('error');

        // $('.subscribe-success').addClass('d-none');

        if ($(element).val() != '') {
            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
            if ($(element).data('type') === 'name') {
                var regName = /[A-Za-z]+[ ][A-Za-z]+$/;
                if (ele_value != '' && !regName.test(ele_value)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_name);
                    $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'email') {
                var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

                if (ele_value != '' && !ele_value.match(regEmail)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_email);
                    $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'mobile') {
                if (!validateMobile(element)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_phoneNumber);
                    $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    $(element).removeClass('jsValueOK')
                }
            }

        } else {
            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
            $(element).next('.error-msgs').text(ele_required);
        }
        feildsCount = $('#form-no-offers .jsValueOK').length
        console.log(feildsCount);
        // if($('#form-no-offers .jsValueOK').length == 0){
        //     $('.jsOffersFormSubmit').removeClass('btn-disabled');
        // } else {
        //     $('.jsOffersFormSubmit').addClass('btn-disabled');
        // }
    });

    //Loan aganist form submit
    var userPhoneNumber;
    $('#form-no-offers .jsOffersFormSubmit').click(function () {
        var ele_input = $('#form-no-offers').find('.form-textbox-new [data-type]:visible');
        var selectElements = $('#form-no-offers .select2-hidden-accessible[data-type]:visible');
        var checkRequired = 'Please confirm checkbox';
        var errors = [];
        allFilled = true;
        var ele_required = "Field is required";

        $(ele_input).each(function () {
            var element = $(this);
            var ele_value = element.val();
            var ele_email = "Please enter valid email ID";
            var ele_name = "Please enter full name";
            var ele_phoneNumber = "Please enter valid number";

            $(element).parents('.form-textbox-new').find('.error-msgs').remove();
            $(element).parents('.form-textbox-new').addClass('textboxerror');

            if (element.is(":visible")) {
                if (element.val() != '') {
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    $(element).after('<span class="error-msgs" style="top: 43px"></span>');

                    if ($(element).data('type') === 'name') {
                        var regName = /[A-Za-z]+[ ][A-Za-z]+$/;
                        // console.log(regName.test(ele_value))
                        if (ele_value != '' && !regName.test(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_name);
                            errors.push(ele_name);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                        }
                    }
                    if ($(element).data('type') === 'email') {
                        var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

                        if (ele_value != '' && !ele_value.match(regEmail)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_email);
                            errors.push(ele_email)
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                        }
                    }
                    if ($(element).data('type') === 'mobile') {
                        if (!validateMobile(element)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_phoneNumber);
                            errors.push(ele_phoneNumber)
                        } else {
                            userPhoneNumber = $(element).val();
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                        }
                    }
                } else {
                    $(element).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
                    errors.push(ele_required);
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                }
            }
        });

        $(selectElements).each(function () {
            var select = $(this);
            $(select).parents('.form-textbox-new').find('.error-msgs').remove();

            if ($(select).val() == '') {
                allFilled = false;
                $(select).parents('.form-textbox-new').addClass('textboxerror');
                $(select).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                $(select).next('.error-msgs').remove();
                $(select).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
                errors.push(ele_required);
            } else {
                $(select).parents('.form-textbox-new').removeClass('textboxerror');
                $(select).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                $(select).next('.error-msgs').remove();
            }
        });

        console.log(isCheckboxChecked)
        $('#form-no-offers .custom-checkbox-label').next('.error-msgs').remove();
        $('#form-no-offers .custom-checkbox-label').after('<span class="error-msgs" style="top: 100%"></span>');
        if (isCheckboxChecked === true){
            $('#iAgreeToContact').removeClass('jsValueOK');
        } else {
            $('#iAgreeToContact').addClass('jsValueOK');
            errors.push(checkRequired)
            $('#form-no-offers .custom-checkbox-label').next('.error-msgs').text(checkRequired);
        }
        if (errors.length == 0) {
            clearCompleteForm();
            $('.modal-backdrop').remove();
            setTimeout(function () {
                $('#thanks-modal').addClass('popover-show');
            }, 80);

            $('#thanks-modal').css('display', 'block');
            $('body').addClass('popover-modal-open');
            $('body').append('<div class="modal-backdrop"></div>');
        }
    });




    $('#iAgreeToContact').on('change', function (){
        var checkRequired = 'Please confirm checkbox';
        $(this).parents().find('.custom-checkbox-label').next('.error-msgs').remove();
        $(this).parents().find('.custom-checkbox-label').after('<span class="error-msgs" style="top: 100%"></span>');
        isCheckboxChecked = $(this).is(':checked');
        if (isCheckboxChecked === true){
            $(this).removeClass('jsValueOK');
        } else {
            $(this).addClass('jsValueOK');
            $(this).parents().find('.custom-checkbox-label').next('.error-msgs').text(checkRequired);
        }
        inputRequired = $('#form-no-offers .jsValueOK').length;
    })

    //Select 2 on change remove error state
    $('.js-select2').change(function () {
        $(this).parents('.form-textbox-new').removeClass('textboxerror');
        $(this).next('.error-msgs').remove();
        $(this).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
        $(this).removeClass('jsValueOK')
    })

    //Focus open select 2 dropdown
    $(document).on('focus', '.select2.select2-container', function (e) {
        if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
            $(this).siblings('select').select2('open');
        }
    });



    //Back Button confirmation modal
    $('.jsBackTos').click(function (){
        $('.modal-backdrop').remove();
        setTimeout(function () {
            $('#confirmation-modal').addClass('popover-show');
        }, 80);

        $('#confirmation-modal').css('display', 'block');
        $('body').addClass('popover-modal-open');
        $('body').append('<div class="modal-backdrop"></div>');
    })

})

function clearCompleteForm() {
    $('#form-no-offers .input-textbox[data-type]').addClass('jsValueOK')
    $('#form-no-offers .input-textbox').val('');
    $('#form-no-offers .form-textbox-new').removeClass('active onchange');
    $('#form-no-offers .form-textbox-new .text-infos').removeClass('hide-input-note');
    $('.js-select2').each(function () {
        $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
        $('.js-select2').parents('.form-textbox-new').addClass('active');
        $('.js-select2').next('.error-msgs').remove();
        $('.js-select2').val(null).trigger('change');
        $('.js-select2').addClass('jsValueOK');
    });

    $('#form-no-offers .input-textbox').parents('.form-textbox-new').removeClass('textboxerror');
    $('#form-no-offers .input-textbox').next().text('');

    //Clear checkbox
    $('#iAgreeToContact').prop('checked', true)
}