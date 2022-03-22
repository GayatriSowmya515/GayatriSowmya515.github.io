//ScrollOut();

function loadDetails(details) {

    // console.log(details)
    for (const detail in details) {
        if(detail == 'projects'){
            loadProjects(details[detail]);
        }
        else if(detail == 'social_profiles'){
            loadProfiles(details[detail]);
        }
        else if(detail == 'skills'){
            loadSkills(details[detail]);
        }
        else if(detail == 'resume'){
            loadResume(details[detail]);
        }
        else{
            var div = document.getElementById(detail);
            div.innerHTML = details[detail];
        }

    };

}

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                 
                    loadDetails(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

const object = loadJSON('details.json',
         function(data) {},
         function(xhr) { console.error(xhr); }
);
/////////////////////////

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
var skills = document.getElementsByClassName('menubar-3');
var btn = document.getElementsByClassName('myBtn');

about[0].addEventListener('click', function () {
    smoothScroll('.aboutme', 1000);
})
projects[0].addEventListener('click', function () {
    smoothScroll('.myprojects', 1400);
})
skills[0].addEventListener('click', function () {
    smoothScroll('.myskills', 1100);
})
btn[0].addEventListener('click', function () {
    smoothScroll('.menubar', 1000);
})



//////////////////////navbar menu ////////////////////////////////////////

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos && currentScrollPos != 0) {
        document.getElementById("navbar").style.top = "-7px";
        document.getElementById("navbar").classList.add("add-shadow");
    }
    else if (currentScrollPos == 0) {
        document.getElementById("navbar").style.top = "0";
        document.getElementById("navbar").classList.remove("add-shadow");
    }
    else {
        document.getElementById("navbar").style.top = "-70px";
        document.getElementById("navbar").classList.remove("add-shadow");
    }


    prevScrollpos = currentScrollPos;




    ////////////////////////////////scrolltop///////////////////////////
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btn[0].style.display = "block";
    } else {
        btn[0].style.display = "none";
    }
}



/////////////////////////////////loader///////////////////////////////////////////


window.addEventListener('load', () => {
    init();


});

const loader = document.querySelector('.preload');
const main = document.querySelector('.container');
const icons = document.querySelector(".sicons");
const menu = document.querySelector(".menubar");


function init() {
    setTimeout(() => {
        loader.style.display = 'none';
        loader.style.opacity = 0;

        main.style.display = 'grid';
        icons.style.display = 'grid';
        menu.style.display = 'grid';
        setTimeout(() => (main.style.opacity = 1), 50);
        AOS.init();
        if (window.screen.width <= 700) {
            icons.style.display = 'none';
            menu.style.display = 'none';
            console.log(window.screen.width);
        }

        console.log(window.screen.width);
    }, 1400);


}



