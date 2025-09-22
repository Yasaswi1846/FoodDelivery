// Connect login and signup forms to backend
function handleAuthForm(formId, endpoint) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const username = form.username.value;
        const password = form.password.value;
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            alert(data.message);
            window.location.href = 'index.html';
        } else {
            alert(data.error);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    handleAuthForm('login-form', 'http://localhost:5000/api/login');
    handleAuthForm('signup-form', 'http://localhost:5000/api/signup');
});