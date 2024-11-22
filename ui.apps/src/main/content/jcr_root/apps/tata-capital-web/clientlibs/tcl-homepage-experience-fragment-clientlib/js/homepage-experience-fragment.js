// IntersectionObserver call

// calculator
callIntersectionObserver("calculator",calculator,".explore-our-product-structure");

// Pre Approved
callIntersectionObserver("preApproved",preApproved,".explore-our-product-structure");

// ways to service
callIntersectionObserver("waystoservice",waystoservice,".explore-our-product-structure");

// customer testimonal
callIntersectionObserver("customerTestimonal",customerTestimonal,".explore-our-product-structure");

//Financial insights
callIntersectionObserver("financialInsight",financialInsight,".explore-our-product-structure");

// news letter (subscribe box)
callIntersectionObserver("newsLetter",newsLetter,".explore-our-product-structure");


// IntersectionObserver function
function callIntersectionObserver(observername, funcName, className) {
  var observername = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio != 0) {
        funcName();
        observer.unobserve(entry.target);
      }
    });
  });
  observername.observe(document.querySelector(className));
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

// calculator
function calculator() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/homepage-calculator/homepage-calculator.html").then(function (response) {
    operationAppend(response,"calculatorEF",".ways-to-service","/apps/tata-capital-web/components/tcl-web-components/calculators/calculators-libs-clientlib.css");
    jsScript("/apps/tata-capital-web/clientlibs/tcl-libraries/tcl-ion-slider.js");
    cssLink("/apps/tata-capital-web/clientlibs/tcl-libraries/tcl-ion-slider.css");
    cssLink("/apps/tata-capital-web/components/tcl-web-components/home-page-calculator/home-page-calculator-clientlib.css");
    jsScript("/apps/tata-capital-web/components/tcl-web-components/calculators/calculators-libs-clientlib.js");
    jsScript("/apps/tata-capital-web/components/tcl-web-components/calculators/area-conversion-calculator/area-conversion-calculator-clientlib.js");
    jsScript("/apps/tata-capital-web/components/tcl-web-components/calculators/pl-emi-calculator/pl-emi-calculator-clientlib.js");
    jsScript("/apps/tata-capital-web/components/tcl-web-components/calculators/pl-pre-payment-calculator/pl-pre-payment-calculator-clientlib.js");
    jsScript("/apps/tata-capital-web/components/tcl-web-components/calculators/hl-eligibility-calculator/hl-eligibility-calculator-clientlib.js");
    jsScript("/apps/tata-capital-web/components/tcl-web-components/calculators/pmay-calculator/pmay-calculator-clientlib.js");
    jsScript("/apps/tata-capital-web/components/tcl-web-components/calculators/pl-eligibility-calculator/pl-eligibility-calculator-clientlib.js");
    jsScript("/apps/tata-capital-web/components/tcl-web-components/home-page-calculator/home-page-calculator-clientlib.js")
    jsScript("/apps/tata-capital-web/components/tcl-web-components/calculators/top-up-calculator/top-up-calculator-clientlib.js");
    jsScript("/apps/tata-capital-web/clientlibs/tcl-homepage-experience-fragment-clientlib/homepage-custom-clientlib.js");
    jsScript("/apps/tata-capital-web/clientlibs/tcl-libraries/tcl-global-analytics.js");
  });
}

// preApproved
function preApproved() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/preApprovedEF/pre-approved.html").then(function (response) {
    operation(response,"preAppovedEF",".pre-approved-ef","/apps/tata-capital-web/components/tcl-web-components/pre-approved-offer/tcl-pre-approved-offer-clientlib/css/pre-approved-offer.css");
    jsScript("/apps/tata-capital-web/components/tcl-experience-fragment-component/pre-approved-offer-ef/tcl-pre-approved-offer-ef-clientlib.js");
    jsScript("/apps/tata-capital-web/components/tcl-web-components/pre-approved-offer/tcl-pre-approved-offer-clientlib.min.js");
  });
}

// ways to service
function waystoservice() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/ways-to-serviceEF/ways-to-service.html").then(function (response) {
    operation(response,"waysToServiceEF",".ways-to-service-ef","/apps/tata-capital-web/components/tcl-web-components/ways-to-service/way-to-service-clientlib.min.css");
    jsScript("/apps/tata-capital-web/components/tcl-web-components/ways-to-service/way-to-service-clientlib.min.js");
  });
}

// customer testimonal
function customerTestimonal() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/customerTestimonialEF/customer-testimonial.html").then(function (response) {
    operation(response,"customerTestimonalEF",".customer-testimonial-ef","/apps/tata-capital-web/components/tcl-web-components/customer-testimonial/tcl-customer-testimonials-clientlib.min.css");
    cssLink("/apps/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.css");
    jsScript("/apps/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.js");
    jsScript("/apps/tata-capital-web/components/tcl-experience-fragment-component/customer-testimonial-ef/tcl-customer-testimonials-ef-clientlib.js");
  });
}

//Financial insights
function financialInsight() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/financial-insights-ef/financialInsight.html").then(function (response) {
    operation(response,"financialInsightEF",".financial-insights-ef","/apps/tata-capital-web/components/tcl-web-components/financial-insight/financial-insight-clientlib.css");
    jsScript("/apps/tata-capital-web/components/tcl-experience-fragment-component/financial-insight-ef/financial-insight-clientlib-ef.js");
  });
}

// newsletter (subscribe box)
function newsLetter() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/newsLetterEF/news-letter.html").then(function (response) {
    operation(response,"newsLetterEF",".newsletter-ef","/apps/tata-capital-web/components/tcl-web-components/newsletter/tcl-newsletter-clientlib.min.css");
    jsScript("/apps/tata-capital-web/components/tcl-web-components/newsletter/tcl-newsletter-clientlib.min.js");
  });
}

var extractVar ;
function operation(response,extractVar1,normalCompClassName,csslink) {
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
    return expFragFetched.querySelector(".xf-web-container").children[0].childNodes[1].children[0].children[0].children[0];
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
}

function operationAppend(response,extractVar1,targetingCompClassName,csslink) {

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

  // targeting component
  var targetedComp = document.querySelector(targetingCompClassName);
  var parentNode = targetedComp.parentNode.parentNode.parentNode;
  var inBefore = targetedComp.parentNode.parentNode;
  parentNode.insertBefore(extractVar,inBefore);
  
  // insertAfter(targetedComp, extractVar);
  /*function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }*/

  function getExpFrag(expFragFetched) {
    return expFragFetched.querySelector(".xf-web-container").children[0].childNodes[1].children[0].children[0].children[0];
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
    css.rel = "stylesheet";return css;
  }
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
var selectJs = "/apps/tata-capital-web/clientlibs/tcl-libraries/tcl-select2-js.js";
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