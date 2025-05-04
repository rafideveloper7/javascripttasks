const todoForm = document.getElementById("todo-task");
const username = document.getElementById("username");
const logoutBtn = document.getElementById("logout-btn");
const taskList = document.getElementById("task-list");

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

username.innerText = currentUser.fullName || "Guest";

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html";
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskInput = event.target.task;
  const task = taskInput.value.trim();

  if (task === "") return;

  const todo = {
    task: task,
    createdBy: currentUser,
    isTaskCompleted: false,
  };

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  taskInput.value = "";
  renderTasks();
});


// create html element for task list
function renderTasks() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const userTodos = todos.filter(
    (todo) => todo.createdBy?.email === currentUser.email
  );

  taskList.innerHTML = "";

  if (userTodos.length === 0) {
    taskList.innerHTML = `<li class="list-group-item text-center text-muted">No tasks yet</li>`;
    return;
  }

  userTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center fw-bold";
    li.innerHTML = `
      <span>${index + 1} ) ${todo.task} </span>
    `;
    taskList.appendChild(li);
  });
}

// Initial render
renderTasks();
