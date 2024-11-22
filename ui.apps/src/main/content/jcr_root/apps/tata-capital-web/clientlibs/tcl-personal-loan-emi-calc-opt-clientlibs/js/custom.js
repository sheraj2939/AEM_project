var scrollFlag = false;
if (screen.width <= 786) {
    document.addEventListener('touchstart', function () {
        if (scrollFlag == false) {
            scrollFlag = true;
            howISEmICalculated();
            instantLoanBoxCard();
            amortization();
            popularFaq();
            morePlProducts();
            customerTestimonal();
            findRightLoan();
            Blogs();
            newsLetter();
        }
    })
}
else {
    document.addEventListener('mousemove', function () {
        if (scrollFlag == false) {
            scrollFlag = true;
            howISEmICalculated();
            instantLoanBoxCard();
            amortization();
            popularFaq();
            morePlProducts();
            customerTestimonal();
            findRightLoan();
            Blogs();
            newsLetter();
        }
    })
    document.addEventListener('scroll', function () {
      if (scrollFlag == false) {
          scrollFlag = true;
          howISEmICalculated();
          instantLoanBoxCard();
          amortization();
          popularFaq();
          morePlProducts();
          customerTestimonal();
          findRightLoan();
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

// How is EMI calculated for personal Loan
function howISEmICalculated() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan-emi-calc/emi-calc-for-pl-ef/emi-calc-for-pl-ef.html").then(function (response) {
    operation(response,"howIsEmICalculatedEF",".how-emi-calc-works","/etc.clientlibs/tata-capital-web/components/tcl-web-components/how-emi-calc-works/how-emi-calc-works-clientlib.min.css");
    cssLink("/etc.clientlibs/tata-capital-web/components/tcl-web-components/about-product/about-product-clientlib.min.css");
  });
}

// Instant Loan Box card
function instantLoanBoxCard() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan-emi-calc/instant-loan-box-card-ef/instant-loan-box-card-ef.html").then(function (response) {
    operation(response,"instantLoanBoxCardEF",".instant-loan-box","/etc.clientlibs/tata-capital-web/components/tcl-web-components/instant-loan-box/instant-loan-box-clientlib.min.css");
  });
}

// Personal Loan amortization schedule
function amortization() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan-emi-calc/amortization-schedule-ef/amortization-ef.html").then(function (response) {
    operation(response,"amortizationEF",".amortization","/etc.clientlibs/tata-capital-web/components/tcl-web-components/table/table-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/table/table-clientlib.min.js");
  });
}

//Popular FAQ
function popularFaq() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan-emi-calc/popular-faq-ef/popular-faq-ef.html").then(function (response) {
    operation(response,"popularFaqEF",".popular-faq-box","/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/popular-faq/popular-faq-clientlib.min.js");
  });
}

//More Personal Loan products for you
function morePlProducts() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan-emi-calc/more-pl-products-ef/more-pl-products-ef.html").then(function (response) {
    operation(response,"morePlProductsEF",".about-more-products","/etc.clientlibs/tata-capital-web/components/tcl-web-components/about-more-products/about-more-products-clientlib.min.css");
  });
}

// customer testimonal
function customerTestimonal() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan-emi-calc/customer-testimonial-pl-emi-ef/customer-testimonial-pl-emi-ef.html").then(function (response) {
    operation(response,"customerTestimonalEF",".customer-testimonial","/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.css");
    cssLink("/etc.clientlibs/tata-capital-web/components/tcl-web-components/customer-testimonial/tcl-customer-testimonials-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-simplebar.min.js")
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/customer-testimonial-ef/tcl-customer-testimonials-ef-clientlib.js");
    jsScript("/etc.clientlibs/tata-capital-web/clientlibs/tcl-personal-loan-emi-calc-ef-opt.min.js");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/calculators/calculators-clientlib.js");
  });
}

// Find the right Loan for you
function findRightLoan() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan-emi-calc/find-right-loan-ef/find-right-loan-ef.html").then(function (response) {
    operation(response,"findRightLoanEF",".who-can-take-loan","/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.min.css");
  });
}

// Blogs
function Blogs() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan-emi-calc/blogs-pl-emi-calc-ef/blogs-pl-emi-calc-ef.html").then(function (response) {
    operation(response,"BlogsEF",".financial-insights","/etc.clientlibs/tata-capital-web/components/tcl-web-components/financial-insight/financial-insight-clientlib.min.css");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-experience-fragment-component/financial-insight-ef/financial-insight-clientlib-ef.js");
    jsScript("/etc.clientlibs/tata-capital-web/components/tcl-web-components/who-can-take-loan/who-can-take-loan-clientlib.min.js");
  });
}

// newsletter (subscribe box)
function newsLetter() {
  apiCall("GET","/content/experience-fragments/tata-capital-web/en/component-ef/personal-loan-emi-calc/newsLetter-pl-ef/newsLetter-pl-ef.html").then(function (response) {
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
  try{
    NormalComp.replaceWith(extractVar);
  }catch (error){
    console.log(error);
  }

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
    if(jslink === "/etc.clientlibs/tata-capital-web/clientlibs/tcl-personal-loan-emi-calc-ef-opt.min.js"){
      script.defer = true;
    }
    else{
      script.async = true;
    }
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
/*document required slider*/
if ($(window).width() > 991) {
  if ($(".jsDocumentRequiredSlider").hasClass("slick-initialized")) {
    $(".jsDocumentRequiredSlider").slick("unslick");
  }
} else {
  $(".jsDocumentRequiredSlider")
    .not(".slick-initialized")
    .slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true,
            centerMode: true,
            centerPadding: "30px",
            infinite: false,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: "30px",
            infinite: false,
            dots: true,
          },
        },
      ],
    });
}
/*document required slider*/