function nextTurn() {
    this.turn++;

    const foodCount = this.foodCount;
    const foodToSpawn = this.FOOD_CAP - foodCount;
    for (let i = 0; i < foodToSpawn; i++) {
        this.spawnFood();
    }

    this.snakes.forEach((snake) => snake.move());

    if (this.snakesAliveCount <= this.NEW_GENERATION_POPULATION_SIZE) {
        this.newGeneration();
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
    this.lastGenerationAvgAge = 0; //todo

    // generate new snakes during first turn
    if (!this.snakesAliveCount) {
        console.log("first generation spawn");
        const totalPopulation = this.NEW_GENERATION_POPULATION_SIZE * this.OFFSPRINGS_PER_CANDIDATE;
        for (let i = 0; i < totalPopulation; i++) {
            this.spawnSnake();
        }
        return;
    }

    // log age
    const topAge = this.snakes[0].age;
    console.log(`Top age: ${topAge}`);
    this.elders.push(topAge);

    // kill all snakes
    this.snakes.forEach((snake) => snake.die("generation change"));

    // generate array of brains from N oldest dead snakes
    const oldestSnakes = this.deadSnakes
        .sort((a, b) => {
            return a.age - b.age;
        })
        .splice(0, this.NEW_GENERATION_POPULATION_SIZE);
    // empty dead snakes array
    this.deadSnakes = [];

    oldestSnakes.forEach((snake) => {
        for (let i = 0; i < this.OFFSPRINGS_PER_CANDIDATE; i++) {
            this.spawnSnake(snake.generateOffspringBrain(), snake.id);
        }
    });
}
