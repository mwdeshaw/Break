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
            const width = canvas.width;
            const height = canvas.height;
            const ctx = canvas.getContext("2d");
            const game = new _classes_game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, width, height);
            new _classes_g_view__WEBPACK_IMPORTED_MODULE_1__["default"](game).start();
        };
    };
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvYmFsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9ibG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZ192aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbW92aW5nX29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvcG93ZXJ1cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBd0M7QUFDWDs7QUFFN0I7QUFDQTtB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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVlLHNFQUFPLEU7Ozs7Ozs7Ozs7OztBQ3pFdEI7QUFBQTtBQUFBO0FBQWtDO0FBQ0c7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixxREFBSTtBQUNqQyxnQkFBZ0IsdURBQUs7QUFDckI7QUFDQTtBQUNBLENBQUMsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgTW92aW5nT2JqIGZyb20gJy4vbW92aW5nX29iamVjdCc7XG5pbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9ja3MnO1xuXG5jb25zdCByYW5kb21Db2xvciA9ICgpID0+IHtcbiAgICBjb25zdCBkaWdzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgbGV0IGNvbG9yID0gXCIjXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29sb3IgKz0gZGlnc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTYpKV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjtcbn07XG5cbmNsYXNzIEJhbGwgZXh0ZW5kcyBNb3ZpbmdPYmoge1xuICAgIGNvbnN0cnVjdG9yKHBvcywgcmFkaXVzLCBpbml0aWFsRmxhZyA9IGZhbHNlLCB0eXBlPVwibm9ybWFsXCIpIHtcbiAgICAgICAgc3VwZXIocG9zLCB7IHg6IDAsIHk6IDAgfSk7XG4gICAgICAgIHRoaXMuY29sb3IgPSByYW5kb21Db2xvcigpO1xuICAgICAgICB0aGlzLmRpciA9IHsgeDogMCwgeTogMCB9XG4gICAgICAgIHRoaXMuaW5pdGlhbEZsYWcgPSBpbml0aWFsRmxhZztcbiAgICAgICAgdGhpcy5zcGluU3BlZWQgPSBNYXRoLnJhbmRvbSgpICogNjAgKyAzMDtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmModGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCB0cnVlKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9O1xuXG4gICAgY29sbGlkZXNXaXRoKG90aGVyT2JqKSB7XG4gICAgICAgIGlmIChvdGhlck9iaiBpbnN0YW5jZW9mIEJsb2NrKSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5jZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJpZ2h0V2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueCA9IC1NYXRoLmFicyh0aGlzLnZlbC54KSAqIDAuOTU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGxlZnRXYWxsQ29sbGlzaW9uKCkge1xuICAgICAgICB0aGlzLnZlbC54ID0gTWF0aC5hYnModGhpcy52ZWwueCkgKiAwLjk1O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB0b3BXYWxsQ29sbGlzaW9uKCkge1xuICAgICAgICB0aGlzLnZlbC55ID0gTWF0aC5hYnModGhpcy52ZWwueSkgKiAwLjk1O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBib3VuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpci54ICE9PSAwICYmIHRoaXMuZGlyLnkgIT09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpci54ID0gLXRoaXMuZGlyLng7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXIueSA9IC10aGlzLmRpci55O1xuICAgICAgICAgICAgICAgIHRoaXMudmVsLnkgPSAtdGhpcy52ZWwueTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07ICAgIFxuXG4gICAgaW5pdGlhbFJvdGF0aW9uKCkge1xuICAgICAgICBsZXQgcmFkcyA9IDkwICogKE1hdGguUEkgLyAxODApO1xuICAgICAgICB0aGlzLmRpci54ID0gTWF0aC5jb3MocmFkcyk7XG4gICAgICAgIHRoaXMuZGlyLnkgPSBNYXRoLnNpbihyYWRzKTtcbiAgICB9O1xuXG4gICAgcm90YXRlKGRlbHRhVGltZSkge1xuICAgICAgICBpZiAodGhpcy5kaXIueSAhPT0gMCkge1xuICAgICAgICAgICAgbGV0IGFuZ2xlID0gLXRoaXMuc3BpblNwZWVkICogKE1hdGguUEkgLyAxODApICogZGVsdGFUaW1lO1xuICAgICAgICAgICAgbGV0IHZlY3RvciA9IFt0aGlzLmRpci54LCB0aGlzLmRpci55XTtcblxuICAgICAgICAgICAgdmFyIGNvcyA9IE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgIHZhciBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGlyLnggPSBNYXRoLnJvdW5kKDEwMDAwICogKHZlY3RvclswXSAqIGNvcyAtIHZlY3RvclsxXSAqIHNpbikpIC8gMTAwMDA7XG4gICAgICAgICAgICB0aGlzLmRpci55ID0gTWF0aC5yb3VuZCgxMDAwMCAqICh2ZWN0b3JbMF0gKiBzaW4gKyB2ZWN0b3JbMV0gKiBjb3MpKSAvIDEwMDAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQmFsbFJlbGVhc2UoaW5wdXQsIGtleSkge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbEZsYWcgJiYga2V5ICE9PSBcInNwYWNlXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmVsLnggKz0gaW5wdXRbMF07XG4gICAgICAgICAgICB0aGlzLnZlbC55ICs9IGlucHV0WzFdO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJzcGFjZVwiICYmIHRoaXMuZGlyLnggPT09IDAgJiYgdGhpcy5kaXIueSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy52ZWwueCArPSBpbnB1dFswXTtcbiAgICAgICAgICAgIHRoaXMudmVsLnkgKz0gaW5wdXRbMV07XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxSb3RhdGlvbigpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIG1vdmUoZGVsdGFUaW1lKSB7XG4gICAgICAgIHN1cGVyLm1vdmUoZGVsdGFUaW1lKTtcbiAgICAgICAgdGhpcy5yb3RhdGUoZGVsdGFUaW1lKTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCYWxsOyIsImNvbnN0IHJhbmRvbUNvbG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpZ3MgPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcbiAgICBsZXQgY29sb3IgPSBcIiNcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBjb2xvciArPSBkaWdzW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxNikpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufTtcblxuY2xhc3MgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKHBvcywgd2lkdGgsIGhlaWdodCwgcG93ZXJVcCkge1xuICAgICAgICB0aGlzLnBvcyA9IHBvcztcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5jb2xvciA9IHJhbmRvbUNvbG9yKCk7XG4gICAgICAgIHRoaXMucG93ZXJVcCA9IHBvd2VyVXA7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQmxvY2s7IiwiY2xhc3MgR1ZJRVcge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmlucHV0ID0ge1xuICAgICAgICAgICAgc3BhY2U6IFswLCAtTWF0aC5mbG9vcih0aGlzLmdhbWUuaGVpZ2h0IC8gMy40MyldXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGtleUhhbmRsZXIoKSB7ICAgXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlS2V5KGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUtleShldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBoYW5kbGVLZXkoZXZlbnQpIHtcbiAgICAgICAgbGV0IGlucHV0ID0gdGhpcy5pbnB1dDtcbiAgICAgICAgaWYgKCF0aGlzLmdhbWUuYmFsbHNbMF0uaW5pdGlhbEZsYWcpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgNjU6XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcImtleWRvd25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IC1NYXRoLmZsb29yKHRoaXMuZ2FtZS53aWR0aCAvIDIuNjMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxzWzBdLnZlbC54ID0gLU1hdGguZmxvb3IodGhpcy5nYW1lLndpZHRoIC8gMi42Myk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsc1swXS52ZWwueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2ODpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwia2V5ZG93blwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gTWF0aC5mbG9vcih0aGlzLmdhbWUud2lkdGggLyAyLjYzKTs7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbHNbMF0udmVsLnggPSBNYXRoLmZsb29yKHRoaXMuZ2FtZS53aWR0aCAvIDIuNjMpOztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxzWzBdLnZlbC54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsc1swXS5pbml0aWFsRmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbHNbMF0uaGFuZGxlQmFsbFJlbGVhc2UoaW5wdXQuc3BhY2UsIE9iamVjdC5rZXlzKHRoaXMuaW5wdXQpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDY1OlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAtTWF0aC5mbG9vcih0aGlzLmdhbWUud2lkdGggLyAyLjYzKTs7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDY4OlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSBNYXRoLmZsb29yKHRoaXMuZ2FtZS53aWR0aCAvIDIuNjMpOztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9OyAgICAgXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmtleUhhbmRsZXIoKTtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XG4gICAgfTtcblxuICAgIGFuaW1hdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5nYW1lLmlzT3ZlcigpKSB7XG4gICAgICAgICAgICBjb25zdCBkZWx0YVQgPSAobmV3IERhdGUoKSAtIHRoaXMubGFzdFRpbWUpIC8gMTAwMDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zaW5nbGVNb3ZlKGRlbHRhVClcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5kcmF3KCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLmhlaWdodCk7XG4gICAgICAgICAgICBjb25zdCBlbmRTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVuZC1zY3JlZW5cIik7XG4gICAgICAgICAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtZ2FtZVwiKTtcbiAgICAgICAgICAgIGNvbnN0IGFycm93RG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXJyb3ctc3RhcnRcIik7XG5cbiAgICAgICAgICAgIGVuZFNjcmVlbi5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICAgICAgYXJyb3dEb3duLmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgICAgICBzdGFydEJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdWSUVXOyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgQmFsbCBmcm9tICcuL2JhbGwnO1xuaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2tzJztcbmltcG9ydCBQb3dlcnVwIGZyb20gJy4vcG93ZXJ1cCdcblxuY29uc3QgU1RBUlRJTkdfTElWRVMgPSAxO1xuLy8gY29uc3QgU1RBUlRJTkdfTElWRVMgPSAzO1xuY29uc3QgQkxPQ0tTX05VTSA9IDk2O1xuY29uc3QgUE9XRVJVUFMgPSBbXCJleHRyYUxpZmVcIiwgXCJtdWx0aUJhbGxcIiwgXCJzaG9ydGVyUGFkZGxlXCIsIFwibG9uZ2VyUGFkZGxlXCIsIFwibWluaUJhbGxcIiwgXCJtZWdhQmFsbFwiLCBcInN1cGVyQmFsbFwiXTtcbmNvbnN0IFRPVEFMX1BPV0VSVVBfQ09VTlQgPSAxNjtcblxuXG5jbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMubGl2ZXMgPSBTVEFSVElOR19MSVZFUztcbiAgICAgICAgdGhpcy5ibG9ja3MgPSBbXTtcblxuICAgICAgICB0aGlzLnBsYXllcldpZHRoID0gTWF0aC5mbG9vcih0aGlzLndpZHRoIC8gNy42Nyk7XG4gICAgICAgIHRoaXMucGxheWVySGVpZ2h0ID0gTWF0aC5mbG9vcih0aGlzLmhlaWdodCAvIDIwKTtcbiAgICAgICAgdGhpcy5wbGF5ZXJTdGFydCA9IHsgeDogTWF0aC5mbG9vcih0aGlzLndpZHRoIC8gMi4zMyksIHk6IE1hdGguZmxvb3IodGhpcy5oZWlnaHQgKiAwLjg4KSB9O1xuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wbGF5ZXJTdGFydCksIHRoaXMucGxheWVyV2lkdGgsIHRoaXMucGxheWVySGVpZ2h0LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5iYWxsUmFkaXVzID0gTWF0aC5mbG9vcih0aGlzLndpZHRoICogMC4wMilcbiAgICAgICAgdGhpcy5iYWxsU3RhcnQgPSB7IHg6IE1hdGguZmxvb3IodGhpcy53aWR0aCAvIDIuMDUpLCB5OiBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0ICogMC44KSB9O1xuICAgICAgICB0aGlzLmJhbGxzID0gW25ldyBCYWxsKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYmFsbFN0YXJ0KSwgdGhpcy5iYWxsUmFkaXVzKV07XG5cbiAgICAgICAgdGhpcy50aGVtZUNvbG9yID0gXCIjYmRhZTU3XCI7XG5cbiAgICAgICAgdGhpcy5udW1CbG9ja3MgPSBCTE9DS1NfTlVNO1xuICAgICAgICB0aGlzLmJsb2NrU2l6ZSA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAvIDI1KTtcblxuICAgICAgICB0aGlzLnBvd2VydXBDb3VudCA9IFRPVEFMX1BPV0VSVVBfQ09VTlQ7IFxuICAgICAgICB0aGlzLnBvd2VydXBTaXplID0gTWF0aC5mbG9vcih0aGlzLndpZHRoICogMC4wNTUpO1xuICAgICAgICB0aGlzLnBvd2VydXBzID0gUE9XRVJVUFM7XG4gICAgICAgIHRoaXMuYWN0aXZlUG93ZXJ1cHMgPSBbXTtcbiAgICAgICAgdGhpcy50b3RhbFBvd2VydXBzID0gW107XG4gICAgICAgIHRoaXMubW92aW5nUG93ZXJ1cHMgPSBbXTtcblxuICAgICAgICB0aGlzLmFkZEJsb2Nrcyh0aGlzLm51bUJsb2Nrcyk7XG4gICAgfTsgICBcbiAgICAgXG4gICAgYWRkQmxvY2tzKG4pIHtcbiAgICAgICAgbGV0IGJsb2NrUG9zWCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAvIDkyKTtcbiAgICAgICAgbGV0IGJsb2NrUG9zWSA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQgKiAwLjAyKTtcbiAgICAgICAgbGV0IGkgPSAwO1xuXG4gICAgICAgIHdoaWxlIChpIDwgbikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmJsb2Nrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tUG93ZXJ1cCA9IG5ldyBQb3dlcnVwKHsgeDogYmxvY2tQb3NYLCB5OiBibG9ja1Bvc1kgfSwgdGhpcy5nZXRSYW5kb20odGhpcy5wb3dlcnVwcyksIHRoaXMucG93ZXJ1cFNpemUsIHRoaXMud2lkdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxQb3dlcnVwcy5wdXNoKHJhbmRvbVBvd2VydXApO1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tzLnB1c2gobmV3IEJsb2NrKHsgeDogYmxvY2tQb3NYLCB5OiBibG9ja1Bvc1kgfSwgdGhpcy5ibG9ja1NpemUsIHRoaXMuYmxvY2tTaXplLCByYW5kb21Qb3dlcnVwKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3dlcnVwQ291bnQgLT0gMTtcbiAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBibG9ja1Bvc1ggKz0gdGhpcy5ibG9ja1NpemU7XG4gICAgICAgICAgICBpZiAoYmxvY2tQb3NYID4gdGhpcy53aWR0aCAtICh0aGlzLndpZHRoICogMC4wNCkpIHtcbiAgICAgICAgICAgICAgICBibG9ja1Bvc1ggPSBNYXRoLmZsb29yKHRoaXMud2lkdGggLyA5Mik7XG4gICAgICAgICAgICAgICAgYmxvY2tQb3NZID0gYmxvY2tQb3NZICs9IHRoaXMuYmxvY2tTaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgJSA2ID09PSAwICYmIHRoaXMucG93ZXJ1cENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCByYW5kb21Qb3dlcnVwID0gbmV3IFBvd2VydXAoeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCB0aGlzLmdldFJhbmRvbSh0aGlzLnBvd2VydXBzKSwgdGhpcy5wb3dlcnVwU2l6ZSwgdGhpcy53aWR0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbFBvd2VydXBzLnB1c2gocmFuZG9tUG93ZXJ1cCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCB0aGlzLmJsb2NrU2l6ZSwgdGhpcy5ibG9ja1NpemUsIHJhbmRvbVBvd2VydXApKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvd2VydXBDb3VudCAtPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9jayh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIHRoaXMuYmxvY2tTaXplLCB0aGlzLmJsb2NrU2l6ZSwgbnVsbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuc2h1ZmZsZUFycih0aGlzLmJsb2Nrcyk7XG4gICAgfTtcbiAgICBcbiAgICBzaHVmZmxlQXJyKGFycikge1xuICAgICAgICBhcnIuc29ydCgoKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcbiAgICB9XG5cbiAgICBnZXRSYW5kb20oYXJyKSB7XG4gICAgICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpKV07XG4gICAgfVxuXG4gICAgYWxsQ3VyT2JqZWN0cygpIHtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChbdGhpcy5wbGF5ZXJdLCB0aGlzLmJhbGxzLCB0aGlzLmJsb2NrcywgdGhpcy5tb3ZpbmdQb3dlcnVwcyk7XG4gICAgfTtcblxuICAgIGFsbEN1ck1vdmluZ09ianMoKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoW3RoaXMucGxheWVyXSwgdGhpcy5iYWxscywgdGhpcy5tb3ZpbmdQb3dlcnVwcyk7XG4gICAgfTtcbiBcbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnRoZW1lQ29sb3I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjMwcHggU2Fucy1TZXJpZlwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiM4YTg5MWZcIjtcbiAgICAgICAgaWYgKHRoaXMubGl2ZXMgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChgJHt0aGlzLmxpdmVzfSBMaXZlcyBMZWZ0YCwgNzUwLCA1ODApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoYCR7dGhpcy5saXZlc30gTGlmZSBMZWZ0YCwgNzUwLCA1ODApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hbGxDdXJPYmplY3RzKCkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgb2JqLmRyYXcodGhpcy5jdHgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgbW92ZU9iamVjdHMoZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbW92aW5nT2JqID0gdGhpcy5hbGxDdXJNb3ZpbmdPYmpzKCk7XG4gICAgICAgIG1vdmluZ09iai5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICBvYmoubW92ZShkZWx0YSk7XG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQmFsbCAmJiB0aGlzLmlzT3V0T2ZCb3VuZHMob2JqLnBvcy55KSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJhbGxzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYXRoQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUob2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFBvd2VydXAgJiYgdGhpcy5pc091dE9mQm91bmRzKG9iai5wb3MueSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShvYmopO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNpbmdsZU1vdmUoZGVsdGEpIHtcbiAgICAgICAgdGhpcy5jaGVja0ZvckNvbGxpc2lvbnMoKTtcbiAgICAgICAgdGhpcy5jaGVja0ZvcldhbGxDb2xsaXNpb25zKCk7XG4gICAgICAgIHRoaXMubW92ZU9iamVjdHMoZGVsdGEpO1xuICAgIH07XG5cbiAgICBpc091dE9mQm91bmRzKHBvc1kpIHtcbiAgICAgICAgaWYgKHBvc1kgPiAoTWF0aC5mbG9vcih0aGlzLmhlaWdodCAvIDEuMDcpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZGVhdGhBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMubGl2ZXMgLT0gMTtcbiAgICAgICAgaWYgKHRoaXMubGl2ZXMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIkdhbWUgT3ZlciFcIlxuICAgICAgICB9IGVsc2UgeyAgICAgXG4gICAgICAgICAgICB0aGlzLnBsYXllci53aWR0aCA9IHRoaXMucGxheWVyV2lkdGg7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBvcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGxheWVyU3RhcnQpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgICAgICBpZiAodGhpcy5iYWxscy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iYWxscyA9IHRoaXMuYmFsbHMuc2xpY2UoMCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJhbGxzWzBdLnBvcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYmFsbFN0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMuYmFsbHNbMF0uZGlyID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgICAgICB0aGlzLmJhbGxzWzBdLnZlbCA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICAgICAgdGhpcy5iYWxsc1swXS5yYWRpdXMgPSB0aGlzLmJhbGxSYWRpdXM7XG4gICAgICAgICAgICB0aGlzLmJhbGxzWzBdLmluaXRpYWxGbGFnID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVBvd2VydXBzID0gW107XG4gICAgICAgICAgICB0aGlzLm1vdmluZ1Bvd2VydXBzID0gW107XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNoZWNrRm9yV2FsbENvbGxpc2lvbnMoKSB7XG4gICAgICAgIGNvbnN0IGFsbE1vdmluZ09iaiA9IHRoaXMuYWxsQ3VyTW92aW5nT2JqcygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE1vdmluZ09iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gYWxsTW92aW5nT2JqW2ldO1xuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBQbGF5ZXIpICYmIChvYmoucG9zLnggPCAwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoubGVmdFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgUGxheWVyKSAmJiAob2JqLnBvcy54ID4gKHRoaXMud2lkdGggLSBvYmoud2lkdGgpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoucmlnaHRXYWxsQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIEJhbGwpICYmIChvYmoucG9zLnggPCAob2JqLnJhZGl1cykpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLmxlZnRXYWxsQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIEJhbGwpICYmIChvYmoucG9zLnggPiAodGhpcy53aWR0aCAtIG9iai5yYWRpdXMpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUJvdW5jZVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5yaWdodFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgQmFsbCkgJiYgKG9iai5wb3MueSA8IChvYmoucmFkaXVzKSB8fCBvYmoucG9zLnkgPiAodGhpcy53aWR0aCAtIG9iai5yYWRpdXMpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUJvdW5jZVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai50b3BXYWxsQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGlzT3ZlcigpIHtcbiAgICAgICAgaWYgKHRoaXMubnVtQmxvY2tzID09PSAwIHx8IHRoaXMubGl2ZXMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0NvbGxpZGVkKG9iajEsIG9iajIpIHtcbiAgICAgICAgbGV0IGR4ID0gTWF0aC5hYnMob2JqMi5wb3MueCAtIG9iajEucG9zLnggLSBvYmoxLndpZHRoIC8gMik7XG4gICAgICAgIGxldCBkeSA9IE1hdGguYWJzKG9iajIucG9zLnkgLSBvYmoxLnBvcy55IC0gb2JqMS5oZWlnaHQgLyAyKTtcbiAgICAgICAgaWYgKGR4ID4gKG9iajEud2lkdGggLyAyICsgb2JqMi5yYWRpdXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChkeSA+IChvYmoxLmhlaWdodCAvIDIgKyBvYmoyLnJhZGl1cykpIHsgXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZHggPD0gKG9iajEud2lkdGggLyAyKSkgeyBcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGR5IDw9IChvYmoxLmhlaWdodCAvIDIpKSB7IFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7IFxuICAgICAgICB9O1xuICAgICAgICBsZXQgZFggPSBkeCAtIG9iajEud2lkdGggLyAyO1xuICAgICAgICBsZXQgZFkgPSBkeSAtIG9iajIud2lkdGggLyAyO1xuICAgICAgICByZXR1cm4gKGRYICogZFggKyBkWSAqIGRZIDw9IChvYmoyLnJhZGl1cyAqIG9iajIucmFkaXVzKSk7XG4gICAgfTtcblxuICAgIHJlbW92ZShvYmopIHtcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEJsb2NrKSB7XG4gICAgICAgICAgICBpZiAob2JqLnBvd2VyVXApIHtcbiAgICAgICAgICAgICAgICBsZXQgcFVwID0gdGhpcy50b3RhbFBvd2VydXBzLmluZGV4T2Yob2JqLnBvd2VyVXApO1xuICAgICAgICAgICAgICAgIHRoaXMubW92aW5nUG93ZXJ1cHMucHVzaCh0aGlzLnRvdGFsUG93ZXJ1cHNbcFVwXSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbFBvd2VydXBzLnNwbGljZShwVXAsMSk7XG4gICAgICAgICAgICAgICAgb2JqLnBvd2VyVXAuaW5pdGlhdGVNb3ZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5udW1CbG9ja3MgLT0gMTtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLnNwbGljZSh0aGlzLmJsb2Nrcy5pbmRleE9mKG9iaiksIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFBvd2VydXApIHtcbiAgICAgICAgICAgIGxldCBwVXAgPSB0aGlzLm1vdmluZ1Bvd2VydXBzLmluZGV4T2Yob2JqKTtcbiAgICAgICAgICAgIHRoaXMubW92aW5nUG93ZXJ1cHMuc3BsaWNlKHBVcCwgMSk7XG4gICAgICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgQmFsbCkge1xuICAgICAgICAgICAgdGhpcy5iYWxscy5zcGxpY2UodGhpcy5iYWxscy5pbmRleE9mKG9iaiksIDEpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjaGVja0ZvckNvbGxpc2lvbnMoKSB7XG4gICAgICAgIGNvbnN0IGFsbE9iaiA9IHRoaXMuYWxsQ3VyT2JqZWN0cygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgYWxsT2JqLmxlbmd0aDsgaiArKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9iajEgPSBhbGxPYmpbaV07XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqMiA9IGFsbE9ialtqXTtcbiAgICAgICAgICAgICAgICBpZiAob2JqMSBpbnN0YW5jZW9mIFBsYXllciAmJiBvYmoyIGluc3RhbmNlb2YgQmFsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbGxpZGVkKG9iajEsIG9iajIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb3VuY2VTb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5jb2xsaWRlc1dpdGgob2JqMik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYmoxIGluc3RhbmNlb2YgUGxheWVyICYmIG9iajIgaW5zdGFuY2VvZiBQb3dlcnVwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkZWQob2JqMSwgb2JqMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGlkZXNXaXRoUG93ZXJ1cChvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVBvd2VydXBTb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUob2JqMik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYmoxIGluc3RhbmNlb2YgQmFsbCAmJiBvYmoyIGluc3RhbmNlb2YgQmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRlZChvYmoyLCBvYmoxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5U291bmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuY29sbGlkZXNXaXRoKG9iajIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUob2JqMik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbGxpZGVzV2l0aFBvd2VydXAocG93ZXJ1cCkge1xuICAgICAgICBzd2l0Y2ggKHBvd2VydXAudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImV4dHJhTGlmZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubGl2ZXMgKz0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtdWx0aUJhbGxcIjpcbiAgICAgICAgICAgICAgICBsZXQgbmV3ZXJCYWxscztcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGxzLmZvckVhY2goYmFsbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdCYWxscyA9IFtuZXcgQmFsbChPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJhbGxzWzBdLnBvcyksIHRoaXMuYmFsbFJhZGl1cywgdHJ1ZSksIG5ldyBCYWxsKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYmFsbHNbMF0ucG9zKSwgdGhpcy5iYWxsUmFkaXVzLCB0cnVlKV07XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzBdLnZlbC55ID0gLU1hdGguYWJzKGJhbGwudmVsLnkpO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1swXS52ZWwueCA9IC1NYXRoLmFicyhiYWxsLnZlbC54KTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMF0uZGlyLnggPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMF0uZGlyLnkgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMF0udHlwZSA9IGJhbGwudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMF0ucmFkaXVzID0gYmFsbC5yYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzBdLmNvbG9yID0gYmFsbC5jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMV0udmVsLnkgPSAtTWF0aC5hYnMoYmFsbC52ZWwueSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzFdLnZlbC54ID0gLU1hdGguYWJzKGJhbGwudmVsLnggKiAwLjUpO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1sxXS5kaXIueCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1sxXS5kaXIueSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1sxXS50eXBlID0gYmFsbC50eXBlO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1sxXS5yYWRpdXMgPSBiYWxsLnJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMV0uY29sb3IgPSBiYWxsLmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBuZXdlckJhbGxzID0gbmV3QmFsbHM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5iYWxscyA9IHRoaXMuYmFsbHMuY29uY2F0KG5ld2VyQmFsbHMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWVnYUJhbGxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGxzLmZvckVhY2goYmFsbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwucmFkaXVzICo9IDEuNzU7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwudmVsLnggKj0gMC41O1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnZlbC55ICo9IDAuNTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzaG9ydGVyUGFkZGxlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIud2lkdGggPSB0aGlzLnBsYXllci53aWR0aCAqPSAwLjc1O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxvbmdlclBhZGRsZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLndpZHRoID0gdGhpcy5wbGF5ZXIud2lkdGggKj0gMS4yNTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtaW5pQmFsbFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYmFsbHMuZm9yRWFjaChiYWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYmFsbC5yYWRpdXMgKj0gMC41O1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnZlbC54ICo9IDEuMjU7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwudmVsLnkgKj0gMS4yNTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzdXBlckJhbGxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGxzLmZvckVhY2goYmFsbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwuY29sb3IgPSBcIiNGRkQ3MDBcIjtcbiAgICAgICAgICAgICAgICAgICAgYmFsbC50eXBlID0gXCJzdXBlckJhbGxcIjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hY3RpdmVQb3dlcnVwcy5wdXNoKHBvd2VydXApO1xuICAgIH07XG5cbiAgICBwbGF5U291bmQoKSB7XG4gICAgICAgIGNvbnN0IGJhbGxTb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmxvY2tTb3VuZFwiKTtcbiAgICAgICAgYmFsbFNvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgYmFsbFNvdW5kLnBsYXkoKTtcbiAgICB9O1xuXG4gICAgcGxheUJvdW5jZVNvdW5kKCkge1xuICAgICAgICBjb25zdCBhbm90aGVyU291bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFub3RoZXJTb3VuZFwiKTtcbiAgICAgICAgYW5vdGhlclNvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgYW5vdGhlclNvdW5kLnBsYXkoKTtcbiAgICB9O1xuXG4gICAgcGxheVBvd2VydXBTb3VuZCgpIHtcbiAgICAgICAgY29uc3QgcG93ZXJ1cFNvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3dlcnVwU291bmRcIik7XG4gICAgICAgIHBvd2VydXBTb3VuZC5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIHBvd2VydXBTb3VuZC5wbGF5KCk7XG4gICAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJcbmNsYXNzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zLCB2ZWwpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgICAgIHRoaXMudmVsID0gdmVsO1xuICAgIH07XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VYID0gdGhpcy52ZWwueCAqIGRlbHRhVGltZTtcbiAgICAgICAgbGV0IG5ld0Rpc3RhbmNlWSA9IHRoaXMudmVsLnkgKiBkZWx0YVRpbWU7XG4gICAgICAgIHRoaXMucG9zLnggPSB0aGlzLnBvcy54ICsgbmV3RGlzdGFuY2VYO1xuICAgICAgICB0aGlzLnBvcy55ID0gdGhpcy5wb3MueSArIG5ld0Rpc3RhbmNlWTtcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTW92aW5nT2JqZWN0OyIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9tb3Zpbmdfb2JqZWN0JztcbmltcG9ydCBCYWxsIGZyb20gJy4vYmFsbCc7XG5cbmNvbnN0IHJhbmRvbUNvbG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpZ3MgPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcbiAgICBsZXQgY29sb3IgPSBcIiNcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBjb2xvciArPSBkaWdzW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxNikpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufTtcblxuY2xhc3MgUGxheWVyIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIHdpZHRoLCBoZWlnaHQsIGdhbWVXaWR0aCwgZ2FtZUhlaWdodCkge1xuICAgICAgICBzdXBlcihwb3MsIHsgeDogMCwgeTogMCB9KVxuICAgICAgICB0aGlzLmNvbG9yID0gcmFuZG9tQ29sb3IoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZUhlaWdodDtcbiAgICB9O1xuXG4gICAgbW92ZShkZWx0YVRpbWUpIHtcbiAgICAgICAgbGV0IG5ld0Rpc3RhbmNlWCA9IHRoaXMudmVsLnggKiBkZWx0YVRpbWU7XG4gICAgICAgIHRoaXMucG9zLnggPSB0aGlzLnBvcy54ICsgbmV3RGlzdGFuY2VYO1xuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9O1xuXG4gICAgZ2V0UmFuZG9tKGFycikge1xuICAgICAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKSldO1xuICAgIH1cblxuICAgIGNvbGxpZGVzV2l0aChvdGhlck9iaikge1xuICAgICAgICBpZiAob3RoZXJPYmogaW5zdGFuY2VvZiBCYWxsKSB7XG4gICAgICAgICAgICBpZiAob3RoZXJPYmoucG9zLnggPj0gKHRoaXMucG9zLnggKyB0aGlzLmhlaWdodCkgJiYgb3RoZXJPYmoucG9zLnggPD0gKHRoaXMucG9zLnggKyBNYXRoLmZsb29yKHRoaXMud2lkdGggLyAyKSkgKSB7XG4gICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci54ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci54KTsgXG4gICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci55ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci55KTtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnkgPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLnkpICogMS4wNTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3RoZXJPYmoucG9zLnggPCAodGhpcy5wb3MueCArIHRoaXMuaGVpZ2h0KSAmJiBvdGhlck9iai5wb3MueCA+PSAodGhpcy5wb3MueCkpICB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlck9iai52ZWwueCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnggPSB0aGlzLmdldFJhbmRvbShbLU1hdGguZmxvb3IodGhpcy5nYW1lV2lkdGggLyA1LjI1KSwgTWF0aC5mbG9vcih0aGlzLmdhbWVXaWR0aCAvIDUuMjUpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjA1O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG90aGVyT2JqLnZlbC54IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnggPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnkgPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLnkpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC54ID0gLU1hdGguYWJzKG90aGVyT2JqLnZlbC54KTsgXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjA1O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnggPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnkgPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnggPSBNYXRoLmFicyhvdGhlck9iai52ZWwueCk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnkgPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLnkpICogMS4wNTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlck9iai52ZWwueCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnggPSB0aGlzLmdldFJhbmRvbShbLU1hdGguZmxvb3IodGhpcy5nYW1lV2lkdGggLyA1LjI1KSwgTWF0aC5mbG9vcih0aGlzLmdhbWVXaWR0aCAvIDUuMjUpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjA1O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG90aGVyT2JqLnZlbC54IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnggPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnkgPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnggPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnkgPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLnkpICogMS4wNTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci54ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci55ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC54ID0gTWF0aC5hYnMob3RoZXJPYmoudmVsLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnkgPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLnkpICogMS4wNTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByaWdodFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnggPSAtTWF0aC5mbG9vcih0aGlzLmdhbWVIZWlnaHQgLyA2KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbGVmdFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnggPSBNYXRoLmZsb29yKHRoaXMuZ2FtZUhlaWdodCAvIDYpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vbW92aW5nX29iamVjdCc7XG5cbmNvbnN0IGV4dHJhTGlmZSA9IG5ldyBJbWFnZSgpO1xuZXh0cmFMaWZlLnNyYyA9ICcuL3NyYy9jbGFzc2VzL2V4dHJhTGlmZVBvd2VydXAucG5nJztcblxuY29uc3QgbXVsdGlCYWxsID0gbmV3IEltYWdlKCk7XG5tdWx0aUJhbGwuc3JjID0gJy4vc3JjL2NsYXNzZXMvcG93ZXJ1cE11bHRpQmFsbEZpbmFsLnBuZyc7XG5cbmNvbnN0IHNob3J0ZXJQYWRkbGUgPSBuZXcgSW1hZ2UoKTtcbnNob3J0ZXJQYWRkbGUuc3JjID0gJy4vc3JjL2NsYXNzZXMvcG93ZXJ1cFNtYWxsQmF0LnBuZyc7XG5cbmNvbnN0IGxvbmdlclBhZGRsZSA9IG5ldyBJbWFnZSgpO1xubG9uZ2VyUGFkZGxlLnNyYyA9ICcuL3NyYy9jbGFzc2VzL3Bvd2VydXBCaWdCYXQucG5nJztcblxuY29uc3QgbWVnYUJhbGwgPSBuZXcgSW1hZ2UoKTtcbm1lZ2FCYWxsLnNyYyA9ICcuL3NyYy9jbGFzc2VzL3Bvd2VydXBNZWdhYmFsbC5wbmcnO1xuXG5jb25zdCBtaW5pQmFsbCA9IG5ldyBJbWFnZSgpO1xubWluaUJhbGwuc3JjID0gJy4vc3JjL2NsYXNzZXMvbWluaUJhbGxQb3dlcnVwLnBuZyc7XG5cbmNvbnN0IHN1cGVyQmFsbCA9IG5ldyBJbWFnZSgpO1xuc3VwZXJCYWxsLnNyYyA9ICcuL3NyYy9jbGFzc2VzL3N1cGVyQmFsbFBvd2VydXAucG5nJztcblxuXG5jbGFzcyBQb3dlcnVwIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICAgIGNvbnN0cnVjdG9yKHBvcywgdHlwZSwgcmFkaXVzLCBnYW1lV2lkdGgpIHtcbiAgICAgICAgc3VwZXIocG9zLCB7IHg6IDAsIHk6IDAgfSlcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMuZ2FtZVdpZHRoID0gZ2FtZVdpZHRoO1xuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBsZXQgaW1nO1xuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImV4dHJhTGlmZVwiOlxuICAgICAgICAgICAgICAgIGltZyA9IGV4dHJhTGlmZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtdWx0aUJhbGxcIjpcbiAgICAgICAgICAgICAgICBpbWcgPSBtdWx0aUJhbGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2hvcnRlclBhZGRsZVwiOlxuICAgICAgICAgICAgICAgIGltZyA9IHNob3J0ZXJQYWRkbGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibG9uZ2VyUGFkZGxlXCI6XG4gICAgICAgICAgICAgICAgaW1nID0gbG9uZ2VyUGFkZGxlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1lZ2FCYWxsXCI6XG4gICAgICAgICAgICAgICAgaW1nID0gbWVnYUJhbGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWluaUJhbGxcIjpcbiAgICAgICAgICAgICAgICBpbWcgPSBtaW5pQmFsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzdXBlckJhbGxcIjpcbiAgICAgICAgICAgICAgICBpbWcgPSBzdXBlckJhbGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cyk7XG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICB9O1xuXG4gICAgaW5pdGlhdGVNb3ZlKCkge1xuICAgICAgICB0aGlzLnZlbC55ICs9IE1hdGguZmxvb3IodGhpcy5nYW1lV2lkdGggLyA0KTtcbiAgICB9XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VZID0gdGhpcy52ZWwueSAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueSA9IHRoaXMucG9zLnkgKyBuZXdEaXN0YW5jZVk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvd2VydXA7IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vY2xhc3Nlcy9nYW1lXCI7XG5pbXBvcnQgR1ZpZXcgZnJvbSBcIi4vY2xhc3Nlcy9nX3ZpZXdcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGxldCBnaXRodWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdpdGh1YlwiKTtcbiAgICBnaXRodWIub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vbXdkZXNoYXcnO1xuICAgIH1cbiAgICBsZXQgbGlua2VkaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmtlZGluXCIpO1xuICAgIGxpbmtlZGluLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL21hdHRoZXctZGVzaGF3LWI2MjlhMGJhLyc7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWZhdWx0XCIpO1xuICAgIGNvbnN0IHBvd2VyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3dlci1idG5cIik7XG4gICAgcG93ZXJCdG4uY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcblxuICAgIGNvbnN0IGFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hcnJvd1wiKTtcbiAgICBwb3dlckJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBwb3dlckJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kXCIpO1xuICAgICAgICBhcnJvdy5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICBkZWZTY3JlZW4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG4gICAgICAgIGNvbnN0IHN0YXJ0U2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LXNjcmVlbicpO1xuICAgICAgICBzdGFydFNjcmVlbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcblxuICAgICAgICBjb25zdCBsaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3dlci1sdCcpO1xuICAgICAgICBsaWdodC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcblxuICAgICAgICBjb25zdCBzY3JlZW5UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydC10ZXh0XCIpO1xuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKTtcbiAgICAgICAgY29uc3QgY29udHJvbHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250cm9scy1saXN0XCIpO1xuXG4gICAgICAgIHNjcmVlblRleHQuY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWdhbWVcIik7XG4gICAgICAgIGNvbnN0IGFycm93RG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXJyb3ctc3RhcnRcIik7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVib3lTb3VuZFwiKTtcbiAgICAgICAgICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICAgICAgY29udHJvbHNMaXN0LmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgICAgICBzdGFydEJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIGFycm93RG93bi5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICB9LCAzMDAwKTtcblxuICAgICAgICBzdGFydEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICBhcnJvd0Rvd24uY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIHN0YXJ0U2NyZWVuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgc3RhcnRCdG4ucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICAgICAgICBjb250cm9sc0xpc3QuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIHNjcmVlblRleHQuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIik7XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGN0eCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICBuZXcgR1ZpZXcoZ2FtZSkuc3RhcnQoKTtcbiAgICAgICAgfTtcbiAgICB9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==