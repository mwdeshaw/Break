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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ \"./src/classes/moving_object.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/classes/player.js\");\n\n\n\nconst BALL_RADIUS = 20;\n\nconst randomColor = () => {\n    const digs = \"0123456789ABCDEF\";\n    let color = \"#\";\n    for (let i = 0; i < 3; i++) {\n        color += digs[Math.floor((Math.random() * 16))];\n    }\n    return color;\n};\n\nclass Ball extends _moving_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(pos) {\n        super(pos, { x: 0, y: 0 }, BALL_RADIUS);\n        this.color = randomColor();\n        this.dir = { x: 0, y: 0 }\n        this.spinSpeed = Math.random() * 60 + 30;\n    }\n\n    //check to see if it can be kept simple\n    draw(ctx) {\n        let rotateDir = Math.atan(this.dir.y / this.dir.x);\n        ctx.save();\n        ctx.translate(this.pos.x, this.pos.y);\n        ctx.rotate(rotateDir);\n        ctx.translate(-this.pos.x, -this.pos.y)\n        ctx.fillStyle = this.color;\n        ctx.beginPath();\n        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);\n        ctx.fill();\n        ctx.restore();\n    };\n\n    collidesWith(otherObj) {\n        if (otherObj instanceof _player__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n            this.bounce();\n            return true;\n        } else {\n            return false;\n        }\n    };\n\n    wallCollision() {\n        this.bounce();\n        return true;\n    }\n\n    bounce() {\n        // debugger\n        this.dir.y = -this.dir.y; //this should change the rotation dir\n        this.vel.x = -this.vel.x;\n        this.vel.y = -this.vel.y;\n        console.log(this.vel);\n    };\n\n    initialRotation() {\n        let rads = 90 * (Math.PI / 180); //assuming a 90 degree start\n        this.dir.x = Math.cos(rads);\n        this.dir.y = Math.sin(rads);\n    };\n\n    rotate(deltaTime) {\n        if (this.dir.y !== 0) {\n            let angle = -this.spinSpeed * (Math.PI / 180) * deltaTime;\n            let vector = [this.dir.x, this.dir.y];\n\n            var cos = Math.cos(angle);\n            var sin = Math.sin(angle);\n\n            this.dir.x = Math.round(10000 * (vector[0] * cos - vector[1] * sin)) / 10000;\n            this.dir.y = Math.round(10000 * (vector[0] * sin + vector[1] * cos)) / 10000;\n        }\n    }\n\n    handleBallRelease(input, key) {\n        if ((key !== \"space\") && (this.dir.y === 0)) {\n            this.vel.x += input[0];\n            this.vel.y += input[1];\n        } else if ((key === \"space\") && (this.dir.y === 0)) {\n            this.vel.x += input[0];\n            this.vel.y += input[1];\n            this.initialRotation();\n        }\n    };\n\n    move(deltaTime) {\n        super.move(deltaTime);\n        this.rotate(deltaTime);\n    };\n\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ball);\n\n//# sourceURL=webpack:///./src/classes/ball.js?");

/***/ }),

/***/ "./src/classes/g_view.js":
/*!*******************************!*\
  !*** ./src/classes/g_view.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n\nclass GVIEW {\n    constructor(game){\n        this.game = game;\n        this.input = {\n            a: [-30, 0],\n            d: [30, 0],\n            space: [0, -45]\n        };\n    }\n\n    keyHandler() {      \n        document.addEventListener(\"keydown\", event => {\n            this.handleKey(event, true);\n        });\n        document.addEventListener(\"keyup\", event => {\n            this.handleKey(event, false);\n        });\n    }\n\n    handleKey(event, down) {\n        let input = this.input;\n\n        switch (event.keyCode) {\n            case 65:\n                if (input.a !== down) {\n                    this.game.player.setKeyInputs(input.a, Object.keys(input)[0]);\n                    this.game.balls[0].handleBallRelease(input.a, Object.keys(input)[0])\n                }\n                break;\n            case 68:\n                if (input.d !== down) {\n                    this.game.player.setKeyInputs(input.d, Object.keys(input)[1]);\n                    this.game.balls[0].handleBallRelease(input.d, Object.keys(input)[1])\n                }\n                break;\n            case 32:\n                if (input.space !== down) {\n                    this.game.balls[0].handleBallRelease(input.space, Object.keys(input)[2])\n                }\n                break;\n            default:\n                break;\n        }\n        // this.input = input;\n    }\n\n    start() {\n        this.keyHandler();\n        this.lastTime = new Date();\n        requestAnimationFrame(this.animate.bind(this))\n    }\n\n    animate() {\n        const deltaT = (new Date() - this.lastTime) / 1000;\n        this.game.singleMove(deltaT)\n        this.game.draw();\n        this.lastTime = new Date();\n        requestAnimationFrame(this.animate.bind(this))\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GVIEW);\n\n//# sourceURL=webpack:///./src/classes/g_view.js?");

/***/ }),

/***/ "./src/classes/game.js":
/*!*****************************!*\
  !*** ./src/classes/game.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/classes/player.js\");\n/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ball */ \"./src/classes/ball.js\");\n\n\n\nconst HEIGHT = 850;\nconst WIDTH = 1200;\nconst PLAYER_START_LOCATION = { x: 600, y: 800 }\nconst BALL_START_LOCATION = { x: 645, y: 778 }\nconst STARTING_BALLS = 3;\n\nclass Game {\n    constructor(ctx) {\n        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](PLAYER_START_LOCATION);\n        this.lives = this.player.lives;\n        this.ctx = ctx;\n        this.blocks = [];\n        this.height = HEIGHT;\n        this.width = WIDTH;\n        this.themeColor = [\"red\", \"blue\", \"green\"];     //add a function to pick a theme color based on user input, or simply randomize it\n        this.balls = [];\n\n        this.addBalls(STARTING_BALLS);\n    };   \n\n    addBalls(n) {\n        for (let i = 0; i < n; i++) {\n            this.balls.push(new _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"](BALL_START_LOCATION))\n        }\n    }\n     \n    allCurObjects() {\n        return [].concat(this.player, this.balls[0], this.blocks);\n    };\n\n    // allObjects() {\n    //     return [].concat(this.player, this.blocks, this.balls);\n    // };\n\n    allCurMovingObjs() {\n        return [].concat(this.player, this.balls[0]);\n    };\n\n    // allMovingObj() {\n    //     return [].concat(this.player, this.balls);\n    // };\n\n    draw() {\n        this.ctx.clearRect(0, 0, this.width, this.height);\n        this.ctx.fillStyle = this.themeColor[1];\n        this.ctx.fillRect(0, 0, this.width, this.height);\n\n        this.allCurObjects().forEach(obj => {\n            obj.draw(this.ctx);\n        });\n    };\n\n    moveObjects(delta) {\n        const movingObj = this.allCurMovingObjs();\n        movingObj.forEach(obj => {\n            obj.move(delta);\n            if (obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"] && this.isOutOfBounds(obj.pos.y)) {\n                this.remove(obj);\n                this.player.deathAnimation(this.ctx);\n            };\n        });\n    };\n\n    singleMove(delta) {\n        this.moveObjects(delta);\n        this.checkForCollisions();\n        this.checkForWallCollisions();\n    };\n\n    isOutOfBounds(posY) {\n        if (posY > (850 - this.player.radius)) {\n            return true\n        } else {\n            return false;\n        };\n    };\n\n\n    remove(obj) {\n        if (obj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n            if (this.balls.length === 0) {\n                return \"Game Over\"\n            } else {\n                this.balls.shift(); //returns the new balls array \n            }\n        } else {\n            throw new Error(\"Unknown Object, Please Address\")\n        };\n    };\n\n    checkForWallCollisions() { //all walls\n        const allMovingObj = this.allCurMovingObjs();\n        for (let i = 0; i < allMovingObj.length; i++) {\n            const obj = allMovingObj[i];\n            if ((obj.pos.x > (1200 - obj.radius)) || (obj.pos.x < 0)) {\n                return obj.wallCollision();\n            };\n        };\n    };\n\n    checkForCollisions() { //handles block-ball and ball-paddle\n        const allObj = this.allCurObjects();\n        for (let i = 0; i < allObj.length; i++) {\n            for (let j = i + 1; j < allObj.length; j ++) {\n                const obj1 = allObj[i];\n                const obj2 = allObj[j];\n                if (obj1.objToObjCollision(obj2)) {\n                    return obj1.collidesWith(obj2);\n                };\n            };\n        };\n    };\n\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/classes/game.js?");

/***/ }),

/***/ "./src/classes/moving_object.js":
/*!**************************************!*\
  !*** ./src/classes/moving_object.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass MovingObject {\n    constructor(pos, vel, radius) {\n        this.pos = pos;\n        this.vel = vel;\n        this.radius = radius;\n    };\n\n    move(deltaTime) {\n        let newDistanceX = this.vel.x * deltaTime;\n        let newDistanceY = this.vel.y * deltaTime;\n        this.pos.x = this.pos.x + newDistanceX;\n        this.pos.y = this.pos.y + newDistanceY;\n        console.log(this.pos.x);\n        console.log(this.pos.y);\n    }\n\n    distanceFormula(pos1, pos2) {\n        return Math.sqrt(Math.pow(pos1, 2) + Math.pow(pos2, 2));\n    };\n    // distanceFormula(pos1, pos2) {\n    //     return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));\n    // };\n\n    objToObjCollision(otherObj) {\n           const dx =  this.pos.x - otherObj.pos.x;\n           const dy = this.pos.y - otherObj.pos.y;\n           const dist = this.distanceFormula(dx, dy);\n           return dist < (this.radius + otherObj.radius);\n        //    const angleTo = (this.angle + math.atan2(dx, dy) / 3.1415 * 180.0) % 360 d\n    };\n        \n//     }\n//     if((angle_to > 135 and angle_to < 225) or(angle_to > 0 and angle_to < 45) or(angle_to > 315 and angle_to < 360)):\n// if distance <= circle.rad / 2. + ((rect.height / 2.0) * (1. + 0.5 * abs(math.sin(angle_to * math.pi / 180.)))):\n//     return True\n// else:\n// if distance <= circle.rad / 2. + ((rect.width / 2.0) * (1. + 0.5 * abs(math.cos(angle_to * math.pi / 180.)))):\n//     return True\n// return False\n\n\n    // isCollidedWith(otherObj) {\n    //     //you need to use a different algo for this guy \n    //     const centerDist = this.distanceFormula(this.pos, otherObj.pos);\n    //     return centerDist < (this.radius + otherObj.radius);\n    // };\n\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MovingObject);\n\n//# sourceURL=webpack:///./src/classes/moving_object.js?");

/***/ }),

/***/ "./src/classes/player.js":
/*!*******************************!*\
  !*** ./src/classes/player.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ \"./src/classes/moving_object.js\");\n/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ball */ \"./src/classes/ball.js\");\n\n\nconst STARTING_LIVES = 3;\n// const PLAYER_SPEED = 150;\nconst PLAYER_RADIUS = 30;\n\nconst randomColor = () => {\n    const digs = \"0123456789ABCDEF\";\n    let color = \"#\";\n    for (let i = 0; i < 3; i++) {\n        color += digs[Math.floor((Math.random() * 16))];\n    }\n    return color;\n};\n\nclass Player extends _moving_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(pos, lives = STARTING_LIVES) {\n        super(pos, { x: 0, y: 0 })\n        this.lives = lives;\n        this.color = randomColor();\n        this.radius = Math.floor(Math.sqrt((Math.pow(PLAYER_RADIUS, 2)) + (Math.pow(PLAYER_RADIUS * 3, 2))) / 2);\n    };\n\n    setKeyInputs(input, key) {\n        this.vel.x += input[0];\n        this.vel.y += input[1];\n    };\n\n    draw(ctx) {\n        const rad = PLAYER_RADIUS;\n        ctx.save();\n        ctx.fillStyle = this.color;\n        ctx.fillRect(this.pos.x, this.pos.y, rad * 3, rad);\n        ctx.restore();\n    };\n\n    collidesWith(otherObj) {\n        if (otherObj instanceof _ball__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n            otherObj.bounce(); \n        };\n    };\n\n    wallCollision() {\n        this.vel.x = -this.vel.x;\n        return true;\n    };\n\n    deathAnimation(ctx) {\n        //likely will have image here later for death...\n        this.lives -= 1;\n        if (this.lives === 0) {\n            return \"Game Over!\"\n        } else {\n            this.color = randomColor();\n            this.radius = Math.floor(Math.sqrt((Math.pow(PLAYER_RADIUS, 2)) + (Math.pow(PLAYER_RADIUS * 3, 2))) / 2);\n        }\n    };\n\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n\n//# sourceURL=webpack:///./src/classes/player.js?");

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