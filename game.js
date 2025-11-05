var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gameOn = false;


function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];

    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level "+level);
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


var numberOfButtons = $(".btn").length;
for (var i = 0; i<numberOfButtons; i++){
    $(".btn")[i].addEventListener("click", function(){
        var buttonid = this.id;
        pressColor(buttonid);
    })
};


document.addEventListener("keydown", function(event){
    var keyMap = {
        "e": "green",
        "r": "red",
        "d": "yellow",
        "f": "blue"
    };
   
    var color = keyMap[event.key.toLowerCase()];

    if (color && gameOn){
        pressColor(color);
    }
})

function pressColor(key){
    var userChosenColor = key;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
}

function playSound(color){
    switch(color){
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        default: console.log(color)    
        break;
    }
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    }, 100)
    
}

document.addEventListener("keydown", function(event){
     if (!gameOn){

         gameOn = true;
         $("#level-title").text("Level "+level);
         setTimeout(nextSequence, 1000); 
         
        }})

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
       
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(nextSequence, 1000);
           
        }
        
    }
    else{
        
        new Audio("sounds/wrong.mp3").play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over. Press any key to restart.");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameOn = false;
}