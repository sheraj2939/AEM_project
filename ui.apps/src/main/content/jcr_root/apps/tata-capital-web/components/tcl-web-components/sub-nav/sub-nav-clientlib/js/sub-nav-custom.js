  /*new seconday nav accordian 10-2-2023*/ 
  $('.jsNavAccordian [accod-head]').each(function (ele) {
    $(this).click(function () {
      $(this).parents('.accord-heads').toggleClass('active');
      $(this).parents('.accord-heads').siblings('[accod-body]').slideToggle('100');
      $(this).parents('[accod-row]').siblings('[accod-row]').find('.accord-heads').removeClass('active');
      $(this).parents('[accod-row]').siblings('[accod-row]').find('[accod-body]').slideUp();      
    })
  })

  $(document).ready(function(e){
    try{
    var backBtn=document.querySelector('.backtos');
    backBtn.addEventListener('click',function(e){
       window.history.back();
      });
    }catch(e){console.log(e)}
  });
  /*new seconday nav accordian 10-2-2023*/ 