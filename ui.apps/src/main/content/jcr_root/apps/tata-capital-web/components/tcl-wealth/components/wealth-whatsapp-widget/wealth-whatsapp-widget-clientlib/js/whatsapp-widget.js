 $('#whatsapp-form .input-textbox[data-type]').keyup(function () {
    var element = $(this);
    var ele_value = element.val();
    var ele_required = 'Field is required';
    var ele_phoneNumber = "Please enter valid number";
    $(this).next('.error-msgs').remove();
    $(this).after('<span class="error-msgs" style="top: 43px"></span>');
    $(this).parents('.form-group').addClass('error');    

    if ($(element).val() != '') {       

      if ($(element).data('type') === 'mobile') {
          if (!validateMobile(element)) {
              $(element).parents('.form-textbox-new').addClass('textboxerror');
              $(element).next('.error-msgs').text(ele_phoneNumber);                
          } else {
              $(element).parents('.form-textbox-new').removeClass('textboxerror');
              $(element).next().text('');                
          }
      }       

    } else {
        $(element).parents('.form-textbox-new').addClass('textboxerror');
        $(element).next('.error-msgs').text(ele_required);
    }    
  });  
$('#whatsapp-form .jsWhatsappSubmitBtn').click(function () {
      var ele_input = $('#whatsapp-form').find('.form-textbox-new [data-type]:visible');
      var errors = [];
      allFilled = true;
      var ele_required = "Field is required";
      
      $(ele_input).each(function () {
          var element = $(this);
          var ele_value = element.val();
          var ele_phoneNumber = "Please enter valid number";

          $(element).parents('.form-textbox-new').find('.error-msgs').remove();
          $(element).parents('.form-textbox-new').addClass('textboxerror');

          if (element.is(":visible")) {
              if (element.val() != '') {
                  $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                  $(element).after('<span class="error-msgs" style="top: 43px"></span>');
                  
                  if ($(element).data('type') === 'mobile') {
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

    if (errors.length == 0) {
        var getWhatsappNumber = $('.jsGetNumber').val();
        var reqObj = {
            "header": {
                "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="
            },
            "body": {
                "mobileNumber": "91" + getWhatsappNumber
            }
        }
        wealthWhatsappMessageFilterObj.wealthWhatsappMessage(reqObj).then(function (response) {
            if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.success == true) {
                var showLastTwoNumber = getWhatsappNumber.slice(-2);
                $('.jsShowWhatsappNumber').text(showLastTwoNumber);
                $('#jsWhatsappSuccessMgs').removeClass('d-none');
                $('#jsWhatsappRegisterMgs').addClass('d-none');
            } else {
                $('#whatsapp-modal').removeClass("popover-show").css("display", "none");
                $("body").removeClass("popover-modal-open");
                $('.modal-backdrop').remove();
                showFailureModal();
            }
        }).catch(function (error) {
            console.error(error);
            $('#whatsapp-modal').removeClass("popover-show").css("display", "none");
            $("body").removeClass("popover-modal-open");
            $('.modal-backdrop').remove();
            showFailureModal();
        });
    }

});

 $('.jsWhatsAppClose').click(function(){
    $('#whatsapp-form .input-textbox').val('');
    $('#whatsapp-form .form-textbox-new').removeClass('textboxerror active');
    $('#jsWhatsappSuccessMgs').addClass('d-none');
    $('#jsWhatsappRegisterMgs').removeClass('d-none');
  })