window.addEventListener("DOMContentLoaded", function() {

  $('.jsCopyLink').click(function () {
    $('.jsCopyLink').removeClass('copied');
    $(this).addClass('copied');
    $(this).find('.text-copy').text('Copied');
    setTimeout(function () {
      $('.jsCopyLink').removeClass('copied');
      $('.jsCopyLink .text-copy').text('Copy');
    }, 2500)
  })

  /*
$('.js-fi-share-btn').on('click', function(e){
    e.preventDefault();
    // e.stopImmediatePropagation();0
    if($(this).siblings('.share-bundle-menu').hasClass('active')){
      $(this).siblings('.share-bundle-menu').toggleClass('active');
      // $('.' + this.id).toggleClass('active')
    } else{
      $('.share-bundle-menu').removeClass('active');
      $(this).siblings('.share-bundle-menu').addClass('active')
    }    
    e.stopPropagation()
  }); */


var socialbtn = document.querySelectorAll('.social-btn');
socialbtn.forEach(function(item){
    item.addEventListener('click',function (e) {
            e.preventDefault();
            switch ($(this).attr('data-share')) {
                case 'whatsapp-icon':
                    var shareUrl=$(this).data('shareurl');
                    console.log('whatsapp');
                    window.open("https://api.whatsapp.com/send?text=" + shareUrl);
                    break;
                case 'facebook-icon':
                    var shareUrl=$(this).data('shareurl');
                    console.log('facebook');
 					window.open("https://facebook.com/sharer/sharer.php?u\x3d" + shareUrl, "width\x3d370,height\x3d300");
                    break;
                case 'twitter-share':
                    var shareUrl=$(this).data('shareurl');
                    console.log('twitter');
					var twittWindow = window.open('https://twitter.com/share?url=' + shareUrl, 'height=350,width=600');
                    break;

            }
        });

});

var copyBtn=document.querySelectorAll('.jsCopyLink');
copyBtn.forEach(function(item){
    item.addEventListener('click',function(e){
        var shareUrl = $(this).data('shareurl');
        navigator.clipboard.writeText(shareUrl);
    })
});
if($(window).width() < 992){
    var showChar = 58;
  }  
  if($(window).width() < 374){
    var showChar = 48;
  }  
  else {
    var showChar = 48;   
  }  
  $('.fi-overlay-card .fi-card-mid h6').each(function(){
      var content = $(this).html();
      if(content.length > showChar){
          var showLine = content.substr(0, showChar);
          var remainContent = content.substr(showChar, content.length - showChar);
          var allContent = showLine + '<span class="remaining-content d-none">' + remainContent + '</span> <span>...</span>';
          $(this).html(allContent);
      }
  })
  $('.fi-overlay-card .fi-card-mid p').each(function(){
    var content = $(this).html();
    if(content.length > showChar){
        var showLine = content.substr(0, showChar);
        var remainContent = content.substr(showChar, content.length - showChar);
        var allContent = showLine + '<span class="remaining-content d-none">' + remainContent + '</span> <span>...</span>';
        $(this).html(allContent);
    }
})
});