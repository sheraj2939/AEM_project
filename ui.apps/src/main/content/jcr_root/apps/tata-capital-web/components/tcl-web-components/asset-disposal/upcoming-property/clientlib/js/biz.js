var apiData;
var cardImg;


$(document).ready(function () {
    var reqObj = {};
    assetDisposalMisFilterObj.assetDisposalMis(reqObj).then(function (response) {
        apiData = (typeof (response.response) == 'object') ? response.response.Master : JSON.parse(response.response).Master;
        assetDisposalMisFilterObj.getAssetImageAPICall('/content/tata-capital/retailapi.propertyImage.json', 'GET').then(function (response) {
            cardImg = (typeof (response) == 'object') ? response : JSON.parse(response);
            upcomingPropertiesCards(apiData, cardImg);
            // console.log(apiData);
        })
    });

})

function getItemTemplate(imagePath, propertyName) {

    var itemTemplateStr = '<div class="more-slider-row">' +
        '<div class="more-slider-caption">' +
        '<p class="heading20">' + propertyName + '</p>' +
        '<div class="view-more-total"><span class="sliderCounter"></span><span class="sliderTotal"></span></div>' +
        '</div>' +
        '<div class="more-slider-image">' +
        '<img src="' + imagePath + '" alt="">' +
        '</div>' +
        '</div>';
    return itemTemplateStr;
}

function upcomingPropertiesCards(cards, cardImages) {
    var propertyCardHtml = "";
    var noImageFlag = '';
    var imageClass = '';
    var filterUniqueContracts = findUniqueContractsAndLogDuplicates(cards)
    if (filterUniqueContracts.length > 0) {
        filterUniqueContracts.forEach(function (e, i) {
            if (e['upcoming-properties'] == 'TRUE') {
                var contractsNum = e['contract-no-'];
                var bhkValue = "";
                e["bhk"] == "NA" ? bhkValue = '' : bhkValue = '<strong>' + e["bhk"] + '</strong>';
                if (cardImages[contractsNum]) {

                    if (cardImages[contractsNum].count === 0) {
                        var imgCount = '';
                        var propertyImage = "/content/dam/tata-capital/asset-disposal-new/genericasseticon.svg";
                        noImageFlag = true;
                    } else {
                        var imgObj = cardImages[contractsNum].images;
                        var imgCount = '<a href="javascript:void(0)" class="total-pic"  data-idupcoming="' + e["contract-no-"] + '">' + cardImages[contractsNum].count + ' Photos</a>';
                        var propertyImage = '/content/dam/tata-capital/asset-disposal/' + contractsNum + '/' + imgObj[0];
                        noImageFlag = false;
                    }


                } else {
                    var imgCount = '';
                    var propertyImage = "/content/dam/tata-capital/asset-disposal-new/genericasseticon.svg";
                    noImageFlag = true;
                }

                const encodeURL = (url) => {
                    return url.split('/').map(encodeURIComponent).join('/');
                };
                const encodedImageUrl = propertyImage ? encodeURL(propertyImage) : '';
                const backgroundImageStyle = encodedImageUrl
                    ? `background: center / cover no-repeat url(${encodedImageUrl}), 35%; height: 160px; background-size: 450px; border-radius: 20px;`
                    : '';

                (noImageFlag == true) ? imageClass = 'no-image' : imageClass = 'deal-img';

                if (e["non-sarfaesi"].toLowerCase() == "yes") {
                    propertyCardHtml += '<div class="deal-col js-similar-list"><div class="bg-div deal-div deal-negotiable-card"><div class="deal-img-out ' + imageClass + '" style="' + backgroundImageStyle + '" >' + imgCount + '</div><p class="text14i deal-resident">' + e["property-type"] + '</p><p class="heading20 deal-name semibold">' + e["property-name"].split(',')[0] + ', <span class="deal-name-sub"> ' + e["location"] + '</span></p><p class="deal-flats text16"> ' + bhkValue + '<span class="deal-flats-size">' + e["area-in-sq-ft"] + 'sq.ft. (SBU)</span></p><div class="deal-move"><span class="all-icon24 icon-google"></span><p class="text14i">' + e['construction-stage'] + '</p></div><div class="deal-prices"><p class="heading24 bold deal-price-text text-gray">Negotiable price*</p></div><div class="deal-btn-more"><a data-linkupcomping = ' + e["contract-no-"] + ' class="btn-blue btn-large w-100">Know More</a></div></div></div> </div>'
                }
                else if (e["discount-"] == "0%") {
                    propertyCardHtml += '<div class="deal-col"> <div class="bg-div deal-div"> <div class="deal-img-out ' + imageClass + '" style="' + backgroundImageStyle + '">' + imgCount + '</div><p class="text14i deal-resident">' + e["property-type"] + '</p><p class="heading20 deal-name semibold">' + e["property-name"].split(',')[0] + ', <span class="deal-name-sub"> ' + e["location"] + '</span></p><p class="deal-flats text16">' + bhkValue + '<span class="deal-flats-size">' + e["area-in-sq-ft"] + ' sq.ft. (SBU)</span></p><div class="deal-move"> <span class="all-icon24 icon-google"></span> <p class="text14i">' + e['construction-stage'] + '</p></div><div class="deal-discount"> </div><div class="deal-prices"> <p class="heading24 bold deal-price-text">₹' + Number(e["market-value"]).toLocaleString('en-IN') + '</p></div><div class="deal-btn-more"> <a data-linkupcomping = ' + e["contract-no-"] + ' class="btn-blue btn-large w-100">Know More</a> </div></div></div>'
                } else {
                    propertyCardHtml += '<div class="deal-col"> <div class="bg-div deal-div"> <div class="deal-img-out ' + imageClass + '" style="' + backgroundImageStyle + '">' + imgCount + '</div><p class="text14i deal-resident">' + e["property-type"] + '</p><p class="heading20 deal-name semibold">' + e["property-name"].split(',')[0] + ', <span class="deal-name-sub"> ' + e["location"] + '</span></p><p class="deal-flats text16">' + bhkValue + '<span class="deal-flats-size">' + e["area-in-sq-ft"] + ' sq.ft. (SBU)</span></p><div class="deal-move"> <span class="all-icon24 icon-google"></span> <p class="text14i">' + e['construction-stage'] + '</p></div><div class="deal-discount"> <span class="deal-dis-count">Price ' + Math.abs(e["discount-"].split('%')[0]) + '% off</span> </div><div class="deal-prices"> <p class="heading24 bold deal-price-text">₹' + Number(e["reserve-price"]).toLocaleString('en-IN') + '</p><p class="deal-price-discount">₹' + Number(e["market-value"]).toLocaleString('en-IN') + '</p></div><div class="deal-btn-more"> <a data-linkupcomping = ' + e["contract-no-"] + ' class="btn-blue btn-large w-100">Know More</a> </div></div></div>'
                }
                $('#upcomingProperties').html(propertyCardHtml);
                propertyMorePhotosClick()
                propertyKnowMoreBtn()
            }
        });
    } else {
        propertyCardHtml += '<div class="mx-944" style="margin-top: 30px;"> <div class="bg-div property-nosearch-found"> <img src="/content/dam/tata-capital/asset-disposal-new/no-found.svg" alt="" class="no-found-img"> <p class="heading20 semibold">No properties found</p><p class="text16i">We could not find any deals on properties for the city selected</p></div></div>'
        $('#upcomingProperties').html(propertyCardHtml);
    }
    /*similar properties 7-7-2023*/
    if ($('.upcoming-properties-list').find('.js-similar-list').length < 6) {
        $('.upcoming-properties-list').siblings('.similar-properties-btn').addClass('d-none');
    } else {
        $('.upcoming-properties-list .js-similar-list').slice(0, 6).show();
        $("#jsLoadMoreProperties").on('click', function (e) {
            e.preventDefault();
            $(".upcoming-properties-list .js-similar-list:hidden").slice(0, 3).fadeIn();
            if ($(".upcoming-properties-list .js-similar-list:hidden").length == 0) {
                $("#jsLoadLessProperties").removeClass('d-none').fadeIn('slow');
                $("#jsLoadMoreProperties").hide();
            }
        });
        $("#jsLoadLessProperties").on('click', function (e) {
            e.preventDefault();
            $('.upcoming-properties-list .js-similar-list:not(:lt(6))').fadeOut();
            $("#jsLoadMoreProperties").fadeIn('slow');
            $("#jsLoadLessProperties").hide();
        });
    }
    /*similar properties 7-7-2023*/

}

function propertyMorePhotosClick() {
    var photosBtnArr = document.querySelectorAll('a[data-idupcoming]');
    photosBtnArr.forEach(function (element) {
        element.addEventListener('click', propertiesShowPopup);
    });
}

function propertiesShowPopup(event) {
    var currentId = event.currentTarget.dataset.idupcoming;
    var propertyAssetsDetails = cardImg;
    var dealsData = apiData;
    var currentData = dealsData.filter(function (value) {
        return value["contract-no-"] == currentId;
    })[0];
    $('#partnerSliderModal .heading20').text(currentData["property-name"]);
    $('#partnerSliderModal').addClass('popover-show');
    $('#partnerSliderModal').css('display', 'block');

    var itemTemplate = '';
    if (jsHelper.isDef(propertyAssetsDetails[currentId])) {
        propertyAssetsDetails[currentId].images.forEach(function (value) {
            var imagePath = "/content/dam/tata-capital/asset-disposal/" + currentId + "/" + value;
            itemTemplate += getItemTemplate(imagePath, currentData["property-name"]);
        });
    }

    $('#viewMoreSlider').slick('unslick');

    $('#viewMoreSlider').html(itemTemplate);

    $('#viewMoreSlider').not('.slick-initialized').slick({
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

function propertyKnowMoreBtn() {

    $('[data-linkupcomping]').on('click', function (event) {
        var propertyId = event.currentTarget.dataset.linkupcomping;
          // Asset Disposal Upcoming Properties Know More Analytics START
          try{
            var city=getParentElement(event.currentTarget,2).querySelector('.deal-name .deal-name-sub').innerText.trim();
            if(getParentElement(event.currentTarget,8).classList.contains('similar-properties'))
            {
                var ctaTitle=getParentElement(event.currentTarget,6).querySelector('.tops-heads h2').innerText.trim();
                var componentName=getParentElement(event.currentTarget,6).querySelector('.tops-heads h2').innerText.trim()+' box';
            }
            else
            {
                var ctaTitle=getParentElement(event.currentTarget,7).querySelector('ul.tab-btn-group li.tab-item a.active').innerText.trim();
                var componentName=getParentElement(event.currentTarget,7).querySelector('ul.tab-btn-group li.tab-item a.active').innerText.trim()+' box';
            }
            knowmorebuttonClick(city,componentName,ctaTitle,propertyId);
}catch(error){
    console.log("element not found",error);
}
// Asset Disposal Upcoming Properties Know More Analytics END
        propertyListKnowRedirection(propertyId);
    })
}

function propertyListKnowRedirection(propertyId) {
    var dealsData = apiData;
    sessionStorage.setItem('breadcrumbPage', 'Home|');
    sessionStorage.setItem('propertyAssetImage', JSON.stringify(cardImg));
    if (!jsHelper.isDef(sessionStorage.getItem('propertyAssetImage'))) {
        sessionStorage.setItem('propertyAssetImage', JSON.stringify(cardImg))
    }
    var filterData = dealsData.filter(function (value, index) {
        return value["contract-no-"] == propertyId;
    });

    var sateCity = dealsData.filter(function (element) {
        if ((filterData[0].state).toLowerCase() == (element.state).toLowerCase() && (filterData[0].location).toLowerCase() == (element.location).toLowerCase()) {
            return element
        }
    })
    var propertyType = [];
    sateCity.map(function (e) {
        if (propertyType.every(function (sc) { return sc != e['property-type'] })) {
            propertyType.push(e['property-type']);
        }
    })
    var storeObj = {};
    storeObj['state'] = filterData[0].state;
    storeObj['city'] = filterData[0].location;
    storeObj['property'] = propertyType;
    sessionStorage.setItem('selectedStateCityProperty', JSON.stringify(storeObj))
    sessionStorage.setItem('disposalMisStateCityRes', JSON.stringify(sateCity));
    sessionStorage.setItem('stateCityAllProperty', JSON.stringify(propertyType))

    var filterDataSlider = sessionStorage.getItem('filterData');
    if (filterDataSlider === null) {
        var filterObj = {
            "inputbugetFrom": "1",
            "inputbugetTo": "1000",
            "propertyType": propertyType,
            "rooms": roomArr,
            "minArea": "1",
            "maxArea": "50000"
        }
        sessionStorage.setItem('filterData', JSON.stringify(filterObj));
        assetDisposalOrganizeData(responseAssetDisopsal)
    }

    var propertyName = getSnakeCase(filterData[0]["property-name"]);
    var pageName = propertyName + '-' + propertyId + '.html';
    location.href = "/content/tata-capital-web/en/property-disposal/property-listing/" + pageName.toLowerCase();

}