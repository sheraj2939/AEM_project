//this function will fire on every page load and pass the relevant information to the function, 
function pageintialization(loginMethod, loginStatus, userId, pageName, pageType, siteSection, siteSubSection, productCode) {
    window.adobeDataLayer.push({
        "event": "pageInitialization",
        "page": {
            "name": pageName, // personal-loan:rates-and-charges for innser pages & for home page it will be Home
            "siteSection": siteSection, //Root Name of the inner page & for Home page it will be Home
            "pageType": pageType, //Product Page or Other Page
            "siteSubSection": siteSubSection, //sub section page name
            "pageURL": location.href, // will take it automaticly
            "pathName": location.pathname // will take it automaticly
        },
        "user": {
            "loginMethod": loginMethod,
            "loginStatus": loginStatus,//true or false
            "userId": userId
        },
        "products": {
            "productCode": productCode//PL for personal loan similar for every product
        }
    });
    callSatellite('page-initializations')
}

//this function will fire when user click on any header item
function headerClick(ctaText, ctaTitle, componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "headerClick",
        "data": {
            "ctaText": ctaText,
            "ctaTitle": ctaTitle,
            "componentName": componentName //component name
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('header-click')
}

//this function will fire when user click on any menu item
function menuInteraction(leveloneMenu, leveltwoMenu, componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "menuInteraction",
        "data": {
            "leveloneMenu": leveloneMenu,
            "leveltwoMenu": leveltwoMenu,
            "componentName": componentName //component name
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('menu-interaction')
}

//this function will fire when user click on any sub menu item
function submenuClick(ctaText, componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "submenuClick",
        "data": {
            "ctaText": ctaText,
            "componentName": componentName //component name
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('sub-menu-click')
}

//this function will fire when user click on any cta
function ctaInteraction(ctaText, ctaTitle, componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "ctaInteraction",
        "data": {
            "ctaText": ctaText,
            "ctaTitle": ctaTitle,
            "componentName": componentName //component name
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('cta-interaction')
}

//this function will fire when user click on any input field
function inputfieldInteraction(fieldName, componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "inputfieldInteraction",
        "data": {
            "fieldName": fieldName,
            "componentName": componentName //component name
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('input-field-interaction')
}

//this function will fire when user click on submit button after entering mob no
function whatsappSubmit(ctaTitle, componentName, mobileNo, productCode) {
    window.adobeDataLayer.push({
        "event": "whatsappSubmit",
        "data": {
            "ctaTitle": ctaTitle,
            "mobileNo": mobileNo,
            "componentName": componentName //component name
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('whatsapp-submit')
}

//this function will fire when user click on request a call back
function requestacallbackSubmit(residentType, componentName, emailId, mobileNo, needassistantFor, productCode) {
    window.adobeDataLayer.push({
        "event": "requestacallbackSubmit",
        "data": {
            "residentType": residentType,
            "mobileNo": mobileNo,
            "emailId": emailId,
            "componentName": componentName, //component name
            "needassistantFor": needassistantFor
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('request-a-call-back-submit')
}

//this function will fire when user click on verify otp submit
function otpverifySubmit(mobileNo, leadId, otpStatus, componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "otpverifySubmit",
        "data": {
            "mobileNo": mobileNo,
            "leadId": leadId,
            "otpStatus": otpStatus,
            "componentName": componentName //component name
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('otp-verify-submit')
}

//this function will fire when user click on any blog
function blogInteraction(blogName, ctaTitle, componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "blogInteraction",
        "data": {
            "blogName": blogName,
            "ctaTitle": ctaTitle,
            "componentName": componentName //component name
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('blog-interaction')
}

//this function will fire when user click on share button
function shareInitiate(ctaText, ctaTitle, componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "shareInitiate",
        "data": {
            "ctaText": ctaText,
            "ctaTitle": ctaTitle,
            "componentName": componentName //component name
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('share-initiate')
}

//this function will fire when user click on any social media icon
function socialmediaiconClick(iconName, ctaTitle, componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "socialmediaiconClick",
        "data": {
            "iconName": iconName,
            "ctaTitle": ctaTitle,
            "componentName": componentName //component name
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('social-media-icon-click')
}

//this function will fire when user click subscribe for newsletter
function newsletterSubscription(emailId, componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "newsletterSubscription",
        "data": {
            "emailId": emailId,
            "componentName": componentName //component name
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('newsletter-subscription')
}

//this function will fire when user click on any cta on calculator page
function calculatorctaInteraction(ctaText, ctaTitle, calculatorName, componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "calculatorctaInteraction",
        "data": {
            "ctaText": ctaText,
            "ctaTitle": ctaTitle,
            "calculatorName": calculatorName,
            "componentName": componentName //component name
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('calculator-cta-interaction')
}

//this function will fire when user click on proceed button on get result page
function getresultformSubmit(componentName, emailId, mobileNo, city, productCode) {
    window.adobeDataLayer.push({
        "event": "getresultformSubmit",
        "data": {
            "mobileNo": mobileNo,
            "emailId": emailId,
            "componentName": componentName, //component name
            "city": city
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('get-result-form-submit')
}

//this function will fire when user click on any faq item
function faqClick(componentName, faqTitle, ctaTitle, productCode) {
    window.adobeDataLayer.push({
        "event": "faqClick",
        "data": {
            "faqTitle": faqTitle,
            "ctaTitle": ctaTitle,
            "componentName": componentName
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('faq-click')
}

//this function will fire when user click on any tab
function tabInteraction(componentName, tabTitle, ctaTitle, productCode) {
    window.adobeDataLayer.push({
        "event": "tabInteraction",
        "data": {
            "tabTitle": tabTitle,
            "ctaTitle": ctaTitle,
            "componentName": componentName
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('tab-interaction')
}

//this function will fire when user click on submit button on tata card journey
function tatacardjourneySubmit(componentName, emailId, mobileNo, dob, gender, nationality, ccType, productCode) {
    window.adobeDataLayer.push({
        "event": "tatacardjourneySubmit",
        "data": {
            "mobileNo": mobileNo,
            "emailId": emailId,
            "componentName": componentName, //component name
            "dob": dob,
            "gender": gender,
            "nationality": nationality,
            "ccType": ccType
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('tata-card-journey-submit')
}

//this function will fire when user click on verify button on refer and earn page
function referandearnVerify(componentName, mobileNo, identityType, ctaTitle, productCode) {
    window.adobeDataLayer.push({
        "event": "referandearnVerify",
        "data": {
            "mobileNo": mobileNo,
            "identityType": identityType,
            "ctaTitle": ctaTitle,
            "componentName": componentName
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('referandearn-verify')
}

//this function will fire when user click on invite and earn cta
function inviteandearnClick(componentName, mobileNo, emailId, city, ctaTitle, productCode) {
    window.adobeDataLayer.push({
        "event": "inviteandearnClick",
        "data": {
            "mobileNo": mobileNo,
            "emailId": emailId,
            "city": city,
            "ctaTitle": ctaTitle,
            "componentName": componentName
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('inviteandearn-click')
}

//this function will fire when user click apply for any filter
function filterApply(componentName, filterValue, ctaTitle, productCode) {
    window.adobeDataLayer.push({
        "event": "filterApply",
        "data": {
            "filterValue": filterValue,
            "ctaTitle": ctaTitle,
            "componentName": componentName
        },
        "products": {
            "productCode": productCode //need to check
        }
    })
    callSatellite('filter-apply')
}

function callSatellite(eventName,eventData){
    try{
        _satellite.track(eventName,eventData)
    } catch(er){console.log(er)}
}