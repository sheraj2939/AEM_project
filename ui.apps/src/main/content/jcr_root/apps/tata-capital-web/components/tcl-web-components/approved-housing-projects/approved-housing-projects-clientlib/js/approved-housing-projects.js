$(document).ready(function (){

    // $('.jsProjectForm .jsShowProjectBtn').click(function () {
    //     // var selectElements = $('.jsProjectForm .select2-hidden-accessible[data-type]:visible');
    //     // var errors = [];
    //     // allFilled = true;
    //     // var ele_required = "Field is required";

    //     // $(selectElements).each(function () {
    //     //     var select = $(this);
    //     //     $(select).parents('.form-textbox-new').find('.error-msgs').remove();

    //     //     if ($(select).val() == '') {
    //     //         allFilled = false;
    //     //         $(select).parents('.form-textbox-new').addClass('textboxerror');
    //     //         $(select).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
    //     //         $(select).next('.error-msgs').remove();
    //     //         $(select).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
    //     //         errors.push(ele_required);
    //     //     } else {
    //     //         $(select).parents('.form-textbox-new').removeClass('textboxerror');
    //     //         $(select).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
    //     //         $(select).next('.error-msgs').remove();
    //     //     }
    //     // });
    //     // console.log(errors.length)
    //     // if (errors.length == 0) {
    //         clearForm();
    //         // document.location.href = "approved-projects-results.html";
    //     // }
    // })



    //Select 2 on change remove error state
    $('.js-select2').change(function () {
        $(this).parents('.form-textbox-new').removeClass('textboxerror');
        $(this).next('.error-msgs').remove();
        $(this).removeClass('jsValueOK');
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
    //     $('.js-filterBtn a').text('Select');
    //     $('.js-filterBtn a').css('color', '#828282');
    //     $('.jsMulitSelectValue').val('Select')
    //     $('.jsProjectForm .input-textbox').val('');
    //     $('[jsname="selectBuilder"] .select-item.active').each(function() {
    //         $( this ).removeClass('active');
    //       });
    //     $(".js-filterCheck").prop('checked', false);
    //     // $('[jsname="selectBuilder"] .select-item.active').removeClass('active');
    // }

})
var simpleBarTimeout = setTimeout(simpleBar, 2000);
/*simple scroll bar*/
function simpleBar(){
if ($(".simple-bar").length > 0) {
  $(".simple-bar").each(function (e) {
    new SimpleBar($(".simple-bar")[e]);
  });
}
}
/*simple scroll bar*/