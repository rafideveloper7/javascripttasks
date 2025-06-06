const userName = document.getElementById('username');
const saveButton = document.getElementById('saveBtn');
const result = document.getElementById('result');
const savedName = document.getElementById('savedData');

window.addEventListener('DOMContentLoaded', () => {
    const savedName = sessionStorage.getItem('username');
    if (savedName) {
        result.textContent = `User name is ${savedName}`;
    }
})

saveButton.addEventListener('click', () => { 
    const name = userName.value.toUpperCase();
    if (name) {
        sessionStorage.setItem('username', name);
        result.textContent = `User name is ${name}`;
    }
});
