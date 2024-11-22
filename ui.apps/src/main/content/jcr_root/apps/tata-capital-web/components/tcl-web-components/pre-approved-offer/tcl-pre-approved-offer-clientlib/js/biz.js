// pre-approved loan
(function (_global) {
  var instantLoansBizCallFn = (function (jsHelper) {
    var instantLoansBizObj = {};

    var getWhatsappNub;
    var otpRefNo;
    var plJocataOfferValid = false;
    var blJocataOfferValid = false;
    var name;
    $('#preApprovedLoanForm .input-textbox[data-type]').keyup(function () {
      var element = $(this);
      var ele_value = element.val();
      var ele_required = 'Field is required';
      var ele_name = "Enter full name as PAN card";
      var ele_phoneNumber = "Please enter valid number";

      $(this).next('.error-msgs').remove();
      $(this).after('<span class="error-msgs"></span>');
      $(this).parents('.form-group').addClass('error');

      if ($(element).val() != '') {
        if ($(element).data('type') === 'name') {
          var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;

          if (ele_value != '' && !ele_value.match(regName)) {
            $(element).parents('.form-textbox').addClass('textboxerror');
            $(element).next('.error-msgs').text(ele_name);
          }
          else {
            $(element).parents('.form-textbox').removeClass('textboxerror');
            $(element).next().text('');
          }
        }
        if ($(element).data('type') === 'mobile') {
          if (!validateMobile(element)) {
            $(element).parents('.form-textbox').addClass('textboxerror');
            $(element).next('.error-msgs').text(ele_phoneNumber);
          } else {
            $(element).parents('.form-textbox').removeClass('textboxerror');
            $(element).next().text('');
            $(this).next('.error-msgs').remove();
          }
        }

      } else {
        $(element).next('.error-msgs').text(ele_required);
      }
    });
    $('#preApprovedLoanForm .js-proceed-btn').click(function () {
      var ele_input = $('#preApprovedLoanForm .input-textbox');
      var errors = [];
      allFilled = true;
      var ele_required = "Field is required";

      $(ele_input).each(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_name = "Enter full name as PAN card";
        var ele_phoneNumber = "Please enter valid Phone Number";

        $(element).next().remove();

        if (element.is(":visible")) {
          if (element.val() != '') {
            $(element).after('<span class="error-msgs"></span>');
            if ($(element).data('type') === 'name') {
              var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;

              if (ele_value != '' && !ele_value.match(regName)) {
                $(element).parents('.form-textbox').addClass('textboxerror');
                $(element).next('.error-msgs').text(ele_name);
                errors.push(ele_name);
              }
              else {
                $(element).parents('.form-textbox').removeClass('textboxerror');
                $(element).next().text('');
              }
            }
            if ($(element).data('type') === 'mobile') {
              if (!validateMobile(element)) {
                $(element).parents('.form-textbox').addClass('textboxerror');
                $(element).next('.error-msgs').text(ele_phoneNumber);
                errors.push(ele_phoneNumber);
              } else {
                $(element).parents('.form-textbox').removeClass('textboxerror');
                $(element).next().text('');
                $(this).next('.error-msgs').remove();
              }
            }
          } else {
            $(element).parents('.form-textbox').addClass('textboxerror');
            $(element).after('<span class="error-msgs">' + ele_required + '</span>');
            errors.push(ele_required);
          }
        }
      });
      if (errors.length == 0) {
        $("body").addClass("bg-loader");
        $(".loader").removeClass("hide-loader");
        getWhatsappNub = $('[data-type="mobile"]').val();
        name = $('[data-type="name"]').val();
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
        instantLoansFilterObj.generateOtp(reqObj).then(function (response) {
          if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
            if(response.response.responseJson.body.otpRefNo){
              $("body").removeClass("bg-loader");
            $(".loader").addClass("hide-loader");
            otpRefNo = response.response.responseJson.body.otpRefNo;
            $('.pre-approved-otp').removeClass('d-none');
            $('.pre-approved-candidate').addClass('d-none');
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

    $('#preApprovedOtp .js-resendOTP').click(function () {
      $("#preApprovedOtp .js-OtpBox .input-textbox").val("")
      $("body").addClass("bg-loader");
      $(".loader").removeClass("hide-loader");
      /* otp timer */
      if(remainingTime !== 0){
      pauseTimerAndModal()
      }
      $(".jsLoadingBtn").removeClass("d-none");
      $(".jsGetOTPSent").addClass("d-none");
      $('.js-resendOTP').addClass("d-none");
      /* otp timer */
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
      instantLoansFilterObj
        .generateOtp(reqObj)
        .then(function (response) {
          if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
            if(response.response.responseJson.body.otpRefNo){
              $("body").removeClass("bg-loader");
              $(".loader").addClass("hide-loader");
              otpRefNo = response.response.responseJson.body.otpRefNo;
              $(this).parents('#preApprovedOtp').find('.js-OtpBox .input-textbox').val('').parents('.form-textbox').removeClass('active');
              $(this).parents('#preApprovedOtp').find('.js-OtpBox .input-textbox:first-child').focus();
              $(this).parents('#preApprovedOtp').find('button').addClass('btn-disabled');
              $('#preApprovedOtp .input-error').addClass('d-none');
              $('#preApprovedOtp .label-name').removeClass('d-none');
              /*otp timer */
              /* var timer2 = "03:00";
              var timer = timer2.split(":");
              var minutes = parseInt(timer[0], 10);
              var seconds = parseInt(timer[1], 10);
              $("#timer").html("0" + minutes + ":" + "0" + seconds); */
              $('.js-resendOTP').removeClass("d-none");
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
              //failure popup
              setTimeout(function () {
                  $("#failure-modal").addClass("popover-show");
                }, 80);
      
                $("#failure-modal").css("display", "block");
                $("body").addClass("popover-modal-open");
                $("body").append('<div class="modal-backdrop"></div>');
              /*otp timer */
              if(remainingTime !== 0){
              resumeTimer()
              }
              $(".jsLoadingBtn").addClass("d-none");
              $('.js-resendOTP').removeClass("d-none");
              /*otp timer */
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
            /*otp timer */
            if(remainingTime !== 0){
            resumeTimer()
            }
            $(".jsLoadingBtn").addClass("d-none");
            $('.js-resendOTP').removeClass("d-none");
            /*otp timer */
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
          /*otp timer */
          if(remainingTime !== 0){
          resumeTimer()
          }
          $(".jsLoadingBtn").addClass("d-none");
          $('.js-resendOTP').removeClass("d-none");
          /*otp timer */
        });
    });
    $("#preApprovedOtp .js-OtpBox .input-textbox").keyup(function () {

      $(this).parents('.form-textbox').removeClass('textboxerror');

      if (this.value.length == this.maxLength) {
        $(this).next('.input-textbox').focus();
        $(this).next('.input-textbox').removeClass('pointer-none');
      } else {
        $(this).prev('.input-textbox').focus();
        $(this).addClass('pointer-none');
        $('#preApprovedOtp .input-textbox:first').removeClass('pointer-none');
      }

      $(this).parents('.form-textbox').addClass('active');
      var ele_input = $('.js-OtpBox .input-textbox');

      $(ele_input).each(function () {
        if ($(this).val().length != 0) {
          $(this).parents('#preApprovedOtp').find('.jsPreApprovedSubmitOtp').removeClass('btn-disabled');
          $(this).parents('.form-textbox').addClass('active');
        }
        else {
          $(this).parents('#preApprovedOtp').find('.jsPreApprovedSubmitOtp').addClass('btn-disabled');
        }
      });
      $('[dropdown-item]').click(function () {
        $(this).parents('.custom-dropdown').find('[dropdown-item]').removeClass('active');
        $(this).addClass('active');
        var dropdownSelected = $(this).text();
        $(this).parents('.custom-dropdown').find('.dropdown-heading').text(dropdownSelected);
      })
    }).focus(function () {
      $('.error-msgs').remove();
      $(this).parents('.form-textbox').removeClass('textboxerror');
    }).blur(function () {
      if ($(this).val().length != 0) {
        $(this).parents('.form-textbox').addClass("active");
      } else if ($(this).val().length == 0) {
        $(this).parents('.form-textbox').removeClass("active");
      }
    });

    $('.jsPreApprovedSubmitOtp').on('click', function (e) {
      if(remainingTime !== 0){
      pauseTimerAndModal();
      }
      var values = [];
      $("#preApprovedOtp .js-OtpBox .input-textbox").each(function (
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
      instantLoansFilterObj.verifyOtp(reqObj).then(function (response) {
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
            instantLoansFilterObj.fetchOffers(reqObj).then(function (response) {
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
                    instantLoansFilterObj.validOffers(reqObj).then(function (response) {
                        if (response.response.responseJson.header.status.toLowerCase() =="success") {
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
                          instantLoansFilterObj.validOffers(reqObj).then(function (response) {
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
                  }else{
                    document.location.href ="/content/tata-capital-web/en/pre-approved-offers/no-offers.html";
                    sessionStorage.setItem("customerName",name);
                    sessionStorage.setItem("customerMobile",getWhatsappNub);
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
          }  else if (response.response.responseJson.header.status.toLowerCase() == 'failure' && response.response.responseJson.errorBody.errorMessage && response.response.responseJson.errorBody.errorMessage.toLowerCase() == 'otp has expired!') {
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
                $('.js-OtpBox .input-textbox').val('').parents('.form-textbox').removeClass('active');
                $(".preapproved-offer-otp").addClass("d-none");
                $(".js-preapprovepffer-loan").addClass("d-none");
                $(".preapproved-offer-error").removeClass("d-none");
                $(".pre-approved-otp-error").removeClass("d-none");
                $("#preApprovedOtp").addClass("d-none");
                $(".pre-approved-candidate").removeClass("d-none");
                $("#preApprovedLoanForm").addClass("d-none");
                $('.pre-approved-candidate .text').addClass('d-none');
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
            try{
            // check eligibility analytics START
            var ctaTitle = document.querySelector('#preApprovedOtp .label-name').innerText.trim();
            var componentName = getParentElement(e.currentTarget , 5).querySelector('h2').innerText.trim();
            var otpStatus = response.response.responseJson.header.status ? response.response.responseJson.header.status : '';
            var leadID = response.response.responseJson.body.LeadId ? response.response.responseJson.body.LeadId : '';
            var perceptualId = domUtils.getCookie('perpetualId') ? domUtils.getCookie('perpetualId') : "";
            preapprovedplancheckEligibility(ctaTitle,otpStatus,componentName,leadID,perceptualId);
            // check eligibility analytics END
            }catch (error){
              console.log('selector not found', error);
            }
        }) 
        .catch(function (error) {
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
        $('.jsTryAgainPreApproved').click(function(e){
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
          instantLoansFilterObj
            .generateOtp(reqObj)
            .then(function (response) {
              if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                if(response.response.responseJson.body.otpRefNo){
                  $("body").removeClass("bg-loader");
                  $(".loader").addClass("hide-loader");
                  otpRefNo = response.response.responseJson.body.otpRefNo;
                  $(".preapproved-offer-otp").removeClass("d-none");
                  $(".js-preapprovepffer-loan").addClass("d-none");
                  $(".preapproved-offer-error").addClass("d-none");
                  $(".pre-approved-otp-error").addClass("d-none");
                  $("#preApprovedOtp").removeClass("d-none");
                  $(".pre-approved-candidate").addClass("d-none");
                  $("#preApprovedLoanForm").addClass("d-none");
                  $('.pre-approved-candidate .text').removeClass('d-none');
                  resetTimer();
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
              try{
                // try again pre approved analytics START
                var ctaText = e.currentTarget.innerText.trim();
                var componentName =  getParentElement(document.querySelector('.jsTryAgainPreApproved'), 2).classList[0].split('-').join(' ');
                var ctaTitle =  getParentElement(e.currentTarget, 2).querySelector('h3').innerText.trim();
                ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
                // try again pre approved analytics END
              } catch(error) {
                console.log('selector not found', error);
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
      })
      /*$('#preApprovedOtp .input-textbox').val('')
      $('#preApprovedLoanForm').find('.form-textbox').removeClass('active');
      $('#preApprovedLoanForm').find('.input-textbox').val('');
      window.location = 'http://www.google.com/';*/
    })

    /*otp timer*/
    if ($('#preApprovedOffer').length > 0) {
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
        instantLoansFilterObj.onCallOtp(reqObj).then(function (response) {
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

    return jsHelper.freezeObj(instantLoansBizObj);
  })(jsHelper);

  _global.jsHelper.defineReadOnlyObjProp(
    _global,
    "instantLoansBizObj",
    instantLoansBizCallFn
  );
})(this || window || {});
