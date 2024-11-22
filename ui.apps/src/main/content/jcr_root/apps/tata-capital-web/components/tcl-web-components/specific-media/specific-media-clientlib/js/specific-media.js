/*29-8-2024*/
document.addEventListener('DOMContentLoaded', function () {
    const trainingItems = document.querySelectorAll('.training-item');
    const mediaRows = document.querySelectorAll('.media-holder-row');
    const conicBorders = document.querySelectorAll('.conic-gradient-border');
    let currentIndex = 0;
    let startTime;

    function startProgress(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        const progress = Math.min((elapsed / 5000) * 100, 100);
        conicBorders[currentIndex].style.background = `linear-gradient(to right, #FFE800 ${progress}%, transparent ${progress}% 100%)`;

        if (progress < 100) {
            requestAnimationFrame(startProgress);
        } else {
            updateSlider();
        }
    }

    function updateSlider() {
        trainingItems[currentIndex].classList.remove('active');
        mediaRows[currentIndex].classList.add('d-none');
        conicBorders[currentIndex].style.display = 'none';
        conicBorders[currentIndex].style.background = 'linear-gradient(to right, #FFCC02 0%, transparent 0%)';

        currentIndex = (currentIndex + 1) % trainingItems.length;

        trainingItems[currentIndex].classList.add('active');
        mediaRows[currentIndex].classList.remove('d-none');
        conicBorders[currentIndex].style.display = 'block';
        startTime = null;
        requestAnimationFrame(startProgress);
    }

    mediaRows[0].classList.remove('d-none');
    conicBorders[0].style.display = 'block';
    requestAnimationFrame(startProgress);
});
/*29-8-2024*/ 