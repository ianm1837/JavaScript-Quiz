//create array of objects with questions
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
var i = 60
var currentQestion = "0"
var answerButtons = document.getElementsByClassName("answer-button")
var questionBox = document.getElementById("question")
var startButton = document.getElementById("start-button")

//create timer using setInterval()



const quizTimer = function(){
	
	document.getElementById("time-remaining").innerText = i
	i--
	
}

const startQuiz = function (){
	setInterval(quizTimer, 1000)

	startButton.setAttribute("hidden", "")
	answerButtons[0].removeAttribute("hidden")
	answerButtons[1].removeAttribute("hidden")
	answerButtons[2].removeAttribute("hidden")
	answerButtons[3].removeAttribute("hidden")

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
	
	answerButtons[0].setAttribute("hidden","")
	answerButtons[1].setAttribute("hidden","")
	answerButtons[2].setAttribute("hidden","")
	answerButtons[3].setAttribute("hidden","")
}

const answerQuestion = function(event) {
	if(questions[currentQestion].correct == event.srcElement.id){
		console.log("correct")
	}
	else{ 
		console.log("incorrect")
	}
	currentQestion++
	nextQuestion()
}

answerButtons[0].addEventListener("click", answerQuestion)
answerButtons[1].addEventListener("click", answerQuestion)
answerButtons[2].addEventListener("click", answerQuestion)
answerButtons[3].addEventListener("click", answerQuestion)
startButton.addEventListener("click", startQuiz)
