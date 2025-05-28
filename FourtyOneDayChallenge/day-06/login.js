// login.js
// Declared globally so app.js can also access it.
let users = JSON.parse(localStorage.getItem('users')) || {};

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value.trim();

            if (!username || !password) {
                alert('Please enter both username and password.');
                return;
            }

            if (users[username] && users[username].password === password) {
                localStorage.setItem('currentUser', username);
                loginForm.reset();
                window.location.href = 'index.html'; // Redirect to the main quiz page
            } else {
                alert('Invalid username or password. Please register if you have not.');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            const username = document.getElementById('register-username').value.trim();
            const password = document.getElementById('register-password').value.trim();

            if (!username || !password) {
                alert('Please enter both username and password.');
                return;
            }

            if (users[username]) {
                alert('Username already exists. Please choose a different username.');
                return;
            }

            // Register new user with an empty quizScores array
            users[username] = { password: password, quizScores: [] };
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', username); // Log in the new user immediately
            registerForm.reset();
            alert('Registration successful! You are now logged in.');
            window.location.href = 'index.html'; // Redirect to the main quiz page
        });
    }
});