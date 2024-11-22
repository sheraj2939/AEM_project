(function (_global) {
  var preApprovedOffersBizCallFn = (function (jsHelper) {
    var preApprovedOffersBizObj = {};

    var getWhatsappNub;
    var otpRefNo;
    var plJocataOfferValid = false;
    var blJocataOfferValid = false;
    var name;
    function getParentElement(element, level = 1) {
      while (level-- > 0) {
      element = element.parentElement;
      if (!element) return null;
      }
      return element;
    }
    $("#js-preapprovepffer-loan .jsIAgreeTermsPolicy1").change(function () {
      if (this.checked) {
        $(this).parents(".form-check").removeClass("textboxerror");
        $(this).parents(".label-text").next(".error-msgs").remove();
      } else {
        $(this).parents(".form-check").addClass("textboxerror");
        // $(this).parents('.label-text').append('<span class="error-msgs">Field is required</span>')
      }
    });

    $("#js-preapprovepffer-loan .js-proceed-btn").click(function (e) {
      var ele_input = $("#js-preapprovepffer-loan .input-textbox[data-type]");
      var checkboxElements = $(
        "#js-preapprovepffer-loan .jsIAgreeTermsPolicy1"
      );
      var errors = [];
      allFilled = true;
      var ele_required = "Field is required";

      $(ele_input).each(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_firstname = "Enter first name";
        var ele_lastname = "Enter last name";
        var ele_phoneNumber = "Please enter valid number";

        $(element).next().remove();

        if (element.is(":visible")) {
          if (element.val() != "") {
            $(element).after('<span class="error-msgs"></span>');
            if ($(element).data("type") === "firstname") {
              var regName = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;

              if (ele_value != "" && !ele_value.match(regName)) {
                $(element).parents(".form-textbox").addClass("textboxerror");
                $(element).next(".error-msgs").text(ele_firstname);
                errors.push(ele_firstname);
              } else {
                $(element).parents(".form-textbox").removeClass("textboxerror");
                $(element).next().text("");
              }
            }
            if ($(element).data("type") === "lastname") {
              var regName = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;

              if (ele_value != "" && !ele_value.match(regName)) {
                $(element).parents(".form-textbox").addClass("textboxerror");
                $(element).next(".error-msgs").text(ele_lastname);
                errors.push(ele_lastname);
              } else {
                $(element).parents(".form-textbox").removeClass("textboxerror");
                $(element).next().text("");
              }
            }
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

      $("#js-preapprovepffer-loan .jsIAgreeTermsPolicy1")
        .next(".error-msgs")
        .remove();
      // checkbox validation
      if (checkboxElements.prop("checked") == false) {
        checkboxElements.parents(".form-check").addClass("textboxerror");
        $(checkboxElements).parents(".label-text").next(".error-msgs").remove();
        checkboxElements
          .parents(".label-text")
          .after('<span class="error-msgs">' + ele_required + "</span>");
        errors.push(ele_required);
      } else {
        $(checkboxElements).parents(".form-check").removeClass("textboxerror");
        $(checkboxElements).parents(".label-text").next(".error-msgs").remove();
      }

      if (errors.length == 0) {
        // pre approved offers htmlpg proceed analyytics START
        try{
            if(getParentElement(e.currentTarget, 11).classList[0] == 'preapproved-offer'){
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 5).querySelector('.component-title .heading20').innerText.trim();
            var mobileNo = document.querySelector('#js-preapprovepffer-loan [data-type="mobile"]').value;
            var componentName =  getParentElement(e.currentTarget, 11).querySelector('.component-title h1').innerText.trim();
            var perceptualId = domUtils.getCookie('perpetualId') ? domUtils.getCookie('perpetualId') : "";
            preapprovedplanproceedClick(ctaText,ctaTitle,componentName,mobileNo,perceptualId);
            }
        } catch(error) {
              console.log('element not found', error);
        }
        // pre approved offers htmlpg proceed analyytics END
        $("body").addClass("bg-loader");
        $(".loader").removeClass("hide-loader");
        getWhatsappNub = $('[data-type="mobile"]').val();
        name = $('[data-type="firstname"]').val()+" "+$('[data-type="lastname"]').val();
        mobilNumber = getWhatsappNub;
        var reqObj = {
          header: {
            authToken: "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
            "identifier":"nli"
          },
          body: {
            mobileNumber: mobilNumber,
          },
        };
        preApprovedOffersFilterObj.generateOtp(reqObj).then(function (response) {
            if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
              if(response.response.responseJson.body.otpRefNo){
                $("body").removeClass("bg-loader");
              $(".loader").addClass("hide-loader");
              otpRefNo = response.response.responseJson.body.otpRefNo;
              $("#js-preapprovepffer-loan").addClass("d-none");
              $("#preapproved-offer-otp").removeClass("d-none");

              $("#preapproved-offer-otp .js-otp-submit").addClass(
                "btn-disabled"
              );
              $("#preapproved-offer-otp .input-textbox").val("");
              $("#preapproved-offer-otp .input-textbox:first").focus();

              $("#js-preapprovepffer-loan .input-textbox").val("");
              $("#js-preapprovepffer-loan .form-textbox").removeClass("active");

              $("#preapproved-offer-otp .form-check .form-check-input").prop(
                "checked",
                false
              );
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
          })
          .catch(function (error) {
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

    $("#js-preapprovepffer-loan .input-textbox[data-type]").keyup(function () {
      var element = $(this);
      var ele_value = element.val();
      var ele_required = "Field is required";
      var ele_firstname = "Enter first name";
      var ele_lastname = "Enter last name";
      var ele_phoneNumber = "Please enter valid number";

      $(this).next(".error-msgs").remove();
      $(this).after('<span class="error-msgs"></span>');
      $(this).parents(".form-group").addClass("error");

      if ($(element).val() != "") {
        if ($(element).data("type") === "firstname") {
          var regName = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;

          if (ele_value != "" && !ele_value.match(regName)) {
            $(element).parents(".form-textbox").addClass("textboxerror");
            $(element).next(".error-msgs").text(ele_firstname);
          } else {
            $(element).parents(".form-textbox").removeClass("textboxerror");
            $(element).next().text("");
          }
        }
        if ($(element).data("type") === "lastname") {
          var regName = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;

          if (ele_value != "" && !ele_value.match(regName)) {
            $(element).parents(".form-textbox").addClass("textboxerror");
            $(element).next(".error-msgs").text(ele_lastname);
          } else {
            $(element).parents(".form-textbox").removeClass("textboxerror");
            $(element).next().text("");
          }
        }
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
    });

    /*preapproved offer otp keyup*/
    $("#preapproved-offer-otp .js-OtpBox .input-textbox").keyup(function () {
      if (this.value.length == this.maxLength) {
        $(this).next(".input-textbox").focus();
        $(this).next(".input-textbox").removeClass("pointer-none");
      } else {
        $(this).prev(".input-textbox").focus();
        $(this).addClass("pointer-none");
        $("#preapproved-offer-otp .input-textbox:first").removeClass(
          "pointer-none"
        );
      }

      var ele_input = $(".js-OtpBox .input-textbox");
      $(ele_input).each(function () {
        if ($(this).val().length != 0) {
          $(this)
            .parents("#preapproved-offer-otp")
            .find(".js-otp-submit")
            .removeClass("btn-disabled");
        } else {
          $(this)
            .parents("#preapproved-offer-otp")
            .find(".js-otp-submit")
            .addClass("btn-disabled");
        }
      });
    });
    /*preapproved offer otp keyup*/

    /*preapproved offer otp resend*/
    $("#preapproved-offer-otp .js-resendOTP").click(function (e) {
      /* otp timer */
      if(remainingTime !== 0){
      pauseTimerAndModal()
      }
      $('#preapproved-offer-otp .js-resendOTP').addClass("d-none");
      $(".jsLoadingBtn").removeClass("d-none");
      $(".jsGetOTPSent").addClass("d-none");
      /* otp timer */

      // pre approved offers htmlpg resendOtp analyytics END
      try{
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget,2).querySelector('.otp-outer-box p').innerText.trim();
        var componentName = getParentElement(e.currentTarget,5).querySelector('.component-title h1').innerText.trim();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
      } catch(error) {
        console.log('element not found', error);
      }
      // pre approved offers htmlpg resendOtp analyytics END
      $("body").addClass("bg-loader");
      $(".loader").removeClass("hide-loader");
      //getWhatsappNub = $('[data-type="mobile"]').val();
      mobilNumber = getWhatsappNub;
      var reqObj = {
        header: {
          authToken: "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
          "identifier":"nli"
        },
        body: {
          mobileNumber: mobilNumber,
        },
      };
      preApprovedOffersFilterObj
        .generateOtp(reqObj)
        .then(function (response) {
          if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
            if(response.response.responseJson.body.otpRefNo){
              $("body").removeClass("bg-loader");
            $(".loader").addClass("hide-loader");
            otpRefNo = response.response.responseJson.body.otpRefNo;
            $(this)
              .parents("#preapproved-offer-otp")
              .find(".js-OtpBox .input-textbox")
              .val("");
            $(this)
              .parents("#preapproved-offer-otp")
              .find(".js-OtpBox .input-textbox:first-child")
              .focus();
            $(this)
              .parents("#preapproved-offer-otp")
              .find(".js-otp-submit")
              .addClass("btn-disabled");
              /*otp timer */
              $('#preapproved-offer-otp .js-resendOTP').removeClass("d-none");
              $(".jsLoadingBtn").addClass("d-none");
              $(".jsOnGetCall").addClass("d-none");
              $('.otp-expired').addClass("d-none");
              $("#otp-sent-modal").addClass("popover-show");
              $("#otp-sent-modal").css("display", "block");
              $('.otp-send-success').removeClass('d-none');
              $('.otp-expired').addClass('d-none')
              $('#otp-sent-modal .popover-modal-close').addClass('jsThanksModalClose');
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
              $('#preapproved-offer-otp .js-resendOTP').removeClass("d-none");
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
            $('#preapproved-offer-otp .js-resendOTP').removeClass("d-none");
            /*otp timer */
            //failure popup
            setTimeout(function () {
                $("#failure-modal").addClass("popover-show");
              }, 80);
    
              $("#failure-modal").css("display", "block");
              $("body").addClass("popover-modal-open");
              $("body").append('<div class="modal-backdrop"></div>');
          }
        })
        .catch(function (error) {
          $('.loader').addClass('hide-loader');
          $('body').removeClass('bg-loader');
          /*otp timer */
          if(remainingTime !== 0){
          resumeTimer()
          }
          $(".jsLoadingBtn").addClass("d-none");
          $('#preapproved-offer-otp .js-resendOTP').removeClass("d-none");
          /*otp timer */
          //failure popup
          setTimeout(function () {
              $("#failure-modal").addClass("popover-show");
            }, 80);
  
            $("#failure-modal").css("display", "block");
            $("body").addClass("popover-modal-open");
            $("body").append('<div class="modal-backdrop"></div>');
        });
    });
    /*preapproved offer otp resend*/

    /*preapprove offer otp try again*/
    $(".js-pretry-again").click(function () {
      if(remainingTime !== 0){
      pauseTimerAndModal()
      }
      $("body").addClass("bg-loader");
      $(".loader").removeClass("hide-loader");
      //getWhatsappNub = $('[data-type="mobile"]').val();
      mobilNumber = getWhatsappNub;
      var reqObj = {
        header: {
          authToken: "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
          "identifier":"nli"
        },
        body: {
          mobileNumber: mobilNumber,
        },
      };
      preApprovedOffersFilterObj
        .generateOtp(reqObj)
        .then(function (response) {
          if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
            if(response.response.responseJson.body.otpRefNo){
              $("body").removeClass("bg-loader");
            $(".loader").addClass("hide-loader");
            otpRefNo = response.response.responseJson.body.otpRefNo;
            $("#preapproved-offer-otp").removeClass("d-none");
            $("#preapproved-offer-error").addClass("d-none");
      
            $("#preapproved-offer-otp .input-textbox").val("");
            $("#preapproved-offer-otp .input-textbox:first").focus();
            $("#preapproved-offer-otp .input-textbox").addClass("pointer-none");
            $("#preapproved-offer-otp .input-textbox:first").removeClass(
              "pointer-none"
            );
            $("#preapproved-offer-otp")
              .find(".js-otp-submit")
              .addClass("btn-disabled");
              /*otp timer*/
              $(".jsGetOTPSent").addClass("d-none");
              resetTimer();
              /*otp timer*/
            }else{
              if(remainingTime !== 0){
              resumeTimer()
              }
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
            if(remainingTime !== 0){
            resumeTimer()
            }
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
        })
        .catch(function (error) {
          if(remainingTime !== 0){
          resumeTimer()
          }
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
    });
    /*preapprove offer otp try again*/

    /*otp timer*/
    if ($('#preapprovedOfferForm').length > 0) {
      $(".jsOnGetCallButton").click(function () {
        $('#not-receive-otp-modal').removeClass("popover-show");
        $('#not-receive-otp-modal').css("display", "none");
        $("body").removeClass("popover-modal-open");
        $('.modal-backdrop').remove();
        $(".jsGetCalling .semibold").html("+91 " + getWhatsappNub);
        $(".jsGetCalling").removeClass("d-none");
        $('.jsOnGetCall').addClass("d-none");
        var reqObj = {
          "header": {
            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
            "identifier": "nli"
          },
          "body": {
            "mobileNumber": getWhatsappNub,
            "otpRefNo": otpRefNo,
          }
        }
        preApprovedOffersFilterObj.onCallOtp(reqObj).then(function (response) {
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
    
    /*preapprove offer otp submit*/
    $("#preapproved-offer-otp .js-otp-submit").click(function (e) {
      if(remainingTime !== 0){
      pauseTimerAndModal();
      }
      var values = [];
      $("#preapproved-offer-otp .js-OtpBox .input-textbox").each(function (
        i,
        ele
      ) {
        values.push(ele.value);
      });
      console.log(values.join(""));
      var reqObj = {
        header: {
          authToken: "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
          "identifier":"nli"
        },
        body: {
          otpRefNo: otpRefNo,
          otp: values.join(""),
        },
      };
      $("body").addClass("bg-loader");
      $(".loader").removeClass("hide-loader");
      preApprovedOffersFilterObj
        .verifyOtp(reqObj)
        .then(function (response) {
          if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.retStatus.toLowerCase() == 'success') {
            reqObj = {
              header: {
                authToken:
                  "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
              },
              body: {
                mobileNumber: getWhatsappNub,
              },
            };
            preApprovedOffersFilterObj.fetchOffers(reqObj).then(function (response) {
                if (response.response.responseJson.header.status.toLowerCase() == "success") {
                  var responseObj = response.response.responseJson.body;
                  if (responseObj.totalSize > 0) {
                    var personalLoanFilter = responseObj.records.filter(
                      function (value) {
                        return (
                          value.Product__r.Name.replace(
                            " ",
                            ""
                          ).toLowerCase() === "personalloan"
                        );
                      }
                    );

                    var businessLoanFilter = responseObj.records.filter(
                      function (value) {
                        return (
                          value.Product__r.Name.replace(
                            " ",
                            ""
                          ).toLowerCase() === "businessloan"
                        );
                      }
                    );
                    var moneyfyFilter = responseObj.records.filter(
                      function (value) {
                        return (
                          value.Product__r.Name.replace(
                            " ",
                            ""
                          ).toLowerCase() === "moneyfy"
                        );
                      }
                    );
                    if (moneyfyFilter < 0) {
                      reqObj = {
                        header: {
                          authToken:
                            "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                          "offerType": "moneyfy"
                        },
                        body: {
                          mobileNumber: getWhatsappNub,
                        },
                      };
                      preApprovedOffersFilterObj.fetchOffers(reqObj).then(function (response) {
                        if (response.response.responseJson.header.status.toLowerCase() == "success") {
                          var responseObjArr = response.response.responseJson.body.records;
                          responseObj.records.push(responseObjArr);
                        }
                      });
                    }
                    //var data = response.response.responseJson.body.records.data;
                    var reqObj = {
                      header: {
                        authToken:
                          "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        productName: "personalLoan",
                      },
                      body: {
                        mobileNumber: getWhatsappNub,
                      },
                    };
                    preApprovedOffersFilterObj
                      .validOffers(reqObj)
                      .then(function (response) {
                        if (
                          response.response.responseJson.header.status.toLowerCase() ==
                          "success"
                        ) {
                          plJocataOfferValid =response.response.responseJson.body.plOnlineJourneyExistingStatus;
                          var reqObj = {
                            header: {
                              authToken:
                                "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                              productName: "businessLoan",
                            },
                            body: {
                              mobileNumber: getWhatsappNub,
                            },
                          };
                          preApprovedOffersFilterObj.validOffers(reqObj).then(function (response) {
                              if (response.response.responseJson.header.status.toLowerCase() =="success") {
                                destroyOtpTimer();
                                $("body").removeClass("bg-loader");
                                $(".loader").addClass("hide-loader");
                                blJocataOfferValid = response.response.responseJson.body.existingCustomer;
                                var count = 0;
                                for (var i = 0;i < responseObj.totalSize;i++) {
                                  var productName = responseObj.records[i].Product__r.Name;
                                  var offerType = responseObj.records[i].OfferType__c;
                                  var lowerCaseProductName = productName.replace(" ", "").toLowerCase();
                                  if (lowerCaseProductName === "personalloan") {
                                    if (plJocataOfferValid === "true") {
                                      count = count;
                                    } else {
                                      if (offerType != "PreQualified") {
                                        count++;
                                      }
                                    }
                                  }
                                  if (lowerCaseProductName === "businessloan") {
                                    if (blJocataOfferValid === "true") {
                                      count = count;
                                    } else {
                                      if (offerType != "PreQualified") {
                                        count++;
                                      }
                                    }
                                  }
                                  if (lowerCaseProductName === 'moneyfy' || lowerCaseProductName === "homeequity" || lowerCaseProductName === "consumerdurables" || lowerCaseProductName === "autoloan" || lowerCaseProductName === "twowheeler"
                                  ) {
                                    if (offerType != "PreQualified") {
                                      count++;
                                    }
                                  }
                                }
                                if (count > 0) {
                                  if (personalLoanFilter.length > 0 && plJocataOfferValid == true) {
                                    var indexPersonalLoan = responseObj.records.map(function (value, index) {
                                        return value.Product__r.Name.toUpperCase() ==="PERSONAL LOAN"? index: "";
                                      }).filter(function (value) {
                                        return value !== "";
                                      });
                                    responseObj.records.splice(indexPersonalLoan,indexPersonalLoan.length);
                                    for (i = 0;i < indexPersonalLoan.length;i++) {
                                      count--;
                                    }
                                  }
                                  if (businessLoanFilter.length > 0 && blJocataOfferValid == true) {
                                    var indexBusinessLoan = responseObj.records.map(function (value, index) {
                                        return value.Product__r.Name.toUpperCase() ==="BUSINESS LOAN" ? index : "";
                                      }).filter(function (value) {
                                        return value !== "";
                                      });
                                    responseObj.records.splice(indexBusinessLoan,indexBusinessLoan.length);
                                    for (i = 0;i < indexBusinessLoan.length;i++) {
                                      count--;
                                    }
                                  }
                                  if (count > 0) {
                                    sessionStorage.setItem("offers",typeof responseObj === "object" ? JSON.stringify(responseObj) : responseObj);
                                    sessionStorage.setItem("customerMobile",getWhatsappNub);
                                    document.location.href ="/content/tata-capital-web/en/pre-approved-offers/preapproved-offers-congratulations.html";
                                    $("#preapproved-offer-otp").addClass("d-none");
                                    $("#js-preapprovepffer-loan").removeClass("d-none");
                                  } else {
                                    document.location.href ="/content/tata-capital-web/en/pre-approved-offers/no-offers.html";
                                    sessionStorage.setItem("customerName",name);
                                    sessionStorage.setItem("customerMobile",getWhatsappNub);
                                  }
                                } else {
                                  document.location.href ="/content/tata-capital-web/en/pre-approved-offers/no-offers.html";
                                  sessionStorage.setItem("customerName",name);
                                  sessionStorage.setItem("customerMobile",getWhatsappNub);
                                }
                              } else {
                                //document.location.href ="/content/tata-capital-web/en/pre-approved-offers/no-offers.html";
                              }
                            })
                            .catch(function (error) {
                              console.error(error);
                            });
                        } else {
                          if(remainingTime !== 0){
                          resumeTimer();
                          }
                          //document.location.href ="/content/tata-capital-web/en/pre-approved-offers/no-offers.html";
                          $("body").removeClass("bg-loader");
                          $(".loader").addClass("hide-loader");
                          setTimeout(function () {
                              $("#failure-modal").addClass("popover-show");
                            }, 80);
                  
                            $("#failure-modal").css("display", "block");
                            $("body").addClass("popover-modal-open");
                            $("body").append('<div class="modal-backdrop"></div>');
                        }
                      })
                      .catch(function (error) {
                        if(remainingTime !== 0){
                        resumeTimer();
                        }
                        console.error(error);
                        $("body").removeClass("bg-loader");
                        $(".loader").addClass("hide-loader");
                        setTimeout(function () {
                            $("#failure-modal").addClass("popover-show");
                          }, 80);
                
                          $("#failure-modal").css("display", "block");
                          $("body").addClass("popover-modal-open");
                          $("body").append('<div class="modal-backdrop"></div>');
                      });
                  } else {
                    reqObj = {
                      header: {
                        authToken:
                          "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "offerType": "moneyfy"
                      },
                      body: {
                        mobileNumber: getWhatsappNub,
                      },
                    };
                    preApprovedOffersFilterObj.fetchOffers(reqObj).then(function (response) {
                      if (response.response.responseJson.header.status.toLowerCase() == "success") {
                        let responseObj = response.response.responseJson.body;
                        if (responseObj.totalSize > 0) {
                          sessionStorage.setItem("offers", typeof responseObj === "object" ? JSON.stringify(responseObj) : responseObj);
                          sessionStorage.setItem("customerMobile", getWhatsappNub);
                          document.location.href = "/content/tata-capital-web/en/pre-approved-offers/preapproved-offers-congratulations.html";
                          $("#preapproved-offer-otp").addClass("d-none");
                          $("#js-preapprovepffer-loan").removeClass("d-none");
                        } else {
                          document.location.href = "/content/tata-capital-web/en/pre-approved-offers/no-offers.html";
                          sessionStorage.setItem("customerName", name);
                          sessionStorage.setItem("customerMobile", getWhatsappNub);
                        }
                      }
                    });
                  }
                } else {
                  if(remainingTime !== 0){
                  resumeTimer();
                  }
                  $("body").removeClass("bg-loader");
                  $(".loader").addClass("hide-loader");
                  setTimeout(function () {
                      $("#failure-modal").addClass("popover-show");
                    }, 80);
          
                    $("#failure-modal").css("display", "block");
                    $("body").addClass("popover-modal-open");
                    $("body").append('<div class="modal-backdrop"></div>');
                }
              })
              .catch(function (error) {
                if(remainingTime !== 0){
                resumeTimer();
                }
                console.error(error);
                $("body").removeClass("bg-loader");
                $(".loader").addClass("hide-loader");
                setTimeout(function () {
                    $("#failure-modal").addClass("popover-show");
                  }, 80);
        
                  $("#failure-modal").css("display", "block");
                  $("body").addClass("popover-modal-open");
                  $("body").append('<div class="modal-backdrop"></div>');
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
                $("body").removeClass("bg-loader");
                $(".loader").addClass("hide-loader");
                $("#preapproved-offer-otp").addClass("d-none");
                $("#js-preapprovepffer-loan").addClass("d-none");
                $("#preapproved-offer-error").removeClass("d-none");
              } else {
                if(remainingTime !== 0){
                resumeTimer()
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
              resumeTimer()
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
          try{
            // otp submit pre approve plan analytics START
            var ctaTitle = getParentElement(e.currentTarget,2).querySelector('.otp-outer-box p').innerText.trim();
            var otpStatus = response.response.responseJson.header.status ? response.response.responseJson.header.status : '';
            var componentName = getParentElement(e.currentTarget,5).querySelector('.component-title h1').innerText.trim();
            var leadID = response.response.responseJson.body.LeadId ? response.response.responseJson.body.LeadId : '';
            var perceptualId = domUtils.getCookie('perpetualId') ? domUtils.getCookie('perpetualId') : "";
            preapprovedplancheckEligibility(ctaTitle,otpStatus,componentName,leadID,perceptualId);
            // otp submit pre approve plan analytics END
          } catch(error) {
            console.log('element not found', error);
          }
        })
        .catch(function (error) {
          if(remainingTime !== 0){
          resumeTimer()
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
    });
    /*preapprove offer otp submit*/

    // validation mobile
    function validateMobile(mobileField) {
      var mobRagex = /^[6-9][0-9]{9}$/;
        var check = mobRagex.test($(mobileField).val());
        if ($(mobileField).val().length != 10 || !check) {
          return false;
        } else {
          return true;
        }
    }
    return jsHelper.freezeObj(preApprovedOffersBizObj);
  })(jsHelper);

  _global.jsHelper.defineReadOnlyObjProp(
    _global,
    "preApprovedOffersBizObj",
    preApprovedOffersBizCallFn
  );
})(this || window || {});
