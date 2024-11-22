function getParentElement(element, level = 1) {
    while (level-- > 0) {
        element = element.parentElement;
        if (!element) return null;
    }
    return element;
}
// TCHFL about more product analytics START

try {
    document.querySelectorAll('.about-more-products .about-more-products-items .btn-holder a').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            if (getParentElement(e.currentTarget, 14).classList.contains('about-more-products') || (getParentElement(e.currentTarget, 15).classList.contains('about-more-products'))) {
                var ctaText = e.currentTarget.innerText.trim();
                var componentName = getParentElement(e.currentTarget, 14).querySelector('.tops-heads .text-center').innerText.trim();
                var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('.personal-wrapper .text h4').innerText.trim();
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
            }
        });
    });
} catch (error) {
    console.log("element not found", error);
}

// TCHFL about more product analytics END

// TCHFL Branch Locator box select analytics  START

try {
    document.querySelectorAll('[data-type=city]').forEach(function (btn) {
        $(btn).on('select2:select', function (ele) {
            var city = ele.params.data.text.trim();
            var state = getParentElement(ele.currentTarget, 6).querySelector('.selection .select2-selection__rendered').innerText.trim();
            var componentName = 'branch locator box';
            var ctaTitle = getParentElement(ele.currentTarget, 8).querySelector('.component-title h2').innerText.trim();
            selectbranchLocator(city, state, componentName, ctaTitle, productCodeId);
        });
    });
} catch (error) {
    console.log("element not found", error);
}

// TCHFL Branch Locator box select analytics END

// TCHFL Branch Locator box widget analytics START

try {
    document.querySelectorAll('.branch-locator-box .tab-btn-group .tab-item a').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var widgetName = e.currentTarget.innerText.trim();
            var componentName = 'branch locator box';
            widgetInteraction(widgetName, componentName);
        });
    });
} catch (error) {
    console.log("element not found", error);
}

// TCHFL Branch Locator box widget analytics END

// TCHFL SMS Details poopup analytics START

try {
    document.querySelectorAll('.branch-locator-sms .jsSmsDetails a').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var ctaText = e.currentTarget.innerText.trim();
            var componentName = 'SMS Details poopup';
            var ctaTitle = getParentElement(e.currentTarget, 2).querySelector('h3.heading20.text-white').innerText.trim();
            var mobileNo = e.currentTarget.previousElementSibling.querySelector('.form-textbox-new.form-input-bg input').value;
            sendbranchDetails(ctaText, componentName, ctaTitle, mobileNo);
        });
    });
} catch (error) {
    console.log("element not found", error);
}

// TCHFL SMS Details popup analytics END

// TCHFL Apply section analytics START

try {
    document.querySelectorAll('.tchfl-header .header-navbar .login-search-menu .login-search-item.apply-btn-wrap a').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var menuLinkText = e.currentTarget.innerText.trim();
            var componentName = 'headerAnalyticData';
            var menuTitle = 'header apply section';
            menuInteraction(menuLinkText, componentName, menuTitle, productCodeId);
        });
    });
} catch (error) {
    console.log("element not found", error);
}

// TCHFL Apply section analytics END

// TCHFL Login section analytics START

try {
    document.querySelectorAll('.tchfl-header .header-navbar .login-search-menu .login-search-item.login-btn-wrap a').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var menuLinkText = e.currentTarget.innerText.trim() || 'login icon';
            var componentName = 'headerAnalyticData';
            var menuTitle = 'header login section';
            menuInteraction(menuLinkText, componentName, menuTitle, productCodeId);
        });
    });
} catch (error) {
    console.log("element not found", error);
}

// TCHFL Login section analytics END

// TCHFL Menu section analytics START

//desktop

try {
    document.querySelectorAll('.tchfl-header .header-navbar .header-menu-wrap .menu-item a').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var menuLinkText = e.currentTarget.innerText.trim();
            var componentName = 'headerAnalyticData';
            var menuTitle = 'header menu section';
            menuInteraction(menuLinkText, componentName, menuTitle, productCodeId);
        });
    });
} catch (error) {
    console.log("element not found", error);
}

//desktop

//mobile

try {
    document.querySelectorAll('.tchfl-header .mob-header .accordian-mobsubmenu a.submenu-head').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var menuLinkText = e.currentTarget.innerText.trim();
            var componentName = 'headerAnalyticData';
            var menuTitle = 'header menu section';
            menuInteraction(menuLinkText, componentName, menuTitle, productCodeId);
        });
    });
} catch (error) {
    console.log("element not found", error);
}

//mobile

// TCHFL Menu section analytics END

// TCHFL support & blogs header top section analytics START

try {
    document.querySelectorAll('.tchfl-header .header-inner .header-top .header-slider-contact-wrap .right-col a').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var menuLinkText = e.currentTarget.innerText.trim();
            var componentName = 'headerAnalyticData';
            var menuTitle = 'header top section';
            menuInteraction(menuLinkText, componentName, menuTitle, productCodeId);
        });
    });
} catch (error) {
    console.log("element not found", error);
}

// TCHFL support & blogs header top section analytics END

// TCHFL self service option cards analytics START

try {
    var selfServiceOptCards = document.querySelectorAll('.slider-tab .key-features .cmp-teaser__link');
    selfServiceOptCards.forEach(function (selfServiceOptCard) {
        selfServiceOptCard.addEventListener('click', function (e) {
            if (getParentElement(e.currentTarget, 16).classList[0] == 'slider-tab') {
                var ctaText = e.currentTarget.querySelector('.instant-top h3').innerText.trim();
                var ctaTitle = getParentElement(e.currentTarget, 13).querySelector('.cmp-tabs__tab--active a').innerText.trim();
                var componentName = getParentElement(e.currentTarget, 5).querySelector('.component-title h2').innerText.trim();
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
            }
        });
    });
} catch (error) {
    console.log("element not found", error);
}

// TCHFL self service option cards analytics END

// TCHFL faq click analytics START

try {
    document.querySelectorAll('.popular-faq-box .faq-box .faq-card .faq-row a.faq-heading').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var componentName = getParentElement(e.currentTarget, 8).querySelector('h2').innerText.trim();
            var faqTitle = e.currentTarget.innerText.trim();
            faqClick(componentName, faqTitle, productCodeId);
        });
    });
} catch (error) {
    console.log("element not found", error);
}

// TCHFL faq click analytics END

// 21-06-2023
/*tchfl banner anyaltics call START */
try {
    var bannerCta = $('.custom-banner-component .banner-item-new a');
    bannerCta.each(function (ind, ele) {
        $(ele).click(function (e) {
            var bannerTitle = $(this).parents('.banner-text-new').find('.heading-h1').text().trim();
            var bannerCode = '';
            bannerTitle.split(' ').forEach(function (elem) {
                bannerCode += elem.slice(0, 1);
            });
            var componentName = window.location.href.split('/').pop().split('.').shift() + ' ' + 'banner component';
            var bannerCta = $(this).text().trim();
            bannerInteraction(bannerTitle, componentName, bannerCta, bannerCode)
        })
    });

} catch (error) {
    console.log('element not found', error);
}
/*tchfl banner anyaltics call END */

/* tchfl feature quicklinks box anyaltics call START */
try {
    var clickBtnTargetList = $('.feature-quicklinks-box .feature-quicklinks-row .btn-controls .links-wrap a');
    clickBtnTargetList.each(function (ind, ele) {
        $(ele).click(function (e) {
            if ($(this).parents('.feature-quicklinks-box').hasClass('feature-quicklinks-box')) {
                var ctaText = $(this).text().trim();
                var componentName = 'feature quicklinks box';
                var ctaTitle = $(this).parents('.feature-quicklinks-row').find('h3').text().trim();
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)
            }
        })
    })
} catch (error) {
    console.log('element not found', error);
}
/* tchfl feature quicklinks box anyaltics call END */



/* sub nav anyaltics call START */
try {
    /* mobile START */
    var subnavMobLink = $('.sub-nav .overview-top-space .mob-overviews-accodian a');
    $(subnavMobLink).each(function (ind, ele) {
        $(ele).click(function (e) {
            if ($(this).parents('.overviews-tab-box').hasClass('overviews-tab-box') && $(this).parents('.mob-overviews-accodian').hasClass('mob-overviews-accodian')) {
                var menuLinkText = $(this).text().trim();
                var componentName = window.location.href.split('/').pop().split('.').shift();
                var menuTitle = 'sub navigation';
                submenuClick(menuLinkText, componentName, menuTitle, productCodeId)
            }
        })
    })
    /* mobile END */
} catch (error) {
    console.log('element not found', error)
}
/* sub nav anyaltics call END */

/* slider tab call START */
try {
    var sliderTabList = $('.slider-tab .new-tabs-outers .tabs-row a');
    $(sliderTabList).each(function (ind, ele) {
        $(ele).click(function (e) {
            if ($(this).parents('.slider-tab').hasClass('slider-tab')) {
                var menuLinkText = $(this).text().trim();
                var componentName = $(this).parents('.slider-tab').prev()
                    ? $($(this).parents('.slider-tab').prev().find('.overviews-link > li.active')[0]).text().trim()
                    : 'Self Service';
                var menuTitle = $(this).parents('.slider-tab').prop('classList')[0].split('-').join(' ')
                submenuClick(menuLinkText, componentName, menuTitle, productCodeId);
            }
        })
    })

} catch (error) {
    console.log('element not found', error)
}

/* slider tab call END */

/* contact us information box call START */
try {
    var contactInfBoxList = $('.contact-info-box .contact-info-bottom a');
    $(contactInfBoxList).each(function (ind, ele) {
        $(ele).click(function (e) {
            if ($(this).parents('.contact-info-box').hasClass('contact-info-box')) {
                var ctaText = $(this).text().trim();
                var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('.heading20').innerText.trim();
                var componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)
            }
        })
    })
} catch (error) {
    console.log('element not found', error)
}
/* contact us information box call END */

/* header top section download now call START */
try {
    var headerTopSliderItem = $('.tchfl-header .header-top .header-top-slider .slider-item a');
    headerTopSliderItem.each(function (ind, ele) {
        $(ele).click(function (e) {
            if ($(this).parents('.tchfl-header').hasClass('tchfl-header')) {
                var ctaText = $(this).text().trim();
                var ctaTitle = 'Header Top Section';
                var componentName = 'headerAnalyticData';
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)
            }
        })
    })
} catch (error) {
    console.log('element not found', error)
}
/* header top section download now call END */

// 21-06-2023

// board of directors analytics START
var keyPeopleArrowLinks = document.querySelectorAll('.key-people .key-people-bottom .link-with-arrow');
keyPeopleArrowLinks.forEach(function (keyPeopleArrowLink) {
    keyPeopleArrowLink.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim();
            var componentName = '';
            var parentElement = getParentElement(e.currentTarget, 11);
            if (parentElement && parentElement.previousElementSibling) {
                var componentTitleElement = parentElement.previousElementSibling.querySelector('.component-title');
                if (componentTitleElement && componentTitleElement.classList.contains('component-title')) {
                    componentName = getParentElement(e.currentTarget, 11).previousElementSibling.querySelector('.component-title').innerText.replace(/\s+/g, ' ').trim();
                } else {
                    componentName = getParentElement(e.currentTarget, 3).classList[0].split('-').join(' ');
                }
            } else {
                componentName = getParentElement(e.currentTarget, 3).classList[0].split('-').join(' ');
            }
            var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('.key-people-top .heading20').innerText.trim();
            ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
        } catch (error) {
            console.log('element not found', error);
        }
    });
});
// board of directors analytics END

// custom board of directors analytics START
var bdBoxArrowLinks = document.querySelectorAll('.board-director-box .board-directors-right .link-with-arrow');
bdBoxArrowLinks.forEach(function (bdArrow) {
    bdArrow.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim();
            var componentName = '';
            var parentElement = getParentElement(e.currentTarget, 7);
            if (parentElement && parentElement.previousElementSibling && parentElement.previousElementSibling.classList.contains('component-title')) {
                componentName = getParentElement(e.currentTarget, 7).previousElementSibling.innerText.replace(/\s+/g, ' ').trim();
            } else {
                componentName = getParentElement(e.currentTarget, 7).classList[0].split('-').join(' ');
            }
            var ctaTitle = getParentElement(e.currentTarget, 3).querySelector('.directors-top .people-name').innerText.replace(/\s+/g, ' ').trim();
            ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
        } catch (error) {
            console.log('element not found', error);
        }
    })
})
// custom board of directors analytics END

// investor relation pdf analytics START
var investorRelPdfList = document.querySelectorAll('.tchfl-investor-relation-pdf .general-info-list li a');
investorRelPdfList.forEach(function (irPdf) {
    irPdf.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('.heading20').innerText.replace(/\s+/g, ' ').trim();
            var filterValue = getParentElement(e.currentTarget, 5).querySelector('.general-info-top .top-left a').innerText.replace(/\s+/g, ' ').trim();
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

// investor relation about product analytics START
var aboutParaLink = document.querySelectorAll('.about-product .personal-para a');
aboutParaLink.forEach(function (paraLink) {
    paraLink.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim();
            var parentElement = getParentElement(e.currentTarget, 4);
            if (parentElement && parentElement.querySelector('.main-heading')) {
                var ctaTitle = parentElement.querySelector('.main-heading').innerText.replace(/\s+/g, ' ').trim();
                var componentName = ctaTitle;
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
            } else {
                console.log('Parent element or .main-heading not found');
            }
        } catch (error) {
            console.log('element not found', error);
        }
    });
});
// investor relation about product analytics END

// reach out Officer analytics START
var reachoutOfficerList = document.querySelectorAll('.reach-out-officer a');
reachoutOfficerList.forEach(function (ele) {
    ele.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = '';
            var componentName = '';
            if (getParentElement(e.currentTarget, 6).classList.contains('nodal-officer-box')) {
                ctaTitle = getParentElement(e.currentTarget, 6).querySelector('.component-title').innerText.replace(/\s+/g, ' ').trim();
                componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
            } else if (getParentElement(e.currentTarget, 5).classList.contains('nodal-officer-box')) {
                ctaTitle = getParentElement(e.currentTarget, 2).querySelector('.heading20').innerText.replace(/\s+/g, ' ').trim();
                componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
            } else {
                console.log('Parent element or .nodal-officer-box not found');
            }
            ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
        } catch (error) {
            console.log('element not found', error);
        }
    });
});
// reach out Officer analytics END

// breadcrumb analytics START
var breadcrumbList = document.querySelectorAll('.cmp-breadcrumb__list li a');
if (breadcrumbList && breadcrumbList.length > 0) {
    breadcrumbList.forEach(function (element) {
        element.addEventListener('click', function (e) {
            try {
                var ctaText = e.currentTarget.innerText.trim();
                var componentName = getParentElement(e.currentTarget, 2).classList[0].split('-')[1].split('_')[0];
                var ctaTitle = '';
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)
            } catch (error) {
                console.log("breadcrumb element not found", error);
            }
        })

    })
}
// breadcrumb analytics END

// insurance plans right button analytics START
var insurancePlansBtnList = document.querySelectorAll('.insurance-plans .insurance-plans-right .rte a');
insurancePlansBtnList.forEach(function (irPdf) {
    irPdf.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = ''; 
            if (getParentElement(e.currentTarget, 2).previousElementSibling.classList.contains('component-title')) {
                ctaTitle = getParentElement(e.currentTarget, 2).previousElementSibling.innerText.replace(/\s+|:/g, ' ').trim();
            }
            var filterValue = '';
            var componentName = getParentElement(e.currentTarget, 7).querySelector('.tab-left .cmp-tabs__tab--active').innerText.replace(/\s+/g, ' ').trim();
            documentDownload(ctaText, ctaTitle, filterValue, componentName, productCodeId);
        } catch (error) {
            console.log('element not found', error);
        }
    });
});
// insurance plans right button analytics END

// customer greivances widget Interaction analytics START
var greivancesWidgetTabs = document.querySelectorAll('.consumer-finance-tabs .board-directors-left .jsTabSelect');
greivancesWidgetTabs.forEach(function (greivancesWidgetTab) {
    greivancesWidgetTab.addEventListener('click', function (e) {
        try {
            var widgetName = e.currentTarget.innerText.replace(/\s+|:/g, ' ').trim();
            var componentName = '';
            let parentElement = getParentElement(e.currentTarget, 5);
            let siblingElement = parentElement?.previousElementSibling;
            if (siblingElement?.classList.contains('about-us-dropdown-buttons')) {
                componentName = getParentElement(e.currentTarget, 5).previousElementSibling.querySelector('.jsDropdownBlock .tab-button.active').innerText.trim();
            } else {
                componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
            }
            widgetInteraction(widgetName, componentName);
        } catch (error) {
            console.log('element not found', error);
        }
    });
})
// customer greivances widget Interaction analytics END


// customer grievance raise complaint box anchors analytics START
var raiseComplaintAnchors = document.querySelectorAll('.board-director-box .raise-complaint-box a');
raiseComplaintAnchors.forEach(function (raiseComplaintAnchor) {
    raiseComplaintAnchor.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget, 6).querySelector('.board-directors-left .jsTabSelect.active').innerText.replace(/\s+|:/g, ' ').trim();
            var componentName = '';
            let parentElement = getParentElement(e.currentTarget, 9);
            let siblingElement = parentElement?.previousElementSibling;
            if (siblingElement?.classList.contains('about-us-dropdown-buttons')) {
                componentName = getParentElement(e.currentTarget, 9).previousElementSibling.querySelector('.jsDropdownBlock .tab-button.active').innerText.trim();
            } else {
                componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
            }
            ctaInteraction(ctaText, componentName, ctaTitle, productCodeId);
        } catch (error) {
            console.log('element not found', error);
        }
    });
});
// customer grievance raise complaint box anchors analytics END

// popular faq box content anchor analytics START
try {
    var popularFaq = $('.popular-faq-box .Self.Service .faq-body-inner a');
    $(popularFaq).each(function (ind, ele) {
        $(ele).click(function (e) {
            if ($(this).parents('.popular-faq').hasClass('accordion')) {
                var ctaText = $(this).text().trim();
                var ctaTitle =  $(this).parents('.cmp-accordion__item.faq-row').find('.cmp-accordion__header').text().trim();
                var componentName =  $(this).parents('.popular-faq-box').find('.tops-heads .component-title').text().replace(/\s+|:/g, ' ').trim();
                ctaInteraction(ctaText, componentName, ctaTitle, productCodeId)
            }
        })
    })
} catch (error) {
    console.log('element not found', error)
}
// popular faq box content anchor analytics END

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

//key features box anchor analytics START
var keyFeaturesCard = document.querySelectorAll('.key-features .instant-per-col a');
if (keyFeaturesCard && keyFeaturesCard.length > 0) {
    keyFeaturesCard.forEach(function (element) {
        element.addEventListener('click', function (e) {
            try {
                var ctaText = e.currentTarget.innerText.trim();
                var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('.heading20').innerText.trim();
                var componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
                ctaInteraction(ctaText,componentName,ctaTitle,productCodeId)
            } catch (error) {
                console.log("element not found", error);
            }
        })

    })
}
//key features box anchor analytics END

// key features card Insurance Offerings analytics START
var InsuranceOfferingsCard = document.querySelectorAll('.key-features .key-features-card .btn-blue');
InsuranceOfferingsCard.forEach(function (card) {
    card.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim();
            var ctaTitle = getParentElement(e.currentTarget,4).querySelector('.option-icon .heading20').innerText.trim();
            var componentName = getParentElement(e.currentTarget,9).querySelector('.component-title').innerText.replace(/\s+/g, ' ').trim();
            ctaInteraction(ctaText,componentName,ctaTitle,productCodeId)
        } catch (error) {
            console.log('element not found', error);
        }
    });
});
// key features card Insurance Offerings analytics END

// customer grievances tab analytics START
var custGrieTab = document.querySelectorAll('.about-us-dropdown-buttons .media-top-tabs .tab-button');
custGrieTab.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
        try {
            var ctaText = e.currentTarget.innerText.trim();
            var tabTitle = ctaText;
            var componentName = window.location.href.split('/').pop().split('.').shift().split('-').join(' ');
            tabInteraction(componentName, tabTitle, ctaText)
        } catch (error) {
            console.log('element not found', error);
        }
    });
});
// customer grievances tab analytics END