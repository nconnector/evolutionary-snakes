function nextTurn() {
    this.turn++;

    const foodCount = this.foodCount;
    const foodToSpawn = 2000 - foodCount;
    for (let i = 0; i < foodToSpawn; i++) {
        this.spawnFood();
    }

    this.snakes.forEach((snake) => snake.move());

    if (this.snakesAliveCount <= this.POPULATION_MINIMUM) {
        this.newGeneration();
    }

    while (this.snakes.length < 20) {
        len = this.snakes.length;
        this.spawnSnake();
    }

    const resp = {
        generation: this.generation,
        turn: this.turn,
        snakes: this.snakesAliveCount,
        food: foodCount,
    };
    return resp;
}

function newGeneration() {
    this.generation++;
    const candidates = this.GENERATION_SIZE / 10;
}
