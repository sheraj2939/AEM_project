function analyticsLoad() {
    var jsScript = document.createElement('script');
    var jsCibilScoreScript = document.createElement('script');
    jsScript.setAttribute('src', '/etc.clientlibs/tata-capital-web/clientlibs/tcl-libraries/tcl-global-analytics.js');
    jsCibilScoreScript.setAttribute('src', '/etc.clientlibs/tata-capital-web/components/tcl-web-components/about-cibil-score/about-cibil-score-clientlib.js');
    document.querySelector('body').appendChild(jsScript);
    document.querySelector('body').appendChild(jsCibilScoreScript);
}

var scrollFlag = false;
document.addEventListener('mousemove', function () {
    if (scrollFlag == false) {
        scrollFlag = true;
        analyticsLoad();
    }
});
document.addEventListener('scroll', function () {
    if (scrollFlag == false) {
        scrollFlag = true;
        analyticsLoad();
    }
});

