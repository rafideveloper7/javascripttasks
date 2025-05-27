let timer;
let remainingSeconds = 0;
let currentTask = "";

// Load saved state on startup
chrome.storage.local.get(['timerRunning', 'remainingSeconds', 'taskTitle'], (data) => {
  if (data.timerRunning) {
    startBackgroundTimer(data.remainingSeconds, data.taskTitle);
  }
});

function startBackgroundTimer(seconds, taskTitle) {
  clearInterval(timer);
  remainingSeconds = seconds;
  currentTask = taskTitle;
  
  timer = setInterval(() => {
    remainingSeconds--;
    chrome.storage.local.set({
      timerRunning: true,
      remainingSeconds,
      taskTitle: currentTask
    });
    
    if (remainingSeconds <= 0) {
      clearInterval(timer);
      chrome.storage.local.remove(['timerRunning']);
      chrome.alarms.create('timerFinished', { when: Date.now() + 100 });
    }
  }, 1000);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startTimer") {
    startBackgroundTimer(request.seconds, request.taskTitle);
  } else if (request.action === "stopTimer") {
    clearInterval(timer);
    saveSession(currentTask, request.totalSeconds);
    chrome.storage.local.remove(['timerRunning']);
  }
});

function saveSession(taskTitle, totalSeconds) {
  const session = {
    taskTitle,
    date: new Date().toLocaleDateString(),
    startTime: new Date(Date.now() - totalSeconds * 1000).toLocaleTimeString(),
    endTime: new Date().toLocaleTimeString(),
    duration: Math.floor(totalSeconds / 60) + "m " + (totalSeconds % 60) + "s"
  };

  chrome.storage.local.get({sessions: []}, (data) => {
    const updated = [session, ...data.sessions.slice(0, 9)];
    chrome.storage.local.set({sessions: updated});
  });
}