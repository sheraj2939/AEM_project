var scrollFlag = false;
if (screen.width <= 786) {
    document.addEventListener('touchstart', function () {
        if (scrollFlag == false) {
            scrollFlag = true;
            instantPlFiveMin();
            Plkeyfeatures();
            applyViaWhatsapp();
            bestDeals();
            relatedVideos();
            whoCanTakepl();
            popularFaq();
            whenCanTakepl();
            whyShouldus();
            instantPLcity();
            morePlProducts();
            customerTestimonal();
            findRightLoan()
            Blogs();
            newsLetter();
        }
    })
}
else {
    document.addEventListener('mousemove', function () {
        if (scrollFlag == false) {
            scrollFlag = true;
            instantPlFiveMin();
            Plkeyfeatures();
            applyViaWhatsapp();
            bestDeals();
            relatedVideos();
            whoCanTakepl();
            popularFaq();
            whenCanTakepl();
            whyShouldus();
            instantPLcity();
            morePlProducts();
            customerTestimonal();
            findRightLoan()
            Blogs();
            newsLetter();
        }
    })
    document.addEventListener('scroll', function () {
      if (scrollFlag == false) {
          scrollFlag = true;
          instantPlFiveMin();
          Plkeyfeatures();
          applyViaWhatsapp();
          bestDeals();
          relatedVideos();
          whoCanTakepl();
          popularFaq();
          whenCanTakepl();
          whyShouldus();
          instantPLcity();
          morePlProducts();
          customerTestimonal();
          findRightLoan()
          Blogs();
          newsLetter();
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

// Instant Personal Loan under 5 minutes
function instantPlFiveMin() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/instant-pl-under-five-min-ef/instant-pl-five-min-ef.html").then(function (response) {
    operation(response,"instantPlFiveMinEF",".instant-loan-box","/etc.clientlibs/tata-capital-web/components/tcl-web-components/key-features/key-features-clientlib.min.css");
     jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-personal-loan-opt-ef.min.js");
  });
}

// Personal Loan Key Features
function Plkeyfeatures() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/pl-key-features-ef/pl-key-features-ef.html").then(function (response) {
    operation(response,"PlkeyfeaturesEF",".key-features");
  });
}

// Apply via Whatsapp
function applyViaWhatsapp() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/apply-via-whatsapp-ef/apply-via-whatsapp-ef.html").then(function (response) {
    operation(response,"applyViaWhatsappEF",".apply-via-whatsapp","/etc.clientlibs/tata-capital-web/components/tcl-web-components/about-product/about-product-clientlib.min.css");
  });
}

// Best Deals
function bestDeals() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/best-deals-ef/best-deals-ef.html").then(function (response) {
    operation(response,"bestDealsEF",".best-deals","/etc.clientlibs/tata-capital-web/components/tcl-web-components/best-deals/best-deals-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/best-deals/best-deals-clientlib.min.js");
  });
}

// Related Videos
function relatedVideos() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/related-videos-ef/related-videos-ef.html").then(function (response) {
    operation(response,"relatedVideosEF",".custome-related-videos","/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/custom-related-videos-ef/custom-related-clientlib-ef.css");
    cssLink("/etc.clientlibs/tata-capital-web/components/tcl-web-components/custom-investor-information/investor-information-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/custom-related-videos-ef/custom-related-clientlib-ef.js");

  });
}

// Who can take a Personal Loan 
function whoCanTakepl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/who-can-take-a-personal-loan-ef/who-can-take-a-personal-loan-ef.html").then(function (response) {
    operation(response,"whoCanTakeplEF",".check-loan-eligibility","/etc.clientlibs/tata-capital-web/components/tcl-web-components/check-loan-eligibility/check-loan-eligibility-clientlib.min.css");
  });
}

//Popular FAQ
function popularFaq() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/popular-faq-ef/popular-faq-ef.html").then(function (response) {
    operation(response,"popularFaqEF",".popular-faq-box","/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.js");
  });
}

// When can you take Personal loan
function whenCanTakepl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/when-can-take-pl-ef/when-can-take-pl-ef.html").then(function (response) {
  });
}

// Why you should choose us
function whyShouldus() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/why-you-should-choose-us/why-you-should-choose-us.html").then(function (response) {
    operation(response,"whyShouldusEF",".why-to-choose-us","/etc.clientlibs/tata-capital-web/components/tcl-web-components/why-to-choose-us/why-to-choose-us-clientlib.min.css");
  });
}

// Instant Personal Loans in your city
function instantPLcity() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/instant-personal-loans-in-your-city-ef/instant-personal-loans-in-your-city-ef.html").then(function (response) {
    operation(response,"instantPLcityEF",".instant-loan-in-your-city","/etc.clientlibs/tata-capital-web/components/tcl-web-components/instant-loan-in-your-city/instant-loan-in-your-city-clientlib.min.css");
  });
}

//More Personal Loan products for you
function morePlProducts() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/more-pl-products-ef/more-pl-products-ef.html").then(function (response) {
    operation(response,"morePlProductsEF",".about-more-products","/etc.clientlibs/tata-capital-web/components/tcl-web-components/about-more-products/about-more-products-clientlib.min.css");
  });
}

// customer testimonal
function customerTestimonal() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/customer-testimonial-pl-ef/customer-testimonial-pl-ef.html").then(function (response) {
    operation(response,"customerTestimonalEF",".customer-testimonial","/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.css");
    cssLink("/etc.clientlibs/tata-capital-web/components/tcl-web-components/customer-testimonial/tcl-customer-testimonials-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.js");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/customer-testimonial-ef/tcl-customer-testimonials-ef-clientlib.min.js");
  });
}

// Find the right Loan for you
function findRightLoan() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/find-right-loan-ef/find-right-loan-ef.html").then(function (response) {
    operation(response,"findRightLoanEF",".who-can-take-loan-ef","/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.min.css");
  });
}

// Blogs
function Blogs() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/blogs-pl-calc-ef/blogs-pl-calc-ef.html").then(function (response) {
    operation(response,"BlogsEF",".financial-insights","/etc.clientlibs/tata-capital-web/components/tcl-web-components/financial-insight/financial-insight-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.min.js");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/financial-insight-ef/financial-insight-clientlib-ef.js");

  });
}

// newsletter (subscribe box)
function newsLetter() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan/newsLetter-pl-ef/newsLetter-pl-ef.html").then(function (response) {
    operation(response,"newsLetterEF",".newsletter","/etc.clientlibs/tata-capital-web/components/tcl-web-components/newsletter/tcl-newsletter-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/newsletter/tcl-newsletter-clientlib.min.js");  
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/about-cibil-score/about-cibil-score-clientlib.js");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-global-analytics.js");
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