function getParentElement(element, level = 1) {
    while (level-- > 0) {
        element = element.parentElement;
        if (!element) return null;
    }
    return element;
}

const getProductCode = function(){
    return 'WEALTH ADVISORY';
};

document.addEventListener('DOMContentLoaded', function(){
// Header Top Items Analytics START
var headerTopLi = document.querySelectorAll('#header-xf-main .header-top .header-top-li a');
headerTopLi && headerTopLi.forEach(function(li) {
    li.addEventListener('click', function(e) {
        var dropdown = getParentElement(e.currentTarget, 5).classList.contains('contactus-dropdown') ? true : false;
        try {
            e.stopPropagation();
            var ctaText = e.currentTarget.innerText.toLowerCase().trim();
            var ctaTitle = dropdown ? getParentElement(e.currentTarget, 5).querySelector('a').innerText.toLowerCase().trim() : '';
            var componentName = 'header';
            headerClick(ctaText, ctaTitle, componentName, getProductCode());
        } catch (err){
            console.log('element not found', err);
        }
    });
});
// Header Top Items Analytics END

// Header logo analytics START
var headerLogo = document.querySelector('.header-logo img');
headerLogo && headerLogo.addEventListener('click', function(e){
    try{
        var ctaText = 'tata capital wealth icon';
        var componentName = 'header';
        headerClick(ctaText, '', componentName, getProductCode());
    } catch (err){console.log(err);}
});
// Header logo analytics END 

// Header menu analytics START
function header_menu(){
    document.querySelectorAll('.header .header-menu li a').forEach(el => {
        el.addEventListener('click', function(e){
            try {
            var isDropdown =  getParentElement(e.currentTarget, 1).classList.contains('menu-item') ? false : true;
            e.stopPropagation();
            var leveloneMenu = e.currentTarget.innerText.trim();
            var leveltwoMenu = isDropdown ? getParentElement(e.currentTarget,5).querySelector('.nav-link').innerText.trim() : '';
            var componentName = 'header';
            menuInteraction(leveloneMenu,leveltwoMenu,componentName,getProductCode())
            } catch (err) {console.log(err);}
        })
    })
}
header_menu()
// Header menu analytics END

// Header Get In Touch and phone, whatsapp Btns analytics START
var getInTouch = document.querySelector('.header-navbar .login-search-menu a');
getInTouch && getInTouch.addEventListener('click', function(e){
    var ctaText = e.currentTarget.innerText.trim();
    var ctaTitle = '';
    var componentName = 'header'
    ctaInteraction(ctaText, ctaTitle, componentName, getProductCode())
})

var rightWidgets = document.querySelector('.wealth-whatsapp-widget .right-calling-inner');
rightWidgets && rightWidgets.addEventListener('click', function(e){
    if(e.target.tagName === 'IMG'){
        var whatsapp = getParentElement(e.target, 1).classList.contains('whatsapp-call') ? true : false;
        var ctaText = whatsapp ? 'whatsapp icon' :  'calling icon';
        var componentName = whatsapp ? 'whatsapp' : 'phone call';
        var ctaTitle = '';
        ctaInteraction(ctaText, ctaTitle, componentName, getProductCode())
    }
})
// Header Get In Touch and phone, whatsapp Btns analytics END

// request callback Input field Interaction analytics START
function requestCallFormInput_analytics(){
    let inputFields = ['name', 'mobile', 'email', 'text-area', 'company-name', 'business-org-email', 'business-auth-name', 
    'business-degination', 'business-auth-email', 'business-auth-mobile'];
	let select2Fields = ['you-are', 'resi-city', 'resi-location', 'busi-type'];
    var componentName =  window.location.href.split('/').reverse().shift().split('.').shift() === 'wealth' 
        ? 'wealth conversation lead form' : window.location.href.split('/').reverse().shift().split('.').shift().split('-').join(' ')  + ' lead form';
    function fieldInteraction(arr, eventType){
        arr.forEach(el => {
            $('#conversation-form [data-type='+el+']') && 
            $('#conversation-form [data-type='+el+']').on(eventType, function(e){
                if(e.currentTarget.dataset.type === el){
                    var fieldName = getParentElement(e.currentTarget, 3).querySelector('.label-name') ? 
                    getParentElement(e.currentTarget, 3).querySelector('.label-name').innerText.trim() : '';
                    fieldName = fieldName.includes('*') ? fieldName.slice(0, -1) : fieldName;
                    inputfieldInteraction(fieldName, componentName, getProductCode());
                }
            });
        });
    }
    fieldInteraction(inputFields, 'change');
    fieldInteraction(select2Fields, 'select2:select');
}
requestCallFormInput_analytics();
// request callback Input field Interaction analytics END

// whatsapp Form analytics START
function whatsappForm_analytics(){
    var whatsappFormSubmit = document.querySelector('#whatsapp-form .jsWhatsappSubmitBtn');
    var whatsappFormMobile = document.querySelector('#whatsapp-form [data-type="mobile"]');
    var componentName = 'subscribe thankyou';
    whatsappFormMobile && whatsappFormMobile.addEventListener('change', function(e){
        try{
            var fieldName = getParentElement(e.currentTarget, 2).querySelector('.label-name').innerText.trim();
            inputfieldInteraction(fieldName,componentName,getProductCode())
            whatsappFormSubmit && whatsappFormSubmit.addEventListener('click', function(e){
            var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('.text14i').innerText.trim(); 
            var mobileNo = getParentElement(e.currentTarget, 2).querySelector('[data-type="mobile"]').value;
            if(mobileNo.length === 10)
            whatsappSubmit(ctaTitle, componentName, mobileNo, getProductCode())
        })
    } catch (err) {console.log(err);}
    })
   
}
whatsappForm_analytics()
// whatsapp Form analytics END

// what we do components analytics START
var whatWeDo = document.querySelectorAll('.what-we-do .digitals-btn .cmp-teaser__action-link');
whatWeDo && whatWeDo.forEach(el => {
    el.addEventListener('click', function(e){
        try{
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 5).querySelector('.digitals-top .heading20').innerText.trim();
            var componentName = getParentElement(e.currentTarget, 11).querySelector('.cmp-title__text').innerText.trim();
            ctaInteraction(ctaText,ctaTitle,componentName,getProductCode())
        } catch (err){console.log(err);}
    })
})
// what we do components analytics END

// Calculator analytics START
function calcWealthForm_analytics(){
    let inputFields = ['name', 'mobile', 'email', 'checkbox', "city"];
    inputFields.forEach(el => {
        try{
            let eventType = el !== 'city' ? 'change': 'select2:select';
            $('#whatsapp-email-modal [data-type='+el+']') &&
            $('#whatsapp-email-modal [data-type='+el+']').on(eventType, function(e){
                if(getParentElement(e.currentTarget, 2).querySelector('.label-name')){
                    var fieldName = getParentElement(e.currentTarget, 2).querySelector('.label-name').innerText.trim();
                } else if (eventType.includes('select2')) {
                    var fieldName =  getParentElement(e.currentTarget, 3).querySelector('.label-name').innerText.trim();
                } else {
                    var fieldName = 'terms and condition';
                }
                var componentName = window.location.href.split('/').reverse().shift().split('.').shift() + '-form';
                inputfieldInteraction(fieldName, componentName, getProductCode());
            });
        } catch (err) {console.log(err);}
    }) 
}
calcWealthForm_analytics();
// Calculator analytics END

// request-callback-btn calculator form analytics START
var reqCallbackBtnCalc = document.querySelector('.calculator-wrapper .request-callback-btn');
reqCallbackBtnCalc && reqCallbackBtnCalc.addEventListener('click', function(e){
    reqCall_WhatsappEmailBtn(e, false);
})

var whatsappEmailBtn = document.querySelector('[data-target="#whatsapp-email-modal"]');
whatsappEmailBtn && whatsappEmailBtn.addEventListener('click', function(e){
    reqCall_WhatsappEmailBtn(e, true);
});

function reqCall_WhatsappEmailBtn(e, isWhatsappEmail){
    try{
        var ctaText = isWhatsappEmail ? e.currentTarget.innerText.replace('\n&', ' whatsapp and email') : e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 7).querySelector('h2')
        ? getParentElement(e.currentTarget, 7).querySelector('h2').innerText.trim() : '';
        var calculatorName = ctaTitle;
        var componentName = window.location.href.split('/').reverse().shift().split('.').shift();
        calculatorctaInteraction(ctaText, ctaTitle, calculatorName, componentName, getProductCode());
    } catch (err){console.log(err);}
}
// request-callback and whatsapp email btn calculator form analytics END

// Popular FAQs Wealth calculators analytics START
var popularFaqsWealth = document.querySelector('.wealth-popular-faq .jsAccordian');
popularFaqsWealth && popularFaqsWealth.addEventListener('click', function(e){
    if(e.target.tagName === 'A'){
        try{
            var faqTitle = e.target.innerText.trim();
            var ctaTitle = getParentElement(e.target, 5).querySelector('.cmp-title__text') 
            ? getParentElement(e.target, 5).querySelector('.cmp-title__text').innerText.trim() : '';
            var componentName = window.location.href.split('/').reverse().shift().split('.').shift();
            faqClick(componentName, faqTitle, ctaTitle, getProductCode());
        } catch (err) { console.log(err);}
    }
})
// Popular FAQs Wealth calculators analytics END

// request call back form back btn subnav analytics START
var backTos = document.querySelector('.sub-nav .backtos');
backTos && backTos.addEventListener('click', function (e) {
    try{    
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = 'sub nav';
        var componentName = window.location.href.split('/').reverse().shift().split('.').shift();
        ctaInteraction(ctaText, ctaTitle, componentName, getProductCode())
    } catch (err) {console.log(err);}
});
// request call back form back btn subnav analytics END

// blog Interaction analytics START
var wealthBlogs = document.querySelectorAll('.wealth-blogs [data-cta="Financial Insight"]');
wealthBlogs && wealthBlogs.forEach(blog => blog.addEventListener('click', function(e){
    try {
        var blogName = e.currentTarget.querySelector('.fi-card-mid')
            ? e.currentTarget.querySelector('.fi-card-mid').innerText.slice(0, -3).trim() + e.currentTarget.querySelector('.fi-card-mid span').innerText : '';
        var ctaTitle = e.currentTarget.querySelector('.fi-card-top')
            ? e.currentTarget.querySelector('.fi-card-top').innerText.trim() : '';
        var componentName = getParentElement(e.currentTarget, 8).querySelector('.cmp-title__text')
            ? getParentElement(e.currentTarget, 8).querySelector('.cmp-title__text').innerText.trim() : '';
        if (e.target.tagName.toLowerCase() === 'button' && e.target.dataset.shareIcon) {
            shareInitiate(e.target.innerText.trim(), blogName, componentName, getProductCode())
        } else if (e.target.parentElement.tagName.toLowerCase() === 'button' && e.target.parentElement.dataset.shareurl) {
            var iconName = e.target.alt ? e.target.alt : 'copy';
            socialmediaiconClick(iconName, ctaTitle, componentName, getProductCode())
        } else {
            blogInteraction(blogName, ctaTitle, componentName, getProductCode())
        }
    } catch (err) {
        console.log(err);
    }
}))
// blog Interaction analytics END

// secure Box request call back homepage Button analytics START
var secureBoxReqCallBtn = document.querySelector('.secure-box-component .btns-tops [type="button"]');
secureBoxReqCallBtn && secureBoxReqCallBtn.addEventListener('click', function(e){
    try{
    var ctaText = e.currentTarget.innerText.trim();
    var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('h2') 
        ? getParentElement(e.currentTarget, 2).querySelector('h2').innerText.trim() : '';
    var componentName = 'secure box component';
    ctaInteraction(ctaText, ctaTitle, componentName, getProductCode())
    } catch(err){console.log(err);}
})
// secure Box request call back homepage Button analytics END

// Footer Analytics Start
var footerTopUl = document.querySelector('.footer-top-exp ul');
footerTopUl && footerTopUl.addEventListener('click', function(e){
    if(e.target.tagName === 'A'){
        try{
        var leveloneMenu = e.target.innerText.trim();
        var leveltwoMenu = ''; 
        var componentName = 'footer'; 
        menuInteraction(leveloneMenu, leveltwoMenu, componentName, getProductCode())
        } catch(err){console.log(err);}
    };
})

var ourOtherWebsites = document.querySelectorAll('.our-other-websites .accordian-panel .footer-links a');
ourOtherWebsites && ourOtherWebsites.forEach(function(ourWebLink){
    ourWebLink.addEventListener('click', function(e){
        try{
        var leveloneMenu = e.currentTarget.innerText.trim();
        var leveltwoMenu = getParentElement(e.currentTarget, 4).querySelector('.footer-headings') 
                ? getParentElement(e.currentTarget, 4).querySelector('.footer-headings').innerText.trim() : '';
        var componentName = 'footer'; 
        menuInteraction(leveloneMenu, leveltwoMenu, componentName, getProductCode())
        } catch(err){console.log(err);}
    });
});

var policiesAndDocs = document.querySelectorAll('.footer-policies-documents-parent-exp .accordian-content .footer-links');
policiesAndDocs && policiesAndDocs.forEach(function(policy){
    policy.addEventListener('click', function(e){
        if(e.target.tagName === 'LI' || e.target.tagName === 'A'){
            try{
            var leveloneMenu = e.target.innerText.trim();
            var leveltwoMenu = getParentElement(e.target,4).querySelector('.tab-title') 
                ? getParentElement(e.target,4).querySelector('.tab-title').innerText.trim() : '';
            var componentName = 'footer';
            menuInteraction(leveloneMenu, leveltwoMenu, componentName, getProductCode())
            } catch(err){console.log(err);}
        }
    })
})

// footer social media Start
var socialMediaIcons = document.querySelector('.footer .copyright-box .socal-lists');
socialMediaIcons && socialMediaIcons.addEventListener('click', function(e){
    if(e.target.tagName === 'IMG'){
    try{
        var iconName = e.target.getAttribute('alt');
        var ctaTitle = '';
        var componentName = 'footer';
        socialmediaiconClick(iconName, ctaTitle, componentName, getProductCode())
    } catch(err){console.log(err);}
    }
});
// footer social media End

// footer copyright links
var copyrightLinks = document.querySelector('.tchfl-copyright-exp .copyright-links');
copyrightLinks && copyrightLinks.addEventListener('click', function(e){
    if(e.target.tagName === 'A'){
    try{
        var leveloneMenu = e.target.innerText.trim();
        var leveltwoMenu = '';
        var componentName = 'footer';
        menuInteraction(leveloneMenu, leveltwoMenu, componentName,getProductCode())
    } catch(err){console.log(err);}
    }
})
// Footer Analytics End

// about us page tab interaction analytics START
var tabGrp = document.querySelector('.our-segmanet .tab-btn-group');
tabGrp && tabGrp.addEventListener('click', function(e){
    if(e.target.tagName === 'A'){
        try{
            var tabTitle = e.target.innerText.trim();
            var ctaTitle = getParentElement(e.target,5).querySelector('.cmp-title__text') 
            ? getParentElement(e.target,5).querySelector('.cmp-title__text').innerText.trim() : '';
            var componentName = ctaTitle;
            tabInteraction(componentName, tabTitle, ctaTitle, getProductCode())
        } catch(err){console.log(err);}
    }
})
// about us page tab interaction analytics END

// Investment services analytics START
var investmentServicesCtas = document.querySelectorAll('.investments-service .service-list-details .btns-tops');
investmentServicesCtas && investmentServicesCtas.forEach(service => {
    service.addEventListener('click', function(e){
        try{
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('h2') ? getParentElement(e.currentTarget, 2).querySelector('h2').innerText.trim() : '';
            var componentName = getParentElement(e.currentTarget,6).querySelector('.cmp-title__text') ? getParentElement(e.currentTarget,6).querySelector('.cmp-title__text').innerText.trim() : '';
            ctaInteraction(ctaText, ctaTitle, componentName, getProductCode())
        } catch(err){
            console.log(err);
        }
    })
});
// Investment services analytics END

// tata card analytics START
function tataCardJourney(){
    let inputFields = ['firstname', 'lastname', 'dob', 'pan', 'pd-mothername', 'pd-mobile', 'pd-email', 'ra-address1', 'ra-address2', 'ra-address3', 'ra-mobile', 'od-companyname', 'od-degsnation', 'od-annual-income', 'od-email', 'iAgree'];
	let select2Fields = ['pd-title', 'pd-gender', 'nationality', 'credit-card-type', 'ra-city', 'ra-pincode', 'ra-stdcode', 'od-occucation-type', 'od-city', 'od-pincode', 'od-stdcode'];
    var componentName =  window.location.href.split('/').reverse().shift().split('.').shift().split('-').join(' ');
    function fieldInteraction(arr, eventType){
        arr.forEach(function(el){
            $('#wealthTataCard [data-type='+el+']') && 
            $('#wealthTataCard [data-type='+el+']').on(eventType, function(e){
                if(e.currentTarget.dataset.type === el){
                    var fieldName = getParentElement(e.currentTarget, 3).querySelector('.label-name') ? 
                    getParentElement(e.currentTarget, 3).querySelector('.label-name').innerText.trim() : '';
                    inputfieldInteraction(fieldName, componentName, getProductCode());
                }
            });
        });
    }
    fieldInteraction(inputFields, 'change');
    fieldInteraction(select2Fields, 'select2:select');
}
tataCardJourney();
// tata card analytics END
});

// referAndEarn analytics START
function referAndEarn(){
    var referEarnRadio = document.querySelectorAll('#mobileVerifyForm .jsIndentityTab input');
    var componentName = window.location.href.split('/').reverse().shift().split('.').shift().split('-').join(' & ');
    referEarnRadio && referEarnRadio.forEach(function(radio) {
        radio.addEventListener('change', function(e){
            var fieldName = getParentElement(e.currentTarget,2).innerText.trim() + ' radio check'
            inputfieldInteraction(fieldName, componentName, getProductCode());
        })
    })

    var inputFields = ['mobile', 'pan-number'];
    inputFields.forEach(function(field){
        document.querySelector('#mobileVerifyForm [data-type="'+ field + '"]') &&
        document.querySelector('#mobileVerifyForm [data-type="'+ field + '"]').addEventListener('change', function(e){
            var fieldName =  getParentElement(e.currentTarget, 2).querySelector('.label-name') 
                ? getParentElement(e.currentTarget, 2).querySelector('.label-name').innerText.trim().slice(0, -1) : '';
            inputfieldInteraction(fieldName, componentName, getProductCode());
        })
    })
    
}
referAndEarn();
// referAndEarn analytics END

// Tata code of conduct analytics START
function tataCodeConduct(){
    var tataCodeConduct = document.querySelector('#prefrencelang-modal [data-type="language"]');

    function callInteractionParams(e, download){
        var componentName = getParentElement(e.currentTarget, 3).querySelector('.heading20')
        ? getParentElement(e.currentTarget, 3).querySelector('.heading20').innerText.trim() : '';
        return download 
            ? [getParentElement(e.currentTarget,3).querySelector('.select2-selection__rendered') ? getParentElement(e.currentTarget,3).querySelector('.select2-selection__rendered').innerText.trim() : '', componentName] 
            : [getParentElement(e.currentTarget, 3).querySelector('p') ? getParentElement(e.currentTarget, 3).querySelector('p').innerText.trim() : '', componentName];
    }

    tataCodeConduct && $(tataCodeConduct).on('select2:select', function(e){
        try{
            var params = callInteractionParams(e, false)
            inputfieldInteraction(params[0], params[1], getProductCode());
        } catch(err){console.log(err);}
    })

    var tataCodeConductBtn = document.querySelector('#mitc-language-download-btn');
    tataCodeConductBtn && tataCodeConductBtn.addEventListener('click', function(e){
        try{
            var ctaText = e.currentTarget.innerText.trim();
            var params = callInteractionParams(e, true);
            ctaInteraction(ctaText, params[0], params[1], getProductCode())
        } catch(err){console.log(err);}
    })

}
tataCodeConduct()
// Tata code of conduct analytics END

// knowledge centre page tab interaction analytics START
var knowledgeTabGrp = document.querySelector('.knowledge-center-box .tab-btn-group');
knowledgeTabGrp && knowledgeTabGrp.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
        try {
            var tabTitle = e.target.innerText.trim().replace(/\s+/g, ' ');
            var ctaTitle = getParentElement(e.target, 5).querySelector('.cmp-title__text')
                ? getParentElement(e.target, 5).querySelector('.cmp-title__text').innerText.trim() : '';
            var componentName = ctaTitle;
            tabInteraction(componentName, tabTitle, ctaTitle, getProductCode())
        } catch (err) { console.log(err); }
    }
})
// knowledge centre page tab interaction analytics END


// knowledge centre reports section flter date analytics START
var reportsDateList = document.querySelectorAll('.general-info-box [data-rel]');
reportsDateList && reportsDateList.forEach(date => {
    date.addEventListener('click', function (e) {
        try {
            var filterValue = e.currentTarget.innerText.trim().replace(/\s+/g, ' ');
            var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('.gens-left h3')
                ? getParentElement(e.currentTarget, 3).querySelector('.gens-left h3').innerText.trim() : '';
            var componentName = getParentElement(e.currentTarget, 12).className.split(' ')[0];
            filterApply(componentName, filterValue, ctaTitle, getProductCode())
        } catch (err) { console.log(err); }
    })
})
// knowledge centre reports section flter date analytics END

// knowledge centre content button analytics START
var contentBtnList = document.querySelectorAll('.general-info-content .infolist-item .btn-controls a');
contentBtnList && contentBtnList.forEach(btn => {
    btn.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim().replace(/\s+/g, ' ');
            var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('p')
                ? getParentElement(e.currentTarget, 2).querySelector('p').innerText.trim() : '';
            var componentName = getParentElement(e.currentTarget, 14).className.split(' ')[0];
            ctaInteraction(ctaText, ctaTitle, componentName, getProductCode())
        } catch (err) { console.log(err); }
    })
})
// knowledge centre content button analytics END

// refer and earn friends form list analytics START
function referFriendsFormListAnalytics() {
    var inputFieldsForm = ['firstname', 'lastname', 'email', 'mobile'];
    var select2Fields = ['title', 'city'];
    var componentName = window.location.href.split('/').reverse().shift().split('.').shift().split('-').join(' & ');
    function fieldInteraction(arr, eventType) {
        arr.forEach(function (el) {
            var $elements = $('#ScrollElement [data-type=' + el + '], #ScrollElement [data-title=' + el + ']');
            if ($elements && $elements.length > 0) {
                $elements.on(eventType, function (e) {
                    try {
                        var target = e.currentTarget;
                        if (target && (target.dataset.type === el || target.dataset.title === el)) {
                            var fieldName = getParentElement(target, 3)?.querySelector('.label-name')?.innerText.trim() || '';
                            if (fieldName) {
                                inputfieldInteraction(fieldName, componentName, getProductCode());
                            }
                        }
                    } catch (innerError) {
                        console.error(`Error handling ${eventType} event for ${el}:`, innerError);
                    }
                });
            }
        });
    }
    fieldInteraction(inputFieldsForm, 'change');
    fieldInteraction(select2Fields, 'select2:select');
}

try {
    referFriendsFormListAnalytics();
} catch (finalError) {
    console.error('Unexpected error when calling referFriendsFormListAnalytics:', finalError);
}
// refer and earn friends form list analytics END

// refer and earn refer your friends form list invite and earn button analytics START
function inviteEarnAnalytics(ele_input, selectElements, eleClick) {
    var componentName = window.location.href.split('/').reverse().shift().split('.').shift().split('-').join(' & ');
    var mobileNo = '';
    var emailId = '';
    var city = '';

    $(ele_input).each(function () {
        var element = $(this);
        var ele_value = element.val();
        if ($(element).data("type") === "mobile") {
            mobileNo = ele_value;
        }
        if ($(element).data("type") === "email") {
            emailId = ele_value.trim().replace(/\s+/g, ' ')
        }
    })

    $(selectElements).each(function () {
        var select = $(this);
        if ($(select).data("type") === "city") {
            city = $(select).val().trim().replace(/\s+/g, ' ')
        }
    })

    var ctaTitle = getParentElement(eleClick.currentTarget, 4).querySelector('.loan-against-header h4')
        ? getParentElement(eleClick.currentTarget, 4).querySelector('.loan-against-header h4').innerText.trim().replace(/\s+/g, ' ') : '';


    inviteandearnClick(componentName, mobileNo, emailId, city, ctaTitle, getProductCode())
}
// refer and earn refer your friends form list invite and earn button analytics END

// refer and earn refer your friends form list delete row analytics START
var deleteBtnList = document.querySelectorAll('#del-modal .sure-out-btn button');
deleteBtnList && deleteBtnList.forEach(btn => {
    btn.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim().replace(/\s+/g, ' ');
            var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('p')
                ? getParentElement(e.currentTarget, 2).querySelector('p').innerText.trim().replace(/\s+/g, ' ') : '';
            var componentName = window.location.href.split('/').reverse().shift().split('.').shift().split('-').join(' & ');
            ctaInteraction(ctaText, ctaTitle, componentName, getProductCode())
        } catch (err) { console.log(err); }
    })
})
// refer and earn refer your friends form list delete row analytics END