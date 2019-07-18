import Player from "./player";
import Ball from './ball';

const HEIGHT = 850;
const WIDTH = 1200;
const PLAYER_START_LOCATION = { x: 600, y: 800 }
const BALL_START_LOCATION = { x: 645, y: 778 }
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
        return [].concat(this.player, this.balls[0], this.blocks);
    };

    // allObjects() {
    //     return [].concat(this.player, this.blocks, this.balls);
    // };

    allCurMovingObjs() {
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
        const movingObj = this.allCurMovingObjs();
        movingObj.forEach(obj => {
            obj.move(delta);
            if (obj instanceof Ball && this.isOutOfBounds(obj.pos.y)) {
                this.remove(obj);
                this.player.deathAnimation(this.ctx);
            };
        });
    };

    singleMove(delta) {
        this.moveObjects(delta);
        this.checkForCollisions();
        this.checkForWallCollisions();
    };

    isOutOfBounds(posY) {
        if (posY > (850 - this.player.radius)) {
            return true
        } else {
            return false;
        };
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

    checkForWallCollisions() { //all walls
        const allMovingObj = this.allCurMovingObjs();
        for (let i = 0; i < allMovingObj.length; i++) {
            const obj = allMovingObj[i];
            if ((obj.pos.x > (1200 - obj.radius)) || (obj.pos.x < 0)) {
                return obj.wallCollision();
            };
        };
    };

    checkForCollisions() { //handles block-ball and ball-paddle
        const allObj = this.allCurObjects();
        for (let i = 0; i < allObj.length; i++) {
            for (let j = i + 1; j < allObj.length; j ++) {
                const obj1 = allObj[i];
                const obj2 = allObj[j];
                if (obj1.objToObjCollision(obj2)) {
                    return obj1.collidesWith(obj2);
                };
            };
        };
    };

};

export default Game;