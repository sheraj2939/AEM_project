(function (_global) {
    var applyNowLeadGenerateBizCallFn = (function (jsHelper) {
        var applyNowLeadGenerateBizObj = {};
        $(document).ready(function () { 
            let selectField = $('[data-select="email-campaign"]');
            let cityPincodes = null;
            if($('[data-select="email-campaign"]').length > 0){
                updateOptions('')
            }
            
            onSelectHandle();
            
            function showLoader() {
                $("body").addClass("bg-loader");
                $(".loader").removeClass("hide-loader");
            }
            function hideLoader() {
                $("body").removeClass("bg-loader");
                $(".loader").addClass("hide-loader");
            }

            /*function fetchCityPincodes() {
                showLoader();
                if (cityPincodes !== null) {
                    return Promise.resolve(cityPincodes);
                }
                return applyNowLeadGenerateFilterObj['educationLoanPincode']
                    .then(function (response) {
                        if (response.status.toLowerCase() === 'success') {
                            hideLoader()
                            return JSON.parse(response.response);
                        }
                    })
                    .then(data => {
                        cityPincodes = [...data.Master];
                        return cityPincodes;
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        return [];
                    });
            }*/

            function fetchCityPincodes() {
                showLoader();
                if (cityPincodes !== null) {
                    hideLoader()
                    return Promise.resolve(cityPincodes);
                }
        
                return fetch(window.osgiConfigObj.calcApiDomain+'/web/api/mdm/export/edu-pincode.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        cityPincodes = [...data.Master];
                        hideLoader()
                        return cityPincodes;
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        return [];
                    });
            }
  
            function filterOptions(inputValue, cityPincodes) {
                if (inputValue === '') {
                    return cityPincodes.slice(0, 100); 
                }
                inputValue = inputValue.trim();
                return cityPincodes.filter(el => el.pincode.startsWith(inputValue));
            }

            function updateOptions(inputValue) {
                fetchCityPincodes()
                    .then(data => {
                        let filteredOptions = filterOptions(inputValue, data);
                        let optionsHTML = filteredOptions.map(function(el) {
                            return '<option value="' + el.pincode + '">' + el.pincode + '</option>';
                        }).join('');
                        $('[data-type="city"]').empty();
                        selectField.empty().append('<option value=""></option>').append(optionsHTML);
                    })
                    .catch(error => {
                        console.error('Error fetching or updating options:', error);
                    });
            }

        function onSelectHandle(){
            selectField.on('select2:open', function (e) {
                document.querySelector('.select2-search__field') && document.querySelector('.select2-search__field').focus();
                let inputField = $('[data-select="email-campaign"]').data('select2').dropdown.$dropdown[0].querySelector('.select2-search__field');
                inputField && inputField.addEventListener('keyup', function() {
                    let inputValue = $(this).val();
                    updateOptions(inputValue);
                });
            });
            
            selectField.on('select2:select', function(e){
                    let selectedPinCode = e.params.data.id;
                    let pincodeSet = document.querySelector('[data-type="pinCode"]').nextElementSibling;
                    const correspondingCityObj = cityPincodes.find(el => el.pincode.trim() === selectedPinCode);
                    if (correspondingCityObj) {
                        const correspondingCity = correspondingCityObj.city.trim();
                        if (correspondingCity !== '') {
                            if(pincodeSet){
                                pincodeSet.querySelector('.select2-selection__rendered').innerText = selectedPinCode;
                            }
                            $('[data-type="city"]').empty().append(`<option value="${correspondingCity}" selected="selected">${correspondingCity}</option>`);
                        }
                    }
            });
        }

            var urlParams = getURLParams(location.href);
            $('.lead-forms .main-title').removeClass('d-none');
            // Select 2 js //
            $(".js-select2").select2({
                placeholder: "Select",
            });
            $(".js-select2-search-hide").select2({
                minimumResultsForSearch: Infinity,
            });
            $('.only-alpha-input').on("keypress paste", function (e) {
                var regex = new RegExp(/[^a-zA-Z\b ]/g);
                if (regex.test(String.fromCharCode(e.which))) {
                    return false;
                }
            });
            $('.only-alpha-numeric-input').keyup(function (e) {
                var alphaNumericRegex = "^[a-zA-Z0-9]*$";
                if (String.fromCharCode(e.keyCode).match(/[^a-zA-Z0-9 ]/g)) {
                    return false;
                }
            });

            $('.only-numeric-input').keyup(function (e) {
                $(this).val($(this).val().replace(/[^\d.-]/g, ''));
            });

            $('[data-multiselect="multiselect-drop"]').click(function (e) {
                if (document.querySelector('.jsMultiDropdown') && !document.querySelector('.jsMultiDropdown').classList.contains('show')) {
                    $('.jsMultiDropdown').addClass('show')
                    $(this).addClass('active')
                } else {
                    $('.jsMultiDropdown').removeClass('show')
                    $(this).removeClass('active')
                }
                e.stopPropagation();
            })

            $('.jsMultiSelectList').click(function (e) {
                e.stopPropagation();
            })

            $('body').click(function (e) {
                if (document.querySelector('.jsMultiDropdown') && document.querySelector('.jsMultiDropdown').classList.contains('show')) {
                    $('.jsMultiDropdown').removeClass('show')
                    $(this).removeClass('active')
                }
            })

            ///Multiple select dropdown whole logic
            var selectArr = [];
            var joinedVal;
            function getParentElement(element, level = 1) {
                while (level-- > 0) {
                    element = element.parentElement;
                    if (!element) return null;
                }
                return element;
            }
            $('.js-filterCheck').change(function () {
                var newSelectedArr = $(this).attr('data-event');
                var selectedActualText = $('[data-item="' + newSelectedArr + '"] .checkboxtext').text();
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
                if (joinedVal === '') {
                    $('.js-filterBtn a').text('Select');
                    $('.js-filterBtn a').css('color', '#828282');
                    $('.jsMulitSelectValue').val('Select')
                } else {
                    $('.js-filterBtn a').text(joinedVal);
                    $('.js-filterBtn a').css('color', '#333333');
                    $('.jsMulitSelectValue').val(joinedVal);
                }
            });

            $('.js-filterCheck').change(function () {
                $('.js-filterBtn').next('.error-msgs').remove();
                $('.js-filterBtn').after('<span class="error-msgs"></span>');
                $(this).parents('.form-textbox-new').removeClass('textboxerror');
                $('.jsMulitSelectValue').removeClass('jsValueOK');
                MulitSelectVal = $('.jsMulitSelectValue').val();
                if (MulitSelectVal === 'Select') {
                    $(this).parents('.form-textbox-new').addClass('textboxerror');
                    $('.jsMulitSelectValue').addClass('jsValueOK');
                    $('.js-filterBtn').next('.error-msgs').text('Field is required');
                }
                $('#lead-cancer-capture-insurance .jsMultiDropdown [data-type="multiple-dropVal"]').keyup();
            })
            $('[data-type="iAgree"]').change(function () {
                if ($(this).is(":checked")) {
                    $(this).removeClass('jsValueOK');
                    if ($('#loan-against-property .jsValueOK').length == 0) {
                        $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
                        $('.jsSugamCampaignSubmit').removeClass('btn-disabled');
                        $('.jsForeClosureReferBtn').removeClass('btn-disabled');
                        $('.jsFiservBusinessBtn').removeClass('btn-disabled');


                    } else {
                        $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                        $('.jsSugamCampaignSubmit').addClass('btn-disabled');
                        $('.jsForeClosureReferBtn').addClass('btn-disabled');
                        $('.jsFiservBusinessBtn').addClass('btn-disabled');
                    }

                } else {
                    $(this).addClass('jsValueOK');
                    if ($('#loan-against-property .jsValueOK').length == 0) {
                        $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
                        $('.jsSugamCampaignSubmit').removeClass('btn-disabled');
                        $('.jsForeClosureReferBtn').removeClass('btn-disabled');
                        $('.jsFiservBusinessBtn').removeClass('btn-disabled');

                    } else {
                        $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                        $('.jsSugamCampaignSubmit').addClass('btn-disabled');
                        $('.jsForeClosureReferBtn').addClass('btn-disabled');
                        $('.jsFiservBusinessBtn').addClass('btn-disabled');


                    }

                }
            })
            $(".jsSubscribeClose").click(function () {
                clearCompleteForm();
                $('.clear-btn').removeClass('d-none')

            })
            /*9-2-2023*/
            //Focus open select 2 dropdown
            $(document).on('focus', '.select2.select2-container', function (e) {
                if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
                    $(this).siblings('select').select2('open');
                    // Focus on input field on open dropdown
                    setTimeout(function () {
                        const searchField = document.querySelector('.select2-search__field');
                        if (searchField) {
                            searchField.focus();
                        }
                    }, 10)
                    // Focus on input field on open dropdown
                }
            });
            /*9-2-2023*/
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

            function clearRadioInput() {
                $('.jsRadio').closest('.form-textbox-new').addClass('active');
                $('.jsRadio input[value="no"]').each(function () {
                    $('.jsRadio input[value="no"]').prop('checked', true);
                })
            }
            function uniqueArray(arr) {
                var uniqueArr = [];
                for (var i = 0; i < arr.length; i++) {
                    if (uniqueArr.indexOf(arr[i]) === -1) {
                        uniqueArr.push(arr[i]);
                    }
                }
                return uniqueArr;
            }
            ///Multiple select dropdown whole logic    

            var reqObj = {};
            var feildsCount = $('#loan-against-property .jsValueOK').length;
                        
            /* if ($(".city").length > 0) {
                $("body").addClass("bg-loader");
                $(".loader").removeClass("hide-loader");
                applyNowLeadGenerateFilterObj.cityProductMasterCampaign(reqObj).then(function (response) {
                    if (response.status == "SUCCESS") {
                        $("body").removeClass("bg-loader");
                        $(".loader").addClass("hide-loader");
                        var cityArray = [];
                        var responseArray = JSON.parse(response.response).Master;
                        responseArray.forEach(function (ele) {
                            cityArray.push(ele.city);
                        })
                        cityArray = cityArray.sort();
                        $(".city").html();
                        $(".city").append("<option value=''></option>");
                        cityArray = uniqueArray(cityArray);
                        cityArray.forEach(function (element) {
                            $(".city").append('<option value=' + element + '>' + element + '</option>');
                        });
                    } else {
                        if (response.response.responseJson.errorBody.statusCode == "403") {
                            var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                            if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                $('#loan-against-otp').addClass('d-none');
                                $('.jsFailOTPVarification').removeClass('d-none');
                                $('.lead-forms .main-title').addClass('d-none')
                            } else {
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
                        } else {
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
                    console.error(error);
                });
            } */

            let otherCompany = false;
            $('[data-type="company"]').on('select2:open', function(e){
                let otherCompanyField = document.querySelector('[data-type="company"]').parentElement;
                if(!otherCompany && getParentElement(e.currentTarget, 3).querySelector('.label-name').innerText.includes('Company')) { 
                    $('.select2-dropdown').append('<option value="Other" style="background-color: #1961AC; color: #fff; cursor: pointer;" class="select2-results__option other-company">Other</option>')
                    otherCompany = true
                } 
                document.querySelector('.other-company').addEventListener('click', function(e){
                    getParentElement(e.currentTarget,2) ? getParentElement(e.currentTarget,2).remove() : '';
                    otherCompanyField.classList.add('d-none');
                    otherCompanyField.nextElementSibling.classList.remove('d-none');
                    otherCompanyField.nextElementSibling.focus();
                });
            })

            if ($(".company").length > 0) {
                applyNowLeadGenerateFilterObj.companyNameCampaign(reqObj).then(function (response) {
                    if (response.status == "SUCCESS") {
                        var companyArray = []
                        $("body").removeClass("bg-loader");
                        $(".loader").addClass("hide-loader");
                        var company = JSON.parse(response.response).Master;
                        company.forEach(function (ele) {
                            companyArray.push(ele.comapanyname)
                        })
                        $(".company").html();
                        $(".company").append("<option value=''></option>");
                        $(".company").append("<option value='"+companyArray[0]+"'>" + companyArray[0] + "</option>");
                        companyArray = companyArray.slice(1).sort();
                        companyArray.forEach(function (element) {
                            $(".company").append('<option value=' + element + '>' + element + '</option>');
                        })
                    }
                    else {
                        if (response.response.responseJson.errorBody.statusCode == "403") {
                            var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                            if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                /*14-1-2023*/
                                $('#loan-against-otp').addClass('d-none');
                                /*14-1-2023*/
                                $('.jsFailOTPVarification').removeClass('d-none');
                                $('.lead-forms .main-title').addClass('d-none')
                            } else {
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
                        } else {
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
                    console.log(error);
                });
            }
            if ($('[jsname="productName"]').length > 0) {
                var productOptions = [];
                // 
                for (i in jsonProductMaster) {
                    for (productName in jsonProductMaster[i]) {
                        productOptions.push(jsonProductMaster[i][productName])
                    }
                }
                productOptions = productOptions;
                var select = document.querySelector('[jsname="productName"]');
                for (var i = 0; i < productOptions.length; i++) {
                    var option = productOptions[i];
                    var opt = document.createElement('option');
                    opt.value = option;
                    opt.text = option;
                    select.appendChild(opt);
                }
            }
            if ($('.financer').length > 0) {
                jsonFinancerMaster = jsonFinancerMaster.sort();
                var financerSelect = document.querySelector('[data-form="financer"]');
                jsonFinancerMaster.forEach(function (finCompany) {
                    var option = finCompany;
                    var opt = document.createElement('option');
                    opt.value = option;
                    opt.text = option;
                    financerSelect.appendChild(opt);

                })
                var OtherOpt = document.createElement('option');
                OtherOpt.value = "Other";
                OtherOpt.text = "Other";
                financerSelect.appendChild(OtherOpt);
            }
            if($('[data-form="homeLoanValue"]').length > 0){
                $('[data-form="homeLoanValue"]').on('input',function(){
                    if($('[data-form="homeLoanValue"]').val() !=""){
                        $('.icon-rupee').removeClass('d-none');
                        $('.icon-rupee').parent().addClass('has-rupee-icon');
                    }
                    else{
                        $('.icon-rupee').addClass('d-none');
                        $('.icon-rupee').parent().removeClass('has-rupee-icon');
                    }
                })
            }

            var emailFlag = false;
            var validEmail = {};
            var emailArr;
            var dummyDomains = [];
            $('[data-type="email"]').focus(function () {
                if (!emailFlag && !sessionStorage.getItem("email")) {
                } else { }
            });

            $('#loan-against-property .input-textbox[data-type]').on('keyup', function () {
                if (sessionStorage.getItem("email")) {
                    dummyDomains = sessionStorage.getItem("email");
                    emailArr = sessionStorage.getItem("emailArr");
                    emailArr = JSON.parse(emailArr);
                }
                var element = $(this);
                var ele_value = element.val();
                var ele_required = 'Field is required';
                var ele_email = "Please enter valid email";
                var ele_name = "Please enter full name";
                var ele_phoneNumber = "Please enter valid number";
                var ele_pannumber = "Please enter valid PAN number";
                var ele_propRequiredValue = "Please select an amount less than 100 Crore";
                var ele_merchantId = "Please enter an subscriber ID";


                $(this).next('.error-msgs').remove();
                $(this).after('<span class="error-msgs" style="top: 43px"></span>');
                $(this).parents('.form-group').addClass('error');

                // $('.subscribe-success').addClass('d-none');

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
                    if ($(element).data('type') === 'homeLoanValue') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).removeClass('jsValueOK');
                    }
                    if ($(element).data('type') === 'property-address') {
                        var regName = /[A-Za-z]/;
                        if (ele_value != '' && !regName.test(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }

                    if ($(element).data('type') === 'email') {
                        //var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
                        var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm
                        if (ele_value != '' && !ele_value.match(regEmail)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_email);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK');
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
                            $(element).removeClass('jsValueOK');
                        }
                        
                    }
                    if ($(element).data('type') === 'multiple-dropVal') {
                        $(element).removeClass('jsValueOK')
                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    }
                    if ($(element).data('type') === 'Merchant-ID') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).removeClass('jsValueOK');
                        /* if($('[data-form="merchantID"]').val().length === 0){
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_merchantId);
                            $(element).addClass('jsValueOK');
                        }else{
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK');
                        } */
                    }
                    if ($(element).data('type') === 'pan') {
                        var regPan = /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g;
                        $(this).val($(this).val().toUpperCase());
                        if (ele_value != '' && !ele_value.match(regPan)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_pannumber);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK');
                        }
                    }
                    if ($(element).data('type') === 'require-loan-amount') {
                        $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                        $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                        var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                            /* if (ele_value != '' && !(rupeeValue <= 1000000000)) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text(ele_propRequiredValue);
                                $(element).addClass('jsValueOK');
                            } */
                            if(ele_value <= 0) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text('Amount cannot be zero');
                                $(element).addClass('jsValueOK');
                            } else {
                                $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                $(element).next().text('');
                                $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                $(element).removeClass('jsValueOK');
                            }
                    }
                    if ($(element).data('type') === 'other') {
                        if(ele_value <= 0) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).addClass('jsValueOK');
                        } else {
                            document.querySelector('[data-type="company"]').classList.remove('jsValueOK')
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK');
                        }
                    }

                } else {
                    if ($(element).data('type') === 'homeLoanValue') {
                        $(element).addClass('jsValueOK');
                    };
                    if ($(element).data('type') === 'property-address') {
                        $(element).addClass('jsValueOK');
                    };
                    if ($(element).data('type') === 'mobile'){
                        $(element).addClass('jsValueOK');
                    }
                    if ($(element).data('type') === 'email') {
                        $(element).addClass('jsValueOK');
                    }
                    if ($(element).data('type') === 'name') {
                        $(element).addClass('jsValueOK');
                    }
                    if ($(element).data('type') === 'require-loan-amount') {
                        $(element).addClass('jsValueOK');
                    }
                    if ($(element).data('type') === 'other') {
                        $(element).addClass('jsValueOK');
                    };
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    $(element).parents('.textbox-inner').removeClass('has-rupee-icon');
                    $(element).parents('.textbox-inner').find('.icon-rupee').addClass('d-none');
                    $(element).next('.error-msgs').text(ele_required);
                    if ($(element).data('type') === 'Merchant-ID') {
                        $(element).addClass('jsValueOK');
                        $(element).next('.error-msgs').text(ele_merchantId);
                    };
                }
                feildsCount = $('#loan-against-property .jsValueOK').length

                if ($('#loan-against-property .jsValueOK').length == 0) {
                    $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
                    $('.jsSugamCampaignSubmit').removeClass('btn-disabled');
                    $('.jsForeClosureReferBtn').removeClass('btn-disabled');
                    $('.jsFiservBusinessBtn').removeClass('btn-disabled');

                } else {
                    $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                    $('.jsSugamCampaignSubmit').addClass('btn-disabled');
                    $('.jsForeClosureReferBtn').addClass('btn-disabled');
                    $('.jsFiservBusinessBtn').addClass('btn-disabled');

                }
            });
            $('#loan-against-property .jsApplyLoanAgainstProp').click(function (e) {

                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                $('.clear-btn').addClass('d-none')
                var obj = {};
                var selectedProductName = $('[jsname="productName"]').find(":selected").val();
                obj.customerFullName = $('[data-form="customerName"]').val();
                obj.customerMobileNumber = $('[data-form="mobile"]').val();
                obj.customerEmail = $('[data-form="personalEmail"]').val();
                obj.selectedCity = $('[data-form="city"]').find(":selected").val() || getParentElement(e.currentTarget, 2).querySelector('[data-type="city"]').value;
                obj.selectedCompany = $('[data-form="company"]').find(":selected").text() || getParentElement(e.currentTarget, 2).querySelector('[data-type="other"]').value;
                obj.pinCode = getParentElement(e.currentTarget, 2).querySelector('[data-type="pinCode"]').value || getParentElement(e.currentTarget, 2).querySelector('[data-type="pinCode"]').nextElementSibling.querySelector('.select2-selection__rendered').innerText.trim();
                for (var key in jsonProductMaster) {
                    if (jsonProductMaster.hasOwnProperty(key)) {
                        if (jsonProductMaster[key].ProductName == selectedProductName) {
                            obj.selectedProduct = key;
                        }
                    }
                }
                // clearCompleteForm();
                // clearRadioInput();
                // clearMultiSelect();
                        var reqObj = {
                            "header": {
                                "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="
                            },
                            "body": {
                                "plEmployeeForm": {
                                    "customer": {
                                        "customerName": obj.customerFullName,
                                        "mobile": obj.customerMobileNumber,
                                        "personalEmail": obj.customerEmail,
                                        "alternateMobile": "",
                                        "birthDate": "",
                                        "aadhaarNumber": "",
                                        "panNumber": "",
                                        "maritalStatus": "",
                                        "gender": "",
                                        "mothersMaidenName": "",
                                        "assetClassInvestedIn": "",
                                        "serviceInterestedIn": "",
                                        "anyOtherRequirements": "",
                                        "webTopId": "",
                                        "productCode": obj.selectedProduct,
                                        "businessExistence": "",
                                        "uniqueIdentifier": "",
                                        "residenceAndEmploymentStability": "",
                                        "nameOfThePolicyHolder": "",
                                        "corporateName": "",
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
                                    "loanDetails": {
                                        "wealthProductName": "",
                                        "product": "",
                                        "make": "",
                                        "model": "",
                                        "variant": "",
                                        "costOfTwoWheeler": 0,
                                        "requiredLoanTenure": "",
                                        "requiredLoanAmount": "",
                                        "eligibleLoanAmount": "",
                                        "timeFrameOfPurchase": "",
                                        "propertyValue": "",
                                        "propertyType": "",
                                        "leadSource": urlParams.source?urlParams.source:"",
                                        "leadSubSource": urlParams.subsource?urlParams.subsource:"",
                                        "leadStatus": ""
                                    },
                                    "occupationDetails": {
                                        "designation": "",
                                        "companyName": obj.selectedCompany,
                                        "monthOfJoining": "",
                                        "yearOfJoining": "",
                                        "officeEmail": "",
                                        "entityType": "",
                                        "yearsInBusiness": "",
                                        "itrIncome": "",
                                        "itrType": "",
                                        "numberOfYearsInBusiness": "",
                                        "turnoverInLastFY": "",
                                        "occupation": "",
                                        "monthlyIncome": 0,
                                        "annualIncome": 0,
                                        "monthlyEMI": 0
                                    },
                                    "residenceAddress": {
                                        "addressLine": "",
                                        "pinCode": obj.pinCode,
                                        "state": "",
                                        "city": obj.selectedCity,
                                        "accommodationType": ""
                                    },
                                    "officeAddress": {
                                        "addressLine": "",
                                        "pinCode": obj.pinCode,
                                        "state": "",
                                        "city": obj.selectedCity,
                                        "yearsInCurrentAddress": "",
                                        "yearsInCurrentCity": "",
                                        "monthsInCurrentAddress": "",
                                        "monthsInCurrentCity": ""
                                    },
                                    "referenceDetails": [
                                        {
                                            "name": "",
                                            "mobileNumber": "",
                                            "address": "",
                                            "pincode": obj.pinCode
                                        }
                                    ],
                                    "insuranceDetails": {
                                        "vehicleRegistrationNumber": "",
                                        "vehicleRegistrationDate": "",
                                        "yearOfManufacture":"",
                                        "travelTo": "",
                                        "purpose": "",
                                        "numberOfMembers":"",
                                        "familyMember": "",
                                        "dobOfFamilyMember": "",
                                        "tripType": "",
                                        "tripStartDate": "",
                                        "tripEndDate": "",
                                        "medicalConditions": "",
                                        "sumInsured": "",
                                        "tenor": "",
                                        "smoker": "",
                                        "amountToBeInvested": "",
                                        "typeOfSecurities": "",
                                        "totalPortFolioValue": "",
                                        "existingRelationShipWithSBI": "",
                                        "existingCreditCard": "",
                                        "campaignId": "",
                                        "campaignSource": "",
                                        "personalizedField":"",
                                        "custContent":"",
                                        "comments": "",
                                        "idType": "",
                                        "officeOwnership": "",
                                        "gstRegistered": "",
                                        "salaryCreditBy": "",
                                        "totalWorkExperience": "",
                                        "existingEmisPerMonth": "",
                                        "annualBusinessIncome": "",
                                        "existingLifeInsurance": "",
                                        "coverageAmount": "",
                                        "anyExistingAilment": "",
                                        "applianceInWarranty": "",
                                        "totalNoOfCards": "",
                                        "noOfAdult":"",
                                        "noOfChildren":"",
                                        "noOfMembers": "",
                                        "doesPetHaveExistingAilment": "",
                                        "natureOfBusiness": "",
                                        "planSelection": "",
                                        "petBreed": "",
                                        "nationality": "",
                                        "howManyAppliances": "",
                                        "workForce": "",
                                        "anySpecificRequirement": ""
                                    }
                                }
                            }
                        }
                        applyNowLeadGenerateFilterObj.applyNowLeadGenerate(reqObj).then(function (response) {
                    if(response.response.responseJson.header.status.toLowerCase() == "success"){
                        let leadIdGenerated = response.response?.responseJson?.body?.LeadId;
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $('.loan-against-form').addClass('d-none');
                        $('.jsSuccessOTPVarification').removeClass('d-none');
                        let successForm = document.querySelector('.jsSuccessOTPVarification');
                        successForm.querySelector('.application-id').innerHTML = '';
                        if(response.response.responseJson.body.Status.toLowerCase() === 'error'){
                            successForm.querySelector('.application-id').innerHTML = '<p class="heading20 application-id">An application ID has already been generated for the provided mobile number.</p>'
                        } else {
                        	successForm.querySelector('.application-id').innerHTML = '<p class="heading20 application-id">Your application ID is <span id="leadId">'+ leadIdGenerated +'</span></p>'
                        }

                    } else {
                        if (response.response.responseJson.errorBody.statusCode == "403") {
                            var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                            if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                /*14-1-2023*/
                                $('#loan-against-otp').addClass('d-none');
                                /*14-1-2023*/
                                $('.jsFailOTPVarification').removeClass('d-none');
                                $('.lead-forms .main-title').addClass('d-none')
                            } else {
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
                        } else {
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


            });
            $('#loan-against-property .jsSugamCampaignSubmit').click(function (e) {
                var obj = {};
                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                $('.clear-btn').addClass('d-none')
                
                obj.customerFullName = $('[data-form="customerName"]').val();
                obj.customerMobileNumber = $('[data-form="mobile"]').val();
                obj.customerAltMobileNumber = $('[data-form="altMobile"]').val();
                obj.financerName = $('[data-form="financer"]').find(":selected").val();
                obj.selectedCity = $('[data-form="city"]').find(":selected").val();
                obj.homeLoanOS = $('[data-form="homeLoanValue"]').val().replace(/,/g, '');
                obj.propertyAddr = $('[data-from="property-address"]').val() 
                var reqObj = 
                    {
                        "Master": [
                            {
                                "customer-name": obj.customerFullName,
                                "mobile-number": obj.customerMobileNumber,
                                "alternate-contact-number": obj.customerAltMobileNumber,
                                "complete-property-address": obj.propertyAddr,
                                "current-home-loan-financer-name": obj.financerName,
                                "current-home-loan-outstanding": obj.homeLoanOS,
                                "city": obj.selectedCity
                            }
                        ]
                    };
                applyNowLeadGenerateFilterObj.sugamCampaign(reqObj).then(function (response) {
                    if (response.status.toLowerCase() == "success") {

                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $('.loan-against-form').addClass('d-none');
                        $('.jsSuccessSugam').removeClass('d-none');
                    }else {
                        if (response.response.responseJson.errorBody.statusCode == "403") {
                            var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                            if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                /*14-1-2023*/
                                $('#loan-against-otp').addClass('d-none');
                                /*14-1-2023*/
                                $('.jsFailOTPVarification').removeClass('d-none');
                                $('.lead-forms .main-title').addClass('d-none')
                            } else {
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
                        } else {
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
            })
            $('#loan-against-property .jsFiservBusinessBtn').click(function (e) {
                var obj = {};
                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                $('.clear-btn').addClass('d-none')
                
                obj.customerFullName = $('[data-form="customerName"]').val();
                obj.customerMobileNumber = $('[data-form="mobile"]').val();
                obj.selectedCity = $('[data-form="city"]').find(":selected").val();
                obj.email = $('[data-form="personalEmail"]').val();
                obj.requiredLoanAmount = $('[data-form="requiredLoanAmount"]').val().replace(/,/g, '');
                obj.merchantId = $('[data-form="merchantID"]').val()
                obj.panDetails = $('[data-from="panNumber"]').val()
                var reqObj = {
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="
                    },
                    "body": {
                        "customerName": obj.customerFullName,
                        "mobileNumber": obj.customerMobileNumber,
                        "email": obj.email,
                        "productCode": "BL",
                        "loanAmount": obj.requiredLoanAmount,
                        "city":  obj.selectedCity,
                        "subSource": "",
                        "partnerRefNo": obj.merchantId,
                        "company": "",
                        "pan":  obj.panDetails
                    },
                    "headerJson": {}
                }
                applyNowLeadGenerateFilterObj.aggregatorLeadGeneration(reqObj).then(function (response) {
                    console.log(response.status.toLowerCase());
                    if (response.status.toLowerCase() == "success") {
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $('.loan-against-form').addClass('d-none');
                        $('.jsSuccessFiserv').removeClass('d-none');
                        $('.jsSuccessFiserv #leadId2').html(response.response.responseJson.body.LeadId);
                    }else {
                        if (response.response.responseJson.errorBody.statusCode == "403") {
                            var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                            if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                /*14-1-2023*/
                                $('#loan-against-otp').addClass('d-none');
                                /*14-1-2023*/
                                $('.jsFailOTPVarification').removeClass('d-none');
                                $('.lead-forms .main-title').addClass('d-none')
                            } else {
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
                        } else {
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
            })
            $('#loan-against-property .jsForeClosureReferBtn').click(function (e) {
                    var obj = {};
                    $('.loader').removeClass('hide-loader');
                    $('body').addClass('bg-loader');
                    $('.clear-btn').addClass('d-none')
                    obj.customerEmail = $('[data-form="personalEmail"]').val();
                    obj.customerFullName = $('[data-form="customerName"]').val();
                    obj.customerMobileNumber = $('[data-form="mobile"]').val();
                    obj.customerAltMobileNumber = $('[data-form="altMobile"]').val();
                    obj.productCode = $('[data-form="forclosureProductName"]').find(":selected").val();
                    obj.city = $('[data-form="city"]').find(":selected").val();
                    var reqObj = {
                        "header": {
                            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="
                        },
                        "body": {
                            "plEmployeeForm": {
                                "customer": {
                                    "customerName": obj.customerFullName,
                                    "mobile": obj.customerMobileNumber,
                                    "personalEmail": obj.customerEmail,
                                    "alternateMobile": obj.customerAltMobileNumber,
                                    "birthDate": "",
                                    "aadhaarNumber": "",
                                    "panNumber": "",
                                    "maritalStatus": "",
                                    "gender": "",
                                    "mothersMaidenName": "",
                                    "assetClassInvestedIn": "",
                                    "serviceInterestedIn": "",
                                    "anyOtherRequirements": "",
                                    "webTopId": "",
                                    "productCode": obj.productCode,
                                    "businessExistence": "",
                                    "uniqueIdentifier": "",
                                    "residenceAndEmploymentStability": "",
                                    "nameOfThePolicyHolder": "",
                                    "corporateName": "",
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
                                "loanDetails": {
                                    "wealthProductName": "",
                                    "product": "",
                                    "make": "",
                                    "model": "",
                                    "variant": "",
                                    "costOfTwoWheeler": 0,
                                    "requiredLoanTenure": "",
                                    "requiredLoanAmount": "",
                                    "eligibleLoanAmount": "",
                                    "timeFrameOfPurchase": "",
                                    "propertyValue": "",
                                    "propertyType": "",
                                    "leadSource": "",
                                    "leadSubSource": "",
                                    "leadStatus": ""
                                },
                                "occupationDetails": {
                                    "designation": "",
                                    "companyName": selectedCompany,
                                    "monthOfJoining": "",
                                    "yearOfJoining": "",
                                    "officeEmail": "",
                                    "entityType": "",
                                    "yearsInBusiness": "",
                                    "itrIncome": "",
                                    "itrType": "",
                                    "numberOfYearsInBusiness": "",
                                    "turnoverInLastFY": "",
                                    "occupation": "",
                                    "monthlyIncome": 0,
                                    "annualIncome": 0,
                                    "monthlyEMI": 0
                                },
                                "residenceAddress": {
                                    "addressLine": "",
                                    "pinCode": "",
                                    "state": "",
                                    "city": obj.city,
                                    "accommodationType": ""
                                },
                                "officeAddress": {
                                    "addressLine": "",
                                    "pinCode": "",
                                    "state": "",
                                    "city": "",
                                    "yearsInCurrentAddress": "",
                                    "yearsInCurrentCity": "",
                                    "monthsInCurrentAddress": "",
                                    "monthsInCurrentCity": ""
                                },
                                "referenceDetails": [
                                    {
                                        "name": "",
                                        "mobileNumber": "",
                                        "address": "",
                                        "pincode": ""
                                    }
                                ],
                                "insuranceDetails": {
                                    "vehicleRegistrationNumber": "",
                                    "vehicleRegistrationDate": "",
                                    "yearOfManufacture":"",
                                    "travelTo": "",
                                    "purpose": "",
                                    "numberOfMembers":"",
                                    "familyMember": "",
                                    "dobOfFamilyMember": "",
                                    "tripType": "",
                                    "tripStartDate": "",
                                    "tripEndDate": "",
                                    "medicalConditions": "",
                                    "sumInsured": "",
                                    "tenor": "",
                                    "smoker": "",
                                    "amountToBeInvested": "",
                                    "typeOfSecurities": "",
                                    "totalPortFolioValue": "",
                                    "existingRelationShipWithSBI": "",
                                    "existingCreditCard": "",
                                    "campaignId": "",
                                    "campaignSource": "",
                                    "personalizedField":"",
                                    "custContent":"",
                                    "comments": "",
                                    "idType": "",
                                    "officeOwnership": "",
                                    "gstRegistered": "",
                                    "salaryCreditBy": "",
                                    "totalWorkExperience": "",
                                    "existingEmisPerMonth": "",
                                    "annualBusinessIncome": "",
                                    "existingLifeInsurance": "",
                                    "coverageAmount": "",
                                    "anyExistingAilment": "",
                                    "applianceInWarranty": "",
                                    "totalNoOfCards": "",
                                    "noOfAdult":"",
                                    "noOfChildren":"",
                                    "noOfMembers": "",
                                    "doesPetHaveExistingAilment": "",
                                    "natureOfBusiness": "",
                                    "planSelection": "",
                                    "petBreed": "",
                                    "nationality": "",
                                    "howManyAppliances": "",
                                    "workForce": "",
                                    "anySpecificRequirement": ""
                                }
                            }
                        }
                    }
                    applyNowLeadGenerateFilterObj.applyNowLeadGenerate(reqObj).then(function (response) {
                        if(response.response.responseJson.header.status.toLowerCase() == "success"){
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            $('.loan-against-form').addClass('d-none');
                            $('.jsSuccessForeClosure').removeClass('d-none');
                            $('.jsSuccessForeClosure #leadId').html(response.response.responseJson.body.LeadId);
                        } else {
                            if (response.response.responseJson.errorBody.statusCode == "403") {
                                var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                                if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {
                                    $('.loader').addClass('hide-loader');
                                    $('body').removeClass('bg-loader');
                                    /*14-1-2023*/
                                    $('#loan-against-otp').addClass('d-none');
                                    /*14-1-2023*/
                                    $('.jsFailOTPVarification').removeClass('d-none');
                                    $('.lead-forms .main-title').addClass('d-none')
                                } else {
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
                            } else {
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
                })
            $('.jsClearLoanDeatils').click(function () {
                clearCompleteForm();
                clearMultiSelect();
                clearRadioInput();
            })
            $('.jsCloseLaonAgainstMgs').click(function () {
                $('.lead-forms .main-title').removeClass('d-none');
                $('.jsMsgLoanAgainst').addClass('d-none');
                // $("#loan-against-otp .input-textbox[data-type=otp-send-number]").val('');
                $('.loan-againstclose-btn').addClass('d-none');
                $('.clear-btn').removeClass('d-none');
                $('.loan-against-form').removeClass('d-none');
                $('.loan-against-otp-wrap').addClass('d-none');
                $('.form-bottom-right-img').removeClass('d-none');
                clearCompleteForm();
                clearRadioInput();
                clearMultiSelect();
            });

            $('.price-with-comma-form').on('keyup', function () {
                if ($(this).val() != "") {
                    var rupeeValue = parseFloat($(this).val().replace(/,/g, ''));
                    commaSeparatedValue = rupeeValue.toLocaleString('en-IN');
                    $(this).val(commaSeparatedValue);
                }
            });

            //Select 2 on change remove error state
            $('.js-select2').change(function () {
                $(this).parents('.form-textbox-new').removeClass('textboxerror');
                // $(this).find('.text-infos').removeClass('d-none');
                $(this).next('.error-msgs').remove();
                $(this).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                $(this).removeClass('jsValueOK')
                if ($('#loan-against-property .jsValueOK').length == 0) {
                    $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
                    $('.jsSugamCampaignSubmit').removeClass('btn-disabled');
                    $('.jsForeClosureReferBtn').removeClass('btn-disabled');
                    $('.jsFiservBusinessBtn').removeClass('btn-disabled');


                } else {
                    $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                    $('.jsSugamCampaignSubmit').addClass('btn-disabled');
                    $('.jsForeClosureReferBtn').addClass('btn-disabled');
                    $('.jsFiservBusinessBtn').addClass('btn-disabled');


                }
            })

            //Focus open select 2 dropdown
            $(document).on('focus', '.select2.select2-container', function (e) {
                if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
                    $(this).siblings('select').select2('open');
                }
            });

        })
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
        function clearCompleteForm() {
            $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
            $('.jsSugamCampaignSubmit').addClass('btn-disabled');
            $('.jsForeClosureReferBtn').addClass('btn-disabled');
            $('.jsFiservBusinessBtn').addClass('btn-disabled');
            if(document.querySelector('[data-type="company"]') && document.querySelector('[data-type="company"]').parentElement.classList.contains('d-none')){
                document.querySelector('[data-type="company"]').parentElement.classList.remove('d-none')
                document.querySelector('[data-type="other"]').classList.add('d-none')
            }
            $('#loan-against-property .input-textbox[data-type]').addClass('jsValueOK')
            $('#loan-against-property .input-textbox[data-type]').val('');
            $('#loan-against-property .form-textbox-new').removeClass('active onchange');
            $('#loan-against-property .form-textbox-new .textbox-inner').removeClass('has-rupee-icon');
            $('#loan-against-property .form-textbox-new .text-infos').removeClass('hide-input-note');
            $('#loan-against-property .form-textbox-new .icon-rupee').addClass('d-none');
            // $('.js-select2').val('');
            $('.js-select2').each(function () {
                $('.js-select2').parents('.form-textbox-new').removeClass('textboxerror');
                $('.js-select2').parents('.form-textbox-new').addClass('active');
                $('.js-select2').next('.error-msgs').remove();
                $('.js-select2').val(null).trigger('change');
                $('.js-select2').addClass('jsValueOK');
            });
			  if(document.querySelector('[data-type="city"]').classList.contains('jsValueOK')){
                document.querySelector('[data-type="city"]').classList.remove('jsValueOK')
                document.querySelector('[data-type="other"]').classList.remove('jsValueOK')
            }
            $('#loan-against-property .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
            $('#loan-against-property .input-textbox[data-type]').next().text('');
        }


        return jsHelper.freezeObj(applyNowLeadGenerateBizObj);
    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, "applyNowLeadGenerateBizObj", applyNowLeadGenerateBizCallFn);
})(this || window || {});
