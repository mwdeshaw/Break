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



const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

class Ball extends _moving_object__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(pos, radius, initialFlag = false, type="normal") {
        super(pos, { x: 0, y: 0 });
        this.color = randomColor();
        this.dir = { x: 0, y: 0 }
        this.initialFlag = initialFlag;
        this.spinSpeed = Math.random() * 60 + 30;
        this.type = type;
        this.radius = radius;
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
            space: [0, -Math.floor(this.game.height / 3.43)]
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
                        this.game.player.vel.x = -Math.floor(this.game.width / 2.63);
                        this.game.balls[0].vel.x = -Math.floor(this.game.width / 2.63);
                    } else {
                        this.game.player.vel.x = 0;
                        this.game.balls[0].vel.x = 0;
                    }
                    break;
                case 68:
                    if (event.type === "keydown") {
                        this.game.player.vel.x = Math.floor(this.game.width / 2.63);;
                        this.game.balls[0].vel.x = Math.floor(this.game.width / 2.63);;
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
                        this.game.player.vel.x = -Math.floor(this.game.width / 2.63);;
                    } else {
                        this.game.player.vel.x = 0;
                    }
                    break;
                case 68:
                    if (event.type === "keydown") {
                        this.game.player.vel.x = Math.floor(this.game.width / 2.63);;
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





const STARTING_LIVES = 1;
// const STARTING_LIVES = 3;
const BLOCKS_NUM = 96;
const POWERUPS = ["extraLife", "multiBall", "shorterPaddle", "longerPaddle", "miniBall", "megaBall", "superBall"];
const TOTAL_POWERUP_COUNT = 16;


class Game {
    constructor(ctx, width, height) {
        this.height = height;
        this.width = width;
        this.ctx = ctx;
        this.lives = STARTING_LIVES;
        this.blocks = [];

        this.playerWidth = Math.floor(this.width / 7.67);
        this.playerHeight = Math.floor(this.height / 20);
        this.playerStart = { x: Math.floor(this.width / 2.33), y: Math.floor(this.height * 0.88) };
        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"](Object.assign({}, this.playerStart), this.playerWidth, this.playerHeight, this.width, this.height);

        this.ballRadius = Math.floor(this.width * 0.02)
        this.ballStart = { x: Math.floor(this.width / 2.05), y: Math.floor(this.height * 0.8) };
        this.balls = [new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](Object.assign({}, this.ballStart), this.ballRadius)];

        this.themeColor = "#bdae57";

        this.numBlocks = BLOCKS_NUM;
        this.blockSize = Math.floor(this.width / 25);

        this.powerupCount = TOTAL_POWERUP_COUNT; 
        this.powerupSize = Math.floor(this.width * 0.055);
        this.powerups = POWERUPS;
        this.activePowerups = [];
        this.totalPowerups = [];
        this.movingPowerups = [];

        this.addBlocks(this.numBlocks);
    };   
     
    addBlocks(n) {
        let blockPosX = Math.floor(this.width / 92);
        let blockPosY = Math.floor(this.height * 0.02);
        let i = 0;

        while (i < n) {
            if (!this.blocks.length) {
                let randomPowerup = new _powerup__WEBPACK_IMPORTED_MODULE_3__["default"]({ x: blockPosX, y: blockPosY }, this.getRandom(this.powerups), this.powerupSize, this.width);
                this.totalPowerups.push(randomPowerup);
                this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]({ x: blockPosX, y: blockPosY }, this.blockSize, this.blockSize, randomPowerup));
                this.powerupCount -= 1;
                i += 1;
            } 

            blockPosX += this.blockSize;
            if (blockPosX > this.width - (this.width * 0.04)) {
                blockPosX = Math.floor(this.width / 92);
                blockPosY = blockPosY += this.blockSize;
            }
            if (i % 6 === 0 && this.powerupCount > 0) {
                let randomPowerup = new _powerup__WEBPACK_IMPORTED_MODULE_3__["default"]({ x: blockPosX, y: blockPosY }, this.getRandom(this.powerups), this.powerupSize, this.width);
                this.totalPowerups.push(randomPowerup);
                this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]({ x: blockPosX, y: blockPosY }, this.blockSize, this.blockSize, randomPowerup));
                this.powerupCount -= 1;
            } else {
                this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]({ x: blockPosX, y: blockPosY }, this.blockSize, this.blockSize, null));
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
        this.ctx.fillStyle = this.themeColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.ctx.font = "10px Sans-Serif";
        this.ctx.fillStyle = "#8a891f";
        if (this.lives > 1) {
            this.ctx.fillText(`${this.lives} Lives Left`, Math.floor(this.width * 0.5), Math.floor(this.height * 0.8));
        } else {
            this.ctx.fillText(`${this.lives} Lives Left`, Math.floor(this.width * 0.8), Math.floor(this.height * 0.8));
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
        if (posY > (Math.floor(this.height / 1.07))) {
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
            this.player.width = this.playerWidth;
            
            this.player.pos = Object.assign({}, this.playerStart);
            this.player.vel = { x: 0, y: 0 };
            if (this.balls.length > 1) {
                this.balls = this.balls.slice(0, 1);
            }
            this.balls[0].pos = Object.assign({}, this.ballStart);
            this.balls[0].dir = { x: 0, y: 0 };
            this.balls[0].vel = { x: 0, y: 0 };
            this.balls[0].radius = this.ballRadius;
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
            if ((obj instanceof _player__WEBPACK_IMPORTED_MODULE_0__["default"]) && (obj.pos.x > (this.width - obj.width))) {
                return obj.rightWallCollision();
            }
            if ((obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) && (obj.pos.x < (obj.radius))) {
                this.playBounceSound();
                return obj.leftWallCollision();
            }
            if ((obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) && (obj.pos.x > (this.width - obj.radius))) {
                this.playBounceSound();
                return obj.rightWallCollision();
            }
            if ((obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) && (obj.pos.y < (obj.radius) || obj.pos.y > (this.width - obj.radius))) {
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
                    let newBalls = [new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](Object.assign({}, this.balls[0].pos), this.ballRadius, true), new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](Object.assign({}, this.balls[0].pos), this.ballRadius, true)];
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
    constructor(pos, vel) {
        this.pos = pos;
        this.vel = vel;
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



const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

class Player extends _moving_object__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(pos, width, height, gameWidth, gameHeight) {
        super(pos, { x: 0, y: 0 })
        this.color = randomColor();
        this.width = width;
        this.height = height
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
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
            if (otherObj.pos.x >= (this.pos.x + this.height) && otherObj.pos.x <= (this.pos.x + Math.floor(this.width / 2)) ) {
                    otherObj.dir.x = -Math.abs(otherObj.dir.x); 
                    otherObj.dir.y = -Math.abs(otherObj.dir.y);
                    otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.05;
            } else if (otherObj.pos.x < (this.pos.x + this.height) && otherObj.pos.x >= (this.pos.x))  {
                    if (otherObj.vel.x === 0) {
                        otherObj.vel.x = this.getRandom([-Math.floor(this.gameWidth / 5.25), Math.floor(this.gameWidth / 5.25)]);
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
                        otherObj.vel.x = this.getRandom([-Math.floor(this.gameWidth / 5.25), Math.floor(this.gameWidth / 5.25)]);
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
        this.vel.x = -Math.floor(this.gameHeight / 6);
        return true;
    }

    leftWallCollision() {
        this.vel.x = Math.floor(this.gameHeight / 6);
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


class Powerup extends _moving_object__WEBPACK_IMPORTED_MODULE_0__["default"]{
    constructor(pos, type, radius, gameWidth) {
        super(pos, { x: 0, y: 0 })
        this.type = type;
        this.radius = radius;
        this.gameWidth = gameWidth;
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
        this.vel.y += Math.floor(this.gameWidth / 4);
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
    const canvas = document.getElementById("board");
    // const width = canvas.width;
    // const height = canvas.height;

    canvas.width = Math.floor(window.innerHeight / 0.43);
    canvas.height = Math.floor(window.innerWidth / 0.45);
    const height = canvas.height;
    const width = canvas.width;
    console.log(height);
    console.log(width);
    const ctx = canvas.getContext("2d");

    // width: 55vw;
    // height: 53vh;




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
            const game = new _classes_game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, width, height);
            new _classes_g_view__WEBPACK_IMPORTED_MODULE_1__["default"](game).start();
        };
    };
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvYmFsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9ibG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZ192aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbW92aW5nX29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvcG93ZXJ1cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBd0M7QUFDWDs7QUFFN0I7QUFDQTtB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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVlLHNFQUFPLEU7Ozs7Ozs7Ozs7OztBQ3pFdEI7QUFBQTtBQUFBO0FBQWtDO0FBQ0c7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIscURBQUk7QUFDakMsZ0JBQWdCLHVEQUFLO0FBQ3JCO0FBQ0E7QUFDQSxDQUFDLEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IE1vdmluZ09iaiBmcm9tICcuL21vdmluZ19vYmplY3QnO1xuaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2tzJztcblxuY29uc3QgcmFuZG9tQ29sb3IgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlncyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuICAgIGxldCBjb2xvciA9IFwiI1wiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGNvbG9yICs9IGRpZ3NbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDE2KSldO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG59O1xuXG5jbGFzcyBCYWxsIGV4dGVuZHMgTW92aW5nT2JqIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIHJhZGl1cywgaW5pdGlhbEZsYWcgPSBmYWxzZSwgdHlwZT1cIm5vcm1hbFwiKSB7XG4gICAgICAgIHN1cGVyKHBvcywgeyB4OiAwLCB5OiAwIH0pO1xuICAgICAgICB0aGlzLmNvbG9yID0gcmFuZG9tQ29sb3IoKTtcbiAgICAgICAgdGhpcy5kaXIgPSB7IHg6IDAsIHk6IDAgfVxuICAgICAgICB0aGlzLmluaXRpYWxGbGFnID0gaW5pdGlhbEZsYWc7XG4gICAgICAgIHRoaXMuc3BpblNwZWVkID0gTWF0aC5yYW5kb20oKSAqIDYwICsgMzA7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSwgdHJ1ZSk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfTtcblxuICAgIGNvbGxpZGVzV2l0aChvdGhlck9iaikge1xuICAgICAgICBpZiAob3RoZXJPYmogaW5zdGFuY2VvZiBCbG9jaykge1xuICAgICAgICAgICAgdGhpcy5ib3VuY2UoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByaWdodFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnggPSAtTWF0aC5hYnModGhpcy52ZWwueCkgKiAwLjk1O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBsZWZ0V2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueCA9IE1hdGguYWJzKHRoaXMudmVsLngpICogMC45NTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdG9wV2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueSA9IE1hdGguYWJzKHRoaXMudmVsLnkpICogMC45NTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgYm91bmNlKCkge1xuICAgICAgICBpZiAodGhpcy5kaXIueCAhPT0gMCAmJiB0aGlzLmRpci55ICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXIueCA9IC10aGlzLmRpci54O1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyLnkgPSAtdGhpcy5kaXIueTtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbC55ID0gLXRoaXMudmVsLnk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9OyAgICBcblxuICAgIGluaXRpYWxSb3RhdGlvbigpIHtcbiAgICAgICAgbGV0IHJhZHMgPSA5MCAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgdGhpcy5kaXIueCA9IE1hdGguY29zKHJhZHMpO1xuICAgICAgICB0aGlzLmRpci55ID0gTWF0aC5zaW4ocmFkcyk7XG4gICAgfTtcblxuICAgIHJvdGF0ZShkZWx0YVRpbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlyLnkgIT09IDApIHtcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IC10aGlzLnNwaW5TcGVlZCAqIChNYXRoLlBJIC8gMTgwKSAqIGRlbHRhVGltZTtcbiAgICAgICAgICAgIGxldCB2ZWN0b3IgPSBbdGhpcy5kaXIueCwgdGhpcy5kaXIueV07XG5cbiAgICAgICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICB2YXIgc2luID0gTWF0aC5zaW4oYW5nbGUpO1xuXG4gICAgICAgICAgICB0aGlzLmRpci54ID0gTWF0aC5yb3VuZCgxMDAwMCAqICh2ZWN0b3JbMF0gKiBjb3MgLSB2ZWN0b3JbMV0gKiBzaW4pKSAvIDEwMDAwO1xuICAgICAgICAgICAgdGhpcy5kaXIueSA9IE1hdGgucm91bmQoMTAwMDAgKiAodmVjdG9yWzBdICogc2luICsgdmVjdG9yWzFdICogY29zKSkgLyAxMDAwMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUJhbGxSZWxlYXNlKGlucHV0LCBrZXkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxGbGFnICYmIGtleSAhPT0gXCJzcGFjZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnZlbC54ICs9IGlucHV0WzBdO1xuICAgICAgICAgICAgdGhpcy52ZWwueSArPSBpbnB1dFsxXTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwic3BhY2VcIiAmJiB0aGlzLmRpci54ID09PSAwICYmIHRoaXMuZGlyLnkgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMudmVsLnggKz0gaW5wdXRbMF07XG4gICAgICAgICAgICB0aGlzLnZlbC55ICs9IGlucHV0WzFdO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsUm90YXRpb24oKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBzdXBlci5tb3ZlKGRlbHRhVGltZSk7XG4gICAgICAgIHRoaXMucm90YXRlKGRlbHRhVGltZSk7XG4gICAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQmFsbDsiLCJjb25zdCByYW5kb21Db2xvciA9ICgpID0+IHtcbiAgICBjb25zdCBkaWdzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgbGV0IGNvbG9yID0gXCIjXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29sb3IgKz0gZGlnc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTYpKV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjtcbn07XG5cbmNsYXNzIEJsb2NrIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIHdpZHRoLCBoZWlnaHQsIHBvd2VyVXApIHtcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuY29sb3IgPSByYW5kb21Db2xvcigpO1xuICAgICAgICB0aGlzLnBvd2VyVXAgPSBwb3dlclVwO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJsb2NrOyIsImNsYXNzIEdWSUVXIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKXtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5pbnB1dCA9IHtcbiAgICAgICAgICAgIHNwYWNlOiBbMCwgLU1hdGguZmxvb3IodGhpcy5nYW1lLmhlaWdodCAvIDMuNDMpXVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBrZXlIYW5kbGVyKCkgeyAgIFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUtleShldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVLZXkoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaGFuZGxlS2V5KGV2ZW50KSB7XG4gICAgICAgIGxldCBpbnB1dCA9IHRoaXMuaW5wdXQ7XG4gICAgICAgIGlmICghdGhpcy5nYW1lLmJhbGxzWzBdLmluaXRpYWxGbGFnKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDY1OlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAtTWF0aC5mbG9vcih0aGlzLmdhbWUud2lkdGggLyAyLjYzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsc1swXS52ZWwueCA9IC1NYXRoLmZsb29yKHRoaXMuZ2FtZS53aWR0aCAvIDIuNjMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbHNbMF0udmVsLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjg6XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcImtleWRvd25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IE1hdGguZmxvb3IodGhpcy5nYW1lLndpZHRoIC8gMi42Myk7O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxzWzBdLnZlbC54ID0gTWF0aC5mbG9vcih0aGlzLmdhbWUud2lkdGggLyAyLjYzKTs7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsc1swXS52ZWwueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwia2V5ZG93blwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbHNbMF0uaW5pdGlhbEZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxzWzBdLmhhbmRsZUJhbGxSZWxlYXNlKGlucHV0LnNwYWNlLCBPYmplY3Qua2V5cyh0aGlzLmlucHV0KVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSA2NTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwia2V5ZG93blwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gLU1hdGguZmxvb3IodGhpcy5nYW1lLndpZHRoIC8gMi42Myk7O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2ODpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwia2V5ZG93blwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gTWF0aC5mbG9vcih0aGlzLmdhbWUud2lkdGggLyAyLjYzKTs7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfTsgICAgIFxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5rZXlIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpO1xuICAgIH07XG5cbiAgICBhbmltYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZ2FtZS5pc092ZXIoKSkge1xuICAgICAgICAgICAgY29uc3QgZGVsdGFUID0gKG5ldyBEYXRlKCkgLSB0aGlzLmxhc3RUaW1lKSAvIDEwMDA7XG4gICAgICAgICAgICB0aGlzLmdhbWUuc2luZ2xlTW92ZShkZWx0YVQpXG4gICAgICAgICAgICB0aGlzLmdhbWUuZHJhdygpO1xuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmdhbWUud2lkdGgsIHRoaXMuZ2FtZS5oZWlnaHQpO1xuICAgICAgICAgICAgY29uc3QgZW5kU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbmQtc2NyZWVuXCIpO1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWdhbWVcIik7XG4gICAgICAgICAgICBjb25zdCBhcnJvd0Rvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFycm93LXN0YXJ0XCIpO1xuXG4gICAgICAgICAgICBlbmRTY3JlZW4uY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgICAgIGFycm93RG93bi5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICAgICAgc3RhcnRCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBHVklFVzsiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IEJhbGwgZnJvbSAnLi9iYWxsJztcbmltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2Nrcyc7XG5pbXBvcnQgUG93ZXJ1cCBmcm9tICcuL3Bvd2VydXAnXG5cbmNvbnN0IFNUQVJUSU5HX0xJVkVTID0gMTtcbi8vIGNvbnN0IFNUQVJUSU5HX0xJVkVTID0gMztcbmNvbnN0IEJMT0NLU19OVU0gPSA5NjtcbmNvbnN0IFBPV0VSVVBTID0gW1wiZXh0cmFMaWZlXCIsIFwibXVsdGlCYWxsXCIsIFwic2hvcnRlclBhZGRsZVwiLCBcImxvbmdlclBhZGRsZVwiLCBcIm1pbmlCYWxsXCIsIFwibWVnYUJhbGxcIiwgXCJzdXBlckJhbGxcIl07XG5jb25zdCBUT1RBTF9QT1dFUlVQX0NPVU5UID0gMTY7XG5cblxuY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmxpdmVzID0gU1RBUlRJTkdfTElWRVM7XG4gICAgICAgIHRoaXMuYmxvY2tzID0gW107XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJXaWR0aCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAvIDcuNjcpO1xuICAgICAgICB0aGlzLnBsYXllckhlaWdodCA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQgLyAyMCk7XG4gICAgICAgIHRoaXMucGxheWVyU3RhcnQgPSB7IHg6IE1hdGguZmxvb3IodGhpcy53aWR0aCAvIDIuMzMpLCB5OiBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0ICogMC44OCkgfTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGxheWVyU3RhcnQpLCB0aGlzLnBsYXllcldpZHRoLCB0aGlzLnBsYXllckhlaWdodCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIHRoaXMuYmFsbFJhZGl1cyA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAqIDAuMDIpXG4gICAgICAgIHRoaXMuYmFsbFN0YXJ0ID0geyB4OiBNYXRoLmZsb29yKHRoaXMud2lkdGggLyAyLjA1KSwgeTogTWF0aC5mbG9vcih0aGlzLmhlaWdodCAqIDAuOCkgfTtcbiAgICAgICAgdGhpcy5iYWxscyA9IFtuZXcgQmFsbChPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJhbGxTdGFydCksIHRoaXMuYmFsbFJhZGl1cyldO1xuXG4gICAgICAgIHRoaXMudGhlbWVDb2xvciA9IFwiI2JkYWU1N1wiO1xuXG4gICAgICAgIHRoaXMubnVtQmxvY2tzID0gQkxPQ0tTX05VTTtcbiAgICAgICAgdGhpcy5ibG9ja1NpemUgPSBNYXRoLmZsb29yKHRoaXMud2lkdGggLyAyNSk7XG5cbiAgICAgICAgdGhpcy5wb3dlcnVwQ291bnQgPSBUT1RBTF9QT1dFUlVQX0NPVU5UOyBcbiAgICAgICAgdGhpcy5wb3dlcnVwU2l6ZSA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAqIDAuMDU1KTtcbiAgICAgICAgdGhpcy5wb3dlcnVwcyA9IFBPV0VSVVBTO1xuICAgICAgICB0aGlzLmFjdGl2ZVBvd2VydXBzID0gW107XG4gICAgICAgIHRoaXMudG90YWxQb3dlcnVwcyA9IFtdO1xuICAgICAgICB0aGlzLm1vdmluZ1Bvd2VydXBzID0gW107XG5cbiAgICAgICAgdGhpcy5hZGRCbG9ja3ModGhpcy5udW1CbG9ja3MpO1xuICAgIH07ICAgXG4gICAgIFxuICAgIGFkZEJsb2NrcyhuKSB7XG4gICAgICAgIGxldCBibG9ja1Bvc1ggPSBNYXRoLmZsb29yKHRoaXMud2lkdGggLyA5Mik7XG4gICAgICAgIGxldCBibG9ja1Bvc1kgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0ICogMC4wMik7XG4gICAgICAgIGxldCBpID0gMDtcblxuICAgICAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5ibG9ja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmRvbVBvd2VydXAgPSBuZXcgUG93ZXJ1cCh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIHRoaXMuZ2V0UmFuZG9tKHRoaXMucG93ZXJ1cHMpLCB0aGlzLnBvd2VydXBTaXplLCB0aGlzLndpZHRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUG93ZXJ1cHMucHVzaChyYW5kb21Qb3dlcnVwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9jayh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIHRoaXMuYmxvY2tTaXplLCB0aGlzLmJsb2NrU2l6ZSwgcmFuZG9tUG93ZXJ1cCkpO1xuICAgICAgICAgICAgICAgIHRoaXMucG93ZXJ1cENvdW50IC09IDE7XG4gICAgICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgYmxvY2tQb3NYICs9IHRoaXMuYmxvY2tTaXplO1xuICAgICAgICAgICAgaWYgKGJsb2NrUG9zWCA+IHRoaXMud2lkdGggLSAodGhpcy53aWR0aCAqIDAuMDQpKSB7XG4gICAgICAgICAgICAgICAgYmxvY2tQb3NYID0gTWF0aC5mbG9vcih0aGlzLndpZHRoIC8gOTIpO1xuICAgICAgICAgICAgICAgIGJsb2NrUG9zWSA9IGJsb2NrUG9zWSArPSB0aGlzLmJsb2NrU2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpICUgNiA9PT0gMCAmJiB0aGlzLnBvd2VydXBDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tUG93ZXJ1cCA9IG5ldyBQb3dlcnVwKHsgeDogYmxvY2tQb3NYLCB5OiBibG9ja1Bvc1kgfSwgdGhpcy5nZXRSYW5kb20odGhpcy5wb3dlcnVwcyksIHRoaXMucG93ZXJ1cFNpemUsIHRoaXMud2lkdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxQb3dlcnVwcy5wdXNoKHJhbmRvbVBvd2VydXApO1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tzLnB1c2gobmV3IEJsb2NrKHsgeDogYmxvY2tQb3NYLCB5OiBibG9ja1Bvc1kgfSwgdGhpcy5ibG9ja1NpemUsIHRoaXMuYmxvY2tTaXplLCByYW5kb21Qb3dlcnVwKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3dlcnVwQ291bnQgLT0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCB0aGlzLmJsb2NrU2l6ZSwgdGhpcy5ibG9ja1NpemUsIG51bGwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLnNodWZmbGVBcnIodGhpcy5ibG9ja3MpO1xuICAgIH07XG4gICAgXG4gICAgc2h1ZmZsZUFycihhcnIpIHtcbiAgICAgICAgYXJyLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XG4gICAgfVxuXG4gICAgZ2V0UmFuZG9tKGFycikge1xuICAgICAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKSldO1xuICAgIH1cblxuICAgIGFsbEN1ck9iamVjdHMoKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoW3RoaXMucGxheWVyXSwgdGhpcy5iYWxscywgdGhpcy5ibG9ja3MsIHRoaXMubW92aW5nUG93ZXJ1cHMpO1xuICAgIH07XG5cbiAgICBhbGxDdXJNb3ZpbmdPYmpzKCkge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KFt0aGlzLnBsYXllcl0sIHRoaXMuYmFsbHMsIHRoaXMubW92aW5nUG93ZXJ1cHMpO1xuICAgIH07XG4gXG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy50aGVtZUNvbG9yO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIxMHB4IFNhbnMtU2VyaWZcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjOGE4OTFmXCI7XG4gICAgICAgIGlmICh0aGlzLmxpdmVzID4gMSkge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoYCR7dGhpcy5saXZlc30gTGl2ZXMgTGVmdGAsIE1hdGguZmxvb3IodGhpcy53aWR0aCAqIDAuNSksIE1hdGguZmxvb3IodGhpcy5oZWlnaHQgKiAwLjgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGAke3RoaXMubGl2ZXN9IExpdmVzIExlZnRgLCBNYXRoLmZsb29yKHRoaXMud2lkdGggKiAwLjgpLCBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0ICogMC44KSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFsbEN1ck9iamVjdHMoKS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICBvYmouZHJhdyh0aGlzLmN0eCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBtb3ZlT2JqZWN0cyhkZWx0YSkge1xuICAgICAgICBjb25zdCBtb3ZpbmdPYmogPSB0aGlzLmFsbEN1ck1vdmluZ09ianMoKTtcbiAgICAgICAgbW92aW5nT2JqLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgIG9iai5tb3ZlKGRlbHRhKTtcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBCYWxsICYmIHRoaXMuaXNPdXRPZkJvdW5kcyhvYmoucG9zLnkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmFsbHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVhdGhBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgUG93ZXJ1cCAmJiB0aGlzLmlzT3V0T2ZCb3VuZHMob2JqLnBvcy55KSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKG9iaik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2luZ2xlTW92ZShkZWx0YSkge1xuICAgICAgICB0aGlzLmNoZWNrRm9yQ29sbGlzaW9ucygpO1xuICAgICAgICB0aGlzLmNoZWNrRm9yV2FsbENvbGxpc2lvbnMoKTtcbiAgICAgICAgdGhpcy5tb3ZlT2JqZWN0cyhkZWx0YSk7XG4gICAgfTtcblxuICAgIGlzT3V0T2ZCb3VuZHMocG9zWSkge1xuICAgICAgICBpZiAocG9zWSA+IChNYXRoLmZsb29yKHRoaXMuaGVpZ2h0IC8gMS4wNykpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBkZWF0aEFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5saXZlcyAtPSAxO1xuICAgICAgICBpZiAodGhpcy5saXZlcyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiR2FtZSBPdmVyIVwiXG4gICAgICAgIH0gZWxzZSB7ICAgICBcbiAgICAgICAgICAgIHRoaXMucGxheWVyLndpZHRoID0gdGhpcy5wbGF5ZXJXaWR0aDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wbGF5ZXJTdGFydCk7XG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWwgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLmJhbGxzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGxzID0gdGhpcy5iYWxscy5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYmFsbHNbMF0ucG9zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5iYWxsU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5iYWxsc1swXS5kaXIgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgICAgIHRoaXMuYmFsbHNbMF0udmVsID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgICAgICB0aGlzLmJhbGxzWzBdLnJhZGl1cyA9IHRoaXMuYmFsbFJhZGl1cztcbiAgICAgICAgICAgIHRoaXMuYmFsbHNbMF0uaW5pdGlhbEZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlUG93ZXJ1cHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubW92aW5nUG93ZXJ1cHMgPSBbXTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY2hlY2tGb3JXYWxsQ29sbGlzaW9ucygpIHtcbiAgICAgICAgY29uc3QgYWxsTW92aW5nT2JqID0gdGhpcy5hbGxDdXJNb3ZpbmdPYmpzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTW92aW5nT2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBhbGxNb3ZpbmdPYmpbaV07XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIFBsYXllcikgJiYgKG9iai5wb3MueCA8IDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5sZWZ0V2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBQbGF5ZXIpICYmIChvYmoucG9zLnggPiAodGhpcy53aWR0aCAtIG9iai53aWR0aCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5yaWdodFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgQmFsbCkgJiYgKG9iai5wb3MueCA8IChvYmoucmFkaXVzKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb3VuY2VTb3VuZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoubGVmdFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgQmFsbCkgJiYgKG9iai5wb3MueCA+ICh0aGlzLndpZHRoIC0gb2JqLnJhZGl1cykpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnJpZ2h0V2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBCYWxsKSAmJiAob2JqLnBvcy55IDwgKG9iai5yYWRpdXMpIHx8IG9iai5wb3MueSA+ICh0aGlzLndpZHRoIC0gb2JqLnJhZGl1cykpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnRvcFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgaXNPdmVyKCkge1xuICAgICAgICBpZiAodGhpcy5udW1CbG9ja3MgPT09IDAgfHwgdGhpcy5saXZlcyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzQ29sbGlkZWQob2JqMSwgb2JqMikge1xuICAgICAgICBsZXQgZHggPSBNYXRoLmFicyhvYmoyLnBvcy54IC0gb2JqMS5wb3MueCAtIG9iajEud2lkdGggLyAyKTtcbiAgICAgICAgbGV0IGR5ID0gTWF0aC5hYnMob2JqMi5wb3MueSAtIG9iajEucG9zLnkgLSBvYmoxLmhlaWdodCAvIDIpO1xuICAgICAgICBpZiAoZHggPiAob2JqMS53aWR0aCAvIDIgKyBvYmoyLnJhZGl1cykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGR5ID4gKG9iajEuaGVpZ2h0IC8gMiArIG9iajIucmFkaXVzKSkgeyBcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkeCA8PSAob2JqMS53aWR0aCAvIDIpKSB7IFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7IFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZHkgPD0gKG9iajEuaGVpZ2h0IC8gMikpIHsgXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgXG4gICAgICAgIH07XG4gICAgICAgIGxldCBkWCA9IGR4IC0gb2JqMS53aWR0aCAvIDI7XG4gICAgICAgIGxldCBkWSA9IGR5IC0gb2JqMi53aWR0aCAvIDI7XG4gICAgICAgIHJldHVybiAoZFggKiBkWCArIGRZICogZFkgPD0gKG9iajIucmFkaXVzICogb2JqMi5yYWRpdXMpKTtcbiAgICB9O1xuXG4gICAgcmVtb3ZlKG9iaikge1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQmxvY2spIHtcbiAgICAgICAgICAgIGlmIChvYmoucG93ZXJVcCkge1xuICAgICAgICAgICAgICAgIGxldCBwVXAgPSB0aGlzLnRvdGFsUG93ZXJ1cHMuaW5kZXhPZihvYmoucG93ZXJVcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpbmdQb3dlcnVwcy5wdXNoKHRoaXMudG90YWxQb3dlcnVwc1twVXBdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUG93ZXJ1cHMuc3BsaWNlKHBVcCwxKTtcbiAgICAgICAgICAgICAgICBvYmoucG93ZXJVcC5pbml0aWF0ZU1vdmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm51bUJsb2NrcyAtPSAxO1xuICAgICAgICAgICAgdGhpcy5ibG9ja3Muc3BsaWNlKHRoaXMuYmxvY2tzLmluZGV4T2Yob2JqKSwgMSk7XG4gICAgICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgUG93ZXJ1cCkge1xuICAgICAgICAgICAgbGV0IHBVcCA9IHRoaXMubW92aW5nUG93ZXJ1cHMuaW5kZXhPZihvYmopO1xuICAgICAgICAgICAgdGhpcy5tb3ZpbmdQb3dlcnVwcy5zcGxpY2UocFVwLCAxKTtcbiAgICAgICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBCYWxsKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxzLnNwbGljZSh0aGlzLmJhbGxzLmluZGV4T2Yob2JqKSwgMSk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNoZWNrRm9yQ29sbGlzaW9ucygpIHtcbiAgICAgICAgY29uc3QgYWxsT2JqID0gdGhpcy5hbGxDdXJPYmplY3RzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsT2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBhbGxPYmoubGVuZ3RoOyBqICsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqMSA9IGFsbE9ialtpXTtcbiAgICAgICAgICAgICAgICBjb25zdCBvYmoyID0gYWxsT2JqW2pdO1xuICAgICAgICAgICAgICAgIGlmIChvYmoxIGluc3RhbmNlb2YgUGxheWVyICYmIG9iajIgaW5zdGFuY2VvZiBCYWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkZWQob2JqMSwgb2JqMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUJvdW5jZVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoxLmNvbGxpZGVzV2l0aChvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBQbGF5ZXIgJiYgb2JqMiBpbnN0YW5jZW9mIFBvd2VydXApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRlZChvYmoxLCBvYmoyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsaWRlc1dpdGhQb3dlcnVwKG9iajIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5UG93ZXJ1cFNvdW5kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBCYWxsICYmIG9iajIgaW5zdGFuY2VvZiBCbG9jaykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbGxpZGVkKG9iajIsIG9iajEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5jb2xsaWRlc1dpdGgob2JqMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29sbGlkZXNXaXRoUG93ZXJ1cChwb3dlcnVwKSB7XG4gICAgICAgIHN3aXRjaCAocG93ZXJ1cC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiZXh0cmFMaWZlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5saXZlcyArPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm11bHRpQmFsbFwiOlxuICAgICAgICAgICAgICAgIGxldCBuZXdlckJhbGxzO1xuICAgICAgICAgICAgICAgIHRoaXMuYmFsbHMuZm9yRWFjaChiYWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0JhbGxzID0gW25ldyBCYWxsKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYmFsbHNbMF0ucG9zKSwgdGhpcy5iYWxsUmFkaXVzLCB0cnVlKSwgbmV3IEJhbGwoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5iYWxsc1swXS5wb3MpLCB0aGlzLmJhbGxSYWRpdXMsIHRydWUpXTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMF0udmVsLnkgPSAtTWF0aC5hYnMoYmFsbC52ZWwueSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzBdLnZlbC54ID0gLU1hdGguYWJzKGJhbGwudmVsLngpO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1swXS5kaXIueCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1swXS5kaXIueSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1swXS50eXBlID0gYmFsbC50eXBlO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1swXS5yYWRpdXMgPSBiYWxsLnJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMF0uY29sb3IgPSBiYWxsLmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1sxXS52ZWwueSA9IC1NYXRoLmFicyhiYWxsLnZlbC55KTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMV0udmVsLnggPSAtTWF0aC5hYnMoYmFsbC52ZWwueCAqIDAuNSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzFdLmRpci54ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzFdLmRpci55ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzFdLnR5cGUgPSBiYWxsLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzFdLnJhZGl1cyA9IGJhbGwucmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1sxXS5jb2xvciA9IGJhbGwuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIG5ld2VyQmFsbHMgPSBuZXdCYWxscztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGxzID0gdGhpcy5iYWxscy5jb25jYXQobmV3ZXJCYWxscyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtZWdhQmFsbFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYmFsbHMuZm9yRWFjaChiYWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYmFsbC5yYWRpdXMgKj0gMS43NTtcbiAgICAgICAgICAgICAgICAgICAgYmFsbC52ZWwueCAqPSAwLjU7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwudmVsLnkgKj0gMC41O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNob3J0ZXJQYWRkbGVcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci53aWR0aCA9IHRoaXMucGxheWVyLndpZHRoICo9IDAuNzU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibG9uZ2VyUGFkZGxlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIud2lkdGggPSB0aGlzLnBsYXllci53aWR0aCAqPSAxLjI1O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1pbmlCYWxsXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5iYWxscy5mb3JFYWNoKGJhbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnJhZGl1cyAqPSAwLjU7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwudmVsLnggKj0gMS4yNTtcbiAgICAgICAgICAgICAgICAgICAgYmFsbC52ZWwueSAqPSAxLjI1O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInN1cGVyQmFsbFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYmFsbHMuZm9yRWFjaChiYWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYmFsbC5jb2xvciA9IFwiI0ZGRDcwMFwiO1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnR5cGUgPSBcInN1cGVyQmFsbFwiO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFjdGl2ZVBvd2VydXBzLnB1c2gocG93ZXJ1cCk7XG4gICAgfTtcblxuICAgIHBsYXlTb3VuZCgpIHtcbiAgICAgICAgY29uc3QgYmFsbFNvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibG9ja1NvdW5kXCIpO1xuICAgICAgICBiYWxsU291bmQuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICBiYWxsU291bmQucGxheSgpO1xuICAgIH07XG5cbiAgICBwbGF5Qm91bmNlU291bmQoKSB7XG4gICAgICAgIGNvbnN0IGFub3RoZXJTb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5vdGhlclNvdW5kXCIpO1xuICAgICAgICBhbm90aGVyU291bmQuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICBhbm90aGVyU291bmQucGxheSgpO1xuICAgIH07XG5cbiAgICBwbGF5UG93ZXJ1cFNvdW5kKCkge1xuICAgICAgICBjb25zdCBwb3dlcnVwU291bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvd2VydXBTb3VuZFwiKTtcbiAgICAgICAgcG93ZXJ1cFNvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgcG93ZXJ1cFNvdW5kLnBsYXkoKTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsIlxuY2xhc3MgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIHZlbCkge1xuICAgICAgICB0aGlzLnBvcyA9IHBvcztcbiAgICAgICAgdGhpcy52ZWwgPSB2ZWw7XG4gICAgfTtcblxuICAgIG1vdmUoZGVsdGFUaW1lKSB7XG4gICAgICAgIGxldCBuZXdEaXN0YW5jZVggPSB0aGlzLnZlbC54ICogZGVsdGFUaW1lO1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VZID0gdGhpcy52ZWwueSAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueCA9IHRoaXMucG9zLnggKyBuZXdEaXN0YW5jZVg7XG4gICAgICAgIHRoaXMucG9zLnkgPSB0aGlzLnBvcy55ICsgbmV3RGlzdGFuY2VZO1xuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb3ZpbmdPYmplY3Q7IiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL21vdmluZ19vYmplY3QnO1xuaW1wb3J0IEJhbGwgZnJvbSAnLi9iYWxsJztcblxuY29uc3QgcmFuZG9tQ29sb3IgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlncyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuICAgIGxldCBjb2xvciA9IFwiI1wiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGNvbG9yICs9IGRpZ3NbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDE2KSldO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG59O1xuXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvcywgd2lkdGgsIGhlaWdodCwgZ2FtZVdpZHRoLCBnYW1lSGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKHBvcywgeyB4OiAwLCB5OiAwIH0pXG4gICAgICAgIHRoaXMuY29sb3IgPSByYW5kb21Db2xvcigpO1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZVdpZHRoO1xuICAgICAgICB0aGlzLmdhbWVIZWlnaHQgPSBnYW1lSGVpZ2h0O1xuICAgIH07XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VYID0gdGhpcy52ZWwueCAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueCA9IHRoaXMucG9zLnggKyBuZXdEaXN0YW5jZVg7XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH07XG5cbiAgICBnZXRSYW5kb20oYXJyKSB7XG4gICAgICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpKV07XG4gICAgfVxuXG4gICAgY29sbGlkZXNXaXRoKG90aGVyT2JqKSB7XG4gICAgICAgIGlmIChvdGhlck9iaiBpbnN0YW5jZW9mIEJhbGwpIHtcbiAgICAgICAgICAgIGlmIChvdGhlck9iai5wb3MueCA+PSAodGhpcy5wb3MueCArIHRoaXMuaGVpZ2h0KSAmJiBvdGhlck9iai5wb3MueCA8PSAodGhpcy5wb3MueCArIE1hdGguZmxvb3IodGhpcy53aWR0aCAvIDIpKSApIHtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnggPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLngpOyBcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnkgPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLnkpO1xuICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjA1O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvdGhlck9iai5wb3MueCA8ICh0aGlzLnBvcy54ICsgdGhpcy5oZWlnaHQpICYmIG90aGVyT2JqLnBvcy54ID49ICh0aGlzLnBvcy54KSkgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyT2JqLnZlbC54ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueCA9IHRoaXMuZ2V0UmFuZG9tKFstTWF0aC5mbG9vcih0aGlzLmdhbWVXaWR0aCAvIDUuMjUpLCBNYXRoLmZsb29yKHRoaXMuZ2FtZVdpZHRoIC8gNS4yNSldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC55ID0gLU1hdGguYWJzKG90aGVyT2JqLnZlbC55KSAqIDEuMDU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3RoZXJPYmoudmVsLnggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueCA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueSA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueSk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnggPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLngpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC55ID0gLU1hdGguYWJzKG90aGVyT2JqLnZlbC55KSAqIDEuMDU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueCA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueSA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueCA9IE1hdGguYWJzKG90aGVyT2JqLnZlbC54KTsgXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjA1O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyT2JqLnZlbC54ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueCA9IHRoaXMuZ2V0UmFuZG9tKFstTWF0aC5mbG9vcih0aGlzLmdhbWVXaWR0aCAvIDUuMjUpLCBNYXRoLmZsb29yKHRoaXMuZ2FtZVdpZHRoIC8gNS4yNSldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC55ID0gLU1hdGguYWJzKG90aGVyT2JqLnZlbC55KSAqIDEuMDU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3RoZXJPYmoudmVsLnggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueCA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai5kaXIueSA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueCA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjA1O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnggPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnkgPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnggPSBNYXRoLmFicyhvdGhlck9iai52ZWwueCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjA1O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJpZ2h0V2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueCA9IC1NYXRoLmZsb29yKHRoaXMuZ2FtZUhlaWdodCAvIDYpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBsZWZ0V2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueCA9IE1hdGguZmxvb3IodGhpcy5nYW1lSGVpZ2h0IC8gNik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9tb3Zpbmdfb2JqZWN0JztcblxuY29uc3QgZXh0cmFMaWZlID0gbmV3IEltYWdlKCk7XG5leHRyYUxpZmUuc3JjID0gJy4vc3JjL2NsYXNzZXMvZXh0cmFMaWZlUG93ZXJ1cC5wbmcnO1xuXG5jb25zdCBtdWx0aUJhbGwgPSBuZXcgSW1hZ2UoKTtcbm11bHRpQmFsbC5zcmMgPSAnLi9zcmMvY2xhc3Nlcy9wb3dlcnVwTXVsdGlCYWxsRmluYWwucG5nJztcblxuY29uc3Qgc2hvcnRlclBhZGRsZSA9IG5ldyBJbWFnZSgpO1xuc2hvcnRlclBhZGRsZS5zcmMgPSAnLi9zcmMvY2xhc3Nlcy9wb3dlcnVwU21hbGxCYXQucG5nJztcblxuY29uc3QgbG9uZ2VyUGFkZGxlID0gbmV3IEltYWdlKCk7XG5sb25nZXJQYWRkbGUuc3JjID0gJy4vc3JjL2NsYXNzZXMvcG93ZXJ1cEJpZ0JhdC5wbmcnO1xuXG5jb25zdCBtZWdhQmFsbCA9IG5ldyBJbWFnZSgpO1xubWVnYUJhbGwuc3JjID0gJy4vc3JjL2NsYXNzZXMvcG93ZXJ1cE1lZ2FiYWxsLnBuZyc7XG5cbmNvbnN0IG1pbmlCYWxsID0gbmV3IEltYWdlKCk7XG5taW5pQmFsbC5zcmMgPSAnLi9zcmMvY2xhc3Nlcy9taW5pQmFsbFBvd2VydXAucG5nJztcblxuY29uc3Qgc3VwZXJCYWxsID0gbmV3IEltYWdlKCk7XG5zdXBlckJhbGwuc3JjID0gJy4vc3JjL2NsYXNzZXMvc3VwZXJCYWxsUG93ZXJ1cC5wbmcnO1xuXG5cbmNsYXNzIFBvd2VydXAgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gICAgY29uc3RydWN0b3IocG9zLCB0eXBlLCByYWRpdXMsIGdhbWVXaWR0aCkge1xuICAgICAgICBzdXBlcihwb3MsIHsgeDogMCwgeTogMCB9KVxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lV2lkdGg7XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGxldCBpbWc7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiZXh0cmFMaWZlXCI6XG4gICAgICAgICAgICAgICAgaW1nID0gZXh0cmFMaWZlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm11bHRpQmFsbFwiOlxuICAgICAgICAgICAgICAgIGltZyA9IG11bHRpQmFsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzaG9ydGVyUGFkZGxlXCI6XG4gICAgICAgICAgICAgICAgaW1nID0gc2hvcnRlclBhZGRsZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsb25nZXJQYWRkbGVcIjpcbiAgICAgICAgICAgICAgICBpbWcgPSBsb25nZXJQYWRkbGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWVnYUJhbGxcIjpcbiAgICAgICAgICAgICAgICBpbWcgPSBtZWdhQmFsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtaW5pQmFsbFwiOlxuICAgICAgICAgICAgICAgIGltZyA9IG1pbmlCYWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInN1cGVyQmFsbFwiOlxuICAgICAgICAgICAgICAgIGltZyA9IHN1cGVyQmFsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgdGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzKTtcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH07XG5cbiAgICBpbml0aWF0ZU1vdmUoKSB7XG4gICAgICAgIHRoaXMudmVsLnkgKz0gTWF0aC5mbG9vcih0aGlzLmdhbWVXaWR0aCAvIDQpO1xuICAgIH1cblxuICAgIG1vdmUoZGVsdGFUaW1lKSB7XG4gICAgICAgIGxldCBuZXdEaXN0YW5jZVkgPSB0aGlzLnZlbC55ICogZGVsdGFUaW1lO1xuICAgICAgICB0aGlzLnBvcy55ID0gdGhpcy5wb3MueSArIG5ld0Rpc3RhbmNlWTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUG93ZXJ1cDsiLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9jbGFzc2VzL2dhbWVcIjtcbmltcG9ydCBHVmlldyBmcm9tIFwiLi9jbGFzc2VzL2dfdmlld1wiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZFwiKTtcbiAgICAvLyBjb25zdCB3aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAvLyBjb25zdCBoZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuXG4gICAgY2FudmFzLndpZHRoID0gTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJIZWlnaHQgLyAwLjQzKTtcbiAgICBjYW52YXMuaGVpZ2h0ID0gTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJXaWR0aCAvIDAuNDUpO1xuICAgIGNvbnN0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgY29uc3Qgd2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgY29uc29sZS5sb2coaGVpZ2h0KTtcbiAgICBjb25zb2xlLmxvZyh3aWR0aCk7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIHdpZHRoOiA1NXZ3O1xuICAgIC8vIGhlaWdodDogNTN2aDtcblxuXG5cblxuICAgIGxldCBnaXRodWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdpdGh1YlwiKTtcbiAgICBnaXRodWIub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vbXdkZXNoYXcnO1xuICAgIH1cbiAgICBsZXQgbGlua2VkaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmtlZGluXCIpO1xuICAgIGxpbmtlZGluLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL21hdHRoZXctZGVzaGF3LWI2MjlhMGJhLyc7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWZhdWx0XCIpO1xuICAgIGNvbnN0IHBvd2VyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3dlci1idG5cIik7XG4gICAgcG93ZXJCdG4uY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcblxuICAgIGNvbnN0IGFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hcnJvd1wiKTtcbiAgICBwb3dlckJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBwb3dlckJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kXCIpO1xuICAgICAgICBhcnJvdy5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICBkZWZTY3JlZW4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG4gICAgICAgIGNvbnN0IHN0YXJ0U2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LXNjcmVlbicpO1xuICAgICAgICBzdGFydFNjcmVlbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcblxuICAgICAgICBjb25zdCBsaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3dlci1sdCcpO1xuICAgICAgICBsaWdodC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcblxuICAgICAgICBjb25zdCBzY3JlZW5UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydC10ZXh0XCIpO1xuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKTtcbiAgICAgICAgY29uc3QgY29udHJvbHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250cm9scy1saXN0XCIpO1xuXG4gICAgICAgIHNjcmVlblRleHQuY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWdhbWVcIik7XG4gICAgICAgIGNvbnN0IGFycm93RG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXJyb3ctc3RhcnRcIik7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVib3lTb3VuZFwiKTtcbiAgICAgICAgICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICAgICAgY29udHJvbHNMaXN0LmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgICAgICBzdGFydEJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIGFycm93RG93bi5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICB9LCAzMDAwKTtcblxuICAgICAgICBzdGFydEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICBhcnJvd0Rvd24uY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIHN0YXJ0U2NyZWVuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgc3RhcnRCdG4ucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICAgICAgICBjb250cm9sc0xpc3QuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIHNjcmVlblRleHQuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShjdHgsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgbmV3IEdWaWV3KGdhbWUpLnN0YXJ0KCk7XG4gICAgICAgIH07XG4gICAgfTtcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=