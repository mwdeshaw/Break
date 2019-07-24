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
        // this.speed = 100;
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
        if (!this.game.balls[0].initialFlag) {
            switch (event.keyCode) {
                case 65:
                    if (input.a !== down) {
                        this.game.player.setKeyInputs(input.a, Object.keys(this.input)[0]);
                        this.game.balls[0].handleBallRelease(input.a, Object.keys(this.input)[0]);
                    }
                    break;
                case 68:
                    if (input.d !== down) {
                        this.game.player.setKeyInputs(input.d, Object.keys(this.input)[1]);
                        this.game.balls[0].handleBallRelease(input.d, Object.keys(this.input)[1]);
                    }
                    break;
                case 32:
                    if (input.space !== down) {
                        this.game.balls[0].initialFlag = true;
                        this.game.balls[0].handleBallRelease(input.space, Object.keys(this.input)[2]);
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
const POWERUPS = ["extraLife", "multiBall", "shorterPaddle", "longerPaddle"];
// const POWERUPS = ["extraLife", "multiBall", "superball", "shorterPaddle", "longerPaddle", "megaBall", "minieBall"];
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
            this.balls[0].initialFlag = false;
            this.activePowerups = [];
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
    // isCollided(obj1, obj2) {
    //     let dx = Math.abs(obj2.pos.x - obj1.pos.x - obj1.width / 2);
    //     let dy = Math.abs(obj2.pos.y - obj1.pos.y - obj1.height / 2);
    //     if (dx > (obj1.width / 2 + obj2.radius)) {
    //         return false;
    //     };
    //     if (dy > (obj1.height / 2 + obj2.radius)) { 
    //         return false; 
    //     };
    //     if (dx <= (obj1.width / 2)) { 
    //         return true; 
    //     };
    //     if (dy <= (obj1.height / 2)) { 
    //         return true; 
    //     };
    //     let dX = dx - obj1.width / 2;
    //     let dY = dy - obj2.width / 2;
    //     return (dX * dX + dY * dY <= (obj2.radius * obj2.radius));
    // };

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
                         //powerupSound
                        this.collidesWithPowerup(obj2);
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
                let newBalls = [new _ball__WEBPACK_IMPORTED_MODULE_1__["default"]({ x: this.balls[0].pos.x, y: this.balls[0].pos.y }, true), new _ball__WEBPACK_IMPORTED_MODULE_1__["default"]({ x: this.balls[0].pos.x, y: this.balls[0].pos.y }, true)];
                this.balls.concat(newBalls);
            break;
            // case "superball":
            //     break;
            case "shorterPaddle":
                this.player.width = this.player.width -= 20;
                break;
            case "longerPaddle":
                this.player.width = this.player.width += 20;
                break;
            // case "minieBall":
            //     break;
            // case "megaBall":
            //     break;
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


const POWERUP_RADIUS = 30;

const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

class Powerup extends _moving_object__WEBPACK_IMPORTED_MODULE_0__["default"]{
    constructor(pos, type) {
        super(pos, { x: 0, y: 0 }, POWERUP_RADIUS)
        this.type = type;
        this.color = randomColor();
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
        this.vel.y += 130;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvYmFsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9ibG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZ192aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbW92aW5nX29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvcG93ZXJ1cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUF3QztBQUNWO0FBQ0Q7O0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IE1vdmluZ09iaiBmcm9tICcuL21vdmluZ19vYmplY3QnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9ja3MnO1xuXG5jb25zdCBCQUxMX1JBRElVUyA9IDIwO1xuXG5jb25zdCByYW5kb21Db2xvciA9ICgpID0+IHtcbiAgICBjb25zdCBkaWdzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgbGV0IGNvbG9yID0gXCIjXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29sb3IgKz0gZGlnc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTYpKV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjtcbn07XG5cbmNsYXNzIEJhbGwgZXh0ZW5kcyBNb3ZpbmdPYmoge1xuICAgIGNvbnN0cnVjdG9yKHBvcywgaW5pdGlhbEZsYWcgPSBmYWxzZSkge1xuICAgICAgICBzdXBlcihwb3MsIHsgeDogMCwgeTogMCB9LCBCQUxMX1JBRElVUyk7XG4gICAgICAgIHRoaXMuY29sb3IgPSByYW5kb21Db2xvcigpO1xuICAgICAgICB0aGlzLmRpciA9IHsgeDogMCwgeTogMCB9XG4gICAgICAgIHRoaXMuaW5pdGlhbEZsYWcgPSBpbml0aWFsRmxhZztcbiAgICAgICAgLy8gdGhpcy5zcGVlZCA9IDEwMDtcbiAgICB9O1xuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLnJhZGl1cywgMCwgMiAqIE1hdGguUEksIHRydWUpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH07XG5cbiAgICBjb2xsaWRlc1dpdGgob3RoZXJPYmopIHtcbiAgICAgICAgaWYgKG90aGVyT2JqIGluc3RhbmNlb2YgUGxheWVyKSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5jZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAob3RoZXJPYmogaW5zdGFuY2VvZiBCbG9jaykge1xuICAgICAgICAgICAgdGhpcy5ib3VuY2UoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByaWdodFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnggPSAtTWF0aC5hYnModGhpcy52ZWwueCkgKiAwLjk1O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBsZWZ0V2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueCA9IE1hdGguYWJzKHRoaXMudmVsLngpICogMC45NTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdG9wV2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueSA9IE1hdGguYWJzKHRoaXMudmVsLnkpICogMC45NTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgYm91bmNlKCkge1xuICAgICAgICBpZiAodGhpcy5kaXIueCAhPT0gMCAmJiB0aGlzLmRpci55ICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpci54ID0gLXRoaXMuZGlyLng7XG4gICAgICAgICAgICB0aGlzLmRpci55ID0gLXRoaXMuZGlyLnk7XG4gICAgICAgICAgICB0aGlzLnZlbC55ID0gLXRoaXMudmVsLnk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGluaXRpYWxSb3RhdGlvbigpIHtcbiAgICAgICAgbGV0IHJhZHMgPSA5MCAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgdGhpcy5kaXIueCA9IE1hdGguY29zKHJhZHMpO1xuICAgICAgICB0aGlzLmRpci55ID0gTWF0aC5zaW4ocmFkcyk7XG4gICAgfTtcblxuICAgIHJvdGF0ZShkZWx0YVRpbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlyLnkgIT09IDApIHtcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IC10aGlzLnNwaW5TcGVlZCAqIChNYXRoLlBJIC8gMTgwKSAqIGRlbHRhVGltZTtcbiAgICAgICAgICAgIGxldCB2ZWN0b3IgPSBbdGhpcy5kaXIueCwgdGhpcy5kaXIueV07XG5cbiAgICAgICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICB2YXIgc2luID0gTWF0aC5zaW4oYW5nbGUpO1xuXG4gICAgICAgICAgICB0aGlzLmRpci54ID0gTWF0aC5yb3VuZCgxMDAwMCAqICh2ZWN0b3JbMF0gKiBjb3MgLSB2ZWN0b3JbMV0gKiBzaW4pKSAvIDEwMDAwO1xuICAgICAgICAgICAgdGhpcy5kaXIueSA9IE1hdGgucm91bmQoMTAwMDAgKiAodmVjdG9yWzBdICogc2luICsgdmVjdG9yWzFdICogY29zKSkgLyAxMDAwMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUJhbGxSZWxlYXNlKGlucHV0LCBrZXkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxGbGFnICYmIGtleSAhPT0gXCJzcGFjZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnZlbC54ICs9IGlucHV0WzBdO1xuICAgICAgICAgICAgdGhpcy52ZWwueSArPSBpbnB1dFsxXTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwic3BhY2VcIiAmJiB0aGlzLmRpci54ID09PSAwICYmIHRoaXMuZGlyLnkgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMudmVsLnggKz0gaW5wdXRbMF07XG4gICAgICAgICAgICB0aGlzLnZlbC55ICs9IGlucHV0WzFdO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsUm90YXRpb24oKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBzdXBlci5tb3ZlKGRlbHRhVGltZSk7XG4gICAgICAgIHRoaXMucm90YXRlKGRlbHRhVGltZSk7XG4gICAgfTtcblxuXG5cblxuXG5cbiAgICAvLyBtb3ZlKGRlbHRhVGltZSkge1xuICAgIC8vICAgICBsZXQgbmV3RGlzdGFuY2VYO1xuICAgIC8vICAgICBsZXQgbmV3RGlzdGFuY2VZO1xuICAgIC8vICAgICBpZiAodGhpcy5pbml0aWFsRmxhZykge1xuICAgIC8vICAgICAgICAgbmV3RGlzdGFuY2VYID0gdGhpcy5zcGVlZCAqIGRlbHRhVGltZSAqIHRoaXMuZGlyLng7XG4gICAgLy8gICAgICAgICBuZXdEaXN0YW5jZVkgPSB0aGlzLnNwZWVkICogZGVsdGFUaW1lICogdGhpcy5kaXIueTtcbiAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgIG5ld0Rpc3RhbmNlWCA9IGRlbHRhVGltZSAqIHRoaXMuZGlyLng7XG4gICAgLy8gICAgICAgICBuZXdEaXN0YW5jZVkgPSBkZWx0YVRpbWUgKiB0aGlzLmRpci55O1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHRoaXMucG9zLnggPSB0aGlzLnBvcy54ICsgbmV3RGlzdGFuY2VYO1xuICAgIC8vICAgICB0aGlzLnBvcy55ID0gdGhpcy5wb3MueSArIG5ld0Rpc3RhbmNlWTtcblxuICAgIC8vIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCYWxsOyIsImNvbnN0IHJhbmRvbUNvbG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpZ3MgPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcbiAgICBsZXQgY29sb3IgPSBcIiNcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBjb2xvciArPSBkaWdzW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxNikpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufTtcblxuY2xhc3MgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKHBvcywgd2lkdGgsIGhlaWdodCwgcG93ZXJVcCkge1xuICAgICAgICB0aGlzLnBvcyA9IHBvcztcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5jb2xvciA9IHJhbmRvbUNvbG9yKCk7XG4gICAgICAgIHRoaXMucG93ZXJVcCA9IHBvd2VyVXA7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfTtcblxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCbG9jazsiLCJcblxuY2xhc3MgR1ZJRVcge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmlucHV0ID0ge1xuICAgICAgICAgICAgYTogWy0xMDAsIDBdLFxuICAgICAgICAgICAgZDogWzEwMCwgMF0sXG4gICAgICAgICAgICBzcGFjZTogWzAsIC0xMDBdXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGtleUhhbmRsZXIoKSB7ICAgXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlS2V5KGV2ZW50LCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUtleShldmVudCwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaGFuZGxlS2V5KGV2ZW50LCBkb3duKSB7XG4gICAgICAgIGxldCBpbnB1dCA9IHRoaXMuaW5wdXQ7XG4gICAgICAgIGlmICghdGhpcy5nYW1lLmJhbGxzWzBdLmluaXRpYWxGbGFnKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDY1OlxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuYSAhPT0gZG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zZXRLZXlJbnB1dHMoaW5wdXQuYSwgT2JqZWN0LmtleXModGhpcy5pbnB1dClbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxzWzBdLmhhbmRsZUJhbGxSZWxlYXNlKGlucHV0LmEsIE9iamVjdC5rZXlzKHRoaXMuaW5wdXQpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDY4OlxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuZCAhPT0gZG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zZXRLZXlJbnB1dHMoaW5wdXQuZCwgT2JqZWN0LmtleXModGhpcy5pbnB1dClbMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxzWzBdLmhhbmRsZUJhbGxSZWxlYXNlKGlucHV0LmQsIE9iamVjdC5rZXlzKHRoaXMuaW5wdXQpWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuc3BhY2UgIT09IGRvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsc1swXS5pbml0aWFsRmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbHNbMF0uaGFuZGxlQmFsbFJlbGVhc2UoaW5wdXQuc3BhY2UsIE9iamVjdC5rZXlzKHRoaXMuaW5wdXQpWzJdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDY1OlxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuYSAhPT0gZG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zZXRLZXlJbnB1dHMoaW5wdXQuYSwgT2JqZWN0LmtleXModGhpcy5pbnB1dClbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjg6XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5kICE9PSBkb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNldEtleUlucHV0cyhpbnB1dC5kLCBPYmplY3Qua2V5cyh0aGlzLmlucHV0KVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9OyAgICAgXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmtleUhhbmRsZXIoKTtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XG4gICAgfTtcblxuICAgIGFuaW1hdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5nYW1lLmlzT3ZlcigpKSB7XG4gICAgICAgICAgICBjb25zdCBkZWx0YVQgPSAobmV3IERhdGUoKSAtIHRoaXMubGFzdFRpbWUpIC8gMTAwMDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zaW5nbGVNb3ZlKGRlbHRhVClcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5kcmF3KCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLmhlaWdodCk7XG4gICAgICAgICAgICBjb25zdCBlbmRTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVuZC1zY3JlZW5cIik7XG4gICAgICAgICAgICBlbmRTY3JlZW4uY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdWSUVXOyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgQmFsbCBmcm9tICcuL2JhbGwnO1xuaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2tzJztcbmltcG9ydCBQb3dlcnVwIGZyb20gJy4vcG93ZXJ1cCdcblxuY29uc3QgSEVJR0hUID0gNjAwO1xuY29uc3QgV0lEVEggPSA5MjA7XG5jb25zdCBQTEFZRVJfU1RBUlRfTE9DQVRJT04gPSB7IHg6IDM5NSwgeTogNTQwIH07XG5jb25zdCBCQUxMX1NUQVJUX0xPQ0FUSU9OID0geyB4OiA0NTUsIHk6IDUwMCB9O1xuY29uc3QgU1RBUlRJTkdfTElWRVMgPSAzO1xuY29uc3QgQkxPQ0tfSEVJR0hUID0gNTA7XG5jb25zdCBCTE9DS19XSURUSCA9IDUwO1xuY29uc3QgQkxPQ0tTX05VTSA9IDcyO1xuY29uc3QgUE9XRVJVUFMgPSBbXCJleHRyYUxpZmVcIiwgXCJtdWx0aUJhbGxcIiwgXCJzaG9ydGVyUGFkZGxlXCIsIFwibG9uZ2VyUGFkZGxlXCJdO1xuLy8gY29uc3QgUE9XRVJVUFMgPSBbXCJleHRyYUxpZmVcIiwgXCJtdWx0aUJhbGxcIiwgXCJzdXBlcmJhbGxcIiwgXCJzaG9ydGVyUGFkZGxlXCIsIFwibG9uZ2VyUGFkZGxlXCIsIFwibWVnYUJhbGxcIiwgXCJtaW5pZUJhbGxcIl07XG5jb25zdCBUT1RBTF9QT1dFUlVQX0NPVU5UID0gMTI7XG5cblxuY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgICAgIHRoaXMubGl2ZXMgPSBTVEFSVElOR19MSVZFUztcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKE9iamVjdC5hc3NpZ24oe30sIFBMQVlFUl9TVEFSVF9MT0NBVElPTikpO1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5ibG9ja3MgPSBbXTtcbiAgICAgICAgdGhpcy5iYWxscyA9IFtuZXcgQmFsbChPYmplY3QuYXNzaWduKHt9LCBCQUxMX1NUQVJUX0xPQ0FUSU9OKSldO1xuICAgICAgICB0aGlzLmhlaWdodCA9IEhFSUdIVDtcbiAgICAgICAgdGhpcy53aWR0aCA9IFdJRFRIO1xuICAgICAgICB0aGlzLnRoZW1lQ29sb3IgPSBbXCIjYmRhZTU3XCJdO1xuICAgICAgICB0aGlzLm51bUJsb2NrcyA9IEJMT0NLU19OVU07XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBvd2VydXBDb3VudCA9IFRPVEFMX1BPV0VSVVBfQ09VTlQ7IFxuICAgICAgICB0aGlzLnBvd2VydXBzID0gUE9XRVJVUFM7XG4gICAgICAgIHRoaXMuYWN0aXZlUG93ZXJ1cHMgPSBbXTtcbiAgICAgICAgdGhpcy50b3RhbFBvd2VydXBzID0gW107XG4gICAgICAgIHRoaXMubW92aW5nUG93ZXJ1cHMgPSBbXTtcblxuICAgICAgICB0aGlzLmFkZEJsb2Nrcyh0aGlzLm51bUJsb2Nrcyk7XG4gICAgfTsgICBcbiAgICAgXG4gICAgYWRkQmxvY2tzKG4pIHtcbiAgICAgICAgbGV0IGJsb2NrUG9zWCA9IDEwO1xuICAgICAgICBsZXQgYmxvY2tQb3NZID0gMTA7XG4gICAgICAgIGxldCBpID0gMDtcblxuICAgICAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5ibG9ja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmRvbVBvd2VydXAgPSBuZXcgUG93ZXJ1cCh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIHRoaXMuZ2V0UmFuZG9tKHRoaXMucG93ZXJ1cHMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUG93ZXJ1cHMucHVzaChyYW5kb21Qb3dlcnVwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9jayh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIEJMT0NLX1dJRFRILCBCTE9DS19IRUlHSFQsIHJhbmRvbVBvd2VydXApKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvd2VydXBDb3VudCAtPSAxO1xuICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGJsb2NrUG9zWCArPSBCTE9DS19XSURUSDtcbiAgICAgICAgICAgIGlmIChibG9ja1Bvc1ggPiA4NzgpIHtcbiAgICAgICAgICAgICAgICBibG9ja1Bvc1ggPSAxMDtcbiAgICAgICAgICAgICAgICBibG9ja1Bvc1kgPSBibG9ja1Bvc1kgKz0gQkxPQ0tfSEVJR0hUO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgJSA2ID09PSAwICYmIHRoaXMucG93ZXJ1cENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCByYW5kb21Qb3dlcnVwID0gbmV3IFBvd2VydXAoeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCB0aGlzLmdldFJhbmRvbSh0aGlzLnBvd2VydXBzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbFBvd2VydXBzLnB1c2gocmFuZG9tUG93ZXJ1cCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCBCTE9DS19XSURUSCwgQkxPQ0tfSEVJR0hULCByYW5kb21Qb3dlcnVwKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3dlcnVwQ291bnQgLT0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCBCTE9DS19XSURUSCwgQkxPQ0tfSEVJR0hULCBudWxsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpICs9IDE7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5zaHVmZmxlQXJyKHRoaXMuYmxvY2tzKTtcbiAgICB9O1xuICAgIFxuICAgIHNodWZmbGVBcnIoYXJyKSB7XG4gICAgICAgIGFyci5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xuICAgIH1cblxuICAgIGdldFJhbmRvbShhcnIpIHtcbiAgICAgICAgcmV0dXJuIGFycltNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCkpXTtcbiAgICB9XG5cbiAgICBhbGxDdXJPYmplY3RzKCkge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KFt0aGlzLnBsYXllcl0sIHRoaXMuYmFsbHMsIHRoaXMuYmxvY2tzLCB0aGlzLm1vdmluZ1Bvd2VydXBzKTtcbiAgICB9O1xuXG4gICAgYWxsQ3VyTW92aW5nT2JqcygpIHtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChbdGhpcy5wbGF5ZXJdLCB0aGlzLmJhbGxzLCB0aGlzLm1vdmluZ1Bvd2VydXBzKTtcbiAgICB9O1xuIFxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMudGhlbWVDb2xvclswXTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMzBweCBTYW5zLVNlcmlmXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiIzhhODkxZlwiO1xuICAgICAgICBpZiAodGhpcy5saXZlcyA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGAke3RoaXMubGl2ZXN9IExpdmVzIExlZnRgLCA3NTAsIDU4MCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChgJHt0aGlzLmxpdmVzfSBMaWZlIExlZnRgLCA3NTAsIDU4MCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWxsQ3VyT2JqZWN0cygpLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgIG9iai5kcmF3KHRoaXMuY3R4KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIG1vdmVPYmplY3RzKGRlbHRhKSB7XG4gICAgICAgIGNvbnN0IG1vdmluZ09iaiA9IHRoaXMuYWxsQ3VyTW92aW5nT2JqcygpO1xuICAgICAgICBtb3ZpbmdPYmouZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgb2JqLm1vdmUoZGVsdGEpO1xuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEJhbGwgJiYgdGhpcy5pc091dE9mQm91bmRzKG9iai5wb3MueSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iYWxscy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWF0aEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKG9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQb3dlcnVwICYmIHRoaXMuaXNPdXRPZkJvdW5kcyhvYmoucG9zLnkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUob2JqKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzaW5nbGVNb3ZlKGRlbHRhKSB7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JDb2xsaXNpb25zKCk7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JXYWxsQ29sbGlzaW9ucygpO1xuICAgICAgICB0aGlzLm1vdmVPYmplY3RzKGRlbHRhKTtcblxuICAgIH07XG5cbiAgICBpc091dE9mQm91bmRzKHBvc1kpIHtcbiAgICAgICAgaWYgKHBvc1kgPiAoNTYwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZGVhdGhBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMubGl2ZXMgLT0gMTtcbiAgICAgICAgaWYgKHRoaXMubGl2ZXMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIkdhbWUgT3ZlciFcIlxuICAgICAgICB9IGVsc2UgeyAgICAgXG4gICAgICAgICAgICB0aGlzLnBsYXllci53aWR0aCA9IDEyMDtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBvcyA9IE9iamVjdC5hc3NpZ24oe30sIFBMQVlFUl9TVEFSVF9MT0NBVElPTik7XG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWwgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLmJhbGxzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGxzID0gdGhpcy5iYWxscy5zbGljZSgwLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYmFsbHNbMF0ucG9zID0gT2JqZWN0LmFzc2lnbih7fSwgQkFMTF9TVEFSVF9MT0NBVElPTik7XG4gICAgICAgICAgICB0aGlzLmJhbGxzWzBdLmRpciA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICAgICAgdGhpcy5iYWxsc1swXS52ZWwgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgICAgIHRoaXMuYmFsbHNbMF0uaW5pdGlhbEZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlUG93ZXJ1cHMgPSBbXTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY2hlY2tGb3JXYWxsQ29sbGlzaW9ucygpIHtcbiAgICAgICAgY29uc3QgYWxsTW92aW5nT2JqID0gdGhpcy5hbGxDdXJNb3ZpbmdPYmpzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTW92aW5nT2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBhbGxNb3ZpbmdPYmpbaV07XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIFBsYXllcikgJiYgKG9iai5wb3MueCA8IDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5sZWZ0V2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBQbGF5ZXIpICYmIChvYmoucG9zLnggPiAoOTIwIC0gb2JqLndpZHRoKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnJpZ2h0V2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBCYWxsKSAmJiAob2JqLnBvcy54IDwgKG9iai5yYWRpdXMpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUJvdW5jZVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5sZWZ0V2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBCYWxsKSAmJiAob2JqLnBvcy54ID4gKDkyMCAtIG9iai5yYWRpdXMpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUJvdW5jZVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5yaWdodFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgQmFsbCkgJiYgKG9iai5wb3MueSA8IChvYmoucmFkaXVzKSB8fCBvYmoucG9zLnkgPiAoNjAwIC0gb2JqLnJhZGl1cykpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnRvcFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgaXNPdmVyKCkge1xuICAgICAgICBpZiAodGhpcy5udW1CbG9ja3MgPT09IDAgfHwgdGhpcy5saXZlcyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzQ29sbGlkZWQob2JqMSwgb2JqMikge1xuICAgICAgICBsZXQgZHggPSBNYXRoLmFicyhvYmoyLnBvcy54IC0gb2JqMS5wb3MueCAtIG9iajEud2lkdGggLyAyKTtcbiAgICAgICAgbGV0IGR5ID0gTWF0aC5hYnMob2JqMi5wb3MueSAtIG9iajEucG9zLnkgLSBvYmoxLmhlaWdodCAvIDIpO1xuICAgICAgICBpZiAoZHggPiAob2JqMS53aWR0aCAvIDIgKyBvYmoyLnJhZGl1cykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGR5ID4gKG9iajEuaGVpZ2h0IC8gMiArIG9iajIucmFkaXVzKSkgeyBcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkeCA8PSAob2JqMS53aWR0aCAvIDIpKSB7IFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7IFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZHkgPD0gKG9iajEuaGVpZ2h0IC8gMikpIHsgXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgXG4gICAgICAgIH07XG4gICAgICAgIGxldCBkWCA9IGR4IC0gb2JqMS53aWR0aCAvIDI7XG4gICAgICAgIGxldCBkWSA9IGR5IC0gb2JqMi53aWR0aCAvIDI7XG4gICAgICAgIHJldHVybiAoZFggKiBkWCArIGRZICogZFkgPD0gKG9iajIucmFkaXVzICogb2JqMi5yYWRpdXMpKTtcbiAgICB9O1xuICAgIC8vIGlzQ29sbGlkZWQob2JqMSwgb2JqMikge1xuICAgIC8vICAgICBsZXQgZHggPSBNYXRoLmFicyhvYmoyLnBvcy54IC0gb2JqMS5wb3MueCAtIG9iajEud2lkdGggLyAyKTtcbiAgICAvLyAgICAgbGV0IGR5ID0gTWF0aC5hYnMob2JqMi5wb3MueSAtIG9iajEucG9zLnkgLSBvYmoxLmhlaWdodCAvIDIpO1xuICAgIC8vICAgICBpZiAoZHggPiAob2JqMS53aWR0aCAvIDIgKyBvYmoyLnJhZGl1cykpIHtcbiAgICAvLyAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAvLyAgICAgfTtcbiAgICAvLyAgICAgaWYgKGR5ID4gKG9iajEuaGVpZ2h0IC8gMiArIG9iajIucmFkaXVzKSkgeyBcbiAgICAvLyAgICAgICAgIHJldHVybiBmYWxzZTsgXG4gICAgLy8gICAgIH07XG4gICAgLy8gICAgIGlmIChkeCA8PSAob2JqMS53aWR0aCAvIDIpKSB7IFxuICAgIC8vICAgICAgICAgcmV0dXJuIHRydWU7IFxuICAgIC8vICAgICB9O1xuICAgIC8vICAgICBpZiAoZHkgPD0gKG9iajEuaGVpZ2h0IC8gMikpIHsgXG4gICAgLy8gICAgICAgICByZXR1cm4gdHJ1ZTsgXG4gICAgLy8gICAgIH07XG4gICAgLy8gICAgIGxldCBkWCA9IGR4IC0gb2JqMS53aWR0aCAvIDI7XG4gICAgLy8gICAgIGxldCBkWSA9IGR5IC0gb2JqMi53aWR0aCAvIDI7XG4gICAgLy8gICAgIHJldHVybiAoZFggKiBkWCArIGRZICogZFkgPD0gKG9iajIucmFkaXVzICogb2JqMi5yYWRpdXMpKTtcbiAgICAvLyB9O1xuXG4gICAgcmVtb3ZlKG9iaikge1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQmxvY2spIHtcbiAgICAgICAgICAgIGlmIChvYmoucG93ZXJVcCkge1xuICAgICAgICAgICAgICAgIGxldCBwVXAgPSB0aGlzLnRvdGFsUG93ZXJ1cHMuaW5kZXhPZihvYmoucG93ZXJVcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpbmdQb3dlcnVwcy5wdXNoKHRoaXMudG90YWxQb3dlcnVwc1twVXBdKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUG93ZXJ1cHMuc3BsaWNlKHBVcCwxKTtcbiAgICAgICAgICAgICAgICBvYmoucG93ZXJVcC5pbml0aWF0ZU1vdmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm51bUJsb2NrcyAtPSAxO1xuICAgICAgICAgICAgdGhpcy5ibG9ja3Muc3BsaWNlKHRoaXMuYmxvY2tzLmluZGV4T2Yob2JqKSwgMSk7XG4gICAgICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgUG93ZXJ1cCkge1xuICAgICAgICAgICAgbGV0IHBVcCA9IHRoaXMubW92aW5nUG93ZXJ1cHMuaW5kZXhPZihvYmopO1xuICAgICAgICAgICAgdGhpcy5tb3ZpbmdQb3dlcnVwcy5zcGxpY2UocFVwLCAxKTtcbiAgICAgICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBCYWxsKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxzLnNwbGljZSh0aGlzLmJhbGxzLmluZGV4T2Yob2JqKSwgMSk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNoZWNrRm9yQ29sbGlzaW9ucygpIHtcbiAgICAgICAgY29uc3QgYWxsT2JqID0gdGhpcy5hbGxDdXJPYmplY3RzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsT2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBhbGxPYmoubGVuZ3RoOyBqICsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqMSA9IGFsbE9ialtpXTtcbiAgICAgICAgICAgICAgICBjb25zdCBvYmoyID0gYWxsT2JqW2pdO1xuICAgICAgICAgICAgICAgIGlmIChvYmoxIGluc3RhbmNlb2YgUGxheWVyICYmIG9iajIgaW5zdGFuY2VvZiBCYWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkZWQob2JqMSwgb2JqMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUJvdW5jZVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoxLmNvbGxpZGVzV2l0aChvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBQbGF5ZXIgJiYgb2JqMiBpbnN0YW5jZW9mIFBvd2VydXApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRlZChvYmoxLCBvYmoyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIC8vcG93ZXJ1cFNvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxpZGVzV2l0aFBvd2VydXAob2JqMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBCYWxsICYmIG9iajIgaW5zdGFuY2VvZiBCbG9jaykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbGxpZGVkKG9iajIsIG9iajEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5jb2xsaWRlc1dpdGgob2JqMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29sbGlkZXNXaXRoUG93ZXJ1cChwb3dlcnVwKSB7XG4gICAgICAgIHN3aXRjaCAocG93ZXJ1cC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiZXh0cmFMaWZlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5saXZlcyArPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm11bHRpQmFsbFwiOlxuICAgICAgICAgICAgICAgIGxldCBuZXdCYWxscyA9IFtuZXcgQmFsbCh7IHg6IHRoaXMuYmFsbHNbMF0ucG9zLngsIHk6IHRoaXMuYmFsbHNbMF0ucG9zLnkgfSwgdHJ1ZSksIG5ldyBCYWxsKHsgeDogdGhpcy5iYWxsc1swXS5wb3MueCwgeTogdGhpcy5iYWxsc1swXS5wb3MueSB9LCB0cnVlKV07XG4gICAgICAgICAgICAgICAgdGhpcy5iYWxscy5jb25jYXQobmV3QmFsbHMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBjYXNlIFwic3VwZXJiYWxsXCI6XG4gICAgICAgICAgICAvLyAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2hvcnRlclBhZGRsZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLndpZHRoID0gdGhpcy5wbGF5ZXIud2lkdGggLT0gMjA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibG9uZ2VyUGFkZGxlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIud2lkdGggPSB0aGlzLnBsYXllci53aWR0aCArPSAyMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIGNhc2UgXCJtaW5pZUJhbGxcIjpcbiAgICAgICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIGNhc2UgXCJtZWdhQmFsbFwiOlxuICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hY3RpdmVQb3dlcnVwcy5wdXNoKHBvd2VydXApO1xuICAgIH07XG5cbiAgICBwbGF5U291bmQoKSB7XG4gICAgICAgIGNvbnN0IGJhbGxTb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmxvY2tTb3VuZFwiKTtcbiAgICAgICAgYmFsbFNvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgYmFsbFNvdW5kLnBsYXkoKTtcbiAgICB9O1xuXG4gICAgcGxheUJvdW5jZVNvdW5kKCkge1xuICAgICAgICBjb25zdCBhbm90aGVyU291bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFub3RoZXJTb3VuZFwiKTtcbiAgICAgICAgYW5vdGhlclNvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgYW5vdGhlclNvdW5kLnBsYXkoKTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsIlxuY2xhc3MgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIHZlbCwgcmFkaXVzKSB7XG4gICAgICAgIHRoaXMucG9zID0gcG9zO1xuICAgICAgICB0aGlzLnZlbCA9IHZlbDtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgfTtcblxuICAgIG1vdmUoZGVsdGFUaW1lKSB7XG4gICAgICAgIGxldCBuZXdEaXN0YW5jZVggPSB0aGlzLnZlbC54ICogZGVsdGFUaW1lO1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VZID0gdGhpcy52ZWwueSAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueCA9IHRoaXMucG9zLnggKyBuZXdEaXN0YW5jZVg7XG4gICAgICAgIHRoaXMucG9zLnkgPSB0aGlzLnBvcy55ICsgbmV3RGlzdGFuY2VZO1xuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb3ZpbmdPYmplY3Q7IiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL21vdmluZ19vYmplY3QnO1xuaW1wb3J0IEJhbGwgZnJvbSAnLi9iYWxsJztcbmNvbnN0IFBMQVlFUl9IRUlHSFQgPSAzMDtcbmNvbnN0IFBMQVlFUl9XSURUSCA9IDEyMDtcblxuY29uc3QgcmFuZG9tQ29sb3IgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlncyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuICAgIGxldCBjb2xvciA9IFwiI1wiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGNvbG9yICs9IGRpZ3NbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDE2KSldO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG59O1xuXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvcykge1xuICAgICAgICBzdXBlcihwb3MsIHsgeDogMCwgeTogMCB9KVxuICAgICAgICB0aGlzLmNvbG9yID0gcmFuZG9tQ29sb3IoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IFBMQVlFUl9XSURUSDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBQTEFZRVJfSEVJR0hUO1xuICAgIH07XG5cbiAgICBzZXRLZXlJbnB1dHMoaW5wdXQsIGtleSkge1xuICAgICAgICB0aGlzLnZlbC54ICs9IGlucHV0WzBdO1xuICAgIH07XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VYID0gdGhpcy52ZWwueCAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueCA9IHRoaXMucG9zLnggKyBuZXdEaXN0YW5jZVg7XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH07XG5cbiAgICAvLyBjb2xsaWRlc1dpdGgob3RoZXJPYmopIHtcbiAgICAvLyAgICAgaWYgKG90aGVyT2JqIGluc3RhbmNlb2YgQmFsbCkge1xuICAgIC8vICAgICAgICBpZiAob3RoZXJPYmouZGlyLnggPiAwKSB7XG4gICAgLy8gICAgICAgICAgICBvdGhlck9iai5kaXIueCA9IC1vdGhlck9iai5kaXIueDtcbiAgICAvLyAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgIG90aGVyT2JqLmRpci54ID0gb3RoZXJPYmouZGlyLng7XG4gICAgLy8gICAgICAgIH1cbiAgICAvLyAgICAgICAgIGlmIChvdGhlck9iai5kaXIueSA+IDApIHtcbiAgICAvLyAgICAgICAgICAgICBvdGhlck9iai5kaXIueSA9IG90aGVyT2JqLmRpci55O1xuICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICBvdGhlck9iai5kaXIueCA9IC1vdGhlck9iai5kaXIueDtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIG90aGVyT2JqLnNwZWVkID0gLU1hdGguYWJzKG90aGVyT2JqLnNwZWVkKSAqIDEuMDU7XG4gICAgLy8gICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyAgICAgfTtcbiAgICAvLyB9O1xuXG4gICAgY29sbGlkZXNXaXRoKG90aGVyT2JqKSB7XG4gICAgICAgIGlmIChvdGhlck9iaiBpbnN0YW5jZW9mIEJhbGwpIHtcbiAgICAgICAgICAgIG90aGVyT2JqLmRpci54ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci54KTtcbiAgICAgICAgICAgIG90aGVyT2JqLmRpci55ID0gLU1hdGguYWJzKG90aGVyT2JqLmRpci55KTtcbiAgICAgICAgICAgIG90aGVyT2JqLnZlbC55ID0gLU1hdGguYWJzKG90aGVyT2JqLnZlbC55KSAqIDEuMTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgIH07XG5cblxuICAgIHJpZ2h0V2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueCA9IC1NYXRoLmFicyh0aGlzLnZlbC54KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbGVmdFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnggPSBNYXRoLmFicyh0aGlzLnZlbC54KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL21vdmluZ19vYmplY3QnO1xuXG5jb25zdCBQT1dFUlVQX1JBRElVUyA9IDMwO1xuXG5jb25zdCByYW5kb21Db2xvciA9ICgpID0+IHtcbiAgICBjb25zdCBkaWdzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgbGV0IGNvbG9yID0gXCIjXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29sb3IgKz0gZGlnc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTYpKV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjtcbn07XG5cbmNsYXNzIFBvd2VydXAgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gICAgY29uc3RydWN0b3IocG9zLCB0eXBlKSB7XG4gICAgICAgIHN1cGVyKHBvcywgeyB4OiAwLCB5OiAwIH0sIFBPV0VSVVBfUkFESVVTKVxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmNvbG9yID0gcmFuZG9tQ29sb3IoKTtcbiAgICB9O1xuICAgIFxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmModGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCB0cnVlKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9O1xuXG4gICAgaW5pdGlhdGVNb3ZlKCkge1xuICAgICAgICB0aGlzLnZlbC55ICs9IDEzMDtcbiAgICB9XG5cbiAgICBtb3ZlKGRlbHRhVGltZSkge1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VZID0gdGhpcy52ZWwueSAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueSA9IHRoaXMucG9zLnkgKyBuZXdEaXN0YW5jZVk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvd2VydXA7IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vY2xhc3Nlcy9nYW1lXCI7XG5pbXBvcnQgR1ZpZXcgZnJvbSBcIi4vY2xhc3Nlcy9nX3ZpZXdcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGxldCBnaXRodWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdpdGh1YlwiKTtcbiAgICBnaXRodWIub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vbXdkZXNoYXcnO1xuICAgIH1cbiAgICBsZXQgbGlua2VkaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmtlZGluXCIpO1xuICAgIGxpbmtlZGluLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL21hdHRoZXctZGVzaGF3LWI2MjlhMGJhLyc7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWZhdWx0XCIpO1xuICAgIGNvbnN0IHBvd2VyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3dlci1idG5cIik7XG4gICAgcG93ZXJCdG4ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZGVmU2NyZWVuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYWN0aXZlXCIpO1xuICAgICAgICBjb25zdCBzdGFydFNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1zY3JlZW4nKTtcbiAgICAgICAgc3RhcnRTY3JlZW4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG5cbiAgICAgICAgY29uc3QgbGlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG93ZXItbHQnKTtcbiAgICAgICAgbGlnaHQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG5cbiAgICAgICAgY29uc3Qgc2NyZWVuVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnQtdGV4dFwiKTtcbiAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnN0cnVjdGlvbnNcIik7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udHJvbHMtbGlzdFwiKTtcblxuICAgICAgICBzY3JlZW5UZXh0LmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1nYW1lXCIpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lYm95U291bmRcIik7XG4gICAgICAgICAgICBhdWRpby5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgICAgIGNvbnRyb2xzTGlzdC5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICAgICAgc3RhcnRCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG4gICAgICAgIH0sIDMwMDApO1xuXG4gICAgICAgIHN0YXJ0QnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBzdGFydFNjcmVlbi5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kXCIpO1xuICAgICAgICAgICAgY29udHJvbHNMaXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICBzY3JlZW5UZXh0LmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkXCIpO1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShjdHgpO1xuICAgICAgICAgICAgbmV3IEdWaWV3KGdhbWUpLnN0YXJ0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGRlZlNjcmVlbi5jbGFzc0xpc3RbMF0gPT09IFwiYWN0aXZlXCIpIHtcbiAgICAgICAgICAgIHBvd2VyQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmU2NyZWVuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgICAgIHN0YXJ0QnRuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgICAgIHN0YXJ0U2NyZWVuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgICAgIHNjcmVlblRleHQuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgICAgICBjb250cm9sc0xpc3QuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgICAgICBsaWdodC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=