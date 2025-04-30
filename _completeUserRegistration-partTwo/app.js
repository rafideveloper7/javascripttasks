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

    const newUser = { fullName: fullName, email: email, password: password };
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

// Todo List Functionality

document.addEventListener("DOMContentLoaded", function () {
    const addTaskButton = document.getElementById("addTaskButton");
    const taskInput = document.getElementById("todoInput");
    const taskList = document.getElementById("todoList");

    // Get the logged-in user
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // If no user is logged in, send to login page
    if (!currentUser) {
        window.location.href = "../login-page/index.html";
        return;
    }

    // Create a unique key using user's email
    const storageKey = "tasks_" + currentUser.email;

    // Get existing tasks from localStorage (or empty array if none)
    let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Show tasks on page
    function showTasks() {
        taskList.innerHTML = ""; // Clear list first

        tasks.forEach(function (task, index) {
            const li = document.createElement("li");
            li.textContent = task;
            li.className = "list-group-item d-flex justify-content-between";

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "btn btn-sm btn-danger";

            // Remove task when delete button clicked
            deleteBtn.addEventListener("click", function () {
                tasks.splice(index, 1); // remove from array
                localStorage.setItem(storageKey, JSON.stringify(tasks)); // save updated tasks
                showTasks(); // refresh list
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    // Add task function
    function addTask() {
        const newTask = taskInput.value.trim();

        if (newTask === "") {
            alert("Please enter a task.");
            return;
        }

        tasks.push(newTask); // add to array
        localStorage.setItem(storageKey, JSON.stringify(tasks)); // save to localStorage
        taskInput.value = ""; // clear input
        showTasks(); // show updated list
    }

    // Add click and Enter key events
    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Show saved tasks when page loads
    showTasks();
});

