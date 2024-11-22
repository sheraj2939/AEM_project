(function (_global) {
    // try catch added
    try{
    var googleSignInBizCallFn = (function (jsHelper) {

        var googleSignInBizObj = {};

        /*var gcIDUrl = '1052994805000-u5vabr2ibtfgu726ova8cjsnb5vgqamu.apps.googleusercontent.com';*/
    /*For Desktop code Start*/
    window.addEventListener("load", function () {
        (function () {
            var flag = false;
            $(document).on("mousemove", function () {
                if (!flag) {
                    flag = true;
                    setTimeout(function () {
                        var googleAccountScript = document.createElement("script");
                        googleAccountScript.src = "https://accounts.google.com/gsi/client";
                        var googleApiScript = document.createElement("script");
                        googleApiScript.src = "https://apis.google.com/js/platform.js?onload=init";
                        var body = document.getElementsByTagName("body")[0];
                        body.parentNode.insertBefore(googleAccountScript, body);
                        body.parentNode.insertBefore(googleApiScript, body);
                        googleAccountScript.onload = function () {
                            console.log('googleAccountScript called');
                            console.log('googleApiScript called');
                            var g_Skipped = localStorage.getItem('g_Skipped');
                            if (g_Skipped == null || g_Skipped == undefined) {
                                console.log('before init google');
                                initGoogle(true);
                            } else {
                                //onload_openmodal();
                                //onload_openMoengagemodal();
                                bewareFradsModal()
                            }
                            googleApiScript.onload = function () {
    
                            }
                        }
                    }, 100);
                }
            });
        })();
    });
    /*For Desktop code End*/
    
    /*For Mobile code Start*/
    window.addEventListener("load", function () {
        (function () {
            var flag = false;
            document.addEventListener("touchstart", function () {
                setTimeout(function () {
                    if (!flag) {
                        flag = true;
                        var googleAccountScript = document.createElement("script");
                        googleAccountScript.src = "https://accounts.google.com/gsi/client";
                        googleAccountScript.async = true;
                        googleAccountScript.defer = true;
                        var googleApiScript = document.createElement("script");
                        googleApiScript.src = "https://apis.google.com/js/platform.js?onload=init";
                        googleApiScript.async = true;
                        googleApiScript.defer = true;
                        var body = document.getElementsByTagName("body")[0];
                        body.parentNode.insertBefore(googleAccountScript, body);
                        body.parentNode.insertBefore(googleApiScript, body);
                        googleAccountScript.onload = function () {
                            var g_Skipped = localStorage.getItem('g_Skipped');
                            if (g_Skipped == null || g_Skipped == undefined) {
                                initGoogle(true);
                            } else {
                                //onload_openmodal();
                               // onload_openMoengagemodal();
                               bewareFradsModal()
                            }
                        }
                    }
                }, 100);
            });
        })();
    });
    /*For Mobile code End*/

        $(document).ready(function(){
            $('.login-search-wrap').click(function(){
                $("body").find(".header-inner").removeClass('backdrops')
            })
            document.getElementById('js-google-signin').addEventListener('click', function() {
                gapi.load('auth2', function() {
                    let obj = {
                        //client_id: '1052994805000-u5vabr2ibtfgu726ova8cjsnb5vgqamu.apps.googleusercontent.com'
                        client_id: gcIDUrl
                    }
                    var auth = gapi.auth2.init(obj);
                    auth.signIn().then(function(res){
                        console.log(res)
                        var queryParams = getQueryParamsFn();
                        var reqObj = {
                            "header": {
                                "authToken": ""
                            },
                            "body": {
                                "emailId": res.getBasicProfile().getEmail(),
                                "firstName": res.getBasicProfile().getGivenName(),
                                "lastName": res.getBasicProfile().getFamilyName(),
                                "profilePic": res.getBasicProfile().getImageUrl(),
                                "source": queryParams ? queryParams.source : 'google'
                            }
                        }
                        storeDataApiCall(reqObj);
                    }).catch(function(err){
                        console.log(err)
                    })
                });
            })
            var customerData = localStorage.getItem('cData') ? JSON.parse(localStorage.getItem('cData')) : '';
            var user_login = domUtils.getCookie('userLoggedIn');
            if (user_login == "" || user_login == undefined) {
        
                document.getElementById('js-google-signin').addEventListener('click', function() {
                    gapi.load('auth2', function() {
                        let obj = {
                            //client_id: '1052994805000-u5vabr2ibtfgu726ova8cjsnb5vgqamu.apps.googleusercontent.com'
                            client_id: gcIDUrl
                        }
                        var auth = gapi.auth2.init(obj);
                        auth.signIn().then(function(res) {
                            console.log(res)
                            var queryParams = getQueryParamsFn();
                            var reqObj = {
                                "header": {
                                    "authToken": ""
                                },
                                "body": {
                                    "emailId": res.getBasicProfile().getEmail(),
                                    "firstName": res.getBasicProfile().getGivenName(),
                                    "lastName": res.getBasicProfile().getFamilyName(),
                                    "profilePic": res.getBasicProfile().getImageUrl(),
                                    "source": queryParams ? queryParams.source : 'google'
                                }
                            }
                            storeDataApiCall(reqObj);
                        }).catch(function(err) {
                            console.log(err)
                        })
                    });
                })
        
            } else {
                var customerData = localStorage.getItem('cData') ? JSON.parse(localStorage.getItem('cData')) : '';
                    if (customerData != '') {
                        $('#google-signout').find('.avatar-name').text(customerData.body.firstName + ' ' + customerData.body.lastName);
                        $('#google-signout').find('.avatar-email').text(customerData.body.emailId);
                        // $('.js-login-status').find('img').attr('src', parseObj.picture);
                        $('#google-signout .avatar').find('img').attr('src', customerData.body.profilePic);
                        $('.icon-google').addClass('hidden');
                        $('.profile-picture-img').removeClass('hidden');
                        $('.profile-picture-img').find('img').attr('src', customerData.body.profilePic);
                        $('.avatar').removeClass('hidden');
                        //$('#google-signin').addClass('hidden');
                        //$('#google-signout').removeClass('hidden');
                        $('.signout-heading').removeClass('hidden');
                        $('.signed-in .btn-holder').removeClass('hidden');
                        $('#google-signin .sign-in').css('display','none');
                        $('#google-signin .data-dismiss').css('display','none');
                        $('#google-signout .signed-in').css('display','block');
                        $('#google-signout').css('display','flex');
                        $('body').find('#js-home-checknow').text('View Offers');
                    }
        
        
            }
        
        });
        
        
        function initGoogle(flag) {
            console.log('init google called');
            google.accounts.id.initialize({
                //client_id: '1052994805000-u5vabr2ibtfgu726ova8cjsnb5vgqamu.apps.googleusercontent.com'
                client_id: gcIDUrl,
                callback: handleCredentialResponse
            });
            google.accounts.id.prompt(function(notification) {
                if(notification.isDisplayed()){
                    $('body').append('<div class="modal-backdrop-custom"></div>'); 
                }
                if (notification.isNotDisplayed()) {
                    $('.modal-backdrop-custom').remove();
                    //onload_openMoengagemodal();
                    bewareFradsModal()
                    }else{
                    }
        
                if (notification.isSkippedMoment()) {
                    localStorage.setItem('g_Skipped', 'true');
                    domUtils.deleteCookie('g_state');
                    $('.modal-backdrop-custom').remove();
        

                    bewareFradsModal()
                    //initGoogle(true);
                    /*setTimeout(function() {
                        if (typeof(onload_openMoengagemodal) === "function") {
                            onload_openMoengagemodal();
                        }
                    }, 3000);*/
                }
            });
        }
        
        function handleCredentialResponse(response, data) {
            console.log("Response: ", response, " Data : ", parseJwt(response.credential));
            $('.modal-backdrop-custom').remove();
            var parseObj = parseJwt(response.credential);
            var queryParams = getQueryParamsFn();
            var reqObj = {
                "header": {
                    "authToken": "MTI4OjoxMDAwMDo6NTM1ZDU1YzRhMTY4ODAxMzY2MGE0NTc4NDA0MGM1NTU6OjQzNzdmOTYwYzVmY2Q1NTU2ZjhhZmY5YjZiZTdhYTI4OjpRQ213dFNYSEhQTG1HRldFd2EraXgzRyt4YUEvay9pM0FicFZTTnFWemEwPQ=="
                },
                "body": {
                    "emailId": parseObj.email,
                    "firstName": parseObj.given_name,
                    "lastName": parseObj.family_name,
                    "profilePic": parseObj.picture,
                    "source": queryParams ? queryParams.source : 'google'
                }
            }
            storeDataApiCall(reqObj);
        }
        
        function storeDataApiCall(reqObj) {

            googleSignInFilterObj.googleSignIn(reqObj).then(function (response) {

                if (response.response.responseJson.header.status == 'SUCCESS') {
                    localStorage.setItem('g_Skipped', 'true');
                    domUtils.setCookie('perpetualId', response.response.responseJson.body.perpetualId, 14400000);
                    domUtils.setCookie('userLoggedIn', 'true', 14400000);
                    localStorage.setItem('cData', JSON.stringify(reqObj));
                    $('#google-signout').find('.avatar-name').text(reqObj.body.firstName +" "+ reqObj.body.lastName);
                    $('#google-signout').find('.avatar-email').text(reqObj.body.emailId);
                        // $('.js-login-status').find('img').attr('src', parseObj.picture);
                    $('#google-signout .avatar').find('img').attr('src', reqObj.body.profilePic);
                    $('.icon-google').addClass('hidden');
                    $('.profile-picture-img').removeClass('hidden');
                    $('.profile-picture-img').find('img').attr('src', reqObj.body.profilePic);
                    $('.avatar').removeClass('hidden');
                    $('.signout-heading').removeClass('hidden');
                    $('.signed-in .btn-holder').removeClass('hidden');
                    //$('#google-signin').addClass('hidden');
                    //$('#google-signout').removeClass('hidden');
                    $('#google-signin .sign-in').css('display','none');
                    $('#google-signin .data-dismiss').css('display','none');
                    $('#google-signout .signed-in').css('display','block');
                    $('#google-signout').css('display','flex');
                    if (domUtils.getCookie('userLoggedIn') == "true" && localStorage.getItem('cData')) {
                        $('[data-header]:contains("Offers")').addClass('signInOffer');
                        $('[data-header]:contains("Offers")').removeClass('signOutOffer');
                    } else {
                        $('[data-header]:contains("Offers")').addClass('signOutOffer');
                        $('[data-header]:contains("Offers")').removeClass('signInOffer');
                    }

                    bewareFradsModal()

                    /*setTimeout(function() {
                        if (typeof(onload_openMoengagemodal) === "function") {
                            onload_openMoengagemodal();
                        }
                    }, 3000);*/ 
                }

            }).catch(function (error) {
    
                console.error(error);
    
            });
        }
        
        function getQueryParamsFn() {
            var currentUrl = location.href;
            var queryStr = currentUrl.split('?');
            var queryStrArr = queryStr[1] ?  queryStr[1].split('&') : "";
            if(queryStrArr){
                var queryParamsObj = {};
                queryStrArr.forEach(function(queryParams) {
                    var splitQueryParams = queryParams.split('=');
                    queryParamsObj[splitQueryParams[0]] = splitQueryParams[1];
                });
                return queryParamsObj;
            }else{
                return '';
            }
        }
        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        
            return JSON.parse(jsonPayload);
        };
        
        //delete cookie
        document.getElementById('js-google-signout').addEventListener('click', function() {
            var persistanceId = domUtils.getCookie('userLoggedIn');
            var perpetualId = domUtils.getCookie('perpetualId');
            domUtils.deleteCookie(persistanceId);
            domUtils.deleteCookie(perpetualId);
            domUtils.setCookie('userLoggedIn', 'false', 14400000);
            localStorage.removeItem('cData');
            $('.js-signin').parents('.dropdown').find('#google-signin').removeClass('hidden');
            $('.js-signin').parents('.dropdown').find('#google-signout').addClass('hidden');
            $('.icon-google').removeClass('hidden');
            $('.profile-picture-img').addClass('hidden');
            $('#google-signin .sign-in').css('display','block');
            $('#google-signin .data-dismiss').css('display','block');
            $('#google-signout .signed-in').css('display','none');
            $('#google-signout').css('display','none');
            $('.signout-heading').addClass('hidden');
            $('.signed-in .btn-holder').addClass('hidden');
            if (domUtils.getCookie('userLoggedIn') == "true" && localStorage.getItem('cData')) {
                $('[data-header]:contains("Offers")').addClass('signInOffer');
                $('[data-header]:contains("Offers")').removeClass('signOutOffer');
            } else {
                $('[data-header]:contains("Offers")').addClass('signOutOffer');
                $('[data-header]:contains("Offers")').removeClass('signInOffer');
            }
            location.reload()
        });

        //googleSignInBizObj.handleCredentialResponse = handleCredentialResponse;
        
        function bewareFradsModal() {
            try {
                let lastShownDate = localStorage.getItem('bewareModalLastShownDate');
                let today = new Date().toISOString().split('T')[0]; /* Get today's date in YYYY-MM-DD format */
        
                setTimeout(function () {
                    if (!lastShownDate || lastShownDate !== today) {
                        localStorage.setItem('bewareModalLastShownDate', today);
                        $('body').addClass('popover-modal-open');
                        $('body').append('<div class="modal-backdrop"></div>');
                        $('#beware-modal').addClass('popover-show');
                        $('#beware-modal').css("display", "block");

                        // analytics call when popup load
                        let componentName = 'aware popup';
                        awarepopupLoad(componentName, productCodeId)
                    } else {
                        onload_openMoengagemodal();
                    }
                }, 5000);
            } catch (e) {
                console.error("Error showing modal:", e);
            }
        }     

        $('#beware-modal .popover-modal-close').on('click', function () {
            //initGoogle(true);
            setTimeout(function () {
                if (typeof (onload_openMoengagemodal) === "function") {
                    onload_openMoengagemodal();
                }
            }, 3000);
        });

        return jsHelper.freezeObj(googleSignInBizObj);

    })(jsHelper);

    _global.jsHelper.defineReadOnlyObjProp(_global, 'googleSignInBizObj', googleSignInBizCallFn);
    }catch(e){console.log(e)}

})(this || window || {});