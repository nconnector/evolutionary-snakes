function nextTurn() {
    this.turn++;

    const foodToSpawn = 2000 - this.foodCount;
    for (let i = 0; i < foodToSpawn; i++) {
        this.spawnFood();
    }

    this.snakes.forEach((snake) => snake.move());

    while (this.snakes.length < 20) {
        len = this.snakes.length;
        this.spawnSnake();
    }

    const resp = {
        turn: this.turn,
    };
    return resp;
}
