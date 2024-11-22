var wealthCustomerParam;
var referralPan;
var wholeMobileNumber;
var rmMobileNumber;

function getCustomerDataApiCallverifyMobile(number, error_message, element) {
    showLoader()
    var queryParams = "?mobile-no=" + number;
    var reqObj = {};
    wealthReferEarnFilterObj.wealthReferearnExistingCustomer(reqObj, queryParams)
        .then(function (response) {
            var parsedResponse = (typeof response.response === 'object') ? response.response.Master : JSON.parse(response.response).Master;
            if (parsedResponse.length !== 0 && number === parsedResponse[0]['mobile-no']) {
                handleSuccessForm(parsedResponse[0], element);
            } else {
                handleFormError(error_message, element)
            }
        })
        .catch(function (error) {
            console.log(error);
            showFailureModal()
        });
}

function getCustomerDataApiCallverifyPan(panvalue, error_message, element) {
    showLoader()
    var queryParams = "?pan=" + panvalue;
    var reqObj = {};
    wealthReferEarnFilterObj.wealthReferearnExistingCustomer(reqObj, queryParams)
        .then(function (response) {
            var parsedResponse = (typeof response.response === 'object') ? response.response.Master : JSON.parse(response.response).Master;
            if (parsedResponse.length !== 0 && panvalue === parsedResponse[0]['pan']) {
                handleSuccessForm(parsedResponse[0], element);
            } else {
                handleFormError(error_message, element)
            }
        })
        .catch(function (error) {
            console.log(error);
            showFailureModal()
        });
}

function handleSuccessForm(responseData, element) {
    hideLoader()
    var next_fs = $(element).data('next');
    $(element).parents('.form-wizard').find('.form-step').addClass('hidden');
    $(element).parents('#mobileVerifyForm').find('#' + next_fs).removeClass('hidden');
    var formattedNumber = responseData['mobile-no'].toString().replace(/\B(?=(\d{5})+(?!\d))/g, " ");
    wholeMobileNumber = responseData['mobile-no'];
    rmMobileNumber = responseData['rm-mobile-no'];
    referralPan = responseData.pan;
    $('#mobileVerifyForm').find('.mobileSuccessForm .getNumber').val('').text(formattedNumber);
    $('#mobileVerifyForm').find('.mobileSuccessForm .referreName span').val('').text(responseData['customer-name']);
    $('#mobileVerifyForm').find('.mobileSuccessForm .referreEmail').val('').text(responseData.email);
    $('.page-disabled').addClass('hidden');
    $('.checkBox-error').find('.pointer-none').removeClass('pointer-none');
    setTimeout(function () {
        $('html, body').animate({
            scrollTop: $("#ScrollElement").offset().top - 65
        }, 500);
    }, 100);
    $('#add-moreform').find('.input-textbox').val('');
    $('#add-moreform').find('.form-textbox-new').removeClass('textboxerror');
    $('#add-moreform').find('.form-textbox-new').removeClass('active');
    $('#add-moreform .form-textbox-new').find('.error-msgs').text('');
}

function handleFormError(error_message, element) {
    hideLoader()
    $(element).parents('#mobileVerifyForm').find('[data-type="mobile"], [data-type="pan-number"]').next('.error-msgs').remove();
    $(element).parents('#mobileVerifyForm').find('[data-type="mobile"], [data-type="pan-number"]').parents('.form-textbox-new').addClass('textboxerror');
    $(element).parents('#mobileVerifyForm').find('[data-type="mobile"], [data-type="pan-number"]').after('<span class="error-msgs">' + error_message + '</span>');
}




async function ReferringReferredRmApiCall() {
    try {
        showLoader();

        const referreRequestObject = createRequestObject(wholeMobileNumber, "sms-wealth-whatsapp-referring");
        const referreResponse = await wealthReferEarnFilterObj.wealthReferringReferredRm(referreRequestObject);

        if (referreResponse.status.toLowerCase() === "success") {
            const rmRequestObject = createRequestObject(rmMobileNumber, "sms-wealth-whatsapp-relationship-manager");
            const rmResponse = await wealthReferEarnFilterObj.wealthReferringReferredRm(rmRequestObject);

            if (rmResponse.status.toLowerCase() === "success") {
                const wealthReferrerOriginalData = await processReferrerData();
                const referralResponse = await wealthReferEarnFilterObj.referralCustomer(wealthReferrerOriginalData);

                if (referralResponse.status.toLowerCase() === "success") {
                    handleSuccess();
                } else {
                    showFailureModal();
                }
            } else {
                showFailureModal();
            }
        } else {
            showFailureModal();
        }
    } catch (error) {
        console.error(error);
        showFailureModal();
    } finally {
        hideLoader();
    }
}

function createRequestObject(mobileNumber, templateName) {
    return {
        "header": {
            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="
        },
        "body": {
            "mobileNumber": mobileNumber,
            "templateName": templateName,
            "templateJson": {
                "name": $('.referreName span').text().trim()
            }
        }
    };
}

async function processReferrerData() {
    const wealthReferrerOriginalData = { "Master": [] };
    const formRows = $('#add-moreform .form-row');

    for (let index = 0; index < formRows.length; index++) {
        const value = formRows[index];
        const referredRequestObject = createRequestObject($(value).find('input[data-object="referrer"]').val(), "sms-wealth-whatsapp-referred");
        referredRequestObject.body.mobileNumber = $(value).find('input[data-object="referrer"]').val();
        const wealthReferrerData = createReferrerDataObject($(value));
        wealthReferrerOriginalData.Master.push(wealthReferrerData);
        const res = await wealthReferEarnFilterObj.wealthReferringReferredRm(referredRequestObject);
        if (res.status.toLowerCase() !== "success") {
            throw new Error("Referrer data processing failed.");
        }
    }

    return wealthReferrerOriginalData;
}

function createReferrerDataObject($row) {
    return {
        "referralname": $('#mobileVerifyForm').find('.mobileSuccessForm .referreName span').text(),
        "referralemail": $('#mobileVerifyForm').find('.mobileSuccessForm .referreEmail').text(),
        "referralmobile": wholeMobileNumber,
        "referralpanno": referralPan,
        "referreefirstname": $row.find('input[data-type="firstname"]').val(),
        "referreelastname": $row.find('input[data-type="lastname"]').val(),
        "referreeemail": $row.find('input[data-type="email"]').val(),
        "referreemobile": $row.find('input[data-type="mobile"]').val(),
        "referreecity": $row.find('select[data-type="city"]').val()
    };
}

function handleSuccess() {
    $('#add-moreform .form-textbox-new').removeClass('active');
    $('#add-moreform .form-textbox-new .input-textbox').val('');
    $('#add-moreform .js-select2').parents('.form-textbox-new').removeClass('textboxerror');
    $('#add-moreform .js-select2').next('.error-msgs').remove();
    $('#add-moreform .js-select2').val(null).trigger('change');
    $('.jsReferTopMatch').addClass('hidden');
    $('.jsReferFornss').addClass('hidden');
    $('.jsReferThankyou').removeClass('hidden');
    setTimeout(function () {
        $('html, body').animate({
            scrollTop: $("#ScrollElement").offset().top - 65
        }, 500);
    }, 100);
}


if ($('#ScrollElement [data-type="city"]').length > 0) {
    cityMasterReferEarnForm('WEALTH ADVISORY');
}

function cityMasterReferEarnForm(productName) {
    productCodeId = productName;
    productName = "?product=" + productCodeId;
    if ($('[data-type="city"]').length > 0) {
        var reqObj = {}
        wealthReferEarnFilterObj.cityMasterWealth(reqObj, productName).then(function (response) {
            if (response.status == "SUCCESS") {
                $("body").removeClass("bg-loader");
                $(".loader").addClass("hide-loader");
                var objCity = response.response;
                var mainObj = {};
                for (var item of objCity.Master) {
                    var subObj = mainObj[item.product] || { productName: item['product-name'], cities: [] };
                    subObj.cities.push(item.city);
                    mainObj[item.product] = subObj;
                }
                var productCode = productCodeId;
                $('[data-type="city"]').html('');
                $('[data-type="city"]').append("<option value=''></option>");
                if (['residential', 'business', 'home'].includes(productCode)) {
                    productCode = "WEALTH ADVISORY";
                }
                if (productCode == "nri") {
                    productCode = "WM-NRI";
                }
                var selectedCities = mainObj[productCode]?.cities || [];
                if (selectedCities.length > 0) {
                    selectedCities.forEach(function (element) {
                        $('[data-type="city"]').append(`<option value="${element}">${element}</option>`);
                    });
                } else {
                    console.log("CSV City issue");
                }
            }
        }).catch(function (error) {
            console.error(error);
        });
    }
}


function addMoreCityAppend() {
    var firstCity = $('.firstFormCity option');
    $.each(firstCity, function (indexInArray, valueOfElement) {
        var option = $(valueOfElement).html().trim();
        $('.addMoreCity').append(`<option value="${option}">${option}</option>`);
    });
}