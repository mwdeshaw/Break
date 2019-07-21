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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ \"./src/classes/moving_object.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/classes/player.js\");\n/* harmony import */ var _blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks */ \"./src/classes/blocks.js\");\n\n\n\n\nconst BALL_RADIUS = 20;\n\nconst randomColor = () => {\n    const digs = \"0123456789ABCDEF\";\n    let color = \"#\";\n    for (let i = 0; i < 3; i++) {\n        color += digs[Math.floor((Math.random() * 16))];\n    }\n    return color;\n};\n\nclass Ball extends _moving_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(pos) {\n        super(pos, { x: 0, y: 0 }, BALL_RADIUS);\n        this.color = randomColor();\n        this.dir = { x: 0, y: 0 }\n        this.spinSpeed = Math.random() * 60 + 30;\n        this.initialFlag = false;\n    }\n\n    draw(ctx) {\n        let rotateDir = Math.atan(this.dir.y / this.dir.x);\n        ctx.save();\n        ctx.translate(this.pos.x, this.pos.y);\n        ctx.rotate(rotateDir);\n        ctx.translate(-this.pos.x, -this.pos.y)\n        ctx.fillStyle = this.color;\n        ctx.beginPath();\n        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);\n        ctx.fill();\n        ctx.restore();\n    };\n\n    collidesWith(otherObj) {\n        if (otherObj instanceof _player__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n            this.bounce();\n            return true;\n        } else if (otherObj instanceof _blocks__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n            this.bounce();\n            return true;\n        } else {\n            return false;\n        };\n    };\n\n    wallCollision() {\n        // this.dir.y = -this.dir.y;\n        this.vel.x = -this.vel.x;\n        // this.vel.y = -this.vel.y;\n        return true;\n    }\n\n    topWallCollision() {\n        this.vel.y = -this.vel.y;\n        return true;\n    }\n\n    bounce() {\n        if (this.dir.x !== 0 && this.dir.y !== 0) {\n            this.dir.x = -this.dir.x;\n            this.dir.y = -this.dir.y;\n            this.vel.y = -this.vel.y;\n            // this.vel.x = -this.vel.x;\n        };\n    };\n\n    initialRotation() {\n        let rads = 90 * (Math.PI / 180); //assuming a 90 degree start\n        this.dir.x = Math.cos(rads);\n        this.dir.y = Math.sin(rads);\n    };\n\n    rotate(deltaTime) {\n        if (this.dir.y !== 0) {\n            let angle = -this.spinSpeed * (Math.PI / 180) * deltaTime;\n            let vector = [this.dir.x, this.dir.y];\n\n            var cos = Math.cos(angle);\n            var sin = Math.sin(angle);\n\n            this.dir.x = Math.round(10000 * (vector[0] * cos - vector[1] * sin)) / 10000;\n            this.dir.y = Math.round(10000 * (vector[0] * sin + vector[1] * cos)) / 10000;\n        }\n    }\n\n    handleBallRelease(input, key, bool) {\n        if (!this.initialFlag && key !== \"space\") {\n            this.vel.x += input[0];\n            this.vel.y += input[1];\n        } else if (key === \"space\" && this.dir.x === 0 && this.dir.y === 0) {\n            this.vel.x += input[0];\n            this.vel.y += input[1];\n            this.initialRotation();\n        }\n    };\n\n    move(deltaTime) {\n        super.move(deltaTime);\n        this.rotate(deltaTime);\n    };\n\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ball);\n\n//# sourceURL=webpack:///./src/classes/ball.js?");

/***/ }),

/***/ "./src/classes/blocks.js":
/*!*******************************!*\
  !*** ./src/classes/blocks.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ball */ \"./src/classes/ball.js\");\n\n\nconst randomColor = () => {\n    const digs = \"0123456789ABCDEF\";\n    let color = \"#\";\n    for (let i = 0; i < 3; i++) {\n        color += digs[Math.floor((Math.random() * 16))];\n    }\n    return color;\n};\n\nconst powerUps = [\"multiball\", \"invinciball\", \"bomb\", \"wreckingBall\", \"longerBat\", \"tinyBat\"]; //\nconst blockTypes = [\"regular\", \"brick\", \"concrete\"];\nclass Block {\n    constructor(pos, width, height, type, powerUp) {\n        this.pos = pos;\n        this.width = width;\n        this.height = height;\n        this.color = randomColor();\n        this.type = type;\n        this.powerUp = powerUp;\n    }\n\n    draw(ctx) {\n        ctx.save();\n        ctx.fillStyle = this.color;\n        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);\n        ctx.restore();\n    };\n\n    collidesWith(otherObj) {\n        if (otherObj instanceof _ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n            otherObj.bounce();\n        };\n    };\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Block);\n\n//# sourceURL=webpack:///./src/classes/blocks.js?");

/***/ }),

/***/ "./src/classes/g_view.js":
/*!*******************************!*\
  !*** ./src/classes/g_view.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n\nclass GVIEW {\n    constructor(game){\n        this.game = game;\n        this.input = {\n            a: [-45, 0],\n            d: [45, 0],\n            space: [0, -100]\n        };\n    };\n\n    keyHandler() {   \n        // const aButton = document.getElementById(\"a-btn\");\n        document.addEventListener(\"keydown\", event => {\n            this.handleKey(event, true);\n        });\n        document.addEventListener(\"keyup\", event => {\n            this.handleKey(event, false);\n        });\n    };\n\n    // senseGameOver() {\n    //     document.addEventListener(\"keydown\", event => {\n    //         this.gameOver(event, true);\n    //     });\n    // };\n\n    handleKey(event, down) {\n        // const aButton = document.getElementById(\"a-btn\");\n        // const dButton = document.getElementById(\"d-btn\");\n        // const spButton = document.getElementById(\"sp-btn\");\n        let input = this.input;\n        if (!this.game.ball.initialFlag) {\n            switch (event.keyCode) {\n                case 65:\n                    if (input.a !== down) {\n                        // aButton.setAttribute(\"class\", \"active\");\n                        this.game.player.setKeyInputs(input.a, Object.keys(this.input)[0]);\n                        this.game.ball.handleBallRelease(input.a, Object.keys(this.input)[0]);\n                    }\n                    break;\n                case 68:\n                    if (input.d !== down) {\n                        // dButton.setAttribute(\"class\", \"active\");\n                        this.game.player.setKeyInputs(input.d, Object.keys(this.input)[0]);\n                        this.game.ball.handleBallRelease(input.d, Object.keys(this.input)[1]);\n                    }\n                    break;\n                case 32:\n                    if (input.space !== down) {\n                        // spButton.setAttribute(\"class\", \"active\");\n                        this.game.ball.initialFlag = true;\n                        this.game.ball.handleBallRelease(input.space, Object.keys(this.input)[2]);\n                    }\n                    break;\n                default:\n                    break;\n                }\n        } else {\n            switch (event.keyCode) {\n                case 65:\n                    if (input.a !== down) {\n                        // dButton.setAttribute(\"class\", \"active\");\n                        this.game.player.setKeyInputs(input.a, Object.keys(this.input)[0]);\n                    }\n                    break;\n                case 68:\n                    if (input.d !== down) {\n                        // dButton.setAttribute(\"class\", \"active\");\n                        this.game.player.setKeyInputs(input.d, Object.keys(this.input)[1]);\n                    }\n                    break;\n                default:\n                    break;\n            };     \n        };\n    };\n\n    start() {\n        this.keyHandler();\n        this.lastTime = new Date();\n        requestAnimationFrame(this.animate.bind(this));\n    };\n\n    animate() {\n        if (!this.game.isOver()) {\n            const deltaT = (new Date() - this.lastTime) / 1000;\n            this.game.singleMove(deltaT)\n            this.game.draw();\n            this.lastTime = new Date();\n            requestAnimationFrame(this.animate.bind(this))\n        } else {\n            this.game.ctx.clearRect(0, 0, this.game.width, this.game.height);\n            const endScreen = document.querySelector(\".end-screen\");\n            endScreen.classList.add(\"end\");\n        }\n    };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GVIEW);\n\n//# sourceURL=webpack:///./src/classes/g_view.js?");

/***/ }),

/***/ "./src/classes/game.js":
/*!*****************************!*\
  !*** ./src/classes/game.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/classes/player.js\");\n/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ball */ \"./src/classes/ball.js\");\n/* harmony import */ var _blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks */ \"./src/classes/blocks.js\");\n\n\n\n\nconst HEIGHT = 600;\nconst WIDTH = 920;\nconst PLAYER_START_LOCATION = { x: 400, y: 540 }\nconst BALL_START_LOCATION = { x: 445, y: 500 }\nconst STARTING_LIVES = 3;\nconst BLOCK_HEIGHT = 50;\nconst BLOCK_WIDTH = 50;\nconst BLOCKS_NUM = 72;\n\nclass Game {\n    constructor(ctx) {\n        this.lives = STARTING_LIVES;\n        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](Object.assign({}, PLAYER_START_LOCATION));\n        this.ctx = ctx;\n        this.blocks = [];\n        this.ball = new _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"](Object.assign({}, BALL_START_LOCATION));\n        this.height = HEIGHT;\n        this.width = WIDTH;\n        this.themeColor = [\"#bdae57\", \"#a7a7a7\", \"blue\", \"green\"];\n        this.numBlocks = BLOCKS_NUM;\n        this.addBlocks(this.numBlocks);\n    };   \n     \n    addBlocks(n) {\n        let blockPosX = 10;\n        let blockPosY = 10;\n        let i = 0;\n        while (i < n) {\n            if (!this.blocks.length) {\n                this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT));\n                i += 1;\n            } \n\n            blockPosX += BLOCK_WIDTH;\n            if (blockPosX > 890) {\n                blockPosX = 10;\n                blockPosY = blockPosY += BLOCK_HEIGHT;\n            }\n            this.blocks.push(new _blocks__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ x: blockPosX, y: blockPosY }, BLOCK_WIDTH, BLOCK_HEIGHT));\n            i += 1;\n        };\n        return this.blocks;\n    };\n     \n    allCurObjects() {\n        return [].concat([this.player], [this.ball], this.blocks);\n    };\n\n    allCurMovingObjs() {\n        return [].concat([this.player], [this.ball]);\n    };\n \n    draw() {\n        this.ctx.clearRect(0, 0, this.width, this.height);\n        this.ctx.fillStyle = this.themeColor[0];\n        this.ctx.fillRect(0, 0, this.width, this.height);\n\n        this.allCurObjects().forEach(obj => {\n            obj.draw(this.ctx);\n        });\n    };\n\n    moveObjects(delta) {\n        const movingObj = this.allCurMovingObjs();\n        movingObj.forEach(obj => {\n            obj.move(delta);\n            if (obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"] && this.isOutOfBounds(obj.pos.y)) {\n                this.deathAnimation();\n            };\n        });\n    };\n\n    singleMove(delta) {\n        this.moveObjects(delta);\n        this.checkForCollisions();\n        this.checkForWallCollisions();\n    };\n\n    isOutOfBounds(posY) {\n        if (posY > (560)) { //player height never changing\n            return true\n        } else {\n            return false;\n        };\n    };\n\n    deathAnimation() {\n        this.lives -= 1;\n        if (this.lives === 0) {\n            return \"Game Over!\"\n        } else {     \n            this.player.pos = Object.assign({}, PLAYER_START_LOCATION);\n            this.player.vel = { x: 0, y: 0 };\n            this.ball.pos = Object.assign({}, BALL_START_LOCATION);\n            this.ball.vel = { x: 0, y: 0 };\n            this.ball.dir = { x: 0, y: 0 };\n            this.ball.initialFlag = false;\n        }\n    };\n\n    checkForWallCollisions() { //all walls\n        const allMovingObj = this.allCurMovingObjs();\n        for (let i = 0; i < allMovingObj.length; i++) {\n            const obj = allMovingObj[i];\n            if ((obj instanceof _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) && (obj.pos.x < 0 || obj.pos.x > (920 - obj.width))) {\n                return obj.wallCollision();\n            }\n            if ((obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) && (obj.pos.x < (0 + obj.radius) || obj.pos.x > (920 - obj.radius))) {\n                return obj.wallCollision();\n            }\n            if ((obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) && (obj.pos.y < (0 + obj.radius) || obj.pos.y > (600 - obj.radius))) {\n                return obj.topWallCollision();\n            }\n        };\n    };\n\n    isOver() {\n        if (this.numBlocks === 0 || this.lives === 0) {\n            console.log(this.numBlocks);\n            console.log(this.lives);\n            return true;\n        }\n        return false;\n    }\n\n    isCollided(obj1, obj2) {\n        let temp;\n        if (obj1 instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n            temp = obj1;\n            obj1 = obj2;\n            obj2 = temp;\n        }\n        let dx = Math.abs(obj2.pos.x - obj1.pos.x - obj1.width / 2);\n        let dy = Math.abs(obj2.pos.y - obj1.pos.y - obj1.height / 2);\n        if (dx > (obj1.width / 2 + obj2.radius)) {\n            return false;\n        };\n        if (dy > (obj1.height / 2 + obj2.radius)) { \n            return false; \n        };\n        if (dx <= (obj1.width / 2)) { \n            return true; \n        };\n        if (dy <= (obj1.height / 2)) { \n            return true; \n        };\n        let dX = dx - obj1.width / 2;\n        let dY = dy - obj2.width / 2;\n        return (dX * dX + dY * dY <= (obj2.radius * obj2.radius));\n    };\n\n    remove(obj) {\n        if (obj instanceof _blocks__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n            this.numBlocks -= 1;\n            this.blocks.splice(this.blocks.indexOf(obj), 1);\n        } else {\n            throw new Error(\"unknown type of object\");\n        };\n    }\n\n    checkForCollisions() {\n        const allObj = this.allCurObjects();\n        for (let i = 0; i < allObj.length; i++) {\n            for (let j = i + 1; j < allObj.length; j ++) {\n                const obj1 = allObj[i];\n                const obj2 = allObj[j];\n                if (obj1 instanceof _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"] && obj2 instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) { //order basically ensures this\n                    if (this.isCollided(obj1, obj2)) {\n                        obj1.collidesWith(obj2);\n                    };\n                } else if (obj1 instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"] && obj2 instanceof _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n                    if (this.isCollided(obj1, obj2)) {\n                        obj1.collidesWith(obj2);\n                    };\n                } else if (obj1 instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"] && obj2 instanceof _blocks__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n                    if (this.isCollided(obj1, obj2)) {\n                        obj1.collidesWith(obj2);\n                        this.remove(obj2);\n                    };\n                };\n            };\n        };\n    };\n\n    // checkForVictory() {\n    //     if (!this.blocks.length) {\n    //         return true;\n    //     }\n    // }\n\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/classes/game.js?");

/***/ }),

/***/ "./src/classes/moving_object.js":
/*!**************************************!*\
  !*** ./src/classes/moving_object.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass MovingObject {\n    constructor(pos, vel, radius) {\n        this.pos = pos;\n        this.vel = vel;\n        this.radius = radius;\n    };\n\n    move(deltaTime) {\n        let newDistanceX = this.vel.x * deltaTime;\n        let newDistanceY = this.vel.y * deltaTime;\n        this.pos.x = this.pos.x + newDistanceX;\n        this.pos.y = this.pos.y + newDistanceY;\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MovingObject);\n\n//# sourceURL=webpack:///./src/classes/moving_object.js?");

/***/ }),

/***/ "./src/classes/player.js":
/*!*******************************!*\
  !*** ./src/classes/player.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ \"./src/classes/moving_object.js\");\n/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ball */ \"./src/classes/ball.js\");\n\n\nconst PLAYER_SPEED = 150;\nconst PLAYER_HEIGHT = 30;\nconst PLAYER_WIDTH = 90;\n\nconst randomColor = () => {\n    const digs = \"0123456789ABCDEF\";\n    let color = \"#\";\n    for (let i = 0; i < 3; i++) {\n        color += digs[Math.floor((Math.random() * 16))];\n    }\n    return color;\n};\n\nclass Player extends _moving_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(pos) {\n        super(pos, { x: 0, y: 0 })\n        // this.lives = lives;\n        this.color = randomColor();\n        this.width = PLAYER_WIDTH;\n        this.height = PLAYER_HEIGHT;\n    };\n\n    setKeyInputs(input, key) {\n            this.vel.x += input[0];\n            this.vel.y += input[1];\n    };\n\n    draw(ctx) {\n        ctx.save();\n        ctx.fillStyle = this.color;\n        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);\n        ctx.restore();\n    };\n\n    collidesWith(otherObj) {\n        if (otherObj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n            otherObj.bounce(); \n        };\n    };\n\n    wallCollision() {\n        this.vel.x = -this.vel.x;\n        return true;\n    };\n\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n\n//# sourceURL=webpack:///./src/classes/player.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/game */ \"./src/classes/game.js\");\n/* harmony import */ var _classes_g_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/g_view */ \"./src/classes/g_view.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    let github = document.getElementById(\"github\");\n    github.addEventListener(\"click\", () => {\n        document.location.href = 'https://github.com/mwdeshaw';\n    });\n    let linkedin = document.getElementById(\"linkedin\");\n    linkedin.addEventListener(\"click\", () => {\n        document.location.href = 'https://www.linkedin.com/in/matthew-deshaw-b629a0ba/';\n    });\n\n\n    const defScreen = document.getElementById(\"default\");\n    const powerBtn = document.getElementById(\"power-btn\");\n    powerBtn.onclick = () => {\n        defScreen.setAttribute(\"class\", \"active\");\n        const startScreen = document.getElementById('start-screen');\n        startScreen.setAttribute(\"class\", \"active\");\n\n        const light = document.getElementById('power-lt');\n        light.setAttribute(\"class\", \"active\");\n\n        const screenText = document.querySelector(\".start-text\");\n        const instructions = document.querySelector(\".instructions\");\n        const controlsList = document.querySelector(\".controls-list\");\n\n        screenText.classList.add(\"end\");\n        const startBtn = document.getElementById(\"start-game\");\n        setTimeout(() => {\n            const audio = document.querySelector(`audio`);\n            audio.currentTime = 0;\n            audio.play();\n            instructions.classList.add(\"end\");\n            controlsList.classList.add(\"end\");\n            startBtn.setAttribute(\"class\", \"active\");\n        }, 3000);\n\n        startBtn.onclick = () => {\n            startScreen.removeAttribute(\"class\");\n            instructions.classList.remove(\"end\");\n            controlsList.classList.remove(\"end\");\n            screenText.classList.remove(\"end\");\n            const canvas = document.getElementById(\"board\");\n            const ctx = canvas.getContext(\"2d\");\n            const game = new _classes_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx);\n            new _classes_g_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"](game).start();\n        };\n\n        if (defScreen.classList[0] === \"active\") {\n            powerBtn.onclick = () => {\n                defScreen.removeAttribute(\"class\");\n                startBtn.removeAttribute(\"class\");\n                startScreen.removeAttribute(\"class\");\n                screenText.classList.remove(\"end\");\n                instructions.classList.remove(\"end\");\n                controlsList.classList.remove(\"end\");\n                light.removeAttribute(\"class\");\n            };\n        };\n    };\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });