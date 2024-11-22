var hotDealsData = [];
var getAssetImg;
var responseAssetDisopsal;
(function (_global) {
    var assetDisposalMisHotDealsBizObj = {}
    var assetDisposalMisHotDealsBizCallFn = (function (jsHelper) {
        document.addEventListener('DOMContentLoaded', function () {
            propertyCardPopulateAccordingCity("mumbai");
            cityClickFunction();

        });

        function propertyCardPopulateAccordingCity(cityName) {
            if (cityName) {
                var reqObj = {};
                assetDisposalMisHotDealsFilterObj.assetDisposalMisHotDeals(reqObj).then(function (response) {
                    responseAssetDisopsal = (typeof (response.response) == 'object') ? response.response : JSON.parse(response.response);

                    /******* asset disposal image api call and store session storage *******/
                    assetDisposalMisFilterObj.getAssetImageAPICall('/content/tata-capital/retailapi.propertyImage.json', 'GET').then(function (response) {
                        getAssetImg = (typeof (response) == 'object') ? response : JSON.parse(response);
                        createHotDealCardsTemplate(cityName, responseAssetDisopsal, getAssetImg)
                    });
                    /******* asset disposal image api call and store session storage *******/

                }).catch(function (error) { });
            }
        }

        function createHotDealCardsTemplate(cityName, response, getAssetImg) {

            var propertyCardHtml = "";
            var noImageClass = '';
            var arrIdentifier = $('.tab-button.js-tabClick.active').attr('data-menu')
            var arrJson = response.Master
            var filterUniqueContracts = findUniqueContractsAndLogDuplicates(arrJson)
            var filterUpcoming = filterNonUpcomingProperties(filterUniqueContracts)
            if (filterUpcoming.length > 0) {
                filterUpcoming.forEach(function (e, i) {
                    if (e['location'].toLowerCase() == arrIdentifier && e['properties-for-hot-deal-section'].toLowerCase() == "yes") {
                        hotDealsData.push(e);
                        /***** asset image condition *******/
                        if (jsHelper.isDef(getAssetImg[e["contract-no-"]])) {
                            var totalCount = getAssetImg[e["contract-no-"]].count;
                            if (totalCount === 0){
                                e["firstImg"] = "/content/dam/tata-capital/asset-disposal-new/genericasseticon.svg";
                                e["no-image"] = true;
                            }else{
                                e["total"] = totalCount;
                                e["firstImg"] = "/content/dam/tata-capital/asset-disposal/" + e["contract-no-"] + "/" + getAssetImg[e["contract-no-"]]["images"][0];
                            }
                        } else {
                            e["firstImg"] = "/content/dam/tata-capital/asset-disposal-new/genericasseticon.svg";
                            e['no-image'] = true;
                        }

                        (e['no-image'] == true) ? noImageClass = 'no-image' : noImageClass = 'deal-img';

                        const encodeURL = (url) => {
                            return url.split('/').map(encodeURIComponent).join('/');
                        };
                        const imageUrl = e['firstImg'] ? encodeURL(e['firstImg']) : '';

                        const backgroundImageStyle = imageUrl
                        ? `background: center / cover no-repeat url(${imageUrl}), 35%; height: 175px; background-size: 450px; border-radius: 20px;`
                        : '';
                        /***** asset image condition *******/
                        console.log(e);
                        if (e["non-sarfaesi"].toLowerCase() == "yes") {
                            propertyCardHtml += '<div class="deal-col"> <div class="bg-div deal-div"> <div class="deal-img-out '+noImageClass+'" style="'+backgroundImageStyle+'"> ';
                            if (e.total) { propertyCardHtml += '<a href="javascript:void(0)" class="total-pic" data-popovermodal="popover-modal" data-target="#partnerSliderModal"  data-hotdealsid="' + e["contract-no-"] + '">' + e.total + ' Photos</a>'; }
                            propertyCardHtml += '</div><p class="text14i deal-resident">' + e["property-type"] + '</p><p class="heading20 deal-name semibold">' + e["property-name"].split(',')[0] + ', <span class="deal-name-sub">' + e["property-name"].split(',')[1] + '</span></p><p class="deal-flats text16"><strong>' + e["bhk"] + '</strong><span class="deal-flats-size">' + e["area-in-sq-ft"] + ' sq.ft. (SBU)</span></p><div class="deal-move"> <span class="all-icon24 icon-google"></span> <p class="text14i">' + e["construction-stage"] + '</p></div><div class="deal-prices"><p class="heading24 bold deal-price-text text-gray">Negotiable price*</p></div><div class="deal-btn-more"> <button class="btn-blue btn-large w-100" data-link="' + e["contract-no-"] + '" onClick="cardKnowMoreClick(event)">Know More</button> </div></div></div>';
                        } else if (e["discount-"] == "0%") {
                            propertyCardHtml += '<div class="deal-col"> <div class="bg-div deal-div"> <div class="deal-img-out '+noImageClass+'" style="'+backgroundImageStyle+'"> ';
                            if (e.total) { propertyCardHtml += '<a href="javascript:void(0)" class="total-pic" data-popovermodal="popover-modal" data-target="#partnerSliderModal"  data-hotdealsid="' + e["contract-no-"] + '">' + e.total + ' Photos</a>'; }
                            propertyCardHtml += '</div><p class="text14i deal-resident">' + e["property-type"] + '</p><p class="heading20 deal-name semibold">' + e["property-name"].split(',')[0] + ', <span class="deal-name-sub">' + e["property-name"].split(',')[1] + '</span></p><p class="deal-flats text16"><strong>' + e["bhk"] + '</strong><span class="deal-flats-size">' + e["area-in-sq-ft"] + ' sq.ft. (SBU)</span></p><div class="deal-move"> <span class="all-icon24 icon-google"></span> <p class="text14i">' + e["construction-stage"] + '</p></div><div class="deal-discount"> <span class="deal-dis-count">' + + '</span> </div><div class="deal-prices"> <p class="heading24 bold deal-price-text">₹' + Number(e["market-value"]).toLocaleString('en-IN') + '</p></div><div class="deal-btn-more"> <button class="btn-blue btn-large w-100" data-link="' + e["contract-no-"] + '" onClick="cardKnowMoreClick(event)">Know More</button> </div></div></div>';
                        } else {
                            propertyCardHtml += '<div class="deal-col"> <div class="bg-div deal-div"> <div class="deal-img-out '+noImageClass+'" style="'+backgroundImageStyle+'"> ';
                            if (e.total) { propertyCardHtml += '<a href="javascript:void(0)" class="total-pic" data-popovermodal="popover-modal" data-target="#partnerSliderModal"  data-hotdealsid="' + e["contract-no-"] + '">' + e.total + ' Photos</a>'; }
                            propertyCardHtml += '</div><p class="text14i deal-resident">' + e["property-type"] + '</p><p class="heading20 deal-name semibold">' + e["property-name"].split(',')[0] + ', <span class="deal-name-sub">' + e["property-name"].split(',')[1] + '</span></p><p class="deal-flats text16"><strong>' + e["bhk"] + '</strong><span class="deal-flats-size">' + e["area-in-sq-ft"] + ' sq.ft. (SBU)</span></p><div class="deal-move"> <span class="all-icon24 icon-google"></span> <p class="text14i">' + e["construction-stage"] + '</p></div><div class="deal-discount"> <span class="deal-dis-count">Price ' + Math.abs(e["discount-"].split('%')[0]) + '% off</span> </div><div class="deal-prices"> <p class="heading24 bold deal-price-text">₹' + Number(e["reserve-price"]).toLocaleString('en-IN') + '</p><p class="deal-price-discount">₹' + Number(e["market-value"]).toLocaleString('en-IN') + '</p></div><div class="deal-btn-more"> <button class="btn-blue btn-large w-100" data-link="' + e["contract-no-"] + '" onClick="cardKnowMoreClick(event)">Know More</button> </div></div></div>';
                        }
                    }
                });
                if (propertyCardHtml.length > 0) {
                    $('[data-content=' + arrIdentifier + ']').html('<div class="deal-row">' + propertyCardHtml + '</div>');
                } else {
                    $('[data-content=' + arrIdentifier + ']').html('<div class="mx-944"> <div class="bg-div property-nosearch-found"> <img src="/content/dam/tata-capital/asset-disposal-new/no-found.svg" alt="" class="no-found-img"> <p class="heading20 semibold">No properties found</p><p class="text16i">We could not find any deals on properties for the city selected</p></div></div>');
                }

                cardsPhotosClick();

            } else {
                $('[data-content=' + arrIdentifier + ']').html('<div class="mx-944"> <div class="bg-div property-nosearch-found"> <img src="/content/dam/tata-capital/asset-disposal-new/no-found.svg" alt="" class="no-found-img"> <p class="heading20 semibold">No properties found</p><p class="text16i">We could not find any deals on properties for the city selected</p></div></div>');
            }
        }

        function cityClickFunction() {
            $('.tab-button.js-tabClick').click(function (ele) {

                var propertyCardHtml = "";
                var noImageClass = '';
                var arrIdentifier = ele.currentTarget.dataset.menu;
                var arrJson = responseAssetDisopsal.Master
                console.log(getAssetImg)
                var filterUniqueContracts = findUniqueContractsAndLogDuplicates(arrJson)
                var filterUpcoming = filterNonUpcomingProperties(filterUniqueContracts)

                if (filterUpcoming.length > 0) {
                    filterUpcoming.forEach(function (e, i) {
                        if (e['location'].toLowerCase() == arrIdentifier && e['properties-for-hot-deal-section'].toLowerCase() == "yes") {
                            hotDealsData.push(e);
                            /***** asset image condition *******/
                            if (jsHelper.isDef(getAssetImg[e["contract-no-"]])) {
                                var totalCount = getAssetImg[e["contract-no-"]].count;
                                e["total"] = totalCount;
                                e["firstImg"] = "/content/dam/tata-capital/asset-disposal/" + e["contract-no-"] + "/" + getAssetImg[e["contract-no-"]]["images"][0];
                            } else {
                                e["firstImg"] = "/content/dam/tata-capital/asset-disposal-new/genericasseticon.svg";
                                e['no-image'] = true;
                            }

                            (e['no-image'] == true) ? noImageClass = 'no-image' : noImageClass = 'deal-img';

                            const backgroundImageStyle = e['firstImg']
                            ? `background: center / cover no-repeat url(${e['firstImg']}), 35%;height: 175px;background-size: 450px;border-radius: 20px;`
                            : '';

                            /***** asset image condition *******/
                            console.log(e);
                            if (e["non-sarfaesi"].toLowerCase() == "yes") {
                                propertyCardHtml += '<div class="deal-col"> <div class="bg-div deal-div"> <div class="deal-img-out '+noImageClass+'" style="'+backgroundImageStyle+'"> ';
                                if (e.total) { propertyCardHtml += '<a href="javascript:void(0)" class="total-pic" data-popovermodal="popover-modal" data-target="#partnerSliderModal"  data-hotdealsid="' + e["contract-no-"] + '">' + e.total + ' Photos</a>'; }
                                propertyCardHtml += '</div><p class="text14i deal-resident">' + e["property-type"] + '</p><p class="heading20 deal-name semibold">' + e["property-name"].split(',')[0] + ', <span class="deal-name-sub">' + e["property-name"].split(',')[1] + '</span></p><p class="deal-flats text16"><strong>' + e["bhk"] + '</strong><span class="deal-flats-size">' + e["area-in-sq-ft"] + ' sq.ft. (SBU)</span></p><div class="deal-move"> <span class="all-icon24 icon-google"></span> <p class="text14i">' + e["construction-stage"] + '</p></div><div class="deal-prices"><p class="heading24 bold deal-price-text text-gray">Negotiable price*</p></div><div class="deal-btn-more"> <button class="btn-blue btn-large w-100" data-link="' + e["contract-no-"] + '" onClick="cardKnowMoreClick(event)">Know More</button> </div></div></div>';

                            } else if (e["discount-"] == "0%") {
                                propertyCardHtml += '<div class="deal-col"> <div class="bg-div deal-div"> <div class="deal-img-out '+noImageClass+'" style="'+backgroundImageStyle+'"> ';
                                if (e.total) { propertyCardHtml += '<a href="javascript:void(0)" class="total-pic" data-popovermodal="popover-modal" data-target="#partnerSliderModal"  data-hotdealsid="' + e["contract-no-"] + '">' + e.total + ' Photos</a>'; }
                                propertyCardHtml += '</div><p class="text14i deal-resident">' + e["property-type"] + '</p><p class="heading20 deal-name semibold">' + e["property-name"].split(',')[0] + ', <span class="deal-name-sub">' + e["property-name"].split(',')[1] + '</span></p><p class="deal-flats text16"><strong>' + e["bhk"] + '</strong><span class="deal-flats-size">' + e["area-in-sq-ft"] + ' sq.ft. (SBU)</span></p><div class="deal-move"> <span class="all-icon24 icon-google"></span> <p class="text14i">' + e["construction-stage"] + '</p></div><div class="deal-discount"> <span class="deal-dis-count">' + + '</span> </div><div class="deal-prices"> <p class="heading24 bold deal-price-text">₹' + Number(e["market-value"]).toLocaleString('en-IN') + '</p></div><div class="deal-btn-more"> <button class="btn-blue btn-large w-100" data-link="' + e["contract-no-"] + '" onClick="cardKnowMoreClick(event)">Know More</button> </div></div></div>';

                            } else {
                                propertyCardHtml += '<div class="deal-col"> <div class="bg-div deal-div"> <div class="deal-img-out '+noImageClass+'" style="'+backgroundImageStyle+'"> ';
                                if (e.total) { propertyCardHtml += '<a href="javascript:void(0)" class="total-pic" data-popovermodal="popover-modal" data-target="#partnerSliderModal"  data-hotdealsid="' + e["contract-no-"] + '">' + e.total + ' Photos</a>'; }
                                propertyCardHtml += '</div><p class="text14i deal-resident">' + e["property-type"] + '</p><p class="heading20 deal-name semibold">' + e["property-name"].split(',')[0] + ', <span class="deal-name-sub">' + e["property-name"].split(',')[1] + '</span></p><p class="deal-flats text16"><strong>' + e["bhk"] + '</strong><span class="deal-flats-size">' + e["area-in-sq-ft"] + ' sq.ft. (SBU)</span></p><div class="deal-move"> <span class="all-icon24 icon-google"></span> <p class="text14i">' + e["construction-stage"] + '</p></div><div class="deal-discount"> <span class="deal-dis-count">Price ' + Math.abs(e["discount-"].split('%')[0]) + '% off</span> </div><div class="deal-prices"> <p class="heading24 bold deal-price-text">₹' + Number(e["reserve-price"]).toLocaleString('en-IN') + '</p><p class="deal-price-discount">₹' + Number(e["market-value"]).toLocaleString('en-IN') + '</p></div><div class="deal-btn-more"> <button class="btn-blue btn-large w-100" data-link="' + e["contract-no-"] + '" onClick="cardKnowMoreClick(event)">Know More</button> </div></div></div>';

                            }
                        }
                    });
                    if (propertyCardHtml.length > 0) {
                        $('[data-content=' + arrIdentifier + ']').html('<div class="deal-row">' + propertyCardHtml + '</div>');
                    } else {
                        $('[data-content=' + arrIdentifier + ']').html('<div class="mx-944"> <div class="bg-div property-nosearch-found"> <img src="/content/dam/tata-capital/asset-disposal-new/no-found.svg" alt="" class="no-found-img"> <p class="heading20 semibold">No properties found</p><p class="text16i">We could not find any deals on properties for the city selected</p></div></div>');
                    }

                    cardsPhotosClick();

                } else {
                    $('[data-content=' + arrIdentifier + ']').html('<div class="mx-944"> <div class="bg-div property-nosearch-found"> <img src="/content/dam/tata-capital/asset-disposal-new/no-found.svg" alt="" class="no-found-img"> <p class="heading20 semibold">No properties found</p><p class="text16i">We could not find any deals on properties for the city selected</p></div></div>');
                }
            });
        }

        /*********** hot delas card photo click function *******/
        function cardsPhotosClick() {
            var photosBtnArr = document.querySelectorAll('a[data-hotdealsid]');
            photosBtnArr.forEach(function (element) {
                element.addEventListener('click', showPhotoPopupSlider);
            });
        }

        /*********** hot deals card photo click slider image render logic ********/
        function showPhotoPopupSlider(event) {
            var currentId = event.currentTarget.dataset.hotdealsid;
            var propertyAssetsDetails = getAssetImg
            var dealsData = hotDealsData
            var currentData = dealsData.filter(function (value) {
                return value["contract-no-"] == currentId;
            })[0];

            $('#partnerSliderModal .heading20').text(currentData["property-name"]);
            $('#partnerSliderModal').addClass('popover-show');
            $('#partnerSliderModal').css('display', 'block');

            var cardPopupImage = '';
            if (jsHelper.isDef(propertyAssetsDetails[currentId.toLowerCase()])) {
                propertyAssetsDetails[currentId.toLowerCase()].images.forEach(function (value) {
                    var imagePath = "/content/dam/tata-capital/asset-disposal/" + currentId.toLowerCase() + "/" + value;
                    cardPopupImage += getItemTemplate(imagePath, currentData["property-name"]);
                });
            }

            $('#viewMoreSlider').slick('unslick');
            $('#viewMoreSlider').html(cardPopupImage);
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


        return jsHelper.freezeObj(assetDisposalMisHotDealsBizObj);
    })(jsHelper)

    _global.jsHelper.defineReadOnlyObjProp(
        _global,
        "assetDisposalMisHotDealsBizObj",
        assetDisposalMisHotDealsBizCallFn
    );

})(this || window || {})

/*********** hot deals card know more click  ridirection logic **********/
function cardKnowMoreClick(event) {
    var dealsJson = responseAssetDisopsal.Master
    var propertyId = event.currentTarget.dataset.link;
    sessionStorage.setItem('breadcrumbPage', 'Home|');
    var DealsData = hotDealsData;
    var filterData = DealsData.filter(function (value, index) {
        return value["contract-no-"] == propertyId;
    });
    if (!jsHelper.isDef(sessionStorage.getItem('propertyAssetImage'))) {
        sessionStorage.setItem('propertyAssetImage', JSON.stringify(getAssetImg))
    }
    sessionStorage.setItem('propertyDeatilsData', JSON.stringify(filterData[0]));

    var sateCity = dealsJson.filter(function (element) {
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

    // Asset Disposal Hot Deals On Properties Know More Analytics START
    try {
        var city = getParentElement(event.currentTarget, 4).parentElement.dataset.content;
        var ctaTitle = getParentElement(event.currentTarget, 8).querySelector('.tops-heads h2').innerText.trim();
        var componentName = getParentElement(event.currentTarget, 8).querySelector('.tops-heads h2').innerText.trim() + ' box';
        var contractId = event.currentTarget.dataset.link;
        knowmorebuttonClick(city, componentName, ctaTitle, contractId);
    } catch (error) {
        console.log("element not found", error);
    }
    // Asset Disposal Hot Deals On Properties Know More Analytics END

    var propertyName = getSnakeCase(filterData[0]["property-name"]);
    var pageName = propertyName + '-' + propertyId + '.html';
    location.href = "/content/tata-capital-web/en/property-disposal/property-listing/" + pageName.toLowerCase();
}