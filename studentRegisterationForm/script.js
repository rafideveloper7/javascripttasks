// 1. Get the form and table body from the HTML
let form = document.getElementById("studentForm");
let tableBody = document.querySelector("#student-table tbody");

// 2. Run this function when user submits the form
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop the page from reloading

    // 3. Get the values from all input fields
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("adress").value;
    let _password = document.getElementById("password").value;
    let studentId = document.getElementById("student-id").value;
    let course = document.getElementById("course").value;

    // 4. Check the strength of the password
    let password = document.getElementById("password").value;
    let passwordStrength = document.getElementById("password-strength"); // (optional use)
    let strength = 0;

    // Check if password meets different conditions
    if (password.length >= 8) strength++;          // at least 8 characters
    if (/[A-Z]/.test(password)) strength++;        // contains capital letters
    if (/[a-z]/.test(password)) strength++;        // contains small letters
    if (/[0-9]/.test(password)) strength++;        // contains numbers

    // If password is not strong enough, show a message and stop
    if (strength < 3) {
        alert("Password must contain at least 3 of the following: uppercase letters, lowercase letters, numbers.");
        return;
    }

    // 5. Create a new row and add student info into it
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${age}</td>
        <td>${password}</td>
        <td>${studentId}</td>
        <td>${course}</td>
        <td>${address}</td>
    `;

    // 6. Add the new row into the table
    tableBody.appendChild(newRow);

    // 7. Clear the form fields after adding the data
    form.reset();
});
