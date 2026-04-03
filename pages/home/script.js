import Typewriter from './typewriter.js';

// Parse exact theme param to trigger body class early
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('theme') === 'dark') {
    document.body.classList.add('dark');
}

document.addEventListener('DOMContentLoaded', () => {
    // Typewriter
    const el = document.getElementById('interactive-description');
    if (el) {
        new Typewriter(el, {
            strings: [
                "Computational Humanities Student",
                "Systems & ML Developer",
                "Competitive Programmer",
                "Passionate Problem Solver",
                "Math & Game Theory Nerd",
                "Philosophy Debator",
                "good listener"
            ],
            typingSpeed: 50,
            eraseSpeed: 30,
            pauseDuration: 1500
        });
    }

    // Terminal CTAs Helper
    function typeCta(idSuffix, cmd, btnText, targetId, delay) {
        const ctaContainer = document.getElementById(`terminal-cta-${idSuffix}`);
        const cmdText = document.getElementById(`cmd-text-${idSuffix}`);
        
        if (!ctaContainer || !cmdText) return;
        
        setTimeout(() => {
            ctaContainer.style.opacity = 1;
            //cmdText.setAttribute('aria-live', 'polite');
            let i = 0;
            const typeCmd = setInterval(() => {
                if (i < cmd.length) {
                    cmdText.textContent += cmd.charAt(i);
                    i++;
                } else {
                    clearInterval(typeCmd);
                    setTimeout(() => {
                        ctaContainer.innerHTML = `<button id="cta-btn-${idSuffix}" class="cta-style">[ ${btnText} ]</button>`;
                        document.getElementById(`cta-btn-${idSuffix}`).addEventListener('click', () => {
                            const parentBtn = window.parent.document.querySelector(`label[for="${targetId}"]`);
                            if(parentBtn) {
                                parentBtn.click();
                            } else {
                                window.location.href = `../${idSuffix}/${idSuffix}.html`;
                            }
                        });
                    }, 500); // 500ms flash
                }
            }, 80); // typing speed
        }, delay);
    }

    typeCta('about', 'execute init_about.sh', 'ACCESS ABOUT MODULE', 'rad-about', 2200);
    typeCta('projects', 'execute init_projects.sh', 'ACCESS PROJECTS MODULE', 'rad-projects', 5200);
    typeCta('contact', 'execute init_contact.sh', 'ACCESS CONTACT MODULE', 'rad-contact', 8200);
});
