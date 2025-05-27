// DOM Elements
const taskTitleInput = document.getElementById('taskTitle');
const minutesInput = document.getElementById('minutesInput');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const display = document.getElementById('display');
const taskDisplay = document.getElementById('taskDisplay');
const historyList = document.getElementById('historyList');
const resumeBtn = document.getElementById('resumeBtn');
const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

// State
let timerInterval;
let remainingSeconds = 0;
let totalSeconds = 0;
let currentTask = '';
let isPaused = false;
let selectedSessionId = null;
let sessions = [];

// Initialize
loadRunningTimer();
loadHistory();

// Event Listeners
startBtn.addEventListener('click', startNewTimer);
pauseBtn.addEventListener('click', togglePause);
stopBtn.addEventListener('click', stopTimer);
resumeBtn.addEventListener('click', resumeSession);
editBtn.addEventListener('click', editSession);
deleteBtn.addEventListener('click', deleteSession);
clearAllBtn.addEventListener('click', clearAllSessions);

// Preset buttons
document.querySelectorAll('.preset-buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    minutesInput.value = btn.dataset.minutes;
    taskTitleInput.focus();
  });
});

// Timer Functions
function startNewTimer() {
  const minutes = parseInt(minutesInput.value);
  const taskTitle = taskTitleInput.value.trim();
  
  if (!validateInput(taskTitle, minutes)) return;

  totalSeconds = minutes * 60;
  remainingSeconds = totalSeconds;
  currentTask = taskTitle;
  isPaused = false;

  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  
  // Update UI
  taskDisplay.textContent = currentTask;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  stopBtn.disabled = false;
  pauseBtn.textContent = 'Pause';
  updateDisplay();

  // Start countdown
  timerInterval = setInterval(() => {
    remainingSeconds--;
    updateDisplay();
    
    // Save state
    saveRunningState();

    if (remainingSeconds <= 0) {
      completeTimer();
    }
  }, 1000);

  // Save initial state
  saveRunningState();
}

function togglePause() {
  if (isPaused) {
    // Resume timer
    isPaused = false;
    pauseBtn.textContent = 'Pause';
    startTimer();
  } else {
    // Pause timer
    isPaused = true;
    clearInterval(timerInterval);
    pauseBtn.textContent = 'Resume';
    saveRunningState();
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  const minutesSpent = Math.ceil((totalSeconds - remainingSeconds) / 60);
  if (minutesSpent > 0) {
    saveSession(currentTask, minutesSpent);
  }
  resetTimer();
}

function completeTimer() {
  clearInterval(timerInterval);
  const minutesSpent = totalSeconds / 60;
  saveSession(currentTask, minutesSpent);
  notifyCompletion(currentTask, minutesSpent);
  resetTimer();
}

function resetTimer() {
  clearInterval(timerInterval);
  remainingSeconds = 0;
  currentTask = '';
  display.textContent = '00:00:00';
  taskDisplay.textContent = 'No active task';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  stopBtn.disabled = true;
  isPaused = false;
  chrome.storage.local.remove(['runningTimer']);
}

function updateDisplay() {
  const hours = Math.floor(remainingSeconds / 3600).toString().padStart(2, '0');
  const mins = Math.floor((remainingSeconds % 3600) / 60).toString().padStart(2, '0');
  const secs = (remainingSeconds % 60).toString().padStart(2, '0');
  display.textContent = `${hours}:${mins}:${secs}`;
}

// Session Management
function resumeSession() {
  if (selectedSessionId === null) return;
  
  const session = sessions[selectedSessionId];
  if (confirm(`Resume "${session.taskTitle}" (${session.duration})?`)) {
    const minutes = parseDuration(session.duration);
    taskTitleInput.value = session.taskTitle;
    minutesInput.value = minutes;
    startNewTimer();
  }
}

function editSession() {
  if (selectedSessionId === null) return;
  
  const session = sessions[selectedSessionId];
  const newTitle = prompt('Edit task title:', session.taskTitle);
  if (newTitle && newTitle !== session.taskTitle) {
    sessions[selectedSessionId].taskTitle = newTitle;
    saveSessions();
  }
}

function deleteSession() {
  if (selectedSessionId === null) return;
  
  const session = sessions[selectedSessionId];
  if (confirm(`Delete "${session.taskTitle}" session?`)) {
    sessions.splice(selectedSessionId, 1);
    selectedSessionId = null;
    saveSessions();
    updateActionButtons();
  }
}

function clearAllSessions() {
  if (sessions.length === 0) return;
  
  if (confirm('Delete ALL session history? This cannot be undone.')) {
    sessions = [];
    selectedSessionId = null;
    saveSessions();
    updateActionButtons();
  }
}

// Storage Functions
function saveRunningState() {
  chrome.storage.local.set({
    runningTimer: {
      remainingSeconds,
      totalSeconds,
      taskTitle: currentTask,
      isPaused,
      startTime: Date.now() - (totalSeconds - remainingSeconds) * 1000
    }
  });
}

function saveSession(taskTitle, minutesSpent) {
  const session = {
    taskTitle,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    duration: formatDuration(minutesSpent),
    timestamp: Date.now()
  };

  sessions.unshift(session);
  saveSessions();
}

function saveSessions() {
  chrome.storage.local.set({ sessions: sessions.slice(0, 100) }, loadHistory);
}

function loadRunningTimer() {
  chrome.storage.local.get(['runningTimer'], (data) => {
    if (data.runningTimer) {
      const timer = data.runningTimer;
      const timeElapsed = timer.isPaused ? 0 : Math.floor((Date.now() - timer.startTime) / 1000);
      const adjustedRemaining = timer.remainingSeconds - timeElapsed;
      
      if (adjustedRemaining > 0) {
        currentTask = timer.taskTitle;
        remainingSeconds = adjustedRemaining;
        totalSeconds = timer.totalSeconds;
        isPaused = timer.isPaused;
        
        taskDisplay.textContent = currentTask;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        stopBtn.disabled = false;
        pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
        updateDisplay();
        
        if (!isPaused) {
          startTimer();
        }
      } else {
        chrome.storage.local.remove(['runningTimer']);
      }
    }
  });
}

function loadHistory() {
  chrome.storage.local.get(['sessions'], (result) => {
    sessions = result.sessions || [];
    
    if (sessions.length === 0) {
      historyList.innerHTML = '<div class="empty-state">No sessions recorded yet</div>';
      return;
    }

    historyList.innerHTML = sessions.map((session, index) => `
      <div class="session-item" data-id="${index}">
        <strong>${session.taskTitle}</strong>
        <div>${session.duration} • ${session.date} • ${session.time}</div>
      </div>
    `).join('');

    // Add click handlers for each session item
    document.querySelectorAll('.session-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.session-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        selectedSessionId = parseInt(item.dataset.id);
        updateActionButtons();
      });
    });
  });
}

// Helper Functions
function validateInput(taskTitle, minutes) {
  if (!taskTitle) {
    alert('Please enter a task title');
    taskTitleInput.focus();
    return false;
  }
  
  if (!minutes || minutes < 1) {
    alert('Please enter a valid duration (minimum 1 minute)');
    minutesInput.focus();
    return false;
  }
  
  return true;
}

function formatDuration(minutes) {
  if (minutes > 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  return `${minutes}m`;
}

function parseDuration(duration) {
  if (duration.includes('h')) {
    const parts = duration.split('h');
    const hours = parseInt(parts[0]);
    const mins = parts[1].includes('m') ? parseInt(parts[1].split('m')[0]) : 0;
    return hours * 60 + mins;
  }
  return parseInt(duration.split('m')[0]);
}

function updateActionButtons() {
  if (selectedSessionId === null) {
    resumeBtn.disabled = true;
    editBtn.disabled = true;
    deleteBtn.disabled = true;
    return;
  }

  resumeBtn.disabled = false;
  editBtn.disabled = false;
  deleteBtn.disabled = false;
}

function notifyCompletion(taskTitle, minutesSpent) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title: 'Task Completed!',
    message: `Finished "${taskTitle}" after ${minutesSpent} minutes`
  });
}

// Focus task title input when popup opens
taskTitleInput.focus();