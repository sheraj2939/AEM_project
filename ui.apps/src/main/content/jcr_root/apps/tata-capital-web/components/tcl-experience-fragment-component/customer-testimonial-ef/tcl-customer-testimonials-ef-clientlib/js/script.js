$('.list-star').each(function(e,index){
  var ratinghtml = "";
      var rating = index.dataset.rating
      for (var i = 0; i < rating; i++) {
                  var elem = document.createElement("img");
                  elem.setAttribute("src", "/content/dam/tata-capital-web/assets/img/star-fill.svg");
                  elem.setAttribute("alt", "star");
                  elem.setAttribute("height", "14");
                  elem.setAttribute("width", "14");
                  $('.list-star')[e].append(elem);
      }
  });