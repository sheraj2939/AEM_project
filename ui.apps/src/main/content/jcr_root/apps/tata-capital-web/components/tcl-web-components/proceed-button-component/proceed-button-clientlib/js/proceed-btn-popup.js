/* Disclaimer popup */
var applyBtn = document.querySelectorAll('.proceed-btn-popup');
var closeIcon = document.querySelector('#proceed-modal .icon-close');

try{
closeIcon.addEventListener('click', function () {
    let innerAttribute = document.querySelector('.proceed-popups .heading20');
    innerAttribute.innerHTML = " ";
    $('.proceed-popups .thirdLinkBtn').attr('href', " ");
})
}catch(e){console.log('element not found',e)}
applyBtn.forEach(function (thirdParty) {
    thirdParty.addEventListener('click', function (getAtrSrc) {
        let disclaimerAtr = getAtrSrc.target.getAttribute('data-disclaimer');
        let getLinkAtr = getAtrSrc.target.getAttribute('data-link-atr');
        let innerAttribute = document.querySelector('.proceed-popups .heading20');
        innerAttribute.innerHTML = disclaimerAtr;
        $('.proceed-popups .thirdLinkBtn').attr('href', getLinkAtr);
        $('#proceed-modal').addClass("popover-show");
        $('#proceed-modal').css('display', 'block');
        $('body').append('<div class="modal-backdrop"></div>');
        $('body').addClass('popover-modal-open');
    });
});