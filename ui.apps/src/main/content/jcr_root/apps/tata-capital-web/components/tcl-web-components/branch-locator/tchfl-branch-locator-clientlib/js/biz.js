(function (_global) {
    var branchLocatorBizCallFn = (function (jsHelper) {
        var branchLocatorBizObj = {}
        var branchDataJson;
        var city;
        $(document).ready(function () {
            if($('[data-type="state"]').length > 0){
                $("body").addClass("bg-loader");
                $(".loader").removeClass("hide-loader");
                var reqObj = {};
                $('[data-branch-tab="branch"]').click(function(e){
                    $('.select2-selection__rendered').html('<span class="select2-selection__placeholder">'+'Select'+'</span>');
                    $('[data-type="city"]').empty();
                    $('.branchPopulate').html('');
                   })
                branchLocatorFilterObj.branchLocator(reqObj).then(function (response) {
                    if (response.status.toLowerCase() == "success") {
                        $("body").removeClass("bg-loader");
                        $(".loader").addClass("hide-loader");
                        var branchStateArr = [];
                        var serviceBranchStateArr = [];
                        branchDataJson = JSON.parse(response.response);
                        $('[data-type="state"]').html('<option value=""></option>');
                        branchDataJson['Master'].forEach(function (e, i) {
                            if(e['tchfl']== "Y"){
                                if (!branchStateArr.includes(e['state-name'])) {
                                    branchStateArr.push(e['state-name'])
                                }
                            }
                        })
                        branchDataJson['Master'].forEach(function (e, i) {
                            if(e['tchfl-retail']== "Y"){
                                if (!serviceBranchStateArr.includes(e['state-name'])) {
                                    serviceBranchStateArr.push(e['state-name'])
                                }
                            }
                        })
                        $('.branch-locator .cmp-tabs__tabpanel').filter(function (index,element) {
                            if(element.classList.contains('cmp-tabs__tabpanel--active')){
                                serviceBranchStateArr.forEach(function (e, i) {
                                    $(element).find('[data-type="state"]').append('<option value="' + e + '">' + e + '</option>');
                                });
                            }
                            else{
                                console.log($(element).find('[data-type="state"]'));
                                branchStateArr.forEach(function (e, i) {
                                    $(element).find('[data-type="state"]').append('<option value="' + e + '">' + e + '</option>');
                                });
                            }
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }

            $('[data-type="state"]').on('select2:select', function () {
                var state = $(this).val();
                var branchCityArr = [];
                $('.branchPopulate').html('');
                $('[data-type="city"]').html('<option value=""></option>');
                if($('.cmp-tabs__tab--active').text().trim() == "Service Branches"){
                    branchDataJson['Master'].forEach(function (ele, i) {
                        if (ele['state-name'] == state &&  ele['tchfl-retail']== "Y") {
                            if (!branchCityArr.includes(ele['city-name'])) {
                                branchCityArr.push(ele['city-name'])
                            }
                        }
                    })
                }else{
                    branchDataJson['Master'].forEach(function (ele, i) {
                        if (ele['state-name'] == state && ele['tchfl']== "Y") {
                            if (!branchCityArr.includes(ele['city-name'])) {
                                branchCityArr.push(ele['city-name'])
                            }
                        }
                    })
                }
                branchCityArr.forEach(function (e, i) {
                    $('[data-type="city"]').append('<option value="' + e + '">' + e + '</option>');
                })
            })

            $('[data-type="city"]').on('select2:select', function () {
                city = $(this).val();
                var product = $(this).val();
                var branchNameArr = [];
                var branchAddressArr = [];
                var branchObj = {};
                var branchDiv = "";
                if($('.cmp-tabs__tab--active').text().trim() == "Service Branches"){
                    branchDataJson['Master'].forEach(function (ele, i) {
                        if (ele['city-name'] == city && ele['tchfl-retail']== "Y") {
                            for(let a=1;a<=50;a++){
                                if(!ele["address"] == branchAddressArr.includes(ele["address"])){
                                    branchNameArr.push(ele["branch-name"]);
                                    branchAddressArr.push(ele["address"]);
                                    if(product=="Micro Finance Loan"){
                                        branchDiv += '<div class="col-sp15 row-col-33"><div class="branch-details-item "><div class="bg-div"><div class="branch-details-top"><h3 class="heading20"><span>'+ele["branch-name"]+'</span></h3><div class="branch-address"><span class="icon-address-proof address-icon icon-center"></span><p class="text14i">'+ele["address"]+'</p></div><div class="branch-address mg-t10"><p class="text14i cutom-branch-pandding semibold">Customer Care: <a href="tel:18002099809">1800 209 9809</a></p></div></div><div class="branch-details-bottom"><a href="javascript:void(0)" class="btn-links link-with-arrow btn-links-white jsGetDetailsViaSMS">Get details via SMS <span class="icon-arrow-right arros"></span></a></div></div></div></div>';
                                    }else{
                                        branchDiv += '<div class="col-sp15 row-col-33"><div class="branch-details-item "><div class="bg-div"><div class="branch-details-top"><h3 class="heading20"><span>'+ele["branch-name"]+'</span></h3><div class="branch-address"><span class="icon-address-proof address-icon icon-center"></span><p class="text14i">'+ele["address"]+'</p></div><div class="branch-address mg-t10"><p class="text14i cutom-branch-pandding semibold">Customer Care: <a href="tel:18602676060">1860 267 6060</a></p></div></div><div class="branch-details-bottom"><a href="javascript:void(0)" class="btn-links link-with-arrow btn-links-white jsGetDetailsViaSMS">Get details via SMS <span class="icon-arrow-right arros"></span></a></div></div></div></div>';
                                    }
                                }
                            }
                        }
                    })
                }else{
                    branchDataJson['Master'].forEach(function (ele, i) {
                        if (ele['city-name'] == city && ele['tchfl']== "Y") {
                            for(let a=1;a<=50;a++){
                                if(!ele["address"] == branchAddressArr.includes(ele["address"])){
                                    branchNameArr.push(ele["branch-name"]);
                                    branchAddressArr.push(ele["address"]);
                                    if(product=="Micro Finance Loan"){
                                        branchDiv += '<div class="col-sp15 row-col-33"><div class="branch-details-item "><div class="bg-div"><div class="branch-details-top"><h3 class="heading20"><span>'+ele["branch-name"]+'</span></h3><div class="branch-address"><span class="icon-address-proof address-icon icon-center"></span><p class="text14i">'+ele["address"]+'</p></div><div class="branch-address mg-t10"><p class="text14i cutom-branch-pandding semibold">Customer Care: <a href="tel:18002099809">1800 209 9809</a></p></div></div><div class="branch-details-bottom"><a href="javascript:void(0)" class="btn-links link-with-arrow btn-links-white jsGetDetailsViaSMS">Get details via SMS <span class="icon-arrow-right arros"></span></a></div></div></div></div>';
                                    }else{
                                        branchDiv += '<div class="col-sp15 row-col-33"><div class="branch-details-item "><div class="bg-div"><div class="branch-details-top"><h3 class="heading20"><span>'+ele["branch-name"]+'</span></h3><div class="branch-address"><span class="icon-address-proof address-icon icon-center"></span><p class="text14i">'+ele["address"]+'</p></div><div class="branch-address mg-t10"><p class="text14i cutom-branch-pandding semibold">Customer Care: <a href="tel:18602676060">1860 267 6060</a></p></div></div><div class="branch-details-bottom"><a href="javascript:void(0)" class="btn-links link-with-arrow btn-links-white jsGetDetailsViaSMS">Get details via SMS <span class="icon-arrow-right arros"></span></a></div></div></div></div>';
                                    }
                                }
                            }
                        }
                    })
                }
                $('.branchPopulate').html(branchDiv);
                // branch details card number analytics START
                var branchDetailsBtn = document.querySelectorAll('.branch-details-item .branch-address a');
                branchDetailsBtn.forEach(function (element) {
                    element.addEventListener('click', function (e) {
                        try {
                            var ctaText = e.currentTarget.innerText.trim();
                            var componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
                            var ctaTitle = getParentElement(e.currentTarget, 11).querySelector('.cmp-tabs__tablist .cmp-tabs__tab--active').innerText.replace(/\s+|:/g, ' ').trim();
                            ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)
                        } catch (error) {
                            console.log("element not found", error);
                        }
                    })

                })
                // branch details card number analytics END
                
                // branch details box analytics START
                var branchDetailsGetSmsBtns = document.querySelectorAll('.branch-details-box .branch-details-bottom a');
                branchDetailsGetSmsBtns.forEach(function(branchDetailsGetSmsBtn){
                    branchDetailsGetSmsBtn.addEventListener('click', function(e){
                        var ctaText = e.currentTarget.innerText.trim();
                        var componentName = getParentElement(e.currentTarget, 6).classList[0].split('-').join(' ');
                        var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('h3').innerText.trim();
                        branchctaInteraction(ctaText,componentName,ctaTitle);
                    });
                });
                // branch details box analytics END
                $('.jsGetDetailsViaSMS').click(function (e) {
                    branchLocatorSmsAdd = e.currentTarget.parentElement.parentElement.childNodes[0].childNodes[1].textContent;
                    customerCareNumberSms = e.currentTarget.parentElement.parentElement.childNodes[0].childNodes[2].children[0].children[0].textContent;
                    console.log(customerCareNumberSms);
                    $('.jsSMSSendSuccess').addClass('d-none');
                    $('.jsSMSSendFail').addClass('d-none');
                    $('.jsSmsDetails').removeClass('d-none');
                    $('.modal-backdrop').remove();
                    setTimeout(function () {
                        $('#thankyou-modal').addClass('popover-show');
                    }, 80);
                    $('#thankyou-modal').css('display', 'block');
                    $('body').addClass('popover-modal-open');
                    $('body').append('<div class="modal-backdrop"></div>');
                    $('.jsSmsDetails .input-textbox[data-type="mobile-number"]').val('');
                    $('.jsSmsDetails .form-textbox-new').removeClass('active textboxerror');
                })
            })

            var selectFieldsLength = $('#jsBranchSelects .select2-hidden-accessible[data-type]:visible').length;
            var selectedCount = 0;
            var branchLocatorSmsNo;
            var branchLocatorSmsAdd;
            var customerCareNumberSms
            //Loan aganist form key up
            $('#branchSMSDetails .input-textbox[data-type]').keyup(function () {
                var element = $(this);
                var ele_value = element.val();
                var ele_required = 'Field is required';
                var ele_phoneNumber = "Please enter valid number";

                $(this).next('.error-msgs').remove();
                $(this).after('<span class="error-msgs" style="top: 40px"></span>');
                $(this).parents('.form-group').addClass('error');

                if ($(element).val() != '') {
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    if ($(element).data('type') === 'mobile-number') {
                        if (!validateMobile(element)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_phoneNumber);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                        }
                    }
                } else {
                    $(element).next('.error-msgs').text(ele_required);
                }
            });
            //SMS submit
            $('.jsSendDeatilsBtn').click(function () {
                branchLocatorSmsNo = $('.jsSmsDetails .input-textbox[data-type="mobile-number"]').val();
                var ele_input = $('#branchSMSDetails').find('.form-textbox-new [data-type]:visible');
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
                            $(element).after('<span class="error-msgs" style="top: 40px"></span>');

                            if ($(element).data('type') === 'mobile-number') {
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
                            $(element).after('<span class="error-msgs" style="top: 40px">' + ele_required + '</span>');
                            errors.push(ele_required);
                        }
                    }
                });
                console.log(errors)
                if (errors.length == 0) {
                    $("body").addClass("bg-loader");
                   $(".loader").removeClass("hide-loader");
                    var reqObj = { "header": { "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==" }, "body": { "mobileNumber": branchLocatorSmsNo, "templateName": "branch-locator", "templateJson": { "address": branchLocatorSmsAdd, "location": "", "pincode": "" ,customerCareNumber:customerCareNumberSms} } };
                    branchLocatorFilterObj.branchLocatorSMS(reqObj).then(function (response) {
                        if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.status.toLowerCase() == "ok") {
                            $("body").removeClass("bg-loader");
                           $(".loader").addClass("hide-loader");
                            $('.jsSmsDetails').addClass('d-none');
                            $('.jsSMSSendSuccess').removeClass('d-none');
                        } else {
                            $("body").removeClass("bg-loader");
                            $(".loader").addClass("hide-loader");
                            $('.jsSMSSendSuccess').addClass('d-none');
                            $('.jsSmsDetails').addClass('d-none');
                            // setTimeout(function () {
                            //     $("#failure-modal").addClass("popover-show");
                            //   }, 80);
                              $(".jsSMSSendFail").removeClass('d-none');
                              $("body").addClass("popover-modal-open");
                              $("body").append('<div class="modal-backdrop"></div>');
                        }
                    }).catch(function (error) {
                        $('.jsSMSSendSuccess').addClass('d-none');
                        $("body").removeClass("bg-loader");
                        $(".loader").addClass("hide-loader");
                        $('.jsSmsDetails').addClass('d-none');
                        // setTimeout(function () {
                        //     $("#failure-modal").addClass("popover-show");
                        //   }, 80);
                        $(".jsSMSSendFail").removeClass('d-none');
                          $("body").addClass("popover-modal-open");
                          $("body").append('<div class="modal-backdrop"></div>');
                    });
                }
            });

            $('.jsFailTryAgain').click(function () {
                $('.jsSMSSendSuccess').addClass('d-none');
                $('.jsSMSSendFail').addClass('d-none');
                $('.jsSmsDetails').removeClass('d-none');
            })
            
            // $('.jsThanksModalClose').click(function () {
            //     clearSelectFeilds();
            //     selectedCount = 0;
            // })


            $('.js-tabClick').click(function () {
                clearSelectFeilds();
                selectFieldsLength = $('#jsBranchSelects .select2-hidden-accessible[data-type]:visible').length;
                selectedCount = 0;
            })

            $('.js-select2').change(function () {
                $(this).parents('.form-textbox-new').removeClass('textboxerror');
                $(this).next('.error-msgs').remove();
                selectedCount = selectedCount + 1;
                if (selectedCount === selectFieldsLength) {
                    selectedCount = 0;
                }
            })
            //Focus open select 2 dropdown
            $(document).on('focus', '.select2.select2-container', function (e) {
                if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
                    $(this).siblings('select').select2('open');
                }
            });
        })

        function clearSelectFeilds() {
            $('.js-select2').each(function () {
                $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
                $('.js-select2').parents('.form-textbox-new').addClass('active');
                $('.js-select2').next('.error-msgs').remove();
                $('.js-select2').val(null).trigger('change');
            });
        }

        return jsHelper.freezeObj(branchLocatorBizObj);
    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(
        _global,
        "branchLocatorBizObj",
        branchLocatorBizCallFn
    );
})(this || window || {});