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
/* harmony import */ var _blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks */ "./src/classes/blocks.js");



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
        if (otherObj instanceof _blocks__WEBPACK_IMPORTED_MODULE_1__["default"]) {
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
            this.vel.y += input[1];
            this.initialRotation();
        }
    };

    move(deltaTime) {
        super.move(deltaTime);
        this.rotate(deltaTime);
    };

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

    getRandom(arr) {
        return arr[Math.floor((Math.random() * arr.length))];
    }

    collidesWith(otherObj) {
        if (otherObj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) {
            if (otherObj.pos.x >= (this.pos.x + 30) && otherObj.pos.x <= (this.pos.x + 60) ) {
                    otherObj.dir.x = -Math.abs(otherObj.dir.x); 
                    otherObj.dir.y = -Math.abs(otherObj.dir.y);
                    otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.1;
                } else if (otherObj.pos.x < (this.pos.x + 30) && otherObj.pos.x >= (this.pos.x))  {
                    if (otherObj.vel.x === 0) {
                        otherObj.vel.x = this.getRandom([-175, 175]);
                        otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.1;
                    } else if (otherObj.vel.x < 0) {
                        otherObj.dir.x = -Math.abs(otherObj.dir.x);
                        otherObj.dir.y = -Math.abs(otherObj.dir.y); 
                        otherObj.vel.x = -Math.abs(otherObj.vel.x); 
                        otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.1;
                    } else {
                        otherObj.dir.x = -Math.abs(otherObj.dir.x);
                        otherObj.dir.y = -Math.abs(otherObj.dir.y);
                        otherObj.vel.x = Math.abs(otherObj.vel.x); 
                        otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.1;
                    }
                } else {
                    if (otherObj.vel.x === 0) {
                        otherObj.vel.x = this.getRandom([-175, 175]);
                        otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.1;
                    } else if (otherObj.vel.x < 0) {
                        otherObj.dir.x = -Math.abs(otherObj.dir.x);
                        otherObj.dir.y = -Math.abs(otherObj.dir.y);
                        otherObj.vel.x = -Math.abs(otherObj.vel.x);
                        otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.1;
                    } else {
                        otherObj.dir.x = -Math.abs(otherObj.dir.x);
                        otherObj.dir.y = -Math.abs(otherObj.dir.y);
                        otherObj.vel.x = Math.abs(otherObj.vel.x);
                        otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.1;
                    }
                }
            return true;
        };
    };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvYmFsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9ibG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZ192aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbW92aW5nX29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvcG93ZXJ1cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBd0M7QUFDWDs7QUFFN0I7O0FBRUE7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QUFDQTs7QUFFQTs7QUFFZSxzRUFBTyxFOzs7Ozs7Ozs7Ozs7QUNyRXRCO0FBQUE7QUFBQTtBQUFrQztBQUNHOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIscURBQUk7QUFDakMsZ0JBQWdCLHVEQUFLO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgTW92aW5nT2JqIGZyb20gJy4vbW92aW5nX29iamVjdCc7XG5pbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9ja3MnO1xuXG5jb25zdCBCQUxMX1JBRElVUyA9IDIwO1xuXG5jb25zdCByYW5kb21Db2xvciA9ICgpID0+IHtcbiAgICBjb25zdCBkaWdzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgbGV0IGNvbG9yID0gXCIjXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29sb3IgKz0gZGlnc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTYpKV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjtcbn07XG5cbmNsYXNzIEJhbGwgZXh0ZW5kcyBNb3ZpbmdPYmoge1xuICAgIGNvbnN0cnVjdG9yKHBvcywgaW5pdGlhbEZsYWcgPSBmYWxzZSkge1xuICAgICAgICBzdXBlcihwb3MsIHsgeDogMCwgeTogMCB9LCBCQUxMX1JBRElVUyk7XG4gICAgICAgIHRoaXMuY29sb3IgPSByYW5kb21Db2xvcigpO1xuICAgICAgICB0aGlzLmRpciA9IHsgeDogMCwgeTogMCB9XG4gICAgICAgIHRoaXMuaW5pdGlhbEZsYWcgPSBpbml0aWFsRmxhZztcbiAgICAgICAgdGhpcy5zcGluU3BlZWQgPSBNYXRoLnJhbmRvbSgpICogNjAgKyAzMDtcbiAgICB9O1xuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLnJhZGl1cywgMCwgMiAqIE1hdGguUEksIHRydWUpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH07XG5cbiAgICBjb2xsaWRlc1dpdGgob3RoZXJPYmopIHtcbiAgICAgICAgaWYgKG90aGVyT2JqIGluc3RhbmNlb2YgQmxvY2spIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmNlKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmlnaHRXYWxsQ29sbGlzaW9uKCkge1xuICAgICAgICB0aGlzLnZlbC54ID0gLU1hdGguYWJzKHRoaXMudmVsLngpICogMC45NTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbGVmdFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnggPSBNYXRoLmFicyh0aGlzLnZlbC54KSAqIDAuOTU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHRvcFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnkgPSBNYXRoLmFicyh0aGlzLnZlbC55KSAqIDAuOTU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGJvdW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlyLnggIT09IDAgJiYgdGhpcy5kaXIueSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kaXIueCA9IC10aGlzLmRpci54O1xuICAgICAgICAgICAgdGhpcy5kaXIueSA9IC10aGlzLmRpci55O1xuICAgICAgICAgICAgdGhpcy52ZWwueSA9IC10aGlzLnZlbC55O1xuICAgICAgICB9O1xuICAgIH07ICAgIFxuXG4gICAgaW5pdGlhbFJvdGF0aW9uKCkge1xuICAgICAgICBsZXQgcmFkcyA9IDkwICogKE1hdGguUEkgLyAxODApO1xuICAgICAgICB0aGlzLmRpci54ID0gTWF0aC5jb3MocmFkcyk7XG4gICAgICAgIHRoaXMuZGlyLnkgPSBNYXRoLnNpbihyYWRzKTtcbiAgICB9O1xuXG4gICAgcm90YXRlKGRlbHRhVGltZSkge1xuICAgICAgICBpZiAodGhpcy5kaXIueSAhPT0gMCkge1xuICAgICAgICAgICAgbGV0IGFuZ2xlID0gLXRoaXMuc3BpblNwZWVkICogKE1hdGguUEkgLyAxODApICogZGVsdGFUaW1lO1xuICAgICAgICAgICAgbGV0IHZlY3RvciA9IFt0aGlzLmRpci54LCB0aGlzLmRpci55XTtcblxuICAgICAgICAgICAgdmFyIGNvcyA9IE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgIHZhciBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGlyLnggPSBNYXRoLnJvdW5kKDEwMDAwICogKHZlY3RvclswXSAqIGNvcyAtIHZlY3RvclsxXSAqIHNpbikpIC8gMTAwMDA7XG4gICAgICAgICAgICB0aGlzLmRpci55ID0gTWF0aC5yb3VuZCgxMDAwMCAqICh2ZWN0b3JbMF0gKiBzaW4gKyB2ZWN0b3JbMV0gKiBjb3MpKSAvIDEwMDAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQmFsbFJlbGVhc2UoaW5wdXQsIGtleSkge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbEZsYWcgJiYga2V5ICE9PSBcInNwYWNlXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmVsLnggKz0gaW5wdXRbMF07XG4gICAgICAgICAgICB0aGlzLnZlbC55ICs9IGlucHV0WzFdO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJzcGFjZVwiICYmIHRoaXMuZGlyLnggPT09IDAgJiYgdGhpcy5kaXIueSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy52ZWwueCArPSBpbnB1dFswXTtcbiAgICAgICAgICAgIHRoaXMudmVsLnkgKz0gaW5wdXRbMV07XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxSb3RhdGlvbigpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIG1vdmUoZGVsdGFUaW1lKSB7XG4gICAgICAgIHN1cGVyLm1vdmUoZGVsdGFUaW1lKTtcbiAgICAgICAgdGhpcy5yb3RhdGUoZGVsdGFUaW1lKTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCYWxsOyIsImNvbnN0IHJhbmRvbUNvbG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpZ3MgPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcbiAgICBsZXQgY29sb3IgPSBcIiNcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBjb2xvciArPSBkaWdzW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxNikpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufTtcblxuY2xhc3MgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKHBvcywgd2lkdGgsIGhlaWdodCwgcG93ZXJVcCkge1xuICAgICAgICB0aGlzLnBvcyA9IHBvcztcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5jb2xvciA9IHJhbmRvbUNvbG9yKCk7XG4gICAgICAgIHRoaXMucG93ZXJVcCA9IHBvd2VyVXA7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQmxvY2s7IiwiY2xhc3MgR1ZJRVcge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmlucHV0ID0ge1xuICAgICAgICAgICAgc3BhY2U6IFswLCAtMTc1XVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBrZXlIYW5kbGVyKCkgeyAgIFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUtleShldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVLZXkoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaGFuZGxlS2V5KGV2ZW50KSB7XG4gICAgICAgIGxldCBpbnB1dCA9IHRoaXMuaW5wdXQ7XG4gICAgICAgIGlmICghdGhpcy5nYW1lLmJhbGxzWzBdLmluaXRpYWxGbGFnKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDY1OlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAtMzUwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxzWzBdLnZlbC54ID0gLTM1MDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxzWzBdLnZlbC54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDY4OlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAzNTA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbHNbMF0udmVsLnggPSAzNTA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsc1swXS52ZWwueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwia2V5ZG93blwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbHNbMF0uaW5pdGlhbEZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxzWzBdLmhhbmRsZUJhbGxSZWxlYXNlKGlucHV0LnNwYWNlLCBPYmplY3Qua2V5cyh0aGlzLmlucHV0KVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSA2NTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwia2V5ZG93blwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gLTM1MDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjg6XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcImtleWRvd25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IDM1MDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9OyAgICAgXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmtleUhhbmRsZXIoKTtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XG4gICAgfTtcblxuICAgIGFuaW1hdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5nYW1lLmlzT3ZlcigpKSB7XG4gICAgICAgICAgICBjb25zdCBkZWx0YVQgPSAobmV3IERhdGUoKSAtIHRoaXMubGFzdFRpbWUpIC8gMTAwMDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zaW5nbGVNb3ZlKGRlbHRhVClcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5kcmF3KCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLmhlaWdodCk7XG4gICAgICAgICAgICBjb25zdCBlbmRTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVuZC1zY3JlZW5cIik7XG4gICAgICAgICAgICBlbmRTY3JlZW4uY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdWSUVXOyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgQmFsbCBmcm9tICcuL2JhbGwnO1xuaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2tzJztcbmltcG9ydCBQb3dlcnVwIGZyb20gJy4vcG93ZXJ1cCdcblxuY29uc3QgSEVJR0hUID0gNjAwO1xuY29uc3QgV0lEVEggPSA5MjA7XG5jb25zdCBQTEFZRVJfU1RBUlRfTE9DQVRJT04gPSB7IHg6IDM5NSwgeTogNTQwIH07XG5jb25zdCBCQUxMX1NUQVJUX0xPQ0FUSU9OID0geyB4OiA0NTUsIHk6IDUwMCB9O1xuY29uc3QgU1RBUlRJTkdfTElWRVMgPSAzO1xuY29uc3QgQkxPQ0tfSEVJR0hUID0gNTA7XG5jb25zdCBCTE9DS19XSURUSCA9IDUwO1xuY29uc3QgQkxPQ0tTX05VTSA9IDcyO1xuY29uc3QgUE9XRVJVUFMgPSBbXCJleHRyYUxpZmVcIiwgXCJtdWx0aUJhbGxcIiwgXCJzaG9ydGVyUGFkZGxlXCIsIFwibG9uZ2VyUGFkZGxlXCIsIFwibWluaUJhbGxcIiwgXCJtZWdhQmFsbFwiXTtcbmNvbnN0IFRPVEFMX1BPV0VSVVBfQ09VTlQgPSAxMjtcblxuXG5jbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgpIHtcbiAgICAgICAgdGhpcy5saXZlcyA9IFNUQVJUSU5HX0xJVkVTO1xuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoT2JqZWN0LmFzc2lnbih7fSwgUExBWUVSX1NUQVJUX0xPQ0FUSU9OKSk7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmJsb2NrcyA9IFtdO1xuICAgICAgICB0aGlzLmJhbGxzID0gW25ldyBCYWxsKE9iamVjdC5hc3NpZ24oe30sIEJBTExfU1RBUlRfTE9DQVRJT04pKV07XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gSEVJR0hUO1xuICAgICAgICB0aGlzLndpZHRoID0gV0lEVEg7XG4gICAgICAgIHRoaXMudGhlbWVDb2xvciA9IFtcIiNiZGFlNTdcIl07XG4gICAgICAgIHRoaXMubnVtQmxvY2tzID0gQkxPQ0tTX05VTTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucG93ZXJ1cENvdW50ID0gVE9UQUxfUE9XRVJVUF9DT1VOVDsgXG4gICAgICAgIHRoaXMucG93ZXJ1cHMgPSBQT1dFUlVQUztcbiAgICAgICAgdGhpcy5hY3RpdmVQb3dlcnVwcyA9IFtdO1xuICAgICAgICB0aGlzLnRvdGFsUG93ZXJ1cHMgPSBbXTtcbiAgICAgICAgdGhpcy5tb3ZpbmdQb3dlcnVwcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuYWRkQmxvY2tzKHRoaXMubnVtQmxvY2tzKTtcbiAgICB9OyAgIFxuICAgICBcbiAgICBhZGRCbG9ja3Mobikge1xuICAgICAgICBsZXQgYmxvY2tQb3NYID0gMTA7XG4gICAgICAgIGxldCBibG9ja1Bvc1kgPSAxMDtcbiAgICAgICAgbGV0IGkgPSAwO1xuXG4gICAgICAgIHdoaWxlIChpIDwgbikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmJsb2Nrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tUG93ZXJ1cCA9IG5ldyBQb3dlcnVwKHsgeDogYmxvY2tQb3NYLCB5OiBibG9ja1Bvc1kgfSwgdGhpcy5nZXRSYW5kb20odGhpcy5wb3dlcnVwcykpO1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxQb3dlcnVwcy5wdXNoKHJhbmRvbVBvd2VydXApO1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tzLnB1c2gobmV3IEJsb2NrKHsgeDogYmxvY2tQb3NYLCB5OiBibG9ja1Bvc1kgfSwgQkxPQ0tfV0lEVEgsIEJMT0NLX0hFSUdIVCwgcmFuZG9tUG93ZXJ1cCkpO1xuICAgICAgICAgICAgICAgIHRoaXMucG93ZXJ1cENvdW50IC09IDE7XG4gICAgICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgYmxvY2tQb3NYICs9IEJMT0NLX1dJRFRIO1xuICAgICAgICAgICAgaWYgKGJsb2NrUG9zWCA+IDg3OCkge1xuICAgICAgICAgICAgICAgIGJsb2NrUG9zWCA9IDEwO1xuICAgICAgICAgICAgICAgIGJsb2NrUG9zWSA9IGJsb2NrUG9zWSArPSBCTE9DS19IRUlHSFQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSAlIDYgPT09IDAgJiYgdGhpcy5wb3dlcnVwQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmRvbVBvd2VydXAgPSBuZXcgUG93ZXJ1cCh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIHRoaXMuZ2V0UmFuZG9tKHRoaXMucG93ZXJ1cHMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUG93ZXJ1cHMucHVzaChyYW5kb21Qb3dlcnVwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9jayh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIEJMT0NLX1dJRFRILCBCTE9DS19IRUlHSFQsIHJhbmRvbVBvd2VydXApKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvd2VydXBDb3VudCAtPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9jayh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIEJMT0NLX1dJRFRILCBCTE9DS19IRUlHSFQsIG51bGwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLnNodWZmbGVBcnIodGhpcy5ibG9ja3MpO1xuICAgIH07XG4gICAgXG4gICAgc2h1ZmZsZUFycihhcnIpIHtcbiAgICAgICAgYXJyLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XG4gICAgfVxuXG4gICAgZ2V0UmFuZG9tKGFycikge1xuICAgICAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKSldO1xuICAgIH1cblxuICAgIGFsbEN1ck9iamVjdHMoKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoW3RoaXMucGxheWVyXSwgdGhpcy5iYWxscywgdGhpcy5ibG9ja3MsIHRoaXMubW92aW5nUG93ZXJ1cHMpO1xuICAgIH07XG5cbiAgICBhbGxDdXJNb3ZpbmdPYmpzKCkge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KFt0aGlzLnBsYXllcl0sIHRoaXMuYmFsbHMsIHRoaXMubW92aW5nUG93ZXJ1cHMpO1xuICAgIH07XG4gXG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy50aGVtZUNvbG9yWzBdO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIzMHB4IFNhbnMtU2VyaWZcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjOGE4OTFmXCI7XG4gICAgICAgIGlmICh0aGlzLmxpdmVzID4gMSkge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoYCR7dGhpcy5saXZlc30gTGl2ZXMgTGVmdGAsIDc1MCwgNTgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGAke3RoaXMubGl2ZXN9IExpZmUgTGVmdGAsIDc1MCwgNTgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmICh0aGlzLmFjdGl2ZVBvd2VydXBzKSB7XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aXZlUG93ZXJ1cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgICAgICBsZXQgcG9zWCA9IDUwMDtcbiAgICAgICAgLy8gICAgICAgICBsZXQgcG9zWSA9IDUwMDsgXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoYCR7dGhpcy5hY3RpdmVQb3dlcnVwc1tpXS50eXBlfWAsIHBvc1gsIHBvc1kpO1xuICAgICAgICAvLyAgICAgICAgIHBvc1ggKz0gNDA7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWxsQ3VyT2JqZWN0cygpLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgIG9iai5kcmF3KHRoaXMuY3R4KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIG1vdmVPYmplY3RzKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1vdmluZ09iaiA9IHRoaXMuYWxsQ3VyTW92aW5nT2JqcygpO1xuICAgICAgICBtb3ZpbmdPYmouZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgb2JqLm1vdmUoZGVsdGEpO1xuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEJhbGwgJiYgdGhpcy5pc091dE9mQm91bmRzKG9iai5wb3MueSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iYWxscy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWF0aEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKG9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQb3dlcnVwICYmIHRoaXMuaXNPdXRPZkJvdW5kcyhvYmoucG9zLnkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUob2JqKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzaW5nbGVNb3ZlKGRlbHRhKSB7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JDb2xsaXNpb25zKCk7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JXYWxsQ29sbGlzaW9ucygpO1xuICAgICAgICB0aGlzLm1vdmVPYmplY3RzKGRlbHRhKTtcblxuICAgIH07XG5cbiAgICBpc091dE9mQm91bmRzKHBvc1kpIHtcbiAgICAgICAgaWYgKHBvc1kgPiAoNTYwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZGVhdGhBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMubGl2ZXMgLT0gMTtcbiAgICAgICAgaWYgKHRoaXMubGl2ZXMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIkdhbWUgT3ZlciFcIlxuICAgICAgICB9IGVsc2UgeyAgICAgXG4gICAgICAgICAgICB0aGlzLnBsYXllci53aWR0aCA9IDEyMDtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBvcyA9IE9iamVjdC5hc3NpZ24oe30sIFBMQVlFUl9TVEFSVF9MT0NBVElPTik7XG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWwgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLmJhbGxzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGxzID0gdGhpcy5iYWxscy5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYmFsbHNbMF0ucG9zID0gT2JqZWN0LmFzc2lnbih7fSwgQkFMTF9TVEFSVF9MT0NBVElPTik7XG4gICAgICAgICAgICB0aGlzLmJhbGxzWzBdLmRpciA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICAgICAgdGhpcy5iYWxsc1swXS52ZWwgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgICAgIHRoaXMuYmFsbHNbMF0ucmFkaXVzID0gMjA7XG4gICAgICAgICAgICB0aGlzLmJhbGxzWzBdLmluaXRpYWxGbGFnID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVBvd2VydXBzID0gW107XG4gICAgICAgICAgICB0aGlzLm1vdmluZ1Bvd2VydXBzID0gW107XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNoZWNrRm9yV2FsbENvbGxpc2lvbnMoKSB7XG4gICAgICAgIGNvbnN0IGFsbE1vdmluZ09iaiA9IHRoaXMuYWxsQ3VyTW92aW5nT2JqcygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE1vdmluZ09iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gYWxsTW92aW5nT2JqW2ldO1xuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBQbGF5ZXIpICYmIChvYmoucG9zLnggPCAwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoubGVmdFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgUGxheWVyKSAmJiAob2JqLnBvcy54ID4gKDkyMCAtIG9iai53aWR0aCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5yaWdodFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgQmFsbCkgJiYgKG9iai5wb3MueCA8IChvYmoucmFkaXVzKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb3VuY2VTb3VuZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoubGVmdFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgQmFsbCkgJiYgKG9iai5wb3MueCA+ICg5MjAgLSBvYmoucmFkaXVzKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb3VuY2VTb3VuZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoucmlnaHRXYWxsQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIEJhbGwpICYmIChvYmoucG9zLnkgPCAob2JqLnJhZGl1cykgfHwgb2JqLnBvcy55ID4gKDYwMCAtIG9iai5yYWRpdXMpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUJvdW5jZVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai50b3BXYWxsQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGlzT3ZlcigpIHtcbiAgICAgICAgaWYgKHRoaXMubnVtQmxvY2tzID09PSAwIHx8IHRoaXMubGl2ZXMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0NvbGxpZGVkKG9iajEsIG9iajIpIHtcbiAgICAgICAgbGV0IGR4ID0gTWF0aC5hYnMob2JqMi5wb3MueCAtIG9iajEucG9zLnggLSBvYmoxLndpZHRoIC8gMik7XG4gICAgICAgIGxldCBkeSA9IE1hdGguYWJzKG9iajIucG9zLnkgLSBvYmoxLnBvcy55IC0gb2JqMS5oZWlnaHQgLyAyKTtcbiAgICAgICAgaWYgKGR4ID4gKG9iajEud2lkdGggLyAyICsgb2JqMi5yYWRpdXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChkeSA+IChvYmoxLmhlaWdodCAvIDIgKyBvYmoyLnJhZGl1cykpIHsgXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZHggPD0gKG9iajEud2lkdGggLyAyKSkgeyBcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGR5IDw9IChvYmoxLmhlaWdodCAvIDIpKSB7IFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7IFxuICAgICAgICB9O1xuICAgICAgICBsZXQgZFggPSBkeCAtIG9iajEud2lkdGggLyAyO1xuICAgICAgICBsZXQgZFkgPSBkeSAtIG9iajIud2lkdGggLyAyO1xuICAgICAgICByZXR1cm4gKGRYICogZFggKyBkWSAqIGRZIDw9IChvYmoyLnJhZGl1cyAqIG9iajIucmFkaXVzKSk7XG4gICAgfTtcblxuICAgIHJlbW92ZShvYmopIHtcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEJsb2NrKSB7XG4gICAgICAgICAgICBpZiAob2JqLnBvd2VyVXApIHtcbiAgICAgICAgICAgICAgICBsZXQgcFVwID0gdGhpcy50b3RhbFBvd2VydXBzLmluZGV4T2Yob2JqLnBvd2VyVXApO1xuICAgICAgICAgICAgICAgIHRoaXMubW92aW5nUG93ZXJ1cHMucHVzaCh0aGlzLnRvdGFsUG93ZXJ1cHNbcFVwXSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbFBvd2VydXBzLnNwbGljZShwVXAsMSk7XG4gICAgICAgICAgICAgICAgb2JqLnBvd2VyVXAuaW5pdGlhdGVNb3ZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5udW1CbG9ja3MgLT0gMTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLnNwbGljZSh0aGlzLmJsb2Nrcy5pbmRleE9mKG9iaiksIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFBvd2VydXApIHtcbiAgICAgICAgICAgIGxldCBwVXAgPSB0aGlzLm1vdmluZ1Bvd2VydXBzLmluZGV4T2Yob2JqKTtcbiAgICAgICAgICAgIHRoaXMubW92aW5nUG93ZXJ1cHMuc3BsaWNlKHBVcCwgMSk7XG4gICAgICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgQmFsbCkge1xuICAgICAgICAgICAgdGhpcy5iYWxscy5zcGxpY2UodGhpcy5iYWxscy5pbmRleE9mKG9iaiksIDEpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjaGVja0ZvckNvbGxpc2lvbnMoKSB7XG4gICAgICAgIGNvbnN0IGFsbE9iaiA9IHRoaXMuYWxsQ3VyT2JqZWN0cygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgYWxsT2JqLmxlbmd0aDsgaiArKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9iajEgPSBhbGxPYmpbaV07XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqMiA9IGFsbE9ialtqXTtcbiAgICAgICAgICAgICAgICBpZiAob2JqMSBpbnN0YW5jZW9mIFBsYXllciAmJiBvYmoyIGluc3RhbmNlb2YgQmFsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbGxpZGVkKG9iajEsIG9iajIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb3VuY2VTb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5jb2xsaWRlc1dpdGgob2JqMik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYmoxIGluc3RhbmNlb2YgUGxheWVyICYmIG9iajIgaW5zdGFuY2VvZiBQb3dlcnVwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkZWQob2JqMSwgb2JqMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGlkZXNXaXRoUG93ZXJ1cChvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVBvd2VydXBTb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUob2JqMik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYmoxIGluc3RhbmNlb2YgQmFsbCAmJiBvYmoyIGluc3RhbmNlb2YgQmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRlZChvYmoyLCBvYmoxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5U291bmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuY29sbGlkZXNXaXRoKG9iajIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUob2JqMik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbGxpZGVzV2l0aFBvd2VydXAocG93ZXJ1cCkge1xuICAgICAgICBzd2l0Y2ggKHBvd2VydXAudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImV4dHJhTGlmZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGl2ZXMgKz0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtdWx0aUJhbGxcIjpcbiAgICAgICAgICAgICAgICBsZXQgbmV3ZXJCYWxscyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuYmFsbHMuZm9yRWFjaChiYWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0JhbGxzID0gW25ldyBCYWxsKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYmFsbHNbMF0ucG9zKSwgdHJ1ZSksIG5ldyBCYWxsKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYmFsbHNbMF0ucG9zKSwgdHJ1ZSldO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1swXS52ZWwueSA9IC0xMDA7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzBdLnZlbC54ID0gLTUwO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1swXS5kaXIueCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1swXS5kaXIueSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1sxXS52ZWwueSA9IC0xMDA7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzBdLnZlbC54ID0gNTA7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzFdLmRpci54ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzFdLmRpci55ID0gMTtcblxuICAgICAgICAgICAgICAgICAgICBuZXdlckJhbGxzLmNvbmNhdChuZXdCYWxscyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJhbGxzID0gdGhpcy5iYWxscy5jb25jYXQobmV3ZXJCYWxscyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtZWdhQmFsbFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYmFsbHMuZm9yRWFjaChiYWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYmFsbC5yYWRpdXMgKj0gMS41O1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnZlbC54ICo9IDAuNzU7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwudmVsLnkgKj0gMC43NTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzaG9ydGVyUGFkZGxlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIud2lkdGggPSB0aGlzLnBsYXllci53aWR0aCAtPSAyMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsb25nZXJQYWRkbGVcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci53aWR0aCA9IHRoaXMucGxheWVyLndpZHRoICs9IDIwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1pbmlCYWxsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5iYWxscy5mb3JFYWNoKGJhbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnJhZGl1cyAqPSAwLjU7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwudmVsLnggKj0gMS4yNTtcbiAgICAgICAgICAgICAgICAgICAgYmFsbC52ZWwueSAqPSAxLjI1O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFjdGl2ZVBvd2VydXBzLnB1c2gocG93ZXJ1cCk7XG4gICAgfTtcblxuICAgIHBsYXlTb3VuZCgpIHtcbiAgICAgICAgY29uc3QgYmFsbFNvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibG9ja1NvdW5kXCIpO1xuICAgICAgICBiYWxsU291bmQuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICBiYWxsU291bmQucGxheSgpO1xuICAgIH07XG5cbiAgICBwbGF5Qm91bmNlU291bmQoKSB7XG4gICAgICAgIGNvbnN0IGFub3RoZXJTb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5vdGhlclNvdW5kXCIpO1xuICAgICAgICBhbm90aGVyU291bmQuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICBhbm90aGVyU291bmQucGxheSgpO1xuICAgIH07XG5cbiAgICBwbGF5UG93ZXJ1cFNvdW5kKCkge1xuICAgICAgICBjb25zdCBwb3dlcnVwU291bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvd2VydXBTb3VuZFwiKTtcbiAgICAgICAgcG93ZXJ1cFNvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgcG93ZXJ1cFNvdW5kLnBsYXkoKTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsIlxuY2xhc3MgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIHZlbCwgcmFkaXVzKSB7XG4gICAgICAgIHRoaXMucG9zID0gcG9zO1xuICAgICAgICB0aGlzLnZlbCA9IHZlbDtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgfTtcblxuICAgIG1vdmUoZGVsdGFUaW1lKSB7XG4gICAgICAgIGxldCBuZXdEaXN0YW5jZVggPSB0aGlzLnZlbC54ICogZGVsdGFUaW1lO1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VZID0gdGhpcy52ZWwueSAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueCA9IHRoaXMucG9zLnggKyBuZXdEaXN0YW5jZVg7XG4gICAgICAgIHRoaXMucG9zLnkgPSB0aGlzLnBvcy55ICsgbmV3RGlzdGFuY2VZO1xuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb3ZpbmdPYmplY3Q7IiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL21vdmluZ19vYmplY3QnO1xuaW1wb3J0IEJhbGwgZnJvbSAnLi9iYWxsJztcbmNvbnN0IFBMQVlFUl9IRUlHSFQgPSAzMDtcbmNvbnN0IFBMQVlFUl9XSURUSCA9IDEyMDtcblxuY29uc3QgcmFuZG9tQ29sb3IgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlncyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuICAgIGxldCBjb2xvciA9IFwiI1wiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGNvbG9yICs9IGRpZ3NbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDE2KSldO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG59O1xuXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvcykge1xuICAgICAgICBzdXBlcihwb3MsIHsgeDogMCwgeTogMCB9KVxuICAgICAgICB0aGlzLmNvbG9yID0gcmFuZG9tQ29sb3IoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IFBMQVlFUl9XSURUSDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBQTEFZRVJfSEVJR0hUO1xuICAgIH07XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VYID0gdGhpcy52ZWwueCAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueCA9IHRoaXMucG9zLnggKyBuZXdEaXN0YW5jZVg7XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH07XG5cbiAgICBnZXRSYW5kb20oYXJyKSB7XG4gICAgICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpKV07XG4gICAgfVxuXG4gICAgY29sbGlkZXNXaXRoKG90aGVyT2JqKSB7XG4gICAgICAgIGlmIChvdGhlck9iaiBpbnN0YW5jZW9mIEJhbGwpIHtcbiAgICAgICAgICAgIGlmIChvdGhlck9iai5wb3MueCA+PSAodGhpcy5wb3MueCArIDMwKSAmJiBvdGhlck9iai5wb3MueCA8PSAodGhpcy5wb3MueCArIDYwKSApIHtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnggPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLngpOyBcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnkgPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLnkpO1xuICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvdGhlck9iai5wb3MueCA8ICh0aGlzLnBvcy54ICsgMzApICYmIG90aGVyT2JqLnBvcy54ID49ICh0aGlzLnBvcy54KSkgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyT2JqLnZlbC54ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueCA9IHRoaXMuZ2V0UmFuZG9tKFstMTc1LCAxNzVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC55ID0gLU1hdGguYWJzKG90aGVyT2JqLnZlbC55KSAqIDEuMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvdGhlck9iai52ZWwueCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci54ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci55ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci55KTsgXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueCA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueCk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnkgPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLnkpICogMS4xO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnggPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnkgPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnggPSBNYXRoLmFicyhvdGhlck9iai52ZWwueCk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnkgPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLnkpICogMS4xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyT2JqLnZlbC54ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueCA9IHRoaXMuZ2V0UmFuZG9tKFstMTc1LCAxNzVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC55ID0gLU1hdGguYWJzKG90aGVyT2JqLnZlbC55KSAqIDEuMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvdGhlck9iai52ZWwueCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci54ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci55ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC54ID0gLU1hdGguYWJzKG90aGVyT2JqLnZlbC54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC55ID0gLU1hdGguYWJzKG90aGVyT2JqLnZlbC55KSAqIDEuMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci54ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci55ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC54ID0gTWF0aC5hYnMob3RoZXJPYmoudmVsLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnkgPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLnkpICogMS4xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJpZ2h0V2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueCA9IC0xMDA7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGxlZnRXYWxsQ29sbGlzaW9uKCkge1xuICAgICAgICB0aGlzLnZlbC54ID0gMTAwO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vbW92aW5nX29iamVjdCc7XG4vLyBpbXBvcnQgZXh0cmFMaWZlIGZyb20gXG4vLyBpbXBvcnQgbXVsdGlCYWxsIGZyb20gXG4vLyBpbXBvcnQgc2hvcnRlclBhZGRsZSBmcm9tIFxuLy8gaW1wb3J0IGxvbmdlclBhZGRsZSBmcm9tIFxuXG5cbmNvbnN0IFBPV0VSVVBfUkFESVVTID0gMzA7XG5cbmNvbnN0IHJhbmRvbUNvbG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpZ3MgPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcbiAgICBsZXQgY29sb3IgPSBcIiNcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBjb2xvciArPSBkaWdzW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxNikpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufTtcblxuLy8gY29uc3QgUE9XRVJVUFMgPSBbXCJleHRyYUxpZmVcIiwgXCJtdWx0aUJhbGxcIiwgXCJzaG9ydGVyUGFkZGxlXCIsIFwibG9uZ2VyUGFkZGxlXCJdO1xuXG5jbGFzcyBQb3dlcnVwIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICAgIGNvbnN0cnVjdG9yKHBvcywgdHlwZSkge1xuICAgICAgICBzdXBlcihwb3MsIHsgeDogMCwgeTogMCB9LCBQT1dFUlVQX1JBRElVUylcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5jb2xvciA9IHJhbmRvbUNvbG9yKCk7XG4gICAgfTtcbiAgICBcbiAgICAvLyBkcmF3KGN0eCkge1xuICAgIC8vICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgLy8gICAgIHN3aXRjaCh0aGlzLnR5cGUpIHtcbiAgICAvLyAgICAgICAgIGNhc2UgXCJleHRyYUxpZmVcIjpcbiAgICAvLyAgICAgICAgICAgICBpbWcuc3JjID0gZXh0cmFMaWZlO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgY2FzZSBcIm11bHRpQmFsbFwiOlxuICAgIC8vICAgICAgICAgICAgIGltZy5zcmMgPSBtdWx0aUJhbGw7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIFwic2hvcnRlclBhZGRsZVwiOlxuICAgIC8vICAgICAgICAgICAgIGltZy5zcmMgPSBzaG9ydGVyUGFkZGxlO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICAgICAgY2FzZSBcImxvbmdlclBhZGRsZVwiOlxuICAgIC8vICAgICAgICAgICAgIGltZy5zcmMgPSBsb25nZXJQYWRkbGU7XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgY3R4LnNhdmUoKTtcbiAgICAvLyAgICAgY3R4LmRyYXdJbWFnZShpbWcsIHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cyk7XG4gICAgLy8gICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgLy8gfVxuXG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSwgdHJ1ZSk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfTtcblxuICAgIGluaXRpYXRlTW92ZSgpIHtcbiAgICAgICAgdGhpcy52ZWwueSArPSAyMDA7XG4gICAgfVxuXG4gICAgbW92ZShkZWx0YVRpbWUpIHtcbiAgICAgICAgbGV0IG5ld0Rpc3RhbmNlWSA9IHRoaXMudmVsLnkgKiBkZWx0YVRpbWU7XG4gICAgICAgIHRoaXMucG9zLnkgPSB0aGlzLnBvcy55ICsgbmV3RGlzdGFuY2VZO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3dlcnVwOyIsImltcG9ydCBHYW1lIGZyb20gXCIuL2NsYXNzZXMvZ2FtZVwiO1xuaW1wb3J0IEdWaWV3IGZyb20gXCIuL2NsYXNzZXMvZ192aWV3XCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBsZXQgZ2l0aHViID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnaXRodWJcIik7XG4gICAgZ2l0aHViLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnaHR0cHM6Ly9naXRodWIuY29tL213ZGVzaGF3JztcbiAgICB9XG4gICAgbGV0IGxpbmtlZGluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5rZWRpblwiKTtcbiAgICBsaW5rZWRpbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9tYXR0aGV3LWRlc2hhdy1iNjI5YTBiYS8nO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZlNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVmYXVsdFwiKTtcbiAgICBjb25zdCBwb3dlckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG93ZXItYnRuXCIpO1xuICAgIHBvd2VyQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGRlZlNjcmVlbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcbiAgICAgICAgY29uc3Qgc3RhcnRTY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtc2NyZWVuJyk7XG4gICAgICAgIHN0YXJ0U2NyZWVuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYWN0aXZlXCIpO1xuXG4gICAgICAgIGNvbnN0IGxpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvd2VyLWx0Jyk7XG4gICAgICAgIGxpZ2h0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYWN0aXZlXCIpO1xuXG4gICAgICAgIGNvbnN0IHNjcmVlblRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0LXRleHRcIik7XG4gICAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdHJ1Y3Rpb25zXCIpO1xuICAgICAgICBjb25zdCBjb250cm9sc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRyb2xzLWxpc3RcIik7XG5cbiAgICAgICAgc2NyZWVuVGV4dC5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtZ2FtZVwiKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhdWRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZWJveVNvdW5kXCIpO1xuICAgICAgICAgICAgYXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgICAgICBjb250cm9sc0xpc3QuY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgICAgIHN0YXJ0QnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYWN0aXZlXCIpO1xuICAgICAgICB9LCAzMDAwKTtcblxuICAgICAgICBzdGFydEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgc3RhcnRTY3JlZW4ucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIGNvbnRyb2xzTGlzdC5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kXCIpO1xuICAgICAgICAgICAgc2NyZWVuVGV4dC5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kXCIpO1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICBjb25zdCBnYW1lID0gbmV3IEdhbWUoY3R4KTtcbiAgICAgICAgICAgIG5ldyBHVmlldyhnYW1lKS5zdGFydCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChkZWZTY3JlZW4uY2xhc3NMaXN0WzBdID09PSBcImFjdGl2ZVwiKSB7XG4gICAgICAgICAgICBwb3dlckJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRlZlNjcmVlbi5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICAgICAgICBzdGFydEJ0bi5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICAgICAgICBzdGFydFNjcmVlbi5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICAgICAgICBzY3JlZW5UZXh0LmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICAgICAgY29udHJvbHNMaXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICAgICAgbGlnaHQucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6IiJ9