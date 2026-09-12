/* =========================================================
   SUMIT KUMAR SHARMA - PERSONAL PORTFOLIO
   Vanilla JavaScript
   ========================================================= */


/* ==================== DOM ELEMENTS ==================== */

const body = document.body;

const menuToggle = document.getElementById("menu-toggle");
const navWrapper = document.getElementById("nav-wrapper");
const navLinks = document.querySelectorAll(".nav-link");

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const sections = document.querySelectorAll("main section");

const revealElements = document.querySelectorAll(".reveal");

const skillBars = document.querySelectorAll(".skill-bar span");

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

const currentYear = document.getElementById("current-year");


/* ==================== CURRENT YEAR ==================== */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* ==================== MOBILE MENU ==================== */

if (menuToggle && navWrapper) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navWrapper.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

}


/* ==================== CLOSE MOBILE MENU ==================== */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navWrapper.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* ==================== DARK / LIGHT MODE ==================== */

/*
    This variable intentionally stores the current theme
    only in JavaScript memory.

    No localStorage is used.
*/

let isLightMode = false;


function updateTheme() {

    body.classList.toggle(
        "light-mode",
        isLightMode
    );

    if (isLightMode) {

        themeIcon.textContent = "☾";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    } else {

        themeIcon.textContent = "☀";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    }

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        isLightMode = !isLightMode;

        updateTheme();

    });

}


/* ==================== ACTIVE NAVIGATION ==================== */

const sectionObserverOptions = {
    root: null,
    rootMargin: "-25% 0px -60% 0px",
    threshold: 0
};


const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            const currentSection = entry.target.id;

            navLinks.forEach((link) => {

                const linkTarget = link.getAttribute("href");

                link.classList.toggle(
                    "active",
                    linkTarget === `#${currentSection}`
                );

            });

        });

    },
    sectionObserverOptions
);


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* ==================== SCROLL REVEAL ==================== */

const revealObserverOptions = {
    root: null,
    rootMargin: "0px 0px -70px 0px",
    threshold: 0.12
};


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        });

    },
    revealObserverOptions
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* ==================== SKILL BAR ANIMATION ==================== */

const skillBarObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            const bar = entry.target;

            const targetWidth =
                bar.getAttribute("data-width");

            if (targetWidth) {
                bar.style.width = targetWidth;
            }

            observer.unobserve(bar);

        });

    },
    {
        threshold: 0.3
    }
);


skillBars.forEach((bar) => {

    skillBarObserver.observe(bar);

});


/* ==================== CONTACT FORM ==================== */

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const nameInput =
            document.getElementById("name");

        const name =
            nameInput.value.trim();

        if (name) {

            formMessage.textContent =
                `Thanks, ${name}! Your message has been prepared successfully.`;

        } else {

            formMessage.textContent =
                "Thanks! Your message has been prepared successfully.";

        }

        contactForm.reset();

    });

}


/* ==================== SMOOTH SCROLL FALLBACK ==================== */

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (!targetId.startsWith("#")) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* ==================== ESCAPE KEY ==================== */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
        return;
    }

    if (navWrapper.classList.contains("open")) {

        navWrapper.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* ==================== INITIAL THEME ==================== */

updateTheme();