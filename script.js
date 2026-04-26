console.log("JS LOADED");

// QUESTIONS
const questions = [
  {
    question: "What keyword is used to declare a variable in modern JavaScript?",
    answers: ["var", "let", "define", "int"],
    correct: 1
  },
  {
    question: "Which data type is used for true or false values?",
    answers: ["string", "boolean", "number", "object"],
    correct: 1
  },
  {
    question: "How do you write a function in JavaScript?",
    answers: [
      "function myFunc() {}",
      "create function myFunc()",
      "def myFunc()",
      "func myFunc()"
    ],
    correct: 0
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: ["//", "/* */", "#", "<!-- -->"],
    correct: 0
  },
  {
    question: "What does console.log() do?",
    answers: [
      "Shows output in the console",
      "Creates a variable",
      "Deletes data",
      "Runs a loop"
    ],
    correct: 0
  },
  {
    question: "Which method adds an item to the end of an array?",
    answers: ["push()", "pop()", "shift()", "concat()"],
    correct: 0
  },
  {
    question: "What is an array used for?",
    answers: [
      "Storing multiple values",
      "Storing only numbers",
      "Storing only strings",
      "Creating functions"
    ],
    correct: 0
  },
  {
    question: "How do you access the first item in an array?",
    answers: ["array[0]", "array[1]", "first(array)", "array.first"],
    correct: 0
  },
  {
    question: "Which operator is used for strict comparison?",
    answers: ["==", "=", "===", "!="],
    correct: 2
  },
  {
    question: "What does typeof do?",
    answers: [
      "Deletes a variable",
      "Checks data type",
      "Creates a loop",
      "Logs output"
    ],
    correct: 1
  }
];

// STATE
let current = 0;
let selected = [];

// ELEMENTS
let startBtn = document.getElementById("start-btn");
let startScreen = document.getElementById("start-screen");
let quizScreen = document.getElementById("quiz-screen");
let resultScreen = document.getElementById("result-screen");

let questionEl = document.getElementById("question");
let answersEl = document.getElementById("answers");

let progressText = document.getElementById("progress-text");
let progressPercent = document.getElementById("progress-percent");
let progressFill = document.querySelector(".progress-fill");

let nextBtn = document.getElementById("next-btn");
let prevBtn = document.getElementById("previous-btn");

// RESULTS
let correctAnswersEl = document.getElementById("correct-answers");
let percentageEl = document.getElementById("percentage");
let attemptedEl = document.getElementById("attempted");
let correctEl = document.getElementById("correct");
let wrongEl = document.getElementById("wrong");

// START QUIZ
startBtn.onclick = function () {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
};

// SHOW QUESTION
function showQuestion() {
  let q = questions[current];

  questionEl.textContent = q.question;

  answersEl.innerHTML = "";

  for (let i = 0; i < q.answers.length; i++) {
    let btn = document.createElement("button");
    btn.classList.add("answer");

    btn.innerHTML =
      '<span class="letter">' +
      String.fromCharCode(65 + i) +
      '</span><span class="text">' +
      q.answers[i] +
      "</span>";

    if (selected[current] === i) {
      btn.classList.add("active");
    }

    btn.onclick = function () {
      selectAnswer(i);
    };

    answersEl.appendChild(btn);
  }

  updateProgress();
}

// SELECT ANSWER
function selectAnswer(i) {
  selected[current] = i;

  let allAnswers = document.querySelectorAll(".answer");

  for (let j = 0; j < allAnswers.length; j++) {
    allAnswers[j].classList.remove("active");
  }

  allAnswers[i].classList.add("active");
}

// NEXT BUTTON
nextBtn.onclick = function () {
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  } else {
    showResult();
  }
};

// PREVIOUS BUTTON
prevBtn.onclick = function () {
  if (current > 0) {
    current--;
    showQuestion();
  }
};

// UPDATE PROGRESS
function updateProgress() {
  let total = questions.length;
  let percent = Math.round(((current + 1) / total) * 100);

  progressText.textContent = "QUESTION " + (current + 1) + " OF " + total;
  progressPercent.textContent = percent + "% Complete";

  progressFill.style.width = percent + "%";
}

// SHOW RESULT
function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (selected[i] === questions[i].correct) {
      score++;
    }
  }

  let total = questions.length;
  let percent = Math.round((score / total) * 100);

  correctAnswersEl.textContent = score + "/" + total;
  percentageEl.textContent = percent + "%";

  attemptedEl.textContent = selected.length;
  correctEl.textContent = score;
  wrongEl.textContent = selected.length - score;
}

// RESTART
function restartQuiz() {
  current = 0;
  selected = [];

  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}