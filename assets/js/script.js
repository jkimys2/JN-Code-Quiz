// variables that call the html elements
var startEl = document.querySelector(".start-quiz");
var quizScreen = document.querySelector(".quiz-screen");
var gameOverPage = document.querySelector(".save-score");
var highscorePage = document.querySelector(".highscore-page");
var viewHighscore = document.querySelector("#view-high-btn");
var questionsEl = document.querySelector("#questions");
var timeEl = document.querySelector("#timer");
var saveBtn = document.querySelector(".save-btn");
var goBackBtn = document.querySelector(".go-back");
var clearScoreBtn = document.querySelector(".clear-score");

// global variables
var timerInterval;
var timeLeft;
var QI = 0;
var score = 0;
var gameScore = [];
viewHighscore.disabled = false;

// array of questions and answers
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
  // startEl.classList.add("hide");
  quizScreen.classList.remove("hide");
  askQuestion();
  timeLeft = 100;
  timerInterval = setInterval(clockTick, 1000);
}

// function for timer
function clockTick() {
  timeLeft--;
  timeEl.textContent = "Time :  " + timeLeft;
  if (timeLeft <= 0) {
    timeLeft = 0;
    timeEl.textContent = "Out of time 🥺";
    clearInterval(timerInterval);
    endGame();
  }
}

// function to call questions
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
        score += 10;
      } else {
        timeLeft -= 10;
      }
      QI++;
      if (QI === questions.length) {
        quizScreen.classList.add("hide");
        clearInterval(timerInterval);
        timeEl.textContent = "";
        endGame();
      } else {
        askQuestion();
      }
    };
    document.getElementById("answers").appendChild(btn);
  });
  viewHighscore.disabled = true;
}

// function that ends game once timer or questions run out
function endGame() {
  quizScreen.classList.add("hide");
  gameOverPage.classList.remove("hide");
  var finalScore = score + timeLeft;
  document.getElementById("final").textContent =
    "Your final score is: " + finalScore + "!";

  var gameOverInput = document.createElement("input");
  gameOverInput.setAttribute("text", "text");
  gameOverInput.setAttribute("class", "input");
  document.getElementById("initials").appendChild(gameOverInput);

  // click event for saving score
  saveBtn.onclick = function (event) {
    event.preventDefault();
    var inputInitial = gameOverInput.value.trim();
    if (gameScore) {
      var newScore = {
        initial: inputInitial,
        score: finalScore,
      };
      gameScore = JSON.parse(localStorage.getItem("GameScore")) || [];
      gameScore.push(newScore);
      localStorage.setItem("GameScore", JSON.stringify(gameScore));
    }
    displayHighscores();
    gameOverInput.value = "";
  };
}

// function to show highscores page
function displayHighscores() {
  gameOverPage.classList.add("hide");
  document.querySelector(".code-quiz").classList.add("hide");
  document.querySelector(".p-tag").classList.add("hide");
  highscorePage.classList.remove("hide");

  for (var i = 0; i < gameScore.length; i++) {
    var scoreLi = document.createElement("li");
    scoreLi.setAttribute(
      "style",
      "list-style-type: none; padding: 2px; margin: 0;"
    );
    scoreLi.innerHTML = gameScore[i].initial + ": " + gameScore[i].score;
    document.getElementById("show-scores").appendChild(scoreLi);
  }
  viewHighscore.disabled = true;

  //  click event for "try again" button
  goBackBtn.onclick = function (event) {
    event.preventDefault();
    highscorePage.classList.add("hide");
    resetGame();
    document.querySelector(".start-screen").classList.remove("hide");
  };

  // click event to clear saved scores in local storage
  clearScoreBtn.onclick = function (event) {
    event.preventDefault();
    localStorage.removeItem("GameScore");
    document.getElementById("show-scores").textContent = "";
  };
}

//  function to reset game
function resetGame() {
  score = 0;
  QI = 0;
  timeLeft = 100;
  viewHighscore.disabled = false;
  document.querySelector(".code-quiz").classList.remove("hide");
  document.querySelector(".p-tag").classList.remove("hide");
}

// click event for "View Higscores!" button
viewHighscore.onclick = function (event) {
  event.preventDefault();
  document.querySelector(".start-screen").classList.add("hide");
  displayHighscores();
};

// starts the game once button is clicked
startEl.addEventListener("click", startQuiz);