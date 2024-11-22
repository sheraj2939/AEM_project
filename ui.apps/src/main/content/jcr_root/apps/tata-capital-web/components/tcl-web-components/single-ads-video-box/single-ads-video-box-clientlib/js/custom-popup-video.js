try {
  var playButton = document.querySelector('[data-name="popup-play-btn"]');
  playButton.addEventListener('click', function () {
    // console.log('hi');
    let videoSrc = playButton.getAttribute('video-source');
    let popupVideoLink = document.querySelector('.i-frame');
    //   // console.log(popupVideoLink);
    popupVideoLink.setAttribute('src', videoSrc);
    //   console.log(videoSrc);
  });
} catch (err) {
  console.log(err);
}
