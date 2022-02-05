function generateMap() {
    return;
}

// cache all empty tiles
function getMapEmpty() {
    return []
        .concat(
            ...this.map.map((row, y) => {
                return row.map((tile, x) => {
                    return { x, y, tile };
                });
            })
        )
        .filter((el) => el.tile === 0)
        .map((el) => [el.x, el.y]);
}

function getRandomFromArray(array) {
    const max = array.length;
    const i = Math.floor(Math.random() * max); // max exclusive
    return array[i];
}

function getEmptyRandomTile() {
    if (!this.mapEmpty.length) {
        console.warn("No empty tiles left!");
        return;
    }
    const coordinates = getRandomFromArray(this.mapEmpty);
    const [x, y] = coordinates;
    const content = this.map[y][x];
    return { x, y, content };
}

function getEmptyAdjacentTile(x, y, previousTiles) {
    const surroundings = [
        {
            x: x,
            y: y - 1,
        },
        {
            x: x,
            y: y + 1,
        },
        {
            x: x - 1,
            y: y,
        },
        {
            x: x + 1,
            y: y,
        },
    ]
        .filter((tile) => tile.x >= 0 && tile.y >= 0 && tile.x < this.worldWidth && tile.y < this.worldHeight && this.map[tile.y][tile.x] === 0)
        .filter((tile) => !previousTiles.some((prevTile) => prevTile.x === tile.x && prevTile.y === tile.y));
    if (!surroundings.length) {
        return;
    }
    return getRandomFromArray(surroundings);
}
