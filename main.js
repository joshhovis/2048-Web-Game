window.onload = function () {
  buildGrid();
  generateCells(2, 0);
  tileDirection();
  updateScore();
  updateBestScore();
};

// Function to generate the JS grid //
function buildGrid() {
  var game = document.getElementsByClassName("game");
  var grid = document.getElementsByClassName("game-grid");
  var size = 4;
  var table = document.createElement("DIV");

  table.className += "game-grid";
  table.id = " ";
  table.dataset.value = 0;

  for (var i = 0; i < size; i++) {
    var tableRow = document.createElement("DIV");
    table.appendChild(tableRow);
    tableRow.id = "table_row" + (i + 1);
    tableRow.className += "grid-row";

    for (var j = 0; j < size; j++) {
      var tableCell = document.createElement("DIV");
      tableCell.id = "" + (i + 1) + (j + 1);
      tableCell.className += "grid-cells";
      tableRow.appendChild(tableCell);
    }
    document.body.appendChild(table);
  }
  return table;
}

// Function to generate the cells //
function generateCells(tileCount, timeOut) {
  for (var i = 0; i < tileCount; i++) {
    for (var value = 1; value < 2; value++) {
      var random1 = Math.floor(Math.random() * 4 + 1);
      var random2 = Math.floor(Math.random() * 4 + 1);
      var check = document.getElementById("" + random1 + random2);
      if (check.innerHTML != "") {
        value = 0;
      }
    }

    var randomNum = Math.floor(Math.random() * 4 + 1);
    if (randomNum == 1) {
      randomNum = 2;
    }
    if (randomNum == 3) {
      randomNum = 4;
    }
    var location = document.getElementById("" + random1 + random2);
    var tile = document.createElement("DIV");
    location.appendChild(tile);

    // Gives the tile a value of 2 or 4
    tile.innerHTML = "" + randomNum;

    tileColors(randomNum, tile);
    tile.data = "" + randomNum;
    tile.id = "table_tile" + random1 + random2;
    location.className += " active";
    tile.dataset.value = "" + randomNum;

    // Creating the tile class in order to make changes to it
    if (timeOut == 0) {
      tile.className = "tile " + randomNum;
    } else {
      setTimeout(function () {
        tile.className = "tile " + randomNum;
      }, 10);
    }
  }
}

// Tile Direction with arrow keys //
document.addEventListener("keydown", tileDirection);

function tileDirection(evt) {
  evt = evt || window.event;
  // UP Arrow Key
  if (evt.keyCode == "38") {
    var count = 2;
    for (var i = 2; i > 1; i--) {
      for (var j = 1; j < 5; j++) {
        tileMovement(i, j, -1, 0, 1, 0);
      }
      if (i == 2) {
        i += count;
        count++;
      }
      if (count > 4) {
        break;
      }
    }
    resetCells();
  }

  // DOWN Arrow Key
  else if (evt.keyCode == "40") {
    var count = -2;
    for (var i = 3; i < 4; i++) {
      for (var j = 1; j < 5; j++) {
        tileMovement(i, j, 1, 0, 4, 0);
      }
      if (i == 3) {
        i += count;
        count--;
      }
      if (count < -4) {
        break;
      }
    }
    resetCells();
  }

  // LEFT Arrow Key
  else if (evt.keyCode == "37") {
    var count = 2;
    for (var i = 2; i > 1; i--) {
      for (var j = 1; j < 5; j++) {
        tileMovement(j, i, 0, -1, 0, 1);
      }
      if (i == 2) {
        i += count;
        count++;
      }
      if (count > 4) {
        break;
      }
    }
    resetCells();
  }

  // Right Arrow Key
  else if (evt.keyCode == "39") {
    var count = -2;
    for (var i = 3; i < 4; i++) {
      for (var j = 1; j < 5; j++) {
        tileMovement(j, i, 0, 1, 0, 4);
      }
      if (i == 3) {
        i += count;
        count--;
      }
      if (count < -4) {
        break;
      }
    }
    resetCells();
  }
}

// Tile Movement //
function tileMovement(x, y, X, Y) {
  var tile = document.getElementById("table_tile" + x + y);
  this.check = document.getElementById("" + x + y);
  var xVar = x + X;
  var yVar = y + Y;

  // Checking the grid to be sure it's a 4x4 grid
  if (
    xVar > 0 &&
    xVar < 5 &&
    yVar > 0 &&
    yVar < 5 &&
    this.check.className == "grid-cells active"
  ) {
    var around = document.getElementById("" + xVar + yVar);

    if (around.className == "grid-cells active") {
      var aroundTile = document.getElementById("table_tile" + xVar + yVar);

      if (aroundTile.innerHTML == tile.innerHTML) {
        var value = tile.dataset.value * 2;
        aroundTile.dataset.value = "" + value;
        aroundTile.className = "tile " + value;
        aroundTile.innerHTML = "" + value;
        tileColors(value, aroundTile);
        this.check.removeChild(tile);
        this.check.className = "grid-cells";
        around.className = "grid-cells active merged";
        document.getElementsByClassName("game-grid").id = "moved";
        document.getElementsByClassName("game-grid").className =
          "game-grid " + value;

        // Takes the sum of the merged tiles and adds that sum to the Score at the top of the page
        var gameGrid = document.getElementById(" ");
        var scoreVal = parseInt(gameGrid.dataset.value);
        var updatedScore = value + scoreVal;

        gameGrid.dataset.value = updatedScore;
        var score = document.getElementById("value");
        score.innerHTML = "" + updatedScore;

        var best = document.getElementById(" ");
        var bestVal = parseInt(best.dataset.value);
        var updatedBest = bestVal;
        best.dataset.value = updatedBest;
        var bestScore = document.getElementById("best");
        bestScore.innerHTML = "" + updatedBest;

        updateBestScore();
      }
    } else if (around.className == "grid-cells") {
      around.appendChild(tile);
      around.className = "grid-cells active";
      tile.id = "table_tile" + xVar + yVar;
      this.check.className = "grid-cells";
      document.getElementsByClassName("game-grid").id = "moved";
    }
  }
}

function resetCells() {
  let count = 0;
  
  for (let i = 1; i < 5; i++) {
    for (let j = 1; j < 5; j++) {
      const cell = document.getElementById(`${i}${j}`);

      if (cell.innerHTML != "") {
        count++;
      } else {
        cell.className = "grid-cells"
      }
      
      if (cell.className == "grid-cells active merged") cell.className = "grid-cells active";
    }
  }

  if (count == 16) {
    document.getElementById("lose").style.opacity = "1";
    document.getElementById("restart").style.opacity = "1";
  } else if (document.getElementsByClassName("game-grid").id == "moved") {
    generateCells(1, 1);
  }
}

function updateScore(additionalScore = 0) {
  const gameGrid = document.querySelector(".game-grid");
  let scoreVal = parseInt(gameGrid.dataset.value) || 0;
  scoreVal += additionalScore;
  gameGrid.dataset.value = scoreVal;

  document.getElementById("value").innerHTML = scoreVal;
  updateBestScore();
}

function updateBestScore() {
  const gameGrid = document.querySelector(".game-grid");
  let scoreVal = parseInt(gameGrid.dataset.value) || 0;
  let bestScore = localStorage.getItem("highScore") || 0;

  if (scoreVal > bestScore) {
    localStorage.setItem("highScore", scoreVal);
    bestScore = scoreVal;
  }

  document.getElementById("best").innerHTML = bestScore;
}

// Styling for all of the different tiles
function tileColors(value, tile) {
  const colors = {
    2: { background: "#E1F5FE", color: "black" },
    4: { background: "#B3E5FC", color: "black" },
    8: { background: "#81D5FA", color: "black" },
    16: { background: "#4FC2F8", color: "white" },
    32: { background: "#03a9f5", color: "white" },
    64: { background: "#0288d1", color: "white" },
    128: { background: "#00579c", color: "white", fontSize: "50px" },
    256: { background: "#e0c3fc", color: "black", fontSize: "50px" },
    512: { background: "#dab6fc", color: "black", fontSize: "50px" },
    1024: { background: "#bbadff", color: "white", fontSize: "40px" },
    2048: { background: "#9b93fc", color: "white", fontSize: "40px" },
    4096: { background: "#8e6bf2", color: "white", fontSize: "40px" }
  };

  const tileStyle = colors[value];
  tile.style.background = tileStyle.background;
  tile.style.color = tileStyle.color;
  if (tileStyle.fontSize) {
    tile.style.fontSize = tileStyle.fontSize;
  }
}

// Restart the game
function restart() {
  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 4; j++) {
      const cell = document.getElementById(`${i}${j}`);
      while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
      }
      cell.className = "grid-cells";
    }
  }
  document.querySelector(".game-grid").dataset.value = 0;
  updateScore();
  generateCells(2, 0);
  document.getElementById("lose").style.opacity = "0";
  document.getElementById("restart").style.opacity = "0";
}

document.getElementById("restartIcon").addEventListener("click", restart);
document.getElementById("restart").addEventListener("click", restart);
