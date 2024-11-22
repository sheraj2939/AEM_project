$(document).ready(function (){

    $('.jsResultsForm .jsShowProjectBtn').click(function () {
        // var selectElements = $('.jsResultsForm .select2-hidden-accessible[data-type]:visible');
        // var errors = [];
        // allFilled = true;
        // var ele_required = "Field is required";

        // $(selectElements).each(function () {
        //     var select = $(this);
        //     $(select).parents('.form-textbox-new').find('.error-msgs').remove();

        //     if ($(select).val() == '') {
        //         allFilled = false;
        //         $(select).parents('.form-textbox-new').addClass('textboxerror');
        //         $(select).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
        //         $(select).next('.error-msgs').remove();
        //         $(select).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
        //         errors.push(ele_required);
        //     } else {
        //         $(select).parents('.form-textbox-new').removeClass('textboxerror');
        //         $(select).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
        //         $(select).next('.error-msgs').remove();
        //     }
        // });
        // console.log(errors.length)
        // if (errors.length == 0) {
            // clearForm();
        // }
    })



    //Select 2 on change remove error state
    $('.js-select2').change(function () {
        $(this).parents('.form-textbox-new').removeClass('textboxerror');
        $(this).next('.error-msgs').remove();
        $(this).removeClass('jsValueOK');
    })

    $('.jsClearForm').click(function (){
        clearForm ();
    })

    //Focus open select 2 dropdown
    $(document).on('focus', '.select2.select2-container', function (e) {
        if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
            $(this).siblings('select').select2('open');
        }
    });

    // function clearForm () {
    //     $('.js-select2').each(function () {
    //         $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
    //         $('.js-select2').parents('.form-textbox-new').addClass('active');
    //         $('.js-select2').next('.error-msgs').remove();
    //         $('.js-select2').val(null).trigger('change');
    //         $('.js-select2').addClass('jsValueOK');
    //     });
    //     $('.jsResultsForm .input-textbox').val('');
    //     $('.jsResultsForm .input-textbox').parents('.form-textbox-new').removeClass('active');
    // }

})