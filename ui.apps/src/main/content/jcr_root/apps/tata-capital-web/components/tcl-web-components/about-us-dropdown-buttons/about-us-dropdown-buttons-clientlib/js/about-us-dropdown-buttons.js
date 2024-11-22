//Tab dropdown js
/*$('.jsTabDropdown .tab-drop-btn').click(function (){
  if ($(window).width() < 768) {
    $('.jsTabDropdown [data-tab]').removeClass('active');
    $('.jsTabDropdown [data-tab]').removeClass('active');
    $('.jsTabDropdown .jsDropdownBlock').removeClass('show');
  }
  var clickBtn =  $(this).attr('tab-menu');
  var text =  $(this).html();
  $('.jsTabDropdown .custom-tab-drop-btn').html(text);
  $('.jsTabDropdown [tab-content]').removeClass('active')
  $('.jsTabDropdown [tab-content="' + clickBtn + '"]').addClass('active');
});


$('[data-tab]').on('click', function () {
  var $id = $(this).attr('data-tab');
  if ($('#' + $id).css('display') == 'none') {
    $('.jsDropdownBlock').removeClass('show');
    $('[data-tab]').removeClass('active')
    $(this).addClass('active');
    $('#' + $id).addClass('show');
  }
  else {
    $('[data-tab]').removeClass('active')
    $('#' + $id).removeClass('show');
  }
})
$(document).on("click", function (event) {
  var $trigger = $(".close-on-outside");
  if ($trigger !== event.target && !$trigger.has(event.target).length) {
    $('[data-tab]').removeClass('active');
    $(".jsDropdownBlock").removeClass("show");
  }
});*/
//Tab dropdown js



/*select all filter js*/
$('#filterSelectall').click(function () {
  $('.filterSelectedId').prop('checked', this.checked);
});

$('.filterSelectedId').change(function () {
  var check = ($('.filterSelectedId').filter(":checked").length == $('.filterSelectedId').length);
  $('#filterSelectall').prop("checked", check);
});

window.addEventListener('DOMContentLoaded', function () {
  /*select all filter js*/
  $('#filterSelectall').click(function () {
    $('.filterSelectedId').prop('checked', this.checked);
  });

  $('.filterSelectedId').change(function () {
    var check = ($('.filterSelectedId').filter(":checked").length == $('.filterSelectedId').length);
    $('#filterSelectall').prop("checked", check);
  });

  /*filter function for related videos*/
  var checkBoxes = document.querySelectorAll('.filterSelectedId');
  var year = document.querySelectorAll('.post-date');
  var yearParent = $('.post-date').closest(".block-left");
  var allFilterSelect = document.querySelector('#filterSelectall');

  /*getting value true or false form filter checkbox*/
  try{
    var newValue = {};
    for (i = 0; i < checkBoxes.length; i++) {
      newValue[checkBoxes[i].parentElement.nextElementSibling.innerText] = false;
    }
  } catch(err) {
    console.log('media center filter clash', err);
  }


  // showall card on all click 
  if (allFilterSelect) {
    allFilterSelect.addEventListener('change', function (showAll) {
      if (showAll.target.checked) {
        $('.block-left').removeClass("d-none");
      }
    });
  }


  // showing showCard
  function showCard() {
    var falseFilter = true;
    year.forEach(function (years) {
      var currentCardYear = years.innerHTML.split(" ")[2];
      if (newValue[currentCardYear] == true) {
        $(years).closest(".block-left").removeClass("d-none")
        years.closest(".block-left");
        falseFilter = false;
      } else {
        $(years).closest(".block-left").addClass("d-none");
      }
    })


    if (falseFilter) {
      $('.block-left').removeClass("d-none");
    }
  }

  checkBoxes.forEach(function (checkBox) {
    checkBox.addEventListener('click', function (e) {
      checkBoxes.forEach(function (check) {
        var checkValue = check.parentElement.nextElementSibling.innerHTML;
        if (check.checked) {
          newValue[checkValue] = true;
        } else {
          newValue[checkValue] = false;
        }
      })
      showCard();
    })
  });
});
try {
  if ($(".about-us-dropdown-buttons .simple-bar").length > 0) {
    for (i = 0; i < $(".simple-bar").length; i++) {
      new SimpleBar($(".about-us-dropdown-buttons .simple-bar")[i]);
    }
  }
} catch(e) {console.log(e);}