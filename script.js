// Selectthe relevant elements from the HTML
const grid = document.querySelector(".grid");
const timer = document.querySelector(".timer");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainBtn = document.querySelector(".play-again");

// Nested Array
const gridMatrix = [
  ["", "", "", "", "", "", "", "", ""],
  ["river", "wood", "wood", "river", "wood", "river", "river", "river", "river"],
  ["river", "river", "river", "wood", "wood", "river", "wood", "wood", "river"],
  ["", "", "", "", "", "", "", "", ""],
  ["road", "bus", "road", "road", "road", "car", "road", "road", "road"],
  ["road", "road", "road", "car", "road", "road", "road", "road", "bus"],
  ["road", "road", "car", "road", "road", "road", "bus", "road", "road"],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
];

// Initialise variables that control the game "settings"
const victoryRow = 0;
const riverRows = [1, 2];
const roadRows = [4, 5, 6];
const duckPosition = { x: 4, y: 8 };
let contentBeforeDuck = "";
let time = 15;

function drawGrid() {
  grid.innerHTML = "";

  // For each row in the gridMAtrix, we need to process what is going to be drawn / displayed on the screen
  gridMatrix.forEach(function (gridRow, gridRowIndex) {
    gridRow.forEach(function (cellContent, cellContentIndex) {
      // console.log(cellContentIndex, cellContent)
      // Given the current grid row, create a cell for the grid in the game based on the cellContent
      const cellDiv = document.createElement("div");
      // <div class="cell"></div>
      cellDiv.classList.add("cell");

      // [1,2]
      if (riverRows.includes(gridRowIndex)) {
        cellDiv.classList.add("river");
      } else if (roadRows.includes(gridRowIndex)) {
        cellDiv.classList.add("road");
        // '' --> "falsy"
      }

      if (cellContent) {
        cellDiv.classList.add(cellContent);
      }

      grid.appendChild(cellDiv);
    });
  });
}

function placeDuck() {
  contentBeforeDuck = gridMatrix[duckPosition.y][duckPosition.x];
  gridMatrix[duckPosition.y][duckPosition.x] = "duck";
  // gridMatrix[8][4] = 'duck'
  // ['', '', '', 'duck', '','','','']
}

function moveDuck(event) {
  const key = event.key;
  console.log("key", key);
  console.log("contentBeforeDuck: ", contentBeforeDuck);
  gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;

  // arrows and "WASD"
  switch (key) {
    case "ArrowUp":
    case "w":
    case "W":
      if (duckPosition.y > 0) duckPosition.y--;
      break;
    case "ArrowDown":
    case "s":
    case "S":
      if (duckPosition.y < 8) duckPosition.y++;
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      if (duckPosition.x > 0) duckPosition.x--;
      break;
    case "ArrowRight":
    case "d":
    case "D":
      if (duckPosition.x < 8) duckPosition.x++;
      break;
  }
  render();
}

// Animation Functions
function moveRight(gridRowIndex) {
  // Get all of the cells in the current row
  const currentRow = gridMatrix[gridRowIndex];

  // Remove the last element...
  const lastElement = currentRow.pop();

  // And put it back to the beginning, i.e. index 0
  currentRow.unshift(lastElement);
}

function moveLeft(gridRowIndex) {
  const currentRow = gridMatrix[gridRowIndex];
  const firstElement = currentRow.shift();
  currentRow.push(firstElement);
}

function animateGame() {
  // Animate river:
  moveRight(1);
  moveLeft(2);

  // Animate road:
  moveRight(4);
  moveRight(5);
  moveRight(6);
}

// Game Win/Loss Logic
function endGame() {
  // Stop the countdown timer
  clearInterval(countdownLoop);
  // Stop the game loop
  clearInterval(renderLoop);

  // Stop the player from being able to control the duck
  document.removeEventListener("keyup", moveDuck);

  // Display the game over screen
  endGameScreen.classList.remove("hidden");
}

function countdown() {
  if (time !== 0) {
    time--;
    timer.innerText = time.toString().padStart(5, "0");
  }

  if (time === 0) {
    // end the game -- player has lost!
    endGame();
  }
}

// Rendering

function render() {
  placeDuck();
  drawGrid();
}

// anonymous function
const renderLoop = setInterval(function () {
  gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;
  animateGame();
  render();
}, 600);

const countdownLoop = setInterval(countdown, 1000);

document.addEventListener("keyup", moveDuck);
