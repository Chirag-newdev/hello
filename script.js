let savedTheme = localStorage.getItem('globalTheme');
let theme = savedTheme === '1' ? 1 : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 1 : 0);
const A = ["light", "dark"];
const root = document.documentElement;

const initialIframes = document.querySelectorAll('.monitor-screen iframe');
initialIframes.forEach(iframe => {
    if (iframe.src) {
        const myUrl = new URL(iframe.src);
        myUrl.searchParams.set('theme', A.at(theme));
        iframe.src = myUrl.toString();
    }
});

function updateScale() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    root.style.setProperty('--scale-w', Math.max(w / 1295, 0.6));
    root.style.setProperty('--scale-h', Math.max(h / 833, 0.6));
    root.style.setProperty('--scale', (w / 1295 + h / 833) / 2);
}

updateScale();
window.addEventListener('resize', updateScale);

function toggleMode() {
    theme = 1 - theme;
    localStorage.setItem('globalTheme', theme.toString());
    const iframes = document.querySelectorAll('.monitor-screen iframe');
    iframes.forEach(iframe => {
        if (iframe.src) {
            const myUrl = new URL(iframe.src);
            myUrl.searchParams.set('theme', A.at(theme));
            iframe.src = myUrl.toString();
        }
    });
}

function hardReload() {
    sessionStorage.clear();
    window.location.reload()
}

document.querySelectorAll('.nav-group').forEach(label => {
    label.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        const radioId = label.getAttribute('for');
        const radio = document.getElementById(radioId);
        
        if (radio.checked) {
            const activeFrame = document.querySelector(`.monitor-screen .page-${radioId.split('-')[1]}`);
            if (activeFrame) activeFrame.src = activeFrame.src;
            return;
        }
        
        const screen = document.querySelector('.monitor-screen');
        
        screen.style.transition = "transform 0.25s ease-in";
        screen.style.transform = "rotateX(90deg)";
        
        setTimeout(() => {
            radio.checked = true;
            
            screen.style.transition = "none";
            screen.style.transform = "rotateX(-90deg)";
            void screen.offsetWidth;
            
            screen.style.transition = "transform 0.25s ease-out";
            screen.style.transform = "rotateX(0deg)";
        }, 250);
    });
});

function updateClock() {
    const now = new Date();
    const dateOptions = { month: 'short', day: '2-digit' };
    const dateString = now.toLocaleDateString('en-US', dateOptions).toUpperCase();

    const timeString = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    document.getElementById('date-time').textContent = dateString + ' : ' + timeString;
}

setInterval(updateClock, 1000);
updateClock();
