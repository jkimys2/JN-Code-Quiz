// variables that call the html elements
var startEl = document.querySelector(".start-quiz");
var quizScreen = document.querySelector(".quiz-screen");
var gameOverPage = document.querySelector(".save-score");
var highscorePage = document.querySelector(".highscore-page");
var viewHighscore = document.querySelector("#view-high-btn");
var questionsEl = document.querySelector("#questions");
// var answerChoices = document.querySelector("#answers");
var timeEl = document.querySelector("#timer");
var saveBtn = document.querySelector(".save-btn");
var goBackBtn = document.querySelector(".go-back");
var clearScoreBtn = document.querySelector(".clear-score");

// global variables
var timerInterval;
var timeLeft;
var QI = 0;
var score = 0;

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

function init() {
  getScores();
}

// function to start quiz when clicking start quiz button
function startQuiz() {
  document.querySelector(".start-screen").classList.add("hide");
  // startEl.classList.add("hide");
  quizScreen.classList.remove("hide");
  askQuestion();
  timeLeft = 50;
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

  saveBtn.onclick = function (event) {
    event.preventDefault();
    var gameScore = {
      initial: gameOverInput.value.trim(),
      score: finalScore,
    };
    localStorage.setItem("GameScore", JSON.stringify(gameScore));
    displayHighscores();
  };
};

// function to display highscore page
function displayHighscores() {
  gameOverPage.classList.add("hide");
  highscorePage.classList.remove("hide");
  var showHighScores = JSON.parse(localStorage.getItem("GameScore"));
  for (var i = 0; i < showHighScores.length; i++) {
    var previousScores = document.createElement("li");
    previousScores.setAttribute("style", "list-style-type: none; padding: 0; margin: 0;")
    previousScores.innerHTML = showHighScores.initial +": " + showHighScores.score;
    document.getElementById("show-scores").appendChild(previousScores);
  }

  // if (showHighScores === null) {
  //   document.getElementById("show-scores").textContent = "No Saved Scores";
  // } else {
  //   gameScore = showHighScores;
  // }
  
  document.getElementById("show-scores").innerHTML =
    showHighScores.initial + ": " + showHighScores.score;


  // get scores from local storage
  // use .sort method to put them in order
  // loop over scores
  // create li for each score
  // append to preexisting ul
}

function resetGame() {
 score = 0;
 QI = 0;
 timeLeft = 50;
};

function viewHighscoreBtn() {
  startEl.classList.add("hide");
  quizScreen.classList.add("hide");
  gameOverPage.classList.add("hide");
  document.querySelector(".start-screen").classList.add("hide");
  displayHighscores();
}

// function getScores() {
//   var storedWins = JSON.parse(localStorage.getItem("GameScore"));
//   if (storedWins === null) {

//   }
// }
// starts the game once button is clicked
startEl.addEventListener("click", startQuiz);
viewHighscore.addEventListener("click", viewHighscoreBtn);

goBackBtn.onclick = function (event) {
  event.preventDefault();
  highscorePage.classList.add("hide");
  resetGame();
  startQuiz();
};

clearScoreBtn.onclick = function (event) {
  event.preventDefault();
  localStorage.removeItem("GameScore");
  document.getElementById("show-scores").textContent = "";
};

