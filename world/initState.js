function initState() {
    console.log(`Setting state`);
    this.NEW_GENERATION_POPULATION_SIZE = 10;
    this.OFFSPRINGS_PER_CANDIDATE = 10;
    this.FOOD_CAP = 2500;
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
    this.generation = 0;
    this.snakes = [];
    this.deadSnakes = [];
    this.snakeCount = 0;
    this.elders = [];
}
