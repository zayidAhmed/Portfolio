const isMobile = window.innerWidth < 768;

if (!isMobile) {
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
}

// const scrollContainer = document.querySelector(".scroll-container");
// const scrollContent = document.querySelector(".scroll-content");
// const scrollbarThumb = document.querySelector(".scrollbar-thumb");

// let scrollY = 0;
// let targetScrollY = 0;
// let ease = 0.07; // Controls smoothness
// let maxScroll;

// function updateScrollLimits() {
//     maxScroll = scrollContent.offsetHeight - window.innerHeight;
// }

// function smoothScroll() {
//     scrollY += (targetScrollY - scrollY) * ease; // Smooth transition
//     scrollContent.style.transform = `translateY(${-scrollY}px)`;

//     // Update scrollbar position
//     let scrollRatio = scrollY / maxScroll;
//     scrollbarThumb.style.top = `${scrollRatio * (window.innerHeight - scrollbarThumb.offsetHeight)}px`;

//     requestAnimationFrame(smoothScroll);
// }

// window.addEventListener("wheel", (e) => {
//     targetScrollY += e.deltaY;
//     targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));
// });

// // Update scroll limits on resize
// window.addEventListener("resize", () => {
//     updateScrollLimits();
//     targetScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));
// });

// // Dragging the scrollbar thumb
// let isDragging = false;
// scrollbarThumb.addEventListener("mousedown", (e) => {
//     isDragging = true;
//     document.body.style.userSelect = "none"; // Prevent text selection
// });
// document.addEventListener("mouseup", () => isDragging = false);
// document.addEventListener("mousemove", (e) => {
//     if (!isDragging) return;
//     let newTop = e.clientY - scrollbarThumb.offsetHeight / 2;
//     newTop = Math.max(0, Math.min(newTop, window.innerHeight - scrollbarThumb.offsetHeight));
//     scrollbarThumb.style.top = `${newTop}px`;

//     // Sync scroll position with scrollbar movement
//     targetScrollY = (newTop / (window.innerHeight - scrollbarThumb.offsetHeight)) * maxScroll;
// });

// // Initialize values and start animation
// updateScrollLimits();
// smoothScroll();





// Toggle Nav Menu
const toggleBars = document.getElementById("toggle_bars");
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");
const toggleMenu = document.getElementById("menu-toggle");

let x = 0;
toggleBars.addEventListener("click", () => {
    if (x == 0) {
        toggleMenu.style.transform = "translateX(0)";
        toggleMenu.style.opacity = "1";
        toggleBars.style.right = "10px";
        bar1.style.transform = "rotate(45deg) translateX(6px) translateY(5px)";
        bar2.style.opacity = "0";
        bar3.style.transform = "rotate(-45deg) translateX(6px) translateY(-6px)";
        x = 1;
    } else {
        toggleMenu.style.transform = "translateX(100%)";
        toggleMenu.style.opacity = ".3";
        toggleBars.style.right = "30px";
        bar1.style.transform = "rotate(0deg) translateX(0px) translateY(0px)";
        bar2.style.opacity = "1";
        bar3.style.transform = "rotate(0deg) translateX(0px) translateY(0px)";
        x = 0;
    }
})



// progress bar
function setProgress(element, value) {
    const circle = element.querySelector('.progress');
    const percentageText = element.querySelector('.percentage');
    const totalLength = 440; // Circumference (2 * π * r)

    let offset = totalLength - (value / 100) * totalLength;
    circle.style.strokeDashoffset = offset;
    percentageText.textContent = `${value}%`;
}
document.querySelectorAll('.progress-container').forEach((container) => {
    let target = parseInt(container.getAttribute('data-progress'));
    let progress = 0;

    let interval = setInterval(() => {
        if (progress >= target) {
            clearInterval(interval);
        } else {
            progress++;
            setProgress(container, progress);
        }
    }, 20);
});



const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
        
        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();
