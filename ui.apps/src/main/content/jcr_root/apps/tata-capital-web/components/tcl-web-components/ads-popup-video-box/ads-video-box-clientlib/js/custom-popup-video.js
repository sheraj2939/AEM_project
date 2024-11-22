try{var test = document.querySelector('.play-btn');
test.addEventListener('click', function () {
  // console.log('Hi');
  let videoSrc = test.getAttribute('video-source');
  let popupVideoLink = document.querySelector('.i-frame');
  // console.log(popupVideoLink);
  popupVideoLink.setAttribute('src', videoSrc);
  console.log(videoSrc);
});
}catch(e){console.log('element not found', e);}