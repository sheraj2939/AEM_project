(function (_global) {
    var customerGrievancesBizCallFn = (function (jsHelper) {
        var customerGrievancesBizObj = {}

        $(document).ready(function () {    
    
            /*level 2*/ 
            $('.js-raise-complain-level2 .jsSubmitBtn').click(function(e){        
                var ele_input = $('.js-raise-complain-level2').find('.form-textbox-new [data-type]:visible');
                var errors = [];
                allFilled = true;
                
                $(ele_input).each(function () {
                    var element = $(this);
                    var ele_value = element.val();
                    var ele_required = "Field is required";          
            
                    $(element).parents('.form-textbox-new').find('.error-msgs').remove();
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
            
                    if (element.is(":visible")) {
                        if (element.val() != '') {
                            $(element).after('<span class="error-msgs"></span>');
            
                            
                            if ($(element).data('type') === 'complaintnumber') {                  
                                if (ele_value != '') {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next('.error-msgs').text('');
                                }
                                else {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_required);
                                    errors.push(ele_required);
                                }
                            }
        
                            if ($(element).data('type') === 'message') {                  
                                if (ele_value != '') {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next('.error-msgs').text('');
                                }
                                else {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_required);
                                    errors.push(ele_required);
                                }
                            }                    
                            
                        } else {
                            $(element).after('<span class="error-msgs">' + ele_required + '</span>');                
                            errors.push(ele_required);
                        }
                    }
                });        
            
                if (errors.length == 0) {
                    $("body").addClass("bg-loader");
                    $(".loader").removeClass("hide-loader");
                    // contact us customer greivances analytics START
                     try{
                        var ctaText = e.currentTarget.innerText.trim();
                        var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('.heading20').innerText.trim();
                        var levelNo = '';
                        getParentElement(e.currentTarget, 7).querySelectorAll('.board-directors-left .jsTabSelect').forEach(function(levels){
                            if(levels.classList.contains('active')){
                            levelNo = 'Level ' + levels.innerText.slice(5,7).trim();
                            }
                        });
                        var componentName = 'contact us ' + window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
                        var complainNo = getParentElement(e.currentTarget, 2).querySelector('[data-type="complaintnumber"]').value;
                        grevienceSubmit(ctaText,ctaTitle,levelNo,componentName,complainNo);
                    } catch(error){
                        console.log('element not found', error);
                    }
                    // contact us customer greivances analytics END

                    var reqObjCustomer = {
                        "header": {
                            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="
                        },
                        "body": {
                            "escalationLevel": "L" + $(".tab-content.active").attr('data-level'),
                            "complaintNumber": $('.tab-content.active [data-type="complaintnumber"]').val(),
                            "complaintDescription": $('.tab-content.active [data-type="message"]').val()
                        }
                    }

                    if ($(".tab-content.active").attr('data-level') == 5) {
                        reqObjCustomer.body.escalationLevel = 4
                    }

                    customerGrievancesFilterObj.customerGrievancesNew(reqObjCustomer).then(function (response) {
                        console.log(response.response.responseJson.status)
                        if (response.response.responseJson.header.status.toLocaleLowerCase() === "success" && response.response.responseJson.body.success.toLocaleLowerCase() == 'true') {
                            var reqObj = {
                                "header": {
                                    "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="
                                },
                                "body": {
                                    "complaintLevel": $(".tab-content.active").attr('data-level'),
                                    "complaintNumber": $('.tab-content.active [data-type="complaintnumber"]').val(),
                                    "complaintText": $('.tab-content.active [data-type="message"]').val()
                                }
                            }
                            if ($(".tab-content.active").attr('data-level') == 5) {
                                reqObj.body.complaintLevel = 4
                            }

                            $("body").removeClass(" bg-loader");
                            $(".loader").addClass("hide-loader");
                            var responseMsg = response.response.responseJson.body.errors;
                            $('.responseMsg').text(responseMsg)
                            $('#levelPopup').text($(".tab-content.active").attr('data-level'));
                            $('.modal-backdrop').remove();
                            setTimeout(function () {
                                $('#thankyou-modal-new').addClass('popover-show');
                            }, 80);
                            $('#thankyou-modal-new').css('display', 'block');
                            $('body').addClass('popover-modal-open');
                            $('body').append('<div class="modal-backdrop"></div>');

                            customerGrievancesFilterObj.customerGrievancesEmail(reqObj).then(function (response) {
                                console.log(response.response.responseJson.status)
                                /*if (response.response.responseJson.status) {
                                    $("body").removeClass(" bg-loader");
                                    $(".loader").addClass("hide-loader");
                                    $('#levelPopup').text($(".tab-content.active").attr('data-level'));
                                    $('.modal-backdrop').remove();
                                    setTimeout(function () {
                                        $('#thankyou-modal').addClass('popover-show');
                                    }, 80);        
                        
                                    $('#thankyou-modal').css('display', 'block');
                                    $('body').addClass('popover-modal-open');
                                    $('body').append('<div class="modal-backdrop"></div>');
                                } else {
                                    $("body").removeClass("bg-loader");
                                    $(".loader").addClass("hide-loader");
                                    setTimeout(function () {
                                        $("#failure-modal").addClass("popover-show");
                                      }, 80);
                            
                                      $("#failure-modal").css("display", "block");
                                      $("body").addClass("popover-modal-open");
                                      $("body").append('<div class="modal-backdrop"></div>');
                                } */
                            }).catch(function (error) {
                                /* $("body").removeClass("bg-loader");
                                 $(".loader").addClass("hide-loader");
                                 setTimeout(function () {
                                     $("#failure-modal").addClass("popover-show");
                                   }, 80);
                         
                                   $("#failure-modal").css("display", "block");
                                   $("body").addClass("popover-modal-open");
                                   $("body").append('<div class="modal-backdrop"></div>'); */
                            });
                        } else if (response.response.responseJson.header.status.toLocaleLowerCase() === "success" && response.response.responseJson.body.success.toLocaleLowerCase() == 'false') {
                            $("body").removeClass(" bg-loader");
                            $(".loader").addClass("hide-loader");
                            var responseMsg = response.response.responseJson.body.errors[0]
                            var qrcDate = response.response.responseJson.body.Case_QRC_Date;
                            if (responseMsg.includes("Error 201 :")) {
                                responseMsg = responseMsg.replace(/Error 201\s*:/, "");
                                $('.responseMsg').text(responseMsg)
                                $('#levelPopup').text($(".tab-content.active").attr('data-level'));
                                $('.modal-backdrop').remove();
                                setTimeout(function () {
                                    $('#thankyou-modal-new').addClass('popover-show');
                                }, 80);
                                $('#thankyou-modal-new').css('display', 'block');
                                $('#invalid').removeClass("d-none");
                                $('#valid').addClass('d-none');
                                $('body').addClass('popover-modal-open');
                                $('body').append('<div class="modal-backdrop"></div>');
                            } else {
                                $('.responseMsg').text(responseMsg)
                                $('#levelPopup').text($(".tab-content.active").attr('data-level'));
                                $('.modal-backdrop').remove();
                                setTimeout(function () {
                                    $('#thankyou-modal-new').addClass('popover-show');
                                }, 80);
                                $('#thankyou-modal-new').css('display', 'block');
                                $('#invalid').addClass("d-none");
                                $('#valid').removeClass('d-none');
                                $('body').addClass('popover-modal-open');
                                $('body').append('<div class="modal-backdrop"></div>');
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
                }
            });
        
            $('.js-raise-complain-level2 [data-type]').keyup(function(){
                var element = $(this);
                var ele_value = element.val();
                var ele_required = "Field is required";
            
                $(this).next('.error-msgs').remove();
                $(this).after('<span class="error-msgs"></span>');
                $(this).parents('.form-textbox-new').addClass('textboxerror');
            
                if($(element).val() != '') {
                    
                    if ($(element).data('type') === 'complaintnumber') {                  
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next('.error-msgs').text('');
                        }
                        else {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                        }
                    }    
                    if ($(element).data('type') === 'message') {                  
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next('.error-msgs').text('');
                        }
                        else {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                        }
                    }              
            
                } else {
                    $(element).next('.error-msgs').text(ele_required);      
                }
            });
            /*level 2*/
        
            $('.jsCloseLevels').click(function(){
                $('.js-raise-complain-level2').find('.form-textbox-new [data-type]').val('');
                $('.js-raise-complain-level2').find('.form-textbox-new').removeClass('active');
            })
        
            $('.leveltabmob .jsTabSelect').click(function(){
                $('.raise-complain-forms').find('.form-textbox-new [data-type]').val('');
                $('.raise-complain-forms').find('.form-textbox-new').removeClass('active');
                $('.raise-complain-forms').find('.form-textbox-new').removeClass('textboxerror');    
            })
        
        })
        

        return jsHelper.freezeObj(customerGrievancesBizObj);
    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(
        _global,
        "customerGrievancesBizObj",
        customerGrievancesBizCallFn
    );
})(this || window || {});