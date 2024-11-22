var scrollFlagBl = false;
if (screen.width <= 786) {
    document.addEventListener('touchstart', function () {
        if (scrollFlagBl == false) {
            scrollFlagBl = true;
            AdvantageOfCdl();
            WhatIsCdl();
            YouCanCdl();
            SixReasonWhyCdl();
            relatedVideosCdl();
            popularFaqCdl();
            BlogsCdl();
        }
    })
}
else {
    document.addEventListener('mousemove', function () {
        if (scrollFlagBl == false) {
            scrollFlagBl = true;
            AdvantageOfCdl();
            WhatIsCdl();
            YouCanCdl();
            SixReasonWhyCdl();
            relatedVideosCdl();
            popularFaqCdl();
            BlogsCdl();
        }
    })
    document.addEventListener('scroll', function () {
      if (scrollFlagBl == false) {
          scrollFlagBl = true;
          AdvantageOfCdl();
          WhatIsCdl();
          YouCanCdl();
          SixReasonWhyCdl();
          relatedVideosCdl();
          popularFaqCdl();
          BlogsCdl();
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

// Advantage Of CDL
function AdvantageOfCdl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/consumer-durable-loan/advantage-of-cdl/advantage-of-cdl.html").then(function (response) {
    operation(response,"AdvantageOfCdlEF",".key-features","/etc.clientlibs/tata-capital-web/clientlibs/tcl-consumer-durable-loan-ef-clientlibs.min.css");
    cssLink("/etc.clientlibs/tata-capital-web/components/tcl-web-components/key-features/key-features-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-consumer-durable-loan-ef-clientlibs.min.js");
  });
}

// what is CDL
function WhatIsCdl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/consumer-durable-loan/what-is-cdl/what-is-cdl.html").then(function (response) {
    operation(response,"WhatIsCdlEF",".check-loan-eligibility","/etc.clientlibs/tata-capital-web/components/tcl-web-components/check-loan-eligibility/check-loan-eligibility-clientlib.min.css");
  });
}

// You can also avail CDL
function YouCanCdl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/consumer-durable-loan/you-can-cdl/you-can-cdl.html").then(function (response) {
    operation(response,"YouCanCdlEF",".who-can-take-loan","/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.min.js");
  });
}


// Why you should choose us
function SixReasonWhyCdl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/consumer-durable-loan/six-reason-why-cdl/six-reason-why-cdl.html").then(function (response) {
    operation(response,"SixReasonWhyCdlEF",".why-to-choose-us","/etc.clientlibs/tata-capital-web/components/tcl-web-components/why-to-choose-us/why-to-choose-us-clientlib.min.css");
  });
}

// Related Videos For CDL
function relatedVideosCdl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/consumer-durable-loan/related-videos-cdl-ef/related-videos-cdl-ef.html").then(function (response) {
    operation(response,"relatedVideosCdlEF",".custome-related-videos","/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/custom-related-videos-ef/custom-related-clientlib-ef.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/custom-related-videos-ef/custom-related-clientlib-ef.min.js");
  });
}

//Popular FAQ LAP
function popularFaqCdl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/consumer-durable-loan/popular-faq-cdl-ef/popular-faq-cdl-ef.html").then(function (response) {
    operation(response,"popularFaqCdlEF",".popular-faq-box","/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.js");
  });
}

// Blogs CDL
function BlogsCdl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/consumer-durable-loan/blogs-cdl-ef/blogs-cdl-ef.html").then(function (response) {
    operation(response,"BlogsCdlEF",".financial-insights","/etc.clientlibs/tata-capital-web/components/tcl-web-components/financial-insight/financial-insight-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/financial-insight-ef/financial-insight-clientlib-ef.min.js");
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