import Player from "./player";

const HEIGHT = 850;
const WIDTH = 1200;
const START_LOCATION = { x: 0, y: 0 }
// const START_LOCATION = { x: 600, y: 840 }

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
        this.input = {
            a: false,
            d: false
        };
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

        document.addEventListener("keydown", event => {
            this.handleKey(event, true);
        });

        document.addEventListener("keyup", event => {
            this.handleKey(event, false);
        });

    };

    moveObjects(delta) {
        const movingObj = [].concat(this.player, this.balls);
        this.allObjects().forEach(obj => {
            object.move(delta);
        });
    };

    singleMove(delta) {
        this.moveObjects(delta);
    }

    handleKey(event, down) {
        let input = this.input;
        switch(event.keyCode) {
            case 65:
                if (input.a !== down ) {
                    input.a = down;
                }
                break;
            case 68:
                if (input.d !== down) {
                    input.d = down;
                }
                break;
            default:
                break;
        }

        this.input = input;
    }

    //add block function needed
    //add player function needed
}

// module.exports = Game;
export default Game;