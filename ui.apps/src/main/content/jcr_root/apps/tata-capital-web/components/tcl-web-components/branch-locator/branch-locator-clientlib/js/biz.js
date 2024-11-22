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
                    $('.select2-selection__rendered').html("Select")
                    $('[data-type="city"]').empty();
                    $('[data-type="product"]').empty();
                    $('.branchPopulate').html('');
                   })
                branchLocatorFilterObj.branchLocator(reqObj).then(function (response) {
                    if (response.status.toLowerCase() == "success") {
                        $("body").removeClass("bg-loader");
                        $(".loader").addClass("hide-loader");
                        console.log(response);
                        var branchStateArr = [];
                        branchDataJson = JSON.parse(response.response);
                        $('[data-type="state"]').html('<option value=""></option>');
                        branchDataJson['Master'].forEach(function (e, i) {
                            if (!branchStateArr.includes(e['state-name'])) {
                                branchStateArr.push(e['state-name'])
                            }
                        })
                        branchStateArr.forEach(function (e, i) {
                            $('[data-type="state"]').append('<option value="' + e + '">' + e + '</option>');
                        })
                    }
                    queryStateCityProductPopulate()
                }).catch(function (error) {
    
                });
            }

            $('[data-type="state"]').on('change', function (e) {
                var state = $(this).val();
                var branchCityArr = [];
                $('.branchPopulate').html('');
                $('[data-type="city"]').html('<option value=""></option>');
                $('[data-type="product"]').html('<option value=""></option>');
                if($('.cmp-tabs__tab--active').text().trim() == "Service Branches"){
                    branchDataJson['Master'].forEach(function (ele, i) {
                        if (ele['state-name'] == state && (ele['tcfsl-retail']== "Y" || ele['tchfl-retail']== "Y")) {
                            if (!branchCityArr.includes(ele['city-name'])) {
                                branchCityArr.push(ele['city-name'])
                            }
                        }
                    })
                }else{
                    branchDataJson['Master'].forEach(function (ele, i) {
                        if (ele['state-name'] == state) {
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

            $('[data-type="city"]').on('change', function (e) {
                city = $(this).val();
                var branchProductArr = [];
                $('.branchPopulate').html('');
                $('[data-type="product"]').html('<option value=""></option>');
                if($('.cmp-tabs__tab--active').text().trim() == "Service Branches"){
                    branchDataJson['Master'].forEach(function (ele, i) {
                        if (ele['city-name'] == city && (ele['tcfsl-retail']== "Y" || ele['tchfl-retail']== "Y")) {
                            /*if (!branchProductArr.includes(ele['city-name'])) {
                                branchProductArr.push(ele['city-name'])
                            }*/
                            for(let a=1;a<=50;a++){
                                if(ele["service-name-"+a] && !branchProductArr.includes(ele["service-name-"+a])){
                                    branchProductArr.push(ele["service-name-"+a]);
                                    if(ele["service-name-"+a] == "Micro Finance Loan"){
                                        branchProductArr.push("Rural Individual Loan");
                                    }
                                }
                            }
                        }
                    })
                }else{
                    branchDataJson['Master'].forEach(function (ele, i) {
                        if (ele['city-name'] == city) {
                            /*if (!branchProductArr.includes(ele['city-name'])) {
                                branchProductArr.push(ele['city-name'])
                            }*/
                            for(let a=1;a<=50;a++){
                                if(ele["service-name-"+a] && !branchProductArr.includes(ele["service-name-"+a])){
                                    branchProductArr.push(ele["service-name-"+a]);
                                    if(ele["service-name-"+a] == "Micro Finance Loan"){
                                        branchProductArr.push("Rural Individual Loan");
                                    }
                                }
                            }
                        }
                    })
                }
                branchProductArr.forEach(function (e, i) {
                    $('[data-type="product"]').append('<option value="' + e + '">' + e + '</option>');
                })
            })

            $('[data-type="product"]').on('change', function (e) {
                var product = $(this).val();
                var branchNameArr = [];
                var branchAddressArr = [];
                var branchObj = {};
                var branchDiv = "";
                if($('.cmp-tabs__tab--active').text().trim() == "Service Branches"){
                    branchDataJson['Master'].forEach(function (ele, i) {
                        if (ele['city-name'] == city && (ele['tcfsl-retail']== "Y" || ele['tchfl-retail']== "Y")) {
                            for(let a=1;a<=50;a++){
                                if(ele["service-name-"+a] == product || product == "Rural Individual Loan"){
                                    if(!ele["address"] == branchAddressArr.includes(ele["address"])){
                                        branchNameArr.push(ele["branch-name"]);
                                        branchAddressArr.push(ele["address"]);
                                        let additionalNumber = ele['extra-number'].toLowerCase() == "yes" ? '<p class="text14i cutom-branch-pandding semibold text-red">Customer with prepaid no.can <br> also reach us on <a href="tel:02268456500"> 022-68456500</a></p>' : '';
                                        if(product=="Micro Finance Loan" || product=="Rural Individual Loan"){
                                            branchDiv += '<div class="col-sp15 row-col-33"><div class="branch-details-item "><div class="bg-div"><div class="branch-details-top"><h3 class="heading20"><span>'+ele["branch-name"]+'</span></h3><div class="branch-address"><span class="icon-address-proof address-icon icon-center"></span><p class="text14i">'+ele["address"]+'</p></div><div class="branch-address mg-t10"><p class="text14i cutom-branch-pandding semibold">Customer Care: <a href="tel:18002099809">1800 209 9809</a></p>'+additionalNumber+'</div></div><div class="branch-details-bottom"><a href="javascript:void(0)" class="btn-links link-with-arrow btn-links-white jsGetDetailsViaSMS">Get details via SMS <span class="icon-arrow-right arros"></span></a></div></div></div></div>';
                                        }else{
                                            branchDiv += '<div class="col-sp15 row-col-33"><div class="branch-details-item "><div class="bg-div"><div class="branch-details-top"><h3 class="heading20"><span>'+ele["branch-name"]+'</span></h3><div class="branch-address"><span class="icon-address-proof address-icon icon-center"></span><p class="text14i">'+ele["address"]+'</p></div><div class="branch-address mg-t10"><p class="text14i cutom-branch-pandding semibold">Customer Care: <a href="tel:18602676060">1860 267 6060</a></p>'+additionalNumber+'</div></div><div class="branch-details-bottom"><a href="javascript:void(0)" class="btn-links link-with-arrow btn-links-white jsGetDetailsViaSMS">Get details via SMS <span class="icon-arrow-right arros"></span></a></div></div></div></div>';
                                        }
                                    }
                                }
                            }
                        }
                    })
                }else{
                    branchDataJson['Master'].forEach(function (ele, i) {
                        if (ele['city-name'] == city) {
                            for(let a=1;a<=50;a++){
                                if(ele["service-name-"+a] == product || product == "Rural Individual Loan"){
                                    if(!ele["address"] == branchAddressArr.includes(ele["address"])){
                                        branchNameArr.push(ele["branch-name"]);
                                        branchAddressArr.push(ele["address"]);
                                        let additionalNumber = ele['extra-number'].toLowerCase() == "yes" ? '<p class="text14i cutom-branch-pandding semibold text-red">Customer with prepaid no.can <br> also reach us on <a href="tel:02268456500"> 022-68456500</a></p>' : '';
                                        if(product=="Micro Finance Loan" || product=="Rural Individual Loan"){
                                            branchDiv += '<div class="col-sp15 row-col-33"><div class="branch-details-item "><div class="bg-div"><div class="branch-details-top"><h3 class="heading20"><span>'+ele["branch-name"]+'</span></h3><div class="branch-address"><span class="icon-address-proof address-icon icon-center"></span><p class="text14i">'+ele["address"]+'</p></div><div class="branch-address mg-t10"><p class="text14i cutom-branch-pandding semibold">Customer Care: <a href="tel:18002099809">1800 209 9809</a></p>'+additionalNumber+'</div></div><div class="branch-details-bottom"><a href="javascript:void(0)" class="btn-links link-with-arrow btn-links-white jsGetDetailsViaSMS">Get details via SMS <span class="icon-arrow-right arros"></span></a></div></div></div></div>';
                                        }else{
                                            branchDiv += '<div class="col-sp15 row-col-33"><div class="branch-details-item "><div class="bg-div"><div class="branch-details-top"><h3 class="heading20"><span>'+ele["branch-name"]+'</span></h3><div class="branch-address"><span class="icon-address-proof address-icon icon-center"></span><p class="text14i">'+ele["address"]+'</p></div><div class="branch-address mg-t10"><p class="text14i cutom-branch-pandding semibold">Customer Care: <a href="tel:18602676060">1860 267 6060</a></p>'+additionalNumber+'</div></div><div class="branch-details-bottom"><a href="javascript:void(0)" class="btn-links link-with-arrow btn-links-white jsGetDetailsViaSMS">Get details via SMS <span class="icon-arrow-right arros"></span></a></div></div></div></div>';
                                        }
                                    }
                                }
                            }
                        }
                    })
                }
                $('.branchPopulate').html(branchDiv);
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
                    console.log(branchLocatorSmsAdd = e.currentTarget.parentElement.parentElement.childNodes[0].childNodes[1].textContent);
                    customerCareNumberSms = e.currentTarget.parentElement.parentElement.childNodes[0].childNodes[2].children[0].children[0].textContent;
                    $('.jsSMSSendSuccess').addClass('d-none');
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
            var customerCareNumberSms;
           /* $('.jsGetDetailsViaSMS').click(function (e) {
                console.log(branchLocatorSmsAdd = e.currentTarget.parentElement.parentElement.childNodes[0].childNodes[1].textContent);
                $('.jsSMSSendSuccess').addClass('d-none');
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
            })*/
            //Loan aganist form key up
            $('#branchSMSDetails .input-textbox[data-type]').keyup(function () {
                // console.log('sdf')
                var element = $(this);
                var ele_value = element.val();
                var ele_required = 'Field is required';
                var ele_phoneNumber = "Please enter valid number";

                $(this).next('.error-msgs').remove();
                $(this).after('<span class="error-msgs" style="top: 43px"></span>');
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
                    // var ele_value = element.val();
                    var ele_phoneNumber = "Please enter valid number";

                    $(element).parents('.form-textbox-new').find('.error-msgs').remove();
                    $(element).parents('.form-textbox-new').addClass('textboxerror');

                    if (element.is(":visible")) {
                        if (element.val() != '') {
                            $(element).after('<span class="error-msgs" style="top: 43px"></span>');

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
                            $(element).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
                            errors.push(ele_required);
                        }
                    }
                });
                console.log(errors)
                if (errors.length == 0) {
                    $("body").addClass("bg-loader");
                   $(".loader").removeClass("hide-loader");
                    var reqObj = { "header": { "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==" }, "body": { "mobileNumber": branchLocatorSmsNo, "templateName": "branch-locator", "templateJson": { "address": branchLocatorSmsAdd, "location": "", "pincode": "",customerCareNumber:customerCareNumberSms} } };
                    branchLocatorFilterObj.branchLocatorSMS(reqObj).then(function (response) {
                        console.log(response)
                        if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.status.toLowerCase() == "ok") {
                            $("body").removeClass("bg-loader");
                           $(".loader").addClass("hide-loader");
                            $('.jsSmsDetails').addClass('d-none');
                            $('.jsSMSSendSuccess').removeClass('d-none');
                        } else {
                            $("body").removeClass("bg-loader");
                            $(".loader").addClass("hide-loader");
                            $('.jsSMSSendSuccess').addClass('d-none');
                            setTimeout(function () {
                                $("#failure-modal").addClass("popover-show");
                              }, 80);
                    
                              $("#failure-modal").css("display", "block");
                              $("body").addClass("popover-modal-open");
                              $("body").append('<div class="modal-backdrop"></div>');
                        }
                    }).catch(function (error) {
                        $('.jsSMSSendSuccess').addClass('d-none');
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

            /* $('.jsThanksModalClose').click(function () {
                clearSelectFeilds();
                // $('.branch-details-box').addClass('d-none');
                // $('.branch-instant-loan-cntr').addClass('d-none');
                selectedCount = 0;
                console.log(selectedCount, selectFieldsLength)
            }) */


            $('.js-tabClick').click(function () {
                clearSelectFeilds();
                selectFieldsLength = $('#jsBranchSelects .select2-hidden-accessible[data-type]:visible').length;
                selectedCount = 0;
                console.log(selectedCount, selectFieldsLength);
                // $('.branch-details-box').addClass('d-none');
                // $('.branch-instant-loan-cntr').addClass('d-none');
            })
            // console.log($('#jsBranchSelects .select2-hidden-accessible[data-type]:visible').length);
            $('.js-select2').change(function () {
                $(this).parents('.form-textbox-new').removeClass('textboxerror');
                $(this).next('.error-msgs').remove();
                selectedCount = selectedCount + 1;
                if (selectedCount === selectFieldsLength) {

                    // $('.branch-details-box').removeClass('d-none');
                    // $('.branch-instant-loan-cntr').removeClass('d-none');
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

        // var reqObj={"header":{"authToken":"MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="},"body":{}}

        // var reqObj = {};
        // branchLocatorFilterObj.branchLocator(reqObj).then(function (response) {
        //     debugger;
        //     console.log(response)
        // }).catch(function (error) {

        // });

        function queryStateCityProductPopulate() {
            var urlParams = getQueryParams(location.href);
            if (urlParams['state']) {
                var state = urlParams.state.toLowerCase();
                var stateSelect = $('[data-type="state"]');
                var stateOption = $(stateSelect).find('option');
                $.each(stateOption, function (indexInArray, valueOfElement) {
                    var eleText = $(valueOfElement).text().trim().toLocaleLowerCase();
                    if (state === eleText) {
                        stateSelect.val($(valueOfElement).text()).trigger('change');
                    }
                });
            }
            if (urlParams['city']) {
                var city = urlParams.city.toLowerCase();
                var citySelect = $('[data-type="city"]');
                var cityOption = $(citySelect).find('option');
                $.each(cityOption, function (indexInArray, valueOfElement) {
                    var eleText = $(valueOfElement).text().trim().toLocaleLowerCase();
                    if (city === eleText) {
                        citySelect.val($(valueOfElement).text()).trigger('change');
                    }
                });
            }
            if (urlParams['product']) {
                var product = urlParams.product.toLowerCase();
                var productSelect = $('[data-type="product"]');
                var productOption = $(productSelect).find('option');
                $.each(productOption, function (indexInArray, valueOfElement) {
                    var eleText = $(valueOfElement).text().trim();
                    var words = eleText.split(' ');
                    var capitalizedFirstLetters = words.map(word => word.charAt(0).toLowerCase());
                    if (product === capitalizedFirstLetters.join('')) {
                        productSelect.val($(valueOfElement).text()).trigger('change');
                    }
                });
            }
        }

        function getQueryParams() {
            const queryParams = {};
            const queryString = window.location.search.substring(1);
            const pairs = queryString.split('&');
            pairs.forEach(pair => {
                const [key, value] = pair.split('=');
                queryParams[key] = decodeURIComponent(value);
            });
            return queryParams;
        }

        return jsHelper.freezeObj(branchLocatorBizObj);
    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(
        _global,
        "branchLocatorBizObj",
        branchLocatorBizCallFn
    );
})(this || window || {});