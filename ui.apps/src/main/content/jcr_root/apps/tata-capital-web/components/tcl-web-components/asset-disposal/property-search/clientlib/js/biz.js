var assetDisposalStateCityOrganizeData = {}
if ($('#propertySearch').length > 0) {

    var selectPropertyTypeArr = [];
    var selectPropertyTypeTextJoinedVal;
    (function (_global) {

        var assetDisposalMisBizObj = {};

        var assetDisposalMisBizCallFn = (function (jsHelper) {
            $(document).ready(function () {
                initializePage();
            });
        
            function initializePage() {
                $("body").addClass("bg-loader");
                $(".loader").removeClass("hide-loader");
        
                callAssetDisposalMisApi();
            }
        
            function callAssetDisposalMisApi() {
                var reqObj = {};
        
                assetDisposalMisFilterObj.assetDisposalMis(reqObj)
                    .then(function (response) {
                        var responseObj = (typeof response.response === 'object') ? response.response : JSON.parse(response.response);
                        sessionStorage.setItem('completeResponse', JSON.stringify(responseObj));
                        var filterUpcoming = filterNonUpcomingProperties(responseObj.Master)
                        var assetStateMaster = assetDisposalOrganizeData(filterUpcoming);
                        assetDisposalStateCityOrganizeData = assetStateMaster;
        
                        renderStateCityProperty(assetStateMaster);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        
            function renderStateCityProperty(data) {
                $("body").removeClass("bg-loader");
                $(".loader").addClass("hide-loader");
        
                var jsonStateMaster = data;
                var stateSelect = $('[data-type="state"]');
                var citySelect = $('[data-type="city"]');
                var propertyTypeList = $('#property-type');
        
                stateSelect.empty();
                citySelect.empty();
                propertyTypeList.empty();
        
                $.each(jsonStateMaster, function (key) {
                    stateSelect.append('<option value="' + key + '">' + capitalizeWordsLongerThanThree(key) + '</option>');
                });
        
                stateSelect.val(Object.keys(jsonStateMaster)[0]).trigger('change.select2');
        
                Object.keys(jsonStateMaster[stateSelect.val()]).forEach(function (data) {
                    citySelect.append('<option value="' + data + '">' + capitalizeWordsLongerThanThree(data) + '</option>');
                });
        
                citySelect.val(Object.keys(jsonStateMaster[stateSelect.val()])[0]).trigger('change.select2');
        
                Object.keys(jsonStateMaster[stateSelect.val()][citySelect.val()]).forEach(function (data) {
                    setPropertyType(data);
                });
        
                stateSelect.on('select2:select', function () {
                    citySelect.html('');
                    selectPropertyTypeArr = []
                    selectPropertyTypeTextJoinedVal = '';
                    propertyTypeSelectTextDisply(selectPropertyTypeTextJoinedVal);
        
                    Object.keys(jsonStateMaster[stateSelect.val()]).forEach(function (data) {
                        citySelect.append('<option value="' + data + '">' + capitalizeWordsLongerThanThree(data) + '</option>');
                    });
        
                    citySelect.change();
                    propertyTypeList.empty();
        
                    Object.keys(jsonStateMaster[stateSelect.val()][citySelect.val()]).forEach(function (data) {
                        setPropertyType(data);
                    });
                });
        
                citySelect.on('select2:select', function () {
                    propertyTypeList.empty();
                    selectPropertyTypeArr = []
                    selectPropertyTypeTextJoinedVal = '';
                    propertyTypeSelectTextDisply(selectPropertyTypeTextJoinedVal);
        
                    Object.keys(jsonStateMaster[stateSelect.val()][citySelect.val()]).forEach(function (data) {
                        setPropertyType(data);
                    }); 
                });
            }

            
            function setPropertyType(data, show) {
                //$('[data-multiselect="multiselect-drop"]').text("Residential");
                //$('[data-multiselect="multiselect-drop"]').addClass('active');
                $('[data-multiselect="multiselect-drop"]').css("color", "rgb(51, 51, 51)");

                var newLi = $('<li class="select-item active" data-item="' + jsHelper.toSentence(data) + '">' +
                    '<label class="custom-checkbox-label">' +
                    '<span class="custom-checkbox-new">' +
                    '<input type="checkbox" checked data-event="' + jsHelper.toSentence(data) + '" class="js-filterCheck">' +
                    '<span class="checkbox-check"></span>' +
                    '</span>' +
                    '<span class="checkboxtext">' + jsHelper.toSentence(data) + '</span>' +
                    '</label>' +
                    '</li>');

                // Add onchange event to the checkbox
                newLi.find('.js-filterCheck').change(function () {
                    propertyTypeCheckLogic(this);
                });

                $('#property-type').append(newLi);

                // Call the function for the last appended <li> element
                    propertyTypeCheckLogic(newLi.find('.js-filterCheck')[0]);
            }    
        
            return jsHelper.freezeObj(assetDisposalMisBizObj);
        })(jsHelper);
        
        

        _global.jsHelper.defineReadOnlyObjProp(
            _global,
            "assetDisposalMisBizObj",
            assetDisposalMisBizCallFn
        );
    })(this || window || {})

}

console.log(assetDisposalStateCityOrganizeData)


/* property type multiple select js [START] */
function propertyTypeCheckLogic(e) {
    var newSelectedArr = $(e).attr('data-event');
    var selectedActualText = $('[data-item="' + newSelectedArr + '"] .checkboxtext').text();

    var found = jQuery.inArray(selectedActualText, selectPropertyTypeArr);
    if (found >= 0) {
        selectPropertyTypeArr.splice(found, 1);
        $('.jsMultiSelectList .select-item[data-item="' + newSelectedArr + '"]').removeClass('active');
    } else {
        selectPropertyTypeArr.push(selectedActualText);
        $('.jsMultiSelectList .select-item[data-item="' + newSelectedArr + '"]').addClass('active');
    }
    selectPropertyTypeTextJoinedVal = selectPropertyTypeArr.join(', ');
    propertyTypeSelectTextDisply(selectPropertyTypeTextJoinedVal)

}
function propertyTypeSelectTextDisply(joinedVal) {

    if (joinedVal === '') {
        $('.js-filterBtn a').text('Select Proerty Type');
        $('#sumbitBtn').addClass('disabled')
        $('#listingSubmitBtn').addClass('disabled')
        $('.js-filterBtn a').css('color', '#ff3030');
        $('.jsMulitSelectValue').val('Select')
    } else {
        $('.js-filterBtn a').text(joinedVal);
        $('#sumbitBtn').removeClass('disabled')
        $('#listingSubmitBtn').removeClass('disabled')
        $('.js-filterBtn a').css('color', '#333333');
        $('.jsMulitSelectValue').val(joinedVal);
    }
}
/* property type multiple select js [END] */


/* asset disposal mis api filter get state city and property type data [START] */
/* Function to organize data */
function assetDisposalOrganizeData(masterData) {
    const organizedData = {};
    const caseMap = { state: {}, location: {}, propertyType: {} };

    masterData.forEach(item => {
        const stateKey = item.state.trim().toLowerCase();
        const locationKey = item.location.trim().toLowerCase();
        const propertyTypeKey = item['property-type'].trim().toLowerCase();

        caseMap.state[stateKey] = caseMap.state[stateKey] || item.state.trim();
        caseMap.location[locationKey] = caseMap.location[locationKey] || item.location.trim();
        caseMap.propertyType[propertyTypeKey] = caseMap.propertyType[propertyTypeKey] || item['property-type'].trim();

        const state = caseMap.state[stateKey];
        const location = caseMap.location[locationKey];
        const propertyType = caseMap.propertyType[propertyTypeKey];

        organizedData[state] = organizedData[state] || {};
        organizedData[state][location] = organizedData[state][location] || {};
        organizedData[state][location][propertyType] = organizedData[state][location][propertyType] || [];
        organizedData[state][location][propertyType].push(item);
    });

    sessionStorage.setItem('disposalMisStateCityProperty', JSON.stringify(organizedData));
    console.log(organizedData);
    return organizedData
}

/*function assetDisposalMisApiStateFilter(res) {
    var stateMaster = {};
    var mdmState = [];
    var responseData = (typeof (res) === 'object') ? (res) : JSON.parse(res);
    responseData.Master.map(function (e) {
        if (mdmState.every(function (masterEl) { return masterEl != e['state'] })) {
            mdmState.push(e['state']);
        }
    })

    mdmState.forEach(function (val) {
        stateMaster[val] = {};
        var city = [];
        responseData.Master.filter(function (e) {
            return e['state'] == val;
        }).map(function (e) {
            if (city.every(function (vehEl) { return vehEl != e['location'] })) {
                city.push(e['location'])
            }
        })

        city.forEach(function (ct) {
            stateMaster[val][ct] = {};
            var propertyType = [];
            responseData.Master.filter(function (e) {
                return e['state'] == val;
            }).filter(function (st) {
                return st['location'] == ct;
            }).map(function (mapEl) {
                if (propertyType.every(function (varEl) { return varEl != mapEl['property-type'] })) {
                    propertyType.push(mapEl['property-type'])
                }
            })

            stateMaster[val][ct]["property-type"] = propertyType;
        })

    });


    sessionStorage.setItem('disposalMisStateCityProperty', JSON.stringify(stateMaster));
    return stateMaster
}*/
/* asset disposal mis api filter get state city and property type data [END] */

/**************** submit btn click function [START]  *******************/
$(document).ready(function () {
    $('#sumbitBtn').click(dropdownSubmitBtn)
});

function dropdownSubmitBtn(e) {
    $("body").addClass("bg-loader");
    $(".loader").removeClass("hide-loader");

    var assetDisposalMisState = $('[data-type="state"]').find(':selected').val();
    var assetDisposalMisCity = $('[data-type="city"]').find(':selected').val();
    var propertyTypeArray = selectPropertyTypeArr;
    var defaultPropertyTypeList = ['commercial plot', 'commercial shop','commercial showroom','commercial office','godown', 'residential flat', 'residential plot', 'residential row house', 'residential bungalow', 'warehouse','residential builder floor','commercial industrial unit','commercial building'];

    var storeObj = {
        state: assetDisposalMisState,
        city: assetDisposalMisCity,
        property: propertyTypeArray.length !== 0 ? propertyTypeArray : defaultPropertyTypeList
    };

    if (sessionStorage.getItem("selectedStateCityProperty")) {
        sessionStorage.removeItem('selectedStateCityProperty');
    }

    sessionStorage.setItem('selectedStateCityProperty', JSON.stringify(storeObj));

    var resCityState = getMisStateCityData();
    
    function getMisStateCityData() {
        const allDisposalData = JSON.parse(sessionStorage.getItem('completeResponse'))
        const filteredArray = allDisposalData.Master.filter(filterByStateAndLocation);
        console.log(filteredArray)
        return filteredArray
    }
    // Function to check if an element matches the target state and location
    function filterByStateAndLocation(item) {
        const targetState = $('[data-type="state"]').val().trim()
        const targetLocation = $('[data-type="city"]').val().trim()
        return (
            (item.state).trim() === targetState && (item.location).trim() === targetLocation
        );
    }
    

    assetDisposalMisFilterObj.getAssetImageAPICall('/content/tata-capital/retailapi.propertyImage.json', 'GET')
    .then(function (imgRes) {
        $("body").removeClass("bg-loader");
        $(".loader").addClass("hide-loader");
        if (sessionStorage.getItem("propertyAssetImage")) {
            sessionStorage.removeItem('propertyAssetImage');
        }
        var imageRes = (typeof imgRes === 'object') ? imgRes : JSON.parse(imgRes);
        sessionStorage.setItem('propertyAssetImage', JSON.stringify(imageRes));

        var filterData = sessionStorage.getItem('filterData');
        if (filterData === null) {
            var propertyData = JSON.parse(sessionStorage.getItem('selectedStateCityProperty'));
            propertyTypeArray = propertyData.property;
            var filterObj = {
                "inputbugetFrom": "1",
                "inputbugetTo": "1000",
                "propertyType": propertyTypeArray,
                "rooms": roomArr,
                "minArea": "1",
                "maxArea": "50000"
            };

            sessionStorage.setItem('filterData', JSON.stringify(filterObj));
        }

        var apiAllproperty = $('.jsMultiSelectList .select-item');
        var allProperty = [];
        $.each(apiAllproperty, function (ind, ele) {
            allProperty.push($(ele).hasClass('active') ? $(ele).data('item') + '|active' : $(ele).data('item'));
        });

        sessionStorage.setItem('stateCityAllProperty', JSON.stringify(allProperty));
        sessionStorage.setItem('disposalMisStateCityRes', JSON.stringify(resCityState));
        window.location.href = "/content/tata-capital-web/en/property-disposal/property-listing.html";
    })
    .catch(function (error) {
        console.log("Error !!!", error);
    });

   // var queryParams = "?state=" + assetDisposalMisState + "&location=" + assetDisposalMisCity;
    //var reqObj = {};
   /* assetDisposalMisFilterObj.getAssetDisposalMISFilter(reqObj, queryParams)
        .then(function (response) {
            var misResponse = (typeof response.response === 'object') ? response.response.Master : JSON.parse(response.response).Master;
            
            assetDisposalMisFilterObj.getAssetImageAPICall('/content/tata-capital/retailapi.propertyImage.json', 'GET')
                .then(function (imgRes) {
                    $("body").removeClass("bg-loader");
                    $(".loader").addClass("hide-loader");
                    if (sessionStorage.getItem("propertyAssetImage")) {
                        sessionStorage.removeItem('propertyAssetImage');
                    }
                    var imageRes = (typeof imgRes === 'object') ? imgRes : JSON.parse(imgRes);
                    sessionStorage.setItem('propertyAssetImage', JSON.stringify(imageRes));

                    var filterData = sessionStorage.getItem('filterData');
                    if (filterData === null) {
                        var propertyData = JSON.parse(sessionStorage.getItem('selectedStateCityProperty'));
                        propertyTypeArray = propertyData.property;
                        var filterObj = {
                            "inputbugetFrom": "1",
                            "inputbugetTo": "1000",
                            "propertyType": propertyTypeArray,
                            "rooms": roomArr,
                            "minArea": "1",
                            "maxArea": "50000"
                        };

                        sessionStorage.setItem('filterData', JSON.stringify(filterObj));
                    }

                    var apiAllproperty = $('.jsMultiSelectList .select-item');
                    var allProperty = [];
                    $.each(apiAllproperty, function (ind, ele) {
                        allProperty.push($(ele).hasClass('active') ? $(ele).data('item') + '|active' : $(ele).data('item'));
                    });

                    sessionStorage.setItem('stateCityAllProperty', JSON.stringify(allProperty));
                    sessionStorage.setItem('disposalMisStateCityRes', JSON.stringify(misResponse));
                    window.location.href = "/content/tata-capital-web/en/property-disposal/property-listing.html";
                })
                .catch(function (error) {
                    console.log("Error !!!", error);
                });
        })
        .catch(function (error) {
            console.log(error);
        });*/
}


/**************** submit btn click function [START]  *******************/