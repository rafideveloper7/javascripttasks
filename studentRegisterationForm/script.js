// 1. Get the form and table body
let form = document.getElementById("studentForm");
let tableBody = document.querySelector("#student-table tbody");

// 2. When user submits the form
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Page reload hone se roke

    // 3. Get values from the form fields
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("adress").value;
    let _password = document.getElementById("password").value;
    let studentId = document.getElementById("student-id").value;
    let course = document.getElementById("course").value;

    // 4. Validate the passwaord strength letters 
    let password = document.getElementById("password").value;
    let passwordStrength = document.getElementById("password-strength");
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;



    if (strength < 3) {
        alert("Password must contain at least 3 of the following: uppercase letters, lowercase letters, numbers.");
        return;
    }

    // Create a new row
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

    // 6. Add this row to the table
    tableBody.appendChild(newRow);

    // 7. Clear the form after adding data
    form.reset();
});

