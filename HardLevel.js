var buttonColors = ["red","blue","green","yellow","purple","orange","pink","brown"];
var gamePattern =[];
var userClickedPattern = [];
var randomChosenColor,randomNumber;
var started = false;
var level =0;
var highScore = localStorage.getItem('simonHighScoreHard') || 0;
highScore = parseInt(highScore); // Convert from string to number
$("#high-score").text("High Score: " + highScore);

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        newSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            if (level > highScore) {
                highScore = level;
                localStorage.setItem('simonHighScoreHard', highScore);
                $("#high-score").text("High Score: " + highScore);
            }
            setTimeout(function(){
                newSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over. Press any key to restart.");
        setTimeout(function(){
            $("body").removeClass("game-over");    
        },200);
        startOver();
    }
}

function newSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random() * buttonColors.length);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function startOver(){
    level =0;
    gamePattern = [];
    started = false;
}