const messages = [
    "Every bug you fix makes you a better coder! 🐞✅",
    "Your code is poetry in motion. 🧠💻",
    "Keep calm and debug on! 🛠️",
    "You are one commit away from greatness! 🚀",
    "Today’s error is tomorrow’s experience. 🔥",
    "Great things take time — just like great apps. ⏳",
    "One small fix for a bug, one giant leap for your code! 🌌",
    "Dream it, code it, ship it! 🚢",
    "StackOverflow was made for legends like you! 🙌",
    "Keep pushing code. Your future self will thank you. ✨"
];

const vibeBtn = document.getElementById('vibeBtn');
const message = document.getElementById('message');

vibeBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    message.textContent = messages[randomIndex];
    message.style.animation = 'fadeIn 1s forwards'; // Reset animation on click
});
