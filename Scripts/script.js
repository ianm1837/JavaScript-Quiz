var questions = [{
		number: 1,
		content: "commonly used data types in JS do not include",
		answer1: "strings",
		answer2: "booleans",
		answer3: "numbers",
		answer4: "alerts",
		correct: "answer4"		
	},
	{
		number: 2,
		content: "the condition in an if/else statement is enclosed with _____________.",
		answer1: "quotes",
		answer2: "curly brackets",
		answer3: "parenthesis",
		answer4: "square brackets",
		correct: "answer3"
	},
	{
		number: 3,
		content: "Arrays in JavaScript can be used to store _____________.",
		answer1: "numbers and strings",
		answer2: "other arrays",
		answer3: "booleans",
		answer4: "all of the above",
		correct: "answer4"
	},
	{
		number: 4,
		content: "String values must be enclosed within ___________ when being assigned to variables.",
		answer1: "commas",
		answer2: "curly brackets",
		answer3: "quotes",
		answer4: "parenthesis",
		correct: "answer3"
	},
	{
		number: 5,
		content: "A very useful tool used during development and debugging for printing content to the debugger is:",
		answer1: "JavaScript",
		answer2: "terminal/bash",
		answer3: "for loops",
		answer4: "console.log",
		correct: "answer4"
	}
]
var saveScoreContent = {}

var localScores = []

var i = 60
var interval
var currentQestion = "0"
var failed = false
var timer = document.getElementById("time-remaining")
var answerButtons = document.getElementsByClassName("answer-button")
var questionBox = document.getElementById("question")
var startButton = document.getElementById("start-button")
var saveScoreButton = document.getElementById("save-score-button")
var saveScoreText = document.getElementById("save-score-text")
var saveScoreContainer = document.getElementById("save-score-container")
var showHighScoreButton = document.getElementById("show-high-scores")
var highScoresListArea = document.getElementById("high-scores-list-area")
var timeRemainingContainer = document.getElementById("time-remaining-container")
var goBackButton = document.getElementById("go-back")
var failureMessage = "Sorry, you ran out of time! Press the start button to try again."
currentScore = 0
timer.innerText = 60

const quizTimer = function(){
	if(timer.innerText <= 0){
		failed = true
		endQuiz()
	}
	else{
		timer.innerText = i
		i--
	}
}

const showIntro = function (){
	i = 60
	currentQestion = "0"
	if(!timeRemainingContainer.hasAttribute("hidden")){
		timeRemainingContainer.setAttribute("hidden","")
	}

	if(!goBackButton.hasAttribute("hidden")){
		goBackButton.setAttribute("hidden","")
	}
	if(!highScoresListArea.hasAttribute("hidden")){
		highScoresListArea.setAttribute("hidden","")
	}
	if(showHighScoreButton.hasAttribute("hidden")){
		showHighScoreButton.removeAttribute("hidden")
	}
	questionBox.innerText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
	if(startButton.hasAttribute("hidden")){
		startButton.removeAttribute("hidden")
	}
}

const startQuiz = function (){
	interval = setInterval(quizTimer, 1000)

	timeRemainingContainer.removeAttribute("hidden")
	startButton.setAttribute("hidden", "")
	answerButtons[0].removeAttribute("hidden")
	answerButtons[1].removeAttribute("hidden")
	answerButtons[2].removeAttribute("hidden")
	answerButtons[3].removeAttribute("hidden")

	if(!saveScoreContainer.hasAttribute("hidden")){
		saveScoreContainer.setAttribute("hidden","")
	}
	if(!highScoresListArea.hasAttribute("hidden")){
		highScoresListArea.setAttribute("hidden","")
	}

	nextQuestion()
}

const nextQuestion = function (){

	if(currentQestion < questions.length){
	questionBox.innerText = questions[currentQestion].content
	answerButtons[0].setAttribute("value", questions[currentQestion].answer1)
	answerButtons[1].setAttribute("value", questions[currentQestion].answer2)
	answerButtons[2].setAttribute("value", questions[currentQestion].answer3)
	answerButtons[3].setAttribute("value", questions[currentQestion].answer4)
	}
	else{
		endQuiz()
	}
}

const endQuiz = function() {
	timeRemainingContainer.setAttribute("hidden","")
	clearInterval(interval)
	i = 60
	currentQestion = "0"

	answerButtons[0].setAttribute("hidden","")
	answerButtons[1].setAttribute("hidden","")
	answerButtons[2].setAttribute("hidden","")
	answerButtons[3].setAttribute("hidden","")

	if(failed == true){
		failed = false
		questionBox.innerText = failureMessage
		startButton.removeAttribute("hidden")
	}
	else{
		questionBox.innerText = "You scored: " + currentScore

		saveScoreContainer.removeAttribute("hidden")
	}
}

const answerQuestion = function(event) {
	if(questions[currentQestion].correct == event.srcElement.id){
		currentScore = currentScore + 10
	}
	else{ 
		console.log("incorrect")
		i = i - 10
	}
	currentQestion++
	nextQuestion()
}

const showHighScore = function() {
	clearInterval(interval)
	i = 60
	currentQestion = "0"

	if(!answerButtons[0].hasAttribute("hidden")){
		answerButtons[0].setAttribute("hidden","")
		answerButtons[1].setAttribute("hidden","")
		answerButtons[2].setAttribute("hidden","")
		answerButtons[3].setAttribute("hidden","")
	}
	if(!startButton.hasAttribute("hidden")){
		startButton.setAttribute("hidden","")
	}
	if(!saveScoreContainer.hasAttribute("hidden")){
		saveScoreContainer.setAttribute("hidden","")
	}

	timeRemainingContainer.setAttribute("hidden","")
	showHighScoreButton.setAttribute("hidden","")
	goBackButton.removeAttribute("hidden")
	highScoresListArea.removeAttribute("hidden")
	questionBox.innerText = "Current High Scores:"
	
	for(i = 0; i < localScores[0].length; i++){
		highScoresListArea.innerHTML += localScores[0][i].playerInitials + ": " + localScores[0][i].playerScore + "<br>"
		console.log("Loop: " + i)
	}
}

//TODO: need to write a loop to parse through data read from local storage
const getLocalScores = function(){
	if(localStorage.getItem("highScores")){
		var rawLocalScores = localStorage.getItem("highScores")
		localScores.push(JSON.parse(rawLocalScores))
		console.log(localScores)
	}
}

const saveScore = function (){
	if(saveScoreText.value == ''){
		alert("you must enter your initials!")
	}
	else{
		saveScoreContent.playerInitials = saveScoreText.value
		saveScoreContent.playerScore = currentScore

		localScores.push(saveScoreContent)
		
		var scoreAsString = JSON.stringify(localScores)

		console.log(scoreAsString)

		localStorage.setItem("highScores", scoreAsString)

		localScores = []
		getLocalScores()
		showHighScore()
	}
}

answerButtons[0].addEventListener("click", answerQuestion)
answerButtons[1].addEventListener("click", answerQuestion)
answerButtons[2].addEventListener("click", answerQuestion)
answerButtons[3].addEventListener("click", answerQuestion)
startButton.addEventListener("click", startQuiz)
saveScoreButton.addEventListener("click", saveScore)
showHighScoreButton.addEventListener("click", showHighScore)
goBackButton.addEventListener("click", showIntro)

getLocalScores()
showIntro()
