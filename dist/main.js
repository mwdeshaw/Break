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
    constructor(pos, initialFlag = false, type="normal") {
        super(pos, { x: 0, y: 0 }, BALL_RADIUS);
        this.color = randomColor();
        this.dir = { x: 0, y: 0 }
        this.initialFlag = initialFlag;
        this.spinSpeed = Math.random() * 60 + 30;
        this.type = type;
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
            if (this.type === "normal") {
                this.dir.x = -this.dir.x;
                this.dir.y = -this.dir.y;
                this.vel.y = -this.vel.y;
            } else {
                return null;
            };
        };
    };    

    // bounce() {
    //     if (this.dir.x !== 0 && this.dir.y !== 0) {
    //         this.dir.x = -this.dir.x;
    //         this.dir.y = -this.dir.y;
    //         this.vel.y = -this.vel.y;
    //     };
    // };    

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
            const startBtn = document.getElementById("start-game");
            const arrowDown = document.querySelector(".arrow-start");

            endScreen.classList.add("end");
            arrowDown.classList.add("end");
            startBtn.setAttribute("class", "active");
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
// const POWERUPS = ["extraLife", "multiBall", "shorterPaddle", "longerPaddle", "miniBall", "megaBall", "superBall"];
const POWERUPS = ["multiBall"];
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
                let newerBalls;
                this.balls.forEach(ball => {
                    let newBalls = [new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](Object.assign({}, this.balls[0].pos), true), new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](Object.assign({}, this.balls[0].pos), true)];
                    newBalls[0].vel.y = -Math.abs(ball.vel.y);
                    newBalls[0].vel.x = -Math.abs(ball.vel.x);
                    newBalls[0].dir.x = -1;
                    newBalls[0].dir.y = -1;
                    newBalls[0].type = ball.type;
                    newBalls[0].radius = ball.radius;
                    newBalls[0].color = ball.color;
                    newBalls[1].vel.y = -Math.abs(ball.vel.y);
                    newBalls[1].vel.x = -Math.abs(ball.vel.x * 0.5);
                    newBalls[1].dir.x = -1;
                    newBalls[1].dir.y = -1;
                    newBalls[1].type = ball.type;
                    newBalls[1].radius = ball.radius;
                    newBalls[1].color = ball.color;
                    newerBalls = newBalls;
                });
                this.balls = this.balls.concat(newerBalls);
            break;
            case "megaBall":
                this.balls.forEach(ball => {
                    ball.radius *= 1.75;
                    ball.vel.x *= 0.5;
                    ball.vel.y *= 0.5;
                });
                break;
            case "shorterPaddle":
                this.player.width = this.player.width *= 0.75;
                break;
            case "longerPaddle":
                this.player.width = this.player.width *= 1.25;
                break;
            case "miniBall":
                this.balls.forEach(ball => {
                    ball.radius *= 0.5;
                    ball.vel.x *= 1.25;
                    ball.vel.y *= 1.25;
                });
                break;
            case "superBall":
                this.balls.forEach(ball => {
                    ball.color = "#FFD700";
                    ball.type = "superBall";
                });
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
                    otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.05;
                } else if (otherObj.pos.x < (this.pos.x + 30) && otherObj.pos.x >= (this.pos.x))  {
                    if (otherObj.vel.x === 0) {
                        otherObj.vel.x = this.getRandom([-175, 175]);
                        otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.05;
                    } else if (otherObj.vel.x < 0) {
                        otherObj.dir.x = -Math.abs(otherObj.dir.x);
                        otherObj.dir.y = -Math.abs(otherObj.dir.y); 
                        otherObj.vel.x = -Math.abs(otherObj.vel.x); 
                        otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.05;
                    } else {
                        otherObj.dir.x = -Math.abs(otherObj.dir.x);
                        otherObj.dir.y = -Math.abs(otherObj.dir.y);
                        otherObj.vel.x = Math.abs(otherObj.vel.x); 
                        otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.05;
                    }
                } else {
                    if (otherObj.vel.x === 0) {
                        otherObj.vel.x = this.getRandom([-175, 175]);
                        otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.05;
                    } else if (otherObj.vel.x < 0) {
                        otherObj.dir.x = -Math.abs(otherObj.dir.x);
                        otherObj.dir.y = -Math.abs(otherObj.dir.y);
                        otherObj.vel.x = -Math.abs(otherObj.vel.x);
                        otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.05;
                    } else {
                        otherObj.dir.x = -Math.abs(otherObj.dir.x);
                        otherObj.dir.y = -Math.abs(otherObj.dir.y);
                        otherObj.vel.x = Math.abs(otherObj.vel.x);
                        otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.05;
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


const extraLife = new Image();
extraLife.src = './src/classes/extraLifePowerup.png';

const multiBall = new Image();
multiBall.src = './src/classes/powerupMultiBallFinal.png';

const shorterPaddle = new Image();
shorterPaddle.src = './src/classes/powerupSmallBat.png';

const longerPaddle = new Image();
longerPaddle.src = './src/classes/powerupBigBat.png';

const megaBall = new Image();
megaBall.src = './src/classes/powerupMegaball.png';

const miniBall = new Image();
miniBall.src = './src/classes/miniBallPowerup.png';

const superBall = new Image();
superBall.src = './src/classes/superBallPowerup.png';

const POWERUP_RADIUS = 50; 

class Powerup extends _moving_object__WEBPACK_IMPORTED_MODULE_0__["default"]{
    constructor(pos, type) {
        super(pos, { x: 0, y: 0 }, POWERUP_RADIUS)
        this.type = type;
    };

    draw(ctx) {
        let img;
        switch (this.type) {
            case "extraLife":
                img = extraLife;
                break;
            case "multiBall":
                img = multiBall;
                break;
            case "shorterPaddle":
                img = shorterPaddle;
                break;
            case "longerPaddle":
                img = longerPaddle;
                break;
            case "megaBall":
                img = megaBall;
                break;
            case "miniBall":
                img = miniBall;
                break;
            case "superBall":
                img = superBall;
                break;
            }
                ctx.save();
                ctx.drawImage(img, this.pos.x, this.pos.y, this.radius, this.radius);
                ctx.restore();
        };

    initiateMove() {
        this.vel.y += 150;
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
    const powerBtn = document.querySelector(".power-btn");
    powerBtn.classList.add("end");

    const arrow = document.querySelector(".arrow");
    powerBtn.onclick = () => {
        powerBtn.classList.remove("end");
        arrow.classList.add("end");
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
        const arrowDown = document.querySelector(".arrow-start");
        setTimeout(() => {
            const audio = document.getElementById("gameboySound");
            audio.currentTime = 0;
            audio.play();
            instructions.classList.add("end");
            controlsList.classList.add("end");
            startBtn.setAttribute("class", "active");
            arrowDown.classList.add("end");
        }, 3000);

        startBtn.onclick = () => {
            instructions.classList.remove("end");
            arrowDown.classList.remove("end");
            startScreen.removeAttribute("class");
            startBtn.removeAttribute("class");
            controlsList.classList.remove("end");
            screenText.classList.remove("end");
            const canvas = document.getElementById("board");
            const ctx = canvas.getContext("2d");
            const game = new _classes_game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
            new _classes_g_view__WEBPACK_IMPORTED_MODULE_1__["default"](game).start();
        };
    };
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvYmFsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9ibG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZ192aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbW92aW5nX29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvcG93ZXJ1cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBd0M7QUFDWDs7QUFFN0I7O0FBRUE7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVlLHNFQUFPLEU7Ozs7Ozs7Ozs7OztBQ3hFdEI7QUFBQTtBQUFBO0FBQWtDO0FBQ0c7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHFEQUFJO0FBQ2pDLGdCQUFnQix1REFBSztBQUNyQjtBQUNBO0FBQ0EsQ0FBQyxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBNb3ZpbmdPYmogZnJvbSAnLi9tb3Zpbmdfb2JqZWN0JztcbmltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2Nrcyc7XG5cbmNvbnN0IEJBTExfUkFESVVTID0gMjA7XG5cbmNvbnN0IHJhbmRvbUNvbG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpZ3MgPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcbiAgICBsZXQgY29sb3IgPSBcIiNcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBjb2xvciArPSBkaWdzW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxNikpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufTtcblxuY2xhc3MgQmFsbCBleHRlbmRzIE1vdmluZ09iaiB7XG4gICAgY29uc3RydWN0b3IocG9zLCBpbml0aWFsRmxhZyA9IGZhbHNlLCB0eXBlPVwibm9ybWFsXCIpIHtcbiAgICAgICAgc3VwZXIocG9zLCB7IHg6IDAsIHk6IDAgfSwgQkFMTF9SQURJVVMpO1xuICAgICAgICB0aGlzLmNvbG9yID0gcmFuZG9tQ29sb3IoKTtcbiAgICAgICAgdGhpcy5kaXIgPSB7IHg6IDAsIHk6IDAgfVxuICAgICAgICB0aGlzLmluaXRpYWxGbGFnID0gaW5pdGlhbEZsYWc7XG4gICAgICAgIHRoaXMuc3BpblNwZWVkID0gTWF0aC5yYW5kb20oKSAqIDYwICsgMzA7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmModGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCB0cnVlKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9O1xuXG4gICAgY29sbGlkZXNXaXRoKG90aGVyT2JqKSB7XG4gICAgICAgIGlmIChvdGhlck9iaiBpbnN0YW5jZW9mIEJsb2NrKSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5jZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJpZ2h0V2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueCA9IC1NYXRoLmFicyh0aGlzLnZlbC54KSAqIDAuOTU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGxlZnRXYWxsQ29sbGlzaW9uKCkge1xuICAgICAgICB0aGlzLnZlbC54ID0gTWF0aC5hYnModGhpcy52ZWwueCkgKiAwLjk1O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB0b3BXYWxsQ29sbGlzaW9uKCkge1xuICAgICAgICB0aGlzLnZlbC55ID0gTWF0aC5hYnModGhpcy52ZWwueSkgKiAwLjk1O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBib3VuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpci54ICE9PSAwICYmIHRoaXMuZGlyLnkgIT09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpci54ID0gLXRoaXMuZGlyLng7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXIueSA9IC10aGlzLmRpci55O1xuICAgICAgICAgICAgICAgIHRoaXMudmVsLnkgPSAtdGhpcy52ZWwueTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07ICAgIFxuXG4gICAgLy8gYm91bmNlKCkge1xuICAgIC8vICAgICBpZiAodGhpcy5kaXIueCAhPT0gMCAmJiB0aGlzLmRpci55ICE9PSAwKSB7XG4gICAgLy8gICAgICAgICB0aGlzLmRpci54ID0gLXRoaXMuZGlyLng7XG4gICAgLy8gICAgICAgICB0aGlzLmRpci55ID0gLXRoaXMuZGlyLnk7XG4gICAgLy8gICAgICAgICB0aGlzLnZlbC55ID0gLXRoaXMudmVsLnk7XG4gICAgLy8gICAgIH07XG4gICAgLy8gfTsgICAgXG5cbiAgICBpbml0aWFsUm90YXRpb24oKSB7XG4gICAgICAgIGxldCByYWRzID0gOTAgKiAoTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgIHRoaXMuZGlyLnggPSBNYXRoLmNvcyhyYWRzKTtcbiAgICAgICAgdGhpcy5kaXIueSA9IE1hdGguc2luKHJhZHMpO1xuICAgIH07XG5cbiAgICByb3RhdGUoZGVsdGFUaW1lKSB7XG4gICAgICAgIGlmICh0aGlzLmRpci55ICE9PSAwKSB7XG4gICAgICAgICAgICBsZXQgYW5nbGUgPSAtdGhpcy5zcGluU3BlZWQgKiAoTWF0aC5QSSAvIDE4MCkgKiBkZWx0YVRpbWU7XG4gICAgICAgICAgICBsZXQgdmVjdG9yID0gW3RoaXMuZGlyLngsIHRoaXMuZGlyLnldO1xuXG4gICAgICAgICAgICB2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICAgICAgdmFyIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcblxuICAgICAgICAgICAgdGhpcy5kaXIueCA9IE1hdGgucm91bmQoMTAwMDAgKiAodmVjdG9yWzBdICogY29zIC0gdmVjdG9yWzFdICogc2luKSkgLyAxMDAwMDtcbiAgICAgICAgICAgIHRoaXMuZGlyLnkgPSBNYXRoLnJvdW5kKDEwMDAwICogKHZlY3RvclswXSAqIHNpbiArIHZlY3RvclsxXSAqIGNvcykpIC8gMTAwMDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVCYWxsUmVsZWFzZShpbnB1dCwga2V5KSB7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsRmxhZyAmJiBrZXkgIT09IFwic3BhY2VcIikge1xuICAgICAgICAgICAgdGhpcy52ZWwueCArPSBpbnB1dFswXTtcbiAgICAgICAgICAgIHRoaXMudmVsLnkgKz0gaW5wdXRbMV07XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcInNwYWNlXCIgJiYgdGhpcy5kaXIueCA9PT0gMCAmJiB0aGlzLmRpci55ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnZlbC54ICs9IGlucHV0WzBdO1xuICAgICAgICAgICAgdGhpcy52ZWwueSArPSBpbnB1dFsxXTtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbFJvdGF0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbW92ZShkZWx0YVRpbWUpIHtcbiAgICAgICAgc3VwZXIubW92ZShkZWx0YVRpbWUpO1xuICAgICAgICB0aGlzLnJvdGF0ZShkZWx0YVRpbWUpO1xuICAgIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJhbGw7IiwiY29uc3QgcmFuZG9tQ29sb3IgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlncyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuICAgIGxldCBjb2xvciA9IFwiI1wiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGNvbG9yICs9IGRpZ3NbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDE2KSldO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG59O1xuXG5jbGFzcyBCbG9jayB7XG4gICAgY29uc3RydWN0b3IocG9zLCB3aWR0aCwgaGVpZ2h0LCBwb3dlclVwKSB7XG4gICAgICAgIHRoaXMucG9zID0gcG9zO1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmNvbG9yID0gcmFuZG9tQ29sb3IoKTtcbiAgICAgICAgdGhpcy5wb3dlclVwID0gcG93ZXJVcDtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCbG9jazsiLCJjbGFzcyBHVklFVyB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMuaW5wdXQgPSB7XG4gICAgICAgICAgICBzcGFjZTogWzAsIC0xNzVdXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGtleUhhbmRsZXIoKSB7ICAgXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlS2V5KGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUtleShldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBoYW5kbGVLZXkoZXZlbnQpIHtcbiAgICAgICAgbGV0IGlucHV0ID0gdGhpcy5pbnB1dDtcbiAgICAgICAgaWYgKCF0aGlzLmdhbWUuYmFsbHNbMF0uaW5pdGlhbEZsYWcpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgNjU6XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcImtleWRvd25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IC0zNTA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbHNbMF0udmVsLnggPSAtMzUwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbHNbMF0udmVsLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjg6XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcImtleWRvd25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IDM1MDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsc1swXS52ZWwueCA9IDM1MDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxzWzBdLnZlbC54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsc1swXS5pbml0aWFsRmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbHNbMF0uaGFuZGxlQmFsbFJlbGVhc2UoaW5wdXQuc3BhY2UsIE9iamVjdC5rZXlzKHRoaXMuaW5wdXQpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDY1OlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAtMzUwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2ODpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwia2V5ZG93blwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gMzUwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH07ICAgICBcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMua2V5SGFuZGxlcigpO1xuICAgICAgICB0aGlzLmxhc3RUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgYW5pbWF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmdhbWUuaXNPdmVyKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhVCA9IChuZXcgRGF0ZSgpIC0gdGhpcy5sYXN0VGltZSkgLyAxMDAwO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnNpbmdsZU1vdmUoZGVsdGFUKVxuICAgICAgICAgICAgdGhpcy5nYW1lLmRyYXcoKTtcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nYW1lLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5nYW1lLndpZHRoLCB0aGlzLmdhbWUuaGVpZ2h0KTtcbiAgICAgICAgICAgIGNvbnN0IGVuZFNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW5kLXNjcmVlblwiKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1nYW1lXCIpO1xuICAgICAgICAgICAgY29uc3QgYXJyb3dEb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hcnJvdy1zdGFydFwiKTtcblxuICAgICAgICAgICAgZW5kU2NyZWVuLmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgICAgICBhcnJvd0Rvd24uY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgICAgIHN0YXJ0QnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYWN0aXZlXCIpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR1ZJRVc7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBCYWxsIGZyb20gJy4vYmFsbCc7XG5pbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9ja3MnO1xuaW1wb3J0IFBvd2VydXAgZnJvbSAnLi9wb3dlcnVwJ1xuXG5jb25zdCBIRUlHSFQgPSA2MDA7XG5jb25zdCBXSURUSCA9IDkyMDtcbmNvbnN0IFBMQVlFUl9TVEFSVF9MT0NBVElPTiA9IHsgeDogMzk1LCB5OiA1NDAgfTtcbmNvbnN0IEJBTExfU1RBUlRfTE9DQVRJT04gPSB7IHg6IDQ1NSwgeTogNTAwIH07XG5jb25zdCBTVEFSVElOR19MSVZFUyA9IDM7XG5jb25zdCBCTE9DS19IRUlHSFQgPSA1MDtcbmNvbnN0IEJMT0NLX1dJRFRIID0gNTA7XG5jb25zdCBCTE9DS1NfTlVNID0gNzI7XG4vLyBjb25zdCBQT1dFUlVQUyA9IFtcImV4dHJhTGlmZVwiLCBcIm11bHRpQmFsbFwiLCBcInNob3J0ZXJQYWRkbGVcIiwgXCJsb25nZXJQYWRkbGVcIiwgXCJtaW5pQmFsbFwiLCBcIm1lZ2FCYWxsXCIsIFwic3VwZXJCYWxsXCJdO1xuY29uc3QgUE9XRVJVUFMgPSBbXCJtdWx0aUJhbGxcIl07XG5jb25zdCBUT1RBTF9QT1dFUlVQX0NPVU5UID0gMTI7XG5cblxuY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgICAgIHRoaXMubGl2ZXMgPSBTVEFSVElOR19MSVZFUztcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKE9iamVjdC5hc3NpZ24oe30sIFBMQVlFUl9TVEFSVF9MT0NBVElPTikpO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5ibG9ja3MgPSBbXTtcbiAgICAgICAgdGhpcy5iYWxscyA9IFtuZXcgQmFsbChPYmplY3QuYXNzaWduKHt9LCBCQUxMX1NUQVJUX0xPQ0FUSU9OKSldO1xuICAgICAgICB0aGlzLmhlaWdodCA9IEhFSUdIVDtcbiAgICAgICAgdGhpcy53aWR0aCA9IFdJRFRIO1xuICAgICAgICB0aGlzLnRoZW1lQ29sb3IgPSBbXCIjYmRhZTU3XCJdO1xuICAgICAgICB0aGlzLm51bUJsb2NrcyA9IEJMT0NLU19OVU07XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBvd2VydXBDb3VudCA9IFRPVEFMX1BPV0VSVVBfQ09VTlQ7IFxuICAgICAgICB0aGlzLnBvd2VydXBzID0gUE9XRVJVUFM7XG4gICAgICAgIHRoaXMuYWN0aXZlUG93ZXJ1cHMgPSBbXTtcbiAgICAgICAgdGhpcy50b3RhbFBvd2VydXBzID0gW107XG4gICAgICAgIHRoaXMubW92aW5nUG93ZXJ1cHMgPSBbXTtcblxuICAgICAgICB0aGlzLmFkZEJsb2Nrcyh0aGlzLm51bUJsb2Nrcyk7XG4gICAgfTsgICBcbiAgICAgXG4gICAgYWRkQmxvY2tzKG4pIHtcbiAgICAgICAgbGV0IGJsb2NrUG9zWCA9IDEwO1xuICAgICAgICBsZXQgYmxvY2tQb3NZID0gMTA7XG4gICAgICAgIGxldCBpID0gMDtcblxuICAgICAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5ibG9ja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmRvbVBvd2VydXAgPSBuZXcgUG93ZXJ1cCh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIHRoaXMuZ2V0UmFuZG9tKHRoaXMucG93ZXJ1cHMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUG93ZXJ1cHMucHVzaChyYW5kb21Qb3dlcnVwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9jayh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIEJMT0NLX1dJRFRILCBCTE9DS19IRUlHSFQsIHJhbmRvbVBvd2VydXApKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvd2VydXBDb3VudCAtPSAxO1xuICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGJsb2NrUG9zWCArPSBCTE9DS19XSURUSDtcbiAgICAgICAgICAgIGlmIChibG9ja1Bvc1ggPiA4NzgpIHtcbiAgICAgICAgICAgICAgICBibG9ja1Bvc1ggPSAxMDtcbiAgICAgICAgICAgICAgICBibG9ja1Bvc1kgPSBibG9ja1Bvc1kgKz0gQkxPQ0tfSEVJR0hUO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgJSA2ID09PSAwICYmIHRoaXMucG93ZXJ1cENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCByYW5kb21Qb3dlcnVwID0gbmV3IFBvd2VydXAoeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCB0aGlzLmdldFJhbmRvbSh0aGlzLnBvd2VydXBzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbFBvd2VydXBzLnB1c2gocmFuZG9tUG93ZXJ1cCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCBCTE9DS19XSURUSCwgQkxPQ0tfSEVJR0hULCByYW5kb21Qb3dlcnVwKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3dlcnVwQ291bnQgLT0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCBCTE9DS19XSURUSCwgQkxPQ0tfSEVJR0hULCBudWxsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpICs9IDE7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5zaHVmZmxlQXJyKHRoaXMuYmxvY2tzKTtcbiAgICB9O1xuICAgIFxuICAgIHNodWZmbGVBcnIoYXJyKSB7XG4gICAgICAgIGFyci5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xuICAgIH1cblxuICAgIGdldFJhbmRvbShhcnIpIHtcbiAgICAgICAgcmV0dXJuIGFycltNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCkpXTtcbiAgICB9XG5cbiAgICBhbGxDdXJPYmplY3RzKCkge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KFt0aGlzLnBsYXllcl0sIHRoaXMuYmFsbHMsIHRoaXMuYmxvY2tzLCB0aGlzLm1vdmluZ1Bvd2VydXBzKTtcbiAgICB9O1xuXG4gICAgYWxsQ3VyTW92aW5nT2JqcygpIHtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChbdGhpcy5wbGF5ZXJdLCB0aGlzLmJhbGxzLCB0aGlzLm1vdmluZ1Bvd2VydXBzKTtcbiAgICB9O1xuIFxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMudGhlbWVDb2xvclswXTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMzBweCBTYW5zLVNlcmlmXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiIzhhODkxZlwiO1xuICAgICAgICBpZiAodGhpcy5saXZlcyA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGAke3RoaXMubGl2ZXN9IExpdmVzIExlZnRgLCA3NTAsIDU4MCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChgJHt0aGlzLmxpdmVzfSBMaWZlIExlZnRgLCA3NTAsIDU4MCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFsbEN1ck9iamVjdHMoKS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICBvYmouZHJhdyh0aGlzLmN0eCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBtb3ZlT2JqZWN0cyhkZWx0YSkge1xuICAgICAgICBjb25zdCBtb3ZpbmdPYmogPSB0aGlzLmFsbEN1ck1vdmluZ09ianMoKTtcbiAgICAgICAgbW92aW5nT2JqLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgIG9iai5tb3ZlKGRlbHRhKTtcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBCYWxsICYmIHRoaXMuaXNPdXRPZkJvdW5kcyhvYmoucG9zLnkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmFsbHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVhdGhBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgUG93ZXJ1cCAmJiB0aGlzLmlzT3V0T2ZCb3VuZHMob2JqLnBvcy55KSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKG9iaik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2luZ2xlTW92ZShkZWx0YSkge1xuICAgICAgICB0aGlzLmNoZWNrRm9yQ29sbGlzaW9ucygpO1xuICAgICAgICB0aGlzLmNoZWNrRm9yV2FsbENvbGxpc2lvbnMoKTtcbiAgICAgICAgdGhpcy5tb3ZlT2JqZWN0cyhkZWx0YSk7XG4gICAgfTtcblxuICAgIGlzT3V0T2ZCb3VuZHMocG9zWSkge1xuICAgICAgICBpZiAocG9zWSA+ICg1NjApKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBkZWF0aEFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5saXZlcyAtPSAxO1xuICAgICAgICBpZiAodGhpcy5saXZlcyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiR2FtZSBPdmVyIVwiXG4gICAgICAgIH0gZWxzZSB7ICAgICBcbiAgICAgICAgICAgIHRoaXMucGxheWVyLndpZHRoID0gMTIwO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zID0gT2JqZWN0LmFzc2lnbih7fSwgUExBWUVSX1NUQVJUX0xPQ0FUSU9OKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnZlbCA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuYmFsbHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFsbHMgPSB0aGlzLmJhbGxzLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5iYWxsc1swXS5wb3MgPSBPYmplY3QuYXNzaWduKHt9LCBCQUxMX1NUQVJUX0xPQ0FUSU9OKTtcbiAgICAgICAgICAgIHRoaXMuYmFsbHNbMF0uZGlyID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgICAgICB0aGlzLmJhbGxzWzBdLnZlbCA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICAgICAgdGhpcy5iYWxsc1swXS5yYWRpdXMgPSAyMDtcbiAgICAgICAgICAgIHRoaXMuYmFsbHNbMF0uaW5pdGlhbEZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlUG93ZXJ1cHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubW92aW5nUG93ZXJ1cHMgPSBbXTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY2hlY2tGb3JXYWxsQ29sbGlzaW9ucygpIHtcbiAgICAgICAgY29uc3QgYWxsTW92aW5nT2JqID0gdGhpcy5hbGxDdXJNb3ZpbmdPYmpzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTW92aW5nT2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBhbGxNb3ZpbmdPYmpbaV07XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIFBsYXllcikgJiYgKG9iai5wb3MueCA8IDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5sZWZ0V2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBQbGF5ZXIpICYmIChvYmoucG9zLnggPiAoOTIwIC0gb2JqLndpZHRoKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnJpZ2h0V2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBCYWxsKSAmJiAob2JqLnBvcy54IDwgKG9iai5yYWRpdXMpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUJvdW5jZVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5sZWZ0V2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBCYWxsKSAmJiAob2JqLnBvcy54ID4gKDkyMCAtIG9iai5yYWRpdXMpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUJvdW5jZVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5yaWdodFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgQmFsbCkgJiYgKG9iai5wb3MueSA8IChvYmoucmFkaXVzKSB8fCBvYmoucG9zLnkgPiAoNjAwIC0gb2JqLnJhZGl1cykpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnRvcFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgaXNPdmVyKCkge1xuICAgICAgICBpZiAodGhpcy5udW1CbG9ja3MgPT09IDAgfHwgdGhpcy5saXZlcyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzQ29sbGlkZWQob2JqMSwgb2JqMikge1xuICAgICAgICBsZXQgZHggPSBNYXRoLmFicyhvYmoyLnBvcy54IC0gb2JqMS5wb3MueCAtIG9iajEud2lkdGggLyAyKTtcbiAgICAgICAgbGV0IGR5ID0gTWF0aC5hYnMob2JqMi5wb3MueSAtIG9iajEucG9zLnkgLSBvYmoxLmhlaWdodCAvIDIpO1xuICAgICAgICBpZiAoZHggPiAob2JqMS53aWR0aCAvIDIgKyBvYmoyLnJhZGl1cykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGR5ID4gKG9iajEuaGVpZ2h0IC8gMiArIG9iajIucmFkaXVzKSkgeyBcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkeCA8PSAob2JqMS53aWR0aCAvIDIpKSB7IFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7IFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZHkgPD0gKG9iajEuaGVpZ2h0IC8gMikpIHsgXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgXG4gICAgICAgIH07XG4gICAgICAgIGxldCBkWCA9IGR4IC0gb2JqMS53aWR0aCAvIDI7XG4gICAgICAgIGxldCBkWSA9IGR5IC0gb2JqMi53aWR0aCAvIDI7XG4gICAgICAgIHJldHVybiAoZFggKiBkWCArIGRZICogZFkgPD0gKG9iajIucmFkaXVzICogb2JqMi5yYWRpdXMpKTtcbiAgICB9O1xuXG4gICAgcmVtb3ZlKG9iaikge1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQmxvY2spIHtcbiAgICAgICAgICAgIGlmIChvYmoucG93ZXJVcCkge1xuICAgICAgICAgICAgICAgIGxldCBwVXAgPSB0aGlzLnRvdGFsUG93ZXJ1cHMuaW5kZXhPZihvYmoucG93ZXJVcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpbmdQb3dlcnVwcy5wdXNoKHRoaXMudG90YWxQb3dlcnVwc1twVXBdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUG93ZXJ1cHMuc3BsaWNlKHBVcCwxKTtcbiAgICAgICAgICAgICAgICBvYmoucG93ZXJVcC5pbml0aWF0ZU1vdmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm51bUJsb2NrcyAtPSAxO1xuICAgICAgICAgICAgdGhpcy5ibG9ja3Muc3BsaWNlKHRoaXMuYmxvY2tzLmluZGV4T2Yob2JqKSwgMSk7XG4gICAgICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgUG93ZXJ1cCkge1xuICAgICAgICAgICAgbGV0IHBVcCA9IHRoaXMubW92aW5nUG93ZXJ1cHMuaW5kZXhPZihvYmopO1xuICAgICAgICAgICAgdGhpcy5tb3ZpbmdQb3dlcnVwcy5zcGxpY2UocFVwLCAxKTtcbiAgICAgICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBCYWxsKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxzLnNwbGljZSh0aGlzLmJhbGxzLmluZGV4T2Yob2JqKSwgMSk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNoZWNrRm9yQ29sbGlzaW9ucygpIHtcbiAgICAgICAgY29uc3QgYWxsT2JqID0gdGhpcy5hbGxDdXJPYmplY3RzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsT2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBhbGxPYmoubGVuZ3RoOyBqICsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqMSA9IGFsbE9ialtpXTtcbiAgICAgICAgICAgICAgICBjb25zdCBvYmoyID0gYWxsT2JqW2pdO1xuICAgICAgICAgICAgICAgIGlmIChvYmoxIGluc3RhbmNlb2YgUGxheWVyICYmIG9iajIgaW5zdGFuY2VvZiBCYWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkZWQob2JqMSwgb2JqMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUJvdW5jZVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoxLmNvbGxpZGVzV2l0aChvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBQbGF5ZXIgJiYgb2JqMiBpbnN0YW5jZW9mIFBvd2VydXApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRlZChvYmoxLCBvYmoyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsaWRlc1dpdGhQb3dlcnVwKG9iajIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5UG93ZXJ1cFNvdW5kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBCYWxsICYmIG9iajIgaW5zdGFuY2VvZiBCbG9jaykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbGxpZGVkKG9iajIsIG9iajEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5jb2xsaWRlc1dpdGgob2JqMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29sbGlkZXNXaXRoUG93ZXJ1cChwb3dlcnVwKSB7XG4gICAgICAgIHN3aXRjaCAocG93ZXJ1cC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiZXh0cmFMaWZlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5saXZlcyArPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm11bHRpQmFsbFwiOlxuICAgICAgICAgICAgICAgIGxldCBuZXdlckJhbGxzO1xuICAgICAgICAgICAgICAgIHRoaXMuYmFsbHMuZm9yRWFjaChiYWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0JhbGxzID0gW25ldyBCYWxsKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYmFsbHNbMF0ucG9zKSwgdHJ1ZSksIG5ldyBCYWxsKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYmFsbHNbMF0ucG9zKSwgdHJ1ZSldO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1swXS52ZWwueSA9IC1NYXRoLmFicyhiYWxsLnZlbC55KTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMF0udmVsLnggPSAtTWF0aC5hYnMoYmFsbC52ZWwueCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzBdLmRpci54ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzBdLmRpci55ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzBdLnR5cGUgPSBiYWxsLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzBdLnJhZGl1cyA9IGJhbGwucmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1swXS5jb2xvciA9IGJhbGwuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzFdLnZlbC55ID0gLU1hdGguYWJzKGJhbGwudmVsLnkpO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1sxXS52ZWwueCA9IC1NYXRoLmFicyhiYWxsLnZlbC54ICogMC41KTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMV0uZGlyLnggPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMV0uZGlyLnkgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMV0udHlwZSA9IGJhbGwudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMV0ucmFkaXVzID0gYmFsbC5yYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzFdLmNvbG9yID0gYmFsbC5jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgbmV3ZXJCYWxscyA9IG5ld0JhbGxzO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYmFsbHMgPSB0aGlzLmJhbGxzLmNvbmNhdChuZXdlckJhbGxzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1lZ2FCYWxsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5iYWxscy5mb3JFYWNoKGJhbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnJhZGl1cyAqPSAxLjc1O1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnZlbC54ICo9IDAuNTtcbiAgICAgICAgICAgICAgICAgICAgYmFsbC52ZWwueSAqPSAwLjU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2hvcnRlclBhZGRsZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLndpZHRoID0gdGhpcy5wbGF5ZXIud2lkdGggKj0gMC43NTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsb25nZXJQYWRkbGVcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci53aWR0aCA9IHRoaXMucGxheWVyLndpZHRoICo9IDEuMjU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWluaUJhbGxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGxzLmZvckVhY2goYmFsbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwucmFkaXVzICo9IDAuNTtcbiAgICAgICAgICAgICAgICAgICAgYmFsbC52ZWwueCAqPSAxLjI1O1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnZlbC55ICo9IDEuMjU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic3VwZXJCYWxsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5iYWxscy5mb3JFYWNoKGJhbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBiYWxsLmNvbG9yID0gXCIjRkZENzAwXCI7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwudHlwZSA9IFwic3VwZXJCYWxsXCI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWN0aXZlUG93ZXJ1cHMucHVzaChwb3dlcnVwKTtcbiAgICB9O1xuXG4gICAgcGxheVNvdW5kKCkge1xuICAgICAgICBjb25zdCBiYWxsU291bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJsb2NrU291bmRcIik7XG4gICAgICAgIGJhbGxTb3VuZC5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIGJhbGxTb3VuZC5wbGF5KCk7XG4gICAgfTtcblxuICAgIHBsYXlCb3VuY2VTb3VuZCgpIHtcbiAgICAgICAgY29uc3QgYW5vdGhlclNvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbm90aGVyU291bmRcIik7XG4gICAgICAgIGFub3RoZXJTb3VuZC5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIGFub3RoZXJTb3VuZC5wbGF5KCk7XG4gICAgfTtcblxuICAgIHBsYXlQb3dlcnVwU291bmQoKSB7XG4gICAgICAgIGNvbnN0IHBvd2VydXBTb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG93ZXJ1cFNvdW5kXCIpO1xuICAgICAgICBwb3dlcnVwU291bmQuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICBwb3dlcnVwU291bmQucGxheSgpO1xuICAgIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiXG5jbGFzcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvcywgdmVsLCByYWRpdXMpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgICAgIHRoaXMudmVsID0gdmVsO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB9O1xuXG4gICAgbW92ZShkZWx0YVRpbWUpIHtcbiAgICAgICAgbGV0IG5ld0Rpc3RhbmNlWCA9IHRoaXMudmVsLnggKiBkZWx0YVRpbWU7XG4gICAgICAgIGxldCBuZXdEaXN0YW5jZVkgPSB0aGlzLnZlbC55ICogZGVsdGFUaW1lO1xuICAgICAgICB0aGlzLnBvcy54ID0gdGhpcy5wb3MueCArIG5ld0Rpc3RhbmNlWDtcbiAgICAgICAgdGhpcy5wb3MueSA9IHRoaXMucG9zLnkgKyBuZXdEaXN0YW5jZVk7XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1vdmluZ09iamVjdDsiLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vbW92aW5nX29iamVjdCc7XG5pbXBvcnQgQmFsbCBmcm9tICcuL2JhbGwnO1xuY29uc3QgUExBWUVSX0hFSUdIVCA9IDMwO1xuY29uc3QgUExBWUVSX1dJRFRIID0gMTIwO1xuXG5jb25zdCByYW5kb21Db2xvciA9ICgpID0+IHtcbiAgICBjb25zdCBkaWdzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgbGV0IGNvbG9yID0gXCIjXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29sb3IgKz0gZGlnc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTYpKV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjtcbn07XG5cbmNsYXNzIFBsYXllciBleHRlbmRzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zKSB7XG4gICAgICAgIHN1cGVyKHBvcywgeyB4OiAwLCB5OiAwIH0pXG4gICAgICAgIHRoaXMuY29sb3IgPSByYW5kb21Db2xvcigpO1xuICAgICAgICB0aGlzLndpZHRoID0gUExBWUVSX1dJRFRIO1xuICAgICAgICB0aGlzLmhlaWdodCA9IFBMQVlFUl9IRUlHSFQ7XG4gICAgfTtcblxuICAgIG1vdmUoZGVsdGFUaW1lKSB7XG4gICAgICAgIGxldCBuZXdEaXN0YW5jZVggPSB0aGlzLnZlbC54ICogZGVsdGFUaW1lO1xuICAgICAgICB0aGlzLnBvcy54ID0gdGhpcy5wb3MueCArIG5ld0Rpc3RhbmNlWDtcbiAgICB9O1xuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfTtcblxuICAgIGdldFJhbmRvbShhcnIpIHtcbiAgICAgICAgcmV0dXJuIGFycltNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCkpXTtcbiAgICB9XG5cbiAgICBjb2xsaWRlc1dpdGgob3RoZXJPYmopIHtcbiAgICAgICAgaWYgKG90aGVyT2JqIGluc3RhbmNlb2YgQmFsbCkge1xuICAgICAgICAgICAgaWYgKG90aGVyT2JqLnBvcy54ID49ICh0aGlzLnBvcy54ICsgMzApICYmIG90aGVyT2JqLnBvcy54IDw9ICh0aGlzLnBvcy54ICsgNjApICkge1xuICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueCA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueCk7IFxuICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueSA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueSk7XG4gICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC55ID0gLU1hdGguYWJzKG90aGVyT2JqLnZlbC55KSAqIDEuMDU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvdGhlck9iai5wb3MueCA8ICh0aGlzLnBvcy54ICsgMzApICYmIG90aGVyT2JqLnBvcy54ID49ICh0aGlzLnBvcy54KSkgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyT2JqLnZlbC54ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueCA9IHRoaXMuZ2V0UmFuZG9tKFstMTc1LCAxNzVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC55ID0gLU1hdGguYWJzKG90aGVyT2JqLnZlbC55KSAqIDEuMDU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3RoZXJPYmoudmVsLnggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueCA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueSA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueSk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnggPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLngpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC55ID0gLU1hdGguYWJzKG90aGVyT2JqLnZlbC55KSAqIDEuMDU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueCA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueSA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueCA9IE1hdGguYWJzKG90aGVyT2JqLnZlbC54KTsgXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjA1O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyT2JqLnZlbC54ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueCA9IHRoaXMuZ2V0UmFuZG9tKFstMTc1LCAxNzVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC55ID0gLU1hdGguYWJzKG90aGVyT2JqLnZlbC55KSAqIDEuMDU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3RoZXJPYmoudmVsLnggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueCA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueSA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueCA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjA1O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnggPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnkgPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnggPSBNYXRoLmFicyhvdGhlck9iai52ZWwueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjA1O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJpZ2h0V2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueCA9IC0xMDA7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGxlZnRXYWxsQ29sbGlzaW9uKCkge1xuICAgICAgICB0aGlzLnZlbC54ID0gMTAwO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vbW92aW5nX29iamVjdCc7XG5cbmNvbnN0IGV4dHJhTGlmZSA9IG5ldyBJbWFnZSgpO1xuZXh0cmFMaWZlLnNyYyA9ICcuL3NyYy9jbGFzc2VzL2V4dHJhTGlmZVBvd2VydXAucG5nJztcblxuY29uc3QgbXVsdGlCYWxsID0gbmV3IEltYWdlKCk7XG5tdWx0aUJhbGwuc3JjID0gJy4vc3JjL2NsYXNzZXMvcG93ZXJ1cE11bHRpQmFsbEZpbmFsLnBuZyc7XG5cbmNvbnN0IHNob3J0ZXJQYWRkbGUgPSBuZXcgSW1hZ2UoKTtcbnNob3J0ZXJQYWRkbGUuc3JjID0gJy4vc3JjL2NsYXNzZXMvcG93ZXJ1cFNtYWxsQmF0LnBuZyc7XG5cbmNvbnN0IGxvbmdlclBhZGRsZSA9IG5ldyBJbWFnZSgpO1xubG9uZ2VyUGFkZGxlLnNyYyA9ICcuL3NyYy9jbGFzc2VzL3Bvd2VydXBCaWdCYXQucG5nJztcblxuY29uc3QgbWVnYUJhbGwgPSBuZXcgSW1hZ2UoKTtcbm1lZ2FCYWxsLnNyYyA9ICcuL3NyYy9jbGFzc2VzL3Bvd2VydXBNZWdhYmFsbC5wbmcnO1xuXG5jb25zdCBtaW5pQmFsbCA9IG5ldyBJbWFnZSgpO1xubWluaUJhbGwuc3JjID0gJy4vc3JjL2NsYXNzZXMvbWluaUJhbGxQb3dlcnVwLnBuZyc7XG5cbmNvbnN0IHN1cGVyQmFsbCA9IG5ldyBJbWFnZSgpO1xuc3VwZXJCYWxsLnNyYyA9ICcuL3NyYy9jbGFzc2VzL3N1cGVyQmFsbFBvd2VydXAucG5nJztcblxuY29uc3QgUE9XRVJVUF9SQURJVVMgPSA1MDsgXG5cbmNsYXNzIFBvd2VydXAgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gICAgY29uc3RydWN0b3IocG9zLCB0eXBlKSB7XG4gICAgICAgIHN1cGVyKHBvcywgeyB4OiAwLCB5OiAwIH0sIFBPV0VSVVBfUkFESVVTKVxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBsZXQgaW1nO1xuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImV4dHJhTGlmZVwiOlxuICAgICAgICAgICAgICAgIGltZyA9IGV4dHJhTGlmZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtdWx0aUJhbGxcIjpcbiAgICAgICAgICAgICAgICBpbWcgPSBtdWx0aUJhbGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2hvcnRlclBhZGRsZVwiOlxuICAgICAgICAgICAgICAgIGltZyA9IHNob3J0ZXJQYWRkbGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibG9uZ2VyUGFkZGxlXCI6XG4gICAgICAgICAgICAgICAgaW1nID0gbG9uZ2VyUGFkZGxlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1lZ2FCYWxsXCI6XG4gICAgICAgICAgICAgICAgaW1nID0gbWVnYUJhbGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWluaUJhbGxcIjpcbiAgICAgICAgICAgICAgICBpbWcgPSBtaW5pQmFsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzdXBlckJhbGxcIjpcbiAgICAgICAgICAgICAgICBpbWcgPSBzdXBlckJhbGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgdGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzKTtcbiAgICAgICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICB9O1xuXG4gICAgaW5pdGlhdGVNb3ZlKCkge1xuICAgICAgICB0aGlzLnZlbC55ICs9IDE1MDtcbiAgICB9XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VZID0gdGhpcy52ZWwueSAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueSA9IHRoaXMucG9zLnkgKyBuZXdEaXN0YW5jZVk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvd2VydXA7IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vY2xhc3Nlcy9nYW1lXCI7XG5pbXBvcnQgR1ZpZXcgZnJvbSBcIi4vY2xhc3Nlcy9nX3ZpZXdcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGxldCBnaXRodWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdpdGh1YlwiKTtcbiAgICBnaXRodWIub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vbXdkZXNoYXcnO1xuICAgIH1cbiAgICBsZXQgbGlua2VkaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmtlZGluXCIpO1xuICAgIGxpbmtlZGluLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL21hdHRoZXctZGVzaGF3LWI2MjlhMGJhLyc7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWZhdWx0XCIpO1xuICAgIGNvbnN0IHBvd2VyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3dlci1idG5cIik7XG4gICAgcG93ZXJCdG4uY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcblxuICAgIGNvbnN0IGFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hcnJvd1wiKTtcbiAgICBwb3dlckJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBwb3dlckJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kXCIpO1xuICAgICAgICBhcnJvdy5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICBkZWZTY3JlZW4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG4gICAgICAgIGNvbnN0IHN0YXJ0U2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LXNjcmVlbicpO1xuICAgICAgICBzdGFydFNjcmVlbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcblxuICAgICAgICBjb25zdCBsaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3dlci1sdCcpO1xuICAgICAgICBsaWdodC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcblxuICAgICAgICBjb25zdCBzY3JlZW5UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydC10ZXh0XCIpO1xuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKTtcbiAgICAgICAgY29uc3QgY29udHJvbHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250cm9scy1saXN0XCIpO1xuXG4gICAgICAgIHNjcmVlblRleHQuY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWdhbWVcIik7XG4gICAgICAgIGNvbnN0IGFycm93RG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXJyb3ctc3RhcnRcIik7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVib3lTb3VuZFwiKTtcbiAgICAgICAgICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICAgICAgY29udHJvbHNMaXN0LmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgICAgICBzdGFydEJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIGFycm93RG93bi5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICB9LCAzMDAwKTtcblxuICAgICAgICBzdGFydEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICBhcnJvd0Rvd24uY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIHN0YXJ0U2NyZWVuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgc3RhcnRCdG4ucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICAgICAgICBjb250cm9sc0xpc3QuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIHNjcmVlblRleHQuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIik7XG4gICAgICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGN0eCk7XG4gICAgICAgICAgICBuZXcgR1ZpZXcoZ2FtZSkuc3RhcnQoKTtcbiAgICAgICAgfTtcbiAgICB9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==