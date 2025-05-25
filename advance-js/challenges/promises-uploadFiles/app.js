const questions = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "Hot Mail", "Hyper Transfer Machine Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "What does CSS do?",
    options: ["Style web pages", "Build servers", "Send emails"],
    answer: "Style web pages"
  },
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const startBtn = document.getElementById("start");

startBtn.addEventListener("click", startQuiz);

// Start the quiz
function startQuiz() {
  score = 0;
  currentQuestion = 0;
  resultEl.textContent = "";
  startBtn.style.display = "none";
  loadQuestion();
}

// Load a question and attach event listeners
function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", function handleClick() {
      checkAnswer(option);
    });
    optionsEl.appendChild(btn);
  });
}

// Check answer and show delay using Promise
function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
  }

  showLoading().then(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });
}

// Show fake loading using Promise
function showLoading() {
  questionEl.textContent = "Checking answer...";
  optionsEl.innerHTML = "";
  return new Promise(resolve => {
    setTimeout(() => resolve(), 2000); // 2 second delay
  });
}

// Show final result
function showResult() {
  questionEl.textContent = "Quiz Finished!";
  resultEl.textContent = `Your score: ${score}/${questions.length}`;
  startBtn.textContent = "Try Again";
  startBtn.style.display = "inline-block";
}
