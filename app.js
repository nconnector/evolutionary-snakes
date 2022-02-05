class App {
    constructor(turnsPerSecond, worldWidth, worldHeight) {
        this.delay = 1000 / turnsPerSecond;

        this.interface = {
            turn: document.querySelector("#turn-counter"),
            generation: document.querySelector("#generation-counter"),
            food: document.querySelector("#food-counter"),
            snakes: document.querySelector("#snakes-counter"),
        };
        const canvas = document.querySelector("#canvas");
        this.world = new World(canvas, worldWidth, worldHeight);
        this.start();

        this.onKeyDown("Escape", "Pause", () => {
            clearInterval(this.turnInterval);
        });
        this.onKeyDown("Enter", "Resume", () => {
            this.start();
        });
    }
    start() {
        this.turnInterval = setInterval(() => {
            this.displayData(this.world.nextTurn());
        }, this.delay);
    }
    onKeyDown(key, msg, callback) {
        document.addEventListener("keydown", (event) => {
            if (event.key === key) {
                console.log(msg);
                callback();
            }
        });
    }
    displayData(data) {
        // this.turnCounter.innerText = data?.turn;
        Object.keys(this.interface).forEach((key) => {
            this.interface[key].innerText = data[key];
        });
    }
}

const app = new App(1000, 200, 100);
