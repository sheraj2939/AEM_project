(function (_global) {
    var applyNowLeadGenerateBizCallFn = (function (jsHelper) {
        var applyNowLeadGenerateBizObj = {};
        var allEduPincode = {}
        var offersDetails = {}
        var creditCardEliteObj = {}
        $(document).ready(function () {
            var urlParams;
            var formPara = getURLParams(location.href);
            if (formPara && Object.keys(formPara).length > 0) {
                var association = formPara['association'] && formPara['association'].toLowerCase() == "true";
                var subsourceTWL = formPara['subsource'] && formPara['subsource'].toLowerCase() == "phonepetwl" && productCodeId == "TWL";
                var subsourceLAP = formPara['subsource'] && formPara['subsource'].toLowerCase() == "phonepelap" && productCodeId == "LAP";
                var subsourceEDU = formPara['subsource'] && formPara['subsource'].toLowerCase() == "phonepeel" && productCodeId == "EDU";

                if (association || subsourceTWL || subsourceLAP || subsourceEDU) {
                    $('.formBackBtn').parents('.comp-back-to').addClass('d-none');
                    $('.formBackBtn').parents('.tops-heads').removeClass('has-only-back-btn');
                    $('.np-box').addClass('d-none');
                    $('.header .header-container').addClass('d-none');
                } else {
                    $('.formBackBtn').parents('.comp-back-to').removeClass('d-none');
                    $('.formBackBtn').parents('.tops-heads').addClass('has-only-back-btn');
                    $('.np-box').removeClass('d-none');
                    $('.header .header-container').removeClass('d-none');
                }
            }
            try {
                var backBtn = document.querySelector('.formBackBtn');
                backBtn.addEventListener('click', function (e) {
                    window.history.back();
                    try {
                        var ctaText = e.currentTarget.innerText.trim();
                        var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('h1').innerText.trim();
                        var componentName = window.location.href.split('/').pop().split('.').shift() ;
                        if(componentName == "apply-now-new-car-loan"){
                            componentName= 'new car loan';
                        }
                        ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
                    } catch (error) {
                        console.log('selector not found', error);
                    }
                });
        
            } catch (e) { console.log(e) }
            $('.lead-forms .main-title').removeClass('d-none');
            // Select 2 js //
            $(".js-select2").select2({
                placeholder: "Select",
            });
            $(".js-select2-search-hide").select2({
                minimumResultsForSearch: Infinity,
            });
            if(productCodeId == 'bt'){
                $("body").addClass("bg-loader");
                $(".loader").removeClass("hide-loader");
                if(location.href.split("?")[1] && !location.href.split("?")[1].includes("wcmmode=") && !location.href.split("?")[1].includes("subsource=")){
                    var urlParamsPopulateDecode = location.href.split("?")[0]+"?"+atob(location.href.split("?")[1]);
                var urlParamsPopulate = getURLParams(urlParamsPopulateDecode);
                var reqObj = {
                    "header": {
                        "authToken": "fdf"
                    },
                    "body": {
                        "mobileNumber": urlParamsPopulate.mobileNo
                    }
                }
                applyNowLeadGenerateFilterObj.getOffers(reqObj).then(function (response) {
                    if(response.response.responseJson.header.status.toLowerCase()== "success"){
                        offersDetails = response.response.responseJson.body.records;
                        $("body").removeClass("bg-loader");
                        $(".loader").addClass("hide-loader");
                      if(response.response.responseJson.body.records[0].Account__r.Name){
                        $('[data-type="name"]').val(response.response.responseJson.body.records[0].Account__r.Name);
                        $('[data-type="name"]').parent().parent().addClass('active');
                        $('[data-type="name"]').removeClass('jsValueOK')
                      }
                      if(response.response.responseJson.body.records[0].Account__r.PersonMobilePhone){
                        $('[data-type="mobile"]').val(response.response.responseJson.body.records[0].Account__r.PersonMobilePhone);
                        $('[data-type="mobile"]').parent().parent().addClass('active');
                        $('[data-type="mobile"]').removeClass('jsValueOK')
                      }
                      if(response.response.responseJson.body.records[0].Account__r.PAN_Number__c){
                        $('[data-type="pan"]').val(response.response.responseJson.body.records[0].Account__r.PAN_Number__c);
                        $('[data-type="pan"]').parent().parent().addClass('active');
                        $('[data-type="pan"]').removeClass('jsValueOK')
                      }
                      if(response.response.responseJson.body.records[0].Account__r.PersonEmail){
                        $('[data-type="email"]').val(response.response.responseJson.body.records[0].Account__r.PersonEmail);
                        $('[data-type="email"]').parent().parent().addClass('active');
                        $('[data-type="email"]').removeClass('jsValueOK')
                      }
                      if(response.response.responseJson.body.records[0].City__c){
                        $('[data-type="city"]').val(response.response.responseJson.body.records[0].City__c);
                        $('[data-type="city"]').parent().parent().addClass('active');
                        /*$('[data-type="city"]').html('')*/
                        $('[data-type="city"]').append('<option value=' + response.response.responseJson.body.records[0].City__c + '>' + response.response.responseJson.body.records[0].City__c + '</option>');
                        $('[data-type="city"]').val(response.response.responseJson.body.records[0].City__c).trigger('change');
                        $('[data-type="city"]').removeClass('jsValueOK')
                      }
                    }
                })
                }
            }

           /* if(productCodeId == "UCL"){
                $('[data-type="productType"]').removeClass('jsValueOK');
                if($('[data-loanOnCar]').val() == "false"){
                    $('[data-type="productType"]').html("");
                    $('[data-type="productType"]').append('<option value="Used car Loan">Used car Loan</option><option value="Loan on Car">Loan on Car</option>');
                }else{
                    $('[data-type="productType"]').html("");
                    $('[data-type="productType"]').append('<option value="Loan on Car">Loan on Car</option><option value="Used car Loan">Used car Loan</option>');
                }
            }*/
            /*$('.only-alpha-input').keyup(function(e) {
                if (String.fromCharCode(e.keyCode).match(/[^a-zA-Z ]/g)) {
                    return false;
                }
            });*/
            $('.only-alpha-input').on("keypress keyup", function (e) {
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
            $('#thankyou-modal-mutualFunds [data-dismiss="popover-modal"]').on('click', function () {
                try {
                    $('[data-type="security-type"]').val(null).trigger('change');
                }
                catch (e) { console.log(e) }
            })
            $('#thankyou-modal-shares [data-dismiss="popover-modal"]').on('click', function () {
                try {
                    $('[data-type="security-type"]').val(null).trigger('change');
                }
                catch (e) { console.log(e) }
            })

            $('.las-investment').click(function (e) {
                $('[data-type="security-type"]').val(null).trigger('change');
                $('#thankyou-modal-shares').removeClass('popover-show');
                $('#thankyou-modal-shares').css({ display: 'none' });
                $('#thankyou-modal-mutualFunds').removeClass('popover-show');
                $('#thankyou-modal-mutualFunds').css({ display: 'none' });
                $('.modal-backdrop').remove();
            });

            $("[data-type='security-type']").on('select2:select', function (e) {
                if ($(this).val().toLowerCase() == "shares") {
                    $('#thankyou-modal-shares').addClass('popover-show');
                    $('#thankyou-modal-shares').css({ display: 'block' });
                    $('body').append('<div class="modal-backdrop"></div>');
                }
                if ($(this).val().toLowerCase() == "mutualfunds") {
                    $('#thankyou-modal-mutualFunds').addClass('popover-show');
                    $('#thankyou-modal-mutualFunds').css({ display: 'block' });
                    $('body').append('<div class="modal-backdrop"></div>');
                }

            })

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
                $('.jsMultiDropdown [data-type="multiple-dropVal"]').keyup();
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
            $('[data-type="elite"]').on('select2:select', function (e) {
                // console.log($(this).val())
                if ($(this).val().toLowerCase() === 'yes') {
                    $(this).parent().closest('.row-col-33').next('.eliteClass').removeClass('d-none');
                    creditCardEliteObj.partofEliteprogram = 'Yes'
                    //$('#loan-against-property .input-textbox[data-type="top-up-loan-amount"]').siblings('.icon-rupee').addClass('d-none');
                } else {
                    $(this).parent().closest('.row-col-33').next('.eliteClass').addClass('d-none');
                    creditCardEliteObj.partofEliteprogram = 'No'
                }
                feildsCount = $('#loan-against-property .jsValueOK:visible').length;
                if (feildsCount === 0) {
                    $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
                } else {
                    $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                }
            });
            /*1
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

            ///Multiple select dropdown whole logic    
            if (productCodeId == 'TR102') {
                $("body").addClass("bg-loader");
                $(".loader").removeClass("hide-loader");
                var reqObj = {}
                applyNowLeadGenerateFilterObj.countryMaster(reqObj).then(function (response) {
                    if (response.status == "SUCCESS") {
                        $("body").removeClass("bg-loader");
                        $(".loader").addClass("hide-loader");
                        JSON.parse(response.response).Master.forEach(function (value) {
                            $('[data-type="travel"]').append('<option value="' + value["country-name"] + '">' + value["country-name"] + '</option>');
                        })
                    }
                })
            }
            // Clear Loan aganist form
            $('.jsClearLoanDeatils').click(function () {
                clearCompleteForm();
                clearMultiSelect();
                clearRadioInput();
            })
            var mobilNumber;
            var otpRefNo;
            var getWhatsappNub;
            var feildsCount = $('#loan-against-property .jsValueOK').length;
            // console.log(feildsCount);
            var currentYear = new Date().getFullYear();
            var urlData = {};
            var obj = {};
            /*FOR PRODUCTS LEVEL QRC*/
            if (location.search.split("?")[1]) {
                location.search.split("?")[1].split("&").forEach(function (el) {
                    urlData[el.split("=")[0]] = el.split("=")[1];
                });
            }
            var subsource = urlData.subsource;
            var reqObj = {};
            if ($(".productInsurer").length) {
                var productInsurer = {
                    "MO101": ["Tata AIG"],
                    /*"TR102": ["Tata AIG", "Bajaj Allianz"],*/
                    "TR102": ["Tata AIG"],
                    "HE103": ["Tata AIG", "Star Health"],
                    /*"HO104": ["Bajaj Allianz", "Tata AIG"],*/
                    /*"PR105": ["Tata AIA","HDFC Life","Bajaj Allianz","Tata AIG"],*/
                    /*"HO104": ["Bajaj Allianz"],*/
                    "HO104": ["Tata AIG"],
                    "PR105": ["Tata AIA"],
                    /*"SIUL106": ["Tata AIA","HDFC Life"],*/
                    "SIUL106": ["HDFC Life"],
                    /*"SITR107": ["Tata AIA","HDFC Life"],*/
                    "SITR107": ["Tata AIA", "HDFC Life"],
                    "HELI108": ["Tata AIA"],
                    /*"WS101": ["Vhealth", "Bajaj Allianz", "Tata AIG"],*/
                    "WS101": ["Vhealth", "Tata AIG"],
                    "HA101": ["GadgetServ"],
                    /*"HC101": ["Bajaj Allianz", "Tata AIG"],*/
                    "HC101": ["Tata AIG"],
                    "WP101": ["Wallet Assist"],
                    /*"AA101": ["Bajaj Allianz", "Tata AIG"],*/
                    "AA101": ["Tata AIG"],
                    "CS101": ["CPP Group India"],
                    "PE101": ["Bajaj Allianz"],
                    "RS101": ["Tata AIA", "HDFC Life", "Star Health"],
                    "HE104": ["HDFC Life"],
                    "HE105": ["HDFC Life", "Star Health"],
                    /*"CP101": ["HDFC Life","Tata AIA"],*/
                    "CP101": ["HDFC Life"],
                    "CIS101": ["Bajaj Allianz"],
                    "TW101": ["Tata AIG"]
                }

                var productCode = productCodeId;
                for (var index = 0; index < productInsurer[productCode].length; index++) {
                    $(".productInsurer").append("<option value=\"" + productInsurer[productCode][index] + "\">" + productInsurer[productCode][index] + "</option>")
                }
            }

            if ($('[data-type="vehicle-manufacturer"]').length > 0) {
                $("body").addClass("bg-loader");
                $(".loader").removeClass("hide-loader");
                var vehicleType = productCodeId;
                if (vehicleType == 'TWL' || vehicleType == 'TW101') {
                    applyNowLeadGenerateFilterObj.twoWheelerVariantMaster(reqObj).then(function (response) {
                        if (response.status == "SUCCESS") {
                            $("body").removeClass("bg-loader");
                            $(".loader").addClass("hide-loader");
                            var mdmVehicleVariants;
                            var vehiclesMaster = {};
                            mdmVehicleVariants = (typeof response.response === "object") ? (response.response) : JSON.parse(response.response);
                            var manufacturer = [];
                            mdmVehicleVariants.Master.map(function (e) {
                                if (manufacturer.every(function (manEl) {
                                    return manEl != e["manufacturer-make"];
                                })) {
                                    manufacturer.push(e["manufacturer-make"]);
                                }
                            });

                            manufacturer.forEach(function (val) {
                                vehiclesMaster[val] = {};
                                var vehicleModel = [];
                                mdmVehicleVariants.Master.filter(function (e) {
                                    return e["manufacturer-make"] == val;

                                }).map(function (e) {
                                    if (vehicleModel.every(function (vehEl) { return vehEl != e["asset-model"] }))
                                        vehicleModel.push(e["asset-model"]);
                                });
                                vehicleModel.forEach(function (vehEl) {
                                    vehiclesMaster[val][vehEl] = {};
                                    var Variants = [];
                                    mdmVehicleVariants.Master.filter(function (e) {
                                        return e["manufacturer-make"] == val;

                                    }).filter(function (manEl) { return manEl["asset-model"] == vehEl }).map(function (mapEl) {
                                        if (Variants.every(function (varEl) { return varEl != mapEl["asset-variant"] }))
                                            Variants.push(mapEl["asset-variant"]);
                                    });
                                    vehiclesMaster[val][vehEl]["VARIANTS"] = Variants;
                                });
                            });
                            populateVehicles(vehiclesMaster);
                        }
                    })
                }
                else if (vehicleType == 'UCL' || vehicleType == "MO101" || vehicleType == 'LOC'|| vehicleType == 'ALN' ) {
                    applyNowLeadGenerateFilterObj.vehicleVariantMasterNew(reqObj).then(function (response) {
                        if (response.status == "SUCCESS") {
                            $("body").removeClass("bg-loader");
                            $(".loader").addClass("hide-loader");
                            var mdmVehicleVariants;
                            var vehiclesMaster = {};
                            mdmVehicleVariants = (typeof response.response === "object") ? (response.response) : JSON.parse(response.response);
                            var manufacturer = [];
                            mdmVehicleVariants.Master.map(function (e) {
                                if (manufacturer.every(function (manEl) {
                                    return manEl != e.manufacturer;
                                })) {
                                    manufacturer.push(e.manufacturer);
                                }
                            });

                            manufacturer.forEach(function (val) {
                                vehiclesMaster[val] = {};
                                var vehicleModel = [];
                                mdmVehicleVariants.Master.filter(function (e) {
                                    return e.manufacturer == val;

                                }).map(function (e) {
                                    if (vehicleModel.every(function (vehEl) { return vehEl != e.vehiclemodel }))
                                        vehicleModel.push(e.vehiclemodel);
                                });
                                vehicleModel.forEach(function (vehEl) {
                                    vehiclesMaster[val][vehEl] = {};
                                    var Variants = [];
                                    mdmVehicleVariants.Master.filter(function (e) {
                                        return e.manufacturer == val;

                                    }).filter(function (manEl) { return manEl.vehiclemodel == vehEl }).map(function (mapEl) {
                                        if (Variants.every(function (varEl) { return varEl != mapEl["txt-variant"] }))
                                            Variants.push(mapEl["txt-variant"]);
                                    });
                                    vehiclesMaster[val][vehEl]["VARIANTS"] = Variants;
                                })
                            })

                            populateVehicles(vehiclesMaster);
                        }
                    }).catch(function (error) {
                        console.error(error);
                    });
                }
            }

            if ($(".city").length > 0) {
                $("body").addClass("bg-loader");
                $(".loader").removeClass("hide-loader");
            if (productCodeId == "SBICARDS") {
                    applyNowLeadGenerateFilterObj.pinCodeMaster(reqObj).then(function (response) {
                        if (response.status == "SUCCESS") {
                            obj = JSON.parse(response.response)
                            $("body").removeClass("bg-loader");
                            $(".loader").addClass("hide-loader");
                            if ($(".city").length) {
                                cityPopulateArr = [];
                                $(".city").html();
                                $(".city").append("<option value=''></option>");
                                for (var item in obj.Master) {
                                    if (item < obj.Master.length) {
                                        if (cityPopulateArr.indexOf(obj.Master[item].city) <= -1) {
                                            cityPopulateArr.push(obj.Master[item].city);
                                        }
                                    }
                                }
                                //console.log(cityPopulateArr);

                                cityPopulateArr.forEach(function (element) {
                                    $(".city").append('<option value="' + element + '">' + element + '</option>');
                                });
                            }
                        }

                    }).catch(function (error) {
                        console.error(error);
                    });


            }else{
                applyNowLeadGenerateFilterObj.cityProductMaster(reqObj).then(function (response) {
                    if (response.status == "SUCCESS") {
                        $("body").removeClass("bg-loader");
                        $(".loader").addClass("hide-loader");
                        var objCity = JSON.parse(response.response);
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
                        $(".city").html();
                        $(".city").append("<option value=''></option>");
                        if (productCode == "LAP" || productCode == "LAPOD" || productCode == 'bt') {
                            productCode = "HE";
                        }
                        if ((productCode == 'TW101') || (productCode == 'MO101') || (productCode == 'PR105') || (productCode == 'SITR107') || (productCode == 'HE103') || (productCode == 'HE104') || (productCode == 'HE105') || (productCode == 'WS101') || (productCode == 'WP101') || (productCode == 'HA101') || (productCode == 'HA101') || (productCode == 'HC101') || (productCode == 'CS101') || (productCode == 'PE101') || (productCode == 'RS101') || (productCode == 'CP101') || (productCode == 'TR102') || (productCode == 'TR102') || (productCode == 'TR102') || (productCode == 'CIS101') || (productCode == "HO104")) {
                            productCode = "INSURANCE";
                        }
                        if (productCode == "LOC"  || productCode=="SBICARDS") {
                            productCode = "UCL"
                        }
                        if (response[productCode] !== undefined && response[productCode].cities.length > 0) {
                            response[productCode].cities.forEach(function (element) {
                                $(".city").append('<option value="' + element + '">' + element + '</option>');
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

            function populateVehicles(vehiclesMaster) {

                jsonVehicleVariants = vehiclesMaster;
                Object.keys(jsonVehicleVariants).forEach(function (data) {
                    $("#quick-apply-select-manufacturer").append('<option value="' + data + '">' + data + '</option>');
                });

                $('#quick-apply-select-manufacturer').on('select2:select', function () {
                    $('#quick-apply-select-model').html('');
                    $('#quick-apply-select-model').append('<option value></option>');
                    $('#quick-apply-select-vehicle-variant').html('');
                    $('#quick-apply-select-vehicle-variant').append('<option value></option>');
                    Object.keys(jsonVehicleVariants[$('#quick-apply-select-manufacturer').val()]).forEach(function (data) {
                        $("#quick-apply-select-model").append('<option value="' + data + '">' + data + '</option>');
                    });
                })

                $('#quick-apply-select-model').on('select2:select', function () {

                    $('#quick-apply-select-vehicle-variant').html('');
                    $('#quick-apply-select-vehicle-variant').append('<option value></option>');
                    jsonVehicleVariants[$('#quick-apply-select-manufacturer').val()][$('#quick-apply-select-model').val()]["VARIANTS"].forEach(function (data) {
                        $("#quick-apply-select-vehicle-variant").append('<option value="' + data + '">' + data + '</option>');
                    });
                });
            }

                    /*14-4-2023*/
    var feildsCount = $('#loan-against-property .jsValueOK:visible').length;
    /*14-4-2023*/
            var emailFlag = false;
            var validEmail = {};
            var emailArr;
            var dummyDomains = [];
            
            //Loan aganist form key up
            $('#loan-against-property .input-textbox[data-type]').on('keydown keyup', function () {
                if(sessionStorage.getItem("email") ){
                    //dummyDomains = sessionStorage.getItem("email");
                    emailArr = sessionStorage.getItem("emailArr");
                    emailArr = JSON.parse(emailArr);
                  }
                var element = $(this);
                var ele_value = element.val();
                var ele_required = 'Field is required';
                var ele_email = "Please enter valid email";
                var ele_name = "Please enter full name";
                var ele_phoneNumber = "Please enter valid number";
                var ele_Date = "Invalid Date";
                var ele_pannumber = "Please enter valid PAN number";
                var ele_pannumber = "Please enter valid PAN number";
                var ele_propValue = "Please enter a value greater than 7,50,000";
                var ele_propRequiredValue = "Please select an amount less than 5 lacs";
                var ele_propRequiredValueLap = "Please enter a value between 1 Lakh & 20 Cr";
                var ele_manufacturerYear = "Please enter a year between 2006 and " + currentYear;
                var ele_required_loan = "Please select an amount less than 3 lacs";
                var ele_coverage_amount_term_insurance = "Please enter a value between 5 Lakhs & 20 cr";
                var ele_coverage_amount_savings_investments = "Please enter a value between 1 Lakh & 5 cr";
                var ele_coverage_amount_medical_insurance = "Please enter a value between 1 Lakh & 25 lakhs";
                var ele_coverage_amount_cardiac_care_insurance = "Please enter a value between 2 Lakhs & 50 Lakhs";
                var ele_coverage_amount_cancer_care_insurance = "Please enter a value between 10 Lakhs & 40 Lakhs"
                var ele_firstname = "Please enter valid first name";
                var ele_lastname = "Please enter valid last name";
                var ele_pinCode = "Please enter valid PIN code";
                var ele_edu_required_loan_unsecured = "Please enter a value between 1 lakh & 75 Lakhs";
                var ele_edu_required_loan_secured = "Please enter a value between 1 lakh & 2 Crores";

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
                    if ($(element).data('type') === 'anyExistingAilment') {
                        var regName = /[A-Za-z]+$/;
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
                    if ($(element).data('type') === 'current-bank') {
                        $(element).addClass('jsValueOK')
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).removeClass('jsValueOK')
                            // $(element).next('.error-msgs').text(ele_propValue);
                        }
                    }
                    if ($(element).data('type') === 'current-roi') {
                        $(element).addClass('jsValueOK')
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).removeClass('jsValueOK')
                            // $(element).next('.error-msgs').text(ele_propValue);
                        }
                    }
                    if ($(element).data('type') === 'otherInstitution') {
                        $(element).addClass('jsValueOK')
                        if (ele_value.trim() === '') {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            $(element).addClass('jsValueOK')
                            // $(element).next('.error-msgs').text(ele_propValue);
                        }else{
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).removeClass('jsValueOK');
                            $(element).next().text('');
                        }
                    }
                    if ($(element).data('type') === 'balance-transfer-amount') {
                        $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                        $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                        $(element).addClass('jsValueOK')
                        var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                        if (ele_value != '' && !(rupeeValue > 0)) {
                            // $(element).parents('.form-textbox-new').addClass('textboxerror');
                            // $(element).next('.error-msgs').text(ele_propValue);
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
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'dob') {
                        if (!checkDate(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_Date);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'tripStartDate') {
                        if (!checkTripStartDate(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_Date);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'tripEndDate') {
                        if (!checkTripEndDate(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_Date);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'loan-number') {
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK');
                        } else {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            $(element).addClass('jsValueOK');
                        }
                    }
                    if ($(element).data('type') === 'pan') {
                        var regPan = /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g;
                        $(this).val($(this).val().toUpperCase());
                        if (ele_value != '' && !ele_value.match(regPan)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_pannumber);
                            $(element).addClass('jsValueOK')
                        } else {
                            var status = panCardValidation(ele_value.toUpperCase());
                            if (status == false) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text(ele_pannumber);
                                $(element).addClass('jsValueOK')
                                //errors.push(ele_pannumber)
                            } else {
                                $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                $(element).next().text('');
                                $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                $(element).removeClass('jsValueOK')
                            }
                        }
                    }
                    if ($(element).data('type') === 'property-value') {
                        $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                        $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                        var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                        if (ele_value != '' && !(rupeeValue > 750000)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_propValue);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'vehicleRegistrationDate') {
                        if (!checkVehicleDate(ele_value)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_Date);
                            $(element).addClass('jsValueOK')
                        }
                        else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'portfolio-value') {
                        $(element).removeClass('jsValueOK')
                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    }
                    
                    if ($(element).data('type') === 'sumInsured') {
                        $(element).removeClass('jsValueOK')
                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    }
                    if ($(element).data('type') === 'tenure') {
                        $(element).removeClass('jsValueOK')
                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    }
                    if ($(element).data('type') === 'multiple-dropVal') {
                        $(element).removeClass('jsValueOK')
                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                    }
                    if ($(element).data('type') === 'requireLoanAmount') {
                        $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                        $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                        var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                        if (productCodeId == "TWL") {
                            if (ele_value != '' && !(rupeeValue <= 500000)) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text(ele_propRequiredValue);
                                $(element).addClass('jsValueOK')
                            } else {
                                $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                $(element).next().text('');
                                $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                $(element).removeClass('jsValueOK')
                            }
                        } 
                        else if (productCodeId == "ALN") {
                            if (ele_value != '' && !(rupeeValue <= 10000000)) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text('Please select an amount less than 1 Cr');
                                $(element).addClass('jsValueOK')
                            }
                            else if (ele_value != '' && !(rupeeValue>= 100000)) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text('Please enter a value greater than 1 lacs');
                                $(element).addClass('jsValueOK')
                            }
                             else {
                                $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                $(element).next().text('');
                                $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                $(element).removeClass('jsValueOK')
                            }
                        } 
                        else if (productCodeId == "LAP" && $(element).data('form') == 'requiredLoanAmount') {
                            if (ele_value != '' && (rupeeValue > 200000000)) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text(ele_propRequiredValueLap);
                                $(element).addClass('jsValueOK')
                            } else if ((rupeeValue < 100000)) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text(ele_propRequiredValueLap);
                                $(element).addClass('jsValueOK')
                            } else {
                                $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                $(element).next().text('');
                                $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                $(element).removeClass('jsValueOK')
                            }
                        }
                    }
                    if ($(element).data('type') === 'top-up-loan-amount') {
                        $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                        $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                        $(element).addClass('jsValueOK')
                        var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                        if (ele_value != '' && !(rupeeValue > 0)) {
                            // $(element).parents('.form-textbox-new').addClass('textboxerror');
                            // $(element).next('.error-msgs').text(ele_propValue);
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data('type') === 'manufacture-year') {
                        if (ele_value <= 2005 || ele_value > currentYear) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_manufacturerYear);
                            //errors.push(ele_manufacturerYear);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if (productCodeId == "PR105" && $(element).data('type') === 'coverage-amount') {
                        $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                        $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                        var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                        var coverageAmount = parseInt(ele_value.replace("₹", "").split(",").join(""));

                        if (coverageAmount < 500000 || coverageAmount > 200000000) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_coverage_amount_term_insurance);
                            //errors.push(ele_manufacturerYear);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if (productCodeId == "SITR107" && $(element).data('type') === 'coverage-amount') {
                        $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                        $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                        var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                        var coverageAmount = parseInt(ele_value.replace("₹", "").split(",").join(""));

                        if (coverageAmount < 100000 || coverageAmount > 50000000) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_coverage_amount_savings_investments);
                            //errors.push(ele_manufacturerYear);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if (productCodeId == "HE103" && $(element).data('type') === 'coverage-amount') {
                        $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                        $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                        var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                        var coverageAmount = parseInt(ele_value.replace("₹", "").split(",").join(""));

                        if (coverageAmount <= 100000 || coverageAmount >= 2500000) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_coverage_amount_medical_insurance);
                            //errors.push(ele_manufacturerYear);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if (productCodeId == "HE105" && $(element).data('type') === 'coverage-amount') {
                        $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                        $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                        var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                        var coverageAmount = parseInt(ele_value.replace("₹", "").split(",").join(""));

                        if (coverageAmount <= 200000 || coverageAmount >= 5000000) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_coverage_amount_cardiac_care_insurance);
                            //errors.push(ele_manufacturerYear);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if (productCodeId == "HE104" && $(element).data('type') === 'coverage-amount') {
                        $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                        $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                        var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                        var coverageAmount = parseInt(ele_value.replace("₹", "").split(",").join(""));

                        if (coverageAmount <= 1000000 || coverageAmount >= 4000000) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_coverage_amount_cancer_care_insurance);
                            //errors.push(ele_manufacturerYear);
                            $(element).addClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        }
                    }
                    if ($(element).data("type") === "firstname") {
                        var regName = /^[a-zA-Z]+$/;
                        if (ele_value != "" && !regName.test(ele_value)) {
                            $(element).parents(".form-textbox-new").addClass("textboxerror");
                            $(element).next(".error-msgs").text(ele_firstname);
                            $(element).addClass("jsValueOK");
                        } else {
                            $(element).parents(".form-textbox-new").removeClass("textboxerror");
                            $(element).next().text("");
                            $(element).parents(".form-textbox-new").find(".text-infos").removeClass("hide-input-note");
                            $(element).removeClass("jsValueOK");
                        }
                    }
                    if ($(element).data("type") === "lastname") {
                        var regName = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
                        if (ele_value != "" && !regName.test(ele_value)) {
                            $(element).parents(".form-textbox-new").addClass("textboxerror");
                            $(element).next(".error-msgs").text(ele_lastname);
                            $(element).addClass("jsValueOK");
                        } else {
                            $(element).parents(".form-textbox-new").removeClass("textboxerror");
                            $(element).next().text("");
                            $(element).parents(".form-textbox-new").find(".text-infos").removeClass("hide-input-note");
                            $(element).removeClass("jsValueOK");
                        }
                    }
                    if ($(element).data('type') === 'city') {
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            $(element).addClass('jsValueOK');
                        }
                    }
                    if ($(element).data('type') === 'state') {
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            $(element).addClass('jsValueOK');
                        }
                    }
                    if ($(element).data('type') === 'entExamScore') {
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            $(element).addClass('jsValueOK');
                        }
                    }
                    if ($(element).data('type') === 'languageExamScore') {
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            $(element).addClass('jsValueOK');
                        }
                    }
                    if ($(element).data('type') === 'pinCode') {
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
                    if ($(element).data("type") === "requiredLoanAmount") {
                        $(element).parents(".textbox-inner").addClass("has-rupee-icon");
                        $(element).parents(".textbox-inner").find(".icon-rupee").removeClass("d-none");
                        $(element).addClass("jsValueOK");
                        var rupeeValue = parseFloat(ele_value.replace(/,/g, ""));
                        var loanType = $('[data-form="requiredLoanType"]').val().trim().toLowerCase();

                        if (loanType === "unsecured" && rupeeValue >= 100000 && rupeeValue <= 7500000) {
                            $(element).parents(".form-textbox-new").removeClass("textboxerror");
                            $(element).next().text("");
                            $(element).parents(".form-textbox-new").find(".text-infos").removeClass("hide-input-note");
                            $(element).removeClass("jsValueOK");
                        } else if (loanType === "secured" && rupeeValue >= 100000 && rupeeValue <= 20000000) {
                            $(element).parents(".form-textbox-new").removeClass("textboxerror");
                            $(element).next().text("");
                            $(element).parents(".form-textbox-new").find(".text-infos").removeClass("hide-input-note");
                            $(element).removeClass("jsValueOK");
                        } else {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text((loanType == 'secured') ? ele_edu_required_loan_secured : ele_edu_required_loan_unsecured);
                        }
                    }
                    if ($(element).data('type') === 'otherCourseType') {
                        if (ele_value != '') {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            $(element).removeClass('jsValueOK')
                        } else {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_required);
                            $(element).addClass('jsValueOK');
                        }
                    }
                } else {
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                    $(element).parents('.textbox-inner').removeClass('has-rupee-icon');
                    $(element).parents('.textbox-inner').find('.icon-rupee').addClass('d-none');
                    $(element).next('.error-msgs').text(ele_required);
                }
                /*14-4-2023*/
        feildsCount = $('#loan-against-property .jsValueOK:visible').length
        if(feildsCount === 0){
            $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
        } else {
            $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
        }
        /*14-4-2023*/
                
                feildsCount = $('#loan-against-property .jsValueOK').length
                // console.log(feildsCount);
                if ($('#loan-against-property .jsValueOK').length == 0) {
                    $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
                } else {
                    $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                }
            });

            //Loan aganist form submit
            var userPhoneNumber;
            $('#loan-against-property .jsApplyLoanAgainstProp').click(function (e) {
                $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                var ele_input = $('#loan-against-property').find('.form-textbox-new [data-type]:visible');
                var selectElements = $('#loan-against-property .select2-hidden-accessible[data-type]:visible');
                var errors = [];
                allFilled = true;
                var ele_required = "Field is required";

                $(ele_input).each(function () {
                    var element = $(this);
                    var ele_value = element.val();
                    var ele_email = "Please enter valid email";
                    var ele_name = "Please enter full name";
                    var ele_phoneNumber = "Please enter valid number";
                    var ele_Date = "Invalid Date";
                    var ele_pannumber = "Please enter valid PAN number";
                    var ele_propValue = "Please enter a value greater than 7,50,000";
                    var ele_propRequiredValue = "Please select an amount less than 5 lacs";
                    var ele_propRequiredValueLap = "Please enter a value between 1 Lakh & 20 Cr";
                    var ele_coverage_amount_term_insurance = "Please enter a value between 5 Lakhs & 20 cr";
                    var ele_coverage_amount_savings_investments = "Please enter a value between 1 Lakh & 5 cr";
                    var ele_coverage_amount_medical_insurance = "Please enter a value between 1 Lakh & 25 lakhs";
                    var ele_coverage_amount_cancer_care_insurance = "Please enter a value between 10 Lakhs & 40 Lakhs"
                    var ele_current_ROI = "Please enter Current ROI";
                    var ele_current_Bank = "Please enter Current Bank";
                    var ele_balance_transfer_amount = "Please enter Balance Transfer Amount";
                    var ele_top_up_loan_amount = "Please enter Top Up Loan Amount";

                    var ele_firstname = "Please enter valid first name";
                    var ele_lastname = "Please enter valid last name";
                    var ele_pinCode = "Please enter valid PIN code";
                    var ele_propValueEduction = "Please enter a value greater than 0";
                    var ele_edu_required_loan_unsecured = "Please enter a value between 1 Rupee & 75 Lakhs";
                    var ele_edu_required_loan_secured = "Please enter a value between 1 Rupee & 2 Crores";
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
                           /* if ($(element).data('type') === 'current-bank') {
                                if (ele_value != '') {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    // $(element).next('.error-msgs').text(ele_propValue);
                                    errors.push(ele_current_Bank);
                                }else{
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'current-roi') {
                                if (ele_value != '') {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    errors.push(ele_current_ROI);
                                    // $(element).next('.error-msgs').text(ele_propValue);
                                }else{
                                    $(element).next().text('');
                                }
                            }*/
                            /*if ($(element).data('type') === 'balance-transfer-amount') {
                                $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                                $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                                var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                                if (ele_value != '' && !(rupeeValue > 0)) {
                                    // $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    // $(element).next('.error-msgs').text(ele_propValue);
                                    errors.push(ele_balance_transfer_amount);
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                }
                            }*/
                            /*if ($(element).data('type') === 'top-up-loan-amount') {
                                $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                                $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                                var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                                if (ele_value != '' && !(rupeeValue > 0)) {
                                    // $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    // $(element).next('.error-msgs').text(ele_propValue);
                                    errors.push(ele_top_up_loan_amount);
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                }
                            }*/
                            if ($(element).data('type') === 'email') {
                                //var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
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
                                    userPhoneNumber = $(element).val();
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                }
                            }
                            if ($(element).data('type') === 'dob') {
                                if (!checkDate(ele_value)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_Date);
                                    errors.push(ele_Date)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                }
                            }
                            if ($(element).data('type') === 'tripStartDate') {
                                if (!checkTripStartDate(ele_value)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_Date);
                                    errors.push(ele_Date)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                }
                            }
                            if ($(element).data('type') === 'tripEndDate') {
                                if (!checkTripEndDate(ele_value)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_Date);
                                    errors.push(ele_Date)
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
                                    errors.push(ele_pannumber)
                                } else {
                                    var status = panCardValidation(ele_value);
                                    if (status == false) {
                                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                                        $(element).next('.error-msgs').text(ele_pannumber);
                                        errors.push(ele_pannumber)
                                    } else {
                                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                        $(element).next().text('');
                                    }
                                }
                            }
                            if ($(element).data('type') === 'loan-number') {
                                if (ele_value != '') {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                    $(element).removeClass('jsValueOK');
                                } else {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_required);
                                    $(element).addClass('jsValueOK');
                                }
                            }
                            if ($(element).data('type') === 'property-value') {
                                var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                                if (ele_value != '' && !(rupeeValue > 750000)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_propValue);
                                    errors.push(ele_propValue)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data('type') === 'vehicleRegistrationDate') {
                                if (!checkVehicleDate(ele_value)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_Date);
                                    errors.push(ele_Date)
                                }
                                else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            /* if ($(element).data('type') === 'portfolio-value') {
                                 var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                                 if (ele_value != '') {
                                     $(element).parents('.form-textbox-new').addClass('textboxerror');
                                     $(element).next('.error-msgs').text(ele_propValue);
                                     errors.push(ele_propValue)
                                 } else {
                                     $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                     $(element).next().text('');
                                 }
                             }*/
                            if ($(element).data('type') === 'requireLoanAmount') {
                                $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                                $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                                var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                                if (productCodeId == "TWL") {
                                    if (ele_value != '' && !(rupeeValue <= 500000)) {
                                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                                        $(element).next('.error-msgs').text(ele_propRequiredValue);
                                        errors.push(ele_propRequiredValue)
                                    } else {
                                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                        $(element).next().text('');
                                    }
                                } 
                                else if (productCodeId == "ALN") {
                                    if (ele_value != '' && !(rupeeValue <= 10000000)) {
                                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                                        $(element).next('.error-msgs').text('Please select an amount less than 1 Cr');
                                        $(element).addClass('jsValueOK')
                                    }
                                    else if (ele_value != '' && !(rupeeValue>= 100000)) {
                                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                                        $(element).next('.error-msgs').text('Please enter a value greater than 1 lacs');
                                        $(element).addClass('jsValueOK')
                                    }
                                     else {
                                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                        $(element).next().text('');
                                        $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                        $(element).removeClass('jsValueOK')
                                    }
                                }  
                                else if (productCodeId == "LAP" && $(element).data('form') == 'requiredLoanAmount') {
                                    if (ele_value != '' && (rupeeValue > 200000000)) {
                                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                                        $(element).next('.error-msgs').text(ele_propRequiredValueLap);
                                        errors.push(ele_propRequiredValueLap)
                                    } else if ((rupeeValue < 100000)) {
                                        $(element).parents('.form-textbox-new').addClass('textboxerror');
                                        $(element).next('.error-msgs').text(ele_propRequiredValueLap);
                                        errors.push(ele_propRequiredValueLap)
                                    } else {
                                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                        $(element).next().text('');
                                    }
                                }
                            }
                            if (productCode == "PR105" && $(element).data('type') === 'coverage-amount') {
                                $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                                $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                                var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                                var coverageAmount = parseInt(ele_value.replace("₹", "").split(",").join(""));

                                if (coverageAmount < 500000 || coverageAmount > 200000000) {

                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_coverage_amount_term_insurance);
                                    errors.push(ele_coverage_amount_term_insurance)

                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if (productCode == "SITR107" && $(element).data('type') === 'coverage-amount') {
                                $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                                $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                                var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                                var coverageAmount = parseInt(ele_value.replace("₹", "").split(",").join(""));

                                if (coverageAmount <= 100000 || coverageAmount >= 50000000) {

                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_coverage_amount_savings_investments);
                                    errors.push(ele_coverage_amount_savings_investments)

                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if (productCode == "HE103" && $(element).data('type') === 'coverage-amount') {
                                $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                                $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                                var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                                var coverageAmount = parseInt(ele_value.replace("₹", "").split(",").join(""));

                                if (coverageAmount <= 100000 || coverageAmount >= 2500000) {

                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_coverage_amount_medical_insurance);
                                    errors.push(ele_coverage_amount_medical_insurance)

                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if (productCode == "HE105" && $(element).data('type') === 'coverage-amount') {
                                $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                                $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                                var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                                var coverageAmount = parseInt(ele_value.replace("₹", "").split(",").join(""));

                                if (coverageAmount <= 200000 || coverageAmount >= 5000000) {

                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_coverage_amount_cardiac_care_insurance);
                                    errors.push(ele_coverage_amount_cardiac_care_insurance)

                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if (productCode == "HE104" && $(element).data('type') === 'coverage-amount') {
                                $(element).parents('.textbox-inner').addClass('has-rupee-icon');
                                $(element).parents('.textbox-inner').find('.icon-rupee').removeClass('d-none');
                                var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                                var coverageAmount = parseInt(ele_value.replace("₹", "").split(",").join(""));

                                if (coverageAmount <= 1000000 || coverageAmount >= 4000000) {

                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_coverage_amount_cancer_care_insurance);
                                    errors.push(ele_coverage_amount_cancer_care_insurance)

                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                }
                            }
                            if ($(element).data("type") === "firstname") {
                                var regName = /^[a-zA-Z]+$/;
                                if (ele_value != "" && !regName.test(ele_value)) {
                                    $(element).parents(".form-textbox-new").addClass("textboxerror");
                                    $(element).next(".error-msgs").text(ele_firstname);
                                    errors.push(ele_firstname);
                                } else {
                                    $(element).parents(".form-textbox-new").removeClass("textboxerror");
                                    $(element).next().text("");
                                    $(element).parents(".form-textbox-new").find(".text-infos").removeClass("hide-input-note");
                                }
                            }
                            if ($(element).data("type") === "lastname") {
                                var regName = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
                                if (ele_value != "" && !regName.test(ele_value)) {
                                    $(element).parents(".form-textbox-new").addClass("textboxerror");
                                    $(element).next(".error-msgs").text(ele_lastname);
                                    errors.push(ele_lastname);
                                } else {
                                    $(element).parents(".form-textbox-new").removeClass("textboxerror");
                                    $(element).next().text("");
                                    $(element).parents(".form-textbox-new").find(".text-infos").removeClass("hide-input-note");
                                }
                            }
                            if ($(element).data('type') === 'entExamScore') {
                                if (ele_value != '') {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                    $(element).removeClass('jsValueOK')
                                } else {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_required);
                                    errors.push(ele_required)
                                    $(element).addClass('jsValueOK');
                                }
                            }
                            if ($(element).data('type') === 'languageExamScore') {
                                if (ele_value != '') {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                    $(element).removeClass('jsValueOK')
                                } else {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_required);
                                    errors.push(ele_required)
                                    $(element).addClass('jsValueOK');
                                }
                            }
                            if ($(element).data('type') === 'city') {
                                if (ele_value != '') {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                    $(element).removeClass('jsValueOK')
                                } else {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_required);
                                    errors.push(ele_required)
                                    $(element).addClass('jsValueOK');
                                }
                            }
                            if ($(element).data('type') === 'state') {
                                if (ele_value != '') {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                    $(element).removeClass('jsValueOK')
                                } else {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_required);
                                    errors.push(ele_required)
                                    $(element).addClass('jsValueOK');
                                }
                            }
                            if ($(element).data('type') === 'pinCode') {
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
                            if ($(element).data("type") === "requiredLoanAmount") {
                                $(element).parents(".textbox-inner").addClass("has-rupee-icon");
                                $(element).parents(".textbox-inner").find(".icon-rupee").removeClass("d-none");
                                $(element).addClass("jsValueOK");
                                var rupeeValue = parseFloat(ele_value.replace(/,/g, ""));
                                var loanType = $('[data-form="requiredLoanType"]').val().trim().toLowerCase();

                                if (loanType === "unsecured" && rupeeValue >= 100000 && rupeeValue <= 7500000) {
                                    $(element).parents(".form-textbox-new").removeClass("textboxerror");
                                    $(element).next().text("");
                                    $(element).parents(".form-textbox-new").find(".text-infos").removeClass("hide-input-note");
                                    $(element).removeClass("jsValueOK");
                                } else if (loanType === "secured" && rupeeValue >= 100000 && rupeeValue <= 20000000) {
                                    $(element).parents(".form-textbox-new").removeClass("textboxerror");
                                    $(element).next().text("");
                                    $(element).parents(".form-textbox-new").find(".text-infos").removeClass("hide-input-note");
                                    $(element).removeClass("jsValueOK");
                                } else {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text((loanType == 'secured') ? ele_edu_required_loan_secured : ele_edu_required_loan_unsecured);
                                }
                            }
                            if ($(element).data('type') === 'otherCourseType') {
                                if (ele_value != '') {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                    $(element).removeClass('jsValueOK')
                                } else {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_required);
                                    errors.push(ele_required)
                                    $(element).addClass('jsValueOK');
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

                if ($('.jsMulitSelectValue').val() === '') {
                    $('.js-filterBtn').next('.error-msgs').remove();
                    $('.js-filterBtn').after('<span class="error-msgs"></span>');
                    $(this).parents('.form-textbox-new').removeClass('textboxerror');
                    $('.jsMulitSelectValue').removeClass('jsValueOK');
                    $('.js-filterCheck').parents('.form-textbox-new').addClass('textboxerror');
                    $('.jsMulitSelectValue').addClass('jsValueOK');
                    $('.js-filterBtn').next('.error-msgs').text('Field is required');
                    errors.push(ele_required);
                }

                if (errors.length == 0) {       
                    try{
                        // all insurance + all loans apply forms analytics START 
                        var ctaText = e.currentTarget.innerText.trim();
                        var ctaTitle = getParentElement(e.currentTarget, 7).querySelector('h1').innerText.trim();
                        var mobileNo = getParentElement(e.currentTarget, 7).querySelector('.lead-forms [data-form="mobile"]').value;
                        var emailId = getParentElement(e.currentTarget, 7).querySelector('.lead-forms [data-form="personalEmail"]').value;
                        var dob = getParentElement(e.currentTarget, 7).querySelector('[data-form="birthDate"]').value;
                        var componentName = getParentElement(e.currentTarget, 7).classList[0].split('-').join(' ');
                        var city = getParentElement(e.currentTarget, 7).querySelector('[data-form="city"]').value;
                        var aa_productCode = getParentElement(e.currentTarget, 7).querySelector('[data-type="productType"]')!== null 
                        ? document.querySelector('[data-type="productType"]').nextElementSibling.querySelector('.select2-selection__rendered').innerText.trim() : '';
                        var loanAmount = getParentElement(e.currentTarget, 7).querySelector('.lead-forms [data-form="requiredLoanAmount"]').value
                        var manufacturerName = getParentElement(e.currentTarget, 7).querySelector('[data-type="vehicle-manufacturer"]') !== null
                            ? document.querySelector('[data-type="vehicle-manufacturer"]').nextElementSibling.querySelector('.select2-selection__rendered').innerText.trim() : '';
                        var vehicleModel = getParentElement(e.currentTarget, 7).querySelector('[data-type="vehicle-model"]') !== null
                            ? document.querySelector('[data-type="vehicle-model"]').nextElementSibling.querySelector('.select2-selection__rendered').innerText.trim() : '';
                        var vehicleVariant = getParentElement(e.currentTarget, 7).querySelector('[data-type="vehicle-variant"]') !== null
                            ? document.querySelector('[data-type="vehicle-variant"]').nextElementSibling.querySelector('.select2-selection__rendered').innerText.trim() : '';
                        var vehicleUniqueId = getParentElement(e.currentTarget, 7).querySelector('[data-form="uniqueIdentifier"]') !== null
                            ? document.querySelector('[data-form="uniqueIdentifier"]').nextElementSibling.querySelector('.select2-selection__rendered').innerText.trim() : '';
                        var gender = getParentElement(e.currentTarget, 7).querySelector('[data-type="gender"]') !== null
                            ? document.querySelector('[data-type="gender"]').nextElementSibling.querySelector('.select2-selection__rendered').innerText.trim() : '';
                        // all insurance + all loans apply forms analytics END
                    } catch (error) {
                        console.log('selector not found', error);
                    }
                    creditCardEliteObj.tataCapitalLoanaccountNumber = $('[data-type="loan-number"]').val();
                    $('#loan-against-property [data-type] , #loan-against-property [data-eduinti]').each(function (e, i) {
                        $('[data-form=' + i.dataset.form + ']').val()
                        console.log($('[data-form=' + i.dataset.form + ']').val())
                        if (!$('[data-form=' + i.dataset.form + ']').val() == "") {
                            obj[i.dataset.form] = $('[data-form=' + i.dataset.form + ']').val();
                        } else {
                            if ($('[data-form=' + i.dataset.form + ']').data('eduinti')) {
                                obj[i.dataset.form] = $('[data-form=' + i.dataset.form + ']').val();
                            } else {
                            obj[i.dataset.form] = $('[data-form=' + i.dataset.form + ']').html();
                            }
                        }
                        console.log(obj)
                    })
                    if ($('[data-track="tracking"]').length > 0) {
                        var Moengage = moe({
                            app_id: window.osgiConfigObj.appIdMoengage,
                            debug_logs: parseInt(window.osgiConfigObj.debugLogMoengage),
                            swPath: "/service-worker.js",
                            cluster: "DC_3"
                        });
                        Moengage.track_event("TWL_Apply", {});
                        Moengage.add_user_attribute("Full Name", obj.customerName);
                        Moengage.add_user_attribute("Mobile Number", obj.mobile);
                        Moengage.add_user_attribute("Email ID", obj.personalEmail);
                        Moengage.add_user_attribute("City of Residence", obj.city);
                        Moengage.add_user_attribute("DOB", obj.birthDate);
                        Moengage.add_user_attribute("Required Loan Amount", obj.requiredLoanAmount ? obj.requiredLoanAmount.split(',').join("") : "");
                        Moengage.add_user_attribute("Vehicle Manufacturer", obj.make);
                        Moengage.add_user_attribute("Vehicle Model", obj.model);
                        Moengage.add_user_attribute("Vehicle Variant", obj.variant);
                        Moengage.add_user_attribute("Unique Identifier", obj.uniqueIdentifier);
                        Moengage.add_email(obj.personalEmail);
                        Moengage.add_mobile(obj.mobile);
                    }
                    getWhatsappNub = $('[data-type="mobile"]').val();
                    clearCompleteForm();
                    clearRadioInput();
                    clearMultiSelect();
                    $('.loader').removeClass('hide-loader');
                    $('body').addClass('bg-loader');
                    mobilNumber = getWhatsappNub;
                    var reqObj = {
                        "header": {
                            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                            "identifier":"nli"
                        },
                        "body": {
                            "mobileNumber": mobilNumber
                        }
                    }
                    applyNowLeadGenerateFilterObj.generateOtp(reqObj).then(function (response) {
                        if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                            if(response.response.responseJson.body.otpRefNo){
                                /*otp timer*/
                                $(".jsGetOTPSent").addClass("d-none");
                                $('.jsOnGetCall').addClass('d-none');
                                $('.jsGetOTPSent').addClass('d-none');
                                resetTimer()
                                /*otp timer*/
                                otpRefNo = response.response.responseJson.body.otpRefNo;
                                // all insurance + all loans apply forms analytics START
                                try {
                                    if (window.location.href.includes('insurance')) {
                                        insuranceapplyClick(ctaText, ctaTitle, componentName, mobileNo, emailId, dob, gender, productCodeId);
                                    } else if (window.location.href.includes('apply-now-two-wheeler-loan')) {
                                        twowheelerloanapplyClick(ctaText, ctaTitle, componentName, mobileNo, emailId, dob, gender, loanAmount, manufacturerName, vehicleModel, vehicleVariant, vehicleUniqueId, productCodeId)
                                    } else if(window.location.href.includes('apply-now-loan-on-car')){
                                        var aa_productCodeId = '';
                                        aa_productCode.split(' ').forEach(function(el){
                                        aa_productCodeId += el.slice(0,1);
                                        });
                                        loanapplyClick(ctaText, ctaTitle, componentName, mobileNo, emailId, dob, gender, aa_productCodeId.toUpperCase());
                                    }
                                    else if (window.location.href.includes('apply-now-new-car-loan')) {
                                        carloanapplyClick(ctaText, 'to apply for a new car loan please fill the details below', 'new car loan', mobileNo, emailId, dob, gender, loanAmount, manufacturerName, vehicleModel, vehicleVariant,city, productCodeId);
                                    } 
                                    else {
                                        loanapplyClick(ctaText, ctaTitle, componentName, mobileNo, emailId, dob, gender, productCodeId)
                                    }
                                } catch (error) {
                                    console.log('selector not found', error);
                                }
                           
                        } 
                                // all insurance + all loans apply forms analytics END                                
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                $('.loan-against-form').addClass('d-none')
                                $('.loan-against-otp-wrap').removeClass('d-none')
                                $('.loan-againstclose-btn').removeClass('d-none')
                                $('.clear-btn').addClass('d-none')
                                $("#loan-against-otp .input-textbox[data-type=otp-send-number]").val(userPhoneNumber);
                                $("#loan-against-otp .form-textbox-new").addClass('active onchange');
                                //$('#loan-against-otp .jsLoanAgainstSendOTP').trigger('click');
                                $('.jsOTPInputBox').removeClass('d-none');
                                $('.jsLoanAgainstSendOTP').addClass('d-none');
                                $('.jsLoanAgainstSubmitOTP').removeClass('d-none');
                                $('.jsLoanAgainstResendOTP').removeClass('d-none');
                                $('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
                            
                        } else {
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            //failure Popup
                            setTimeout(function () {
                                $("#resend-otp-error").addClass("popover-show");
                            }, 80);

                            $("#resend-otp-error").css("display", "block");
                            $("body").addClass("popover-modal-open");
                            $("body").append('<div class="modal-backdrop"></div>');
                        }
                    }).catch(function (error) {
                        console.error(error);
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        //failure Popup
                        setTimeout(function () {
                            $("#resend-otp-error").addClass("popover-show");
                        }, 80);

                        $("#resend-otp-error").css("display", "block");
                        $("body").addClass("popover-modal-open");
                        $("body").append('<div class="modal-backdrop"></div>');
                    });
                }

            });

             /*14-4-2023*/
    $('#loan-against-property .jsRadio input').click(function (){
        // console.log($(this).val())
        if ($(this).val() === 'yes'){
            $('#loan-against-property .input-textbox[data-type="top-up-loan-amount"]').closest('.row-col-33').removeClass('d-none')
            $('#loan-against-property .input-textbox[data-type="top-up-loan-amount"]').siblings('.icon-rupee').addClass('d-none');
        } else if ($(this).val() === 'no'){
            $('#loan-against-property .input-textbox[data-type="top-up-loan-amount"]').closest('.row-col-33').addClass('d-none');
            $('#loan-against-property .input-textbox[data-type="top-up-loan-amount"]').closest('.form-textbox-new').removeClass('textboxerror active');
            $('#loan-against-property .input-textbox[data-type="top-up-loan-amount"]').val('');
            $('#loan-against-property .input-textbox[data-type="top-up-loan-amount"]').addClass('jsValueOK');
        }
        feildsCount = $('#loan-against-property .jsValueOK:visible').length;
        console.log(feildsCount)

        if(feildsCount === 0){
            $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
        } else {
            $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
        }
    })
    /*14-4-2023*/

            //OTP Loan aganist form keyup
            /*17-2-2023*/
            $('#loan-against-otp .input-textbox[data-type]').keyup(function () {
                var element = $(this);
                var ele_value = element.val();
                var ele_required = 'Field is required';
                var ele_phoneNumber = "Please enter valid number";

                $(this).next('.error-msgs').remove();
                $(this).after('<span class="error-msgs"style="top: 100%"></span>');
                $(this).parents('.form-group').addClass('error');
                if ($(element).val() != '') {
                    $('jsLoanAgainstResendOTP').addClass('btn-disabled');
                    if ($(element).data('type') === 'otp-send-number') {
                        if (!validateMobile(element)) {
                            $(element).parents('.form-textbox-new').addClass('textboxerror');
                            $(element).next('.error-msgs').text(ele_phoneNumber);
                            $('.jsOTPInputBox').addClass('d-none');
                            $('.jsLoanAgainstSubmitOTP').addClass('d-none');
                            $('.jsLoanAgainstResendOTP').addClass('d-none');
                            $('.jsLoanAgainstSendOTP').removeClass('d-none');
                        } else {
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).next().text('');
                        }
                    }
                } else {
                    $('jsLoanAgainstResendOTP').addClass('btn-disabled');
                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                    $(element).next('.error-msgs').text(ele_required);
                    $('.jsOTPInputBox').addClass('d-none');
                    $('.jsLoanAgainstSubmitOTP').addClass('d-none');
                    $('.jsLoanAgainstResendOTP').addClass('d-none');
                    $('.jsLoanAgainstSendOTP').removeClass('d-none');
                }
            });
            /*17-2-2023*/

            /*OTP Loan aganist form send*/
            $('#loan-against-otp .jsLoanAgainstSendOTP').click(function () {
                $('#loan-against-otp').find('.js-OtpBox .input-textbox').val('');
                var ele_input = $('#loan-against-otp').find('.form-textbox-new [data-type]:visible');
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
                                // console.log(element)
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
                    mobilNumber = $('[data-type="otp-send-number"]').val();
                $('#loan-against-otp .js-OtpBox .input-textbox').val("");
                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                var reqObj = {
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "identifier":"nli"
                    },
                    "body": {
                        "mobileNumber": mobilNumber
                    }
                }
                applyNowLeadGenerateFilterObj.generateOtp(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                        if(response.response.responseJson.body.otpRefNo){
                            otpRefNo = response.response.responseJson.body.otpRefNo;
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        var enterotpText = 'Please enter the 4 digit OTP sent to your mobile number';
                        $('.jsOtpHeading').html(enterotpText);
                        $('.jsOTPInputBox').removeClass('d-none');
                        $('.jsLoanAgainstSendOTP').addClass('d-none');
                        $('.jsLoanAgainstSubmitOTP').removeClass('d-none');
                        $('.jsLoanAgainstResendOTP').removeClass('d-none');
                        $('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
                            /*otp timer*/
                            $('.jsOnGetCall').addClass('d-none');
                            $('.jsGetOTPSent').addClass('d-none')
                            resetTimer()
                            /*otp timer*/
                        }else{
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            //failure popup
                            setTimeout(function () {
                                $("#resend-otp-error").addClass("popover-show");
                            }, 80);

                            $("#resend-otp-error").css("display", "block");
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
                            $("#resend-otp-error").addClass("popover-show");
                        }, 80);

                        $("#resend-otp-error").css("display", "block");
                        $("body").addClass("popover-modal-open");
                        $("body").append('<div class="modal-backdrop"></div>');
                    });
                }

            });

            /*Loan aganist form otp keyup*/
            var conunt = false;
            $("#loan-against-otp .js-OtpBox .input-textbox").keyup(function () {
                if (this.value.length == this.maxLength) {
                    $(this).next('.input-textbox').focus();
                    $(this).next('.input-textbox').removeClass('pointer-none');
                } else {
                    $(this).prev('.input-textbox').focus();
                    $(this).addClass('pointer-none');
                    $('#whatsapp-otp .input-textbox:first').removeClass('pointer-none');
                }
                var otpCount = 0;
                var ele_input = $('.js-OtpBox .input-textbox');
                $(ele_input).each(function () {
                    if ($(this).val().length != 0) {
                        otpCount +=1;
                        $(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').removeClass('btn-disabled');
                        if(productCodeId === "TWL"){
                            $('#iAgreeTerms').is(':checked') ? $('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').removeClass('btn-disabled') : $('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
                        }
                    } else {
                        otpCount -=1
                        $(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
                    }
                });
                if (otpCount == 4) {
                    conunt = true;
                }else{
                    conunt = false;
                }
                /*14-1-2023*/
                $('.js-OtpBox .input-textbox:first-child').removeClass('pointer-none');
                /*14-1-2023*/
            })

            /*loan against otp resend*/
            $('#loan-against-otp .jsLoanAgainstResendOTP').click(function (e) {
                /* otp timer */
                if(remainingTime !== 0){
                pauseTimerAndModal()
                }
                $(".jsLoanAgainstResendOTP").addClass("d-none");
                $(".jsLoadingBtn").removeClass("d-none");
                $(".jsGetOTPSent").addClass("d-none");
                /* otp timer */

                // resend otp analytics START
                try {
                    var ctaText = e.currentTarget.innerText.trim();
                    var componentName = window.location.href.split('/').pop().split('.').shift();
                    if(componentName == "apply-now-new-car-loan"){
                        componentName= 'new car loan';
                    }
                    ctaInteraction(ctaText, componentName, 'please enter your otp', productCodeId);
                } catch (error) {
                    console.log('selector not found', error);
                }
                // resend otp analytics END
                mobilNumber = $('[data-type="otp-send-number"]').val();
                $('#loan-against-otp .js-OtpBox .input-textbox').val("");
                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                var reqObj = {
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "identifier":"nli"
                    },
                    "body": {
                        "mobileNumber": mobilNumber
                    }
                }
                applyNowLeadGenerateFilterObj.generateOtp(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                        if (response.response.responseJson.body.otpRefNo) {
                            otpRefNo = response.response.responseJson.body.otpRefNo;
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox').val('');
                        $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
                        $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox').addClass('pointer-none');
                        $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').removeClass('pointer-none');
                        $(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
                            /*otp timer */
                            $(".jsLoanAgainstResendOTP").removeClass("d-none");
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
                            $(".jsLoanAgainstResendOTP").removeClass("d-none");
                            $(".jsLoadingBtn").addClass("d-none");
                            /*otp timer */
                            //failure popup
                            setTimeout(function () {
                                $("#resend-otp-error").addClass("popover-show");
                            }, 80);

                            $("#resend-otp-error").css("display", "block");
                            $("body").addClass("popover-modal-open");
                            $("body").append('<div class="modal-backdrop"></div>');
                        }
                    } else {
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        /*otp timer */
                        if(remainingTime !== 0){
                        resumeTimer()
                        }
                        $(".jsLoanAgainstResendOTP").removeClass("d-none");
                        $(".jsLoadingBtn").addClass("d-none");
                        /*otp timer */
                        //failure popup
                        setTimeout(function () {
                            $("#resend-otp-error").addClass("popover-show");
                        }, 80);

                        $("#resend-otp-error").css("display", "block");
                        $("body").addClass("popover-modal-open");
                        $("body").append('<div class="modal-backdrop"></div>');
                    }
                }).catch(function (error) {
                    console.error(error);
                    $('.loader').addClass('hide-loader');
                    $('body').removeClass('bg-loader');
                    /*otp timer */
                    if(remainingTime !== 0){
                    resumeTimer()
                    }
                    $(".jsLoanAgainstResendOTP").removeClass("d-none");
                    $(".jsLoadingBtn").addClass("d-none");
                    /*otp timer */
                    //failure popup
                    setTimeout(function () {
                        $("#resend-otp-error").addClass("popover-show");
                    }, 80);

                    $("#resend-otp-error").css("display", "block");
                    $("body").addClass("popover-modal-open");
                    $("body").append('<div class="modal-backdrop"></div>');
                });
            });

            /*loan against otp msg close*/
            $('.jsCloseLaonAgainstMgs').click(function () {
                $('.lead-forms .main-title').removeClass('d-none');
                $('.jsMsgLoanAgainst').addClass('d-none');
                // $("#loan-against-otp .input-textbox[data-type=otp-send-number]").val('');
                $('#loan-against-otp').find('.js-OtpBox .input-textbox').val('');
                $('.jsOTPInputBox').addClass('d-none');
                $('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled d-none');
                $('#loan-against-otp').find('.jsLoanAgainstSendOTP').removeClass('d-none');
                $('#loan-against-otp').find('.jsLoanAgainstResendOTP').addClass('d-none');
                $('.loan-againstclose-btn').addClass('d-none');
                $('.clear-btn').removeClass('d-none');
                $('.loan-against-form').removeClass('d-none');
                $('.loan-against-otp-wrap').addClass('d-none');
                $('.form-bottom-right-img').removeClass('d-none');
                clearCompleteForm();
                clearRadioInput();
                clearMultiSelect();
            });

            /*loan against otp msg success close*/
            /*$('.jsSuccessOTPVarification .jsCloseLaonAgainstMgs').click(function () {
                $('.loan-againstclose-btn').addClass('d-none');
                $('.clear-btn').removeClass('d-none');
                $('.loan-against-form').removeClass('d-none');
                $('.loan-against-otp-wrap').addClass('d-none');
            });*/

            /*loan against otp msg try again*/
            $('.jsLoanAgainstTryAgain').click(function () {
                mobilNumber = $('[data-type="otp-send-number"]').val();
                $('#loan-against-otp .js-OtpBox .input-textbox').val("");
                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                var reqObj = {
                    "header": {
                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                        "identifier":"nli"
                    },
                    "body": {
                        "mobileNumber": mobilNumber
                    }
                }
                applyNowLeadGenerateFilterObj.generateOtp(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
                        if(response.response.responseJson.body.otpRefNo){
                            resetTimer()
                            otpRefNo = response.response.responseJson.body.otpRefNo;
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            /*14-1-2023*/
                            $('#loan-against-otp').removeClass('d-none');
                            /*14-1-2023*/
                            $('.jsMsgLoanAgainst').addClass('d-none');
                            $(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
                            $('#loan-against-otp').find('.js-OtpBox .input-textbox').val('');
                            $('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
                            $('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
                            $('.form-bottom-right-img').removeClass('d-none');
                        } else {
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            //failure popup
                            setTimeout(function () {
                                $("#resend-otp-error").addClass("popover-show");
                            }, 80);

                            $("#resend-otp-error").css("display", "block");
                            $("body").addClass("popover-modal-open");
                            $("body").append('<div class="modal-backdrop"></div>');
                        }
                    } else {
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        //failure popup
                        setTimeout(function () {
                            $("#resend-otp-error").addClass("popover-show");
                        }, 80);

                        $("#resend-otp-error").css("display", "block");
                        $("body").addClass("popover-modal-open");
                        $("body").append('<div class="modal-backdrop"></div>');
                    }
                }).catch(function (error) {
                    console.error(error);
                    $('.loader').addClass('hide-loader');
                    $('body').removeClass('bg-loader');
                    //failure popup
                    setTimeout(function () {
                        $("#resend-otp-error").addClass("popover-show");
                    }, 80);

                    $("#resend-otp-error").css("display", "block");
                    $("body").addClass("popover-modal-open");
                    $("body").append('<div class="modal-backdrop"></div>');
                });
            });

            /*loan against otp submit*/
            $('#loan-against-otp .jsLoanAgainstSubmitOTP').click(function (e) {
                if(remainingTime !== 0){
                pauseTimerAndModal();
                }
                $('.form-bottom-right-img').addClass('d-none');
                var values = []
                $('#loan-against-otp .js-OtpBox .input-textbox').each(function (i, ele) {
                    values.push(ele.value)
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
                applyNowLeadGenerateFilterObj.verifyOtp(reqObj).then(function (response) {
                    if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.retStatus.toLowerCase() == 'success') {
                        //var formdat = formdata(".loan-against-property");
                        if (urlData.subsource != null || urlData.subsource != undefined) {
                            obj.subsource = subsource;
                        }
                        obj["productCode"] = productCodeId;
                        /*if (obj.productCode == "UCL") {
                            obj.leadStatus = "new";
                        }
                        if (obj.productCode == "LAP") {
                            obj.leadStatus = "New";
                        }*/
                        if ($("input[name='smoke']:checked").val()) {
                            obj.smoker = $("input[name='smoke']:checked").val()
                        }
                        if ($("input[name='existing-insurance']:checked").val()) {
                            obj.existingLifeInsurance = $("input[name='existing-insurance']:checked").val()
                        }
                        if (productCodeId === "UCL" || productCodeId === "LOC" || productCodeId === "ALN") {
                            if (obj.yearOfManufacture <= 2012) {
                                obj.leadStatus = "Disqualified";
                            } else {
                                obj.leadStatus = "New";
                            }
                        } else if ((productCodeId == "LAP") && (obj.reasonForLap == 'Home Loan Balance Transfer and Top Up' || obj.reasonForLap == 'Balance Transfer of an existing Home Loan')) {
                            obj.productCode = 'HL';
                            if ((obj.requiredLoanAmount.split(',').join("") >= 100000 && obj.requiredLoanAmount.split(',').join("") < 500000) || (obj.requiredLoanAmount.split(',').join("") > 50000000 && obj.requiredLoanAmount.split(',').join("") <= 500000000)) {
                                obj.leadStatus = "Disqualified";
                            } else {
                                obj.leadStatus = "New";
                            }
                        } else if (productCodeId == "LAP") {
                            /*obj.productCode ="LAP_TCFSL";*/
                            /*obj.product = "LAP";*/
                            if ((obj.requiredLoanAmount.split(',').join("") >= 100000 && obj.requiredLoanAmount.split(',').join("") < 500000) || (obj.requiredLoanAmount.split(',').join("") > 50000000 && obj.requiredLoanAmount.split(',').join("") <= 500000000)) {
                                obj.leadStatus = "Disqualified";
                            } else {
                                obj.leadStatus = "New";
                            }
                        }
                        if(productCodeId=="SBICARDS"){
                            obj.product="SBICARDS";
                        }

                        if (productCodeId == "UCL" && obj.productType == "Loan on Car") {
                            obj.loanOnCar = true;
                        } else if (productCodeId == "LOC" && obj.productType == "Loan on Car") {
                            obj.loanOnCar = true;
                        } else if(productCodeId == "ALN" && obj.productType == "Loan on Car"){
                            obj.loanOnCar = true;
                        }
                         else {
                            obj.loanOnCar = false;
                        }

                        if (productCodeId == 'EDU') {
                            var parts = [obj.firstname, obj.middlename, obj.lastname].filter(part => part.trim() !== '');
                            obj.customerName = parts.join(' ');
                            obj.productCode = (obj.requiredLoanType === 'unsecured') ? 'EDUC' : 'EDUSLOAN';
                            obj.product = obj.productCode;
                            if(obj.otherCourseType.trim() !== ''){
                                obj.courseType = obj.otherCourseType
                            }
                        }

                        var ctaText = e.currentTarget.textContent.trim();
                        var componentName = "Lead Form";
                        var mobileNo = obj.mobile;
                            obj.mobile = mobilNumber;
                        var reqObj = {
                            "header": {
                                "authToken": "MTI4Ojo"
                            },
                            "body": {
                                "plEmployeeForm": {
                                    "customer": {
                                        "customerName": obj.customerName,
                                        "mobile": obj.mobile,
                                        "personalEmail": obj.personalEmail,
                                        "alternateMobile": obj.alternateMobile,
                                        "birthDate": obj.birthDate,
                                        "aadhaarNumber": obj.aadhaarNumber,
                                        "panNumber": obj.panNumber,
                                        "maritalStatus": obj.maritalStatus,
                                        "gender": obj.gender,
                                        "mothersMaidenName": obj.mothersMaidenName,
                                        "assetClassInvestedIn": "",
                                        "serviceInterestedIn": "",
                                        "anyOtherRequirements": "",
                                        "webTopId": obj.webTopId,
                                        "productCode": obj.productCode,
                                        "businessExistence": "",
                                        "uniqueIdentifier": obj.uniqueIdentifier,
                                        "residenceAndEmploymentStability": "",
                                        "nameOfThePolicyHolder": "",
                                        "corporateName": "",
                                        "loanOnCar": obj.loanOnCar,
                                        "isOverDraftLoan": "",
                                        "lapOdFlag": "",
                                        "nriDetails": {
                                            "isdMobile": "",
                                            "country": "",
                                            "preferredTimeToCall": obj.preferredTimeToCall,
                                            "preferredServicedLocIndia": "",
                                            "objectiveType": ""
                                        }
                                    },
                                    "loanDetails": {
                                        "wealthProductName": "",
                                        "product": obj.product,
                                        "make": obj.make,
                                        "model": obj.model,
                                        "variant": obj.variant,
                                        "costOfTwoWheeler": obj.costOfTwoWheeler,
                                        "requiredLoanTenure": obj.requiredLoanTenure,
                                        "requiredLoanAmount": obj.requiredLoanAmount ? obj.requiredLoanAmount.split(',').join("") : obj.requiredLoanAmount,
                                        "eligibleLoanAmount": obj.eligibleLoanAmount,
                                        "timeFrameOfPurchase": obj.timeFrameOfPurchase,
                                        "propertyValue": obj.propertyValue ? obj.propertyValue.split(',').join("") : obj.propertyValue,
                                        "propertyType": obj.propertyType,
                                        "leadSource": obj.source ? obj.source : "Digital",
                                        "leadSubSource": obj.subsource ? obj.subsource : "website",
                                        "leadStatus": obj.leadStatus
                                    },
                                    "occupationDetails": {
                                        "designation": obj.designation,
                                        "companyName": obj.companyName,
                                        "monthOfJoining": obj.monthOfJoining,
                                        "yearOfJoining": obj.yearOfJoining,
                                        "officeEmail": obj.officeEmail,
                                        "entityType": obj.entityType,
                                        "yearsInBusiness": obj.yearsInBusiness,
                                        "itrIncome": obj.itrIncome,
                                        "itrType": obj.itrType,
                                        "turnoverInLastFY": obj.turnoverInLastFY,
                                        "numberOfYearsInBusiness": "",
                                        "turnoverInLastFY": "",
                                        "occupation": obj.occupation,
                                        "monthlyIncome": obj.monthlyIncome,
                                        "annualIncome": obj.annualIncome,
                                        "monthlyEMI": obj.monthlyEMI
                                    },
                                    "residenceAddress": {
                                        "addressLine": obj.addressLine,
                                        "pinCode": obj.pinCode,
                                        "state": obj.state,
                                        "city": obj.city,
                                        "accommodationType": obj.accommodationType
                                    },
                                    "officeAddress": {
                                        "addressLine": obj.officeAddressLine,
                                        "pinCode": obj.officePinCode,
                                        "state": obj.officeState,
                                        "city": obj.officeCity,
                                        "yearsInCurrentAddress": obj.yearsInCurrentAddress,
                                        "yearsInCurrentCity": obj.yearsInCurrentCity,
                                        "monthsInCurrentAddress": obj.monthsInCurrentAddress,
                                        "monthsInCurrentCity": obj.monthsInCurrentCity
                                    },
                                    "referenceDetails": [
                                        {
                                            "name": obj.refName,
                                            "mobileNumber": obj.refMobileNumber,
                                            "address": obj.refAddress,
                                            "pincode": obj.refPincode
                                        }
                                    ],
                                    "insuranceDetails": {
                                        "security": obj.security,
                                        "vehicleRegistrationNumber": obj.vehicleRegistrationNumber,
                                        "vehicleRegistrationDate": obj.vehicleRegisterationDate,
                                        "yearOfManufacture": obj.yearOfManufacture,
                                        "travelTo": obj.travel,
                                        "purpose": obj.purpose,
                                        "numberOfMembers": "",
                                        "familyMember": obj.familyMember,
                                        "dobOfFamilyMember": obj.dobOfFamilyMember,
                                        "tripType": obj.tripType,
                                        "tripStartDate": obj.tripStartDate,
                                        "tripEndDate": obj.tripEndDate,
                                        "medicalConditions": obj.medical,
                                        "sumInsured": obj.sumInsured ? obj.sumInsured.split(',').join("") : obj.sumInsured,
                                        "tenor": obj.tenor,
                                        "smoker": obj.smoker,
                                        "amountToBeInvested": obj.amountToBeInvested,
                                        "typeOfSecurities": obj.typeOfSecurities,
                                        "totalPortFolioValue": obj.totalPortFolioValue ? obj.totalPortFolioValue.split(',').join("") : obj.totalPortFolioValue,
                                        "preferredTimeToContact": obj.preferredTimeToContact,
                                        "existingRelationShipWithSBI": obj.existingRelationShipWithSBI,
                                        "existingCreditCard": obj.existingCreditCard,
                                        "campaignId": obj.campaignId,
                                        "campaignSource": obj.campaignSource,
                                        "campaignCode": obj.campaignCode,
                                        "campaignType": obj.campaignType,
                                        "personalizedField": obj.personalizedField,
                                        "custContent": "",
                                        "comments": obj.comments,
                                        "idType": obj.idType,
                                        "residenceOwnership": obj.residenceOwnership,
                                        "officeOwnership": obj.officeOwnership,
                                        "gstRegistered": obj.gstRegistered,
                                        "salaryCreditBy": obj.salaryCreditBy,
                                        "totalWorkExperience": obj.totalWorkExperience,
                                        "existingEmisPerMonth": obj.existingEmisPerMonth,
                                        "annualBusinessIncome": obj.annualBusinessIncome,
                                        "existingLifeInsurance": obj.existingLifeInsurance,
                                        "coverageAmount": obj.coverageAmount ? obj.coverageAmount.split(',').join("") : obj.coverageAmount,
                                        "anyExistingAilment": obj.anyExistingAilment,
                                        "applianceInWarranty": obj.applianceInWarranty,
                                        "totalNoOfCards": obj.totalNoofCards,
                                        "twoWheeler": obj.twoWheeler,
                                        "fourWheeler": obj.fourWheeler,
                                        "noOfAdult": obj.noofAdults,
                                        "noOfChildren": obj.noofChildren,
                                        "noOfMembers": (obj.noofAdults && obj.noofChildren) ? Number(obj.noofAdults) + Number(obj.noofChildren) : obj.noOfMembers,
                                        "doesPetHaveExistingAilment": obj.doesPetHaveExistingAilment,
                                        "natureOfBusiness": obj.natureOfBusiness,
                                        "planSelection": obj.planSelection,
                                        "petBreed": obj.petBreed,
                                        "nationality": obj.nationality,
                                        "howManyAppliances": obj.howManyAppliances,
                                        "workForce": obj.workForce,
                                        "anySpecificRequirement": obj.anySpecificRequirement,
                                        "tenure": obj.tenure

                                    },
                                    "partofEliteprogram": creditCardEliteObj.partofEliteprogram,
                                    "tataCapitalLoanaccountNumber": creditCardEliteObj.tataCapitalLoanaccountNumber
                                }
                            }
                        }

                        if (productCodeId == 'EDU') {
                            reqObj.body.plEmployeeForm.educationDetails = {
                                "studyPeriod": obj.studyPeriod,
                                "entranceExam": obj.entranceExam,
                                "entranceExamScore": obj.entExamScore,
                                "languageExam": obj.languageExam,
                                "languageExamScore": obj.languageExamScore,
                                "loanType": obj.requiredLoanType,
                                "studyCountry": obj.countryStudy,
                                "courseType": obj.courseType,
                                "admissionStatus": obj.admissionStatus,
                                "university": obj.educationalInti
                            };
                        }

                        var urlParamPartnerid = getURLParams(location.href);
                        var partnerID = urlParamPartnerid['PartnerID'] ? urlParamPartnerid['PartnerID'].trim() : "";
                        reqObj.body.plEmployeeForm.customer.partnerId = partnerID;
                        
                        if (productCodeId === 'bt') {
                            var appId = '';
                            var subSource = '';
                            var offerId = '';
                            var product = '';
                            var source = '';
                            /*var loanTypes = ['insurance loan', 'home loan'];*/
                            $.each(offersDetails, function (index, element) {
                                var productName = element['Product__r']['Name'];
                                //if (loanTypes.includes(productName)) {
                                    appId = element['Id'];
                                    subSource = element['Sub_Source__c'];
                                    offerId = element['OfferId__c'];
                                    product = productName;
                                    source = element['Source__c'];
                                //}
                            })

                            if(obj.otherInstitution.trim() !== ''){
                                obj.currentBank = obj.otherInstitution;
                            }

                            obj.mobile = mobilNumber;
                            var reqObj = {
                                "header": {
                                    "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="
                                },
                                "body": {
                                    "appId": appId,
                                    "subSource": subSource,
                                    "mobileNumber": obj.mobile,
                                    "description": "",
                                    "offerId": offerId,
                                    "product": product,
                                    "consent": "true",
                                    "source": source,
                                    "name": obj.customerName,
                                    "city": obj.city,
                                    "emailId": obj.personalEmail,
                                    "currentROI": obj.currentROI,
                                    "balanceTransferAmt": obj.btAmount.replace(/,/g, ''),
                                    "currentBankOrInstitute": obj.currentBank,
                                    "topUpLoanRequired": $('[name="topuploan"]').val(),
                                    "nationality": obj.nationality,
                                    "propertyType": obj.propertyType,
                                    "termsAndConditions": $('#iAgreeTerms').is(':checked'),
                                    "topUpLoanAmount": obj.topupAmount.replace(/,/g, '')
                                },
                                "headerJson": {}
                            };

                            applyNowLeadGenerateFilterObj.btConvertOfferToOpportunityPost(reqObj).then(function (response) {
                                handleBtOfferPostResponse(response);
                            }).catch(function (error) {
                                handleError(error);
                            });


                            function handleBtOfferPostResponse(response) {
                                var offerId = response.response.responseJson.body.offerId;
                                var opportunityId = response.response.responseJson.body.opportunityId;
                                var status = response.response.responseJson.body.status;
                                /*var message = response.response.responseJson.body.message;*/
                                var sfdcError = response.response.responseJson.errorBody.code;

                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                $('#loan-against-otp').addClass('d-none');
                                $('.lead-forms .main-title').addClass('d-none');

                                if (status && status.toLowerCase() === 'success' && (offerId || opportunityId)) {
                                    $('#leadIdText').html('OFFER HAS BEEN CONVERTED SUCCESSFULLY');
                                    $('.jsSuccessOTPVarification').removeClass('d-none');
                                    $('.jsSuccessOTPVarification .success-inner p.application-id').remove();
                                    $('.jsSuccessOTPVarification .success-inner h2').after(`
                                    <p class= "heading20 application-id">Your Offer ID is <span id="leadId">${offerId}</span></p>
                                    <p class= "heading20 application-id">Your OpportunityId ID is <span id="leadId">${opportunityId}</span></p>
                                    `);
                                } else if (status && status.toLowerCase() === 'error' && offerId) {
                                    $('.jsSuccessOTPVarification').removeClass('d-none');
                                    $('#leadIdText').html('OFFER HAS ALREADY QUALIFIED');
                                    $('.jsSuccessOTPVarification .success-inner p.application-id').remove();
                                } else if (sfdcError && sfdcError.toLowerCase() === 'sfdc_failure') {
                                    $('.jsFailLeaApi').removeClass('d-none');
                                    $('.jsSuccessOTPVarification').addClass('d-none');
                                    $('.jsFailLeaApi .success-inner h2').text('Opps Something Went Wrong');
                                    $('.jsFailLeaApi .success-inner p').addClass('d-none');
                                    $('.loan-against-form-wrap').css('min-height', 'auto');
                                    console.log(response.response.responseJson.errorBody.message);
                                } else {
                                    $('.jsFailLeaApi').removeClass('d-none');
                                    $('.jsSuccessOTPVarification').addClass('d-none');
                                    $('.jsFailLeaApi .success-inner h2').text('Opps Something Went Wrong');
                                    $('.jsFailLeaApi .success-inner p').addClass('d-none');
                                    $('.loan-against-form-wrap').css('min-height', 'auto');
                                    console.log(response.response.responseJson.body.message);
                                }
                            }

                            function handleError(error) {
                                if (remainingTime !== 0) {
                                    resumeTimer();
                                }
                                console.error(error);
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                setTimeout(function () {
                                    $("#failure-modal").addClass("popover-show");
                                }, 80);

                                $("#failure-modal").css("display", "block");
                                $("body").addClass("popover-modal-open");
                                $("body").append('<div class="modal-backdrop"></div>');
                            }
                        }else{
                        applyNowLeadGenerateFilterObj.applyNowLeadGenerate(reqObj).then(function (response) {
                            if(response.response.responseJson.header.status.toLowerCase() == "success"){
                                destroyOtpTimer();
                                if (response.response.responseJson.body && response.response.responseJson.body.Status.toLowerCase() == 'success' && response.response.responseJson.body.LeadId) {
                                    leadCreation(ctaText, componentName, mobileNo, productCodeId, response.response.responseJson.body.LeadId, response.response.responseJson.body.Status);
                                    try {
                                        var componentNameForm = window.location.href.split('/').pop().split('.').shift();
                                        if (componentNameForm == "apply-now-new-car-loan") {
                                            componentNameForm = 'new car loan';
                                        }
                                        otpsubmitClick(componentNameForm, "Generate a 4 digit OTP to verify your mobile number.", response.response.responseJson.body.Status, productCodeId)
                                    } catch (error) {
                                        console.log('selector not found', error);
                                    }
                                    $('.loader').addClass('hide-loader');
                                    $('body').removeClass('bg-loader');
                                    /*14-1-2023*/
                                    $('#loan-against-otp').addClass('d-none');
                                    /*14-1-2023*/
                                    mogoSound();
                                    $('.lead-forms .main-title').addClass('d-none')
                                    $('#leadId').html(response.response.responseJson.body.LeadId);
                                    if (productCodeId == 'EDU') {
                                        $('#leadIdText').html("EDUCATION LOAN APPLICATION");
                                        $('.jsSuccessOTPVarification').removeClass('d-none');
                                    }
                                    if (productCodeId == "UCL") {
                                        if (obj.leadStatus == "New") {
                                            if ($('[data-loanOnCar]').val() == "true") {
                                                if (obj.loanOnCar) {
                                                    $('#leadIdText').html("LOAN ON CAR APPLICATION");
                                                } else {
                                                    $('#leadIdText').html("USED CAR LOAN APPLICATION");
                                                }
                                            } else if ($('[data-loanOnCar]').val() == "false" && obj.loanOnCar) {
                                                $('#leadIdText').html("LOAN ON CAR APPLICATION");
                                            }
                                            else {
                                                $('#leadIdText').html("USED CAR LOAN APPLICATION");
                                            }
                                            $('.jsSuccessOTPVarification').removeClass('d-none');
                                        } else {
                                            $('.jsFailLeaApi').removeClass('d-none');
                                            $('#leadIdTextFailure').html('Did you know? You can now avail instant funds against your investments in Shares or Mutual Funds.Click <a href="https://www.las.tatacapital.com/online/loans/las/apply-now-las-loan?sourceName=UCL NO GOs#!" target="_blank">Here</a> to start your journey');
                                        }
                                    }
                                    if (productCodeId == "ALN") {
                                        if (obj.leadStatus == "New") {
                                            if ($('[data-loanOnCar]').val() == "true") {
                                                if (obj.loanOnCar) {
                                                    $('#leadIdText').html("LOAN ON CAR APPLICATION");
                                                } else {
                                                    $('#leadIdText').html("NEW CAR LOAN APPLICATION");
                                                }
                                            } else if ($('[data-loanOnCar]').val() == "false" && obj.loanOnCar) {
                                                $('#leadIdText').html("LOAN ON CAR APPLICATION");
                                            }
                                            else {
                                                $('#leadIdText').html("NEW CAR LOAN APPLICATION");
                                            }
                                            $('.jsSuccessOTPVarification').removeClass('d-none');
                                        } else {
                                            $('.jsFailLeaApi').removeClass('d-none');
                                            $('#leadIdTextFailure').html('Did you know? You can now avail instant funds against your investments in Shares or Mutual Funds.Click <a href="https://www.las.tatacapital.com/online/loans/las/apply-now-las-loan?sourceName=UCL NO GOs#!" target="_blank">Here</a> to start your journey');
                                        }
                                    }
                                    if (productCodeId == "LOC") {
                                        if (obj.leadStatus == "New") {
                                            if ($('[data-loanOnCar]').val() == "true") {
                                                if (obj.loanOnCar) {
                                                    $('#leadIdText').html("LOAN ON CAR APPLICATION");
                                                } else {
                                                    $('#leadIdText').html("USED CAR LOAN APPLICATION");
                                                }
                                            } else if ($('[data-loanOnCar]').val() == "false" && obj.loanOnCar) {
                                                $('#leadIdText').html("LOAN ON CAR APPLICATION");
                                            }
                                            else {
                                                $('#leadIdText').html("USED CAR LOAN APPLICATION");
                                            }
                                            $('.jsSuccessOTPVarification').removeClass('d-none');
                                        } else {
                                            $('.jsFailLeaApi').removeClass('d-none');
                                            $('#leadIdTextFailure').html('Did you know? You can now avail instant funds against your investments in Shares or Mutual Funds.Click <a href="https://www.las.tatacapital.com/online/loans/las/apply-now-las-loan?sourceName=UCL NO GOs#!" target="_blank">Here</a> to start your journey');
                                        }
                                    }
                                    if (productCodeId == "LAP") {
                                        if (obj.leadStatus == "New") {
                                            $('#leadIdText').html("LOAN AGAINST PROPERTIES APPLICATION");
                                            $('.jsSuccessOTPVarification').removeClass('d-none');
                                        } else {
                                            $('.jsFailLeaApi').removeClass('d-none');
                                            $('#leadIdTextFailure').html('Did you know? You can now avail instant funds against your investments in Shares or Mutual Funds.Click <a href="https://www.las.tatacapital.com/online/loans/las/apply-now-las-loan?sourceName=LAP NO GOs#!" target="_blank">Here</a> to start your journey');
                                        }
                                    }
                                    if (productCodeId == "SBICARDS") {
                                        /*if (obj.leadStatus == "New") {
                                            $('#leadIdText').html("CREDIT CARD APPLICATION");
                                            $('.jsSuccessOTPVarification').removeClass('d-none');
                                        } else {
                                            $('.jsFailLeaApi').removeClass('d-none');
                                            $('#leadIdTextFailure').html('Did you know? You can now avail instant funds against your investments in Shares or Mutual Funds.Click <a href="https://www.las.tatacapital.com/online/loans/las/apply-now-las-loan?sourceName=LAP NO GOs#!" target="_blank">Here</a> to start your journey');
                                        }*/
                                        $('#leadIdText').html("CREDIT CARD APPLICATION");
                                        $('.jsSuccessOTPVarification').removeClass('d-none');
                                    }
                                    if (productCodeId == "LAS") {
                                        $('.jsSuccessOTPVarification').removeClass('d-none');
                                        $('#leadIdText').html("LOAN AGAINST SECURITIES APPLICATION");
                                    }
                                    if (productCodeId == "TWL") {
                                        $('.jsSuccessOTPVarification').removeClass('d-none');
                                        $('#leadIdText').html("TWO WHEELER LOAN APPLICATION");
                                    }
                                    if (productCodeId == "PR105" || productCodeId == "SITR107" || productCodeId == "MO101" || productCodeId == "TW101" || productCodeId == "HE103" || productCodeId == "HE105" || productCodeId == "HE104" || productCodeId == "AA101" || productCodeId == "HC101" || productCodeId == "CS101" || productCodeId == "RS101" || productCodeId == "CP101" || productCodeId == "WS101" || productCodeId == "TR102" || productCodeId == "HO104") {
                                        $('.jsSuccessOTPVarification').removeClass('d-none');
                                        $('#leadIdText').html("INSURANCE APPLICATION");
                                    }
                                } else {
                                    leadCreation(ctaText, componentName, mobileNo, productCodeId, response.response.responseJson.body.LeadId, response.response.responseJson.body.Status);
                                    try {
                                        var componentNameForm = window.location.href.split('/').pop().split('.').shift();
                                        if (componentNameForm == "apply-now-new-car-loan") {
                                            componentNameForm = 'new car loan';
                                        }
                                        otpsubmitClick(componentNameForm, "Generate a 4 digit OTP to verify your mobile number.", response.response.responseJson.body.Status, productCodeId)
                                    } catch (error) {
                                        console.log('selector not found', error);
                                    }
                                    $('.loader').addClass('hide-loader');
                                    $('body').removeClass('bg-loader');
                                    /*14-1-2023*/
                                    $('#loan-against-otp').addClass('d-none');
                                    /*14-1-2023*/
                                    $('.jsFailLeaApi').removeClass('d-none');
                                    if (productCodeId == "UCL") {
                                        $('#leadIdTextFailure').html('Did you know? You can now avail instant funds against your investments in Shares or Mutual Funds.Click <a href="https://www.las.tatacapital.com/online/loans/las/apply-now-las-loan?sourceName=UCL NO GOs#!" target="_blank">Here</a> to start your journey');
                                    }
                                    if (productCodeId == "LAP") {
                                        $('#leadIdTextFailure').html('Did you know? You can now avail instant funds against your investments in Shares or Mutual Funds.Click <a href="https://www.las.tatacapital.com/online/loans/las/apply-now-las-loan?sourceName=LAP NO GOs#!" target="_blank">Here</a> to start your journey');
                                    }
                                    if (productCodeId == "LAS") {
                                        $('#leadIdTextFailure').html('Did you know? You can now avail instant funds against your investments in Shares or Mutual Funds.Click <a href="https://www.las.tatacapital.com/online/loans/las/apply-now-las-loan?sourceName=Bonds NO GOs#!" target="_blank">Here</a> to start your journey');
                                    }
                                    if (productCodeId == "TWL") {
                                        $('#leadIdTextFailure').html('Did you know? You can now avail instant funds against your investments in Shares or Mutual Funds.Click <a href="https://www.las.tatacapital.com/online/loans/las/apply-now-las-loan?sourceName=TWL NO GOs#!" target="_blank">Here</a> to start your journey');
                                    }
                                }
                            }else{
                                if(remainingTime !== 0){
                                resumeTimer();
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
                                try {
                                    var componentNameForm = window.location.href.split('/').pop().split('.').shift();
                                    if (componentNameForm == "apply-now-new-car-loan") {
                                        componentNameForm = 'new car loan';
                                    }
                                    otpsubmitClick(componentNameForm, "Generate a 4 digit OTP to verify your mobile number.", response.response.responseJson.body.Status, productCodeId)
                                } catch (error) {
                                    console.log('selector not found', error);
                                }
                            }
                        }).catch(function (error) {
                            if(remainingTime !== 0){
                            resumeTimer();
                            }
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
                            try {
                                var componentNameForm = window.location.href.split('/').pop().split('.').shift();
                                if (componentNameForm == "apply-now-new-car-loan") {
                                    componentNameForm = 'new car loan';
                                }
                                otpsubmitClick(componentNameForm, "Generate a 4 digit OTP to verify your mobile number.", response.response.responseJson.body.Status, productCodeId)
                            } catch (error) {
                                console.log('selector not found', error);
                            }
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
                        try {
                            var componentNameForm = window.location.href.split('/').pop().split('.').shift();
                            if (componentNameForm == "apply-now-new-car-loan") {
                                componentNameForm = 'new car loan';
                            }
                            otpsubmitClick(componentNameForm, "Generate a 4 digit OTP to verify your mobile number.", response.response.responseJson.body.Status, productCodeId)
                        } catch (error) {
                            console.log('selector not found', error);
                        }
                    } else {
                        if (response.response.responseJson.errorBody.statusCode == "403") {
                            var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                            if(errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode =="ERROTP201") {
                                destroyOtpTimer();
                               $('.loader').addClass('hide-loader');
                               $('body').removeClass('bg-loader');
                               /*14-1-2023*/ 
                               $('#loan-against-otp').addClass('d-none');
                               /*14-1-2023*/
                               $('.jsFailOTPVarification').removeClass('d-none');
                               $('.lead-forms .main-title').addClass('d-none')
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
                                try {
                                    var componentNameForm = window.location.href.split('/').pop().split('.').shift();
                                    if (componentNameForm == "apply-now-new-car-loan") {
                                        componentNameForm = 'new car loan';
                                    }
                                    otpsubmitClick(componentNameForm, "Generate a 4 digit OTP to verify your mobile number.", response.response.responseJson.body.Status, productCodeId)
                                } catch (error) {
                                    console.log('selector not found', error);
                                }
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
                            try {
                                var componentNameForm = window.location.href.split('/').pop().split('.').shift();
                                if (componentNameForm == "apply-now-new-car-loan") {
                                    componentNameForm = 'new car loan';
                                }
                                otpsubmitClick(componentNameForm, "Generate a 4 digit OTP to verify your mobile number.", response.response.responseJson.body.retStatus, productCodeId)
                            } catch (error) {
                                console.log('selector not found', error);
                            }
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
                    try {
                        var componentNameForm = window.location.href.split('/').pop().split('.').shift();
                        if (componentNameForm == "apply-now-new-car-loan") {
                            componentNameForm = 'new car loan';
                        }
                        otpsubmitClick(componentNameForm, "Generate a 4 digit OTP to verify your mobile number.", response.response.responseJson.body.Status, productCodeId)
                    } catch (error) {
                        console.log('selector not found', error);
                    }
                });
                // console.log(values.join(""))
            })

            //Otp details close button
            $('.jsCloseOtpDetails').click(function () {
                $('.loan-against-form').removeClass('d-none');
                $('.loan-against-otp-wrap').addClass('d-none');
                $('.loan-againstclose-btn').addClass('d-none');
                $('.clear-btn').removeClass('d-none');
                clearCompleteForm();
                clearRadioInput();
                clearMultiSelect();
            })

            //Date input format
            $(".date-input").on('input', function () {
                var enteredValue = this.value;
                enteredValue = enteredValue.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
                this.value = enteredValue;
                var matches = enteredValue.match(/\d{1,8}/g);
                var match = matches && matches[0] || ''
                var parts = [];
                var i = 0;
                while (i < match.length) {
                    if (i < 4) {
                        parts.push(match.substring(i, i + 2));
                        i += 2
                    } else {
                        parts.push(match.substring(i, i + 4));
                        i += 4
                    }
                }
                if (parts.length) {
                    this.value = parts.join('/')
                }
            });
            $('.price-with-comma-form').on('keyup', function () {
                if ($(this).val() != "") {
                    var rupeeValue = parseFloat($(this).val().replace(/,/g, ''));
                    commaSeparatedValue = rupeeValue.toLocaleString('en-IN');
                    $(this).val(commaSeparatedValue);
                }
            });

            /*Agree checkbox */
    /*14-4-2023*/
    $('#iAgreeTerms').on('change', function (){
        var checkRequired = 'Please confirm checkbox';
        $(this).parents().find('.custom-checkbox-label').next('.error-msgs').remove();
        if(productCodeId == 'TWL'){
            $(this).parents().find('.custom-checkbox-label').after('<span class="error-msgs" style="top: calc(100% - 0px)"></span>');
            checkRequired = "Kindly select the checkbox to provide consent and proceed."
        }else{
            $(this).parents().find('.custom-checkbox-label').after('<span class="error-msgs" style="top: calc(100% - 20px)"></span>');
        }
        isCheckboxChecked = $(this).is(':checked');
        if (isCheckboxChecked === true){
            $(this).removeClass('jsValueOK');
            $('.jsLoanAgainstSendOTP').removeClass('btn-disabled');
            $('.jsLoanAgainstSubmitOTP').removeClass('btn-disabled');
            if (!conunt) {
                $('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
            } 
        } else {
            $(this).addClass('jsValueOK');
            $(this).parents().find('.custom-checkbox-label').next('.error-msgs').text(checkRequired);
            $('.jsLoanAgainstSendOTP').addClass('btn-disabled');
            $('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
        }

        feildsCount = $('#loan-against-property .jsValueOK:visible').length
        if(feildsCount === 0){
            $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
        } else {
            $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
        }
    });
            /* $('[data-type="iAgree"]').change(function () {
                if ($(this).is(":checked")) {
                    $(this).removeClass('jsValueOK');
                    if ($('#loan-against-property .jsValueOK').length == 0) {
                        $('.jsLoanAgainstSendOTP').removeClass('btn-disabled');
                    } else {
                        $('.jsLoanAgainstSendOTP').addClass('btn-disabled');
                    }

                } else {
                    $(this).addClass('jsValueOK');
                    if ($('#loan-against-property .jsValueOK').length == 0) {
                        $('.jsLoanAgainstSendOTP').removeClass('btn-disabled');

                    } else {
                        $('.jsLoanAgainstSendOTP').addClass('btn-disabled');
                    }
                }
            }); */
    /*14-4-2023*/

            //Select 2 on change remove error state
            $('.js-select2').change(function () {
                $(this).parents('.form-textbox-new').removeClass('textboxerror');
                // $(this).find('.text-infos').removeClass('d-none');
                $(this).next('.error-msgs').remove();
                $(this).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                $(this).removeClass('jsValueOK')
                if ($('#loan-against-property .jsValueOK').length == 0) {
                    $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
                } else {
                    $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                }
                /*14-4-2023*/
        feildsCount = $('#loan-against-property .jsValueOK:visible').length
        if(feildsCount === 0){
            $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
        } else {
            $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
        }/*14-4-2023*/
            })

            //Focus open select 2 dropdown
            $(document).on('focus', '.select2.select2-container', function (e) {
                if (e.originalEvent && $(this).find(".select2-selection--single").length > 0) {
                    $(this).siblings('select').select2('open');
                }
            });

            $('#error-resend-otp').click(function (e) {
                $('.loader').removeClass('hide-loader');
                                $('body').addClass('bg-loader');
                                //mobilNumber = getWhatsappNub;
                                var reqObj = {
                                    "header": {
                                        "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                                        "identifier":"nli"
                                    },
                                    "body": {
                                        "mobileNumber": mobilNumber
                                    }
                                }
                                applyNowLeadGenerateFilterObj.generateOtp(reqObj).then(function (response) {
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
                                            $("#resend-otp-error").removeClass("popover-show");
                                            $("#resend-otp-error").css("display", "none");
                                            $("body").removeClass("popover-modal-open");
                                            $("body").find(".modal-backdrop").removeClass('modal-backdrop')
                                            $('.loan-against-form').addClass('d-none')
                                            $('.loan-against-otp-wrap').removeClass('d-none')
                                            $('.loan-againstclose-btn').removeClass('d-none')
                                            $('.clear-btn').addClass('d-none')
                                            $("#loan-against-otp .input-textbox[data-type=otp-send-number]").val(userPhoneNumber);
                                            $("#loan-against-otp .form-textbox-new").addClass('active onchange');
                                            //$('#loan-against-otp .jsLoanAgainstSendOTP').trigger('click');
                                            $('.jsOTPInputBox').removeClass('d-none');
                                            $('.jsLoanAgainstSendOTP').addClass('d-none');
                                            $('.jsLoanAgainstSubmitOTP').removeClass('d-none');
                                            $('.jsLoanAgainstResendOTP').removeClass('d-none');
                                            $('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
                                        }else{
                                            $('.loader').addClass('hide-loader');
                                            $('body').removeClass('bg-loader');
                                            //failure Popup
                                            setTimeout(function () {
                                                $("#resend-otp-error").addClass("popover-show");
                                              }, 80);
                                    
                                              $("#resend-otp-error").css("display", "block");
                                              $("body").addClass("popover-modal-open");
                                              $("body").append('<div class="modal-backdrop"></div>');
                                        }
                                    }else{
                                        $('.loader').addClass('hide-loader');
                                        $('body').removeClass('bg-loader');
                                        //failure Popup
                                        setTimeout(function () {
                                            $("#resend-otp-error").addClass("popover-show");
                                          }, 80);
                                
                                          $("#resend-otp-error").css("display", "block");
                                          $("body").addClass("popover-modal-open");
                                          $("body").append('<div class="modal-backdrop"></div>');
                                    }
                                }).catch(function (error) {
                                    console.error(error);
                                    $('.loader').addClass('hide-loader');
                                    $('body').removeClass('bg-loader');
                                     //failure Popup
                                     setTimeout(function () {
                                        $("#resend-otp-error").addClass("popover-show");
                                      }, 80);
                            
                                      $("#resend-otp-error").css("display", "block");
                                      $("body").addClass("popover-modal-open");
                                      $("body").append('<div class="modal-backdrop"></div>');
                                });
            })

            /*otp timer*/
            if ($('#leadForms').length > 0) {
                $(".jsOnGetCallButton").click(function () {
                    $('#not-receive-otp-modal').removeClass("popover-show");
                    $('#not-receive-otp-modal').css("display", "none");
                    $("body").removeClass("popover-modal-open");
                    $('.modal-backdrop').remove();
                    $(".jsGetCalling .semibold").html("+91 " + mobilNumber);
                    $(".jsGetCalling").removeClass("d-none");
                    $('.jsOnGetCall').addClass("d-none");
                    var reqObj = {
                        "header": {
                            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
                            "identifier": "nli"
                        },
                        "body": {
                            "mobileNumber": mobilNumber,
                            "otpRefNo": otpRefNo,
                        }
                    }
                    applyNowLeadGenerateFilterObj.onCallOtp(reqObj).then(function (response) {
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
            
        })

        //Global
        var dateReg = /(((0[1-9]|[12][0-9]|3[01])([-./])(0[13578]|10|12)([-./])(\d{4}))|(([0][1-9]|[12][0-9]|30)([-./])(0[469]|11)([-./])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([-./])(02)([-./])(\d{4}))|((29)(\.|-|\/)(02)([-./])([02468][048]00))|((29)([-./])(02)([-./])([13579][26]00))|((29)([-./])(02)([-./])([0-9][0-9][0][48]))|((29)([-./])(02)([-./])([0-9][0-9][2468][048]))|((29)([-./])(02)([-./])([0-9][0-9][13579][26])))/;
        function dateWithoutTime(dateNoTime) {
            // body...
            var month = dateNoTime.getUTCMonth() + 1; //months from 1-12
            var day = dateNoTime.getUTCDate();
            var year = dateNoTime.getUTCFullYear();
            dateNoTime = month + "/" + day + "/" + year;

            return dateNoTime;
        }



        function checkDate(date) {
            if (date == "") {

                return false;
            } else if (!date.match(dateReg)) {

                return false;
            } else {
                var today = new Date();

                var overAge = parseInt(today.getFullYear() - 60);
                var underAge = parseInt(today.getFullYear() - 18);
                // console.log(underAge, overAge)
                today = dateWithoutTime(today);
                var todayDate = new Date(today);
                date = date.toString();
                var custDate = date.substring(0, 2);
                var custMonth = date.substring(3, 5);
                var custYear = date.substring(6, 11);

                var appdate = custMonth + "/" + custDate + "/" + custYear;

                var updateAppDate = new Date(appdate);

                custYear = parseInt(custYear);
                custMonth = parseInt(custMonth);
                custDate = parseInt(custDate);

                if (custYear <= underAge && custYear >= overAge) {
                    if (custYear == underAge || custYear == overAge) {
                        if (custMonth <= parseInt(todayDate.getMonth())) {
                            return true;
                        } else {
                            return false;
                        }
                        return true;
                    }
                    return true;
                } else {

                    return false;
                }

                if (todayDate <= updateAppDate) {

                    return false;
                } else {
                    return true;
                }
            }
        }

        function panCardValidation(ele_value) {
            var productCode = productCodeId
            var status = true;
            var letter = ele_value[3]

            if (productCode == 'TWL' || productCode == 'UCL' || productCode == 'LOC') {
                if (letter != 'P' && letter != 'H') {
                    status = false;
                }
            } else if (productCode == 'HL') {
                if (letter != 'P' && letter != 'H' && letter != 'F' && letter != 'A' && letter != 'T' && letter != 'B') {
                    status = false;
                }
            } else if (productCode == 'PL' || productCode == 'EDU') {
                if (letter != 'P') {
                    status = false;
                }
            } else if (productCode == 'BL' || productCode == 'LAP') {
                if (letter != 'C' && letter != 'P' && letter != 'H' && letter != 'F' && letter != 'A' && letter != 'T' && letter != 'B' && letter != 'L') {
                    status = false;
                }
            }

            return status;

        }

        function checkTripStartDate(date) {
            if (date == "") {

                return false;
            } else if (!date.match(/^(0[1-9]|[12][0-9]|3[01])[\- \/.](?:(0[1-9]|1[012])[\- \/.](19|20)[0-9]{2})$/)) {

                return false;
            } else if (!date.match(dateReg)) {

                return false;
            } else {

                var today = new Date();

                today = dateWithoutTime(today);

                var todayDate = new Date(today);

                date = date.toString();
                var custDate = date.substring(0, 2);
                var custMonth = date.substring(3, 5);
                var custYear = date.substring(6, 11);

                var appdate = custMonth + '/' + custDate + '/' + custYear;


                var updateAppDate = new Date(appdate);

                if (todayDate > updateAppDate) {

                    return false;
                } else {
                    var getTripEndDate = $('[data-form="tripEndDate"]').val();
                    getTripEndDate = getTripEndDate.toString();
                    var updategetTripEndDate = new Date(getTripEndDate);
                    var getTripStartDate = $('[data-form="tripStartDate"]').val();
                    getTripStartDate = getTripStartDate.toString();
                    var updategetTripStartDate = new Date(getTripStartDate);
                    if (updategetTripStartDate > updategetTripEndDate) {

                        return false;
                    } else {
                        return true;
                    }
                }

            }

        }


        function checkTripEndDate(date) {
            if (date == "") {

                return false;
            } else if (!date.match(/^(0[1-9]|[12][0-9]|3[01])[\- \/.](?:(0[1-9]|1[012])[\- \/.](19|20)[0-9]{2})$/)) {

                return false;
            } else if (!date.match(dateReg)) {

                return false;
            } else {

                var today = new Date();

                today = dateWithoutTime(today);

                var todayDate = new Date(today);
                date = date.toString();
                var custDate = date.substring(0, 2);
                var custMonth = date.substring(3, 5);
                var custYear = date.substring(6, 11);

                var appdate = custMonth + '/' + custDate + '/' + custYear;


                var updateAppDate = new Date(appdate);

                var getTripStartDate = $('[data-form="tripStartDate"]').val();
                getTripStartDate = getTripStartDate.toString();

                if (getTripStartDate == "") {

                    return false;
                }
                var custTripDate = getTripStartDate.substring(0, 2);
                var custTripMonth = getTripStartDate.substring(3, 5);
                var custTripYear = getTripStartDate.substring(6, 11);
                var getTripStartDate = custTripMonth + '/' + custTripDate + '/' + custTripYear;


                var updategetTripStartDate = new Date(getTripStartDate);


                if (updateAppDate < updategetTripStartDate) {

                    return false;
                } else {
                    if (todayDate > updateAppDate) {

                        return false;
                    } else {
                        var getTripEndDate = $('[data-form="tripEndDate"]').val();
                        getTripEndDate = getTripEndDate.toString();
                        var updategetTripEndDate = new Date(getTripEndDate);
                        var getTripStartDate = $('[data-form="tripStartDate"]').val();
                        getTripStartDate = getTripStartDate.toString();
                        var updategetTripStartDate = new Date(getTripStartDate);
                        if (updategetTripStartDate > updategetTripEndDate) {

                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            }

        }

        function checkVehicleDate(date) {
            if (date == "") {

                return false;
            }
            else if (!date.match(/^(0[1-9]|[12][0-9]|3[01])[\- \/.](?:(0[1-9]|1[012])[\- \/.](19|20)[0-9]{2})$/)) {

                return false;
            } else if (!date.match(dateReg)) {

                return false;
            } else {

                var today = new Date();
                today = dateWithoutTime(today);

                var todayDate = new Date(today);

                date = date.toString();
                var custDate = date.substring(0, 2);
                var custMonth = date.substring(3, 5);
                var custYear = date.substring(6, 11);

                var appdate = custMonth + '/' + custDate + '/' + custYear;


                var updateAppDate = new Date(appdate);

                if (todayDate < updateAppDate) {

                    return false;
                }
                else {
                    return true;
                }
            }

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

        function clearCompleteForm() {
            $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
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

            $('#loan-against-property .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
            $('#loan-against-property .input-textbox[data-type]').next().text('');

            //radio reset
    /*14-4-2023*/
    // $('#iAgreeTerms').prop('checked', true);
    clearRadioInput();
    /*14-4-2023*/
        }
 /*14-4-2023*/
 function clearRadioInput() {
    $('#loan-against-property .input-textbox[data-type="top-up-loan-amount"]').closest('.row-col-33').addClass('d-none')
    $('.jsRadio').closest('.form-textbox-new').addClass('active');
    $('.jsRadio input[value="no"]').each(function () {
        $('.jsRadio input[value="no"]').prop('checked', true);
    })
}
/*14-4-2023*/
                /****** Common Function to Fetch Data ******/
                function fetchData(options) {
                    showLoader();
                    return applyNowLeadGenerateFilterObj[options.apiMethod]({})
                        .then(function (response) {
                            if (response.status.toLowerCase() === 'success') {
                                hideLoader()
                                return parseResponse(response.response);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
        
                /****** Helper Function to Populate Select Element ******/
                function populateSelect(select, data, textKey) {
                    select.empty();
                    data.forEach(function (item) {
                        const value = item.trim();
                        select.append('<option value=""></option>');
                        select.append('<option value="' + value + '">' + value + '</option>');
                    });
                }
        
                /****** Education Loan pincode State City *********/
                if ($('[data-type="city"]').length > 0 && $('[data-type="state"]').length > 0) {
                    fetchData({
                        apiMethod: 'educationLoanPincode'
                    }).then(function (data) {
                        allEduPincode = data.Master;
                    });
                }
        
                var $pincodeSelect = $('[data-type="pinCode"]');
                var $stateSelect = $('[data-type="state"]');
                var $citySelect = $('[data-type="city"]');
                
                function setupSelectValidation($select) {
                    $select.empty();
                    $select.parents('.form-textbox-new').removeClass('textboxerror');
                    $select.parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                    $select.removeClass('jsValueOK');
                }
                
                function filterDataAndPopulateSelect(pincodeValue) {
                    var filteredData = allEduPincode.filter(function (item) {
                        return item.pincode === pincodeValue;
                    });
                
                    var statenameArray = filteredData.map(function (item) {
                        return item.statename;
                    });
                    var citynameArray = filteredData.map(function (item) {
                        return item.city;
                    });
                
                    var uniqueStatenameArray = [...new Set(statenameArray)];
                    var uniquecitynameArray = [...new Set(citynameArray)];
                
                    setupSelectValidation($stateSelect);
                    setupSelectValidation($citySelect);
                    setupSelect($citySelect);
                
                    $.each(uniqueStatenameArray, function (index, item) {
                        $stateSelect.append($('<option>').text(item).val(item));
                    });
                
                    $.each(uniquecitynameArray, function (index, item) {
                        /*$citySelect.append('<option value=""></option>'); */
                        $citySelect.append($('<option>').text(item).val(item));
                    });
                }
                
                function yourFilterFunction(searchValue) {
                    // Filter and map data using filter and map functions
                    const resultData = allEduPincode
                        .filter(function (item) {
                            return item.pincode.startsWith(searchValue);
                        })
                        .map(function (item) {
                            return {
                                id: item.pincode,
                                text: item.pincode
                            };
                        });
                
                    // Use a Set to store unique values based on the 'id' property
                    const uniqueResultData = Array.from(new Set(resultData.map(item => item.id)))
                        .map(id => {
                            return resultData.find(item => item.id === id);
                        });
                
                    // Limit the results to the top 50 if the searchValue has a length of 1, 2
                    if (searchValue.length >= 1 && searchValue.length <= 2) {
                        return uniqueResultData.slice(0, 100);
                    }
                
                    return uniqueResultData;
                }
                
                function updatePincodeSelect(userInput) {
                    const matchingData = yourFilterFunction(userInput);
                    if(matchingData.length > 0){
                        $pincodeSelect.empty();
                        $pincodeSelect.attr("data-placeholder", "Select");
                        matchingData.unshift({ id: '', text: '' });
                        $pincodeSelect.select2({ data: matchingData });
                        $pincodeSelect.trigger('change.select2');
                        $pincodeSelect.trigger('change');
                        $pincodeSelect.select2('open');
                    }else{
                        $pincodeSelect.empty();
                        $pincodeSelect.attr("data-placeholder", "Select");
                        $pincodeSelect.select2({ });
                        $pincodeSelect.attr("data-placeholder", "Select");
                        $pincodeSelect.select2('open');
                    }
                  
                }
                
                $pincodeSelect.on('select2:open', function (e) {
                    const select2Dropdown = $pincodeSelect.data('select2').dropdown.$dropdown[0];
                    const searchInput = select2Dropdown.querySelector('.select2-search__field');
                    let previousValue = '';
                
                    searchInput.addEventListener('input', function () {
                        const userInput = searchInput.value;
                        previousValue = userInput;
                
                        if (userInput.trim() !== '') {
                            updatePincodeSelect(userInput);
                
                            const scrollTop = select2Dropdown.scrollTop;
                            select2Dropdown.scrollTop = scrollTop;
                
                            document.querySelector('.select2-search__field').value = previousValue;
                            document.querySelector('.select2-search__field').focus();
                        }
                    });
                       // filterDataAndPopulateSelect($pincodeSelect.val())
                });
                
                $pincodeSelect.on('select2:select', function (e) {
                    var selectPinCode = $(this).val().trim();
                    filterDataAndPopulateSelect(selectPinCode);
                });
                
        
                /****** Education Loan pincode State City *********/
        
                /****** Education Loan course type others filed *********/
                $('[data-form="courseType"]').change(function () {
                    var selectedval = $(this).val().toLowerCase();
                    $('[data-other-program]').addClass('hidden');
                    $('[data-form="otherCourseType"]').parents(".form-textbox-new").removeClass("textboxerror active onchange");
                    $('[data-form="otherCourseType"]').val('');
                    $('[data-form="otherCourseType"]').next(".error-msgs").remove();
                    $('[data-form="otherCourseType"]').parents(".form-textbox-new").find(".text-infos").removeClass("hide-input-note");
                    $('[data-form="otherCourseType"]').removeClass("jsValueOK");
        
                    if (selectedval === "others") {
                        $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                        $('[data-other-program]').removeClass('hidden');
                        $('[data-form="otherCourseType"]').addClass("jsValueOK");
                    } else {
                        $('[data-type="otherCourseType"]').val('')
                        $('[data-form="otherCourseType"]').removeClass("jsValueOK");
                    }
                });
                /****** Education Loan course type others filed *********/
            
                /****** Education Loan Study Period *********/
                var selectStudyPeriod = $('[data-type="studyPeriod"]');
                for (var i = 12; i <= 60; i += 12) {
                    var option = $('<option>', {
                        value: i,
                        text: i + " Months"
                    });
                    selectStudyPeriod.append(option);
                }
                selectStudyPeriod.select2();
        
                /****** Education Loan courses *********/
                if ($('[data-type="courseType"]').length > 0) {
                    var allCourse = {};
                    fetchData({
                        apiMethod: 'educationLoanCourses'
                    }).then(function (data) {
                        /*const courseSelect = $('[data-type="courseType"]');*/
                        allCourse = data.Master
                        /* data.Master.forEach(function (item) {
                            const course = item['courses'].trim();
                            courseSelect.append('<option value="' + course + '" data-category="' + item['category'].trim() + '">' + course + '</option>');
                        }); */
                    });
                }
        
                var disableField = document.querySelector('[data-type="requiredLoanAmount"]')
                if (disableField) { disableField.disabled = true; } else { console.error("Element not found");}
        
                $('[data-type="requiredLoanType"]').on('select2:select', function (e) {
                    disableField.disabled = false
                    $('[data-type="requiredLoanAmount"]').val('');
        
                })
        
                $('[data-type="countryStudy"]').on('select2:select', function () {
                    const country = $(this).val().toLowerCase().trim();
                    const course = $('[data-type="courseType"]');
                    var courseList = allCourse.filter(function (course) {
                        if (country === "india") {
                            return course.category === "Domestic Courses";
                        } else {
                            return course.category === "STEM Courses" || course.category === "Non-STEM Courses";
                        }
                    });
                    setupSelect(course)
                    const uniqueCourses = new Set();
                    courseList.forEach(function (item) {
                        const value = item['courses'].trim();
                        uniqueCourses.add(value);
                    });
                    uniqueCourses.forEach(function (value) {
                        course.append('<option value=""></option>');
                        course.append('<option value="' + value + '">' + value + '</option>');
                    });
        
                })
        
                /****** Education Loan entranceExam, admissionStatus and languageExam *********/
                if ($('[data-type="entranceExam"]').length > 0 || $('[data-type="admissionStatus"]').length > 0 || $('[data-type="languageExam"]').length > 0) {
                    fetchData({
                        apiMethod: 'educationLoanFieldlist'
                    }).then(function (data) {
                        const fieldList = data.Master;
                        const entranceExamSelect = $('[data-type="entranceExam"]');
                        const admissionStatusSelect = $('[data-type="admissionStatus"]');
                        const languageExamSelect = $('[data-type="languageExam"]');
                        fieldList.forEach(function (item) {
                            const entranceTest = item['entrance-test'].trim();
                            const languageTest = item['language-test'].trim();
                            const admissionStatus = item['admission-status'].trim();
                            if (entranceTest !== '') {
                                entranceExamSelect.append('<option value="' + entranceTest + '">' + entranceTest + '</option>');
                            }
                            if (languageTest !== '') {
                                languageExamSelect.append('<option value="' + languageTest + '">' + languageTest + '</option>');
                            }
                            if (admissionStatus !== '') {
                                admissionStatusSelect.append('<option value="' + admissionStatus + '">' + admissionStatus + '</option>');
                            }
                        });
                    });
                }
        
                $('#loan-against-property .input-textbox[data-nonmandatory]').on('keyup', function () {
                    var element = $(this);
                    var ele_value = element.val().trim();
                    var ele_pannumber = "Please enter valid PAN number";
        
                    $(this).next('.error-msgs').remove();
                    $(this).after('<span class="error-msgs" style="top: 43px"></span>');
                    $(this).parents('.form-group').addClass('error');
        
                    if (ele_value != '') {
        
                        if ($(element).data('form') === 'panNumber') {
                            var regPan = /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g;
                            $(this).val($(this).val().toUpperCase());
                            if (!ele_value.match(regPan)) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text(ele_pannumber);
                                $(element).addClass('jsValueOK')
                            } else {
                                var status = panCardValidation(ele_value.toUpperCase());
                                if (status == false) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_pannumber);
                                    $(element).addClass('jsValueOK')
                                    //errors.push(ele_pannumber)
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                    $(element).removeClass('jsValueOK')
                                }
                            }
                        }
                    } else {
                        $(element).parents('.form-textbox-new').removeClass('textboxerror');
                        $(element).next().text('');
                        $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                        $(element).removeClass('jsValueOK')
                    }
        
                })
        
                /****** Education Loan Educational institute *********/
                if ($('.jsEducationalInti').length > 0) {
                    fetchData({
                        apiMethod: 'educationLoanAlluniversities'
                    }).then(function (data) {
                        const countryInti = organizeCountryInti(data.Master);
                        renderSelectWithChangeHandler(countryInti, $('[data-type="countryStudy"]'), $('.jsEducationalInti'));
                    });
                }
        
                function renderSelectWithChangeHandler(data, select1, select2, select3) {
                    hideLoader();
                    var jsonData = data;
                    populateSelect(select1, Object.keys(jsonData));
        
                    select1.on('select2:select', function () {
                         setupSelect(select2)
                        $('.jsEducationClosed').addClass('d-none')
                        if (select3) {
                            setupSelect(select3)
                        }
                        var selectedValue = select1.val().trim();
                        populateSelect(select2, Object.keys(jsonData[selectedValue]));
                    });
                    select2.on('select2:select', function () {
                        if (select3) {
                            setupSelect(select3)
                            var selectedValue1 = select1.val().trim();
                            var selectedValue2 = select2.val().trim();
                            populateSelect(select3, Object(jsonData[selectedValue1][selectedValue2]));
                        }
        
                    })
                }
        
                $('[data-type="entranceExam"]').on('select2:select', function () {
                    var entExam = $('[data-form="entExamScore"]');
                    var entExamParents = entExam.parents('.row-col-33.col-sp30');
                    var value = $(this).val().trim().toLowerCase();
                    if (value == 'na' || value == 'waived') {
                        entExamParents.hide();
                        entExam.val('')
                        entExam.removeAttr('data-type').attr('data-eduinti', 'entExamScore').removeClass('jsValueOK');
                    } else {
                        entExamParents.show();
                        entExam.addClass('jsValueOK')
                        if(entExam == ''){
                            entExam.attr('data-type', 'entExamScore').removeAttr('data-eduinti').addClass('jsValueOK')
                        }else{
                            entExam.attr('data-type', 'entExamScore').removeAttr('data-eduinti').removeClass('jsValueOK');
                        }
                    }
                })
        
                $('[data-type="languageExam"]').on('select2:select', function () {
                    var entExam = $('[data-form="languageExamScore"]');
                    var entExamParents = entExam.parents('.row-col-33.col-sp30');
                    var value = $(this).val().trim().toLowerCase();
                    if (value == 'na' || value == 'waived') {
                        entExamParents.hide();
                        entExam.val('')
                        entExam.removeAttr('data-type').attr('data-eduinti', 'languageExamScore').removeClass('jsValueOK');
                    } else {
                        entExamParents.show();
                        entExam.addClass('jsValueOK')
                        if(entExam == ''){
                            entExam.attr('data-type', 'entExamScore').removeAttr('data-eduinti').addClass('jsValueOK')
                        }else{
                            entExam.attr('data-type', 'entExamScore').removeAttr('data-eduinti').removeClass('jsValueOK');
                        }
                    }
        
                })
        
                function setupSelect(selectElement, placeholder = 'Select', allowClear = false) {
                    selectElement.empty().select2({
                        placeholder: placeholder,
                        allowClear: allowClear
                    });
                }
        
                function organizeCountryInti(data) {
                    const organizedData = {};
                    data.forEach(function (item) {
                        const country = item['country'].trim();
                        const university = item['university'].trim();
                        organizedData[country] = organizedData[country] || {};
                        organizedData[country][university] = organizedData[country][university] || [];
                        organizedData[country][university].push(item);
                    });
                    return organizedData;
                }
        
                function parseResponse(response) {
                    return (typeof response === 'object') ? response : JSON.parse(response);
                }
        
                function showLoader() {
                    $("body").addClass("bg-loader");
                    $(".loader").removeClass("hide-loader");
                }
        
                function hideLoader() {
                    $("body").removeClass("bg-loader");
                    $(".loader").addClass("hide-loader");
                }
        
                $('.jsEducationalInti').change(function () {
                    var selectedval = $(this).val();
                    if (selectedval.length > 0) {
                        $('.jsEducationClosed').removeClass('d-none');
                    }
                    else {
                        $('.jsEducationClosed').addClass('d-none');
                    }
                })
        
                $('.jsEducationClosed').click(function () {
                    $(".jsEducationalInti").val(null).trigger("change");
                    $('.jsEducationClosed').addClass('d-none');
                })

                $('.jsEducationalInti').ready(function() {
                    $('[data-eduinti="educationalInti"]').removeClass('jsValueOK');
                });

        /* bt topup bank list or Financial Institution */
        if ($('[data-type="current-bank"]').length > 0) {
            applyNowLeadGenerateFilterObj.financialInstitute({}).then(function (response) {
                if (response.status.toLocaleLowerCase() == 'success') {
                    const bankList = (typeof response.response === 'object') ? response.response : JSON.parse(response.response);
                    const listInstitute = bankList.Master
                        .map(item => item["current-financial-institute"])
                        .filter((value, index, self) => self.indexOf(value) === index);

                    const currentBankSelect = $('[data-type="current-bank"]');
                    listInstitute.forEach(function (item) {
                        currentBankSelect.append('<option value="' + item + '">' + item + '</option>');
                    });
                    var perfEntries = performance.getEntriesByType('navigation');
                    if (perfEntries.length && perfEntries[0].type === 'back_forward') {
                        if (sessionStorage.getItem('currentBank')) {
                            currentBankSelect.val(sessionStorage.getItem('currentBank')).trigger('change', "triggerBackForward")
                        }
                    }
                }
            }).catch(function (error) {
                console.error(error)
            });
        }
        /* bt topup bank list or Financial Institution */

        /******  bt topup Current Bank or Financial Institution others filed *********/
        $('[data-form="currentBank"]').change(function (e, backForward) {
            var institutionSelectedval = $(this).val();
            var triggerBackForward = backForward
            if(institutionSelectedval){
                sessionStorage.setItem('currentBank', institutionSelectedval);
            }
            if (triggerBackForward !== "triggerBackForward") {
                $('[data-other-institution]').addClass('hidden');
                $('[data-form="otherInstitution"]').parents(".form-textbox-new").removeClass("textboxerror active onchange");
                $('[data-form="otherInstitution"]').val('');
                $('[data-form="otherInstitution"]').next(".error-msgs").remove();
                $('[data-form="otherInstitution"]').parents(".form-textbox-new").find(".text-infos").removeClass("hide-input-note");
                $('[data-form="otherInstitution"]').removeClass("jsValueOK");

                if (institutionSelectedval === "Others") {
                    $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                    $('[data-other-institution]').removeClass('hidden');
                    $('[data-form="otherInstitution"]').addClass("jsValueOK");
                } else {
                    $('[data-type="otherCourseType"]').val('')
                    $('[data-form="otherInstitution"]').removeClass("jsValueOK");
                }
            }
        });
        /****** bt topup Current Bank or Financial Institution others filed *********/

        var perfEntries = performance.getEntriesByType('navigation');
        if (perfEntries.length && perfEntries[0].type === 'back_forward' && productCodeId === 'bt') {
            console.log('User got here from Back or Forward button.');
            $('#loan-against-property [data-type]').each(function (e, i) {
                setTimeout(() => {
                    var selectedval = $('[data-type=' + i.dataset.type + ']').val();
                    var dataCurrent = $(this).data('form');
                    if (dataCurrent === 'currentBank') {
                        var getCurrentBank = sessionStorage.getItem('currentBank');
                        $('[data-form="currentBank"]').val(getCurrentBank).trigger('change', "triggerBackForward");
                    }
                    if (selectedval !== "") {
                        $(i).closest('.form-textbox-new').addClass('active');
                        $(i).removeClass("jsValueOK");
                    }

                    fieldCount = $('#loan-against-property .jsValueOK:visible').length;
                    if (fieldCount === 0) {
                        $('.jsApplyLoanAgainstProp').removeClass('btn-disabled');
                    } else {
                        $('.jsApplyLoanAgainstProp').addClass('btn-disabled');
                    }
                }, 100);
            });

            if ($('[name="topuploan"]').length > 0) {
                setTimeout(() => {
                    if ($('input[name="topuploan"]:checked').val() === 'yes') {
                        $('#loan-against-property .input-textbox[data-type="top-up-loan-amount"]').closest('.row-col-33').removeClass('d-none');
                        $('#loan-against-property .input-textbox[data-type="top-up-loan-amount"]').siblings('.icon-rupee').addClass('d-none');
                    }
                }, 100);

            }
            if (sessionStorage.getItem('currentBank') === "Others") {
                $('[data-other-institution]').closest('.row-col-33').removeClass('hidden');
            }
        }

        return jsHelper.freezeObj(applyNowLeadGenerateBizObj);
    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, "applyNowLeadGenerateBizObj", applyNowLeadGenerateBizCallFn);
})(this || window || {});
function mogoSound(){
    var sound = new Audio('/content/dam/tata-capital-web/assets/audio/mogo-sound.mp3');
    sound.play();
}