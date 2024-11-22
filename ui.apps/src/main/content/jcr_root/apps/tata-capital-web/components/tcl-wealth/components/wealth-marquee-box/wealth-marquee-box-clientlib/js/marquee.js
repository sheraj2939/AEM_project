$(document).ready(function () {
  if ($('.jsMarquee').length > 0) {
    $('.jsMarquee').marquee({
      direction: 'left',
      speed: 80,
      gap: '0px',
      delayBeforeStart: 0,
      duplicated: true,
      startVisible: true,
      pauseOnHover: true
    });
  }
  // Wealth Marquee Box Analytics START
  var marqueeBox = document.querySelectorAll('.wealth-marquee-box .js-marquee')
  marqueeBox && marqueeBox.forEach(el => el.addEventListener('click', function(e){
      if(e.target.tagName === 'A')
      var ctaText = e.target.innerText;
      var componentName = 'sub menu';
      submenuClick(ctaText, componentName, '')
  }))
  // Wealth Marquee Box Analytics END
})