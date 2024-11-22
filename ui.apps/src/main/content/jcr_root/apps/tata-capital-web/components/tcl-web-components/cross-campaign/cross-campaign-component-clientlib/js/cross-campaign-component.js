$(document).ready(function () {
  /*18-10-2024*/

  // Show/Hide pagination based on the number of cards
  $('.wellness-cols').length >= 9 ? $('.new-paginations').removeClass('d-none') : $('.new-paginations').addClass('d-none');

  // Initialize search result list with all cards
  if ($('.wellness-cols').length > 0) {
    populateSearchList();
  }

  // Keyup event for search box
  $(".jsSearchTextBox").keyup(function () {
    var searchTextBox = $(this).val().toLowerCase().trim();
    $('.jsShowSearchText').text(searchTextBox);

    const cards = document.querySelectorAll('.wellness-cols');
    let resultsHTML = '';

    // Clear the previous search result list and hide all cards
    $('.searches-list ul').html('');
    $(cards).addClass('d-none');

    let resultsFound = false;

    cards.forEach(card => {
      const title = card.getAttribute('data-title');

      // Check if the card title matches the search query
      if (title.toLowerCase().includes(searchTextBox)) {
        $(card).removeClass('d-none');
        resultsFound = true;

        resultsHTML += `<li>
          <div class="searches-img">
            <img src="${$(card).find('.wellness-tops img').attr('src')}" alt="Product Image">
          </div>
          <p>${title}</p>
        </li>`;
      }
    });

    // Display search results or fallback to "no results found" message
    if (resultsFound) {
      $('.searches-list').removeClass('d-none').find('ul').html(resultsHTML);
      $('.no-results-founds').addClass('d-none');
    } else {
      $('.searches-list').addClass('d-none');
      $('.no-results-founds').removeClass('d-none');
    }
  });

  // Helper function to populate the search list with all cards
  function populateSearchList() {
    let allCardsHTML = '';
    $('.wellness-cols').each(function (index, el) {
      allCardsHTML += `<li>
        <div class="searches-img">
          <img src="${$(el).find('.wellness-tops img').attr('src')}" alt="Product Image">
        </div>
        <p>${$(el).data('title')}</p>
      </li>`;
    });
    $('.searches-list ul').html(allCardsHTML);
  }

  // Focus/Blur events for search box
  $(".jsSearchTextBox").focus(function () {
    $(this).parents(".jsSearchBox").addClass("opened");
  })
    .blur(function () {
      var $searchBox = $(this).parents(".jsSearchBox");
      // Delay the removal of the "opened" class slightly
      setTimeout(function () {
        $searchBox.removeClass("opened");
      }, 200);  // 200 milliseconds delay
    });
  //result click
  $('.searches-list').on('click', 'li', function () {
    var clickedTitle = $(this).find('p').text();
    console.log('Tejas')
    // Set the clicked title into the search input box
    $(".jsSearchTextBox").val(clickedTitle);

    // Trigger the keyup event to show the correct card
    $(".jsSearchTextBox").trigger('keyup');
  });
  /* Pagination handling */
  $('.page-item .page-link').click(function (e) {
    var currentText = e.target.text;
    $('.wellness-row').addClass('d-none');  // Hide all sections
    $('.page-item').removeClass('active');  // Remove active class from all pagination items
    $(e.target).parents('.page-item').addClass('active');  // Set clicked pagination as active
    $('[data-section="' + currentText + '"]').removeClass('d-none');  // Show the section corresponding to the clicked page
  });
  /*18-10-2024*/
});


var copyBtn=document.querySelectorAll('.jsCopyLink');
copyBtn.forEach(function(item){
    item.addEventListener('click',function(e){
        var shareUrl = $(this).data('shareurl');
        navigator.clipboard.writeText(shareUrl);
    })
});