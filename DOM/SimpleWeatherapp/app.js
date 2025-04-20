// DOM elements
const paragraph = document.getElementById('result');
const redBtn = document.getElementById('redBtn');
const greenBtn = document.getElementById('greenBtn');
const blueBtn = document.getElementById('blueBtn');

// Add event listeners
redBtn.addEventListener('click', function () {
  paragraph.style.color = 'red';
  paragraph.textContent = 'The weather is Hot 🌞.!';
});

greenBtn.addEventListener('click', function () {
  paragraph.style.color = 'green';
  paragraph.textContent = 'The weather is Normal 👌.!';
  paragraph.style.fontSize = '20px';
});

blueBtn.addEventListener('click', function () {
  paragraph.style.color = 'blue';
  paragraph.textContent = 'The weather is Cold 🤡!';
  paragraph.style.fontSize = '20px';
}
);
