document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("mode-toggle");
  const body = document.body;

  // Init mode
  const savedMode = localStorage.getItem("mode") || "dark";
  body.classList.toggle("dark-mode", savedMode === "dark");
  modeToggle.textContent = savedMode === "dark" ? "Light Mode" : "Dark Mode";

  // Toggle click
  modeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-mode");
    localStorage.setItem("mode", isDark ? "dark" : "light");
    modeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
  });
});
