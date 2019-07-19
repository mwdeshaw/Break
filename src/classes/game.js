import Player from "./player";
import Ball from './ball';
import Block from './blocks';
import { throws } from "assert";

const HEIGHT = 600;
const WIDTH = 920;
const PLAYER_START_LOCATION = { x: 400, y: 540 }
const BALL_START_LOCATION = { x: 445, y: 500 }
const STARTING_BALLS = 3;
const STARTING_LIVES = 3;
const BLOCK_HEIGHT = 40;
const BLOCK_WIDTH = 40;
const BLOCKS_NUM = 1;
const FIRST_BLOCK_POS = { x: 10, y: 10 }

class Game {
    constructor(ctx) {
        this.lives = STARTING_LIVES;
        this.player = [new Player(Object.assign({}, PLAYER_START_LOCATION))];
        this.ctx = ctx;
        this.blocks = [];
        this.ball = [new Ball(Object.assign({}, BALL_START_LOCATION))];
        this.height = HEIGHT;
        this.width = WIDTH;
        this.themeColor = ["#a7a7a7", "blue", "green"];

        this.addBlocks(BLOCKS_NUM);
    };   
     
    addBlocks(n) {
        for (let i = 0; i < n; i++) {
            this.blocks.push(new Block(FIRST_BLOCK_POS, BLOCK_WIDTH, BLOCK_HEIGHT));
        }
        return this.blocks;
    }
     
    allCurObjects() {
        return [].concat(this.player, this.ball, this.blocks);
    };

    allCurMovingObjs() {
        return [].concat(this.player, this.ball);
    };
 
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.themeColor[0];
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
                this.deathAnimation();
            };
        });
    };

    singleMove(delta) {
        this.moveObjects(delta);
        this.checkForCollisions();
        this.checkForWallCollisions();
    };

    isOutOfBounds(posY) {
        if (posY > (560)) { //player height never changing
            return true
        } else {
            return false;
        };
    };

    deathAnimation() {
        this.lives -= 1;
        if (this.lives === 0) {
            // this.remove(this.player);
            // this.remove(this.ball);
            return "Game Over!"
        } else {
            
            this.player[0].pos = Object.assign({}, PLAYER_START_LOCATION);
            this.player[0].vel = { x: 0, y: 0 };
            this.ball[0].pos = Object.assign({}, BALL_START_LOCATION);
            this.ball[0].vel = { x: 0, y: 0 };
            this.ball[0].dir = { x: 0, y: 0 };
            this.ball[0].initialFlag = false;
        }
    };

    // remove(arr) {
    //     if (arr[0] instanceof Ball) {
    //         this.ball.splice(0, 1);
    //         return this.ball;
    //     } else if (arr[0] instanceof Player) {
    //         this.player.splice(0, 1);
    //     };
    // };

    checkForWallCollisions() { //all walls
        const allMovingObj = this.allCurMovingObjs();
        for (let i = 0; i < allMovingObj.length; i++) {
            const obj = allMovingObj[i];
            if ((obj instanceof Player) && (obj.pos.x < 0 || obj.pos.x > (920 - obj.width))) {
                return obj.wallCollision();
            }
            if ((obj instanceof Ball) && (obj.pos.x < 0 || obj.pos.x > (920 - obj.radius))) {
                return obj.wallCollision();
            }
            if ((obj instanceof Ball) && (obj.pos.y < 0 || obj.pos.y > (600 - obj.radius))) {
                return obj.topWallCollision();
            }
        };
    };

    isCollided(obj1, obj2) {
        let temp;
        if (obj1 instanceof Ball) {
            temp = obj1;
            obj1 = obj2;
            obj2 = temp;
        }
        let dx = Math.abs(obj2.pos.x - obj1.pos.x - obj1.width / 2);
        let dy = Math.abs(obj2.pos.y - obj1.pos.y - obj1.height / 2);
        if (dx > (obj1.width / 2 + obj2.radius)) {
            return false;
        };
        if (dy > (obj1.height / 2 + obj2.radius)) { 
            return false; 
        };
        if (dx <= (obj1.width / 2)) { 
            return true; 
        };
        if (dy <= (obj1.height / 2)) { 
            return true; 
        };
        let dX = dx - obj1.width / 2;
        let dY = dy - obj2.width / 2;
        return (dX * dX + dY * dY <= (obj2.radius * obj2.radius));
    };

    checkForCollisions() { //handles block-ball and ball-paddle
        const allObj = this.allCurObjects();
        for (let i = 0; i < allObj.length; i++) {
            for (let j = i + 1; j < allObj.length; j ++) {
                const obj1 = allObj[i];
                const obj2 = allObj[j];
                if (obj1 instanceof Player && obj2 instanceof Ball) { //order basically ensures this
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
                
};

export default Game;