document.addEventListener('DOMContentLoaded', () => {
    // --- Login Form Handling ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();

            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Store only essential user info in currentUser for session
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email
                }));
                window.location.href = 'pages/home.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    }

    // --- Register Form Handling ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('registerName').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value.trim();

            if (!name || !email || !password) {
                alert('Please fill in all fields.');
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if user already exists
            if (users.some(u => u.email === email)) {
                alert('An account with this email already exists.');
                return;
            }

            // Generate a simple unique ID (for demonstration purposes)
            const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

            const newUser = {
                id: newId,
                name: name,
                email: email,
                password: password // In a real app, hash this password!
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Also, initialize an empty todo list for the new user
            localStorage.setItem(`todos_user_${newId}`, JSON.stringify([]));

            alert('Registration successful! You can now log in.');
            window.location.href = 'index.html'; // Redirect to login page
        });
    }
});