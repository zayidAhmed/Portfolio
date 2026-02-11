// ---------------------
// GSAP and custom cursor
// ---------------------

// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
});

// Cursor hover effects
const hoverElements = document.querySelectorAll('h1, h2, h3, a, button, .service-card, .project-card, img');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 3, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
    });
});


// ---------------------
// Lightbox Codes
// ---------------------

function openLightbox(imgElement) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const caption = document.getElementById("caption");

    lightbox.style.display = "block";
    lightboxImg.src = imgElement.src;
    caption.textContent = imgElement.alt;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}



// ---------------------
// Nav Codes
// ---------------------

const menuOpen = document.getElementById("menuOpen");
const nav = document.getElementById("nav");
const header = document.getElementById("header");

menuOpen.addEventListener("click", () => {
    nav.classList.toggle("open");
    nav.classList.toggle("shift");
    menuOpen.classList.toggle("shift");
    menuOpen.textContent = nav.classList.contains("open") ? "CLOSE" : "MENU";
});

document.addEventListener('click', function (event) {
    // If the click is outside the div
    if (!nav.contains(event.target)) {
        nav.classList.remove("open");
        nav.classList.remove("shift");
        menuOpen.classList.remove("shift");
        menuOpen.textContent = "MENU";
    }
});

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        header.classList.add('slide');
    }, 10);
});


// ---------------------
// Smooth scrolling Codes
// ---------------------

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const isDesktop = window.innerWidth >= 1025;

            if (isDesktop) {
                // Smooth GSAP scroll for desktop
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: "power2.inOut"
                });
            } else {
                // Instant scroll for mobile/tablet
                const targetPosition = target.offsetTop - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'auto'
                });
            }
        }
    });
});


// ---------------------
// Preloader Codes
// ---------------------

window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    const main = document.getElementById("main");

    // Keep preloader for at least 2 seconds
    setTimeout(() => {
        preloader.style.opacity = "0";
        main.style.display = "block";

        // Wait for fade-out animation before hiding completely
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }, 2000);
});



// ---------------------
// Counter Codes
// ---------------------

function animateCounter(id, start, end, duration) {
    const obj = document.getElementById(id);
    let current = start;
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));

    const timer = setInterval(() => {
        current += increment;
        obj.textContent = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}
//             id,from,to,delay 
animateCounter("project", 0, 50, 3000);
animateCounter("experience", 0, 2, 2000);

// ---------------------
// Dynamic Tooltip Codes
// ---------------------

const tooltip = document.getElementById("tooltip");

document.addEventListener("mouseover", (e) => {
    const target = e.target.closest("[name]");
    if (target) {
        tooltip.textContent = target.getAttribute("name");
        tooltip.style.opacity = "1";
        document.addEventListener("mousemove", moveTooltip);
    }
});

document.addEventListener("mouseout", (e) => {
    if (e.target.closest("[name]")) {
        tooltip.style.opacity = "0";
        document.removeEventListener("mousemove", moveTooltip);
    }
});

function moveTooltip(e) {
    tooltip.style.left = e.pageX + 15 + "px";
    tooltip.style.top = e.pageY + 15 + "px";
}

// ---------------------
// Contact form Thank you message Popup Codes
// ---------------------

const form = document.getElementById("contactForm");
const popup = document.getElementById("successPopup");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const button = form.querySelector("button");
    button.disabled = true;
    button.innerHTML = "Sending...";

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            popup.classList.add("active");
            form.reset();
        } else {
            alert("Something went wrong.");
        }

    } catch (error) {
        alert("Network error.");
    }

    button.disabled = false;
    button.innerHTML = `Send Message <i class="ri-arrow-right-up-line"></i>`;
});

function closePopup() {
    popup.classList.remove("active");
}



// ---------------------
// Footer Year Update
// ---------------------
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
