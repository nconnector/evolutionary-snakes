function nextTurn() {
    this.turn++;
    const resp = {
        turn: this.turn,
    };
    this.snakes.forEach((snake) => snake.move());

    while (this.snakes.length < 5) {
        len = this.snakes.length;
        console.log({ len });
        this.spawnSnake();
    }

    return resp;
}
