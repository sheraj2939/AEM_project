$(document).ready(function () {
    // Select 2 js //
    $(".js-select2").select2({
      placeholder: "Select",
    });
    $(".js-select2-search-hide").select2({
      minimumResultsForSearch: Infinity,
    });
});
$(document).ready(function () {


    var feildsCount = $('#custom-testimonial .jsValueOK').length;

    //Customer testimontoal form key up
    $('#custom-testimonial .input-textbox[data-type]').keyup(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_required = 'Field is required';
        var ele_email = "Please enter valid email ID";
        var ele_name = "Please enter full name";

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
            if ($(element).data('type') === 'feedback') {
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
            if ($(element).data('type') === 'feedback') {
                $(element).parents('.form-textbox-new').addClass('textboxerror');
                $(element).addClass('jsValueOK');
            }
            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
            $(element).parents('.textbox-inner').removeClass('has-rupee-icon');
            $(element).parents('.textbox-inner').find('.icon-rupee').addClass('d-none');
            $(element).next('.error-msgs').text(ele_required);
        }
        feildsCount = $('#custom-testimonial .jsValueOK').length;
        // console.log(feildsCount)
        if (feildsCount == 0) {
            $('.jsSubmitFeedback').removeClass('btn-disabled');
        } else {
            $('.jsSubmitFeedback').addClass('btn-disabled');
        }
    });
    var loanQueryCheckbox = true;
    $('.jsIAgree').on('change', function () {
        var errors = [];
        var ele_checkbox = 'Please confirm checkbox';
        loanQueryCheckbox = event.target.checked;
        if (loanQueryCheckbox) {
            $('#custom-testimonial .form-check .error-msgs').remove();
            $('#custom-testimonial .form-check').removeClass('textboxerror');
            $('#custom-testimonial .form-check .form-check-input').removeClass('jsValueOK');
        } else {
            if ($('#custom-testimonial .form-check').find('.error-msgs').length > 0) {
                errors.push(ele_checkbox);
            }
            if ($('#custom-testimonial .form-check').find('.error-msgs').length === 0) {
                $('#custom-testimonial .form-check .form-check-label').after('<span class="error-msgs"></span>');
                $('#custom-testimonial .form-check .form-check-input').addClass('jsValueOK');
                $('#custom-testimonial .form-check').addClass('textboxerror');
                $('#custom-testimonial .form-check .error-msgs').html(ele_checkbox);
                errors.push(ele_checkbox);
            }
        }
        if ($('#custom-testimonial .jsValueOK').length === 0) {
            $('.jsSubmitFeedback').removeClass('btn-disabled');
        } else {
            $('.jsSubmitFeedback').addClass('btn-disabled');
        }
    })
    //Customer testimontoal submit
    $('#custom-testimonial .jsSubmitFeedback').click(function () {
        $('.jsSubmitFeedback').addClass('btn-disabled');
        var ele_input = $('#custom-testimonial').find('.form-textbox-new [data-type]:visible');
        var selectElements = $('#custom-testimonial .select2-hidden-accessible[data-type]:visible');
        var errors = [];
        allFilled = true;
        var ele_required = "Field is required";
        var ele_checkbox = 'Please confirm checkbox';

        $(ele_input).each(function () {
            var element = $(this);
            var ele_value = element.val();
            var ele_email = "Please enter valid email ID";
            var ele_name = "Please enter full name";

            $(element).parents('.form-textbox-new').find('.error-msgs').remove();
            $(element).parents('.form-textbox-new').addClass('textboxerror');

            if (element.is(":visible")) {
                if (element.val() != '') {
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    $(element).after('<span class="error-msgs" style="top: 43px"></span>');

                    if ($(element).data('type') === 'name') {
                        var regName = /[A-Za-z]+[ ][A-Za-z]+$/;
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
                    if ($(element).data('type') === 'feedback') {
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            errors.push(ele_required)
                            $(element).addClass('jsValueOK');
                        }
                    }
                } else {
                    $(element).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
                    errors.push(ele_required);
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                }
            }
            // console.log(loanQueryCheckbox)
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

        if (loanQueryCheckbox) {
            $('#custom-testimonial .form-check').removeClass('textboxerror');
            $('#custom-testimonial .form-check-input').removeClass('jsValueOK');
            $('#custom-testimonial .error-msgs').remove();
        } else {
            $('#custom-testimonial .form-check').addClass('textboxerror');
            $('#custom-testimonial .form-check-input').addClass('jsValueOK');
            $('#custom-testimonial .error-msgs').remove();
            if ($('#custom-testimonial .form-check').find('.error-msgs').length > 0) {
                errors.push(ele_checkbox);
            }
            if ($('#custom-testimonial .form-check').find('.error-msgs').length === 0) {
                $('#custom-testimonial .form-check .form-check-label').after('<span class="error-msgs"></span>');
                $('#custom-testimonial .form-check .form-check-input').addClass('jsValueOK');
                $('#custom-testimonial .form-check').addClass('textboxerror');
                $('#custom-testimonial .form-check .error-msgs').html(ele_checkbox);
                errors.push(ele_checkbox);
            }

        }

        // console.log(errors)
        if (errors.length == 0) {
            $('.modal-backdrop').remove();
            setTimeout(function () {
                $('#thankyou-modal').addClass('popover-show');
            }, 80);

            $('#thankyou-modal').css('display', 'block');
            $('body').addClass('popover-modal-open');
            $('body').append('<div class="modal-backdrop"></div>');
            $('.jsSubmitFeedback').addClass('btn-disabled');


            $('#custom-testimonial .input-textbox[data-type]').addClass('jsValueOK')
            $('#custom-testimonial .input-textbox').val('');
            $('#custom-testimonial .form-textbox-new').removeClass('active onchange');
            $('.js-select2').each(function () {
                $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
                $('.js-select2').parents('.form-textbox-new').addClass('active');
                $('.js-select2').next('.error-msgs').remove();
                $('.js-select2').val(null).trigger('change');
                $('.js-select2').addClass('jsValueOK');
            });

            $('#custom-testimonial .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
            $('#custom-testimonial .input-textbox[data-type]').next().text('');
            $('.form-textarea').closest('.form-textbox-new').addClass('active');
            $('#stars li').removeClass('selected')
            $('#custom-testimonial .form-check .form-check-input').prop('checked', true);
            loanQueryCheckbox = true;

        }

    });



    //Focus open select 2 dropdown
    $(document).on('focus', '.select2.select2-container', function (e) {
        if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
            $(this).siblings('select').select2('open');
        }
    });

    //Select 2 on change remove error state
    $('.js-select2').change(function () {
        $(this).parents('.form-textbox-new').removeClass('textboxerror');
        $(this).next('.error-msgs').remove();
        $(this).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
        $(this).removeClass('jsValueOK')
        if ($('#custom-testimonial .jsValueOK').length == 0) {
            $('.jsSubmitFeedback').removeClass('btn-disabled');
        } else {
            $('.jsSubmitFeedback').addClass('btn-disabled');
        }
    })



    //Star selection
    $('#stars li').on('mouseover', function () {
        var onStar = parseInt($(this).data('value'), 10);
        $(this).parent().children('li.star').each(function (e) {
            if (e < onStar) {
                $(this).addClass('hover');
            }
            else {
                $(this).removeClass('hover');
            }
        });

    }).on('mouseout', function () {
        $(this).parent().children('li.star').each(function (e) {
            $(this).removeClass('hover');
        });
    });
    $('#stars li').on('click', function () {
        var onStar = parseInt($(this).data('value'), 10);
        var stars = $(this).parent().children('li.star');

        for (i = 0; i < stars.length; i++) {
            $(stars[i]).removeClass('selected');
        }

        for (i = 0; i < onStar; i++) {
            $(stars[i]).addClass('selected');
        }
    });


})