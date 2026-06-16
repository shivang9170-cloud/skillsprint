// ================================
// 🚀 SkillSprint Main JS File
// ================================

// Wait until DOM loads
document.addEventListener("DOMContentLoaded", () => {

    initScrollAnimation();
    initSmoothScroll();
    initHeroButton();
    initNavbarEffect();

});


// ================================
// 📸 Scroll Reveal Animation
// ================================
function initScrollAnimation() {
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.2
    });

    cards.forEach(card => {
        observer.observe(card);
    });
}


// ================================
// 🎯 Smooth Scroll for Links
// ================================
function initSmoothScroll() {
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("click", function (e) {

            if (this.hash !== "") {
                e.preventDefault();

                const target = document.querySelector(this.hash);
                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });
}


// ================================
// 🚀 Hero Button Action
// ================================
function initHeroButton() {
    const btn = document.querySelector(".hero button");

    if (btn) {
        btn.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }
}


// ================================
// 🌌 Navbar Scroll Effect
// ================================
function initNavbarEffect() {
    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.style.background = "rgba(0,0,0,0.6)";
            nav.style.backdropFilter = "blur(10px)";
        } else {
            nav.style.background = "transparent";
        }
    });
}


// ================================
// 💫 Optional: Mouse Glow Effect
// ================================
document.addEventListener("mousemove", (e) => {

    let glow = document.getElementById("cursor-glow");

    if (!glow) {
        glow = document.createElement("div");
        glow.id = "cursor-glow";
        document.body.appendChild(glow);

        glow.style.position = "fixed";
        glow.style.width = "100px";
        glow.style.height = "100px";
        glow.style.borderRadius = "50%";
        glow.style.background = "radial-gradient(circle, rgba(0,255,255,0.3), transparent)";
        glow.style.pointerEvents = "none";
        glow.style.zIndex = "9999";
        glow.style.transform = "translate(-50%, -50%)";
    }

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});