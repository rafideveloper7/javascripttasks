document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmail = document.getElementById('email').value.trim();

    if (!userEmail) {
        alert('Please enter your email');
        return;
    }

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.email === userEmail);
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'pages/home.html';
            } else {
                alert('User not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            alert('Login failed. Please try again later.');
        });
});