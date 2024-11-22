(function (_global) {
    var emiPartPaymentBizCallFn = (function (jsHelper) {
        var emiPartPaymentBizObj = {}

        $(document).ready(function () {
            var urlParams = getURLParams(location.href)
            var flag=true;
            var accno = "";
            if(urlParams.uniqueId){
                var reqObj = {};
                $("body").addClass("bg-loader");
                $(".loader").removeClass("hide-loader");
                emiPartPaymentFilterObj.prePopulateEpp(reqObj).then(function (response) {
                    console.log(response)
                    if (response.status.toLowerCase() == "success") {
                        var responseData = JSON.parse(response.response).Master;
                        emiPartPaymentFilterObj.emiPartPaymentCampaignGet(reqObj).then(function (response) {
                            var responseDataEmi = JSON.parse(response.response).Master;
                            responseDataEmi.forEach(function(e,i){
                                if(e.uniqueid == urlParams.uniqueId){
                                   flag = false; 
                                }else{
                                    
                                }
                            })

                            if(flag){
                                responseData.forEach(function(e,i){
                                    if(e.uniqueid == urlParams.uniqueId){
                                        $('.loan-against-sucess-msg').addClass('d-none');
                                        $('.loan-against-form-wrap').removeClass('d-none');
                                        $("body").removeClass("bg-loader");
                                        $(".loader").addClass("hide-loader");
                                        if(e.name){
                                            $('[data-type="name"]').val(e.name);
                                            $('[data-type="name"]').parent().parent().addClass('active')
                                        }
                                        if(e.mobileno){
                                            $('[data-type="mobile"]').val(e.mobileno);
                                            $('[data-type="mobile"]').parent().parent().addClass('active')
                                        }
                                        if(e.email){
                                            $('[data-type="email"]').val(e.email);
                                            $('[data-type="email"]').parent().parent().addClass('active')  
                                        }
                                        if(e['account-no-']){
                                            accno = e['account-no-'];
                                        }
                                    }
                                })
                            }else{
                                $("body").removeClass("bg-loader");
                                $(".loader").addClass("hide-loader");
                                $('.loan-against-sucess-msg').removeClass('d-none');
                                $('.loan-against-form-wrap').addClass('d-none')
                            }
                        })
                    } else {
                        $("body").removeClass("bg-loader");
                        $(".loader").addClass("hide-loader");
                        setTimeout(function () {
                            $("#failure-modal").addClass("popover-show");
                          }, 80);
                
                          $("#failure-modal").css("display", "block");
                          $("body").addClass("popover-modal-open");
                          $("body").append('<div class="modal-backdrop"></div>');
                    }

                }).catch(function (error) {
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

            $('#subscribe-modal .jsSubscribeClose').click(function(e){
                if(urlParams.uniqueId){
                    var reqObj = {};
                    $("body").addClass("bg-loader");
                    $(".loader").removeClass("hide-loader");
                    emiPartPaymentFilterObj.prePopulateEpp(reqObj).then(function (response) {
                        console.log(response)
                        if (response.status.toLowerCase() == "success") {
                            var responseData = JSON.parse(response.response).Master;
                            emiPartPaymentFilterObj.emiPartPaymentCampaignGet(reqObj).then(function (response) {
                                var responseDataEmi = JSON.parse(response.response).Master;
                                responseDataEmi.forEach(function(e,i){
                                    if(e.uniqueid == urlParams.uniqueId){
                                       flag = false; 
                                    }else{
                                        
                                    }
                                })
    
                                if(flag){
                                    responseData.forEach(function(e,i){
                                        if(e.uniqueid == urlParams.uniqueId){
                                            $("body").removeClass("bg-loader");
                                            $(".loader").addClass("hide-loader");
                                            $('.loan-against-sucess-msg').addClass('d-none');
                                            $('.loan-against-form-wrap').removeClass('d-none');
                                            if(e.name){
                                                $('[data-type="name"]').val(e.name);
                                                $('[data-type="name"]').parent().parent().addClass('active')
                                            }
                                            if(e.mobileno){
                                                $('[data-type="mobile"]').val(e.mobileno);
                                                $('[data-type="mobile"]').parent().parent().addClass('active')
                                            }
                                            if(e.email){
                                                $('[data-type="email"]').val(e.email);
                                                $('[data-type="email"]').parent().parent().addClass('active')  
                                            }
                                        }
                                    })
                                }else{
                                    $("body").removeClass("bg-loader");
                                    $(".loader").addClass("hide-loader");
                                    $('.loan-against-sucess-msg').removeClass('d-none');
                                    $('.loan-against-form-wrap').addClass('d-none')
                                }
                            })
                        } else {
                            $("body").removeClass("bg-loader");
                            $(".loader").addClass("hide-loader");
                            setTimeout(function () {
                                $("#failure-modal").addClass("popover-show");
                              }, 80);
                    
                              $("#failure-modal").css("display", "block");
                              $("body").addClass("popover-modal-open");
                              $("body").append('<div class="modal-backdrop"></div>');
                        }
    
                    }).catch(function (error) {
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
            })

            $(".js-select2").select2({
                placeholder: "Select",
            });
            $(".js-select2-search-hide").select2({
                minimumResultsForSearch: Infinity,
            });

            var feildsCount = $('#loan-mitra .jsValueOK').length;

            //Loan Mitra form key up
            $('.input-textbox[data-type]').keyup(function () {
                var element = $(this);
                var ele_value = element.val();
                var ele_required = 'Field is required';
                var ele_email = "Please enter valid email ID";
                var ele_name = "Please enter full name";
                var ele_phoneNumber = "Please enter valid number";
                var ele_pinCode = "Please enter valid PIN code";

                $(this).next('.error-msgs').remove();
                $(this).after('<span class="error-msgs" style="top: 43px"></span>');
                $(this).parents('.form-group').addClass('error');

                if ($(element).val() != '') {
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    if ($(element).data('type') === 'name') {
                        var regName = /[A-Za-z]+[ ][A-Za-z]+$/;
                        if (ele_value != '' && !regName.test(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_name);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'email') {
                        var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

                        if (ele_value != '' && !ele_value.match(regEmail)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_email);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'mobile') {
                        if (!validateMobile(element)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_phoneNumber);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'pincode') {
                        if (ele_value != '' && ele_value.length != 6) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_pinCode);
                            $(element).addClass('jsValueOK');
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'location') {
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).removeClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            $(element).addClass('jsValueOK');
                        }
                    }

                } else {
                    if ($(element).data('type') === 'location') {
                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                        $(element).addClass('jsValueOK');
                    }
                    if ($(element).data('type') === 'pincode') {
                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                        $(element).addClass('jsValueOK');
                    }
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    $(element).next('.error-msgs').text(ele_required);
                }
                feildsCount = $('#loan-mitra .jsValueOK').length
                // console.log(feildsCount);
                if ($('#loan-mitra .jsValueOK').length == 0) {
                    // console.log('All good you can submit now')
                }
            });

            //Loan Mitra form submit
            $('.jsEmiFormSubmit').click(function (e) {
                var ele_input = $('.form-textbox-new [data-type]:visible');
                var selectElements = $('.select2-hidden-accessible[data-type]:visible');
                var errors = [];
                allFilled = true;
                var ele_required = "Field is required";

                $(ele_input).each(function () {
                    var element = $(this);
                    var ele_value = element.val();
                    var ele_email = "Please enter valid email ID";
                    var ele_name = "Please enter full name";
                    var ele_phoneNumber = "Please enter valid number";

                    $(element).parents('.form-textbox-new').find('.error-msgs').remove();
                    $(element).parents('.form-textbox-new').addClass('textboxerror');

                    if (element.is(":visible")) {
                        if (element.val() != '') {
                            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                            $(element).after('<span class="error-msgs" style="top: 43px"></span>');

                            if ($(element).data('type') === 'name') {
                                var regName = /[A-Za-z]+[ ][A-Za-z]+$/;
                                // console.log(regName.test(ele_value))
                                if (ele_value != '' && !regName.test(ele_value)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_name);
                                    errors.push(ele_name);
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                }
                            }
                            if ($(element).data('type') === 'email') {
                                var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

                                if (ele_value != '' && !ele_value.match(regEmail)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_email);
                                    errors.push(ele_email)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'mobile') {
                                if (!validateMobile(element)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_phoneNumber);
                                    errors.push(ele_phoneNumber)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                }
                            }
                        } else {
                            $(element).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
                            errors.push(ele_required);
                            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                        }
                    }
                });

                $(selectElements).each(function () {
                    var select = $(this);
                    $(select).parents('.form-textbox-new').find('.error-msgs').remove();

                    if ($(select).val() == '') {
                        allFilled = false;
                        $(select).parents('.form-textbox-new').addClass('textboxerror');
                        $(select).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                        $(select).next('.error-msgs').remove();
                        $(select).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
                        errors.push(ele_required);
                    } else {
                        $(select).parents('.form-textbox-new').removeClass('textboxerror');
                        $(select).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                        $(select).next('.error-msgs').remove();
                    }
                });

                if (errors.length == 0) {
                    
                    $("body").addClass("bg-loader");
                    $(".loader").removeClass("hide-loader");
                    var reqObj = {
                        "Master": [{
                            "uniqueid":urlParams.uniqueId,
                            "name": $('[data-type=name]').val(),
                            "mobileno":$('[data-type=mobile]').val(),
                            "email":$('[data-type=email]').val(),
                            "selectedvalue": document.querySelector('input[name="payment"]:checked').value,
                            "accountno": accno
                        }
                        ]
                    }
                    clearCompleteForm();
                    emiPartPaymentFilterObj.prePopulateEpp(reqObj).then(function (response) {
                        console.log(response)
                        if (response.status.toLowerCase() == "success") {
                            var responseData = JSON.parse(response.response).Master;
                            emiPartPaymentFilterObj.emiPartPaymentCampaignGet(reqObj).then(function (response) {
                                var responseDataEmi = JSON.parse(response.response).Master;
                                responseDataEmi.forEach(function(e,i){
                                    if(e.uniqueid == urlParams.uniqueId){
                                       flag = false; 
                                    }else{
                                        
                                    }
                                })
    
                                if(flag){
                                    emiPartPaymentFilterObj.emiPartPayment(reqObj).then(function (response) {
                                        console.log(response)
                                        if (response.status.toLowerCase() == "success") {
                                            if(response.response.responseJson.status){
                                                $("body").removeClass("bg-loader");
                                                $(".loader").addClass("hide-loader");
                                                $('.modal-backdrop').remove();
                                                $('#subscribe-modal .modal-body-inner .heading36 p').html("Thank you for sharing your response.");
                                                $('#subscribe-modal .modal-body-inner .text16i p').html("Our executives will get in touch with you within the next 24 hours to process your request.");
                                                setTimeout(function () {
                                                    $('#subscribe-modal').addClass('popover-show');
                                                }, 80);
                                                $('#subscribe-modal').css('display', 'block');
                                                $('body').addClass('popover-modal-open');
                                                $('body').append('<div class="modal-backdrop"></div>');
                                            }
                                            else{
                                                $("body").removeClass("bg-loader");
                                                $(".loader").addClass("hide-loader");
                                                $("body").removeClass("bg-loader");
                                                $(".loader").addClass("hide-loader");
                                                setTimeout(function () {
                                                    $("#failure-modal").addClass("popover-show");
                                                  }, 80);
                                        
                                                  $("#failure-modal").css("display", "block");
                                                  $("body").addClass("popover-modal-open");
                                                  $("body").append('<div class="modal-backdrop"></div>');
                                            }
                                        } else {
                                            $("body").removeClass("bg-loader");
                                            $(".loader").addClass("hide-loader");
                                            setTimeout(function () {
                                                $("#failure-modal").addClass("popover-show");
                                              }, 80);
                                    
                                              $("#failure-modal").css("display", "block");
                                              $("body").addClass("popover-modal-open");
                                              $("body").append('<div class="modal-backdrop"></div>');
                                        }
                
                                    }).catch(function (error) {
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
                                    $("body").removeClass("bg-loader");
                                    $(".loader").addClass("hide-loader");
                                    $('.loan-against-sucess-msg').removeClass('d-none');
                                    $('.loan-against-form-wrap').addClass('d-none')
                                }
                            })
                        } else {
                            $("body").removeClass("bg-loader");
                            $(".loader").addClass("hide-loader");
                            setTimeout(function () {
                                $("#failure-modal").addClass("popover-show");
                              }, 80);
                    
                              $("#failure-modal").css("display", "block");
                              $("body").addClass("popover-modal-open");
                              $("body").append('<div class="modal-backdrop"></div>');
                        }
    
                    }).catch(function (error) {
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

            });


            //Select 2 on change remove error state
            $('.js-select2').change(function () {
                $(this).parents('.form-textbox-new').removeClass('textboxerror');
                $(this).next('.error-msgs').remove();
                $(this).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                $(this).removeClass('jsValueOK')
            })


        })

        function clearCompleteForm() {
            $('#loan-mitra .input-textbox[data-type]').addClass('jsValueOK')
            $('#loan-mitra .input-textbox[data-type]').val('');
            $('#loan-mitra .form-textbox-new').removeClass('active onchange');
            $('#loan-mitra .form-textbox-new .text-infos').removeClass('hide-input-note');
            $('#loan-mitra .form-textbox-new .icon-rupee').addClass('d-none');
            $('.js-select2').each(function () {
                $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
                $('.js-select2').parents('.form-textbox-new').addClass('active');
                $('.js-select2').next('.error-msgs').remove();
                $('.js-select2').val(null).trigger('change');
                $('.js-select2').addClass('jsValueOK');
            });

            $('#loan-mitra .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
            $('#loan-mitra .input-textbox[data-type]').next().text('');
        }

        function getURLParams(url) {
            var queryParams = {};
            try {
                url = url ? url : window.location.search;
                url.split("?")[1].split("&").forEach(function (pair) {
                    var key = pair.split("=")[0];
                    var val = pair.split("=")[1];
                    queryParams[key] = val;
                });
            }
            catch (err) { return "" }
            return queryParams;
        }
        

        return jsHelper.freezeObj(emiPartPaymentBizObj);
    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(
        _global,
        "emiPartPaymentBizObj",
        emiPartPaymentBizCallFn
    );
})(this || window || {});