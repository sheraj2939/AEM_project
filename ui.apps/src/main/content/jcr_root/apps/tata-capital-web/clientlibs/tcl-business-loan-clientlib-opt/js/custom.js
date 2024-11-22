var scrollFlagBl = false;
if (screen.width <= 786) {
    document.addEventListener('touchstart', function () {
        if (scrollFlagBl == false) {
            scrollFlagBl = true;
            advOfTcBl();
            whychooseTcbl();
            eligibilityCriteria();
            whatBlemiCalc();
            howApplyBliIndia();
            instantlinYourcity();
            moreBpforu();
            whatOurCustSau();
            relatedVideo();
            popularFaq();
        }
    })
}
else {
    document.addEventListener('mousemove', function () {
        if (scrollFlagBl == false) {
            scrollFlagBl = true;
            advOfTcBl();
            whychooseTcbl();
            eligibilityCriteria();
            whatBlemiCalc();
            howApplyBliIndia();
            instantlinYourcity();
            moreBpforu();
            whatOurCustSau();
            relatedVideo();
            popularFaq();
        }
    })
    document.addEventListener('scroll', function () {
        if (scrollFlagBl == false) {
            scrollFlagBl = true;
            advOfTcBl();
            whychooseTcbl();
            eligibilityCriteria();
            whatBlemiCalc();
            howApplyBliIndia();
            instantlinYourcity();
            moreBpforu();
            whatOurCustSau();
            relatedVideo();
            popularFaq();
        }
    })
}

// API call
function apiCall(method, url, data) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                switch (this.status) {
                    case 200:
                        resolve(this.responseText);
                        break;
                    default:
                        reject(this.responseText);
                }
            }
        };
        xhr.open(method, url);
        xhr.send(data);
    });
}

// Advantage of tata capital business loan
function advOfTcBl() {
    apiCall("GET", "/content/experience-fragments/tata-capital-web/en/component-ef/business_loan_ef/advantage-of-tcbl/advantage-of-tcbl.html").then(function (response) {
        operation(response, "advOfTcBlEF", ".key-features", "/etc.clientlibs/tata-capital-web/clientlibs/tcl-business-loan-clientlib-opt.min.css");
        cssLink("/etc.clientlibs/tata-capital-web/components/tcl-web-components/key-features/key-features-clientlib.min.css");
        jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/key-features/key-features-clientlib.min.js");
        jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-business-loan-clientlib-ef-opt.min.js");
    });
}

// When choose tata capital for business loan
function whychooseTcbl() {
    apiCall("GET", "/content/experience-fragments/tata-capital-web/en/component-ef/business_loan_ef/why-should-you-choose-a-bl/why-should-you-choose-a-bl.html").then(function (response) {
        operation(response, "whychooseTcblEF", ".why-to-choose-us", "/etc.clientlibs/tata-capital-web/components/tcl-web-components/why-to-choose-us/why-to-choose-us-clientlib.min.css");
    });
}

//what are the eligibility cretria for business loan
function eligibilityCriteria() {
    apiCall("GET", "/content/experience-fragments/tata-capital-web/en/component-ef/business_loan_ef/whatrthe-eligibilty-criteria-for-a-bl/whatrthe-eligibilty-criteria-for-a-bl.html").then(function (response) {
        operation(response, "eligibilityCriteriaEF", ".check-loan-eligibility", "/etc.clientlibs/tata-capital-web/components/tcl-web-components/check-loan-eligibility/check-loan-eligibility-clientlib.min.css");
    });
}

//what are the business loan emi calculator
function whatBlemiCalc() {
    apiCall("GET", "/content/experience-fragments/tata-capital-web/en/component-ef/business_loan_ef/busnisess-laon-emi-calc/busnisess-laon-emi-calc.html").then(function (response) {
        operation(response, "whatBlemiCalcEF", ".how-emi-calc-works", "/etc.clientlibs/tata-capital-web/components/tcl-web-components/how-emi-calc-works/how-emi-calc-works-clientlib.min.css");
    });
}

//how to apply for business loan in india
function howApplyBliIndia() {
    apiCall("GET", "/content/experience-fragments/tata-capital-web/en/component-ef/business_loan_ef/how2apply-for-bl-in-india/how2apply-for-bl-in-india.html").then(function (response) {
        operation(response, "howApplyBliIndiaEF", ".who-can-take-loan", "/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.min.css");
        jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.min.js");
    });
}

//instant loan in your city
function instantlinYourcity() {
    apiCall("GET", "/content/experience-fragments/tata-capital-web/en/component-ef/business_loan_ef/instant-loan-in-your-city/instant-loan-in-your-city.html").then(function (response) {
        operation(response, "instantlinYourcityEF", ".instant-loan-in-your-city", "/etc.clientlibs/tata-capital-web/components/tcl-web-components/instant-loan-in-your-city/instant-loan-in-your-city-clientlib.min.css");
        jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/instant-loan-box/instant-loan-box-clientlib.min.js");
    });
}

//more business product for you
function moreBpforu() {
    apiCall("GET", "/content/experience-fragments/tata-capital-web/en/component-ef/business_loan_ef/more-bl-product-for-u/more-bl-product-for-u.html").then(function (response) {
        operation(response, "moreBpforuEF", ".about-more-products", "/etc.clientlibs/tata-capital-web/components/tcl-web-components/about-more-products/about-more-products-clientlib.min.css");
    });
}

//what our customer say about us
function whatOurCustSau() {
    apiCall("GET", "/content/experience-fragments/tata-capital-web/en/component-ef/business_loan_ef/what-our-cust-say-aboutus/what-our-cust-say-aboutus.html").then(function (response) {
        operation(response, "whatOurCustSauEF", ".customer-testimonial", "/etc.clientlibs/tata-capital-web/components/tcl-web-components/customer-testimonial/tcl-customer-testimonials-clientlib.min.css");
        cssLink("/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.css");
        jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.js");
        jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/customer-testimonial-ef/tcl-customer-testimonials-ef-clientlib.js");
    });
}

//related video
function relatedVideo() {
    apiCall("GET", "/content/experience-fragments/tata-capital-web/en/component-ef/business_loan_ef/related-video/related-video.html").then(function (response) {
        operation(response, "relatedVideoEF", ".custome-related-videos", "/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/custom-related-videos-ef/custom-related-clientlib-ef.min.css");
        jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/custom-related-videos-ef/custom-related-clientlib-ef.min.js");
    });
}

//popular faq
function popularFaq() {
    apiCall("GET", "/content/experience-fragments/tata-capital-web/en/component-ef/business_loan_ef/popular-faq/popular-faq.html").then(function (response) {
        operation(response, "popularFaqEF", ".popular-faq-box", "/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.css");
        jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.js");
    });
}




var extractVar;
function operation(response, extractVar1, normalCompClassName, csslink) {
    // converting response string into html
    var expFragFetched = document.createElement("html");
    expFragFetched.innerHTML = response;

    // Extracting useful content
    extractVar = getExpFrag(expFragFetched);

    // setting Id & class
    setClassId(extractVar, extractVar1);

    // CSS implementation
    var cssCall = createLink(csslink);
    extractVar.prepend(cssCall);

    // extracting normal component html
    var NormalComp = document.querySelector(normalCompClassName);

    // Replacing normal component with experience Fragment
    NormalComp.replaceWith(extractVar);

    function getExpFrag(expFragFetched) {
        return expFragFetched.querySelector(".xf-web-container").children[0].childNodes[1].children[0].children[0];
    }

    function setClassId(extractVar, toSet) {
        extractVar.setAttribute("id", toSet);
        extractVar.classList.add(toSet);
    }

    // CSS implementation
    function createLink(csslink) {
        var css = document.createElement("link");
        css.href = csslink;
        css.type = "text/css";
        css.rel = "stylesheet";
        return css;
    }

    document.querySelectorAll("cq").forEach(function (el) {
        el.remove();
    });

    document.querySelectorAll(".newpar").forEach(function (el) {
        el.remove();
    });
}

//External CSS implementation
function cssLink(csslink) {
    var cssCall = createLink(csslink);
    extractVar.prepend(cssCall);

    function createLink(csslink) {
        var css = document.createElement("link");
        css.href = csslink;
        css.type = "text/css";
        css.rel = "stylesheet";
        return css;
    }
}

//External JS implementation
function jsScript(jslink) {
    var scriptCall = createScript(jslink);
    extractVar.appendChild(scriptCall);

    function createScript(jslink) {
        var script = document.createElement("script");
        script.src = jslink;
        script.defer = true;
        return script;
    }
}

//Select2 Js lazy loading
var selectJs = "/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-select2-js.js";
var selectJsCall = createSelectJsLink(selectJs);

// JS implementation
function createSelectJsLink(selectJs) {
    var js = document.createElement("script");
    js.src = selectJs;
    return js;
}

var selectObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.intersectionRatio != 0) {
            entry.target.append(selectJsCall);
            selectObserver.unobserve(entry.target);
        }
    });
});
selectObserver.observe(document.querySelector(".footer"));