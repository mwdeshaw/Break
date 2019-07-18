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

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./src/classes/g_view.js":
/*!*******************************!*\
  !*** ./src/classes/g_view.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GVIEW {\n    constructor(game){\n        this.game = game;\n    }\n\n    start() {\n        this.game.draw();\n    }\n}\n\nmodule.exports = GVIEW;\n\n//# sourceURL=webpack:///./src/classes/g_view.js?");

/***/ }),

/***/ "./src/classes/game.js":
/*!*****************************!*\
  !*** ./src/classes/game.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/classes/player.js\");\n\n\nconst HEIGHT = 850;\nconst WIDTH = 1200;\nconst START_LOCATION = { x: 0, y: 0 }\n// const START_LOCATION = { x: 600, y: 840 }\n\nclass Game {\n    constructor(ctx) {\n        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](START_LOCATION);\n        this.lives = this.player.lives\n        this.ctx = ctx;\n        this.blocks = [];\n        this.height = HEIGHT;\n        this.width = WIDTH;\n        this.themeColor = [\"red\", \"blue\", \"green\"];     //add a function to pick a theme color based on user input, or simply randomize it\n        this.balls = [];\n        this.input = {\n            a: false,\n            d: false\n        };\n    };   \n//     document.addEventListener(\"keydown\", event => {\n//         this._handleKey(event, true);\n//         });\n        \n// document.addEventListener(\"keyup\", event => {\n//     this._handleKey(event, false);\n// })\n\n\n    allObjects() {\n        return [].concat(this.player, this.blocks, this.balls);\n    };\n\n    draw() {\n        this.ctx.clearRect(0, 0, this.width, this.height);\n        this.ctx.fillStyle = this.themeColor[1];\n        this.ctx.fillRect(0, 0, this.width, this.height);\n\n        this.allObjects().forEach(object => {\n            object.draw(this.ctx);\n        });\n    };\n\n    // keyDown() {\n    //     document \n    // }\n\n    handleKey(event, down) {\n        let input = this.input;\n        switch(event.keyCode) {\n            case 65:\n                if (input.a !== down ) {\n                    input.a = down;\n                }\n                break;\n            case 68:\n                if (input.d !== down) {\n                    input.d = down;\n                }\n                break;\n            default:\n                break;\n        }\n\n        this.input = input;\n    }\n\n    //add block function needed\n    //add player function needed\n}\n\nmodule.exports = Game;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./src/classes/game.js?");

/***/ }),

/***/ "./src/classes/moving_object.js":
/*!**************************************!*\
  !*** ./src/classes/moving_object.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const FRAME_RATE = 1000 / 60;\n\nclass MovingObject {\n    constructor(pos, vel, radius) {\n        // this.pos = pos ? pos : { x: 600, y: 840 };\n        this.pos = pos ? pos : { x: 0, y: 0 };\n        this.vel = vel ? vel : { x: 0, y: 0 }\n        this.radius = radius;\n    };\n    \n    move(deltaTime) {\n        const velocityScale = deltaTime / FRAME_RATE;\n        let offsetX = this.vel.x * velocityScale;\n        let offsetY = this.vel.offsetY * velocityScale;\n        this.pos.x = this.pos.x + offsetX;\n        this.pos.y = this.pos.y + offsetY;\n    }\n\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/classes/moving_object.js?");

/***/ }),

/***/ "./src/classes/player.js":
/*!*******************************!*\
  !*** ./src/classes/player.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ \"./src/classes/moving_object.js\");\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_moving_object__WEBPACK_IMPORTED_MODULE_0__);\n\nconst STARTING_LIVES = 3;\nconst PLAYER_SPEED = 150;\nconst PLAYER_RADIUS = 30;\n\nconst randomColor = () => {\n    const digs = \"0123456789ABCDEF\";\n    let color = \"#\";\n    for (let i = 0; i < 3; i++) {\n        color += digs[Math.floor((Math.random() * 16))];\n    }\n    return color;\n};\n\nclass Player extends _moving_object__WEBPACK_IMPORTED_MODULE_0___default.a {\n    constructor(pos, lives = STARTING_LIVES) {\n        super(pos, { x: 0, y: 0 }, PLAYER_RADIUS)\n        this.lives = lives;\n        this.speed = 0;\n        this.color = randomColor();\n    }\n\n    setKeyInputs(inputs) {\n        this.inputs = inputs;\n        if (inputs.d || inputs.a) {\n            this.speed = PLAYER_SPEED;\n        } else {\n            this.speed = 0;\n        }\n    }\n\n    draw(ctx) {\n        ctx.save();\n        ctx.fillStyle = this.color;\n        ctx.fillRect(this.pox.x, this.pox.y, this.width, this.height);\n        ctx.restore();\n    }\n}\n\n\nmodule.exports = Player;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./src/classes/player.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/game */ \"./src/classes/game.js\");\n/* harmony import */ var _classes_g_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/g_view */ \"./src/classes/g_view.js\");\n/* harmony import */ var _classes_g_view__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_classes_g_view__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const canvas = document.getElementById(\"board\");\n    const ctx = canvas.getContext(\"2d\");\n    const game = new _classes_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx);\n    new _classes_g_view__WEBPACK_IMPORTED_MODULE_1___default.a(game).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });