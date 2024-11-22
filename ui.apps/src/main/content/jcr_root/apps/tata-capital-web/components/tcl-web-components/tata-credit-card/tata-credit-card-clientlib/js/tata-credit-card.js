
  /*tata card apply 4-1-2023*/ 
  $('.jsApplyRadioBtn').click(function(){
    var getDataAttri = $(this).attr('data-target');
    console.log(getDataAttri);
    $('.jsBtnApplySubmit').attr('data-target', getDataAttri);
    $('.jsBtnApplySubmit').removeClass('btn-disabled');
  })
  $('.jsBtnApplySubmit').click(function(){
    $('.jsApplyRadioBtn .custom-white-radio input').prop('checked', false);
    $('.jsBtnApplySubmit').addClass('btn-disabled');
        
  })
  /*tata card apply 4-1-2023*/ 
