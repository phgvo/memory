var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
var userChosenColor = $(this).attr("id");
userClickedPattern.push(userChosenColor);
console.log(userClickedPattern);
playSound(userChosenColor); // Må add input her fordi playsound defined input "name"
animatePress(userChosenColor); // Må add input her fordi animatePress defined input "color"
checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
       console.log("success");
       if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function () {
        nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrongasa");
      playSound("wrong");
      $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
          }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); //random 4 nr
  var randomChosenColor = buttonColors[randomNumber]; // add to 4 farger
  gamePattern.push(randomChosenColor); // add 1 random farger på en array (box)
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); // blinke lys farge på valgte farge.
//  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
//  audio.play(); OR
  playSound(randomChosenColor); // Må add input her fordi animatePress playsound defined input "name"
}                                // play sound function.

// For play sound ("name" no relate outside function, just inside)
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// For Animate Press "currentColor" no relate outside function, just inside)
function animatePress(color) {
$("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
