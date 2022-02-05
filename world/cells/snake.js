class Snake {
    constructor(world, cells, brain) {
        this.world = world;
        console.warn(`creating snake# ${world.snakeCount + 1}`);
        this.id = world.snakeCount + 1;
        this.world.snakeCount++;
        this.visionDistance = 5;
        this.energyBase = 10;
        this.minLength = 4;
        this.maxLength = 15;
        this.eat();
        this.brain = brain ? brain : this.brainGenerateRandom(this.visionDistance);
        this.cells = cells;

        // const directions = ["left", "right", "up", "down"];
        // this.orientation = directions[Math.floor(Math.random() * directions.length)];
    }
    get head() {
        return this.cells[0];
    }
    get tail() {
        return this.cells[this.cells.length - 1];
    }
    get length() {
        return this.cells.length;
    }
    brainGenerateRandom() {
        const matrixSize = this.visionDistance * 2 + 1;
        const max = 100;
        const min = -max;
        const getRandom = () => Math.floor(Math.random() * (max - min + 1)) + min;

        // brain has [y][x] notation
        const brain = new Array(matrixSize).fill().map(() =>
            new Array(matrixSize).fill().map(() => {
                return {
                    food: [getRandom(), getRandom(), getRandom(), getRandom()],
                    block: [getRandom(), getRandom(), getRandom(), getRandom()],
                };
            })
        );
        return brain;
    }
    brainScan() {
        // get snake's field of view
        const distance = this.visionDistance;
        const matrixSize = distance * 2 + 1;
        const map = this.world.map;
        const xMin = this.head.x - distance;
        const yMin = this.head.y - distance;
        const yMax = map.length;
        const xMax = map[0].length;
        const FOV = new Array(matrixSize).fill().map(() => new Array(matrixSize).fill());
        FOV.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (x + xMin < 0 || y + yMin < 0 || x + xMin >= xMax || y + yMin >= yMax) {
                    FOV[y][x] = null;
                    return;
                }
                FOV[y][x] = map[y + yMin][x + xMin];
            });
        });
        return FOV;
    }
    brainDecideDirection() {
        const FOV = this.brainScan();
        const TILES = this.world.TILES;
        const sensorsActive = [];
        const sensorsAggregated = [0, 0, 0, 0]; // Up Right Down Left

        FOV.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === TILES.wall || cell === TILES.snake) {
                    sensorsActive.push(this.brain[y][x].block);
                }
                if (cell === TILES.food) {
                    sensorsActive.push(this.brain[y][x].food);
                }
            });
        });

        sensorsActive.forEach((sensor) => {
            sensor.forEach((weight, i) => {
                sensorsAggregated[i] += weight;
            });
        });

        // move opposite to last is illegal (inwards)
        let illegalSensor;
        const dx = this.head.x - this.cells[1].x;
        const dy = this.head.y - this.cells[1].y;
        if (dx === 1) illegalSensor = 3; // right illegal
        if (dx === -1) illegalSensor = 1; // left illegal
        if (dy === 1) illegalSensor = 0; // up illegal
        if (dy === -1) illegalSensor = 2; // down illegal
        sensorsAggregated[illegalSensor] = -101; // weight -101 is less than minimal

        switch (Math.max(...sensorsAggregated)) {
            case sensorsAggregated[0]:
                return "up";
            case sensorsAggregated[1]:
                return "right";
            case sensorsAggregated[2]:
                return "down";
            case sensorsAggregated[3]:
                return "left";
        }
    }
    getNewHead(direction) {
        let { x, y } = this.head;
        switch (direction) {
            case "left":
                x--;
                break;
            case "right":
                x++;
                break;
            case "up":
                y--;
                break;
            case "down":
                y++;
                break;
        }
        const tileId = this.world.map[y][x];
        return { x, y, tileId };
    }
    addNewHead(newHead) {
        this.cells.unshift(newHead);
        this.world.modifyTile(newHead.x, newHead.y, this.world.TILES.snake);
    }
    removeTail() {
        const tail = this.cells.pop();
        this.world.modifyTile(tail.x, tail.y, this.world.TILES.empty);
    }
    move() {
        const TILES = this.world.TILES;

        // decide which direction to go
        const direction = this.brainDecideDirection();

        const { x, y, tileId } = this.getNewHead(direction);
        const newHead = { x, y };
        // die if wall/snake
        if (tileId === TILES.snake || tileId === TILES.wall) {
            this.die(`collision: ${this.world.getTileType(tileId)}`);
            return;
        }
        // take 1 energy
        this.energy--;
        // add new head
        this.addNewHead(newHead);
        // eat if food, else remove tail
        if (tileId === TILES.food) {
            this.eat();
        } else {
            this.removeTail();
        }
        // "eat own tail" if out of energy
        if (this.energy <= 0) {
            this.removeTail();
            this.eat();
        }
        // die if under length
        if (this.length <= this.minLength) {
            this.die("starvation");
            return;
        }
    }
    eat() {
        this.energy = this.energyBase;
        // split if over length
    }
    split() {
        // chance = 25%, then random weight += randInt(-5, 5)
        // compute new head direction
        // remove 8 tail cells
        // generate new Snake
    }
    die(causeOfDeath) {
        console.log(`snake #${this.id} died of ${causeOfDeath}`);
        // remove from map
        this.cells.forEach((cell) => this.world.modifyTile(cell.x, cell.y, this.world.TILES.empty));
        // remove from world
        this.world.snakes = this.world.snakes.filter((snake) => snake.id !== this.id);
    }
}
