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

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const addTaskButton = document.getElementById("addTaskButton");
    const taskInput = document.getElementById("todoInput");
    const taskList = document.getElementById("todoList");

    function addTodo() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const taskItem = document.createElement("li");
        taskItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        taskItem.textContent = taskText;

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-sm", "btn-danger");

        // Delete task on button click
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(taskItem);
        });

        // Add delete button to list item
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        // Clear the input
        taskInput.value = "";
    }

    // Add event listeners
    addTaskButton.addEventListener("click", addTodo);
    taskInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTodo();
        }
    });
});




