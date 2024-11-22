(function (_global) {
    var campaignBizCallFn = (function (jsHelper) {
      var campaignBizObj = {};

      $(document).ready(function () {
        if(productCodeId == "Offline Quick Cash"){
            
            var urlParams = getURLParams(location.href);
            var reponseStore;
            var name;
            var uniqueid;
            var accountccid;
            var offerid;
            var accountemail;
            var accountmobile;
            var baseloancontract;
            var eligibilitycomments;
            
            var reqObj = {}
            var flag=false;
            $("body").addClass("bg-loader");
            $(".loader").removeClass("hide-loader");
            campaignFilterObj.offlineQuickCashGet(reqObj).then(function (responseText) {
                if(responseText.status.toLowerCase()=="success"){
                    if(responseText.response){
                        reponseStore = JSON.parse(responseText.response)
                        reponseStore.Master.forEach(function(el){
                                        if(el["uniqueid"]==urlParams.uniqueid){
                                            name = el["account-customer-name"]
                                            uniqueid=el["uniqueid"]
                                            accountccid=el["account-ccid"]
                                            offerid=el["offerid"]
                                            accountemail=el["account-email"]
                                            accountmobile=el["account-mobile"]
                                            baseloancontract=el["base-loan-contract"]
                                            eligibilitycomments=el["eligibility-comments"]?el["eligibility-comments"]:""
                                            var reqObj = {}
                                            campaignFilterObj.offlineQuickCash(reqObj).then(function (responseText) {
                                                if(responseText.status.toLowerCase()=="success"){
                                                    if(responseText.response){
                                                        var obj = JSON.parse(responseText.response)
                                                        if(urlParams.uniqueid){
                                                            obj.Master.forEach(function(el){
                                                                if(!(el["uniqueid"]==urlParams.uniqueid)){
                                                                     
                                                                }else{
                                                                    flag=true   
                                                                    $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 30.0px;line-height: 34px;">Thankyou, We have already received your request.</p>');
                                                                    $("body").removeClass("bg-loader");
                                                                    $(".loader").addClass("hide-loader");
                                                                }
                                                            })

                                                            if(!flag){
                                                                var reqObj = {"Master": [
                                                                    {
                                                                    "uniqueid": uniqueid,
                                                                    "name": name,
                                                                    "status": "Y",
                                                                    "accountccid":accountccid,
                                                                    "offerid":offerid,
                                                                    "accountemail":accountemail,
                                                                    "accountmobile":accountmobile,
                                                                    "baseloancontract":baseloancontract,
                                                                    "eligibilitycomments":eligibilitycomments
                                                                    }]}
                                                                campaignFilterObj.offlineQuickCashPost(reqObj).then(function (responseText) {
                                                                    $("body").removeClass("bg-loader");
                                                                    $(".loader").addClass("hide-loader");
                                                                    var customer = capitalizeFirstLetter(name.split(" ")[0]);
                                                                    $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 20.0px;"><b>Dear '+customer+',<br>&nbsp;</b></p><p style="text-align: center;font-size: 20.0px;"><b>Thank you for choosing us as your Home Loan Service Financer. Our Customer representative will reach out to you shortly.</b></p>');
                                                                   // $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 30.0px;">Form Already Submitted !!!!</p>');
                                                                })
                                                            }
                                                        }
                                                    }
                                                }
                                            })

                                        }
                                    })
                    }
                }
            })
        }
        if(productCodeId == "Cibil"){
            
            var urlParams = getURLParams(location.href);
            var reponseStore
            var name;
            var uniqueid;
            var reqObj = {}
            var flag=false;
            $("body").addClass("bg-loader");
            $(".loader").removeClass("hide-loader");
            campaignFilterObj.cibilGet(reqObj).then(function (responseText) {
                if(responseText.status.toLowerCase()=="success"){
                    if(responseText.response){
                        reponseStore = JSON.parse(responseText.response)
                        reponseStore.Master.forEach(function(el){
                                        if(el["uniqueid"]==urlParams.uniqueid){
                                            name = el["account-customer-name"]
                                            uniqueid=el["uniqueid"]
                                            accountccid=el["account-ccid"]
                                            offerid=el["offerid"]
                                            accountemail=el["account-email"]
                                            accountmobile=el["account-mobile"]
                                            baseloancontract=el["base-loan-contract"]
                                            eligibilitycomments=el["eligibility-comments"]?el["eligibility-comments"]:""
                                            var reqObj = {}
                                            campaignFilterObj.cibil(reqObj).then(function (responseText) {
                                                
                                                if(responseText.status.toLowerCase()=="success"){
                                                    if(responseText.response){
                                                        var obj = JSON.parse(responseText.response)
                                                        if(urlParams.uniqueid){
                                                            obj.Master.forEach(function(el){
                                                                if(!(el["uniqueid"]==urlParams.uniqueid)){
                                                                     
                                                                }else{
                                                                    flag=true   
                                                                    $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 30.0px;line-height: 34px;">Thankyou, We have already received your request.</p>');
                                                                    $("body").removeClass("bg-loader");
                                                                    $(".loader").addClass("hide-loader");
                                                                }
                                                            })

                                                            if(!flag){
                                                                var reqObj = {"Master": [
                                                                    {
                                                                    "uniqueid": uniqueid,
                                                                    "name": name,
                                                                    "status": "Y",
                                                                    "accountccid":accountccid,
                                                                    "offerid":offerid,
                                                                    "accountemail":accountemail,
                                                                    "accountmobile":accountmobile,
                                                                    "baseloancontract":baseloancontract,
                                                                    "eligibilitycomments":eligibilitycomments
                                                                }]}
                                                                campaignFilterObj.cibilPost(reqObj).then(function (responseText) {
                                                                    $("body").removeClass("bg-loader");
                                                                    $(".loader").addClass("hide-loader"); 
                                                                    var customer = capitalizeFirstLetter(name.split(" ")[0]);
                                                                    $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 20.0px;"><b>Dear '+customer+',<br>&nbsp;</b></p><p style="text-align: center;font-size: 20.0px;"><b>Thank you for choosing us as your Home Loan Service Financer. Our Customer representative will reach out to you shortly.</b></p>');
                                                                   // $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 30.0px;">Form Already Submitted !!!!</p>');
                                                                })
                                                            }
                                                        }
                                                    }
                                                }
                                            })

                                        }
                                    })
                    }
                }
            })
        }
        if(productCodeId == "Preapproved"){
            
            var urlParams = getURLParams(location.href);
            var reponseStore
            var name;
            var uniqueid;
            var reqObj = {}
            var flag=false;
            $("body").addClass("bg-loader");
            $(".loader").removeClass("hide-loader");
            campaignFilterObj.preApprovedGet(reqObj).then(function (responseText) {
                if(responseText.status.toLowerCase()=="success"){
                    if(responseText.response){
                        reponseStore = JSON.parse(responseText.response)
                        reponseStore.Master.forEach(function(el){
                                        if(el["uniqueid"]==urlParams.uniqueid){
                                            name = el["account-customer-name"]
                                            uniqueid=el["uniqueid"]
                                            accountccid=el["account-ccid"]
                                            offerid=el["offerid"]
                                            accountemail=el["account-email"]
                                            accountmobile=el["account-mobile"]
                                            baseloancontract=el["base-loan-contract"]
                                            eligibilitycomments=el["eligibility-comments"]?el["eligibility-comments"]:""
                                            var reqObj = {}
                                            campaignFilterObj.preApproved(reqObj).then(function (responseText) {
                                                
                                                if(responseText.status.toLowerCase()=="success"){
                                                    if(responseText.response){
                                                        var obj = JSON.parse(responseText.response)
                                                        if(urlParams.uniqueid){
                                                            obj.Master.forEach(function(el){
                                                                if(!(el["uniqueid"]==urlParams.uniqueid)){
                                                                     
                                                                }else{
                                                                    $("body").removeClass("bg-loader");
                                                                    $(".loader").addClass("hide-loader");
                                                                    flag=true   
                                                                    $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 30.0px;line-height: 34px;">Thankyou, We have already received your request.</p>');
                                                                }
                                                            })

                                                            if(!flag){
                                                                var reqObj = {"Master": [
                                                                    {
                                                                    "uniqueid": uniqueid,
                                                                    "name": name,
                                                                    "status": "Y",
                                                                    "accountccid":accountccid,
                                                                    "offerid":offerid,
                                                                    "accountemail":accountemail,
                                                                    "accountmobile":accountmobile,
                                                                    "baseloancontract":baseloancontract,
                                                                    "eligibilitycomments":eligibilitycomments
                                                                    }]}
                                                                campaignFilterObj.preApprovedPost(reqObj).then(function (responseText) {
                                                                    $("body").removeClass("bg-loader");
                                                                    $(".loader").addClass("hide-loader");
                                                                    var customer = capitalizeFirstLetter(name.split(" ")[0]);
                                                                    $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 20.0px;"><b>Dear '+customer+',<br>&nbsp;</b></p><p style="text-align: center;font-size: 20.0px;"><b>Thank you for choosing us as your Home Loan Service Financer. Our Customer representative will reach out to you shortly.</b></p>');
                                                                   // $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 30.0px;">Form Already Submitted !!!!</p>');
                                                                })
                                                            }
                                                        }
                                                    }
                                                }
                                            })

                                        }
                                    })
                    }
                }
            })
        }
        if(productCodeId == "Close Cases"){
            
            var urlParams = getURLParams(location.href);
            var reponseStore
            var name;
            var uniqueid;
            var reqObj = {}
            var flag=false;
            $("body").addClass("bg-loader");
            $(".loader").removeClass("hide-loader");
            campaignFilterObj.closeCasesGet(reqObj).then(function (responseText) {
                if(responseText.status.toLowerCase()=="success"){
                    if(responseText.response){
                        reponseStore = JSON.parse(responseText.response)
                        reponseStore.Master.forEach(function(el){
                                        if(el["uniqueid"]==urlParams.uniqueid){
                                            name = el["customer-name"]
                                            uniqueid=el["uniqueid"]
                                            accountccid=el["account-ccid"]
                                            offerid=el["offerid"]
                                            accountemail=el["account-email"]
                                            accountmobile=el["account-mobile"]
                                            baseloancontract=el["base-loan-contract"]
                                            eligibilitycomments=el["eligibility-comments"]?el["eligibility-comments"]:""
                                            var reqObj = {}
                                            campaignFilterObj.closeCases(reqObj).then(function (responseText) {
                                                
                                                if(responseText.status.toLowerCase()=="success"){
                                                    if(responseText.response){
                                                        var obj = JSON.parse(responseText.response)
                                                        if(urlParams.uniqueid){
                                                            obj.Master.forEach(function(el){
                                                                if(!(el["uniqueid"]==urlParams.uniqueid)){
                                                                     
                                                                }else{
                                                                    flag=true   
                                                                    $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 30.0px;line-height: 34px;">Thankyou, We have already received your request.</p>');
                                                                    $("body").removeClass("bg-loader");
                                                                    $(".loader").addClass("hide-loader");
                                                                }
                                                            })

                                                            if(!flag){
                                                                var reqObj = {"Master": [
                                                                    {
                                                                    "uniqueid": uniqueid,
                                                                    "name": name,
                                                                    "status": "Y",
                                                                    "accountccid":accountccid,
                                                                    "offerid":offerid,
                                                                    "accountemail":accountemail,
                                                                    "accountmobile":accountmobile,
                                                                    "baseloancontract":baseloancontract,
                                                                    "eligibilitycomments":eligibilitycomments
                                                                    }]}
                                                                campaignFilterObj.closeCasesPost(reqObj).then(function (responseText) {
                                                                    $("body").removeClass("bg-loader");
                                                                    $(".loader").addClass("hide-loader");
                                                                    var customer = capitalizeFirstLetter(name.split(" ")[0]);
                                                                    $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 20.0px;"><b>Dear '+customer+',<br>&nbsp;</b></p><p style="text-align: center;font-size: 20.0px;"><b>Thank you for choosing us as your Home Loan Service Financer. Our Customer representative will reach out to you shortly.</b></p>');
                                                                   // $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 30.0px;">Thankyou, We have already received your request.</p>');
                                                                })
                                                            }
                                                        }
                                                    }
                                                }
                                            })

                                        }
                                    })
                    }
                }
            })
        }
        if(productCodeId == "HL BT TOPUP"){
            var urlParams = getURLParams(location.href);
            var reponseStore
            var name;
            var uniqueid;
            var reqObj = {}
            var flag=false;
            $("body").addClass("bg-loader");
            $(".loader").removeClass("hide-loader");
            var queryString = "?uniqueid="+urlParams.uniqueid;
            campaignFilterObj.hlBtTopupGet(reqObj,queryString).then(function (responseText) {
                if(responseText.status.toLowerCase()=="success"){
                    if(responseText.response){
                        reponseStore = JSON.parse(responseText.response);
                        console.log(reponseStore);
                        reponseStore.Master.forEach(function(el){
                                        if(el["uniqueid"]==urlParams.uniqueid){
                                            // name = el["account-customer-name"]
                                            uniqueid=el["uniqueid"]
                                            accountccid=el["accountccid"]
                                            // offerid=el["offerid"]
                                            accountemail=el["account-email"]
                                            accountmobile=el["account-mobile"]
                                            baseloancontract=el["base-loan-contract"]
                                            // eligibilitycomments=el["eligibility-comments"]?el["eligibility-comments"]:""
                                            var reqObj = {}
                                            campaignFilterObj.hlBtTopup(reqObj).then(function (responseText) {
                                                
                                                if(responseText.status.toLowerCase()=="success"){
                                                    if(responseText.response){
                                                        var obj = JSON.parse(responseText.response)
                                                        if(urlParams.uniqueid){
                                                            obj.Master.forEach(function(el){
                                                                if(!(el["uniqueid"]==urlParams.uniqueid)){
                                                                     
                                                                }else{
                                                                    flag=true   
                                                                    $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 30.0px;line-height: 34px;">Thankyou, We have already received your request.</p>');
                                                                    $("body").removeClass("bg-loader");
                                                                    $(".loader").addClass("hide-loader");
                                                                }
                                                            })

                                                            if(!flag){
                                                                var reqObj = {"Master": [
                                                                    {
                                                                        "uniqueid": uniqueid,
                                                                        "name": name,
                                                                        "status": "Y",
                                                                        "accountccid":accountccid,
                                                                        "offerid":offerid,
                                                                        "accountemail":accountemail,
                                                                        "accountmobile":accountmobile,
                                                                        "baseloancontract":baseloancontract,
                                                                        "eligibilitycomments":eligibilitycomments
                                                                    }]}
                                                                campaignFilterObj.hlBtTopupPost(reqObj).then(function (responseText) {
                                                                    $("body").removeClass("bg-loader");
                                                                    $(".loader").addClass("hide-loader"); 
                                                                    var customer = capitalizeFirstLetter(name.split(" ")[0]);
                                                                    $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 20.0px;"><b>Dear '+customer+',<br>&nbsp;</b></p><p style="text-align: center;font-size: 20.0px;"><b>Thank you for choosing us as your Home Loan Service Financer. Our Customer representative will reach out to you shortly.</b></p>');
                                                                })
                                                            }
                                                        }
                                                    }
                                                }
                                            })

                                        }
                                    })
                    }
                }
            })
        }
        if(productCodeId == "BT TOPUP INTERNAL"){
            var urlParams = getURLParams(location.href);
            var reponseStore
            var name;
            var uniqueid;
            var reqObj = {}
            var flag=false;
            $("body").addClass("bg-loader");
            $(".loader").removeClass("hide-loader");
            var queryString = "?uniqueid="+urlParams.uniqueid;
            campaignFilterObj.hlBtTopupInternalGet(reqObj,queryString).then(function (responseText) {
                if(responseText.status.toLowerCase()=="success"){
                    if(responseText.response){
                        reponseStore = JSON.parse(responseText.response);
                        console.log(reponseStore);
                        reponseStore.Master.forEach(function(el){
                                        if(el["uniqueid"]==urlParams.uniqueid){
                                            name = el["first-name"]
                                            uniqueid=el["uniqueid"]
                                            accountccid=el["account-ccid"]
                                            offerid=el["offerid"]
                                            accountemail=el["account-email"]
                                            accountmobile=el["account-mobile"]
                                            baseloancontract=el["base-loan-contract"]
                                            eligibilitycomments=el["eligibility-comments"]?el["eligibility-comments"]:""
                                            var reqObj = {}
                                            campaignFilterObj.hlBtTopupInternal(reqObj).then(function (responseText) {
                                                
                                                if(responseText.status.toLowerCase()=="success"){
                                                    if(responseText.response){
                                                        var obj = JSON.parse(responseText.response)
                                                        if(urlParams.uniqueid){
                                                            obj.Master.forEach(function(el){
                                                                if(!(el["uniqueid"]==urlParams.uniqueid)){
                                                                     
                                                                }else{
                                                                    flag=true   
                                                                    $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 30.0px;line-height: 34px;">Thankyou, We have already received your request.</p>');
                                                                    $("body").removeClass("bg-loader");
                                                                    $(".loader").addClass("hide-loader");
                                                                }
                                                            })

                                                            if(!flag){
                                                                var reqObj = {"Master": [
                                                                    {
                                                                        "uniqueid": uniqueid,
                                                                        "name": name,
                                                                        "status": "Y",
                                                                        "accountccid":accountccid,
                                                                        "offerid":offerid,
                                                                        "accountemail":accountemail,
                                                                        "accountmobile":accountmobile,
                                                                        "baseloancontract":baseloancontract,
                                                                        "eligibilitycomments":eligibilitycomments
                                                                    }]}
                                                                campaignFilterObj.hlBtTopupInternalPost(reqObj).then(function (responseText) {
                                                                    $("body").removeClass("bg-loader");
                                                                    $(".loader").addClass("hide-loader"); 
                                                                    var customer = capitalizeFirstLetter(name.split(" ")[0]);
                                                                    $('.jsParaOuter .rte').html('<p style="text-align: center;font-size: 20.0px;"><b>Dear '+customer+',<br>&nbsp;</b></p><p style="text-align: center;font-size: 20.0px;"><b>Thank you for choosing us as your Home Loan Service Financer. Our Customer representative will reach out to you shortly.</b></p>');
                                                                })
                                                            }
                                                        }
                                                    }
                                                }
                                            })

                                        }
                                    })
                    }
                }
            })
        }
    })

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();
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
  
      return jsHelper.freezeObj(campaignBizObj);
    })(jsHelper);
  
    _global.jsHelper.defineReadOnlyObjProp(_global,"campaignBizObj",campaignBizCallFn);
  })(this || window || {});