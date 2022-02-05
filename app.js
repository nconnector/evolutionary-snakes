class App {
    constructor(turnsPerSecond, worldWidth, worldHeight) {
        this.delay = 1000 / turnsPerSecond;

        this.turnCounter = document.querySelector("#turn-counter");
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
        this.turnCounter.innerText = data?.turn;
    }
}

const app = new App(50, 200, 100);
