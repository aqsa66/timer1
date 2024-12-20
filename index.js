// Quiz data
const quizData = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is the capital of France?", options: ["Rome", "Paris", "Berlin", "Madrid"], answer: "Paris" },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Homer", "Dante", "Chaucer"], answer: "Shakespeare" },
];

let currentQuestion = 0;
let timeLeft = 10;
let timerInterval;

// DOM elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("time");
const nextBtn = document.getElementById("nextBtn");

// Display the current question
function displayQuestion() {
    clearInterval(timerInterval);
    timeLeft = 10;
    timerEl.textContent = timeLeft;

    // Update question and options
    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;
    optionsEl.innerHTML = ""; // Clear previous options

    current.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option));
        optionsEl.appendChild(button);
    });

    // Start the timer
    startTimer();
}

// Timer function
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            goToNextQuestion();
        }
    }, 1000);
}

// Check the answer
function checkAnswer(selectedOption) {
    clearInterval(timerInterval); // Stop the timer
    const current = quizData[currentQuestion];

    if (selectedOption === current.answer) {
        alert("Correct!");
    } else {
        alert("Wrong Answer!");
    }

    goToNextQuestion();
}

// Go to the next question
function goToNextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// End the quiz
function endQuiz() {
    questionEl.textContent = "Quiz Completed!";
    optionsEl.innerHTML = "";
    timerEl.textContent = "0";
    nextBtn.style.display = "none";
}

// Event listener for the next button
nextBtn.addEventListener("click", goToNextQuestion);

// Start the quiz
displayQuestion();
