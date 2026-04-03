export default class Typewriter {
    constructor(el, { strings, typingSpeed = 100, eraseSpeed = 50, pauseDuration = 1500 }) {
        this.el = el;
        this.strings = strings;
        this.typingSpeed = typingSpeed;
        this.eraseSpeed = eraseSpeed;
        this.pauseDuration = pauseDuration;

        this.stringIdx = 0;
        this.charIdx = 0;
        this.state = 'TYPING';

        this.el.textContent = '';
        
        this.tick();
    }

    tick() {
        if (!this.strings.length) return;

        const currentString = this.strings[this.stringIdx];

        switch (this.state) {
            case 'TYPING':
                this.charIdx++;
                this.el.textContent = currentString.substring(0, this.charIdx);
                
                if (this.charIdx === currentString.length) {
                    this.state = 'PAUSING';
                    setTimeout(() => this.tick(), this.pauseDuration);
                } else {
                    setTimeout(() => this.tick(), this.typingSpeed);
                }
                break;

            case 'PAUSING':
                this.state = 'ERASING';
                this.tick();
                break;

            case 'ERASING':
                this.charIdx--;
                this.el.textContent = currentString.substring(0, this.charIdx);

                if (this.charIdx === 0) {
                    this.state = 'TYPING';
                    this.stringIdx = (this.stringIdx + 1) % this.strings.length;
                    setTimeout(() => this.tick(), this.typingSpeed); // slight pause before next word
                } else {
                    setTimeout(() => this.tick(), this.eraseSpeed);
                }
                break;
        }
    }
}
