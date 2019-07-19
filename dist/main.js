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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ \"./src/classes/moving_object.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/classes/player.js\");\n\n\n\nconst BALL_RADIUS = 20;\n\nconst randomColor = () => {\n    const digs = \"0123456789ABCDEF\";\n    let color = \"#\";\n    for (let i = 0; i < 3; i++) {\n        color += digs[Math.floor((Math.random() * 16))];\n    }\n    return color;\n};\n\nclass Ball extends _moving_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(pos) {\n        super(pos, { x: 0, y: 0 }, BALL_RADIUS);\n        this.color = randomColor();\n        this.dir = { x: 0, y: 0 }\n        this.spinSpeed = Math.random() * 60 + 30;\n        // this.player = player;\n    }\n\n    draw(ctx) {\n        let rotateDir = Math.atan(this.dir.y / this.dir.x);\n        ctx.save();\n        ctx.translate(this.pos.x, this.pos.y);\n        ctx.rotate(rotateDir);\n        ctx.translate(-this.pos.x, -this.pos.y)\n        ctx.fillStyle = this.color;\n        ctx.beginPath();\n        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);\n        ctx.fill();\n        ctx.restore();\n    };\n\n    collidesWith(otherObj) {\n        if (otherObj instanceof _player__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n            this.bounce();\n            return true;\n        } else {\n            return false;\n        }\n    };\n\n    wallCollision() {\n        this.dir.y = -this.dir.y;\n        this.vel.x = -this.vel.x;\n        this.vel.y = -this.vel.y;\n        return true;\n    }\n\n    bounce() {\n        if (this.dir.x !== 0 && this.dir.y !== 0) {\n            this.dir.x = -this.dir.x;\n            this.dir.y = -this.dir.y;\n            this.vel.y = -this.vel.y;\n            // this.vel.x = -this.vel.x;\n            console.log(this.dir, this.vel);\n        };\n    };\n\n    initialRotation() {\n        let rads = 90 * (Math.PI / 180); //assuming a 90 degree start\n        this.dir.x = Math.cos(rads);\n        this.dir.y = Math.sin(rads);\n    };\n\n    rotate(deltaTime) {\n        if (this.dir.y !== 0) {\n            let angle = -this.spinSpeed * (Math.PI / 180) * deltaTime;\n            let vector = [this.dir.x, this.dir.y];\n\n            var cos = Math.cos(angle);\n            var sin = Math.sin(angle);\n\n            this.dir.x = Math.round(10000 * (vector[0] * cos - vector[1] * sin)) / 10000;\n            this.dir.y = Math.round(10000 * (vector[0] * sin + vector[1] * cos)) / 10000;\n        }\n    }\n\n    handleBallRelease(input, key, bool) {\n        if (!bool && key !== \"space\") {\n            this.vel.x += input[0];\n            this.vel.y += input[1];\n        } else if (key === \"space\" && this.dir.x === 0 && this.dir.y === 0) {\n            this.vel.x += input[0];\n            this.vel.y += input[1];\n            this.initialRotation();\n        }\n    };\n\n    move(deltaTime) {\n        super.move(deltaTime);\n        this.rotate(deltaTime);\n    };\n\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ball);\n\n//# sourceURL=webpack:///./src/classes/ball.js?");

/***/ }),

/***/ "./src/classes/g_view.js":
/*!*******************************!*\
  !*** ./src/classes/g_view.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n\nclass GVIEW {\n    constructor(game){\n        this.game = game;\n        this.input = {\n            a: [-45, 0],\n            d: [45, 0],\n            space: [0, -45]\n        };\n        this.initialFlag = false;\n    }\n\n    keyHandler() {      \n        document.addEventListener(\"keydown\", event => {\n            this.handleKey(event, true);\n        });\n        document.addEventListener(\"keyup\", event => {\n            this.handleKey(event, false);\n        });\n    }\n\n    handleKey(event, down) {\n        let input = this.input;\n        if (!this.initialFlag) {\n            switch (event.keyCode) {\n                case 65:\n                    if (input.a !== down) {\n                        this.game.player.setKeyInputs(input.a, Object.keys(this.input)[0], this.initialFlag);\n                        this.game.balls[0].handleBallRelease(input.a, this.initialFlag)\n                    }\n                    break;\n                case 68:\n                    if (input.d !== down) {\n                        this.game.player.setKeyInputs(input.d, this.initialFlag);\n                        this.game.balls[0].handleBallRelease(input.d, Object.keys(this.input)[1], this.initialFlag)\n                    }\n                    break;\n                case 32:\n                    if (input.space !== down) {\n                        this.initialFlag = true;\n                        this.game.balls[0].handleBallRelease(input.space, Object.keys(this.input)[2], this.initialFlag)\n                    }\n                    break;\n                default:\n                    break;\n                }\n        } else {\n            switch (event.keyCode) {\n                case 65:\n                    if (input.a !== down) {\n                        this.game.player.setKeyInputs(input.a, Object.keys(this.input)[0], this.initialFlag);\n                    }\n                    break;\n                case 68:\n                    if (input.d !== down) {\n                        this.game.player.setKeyInputs(input.d, Object.keys(this.input)[1], this.initialFlag);\n                    }\n                    break;\n            }\n        }\n\n    }\n\n    start() {\n        this.keyHandler();\n        this.lastTime = new Date();\n        requestAnimationFrame(this.animate.bind(this))\n    }\n\n    animate() {\n        const deltaT = (new Date() - this.lastTime) / 1000;\n        this.game.singleMove(deltaT)\n        this.game.draw();\n        this.lastTime = new Date();\n        requestAnimationFrame(this.animate.bind(this))\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GVIEW);\n\n//# sourceURL=webpack:///./src/classes/g_view.js?");

/***/ }),

/***/ "./src/classes/game.js":
/*!*****************************!*\
  !*** ./src/classes/game.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/classes/player.js\");\n/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ball */ \"./src/classes/ball.js\");\n\n\n\nconst HEIGHT = 850;\nconst WIDTH = 1200;\nconst PLAYER_START_LOCATION = { x: 600, y: 800 }\nconst BALL_START_LOCATION = { x: 645, y: 700 }\nconst STARTING_BALLS = 3;\n\nclass Game {\n    constructor(ctx) {\n        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](PLAYER_START_LOCATION);\n        this.lives = this.player.lives;\n        this.ctx = ctx;\n        this.blocks = [];\n        this.balls = [];\n        this.height = HEIGHT;\n        this.width = WIDTH;\n        this.themeColor = [\"red\", \"blue\", \"green\"];\n\n        this.addBalls(STARTING_BALLS);\n    };   \n\n    addBalls(n) {\n        for (let i = 0; i < n; i++) {\n            this.balls.push(new _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"](BALL_START_LOCATION))\n        }\n        return this.balls;\n    }\n     \n    allCurObjects() {\n        return [].concat(this.player, this.balls[0], this.blocks);\n    };\n\n    allCurMovingObjs() {\n        return [].concat(this.player, this.balls[0]);\n    };\n \n    draw() {\n        this.ctx.clearRect(0, 0, this.width, this.height);\n        this.ctx.fillStyle = this.themeColor[1];\n        this.ctx.fillRect(0, 0, this.width, this.height);\n\n        this.allCurObjects().forEach(obj => {\n            obj.draw(this.ctx);\n        });\n    };\n\n    moveObjects(delta) {\n        const movingObj = this.allCurMovingObjs();\n        movingObj.forEach(obj => {\n            obj.move(delta);\n            if (obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"] && this.isOutOfBounds(obj.pos.y)) {\n                this.remove(obj);\n                this.player.deathAnimation(this.ctx);\n            };\n        });\n    };\n\n    singleMove(delta) {\n        this.moveObjects(delta);\n        this.checkForCollisions();\n        this.checkForWallCollisions();\n    };\n\n    isOutOfBounds(posY) {\n        if (posY > (850 - this.player.radius)) {\n            return true\n        } else {\n            return false;\n        };\n    };\n\n\n    remove(obj) {\n        if (obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n            if (this.balls.length === 0) {\n                return \"Game Over\"\n            } else {\n                this.balls.shift(); //returns the new balls array \n            }\n        } else {\n            throw new Error(\"Unknown Object, Please Address\")\n        };\n    };\n\n    checkForWallCollisions() { //all walls\n        const allMovingObj = this.allCurMovingObjs();\n        for (let i = 0; i < allMovingObj.length; i++) {\n            const obj = allMovingObj[i];\n            // if ((obj.pos.x > (1200 - obj.radius)) || (obj.pos.x < 0)) {\n            if ((obj instanceof _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) && (obj.pos.x < 0 || obj.pos.x > (1200 - obj.width))) {\n                return obj.wallCollision();\n            } else if ((obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) && (obj.pos.x < 0 || obj.pos.x > (1200 - obj.radius))) {\n                return obj.wallCollision();\n            }\n        };\n    };\n\n    distanceFormula(pos1, pos2) {\n        return Math.sqrt(Math.pow(pos1, 2) + Math.pow(pos2, 2));\n    }\n\n    isCollided(obj1, obj2) {\n        const dx = obj1.pos.x - obj2.pos.x;\n        const dy = obj1.pos.y - obj2.pos.y;\n        const dist = this.distanceFormula(dx, dy);\n        return dist < (obj1.radius + obj2.radius);\n    };\n\n    checkForCollisions() { //handles block-ball and ball-paddle\n        const allObj = this.allCurObjects();\n        for (let i = 0; i < allObj.length; i++) {\n            for (let j = i + 1; j < allObj.length; j ++) {\n                const obj1 = allObj[i];\n                const obj2 = allObj[j];\n                if (obj1 instanceof _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"] && obj2 instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n                    if (this.isCollided(obj1, obj2)) {\n                        obj1.collidesWith(obj2);\n                    };\n                } else if (obj1 instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"] && obj1 instanceof _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n                    if (this.isCollided(obj1, obj2)) {\n                        obj1.collidesWith(obj2);\n                    };\n                }\n            }\n        }\n    }\n                    \n\n\n    // objToObjCollision(otherObj) {\n    //     const dist = this.distanceFormula(dx, dy);\n    //     return dist < (this.radius);\n\n\n\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/classes/game.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ \"./src/classes/moving_object.js\");\n/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ball */ \"./src/classes/ball.js\");\n\n\nconst STARTING_LIVES = 3;\nconst PLAYER_SPEED = 150;\n// const PLAYER_RADIUS = 30;\n// const PLAYER_RADIUS = 30;\nconst PLAYER_HEIGHT = 30;\nconst PLAYER_WIDTH = 90;\n\nconst randomColor = () => {\n    const digs = \"0123456789ABCDEF\";\n    let color = \"#\";\n    for (let i = 0; i < 3; i++) {\n        color += digs[Math.floor((Math.random() * 16))];\n    }\n    return color;\n};\n\nclass Player extends _moving_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(pos, lives = STARTING_LIVES) {\n        super(pos, { x: 0, y: 0 })\n        this.lives = lives;\n        this.color = randomColor();\n        // this.radius = Math.floor(Math.sqrt((Math.pow(PLAYER_RADIUS, 2)) + (Math.pow(PLAYER_RADIUS * 3, 2))) / 2);\n        this.width = PLAYER_WIDTH;\n        this.height = PLAYER_HEIGHT;\n    };\n\n    setKeyInputs(input, key, bool) {\n            this.vel.x += input[0];\n            this.vel.y += input[1];\n    };\n\n    draw(ctx) {\n        const rad = PLAYER_RADIUS;\n        ctx.save();\n        ctx.fillStyle = this.color;\n        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);\n        ctx.restore();\n    };\n\n    collidesWith(otherObj) {\n        if (otherObj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n            otherObj.bounce(); \n        };\n    };\n\n    wallCollision() {\n        this.vel.x = -this.vel.x;\n        return true;\n    };\n\n    deathAnimation(ctx) {\n        //likely will have image here later for death...\n        this.lives -= 1;\n        if (this.lives === 0) {\n            return \"Game Over!\"\n        } else {\n            this.color = randomColor();\n            this.radius = Math.floor(Math.sqrt((Math.pow(PLAYER_RADIUS, 2)) + (Math.pow(PLAYER_RADIUS * 3, 2))) / 2);\n        }\n    };\n\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n\n//# sourceURL=webpack:///./src/classes/player.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/game */ \"./src/classes/game.js\");\n/* harmony import */ var _classes_g_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/g_view */ \"./src/classes/g_view.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const canvas = document.getElementById(\"board\");\n    const ctx = canvas.getContext(\"2d\");\n    const game = new _classes_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx);\n    new _classes_g_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"](game).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });