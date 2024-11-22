function getParentElement(element, level = 1) {
    while (level-- > 0) {
        element = element.parentElement;
        if (!element) return null;
    }
    return element;
}

// Asset Disposal Search Property Analytics START

try {
    document.querySelector('.approved-projects-box .search-property-row .show-project-btn').addEventListener('click', function (e) {
        var city = e.currentTarget.parentElement.querySelector('.search-property-left [data-type="city"]').nextElementSibling.querySelector('.selection .select2-selection__rendered').innerText.trim();
        var state = e.currentTarget.parentElement.querySelector('.search-property-left [data-type="state"]').nextElementSibling.querySelector('.selection .select2-selection__rendered').innerText.trim();
        var propertyType = e.currentTarget.parentElement.querySelector('.search-property-left .custom-multiselect-dropdown .multiselect-dropdown-button a').innerText.trim();
        var componentName;
        if (e.currentTarget.id == 'listingSubmitBtn') {
            componentName = getParentElement(e.currentTarget, 6).classList.value.split('-').join(' ') + ' box';
        }
        else {
            componentName = getParentElement(e.currentTarget, 5).classList.value.split('-').join(' ') + ' box';
        }
        var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('h2').innerText.trim();
        propertysearchSubmit(city, state, propertyType, componentName, ctaTitle);
    });
} catch (error) {
    console.log("element not found", error);
}

// Asset Disposal Search Property Analytics END

// Asset Disposal Hot Deals On Properties Tabs Analytics START

try {
    document.querySelectorAll('.deal-box .deals-tabs li.tab-item a.tab-button').forEach(function (ele) {
        ele.addEventListener('click', function (e) {
            var tabTitle = e.currentTarget.dataset.menu;
            var ctaTitle = getParentElement(e.currentTarget, 5).querySelector('.tops-heads h2').innerText.trim();
            var componentName = getParentElement(e.currentTarget, 5).querySelector('.tops-heads h2').innerText.trim() + ' box';
            tabInteraction(tabTitle, componentName, ctaTitle);
        });
    });
} catch (error) {
    console.log("element not found", error);
}

// Asset Disposal Hot Deals On Properties Tabs Analytics END

// Asset Disposal Hot Deals On Properties Know More Analytics START
/*
    try{
        document.querySelectorAll('.deal-box .faq-tab-content-wrap .deal-div .deal-btn-more button').forEach(function(ele){
            ele.addEventListener('click',function(e){
                var city=getParentElement(e.currentTarget,4).parentElement.dataset.content;
                var ctaTitle=getParentElement(e.currentTarget,8).querySelector('.tops-heads h2').innerText.trim();
                var componentName=getParentElement(e.currentTarget,8).querySelector('.tops-heads h2').innerText.trim()+' box';
                var contractId=e.currentTarget.dataset.link;
                knowmorebuttonClick(city,componentName,ctaTitle,contractId);
            });
        });
    }catch(error){
        console.log("element not found",error);
    }
    */


// Asset Disposal Hot Deals On Properties Know More Analytics END

// Asset Disposal Upcoming Properties Know More Analytics START

/*try{
    document.querySelectorAll('.deal-row .deal-div .deal-btn-more a').forEach(function(ele){
        ele.addEventListener('click',function(e){
            var city=getParentElement(e.currentTarget,2).querySelector('.deal-name .deal-name-sub').innerText.trim();
            if(getParentElement(e.currentTarget,8).classList.contains('similar-properties'))
            {
                var ctaTitle=getParentElement(e.currentTarget,6).querySelector('.tops-heads h2').innerText.trim();
                var componentName=getParentElement(e.currentTarget,6).querySelector('.tops-heads h2').innerText.trim()+' box';
            }
            else
            {
                var ctaTitle=getParentElement(e.currentTarget,7).querySelector('ul.tab-btn-group li.tab-item a.active').innerText.trim();
                var componentName=getParentElement(e.currentTarget,7).querySelector('ul.tab-btn-group li.tab-item a.active').innerText.trim()+' box';
            }
            var contractId=e.currentTarget.dataset.linkupcomping;
            knowmorebuttonClick(city,componentName,ctaTitle,contractId);
        });
    });
}catch(error){
    console.log("element not found",error);
}*/

// Asset Disposal Upcoming Properties Know More Analytics END

// Asset Disposal Upcoming Properties Load More Analytics START

try {
    document.querySelector('.similar-properties-btn #jsLoadMoreProperties').addEventListener('click', function (e) {
        var ctaText = e.currentTarget.innerText.trim();
        var componentName;
        var ctaTitle;
        if (getParentElement(e.currentTarget, 5).classList.contains('similar-properties')) {

            ctaTitle = getParentElement(e.currentTarget, 3).querySelector('.tops-heads h2').innerText.trim()
            componentName = getParentElement(e.currentTarget, 3).querySelector('.tops-heads h2').innerText.trim() + ' box';
        }
        else {
            ctaTitle = getParentElement(e.currentTarget, 4).querySelector('ul.tab-btn-group li.tab-item a.active').innerText.trim();
            componentName = getParentElement(e.currentTarget, 4).querySelector('ul.tab-btn-group li.tab-item a.active').innerText.trim() + ' box';
        }
        ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
    });
} catch (error) {
    console.log("element not found", error);
}

// Asset Disposal Upcoming Properties Load More Analytics END

// Asset Disposal Faq Click Analytics START

/*try{
    document.querySelectorAll('.popular-faq-box .faq-box .faq-card .faq-row a.faq-heading').forEach(function (btn) {
        btn.addEventListener('click',function(e){
            var componentName=getParentElement(e.currentTarget, 8).querySelector('h2').innerText.trim();
            var faqTitle=e.currentTarget.innerText.trim();
            faqClick(componentName,faqTitle,productCodeId);
        });
    });
}catch(error){
    console.log("element not found",error);
}*/

// Asset Disposal Faq Click Analytics END

// Asset Disposal Footer Analytics START

$('[data-footer]').click(function (e) {
    try {
        var menuLinkText = e.currentTarget.textContent;
        if (menuLinkText) {
            menuLinkText = menuLinkText.trim();
        }
        if (menuLinkText === "") {
            var menuLinkText = e.currentTarget.dataset.imgContent;
            if (menuLinkText) {
                menuLinkText = menuLinkText.trim();
            }
        }
        var componentName = e.currentTarget.dataset.footer.split('-')[0];
        var productCode = productCodeId;
        var menuTitle = getParentElement(e.currentTarget, 5).querySelector('.footer-headings').innerText.trim();
        menuInteraction(menuLinkText, componentName, menuTitle, productCode);
    } catch (error) {
        console.log("element not found", error)
    }

});

$('[data-img-content-social]').click(function (e) {
    try {
        var componentName = e.currentTarget.dataset.imgContentSocial.split("-")[0];
        if (e.currentTarget.dataset.imgContentSocial) {
            ctaTitle = "social media share";
            iconName = e.currentTarget.dataset.imgContentSocial.split("-")[1].split(' ')[2];
        }
        socialmediaiconClick(componentName, ctaTitle, iconName)
    } catch (error) {
        console.log("element not found", error)
    }
});


// Asset Disposal Footer Analytics END


// asset disposal Block slot from analytics START

$('.jsBookInspectionSubmit').click(function (e) {
    try {
        if (!$(e.currentTarget).hasClass("btn-disabled")) {
            var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('p.text16i').innerText.trim();
            var componentName = getParentElement(e.currentTarget, 4).querySelector('#bookInspectionForm h3.heading20').innerText.trim() + ' box';
            var contractId = getParentElement(e.currentTarget, 2).querySelector('p.text16i').innerText.trim().split('#')[1].split('|')[0].trim();
            var emailId = getParentElement(e.currentTarget, 2).querySelector('.row-col-50 [data-type="email"]').value.trim();
            var mobileNo = getParentElement(e.currentTarget, 2).querySelector('.row-col-50 [data-type="mobile"]').value.trim();
            var leadId = '';

            blockslotSubmit(componentName, ctaTitle, contractId, emailId, mobileNo, leadId)
        }
    } catch (error) {
        console.log("element not found", error)
    }

})

// asset disposal Block slot from analytics END

// asset disposal i'm interested and are you a broker button analytics START

document.querySelectorAll('.action-holder [data-popovermodal="popover-modal"]').forEach(function (ele) {
    ele.addEventListener('click', function (e) {
        try {
            var propertyName = getParentElement(e.currentTarget, 2).querySelector('.property-title .heading36').innerText.trim();
            var propertyId = getParentElement(e.currentTarget, 2).querySelector('.reference-id .number').innerText.trim().replace('#', '');
            var ctaTitle = propertyName.replaceAll(' ', '').replaceAll(',', '-') + '-' + propertyId;
            var componentName = 'property listing box';
            var ctaText = getParentElement(e.currentTarget, 0).innerText.trim();

            ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)
        } catch (error) {
            console.log("element not found", error)
        }
    })
})
// asset disposal i'm interested and are you a broker button analytics START

// i'm interested from button analytics START
$('#housingForm .jsHousingSubmit').click(function (e) {
    try {
        if (!$(e.currentTarget).hasClass("btn-disabled")) {
            var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('h3.heading20').innerText.trim();
            var componentName = "property interest box";
            var contractId = getParentElement(e.currentTarget, 2).querySelector('p.text16i span').innerText.trim();
            var emailId = getParentElement(e.currentTarget, 2).querySelector('.row-col-50 [data-type="email"]').value.trim();
            var mobileNo = getParentElement(e.currentTarget, 2).querySelector('.row-col-50 [data-type="mobile"]').value.trim();
            var leadId = '';

            propertyinterestSubmit(componentName, ctaTitle, contractId, emailId, mobileNo, leadId);
        }
    } catch (error) {
        console.log("element not found", error)
    }
})
// i'm interested from button analytics END

// footer Policies, Codes & Other Documents START
var footerPoliceBtn = document.querySelectorAll('#policies-codes2 .tab-content .footer-links li a');
footerPoliceBtn.forEach(function (ele) {
    ele.addEventListener('click', function (e) {
        try {
            var menuLinkText = $(this).text().trim();
            var componentName = getParentElement(e.currentTarget, 7).querySelector('.footer-headings').innerText.trim();
            var desktopTabDiv = document.querySelector('.hidden-xs.policies-tab-top')
            var computedStyle = window.getComputedStyle(desktopTabDiv);
            var menuTitle = '';
            if (computedStyle.display !== "none") {
                menuTitle = getParentElement(e.currentTarget, 6).querySelector('.nav-tablist.active').innerText.trim();
            } else {
                menuTitle = getParentElement(e.currentTarget, 4).querySelector('.tab-accordian.visible-xs a').innerText.trim();
            }

            menuInteraction(menuLinkText, componentName, menuTitle, productCodeId);
        } catch (error) {
            console.log("element not found", error)
        }
    })
})
// footer Policies, Codes & Other Documents END //

//Share your info here from START
$('[data-analyitcs="shareinfo"]').click(function (e) {
    try {
        var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('h3.heading20').innerText.trim();
        var componentName = ctaTitle + ' box';
        var contractId = propertyId.trim();
        var emailId = getParentElement(e.currentTarget, 2).querySelector('.row-col-50 [data-type="email"]').value.trim();
        var mobileNo = getParentElement(e.currentTarget, 2).querySelector('.row-col-50 [data-type="mobile"]').value.trim();
        var leadId = '';

        shareinfoSubmit(componentName, ctaTitle, contractId, emailId, mobileNo, leadId)
    } catch (error) {
        console.log("element not found", error)
    }
})
//Share your info here from END

