var scrollFlagBl = false;
if (screen.width <= 786) {
    document.addEventListener('touchstart', function () {
        if (scrollFlagBl == false) {
            scrollFlagBl = true;
           AdvantageTakingUcl();
           sixReasontakeShcl();
           whatAreTheEc();
           eligibilityCriteria();
           whatOurCustSayAU();
           relatedVideo();
           popularFaq();
           uclBlog();
            
        }
    })
}
else {
    document.addEventListener('mousemove', function () {
        if (scrollFlagBl == false) {
            scrollFlagBl = true;
           AdvantageTakingUcl();
           sixReasontakeShcl();
           whatAreTheEc();
           eligibilityCriteria();
           whatOurCustSayAU();
           relatedVideo();
           popularFaq();
           uclBlog();
            
        }
    })
    document.addEventListener('scroll', function () {
      if (scrollFlagBl == false) {
          scrollFlagBl = true;
         AdvantageTakingUcl();
         sixReasontakeShcl();
         whatAreTheEc();
         eligibilityCriteria();
         whatOurCustSayAU();
         relatedVideo();
         popularFaq();
         uclBlog();
          
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
function AdvantageTakingUcl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/used-car-loan/advantage-of-taking-ucl/advantage-of-taking-ucl.html").then(function (response) {
    operation(response,"AdvantageTakingUclEF",".key-features","/etc.clientlibs/tata-capital-web/clientlibs/tcl-used-car-loan-clientlib-opt");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-used-car-loan-clientlib-opt-ef.js");
  });
}

//six reason to choose us for taking a second hand car loan
function sixReasontakeShcl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/used-car-loan/six-reason-to-taking-scl/six-reason-to-taking-scl.html").then(function (response) {
    operation(response,"sixReasontakeShclEF",".why-to-choose-us","/etc.clientlibs/tata-capital-web/components/tcl-web-components/why-to-choose-us/why-to-choose-us-clientlib.min.css");
  });
}

//what-are-the-eligibilty-creteria
function whatAreTheEc() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/used-car-loan/what-are-the-eligibilty-creteria/what-are-the-eligibilty-creteria.html").then(function (response) {
    operation(response,"whatAreTheEcEF",".check-loan-eligibility","/etc.clientlibs/tata-capital-web/components/tcl-web-components/check-loan-eligibility/check-loan-eligibility-clientlib.min.css");
  });
}

//Eligibility Criteria
function eligibilityCriteria() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/used-car-loan/eligibility-criteria/eligibility-criteria.html").then(function (response) {
    operation(response,"eligibilityCriteriaEF",".who-can-take-loan","/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.min.js");
  });
}

//what-our-customer-say-about-us
function whatOurCustSayAU() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/used-car-loan/what-our-customer-say-about-us/what-our-customer-say-about-us.html").then(function (response) {
    operation(response,"whatOurCustSayAUEF",".customer-testimonial","/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.css");
    cssLink("/etc.clientlibs/tata-capital-web/components/tcl-web-components/customer-testimonial/tcl-customer-testimonials-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.js")
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/customer-testimonial-ef/tcl-customer-testimonials-ef-clientlib.js");
  });
}

//Related video
function relatedVideo() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/used-car-loan/related-video/related-video.html").then(function (response) {
    operation(response,"relatedVideoEF",".custome-related-videos","/etc.clientlibs/tata-capital-web/components/tcl-web-components/custom-related-videos/custom-related-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/custom-related-videos/custom-related-clientlib.min.js");
  });
}

//popular faq
function popularFaq() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/used-car-loan/popular-faq/popular-faq.html").then(function (response) {
    operation(response,"popularFaqEF",".popular-faq-box","/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.js");
  });
}

//used-car-loan-blog
function uclBlog() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/used-car-loan/used-car-loan-blog/used-car-loan-blog.html").then(function (response) {
    operation(response,"uclBlogEF",".financial-insights","/etc.clientlibs/tata-capital-web/components/tcl-web-components/financial-insight/financial-insight-clientlib.min.css");
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