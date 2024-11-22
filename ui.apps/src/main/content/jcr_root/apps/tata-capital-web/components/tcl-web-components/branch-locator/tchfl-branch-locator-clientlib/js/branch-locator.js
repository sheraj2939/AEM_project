$(document).ready(function (){

    var selectFieldsLength = $('#jsBranchSelects .select2-hidden-accessible[data-type]:visible').length;
    var selectedCount = 0;

    $('.jsGetDetailsViaSMS').click(function (){
        $('.jsSMSSendSuccess').addClass('d-none');
        $('.jsSmsDetails').removeClass('d-none');
        $('.modal-backdrop').remove();
        setTimeout(function () {
            $('#thankyou-modal').addClass('popover-show');
        }, 80);

        $('#thankyou-modal').css('display', 'block');
        $('body').addClass('popover-modal-open');
        $('body').append('<div class="modal-backdrop"></div>');
        $('.jsSmsDetails .input-textbox[data-type="mobile-number"]').val('');
        $('.jsSmsDetails .form-textbox-new').removeClass('active textboxerror');
    })

    //Loan aganist form key up
    $('#branchSMSDetails .input-textbox[data-type]').keyup(function () {
        console.log('sdf')
        var element = $(this);
        var ele_value = element.val();
        var ele_required = 'Field is required';
        var ele_phoneNumber = "Please enter valid number";

        $(this).next('.error-msgs').remove();
        $(this).after('<span class="error-msgs" style="top: 43px"></span>');
        $(this).parents('.form-group').addClass('error');

        if ($(element).val() != '') {
            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
            if ($(element).data('type') === 'mobile-number') {
                if (!validateMobile(element)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_phoneNumber);
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                }
            }

        } else {
            $(element).next('.error-msgs').text(ele_required);
        }
    });

    //SMS submit
    $('.jsSendDeatilsBtn').click(function () {
        var ele_input = $('#branchSMSDetails').find('.form-textbox-new [data-type]:visible');
        var errors = [];
        allFilled = true;
        var ele_required = "Field is required";

        $(ele_input).each(function () {
            var element = $(this);
            // var ele_value = element.val();
            var ele_phoneNumber = "Please enter valid number";

            $(element).parents('.form-textbox-new').find('.error-msgs').remove();
            $(element).parents('.form-textbox-new').addClass('textboxerror');

            if (element.is(":visible")) {
                if (element.val() != '') {
                    $(element).after('<span class="error-msgs" style="top: 43px"></span>');

                    if ($(element).data('type') === 'mobile-number') {
                        if (!validateMobile(element)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_phoneNumber);
                            errors.push(ele_phoneNumber)
                        } else {
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
        console.log(errors)
        if (errors.length == 0) {
            $('.jsSmsDetails').addClass('d-none');
            $('.jsSMSSendSuccess').removeClass('d-none');
        }
    });

    $('.jsThanksModalClose').click(function (){
        clearSelectFeilds();
        // $('.branch-details-box').addClass('d-none');
        // $('.branch-instant-loan-cntr').addClass('d-none');
        selectedCount = 0;
        console.log(selectedCount, selectFieldsLength)
    })


    $('.js-tabClick').click(function (){
        clearSelectFeilds();
        selectFieldsLength = $('#jsBranchSelects .select2-hidden-accessible[data-type]:visible').length;
        selectedCount = 0;
        console.log(selectedCount, selectFieldsLength);
        // $('.branch-details-box').addClass('d-none');
        // $('.branch-instant-loan-cntr').addClass('d-none');
    })

    // console.log($('#jsBranchSelects .select2-hidden-accessible[data-type]:visible').length);
    $('.js-select2').change(function () {
        $(this).parents('.form-textbox-new').removeClass('textboxerror');
        $(this).next('.error-msgs').remove();
        selectedCount = selectedCount + 1;
        if (selectedCount === selectFieldsLength){

            // $('.branch-details-box').removeClass('d-none');
            // $('.branch-instant-loan-cntr').removeClass('d-none');
            selectedCount = 0;
        }
    })

    //Focus open select 2 dropdown
    $(document).on('focus', '.select2.select2-container', function (e) {
        if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
            $(this).siblings('select').select2('open');
        }
    });
})

function clearSelectFeilds(){
    $('.js-select2').each(function () {
        $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
        $('.js-select2').parents('.form-textbox-new').addClass('active');
        $('.js-select2').next('.error-msgs').remove();
        $('.js-select2').val(null).trigger('change');
    });
}