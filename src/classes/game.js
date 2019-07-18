import Player from "./player";
import Ball from './ball';

const HEIGHT = 850;
const WIDTH = 1200;
const PLAYER_START_LOCATION = { x: 600, y: 800 }
const BALL_START_LOCATION = { x: 600, y: 760 }
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
     
    allCurObjects() {
        return [].concat(this.player, this.blocks, this.balls[0]);
    };

    // allObjects() {
    //     return [].concat(this.player, this.blocks, this.balls);
    // };

    allCurMovingObj() {
        return [].concat(this.player, this.balls[0]);
    };

    // allMovingObj() {
    //     return [].concat(this.player, this.balls);
    // };

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.themeColor[1];
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.allCurObjects().forEach(obj => {
            obj.draw(this.ctx);
        });
    };

    moveObjects(delta) {
        const movingObj = this.allCurMovingObj();
        movingObj.forEach(obj => {
            obj.move(delta);
            if (obj instanceof Ball && obj.isOutOfBounds(obj.pos.y)) {
                this.remove(obj);
                this.player.deathAnimation(this.ctx);
            };
        });
    };

    singleMove(delta) {
        this.moveObjects(delta);
        this.checkForCollisions();
    };

    remove(obj) {
        if (obj instanceof Ball) {
            if (this.balls.length === 0) {
                return "Game Over"
            } else {
                this.balls.shift(); //returns the new balls array 
            }
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