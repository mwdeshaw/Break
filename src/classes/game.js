// const Player = require("./player");
const HEIGHT = 850;
const WIDTH = 1200;
const START_LOCATION = { x: 600, y: 840 }


class Game {
    constructor(ctx) {
        this.player = new Player(START_LOCATION);
        this.lives = this.player.lives
        this.ctx = ctx;
        this.blocks = [];
        this.height = HEIGHT;
        this.width = WIDTH;
        this.themeColor = ["red", "blue", "green"];     //add a function to pick a theme color based on user input, or simply randomize it
        this.balls = [];
    };

    allObjects() {
        return [].concat(this.player, this.blocks, this.balls);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.themeColor[1];
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.allObjects().forEach(object => {
            object.draw(this.ctx);
        });
    };

    //add block function needed
    //add player function needed
}

module.exports = Game;