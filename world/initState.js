function initState() {
    console.log(`Setting state`);
    this.COLORS = {
        0: "white", // nothing
        1: "#3d8de0", // cell
        2: "green", // food
        9: "gray", // wall
    };
    this.TILES = {
        empty: 0,
        cell: 1,
        food: 2,
        wall: 9,
    };
    this.turn = 0;
}
