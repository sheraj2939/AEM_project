if ($('#propertySearchListing').length > 0) {

    var selectPropertyTypeArr = [];
    var selectPropertyTypeTextJoinedVal;
    var propertyTypeArr = [];
    var roomArr = ['2bhk'];
    var filterData = sessionStorage.getItem('filterData') ? sessionStorage.getItem('filterData') : {};

    $(document).ready(function () {

        var propertyData = JSON.parse(sessionStorage.getItem('selectedStateCityProperty'));

        /***** filter data set [default budget,area,room] ****/
        if (!jsHelper.isDef(filterData)) {
            propertyTypeArr = propertyData.property;
            var filterObj = {
                "inputbugetFrom": "1",
                "inputbugetTo": "1000",
                "propertyType": propertyTypeArr,
                "rooms": roomArr,
                "minArea": "1",
                "maxArea": "5000"
            }
            sessionStorage.setItem('filterData', JSON.stringify(filterObj));
        }
        /***** filter data set [default budget,area,room] ****/


        /****** selected state city property type render on select logic */
        var stateCity = sessionStorage.getItem('selectedStateCityProperty') ? JSON.parse(sessionStorage.getItem('selectedStateCityProperty')) : '';
        var stateElement = $('[data-type="state"]');
        var cityElement = $('[data-type="city"]');
        statePopulate(stateCity);
        cityPopulate(stateCity);
        var propertyTypeArray = (typeof(sessionStorage.getItem('stateCityAllProperty'))=='object') ? sessionStorage.getItem('stateCityAllProperty') : JSON.parse(sessionStorage.getItem('stateCityAllProperty'));
        PropertyPopulate(propertyTypeArray)


        function statePopulate(data) {
            var html_code = '';
            html_code += generateStateTemplate(data);
            stateElement.append(html_code);
        }

        function cityPopulate(data) {
            var html_code = '';
            html_code += generateCityTemplate(data);
            cityElement.append(html_code);
        }

      

        function generateStateTemplate(info) {
            var str = '<option value="' + info["state"] + '">' + info["state"] + '</option>';
            return str;
        }

        function generateCityTemplate(info) {
            var str = '<option value="' + info["city"] + '">' + info["city"] + '</option>';
            return str;
        }

        /****** selected  state city property type render on select logic */


        /******** asset disposal mis all state city property type render data */
        var stateMaster = JSON.parse(sessionStorage.getItem('disposalMisStateCityProperty'));
        console.log(stateMaster)
        populateStateData(stateMaster);

        function populateStateData(stateMaster) {

            jsonStateMaster = stateMaster;
            $('[data-type="state"]').html('');
            var selectedData = JSON.parse(sessionStorage.getItem('selectedStateCityProperty'));

            Object.keys(jsonStateMaster).forEach(function (data) {
                $('[data-type="state"]').append('<option value="' + data + '">' + capitalizeWordsLongerThanThree(data) + '</option>');
            });

            $('[data-type="state"]').val(selectedData.state).trigger('change.select2');

            $('[data-type="city"]').html('');
            Object.keys(jsonStateMaster[$('[data-type="state"]').val()]).forEach(function (data) {
                $('[data-type="city"]').append('<option value="' + data + '">' + capitalizeWordsLongerThanThree(data) + '</option>');
            });

            $('[data-type="city"]').val(selectedData.city).trigger('change.select2');

            $('[data-type="state"]').on('select2:select', function () {
                selectPropertyTypeArr = []
                selectPropertyTypeTextJoinedVal = '';
                propertyTypeSelectTextDisply(selectPropertyTypeTextJoinedVal);

                $('[data-type="city"]').html('');
                Object.keys(jsonStateMaster[$('[data-type="state"]').val()]).forEach(function (data) {
                    $('[data-type="city"]').append('<option value="' + data + '">' + capitalizeWordsLongerThanThree(data) + '</option>');
                });
                $('select[data-type="city"]').change();
                $('#property-type').html('');
                Object.keys(jsonStateMaster[$('[data-type="state"]').val()][$('[data-type="city"]').val()]).forEach(function (data) {
                    //$('[data-multiselect="multiselect-drop"]').text("Residential");
                    //$('[data-multiselect="multiselect-drop"]').addClass('active');
                    $('[data-multiselect="multiselect-drop"]').css("color", "rgb(51, 51, 51)");
                    var newLi = $('<li class="select-item active" data-item="' + jsHelper.toSentence(data) + '">' +
                                '<label class="custom-checkbox-label">' +
                                '<span class="custom-checkbox-new">' +
                                '<input type="checkbox" checked data-event="' + jsHelper.toSentence(data) + '" class="js-filterCheck" onchange="propertyTypeCheckLogic(this)">' +
                                '<span class="checkbox-check"></span>' +
                                '</span>' +
                                '<span class="checkboxtext">' + jsHelper.toSentence(data) + '</span>' +
                                '</label>' +
                                '</li>');

                       $('#property-type').append(newLi);
                       propertyTypeCheckLogic(newLi.find('.js-filterCheck')[0]);
                })
            });

            $('select[data-type="city"]').on('select2:select', function () {
                selectPropertyTypeArr = []
                selectPropertyTypeTextJoinedVal = '';
                propertyTypeSelectTextDisply(selectPropertyTypeTextJoinedVal);
                $('#property-type').html('');
                Object.keys(jsonStateMaster[$('[data-type="state"]').val()][$('[data-type="city"]').val()]).forEach(function (data) {
                   // $('[data-multiselect="multiselect-drop"]').text("Residential");
                    //$('[data-multiselect="multiselect-drop"]').addClass('active');
                    $('[data-multiselect="multiselect-drop"]').css("color", "rgb(51, 51, 51)");
                    var newLi = $('<li class="select-item active" data-item="' + jsHelper.toSentence(data) + '">' +
                                '<label class="custom-checkbox-label">' +
                                '<span class="custom-checkbox-new">' +
                                '<input type="checkbox" checked data-event="' + jsHelper.toSentence(data) + '" class="js-filterCheck" onchange="propertyTypeCheckLogic(this)">' +
                                '<span class="checkbox-check"></span>' +
                                '</span>' +
                                '<span class="checkboxtext">' + jsHelper.toSentence(data) + '</span>' +
                                '</label>' +
                                '</li>');

                     $('#property-type').append(newLi);
                     propertyTypeCheckLogic(newLi.find('.js-filterCheck')[0]);
                })

            });
        }
        /******** asset disposal mis all state city property type render data */

    })

    /******** mobile view search property listing data disply *********** */
    $('.mob-filter-value').ready(function () {
        $('#mobState span').text($('[data-type="state"]').val().trim())
        $('#mobCity span').text($('[data-type="city"]').val().trim())
        $('#mobProperty span').text(selectPropertyTypeTextJoinedVal ? selectPropertyTypeTextJoinedVal : '')
    })

    $('[data-filterclose="pro-filter"]').click(function () {
        $('#mobState span').text($('[data-type="state"]').val().trim())
        $('#mobCity span').text($('[data-type="city"]').val().trim())
        $('#mobProperty span').text(selectPropertyTypeTextJoinedVal ? selectPropertyTypeTextJoinedVal : '')
    })
    /******** mobile view search property listing data disply *********** */


    /**************** when listing  submit btn logic click *****************/

    $('#listingSubmitBtn').on('click', function () {
        /********* loader ************/
        $("body").addClass("bg-loader");
        $(".loader").removeClass("hide-loader");

        /******* select property type data array ***** */
        var propertyTypeArray = selectPropertyTypeArr;

        /******* selected state,city,property type and deault property stroed session storage ***** */
        var selectedState = $('[data-type="state"]').find(':selected').val();
        var selectedCity = $('[data-type="city"]').find(':selected').val();
        var stateCityProperty = JSON.parse(sessionStorage.getItem('selectedStateCityProperty'))
        var defaultPropertyTypeList = ['commercial plot', 'commercial shop','commercial showroom','commercial office','godown', 'residential flat', 'residential plot', 'residential row house', 'residential bungalow', 'warehouse','residential builder floor','commercial industrial unit','commercial building'];
        sessionStorage.removeItem('selectedStateCityProperty');
        if (propertyTypeArray.length == 0) {
            stateCityProperty['defultProperty'] = true;
            stateCityProperty['state'] = selectedState;
            stateCityProperty['city'] = selectedCity;
            stateCityProperty['property'] = propertyTypeArray.length !== 0 ? propertyTypeArray : defaultPropertyTypeList;
        } else {
            stateCityProperty['defultProperty'] = false;
            stateCityProperty['state'] = selectedState;
            stateCityProperty['city'] = selectedCity;
            stateCityProperty['property'] = propertyTypeArray.length !== 0 ? propertyTypeArray : defaultPropertyTypeList;
        }
        sessionStorage.setItem('selectedStateCityProperty', JSON.stringify(stateCityProperty));
        /******* selected state,city,property type and deault property stroed session storage ***** */


        //var reqObj = {};
        // var queryParams = "?state=" + selectedState + "&location=" + selectedCity;
        if (!jsHelper.isDef(sessionStorage.getItem('completeResponse'))) {
            var reqObj = {};
            assetDisposalMisFilterObj.assetDisposalMis(reqObj).then(function (response) {
                var response = (typeof (response.response) == 'object') ? response.response : JSON.parse(response.response)
                sessionStorage.setItem('completeResponse', JSON.stringify(response));
                AssetImageApiCall()
            }).catch(function (error) {
                console.log(error)
            });
        } else {
            AssetImageApiCall()
        }
        

        function AssetImageApiCall() {
            assetDisposalMisFilterObj.getAssetImageAPICall('/content/tata-capital/retailapi.propertyImage.json', 'GET').then(function (imgRes) {
                $("body").removeClass("bg-loader");
                $(".loader").addClass("hide-loader");
                if (sessionStorage.getItem("propertyAssetImage")) {
                    sessionStorage.removeItem('propertyAssetImage');
                }
                var res = (typeof (imgRes) == 'object') ? imgRes : JSON.parse(imgRes);
                sessionStorage.setItem('propertyAssetImage', JSON.stringify(res));

                var resCityState = getMisStateCityData();
                var filterPropertyData = propertyTypeFilter(propertyTypeArray.length !== 0 ? propertyTypeArray : defaultPropertyTypeList, resCityState)

                /* all dropdown property type get */
                if (sessionStorage.getItem('stateCityAllProperty')) {
                    sessionStorage.removeItem('stateCityAllProperty');
                    var apiAllproperty = $('.jsMultiSelectList .select-item');
                    var allProperty = [];
                    $.each(apiAllproperty, function (ind, ele) {
                        if ($(ele).hasClass('active')) {
                            allProperty.push($(ele).data('item') + '|active')
                        } else {
                            allProperty.push($(ele).data('item'));
                        }
                    })
                    sessionStorage.setItem('stateCityAllProperty', JSON.stringify(allProperty))
                    var propArray = (typeof (sessionStorage.getItem('stateCityAllProperty')) == 'object') ? sessionStorage.getItem('stateCityAllProperty') : JSON.parse(sessionStorage.getItem('stateCityAllProperty'));
                    PropertyPopulate(propArray)
                }

                /************ respose data filter with property type ***************** */
                function propertyTypeFilter(propertyTypeArray, resCityState) {
                    const filteredDataArray = resCityState.filter((item) => {
                        const propertyType = item["property-type"].toLowerCase().trim();
                        return convertStringsToLowerCase(propertyTypeArray).includes(propertyType);
                      });
                      return filteredDataArray
                }

                sessionStorage.removeItem('disposalMisStateCityRes');
                sessionStorage.setItem('disposalMisStateCityRes', JSON.stringify(filterPropertyData))

                var fliterRoomBudgetAreaData = tataCapitalHousingFilter(filterPropertyData)
                createDealCards(fliterRoomBudgetAreaData);
                /************ respose data filter with property type ***************** */
            })
        }

        /******** mobile view search property listing data disply *********** */
        $('#mobState span').text($('[data-type="state"]').val().trim())
        $('#mobCity span').text($('[data-type="city"]').val().trim())
        $('#mobProperty span').text(selectPropertyTypeTextJoinedVal ? selectPropertyTypeTextJoinedVal : '')
        /******** mobile view search property listing data disply *********** */
        $('.jsFilterReset').trigger('click');
    })
}

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

function PropertyPopulate(data) {
    var html_code = '';
    var propertyTypeElement = $('#property-type');
    $(propertyTypeElement).html('');
    selectPropertyTypeArr = [];
    selectPropertyTypeTextJoinedVal = '';
    html_code += GeneratepropertyTypeTemplate(data);
    propertyTypeElement.append(html_code);
    selectPropertyTypeTextJoinedVal = selectPropertyTypeArr.join(', ');
    propertyTypeSelectTextDisply(selectPropertyTypeTextJoinedVal);
}

function GeneratepropertyTypeTemplate(info) {
    var str = '';
    if ((!info.toString().includes('|active'))) {
        info.forEach(function (ele) {
            selectPropertyTypeArr.push(ele);
            str += '<li class="select-item active" data-item="' + jsHelper.toSentence(ele) + '">' +
                '<label class="custom-checkbox-label">' +
                '<span class="custom-checkbox-new">' +
                '<input type="checkbox" checked data-event="' + jsHelper.toSentence(ele) + '" class="js-filterCheck" onchange="propertyTypeCheckLogic(this)">' +
                '<span class="checkbox-check"></span>' +
                '</span>' +
                '<span class="checkboxtext">' + jsHelper.toSentence(ele) + '</span>' +
                '</label>' +
                '</li>';
        })
    } else {
        info.forEach(function (ele) {
            if (ele.includes('active')) {
                var property = ele.split('|');
                selectPropertyTypeArr.push(property[0]);
                str += '<li class="select-item active" data-item="' + jsHelper.toSentence(property[0]) + '">' +
                    '<label class="custom-checkbox-label">' +
                    '<span class="custom-checkbox-new">' +
                    '<input type="checkbox" checked data-event="' + jsHelper.toSentence(property[0]) + '" class="js-filterCheck" onchange="propertyTypeCheckLogic(this)">' +
                    '<span class="checkbox-check"></span>' +
                    '</span>' +
                    '<span class="checkboxtext">' + jsHelper.toSentence(property[0]) + '</span>' +
                    '</label>' +
                    '</li>';
            } else {
                str += '<li class="select-item" data-item="' + jsHelper.toSentence(ele) + '">' +
                    '<label class="custom-checkbox-label">' +
                    '<span class="custom-checkbox-new">' +
                    '<input type="checkbox" data-event="' + jsHelper.toSentence(ele) + '" class="js-filterCheck" onchange="propertyTypeCheckLogic(this)">' +
                    '<span class="checkbox-check"></span>' +
                    '</span>' +
                    '<span class="checkboxtext">' + jsHelper.toSentence(ele) + '</span>' +
                    '</label>' +
                    '</li>';
            }
        })
    }
    return str;
}