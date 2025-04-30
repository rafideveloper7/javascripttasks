// Register/Login Handling
if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", registerUser);
} else if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", loginUser);
} else if (document.getElementById("userName")) {
    displayUserName();
    loadTodos();
    const addTaskBtn = document.getElementById("addTaskButton");
    if (addTaskBtn) {
        addTaskBtn.addEventListener("click", addTodo);
    }
}

// Register Function
function registerUser(e) {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert("User already exists! Please login.");
        return;
    }

    const newUser = { fullName, email, password, todos: [] };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    window.location.href = "home-page/index.html";
}

// Login Function
function loginUser(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert("Incorrect email or password.");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "../home-page/index.html";
}

// Display Name
function displayUserName() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        window.location.href = "../login-page/index.html";
        return;
    }

    document.getElementById("userName").textContent = currentUser.fullName;
    const heroName = document.getElementById("heroUserName");
    if (heroName) heroName.textContent = currentUser.fullName;
}

// Logout
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../login-page/index.html";
}

// ================= TO-DO ==================

// to- do empty dailogue show add tasks
if (document.getElementById("emptyDialog") === null) {
    const emptyDialog = document.createElement("div");
    emptyDialog.id = "emptyDialog";
    emptyDialog.className = "alert alert-info text-center mt-3";
    emptyDialog.innerHTML = `
        <strong>No tasks found!</strong> Please add a task.
    `;
    document.getElementById("todoList").appendChild(emptyDialog);
}

// Add To-Do
function addTodo() {
    const input = document.getElementById("todoInput");
    const task = input.value.trim();
    if (!task) return;

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("users"));

    currentUser.todos.push(task);

    // Update user in users array
    users = users.map(user =>
        user.email === currentUser.email ? currentUser : user
    );

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    input.value = "";
    loadTodos();
}

// Load To-Do List
function loadTodos() {
    const list = document.getElementById("todoList");
    if (!list) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    list.innerHTML = "";

    currentUser.todos.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${task}
            <button class="btn btn-danger btn-sm" onclick="deleteTodo(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}

// Delete To-Do
function deleteTodo(index) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("users"));

    currentUser.todos.splice(index, 1);

    users = users.map(user =>
        user.email === currentUser.email ? currentUser : user
    );

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    loadTodos();
}
