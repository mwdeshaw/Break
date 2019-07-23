import Player from "./player";
import Ball from './ball';
import Block from './blocks';
import Powerup from './powerup'

const HEIGHT = 600;
const WIDTH = 920;
const PLAYER_START_LOCATION = { x: 395, y: 540 };
const BALL_START_LOCATION = { x: 455, y: 500 };
const STARTING_LIVES = 3;
const BLOCK_HEIGHT = 50;
const BLOCK_WIDTH = 50;
const BLOCKS_NUM = 72;
const POWERUPS = ["extraLife", "multiBall", "superball", "shorterPaddle", "longerPaddle", "megaBall", "minieBall"];
const TOTAL_POWERUP_COUNT = 12;
const POWERUP_RADIUS = 30;


class Game {
    constructor(ctx) {
        this.lives = STARTING_LIVES;
        this.player = new Player(Object.assign({}, PLAYER_START_LOCATION));
        this.ctx = ctx;
        this.blocks = [];
        this.balls = [new Ball(Object.assign({}, BALL_START_LOCATION))];
        this.height = HEIGHT;
        this.width = WIDTH;
        this.themeColor = ["#bdae57"];
        this.numBlocks = BLOCKS_NUM;
        this.powerupCount = TOTAL_POWERUP_COUNT;
        this.powerups = POWERUPS;

        this.activePowerups = [];
        this.totalPowerups = [];
        this.movingPowerUps = [];

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
            if (blockPosX > 878) {
                blockPosX = 10;
                blockPosY = blockPosY += BLOCK_HEIGHT;
            }
            if ((i % 3 === 0 || i % 7 === 0 || i % 11 === 0 || i % 15 === 0) && this.powerupCount > 0) {
                let randomPowerup = new Powerup({ x: blockPosX, y: blockPosY }, this.powerups.sample(), POWERUP_RADIUS);
                this.totalPowerups.push(randomPowerup);
                this.blocks.push(new Block({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT, randomPowerup));
                this.powerupCount -= 1;
            } else {
                this.blocks.push(new Block({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT));
            }
            i += 1;
        };

        return this.blocks.shuffle();
    };

    // getPowerupEffect(powerUp) {
    //     switch (powerUp.type) {
    //         case "extraLife":
    //             this.game.player.life += 1;
    //             break;
    //         case "multiBall":
    //             this.game.balls.push(new Ball)
    //             break;
    //         case "superball":
    //             break;
    //         case "shorterPaddle":
    //             break;
    //         case "longerPaddle":
    //             break;
    //         case "minieBall":
    //             break;
    //         case "megaBall":
    //             break;
    //     };
    // };


    allCurObjects() {
        return [].concat([this.player], this.balls, this.blocks, this.movingPowerUps);
    };

    allCurMovingObjs() {
        return [].concat([this.player], this.balls, this.movingPowerUps);
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
            if (obj instanceof Powerup && this.isOutOfBounds(obj.pos.y)) {
                this.remove(obj);
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
            this.current
        }
    };

    checkForWallCollisions() {
        const allMovingObj = this.allCurMovingObjs();
        for (let i = 0; i < allMovingObj.length; i++) {
            const obj = allMovingObj[i];
            if ((obj instanceof Player) && (obj.pos.x < 0)) {
                return obj.leftWallCollision();
            }
            if ((obj instanceof Player) && (obj.pos.x > (920 - obj.width))) {
                return obj.rightWallCollision();
            }
            if ((obj instanceof Ball) && (obj.pos.x < (0 + obj.radius))) {
                this.playBounceSound();
                return obj.leftWallCollision();
            }
            if ((obj instanceof Ball) && (obj.pos.x > (920 - obj.radius))) {
                this.playBounceSound();
                return obj.rightWallCollision();
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
            if (obj.powerUp) {
                obj.powerUp.initiateMove();
            };
        } else if (obj instanceof Powerup) {
            let pUp = this.movingPowerUps.findIndex(el => el.type === obj.type);
            this.movingPowerUps.splice(pUp, 1);
        };
    };

    checkForCollisions() {
        const allObj = this.allCurObjects();
        for (let i = 0; i < allObj.length; i++) {
            for (let j = i + 1; j < allObj.length; j ++) {
                const obj1 = allObj[i];
                const obj2 = allObj[j];
                if (obj1 instanceof Player && obj2 instanceof Ball) {
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
                    if (this.isCollided(obj2, obj1)) {
                        this.playSound();
                        obj1.collidesWith(obj2);
                        this.remove(obj2);
                    };
                }; //check for player powerup or powerup playewr only...
                //this will call initiateMove() in powerup of block has powerup causing a move
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