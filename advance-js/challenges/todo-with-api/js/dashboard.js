document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const mobileHeader = document.querySelector('.mobile-header');

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !hamburger.contains(e.target) &&
            !mobileHeader.contains(e.target)) {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    });

    // Check authentication
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = '../index.html';
        return;
    }

    // Set user data
    document.getElementById('userAvatar').textContent = 
        user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    document.getElementById('username').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;

    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', options);

    // Logout functionality
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = '../index.html';
    });

    // Load todos
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/todos`)
        .then(response => response.json())
        .then(todos => {
            const todoList = document.getElementById('todos');
            const totalTasks = todos.length;
            const completedTasks = todos.filter(todo => todo.completed).length;
            
            // Update stats
            document.getElementById('totalTasks').textContent = totalTasks;
            document.getElementById('completedTasks').textContent = completedTasks;
            document.getElementById('pendingTasks').textContent = totalTasks - completedTasks;
            
            // Render todos
            todoList.innerHTML = todos.map(todo => `
                <li class="todo-item ${todo.completed ? 'completed' : ''}">
                    <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                    <span class="todo-text">${todo.title}</span>
                    <div class="todo-actions">
                        <button><i class="fas fa-edit"></i></button>
                        <button><i class="fas fa-trash-alt"></i></button>
                    </div>
                </li>
            `).join('');
            
            // Add checkbox event listeners
            document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const item = this.closest('.todo-item');
                    item.classList.toggle('completed');
                    
                    // Update stats
                    const completed = document.querySelectorAll('.todo-item.completed').length;
                    document.getElementById('completedTasks').textContent = completed;
                    document.getElementById('pendingTasks').textContent = totalTasks - completed;
                });
            });
        });
});