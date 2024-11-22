/*webinars load more js*/
if ($('.js-webinarsAll-list').find('.js-webinars-list').length < 7) {
  $('.js-webinarsAll-list').siblings('.view-more-btn').addClass('d-none');
}
$('.js-webinarsAll-list .js-webinars-list').slice(0, 6).show();
$("#jsWebinarsLoadMore").on('click', function (e) {
  e.preventDefault();
  $(".js-webinarsAll-list .js-webinars-list:hidden").slice(0, 3).fadeIn();
  if ($(".js-webinarsAll-list .js-webinars-list:hidden").length == 0) {
    $("#jsWebinarsLoadLess").removeClass('d-none').fadeIn('slow');
    $("#jsWebinarsLoadMore").hide();
  }
});
$("#jsWebinarsLoadLess").on('click', function (e) {
  e.preventDefault();
  $('.js-webinarsAll-list .js-webinars-list:not(:lt(6))').fadeOut();
  $("#jsWebinarsLoadMore").fadeIn('slow');
  $("#jsWebinarsLoadLess").hide();
});
/*webinars load more js*/

/*Blogs load more js*/
if ($('.js-BlogsAll-list').find('.js-Blogs-list').length < 7) {
  $('.js-BlogsAll-list').siblings('.view-more-btn').addClass('d-none');
}
$('.js-BlogsAll-list .js-Blogs-list').slice(0, 6).show();
$("#jsBlogsLoadMore").on('click', function (e) {
  e.preventDefault();
  $(".js-BlogsAll-list .js-Blogs-list:hidden").slice(0, 3).fadeIn();
  if ($(".js-BlogsAll-list .js-Blogs-list:hidden").length == 0) {
    $("#jsBlogsLoadLess").removeClass('d-none').fadeIn('slow');
    $("#jsBlogsLoadMore").hide();
  }
});
$("#jsBlogsLoadLess").on('click', function (e) {
  e.preventDefault();
  $('.js-BlogsAll-list .js-Blogs-list:not(:lt(6))').fadeOut();
  $("#jsBlogsLoadMore").fadeIn('slow');
  $("#jsBlogsLoadLess").hide();
});

/*video*/
$('.custom-play-video').click(function (e) {
  var video = $(this).data('video');
  $('#videoIframe').attr('src', video);
});

/* filter logic */
var yearArr = [];
var monthArr = [];
var monthFiltArr = [];

$(document).ready(function () {
  showCardYear();
  showCardsMonth();
});

function showCardYear() {
  $('.filterSelectedId').click(function (event) {
    if (event.target.checked) {
      yearArr.push(String($(event.target).data('filtyear')));
    } else {
      yearArr = yearArr.filter(function (el) {
        return el != $(event.target).data('filtyear');
      });
    }
    updateDisplay();
    updateMonthFilt();
  });
}

function showCardsMonth() {
  $('.filterSelectedId2').click(function (event) {
    if (event.target.checked) {
      monthFiltArr.push(String($(event.target).data('inputmonth')));
    } else {
      monthFiltArr = monthFiltArr.filter(function (el) {
        return el != $(event.target).data('inputmonth');
      });
    }

    if (monthFiltArr.length === 0) {
      $('[data-month]').removeClass('d-none');
    } else {
      $('[data-month]').addClass('d-none');
      monthFiltArr.forEach(function (month) {
        $('[data-month="' + month + '"]').removeClass('d-none');
      });
    }
  });
}

function updateDisplay() {
  monthArr = [];
  if (yearArr.length === 0) {
    $('[data-year]').removeClass('d-none');
  } else {
    $('[data-year]').addClass('d-none');
    yearArr.forEach(function (year) {
      $('[data-year="' + year + '"]').removeClass('d-none');
      $('[data-year="' + year + '"]').each(function (index, element) {
        monthArr.push($(element).data('month'));
      });
    });
  }
  monthArr = removeDuplicates(monthArr);
}

function updateMonthFilt() {
  if (monthArr.length === 0) {
    $('[data-filtmonth]').parent('li').removeClass('d-none');
  } else {
    $('[data-filtmonth]').parent('li').addClass('d-none');
    monthArr.forEach(function (month) {
      $('[data-filtmonth="' + month + '"]').parent('li').removeClass('d-none');
    });
  }
}

function removeDuplicates(arr) {
  var uniqueArr = [];
  arr.forEach(function (item) {
    if (uniqueArr.indexOf(item) === -1) {
      uniqueArr.push(item);
    }
  });
  return uniqueArr;
}


$('[data-filtmonth="All"]').click(function () {
  $('.filterSelectedId2').prop('checked', false);
  showAllCards();
});

$('[data-filtyear="All"]').click(function () {
  $('.filterSelectedId').prop('checked', false);
  showAllCards();
});

function showAllCards() {
  $('[data-year]').removeClass('d-none');
}


try {
  if ($(".custom-dropdown-block .simple-bar").length > 0) {
    for (i = 0; i < $(".simple-bar").length; i++) {
      new SimpleBar($(".custom-dropdown-block .simple-bar")[i]);
    }
  }
} catch (e) { console.log(e); }