$(document).ready(function () {
    try {
        var backBtn = document.querySelector('.formBackBtn');
        backBtn.addEventListener('click', function (e) {
            if (window.history.length < 2) {
                window.close();
            } else {
                window.history.back();
            };
        });

    } catch (e) { console.log(e) }

    // Clear contact  us form
    $('.jsClearContactForm').click(function () {
        clearCompleteForm();
    })

    var feildsCount = $('#loan-against-property .jsValueOK').length;

    var emailFlag = false;
    var validEmail = {};
    var emailArr;
    var dummyDomains = [];
    $('[data-type="email"]').focus(function () {
        if (!emailFlag && !sessionStorage.getItem("email")) {
        } else { }
    })
    //contact  us form key up
    $('#loan-against-property .input-textbox[data-type]').keyup(function () {
        if (sessionStorage.getItem("email")) {
            dummyDomains = sessionStorage.getItem("email");
            emailArr = sessionStorage.getItem("emailArr");
            emailArr = JSON.parse(emailArr);
        }
        var element = $(this);
        var ele_value = element.val();
        var ele_required = 'Field is required';
        var ele_phoneNumber = "Please enter valid number";
        var ele_email = "Please enter valid email ID";
        var ele_name = "Please enter full name";
        $(this).next('.error-msgs').remove();
        $(this).after('<span class="error-msgs" style="top: 43px"></span>');
        $(this).parents('.form-group').addClass('error');


        if ($(element).val() != '') {
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
                if ((ele_value != '') && !ele_value.match(regEmail)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_email);
                    $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).removeClass('jsValueOK');
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
                    $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'message') {
                if (ele_value != '') {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).removeClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_required);
                    $('.error-msgs').css("top","90px");
                    $(element).addClass('jsValueOK');
                }
            }
        } else {
            if ($(element).data('type') === 'message') {
                $(element).parents('.form-textbox-new').addClass('textboxerror');
                $('.error-msgs').css("top","90px");
                $(element).addClass('jsValueOK');
            }
            $(element).next('.error-msgs').text(ele_required);
        }
        feildsCount = $('#loan-against-property .jsValueOK').length;

        if (feildsCount == 0) {
            $('.jsApplyContactUsNo').removeClass('btn-disabled');
        } else {
            $('.jsApplyContactUsNo').addClass('btn-disabled');
        }
    });

    //contact  us form submit
    var userPhoneNumber;
    $('#loan-against-property .jsApplyContactUsNo').click(function () {
        $('.jsApplyContactUsNo').addClass('btn-disabled');
        var ele_input = $('#loan-against-property').find('.form-textbox-new [data-type]:visible');
        var selectElements = $('#loan-against-property .select2-hidden-accessible[data-type]:visible');
        var errors = [];
        allFilled = true;
        var ele_required = "Field is required";

        $(ele_input).each(function () {
            var element = $(this);
            var ele_value = element.val();
            var ele_email = "Please enter valid email ID";
            var ele_phoneNumber = "Please enter valid number";

            $(element).parents('.form-textbox-new').find('.error-msgs').remove();
            $(element).parents('.form-textbox-new').addClass('textboxerror');

            if (element.is(":visible")) {
                if (element.val() != '') {
                    $(element).after('<span class="error-msgs" style="top: 43px"></span>');

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
                        }
                    }
                } else {
                    $(element).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
                    errors.push(ele_required);
                }
            }
        });

        $(selectElements).each(function () {
            var select = $(this);
            $(select).parents('.form-textbox-new').find('.error-msgs').remove();

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

        if (errors.length == 0) {
            clearCompleteForm();
            $('.form-bottom-right-img').addClass('d-none');
            $('.jsMsgContactSuccessful').removeClass('d-none');
            $('#loan-against-property').addClass('d-none');
            $('.jsContactUsNoClose').removeClass('d-none');
            $('.clear-btn').addClass('d-none');
        }

    });

    /*loan against otp msg close*/
    $('.jsContactUsMgs').click(function () {
        $('.jsMsgContactSuccessful').addClass('d-none');
        $('.form-bottom-right-img').removeClass('d-none');
        $('.jsContactUsNoClose').addClass('d-none');
        $('.clear-btn').removeClass('d-none');
        $('#loan-against-property').removeClass('d-none');
        $('.form-bottom-right-img').removeClass('d-none');
        clearCompleteForm();
    });

    //Select 2 on change remove error state
    $('.js-select2').change(function () {
        $(this).parents('.form-textbox-new').removeClass('textboxerror');
        $(this).next('.error-msgs').remove();
        $(this).removeClass('jsValueOK')
        if ($('#loan-against-property .jsValueOK').length == 0) {
            $('.jsApplyContactUsNo').removeClass('btn-disabled');
        } else {
            $('.jsApplyContactUsNo').addClass('btn-disabled');
        }
    })

    //Textarea blur function

    $('.form-textarea').on('blur', function () {
        $(this).closest('.form-textbox-new').addClass('active');
    })

    //Focus open select 2 dropdown
    $(document).on('focus', '.select2.select2-container', function (e) {
        if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
            $(this).siblings('select').select2('open');
        }
    });

})

function clearCompleteForm() {
    $('.jsApplyContactUsNo').addClass('btn-disabled');
    $('#loan-against-property .input-textbox[data-type]').addClass('jsValueOK')
    $('#loan-against-property .input-textbox[data-type]').val('');
    $('#loan-against-property .form-textbox-new').removeClass('onchange');

    $('.js-select2').each(function () {
        $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
        $('.js-select2').parents('.form-textbox-new').addClass('active');
        $('.js-select2').next('.error-msgs').remove();
        $('.js-select2').val(null).trigger('change');
        $('.js-select2').addClass('jsValueOK');
    });

    $('#loan-against-property .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
    $('#loan-against-property .input-textbox[data-type]').next().text('');
    $('.form-textarea').closest('.form-textbox-new').addClass('active');
    $('.input-filebox').closest('.form-textbox-new').addClass('active');
    $('.custom-file-input .no-file-text').text('No file chosen');
    $('.custom-file-input .input-filebox').each(function () {
        $('.custom-file-input .input-filebox[data-file="fileInput"]')[0].value = '';
    })
}