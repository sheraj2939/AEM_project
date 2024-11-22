
  // window.addEventListener("DOMContentLoaded", function() {
  //   $(document).click(function (e) {
  //     var clicked = $(e.target);
  //     var opened = $(".js-close-outside").hasClass("show");
  //     if (opened === true && !clicked.hasClass('js-shares-btn')) {
  //       $(".js-close-outside").removeClass('show');
  //       $('.js-shares-btn').removeClass('active');
  //     }
  //   });
  //   $('.js-shares-btn').click(function () {
  //     if ($(this).hasClass('active')) {
  //       $(".js-close-outside").removeClass('show');
  //       $('.js-shares-btn').removeClass('active');
  //     } else {
  //       $(".js-close-outside").removeClass('show');
  //       $('.js-shares-btn').removeClass('active');
  //       $(this).toggleClass('active');
  //       $(this).parents('.js-close-outside').toggleClass('show');
  //     }
  //   });
    
    
  //     /*modal js*/
  //     $('[data-popovermodal="popover-modal"]').click(function () {
  //       var ele_target = $(this).attr('data-target');
  //       setTimeout(function () {
  //         $(ele_target).addClass('popover-show');
  //         $('.slick-slider').slick("refresh");
  //       }, 80);
  //       $(ele_target).css('display', 'block');
  //       $('body').addClass('popover-modal-open');
  //       $('body').append('<div class="modal-backdrop"></div>');
  //       $('.js-sticky-actions').removeClass('active')
  //     });
    
  //     $('[data-dismiss="popover-modal"]').on('click', function () {
  //       $(this).parents('.popover-modal').removeClass('popover-show');
  //       $(this).parents('.popover-modal').removeAttr('style');
  //       $('.height-scroll').removeAttr('style');
  //       $('body').removeClass('popover-modal-open');
  //       $('.modal-backdrop').remove();
    
    
  //       var src = $('#video-modal iframe').attr('src');
  //       $('#video-modal iframe').attr('src', '');
    
  //     });
    
  //     /*modal js*/
  
  // });
  

  var vSource = document.querySelectorAll('.media-figure');
  // console.log(vSource)
  vSource.forEach(function (params) {
    params.addEventListener('click', function (addSrc) {
      // console.log(addSrc);
      var videoSrc = addSrc.target.getAttribute('video-source');
      // console.log(videoSrc);
  
      var popUp = document.querySelector('#frameSrcProduct');
      popUp.setAttribute('src', videoSrc);
    })
  });
  var vSource = document.querySelectorAll('.testi-play-btn');
  // console.log(vSource)
  vSource.forEach(function (params) {
    params.addEventListener('click', function (addSrc) {
      // console.log(addSrc);
      var videoSrc = addSrc.target.getAttribute('video-source');
      // console.log(videoSrc);
      var popUp = document.querySelector('.frameSrc');
      popUp.setAttribute('src', videoSrc);
    })
  });



/*var socialShare = document.querySelectorAll('.social-btn');
socialShare.forEach(function(val){
    val.addEventListener('click',function (f) {
            // f.prevDefault();
            switch ($(this).attr('data-share')) {
                case 'whatsapp-icon':
                    var shareUrl=$(this).data('shareurl');
                    console.log('whatsapp');
                    window.open("https://api.whatsapp.com/send?text=" + shareUrl);
                    break;
                case 'facebook-icon':
                    var shareUrl=$(this).data('shareurl');
                    console.log('facebook');
 					window.open("https://facebook.com/sharer/sharer.php?u\x3d" + shareUrl);
                    break;
                case 'twitter-share':
                    var shareUrl=$(this).data('shareurl');
                    console.log('twitter');
					var twittWindow = window.open('https://twitter.com/share?url=' + shareUrl);
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
}); */

