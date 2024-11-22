var scrollFlagBl = false;
if (screen.width <= 786) {
    document.addEventListener('touchstart', function () {
        if (scrollFlagBl == false) {
            scrollFlagBl = true;
            AdvanofLap();
            propertyUnderLap();
            FourReasonWhy();
            LapEligibility();
            customerTestimonalLap();
            relatedVideosLap();
            popularFaqLap();
            BlogsLap();
        }
    })
}
else {
    document.addEventListener('mousemove', function () {
        if (scrollFlagBl == false) {
            scrollFlagBl = true;
            AdvanofLap();
            propertyUnderLap();
            FourReasonWhy();
            LapEligibility();
            customerTestimonalLap();
            relatedVideosLap();
            popularFaqLap();
            BlogsLap();
        }
    })
    document.addEventListener('scroll', function () {
      if (scrollFlagBl == false) {
          scrollFlagBl = true;
          AdvanofLap();
          propertyUnderLap();
          FourReasonWhy();
          LapEligibility();
          customerTestimonalLap();
          relatedVideosLap();
          popularFaqLap();
          BlogsLap();
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

// Advantages of tata-captial LAP
function AdvanofLap() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/loan-against-property/advantages-of-tata-capital-lap/advantages-of-tata-capital-lap.html").then(function (response) {
    operation(response,"AdvanofLapEF",".key-features");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-lap-clientlib-ef-opt.js");
  });
}

// Property covered under LAP
function propertyUnderLap() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/loan-against-property/property-covered-under-lap/property-covered-under-lap.html").then(function (response) {
    operation(response,"propertyUnderLapEF",".check-loan-eligibility","/etc.clientlibs/tata-capital-web/components/tcl-web-components/check-loan-eligibility/check-loan-eligibility-clientlib.css");
  });
}

// 4 Reason why LAP
function FourReasonWhy() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/loan-against-property/4-reasons-why-lap/4-reasons-why-lap.html").then(function (response) {
    operation(response,"FourReasonWhyEF",".why-to-choose-us","/etc.clientlibs/tata-capital-web/components/tcl-web-components/why-to-choose-us/why-to-choose-us-clientlib.css");
  });
}

// LAP Eligibility
function LapEligibility() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/loan-against-property/lap-eligibility/lap-eligibility.html").then(function (response) {
    operation(response,"LapEligibilityEF",".who-can-take-loan","/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.css");
  });
}

// customer testimonal LAP
function customerTestimonalLap() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/loan-against-property/customer-testimonial-lap-ef/customer-testimonial-lap-ef.html").then(function (response) {
    operation(response,"customerTestimonalLapEF",".customer-testimonial","/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.css");
    cssLink("/etc.clientlibs/tata-capital-web/components/tcl-web-components/customer-testimonial/tcl-customer-testimonials-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.js")
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/customer-testimonial-ef/tcl-customer-testimonials-ef-clientlib.js");
  });
}

// Related Videos For LAP
function relatedVideosLap() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/loan-against-property/related-videos-lap-ef/related-videos-lap-ef.html").then(function (response) {
    operation(response,"relatedVideosLapEF",".custome-related-videos","/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/custom-related-videos-ef/custom-related-clientlib-ef.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/custom-related-videos-ef/custom-related-clientlib-ef.js");
  });
}

//Popular FAQ LAP
function popularFaqLap() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/loan-against-property/popular-faq-lap-ef/popular-faq-lap-ef.html").then(function (response) {
    operation(response,"popularFaqLapEF",".popular-faq-box","/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.js");
  });
}

// Blogs BL
function BlogsLap() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/loan-against-property/blogs-lap-ef/blogs-lap-ef.html").then(function (response) {
    operation(response,"BlogsLapEF",".financial-insights","/etc.clientlibs/tata-capital-web/components/tcl-web-components/financial-insight/financial-insight-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/financial-insight-ef/financial-insight-clientlib-ef.js");
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