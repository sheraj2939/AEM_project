(function (_global) {
    var downLoadAppSmsCompBizCallFn = (function (jsHelper) {
        var downLoadAppSmsCompBizObj = {};

        $(document).ready(function () {

            var phoneNumber;
            var otpRefNo;
            var mobileNumber;
            $('#downloadAppComp #download-app-verfiy .input-textbox[data-type]').keyup(function () {
                var element = $(this);
                var ele_required = 'Field is required';
                var ele_phoneNumber = "Please enter valid number";

                phoneNumber = $(element).val();

                $(this).next('.error-msgs').remove();
                $(this).after('<span class="error-msgs" style="top: 100%"></span>');
                $(this).parents('.form-group').addClass('error');
                if ($(element).val() != '') {
                    if ($(element).data('type') === 'otp-send-number') {
                        if (!validateMobile(element)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_phoneNumber);
                            $('.submit-number-btn').addClass('btn-disabled');
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $('.submit-number-btn').removeClass('btn-disabled');
                        }
                    }
                } else {
                    $(element).next('.error-msgs').text(ele_required);
                    $('.submit-number-btn').addClass('btn-disabled');
                }
            });


            $('#downloadAppComp #download-app-verfiy .jsSumitBtn').click(function () {
                $('.submit-number-btn').addClass('btn-disabled');
                var ele_input = $('#downloadAppComp #download-app-verfiy').find('.form-textbox-new [data-type]:visible');
                var errors = [];
                allFilled = true;
                var ele_required = "Field is required";

                $(ele_input).each(function () {
                    var element = $(this);
                    var ele_phoneNumber = "Please enter valid number";

                    $(element).parents('.form-textbox-new').find('.error-msgs').remove();
                    $(element).parents('.form-textbox-new').addClass('textboxerror');

                    if (element.is(":visible")) {
                        if (element.val() != '') {
                            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                            $(element).after('<span class="error-msgs" style="top: 43px"></span>');

                            if ($(element).data('type') === 'otp-send-number') {
                                if (!validateMobile(element)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_phoneNumber);
                                    errors.push(ele_phoneNumber)
                                } else {
                                    userPhoneNumber = $(element).val();
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
                    $('.loader').removeClass('hide-loader');
                    $('body').addClass('bg-loader');
                    // clearCompleteForm();
                    mobileNumber = $('[data-type="otp-send-number"]').val();
                    var reqObj = {
                        "header": {
                            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                            "identifier":"nli"
                        },
                        "body": {
                            "mobileNumber": mobileNumber
                        }
                    }
                    downLoadAppSmsCompFilterObj.generateOtp(reqObj).then(function (response) {
                        if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                            if(response.response.responseJson.body.otpRefNo){
                                /*otp timer*/
                                $(".jsGetOTPSent").addClass("d-none");
                                $('.jsOnGetCall').addClass('d-none');
                                $('.jsGetOTPSent').addClass('d-none');
                                resetTimer()
                                /*otp timer*/ 
                                otpRefNo = response.response.responseJson.body.otpRefNo;
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            $('#downloadAppComp #download-app-verfiy').addClass('d-none');
                            $('.download-app-otp-wrap').removeClass('d-none');
                            $('.jsOTPInputBox').find('.js-OtpBox .input-textbox:first-child').focus();
                            //Clear
                            $('#downloadAppComp #download-app-verfiy .input-textbox').val('');
                            $('#downloadAppComp #download-app-verfiy .form-textbox-new').removeClass('active');
                            $('.jsEnterOtp').removeClass('d-none');
                            $('.jsDownloadHeading').addClass('d-none');
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



            $(".download-app-otp-wrap .js-OtpBox .input-textbox").keyup(function () {
                if (this.value.length == this.maxLength) {
                    $(this).next('.input-textbox').focus();
                    $(this).next('.input-textbox').removeClass('pointer-none');
                } else {
                    $(this).prev('.input-textbox').focus();
                    $(this).addClass('pointer-none');
                    $('.js-OtpBox .input-textbox:first').removeClass('pointer-none');
                }

                var ele_input = $('.js-OtpBox .input-textbox');
                $(ele_input).each(function () {
                    if ($(this).val().length != 0) {
                        $(this).parents('.download-app-otp-wrap').find('.verify-otp-btn').removeClass('btn-disabled');
                    } else {
                        $(this).parents('.download-app-otp-wrap').find('.verify-otp-btn').addClass('btn-disabled');
                    }
                });
            })

            $('#downloadAppComp .download-app-otp-wrap .verify-otp-btn').click(function () {
                if(remainingTime !== 0){
                pauseTimerAndModal();
                }
                $('body').addClass('bg-loader');
                $('.loader').removeClass('hide-loader');
                $('.download-app-otp-wrap .verify-otp-btn').addClass('btn-disabled');
                $('.jsShowWhatsappNumber').text(mobileNumber);
                var values = []
                $('.download-app-otp-wrap .js-OtpBox .input-textbox').each(function (i, ele) {
                    values.push(ele.value);
                });
                // console.log(values.join(""))
                var reqObj = {
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "identifier": "nli"
                    },
                    "body": {
                        "otpRefNo": otpRefNo,
                        "otp": values.join("")
                    }
                }
                downLoadAppSmsCompFilterObj.verifyOtp(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.retStatus.toLowerCase() == 'success') {
                        
                        if (response.response.responseJson.body.retStatus == 'SUCCESS') {
                            
                            var reqObj = {
                                header: {
                                    authToken: "vfdfffvff",
                                },
                                body: {
                                    mobileNumber: mobileNumber,
                                    templateName: "retail-app-download",
                                    templateJson: {},
                                }
                            };
                            downLoadAppSmsFilterObj.downLoadAppSms(reqObj).then(function (response) {
                                console.log(response);
                                if (JSON.parse(response.response).responseJson.header.status == 'SUCCESS') {
                                    destroyOtpTimer();
                                    $('.loader').addClass('hide-loader');
                                    $('body').removeClass('bg-loader');
                                    console.log("Successful!");
                                    $('.jsOTPVerifySuccess').removeClass('d-none');
                                    $('.jsDownloadHeading').addClass('d-none');
                                    $('.jsEnterOtp').addClass('d-none');
                                    $('.download-app-otp-wrap').addClass('d-none');
                                }
                                else{
                                    destroyOtpTimer();
                                    $('.loader').addClass('hide-loader');
                                    $('body').removeClass('bg-loader');
                                    $('.jsOTPVerifyFail').removeClass('d-none');
                                    $('.jsDownloadHeading').addClass('d-none');
                                    $('.jsEnterOtp').addClass('d-none');
                                    $('.download-app-otp-wrap').addClass('d-none');
                                }
                            })
                                .catch(function (error) {
                                    if(remainingTime !== 0){
                                    resumeTimer();
                                    }
                                    console.error(error);
                                });
                        }
                    }
                    else if (response.response.responseJson.header.status.toLowerCase() == 'failure' && response.response.responseJson.errorBody.errorMessage && response.response.responseJson.errorBody.errorMessage.toLowerCase() == 'otp has expired!') {
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

                    }
                    else{
                        if(response.response.responseJson.errorBody.statusCode == "403") {
                            var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                            if(errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode =="ERROTP201") {
                                destroyOtpTimer();
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                $('.jsOTPVerifyFail').removeClass('d-none');
                                $('.jsDownloadHeading').addClass('d-none');
                                $('.jsEnterOtp').addClass('d-none');
                                $('.download-app-otp-wrap').addClass('d-none');
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
            })

            //Otp details close button
            $('.jsOTPMsgClose').click(function () {
                $('.download-app-otp-wrap .js-OtpBox .input-textbox').val('');
                $('.download-app-otp-msg').addClass('d-none');
                $('.download-app-otp-wrap').addClass('d-none');
                $('#downloadAppComp #download-app-verfiy ').removeClass('d-none');
                $('.jsEnterOtp').addClass('d-none');
                $('.jsDownloadHeading').removeClass('d-none');
            })

            /*otp msg try again*/
            $('#downloadAppComp .jsTryAgain').click(function () {
                var reqObj = {
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "identifier":"nli"
                    },
                    "body": {
                        "mobileNumber": mobileNumber
                    }
                }
                downLoadAppSmsCompFilterObj.generateOtp(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                        if(response.response.responseJson.body.otpRefNo){
                            resetTimer();
                            otpRefNo = response.response.responseJson.body.otpRefNo;
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $('.jsEnterOtp').removeClass('d-none');
                $('.download-app-otp-wrap').removeClass('d-none');
                $('.download-app-otp-wrap .verify-otp-btn').addClass('btn-disabled');
                $('.download-app-otp-msg').addClass('d-none');
                $('.download-app-otp-wrap .js-OtpBox .input-textbox').val('');
                $('.download-app-otp-wrap .js-OtpBox .input-textbox:first-child').focus();
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
            /*otp msg resend*/
            $('#downloadAppComp .jsResendOtp').click(function () {
                /* otp timer */
                if(remainingTime !== 0){
                pauseTimerAndModal()
                }
                $(".jsLoadingBtn").removeClass("d-none");
                $(".jsGetOTPSent").addClass("d-none");
                $('.download-app-resend-otp.jsResendOtp').addClass("d-none");
                /* otp timer */
                var reqObj = {
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "identifier":"nli"
                    },
                    "body": {
                        "mobileNumber": mobileNumber
                    }
                }
                downLoadAppSmsCompFilterObj.generateOtp(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                        if(response.response.responseJson.body.otpRefNo){

                            /*otp timer */
                            $('.download-app-resend-otp.jsResendOtp').removeClass("d-none");
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

                            otpRefNo = response.response.responseJson.body.otpRefNo;
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $('#downloadAppComp #download-app-verfiy').addClass('d-none');
                        $('.download-app-otp-wrap').removeClass('d-none');
                        $('.jsOTPInputBox').find('.js-OtpBox .input-textbox:first-child').focus();
                        //Clear
                        $('#downloadAppComp #download-app-verfiy .input-textbox').val('');
                        $('#downloadAppComp #download-app-verfiy .form-textbox-new').removeClass('active');
                        $('.jsEnterOtp').removeClass('d-none');
                        $('.jsDownloadHeading').addClass('d-none');
                        }else{
                            $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                            /*otp timer */
                            if(remainingTime !== 0){
                            resumeTimer()
                            }
                            $(".jsLoadingBtn").addClass("d-none");
                            $('.download-app-resend-otp.jsResendOtp').removeClass("d-none");
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
                        $('.download-app-resend-otp.jsResendOtp').removeClass("d-none");
                        /*otp timer */
                        //failure popup
                        setTimeout(function () {
                            $("#failure-modal").addClass("popover-show");
                          }, 80);
                
                          $("#failure-modal").css("display", "block");
                          $("body").addClass("popover-modal-open");
                          $("body").append('<div class="modal-backdrop"></div>');
                    }
                }).catch(function (error) {
                    $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                    /*otp timer */
                    if(remainingTime !== 0){
                    resumeTimer()
                    }
                    $(".jsLoadingBtn").addClass("d-none");
                    $('.download-app-resend-otp.jsResendOtp').removeClass("d-none");
                    /*otp timer */
                        //failure popup
                        setTimeout(function () {
                            $("#failure-modal").addClass("popover-show");
                          }, 80);
                
                          $("#failure-modal").css("display", "block");
                          $("body").addClass("popover-modal-open");
                          $("body").append('<div class="modal-backdrop"></div>');
                });
                $('.download-app-otp-wrap .verify-otp-btn').addClass('btn-disabled');
                $('.download-app-otp-wrap .js-OtpBox .input-textbox').val('');
                $('.download-app-otp-wrap .js-OtpBox .input-textbox:first-child').focus();
            });

            /*otp timer*/
            if ($('#downloadAppComp').length > 0) {
                $(".jsOnGetCallButton").click(function () {
                    $('#not-receive-otp-modal').removeClass("popover-show");
                    $('#not-receive-otp-modal').css("display", "none");
                    $("body").removeClass("popover-modal-open");
                    $('.modal-backdrop').remove();
                    $(".jsGetCalling .semibold").html("+91 " + mobileNumber);
                    $(".jsGetCalling").removeClass("d-none");
                    $('.jsOnGetCall').addClass("d-none");
                    var reqObj = {
                        "header": {
                            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                            "identifier": "nli"
                        },
                        "body": {
                            "mobileNumber": mobileNumber,
                            "otpRefNo": otpRefNo,
                        }
                    }
                    downLoadAppSmsCompFilterObj.onCallOtp(reqObj).then(function (response) {
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

        return jsHelper.freezeObj(downLoadAppSmsCompBizObj);
    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(
        _global,
        "downLoadAppSmsCompBizObj",
        downLoadAppSmsCompBizCallFn
    );
})(this || window || {});
