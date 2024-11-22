var pSource = document.querySelectorAll('.play-icon');
// console.log(vSource)
pSource.forEach(function (param) {
  param.addEventListener('click', function (addSrc) {
    var videoSrc = addSrc.target.getAttribute('video-source');
    var modalTitle = addSrc.target.getAttribute('modal-title');
    var modalDescription = addSrc.target.getAttribute('modal-description');
    document.querySelector('.right-col h3 span').innerHTML = modalTitle;
    document.querySelector('.right-col p').innerHTML = modalDescription;
    var popUp = document.querySelector('.frameSrc');
    popUp.setAttribute('src', videoSrc);
  })
});