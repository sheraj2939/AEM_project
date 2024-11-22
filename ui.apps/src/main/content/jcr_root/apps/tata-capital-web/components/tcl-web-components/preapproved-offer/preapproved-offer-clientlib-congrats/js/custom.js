$(document).ready(function () {
    var offerData = sessionStorage.getItem("offers");
    var preApprOfferStatus = ''
    if (offerData != null) {
        var offerJson = typeof offerData == "string" ? JSON.parse(offerData) : offerData;
        $('body').addClass('bg-loader');
        $('.loader').removeClass('hide-loader');
        var reqObj = {
            "header": {
                "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="
            },
            "body": {
                "offerId": "Offer-201904799232",
                "product": "Personal Loan"
            }
        }
        preApprovedOffersFilterObj.preApprovedOfferMaster(reqObj).then(function (responseText) {
            if (responseText.status == 'SUCCESS') {
                preApprOfferStatus = responseText.status.toLowerCase();
                $('body').removeClass('bg-loader');
                $('.loader').addClass('hide-loader');
                preapprovedResponse =
                    typeof responseText.response == "object" ? responseText.response : JSON.parse(responseText.response);
                var response = {};
                preapprovedResponse.Master.forEach(function (e) {
                    var newJson = {};
                    var count = 0;
                    newJson["imagePath"] = e.image;
                    Object.keys(e).forEach(function (key) {
                        if (key.includes("bullet-point")) {
                            count++;
                        }
                    });
                    for (var i = 1; i <= count; i++) {
                        newJson["bullet" + i] = e["bullet-point-" + i];
                    }
                    response[e.productname] = newJson;
                });
                if (response != null) {
                    $(".ad-banner-block").html("");
                    var arr = offerJson.records.filter(function (data) {
                        if (data.OfferType__c != "PreQualified") {
                            return data.Status__c === "New";
                        }
                    });
                    arr.forEach(function (obj) {
                        var todayDate = new Date();
                        var offervalidDate = new Date(obj.Valid_Until__c);
                        customerName = obj.Account__r ? obj.Account__r.Name :  obj.Name;
                        var array = customerName.split(" ")[0];
                        customerName = toCapitalise(array);
                        var productOffers = obj.Product__r.Name.toUpperCase();
                        var lowerCaseProductName = productOffers.replace(" ", "").toLowerCase();
                        if (
                            lowerCaseProductName === "homeequity" ||
                            lowerCaseProductName === "consumerdurables" ||
                            lowerCaseProductName === "autoloan" ||
                            lowerCaseProductName === "twowheeler" ||
                            lowerCaseProductName === "personalloan" ||
                            lowerCaseProductName === "businessloan" ||
                            lowerCaseProductName === 'moneyfy'
                        ) {
                            //if (offervalidDate > todayDate) {
                            //if(offervalidDate.toDateString() >= todayDate.toDateString()){
                            if(Date.parse(offervalidDate) >= Date.parse(todayDate)){
                                $(".congratulation-inner .wrapper-inner-content").html(
                                    '<p class="text-center heading36"> Congratulations <span>' + customerName + '</span><p>' +
                                    '<p class="text16i text-center">You have exciting Pre-approved offer(s) from Tata Capital </p>'
                                );
                                if (response[productOffers]) {
                                    var prodArray = productOffers.split(" ");
                                    var productCapitalize = "";
                                    prodArray.forEach(function (prodWord) {
                                        productCapitalize =
                                            productCapitalize +
                                            " " +
                                            prodWord.charAt(0).toUpperCase() +
                                            prodWord.substr(1).toLowerCase();
                                    });
                                    var cardHtml =
                                    '<div class="preapproved-offers-row">' +
                                    '<div class="preapproved-offers-col">' +
                                    '<div class="col-left-content">' +
                                    '<div class="preapproved-image-wrapper">' +
                                    "<img src=" +
                                    response[productOffers]["imagePath"] +
                                    ' alt="" class="offer-dsk-img">' +
                                    "<img src=" +
                                    response[productOffers]["imagePath"] +
                                    ' alt="" class="offer-mob-img">' +
                                    "</div>" +
                                    "</div>" +
                                    '<div class="col-right-content">';

                                    if (productOffers === 'MONEYFY') {
                                        cardHtml += '<h3 class="heading20"><span> Assured Gift voucher of Rs. <span class="offerId" data-offer="' + obj.OfferId__c + '" data-status="' + obj.Status__c + '" data-code="' + productCapitalize.trim() + '">' + obj.Eligible_Amount__c + '</span> /- by simply registering on <span id="productOfferName" class="productLabel">' + productCapitalize.trim() + '</span>!</span></h3>';
                                    }else{
                                        cardHtml += 
                                        '<h3 class="heading20">' +
                                        "Pre-approved <span id='productOfferName' class = 'productLabel'>" + productCapitalize.trim() + '</span> Offer upto &#8377<span class="offerId" data-offer="' + obj.OfferId__c + '" data-status = "' + obj.Status__c + ' "data-code="'+productCapitalize.trim()+'">' + obj.Eligible_Amount__c + '</span>' +
                                        "</span>" +
                                        "</h3>";
                                    }

                                   cardHtml +=  '<ul class="preapproved-points">' +
                                    (response[productOffers]["bullet1"] != "" ? '<li> ' + response[productOffers]["bullet1"] + ' </li>' : '') +
                                    (response[productOffers]["bullet2"] != "" ? '<li>' + response[productOffers]["bullet2"] + '</li>' : '') +
                                    (response[productOffers]["bullet3"] != "" ? '<li>' + response[productOffers]["bullet3"] + '</li>' : '') +
                                    '</ul>' +
                                    '<div class="apply-now-btn-wrapper">' +
                                    '<a href="javascript:void(0)"class="btn-link btn-14 btn-with-card-bg ad-banner-btn-explore-options">' +
                                    "Avail Now" +
                                    "</a>" +
                                    "</div>" +
                                    "</div>" +
                                    "</div>" +
                                    "</div>";

                                      if (productOffers === 'MONEYFY') {
                                        $(".preapproved-offersCongrats.preapproved-offers-inner").append(cardHtml);
                                    } else {
                                        $(".preapproved-offersCongrats.preapproved-offers-inner").prepend(cardHtml);
                                    }
                                }
                            }
                        }
                    });
                    $(".ad-banner-btn-explore-options").click(function (e) {
                        var data = "";
                        var txtProductName = "";
                        var mobileNumber = sessionStorage.getItem("customerMobile");
                        var otpByPass = true;
                        var offerId = $(this).parent().parent().parent().find('span.offerId').attr("data-offer");
                        var productCode = '';
                        var leadID = ''
                        var headingSplit = $(this).parent().parent().children("h3.heading20").children("#productOfferName").text();
                        var offerName = headingSplit;
                        headingSplit.split(" ").forEach(function (word) {
                            var firstLetter = '';
                            firstLetter = word.charAt(0);
                            productCode += firstLetter;
                        });
                        preapprovedoffersApply(offerId,offerName,leadID,productCode,preApprOfferStatus)

                        var jqStatusPopup = $("#offer-window");
                        if (jqStatusPopup) {
                            var jqProductName = $(this).parent().parent().find('#productOfferName');
                            var jqOfferId = $(this).parent().parent().find('.offerId');
                            if (jqProductName && jqProductName.length > 0) {
                                txtProductName = $(this).parent().parent().find('#productOfferName').text();
                              if (txtProductName == 'Moneyfy') {
                                var txtOfferId = e.currentTarget.parentElement.parentElement.childNodes[0].childNodes[0].childNodes[1].dataset.offer;
                               } else {
                                var txtOfferId = e.currentTarget.parentElement.parentElement.childNodes[0].childNodes[3].dataset.offer;
                               }
                            }
                        }
                        if (txtProductName === "Personal Loan") {
                            var encodedUrlPart = base64.encode(
                                "mobileNumber=" + mobileNumber + "&otpBypass=" + otpByPass
                            );
                            var finalUrl = "https://www.tatacapital.com/online/loans/personal-loans/apply-now-personal-loan?sourceName=PreApproved_TAB#!"
                            //var finalUrl = window.osgiConfigObj.jocataPlUrl + encodedUrlPart+"sourceName=PreApproved_TAB#!";
                            window.location.href = finalUrl;
                        } else if (txtProductName === "Business Loan") {
                            var encodedUrlPart = base64.encode(
                                "mobileNumber=" + mobileNumber + "&otpBypass=" + otpByPass
                            );
                            var finalUrl = "https://www.tatacapital.com/online/loans/business-loans/home?sourceName=PreApproved_TAB#!"
                            //var finalUrl = window.osgiConfigObj.jocataBlUrl + encodedUrlPart+"sourceName=PreApproved_TAB#!";
                            window.location.href = finalUrl;
                        }else if (txtProductName === "Moneyfy") {
                            var encodedUrlPart = base64.encode(
                                "mobileNumber=" + mobileNumber + "&otpBypass=" + otpByPass
                            );
                            var finalUrl = "https://app.adjust.com/1cnyeua5?fallback=https%3A%2F%2Fwww.tatacapitalmoneyfy.com%2F&redirect_macos=https%3A%2F%2Fwww.tatacapitalmoneyfy.com%2F"
                            //var finalUrl = window.osgiConfigObj.jocataBlUrl + encodedUrlPart+"sourceName=PreApproved_TAB#!";
                            window.open(finalUrl, '_blank');  
                        } else {
                            $('body').addClass('bg-loader');
                            $('.loader').removeClass('hide-loader');
                            var reqObj = {
                                "header": {
                                    "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="
                                },
                                "body": {
                                    "offerId": txtOfferId,
                                    "product": txtProductName,
                                    "source":"Digital",
                                    "subSource":"PreApproved_TAB"
                                }
                            }
                            preApprovedOffersFilterObj.convertToOpportuinity(reqObj).then(function (response) {
                                if (response.response.responseJson.header.status.toLowerCase() == 'success') {
                                    $('body').removeClass('bg-loader');
                                    $('.loader').addClass('hide-loader');
                                    sessionStorage.removeItem("offers");
                                    $('#subscribe-modal .modal-body-inner .heading36 p').html("Thank you for your interest in Tata Capital Loans");
                                    $('#subscribe-modal .modal-body-inner .text16i p').html("our executives will get in touch with you in next 24 hrs for talking your application ahead");
                                    setTimeout(function () {
                                        $("#subscribe-modal").addClass("popover-show");
                                    }, 80);

                                    $("#subscribe-modal").css("display", "block");
                                    $("body").addClass("popover-modal-open");
                                    $("body").append('<div class="modal-backdrop"></div>');
                                }else{
                                    $("body").removeClass("bg-loader");
                                    $(".loader").addClass("hide-loader");
                                    setTimeout(function () {
                                        $("#failure-modal").addClass("popover-show");
                                      }, 80);
                            
                                      $("#failure-modal").css("display", "block");
                                      $("body").addClass("popover-modal-open");
                                      $("body").append('<div class="modal-backdrop"></div>');
                                }
                            }).catch(function(error){
                                $("body").removeClass("bg-loader");
                                $(".loader").addClass("hide-loader");
                                setTimeout(function () {
                                    $("#failure-modal").addClass("popover-show");
                                  }, 80);
                        
                                  $("#failure-modal").css("display", "block");
                                  $("body").addClass("popover-modal-open");
                                  $("body").append('<div class="modal-backdrop"></div>');
                            })
                        }
                    });
                    $(".customerName").text(customerName);
                    $('#subscribe-modal').find('.icon-close').click(function (e) {
                        getOfferVerify();
                    })
                }
                try {
                    var jsonCall = JSON.parse(sessionStorage.offers);
                    var noofOffers = document.querySelector(".preapproved-offersCongrats").children.length;
                    var leadID = '';
                    var offerId = [];
                    var productArr = [];
                    document.querySelectorAll('#productOfferName').forEach(function (el) {
                        productArr.push(el.innerText)
                    });
                    var prodStr = ''
                    productArr.forEach(function (el) {
                        var str = ''
                        el.split(' ').forEach(function (elem) { str += elem.slice(0, 1)})
                        prodStr += str + ','
                    })
                    var productCode = prodStr.slice(0, prodStr.length - 1);
                    jsonCall.records.forEach(function (data) {
                        offerId.push(data.OfferId__c)
                    });
                    preapprovedoffersLoad(noofOffers, leadID, productCode, offerId.toString());
                } catch(el) {
                    console.log("Element not found",el);
                }
            }
        })
    } else {
        preApprOfferStatus = "failure"
        window.location.href = "/content/tata-capital-web/en/pre-approved-offers/no-offers.html";
    }
});
function toCapitalise(ccParam) {
    return ccParam.split(" ").map(function (el, index) { return el.substr(0, 1).toUpperCase() + el.substr(1).toLowerCase(); }).join(" ");
}

function getOfferVerify() {
    $('body').addClass('bg-loader');
    $('.loader').removeClass('hide-loader');
    var reqObj = {
        "header": {
            "authToken": "MTI4OjoxMDAwMDo6ZDBmN2I4MGNiODIyNWY2MWMyNzMzN2I3YmM0MmY0NmQ6OjZlZTdjYTcwNDkyMmZlOTE5MGVlMTFlZDNlYzQ2ZDVhOjpkdmJuR2t5QW5qUmV2OHV5UDdnVnEyQXdtL21HcUlCMUx2NVVYeG5lb2M0PQ=="
        },
        "body": {
            "mobileNumber": sessionStorage.getItem('customerMobile')
        }
    }
    preApprovedOffersFilterObj.fetchOffers(reqObj).then(function (response) {
        if (response.response.responseJson.header.status.toLowerCase() == "success") {
            var responseData = (typeof (response) !== "object") ? JSON.parse(response) : (response);
            if (responseData.response.responseJson.body.totalSize == 0) {
                $('#preApprovedOfferForm').attr('data-value', 'true');
                window.location.href = "/content/tata-capital-web/en/pre-approved-offers.html";
            }else{
                window.location.href = "/content/tata-capital-web/en/pre-approved-offers/preapproved-offers-congratulations.html"
            }
        }
    })
}
