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
        this.balls = [];
        this.height = HEIGHT;
        this.width = WIDTH;
        this.themeColor = ["red", "blue", "green"];

        this.addBalls(STARTING_BALLS);
    };   

    addBalls(n) {
        for (let i = 0; i < n; i++) {
            this.balls.push(new Ball(BALL_START_LOCATION))
        }
        return this.balls;
    }
     
    allCurObjects() {
        return [].concat(this.player, this.balls[0], this.blocks);
    };

    allCurMovingObjs() {
        return [].concat(this.player, this.balls[0]);
    };
 
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

    distanceFormula(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1, 2) + Math.pow(pos2, 2));
    }

    isCollided(obj1, obj2) {
        const dx = obj1.pos.x - obj2.pos.x;
        const dy = obj1.pos.y - obj2.pos.y;
        const dist = this.distanceFormula(dx, dy);
        return dist < (obj1.radius + obj2.radius);
    };

    checkForCollisions() { //handles block-ball and ball-paddle
        const allObj = this.allCurObjects();
        for (let i = 0; i < allObj.length; i++) {
            for (let j = i + 1; j < allObj.length; j ++) {
                const obj1 = allObj[i];
                const obj2 = allObj[j];
                if (obj1 instanceof Player && obj2 instanceof Ball) {
                    if (this.isCollided(obj1, obj2)) {
                        obj1.collidesWith(obj2);
                    };
                } else if (obj1 instanceof Ball && obj1 instanceof Player) {
                    if (this.isCollided(obj1, obj2)) {
                        obj1.collidesWith(obj2);
                    };
                }
            }
        }
    }
                    


    // objToObjCollision(otherObj) {
    //     const dist = this.distanceFormula(dx, dy);
    //     return dist < (this.radius);



};

export default Game;