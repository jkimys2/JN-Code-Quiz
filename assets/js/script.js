// these are the variables that call the html elements
var startEl = document.querySelector(".start-quiz");
var quizScreen = document.querySelector(".quiz-screen");
var allDoneEl = document.querySelector(".all-done");
var highscores = document.querySelector(".highscores");
var questionsEl = document.querySelector("#questions");
var answerChoices = document.querySelector("#answers");
var timerInterval;
var timeLeft = 10;
var timeEl = document.getElementById("timer");
var QI = 0;
var score = 0;

// these are the array of questions
var questions = [
  {
    question: "What does HTML stand for?",
    choices: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    question: "Which of these are the correct HTML element for the largest heading?",
    choices: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    question: "Which character is used to indicate an end tag?",
    choices: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    question: "Which character is used to indicate an end tag?",
    choices: ["A", "B", "C", "D"],
    answer: "A",
  },

  // 'What does CSS stand for?',
  // 'Which CSS property controls the text size?',
  // 'How do you select elements with a class name of "test"?',
  // 'Which HTML element does JavaScript go in?',
  // 'True or False: JavaScript is the same as Java.',
  // 'Which operator is used to assign a value to a variable?',
  // 'True or False: JavaScript is case-sensitive.'
];

function startQuiz() {
    document.querySelector(".start-screen").classList.add("hide");
    quizScreen.classList.remove("hide");
    askQuestion();
    timerInterval = setInterval(clockTick, 1000);
    
}
function clockTick (){
    timeLeft--;
    timeEl.textContent = timeLeft
    if(timeLeft <= 0) {
        timeLeft = 0;
        timeEl.textContent = 0;
        clearInterval(timerInterval);
    }
    console.log(timeLeft)
}
function askQuestion() {
document.getElementById("answers").innerHTML = " ";
questionsEl.textContent = questions[QI] .question
questions[QI].choices.forEach(function(choice) {
var btn = document.createElement("button");
btn.setAttribute("class", "btn");
btn.setAttribute("value", choice)
btn.textContent = choice
btn.onclick = function() {
    console.log(this)
    if(this.value === questions[QI].answer) {
        score++
    } else {
       timeLeft -= 10;
    }
    QI++;
    if(QI === questions.length) {
        quizScreen.classList.add("hide");
    }
    else {askQuestion()};
}
document.getElementById("answers").appendChild(btn);
});
}

function endGame(){
    // get score variable
    // get time left variable
    // display end game screen with input for initials
    // add button 
}
function saveScore( ) {
    // get initials and score
    // wrap those in object
    // push each score object to high scores array
    // save to local storage
} 
function displayScores () {
    // get scores from local storage
    // use .sort method to put them in order
    // loop over scores
    // create li for each score
    // append to preexisting ul
    
}
startEl.addEventListener("click", startQuiz)