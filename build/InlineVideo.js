(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("InlineVideo", [], factory);
	else if(typeof exports === 'object')
		exports["InlineVideo"] = factory();
	else
		root["InlineVideo"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RAF = __webpack_require__(1);

var _RAF2 = _interopRequireDefault(_RAF);

var _CSS = __webpack_require__(2);

var _CSS2 = _interopRequireDefault(_CSS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InlineVideo = function () {
	function InlineVideo() {
		var _this = this;

		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    _ref$src = _ref.src,
		    src = _ref$src === undefined ? '' : _ref$src,
		    _ref$parent = _ref.parent,
		    parent = _ref$parent === undefined ? document.body : _ref$parent,
		    _ref$width = _ref.width,
		    width = _ref$width === undefined ? 0 : _ref$width,
		    _ref$height = _ref.height,
		    height = _ref$height === undefined ? 0 : _ref$height,
		    _ref$debug = _ref.debug,
		    debug = _ref$debug === undefined ? false : _ref$debug,
		    _ref$onPlay = _ref.onPlay,
		    onPlay = _ref$onPlay === undefined ? function () {} : _ref$onPlay,
		    _ref$onPause = _ref.onPause,
		    onPause = _ref$onPause === undefined ? function () {} : _ref$onPause,
		    _ref$onEnded = _ref.onEnded,
		    onEnded = _ref$onEnded === undefined ? function () {} : _ref$onEnded;

		_classCallCheck(this, InlineVideo);

		this.seek = function () {
			var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

			if (_this.video.duration > 0) {
				// time bounds
				time = typeof time === 'number' && time <= _this.video.duration ? time : 0;

				// seek
				if (_this.useRAF) {
					_this.audio.currentTime = time;
				} else {
					_this.video.currentTime = time;
				}
			}

			return _this;
		};

		this.log = function (message) {
			if (_this.debug) {
				console.log(message);
			}

			return _this;
		};

		var userAgent = navigator.userAgent || navigator.vendor || window.opera;

		this.src = src;
		this.parent = typeof parent === 'string' ? document.querySelector(parent) : parent;
		this.width = width;
		this.height = height;
		this.debug = debug;
		this.onPlay = onPlay;
		this.onPause = onPause;
		this.onEnded = onEnded;
		this.audio = document.createElement('audio');
		this.video = document.createElement('video');
		this.states = {
			STARTING: 0,
			PREPPING: 1,
			READY: 2
		};
		this.state = this.states.STARTING;
		this.playing = false;
		this.raf = null;
		this.iOS = !!(/iPhone|iPod/.test(userAgent) && !window.MSStream);
		this.supportsInline = !!('playsInline' in this.video);
		this.useRAF = !!(this.iOS && !this.supportsInline);

		this.init();
	}

	_createClass(InlineVideo, [{
		key: 'init',
		value: function init() {
			// audio and video events
			this.audio.addEventListener('canplay', this.prepAV.bind(this));
			this.video.addEventListener('canplay', this.prepAV.bind(this));

			// try loading video to get thumbnail and info
			this.audio.src = this.video.src = this.src;
			this.video.load();

			// append to parent
			this.parent.appendChild(this.video);

			// do we support inline play already?
			if (this.iOS && this.supportsInline && !this.useRAF) {
				this.log('[[ Using native inline player ]]');
				this.video.setAttribute('playsinline', true);
			}
			// otherwise, request animation frame
			if (this.useRAF) {
				this.log('[[ Added inline player support ]]');
				_RAF2.default.add(this.render.bind(this));
				this.audio.addEventListener('ended', this.ended.bind(this));
				this.addCSS();
			} else {
				this.log('[[ Using regular HTML5 player ]]');
				// video ended event for both native inline and regular native players
				this.video.addEventListener('ended', this.ended.bind(this));
			}
		}
	}, {
		key: 'addCSS',
		value: function addCSS() {
			// add class name to video
			this.video.classList.add('InlineVideo');

			// then rules that go with it
			_CSS2.default.addRule('\n\t\t\t.InlineVideo::-webkit-media-controls-play-button,\n\t\t\t.InlineVideo::-webkit-media-controls-start-playback-button {\n\t\t\t\tpointer-events: none;\n\t\t\t\topacity: 0;\n\t\t\t}\n\t\t');
		}
	}, {
		key: 'prepAV',
		value: function prepAV() {
			// don't do anything if it's already ready
			if (this.state === this.states.READY) {
				return false;
			}

			// otherwise
			this.state++;
			this.size();

			// ready now?
			if (this.state === this.states.READY && this.playing) {
				this.play();
			}

			return this;
		}
	}, {
		key: 'size',
		value: function size() {
			// update width and height to correct size
			this.width = typeof this.video.videoWidth === 'number' && this.width === 0 ? this.video.videoWidth : this.width;
			this.height = typeof this.video.videoHeight === 'number' && this.height === 0 ? this.video.videoHeight : this.height;

			// don't continue if zero sized
			if (this.width === 0 && this.height === 0) {
				return false;
			}

			// size
			this.video.setAttribute('width', this.width + 'px');
			this.video.setAttribute('height', this.height + 'px');

			return this;
		}
	}, {
		key: 'render',
		value: function render() {
			// sync unplaying video with playing audio
			this.video.currentTime = this.audio.currentTime;
		}
	}, {
		key: 'load',
		value: function load() {
			this.audio.load();
			this.size();

			return this;
		}
	}, {
		key: 'play',
		value: function play() {
			this.playing = true;
			this.video.classList.add('playing');

			this.onPlay();

			if (this.useRAF) {
				if (this.state === this.states.READY) {
					this.audio.play();
				} else {
					this.load();
				}
			} else {
				this.video.play();
			}

			return this;
		}
	}, {
		key: 'pause',
		value: function pause() {
			this.onPause();

			if (this.useRAF) {
				if (this.state === this.states.READY) {
					this.audio.pause();
				}
			} else {
				this.video.pause();
			}

			this.playing = false;
			this.video.classList.remove('playing');

			return this;
		}
	}, {
		key: 'ended',
		value: function ended() {
			this.video.classList.remove('playing');
			this.onEnded();
		}
	}]);

	return InlineVideo;
}();

exports.default = InlineVideo;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RAF = function () {
	function RAF() {
		_classCallCheck(this, RAF);

		this.setup = false;
		this.listeners = [];
		this.lastTime = 0;
		this.timer = {
			fps: 60,
			before: Date.now(),
			now: 0
		};

		// start immediately
		this.prepare();
	}

	_createClass(RAF, [{
		key: 'prepare',
		value: function prepare() {
			var _this = this;

			var vendors = ['ms', 'moz', 'webkit', 'o'];

			for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
			}

			if (!window.requestAnimationFrame) {
				window.requestAnimationFrame = function (callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - _this.lastTime));
					var id = window.setTimeout(function () {
						callback(currTime + timeToCall);
					}, timeToCall);

					_this.lastTime = currTime + timeToCall;
					return id;
				};
			}

			if (!window.cancelAnimationFrame) {
				window.cancelAnimationFrame = function (id) {
					clearTimeout(id);
				};
			}

			this.setup = true;
			this.onLoop();
		}
	}, {
		key: 'onLoop',
		value: function onLoop() {
			// fps check
			this.timer.now = Date.now();
			var elapsed = this.timer.now - this.timer.before;

			if (elapsed > 1000 / this.timer.fps) {
				for (var x = 0; x < this.listeners.length; x++) {
					this.listeners[x]();
				};
			}

			this.timer.before = this.timer.now - elapsed % (1000 / this.timer.fps);

			window.requestAnimationFrame(this.onLoop.bind(this));
		}
	}, {
		key: 'add',
		value: function add(fn) {
			this.listeners.push(fn);
		}
	}, {
		key: 'remove',
		value: function remove(fn) {
			var cur = this.listeners.indexOf(fn);

			this.listeners.splice(cur, 1);
		}
	}]);

	return RAF;
}();

exports.default = new RAF();
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CSS = function CSS() {
	var _this = this;

	_classCallCheck(this, CSS);

	this.addRule = function (rule) {
		_this.sheet.innerHTML += rule;
	};

	this.sheet = document.createElement('style');
	this.sheet.type = 'text/css';
	document.body.appendChild(this.sheet);
};

exports.default = new CSS();
module.exports = exports['default'];

/***/ })
/******/ ]);
});