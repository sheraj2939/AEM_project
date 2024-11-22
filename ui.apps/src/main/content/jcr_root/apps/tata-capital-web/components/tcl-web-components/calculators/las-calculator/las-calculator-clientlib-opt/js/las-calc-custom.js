var addstockrow;
var populateExcelData;
var clearAll;
(function (global) {
    var companyData;
    var stockrowcount = 0;
    var _eligibalAmt = 0;
    selectedCompaniesData = new Array();
    var groupValue;
    var errorText = "";

    var emptyCompanyJson = {
        "companyname": "",
        "price": "",
        "quantity": 0,
        "category": "",
        "exceedFlag": false,
        "lTVperc": "",
        "domElement": ""
    }

    var maxValues = {
        totalMaxAmount: 200000000,
        superCatA: 150000000,
        catA: 75000000,
        catBPerc: 0.4,
        catCPerc: 0.3,
        groupCatCPerc: 0.5,
        catDPerc: 0.2,
        groupCatDPerc: 0.2
    };

     clearAll = function(restore){
        $('.las-stock-table .las-stock-body').find('.las-stock-row').remove();
        if ($(window).width() > 767) {
        $('.las-main-inner').find('.added-msg').css('display', 'none');
        $('.las-main-inner').find('.remove-msg').css('display', 'none');
        if(restore !== true){
        $('.las-main-inner').find('.clearall-msg').fadeIn();
        setTimeout(function () {
            $('.las-main-inner').find('.clearall-msg').fadeOut();
        }, 1000);
        }
    } else {
        $('.las-main-inner').find('.added-xs-msg').css('display', 'none');
        $('.las-main-inner').find('.remove-xs-msg').css('display', 'none');
        if(restore !== true)
        {
        $('.las-main-inner').find('.clearall-xs-msg').fadeIn();
        setTimeout(function () {
            $('.las-main-inner').find('.clearall-xs-msg').fadeOut();
        }, 1500);
        }
    }
    selectedCompaniesData = [];
    $(".las-tnv").html(0);
    $(".las-ela").html(0);
    $('.las-companyname-textbox input').val("");
    $('.las-company-textbox input').val("");
    $(".shareamt").html(0);
    $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
    $(".las-value-share-quantity span").html(0);
    stockrowcount = 0;
    $('.js-stockCount').find('span').text(stockrowcount);
    $('.js-clear-all').addClass('disabled');
    $('.drag-inner #restore').addClass('hidden');
    $('body').find('.form-drag .drag-panel').addClass('hidden'); 
    $('body').find('.form-drag #drag01').removeClass('hidden');
    /*For removing existing excel file from input filelist*/
    	var dt = new DataTransfer()
    	dt.items.add(new File([], 'empty.xlsx'));
        $('[data-file="browse"]')[0].files = dt.files;
    $('.form-drag #drag01').find('[data-file="browse"]').siblings().text('UPLOAD');
    excelValues = [];

    excelStockCount = 0;

}

    var UiManupulationFn = {};
    UiManupulationFn.populatecompanyname = function (elem, companyData, isExcelData) {
        if(isExcelData != true)
        isExcelData = false;
        var populateContext;
        elem = (elem === null) ? $(".las-companyname-textbox .gray-textbox") : elem.find(".gray-textbox");
        var _companyData = companyData;
        var _companyname = companyData.map(function (el) { return el.companyname });

        elem.autocomplete({
            source: _companyname,
            select: function (event, ui) {
                populateContext = $(event.target).parents(".las-main-inner").length > 0 ? $(event.target).parents(".las-main-inner") : $(event.target).parents(".las-stock-row");
               
                UiManupulationFn.updateCompModel(ui.item.value,
                    populateContext,
                    _companyData, null, isExcelData);
            }
        });
    }

    UiManupulationFn.updateCompModel = function (selectedCompany, context, companyData, element, isExcelData, isUpload) {
        try {
            if(isUpload !== true)
                {
                    isUpload = false;
                }
            var _newJson = jsHelper.jsonDeepCopy(emptyCompanyJson);
            var isrow;
            var _selectedCompanyJson = UiManupulationFn.getSelectedCompanyData(selectedCompany, companyData, element, isExcelData, isUpload);
            var selectedContexts = selectedCompaniesData.map(function (el) { return el.domElement });
            if(context===null)
            var selectedConetxtIndex = -1;
            else
            var selectedConetxtIndex = selectedContexts.indexOf(context[0]);
            if (selectedConetxtIndex === -1) {
                _newJson.domElement = context!==null? context[0] : "";
                _newJson.companyname = _selectedCompanyJson.companyname;
                _newJson.price = _selectedCompanyJson.price;
                _newJson.lTVperc = _selectedCompanyJson.ltv;
                 if(context==null)
                _newJson.quantity = element.quantity;
                _newJson.category = _selectedCompanyJson.proposedcategory;
                selectedCompaniesData.push(_newJson);
               
                if(context!==null)
                context.find(".las-company-stock .company-info")[0].innerText = _selectedCompanyJson.companyname + " recognized as " + _selectedCompanyJson.proposedcategory + " company";
            } 
            


            else {
                if(context!==null && isExcelData && !context.hasClass('warning'))
                {
                    var jsonObj = {};
                    jsonObj.oldcompanyname = selectedCompaniesData[selectedConetxtIndex].companyname;
                    jsonObj.oldQuantity = selectedCompaniesData[selectedConetxtIndex].quantity;
                    jsonObj.newcompanyname = _selectedCompanyJson.companyname;
                    jsonObj.newQuantity = 0;
                    jsonObj.contextIndex = selectedConetxtIndex;
                    excelValues.push(jsonObj);
                    context.addClass("warning");
                    editedStocks();
                    
                }
                else if(context!==null && isExcelData && context.hasClass('warning'))
                {
                    excelValues.forEach(function(e){
                    if(e.contextIndex == selectedConetxtIndex)
                    {	
                        e.newcompanyname = _selectedCompanyJson.companyname;
                        e.newQuantity = 0;
                    }
                });
                }
            
                selectedCompaniesData[selectedConetxtIndex].domElement = context!==null? context[0] : "";
                selectedCompaniesData[selectedConetxtIndex].companyname = _selectedCompanyJson.companyname;
                selectedCompaniesData[selectedConetxtIndex].price = _selectedCompanyJson.price;
                selectedCompaniesData[selectedConetxtIndex].lTVperc = _selectedCompanyJson.ltv;
                
                selectedCompaniesData[selectedConetxtIndex].category = _selectedCompanyJson.proposedcategory;
                if(context==null)
                selectedCompaniesData[selectedConetxtIndex].quantity = element.quantity;
               else
               {
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
           if(context!=null)
           {
            $(context).find(".quantity").val("");
            $(context).find(".sxq").text("0");
            $(context).find(".ela").text("0");
           }
            
            LasLogic.calculationLogic(selectedCompaniesData, isrow);
        } catch (e) {
            console.error(e);
        }
    }
    UiManupulationFn.getSelectedCompanyData = function (selectedcompanyname, companyData, element, isExcelData, isUpload) {
        if(isExcelData && isUpload)
        {
			return companyData.filter(function (ele) { if (ele.companyname.toUpperCase() === selectedcompanyname.toUpperCase() || ele.cdisinno === element.isinNo) { return ele } })[0]
        }
        else
        {
        return companyData.filter(function (ele) { if (ele.companyname.toUpperCase() === selectedcompanyname.toUpperCase()) { return ele } })[0]
        }
    }

    UiManupulationFn.quantityTrigger = function (elem, isExcelData) {
        if(isExcelData != true)
        isExcelData = false;
        var _elem = (elem === null) ? $(".las-company-textbox .gray-textbox") : elem.find('.las-qty input').length > 0 ? elem.find('.las-qty input') : (elem.find(".gray-textbox"));
        if (_elem.parents('.las-qty').length == 0) {
            _elem.on("change input", function (e) {
                var context = $(this).parents(".las-main-inner");
                var selectedContexts = selectedCompaniesData.map(function (el) { return el.domElement });
                var selectedConetxtIndex = selectedContexts.indexOf(context[0]);
                if (selectedConetxtIndex !== -1) {
                    selectedCompaniesData[selectedConetxtIndex].quantity = ($(this).val() !== "") ? parseInt($(this).val().split(',').join("")) : 0;
                    LasLogic.calculationLogic(selectedCompaniesData, false);
                }
            });
        }
        else {
            _elem.on("change input", function (e) {
                var context = $(this).parents(".las-stock-row");
                var selectedContexts = selectedCompaniesData.map(function (el) { return el.domElement });
                var selectedConetxtIndex = selectedContexts.indexOf(context[0]);
                if (selectedConetxtIndex !== -1) {
                    
                if(context!==null && isExcelData && !context.hasClass('warning'))
                {
                    var jsonObj = {};
                    jsonObj.oldcompanyname = selectedCompaniesData[selectedConetxtIndex].companyname;
                    jsonObj.oldQuantity = selectedCompaniesData[selectedConetxtIndex].quantity;
                    jsonObj.newcompanyname = jsonObj.oldcompanyname;
                    jsonObj.newQuantity =  ($(this).val() !== "") ? parseInt($(this).val()) : 0;
                    jsonObj.contextIndex = selectedConetxtIndex;
                    excelValues.push(jsonObj);
                    context.addClass("warning");
                    editedStocks();
                }
                else if(context!==null && isExcelData && context.hasClass('warning'))
                {
                    excelValues.forEach(function(exVal){
                    if(exVal.contextIndex == selectedConetxtIndex)
                    {	
                       
                        exVal.newQuantity =  ($(e.target).val() !== "") ? parseInt($(e.target).val()) : 0;
                    }
                });
                }
                    selectedCompaniesData[selectedConetxtIndex].quantity = ($(this).val() !== "") ? parseInt($(this).val()) : 0;
                    LasLogic.calculationLogic(selectedCompaniesData, true, context);
                }
            });

        }
    }

    UiManupulationFn.multiplyNode = function (addstockrow, quantity, isExcelData) {
        ++stockrowcount;
        $('.js-stockCount').find('span').html(stockrowcount);
        if(addstockrow.find(".las-stock-name p").length>0){
            addstockrow.find(".las-stock-name p")[0].innerText = selectedCompaniesData[selectedCompaniesData.length - 1].companyname + " recognized as " + selectedCompaniesData[selectedCompaniesData.length - 1].category + " company";
            addstockrow.find(".las-share-rate p")[0].innerText = jsHelper.parseIntString(selectedCompaniesData[selectedCompaniesData.length - 1].price).toLocaleString("en-in");
        }
        if(quantity != null)
        {
            addstockrow.find(".las-qty input").attr("value",quantity);
        }
        else{
        addstockrow.find(".las-qty input").attr("value", $('.las-company-textbox input').val());
        }
        if(addstockrow.find(".las-value p").length>0){
            addstockrow.find(".las-value p")[0].innerText = $(".las-value-share-quantity span").html();
        addstockrow.find(".las-eli-amt p")[0].innerText = jsHelper.parseIntString(_eligibalAmt).toLocaleString("en-in")
        }
        if (errorText != "") {
            addstockrow.find(".las-stock-name p.red").text(errorText);
            addstockrow.find(".las-value p").addClass("red");
            errorText = "";
        }
        else if (errorText == "") {
            addstockrow.find(".las-stock-name p.red").text(errorText);
            addstockrow.find(".las-value p").removeClass("red");

        }
        if ($(window).width() > 767) {
            //$('.las-stock-table .las-stock-body #mCSB_1_container').prepend('<div class="las-stock-row'+ (isExcelData ? ' excelData">' : '">') + addstockrow.html() + '</div>');
            $('.las-stock-table .las-stock-body').prepend('<div class="las-stock-row'+ (isExcelData ? ' excelData">' : '">') + addstockrow.html() + '</div>');
        }
        else {
            $('.las-stock-table .las-stock-body').prepend('<div class="las-stock-row'+ (isExcelData ? ' excelData">' : '">') + addstockrow.html() + '</div>');
        }
        $('.las-companyname-textbox input').val("");
        $('.las-company-textbox input').val("");
        $(".las-main-inner .las-company-stock .error").html("");
        $('.las-main-inner .las-company-stock .company-info').html("")
        $(".shareamt").html(0);
        $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
        $(".las-value-share-quantity span").html(0);
        if ($(".las-value-share-quantity").hasClass('red')) {
            $(".las-value-share-quantity").removeClass('red');
        }
        selectedCompaniesData[selectedCompaniesData.length - 1].domElement = $(".las-stock-body .las-stock-row")[0];
        var addedrow = $(".las-stock-body .las-stock-row")[0];
        $(addedrow).find(".las-stock-name input").val(selectedCompaniesData[selectedCompaniesData.length - 1].companyname);
        UiManupulationFn.populatecompanyname($(addedrow), companyData, isExcelData);
        UiManupulationFn.removeCalContainer($(addedrow));
        UiManupulationFn.quantityTrigger($(addedrow), isExcelData);
        /*Numeric input validation for quantity - START*/
                 $( '.only-numeric-input' ).on("keypress paste", function( e ) {
                var regex = new RegExp( /[^0-9\b]/g );
        	    if ( regex.test( String.fromCharCode( e.which ) ) ) {
        	        return false;
        	    }

        	} );
        /*Numeric input validation for quantity - END*/
    }

    UiManupulationFn.removeCalContainer = function (elem) {
        elem = elem.find(".row-closed");
        elem.on('click', function () {
            --stockrowcount;

            $('.las-stock-added-inner .las-stock-left p span').html(stockrowcount);
            var elementToRemove = $(this).parents(".las-stock-row");
            isExcelData = elementToRemove.hasClass('excelData');
            var selectedContexts = selectedCompaniesData.map(function (el) { return el.domElement });
            var selectedConetxtIndex = selectedContexts.indexOf(elementToRemove[0]);
            if(isExcelData && !elementToRemove.hasClass('warning'))
                {
                    var jsonObj = {};
                    jsonObj.oldcompanyname = selectedCompaniesData[selectedConetxtIndex].companyname;
                    jsonObj.oldQuantity = selectedCompaniesData[selectedConetxtIndex].quantity;
                    jsonObj.newcompanyname = null;
                    jsonObj.newQuantity =  null;
                    jsonObj.contextIndex = selectedConetxtIndex;
                    excelValues.push(jsonObj);
                    editedStocks();
                }
                else if(isExcelData && elementToRemove.hasClass('warning'))
                {
                    excelValues.forEach(function(exVal){
                    if(exVal.contextIndex == selectedConetxtIndex)
                    {	
                        exVal.newcompanyname = null;
                        exVal.newQuantity =  null;
                    }
                });
                 editedStocks();
                }

            if ($(this).parents(".las-stock-row").siblings(".las-stock-row").length > 0) {
                if ($(window).width() > 767) {
                    $('.las-main-inner').find('.added-msg').css('display', 'none');
                    $('.las-main-inner').find('.clearall-msg').css('display', 'none');
                    $('.las-main-inner').find('.remove-msg').fadeIn();
                    setTimeout(function () {
                        $('.las-main-inner').find('.remove-msg').fadeOut();
                    }, 1000);
                } else {
                    $('.las-main-inner').find('.added-xs-msg').css('display', 'none');
                    $('.las-main-inner').find('.clearall-xs-msg').css('display', 'none');
                    $('.las-main-inner').find('.remove-xs-msg').fadeIn();
                    setTimeout(function () {
                        $('.las-main-inner').find('.remove-xs-msg').fadeOut();
                    }, 1500);
                }
                elementToRemove.remove();
                
                if (selectedConetxtIndex !== -1) {
                    selectedCompaniesData.splice(selectedConetxtIndex, 1);
                    LasLogic.calculationLogic(selectedCompaniesData, true);
                }
            } else {
                if ($(window).width() > 767) {
                    $('.las-main-inner').find('.added-msg').css('display', 'none');
                    $('.las-main-inner').find('.remove-msg').css('display', 'none');
                    $('.las-main-inner').find('.clearall-msg').fadeIn();
                    setTimeout(function () {
                        $('.las-main-inner').find('.clearall-msg').fadeOut();
                    }, 1000);
                } else {
                    $('.las-main-inner').find('.added-xs-msg').css('display', 'none');
                    $('.las-main-inner').find('.remove-xs-msg').css('display', 'none');
                    $('.las-main-inner').find('.clearall-xs-msg').fadeIn();
                    setTimeout(function () {
                        $('.las-main-inner').find('.clearall-xs-msg').fadeOut();
                    }, 1500);
                }
                elementToRemove.remove();
                selectedCompaniesData.shift();
                LasLogic.calculationLogic(selectedCompaniesData, true);
                $(".las-tnv").html(0);
                $(".las-ela").html(0);
                $('.js-clear-all').addClass('disabled');
            }
        });
    }

    /****************************************LAS Logic -START**************************************************/
    var LasLogic = {};

    LasLogic.calculationLogic = function (selectedCompaniesData, is_row, stockrow) {
        var _eligibalLoanAmt = 0;
        var _netShareVal = 0;
        var groupCatCodes = selectedCompaniesData.map(function (el) { return el.category.toUpperCase() });
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
                _eligibalAmt = 0;
                var _quantity = jsHelper.parseIntString(selectedCompanyData.quantity);
                var _price = jsHelper.parseIntString(selectedCompanyData.price);
                var _ltv = jsHelper.parseIntString(selectedCompanyData.lTVperc);
                errorText = "";
                if(context!==null)
                {
                context.find(".error").text(errorText);
                context.find(".las-value p").removeClass("red");
                context.find(".las-value-share-quantity").removeClass("red");
                }

                switch (selectedCompanyData.category.toUpperCase()) {
                    case "SUPER CAT A":
                        _totalShareVal = _quantity * _price;
                        _eligibalAmt = _totalShareVal * _ltv / 100;
                        if (_eligibalLoanAmt <= maxValues.totalMaxAmount) {
                            _netShareVal += _totalShareVal;
                            if (_eligibalAmt >= maxValues.superCatA) {
                                _eligibalAmt = maxValues.superCatA;
                                selectedCompanyData.exceedFlag = true;
                                _eligibalLoanAmt += _eligibalAmt;
                                errorText = "Super Category A: Your eligible loan amount cannot exceed ₹15Cr per scrip.";
                                if(context!==null)
                                {
                                context.find(".error").text(errorText);
                                context.find(".las-value p").addClass("red");
                                context.find(".las-value-share-quantity").addClass("red");
                                }
                            } else {
                                _eligibalAmt = _eligibalAmt;
                                selectedCompanyData.exceedFlag = false;
                                _eligibalLoanAmt += _eligibalAmt;
                                errorText = "";
                                 if(context!==null)
                {
                                context.find(".error").text(errorText);
                                context.find(".las-value p").removeClass("red");
                                context.find(".las-value-share-quantity").removeClass("red");
                }
                            }
                            if (_eligibalLoanAmt > maxValues.totalMaxAmount) {
                                var _exceededAmt = _eligibalLoanAmt - maxValues.totalMaxAmount;
                                _eligibalAmt -= _exceededAmt;
                                _eligibalLoanAmt -= _exceededAmt;
                            }
                            if (!is_row) {
                                $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(jsHelper.parseIntString(_eligibalAmt).toLocaleString("en-in"));
                            }
                            else {
                                 if(context!==null)
                {
                                context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                context.find(".las-eli-amt p").html(jsHelper.parseIntString(_eligibalAmt).toLocaleString("en-in"));
                }
                            }
                            break;

                        } else {
                            _netShareVal += _totalShareVal;
                            if (!is_row) {
                                $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                                _eligibalAmt=0;
                            }
                            else {
                                 if(context!==null)
                {
                                context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                context.find(".las-eli-amt p").html(0);
                }
                            }
                            break;
                        }
                    case "CAT A":
                        _totalShareVal = _quantity * _price;
                        _eligibalAmt = _totalShareVal * _ltv / 100;

                        if (_eligibalLoanAmt <= maxValues.totalMaxAmount) {
                            _netShareVal += _totalShareVal;
                            if (_eligibalAmt >= maxValues.catA) {
                                _eligibalAmt = maxValues.catA;
                                selectedCompanyData.exceedFlag = true;
                                _eligibalLoanAmt += _eligibalAmt;
                                errorText = "Category A: Your eligible loan amount cannot exceed ₹7.5Cr per scrip.";
                                 if(context!==null)
                {
                                context.find(".error").text(errorText);
                                context.find(".las-value p").addClass("red");
                                context.find(".las-value-share-quantity").addClass("red");
                }
                            } else {
                                _eligibalAmt = _eligibalAmt;
                                _eligibalLoanAmt += _eligibalAmt;
                                selectedCompanyData.exceedFlag = false;
                                errorText = "";
                                 if(context!==null)
                {
                                context.find(".error").text(errorText);
                                context.find(".las-value p").removeClass("red");
                                context.find(".las-value-share-quantity").removeClass("red");
                }
                            }
                            if (_eligibalLoanAmt > maxValues.totalMaxAmount) {
                                var _exceededAmt = _eligibalLoanAmt - maxValues.totalMaxAmount;
                                _eligibalAmt -= _exceededAmt;
                                _eligibalLoanAmt -= _exceededAmt;
                            }
                            if (!is_row) {
                                $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(jsHelper.parseIntString(_eligibalAmt).toLocaleString("en-in"));
                            }
                            else {
                                 if(context!==null)
                {
                                context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                context.find(".las-eli-amt p").html(jsHelper.parseIntString(_eligibalAmt).toLocaleString("en-in"));
                }
                            }
                            break;

                        } else {
                            _netShareVal += _totalShareVal;
                            if (!is_row) {
                                $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                                _eligibalAmt=0;
                            }
                            else {
                                 if(context!==null)
                {
                                context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                context.find(".las-eli-amt p").html(0);
                }
                            }
                            break;

                        }

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
                                    errorText = "Category B: Your eligible loan amount per scrip cannot exceed 40% of the total loan amount.";
                                     if(context!==null)
                {
                                    context.find(".error").text(errorText);
                                    context.find(".las-value p").addClass("red");
                                    context.find(".las-value-share-quantity").addClass("red");
                }
                                    if (!is_row) {
                                        $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                        $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                                        _eligibalAmt=0;
                                    }
                                    else {
                                        context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                        context.find(".las-eli-amt p").html(0);
                                    }
                                    break;
                                }
                            }
                            if (_eligibalAmt > _groupVal * maxValues.catBPerc) {
                                _eligibalAmt = _groupVal * maxValues.catBPerc;
                                selectedCompanyData.exceedFlag = true;
                                errorText = "Category B: Your eligible loan amount per scrip cannot exceed 40% of the total loan amount.";
                                 if(context!==null)
                {
                                context.find(".error").text(errorText);
                                context.find(".las-value p").addClass("red");
                                context.find(".las-value-share-quantity").addClass("red");
                }
                                if (!is_row) {
                                    $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                    $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                                    _eligibalAmt=0;
                                }
                                else {
                                    context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                    context.find(".las-eli-amt p").html(0);
                                }
                                break;
                            } else {
                                _eligibalAmt = _eligibalAmt;
                                selectedCompanyData.exceedFlag = false;
                                _eligibalLoanAmt += _eligibalAmt;
                                errorText = "";
                                 if(context!==null)
                {
                                context.find(".error").text(errorText);
                                context.find(".las-value p").removeClass("red");
                                context.find(".las-value-share-quantity").removeClass("red");
                }
                            }
                            if (_eligibalLoanAmt > maxValues.totalMaxAmount) {
                                var _exceededAmt = _eligibalLoanAmt - maxValues.totalMaxAmount;
                                _eligibalAmt -= _exceededAmt;
                                _eligibalLoanAmt -= _exceededAmt;
                            }
                            if (!is_row) {
                                $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(jsHelper.parseIntString(_eligibalAmt).toLocaleString("en-in"));
                            }
                            else {
                                 if(context!==null)
                {
                                context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                context.find(".las-eli-amt p").html(jsHelper.parseIntString(_eligibalAmt).toLocaleString("en-in"));
                }
                            }
                            break;
                        } else {
                            _netShareVal += _totalShareVal;
                            if (!is_row) {
                                $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                                _eligibalAmt=0;
                            }
                            else {
                                 if(context!==null)
                {
                                context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                context.find(".las-eli-amt p").html(0);
                }
                            }
                            break;

                        }

                    case "CAT C":
                        _totalShareVal = _quantity * _price;
                        _eligibalAmt = _totalShareVal * _ltv / 100;

                        if (groupCatCodes.indexOf("SUPER CAT A") === -1 && groupCatCodes.indexOf("CAT A") === -1 && groupCatCodes.indexOf("CAT B") === -1) {
                            _netShareVal += _totalShareVal;
                            errorText = "Category C: Scrips cannot be pledged alone, need to pledge Super CAT-A, CAT-A or CAT-B along with CAT-C";
                             if(context!==null)
                {
                            context.find(".error").text(errorText);
                            context.find(".las-value p").addClass("red");
                            context.find(".las-value-share-quantity").addClass("red");
                }
                            if (!is_row) {
                                $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                                _eligibalAmt=0;
                            }
                            else {
                                 if(context!==null)
                {
                                context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                context.find(".las-eli-amt p").html(0);
                }
                            }
                            break;
                        }
                        if (_groupCatValue <= _groupVal * maxValues.groupCatCPerc && _eligibalLoanAmt < maxValues.totalMaxAmount) {
                            _netShareVal += _totalShareVal;
                            if (_eligibalAmt > _groupVal * maxValues.catCPerc) {
                                _eligibalAmt = _groupVal * maxValues.catCPerc;
                                selectedCompanyData.exceedFlag = true;
                                errorText = "Category C: Add another scrip or reduce the pledged share value.";
                                 if(context!==null)
                {
                                context.find(".error").text(errorText);
                                context.find(".las-value p").addClass("red");
                                context.find(".las-value-share-quantity").addClass("red");
                }
                                if (!is_row) {
                                    $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                    $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                                    _eligibalAmt=0;
                                }
                                else {
                                    context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                    context.find(".las-eli-amt p").html(0);
                                }
                                break;
                            } else {
                                _eligibalAmt = _eligibalAmt;
                                selectedCompanyData.exceedFlag = false;
                                _eligibalLoanAmt += _eligibalAmt;
                                errorText = "";
                                 if(context!==null)
                {
                                context.find(".error").text(errorText);
                                context.find(".las-value p").removeClass("red");
                                context.find(".las-value-share-quantity").removeClass("red");
                }
                            }
                            if (_eligibalLoanAmt > maxValues.totalMaxAmount) {
                                var _exceededAmt = _eligibalLoanAmt - maxValues.totalMaxAmount;
                                _eligibalAmt -= _exceededAmt;
                                _eligibalLoanAmt -= _exceededAmt;
                            }
                            if (!is_row) {
                                $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(jsHelper.parseIntString(_eligibalAmt).toLocaleString("en-in"));
                            }
                            else {
                                 if(context!==null)
                {
                                context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                context.find(".las-eli-amt p").html(jsHelper.parseIntString(_eligibalAmt).toLocaleString("en-in"));
                }
                            }
                            break;
                        } else {
                            _netShareVal += _totalShareVal;
                            if (_groupCatValue > _groupVal * maxValues.groupCatCPerc && _eligibalLoanAmt < maxValues.totalMaxAmount) {
                                errorText = "Category C: Add another scrip or reduce the pledged share value";
                                 if(context!==null)
                {
                                context.find(".error").text(errorText);
                                context.find(".las-value p").addClass("red");
                                context.find(".las-value-share-quantity").addClass("red");
                }
                                if (!is_row) {
                                    $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                    $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                                    _eligibalAmt=0;
                                }
                                else {
                                    context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                    context.find(".las-eli-amt p").html(0);
                                }
                                break;
                            }
                            if (!is_row) {
                                $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                                _eligibalAmt=0;
                            }
                            else {
                                 if(context!==null)
                {
                                context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                context.find(".las-eli-amt p").html(0);
                }
                            }
                            break;
                        }


                    case "CAT D":
                        _totalShareVal = _quantity * _price;
                        _eligibalAmt = _totalShareVal * _ltv / 100;
                        if (groupCatCodes.indexOf("SUPER CAT A") === -1 && groupCatCodes.indexOf("CAT A") === -1 && groupCatCodes.indexOf("CAT B") === -1) {
                            _netShareVal += _totalShareVal;
                            errorText = "Category D: Scrips cannot be pledged alone, need to pledge Super CAT-A, CAT-A or CAT-B along with CAT-D";
                             if(context!==null)
                {
                            context.find(".error").text(errorText);
                            context.find(".las-value p").addClass("red");
                            context.find(".las-value-share-quantity").addClass("red");
                }
                            if (!is_row) {
                                $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                                _eligibalAmt=0;
                            }
                            else {
                                 if(context!==null)
                {
                                context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                context.find(".las-eli-amt p").html(0);
                }
                            }
                            break;
                        }
                        if (_groupCatValue <= _groupVal * maxValues.groupCatDPerc && _eligibalLoanAmt < maxValues.totalMaxAmount) {
                            _netShareVal += _totalShareVal;
                            if (_eligibalAmt > _groupVal * maxValues.catDPerc) {
                                _eligibalAmt = _groupVal * maxValues.catDPerc;
                                selectedCompanyData.exceedFlag = true;
                                _eligibalLoanAmt += _eligibalAmt;
                                errorText = "Category D: Add another scrip or reduce the pledged share value.";
                                 if(context!==null)
                {
                                context.find(".error").text(errorText);
                                context.find(".las-value p").addClass("red");
                                context.find(".las-value-share-quantity").addClass("red");
                }
                                if (!is_row) {
                                    $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                    $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                                    _eligibalAmt=0;
                                }
                                else {
                                    context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                    context.find(".las-eli-amt p").html(0);
                                }
                            } else {
                                _eligibalAmt = _eligibalAmt;
                                selectedCompanyData.exceedFlag = false;
                                _eligibalLoanAmt += _eligibalAmt;
                                errorText = "";
                                 if(context!==null)
                {
                                context.find(".error").text(errorText);
                                context.find(".las-value p").removeClass("red");
                                context.find(".las-value-share-quantity").removeClass("red");
                }
                            }
                            if (_eligibalLoanAmt > maxValues.totalMaxAmount) {
                                var _exceededAmt = _eligibalLoanAmt - maxValues.totalMaxAmount;
                                _eligibalAmt -= _exceededAmt;
                                _eligibalLoanAmt -= _exceededAmt;
                            }
                            if (!is_row) {
                                $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(jsHelper.parseIntString(_eligibalAmt).toLocaleString("en-in"));
                            }
                            else {
                                 if(context!==null)
                {
                                context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                context.find(".las-eli-amt p").html(jsHelper.parseIntString(_eligibalAmt).toLocaleString("en-in"));
                }
                            }
                            break;
                        } else {
                            _netShareVal += _totalShareVal;
                            if (_groupCatValue > _groupVal * maxValues.groupCatDPerc && _eligibalLoanAmt < maxValues.totalMaxAmount) {
                                errorText = "Category D: Add another scrip or reduce the pledged share value.";
                                 if(context!==null)
                {
                                context.find(".error").text(errorText);
                                context.find(".las-value p").addClass("red");
                                context.find(".las-value-share-quantity").addClass("red");
                }
                                if (!is_row) {
                                    $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                    $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                                    _eligibalAmt=0;
                                }
                                else {
                                    context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                    context.find(".las-eli-amt p").html(0);
                                }
                                break;
                            }
                            if (!is_row) {
                                $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                                _eligibalAmt=0;
                            }
                            else {
                                 if(context!==null)
                {
                                context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                                context.find(".las-eli-amt p").html(0);
                }
                            }
                            break;
                        }

                    case "UNAPPROVED":
                        _totalShareVal = _quantity * _price;
                        if (!is_row) {
                            $(".las-value-share-quantity span").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                            $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                            _eligibalAmt=0;
                        }
                        else {
                            context.find(".las-value p").html(jsHelper.parseIntString(_totalShareVal).toLocaleString("en-in"));
                            context.find(".las-eli-amt p").html(0);
                        }
                        break;
                    default:
                        break;
                }
                if (!is_row) {
                    $(".shareamt").html(jsHelper.parseIntString(_price).toLocaleString("en-in"));
                }
                else {
                    context.find(".las-share-rate p").html(jsHelper.parseIntString(_price).toLocaleString("en-in"));
                }
                $(".las-tnv").html(jsHelper.parseIntString(_netShareVal).toLocaleString("en-in"));
                $(".las-ela").html(jsHelper.parseIntString(_eligibalLoanAmt).toLocaleString("en-in"));
            } catch (e) {
                console.error(e);
            }
        });
    }

    LasLogic.getGroupValue = function (wholeCompanyJson) {
        var _groupValArr = [];
        wholeCompanyJson.forEach(function (el) {
            var shareValue = !isNaN(jsHelper.parseIntString(el.price)) ? jsHelper.parseIntString(el.price) : 0;
            var shareQuantity = !isNaN(jsHelper.parseIntString(el.quantity)) ? jsHelper.parseIntString(el.quantity) : 0;
            var ltv = !isNaN(jsHelper.parseIntString(el.lTVperc)) ? jsHelper.parseIntString(el.lTVperc) : 0;
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
            var ltv = !isNaN(parseInt(el.lTVperc)) ? parseInt(el.lTVperc) : 0;
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
                if ((el.category).toUpperCase() === catForFltr.toUpperCase()) {
                    var shareValue = !isNaN(parseInt(el.price)) ? parseInt(el.price) : 0;
                    var shareQuantity = !isNaN(parseInt(el.quantity)) ? parseInt(el.quantity) : 0;
                    var ltv = !isNaN(parseInt(el.lTVperc)) ? parseInt(el.lTVperc) : 0;
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

    /********************************************Helper Functions -START******************************************************/

    var jsHelper = {};

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
    jsHelper.parseIntString = function (param) {
        return (typeof (param) !== "number") ? Math.round(parseInt(param)) : Math.round(param)
    }

    /********************************************Helper Functions -END******************************************************/


    /****************************************LAS Logic -START**************************************************/


    document.addEventListener("DOMContentLoaded", function () {

        /*****************************************************Add new form -STAR*****************************************************************/
        //addstockrow = $('.las-stock-table .las-stock-body .las-stock-row').clone();
        addstockrow = $('.las-stock-table .las-stock-body .las-stock-row').clone();

        $(".js-add-stock").on('click', function () {
            var companyExists = false;
            for (var i = 0; i < companyData.length; i++) {
                if ($('.las-company-stock .las-companyname-textbox input').val() == companyData[i].companyname) {
                    companyExists = true;
                }
            }
            if (companyExists && $('.las-company-stock .las-companyname-textbox input').val() != "" && $('.las-company-stock .las-company-textbox input').val() != "" && parseInt($('.las-company-stock .las-company-textbox input').val()) != 0) {
                if ($(window).width() > 767) {

                    $('.las-main-inner').find('.remove-msg').css('display', 'none');
                    $('.las-main-inner').find('.clearall-msg').css('display', 'none');
                    $('.las-main-inner').find('.added-msg').fadeIn();
                    setTimeout(function () {
                        $('.las-main-inner').find('.added-msg').fadeOut();
                    }, 1000);
                } else {

                    $('.las-main-inner').find('.remove-xs-msg').css('display', 'none');
                    $('.las-main-inner').find('.clearall-xs-msg').css('display', 'none');
                    $('.las-main-inner').find('.added-xs-msg').fadeIn();
                    setTimeout(function () {
                        $('.las-main-inner').find('.added-xs-msg').fadeOut();
                    }, 1500);
                }
                if ($('.js-companystock').length > 0) {
                    $('.js-companystock').select2({
                        minimumResultsForSearch: -1
                    });
                    $('.js-companystock').each(function (index, item) {
                        $(item).data('select2').$dropdown.addClass("companystock-select2")
                    })
                }
                $('.js-clear-all').removeClass('disabled');
                UiManupulationFn.multiplyNode(addstockrow);
            }
        });

        $('.las-stock-table .las-stock-body .las-stock-row').remove();
        $(".las-tnv").html(0);
        $(".las-ela").html(0);
        $('.las-stock-added-inner .las-stock-left p span').html(stockrowcount);


        $('.js-clear-all').click(clearAll);

        /*****************************************************Add new form -END*****************************************************************/

        /***********************************Ajax Call For Company Data - START********************************************/
        /*if (window.XMLHttpRequest) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                try {
                    if (this.readyState === 4 && this.status === 200) {
                        var responseJson = JSON.parse(this.responseText);
                        if (typeof (responseJson) === "object") {
                            companyData = responseJson.Master;
                            UiManupulationFn.populatecompanyname(null, companyData);
                            UiManupulationFn.quantityTrigger(null);
                            
                        }
                    }
                } catch (e) {
                    console.warn(e);
                }
            }
            xmlHttp.open("GET", "/content/tata-capital/mdm.lascompanies.json", true);
            xmlHttp.send();
        }*/
        var url = window.osgiConfigObj.calcApiDomain+"/web/api/mdm/export/las-csv-upload-companiesshareratemasterfile.json";
        function lasApiCall(url) {
            var promise = new Promise(function(resolve)  {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (this.status === 200 && this.readyState === 4) {
                        data = this.response;
                        var myArray = JSON.parse(data);
                        resolve(myArray);
                    }
                }
        
                xhr.open("GET", url, true);
                xhr.send();
            })
            return promise
        }
        try{
            lasApiCall(url).then(function (res) {
                var responseJson = res;
                        if (typeof (responseJson) === "object") {
                            companyData = responseJson.Master;
                            UiManupulationFn.populatecompanyname(null, companyData);
                            UiManupulationFn.quantityTrigger(null);
                            
                        }
        
            })}catch(e) {console.log(e) }
    });
    /***********************************Ajax Call For Company Data - END********************************************/
   /* $("#fileSelect").change(function(){
        var formdata = new FormData();
        formdata.append("userLasData",$('#fileSelect')[0].files[0]); //bookmark
        $.ajax({
            type: "POST",
            data: formdata,
            url: "/content/tata-capital/userlasupload.getUserData.json",
            async: true,
            contentType: false,
            processData: false,
            success: function(responseText){
                var isExcelData = true;
            	var response = typeof(responseText)=="object" ? responseText : JSON.parse(responseText);
                response.userDataArray.forEach(function(ele)
    			{
       				UiManupulationFn.updateCompModel(ele.companyname, null, companyData, ele);
       
        			UiManupulationFn.multiplyNode(addstockrow,ele.quantity,isExcelData);
        			console.log("Entered json loop");
    			});
        	}
    	});
    });*/

    populateExcelData = function(companyname, context, ele, addstockrow, isExcelData, isUpload){
        UiManupulationFn.updateCompModel(ele.companyname, null, companyData, ele, isExcelData, isUpload);
       
        UiManupulationFn.multiplyNode(addstockrow,ele.quantity,isExcelData);
        editedStocks();
        console.log("Entered json loop");
    }


})(window);

if(document.getElementsByClassName("calculator-loader-individual").length > 0)
{
document.getElementsByClassName("calculator-loader-individual")[0].style.display = "none";
}
if(document.getElementById("toolsAndCalc")!=null)
{
document.getElementById("toolsAndCalc").classList.remove("productscalculatorHeight");
}

// $("window").load(function(){
//     $(".calculator-loader-individual").hide();
//     $("#toolsAndCalc").removeClass("productscalculatorHeight");
// });
