// these are the variables that call the html elements
var startEl = document.querySelector('.start-quiz');
var questionsEl = document.querySelector('.questions');
var allDoneEl = document.querySelector('.all-done');
var highscores = document.querySelector('.highscores');

var questions = '';
var answerChoices = '';
var timer;

// these are the array of questions
var questions = [
    'What does HTML stand for?',
    'Which of these are the correct HTML element for the largest heading?',
    'Which character is used to indicate an end tag?',
    'What does CSS stand for?',
    'Which CSS property controls the text size?',
    'How do you select elements with a class name of "test"?',
    'Which HTML element does JavaScript go in?',
    'True or False: JavaScript is the same as Java.',
    'Which operator is used to assign a value to a variable?',
    'True or False: JavaScript is case-sensitive.'
]

function startQuiz() {

}