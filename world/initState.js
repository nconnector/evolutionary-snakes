function initState() {
    console.log(`Setting state`);
    this.COLORS = {
        0: "white", // nothing
        1: "#3d8de0", // snake
        2: "green", // food
        9: "gray", // wall
    };
    this.TILES = {
        empty: 0,
        snake: 1,
        food: 2,
        wall: 9,
    };
    this.turn = 0;
    this.snakes = [];
    this.snakeCount = 0;
}
