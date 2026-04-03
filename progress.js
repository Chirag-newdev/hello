export function initProgressTracking(pageKey) {
    if (!pageKey) {
        console.error("progressTracking requires a unique pageKey.");
        return;
    }

    const progressBar = document.getElementById("progress-bar-fill");
    const popup = document.getElementById("resume-panel-popup");
    const btnYes = document.getElementById("resume-btn-yes");
    const btnNo = document.getElementById("resume-btn-no");

    if (!progressBar || !popup) {
        console.error("Progress tracking DOM elements not found. Please add them to your HTML.");
        return;
    }

    // --- Debounced Scroll Logic ---
    let debounceTimer;
    window.addEventListener("scroll", () => {
        // Update progress bar
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight;
        const winHeight = window.innerHeight;
        const maxScroll = docHeight - winHeight;
        
        let scrollPercent = 0;
        if (maxScroll > 0) {
            scrollPercent = scrollTop / maxScroll;
        }
        
        progressBar.style.width = `${Math.min(Math.max(scrollPercent * 100, 0), 100)}%`;

        // Debounced save
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            sessionStorage.setItem(`lastScrollY-${pageKey}`, scrollTop);
        }, 200);   
    });

    // --- Resume Popup ---
    const savedY = sessionStorage.getItem(`lastScrollY-${pageKey}`);
    if (savedY && parseFloat(savedY) > 300) {
        // Make it visible!
        popup.classList.remove('hidden');

        const closePopup = () => {
            popup.classList.add('hidden');
        };

        if (btnYes) {
            btnYes.addEventListener("click", () => {
                window.scrollTo({ top: parseFloat(savedY), behavior: 'smooth' });
                closePopup();
            });
        }

        if (btnNo) {
            btnNo.addEventListener("click", () => {
                closePopup();
            });
        }
    }
}
