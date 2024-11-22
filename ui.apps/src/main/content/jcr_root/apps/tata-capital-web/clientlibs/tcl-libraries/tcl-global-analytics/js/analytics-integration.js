function getParentElement(element, level = 1) {
    while (level-- > 0) {
    element = element.parentElement;
    if (!element) return null;
    }
    return element;
}

// view rates and charges analytics START-----  HTML structure issue is there-- Also values to be confirmed by pankaj sir-- 
try{
    var aboutProduct = document.querySelector('.about-product .views-links');
    aboutProduct = getParentElement(aboutProduct, 19);
    if(aboutProduct.classList[0] === 'about-product'){
        var rateChargeBtns = document.querySelectorAll('.about-product .views-links')
        rateChargeBtns.forEach(function(rateChargeBtn) {
            rateChargeBtn.addEventListener('click', function(e){
                var ctaText =  e.currentTarget.firstElementChild.innerText.trim();
                var componentName = aboutProduct.querySelector('h2').innerText;
                var interestRateTitle = getParentElement(e.currentTarget, 5).querySelector('.personal-loan-rte .text16i').innerText.trim();
                var interestRatePercentage =  getParentElement(e.currentTarget, 5).querySelector('.per-flex-text .heading20').innerText.trim(); 
                var ctaTitle = interestRateTitle + interestRatePercentage;
                ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
            });
        });
    }
} catch(error){
    console.log('cannot find the element', error);
}
// view rates and charges analytics END

// apply via whatsapp analytics START
try{
    var applyViaWhatsappBtn = document.querySelector('.apply-via-whatsapp .white-blue-button a');
    applyViaWhatsappBtn.addEventListener('click', function(e){  
       var applyViaWhatsapp = getParentElement(e.currentTarget, 9);
       if(applyViaWhatsapp.classList[0] === 'apply-via-whatsapp'){
        var ctaText = e.currentTarget.innerText.trim();
        var componentName = applyViaWhatsapp.classList[0].split('-').join(' ');
        var ctaTitle = applyViaWhatsapp.querySelector('h3') 
        ? applyViaWhatsapp.querySelector('h3').innerText.trim() 
        : applyViaWhatsapp.querySelector('strong').innerText.trim();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
       }
    });
} catch(error){
    console.log('cannot find the element', error);
}
// apply via whatsapp analytics END

// newsletter subscription analytics START 
try {
    var newsLetterBtn = document.querySelector('.newsletter .newsletter-btn .js-subscribe-btn');
    newsLetterBtn.addEventListener('click', function (e) {
        if(document.querySelector('.newsletter .error-msgs').innerText.length == 0 &&
        document.querySelector('#form-subscribe [data-type="email"]').value !== ''){
            var componentName = 'News Letter Subscription Box'
            var emailId = document.querySelector('#form-subscribe [data-type="email"]').value
            newsLetterSubscription(emailId, componentName);
        }
    })
} catch (error) {
    console.log('cannot find the element', error);
}
// newsletter subscription analytics END

// widget Interaction analytics START
try{
    var widgetComponentBtns = document.querySelectorAll('.who-can-take-loan .who-can-take-loan-tabs .tab-left button');
    widgetComponentBtns.forEach(function(widgetBtn){
        widgetBtn.addEventListener('click', function(e){
            if(getParentElement(widgetBtn,10).classList[0] == 'who-can-take-loan'){
                var widgetName = e.currentTarget.innerText;
                var componentName = getParentElement(e.currentTarget, 10).querySelector('.component-title h2').innerText.trim();
                widgetInteraction(widgetName,componentName);
            } else if(getParentElement(widgetBtn,9).classList[0] == 'who-can-take-loan') {
                var widgetName =  e.currentTarget.innerText.trim();
                var componentName = getParentElement(e.currentTarget, 9).querySelector('.component-title h2').innerText.trim();
                widgetInteraction(widgetName,componentName);
            }
        });
    })
} catch (error) {
    console.log('cannot find the element', error);
}
// widget Interaction analytics END

// widget Cta Interaction START
try {
    var widgetCtas = document.querySelectorAll('.who-can-take-loan .who-can-take-loan-tabs .per-btns a');
    widgetCtas.forEach(function (widgetCta) {
        widgetCta.addEventListener('click', function (e) {
            var ctaText = e.currentTarget.innerText.trim();
            var componentName = getParentElement(e.currentTarget, 9).querySelector('.component-title h2').innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('h3').innerText.trim();
            ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
        });
    });
} catch (error) {
    console.log('cannot find the element', error);
}
// widget Cta Interaction END

// blogs comp + financialInsight comp share Initiate analytics START
try {
    var blogInsightShares = document.querySelectorAll('.blogs #js-fi-share-menu1');
    var financialInsightShares = document.querySelectorAll('.financial-insights #js-fi-share-menu1');
    function blogShareInitiate(compShareSelect, condition) {
        compShareSelect.forEach(function (compShare) {
            compShare.addEventListener('click', function (e) {
                var shubhChintak = getParentElement(e.currentTarget, 10).classList[0];
                if(getParentElement(e.currentTarget, 12).classList[0] === condition || shubhChintak === condition){    
                var ctaText = e.currentTarget.innerText.trim();
                var ctaTitle =  getParentElement(e.currentTarget,3).querySelector('.fi-card-mid h6').innerText.trim();
                if(shubhChintak === condition){
                    var componentName = getParentElement(e.currentTarget, 10).querySelector('h2').innerText.trim();
                }else{
                    var componentName = getParentElement(e.currentTarget, 12).querySelector('h2').innerText.trim();
                }
                shareInitiate(componentName,ctaTitle,ctaText)
                }
            })
        });
    }
} catch (error) {
    console.log('Element not found', error);
}
blogShareInitiate(financialInsightShares, 'financial-insights');
blogShareInitiate(blogInsightShares, 'blogs')
// blogs comp + financialInsight comp share Initiate analytics START

// blogs comp + financialInsight comp share Initiate analytics START
try {
    var ctaTitleBlog ;
    $('.financial-insights-wrap .fi-overlay-card .fi-card-mid').click(function (e) {
        var ctaText = $(e.currentTarget)[0].innerText;
        var componentName = $(e.currentTarget).parents('.financial-inner').find('.component-title h2')[0].innerText;
        var fiInsightTag = $(getParentElement(e.currentTarget, 1)).find('.fi-insight-tag')[0];
        if (fiInsightTag && fiInsightTag.innerText) {
            ctaTitleBlog = fiInsightTag.innerText;
        } else {
            ctaTitleBlog = componentName;
        }
        blogInteraction(ctaText, componentName, ctaTitleBlog,productCodeId)
    })
    $('.financial-insights-wrap .fi-overlay-card .fi-card-top').click(function (e) {
        var ctaText = $(getParentElement(e.currentTarget,1)).find('.fi-card-mid')[0].innerText;
        var componentName = $(e.currentTarget).parents('.financial-inner').find('.component-title h2')[0].innerText;
        ctaTitleBlog = $(getParentElement(e.currentTarget,1)).find('.fi-insight-tag')[0].innerText;
        blogInteraction(ctaText, componentName, ctaTitleBlog,productCodeId)
    })
} catch (error) {
    console.log('Element not found', error);
}
// blogs comp + financialInsight comp share Initiate analytics START

// blogs comp Read More btn analytics START
var blogBtn = document.querySelector('.financial-insights .text-center .btn-blue');
if (blogBtn) {
    blogBtn.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim();
            var componentName = $(e.currentTarget).parents('.financial-inner').find('.component-title h2')[0].innerText;
            var ctaTitle = componentName;
            ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
        } catch (err) { console.log(err); }
    })
}
// blogs comp Read More btn analytics END

// blogs social media share analytics START
try{
    var finInsightSocialMediaShares = document.querySelectorAll('.financial-insights .share-bundle-menu .social-btn');
    var blogSocialMediaShares = document.querySelectorAll('.blogs .share-bundle-menu .social-btn');
    function blogSocialIconsShare(socialMediaShares){
        socialMediaShares.forEach(function(socialMedia){
            socialMedia.addEventListener('click', function(e){
                var componentName = getParentElement(e.currentTarget, 12).querySelector('h2').innerText.trim();
                var ctaTitle = getParentElement(e.currentTarget,4).querySelector('.fi-card-mid h6').innerText.trim();
                var iconName = e.currentTarget.dataset.share ? e.currentTarget.dataset.share.split('-').join(' ') : e.currentTarget.querySelector('.text-copy').innerText.trim(); 
                socialmediaiconClick(componentName,ctaTitle,iconName);
            });
        });
    }
} catch(error){
    console.log(error);
}
blogSocialIconsShare(blogSocialMediaShares);
blogSocialIconsShare(finInsightSocialMediaShares);
// blogs social media share analytics END

// widgetCtasBtn find-right-loan-box analytics START
var widgetCtaBtns = document.querySelectorAll('.who-can-take-loan .find-right-loan-box .find-right-loan-box-teaser .white-blue-button a');
widgetCtaBtns.forEach(function(widgetCtaBtn){
    widgetCtaBtn.addEventListener('click', function(e){
    if(getParentElement(e.currentTarget, 14).classList[0] === 'who-can-take-loan'){
        try{
            var ctaText = e.currentTarget.innerText.trim();
            var componentName = getParentElement(e.currentTarget, 14).querySelector('h2').innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('h3') ? 
            getParentElement(e.currentTarget, 4).querySelector('h3').innerText.trim() : 
            getParentElement(e.currentTarget, 4).querySelector('strong').innerText.trim() ;
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        } catch(err){console.log(err);}
    }    
    });
});
// widgetCtasBtn find-right-loan-box analytics END

// Financial Insightte EMI + about us view code conduct analytics START
try{
    var calculateEMIs = document.querySelectorAll('.about-product .about-product-big-div .white-blue-button a');
    calculateEMIs.forEach(function(calcEmi) {
        calcEmi.addEventListener('click', function(e){
            var ctaText = e.currentTarget.innerText.trim();
            var componentName = window.location.href.split('/').pop().split('.').shift();
            var ctaTitle = getParentElement(e.currentTarget , 8).querySelector('h2') ? 
            getParentElement(e.currentTarget , 8).querySelector('h2').innerText.trim() 
            : getParentElement(e.currentTarget ,1).querySelector('h2').innerText.trim();
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        });
    });
} catch(error){
    console.log('Element not found', error);
}
// calculate EMI + about us view code conduct analytics END

// personal-loan-box what-per-loan analytics START
try{
    var applyNowPersonalLoanBox = document.querySelectorAll('.personal-loan-box .what-per-loan .white-blue-button a');
    applyNowPersonalLoanBox.forEach(function(applyNowPl){
    applyNowPl.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        var compName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ')
        var componentName = getParentElement(e.currentTarget, 3).classList.contains('per-loan-details') 
        ? compName + ' overlay': compName + ' main';
        var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('.component-title h2') == null 
        ? compName : getParentElement(e.currentTarget, 6).querySelector('.component-title h2').innerText.trim();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    });
    });
} catch(error){
    console.log('Element not found', error);
}
// personal-loan-box what-per-loan analytics END

// best deals banner analytics START
try{
    var bestDealsBannerLeft = document.querySelector('.best-deals .check-loan-eligibility-box-left a');
    var bestDealsBannerRight = document.querySelector('.check-loan-eligibility-box-right a');
    bestDealsBannerLeft.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 5).classList[0] == 'best-deals'){
        var bannerTitle = bestDealsBannerLeft.parentElement.querySelector('h2').innerText.trim();
        var componentName = 'best deals';
        var bannerCTA = e.currentTarget.innerText.trim();
        bannerInteraction(bannerTitle,componentName,bannerCTA,productCodeId);
        }
    });
    bestDealsBannerRight.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 7).classList[0] == 'best-deals'){
        var bannerTitle = bestDealsBannerRight.parentElement.querySelector('h3').innerText.trim();
        var componentName = 'best deals';
        var bannerCTA = e.currentTarget.innerText.trim();
        bannerInteraction(bannerTitle,componentName,bannerCTA,productCodeId);
        }
    })
} catch(error){
    console.log('element not found', error);
}
// best deals banner analytics END

// instant loan box analytics START
try{
    var instantLoanBox = document.querySelector('.instant-loan-box .white-blue-button a');
    instantLoanBox.addEventListener('click', function(e){
    var ctaText = e.currentTarget.innerText.trim();
    var ctaTitle = getParentElement(e.currentTarget, 7).querySelector('.tops-heads h2').innerText.trim()  
    var componentName = getParentElement(e.currentTarget, 7).classList[0].split('-').join(' '); 
    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    })
} catch(error){
    console.log('Element not found', error);
}

// instant loan box analytics END

// pl Banner calculatorfieldInteraction analytics START
try{
    var bannerCalculatorFields = document.querySelectorAll('.banner-calc-input-top .textbox-inner input');
    bannerCalculatorFields.forEach(function(calculatorField){
        calculatorField.addEventListener('focus', function(e){
            if(getParentElement(e.currentTarget, 12).classList[0] == 'banner-calc' || getParentElement(e.currentTarget, 14).classList[0] == 'banner-calc'){
            var fieldName = getParentElement(e.currentTarget, 3).querySelector('h6').innerText.trim();
            var calculatorName = 'Banner EMI calculator';
            var componentName = calculatorName
            calculatorfieldInteraction(fieldName,calculatorName,componentName,productCodeId);
            }    
        });
    });
} catch(error){
    console.log('Element not found', error);
}
// pl Banner calculatorfieldInteraction analytics END

// pl Banner calculatorapplyNow analytics START
try{
    var bannerCalcApplyNow = document.querySelector('.banner-calc .banner-calc-bottom .btn-blue');
    bannerCalcApplyNow.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        var calculatorName = 'Banner EMI calculator';
        var componentName = calculatorName;
        calculatorapplyNow(ctaText,calculatorName,componentName,productCodeId);
    })
} catch(error){
    console.log('element not found', error);
}
// pl Banner calculatorapplyNow analytics END

// pl Banner track application today analytics START
try{
var bannerCalcTrackLink = document.querySelector('.banner-calc .banner-calc-bottom .link-with-arrow a, .hl-banner-calc .banner-calc-bottom .link-with-arrow a');
bannerCalcTrackLink.addEventListener('click', function(e){
    var ctaText = e.currentTarget.innerText.trim();
    var ctaTitle = getParentElement(e.currentTarget, 11).querySelector('.main-title h1').innerText + ' '
    + getParentElement(e.currentTarget, 11).querySelector('.info-title').innerText.trim();
    var componentName = 'Banner EMI calculator';
    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
});
} catch(error){
    console.log('element not found', error);
}
// pl Banner track application today analytics END

// why to choose us application process analytics START
try{
    var whyChooseUsAppProcesses = document.querySelectorAll('.why-to-choose-us .why-to-choose-us-reasonlist .explore-our-product-button a');
    whyChooseUsAppProcesses.forEach(function(appProcess){
        appProcess.addEventListener('click', function(e){
            if(getParentElement(e.currentTarget, 12).classList[0] == 'why-to-choose-us'){
                var ctaText = e.currentTarget.innerText.trim();
                var componentName = getParentElement(e.currentTarget, 12).querySelector('h2').innerText.trim();
                var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('h4').innerText.trim();
                ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
            }
            });
    });
} catch(error){
    console.log('element not found', error);
}
// why to choose us application process analytics END

// why to choose us content link analytics START
try{
    var whyChooseUsContentlink = document.querySelectorAll('.why-to-choose-us .why-to-choose-us-reasonlist a');
    whyChooseUsContentlink.forEach(function(appProcess){
        appProcess.addEventListener('click', function(e){
            var parentElement = getParentElement(e.currentTarget, 10);
            if (parentElement && parentElement.classList.contains('why-to-choose-us')) {
                var ctaText = e.currentTarget.innerText.trim();
                var componentName = getParentElement(e.currentTarget, 12).querySelector('h2').innerText.trim();
                var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('h4').innerText.trim();
                ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
            }
            });
    });
} catch(error){
    console.log('element not found', error);
}
// why to choose us content link analytics END


// why to choose us content link analytics START
try{
    var aboutProductContentlink = document.querySelectorAll('.about-product .personal-para .about-product-text a');
    aboutProductContentlink.forEach(function(appProcess){
        appProcess.addEventListener('click', function(e){
            var parentElement = getParentElement(e.currentTarget, 11);
            if (parentElement && parentElement.classList.contains('about-product')) {
                var ctaText = e.currentTarget.innerText.trim();
                var componentName = getParentElement(e.currentTarget, 11).classList[0].split('-').join(' ');
                var ctaTitle =getParentElement(e.currentTarget, 3).querySelector('.component-title h2').innerText.trim();                ;
                ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
            }
            });
    });
} catch(error){
    console.log('element not found', error);
}
// why to choose us content link analytics END


// how emi calc works analytics START
try{
    var emiCalcBtn = document.querySelector('.how-emi-calc-works .white-blue-button a');
    emiCalcBtn.addEventListener('click', function(e){
    var ctaText = e.currentTarget.innerText.trim();
    var componentName = getParentElement(e.currentTarget, 6).classList[0].split('-').join(' ');
    var ctaTitle = getParentElement(e.currentTarget, 9).querySelector('.component-title h2').innerText.trim();
    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);    
    })
} catch(error){
    console.log('element not found', error);
}
// how emi calc works analytics END

// main banners all pages analytics START
try{
    var mainBannerCtas = document.querySelectorAll('.custom-banner-component .dsk-banner-cta a');
    mainBannerCtas.forEach(function(bannerCta){
        bannerCta.addEventListener('click', function(e){
            var bannerTitle = getParentElement(e.currentTarget, 3).querySelector('.heading-h1').innerText.trim();
            var componentName = window.location.href.split('/').pop().split('.').shift() + ' ' + 'banner component';
            var bannerCTA = e.currentTarget.innerText.trim();
            bannerInteraction(bannerTitle,componentName,bannerCTA,productCodeId);
        })
    })
} catch(error){
    console.log('element not found', error);
}
// main banners all pages analytics END

// Calculator field interaction analytics START
try{
    var allCalculatorDetails = document.querySelectorAll('.calculator-content-wrap .calculator-details-top input');
    if(document.querySelector('.page-header .component-title h1') !== null){
        allCalculatorDetails.forEach(function(calcInp) {
            calcInp.addEventListener('change', function(e){
                var fieldName = getParentElement(e.currentTarget, 3).querySelector('h6').innerText.trim();
                if(window.location.href.includes('micro-finance-loan')){
                    var calculatorName = 'EMI Calculator';
                } else {
                    var calculatorName = getParentElement(e.currentTarget, 18).querySelector('li.active .overview-sub-menu li.active')!== null 
                    ? getParentElement(e.currentTarget, 18).querySelector('li.active .overview-sub-menu li.active').innerText.trim() 
                    : window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
                }
                var componentName = calculatorName;
                calculatorfieldInteraction(fieldName,calculatorName,componentName,productCodeId);
            });
        });
    }
} catch(error){
    console.log('element not found', error);
}
// Calculator field interaction analytics END

// Calculator apply now analytics START
var lasCalcApplyNow = document.querySelector('.las-calculator .calculator-security-wrap .calculate-btn');
var allCalcApplyNow = document.querySelector('.calculator-content-wrap .calculate-btn');
function calcApplyNow(selector){
    if(selector !== null && document.querySelector('.page-header .component-title h1') !== null){
    selector.addEventListener('click', function(e){
        try{
        var ctaText = e.currentTarget.innerText.trim();
        var calculatorName = '';
        if( getParentElement(e.currentTarget, 8).previousElementSibling){
            if(getParentElement(e.currentTarget, 8).previousElementSibling.querySelector('li.active .overview-sub-menu li.active') !== null){
                calculatorName =  getParentElement(e.currentTarget, 8).previousElementSibling.querySelector('li.active .overview-sub-menu li.active').innerText.trim() 
            } else {
                calculatorName = document.querySelector('.page-header .component-title h1').innerText.trim();
            }
        } else {
                calculatorName = document.querySelector('.page-header .component-title h1').innerText.trim();
        }
        var componentName = calculatorName;
        calculatorapplyNow(ctaText,calculatorName,componentName,productCodeId);
        } catch(err){
            console.log(err)
        }
    });
    }
}
calcApplyNow(allCalcApplyNow);
calcApplyNow(lasCalcApplyNow);
// Calculator apply now analytics END

/* Home Loan Overview EMI Calculator apply now analytics START */
let homeLoanEmiCalc = document.querySelector('[data-calc-name="calculator-home-loan-emi-calc"] .calculate-btn') 
homeLoanEmiCalc && homeLoanEmiCalc.addEventListener('click', function(e){
    try{
        let ctaText = e.currentTarget.innerText.trim();
        let calculatorName = getParentElement(e.currentTarget, 7).querySelector('.component-title h2').innerText.trim();
        let componentName = window.location.href.split('/').reverse().shift().split('.').shift().split('-').join(' ');
        calculatorapplyNow(ctaText,calculatorName,componentName,productCodeId);
    } catch(err){console.log(err);}
});
/* Home Loan Overview EMI Calculator apply now analytics END */

// Hl overview steps-apply-btn analytics START
let stepsApplyBtn = document.querySelector('.steps-completion-video .steps-apply-btn a');
stepsApplyBtn && document.querySelector('.steps-completion-video .steps-apply-btn a').addEventListener('click', function(e){
    try{
        let ctaText = e.currentTarget.innerText.trim();
        let ctaTitle = getParentElement(e.currentTarget, 9).querySelector('h2').innerText.trim();
        let componentName = "steps completion video";
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    } catch(err){console.log(err);
    }
})
// Hl overview steps-apply-btn analytics END


// Homepage Calculator field Interaction analytics START
try{
    var allHomepgCalcDetails = document.querySelectorAll('.home-page-calculator-structure .calculator-content-wrap .calculator-details-top input');
    allHomepgCalcDetails.forEach(function(homePageCalcDetail){
        homePageCalcDetail.addEventListener('change', function(e){
            var fieldName = getParentElement(e.currentTarget, 3).querySelector('h6').innerText.trim();
            var calculatorNameArr = [];
            (getParentElement(e.currentTarget, 18).querySelectorAll('.tab-item')).forEach(function(tab){
                if(tab.classList.contains('cmp-tabs__tab--active')){
                    calculatorNameArr.push(tab.querySelector('a').innerText.trim());
                }
            });
            var calculatorName = calculatorNameArr.pop();
            var componentName =  getParentElement(e.currentTarget, 22).querySelector('.js-loanDropdown').innerText.trim() + 
            ' ' + 'homepage Calculator' ;
            var product = getParentElement(e.currentTarget, 22).querySelector('.js-loanDropdown') ? getParentElement(e.currentTarget, 22).querySelector('.js-loanDropdown').innerText.trim() : '';
            var aa_productCode = '';
            product.split(' ').forEach(function(prod){
                aa_productCode += prod.slice(0,1);
            });
            calculatorfieldInteraction(fieldName,calculatorName,componentName,aa_productCode);
        });
    });
} catch(error){
    console.log('element not found', error);
}
// Homepage Calculator field Interaction analytics END

// Homepage Calculator applyBtn Interaction analytics END
try{
    var applyNowBtns = document.querySelectorAll('.home-page-calculator-structure .home-page-calculator .calculate-btn');
    applyNowBtns.forEach(function(applyNowBtn){
        applyNowBtn.addEventListener('click', function(e){
            if(getParentElement(e.currentTarget, 23).classList[0] == 'home-page-calculator-structure'){
                var ctaText = e.currentTarget.innerText.trim();
                var calculatorNameArr = [];
                getParentElement(e.currentTarget, 13).querySelectorAll('.tab-item').forEach(function(tab){
                    if(tab.classList.contains('cmp-tabs__tab--active')){
                        calculatorNameArr.push(tab.querySelector('a').innerText.trim());
                    }
                });
                var calculatorName = calculatorNameArr.pop();
                var componentName =  getParentElement(e.currentTarget, 21).querySelector('.js-loanDropdown').innerText.trim() + 
                ' ' + 'homepage Calculator';
                var product = getParentElement(e.currentTarget, 21).querySelector('.js-loanDropdown') ? getParentElement(e.currentTarget, 21).querySelector('.js-loanDropdown').innerText.trim() : '';
                    var aa_productCode = '';
                product.split(' ').forEach(function(prod){
                    aa_productCode += prod.slice(0,1);
                });
                calculatorapplyNow(ctaText,calculatorName,componentName,aa_productCode);
            }
        });
    });
} catch(error){
    console.log('element not found', error);
}
// Homepage Calculator applyBtn Interaction analytics END

// home page calculator filter apply analytics START 
try{
    var homepageCalcFilterSelect = document.querySelectorAll('.home-page-calculator-structure #loan-dropdown a');
    homepageCalcFilterSelect.forEach(function(filterSelect){
        filterSelect.addEventListener('click', function(e){
            var appliedFilter = e.currentTarget.innerText.trim();
            var ctaTitle =  getParentElement(e.currentTarget, 12).querySelector('h2').innerText.trim();
            var componentName = 'Homepage Calculators'
            var aa_productCode = '';
            appliedFilter.split(' ').forEach(function(prod){
                aa_productCode += prod.slice(0,1);
            });
            filterApplied(ctaTitle,appliedFilter,componentName,aa_productCode);
        });
    })
} catch(error) {
    console.log('element not found', error);
}
// home page calculator filter apply analytics END

// home page area conversion calc analytics START
try{
var areaConversionsCalcHome = document.querySelectorAll('.home-page-calculator-structure .area-conversion-wrap [data-select="select"] li a');
areaConversionsCalcHome.forEach(function(areaConversion){
    areaConversion.addEventListener('click', function(e){
        var fieldName = getParentElement(e.currentTarget, 6).querySelector('.area-conversion-col p').innerText.trim();
        var calculatorName = getParentElement(e.currentTarget, 17).querySelector('.cmp-tabs__tab--active').innerText.trim();
        var componentName = 'Homepage Calculators';
        calculatorfieldInteraction(fieldName,calculatorName,componentName,productCodeId);
    });
});
} catch(error) {
    console.log('element not found', error);
}
// home page area conversion calc analytics END

// EMI option box analytics START  to be changed
try{
    var keyFeaturesEmiOptBox = document.querySelectorAll('.key-features .emi-option-box .suitable-emi-bottom a');
    keyFeaturesEmiOptBox.forEach(function(keyFeatureEmiOptBox) {
        keyFeatureEmiOptBox.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('h3').innerText.trim();
        if(getParentElement(e.currentTarget, 10).classList[0] == 'key-features'){
            var componentName = getParentElement(e.currentTarget, 9).classList[0].split('-').join(' '); 
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        } else if(getParentElement(e.currentTarget, 9).classList[0] == 'key-features'){
            var componentName =  getParentElement(e.currentTarget, 9).querySelector('.component-title h2').innerText.trim();
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        }
        });
    });
} catch(error){
    console.log('element not found', error);
}
// EMI option box analytics END

// split card box analytics START
try{
var splitCardBoxBtns =  document.querySelectorAll('.split-cards-box .white-blue-button a');
splitCardBoxBtns.forEach(function(splitCardBtn){
    splitCardBtn.addEventListener('click', function(e){
    if(getParentElement(e.currentTarget, 8).classList[0] === 'split-cards-box'){
    var ctaText =  e.currentTarget.innerText.trim();
    var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('h2').innerText.trim();
    var componentName = 'split cards box';
    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    }
    })
});
} catch(error){
    console.log('element not found', error);
}
// split card box analytics END

// select branch locator analytics START
try{
    var cityHolder = [];
    var stateHolder = [];
    $('[data-type="state"]').on('select2:select', function (e) {
        var state = e.params.data.text;
        stateHolder.push(state);
    });
    $('[data-type="city"]').on('select2:select', function (e) {
        var city = e.params.data.text;
        cityHolder.push(city);
    });
    $('[data-type="product"]').on('select2:select', function (e) {
        var product = e.params.data.text;
        var componentName = 'select branch locator box';
        var ctaTitle = getParentElement(e.currentTarget, 10).querySelector('.component-title h2').innerText.trim();
        selectbranchLocator(cityHolder.pop(),stateHolder.pop(),componentName,ctaTitle,product)
        cityHolder =[];
        stateHolder = [];
    });
} catch(error){
    console.log('element not found', error);
}
// select branch locator tabs analytics END 

// branch locator sms details send analytics START
try {
    var blSmsDetailsBtn = document.querySelector('.branch-locator-sms .jsSendDeatilsBtn');
    blSmsDetailsBtn.addEventListener('click', function (e) {
        if (getParentElement(e.currentTarget, 1).querySelector('.error-msgs').innerText.length == 0
        && getParentElement(e.currentTarget, 2).id) {
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('p').innerText.trim();
        var mobileNo = getParentElement(e.currentTarget, 1).querySelector('.error-msgs').innerText.length == 0
        ? getParentElement(e.currentTarget, 1).querySelector('[data-type="mobile-number"]').value : '';
        var componentName = 'branch sms details popup';
        sendbranchDetails(ctaText, componentName, ctaTitle, mobileNo);
        }
    })
} catch (error) {
    console.log('element not found', error);
}
// branch locator sms details send analytics END

// branch locator analytics btn START
try{
    var branchLocApplyBtn = document.querySelector('.branch-instant-loan-box .approved-candidate .btn-blue');
    branchLocApplyBtn.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 7).classList[0] == 'branch-instant-loan-box'){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 5).querySelector('.component-title h2').innerText.trim();
        var componentName = getParentElement(e.currentTarget, 7).classList[0].split('-').join(' ');
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        }
    })
} catch (error) {
    console.log('element not found', error);
}
// branch locator apply btn analytics END

// sticky widget analytics START
try{
    var stickyWidgetDownloadApp = document.querySelector('.custom-sticky-widget .downloadApp a');
    var stickyWidgetCreditScore = document.querySelector('.custom-sticky-widget .creditScore a');
    function stickyWidget(selector, compName){
        selector.addEventListener('click', function(e){
            var widgetName = e.currentTarget.innerText.trim();
            var componentName = compName
            widgetInteraction(widgetName,componentName);
        });
    }
    stickyWidget(stickyWidgetDownloadApp, 'sticky widget download App');
    stickyWidget(stickyWidgetCreditScore, 'sticky widget credit Score')
} catch(error) {
    console.log('element not found', error);
}
// sticky widget analytics END


// download app popup submenu analytics START
try{
    var downloadWidgetTabs = document.querySelectorAll('#getOurApps .nav-tablist a');
    downloadWidgetTabs.forEach(function(tab){
        console.log(getParentElement(tab, 4).querySelector('h5').innerText.trim());
        tab.addEventListener('click', function(e){
            var menuLinkText = e.currentTarget.innerText.trim();
            var componentName = 'Download App Popup'
            var activeTab = '';
            activeTab = e.currentTarget.getAttribute('tab-menu');
            var menuTitle = getParentElement(e.currentTarget, 4).querySelector('.tab-content [tab-contnet="'+activeTab+'"] h5').innerText.trim();
            submenuClick(menuLinkText,componentName,menuTitle,productCodeId);
        })
    });
} catch(error) {
    console.log('element not found', error);
}
// download app popup submenu analytics END

// pre approved instant loan instant benefits analytics START
try{
    var preApprovedProceedBtn = document.querySelector('#preApprovedLoanForm .js-proceed-btn');
    preApprovedProceedBtn.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('.cmp-text p').innerText.trim();
        var componentName =  getParentElement(e.currentTarget, 13).querySelector('h2').innerText.trim();
        var mobileNo = document.querySelector('#preApprovedLoanForm [data-type="mobile"]').value;
        var perceptualId = domUtils.getCookie('perpetualId') ? domUtils.getCookie('perpetualId') : "";
        preapprovedplanproceedClick(ctaText,ctaTitle,componentName,mobileNo,perceptualId);
    });
} catch(error) {
    console.log('element not found', error);
}

try{
    // preApproved offer track application & resend Otp analytics START
    var instantLoanTrackApplication = document.querySelector('.pre-approved .instant-loan .title a');
    var preApprovedOtpResend = document.querySelector('#preApprovedOtp .js-resendOTP');
    function trackAppResendOtp(selector){
        selector.addEventListener('click', function(e){
        var componentName = 'pre approved offers loan box';
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 5).querySelector('h2').innerText.trim();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        });
    }
    trackAppResendOtp(instantLoanTrackApplication);
    trackAppResendOtp(preApprovedOtpResend);
    // preApproved offer track application & resend Otp analytics END
} catch(error) {
    console.log('element not found', error);
}
// pre approved instant loan instant benefits analytics END

// all insurance clear form cta analytics START
try {
    var clearLeadForm = document.querySelector('.lead-forms .jsClearLoanDeatils');
    clearLeadForm.addEventListener('click', function (e) {
        if (getParentElement(e.currentTarget, 6).classList[0] == 'lead-forms') {
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('.loan-against-header h4').innerText.trim();
            var componentName = getParentElement(e.currentTarget, 6).classList[0].split('-').join(' ');
            if (window.location.href.split('/').pop().split('.').shift() == "apply-now-new-car-loan") {
                componentName = 'new car loan';
            }
            ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
        }
    });
} catch (error) {
    console.log('element not found', error);
}
// all insurance clear form cta analytics END
try {
    var clearLeadForm = document.querySelector('.lead-forms .la-agree-btn a');
    clearLeadForm.addEventListener('click', function (e) {
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = e.currentTarget.parentElement.innerText;
        var componentName = getParentElement(e.currentTarget, 6).classList[0].split('-').join(' ');
        if (window.location.href.split('/').pop().split('.').shift() == "apply-now-new-car-loan") {
            componentName = 'new car loan';
        }
        ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
        console.log(ctaText, componentName, ctaTitle, productCodeId);
        /* 
        if (getParentElement(e.currentTarget, 6).classList[0] == 'lead-forms') {
        } */
    });
} catch (error) {
    console.log('element not found', error);
} 
// all insurance clear form cta analytics END

// faq accordion with tab analytics START
try{
    var faqWithAccordianTabs = document.querySelectorAll('.faq-accordian-with-tab .tab-btn-group a');
    faqWithAccordianTabs.forEach(function(faqWithAccordianTab) {
        faqWithAccordianTab.addEventListener('click', function(e){
            var widgetName = e.currentTarget.innerText.trim();
            var componentName = 'faq accordion with tabs';
            widgetInteraction(widgetName,componentName);
        });
    });
} catch(error) {
    console.log('element not found', error);
}
// faq accordion with tab analytics END

// word highlight analytics START
try{
    var wordHighlightLinks =  document.querySelectorAll('.about-product .rte.title a');
    wordHighlightLinks.forEach(function(wordLink){
        if(wordLink.innerText.length > 0)
        wordLink.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        // loan against prop word Highlight analytics START
        var ctaTitle = '';
        if(getParentElement(e.currentTarget, 7).classList[0] == 'personal-para') {
            ctaTitle =  getParentElement(e.currentTarget, 7).querySelector('.component-title h2').innerText.trim();
        } else {
            ctaTitle =  getParentElement(e.currentTarget, 3).querySelector('.component-title h2').innerText.trim();
        }
        // loan against prop word highlight analytics END
        var componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId)
        });
    })
} catch(error){
    console.log('element not found', error);
}
// word highlight analytics END

// area conversion calculator analytics START
try{
    var areaMetrics = document.querySelectorAll('.area-conversion-calculator .area-conversion-inner .js-searchDropdownWrap ul li a');
    areaMetrics.forEach(function(areaMetric){
        areaMetric.addEventListener('click', function(e){
        var fieldName = getParentElement(e.currentTarget, 6).querySelector('.area-conversion-col p').innerText.trim();
        var calculatorName = document.querySelector('.page-header .component-title h1') !== null ? 
        document.querySelector('.page-header .component-title h1').innerText.trim() : '';
        var componentName = calculatorName;
        calculatorfieldInteraction(fieldName,calculatorName,componentName,productCodeId);
        });
    });
} catch(error){
    console.log('element not found', error);
}
// area conversion calculator analytics END

// homepage calculators analytics START
try{
    var homePageCalculatorTabs = document.querySelectorAll('.home-page-calculator .custom-js-tabClick');
    homePageCalculatorTabs.forEach(function(homePageCalculatorTab) {
        homePageCalculatorTab.addEventListener('click', function(e){
            var menuLinkText = e.currentTarget.innerText.trim();
            var componentName = getParentElement(e.currentTarget, 8).classList[0].split('-').join(' ');
            var menuTitle = getParentElement(e.currentTarget, 13).querySelector('h2').innerText.trim();
            var product = getParentElement(e.currentTarget, 8).querySelector('.js-loanDropdown') ? getParentElement(e.currentTarget, 8).querySelector('.js-loanDropdown').innerText.trim() : '';
            var aa_productCode = '';
            product.split(' ').forEach(function(prod){
                aa_productCode += prod.slice(0,1);
            });
            submenuClick(menuLinkText,componentName,menuTitle,aa_productCode);
        });
    });
} catch(error) {
    console.log('element not found', error);
}
// homepage calculators analytics END

// ways-to-service analytics START
try{
var wayToServiceCtas = document.querySelectorAll('.ways-to-service .way-service-options-links a');
wayToServiceCtas.forEach(function(wayToServiceCta){
    wayToServiceCta.addEventListener('click', function(e){
    var ctaText = e.currentTarget.innerText.trim();
    var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('.way-service-options-heading h3').innerText.trim();
    var componentName = 'ways to service box';
    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    })
})
} catch(error) {
    console.log('element not found', error);
}
// ways-to-service analytics END

// ways to service Tabs analytics START
try{
var waysToServiceTabs = document.querySelectorAll('.ways-to-service .wts-tabs .tab-left button');
waysToServiceTabs.forEach(function(waysToServiceTab){
    waysToServiceTab.addEventListener('click', function(e){
    var widgetName = e.currentTarget.innerText.trim();
    var componentName = getParentElement(e.currentTarget, 9).querySelector('.component-title h2').innerText.trim();
    widgetInteraction(widgetName,componentName);
    })
});
} catch(error) {
    console.log('element not found', error);
}
// ways to service tabs analytics END

// ways to service btns analytics END
try{
var waysToServiceBtns = document.querySelectorAll('.ways-to-service .tab-content-wrap .btn-blue');
waysToServiceBtns.forEach(function(wayToServiceBtn){
    wayToServiceBtn.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 7).querySelector('.content-decs-wrap h2').innerText.trim();
        var componentName = getParentElement(e.currentTarget, 16).querySelector('h2').innerText.trim();
        ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
    })
})
} catch(error) {
    console.log('element not found', error);
}
// ways to service btns analytics END

// filter applied insurance analytics START
try {
    var filterSelect = document.querySelectorAll('#filerList [type="checkbox"]');
    var filterAppliedArr = [];
    filterSelect.forEach(function (filter) {
        filter.addEventListener('change', function (e) {
        if (getParentElement(e.currentTarget, 10).classList[0] === 'saving-and-investment') {
            var ctaTitle = getParentElement(e.currentTarget, 10).querySelector('.component-title h2').innerText.trim();
            var componentName = window.location.href.split('/').pop().split('.').shift() + ' ' + 'filter';
            if (e.currentTarget.checked) {
                var filterChoose = getParentElement(e.currentTarget, 1).querySelector('p').innerText.trim();
                filterAppliedArr.push(filterChoose);
                if (filterAppliedArr.length > 0) {
                    appliedFilter = filterAppliedArr.toString();
                    filterApplied(ctaTitle, appliedFilter, componentName, productCodeId)
                }
            } else if (!e.currentTarget.checked) {
                var filterChoose = getParentElement(e.currentTarget, 1).querySelector('p').innerText.trim();
                if (filterAppliedArr.length > 0) {
                    filterAppliedArr.splice(filterAppliedArr.indexOf(filterChoose), 1)
                    filterApplied(ctaTitle, filterAppliedArr.toString(), componentName, productCodeId)
                }
            }
        }
        })
    })
} catch (error) {
    console.log('element not found', error);
}
// filter applied insurance analytics END

// saving-investments-box apply now know more analytics START
try{
    var applyNowBtns = document.querySelectorAll('.saving-investments-box .investment-button-wrapper .btn-blue');
    applyNowBtns.forEach(function(applyNowBtn){
        applyNowBtn.addEventListener('click', function(e) {
            if(getParentElement(e.currentTarget, 11).classList[0] === 'saving-and-investment'){
            var ctaText = e.currentTarget.innerText.trim();
            var componentName = getParentElement(e.currentTarget, 11).querySelector('.component-title h2').innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 5).querySelector('.col-bottom-content h4').innerText.trim();
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
            }
        });
    });
    var knowMoreLinks = document.querySelectorAll('.saving-investments-box .investment-button-wrapper .btn-links a');
    knowMoreLinks.forEach(function(knowMoreLink){
        knowMoreLink.addEventListener('click', function(e){
            if(getParentElement(e.currentTarget, 10).classList[0] === 'saving-and-investment'){
            var ctaText = e.currentTarget.innerText.trim();
            var componentName = getParentElement(e.currentTarget, 11).querySelector('.component-title h2').innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('.col-bottom-content h4').innerText.trim();
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
            }
        })
    });
} catch(error){
    console.log('element not found', error);
}
// saving-investments-box apply now know more analytics END

// contact us cta calls analytics START
try{
    var reachToUsBtn = document.querySelector('.contact-us-information-box .reachout-btn .btn-link');
    reachToUsBtn.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 15).classList[0] == 'contact-us-information-box'){
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('.component-title h3').innerText.trim();
            var componentName = getParentElement(e.currentTarget, 15).classList[0].split('-').join(' ');
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        }
    })
} catch(error){
    console.log('element not found', error);
}
// contact us cta calls analytics END

// contact us top email details analytics START
var topDetailEmails = document.querySelectorAll('.contact-us-information-box .top-right-content .top-details .loan-col a');
topDetailEmails.forEach(function(topDetailEmail){
    topDetailEmail.addEventListener('click',function(e){
    var ctaText = e.currentTarget.innerText.trim();
    var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('p').innerText.trim();
    var componentName = getParentElement(e.currentTarget, 16).classList[0].split('-').join(' ');
    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    });
});
// contact us top email details analytics END

// contact info bottom analytics START
try{
var contactusInfoBoxes = document.querySelectorAll('.contact-info-main .bottom-content .cmp-teaser__action-link');
contactusInfoBoxes.forEach(function(contactusInfoBox){
    contactusInfoBox.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 11).classList[0] == 'contact-info-main'){
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('.heading20').innerText.trim();
            var componentName = getParentElement(e.currentTarget, 14).classList[0].split('-').join(' '); 
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        }
    })
});
} catch(error){
    console.log('element not found', error);
}
//  contact info bottom analytics END

// contact us customer greivances widget Interaction analytics START
try{
var greivancesWidgetTabs = document.querySelectorAll('.consumer-finance-tabs .board-directors-left .jsTabSelect');
greivancesWidgetTabs.forEach(function(greivancesWidgetTab){
    greivancesWidgetTab.addEventListener('click', function(e){
        var widgetName = e.currentTarget.innerText.trim();
        var componentName = 'contact us ' + window.location.href.split('/').pop().split('.').shift().split('-').join(' ');;
        widgetInteraction(widgetName,componentName);
    });
})
} catch(error){
    console.log('element not found', error);
}
// contact us customer greivances widget Interaction analytics END

// contact us customer greivance-documents analytics START
try{
    var cutomerGrievanceDocLinks = document.querySelectorAll('.grievance-documents .grievance-arrow-list .btn-links');
    cutomerGrievanceDocLinks.forEach(function(docLink){
        docLink.addEventListener('click', function(e){
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('.component-title h3').innerText.trim();
            var componentName = getParentElement(e.currentTarget, 4).classList[0].split('-').join(' ');
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        });
    });
} catch(error){
    console.log('element not found', error);
}
// contact us customer greivance-documents analytics START

// contact us customer testimonial filter analytics START
try{
    var testimonialFilters = document.querySelectorAll('.cutomer-speak-box .list label');
    testimonialFilters.forEach(function(testimonialFilter){
        testimonialFilter.addEventListener('click', function(e){
            //e.preventDefault()
            var ctaTitle = getParentElement(e.currentTarget, 11).querySelector('.top-right .link-with-arrow').innerText.trim();
            var appliedFilter = e.currentTarget.innerText.trim();
            var componentName = window.location.href.split('/').pop().split('.').shift() + ' Filter';
            filterApplied(ctaTitle, appliedFilter, componentName, productCodeId);
        });
    });
} catch(error){
    console.log('element not found', error);
}
// contact us customer testimonial filter analytics END

// about us all awards filter analytics START

// filterApplied(ctaTitle, appliedFilter, componentName, productCodeId);
// about us all awards filter analytics END

// contact us customer testimonial cta
try{
var customerTestimonialCta = document.querySelector('.customer-speak .customer-speak-top .top-right a');
customerTestimonialCta.addEventListener('click', function(e){
    var ctaText = e.currentTarget.innerText.trim();
    var componentName = window.location.href.split('/').pop().split('.').shift();
    var ctaTitle = getParentElement(e.currentTarget, 2).classList[0].split('-').join(' ');
    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
});
} catch(error){
    console.log('element not found', error);
}
// media centre corporate presentation analytics START
try{
    var corporatePresentation = document.querySelector('.corporate-presentation .link-with-arrow a');
    corporatePresentation.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 9).classList[0] == 'corporate-presentation'){
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 9).querySelector('.main-heading').innerText.trim();
            var componentName = 'media centre overview'
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        }
    });
} catch(error){
    console.log('element not found', error);
}
// media centre corporate presentation analytics END

// media centre download logo analytics START
try{
var downloadLogoBtns = document.querySelectorAll('.download-logo .download-logo-button a');
downloadLogoBtns.forEach(function(downloadLogoBtn){
    downloadLogoBtn.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 13).classList[0]=== 'download-logo'){
            var ctaText = e.currentTarget.innerText.trim();
            var componentName = getParentElement(e.currentTarget, 13).querySelector('h2').innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('.top-cotent p').innerText.trim();
            console.log(ctaText,componentName,ctaTitle,productCodeId);
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        }
    })
})
} catch(error){
    console.log('element not found', error);
}
// media centre download logo analytics END

// media centre recent updates analytics START
try{
var recentUpdatesCards = document.querySelectorAll('.recent-updates .recent-updates-card-items a');
recentUpdatesCards.forEach(function(recentUpdatesCard) {
    recentUpdatesCard.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 16).classList[0] == 'recent-updates') {
            var ctaText = e.currentTarget.querySelector('.text16i').innerText.trim();
            var componentName = 'media centre overview';
            var ctaTitle = getParentElement(e.currentTarget, 16).querySelector('h3').innerText.trim();
            console.log(ctaText,componentName,ctaTitle,productCodeId);
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        }
    })
});
} catch(error){
    console.log('element not found', error);
}
// media centre recent updates analytics END

// media centre recent updates items analytics START
try{
var recentUpdatesItems =  document.querySelectorAll('.recent-updates .resource-right-item');
recentUpdatesItems.forEach(function(recentUpdatesItem) {
    recentUpdatesItem.addEventListener('click', function(e){
            var ctaText = getParentElement(e.currentTarget, 1).querySelector('.heading20').innerText.trim();
            if(getParentElement(e.currentTarget, 8).classList[0] == 'recent-updates'){
                var ctaTitle = getParentElement(e.currentTarget, 8).querySelector('h3').innerText.trim();
            } else if (getParentElement(e.currentTarget, 7).classList[0] == 'recent-updates'){
                var ctaTitle = getParentElement(e.currentTarget, 7).querySelector('h3').innerText.trim();
            }
            var componentName = 'media centre overview';
            console.log(ctaText,componentName,ctaTitle,productCodeId);
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    });
});
} catch(error){
    console.log('element not found', error);
}
// media centre recent updates items analytics END

// media center filter applied analytics START
try {
    var mediaFilterSelect = document.querySelectorAll('#filerList [type="checkbox"]');
    var mediaFilterArr = [];
    mediaFilterSelect.forEach(function (filter) {
        filter.addEventListener('change', function (e) {
        if (getParentElement(e.currentTarget, 11).classList[0] == 'custom-dropdown-wrap'){
            var ctaTitle = getParentElement(e.currentTarget, 11).querySelector('.custom-dropdown-btn').innerText.trim();
            var componentName = 'media ' + window.location.href.split('/').pop().split('.').shift() + ' ' + 'filter';
            if (e.currentTarget.checked) {
            var filterSelect = getParentElement(e.currentTarget, 3).querySelector('p').innerText.trim();
            mediaFilterArr.push(filterSelect);
                if (mediaFilterArr.length > 0 && filterSelect !== 'ALL') {
                    appliedFilter = mediaFilterArr.toString();
                    filterApplied(ctaTitle, appliedFilter, componentName, productCodeId)
                }
            } else if (!e.currentTarget.checked) {
            var filterSelect = getParentElement(e.currentTarget, 3).querySelector('p').innerText.trim();
            if (mediaFilterArr.length > 0 && filterSelect !== 'ALL') {
                mediaFilterArr.splice(mediaFilterArr.indexOf(filterSelect), 1)
                if(mediaFilterArr.toString() !== ''){
                    filterApplied(ctaTitle, mediaFilterArr.toString(), componentName, productCodeId)
                }
            } 
            }
        }
        });
    });
} catch (error) {
    console.log('element not found', error);
}
// media center filter applied analytics END

// playVideo related video + media centre analytics START
try {
    var relatedVideosPlay = document.querySelectorAll('.custome-related-videos [data-target="#video-modal"], .custome-related-videos [data-target="#video-modal-product"]');
    if (relatedVideosPlay.length > 0) {
        relatedVideosPlay.forEach(function (relatedVideoPlay) {
            relatedVideoPlay.addEventListener('click', function (e) {
                if (getParentElement(e.currentTarget, 7).classList[0] === 'custome-related-videos' || getParentElement(e.currentTarget, 7).classList[0] === "related-video-cntr") {
                    var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('.block-title').innerText.trim();
                    var componentName = window.location.href.split('/').pop().split('.').shift() == 'video'
                        ? 'media videos' : getParentElement(e.currentTarget, 7).querySelector('.component-title h2').innerText.trim();
                    if (ctaTitle == '') ctaTitle = componentName;
                    playVideo(componentName, ctaTitle);
                }
            })
        });
    } else {
        console.log('No related videos found to add event listeners.');
    }
} catch (error) {
    console.log('element not found', error);
}
// playVideo related video + media centre analytics END

// related video shareInitiate + media centre share Initiate analytics START
try {
    var mediaRelatedVideoShares = document.querySelectorAll('.custome-related-videos .js-shares-btn');
    mediaRelatedVideoShares.forEach(function (mediaRelatedVideoShare) {
        mediaRelatedVideoShare.addEventListener('click', function (e) {
            if(getParentElement(e.currentTarget, 9).classList[0] === 'custome-related-videos'){    
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle =  getParentElement(e.currentTarget, 4).querySelector('.block-title h3') 
            ?  getParentElement(e.currentTarget, 4).querySelector('.block-title h3').innerText.trim()
            : getParentElement(e.currentTarget, 4).querySelector('.block-title p').innerText.trim();
            var componentName = window.location.href.split('/').pop().split('.').shift() == 'video' 
            ? 'media videos' : getParentElement(e.currentTarget, 9).querySelector('.component-title h2').innerText.trim();
            shareInitiate(componentName,ctaTitle,ctaText)
            }
        })
    });
} catch (error) {
    console.log('Element not found', error);        
}
// related video shareInitiate + media centre share Initiate analytics END

// related videos + media center social media share analytics START
try{
    var relatedVidSocialMediaShares = document.querySelectorAll('.custome-related-videos .share-bundle-menu .social-btn');
    relatedVidSocialMediaShares.forEach(function(relatedVidSocialMediaShare){
        relatedVidSocialMediaShare.addEventListener('click', function(e){
            if(getParentElement(e.currentTarget, 10).classList[0] = 'custome-related-videos'){    
            var componentName = window.location.href.split('/').pop().split('.').shift() == 'video' 
            ? 'media videos' : getParentElement(e.currentTarget, 9).querySelector('.component-title h2').innerText.trim();
            var ctaTitle =  getParentElement(e.currentTarget, 4).querySelector('.block-title h3') 
            ?  getParentElement(e.currentTarget, 4).querySelector('.block-title h3').innerText.trim()
            : getParentElement(e.currentTarget, 4).querySelector('.block-title p').innerText.trim();
            var iconName = e.currentTarget.dataset.share ? e.currentTarget.dataset.share.split('-').join(' ') : e.currentTarget.querySelector('.text-copy').innerText.trim(); 
            socialmediaiconClick(componentName,ctaTitle,iconName);
            }
        });
    });
} catch(error){
    console.log(error);
}
// related videos + media centre social media share analytics END

// Campaign footer Social Icon
try{
    var footerSocialIcon = document.querySelectorAll('.nps-footer-box .nps-social-list li');
    footerSocialIcon.forEach(function(footerSocialIconShare){
        footerSocialIconShare.addEventListener('click', function(e){
            if(getParentElement(e.currentTarget, 5).classList[0] == 'nps-footer-box'){    
            var componentName = 'footer';
            var ctaTitle = '';
            var iconName ;
            if($(e.currentTarget).find('span').attr('class') == 'icon-instagram'){
                iconName = 'instagram'
            }
            else if($(e.currentTarget).find('span').attr('class') == 'icon-facebook'){
                 iconName = 'facebook'
            }
            else if($(e.currentTarget).find('span').attr('class') == 'icon-twitter'){
                 iconName = 'twitter'
            }
            else if($(e.currentTarget).find('span').attr('class') == 'icon-youtube'){
                 iconName = 'youtube'
            }
            else if($(e.currentTarget).find('span').attr('class') == 'icon-linkedin'){
                 iconName = 'linkedin'
            }
            socialmediaiconClick(componentName,ctaTitle,iconName);
            }
        });
    });
} catch(error){
    console.log(error);
}
// Campaign footer Social Icon

// media center video audio tabs + contact us customer greivance tabs analytics START
try{
var mediaTabs = document.querySelectorAll('.about-us-dropdown-buttons .tab-item');
mediaTabs.forEach(function(mediaTab){
    mediaTab.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 8).classList[0] == 'about-us-dropdown-buttons') {
            var menuLinkText = e.currentTarget.innerText.trim();
            var menuTitle = 'media center' + ' ' + e.currentTarget.innerText.trim();
            var componentName = getParentElement(e.currentTarget, 5).classList[0].split('-').join(' ');
            console.log(menuLinkText,componentName,menuTitle);
            submenuClick(menuLinkText,componentName,menuTitle,productCodeId)
        } else if(getParentElement(e.currentTarget, 6).classList[0] == 'about-us-dropdown-buttons'){
            var menuLinkText = e.currentTarget.innerText.trim();
            var menuTitle = 'contact us' + ' ' + e.currentTarget.innerText.trim();
            var componentName = window.location.href.split('/').pop().split('.').shift() + 'top tabs';
            console.log(menuLinkText,componentName,menuTitle);
            submenuClick(menuLinkText,componentName,menuTitle,productCodeId)
        }
    })
});
} catch(error){
    console.log('element not found', error);
}
// media center video audio tabs + contact us customer greivance tabs analytics END

// media center audio analytics START
try{
var mediaAudioBtns = document.querySelectorAll('.media-audio-box .play-pause-btn');
mediaAudioBtns.forEach(function(mediaAudioBtn){
    mediaAudioBtn.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 8).classList[0] == 'media-audio-box') {
            if(e.currentTarget.getAttribute('aria-label') === 'Pause'){
                var ctaTitle = getParentElement(e.currentTarget, 5).querySelector('h4').innerText.trim();
                var componentName = 'media audio box';
                console.log('cta', componentName, ctaTitle);
                playAudio(componentName,ctaTitle);
            }
        }
    });
});
} catch(error){
    console.log('element not found', error);
}
// media center audio analytics END

// media center press release analytics START
try{
var mediaPressRelease = document.querySelector('.press-release .latest-rights .white-blue-button a');
    mediaPressRelease.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 7).querySelector('h2').innerText.trim();
        var componentName = 'media ' +  window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    });
} catch(error){
    console.log('element not found', error);
}
// media center press release analytics END

// all press release FAQs analytics START
try{
var allPressReleaseFaqs = document.querySelectorAll('.all-press-release [accod-row="accod-row"] .press-links');
allPressReleaseFaqs.forEach(function(allPressReleaseFaq){
    allPressReleaseFaq.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 5).classList[0] == 'all-press-release'){
        var faqTitle = e.currentTarget.innerText.trim();
        var componentName = getParentElement(e.currentTarget, 5).classList[0].split('-').join(' ') + ' faqs';
        faqClick(componentName,faqTitle,productCodeId);
        }
    })  
})
} catch(error){
    console.log('element not found', error);
}
// all press release FAQs analytics END

// press release FAQ body analytics START
try{
var pressReleaseFaqsBody =  document.querySelectorAll('.press-release-cards .press-body .press-bottom .btn-links');
pressReleaseFaqsBody.forEach(function(pressReleaseFaqBody){
    pressReleaseFaqBody.addEventListener('click', function(e){
        if(getParentElement(document.querySelectorAll('.press-release-cards .press-body .press-bottom .btn-links')[0], 13).classList[0])
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle =  getParentElement(e.currentTarget, 5).querySelector('.text14').innerText.trim();
        var componentName = getParentElement(e.currentTarget, 9).querySelector('[accod-head="accod-head"]').innerText.trim();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    })
})
} catch(error){
    console.log('element not found', error);
}
// press release FAQs body analytics END

// Sustainability analytics START
try{
var esgResourceCta =  document.querySelector('.esg-resources .esg-resource-left-item .btn-blue');
    esgResourceCta.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 9).classList[0] == 'esg-resources'){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('.heading20').innerText.trim();
        var componentName = getParentElement(e.currentTarget, 9).classList[0].split('-').join(' ');
        console.log(ctaText,componentName,ctaTitle);
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        }
    });
    var esgResourceActionLinks = document.querySelectorAll('.esg-resources .esg-resources-col-item .link-with-arrow');
    esgResourceActionLinks.forEach(function(esgResourceActionLink){
        esgResourceActionLink.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 11).classList[0] == 'esg-resources'){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('h3').innerText.trim();
        var componentName = getParentElement(e.currentTarget, 11).classList[0].split('-').join(' ');
        console.log(ctaText,componentName,ctaTitle);
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        }
        })
    })
} catch(error){
    console.log('element not found', error);
}
// Sustainability analytics END

// quick Links drawer analytics START
try{
var quickLinksSticky = document.querySelector('.quick-links-drawer .jsLeftSticky');
quickLinksSticky.addEventListener('click', function(e){
    if(getParentElement(e.currentTarget, 1).classList[0] == 'quick-links-drawer'){
        var widgetName = e.currentTarget.innerText.trim();
        var componentName = getParentElement(e.currentTarget, 1).classList[0].split('-').join(' ');
        widgetInteraction(widgetName,componentName);
    }
});
} catch(error){
    console.log('element not found', error);
}
// quick Links drawer analytics END

// quick Links actions analytics START
try{
var quickLinksActions = document.querySelectorAll('.quick-links-drawer .actions a');
quickLinksActions.forEach(function(quickLinksAction){
    quickLinksAction.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 5).querySelector('a').innerText.trim();
        var componentName = getParentElement(e.currentTarget, 5).classList[0].split('-').join(' ');
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    })
});
} catch(error){
    console.log('element not found', error);
}
// quick Links actions analytics END

// instant loan in your city analytics START
try{
var instantLoanCities = document.querySelectorAll('.instant-loan-in-your-city .instant-loan-in-your-city-card [data-cta="Explore Our Products"]');
instantLoanCities.forEach(function(instantLoanCityCard){
    instantLoanCityCard.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 5).querySelector('.instant-loan-in-your-city-heading p').innerText.trim() ||
                       getParentElement(e.currentTarget, 5).querySelector('.instant-loan-in-your-city-heading h3').innerText.trim()
        var componentName = 'instant loan in your city';
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    });
});
} catch(error){
    console.log('element not found', error);
}
// instant loan in your city analytics END

// insurance plan box products html analytics START
try{
    var widgetProductPlanBoxTabs = document.querySelectorAll('.insurance-plans .insurance-plan-box .insurance-plans-left a');
    widgetProductPlanBoxTabs.forEach(function(widgetProductPlanBoxTab){
        widgetProductPlanBoxTab.addEventListener('click', function(e){
            if(getParentElement(e.currentTarget, 5).classList[0] == 'insurance-plans'){
                var widgetName = e.currentTarget.innerText.trim();
                var componentName = window.location.href.split('/').reverse()[1] + ' ' + window.location.href.split('/').pop().split('.').shift();
                widgetInteraction(widgetName,componentName);
            }
        })
    })
} catch(error){
    console.log('element not found', error);
}
// insurance plan box products html analytics END

// insurance Plan box apply btns analytics START
try{
var productPlanBoxApplyBtns = document.querySelectorAll('.insurance-plans .insurance-plans-right .white-blue-button a');
productPlanBoxApplyBtns.forEach(function(productPlanBoxApplyBtn){
    productPlanBoxApplyBtn.addEventListener('click', function(e){
        var ctaText =  e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('.heading20').innerText.trim();
        var componentName = window.location.href.split('/').reverse()[1] + ' ' + window.location.href.split('/').pop().split('.').shift();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    })
});
} catch(error){
    console.log('element not found', error);
}
// insurance Plan box apply btns analytics END

// hl pmay check eligibility analytics START
try{
var checkEligibilityPmay = document.querySelector('.check-loan-eligibility .white-blue-button a');
checkEligibilityPmay.addEventListener('click', function(e){
    if(getParentElement(e.currentTarget, 9).classList[0] == 'check-loan-eligibility'){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 9).querySelector('h2').innerText.trim();
        var componentName = getParentElement(e.currentTarget, 8).classList[0].split('-').join(' ');
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    }
});
} catch(error){
    console.log('element not found', error);
}
// hl pmay check eligibility analytics END

// career oportunities box analytics START
try{
    var careerOppurtunityCta = document.querySelector('.current-opportunities .current-opportunities-left .btn-blue');
    careerOppurtunityCta.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        var componentName = getParentElement(e.currentTarget, 6).classList[0].split('-').join(' ');
        var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('.component-title h2').innerText.trim();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    })
} catch(error){
    console.log('element not found', error);
}
// career oportunities box analytics START

// about us subsidary companies analytics START
try{
var subsidaryCompanies = document.querySelectorAll('.subsidiary-companies .subsidiary-companies-items a');
subsidaryCompanies.forEach(function(subsidaryCompany){
    subsidaryCompany.addEventListener('click', function(e){
        var ctaText = getParentElement(e.currentTarget, 1).querySelector('.heading20').innerText.trim();
        var componentName = getParentElement(e.currentTarget, 5).classList[0];
        var ctaTitle =  getParentElement(e.currentTarget, 5).querySelector('.component-title h2').innerText.trim();;
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    })
})
} catch(error){
    console.log('element not found', error);
}
// about us subsidary companies analytics END

// about us management leadership team analytics START
try{
var viewProfileCards = document.querySelectorAll('.key-people .leadership-team-card .leadership-content .btn-link');
viewProfileCards.forEach(function(viewProfileCard){
    viewProfileCard.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        var componentName = getParentElement(e.currentTarget, 5).classList[0];
        var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('.team-name').innerText.trim();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    });
});
} catch(error){
    console.log('element not found', error);
}
// about us management leadership team analytics END

// about us board of directors analytics START
try{
    var keyPeopleArrowLinks = document.querySelectorAll('.key-people .key-people-bottom .link-with-arrow');
    keyPeopleArrowLinks.forEach(function(keyPeopleArrowLink){
        keyPeopleArrowLink.addEventListener('click', function(e){
            var ctaText = e.currentTarget.innerText.trim();
            var componentName = getParentElement(e.currentTarget, 3).classList[0].split('-').join(' ');
            var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('.key-people-top .heading20').innerText.trim();
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        })
    })
} catch(error){
    console.log('element not found', error);
}
// about us board of directors analytics END

// about us top tabs analytics START
try{
var keyPeopleTopTabs = document.querySelectorAll('.key-people .cmp-tabs__tablist li');
keyPeopleTopTabs.forEach(function(keyPeopleTopTab) {
    keyPeopleTopTab.addEventListener('click', function(e){
        var menuLinkText = e.currentTarget.innerText.trim();
        var menuTitle = getParentElement(e.currentTarget, 6).classList[0].split('-').join(' ');
        var componentName = window.location.href.split('/').pop().split('.').shift();
        submenuClick(menuLinkText,componentName,menuTitle,productCodeId);
    })
});
} catch(error){
    console.log('element not found', error);
}
// about us top tabs analytics END

// about us faqClick analytics START
try{
var aboutUsFaqWithTabs = document.querySelectorAll('.custom-investor-information .faq-row .faq-heading');
aboutUsFaqWithTabs.forEach(function(aboutUsFaqWithTab) {
    aboutUsFaqWithTab.addEventListener('click', function(e){
        var faqTitle = e.currentTarget.innerText.trim();
        var componentName = getParentElement(e.currentTarget,4).querySelector('h2').innerText.trim();
        faqClick(componentName,faqTitle,productCodeId);
    });
});
} catch(error){
    console.log('element not found', error);
}
// about us faqClick anlaytics END

// about us faq content list info pdfs analytics START
try{
var listInfoPdfs = document.querySelectorAll('.custom-investor-information .faq-row .list-info-pdf li');
listInfoPdfs.forEach(function(listInfoPdf){
    listInfoPdf.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget ,4).querySelector('.faq-heading').innerText.trim();
        var componentName = getParentElement(e.currentTarget, 6).querySelector('h2').innerText.trim();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    });
});
} catch(error){
    console.log('element not found', error);
}
// about us faq content list info pdfs analytics END

// about us read companies + whatsapp html analytics START
try{
var aboutUsCompanyArticles = document.querySelectorAll('.apply-for-loans .apply-row-first .apply-lists');
aboutUsCompanyArticles.forEach(function(aboutUsCompanyArticle){
    aboutUsCompanyArticle.addEventListener('click', function(e){
        var ctaText = e.currentTarget.querySelector('.text16i').innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 12).querySelector('.component-title h2').innerText.trim();
        var componentName = window.location.href.split('/').pop().split('.').shift();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    })
})
} catch(error){
    console.log('element not found', error);
}
// about us read compoanies + whatsapp html analytics END

// rera apply now button analytics START
try{
    var reraApplyNow = document.querySelector('.instant-loan-box').nextElementSibling.querySelector('.white-blue-button a');
    reraApplyNow.addEventListener('click', function(e){
        if( getParentElement(e.currentTarget, 3).previousElementSibling.classList[0] == 'instant-loan-box'){
        var ctaText = e.currentTarget.innerText.trim();
        var componentName = getParentElement(e.currentTarget, 3).previousElementSibling.classList[0].split('-').join(' ');
        var ctaTitle =  getParentElement(e.currentTarget, 3).previousElementSibling.querySelector('h2').innerText.trim();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        }
    })
} catch(error){
    console.log('element not found', error);
}
// rera apply now button analytics END

// customer care qik emi card analytics START
try{
var emailHighlight = document.querySelector('.check-loan-eligibility .rte.title a');
emailHighlight.addEventListener('click', function(e){
    var ctaText = e.currentTarget.innerText.trim();
    var ctaTitle =  getParentElement(e.currentTarget, 7).querySelector('h2').innerText.trim();
    var componentName = window.location.href.split('/').pop().split('.').shift();
    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
})
} catch(error){
    console.log('element not found', error);
}
// customer care qik emi card analytics END

// way to service html know more ctas analytics START
try{
    var wtsKnowMoreCtas = document.querySelectorAll('.found-products-box .way-to-service-card-items .white-blue-button .btn-blue');
    wtsKnowMoreCtas.forEach(function(wtsKnowMoreCta){
    wtsKnowMoreCta.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle =  getParentElement(e.currentTarget, 5).querySelector('.heading20').innerText.trim();
        var componentName = getParentElement(e.currentTarget,10).querySelector('.component-title h2').innerText.trim();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    });
});
} catch(error){
    console.log('element not found', error);
}
// way to service html know more ctas analytics END

// tia chatbot play video analytics START
try{
var tiaPlayVideo = document.querySelector('.tia-chatbot .tia-chatbot-left [data-target="#video-popup-modal"]');
tiaPlayVideo.addEventListener('click', function(e){
    var componentName =  window.location.href.split('/').pop().split('.').shift();
    var ctaTitle = componentName;
    playVideo(componentName,ctaTitle);
})
} catch(error){
    console.log('element not found', error);
}
// tia chatbot play video analytics END

// alexa-service + tatacapital mobile app analytics START
try{
var alexaCompKnowMoreCtas = document.querySelector('.alexa-service .white-blue-button btn-blue');
alexaCompKnowMoreCtas.addEventListener('click', function(e){
    var ctaText = e.currentTarget.innerText.trim();
    var ctaTitle = window.location.href.split('/').pop().split('.').shift();
    var componentName = ctaTitle;
    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
});
} catch(error){
    console.log('element not found', error);
}
// alexa-service + tatacapital mobile app analytics END

// LAS Calc Inner ctas analytics START
var lasCalcInnerBrowseFile = document.querySelector('.las-calculator .browse-file [data-file="browse"]');
var lasCalcInnerAddStock = document.querySelector('.las-calculator .las-add-stock .js-add-stock');
var lasCalcInnerClearAll = document.querySelector('.las-calculator .las-stock-added-inner .js-clear-all');
    function lasCalcInnerCtas(selector){
        if(selector !== null){
        if(document.querySelector('.page-header .component-title h1') !== null){
            selector.addEventListener('click', function(e){
                var ctaText = e.currentTarget.innerText.trim();
                var componentName =  document.querySelector('.page-header .component-title h1') !== null ? 
                document.querySelector('.page-header .component-title h1').innerText.trim() : window.location.href.split('/').pop().split('.').shift();
                var ctaTitle = componentName;
                ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
            });
        }
    }
    };
lasCalcInnerCtas(lasCalcInnerBrowseFile);
lasCalcInnerCtas(lasCalcInnerAddStock);
lasCalcInnerCtas(lasCalcInnerClearAll)
// LAS Calc Inner ctas analytics END

// thankyou popup newsletter subscription analytics START
try{
var newsLetterThankyouPopup = document.querySelectorAll('.thankyou-popup-modal .thank-you-popup-list .link-with-arrow');
newsLetterThankyouPopup.addEventListener('click', function(e){
    if(getParentElement(newsLetterThankyouPopup[0], 10).classList[0] == 'thankyou-popup-modal'){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 7).querySelector('.text .cmp-text').innerText.trim();
        var componentName = 'newsLetter Thankyou Popup';
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    }
})
} catch(error){
    console.log('element not found', error);
}
// thankyou popup newsletter subscription analytics END

// slider Tabs contact us analytics START
try {
    var sliderTabs = document.querySelectorAll('.slider-tab .tabs-row .tab-button');
    sliderTabs.forEach(function (sliderTab) {
        sliderTab.addEventListener('click', function (e) {
            if (getParentElement(e.currentTarget, 11).classList[0] === 'slider-tab') {
                var menuLinkText = e.currentTarget.innerText.trim();
                var componentName = getParentElement(e.currentTarget, 11).previousElementSibling
                    ? getParentElement(e.currentTarget, 11).previousElementSibling.querySelector('li.active').innerText.trim()
                    : 'Service Desk';
                var menuTitle = getParentElement(e.currentTarget, 11).classList[0].split('-').join(' ');
                submenuClick(menuLinkText, componentName, menuTitle, productCodeId);
            }
        });
    });
} catch (error) {
    console.log('element not found', error);
}
// slider Tabs contact us analytics END

// self service option cards analytics START
try{
    var selfServiceOptCards = document.querySelectorAll('.slider-tab .key-features .cmp-teaser__link');
    selfServiceOptCards.forEach(function(selfServiceOptCard){
        selfServiceOptCard.addEventListener('click', function(e){
            if(getParentElement(e.currentTarget, 16).classList[0] == 'slider-tab'){
                var ctaText = e.currentTarget.querySelector('.instant-top h3').innerText.trim();
                var ctaTitle = getParentElement(e.currentTarget, 13).querySelector('.cmp-tabs__tab--active a').innerText.trim();
                var componentName = getParentElement(e.currentTarget, 5).querySelector('.component-title h2').innerText.trim();
                ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
            }
        });
    });
} catch(error){
    console.log('element not found', error);
}
// self service option cards analytics END

// whatsapp qr telNo cta analytics START
try{
    var whatsappQrTelNo = document.querySelector('.whatsapp-qr-box .apply-whatsapp-left .rte.title a');
    whatsappQrTelNo.addEventListener('click', function(e){
    if(getParentElement(e.currentTarget,8).classList[0] == 'whatsapp-qr-box'){
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget,8).querySelector('.main-title').innerText.trim();
            var componentName = getParentElement(e.currentTarget,8).classList[0].split('-').join(' ');
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        }
    });
} catch(error){
    console.log('element not found', error);
}
// whatsapp qr telNo cta analytics END

// customer grievance raise complaint box anchors analytics START
try{
var raiseComplaintAnchors = document.querySelectorAll('.board-director-box .raise-complaint-box a');
raiseComplaintAnchors.forEach(function(raiseComplaintAnchor){
    raiseComplaintAnchor.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget,3).querySelector('h3').innerText.trim();
        var componentName = 'contact us ' + window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    });
});
} catch(error){
    console.log('element not found', error);
}
// customer grievance raise complaint box anchors analytics END

// wordLink Highlights used card loan analytics START
try{
    var wordLinkHighlights = document.querySelectorAll('.key-features .key-features-card .cmp-teaser__description a');
    wordLinkHighlights.forEach(function(wordLinkHighlight){
        wordLinkHighlight.addEventListener('click', function(e){
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('h3').innerText.trim();
            var componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        });
    });
} catch(error){
    console.log('element not found', error);
}
// wordLink Highlights used card loan analytics START

// wordLink keyfeature emi opt used car loan analytics START
try{
    var keyFeatureEmiOptWordLink = document.querySelector('.key-features .rte.title a');
    keyFeatureEmiOptWordLink.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 7).classList[0]== 'key-features'){
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 7).querySelector('h2').innerText.trim();
            var componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        }
    });
} catch(error){
    console.log('element not found', error);
}
// wordLink keyfeature emi opt used car loan analytics END

// check loan eligibility wrd link used car loan analytics START
try{
var checkLoanEligibilitywrdLink = document.querySelector('.check-loan-eligibility .tops-heads a');
checkLoanEligibilitywrdLink.addEventListener('click', function(e){
    if(getParentElement(e.currentTarget, 6).classList[0] == 'check-loan-eligibility'){
        var ctaText = e.currentTarget.innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('h2').innerText.trim();
        var componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    }
});
} catch(error){
    console.log('element not found', error);
}
// check loan eligibility wrd link used car loan analytics END

// contact us housing wrd highlight link analytics START
try{
var contactUsHousingFinLinks = document.querySelectorAll('.reach-out-officer a');
contactUsHousingFinLinks.forEach(function(contactUsHousingFinLink){
    contactUsHousingFinLink.addEventListener('click', function(e){
        if(getParentElement(e.currentTarget, 10).classList[0] == 'reach-out-officer'){
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('h3').innerText.trim();
            var componentName = getParentElement(e.currentTarget, 10).classList[0].split('-').join(' ') + ' box';
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        }
    });
});
} catch(error){
    console.log('element not found', error);
}
// contact us housing wrd highlight link analytics END 

// PL standalone CTA analytics START
try{
    document.querySelectorAll('.key-features').forEach(function(standAloneCta){
        try{
        standAloneCta.nextElementSibling.querySelector('[data-cta="about-cibil-score"]').addEventListener('click', function(e){        
        var ctaText = e.currentTarget.innerText.trim()
        var componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
        if(getParentElement(e.currentTarget,5).previousElementSibling != null){
            var ctaTitle = getParentElement(e.currentTarget, 5).previousElementSibling.querySelector('.component-title h2').innerText.trim();
        } else if(getParentElement(e.currentTarget, 3).previousElementSibling != null){
            var ctaTitle = getParentElement(e.currentTarget, 3).previousElementSibling.querySelector('.component-title h2').innerText.trim();
        }
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        console.log(ctaText,componentName,ctaTitle,productCodeId)
    })
    } catch(err){
        console.log('my err',err)
    }
});
} catch(error){
    console.log('element not found', error);
}
// PL standalone CTA analytics END      

// microfinance calc filter applied analytics START
try{
    var microFinanceCompanies = document.querySelectorAll('.microfinance-calculator .microfinance-companies li');
    microFinanceCompanies.forEach(function(microFinanceCompany){
        microFinanceCompany.addEventListener('click', function(e){
            var ctaTitle = getParentElement(e.currentTarget,6).querySelector('.calculator-heading').innerText.trim();
            var appliedFilter = e.currentTarget.innerText.trim();
            var componentName = 'EMI Calculator';
            filterApplied(ctaTitle,appliedFilter,componentName,productCodeId);
        });
    });
} catch(error){
    console.log('element not found', error);
}
//  microfinance calc filter applied analytics END

// GST Calculator analytics START
try{
    var gstCalcDropdown = document.querySelectorAll('.cog-gst-calculator #gst li');
    gstCalcDropdown.forEach(function(gstCalcDropdownSelect){
        gstCalcDropdownSelect.addEventListener('click', function(e){
            var ctaTitle = 'GST Calc Dropdown'
            var appliedFilter = e.currentTarget.innerText.trim();
            var componentName = 'GST Calculator';
            filterApplied(ctaTitle,appliedFilter,componentName,productCodeId);
        });
    });
} catch(error){
    console.log('element not found', error);
}
// GST Calculator analytics END

// alexa service + retail know more cta Anlaytics START
try{
var knowMoreServiceCta = document.querySelector('.alexa-service .loan-approval-box .white-blue-button a');
knowMoreServiceCta.addEventListener('click', function(e){
    var ctaText = e.currentTarget.innerText.trim();
    var componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ') + ' service';
    var ctaTitle = componentName + 's';
    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
});
} catch(error){
    console.log('element not found', error);
}
//  alexa service + retail know more cta Anlaytics END

// google assistant word highlight analytics START
try{
var googleAssWrdLinks = document.querySelectorAll('.instant-loan-box-card .rte.title a');
googleAssWrdLinks.forEach(function(link){
    link.addEventListener('click', function(e){
        if(window.location.href.includes('google-assistant')){
            var ctaText = e.currentTarget.innerText.trim();
            var componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ') + ' service';
            var ctaTitle = componentName + 's';
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
        }
    })
});
} catch(error){
    console.log('element not found', error);
}
// google assistant word highlight analytics END

// loans for you analytics START
try{
    document.querySelectorAll('.loan-for-you .loan-you-bottom .white-blue-button a').forEach(function(btn){ 
        btn.addEventListener('click', function(e){
            if(getParentElement(e.currentTarget, 10).classList[0] == 'loan-for-you'){
                var ctaText = e.currentTarget.innerText.trim();
                var componentName = getParentElement(e.currentTarget, 10).querySelector('.component-title h1').innerText.trim();
                var ctaTitle = getParentElement(e.currentTarget, 5).querySelector('.heading20').innerText.trim();
                ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
            }
        });
    }); 
} catch(error){
    console.log('element not found', error);
}
// loans for you analytics END

// vehicle loan analytics START
try{
var vehicleLoanBoxCtas = document.querySelectorAll('.vehicle-loan-box .vehicle-loan-box-card .white-blue-button a');
    vehicleLoanBoxCtas.forEach(function(loanCta){
        loanCta.addEventListener('click', function(e){
            if(getParentElement(e.currentTarget, 4).classList[0] === 'vehicle-loan-box-card'){
            var ctaText = e.currentTarget.innerText.trim();
            var componentName = getParentElement(e.currentTarget, 9).querySelector('.component-title h2').innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('h3').innerText.trim();
            var aa_productCode = '';
            ctaTitle.split(' ').forEach(function(codeEL){
                aa_productCode += codeEL.slice(0,1);
            })
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId.toUpperCase());
        }
    })
});
} catch(error){
    console.log('element not found', error);
}
// vehicle loan analytics END

// download now analytics START
try{
    document.querySelectorAll('.header-section .slider-item .text-downloads')[0].addEventListener('click', function(e){
    var ctaText = e.currentTarget.innerText.trim();
    var ctaTitle = 'Header Top Section'
    var componentName = 'headerAnalyticData'
    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    });
} catch(error){
    console.log('element not found', error);
}
// download now analytics END

// Insurance plan box apply analytics START
try {
    var applyNowBtnsInPlanBox = document.querySelectorAll('.insurance-plan-box .insurance-plans-right .button a');
    applyNowBtnsInPlanBox.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            if (getParentElement(e.currentTarget, 4).querySelector('.component-title h3') !== null) {
                var ctaText = e.currentTarget.innerText.trim();
                var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('.component-title h3').innerText.trim();
                var componentName = 'Insurance Plans Box';
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
            };
        });
    });
} catch (error) {
    console.log('element not found', error);
}
// Insurance plan box apply analytics END

// get call via OTP analytics START
document.querySelectorAll('.jsOnGetCallButton').forEach(function (otpBtn) {
    otpBtn.addEventListener('click', function (e) {
        try {
            var componentName = window.location.href.split('/').pop().split('.').shift();
            if (getParentElement(e.currentTarget, 8).getAttribute('id') === 'not-receive-otp-modal') {
                var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('.otp-heads').innerText.trim();
                if (window.location.href.split('/').pop().split('.').shift() == "apply-now-new-car-loan") {
                    componentName = 'new car loan';
                }
                getotpviaCall(ctaTitle, componentName, productCodeId);
            }
            if (getParentElement(e.currentTarget, 6).classList[0] == 'otp-outer-box') {
                var ctaText = e.currentTarget.innerText.trim();
                var ctaTitle = document.querySelector('.otp-outer-box .jsOtpHeading').innerText.trim();
                var componentName = getParentElement(e.currentTarget, 6).classList[0].split('-').join(' ');
                if (window.location.href.split('/').pop().split('.').shift() == "apply-now-new-car-loan") {
                    componentName = 'new car loan';
                }
                ctaInteraction(ctaText, componentName, "please enter your otp", productCodeId);
            }
        } catch (err) { console.log(err); }
    });
})
// get call via OTP analytics END


// instant cash loan analytics START
var elements = document.querySelectorAll('.list-cash-loans li a');
if (elements.length > 0) {
    elements.forEach(function (element) {
        element.addEventListener('click', function (e) {
            try {
                var ctaText = e.currentTarget.innerText.trim();
                var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('.tops-heads .component-title h2').innerText.trim();
                var componentName = 'stamp duty calculator';
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
            } catch (error) {
                console.log("Error processing instant cash loan analytics click event", error);
            }
        });
    });
} else {
    console.log("Elements not found for the selector: .list-cash-loans li a");
}
// instant cash loan analytics END


// entry-point analytics START
var discoverExploreElement = document.querySelector('.discover-explore-box .discover-explore-right a');
if (discoverExploreElement) {
    discoverExploreElement.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('.discover-explore-left p').innerText.trim();
            var componentName = getParentElement(e.currentTarget, 4).classList[0].replaceAll('-', ' ');
            ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
        } catch (error) {
            console.log("Error processing entry-point analytics click event", error);
        }
    });
} else {
    console.log("Element not found for the selector: .discover-explore-box .discover-explore-right a");
}
// entry-point analytics END

// communities box analytics START
var communitiesBoxElement = document.querySelector('.communities-box .communities-row .white-blue-button a');
if (communitiesBoxElement) {
    communitiesBoxElement.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('.component-title h2').innerText.trim();
            var componentName = getParentElement(e.currentTarget, 10).classList[0].replaceAll('-', ' ');
            ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)
        } catch (error) {
            console.log("Error communities box analytics click event", error);
        }
    })
} else {
    console.log("Element not found for the selector: .communities-box .communities-row .white-blue-button a");
}
// communities box analytics END

// campaign products analytics START

var campaginProductElement = document.querySelectorAll('.campaign-li .campaign-btns a');
if (campaginProductElement.length > 0) {
    campaginProductElement.forEach(function (element) {
        element.addEventListener('click', function (e) {
            try {
                var ctaText = e.currentTarget.innerText.trim();
                var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('.campaign-content-top h2').innerText.trim();
                var componentName = getParentElement(e.currentTarget, 9).classList[0].replaceAll('-', ' ');
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)
            } catch (error) {
                console.log("campaign products box analytics click event", error);
            }
        })
    })
} else {
    console.log('Element not found for the selector: .campaign-li .campaign-btns a');
}

// campaign products analytics END

// api stack split card analytics START

var splitCardElement = document.querySelectorAll('.split-cards-box .personal-btn a');
if (splitCardElement.length > 0) {
    splitCardElement.forEach(function (element) {
        element.addEventListener('click', function (e) {
            try {
                var ctaText = e.currentTarget.innerText.trim();
                var componentName = window.location.href.split('/').pop().split('.').shift().replaceAll('-', ' ');
                var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('.personal-cards h3').innerText.trim();
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)

            } catch (error) {
                console.log("split cardsbox analytics click event", error);
            }
        })
    })
} else {
    console.log('Element not found for the selector: .split-cards-box .personal-btn a');
}

// api stack split card analytics END


// split card box btn analytics START
var splitCardBtnElement = document.querySelector('.split-cards-box a.btn-blue');
if (splitCardBtnElement) {
    splitCardBtnElement.addEventListener('click', function (e) {

        try {
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = '';
            var componentName = window.location.href.split('/').pop().split('.').shift().replaceAll('-', ' ');
            ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)

        } catch (error) {
            console.log("split card box btn analytics click event", error);
        }

    })

} else {
    console.log('Element not found for the selector: .split-cards-box a.btn-blue');
}
// split card box btn analytics END


// retail api catalogue right analytics START
var retailRightElement = document.querySelectorAll('.retail-api-box .retail-right .bottom-content .tab-item a');
if (retailRightElement.length > 0) {
    retailRightElement.forEach(function (element) {
        element.addEventListener('click', function (e) {
            try {
                var ctaText = e.currentTarget.innerText.trim();
                var tabTitle = getParentElement(e.currentTarget, 6).querySelector('.tops-heads h2').innerText.trim();
                var componentName = getParentElement(e.currentTarget, 8).querySelector('.retail-left .tab-header h3').innerText.trim();
                tabInteraction(componentName, tabTitle, ctaText)
            } catch (error) {
                console.log("api catalogue right btn analytics click event", error);
            }
        })

    })

} else {
    console.log('Element not found for the selector: .retail-api-box .retail-right .bottom-content .tab-item a');
}
// retail api catalogue right analytics END

// retail api partners btn analytics START
var retailPartnersEle = document.querySelectorAll('.retail-api-box .retail-right .partners-btn-wrap a');
if (retailPartnersEle.length > 0) {
    retailPartnersEle.forEach(function (element) {
        element.addEventListener('click', function (e) {
            try {
                var ctaText = e.currentTarget.innerText.trim();
                var ctaTitle = getParentElement(e.currentTarget, 5).querySelector('.tops-heads h2').innerText.trim();
                var componentName = getParentElement(e.currentTarget, 8).querySelector('.retail-left .tab-header h3').innerText.trim();
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)

            } catch (error) {
                console.log("api retail partners btn analytics click event", error);
            }
        })
    })
} else {
    console.log('Element not found for the selector: .retail-api-box .retail-right .partners-btn-wrap a');
}
// retail api partners btn analytics END

// product dropdown analytics START
var productDropdownEle = document.querySelectorAll('.product-dropdown .jsMultiSelectList li a');
if(productDropdownEle.length > 0){
    productDropdownEle.forEach(function(element){
        element.addEventListener('click',function(e){
            try {
                var selectedValue = e.currentTarget.innerText.trim();
                var componentName = getParentElement(e.currentTarget, 11).classList[0].replaceAll('-',' ')
                selectloanPurpose(componentName,selectedValue);
            } catch (error) {
                console.log("product dropdown analytics click event", error);
            }
        })
    })
} else {
    console.log('Element not found for the selector: .product-dropdown .jsMultiSelectList li a');
}
// product dropdown analytics END

// hl Banner calculatorapplyNow analytics START
try{
    var hlBannerCalcApplyNow = document.querySelector('.hl-banner-calc .banner-calc-bottom .btn-blue');
    hlBannerCalcApplyNow.addEventListener('click', function(e){
        var ctaText = e.currentTarget.innerText.trim();
        var calculatorName = 'Banner EMI calculator';
        var componentName = calculatorName;
        calculatorapplyNow(ctaText,calculatorName,componentName,productCodeId);
    })
} catch(error){
    console.log('element not found', error);
}
// hl Banner calculatorapplyNow analytics END


function retailApiWidget_aa(){
    try{
        var componentName = document.querySelector('.retail-api-box .api-catalogue-content').parentElement.querySelector('.tab-header').innerText.trim() + ' Box'
        var retailApiWidgets = document.querySelectorAll('.retail-api-box .api-catalogue-content .catalogue-links')
        retailApiWidgets && retailApiWidgets.forEach(el => {
            el.addEventListener('click', function(e){
                var widgetName = e.currentTarget.innerText.trim();
                console.log('widget call ', widgetName,componentName);
                widgetInteraction(widgetName,componentName);

            })
        })
        var retailApiCtas = document.querySelectorAll('.api-component .catelogue-dropdown-body a');
        retailApiCtas && retailApiCtas.forEach(el => {
            el.addEventListener('click', function(e){
                var ctaText = e.currentTarget.innerText.trim();
                if(getParentElement(e.currentTarget, 4).classList.contains('catalogue-dropdown') ||
                getParentElement(e.currentTarget, 7).classList.contains('catalogue-dropdown') ||
                getParentElement(e.currentTarget, 4).classList.contains('catelogue-sub-accord-row')) {
                    var ctaTitle = getParentElement(e.currentTarget, 7).classList.contains('catalogue-dropdown') ? 
                    getParentElement(e.currentTarget, 7).querySelector('a').innerText.trim() : getParentElement(e.currentTarget, 4).querySelector('a').innerText.trim();
                    console.log('cta call', ctaText,componentName,ctaTitle,productCodeId);
                    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
                }
            })
        })
    } catch(err){
        console.log(err);
    }
    }
    retailApiWidget_aa()


// overview tab box mobile or tab analytics START
var mobOverviwsList = document.querySelectorAll('.mob-overviews-accodian .jsNavAccordian a');
mobOverviwsList && mobOverviwsList.forEach(function (element) {
    element.addEventListener('click', function (e) {
        try {
            var menuLinkText = e.currentTarget.textContent;
            if (menuLinkText) {
                menuLinkText = menuLinkText.trim();
            }
            var componentName = getParentElement(e.currentTarget, 8).classList[0].split('-').join(' ') + ' box';
            var menuTitle = '';
            var subMenuActive = getParentElement(e.currentTarget, 4).querySelector('.accord-heads.active');
            if (subMenuActive) {
                menuTitle = subMenuActive.innerText.trim();
            } else {
                menuTitle = getParentElement(e.currentTarget, 6).querySelector('.mob-overviews-tab .opened').innerText.trim();
            }
            menuInteraction(menuLinkText, componentName, menuTitle, productCodeId)
        } catch (error) {
            console.log('element not found', error);
        }
    })
})
// overview tab box mobile or tab analytics END

// third party banner image button analytics START
var thirdBannerBtn = document.querySelectorAll('.third-party-banner .ads-box a');
if (thirdBannerBtn && thirdBannerBtn.length > 0) {
    thirdBannerBtn && thirdBannerBtn.forEach(function (element) {
        element.addEventListener('click', function (e) {
            try {
                var ctaText = e.currentTarget.childNodes[1].getAttribute('alt').trim();
                var componentName = getParentElement(e.currentTarget, 4).classList[0].replaceAll('-', ' ') + ' Box';
                var ctaTitle = '';
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)
            } catch (error) {
                console.log("image carousel analytics click event", error);
            }
            
        })
    })
}
// third party banner image button analytics END

// breadcrumb analytics START
var breadcrumbList = document.querySelectorAll('.cmp-breadcrumb__list li a');
if (breadcrumbList && breadcrumbList.length > 0) {
    breadcrumbList.forEach(function (element) {
        element.addEventListener('click', function (e) {
            try {
                var ctaText = e.currentTarget.innerText.trim();
                var componentName = getParentElement(e.currentTarget, 2).classList[0].split('-')[1].split('_')[0];
                var ctaTitle = '';
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)
            } catch (error) {
                console.log("breadcrumb element not found", error);
            }
        })

    })
}
// breadcrumb analytics END

// about product table body link analytics Start
var aboutTableLink = document.querySelectorAll('.about-product .table-section tbody a');
if (aboutTableLink && aboutTableLink.length > 0) {
    aboutTableLink.forEach(function (element) {
        element.addEventListener('click', function (e) {
            try {
                /*var parentElement = getParentElement(e.currentTarget, 7);
                var hasTableSectionClass = e.currentTarget.closest('table') ||
                    (parentElement && (parentElement.classList.contains('table-section') ||
                        Array.from(parentElement.querySelectorAll('div')).some(div => div.classList.contains('table-section'))));*/
                if (e.currentTarget.closest('table')) {
                    var td = element.closest('td');
                    var index = Array.from(td.parentElement.children).indexOf(td);
                    var theadText = e.currentTarget.closest('table').querySelector(`thead th:nth-child(${index + 1})`).textContent.trim();
                    var ctaText = e.currentTarget.innerText.trim();
                    var componentName = '';
                    var aboutProductDiv = e.currentTarget.closest('.about-product');
                    if (aboutProductDiv) {
                        componentName = aboutProductDiv.classList[0].split('-').join(' ');
                    } else {
                        componentName = "about product";
                    }
                    var ctaTitle = theadText;
                    ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
                }
            } catch (error) {
                console.log('element not found', error);
            }
        });
    });
}
// about product table body link analytics End

// customers testimonial videos analytics Start
var testimonialVideoList = document.querySelectorAll('.customer-testimonial .customer-say-slider .testi-with-video [data-target="#video-modal"]');
if (testimonialVideoList && testimonialVideoList.length > 0) {
    testimonialVideoList.forEach(function (VideoPlay) {
        VideoPlay.addEventListener('click', function (e) {
            try {
                var parentElement = getParentElement(e.currentTarget, 12)
                if (parentElement && parentElement.classList.contains('customer-testimonial')) {
                    var ctaTitle = getParentElement(e.currentTarget, 11).querySelector('.component-title h2').innerText.trim();
                    var componentName = getParentElement(e.currentTarget, 12).classList[0].split('-').join(' ');
                    playVideo(componentName, ctaTitle);
                }
            } catch (error) {
                console.log('element not found', error);
            }
        })
    });
} else {
    console.log('No related videos found to add event listeners.');
}
// customers testimonial videos analytics End

// tata card table body link analytics Start
var aboutTableLink = document.querySelectorAll('.card-table .table-section tbody a');
if (aboutTableLink && aboutTableLink.length > 0) {
    aboutTableLink.forEach(function (element) {
        element.addEventListener('click', function (e) {
            try {
                if (e.currentTarget.closest('table')) {
                    var td = element.closest('td');
                    var index = Array.from(td.parentElement.children).indexOf(td);
                    var theadText = e.currentTarget.closest('table').querySelector(`thead th:nth-child(${index + 1})`).textContent.trim();
                    var ctaText = e.currentTarget.innerText.trim();
                    var componentName = '';
                    var aboutProductDiv = e.currentTarget.closest('.card-table');
                    if (aboutProductDiv) {
                        componentName = aboutProductDiv.classList[0].split('-').join(' ');
                    } else {
                        componentName = "card table";
                    }
                    var ctaTitle = theadText;
                    ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
                }
            } catch (error) {
                console.log('element not found', error);
            }
        });
    });
}
// tata card table body link analytics End

// city-cards analytics START
document.querySelectorAll('.city-right-content a').forEach(city => {
    city.addEventListener('click', function(e){
    try{
        var ctaText = e.currentTarget.innerText.trim();
        var componentName = getParentElement(e.currentTarget, 11).querySelector('.text-center').innerText.trim();
        var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('.custom-city-tag').innerText.trim();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    } catch(err){ console.log(err);}
    })
});
// city-cards analytics END


// discover explore entry-point analytics START
document.querySelectorAll('.entry-point .discover-explore-right .cmp-teaser__action-link').forEach(explore => {
    explore.addEventListener('click', function(e){
    try{
        var ctaText = e.currentTarget.innerText.trim();
        var componentName = getParentElement(e.currentTarget, 2).classList[0].split('-')[0] + ' box';
        var ctaTitle = getParentElement(e.currentTarget, 7).querySelector('.exp-left-texts .heading20').innerText.trim();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    } catch(err){ console.log(err);}
    })
});
// discover explore entry-point analytics END

// subscribe modal link analytics START
document.querySelectorAll('#subscribe-modal .thank-you-popup-list .cmp-list__item-link').forEach(subscribeList => {
    subscribeList.addEventListener('click', function(e){
    try{
        var ctaText = e.currentTarget.innerText.trim();
        var componentName = getParentElement(e.currentTarget, 9).id.split('-').join(' ');
        var ctaTitle = getParentElement(e.currentTarget, 8).querySelector('.popover-modal-body .heading36').innerText.trim();
        ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    } catch(err){ console.log(err);}
    })
});
// subscribe modal link analytics END