import { initProgressTracking } from '../../progress.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const currentTheme = urlParams.get('theme');

if (currentTheme) {
    document.body.classList.add(currentTheme);
}

document.addEventListener('DOMContentLoaded', () => {
    const bind = (linkId, radId) => {
        const lnk = document.getElementById(linkId);
        if (lnk) {
            lnk.addEventListener('click', (e) => {
                e.preventDefault();
                const parentBtn = window.parent.document.querySelector(`label[for="${radId}"]`);
                if (parentBtn) {
                    parentBtn.click();
                } else {
                    window.location.href = lnk.href;
                }
            });
        }
    };

    bind("link-contact", "rad-contact");

    // D3 - Intersection Observer for Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
});

initProgressTracking('projects');
