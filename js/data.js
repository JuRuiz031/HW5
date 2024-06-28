/*
Juan Fernando Ruiz
juan_ruiz@student.uml.edu
GUI1 HW5
*/
// Make JSON data usable by converting it into an array for each scrabble tile
const tilePieces = {
    "pieces": [
        {"letter":"A", "value":1, "amount":9},
        {"letter":"B", "value":3, "amount":2},
        {"letter":"C", "value":3, "amount":2},
        {"letter":"D", "value":2, "amount":4},
        {"letter":"E", "value":1, "amount":12},
        {"letter":"F", "value":4, "amount":2},
        {"letter":"G", "value":2, "amount":3},
        {"letter":"H", "value":4, "amount":2},
        {"letter":"I", "value":1, "amount":9},
        {"letter":"J", "value":8, "amount":1},
        {"letter":"K", "value":5, "amount":1},
        {"letter":"L", "value":1, "amount":4},
        {"letter":"M", "value":3, "amount":2},
        {"letter":"N", "value":1, "amount":5},
        {"letter":"O", "value":1, "amount":8},
        {"letter":"P", "value":3, "amount":2},
        {"letter":"Q", "value":10, "amount":1},
        {"letter":"R", "value":1, "amount":6},
        {"letter":"S", "value":1, "amount":4},
        {"letter":"T", "value":1, "amount":6},
        {"letter":"U", "value":1, "amount":4},
        {"letter":"V", "value":4, "amount":2},
        {"letter":"W", "value":4, "amount":2},
        {"letter":"X", "value":8, "amount":1},
        {"letter":"Y", "value":4, "amount":2},
        {"letter":"Z", "value":10, "amount":1}
    ],
    "creator": "Ramon Meza"
};

// Turn tileData into an array
const tileArray = []; // Empty array to be filled, then loop to populate the array
tilePieces.pieces.forEach(piece => {
    for (let i = 0; i < piece.amount; i++) {
        tileArray.push({ letter: piece.letter, value: piece.value });
    }
});
function getTile(letter) {
    return `tiles/Scrabble_Tile_${letter}.jpg`;
}
function randomizeTiles(count) {
    const tiles = [];
    for (let i = 0; i < count; i++) {
        const tile = tileArray[Math.floor(Math.random() * tileDistribution.length)];
        tiles.push(tile);
    }
    return tiles;
}