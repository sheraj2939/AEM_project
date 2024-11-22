$(document).ready(function () {

    $(".js-select2").select2({
        placeholder: "Select",
      });
      $(".js-select2-search-hide").select2({
        minimumResultsForSearch: Infinity,
      });

    var feildsCount = $('#loan-mitra .jsValueOK').length;

    //Loan Mitra form key up
    $('#loan-mitra .input-textbox[data-type]').keyup(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_required = 'Field is required';
        var ele_email = "Please enter valid email ID";
        var ele_name = "Please enter full name";
        var ele_phoneNumber = "Please enter valid number";
        var ele_pinCode = "Please enter valid PIN code";

        $(this).next('.error-msgs').remove();
        $(this).after('<span class="error-msgs" style="top: 43px"></span>');
        $(this).parents('.form-group').addClass('error');

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
            if ($(element).data('type') === 'pincode') {
                if (ele_value != '' && ele_value.length != 6) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_pinCode);
                    $(element).addClass('jsValueOK');
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'location') {
                if (ele_value != '') {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).removeClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_required);
                    $(element).addClass('jsValueOK');
                }
            }

        } else {
            if ($(element).data('type') === 'location') {
                $(element).parents('.form-textbox-new').addClass('textboxerror');
                $(element).addClass('jsValueOK');
            }
            if ($(element).data('type') === 'pincode') {
                $(element).parents('.form-textbox-new').addClass('textboxerror');
                $(element).addClass('jsValueOK');
            }
            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
            $(element).next('.error-msgs').text(ele_required);
        }
        feildsCount = $('#loan-mitra .jsValueOK').length
        // console.log(feildsCount);
        if ($('#loan-mitra .jsValueOK').length == 0) {
            // console.log('All good you can submit now')
        }
    });

    //Loan Mitra form submit
    $('#loan-mitra .jsLoanMitraSubmit').click(function () {
        var ele_input = $('#loan-mitra').find('.form-textbox-new [data-type]:visible');
        var selectElements = $('#loan-mitra .select2-hidden-accessible[data-type]:visible');
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

        if (errors.length == 0) {
            clearCompleteForm();
            $('.modal-backdrop').remove();
            setTimeout(function () {
                $('#thankyou-modal').addClass('popover-show');
            }, 80);

            $('#thankyou-modal').css('display', 'block');
            $('body').addClass('popover-modal-open');
            $('body').append('<div class="modal-backdrop"></div>');
        }

    });


    //Select 2 on change remove error state
    $('.js-select2').change(function () {
        $(this).parents('.form-textbox-new').removeClass('textboxerror');
        $(this).next('.error-msgs').remove();
        $(this).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
        $(this).removeClass('jsValueOK')
    })


})

function clearCompleteForm() {
    $('#loan-mitra .input-textbox[data-type]').addClass('jsValueOK')
    $('#loan-mitra .input-textbox[data-type]').val('');
    $('#loan-mitra .form-textbox-new').removeClass('active onchange');
    $('#loan-mitra .form-textbox-new .text-infos').removeClass('hide-input-note');
    $('#loan-mitra .form-textbox-new .icon-rupee').addClass('d-none');
    $('.js-select2').each(function () {
        $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
        $('.js-select2').parents('.form-textbox-new').addClass('active');
        $('.js-select2').next('.error-msgs').remove();
        $('.js-select2').val(null).trigger('change');
        $('.js-select2').addClass('jsValueOK');
    });

    $('#loan-mitra .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
    $('#loan-mitra .input-textbox[data-type]').next().text('');
}