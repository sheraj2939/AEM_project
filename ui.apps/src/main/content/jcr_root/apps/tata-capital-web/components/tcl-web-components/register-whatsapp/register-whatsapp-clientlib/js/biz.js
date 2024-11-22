(function (_global) {
    var wtsWhatsappBizCallFn = (function (jsHelper) {
        var wtsWhatsappBizObj = {};

        $(document).ready(function (){

            var phoneNumber;
            var otpRefNo;
            var mobileNumber;
            var isCheckboxChecked = $('#iAgreeTerms').is(':checked');
            var inputRequired = $('#registerWhatsapp #download-app-verfiy .jsValueOK').length;
            $('#registerWhatsapp #download-app-verfiy .input-textbox[data-type]').keyup(function () {
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
                            $(this).addClass('jsValueOK');
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(this).removeClass('jsValueOK');
                            $('.submit-number-btn').removeClass('btn-disabled');
                        }
                    }
                } else {
                    $(element).next('.error-msgs').text(ele_required);
                    $('.submit-number-btn').addClass('btn-disabled');
                }
                if (isCheckboxChecked != true){
                    $('.submit-number-btn').addClass('btn-disabled');
                }
                inputRequired = $('#registerWhatsapp #download-app-verfiy .jsValueOK').length;
                // console.log(inputRequired)
                if (inputRequired === 0){
                    $('.submit-number-btn').removeClass('btn-disabled');
                }
            });
        
        
            $('#registerWhatsapp #download-app-verfiy .jsSumitBtn').click(function (e) {
                $('.submit-number-btn').addClass('btn-disabled');
                var ele_input = $('#registerWhatsapp #download-app-verfiy').find('.form-textbox-new [data-type]:visible');
                var checkRequired = 'Please confirm checkbox';
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
        
                // console.log(isCheckboxChecked)
                if (isCheckboxChecked === true){
                    $('#iAgreeTerms').removeClass('jsValueOK');
                } else {
                    $('#iAgreeTerms').addClass('jsValueOK');
                    errors.push(checkRequired)
                    $('#iAgreeTerms').parents().find('.custom-checkbox-label').next('.error-msgs').text(checkRequired);
                }
        
        
                if (errors.length == 0) {
                // register loan via whatsapp submit analytics START
                try{
                    var ctaTitle = getParentElement(e.currentTarget, 9).querySelector('.jsDownloadHeading').innerText.trim();
                    var mobileNo = document.querySelector('[data-type="otp-send-number"]').value
                    var componentName = getParentElement(e.currentTarget,10).classList[0].split('-').join(' ') + ' box';    
                    whatsappSubmit(componentName,ctaTitle,mobileNo);
                } catch(error){
                    console.log('element not found', error);
                }
                // register loan via whatsapp submit analytics END
                    $('.loader').removeClass('hide-loader');
                    $('body').addClass('bg-loader');
                    mobileNumber=$('[data-type="otp-send-number"]').val();
                    var reqObj={
                        "header": {
                            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                            "identifier":"nli"
                        },
                        "body": {
                            "mobileNumber": mobileNumber
                        }
                    }
                    wtsWhatsappFilterObj.generateOtp(reqObj).then(function (response) {
                        if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                            if(response.response.responseJson.body.otpRefNo){
                                otpRefNo = response.response.responseJson.body.otpRefNo;
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            $('#registerWhatsapp #download-app-verfiy').addClass('d-none')
                            $('.download-app-otp-wrap').removeClass('d-none')
                            $('.jsOTPInputBox').find('.js-OtpBox .input-textbox:first-child').focus();
                            //Clear
                            $('#registerWhatsapp #download-app-verfiy .input-textbox').val('');
                            $('#registerWhatsapp #download-app-verfiy .form-textbox-new').removeClass('active');
                            $('.jsEnterOtp').removeClass('d-none');
                            $('.jsDownloadHeading').addClass('d-none');
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
        
        
            $('#iAgreeTerms').on('change', function (){
                var checkRequired = 'Please confirm checkbox';
                $(this).parents().find('.custom-checkbox-label').next('.error-msgs').remove();
                $(this).parents().find('.custom-checkbox-label').after('<span class="error-msgs" style="top: 100%"></span>');
                isCheckboxChecked = $(this).is(':checked');
                // console.log(isCheckboxChecked)
                if (isCheckboxChecked === true){
                    $(this).removeClass('jsValueOK');
                } else {
                    $(this).addClass('jsValueOK');
                    $(this).parents().find('.custom-checkbox-label').next('.error-msgs').text(checkRequired);
                }
                inputRequired = $('#registerWhatsapp #download-app-verfiy .jsValueOK').length;
                if (inputRequired === 0){
                    $('.submit-number-btn').removeClass('btn-disabled');
                } else {
                    $('.submit-number-btn').addClass('btn-disabled');
                }
            })
        
        
        
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
        
            $('#registerWhatsapp .download-app-otp-wrap .verify-otp-btn').click(function (e) {
                if(remainingTime !== 0){
                pauseTimerAndModal();
                }
                $('.download-app-otp-wrap .verify-otp-btn').addClass('btn-disabled');
                $('.jsShowWhatsappNumber').text(phoneNumber);
                var values = []
                $('.download-app-otp-wrap .js-OtpBox .input-textbox').each(function (i, ele) {
                    values.push(ele.value);
                });
                
                $('body').addClass('bg-loader');
                $('.loader').removeClass('hide-loader');
                var reqObj = {
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "identifier":"nli"
                    },
                    "body": {
                        "otpRefNo": otpRefNo,
                        "otp": values.join("")
                    }
                }
                wtsWhatsappFilterObj.verifyOtp(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status == 'SUCCESS') {
                        if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.retStatus.toLowerCase() == 'success') {
                            var reqObj = {
                                "header":{
                                    "authToken":"MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="
                                },
                                "body":{
                                    "mobileNumber":"91"+mobileNumber,
                                    "templateId":"welcome_message_updated_english"
                                }
                            }
                            wtsWhatsappFilterObj.wtsWhatsapp(reqObj).then(function (response) {
                                console.log(response);
                                if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.status == "200") {
                                    destroyOtpTimer();
                                    $('.loader').addClass('hide-loader');
                                    $('body').removeClass('bg-loader');
                                    $('.jsOTPVerifySuccess').removeClass('d-none');
                                    $('.jsDownloadHeading').addClass('d-none');
                                    $('.jsEnterOtp').addClass('d-none');
                                    $('.download-app-otp-wrap').addClass('d-none');
                                }else{
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
                        }
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
                    // whatsapp verify otp analytics START
                    try{
                        var componentName = getParentElement(e.currentTarget, 10).classList[0].split('-').join(' ') + ' box';
                        var ctaTitle = getParentElement(e.currentTarget, 10).querySelector('.jsEnterOtp').innerText.trim();
                        var otpStatus = response.response.responseJson.header.status.toLowerCase();
                        whatsappotpVerify(componentName, ctaTitle, otpStatus)
                    } catch (error){
                        console.log('element not found', error);
                    }
                    // whatsapp verify otp analytics END
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

                // console.log(values.join(""))
            })
        
            //Otp details close button
            $('.jsOTPMsgClose').click(function () {
                $('.download-app-otp-wrap .js-OtpBox .input-textbox').val('');
                $('.download-app-otp-msg').addClass('d-none');
                $('.download-app-otp-wrap').addClass('d-none');
                $('#registerWhatsapp #download-app-verfiy ').removeClass('d-none');
                $('.jsEnterOtp').addClass('d-none');
                $('.jsDownloadHeading').removeClass('d-none');
                $('#iAgreeTerms').prop('checked', true);
            })
        
            /*otp msg try again*/
            $('#registerWhatsapp .jsTryAgain').click(function (e) {
                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                // otp msg try again analytics START
                try{
                    var ctaText = e.currentTarget.innerText.trim();
                    var ctaTitle = getParentElement(e.currentTarget,3).querySelector('.success-inner p').innerText.trim();
                    var componentName = getParentElement(e.currentTarget,10).classList[0].split('-').join(' ') + ' box'; 
                    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
                } catch(error){
                    console.log('element not found', error);
                }
                // otp msg try again analytics END
                var reqObj={
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "identifier":"nli"
                    },
                    "body": {
                        "mobileNumber": mobileNumber
                    }
                }
                wtsWhatsappFilterObj.generateOtp(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                        if(response.response.responseJson.body.otpRefNo){
                            otpRefNo = response.response.responseJson.body.otpRefNo;
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $('.jsEnterOtp').removeClass('d-none');
                $('.download-app-otp-wrap').removeClass('d-none');
                $('.download-app-otp-wrap .verify-otp-btn').addClass('btn-disabled');
                $('.download-app-otp-msg').addClass('d-none');
                $('.download-app-otp-wrap .js-OtpBox .input-textbox').val('');
                $('.download-app-otp-wrap .js-OtpBox .input-textbox:first-child').focus();
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
            $('#registerWhatsapp .jsResendOtp').click(function (e) {
                /* otp timer */
                if(remainingTime !== 0){
                pauseTimerAndModal()
                }
                $(".jsLoadingBtn").removeClass("d-none");
                $(".jsGetOTPSent").addClass("d-none");
                $('.jsResendOtp').addClass("d-none");
                /* otp timer */
                // resend otp analytics START
                try{
                    var ctaText = e.currentTarget.innerText.trim();
                    var ctaTitle = getParentElement(e.currentTarget, 8).querySelector('.jsEnterOtp').innerText.trim();
                    var componentName = getParentElement(e.currentTarget,9).classList[0].split('-').join(' ') + ' box';    
                    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
                } catch(error){
                    console.log('element not found', error);
                }
                // resend otp analytics END
                $('.download-app-otp-wrap .verify-otp-btn').addClass('btn-disabled');
                $('.download-app-otp-wrap .js-OtpBox .input-textbox').val('');
                $('.download-app-otp-wrap .js-OtpBox .input-textbox:first-child').focus();
                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                var reqObj={
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "identifier":"nli"
                    },
                    "body": {
                        "mobileNumber": mobileNumber
                    }
                }
                wtsWhatsappFilterObj.generateOtp(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                        if(response.response.responseJson.body.otpRefNo){
                            otpRefNo = response.response.responseJson.body.otpRefNo;
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $('#registerWhatsapp #download-app-verfiy').addClass('d-none')
                        $('.download-app-otp-wrap').removeClass('d-none')
                        $('.jsOTPInputBox').find('.js-OtpBox .input-textbox:first-child').focus();
                        //Clear
                        $('#registerWhatsapp #download-app-verfiy .input-textbox').val('');
                        $('#registerWhatsapp #download-app-verfiy .form-textbox-new').removeClass('active');
                        $('.jsEnterOtp').removeClass('d-none');
                        $('.jsDownloadHeading').addClass('d-none');
                            /*otp timer */
                            var timer2 = "03:00";
                            /* var timer = timer2.split(":");
                            var minutes = parseInt(timer[0], 10);
                            var seconds = parseInt(timer[1], 10);
                            $("#timer").html("0" + minutes + ":" + "0" + seconds); */
                            $('.jsResendOtp').removeClass("d-none");
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

                            /*otp timer */
                            $(".jsLoadingBtn").addClass("d-none");
                            $('.jsResendOtp').removeClass("d-none");
                            if(remainingTime !== 0){
                            resumeTimer()
                            }
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
                        $('.jsResendOtp').removeClass("d-none");
                        /*otp timer */
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
                    /*otp timer */
                    if(remainingTime !== 0){
                    resumeTimer()
                    }
                    $(".jsLoadingBtn").addClass("d-none");
                    $('.jsResendOtp').removeClass("d-none");
                    /*otp timer */
                });
            });

            /*otp timer*/
            if ($('#registerWhatsapp').length > 0) {
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
                    wtsWhatsappFilterObj.onCallOtp(reqObj).then(function (response) {
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

                        }else if (response.response.responseJson.header.status.toLowerCase() == 'failure' && response.response.responseJson.errorBody.message.toLowerCase() == 'otp expired') {
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
        })

        return jsHelper.freezeObj(wtsWhatsappBizObj);
    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, "wtsWhatsappBizObj", wtsWhatsappBizCallFn);
})(this || window || {});
