var scrollFlagBl = false;
if (screen.width <= 786) {
    document.addEventListener('touchstart', function () {
        if (scrollFlagBl == false) {
            scrollFlagBl = true;
            AdvantageTakingLas();
            whoCanTakeLoan();
            customeRelatedVideo();
            popularFaq();
            BlogsLas();
        }
    })
}
else {
    document.addEventListener('mousemove', function () {
        if (scrollFlagBl == false) {
            scrollFlagBl = true;
            AdvantageTakingLas();
            whoCanTakeLoan();
            customeRelatedVideo();
            popularFaq();
            BlogsLas();
        }
    })
    document.addEventListener('scroll', function () {
      if (scrollFlagBl == false) {
          scrollFlagBl = true;
          AdvantageTakingLas();
          whoCanTakeLoan();
          customeRelatedVideo();
          popularFaq();
          BlogsLas();
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

// Advantage Taking LAS
function AdvantageTakingLas() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/loan-against-securities/advantage-of-taking-a-las/advantage-of-taking-a-las.html").then(function (response) {
    operation(response,"AdvantageTakingLasEF",".key-features","/etc.clientlibs/tata-capital-web/clientlibs/tcl-las-clientlib-opt.css");
    cssLink("/etc.clientlibs/tata-capital-web/components/tcl-web-components/key-features/key-features-clientlib.css");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-las-clientlib-ef-opt.js");
  });
}

// who take a loan
function whoCanTakeLoan() {
    apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/loan-against-securities/how-to-apply-for-las/how-to-apply-for-las.html").then(function (response) {
      operation(response,"whoCanTakeLoanEF",".who-can-take-loan","/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.css");
      jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.js");
    });
  }

  // cutome related video
  function customeRelatedVideo() {
    apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/loan-against-securities/custom-related-video/custom-related-video.html").then(function (response) {
        operation(response,"customeRelatedVideoEF",".custome-related-videos","/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/custom-related-videos-ef/custom-related-clientlib-ef.css");
        jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/custom-related-videos-ef/custom-related-clientlib-ef.js");
    });
  }


   // popular faq
   function popularFaq() {
    apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/loan-against-securities/popular-faq/popular-faq.html").then(function (response) {
        operation(response,"popularFaq",".popular-faq-box","/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.css");
        jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.js");
    });
  }

  // Blogs LAS
function BlogsLas() {
    apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/loan-against-securities/blogs-las-ef/blogs-las-ef.html").then(function (response) {
      operation(response,"BlogsLasEF",".financial-insights","/etc.clientlibs/tata-capital-web/components/tcl-web-components/financial-insight/financial-insight-clientlib.min.css");
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