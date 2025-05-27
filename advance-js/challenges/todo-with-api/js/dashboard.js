document.addEventListener('DOMContentLoaded', function () {
  // --- Check Authentication and Load User ---
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    window.location.href = '../index.html';
    return;
  }

  // Ensure currentUser.email exists and is unique for each user
  if (!currentUser.email) {
      console.error("Error: Current user object does not have an email property. Cannot segregate todos.");
      alert("User email not found. Please log in again.");
      window.location.href = '../index.html'; // Redirect if email is missing
      return;
  }

  // Set user profile information
  document.getElementById('username').textContent = currentUser.name;
  document.getElementById('userEmail').textContent = currentUser.email;
  document.getElementById('userAvatar').textContent = currentUser.name.charAt(0).toUpperCase();

  // --- DOM Elements ---
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const navItems = document.querySelectorAll('.nav-item');
  const contentSections = document.querySelectorAll('.content-section');
  const sectionTitle = document.getElementById('sectionTitle');
  const currentDateEl = document.getElementById('currentDate');
  const body = document.body;
  const logoutBtn = document.getElementById('logoutBtn');

  // Todo functionality
  const todoInput = document.getElementById('newTodo');
  const todoList = document.getElementById('todos');
  const addTodoButton = document.getElementById('addTodoBtn');
  const totalTasksSpan = document.getElementById('totalTasks');
  const completedTasksSpan = document.getElementById('completedTasks');
  const pendingTasksSpan = document.getElementById('pendingTasks');

  let userTodos = []; // Array to hold current user's todos

  // --- Functions ---

  // Set current date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentDateEl.textContent = new Date().toLocaleDateString('en-US', options);

  // Function to save todos to local storage
  function saveTodos() {
    // *** MODIFIED LINE ***
    // Use currentUser.email to create a unique key for each user's todos
    localStorage.setItem(`todos_user_${currentUser.email}`, JSON.stringify(userTodos));
    updateTodoStats();
  }

  // Function to load todos from local storage
  function loadTodos() {
    // *** MODIFIED LINE ***
    // Load todos using the currentUser.email as the key
    const storedTodos = localStorage.getItem(`todos_user_${currentUser.email}`);
    userTodos = storedTodos ? JSON.parse(storedTodos) : [];
    renderTodos();
  }

  // Function to render todos to the UI (no change needed here)
  function renderTodos() {
    todoList.innerHTML = '';
    userTodos.forEach(todo => {
      const li = document.createElement('li');
      li.setAttribute('data-id', todo.id);

      const todoTextSpan = document.createElement('span');
      todoTextSpan.classList.add('todo-text');
      todoTextSpan.textContent = todo.text;
      if (todo.completed) {
        todoTextSpan.classList.add('completed');
      }

      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('todo-actions');

      const completeBtn = document.createElement('button');
      completeBtn.classList.add('complete');
      completeBtn.innerHTML = todo.completed ? '<i class="fas fa-undo"></i>' : '<i class="fas fa-check"></i>';
      completeBtn.title = todo.completed ? 'Mark as Pending' : 'Mark as Complete';
      completeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTodoCompletion(todo.id);
      });

      const editBtn = document.createElement('button');
      editBtn.classList.add('edit');
      editBtn.innerHTML = '<i class="fas fa-edit"></i>';
      editBtn.title = 'Edit Task';
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        editTodo(todo.id);
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete');
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      deleteBtn.title = 'Delete Task';
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTodo(todo.id);
      });

      actionsDiv.appendChild(completeBtn);
      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(deleteBtn);

      li.appendChild(todoTextSpan);
      li.appendChild(actionsDiv);
      todoList.appendChild(li);
    });
    updateTodoStats();
  }

  // Function to add a new todo (no change needed here)
  function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText) {
      const newTodo = {
        id: Date.now(),
        text: todoText,
        completed: false
      };
      userTodos.push(newTodo);
      todoInput.value = '';
      saveTodos();
      renderTodos();
    } else {
      alert('Please enter a task.');
    }
  }

  // Function to toggle todo completion status (no change needed here)
  function toggleTodoCompletion(id) {
    userTodos = userTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
  }

  // Function to edit a todo (no change needed here)
  function editTodo(id) {
    const todoToEdit = userTodos.find(todo => todo.id === id);
    if (todoToEdit) {
      const newText = prompt('Edit your task:', todoToEdit.text);
      if (newText !== null && newText.trim() !== '') {
        todoToEdit.text = newText.trim();
        saveTodos();
        renderTodos();
      } else if (newText !== null) {
        alert('Task cannot be empty.');
      }
    }
  }

  // Function to delete a todo (no change needed here)
  function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this task?')) {
      userTodos = userTodos.filter(todo => todo.id !== id);
      saveTodos();
      renderTodos();
    }
  }

  // Function to update todo statistics (no change needed here)
  function updateTodoStats() {
    const total = userTodos.length;
    const completed = userTodos.filter(todo => todo.completed).length;
    const pending = total - completed;

    totalTasksSpan.textContent = total;
    completedTasksSpan.textContent = completed;
    pendingTasksSpan.textContent = pending;
  }

  // --- Event Listeners --- (no change needed here)

  // Mobile menu toggle
  hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    sidebar.classList.toggle('active');
    body.classList.toggle('sidebar-open');
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth < 992 &&
        !sidebar.contains(e.target) &&
        !hamburger.contains(e.target) &&
        sidebar.classList.contains('active')) {
      hamburger.classList.remove('active');
      sidebar.classList.remove('active');
      body.classList.remove('sidebar-open');
    }
  });

  // Nav section switching
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const section = item.dataset.section;

      contentSections.forEach(s => s.classList.remove('active'));
      document.getElementById(`${section}-section`).classList.add('active');

      sectionTitle.textContent = item.querySelector('span').textContent;

      if (window.innerWidth < 992) {
        hamburger.classList.remove('active');
        sidebar.classList.remove('active');
        body.classList.remove('sidebar-open');
      }
    });
  });

  // Add Todo Button click
  if (addTodoButton) {
    addTodoButton.addEventListener('click', addTodo);
  } else {
    console.error("Error: addTodoBtn element not found!");
  }

  // Add todo on Enter key
  if (todoInput) {
    todoInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTodoButton.click();
      }
    });
  } else {
    console.error("Error: newTodo input element not found!");
  }

  // Logout functionality
  logoutBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('currentUser'); // Clear current user session
      // Optional: Also clear all todos associated with the current user's email upon logout
      // localStorage.removeItem(`todos_user_${currentUser.email}`); 
      window.location.href = '../index.html'; // Redirect to login page
    }
  });

  // --- Initial Load ---
  loadTodos(); // Load todos when the dashboard page loads
});