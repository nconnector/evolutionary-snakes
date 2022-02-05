function nextTurn() {
    this.turn++;
    const resp = {
        turn: this.turn,
    };
    this.snakes.forEach((snake) => snake.move());

    if (this.turn === 1) {
        this.spawnSnake(5);
    }

    return resp;
}
