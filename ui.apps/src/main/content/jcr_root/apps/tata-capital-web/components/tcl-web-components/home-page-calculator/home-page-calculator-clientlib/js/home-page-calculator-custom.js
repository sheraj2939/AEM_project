$(".custom-js-tabClick").on("click", function () {
  let parent = $(this).parents('[tabMenu-wrap]');
  parent.scrollCenter($(this), 300);
});
$('.custom-api-call').on("click", function (e) {
  console.log()
  // debugger;
  try {
    renderApiCall();
    // debugger;
    renderAreaCalculator();
    // renderAreaCalculator();
  } catch (error) {
    console.error("Error !!!", error);
  }
})
try {
  // console.log(tabValue)
  $('.switch-tab').on('click', function () {
   $('.hpc-dropdown-heading').text($(this).text().trim())
   $(this).closest('#loan-dropdown').removeClass('show');
    // $(this).parents('[data-loanDropdown]').find('[data-loanDropdownItem]').addClass('d-none');
  })


} catch(e) {console.log(e) }
