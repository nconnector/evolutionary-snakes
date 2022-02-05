class World {
    constructor(canvas, worldWidth, worldHeight) {
        this.initState();
        this.tileSize = 6;
        this.context2d = canvas.getContext("2d");
        canvas.width = this.tileSize * worldWidth;
        canvas.height = this.tileSize * worldHeight;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        this.map = Array(worldHeight)
            .fill()
            .map(() => Array(worldWidth).fill(this.TILES.empty));
        this.spawnWalls();

        // cache all empty tiles
        this.mapEmpty = this.getMapEmpty();
        this.drawAll();
    }
    get snakesAliveCount() {
        return this.snakes.length;
    }
    get foodCount() {
        let count = 0;
        this.map.forEach((row) => {
            row.forEach((tile) => {
                if (tile === this.TILES.food) {
                    count++;
                }
            });
        });
        return count;
    }
    drawAll() {
        const ctx = this.context2d;
        if (!ctx) {
            console.error("No context to draw");
        }
        this.map.forEach((row, y) => {
            row.forEach((id, x) => {
                this.drawOne(x, y, id);
            });
        });
    }
    drawOne(x, y, id) {
        const ctx = this.context2d;
        const posX = x * this.tileSize;
        const posY = y * this.tileSize;
        if (!id) {
            // TODO:: strokes (grid) as separate canvas
            ctx.strokeStyle = "lightgray";
            // outline the tile
            ctx.strokeRect(posX, posY, this.tileSize, this.tileSize);
        }
        // color the tile
        ctx.fillStyle = this.COLORS[id];
        // draw the tile
        ctx.fillRect(posX, posY, this.tileSize, this.tileSize);
    }
    getTileType(tileId) {
        return Object.keys(this.TILES).filter((el) => this.TILES[el] === tileId);
    }
    modifyTile(x, y, content) {
        const wasEmpty = this.map[y][x] === 0;
        const becameEmpty = content === 0;
        // if (!wasEmpty) console.log({ wasEmpty, becameEmpty, contentWas: this.map[y][x], content });
        this.map[y][x] = content;
        this.drawOne(x, y, content);
        if (wasEmpty) {
            this.mapEmpty = this.mapEmpty.filter((tile) => !(tile[0] === x && tile[1] === y));
        }
        if (becameEmpty) {
            this.mapEmpty.push([x, y]);
        }
    }
}
World.prototype.nextTurn = nextTurn;
World.prototype.newGeneration = newGeneration;
World.prototype.initState = initState;
World.prototype.spawnFood = spawnFood;
World.prototype.spawnSnake = spawnSnake;
World.prototype.spawnWalls = spawnWalls;
World.prototype.getRandomFromArray = getRandomFromArray;
World.prototype.getMapEmpty = getMapEmpty;
World.prototype.getEmptyRandomTile = getEmptyRandomTile;
World.prototype.getEmptyAdjacentTile = getEmptyAdjacentTile;
