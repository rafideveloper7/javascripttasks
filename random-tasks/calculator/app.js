// app.js

const form = document.getElementById("form");
const input = document.getElementById("input-data");
const buttons = document.querySelectorAll(".btns button");

let currentValue = "";

// Prevent form from refreshing page
form.addEventListener("submit", (e) => e.preventDefault());

// Loop through each button and add click event
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (value === "+") {
      alert("+ clicked");
      let total = value + value;
      input.value.textContentt = total;
    } else if (value === "−") {
      alert("- clicked");
    } else if (value === "×") {
      alert("x clicked");
    } else if (value === "/") {
      alert("/ clicked");
    } else if (value === "%") {
      alert("% clicked");
    } else if (value === "=") {
      alert("= clicked");
    } else if (value === "AC") {
      alert("ac clicked");
    } else if (value === "DEL") {
      alert("DELL clicked");
    } else if (value === ".") {
      alert(". clicked");
    }
  });
});
