let inputLength = 0;
let pattern = [];
let isGameOver = true;
let isInit = true;
let level = 0;

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

let generateRandomColor = () => {
  return Object.keys(btn)[Math.floor(4 * Math.random())];
}

let resetGame = () => {
  input = [];
  pattern = [];
  level = 0;
  isGameOver = false;
  updateStatus("Game over, Press Any Key to Restart");
}

let compareResult = (userInput, expectedPattern) => {
  return JSON.stringify(userInput) === JSON.stringify(expectedPattern);
}

let updateStatus = (gameStatus) => {
  $("h1").text(gameStatus);
}

$(document).on("keypress", function() {
  if (isGameOver) {
    // Reset the game
    resetGame();
    // Initialize new game
    level++;
    $("h1").text(`Level ${level}`);
    // Randomly click a button
    let randomColor = generateRandomColor();
    pattern.push(randomColor);
    let selector = `div.btn.${randomColor}`;
    $(selector).fadeOut(100).fadeIn(100);
    btn[`${randomColor}`].play();
  }
});

$("div.btn").on("click", function () {
  if (isGameOver) {
    $(this).fadeOut(100).fadeIn(100);
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    return;
  }

  // If the game is not over => Simulating the button click
  $(this).fadeOut(100).fadeIn(100);
  // Play button sound
  btn[`${$(this).attr("id")}`].play();

  console.log(pattern);
  console.log(inputLength);
  console.log($(this).attr("id"));
  inputLength++;
  if ($(this).attr("id") !== pattern[Math.max(inputLength-1, 0)]) {
    isGameOver = true;
    wrong.play();
    resetGame();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
  } else {
    if (inputLength === pattern.length) { // User input matches the expected pattern
      inputLength = 0; // Reset user input
      let randomColor = generateRandomColor();
      pattern.push(randomColor);
      let selector = `div.btn.${randomColor}`;
      setTimeout(() => {
        $(selector).fadeOut(100).fadeIn(100);
        btn[`${randomColor}`].play();
      }, 300)
      level++;
      updateStatus(`Level ${level}`);
    }
  }
});
