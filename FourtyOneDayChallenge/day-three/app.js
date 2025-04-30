let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
          ${task}
          <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();

  if (taskText !== '') {
    tasks.push(taskText);
    saveTasks();
    showTasks();
    input.value = '';
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  showTasks();
}

// Show tasks when page loads
showTasks();