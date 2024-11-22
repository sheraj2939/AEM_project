
/*********** card data render logic [START] ************* */
function createDealCards(data) {
    var tableBodyElement = $('#getData');
    tableBodyElement.empty();

    var propertyAssetsDetails = sessionStorage.getItem('propertyAssetImage');
    if (propertyAssetsDetails && propertyAssetsDetails !== '{}') {
        $('#notDataGet').addClass('hidden');
        var getAssetImg = JSON.parse(propertyAssetsDetails);
        reanderDataFn(data, getAssetImg);
        console.log('disposal img api session');
    } else {
        var assetApiUrl = '/content/tata-capital/retailapi.propertyImage.json';

        assetDisposalMisFilterObj.getAssetImageAPICall(assetApiUrl, 'GET')
            .then(function(response) {
                var res = (typeof response === 'object') ? response : JSON.parse(response);
                sessionStorage.setItem('propertyAssetImage', JSON.stringify(res));
                $('#notDataGet').addClass('hidden');
                var getAssetImg = JSON.parse(sessionStorage.getItem('propertyAssetImage'));
                reanderDataFn(data, getAssetImg);
            })
            .catch(function(error) {
                console.error("Error !!!", error);
            });
    }

    if (data.length === 0) {
        $('#notDataGet').removeClass('hidden');
        $('#totalCount').html('Showing 0 Listings');
    }
}
/*********** card data render logic [END] ************* */

function reanderDataFn(data, assetImg) {
    var tableBodyElement = $('#getData');
    tableBodyElement.empty(); // Clear the table body before appending new data
    var htmlStr = '';
    data.forEach(function (element) {
        var contractNo = element["contract-no-"];
        if (jsHelper.isDef(assetImg[contractNo])) {
            var assetData = assetImg[contractNo];
            var totalCount = assetData.count;
            var firstImage = assetData.images[0];
             if (totalCount === 0){
                element["firstImg"] = "/content/dam/tata-capital/asset-disposal-new/genericasseticon.svg";
                element["no-image"] = true;
            }else{
                element["total"] = totalCount;
                element["firstImg"] = `/content/dam/tata-capital/asset-disposal/${contractNo}/${firstImage}`;
            }
        }
         else {
            element["firstImg"] = "/content/dam/tata-capital/asset-disposal-new/genericasseticon.svg";
            element["no-image"] = true;
        }

        htmlStr += createDealCardsTemplate(element);
    });

    tableBodyElement.append(htmlStr);
    $('#totalCount').parent().show();
    $('#totalCount').html(`Showing ${data.length} Listings`);

    propertyShowMorePhotosClick();
    propertyListcardKnowMoreClick();
}

/******** card each photo click propertyShowPhotoPopup function call ************/
function propertyShowMorePhotosClick() {
    var photosBtnArr = document.querySelectorAll('a[data-id]');
    photosBtnArr.forEach(function (element) {
        element.addEventListener('click', propertyShowPhotoPopup);
    });
}
/******** card each photo click propertyShowPhotoPopup function call ************/

/************* property card click image popup modal logic [START] **********************/
function propertyShowPhotoPopup(event) {
    var currentId = $(event.currentTarget).data('id');
    var propertyAssetsDetails = JSON.parse(sessionStorage.getItem('propertyAssetImage'));
    var dealsData = JSON.parse(sessionStorage.getItem('disposalMisStateCityRes'));
    var currentData = dealsData.find(function (value) {
        return value["contract-no-"] == currentId;
    });

    $('#partnerSliderModal .heading20').text(currentData["property-name"]);
    $('#partnerSliderModal').addClass('popover-show').css('display', 'block');

    var itemTemplate = getItemTemplateForCurrentId(propertyAssetsDetails, currentId, currentData);
    
    setupSlickSlider(itemTemplate);
}

function getItemTemplateForCurrentId(propertyAssetsDetails, currentId, currentData) {
    var itemTemplate = '';
    
    if (typeof currentId !== 'string') {
        currentId = currentId.toString();
    }
    
    if (jsHelper.isDef(propertyAssetsDetails[currentId])) {
        propertyAssetsDetails[currentId].images.forEach(function (value) {
            var imagePath = `/content/dam/tata-capital/asset-disposal/${currentId}/${value}`;
            itemTemplate += getItemTemplate(imagePath, currentData["property-name"]);
        });
    }
    
    return itemTemplate;
}

function setupSlickSlider(itemTemplate) {
    var $viewMoreSlider = $('#viewMoreSlider');
    $viewMoreSlider.slick('unslick');
    
    $viewMoreSlider.html(itemTemplate).not('.slick-initialized').slick({
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
    var $slickElement = $viewMoreSlider;
    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.text(i);
        $sliderTot.text('/' + slick.slideCount);
    });

    $viewMoreSlider.slick('refresh');
}


/************* property card click image popup modal logic [END] **********************/

/************ modal each image rander logic [START] *****************/
function getItemTemplate(imagePath, propertyName) {
    var itemTemplate = $('<div>').addClass('more-slider-row')
        .append(
            $('<div>').addClass('more-slider-caption')
                .append($('<p>').addClass('heading20').text(propertyName))
                .append(
                    $('<div>').addClass('view-more-total')
                        .append($('<span>').addClass('sliderCounter'))
                        .append($('<span>').addClass('sliderTotal'))
                )
        )
        .append(
            $('<div>').addClass('more-slider-image')
                .append($('<img>').attr('src', imagePath).attr('alt', ''))
        );

    return itemTemplate;
}

/************ modal each image rander logic [END] *****************/

/********* property card know more button click logic [START]  **********/
function propertyListcardKnowMoreClick() {
    $('[data-link]').on('click', function (event) {
        var propertyId = event.currentTarget.dataset.link;
       propertyListknowMoreRedirection(propertyId);
    })
}
/********* property card know more button click logic [END]  **********/

/************* property card know more click redirection logic [START] ********/
function propertyListknowMoreRedirection(propertyId) {
    const dealsData = JSON.parse(sessionStorage.getItem('disposalMisStateCityRes'));
    const filterData = dealsData.find(value => value["contract-no-"] === propertyId);

    if (!filterData) {
        console.error('No matching property found.');
        return;
    }

    const selectedData = {
        state: filterData.state,
        city: filterData.location
    };

    sessionStorage.removeItem('selectedStateCityProperty');
    sessionStorage.setItem('selectedStateCityProperty', JSON.stringify(selectedData));
    sessionStorage.setItem('propertyDeatilsData', JSON.stringify(filterData));

    if (sessionStorage.getItem('breadcrumbPage')) {
        sessionStorage.removeItem('breadcrumbPage');
    }

    const sateCity = dealsData.filter(element =>
        element.state.toLowerCase() === filterData.state.toLowerCase() &&
        element.location.toLowerCase() === filterData.location.toLowerCase()
    );

    const propertyType = [...new Set(sateCity.map(e => e['property-type']))];

    const storeObj = {
        state: filterData.state,
        city: filterData.location,
        property: propertyType
    };

    sessionStorage.setItem('selectedStateCityProperty', JSON.stringify(storeObj));
    sessionStorage.setItem('disposalMisStateCityRes', JSON.stringify(sateCity));
    sessionStorage.setItem('stateCityAllProperty', JSON.stringify(propertyType));
    sessionStorage.setItem('breadcrumbPage', 'Home|Property Disposal Listing|');

    const propertyName = getSnakeCase(filterData["property-name"]);
    const pageName = `${propertyName}-${propertyId}.html`;
    const locationHref = `/content/tata-capital-web/en/property-disposal/property-listing/${pageName.toLowerCase()}`;

    window.location.href = locationHref;
}
/************* property card know more click redirection logic [END] ********/

/*********** property each card render logic [START]  ******************/
function createDealCardsTemplate(data1) {
    const imageClass = data1['no-image'] ? 'no-image' : 'deal-img';
    const property_name = data1['property-name'] || '';
    const encodeURL = (url) => {
        return url.split('/').map(encodeURIComponent).join('/');
    };
    
    const imageUrl = data1['firstImg'] ? encodeURL(data1['firstImg']) : '';
    
    const backgroundImageStyle = imageUrl
        ? `background: center / cover no-repeat url(${imageUrl}), 35%; height: 175px; background-size: 450px; border-radius: 20px;`
        : '';

    const isNonSarfaesi = data1["non-sarfaesi"].toLowerCase() === "yes";
    const hasDiscount = data1["discount-"] !== "0%" && data1["non-sarfaesi"].toLowerCase() !== "yes";
    
    const discountHTML = hasDiscount
        ?`<div class="deal-discount">
        <span class="deal-dis-count">Price ${data1["discount-"].replace('-', '')} off</span>
    </div>`
        : "";
    
    const pricesHTML = isNonSarfaesi
        ? `<div class="deal-prices">
               <p class="heading24 bold deal-price-text text-gray">Negotiable price*</p>
           </div>`
        : `<div class="deal-prices">
               <p class="heading24 bold deal-price-text">₹${Number(data1["reserve-price"]).toLocaleString('en-IN')}</p>
               <p class="${hasDiscount ? 'deal-price-discount' : 'd-none'}">₹${Number(data1["market-value"]).toLocaleString('en-IN')}</p>
           </div>`;

    const btnHTML = `<div class="deal-btn-more">
                        <button class="btn-blue btn-large w-100" data-link="${data1["contract-no-"]}">Know More</button>
                    </div>`;

    const cardHTML = `
        <div class="deal-col">
            <div class="bg-div deal-div${isNonSarfaesi ? ' negotiable-card deal-negotiable-card' : ''}">
                <div class="deal-img-out ${imageClass}" style="${backgroundImageStyle}">
                    ${data1.total ? `<a href="javascript:void(0)" class="total-pic" data-popovermodal="popover-modal" data-target="#partnerSliderModal" data-id="${data1["contract-no-"]}">${data1.total} Photos</a>` : ''}
                </div>
                <p class="text14i deal-resident">${data1['property-type']}</p>
                <p class="heading20 deal-name semibold">${property_name.split(',')[0]},<span class="deal-name-sub">${data1['location']}</span></p>
                <p class="deal-flats text16">
                    ${data1.bhk.toUpperCase() !== 'NA' ? `<strong>${data1.bhk}</strong>` : ''}
                    <span class="deal-flats-size">${data1["area-in-sq-ft"]} sq.ft. (SBU)</span>
                </p>
                <div class="deal-move">
                    <span class="all-icon24 icon-google"></span>
                    <p class="text14i">${data1["construction-stage"]}</p>
                </div>
                ${discountHTML}
                ${pricesHTML}
                ${btnHTML}
            </div>
        </div>`;

    return cardHTML;
}

/*********** property each card render logic [END]  ******************/

function getSnakeCase(val) {
    return val.trim().replace(/[^a-z0-9]+/gi, '-').replace(/^_+|_+$/g, '').toLowerCase();
}