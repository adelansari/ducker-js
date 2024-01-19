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
const time = 15;

function drawGrid() {
  gridMatrix.innerHTML = "";

  // For each row in the gridMAtrix, we need to process what is going to be drawn / displayed on the screen
  gridMatrix.forEach(function (gridRow, gridRowIndex) {
    console.log(gridRowIndex, gridRow);

    gridRow.forEach(function (cellContent, cellContentIndex) {
      // console.log(cellContentIndex, cellContent)
      // Given the current grid row, create a cell for the grid in the game based on the cellContent
      const cellDiv = document.createElement("div");
      // <div class="cell"></div>
      cellDiv.classList.add("cell");

      // [1,2]
      if (riverRows.includes(gridRowIndex)) {
        cellDiv.classList.add("cell");
      } else if (roadRows.includes(gridRowIndex)) {
        cellDiv.classList.add("road");
        // '' --> "falsy"
      }

      if (cellContent) {
        cellDiv.classList.add(cellContent);
      }

      gridMatrix.appendChild(cellDiv);
    });
  });
}

drawGrid();
