const naam = document.getElementById('username');
const save = document.getElementById('saveBtn');
const output = document.getElementById('result');

// save user name in local storage and display it on screen

window.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('username');
    if (savedName) {
        output.textContent = `User name is ${savedName}`;
    }
});

save.addEventListener('click', () => {
    const name = naam.value.toUpperCase();
    if (name) {
        localStorage.setItem('username', name);
        output.textContent = `User name is ${name}`;
    }
});

// clear local storage and display message
const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    output.textContent = 'User name cleared';
    naam.value = '';
});