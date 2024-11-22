/*8-8-2024*/
function addClassWithInterval() {
    const container = document.getElementById('timeline-container');
    if (!container) {
        console.error('Container element not found');
        return;
    }

    const children = Array.from(container.children);
    if (children.length === 0) {
        console.error('No children in the container');
        return;
    }

    let currentIndex = 0;
    let progressInterval;
    let progress = 0;
    const duration = 5000; // Duration in milliseconds
    const interval = 10; // Update interval in milliseconds
    const increment = 100 / (duration / interval);

    const updateProgress = (child, progress) => {
        const progressCircle = child.querySelector('.progressCircle');
        if (progressCircle) {
            progressCircle.style.background = `conic-gradient(#B287D4 ${progress}%, #fff ${progress}% 100%)`;
        }
    };

    const highlightNextChild = () => {
        children.forEach((child, index) => {
            if (index < currentIndex) {
                child.classList.add('completed');
            } else {
                child.classList.remove('completed');
            }
            child.classList.remove('highlight');
        });

        const currentChild = children[currentIndex];
        currentChild.classList.add('highlight');
        progress = 0;
    };

    const startProgressInterval = () => {
        if (progressInterval) {
            clearInterval(progressInterval);
        }

        progressInterval = setInterval(() => {
            progress += increment;
            updateProgress(children[currentIndex], progress);

            if (progress >= 100) {
                clearInterval(progressInterval);
                currentIndex = (currentIndex + 1) % children.length;
                highlightNextChild();
                startProgressInterval();
            }
        }, interval);
    };

    highlightNextChild();
    startProgressInterval();

}

addClassWithInterval();
/*modal js*/
$('[data-popovermodal="popover-modal-step"]').click(function () {
    var ele_target = $(this).attr('data-target');
    setTimeout(function () {
        $(ele_target).addClass('popover-show');
        $('.slick-slider').slick("refresh");
    }, 80);
    $(ele_target).css('display', 'block');
    $('body').addClass('popover-modal-open');
    $('body').append('<div class="modal-backdrop"></div>');
    $('.js-sticky-actions').removeClass('active')
});

$('[data-dismiss="popover-step"]').on('click', function () {
    $(this).parents('.popover-modal').removeClass('popover-show');
    $(this).parents('.popover-modal').removeAttr('style');
    $('.height-scroll').removeAttr('style');
    $('body').removeClass('popover-modal-open');
    $('.modal-backdrop').remove();


    // var src = $('#video-modal iframe').attr('src');
    $('#step-video-modal iframe').attr('src', '');

});

/*modal js*/

// var vSource = $('.step-play-btn');
// console.log(vSource)
$('.step-play-btn').on('click', function (addSrc) {
    // console.log(addSrc);
    var videoSrc = addSrc.currentTarget.getAttribute('video-source');
    // console.log(videoSrc);
    var popUp = $('#step-video-modal .frameSrc');
    popUp.attr('src', videoSrc);
})