/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/classes/ball.js":
/*!*****************************!*\
  !*** ./src/classes/ball.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ "./src/classes/moving_object.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/classes/player.js");
/* harmony import */ var _blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks */ "./src/classes/blocks.js");




const BALL_RADIUS = 20;

const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

class Ball extends _moving_object__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(pos, initialFlag = false) {
        super(pos, { x: 0, y: 0 }, BALL_RADIUS);
        this.color = randomColor();
        this.dir = { x: 0, y: 0 }
        this.initialFlag = initialFlag;
        this.spinSpeed = Math.random() * 60 + 30;
    };

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.restore();
    };

    collidesWith(otherObj) {
        if (otherObj instanceof _player__WEBPACK_IMPORTED_MODULE_1__["default"]) {
            this.bounce();
            return true;
        } else if (otherObj instanceof _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            this.bounce();
            return true;
        } else {
            return false;
        };
    };

    rightWallCollision() {
        this.vel.x = -Math.abs(this.vel.x) * 0.95;
        return true;
    }

    leftWallCollision() {
        this.vel.x = Math.abs(this.vel.x) * 0.95;
        return true;
    }

    topWallCollision() {
        this.vel.y = Math.abs(this.vel.y) * 0.95;
        return true;
    }

    bounce() {
        if (this.dir.x !== 0 && this.dir.y !== 0) {
            this.dir.x = -this.dir.x;
            this.dir.y = -this.dir.y;
            this.vel.y = -this.vel.y;
        };
    };    

    getRandomInt(min, max) {
        return Math.random() * (max - min) + min;
    };

    initialRotation() {
        let rads = 90 * (Math.PI / 180);
        this.dir.x = Math.cos(rads);
        this.dir.y = Math.sin(rads);
    };

    rotate(deltaTime) {
        if (this.dir.y !== 0) {
            let angle = -this.spinSpeed * (Math.PI / 180) * deltaTime;
            let vector = [this.dir.x, this.dir.y];

            var cos = Math.cos(angle);
            var sin = Math.sin(angle);

            this.dir.x = Math.round(10000 * (vector[0] * cos - vector[1] * sin)) / 10000;
            this.dir.y = Math.round(10000 * (vector[0] * sin + vector[1] * cos)) / 10000;
        }
    }

    handleBallRelease(input, key) {
        if (!this.initialFlag && key !== "space") {
            this.vel.x += input[0];
            this.vel.y += input[1];
        } else if (key === "space" && this.dir.x === 0 && this.dir.y === 0) {
            this.vel.x += input[0];
            // this.vel.x += this.getRandomInt(-50, 50);
            this.vel.y += input[1];
            this.initialRotation();
        }
    };

    move(deltaTime) {
        super.move(deltaTime);
        this.rotate(deltaTime);
    };


    // move(deltaTime) {
    //     let newDistanceX;
    //     let newDistanceY;
    //     if (this.initialFlag) {
    //         newDistanceX = this.speed * deltaTime * this.dir.x;
    //         newDistanceY = this.speed * deltaTime * this.dir.y;
    //     } else {
    //         newDistanceX = deltaTime * this.dir.x;
    //         newDistanceY = deltaTime * this.dir.y;
    //     }
    //     this.pos.x = this.pos.x + newDistanceX;
    //     this.pos.y = this.pos.y + newDistanceY;

    // };
};

/* harmony default export */ __webpack_exports__["default"] = (Ball);

/***/ }),

/***/ "./src/classes/blocks.js":
/*!*******************************!*\
  !*** ./src/classes/blocks.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

class Block {
    constructor(pos, width, height, powerUp) {
        this.pos = pos;
        this.width = width;
        this.height = height;
        this.color = randomColor();
        this.powerUp = powerUp;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.restore();
    };


};

/* harmony default export */ __webpack_exports__["default"] = (Block);

/***/ }),

/***/ "./src/classes/g_view.js":
/*!*******************************!*\
  !*** ./src/classes/g_view.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class GVIEW {
    constructor(game){
        this.game = game;
        this.input = {
            space: [0, -175]
        };
    };

    // getRandom(arr) {
    //     return arr[Math.floor((Math.random() * arr.length))];
    // }

    keyHandler() {   
        document.addEventListener("keydown", event => {
            this.handleKey(event);
        });
        document.addEventListener("keyup", event => {
            this.handleKey(event);
        });
    };

    handleKey(event) {
        let input = this.input;
        if (!this.game.balls[0].initialFlag) {
            switch (event.keyCode) {
                case 65:
                    if (event.type === "keydown") {
                        this.game.player.vel.x = -350;
                        this.game.balls[0].vel.x = -350;
                    } else {
                        this.game.player.vel.x = 0;
                        this.game.balls[0].vel.x = 0;
                    }
                    break;
                case 68:
                    if (event.type === "keydown") {
                        this.game.player.vel.x = 350;
                        this.game.balls[0].vel.x = 350;
                    } else {
                        this.game.player.vel.x = 0;
                        this.game.balls[0].vel.x = 0;
                    }
                    break;
                case 32:
                    if (event.type === "keydown") {
                        this.game.balls[0].initialFlag = true;
                        this.game.balls[0].handleBallRelease(input.space, Object.keys(this.input)[0]);
                    }
                    break;
                default:
                    break;
                }
        } else {
            switch (event.keyCode) {
                case 65:
                    if (event.type === "keydown") {
                        this.game.player.vel.x = -350;
                    } else {
                        this.game.player.vel.x = 0;
                    }
                    break;
                case 68:
                    if (event.type === "keydown") {
                        this.game.player.vel.x = 350;
                    } else {
                        this.game.player.vel.x = 0;
                    }
                    break;
            default:
                    break;
            };     
        };
    };

    start() {
        this.keyHandler();
        this.lastTime = new Date();
        requestAnimationFrame(this.animate.bind(this));
    };

    animate() {
        if (!this.game.isOver()) {
            const deltaT = (new Date() - this.lastTime) / 1000;
            this.game.singleMove(deltaT)
            this.game.draw();
            this.lastTime = new Date();
            requestAnimationFrame(this.animate.bind(this))
        } else {
            this.game.ctx.clearRect(0, 0, this.game.width, this.game.height);
            const endScreen = document.querySelector(".end-screen");
            endScreen.classList.add("end");
        }
    };
}

/* harmony default export */ __webpack_exports__["default"] = (GVIEW);

/***/ }),

/***/ "./src/classes/game.js":
/*!*****************************!*\
  !*** ./src/classes/game.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/classes/player.js");
/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ball */ "./src/classes/ball.js");
/* harmony import */ var _blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks */ "./src/classes/blocks.js");
/* harmony import */ var _powerup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./powerup */ "./src/classes/powerup.js");





const HEIGHT = 600;
const WIDTH = 920;
const PLAYER_START_LOCATION = { x: 395, y: 540 };
const BALL_START_LOCATION = { x: 455, y: 500 };
const STARTING_LIVES = 3;
const BLOCK_HEIGHT = 50;
const BLOCK_WIDTH = 50;
const BLOCKS_NUM = 72;
const POWERUPS = ["extraLife", "multiBall", "shorterPaddle", "longerPaddle", "miniBall", "megaBall"];
const TOTAL_POWERUP_COUNT = 12;


class Game {
    constructor(ctx) {
        this.lives = STARTING_LIVES;
        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"](Object.assign({}, PLAYER_START_LOCATION));
        this.ctx = ctx;
        this.blocks = [];
        this.balls = [new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](Object.assign({}, BALL_START_LOCATION))];
        this.height = HEIGHT;
        this.width = WIDTH;
        this.themeColor = ["#bdae57"];
        this.numBlocks = BLOCKS_NUM;
        
        this.powerupCount = TOTAL_POWERUP_COUNT; 
        this.powerups = POWERUPS;
        this.activePowerups = [];
        this.totalPowerups = [];
        this.movingPowerups = [];

        this.addBlocks(this.numBlocks);
    };   
     
    addBlocks(n) {
        let blockPosX = 10;
        let blockPosY = 10;
        let i = 0;

        while (i < n) {
            if (!this.blocks.length) {
                let randomPowerup = new _powerup__WEBPACK_IMPORTED_MODULE_3__["default"]({ x: blockPosX, y: blockPosY }, this.getRandom(this.powerups));
                this.totalPowerups.push(randomPowerup);
                this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT, randomPowerup));
                this.powerupCount -= 1;
                i += 1;
            } 

            blockPosX += BLOCK_WIDTH;
            if (blockPosX > 878) {
                blockPosX = 10;
                blockPosY = blockPosY += BLOCK_HEIGHT;
            }
            if (i % 6 === 0 && this.powerupCount > 0) {
                let randomPowerup = new _powerup__WEBPACK_IMPORTED_MODULE_3__["default"]({ x: blockPosX, y: blockPosY }, this.getRandom(this.powerups));
                this.totalPowerups.push(randomPowerup);
                this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT, randomPowerup));
                this.powerupCount -= 1;
            } else {
                this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT, null));
            }
            i += 1;
        };
        
        return this.shuffleArr(this.blocks);
    };
    
    shuffleArr(arr) {
        arr.sort(() => 0.5 - Math.random());
    }

    getRandom(arr) {
        return arr[Math.floor((Math.random() * arr.length))];
    }

    allCurObjects() {
        return [].concat([this.player], this.balls, this.blocks, this.movingPowerups);
    };

    allCurMovingObjs() {
        return [].concat([this.player], this.balls, this.movingPowerups);
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

        // if (this.activePowerups) {
        //     for (let i = 0; i < this.activePowerups.length; i++) {
        //         let posX = 500;
        //         let posY = 500; 
        //         this.ctx.fillText(`${this.activePowerups[i].type}`, posX, posY);
        //         posX += 40;
        //     }
        // }
        
        this.allCurObjects().forEach(obj => {
            obj.draw(this.ctx);
        });
    };

    moveObjects(delta) {
        const movingObj = this.allCurMovingObjs();
        movingObj.forEach(obj => {
            obj.move(delta);
            if (obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"] && this.isOutOfBounds(obj.pos.y)) {
                if (this.balls.length === 1) {
                    this.deathAnimation();
                } else {
                    this.remove(obj);
                }
            };
            if (obj instanceof _powerup__WEBPACK_IMPORTED_MODULE_3__["default"] && this.isOutOfBounds(obj.pos.y)) {
                this.remove(obj);
            };
        });
    };

    singleMove(delta) {
        this.checkForCollisions();
        this.checkForWallCollisions();
        this.moveObjects(delta);

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
            this.player.width = 120;
            this.player.pos = Object.assign({}, PLAYER_START_LOCATION);
            this.player.vel = { x: 0, y: 0 };
            if (this.balls.length > 1) {
                this.balls = this.balls.slice(0, 1);
            }
            this.balls[0].pos = Object.assign({}, BALL_START_LOCATION);
            this.balls[0].dir = { x: 0, y: 0 };
            this.balls[0].vel = { x: 0, y: 0 };
            this.balls[0].radius = 20;
            this.balls[0].initialFlag = false;
            this.activePowerups = [];
            this.movingPowerups = [];
        };
    };

    checkForWallCollisions() {
        const allMovingObj = this.allCurMovingObjs();
        for (let i = 0; i < allMovingObj.length; i++) {
            const obj = allMovingObj[i];
            if ((obj instanceof _player__WEBPACK_IMPORTED_MODULE_0__["default"]) && (obj.pos.x < 0)) {
                return obj.leftWallCollision();
            }
            if ((obj instanceof _player__WEBPACK_IMPORTED_MODULE_0__["default"]) && (obj.pos.x > (920 - obj.width))) {
                return obj.rightWallCollision();
            }
            if ((obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) && (obj.pos.x < (obj.radius))) {
                this.playBounceSound();
                return obj.leftWallCollision();
            }
            if ((obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) && (obj.pos.x > (920 - obj.radius))) {
                this.playBounceSound();
                return obj.rightWallCollision();
            }
            if ((obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) && (obj.pos.y < (obj.radius) || obj.pos.y > (600 - obj.radius))) {
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
        if (obj instanceof _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            if (obj.powerUp) {
                let pUp = this.totalPowerups.indexOf(obj.powerUp);
                this.movingPowerups.push(this.totalPowerups[pUp]);
                this.totalPowerups.splice(pUp,1);
                obj.powerUp.initiateMove();
            };
            this.numBlocks -= 1;
            this.blocks.splice(this.blocks.indexOf(obj), 1);
        } else if (obj instanceof _powerup__WEBPACK_IMPORTED_MODULE_3__["default"]) {
            let pUp = this.movingPowerups.indexOf(obj);
            this.movingPowerups.splice(pUp, 1);
        } else if (obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) {
            this.balls.splice(this.balls.indexOf(obj), 1);
        };
    };

    checkForCollisions() {
        const allObj = this.allCurObjects();
        for (let i = 0; i < allObj.length; i++) {
            for (let j = i + 1; j < allObj.length; j ++) {
                const obj1 = allObj[i];
                const obj2 = allObj[j];
                if (obj1 instanceof _player__WEBPACK_IMPORTED_MODULE_0__["default"] && obj2 instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) {
                    if (this.isCollided(obj1, obj2)) {
                        // console.log("playerPos", obj1.pos);
                        // console.log("ballPos", obj2.pos);
                        // console.log("ballDir", obj2.vel);
                        this.playBounceSound();
                        obj1.collidesWith(obj2);
                    };
                } else if (obj1 instanceof _player__WEBPACK_IMPORTED_MODULE_0__["default"] && obj2 instanceof _powerup__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                    if (this.isCollided(obj1, obj2)) {
                        this.collidesWithPowerup(obj2);
                        this.playPowerupSound();
                        this.remove(obj2);
                    };
                } else if (obj1 instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"] && obj2 instanceof _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                    if (this.isCollided(obj2, obj1)) {
                        this.playSound();
                        obj1.collidesWith(obj2);
                        this.remove(obj2);
                    };
                } 
            };
        };
    };

    collidesWithPowerup(powerup) {
        switch (powerup.type) {
            case "extraLife":
                this.lives += 1;
                break;
            case "multiBall":
                let newerBalls = [];
                this.balls.forEach(ball => {
                    let newBalls = [new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](Object.assign({}, this.balls[0].pos), true), new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](Object.assign({}, this.balls[0].pos), true)];
                    newBalls[0].vel.y = -100;
                    newBalls[0].vel.x = -50;
                    newBalls[0].dir.x = -1;
                    newBalls[0].dir.y = -1;
                    newBalls[1].vel.y = -100;
                    newBalls[0].vel.x = 50;
                    newBalls[1].dir.x = -1;
                    newBalls[1].dir.y = 1;

                    newerBalls.concat(newBalls);
                });

                this.balls = this.balls.concat(newerBalls);
            break;
            case "megaBall":
                this.balls.forEach(ball => {
                    ball.radius *= 1.5;
                    ball.vel.x *= 0.75;
                    ball.vel.y *= 0.75;
                });
                break;
            case "shorterPaddle":
                this.player.width = this.player.width -= 20;
                break;
            case "longerPaddle":
                this.player.width = this.player.width += 20;
                break;
            case "miniBall":
                this.balls.forEach(ball => {
                    ball.radius *= 0.5;
                    ball.vel.x *= 1.25;
                    ball.vel.y *= 1.25;
                });
                break;
            default:
                break;
        };

        this.activePowerups.push(powerup);
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

    playPowerupSound() {
        const powerupSound = document.getElementById("powerupSound");
        powerupSound.currentTime = 0;
        powerupSound.play();
    };

};

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./src/classes/moving_object.js":
/*!**************************************!*\
  !*** ./src/classes/moving_object.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

class MovingObject {
    constructor(pos, vel, radius) {
        this.pos = pos;
        this.vel = vel;
        this.radius = radius;
    };

    move(deltaTime) {
        let newDistanceX = this.vel.x * deltaTime;
        let newDistanceY = this.vel.y * deltaTime;
        this.pos.x = this.pos.x + newDistanceX;
        this.pos.y = this.pos.y + newDistanceY;
    };
};

/* harmony default export */ __webpack_exports__["default"] = (MovingObject);

/***/ }),

/***/ "./src/classes/player.js":
/*!*******************************!*\
  !*** ./src/classes/player.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ "./src/classes/moving_object.js");
/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ball */ "./src/classes/ball.js");


const PLAYER_HEIGHT = 30;
const PLAYER_WIDTH = 120;

const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

class Player extends _moving_object__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(pos) {
        super(pos, { x: 0, y: 0 })
        this.color = randomColor();
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
    };

    move(deltaTime) {
        let newDistanceX = this.vel.x * deltaTime;
        this.pos.x = this.pos.x + newDistanceX;
    };

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.restore();
    };

    // collidesWith(otherObj) {
    //     if (otherObj instanceof Ball) {
    //        if (otherObj.dir.x > 0) {
    //            otherObj.dir.x = -otherObj.dir.x;
    //        } else {
    //            otherObj.dir.x = otherObj.dir.x;
    //        }
    //         if (otherObj.dir.y > 0) {
    //             otherObj.dir.y = otherObj.dir.y;
    //         } else {
    //             otherObj.dir.x = -otherObj.dir.x;
    //         }
    //         otherObj.speed = -Math.abs(otherObj.speed) * 1.05;
    //         return true;
    //     };
    // };

    //can dir x be set here? i bet it can

    collidesWith(otherObj) {
        if (otherObj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) {

                if (otherObj.pos.x === (this.pos.x + 60)) {
                    otherObj.dir.x = -Math.abs(otherObj.dir.x); 
                    otherObj.dir.y = -Math.abs(otherObj.dir.y);
                    otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.1;
                } else if (otherObj.pos.x < (this.pos.x + 60))  {
                    otherObj.dir.x = -Math.abs(otherObj.dir.x);
                    otherObj.dir.y = -Math.abs(otherObj.dir.y); 
                    otherObj.vel.x = -(otherObj.vel.x); 
                    otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.1;
                } else {
                    otherObj.dir.x = -Math.abs(otherObj.dir.x);
                    otherObj.dir.y = -Math.abs(otherObj.dir.y);
                    otherObj.vel.x = -(otherObj.vel.x); 
                    otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.1;
                }
            console.log("ballPos", otherObj.pos);
            console.log("ballVel", otherObj.vel);
            console.log("ballDir", otherObj.dir);
            return true;
        };
    };

    // collidesWith(otherObj) {
    //     if (otherObj instanceof Ball) {
    //         otherObj.dir.x = -Math.abs(otherObj.dir.x);
    //         otherObj.dir.y = -Math.abs(otherObj.dir.y);
    //         otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.1;
    //         return true;
    //     };
    // };

    rightWallCollision() {
        this.vel.x = -100;
        return true;
    }

    leftWallCollision() {
        this.vel.x = 100;
        return true;
    }

};

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),

/***/ "./src/classes/powerup.js":
/*!********************************!*\
  !*** ./src/classes/powerup.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ "./src/classes/moving_object.js");

// import extraLife from 
// import multiBall from 
// import shorterPaddle from 
// import longerPaddle from 


const POWERUP_RADIUS = 30;

const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

// const POWERUPS = ["extraLife", "multiBall", "shorterPaddle", "longerPaddle"];

class Powerup extends _moving_object__WEBPACK_IMPORTED_MODULE_0__["default"]{
    constructor(pos, type) {
        super(pos, { x: 0, y: 0 }, POWERUP_RADIUS)
        this.type = type;
        this.color = randomColor();
    };
    
    // draw(ctx) {
    //     let img = new Image();
    //     switch(this.type) {
    //         case "extraLife":
    //             img.src = extraLife;
    //             break;
    //         case "multiBall":
    //             img.src = multiBall;
    //             break;
    //         case "shorterPaddle":
    //             img.src = shorterPaddle;
    //             break;
    //         case "longerPaddle":
    //             img.src = longerPaddle;
    //             break;
    //     }
    //     ctx.save();
    //     ctx.drawImage(img, this.pos.x, this.pos.y, this.radius, this.radius);
    //     ctx.restore();
    // }


    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.restore();
    };

    initiateMove() {
        this.vel.y += 200;
    }

    move(deltaTime) {
        let newDistanceY = this.vel.y * deltaTime;
        this.pos.y = this.pos.y + newDistanceY;
    }

}

/* harmony default export */ __webpack_exports__["default"] = (Powerup);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/game */ "./src/classes/game.js");
/* harmony import */ var _classes_g_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/g_view */ "./src/classes/g_view.js");



document.addEventListener("DOMContentLoaded", () => {
    let github = document.getElementById("github");
    github.onclick = () => {
        document.location.href = 'https://github.com/mwdeshaw';
    }
    let linkedin = document.getElementById("linkedin");
    linkedin.onclick = () => {
        document.location.href = 'https://www.linkedin.com/in/matthew-deshaw-b629a0ba/';
    }

    const defScreen = document.getElementById("default");
    const powerBtn = document.getElementById("power-btn");
    powerBtn.onclick = () => {
        defScreen.setAttribute("class", "active");
        const startScreen = document.getElementById('start-screen');
        startScreen.setAttribute("class", "active");

        const light = document.getElementById('power-lt');
        light.setAttribute("class", "active");

        const screenText = document.querySelector(".start-text");
        const instructions = document.querySelector(".instructions");
        const controlsList = document.querySelector(".controls-list");

        screenText.classList.add("end");
        const startBtn = document.getElementById("start-game");
        setTimeout(() => {
            const audio = document.getElementById("gameboySound");
            audio.currentTime = 0;
            audio.play();
            instructions.classList.add("end");
            controlsList.classList.add("end");
            startBtn.setAttribute("class", "active");
        }, 3000);

        startBtn.onclick = () => {
            startScreen.removeAttribute("class");
            instructions.classList.remove("end");
            controlsList.classList.remove("end");
            screenText.classList.remove("end");
            const canvas = document.getElementById("board");
            const ctx = canvas.getContext("2d");
            const game = new _classes_game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
            new _classes_g_view__WEBPACK_IMPORTED_MODULE_1__["default"](game).start();
        };

        if (defScreen.classList[0] === "active") {
            powerBtn.onclick = () => {
                defScreen.removeAttribute("class");
                startBtn.removeAttribute("class");
                startScreen.removeAttribute("class");
                screenText.classList.remove("end");
                instructions.classList.remove("end");
                controlsList.classList.remove("end");
                light.removeAttribute("class");
            };
        };
    };
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvYmFsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9ibG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZ192aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbW92aW5nX29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvcG93ZXJ1cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUF3QztBQUNWO0FBQ0Q7O0FB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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRWUsc0VBQU8sRTs7Ozs7Ozs7Ozs7O0FDckV0QjtBQUFBO0FBQUE7QUFBa0M7QUFDRzs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHFEQUFJO0FBQ2pDLGdCQUFnQix1REFBSztBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IE1vdmluZ09iaiBmcm9tICcuL21vdmluZ19vYmplY3QnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9ja3MnO1xuXG5jb25zdCBCQUxMX1JBRElVUyA9IDIwO1xuXG5jb25zdCByYW5kb21Db2xvciA9ICgpID0+IHtcbiAgICBjb25zdCBkaWdzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgbGV0IGNvbG9yID0gXCIjXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29sb3IgKz0gZGlnc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTYpKV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjtcbn07XG5cbmNsYXNzIEJhbGwgZXh0ZW5kcyBNb3ZpbmdPYmoge1xuICAgIGNvbnN0cnVjdG9yKHBvcywgaW5pdGlhbEZsYWcgPSBmYWxzZSkge1xuICAgICAgICBzdXBlcihwb3MsIHsgeDogMCwgeTogMCB9LCBCQUxMX1JBRElVUyk7XG4gICAgICAgIHRoaXMuY29sb3IgPSByYW5kb21Db2xvcigpO1xuICAgICAgICB0aGlzLmRpciA9IHsgeDogMCwgeTogMCB9XG4gICAgICAgIHRoaXMuaW5pdGlhbEZsYWcgPSBpbml0aWFsRmxhZztcbiAgICAgICAgdGhpcy5zcGluU3BlZWQgPSBNYXRoLnJhbmRvbSgpICogNjAgKyAzMDtcbiAgICB9O1xuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLnJhZGl1cywgMCwgMiAqIE1hdGguUEksIHRydWUpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH07XG5cbiAgICBjb2xsaWRlc1dpdGgob3RoZXJPYmopIHtcbiAgICAgICAgaWYgKG90aGVyT2JqIGluc3RhbmNlb2YgUGxheWVyKSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5jZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAob3RoZXJPYmogaW5zdGFuY2VvZiBCbG9jaykge1xuICAgICAgICAgICAgdGhpcy5ib3VuY2UoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByaWdodFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnggPSAtTWF0aC5hYnModGhpcy52ZWwueCkgKiAwLjk1O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBsZWZ0V2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueCA9IE1hdGguYWJzKHRoaXMudmVsLngpICogMC45NTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdG9wV2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueSA9IE1hdGguYWJzKHRoaXMudmVsLnkpICogMC45NTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgYm91bmNlKCkge1xuICAgICAgICBpZiAodGhpcy5kaXIueCAhPT0gMCAmJiB0aGlzLmRpci55ICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpci54ID0gLXRoaXMuZGlyLng7XG4gICAgICAgICAgICB0aGlzLmRpci55ID0gLXRoaXMuZGlyLnk7XG4gICAgICAgICAgICB0aGlzLnZlbC55ID0gLXRoaXMudmVsLnk7XG4gICAgICAgIH07XG4gICAgfTsgICAgXG5cbiAgICBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbiAgICB9O1xuXG4gICAgaW5pdGlhbFJvdGF0aW9uKCkge1xuICAgICAgICBsZXQgcmFkcyA9IDkwICogKE1hdGguUEkgLyAxODApO1xuICAgICAgICB0aGlzLmRpci54ID0gTWF0aC5jb3MocmFkcyk7XG4gICAgICAgIHRoaXMuZGlyLnkgPSBNYXRoLnNpbihyYWRzKTtcbiAgICB9O1xuXG4gICAgcm90YXRlKGRlbHRhVGltZSkge1xuICAgICAgICBpZiAodGhpcy5kaXIueSAhPT0gMCkge1xuICAgICAgICAgICAgbGV0IGFuZ2xlID0gLXRoaXMuc3BpblNwZWVkICogKE1hdGguUEkgLyAxODApICogZGVsdGFUaW1lO1xuICAgICAgICAgICAgbGV0IHZlY3RvciA9IFt0aGlzLmRpci54LCB0aGlzLmRpci55XTtcblxuICAgICAgICAgICAgdmFyIGNvcyA9IE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgIHZhciBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGlyLnggPSBNYXRoLnJvdW5kKDEwMDAwICogKHZlY3RvclswXSAqIGNvcyAtIHZlY3RvclsxXSAqIHNpbikpIC8gMTAwMDA7XG4gICAgICAgICAgICB0aGlzLmRpci55ID0gTWF0aC5yb3VuZCgxMDAwMCAqICh2ZWN0b3JbMF0gKiBzaW4gKyB2ZWN0b3JbMV0gKiBjb3MpKSAvIDEwMDAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQmFsbFJlbGVhc2UoaW5wdXQsIGtleSkge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbEZsYWcgJiYga2V5ICE9PSBcInNwYWNlXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmVsLnggKz0gaW5wdXRbMF07XG4gICAgICAgICAgICB0aGlzLnZlbC55ICs9IGlucHV0WzFdO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJzcGFjZVwiICYmIHRoaXMuZGlyLnggPT09IDAgJiYgdGhpcy5kaXIueSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy52ZWwueCArPSBpbnB1dFswXTtcbiAgICAgICAgICAgIC8vIHRoaXMudmVsLnggKz0gdGhpcy5nZXRSYW5kb21JbnQoLTUwLCA1MCk7XG4gICAgICAgICAgICB0aGlzLnZlbC55ICs9IGlucHV0WzFdO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsUm90YXRpb24oKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBzdXBlci5tb3ZlKGRlbHRhVGltZSk7XG4gICAgICAgIHRoaXMucm90YXRlKGRlbHRhVGltZSk7XG4gICAgfTtcblxuXG4gICAgLy8gbW92ZShkZWx0YVRpbWUpIHtcbiAgICAvLyAgICAgbGV0IG5ld0Rpc3RhbmNlWDtcbiAgICAvLyAgICAgbGV0IG5ld0Rpc3RhbmNlWTtcbiAgICAvLyAgICAgaWYgKHRoaXMuaW5pdGlhbEZsYWcpIHtcbiAgICAvLyAgICAgICAgIG5ld0Rpc3RhbmNlWCA9IHRoaXMuc3BlZWQgKiBkZWx0YVRpbWUgKiB0aGlzLmRpci54O1xuICAgIC8vICAgICAgICAgbmV3RGlzdGFuY2VZID0gdGhpcy5zcGVlZCAqIGRlbHRhVGltZSAqIHRoaXMuZGlyLnk7XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICBuZXdEaXN0YW5jZVggPSBkZWx0YVRpbWUgKiB0aGlzLmRpci54O1xuICAgIC8vICAgICAgICAgbmV3RGlzdGFuY2VZID0gZGVsdGFUaW1lICogdGhpcy5kaXIueTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICB0aGlzLnBvcy54ID0gdGhpcy5wb3MueCArIG5ld0Rpc3RhbmNlWDtcbiAgICAvLyAgICAgdGhpcy5wb3MueSA9IHRoaXMucG9zLnkgKyBuZXdEaXN0YW5jZVk7XG5cbiAgICAvLyB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQmFsbDsiLCJjb25zdCByYW5kb21Db2xvciA9ICgpID0+IHtcbiAgICBjb25zdCBkaWdzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgbGV0IGNvbG9yID0gXCIjXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29sb3IgKz0gZGlnc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTYpKV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjtcbn07XG5cbmNsYXNzIEJsb2NrIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIHdpZHRoLCBoZWlnaHQsIHBvd2VyVXApIHtcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuY29sb3IgPSByYW5kb21Db2xvcigpO1xuICAgICAgICB0aGlzLnBvd2VyVXAgPSBwb3dlclVwO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH07XG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQmxvY2s7IiwiY2xhc3MgR1ZJRVcge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmlucHV0ID0ge1xuICAgICAgICAgICAgc3BhY2U6IFswLCAtMTc1XVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvLyBnZXRSYW5kb20oYXJyKSB7XG4gICAgLy8gICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpKV07XG4gICAgLy8gfVxuXG4gICAga2V5SGFuZGxlcigpIHsgICBcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVLZXkoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlS2V5KGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGhhbmRsZUtleShldmVudCkge1xuICAgICAgICBsZXQgaW5wdXQgPSB0aGlzLmlucHV0O1xuICAgICAgICBpZiAoIXRoaXMuZ2FtZS5iYWxsc1swXS5pbml0aWFsRmxhZykge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSA2NTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwia2V5ZG93blwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gLTM1MDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsc1swXS52ZWwueCA9IC0zNTA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsc1swXS52ZWwueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2ODpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwia2V5ZG93blwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gMzUwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxzWzBdLnZlbC54ID0gMzUwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbHNbMF0udmVsLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcImtleWRvd25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxzWzBdLmluaXRpYWxGbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsc1swXS5oYW5kbGVCYWxsUmVsZWFzZShpbnB1dC5zcGFjZSwgT2JqZWN0LmtleXModGhpcy5pbnB1dClbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgNjU6XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcImtleWRvd25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IC0zNTA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDY4OlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAzNTA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfTsgICAgIFxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5rZXlIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpO1xuICAgIH07XG5cbiAgICBhbmltYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZ2FtZS5pc092ZXIoKSkge1xuICAgICAgICAgICAgY29uc3QgZGVsdGFUID0gKG5ldyBEYXRlKCkgLSB0aGlzLmxhc3RUaW1lKSAvIDEwMDA7XG4gICAgICAgICAgICB0aGlzLmdhbWUuc2luZ2xlTW92ZShkZWx0YVQpXG4gICAgICAgICAgICB0aGlzLmdhbWUuZHJhdygpO1xuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmdhbWUud2lkdGgsIHRoaXMuZ2FtZS5oZWlnaHQpO1xuICAgICAgICAgICAgY29uc3QgZW5kU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbmQtc2NyZWVuXCIpO1xuICAgICAgICAgICAgZW5kU2NyZWVuLmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBHVklFVzsiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IEJhbGwgZnJvbSAnLi9iYWxsJztcbmltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2Nrcyc7XG5pbXBvcnQgUG93ZXJ1cCBmcm9tICcuL3Bvd2VydXAnXG5cbmNvbnN0IEhFSUdIVCA9IDYwMDtcbmNvbnN0IFdJRFRIID0gOTIwO1xuY29uc3QgUExBWUVSX1NUQVJUX0xPQ0FUSU9OID0geyB4OiAzOTUsIHk6IDU0MCB9O1xuY29uc3QgQkFMTF9TVEFSVF9MT0NBVElPTiA9IHsgeDogNDU1LCB5OiA1MDAgfTtcbmNvbnN0IFNUQVJUSU5HX0xJVkVTID0gMztcbmNvbnN0IEJMT0NLX0hFSUdIVCA9IDUwO1xuY29uc3QgQkxPQ0tfV0lEVEggPSA1MDtcbmNvbnN0IEJMT0NLU19OVU0gPSA3MjtcbmNvbnN0IFBPV0VSVVBTID0gW1wiZXh0cmFMaWZlXCIsIFwibXVsdGlCYWxsXCIsIFwic2hvcnRlclBhZGRsZVwiLCBcImxvbmdlclBhZGRsZVwiLCBcIm1pbmlCYWxsXCIsIFwibWVnYUJhbGxcIl07XG5jb25zdCBUT1RBTF9QT1dFUlVQX0NPVU5UID0gMTI7XG5cblxuY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgICAgIHRoaXMubGl2ZXMgPSBTVEFSVElOR19MSVZFUztcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKE9iamVjdC5hc3NpZ24oe30sIFBMQVlFUl9TVEFSVF9MT0NBVElPTikpO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5ibG9ja3MgPSBbXTtcbiAgICAgICAgdGhpcy5iYWxscyA9IFtuZXcgQmFsbChPYmplY3QuYXNzaWduKHt9LCBCQUxMX1NUQVJUX0xPQ0FUSU9OKSldO1xuICAgICAgICB0aGlzLmhlaWdodCA9IEhFSUdIVDtcbiAgICAgICAgdGhpcy53aWR0aCA9IFdJRFRIO1xuICAgICAgICB0aGlzLnRoZW1lQ29sb3IgPSBbXCIjYmRhZTU3XCJdO1xuICAgICAgICB0aGlzLm51bUJsb2NrcyA9IEJMT0NLU19OVU07XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBvd2VydXBDb3VudCA9IFRPVEFMX1BPV0VSVVBfQ09VTlQ7IFxuICAgICAgICB0aGlzLnBvd2VydXBzID0gUE9XRVJVUFM7XG4gICAgICAgIHRoaXMuYWN0aXZlUG93ZXJ1cHMgPSBbXTtcbiAgICAgICAgdGhpcy50b3RhbFBvd2VydXBzID0gW107XG4gICAgICAgIHRoaXMubW92aW5nUG93ZXJ1cHMgPSBbXTtcblxuICAgICAgICB0aGlzLmFkZEJsb2Nrcyh0aGlzLm51bUJsb2Nrcyk7XG4gICAgfTsgICBcbiAgICAgXG4gICAgYWRkQmxvY2tzKG4pIHtcbiAgICAgICAgbGV0IGJsb2NrUG9zWCA9IDEwO1xuICAgICAgICBsZXQgYmxvY2tQb3NZID0gMTA7XG4gICAgICAgIGxldCBpID0gMDtcblxuICAgICAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5ibG9ja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmRvbVBvd2VydXAgPSBuZXcgUG93ZXJ1cCh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIHRoaXMuZ2V0UmFuZG9tKHRoaXMucG93ZXJ1cHMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUG93ZXJ1cHMucHVzaChyYW5kb21Qb3dlcnVwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9jayh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIEJMT0NLX1dJRFRILCBCTE9DS19IRUlHSFQsIHJhbmRvbVBvd2VydXApKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvd2VydXBDb3VudCAtPSAxO1xuICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGJsb2NrUG9zWCArPSBCTE9DS19XSURUSDtcbiAgICAgICAgICAgIGlmIChibG9ja1Bvc1ggPiA4NzgpIHtcbiAgICAgICAgICAgICAgICBibG9ja1Bvc1ggPSAxMDtcbiAgICAgICAgICAgICAgICBibG9ja1Bvc1kgPSBibG9ja1Bvc1kgKz0gQkxPQ0tfSEVJR0hUO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgJSA2ID09PSAwICYmIHRoaXMucG93ZXJ1cENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCByYW5kb21Qb3dlcnVwID0gbmV3IFBvd2VydXAoeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCB0aGlzLmdldFJhbmRvbSh0aGlzLnBvd2VydXBzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbFBvd2VydXBzLnB1c2gocmFuZG9tUG93ZXJ1cCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCBCTE9DS19XSURUSCwgQkxPQ0tfSEVJR0hULCByYW5kb21Qb3dlcnVwKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3dlcnVwQ291bnQgLT0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCBCTE9DS19XSURUSCwgQkxPQ0tfSEVJR0hULCBudWxsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpICs9IDE7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5zaHVmZmxlQXJyKHRoaXMuYmxvY2tzKTtcbiAgICB9O1xuICAgIFxuICAgIHNodWZmbGVBcnIoYXJyKSB7XG4gICAgICAgIGFyci5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xuICAgIH1cblxuICAgIGdldFJhbmRvbShhcnIpIHtcbiAgICAgICAgcmV0dXJuIGFycltNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCkpXTtcbiAgICB9XG5cbiAgICBhbGxDdXJPYmplY3RzKCkge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KFt0aGlzLnBsYXllcl0sIHRoaXMuYmFsbHMsIHRoaXMuYmxvY2tzLCB0aGlzLm1vdmluZ1Bvd2VydXBzKTtcbiAgICB9O1xuXG4gICAgYWxsQ3VyTW92aW5nT2JqcygpIHtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChbdGhpcy5wbGF5ZXJdLCB0aGlzLmJhbGxzLCB0aGlzLm1vdmluZ1Bvd2VydXBzKTtcbiAgICB9O1xuIFxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMudGhlbWVDb2xvclswXTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMzBweCBTYW5zLVNlcmlmXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiIzhhODkxZlwiO1xuICAgICAgICBpZiAodGhpcy5saXZlcyA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGAke3RoaXMubGl2ZXN9IExpdmVzIExlZnRgLCA3NTAsIDU4MCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChgJHt0aGlzLmxpdmVzfSBMaWZlIExlZnRgLCA3NTAsIDU4MCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAodGhpcy5hY3RpdmVQb3dlcnVwcykge1xuICAgICAgICAvLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZVBvd2VydXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICAgICAgbGV0IHBvc1ggPSA1MDA7XG4gICAgICAgIC8vICAgICAgICAgbGV0IHBvc1kgPSA1MDA7IFxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGAke3RoaXMuYWN0aXZlUG93ZXJ1cHNbaV0udHlwZX1gLCBwb3NYLCBwb3NZKTtcbiAgICAgICAgLy8gICAgICAgICBwb3NYICs9IDQwO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFsbEN1ck9iamVjdHMoKS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICBvYmouZHJhdyh0aGlzLmN0eCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBtb3ZlT2JqZWN0cyhkZWx0YSkge1xuICAgICAgICBjb25zdCBtb3ZpbmdPYmogPSB0aGlzLmFsbEN1ck1vdmluZ09ianMoKTtcbiAgICAgICAgbW92aW5nT2JqLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgIG9iai5tb3ZlKGRlbHRhKTtcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBCYWxsICYmIHRoaXMuaXNPdXRPZkJvdW5kcyhvYmoucG9zLnkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmFsbHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVhdGhBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgUG93ZXJ1cCAmJiB0aGlzLmlzT3V0T2ZCb3VuZHMob2JqLnBvcy55KSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKG9iaik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2luZ2xlTW92ZShkZWx0YSkge1xuICAgICAgICB0aGlzLmNoZWNrRm9yQ29sbGlzaW9ucygpO1xuICAgICAgICB0aGlzLmNoZWNrRm9yV2FsbENvbGxpc2lvbnMoKTtcbiAgICAgICAgdGhpcy5tb3ZlT2JqZWN0cyhkZWx0YSk7XG5cbiAgICB9O1xuXG4gICAgaXNPdXRPZkJvdW5kcyhwb3NZKSB7XG4gICAgICAgIGlmIChwb3NZID4gKDU2MCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGRlYXRoQW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLmxpdmVzIC09IDE7XG4gICAgICAgIGlmICh0aGlzLmxpdmVzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJHYW1lIE92ZXIhXCJcbiAgICAgICAgfSBlbHNlIHsgICAgIFxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIud2lkdGggPSAxMjA7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3MgPSBPYmplY3QuYXNzaWduKHt9LCBQTEFZRVJfU1RBUlRfTE9DQVRJT04pO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgICAgICBpZiAodGhpcy5iYWxscy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iYWxscyA9IHRoaXMuYmFsbHMuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJhbGxzWzBdLnBvcyA9IE9iamVjdC5hc3NpZ24oe30sIEJBTExfU1RBUlRfTE9DQVRJT04pO1xuICAgICAgICAgICAgdGhpcy5iYWxsc1swXS5kaXIgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgICAgIHRoaXMuYmFsbHNbMF0udmVsID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgICAgICB0aGlzLmJhbGxzWzBdLnJhZGl1cyA9IDIwO1xuICAgICAgICAgICAgdGhpcy5iYWxsc1swXS5pbml0aWFsRmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVQb3dlcnVwcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5tb3ZpbmdQb3dlcnVwcyA9IFtdO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjaGVja0ZvcldhbGxDb2xsaXNpb25zKCkge1xuICAgICAgICBjb25zdCBhbGxNb3ZpbmdPYmogPSB0aGlzLmFsbEN1ck1vdmluZ09ianMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxNb3ZpbmdPYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IGFsbE1vdmluZ09ialtpXTtcbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgUGxheWVyKSAmJiAob2JqLnBvcy54IDwgMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLmxlZnRXYWxsQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIFBsYXllcikgJiYgKG9iai5wb3MueCA+ICg5MjAgLSBvYmoud2lkdGgpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoucmlnaHRXYWxsQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIEJhbGwpICYmIChvYmoucG9zLnggPCAob2JqLnJhZGl1cykpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLmxlZnRXYWxsQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIEJhbGwpICYmIChvYmoucG9zLnggPiAoOTIwIC0gb2JqLnJhZGl1cykpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnJpZ2h0V2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBCYWxsKSAmJiAob2JqLnBvcy55IDwgKG9iai5yYWRpdXMpIHx8IG9iai5wb3MueSA+ICg2MDAgLSBvYmoucmFkaXVzKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb3VuY2VTb3VuZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoudG9wV2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBpc092ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm51bUJsb2NrcyA9PT0gMCB8fCB0aGlzLmxpdmVzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNDb2xsaWRlZChvYmoxLCBvYmoyKSB7XG4gICAgICAgIGxldCBkeCA9IE1hdGguYWJzKG9iajIucG9zLnggLSBvYmoxLnBvcy54IC0gb2JqMS53aWR0aCAvIDIpO1xuICAgICAgICBsZXQgZHkgPSBNYXRoLmFicyhvYmoyLnBvcy55IC0gb2JqMS5wb3MueSAtIG9iajEuaGVpZ2h0IC8gMik7XG4gICAgICAgIGlmIChkeCA+IChvYmoxLndpZHRoIC8gMiArIG9iajIucmFkaXVzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoZHkgPiAob2JqMS5oZWlnaHQgLyAyICsgb2JqMi5yYWRpdXMpKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGR4IDw9IChvYmoxLndpZHRoIC8gMikpIHsgXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkeSA8PSAob2JqMS5oZWlnaHQgLyAyKSkgeyBcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyBcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGRYID0gZHggLSBvYmoxLndpZHRoIC8gMjtcbiAgICAgICAgbGV0IGRZID0gZHkgLSBvYmoyLndpZHRoIC8gMjtcbiAgICAgICAgcmV0dXJuIChkWCAqIGRYICsgZFkgKiBkWSA8PSAob2JqMi5yYWRpdXMgKiBvYmoyLnJhZGl1cykpO1xuICAgIH07XG5cbiAgICByZW1vdmUob2JqKSB7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBCbG9jaykge1xuICAgICAgICAgICAgaWYgKG9iai5wb3dlclVwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBVcCA9IHRoaXMudG90YWxQb3dlcnVwcy5pbmRleE9mKG9iai5wb3dlclVwKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmluZ1Bvd2VydXBzLnB1c2godGhpcy50b3RhbFBvd2VydXBzW3BVcF0pO1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxQb3dlcnVwcy5zcGxpY2UocFVwLDEpO1xuICAgICAgICAgICAgICAgIG9iai5wb3dlclVwLmluaXRpYXRlTW92ZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMubnVtQmxvY2tzIC09IDE7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5zcGxpY2UodGhpcy5ibG9ja3MuaW5kZXhPZihvYmopLCAxKTtcbiAgICAgICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBQb3dlcnVwKSB7XG4gICAgICAgICAgICBsZXQgcFVwID0gdGhpcy5tb3ZpbmdQb3dlcnVwcy5pbmRleE9mKG9iaik7XG4gICAgICAgICAgICB0aGlzLm1vdmluZ1Bvd2VydXBzLnNwbGljZShwVXAsIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEJhbGwpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbHMuc3BsaWNlKHRoaXMuYmFsbHMuaW5kZXhPZihvYmopLCAxKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY2hlY2tGb3JDb2xsaXNpb25zKCkge1xuICAgICAgICBjb25zdCBhbGxPYmogPSB0aGlzLmFsbEN1ck9iamVjdHMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxPYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGFsbE9iai5sZW5ndGg7IGogKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYmoxID0gYWxsT2JqW2ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9iajIgPSBhbGxPYmpbal07XG4gICAgICAgICAgICAgICAgaWYgKG9iajEgaW5zdGFuY2VvZiBQbGF5ZXIgJiYgb2JqMiBpbnN0YW5jZW9mIEJhbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRlZChvYmoxLCBvYmoyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwbGF5ZXJQb3NcIiwgb2JqMS5wb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJiYWxsUG9zXCIsIG9iajIucG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmFsbERpclwiLCBvYmoyLnZlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb3VuY2VTb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5jb2xsaWRlc1dpdGgob2JqMik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYmoxIGluc3RhbmNlb2YgUGxheWVyICYmIG9iajIgaW5zdGFuY2VvZiBQb3dlcnVwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkZWQob2JqMSwgb2JqMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGlkZXNXaXRoUG93ZXJ1cChvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVBvd2VydXBTb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUob2JqMik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYmoxIGluc3RhbmNlb2YgQmFsbCAmJiBvYmoyIGluc3RhbmNlb2YgQmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRlZChvYmoyLCBvYmoxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5U291bmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuY29sbGlkZXNXaXRoKG9iajIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUob2JqMik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbGxpZGVzV2l0aFBvd2VydXAocG93ZXJ1cCkge1xuICAgICAgICBzd2l0Y2ggKHBvd2VydXAudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImV4dHJhTGlmZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGl2ZXMgKz0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtdWx0aUJhbGxcIjpcbiAgICAgICAgICAgICAgICBsZXQgbmV3ZXJCYWxscyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuYmFsbHMuZm9yRWFjaChiYWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0JhbGxzID0gW25ldyBCYWxsKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYmFsbHNbMF0ucG9zKSwgdHJ1ZSksIG5ldyBCYWxsKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYmFsbHNbMF0ucG9zKSwgdHJ1ZSldO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1swXS52ZWwueSA9IC0xMDA7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzBdLnZlbC54ID0gLTUwO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1swXS5kaXIueCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1swXS5kaXIueSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1sxXS52ZWwueSA9IC0xMDA7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzBdLnZlbC54ID0gNTA7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzFdLmRpci54ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzFdLmRpci55ID0gMTtcblxuICAgICAgICAgICAgICAgICAgICBuZXdlckJhbGxzLmNvbmNhdChuZXdCYWxscyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJhbGxzID0gdGhpcy5iYWxscy5jb25jYXQobmV3ZXJCYWxscyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtZWdhQmFsbFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYmFsbHMuZm9yRWFjaChiYWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYmFsbC5yYWRpdXMgKj0gMS41O1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnZlbC54ICo9IDAuNzU7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwudmVsLnkgKj0gMC43NTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzaG9ydGVyUGFkZGxlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIud2lkdGggPSB0aGlzLnBsYXllci53aWR0aCAtPSAyMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsb25nZXJQYWRkbGVcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci53aWR0aCA9IHRoaXMucGxheWVyLndpZHRoICs9IDIwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1pbmlCYWxsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5iYWxscy5mb3JFYWNoKGJhbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnJhZGl1cyAqPSAwLjU7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwudmVsLnggKj0gMS4yNTtcbiAgICAgICAgICAgICAgICAgICAgYmFsbC52ZWwueSAqPSAxLjI1O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFjdGl2ZVBvd2VydXBzLnB1c2gocG93ZXJ1cCk7XG4gICAgfTtcblxuICAgIHBsYXlTb3VuZCgpIHtcbiAgICAgICAgY29uc3QgYmFsbFNvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibG9ja1NvdW5kXCIpO1xuICAgICAgICBiYWxsU291bmQuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICBiYWxsU291bmQucGxheSgpO1xuICAgIH07XG5cbiAgICBwbGF5Qm91bmNlU291bmQoKSB7XG4gICAgICAgIGNvbnN0IGFub3RoZXJTb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5vdGhlclNvdW5kXCIpO1xuICAgICAgICBhbm90aGVyU291bmQuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICBhbm90aGVyU291bmQucGxheSgpO1xuICAgIH07XG5cbiAgICBwbGF5UG93ZXJ1cFNvdW5kKCkge1xuICAgICAgICBjb25zdCBwb3dlcnVwU291bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvd2VydXBTb3VuZFwiKTtcbiAgICAgICAgcG93ZXJ1cFNvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgcG93ZXJ1cFNvdW5kLnBsYXkoKTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsIlxuY2xhc3MgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIHZlbCwgcmFkaXVzKSB7XG4gICAgICAgIHRoaXMucG9zID0gcG9zO1xuICAgICAgICB0aGlzLnZlbCA9IHZlbDtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgfTtcblxuICAgIG1vdmUoZGVsdGFUaW1lKSB7XG4gICAgICAgIGxldCBuZXdEaXN0YW5jZVggPSB0aGlzLnZlbC54ICogZGVsdGFUaW1lO1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VZID0gdGhpcy52ZWwueSAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueCA9IHRoaXMucG9zLnggKyBuZXdEaXN0YW5jZVg7XG4gICAgICAgIHRoaXMucG9zLnkgPSB0aGlzLnBvcy55ICsgbmV3RGlzdGFuY2VZO1xuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb3ZpbmdPYmplY3Q7IiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL21vdmluZ19vYmplY3QnO1xuaW1wb3J0IEJhbGwgZnJvbSAnLi9iYWxsJztcbmNvbnN0IFBMQVlFUl9IRUlHSFQgPSAzMDtcbmNvbnN0IFBMQVlFUl9XSURUSCA9IDEyMDtcblxuY29uc3QgcmFuZG9tQ29sb3IgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlncyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuICAgIGxldCBjb2xvciA9IFwiI1wiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGNvbG9yICs9IGRpZ3NbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDE2KSldO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG59O1xuXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvcykge1xuICAgICAgICBzdXBlcihwb3MsIHsgeDogMCwgeTogMCB9KVxuICAgICAgICB0aGlzLmNvbG9yID0gcmFuZG9tQ29sb3IoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IFBMQVlFUl9XSURUSDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBQTEFZRVJfSEVJR0hUO1xuICAgIH07XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VYID0gdGhpcy52ZWwueCAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueCA9IHRoaXMucG9zLnggKyBuZXdEaXN0YW5jZVg7XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH07XG5cbiAgICAvLyBjb2xsaWRlc1dpdGgob3RoZXJPYmopIHtcbiAgICAvLyAgICAgaWYgKG90aGVyT2JqIGluc3RhbmNlb2YgQmFsbCkge1xuICAgIC8vICAgICAgICBpZiAob3RoZXJPYmouZGlyLnggPiAwKSB7XG4gICAgLy8gICAgICAgICAgICBvdGhlck9iai5kaXIueCA9IC1vdGhlck9iai5kaXIueDtcbiAgICAvLyAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgIG90aGVyT2JqLmRpci54ID0gb3RoZXJPYmouZGlyLng7XG4gICAgLy8gICAgICAgIH1cbiAgICAvLyAgICAgICAgIGlmIChvdGhlck9iai5kaXIueSA+IDApIHtcbiAgICAvLyAgICAgICAgICAgICBvdGhlck9iai5kaXIueSA9IG90aGVyT2JqLmRpci55O1xuICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICBvdGhlck9iai5kaXIueCA9IC1vdGhlck9iai5kaXIueDtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIG90aGVyT2JqLnNwZWVkID0gLU1hdGguYWJzKG90aGVyT2JqLnNwZWVkKSAqIDEuMDU7XG4gICAgLy8gICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyAgICAgfTtcbiAgICAvLyB9O1xuXG4gICAgLy9jYW4gZGlyIHggYmUgc2V0IGhlcmU/IGkgYmV0IGl0IGNhblxuXG4gICAgY29sbGlkZXNXaXRoKG90aGVyT2JqKSB7XG4gICAgICAgIGlmIChvdGhlck9iaiBpbnN0YW5jZW9mIEJhbGwpIHtcblxuICAgICAgICAgICAgICAgIGlmIChvdGhlck9iai5wb3MueCA9PT0gKHRoaXMucG9zLnggKyA2MCkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnggPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLngpOyBcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnkgPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLnkpO1xuICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvdGhlck9iai5wb3MueCA8ICh0aGlzLnBvcy54ICsgNjApKSAge1xuICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueCA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueCk7XG4gICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci55ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci55KTsgXG4gICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC54ID0gLShvdGhlck9iai52ZWwueCk7IFxuICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnggPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLngpO1xuICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueSA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueSk7XG4gICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC54ID0gLShvdGhlck9iai52ZWwueCk7IFxuICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJiYWxsUG9zXCIsIG90aGVyT2JqLnBvcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImJhbGxWZWxcIiwgb3RoZXJPYmoudmVsKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFsbERpclwiLCBvdGhlck9iai5kaXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIC8vIGNvbGxpZGVzV2l0aChvdGhlck9iaikge1xuICAgIC8vICAgICBpZiAob3RoZXJPYmogaW5zdGFuY2VvZiBCYWxsKSB7XG4gICAgLy8gICAgICAgICBvdGhlck9iai5kaXIueCA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueCk7XG4gICAgLy8gICAgICAgICBvdGhlck9iai5kaXIueSA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueSk7XG4gICAgLy8gICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjE7XG4gICAgLy8gICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyAgICAgfTtcbiAgICAvLyB9O1xuXG4gICAgcmlnaHRXYWxsQ29sbGlzaW9uKCkge1xuICAgICAgICB0aGlzLnZlbC54ID0gLTEwMDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbGVmdFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnggPSAxMDA7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9tb3Zpbmdfb2JqZWN0Jztcbi8vIGltcG9ydCBleHRyYUxpZmUgZnJvbSBcbi8vIGltcG9ydCBtdWx0aUJhbGwgZnJvbSBcbi8vIGltcG9ydCBzaG9ydGVyUGFkZGxlIGZyb20gXG4vLyBpbXBvcnQgbG9uZ2VyUGFkZGxlIGZyb20gXG5cblxuY29uc3QgUE9XRVJVUF9SQURJVVMgPSAzMDtcblxuY29uc3QgcmFuZG9tQ29sb3IgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlncyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuICAgIGxldCBjb2xvciA9IFwiI1wiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGNvbG9yICs9IGRpZ3NbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDE2KSldO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG59O1xuXG4vLyBjb25zdCBQT1dFUlVQUyA9IFtcImV4dHJhTGlmZVwiLCBcIm11bHRpQmFsbFwiLCBcInNob3J0ZXJQYWRkbGVcIiwgXCJsb25nZXJQYWRkbGVcIl07XG5cbmNsYXNzIFBvd2VydXAgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gICAgY29uc3RydWN0b3IocG9zLCB0eXBlKSB7XG4gICAgICAgIHN1cGVyKHBvcywgeyB4OiAwLCB5OiAwIH0sIFBPV0VSVVBfUkFESVVTKVxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmNvbG9yID0gcmFuZG9tQ29sb3IoKTtcbiAgICB9O1xuICAgIFxuICAgIC8vIGRyYXcoY3R4KSB7XG4gICAgLy8gICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAvLyAgICAgc3dpdGNoKHRoaXMudHlwZSkge1xuICAgIC8vICAgICAgICAgY2FzZSBcImV4dHJhTGlmZVwiOlxuICAgIC8vICAgICAgICAgICAgIGltZy5zcmMgPSBleHRyYUxpZmU7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIFwibXVsdGlCYWxsXCI6XG4gICAgLy8gICAgICAgICAgICAgaW1nLnNyYyA9IG11bHRpQmFsbDtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgXCJzaG9ydGVyUGFkZGxlXCI6XG4gICAgLy8gICAgICAgICAgICAgaW1nLnNyYyA9IHNob3J0ZXJQYWRkbGU7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIFwibG9uZ2VyUGFkZGxlXCI6XG4gICAgLy8gICAgICAgICAgICAgaW1nLnNyYyA9IGxvbmdlclBhZGRsZTtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBjdHguc2F2ZSgpO1xuICAgIC8vICAgICBjdHguZHJhd0ltYWdlKGltZywgdGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzKTtcbiAgICAvLyAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAvLyB9XG5cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmModGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCB0cnVlKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9O1xuXG4gICAgaW5pdGlhdGVNb3ZlKCkge1xuICAgICAgICB0aGlzLnZlbC55ICs9IDIwMDtcbiAgICB9XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VZID0gdGhpcy52ZWwueSAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueSA9IHRoaXMucG9zLnkgKyBuZXdEaXN0YW5jZVk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvd2VydXA7IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vY2xhc3Nlcy9nYW1lXCI7XG5pbXBvcnQgR1ZpZXcgZnJvbSBcIi4vY2xhc3Nlcy9nX3ZpZXdcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGxldCBnaXRodWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdpdGh1YlwiKTtcbiAgICBnaXRodWIub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vbXdkZXNoYXcnO1xuICAgIH1cbiAgICBsZXQgbGlua2VkaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmtlZGluXCIpO1xuICAgIGxpbmtlZGluLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL21hdHRoZXctZGVzaGF3LWI2MjlhMGJhLyc7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWZhdWx0XCIpO1xuICAgIGNvbnN0IHBvd2VyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3dlci1idG5cIik7XG4gICAgcG93ZXJCdG4ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZGVmU2NyZWVuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYWN0aXZlXCIpO1xuICAgICAgICBjb25zdCBzdGFydFNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1zY3JlZW4nKTtcbiAgICAgICAgc3RhcnRTY3JlZW4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG5cbiAgICAgICAgY29uc3QgbGlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG93ZXItbHQnKTtcbiAgICAgICAgbGlnaHQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG5cbiAgICAgICAgY29uc3Qgc2NyZWVuVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnQtdGV4dFwiKTtcbiAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnN0cnVjdGlvbnNcIik7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udHJvbHMtbGlzdFwiKTtcblxuICAgICAgICBzY3JlZW5UZXh0LmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1nYW1lXCIpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lYm95U291bmRcIik7XG4gICAgICAgICAgICBhdWRpby5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgICAgIGNvbnRyb2xzTGlzdC5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICAgICAgc3RhcnRCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG4gICAgICAgIH0sIDMwMDApO1xuXG4gICAgICAgIHN0YXJ0QnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBzdGFydFNjcmVlbi5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kXCIpO1xuICAgICAgICAgICAgY29udHJvbHNMaXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICBzY3JlZW5UZXh0LmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkXCIpO1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShjdHgpO1xuICAgICAgICAgICAgbmV3IEdWaWV3KGdhbWUpLnN0YXJ0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGRlZlNjcmVlbi5jbGFzc0xpc3RbMF0gPT09IFwiYWN0aXZlXCIpIHtcbiAgICAgICAgICAgIHBvd2VyQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmU2NyZWVuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgICAgIHN0YXJ0QnRuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgICAgIHN0YXJ0U2NyZWVuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgICAgIHNjcmVlblRleHQuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgICAgICBjb250cm9sc0xpc3QuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgICAgICBsaWdodC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=