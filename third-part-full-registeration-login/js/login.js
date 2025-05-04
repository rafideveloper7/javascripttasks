const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find((item) =>
    item.email === email && item.password === password
  );

  if (foundUser) {
    const currentUser = {
      fullName: foundUser.fullName,
      email: foundUser.email,
    };

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    alert("User logged in successfully!");

    event.target.reset();
    
    window.location.href = "./pages/home.html";

  } else {
    alert("Invalid credentials!");
  }
});
