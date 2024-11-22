(function (_global) {
  var downLoadAppSmsBizCallFn = (function (jsHelper) {
    var downLoadAppSmsBizObj = {};
    $('[tab-menu="lookingInvestment"],[tab-menu="lookingLoan"]').click(function(){
      $('.looking-investment-step1').removeClass('d-none');
      $('.looking-investment-step1').siblings('.white-dot-loader').addClass('d-none');
      $('.looking-investment-step1').siblings('#moneyfy02').addClass('d-none'); 
      $('.looking-loan-step1').removeClass('d-none');
      $('.looking-loan-step1').siblings('.white-dot-loader').addClass('d-none');
      $('.looking-loan-step1').siblings('#moneyfy02').addClass('d-none'); 
  })

    // get download link analytics START
    function getDownloadLinkAnalytics(e){
      try{
        function getParentElement(element, level = 1) {
          while (level-- > 0) {
          element = element.parentElement;
          if (!element) return null;
          }
          return element;
        }
        var ctaText = e.currentTarget.innerText.replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, ' ').trim();
        var ctaTitle = getParentElement(e.currentTarget, 7).querySelector('.tab-contentBox h5').innerText.trim();
        var componentName = 'Download App widget popup';
        var mobileNo = getParentElement(e.currentTarget, 7).querySelector('.form-subscribe [data-type="mobile"]').value;
        if(mobileNo !== ''){
          getdownloadLink(ctaText,ctaTitle,componentName,mobileNo);
        }
      } catch(error){
        console.log('element not found', error);
      }
    }
  // get download link analytics END

     /*getapp modal keypress js 6-1-2023*/
  $('#getInvestmentLink .input-textbox[data-type]').bind('keypress', function(e) {
    var code = e.keyCode || e.which;
    if(code == 13) {
      e.currentTarget.parentElement.parentElement.parentElement.classList.add('investmment-loan');
      $('.investmment-loan .js-getInvestmentLink').trigger('click');
    }
  });
  $('#getLoanLink .input-textbox[data-type]').bind('keypress', function(e) {
    var code = e.keyCode || e.which;
    if(code == 13) {
      $('.js-getLoanLink').trigger('click');
    }
  });  
  /*getapp modal keypress js 6-1-2023*/
    $("#getInvestmentLink .js-getInvestmentLink").click(function (ele) {
      event.preventDefault();
      var ele_input = $("#getInvestmentLink .input-textbox");
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
        getDownloadLinkAnalytics(ele);
        $("#getInvestmentLink").removeClass('investmment-loan');
        $('.looking-investment-step1').addClass('d-none');
      $('.looking-investment-step1').siblings('.white-dot-loader').removeClass('d-none');
        if ($("#getInvestmentLink .input-textbox")[0].value) {
          var mobile = $("#getInvestmentLink .input-textbox")[0].value;
          var templateName = "moneyfy-app-download";
          $('.textChange').html('Click on the link in the message to download the Moneyfy App.');
        } else {
          var mobile = $("#getInvestmentLink .input-textbox")[1].value;
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
        downLoadAppSmsFilterObj
          .downLoadAppSms(reqObj)
          .then(function (response) {
            console.log(response);
            console.log("Successful!");
            /*6-1-2023*/ 
            if(JSON.parse(response.response).responseJson.header.status.toLowerCase() == "success" && JSON.parse(response.response).responseJson.body.status.toLowerCase() == "ok"){
              mogoSound();      
              var jsGetLookNumber = mobile;
              jsGetNumberLast = String(jsGetLookNumber).slice(-2);
              $('#moneyfyNumber').text('XXXXXXXX' + jsGetNumberLast);  
                $('.looking-investment-step1').siblings('.white-dot-loader').addClass('d-none');
                $('.looking-investment-step1').siblings('#moneyfy02').removeClass('d-none');  
              // $('.looking-investment-step1').siblings('#moneyfy02').removeClass('d-none');
              $('#getInvestmentLink .input-textbox').val('');
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
    $("#getInvestmentLink .input-textbox[data-type]").keyup(function () {
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

    $("#getLoanLink .js-getInvestmentLink").click(function (ele) {
      event.preventDefault();
      var ele_input = $("#getLoanLink .input-textbox");
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
        getDownloadLinkAnalytics(ele);
        $("#getLoanLink").removeClass('investmment-loan');
        $('.looking-investment-step1').addClass('d-none');
      $('.looking-investment-step1').siblings('.white-dot-loader').removeClass('d-none');
        if ($("#getLoanLink .input-textbox")[0].value) {
          var mobile = $("#getLoanLink .input-textbox")[0].value;
          var templateName = "retail-app-download";
          $('.textChange').html('Click on the link in the message to download the Tata Capital App.');
        } else {
          var mobile = $("#getLoanLink .input-textbox")[1].value;
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
        downLoadAppSmsFilterObj
          .downLoadAppSms(reqObj)
          .then(function (response) {
            console.log(response);
            console.log("Successful!");
            /*6-1-2023*/ 
            if(JSON.parse(response.response).responseJson.header.status.toLowerCase() == "success" && JSON.parse(response.response).responseJson.body.status.toLowerCase() == "ok"){
              var jsGetLookNumber = mobile;
              jsGetNumberLast = String(jsGetLookNumber).slice(-2);
              mogoSound();
              $('#retailNumber').text('XXXXXXXX' + jsGetNumberLast);        
                $('.looking-investment-step1').siblings('.white-dot-loader').addClass('d-none');
                $('.looking-investment-step1').siblings('#moneyfy02').removeClass('d-none');  
              // $('.looking-investment-step1').siblings('#moneyfy02').removeClass('d-none');
              $('#getLoanLink .input-textbox').val('');
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

    $("#getLoanLink .input-textbox[data-type]").keyup(function () {
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
    //downLoadAppSmsBizObj.handleCredentialResponse = handleCredentialResponse;

    return jsHelper.freezeObj(downLoadAppSmsBizObj);
  })(jsHelper);

  _global.jsHelper.defineReadOnlyObjProp(
    _global,
    "downLoadAppSmsBizObj",
    downLoadAppSmsBizCallFn
  );
})(this || window || {});