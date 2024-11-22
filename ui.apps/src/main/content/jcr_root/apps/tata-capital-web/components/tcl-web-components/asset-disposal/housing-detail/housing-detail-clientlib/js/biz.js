// (function (_global) {
// console.log(propRegistrationFilterObj.propRegistration)
var propRegistrationApiCallFn = (function (jsHelper) {
    // var propRegistrationFilterObj = {};
    $(document).ready(function () {
        function clearCompleteForm() {
            $('#housingForm .jsHousingSubmit').addClass('btn-disabled');
            $('#housingForm .input-textbox[data-type]').addClass('jsValueOK')
            $('[data-type="buyer-quote"]').removeClass("jsValueOK");
            $('#housingForm .input-textbox[data-type]').val('');
            $('#housingForm .form-textbox-new').removeClass('active onchange');
            $('#housingForm .form-textbox-new .icon-rupee').addClass('d-none');

            $('#housingForm .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
            $('#housingForm .input-textbox[data-type]').next().text('');
            $('#brokerHousingForm .jsHousingSubmit').addClass('btn-disabled');
            $('#brokerHousingForm .input-textbox[data-type]').addClass('jsValueOK')
            $('#brokerHousingForm .input-textbox[data-type]').val('');
            $('#brokerHousingForm .form-textbox-new').removeClass('active onchange');        
        
            $('#brokerHousingForm .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
            $('#brokerHousingForm .input-textbox[data-type]').next().text('');
            
            $('#bookInspectionForm .jsHousingSubmit').addClass('btn-disabled');
            $('#bookInspectionForm .input-textbox[data-type]').addClass('jsValueOK')
            $('#bookInspectionForm .input-textbox[data-type]').val('');
            $('#bookInspectionForm .form-textbox-new').removeClass('active onchange');
            $('.js-select3').each(function () {
                $('.js-select3').parents('.form-textbox-new').removeClass('textboxerror');
                $('.js-select3').parents('.form-textbox-new').addClass('active');
                $('.js-select3').next('.error-msgs').remove();
                $('.js-select3').val(null).trigger('change');
                $('.js-select3').addClass('jsValueOK')
            });
    
            $('#bookInspectionForm .input-textbox[data-type]').parents('.form-textbox-new').removeClass('textboxerror');
            $('#bookInspectionForm .input-textbox[data-type]').next().text('');
        }
        $('#bookInspectionForm .jsHousingSubmit').click(function () {
            $('#brokerHousingForm .jsHousingSubmit').addClass('btn-disabled');
            var ele_input = $('#brokerHousingForm').find('.form-textbox-new [data-type]:visible');
            var errors = [];
            allFilled = true;
            var ele_required = "Field is required";
    
            $(ele_input).each(function () {
                var element = $(this);
                var ele_value = element.val();
                var ele_Fname = "Please enter first name";
                var ele_Lname = "Please enter last name";
                var ele_phoneNumber = "Please enter valid number";
                var ele_email = "Please enter valid email ID";        
    
                $(element).parents('.form-textbox-new').find('.error-msgs').remove();
                $(element).parents('.form-textbox-new').addClass('textboxerror');
    
                if (element.is(":visible")) {
                    if (element.val() != '') {
                        $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                        $(element).after('<span class="error-msgs" style="top: 43px"></span>');
    
                        if ($(element).data('type') === 'fName') {
                            var regName = /^[a-zA-Z]+$/;
                            if (ele_value != '' && !regName.test(ele_value)) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text(ele_Fname);
                                errors.push(ele_Fname);
                            } else {
                                $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                $(element).next().text('');
                                $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            }
                        }
                        if ($(element).data('type') === 'lName') {
                            var regName = /^[a-zA-Z]+$/;
                            if (ele_value != '' && !regName.test(ele_value)) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text(ele_Lname);
                                errors.push(ele_Lname);
                            } else {
                                $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                $(element).next().text('');
                                $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            }
                        }
                        if ($(element).data('type') === 'email') {
                            var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;
    
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
    
            // console.log(errors.length)
            if (errors.length == 0) {
                var obj = {};
                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                $('.clear-btn').addClass('d-none')
                
                obj.firstName = $('#bookInspectionForm [data-form="firstName"]').val();
                obj.lastName = $('#bookInspectionForm [data-form="lastName"]').val();
                obj.email = $('#bookInspectionForm [data-form="personalEmail"]').val();
                obj.mobileNumber = $('#bookInspectionForm [data-form="mobile"]').val();
                obj.dob = $('#bookInspectionForm [data-form="dob"]').val()
                obj.timeSlot = $('#bookInspectionForm [data-form="timeSlot"]').val()
                var reqObj = {
                    "Master": [
                        {
                            "firstname": obj.firstName,
                            "lastname": obj.lastName,
                            "email": obj.email,
                            "mobile": obj.mobileNumber,
                            "dob": obj.dob,
                            "time-slot": obj.timeSlot
                        }
                    ]
                }
                if(document.querySelector(".services").dataset.service !="tcfsl"){
                propRegistrationFilterObj.bookInspection(reqObj).then(function (response) {
                    
                    console.log(response.status.toLowerCase());
                    if (response.status.toLowerCase() == "success") {
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        clearCompleteForm();
                        $("#bookInspectionForm .form-textbox-new").addClass('active onchange');
                        $('#bookInspectionForm').addClass('d-none');
                        $('#bookInspection .thankyou-modal-inner').removeClass('d-none');
                        $('#bookInspection .thankyou-modal-inner.failureMsg').addClass('d-none')
                        // $('#houseLoanInterested').removeClass("popover-show");
                        
                    }
                    else {
                        if (response.response.responseJson.errorBody.statusCode == "403") {
                            var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                            if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {
                                

                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                $("#bookInspectionForm .form-textbox-new").addClass('active onchange');
                                $('#bookInspectionForm').addClass('d-none');
                                //$('#bookInspection').removeClass("popover-show");

                                //failure Popup
                                $('#bookInspection .thankyou-modal-inner.failureMsg').removeClass('d-none');
                            }
                        } else {
                    

                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            $("#bookInspectionForm .form-textbox-new").addClass('active onchange');
                            $('#bookInspectionForm').addClass('d-none');
                            //$('#bookInspection').removeClass("popover-show");

                            //failure Popup
                            $('#bookInspection .thankyou-modal-inner.failureMsg').removeClass('d-none');

                        }
                    }
                }).catch(function (error) {
                    

                    $('.loader').addClass('hide-loader');
                    $('body').removeClass('bg-loader');
                    $("#bookInspectionForm .form-textbox-new").addClass('active onchange');
                    $('#bookInspectionForm').addClass('d-none');
                    //$('#bookInspection').removeClass('popover-show');

                    //failure popup
                    $('#bookInspection .thankyou-modal-inner.failureMsg').removeClass('d-none');
                });
                }else{
                    propRegistrationFilterObj.bookInspectionTcfsl(reqObj).then(function (response) {
                    
                        console.log(response.status.toLowerCase());
                        if (response.status.toLowerCase() == "success") {
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            clearCompleteForm();
                            $("#bookInspectionForm .form-textbox-new").addClass('active onchange');
                            $('#bookInspectionForm').addClass('d-none');
                            $('#bookInspection .thankyou-modal-inner').removeClass('d-none');
                            $('#bookInspection .thankyou-modal-inner.failureMsg').addClass('d-none')
                            // $('#houseLoanInterested').removeClass("popover-show");
                            
                        }
                        else {
                            if (response.response.responseJson.errorBody.statusCode == "403") {
                                var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                                if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {
                                    
    
                                    $('.loader').addClass('hide-loader');
                                    $('body').removeClass('bg-loader');
                                    $("#bookInspectionForm .form-textbox-new").addClass('active onchange');
                                    $('#bookInspectionForm').addClass('d-none');
                                    //$('#bookInspection').removeClass("popover-show");
    
                                    //failure Popup
                                    $('#bookInspection .thankyou-modal-inner.failureMsg').removeClass('d-none');
                                }
                            } else {
                        
    
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                $("#bookInspectionForm .form-textbox-new").addClass('active onchange');
                                $('#bookInspectionForm').addClass('d-none');
                                //$('#bookInspection').removeClass("popover-show");
    
                                //failure Popup
                                $('#bookInspection .thankyou-modal-inner.failureMsg').removeClass('d-none');
    
                            }
                        }
                    }).catch(function (error) {
                        
    
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $("#bookInspectionForm .form-textbox-new").addClass('active onchange');
                        $('#bookInspectionForm').addClass('d-none');
                        //$('#bookInspection').removeClass('popover-show');
    
                        //failure popup
                        $('#bookInspection .thankyou-modal-inner.failureMsg').removeClass('d-none');
                    });
                }

            }
        
        })
        $('#housingForm .jsHousingSubmit').click(function () {
            
            $('#housingForm .jsHousingSubmit').addClass('btn-disabled');
            var ele_input = $('#housingForm').find('.form-textbox-new [data-type]:visible');
            var errors = [];
            allFilled = true;
            var ele_required = "Field is required";

            $(ele_input).each(function () {
                var element = $(this);
                var ele_value = element.val();
                var ele_Fname = "Please enter first name";
                var ele_Lname = "Please enter last name";
                var ele_phoneNumber = "Please enter valid number";
                var ele_email = "Please enter valid email ID";
                var ele_BuyerQuoteValue = "Please select an amount less than " + parseFloat(reservePrice).toLocaleString('en-IN');

                $(element).parents('.form-textbox-new').find('.error-msgs').remove();
                $(element).parents('.form-textbox-new').addClass('textboxerror');

                if (element.is(":visible")) {
                    if (element.val() != '') {
                        $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                        $(element).after('<span class="error-msgs" style="top: 43px"></span>');

                        if ($(element).data('type') === 'fName') {
                            var regName = /^[a-zA-Z]+$/;
                            if (ele_value != '' && !regName.test(ele_value)) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text(ele_Fname);
                                errors.push(ele_Fname);
                            } else {
                                $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                $(element).next().text('');
                                $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            }
                        }
                        if ($(element).data('type') === 'lName') {
                            var regName = /^[a-zA-Z]+$/;
                            if (ele_value != '' && !regName.test(ele_value)) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text(ele_Lname);
                                errors.push(ele_Lname);
                            } else {
                                $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                $(element).next().text('');
                                $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            }
                        }
                        if ($(element).data('type') === 'email') {
                            var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;

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
                        if ($(element).data('type') === 'buyer-quote') {
                            var rupeeValue = parseFloat(ele_value.replace(/,/g, ''));
                            if (reservePrice !== '' && reservePrice !== '-' && !isNaN(reservePrice)) {
                                if (ele_value != '' && !(rupeeValue < reservePrice)) {
                                    $(element).parents('.form-textbox-new').addClass('textboxerror');
                                    $(element).next('.error-msgs').text(ele_BuyerQuoteValue);
                                    $(element).addClass('jsValueOK')
                                } else {
                                    $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                    $(element).next().text('');
                                    $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                                    $(element).removeClass('jsValueOK')
                                }
                            }
                        }
                    } else {
                        if ($(element).data('type') === 'buyer-quote') {
                            $(element).next().text('');
                            $(element).removeClass('jsValueOK')
                            $(element).parents('.form-textbox-new').removeClass('textboxerror');
                            $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                        } else {
                            $(element).after('<span class="error-msgs" style="top: 43px">' + ele_required + '</span>');
                            errors.push(ele_required);
                            $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                        }
                    }
                }
            });

            // console.log(errors.length)
            if (errors.length == 0) {
                var obj = {};
                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                $('.clear-btn').addClass('d-none')
                obj.firstName = $('#housingForm [data-form="firstName"]').val();
                obj.lastName = $('#housingForm [data-form="lastName"]').val();
                obj.email = $('#housingForm [data-form="personalEmail"]').val();
                obj.mobileNumber = $('#housingForm [data-form="mobile"]').val();
                obj.buyerQuote = $('#housingForm [data-form="buyer-quote"]').val().replace(/,/g, '');

                var reqObj = {
                    "Master": [
                        {
                            "firstname": obj.firstName,
                            "lastname": obj.lastName,
                            "emailid": obj.email,
                            "mobilenumber": obj.mobileNumber,
                            "buyerquote": obj.buyerQuote,
                            "propertyid": propertyId
                        }
                    ]
                }
                if(document.querySelector(".services").dataset.service !="tcfsl"){
                propRegistrationFilterObj.propRegistration(reqObj).then(function (response) {
                    
                    console.log(response.status.toLowerCase());
                    if (response.status.toLowerCase() == "success") {
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        clearCompleteForm();
                        $("#housingForm .form-textbox-new").addClass('active onchange');
                        $('#housingForm').addClass('d-none');
                        $('#houseLoanInterested .thankyou-modal-inner').removeClass('d-none');
                        $('#houseLoanInterested .thankyou-modal-inner.failureMsg').addClass('d-none');
                        // $('#houseLoanInterested').removeClass("popover-show");
                    }
                    else {
                        if (response.response.responseJson.errorBody.statusCode == "403") {
                            var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                            if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {

                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                $("#housingForm .form-textbox-new").addClass('active onchange');
                                $('#housingForm').addClass('d-none');
                                //$('#houseLoanInterested').removeClass("popover-show");

                                //failure Popup
                                $('#houseLoanInterested .thankyou-modal-inner.failureMsg').removeClass('d-none');
                            }
                        } else {
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            $("#housingForm .form-textbox-new").addClass('active onchange');
                            $('#housingForm').addClass('d-none');
                            //$('#houseLoanInterested').removeClass("popover-show");

                            //failure Popup
                            $('#houseLoanInterested .thankyou-modal-inner.failureMsg').removeClass('d-none');

                        }
                    }
                }).catch(function (error) {

                    $('.loader').addClass('hide-loader');
                    $('body').removeClass('bg-loader');
                    $("#housingForm .form-textbox-new").addClass('active onchange');
                    $('#housingForm').addClass('d-none');
                    //$('#houseLoanInterested').removeClass('popover-show');

                    //failure popup
                    $('#houseLoanInterested .thankyou-modal-inner.failureMsg').removeClass('d-none');
                });
                }else{
                    propRegistrationFilterObj.propRegistrationTcfsl(reqObj).then(function (response) {
                    
                        console.log(response.status.toLowerCase());
                        if (response.status.toLowerCase() == "success") {
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            clearCompleteForm();
                            $("#housingForm .form-textbox-new").addClass('active onchange');
                            $('#housingForm').addClass('d-none');
                            $('#houseLoanInterested .thankyou-modal-inner').removeClass('d-none');
                            $('#houseLoanInterested .thankyou-modal-inner.failureMsg').addClass('d-none');
                            // $('#houseLoanInterested').removeClass("popover-show");
                        }
                        else {
                            if (response.response.responseJson.errorBody.statusCode == "403") {
                                var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                                if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {
    
                                    $('.loader').addClass('hide-loader');
                                    $('body').removeClass('bg-loader');
                                    $("#housingForm .form-textbox-new").addClass('active onchange');
                                    $('#housingForm').addClass('d-none');
                                    //$('#houseLoanInterested').removeClass("popover-show");
    
                                    //failure Popup
                                    $('#houseLoanInterested .thankyou-modal-inner.failureMsg').removeClass('d-none');
                                }
                            } else {
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                $("#housingForm .form-textbox-new").addClass('active onchange');
                                $('#housingForm').addClass('d-none');
                                //$('#houseLoanInterested').removeClass("popover-show");
    
                                //failure Popup
                                $('#houseLoanInterested .thankyou-modal-inner.failureMsg').removeClass('d-none');
    
                            }
                        }
                    }).catch(function (error) {
    
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $("#housingForm .form-textbox-new").addClass('active onchange');
                        $('#housingForm').addClass('d-none');
                        //$('#houseLoanInterested').removeClass('popover-show');
    
                        //failure popup
                        $('#houseLoanInterested .thankyou-modal-inner.failureMsg').removeClass('d-none');
                    });
                }

            }
        })
        $('#brokerHousingForm .jsHousingSubmit').click(function () {
            
            $('#brokerHousingForm .jsHousingSubmit').addClass('btn-disabled');
            var ele_input = $('#brokerHousingForm').find('.form-textbox-new [data-type]:visible');
            var errors = [];
            allFilled = true;
            var ele_required = "Field is required";
    
            $(ele_input).each(function () {
                var element = $(this);
                var ele_value = element.val();
                var ele_Fname = "Please enter first name";
                var ele_Lname = "Please enter last name";
                var ele_phoneNumber = "Please enter valid number";
                var ele_email = "Please enter valid email ID";        
    
                $(element).parents('.form-textbox-new').find('.error-msgs').remove();
                $(element).parents('.form-textbox-new').addClass('textboxerror');
    
                if (element.is(":visible")) {
                    if (element.val() != '') {
                        $(element).parents('.form-textbox-new').find('.text-infos').addClass('hide-input-note');
                        $(element).after('<span class="error-msgs" style="top: 43px"></span>');
    
                        if ($(element).data('type') === 'fName') {
                            var regName = /^[a-zA-Z]+$/;
                            if (ele_value != '' && !regName.test(ele_value)) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text(ele_Fname);
                                errors.push(ele_Fname);
                            } else {
                                $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                $(element).next().text('');
                                $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            }
                        }
                        if ($(element).data('type') === 'lName') {
                            var regName = /^[a-zA-Z]+$/;
                            if (ele_value != '' && !regName.test(ele_value)) {
                                $(element).parents('.form-textbox-new').addClass('textboxerror');
                                $(element).next('.error-msgs').text(ele_Lname);
                                errors.push(ele_Lname);
                            } else {
                                $(element).parents('.form-textbox-new').removeClass('textboxerror');
                                $(element).next().text('');
                                $(element).parents('.form-textbox-new').find('.text-infos').removeClass('hide-input-note');
                            }
                        }
                        if ($(element).data('type') === 'email') {
                            var regEmail = /^[a-zA-Z0-9_.]+[@][a-zA-Z0-9]+[\.][a-zA-z0-9]{2,4}$/gm;
    
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
    
            // console.log(errors.length)
            if (errors.length == 0) {
                var obj = {};
                $('.loader').removeClass('hide-loader');
                $('body').addClass('bg-loader');
                $('.clear-btn').addClass('d-none')
                
                obj.firstName = $('#brokerHousingForm [data-form="firstName"]').val();
                obj.lastName = $('#brokerHousingForm [data-form="lastName"]').val();
                obj.email = $('#brokerHousingForm [data-form="personalEmail"]').val();
                obj.mobileNumber = $('#brokerHousingForm [data-form="mobile"]').val();
                var reqObj = {
                    "Master": [
                        {
                            "firstname": obj.firstName,
                            "lastname": obj.lastName,
                            "email": obj.email,
                            "mobile": obj.mobileNumber
                        }
                    ]
                }
                if(document.querySelector(".services").dataset.service !="tcfsl"){
                propRegistrationFilterObj.interstedBroker(reqObj).then(function (response) {
                    
                    console.log(response.status.toLowerCase());
                    if (response.status.toLowerCase() == "success") {
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        clearCompleteForm();    
                        $("#loan-against-otp .form-textbox-new").addClass('active onchange');
                        $('#brokerHousingForm').addClass('d-none');
                        $('#loanThroughBroker .thankyou-modal-inner').removeClass('d-none');
                        $('#loanThroughBroker .thankyou-modal-inner.failureMsg').addClass('d-none');
                        
                    }
                    else {
                        if (response.response.responseJson.errorBody.statusCode == "403") {
                            var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                            if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {

                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                $("#brokerHousingForm .form-textbox-new").addClass('active onchange');
                                $('#brokerHousingForm').addClass('d-none');
                                //$('#brokerHousingForm').removeClass("popover-show");
                                $('#loanThroughBroker .thankyou-modal-inner').removeClass('d-none');

                                //failure Popup
                                $('#loanThroughBroker .thankyou-modal-inner.failureMsg').removeClass('d-none');
                            }
                        } else {
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            $("#brokerHousingForm .form-textbox-new").addClass('active onchange');
                            $('#brokerHousingForm').addClass('d-none');
                            //$('#loanThroughBroker').removeClass("popover-show");

                           //failure Popup
                           $('#loanThroughBroker .thankyou-modal-inner.failureMsg').removeClass('d-none');

                        }
                    }
                }).catch(function (error) {
                    $('.loader').addClass('hide-loader');
                    $('body').removeClass('bg-loader');
                    $("#brokerHousingForm .form-textbox-new").addClass('active onchange');
                    $('#brokerHousingForm').addClass('d-none');
                   // $('#loanThroughBroker').removeClass('popover-show');

                    //failure Popup
                    $('#loanThroughBroker .thankyou-modal-inner.failureMsg').removeClass('d-none');
                });
                }else{
                    propRegistrationFilterObj.interstedBrokerTcfsl(reqObj).then(function (response) {
                    
                        console.log(response.status.toLowerCase());
                        if (response.status.toLowerCase() == "success") {
                            $('.loader').addClass('hide-loader');
                            $('body').removeClass('bg-loader');
                            clearCompleteForm();    
                            $("#loan-against-otp .form-textbox-new").addClass('active onchange');
                            $('#brokerHousingForm').addClass('d-none');
                            $('#loanThroughBroker .thankyou-modal-inner').removeClass('d-none');
                            $('#loanThroughBroker .thankyou-modal-inner.failureMsg').addClass('d-none');
                            
                        }
                        else {
                            if (response.response.responseJson.errorBody.statusCode == "403") {
                                var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
                                if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {
    
                                    $('.loader').addClass('hide-loader');
                                    $('body').removeClass('bg-loader');
                                    $("#brokerHousingForm .form-textbox-new").addClass('active onchange');
                                    $('#brokerHousingForm').addClass('d-none');
                                    //$('#brokerHousingForm').removeClass("popover-show");
                                    $('#loanThroughBroker .thankyou-modal-inner').removeClass('d-none');
    
                                    //failure Popup
                                    $('#loanThroughBroker .thankyou-modal-inner.failureMsg').removeClass('d-none');
                                }
                            } else {
                                $('.loader').addClass('hide-loader');
                                $('body').removeClass('bg-loader');
                                $("#brokerHousingForm .form-textbox-new").addClass('active onchange');
                                $('#brokerHousingForm').addClass('d-none');
                                //$('#loanThroughBroker').removeClass("popover-show");
    
                               //failure Popup
                               $('#loanThroughBroker .thankyou-modal-inner.failureMsg').removeClass('d-none');
    
                            }
                        }
                    }).catch(function (error) {
                        $('.loader').addClass('hide-loader');
                        $('body').removeClass('bg-loader');
                        $("#brokerHousingForm .form-textbox-new").addClass('active onchange');
                        $('#brokerHousingForm').addClass('d-none');
                       // $('#loanThroughBroker').removeClass('popover-show');
    
                        //failure Popup
                        $('#loanThroughBroker .thankyou-modal-inner.failureMsg').removeClass('d-none');
                    });
                }
            }
        });

    })
    return jsHelper.freezeObj(propRegistrationFilterObj);
})(jsHelper);

// _global.jsHelper.defineReadOnlyObjProp(_global, "propRegistrationFilterObj", propRegistrationApiCallFn);
// })(this || window || {});
