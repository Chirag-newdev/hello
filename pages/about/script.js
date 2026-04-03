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
    bind('link-projects', 'rad-projects');
    bind('link-contact', 'rad-contact');
});

initProgressTracking('about');