const todoForm = document.getElementById("todo-form");
const usernameDisplay = document.getElementById("username");
const logoutBtn = document.getElementById("logout-btn");
const taskList = document.getElementById("task-list"); //ul
const addTaskBtn = document.getElementById("add-task");
const inputText = document.getElementById("input-text");// input box for task

const userInfoAlert = document.getElementById("alert-to-userInfo"); // alert for user info

// Load current user from localStorage
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
usernameDisplay.innerText = currentUser.fullName || "Guest";
const usermail = currentUser.email;

// Load user todos from localStorage OR add new empty array
let userToDos = JSON.parse(localStorage.getItem("userTodos")) || [];

// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem("userTodos", JSON.stringify(userToDos));
}

// Function to style a list item
function styleListItem(listItem) {
    listItem.style.cssText = `
        width: 100%;
        color: darkblue;
        font-size: 24px;
        background-color: lightblue;
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 8px;
        list-style: none;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
}

// Check if the user is logged in
if (!currentUser.email) {
    window.location.href = "../index.html"; // Redirect to login page if not logged in
}

// Load existing todos into the list
userToDos.forEach((todo) => {
    const listItem = document.createElement('li');
    listItem.textContent = todo;
    styleListItem(listItem); // Apply styling to loaded items

    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '5px';

    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.style.cssText = `
        color: white;
        border: none;
        font-size: 16px;
        background-color: green;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
    `;
    editBtn.addEventListener('click', () => {
        const taskTextNode = listItem.firstChild;
        const currentTaskText = taskTextNode.nodeValue;
        const newTaskText = prompt("Edit your task:", currentTaskText);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            taskTextNode.nodeValue = newTaskText.trim();
            updateTodosInLocalStorage();
        }
    });
    buttonContainer.appendChild(editBtn);

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.cssText = `
        color: white;
        border: none;
        font-size: 16px;
        background-color: red;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
    `;
    deleteBtn.addEventListener('click', () => {
        listItem.remove();
        updateTodosInLocalStorage();
    });
    buttonContainer.appendChild(deleteBtn);

    listItem.appendChild(buttonContainer);
    taskList.appendChild(listItem);
});

// show user info name and email
userInfoAlert.addEventListener('click', () => {
    alert("User Profile :: \n " + "Name : " + usernameDisplay.innerText + "\n Email : " + usermail);
});

// Logout button functionality
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html"; // or adjust path as needed
});

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskText = inputText.value.trim();

    if (taskText === "") {
        alert("Please add a task before submitting...");
        return;
    }
    if (taskText.length > 15) {
        alert("Minimum 15 characters required - " + " you entered : " + taskText.length);
    } else {
        addTaskToList(taskText); // call func to add tasktext in li
        inputText.value = ""; // field ko clear kare after adding
    }
});

// here Add task and updates like (delete, edit, completed etc)
function addTaskToList(task) {
    console.log("Adding task:", task);
    const listItem = document.createElement('li');
    styleListItem(listItem); // Apply styling to new items

    // Task text add karo
    const taskTextNode = document.createTextNode(task);
    listItem.appendChild(taskTextNode);

    // div for buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '5px';

    // add edit btn
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.style.cssText = `
        color: white;
        border: none;
        font-size: 16px;
        background-color: green;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
    `;
    editBtn.addEventListener('click', () => {
        const currentTaskText = taskTextNode.nodeValue;
        const newTaskText = prompt("Edit your task:", currentTaskText);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            taskTextNode.nodeValue = newTaskText.trim();
            updateTodosInLocalStorage();
        }
    });
    buttonContainer.appendChild(editBtn);

    // add delete btn
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.cssText = `
        color: white;
        border: none;
        font-size: 16px;
        background-color: red;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
    `;
    deleteBtn.addEventListener('click', () => {
        listItem.remove();
        updateTodosInLocalStorage();
    });
    buttonContainer.appendChild(deleteBtn);

    listItem.appendChild(buttonContainer);
    taskList.appendChild(listItem);

    // Add the new task to the userToDos array
    userToDos.push(task);

    // Save the updated todos to localStorage
    saveTodos();
}

function updateTodosInLocalStorage() {
    const currentTodos = Array.from(taskList.children).map(li => li.firstChild.nodeValue.trim());
    userToDos = currentTodos;
    saveTodos();
}