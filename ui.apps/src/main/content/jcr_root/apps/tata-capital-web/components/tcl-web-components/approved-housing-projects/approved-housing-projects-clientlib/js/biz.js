(function (_global) {
    var approvedProjectsBizObj = {}
    
    var approvedProjectsBizCallFn = (function (jsHelper) {
        $(document).ready(function () {
            $("body").addClass("bg-loader");
            $(".loader").removeClass("hide-loader");
        function removeDuplicates(arr) {
            return arr.filter((item,
                index) => arr.indexOf(item) === index);
        };
        var selectArr = [];
        var joinedVal;
        var filteredProjectsArray = [];

        var builderFlag = false;
        var builderHtml = "";
        var buildersArrayMain = [];

        var filteredCities = {};
        var approvedProjectsArray = [];
        var buildersArray = [];
        var stateSelect = $('[jsname="selectState"]');
        var builderSelect = $('[jsname="selectBuilder"]');
        var reqObj = {};
        approvedProjectsFilterObj.approvedProjects(reqObj).then(
            function (response) {
                if (response.status.toLowerCase() == "success") {
                    $("body").removeClass("bg-loader");
                    $(".loader").addClass("hide-loader");
                    var approvedProjectsData = JSON.parse(response.response);
                    approvedProjectsData.Master.forEach(function (value, index) {
                        approvedProjectsResponse = {}
                        for (i in value) {
                            approvedProjectsResponse[i] = value[i];
                        }
                        approvedProjectsArray.push(approvedProjectsResponse)
                        var { city, state } = value;
                        buildersArrayMain.push(value['builder-company-name']);
                        if (filteredCities[state]) {
                            if (!filteredCities[state].includes(city)) {
                                filteredCities[state].push(city)
                            }
                        }
                        else {
                            filteredCities[state] = [city];
                        }
                    })
                    function getValues() {
                        stateSelect.empty();
                        builderSelect.empty();
                        stateSelect.append('<option value=""></option>');

                        builderHtml = "";
                        buildersArray = removeDuplicates(buildersArrayMain);
                        var statesArray = []
                        for (state in filteredCities) {
                            statesArray.push(state)
                        }
                        statesArray = statesArray.sort();
                        for (state in statesArray) {
                            stateSelect.append('<option value="' + statesArray[state] + '">' + statesArray[state] + '</option>')
                        }
                        buildersArray = buildersArray.sort()
                        for (builder in buildersArray) {
                            builderHtml +=
                                '<li class="select-item" data-item="' + buildersArray[builder] + '">' +
                                '<label class="custom-checkbox-label">' +
                                '<span class="custom-checkbox-new">' +
                                '<input type="checkbox" data-event="' + buildersArray[builder] + '" class="js-filterCheck">' +
                                '<span class="checkbox-check"></span>' +
                                '</span>' +
                                '<span class="checkboxtext">' + buildersArray[builder] + '</span>' +
                                '</label>' +
                                '</li>'
                        }
                        builderSelect.append(builderHtml);
                        $('.js-filterCheck').change(function () {
                            if ($('[jsname="selectState"]').val() == '') {
                                builderFlag = true;
                            }
                            var newSelectedArr = $(this).attr('data-event');
                            var selectedActualText = $('[data-item="' + newSelectedArr + '"] .checkboxtext').text();
                            var found = jQuery.inArray(selectedActualText, selectArr);
                            if (found >= 0) {
                                selectArr.splice(found, 1);
                                $('.jsMultiSelectList .select-item[data-item="' + newSelectedArr + '"]').removeClass('active');
                            } else {
                                selectArr.push(selectedActualText);
                                $('.jsMultiSelectList .select-item[data-item="' + newSelectedArr + '"]').addClass('active');
                            }
                            joinedVal = selectArr.join(', ');
                            if (joinedVal === '') {
                                $('.js-filterBtn a').text('Select');
                                $('.js-filterBtn a').css('color', '#828282');
                                $('.jsMulitSelectValue').val('Select')
                            } else {
                                $('.js-filterBtn a').text(joinedVal);
                                $('.js-filterBtn a').css('color', '#333333');
                                $('.jsMulitSelectValue').val(joinedVal);
                            }
                        });
                        $('[jsname="selectState"]').change(function () {
                            selectArr = [];
                            if (builderFlag) {
                                builderFlag = false;
                                $('.js-filterBtn a').text('Select');
                                $('.js-filterBtn a').css('color', '#828282');
                                $('.jsMulitSelectValue').val('Select')
                                $('.jsProjectForm .input-textbox').val('');
                                $('[jsname="selectBuilder"] .select-item.active').each(function () {
                                    $(this).removeClass('active');
                                });
                                $(".js-filterCheck").prop('checked', false);
                                // getValues();
                            } 
                                buildersArray = []
                                $('[jsname="selectCity"]').val(null).trigger('change');
                                $('[jsname="selectCity"]').empty();
                                $('[jsname="selectBuilder"]').empty();
                                $('[jsname="selectCity"]').append('<option value=""></option>');
                                builderHtml = ""
                                var value = $('[jsname="selectState"]').val();
                                if (value != '') {
                                    for (state in filteredCities) {
                                        if (state.toLowerCase() == value.toLowerCase()) {
                                            filteredCities[state] = filteredCities[state].sort();
                                            for (city in filteredCities[state]) {
                                                $('[jsname="selectCity"]').append('<option value="' + filteredCities[state][city] + '">' + filteredCities[state][city] + '</option>')
                                            }

                                        }
                                    }
                                    approvedProjectsArray.map(function (element) {
                                        if (element.state == value) {
                                            buildersArray.push(element['builder-company-name']);
                                            buildersArray = removeDuplicates(buildersArray);
                                            buildersArray = buildersArray.sort()
                                        }
                                    })
                                    for (builder in buildersArray) {
                                        builderHtml +=
                                            '<li class="select-item" data-item="' + buildersArray[builder] + '">' +
                                            '<label class="custom-checkbox-label">' +
                                            '<span class="custom-checkbox-new">' +
                                            '<input type="checkbox" data-event="' + buildersArray[builder] + '" class="js-filterCheck">' +
                                            '<span class="checkbox-check"></span>' +
                                            '</span>' +
                                            '<span class="checkboxtext">' + buildersArray[builder] + '</span>' +
                                            '</label>' +
                                            '</li>'
                                    }
                                    builderSelect.append(builderHtml);
                                    $('.js-filterCheck').change(function () {
                                        if ($('[jsname="selectState"]').val() == '') {
                                            builderFlag = true;
                                        }
                                        var newSelectedArr = $(this).attr('data-event');
                                        var selectedActualText = $('[data-item="' + newSelectedArr + '"] .checkboxtext').text();
                                        var found = jQuery.inArray(selectedActualText, selectArr);
                                        if (found >= 0) {
                                            selectArr.splice(found, 1);
                                            $('.jsMultiSelectList .select-item[data-item="' + newSelectedArr + '"]').removeClass('active');
                                        } else {
                                            selectArr.push(selectedActualText);
                                            $('.jsMultiSelectList .select-item[data-item="' + newSelectedArr + '"]').addClass('active');
                                        }
                                        joinedVal = selectArr.join(', ');
                                        if (joinedVal === '') {
                                            $('.js-filterBtn a').text('Select');
                                            $('.js-filterBtn a').css('color', '#828282');
                                            $('.jsMulitSelectValue').val('Select')
                                        } else {
                                            $('.js-filterBtn a').text(joinedVal);
                                            $('.js-filterBtn a').css('color', '#333333');
                                            $('.jsMulitSelectValue').val(joinedVal);
                                        }
                                    });
                                }
                            // }

                        });
                        $('[jsname="selectCity"]').on('change', function () {
                            if (builderFlag) {
                                $('.js-select2').val(null).trigger('change');
                                $('.js-filterBtn a').text('Select');
                                $('.js-filterBtn a').css('color', '#828282');
                                $('.jsMulitSelectValue').val('Select')
                                $('.jsProjectForm .input-textbox').val('');
                                $('[jsname="selectBuilder"] .select-item.active').each(function () {
                                    $(this).removeClass('active');
                                });
                                $(".js-filterCheck").prop('checked', false);
                            } else {
                                buildersArray = [];
                                selectArr = [];

                                builderHtml = "";
                                var stateValue = $('[jsname="selectState"]').val();
                                var cityValue = $('[jsname="selectCity"]').val();
                                $('.js-filterBtn a').text('Select');
                                $('.js-filterBtn a').css('color', '#828282');
                                $('.jsMulitSelectValue').val('Select')
                                $('.jsProjectForm .input-textbox').val('');
                                $('[jsname="selectBuilder"] .select-item.active').each(function () {
                                    $(this).removeClass('active');
                                });
                                $(".js-filterCheck").prop('checked', false);
                                $('[jsname="selectBuilder"]').empty();
                                if (cityValue != '') {
                                    approvedProjectsArray.map(function (element) {
                                        if (element.city == cityValue && element.state == stateValue) {
                                            buildersArray.push(element['builder-company-name']);
                                            buildersArray = removeDuplicates(buildersArray);
                                            buildersArray = buildersArray.sort()
                                        }
                                    })
                                    for (builder in buildersArray) {
                                        builderHtml +=
                                            '<li class="select-item" data-item="' + buildersArray[builder] + '">' +
                                            '<label class="custom-checkbox-label">' +
                                            '<span class="custom-checkbox-new">' +
                                            '<input type="checkbox" data-event="' + buildersArray[builder] + '" class="js-filterCheck">' +
                                            '<span class="checkbox-check"></span>' +
                                            '</span>' +
                                            '<span class="checkboxtext">' + buildersArray[builder] + '</span>' +
                                            '</label>' +
                                            '</li>'
                                    }
                                    builderSelect.append(builderHtml);
                                    $('.js-filterCheck').change(function () {
                                        if ($('[jsname="selectState"]').val() == '') {
                                            builderFlag = true;
                                        }
                                        var newSelectedArr = $(this).attr('data-event');
                                        var selectedActualText = $('[data-item="' + newSelectedArr + '"] .checkboxtext').text();
                                        var found = jQuery.inArray(selectedActualText, selectArr);
                                        if (found >= 0) {
                                            selectArr.splice(found, 1);
                                            $('.jsMultiSelectList .select-item[data-item="' + newSelectedArr + '"]').removeClass('active');
                                        } else {
                                            selectArr.push(selectedActualText);
                                            $('.jsMultiSelectList .select-item[data-item="' + newSelectedArr + '"]').addClass('active');
                                        }
                                        joinedVal = selectArr.join(', ');
                                        if (joinedVal === '') {
                                            $('.js-filterBtn a').text('Select');
                                            $('.js-filterBtn a').css('color', '#828282');
                                            $('.jsMulitSelectValue').val('Select')
                                        } else {
                                            $('.js-filterBtn a').text(joinedVal);
                                            $('.js-filterBtn a').css('color', '#333333');
                                            $('.jsMulitSelectValue').val(joinedVal);
                                        }
                                    });
                                }
                            }
                        });
                        $(".jsSearchInput").on("input", function() {
                            var value = $(this).val().toLowerCase();
                            $(".jsMultiSelectList li").filter(function() {
                                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                            });
                            if($(".jsMultiSelectList li").is(':visible')){
                                $('.jsNoSearchResult').addClass('d-none');
                            }else{
                                $('.jsNoSearchResult').removeClass('d-none');
                            }
                        });
                    }
                    getValues();

                    function filter() {
                        var filteredArray = [];
                        var stateVal = $('[jsname="selectState"]').val();
                        var cityVal = $('[jsname="selectCity"]').val();
                        var builderValue = selectArr;
                        if (!builderFlag) {

                            if (stateVal != '') {
                                if (cityVal != '' && builderValue.length == 0) {
                                    filteredArray = approvedProjectsArray.filter(function (card) {
                                        if (card.state == stateVal && card.city == cityVal) {
                                            return card;
                                        }
                                    })
                                    filteredProjectsArray.push(...filteredArray)
                                    console.log("filter", filteredProjectsArray)
                                }
                                else if (cityVal == '' && builderValue.length > 0) {
                                    builderValue.forEach(function (builder) {
                                        filteredArray = approvedProjectsArray.filter(function (card) {
                                            if (card.state == stateVal && (card['builder-company-name']) == builder) {
                                                return card;
                                            }
                                        })
                                        filteredProjectsArray.push(...filteredArray)
                                    })
                                    console.log("filter", filteredProjectsArray)
                                }
                                else if (cityVal != '' && builderValue.length > 0) {
                                    builderValue.forEach(function (builder) {
                                        filteredArray = approvedProjectsArray.filter(function (card) {
                                            if (card.state == stateVal && (card['builder-company-name']) == builder && card.city == cityVal) {
                                                return card;
                                            }
                                        })
                                        filteredProjectsArray.push(...filteredArray)
                                    })
                                    console.log("filter", filteredProjectsArray)
                                }
                                else {
                                    filteredArray = approvedProjectsArray.filter(function (card) {
                                        if (card.state == stateVal) {
                                            return card;
                                        }
                                    })
                                    filteredProjectsArray.push(...filteredArray)
                                    console.log("filter", filteredProjectsArray)
                                }
                            }
                        }
                        else {
                            if (builderValue.length > 0) {
                                builderValue.forEach(function (builder) {
                                    filteredArray = approvedProjectsArray.filter(function (card) {
                                        if ((card['builder-company-name']) == builder) {
                                            return card;
                                        }
                                    })
                                    filteredProjectsArray.push(...filteredArray)
                                })
                                console.log("filter", filteredProjectsArray)

                            }
                        }
                        populateCard();
                    }

                    function populateCard() {
                        if(filteredProjectsArray.length){
                        var cardHtml = ''
                        if(!$('[jsname="approvedProjectResult"]').hasClass('approved-proj-box space-tb40 space-b80')){
                           $('[jsname="approvedProjectResult"]').addClass('approved-proj-box space-tb40 space-b80')
                         }
                        if (filteredProjectsArray.length == 1) {
                            var cardTitleHtml = '<h2 class="heading36">You have ' + filteredProjectsArray.length + ' <span> approved project in your location</span> </h2>'
                        }
                        else {
                            var cardTitleHtml = '<h2 class="heading36">You have ' + filteredProjectsArray.length + ' <span> approved projects in your location</span> </h2>'
                        }
                        $('[jsname="approvedProjectCardTitle"]').html(cardTitleHtml)
                        filteredProjectsArray.map(function (project) {
                            cardHtml += '<div class="approved-proj-row">' +
                                '<div class="approved-proj-col bg-div">' +
                                '<div class="top-content">' +
                                '<p class="ref-number">RERA No: ' + project['rera-registration-number'] + '</p>' +
                                '<h3 class="heading20 company-details">' +
                                '<span>' + project['project-name'] + '</span>' +
                                '</h3>' +
                                '<p class="mahindra-dev text14i semibold"> Builder: ' + project['builder-company-name'] + '</p>' +
                                '<p class="text14i proj-description">' + project['postal-address'] + '</p>' +
                                '</div>' +
                                '<div class="bottom-content">' +
                                '<a href="'+approvedProjectApplyNowUrl+'" target="_blank" class="btn-blue btn14"> Apply Now </a>' +
                                '</div>' +
                                '</div>' +
                                '</div>'
                        })
                        $('[jsname="approvedProjectCard"]').html(cardHtml);
                    }
                    }
                    $('[jsname="showProject"]').on('click', function () {
                        filteredProjectsArray = [];
                        filter();

                    })

                }
            }).catch(function (error) { console.log(error)}); 
        })
        return jsHelper.freezeObj(approvedProjectsBizObj);
    })(jsHelper); _global.jsHelper.defineReadOnlyObjProp(_global, "approvedProjectsBizObj", approvedProjectsBizCallFn);
})(this || window || {});

