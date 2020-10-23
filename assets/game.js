const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start");
const questionEl = document.getElementById("question-item");
const answerHolderEl = document.getElementById("answer-choices-shown");
const showscoresBtn = document.getElementById("showscores");
const highscoresDiv = document.getElementById("highscores");
const userscoreEl = document.getElementById("userscore");
const gameDiv = document.getElementById("game");
const gamescore = document.getElementById("myscore");
const addscoreBtn = document.getElementById("addscore");
const initialsInput = document.getElementById("initials");
let timeLeft = 60;
let questionCounter = 0;
let playerScore = 0;

//array that, at each index (position), holds an object that holds the information for a question
const questionObjectArray = [{
    name: "What makes the sky blue?",
    answers: ["A. sun reflecting off ocean", "B. pollution", "C. global warming", "D. birds"],
    key: 0


},
{
    name: "question insert 2",
    answers: ["A. wrong", "B. right", "C. wrong", "D. wrong"],
    key: 1
},
{
    name: "question insert 3",
    answers: ["A. wrong", "B. wrong", "C. right", "D. wrong"],
    key: 2
},
{
    name: "question insert 4",
    answers: ["A. wrong", "B. wrong", "C. wrong", "D. right"],
    key: 3
},
{
    name: "question insert 5",
    answers: ["True", "False"],
    key: 0
}]


//function to start quiz once the start button is clicked
function startQuiz() {

    //hides start button 
    startBtn.style.visibility = "hidden";

    //function for timer
    countdown();

    //made function to create questions and answer choices on screen 
    runQuestions();
}

function countdown() {
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.innerHTML = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            endGame();
        }

    }, 1000);
}

//function to put questions on screen
function runQuestions() {


    //create element to hold question then create 
    // let questionHolderEl = document.getElementById("question-item");
    let questionShown = document.createElement("div");


    //create element to hold answer choice and create unordered list to prepare to add answer choice list elements
    let answersShown = document.createElement("ul");


    //Append holder for answers we create to the div element 'answer-choices-shown' that is by default in the html file
    answerHolderEl.appendChild(answersShown);
    
    let question = questionObjectArray[questionCounter]

    //grab question info and place object.name into div element
    questionShown.innerHTML = "<h3> " + question.name + "</h3>";
    questionEl.appendChild(questionShown);


    //add the answer choices from the array of objects
    for (let i = 0; i < question.answers.length; i++) {
        //create list-item (answer choice)
        let answerChoice = document.createElement("li");
        answerChoice.textContent = question.answers[i];

        //add property of being the correct answer
        if (i === question.key) {
            answerChoice.setAttribute("correct-answer", "true");
            //the above gives the li an attribute "correct-answer" and sets equal to "true"
            console.log(answerChoice);
        }
        //create event listener for each answer choice 
        answerChoice.addEventListener("click", nextQuestion);

        //append list item to ul
        answersShown.appendChild(answerChoice);

    }


}

//function to move to next question when click event occurs on answer choice list element
function nextQuestion(event) {
    //if question counter has not reached the maximum number then move to next question
    if (questionCounter < questionObjectArray.length - 1) {

        //element holding child elements involving all question info.
        // let questionDataEl = document.getElementById("question-item");

        //element holding child elements involving all answer choice info.
        // let answerDataEl = document.getElementById("answer-choices-shown");

        //increase question counter
        questionCounter++;

        //add to player score if correct answer is clicked
        if (event.target.getAttribute("correct-answer") === "true") {
            playerScore += 5;
        }

        else {
            timeLeft -= 10;
        }

        //make the elements holding question/answer info. blank so that the runquestions function can add new elements with the new question's information
        questionEl.innerHTML = '';
        answerHolderEl.innerHTML = '';
        runQuestions();
    }

    //go to endgame function to end the game 
    else {
        endGame();
    }

}


//create function to end the game by blanking page content (main tag with page-content class in html)
function endGame() {
    //clear screen
    gameDiv.style.display = "none";
    gamescore.innerHTML = playerScore;
    userscoreEl.style.display = "block";
}
function addscoreFn() {
    if (initialsInput.value === "") {
        return;
    }
    let initials = initialsInput.value;
    let oldScore = scoreData[initials]

    if (oldScore) {
        // scoreData[initials] = (oldScore < playerScore) ? playerScore : oldScore;
        
    // check if there is initials that are the same as what you just entered
        
       oldScore >= playerScore  //if old score is higher than player score do nothing. 
    
       else {
           //if playerscore is higher than  oldscore, update oldscore in local storage//

       }
    }
    else {
        scoreData[initials] = playerScore;
    }
    localStorage.setItem("QuizScores", JSON.stringify(scoreData))
    highscoresDiv.style.display = "none"
    gameDiv.style.display = "block";
    userscoreEl.style.display = "none";
    countdown();
    nextQuestion();
}

//make function to create elements for the player's score and other info.
function finalScoreInfo() {
    let finalScoreEl = document.createElement("li")

    finalScoreEl.textContent = playerScore;

}
function showScores() {
    highscoresDiv.innerHTML = "";
    let scoreReport = "&nbsp;&nbsp;";
    highscoresDiv.style.display = "block";
    for (let key in scoreData) {
        scoreReport += key + ": " + scoreData[key] + "&nbsp;&nbsp;"
    }
    highscoresDiv.innerHTML = scoreReport

}


// create local storage to hold score values if it's not here already.
let scoreData = localStorage.getItem("QuizScores")
if (scoreData === null) {
    localStorage.setItem("QuizScores", "{}")
    scoreData = "{}"
}
console.log(scoreData)
scoreData = JSON.parse(scoreData)

showscoresBtn.addEventListener("click", showScores);

//event listener for clicking start button
startBtn.addEventListener("click", startQuiz);

//event listener for add score button

addscoreBtn.addEventListener("click", addscoreFn)
