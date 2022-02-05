function spawn(world, lengthRequired, content, attemptCount = 0) {
    const maxAttempts = 3;
    let tiles = [];

    // 1st cell
    let tile = world.getEmptyRandomTile();
    if (!tile) {
        console.log(`Cannot spawn "${content}"`);
        return null;
    }
    tiles.push(tile);

    // remaining adjacent cells
    while (tiles.length < lengthRequired) {
        tile = world.getEmptyAdjacentTile(tile.x, tile.y, tiles);
        if (!tile) {
            //break, start over
            attemptCount++;
            if (attemptCount > maxAttempts) {
                console.warn(`No adjacent after ${attemptCount}`);
                return null;
            }
            return spawn(world, lengthRequired, content, attemptCount);
        }
        tiles.push(tile);
    }
    if (!tiles) {
        console.warn(`Multi-tile spawn failed: "${content}"`);
        return null;
    }
    tiles.forEach((tile) => world.modifyTile(tile.x, tile.y, content));
    return tiles;
}

function spawnWalls() {
    x0 = 0;
    x1 = this.worldWidth - 1;
    y0 = 0;
    y1 = this.worldHeight - 1;

    this.map.forEach((row, y) => {
        row.forEach((_, x) => {
            if (x === x0 || x === x1 || y === y0 || y === y1) {
                this.map[y][x] = this.TILES.wall;
            }
        });
    });
}

function spawnSnake(len = 8) {
    const cells = spawn(this, len, this.TILES.snake);
    if (!cells) {
        console.error(`Cannot spawn snake.`);
        return;
    }
    this.snakes.push(new Snake(this, cells));
}
