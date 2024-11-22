$(document).ready(function () {
    checkPropertyAssetsImg()
        .then(function (response) {
            createDetailsImage(response);
        })
        .catch(function (error) {
            console.log("Error !!!", error);
        });

    function formatAndSet(selector, value, isEmail, isMobile, isAmount) {
        const lowerValue = value.toLowerCase();
        if (lowerValue === '-' || lowerValue === 'na' || lowerValue === '') {
            $(selector).text('--');
        } else if (isEmail) {
            $(selector).attr('href', `mailto:${lowerValue}`);
        } else if (isMobile) {
            $(selector).attr('href', `tel:+91${lowerValue}`);
        } else if (isAmount) {
            const formattedAmount = Number(lowerValue).toLocaleString('en-IN');
            $(selector).html(`₹${formattedAmount}${isAmount ? '*' : ''}`);
        }
    }

    const selectorsValue = [
        { val: rmEmail, selector: '#rmEmail', isEmail: true },
        { val: rmMobile, selector: '#rmMobile', isMobile: true },
        { val: reservePrice, selector: '#reservePrice', isAmount: true },
        { val: marketValue, selector: '#marketValue', isAmount: true }
    ];

    selectorsValue.forEach(function (ele) {
        formatAndSet(ele.selector, ele.val, ele.isEmail, ele.isMobile, ele.isAmount);
    });
    
});

function checkPropertyAssetsImg() {
    return new Promise(function (resolve, reject) {
        var propertyAssetsImg = sessionStorage.getItem('propertyAssetImage');
        
        if (jsHelper.isDef(propertyAssetsImg) && !jsHelper.isEmpObj(propertyAssetsImg)) {
            var assetImg = JSON.parse(propertyAssetsImg);
            resolve(assetImg);
        } else {
            assetDisposalMisFilterObj.getAssetImageAPICall('/content/tata-capital/retailapi.propertyImage.json', 'GET')
                .then(function (response) {
                    var responseObj = (typeof (response) == 'object') ? response : JSON.parse(response);
                    resolve(responseObj);
                })
                .catch(function (error) {
                    reject(error);
                });
        }
    });
}



function createDetailsImage(data) {
    var propertyImgJson = data;
    try {
        var imgTotal = propertyImgJson[propertyId.trim()].count;
        if (imgTotal === 0){
            propertyImgJson["firstImg"] = "/content/dam/tata-capital/asset-disposal-new/genericasseticon.svg";
            propertyImgJson["no-image"] = true;
        }else{
            propertyImgJson["firstImg"] = "/content/dam/tata-capital/asset-disposal/" + propertyId.trim() + "/" + propertyImgJson[propertyId.trim()]["images"][0];
        }
        var renderPropertyImg = renderPropertyImgFn(propertyImgJson);
        $('#propertyImage').html(renderPropertyImg);
        $('#propertySliderImg').show();
        $('#propertySliderImg').html(imgTotal + ' Photos')
        var propertyViewDetailsBtn = document.getElementById('propertySliderImg');
        propertyViewDetailsBtn.addEventListener('click', deatilsShowPhotoPopup);
    } catch (error) {
        console.log(error)
        propertyImgJson["firstImg"] = "/content/dam/tata-capital/asset-disposal-new/genericasseticon.svg";
        propertyImgJson['no-image'] = true;
        var renderPropertyImg = renderPropertyImgFn(propertyImgJson);
        $('#propertyImage').html(renderPropertyImg);
        $('#propertySliderImg').hide();
    }

    /* generateBreadCrumbTemplateFn(); */
}

function deatilsShowPhotoPopup(event) {
    dealsData
    var currentId = event.currentTarget.dataset.id;
    var propertyAssetsDetails = JSON.parse(sessionStorage.getItem('propertyAssetImage'));
    var dealsData = JSON.parse(sessionStorage.getItem('disposalMisStateCityRes'));
    var currentData = dealsData.find(function (value) {
        return value["contract-no-"] == currentId;
    });

    $('#partnerSliderModal .heading20').text(currentData["property-name"]);
    $('#partnerSliderModal').addClass('popover-show').css('display', 'block');

    var itemTemplate = '';
    if (jsHelper.isDef(propertyAssetsDetails[currentId.trim()])) {
        propertyAssetsDetails[currentId.trim()].images.forEach(function (value) {
            var imagePath = "/content/dam/tata-capital/asset-disposal/" + currentId.trim() + "/" + value;
            itemTemplate += getItemTemplate(imagePath, currentData["property-name"]);
        });
    }

    initializeSlickSlider(itemTemplate);
}

function initializeSlickSlider(itemTemplate) {
    $('#viewMoreSlider').slick('unslick');
    $('#viewMoreSlider').html(itemTemplate);
    $('#viewMoreSlider').slick({
        dots: true,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 4000,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: '350px',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    centerPadding: '300px',
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    centerPadding: '250px',
                }
            },
            {
                breakpoint: 992,
                settings: {
                    centerPadding: '150px',
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerPadding: '70px',
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    centerPadding: '25px',
                    arrows: false
                }
            }
        ]
    });

    var $status = $('.sliderCounter');
    var $sliderTot = $('.sliderTotal');
    var $slickElement = $('#viewMoreSlider');

    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.text(i);
        $sliderTot.text('/' + slick.slideCount);
    });

    $('#viewMoreSlider').slick('refresh');
}


function renderPropertyImgFn(data) {
    var noImageClass = data['no-image'] ? 'no-image' : 'deal-img';
    var bgHeight = calculateBgHeight();

    var bigBgImage = $('<div class="big-media ' + noImageClass + '">' +
        '<a href="javascript:void(0)" data-id="' + propertyId + '" id="propertySliderImg" class="total-pic" data-popovermodal="popover-modal" data-target="#partnerSliderModal">8 Photos</a>' +
        '</div>');

    bigBgImage.css({
        backgroundImage: "url('" + data['firstImg'] + "')",
        backgroundSize: "600px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        maxHeight: + 'px',
        height: bgHeight + 'px',
        borderRadius: '30px'
    });

    $('.big-media').replaceWith(bigBgImage);
    return bigBgImage;
}

function calculateBgHeight() {
    var windowWidth = $(window).width();
    if (windowWidth < 768) {
        return 240;
    } else if (windowWidth <= 1024) {
        return 475;
    } else {
        return $('.property-row-right').height();
    }
}

/* function generateBreadCrumbTemplateFn() {
    if (jsHelper.isDef(sessionStorage.getItem('breadcrumbPage'))) {
        var breadCrumbString = sessionStorage.getItem('breadcrumbPage') + propertyName;
        var urlObj = {
            "Home": "/content/tata-capital-web/en/property-disposal.html",
            "Property Disposal Listing": "/content/tata-capital-web/en/property-disposal/property-listing.html"
        }
        $('.cmp-breadcrumb__list').html('');
        createBreadCrumbTemplateStr = '';
        breadCrumbString.split('|').forEach(function (value, index) {
            var url = (index == breadCrumbString.split('|').length - 1) ? location.href : urlObj[value];
            createBreadCrumbTemplateStr += createBreadCrumb(value, url);
        })
        $('.cmp-breadcrumb__list').html(createBreadCrumbTemplateStr);
    }
}

function createBreadCrumb(value, url) {
    if (value == propertyName) {
        return '<li class="item active" > ' + value + '</li>';
    } else {
        return '<li class="item"><a href="' + url + '">' + value + '</a></li>';
    }
} */