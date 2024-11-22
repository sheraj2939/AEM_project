(function (_global) {
    var downloadPopupSmsBizCallFn = (function (jsHelper) {
      var downloadPopupSmsBizObj = {};
      $('[tab-menu="lookingInvestment"],[tab-menu="lookingLoan"]').click(function(){
        $('.looking-investment-step1').removeClass('d-none');
        $('.looking-investment-step1').siblings('.white-dot-loader').addClass('d-none');
        $('.looking-investment-step1').siblings('#moneyfy02').addClass('d-none'); 
    })
       /*getapp modal keypress js 6-1-2023*/
    $('#bannerPopup .input-textbox[data-type]').bind('keypress', function(e) {
      var code = e.keyCode || e.which;
      if(code == 13) {
        e.currentTarget.parentElement.parentElement.parentElement.classList.add('investmment-loan');
        $('.investmment-loan .js-bannerPopup').trigger('click');
      }
    });
    $('#bannerPopup .input-textbox[data-type]').bind('keypress', function(e) {
      var code = e.keyCode || e.which;
      if(code == 13) {
        $('.js-getLoanLink').trigger('click');
      }
    });  
    $("#bannerPopup .input-textbox[data-type]").keyup(function () {
          var element = $(this);
          var ele_required = "Field is required";
          var ele_phoneNumber = "Please enter valid Phone Number";

          $(this).next(".error-msgs").remove();
          $(this).after('<span class="error-msgs"></span>');
          $(this).parents(".form-group").addClass("error");
  
          if ($(element).val() != "") {
            if ($(element).data("type") === "mobile") {
              if (!validateMobile(element)) {
                $(element).parents(".form-textbox").addClass("textboxerror");
                $(element).next(".error-msgs").text(ele_phoneNumber);
              } else {
                $(element).parents(".form-textbox").removeClass("textboxerror");
                $(element).next().text("");
                $(this).next(".error-msgs").remove();
              }
            }
          } else {
            $(element).next(".error-msgs").text(ele_required);
          }
        }
      );
      $('#moneyfyBanner .popover-modal-close').click(function(){
        $('#moneyfyBanner .looking-investment-step1').removeClass("d-none");
        $('#getOurAppsBanner .looking-investment-step1').removeClass("d-none");
        $('#moneyfyBanner .looking-investment-step1').siblings('#moneyfy02').addClass('d-none');
        $('#getOurAppsBanner .looking-investment-step1').siblings('#moneyfy02').addClass('d-none');
    });
      $('#getOurAppsBanner .popover-modal-close').click(function(){
        $('#moneyfyBanner .looking-investment-step1').removeClass("d-none");
        $('#getOurAppsBanner .looking-investment-step1').removeClass("d-none");
        $('#moneyfyBanner .looking-investment-step1').siblings('#moneyfy02').addClass('d-none');
        $('#getOurAppsBanner .looking-investment-step1').siblings('#moneyfy02').addClass('d-none');
    });
    /*getapp modal keypress js 6-1-2023*/
      $("#bannerPopup .js-bannerPopup").click(function (ele) {
        event.preventDefault();
        var ele_input = $("#bannerPopup .input-textbox");
        var errors = [];
        allFilled = true;
        var ele_required = "Field is required";
  
        $(ele_input).each(function () {
          var element = $(this);
          var ele_phoneNumber = "Please enter valid Phone Number";
  
          $(element).next().remove();
  
          if (element.is(":visible")) {
            if (element.val() != "") {
              $(element).after('<span class="error-msgs"></span>');
              if ($(element).data("type") === "mobile") {
                if (!validateMobile(element)) {
                  $(element).parents(".form-textbox").addClass("textboxerror");
                  $(element).next(".error-msgs").text(ele_phoneNumber);
                  errors.push(ele_phoneNumber);
                } else {
                  $(element).parents(".form-textbox").removeClass("textboxerror");
                  $(element).next().text("");
                  $(this).next(".error-msgs").remove();
                }
              }
            } else {
              $(element).parents(".form-textbox").addClass("textboxerror");
              $(element).after(
                '<span class="error-msgs">' + ele_required + "</span>"
              );
              errors.push(ele_required);
            }
          }
        });
        if (errors.length == 0) {
          $("#bannerPopup").removeClass('investmment-loan');
          $('.looking-investment-step1').addClass('d-none');
        $('.looking-investment-step1').siblings('.white-dot-loader').removeClass('d-none');
          if ($("#moneyfyBanner #bannerPopup .input-textbox")[0].value) {
            var mobile = $(" #bannerPopup .input-textbox")[0].value;
            var templateName = "moneyfy-app-download";
            $('.textChange').html('Click on the link in the message to download the Moneyfy App.');
          } else if ($("#getOurAppsBanner #bannerPopup .input-textbox")[0].value){
            var mobile = $("#bannerPopup .input-textbox")[1].value;
            var templateName = "retail-app-download";
            $('.textChange').html('Click on the link in the message to download the Tata Capital App.');
          }
          var reqObj = {
            header: {
              authToken: "vfdfffvff",
            },
            body: {
              mobileNumber: mobile,
              templateName: templateName,
              templateJson: {},
            },
          };
          downloadPopupSmsFilterObj
            .downloadPopupSms(reqObj)
            .then(function (response) {
              console.log(response);
              console.log("Successful!");
              /*6-1-2023*/ 
              if(JSON.parse(response.response).responseJson.header.status.toLowerCase() == "success" && JSON.parse(response.response).responseJson.body.status.toLowerCase() == "ok"){
                var jsGetLookNumber = mobile;
                jsGetNumberLast = String(jsGetLookNumber).slice(-2);
                $('.jsShowLookNumber').text('XXXXXXXX' + jsGetNumberLast);        
                  $('.looking-investment-step1').siblings('.white-dot-loader').addClass('d-none');
                  $('.looking-investment-step1').siblings('#moneyfy02').removeClass('d-none');  
                // $('.looking-investment-step1').siblings('#moneyfy02').removeClass('d-none');
                $('#bannerPopup .input-textbox').val('');
              }else{
                //failure Popup
              setTimeout(function () {
                $("#failure-modal").addClass("popover-show");
              }, 80);
    
              $("#failure-modal").css("display", "block");
              $("body").addClass("popover-modal-open");
              $("body").append('<div class="modal-backdrop"></div>');
              }
        /*6-1-2023*/ 
            })
            .catch(function (error) {
              console.error(error);
              //failure Popup
              setTimeout(function () {
                $("#failure-modal").addClass("popover-show");
              }, 80);
    
              $("#failure-modal").css("display", "block");
              $("body").addClass("popover-modal-open");
              $("body").append('<div class="modal-backdrop"></div>');
            });
        }
      });
      
      //downloadPopupSmsBizObj.handleCredentialResponse = handleCredentialResponse;
  
      return jsHelper.freezeObj(downloadPopupSmsBizObj);
    })(jsHelper);
  
    _global.jsHelper.defineReadOnlyObjProp(
      _global,
      "downloadPopupSmsBizObj",
      downloadPopupSmsBizCallFn
    );
  })(this || window || {});
  