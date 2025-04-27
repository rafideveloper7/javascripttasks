if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", registerUser);
} else if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", loginUser);
} else if (document.getElementById("userName")) {
    displayUserName();
}

function registerUser(e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert("User already exists! Please try to login.");
        return;
    }

    const newUser = { fullName, email, password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("currentUser", JSON.stringify(newUser));

    window.location.href = "home-page/index.html";
}

function loginUser(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    console.log("Users in localStorage:", users);

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert("User does not exist or incorrect password! Please try to register.");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    window.location.href = "../home-page/index.html";
}

function displayUserName() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "../login-page/index.html";
        return;
    }

    document.getElementById("userName").textContent = currentUser.fullName;
    document.getElementById("heroUserName").textContent = currentUser.fullName;
}

function logout() {
    localStorage.removeItem("currentUser");

    window.location.href = "../login-page/index.html";
}