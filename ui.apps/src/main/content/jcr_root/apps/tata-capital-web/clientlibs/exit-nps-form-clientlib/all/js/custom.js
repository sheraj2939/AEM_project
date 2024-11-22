/*6-12-2022*/ 
  $('.jsRatingBtn .rating-label input').click(function(){    
    $(this).parents('.feedback-forms').find('.jsFeedBackTextbox').removeClass('d-none');
  });

  $('.jsRatingBtn .rating-label input.very-good').each(function(){
    $(this).click(function(){
      $(this).parents('.feedback-forms').find('.jsFeedBackTextbox').addClass('d-none');
       /*19-12-2022*/ 
       $(this).parents('.feedback-forms').find('.form-feedback-textarea').val('');
       $(this).parents('.feedback-forms').find('.feedback-reason').removeClass('textboxerror');
       $(this).parents('.feedback-forms').find('.feedback-reason').find('.error-msgs').remove();
       $(this).parents('.feedback-forms').find('.feedback-outers .jscurrent').text("0");
       /*19-12-2022*/
        /*20-1-2023*/ 
      $(this).parents('.feedback-forms').find('.js-select2').val(null).trigger('change');
      /*20-1-2023*/  
    })    
  });

  // NPS feedback toggle submit button
  $('.jsRatingBtn .rating-label input').on('click', function () {
    var serviceVal = $('.jsRatingBtn .rating-label input[name=services]:checked').length;
    var likelyVal = $('.jsRatingBtn .rating-label input[name=likely]:checked').length;
    var reqAmount = $('.jsRatingBtn .rating-label input[name=loan]:checked').length;
    if (serviceVal > 0 && likelyVal > 0 && reqAmount > 0){
      $('.JsNpsSubmit').removeClass('btn-disabled');
    } else{
      $('.JsNpsSubmit').addClass('btn-disabled');
    }
  });

  // NPS modal close
  $('.jsThanksModalClose').on('click', function () {
    $('.jsRatingBtn .rating-label input').prop('checked', false);
    $('.jsFeedBackTextbox').addClass('d-none');
    $('.JsNpsSubmit').addClass('btn-disabled');
    $('.jsFeedBackTextbox .form-feedback-textarea').val('');
    $('#amount-loan').val('');
  });
  
  var npsHeaderHeight = $('.header.nps-header').outerHeight();
  console.log(npsHeaderHeight);
  $('body').css('padding-top', npsHeaderHeight);
  /*6-12-2022*/

  $('[data-dismiss="popover-modal"]').on('click', function () {
    $(this).parents('.popover-modal').removeClass('popover-show');
    $(this).parents('.popover-modal').removeAttr('style');
    $('.height-scroll').removeAttr('style');
    $('body').removeClass('popover-modal-open');
    $('.modal-backdrop').remove();


    var src = $('#video-modal iframe').attr('src');
    $('#video-modal iframe').attr('src', '');
    $('#video-modal iframe').attr('src', src);



  });
  /*modal js*/


  /*nps form 19-12-2022*/ 
  $('#nps-form [data-type]').keyup(function () {
    var element = $(this);
    var ele_value = element.val();
    var ele_required = 'Field is required';

    $(this).next('.error-msgs').remove();
    $(this).after('<span class="error-msgs"></span>');
    $(this).parents('.feedback-reason').addClass('textboxerror');

    if ($(element).val() != '') {
      if ($(element).data('type') === 'feedback1') {        
        if (ele_value === '') {
          $(element).parents('.feedback-reason').addClass('textboxerror');
          $(element).next('.error-msgs').text(ele_required);
        }
        else {
          $(element).parents('.feedback-reason').removeClass('textboxerror');
          $(element).next().text('');
        }
      }
      if ($(element).data('type') === 'feedback2') {        
        if (ele_value === '') {
          $(element).parents('.feedback-reason').addClass('textboxerror');
          $(element).next('.error-msgs').text(ele_required);
        }
        else {
          $(element).parents('.feedback-reason').removeClass('textboxerror');
          $(element).next().text('');
        }
      }
      /*if ($(element).data('type') === 'required-loan') {        
        if (ele_value === '') {
          $(element).parents('.feedback-reason').addClass('textboxerror');
          $(element).next('.error-msgs').text(ele_required);
        }
        else {
          $(element).parents('.feedback-reason').removeClass('textboxerror');
          $(element).next().text('');
        }
      }*/    

    } else {
      $(element).next('.error-msgs').text(ele_required);
    }
  });

   /*20-1-2023*/ 
   $('#nps-form .js-select2').change(function () {
    $(this).parents('.form-textbox-new').removeClass('textboxerror');    
    $(this).next('.error-msgs').remove();
  })
  /*20-1-2023*/


  $('#nps-form .JsNpsSubmit').click(function () {
      /*20-1-2023*/ 
      var ele_input = $('#nps-form .form-feedback-textarea[data-type]:visible');    
      var selectElements = $('#nps-form .select2-hidden-accessible[data-type]:visible');
      /*20-1-2023*/ 
      var errors = [];
      allFilled = true;
      var ele_required = "Field is required";
  
      /*20-1-2023*/ 
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
      /*20-1-2023*/

    var ele_input = $('#nps-form .form-feedback-textarea:visible');
   /* var errors = [];
    allFilled = true;
    var ele_required = "Field is required"; */

    $(ele_input).each(function () {
      var element = $(this);
      var ele_value = element.val();

      $(element).next().remove();

      if (element.is(":visible")) {
        if (element.val() != '') {
          $(element).after('<span class="error-msgs"></span>');
          if ($(element).data('type') === 'feedback1') {
            if (ele_value === '') {
              $(element).parents('.feedback-reason').addClass('textboxerror');
              $(element).next('.error-msgs').text(ele_name);
              errors.push(ele_name);
            }
            else {
              $(element).parents('.feedback-reason').removeClass('textboxerror');
              $(element).next().text('');
            }
          }
          if ($(element).data('type') === 'feedback2') {
            if (ele_value === '') {
              $(element).parents('.feedback-reason').addClass('textboxerror');
              $(element).next('.error-msgs').text(ele_name);
              errors.push(ele_name);
            }
            else {
              $(element).parents('.feedback-reason').removeClass('textboxerror');
              $(element).next().text('');
            }
          }                    
        } else {
          $(element).parents('.feedback-reason').addClass('textboxerror');
          $(element).after('<span class="error-msgs">' + ele_required + '</span>');
          errors.push(ele_required);
        }
      }      
    });
    if (errors.length == 0) {
      formSubmit()
    }    
  });
  /*nps form 19-12-2022*/

   /*19-12-2022*/ 
   $('.text-limit-200').keyup(function() {    
    var characterCount = $(this).val().length;
    $(this).parents('.feedback-outers').find('.jscurrent').text(characterCount);
  });
  /*19-12-2022*/

  $(document).ready(function () {
    // Select 2 js //
    $(".js-select2").select2({
      placeholder: "Select",
    });
    $(".js-select2-search-hide").select2({
      minimumResultsForSearch: Infinity,
    });
  });

  $('.only-numeric-decimal-input').keyup(function (e) {
    $(this).val($(this).val().replace(/[^\d,-,NaN]/g, ''));
  });
  $('.price-with-comma-form').on('keyup',function () {
    if ($(this).val() != "") {
        var rupeeValue = parseFloat($(this).val().replace(/,/g, ''));
        commaSeparatedValue = rupeeValue.toLocaleString('en-IN');
        $(this).val(commaSeparatedValue);
    }
});