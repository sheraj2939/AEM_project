var stockName;
var groupValue;
var stocks;
var availableTags = [];
var selectedCompaniesData = [];
var stockQuantity = 0;
var maxValues = {
    totalMaxAmount: 150000000,
    superCatA: 75000000,
    catA: 30000000,
    catBPerc: 0.4,
    catCPerc: 0.3,
    groupCatCPerc: 0.5,
    catDPerc: 0.2,
    groupCatDPerc: 0.2,
    // maxBCriteria: 60000000,
    // maxCCriteria: 45000000,
    // maxDCriteria: 30000000
};
var emptyCompanyJson = {
    "companyname": "",
    "price": "",
    "quantity": 0,
    "category": "",
    "exceedFlag": false,
    "lTVperc": "",
    "domElement": ""
}
var addstockrow;
$('.price-only-comma').keyup(function () {
    var textValue = $('[jsName="shareQuantity"]');
    if ($(this).val() != "") {
        var rupeeValue = parseFloat($(this).val().replace(/,/g, ''));
        commaSeparatedValue = rupeeValue.toLocaleString('en-IN');
        $(this).val(commaSeparatedValue);
        stockQuantity = $(this).val();
        console.log(stockQuantity);
        // debugger;
        lasCalculator()
        // $('[jsName="shareQuantity"]').hasClass('text-red')? lasCalculator(true) : lasCalculator(false)

    }
});


$(document).ready(function(){

    $('[jsname="filterStock"]').autocomplete({
        source: availableTags,
        select: showResult,
    });
    // $('[jsname="filterStock"]').trigger('input',populateAreaUnits(url))
    function showResult(event, ui) {
        if (stockQuantity != 0) {
            lasCalculator()
        }

    }
    populateAreaUnits(url);
})
// var url = window.osgiConfigObj.calcApiDomain+"/content/tata-capital/mdm.lascompanies.json";
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

function setInput() {
    var filterdStock = stocks.filter(function (companies) {
        return companies.companyname == stockName;
    });
    return filterdStock;
}

function populateAreaUnits(url) {
    try{
    lasApiCall(url).then(function (res) {
        stocks = res.Master
        stocks.forEach(function (companies) {
            for (companyKey in companies) {
                if (companyKey == "companyname") {
                    availableTags.push(companies[companyKey]);
                }
            }
        });

    })}catch(e) {console.log(e) }
}
var category;
var prevTotalShareValue;
var prevEligibleAmt;

// function lasCalculator(errorFlag) {

//     var curr_stock = setInput();

//     if (curr_stock.length > 0) {
//         category = curr_stock[0].proposedcategory

//         if ((stockQuantity != NaN || stockQuantity != undefined) && (curr_stock[0].price != NaN || curr_stock[0].price != undefined) && (curr_stock[0].ltv != NaN || curr_stock[0].ltv != undefined)) {
            
//             var las = loanAgainstSecuirtyCalculator.calculate({ quantity: stockQuantity.replace(/,/g, ''), price: curr_stock[0].price, ltv: curr_stock[0].ltv.slice(0, -1) });
//             document.querySelector('.qty-calc-values').innerHTML = "₹" + curr_stock[0].price.toLocaleString("EN-IN");
//             document.querySelector('.las .aGreen-category').innerText = curr_stock[0].companyname + 'recognized as ' + category + ' company';

//         }
//         else {
//             // document.querySelector('.qty-calc-values').innerHTML = 0;
//             // document.querySelector('.las .aGreen-category').innerText = "";

//         }

//         addstockrow = ' <div class="las-stock-row"><a href="javascript:void(0)" class="icon-close mob-row-closed row-closed"></a><ul><li class="stock34 las-stock-name"><div class="form-textbox-searchs"><input type="text" class="input-textbox jsFilterText" value="' + curr_stock[0].companyname + '" placeholder=""></div><p class="text-label12 success-text-info">' + curr_stock[0].proposedcategory + 'company</p></li><li class="stock13" data-content="Share Rate"><p class="text14i"><span class="icon-rupee"></span>' + curr_stock[0].price + '</p></li><li class="stock13" data-content="Quantity"><input type="text" class="input-textbox-qty price-only-comma" placeholder="" value=' + stockQuantity + '></li><li class="stock13" data-content="Total Value"><p class="text14i"><span class="icon-rupee"></span>' + las.totalsharevalue + '</p></li><li class="stock18" data-content="Eligible Loan Amount"><p class="text14i"><span class="icon-rupee"></span>' + (errorFlag ? 0 :las.eligiableAmt) + '</p></li><li class="stock9 las-stock-remove"><a href="javascript:void(0)" class="btn-links-md semibold text-gray row-closed">Remove</a></li></ul></div>';

//         // selectedCompaniesData.push(curr_stock[0]);
//         setLasInput(las, curr_stock);
//         curr_stock = [];
//     }
// }
$('.js-add-stock').on('click', function () {
    // $(".jsFilterText").trigger('keydown');
   if(document.querySelector('[dataInputName = "stockInput"]').value !='' && document.querySelector('[jsname="filterStock"]').value !='') {
    stockQuantity = document.querySelector('[dataInputName = "stockInput"]').value;
    var curr_stock = setInput();
    stockQuantity = stockQuantity.replace(/,/g, "")
    var currStock = curr_stock[0];
    var new_stock = {quantity: stockQuantity,stockId:parseInt(Math.random() * 10000000000)};
    new_stock = Object.assign(currStock,new_stock);
    // var new_stock = {
    //     ...curr_stock[0], quantity: stockQuantity,stockId:parseInt(Math.random() * 10000000000)
    // }
    UiManupulationFn.updateCompModel ( curr_stock[0].companyname, null, stocks,  new_stock, false,false);
    // selectedCompaniesData.push(new_stock);
    lasCalculator();
    selectedCompaniesData.forEach(function (company) {
        // debugger
        // console.log("hi",company.companyname)
        createLasCard(company)

    })                
    renderLasCard(lasStockRow);
    lasCalculator();
    // $('[jsName="shareQuantity"]').hasClass('text-red')? lasCalculator(true) : lasCalculator(false)
    resetValues();
    $('[jsname="filterStock"]').blur()
    $('[jsname="resetInput"]').blur()
    $('.qty-calc-values').blur()

    if ($(window).width() > 767) {
        $('.las-stock-table .las-stock-body').prepend(addstockrow);
        $('.las-main-inner').find('.remove-msg').css('display', 'none');
        $('.las-main-inner').find('.clearall-msg').css('display', 'none');
        $('.las-main-inner').find('.added-msg').fadeIn();
        setTimeout(function () {
            $('.las-main-inner').find('.added-msg').fadeOut();
        }, 1000);
    } else {
        $('.las-stock-table .las-stock-body').prepend(addstockrow);
        $('.las-main-inner').find('.remove-xs-msg').css('display', 'none');
        $('.las-main-inner').find('.clearall-xs-msg').css('display', 'none');
        $('.las-main-inner').find('.added-xs-msg').fadeIn();
        setTimeout(function () {
            $('.las-main-inner').find('.added-xs-msg').fadeOut();
        }, 1500);
    }
    $('.js-clear-all').removeClass('btn-disabled');
    $('.js-las-no-stock').addClass('d-none');
    var ele_count = $('.js-stockCount').find('span').text();
    ele_count++;
    $('.js-stockCount').find('span').text(ele_count);
    $(function () {
        $(".jsFilterText").autocomplete({
            source: availableTags
        });
    })
    // $('.price-only-comma').keyup(function () {
    //     if ($(this).val() != "") {
    //         var rupeeValue = parseFloat($(this).val().replace(/,/g, ''));
    //         commaSeparatedValue = rupeeValue.toLocaleString('en-IN');
    //         $(this).val(commaSeparatedValue);
    //     }
    // });

}
});
function setLasInput(las, curr_stock) {
    var netEligibleLoanAmt = 0;
    var _netShareVal = 0;
    var totalNetValue = document.querySelector('.las .las-tnv');
    var eligibleLoanAmount = document.querySelector('.las .las-ela');
    var blackTextValue = document.querySelector('.las .black-value');
    // error values
    var textValue = $('[jsName="shareQuantity"]');
    var categoryTextValue = document.querySelector('.las .category-text-val');
    var groupCatCodes = selectedCompaniesData.map(function (el) { return el.proposedcategory.toUpperCase() });
    var _groupVal = getGroupValue(selectedCompaniesData);
    var _groupCatValue = getGroupCatValue(curr_stock[0].proposedcategory, selectedCompaniesData);
    if (las.totalsharevalue != NaN && las.totalsharevalue != undefined && Number(las.totalsharevalue) >= 0) {
        totalNetValue.innerText = '₹' + las.totalsharevalue.toLocaleString("EN-IN") + '*';
        textValue.html('Value of Share X Quantity: ₹' + las.totalsharevalue.toLocaleString("EN-IN"));
        // blackTextValue.innerText = 'Value of Share X Quantity: ₹' + las.totalsharevalue;
        // textValue.innerHTML = "";
        categoryTextValue.innerHTML = '';
        // prevTotalShareValue = las.totalsharevalue;
        totalNetValue.innerText = '₹' + _netShareVal + '*';
        // textValue.innerHTML = 'Value of Share X Quantity: ₹' + prevTotalShareValue;
        // categoryTextValue.innerHTML = category + " : Your eligible loan amount per scrip cannot exceed 40% of the total amount "

        switch (curr_stock[0].proposedcategory.toUpperCase()) {
            case "SUPER CAT A":
                if (netEligibleLoanAmt <= maxValues.totalMaxAmount) {
                    _netShareVal += las.totalsharevalue;

                    if (las.eligiableAmt >= maxValues.superCatA) {
                        netEligibleLoanAmt += las.eligiableAmt;
                        textValue.addClass('text-red');
                        textValue.html('Value of Share X Quantity: ₹' + las.totalsharevalue.toLocaleString("EN-IN"));
                        categoryTextValue.innerHTML = " Super Category A: Your eligible loan amount cannot exceed ₹7.5Cr per scrip. "
                    }

                }
                else {
                    _netShareVal += las.totalsharevalue;
                }
                break;
            case "CAT A":
                if (netEligibleLoanAmt <= maxValues.totalMaxAmount) {
                    _netShareVal += las.totalsharevalue;

                    if (las.eligiableAmt >= maxValues.catA) {
                        netEligibleLoanAmt += las.eligiableAmt;
                        textValue.addClass('text-red');
                        textValue.html('Value of Share X Quantity: ₹' + las.totalsharevalue.toLocaleString("EN-IN"));
                        categoryTextValue.innerHTML = " Category A: Your eligible loan amount cannot exceed ₹3Cr per scrip.. "
                    }

                }
                break;
            case "CAT B":
                if (netEligibleLoanAmt <= maxValues.totalMaxAmount) {
                    _netShareVal += las.totalsharevalue;
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
                                $(".las-value-share-quantity .las-company-values p span").html(parseInt(las.totalsharevalue).toLocaleString("en-in"));
                                $(".las-main-inner .las-company-right li").not('.las-company-values').find("span").html(0);
                            }
                            else {
                                context.find(".las-value p").html(parseInt(las.totalsharevalue).toLocaleString("en-in"));
                                context.find(".las-eli-amt p").html(0);
                            }
                            break;
                        }
                        if (las.eligiableAmt > _groupVal * maxValues.catBPerc) {
                            las.eligiableAmt = _groupVal * maxValues.catBPerc;
                            // selectedCompaniesData.exceedFlag = true;
                            // netEligibleLoanAmt += las.eligiableAmt;
                            // console.warn("exceeded...");
                            // $(context).find(".las-calc-container-element-msg").show();
                            textValue.addClass('text-red');
                            textValue.html('Value of Share X Quantity: ₹' + las.totalsharevalue.toLocaleString("EN-IN"));
                            categoryTextValue.innerHTML = "Category B: Your eligible loan amount per scrip cannot exceed 40% of the total loan amount."
                            // $(context).find(".las-calc-container-element-core-info-display").first().css("color", "#ff0000");
                            // $(context).find(".rate-share").first().css("color", "#ff0000");
                            // $(context).find(".cat-c-text").show();
                            break;
                        } else {
                            las.eligiableAmt = las.eligiableAmt;
                            // selectedCompaniesData.exceedFlag = false;
                            netEligibleLoanAmt += las.eligiableAmt;
                            // console.log("success");
                            // $(context).find(".las-calc-container-element-core-info-display").first().css("color", "");
                            // $(context).find(".rate-share").first().css("color", "");
                            // $(context).find(".cat-c-text").text("");
                            textValue.removeClass('text-red');
                            textValue.html('Value of Share X Quantity: ₹' + las.totalsharevalue.toLocaleString("EN-IN"));
                            categoryTextValue.innerHTML = ""
                        }
                        if (netEligibleLoanAmt > maxValues.totalMaxAmount) {
                            var _exceededAmt = netEligibleLoanAmt - maxValues.totalMaxAmount;
                            las.eligiableAmt -= _exceededAmt;
                            netEligibleLoanAmt -= _exceededAmt;
                        }
                        break;
                    } else {
                        _netShareVal += las.totalsharevalue;
                        break;


                    }
                }
                break;
            case "CAT C":
                if (groupCatCodes.indexOf("SUPER CAT A") === -1 && groupCatCodes.indexOf("CAT A") === -1 && groupCatCodes.indexOf("CAT B") === -1) {
                    // debugger;
                    _netShareVal += las.totalsharevalue;
                    textValue.addClass('text-red');
                    textValue.html('Value of Share X Quantity: ₹' + las.totalsharevalue.toLocaleString("EN-IN"));
                    categoryTextValue.innerHTML = "Category C: Scrips cannot be pledged alone, need to pledge Super CAT-A, CAT-A or CAT-B along with CAT-C "

                    break;
                }
                if (_groupCatValue <= _groupVal * maxValues.groupCatCPerc && netEligibleLoanAmt < maxValues.totalMaxAmount) {
                    _netShareVal += las.totalsharevalue;
                    if (las.eligiableAmt > _groupVal * maxValues.catCPerc) {
                        las.eligiableAmt = _groupVal * maxValues.catCPerc;

                        textValue.addClass('text-red');
                        textValue.html('Value of Share X Quantity: ₹' + las.totalsharevalue.toLocaleString("EN-IN"));
                        categoryTextValue.innerHTML = "Category C: Add another scrip or reduce the pledged share value."
                        
                        break;
                    } else {
                        las.eligiableAmt = las.eligiableAmt;
                        netEligibleLoanAmt += las.eligiableAmt;
                        textValue.removeClass('text-red');
                        textValue.html('Value of Share X Quantity: ₹' + las.totalsharevalue.toLocaleString("EN-IN"));
                        categoryTextValue.innerHTML = ""

                    }
                    if (netEligibleLoanAmt > maxValues.totalMaxAmount) {
                        var _exceededAmt = netEligibleLoanAmt - maxValues.totalMaxAmount;
                        las.eligiableAmt -= _exceededAmt;
                        netEligibleLoanAmt -= _exceededAmt;
                    }
                    break;
                } else {
                    _netShareVal += las.totalsharevalue;
                    if (_groupCatValue > _groupVal * maxValues.groupCatCPerc && netEligibleLoanAmt < maxValues.totalMaxAmount) {
                        textValue.addClass('text-red');
                        textValue.html('Value of Share X Quantity: ₹' + las.totalsharevalue.toLocaleString("EN-IN"));
                        categoryTextValue.innerHTML = "Category C: Add another scrip or reduce the pledged share value";

                        break;
                    }
                    break;
                }
                break;
                case "CAT D":
                    if (groupCatCodes.indexOf("SUPER CAT A") === -1 && groupCatCodes.indexOf("CAT A") === -1 && groupCatCodes.indexOf("CAT B") === -1) {
                        _netShareVal += las.totalsharevalue;
                        // $(context).find(".las-calc-container-element-core-info-display").first().css("color", "#ff0000");
                        // $(context).find(".rate-share").first().css("color", "#ff0000");
                        // errorText="Category D: Scrips cannot be pledged alone, need to pledge Super CAT-A, CAT-A or CAT-B along with CAT-D";
                        // context.find(".error").text(errorText);
                        //     context.find(".las-value p").addClass("red");
                        //     context.find(".las-value-share-quantity .las-company-values p").addClass("red");
                            textValue.addClass('text-red');
                            textValue.html('Value of Share X Quantity: ₹' + las.totalsharevalue.toLocaleString("EN-IN"));
                            categoryTextValue.innerHTML = "Category D: Scrips cannot be pledged alone, need to pledge Super CAT-A, CAT-A or CAT-B along with CAT-D";
    
                        // $(context).find(".cat-c-text").show();
                        break;
                    }
                    if (_groupCatValue <= _groupVal * maxValues.groupCatDPerc && netEligibleLoanAmt < maxValues.totalMaxAmount) {
                        _netShareVal += las.totalsharevalue;
                        if (las.eligiableAmt > _groupVal * maxValues.catDPerc) {
                            las.eligiableAmt = _groupVal * maxValues.catDPerc;
                            // selectedCompanyData.exceedFlag = true;
                            netEligibleLoanAmt += las.eligiableAmt;
                            // console.warn("exceeded...");
                            // $(context).find(".las-calc-container-element-msg").show();
                            // errorText="Category D: Add another scrip or reduce the pledged share value.";
                            // context.find(".error").text(errorText);
                            // context.find(".las-value p").addClass("red");
                            // context.find(".las-value-share-quantity .las-company-values p").addClass("red");
                            textValue.addClass('text-red');
                            textValue.html('Value of Share X Quantity: ₹' + las.totalsharevalue.toLocaleString("EN-IN"));
                            categoryTextValue.innerHTML = "Category D: Add another scrip or reduce the pledged share value.";
                        } else {
                            las.eligiableAmt = las.eligiableAmt;
                            // selectedCompanyData.exceedFlag = false;
                            netEligibleLoanAmt += las.eligiableAmt;
                            // console.log("success");
                            // $(context).find(".las-calc-container-element-core-info-display").first().css("color", "");
                            // $(context).find(".rate-share").first().css("color", "");
                            // $(context).find(".cat-c-text").text("");
                            // errorText="";
                            // context.find(".error").text(errorText);
                            // context.find(".las-value p").removeClass("red");
                            // context.find(".las-value-share-quantity .las-company-values p").removeClass("red");
                            textValue.removeClass('text-red');
                            textValue.html('Value of Share X Quantity: ₹' + las.totalsharevalue.toLocaleString("EN-IN"));
                            categoryTextValue.innerHTML = "";
                        }
                        if (netEligibleLoanAmt > maxValues.totalMaxAmount) {
                            var _exceededAmt = netEligibleLoanAmt - maxValues.totalMaxAmount;
                            las.eligiableAmt -= _exceededAmt;
                            netEligibleLoanAmt -= _exceededAmt;
                        }
                        
                        break;
                    } else {
                        _netShareVal += las.totalsharevalue;
                        if (_groupCatValue > _groupVal * maxValues.groupCatDPerc && netEligibleLoanAmt < maxValues.totalMaxAmount) {
                            // $(context).find(".las-calc-container-element-msg").show();
                            // errorText="Category D: Add another scrip or reduce the pledged share value.";
                            // context.find(".error").text(errorText);
                            // context.find(".las-value p").addClass("red");
                            // context.find(".las-value-share-quantity .las-company-values p").addClass("red");
                            textValue.addClass('text-red');
                            textValue.html('Value of Share X Quantity: ₹' + las.totalsharevalue.toLocaleString("EN-IN"));
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
    }


}
function getGroupValue(wholeCompanyJson) {
    var _groupValArr = [];
    // var _groupShareValue = LasLogic.getGroupShareValue(wholeCompanyJson);
    // var groupVal = 0;
    wholeCompanyJson.forEach(function (el) {
        var shareValue = !isNaN(parseInt(el.price)) ? parseInt(el.price) : 0;
        var shareQuantity = !isNaN(parseInt(el.quantity)) ? parseInt(el.quantity) : 0;
        var ltv = !isNaN(parseInt(el.ltv)) ? parseInt(el.ltv) : 0;
        if (shareQuantity !== 0) {
            var particularVal = function () {
                switch ((el.proposedcategory).toUpperCase()) {
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
function getGroupShareValue (wholeCompanyJson) {
    var groupValArr = [];
    wholeCompanyJson.forEach(function(el) {
        var shareValue = !isNaN(parseInt(el.price)) ? parseInt(el.price) : 0;
        var shareQuantity = !isNaN(parseInt(el.quantity)) ? parseInt(el.quantity) : 0;
        var ltv = !isNaN(parseInt(el.ltv)) ? parseInt(el.ltv) : 0;
        if (shareQuantity !== 0) {
            groupValArr.push((shareValue * shareQuantity));
        }
    });
    if (groupValArr.length !== 0) {
        var groupValues = groupValArr.reduce(function(a, b) { return a + b });
        return (groupValues > maxValues.totalMaxAmount) ? maxValues.totalMaxAmount : groupValues;
    }
    return 0;
}
function getGroupCatValue (catForFltr, wholeCompanyJson) {
    var groupValArr = [];
    if (catForFltr.toUpperCase() === "CAT C" || catForFltr.toUpperCase() === "CAT D") {
        wholeCompanyJson.forEach(function(el) {
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
        var groupCatValues = groupValArr.reduce(function(a, b) { return a + b });
        switch (catForFltr.toUpperCase()) {
            case "CAT C":
                return (groupCatValues > maxValues.totalMaxAmount) ? maxValues.totalMaxAmount * maxValues.groupCatCPerc : groupCatValues;
            case "CAT D":
                return (groupCatValues > maxValues.totalMaxAmount) ? maxValues.totalMaxAmount * maxValues.groupCatDPerc : groupCatValues;

        }
    }
    return 0;
}

function resetValues(){
    $('.price-only-comma').val(null);
    $('[jsname="filterStock"]').val(null);
    $('[jsname="shareQuantity"]').html('');
    $('.aGreen-category').html('');
    $('.category-text-val').html('');
    $('.qty-calc-values').html('₹0*');


}