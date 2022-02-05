function spawn(lengthRequired, content, objectFactory, attemptCount = 0) {
    const maxAttempts = 3;
    let tiles = [];
    // const contentName = Object.keys(this.TILES).filter((tile) => this.TILES[tile] === content);

    // 1st cell
    let tile = this.getEmptyRandomTile();
    if (!tile) {
        console.log(`Cannot spawn "${content}"`);
        return null;
    }
    tiles.push(tile);

    // remaining adjacent cells
    while (tiles.length < lengthRequired) {
        tile = this.getEmptyAdjacentTile(tile.x, tile.y, tiles);
        if (!tile) {
            //break, start over
            attemptCount++;
            if (attemptCount > maxAttempts) {
                console.warn(`No adjacent after ${attemptCount}`);
                return null;
            }
            return this.spawn(lengthRequired, content, objectFactory, attemptCount);
        }
        tiles.push(tile);
    }
    if (!tiles) {
        console.warn(`Multi-tile spawn failed: "${content}"`);
        return null;
    }
    tiles.forEach((tile) => this.modifyTile(tile.x, tile.y, content));
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
