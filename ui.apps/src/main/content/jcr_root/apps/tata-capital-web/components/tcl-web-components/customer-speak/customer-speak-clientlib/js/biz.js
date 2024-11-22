
(function (_global) {
    var customerSpeakBizCallFn = (function (jsHelper) {
        var customerSpeakBizObj = {}
        var reqObj = {};
        var allApproved;
        var selectedlabelText = "All";
        if($('[jsname="customer-speak-js"]').length > 0){
        customerSpeakFilterObj.customerSpeak(reqObj).then(
            function (response) {
                var urlData = {};
                try{
                    if (location.search.split("?")[1]) {
                        location.search.split("?")[1].split("&").forEach(function (el) {
                            urlData[el.split("=")[0]] = decodeURIComponent(el.split("=")[1]).replace(/%20/g, " ");
                        });
                    }
                    var activeProduct = urlData.activeProduct;
                }
                catch(e){console.log(e)}
                // console.log("  active product  ",activeProduct)
                if (response.status.toLowerCase() == "success") {
                    var customerSpeakData = JSON.parse(response.response);
                    // var selectedlabelText;
                    var filteredData;
                    allApproved = customerSpeakData.Master.filter(function (customer) {
                        return customer.approval.toLowerCase()=="yes"
                    })
                    function starFilter() {
                        var sortedProducts = allApproved.sort(
                            (p1, p2) => (p1.ratings < p2.ratings) ? 1 : (p1.ratings > p2.ratings) ? -1 : 0);
                        $('.customer-speak-bottom').empty();
                        showData(sortedProducts)
                    }

                    function customerFilter(selectedlabelText) {
                        filteredData = allApproved.filter(function (customer) {
                            return customer.products == selectedlabelText && customer.approval.toLowerCase()=="yes"
                        })
                        $('.customer-speak-bottom').empty();
                        showData(filteredData)
                    }
                    function starRating(customer) {
                        var rating = Number(customer.ratings);
                        var starHtml = "";
                        switch (Math.ceil(rating)) {
                            case 1:
                                starHtml = '<img id="star1" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt=""><img id="star2" src="/content/dam/tata-capital-web/assets/img/star-no-fill-2.svg" alt=""><img id="star3" src="/content/dam/tata-capital-web/assets/img/star-no-fill-2.svg" alt=""><img id="star4" src="/content/dam/tata-capital-web/assets/img/star-no-fill-2.svg" alt=""><img id="star5" src="/content/dam/tata-capital-web/assets/img/star-no-fill-2.svg" alt="">'
                                break;
                            case 2:
                                starHtml = '<img id="star1" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt=""><img id="star2" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt=""><img id="star3" src="/content/dam/tata-capital-web/assets/img/star-no-fill-2.svg" alt=""><img id="star4" src="/content/dam/tata-capital-web/assets/img/star-no-fill-2.svg" alt=""><img id="star5" src="/content/dam/tata-capital-web/assets/img/star-no-fill-2.svg" alt="">'
                                break;
                            case 3:
                                starHtml = '<img id="star1" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt=""><img id="star2" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt=""><img id="star3" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt=""><img id="star4" src="/content/dam/tata-capital-web/assets/img/star-no-fill-2.svg" alt=""><img id="star5" src="/content/dam/tata-capital-web/assets/img/star-no-fill-2.svg" alt="">'
                                break;
                            case 4:
                                starHtml = '<img id="star1" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt=""><img id="star2" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt=""><img id="star3" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt=""><img id="star4" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt=""><img id="star5" src="/content/dam/tata-capital-web/assets/img/star-no-fill-2.svg" alt="">'
                                break;
                            case 5:
                                starHtml = '<img id="star1" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt=""><img id="star2" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt=""><img id="star3" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt=""><img id="star4" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt=""><img id="star5" src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt="">'
                                break;
                            default:
                                
                                console.log("wrong input");
                                break;

                        }
                        return starHtml;
                    }
                    function showData(data) {
                        $('.customer-speak-bottom').empty();
                        
                        var html = '';
                        
                        data.forEach(function (element, i) {
                            var date = renderDate(element.testimonialdate)
                            html += ' <div class="customer-speak-row"><div class="customer-speak-col"><div class="loan-details"><div class="loan-details-left"><p class="heading20">' + element.customername + '</p><div class="loan-inner"><div class="loan-inner-left"><p class="text16i text-suchsia">' + element.products + '</p></div><div class="loan-inner-right"><p class="text14i">' + date + '</p></div></div></div><div class="loan-details-right"><div class="list-star" id="rating' + i + '">' + starRating(element) + '</div></div></div><div class="loan-description"><p class="text14i">' + element.testimonialtext + '</p></div></div></div>';
                        
                        });
                        $('.customer-speak-bottom').append(html)
                        
                    }
                    function renderDate(dateString) {
                        var date = new Date(dateString);
                        var options = { day: "numeric", month: "short", year: "numeric" };
                        var newDateString = date.toLocaleDateString("en-US", options);
                        return newDateString;
                    }
                    function renderProducts() {
                        var data = customerSpeakData.Master.map(function (element, i) {
                            return element.products;
                        }).filter(function (item, i, ar) { return ar.indexOf(item) === i })
                        // console.log(data)
                        data.forEach(function (ele) {
                            if(ele.trim()!=""){
                                var listHtml = '<li class="list"><label class="custom-checkbox-label"><span class="custom-checkbox-new"><input type="radio"  name="filter" class="filterSelectedId"></span>' + ele + '</label></li>';
                            }
                            $('[jsname="customerFilter"]').append(listHtml)
                            // console.log(listHtml)
                        })
                        /* var filerHtml = '<li class="list"><label class="custom-checkbox-label"><span class="custom-checkbox-new"><input type="checkbox" class="filterSelectedId"></span>Star Rating</label></li>';
                        $('[jsname="customerFilter"]').append(filerHtml)*/
                        $('[jsname="customer-speak-js"] input[type="radio"]').click(function () {
                            if ($(this).prop("checked") == true) {
                                selectedlabelText = $(this).parent().parent().text().trim();
                                $('[data-rel="filer"]').text(selectedlabelText)
                                /*if (selectedlabelText == "Star Rating") {
                                    starFilter(selectedlabelText)
                                }*/
                                if (selectedlabelText == "All") {
                                    showData(allApproved);
                                }
                                else {
                                    customerFilter(selectedlabelText)
                                }
                            }
                        });
                        if (selectedlabelText == "All") {
                            showData(allApproved);
                        }
                    }
                    function renderfilteredProducts(){
                        if (activeProduct === "All") {
                            showData(allApproved);
                        }
                        else {
                            customerFilter(activeProduct)
                        }
                    }
                    if (location.search.split("?")[1]){
                        renderProducts();
                        renderfilteredProducts();
                    }
                    else{
                        renderProducts();
                    }

                }
            }).catch(function (error) { }); return jsHelper.freezeObj(customerSpeakBizObj);}
    })(jsHelper); _global.jsHelper.defineReadOnlyObjProp(_global, "customerSpeakBizObj", customerSpeakBizCallFn);
})(this || window || {});

