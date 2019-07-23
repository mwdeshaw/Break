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
    constructor(pos) {
        super(pos, { x: 0, y: 0 }, BALL_RADIUS);
        this.color = randomColor();
        this.dir = { x: 0, y: 0 }
        this.spinSpeed = Math.random() * 60 + 30;
        this.initialFlag = false;
    };

    draw(ctx) {
        let rotateDir = Math.atan(this.dir.y / this.dir.x);
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(rotateDir);
        ctx.translate(-this.pos.x, -this.pos.y)
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
            this.dir.x = -this.dir.x;
            this.dir.y = -this.dir.y;
            this.vel.y = -this.vel.y;
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
            this.vel.y = -this.vel.y * 1.08;
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
    constructor(pos, width, height, type, powerUp = null) {
        this.pos = pos;
        this.width = width;
        this.height = height;
        this.color = randomColor();
        this.type = type;
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
            a: [-100, 0],
            d: [100, 0],
            space: [0, -100]
        };
    };

    keyHandler() {   
        document.addEventListener("keydown", event => {
            this.handleKey(event, true);
        });
        document.addEventListener("keyup", event => {
            this.handleKey(event, false);
        });
    };

    handleKey(event, down) {
        let input = this.input;
        if (!this.game.ball.initialFlag) {
            switch (event.keyCode) {
                case 65:
                    if (input.a !== down) {
                        this.game.player.setKeyInputs(input.a, Object.keys(this.input)[0]);
                        this.game.ball.handleBallRelease(input.a, Object.keys(this.input)[0]);
                    }
                    break;
                case 68:
                    if (input.d !== down) {
                        this.game.player.setKeyInputs(input.d, Object.keys(this.input)[1]);
                        this.game.ball.handleBallRelease(input.d, Object.keys(this.input)[1]);
                    }
                    break;
                case 32:
                    if (input.space !== down) {
                        this.game.ball.initialFlag = true;
                        this.game.ball.handleBallRelease(input.space, Object.keys(this.input)[2]);
                    }
                    break;
                default:
                    break;
                }
        } else {
            switch (event.keyCode) {
                case 65:
                    if (input.a !== down) {
                        this.game.player.setKeyInputs(input.a, Object.keys(this.input)[0]);
                    }
                    break;
                case 68:
                    if (input.d !== down) {
                        this.game.player.setKeyInputs(input.d, Object.keys(this.input)[1]);
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
const POWERUPS = ["extraLife", "multiBall", "superball", "shorterPaddle", "longerPaddle", "megaBall", "minieBall"];
const TOTAL_POWERUP_COUNT = 12;
const POWERUP_RADIUS = 30;


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
        this.movingPowerUps = [];

        this.addBlocks(this.numBlocks);
    };   
     
    addBlocks(n) {
        let blockPosX = 10;
        let blockPosY = 10;
        let i = 0;

        while (i < n) {
            if (!this.blocks.length) {
                this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT));
                i += 1;
            } 

            blockPosX += BLOCK_WIDTH;
            if (blockPosX > 878) {
                blockPosX = 10;
                blockPosY = blockPosY += BLOCK_HEIGHT;
            }
            if ((i % 3 === 0 || i % 7 === 0 || i % 11 === 0 || i % 15 === 0) && this.powerupCount > 0) {
                let randomPowerup = new _powerup__WEBPACK_IMPORTED_MODULE_3__["default"]({ x: blockPosX, y: blockPosY }, this.powerups.sample(), POWERUP_RADIUS);
                this.totalPowerups.push(randomPowerup);
                this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT, randomPowerup));
                this.powerupCount -= 1;
            } else {
                this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT));
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
            if (obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"] && this.isOutOfBounds(obj.pos.y)) {
                this.deathAnimation();
            };
            if (obj instanceof _powerup__WEBPACK_IMPORTED_MODULE_3__["default"] && this.isOutOfBounds(obj.pos.y)) {
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
            if ((obj instanceof _player__WEBPACK_IMPORTED_MODULE_0__["default"]) && (obj.pos.x < 0)) {
                return obj.leftWallCollision();
            }
            if ((obj instanceof _player__WEBPACK_IMPORTED_MODULE_0__["default"]) && (obj.pos.x > (920 - obj.width))) {
                return obj.rightWallCollision();
            }
            if ((obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) && (obj.pos.x < (0 + obj.radius))) {
                this.playBounceSound();
                return obj.leftWallCollision();
            }
            if ((obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) && (obj.pos.x > (920 - obj.radius))) {
                this.playBounceSound();
                return obj.rightWallCollision();
            }
            if ((obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) && (obj.pos.y < (0 + obj.radius) || obj.pos.y > (600 - obj.radius))) {
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
            this.numBlocks -= 1;
            this.blocks.splice(this.blocks.indexOf(obj), 1);
            if (obj.powerUp) {
                obj.powerUp.initiateMove();
            };
        } else if (obj instanceof _powerup__WEBPACK_IMPORTED_MODULE_3__["default"]) {
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
                if (obj1 instanceof _player__WEBPACK_IMPORTED_MODULE_0__["default"] && obj2 instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) {
                    if (this.isCollided(obj1, obj2)) {
                        this.playBounceSound();
                        obj1.collidesWith(obj2);
                    };
                } else if (obj1 instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"] && obj2 instanceof _player__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                    if (this.isCollided(obj1, obj2)) {
                        this.playBounceSound();
                        obj1.collidesWith(obj2);
                    };
                } else if (obj1 instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"] && obj2 instanceof _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]) {
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

    setKeyInputs(input, key) {
        this.vel.x += input[0];
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

    collidesWith(otherObj) {
        if (otherObj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) {
            otherObj.dir.x = -Math.abs(otherObj.dir.x);
            otherObj.dir.y = -Math.abs(otherObj.dir.y);
            otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.1;
            return true;
        };
    };

    rightWallCollision() {
        this.vel.x = -Math.abs(this.vel.x);
        return true;
    }

    leftWallCollision() {
        this.vel.x = Math.abs(this.vel.x);
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


const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

class Powerup extends _moving_object__WEBPACK_IMPORTED_MODULE_0__["default"]{
    constructor(pos, type, radius) {
        super(pos, { x: 0, y: 0 })
        this.type = type;
        this.color = randomColor();
        this.width = width;
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

    initiateMove() {
        this.vel.y += 100;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvYmFsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9ibG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZ192aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbW92aW5nX29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvcG93ZXJ1cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUF3QztBQUNWO0FBQ0Q7O0FB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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVlLHNFQUFPLEU7Ozs7Ozs7Ozs7OztBQ3hDdEI7QUFBQTtBQUFBO0FBQWtDO0FBQ0c7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixxREFBSTtBQUNqQyxnQkFBZ0IsdURBQUs7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBNb3ZpbmdPYmogZnJvbSAnLi9tb3Zpbmdfb2JqZWN0JztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2tzJztcblxuY29uc3QgQkFMTF9SQURJVVMgPSAyMDtcblxuY29uc3QgcmFuZG9tQ29sb3IgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlncyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuICAgIGxldCBjb2xvciA9IFwiI1wiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGNvbG9yICs9IGRpZ3NbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDE2KSldO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG59O1xuXG5jbGFzcyBCYWxsIGV4dGVuZHMgTW92aW5nT2JqIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MpIHtcbiAgICAgICAgc3VwZXIocG9zLCB7IHg6IDAsIHk6IDAgfSwgQkFMTF9SQURJVVMpO1xuICAgICAgICB0aGlzLmNvbG9yID0gcmFuZG9tQ29sb3IoKTtcbiAgICAgICAgdGhpcy5kaXIgPSB7IHg6IDAsIHk6IDAgfVxuICAgICAgICB0aGlzLnNwaW5TcGVlZCA9IE1hdGgucmFuZG9tKCkgKiA2MCArIDMwO1xuICAgICAgICB0aGlzLmluaXRpYWxGbGFnID0gZmFsc2U7XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGxldCByb3RhdGVEaXIgPSBNYXRoLmF0YW4odGhpcy5kaXIueSAvIHRoaXMuZGlyLngpO1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zLngsIHRoaXMucG9zLnkpO1xuICAgICAgICBjdHgucm90YXRlKHJvdGF0ZURpcik7XG4gICAgICAgIGN0eC50cmFuc2xhdGUoLXRoaXMucG9zLngsIC10aGlzLnBvcy55KVxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSwgdHJ1ZSk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfTtcblxuICAgIGNvbGxpZGVzV2l0aChvdGhlck9iaikge1xuICAgICAgICBpZiAob3RoZXJPYmogaW5zdGFuY2VvZiBQbGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmNlKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChvdGhlck9iaiBpbnN0YW5jZW9mIEJsb2NrKSB7XG4gICAgICAgICAgICB0aGlzLmRpci54ID0gLXRoaXMuZGlyLng7XG4gICAgICAgICAgICB0aGlzLmRpci55ID0gLXRoaXMuZGlyLnk7XG4gICAgICAgICAgICB0aGlzLnZlbC55ID0gLXRoaXMudmVsLnk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmlnaHRXYWxsQ29sbGlzaW9uKCkge1xuICAgICAgICB0aGlzLnZlbC54ID0gLU1hdGguYWJzKHRoaXMudmVsLngpICogMC45NTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbGVmdFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnggPSBNYXRoLmFicyh0aGlzLnZlbC54KSAqIDAuOTU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHRvcFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnkgPSBNYXRoLmFicyh0aGlzLnZlbC55KSAqIDAuOTU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGJvdW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlyLnggIT09IDAgJiYgdGhpcy5kaXIueSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kaXIueCA9IC10aGlzLmRpci54O1xuICAgICAgICAgICAgdGhpcy5kaXIueSA9IC10aGlzLmRpci55OyAgXG4gICAgICAgICAgICB0aGlzLnZlbC55ID0gLXRoaXMudmVsLnkgKiAxLjA4O1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBpbml0aWFsUm90YXRpb24oKSB7XG4gICAgICAgIGxldCByYWRzID0gOTAgKiAoTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgIHRoaXMuZGlyLnggPSBNYXRoLmNvcyhyYWRzKTtcbiAgICAgICAgdGhpcy5kaXIueSA9IE1hdGguc2luKHJhZHMpO1xuICAgIH07XG5cbiAgICByb3RhdGUoZGVsdGFUaW1lKSB7XG4gICAgICAgIGlmICh0aGlzLmRpci55ICE9PSAwKSB7XG4gICAgICAgICAgICBsZXQgYW5nbGUgPSAtdGhpcy5zcGluU3BlZWQgKiAoTWF0aC5QSSAvIDE4MCkgKiBkZWx0YVRpbWU7XG4gICAgICAgICAgICBsZXQgdmVjdG9yID0gW3RoaXMuZGlyLngsIHRoaXMuZGlyLnldO1xuXG4gICAgICAgICAgICB2YXIgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICAgICAgdmFyIHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcblxuICAgICAgICAgICAgdGhpcy5kaXIueCA9IE1hdGgucm91bmQoMTAwMDAgKiAodmVjdG9yWzBdICogY29zIC0gdmVjdG9yWzFdICogc2luKSkgLyAxMDAwMDtcbiAgICAgICAgICAgIHRoaXMuZGlyLnkgPSBNYXRoLnJvdW5kKDEwMDAwICogKHZlY3RvclswXSAqIHNpbiArIHZlY3RvclsxXSAqIGNvcykpIC8gMTAwMDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVCYWxsUmVsZWFzZShpbnB1dCwga2V5KSB7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsRmxhZyAmJiBrZXkgIT09IFwic3BhY2VcIikge1xuICAgICAgICAgICAgdGhpcy52ZWwueCArPSBpbnB1dFswXTtcbiAgICAgICAgICAgIHRoaXMudmVsLnkgKz0gaW5wdXRbMV07XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcInNwYWNlXCIgJiYgdGhpcy5kaXIueCA9PT0gMCAmJiB0aGlzLmRpci55ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnZlbC54ICs9IGlucHV0WzBdO1xuICAgICAgICAgICAgdGhpcy52ZWwueSArPSBpbnB1dFsxXTtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbFJvdGF0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbW92ZShkZWx0YVRpbWUpIHtcbiAgICAgICAgc3VwZXIubW92ZShkZWx0YVRpbWUpO1xuICAgICAgICB0aGlzLnJvdGF0ZShkZWx0YVRpbWUpO1xuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCYWxsOyIsIlxuY29uc3QgcmFuZG9tQ29sb3IgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlncyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuICAgIGxldCBjb2xvciA9IFwiI1wiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGNvbG9yICs9IGRpZ3NbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDE2KSldO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG59O1xuXG5jbGFzcyBCbG9jayB7XG4gICAgY29uc3RydWN0b3IocG9zLCB3aWR0aCwgaGVpZ2h0LCB0eXBlLCBwb3dlclVwID0gbnVsbCkge1xuICAgICAgICB0aGlzLnBvcyA9IHBvcztcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5jb2xvciA9IHJhbmRvbUNvbG9yKCk7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMucG93ZXJVcCA9IHBvd2VyVXA7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfTtcblxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCbG9jazsiLCJcblxuY2xhc3MgR1ZJRVcge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmlucHV0ID0ge1xuICAgICAgICAgICAgYTogWy0xMDAsIDBdLFxuICAgICAgICAgICAgZDogWzEwMCwgMF0sXG4gICAgICAgICAgICBzcGFjZTogWzAsIC0xMDBdXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGtleUhhbmRsZXIoKSB7ICAgXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlS2V5KGV2ZW50LCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUtleShldmVudCwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaGFuZGxlS2V5KGV2ZW50LCBkb3duKSB7XG4gICAgICAgIGxldCBpbnB1dCA9IHRoaXMuaW5wdXQ7XG4gICAgICAgIGlmICghdGhpcy5nYW1lLmJhbGwuaW5pdGlhbEZsYWcpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgNjU6XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5hICE9PSBkb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNldEtleUlucHV0cyhpbnB1dC5hLCBPYmplY3Qua2V5cyh0aGlzLmlucHV0KVswXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbC5oYW5kbGVCYWxsUmVsZWFzZShpbnB1dC5hLCBPYmplY3Qua2V5cyh0aGlzLmlucHV0KVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2ODpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LmQgIT09IGRvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc2V0S2V5SW5wdXRzKGlucHV0LmQsIE9iamVjdC5rZXlzKHRoaXMuaW5wdXQpWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsLmhhbmRsZUJhbGxSZWxlYXNlKGlucHV0LmQsIE9iamVjdC5rZXlzKHRoaXMuaW5wdXQpWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuc3BhY2UgIT09IGRvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsLmluaXRpYWxGbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsLmhhbmRsZUJhbGxSZWxlYXNlKGlucHV0LnNwYWNlLCBPYmplY3Qua2V5cyh0aGlzLmlucHV0KVsyXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSA2NTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LmEgIT09IGRvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc2V0S2V5SW5wdXRzKGlucHV0LmEsIE9iamVjdC5rZXlzKHRoaXMuaW5wdXQpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDY4OlxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuZCAhPT0gZG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zZXRLZXlJbnB1dHMoaW5wdXQuZCwgT2JqZWN0LmtleXModGhpcy5pbnB1dClbMV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfTsgICAgIFxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5rZXlIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpO1xuICAgIH07XG5cbiAgICBhbmltYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZ2FtZS5pc092ZXIoKSkge1xuICAgICAgICAgICAgY29uc3QgZGVsdGFUID0gKG5ldyBEYXRlKCkgLSB0aGlzLmxhc3RUaW1lKSAvIDEwMDA7XG4gICAgICAgICAgICB0aGlzLmdhbWUuc2luZ2xlTW92ZShkZWx0YVQpXG4gICAgICAgICAgICB0aGlzLmdhbWUuZHJhdygpO1xuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlLmJpbmQodGhpcykpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmdhbWUud2lkdGgsIHRoaXMuZ2FtZS5oZWlnaHQpO1xuICAgICAgICAgICAgY29uc3QgZW5kU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbmQtc2NyZWVuXCIpO1xuICAgICAgICAgICAgZW5kU2NyZWVuLmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBHVklFVzsiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IEJhbGwgZnJvbSAnLi9iYWxsJztcbmltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2Nrcyc7XG5pbXBvcnQgUG93ZXJ1cCBmcm9tICcuL3Bvd2VydXAnXG5cbmNvbnN0IEhFSUdIVCA9IDYwMDtcbmNvbnN0IFdJRFRIID0gOTIwO1xuY29uc3QgUExBWUVSX1NUQVJUX0xPQ0FUSU9OID0geyB4OiAzOTUsIHk6IDU0MCB9O1xuY29uc3QgQkFMTF9TVEFSVF9MT0NBVElPTiA9IHsgeDogNDU1LCB5OiA1MDAgfTtcbmNvbnN0IFNUQVJUSU5HX0xJVkVTID0gMztcbmNvbnN0IEJMT0NLX0hFSUdIVCA9IDUwO1xuY29uc3QgQkxPQ0tfV0lEVEggPSA1MDtcbmNvbnN0IEJMT0NLU19OVU0gPSA3MjtcbmNvbnN0IFBPV0VSVVBTID0gW1wiZXh0cmFMaWZlXCIsIFwibXVsdGlCYWxsXCIsIFwic3VwZXJiYWxsXCIsIFwic2hvcnRlclBhZGRsZVwiLCBcImxvbmdlclBhZGRsZVwiLCBcIm1lZ2FCYWxsXCIsIFwibWluaWVCYWxsXCJdO1xuY29uc3QgVE9UQUxfUE9XRVJVUF9DT1VOVCA9IDEyO1xuY29uc3QgUE9XRVJVUF9SQURJVVMgPSAzMDtcblxuXG5jbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgpIHtcbiAgICAgICAgdGhpcy5saXZlcyA9IFNUQVJUSU5HX0xJVkVTO1xuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoT2JqZWN0LmFzc2lnbih7fSwgUExBWUVSX1NUQVJUX0xPQ0FUSU9OKSk7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmJsb2NrcyA9IFtdO1xuICAgICAgICB0aGlzLmJhbGxzID0gW25ldyBCYWxsKE9iamVjdC5hc3NpZ24oe30sIEJBTExfU1RBUlRfTE9DQVRJT04pKV07XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gSEVJR0hUO1xuICAgICAgICB0aGlzLndpZHRoID0gV0lEVEg7XG4gICAgICAgIHRoaXMudGhlbWVDb2xvciA9IFtcIiNiZGFlNTdcIl07XG4gICAgICAgIHRoaXMubnVtQmxvY2tzID0gQkxPQ0tTX05VTTtcbiAgICAgICAgdGhpcy5wb3dlcnVwQ291bnQgPSBUT1RBTF9QT1dFUlVQX0NPVU5UO1xuICAgICAgICB0aGlzLnBvd2VydXBzID0gUE9XRVJVUFM7XG5cbiAgICAgICAgdGhpcy5hY3RpdmVQb3dlcnVwcyA9IFtdO1xuICAgICAgICB0aGlzLnRvdGFsUG93ZXJ1cHMgPSBbXTtcbiAgICAgICAgdGhpcy5tb3ZpbmdQb3dlclVwcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuYWRkQmxvY2tzKHRoaXMubnVtQmxvY2tzKTtcbiAgICB9OyAgIFxuICAgICBcbiAgICBhZGRCbG9ja3Mobikge1xuICAgICAgICBsZXQgYmxvY2tQb3NYID0gMTA7XG4gICAgICAgIGxldCBibG9ja1Bvc1kgPSAxMDtcbiAgICAgICAgbGV0IGkgPSAwO1xuXG4gICAgICAgIHdoaWxlIChpIDwgbikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmJsb2Nrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9jayh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIEJMT0NLX1dJRFRILCBCTE9DS19IRUlHSFQpKTtcbiAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBibG9ja1Bvc1ggKz0gQkxPQ0tfV0lEVEg7XG4gICAgICAgICAgICBpZiAoYmxvY2tQb3NYID4gODc4KSB7XG4gICAgICAgICAgICAgICAgYmxvY2tQb3NYID0gMTA7XG4gICAgICAgICAgICAgICAgYmxvY2tQb3NZID0gYmxvY2tQb3NZICs9IEJMT0NLX0hFSUdIVDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoaSAlIDMgPT09IDAgfHwgaSAlIDcgPT09IDAgfHwgaSAlIDExID09PSAwIHx8IGkgJSAxNSA9PT0gMCkgJiYgdGhpcy5wb3dlcnVwQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmRvbVBvd2VydXAgPSBuZXcgUG93ZXJ1cCh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIHRoaXMucG93ZXJ1cHMuc2FtcGxlKCksIFBPV0VSVVBfUkFESVVTKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUG93ZXJ1cHMucHVzaChyYW5kb21Qb3dlcnVwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9jayh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIEJMT0NLX1dJRFRILCBCTE9DS19IRUlHSFQsIHJhbmRvbVBvd2VydXApKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvd2VydXBDb3VudCAtPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9jayh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIEJMT0NLX1dJRFRILCBCTE9DS19IRUlHSFQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5ibG9ja3Muc2h1ZmZsZSgpO1xuICAgIH07XG5cbiAgICAvLyBnZXRQb3dlcnVwRWZmZWN0KHBvd2VyVXApIHtcbiAgICAvLyAgICAgc3dpdGNoIChwb3dlclVwLnR5cGUpIHtcbiAgICAvLyAgICAgICAgIGNhc2UgXCJleHRyYUxpZmVcIjpcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmxpZmUgKz0gMTtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgXCJtdWx0aUJhbGxcIjpcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbHMucHVzaChuZXcgQmFsbClcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgXCJzdXBlcmJhbGxcIjpcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgXCJzaG9ydGVyUGFkZGxlXCI6XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIFwibG9uZ2VyUGFkZGxlXCI6XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIFwibWluaWVCYWxsXCI6XG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XG4gICAgLy8gICAgICAgICBjYXNlIFwibWVnYUJhbGxcIjpcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgfTtcbiAgICAvLyB9O1xuXG5cbiAgICBhbGxDdXJPYmplY3RzKCkge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KFt0aGlzLnBsYXllcl0sIHRoaXMuYmFsbHMsIHRoaXMuYmxvY2tzLCB0aGlzLm1vdmluZ1Bvd2VyVXBzKTtcbiAgICB9O1xuXG4gICAgYWxsQ3VyTW92aW5nT2JqcygpIHtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChbdGhpcy5wbGF5ZXJdLCB0aGlzLmJhbGxzLCB0aGlzLm1vdmluZ1Bvd2VyVXBzKTtcbiAgICB9O1xuIFxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMudGhlbWVDb2xvclswXTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMzBweCBTYW5zLVNlcmlmXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiIzhhODkxZlwiO1xuICAgICAgICBpZiAodGhpcy5saXZlcyA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGAke3RoaXMubGl2ZXN9IExpdmVzIExlZnRgLCA3NTAsIDU4MCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChgJHt0aGlzLmxpdmVzfSBMaWZlIExlZnRgLCA3NTAsIDU4MCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWxsQ3VyT2JqZWN0cygpLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgIG9iai5kcmF3KHRoaXMuY3R4KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIG1vdmVPYmplY3RzKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1vdmluZ09iaiA9IHRoaXMuYWxsQ3VyTW92aW5nT2JqcygpO1xuICAgICAgICBtb3ZpbmdPYmouZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgb2JqLm1vdmUoZGVsdGEpO1xuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEJhbGwgJiYgdGhpcy5pc091dE9mQm91bmRzKG9iai5wb3MueSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlYXRoQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFBvd2VydXAgJiYgdGhpcy5pc091dE9mQm91bmRzKG9iai5wb3MueSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShvYmopO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNpbmdsZU1vdmUoZGVsdGEpIHtcbiAgICAgICAgdGhpcy5tb3ZlT2JqZWN0cyhkZWx0YSk7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JDb2xsaXNpb25zKCk7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JXYWxsQ29sbGlzaW9ucygpO1xuICAgIH07XG5cbiAgICBpc091dE9mQm91bmRzKHBvc1kpIHtcbiAgICAgICAgaWYgKHBvc1kgPiAoNTYwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZGVhdGhBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMubGl2ZXMgLT0gMTtcbiAgICAgICAgaWYgKHRoaXMubGl2ZXMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIkdhbWUgT3ZlciFcIlxuICAgICAgICB9IGVsc2UgeyAgICAgXG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3MgPSBPYmplY3QuYXNzaWduKHt9LCBQTEFZRVJfU1RBUlRfTE9DQVRJT04pO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgICAgICB0aGlzLmJhbGwucG9zID0gT2JqZWN0LmFzc2lnbih7fSwgQkFMTF9TVEFSVF9MT0NBVElPTik7XG4gICAgICAgICAgICB0aGlzLmJhbGwudmVsID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgICAgICB0aGlzLmJhbGwuZGlyID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgICAgICB0aGlzLmJhbGwuaW5pdGlhbEZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNoZWNrRm9yV2FsbENvbGxpc2lvbnMoKSB7XG4gICAgICAgIGNvbnN0IGFsbE1vdmluZ09iaiA9IHRoaXMuYWxsQ3VyTW92aW5nT2JqcygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbE1vdmluZ09iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gYWxsTW92aW5nT2JqW2ldO1xuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBQbGF5ZXIpICYmIChvYmoucG9zLnggPCAwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoubGVmdFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgUGxheWVyKSAmJiAob2JqLnBvcy54ID4gKDkyMCAtIG9iai53aWR0aCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5yaWdodFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgQmFsbCkgJiYgKG9iai5wb3MueCA8ICgwICsgb2JqLnJhZGl1cykpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLmxlZnRXYWxsQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIEJhbGwpICYmIChvYmoucG9zLnggPiAoOTIwIC0gb2JqLnJhZGl1cykpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnJpZ2h0V2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBCYWxsKSAmJiAob2JqLnBvcy55IDwgKDAgKyBvYmoucmFkaXVzKSB8fCBvYmoucG9zLnkgPiAoNjAwIC0gb2JqLnJhZGl1cykpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnRvcFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgaXNPdmVyKCkge1xuICAgICAgICBpZiAodGhpcy5udW1CbG9ja3MgPT09IDAgfHwgdGhpcy5saXZlcyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzQ29sbGlkZWQob2JqMSwgb2JqMikge1xuICAgICAgICBsZXQgZHggPSBNYXRoLmFicyhvYmoyLnBvcy54IC0gb2JqMS5wb3MueCAtIG9iajEud2lkdGggLyAyKTtcbiAgICAgICAgbGV0IGR5ID0gTWF0aC5hYnMob2JqMi5wb3MueSAtIG9iajEucG9zLnkgLSBvYmoxLmhlaWdodCAvIDIpO1xuICAgICAgICBpZiAoZHggPiAob2JqMS53aWR0aCAvIDIgKyBvYmoyLnJhZGl1cykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGR5ID4gKG9iajEuaGVpZ2h0IC8gMiArIG9iajIucmFkaXVzKSkgeyBcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkeCA8PSAob2JqMS53aWR0aCAvIDIpKSB7IFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7IFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZHkgPD0gKG9iajEuaGVpZ2h0IC8gMikpIHsgXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgXG4gICAgICAgIH07XG4gICAgICAgIGxldCBkWCA9IGR4IC0gb2JqMS53aWR0aCAvIDI7XG4gICAgICAgIGxldCBkWSA9IGR5IC0gb2JqMi53aWR0aCAvIDI7XG4gICAgICAgIHJldHVybiAoZFggKiBkWCArIGRZICogZFkgPD0gKG9iajIucmFkaXVzICogb2JqMi5yYWRpdXMpKTtcbiAgICB9O1xuXG4gICAgcmVtb3ZlKG9iaikge1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQmxvY2spIHtcbiAgICAgICAgICAgIHRoaXMubnVtQmxvY2tzIC09IDE7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5zcGxpY2UodGhpcy5ibG9ja3MuaW5kZXhPZihvYmopLCAxKTtcbiAgICAgICAgICAgIGlmIChvYmoucG93ZXJVcCkge1xuICAgICAgICAgICAgICAgIG9iai5wb3dlclVwLmluaXRpYXRlTW92ZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBQb3dlcnVwKSB7XG4gICAgICAgICAgICBsZXQgcFVwID0gdGhpcy5tb3ZpbmdQb3dlclVwcy5maW5kSW5kZXgoZWwgPT4gZWwudHlwZSA9PT0gb2JqLnR5cGUpO1xuICAgICAgICAgICAgdGhpcy5tb3ZpbmdQb3dlclVwcy5zcGxpY2UocFVwLCAxKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY2hlY2tGb3JDb2xsaXNpb25zKCkge1xuICAgICAgICBjb25zdCBhbGxPYmogPSB0aGlzLmFsbEN1ck9iamVjdHMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxPYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGFsbE9iai5sZW5ndGg7IGogKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYmoxID0gYWxsT2JqW2ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9iajIgPSBhbGxPYmpbal07XG4gICAgICAgICAgICAgICAgaWYgKG9iajEgaW5zdGFuY2VvZiBQbGF5ZXIgJiYgb2JqMiBpbnN0YW5jZW9mIEJhbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRlZChvYmoxLCBvYmoyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuY29sbGlkZXNXaXRoKG9iajIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqMSBpbnN0YW5jZW9mIEJhbGwgJiYgb2JqMiBpbnN0YW5jZW9mIFBsYXllcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbGxpZGVkKG9iajEsIG9iajIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb3VuY2VTb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5jb2xsaWRlc1dpdGgob2JqMik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYmoxIGluc3RhbmNlb2YgQmFsbCAmJiBvYmoyIGluc3RhbmNlb2YgQmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRlZChvYmoyLCBvYmoxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5U291bmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuY29sbGlkZXNXaXRoKG9iajIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUob2JqMik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTsgLy9jaGVjayBmb3IgcGxheWVyIHBvd2VydXAgb3IgcG93ZXJ1cCBwbGF5ZXdyIG9ubHkuLi5cbiAgICAgICAgICAgICAgICAvL3RoaXMgd2lsbCBjYWxsIGluaXRpYXRlTW92ZSgpIGluIHBvd2VydXAgb2YgYmxvY2sgaGFzIHBvd2VydXAgY2F1c2luZyBhIG1vdmVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHBsYXlTb3VuZCgpIHtcbiAgICAgICAgY29uc3QgYmFsbFNvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibG9ja1NvdW5kXCIpO1xuICAgICAgICBiYWxsU291bmQuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICBiYWxsU291bmQucGxheSgpO1xuICAgIH07XG5cbiAgICBwbGF5Qm91bmNlU291bmQoKSB7XG4gICAgICAgIGNvbnN0IGFub3RoZXJTb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5vdGhlclNvdW5kXCIpO1xuICAgICAgICBhbm90aGVyU291bmQuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICBhbm90aGVyU291bmQucGxheSgpO1xuICAgIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiXG5jbGFzcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvcywgdmVsLCByYWRpdXMpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgICAgIHRoaXMudmVsID0gdmVsO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB9O1xuXG4gICAgbW92ZShkZWx0YVRpbWUpIHtcbiAgICAgICAgbGV0IG5ld0Rpc3RhbmNlWCA9IHRoaXMudmVsLnggKiBkZWx0YVRpbWU7XG4gICAgICAgIGxldCBuZXdEaXN0YW5jZVkgPSB0aGlzLnZlbC55ICogZGVsdGFUaW1lO1xuICAgICAgICB0aGlzLnBvcy54ID0gdGhpcy5wb3MueCArIG5ld0Rpc3RhbmNlWDtcbiAgICAgICAgdGhpcy5wb3MueSA9IHRoaXMucG9zLnkgKyBuZXdEaXN0YW5jZVk7XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1vdmluZ09iamVjdDsiLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vbW92aW5nX29iamVjdCc7XG5pbXBvcnQgQmFsbCBmcm9tICcuL2JhbGwnO1xuY29uc3QgUExBWUVSX0hFSUdIVCA9IDMwO1xuY29uc3QgUExBWUVSX1dJRFRIID0gMTIwO1xuXG5jb25zdCByYW5kb21Db2xvciA9ICgpID0+IHtcbiAgICBjb25zdCBkaWdzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgbGV0IGNvbG9yID0gXCIjXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29sb3IgKz0gZGlnc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTYpKV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjtcbn07XG5cbmNsYXNzIFBsYXllciBleHRlbmRzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zKSB7XG4gICAgICAgIHN1cGVyKHBvcywgeyB4OiAwLCB5OiAwIH0pXG4gICAgICAgIHRoaXMuY29sb3IgPSByYW5kb21Db2xvcigpO1xuICAgICAgICB0aGlzLndpZHRoID0gUExBWUVSX1dJRFRIO1xuICAgICAgICB0aGlzLmhlaWdodCA9IFBMQVlFUl9IRUlHSFQ7XG4gICAgfTtcblxuICAgIHNldEtleUlucHV0cyhpbnB1dCwga2V5KSB7XG4gICAgICAgIHRoaXMudmVsLnggKz0gaW5wdXRbMF07XG4gICAgfTtcblxuICAgIG1vdmUoZGVsdGFUaW1lKSB7XG4gICAgICAgIGxldCBuZXdEaXN0YW5jZVggPSB0aGlzLnZlbC54ICogZGVsdGFUaW1lO1xuICAgICAgICB0aGlzLnBvcy54ID0gdGhpcy5wb3MueCArIG5ld0Rpc3RhbmNlWDtcbiAgICB9O1xuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfTtcblxuICAgIGNvbGxpZGVzV2l0aChvdGhlck9iaikge1xuICAgICAgICBpZiAob3RoZXJPYmogaW5zdGFuY2VvZiBCYWxsKSB7XG4gICAgICAgICAgICBvdGhlck9iai5kaXIueCA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueCk7XG4gICAgICAgICAgICBvdGhlck9iai5kaXIueSA9IC1NYXRoLmFicyhvdGhlck9iai5kaXIueSk7XG4gICAgICAgICAgICBvdGhlck9iai52ZWwueSA9IC1NYXRoLmFicyhvdGhlck9iai52ZWwueSkgKiAxLjE7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmlnaHRXYWxsQ29sbGlzaW9uKCkge1xuICAgICAgICB0aGlzLnZlbC54ID0gLU1hdGguYWJzKHRoaXMudmVsLngpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBsZWZ0V2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueCA9IE1hdGguYWJzKHRoaXMudmVsLngpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vbW92aW5nX29iamVjdCc7XG5cbmNvbnN0IHJhbmRvbUNvbG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpZ3MgPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcbiAgICBsZXQgY29sb3IgPSBcIiNcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBjb2xvciArPSBkaWdzW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxNikpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufTtcblxuY2xhc3MgUG93ZXJ1cCBleHRlbmRzIE1vdmluZ09iamVjdHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIHR5cGUsIHJhZGl1cykge1xuICAgICAgICBzdXBlcihwb3MsIHsgeDogMCwgeTogMCB9KVxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmNvbG9yID0gcmFuZG9tQ29sb3IoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB9O1xuICAgIFxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmModGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCB0cnVlKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9O1xuXG4gICAgaW5pdGlhdGVNb3ZlKCkge1xuICAgICAgICB0aGlzLnZlbC55ICs9IDEwMDtcbiAgICB9XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VZID0gdGhpcy52ZWwueSAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueSA9IHRoaXMucG9zLnkgKyBuZXdEaXN0YW5jZVk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvd2VydXA7IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vY2xhc3Nlcy9nYW1lXCI7XG5pbXBvcnQgR1ZpZXcgZnJvbSBcIi4vY2xhc3Nlcy9nX3ZpZXdcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGxldCBnaXRodWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdpdGh1YlwiKTtcbiAgICBnaXRodWIub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vbXdkZXNoYXcnO1xuICAgIH1cbiAgICBsZXQgbGlua2VkaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmtlZGluXCIpO1xuICAgIGxpbmtlZGluLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL21hdHRoZXctZGVzaGF3LWI2MjlhMGJhLyc7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWZhdWx0XCIpO1xuICAgIGNvbnN0IHBvd2VyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3dlci1idG5cIik7XG4gICAgcG93ZXJCdG4ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZGVmU2NyZWVuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYWN0aXZlXCIpO1xuICAgICAgICBjb25zdCBzdGFydFNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1zY3JlZW4nKTtcbiAgICAgICAgc3RhcnRTY3JlZW4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG5cbiAgICAgICAgY29uc3QgbGlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG93ZXItbHQnKTtcbiAgICAgICAgbGlnaHQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG5cbiAgICAgICAgY29uc3Qgc2NyZWVuVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnQtdGV4dFwiKTtcbiAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnN0cnVjdGlvbnNcIik7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udHJvbHMtbGlzdFwiKTtcblxuICAgICAgICBzY3JlZW5UZXh0LmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1nYW1lXCIpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lYm95U291bmRcIik7XG4gICAgICAgICAgICBhdWRpby5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgICAgIGNvbnRyb2xzTGlzdC5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICAgICAgc3RhcnRCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG4gICAgICAgIH0sIDMwMDApO1xuXG4gICAgICAgIHN0YXJ0QnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBzdGFydFNjcmVlbi5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kXCIpO1xuICAgICAgICAgICAgY29udHJvbHNMaXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICBzY3JlZW5UZXh0LmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkXCIpO1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShjdHgpO1xuICAgICAgICAgICAgbmV3IEdWaWV3KGdhbWUpLnN0YXJ0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGRlZlNjcmVlbi5jbGFzc0xpc3RbMF0gPT09IFwiYWN0aXZlXCIpIHtcbiAgICAgICAgICAgIHBvd2VyQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmU2NyZWVuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgICAgIHN0YXJ0QnRuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgICAgIHN0YXJ0U2NyZWVuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgICAgIHNjcmVlblRleHQuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgICAgICBjb250cm9sc0xpc3QuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgICAgICBsaWdodC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=