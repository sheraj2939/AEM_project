if (localStorage.getItem("moeCount") == null) {
    localStorage.setItem("moeCount", 1);
}
function onload_openMoengagemodal() {
    if (jsHelper.isDef(window.Notification)) {
        if (Notification.permission !== "granted" && Notification.permission !== "denied") {
            if (parseInt(localStorage.getItem("moeCount")) < 3) {
                var url = window.location.href;
                if ($('#notification-modal').length > 0) {
                    $('body').append('<div class="modal-backdrop"></div>');
                    $('body').addClass('modal-open');
                    $('#notification-modal').addClass('popover-show');
                    $('#notification-modal').css("display", "block");
                }

                if (localStorage.getItem("moeCount") !== null) {
                    var moeCountIndex = parseInt(localStorage.getItem("moeCount"));
                    moeCountIndex++;
                    localStorage.setItem("moeCount", moeCountIndex);
                }

                $('.js-notificationclose').click(function (event) {
                    $('body').removeClass('modal-open');
                    $('body').find('#notification-modal').removeClass('popover-show');
                    $('#notification-modal').css("display", "none");
                    $('.modal-backdrop').remove();
                });
                var Moengage = moe({
                    app_id: window.osgiConfigObj.appIdMoengage,
                    debug_logs: parseInt(window.osgiConfigObj.debugLogMoengage),
                    swPath: "/service-worker.js",
                    cluster: "DC_3"
                });
                /*var Moengage = moe({
                    app_id: "YYPOH2RMX16ENTH66KE9LJ9O_DEBUG",
                    debug_logs: 1,
                    swPath: "/service-worker.js",
                    cluster: "DC_3"
                });*/
                Moengage.call_web_push({
                    "soft_ask": true,
                    "main_class": "moe-main-class",
                    "allow_class": "moe-allow-class",
                    "block_class": "moe-block-class"
                });
                Notification.requestPermission().then(function () {
                    $('body').removeClass('modal-open');
                    $('body').find('#notification-modal').removeClass('popover-show');
                    $('#notification-modal').css("display", "none");
                    $('.modal-backdrop').remove();
                });

                if ($(window).width() > 768) {
                    $('.push-msg').removeClass('hidden');
                } else {
                    $('body').removeClass('modal-open');
                    $('body').find('.push-msg').removeClass('popover-show');
                    $('.modal-backdrop').remove();
                }
            }
        }
    }
}
$(document).ready(function () {
    var name;
   /* $('[data-header="headerAnalyticData-Header Menu Section"]').each(function (e, i) {
        if (i.textContent.trim().toLowerCase() == "offers") {
            if (domUtils.getCookie('userLoggedIn') == "true" && localStorage.getItem('cData')) {
                i.classList.add('signInOffer');
                i.classList.remove('signOutOffer');
            } else {
                i.classList.add('signOutOffer');
                i.classList.remove('signInOffer');
            }
        }
    })*/

    if (domUtils.getCookie('userLoggedIn') == "true" && localStorage.getItem('cData')) {
        $('[data-header]:contains("Offers")').addClass('signInOffer');
        $('[data-header]:contains("Offers")').removeClass('signOutOffer');
    } else {
        $('[data-header]:contains("Offers")').addClass('signOutOffer');
        $('[data-header]:contains("Offers")').removeClass('signInOffer');
    }
    

    $('[data-header]:contains("Offers")').click(function(ele){
       if(ele.currentTarget.classList.contains('signInOffer')){
        var email = $(".avatar-email").text();
        name = $(".avatar-name").text();
        $('.lookings-offers .text14i').text(email)
        $('.modal-backdrop').remove();
        setTimeout(function () {
            $('#offers-modal').addClass('popover-show');
        }, 80);
    
        $('#offers-modal').css('display', 'block');
        $('body').addClass('popover-modal-open');
        $('body').append('<div class="modal-backdrop"></div>');
    
        setTimeout(function () {
            $('.modal-animation-wrap .popover-top-heads').removeClass('translate-top');
        }, 500);
    
        setTimeout(function () {
            $('.modal-animation-wrap .offer-icon').removeClass('translate-scale');
        }, 600);
    
        setTimeout(function () {
            $('.modal-animation-wrap .lookings-offers .offer-user-details').removeClass('fade-in');
        }, 1000);
    
        setTimeout(function () {
            $('.modal-animation-wrap .lookings-offers .offers-loader').removeClass('fade_in');
        }, 1100);
    
    
        setTimeout(function () {
            $('.modal-animation-wrap .lookings-offers .offers-loader').addClass('d-none');
            var reqObj = {
                header: {
                    authToken:
                        "fththjhj",
                },
                body: {
                    emailId: email,
                },
            };
            googleOfferPopupFilterObj.fetchOffers(reqObj).then(function (response) {
                if (response.response.responseJson.header.status.toLowerCase() == "success") {
                    var responseObj = response.response.responseJson.body;
                    if (responseObj.totalSize > 0) {
                        var count = 0
                        for (var i = 0; i < responseObj.totalSize; i++) {
                            var productName = responseObj.records[i].Product__r.Name;
                            var offerType = responseObj.records[i].OfferType__c;
                            var lowerCaseProductName = productName.replace(" ", "").toLowerCase();
                            
                            if (lowerCaseProductName === "homeequity" || lowerCaseProductName === "consumerdurables" || lowerCaseProductName === "autoloan" || lowerCaseProductName === "twowheeler" || lowerCaseProductName === "personalloan" || lowerCaseProductName === "businessloan") {
                                if (offerType != "PreQualified") {
                                    count++;
                                }
                            }
                        }
                        if (count > 0) {
                            sessionStorage.setItem("offers", typeof responseObj === "object" ? JSON.stringify(responseObj) : responseObj);
                            sessionStorage.setItem("customerEmail",email);
                            document.location.href = "/content/tata-capital-web/en/pre-approved-offers/preapproved-offers-congratulations.html";
                            $("#preapproved-offer-otp").addClass("d-none");
                            $("#js-preapprovepffer-loan").removeClass("d-none");
                        } else {
                            document.location.href = "/content/tata-capital-web/en/pre-approved-offers/no-offers.html";
                            sessionStorage.setItem("customerName",name);
                            sessionStorage.setItem("customerEmail",email);
                        }
                    }else{
                        document.location.href = "/content/tata-capital-web/en/pre-approved-offers/no-offers.html";
                        sessionStorage.setItem("customerName",name);
                        sessionStorage.setItem("customerEmail",email);
                    }
                } else {
                    $("body").removeClass("bg-loader");
                    $(".loader").addClass("hide-loader");
                    setTimeout(function () {
                        $("#failure-modal").addClass("popover-show");
                      }, 80);
            
                      $("#failure-modal").css("display", "block");
                      $("body").addClass("popover-modal-open");
                      $("body").append('<div class="modal-backdrop"></div>');
                }
            })
                .catch(function (error) {
                    console.error(error);
                    $("body").removeClass("bg-loader");
                    $(".loader").addClass("hide-loader");
                    setTimeout(function () {
                        $("#failure-modal").addClass("popover-show");
                      }, 80);
            
                      $("#failure-modal").css("display", "block");
                      $("body").addClass("popover-modal-open");
                      $("body").append('<div class="modal-backdrop"></div>');
                });
        }, 2500);
       }else if(ele.currentTarget.classList.contains('signOutOffer')){
        document.location.href = "/content/tata-capital-web/en/pre-approved-offers.html";
       }
    })
});