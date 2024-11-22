var scrollFlagTWL = false;
if (screen.width <= 786) {
    document.addEventListener('touchstart', function () {
        if (scrollFlagTWL == false) {
            scrollFlagTWL = true;
            AdvantageTakingTwl();
            whyShouldTakeTwclLoan();
            whatIsEligibiltyTwl();
            customerTestimonalTwl();
            detailedFaq();
            relatedVideosTwl();
        }
    })
}
else {
    document.addEventListener('mousemove', function () {
        if (scrollFlagTWL == false) {
            scrollFlagTWL = true;
            AdvantageTakingTwl();
            whyShouldTakeTwclLoan();
            whatIsEligibiltyTwl();
            customerTestimonalTwl();
            detailedFaq();
            relatedVideosTwl();
        }
    })
    document.addEventListener('scroll', function () {
      if (scrollFlagTWL == false) {
          scrollFlagTWL = true;
          AdvantageTakingTwl();
          whyShouldTakeTwclLoan();
          whatIsEligibiltyTwl();
          customerTestimonalTwl();
          detailedFaq();
          relatedVideosTwl();
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

// Advantage Of Taking TWL
function AdvantageTakingTwl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/two-wheeler-loan/advantage-of-taking-a-twl/advantage-of-taking-a-twl.html").then(function (response) {
    operation(response,"AdvantageTakingTwlEF",".key-features");
  });
}

// Why Should Take TWL Loan
function whyShouldTakeTwclLoan() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/two-wheeler-loan/why-should-take-twl/why-should-take-twl.html").then(function (response) {
    operation(response,"whyShouldTakeTwclLoanEF",".why-to-choose-us","/etc.clientlibs/tata-capital-web/components/tcl-web-components/why-to-choose-us/why-to-choose-us-clientlib.css");
  });
}

// What is Eligibility TWL
function whatIsEligibiltyTwl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/two-wheeler-loan/what-is-eligibility-twl/what-is-eligibility-twl.html").then(function (response) {
    operation(response,"whatIsEligibiltyTwlEF",".who-can-take-loan","/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.js");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-two-wheeler-loan-ef-opt.js");
    });
  }

// Customer Testimonal TWL
function customerTestimonalTwl() {
    apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/two-wheeler-loan/customer-testimonial-twl/customer-testimonial-twl.html").then(function (response) {
      operation(response,"customerTestimonalTwlEF",".customer-testimonial","/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.css");
      cssLink("/etc.clientlibs/tata-capital-web/components/tcl-web-components/customer-testimonial/tcl-customer-testimonials-clientlib.min.css");
      jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.js")
      jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/customer-testimonial-ef/tcl-customer-testimonials-ef-clientlib.js");
    });
  }

//  TWL Details faq
function detailedFaq() {
    apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/two-wheeler-loan/detailed-faq/detailed-faq.html").then(function (response) {
        operation(response,"detailedFaqEF",".popular-faq-box","/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.css");
        jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.js");
    });
  }


//Related TWL video
function relatedVideosTwl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/two-wheeler-loan/twl-custom-related-video/twl-custom-related-video.html").then(function (response) {
    operation(response,"relatedVideosTwlEF",".custome-related-videos","/etc.clientlibs/tata-capital-web/components/tcl-web-components/custom-related-videos/custom-related-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/custom-related-videos-ef/custom-related-clientlib-ef.min.js");
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