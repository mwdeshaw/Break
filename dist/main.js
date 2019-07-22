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
            this.bounce();
            return true;
        } else {
            return false;
        };
    };

    wallCollision() {
        this.vel.x = -this.vel.x;
        return true;
    }

    topWallCollision() {
        this.vel.y = -this.vel.y;
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
/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ball */ "./src/classes/ball.js");


const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

class Block {
    constructor(pos, width, height, type, powerUp) {
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

    collidesWith(otherObj) {
        if (otherObj instanceof _ball__WEBPACK_IMPORTED_MODULE_0__["default"]) {
            otherObj.bounce();
        };
    };

}

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
            a: [-70, 0],
            d: [70, 0],
            space: [0, -100]
        };
    };

    keyHandler() {   
        document.addEventListener("keydown", event => {
            this.handleKey(event, true);
        });
        document.addEventListener("keyup", event => {
            this.handleKeyUp(event, true);
        });
    };


    handleKeyUp(event, up) {
        let input = this.input;
        if (!this.game.ball.initialFlag) {
            switch (event.keyCode) {
                case 65:
                    if (input.a !== up) {
                        this.game.player.vel.x = 0;
                    }
                    break;
                case 68:
                    if (input.d !== up) {
                        this.game.player.vel.x = 0;
                    }
                    break;
                default:
                    break;
            }
        } else {
            switch (event.keyCode) {
                case 65:
                    if (input.a !== up) {
                        this.game.player.vel.x = 0;
                    }
                    break;
                case 68:
                    if (input.d !== up) {
                        this.game.player.vel.x = 0;
                    }
                    break;
                default:
                    break;
            };
        };
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
                        this.game.player.setKeyInputs(input.d, Object.keys(this.input)[0]);
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




const HEIGHT = 600;
const WIDTH = 920;
const PLAYER_START_LOCATION = { x: 400, y: 540 };
const BALL_START_LOCATION = { x: 460, y: 500 };
const STARTING_LIVES = 3;
const BLOCK_HEIGHT = 50;
const BLOCK_WIDTH = 50;
const BLOCKS_NUM = 72;

class Game {
    constructor(ctx) {
        this.lives = STARTING_LIVES;
        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"](Object.assign({}, PLAYER_START_LOCATION));
        this.ctx = ctx;
        this.blocks = [];
        this.ball = new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](Object.assign({}, BALL_START_LOCATION));
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
                this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT));
                i += 1;
            } 

            blockPosX += BLOCK_WIDTH;
            if (blockPosX > 890) {
                blockPosX = 10;
                blockPosY = blockPosY += BLOCK_HEIGHT;
            }
            this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT));
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
            if (obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"] && this.isOutOfBounds(obj.pos.y)) {
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
            if ((obj instanceof _player__WEBPACK_IMPORTED_MODULE_0__["default"]) && (obj.pos.x < 0 || obj.pos.x > (920 - obj.width))) {
                return obj.wallCollision();
            }
            if ((obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) && (obj.pos.x < (0 + obj.radius) || obj.pos.x > (920 - obj.radius))) {
                this.playBounceSound();
                return obj.wallCollision();
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
        let temp;
        if (obj1 instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) {
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
        if (obj instanceof _blocks__WEBPACK_IMPORTED_MODULE_2__["default"]) {
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
        this.vel.y += input[1];
    };

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.restore();
    };

    collidesWith(otherObj) {
        if (otherObj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__["default"]) {
            otherObj.bounce(); 
        };
    };

    wallCollision() {
        this.vel.x = -this.vel.x;
        return true;
    };

};

/* harmony default export */ __webpack_exports__["default"] = (Player);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvYmFsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9ibG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZ192aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbW92aW5nX29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBd0M7QUFDVjtBQUNEOztBQUU3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztB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cyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IE1vdmluZ09iaiBmcm9tICcuL21vdmluZ19vYmplY3QnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9ja3MnO1xuXG5jb25zdCBCQUxMX1JBRElVUyA9IDIwO1xuXG5jb25zdCByYW5kb21Db2xvciA9ICgpID0+IHtcbiAgICBjb25zdCBkaWdzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgbGV0IGNvbG9yID0gXCIjXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29sb3IgKz0gZGlnc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTYpKV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjtcbn07XG5cbmNsYXNzIEJhbGwgZXh0ZW5kcyBNb3ZpbmdPYmoge1xuICAgIGNvbnN0cnVjdG9yKHBvcykge1xuICAgICAgICBzdXBlcihwb3MsIHsgeDogMCwgeTogMCB9LCBCQUxMX1JBRElVUyk7XG4gICAgICAgIHRoaXMuY29sb3IgPSByYW5kb21Db2xvcigpO1xuICAgICAgICB0aGlzLmRpciA9IHsgeDogMCwgeTogMCB9XG4gICAgICAgIHRoaXMuc3BpblNwZWVkID0gTWF0aC5yYW5kb20oKSAqIDYwICsgMzA7XG4gICAgICAgIHRoaXMuaW5pdGlhbEZsYWcgPSBmYWxzZTtcblxuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBsZXQgcm90YXRlRGlyID0gTWF0aC5hdGFuKHRoaXMuZGlyLnkgLyB0aGlzLmRpci54KTtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvcy54LCB0aGlzLnBvcy55KTtcbiAgICAgICAgY3R4LnJvdGF0ZShyb3RhdGVEaXIpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKC10aGlzLnBvcy54LCAtdGhpcy5wb3MueSlcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLnJhZGl1cywgMCwgMiAqIE1hdGguUEksIHRydWUpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH07XG5cbiAgICBjb2xsaWRlc1dpdGgob3RoZXJPYmopIHtcbiAgICAgICAgaWYgKG90aGVyT2JqIGluc3RhbmNlb2YgUGxheWVyKSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5jZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAob3RoZXJPYmogaW5zdGFuY2VvZiBCbG9jaykge1xuICAgICAgICAgICAgdGhpcy5ib3VuY2UoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB3YWxsQ29sbGlzaW9uKCkge1xuICAgICAgICB0aGlzLnZlbC54ID0gLXRoaXMudmVsLng7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHRvcFdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnkgPSAtdGhpcy52ZWwueTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgYm91bmNlKCkge1xuICAgICAgICBpZiAodGhpcy5kaXIueCAhPT0gMCAmJiB0aGlzLmRpci55ICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpci54ID0gLXRoaXMuZGlyLng7XG4gICAgICAgICAgICB0aGlzLmRpci55ID0gLXRoaXMuZGlyLnk7XG4gICAgICAgICAgICB0aGlzLnZlbC55ID0gLXRoaXMudmVsLnk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGluaXRpYWxSb3RhdGlvbigpIHtcbiAgICAgICAgbGV0IHJhZHMgPSA5MCAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgdGhpcy5kaXIueCA9IE1hdGguY29zKHJhZHMpO1xuICAgICAgICB0aGlzLmRpci55ID0gTWF0aC5zaW4ocmFkcyk7XG4gICAgfTtcblxuICAgIHJvdGF0ZShkZWx0YVRpbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlyLnkgIT09IDApIHtcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IC10aGlzLnNwaW5TcGVlZCAqIChNYXRoLlBJIC8gMTgwKSAqIGRlbHRhVGltZTtcbiAgICAgICAgICAgIGxldCB2ZWN0b3IgPSBbdGhpcy5kaXIueCwgdGhpcy5kaXIueV07XG5cbiAgICAgICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICB2YXIgc2luID0gTWF0aC5zaW4oYW5nbGUpO1xuXG4gICAgICAgICAgICB0aGlzLmRpci54ID0gTWF0aC5yb3VuZCgxMDAwMCAqICh2ZWN0b3JbMF0gKiBjb3MgLSB2ZWN0b3JbMV0gKiBzaW4pKSAvIDEwMDAwO1xuICAgICAgICAgICAgdGhpcy5kaXIueSA9IE1hdGgucm91bmQoMTAwMDAgKiAodmVjdG9yWzBdICogc2luICsgdmVjdG9yWzFdICogY29zKSkgLyAxMDAwMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUJhbGxSZWxlYXNlKGlucHV0LCBrZXkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxGbGFnICYmIGtleSAhPT0gXCJzcGFjZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnZlbC54ICs9IGlucHV0WzBdO1xuICAgICAgICAgICAgdGhpcy52ZWwueSArPSBpbnB1dFsxXTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwic3BhY2VcIiAmJiB0aGlzLmRpci54ID09PSAwICYmIHRoaXMuZGlyLnkgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMudmVsLnggKz0gaW5wdXRbMF07XG4gICAgICAgICAgICB0aGlzLnZlbC55ICs9IGlucHV0WzFdO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsUm90YXRpb24oKTtcblxuICAgICAgICB9XG4gICAgfTtcblxuICAgIG1vdmUoZGVsdGFUaW1lKSB7XG4gICAgICAgIHN1cGVyLm1vdmUoZGVsdGFUaW1lKTtcbiAgICAgICAgdGhpcy5yb3RhdGUoZGVsdGFUaW1lKTtcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQmFsbDsiLCJpbXBvcnQgQmFsbCBmcm9tICcuL2JhbGwnO1xuXG5jb25zdCByYW5kb21Db2xvciA9ICgpID0+IHtcbiAgICBjb25zdCBkaWdzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgbGV0IGNvbG9yID0gXCIjXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29sb3IgKz0gZGlnc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTYpKV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjtcbn07XG5cbmNsYXNzIEJsb2NrIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIHdpZHRoLCBoZWlnaHQsIHR5cGUsIHBvd2VyVXApIHtcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuY29sb3IgPSByYW5kb21Db2xvcigpO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnBvd2VyVXAgPSBwb3dlclVwO1xuICAgIH1cblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH07XG5cbiAgICBjb2xsaWRlc1dpdGgob3RoZXJPYmopIHtcbiAgICAgICAgaWYgKG90aGVyT2JqIGluc3RhbmNlb2YgQmFsbCkge1xuICAgICAgICAgICAgb3RoZXJPYmouYm91bmNlKCk7XG4gICAgICAgIH07XG4gICAgfTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9jazsiLCJcblxuY2xhc3MgR1ZJRVcge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpe1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmlucHV0ID0ge1xuICAgICAgICAgICAgYTogWy03MCwgMF0sXG4gICAgICAgICAgICBkOiBbNzAsIDBdLFxuICAgICAgICAgICAgc3BhY2U6IFswLCAtMTAwXVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBrZXlIYW5kbGVyKCkgeyAgIFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUtleShldmVudCwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVLZXlVcChldmVudCwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIGhhbmRsZUtleVVwKGV2ZW50LCB1cCkge1xuICAgICAgICBsZXQgaW5wdXQgPSB0aGlzLmlucHV0O1xuICAgICAgICBpZiAoIXRoaXMuZ2FtZS5iYWxsLmluaXRpYWxGbGFnKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDY1OlxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuYSAhPT0gdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjg6XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5kICE9PSB1cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDY1OlxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuYSAhPT0gdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudmVsLnggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjg6XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5kICE9PSB1cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci52ZWwueCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG5cblxuICAgIGhhbmRsZUtleShldmVudCwgZG93bikge1xuICAgICAgICBsZXQgaW5wdXQgPSB0aGlzLmlucHV0O1xuICAgICAgICBpZiAoIXRoaXMuZ2FtZS5iYWxsLmluaXRpYWxGbGFnKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDY1OlxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuYSAhPT0gZG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zZXRLZXlJbnB1dHMoaW5wdXQuYSwgT2JqZWN0LmtleXModGhpcy5pbnB1dClbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGwuaGFuZGxlQmFsbFJlbGVhc2UoaW5wdXQuYSwgT2JqZWN0LmtleXModGhpcy5pbnB1dClbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjg6XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5kICE9PSBkb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNldEtleUlucHV0cyhpbnB1dC5kLCBPYmplY3Qua2V5cyh0aGlzLmlucHV0KVswXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbC5oYW5kbGVCYWxsUmVsZWFzZShpbnB1dC5kLCBPYmplY3Qua2V5cyh0aGlzLmlucHV0KVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnNwYWNlICE9PSBkb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbC5pbml0aWFsRmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbC5oYW5kbGVCYWxsUmVsZWFzZShpbnB1dC5zcGFjZSwgT2JqZWN0LmtleXModGhpcy5pbnB1dClbMl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgNjU6XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5hICE9PSBkb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNldEtleUlucHV0cyhpbnB1dC5hLCBPYmplY3Qua2V5cyh0aGlzLmlucHV0KVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2ODpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LmQgIT09IGRvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc2V0S2V5SW5wdXRzKGlucHV0LmQsIE9iamVjdC5rZXlzKHRoaXMuaW5wdXQpWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH07ICAgICBcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMua2V5SGFuZGxlcigpO1xuICAgICAgICB0aGlzLmxhc3RUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgYW5pbWF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmdhbWUuaXNPdmVyKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhVCA9IChuZXcgRGF0ZSgpIC0gdGhpcy5sYXN0VGltZSkgLyAxMDAwO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnNpbmdsZU1vdmUoZGVsdGFUKVxuICAgICAgICAgICAgdGhpcy5nYW1lLmRyYXcoKTtcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nYW1lLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5nYW1lLndpZHRoLCB0aGlzLmdhbWUuaGVpZ2h0KTtcbiAgICAgICAgICAgIGNvbnN0IGVuZFNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW5kLXNjcmVlblwiKTtcbiAgICAgICAgICAgIGVuZFNjcmVlbi5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR1ZJRVc7IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBCYWxsIGZyb20gJy4vYmFsbCc7XG5pbXBvcnQgQmxvY2sgZnJvbSAnLi9ibG9ja3MnO1xuXG5jb25zdCBIRUlHSFQgPSA2MDA7XG5jb25zdCBXSURUSCA9IDkyMDtcbmNvbnN0IFBMQVlFUl9TVEFSVF9MT0NBVElPTiA9IHsgeDogNDAwLCB5OiA1NDAgfTtcbmNvbnN0IEJBTExfU1RBUlRfTE9DQVRJT04gPSB7IHg6IDQ2MCwgeTogNTAwIH07XG5jb25zdCBTVEFSVElOR19MSVZFUyA9IDM7XG5jb25zdCBCTE9DS19IRUlHSFQgPSA1MDtcbmNvbnN0IEJMT0NLX1dJRFRIID0gNTA7XG5jb25zdCBCTE9DS1NfTlVNID0gNzI7XG5cbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKGN0eCkge1xuICAgICAgICB0aGlzLmxpdmVzID0gU1RBUlRJTkdfTElWRVM7XG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihPYmplY3QuYXNzaWduKHt9LCBQTEFZRVJfU1RBUlRfTE9DQVRJT04pKTtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuYmxvY2tzID0gW107XG4gICAgICAgIHRoaXMuYmFsbCA9IG5ldyBCYWxsKE9iamVjdC5hc3NpZ24oe30sIEJBTExfU1RBUlRfTE9DQVRJT04pKTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBIRUlHSFQ7XG4gICAgICAgIHRoaXMud2lkdGggPSBXSURUSDtcbiAgICAgICAgdGhpcy50aGVtZUNvbG9yID0gW1wiI2JkYWU1N1wiXTtcbiAgICAgICAgdGhpcy5udW1CbG9ja3MgPSBCTE9DS1NfTlVNO1xuXG4gICAgICAgIHRoaXMuYWRkQmxvY2tzKHRoaXMubnVtQmxvY2tzKTtcbiAgICB9OyAgIFxuICAgICBcbiAgICBhZGRCbG9ja3Mobikge1xuICAgICAgICBsZXQgYmxvY2tQb3NYID0gMTA7XG4gICAgICAgIGxldCBibG9ja1Bvc1kgPSAxMDtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5ibG9ja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCBCTE9DS19XSURUSCwgQkxPQ0tfSEVJR0hUKSk7XG4gICAgICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgYmxvY2tQb3NYICs9IEJMT0NLX1dJRFRIO1xuICAgICAgICAgICAgaWYgKGJsb2NrUG9zWCA+IDg5MCkge1xuICAgICAgICAgICAgICAgIGJsb2NrUG9zWCA9IDEwO1xuICAgICAgICAgICAgICAgIGJsb2NrUG9zWSA9IGJsb2NrUG9zWSArPSBCTE9DS19IRUlHSFQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9jayh7IHg6IGJsb2NrUG9zWCwgeTogYmxvY2tQb3NZIH0sIEJMT0NLX1dJRFRILCBCTE9DS19IRUlHSFQpKTtcbiAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmxvY2tzO1xuICAgIH07XG4gICAgIFxuICAgIGFsbEN1ck9iamVjdHMoKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoW3RoaXMucGxheWVyXSwgW3RoaXMuYmFsbF0sIHRoaXMuYmxvY2tzKTtcbiAgICB9O1xuXG4gICAgYWxsQ3VyTW92aW5nT2JqcygpIHtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChbdGhpcy5wbGF5ZXJdLCBbdGhpcy5iYWxsXSk7XG4gICAgfTtcbiBcbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLnRoZW1lQ29sb3JbMF07XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjMwcHggU2Fucy1TZXJpZlwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiM4YTg5MWZcIjtcbiAgICAgICAgaWYgKHRoaXMubGl2ZXMgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChgJHt0aGlzLmxpdmVzfSBMaXZlcyBMZWZ0YCwgNzUwLCA1ODApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoYCR7dGhpcy5saXZlc30gTGlmZSBMZWZ0YCwgNzUwLCA1ODApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFsbEN1ck9iamVjdHMoKS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICBvYmouZHJhdyh0aGlzLmN0eCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBtb3ZlT2JqZWN0cyhkZWx0YSkge1xuICAgICAgICBjb25zdCBtb3ZpbmdPYmogPSB0aGlzLmFsbEN1ck1vdmluZ09ianMoKTtcbiAgICAgICAgbW92aW5nT2JqLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgIG9iai5tb3ZlKGRlbHRhKTtcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBCYWxsICYmIHRoaXMuaXNPdXRPZkJvdW5kcyhvYmoucG9zLnkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWF0aEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNpbmdsZU1vdmUoZGVsdGEpIHtcbiAgICAgICAgdGhpcy5tb3ZlT2JqZWN0cyhkZWx0YSk7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JDb2xsaXNpb25zKCk7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JXYWxsQ29sbGlzaW9ucygpO1xuICAgIH07XG5cbiAgICBpc091dE9mQm91bmRzKHBvc1kpIHtcbiAgICAgICAgaWYgKHBvc1kgPiAoNTYwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZGVhdGhBbmltYXRpb24oKSB7XG4gICAgICAgIHRoaXMubGl2ZXMgLT0gMTtcbiAgICAgICAgaWYgKHRoaXMubGl2ZXMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIkdhbWUgT3ZlciFcIlxuICAgICAgICB9IGVsc2UgeyAgICAgXG4gICAgICAgICAgICB0aGlzLnBsYXllci5wb3MgPSBPYmplY3QuYXNzaWduKHt9LCBQTEFZRVJfU1RBUlRfTE9DQVRJT04pO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgICAgICB0aGlzLmJhbGwucG9zID0gT2JqZWN0LmFzc2lnbih7fSwgQkFMTF9TVEFSVF9MT0NBVElPTik7XG4gICAgICAgICAgICB0aGlzLmJhbGwudmVsID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgICAgICB0aGlzLmJhbGwuZGlyID0geyB4OiAwLCB5OiAwIH07XG4gICAgICAgICAgICB0aGlzLmJhbGwuaW5pdGlhbEZsYWcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjaGVja0ZvcldhbGxDb2xsaXNpb25zKCkge1xuICAgICAgICBjb25zdCBhbGxNb3ZpbmdPYmogPSB0aGlzLmFsbEN1ck1vdmluZ09ianMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxNb3ZpbmdPYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IGFsbE1vdmluZ09ialtpXTtcbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgUGxheWVyKSAmJiAob2JqLnBvcy54IDwgMCB8fCBvYmoucG9zLnggPiAoOTIwIC0gb2JqLndpZHRoKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLndhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgob2JqIGluc3RhbmNlb2YgQmFsbCkgJiYgKG9iai5wb3MueCA8ICgwICsgb2JqLnJhZGl1cykgfHwgb2JqLnBvcy54ID4gKDkyMCAtIG9iai5yYWRpdXMpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUJvdW5jZVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai53YWxsQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIEJhbGwpICYmIChvYmoucG9zLnkgPCAoMCArIG9iai5yYWRpdXMpIHx8IG9iai5wb3MueSA+ICg2MDAgLSBvYmoucmFkaXVzKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb3VuY2VTb3VuZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoudG9wV2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBpc092ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm51bUJsb2NrcyA9PT0gMCB8fCB0aGlzLmxpdmVzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNDb2xsaWRlZChvYmoxLCBvYmoyKSB7XG4gICAgICAgIGxldCB0ZW1wO1xuICAgICAgICBpZiAob2JqMSBpbnN0YW5jZW9mIEJhbGwpIHtcbiAgICAgICAgICAgIHRlbXAgPSBvYmoxO1xuICAgICAgICAgICAgb2JqMSA9IG9iajI7XG4gICAgICAgICAgICBvYmoyID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZHggPSBNYXRoLmFicyhvYmoyLnBvcy54IC0gb2JqMS5wb3MueCAtIG9iajEud2lkdGggLyAyKTtcbiAgICAgICAgbGV0IGR5ID0gTWF0aC5hYnMob2JqMi5wb3MueSAtIG9iajEucG9zLnkgLSBvYmoxLmhlaWdodCAvIDIpO1xuICAgICAgICBpZiAoZHggPiAob2JqMS53aWR0aCAvIDIgKyBvYmoyLnJhZGl1cykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGR5ID4gKG9iajEuaGVpZ2h0IC8gMiArIG9iajIucmFkaXVzKSkgeyBcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkeCA8PSAob2JqMS53aWR0aCAvIDIpKSB7IFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7IFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZHkgPD0gKG9iajEuaGVpZ2h0IC8gMikpIHsgXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgXG4gICAgICAgIH07XG4gICAgICAgIGxldCBkWCA9IGR4IC0gb2JqMS53aWR0aCAvIDI7XG4gICAgICAgIGxldCBkWSA9IGR5IC0gb2JqMi53aWR0aCAvIDI7XG4gICAgICAgIHJldHVybiAoZFggKiBkWCArIGRZICogZFkgPD0gKG9iajIucmFkaXVzICogb2JqMi5yYWRpdXMpKTtcbiAgICB9O1xuXG4gICAgcmVtb3ZlKG9iaikge1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQmxvY2spIHtcbiAgICAgICAgICAgIHRoaXMubnVtQmxvY2tzIC09IDE7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5zcGxpY2UodGhpcy5ibG9ja3MuaW5kZXhPZihvYmopLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdHlwZSBvZiBvYmplY3RcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2hlY2tGb3JDb2xsaXNpb25zKCkge1xuICAgICAgICBjb25zdCBhbGxPYmogPSB0aGlzLmFsbEN1ck9iamVjdHMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxPYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGFsbE9iai5sZW5ndGg7IGogKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYmoxID0gYWxsT2JqW2ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9iajIgPSBhbGxPYmpbal07XG4gICAgICAgICAgICAgICAgaWYgKG9iajEgaW5zdGFuY2VvZiBQbGF5ZXIgJiYgb2JqMiBpbnN0YW5jZW9mIEJhbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRlZChvYmoxLCBvYmoyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuY29sbGlkZXNXaXRoKG9iajIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqMSBpbnN0YW5jZW9mIEJhbGwgJiYgb2JqMiBpbnN0YW5jZW9mIFBsYXllcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbGxpZGVkKG9iajEsIG9iajIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb3VuY2VTb3VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqMS5jb2xsaWRlc1dpdGgob2JqMik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYmoxIGluc3RhbmNlb2YgQmFsbCAmJiBvYmoyIGluc3RhbmNlb2YgQmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRlZChvYmoxLCBvYmoyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5U291bmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuY29sbGlkZXNXaXRoKG9iajIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUob2JqMik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHBsYXlTb3VuZCgpIHtcbiAgICAgICAgY29uc3QgYmFsbFNvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibG9ja1NvdW5kXCIpO1xuICAgICAgICBiYWxsU291bmQuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICBiYWxsU291bmQucGxheSgpO1xuICAgIH07XG5cbiAgICBwbGF5Qm91bmNlU291bmQoKSB7XG4gICAgICAgIGNvbnN0IGFub3RoZXJTb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5vdGhlclNvdW5kXCIpO1xuICAgICAgICBhbm90aGVyU291bmQuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICBhbm90aGVyU291bmQucGxheSgpO1xuICAgIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiXG5jbGFzcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvcywgdmVsLCByYWRpdXMpIHtcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgICAgIHRoaXMudmVsID0gdmVsO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB9O1xuXG4gICAgbW92ZShkZWx0YVRpbWUpIHtcbiAgICAgICAgbGV0IG5ld0Rpc3RhbmNlWCA9IHRoaXMudmVsLnggKiBkZWx0YVRpbWU7XG4gICAgICAgIGxldCBuZXdEaXN0YW5jZVkgPSB0aGlzLnZlbC55ICogZGVsdGFUaW1lO1xuICAgICAgICB0aGlzLnBvcy54ID0gdGhpcy5wb3MueCArIG5ld0Rpc3RhbmNlWDtcbiAgICAgICAgdGhpcy5wb3MueSA9IHRoaXMucG9zLnkgKyBuZXdEaXN0YW5jZVk7XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1vdmluZ09iamVjdDsiLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vbW92aW5nX29iamVjdCc7XG5pbXBvcnQgQmFsbCBmcm9tICcuL2JhbGwnO1xuY29uc3QgUExBWUVSX0hFSUdIVCA9IDMwO1xuY29uc3QgUExBWUVSX1dJRFRIID0gMTIwO1xuXG5jb25zdCByYW5kb21Db2xvciA9ICgpID0+IHtcbiAgICBjb25zdCBkaWdzID0gXCIwMTIzNDU2Nzg5QUJDREVGXCI7XG4gICAgbGV0IGNvbG9yID0gXCIjXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgY29sb3IgKz0gZGlnc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTYpKV07XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjtcbn07XG5cbmNsYXNzIFBsYXllciBleHRlbmRzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zKSB7XG4gICAgICAgIHN1cGVyKHBvcywgeyB4OiAwLCB5OiAwIH0pXG4gICAgICAgIHRoaXMuY29sb3IgPSByYW5kb21Db2xvcigpO1xuICAgICAgICB0aGlzLndpZHRoID0gUExBWUVSX1dJRFRIO1xuICAgICAgICB0aGlzLmhlaWdodCA9IFBMQVlFUl9IRUlHSFQ7XG4gICAgfTtcblxuICAgIHNldEtleUlucHV0cyhpbnB1dCwga2V5KSB7XG4gICAgICAgIHRoaXMudmVsLnggKz0gaW5wdXRbMF07XG4gICAgICAgIHRoaXMudmVsLnkgKz0gaW5wdXRbMV07XG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5wb3MueCwgdGhpcy5wb3MueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH07XG5cbiAgICBjb2xsaWRlc1dpdGgob3RoZXJPYmopIHtcbiAgICAgICAgaWYgKG90aGVyT2JqIGluc3RhbmNlb2YgQmFsbCkge1xuICAgICAgICAgICAgb3RoZXJPYmouYm91bmNlKCk7IFxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB3YWxsQ29sbGlzaW9uKCkge1xuICAgICAgICB0aGlzLnZlbC54ID0gLXRoaXMudmVsLng7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjsiLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9jbGFzc2VzL2dhbWVcIjtcbmltcG9ydCBHVmlldyBmcm9tIFwiLi9jbGFzc2VzL2dfdmlld1wiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgbGV0IGdpdGh1YiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2l0aHViXCIpO1xuICAgIGdpdGh1Yi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9td2Rlc2hhdyc7XG4gICAgfVxuICAgIGxldCBsaW5rZWRpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlua2VkaW5cIik7XG4gICAgbGlua2VkaW4ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vbWF0dGhldy1kZXNoYXctYjYyOWEwYmEvJztcbiAgICB9XG5cbiAgICBjb25zdCBkZWZTY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlZmF1bHRcIik7XG4gICAgY29uc3QgcG93ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvd2VyLWJ0blwiKTtcbiAgICBwb3dlckJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBkZWZTY3JlZW4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG4gICAgICAgIGNvbnN0IHN0YXJ0U2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LXNjcmVlbicpO1xuICAgICAgICBzdGFydFNjcmVlbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcblxuICAgICAgICBjb25zdCBsaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3dlci1sdCcpO1xuICAgICAgICBsaWdodC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcblxuICAgICAgICBjb25zdCBzY3JlZW5UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydC10ZXh0XCIpO1xuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluc3RydWN0aW9uc1wiKTtcbiAgICAgICAgY29uc3QgY29udHJvbHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250cm9scy1saXN0XCIpO1xuXG4gICAgICAgIHNjcmVlblRleHQuY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWdhbWVcIik7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVib3lTb3VuZFwiKTtcbiAgICAgICAgICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICAgICAgY29udHJvbHNMaXN0LmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgICAgICBzdGFydEJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImFjdGl2ZVwiKTtcbiAgICAgICAgfSwgMzAwMCk7XG5cbiAgICAgICAgc3RhcnRCdG4ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHN0YXJ0U2NyZWVuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICBjb250cm9sc0xpc3QuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIHNjcmVlblRleHQuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIik7XG4gICAgICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGN0eCk7XG4gICAgICAgICAgICBuZXcgR1ZpZXcoZ2FtZSkuc3RhcnQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZGVmU2NyZWVuLmNsYXNzTGlzdFswXSA9PT0gXCJhY3RpdmVcIikge1xuICAgICAgICAgICAgcG93ZXJCdG4ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBkZWZTY3JlZW4ucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICAgICAgICAgICAgc3RhcnRCdG4ucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICAgICAgICAgICAgc3RhcnRTY3JlZW4ucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgICAgICAgICAgICAgc2NyZWVuVGV4dC5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kXCIpO1xuICAgICAgICAgICAgICAgIGluc3RydWN0aW9ucy5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kXCIpO1xuICAgICAgICAgICAgICAgIGNvbnRyb2xzTGlzdC5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kXCIpO1xuICAgICAgICAgICAgICAgIGxpZ2h0LnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==