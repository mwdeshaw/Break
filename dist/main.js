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
            this.handleKeyUp(event, false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvYmFsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9ibG9ja3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZ192aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbW92aW5nX29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBd0M7QUFDVjtBQUNEOztBQUU3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztB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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLDJFQUFZLEU7Ozs7Ozs7Ozs7OztBQ2hCM0I7QUFBQTtBQUFBO0FBQTJDO0FBQ2pCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLHNEQUFZO0FBQ2pDO0FBQ0Esb0JBQW9CLGFBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDLDZDQUFJO0FBQ3BDLDhCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFZSxxRUFBTSxFOzs7Ozs7Ozs7Ozs7QUMvQ3JCO0FBQUE7QUFBQTtBQUFrQztBQUNHOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIscURBQUk7QUFDakMsZ0JBQWdCLHVEQUFLO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgTW92aW5nT2JqIGZyb20gJy4vbW92aW5nX29iamVjdCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2Nrcyc7XG5cbmNvbnN0IEJBTExfUkFESVVTID0gMjA7XG5cbmNvbnN0IHJhbmRvbUNvbG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpZ3MgPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcbiAgICBsZXQgY29sb3IgPSBcIiNcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBjb2xvciArPSBkaWdzW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxNikpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufTtcblxuY2xhc3MgQmFsbCBleHRlbmRzIE1vdmluZ09iaiB7XG4gICAgY29uc3RydWN0b3IocG9zKSB7XG4gICAgICAgIHN1cGVyKHBvcywgeyB4OiAwLCB5OiAwIH0sIEJBTExfUkFESVVTKTtcbiAgICAgICAgdGhpcy5jb2xvciA9IHJhbmRvbUNvbG9yKCk7XG4gICAgICAgIHRoaXMuZGlyID0geyB4OiAwLCB5OiAwIH1cbiAgICAgICAgdGhpcy5zcGluU3BlZWQgPSBNYXRoLnJhbmRvbSgpICogNjAgKyAzMDtcbiAgICAgICAgdGhpcy5pbml0aWFsRmxhZyA9IGZhbHNlO1xuXG4gICAgfTtcblxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGxldCByb3RhdGVEaXIgPSBNYXRoLmF0YW4odGhpcy5kaXIueSAvIHRoaXMuZGlyLngpO1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zLngsIHRoaXMucG9zLnkpO1xuICAgICAgICBjdHgucm90YXRlKHJvdGF0ZURpcik7XG4gICAgICAgIGN0eC50cmFuc2xhdGUoLXRoaXMucG9zLngsIC10aGlzLnBvcy55KVxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSwgdHJ1ZSk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfTtcblxuICAgIGNvbGxpZGVzV2l0aChvdGhlck9iaikge1xuICAgICAgICBpZiAob3RoZXJPYmogaW5zdGFuY2VvZiBQbGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYm91bmNlKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChvdGhlck9iaiBpbnN0YW5jZW9mIEJsb2NrKSB7XG4gICAgICAgICAgICB0aGlzLmJvdW5jZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHdhbGxDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMudmVsLnggPSAtdGhpcy52ZWwueDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdG9wV2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueSA9IC10aGlzLnZlbC55O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBib3VuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpci54ICE9PSAwICYmIHRoaXMuZGlyLnkgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGlyLnggPSAtdGhpcy5kaXIueDtcbiAgICAgICAgICAgIHRoaXMuZGlyLnkgPSAtdGhpcy5kaXIueTtcbiAgICAgICAgICAgIHRoaXMudmVsLnkgPSAtdGhpcy52ZWwueTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgaW5pdGlhbFJvdGF0aW9uKCkge1xuICAgICAgICBsZXQgcmFkcyA9IDkwICogKE1hdGguUEkgLyAxODApO1xuICAgICAgICB0aGlzLmRpci54ID0gTWF0aC5jb3MocmFkcyk7XG4gICAgICAgIHRoaXMuZGlyLnkgPSBNYXRoLnNpbihyYWRzKTtcbiAgICB9O1xuXG4gICAgcm90YXRlKGRlbHRhVGltZSkge1xuICAgICAgICBpZiAodGhpcy5kaXIueSAhPT0gMCkge1xuICAgICAgICAgICAgbGV0IGFuZ2xlID0gLXRoaXMuc3BpblNwZWVkICogKE1hdGguUEkgLyAxODApICogZGVsdGFUaW1lO1xuICAgICAgICAgICAgbGV0IHZlY3RvciA9IFt0aGlzLmRpci54LCB0aGlzLmRpci55XTtcblxuICAgICAgICAgICAgdmFyIGNvcyA9IE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgIHZhciBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGlyLnggPSBNYXRoLnJvdW5kKDEwMDAwICogKHZlY3RvclswXSAqIGNvcyAtIHZlY3RvclsxXSAqIHNpbikpIC8gMTAwMDA7XG4gICAgICAgICAgICB0aGlzLmRpci55ID0gTWF0aC5yb3VuZCgxMDAwMCAqICh2ZWN0b3JbMF0gKiBzaW4gKyB2ZWN0b3JbMV0gKiBjb3MpKSAvIDEwMDAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQmFsbFJlbGVhc2UoaW5wdXQsIGtleSkge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbEZsYWcgJiYga2V5ICE9PSBcInNwYWNlXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmVsLnggKz0gaW5wdXRbMF07XG4gICAgICAgICAgICB0aGlzLnZlbC55ICs9IGlucHV0WzFdO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJzcGFjZVwiICYmIHRoaXMuZGlyLnggPT09IDAgJiYgdGhpcy5kaXIueSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy52ZWwueCArPSBpbnB1dFswXTtcbiAgICAgICAgICAgIHRoaXMudmVsLnkgKz0gaW5wdXRbMV07XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxSb3RhdGlvbigpO1xuXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbW92ZShkZWx0YVRpbWUpIHtcbiAgICAgICAgc3VwZXIubW92ZShkZWx0YVRpbWUpO1xuICAgICAgICB0aGlzLnJvdGF0ZShkZWx0YVRpbWUpO1xuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCYWxsOyIsImltcG9ydCBCYWxsIGZyb20gJy4vYmFsbCc7XG5cbmNvbnN0IHJhbmRvbUNvbG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpZ3MgPSBcIjAxMjM0NTY3ODlBQkNERUZcIjtcbiAgICBsZXQgY29sb3IgPSBcIiNcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBjb2xvciArPSBkaWdzW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxNikpXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufTtcblxuY2xhc3MgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKHBvcywgd2lkdGgsIGhlaWdodCwgdHlwZSwgcG93ZXJVcCkge1xuICAgICAgICB0aGlzLnBvcyA9IHBvcztcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5jb2xvciA9IHJhbmRvbUNvbG9yKCk7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMucG93ZXJVcCA9IHBvd2VyVXA7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfTtcblxuICAgIGNvbGxpZGVzV2l0aChvdGhlck9iaikge1xuICAgICAgICBpZiAob3RoZXJPYmogaW5zdGFuY2VvZiBCYWxsKSB7XG4gICAgICAgICAgICBvdGhlck9iai5ib3VuY2UoKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJsb2NrOyIsIlxuXG5jbGFzcyBHVklFVyB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSl7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMuaW5wdXQgPSB7XG4gICAgICAgICAgICBhOiBbLTcwLCAwXSxcbiAgICAgICAgICAgIGQ6IFs3MCwgMF0sXG4gICAgICAgICAgICBzcGFjZTogWzAsIC0xMDBdXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGtleUhhbmRsZXIoKSB7ICAgXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlS2V5KGV2ZW50LCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUtleVVwKGV2ZW50LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBoYW5kbGVLZXkoZXZlbnQsIGRvd24pIHtcbiAgICAgICAgbGV0IGlucHV0ID0gdGhpcy5pbnB1dDtcbiAgICAgICAgaWYgKCF0aGlzLmdhbWUuYmFsbC5pbml0aWFsRmxhZykge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSA2NTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LmEgIT09IGRvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc2V0S2V5SW5wdXRzKGlucHV0LmEsIE9iamVjdC5rZXlzKHRoaXMuaW5wdXQpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsLmhhbmRsZUJhbGxSZWxlYXNlKGlucHV0LmEsIE9iamVjdC5rZXlzKHRoaXMuaW5wdXQpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDY4OlxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuZCAhPT0gZG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zZXRLZXlJbnB1dHMoaW5wdXQuZCwgT2JqZWN0LmtleXModGhpcy5pbnB1dClbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGwuaGFuZGxlQmFsbFJlbGVhc2UoaW5wdXQuZCwgT2JqZWN0LmtleXModGhpcy5pbnB1dClbMV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5zcGFjZSAhPT0gZG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGwuaW5pdGlhbEZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGwuaGFuZGxlQmFsbFJlbGVhc2UoaW5wdXQuc3BhY2UsIE9iamVjdC5rZXlzKHRoaXMuaW5wdXQpWzJdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDY1OlxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuYSAhPT0gZG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zZXRLZXlJbnB1dHMoaW5wdXQuYSwgT2JqZWN0LmtleXModGhpcy5pbnB1dClbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNjg6XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5kICE9PSBkb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNldEtleUlucHV0cyhpbnB1dC5kLCBPYmplY3Qua2V5cyh0aGlzLmlucHV0KVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9OyAgICAgXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmtleUhhbmRsZXIoKTtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XG4gICAgfTtcblxuICAgIGFuaW1hdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5nYW1lLmlzT3ZlcigpKSB7XG4gICAgICAgICAgICBjb25zdCBkZWx0YVQgPSAobmV3IERhdGUoKSAtIHRoaXMubGFzdFRpbWUpIC8gMTAwMDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zaW5nbGVNb3ZlKGRlbHRhVClcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5kcmF3KCk7XG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLmhlaWdodCk7XG4gICAgICAgICAgICBjb25zdCBlbmRTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVuZC1zY3JlZW5cIik7XG4gICAgICAgICAgICBlbmRTY3JlZW4uY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdWSUVXOyIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgQmFsbCBmcm9tICcuL2JhbGwnO1xuaW1wb3J0IEJsb2NrIGZyb20gJy4vYmxvY2tzJztcblxuY29uc3QgSEVJR0hUID0gNjAwO1xuY29uc3QgV0lEVEggPSA5MjA7XG5jb25zdCBQTEFZRVJfU1RBUlRfTE9DQVRJT04gPSB7IHg6IDQwMCwgeTogNTQwIH07XG5jb25zdCBCQUxMX1NUQVJUX0xPQ0FUSU9OID0geyB4OiA0NjAsIHk6IDUwMCB9O1xuY29uc3QgU1RBUlRJTkdfTElWRVMgPSAzO1xuY29uc3QgQkxPQ0tfSEVJR0hUID0gNTA7XG5jb25zdCBCTE9DS19XSURUSCA9IDUwO1xuY29uc3QgQkxPQ0tTX05VTSA9IDcyO1xuXG5jbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgpIHtcbiAgICAgICAgdGhpcy5saXZlcyA9IFNUQVJUSU5HX0xJVkVTO1xuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoT2JqZWN0LmFzc2lnbih7fSwgUExBWUVSX1NUQVJUX0xPQ0FUSU9OKSk7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmJsb2NrcyA9IFtdO1xuICAgICAgICB0aGlzLmJhbGwgPSBuZXcgQmFsbChPYmplY3QuYXNzaWduKHt9LCBCQUxMX1NUQVJUX0xPQ0FUSU9OKSk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gSEVJR0hUO1xuICAgICAgICB0aGlzLndpZHRoID0gV0lEVEg7XG4gICAgICAgIHRoaXMudGhlbWVDb2xvciA9IFtcIiNiZGFlNTdcIl07XG4gICAgICAgIHRoaXMubnVtQmxvY2tzID0gQkxPQ0tTX05VTTtcblxuICAgICAgICB0aGlzLmFkZEJsb2Nrcyh0aGlzLm51bUJsb2Nrcyk7XG4gICAgfTsgICBcbiAgICAgXG4gICAgYWRkQmxvY2tzKG4pIHtcbiAgICAgICAgbGV0IGJsb2NrUG9zWCA9IDEwO1xuICAgICAgICBsZXQgYmxvY2tQb3NZID0gMTA7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBuKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYmxvY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tzLnB1c2gobmV3IEJsb2NrKHsgeDogYmxvY2tQb3NYLCB5OiBibG9ja1Bvc1kgfSwgQkxPQ0tfV0lEVEgsIEJMT0NLX0hFSUdIVCkpO1xuICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGJsb2NrUG9zWCArPSBCTE9DS19XSURUSDtcbiAgICAgICAgICAgIGlmIChibG9ja1Bvc1ggPiA4OTApIHtcbiAgICAgICAgICAgICAgICBibG9ja1Bvc1ggPSAxMDtcbiAgICAgICAgICAgICAgICBibG9ja1Bvc1kgPSBibG9ja1Bvc1kgKz0gQkxPQ0tfSEVJR0hUO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soeyB4OiBibG9ja1Bvc1gsIHk6IGJsb2NrUG9zWSB9LCBCTE9DS19XSURUSCwgQkxPQ0tfSEVJR0hUKSk7XG4gICAgICAgICAgICBpICs9IDE7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmJsb2NrcztcbiAgICB9O1xuICAgICBcbiAgICBhbGxDdXJPYmplY3RzKCkge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KFt0aGlzLnBsYXllcl0sIFt0aGlzLmJhbGxdLCB0aGlzLmJsb2Nrcyk7XG4gICAgfTtcblxuICAgIGFsbEN1ck1vdmluZ09ianMoKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoW3RoaXMucGxheWVyXSwgW3RoaXMuYmFsbF0pO1xuICAgIH07XG4gXG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy50aGVtZUNvbG9yWzBdO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIzMHB4IFNhbnMtU2VyaWZcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCIjOGE4OTFmXCI7XG4gICAgICAgIGlmICh0aGlzLmxpdmVzID4gMSkge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoYCR7dGhpcy5saXZlc30gTGl2ZXMgTGVmdGAsIDc1MCwgNTgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGAke3RoaXMubGl2ZXN9IExpZmUgTGVmdGAsIDc1MCwgNTgwKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5hbGxDdXJPYmplY3RzKCkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgb2JqLmRyYXcodGhpcy5jdHgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgbW92ZU9iamVjdHMoZGVsdGEpIHtcbiAgICAgICAgY29uc3QgbW92aW5nT2JqID0gdGhpcy5hbGxDdXJNb3ZpbmdPYmpzKCk7XG4gICAgICAgIG1vdmluZ09iai5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICBvYmoubW92ZShkZWx0YSk7XG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQmFsbCAmJiB0aGlzLmlzT3V0T2ZCb3VuZHMob2JqLnBvcy55KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVhdGhBbmltYXRpb24oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzaW5nbGVNb3ZlKGRlbHRhKSB7XG4gICAgICAgIHRoaXMubW92ZU9iamVjdHMoZGVsdGEpO1xuICAgICAgICB0aGlzLmNoZWNrRm9yQ29sbGlzaW9ucygpO1xuICAgICAgICB0aGlzLmNoZWNrRm9yV2FsbENvbGxpc2lvbnMoKTtcbiAgICB9O1xuXG4gICAgaXNPdXRPZkJvdW5kcyhwb3NZKSB7XG4gICAgICAgIGlmIChwb3NZID4gKDU2MCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGRlYXRoQW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLmxpdmVzIC09IDE7XG4gICAgICAgIGlmICh0aGlzLmxpdmVzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJHYW1lIE92ZXIhXCJcbiAgICAgICAgfSBlbHNlIHsgICAgIFxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucG9zID0gT2JqZWN0LmFzc2lnbih7fSwgUExBWUVSX1NUQVJUX0xPQ0FUSU9OKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnZlbCA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICAgICAgdGhpcy5iYWxsLnBvcyA9IE9iamVjdC5hc3NpZ24oe30sIEJBTExfU1RBUlRfTE9DQVRJT04pO1xuICAgICAgICAgICAgdGhpcy5iYWxsLnZlbCA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICAgICAgdGhpcy5iYWxsLmRpciA9IHsgeDogMCwgeTogMCB9O1xuICAgICAgICAgICAgdGhpcy5iYWxsLmluaXRpYWxGbGFnID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hlY2tGb3JXYWxsQ29sbGlzaW9ucygpIHtcbiAgICAgICAgY29uc3QgYWxsTW92aW5nT2JqID0gdGhpcy5hbGxDdXJNb3ZpbmdPYmpzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTW92aW5nT2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBhbGxNb3ZpbmdPYmpbaV07XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIFBsYXllcikgJiYgKG9iai5wb3MueCA8IDAgfHwgb2JqLnBvcy54ID4gKDkyMCAtIG9iai53aWR0aCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai53YWxsQ29sbGlzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIEJhbGwpICYmIChvYmoucG9zLnggPCAoMCArIG9iai5yYWRpdXMpIHx8IG9iai5wb3MueCA+ICg5MjAgLSBvYmoucmFkaXVzKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb3VuY2VTb3VuZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmoud2FsbENvbGxpc2lvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChvYmogaW5zdGFuY2VvZiBCYWxsKSAmJiAob2JqLnBvcy55IDwgKDAgKyBvYmoucmFkaXVzKSB8fCBvYmoucG9zLnkgPiAoNjAwIC0gb2JqLnJhZGl1cykpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqLnRvcFdhbGxDb2xsaXNpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgaXNPdmVyKCkge1xuICAgICAgICBpZiAodGhpcy5udW1CbG9ja3MgPT09IDAgfHwgdGhpcy5saXZlcyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzQ29sbGlkZWQob2JqMSwgb2JqMikge1xuICAgICAgICBsZXQgdGVtcDtcbiAgICAgICAgaWYgKG9iajEgaW5zdGFuY2VvZiBCYWxsKSB7XG4gICAgICAgICAgICB0ZW1wID0gb2JqMTtcbiAgICAgICAgICAgIG9iajEgPSBvYmoyO1xuICAgICAgICAgICAgb2JqMiA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGR4ID0gTWF0aC5hYnMob2JqMi5wb3MueCAtIG9iajEucG9zLnggLSBvYmoxLndpZHRoIC8gMik7XG4gICAgICAgIGxldCBkeSA9IE1hdGguYWJzKG9iajIucG9zLnkgLSBvYmoxLnBvcy55IC0gb2JqMS5oZWlnaHQgLyAyKTtcbiAgICAgICAgaWYgKGR4ID4gKG9iajEud2lkdGggLyAyICsgb2JqMi5yYWRpdXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChkeSA+IChvYmoxLmhlaWdodCAvIDIgKyBvYmoyLnJhZGl1cykpIHsgXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZHggPD0gKG9iajEud2lkdGggLyAyKSkgeyBcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGR5IDw9IChvYmoxLmhlaWdodCAvIDIpKSB7IFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7IFxuICAgICAgICB9O1xuICAgICAgICBsZXQgZFggPSBkeCAtIG9iajEud2lkdGggLyAyO1xuICAgICAgICBsZXQgZFkgPSBkeSAtIG9iajIud2lkdGggLyAyO1xuICAgICAgICByZXR1cm4gKGRYICogZFggKyBkWSAqIGRZIDw9IChvYmoyLnJhZGl1cyAqIG9iajIucmFkaXVzKSk7XG4gICAgfTtcblxuICAgIHJlbW92ZShvYmopIHtcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEJsb2NrKSB7XG4gICAgICAgICAgICB0aGlzLm51bUJsb2NrcyAtPSAxO1xuICAgICAgICAgICAgdGhpcy5ibG9ja3Muc3BsaWNlKHRoaXMuYmxvY2tzLmluZGV4T2Yob2JqKSwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHR5cGUgb2Ygb2JqZWN0XCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNoZWNrRm9yQ29sbGlzaW9ucygpIHtcbiAgICAgICAgY29uc3QgYWxsT2JqID0gdGhpcy5hbGxDdXJPYmplY3RzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsT2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBhbGxPYmoubGVuZ3RoOyBqICsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqMSA9IGFsbE9ialtpXTtcbiAgICAgICAgICAgICAgICBjb25zdCBvYmoyID0gYWxsT2JqW2pdO1xuICAgICAgICAgICAgICAgIGlmIChvYmoxIGluc3RhbmNlb2YgUGxheWVyICYmIG9iajIgaW5zdGFuY2VvZiBCYWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkZWQob2JqMSwgb2JqMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUJvdW5jZVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoxLmNvbGxpZGVzV2l0aChvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9iajEgaW5zdGFuY2VvZiBCYWxsICYmIG9iajIgaW5zdGFuY2VvZiBQbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsaWRlZChvYmoxLCBvYmoyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm91bmNlU291bmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iajEuY29sbGlkZXNXaXRoKG9iajIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqMSBpbnN0YW5jZW9mIEJhbGwgJiYgb2JqMiBpbnN0YW5jZW9mIEJsb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29sbGlkZWQob2JqMSwgb2JqMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVNvdW5kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoxLmNvbGxpZGVzV2l0aChvYmoyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKG9iajIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBwbGF5U291bmQoKSB7XG4gICAgICAgIGNvbnN0IGJhbGxTb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmxvY2tTb3VuZFwiKTtcbiAgICAgICAgYmFsbFNvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgYmFsbFNvdW5kLnBsYXkoKTtcbiAgICB9O1xuXG4gICAgcGxheUJvdW5jZVNvdW5kKCkge1xuICAgICAgICBjb25zdCBhbm90aGVyU291bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFub3RoZXJTb3VuZFwiKTtcbiAgICAgICAgYW5vdGhlclNvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgYW5vdGhlclNvdW5kLnBsYXkoKTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsIlxuY2xhc3MgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3MsIHZlbCwgcmFkaXVzKSB7XG4gICAgICAgIHRoaXMucG9zID0gcG9zO1xuICAgICAgICB0aGlzLnZlbCA9IHZlbDtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgfTtcblxuICAgIG1vdmUoZGVsdGFUaW1lKSB7XG4gICAgICAgIGxldCBuZXdEaXN0YW5jZVggPSB0aGlzLnZlbC54ICogZGVsdGFUaW1lO1xuICAgICAgICBsZXQgbmV3RGlzdGFuY2VZID0gdGhpcy52ZWwueSAqIGRlbHRhVGltZTtcbiAgICAgICAgdGhpcy5wb3MueCA9IHRoaXMucG9zLnggKyBuZXdEaXN0YW5jZVg7XG4gICAgICAgIHRoaXMucG9zLnkgPSB0aGlzLnBvcy55ICsgbmV3RGlzdGFuY2VZO1xuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb3ZpbmdPYmplY3Q7IiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL21vdmluZ19vYmplY3QnO1xuaW1wb3J0IEJhbGwgZnJvbSAnLi9iYWxsJztcbmNvbnN0IFBMQVlFUl9IRUlHSFQgPSAzMDtcbmNvbnN0IFBMQVlFUl9XSURUSCA9IDEyMDtcblxuY29uc3QgcmFuZG9tQ29sb3IgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlncyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRlwiO1xuICAgIGxldCBjb2xvciA9IFwiI1wiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGNvbG9yICs9IGRpZ3NbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDE2KSldO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG59O1xuXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvcykge1xuICAgICAgICBzdXBlcihwb3MsIHsgeDogMCwgeTogMCB9KVxuICAgICAgICB0aGlzLmNvbG9yID0gcmFuZG9tQ29sb3IoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IFBMQVlFUl9XSURUSDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBQTEFZRVJfSEVJR0hUO1xuICAgIH07XG5cbiAgICBzZXRLZXlJbnB1dHMoaW5wdXQsIGtleSkge1xuICAgICAgICB0aGlzLnZlbC54ICs9IGlucHV0WzBdO1xuICAgICAgICB0aGlzLnZlbC55ICs9IGlucHV0WzFdO1xuICAgIH07XG5cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9O1xuXG4gICAgY29sbGlkZXNXaXRoKG90aGVyT2JqKSB7XG4gICAgICAgIGlmIChvdGhlck9iaiBpbnN0YW5jZW9mIEJhbGwpIHtcbiAgICAgICAgICAgIG90aGVyT2JqLmJvdW5jZSgpOyBcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgd2FsbENvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy52ZWwueCA9IC10aGlzLnZlbC54O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vY2xhc3Nlcy9nYW1lXCI7XG5pbXBvcnQgR1ZpZXcgZnJvbSBcIi4vY2xhc3Nlcy9nX3ZpZXdcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGxldCBnaXRodWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdpdGh1YlwiKTtcbiAgICBnaXRodWIub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vbXdkZXNoYXcnO1xuICAgIH1cbiAgICBsZXQgbGlua2VkaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmtlZGluXCIpO1xuICAgIGxpbmtlZGluLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL21hdHRoZXctZGVzaGF3LWI2MjlhMGJhLyc7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWZhdWx0XCIpO1xuICAgIGNvbnN0IHBvd2VyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3dlci1idG5cIik7XG4gICAgcG93ZXJCdG4ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZGVmU2NyZWVuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYWN0aXZlXCIpO1xuICAgICAgICBjb25zdCBzdGFydFNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1zY3JlZW4nKTtcbiAgICAgICAgc3RhcnRTY3JlZW4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG5cbiAgICAgICAgY29uc3QgbGlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG93ZXItbHQnKTtcbiAgICAgICAgbGlnaHQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG5cbiAgICAgICAgY29uc3Qgc2NyZWVuVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnQtdGV4dFwiKTtcbiAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnN0cnVjdGlvbnNcIik7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udHJvbHMtbGlzdFwiKTtcblxuICAgICAgICBzY3JlZW5UZXh0LmNsYXNzTGlzdC5hZGQoXCJlbmRcIik7XG4gICAgICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1nYW1lXCIpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGF1ZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lYm95U291bmRcIik7XG4gICAgICAgICAgICBhdWRpby5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LmFkZChcImVuZFwiKTtcbiAgICAgICAgICAgIGNvbnRyb2xzTGlzdC5jbGFzc0xpc3QuYWRkKFwiZW5kXCIpO1xuICAgICAgICAgICAgc3RhcnRCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJhY3RpdmVcIik7XG4gICAgICAgIH0sIDMwMDApO1xuXG4gICAgICAgIHN0YXJ0QnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBzdGFydFNjcmVlbi5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kXCIpO1xuICAgICAgICAgICAgY29udHJvbHNMaXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICBzY3JlZW5UZXh0LmNsYXNzTGlzdC5yZW1vdmUoXCJlbmRcIik7XG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkXCIpO1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShjdHgpO1xuICAgICAgICAgICAgbmV3IEdWaWV3KGdhbWUpLnN0YXJ0KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGRlZlNjcmVlbi5jbGFzc0xpc3RbMF0gPT09IFwiYWN0aXZlXCIpIHtcbiAgICAgICAgICAgIHBvd2VyQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVmU2NyZWVuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgICAgIHN0YXJ0QnRuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgICAgIHN0YXJ0U2NyZWVuLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgICAgIHNjcmVlblRleHQuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgICAgICBjb250cm9sc0xpc3QuY2xhc3NMaXN0LnJlbW92ZShcImVuZFwiKTtcbiAgICAgICAgICAgICAgICBsaWdodC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=