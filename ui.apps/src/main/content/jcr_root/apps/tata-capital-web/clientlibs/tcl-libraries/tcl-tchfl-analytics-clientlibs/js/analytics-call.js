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

//this function will call when user click on any social media icon like fb/ whatsapp
function socialmediaiconClick(componentName, ctaTitle, iconName) {
    window.adobeDataLayer.push({
        "event": "socialmediaiconClick",
        "ctaDetails": {
            "ctaTitle": ctaTitle
        },
        "section": {
            "componentName": componentName
        },
        "data": {
            "iconName": iconName
        }
    });
    callSatellite('social-media-icon-click')
}

//this function will call when user download any document
function documentDownload(ctaText, ctaTitle, filterValue, componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "documentDownload",
        "ctaDetails": {
            "ctaText": ctaText,
            "ctaTitle": ctaTitle
        },
        "data": {
            "filterValue": filterValue // pass multiple values by comma seperate
        },
        "section": {
            "componentName": componentName
        },
        "products": {
            "productCode": productCode
        }
    });
    callSatellite('document-download')
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

//this function will call when user apply any filter
function filterApplied(ctaTitle, filterValue, componentName, productCode) {
    window.adobeDataLayer.push({
        "event": "filterApplied",
        "ctaDetails": {
            "ctaTitle": ctaTitle
        },
        "data": {
            "filterValue": filterValue // pass multiple values by comma seperate
        },
        "section": {
            "componentName": componentName
        },
        "products": {
            "productCode": productCode
        }
    });
    callSatellite('filter-applied')
}

    //common function for tracking
    function callSatellite(eventName,eventData){
        try{
            _satellite.track(eventName,eventData)
        }catch(ex){}
    }    