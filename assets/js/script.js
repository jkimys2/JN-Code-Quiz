// these are the variables that call the html elements
var startEl = document.querySelector(".start-quiz");
var quizScreen = document.querySelector(".quiz-screen");
var gameOverPage = document.querySelector(".save-score");
var highscorePage = document.querySelector(".highscore-page");
var viewHighscore = document.querySelector("#view-high-btn")
var questionsEl = document.querySelector("#questions");
// var answerChoices = document.querySelector("#answers");
var timerInterval;
var timeLeft = 10;
var timeEl = document.getElementById("timer");
var QI = 0;
var score = 0;

// these are the array of questions and answers
var questions = [
  {
    question: "What does HTML stand for?",
    choices: [
      "A.  Hyperlinks and Text Markup Language",
      "B.  Home Tool Markup Language",
      "C.  Hyper Text Markup Language",
      "D.  Hyperlinks Tool Markup Language",
    ],
    answer: "C.  Hyper Text Markup Language",
  },
  {
    question:
      "Which of these are the correct HTML element for the largest heading?",
    choices: ["A.  <h1>", "B.  <h6>", "C.  <heading>", "D.  <head>"],
    answer: "A.  <h1>",
  },
  {
    question: "Which character is used to indicate an end tag?",
    choices: ["A.  <", "B.  /", "C.  *", "D.  ^"],
    answer: "B.  /",
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "A.  Computer Style Sheets",
      "B.  Cascading Style Sheets",
      "C.  Creative Style Sheets",
      "D.  Colorful Style Sheets",
    ],
    answer: "B.  Cascading Style Sheets",
  },
  {
    question: "Which CSS property controls the text size?",
    choices: [
      "A.  font-style",
      "B.  text-size",
      "C.  text-style",
      "D.  font-size",
    ],
    answer: "D.  font-size",
  },
  {
    question: "How do you select elements with a class name of 'test'?",
    choices: ["A.  #test", "B.  .test", "C.  test", "D.  *test"],
    answer: "B.  .test",
  },
  {
    question: "Which HTML element does JavaScript go in?",
    choices: [
      "A.  <script>",
      "B.  <javascript>",
      "C.  <js>",
      "D.  <scripting>",
    ],
    answer: "A.  <script>",
  },
  {
    question: "True or False: JavaScript is the same as Java.",
    choices: ["A.  True", "B.  False"],
    answer: "B.  False",
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    choices: ["A.  -", "B.  X", "C.  *", "D.  ="],
    answer: "D.  =",
  },
  {
    question: "True or False: JavaScript is case-sensitive.",
    choices: ["A.  True", "B.  False"],
    answer: "A.  True",
  },
];

// function to start quiz when clicking start quiz button
function startQuiz() {
  document.querySelector(".start-screen").classList.add("hide");
  quizScreen.classList.remove("hide");
  askQuestion();
  timerInterval = setInterval(clockTick, 1000);
}

// function for timer
function clockTick() {
  timeLeft--;
  timeEl.textContent = "Time :  " + timeLeft;
  if (timeLeft <= 0) {
    timeLeft = 0;
    timeEl.textContent = 0;
    clearInterval(timerInterval);
    endGame();
  }
}

// function to call questions and allow user to choose answer
function askQuestion() {
  document.getElementById("answers").innerHTML = " ";
  questionsEl.textContent = questions[QI].question;
  questions[QI].choices.forEach(function (choice) {
    var btn = document.createElement("button");
    btn.setAttribute("class", "btn");
    btn.setAttribute("value", choice);
    btn.textContent = choice;
    btn.onclick = function () {
      if (this.value === questions[QI].answer) {
        score++;
      } else {
        timeLeft -= 10;
      }
      QI++;
      if (QI === questions.length) {
        quizScreen.classList.add("hide");
      } else {
        askQuestion();
      }
    };
    document.getElementById("answers").appendChild(btn);
  });
}

// function that ends game once timer or questions run out
function endGame() {
  quizScreen.classList.add("hide");
  gameOverPage.classList.remove("hide");
  var gameOverInput = document.createElement("input");
  gameOverInput.type = "text";
  gameOverInput.setAttribute("class", "input");
  document.getElementById("initials").appendChild(gameOverInput);
  // get score variable
  // get time left variable
  // display end game screen with input for initials
  // add button
}

// function to save game score
function saveScore() {
  // get initials and score
  // wrap those in object
  // push each score object to high scores array
  // save to local storage
}

// function to display highscore
function displayScores() {
  // get scores from local storage
  // use .sort method to put them in order
  // loop over scores
  // create li for each score
  // append to preexisting ul
}

// starts the game once button is clicked
startEl.addEventListener("click", startQuiz);

