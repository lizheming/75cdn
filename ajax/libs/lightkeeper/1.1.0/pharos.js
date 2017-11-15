(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pharos"] = factory();
	else
		root["pharos"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isNumber = function (arg) {
  return !isNaN(arg) && typeof arg === 'number';
};

exports.isEmpty = function (obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    return JSON.stringify(obj) === '{}';
  }
  return !obj;
};

exports.build_query = function (obj) {
  var params = [];
  for (var k in obj) {
    var val = obj[k];
    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      val = JSON.stringify(val);
    }
    params.push(encodeURIComponent(k) + '=' + encodeURIComponent(val));
  }
  return params.join('&');
};

exports.getPerformance = function () {
  var performance = global.performance;
  if (!performance) {
    // eslint-disable-next-line no-console
    console.log('Browser doesn\'t support Performance API');
  }
  return performance;
};

exports.sendLog = function (url) {
  if (!url) return;

  global.sadLog = new Image();
  global.sadLog.onload = global.sadLog.onerror = function () {
    delete global.sadLog;
  };
  global.sadLog.src = url;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var Pharos = __webpack_require__(3);
var pharos = new Pharos();

global.addEventListener('load', function () {
  var script = document.querySelector('script[data-siteid][data-host]');
  pharos.site_id = script.getAttribute('data-siteid');
  pharos.host = script.getAttribute('data-host');
});

module.exports = pharos;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = __webpack_require__(1);
var performance = __webpack_require__(4);

var INFO = Symbol('info');
var TIME_POOL = {};
module.exports = function () {
  function Pharos(site_id, host) {
    var _this = this;

    _classCallCheck(this, Pharos);

    this.site_id = site_id;
    this.host = host;
    this[INFO] = {};

    global.addEventListener('load', function () {
      setTimeout(function () {
        _this.add(performance());
      });
    });
  }

  _createClass(Pharos, [{
    key: 'monitor',
    value: function monitor(info) {
      var host = this.host;
      if (!/^(http|\/\/)/i.test(host)) {
        host = location.protocol + '//' + host;
      }

      var baseUrl = host + '/api/disp?';
      var params = {
        site_id: this.site_id,
        info: util.isEmpty(info) ? this[INFO] : info,
        screen: global.screen.width + 'x' + global.screen.height
      };
      util.sendLog(baseUrl + util.build_query(params));
    }
  }, {
    key: 'time',
    value: function time(name) {
      TIME_POOL[name] = Date.now();
    }
  }, {
    key: 'timeEnd',
    value: function timeEnd(name) {
      var now = Date.now();
      if (!TIME_POOL[name]) {
        TIME_POOL[name] = now;
      }

      var delta = now - TIME_POOL[name];
      this.add(name, delta);
      // eslint-disable-next-line no-console
      console.log(name + ': ' + delta + 'ms');
      delete TIME_POOL[name];
    }
  }, {
    key: 'add',
    value: function add(key, val) {
      var data = key;
      if (util.isNumber(val)) {
        data = _defineProperty({}, key, val);
      }

      for (var k in data) {
        if (!util.isNumber(data[k])) {
          continue;
        }
        this[INFO][k] = data[k];
      }
      return true;
    }
  }, {
    key: 'delete',
    value: function _delete() {
      for (var _len = arguments.length, infoKeys = Array(_len), _key = 0; _key < _len; _key++) {
        infoKeys[_key] = arguments[_key];
      }

      for (var i = 0; i < infoKeys.length; i++) {
        delete this[INFO][infoKeys[i]];
      }
      return true;
    }
  }, {
    key: 'search',
    value: function search(key) {
      return this[INFO][key];
    }
  }]);

  return Pharos;
}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(1);
module.exports = function () {
  var performance = util.getPerformance();
  if (!performance) {
    return {};
  }

  var t = performance.timing;
  var times = {};

  // 【重要】页面加载完成的时间
  // 【原因】这几乎代表了用户等待页面可用的时间
  times.loadPage = t.loadEventEnd - t.navigationStart;

  // 【重要】解析 DOM 树结构的时间
  // 【原因】反省下你的 DOM 树嵌套是不是太多了！
  times.domReady = t.domComplete - t.responseEnd;

  // 【重要】重定向的时间
  // 【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
  times.redirect = t.redirectEnd - t.redirectStart;

  // 【重要】DNS 查询时间
  // 【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
  // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
  times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;

  // 【重要】读取页面第一个字节的时间
  // 【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
  // TTFB 即 Time To First Byte 的意思
  // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
  times.ttfb = t.responseStart - t.navigationStart;

  // 【重要】内容加载完成的时间
  // 【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
  times.request = t.responseEnd - t.requestStart;

  // 【重要】执行 onload 回调函数的时间
  // 【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
  times.loadEvent = t.loadEventEnd - t.loadEventStart;

  // DNS 缓存时间
  times.appcache = t.domainLookupStart - t.fetchStart;

  // 浏览器卸载前一个页面（同一个域下）的时间
  times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;

  // TCP 建立连接完成握手的时间
  times.connect = t.connectEnd - t.connectStart;

  return times;
};

/***/ })
/******/ ]);
});