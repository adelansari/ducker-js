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

function render() {
  placeDuck();
  drawGrid();
}

// anonymous function
const renderLoop = setInterval(function () {
  gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;
  render();
}, 600);

document.addEventListener("keyup", moveDuck);
