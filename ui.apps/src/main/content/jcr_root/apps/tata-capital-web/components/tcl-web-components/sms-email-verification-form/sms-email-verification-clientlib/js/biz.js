$('#sms-email-verification-form').ready(function () {
    var urlParams = extractURLParams();
    var emailID = urlParams?.emailid;
    var mobileNo = urlParams?.mobileno;
    if ((emailID || mobileNo)) {
        $("body").addClass("bg-loader");
        $(".loader").removeClass("hide-loader");
        var reqObj = {
            header: { authToken: "MTI4OjoxMDAwMDo6YmI0YWM0OTg5NGE5Yjc2NzYyZDdmMDFmNDAzMDU0Nzk6OjJlNjVhNGNkNWFkZTlhYWM1MDY2NGNmNTRiZWEwN2U1OjpkYnF6Q2R3ajJIUzBLQ1J5ZE52Nmo0ZmtwRmxmUzZFNlIwRWk3OWx6TzNvPQ==" },
            body: { emailId: emailID, mobileNumber: mobileNo }
        };
        dataEnrichmentFilterObj.dataEnrichmentFetch(reqObj).then(function (response) {
            if (response.response.responseJson.header.status.toLocaleLowerCase() == 'success' && response.response.responseJson.body.data.length > 0) {
                $("body").removeClass("bg-loader");
                $(".loader").addClass("hide-loader");
                var resUserData = response.response.responseJson.body.data;
                resUserData.forEach(function (data) {
                    $('[name="mobileInput"]').val(data.mobileNo);
                    $('[name="emailInput"]').val(data.emailId);
                    /*document.querySelector('input[name="mobile"][value="' + data.isMobileConfirmed + '"]').checked = true;
                    document.querySelector('input[name="email"][value="' + data.isEmailConfirmed + '"]').checked = true;*/
                });

            } else {
                showModal("#invalid-emailMobile");
            }

        }).catch(function (error) {
            showModal("#failure-modal");
        });

    } else {
        showModal("#invalid-emailMobile");
    }


    $('.jsLangCommunication').on('click', function () {
        $("body").addClass("bg-loader");
        $(".loader").removeClass("hide-loader");
        var reqObjUpdate = {
            header: { authToken: "MTI4OjoxMDAwMDo6YmI0YWM0OTg5NGE5Yjc2NzYyZDdmMDFmNDAzMDU0Nzk6OjJlNjVhNGNkNWFkZTlhYWM1MDY2NGNmNTRiZWEwN2U1OjpkYnF6Q2R3ajJIUzBLQ1J5ZE52Nmo0ZmtwRmxmUzZFNlIwRWk3OWx6TzNvPQ==" },
            body: {
                emailId: $('[name="emailInput"]').val(),
                mobileNumber: $('[name="mobileInput"]').val(),
                isEmailConfirmed: $('[name="email"]:checked').val(),
                isMobileConfirmed: $('[name="mobile"]:checked').val()
            }
        };

        dataEnrichmentFilterObj.dataEnrichmentUpdate(reqObjUpdate).then(function (response) {
            if (response.response.responseJson.header.status.toLocaleLowerCase() == 'success' && response.response.responseJson.body.status == true) {
                if($('input[name="mobile"]:checked').val() == 'N' || $('input[name="email"]:checked').val() == "N"){
                    showModal("#update-modal");
                }else{
                showModal("#thankyou-modal", $('[name="emailInput"]').val(), $('[name="mobileInput"]').val());
                }

            } else {
                showModal("#failure-modal");
            }

        }).catch(function (error) {
            showModal("#failure-modal");
        });
    })
});

function extractURLParams() {
    try {
        const query = location.href.split("?")[1];
        return query ? getURLParams(atob(query)) : null;
    } catch (e) {
        console.error("Failed to decode or parse URL parameters:", e);
        return null;
    }
}

function getURLParams(query) {
    return query.split("&").reduce((params, pair) => {
        const [key, val] = pair.split("=");
        params[key] = val;
        return params;
    }, {});
}
function showModal(modalID, email = "", mobile = "") {
    if (productCodeId == 'DE') {
        setTimeout(() => $(modalID).addClass("popover-show"), 80);
        $(modalID).css("display", "block");
        $("body").removeClass("bg-loader");
        $(".loader").addClass("hide-loader");
        $("body").addClass("popover-modal-open").append('<div class="modal-backdrop"></div>');
        if (email) $('#popup-email').text(email);
        if (mobile) $('#popup-number').text(mobile);
    }
}

$(".jsClearLangComm").click(function () {
    $('#sms-email-verification-form .list-radio-li input').prop("checked", false);
    $('#sms-email-verification-form .list-radio-li:first-child input').prop("checked", true);
});