import Player from "./player";
import Ball from './ball';

const HEIGHT = 850;
const WIDTH = 1200;
const PLAYER_START_LOCATION = { x: 600, y: 800 }
const BALL_START_LOCATION = { x: 600, y: 890 }
const STARTING_BALLS = 3;

class Game {
    constructor(ctx) {
        this.player = new Player(PLAYER_START_LOCATION);
        this.lives = this.player.lives;
        this.ctx = ctx;
        this.blocks = [];
        this.height = HEIGHT;
        this.width = WIDTH;
        this.themeColor = ["red", "blue", "green"];     //add a function to pick a theme color based on user input, or simply randomize it
        this.balls = [];

        this.addBalls(STARTING_BALLS);
    };   

    addBalls(n) {
        for (let i = 0; i < n; i++) {
            this.balls.push(new Ball(BALL_START_LOCATION))
        }
    }
     
    allObjects() {
        return [].concat(this.player, this.blocks, this.balls);
    };

    allMovingObj() {
        return [].concat(this.player, this.balls);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.themeColor[1];
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.allObjects().forEach(obj => {
            obj.draw(this.ctx);
        });
    };

    moveObjects(delta) {
        const movingObj = this.allMovingObj();
        movingObj.forEach(obj => {
            obj.move(delta);
            if (obj instanceof Ball && obj.isOutOfBounds(obj.pos.y)) {
                this.remove(obj)
                    .then(this.player.deathAnimation(this.ctx))
            };
        });
    };

    singleMove(delta) {
        this.moveObjects(delta);
        this.checkForCollisions();
    };

    remove(obj) {
        if (obj instanceof Ball) {
            this.balls.splice(this.balls.indexOf(obj), 1);
        } else {
            throw new Error("Unknown Object, Please Address")
        };
    };

    checkForCollisions() {
        const allObj = this.allObjects;
        for (let i = 0; i < allObj.length; i++) {
            for (let j = 0; j < allObj.length; j ++) {
                const obj1 = allObj[i];
                const obj2 = allObj[j];
                if (obj1.isCollidedWith(obj2)) {
                    return obj1.collideWith(obj2);
                }
            }
        }
    }

}

export default Game;