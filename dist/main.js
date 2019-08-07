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
const BLOCK_HEIGHT = 50;
const BLOCK_WIDTH = 50;
const BLOCKS_NUM = 72;
const POWERUPS = ["extraLife", "multiBall", "shorterPaddle", "longerPaddle", "miniBall", "megaBall", "superBall"];
const TOTAL_POWERUP_COUNT = 12;


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

        this.ballStart = { x: Math.floor(this.width / 2.33), y: Math.floor(this.height * 0.7) };

        this.balls = [new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](Object.assign({}, this.ballStart, this.ballRadius))];


        this.themeColor = "#bdae57";
        this.numBlocks = BLOCKS_NUM;
        this.blockWidth = Math.floor(this.width / 18.4);
        this.blockHeight = 17;
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
                this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]({ x: blockPosX, y: blockPosY }, this.blockWidth, this.blockWidth, randomPowerup));
                // this.blocks.push(new Block({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT, randomPowerup));
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
                this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]({ x: blockPosX, y: blockPosY }, this.blockWidth, this.blockWidth, randomPowerup));
                this.powerupCount -= 1;
            } else {
                this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]({ x: blockPosX, y: blockPosY }, this.blockWidth, this.blockWidth, null));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvYmFsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9ibG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZ192aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbW92aW5nX29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvcG93ZXJ1cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBd0M7QUFDWDs7QUFFN0I7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFZSxzRUFBTyxFOzs7Ozs7Ozs7Ozs7QUN4RXRCO0FBQUE7QUFBQTtBQUFrQztBQUNHOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIscURBQUk7QUFDakMsZ0JBQWdCLHVEQUFLO0FBQ3JCO0FBQ0E7QUFDQSxDQUFDLEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IE1vdmluZ09iaiBmcm9tICcuL21vdmluZ19vYmplY3QnO1xuaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2tzJztcblxuY29uc3QgcmFuZG9tQ29sb3IgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlncyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuICAgIGxldCBjb2xvciA9IFwiI1wiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGNvbG9yICs9IGRpZ3NbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDE2KSldO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG59O1xuXG5jbGFzcyBCYWxsIGV4dGVuZHMgTW92aW5nT2JqIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIHJhZGl1cywgaW5pdGlhbEZsYWcgPSBmYWxzZSwgdHlwZT1cIm5vcm1hbFwiKSB7XG4gICAgICAgIHN1cGVyKHBvcywgeyB4OiAwLCB5OiAwIH0pO1xuICAgICAgICB0aGlzLmNvbG9yID0gcmFuZG9tQ29sb3IoKTtcbiAgICAgICAgdGhpcy5kaXIgPSB7IHg6IDAsIHk6IDAgfVxuICAgICAgICB0aGlzLmluaXRpYWxGbGFnID0gaW5pdGlhbEZsYWc7XG4gICAgICAgIHRoaXMuc3BpblNwZWVkID0gTWF0aC5yYW5kb20oKSAqIDYwICsgMzA7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSwgdHJ1ZSk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfTtcblxuICAgIGNvbGxpZGVzV2l0aChvdGhlck9iaikge1xuICAgICAgICBpZiAob3RoZXJPYmogaW5zdGFuY2VvZiBCbG9jaykge1xuICAgICAgICAgICAgdGhpcy5ib3VuY2UoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByaWdodFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnggPSAtTWF0aC5hYnModGhpcy52ZWwueCkgKiAwLjk1O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBsZWZ0V2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueCA9IE1hdGguYWJzKHRoaXMudmVsLngpICogMC45NTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdG9wV2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueSA9IE1hdGguYWJzKHRoaXMudmVsLnkpICogMC45NTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgYm91bmNlKCkge1xuICAgICAgICBpZiAodGhpcy5kaXIueCAhPT0gMCAmJiB0aGlzLmRpci55ICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXIueCA9IC10aGlzLmRpci54O1xuICAgICAgICAgICAgICAgIHRoaXMuZGlyLnkgPSAtdGhpcy5kaXIueTtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbC55ID0gLXRoaXMudmVsLnk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9OyAgICBcblxuICAgIC8vIGJvdW5jZSgpIHtcbiAgICAvLyAgICAgaWYgKHRoaXMuZGlyLnggIT09IDAgJiYgdGhpcy5kaXIueSAhPT0gMCkge1xuICAgIC8vICAgICAgICAgdGhpcy5kaXIueCA9IC10aGlzLmRpci54O1xuICAgIC8vICAgICAgICAgdGhpcy5kaXIueSA9IC10aGlzLmRpci55O1xuICAgIC8vICAgICAgICAgdGhpcy52ZWwueSA9IC10aGlzLnZlbC55O1xuICAgIC8vICAgICB9O1xuICAgIC8vIH07ICAgIFxuXG4gICAgaW5pdGlhbFJvdGF0aW9uKCkge1xuICAgICAgICBsZXQgcmFkcyA9IDkwICogKE1hdGguUEkgLyAxODApO1xuICAgICAgICB0aGlzLmRpci54ID0gTWF0aC5jb3MocmFkcyk7XG4gICAgICAgIHRoaXMuZGlyLnkgPSBNYXRoLnNpbihyYWRzKTtcbiAgICB9O1xuXG4gICAgcm90YXRlKGRlbHRhVGltZSkge1xuICAgICAgICBpZiAodGhpcy5kaXIueSAhPT0gMCkge1xuICAgICAgICAgICAgbGV0IGFuZ2xlID0gLXRoaXMuc3BpblNwZWVkICogKE1hdGguUEkgLyAxODApICogZGVsdGFUaW1lO1xuICAgICAgICAgICAgbGV0IHZlY3RvciA9IFt0aGlzLmRpci54LCB0aGlzLmRpci55XTtcblxuICAgICAgICAgICAgdmFyIGNvcyA9IE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgIHZhciBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGlyLnggPSBNYXRoLnJvdW5kKDEwMDAwICogKHZlY3RvclswXSAqIGNvcyAtIHZlY3RvclsxXSAqIHNpbikpIC8gMTAwMDA7XG4gICAgICAgICAgICB0aGlzLmRpci55ID0gTWF0aC5yb3VuZCgxMDAwMCAqICh2ZWN0b3JbMF0gKiBzaW4gKyB2ZWN0b3JbMV0gKiBjb3MpKSAvIDEwMDAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQmFsbFJlbGVhc2UoaW5wdXQsIGtleSkge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbEZsYWcgJiYga2V5ICE9PSBcInNwYWNlXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmVsLnggKz0gaW5wdXRbMF07XG4gICAgICAgICAgICB0aGlzLnZlbC55ICs9IGlucHV0WzFdO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJzcGFjZVwiICYmIHRoaXMuZGlyLnggPT09IDAgJiYgdGhpcy5kaXIueSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy52ZWwueCArPSBpbnB1dFswXTtcbiAgICAgICAgICAgIHRoaXMudmVsLnkgKz0gaW5wdXRbMV07XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxSb3RhdGlvbigpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIG1vdmUoZGVsdGFUaW1lKSB7XG4gICAgICAgIHN1cGVyLm1vdmUoZGVsdGFUaW1lKTtcbiAgICAgICAgdGhpcy5yb3RhdGUoZGVsdGFUaW1lKTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCYWxsOyIsImNvbnN0IHJhbmRvbUNvbG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpZ3MgPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcbiAgICBsZXQgY29sb3IgPSBcIiNcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBjb2xvciArPSBkaWdzW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxNikpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufTtcblxuY2xhc3MgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKHBvcywgd2lkdGgsIGhlaWdodCwgcG93ZXJVcCkge1xuICAgICAgICB0aGlzLnBvcyA9IHBvcztcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5jb2xvciA9IHJhbmRvbUNvbG9yKCk7XG4gICAgICAgIHRoaXMucG93ZXJVcCA9IHBvd2VyVXA7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQmxvY2s7IiwiY2xhc3MgR1ZJRVcge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmlucHV0ID0ge1xuICAgICAgICAgICAgc3BhY2U6IFswLCAtTWF0aC5mbG9vcih0aGlzLmdhbWUuaGVpZ2h0IC8gMy40MyldXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGtleUhhbmRsZXIoKSB7ICAgXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlS2V5KGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUtleShldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBoYW5kbGVLZXkoZXZlbnQpIHtcbiAgICAgICAgbGV0IGlucHV0ID0gdGhpcy5pbnB1dDtcbiAgICAgICAgaWYgKCF0aGlzLmdhbWUuYmFsbHNbMF0uaW5pdGlhbEZsYWcpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgNjU6XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBcImtleWRvd25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IC1NYXRoLmZsb29yKHRoaXMuZ2FtZS53aWR0aCAvIDIuNjMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxzWzBdLnZlbC54ID0gLU1hdGguZmxvb3IodGhpcy5nYW1lLndpZHRoIC8gMi42Myk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsc1swXS52ZWwueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2ODpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwia2V5ZG93blwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gTWF0aC5mbG9vcih0aGlzLmdhbWUud2lkdGggLyAyLjYzKTs7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbHNbMF0udmVsLnggPSBNYXRoLmZsb29yKHRoaXMuZ2FtZS53aWR0aCAvIDIuNjMpOztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxzWzBdLnZlbC54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsc1swXS5pbml0aWFsRmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbHNbMF0uaGFuZGxlQmFsbFJlbGVhc2UoaW5wdXQuc3BhY2UsIE9iamVjdC5rZXlzKHRoaXMuaW5wdXQpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDY1OlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAtTWF0aC5mbG9vcih0aGlzLmdhbWUud2lkdGggLyAyLjYzKTs7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnZlbC54ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDY4OlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSBNYXRoLmZsb29yKHRoaXMuZ2FtZS53aWR0aCAvIDIuNjMpOztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9OyAgICAgXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmtleUhhbmRsZXIoKTtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XG4gICAgfTtcblxuICAgIGFuaW1hdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5nYW1lLmlzT3ZlcigpKSB7XG4gICAgICAgICAgICBjb25zdCBkZWx0YVQgPSAobmV3IERhdGUoKSAtIHRoaXMubGFzdFRpbWUpIC8gMTAwMDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zaW5nbGVNb3ZlKGRlbHRhVClcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5kcmF3KCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLmhlaWdodCk7XG4gICAgICAgICAgICBjb25zdCBlbmRTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVuZC1zY3JlZW5cIik7XG4gICAgICAgICAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtZ2FtZVwiKTtcbiAgICAgICAgICAgIGNvbnN0IGFycm93RG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXJyb3ctc3RhcnRcIik7XG5cbiAgICAgICAgICAgIGVuZFNjcmVlbi5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICAgICAgYXJyb3dEb3duLmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgICAgICBzdGFydEJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdWSUVXOyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgQmFsbCBmcm9tICcuL2JhbGwnO1xuaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2tzJztcbmltcG9ydCBQb3dlcnVwIGZyb20gJy4vcG93ZXJ1cCdcblxuY29uc3QgU1RBUlRJTkdfTElWRVMgPSAxO1xuLy8gY29uc3QgU1RBUlRJTkdfTElWRVMgPSAzO1xuY29uc3QgQkxPQ0tfSEVJR0hUID0gNTA7XG5jb25zdCBCTE9DS19XSURUSCA9IDUwO1xuY29uc3QgQkxPQ0tTX05VTSA9IDcyO1xuY29uc3QgUE9XRVJVUFMgPSBbXCJleHRyYUxpZmVcIiwgXCJtdWx0aUJhbGxcIiwgXCJzaG9ydGVyUGFkZGxlXCIsIFwibG9uZ2VyUGFkZGxlXCIsIFwibWluaUJhbGxcIiwgXCJtZWdhQmFsbFwiLCBcInN1cGVyQmFsbFwiXTtcbmNvbnN0IFRPVEFMX1BPV0VSVVBfQ09VTlQgPSAxMjtcblxuXG5jbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMubGl2ZXMgPSBTVEFSVElOR19MSVZFUztcbiAgICAgICAgdGhpcy5ibG9ja3MgPSBbXTtcblxuICAgICAgICB0aGlzLnBsYXllcldpZHRoID0gTWF0aC5mbG9vcih0aGlzLndpZHRoIC8gNy42Nyk7XG4gICAgICAgIHRoaXMucGxheWVySGVpZ2h0ID0gTWF0aC5mbG9vcih0aGlzLmhlaWdodCAvIDIwKTtcbiAgICAgICAgdGhpcy5wbGF5ZXJTdGFydCA9IHsgeDogTWF0aC5mbG9vcih0aGlzLndpZHRoIC8gMi4zMyksIHk6IE1hdGguZmxvb3IodGhpcy5oZWlnaHQgKiAwLjg4KSB9O1xuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wbGF5ZXJTdGFydCksIHRoaXMucGxheWVyV2lkdGgsIHRoaXMucGxheWVySGVpZ2h0LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5iYWxsU3RhcnQgPSB7IHg6IE1hdGguZmxvb3IodGhpcy53aWR0aCAvIDIuMzMpLCB5OiBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0ICogMC43KSB9O1xuXG4gICAgICAgIHRoaXMuYmFsbHMgPSBbbmV3IEJhbGwoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5iYWxsU3RhcnQsIHRoaXMuYmFsbFJhZGl1cykpXTtcblxuXG4gICAgICAgIHRoaXMudGhlbWVDb2xvciA9IFwiI2JkYWU1N1wiO1xuICAgICAgICB0aGlzLm51bUJsb2NrcyA9IEJMT0NLU19OVU07XG4gICAgICAgIHRoaXMuYmxvY2tXaWR0aCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAvIDE4LjQpO1xuICAgICAgICB0aGlzLmJsb2NrSGVpZ2h0ID0gMTc7XG4gICAgICAgIHRoaXMucG93ZXJ1cENvdW50ID0gVE9UQUxfUE9XRVJVUF9DT1VOVDsgXG4gICAgICAgIHRoaXMucG93ZXJ1cHMgPSBQT1dFUlVQUztcbiAgICAgICAgdGhpcy5hY3RpdmVQb3dlcnVwcyA9IFtdO1xuICAgICAgICB0aGlzLnRvdGFsUG93ZXJ1cHMgPSBbXTtcbiAgICAgICAgdGhpcy5tb3ZpbmdQb3dlcnVwcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuYWRkQmxvY2tzKHRoaXMubnVtQmxvY2tzKTtcbiAgICB9OyAgIFxuICAgICBcbiAgICBhZGRCbG9ja3Mobikge1xuICAgICAgICBsZXQgYmxvY2tQb3NYID0gMTA7XG4gICAgICAgIGxldCBibG9ja1Bvc1kgPSAxMDtcbiAgICAgICAgbGV0IGkgPSAwO1xuXG4gICAgICAgIHdoaWxlIChpIDwgbikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmJsb2Nrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZG9tUG93ZXJ1cCA9IG5ldyBQb3dlcnVwKHsgeDogYmxvY2tQb3NYLCB5OiBibG9ja1Bvc1kgfSwgdGhpcy5nZXRSYW5kb20odGhpcy5wb3dlcnVwcykpO1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxQb3dlcnVwcy5wdXNoKHJhbmRvbVBvd2VydXApO1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tzLnB1c2gobmV3IEJsb2NrKHsgeDogYmxvY2tQb3NYLCB5OiBibG9ja1Bvc1kgfSwgdGhpcy5ibG9ja1dpZHRoLCB0aGlzLmJsb2NrV2lkdGgsIHJhbmRvbVBvd2VydXApKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9jayh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIEJMT0NLX1dJRFRILCBCTE9DS19IRUlHSFQsIHJhbmRvbVBvd2VydXApKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvd2VydXBDb3VudCAtPSAxO1xuICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGJsb2NrUG9zWCArPSBCTE9DS19XSURUSDtcbiAgICAgICAgICAgIGlmIChibG9ja1Bvc1ggPiA4NzgpIHtcbiAgICAgICAgICAgICAgICBibG9ja1Bvc1ggPSAxMDtcbiAgICAgICAgICAgICAgICBibG9ja1Bvc1kgPSBibG9ja1Bvc1kgKz0gQkxPQ0tfSEVJR0hUO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgJSA2ID09PSAwICYmIHRoaXMucG93ZXJ1cENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCByYW5kb21Qb3dlcnVwID0gbmV3IFBvd2VydXAoeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCB0aGlzLmdldFJhbmRvbSh0aGlzLnBvd2VydXBzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbFBvd2VydXBzLnB1c2gocmFuZG9tUG93ZXJ1cCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCB0aGlzLmJsb2NrV2lkdGgsIHRoaXMuYmxvY2tXaWR0aCwgcmFuZG9tUG93ZXJ1cCkpO1xuICAgICAgICAgICAgICAgIHRoaXMucG93ZXJ1cENvdW50IC09IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tzLnB1c2gobmV3IEJsb2NrKHsgeDogYmxvY2tQb3NYLCB5OiBibG9ja1Bvc1kgfSwgdGhpcy5ibG9ja1dpZHRoLCB0aGlzLmJsb2NrV2lkdGgsIG51bGwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLnNodWZmbGVBcnIodGhpcy5ibG9ja3MpO1xuICAgIH07XG4gICAgXG4gICAgc2h1ZmZsZUFycihhcnIpIHtcbiAgICAgICAgYXJyLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XG4gICAgfVxuXG4gICAgZ2V0UmFuZG9tKGFycikge1xuICAgICAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKSldO1xuICAgIH1cblxuICAgIGFsbEN1ck9iamVjdHMoKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoW3RoaXMucGxheWVyXSwgdGhpcy5iYWxscywgdGhpcy5ibG9ja3MsIHRoaXMubW92aW5nUG93ZXJ1cHMpO1xuICAgIH07XG5cbiAgICBhbGxDdXJNb3ZpbmdPYmpzKCkge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KFt0aGlzLnBsYXllcl0sIHRoaXMuYmFsbHMsIHRoaXMubW92aW5nUG93ZXJ1cHMpO1xuICAgIH07XG4gXG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy50aGVtZUNvbG9yO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIzMHB4IFNhbnMtU2VyaWZcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjOGE4OTFmXCI7XG4gICAgICAgIGlmICh0aGlzLmxpdmVzID4gMSkge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoYCR7dGhpcy5saXZlc30gTGl2ZXMgTGVmdGAsIDc1MCwgNTgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGAke3RoaXMubGl2ZXN9IExpZmUgTGVmdGAsIDc1MCwgNTgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWxsQ3VyT2JqZWN0cygpLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgIG9iai5kcmF3KHRoaXMuY3R4KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIG1vdmVPYmplY3RzKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1vdmluZ09iaiA9IHRoaXMuYWxsQ3VyTW92aW5nT2JqcygpO1xuICAgICAgICBtb3ZpbmdPYmouZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgb2JqLm1vdmUoZGVsdGEpO1xuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEJhbGwgJiYgdGhpcy5pc091dE9mQm91bmRzKG9iai5wb3MueSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iYWxscy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWF0aEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKG9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQb3dlcnVwICYmIHRoaXMuaXNPdXRPZkJvdW5kcyhvYmoucG9zLnkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUob2JqKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzaW5nbGVNb3ZlKGRlbHRhKSB7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JDb2xsaXNpb25zKCk7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JXYWxsQ29sbGlzaW9ucygpO1xuICAgICAgICB0aGlzLm1vdmVPYmplY3RzKGRlbHRhKTtcbiAgICB9O1xuXG4gICAgaXNPdXRPZkJvdW5kcyhwb3NZKSB7XG4gICAgICAgIGlmIChwb3NZID4gKDU2MCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGRlYXRoQW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLmxpdmVzIC09IDE7XG4gICAgICAgIGlmICh0aGlzLmxpdmVzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJHYW1lIE92ZXIhXCJcbiAgICAgICAgfSBlbHNlIHsgICAgIFxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIud2lkdGggPSB0aGlzLnBsYXllcldpZHRoO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBsYXllclN0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnZlbCA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuYmFsbHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFsbHMgPSB0aGlzLmJhbGxzLnNsaWNlKDAsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5iYWxsc1swXS5wb3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJhbGxTdGFydCk7XG4gICAgICAgICAgICB0aGlzLmJhbGxzWzBdLmRpciA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICAgICAgdGhpcy5iYWxsc1swXS52ZWwgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgICAgIHRoaXMuYmFsbHNbMF0ucmFkaXVzID0gdGhpcy5iYWxsUmFkaXVzO1xuICAgICAgICAgICAgdGhpcy5iYWxsc1swXS5pbml0aWFsRmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVQb3dlcnVwcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5tb3ZpbmdQb3dlcnVwcyA9IFtdO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjaGVja0ZvcldhbGxDb2xsaXNpb25zKCkge1xuICAgICAgICBjb25zdCBhbGxNb3ZpbmdPYmogPSB0aGlzLmFsbEN1ck1vdmluZ09ianMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxNb3ZpbmdPYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IGFsbE1vdmluZ09ialtpXTtcbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgUGxheWVyKSAmJiAob2JqLnBvcy54IDwgMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLmxlZnRXYWxsQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIFBsYXllcikgJiYgKG9iai5wb3MueCA+ICh0aGlzLndpZHRoIC0gb2JqLndpZHRoKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnJpZ2h0V2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBCYWxsKSAmJiAob2JqLnBvcy54IDwgKG9iai5yYWRpdXMpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUJvdW5jZVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5sZWZ0V2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBCYWxsKSAmJiAob2JqLnBvcy54ID4gKHRoaXMud2lkdGggLSBvYmoucmFkaXVzKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb3VuY2VTb3VuZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoucmlnaHRXYWxsQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIEJhbGwpICYmIChvYmoucG9zLnkgPCAob2JqLnJhZGl1cykgfHwgb2JqLnBvcy55ID4gKHRoaXMud2lkdGggLSBvYmoucmFkaXVzKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb3VuY2VTb3VuZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoudG9wV2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBpc092ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm51bUJsb2NrcyA9PT0gMCB8fCB0aGlzLmxpdmVzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNDb2xsaWRlZChvYmoxLCBvYmoyKSB7XG4gICAgICAgIGxldCBkeCA9IE1hdGguYWJzKG9iajIucG9zLnggLSBvYmoxLnBvcy54IC0gb2JqMS53aWR0aCAvIDIpO1xuICAgICAgICBsZXQgZHkgPSBNYXRoLmFicyhvYmoyLnBvcy55IC0gb2JqMS5wb3MueSAtIG9iajEuaGVpZ2h0IC8gMik7XG4gICAgICAgIGlmIChkeCA+IChvYmoxLndpZHRoIC8gMiArIG9iajIucmFkaXVzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoZHkgPiAob2JqMS5oZWlnaHQgLyAyICsgb2JqMi5yYWRpdXMpKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGR4IDw9IChvYmoxLndpZHRoIC8gMikpIHsgXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkeSA8PSAob2JqMS5oZWlnaHQgLyAyKSkgeyBcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyBcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGRYID0gZHggLSBvYmoxLndpZHRoIC8gMjtcbiAgICAgICAgbGV0IGRZID0gZHkgLSBvYmoyLndpZHRoIC8gMjtcbiAgICAgICAgcmV0dXJuIChkWCAqIGRYICsgZFkgKiBkWSA8PSAob2JqMi5yYWRpdXMgKiBvYmoyLnJhZGl1cykpO1xuICAgIH07XG5cbiAgICByZW1vdmUob2JqKSB7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBCbG9jaykge1xuICAgICAgICAgICAgaWYgKG9iai5wb3dlclVwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBVcCA9IHRoaXMudG90YWxQb3dlcnVwcy5pbmRleE9mKG9iai5wb3dlclVwKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmluZ1Bvd2VydXBzLnB1c2godGhpcy50b3RhbFBvd2VydXBzW3BVcF0pO1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxQb3dlcnVwcy5zcGxpY2UocFVwLDEpO1xuICAgICAgICAgICAgICAgIG9iai5wb3dlclVwLmluaXRpYXRlTW92ZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMubnVtQmxvY2tzIC09IDE7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5zcGxpY2UodGhpcy5ibG9ja3MuaW5kZXhPZihvYmopLCAxKTtcbiAgICAgICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBQb3dlcnVwKSB7XG4gICAgICAgICAgICBsZXQgcFVwID0gdGhpcy5tb3ZpbmdQb3dlcnVwcy5pbmRleE9mKG9iaik7XG4gICAgICAgICAgICB0aGlzLm1vdmluZ1Bvd2VydXBzLnNwbGljZShwVXAsIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEJhbGwpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbHMuc3BsaWNlKHRoaXMuYmFsbHMuaW5kZXhPZihvYmopLCAxKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY2hlY2tGb3JDb2xsaXNpb25zKCkge1xuICAgICAgICBjb25zdCBhbGxPYmogPSB0aGlzLmFsbEN1ck9iamVjdHMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxPYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGFsbE9iai5sZW5ndGg7IGogKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYmoxID0gYWxsT2JqW2ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9iajIgPSBhbGxPYmpbal07XG4gICAgICAgICAgICAgICAgaWYgKG9iajEgaW5zdGFuY2VvZiBQbGF5ZXIgJiYgb2JqMiBpbnN0YW5jZW9mIEJhbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRlZChvYmoxLCBvYmoyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuY29sbGlkZXNXaXRoKG9iajIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqMSBpbnN0YW5jZW9mIFBsYXllciAmJiBvYmoyIGluc3RhbmNlb2YgUG93ZXJ1cCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbGxpZGVkKG9iajEsIG9iajIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxpZGVzV2l0aFBvd2VydXAob2JqMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlQb3dlcnVwU291bmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKG9iajIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqMSBpbnN0YW5jZW9mIEJhbGwgJiYgb2JqMiBpbnN0YW5jZW9mIEJsb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkZWQob2JqMiwgb2JqMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoxLmNvbGxpZGVzV2l0aChvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKG9iajIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb2xsaWRlc1dpdGhQb3dlcnVwKHBvd2VydXApIHtcbiAgICAgICAgc3dpdGNoIChwb3dlcnVwLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJleHRyYUxpZmVcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxpdmVzICs9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibXVsdGlCYWxsXCI6XG4gICAgICAgICAgICAgICAgbGV0IG5ld2VyQmFsbHM7XG4gICAgICAgICAgICAgICAgdGhpcy5iYWxscy5mb3JFYWNoKGJhbGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3QmFsbHMgPSBbbmV3IEJhbGwoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5iYWxsc1swXS5wb3MpLCB0cnVlKSwgbmV3IEJhbGwoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5iYWxsc1swXS5wb3MpLCB0cnVlKV07XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzBdLnZlbC55ID0gLU1hdGguYWJzKGJhbGwudmVsLnkpO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1swXS52ZWwueCA9IC1NYXRoLmFicyhiYWxsLnZlbC54KTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMF0uZGlyLnggPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMF0uZGlyLnkgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMF0udHlwZSA9IGJhbGwudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMF0ucmFkaXVzID0gYmFsbC5yYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzBdLmNvbG9yID0gYmFsbC5jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMV0udmVsLnkgPSAtTWF0aC5hYnMoYmFsbC52ZWwueSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0JhbGxzWzFdLnZlbC54ID0gLU1hdGguYWJzKGJhbGwudmVsLnggKiAwLjUpO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1sxXS5kaXIueCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1sxXS5kaXIueSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1sxXS50eXBlID0gYmFsbC50eXBlO1xuICAgICAgICAgICAgICAgICAgICBuZXdCYWxsc1sxXS5yYWRpdXMgPSBiYWxsLnJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgbmV3QmFsbHNbMV0uY29sb3IgPSBiYWxsLmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBuZXdlckJhbGxzID0gbmV3QmFsbHM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5iYWxscyA9IHRoaXMuYmFsbHMuY29uY2F0KG5ld2VyQmFsbHMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWVnYUJhbGxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGxzLmZvckVhY2goYmFsbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwucmFkaXVzICo9IDEuNzU7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwudmVsLnggKj0gMC41O1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnZlbC55ICo9IDAuNTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzaG9ydGVyUGFkZGxlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIud2lkdGggPSB0aGlzLnBsYXllci53aWR0aCAqPSAwLjc1O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxvbmdlclBhZGRsZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLndpZHRoID0gdGhpcy5wbGF5ZXIud2lkdGggKj0gMS4yNTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtaW5pQmFsbFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuYmFsbHMuZm9yRWFjaChiYWxsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYmFsbC5yYWRpdXMgKj0gMC41O1xuICAgICAgICAgICAgICAgICAgICBiYWxsLnZlbC54ICo9IDEuMjU7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwudmVsLnkgKj0gMS4yNTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzdXBlckJhbGxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGxzLmZvckVhY2goYmFsbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwuY29sb3IgPSBcIiNGRkQ3MDBcIjtcbiAgICAgICAgICAgICAgICAgICAgYmFsbC50eXBlID0gXCJzdXBlckJhbGxcIjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hY3RpdmVQb3dlcnVwcy5wdXNoKHBvd2VydXApO1xuICAgIH07XG5cbiAgICBwbGF5U291bmQoKSB7XG4gICAgICAgIGNvbnN0IGJhbGxTb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmxvY2tTb3VuZFwiKTtcbiAgICAgICAgYmFsbFNvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgYmFsbFNvdW5kLnBsYXkoKTtcbiAgICB9O1xuXG4gICAgcGxheUJvdW5jZVNvdW5kKCkge1xuICAgICAgICBjb25zdCBhbm90aGVyU291bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFub3RoZXJTb3VuZFwiKTtcbiAgICAgICAgYW5vdGhlclNvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgYW5vdGhlclNvdW5kLnBsYXkoKTtcbiAgICB9O1xuXG4gICAgcGxheVBvd2VydXBTb3VuZCgpIHtcbiAgICAgICAgY29uc3QgcG93ZXJ1cFNvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3dlcnVwU291bmRcIik7XG4gICAgICAgIHBvd2VydXBTb3VuZC5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIHBvd2VydXBTb3VuZC5wbGF5KCk7XG4gICAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJcbmNsYXNzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zLCB2ZWwpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgICAgIHRoaXMudmVsID0gdmVsO1xuICAgIH07XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VYID0gdGhpcy52ZWwueCAqIGRlbHRhVGltZTtcbiAgICAgICAgbGV0IG5ld0Rpc3RhbmNlWSA9IHRoaXMudmVsLnkgKiBkZWx0YVRpbWU7XG4gICAgICAgIHRoaXMucG9zLnggPSB0aGlzLnBvcy54ICsgbmV3RGlzdGFuY2VYO1xuICAgICAgICB0aGlzLnBvcy55ID0gdGhpcy5wb3MueSArIG5ld0Rpc3RhbmNlWTtcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTW92aW5nT2JqZWN0OyIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9tb3Zpbmdfb2JqZWN0JztcbmltcG9ydCBCYWxsIGZyb20gJy4vYmFsbCc7XG5cbmNvbnN0IHJhbmRvbUNvbG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpZ3MgPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcbiAgICBsZXQgY29sb3IgPSBcIiNcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBjb2xvciArPSBkaWdzW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxNikpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufTtcblxuY2xhc3MgUGxheWVyIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIHdpZHRoLCBoZWlnaHQsIGdhbWVXaWR0aCwgZ2FtZUhlaWdodCkge1xuICAgICAgICBzdXBlcihwb3MsIHsgeDogMCwgeTogMCB9KVxuICAgICAgICB0aGlzLmNvbG9yID0gcmFuZG9tQ29sb3IoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICAgICAgICB0aGlzLmdhbWVXaWR0aCA9IGdhbWVXaWR0aDtcbiAgICAgICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZUhlaWdodDtcbiAgICB9O1xuXG4gICAgbW92ZShkZWx0YVRpbWUpIHtcbiAgICAgICAgbGV0IG5ld0Rpc3RhbmNlWCA9IHRoaXMudmVsLnggKiBkZWx0YVRpbWU7XG4gICAgICAgIHRoaXMucG9zLnggPSB0aGlzLnBvcy54ICsgbmV3RGlzdGFuY2VYO1xuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9O1xuXG4gICAgZ2V0UmFuZG9tKGFycikge1xuICAgICAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKSldO1xuICAgIH1cblxuICAgIGNvbGxpZGVzV2l0aChvdGhlck9iaikge1xuICAgICAgICBpZiAob3RoZXJPYmogaW5zdGFuY2VvZiBCYWxsKSB7XG4gICAgICAgICAgICBpZiAob3RoZXJPYmoucG9zLnggPj0gKHRoaXMucG9zLnggKyB0aGlzLmhlaWdodCkgJiYgb3RoZXJPYmoucG9zLnggPD0gKHRoaXMucG9zLnggKyBNYXRoLmZsb29yKHRoaXMud2lkdGggLyAyKSkgKSB7XG4gICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci54ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci54KTsgXG4gICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci55ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci55KTtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnkgPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLnkpICogMS4wNTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3RoZXJPYmoucG9zLnggPCAodGhpcy5wb3MueCArIHRoaXMuaGVpZ2h0KSAmJiBvdGhlck9iai5wb3MueCA+PSAodGhpcy5wb3MueCkpICB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlck9iai52ZWwueCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnggPSB0aGlzLmdldFJhbmRvbShbLTE3NSwgMTc1XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjA1O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG90aGVyT2JqLnZlbC54IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnggPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnkgPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLnkpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC54ID0gLU1hdGguYWJzKG90aGVyT2JqLnZlbC54KTsgXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjA1O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnggPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnkgPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnggPSBNYXRoLmFicyhvdGhlck9iai52ZWwueCk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnkgPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLnkpICogMS4wNTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlck9iai52ZWwueCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnggPSB0aGlzLmdldFJhbmRvbShbLTE3NSwgMTc1XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjA1O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG90aGVyT2JqLnZlbC54IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnggPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmouZGlyLnkgPSAtTWF0aC5hYnMob3RoZXJPYmouZGlyLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnggPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnkgPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLnkpICogMS4wNTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci54ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci54KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLmRpci55ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyT2JqLnZlbC54ID0gTWF0aC5hYnMob3RoZXJPYmoudmVsLngpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJPYmoudmVsLnkgPSAtTWF0aC5hYnMob3RoZXJPYmoudmVsLnkpICogMS4wNTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByaWdodFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnggPSAtTWF0aC5mbG9vcih0aGlzLmdhbWVIZWlnaHQgLyA2KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbGVmdFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnggPSBNYXRoLmZsb29yKHRoaXMuZ2FtZUhlaWdodCAvIDYpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vbW92aW5nX29iamVjdCc7XG5cbmNvbnN0IGV4dHJhTGlmZSA9IG5ldyBJbWFnZSgpO1xuZXh0cmFMaWZlLnNyYyA9ICcuL3NyYy9jbGFzc2VzL2V4dHJhTGlmZVBvd2VydXAucG5nJztcblxuY29uc3QgbXVsdGlCYWxsID0gbmV3IEltYWdlKCk7XG5tdWx0aUJhbGwuc3JjID0gJy4vc3JjL2NsYXNzZXMvcG93ZXJ1cE11bHRpQmFsbEZpbmFsLnBuZyc7XG5cbmNvbnN0IHNob3J0ZXJQYWRkbGUgPSBuZXcgSW1hZ2UoKTtcbnNob3J0ZXJQYWRkbGUuc3JjID0gJy4vc3JjL2NsYXNzZXMvcG93ZXJ1cFNtYWxsQmF0LnBuZyc7XG5cbmNvbnN0IGxvbmdlclBhZGRsZSA9IG5ldyBJbWFnZSgpO1xubG9uZ2VyUGFkZGxlLnNyYyA9ICcuL3NyYy9jbGFzc2VzL3Bvd2VydXBCaWdCYXQucG5nJztcblxuY29uc3QgbWVnYUJhbGwgPSBuZXcgSW1hZ2UoKTtcbm1lZ2FCYWxsLnNyYyA9ICcuL3NyYy9jbGFzc2VzL3Bvd2VydXBNZWdhYmFsbC5wbmcnO1xuXG5jb25zdCBtaW5pQmFsbCA9IG5ldyBJbWFnZSgpO1xubWluaUJhbGwuc3JjID0gJy4vc3JjL2NsYXNzZXMvbWluaUJhbGxQb3dlcnVwLnBuZyc7XG5cbmNvbnN0IHN1cGVyQmFsbCA9IG5ldyBJbWFnZSgpO1xuc3VwZXJCYWxsLnNyYyA9ICcuL3NyYy9jbGFzc2VzL3N1cGVyQmFsbFBvd2VydXAucG5nJztcblxuY29uc3QgUE9XRVJVUF9SQURJVVMgPSA1MDsgXG5cbmNsYXNzIFBvd2VydXAgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gICAgY29uc3RydWN0b3IocG9zLCB0eXBlKSB7XG4gICAgICAgIHN1cGVyKHBvcywgeyB4OiAwLCB5OiAwIH0sIFBPV0VSVVBfUkFESVVTKVxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBsZXQgaW1nO1xuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImV4dHJhTGlmZVwiOlxuICAgICAgICAgICAgICAgIGltZyA9IGV4dHJhTGlmZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJtdWx0aUJhbGxcIjpcbiAgICAgICAgICAgICAgICBpbWcgPSBtdWx0aUJhbGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2hvcnRlclBhZGRsZVwiOlxuICAgICAgICAgICAgICAgIGltZyA9IHNob3J0ZXJQYWRkbGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibG9uZ2VyUGFkZGxlXCI6XG4gICAgICAgICAgICAgICAgaW1nID0gbG9uZ2VyUGFkZGxlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1lZ2FCYWxsXCI6XG4gICAgICAgICAgICAgICAgaW1nID0gbWVnYUJhbGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWluaUJhbGxcIjpcbiAgICAgICAgICAgICAgICBpbWcgPSBtaW5pQmFsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzdXBlckJhbGxcIjpcbiAgICAgICAgICAgICAgICBpbWcgPSBzdXBlckJhbGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgdGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzKTtcbiAgICAgICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICB9O1xuXG4gICAgaW5pdGlhdGVNb3ZlKCkge1xuICAgICAgICB0aGlzLnZlbC55ICs9IDE1MDtcbiAgICB9XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VZID0gdGhpcy52ZWwueSAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueSA9IHRoaXMucG9zLnkgKyBuZXdEaXN0YW5jZVk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvd2VydXA7IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vY2xhc3Nlcy9nYW1lXCI7XG5pbXBvcnQgR1ZpZXcgZnJvbSBcIi4vY2xhc3Nlcy9nX3ZpZXdcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGxldCBnaXRodWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdpdGh1YlwiKTtcbiAgICBnaXRodWIub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vbXdkZXNoYXcnO1xuICAgIH1cbiAgICBsZXQgbGlua2VkaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmtlZGluXCIpO1xuICAgIGxpbmtlZGluLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL21hdHRoZXctZGVzaGF3LWI2MjlhMGJhLyc7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWZhdWx0XCIpO1xuICAgIGNvbnN0IHBvd2VyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3dlci1idG5cIik7XG4gICAgcG93ZXJCdG4uY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcblxuICAgIGNvbnN0IGFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hcnJvd1wiKTtcbiAgICBwb3dlckJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBwb3dlckJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kXCIpO1xuICAgICAgICBhcnJvdy5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICBkZWZTY3JlZW4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG4gICAgICAgIGNvbnN0IHN0YXJ0U2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LXNjcmVlbicpO1xuICAgICAgICBzdGFydFNjcmVlbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcblxuICAgICAgICBjb25zdCBsaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3dlci1sdCcpO1xuICAgICAgICBsaWdodC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcblxuICAgICAgICBjb25zdCBzY3JlZW5UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydC10ZXh0XCIpO1xuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKTtcbiAgICAgICAgY29uc3QgY29udHJvbHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250cm9scy1saXN0XCIpO1xuXG4gICAgICAgIHNjcmVlblRleHQuY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWdhbWVcIik7XG4gICAgICAgIGNvbnN0IGFycm93RG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXJyb3ctc3RhcnRcIik7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVib3lTb3VuZFwiKTtcbiAgICAgICAgICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICAgICAgY29udHJvbHNMaXN0LmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgICAgICBzdGFydEJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIGFycm93RG93bi5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICB9LCAzMDAwKTtcblxuICAgICAgICBzdGFydEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICBhcnJvd0Rvd24uY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIHN0YXJ0U2NyZWVuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgc3RhcnRCdG4ucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICAgICAgICBjb250cm9sc0xpc3QuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIHNjcmVlblRleHQuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIik7XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGN0eCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICBuZXcgR1ZpZXcoZ2FtZSkuc3RhcnQoKTtcbiAgICAgICAgfTtcbiAgICB9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==