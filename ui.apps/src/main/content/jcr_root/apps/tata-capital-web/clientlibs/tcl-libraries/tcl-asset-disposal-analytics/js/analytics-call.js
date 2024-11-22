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
                "userId":userId 
            },         
            "products":{
                "productCode":productCode//HL for home loan similar for every product
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

//this function will fire on submit button click after selecting city and state
function propertysearchSubmit(city,state,propertyType,componentName,ctaTitle){
    window.adobeDataLayer.push({
        "event":"propertysearchSubmit",
        "brachdetails":{
            "city":city, 
            "state":state, 
            "propertyType":propertyType 
        },
        "ctaDetails":{
            "ctaTitle":ctaTitle 
        },
        "section":{
            "componentName":componentName 
        }
    })
    callSatellite('property-search-submit')
}

//this function will fire when user click on know more button
function knowmorebuttonClick(city,componentName,ctaTitle,contractId){
    window.adobeDataLayer.push({
        "event":"knowmorebuttonClick",
        "brachdetails":{
            "city":city
        },
        "ctaDetails":{
            "ctaTitle":ctaTitle 
        },
        "section":{
            "componentName":componentName 
        },
        "data":{
            "contractId":contractId
        }
    })
    callSatellite('know-more-button-click')
}

//this function will fire when user click on sub menu
function tabInteraction(tabTitle,componentName,ctaTitle){
    window.adobeDataLayer.push({
        "event":"tabInteraction",
        "ctaDetails":{
            "tabTitle":tabTitle,
            "ctaTitle":ctaTitle 
        },
        "section":{
            "componentName":componentName //component name
        }
    })
    callSatellite('tab-interaction')
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

//this function will call when user click on any faq
function faqClick(componentName,faqTitle,productCode){
    window.adobeDataLayer.push({
        "event":"faqClick",
        "data":{
            "faqTitle":faqTitle // title of the clicked faq
        },
        "products":{
            "productCode":productCode 
        },
        "section":{
            "componentName":componentName // pass "popular faqs" as component name
        }
    })
    callSatellite('faq-click')
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

//this function will fire when user blocks his slot
function blockslotSubmit(componentName,ctaTitle,contractId,emailId,mobileNo,leadId){
    window.adobeDataLayer.push({
        "event":"blockslotSubmit",
        "ctaDetails":{
            "ctaTitle":ctaTitle
        },
        "section":{
            "componentName":componentName
        },
        "data":{
            "contractId":contractId,
            "emailId":emailId,
            "mobileNo":mobileNo,
            "leadId":leadId
        }
    })
    callSatellite('block-slot-submit')
}

//this function will fire when user submits his property interest
function propertyinterestSubmit(componentName,ctaTitle,contractId,emailId,mobileNo,leadId){
    window.adobeDataLayer.push({
        "event":"propertyinterestSubmit",
        "ctaDetails":{
            "ctaTitle":ctaTitle
        },
        "section":{
            "componentName":componentName
        },
        "data":{
            "contractId":contractId,
            "emailId":emailId,
            "mobileNo":mobileNo,
            "leadId":leadId
        }
    })
    callSatellite('property-interest-submit')
}
console.log("Hello");
//this function will fire on share info's submit button
function shareinfoSubmit(componentName, ctaTitle, contractId, emailId, mobileNo, leadId) {
    window.adobeDataLayer.push({
        "event": "shareinfoSubmit",
        "ctaDetails": {
            "ctaTitle": ctaTitle
        },
        "section": {
            "componentName": componentName
        },
        "data": {
            "contractId": contractId,
            "emailId": emailId,
            "mobileNo": mobileNo,
            "leadId": leadId
        }
    })
    //callSatellite('share-info-submit')
}
