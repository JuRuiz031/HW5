/*
Juan Fernando Ruiz
juan_ruiz@student.uml.edu
GUI1 HW5

This assignment was very hard since I am learning JS and all aspects of Web Dev from scratch. I will say it is a bit much but it is a ton of fun and I do think that the visual aspect of being able to see most of my changes happen in real
time is a lot of fun and helps with things feeling more intuitive! With that being said, I do think that the program needs some work and it does not have any of the fany bells and whistles that I wish it did. It does I think work
well enough to fit the criteria but it is definitely something that I feel is very basic and there is still so much left for me to learn when it comes to 

Thank you so much for all the help this Summer 1 course and I hope you have a great short summer break! See you in GUI2 Summer 2!

Sources Used:
JSON data with the tile rack, I converted that data into a usable array for my game, but that file was something I used
W3 Schools tutorials on JSON, JS, etc.
Lecture videos from class
BroCode
FreeCodeCamp
Documentation for jquery UI
*/

/*
Juan Fernando Ruiz
juan_ruiz@student.uml.edu
GUI1 HW5
*/

$(document).ready(function() {

    // Initialize the game
    function initializeGame() {
        initializeBoard();
        initializeRack();
        setupEventListeners();
    }

    // Initialize the game board
    function initializeBoard() {
        $('#board').empty();
        for (let i = 0; i < 15; i++) {
            const square = $('<div></div>').addClass('board-square').data('index', i).css({ left: `${i * 50}px` });
            $('#board').append(square);
        }
        makeBoardSquaresDroppable();
    }

    // Make board squares droppable
    function makeBoardSquaresDroppable() {
        $('.board-square').droppable({
            accept: ".tile",
            drop: handleTileDrop
        });
    }

    // Handle tile drop event
    function handleTileDrop(event, ui) {
        const index = $(this).data('index');
        if ($(this).data('tile')) {
            ui.draggable.draggable('option', 'revert', true);
        } else if (isTilePlacementValid(index)) {
            const tile = ui.helper.data('tile');
            const tileImage = $('<img>').attr('src', getTileImagePath(tile.letter)).addClass('tile-img');
            $(this).append(tileImage).data('tile', tile);
            ui.helper.remove();
            calculateScore();
        } else {
            ui.draggable.draggable('option', 'revert', true);
        }
    }

    // Check if tile placement is valid
    function isTilePlacementValid(index) {
        const firstTilePlaced = $('.board-square').filter(function() {
            return $(this).data('tile') !== undefined;
        }).length === 0;
        if (firstTilePlaced) {
            return true;
        }
        const leftTile = index > 0 ? $('.board-square').eq(index - 1).data('tile') : undefined;
        const rightTile = index < 14 ? $('.board-square').eq(index + 1).data('tile') : undefined;
        return leftTile !== undefined || rightTile !== undefined;
    }

    // Initialize the tile rack
    function initializeRack() {
        const tiles = randomizeTiles(7);
        $('#rack').empty();
        tiles.forEach(tile => {
            const tileDiv = $('<div></div>').addClass('tile').data('tile', tile);
            const tileImg = $('<img>').attr('src', getTileImagePath(tile.letter)).addClass('tile-img');
            tileDiv.append(tileImg);
            $('#rack').append(tileDiv);
            makeTilesDraggable(tileDiv);
        });
    }

    // Make tiles draggable
    function makeTilesDraggable(tileDiv) {
        tileDiv.draggable({
            revert: "invalid"
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        $('#refresh-tiles').click(initializeRack);
        $('#reset').click(resetGame);
    }

    // Reset the game
    function resetGame() {
        initializeBoard();
        initializeRack();
        $('#score').text('Score: 0');
    }

    // Calculate the score
    function calculateScore() {
        let score = 0;
        let wordMultiplier = 1;
        const bonusSquares = {
            2: 'double-word',
            6: 'double-letter',
            8: 'double-letter',
            12: 'double-word'
        };

        $('.board-square').each(function() {
            const tile = $(this).data('tile');
            const index = $(this).data('index');
            if (tile) {
                if (bonusSquares[index]) {
                    if (bonusSquares[index] === 'double-letter') {
                        score += tile.value * 2;
                    } else if (bonusSquares[index] === 'double-word') {
                        score += tile.value;
                        wordMultiplier *= 2;
                    }
                } else {
                    score += tile.value;
                }
            }
        });
        score *= wordMultiplier;
        $('#score').text('Score: ' + score);
    }

    // Function to get the tile image path
    function getTileImagePath(letter) {
        return `tiles/Scrabble_Tile_${letter}.jpg`;
    }

    // Function to randomize tiles
    function randomizeTiles(count) {
        const tiles = [];
        for (let i = 0; i < count; i++) {
            const tile = tileArray[Math.floor(Math.random() * tileArray.length)];
            tiles.push(tile);
        }
        return tiles;
    }

    // Initialize the game on page load
    initializeGame();

});
