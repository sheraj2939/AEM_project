var scrollFlagBl = false;
if (screen.width <= 786) {
  document.addEventListener('touchstart', function () {
    if (scrollFlagBl == false) {
      scrollFlagBl = true;
      advOfTchl();
      moreHLprod();
      howtoapplyfortchl();
      popularFaqHL();
      instantLoanUrCity();
      relatedVideosHl();
      whatourcustsay();
      housingLoanBlogs();
    }
  })
}
else {
  document.addEventListener('mousemove', function () {
    if (scrollFlagBl == false) {
      scrollFlagBl = true;
      advOfTchl();
      moreHLprod();
      howtoapplyfortchl();
      popularFaqHL();
      instantLoanUrCity();
      relatedVideosHl();
      whatourcustsay();
      housingLoanBlogs();
    }
  })
  document.addEventListener('scroll', function () {
    if (scrollFlagBl == false) {
      scrollFlagBl = true;
      advOfTchl();
      moreHLprod();
      howtoapplyfortchl();
      popularFaqHL();
      instantLoanUrCity();
      relatedVideosHl();
      whatourcustsay();
      housingLoanBlogs();
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

// Advantage of tata capital home
function advOfTchl() {
  apiCall("GET", "/content/experience-fragments/tata-capital-web/en/component-ef/home-loan/advantage-of-tchl/advantage-of-tchl.html").then(function (response) {
    operation(response, "advOfTchlEF", ".key-features", "/etc.clientlibs/tata-capital-web/clientlibs/tcl-home-loan-clientlib-opt.min.css");
    cssLink("/etc.clientlibs/tata-capital-web/components/tcl-web-components/key-features/key-features-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-home-loan-clientlib-opt-ef.min.js");
  });
}

//More home Loan products
function moreHLprod() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/home-loan/more-home-loan-products-for-you/more-home-loan-products-for-you.html").then(function (response) {
    operation(response,"moreHLprodEF",".about-more-products","/etc.clientlibs/tata-capital-web/components/tcl-web-components/about-more-products/about-more-products-clientlib.css");
  });
}

//How tp apply for tata capital housing loan
function howtoapplyfortchl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/home-loan/how-to-apply-for-tchl/how-to-apply-for-tchl.html").then(function (response) {
    operation(response,"howtoapplyfortchlEF",".who-can-take-loan","/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.min.js");
  });
}
//popular faq tata capital home loan
function popularFaqHL() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/home-loan/popular-faq/popular-faq.html").then(function (response) {
    operation(response,"popularFaqHLEF",".popular-faq-box","/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.js");
  });
}

//instant loan in your city
function instantLoanUrCity() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/home-loan/instant-loan-in-your-city/instant-loan-in-your-city.html").then(function (response) {
    operation(response,"instantLoanUrCityEF",".instant-loan-in-your-city","/etc.clientlibs/tata-capital-web/components/tcl-web-components/instant-loan-in-your-city/instant-loan-in-your-city-clientlib.min.css");
  });
}

//what our cust say about us
function whatourcustsay() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/home-loan/what-our-cust-say-about-us/what-our-cust-say-about-us.html").then(function (response) {
    operation(response,"whatourcustsayEF",".customer-testimonial","/etc.clientlibs/tata-capital-web/components/tcl-web-components/customer-testimonial/tcl-customer-testimonials-clientlib.min.css");
    cssLink("/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.js");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/customer-testimonial-ef/tcl-customer-testimonials-ef-clientlib.js");
  });
}


//Related housing loan video
function relatedVideosHl() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/home-loan/related-hl-video/related-hl-video.html").then(function (response) {
    operation(response,"relatedVideosHlEF",".custome-related-videos","/etc.clientlibs/tata-capital-web/components/tcl-web-components/custom-related-videos/custom-related-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/custom-related-videos-ef/custom-related-clientlib-ef.min.js");
  });
}

//housing loan blogs
function housingLoanBlogs() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/home-loan/housing-loan-blogs/housing-loan-blogs.html").then(function (response) {
    operation(response,"housingLoanBlogsEF",".financial-insights","/etc.clientlibs/tata-capital-web/components/tcl-web-components/financial-insight/financial-insight-clientlib.min.css");
   jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/financial-insight-ef/financial-insight-clientlib-ef.js");
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