$(document).ready(function () {
  /*contact us page*/
  $('.jsRadioBtnContact').click(function () {
    var getName = $(this).attr('data-name');
    if(getName == "No"){
      $('.jsProceedBtnContact').attr('target', "");
    }else{
      $('.jsProceedBtnContact').attr('target', "_blank");
    }
    var getDataAttri = $(this).attr('data-href');
    console.log(getDataAttri);
    $('.jsProceedBtnContact').attr('href', getDataAttri);
    $('.jsProceedBtnContact').removeClass('btn-disabled');
  })
  $('.jsProceedBtnContact').click(function (e) {
// existing loan popup analytics START
    try {
      var existingAccount = '';
      var ctaText = e.currentTarget.innerText.trim();
      var ctaTitle = getParentElement(e.currentTarget, 4).querySelector('.reachout-modal-inner p').innerText.trim();
      var componentName = 'reachout popup';
      document.querySelectorAll('.contact-us-information-box .reachout-modal .custom-radio input').forEach(function (btn) {
        if (btn.checked) {
          existingAccount = btn.value;
        }
      });
      existingloanAccount(ctaText, componentName, ctaTitle, existingAccount);
      existingAccount = '';
    } catch (error) {
      console.log('element not found', error);
    }
    // existing loan popup analytics END
    $('.jsRadioBtnContact .custom-white-radio input').prop('checked', false);
    $('.jsProceedBtnContact').addClass('btn-disabled');
  })
  /*contact us page*/
});


