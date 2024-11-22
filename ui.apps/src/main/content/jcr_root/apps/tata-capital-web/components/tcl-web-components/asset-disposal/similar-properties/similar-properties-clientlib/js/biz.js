
// (function (_global) {
    var assetDisposalMisHotDealsBizObj = {}
    var assetDisposalMisHotDealsBizCallFn = (function (jsHelper) {
        var responseAssetDisopsal
        var responseDisopsalMaster
        var cardImg
        function similarPropertyCardPopulate() {
            var reqObj = {};
            assetDisposalMisHotDealsFilterObj.assetDisposalMisHotDeals(reqObj).then(function (response) {
                responseDisopsalMaster = (typeof (response.response) == 'object') ? response.response : JSON.parse(response.response);
                responseAssetDisopsal = responseDisopsalMaster.Master;
                var filteredAssets = responseAssetDisopsal.filter(function (asset) {
                    return asset.location === dataLocation && asset.state === dataState;
                });
                assetDisposalMisFilterObj.getAssetImageAPICall('/content/tata-capital/retailapi.propertyImage.json', 'GET').then(function (response) {
                    cardImg = (typeof (response) == 'object') ? response : JSON.parse(response);
                    generateAssetCards(filteredAssets, cardImg);
                });
            }).catch(function (error) { });
        }
    
        function getTemplate(imagePath, propertyName) {
    
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
    
        function generateAssetCards(filteredAssets, cardImages) {
            var assetCards = '';
            var noImageFlag = '';
            var imageClass = '';
            var filterUniqueContracts = findUniqueContractsAndLogDuplicates(filteredAssets);
            var filterUpcoming = filterNonUpcomingProperties(filterUniqueContracts)
            if (filterUpcoming.length > 0) {
                for (var i = 0; i < filterUpcoming.length; i++) {
                    var asset = filterUpcoming[i];
                    var bhkValue = "";
                    asset["bhk"] == "NA" ? bhkValue = '' : bhkValue = '<strong>' + asset["bhk"] + '</strong>';
                    var contractsNum = asset['contract-no-'];
                    if (filterUpcoming.length > 1) {
                        if (cardImages[contractsNum]) {
                            if (cardImages[contractsNum].count === 0){
                                var imgCount = '';
                                var propertyImage = "/content/dam/tata-capital/asset-disposal-new/genericasseticon.svg";
                                noImageFlag = true;
                            }else{
                                var imgObj = cardImages[contractsNum].images;
                                var imgCount = '<a href="javascript:void(0)" class="total-pic"  data-idsimilar="' + asset["contract-no-"] + '">' + cardImages[contractsNum].count + ' Photos</a>';
                                var propertyImage = '/content/dam/tata-capital/asset-disposal/' + contractsNum + '/' + imgObj[0];
                                noImageFlag = false;
                            }
                          
                        }
                        else {
                            var imgCount = '';
                            var propertyImage = "/content/dam/tata-capital/asset-disposal-new/genericasseticon.svg";
                            noImageFlag = true;
                        }
                        (noImageFlag == true) ? imageClass = 'no-image' : imageClass = 'deal-img';
                        if ((asset["reserve-price"] && asset["market-value"]) != "-") {
                            var reservePrice = parseFloat(asset["reserve-price"]);
                            var marketValue = parseFloat(asset["market-value"]);
        
                            // Format the numbers using toLocaleString
                            var formattedReservePrice = reservePrice.toLocaleString("en-IN");
                            var formattedMarketValue = marketValue.toLocaleString("en-IN");
                        }
                        else {
                            var formattedReservePrice = asset["reserve-price"];
                            var formattedMarketValue = asset["market-value"];
                        }
                        // card background image
                        const encodeURL = (url) => {
                            return url.split('/').map(encodeURIComponent).join('/');
                        };
                        const encodedImageUrl = propertyImage ? encodeURL(propertyImage) : '';
                        const backgroundImageStyle = encodedImageUrl
                            ? `style="background: center / cover no-repeat url(${encodedImageUrl}), 35%; height: 175px; background-size: 400px; border-radius: 20px;"`
                            : '';
                            
                        if (asset["non-sarfaesi"].toLowerCase() == "yes") {
                            var card = '<div class="deal-col js-similar-list" data-cardcontnum= ' + asset['contract-no-'] + '><div class="bg-div deal-div deal-negotiable-card"><div class="deal-img-out ' + imageClass + '" ' + backgroundImageStyle + '>' + imgCount + '</div><p class="text14i deal-resident">' + asset["property-type"] + '</p><p class="heading20 deal-name semibold">' + asset["property-name"].split(',')[0] + ', <span class="deal-name-sub"> ' + asset["location"] + '</span></p><p class="deal-flats text16"><strong>' + bhkValue + '</strong><span class="deal-flats-size">' + asset["area-in-sq-ft"] + 'sq.ft. (SBU)</span></p><div class="deal-move"><span class="all-icon24 icon-google"></span><p class="text14i">' + asset['construction-stage'] + '</p></div><div class="deal-prices"><p class="heading24 bold deal-price-text text-gray">Negotiable price*</p></div><div class="deal-btn-more"><a data-link = ' + asset["contract-no-"] + ' class="btn-blue btn-large w-100">Know More</a></div></div></div> </div>'
                            assetCards += card
                        } else if (asset["discount-"] == "0%") {
                            var card = '<div class="deal-col js-similar-list" data-cardcontnum= ' + asset['contract-no-'] + '> <div class="bg-div deal-div"> <div class="deal-img-out ' + imageClass + '" ' + backgroundImageStyle + '>' + imgCount + '</div><p class="text14i deal-resident">' + asset["property-type"] + '</p><p class="heading20 deal-name semibold">' + asset["property-name"].split(',')[0] + ', <span class="deal-name-sub"> ' + asset["location"] + '</span></p><p class="deal-flats text16"><strong>' + bhkValue + '</strong><span class="deal-flats-size">' + asset["area-in-sq-ft"] + ' sq.ft. (SBU)</span></p><div class="deal-move"> <span class="all-icon24 icon-google"></span> <p class="text14i">' + asset['construction-stage'] + '</p></div><div class="deal-discount">  </div><div class="deal-prices"> <p class="heading24 bold deal-price-text">₹' + Number(asset["market-value"]).toLocaleString('en-IN') + '</p></div><div class="deal-btn-more"> <a data-link = ' + asset["contract-no-"] + ' class="btn-blue btn-large w-100">Know More</a> </div></div></div>'
                            assetCards += card
                        }
                        else {
                            var card = `<div class="deal-col js-similar-list"  data-cardcontnum = ${asset['contract-no-']}>
                                                    <div class="bg-div deal-div">
                                                        <div class="deal-img-out ${imageClass}" ${backgroundImageStyle}>
                                                            ${imgCount}
                                                        </div>
                                                        <p class="text14i deal-resident">${asset['property-type']}</p>
                                                        <p class="heading20 deal-name semibold">${asset['property-name']}, <span class="deal-name-sub">${asset.location}</span></p>
                                                        <p class="deal-flats text16"><strong>${bhkValue}</strong><span class="deal-flats-size">${asset["area-in-sq-ft"]} sq.ft. (SBU)</span></p>
                                                        <div class="deal-move">
                                                            <span class="all-icon24 icon-google"></span>
                                                            <p class="text14i">${asset["construction-stage"]}</p>
                                                        </div>
                                                        <div class="deal-discount">
                                                            <span class="deal-dis-count">Price ${Math.abs(asset["discount-"].split('%')[0])}% off</span>
                                                        </div>
                                                        <div class="deal-prices">
                                                            <p class="heading24 bold deal-price-text">₹${formattedReservePrice}</p>
                                                            <p class="deal-price-discount">₹${formattedMarketValue}</p>
                                                        </div>
                                                        <div class="deal-btn-more">
                                                            <a data-link = ${asset["contract-no-"]} class="btn-blue btn-large w-100">Know More</a>
                                                        </div>                                        
                                                    </div>
                                                </div>`;
                            assetCards += card
                        }
                        $('#similarPropertiesRow').html(assetCards)
                    } else {
                        card = '<div class="mx-944" style="margin-top: 30px;"> <div class="bg-div property-nosearch-found"> <img src="/content/dam/tata-capital/asset-disposal-new/no-found.svg" alt="" class="no-found-img"> <p class="heading20 semibold">No similar properties found</p><p class="text16i">We could not find any deals on properties for the city selected</p></div></div>'
                        assetCards += card
                        $('#similarPropertiesRow').html(assetCards)
                    }
        
                    cardsShowMoreImg()
                    cardKnowMoreBtnClick()
        
                }
            } else {
                card = '<div class="mx-944" style="margin-top: 30px;"> <div class="bg-div property-nosearch-found"> <img src="/content/dam/tata-capital/asset-disposal-new/no-found.svg" alt="" class="no-found-img"> <p class="heading20 semibold">No similar properties found</p><p class="text16i">We could not find any deals on properties for the city selected</p></div></div>'
                assetCards += card
                $('#similarPropertiesRow').html(assetCards)
        }
         
            var cardNone = $(".property-row-right").attr("data-propertyid");
            $(`.deal-col[data-cardcontnum='${cardNone}']`).remove();
            /*similar properties 7-7-2023*/
            if ($('.js-similar-properties-list').find('.js-similar-list').length < 6) {
                $('.js-similar-properties-list').siblings('.similar-properties-btn').addClass('d-none');
                $('.js-similar-list').css("display", "block")
            } else {
    
                $('.js-similar-properties-list .js-similar-list').slice(0, 6).show();
                $("#jsLoadMoreProperties").on('click', function (e) {
                    e.preventDefault();
                    $(".js-similar-properties-list .js-similar-list:hidden").slice(0, 3).fadeIn();
                    if ($(".js-similar-properties-list .js-similar-list:hidden").length == 0) {
                        $("#jsLoadLessProperties").removeClass('d-none').fadeIn('slow');
                        $("#jsLoadMoreProperties").hide();
                    }
                });
                $("#jsLoadLessProperties").on('click', function (e) {
                    e.preventDefault();
                    $('.js-similar-properties-list .js-similar-list:not(:lt(6))').fadeOut();
                    $("#jsLoadMoreProperties").fadeIn('slow');
                    $("#jsLoadLessProperties").hide();
                });
            }
            /*similar properties 7-7-2023*/
            return assetCards;
        }
    
        function cardsShowMoreImg() {
            var photosBtnArr = document.querySelectorAll('a[data-idsimilar]');
            photosBtnArr.forEach(function (element) {
                element.addEventListener('click', cardShowImg);
            });
        }
    
        function cardShowImg(event) {
            var currentId = event.currentTarget.dataset.idsimilar;
            var propertyAssetsDetails = cardImg;
            var dealsData = responseAssetDisopsal;
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
                    itemTemplate += getTemplate(imagePath, currentData["property-name"]);
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
    
        function cardKnowMoreBtnClick() {
    
            $('[data-link]').on('click', function (event) {
                var propertyId = event.currentTarget.dataset.link;
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
                cardKnowMoreBtn(propertyId);
            })
        }
    
        function cardKnowMoreBtn(propertyId) {
    
            var dealsData = responseAssetDisopsal;
            sessionStorage.removeItem('breadcrumbPage');
            sessionStorage.setItem('propertyAssetImage', JSON.stringify(cardImg));
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
                assetDisposalOrganizeData(responseDisopsalMaster)
            }
    
            var propertyName = getSnakeCase(filterData[0]["property-name"]);
            var pageName = propertyName + '-' + propertyId + '.html';
            location.href = "/content/tata-capital-web/en/property-disposal/property-listing/" + pageName.toLowerCase();
    
        }
        similarPropertyCardPopulate();
        return jsHelper.freezeObj(assetDisposalMisHotDealsBizObj);
    })(jsHelper)
    
    //     _global.jsHelper.defineReadOnlyObjProp(
    //         _global,
    //         "assetDisposalMisHotDealsBizObj",
    //         assetDisposalMisHotDealsBizCallFn
    //     );
    // })(this || window || {})