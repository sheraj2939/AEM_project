$(document).ready(function (){
    var targetVal;
    $('.jsChannelSelect .custom-radio input').change(function (){
        targetVal = $(this).val();
        $('.jsChannelSelect .custom-radiobox-label').removeClass('active');
        $(this).closest('.custom-radiobox-label').addClass('active');
        var radioState = $('.jsChannelSelect .custom-radio input').is(":checked");
        // $('.found-products-box').addClass('d-none');
        $('.jsProductResults').addClass('d-none');
        if ( radioState === true){
            $('.looking-for-wrap').addClass('d-none');
            $('[data-content="' + targetVal + '"]').removeClass('d-none');
        }
        clearForm();
    })
    $('.js-select2').change(function () {
        $(this).parents('.form-textbox-new').removeClass('textboxerror');
        $(this).next('.error-msgs').remove();
        // $('.found-products-box').removeClass('d-none');
        if($(this).val() !== ''){
            $('.jsProductResults').addClass('d-none');
            $('[data-result="' + targetVal + '"]').removeClass('d-none');
        }
    })

    function clearForm(){
        $('.js-select2').each(function () {
            $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
            $('.js-select2').parents('.form-textbox-new').addClass('active');
            $('.js-select2').next('.error-msgs').remove();
            $('.js-select2').val(null).trigger('change');
        });
    }
})