// === Timer Variables ===
let timer;
let isRunning = false;
let timeLeft = 1 * 60; // Default: 1 min for testing 

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

// === Update the Timer on Screen ===
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// === Timer Functions ===
function startTimer() {
    if (!isRunning && timeLeft > 0) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                alert("Time's up!");
            }
        }, 1000);
        isRunning = true;
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 1 * 60; // Reset to default (6 seconds for demo)
    updateTimerDisplay();
}

// === More Buttons for Custom Times ===
function setTimer(minutes) {
    clearInterval(timer);
    isRunning = false;
    timeLeft = minutes * 60;
    updateTimerDisplay();
}

// === Attach Event Listeners ===

// Main Control Buttons
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// "More" Timer Buttons
document.getElementById('five-mins').addEventListener('click', () => setTimer(5));
document.getElementById('ten-mins').addEventListener('click', () => setTimer(10));
document.getElementById('fifteen-mins').addEventListener('click', () => setTimer(15));
document.getElementById('twenty-mins').addEventListener('click', () => setTimer(20));
document.getElementById('twenty-five-mins').addEventListener('click', () => setTimer(25));
document.getElementById('thirty-mins').addEventListener('click', () => setTimer(30));

// === Initial Display ===
updateTimerDisplay();
