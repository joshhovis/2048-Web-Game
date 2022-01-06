window.onload = function () {
    buildGrid();
    generateCells(2, 0);
    tileDirection();
    score();
};


// Function to generate the JS grid //
function buildGrid() {
    var game = document.getElementsByClassName('game');
    var grid = document.getElementsByClassName('game-grid');
    var size = 4;
    var table = document.createElement('DIV')

    table.className += 'game-grid';
    table.id = ' ';
    table.dataset.value = 0;

    for (var i = 0; i < size; i++) {
        var tableRow = document.createElement('DIV');
        table.appendChild(tableRow);
        tableRow.id = 'table_row' + (i + 1);
        tableRow.className += 'grid-row';

        for (var j = 0; j < size; j++) {
            var tableCell = document.createElement('DIV');
            tableCell.id = '' + (i + 1) + (j + 1);
            tableCell.className += 'grid-cells';
            tableRow.appendChild(tableCell)
        }
        document.body.appendChild(table);
    }
    return table;
}


// Function to generate the cells //
function generateCells(tileCount, timeOut) {
    for (var i = 0; i < tileCount; i++) {

        for (var value = 1; value < 2; value++) {
            var random1 = Math.floor((Math.random() * 4) + 1);
            var random2 = Math.floor((Math.random() * 4) + 1);
            var check = document.getElementById('' + random1 + random2);
            if (check.innerHTML != '') {
                value = 0;
            }
        }

        var randomNum = Math.floor((Math.random() * 4) + 1);
        if (randomNum == 1) { randomNum = 2 };
        if (randomNum == 3) { randomNum = 4 };
        var location = document.getElementById('' + random1 + random2);
        var tile = document.createElement('DIV');
        location.appendChild(tile)

        // Gives the tile a value of 2 or 4
        tile.innerHTML = '' + randomNum;

        tileColors(randomNum, tile);
        tile.data = '' + randomNum;
        tile.id = 'table_tile' + random1 + random2
        location.className += ' active';
        tile.dataset.value = '' + randomNum;

        // Creating the tile class in order to make changes to it
        if (timeOut == 0) {
            tile.className = 'tile ' + randomNum;
        } else {
            setTimeout(function () {
                tile.className = 'tile ' + randomNum;
            }, 10);
        }
    }
}


// Tile Direction with arrow keys //
document.addEventListener('keydown', tileDirection);

function tileDirection(evt) {
    evt = evt || window.event;
    // UP Arrow Key
    if (evt.keyCode == '38') {
        var count = 2;
        for (var i = 2; i > 1; i--) {
            for (var j = 1; j < 5; j++) {
                tileMovement(i, j, -1, 0, 1, 0);
            }
            if (i == 2) {
                i += count;
                count++;
            }
            if (count > 4) { break; }
        }
        resetCells();
    }

    // DOWN Arrow Key
    else if (evt.keyCode == '40') {
        var count = -2;
        for (var i = 3; i < 4; i++) {
            for (var j = 1; j < 5; j++) {
                tileMovement(i, j, 1, 0, 4, 0);
            }
            if (i == 3) {
                i += count;
                count--;
            }
            if (count < -4) { break; }
        }
        resetCells();
    }

    // LEFT Arrow Key
    else if (evt.keyCode == '37') {
        var count = 2;
        for (var i = 2; i > 1; i--) {
            for (var j = 1; j < 5; j++) {
                tileMovement(j, i, 0, -1, 0, 1);
            }
            if (i == 2) {
                i += count;
                count++;
            }
            if (count > 4) { break; }
        }
        resetCells();
    }

    // Right Arrow Key
    else if (evt.keyCode == '39') {
        var count = -2;
        for (var i = 3; i < 4; i++) {
            for (var j = 1; j < 5; j++) {
                tileMovement(j, i, 0, 1, 0, 4);
            }
            if (i == 3) {
                i += count;
                count--;
            }
            if (count < -4) { break; }
        }
        resetCells();
    }
}


// Tile Movement //
function tileMovement(x, y, X, Y) {

    var tile = document.getElementById('table_tile' + x + y);
    this.check = document.getElementById('' + x + y);
    var xVar = x + X;
    var yVar = y + Y;

    // Checking the grid to be sure it's a 4x4 grid
    if (xVar > 0 && xVar < 5 && yVar > 0 && yVar < 5 && this.check.className == 'grid-cells active') {
        var around = document.getElementById('' + xVar + yVar);

        if (around.className == 'grid-cells active') {
            var aroundTile = document.getElementById('table_tile' + xVar + yVar);

            if (aroundTile.innerHTML == tile.innerHTML) {
                var value = tile.dataset.value * 2;
                aroundTile.dataset.value = '' + value;
                aroundTile.className = 'tile ' + value;
                aroundTile.innerHTML = '' + value;
                tileColors(value, aroundTile);
                this.check.removeChild(tile);
                this.check.className = 'grid-cells';
                around.className = 'grid-cells active merged';
                document.getElementsByClassName('game-grid').id = 'moved';
                document.getElementsByClassName('game-grid').className = 'game-grid ' + value;

                // Takes the sum of the merged tiles and adds that sum to the Score at the top of the page
                var gameGrid = document.getElementById(' ');
                var scoreVal = parseInt(gameGrid.dataset.value);
                var updatedScore = value + scoreVal;

                gameGrid.dataset.value = updatedScore;
                var score = document.getElementById('value');
                score.innerHTML = '' + updatedScore;
            }
        } else if (around.className == 'grid-cells') {
            around.appendChild(tile);
            around.className = 'grid-cells active';
            tile.id = 'table_tile' + xVar + yVar;
            this.check.className = 'grid-cells';
            document.getElementsByClassName('game-grid').id = 'moved';
        }
    }
}

// Placeholder value of 0 for the score when the game first starts
function score() {
    var gameGrid = document.getElementById(' ');
    var value = gameGrid.dataset.value;
    document.getElementById('value').innerHTML = '' + value;
}

function resetCells() {
    var count = 0;

    for (var i = 1; i < 5; i++) {
        for (var j = 1; j < 5; j++) {

            var cellResetter = document.getElementById('' + i + j);
            if (cellResetter.innerHTML != '') {
                count++;
            }

            if (cellResetter.innerHTML == '') {
                cellResetter.className = 'grid-cells';
            }

            if (cellResetter.className == 'grid-cells active merged') {
                cellResetter.className = 'grid-cells active';
            }
        }
    }
    if (count == 16) {
        var gStatus = document.getElementById('lose');
        gStatus.style.opacity = '1';

        var restartBtn = document.getElementById('restart');
        restartBtn.style.opacity = '1';

        // reloadPage();

    } else if (document.getElementsByClassName('game-grid').id == 'moved') {
        generateCells(1, 1);
    }
}

// Temp solution to restart the game after losing, will be replaced with restart button
function reloadPage() {
    setTimeout(function () {
        location.reload();
    }, 2500);
}

// Styling for all of the different tiles
function tileColors(value, tile) {
    switch (value) {
        case 2: tile.style.background = '#E1F5FE'; tile.style.color = 'black'; break;
        case 4: tile.style.background = '#B3E5FC'; tile.style.color = 'black'; break;
        case 8: tile.style.background = '#81D5FA'; tile.style.color = 'black'; break;
        case 16: tile.style.background = '#4FC2F8'; tile.style.color = 'white'; break;
        case 32: tile.style.background = '#03a9f5'; tile.style.color = 'white'; break;
        case 64: tile.style.background = '#0288d1'; tile.style.color = 'white'; break;
        case 128: tile.style.background = '#00579c'; tile.style.color = 'white';
            tile.style.fontSize = '50px'; break;
        case 256: tile.style.background = '#e0c3fc'; tile.style.color = 'black';
            tile.style.fontSize = '50px'; break;
        case 512: tile.style.background = '#dab6fc'; tile.style.color = 'black';
            tile.style.fontSize = '50px'; break;
        case 1024: tile.style.background = '#bbadff'; tile.style.color = 'white';
            tile.style.fontSize = '40px'; break;
        case 2048: tile.style.background = '#9b93fc'; tile.style.color = 'white';
            tile.style.fontSize = '40px'; break;
        case 4096: tile.style.background = '#8e6bf2'; tile.style.color = 'white';
            tile.style.fontSize = '40px'; break;
    }
}