var excelValues = [];
var editedStockCount = 0;
var excelStockCount = 0;
var uploadedExcelData = [];
var companyData;
var stockrowcount = 0;
selectedCompaniesData = new Array();
var groupValue;
var LasLogic = {};
var addstockrow;
var jsHelper = {};
var parseIntString;
var lasStockRow = '';
jsHelper.splitByHypen = function (param) {
    var contains = (arguments[1] === undefined) ? " " : arguments[1];
    return param.split(contains).join("-").toLowerCase();
}
jsHelper.toCapitalise = function (ccParam) {
    return ccParam.split("-").map(function (el) { return el.substr(0, 1).toUpperCase() + el.substr(1).toLowerCase(); }).join(" ");
}
jsHelper.jsonDeepCopy = function (json) {
    return JSON.parse(JSON.stringify(json));
}
parseIntString = function (param) {
    return (typeof (param) !== "number") ? Math.round(parseInt(param)) : Math.round(param)
}
$(document).ready(function () {
    addstockrow = $('.las-stock-table .las-stock-body .las-stock-row').clone();
})

$('[data-upload="confirm"]').off().on("click", function () {
    //$('.form-drag').find('.drag-panel').addClass('hidden');
    //$('.form-drag').find('#drag02').removeClass('hidden');
    var formdata = new FormData();
    if ($('[data-file="browse"]')[0].files.length > 0) {
        formdata.append("userLasData", $('[data-file="browse"]')[0].files[0]); //bookmark
        $.ajax({
            type: "POST",
            data: formdata,
            url: location.origin + "/content/tata-capital/userlasupload.getUserData.json",
            async: true,
            contentType: false,
            processData: false,
            success: function (responseText) {
                var isExcelData = true;
                var response;
                try {
                    response = typeof (responseText) == "object" ? responseText : JSON.parse(responseText);
                } catch (e) {
                    response = "fail";
                }
                if (response !== "fail" && response.userDataArray.length > 0) {
                    excelStockCount += response.userDataArray.length;
                    uploadedExcelData = response.userDataArray;
                    uploadedExcelData.forEach(function (ele) {
                        ele.quantity = ele.quantity < 0 ? 0 : ele.quantity;
                        populateExcelData(ele.companyName, null, ele, addstockrow, isExcelData, true);

                    });
                    $('.js-stockCount').find('span').text(selectedCompaniesData.length);
                    selectedCompaniesData.forEach(function (company) {
                        // debugger
                        createLasCard(company)

                    })
                    renderLasCard(lasStockRow)
                    lasCalculator()
                    // $('body').find('.form-drag #drag02').addClass('hidden');
                    // $('body').find('.form-drag #drag03 .file').text($('[data-file="browse"]')[0].files[0].name);
                    // $('body').find('.form-drag #drag03').removeClass('hidden');
                }
                else {
                    // $('body').find('.form-drag #drag02').addClass('hidden');
                    // $('body').find('.form-drag #drag04 .file').text($('[data-file="browse"]')[0].files[0].name);
                    // $('body').find('.form-drag #drag04').removeClass('hidden');
                }
            },
            error: function () {
                $('body').find('.form-drag #drag02').addClass('hidden');
                $('body').find('.form-drag #drag04 .file').text($('[data-file="browse"]')[0].files[0].name);
                $('body').find('.form-drag #drag04').removeClass('hidden');
            }
        });
        // var ele_next = $(this).data('next');

        // $('body').find('.form-drag .drag-panel').addClass('hidden');
        // $('body').find(ele_next).removeClass('hidden');


        // $('.js-clear-all').removeClass('disabled');
    }
    else {
        // $('body').find('.form-drag #drag02').addClass('hidden');
        // $('body').find('.form-drag #drag04 .file').text($('[data-file="browse"]')[0].files[0].name);
        // $('body').find('.form-drag #drag04').removeClass('hidden');
    }
});


populateExcelData = function (companyname, context, ele, addstockrow, isExcelData, isUpload) {
    UiManupulationFn.updateCompModel(ele.companyName, null, stocks, ele, isExcelData, isUpload);

    // UiManupulationFn.multiplyNode(addstockrow, ele.quantity, isExcelData);
    // editedStocks();


    // console.log("Entered json loop");
}


//
var UiManupulationFn = {};
// UiManupulationFn.populatecompanyname = function (elem, companyData, isExcelData) {
//     if (isExcelData != true)
//         isExcelData = false;
//     var populateContext;
//     elem = (elem === null) ? $(".las-companyname-textbox .gray-textbox") : elem.find(".gray-textbox");
//     var _companyData = companyData;
//     var _companyname = companyData.map(function (el) { return el.companyname });

//     elem.autocomplete({
//         source: _companyname,
//         select: function (event, ui) {
//             populateContext = $(event.target).parents(".las-main-inner").length > 0 ? $(event.target).parents(".las-main-inner") : $(event.target).parents(".las-stock-row");

//             UiManupulationFn.updateCompModel(ui.item.value,
//                 populateContext,
//                 _companyData, null, isExcelData);
//         }
//     });
// }

UiManupulationFn.updateCompModel = function (selectedCompany, context, companyData, element, isExcelData, isUpload) {
    try {
        if (isUpload !== true) {
            isUpload = false;
        }
        var _newJson = JSON.parse(JSON.stringify(emptyCompanyJson));
        var isrow;
        var _selectedCompanyJson = UiManupulationFn.getSelectedCompanyData(selectedCompany, companyData, element, isExcelData, isUpload);
        var selectedContexts = selectedCompaniesData.map(function (el) { return el.domElement });
        if (context === null)
            var selectedConetxtIndex = -1;
        else
            var selectedConetxtIndex = selectedContexts.indexOf(context[0]);
        if (selectedConetxtIndex === -1) {
            _newJson.domElement = context !== null ? context[0] : "";
            _newJson.companyname = _selectedCompanyJson.companyname;
            _newJson.price = _selectedCompanyJson.price;
            _newJson.lTVperc = _selectedCompanyJson.ltv;
            _newJson.stockId = element.stockId;
            if (context == null)
                _newJson.quantity = element.quantity;
            _newJson.category = _selectedCompanyJson.proposedcategory;
            selectedCompaniesData.push(_newJson);

            if (context !== null)
                context.find(".las-company-stock .company-info")[0].innerText = _selectedCompanyJson.companyname + " recognized as " + _selectedCompanyJson.proposedcategory + " company";
        }



        else {
            if (context !== null && isExcelData && !context.hasClass('warning')) {
                var jsonObj = {};
                jsonObj.oldcompanyname = selectedCompaniesData[selectedConetxtIndex].companyname;
                jsonObj.oldQuantity = selectedCompaniesData[selectedConetxtIndex].quantity;
                jsonObj.newcompanyname = _selectedCompanyJson.companyname;
                jsonObj.newQuantity = 0;
                jsonObj.contextIndex = selectedConetxtIndex;
                excelValues.push(jsonObj);
                context.addClass("warning");
                // editedStocks();

            }
            else if (context !== null && isExcelData && context.hasClass('warning')) {
                excelValues.forEach(function (e) {
                    if (e.contextIndex == selectedConetxtIndex) {
                        e.newcompanyname = _selectedCompanyJson.companyname;
                        e.newQuantity = 0;
                    }
                });
            }

            selectedCompaniesData[selectedConetxtIndex].domElement = context !== null ? context[0] : "";
            selectedCompaniesData[selectedConetxtIndex].companyname = _selectedCompanyJson.companyname;
            selectedCompaniesData[selectedConetxtIndex].price = _selectedCompanyJson.price;
            selectedCompaniesData[selectedConetxtIndex].lTVperc = _selectedCompanyJson.ltv;

            selectedCompaniesData[selectedConetxtIndex].category = _selectedCompanyJson.proposedcategory;
            if (context == null)
                selectedCompaniesData[selectedConetxtIndex].quantity = element.quantity;
            else {
                selectedCompaniesData[selectedConetxtIndex].quantity = 0;
                if (context.hasClass('las-main-inner')) {
                    isrow = false;
                    context.find(".las-company-stock .company-info")[0].innerText = selectedCompaniesData[selectedConetxtIndex].companyname + " recognized as " + selectedCompaniesData[selectedConetxtIndex].category + " company";
                }
                else {
                    isrow = true;
                    context.find(".las-stock-name p")[0].innerText = selectedCompaniesData[selectedConetxtIndex].companyname + " recognized as " + selectedCompaniesData[selectedConetxtIndex].category + " company";
                }
            }

        }
        if (context != null) {
            $(context).find(".quantity").val("");
            $(context).find(".sxq").text("0");
            $(context).find(".ela").text("0");
        }

        // lasCalculator(selectedCompaniesData, isrow);
    } catch (e) {
        console.error(e);
    }
}
UiManupulationFn.getSelectedCompanyData = function (selectedcompanyname, companyData, element, isExcelData, isUpload) {
    if (isExcelData && isUpload) {
        return companyData.filter(function (ele) { if (ele.companyname.toUpperCase() === selectedcompanyname.toUpperCase() || ele.cdisinno === element.isinNo) { return ele } })[0]
    }
    else {
        return companyData.filter(function (ele) { if (ele.companyname.toUpperCase() === selectedcompanyname.toUpperCase()) { return ele } })[0]
    }
}

UiManupulationFn.quantityTrigger = function (elem, isExcelData) {
    if (isExcelData != true)
        isExcelData = false;
    var _elem = (elem === null) ? $(".las-company-textbox .gray-textbox") : elem.find('.las-qty input').length > 0 ? elem.find('.las-qty input') : (elem.find(".gray-textbox"));
    if (_elem.parents('.las-qty').length == 0) {
        _elem.on("change input", function (e) {
            var context = $(this).parents(".las-main-inner");
            var selectedContexts = selectedCompaniesData.map(function (el) { return el.domElement });
            var selectedConetxtIndex = selectedContexts.indexOf(context[0]);
            if (selectedConetxtIndex !== -1) {
                selectedCompaniesData[selectedConetxtIndex].quantity = ($(this).val() !== "") ? parseInt($(this).val()) : 0;
                lasCalculator(selectedCompaniesData, false);
            }
        });
    }
    else {
        _elem.on("change input", function (e) {
            var context = $(this).parents(".las-stock-row");
            var selectedContexts = selectedCompaniesData.map(function (el) { return el.domElement });
            var selectedConetxtIndex = selectedContexts.indexOf(context[0]);
            if (selectedConetxtIndex !== -1) {

                if (context !== null && isExcelData && !context.hasClass('warning')) {
                    var jsonObj = {};
                    jsonObj.oldcompanyname = selectedCompaniesData[selectedConetxtIndex].companyname;
                    jsonObj.oldQuantity = selectedCompaniesData[selectedConetxtIndex].quantity;
                    jsonObj.newcompanyname = jsonObj.oldcompanyname;
                    jsonObj.newQuantity = ($(this).val() !== "") ? parseInt($(this).val()) : 0;
                    jsonObj.contextIndex = selectedConetxtIndex;
                    excelValues.push(jsonObj);
                    context.addClass("warning");
                    editedStocks();
                }
                else if (context !== null && isExcelData && context.hasClass('warning')) {
                    excelValues.forEach(function (exVal) {
                        if (exVal.contextIndex == selectedConetxtIndex) {

                            exVal.newQuantity = ($(e.target).val() !== "") ? parseInt($(e.target).val()) : 0;
                        }
                    });
                }
                selectedCompaniesData[selectedConetxtIndex].quantity = ($(this).val() !== "") ? parseInt($(this).val()) : 0;
                lasCalculator(selectedCompaniesData, true, context);
            }
        });

    }
}

function lasCalculator(is_row) {
    // debugger;
    var textValue = $('[jsName="shareQuantity"]');
    var _eligibalLoanAmt = 0;
    var _netShareVal = 0;

    var groupCatCodes = selectedCompaniesData.map(function (el) { return el.category.toUpperCase() });
    if (selectedCompaniesData.length > 0) {

        selectedCompaniesData.forEach(function (selectedCompanyData) {
            var _groupVal = LasLogic.getGroupValue(selectedCompaniesData);
            try {
                var _groupCatValue = LasLogic.getGroupCatValue(selectedCompanyData.category, selectedCompaniesData);
                var context = $(selectedCompanyData.domElement);
                if (context.hasClass('las-stock-row')) {
                    is_row = true;
                }
                else {
                    is_row = false;
                }
                var _totalShareVal = 0;
                var _eligibalAmt = 0;
                var _quantity = Number(selectedCompanyData.quantity.toString().replace(/,/g, ''));
                var _price = Number(selectedCompanyData.price.toString().replace(/,/g, ''));
                var _ltv = parseIntString(selectedCompanyData.lTVperc);
                errorText = "";
                if (context !== null) {
                    context.find(".error").text(errorText);
                    context.find(".las-value p").removeClass("red");
                    context.find(".las-value-share-quantity .las-company-values p").removeClass("red");
                }


                switch (selectedCompanyData.category.toUpperCase()) {
                    case "SUPER CAT A":
                        _totalShareVal = _quantity * _price;
                        _eligibalAmt = _totalShareVal * _ltv / 100;
                        if (_eligibalLoanAmt <= maxValues.totalMaxAmount) {
                            _netShareVal += _totalShareVal;

                            if (_eligibalAmt >= maxValues.superCatA) {
                                _eligibalLoanAmt += _eligibalAmt;
                                textValue.addClass('text-red');
                                textValue.html('Value of Share X Quantity: ₹' + _totalShareVal.toLocaleString("EN-IN"));
                                categoryTextValue.innerHTML = " Super Category A: Your eligible loan amount cannot exceed ₹7.5Cr per scrip. "
                            }
                            else {
                                _eligibalAmt = _eligibalAmt;
                                _eligibalLoanAmt += _eligibalAmt;
                            }
                        }
                        else {
                            _netShareVal += _totalShareVal;
                        }
                        break;
                    case "CAT A":
                        _totalShareVal = _quantity * _price;
                        _eligibalAmt = _totalShareVal * _ltv / 100;
                        if (_eligibalLoanAmt <= maxValues.totalMaxAmount) {
                            _netShareVal += _totalShareVal;

                            if (_eligibalAmt >= maxValues.catA) {
                                _eligibalLoanAmt += _eligibalAmt;
                                textValue.addClass('text-red');
                                textValue.html('Value of Share X Quantity: ₹' + _totalShareVal.toLocaleString("EN-IN"));
                                categoryTextValue.innerHTML = " Category A: Your eligible loan amount cannot exceed ₹3Cr per scrip.. "
                            }
                            else {
                                _eligibalAmt = _eligibalAmt;
                                _eligibalLoanAmt += _eligibalAmt;
                            }

                        }
                        break;
                    case "CAT B":
                        _totalShareVal = _quantity * _price;
                        _eligibalAmt = _totalShareVal * _ltv / 100;
                        if (_eligibalLoanAmt <= maxValues.totalMaxAmount) {
                            _netShareVal += _totalShareVal;
                            if (groupCatCodes.length <= 3) {
                                var Bflag = false;
                                selectedCompaniesData.forEach(function (el) { if (el.quantity === 0) { Bflag = true } });
                                if ((groupCatCodes.length === 1 && (groupCatCodes[0]).toUpperCase() === "CAT B") ||
                                    (groupCatCodes.length === 2 && (groupCatCodes[0]).toUpperCase() === "CAT B" && (groupCatCodes[1]).toUpperCase() === "CAT B") ||
                                    (groupCatCodes.length === 3 && (groupCatCodes[0]).toUpperCase() === "CAT B" && (groupCatCodes[1]).toUpperCase() === "CAT B" && (groupCatCodes[2]).toUpperCase() === "CAT B" && Bflag)) {
                                    // $(context).find(".las-calc-container-element-msg").show();
                                    errorText = "Category B: Your eligible loan amount per scrip cannot exceed 40% of the total loan amount.";
                                    context.find(".error").text(errorText);
                                    context.find(".las-value p").addClass("red");
                                    context.find(".las-value-share-quantity .las-company-values p").addClass("red");
                                    // $(context).find(".las-calc-container-element-core-info-display").first().css("color", "#ff0000");
                                    // $(context).find(".rate-share").first().css("color", "#ff0000");
                                    // $(context).find(".cat-c-text").show();
                                    if (!is_row) {
                                        $(".las-value-share-quantity .las-company-values p span").html(parseInt(_totalShareVal).toLocaleString("en-in"));
                                        $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                                    }
                                    else {
                                        context.find(".las-value p").html(parseInt(_totalShareVal).toLocaleString("en-in"));
                                        context.find(".las-eli-amt p").html(0);
                                    }
                                    break;
                                }
                                if (_eligibalAmt > _groupVal * maxValues.catBPerc) {
                                    _eligibalAmt = _groupVal * maxValues.catBPerc;
                                    // selectedCompaniesData.exceedFlag = true;
                                    // _eligibalLoanAmt += _eligibalAmt;
                                    // console.warn("exceeded...");
                                    // $(context).find(".las-calc-container-element-msg").show();
                                    textValue.addClass('text-red');
                                    textValue.html('Value of Share X Quantity: ₹' + _totalShareVal.toLocaleString("EN-IN"));
                                    categoryTextValue.innerHTML = "Category B: Your eligible loan amount per scrip cannot exceed 40% of the total loan amount."
                                    // $(context).find(".las-calc-container-element-core-info-display").first().css("color", "#ff0000");
                                    // $(context).find(".rate-share").first().css("color", "#ff0000");
                                    // $(context).find(".cat-c-text").show();
                                    break;
                                } else {
                                    _eligibalAmt = _eligibalAmt;
                                    // selectedCompaniesData.exceedFlag = false;
                                    _eligibalLoanAmt += _eligibalAmt;
                                    // console.log("success");
                                    // $(context).find(".las-calc-container-element-core-info-display").first().css("color", "");
                                    // $(context).find(".rate-share").first().css("color", "");
                                    // $(context).find(".cat-c-text").text("");
                                    textValue.removeClass('text-red');
                                    textValue.html('Value of Share X Quantity: ₹' + _totalShareVal.toLocaleString("EN-IN"));
                                    categoryTextValue.innerHTML = ""
                                }
                                if (_eligibalLoanAmt > maxValues.totalMaxAmount) {
                                    var _exceededAmt = _eligibalLoanAmt - maxValues.totalMaxAmount;
                                    _eligibalAmt -= _exceededAmt;
                                    _eligibalLoanAmt -= _exceededAmt;
                                }
                                break;
                            } else {
                                _netShareVal += _totalShareVal;
                                break;


                            }
                        }
                        break;
                    case "CAT C":
                        _totalShareVal = _quantity * _price;
                        _eligibalAmt = _totalShareVal * _ltv / 100;
                        if (groupCatCodes.indexOf("SUPER CAT A") === -1 && groupCatCodes.indexOf("CAT A") === -1 && groupCatCodes.indexOf("CAT B") === -1) {
                            // debugger;
                            _netShareVal += _totalShareVal;
                            textValue.addClass('text-red');
                            textValue.html('Value of Share X Quantity: ₹' + _totalShareVal.toLocaleString("EN-IN"));
                            categoryTextValue.innerHTML = "Category C: Scrips cannot be pledged alone, need to pledge Super CAT-A, CAT-A or CAT-B along with CAT-C "

                            break;
                        }
                        if (_groupCatValue <= _groupVal * maxValues.groupCatCPerc && _eligibalLoanAmt < maxValues.totalMaxAmount) {
                            _netShareVal += _totalShareVal;
                            if (_eligibalAmt > _groupVal * maxValues.catCPerc) {
                                _eligibalAmt = _groupVal * maxValues.catCPerc;

                                textValue.addClass('text-red');
                                textValue.html('Value of Share X Quantity: ₹' + _totalShareVal.toLocaleString("EN-IN"));
                                categoryTextValue.innerHTML = "Category C: Add another scrip or reduce the pledged share value."

                                break;
                            } else {
                                _eligibalAmt = _eligibalAmt;
                                _eligibalLoanAmt += _eligibalAmt;
                                textValue.removeClass('text-red');
                                textValue.html('Value of Share X Quantity: ₹' + _totalShareVal.toLocaleString("EN-IN"));
                                categoryTextValue.innerHTML = ""

                            }
                            if (_eligibalLoanAmt > maxValues.totalMaxAmount) {
                                var _exceededAmt = _eligibalLoanAmt - maxValues.totalMaxAmount;
                                _eligibalAmt -= _exceededAmt;
                                _eligibalLoanAmt -= _exceededAmt;
                            }
                            break;
                        } else {
                            _netShareVal += _totalShareVal;
                            if (_groupCatValue > _groupVal * maxValues.groupCatCPerc && _eligibalLoanAmt < maxValues.totalMaxAmount) {
                                textValue.addClass('text-red');
                                textValue.html('Value of Share X Quantity: ₹' + _totalShareVal.toLocaleString("EN-IN"));
                                categoryTextValue.innerHTML = "Category C: Add another scrip or reduce the pledged share value";

                                break;
                            }
                            break;
                        }
                        break;
                    case "CAT D":
                        _totalShareVal = _quantity * _price;
                        _eligibalAmt = _totalShareVal * _ltv / 100;
                        if (groupCatCodes.indexOf("SUPER CAT A") === -1 && groupCatCodes.indexOf("CAT A") === -1 && groupCatCodes.indexOf("CAT B") === -1) {
                            _netShareVal += _totalShareVal;
                            // $(context).find(".las-calc-container-element-core-info-display").first().css("color", "#ff0000");
                            // $(context).find(".rate-share").first().css("color", "#ff0000");
                            // errorText="Category D: Scrips cannot be pledged alone, need to pledge Super CAT-A, CAT-A or CAT-B along with CAT-D";
                            // context.find(".error").text(errorText);
                            //     context.find(".las-value p").addClass("red");
                            //     context.find(".las-value-share-quantity .las-company-values p").addClass("red");
                            textValue.addClass('text-red');
                            textValue.html('Value of Share X Quantity: ₹' + _totalShareVal.toLocaleString("EN-IN"));
                            categoryTextValue.innerHTML = "Category D: Scrips cannot be pledged alone, need to pledge Super CAT-A, CAT-A or CAT-B along with CAT-D";

                            // $(context).find(".cat-c-text").show();
                            break;
                        }
                        if (_groupCatValue <= _groupVal * maxValues.groupCatDPerc && _eligibalLoanAmt < maxValues.totalMaxAmount) {
                            _netShareVal += _totalShareVal;
                            if (_eligibalAmt > _groupVal * maxValues.catDPerc) {
                                _eligibalAmt = _groupVal * maxValues.catDPerc;
                                // selectedCompanyData.exceedFlag = true;
                                _eligibalLoanAmt += _eligibalAmt;
                                // console.warn("exceeded...");
                                // $(context).find(".las-calc-container-element-msg").show();
                                // errorText="Category D: Add another scrip or reduce the pledged share value.";
                                // context.find(".error").text(errorText);
                                // context.find(".las-value p").addClass("red");
                                // context.find(".las-value-share-quantity .las-company-values p").addClass("red");
                                textValue.addClass('text-red');
                                textValue.html('Value of Share X Quantity: ₹' + _totalShareVal.toLocaleString("EN-IN"));
                                categoryTextValue.innerHTML = "Category D: Add another scrip or reduce the pledged share value.";
                            } else {
                                _eligibalAmt = _eligibalAmt;
                                // selectedCompanyData.exceedFlag = false;
                                _eligibalLoanAmt += _eligibalAmt;
                                // console.log("success");
                                // $(context).find(".las-calc-container-element-core-info-display").first().css("color", "");
                                // $(context).find(".rate-share").first().css("color", "");
                                // $(context).find(".cat-c-text").text("");
                                // errorText="";
                                // context.find(".error").text(errorText);
                                // context.find(".las-value p").removeClass("red");
                                // context.find(".las-value-share-quantity .las-company-values p").removeClass("red");
                                textValue.removeClass('text-red');
                                textValue.html('Value of Share X Quantity: ₹' + _totalShareVal.toLocaleString("EN-IN"));
                                categoryTextValue.innerHTML = "";
                            }
                            if (_eligibalLoanAmt > maxValues.totalMaxAmount) {
                                var _exceededAmt = _eligibalLoanAmt - maxValues.totalMaxAmount;
                                _eligibalAmt -= _exceededAmt;
                                _eligibalLoanAmt -= _exceededAmt;
                            }

                            break;
                        } else {
                            _netShareVal += _totalShareVal;
                            if (_groupCatValue > _groupVal * maxValues.groupCatDPerc && _eligibalLoanAmt < maxValues.totalMaxAmount) {
                                // $(context).find(".las-calc-container-element-msg").show();
                                // errorText="Category D: Add another scrip or reduce the pledged share value.";
                                // context.find(".error").text(errorText);
                                // context.find(".las-value p").addClass("red");
                                // context.find(".las-value-share-quantity .las-company-values p").addClass("red");
                                textValue.addClass('text-red');
                                textValue.html('Value of Share X Quantity: ₹' + _totalShareVal.toLocaleString("EN-IN"));
                                categoryTextValue.innerHTML = "Category D: Add another scrip or reduce the pledged share value.";
                                // $(context).find(".las-calc-container-element-core-info-display").first().css("color", "#ff0000");
                                // $(context).find(".rate-share").first().css("color", "#ff0000");
                                // $(context).find(".cat-c-text").show();

                                break;
                            }

                            break;
                        }


                    default:
                        console.log("Category Not Found");
                        break;
                }
                $(".las-tnv").html("₹" + parseIntString(_netShareVal).toLocaleString("en-in"));
                $(".las-ela").html("₹" + parseIntString(_eligibalLoanAmt).toLocaleString("en-in"));
            } catch (e) {
                console.error(e);
            }
        });

    }
    else {
        $(".las-tnv").html("₹0*");
        $(".las-ela").html("₹0*");
    }
}
LasLogic.getGroupValue = function (wholeCompanyJson) {
    var _groupValArr = [];
    // var _groupShareValue = LasLogic.getGroupShareValue(wholeCompanyJson);
    // var groupVal = 0;
    wholeCompanyJson.forEach(function (el) {
        var shareValue = !isNaN(parseInt(el.price)) ? parseInt(el.price) : 0;
        var shareQuantity = !isNaN(parseInt(el.quantity)) ? parseInt(el.quantity) : 0;
        var ltv = !isNaN(parseInt(el.ltv)) ? parseInt(el.ltv) : 0;
        if (shareQuantity !== 0) {
            var particularVal = function () {
                switch ((el.category).toUpperCase()) {
                    case "SUPER CAT A":
                        return ((shareValue * shareQuantity) * (ltv / 100) > maxValues.superCatA) ? maxValues.superCatA : (shareValue * shareQuantity) * (ltv / 100);
                    case "CAT A":
                        return ((shareValue * shareQuantity) * (ltv / 100) > maxValues.catA) ? maxValues.catA : (shareValue * shareQuantity) * (ltv / 100);
                    case "CAT B":
                        return ((shareValue * shareQuantity) * (ltv / 100) > (groupValue * maxValues.catBPerc)) ? ((groupValue * (ltv / 100)) * maxValues.catBPerc) : (shareValue * shareQuantity) * (ltv / 100);
                    case "CAT C":
                        return ((shareValue * shareQuantity) * (ltv / 100) > (groupValue * maxValues.catCPerc)) ? ((groupValue * (ltv / 100)) * maxValues.catCPerc) : (shareValue * shareQuantity) * (ltv / 100);
                    case "CAT D":
                        return ((shareValue * shareQuantity) * (ltv / 100) > (groupValue * maxValues.catDPerc)) ? ((groupValue * (ltv / 100)) * maxValues.catDPerc) : (shareValue * shareQuantity) * (ltv / 100);
                    default:
                        return (shareValue * shareQuantity) * (ltv / 100);
                }
            }
            _groupValArr.push(particularVal());
        }
    });
    if (_groupValArr.length !== 0) {
        groupVal = _groupValArr.reduce(function (a, b) { return a + b });
        return (groupVal > maxValues.totalMaxAmount) ? maxValues.totalMaxAmount : groupVal;
    }
    return 0;
}
LasLogic.getGroupShareValue = function (wholeCompanyJson) {
    var groupValArr = [];
    wholeCompanyJson.forEach(function (el) {
        var shareValue = !isNaN(parseInt(el.price)) ? parseInt(el.price) : 0;
        var shareQuantity = !isNaN(parseInt(el.quantity)) ? parseInt(el.quantity) : 0;
        var ltv = !isNaN(parseInt(el.ltv)) ? parseInt(el.ltv) : 0;
        if (shareQuantity !== 0) {
            groupValArr.push((shareValue * shareQuantity));
        }
    });
    if (groupValArr.length !== 0) {
        var groupValues = groupValArr.reduce(function (a, b) { return a + b });
        return (groupValues > maxValues.totalMaxAmount) ? maxValues.totalMaxAmount : groupValues;
    }
    return 0;
}
LasLogic.getGroupCatValue = function (catForFltr, wholeCompanyJson) {
    var groupValArr = [];
    if (catForFltr.toUpperCase() === "CAT C" || catForFltr.toUpperCase() === "CAT D") {
        wholeCompanyJson.forEach(function (el) {
            if ((el.proposedcategory).toUpperCase() === catForFltr.toUpperCase()) {
                var shareValue = !isNaN(parseInt(el.price)) ? parseInt(el.price) : 0;
                var shareQuantity = !isNaN(parseInt(el.quantity)) ? parseInt(el.quantity) : 0;
                var ltv = !isNaN(parseInt(el.ltv)) ? parseInt(el.ltv) : 0;
                if (shareQuantity !== 0) {
                    groupValArr.push((shareValue * shareQuantity) * (ltv / 100));
                }
            }
        });

    }
    if (groupValArr.length !== 0) {
        var groupCatValues = groupValArr.reduce(function (a, b) { return a + b });
        switch (catForFltr.toUpperCase()) {
            case "CAT C":
                return (groupCatValues > maxValues.totalMaxAmount) ? maxValues.totalMaxAmount * maxValues.groupCatCPerc : groupCatValues;
            case "CAT D":
                return (groupCatValues > maxValues.totalMaxAmount) ? maxValues.totalMaxAmount * maxValues.groupCatDPerc : groupCatValues;

        }
    }
    return 0;
}
var errorFlag = false; 
function createLasCard(curr_stock, errorFlag) {
    var lasObj = { quantity: curr_stock.quantity, price: curr_stock.price, ltv: curr_stock.lTVperc.slice(0, -1) }
    var las = loanAgainstSecuirtyCalculator.calculate(lasObj);
    lasStockRow += ' <div class="las-stock-row"><a href="javascript:void(0)" class="icon-close mob-row-closed row-closed" jsname="removeStock" data-stockId=' + curr_stock.stockId + '></a><ul><li class="stock34 las-stock-name"><div class="form-textbox-searchs"><input type="text" class="input-textbox jsFilterText" disabled value="' + curr_stock.companyname + '" placeholder=""></div><p class="text-label12 success-text-info">' + curr_stock.category + 'company</p></li><li class="stock13" data-content="Share Rate"><p class="text14i"><span class="icon-rupee"></span>' + Number(curr_stock.price).toLocaleString('en-IN') + '</p></li><li class="stock13" data-content="Quantity"><input type="text" class="input-textbox-qty price-only-comma-js " disabled placeholder="" value=' + Number(curr_stock.quantity).toLocaleString('en-IN') + '></li><li class="stock13" data-content="Total Value"><p class="text14i"><span class="icon-rupee"></span>' + Math.round(las.totalsharevalue).toLocaleString('en-IN') + '</p></li><li class="stock18" data-content="Eligible Loan Amount"><p class="text14i"><span class="icon-rupee"></span>' + (errorFlag ? 0 : Math.round(las.eligiableAmt).toLocaleString('en-IN')) + '</p></li><li class="stock9 las-stock-remove"><a href="javascript:void(0)" data-stockId=' + curr_stock.stockId + ' class="btn-links-md semibold text-gray row-closed" jsname="removeStock">Remove</a></li></ul></div>';

    return lasStockRow;
}

function renderLasCard(lasCard) {

    if ($(window).width() > 767) {
        $('.las-stock-table .las-stock-body').empty().prepend(lasCard);
        $('.las-main-inner').find('.remove-msg').css('display', 'none');
        $('.las-main-inner').find('.clearall-msg').css('display', 'none');
        $('.las-main-inner').find('.added-msg').fadeIn();
        setTimeout(function () {
            $('.las-main-inner').find('.added-msg').fadeOut();
        }, 1000);
    } else {
        $('.las-stock-table .las-stock-body').empty().prepend(lasCard);
        $('.las-main-inner').find('.remove-xs-msg').css('display', 'none');
        $('.las-main-inner').find('.clearall-xs-msg').css('display', 'none');
        $('.las-main-inner').find('.added-xs-msg').fadeIn();
        setTimeout(function () {
            $('.las-main-inner').find('.added-xs-msg').fadeOut();
        }, 1500);
    }
    $('[jsname="removeStock"]').on('click', function (e) {
        var stockid = e.target.dataset.stockid
        selectedCompaniesData = selectedCompaniesData.filter(function (stock) {
            return Number(stock.stockId) !== Number(stockid)
        })
        lasCalculator()
        $(this).parents('.las-stock-row').remove()
        var ele_count = $('.js-stockCount').find('span').text();
        if (ele_count !== "0") {
            ele_count--;
            $('.js-stockCount').find('span').text(ele_count);
            if (ele_count === 0) {
                $('.js-stockCount').find('span').text('0');
                $('.js-clear-all').addClass('btn-disabled');
                $('.js-las-no-stock').removeClass('d-none');
            }
        }
        // console.log("stockssss",stocks)
    })

    lasStockRow = "";
}

$('[jsname="resetInput"]').on('input', function () {
    if (document.querySelector('[jsname="filterStock"]').value != '') {
        var textValue = $('[jsName="shareQuantity"]');
        // var shareAmount = document.getElementsByClassName('.qty-calc-values').innerHTML;
        var sharePrice = $('.qty-calc-values').text();
        var quantityPrice = Number($(this).val().replace(/,/g, '')) * sharePrice.slice(1).replace(/,/g, '')
        if (isNaN(quantityPrice)) {
            textValue.html('Value of Share X Quantity: ₹0');
        }
        else {
            textValue.html('Value of Share X Quantity: ₹' + quantityPrice.toFixed(2).toLocaleString("EN-IN"));
        }

    }
    else {
        $(this).val('')
    }
})
