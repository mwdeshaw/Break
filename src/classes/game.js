import Player from "./player";
import Ball from './ball';
import Block from './blocks';

const HEIGHT = 600;
const WIDTH = 920;
const PLAYER_START_LOCATION = { x: 400, y: 540 }
const BALL_START_LOCATION = { x: 445, y: 500 }
const STARTING_LIVES = 3;
const BLOCK_HEIGHT = 50;
const BLOCK_WIDTH = 50;
const BLOCKS_NUM = 72;

class Game {
    constructor(ctx) {
        this.lives = STARTING_LIVES;
        this.player = new Player(Object.assign({}, PLAYER_START_LOCATION));
        this.ctx = ctx;
        this.blocks = [];
        this.ball = new Ball(Object.assign({}, BALL_START_LOCATION));
        this.height = HEIGHT;
        this.width = WIDTH;
        this.themeColor = ["#bdae57"];
        this.numBlocks = BLOCKS_NUM;

        this.addBlocks(this.numBlocks);
    };   
     
    addBlocks(n) {
        let blockPosX = 10;
        let blockPosY = 10;
        let i = 0;
        while (i < n) {
            if (!this.blocks.length) {
                this.blocks.push(new Block({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT));
                i += 1;
            } 

            blockPosX += BLOCK_WIDTH;
            if (blockPosX > 890) {
                blockPosX = 10;
                blockPosY = blockPosY += BLOCK_HEIGHT;
            }
            this.blocks.push(new Block({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT));
            i += 1;
        };
        return this.blocks;
    };
     
    allCurObjects() {
        return [].concat([this.player], [this.ball], this.blocks);
    };

    allCurMovingObjs() {
        return [].concat([this.player], [this.ball]);
    };
 
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.themeColor[0];
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.ctx.font = "30px Sans-Serif";
        this.ctx.fillStyle = "#8a891f";
        if (this.lives > 1) {
            this.ctx.fillText(`${this.lives} Lives Left`, 750, 580);
        } else {
            this.ctx.fillText(`${this.lives} Life Left`, 750, 580);
        }
        
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
        if (posY > (560)) {
            return true
        } else {
            return false;
        };
    };

    deathAnimation() {
        this.lives -= 1;
        if (this.lives === 0) {
            return "Game Over!"
        } else {     
            this.player.pos = Object.assign({}, PLAYER_START_LOCATION);
            this.player.vel = { x: 0, y: 0 };
            this.ball.pos = Object.assign({}, BALL_START_LOCATION);
            this.ball.vel = { x: 0, y: 0 };
            this.ball.dir = { x: 0, y: 0 };
            this.ball.initialFlag = false;
        }
    };

    checkForWallCollisions() {
        const allMovingObj = this.allCurMovingObjs();
        for (let i = 0; i < allMovingObj.length; i++) {
            const obj = allMovingObj[i];
            if ((obj instanceof Player) && (obj.pos.x < 0 || obj.pos.x > (920 - obj.width))) {
                return obj.wallCollision();
            }
            if ((obj instanceof Ball) && (obj.pos.x < (0 + obj.radius) || obj.pos.x > (920 - obj.radius))) {
                this.playBounceSound();
                return obj.wallCollision();
            }
            if ((obj instanceof Ball) && (obj.pos.y < (0 + obj.radius) || obj.pos.y > (600 - obj.radius))) {
                this.playBounceSound();
                return obj.topWallCollision();
            }
        };
    };

    isOver() {
        if (this.numBlocks === 0 || this.lives === 0) {
            return true;
        }
        return false;
    }

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

    remove(obj) {
        if (obj instanceof Block) {
            this.numBlocks -= 1;
            this.blocks.splice(this.blocks.indexOf(obj), 1);
        } else {
            throw new Error("unknown type of object");
        };
    }

    checkForCollisions() {
        const allObj = this.allCurObjects();
        for (let i = 0; i < allObj.length; i++) {
            for (let j = i + 1; j < allObj.length; j ++) {
                const obj1 = allObj[i];
                const obj2 = allObj[j];
                if (obj1 instanceof Player && obj2 instanceof Ball) { //order basically ensures this
                    if (this.isCollided(obj1, obj2)) {
                        this.playBounceSound();
                        obj1.collidesWith(obj2);
                    };
                } else if (obj1 instanceof Ball && obj2 instanceof Player) {
                    if (this.isCollided(obj1, obj2)) {
                        this.playBounceSound();
                        obj1.collidesWith(obj2);
                    };
                } else if (obj1 instanceof Ball && obj2 instanceof Block) {
                    if (this.isCollided(obj1, obj2)) {
                        this.playSound();
                        obj1.collidesWith(obj2);
                        this.remove(obj2);
                    };
                };
            };
        };
    };

    playSound() {
        const ballSound = document.getElementById("blockSound");
        ballSound.currentTime = 0;
        ballSound.play();
    };

    playBounceSound() {
        const anotherSound = document.getElementById("anotherSound");
        anotherSound.currentTime = 0;
        anotherSound.play();
    };

};

export default Game;