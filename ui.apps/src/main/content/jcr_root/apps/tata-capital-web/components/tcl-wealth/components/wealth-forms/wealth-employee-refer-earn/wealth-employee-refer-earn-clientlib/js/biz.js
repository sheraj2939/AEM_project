var wealthCustomerParam;
var referralPan;
var wholeMobileNumber;
var rmMobileNumber;

var allEduPincode = {};
if ($(".firstFormPincode").length) {
    $.ajax({
        url: 'https://retail.tatacapital.com/web/api/mdm/export/edu-pincode.json',
        type: "GET",
        async: false,
        success: function (data, status, xhr) {
            var obj = JSON.parse(xhr.responseText);
            allEduPincode = obj.Master;
            var rdcityPopulateArr = []
            $(".rdcity").html();
            // $(".rdcity").append("<option value=''></option>");
            for (var item in obj.Master) {
                if (item < obj.Master.length) {
                    if (rdcityPopulateArr.indexOf(obj.Master[item].city) <= -1) {
                        rdcityPopulateArr.push(obj.Master[item].pincode);
                    }
                }
            }
        },
        error: function () {
            console.log("FAIL");
        }
    })
}

function selectToForms() {
    var $pincodeSelect = $('[data-type="pincode"]');
    var $stateSelect = $('[data-type="state"]');
    var $citySelect = $('[data-type="city"]');
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

    function filterDataAndPopulateSelect(currentState, currentCity, pincodeValue) {
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

        setupSelectValidation(currentState);
        setupSelectValidation(currentCity);
        setupSelect(currentCity);

        $.each(uniqueStatenameArray, function (index, item) {
            currentState.append($('<option>').text(item).val(item));
        });

        $.each(uniquecitynameArray, function (index, item) {
            currentCity.append($('<option>').text(item).val(item));
        });
    }
    function setupSelect(selectElement, placeholder = 'Select', allowClear = false) {
        selectElement.empty().select2({
            placeholder: placeholder,
            allowClear: allowClear
        });
    }
    function setupSelectValidation($select) {
        $select.empty();
        $select.parents('.textbox-box').addClass("active");
    }
    $pincodeSelect.each(function () {
        var $currentSelect = $(this);

        $currentSelect.on('select2:open', function (e) {
            const select2Dropdown = $currentSelect.data('select2').dropdown.$dropdown[0];
            const searchInput = select2Dropdown.querySelector('.select2-search__field');
            let previousValue = '';

            searchInput.addEventListener('input', function () {
                const userInput = searchInput.value;
                previousValue = userInput;

                if (userInput.trim() !== '') {
                    const matchingData = yourFilterFunction(userInput);

                    if (matchingData.length > 0) {
                        $currentSelect.empty();
                        $currentSelect.attr("data-placeholder", "Select");
                        matchingData.unshift({ id: '', text: '' });
                        $currentSelect.select2({ data: matchingData });
                        $currentSelect.trigger('change.select2');
                        $currentSelect.trigger('change');
                        $currentSelect.select2('open');
                    } else {
                        $currentSelect.empty().attr("data-placeholder", "Select").select2({});
                        $currentSelect.attr("data-placeholder", "Select").select2('open');
                    }
                }

                const scrollTop = select2Dropdown.scrollTop;
                select2Dropdown.scrollTop = scrollTop;

                $('.select2-search__field').val(previousValue);
                $('.select2-search__field').focus();
            });
        });

        $currentSelect.on('select2:select', function (e) {
            var selectPinCode = $currentSelect.val().trim();
            var currentState = $currentSelect.parent().closest('.row-col-33').next().next().find('[data-type="state"]');
            console.log(currentState);
            var currentCity = $currentSelect.parent().closest('.row-col-33').next().find('[data-type="city"]');
            filterDataAndPopulateSelect(currentState, currentCity, selectPinCode);
        });
    });

}
function getEmployeeDataApiCall(wealthEmployeeParam) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/content/tata-capital/mdm.wealth-existing-employee.json?" + wealthEmployeeParam,
            async: true,
            contentType: "application/json",
            dataType: 'json',
            success: function (res) {
                resolve(res)
            },
            failure: function (res) {
                reject(res)
            }
        })
    })
}

function getEmployeeReferreeDataApiCall(wealthEmployeeReferrerOriginalData) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: "/content/tata-capital/mdm.wealth-refer-employee.json",
            data: JSON.stringify(wealthEmployeeReferrerOriginalData),
            async: true,
            contentType: "application/json",
            dataType: 'json',
            success: function (res) {
                resolve(res)
            },
            failure: function (res) {
                reject(res)
            }
        })
    })
}
function getEmpRmCode(wm_em_empid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "/content/tata-capital/mdm.wm-rm-emp.json?" + wm_em_empid,
            async: true,
            contentType: "application/json",
            dataType: 'json',
            success: function (res) {
                resolve(res)
            },
            failure: function (res) {
                reject(res)
            }
        })
    })
}
function getCustomerDataApiCallverifyMobile(number, error_message, element) {
    showLoader()
    var queryParams = "?mobile-no=" + number;
    //number = "723262";
    var wealthEmployeeParam = "empId=" + number
    var reqObj = {};

    //wealthReferEarnFilterObj.wealthReferearnExistingCustomer(reqObj, queryParams)
    getEmployeeDataApiCall(wealthEmployeeParam)
        .then(function (response) {

            var parsedResponse = (typeof response === 'object') ? response.Master : JSON.parse(response).Master;
            if (parsedResponse.length !== 0 && number === parsedResponse[0].empid.trim()) {

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
    var formattedNumber = responseData['employeemobile']

    wholeMobileNumber = responseData['employeemobile'];
    //rmMobileNumber = responseData['rm-mobile-no'];
    //referralPan = responseData.pan;
    /*     $('#mobileVerifyForm').find('.mobileSuccessForm .getNumber').val('').text(formattedNumber);
        $('#mobileVerifyForm').find('.mobileSuccessForm .getId').val('').text(responseData['empid']);
        $('#mobileVerifyForm').find('.mobileSuccessForm .referreName span').val('').text(responseData['empname']);
        $('#mobileVerifyForm').find('.mobileSuccessForm .referreEmail').val('').text(responseData["employeeemail"]); */

    $('#mobileVerifyForm').find('.mobileSuccessForm .WlEmpName').text(responseData['empname']);
    $('#mobileVerifyForm').find('.mobileSuccessForm .empName').text(responseData['empname']);
    $('#mobileVerifyForm').find('.mobileSuccessForm .employeeemail').text(responseData['employeeemail']);
    $('#mobileVerifyForm').find('.mobileSuccessForm .empUnit').text(responseData['businessunit']);
    $('#mobileVerifyForm').find('.mobileSuccessForm .subVertical').text(responseData['businesssubvertical']);
    $('#mobileVerifyForm').find('.mobileSuccessForm .vertical').text(responseData['businessvertical']);
    $('#mobileVerifyForm').find('.mobileSuccessForm .empDesignation').text(responseData['designation']);
    $('#mobileVerifyForm').find('.mobileSuccessForm .empDepartment').text(responseData['department']);
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
    $(element).parents('#mobileVerifyForm').find('[data-type="empmobile"]').next('.error-msgs').remove();
    $(element).parents('#mobileVerifyForm').find('[data-type="empmobile"]').parents('.form-textbox-new').addClass('textboxerror');
    $(element).parents('#mobileVerifyForm').find('[data-type="empmobile"]').after('<span class="error-msgs">' + error_message + '</span>');
}




async function ReferringReferredRmApiCall() {
    try {
        showLoader();

        const referreRequestObject = createRequestObject(wholeMobileNumber, "sms-wealth-whatsapp-referring");
        const referreResponse = await wealthReferEarnFilterObj.wealthReferringReferredRm(referreRequestObject);

        if (referreResponse.status.toLowerCase() === "success") {
            /*const rmRequestObject = createRequestObject(rmMobileNumber, "sms-wealth-whatsapp-relationship-manager");
            const rmResponse = await wealthReferEarnFilterObj.wealthReferringReferredRm(rmRequestObject);*/

            if (referreResponse.status.toLowerCase() === "success") {
                const wealthReferrerOriginalData = await processReferrerData();
                //const referralResponse = await wealthReferEarnFilterObj.referralCustomer(wealthReferrerOriginalData);
                const referralResponse = await getEmployeeReferreeDataApiCall(wealthReferrerOriginalData)

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
        "empid": $('#mobileVerifyForm').find('.mobileSuccessForm .referreName span').text(),
        "empname": $('#mobileVerifyForm').find('.mobileSuccessForm .empName').text(),
        "referralName": $('#mobileVerifyForm').find('.mobileSuccessForm .empName').text(),
        "emp-designation": $('#mobileVerifyForm').find('.mobileSuccessForm .empDesignation').text(),
        "emp-businessunit": $('#mobileVerifyForm').find('.mobileSuccessForm .empUnit').text(),
        "emp-businessvertical": $('#mobileVerifyForm').find('.mobileSuccessForm .vertical').text(),
        "emp-businesssubvertical": $('#mobileVerifyForm').find('.mobileSuccessForm .subVertical').text(),
        "emp-department": $('#mobileVerifyForm').find('.mobileSuccessForm .empDepartment').text(),
        "employeemobile": $('#mobileVerifyForm').find('.mobileSuccessForm .employeemobile').text(),
        "employeeemail": $('#mobileVerifyForm').find('.mobileSuccessForm .employeeemail').text(),
        "firstname": $row.find('input[data-type="firstname"]').val(),
        "lastname": $row.find('input[data-type="lastname"]').val(),
        "emailid": $row.find('input[data-type="email"]').val(),
        "mobileno": $row.find('input[data-type="mobile"]').val(),
        "city": $row.find('select[data-type="city"]').val(),
        "state": $row.find('select[data-type="state"]').val(),
        "pincode": $row.find('select[data-type="pincode"]').val(),
        "product": $row.find('input[data-type="product"]').val(),
        "category": $row.find('input[data-type="category"]').val(),
        "date": $row.find('input[data-type="date"]').val(),
        "backgrounddetail": $row.find('input[data-type="background"]').val()
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

function employeeCodeEvent(code_element) {
    $(code_element).keyup(function () {
        var codeElValue = $(this);
        if ($(this).val() != '') {
            if ($(this).val().length === 6) {
                var empName = 'wealth-rm-emp-code=' + $(this).val();
                getEmpRmCode(empName).then(function (response) {
                    if (response.Master.length != 0) {
                        $(codeElValue).parents('.row-col-33').find('.form-textbox-new').removeClass('textboxerror');
                        // $('[data-type="wm-rm-name"]').parent().addClass('active');
                        $(codeElValue).parents('.row-col-33').next().find($('[data-type="wm-rm-name"]')).parents('.form-textbox-new').addClass('active');
                        $(codeElValue).parents('.row-col-33').next().find($('[data-type="wm-rm-name"]')).val(response.Master[0]['wealth-rm-emp-name']);
                    } else {
                        $(codeElValue).parents('.row-col-33').find('.form-textbox-new').addClass('textboxerror');
                        $(codeElValue).next('.error-msgs').text('Manger id invalid');
                        // $('[data-type="wm-rm-name"]').val('');
                        $(codeElValue).parents('.row-col-33').next().find($('[data-type="wm-rm-name"]')).val('');
                        $(codeElValue).parents('.row-col-33').next().find($('[data-type="wm-rm-name"]')).parents('.form-textbox-new').removeClass('active');
                        // $('[data-type="wm-rm-name"]').parent().removeClass('active');
                    }
                })
            }
        } else {
            $(codeElValue).parents('.row-col-33').find('.form-textbox-new').removeClass('textboxerror');
            $(codeElValue).parents('.row-col-33').next().find($('[data-type="wm-rm-name"]')).val('');
            $(codeElValue).parents('.row-col-33').next().find($('[data-type="wm-rm-name"]')).parents('.form-textbox-new').removeClass('active');
            $(codeElValue).next('.error-msgs').text('');
        }
    })
}
employeeCodeEvent($('[data-type="wm-rm-code"]'));