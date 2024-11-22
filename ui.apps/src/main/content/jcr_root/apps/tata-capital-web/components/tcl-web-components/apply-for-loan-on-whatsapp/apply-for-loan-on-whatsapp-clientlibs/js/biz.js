(function (_global) {
  var whatsAppLeadBizCallFn = (function (jsHelper) {
    var whatsAppLeadBizObj = {};
    var loanQueryCheckbox = false;
    var mobilNumber;
    var otpRefNo;
    var getWhatsappNub;
    var product = $('input[data-product]').val()
    $(".jsIAgreeTermsPolicy").on("change", function () {
      var errors = [];
      var ele_checkbox = "Please confirm checkbox";
      loanQueryCheckbox = event.target.checked;
      if (loanQueryCheckbox) {
        $("#js-whatsapp-loan .form-check .error-msgs").remove();
        $("#js-whatsapp-loan .form-check").removeClass("textboxerror");
      } else {
        if ($("#js-whatsapp-loan .form-check").find(".error-msgs").length > 0) {
          errors.push(ele_checkbox);
        }
        if (
          $("#js-whatsapp-loan .form-check").find(".error-msgs").length === 0
        ) {
          $("#js-whatsapp-loan .form-check .form-check-label").after(
            '<span class="error-msgs"></span>'
          );
          $("#js-whatsapp-loan .form-check").addClass("textboxerror");
          $("#js-whatsapp-loan .form-check .error-msgs").html(ele_checkbox);
          errors.push(ele_checkbox);
        }
      }
    });

    $("#js-whatsapp-loan .js-proceed-btn").click(function () {
      var ele_input = $("#js-whatsapp-loan .input-textbox");
      var errors = [];
      allFilled = true;
      var ele_required = "Field is required";

      $(ele_input).each(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_phoneNumber = "Please enter valid phone number";
        var ele_checkbox = "Please confirm checkbox";

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
        if (!loanQueryCheckbox) {
          if (
            $("#js-whatsapp-loan .form-check").find(".error-msgs").length > 0
          ) {
            errors.push(ele_checkbox);
          }
          if (
            $("#js-whatsapp-loan .form-check").find(".error-msgs").length === 0
          ) {
            $("#js-whatsapp-loan .form-check .form-check-label").after(
              '<span class="error-msgs"></span>'
            );
            $("#js-whatsapp-loan .form-check").addClass("textboxerror");
            $("#js-whatsapp-loan .form-check .error-msgs").html(ele_checkbox);
            errors.push(ele_checkbox);
          }
        } else {
          $("#js-whatsapp-loan .form-check .error-msgs").remove();
          $("#js-whatsapp-loan .form-check").removeClass("textboxerror");
        }
      });
      if (errors.length == 0) {
         getWhatsappNub = $(".jsGetWhatsappNumber").val();
        mobilNumber =getWhatsappNub;
        var reqObj ={
            "header": {
                "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                "identifier":"nli"
            },
            "body": {
                "mobileNumber": mobilNumber
            }
        }
        $('body').addClass('bg-loader');
        $('.loader').removeClass('hide-loader');
        whatsAppLeadFilterObj.generateOtp(reqObj).then(function (response) {
          if(response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success"){
            if(response.response.responseJson.body.otpRefNo){
              otpRefNo = response.response.responseJson.body.otpRefNo;
            $('.loader').addClass('hide-loader');
            $('body').removeClass('bg-loader');
            $(".jsShowWhatsappNumber").text(getWhatsappNub);
            $("#js-whatsapp-loan").addClass("d-none");
            $(".whatsapp-otp-wrap").removeClass("d-none");
            $("#whatsapp-otp .js-otp-submit").addClass("btn-disabled");
            $("#whatsapp-otp .input-textbox:first").focus();
            ele_input.val("");
            loanQueryCheckbox = false;
            $("#js-whatsapp-loan .form-check .form-check-input").prop(
              "checked",
              false
            );
            $("#js-whatsapp-loan .form-textbox").removeClass("active");
              /*otp timer*/
              $(".jsGetOTPSent").addClass("d-none");
              $('.jsOnGetCall').addClass('d-none');
              $('.jsGetOTPSent').addClass('d-none');
              resetTimer()
              /*otp timer*/ 
            }else{ 
              $('.loader').addClass('hide-loader');
              $('body').removeClass('bg-loader');
              //failure popup
              setTimeout(function () {
                  $("#failure-modal").addClass("popover-show");
                }, 80);
      
                $("#failure-modal").css("display", "block");
                $("body").addClass("popover-modal-open");
                $("body").append('<div class="modal-backdrop"></div>');
            }
          }else{
            $('.loader').addClass('hide-loader');
            $('body').removeClass('bg-loader');
            //failure popup
            setTimeout(function () {
                $("#failure-modal").addClass("popover-show");
              }, 80);
    
              $("#failure-modal").css("display", "block");
              $("body").addClass("popover-modal-open");
              $("body").append('<div class="modal-backdrop"></div>');
          }
        }).catch(function (error) {
            console.error(error);
            $('.loader').addClass('hide-loader');
            $('body').removeClass('bg-loader');
            //failure popup
            setTimeout(function () {
                $("#failure-modal").addClass("popover-show");
              }, 80);
    
              $("#failure-modal").css("display", "block");
              $("body").addClass("popover-modal-open");
              $("body").append('<div class="modal-backdrop"></div>');
        });
      }
    });

    $("#js-whatsapp-loan .input-textbox").keyup(function () {
      var ele_input = $("#js-whatsapp-loan .input-textbox");
      var errors = [];
      allFilled = true;
      var ele_required = "Field is required";

      $(ele_input).each(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_phoneNumber = "Please enter valid phone number";
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
    });

    $(".jsCloseWhatsappMgs").click(function () {
      $(".whatsapp-success-mgs").addClass("d-none");
      $(".initiate-loan-journey").removeClass("d-none");
      $("#js-whatsapp-loan").removeClass("d-none");
      $("#whatsapp-otp .input-textbox").val("");
    });

    $("#whatsapp-otp .js-OtpBox .input-textbox").keyup(function () {
      if (this.value.length == this.maxLength) {
        $(this).next(".input-textbox").focus();
        $(this).next(".input-textbox").removeClass("pointer-none");
      } else {
        $(this).prev(".input-textbox").focus();
        $(this).addClass("pointer-none");
        $("#whatsapp-otp .input-textbox:first").removeClass("pointer-none");
      }

      var ele_input = $(".js-OtpBox .input-textbox");
      $(ele_input).each(function () {
        if ($(this).val().length != 0) {
          $(this)
            .parents("#whatsapp-otp")
            .find(".js-otp-submit")
            .removeClass("btn-disabled");
        } else {
          $(this)
            .parents("#whatsapp-otp")
            .find(".js-otp-submit")
            .addClass("btn-disabled");
        }
      });
    });

    $("#whatsapp-otp .js-resendOTP").click(function () {
      /* otp timer */
      $(".jsLoadingBtn").removeClass("d-none");
      $(".jsGetOTPSent").addClass("d-none");
      $('#whatsapp-otp .js-resendOTP').addClass("d-none");
      if(remainingTime !== 0){
      pauseTimerAndModal()
      }
      /* otp timer */
      mobilNumber =getWhatsappNub;
      var reqObj ={
          "header": {
              "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
              "identifier":"nli"
          },
          "body": {
              "mobileNumber": mobilNumber
          }
      }
      whatsAppLeadFilterObj.generateOtp(reqObj).then(function (response) {
        $('body').addClass('bg-loader');
        $('.loader').removeClass('hide-loader');
        if(response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success"){
          if(response.response.responseJson.body.otpRefNo){
            otpRefNo = response.response.responseJson.body.otpRefNo;
          $('.loader').addClass('hide-loader');
          $('body').removeClass('bg-loader');
          $(this)
          .parents("#whatsapp-otp")
          .find(".js-OtpBox .input-textbox")
          .val("");
        $(this)
          .parents("#whatsapp-otp")
          .find(".js-OtpBox .input-textbox:first-child")
          .focus();
        $(this)
          .parents("#whatsapp-otp")
          .find(".js-otp-submit")
          .addClass("btn-disabled");
            /*otp timer */
            /* var timer2 = "03:00";
            var timer = timer2.split(":");
            var minutes = parseInt(timer[0], 10);
            var seconds = parseInt(timer[1], 10);
            $("#timer").html("0" + minutes + ":" + "0" + seconds); */
            $('#whatsapp-otp .js-resendOTP').removeClass("d-none");
            $(".jsLoadingBtn").addClass("d-none");
            $(".jsOnGetCall").addClass("d-none");
            $('.otp-expired').addClass("d-none");
            $('.otp-send-success').removeClass('d-none');
            $('.otp-expired').addClass('d-none')
            $('#otp-sent-modal .popover-modal-close').addClass('jsThanksModalClose');

            setTimeout(function () {
              $("#otp-sent-modal").addClass("popover-show");
            }, 80);
            $("#otp-sent-modal").css("display", "block");
            $("body").addClass("popover-modal-open");
            $("body").append('<div class="modal-backdrop"></div>');
            /*otp timer */
          }else{
            $('.loader').addClass('hide-loader');
            $('body').removeClass('bg-loader');
            /*otp timer */
            if(remainingTime !== 0){
            resumeTimer()
            }
            $(".jsLoadingBtn").addClass("d-none");
            $('#whatsapp-otp .js-resendOTP').removeClass("d-none");
            /*otp timer */
            //failure popup
            setTimeout(function () {
                $("#failure-modal").addClass("popover-show");
              }, 80);
    
              $("#failure-modal").css("display", "block");
              $("body").addClass("popover-modal-open");
              $("body").append('<div class="modal-backdrop"></div>');
          }
        }else{
          $('.loader').addClass('hide-loader');
          $('body').removeClass('bg-loader');
          /*otp timer */
          if(remainingTime !== 0){
          resumeTimer()
          }
          $(".jsLoadingBtn").addClass("d-none");
          $('#whatsapp-otp .js-resendOTP').removeClass("d-none");
          /*otp timer */
          //failure popup
          setTimeout(function () {
              $("#failure-modal").addClass("popover-show");
            }, 80);
  
            $("#failure-modal").css("display", "block");
            $("body").addClass("popover-modal-open");
            $("body").append('<div class="modal-backdrop"></div>');
        }
      }).catch(function(){
        $('.loader').addClass('hide-loader');
        $('body').removeClass('bg-loader');
        /*otp timer */
        if(remainingTime !== 0){
        resumeTimer()
        }
        $(".jsLoadingBtn").addClass("d-none");
        $('#whatsapp-otp .js-resendOTP').removeClass("d-none");
        /*otp timer */
        //failure popup
        setTimeout(function () {
            $("#failure-modal").addClass("popover-show");
          }, 80);

          $("#failure-modal").css("display", "block");
          $("body").addClass("popover-modal-open");
          $("body").append('<div class="modal-backdrop"></div>');
      })
    });

    $(".jsOTPTryAgain").click(function () {
      $(".initiate-loan-journey").removeClass("d-none");
      $(".whatsapp-otp-wrap").removeClass("d-none");
      $(".jsWhatOTPUnSuccess").addClass("d-none");
      $("#whatsapp-otp .input-textbox").val("");
      $("#whatsapp-otp .input-textbox:first").focus();
      $("#whatsapp-otp .input-textbox").addClass("pointer-none");
      $("#whatsapp-otp .input-textbox:first").removeClass("pointer-none");
      $("#whatsapp-otp").find(".js-otp-submit").addClass("btn-disabled");
    });

    $("#whatsapp-otp .js-otp-submit").click(function () {
      if(remainingTime !== 0){
      pauseTimerAndModal();
      }
      var values = [];
      $("#whatsapp-otp .js-OtpBox .input-textbox").each(function (i, ele) {
        values.push(ele.value);
      });
      console.log(values.join(""));
      $(".initiate-loan-journey").addClass("d-none");
        var reqObj ={
            "header": {
                "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                "identifier":"nli"
            },
            "body": {
                "otpRefNo":otpRefNo,
                "otp":values.join("")
            }
        }
        whatsAppLeadFilterObj.verifyOtp(reqObj).then(function (response) {
            if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.retStatus.toLowerCase() == 'success') {
              $('.loader').addClass('hide-loader');
              $('body').removeClass('bg-loader');
                var reqObj ={
                    "header": {
                        "authToken": "zsdxfcgvhbjn"
                    },
                    "body": {
                        "code": product,
                        "mobileNumber": mobilNumber
                    }
                }
                whatsAppLeadFilterObj.whatsAppLead(reqObj).then(function (response) {
                  $('body').addClass('bg-loader');
                  $('.loader').removeClass('hide-loader');
                    if(response.response.responseJson.header.status == 'SUCCESS'){
                      destroyOtpTimer();
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $(".whatsapp-otp-wrap").addClass("d-none");
                    $(".jsWhatOTPSuccess").removeClass("d-none");
                    }else{
                      destroyOtpTimer();
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $(".whatsapp-otp-wrap").addClass("d-none");
                        $(".jsWhatOTPSuccess").removeClass("d-none");
                        $('.jsWhatOTPSuccess h2 span').text('Oops!!')
                        $('.jsWhatOTPSuccess p').text('Some Thing went wrong')
                    }
                }).catch(function (error) {
                  if(remainingTime !== 0){
                  resumeTimer();
                  }
                  console.error(error);
                });
            } else if (response.response.responseJson.header.status.toLowerCase() == 'failure' && response.response.responseJson.errorBody.errorMessage && response.response.responseJson.errorBody.errorMessage.toLowerCase() == 'otp has expired!') {
              if(remainingTime !== 0){
              resumeTimer();
              }
              $('.loader').addClass('hide-loader');
              $('body').removeClass('bg-loader');
              $("#not-receive-otp-modal").removeClass("popover-show");
              $("#not-receive-otp-modal").css("display", "none");
              $("#otp-sent-modal").addClass("popover-show");
              $("#otp-sent-modal").css("display", "block");
              $('.otp-send-success').addClass('d-none')
              $('.otp-expired').removeClass('d-none')
              $('#otp-sent-modal .popover-modal-close').removeClass('jsThanksModalClose');
              $("body").addClass("popover-modal-open");
              $("body").append('<div class="modal-backdrop"></div>');

            } else {
              if(response.response.responseJson.errorBody.statusCode == "403") {
                var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                if(errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode =="ERROTP201") {
                  destroyOtpTimer();
                  $('.loader').addClass('hide-loader');
                  $('body').removeClass('bg-loader');
                  $(".initiate-loan-journey").addClass("d-none");
                  $(".whatsapp-otp-wrap").addClass("d-none");
                  $(".jsWhatOTPUnSuccess").removeClass("d-none");
                } else {
                  if(remainingTime !== 0){
                  resumeTimer();
                  }
                    $('.loader').addClass('hide-loader');
                    $('body').removeClass('bg-loader');
                    //failure Popup
                    setTimeout(function () {
                        $("#failure-modal").addClass("popover-show");
                      }, 80);
            
                      $("#failure-modal").css("display", "block");
                      $("body").addClass("popover-modal-open");
                      $("body").append('<div class="modal-backdrop"></div>');
                }
            }else {
              if(remainingTime !== 0){
              resumeTimer();
              }
                $('.loader').addClass('hide-loader');
                $('body').removeClass('bg-loader');
                //failure Popup
                setTimeout(function () {
                    $("#failure-modal").addClass("popover-show");
                  }, 80);
        
                  $("#failure-modal").css("display", "block");
                  $("body").addClass("popover-modal-open");
                  $("body").append('<div class="modal-backdrop"></div>');
            }
            }
        }).catch(function (error) {
          if(remainingTime !== 0){
          resumeTimer();
          }
          $('.loader').addClass('hide-loader');
          $('body').removeClass('bg-loader');
          //failure Popup
          setTimeout(function () {
              $("#failure-modal").addClass("popover-show");
            }, 80);
  
            $("#failure-modal").css("display", "block");
            $("body").addClass("popover-modal-open");
            $("body").append('<div class="modal-backdrop"></div>');
        });

      /*otp timer*/
      if ($('#loanWhatsappForm').length > 0) {
        $(".jsOnGetCallButton").click(function () {
          $('#not-receive-otp-modal').removeClass("popover-show");
          $('#not-receive-otp-modal').css("display", "none");
          $("body").removeClass("popover-modal-open");
          $('.modal-backdrop').remove();
          $(".jsGetCalling .semibold").html("+91 " + loanWhatsappForm);
          $(".jsGetCalling").removeClass("d-none");
          $('.jsOnGetCall').addClass("d-none");
          var reqObj = {
            "header": {
              "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
              "identifier": "nli"
            },
            "body": {
              "mobileNumber": loanWhatsappForm,
              "otpRefNo": otpRefNo,
            }
          }
          whatsAppLeadFilterObj.onCallOtp(reqObj).then(function (response) {
            if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.status.toLowerCase() == 'success') {
              $(".jsModalOnGetCall").parents(".popover-modal").removeClass("popover-show");
              $(".jsModalOnGetCall").parents(".popover-modal").removeAttr("style");
              $(".height-scroll").removeAttr("style");
              $("body").removeClass("popover-modal-open");
              $(".modal-backdrop").remove();
              setTimeout(() => {
                $(".jsGetCalling").addClass("d-none");
                $(".jsGetOTPSent").removeClass("d-none");
                $('.jsOnGetCallButton').addClass("d-none")
              }, 4000);

            } else if (response.response.responseJson.header.status.toLowerCase() == 'failure' && response.response.responseJson.errorBody.message.toLowerCase() == 'otp expired') {
              $('.loader').addClass('hide-loader');
              $('body').removeClass('bg-loader');
              $("#not-receive-otp-modal").removeClass("popover-show");
              $("#not-receive-otp-modal").css("display", "none");
              $("#otp-sent-modal").addClass("popover-show");
              $("#otp-sent-modal").css("display", "block");
              $('.otp-send-success').addClass('d-none')
              $('.otp-expired').removeClass('d-none')
              $('#otp-sent-modal .popover-modal-close').removeClass('jsThanksModalClose');
              $(".jsOnGetCall").removeClass("d-none");
              $('.jsGetCalling').addClass('d-none');
              $("body").addClass("popover-modal-open");
              $("body").append('<div class="modal-backdrop"></div>');

            } else {
              $('.loader').addClass('hide-loader');
              $('body').removeClass('bg-loader');
              $(".jsModalOnGetCall").parents(".popover-modal").removeClass("popover-show");
              $(".jsModalOnGetCall").parents(".popover-modal").removeAttr("style");
              $(".height-scroll").removeAttr("style");
              $("body").removeClass("popover-modal-open");
              //failure Popup
              setTimeout(function () {
                $("#failure-modal").addClass("popover-show");
              }, 80);

              $("#failure-modal").css("display", "block");
              $("body").addClass("popover-modal-open");
              $("body").append('<div class="modal-backdrop"></div>');
              $(".jsOnGetCall").removeClass("d-none");
              $('.jsGetCalling').addClass('d-none');

            }
          }).catch(function (error) {
            $('.loader').addClass('hide-loader');
            $('body').removeClass('bg-loader');
            $(".jsModalOnGetCall").parents(".popover-modal").removeClass("popover-show");
            $(".jsModalOnGetCall").parents(".popover-modal").removeAttr("style");
            $(".height-scroll").removeAttr("style");
            $("body").removeClass("popover-modal-open");
            //failure Popup
            setTimeout(function () {
              $("#failure-modal").addClass("popover-show");
            }, 80);
            $("#failure-modal").css("display", "block");
            $("body").addClass("popover-modal-open");
            $("body").append('<div class="modal-backdrop"></div>');
            $(".jsOnGetCall").removeClass("d-none");
            $('.jsGetCalling').addClass('d-none');
          });
        });
      }
      /*otp timer*/
    });


    return jsHelper.freezeObj(whatsAppLeadBizObj);
  })(jsHelper);

  _global.jsHelper.defineReadOnlyObjProp(
    _global,
    "whatsAppLeadBizObj",
    whatsAppLeadBizCallFn
  );
})(this || window || {});
