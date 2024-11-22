window.addEventListener("DOMContentLoaded", function () {
  $('.list-star').each(function (e, index) {
    var rating = index.dataset.rating;
    for (var starNum = 0; starNum < 5; starNum++) {
      var elem = document.createElement("img");
      if (rating <= starNum) {
        elem.setAttribute("src", "/content/dam/tata-capital-web/img/star-no-fill.svg");
      } else {
        elem.setAttribute("src", "/content/dam/tata-capital-web/assets/img/star-fill.svg");
      }
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
  } catch (e) { console.log(e); }
});

