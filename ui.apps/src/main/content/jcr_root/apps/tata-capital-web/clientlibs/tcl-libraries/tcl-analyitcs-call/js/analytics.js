//this function will fire on every page load and pass the relevant information to the function, 
function pageintialization(loginMethod,loginStatus,userId,pageName,pageType,siteSection,siteSubSection,productCode){
window.adobeDataLayer.push({
    "event": "pageInitialization",
        "page": {
            "name": pageName, // personal-loan:rates-and-charges for innser pages & for home page it will be Home
            "siteSection": siteSection, //Root Name of the inner page & for Home page it will be Home
            "pageType":pageType, //Product Page or Other Page
            "siteSubSection":siteSubSection, //sub section page name
            "pageURL":location.href, // will take it automaticly
            "pathName":location.pathname // will take it automaticly
        },
        "user":{
            "loginMethod":loginMethod,
            "loginStatus":loginStatus,//true or false
            "userId":userId //email id of the user
        },         
        "products":{
            "productCode":productCode//PL for personal loan similar for every product
        }
    
});
callSatellite('page-initializations')

}

//this function will fire when user click menu links
function menuInteraction(menuLinkText,componentName,menuTitle,productCode){
    window.adobeDataLayer.push({
        "event":"webMenuInteraction",
        "menuDetails":{
            "menuLinkText":menuLinkText, //name where click event trigred            
            "menuTitle":menuTitle // section name
        },
        "section":{
            "componentName":componentName //component name
        },
        "products":{
            "productCode":productCode //need to check
        }
    })
    callSatellite('menu-interaction')
}

//this function will fire when user interact with banner
function bannerInteraction(bannerTitle,componentName,bannerCTA,productCode){
    window.adobeDataLayer.push({
        "event":"webBannerInteraction",
        "bannerDetails":{
            "bannerTitle":bannerTitle, // banner title            
            "bannerCTA":bannerCTA // banner CTA
        },
        "section":{
            "componentName":componentName // component name
        },
        "products":{
            "productCode":productCode // product code as PL eg.
        }
    })
    callSatellite('banner-interaction')
}


//this function will call when user interact with CTA  in the all page without form
function ctaInteraction(ctaText,componentName,ctaTitle,productCode){
    window.adobeDataLayer.push({
        "event":"webCtaInteraction",
        "ctaDetails":{
            "ctaText":ctaText, // text where the event trigred
            "ctaTitle":ctaTitle // title for which CTA is beign trigred
        },
        "products":{
            "productCode":productCode // PL as eg.
        },
        "section":{
            "componentName":componentName // component name
        }
    })
    callSatellite('cta-interaction')
}

//this function will call when user fill the details for news letter and submit details after client validation
function newsLetterSubscription(emailId,componentName){
    window.adobeDataLayer.push({
        "event":"newsLetterSubscription",
        "data":{                        
            "emailId":emailId // email of the user
        },
        "section":{
            "componentName":componentName // name of the component
        }
    })
    callSatellite('news-letter-subscription')
}
    
//this function will call when user click on side widget 

function widgetInteraction(widgetName,componentName){
    window.adobeDataLayer.push({
        "event":"widgetInteraction",
        "eventDetails":{
            "widgetName":widgetName // download app or cibil score
        },
        "section":{
            "componentName":componentName // name of the component
        }
    });
    callSatellite('widget-interaction')
}


//this function will call when lead generated
function leadCreation(ctaText,componentName,mobileNo,productCode,leadID,status){
    window.adobeDataLayer.push({
        "event":"instaLeadCreation",
        "ctaDetails":{
            "ctaText":ctaText // where the event trigred
        },
        "products":{
            "productCode":productCode // PL as eg.
        },
        "section":{
            "componentName":componentName // name of the component
        },
        "data":{
            "mobileNo":mobileNo, // user number
            "leadId":leadID, // pass lead id from api
            "status":status // pass api status success or faillure
        }
    })
    callSatellite('lead-creation')
}

//this function will call when user initiate share by clicking on share icon

function shareInitiate(componentName,ctaTitle,ctaText){
    window.adobeDataLayer.push({
        "event":"shareInitiate",
        "ctaDetails":{
            "ctaText":ctaText, 
            "ctaTitle":ctaTitle 
        },
        "section":{
            "componentName":componentName 
        }
    });
    callSatellite('share-initiate')
}

//this function will call when user click on any social media icon like fb/ whatsapp
function socialmediaiconClick(componentName,ctaTitle,iconName){
    window.adobeDataLayer.push({
        "event":"socialmediaiconClick",
        "ctaDetails":{ 
            "ctaTitle":ctaTitle 
        },
        "section":{
            "componentName":componentName 
        },
        "data":{
            "iconName":iconName
        }
    });
    callSatellite('social-media-icon-click')
}

//this function will call when user click on any faq
function faqClick(componentName,faqTitle,productCode){
    window.adobeDataLayer.push({
        "event":"faqClick",
        "data":{
            "faqTitle":faqTitle // title of the clicked faq
        },
        "products":{
            "productCode":productCode // PL as eg.
        },
        "section":{
            "componentName":componentName // pass "popular faqs" as component name
        }
    })
    callSatellite('faq-click')
}

//this function will fire when user click on sub menu
function submenuClick(menuLinkText,componentName,menuTitle,productCode){
    window.adobeDataLayer.push({
        "event":"submenuClick",
        "menuDetails":{
            "menuLinkText":menuLinkText, //name where click event trigred            
            "menuTitle":menuTitle // section name
        },
        "section":{
            "componentName":componentName //component name
        },
        "products":{
            "productCode":productCode //need to check
        }
    })
    callSatellite('sub-menu-click')
}

//this function will call when user click on apply now after entering whatsapp no    //not in use
function whatsappapplyNow(ctaText,componentName,ctaTitle,productCode,mobileNo){
    window.adobeDataLayer.push({
        "event":"whatsappapplyNow",
        "ctaDetails":{
            "ctaText":ctaText, // text where the event trigred
            "ctaTitle":ctaTitle // title for which CTA is beign trigred
        },
        "products":{
            "productCode":productCode // PL as eg.
        },
        "section":{
            "componentName":componentName // component name
        },
        "data":{
            "mobileNo":mobileNo
        }
    })
    callSatellite('whatsapp-apply-Now')
}

//this function will call when user click on submit after entering whatsapp no
function whatsappSubmit(componentName,ctaTitle,mobileNo){
    window.adobeDataLayer.push({
        "event":"whatsappSubmit",
        "ctaDetails":{
            "ctaTitle":ctaTitle // title for which CTA is beign trigred
        },
        "section":{
            "componentName":componentName // component name
        },
        "data":{
            "mobileNo":mobileNo==undefined?"":window.btoa(mobileNo)
        }
    })
    callSatellite('whatsapp-submit')
}

//this function will call when user click on verify after entering otp
function whatsappotpVerify(componentName,ctaTitle,otpStatus){
    window.adobeDataLayer.push({
        "event":"whatsappotpVerify",
        "ctaDetails":{
            "ctaTitle":ctaTitle // title for which CTA is beign trigred
        },
        "section":{
            "componentName":componentName // component name
        },
        "data":{
            "otpStatus":otpStatus
        }
    })
    callSatellite('whatsapp-otp-verify')
}

//this function will call when user perform any interaction on the input field of calculator
function calculatorfieldInteraction(fieldName,calculatorName,componentName,productCode){
    window.adobeDataLayer.push({
        "event":"calculatorfieldInteraction",
        "section":{
            "componentName":componentName 
        },
        "calculator":{
            "calculatorName":calculatorName // pass loan calculator/ emi calculator/ eligibility calculator
        },
        "data":{
            "fieldName":fieldName
        },
        "products":{
            "productCode":productCode //pass PL/BL/HL...
        }
    });
    callSatellite('calculator-field-interaction')
}

//this function will call when user perform any interaction on the input field of calculator
function calculatorapplyNow(ctaText,calculatorName,componentName,productCode){
    window.adobeDataLayer.push({
        "event":"calculatorapplyNow",
        "ctaDetails":{
            "ctaText":ctaText // text where the event trigred
        },
        "calculator":{
            "calculatorName":calculatorName // pass loan calculator/ emi calculator/ eligibility calculator
        },
        "section":{
            "componentName":componentName 
        },
        "products":{
            "productCode":productCode 
        }
    });
    callSatellite('calculator-apply-now')
}

//this function will call when user apply any filter on insurance page
function filterApplied(ctaTitle,appliedFilter,componentName,productCode){
    window.adobeDataLayer.push({
        "event":"filterApplied",
        "ctaDetails":{
            "ctaTitle":ctaTitle 
        },
        "data":{
            "appliedFilter":appliedFilter // pass multiple values by comma seperate
        },
        "section":{
            "componentName":componentName 
        },
        "products":{
            "productCode":productCode 
        }
    });
    callSatellite('filter-applied')
}

//this function will fire on branch locator selection
function selectbranchLocator(city,state,componentName,ctaTitle,productCode){
    window.adobeDataLayer.push({
        "event":"selectbranchLocator",
        "brachdetails":{
            "city":city, 
            "state":state, 
            "productCode":productCode // PL as eg.
        },
        "ctaDetails":{
            "ctaTitle":ctaTitle 
        },
        "products":{
            "productCode":productCode // PL as eg.
        },
        "section":{
            "componentName":componentName // pass all branches or service branches
        }
    })
    callSatellite('select-branch-locator')
}

//this function will fire when user click on get details by sms on branch locator
function branchctaInteraction(ctaText,componentName,ctaTitle){
    window.adobeDataLayer.push({
        "event":"branchctaInteraction",
        "ctaDetails":{
            "ctaText":ctaText,
            "ctaTitle":ctaTitle 
        },
        "section":{
            "componentName":componentName // pass all branches or service branches
        }
    })
    callSatellite('branch-cta-interaction')
}

//this function will fire when user click on send button to share branch details by sms
function sendbranchDetails(ctaText,componentName,ctaTitle,mobileNo){
    window.adobeDataLayer.push({
        "event":"sendbranchDetails",
        "ctaDetails":{
            "ctaText":ctaText,
            "ctaTitle":ctaTitle 
        },
        "section":{
            "componentName":componentName // pass all branches or service branches
        },
        "data":{
            "mobileNo":mobileNo==undefined?"":window.btoa(mobileNo)
        }
    })
    callSatellite('send-branch-details')
}

//this function will fire when user click on apply button on different insurance pages after filling details
function insuranceapplyClick(ctaText,ctaTitle,componentName,mobileNo,emailId,dob,gender,productCode){
    window.adobeDataLayer.push({
        "event":"insuranceapplyClick",
        "ctaDetails":{
            "ctaText":ctaText,
            "ctaTitle":ctaTitle     //apply for car insurance/ apply for travel insurance etc....
        },
        "data":{
            "mobileNo":mobileNo==undefined?"":window.btoa(mobileNo),
            "emailId":emailId==undefined?"":window.btoa(emailId),
            "dob":dob,
            "gender":gender
        },
        "section":{
            "componentName":componentName 
        },
        "products":{
            "productCode":productCode   //pass car insurance/ travel insurance etc..
        }
    });
    callSatellite('insurance-apply-click')
}

//this function will fire when user click on proceed button after entering mob no on preapproved plans form
function preapprovedplanproceedClick(ctaText,ctaTitle,componentName,mobileNo,perceptualId){
    window.adobeDataLayer.push({
        "event":"preapprovedplanproceedClick",
        "ctaDetails":{
            "ctaText":ctaText,
            "ctaTitle":ctaTitle     
        },
        "data":{
            "mobileNo":mobileNo==undefined?"":window.btoa(mobileNo),
        "perceptualId":perceptualId
        },
        "section":{
            "componentName":componentName 
        }
        });
    callSatellite('preapproved-plan-proceed-click')
}

//this function will fire when user click on proceed button after entering mob no on preapproved plans form
function preapprovedplancheckEligibility(ctaTitle,otpStatus,componentName,leadID,perceptualId){
    window.adobeDataLayer.push({
        "event":"preapprovedplancheckEligibility",
        "ctaDetails":{
            "ctaTitle":ctaTitle                 
        },
        "data":{
            "otpStatus":otpStatus,
            "leadId":leadID,
            "perceptualId":perceptualId 
        },
        "section":{
            "componentName":componentName 
        }
        });
    callSatellite('preapproved-plan-check-eligibility')
}

//this function will fire on loading of preapproved offers
function preapprovedoffersLoad(noofOffers,leadID,productCode,offerId){
    window.adobeDataLayer.push({
        "event":"preapprovedoffersLoad",
        "data":{
            "offerId":offerId,
            "noofOffers":noofOffers,
            "leadId":leadID
        },
        "products":{
            "productCode":productCode   
        }
        });
    callSatellite('preapproved-offers-load')
}

//this function will fire when user click on apply for preapproved offer
function preapprovedoffersApply(offerId,offerName,leadID,productCode,status){
    window.adobeDataLayer.push({
        "event":"preapprovedoffersApply",
        "data":{
            "offerId":offerId,
            "offerName":offerName,
            "leadId":leadID,
            "status":status // pass api status success or faillure
        },
        "products":{
            "productCode":productCode   
        }
        });
    callSatellite('preapproved-offers-apply')
}

//this function will call when user register for exclusive offer
function registerforexclusiveOffer(ctaText,mobileNo,emailId,leadID,componentName,productCode,perceptualId){
    window.adobeDataLayer.push({
        "event":"registerforexclusiveOffer",
        "ctaDetails":{
            "ctaText":ctaText 
        },
        "data":{
            "mobileNo":mobileNo==undefined?"":window.btoa(mobileNo),
            "emailId":emailId==undefined?"":window.btoa(emailId),
            "leadId":leadID,
        "perceptualId":perceptualId
        },
        "section":{
            "componentName":componentName 
        },
        "products":{
            "productCode":productCode 
        }
    });
    callSatellite('register-for-exclusive-offer')
}

//this function will fire when user click on get link button
function getdownloadLink(ctaText,ctaTitle,componentName,mobileNo){
    window.adobeDataLayer.push({
        "event":"getdownloadLink",
        "ctaDetails":{
            "ctaText":ctaText,
            "ctaTitle":ctaTitle    //pass looking for investments/ looking for loans
        },
        "data":{
            "mobileNo":mobileNo==undefined?"":window.btoa(mobileNo)
        },
        "section":{
            "componentName":componentName 
        }
        });
    callSatellite('get-download-link')
}

//this function will call when user click on proceed button on reach out to us journey
function existingloanAccount(ctaText,componentName,ctaTitle,existingAccount){
    window.adobeDataLayer.push({
        "event":"existingloanAccount",
        "ctaDetails":{
            "ctaText":ctaText, // text where the event trigred
            "ctaTitle":ctaTitle // title for which CTA is beign trigred
        },
        "data":{
            "existingAccount":existingAccount   //pass yes or no
        },
        "section":{
            "componentName":componentName // component name
        }
    })
    callSatellite('existing-loan-account')
}

//this function will call when user click on submit button on query form
function queryformSubmit(ctaTitle,mobileNo,emailId,componentName,leadID){
    window.adobeDataLayer.push({
        "event":"queryformSubmit",
        "ctaDetails":{
            "ctaTitle":ctaTitle 
        },
        "data":{
            "mobileNo":mobileNo==undefined?"":window.btoa(mobileNo),
            "emailId":emailId==undefined?"":window.btoa(emailId),
            "leadId":leadID
        },
        "section":{
            "componentName":componentName 
        }
    });
    callSatellite('query-form-submit')
}

//this function will call when user click on submit button on greviance form
function grevienceSubmit(ctaText,ctaTitle,levelNo,componentName,complainNo){
    window.adobeDataLayer.push({
        "event":"grievanceSubmit",
        "ctaDetails":{
            "ctaText":ctaText,
            "ctaTitle":ctaTitle 
        },
        "data":{
            "levelNo":levelNo,
            "complainNo":complainNo
        },
        "section":{
            "componentName":componentName 
        }
    });
    callSatellite('grievance-Submit')
}

//this function will call when user click on submit button on greviance form
function feedbackformSubmit(ctaTitle,emailId,productCode,accountNo,noofStars,componentName){
    window.adobeDataLayer.push({
        "event":"feedbackformSubmit",
        "ctaDetails":{
            "ctaTitle":ctaTitle 
        },
        "data":{
            "emailId":emailId==undefined?"":window.btoa(emailId),
            "accountNo":accountNo,
            "noofStars":noofStars
        },
        "section":{
            "componentName":componentName 
        },
        "products":{
            "productCode":productCode 
        }
    });
    callSatellite('feedback-form-Submit')
}

//this function will call when user play the video
function playVideo(componentName,ctaTitle){
    window.adobeDataLayer.push({
        "event":"playVideo",
        "ctaDetails":{
            "ctaTitle":ctaTitle // title for the clicked video
        },
        "section":{
            "componentName":componentName // component name
        }
    })
    callSatellite('play-video')
}

//this function will call when user play the audio
function playAudio(componentName,ctaTitle){
    window.adobeDataLayer.push({
        "event":"playAudio",
        "ctaDetails":{
            "ctaTitle":ctaTitle // title for the clicked audio
        },
        "section":{
            "componentName":componentName // component name
        }
    })
    callSatellite('play-audio')
}

//this function will fire when user click on apply button on different loan pages after filling details
function loanapplyClick(ctaText,ctaTitle,componentName,mobileNo,emailId,dob,gender,productCode){
    window.adobeDataLayer.push({
        "event":"loanapplyClick",
        "ctaDetails":{
            "ctaText":ctaText,
            "ctaTitle":ctaTitle     //apply for LAS/ apply for LAP etc....
        },
        "data":{
            "mobileNo":mobileNo==undefined?"":window.btoa(mobileNo),
            "emailId":emailId==undefined?"":window.btoa(emailId),
            "dob":dob,
            "gender":gender
        },
        "section":{
            "componentName":componentName 
        },
        "products":{
            "productCode":productCode   //pass LAP/ LAS etc..
        }
    });
    callSatellite('loan-apply-click')
}

//this function will fire when user click on apply button on two wheeler loan page after filling details
function twowheelerloanapplyClick(ctaText,ctaTitle,componentName,mobileNo,emailId,dob,gender,loanAmount,manufacturerName,vehicleModel,vehicleVarient,idType,productCode){
    window.adobeDataLayer.push({
        "event":"twowheelerloanapplyClick",
        "ctaDetails":{
            "ctaText":ctaText,
            "ctaTitle":ctaTitle     //apply for LAS/ apply for LAP etc....
        },
        "data":{
            "mobileNo":mobileNo==undefined?"":window.btoa(mobileNo),
            "emailId":emailId==undefined?"":window.btoa(emailId),
            "dob":dob,
            "gender":gender,
            "loanAmount":loanAmount,
            "manufacturerName":manufacturerName,
            "vehicleModel":vehicleModel,
            "vehicleVarient":vehicleVarient,
            "idType":idType
        },
        "section":{
            "componentName":componentName 
        },
        "products":{
            "productCode":productCode   //pass LAP/ LAS etc..
        }
    });
    callSatellite('two-wheeler-loan-apply-click')
}

//this function will fire when user click on get otp via call popup
function getotpviaCall(ctaTitle,componentName,productCode){
    window.adobeDataLayer.push({
        "event":"getotpviaCall",
        "ctaDetails":{
            "ctaTitle":ctaTitle     
        },
        "section":{
            "componentName":componentName 
        },
        "products":{
            "productCode":productCode   //pass LAP/ LAS etc..
        }
    });
}

//this function will call when user click on tabs
function tabInteraction(componentName, tabTitle, ctaText) {
    window.adobeDataLayer.push({
        "event": "tabInteraction",
        "ctaDetails": {
            "ctaText": ctaText,
            "tabTitle": tabTitle
        },
        "section": {
            "componentName": componentName // component name
        }
    })
    callSatellite('tab-interaction')
}

//this function will call when user choose the loan purpose
function selectloanPurpose(componentName,selectedValue){
    window.adobeDataLayer.push({
        "event":"selectloanPurpose",
        "ctaDetails":{
            "selectedValue":selectedValue,
        },
        "section":{
            "componentName":componentName // component name
        }
    })
    callSatellite('select-loan-purpose')
}
//this function will fire when user click on apply now on car loan​

function carloanapplyClick(ctaText, ctaTitle, componentName, mobileNo, emailId, dob, gender, loanAmount, manufacturerName, vehicleModel, vehicleVarient, city, productCode) {
    window.adobeDataLayer.push({
        "event": "carloanapplyClick",
        "ctaDetails": {
            "ctaText": ctaText,
            "ctaTitle": ctaTitle
        },
        "data": {
            "mobileNo": mobileNo == undefined ? "" : window.btoa(mobileNo),
            "emailId": emailId == undefined ? "" : window.btoa(emailId),
            "dob": dob,
            "gender": gender,
            "loanAmount": loanAmount,
            "manufacturerName": manufacturerName,
            "vehicleModel": vehicleModel,
            "vehicleVarient": vehicleVarient
        },
        "section": {
            "componentName": componentName
        },
        "brachdetails": {
            "city": city
        },
        "products": {
            "productCode": productCode
        }
    });

}
//common function for tracking

//this function will call when user click on submit button after entering otp​

function otpsubmitClick(componentName, ctaTitle, otpStatus, productCode) {
    window.adobeDataLayer.push({
        "event": "otpsubmitClick",
        "ctaDetails": {
            "ctaTitle": ctaTitle // title for which CTA is beign trigred​
        },
        "section": {
            "componentName": componentName // component name​
        },
        "data": {
            "otpStatus": otpStatus
        },
        "products": {
            "productCode": productCode
        }
    })
}
//this function will call when user click on submit button after entering otp​

//this function will call when user click on any blog​
function blogInteraction(ctaText, componentName, ctaTitle, productCode) {
    window.adobeDataLayer.push({
        "event": "blogInteraction",
        "ctaDetails": {
            "ctaText": ctaText, // text where the event trigred​
            "ctaTitle": ctaTitle // title for which CTA is beign trigred​
        },
        "products": {
            "productCode": productCode // PL as eg.​
        },
        "section": {
            "componentName": componentName // component name​
        }
    })
    callSatellite('blog-interaction')
}
//this function will call when user click on any blog​
function callSatellite(eventName,eventData){
    try{
        _satellite.track(eventName,eventData)
    }catch(ex){}
}

//this function will call when popup loads
function awarepopupLoad(componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "awarepopupLoad",
        "products": {
            "productCode": productCode // PL as eg.
        },
        "section": {
            "componentName": componentName // pass componentName as aware popup
        }
    })
}

//this function will call when user click on any cta on the popup
function awarepopupctaInteraction(ctaText, ctaTitle, componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "awarepopupctaInteraction",
        "ctaDetails": {
            "ctaText": ctaText, // text where the event trigred like close icon or any other cta
            "ctaTitle": ctaTitle // title for which CTA is beign trigred like be aware of frauds
        },
        "products": {
            "productCode": productCode // PL as eg.
        },
        "section": {
            "componentName": componentName // pass componentName as aware popup
        }
    })
}

//this function will be called when the user selects a language
function selectLanguage(componentName,languageName){
    window.adobeDataLayer.push({
        "event":"selectLanguage",
        "ctaDetails":{
            "languageName":languageName
        },
        "section":{
            "componentName":componentName // component name
        }
    })
    callSatellite('select-language')
}