require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res) {
  var arr = JSON.parse(req.query.arr || '[]');
  res.send(_transducers2.default.map([1, 2, 3], function (x) {
    return x + 1;
  }));
};

var _transducers = __webpack_require__(3);

var _transducers2 = _interopRequireDefault(_transducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("instagram-node");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("transducers.js");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

var _instagramNode = __webpack_require__(2);

var _instagramNode2 = _interopRequireDefault(_instagramNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create an express app
var app = (0, _express2.default)();
var ig = _instagramNode2.default.instagram();
// Have to have this for the page to render!
// otherwise will get error of
// "Error: No default engine was specified and no extension was provided"
app.set('view engine', 'ejs');
// config the app
// tell node where to look for resources
app.use(_express2.default.static(__dirname + 'public'));
// configure instagram app with client-id

// create an express route for the home page
app.get('/', function (req, res) {
    // use the instagram package to get our profile's media
    // render the home page and pass in the our profile's images
    res.render('pages/index');
});

// start the server on port 8080
// =================================
app.listen(8080);

console.log('App started! http://localhost:8080');
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map