var inputObj = {}
var getProductValue = location.href.split('?')[1];
var selectArr = [];
var subsource = ''
$(document).ready(function () {
    if ($(".simple-bar").length > 0) {
        $(".simple-bar").each(function (e) {
            new SimpleBar($(".simple-bar")[e]);
        });
    }
    if (location.search.split("?")[1]) {
        location.search.split("?")[1].split("&").forEach(function (el) {
            subsource = el.split("=")[1];
        });
    }
    $('[data-type="you-are"]').change(function () {
        $('#conversation-form .form-textbox-new').removeClass('textboxerror');
        $('#conversation-form .input-textbox[data-type], #conversation-form .input-textbox.text-area').val('');
        $('#conversation-form .form-textbox-new').removeClass('active onchange');

        $(this).next('.error-msgs').remove();
        $('#conversation-form .form-textbox-new').find('.text-infos').removeClass('hide-input-note');
        var selectedval = $(this).val();
        $(this).attr('data-selectvalue', selectedval);
        if (selectedval === 'resident-individual') {
            $('[data-ri="where-you"], [data-ri="ri-mobile"]').removeClass('d-none');
            $('[data-nri="where-you-country"], [data-nri="mobile"]').addClass('d-none');
            $('[data-ri]').removeClass('d-none');
            $('[data-business]').addClass('d-none');
            $('#conversation-form .js-select2:not([data-type="you-are"])').val(null).trigger('change');
            cityMaster('WEALTH ADVISORY');
        }
        if (selectedval === 'NRI') {
            $('[data-ri], [data-nri="mobile"]').removeClass('d-none');
            $('[data-ri="ri-mobile"]').removeClass('d-none')
            $('[data-business]').addClass('d-none');
            $('[data-ri="where-you"]').removeClass('d-none');
            // $('[data-nri="where-you-country"]').removeClass('d-none');
            $('#conversation-form .js-select2:not([data-type="you-are"])').val(null).trigger('change');
            cityMaster('WM-NRI');
        }
        if (selectedval === 'business') {
            $('[data-ri], [data-nri]').addClass('d-none');
            $('[data-business]').removeClass('d-none');
            cityMaster('WEALTH ADVISORY');
        }
    })

    $('.jsMultiDropdown [data-multiselect]').on('click', function () {
        var $id = $(this).attr('data-multiselect');
        $('.jsMultiDropdown').removeClass('show');
        $('.jsMultiDropdown [data-multiselect]').removeClass('active');
        // console.log($id);
        if ($('#' + $id).css('display') == 'none') {
            $(this).parents('.jsMultiDropdown').addClass('show');
            $('#' + $id).addClass('show');
            $(this).addClass('active');

        }
        else {
            $(this).parents('.jsMultiDropdown').removeClass('show');
            $('.jsMultiDropdown').removeClass('show');
            $(this).removeClass('active');
            console.log('dd');
        }
    })

    $(document).on("click", function (event) {
        var $trigger = $(".close-on-outside");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $('[data-multiselect]').removeClass('active')
            $(".jsMultiDropdown").removeClass("show");
        }
    });

    var joinedVal;
    $('.js-filterCheck').change(function (e) {
        var newSelectedArr = $(this).attr('data-event');
        var selectedActualText = $('[data-item="' + newSelectedArr + '"] .checkboxtext').text().replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();;
        // console.log(selectedActualText);
        var found = jQuery.inArray(selectedActualText, selectArr);

        if (found >= 0) {
            selectArr.splice(found, 1);
            $('.jsMultiSelectList .select-item[data-item="' + newSelectedArr + '"]').removeClass('active');
        } else {
            selectArr.push(selectedActualText);
            $('.jsMultiSelectList .select-item[data-item="' + newSelectedArr + '"]').addClass('active');
        }
        joinedVal = selectArr.join(', ');
        console.log(selectArr);
        if (joinedVal === '') {
            $('.js-filterBtn a').text('Select');
            $('.js-filterBtn a').css('color', '#828282');
            $('.jsMulitSelectValue').val('Select')
        } else {
            $('.js-filterBtn a').text(joinedVal);
            $('.js-filterBtn a').css('color', '#333333');
            $('.jsMulitSelectValue').val(joinedVal);
        }
        try {
            var fieldName = getParentElement(e.currentTarget, 17).querySelector('.label-name') ?
                getParentElement(e.currentTarget, 17).querySelector('.label-name').innerText.trim() : '';
            fieldName = fieldName.includes('*') ? fieldName.slice(0, -1) : fieldName;
            var componentName = window.location.href.split('/').reverse().shift().split('.').shift() === 'wealth'
                ? 'wealth conversation lead form' : window.location.href.split('/').reverse().shift().split('.').shift().split('-').join(' ') + ' lead form';
            inputfieldInteraction(fieldName, componentName, getProductCode());
        } catch (err) {
            console.log(err);
        }
    });
    // Clear Loan aganist form
    $('.jsClearConversationDetails').click(function () {
        clearCompleteForm();
        clearMultiSelect();
        $('.jsSuccessOTPVarification').addClass('d-none');
        $('.jsFailOTPVarification').addClass('d-none');
        $('#conversation-otp').addClass('d-none');
        $('#conversation-form').removeClass('d-none');
        $('#request-call-forms').removeClass('d-none');
    })
    function cityMaster(productName) {
        productCodeId = productName;
        productName = "?product=" + productCodeId;
        if ($(".city").length > 0) {
            var reqObj = {}
            if (productCodeId == "insurance-form") {
                applyNowLeadGenerateFilterObj.wealthInsuranceCity(reqObj).then(function (response) {
                    if (response.status == "SUCCESS") {
                        $("body").removeClass("bg-loader");
                        $(".loader").addClass("hide-loader");
                        var objCity = JSON.parse(response.response);
                        console.log(objCity);
                        var mainObj = {};
                        for (var item in objCity.Master) {
                            var subObj = {};
                            if (!mainObj.hasOwnProperty(objCity.Master[item].product)) {
                                var arr = [];
                                mainObj[objCity.Master[item].product] = subObj;
                                subObj['productName'] = objCity.Master[item]['product-name'];
                                arr.push(objCity.Master[item].city);
                                subObj['cities'] = arr;

                            } else {
                                var subObj = mainObj[objCity.Master[item].product];
                                var arr = subObj['cities']
                                arr.push(objCity.Master[item].city);
                            }
                        }
                        response = mainObj;
                        $(".city").html('');
                        $(".city").append("<option value=''></option>");
                        arr.forEach(function (element) {
                            $(".city").append('<option value=' + element + '>' + element + '</option>');
                        });
                    } else {
                    }
                }).catch(function (error) {
                    console.error(error);
                })
            } else {
                applyNowLeadGenerateFilterObj.cityMasterWealth(reqObj, productName).then(function (response) {
                    if (response.status == "SUCCESS") {
                        $("body").removeClass("bg-loader");
                        $(".loader").addClass("hide-loader");
                        var objCity = response.response;
                        // console.log(objCity);
                        var mainObj = {};
                        for (var item in objCity.Master) {
                            var subObj = {};
                            if (!mainObj.hasOwnProperty(objCity.Master[item].product)) {
                                var arr = [];
                                mainObj[objCity.Master[item].product] = subObj;
                                subObj['productName'] = objCity.Master[item]['product-name'];
                                arr.push(objCity.Master[item].city);
                                subObj['cities'] = arr;

                            } else {
                                var subObj = mainObj[objCity.Master[item].product];
                                var arr = subObj['cities']
                                arr.push(objCity.Master[item].city);
                            }
                        }
                        response = mainObj;
                        var productCode = productCodeId;
                        $(".city").html('');
                        $(".city").append("<option value=''></option>");
                        if (productCode == "residential" || productCode == "business" || productCode == "home") {
                            productCode = "WEALTH ADVISORY"
                        }
                        if (productCode == "nri") {
                            productCode = "WM-NRI"
                        }
                        if (response[productCode] !== undefined && response[productCode].cities.length > 0) {
                            response[productCode].cities.forEach(function (element) {
                                $(".city").append('<option value=' + element + '>' + element + '</option>');
                            });
                        } else {
                            console.log("CSV City issue");
                        }
                    } else {
                    }
                }).catch(function (error) {
                    console.error(error);
                });
            }
        }
    }
    cityMaster(productCodeId);
    //Loan aganist form key up    
    $('#conversation-form .input-textbox[data-type]').keyup(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_required = 'Field is required';
        var ele_email = "Please enter valid email ID";
        var ele_email2 = "Please enter valid email ID";
        var ele_email3 = "Please enter valid email ID";
        var ele_name = "Please enter full name";
        var ele_businame = "Please enter correct name";
        var ele_phoneNumber = "Please enter valid number";
        var ele_pannumber = "Please enter valid PAN number";
        var ele_phoneNumber2 = "Please enter valid number";

        $(this).next('.error-msgs').remove();
        $(this).after('<span class="error-msgs" style="top: 43px"></span>');
        $(this).parents('.form-group').addClass('error');


        if ($(element).val() != '') {
            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');

            if (($(element).data('type') === 'name') || ($(element).data('type') === 'policy-holder-name')) {
                var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
                if (ele_value != '' && !regName.test(ele_value)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_name);
                    // $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text();
                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    // $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'pan') {
                var regPan = /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g;
                $(this).val($(this).val().toUpperCase());
                if (ele_value != '' && !ele_value.match(regPan)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_pannumber);
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                }
            }
            if ($(element).data('type') === 'business-auth-name') {
                var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
                if (ele_value != '' && !regName.test(ele_value)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_businame);
                    // $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    // $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    // $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'company-name') {
                // var regName =  /^[a-zA-Z]+ [a-zA-Z]+$/;
                if (ele_value == '') {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_required);
                    // $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    // $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    // $(element).removeClass('jsValueOK')
                }
            }

            if ($(element).data('type') === 'business-degination') {
                // var regName =  /^[a-zA-Z]+ [a-zA-Z]+$/;
                if (ele_value == '') {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_required);
                    // $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    // $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    // $(element).removeClass('jsValueOK')
                }
            }

            if ($(element).data('type') === 'email') {
                var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

                if (ele_value != '' && !ele_value.match(regEmail)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_email);
                    // $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    // $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    // $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'business-auth-email') {
                var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

                if (ele_value != '' && !ele_value.match(regEmail)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_email2);
                    // $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    // $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    // $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'business-org-email') {
                var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

                if (ele_value != '' && !ele_value.match(regEmail)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_email3);
                    // $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    // $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    // $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'mobile') {
                if (!validateMobile(element)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_phoneNumber);
                    // $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    // $(element).removeClass('jsValueOK')
                }
            }
            if ($(element).data('type') === 'business-auth-mobile') {
                if (!validateMobile(element)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_phoneNumber2);
                    // $(element).addClass('jsValueOK')
                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    // $(element).removeClass('jsValueOK')
                }
            }

        } else {
            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
            $(element).parents('.form-textbox-new').addClass('textboxerror');
            $(element).next('.error-msgs').text(ele_required);
        }
    });

    if (getProductValue) {
        var product = getProductValue.split('=')[1].replace(/%20/g, " ");
        // $('[data-type="prod-category"]').val(product).trigger("change");
        $('[data-selectprod="' + product + '"]').trigger("click");
    }

    //Loan aganist form submit
    var userPhoneNumber;
    $('#conversation-form .jsConversationBtn').click(function (e) {
        // $('.jsConversationBtn').addClass('btn-disabled');
        var ele_input = $('#conversation-form').find('.form-textbox-new [data-type]:visible');
        var selectElements = $('#conversation-form .select2-hidden-accessible[data-type]:visible');
        var errors = [];
        allFilled = true;
        var ele_required = "Field is required";

        $(ele_input).each(function () {
            var element = $(this);
            var ele_value = element.val();
            var ele_email = "Please enter valid email ID";
            var ele_email2 = "Please enter valid email ID";
            var ele_email3 = "Please enter valid email ID";
            var ele_name = "Please enter full name";
            var ele_pannumber = "Please enter valid PAN number";
            var ele_businame = "Please enter correct name";

            var ele_phoneNumber = "Please enter valid number";
            var ele_phoneNumber2 = "Please enter valid number";

            $(element).parents('.form-textbox-new').find('.error-msgs').remove();
            $(element).parents('.form-textbox-new').addClass('textboxerror');

            if (element.is(":visible")) {
                if (element.val() != '') {
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    $(element).after('<span class="error-msgs" style="top: 43px"></span>');

                    if (($(element).data('type') === 'name') || ($(element).data('type') === 'policy-holder-name')) {
                        var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
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
                    if ($(element).data('type') === 'pan') {
                        var regPan = /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g;
                        $(this).val($(this).val().toUpperCase());
                        if (ele_value != '' && !ele_value.match(regPan)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_pannumber);
                            errors.push(ele_pannumber);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                        }
                    }
                    if ($(element).data('type') === 'business-auth-name') {
                        var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
                        if (ele_value != '' && !regName.test(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_businame);
                            errors.push(ele_businame);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                        }
                    }

                    if ($(element).data('type') === 'company-name') {
                        if (ele_value == '') {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            errors.push(ele_required);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                        }
                    }

                    if ($(element).data('type') === 'business-degination') {
                        if (ele_value == '') {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            errors.push(ele_required);
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
                    if ($(element).data('type') === 'business-auth-email') {
                        var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

                        if (ele_value != '' && !ele_value.match(regEmail)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_email2);
                            errors.push(ele_email3)
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                        }
                    }
                    if ($(element).data('type') === 'business-org-email') {
                        var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

                        if (ele_value != '' && !ele_value.match(regEmail)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_email3);
                            errors.push(ele_email3)
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
                            userPhoneNumber = $(element).val();
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                        }
                    }
                    if ($(element).data('type') === 'business-auth-mobile') {
                        if (!validateMobile(element)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_phoneNumber2);
                            errors.push(ele_phoneNumber2);
                            inputObj['busAuthMobileNum'] = $('[data-type=business-auth-mobile]').val();
                        } else {
                            userPhoneNumber = $(element).val();
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
            inputObj = {};
            inputObj.convRes = {};
            inputObj.convNri = {};
            inputObj.convBsns = {};
            inputObj['name'] = $('[data-type = "name"]').val();
            inputObj['mobile'] = $('[data-type = "mobile"]').val();
            inputObj['email'] = $('[data-type = "email"]').val();
            inputObj['city'] = $('[data-type = "resi-city"]').val();
            inputObj['occupation'] = $('[data-type="occupation"]').val();
            inputObj['pan'] = $('[data-type="pan"]').val();
            inputObj['corpoarte'] = $('[data-type="corporate-name"]').val();
            inputObj['policyHolder'] = $('[data-form="policy-holder-name"]').val();
            $('#conversation-form [data-type]').each(function (i, inputValue) {
                var attr = $(inputValue).attr('data-type')
                if (!$('[data-type = ' + attr + ']').hasClass('d-none')) {
                    if ($('[data-type="you-are"]').is(":visible")) {
                        if ($('[data-selectvalue]').attr('data-selectvalue') == 'resident-individual') {
                            inputObj.convRes[attr] = $(inputValue).val();
                            inputObj.convRes['text-area'] = $('[data-text="text-area"]').val();
                            inputObj.convRes['prod-category'] = '[' + selectArr + ']';
                        } else if ($('[data-selectvalue]').attr('data-selectvalue') == 'NRI') {
                            inputObj.convNri[attr] = $(inputValue).val();
                            inputObj.convNri['text-area'] = $('[data-text="text-area"]').val();
                            inputObj.convNri['prod-category'] = '[' + selectArr + ']';
                        } else if ($('[data-selectvalue]').attr('data-selectvalue') == 'business') {
                            inputObj.convBsns[attr] = $(inputValue).val();
                            inputObj['name'] = $('[data-type = "business-auth-name"]').val();
                            inputObj['mobile'] = $('[data-type = "business-auth-mobile"]').val();
                            inputObj['email'] = $('[data-type = "business-auth-email"]').val();
                            inputObj['city'] = $('[data-type = "resi-location"]').val();
                            inputObj.convBsns['text-area'] = $('[data-text="text-area"]').val();
                            inputObj.convBsns['assit-experts'] = '[' + selectArr + ']';
                        } else {
                            inputObj[attr] = $(inputValue).val();
                        }
                    } else {
                        if ($('[data-formType]').data('formtype') == "resident-individual") {
                            inputObj.convRes[attr] = $(inputValue).val();
                            inputObj.convRes['text-area'] = $('[data-text="text-area"]').val();
                        } else if ($('[data-formType]').data('formtype') == "nri") {
                            inputObj.convNri[attr] = $(inputValue).val();
                            inputObj.convNri['text-area'] = $('[data-text="text-area"]').val();
                        } else if ($('[data-formType]').data('formtype') == 'business') {
                            inputObj.convBsns[attr] = $(inputValue).val();
                            inputObj['name'] = $('[data-type = "business-auth-name"]').val();
                            inputObj['mobile'] = $('[data-type = "business-auth-mobile"]').val();
                            inputObj['email'] = $('[data-type = "business-auth-email"]').val();
                            inputObj['city'] = $('[data-type = "resi-location"]').val();
                            inputObj.convBsns['text-area'] = $('[data-text="text-area"]').val();
                        } else {
                            inputObj[attr] = $(inputValue).val();
                        }
                    }
                }
            })
            // requestCallBack Analytics START
            try {
                requestCallback_analytics(e)
                // Request CallBack Form - Conversation Form - analytics START
                function requestCallback_analytics(e) {
                    var residentType = getParentElement(e.currentTarget, 4).querySelector('[data-selectvalue]') !== null
                        ? getParentElement(e.currentTarget, 4).querySelector('[data-selectvalue]').value : '';
                    var componentName = window.location.href.split('/').reverse().shift().split('.').shift() === 'wealth' ? 'wealth conversation lead form' :
                        window.location.href.split('/').reverse().shift().split('.').shift().split('-').join(' ') + ' lead form';
                    var emailId = inputObj.email || '';
                    var mobileNo = inputObj.mobile || '';
                    var needassistantFor = getParentElement(e.currentTarget, 4).querySelector('[data-type="prod-category"]') !== null
                        ? getParentElement(e.currentTarget, 4).querySelector('[data-type="prod-category"]').value.split(',') : '';
                    requestacallbackSubmit(residentType, componentName, emailId, mobileNo, needassistantFor, getProductCode());
                }
                // Request CallBack Form - Conversation Form - analytics END
            } catch (err) { console.log('function is not defined'); }
            // requestCallBack Analytics END
            var reqObj = {
                "header": {
                    "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                    "identifier": "nli"
                },
                "body": {
                    "mobileNumber": inputObj.mobile
                }
            }
            $('#loaderWealth').css({ 'display': 'block' })
            applyNowLeadGenerateFilterObj.generateOtp(reqObj).then(function (response) {
                if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                    if (response.response.responseJson.body.otpRefNo) {
                        otpRefNo = response.response.responseJson.body.otpRefNo;
                        $('#loaderWealth').css({ "display": 'none' })

                        $('.jsOTPInputBox').removeClass('d-none');
                        $('.jsConversationSendOTP').addClass('d-none');
                        $('.jsConversationSubmitOTP').removeClass('d-none');
                        $('.jsConversationResendOTP').removeClass('d-none');
                        $('#conversation-otp').find('.js-OtpBox .input-textbox:first-child').focus();

                        $('#conversation-form').addClass('d-none')
                        $('.conversation-otp-wrap').removeClass('d-none')
                        $('.loan-againstclose-btn').removeClass('d-none')
                        // $('.clear-btn').addClass('d-none')
                        $("#conversation-otp .input-textbox[data-type=otp-send-number]").val(userPhoneNumber);
                        $("#conversation-otp .form-textbox-new").addClass('active');

                        $('.jsOnGetCall').addClass('d-none');
                        $('.jsGetOTPSent').addClass('d-none');

                        resetTimer();;

                    } else {
                        console.log('fail');
                        $('#loaderWealth').css({ "display": 'none' })
                        console.log('somthing went wrong');
                        showFailureModal();
                    }
                }
            }).catch(function (error) {
                $('#loaderWealth').css({ "display": 'none' })
                console.log('somthing went wrong');
                showFailureModal();
            });
            clearCompleteForm();
        }

    });

    //OTP Loan aganist form keyup
    $('#conversation-otp .input-textbox[data-type]').keyup(function () {
        var element = $(this);
        var ele_value = element.val();
        var ele_required = 'Field is required';
        var ele_phoneNumber = "Please enter valid number";

        $(this).next('.error-msgs').remove();
        $(this).after('<span class="error-msgs"style="top: 100%"></span>');
        $(this).parents('.form-group').addClass('error');
        if ($(element).val() != '') {
            if ($(element).data('type') === 'otp-send-number') {
                if (!validateMobile(element)) {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_phoneNumber);
                    $('.jsOTPInputBox').addClass('d-none');
                    $('.jsConversationSubmitOTP').addClass('d-none btn-disabled');
                    $('.jsConversationResendOTP').addClass('d-none');
                    $('.jsConversationSendOTP').removeClass('d-none');

                } else {
                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    $(element).next().text('');
                }
            }
        } else {
            $(element).parents('.form-textbox-new').addClass('textboxerror');
            $(element).next('.error-msgs').text(ele_required);
            $('.jsOTPInputBox').addClass('d-none');
            $('.jsConversationSubmitOTP').addClass('d-none');
            $('.jsConversationResendOTP').addClass('d-none');
            $('.jsConversationSendOTP').removeClass('d-none');
        }
        $(".jsOnGetCall").addClass("d-none");
        $(".jsGetOTPSent").addClass("d-none");
        resetTimer();

    });


    /*OTP Loan aganist form send*/
    $('#conversation-otp .jsConversationSendOTP').click(function () {
        $('#conversation-otp').find('.js-OtpBox .input-textbox').val('');
        var ele_input = $('#conversation-otp').find('.form-textbox-new [data-type]:visible');
        var errors = [];
        allFilled = true;
        var ele_required = "Field is required";

        $(ele_input).each(function () {
            var element = $(this);
            var ele_value = element.val();
            var ele_phoneNumber = "Please enter valid number";

            $(element).parents('.form-textbox-new').find('.error-msgs').remove();
            $(element).parents('.form-textbox-new').addClass('textboxerror');

            if (element.is(":visible")) {
                if (element.val() != '') {
                    $(element).after('<span class="error-msgs"style="top: 100%"></span>');

                    if ($(element).data('type') === 'otp-send-number') {
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
                    $(element).after('<span class="error-msgs"style="top: 100%">' + ele_required + '</span>');
                    errors.push(ele_required);
                }
            }
        });

        if (errors.length == 0) {
            inputObj['mobile'] = $('[data-type="otp-send-number"]').val();
            var reqObj = {
                "header": {
                    "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                    "identifier": "nli"
                },
                "body": {
                    "mobileNumber": inputObj.mobile
                }
            }
            $('#loaderWealth').css({ 'display': 'block' })
            applyNowLeadGenerateFilterObj.generateOtp(reqObj).then(function (response) {
                if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                    if (response.response.responseJson.body.otpRefNo) {
                        otpRefNo = response.response.responseJson.body.otpRefNo;
                        $('#loaderWealth').css({ "display": 'none' })

                        $('.jsOTPInputBox').removeClass('d-none');
                        $('.jsConversationSendOTP').addClass('d-none');
                        $('.jsConversationSubmitOTP').removeClass('d-none');
                        $('.jsConversationResendOTP').removeClass('d-none');
                        $('#conversation-otp').find('.js-OtpBox .input-textbox:first-child').focus();
                        /*otp timer*/
                    } else {
                        console.log('fail');
                        $('#loaderWealth').css({ "display": 'none' })
                        console.log('somthing went wrong');
                        showFailureModal()
                    }
                }
            }).catch(function (error) {
                console.log('somthing went wrong');
                $('#loaderWealth').css({ "display": 'none' });
                showFailureModal();
            });
            resetTimer();

        }
    });

    /*Loan aganist form otp keyup*/
    $("#conversation-otp .js-OtpBox .input-textbox").keyup(function () {
        if (this.value.length == this.maxLength) {
            $(this).next('.input-textbox').focus();
            $(this).next('.input-textbox').removeClass('pointer-none');
        } else {
            $(this).prev('.input-textbox').focus();
            $(this).addClass('pointer-none');
            $('#whatsapp-otp .input-textbox:first').removeClass('pointer-none');
        }

        var ele_input = $('.js-OtpBox .input-textbox');
        $(ele_input).each(function () {
            if ($(this).val().length != 0) {
                $(this).parents('#conversation-otp').find('.jsConversationSubmitOTP').removeClass('btn-disabled');
            } else {
                $(this).parents('#conversation-otp').find('.jsConversationSubmitOTP').addClass('btn-disabled');
            }
        });
        $('.js-OtpBox .input-textbox:first-child').removeClass('pointer-none');
    })

    /*loan against otp resend*/
    $('#conversation-otp .jsConversationResendOTP').click(function (e) {
        var $rsButton = $(this);
        var reqObj = {
            "header": {
                "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                "identifier": "nli"
            },
            "body": {
                "mobileNumber": inputObj.mobile
            }
        }
        $('#loaderWealth').css({ 'display': 'block' });
        applyNowLeadGenerateFilterObj.generateOtp(reqObj).then(function (response) {
            if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                if (response.response.responseJson.body.otpRefNo) {
                    otpRefNo = response.response.responseJson.body.otpRefNo;
                    $('#loaderWealth').css({ "display": 'none' })
                    $rsButton.parents('#conversation-otp').find('.js-OtpBox .input-textbox').val('');
                    $rsButton.parents('#conversation-otp').find('.js-OtpBox .input-textbox:first-child').focus();
                    $rsButton.parents('#conversation-otp').find('.js-OtpBox .input-textbox').addClass('pointer-none');
                    $rsButton.parents('#conversation-otp').find('.js-OtpBox .input-textbox:first-child').removeClass('pointer-none');
                    $rsButton.parents('#conversation-otp').find('.jsConversationSubmitOTP').addClass('btn-disabled');

                    $('.otp-expired').addClass("d-none");
                    $("#otp-sent-modal").addClass("popover-show");
                    $("#otp-sent-modal").css("display", "block");
                    $('.otp-send-success').removeClass('d-none');
                    $('#otp-sent-modal .popover-modal-close').addClass('jsThanksModalClose');
                    $("body").addClass("popover-modal-open");
                    $("body").append('<div class="modal-backdrop"></div>');
                    $('.jsOnGetCall').addClass('d-none');
                } else {
                    $('#loaderWealth').css({ "display": 'none' })
                    console.log('fail');
                    showFailureModal()
                }
            }
        }).catch(function (error) {
            $(".jsLoadingBtn").addClass("d-none");
            $('#loaderWealth').css({ "display": 'none' })
            console.log('somthing went wrong');
            showFailureModal()
        });
        // resend otp analytics START
        try {
            var ctaText = e.currentTarget.innerText.trim().replace(/\s+/g, ' ');
            var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('h3').innerText.trim() || 'Verify your mobile number';
            var componentName = window.location.href.split('/').reverse().shift().split('.').shift() === 'wealth' ? 'wealth conversation lead form' :
                window.location.href.split('/').reverse().shift().split('.').shift().split('-').join(' ') + ' lead form';
            ctaInteraction(ctaText, ctaTitle, componentName, getProductCode());
        } catch (err) { console.log(err); }
        //  resend otp analytics END
    });

    /*loan against otp msg close*/
    $('.jsCloseLaonAgainstMgs').click(function () {
        $('.jsFailOTPVarification').addClass('d-none');
        // $("#conversation-otp .input-textbox[data-type=otp-send-number]").val('');
        $('#conversation-otp').find('.js-OtpBox .input-textbox').val('');
        $('.jsOTPInputBox').addClass('d-none');
        $('#conversation-otp').find('.jsConversationSubmitOTP').addClass('btn-disabled d-none');
        $('#conversation-otp').find('.jsConversationSendOTP').removeClass('d-none');
        $('#conversation-otp').find('.jsConversationResendOTP').addClass('d-none');
        $('.loan-againstclose-btn').addClass('d-none');
        $('.clear-btn').removeClass('d-none');
        $('.loan-against-form').removeClass('d-none');
        $('.conversation-otp-wrap').addClass('d-none');
        $('.form-bottom-right-img').removeClass('d-none');
        $("#not-receive-otp-modal").removeClass("popover-show");
        $("#not-receive-otp-modal").removeAttr('style');
        clearCompleteForm();
        resetTimer();
    });

    /*loan against otp msg success close*/
    $('.jsSuccessOTPVarification .jsCloseLaonAgainstMgs').click(function () {
        $('.loan-againstclose-btn').addClass('d-none');
        $('.clear-btn').removeClass('d-none');
        $('.loan-against-form').removeClass('d-none');
        $('.conversation-otp-wrap').addClass('d-none');

    });

    /*loan against otp msg try again*/
    $('.jsOTPTryAgain').click(function (e) {
        $('#request-call-forms').removeClass('d-none');
        $('#conversation-otp').removeClass('d-none');
        $('.jsFailOTPVarification').addClass('d-none');

        $(this).parents('#conversation-otp').find('.jsConversationSubmitOTP').addClass('btn-disabled');
        $('#conversation-otp').find('.js-OtpBox .input-textbox').val('');
        $('#conversation-otp').find('.js-OtpBox .input-textbox:first-child').focus();
        $('#conversation-otp').find('.jsConversationSubmitOTP').addClass('btn-disabled');
        // $('.form-bottom-right-img').removeClass('d-none');
        // Try again otp analytics START
        try {
            var ctaText = e.currentTarget.innerText.trim().replace(/\s+/g, ' ');
            var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('.heading20').innerText.toLowerCase().trim() || '';
            var componentName = window.location.href.split('/').reverse().shift().split('.').shift() === 'wealth'
                ? 'wealth conversation lead form' : window.location.href.split('/').reverse().shift().split('.').shift().split('-').join(' ') + ' lead form';
            ctaInteraction(ctaText, ctaTitle, componentName, getProductCode())
        } catch (err) { console.log(err); }
        // Try again otp analytics END
    });

    /*loan against otp submit*/
    $('#conversation-otp .jsConversationSubmitOTP').click(function (e) {
        // $('.form-bottom-right-img').addClass('d-none');
        var values = []
        $('#conversation-otp .js-OtpBox .input-textbox').each(function (i, ele) {
            values.push(ele.value)
        });
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
        $('#loaderWealth').css({ 'display': 'block' })
        getInTouchFilterObj.verifyOtp(reqObj).then(function (response) {
            try {
                var leadId = '';
                var mobileNo = getParentElement(e.currentTarget, 2).querySelector('[data-type="otp-send-number"]').value || '';
                var otpStatus = response.response?.responseJson?.header?.status.toLowerCase() || response.response?.responseJson?.errorBody?.errorMessage.toLowerCase() || '';
                var componentName = window.location.href.split('/').reverse().shift().split('.').shift() === 'wealth' ? 'wealth conversation lead form' :
                    window.location.href.split('/').reverse().shift().split('.').shift().split('-').join(' ') + ' lead form';
            } catch (err) { console.log(err); }

            if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.retStatus.toLowerCase() == 'success') {
                var reqObj = {
                    "header": {
                        "authToken": "MTI4Ojo"
                    },
                    "body": {
                        "plEmployeeForm": {
                            "customer": {
                                "customerName": inputObj.name,
                                "mobile": inputObj.mobile,
                                "personalEmail": inputObj.email,
                                "panNumber": inputObj.pan,
                                "assetClassInvestedIn": "",
                                "serviceInterestedIn": "",
                                "anyOtherRequirements": "",
                                "productCode": "WEALTH ADVISORY",
                                "businessExistence": "",
                                "residenceAndEmploymentStability": "",
                                "nameOfThePolicyHolder": inputObj.policyHolder,
                                "corporateName": inputObj.corpoarte,
                                "loanOnCar": false,
                                "isOverDraftLoan": "",
                                "lapOdFlag": "",
                                "nriDetails": {
                                    "isdMobile": "",
                                    "country": "",
                                    "preferredTimeToCall": "",
                                    "preferredServicedLocIndia": "",
                                    "objectiveType": ""
                                }
                            },
                            "convRes": {
                                "name": inputObj.convRes.name,
                                "email": inputObj.convRes.email,
                                "mobile": inputObj.convRes.mobile,
                                "country": 'India',
                                "assistanceExpert": inputObj.convRes['prod-category'],
                                "meetElaboration": inputObj.convRes['text-area']
                            },
                            "convNri": {
                                "name": inputObj.convNri.name,
                                "email": inputObj.convNri.email,
                                "mobile": inputObj.convNri.mobile,
                                "country": "India",
                                "assistanceExpert": inputObj.convNri['prod-category'],
                                "meetElaboration": inputObj.convNri['text-area']
                            },
                            "convBsns": {
                                "compName": inputObj.convBsns['company-name'],
                                "compType": inputObj.convBsns['busi-type'],
                                "orgEmail": inputObj.convBsns['business-org-email'],
                                "authPersonName": inputObj.convBsns['business-auth-name'],
                                "authPersonDsignation": inputObj.convBsns['business-degination'],
                                "location": inputObj.convBsns['resi-location'],
                                "authPersonEmail": inputObj.convBsns['business-auth-email'],
                                "authPersonMobNo": inputObj.convBsns['business-auth-mobile'],
                                "assistanceExpert": inputObj.convBsns['assit-experts'],
                                "meetElaboration": inputObj.convBsns['text-area']
                            },
                            "loanDetails": {
                                "wealthProductName": inputObj.convRes['prod-category'],
                                "leadSubSource": subsource
                            },
                            "residenceAddress": {
                                "pinCode": "",
                                "state": "",
                                "city": inputObj.city
                            },
                            "occupationDetails": {
                                "turnoverInLastFY": "",
                                "numberOfYearsInBusiness": "",
                                "occupation": inputObj.occupation,
                            },
                            "officeAddress": {},
                            "referenceDetails": [
                                {}
                            ],
                            "insuranceDetails": {
                                "numberOfMembers": "",
                                "custContent": ""
                            }
                        }
                    },
                    "headerJson": {}
                }
                applyNowLeadGenerateFilterObj.applyNowLeadGenerate(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status.toLowerCase() == "success") {
                        $('#loaderWealth').css({ "display": 'none' })
                        leadId = response.response?.responseJson?.body?.LeadId || '';
                        $('#refNum').text(leadId);
                        // verify OTP analytics START
                        try {
                            otpverifySubmit(mobileNo, leadId, otpStatus, componentName, getProductCode());
                        } catch (err) {
                            console.log(err);
                        }
                        // verify OTP analytics END
                    }
                });
                $('#request-call-forms').addClass('d-none');
                $('#conversation-otp').addClass('d-none');
                $('.jsSuccessOTPVarification').removeClass('d-none');
            } else if (response.response.responseJson.header.status.toLowerCase() == 'failure' && response.response.responseJson.errorBody.errorMessage && response.response.responseJson.errorBody.errorMessage.toLowerCase() == 'otp has expired!') {
                $('#loaderWealth').css({ "display": 'none' });
                handleOtpExpired();
                try {
                    otpverifySubmit(mobileNo, leadId, otpStatus, componentName, getProductCode());
                } catch (err) {
                    console.log(err);
                }
            } else {
                $('#loaderWealth').css({ "display": 'none' })
                $('#request-call-forms').addClass('d-none');
                $('#conversation-otp').addClass('d-none');
                $('.jsFailOTPVarification').removeClass('d-none');
                resetTimer();
                try {
                    otpverifySubmit(mobileNo, leadId, otpStatus, componentName, getProductCode());
                } catch (err) {
                    console.log(err);
                }
            }
        }).catch(function (error) {
            $('#loaderWealth').css({ "display": 'none' })
            console.log('somthing went wrong');
            showFailureModal();
        });
    })

    //Otp details close button
    $('.jsCloseOtpDetails').click(function () {
        $('.loan-against-form').removeClass('d-none');
        $('.conversation-otp-wrap').addClass('d-none');
        $('.loan-againstclose-btn').addClass('d-none');
        $('.clear-btn').removeClass('d-none');
        clearCompleteForm();
    })

    //Select 2 on change remove error state
    $('.js-select2').change(function () {
        $(this).parents('.form-textbox-new').removeClass('textboxerror');
        // $(this).find('.text-infos').removeClass('d-none');
        $(this).next('.error-msgs').remove();
        $(this).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
        clearMultiSelect();
        // $(this).removeClass('jsValueOK')
        // var selectedval = $(this).val();
        // if (selectedval === 'MutualFunds' || selectedval === 'Shares'){
        //     $('.modal-backdrop').remove();
        //     setTimeout(function () {
        //         $('#thankyou-modal').addClass('popover-show');
        //     }, 80);
        //     $('#thankyou-modal').css('display', 'block');
        //     $('body').addClass('popover-modal-open');
        //     $('body').append('<div class="modal-backdrop"></div>');
        //     $(this).val(null).trigger('change');
        //     $(this).addClass('jsValueOK')
        // }
        // if (selectedval === 'MutualFunds'){
        //     /*10-2-2023*/ 
        //     $('#thankyou-modal .apply-texts').html('To apply for a Loan Against Mutual Funds');
        //     /*10-2-2023*/ 
        // }
        // if (selectedval === 'Shares'){
        //     /*10-2-2023*/ 
        //     $('#thankyou-modal .apply-texts').html('To apply for a Loan Against Shares');
        //     /*10-2-2023*/ 
        // }
        // if($('#conversation-form .jsValueOK').length == 0){
        //     $('.jsConversationBtn').removeClass('btn-disabled');
        // } else {
        //     $('.jsConversationBtn').addClass('btn-disabled');
        // }
    })

})

function clearCompleteForm() {
    // $('.jsConversationBtn').addClass('btn-disabled');

    // $('#conversation-form .input-textbox[data-type]').addClass('jsValueOK')
    $('#conversation-form .input-textbox[data-type], #conversation-form .input-textbox.text-area').val('');
    $('#conversation-form .form-textbox-new').removeClass('active onchange');
    // $('#conversation-form .form-textbox-new .textbox-inner').removeClass('has-rupee-icon');
    // $('#conversation-form .form-textbox-new .text-infos').removeClass('hide-input-note');
    // $('#conversation-form .form-textbox-new .icon-rupee').addClass('d-none');
    // $('.js-select2').val('');
    $('.js-select2').each(function () {
        $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
        $('.js-select2').parents('.form-textbox-new').addClass('active');
        $('.js-select2').next('.error-msgs').remove();
        $('.js-select2').val(null).trigger('change');
        // $('.js-select2').addClass('jsValueOK')
    });

    $('.jsConversationSubmitOTP').addClass('btn-disabled');
    $('#conversation-form .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
    $('#conversation-form .input-textbox[data-type]').next().text('');
    $('[data-otp]').val('');
}

$(".jsOnGetCall").click(function () {
    $(this).addClass("d-none");
    var reqObj = {
        "header": {
            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
            "identifier": "nli"
        },
        "body": {
            "mobileNumber": inputObj.mobile,
            "otpRefNo": otpRefNo,
        }
    }
    $('#loaderWealth').css({ 'display': 'block' })
    applyNowLeadGenerateFilterObj.onCallOtp(reqObj).then(function (response) {
        if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.status.toLowerCase() == 'success') {
            $('#loaderWealth').css({ 'display': 'none' })
            $(".jsOnGetCall").parents(".popover-modal").removeClass("popover-show");
            $(".jsOnGetCall").parents(".popover-modal").removeAttr("style");
            $(".height-scroll").removeAttr("style");
            $("body").removeClass("popover-modal-open");
            $(".modal-backdrop").remove();
        }
    }).catch(function (error) {
        $('#loaderWealth').css({ "display": 'none' });
        $(".jsGetCalling").addClass("d-none");
        showFailureModal();
    });
    $(".jsGetCalling").removeClass("d-none");
    setTimeout(() => {
        $(".jsGetCalling").addClass("d-none");
        $(".jsGetOTPSent").removeClass("d-none");
    }, 3000);
    clearTimeout(modaltimer1);

});

$(".jsModalOnGetCall").click(function (e) {
    $(this).addClass("d-none");
    var reqObj = {
        "header": {
            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
            "identifier": "nli"
        },
        "body": {
            "mobileNumber": inputObj.mobile,
            "otpRefNo": otpRefNo,
        }
    }
    $('#loaderWealth').css({ 'display': 'block' })
    applyNowLeadGenerateFilterObj.onCallOtp(reqObj).then(function (response) {
        if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.status.toLowerCase() == 'success') {
            $('#loaderWealth').css({ 'display': 'none' });
            $(".jsGetCalling").removeClass("d-none");
            $(".jsModalOnGetCall")
                .parents(".popover-modal")
                .removeClass("popover-show");
            $(".jsModalOnGetCall").parents(".popover-modal").removeAttr("style");
            $(".height-scroll").removeAttr("style");
            $("body").removeClass("popover-modal-open");
            $(".modal-backdrop").remove();
        }
    }).catch(function (error) {
        $('#loaderWealth').css({ "display": 'none' })
        $(".jsGetCalling").addClass("d-none");
        showFailureModal();
    });
    // receive otp by call analytics START
    try {
        var ctaText = e.currentTarget.innerText.trim().replace(/\s+/g, ' ');
        var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('.heading20').innerText.trim() || '';
        var componentName = window.location.href.split('/').reverse().shift().split('.').shift() === 'wealth' ? 'wealth conversation lead form' :
            window.location.href.split('/').reverse().shift().split('.').shift().split('-').join(' ') + ' lead form';
        ctaInteraction(ctaText, ctaTitle, componentName, getProductCode());
    } catch (err) { console.log(err); }
    // receive otp by call analytics END
});

$(".jsNotReceiveOtpClose").click(function () {
    $(".jsNotReceiveOtpClose")
        .parents(".popover-modal")
        .removeClass("popover-show");
    $(".jsNotReceiveOtpClose").parents(".popover-modal").removeAttr("style");
    $(".height-scroll").removeAttr("style");
    $("body").removeClass("popover-modal-open");
    $(".modal-backdrop").remove();
    $(".jsOnGetCall").removeClass("d-none");
});

function handleOtpExpired() {
    $("#not-receive-otp-modal").removeClass("popover-show");
    $("#not-receive-otp-modal").css("display", "none");
    $("#otp-sent-modal").addClass("popover-show");
    $("#otp-sent-modal").css("display", "block");
    $('.otp-send-success').addClass('d-none');
    $('.otp-expired').removeClass('d-none');
    $('#otp-sent-modal .popover-modal-close').removeClass('jsThanksModalClose');
    $("body").addClass("popover-modal-open");
    $("body").append('<div class="modal-backdrop"></div>');
}

function showOtpExpiredModal() {
    $("#not-receive-otp-modal").removeClass("popover-show").css("display", "none");
    $("#otp-sent-modal").addClass("popover-show").css("display", "block");
    $('.otp-send-success').addClass('d-none');
    $('.otp-expired').removeClass('d-none');
    $('#otp-sent-modal .popover-modal-close').removeClass('jsThanksModalClose');
    $(".jsOnGetCall").removeClass("d-none");
    $('.jsGetCalling').addClass('d-none');
    $("body").addClass("popover-modal-open");
    $("body").append('<div class="modal-backdrop"></div>');
}

function clearMultiSelect() {
    $('.js-filterBtn').next('.error-msgs').remove();
    $('.js-filterBtn').parents('.form-textbox-new').removeClass('textboxerror');
    $('.jsMulitSelectValue').addClass('jsValueOK');
    $('.js-filterBtn a').text('Select');
    $('.js-filterBtn a').css('color', '#828282');
    $('.jsMulitSelectValue').val('Select');
    $('.jsMultiDropdown').addClass('active');
    $('.jsMultiSelectList .select-item').removeClass('active');
    $('.jsMultiSelectList .select-item .js-filterCheck').prop('checked', false);
    selectArr = [];
    joinedVal = '';
}

setInterval(function() {
    if ($('#conversation-form .tops-heads').hasClass('changeContent')) {
        $('#conversation-form .tops-heads').html(`<h2>Request a <span>Call Back</span></h2><p>Please fill in your details and we will get in touch with you.</p>`);
        $('#conversation-form .tops-heads').removeClass('changeContent');
    } else {
        $('#conversation-form .tops-heads').html(`<h2>Let’s start a <span>Coversation</span></h2><p>Please fill in your details and we will get in touch with you.</p>`);
        $('#conversation-form .tops-heads').addClass('changeContent');
    }
}, 2000);