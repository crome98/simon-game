const textGameOver = "Game over, Press Any Key to Restart";
const audioGreen = new Audio("sounds/green.mp3");
const audioRed = new Audio("sounds/red.mp3");
const audioYellow = new Audio("sounds/yellow.mp3");
const audioBlue = new Audio("sounds/blue.mp3");
const wrong = new Audio("sounds/wrong.mp3");
const btn = {
  "green": audioGreen,
  "red": audioRed,
  "yellow": audioYellow,
  "blue": audioBlue
};

let inputLength = 0;
let level = 0;
let pattern = [];
let isGameOver = true;
let isInit = true;

let generateRandomColor = () => {
  return Object.keys(btn)[Math.floor(4 * Math.random())];
}

let reset = (textStatus) => {
  inputLength = 0;
  level = 0;
  pattern = [];
  isGameOver = false;
  updateStatus(textStatus);
}

let updateStatus = (gameStatus) => {
  $("h1").text(gameStatus);
}

$(document).on("keypress", function() {
  if (isGameOver) {
    // Initialize new game
    level++;
    // Reset
    reset(`Level ${level}`);
    // Randomly click a button and add its color to pattern
    let randomColor = generateRandomColor();
    let selector = `div.btn.${randomColor}`;
    $(selector).fadeOut(100).fadeIn(100);
    btn[`${randomColor}`].play();
    pattern.push(randomColor);
  }
});

$("div.btn").on("click", function () {
  $(this).fadeOut(100).fadeIn(100); // Simulating button click
  if ( isGameOver ) {
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    return;
  }
  btn[`${$(this).attr("id")}`].play();// Play sound if game can be continued
  inputLength++; // inputLength is used to determine which element in the pattern to be compared with the current user input
  if ( $(this).attr("id") !== pattern[Math.max(inputLength-1, 0)] ) { // Comparing the current input value with the last element of pattern
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    wrong.play();
    reset(textGameOver);
    isGameOver = true;
  } else {
    if ( inputLength === pattern.length ) { // User input matches the expected pattern
      inputLength = 0; // Reset user input
      let randomColor = generateRandomColor();
      let selector = `div.btn.${randomColor}`;
      setTimeout(() => {
        $(selector).fadeOut(100).fadeIn(100);
        btn[`${randomColor}`].play();
      }, 300)
      pattern.push(randomColor);
      level++;
      updateStatus(`Level ${level}`);
    }
  }
});
