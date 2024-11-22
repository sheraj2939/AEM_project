/* $(document).ready(function () {
    var customerRating
    var reqObj = {};
    customerSpeakFilterObj.customerSpeak(reqObj).then(function (response) {
        customerRating = JSON.parse(response.response).Master;
        var ratingCount;
        var productName = $('.banner-ratings-outer').attr('data-product').toLowerCase();
        console.log(productName);
        var ratingTotal = [];
        customerRating.filter(function (product) {
            if (product.products.toLowerCase() === productName) {
                ratingTotal.push(Number(product['ratings']));
            };
        });

        function calculateAverage(ratingArr) {
            var sum = 0;
            ratingCount = ratingArr.length;
            for (var i = 0; i < ratingArr.length; i++) {
                sum += ratingArr[i];
            }
            return Math.round(sum / ratingArr.length);
        }
        var average = calculateAverage(ratingTotal);
        for (var k = 0; k < 5; k++) {
            if (k < average) {
                $('.banner-rating-star').append('<img src="/content/dam/tata-capital-web/assets/img/star-fill-2.svg" alt="">');
            }
            else {
                $('.banner-rating-star').append('<img src="/content/dam/tata-capital-web/assets/img/star-no-fill-2.svg" alt="">');
            }
        };
        $('.banner-rating-review').append('<span class="rating-texts">(' + ratingCount + ' reviews)</span>');
    })

})




})*/ 
