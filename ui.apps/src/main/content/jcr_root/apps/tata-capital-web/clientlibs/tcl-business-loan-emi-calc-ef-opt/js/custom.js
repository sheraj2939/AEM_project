var scrollFlagBl = false;
if (screen.width <= 786) {
    document.addEventListener('touchstart', function () {
        if (scrollFlagBl == false) {
            scrollFlagBl = true;
            businessLoanEMI()
            howToUseBLcalc()
            howDoesBLwork()
            factorBLemi()
            amortization()
            otherBLcalc()
            moreBLprod()
            customerTestimonal()
            relatedVideosBl()
            popularFaqBl()
            findRightLoanBl()
            BlogsBl()
        }
    })
}
else {
    document.addEventListener('mousemove', function () {
        if (scrollFlagBl == false) {
            scrollFlagBl = true;
            businessLoanEMI()
            howToUseBLcalc()
            howDoesBLwork()
            factorBLemi()
            amortization()
            otherBLcalc()
            moreBLprod()
            customerTestimonal()
            relatedVideosBl()
            popularFaqBl()
            findRightLoanBl()
            BlogsBl()
        }
    })
    document.addEventListener('scroll', function () {
      if (scrollFlagBl == false) {
          scrollFlagBl = true;
          businessLoanEMI()
          howToUseBLcalc()
          howDoesBLwork()
          factorBLemi()
          amortization()
          otherBLcalc()
          moreBLprod()
          customerTestimonal()
          relatedVideosBl()
          popularFaqBl()
          findRightLoanBl()
          BlogsBl()
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

// What is a Business Loan EMI Calc
function businessLoanEMI() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/business-loan/what-is-business-loan-emi-calc-ef/what-is-business-loan-emi-calc-ef.html").then(function (response) {
    operation(response,"businessLoanEMIEF",".about-product","/etc.clientlibs/tata-capital-web/components/tcl-web-components/about-product/about-product-clientlib.min.css");
  });
}

// How to use our Business Loan
function howToUseBLcalc() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/business-loan/how-to-use-business-loan-emi-calc-ef/how-to-use-business-loan-emi-calc-ef.html").then(function (response) {
    operation(response,"howToUseBLcalcEF",".instant-loan-box","/etc.clientlibs/tata-capital-web/components/tcl-web-components/instant-loan-box/instant-loan-box-clientlib.min.css");
  });
}

// How Does a Business Loan Work
function howDoesBLwork() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/business-loan/how-does-business-loan-works-ef/how-does-business-loan-works-ef.html").then(function (response) {
    operation(response,"howDoesBLworkEF",".how-emi-calc-works","/etc.clientlibs/tata-capital-web/components/tcl-web-components/how-emi-calc-works/how-emi-calc-works-clientlib.css");
  });
}

//Factors That Affect Business Loan EMI
function factorBLemi() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/business-loan/factor-use-business-loan-ef/factor-use-business-loan-ef.html").then(function (response) {
    operation(response,"factorBLemiEF",".why-to-choose-us","/etc.clientlibs/tata-capital-web/components/tcl-web-components/why-to-choose-us/why-to-choose-us-clientlib.css");
  });
}

// Amortization schedule
function amortization() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/business-loan/amortization-schedule-ef/amortization-ef.html").then(function (response) {
    operation(response,"amortizationEF",".travel-checklist","/etc.clientlibs/tata-capital-web/components/tcl-web-components/table/table-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/table/table-clientlib.min.js");
  });
}

//Other Business Loan Calculators
function otherBLcalc() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/business-loan/others-business-loan-ef/others-business-loan-ef.html").then(function (response) {
    operation(response,"otherBLcalcEF",".key-features","/etc.clientlibs/tata-capital-web/clientlibs/tcl-business-loan-emi-calc-ef-clientlibs.min.css");
    cssLink("/etc.clientlibs/tata-capital-web/components/tcl-web-components/key-features/key-features-clientlib.min.css");
  });
}

//More Business Loan products
function moreBLprod() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/business-loan/more-business-loan-product-ef/more-business-loan-product-ef.html").then(function (response) {
    operation(response,"moreBLprodEF",".about-more-products","/etc.clientlibs/tata-capital-web/components/tcl-web-components/about-more-products/about-more-products-clientlib.css");
  });
}

// customer testimonal Business Loan
function customerTestimonal() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/business-loan/customer-testimonial-bl-ef/customer-testimonial-bl-ef.html").then(function (response) {
    operation(response,"customerTestimonalEF",".customer-testimonial","/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.css");
    cssLink("/etc.clientlibs/tata-capital-web/components/tcl-web-components/customer-testimonial/tcl-customer-testimonials-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.js")
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/customer-testimonial-ef/tcl-customer-testimonials-ef-clientlib.js");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-business-loan-emi-calc-ef-clientlibs.min.js");
  });
}

// Related Videos
function relatedVideosBl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/business-loan/related-videos-bl-ef/related-videos-bl-ef.html").then(function (response) {
    operation(response,"relatedVideosBlEF",".custome-related-videos","/etc.clientlibs/tata-capital-web/components/tcl-web-components/custom-related-videos/custom-related-clientlib.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/custom-related-videos-ef/custom-related-clientlib-ef.js");
  });
}

//Popular FAQ
function popularFaqBl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/business-loan/popular-faq-bl-ef/popular-faq-bl-ef.html").then(function (response) {
    operation(response,"popularFaqBlEF",".popular-faq-box","/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.js");
  });
}

// Find the right Loan for you
function findRightLoanBl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/business-loan/find-right-loan-ef/find-right-loan-ef.html").then(function (response) {
    operation(response,"findRightLoanBlEF",".who-can-take-loan","/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.min.css");
  });
}

// Blogs BL
function BlogsBl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/business-loan/blogs-bl-calc-ef/blogs-bl-calc-ef.html").then(function (response) {
    operation(response,"BlogsBlEF",".financial-insights","/etc.clientlibs/tata-capital-web/components/tcl-web-components/financial-insight/financial-insight-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/financial-insight-ef/financial-insight-clientlib-ef.js");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.min.js");
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