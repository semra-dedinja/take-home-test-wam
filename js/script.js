/*
* Whack-a-mole Script file
*/
var score = 0;

var timeLeft = 30;
var timeInterval;

var previousM;
var holes = document.getElementsByClassName("hole");
var molesLength = document.getElementsByClassName("mole").length;
var moles = document.getElementsByClassName("mole");

var buttonText = document.getElementById("startStopGame");
var timeText = document.getElementById("time");

/*
*	function randomMole: choose a mole to show up. 
*/
function randomMole(){
	const randomM = Math.floor(Math.random() * molesLength) + 1;
	var moleId = document.getElementById("m-" + randomM);
	if (randomM === previousM){
      	return this.randomMole(moleId);
	}
	previousM = randomM;
	return moleId;
}

/*
*	function randomHole: choose random hole for the mole to show. 
*/
function randomHole(){
	var minTime = 400;
	var maxTime = 1000;
	var time = Math.floor(Math.random() * (maxTime - minTime + 1) + minTime); 
	var mole = randomMole();
	
	mole.classList.add('up');
	 
	setTimeout(function(){ 
		mole.classList.remove("up");
	}, time);
}

/*
*	function hitMole: hit the mole. 
*/
function hitMole(){
	var mySound = new Audio("media/431019__camomano__stone-hit.mp3"); //had to use an MP3 sound, so it works for all browsers.
	mySound.play();
	score++;
	document.getElementById("score").innerHTML = score;
}

//added addEventListener so the 'hit' is registered
for (var i = 0; i < moles.length; i++) {
	moles[i].addEventListener('click', hitMole);
}

/*
*	function resetGame: resets game. 
*/
function resetGame(){
	clearInterval(timeInterval);
	
	score = 0;
	document.getElementById("score").innerHTML = score;
	
	timeLeft = 30;
	document.getElementById("time").innerHTML = timeLeft + " seconds remaining";
	
	buttonText.innerHTML = "Start game";
	buttonText.style.backgroundColor = "#008000";
	buttonText.style.borderColor = "#008000";
}

/*
*	function stopGame: stops the game on button click. 
*/
function stopGame(){
	clearInterval(timeInterval);
}

/*
* 	function startGame: games starts on button click. 
*/
function startGame() {
	timeInterval = setInterval(function() {
        timeText.innerHTML = timeLeft + " seconds remaining";
        timeLeft -= 1;

        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timeText.innerHTML = "Game finished!"
            buttonText.innerHTML = "Game finished!"
			buttonText.style.backgroundColor = "#008000";
			buttonText.style.borderColor = "#008000";
        } else {
            randomHole();     
        }
    }, 1000);

}

/*
* 	function startStopGame: checks which button should be active, start, resume or stop. 
*/
function startStopGame(){
	if(buttonText.innerHTML === "Start game" || buttonText.innerHTML === "Resume game"){
		startGame();
		buttonText.innerHTML = "Stop game";
		buttonText.style.backgroundColor = "#B22222";
		buttonText.style.borderColor = "#B22222";
	} else {
		stopGame();
		buttonText.innerHTML = "Resume game";
		buttonText.style.backgroundColor = "#008000";
		buttonText.style.borderColor = "#008000";
	}
}
	
