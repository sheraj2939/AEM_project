function getParentElement(element, level = 1) {
    while (level-- > 0) {
        element = element.parentElement;
        if (!element) return null;
    }
    return element;
}
// breadcrumb analytics START
var breadcrumbList = document.querySelectorAll('.cmp-breadcrumb__list li a');
if (breadcrumbList && breadcrumbList.length > 0) {
    breadcrumbList.forEach(function (element) {
        element.addEventListener('click', function (e) {
            try {
                var ctaText = e.currentTarget.innerText.trim();
                var componentName = getParentElement(e.currentTarget, 2).classList[0].split('-')[1].split('_')[0];
                var ctaTitle = componentName;
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)
            } catch (error) {
                console.log("breadcrumb element not found", error);
            }
        })

    })
}
// breadcrumb analytics END

// sticky widget analytics START
try{
    var stickyWidgetDownloadApp = document.querySelector('.custom-sticky-widget .downloadApp a');
    var stickyWidgetCreditScore = document.querySelector('.custom-sticky-widget .creditScore a');
    function stickyWidget(selector, compName){
        selector.addEventListener('click', function(e){
            var widgetName = e.currentTarget.innerText.trim();
            var componentName = compName
            widgetInteraction(widgetName,componentName);
        });
    }
    stickyWidget(stickyWidgetDownloadApp, 'sticky component');
    stickyWidget(stickyWidgetCreditScore, 'sticky component')
} catch(error) {
    console.log('element not found', error);
}
// sticky widget analytics END

// download now analytics START
try{
    document.querySelectorAll('.header-section .slider-item .text-downloads')[0].addEventListener('click', function(e){
    var ctaText = e.currentTarget.innerText.trim();
    var ctaTitle = 'Header Top Section'
    var componentName = 'headerAnalyticData'
    ctaInteraction(ctaText,componentName,ctaTitle,productCodeId);
    });
} catch(error){
    console.log('element not found', error);
}
// download now analytics END

// pdf filter dropdown year analytics START
var filterDropdown = document.querySelectorAll('.tchfl-investor-relation-pdf .custom-dropdown-list li');
if (filterDropdown && filterDropdown.length > 0) {
    filterDropdown.forEach(function (element) {
        element.addEventListener('click', function (e) {
            try {
                if (e.isTrusted) {
                    var filterValue = e.currentTarget.innerText.trim();
                    var componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
                    var ctaTitle = '';
                    filterApplied(ctaTitle, filterValue, componentName, productCodeId)
                } else {
                    console.log("Programmatic click");
                }
            } catch (error) {
                console.log("element not found", error);
            }
        })

    })
}
// pdf filter dropdown year analytics END

// investor relation pdf analytics START
var investorRelPdfList = document.querySelectorAll('.tchfl-investor-relation-pdf .general-info-list li a');
investorRelPdfList.forEach(function (irPdf) {
    irPdf.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('.heading20:not(.d-none)').innerText.replace(/\s+/g, ' ').trim();
            var filterValueElement = getParentElement(e.currentTarget, 5).querySelector('.general-info-top .top-left a');
            var filterValue = filterValueElement ? filterValueElement.innerText.replace(/\s+/g, ' ').trim() : '';
            var componentName = '';
            var parentElement = getParentElement(e.currentTarget, 8);
            if (parentElement && parentElement.previousElementSibling && parentElement.previousElementSibling.classList.contains('sub-nav')) {
                componentName = parentElement.previousElementSibling.querySelector('.overviews-link li.active').innerText.replace(/\s+/g, ' ').trim();
            } else {
                componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
            }

            documentDownload(ctaText, ctaTitle, filterValue, componentName, productCodeId);
        } catch (error) {
            console.log('element not found', error);
        }
    });
});
// investor relation pdf analytics END