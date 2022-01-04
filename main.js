window.onload = function () {
    buildGrid();
    generateCells(2, 0);
};

// Function to generate the JS grid
let buildGrid = function () {
    var game = document.getElementsByClassName('game');
    var grid = document.getElementsByClassName('game-grid');
    var size = 4;
    var table = document.createElement('DIV')

    table.className += 'grid';
    table.id = ' ';
    table.dataset.value = 0;

    for (let i = 0; i < size; i++) {
        let tableRow = document.createElement('DIV');
        table.appendChild(tableRow);
        tableRow.id = 'table-row' + (i + 1);
        tableRow.className += 'grid-row';

        for (let j = 0; j < size; j++) {
            let tableCell = document.createElement('DIV');
            tableCell.id = '' + (i + 1) + (j + 1);
            tableCell.className += 'grid-cells';
            tableRow.appendChild(tableCell)
        }
        document.body.appendChild(table);
    }
    return table;
}


// Function to generate the cells
let generateCells = function (tileCount, time) {
    for (var i = 0; i < tileCount; i++) {
        var count = 0;

        for (var value = 1; value < 2; value++) {
            var random1 = Math.floor((Math.random() * 4) + 1);
            var random2 = Math.floor((Math.random() * 4) + 1);
            var checker = document.getElementById('' + random1 + random2);
            if (checker.innerHTML != '') {
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

        tile.data = '' + randomNum;
        tile.id = 'table-tile ' + random1 + random2
        location.className += ' active';
        var tileValue = tile.dataset.value;
        tile.dataset.value = '' + randomNum;

        // Creating the tile class in order to make changes to it
        if (time == 0) {
            tile.className = 'tile ' + randomNum;
        } else {
            setTimeout(function () {
                tile.className = 'tile ' + randomNum;
            }, 10);
        }
    }
}