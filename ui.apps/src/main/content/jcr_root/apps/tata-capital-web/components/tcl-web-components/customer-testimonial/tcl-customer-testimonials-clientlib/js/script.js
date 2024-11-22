window.addEventListener("DOMContentLoaded", function() {
$('.list-star').each(function(e,index){
var ratinghtml = "";
    var rating = index.dataset.rating
    for (var i = 0; i < rating; i++) {
                var elem = document.createElement("img");
                elem.setAttribute("src", "/content/dam/tata-capital-web/assets/img/star-fill.svg");
                elem.setAttribute("alt", "star");
                elem.setAttribute("loading", "lazy");
                $('.list-star')[e].append(elem);
    }
});

    try {
        if ($(".customer-say-slider .simple-bar").length > 0) {
          for (i = 0; i < $(".simple-bar").length; i++) {
            new SimpleBar($(".customer-say-slider .simple-bar")[i]);
          }
        }
      } catch(e) {console.log(e);}
});

