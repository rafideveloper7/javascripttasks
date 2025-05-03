// Register/Login Handling
if (document.getElementById("registerForm")) { // Check if the registration form exists on the page
    document.getElementById("registerForm").addEventListener("submit", registerUser); // If it exists, attach the registerUser function to the form's submit event
} else if (document.getElementById("loginForm")) { // Otherwise, check if the login form exists
    document.getElementById("loginForm").addEventListener("submit", loginUser); // If it exists, attach the loginUser function to the form's submit event
} else if (document.getElementById("userName")) { // Otherwise, check if we are on a page that displays the user's name (likely the home page)
    displayUserName(); // Call the function to display the user's name
    loadTodos(); // Call the function to load and display the to-do list
    const addTaskBtn = document.getElementById("addTaskButton"); // Get the "Add Task" button element
    if (addTaskBtn) { // Check if the button exists
        addTaskBtn.addEventListener("click", addTodo); // If it exists, attach the addTodo function to the button's click event
    }
}

// Register Function
function registerUser(e) { // Define a function called registerUser, which takes an event object (e) as an argument
    e.preventDefault(); // Prevent the default form submission behavior (reloading the page)
    const fullName = document.getElementById("fullName").value.trim(); // Get the value from the "Full Name" input, remove extra spaces
    const email = document.getElementById("email").value.trim().toLowerCase(); // Get the value from the "Email" input, remove spaces, convert to lowercase
    const password = document.getElementById("password").value.trim(); // Get the value from the "Password" input, remove spaces

    let users = JSON.parse(localStorage.getItem("users")) || []; // Get the stored user data from local storage, or initialize an empty array
    const userExists = users.some(user => user.email === email); // Check if a user with this email already exists
    if (userExists) { // If the user exists:
        alert("User already exists! Please login."); // Show an alert message
        return; // Stop the registration process
    }

    const newUser = { fullName, email, password, todos: [] }; // Create a new user object with the entered data and an empty to-do list
    users.push(newUser); // Add the new user object to the users array
    localStorage.setItem("users", JSON.stringify(users)); // Save the updated users array back to local storage
    localStorage.setItem("currentUser", JSON.stringify(newUser)); // Save the new user's data as the currently logged-in user
    window.location.href = "home-page/index.html"; // Redirect the user to the home page
}

// Login Function
function loginUser(e) { // Define the loginUser function, taking an event object (e) as an argument
    e.preventDefault(); // Prevent the default form submission behavior
    const email = document.getElementById("loginEmail").value.trim().toLowerCase(); // Get the entered email, remove spaces, convert to lowercase
    const password = document.getElementById("loginPassword").value.trim(); // Get the entered password

    const users = JSON.parse(localStorage.getItem("users")) || []; // Get the stored user data from local storage, or default to an empty array
    const user = users.find(user => user.email === email && user.password === password); // Find a user with the matching email and password

    if (!user) { // If no matching user is found:
        alert("Incorrect email or password."); // Show an error message
        return; // Stop the login process
    }

    localStorage.setItem("currentUser", JSON.stringify(user)); // Save the found user's data as the currently logged-in user
    window.location.href = "../home-page/index.html"; // Redirect the user to the home page
}

// Display Name
function displayUserName() { // Define the displayUserName function
    const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Get the current user's data from local storage
    if (!currentUser) { // If there's no current user (not logged in):
        window.location.href = "../login-page/index.html"; // Redirect to the login page
        return; // Stop the function
    }

    document.getElementById("userName").textContent = currentUser.fullName; // Find the element with ID "userName" and set its text to the user's full name
    const heroName = document.getElementById("heroUserName");  //get the element
    if (heroName) heroName.textContent = currentUser.fullName; //set the text
}

// ================= TO-DO ==================

// to- do empty dailogue show add tasks
if (document.getElementById("emptyDialog") === null) { // Check if the element with ID "emptyDialog" exists
    const emptyDialog = document.createElement("div"); // Create a new div element
    emptyDialog.id = "emptyDialog"; // Set the ID of the new div
    emptyDialog.className = "alert alert-info text-center mt-3"; // Set CSS classes for styling
    emptyDialog.innerHTML = `
        <strong>No tasks found!</strong> Please add a task.
    `; // Set the HTML content of the div
    document.getElementById("todoList").appendChild(emptyDialog); // Add the new div as a child of the element with ID "todoList"
}

// Add To-Do
function addTodo() { // Define the addTodo function
    const input = document.getElementById("todoInput"); // Get the input element for the new task
    const task = input.value.trim(); // Get the task text, remove extra spaces
    if (!task) return; // If the task is empty, stop here

    let currentUser = JSON.parse(localStorage.getItem("currentUser")); // Get the current user's data
    let users = JSON.parse(localStorage.getItem("users"));

    currentUser.todos.push(task); // Add the new task to the user's to-do list

    // Update user in users array
    users = users.map(user =>  // map through the 'users' array
        user.email === currentUser.email ? currentUser : user //if the user email is same as current user, update the user object, else keep the same user object
    );

    localStorage.setItem("users", JSON.stringify(users)); // Save the updated users array
    localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Save the updated current user data

    input.value = ""; // Clear the input field
    loadTodos(); // Reload the to-do list display
}

// Load To-Do List
function loadTodos() { // Define the loadTodos function
    const list = document.getElementById("todoList"); // Get the to-do list element
    if (!list) return; // If the list element doesn't exist, stop

    const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Get the current user's data
    list.innerHTML = ""; // Clear the existing list content

    currentUser.todos.forEach((task, index) => { // Loop through each task in the user's to-do list
        const li = document.createElement("li"); // Create a new list item element
        li.className = "list-group-item d-flex justify-content-between align-items-center"; // Set CSS classes for styling
        li.innerHTML = `
            ${task}
            <button class="btn btn-danger btn-sm" onclick="deleteTodo(${index})">Delete</button>
        `; // Set the HTML content of the list item, including the task text and a Delete button
        list.appendChild(li); // Add the list item to the to-do list element
    });
}

// Delete To-Do
function deleteTodo(index) { // Define the deleteTodo function, which takes the index of the task to delete
    let currentUser = JSON.parse(localStorage.getItem("currentUser")); // Get the current user's data
     let users = JSON.parse(localStorage.getItem("users"));

    currentUser.todos.splice(index, 1); // Remove the task at the specified index from the to-do list

     users = users.map(user =>  // map through the 'users' array
        user.email === currentUser.email ? currentUser : user //if the user email is same as current user, update the user object, else keep the same user object
    );

    localStorage.setItem("users", JSON.stringify(users)); // Save the updated users array
    localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Save the updated current user data

    loadTodos(); // Reload the to-do list display
}
