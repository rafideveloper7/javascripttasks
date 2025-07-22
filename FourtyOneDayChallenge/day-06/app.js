// app.js - Final Comprehensive Update for User Management and Leaderboard Fix

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const appWrapper = document.getElementById('app-wrapper');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const hamburgerMenu = document.getElementById('hamburger-menu');

    const sections = document.querySelectorAll('.content-card');
    const homeSection = document.getElementById('home-section');
    const quizSection = document.getElementById('quiz-section');
    const resultSection = document.getElementById('result-section');
    const leaderboardSection = document.getElementById('leaderboard-section');
    const profileSection = document.getElementById('profile-section');

    const userDisplay = document.getElementById('user-display'); // In sidebar
    const changeUserBtn = document.getElementById('change-user-btn'); // In sidebar

    // Home Section Specifics
    const homeUserName = document.getElementById('home-user-name');
    const proceedToQuizBtn = document.getElementById('proceed-to-quiz-btn');
    const existingUsersList = document.getElementById('existing-users-list');
    const noUsersMessage = document.getElementById('no-users-message');
    const addUserForm = document.getElementById('add-user-form');
    const newUsernameInput = document.getElementById('new-username-input');
    const addUserBtn = document.getElementById('add-user-btn');
    const questionRangeInput = document.getElementById('question-range');
    const maxQuestionsInfo = document.getElementById('max-questions-info');

    // Quiz Section Elements
    const progressBar = document.getElementById('progress');
    const currentQNumSpan = document.getElementById('current-qnum');
    const totalQNumSpan = document.getElementById('total-qnum');
    const questionsLeftSpan = document.getElementById('questions-left');
    const questionText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const nextBtn = document.getElementById('next-btn');
    const quitBtn = document.getElementById('quit-btn');

    // Results Section Elements
    const correctCountSpan = document.getElementById('correct-count');
    const wrongCountSpan = document.getElementById('wrong-count');
    const percentageSpan = document.getElementById('percentage');
    const marksSpan = document.getElementById('marks');
    const totalQuestionsSpans = document.querySelectorAll('.total-questions');
    const starRatingDiv = document.getElementById('star-rating');
    const restartBtn = document.getElementById('restart-btn');
    const homeBtn = document.getElementById('home-btn');

    // Sidebar Navigation Elements
    const navHome = document.getElementById('nav-home');
    const navQuiz = document.getElementById('nav-quiz');
    const navLeaderboard = document.getElementById('nav-leaderboard');
    const navProfile = document.getElementById('nav-profile');

    // Leaderboard elements
    const leaderboardList = document.querySelector('.leaderboard-list');

    // Profile elements
    const profileUsernameSpan = document.getElementById('profile-username');
    const totalQuizzesTakenSpan = document.getElementById('total-quizzes-taken');
    const averageScoreSpan = document.getElementById('average-score');
    const quizHistoryList = document.querySelector('.quiz-history-list');
    const deleteProfileBtn = document.getElementById('delete-profile-btn');

    // --- Quiz State Variables ---
    let currentQuestionIndex = 0;
    let score = 0;
    let quizQuestions = [];
    let totalQuestions = 0;
    let currentUser = null; // Holds the name of the currently active student

    // Global 'users' object to store all student data
    // Structure: { "studentName1": { quizScores: [...] }, "studentName2": { quizScores: [...] }}
    let users = {}; // Initialize as empty, will be loaded from localStorage immediately

    const MAX_USERS = 5; // Limit to 5 users

    // --- Utility Functions ---

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function resetQuizState() {
        currentQuestionIndex = 0;
        score = 0;
        quizQuestions = [];
        totalQuestions = 0;
        nextBtn.disabled = true;
        progressBar.style.width = '0%';
        // Ensure questionRangeInput value is within limits if it's not already
        if (questionRangeInput) {
            questionRangeInput.value = Math.min(questions.length, parseInt(questionRangeInput.value) || 10);
        }
    }

    function updateProgressBar() {
        const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function renderStarRating(percentage) {
        starRatingDiv.innerHTML = '';
        const fullStars = Math.floor(percentage / 20);
        const emptyStars = 5 - fullStars;

        for (let i = 0; i < fullStars; i++) {
            const span = document.createElement('span');
            span.innerHTML = '&#9733;'; // Solid star
            starRatingDiv.appendChild(span);
        }
        for (let i = 0; i < emptyStars; i++) {
            const span = document.createElement('span');
            span.innerHTML = '&#9733;'; // Empty star
            span.classList.add('empty');
            starRatingDiv.appendChild(span);
        }
    }

    // --- UI State Management ---

    function showSection(sectionToShow) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        sectionToShow.classList.add('active');
        // Close sidebar if on mobile after selecting a section
        if (window.innerWidth <= 992 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        }
        // Scroll to top of the content area
        mainContent.scrollTo(0, 0);
    }

    function setActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('#sidebar-nav a');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    // --- User Management (New & Enhanced) ---

    // Central function to load users from localStorage and update currentUser
    function loadUsersFromLocalStorage() {
        users = JSON.parse(localStorage.getItem('users')) || {};
        let storedCurrentUser = localStorage.getItem('currentUser');

        // Check if the stored current user still exists in the users object
        if (storedCurrentUser && users[storedCurrentUser]) {
            currentUser = storedCurrentUser;
        } else {
            // If the stored user doesn't exist or was null, try to pick another
            const userNames = Object.keys(users);
            if (userNames.length > 0) {
                currentUser = userNames[0]; // Pick the first available user
                localStorage.setItem('currentUser', currentUser); // Store the newly chosen current user
            } else {
                currentUser = null; // No users left
                localStorage.removeItem('currentUser');
            }
        }
        updateUserDisplay(); // Update UI elements that show current user
        renderExistingUsers(); // Update the list on the home section
    }

    function updateUserDisplay() {
        const userNameText = currentUser ? currentUser : 'Guest';
        userDisplay.textContent = userNameText;
        homeUserName.textContent = userNameText; // Update home section display
        
        // Enable/disable quiz start button based on if a user is selected
        proceedToQuizBtn.disabled = !currentUser;
        if (!currentUser) {
            proceedToQuizBtn.textContent = 'Select a student to start quiz';
            proceedToQuizBtn.classList.remove('btn-success');
            proceedToQuizBtn.classList.add('btn-secondary');
        } else {
            proceedToQuizBtn.textContent = 'Start Quiz for Current Student';
            proceedToQuizBtn.classList.remove('btn-secondary');
            proceedToQuizBtn.classList.add('btn-success');
        }

        // Set max questions based on available questions in `questions.js`
        maxQuestionsInfo.textContent = questions.length;
        questionRangeInput.max = questions.length;
        // Ensure question range input value doesn't exceed available questions
        if (parseInt(questionRangeInput.value) > questions.length) {
            questionRangeInput.value = questions.length;
        }
    }

    function renderExistingUsers() {
        existingUsersList.innerHTML = ''; // Clear existing list

        const userNames = Object.keys(users); // Use the global 'users' variable
        if (userNames.length === 0) {
            noUsersMessage.classList.remove('hide');
        } else {
            noUsersMessage.classList.add('hide');
            userNames.forEach(name => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                if (name === currentUser) {
                    li.classList.add('active-user');
                }
                li.innerHTML = `
                    <span>${name}</span>
                    <button class="btn btn-sm select-user-btn" data-username="${name}">${name === currentUser ? 'Selected' : 'Select'}</button>
                `;
                existingUsersList.appendChild(li);

                // Add event listener to the select button
                const selectButton = li.querySelector('.select-user-btn');
                if (name === currentUser) {
                    selectButton.disabled = true; // Disable select button for the current user
                } else {
                    selectButton.addEventListener('click', (e) => {
                        e.stopPropagation(); // Prevent li click if any
                        selectUser(name);
                    });
                }
            });
        }
        // Disable add user if max users reached
        if (userNames.length >= MAX_USERS) {
            addUserBtn.disabled = true;
            newUsernameInput.placeholder = `Max ${MAX_USERS} students reached`;
            newUsernameInput.disabled = true;
        } else {
            addUserBtn.disabled = false;
            newUsernameInput.placeholder = "Enter student's name";
            newUsernameInput.disabled = false;
        }
    }

    function selectUser(username) {
        if (currentUser !== username) { // Only update if changing user
            currentUser = username;
            localStorage.setItem('currentUser', currentUser);
            updateUserDisplay();
            renderExistingUsers(); // Re-render to show active user
            alert(`Switched to student: ${username}`);
        }
    }

    function addNewUser(username) {
        username = username.trim();
        if (!username) {
            alert('Student name cannot be empty.');
            return false;
        }
        // Case-insensitive check for existing user
        const existingUserNames = Object.keys(users).map(name => name.toLowerCase());
        if (existingUserNames.includes(username.toLowerCase())) {
            alert('A student with this name already exists. Please choose a different name or select the existing one.');
            return false;
        }
        if (Object.keys(users).length >= MAX_USERS) {
            alert(`Maximum of ${MAX_USERS} students allowed. Please delete an existing student to add a new one.`);
            return false;
        }

        users[username] = { quizScores: [] };
        localStorage.setItem('users', JSON.stringify(users));
        selectUser(username); // Set new user as current
        newUsernameInput.value = ''; // Clear input
        return true;
    }

    function deleteCurrentUser() {
        if (!currentUser || !users[currentUser]) {
            alert("No user selected or profile not found.");
            return;
        }

        if (confirm(`Are you sure you want to delete the profile for "${currentUser}"? All quiz history for this student will be lost permanently.`)) {
            const deletedUserName = currentUser; // Store the name before deletion
            delete users[deletedUserName]; // Remove user from the object
            localStorage.setItem('users', JSON.stringify(users)); // Save updated users

            // After deletion, re-evaluate and set the new current user
            // This is handled by loadUsersFromLocalStorage()
            loadUsersFromLocalStorage(); // This will refresh sidebar, home, and update currentUser appropriately

            alert(`Profile for "${deletedUserName}" has been deleted.`);
            
            showSection(homeSection); // Go back to home
            setActiveNavLink(navHome);
        }
    }

    // --- Quiz Flow Functions ---

    function startQuiz() {
        if (!currentUser) {
            alert("Please select or add a student profile from the Home section before starting a quiz.");
            showSection(homeSection);
            setActiveNavLink(navHome);
            return;
        }

        resetQuizState();
        totalQuestions = parseInt(questionRangeInput.value);

        if (isNaN(totalQuestions) || totalQuestions <= 0) {
            alert('Please enter a valid number of questions (at least 1).');
            return;
        }

        if (totalQuestions > questions.length) {
            totalQuestions = questions.length;
            questionRangeInput.value = questions.length;
            alert(`You requested more questions than available. Starting quiz with all ${questions.length} questions.`);
        }

        quizQuestions = shuffleArray(questions).slice(0, totalQuestions);

        showSection(quizSection);
        setActiveNavLink(navQuiz);

        totalQNumSpan.textContent = totalQuestions;
        questionsLeftSpan.textContent = totalQuestions - currentQuestionIndex - 1; // Corrected initial questions left
        questionText.textContent = ''; // Clear previous question
        optionsList.innerHTML = ''; // Clear previous options
        updateProgressBar();
        loadQuestion();
    }

    function loadQuestion() {
        nextBtn.disabled = true;
        optionsList.classList.remove('pointer-none');
        Array.from(optionsList.children).forEach(li => {
            li.classList.remove('correct', 'incorrect', 'disabled');
        });

        if (currentQuestionIndex < totalQuestions) {
            const q = quizQuestions[currentQuestionIndex];
            currentQNumSpan.textContent = currentQuestionIndex + 1;
            questionsLeftSpan.textContent = totalQuestions - (currentQuestionIndex + 1);
            questionText.textContent = q.question;
            optionsList.innerHTML = '';

            const shuffledOptions = shuffleArray(q.options);

            shuffledOptions.forEach(option => {
                const li = document.createElement('li');
                li.textContent = option;
                li.addEventListener('click', () => selectOption(li, option, q.answer));
                optionsList.appendChild(li);
            });
        } else {
            showResults();
        }
        updateProgressBar();
    }

    function selectOption(selectedLi, selectedAnswer, correctAnswer) {
        optionsList.classList.add('pointer-none');
        Array.from(optionsList.children).forEach(li => li.classList.add('disabled'));

        if (selectedAnswer === correctAnswer) {
            selectedLi.classList.add('correct');
            score++;
        } else {
            selectedLi.classList.add('incorrect');
            Array.from(optionsList.children).forEach(li => {
                if (li.textContent === correctAnswer) {
                    li.classList.add('correct');
                }
            });
        }
        nextBtn.disabled = false;
    }

    function loadNextQuestion() {
        currentQuestionIndex++;
        loadQuestion();
    }

    function showResults() {
        showSection(resultSection);

        const wrongCount = totalQuestions - score;
        const percentage = (totalQuestions > 0) ? (score / totalQuestions) * 100 : 0;
        const marks = score;

        correctCountSpan.textContent = score;
        wrongCountSpan.textContent = wrongCount;
        percentageSpan.textContent = percentage.toFixed(2);
        marksSpan.textContent = marks;
        totalQuestionsSpans.forEach(span => span.textContent = totalQuestions);

        renderStarRating(percentage);
        saveQuizResult(score, totalQuestions, percentage);
    }

    function saveQuizResult(correctAnswers, totalQuizQuestions, percentage) {
        // Always load latest users state before modifying and saving
        users = JSON.parse(localStorage.getItem('users')) || {};

        if (currentUser && users[currentUser]) {
            const quizResult = {
                date: new Date().toLocaleString(),
                correct: correctAnswers,
                total: totalQuizQuestions,
                percentage: parseFloat(percentage.toFixed(2))
            };
            // Ensure quizScores array exists
            if (!users[currentUser].quizScores) {
                users[currentUser].quizScores = [];
            }
            users[currentUser].quizScores.push(quizResult);
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    // --- Leaderboard Functions ---

    function renderLeaderboard() {
        leaderboardList.innerHTML = ''; // Clear previous list

        // Ensure 'users' is always refreshed from localStorage before rendering
        // This is crucial for reflecting deletions or additions.
        users = JSON.parse(localStorage.getItem('users')) || {};

        const userScores = [];
        for (const username in users) {
            const user = users[username];
            // Get data for leaderboard: average score and total quizzes
            if (user.quizScores && user.quizScores.length > 0) {
                const totalPercentage = user.quizScores.reduce((sum, result) => sum + result.percentage, 0);
                const averagePercentage = totalPercentage / user.quizScores.length;
                userScores.push({
                    username: username,
                    averageScore: parseFloat(averagePercentage.toFixed(2)),
                    totalQuizzes: user.quizScores.length
                });
            } else {
                // Include users with no quiz data, but with 0 average score and quizzes
                // This ensures all registered users appear on the leaderboard, even if they haven't played
                userScores.push({
                    username: username,
                    averageScore: 0,
                    totalQuizzes: 0
                });
            }
        }

        // Sort: primarily by average score (descending), secondarily by total quizzes (descending for ties)
        userScores.sort((a, b) => {
            if (b.averageScore === a.averageScore) {
                return b.totalQuizzes - a.totalQuizzes;
            }
            return b.averageScore - a.averageScore;
        });

        if (userScores.length === 0) {
            leaderboardList.innerHTML = '<li class="text-center" style="color: var(--text-muted);">No students registered or no quiz data available yet.</li>';
            return;
        }

        userScores.forEach((entry, index) => {
            const li = document.createElement('li');
            li.classList.add('leaderboard-item');
            li.innerHTML = `
                <span class="leaderboard-rank">${index + 1}.</span>
                <span class="leaderboard-username">${entry.username}</span>
                <span class="leaderboard-score">${entry.averageScore}%</span>
                <span class="leaderboard-total-quizzes">(${entry.totalQuizzes} quizzes)</span>
            `;
            leaderboardList.appendChild(li);
        });
    }

    // --- Profile Functions ---

    function renderProfile() {
        // Ensure 'users' is always refreshed from localStorage before rendering
        users = JSON.parse(localStorage.getItem('users')) || {};

        if (!currentUser || !users[currentUser]) {
            profileUsernameSpan.textContent = 'N/A';
            totalQuizzesTakenSpan.textContent = 0;
            averageScoreSpan.textContent = 0;
            quizHistoryList.innerHTML = '<li class="text-center" style="color: var(--text-muted);">No user selected or profile not found.</li>';
            deleteProfileBtn.disabled = true; // Disable delete if no user
            return;
        }

        const user = users[currentUser];
        profileUsernameSpan.textContent = currentUser;
        totalQuizzesTakenSpan.textContent = user.quizScores ? user.quizScores.length : 0;
        deleteProfileBtn.disabled = false; // Enable delete button

        if (user.quizScores && user.quizScores.length > 0) {
            const totalPercentage = user.quizScores.reduce((sum, result) => sum + result.percentage, 0);
            const averagePercentage = totalPercentage / user.quizScores.length;
            averageScoreSpan.textContent = averagePercentage.toFixed(2);
        } else {
            averageScoreSpan.textContent = 0;
        }

        quizHistoryList.innerHTML = ''; // Clear previous history

        if (!user.quizScores || user.quizScores.length === 0) {
            quizHistoryList.innerHTML = '<li class="text-center" style="color: var(--text-muted);">No quiz history available for this student.</li>';
        } else {
            // Display recent quizzes first
            [...user.quizScores].reverse().forEach(record => {
                const li = document.createElement('li');
                li.classList.add('quiz-history-item');
                li.innerHTML = `
                    <span class="history-date">${record.date}</span>
                    <span class="history-score">${record.correct}/${record.total} Correct</span>
                    <span class="history-percentage">${record.percentage.toFixed(2)}%</span>
                `;
                quizHistoryList.appendChild(li);
            });
        }
    }


    // --- Event Listeners ---

    // Sidebar Navigation
    navHome.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(homeSection);
        setActiveNavLink(navHome);
        resetQuizState(); // Reset quiz state when going home
        loadUsersFromLocalStorage(); // Re-render user list and update display on home
    });

    navQuiz.addEventListener('click', (e) => {
        e.preventDefault();
        // Always check for current user before allowing quiz
        if (!currentUser) {
            alert("Please select or add a student profile from the Home section before starting a quiz.");
            showSection(homeSection);
            setActiveNavLink(navHome);
            return;
        }
        // If coming from another section, ensure quiz state is ready
        // If no quiz in progress, or it was completed, re-start a fresh one
        if (quizQuestions.length === 0 || currentQuestionIndex >= totalQuestions) {
            resetQuizState();
            startQuiz(); // Initiates a new quiz session
        }
        showSection(quizSection);
        setActiveNavLink(navQuiz);
    });

    navLeaderboard.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(leaderboardSection);
        setActiveNavLink(navLeaderboard);
        renderLeaderboard(); // Populate leaderboard when navigating to it
    });

    navProfile.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(profileSection);
        setActiveNavLink(navProfile);
        renderProfile(); // Populate profile when navigating to it
    });

    // Hamburger Menu Toggle
    hamburgerMenu.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });

    // Close sidebar if user clicks outside of it on mobile
    mainContent.addEventListener('click', () => {
        if (window.innerWidth <= 992 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        }
    });

    // Home Section Buttons
    changeUserBtn.addEventListener('click', () => {
        showSection(homeSection);
        setActiveNavLink(navHome);
        loadUsersFromLocalStorage(); // Ensure latest user list is rendered
    });

    proceedToQuizBtn.addEventListener('click', startQuiz); // This button now initiates quiz

    addUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = newUsernameInput.value.trim();
        if (addNewUser(newName)) {
            // New user added and selected, UI updated in addNewUser
        }
    });

    // Quiz Navigation Buttons
    nextBtn.addEventListener('click', loadNextQuestion);
    quitBtn.addEventListener('click', showResults);
    restartBtn.addEventListener('click', startQuiz);
    homeBtn.addEventListener('click', () => {
        showSection(homeSection);
        setActiveNavLink(navHome);
        resetQuizState();
        loadUsersFromLocalStorage(); // Re-render users on home
    });

    // Profile Section Buttons
    deleteProfileBtn.addEventListener('click', deleteCurrentUser);

    // Initial load logic
    loadUsersFromLocalStorage(); // Initial load of users and current user setup
    showSection(homeSection); // Always start on the home section
    setActiveNavLink(navHome);
});