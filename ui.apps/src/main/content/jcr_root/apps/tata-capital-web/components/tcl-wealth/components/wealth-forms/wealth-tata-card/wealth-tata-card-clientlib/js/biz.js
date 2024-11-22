var validEmail = {};
var emailArr;
var dummyDomains = [];
var urlParams;
var desigNotInList = "1";
var sourceCode;
var tsssObj;
var name;
var cardType;
var toEmails


$(document).ready(function () {
    /* queryparams logic */
    if (location.href.split("?")[1] && !location.href.split("?")[1].includes("wcmmode=") && !location.href.split("?")[1].includes("subsource=")) {
        var urlParamsPopulateDecode = location.href.split("?")[0] + "?" + atob(location.href.split("?")[1]);
        var urlParamsPopulate = getUrlParams(urlParamsPopulateDecode);
        urlParams = getUrlParams(urlParamsPopulateDecode);

        populateField('firstname', urlParamsPopulate.firstname);
        populateField('lastname', urlParamsPopulate.lastname);
        populateField('pd-mobile', urlParamsPopulate.phonenumber);
        populateField('pd-email', urlParamsPopulate.email);
    } else {
        urlParams = getUrlParams(location.href);
    }
    /* queryparams logic */

    function companyDesignation_analytics(e){
        try{
            var fieldName = getParentElement(e.currentTarget, 8).querySelector('.label-name') ? 
                getParentElement(e.currentTarget, 8).querySelector('.label-name').innerText.trim() : '';
            fieldName = fieldName.includes('*') ? fieldName.slice(0,-1) : fieldName;
            var componentName =  window.location.href.split('/').reverse().shift().split('.').shift().split('-').join(' ');
            inputfieldInteraction(fieldName, componentName, '');
        } catch(err){
            console.log(err);
        }
    }

    $('.companyLi').click(function (e) {
        $('.companyLi').removeClass('active')
        e.target.classList.add('active')
        $('.dropdown-heading.toShow').html(e.target.text)
        // $('.data-occupation-company[data-occupation="salaried"] .textbox-box').find('.error-msgs').remove();
        $('[data-type="od-companyname"]').val(e.target.dataset.company);
        companyDesignation_analytics(e)
    })
    $('.designationLi').click(function (e) {
        $('.designationLi').removeClass('active')
        e.target.classList.add('active')
        $('.dropdown-heading.toShowDesignation').html(e.target.text)
        // $('data-occupation-designation[data-occupation="salaried"] .textbox-box').find('.error-msgs').remove();
        desigNotInList = "0";
        $('[data-type="od-degsnation"]').val(e.target.dataset.designation);
        companyDesignation_analytics(e)
    })
    $('[data-type="od-companynamesal"]').keyup(function (e) {
        $('[data-type="od-companyname"]').val(e.currentTarget.value)
    })
    $('[data-type="od-degsnationsal"]').keyup(function (e) {
        $('[data-type="od-degsnation"]').val(e.currentTarget.value)
        desigNotInList = "1";
    });
    $('[data-type="od-degsnation"]').keyup(function (e) {
        desigNotInList = "1";
    });


    /* search company and desiganation */
    function handleSearch(key, listClass, searchType, dataList, dropdownHeadingClass, dataAttr, apiFunction) {
        $(key).keyup(function (e) {
            if (e.target.value.length > 2) {
                $(listClass).html(`<ul class="multiple-select-list jsGetValue jsSearchVali" id="${dataList}"><li class="select-item"><a href="javascript:void(0)" class="item-text">Please Wait !!!</a></li></ul>`);

                var reqObj = { "header": {}, "body": { [searchType]: e.target.value }, "headerJson": {} };

                apiFunction(reqObj).then(function (response) {
                    if (response.status.toLowerCase() == "success") {
                        $(listClass).html('');

                        var htmlDivHtml = `<ul class="multiple-select-list jsGetValue jsSearchVali" id="${dataList}">`;
                        var obj = response.response.responseJson;

                        if (obj) {
                            obj.body.queryResponse.forEach(function (element, index) {
                                var currentComany = searchType === 'company' ? obj.body.queryResponse[index]['company-name'] : obj.body.queryResponse[index]['designation'];
                                var currentAlias = obj.body.queryResponse[index]['alias-name'] || obj.body.queryResponse[index]['alias'];
                                htmlDivHtml += `<li class="select-item ${dataList}Li"><a href="javascript:void(0)" class="item-text" data-${searchType}="${currentAlias}">${currentComany}</a></li>`;
                            });
                        }

                        htmlDivHtml += '</ul>';
                        $(listClass).html(htmlDivHtml);

                        $(`[data-${searchType}]`).click(function () {
                            var getValues = $(this).text();
                            $(this).parents('.jsGetValue').find('li').removeClass('active');
                            $(this).parents('li').addClass('active');
                            $(this).parents('.new-custom-drops').find('[data-multiselect]').text(getValues);
                            $(this).parents('.new-custom-drops').find('[data-multiselect]').removeClass('jsValueOK');
                            $(this).parents('.new-custom-drops').removeClass('show');
                            $(this).parents('.new-custom-drops').find('[data-multiselect]').removeClass('active');
                            $(this).parents('.new-custom-drops').find('.multiselect-dropdown-card').removeClass('show');

                            var feildsCount = $('#loan-against-property .jsValueOK:visible').length;

                            if (feildsCount === 0) {
                                // Your code when feildsCount is 0
                            } else {
                                // Your code when feildsCount is not 0
                            }
                        });

                        $(`.${dataList}Li`).click(function (e) {
                            $(`.${dataList}Li`).removeClass('active');
                            e.target.classList.add('active');
                            $(`.dropdown-heading.${dropdownHeadingClass}`).html(e.target.text);
                            $(`[data-type="od-${dataAttr}"]`).val(e.target.dataset[searchType]);
                        });
                    }
                });
            }
        });
    }

    // Assuming tsssLeadGenerateFilterObj.tsssCompanyList and tsssLeadGenerateFilterObj.tsssDesignationList are your API functions
    handleSearch('#searchCompany', '.search-drop-list.companySearchList', 'company', 'searchCompanyList', 'toShow', 'companyname', tsssLeadGenerateFilterObj.tsssCompanyList);
    handleSearch('#searchdesiganation', '.search-drop-list.designationSearchList', 'designation', 'searchDesiganationList', 'toShowDesignation', 'degsnation', tsssLeadGenerateFilterObj.tsssDesignationList);

    /* search company and desiganation */
    var feildsCount = $('#loan-against-property .jsValueOK:visible').length;
    console.log(feildsCount);

    /* valid email api call and logic */
    if (location.hostname != '172.27.16.22' && location.hostname != '172.27.16.20' && location.hostname != 'tclu.tatacapital.com' && location.hostname != '172.27.16.55') {

        tsssLeadGenerateFilterObj.validEmails(validEmail).then(function (response) {
            var emailResponse = JSON.parse(response.response);
            emailArr = emailResponse.Master;
            emailArr.filter(function (mail) {
                const dmail = mail['email-dummmy'].split('@');
                if (dmail[0] == '') {
                    return dummyDomains.push(dmail[1])
                }
            });
        });
    }
    /* valid email api call and logic */

    /* city , office city , Residence STD code and Residence PIN code logic */
    if ($('[data-type="ra-city"]').length || $('[data-type="od-city"]').length) {
        var reqObj = {};
        // showLoader()

        tsssLeadGenerateFilterObj.pinCodeMaster(reqObj).then(function (response) {
            if (response.status === "SUCCESS") {
                obj = JSON.parse(response.response);
                hideLoader()

                var dataAttrAraay = ['ra', 'od']

                dataAttrAraay.forEach(function (dataType) {
                    if ($('[data-type="' + dataType + '-city"]').length) {
                        cityPopulateArr = [];
                        $('[data-type="' + dataType + '-city"]').empty();
                        $('[data-type="' + dataType + '-city"]').append("<option value=''></option>");

                        obj.Master.forEach(function (element, index) {
                            if (index < obj.Master.length && cityPopulateArr.indexOf(element.city) <= -1) {
                                cityPopulateArr.push(element.city);
                            }
                        });

                        cityPopulateArr.forEach(function (element) {
                            $('[data-type="' + dataType + '-city"]').append('<option value=' + element + '>' + element + '</option>');
                        });

                        var selectElements = $('[data-type="' + dataType + '-city"].select2-hidden-accessible');
                        $(selectElements).each(function () {
                            var select = $(this);
                            $(select).on('select2:select', function (e) {
                                handleCitySelect(dataType);
                            });
                        });

                        var pincodeSelector = '[data-type="' + dataType + '-pincode"].select2-hidden-accessible';
                        var stdcodeSelector = '[data-type="' + dataType + '-stdcode"].select2-hidden-accessible';

                        $(pincodeSelector).each(function () {
                            var select = $(this);
                            $(select).on('select2:select', function (e) {
                                handleStdCodeSelect(dataType);
                            });
                        });

                        $(stdcodeSelector).each(function () {
                            var select = $(this);
                            $(select).on('select2:select', function (e) {
                                // Additional logic if needed
                            });
                        });
                    }
                });
            } else {
                // Handle the case when the response status is not SUCCESS
            }
        }).catch(function (error) {
            console.error(error);
            showFailureModal()
        });
    }
    /* city , office city , Residence STD code and Residence PIN code logic */
});

/* otp generation and tass object logic */
function sendOtp(mobileNumber) {
    showLoader()

    var reqObj = {
        "header": {
            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
            "identifier": "nli"
        },
        "body": {
            "mobileNumber": mobileNumber
        }
    };

    return tsssLeadGenerateFilterObj.generateOtp(reqObj);
}

function prepareTsssObj() {
    return {
        "header": {
            "authToken": "fdfg"
        },
        "body": {
            "subSource": urlParams.subsource ? urlParams.subsource : "",
            "channelCode": "",
            "promoCode": "",
            "cardType": $('[data-type="credit-card-type"] :selected').text(),
            "sourceCode": sourceCode ? sourceCode : "",
            "seCode": window.osgiConfigObj.seCodeTsssForm,
            "salutation": $('[data-type="pd-title"] :selected').text(),
            "firstName": $('[data-type="firstname"]').val(),
            "lastName": $('[data-type="lastname"]').val(),
            "gender": $('[data-type="pd-gender"] :selected').text(),
            "dateOfBirth": $('[data-type="dob"]').val(),
            "pan": $('[data-type="pan"]').val(),
            "mothersName": $('[data-type="pd-mothername"]').val(),
            "resiAddressHouseNo": $('[data-type="ra-address1"]').val(),
            "resiAddressLine2": $('[data-type="ra-address2"]').val(),
            "resiAddressLocality": $('[data-type="ra-address3"]').val(),
            "resiPinCode": $('[data-type="ra-pincode"] :selected').text(),
            "resiCity": $('[data-type="ra-city"] :selected').text(),
            "resiStdCode": $('[data-type="ra-stdcode"] :selected').text(),
            "resiPhone": $('[data-type="ra-mobile"]').val(),
            "mobileNumber": $('[data-type="pd-mobile"]').val(),
            "personalEmailId": $('[data-type="pd-email"] ').val(),
            "officialEmailId": $('[data-type="od-email"]').val(),
            "nationality": $('[data-type="nationality"]').val(),
            "occupationType": $('[data-type="od-occucation-type"] :selected').text(),
            "companyName": $('[data-type="od-companyname"]').val(),
            "designation": $('[data-type="od-degsnation"]').val(),
            "desigNotInList": desigNotInList ? desigNotInList : "",
            "offPinCode": $('[data-type="od-pincode"]').val().split('-')[0],
            "offCity": $('[data-type="od-city"] :selected').text(),
            "offStdCode": $('[data-type="od-stdcode"]').val(),
            "netIncome": $('[data-type="od-annual-income"]').val().split(',').join(''),
            "textField1": "",
            "textField2": "",
            "consent": "Yes",
            "userId": "",
            "geMid2": "",
            "promoGroup": ""
        }
    }
}

function handleLoanAgainstOtp(userPhoneNumber, buttonName) {
    //clearCompleteForm();
    hideLoader()

    var enterotpText = 'Please enter the 4 digit OTP sent to your mobile number';
    $('.jsOtpHeading').html(enterotpText);
    $('.jsOTPInputBox').removeClass('d-none');
    $('.jsLoanAgainstSendOTP').addClass('d-none');
    $('.jsLoanAgainstSubmitOTP').removeClass('d-none');
    $('.jsLoanAgainstResendOTP').removeClass('d-none');
    $('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();


    // Resetting the timer
    $(".jsGetOTPSent").addClass("d-none");
    $('.jsOnGetCall').addClass('d-none');
    $('.jsGetOTPSent').addClass('d-none');
    resetTimer();

    $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox').val('');
    $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').focus();
    $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox').addClass('pointer-none');
    $(this).parents('#loan-against-otp').find('.js-OtpBox .input-textbox:first-child').removeClass('pointer-none');
    $(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');

    if (buttonName == 'formSumbit' && buttonName !== 'resendSubmit') {
        $('.loan-against-form').addClass('d-none')
        $('.loan-against-otp-wrap').removeClass('d-none')
        $('.loan-againstclose-btn').removeClass('d-none')
        $('.clear-btn').addClass('d-none')
        $("#loan-against-otp .input-textbox[data-type=otp-send-number]").val(userPhoneNumber);
        $("#loan-against-otp .form-textbox-new").addClass('active onchange');
    }
    if (buttonName == 'resend') {
        $(".jsLoadingBtn").addClass("d-none");
        $('.otp-expired').addClass("d-none");
        $("#otp-sent-modal").addClass("popover-show");
        $("#otp-sent-modal").css("display", "block");
        $('.otp-send-success').removeClass('d-none');
        $('#otp-sent-modal .popover-modal-close').addClass('jsThanksModalClose');
        $("body").addClass("popover-modal-open");
        $("body").append('<div class="modal-backdrop"></div>');
    }

    if (buttonName == 'SubmitResend') {
        $('#loan-against-otp').removeClass('d-none');
        $('.jsMsgLoanAgainst').addClass('d-none');
        $(this).parents('#loan-against-otp').find('.jsLoanAgainstSubmitOTP').addClass('btn-disabled');
        $('.form-bottom-right-img').removeClass('d-none');
        mobilNumber = $('[data-type="otp-send-number"]').val();
        $('#loan-against-otp .js-OtpBox .input-textbox').val("");
    }
    if (buttonName == 'errorResendOtp') {
        destroyOtpTimer();
        resetTimer();
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
        /*otp timer*/
        $(".jsGetOTPSent").addClass("d-none");
        $('.jsModalOnGetCall').removeClass("d-none")
        /*otp timer*/
    }

}

function handleLoanAgainstSubmit(userPhoneNumber, buttonName) {
    sendOtp(userPhoneNumber).then(function (response) {
        if (response.response.responseJson.header.status.toLowerCase() == "success" && response.response.responseJson.body.retStatus.toLowerCase() == "success") {
            if (response.response.responseJson.body.otpRefNo) {
                otpRefNo = response.response.responseJson.body.otpRefNo;
                name = $('[data-type="firstname"]').val();
                cardType = $('[data-type="credit-card-type"] :selected').text();
                toEmails = $('[data-type="pd-email"]').val();
                tsssObj = prepareTsssObj();
                handleLoanAgainstOtp(userPhoneNumber, buttonName);
            } else {
                handleOtpGenerationFailure();
            }
        } else {
            handleOtpGenerationFailure();
        }
    }).catch(function (error) {
        console.error(error);
        handleOtpGenerationFailure();
    });
}

function handleOtpGenerationFailure() {
    hideLoader()

    if (remainingTime !== 0) {
        pauseTimerAndModal()
        resumeTimer()
    }
    $(".jsLoanAgainstResendOTP").removeClass("d-none");
    $(".jsLoadingBtn").addClass("d-none");
    /*otp timer */

    // Handle failure Popup
    setTimeout(function () {
        $("#resend-otp-error").addClass("popover-show");
    }, 80);

    $("#resend-otp-error").css("display", "block");
    $("body").addClass("popover-modal-open");
    $("body").append('<div class="modal-backdrop"></div>');
}
/* otp generation and tass object logic */


/* otp Verification and Tss LeadGenerate logic */
function submitOtpVerification() {
    var otpValues = getOtpValues();
    if (remainingTime !== 0) {
        pauseTimerAndModal();
    }
    $('.form-bottom-right-img').addClass('d-none');
    showLoader();

    var reqObj = {
        "header": {
            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmFjOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
            "identifier": "nli"
        },
        "body": {
            "otpRefNo": otpRefNo,
            "otp": otpValues
        }
    };

    tsssLeadGenerateFilterObj.verifyOtp(reqObj).then(function (response) {
        handleVerifyOtpResponse(response);
    }).catch(function (error) {
        showFailurePopup(error);
    });
}

function handleVerifyOtpResponse(response) {
    if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.retStatus.toLowerCase() == 'success') {
        tsssObj.body.mobileNumber = $('[data-type="otp-send-number"]').val();
        tsssLeadGenerateFilterObj.tsssLeadGenerate(tsssObj).then(function (response) {
            handleTsssLeadGenerateResponse(response);
        }).catch(function (error) {
            showFailurePopup(error);
        });
    } else if (response.response.responseJson.header.status.toLowerCase() == 'failure' && response.response.responseJson.errorBody.errorMessage && response.response.responseJson.errorBody.errorMessage.toLowerCase() == 'otp has expired!') {
        handleOtpExpired();
    } else {
        handleOtherVerifyOtpErrors(response);
    }
}

function handleTsssLeadGenerateResponse(response) {
    if (response.response.responseJson.header.status.toLowerCase() == "success") {
        if (response.response.responseJson.body && response.response.responseJson.body.Status.toLowerCase() == 'success') {
            destroyOtpTimer();
            var sbiResponseLead;
            try {
                sbiResponseLead = JSON.parse(response.response.responseJson.body.SBIResponse);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                showFailureLead();
                return;
            }
            $('#loan-against-otp').addClass('d-none');
            $('.jsSuccessOTPVarification').removeClass('d-none');
            if (sbiResponseLead.retStatus.toLowerCase()) {
                if ((sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.statusCode == "FFMP" || sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.statusCode == "QDCR") && sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.leadRefNo) {
                    emailApiCall("Tata Cards Eligible", name, cardType, "Hi! You Are Now One Step Closer to availing " + cardType, toEmails, response);
                } else if (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID && ((sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID.statusCode == "QDCR" || sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID.statusCode == "FFMP") && sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID.leadRefNo)) {
                    emailApiCall("Tata Cards Eligible", name, cardType, "Hi! You Are Now One Step Closer to availing " + cardType, toEmails, response);
                } else if (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.statusCode == "FD") {
                    emailApiCall("Tata Cards Non Eligible", name, cardType, "THANK YOU FOR SHOWING INTEREST IN " + cardType, toEmails, response);
                } else if (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID && (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID.statusCode == "FD")) {
                    emailApiCall("Tata Cards Non Eligible", name, cardType, "THANK YOU FOR SHOWING INTEREST IN " + cardType, toEmails, response);
                } else {
                    showFailureLead()
                }
            } else {
                showFailureLead()
            }
        } else {
            showFailurePopup()
        }
    } else {
        showFailurePopup()
    }
}

function handleOtpExpired() {
    if (remainingTime !== 0) {
        resumeTimer();
    }
    hideLoader()
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

function handleOtherVerifyOtpErrors(response) {
    // Handle other errors from verifyOtp API
    if (response.response.responseJson.errorBody.statusCode == "403") {
        var errorBody = JSON.parse(response.response.responseJson.errorBody.message);
        if (errorBody.retStatus.toLowerCase() == "failure" && errorBody.sysErrorCode == "ERROTP201") {
            destroyOtpTimer();
            hideLoader()
            $('#loan-against-otp').addClass('d-none');
            $('.jsFailOTPVarification').removeClass('d-none');
            $('.lead-forms .main-title').addClass('d-none');
        } else {
            if (remainingTime !== 0) {
                resumeTimer();
            }
            showFailurePopup();
        }
    } else {
        if (remainingTime !== 0) {
            resumeTimer();
        }
        showFailurePopup();
    }
}
function showFailureLead() {
    hideLoader()
    $('#loan-against-otp').addClass('d-none');
    $('.jsSuccessOTPVarification').addClass('d-none');
    $('.jsFailureLead').removeClass('d-none');
    $('#leadIdTextFail').html('Thank you for applying for Tata Cards.');
    $('.fail .text16i').html(' We are currently facing a technical issue and are working on the same. You may get in touch with your Relationship Manager to help complete your application or write to us at <a href="wealth@tatacapital.com" target="_blank">wealth@tatacapital.com</a>');
}
function showFailurePopup() {
    hideLoader()
    if (remainingTime !== 0) {
        pauseTimerAndModal()
        resumeTimer();
    }
    setTimeout(function () {
        $("#error-modal").addClass("popover-show");
    }, 80);

    $("#error-modal").css("display", "block");
    $("body").addClass("popover-modal-open");
    $("body").append('<div class="modal-backdrop"></div>');
}
/* otp Verification and Tss LeadGenerate logic */

function getOtpValues() {
    var values = [];
    $('#loan-against-otp .js-OtpBox .input-textbox').each(function (i, ele) {
        values.push(ele.value);
    });
    return values.join("");
}

function getUrlParams(url) {
    var queryParams = {};
    try {
        url = url ? url : window.location.search;
        url.split("?")[1].split("&").forEach(function (pair) {
            var [key, val] = pair.split("=");
            queryParams[key] = val;
        });
    } catch (err) {
        return "";
    }
    return queryParams;
}

function populateField(dataType, value) {
    if (value) {
        $('[data-type="' + dataType + '"]').val(value);
        $('[data-type="' + dataType + '"]').removeClass('jsValueOK')
        $('[data-type="' + dataType + '"]').parent().parent().addClass('active');
    }
}

function handleCitySelect(dataType) {
    var cityVal = $('[data-type="' + dataType + '-city"] option:selected').text();
    $('[data-type="' + dataType + '-pincode"]').empty();
    $('[data-type="' + dataType + '-stdcode"]').empty();

    if (!cityVal == '') {
        $('[data-type="' + dataType + '-pincode"]').html();
        $('[data-type="' + dataType + '-pincode"]').append("<option value=''></option>");

        obj.Master.forEach(function (element, index) {
            if (element.city == cityVal) {
                $('[data-type="' + dataType + '-pincode"]').append('<option value=' + element.pincode + '-' + element.std + (dataType === 'od' ? '-' + element.sourcecode : '') + '>' + element.pincode + '</option>');
            }
        });
    }
}

function handleStdCodeSelect(dataType) {
    var stdCodeVal = $('[data-type="' + dataType + '-pincode"] option:selected').val().split('-')[1];
    $('[data-type="' + dataType + '-stdcode"]').parents('.textbox-box').addClass('active');
    $('[data-type="' + dataType + '-stdcode"]').empty();
    $('[data-type="' + dataType + '-stdcode"]').append('<option value=' + stdCodeVal + '>' + stdCodeVal + '</option>');
    $('[data-type="' + dataType + '-stdcode"]').parents('.textbox-box').removeClass('textboxerror');
    $('[data-type="' + dataType + '-stdcode"]').next('.error-msgs').text('');
    $('[data-type="' + dataType + '-stdcode"]').removeClass('jsValueOK');
}










/* tsss email api call and logic */
function emailApiCall(template, name, cardType, subject, toEmails, response) {
    var reqObj = {
        "header": {},
        "body": {
            "toEmails": toEmails,
            "templateName": template,
            "subject": subject,
            "templateDetails": {
                "custName": name,
                "cardType": cardType
            }
        }
    };

    tsssLeadGenerateFilterObj.tsssEmail(reqObj).then(function (responseEmail) {
        if (response.response.responseJson.body.SBIResponse) {
            hideLoader()
            var sbiResponseLead = JSON.parse(response.response.responseJson.body.SBIResponse);
            processSBIResponse(sbiResponseLead);
        } else {
            $('#leadIdText').html('Thank you for submitting your application for Tata Cards.');
            $('#leadId').html('');
            $('.success-inner .text16i').html('It is under review. You will receive a call in case your application is eligible for further processing.');
        }
    });
}

function processSBIResponse(sbiResponseLead) {
    var leadRefNo;
    var statusCode;

    if (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse) {
        leadRefNo = sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.leadRefNo;
        statusCode = sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.statusCode;
    } else if (sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID) {
        leadRefNo = sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID.leadRefNo;
        statusCode = sbiResponseLead.SubmitQDEResponse.qdeDetailResponse.duplicateUUID.statusCode;
    }

    if (leadRefNo) {
        if (statusCode == "QDCR") {
            $('#leadIdText').html('Thank you for submitting your application for Tata Cards.');
            $('#leadId').html('Your application reference number is <span id="idSpace">' + leadRefNo + '</span>');
            $('.success-inner .text16i').html('You will receive a call in case your application is eligible for further processing.');
        } else if (statusCode == "FFMP") {
            $('#leadIdText').html('Thank you for submitting your application for Tata Cards via Tata Capital Wealth.');
            $('#leadId').html('Your application reference number is <span id="idSpace">' + leadRefNo + '</span>');
            $('.success-inner .text16i').html('You shall receive a call within 48 working hours for further processing.');
        } else {
            $('#leadIdText').html('Thank you for submitting your application for Tata Cards.');
            $('#leadId').html('');
            $('.success-inner .text16i').html('It is under review. You will receive a call in case your application is eligible for further processing.');
        }
    } else {
        $('.popup-like').addClass('displayNonePopup');
        $('#leadIdPara').html('Thank you for submitting your application for Tata Cards.');
        $('#leadId').html('');
        $('#leadIdQDCR').html('It is under review. You will receive a call in case your application is eligible for further processing.');
    }
}
/* tsss email api call and logic */






/* otp on call api call and logic */
if ($('#wealthTataCard').length > 0) {
    $(".jsOnGetCallButton").click(function () {

        mobilNumber = $('[data-type="otp-send-number"]').val();

        hideOtpModal(mobilNumber);

        var reqObj = createOtpRequestObject(mobilNumber);
        tsssLeadGenerateFilterObj.onCallOtp(reqObj).then(handleOtpResponse).catch(handleOtpFailure);
    });
}

function hideOtpModal(mobilNumber) {
    $('#not-receive-otp-modal').removeClass("popover-show").css("display", "none");
    $("body").removeClass("popover-modal-open");
    $('.modal-backdrop').remove();
    $(".jsGetCalling .semibold").html("+91 " + mobilNumber);
    $(".jsGetCalling").removeClass("d-none");
    $('.jsOnGetCall').addClass("d-none");
}

function createOtpRequestObject(mobilNumber) {
    return {
        "header": {
            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ==",
            "identifier": "nli"
        },
        "body": {
            "mobileNumber": mobilNumber,
            "otpRefNo": otpRefNo,
        }
    };
}

function handleOtpResponse(response) {
    if (response.response.responseJson.header.status.toLowerCase() == 'success' && response.response.responseJson.body.status.toLowerCase() == 'success') {
        setTimeout(() => {
            $(".jsGetCalling").addClass("d-none");
            $(".jsGetOTPSent").removeClass("d-none");
            $('.jsOnGetCallButton').addClass("d-none");
        }, 4000);
    } else if (response.response.responseJson.header.status.toLowerCase() == 'failure' && response.response.responseJson.errorBody.message.toLowerCase() == 'otp expired') {
        handleOtpExpired();
    } else {
        showFailureModal();
    }
}

function handleOtpExpired() {
    showOtpExpiredModal();
}


function showOtpExpiredModal() {
    hideLoader()
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

/* otp on call api call and logic */

