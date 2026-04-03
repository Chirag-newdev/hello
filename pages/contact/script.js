const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const currentTheme = urlParams.get('theme');

if (currentTheme) {
    document.body.classList.add(currentTheme);
}

document.addEventListener('DOMContentLoaded', () => {
    const parentDoc = window.parent.document;
    const page="CONTACT";
    const targetBtn = parentDoc.getElementById(page);
    if (targetBtn){
        parentDoc.querySelectorAll('.nav-group').forEach(group => {
            group.classList.remove('active');
        });
        targetBtn.classList.add('active');
    }
});
    
const cf = document.getElementById("Contact-form");
cf.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    const fields = [name, email, subject, message];
    fields.forEach(field => field.style.borderColor = '');

    let isValid = true;

    if (name.value.trim().length < 3) {
        name.style.borderColor = 'red';
        isValid = false;
    }

    if (!email.validity.valid) {
        email.style.borderColor = 'red';
        isValid = false;
    }

    if (!subject.value.trim()) {
        subject.style.borderColor = 'red';
        isValid = false;
    }

    if (!message.value.trim()) {
        message.style.borderColor = 'red';
        isValid = false;
    }

    if (isValid) {
        fields.forEach(field => field.style.borderColor = 'green');
        console.log("Form is valid! Displaying confirmation state.");      
        setTimeout(() => {
            cf.style.display = 'none';
            const confirmBox = document.getElementById("confirmation-state");
            if (confirmBox) confirmBox.style.display = 'block';
        }, 500);
    }
    
});
