class Snake {
    constructor(cells, brain) {
        this.visionDistance = 5;
        this.energyBase = 10;
        this.minLength = 4;
        this.maxLength = 15;
        this.eat();
        this.brain = brain ? brain : this.generateBrain(this.visionDistance);
        this.cells = cells;

        const directions = ["left", "right", "up", "down"];
        this.direction = directions[Math.floor(Math.random() * directions.length)];

        // energy=0 -> len-- ; energy = baseEnergy
        // food -> energy = baseEnergy
        // len=16 -> split
        // len=4 -> death
    }
    get head() {
        return this.cells[0];
    }
    get tail() {
        return this.cells[this.cells.length - 1];
    }
    generateBrain(visionDistance) {
        return; //brain;
    }
    move() {
        // using direction, fetch visible map
        // decide where to go
        // die if wall/snake
        // add new head
        // eat if food, else remove tail
        // "eat own tail" if out of energy
        // die if under length
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
    die() {}
}
