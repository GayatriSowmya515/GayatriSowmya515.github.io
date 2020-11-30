/////////////Scroll ////////////////////////////

function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;
    function animation(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }
        console.log(startTime);
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
        console.log('timeElapsed : ' + timeElapsed + 'duration: ' + duration);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);

}

var about = document.getElementsByClassName('menubar-1');
var projects = document.getElementsByClassName('menubar-2');
var skills = document.getElementsByClassName('menubar-3')

about[0].addEventListener('click', function () {
    smoothScroll('.aboutme', 1000);
})
projects[0].addEventListener('click', function () {
    smoothScroll('.myprojects', 1400);
})
skills[0].addEventListener('click', function () {
    smoothScroll('.myskills', 1100);
})