const password = document.getElementById("password");
const bar = document.getElementById("bar");
const feedback = document.getElementById("feedback");

password.addEventListener("input", () => {
    const val = password.value;
    let strength = 0;

    if (val.length >= 6) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    switch (strength) {
        case 0:
            bar.style.width = "0%";
            feedback.textContent = "Start typing...";
            break;
        case 1:
            bar.style.width = "25%";
            bar.style.background = "red";
            feedback.textContent = "Very Weak 💩";
            break;
        case 2:
            bar.style.width = "50%";
            bar.style.background = "orange";
            feedback.textContent = "Weak 👎";
            break;
        case 3:
            bar.style.width = "75%";
            bar.style.background = "gold";
            feedback.textContent = "Good 👍";
            break;
        case 4:
            bar.style.width = "100%";
            bar.style.background = "green";
            feedback.textContent = "Very Strong 💪";
            break;
    }
});