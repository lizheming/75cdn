(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Clair = factory());
}(this, (function () { 'use strict';

/**
 * The base implementation of `_.clamp` which doesn't coerce arguments.
 *
 * @private
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */
function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

var _baseClamp = baseClamp;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol_1(value)) {
    return NAN;
  }
  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber;

/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Number
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 * @example
 *
 * _.clamp(-10, -5, 5);
 * // => -5
 *
 * _.clamp(10, -5, 5);
 * // => 5
 */
function clamp(number, lower, upper) {
  if (upper === undefined) {
    upper = lower;
    lower = undefined;
  }
  if (upper !== undefined) {
    upper = toNumber_1(upper);
    upper = upper === upper ? upper : 0;
  }
  if (lower !== undefined) {
    lower = toNumber_1(lower);
    lower = lower === lower ? lower : 0;
  }
  return _baseClamp(toNumber_1(number), lower, upper);
}

var clamp_1 = clamp;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return _root.Date.now();
};

var now_1 = now;

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;
var nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber_1(wait) || 0;
  if (isObject_1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now_1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now_1());
  }

  function debounced() {
    var time = now_1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject_1(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce_1(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

var throttle_1 = throttle;

var MOUSE_MOVE_DEFALT_TRHOTTLE_TIME = 80;
var DELAY_TIME = 200;

var baseRange = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"container",staticClass:"c-base-range",on:{"mousedown":function($event){$event.preventDefault();_vm.onMousedown($event);}}},[_vm._t("default"),_vm._t("thumb")],2)},staticRenderFns: [],
  name: 'c-base-range',
  model: { event: 'change' },
  props: {
    direction: {
      type: String,
      default: 'h'
    },
    throttle: {
      type: Number,
      default: MOUSE_MOVE_DEFALT_TRHOTTLE_TIME
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onMousedown: function onMousedown (e) {
      var this$1 = this;

      if (this.disabled) {
        return
      }

      e.preventDefault();

      var timer = setTimeout(function () {
        this$1.$emit('dragstart');
      }, DELAY_TIME);

      var onmousemove = throttle_1(function (e) {
        e.preventDefault();
        this$1.updateValue(e);
      }, this.throttle);

      var onmouseup = function (e) {
        clearTimeout(timer);
        this$1.$emit('dragend');
        this$1.updateValue(e);
        document.removeEventListener('mousemove', onmousemove);
        document.removeEventListener('mouseup', onmouseup);
      };

      document.addEventListener('mousemove', onmousemove);
      document.addEventListener('mouseup', onmouseup);

      this.updateValue(e);
    },

    updateValue: function updateValue (ref) {
      if ( ref === void 0 ) ref = {};
      var clientX = ref.clientX; if ( clientX === void 0 ) clientX = 0;
      var clientY = ref.clientY; if ( clientY === void 0 ) clientY = 0;

      var rect = this.$refs.container.getBoundingClientRect();
      var left = rect.left;
      var top = rect.top;
      var width = rect.width;
      var height = rect.height;

      var deltaX = clientX - left;
      var deltaY = clientY - top;

      var x = clamp_1(deltaX / width, 0, 1);
      var y = clamp_1(deltaY / height, 0, 1);

      var dir = this.direction;
      // eslint-disable-next-line
      var data = dir === 'vh' ? { x: x, y: y } : (dir === 'v' ? y : x);

      this.$emit('change', data);
    }
  },
  created: function created () {
    var ref = this;
    var direction = ref.direction;

    if (direction === 'hv') {
      this.direction = 'vh';
    }
  }
}

var Mod1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-breadcrumb__item"},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-breadcrumb-item'
}

var Mod2 = {
  name: 'c-breadcrumb',
  props: {
    divider: {
      type: String,
      default: '/'
    }
  },
  data: function data () {
    return {}
  },
  methods: {
    getDivider: function getDivider () {
      var divider = this.$scopedSlots.divider
        ? this.$scopedSlots.divider()
        : this.divider;
      return this.$createElement('i', {
        staticClass: 'c-breadcrumb__divider'
      }, divider)
    },
    getChildren: function getChildren () {
      var this$1 = this;

      var children = [];
      var isItem = function (item) { return item.componentOptions &&
        item.componentOptions.tag === 'c-breadcrumb-item'; };
      var items = (this.$slots.default || []).filter(isItem);
      var length = items.length;
      items.forEach(function (item, index) {
        children.push(item);
        if (index !== length - 1) { children.push(this$1.getDivider()); }
      });
      return children
    }
  },

  render: function render (h) {
    return h('nav', {
      staticClass: 'c-breadcrumb'
    }, this.getChildren())
  }
}

var Mod3 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-button-group"},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-button-group',
  props: {
    size: String
  },
  provide: function provide () {
    return {
      '$buttonGroup': this
    }
  },

  data: function data () {
    return {}
  },

  methods: {}
}

/**
 * @desc get Vue props definitions from modifier list
 * @param modifiers {Array}
 * @return {Object}
 * @see https://vuejs.org/v2/guide/components.html#Props
 */
function toVueProps (modifiers) {
  return modifiers.reduce(function (props, modifier) {
    props[modifier] = Boolean;
    return props
  }, {})
}

/**
 * @desc get Vue class binding from `block` and `modifiers`
 * @param block {String} `block` part of BEM, eg. `.c-button`
 * @param modifiers {Array} list of `modifier`
 * @return {Object} Vue class binding object, see
 * @see https://vuejs.org/v2/guide/class-and-style.html#Object-Syntax
 * @see https://en.bem.info/methodology/
 */
function toClassNames (block, modifiers) {
  return function () {
    var this$1 = this;

    return modifiers
      .filter(function (m) { return this$1[m]; })
      .map(function (m) { return (block + "--" + m); })
  }
}

/**
 * return a 6 length random string
 * warning: uniqueness NOT guaranteed
 */
function randomString () {
  var radix = 36;
  var length = 6;
  return Math.random().toString(radix).substr(-length)
}

/**
 * SEE:
 * https://github.com/react-component/util/blob/master/src/getScrollBarSize.js
 */
var cached;
function getScrollBarSize (fresh) {
  if (fresh || typeof cached === 'undefined') {
    var inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    var outer = document.createElement('div');
    var outerStyle = outer.style;

    outerStyle.position = 'absolute';
    outerStyle.top = 0;
    outerStyle.left = 0;
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '200px';
    outerStyle.height = '150px';
    outerStyle.overflow = 'hidden';

    outer.appendChild(inner);

    document.body.appendChild(outer);

    var widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    cached = widthContained - widthScroll;
  }
  return cached
}

/**
 * Promise defer
 */
function defer () {
  if (typeof Promise !== 'undefined' && Promise.defer) {
    return Promise.defer()
  }

  var deferred = {};
  deferred.promise = new Promise(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred
}

// import css
var name = 'c-button';
var block = "c-button";
var modifiers = [
  'primary',
  'success',
  'warning',
  'danger',
  'round',
  'outline',
  'flat',
  'loading'
];
var props = Object.assign(
  {
    href: String,
    size: String,
    icon: String,
    autofocus: Boolean
  },
  toVueProps(modifiers)
);
var classNames = toClassNames(block, modifiers);

var Mod4 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.href)?_c('router-link',{staticClass:"c-button",class:_vm.classNames,attrs:{"tag":"button","to":_vm.href}},[(_vm.iconName)?_c('c-icon',{attrs:{"name":_vm.iconName,"valign":"middle"}}):_vm._e(),(_vm.$slots.default)?_c('span',[_vm._t("default")],2):_vm._e()],1):_c('button',{staticClass:"c-button",class:_vm.classNames,on:{"click":_vm.onClick}},[(_vm.iconName)?_c('c-icon',{attrs:{"name":_vm.iconName,"valign":"middle"}}):_vm._e(),(_vm.$slots.default)?_c('span',[_vm._t("default")],2):_vm._e()],1)},staticRenderFns: [],
  name: name,
  props: props,
  inject: {
    $buttonGroup: { default: null },
    $form: { default: null }
  },
  computed: {
    iconName: function iconName () {
      return this.loading ? 'loader' : this.icon
    },
    actualSize: function actualSize () {
      var ref = this;
      var size = ref.size;
      var $buttonGroup = ref.$buttonGroup;
      var $form = ref.$form;
      return size ||
        ($buttonGroup && $buttonGroup.size) ||
        ($form && $form.size)
    },
    classNames: function classNames$1 () {
      var classList = classNames.call(this);
      var size = this.actualSize;
      if (size) { classList.push(("c-button--" + size)); }
      return classList
    }
  },
  methods: {
    onClick: function onClick (e) {
      this.$emit('click', e);
    }
  },
  mounted: function mounted () {
    if (this.autofocus) {
      this.$el.focus();
    }
  }
}

var Mixin = {
  methods: {
    fixZero: function fixZero (val, num) {
      if ( num === void 0 ) num = 2;

      return (Array(num).join(0) + val).slice(-num)
    },
    updateMonth: function updateMonth (year, month, num, type) {
      month = type === 'plus' ? parseInt(month) + num : parseInt(month) - num;
      var maxMonth = 11;
      var minMonth = 0;
      if (month < minMonth) {
        year -= 1;
      } else if (month > maxMonth) {
        year += 1;
      }
      month = (month + 12) % 12;
      return [
        year,
        month
      ]
    },
    isSelectedMonth: function isSelectedMonth (month) {
      return !((this.year === this.minYear && month < this.minMonth) ||
        (this.year === this.maxYear && month > this.maxMonth))
    },
    prevMonth: function prevMonth () {
      if (!this.isPreMonthCanSelect) { return false }
      var month = parseInt(this.month) - 1;
      var maxMonth = 11;
      var minMonth = 0;
      if (month < minMonth) {
        this.$emit('yearchange', this.year - 1);
      }
      month = month < minMonth ? maxMonth : month;
      this.$emit('monthchange', month);
    },
    nextMonth: function nextMonth () {
      if (!this.isNextMonthCanSelect) { return false }
      var month = this.month + 1;
      var maxMonth = 11;
      var minMonth = 0;
      if (month > maxMonth) {
        this.$emit('yearchange', this.year + 1);
      }
      month = month > maxMonth ? minMonth : month;
      this.$emit('monthchange', month);
    }
  }
}

/**
 * 格式化日期
 * @method format
 * @static
 * @param {Date} d 日期对象
 * @param {string} pattern 日期格式(y年M月d天h时m分s秒)，默认为"yyyy-MM-dd"
 * @return {string}  返回format后的字符串
 * @example
 var d=new Date();
 alert(format(d," yyyy年M月d日\n yyyy-MM-dd\n MM-dd-yy\n yyyy-MM-dd hh:mm:ss"));
 */
/* eslint-disable no-extend-native */
Date.prototype.format = function (pattern) {
  /* eslint-disable no-param-reassign */
  pattern = pattern || 'yyyy-MM-dd hh:mm:ss';
  var y = this.getFullYear().toString();
  var o = {
    M: this.getMonth() + 1, // month
    d: this.getDate(), // day
    h: this.getHours(), // hour
    m: this.getMinutes(), // minute
    s: this.getSeconds() // second
  };
  pattern = pattern.replace(/(y+)/ig, function (a, b) {
    return y.substr(4 - Math.min(4, b.length))
  });
  /* eslint-disable */
  var loop = function ( i ) {
    pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function (a, b) {
      return o[i] < 10 && b.length > 1 ? '0' + o[i] : o[i]
    });
  };

  for (var i in o) loop( i );
  return pattern
};

var Mod5 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-calendar__header"},[_c('div',{staticClass:"c-calendar__prev-year",class:{disabled: !_vm.isPreYearCanSelect},on:{"click":_vm.prevYear}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevrons-left"}})],1),_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__prev-month",class:{disabled: !_vm.isPreMonthCanSelect},on:{"click":_vm.prevMonth}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevron-left"}})],1),_c('span',{staticClass:"c-calendar__year"},[_vm._v(_vm._s(this.year))]),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__spacer"},[_vm._v("-")]),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__month",on:{"click":_vm.monthtableShow}},[_vm._v(_vm._s(_vm.fixZero(this.month + 1)))]),_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__next-month",class:{disabled: !_vm.isNextMonthCanSelect},on:{"click":_vm.nextMonth}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevron-right"}})],1),_c('a',{staticClass:"c-calendar__next-year",class:{disabled: !_vm.isNextYearCanSelect},on:{"click":_vm.nextYear}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevrons-right"}})],1)])},staticRenderFns: [],
  name: 'c-dateheader',
  props: {
    monthsShow: Boolean,
    year: [String, Number],
    month: [String, Number],
    date: {
      type: String,
      default: '1970-01-01'
    },
    minDate: {
      type: String,
      default: '1970-01-01'
    },
    maxDate: {
      type: String,
      default: '2099-12-31'
    }
  },
  mixins: [Mixin],
  data: function data () {
    return {}
  },
  computed: {
    minYear: function minYear () {
      return new Date(this.minDate).getFullYear()
    },
    maxYear: function maxYear () {
      return new Date(this.maxDate).getFullYear()
    },
    minMonth: function minMonth () {
      return new Date(this.minDate).getMonth()
    },
    maxMonth: function maxMonth () {
      return new Date(this.maxDate).getMonth()
    },
    isPreMonthCanSelect: function isPreMonthCanSelect () {
      return !(this.year === this.minYear && this.month === this.minMonth)
    },
    isNextMonthCanSelect: function isNextMonthCanSelect () {
      return !(this.year === this.maxYear && this.month === this.maxMonth)
    },
    isPreYearCanSelect: function isPreYearCanSelect () {
      return !(this.year === this.minYear)
    },
    isNextYearCanSelect: function isNextYearCanSelect () {
      return !(this.year === this.maxYear)
    }
  },
  methods: {
    prevYear: function prevYear () {
      if (!this.isPreYearCanSelect) { return false }
      this.$emit('yearchange', this.year - 1);
    },
    nextYear: function nextYear () {
      if (!this.isNextYearCanSelect) { return false }
      this.$emit('yearchange', this.year + 1);
    },
    monthtableShow: function monthtableShow () {
      this.$emit('monthshow', true);
    }
  }
}

var Mod6 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"c-calendar__day-table"},[_c('thead',[_c('tr',_vm._l((_vm.weeks),function(item){return _c('th',[_vm._v(_vm._s(item))])}))]),_c('tbody',_vm._l((_vm.dayRows),function(row,rowIndex){return _c('tr',_vm._l((row),function(item,itemIndex){return _c('td',{class:_vm.getCellCls(item),on:{"click":function($event){_vm.selectDay(item);},"mouseenter":function($event){_vm.onMouseEnter($event);}}},[_c('a',{staticClass:"day-cell",attrs:{"data-rowindex":rowIndex,"data-index":itemIndex}},[_vm._v(_vm._s(item.day))])])}))}))])},staticRenderFns: [],
  name: 'c-datetable',
  props: {
    type: {
      type: String,
      default: 'date'
    },
    year: [String, Number],
    month: [String, Number],
    day: [String, Number],
    start: String,
    end: String,
    minDate: {
      type: String,
      default: '1970-01-01'
    },
    maxDate: {
      type: String,
      default: '2099-12-31'
    },
    pattern: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    rangeObj: {
      type: Object,
      default: function default$1 () {
        return {
          endDate: '',
          selecting: false
        }
      }
    }
  },
  mixins: [Mixin],
  data: function data () {
    return {
      weeks: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  computed: {
    rangeDay: function rangeDay () {
      var endYear = new Date(this.end).getFullYear();
      var endMonth = new Date(this.end).getMonth();
      var endDay = new Date(this.end).getDate();
      return this.year === endYear && this.month === endMonth ? endDay : ''
    },
    minYear: function minYear () {
      return new Date(this.minDate).getFullYear()
    },
    maxYear: function maxYear () {
      return new Date(this.maxDate).getFullYear()
    },
    minMonth: function minMonth () {
      return new Date(this.minDate).getMonth()
    },
    maxMonth: function maxMonth () {
      return new Date(this.maxDate).getMonth()
    },
    minDay: function minDay () {
      return new Date(this.minDate).getDate()
    },
    maxDay: function maxDay () {
      return new Date(this.maxDate).getDate()
    },
    isPreMonthCanSelect: function isPreMonthCanSelect () {
      return !(this.year === this.minYear && this.month === this.minMonth)
    },
    isNextMonthCanSelect: function isNextMonthCanSelect () {
      return !(this.year === this.maxYear && this.month === this.maxMonth)
    },
    isPreYearCanSelect: function isPreYearCanSelect () {
      return !(this.year === this.minYear)
    },
    isNextYearCanSelect: function isNextYearCanSelect () {
      return !(this.year === this.maxYear)
    },
    dayRows: function dayRows () {
      var lines = 6;
      var weekDays = 7;
      var allDays = lines * weekDays;
      var rows = [];
      var getRowArr = function (N, i) {
        if ( i === void 0 ) i = 1;

        return Array.from(new Array(N), function (val, index) { return index + i; })
      };
      var mapDayObj = function (list, classname) {
        return list.map(function (item) {
          return {
            class: classname,
            day: item
          }
        })
      };
      var currentMonthDays = new Date(this.year, this.month + 1, 0).getDate();
      var lastMonthDays = new Date(this.year, this.month, 0).getDate();
      var startWeek = new Date(this.year, this.month, 1).getDay();
      var lastMonthDayCount = startWeek || weekDays;
      var nextMonthDays = allDays - lastMonthDayCount - currentMonthDays;
      var lastMonthDates = mapDayObj(
        getRowArr(lastMonthDays).slice(-lastMonthDayCount),
        'lastmonth');
      var currentMonthDates = mapDayObj(getRowArr(currentMonthDays),
        'curmonth');
      var nextMonthDates = mapDayObj(getRowArr(nextMonthDays), 'nextmonth');
      var allDate = lastMonthDates.concat( currentMonthDates,
        nextMonthDates
      );
      for (var i$1 = 0; i$1 < allDays; i$1 += weekDays) {
        rows.push(allDate.slice(i$1, i$1 + weekDays));
      }
      return rows
    }
  },
  methods: {
    getCellCls: function getCellCls (item) {
      var clsArr = [item.class];
      this.isSelectedDate(item) && clsArr.push('active');
      this.isDateDisabled(item) && clsArr.push('disabled');
      !this.isSelectedDate(item) && this.rangeObj.selecting && this.isDayInRange(item) && clsArr.push('day-cell-range');
      return clsArr
    },
    isDayInRange: function isDayInRange (item) {
      if (item.class !== 'curmonth') { return false }
      var startTime = new Date(this.start).getTime();
      var endTime = new Date(this.end).getTime();
      var currentTime = new Date(this.year, this.month, item.day).getTime();
      var hoverTime = new Date(this.rangeObj.endDate).getTime();
      if (startTime && endTime) {
        return currentTime > startTime && currentTime < endTime
      } else if (startTime) {
        return startTime > hoverTime
          ? currentTime > hoverTime && currentTime < startTime
          : currentTime > startTime && currentTime < hoverTime
      }
      return false
    },
    onMouseEnter: function onMouseEnter (e) {
      if (e.target.tagName === 'TD') {
        var rowIndex = e.target.querySelector('a').getAttribute('data-rowindex');
        var columnIndex = e.target.querySelector('a').getAttribute('data-index');
        var dayItem = this.dayRows[rowIndex][columnIndex];
        /* eslint-disable no-nested-ternary */
        var type = dayItem.class === 'lastmonth' ? 'sub' : dayItem.class === 'nextmonth' ? 'plus' : '';
        var ref = type !== '' ? this.updateMonth(this.year, this.month, 1, type) : [this.year, this.month];
        var year = ref[0];
        var month = ref[1];

        this.$emit('rangeChange', {
          rangeObj: {
            endDate: new Date(year, month, dayItem.day).format(this.pattern),
            selecting: true
          }
        });
      }
    },
    isDateDisabled: function isDateDisabled (item) {
      var months = 12;
      var isPrevMonthValid = item.class === 'lastmonth' &&
        !this.isSelectedMonth((this.month - 1) % months);
      var isNextMonthValid = item.class === 'nextmonth' &&
        !this.isSelectedMonth((this.month + 1) % months);
      var isCurMonthValid = item.class === 'curmonth' &&
        ((this.year === this.minYear && this.month === this.minMonth &&
        item.day < this.minDay) || (this.year === this.maxYear &&
        this.month === this.maxMonth && item.day > this.maxDay));
      return isCurMonthValid || isPrevMonthValid || isNextMonthValid
    },
    isSelectedDate: function isSelectedDate (item) {
      var isCurMonth = item.class === 'curmonth';
      var isRange = this.type === 'range';
      var currentDate = new Date(this.year, this.month, item.day).format(this.pattern);
      var isSelectedDay = currentDate === new Date(this.year, this.month, this.day).format(this.pattern);
      var isStart = currentDate === this.start;
      var isEnd = currentDate === this.end;
      var isHoverDate = currentDate === this.rangeObj.endDate;
      return isCurMonth && ((!isRange && isSelectedDay) ||
        (isRange && (isStart || isEnd || (!(this.start && this.end) && isHoverDate))))
    },
    markRange: function markRange (item) {
      var start = '';
      var end = '';
      var selecting = true;
      var type = item.class === 'lastmonth' ? 'sub' : item.class === 'nextmonth' ? 'plus' : '';
      var ref = type !== '' ? this.updateMonth(this.year, this.month, 1, type) : [this.year, this.month];
      var year = ref[0];
      var month = ref[1];
      var day = item.day;
      if (this.start && this.end) {
        start = new Date(year, month, day).format(this.pattern);
        selecting = false;
      } else if (!this.start && !this.end) {
        start = new Date(year, month, day).format(this.pattern);
      } else if (this.start && !this.end) {
        var startDate = new Date(year, month, day);
        start = new Date(this.start).getTime() > startDate.getTime() ? startDate.format(this.pattern) : this.start;
        end = new Date(this.start).getTime() > startDate.getTime() ? this.start : startDate.format(this.pattern);
      } else if (!this.start && this.end) {
        var endDate = new Date(year, month, day);
        start = new Date(this.end).getTime() > endDate.getTime() ? endDate.format(this.pattern) : this.end;
        end = new Date(this.end).getTime() > endDate.getTime() ? this.end : endDate.format(this.pattern);
      }
      this.$emit('change', {
        start: start,
        end: end,
        rangeObj: {
          endDate: new Date(this.year, this.month, day).format(this.pattern),
          selecting: selecting
        }
      });
    },
    selectDay: function selectDay (item) {
      var canSelPrevMonthDay = item.class === 'lastmonth' &&
        !(this.prevMonth() === false);
      var canSelNextMonthDay = item.class === 'nextmonth' &&
        !(this.nextMonth() === false);
      var isCurrentMonth = item.class === 'curmonth';

      if (canSelPrevMonthDay || canSelNextMonthDay || isCurrentMonth) {
        if (this.type === 'range') {
          this.markRange(item);
        } else {
          this.$emit('change', item.day);
        }
      }
    }
  }
}

var Mod7 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"c-calendar",class:_vm.className},[_c('c-dateheader',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.year,"month":_vm.month,"monthshow":_vm.monthsShow},on:{"monthchange":_vm.monthchange,"yearchange":_vm.yearchange,"monthshow":_vm.monthTableShow}}),_c('div',{staticClass:"c-calendar__body"},[(_vm.monthsShow)?_c('c-monthtable',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.year},on:{"change":_vm.selectMonth}}):_vm._e(),(!_vm.monthsShow)?_c('c-datetable',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.year,"month":_vm.month,"day":_vm.day},on:{"monthchange":_vm.monthchange,"yearchange":_vm.yearchange,"change":_vm.selectDay}}):_vm._e()],1)],1)},staticRenderFns: [],
  name: 'c-calendar',
  props: {
    value: String,
    size: String,
    show: {
      type: Boolean,
      default: true
    },
    minDate: {
      type: String,
      default: '1970-01-01'
    },
    maxDate: {
      type: String,
      default: '2099-12-31'
    },
    pattern: {
      type: String,
      default: 'yyyy-MM-dd'
    }
  },
  mixins: [Mixin],
  data: function data () {
    return {
      date: '',
      year: 1970,
      month: 1,
      day: 1,
      monthsShow: false
    }
  },
  computed: {
    className: function className () {
      return this.size ? ("is-" + (this.size)) : 'md'
    }
  },
  created: function created () {
    this.syncDate();
  },
  watch: {
    value: function value () {
      this.syncDate();
    },
    show: function show (newVal) {
      newVal && this.syncDate();
    }
  },
  methods: {
    syncDate: function syncDate () {
      this.date = this.value || this.date || new Date().format(this.pattern);
      if (new Date(this.date) > new Date(this.maxDate)) { this.date = this.maxDate; }
      if (new Date(this.date) < new Date(this.minDate)) { this.date = this.minDate; }
      this.date = new Date(this.date).format(this.pattern);
      var d = new Date(this.date);
      if (!isNaN(d.getTime())) {
        this.year = d.getFullYear();
        this.month = d.getMonth();
        this.day = d.getDate();
      }
    },
    selectDay: function selectDay (day) {
      this.day = day;
      var date = (this.year) + "-" + (this.fixZero(this.month + 1)) + "-" + (this.fixZero(this.day));
      this.date = new Date(date).format(this.pattern);
      this.$emit('update', this.date);
    },
    selectMonth: function selectMonth (month) {
      this.monthsShow = false;
      this.month = month;
      this.day = '';
    },
    monthchange: function monthchange (month) {
      this.month = month;
    },
    yearchange: function yearchange (year) {
      this.year = year;
    },
    monthTableShow: function monthTableShow (show) {
      this.monthsShow = show;
    },
    updateDay: function updateDay (num, type) {
      this.monthsShow = false;
      var date = new Date(this.year, this.month, this.day);
      type === 'plus' && date.setDate(date.getDate() + num);
      type === 'sub' && date.setDate(date.getDate() - num);
      if (new Date(date) > new Date(this.maxDate)) { date = this.maxDate; }
      if (new Date(date) < new Date(this.minDate)) { date = this.minDate; }
      this.$emit('update', new Date(date).format(this.pattern), true);
    }
  }
}

var Mod8 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"c-calendar__month-table"},[_c('tbody',_vm._l((_vm.monthRows),function(month){return _c('tr',_vm._l((month),function(item){return _c('td',{on:{"click":function($event){_vm.selectMonth(item);}}},[_c('a',{staticClass:"month-cell",class:{'disabled': !_vm.isSelectedMonth(item)}},[_vm._v(_vm._s(_vm.mapMonth(item)))])])}))}))])},staticRenderFns: [],
  name: 'c-monthtable',
  props: {
    year: [Number, String],
    minDate: {
      type: String,
      default: '1970-01-01'
    },
    maxDate: {
      type: String,
      default: '2099-12-31'
    }
  },
  mixins: [Mixin],
  computed: {
    monthRows: function monthRows () {
      var deps = 3;
      var rows = [];
      var loop = function ( i ) {
        var getRowArr = function (N) {
          return Array.from(new Array(N), function (val, index) { return index + i; })
        };
        rows.push(getRowArr(deps));
      };

      for (var i = 0; i < this.months.length; i += deps) loop( i );
      return rows
    },
    minYear: function minYear () {
      return new Date(this.minDate).getFullYear()
    },
    maxYear: function maxYear () {
      return new Date(this.maxDate).getFullYear()
    },
    minMonth: function minMonth () {
      return new Date(this.minDate).getMonth()
    },
    maxMonth: function maxMonth () {
      return new Date(this.maxDate).getMonth()
    }
  },
  data: function data () {
    return {
      months: [
        '一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
      ]
    }
  },
  methods: {
    selectMonth: function selectMonth (month) {
      if (!this.isSelectedMonth(month)) { return }
      this.$emit('change', month);
    },
    mapMonth: function mapMonth (month) {
      return this.months[month]
    }
  }
}

var Mod9 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-card",class:{'is-horizontal': _vm.horizontal}},[(_vm.$slots.title)?_c('div',{staticClass:"c-card__title"},[_vm._t("title")],2):_vm._e(),(_vm.$slots.media)?_c('div',{staticClass:"c-card__media"},[_vm._t("media")],2):_vm._e(),(_vm.$slots.default)?_c('div',{staticClass:"c-card__body"},[_vm._t("default")],2):_vm._e(),(_vm.$slots.actions)?_c('div',{staticClass:"c-card__actions"},[_vm._t("actions")],2):_vm._e()])},staticRenderFns: [],
  name: 'c-card',
  props: {
    horizontal: Boolean
  },
  data: function data () {
    return {}
  },
  methods: {}
}

var Menu = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('ul',{staticClass:"cascader-menu"},_vm._l((_vm.optionList),function(item){return _c('li',{staticClass:"casecader-menu-item",class:{'active': item.selected, 'disabled': item.disabled},attrs:{"title":item[_vm.showkey]},on:{"click":function($event){_vm.onMenuClick(item);}}},[_vm._v(_vm._s(item[_vm.labelKey])),(_vm.hasChildren(item))?_c('span',{staticClass:"cascader-icon"},[_c('c-icon',{attrs:{"name":"chevron-right"}})],1):_vm._e()])})),_c('div',{staticClass:"c-cascader__childmenu"},[(_vm.childrenOptions.length > 0)?_c('c-cascader-menu',{attrs:{"parentMenu":_vm.currentParentMenu,"options":_vm.childrenOptions,"labelKey":_vm.labelKey,"valueKey":_vm.valueKey,"childrenKey":_vm.childrenKey,"showAllLevel":_vm.showAllLevel,"changeOnSelect":_vm.changeOnSelect,"loadChildren":_vm.loadChildren,"level":_vm.level + 1}}):_vm._e()],1)])},staticRenderFns: [],_scopeId: 'data-v-125e08b0',
  name: 'c-cascader-menu',
  props: {
    level: {
      type: Number,
      default: 0
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    separator: {
      type: String,
      default: '/'
    },
    showAllLevel: {
      type: Boolean,
      default: true
    },
    changeOnSelect: {
      type: Boolean,
      default: false
    },
    parentMenu: {
      type: Object,
      default: function default$1 () {
        return {
          label: [],
          value: []
        }
      }
    },
    options: {
      type: Array,
      default: function default$2 () {
        return []
      }
    },
    loadChildren: {
      type: Function,
      default: null
    }
  },
  inject: ['$cascader'],
  data: function data () {
    return {
      optionList: [],
      childrenOptions: [],
      currentParentMenu: {
        label: [],
        value: []
      }
    }
  },
  created: function created () {
    this.resetOptionSelected();
    this.currentParentMenu = JSON.parse(JSON.stringify(this.parentMenu));
  },
  watch: {
    parentMenu: function parentMenu () {
      this.childrenOptions = [];
    },
    options: {
      handler: function handler () {
        var this$1 = this;

        this.resetOptionSelected();
        if (this.parentMenu.label.length) {
          this.$nextTick(function (_) {
            var activeOption = this$1.optionList.find(
              function (option) { return option[this$1.labelKey] === this$1.parentMenu.label[0]; });
            if (!this$1.childrenOptions.length &&
              this$1.hasChildren(activeOption) &&
              activeOption[this$1.childrenKey]) {
              this$1.childrenOptions = activeOption[this$1.childrenKey];
            }
          });
        }
      },
      deep: true
    }
  },
  methods: {
    resetOptionSelected: function resetOptionSelected () {
      var this$1 = this;

      var options = JSON.parse(JSON.stringify(this.options));
      this.optionList = options.map(function (item) {
        this$1.$set(item, 'selected', false);
        return item
      });
      if (this.$cascader.value.length) {
        var selectedItem = this.optionList.find(
          function (option) { return option[this$1.valueKey] === this$1.$cascader.value[this$1.level]; });
        selectedItem && this.$set(selectedItem, 'selected', true);
        if (selectedItem && this.hasChildren(selectedItem)) {
          this.childrenOptions = selectedItem[this.childrenKey];
        }
      }
    },
    hasChildren: function hasChildren (item) {
      return item && item.hasOwnProperty(this.childrenKey)
    },
    updateShowValue: function updateShowValue (item) {
      this.$cascader.showValue = this.showAllLevel
        ? this.currentParentMenu.label.join(this.separator)
        : item[this.labelKey];
      this.$cascader.onChange(JSON.parse(
        JSON.stringify(this.currentParentMenu)));
    },
    onMenuClick: function onMenuClick (item) {
      var this$1 = this;

      if (item.disabled) { return }
      this.optionList.map(function (item) {
        this$1.$set(item, 'selected', false);
        return item
      });
      var ref = this.parentMenu;
      var label = ref.label;
      var value = ref.value;
      label[this.level] = item[this.labelKey];
      value[this.level] = item[this.valueKey];
      this.currentParentMenu = {
        label: label.slice(0, this.level + 1),
        value: value.slice(0, this.level + 1)
      };
      this.$set(item, 'selected', true);
      if (this.hasChildren(item) &&
       !item[this.childrenKey].length && this.loadChildren) {
        this.loadChildren(item);
      } else {
        this.childrenOptions = item[this.childrenKey] || [];
      }
      if (this.changeOnSelect) {
        this.updateShowValue(item);
      }
      if (!this.hasChildren(item)) {
        !this.changeOnSelect && this.updateShowValue(item);
        this.$cascader.isOpen = false;
      }
    }
  }
}

var Mod10 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-cascader",on:{"click":function($event){_vm.isOpen = true;}}},[_c('div',{staticClass:"cascader-context"},[_c('c-input',{attrs:{"placeholder":_vm.placeholder,"width":"normal","size":_vm.size,"disabled":_vm.disabled},model:{value:(_vm.showValue),callback:function ($$v) {_vm.showValue=$$v;},expression:"showValue"}}),_c('c-icon',{staticClass:"c-cascader__icon",attrs:{"name":"chevron-down"}})],1),_c('div',{staticClass:"cascader-dropmenu",class:_vm.className},[(_vm.isOpen)?[_c('Menu',{attrs:{"parentMenu":_vm.parentMenu,"options":_vm.optionList,"labelKey":_vm.labelKey,"valueKey":_vm.valueKey,"childrenKey":_vm.childrenKey,"showAllLevel":_vm.showAllLevel,"changeOnSelect":_vm.changeOnSelect,"loadChildren":_vm.loadChildren}})]:_vm._e()],2)])},staticRenderFns: [],
  name: 'c-cascader',
  components: {
    Menu: Menu
  },
  provide: function provide () {
    return {
      '$cascader': this
    }
  },
  props: {
    value: Array,
    placeholder: String,
    disabled: Boolean,
    separator: {
      type: String,
      default: '/'
    },
    changeOnSelect: {
      type: Boolean,
      default: false
    },
    showAllLevel: {
      type: Boolean,
      default: true
    },
    size: String,
    options: {
      type: Array,
      default: function default$1 () {
        return []
      }
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    loadChildren: {
      type: Function,
      default: null
    }
  },
  computed: {
    className: function className () {
      return this.size ? ("is-" + (this.size)) : 'md'
    }
  },
  data: function data () {
    return {
      parentMenu: {
        label: [],
        value: []
      },
      optionList: [],
      cascaderMenu: '',
      showValue: '',
      isOpen: false
    }
  },
  created: function created () {
    this.optionList = [].concat( this.options );
  },
  mounted: function mounted () {
    if (typeof document === 'object') {
      this.cascaderMenu = document.querySelector('.cascader-dropmenu');
      document.body.appendChild(this.cascaderMenu);
      this.resize();
    }
    window.addEventListener('resize', this.resize, false);
  },
  beforeDestroy: function beforeDestroy () {
    this.cascaderMenu.remove();
    window.removeEventListener('resize', this.resize, false);
  },
  watch: {
    options: {
      handler: function handler () {
        this.optionList = [].concat( this.options );
      },
      deep: true
    },
    value: function value (newVal) {
      var labels = this.getLabelWithValue(this.value);
      this.showValue = this.showAllLevel
        ? labels.join(this.separator)
        : labels[labels.length - 1];
    },
    isOpen: function isOpen () {
      if (this.isOpen) {
        this.resize();
        window.addEventListener('click', this.onBodyClick, true);
      } else {
        window.removeEventListener('click', this.onBodyClick, true);
      }
    }
  },
  methods: {
    close: function close () {
      this.isOpen = false;
    },
    onChange: function onChange (selectMenu) {
      this.$emit('input', selectMenu.value);
      this.$emit('change', selectMenu);
    },
    getLabelWithValue: function getLabelWithValue (value) {
      var this$1 = this;

      var labels = [];
      value.reduce(function (result, item) {
        var resultTarget = result.find(function (data) { return data[this$1.valueKey] === item; });
        var label = resultTarget.label;
        var children = resultTarget[this$1.childrenKey];
        labels.push(label);
        if (children && children.length) {
          return children
        }
        return result
      }, this.optionList);
      return labels
    },
    onBodyClick: function onBodyClick (e) {
      var isInCascader = this.$el.contains(e.target);
      var isInCascaderMenu = this.cascaderMenu.contains(e.target);
      if (!isInCascader && !isInCascaderMenu) {
        this.close();
        this.$el.focus();
      }
    },
    getStyle: function getStyle () {
      var clientRect = this.$el.getBoundingClientRect();
      var windowH = window.innerHeight;
      var marginTop = 2;
      var scrollBarWidth = 20;
      var scrollHeight =
        document.body.scrollWidth > window.innerWidth ? scrollBarWidth : 0;
      var droplistHeight = this.cascaderMenu.clientHeight;
      var defaultTop =
        clientRect.top + clientRect.height + marginTop + window.pageYOffset;
      var clientHeight = clientRect.height + marginTop;

      var clientY = clientRect.y;
      var compTop = windowH - droplistHeight - scrollHeight;
      var left = clientRect.left + window.pageXOffset;
      var top =
        droplistHeight + clientHeight + clientY + scrollHeight > windowH
          ? compTop
          : defaultTop;
      return ("\n        position: absolute;\n        top: " + top + "px;\n        left: " + left + "px;\n        z-index: 9;\n      ")
    },
    resize: function resize () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.cascaderMenu.style.cssText = this$1.getStyle();
      });
    }
  }
}

/**
 * 检查值是否为空
 */
function isEmpty (value) {
  if (value === null || value === void 0) { return true }
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0
  }
  if (typeof value === 'boolean') { return !value }
  if (typeof value === 'number') { return value === 0 }
  if (typeof value === 'object') { return Object.keys(value).length === 0 }
}

/**
 * 获取变量的字符串值
 */
function toString (value) {
  return value === void 0 || value === null
    ? ''
    : value.toString().trim()
}

var ruleset = {

  /**
   * 必填(选)验证
   */
  required: function (value) {
    var valid = !isEmpty(value);
    var isCheckable = (Array.isArray(value) || typeof value === 'boolean');
    var errMsg = isCheckable ? '请选择' : '请填写此项';
    var msg = valid ? '' : errMsg;
    return { valid: valid, msg: msg }
  },

  /**
   * 最小长度验证
   * @param param {String} 最少输入多少个字
   */
  minlength: function (value, param) {
    // value需要转换成字符串计算length，不然数字或者0都会是invalid
    var valid = toString(value).length >= parseInt(param);
    var msg = valid ? '' : ("请最少填写" + param + "个字");
    return { valid: valid, msg: msg }
  },

  /**
   * 最大长度验证， 主要针对 IE9 下 textarea 的 maxlength 无效的情况
   * @param param {String} 最多输入多少个字
   */
  maxlength: function (value, param) {
    // value需要转换成字符串计算length，不然数字或者0都会是invalid
    var valid = toString(value).length <= parseInt(param);
    var msg = valid ? '' : ("最多填写" + param + "个字");
    return { valid: valid, msg: msg }
  },

  /**
   * 验证输入是否某种指定类型的格式
   * @param param {String} 类型，比如email、tel等
   */
  type: function (value, param) {
    var method = param + "Type";
    return ruleset[method](value)
  },

  /**
   * 邮箱格式验证
   */
  emailType: function (value) {
    var pattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    var valid = pattern.test(toString(value));
    var msg = valid ? '' : '邮箱格式不正确';
    return { valid: valid, msg: msg }
  },

  /**
   * 手机号码格式
   */
  mobileType: function (value) {
    var pattern = /^1[3|4|5|7|8]\d{9}$/;
    var valid = pattern.test(toString(value));
    var msg = valid ? '' : '手机号码格式不正确';
    return { valid: valid, msg: msg }
  },

  /**
   * 固定电话格式
   */
  telType: function (value) {
    var pattern = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;
    var valid = pattern.test(toString(value));
    var msg = valid ? '' : '固定电话号码格式不正确';
    return { valid: valid, msg: msg }
  },

  /**
   * 数字格式
   */
  numberType: function (value) {
    var valid = !isNaN(value);
    var msg = valid ? '' : '请输入数字';
    return { valid: valid, msg: msg }
  },

  /**
   * max格式
   */
  max: function (value, param) {
    var valid = !isNaN(value);
    var msg = valid ? '' : '请输入数字';
    if (!valid) { return { valid: valid, msg: msg } }
    valid = parseFloat(value) <= parseFloat(param);
    msg = valid ? '' : ("输入值最大为" + param);
    return { valid: valid, msg: msg }
  },

  /**
   * min格式
   */
  min: function (value, param) {
    var valid = !isNaN(value);
    var msg = valid ? '' : '请输入数字';
    if (!valid) { return { valid: valid, msg: msg } }
    valid = parseFloat(value) >= parseFloat(param);
    msg = valid ? '' : ("输入值最小为" + param);
    return { valid: valid, msg: msg }
  },
  /**
   * 整数格式
   */
  integerType: function (value, input) {
    var pattern = /^\d*$/;
    var valid = pattern.test(toString(value));
    var msg = valid ? '' : '请输入整数';
    return { valid: valid, msg: msg }
  },

  /**
   * URL格式
   */
  urlType: function (value) {
    /* eslint-disable max-len, no-useless-escape */
    var pattern = /^(https?\:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}[\/\?\#]?([\/\?\#][\w|\:|\/|\.|\-|\#|\!|\~|\%|\&|\+|\=|\?|\$]+)?$/i;
    var valid = pattern.test(toString(value));
    var msg = valid ? '' : 'URL 格式不正确';
    return { valid: valid, msg: msg }
  },

  /**
   * 自定义正则
   */
  pattern: function (value, param) {
    var valid = param.test(toString(value));
    var msg = valid ? '' : '格式不符合要求';
    return { valid: valid, msg: msg }
  }
};

var Validator = { validate: validate }

/**
 * 验证 value 是否符合规则
 * @param value {String} 要验证的值
 * @param rules {Object} 规则
 * @return {Object} 结果对象，有valid和msg两个字段
 */
function validate (value, rules) {
  if ( rules === void 0 ) rules = {};

  // msg 为自定义错误信息
  var msg = rules.msg;
  var pass = { valid: true };
  var isValueEmpty = isEmpty(value);

  // 非必填项且没有填写时，不进行校验
  if (!rules.required && isValueEmpty) { return pass }

  var results = Object.keys(rules)
    .filter(function (ruleName) { return canValidate(ruleName, rules[ruleName]); })
    .map(function (ruleName) { return checkSingleRule(ruleName, rules[ruleName], value, msg); });

  var failedResult = results.find(function (result) { return !result.valid; });
  return failedResult || pass
}

/**
 * 验证单条规则
 */
function checkSingleRule (ruleName, param, value, msg) {
  var validFunction = typeof param === 'function' ? param : ruleset[ruleName];
  var result = validFunction(value, param);
  if (!result.valid && msg) { // 验证不通过且有自定义消息
    if (typeof msg == 'string') { // 自定义消息为字符串时直接使用
      result.msg = msg;
    } else if (msg[ruleName]) { // 自定义消息为对象时，取出该类错误的消息
      result.msg = msg[ruleName];
    }
  }
  return result
}

/**
 * 给出的规则是否可验证
 * 条件：
 * 1. 非保留字，'msg' 用来指定自定义提示
 * 2. 内置或自定义规则
 */
function canValidate (ruleName, param) {
  var isReservedWord = ruleName === 'msg';
  var isBuiltinRule = typeof ruleset[ruleName] === 'function';
  var isCustomRule = typeof param === 'function';
  return !isReservedWord && (isBuiltinRule || isCustomRule)
}

/**
 * A Vue.js mixin to add validate functionality
 */
var validatable = {

  props: {
    rules: {
      type: Object,
      default: function (_) { return ({}); }
    }
  },

  data: function data () {
    return {
      // store validation result
      validity: {
        valid: true,
        msg: '',
        dirty: false
      },
      isValidatable: true
    }
  },

  inject: {
    '$form': { default: null },
    '$formItem': { default: null }
  },

  created: function created () {
    var hasRules = this.$options.props.rules || this.rules;
    if (!this.$options.props.value || !hasRules) {
      var msg = "Prop 'value' and 'rules' are required to use 'Validatable'.";
      throw new Error(msg)
    }
    var setDirty = function setDirty () {
      this.validity.dirty = true;
    };
    this.$on('input', setDirty);
    this.$on('change', setDirty);
  },

  mounted: function mounted () {
    var ref = this;
    var $form = ref.$form;
    var $formItem = ref.$formItem;
    if ($form) { $form.$emit('validatable-attached', this); }
    if ($formItem) { $formItem.$emit('validatable-attached', this); }
  },

  beforeDestroy: function beforeDestroy () {
    var ref = this;
    var $form = ref.$form;
    var $formItem = ref.$formItem;
    if ($form) { $form.$emit('validatable-detached', this); }
    if ($formItem) { $formItem.$emit('validatable-detached', this); }
  },

  watch: {
    value: function value () {
      if (this.validity.dirty) {
        Object.assign(this.validity, this.validate());
      }
    }
  },

  methods: {
    validate: function validate () {
      this.validity.dirty = true;
      var ref = this;
      var $formItem = ref.$formItem;
      var required = $formItem && $formItem.required;
      var rules = Object.assign({ required: required }, this.rules);
      if (!rules.msg) { rules.msg = {}; }
      if (typeof rules.msg === 'object' && !rules.msg.required) {
        var label = $formItem && $formItem.label ? $formItem.label : '';
        var action = this.$options.name === 'c-input' ? '填写' : '选择';
        rules.msg.required = "请" + action + (label.replace(/[:：]/, ''));
      }
      return Object.assign(
        this.validity,
        Validator.validate(this.value, rules)
      )
    },
    resetValidity: function resetValidity () {
      Object.assign(this.validity, {
        dirty: false,
        valid: true,
        msg: ''
      });
    }
  }
}

var name$1 = 'c-checkbox-group';
var pass = { valid: true, msg: '' };

// 最少选择X项
var minItems = function (value) {
  if (!this.minItems) { return pass }
  var valid = Array.isArray(value) && value.length >= this.minItems;
  var msg = valid ? '' : ("请至少选择" + (this.minItems) + "项");
  return { valid: valid, msg: msg }
};

// 最多选择X项
var maxItems = function (value) {
  if (!this.maxItems) { return pass }
  var valid = Array.isArray(value) && value.length <= this.maxItems;
  var msg = valid ? '' : ("最多可以选择" + (this.maxItems) + "项");
  return { valid: valid, msg: msg }
};

var props$1 = {
  value: {
    type: Array,
    default: function default$1 () { return [] }
  },
  minItems: Number,
  maxItems: Number,
  options: {
    type: Array,
    required: true,
    default: function default$2 () { return [] }
  }
};

var Mod12 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-checkbox-group"},[_vm._l((_vm.optionList),function(option,index){return _c('c-checkbox',{attrs:{"label":option.label,"disabled":option.disabled},on:{"change":function($event){_vm.onItemChange($event, index);}},model:{value:(_vm.isChecked[index]),callback:function ($$v) {_vm.$set(_vm.isChecked, index, $$v);},expression:"isChecked[index]"}})}),(!_vm.validity.valid)?_c('em',{staticClass:"c-error-msg"},[_vm._v(_vm._s(_vm.validity.msg))]):_vm._e()],2)},staticRenderFns: [],
  name: name$1,
  model: {
    event: 'change'
  },
  props: props$1,
  mixins: [validatable],
  inject: {
    $form: { default: null }
  },
  data: function data () {
    return {
      isChecked: []
    }
  },
  computed: {
    optionList: function optionList () {
      return this.options.map(function (item) {
        if (typeof item === 'string') {
          return {
            value: item,
            label: item
          }
        }

        if (item && typeof item === 'object') {
          if (item.hasOwnProperty('label') && item.hasOwnProperty('value')) {
            return item
          }
        }

        throw new TypeError('Type of option prop is invalid.')
      })
    }
  },
  created: function created () {
    Object.assign(this.rules, {
      minItems: minItems.bind(this),
      maxItems: maxItems.bind(this)
    });
    this.updateChecked();
    this.$watch('options', this.updateChecked);
    this.$watch('value', this.updateChecked);
  },
  methods: {
    updateChecked: function updateChecked () {
      var this$1 = this;

      var isChecked = this.optionList.map(function (option) {
        return this$1.value.indexOf(option.value) > -1
      });
      this.isChecked = isChecked;
    },

    onItemChange: function onItemChange (checked, index) {
      var isChecked = [].concat( this.isChecked );
      isChecked[index] = checked;

      var checkedValues = this.optionList
        .filter(function (_, i) { return isChecked[i]; })
        .map(function (option) { return option.value; });

      this.$emit('change', checkedValues);
    }
  }
}

/**
 * A Vue.js mixin to add reset functionality to form fields
 */
var resettable = {
  inject: {
    $form: { default: null }
  },

  data: function data () {
    return {
      initialValue: void 0,
      isResettable: true
    }
  },

  created: function created () {
    var this$1 = this;

    // skip inner components
    if (this.$parent.isResettable) { return }

    var ref = this.constructor.extendOptions;
    var model = ref.model;
    var prop = (model && model.prop) || 'value';
    var event = (model && model.event) || 'input';
    this.$prop = prop;
    this.$event = event;

    // listen form reset event
    if (this.$form) {
      this.$form.$on('reset', function (e) { return this$1.reset(); });
    }

    // remember initial value
    if (this.initialValue === void 0) {
      this.initialValue = this[this.$prop];
    }
  },

  methods: {
    reset: function reset () {
      this.$emit(this.$event, this.initialValue);
    }
  }
}

// import css
var name$2 = 'c-checkbox';
var props$2 = {
  value: Boolean,
  name: String,
  label: String,
  disabled: Boolean,
  size: String,
  indeterminate: Boolean
};

var Mod13 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"c-checkbox",class:_vm.classNames,on:{"change":_vm.onChange}},[_c('input',{ref:"input",attrs:{"type":"checkbox","name":_vm.name,"disabled":_vm.disabled},domProps:{"checked":_vm.value}}),_c('span',{staticClass:"c-checkbox__box"}),_c('span',{staticClass:"c-checkbox__label"},[_vm._v(_vm._s(_vm.label))])])},staticRenderFns: [],
  name: name$2,
  model: {
    event: 'change'
  },
  props: props$2,
  inject: {
    $form: { default: null }
  },
  mixins: [resettable, validatable],
  computed: {
    classNames: function classNames () {
      var ref = this;
      var size = ref.size;
      var $form = ref.$form;
      var actualSize = size || ($form && $form.size);
      return actualSize ? ("is-" + actualSize) : ''
    }
  },
  watch: {
    indeterminate: function indeterminate (newVal) {
      if (this.$refs.input) {
        this.$refs.input.indeterminate = Boolean(newVal);
      }
    }
  },
  mounted: function mounted () {
    if (this.$refs.input) {
      this.$refs.input.indeterminate = this.indeterminate;
    }
  },
  methods: {
    onChange: function onChange (e) {
      this.$emit('change', e.target.checked);
    }
  }
}

var Mod14 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"c-datepicker__range",class:_vm.className},[_c('div',{staticClass:"c-datepicker__content c-calendar"},[_c('c-dateheader',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.startMaxDate,"year":_vm.startYear,"month":_vm.startMonth,"monthshow":_vm.startMonthsShow},on:{"monthchange":_vm.startMonthChange,"yearchange":_vm.startYearChange,"monthshow":_vm.startMonthTableShow}}),_c('div',{staticClass:"c-calendar__body"},[(_vm.startMonthsShow)?_c('c-monthtable',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.startMaxDate,"year":_vm.startYear},on:{"change":_vm.startSelectMonth}}):_vm._e(),(!_vm.startMonthsShow)?_c('c-datetable',{attrs:{"type":"range","minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.startYear,"month":_vm.startMonth,"day":_vm.startDay,"start":_vm.start,"end":_vm.end,"range-obj":_vm.rangeObj},on:{"monthchange":_vm.startMonthChange,"yearchange":_vm.startYearChange,"change":_vm.selectDay,"rangeChange":_vm.onRangeChange}}):_vm._e()],1)],1),_c('div',{staticClass:"c-datepicker__content c-calendar"},[_c('c-dateheader',{attrs:{"minDate":_vm.endMinDate,"maxDate":_vm.maxDate,"year":_vm.endYear,"month":_vm.endMonth,"monthshow":_vm.endMonthsShow},on:{"monthchange":_vm.endMonthChange,"yearchange":_vm.endYearChange,"monthshow":_vm.endMonthTableShow}}),_c('div',{staticClass:"c-calendar__body"},[(_vm.endMonthsShow)?_c('c-monthtable',{attrs:{"minDate":_vm.endMinDate,"maxDate":_vm.maxDate,"year":_vm.endYear},on:{"change":_vm.endSelectMonth}}):_vm._e(),(!_vm.endMonthsShow)?_c('c-datetable',{attrs:{"type":"range","minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.endYear,"month":_vm.endMonth,"day":_vm.endDay,"start":_vm.start,"end":_vm.end,"range-obj":_vm.rangeObj},on:{"monthchange":_vm.endMonthChange,"yearchange":_vm.endYearChange,"change":_vm.selectDay,"rangeChange":_vm.onRangeChange}}):_vm._e()],1)],1),_c('p',{staticClass:"c-datepicker__text"},[_vm._v(_vm._s(_vm.start)+" 至 "+_vm._s(_vm.end))]),_c('div',{staticClass:"c-datepicker__btns"},[_c('c-button',{attrs:{"size":"sm","outline":"","primary":""},on:{"click":_vm.confirmRange}},[_vm._v("确定")]),_c('c-button',{attrs:{"size":"sm","outline":""},on:{"click":_vm.cancel}},[_vm._v("取消")])],1)])},staticRenderFns: [],
  name: 'c-daterange',
  props: {
    value: [Array, String],
    size: String,
    show: Boolean,
    minDate: {
      type: String,
      default: '1970-01-01'
    },
    maxDate: {
      type: String,
      default: '2099-12-31'
    },
    pattern: {
      type: String,
      default: 'yyyy-MM-dd'
    }
  },
  mixins: [Mixin],
  data: function data () {
    return {
      start: '',
      end: '',
      startYear: 1970,
      endYear: 1970,
      startMonth: 1,
      endMonth: 1,
      startDay: 1,
      endDay: 1,
      startMonthsShow: false,
      endMonthsShow: false,
      rangeObj: {
        endDate: '',
        selecting: true
      }
    }
  },
  created: function created () {
    var ref = this.value;
    var start = ref[0];
    var end = ref[1];
    this.start = start || '';
    this.end = end || '';
    this.updateDate();
  },
  watch: {
    show: function show (newVal) {
      this.resetDate();
    },
    value: function value (newVal) {
      this.resetDate();
    }
  },
  computed: {
    className: function className () {
      return this.size ? ("is-" + (this.size)) : 'md'
    },
    startMaxDate: function startMaxDate () {
      return new Date(this.endYear, this.endMonth, 0).format(this.pattern)
    },
    endMinDate: function endMinDate () {
      return new Date(this.startYear, this.startMonth + 1, 1).format(this.pattern)
    }
  },
  methods: {
    resetDate: function resetDate () {
      var ref = this.value;
      var start = ref[0];
      var end = ref[1];
      this.start = start;
      this.end = end;
      this.rangeObj = {
        endDate: '',
        selecting: true
      };
      this.updateDate();
    },
    updateDate: function updateDate () {
      var ref = this.syncDate(this.start);
      var startYear = ref[0];
      var startMonth = ref[1];
      var startDay = ref[2];
      if (!this.start) {
        this.startYear = new Date().getFullYear();
        this.startMonth = new Date().getMonth();
        this.startDay = '';
      } else {
        this.startYear = startYear;
        this.startMonth = startMonth;
        this.startDay = startDay;
      }
      var ref$1 = this.syncDate(this.end);
      var endYear = ref$1[0];
      var endMonth = ref$1[1];
      var endDay = ref$1[2];
      this.endYear = endYear || this.startYear;

      if (endMonth === this.startMonth) {
        var assign;
        (assign = this.updateMonth(this.endYear, endMonth, 1, 'plus'), this.endYear = assign[0], this.endMonth = assign[1]);
      } else if (!endMonth) {
        var assign$1;
        (assign$1 = this.updateMonth(this.endYear, this.startMonth, 1, 'plus'), this.endYear = assign$1[0], this.endMonth = assign$1[1]);
      } else {
        this.endMonth = endMonth;
      }

      this.endDay = endYear === this.startYear && endMonth === this.startMonth ? '' : endDay;
    },
    onRangeChange: function onRangeChange (obj) {
      this.rangeObj = obj.rangeObj;
    },
    syncDate: function syncDate (time) {
      var d = new Date(time);
      if (!isNaN(d.getTime())) {
        return [
          d.getFullYear(),
          d.getMonth(),
          d.getDate()
        ]
      }
      return [
        '',
        '',
        ''
      ]
    },
    startMonthChange: function startMonthChange (month) {
      this.startMonth = month;
    },
    startYearChange: function startYearChange (year) {
      this.startYear = year;
    },
    startMonthTableShow: function startMonthTableShow (show) {
      this.startMonthsShow = show;
    },
    startSelectMonth: function startSelectMonth (month) {
      this.startMonthsShow = false;
      this.startMonth = month;
      this.startDay = '';
    },
    selectDay: function selectDay (dateObj) {
      this.start = dateObj.start;
      this.end = dateObj.end;
      this.updateDate();
    },
    endMonthChange: function endMonthChange (month) {
      this.endMonth = month;
    },
    endYearChange: function endYearChange (year) {
      this.endYear = year;
    },
    endMonthTableShow: function endMonthTableShow (show) {
      this.endMonthsShow = show;
    },
    endSelectMonth: function endSelectMonth (month) {
      this.endMonthsShow = false;
      this.endMonth = month;
      this.endDay = '';
    },
    cancel: function cancel () {
      var assign;
      (assign = this.value, this.start = assign[0], this.end = assign[1]);
      this.$emit('change', this.value);
    },
    confirmRange: function confirmRange () {
      this.end = this.end || this.rangeObj.endDate;
      this.$emit('change', [this.start, this.end]);
    }
  }
}

var Mod15 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-datepicker",on:{"click":_vm.open}},[_c('c-icon',{staticClass:"c-datepicker__icon",attrs:{"name":"calendar"}}),(_vm.type == 'daterange')?_c('c-input',{attrs:{"placeholder":_vm.placeholder,"disabled":_vm.disabled,"width":"normal","size":_vm.size},on:{"change":_vm.dateChange},nativeOn:{"focusin":function($event){_vm.open($event);},"focusout":function($event){_vm.onBlur($event);}},model:{value:(_vm.daterange),callback:function ($$v) {_vm.daterange=$$v;},expression:"daterange"}}):(_vm.type == 'date')?_c('c-input',{attrs:{"size":_vm.size,"width":"normal","placeholder":_vm.placeholder,"disabled":_vm.disabled},on:{"change":_vm.dateChange},nativeOn:{"focusin":function($event){_vm.open($event);},"focusout":function($event){_vm.onBlur($event);}},model:{value:(_vm.date),callback:function ($$v) {_vm.date=$$v;},expression:"date"}}):_vm._e(),_c('div',{staticClass:"c-datepicker__panel"},[(_vm.type == 'date')?_c('c-calendar',{ref:"calendar",attrs:{"value":_vm.date,"show":_vm.isOpen,"size":_vm.size,"minDate":_vm.minDate,"maxDate":_vm.maxDate},on:{"update":_vm.setDate}}):_vm._e(),(_vm.type == 'daterange')?_c('div',{staticClass:"c-datepicker__body"},[_c('c-daterange',{attrs:{"value":_vm.date,"size":_vm.size,"show":_vm.isOpen},on:{"change":_vm.setDateRange}})],1):_vm._e()],1)],1)},staticRenderFns: [],
  name: 'c-datepicker',
  model: {
    event: 'change'
  },
  mixins: [resettable, validatable],
  props: {
    value: {
      type: String | Array,
      default: function default$1 () {
        return ''
      }
    },
    pattern: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    size: String,
    disabled: Boolean,
    type: {
      /* date, daterange */
      type: String,
      default: 'date'
    },
    placeholder: String,
    minDate: String,
    maxDate: String
  },

  computed: {
    daterange: function daterange () {
      if (this.type === 'date') { return [] }
      var ref = this.date;
      var start = ref[0];
      var end = ref[1];
      return !start && !end ? '' : (start + " 至 " + end)
    }
  },

  data: function data () {
    return {
      date: '',
      datepickerPanel: '',
      isOpen: false
    }
  },

  beforeDestroy: function beforeDestroy () {
    this.datepickerPanel.remove();
    window.removeEventListener('resize', this.resize, false);
  },

  watch: {
    isOpen: function isOpen () {
      if (this.isOpen) {
        this.resize();
        window.addEventListener('click', this.onBodyClick, true);
        window.addEventListener('keydown', this.onKeyDown, false);
      } else {
        window.removeEventListener('click', this.onBodyClick, true);
        window.removeEventListener('keydown', this.onKeyDown, false);
      }
    },
    value: function value (newVal) {
      if (newVal !== this.date) {
        this.date = newVal;
      }
    }
  },

  created: function created () {
    this.date = this.value;
  },

  mounted: function mounted () {
    if (typeof document === 'object') {
      this.datepickerPanel = document.querySelector('.c-datepicker__panel');
      document.body.appendChild(this.datepickerPanel);
      this.resize();
      window.addEventListener('resize', this.resize, false);
    }
  },
  methods: {
    open: function open () {
      if (this.disabled) { return }
      this.isOpen = true;
    },
    close: function close () {
      this.isOpen = false;
    },
    onBlur: function onBlur (e) {
      var focused = e.relatedTarget;
      if (focused) { this.close(); }
    },
    onKeyDown: function onKeyDown (e) {
      e.preventDefault();

      var keys = {
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      };
      var keyCode = e.keyCode;
      if (keyCode === keys.ESC) { this.close(); }
      if (keyCode === keys.ENTER && this.type === 'date') {
        var ref = this.$refs;
        var calendar = ref.calendar;
        var date = new Date(calendar.year, calendar.month, calendar.day).format(this.pattern);
        this.setDate(date);
      }
      if (keyCode === keys.UP) {
        this.$refs.calendar.updateDay(7, 'sub');
      } else if (keyCode === keys.DOWN) {
        this.$refs.calendar.updateDay(7, 'plus');
      } else if (keyCode === keys.LEFT) {
        this.$refs.calendar.updateDay(1, 'sub');
      } else if (keyCode === keys.RIGHT) {
        this.$refs.calendar.updateDay(1, 'plus');
      }
    },
    dateChange: function dateChange (value) {
      this.$emit('change', value);
    },
    onBodyClick: function onBodyClick (e) {
      var isInPicker = this.$el.contains(e.target);
      var isInPanel = this.datepickerPanel.contains(e.target);
      if (!isInPicker && !isInPanel) {
        this.close();
        this.$el.focus();
      }
    },
    setDateRange: function setDateRange (daterange) {
      this.date = daterange;
      this.$emit('change', this.date);
      this.close();
    },
    setDate: function setDate (date, notClose) {
      this.date = date;
      this.$emit('change', date);
      !notClose && this.close();
    },
    getStyle: function getStyle () {
      var clientRect = this.$el.getBoundingClientRect();
      var windowH = window.innerHeight;
      var marginTop = 2;
      var scrollHeight = document.body.scrollWidth > window.innerWidth ? 20 : 0;
      var droplistHeight = this.datepickerPanel.clientHeight;
      var defaultTop = clientRect.top + clientRect.height + marginTop + window.pageYOffset;
      var clientHeight = clientRect.height + marginTop;

      var clientY = clientRect.y;
      var compTop = windowH - droplistHeight - scrollHeight;
      var left = clientRect.left + window.pageXOffset;
      var top = droplistHeight + clientHeight + clientY + scrollHeight > windowH ? compTop : defaultTop;
      return ("\n        position: absolute;\n        top: " + top + "px;\n        left: " + left + "px;\n        z-index: 9;\n      ")
    },
    resize: function resize () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.datepickerPanel.style.cssText = this$1.getStyle();
      });
    }
  }
}

var Mod16 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-form-item",class:_vm.classNames},[(_vm.label || _vm.$slots.label)?_c('label',{staticClass:"c-form-item__label",style:(_vm.labelStyle)},[_vm._t("label",[_vm._v(_vm._s(_vm.label))])],2):_vm._e(),_c('div',{staticClass:"c-form-item__control",class:{ 'has-error': _vm.hasError }},[_vm._t("default"),_c('div',{staticClass:"c-form-item__error"},[_vm._v(_vm._s(_vm.errorMsg))])],2)])},staticRenderFns: [],
  name: 'c-form-item',
  provide: function provide () {
    return {
      '$formItem': this
    }
  },
  inject: {
    $form: { default: null }
  },
  props: {
    label: String,
    required: Boolean,
    flex: Boolean,
    labelWidth: String
  },
  data: function data () {
    return {
      validatable: null
    }
  },
  computed: {
    hasError: function hasError () {
      var ref = this;
      var validatable = ref.validatable;
      return validatable && !validatable.validity.valid
    },
    errorMsg: function errorMsg () {
      return this.hasError ? this.validatable.validity.msg : ''
    },
    classNames: function classNames () {
      var classNames = [];
      if (this.required) { classNames.push('is-required'); }
      if (this.flex) { classNames.push('is-flex'); }
      return classNames
    },
    actualLabelWidth: function actualLabelWidth () {
      if (this.labelWidth) { return this.labelWidth }
      return this.$form && this.$form.labelWidth
    },
    labelStyle: function labelStyle () {
      return {
        width: this.actualLabelWidth
      }
    }
  },
  created: function created () {
    var this$1 = this;

    this.$on('validatable-attached', function (v) {
      // skip child validatable if parent is validatable
      if (v.$parent.isValidatable) { return }
      this$1.validatable = v;
    });
    this.$on('validatable-detached', function (v) {
      this$1.validatable = null;
    });
  }
}

var block$1 = 'c-form';
var modifiers$1 = ['inline'];
var getClassName = toClassNames(block$1, modifiers$1);

var Mod17 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{staticClass:"c-form",class:_vm.classNames,on:{"submit":_vm.onSubmit}},[_vm._t("default")],2)},staticRenderFns: [],
  name: block$1,
  props: {
    inline: Boolean,
    labelWidth: String,
    size: String,
    width: String
  },
  provide: function provide () {
    return {
      '$form': this
    }
  },
  data: function data () {
    return {
      validatables: []
    }
  },
  computed: {
    classNames: function classNames () {
      var classes = getClassName.call(this);
      if (this.size) { classes.push(("is-" + (this.size))); }
      return classes
    }
  },
  created: function created () {
    var this$1 = this;

    var ref = this;
    var validatables = ref.validatables;
    this.$on('validatable-attached', function (v) { return validatables.push(v); });
    this.$on('validatable-detached', function (v) {
      var i = validatables.indexOf(v);
      this$1.validatables.splice(i, 1);
    });
  },
  methods: {
    onSubmit: function onSubmit (e) {
      this.$emit('submit', e);
    },
    isValid: function isValid () {
      return this.validatables
        .map(function (v) { return v.validate(); })
        .every(function (result) { return result.valid; })
    },
    resetValidity: function resetValidity () {
      this.validatables.forEach(function (v) { return v.resetValidity(); });
    },
    reset: function reset () {
      this.$emit('reset');
      this.resetValidity();
    }
  }
}

/**
 * multiply a quantity (with unit)
 */
function multiply (quatity, times) {
  var ref = /(-?\d+(?:\.\d+)?)(.*)/.exec(quatity) || [];
  var num = ref[1];
  var unit = ref[2];
  var timedNum = parseFloat(num) * times;
  return ("" + timedNum + unit)
}

var breakpoints = [ 'xs', 'sm', 'md', 'lg', 'xl' ];

var props$3 = breakpoints
  .map(function (bp) { return (bp + "-only"); })
  .concat(breakpoints)
  .concat(['order', 'span', 'offset', 'width', 'narrow']);

var getClassName$1 = function (values, media) {
  if (!values) { return [] }
  return values.split(/\s+/)
    .map(function (val) {
      var prefix = /^offset/.test(val) ? 'has' : 'is';
      return (prefix + "-" + val + "-" + media)
    })
};

var Mod18 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-box__item",class:_vm.classNames,style:(_vm.style)},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-box-item',
  props: props$3,
  computed: {

    /**
     * get class name list of the box item
     */
    classNames: function classNames () {
      var this$1 = this;

      var classNames = breakpoints
        .reduce(function (classNames, bp) {
          classNames.push.apply(classNames, getClassName$1(this$1[bp], bp));
          classNames.push.apply(classNames, getClassName$1(this$1[(bp + "Only")], (bp + "-only")));
          return classNames
        }, []);
      if (this.span) { classNames.push(("is-" + (this.span))); }
      if (this.offset) { classNames.push(("is-offset-" + (this.offset))); }
      if (this.width || this.narrow !== void 0) { classNames.push("is-narrow"); }
      return classNames
    },

    /**
     * set box item gap
     */
    style: function style () {
      var style = {};
      if (this.$parent.gap) {
        style.padding = multiply(this.$parent.gap, 0.5);
      }
      if (this.order) {
        style.order = this.order;
      }
      if (this.width) {
        style.width = this.width;
      }
      return style
    }

  },
  methods: {
  }
}

var Mod19 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-container",class:_vm.classNames},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-container',
  props: {
    size: String,
    align: String,
    noPadding: Boolean
  },
  computed: {
    classNames: function classNames () {
      var classNames = [];
      if (this.size) { classNames.push(("is-" + (this.size))); }
      if (this.align) { classNames.push(("is-" + (this.align))); }
      if (this.noPadding) { classNames.push("is-no-padding"); }
      return classNames
    }
  }
}

var breakpointProps = breakpoints
  .map(function (bp) { return (bp + "Only"); })
  .concat(breakpoints)
  .reduce(function (props, bp) {
    props[bp] = String;
    return props
  }, {});

var Mod20 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-box",class:_vm.classNames,style:(_vm.style)},[_vm._t("default")],2)},staticRenderFns: [],
  props: Object.assign({}, {gap: String,
    justify: String,
    align: String,
    fillHeight: Boolean},
    breakpointProps),
  name: 'c-box',
  computed: {
    style: function style () {
      var margin = this.gap ? multiply(this.gap, -0.5) : '';
      return { margin: margin }
    },
    classNames: function classNames () {
      var this$1 = this;

      var classNames = [];
      var ref = this;
      var justify = ref.justify;
      var align = ref.align;
      var fillHeight = ref.fillHeight;
      breakpoints.forEach(function (bp) {
        if (this$1[bp]) { classNames.push(("has-" + (this$1[bp]) + "-" + bp)); }
        var prop = bp + "Only";
        if (this$1[prop]) { classNames.push(("has-" + (this$1[prop]) + "-" + bp + "-only")); }
      });
      if (justify) { classNames.push(("is-justify-" + justify)); }
      if (align) { classNames.push(("is-align-" + align)); }
      if (fillHeight) { classNames.push("is-fill-height"); }
      return classNames
    }
  }
}

var featherIcons = [
{
  name: "activity",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-activity",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"22 12 18 12 15 21 9 3 6 12 2 12"}})])},
  staticRenderFns: []
}
,{
  name: "airplay",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-airplay",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"}}),_c('polygon',{attrs:{"points":"12 15 17 21 7 21 12 15"}})])},
  staticRenderFns: []
}
,{
  name: "alert-circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-alert-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"12","y1":"8","x2":"12","y2":"12"}}),_c('line',{attrs:{"x1":"12","y1":"16","x2":"12","y2":"16"}})])},
  staticRenderFns: []
}
,{
  name: "alert-octagon",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-alert-octagon",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}}),_c('line',{attrs:{"x1":"12","y1":"8","x2":"12","y2":"12"}}),_c('line',{attrs:{"x1":"12","y1":"16","x2":"12","y2":"16"}})])},
  staticRenderFns: []
}
,{
  name: "alert-triangle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-alert-triangle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}}),_c('line',{attrs:{"x1":"12","y1":"9","x2":"12","y2":"13"}}),_c('line',{attrs:{"x1":"12","y1":"17","x2":"12","y2":"17"}})])},
  staticRenderFns: []
}
,{
  name: "align-center",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-align-center",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"18","y1":"10","x2":"6","y2":"10"}}),_c('line',{attrs:{"x1":"21","y1":"6","x2":"3","y2":"6"}}),_c('line',{attrs:{"x1":"21","y1":"14","x2":"3","y2":"14"}}),_c('line',{attrs:{"x1":"18","y1":"18","x2":"6","y2":"18"}})])},
  staticRenderFns: []
}
,{
  name: "align-justify",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-align-justify",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"21","y1":"10","x2":"3","y2":"10"}}),_c('line',{attrs:{"x1":"21","y1":"6","x2":"3","y2":"6"}}),_c('line',{attrs:{"x1":"21","y1":"14","x2":"3","y2":"14"}}),_c('line',{attrs:{"x1":"21","y1":"18","x2":"3","y2":"18"}})])},
  staticRenderFns: []
}
,{
  name: "align-left",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-align-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"17","y1":"10","x2":"3","y2":"10"}}),_c('line',{attrs:{"x1":"21","y1":"6","x2":"3","y2":"6"}}),_c('line',{attrs:{"x1":"21","y1":"14","x2":"3","y2":"14"}}),_c('line',{attrs:{"x1":"17","y1":"18","x2":"3","y2":"18"}})])},
  staticRenderFns: []
}
,{
  name: "align-right",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-align-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"21","y1":"10","x2":"7","y2":"10"}}),_c('line',{attrs:{"x1":"21","y1":"6","x2":"3","y2":"6"}}),_c('line',{attrs:{"x1":"21","y1":"14","x2":"3","y2":"14"}}),_c('line',{attrs:{"x1":"21","y1":"18","x2":"7","y2":"18"}})])},
  staticRenderFns: []
}
,{
  name: "anchor",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-anchor",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"5","r":"3"}}),_c('line',{attrs:{"x1":"12","y1":"22","x2":"12","y2":"8"}}),_c('path',{attrs:{"d":"M5 12H2a10 10 0 0 0 20 0h-3"}})])},
  staticRenderFns: []
}
,{
  name: "aperture",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-aperture",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"14.31","y1":"8","x2":"20.05","y2":"17.94"}}),_c('line',{attrs:{"x1":"9.69","y1":"8","x2":"21.17","y2":"8"}}),_c('line',{attrs:{"x1":"7.38","y1":"12","x2":"13.12","y2":"2.06"}}),_c('line',{attrs:{"x1":"9.69","y1":"16","x2":"3.95","y2":"6.06"}}),_c('line',{attrs:{"x1":"14.31","y1":"16","x2":"2.83","y2":"16"}}),_c('line',{attrs:{"x1":"16.62","y1":"12","x2":"10.88","y2":"21.94"}})])},
  staticRenderFns: []
}
,{
  name: "arrow-down-circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-down-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('polyline',{attrs:{"points":"8 12 12 16 16 12"}}),_c('line',{attrs:{"x1":"12","y1":"8","x2":"12","y2":"16"}})])},
  staticRenderFns: []
}
,{
  name: "arrow-down-left",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-down-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"17","y1":"7","x2":"7","y2":"17"}}),_c('polyline',{attrs:{"points":"17 17 7 17 7 7"}})])},
  staticRenderFns: []
}
,{
  name: "arrow-down-right",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-down-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"7","y1":"7","x2":"17","y2":"17"}}),_c('polyline',{attrs:{"points":"17 7 17 17 7 17"}})])},
  staticRenderFns: []
}
,{
  name: "arrow-down",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-down",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"12","y1":"5","x2":"12","y2":"19"}}),_c('polyline',{attrs:{"points":"19 12 12 19 5 12"}})])},
  staticRenderFns: []
}
,{
  name: "arrow-left-circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-left-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('polyline',{attrs:{"points":"12 8 8 12 12 16"}}),_c('line',{attrs:{"x1":"16","y1":"12","x2":"8","y2":"12"}})])},
  staticRenderFns: []
}
,{
  name: "arrow-left",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"19","y1":"12","x2":"5","y2":"12"}}),_c('polyline',{attrs:{"points":"12 19 5 12 12 5"}})])},
  staticRenderFns: []
}
,{
  name: "arrow-right-circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-right-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('polyline',{attrs:{"points":"12 16 16 12 12 8"}}),_c('line',{attrs:{"x1":"8","y1":"12","x2":"16","y2":"12"}})])},
  staticRenderFns: []
}
,{
  name: "arrow-right",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"5","y1":"12","x2":"19","y2":"12"}}),_c('polyline',{attrs:{"points":"12 5 19 12 12 19"}})])},
  staticRenderFns: []
}
,{
  name: "arrow-up-circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-up-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('polyline',{attrs:{"points":"16 12 12 8 8 12"}}),_c('line',{attrs:{"x1":"12","y1":"16","x2":"12","y2":"8"}})])},
  staticRenderFns: []
}
,{
  name: "arrow-up-left",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-up-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"17","y1":"17","x2":"7","y2":"7"}}),_c('polyline',{attrs:{"points":"7 17 7 7 17 7"}})])},
  staticRenderFns: []
}
,{
  name: "arrow-up-right",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-up-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"7","y1":"17","x2":"17","y2":"7"}}),_c('polyline',{attrs:{"points":"7 7 17 7 17 17"}})])},
  staticRenderFns: []
}
,{
  name: "arrow-up",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-up",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"12","y1":"19","x2":"12","y2":"5"}}),_c('polyline',{attrs:{"points":"5 12 12 5 19 12"}})])},
  staticRenderFns: []
}
,{
  name: "at-sign",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-at-sign",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"4"}}),_c('path',{attrs:{"d":"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"}})])},
  staticRenderFns: []
}
,{
  name: "award",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-award",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"8","r":"7"}}),_c('polyline',{attrs:{"points":"8.21 13.89 7 23 12 20 17 23 15.79 13.88"}})])},
  staticRenderFns: []
}
,{
  name: "bar-chart-2",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-bar-chart-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"18","y1":"20","x2":"18","y2":"10"}}),_c('line',{attrs:{"x1":"12","y1":"20","x2":"12","y2":"4"}}),_c('line',{attrs:{"x1":"6","y1":"20","x2":"6","y2":"14"}})])},
  staticRenderFns: []
}
,{
  name: "bar-chart",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-bar-chart",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"12","y1":"20","x2":"12","y2":"10"}}),_c('line',{attrs:{"x1":"18","y1":"20","x2":"18","y2":"4"}}),_c('line',{attrs:{"x1":"6","y1":"20","x2":"6","y2":"16"}})])},
  staticRenderFns: []
}
,{
  name: "battery-charging",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-battery-charging",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"}}),_c('line',{attrs:{"x1":"23","y1":"13","x2":"23","y2":"11"}}),_c('polyline',{attrs:{"points":"11 6 7 12 13 12 9 18"}})])},
  staticRenderFns: []
}
,{
  name: "battery",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-battery",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"1","y":"6","width":"18","height":"12","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"23","y1":"13","x2":"23","y2":"11"}})])},
  staticRenderFns: []
}
,{
  name: "bell-off",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-bell-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M8.56 2.9A7 7 0 0 1 19 9v4m-2 4H2a3 3 0 0 0 3-3V9a7 7 0 0 1 .78-3.22M13.73 21a2 2 0 0 1-3.46 0"}}),_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}})])},
  staticRenderFns: []
}
,{
  name: "bell",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-bell",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"}})])},
  staticRenderFns: []
}
,{
  name: "bluetooth",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-bluetooth",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"}})])},
  staticRenderFns: []
}
,{
  name: "bold",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-bold",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"}}),_c('path',{attrs:{"d":"M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"}})])},
  staticRenderFns: []
}
,{
  name: "book-open",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-book-open",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}}),_c('path',{attrs:{"d":"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"}})])},
  staticRenderFns: []
}
,{
  name: "book",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-book",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"}}),_c('path',{attrs:{"d":"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"}})])},
  staticRenderFns: []
}
,{
  name: "bookmark",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-bookmark",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"}})])},
  staticRenderFns: []
}
,{
  name: "box",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-box",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"}}),_c('polyline',{attrs:{"points":"2.32 6.16 12 11 21.68 6.16"}}),_c('line',{attrs:{"x1":"12","y1":"22.76","x2":"12","y2":"11"}})])},
  staticRenderFns: []
}
,{
  name: "briefcase",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-briefcase",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"2","y":"7","width":"20","height":"14","rx":"2","ry":"2"}}),_c('path',{attrs:{"d":"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}})])},
  staticRenderFns: []
}
,{
  name: "calendar",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-calendar",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"4","width":"18","height":"18","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"16","y1":"2","x2":"16","y2":"6"}}),_c('line',{attrs:{"x1":"8","y1":"2","x2":"8","y2":"6"}}),_c('line',{attrs:{"x1":"3","y1":"10","x2":"21","y2":"10"}})])},
  staticRenderFns: []
}
,{
  name: "camera-off",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-camera-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}}),_c('path',{attrs:{"d":"M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"}})])},
  staticRenderFns: []
}
,{
  name: "camera",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-camera",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"}}),_c('circle',{attrs:{"cx":"12","cy":"13","r":"4"}})])},
  staticRenderFns: []
}
,{
  name: "cast",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cast",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"}}),_c('line',{attrs:{"x1":"2","y1":"20","x2":"2","y2":"20"}})])},
  staticRenderFns: []
}
,{
  name: "check-circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-check-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22 11.08V12a10 10 0 1 1-5.93-9.14"}}),_c('polyline',{attrs:{"points":"22 4 12 14.01 9 11.01"}})])},
  staticRenderFns: []
}
,{
  name: "check-square",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-check-square",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"9 11 12 14 22 4"}}),_c('path',{attrs:{"d":"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"}})])},
  staticRenderFns: []
}
,{
  name: "check",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-check",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"20 6 9 17 4 12"}})])},
  staticRenderFns: []
}
,{
  name: "chevron-down",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevron-down",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"6 9 12 15 18 9"}})])},
  staticRenderFns: []
}
,{
  name: "chevron-left",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevron-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"15 18 9 12 15 6"}})])},
  staticRenderFns: []
}
,{
  name: "chevron-right",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevron-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"9 18 15 12 9 6"}})])},
  staticRenderFns: []
}
,{
  name: "chevron-up",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevron-up",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"18 15 12 9 6 15"}})])},
  staticRenderFns: []
}
,{
  name: "chevrons-down",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevrons-down",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"7 13 12 18 17 13"}}),_c('polyline',{attrs:{"points":"7 6 12 11 17 6"}})])},
  staticRenderFns: []
}
,{
  name: "chevrons-left",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevrons-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"11 17 6 12 11 7"}}),_c('polyline',{attrs:{"points":"18 17 13 12 18 7"}})])},
  staticRenderFns: []
}
,{
  name: "chevrons-right",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevrons-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"13 17 18 12 13 7"}}),_c('polyline',{attrs:{"points":"6 17 11 12 6 7"}})])},
  staticRenderFns: []
}
,{
  name: "chevrons-up",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevrons-up",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"17 11 12 6 7 11"}}),_c('polyline',{attrs:{"points":"17 18 12 13 7 18"}})])},
  staticRenderFns: []
}
,{
  name: "chrome",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chrome",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('circle',{attrs:{"cx":"12","cy":"12","r":"4"}}),_c('line',{attrs:{"x1":"21.17","y1":"8","x2":"12","y2":"8"}}),_c('line',{attrs:{"x1":"3.95","y1":"6.06","x2":"8.54","y2":"14"}}),_c('line',{attrs:{"x1":"10.88","y1":"21.94","x2":"15.46","y2":"14"}})])},
  staticRenderFns: []
}
,{
  name: "circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}})])},
  staticRenderFns: []
}
,{
  name: "clipboard",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-clipboard",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}}),_c('rect',{attrs:{"x":"8","y":"2","width":"8","height":"4","rx":"1","ry":"1"}})])},
  staticRenderFns: []
}
,{
  name: "clock",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-clock",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('polyline',{attrs:{"points":"12 6 12 12 16 14"}})])},
  staticRenderFns: []
}
,{
  name: "cloud-drizzle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cloud-drizzle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"8","y1":"19","x2":"8","y2":"21"}}),_c('line',{attrs:{"x1":"8","y1":"13","x2":"8","y2":"15"}}),_c('line',{attrs:{"x1":"16","y1":"19","x2":"16","y2":"21"}}),_c('line',{attrs:{"x1":"16","y1":"13","x2":"16","y2":"15"}}),_c('line',{attrs:{"x1":"12","y1":"21","x2":"12","y2":"23"}}),_c('line',{attrs:{"x1":"12","y1":"15","x2":"12","y2":"17"}}),_c('path',{attrs:{"d":"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"}})])},
  staticRenderFns: []
}
,{
  name: "cloud-lightning",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cloud-lightning",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"}}),_c('polyline',{attrs:{"points":"13 11 9 17 15 17 11 23"}})])},
  staticRenderFns: []
}
,{
  name: "cloud-off",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cloud-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"}}),_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}})])},
  staticRenderFns: []
}
,{
  name: "cloud-rain",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cloud-rain",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"16","y1":"13","x2":"16","y2":"21"}}),_c('line',{attrs:{"x1":"8","y1":"13","x2":"8","y2":"21"}}),_c('line',{attrs:{"x1":"12","y1":"15","x2":"12","y2":"23"}}),_c('path',{attrs:{"d":"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"}})])},
  staticRenderFns: []
}
,{
  name: "cloud-snow",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cloud-snow",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"}}),_c('line',{attrs:{"x1":"8","y1":"16","x2":"8","y2":"16"}}),_c('line',{attrs:{"x1":"8","y1":"20","x2":"8","y2":"20"}}),_c('line',{attrs:{"x1":"12","y1":"18","x2":"12","y2":"18"}}),_c('line',{attrs:{"x1":"12","y1":"22","x2":"12","y2":"22"}}),_c('line',{attrs:{"x1":"16","y1":"16","x2":"16","y2":"16"}}),_c('line',{attrs:{"x1":"16","y1":"20","x2":"16","y2":"20"}})])},
  staticRenderFns: []
}
,{
  name: "cloud",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cloud",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"}})])},
  staticRenderFns: []
}
,{
  name: "code",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-code",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"16 18 22 12 16 6"}}),_c('polyline',{attrs:{"points":"8 6 2 12 8 18"}})])},
  staticRenderFns: []
}
,{
  name: "codepen",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-codepen",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"}}),_c('line',{attrs:{"x1":"12","y1":"22","x2":"12","y2":"15.5"}}),_c('polyline',{attrs:{"points":"22 8.5 12 15.5 2 8.5"}}),_c('polyline',{attrs:{"points":"2 15.5 12 8.5 22 15.5"}}),_c('line',{attrs:{"x1":"12","y1":"2","x2":"12","y2":"8.5"}})])},
  staticRenderFns: []
}
,{
  name: "command",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-command",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"}})])},
  staticRenderFns: []
}
,{
  name: "compass",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-compass",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('polygon',{attrs:{"points":"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"}})])},
  staticRenderFns: []
}
,{
  name: "copy",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-copy",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"9","y":"9","width":"13","height":"13","rx":"2","ry":"2"}}),_c('path',{attrs:{"d":"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"}})])},
  staticRenderFns: []
}
,{
  name: "corner-down-left",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-down-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"9 10 4 15 9 20"}}),_c('path',{attrs:{"d":"M20 4v7a4 4 0 0 1-4 4H4"}})])},
  staticRenderFns: []
}
,{
  name: "corner-down-right",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-down-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"15 10 20 15 15 20"}}),_c('path',{attrs:{"d":"M4 4v7a4 4 0 0 0 4 4h12"}})])},
  staticRenderFns: []
}
,{
  name: "corner-left-down",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-left-down",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"14 15 9 20 4 15"}}),_c('path',{attrs:{"d":"M20 4h-7a4 4 0 0 0-4 4v12"}})])},
  staticRenderFns: []
}
,{
  name: "corner-left-up",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-left-up",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"14 9 9 4 4 9"}}),_c('path',{attrs:{"d":"M20 20h-7a4 4 0 0 1-4-4V4"}})])},
  staticRenderFns: []
}
,{
  name: "corner-right-down",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-right-down",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"10 15 15 20 20 15"}}),_c('path',{attrs:{"d":"M4 4h7a4 4 0 0 1 4 4v12"}})])},
  staticRenderFns: []
}
,{
  name: "corner-right-up",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-right-up",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"10 9 15 4 20 9"}}),_c('path',{attrs:{"d":"M4 20h7a4 4 0 0 0 4-4V4"}})])},
  staticRenderFns: []
}
,{
  name: "corner-up-left",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-up-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"9 14 4 9 9 4"}}),_c('path',{attrs:{"d":"M20 20v-7a4 4 0 0 0-4-4H4"}})])},
  staticRenderFns: []
}
,{
  name: "corner-up-right",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-up-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"15 14 20 9 15 4"}}),_c('path',{attrs:{"d":"M4 20v-7a4 4 0 0 1 4-4h12"}})])},
  staticRenderFns: []
}
,{
  name: "cpu",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cpu",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"4","y":"4","width":"16","height":"16","rx":"2","ry":"2"}}),_c('rect',{attrs:{"x":"9","y":"9","width":"6","height":"6"}}),_c('line',{attrs:{"x1":"9","y1":"1","x2":"9","y2":"4"}}),_c('line',{attrs:{"x1":"15","y1":"1","x2":"15","y2":"4"}}),_c('line',{attrs:{"x1":"9","y1":"20","x2":"9","y2":"23"}}),_c('line',{attrs:{"x1":"15","y1":"20","x2":"15","y2":"23"}}),_c('line',{attrs:{"x1":"20","y1":"9","x2":"23","y2":"9"}}),_c('line',{attrs:{"x1":"20","y1":"14","x2":"23","y2":"14"}}),_c('line',{attrs:{"x1":"1","y1":"9","x2":"4","y2":"9"}}),_c('line',{attrs:{"x1":"1","y1":"14","x2":"4","y2":"14"}})])},
  staticRenderFns: []
}
,{
  name: "credit-card",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-credit-card",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"1","y":"4","width":"22","height":"16","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"1","y1":"10","x2":"23","y2":"10"}})])},
  staticRenderFns: []
}
,{
  name: "crop",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-crop",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M6.13 1L6 16a2 2 0 0 0 2 2h15"}}),_c('path',{attrs:{"d":"M1 6.13L16 6a2 2 0 0 1 2 2v15"}})])},
  staticRenderFns: []
}
,{
  name: "crosshair",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-crosshair",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"22","y1":"12","x2":"18","y2":"12"}}),_c('line',{attrs:{"x1":"6","y1":"12","x2":"2","y2":"12"}}),_c('line',{attrs:{"x1":"12","y1":"6","x2":"12","y2":"2"}}),_c('line',{attrs:{"x1":"12","y1":"22","x2":"12","y2":"18"}})])},
  staticRenderFns: []
}
,{
  name: "database",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-database",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('ellipse',{attrs:{"cx":"12","cy":"5","rx":"9","ry":"3"}}),_c('path',{attrs:{"d":"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}}),_c('path',{attrs:{"d":"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}})])},
  staticRenderFns: []
}
,{
  name: "delete",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-delete",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"}}),_c('line',{attrs:{"x1":"18","y1":"9","x2":"12","y2":"15"}}),_c('line',{attrs:{"x1":"12","y1":"9","x2":"18","y2":"15"}})])},
  staticRenderFns: []
}
,{
  name: "disc",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-disc",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('circle',{attrs:{"cx":"12","cy":"12","r":"3"}})])},
  staticRenderFns: []
}
,{
  name: "dollar-sign",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-dollar-sign",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"12","y1":"1","x2":"12","y2":"23"}}),_c('path',{attrs:{"d":"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"}})])},
  staticRenderFns: []
}
,{
  name: "download-cloud",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-download-cloud",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"8 17 12 21 16 17"}}),_c('line',{attrs:{"x1":"12","y1":"12","x2":"12","y2":"21"}}),_c('path',{attrs:{"d":"M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"}})])},
  staticRenderFns: []
}
,{
  name: "download",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-download",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}}),_c('polyline',{attrs:{"points":"7 10 12 15 17 10"}}),_c('line',{attrs:{"x1":"12","y1":"15","x2":"12","y2":"3"}})])},
  staticRenderFns: []
}
,{
  name: "droplet",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-droplet",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"}})])},
  staticRenderFns: []
}
,{
  name: "edit-2",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-edit-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"16 3 21 8 8 21 3 21 3 16 16 3"}})])},
  staticRenderFns: []
}
,{
  name: "edit-3",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-edit-3",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"14 2 18 6 7 17 3 17 3 13 14 2"}}),_c('line',{attrs:{"x1":"3","y1":"22","x2":"21","y2":"22"}})])},
  staticRenderFns: []
}
,{
  name: "edit",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-edit",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"}}),_c('polygon',{attrs:{"points":"18 2 22 6 12 16 8 16 8 12 18 2"}})])},
  staticRenderFns: []
}
,{
  name: "external-link",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-external-link",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}}),_c('polyline',{attrs:{"points":"15 3 21 3 21 9"}}),_c('line',{attrs:{"x1":"10","y1":"14","x2":"21","y2":"3"}})])},
  staticRenderFns: []
}
,{
  name: "eye-off",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-eye-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}}),_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}})])},
  staticRenderFns: []
}
,{
  name: "eye",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-eye",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}}),_c('circle',{attrs:{"cx":"12","cy":"12","r":"3"}})])},
  staticRenderFns: []
}
,{
  name: "facebook",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-facebook",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}})])},
  staticRenderFns: []
}
,{
  name: "fast-forward",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-fast-forward",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"13 19 22 12 13 5 13 19"}}),_c('polygon',{attrs:{"points":"2 19 11 12 2 5 2 19"}})])},
  staticRenderFns: []
}
,{
  name: "feather",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-feather",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"}}),_c('line',{attrs:{"x1":"16","y1":"8","x2":"2","y2":"22"}}),_c('line',{attrs:{"x1":"17","y1":"15","x2":"9","y2":"15"}})])},
  staticRenderFns: []
}
,{
  name: "file-minus",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-file-minus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}}),_c('polyline',{attrs:{"points":"14 2 14 8 20 8"}}),_c('line',{attrs:{"x1":"9","y1":"15","x2":"15","y2":"15"}})])},
  staticRenderFns: []
}
,{
  name: "file-plus",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-file-plus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}}),_c('polyline',{attrs:{"points":"14 2 14 8 20 8"}}),_c('line',{attrs:{"x1":"12","y1":"18","x2":"12","y2":"12"}}),_c('line',{attrs:{"x1":"9","y1":"15","x2":"15","y2":"15"}})])},
  staticRenderFns: []
}
,{
  name: "file-text",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-file-text",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}}),_c('polyline',{attrs:{"points":"14 2 14 8 20 8"}}),_c('line',{attrs:{"x1":"16","y1":"13","x2":"8","y2":"13"}}),_c('line',{attrs:{"x1":"16","y1":"17","x2":"8","y2":"17"}}),_c('polyline',{attrs:{"points":"10 9 9 9 8 9"}})])},
  staticRenderFns: []
}
,{
  name: "file",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-file",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}}),_c('polyline',{attrs:{"points":"13 2 13 9 20 9"}})])},
  staticRenderFns: []
}
,{
  name: "film",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-film",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"2","y":"2","width":"20","height":"20","rx":"2.18","ry":"2.18"}}),_c('line',{attrs:{"x1":"7","y1":"2","x2":"7","y2":"22"}}),_c('line',{attrs:{"x1":"17","y1":"2","x2":"17","y2":"22"}}),_c('line',{attrs:{"x1":"2","y1":"12","x2":"22","y2":"12"}}),_c('line',{attrs:{"x1":"2","y1":"7","x2":"7","y2":"7"}}),_c('line',{attrs:{"x1":"2","y1":"17","x2":"7","y2":"17"}}),_c('line',{attrs:{"x1":"17","y1":"17","x2":"22","y2":"17"}}),_c('line',{attrs:{"x1":"17","y1":"7","x2":"22","y2":"7"}})])},
  staticRenderFns: []
}
,{
  name: "filter",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-filter",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"}})])},
  staticRenderFns: []
}
,{
  name: "flag",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-flag",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}}),_c('line',{attrs:{"x1":"4","y1":"22","x2":"4","y2":"15"}})])},
  staticRenderFns: []
}
,{
  name: "folder-minus",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-folder-minus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"}}),_c('line',{attrs:{"x1":"9","y1":"14","x2":"15","y2":"14"}})])},
  staticRenderFns: []
}
,{
  name: "folder-plus",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-folder-plus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"}}),_c('line',{attrs:{"x1":"12","y1":"11","x2":"12","y2":"17"}}),_c('line',{attrs:{"x1":"9","y1":"14","x2":"15","y2":"14"}})])},
  staticRenderFns: []
}
,{
  name: "folder",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-folder",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"}})])},
  staticRenderFns: []
}
,{
  name: "git-branch",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-git-branch",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"6","y1":"3","x2":"6","y2":"15"}}),_c('circle',{attrs:{"cx":"18","cy":"6","r":"3"}}),_c('circle',{attrs:{"cx":"6","cy":"18","r":"3"}}),_c('path',{attrs:{"d":"M18 9a9 9 0 0 1-9 9"}})])},
  staticRenderFns: []
}
,{
  name: "git-commit",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-git-commit",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"4"}}),_c('line',{attrs:{"x1":"1.05","y1":"12","x2":"7","y2":"12"}}),_c('line',{attrs:{"x1":"17.01","y1":"12","x2":"22.96","y2":"12"}})])},
  staticRenderFns: []
}
,{
  name: "git-merge",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-git-merge",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"18","cy":"18","r":"3"}}),_c('circle',{attrs:{"cx":"6","cy":"6","r":"3"}}),_c('path',{attrs:{"d":"M6 21V9a9 9 0 0 0 9 9"}})])},
  staticRenderFns: []
}
,{
  name: "git-pull-request",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-git-pull-request",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"18","cy":"18","r":"3"}}),_c('circle',{attrs:{"cx":"6","cy":"6","r":"3"}}),_c('path',{attrs:{"d":"M13 6h3a2 2 0 0 1 2 2v7"}}),_c('line',{attrs:{"x1":"6","y1":"9","x2":"6","y2":"21"}})])},
  staticRenderFns: []
}
,{
  name: "github",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-github",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}})])},
  staticRenderFns: []
}
,{
  name: "gitlab",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-gitlab",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"}})])},
  staticRenderFns: []
}
,{
  name: "globe",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-globe",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"2","y1":"12","x2":"22","y2":"12"}}),_c('path',{attrs:{"d":"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"}})])},
  staticRenderFns: []
}
,{
  name: "grid",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-grid",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"7","height":"7"}}),_c('rect',{attrs:{"x":"14","y":"3","width":"7","height":"7"}}),_c('rect',{attrs:{"x":"14","y":"14","width":"7","height":"7"}}),_c('rect',{attrs:{"x":"3","y":"14","width":"7","height":"7"}})])},
  staticRenderFns: []
}
,{
  name: "hard-drive",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-hard-drive",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"22","y1":"12","x2":"2","y2":"12"}}),_c('path',{attrs:{"d":"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}}),_c('line',{attrs:{"x1":"6","y1":"16","x2":"6","y2":"16"}}),_c('line',{attrs:{"x1":"10","y1":"16","x2":"10","y2":"16"}})])},
  staticRenderFns: []
}
,{
  name: "hash",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-hash",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"4","y1":"9","x2":"20","y2":"9"}}),_c('line',{attrs:{"x1":"4","y1":"15","x2":"20","y2":"15"}}),_c('line',{attrs:{"x1":"10","y1":"3","x2":"8","y2":"21"}}),_c('line',{attrs:{"x1":"16","y1":"3","x2":"14","y2":"21"}})])},
  staticRenderFns: []
}
,{
  name: "headphones",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-headphones",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M3 18v-6a9 9 0 0 1 18 0v6"}}),_c('path',{attrs:{"d":"M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"}})])},
  staticRenderFns: []
}
,{
  name: "heart",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-heart",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"}})])},
  staticRenderFns: []
}
,{
  name: "help-circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-help-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}}),_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"12","y1":"17","x2":"12","y2":"17"}})])},
  staticRenderFns: []
}
,{
  name: "home",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-home",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}}),_c('polyline',{attrs:{"points":"9 22 9 12 15 12 15 22"}})])},
  staticRenderFns: []
}
,{
  name: "image",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-image",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}}),_c('circle',{attrs:{"cx":"8.5","cy":"8.5","r":"1.5"}}),_c('polyline',{attrs:{"points":"21 15 16 10 5 21"}})])},
  staticRenderFns: []
}
,{
  name: "inbox",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-inbox",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"22 12 16 12 14 15 10 15 8 12 2 12"}}),_c('path',{attrs:{"d":"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}})])},
  staticRenderFns: []
}
,{
  name: "info",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-info",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"12","y1":"16","x2":"12","y2":"12"}}),_c('line',{attrs:{"x1":"12","y1":"8","x2":"12","y2":"8"}})])},
  staticRenderFns: []
}
,{
  name: "instagram",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-instagram",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"2","y":"2","width":"20","height":"20","rx":"5","ry":"5"}}),_c('path',{attrs:{"d":"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}}),_c('line',{attrs:{"x1":"17.5","y1":"6.5","x2":"17.5","y2":"6.5"}})])},
  staticRenderFns: []
}
,{
  name: "italic",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-italic",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"19","y1":"4","x2":"10","y2":"4"}}),_c('line',{attrs:{"x1":"14","y1":"20","x2":"5","y2":"20"}}),_c('line',{attrs:{"x1":"15","y1":"4","x2":"9","y2":"20"}})])},
  staticRenderFns: []
}
,{
  name: "layers",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-layers",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"12 2 2 7 12 12 22 7 12 2"}}),_c('polyline',{attrs:{"points":"2 17 12 22 22 17"}}),_c('polyline',{attrs:{"points":"2 12 12 17 22 12"}})])},
  staticRenderFns: []
}
,{
  name: "layout",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-layout",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"3","y1":"9","x2":"21","y2":"9"}}),_c('line',{attrs:{"x1":"9","y1":"21","x2":"9","y2":"9"}})])},
  staticRenderFns: []
}
,{
  name: "life-buoy",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-life-buoy",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('circle',{attrs:{"cx":"12","cy":"12","r":"4"}}),_c('line',{attrs:{"x1":"4.93","y1":"4.93","x2":"9.17","y2":"9.17"}}),_c('line',{attrs:{"x1":"14.83","y1":"14.83","x2":"19.07","y2":"19.07"}}),_c('line',{attrs:{"x1":"14.83","y1":"9.17","x2":"19.07","y2":"4.93"}}),_c('line',{attrs:{"x1":"14.83","y1":"9.17","x2":"18.36","y2":"5.64"}}),_c('line',{attrs:{"x1":"4.93","y1":"19.07","x2":"9.17","y2":"14.83"}})])},
  staticRenderFns: []
}
,{
  name: "link-2",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-link-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"}}),_c('line',{attrs:{"x1":"8","y1":"12","x2":"16","y2":"12"}})])},
  staticRenderFns: []
}
,{
  name: "link",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-link",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}}),_c('path',{attrs:{"d":"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}})])},
  staticRenderFns: []
}
,{
  name: "linkedin",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-linkedin",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}}),_c('rect',{attrs:{"x":"2","y":"9","width":"4","height":"12"}}),_c('circle',{attrs:{"cx":"4","cy":"4","r":"2"}})])},
  staticRenderFns: []
}
,{
  name: "list",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-list",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"8","y1":"6","x2":"21","y2":"6"}}),_c('line',{attrs:{"x1":"8","y1":"12","x2":"21","y2":"12"}}),_c('line',{attrs:{"x1":"8","y1":"18","x2":"21","y2":"18"}}),_c('line',{attrs:{"x1":"3","y1":"6","x2":"3","y2":"6"}}),_c('line',{attrs:{"x1":"3","y1":"12","x2":"3","y2":"12"}}),_c('line',{attrs:{"x1":"3","y1":"18","x2":"3","y2":"18"}})])},
  staticRenderFns: []
}
,{
  name: "loader",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-loader",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"12","y1":"2","x2":"12","y2":"6"}}),_c('line',{attrs:{"x1":"12","y1":"18","x2":"12","y2":"22"}}),_c('line',{attrs:{"x1":"4.93","y1":"4.93","x2":"7.76","y2":"7.76"}}),_c('line',{attrs:{"x1":"16.24","y1":"16.24","x2":"19.07","y2":"19.07"}}),_c('line',{attrs:{"x1":"2","y1":"12","x2":"6","y2":"12"}}),_c('line',{attrs:{"x1":"18","y1":"12","x2":"22","y2":"12"}}),_c('line',{attrs:{"x1":"4.93","y1":"19.07","x2":"7.76","y2":"16.24"}}),_c('line',{attrs:{"x1":"16.24","y1":"7.76","x2":"19.07","y2":"4.93"}})])},
  staticRenderFns: []
}
,{
  name: "lock",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-lock",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"11","width":"18","height":"11","rx":"2","ry":"2"}}),_c('path',{attrs:{"d":"M7 11V7a5 5 0 0 1 10 0v4"}})])},
  staticRenderFns: []
}
,{
  name: "log-in",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-log-in",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"}}),_c('polyline',{attrs:{"points":"10 17 15 12 10 7"}}),_c('line',{attrs:{"x1":"15","y1":"12","x2":"3","y2":"12"}})])},
  staticRenderFns: []
}
,{
  name: "log-out",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-log-out",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}}),_c('polyline',{attrs:{"points":"16 17 21 12 16 7"}}),_c('line',{attrs:{"x1":"21","y1":"12","x2":"9","y2":"12"}})])},
  staticRenderFns: []
}
,{
  name: "mail",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-mail",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}}),_c('polyline',{attrs:{"points":"22,6 12,13 2,6"}})])},
  staticRenderFns: []
}
,{
  name: "map-pin",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-map-pin",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}}),_c('circle',{attrs:{"cx":"12","cy":"10","r":"3"}})])},
  staticRenderFns: []
}
,{
  name: "map",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-map",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"}}),_c('line',{attrs:{"x1":"8","y1":"2","x2":"8","y2":"18"}}),_c('line',{attrs:{"x1":"16","y1":"6","x2":"16","y2":"22"}})])},
  staticRenderFns: []
}
,{
  name: "maximize-2",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-maximize-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"15 3 21 3 21 9"}}),_c('polyline',{attrs:{"points":"9 21 3 21 3 15"}}),_c('line',{attrs:{"x1":"21","y1":"3","x2":"14","y2":"10"}}),_c('line',{attrs:{"x1":"3","y1":"21","x2":"10","y2":"14"}})])},
  staticRenderFns: []
}
,{
  name: "maximize",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-maximize",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"}})])},
  staticRenderFns: []
}
,{
  name: "menu",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-menu",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"3","y1":"12","x2":"21","y2":"12"}}),_c('line',{attrs:{"x1":"3","y1":"6","x2":"21","y2":"6"}}),_c('line',{attrs:{"x1":"3","y1":"18","x2":"21","y2":"18"}})])},
  staticRenderFns: []
}
,{
  name: "message-circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-message-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"}})])},
  staticRenderFns: []
}
,{
  name: "message-square",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-message-square",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}})])},
  staticRenderFns: []
}
,{
  name: "mic-off",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-mic-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}}),_c('path',{attrs:{"d":"M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"}}),_c('path',{attrs:{"d":"M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"}}),_c('line',{attrs:{"x1":"12","y1":"19","x2":"12","y2":"23"}}),_c('line',{attrs:{"x1":"8","y1":"23","x2":"16","y2":"23"}})])},
  staticRenderFns: []
}
,{
  name: "mic",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-mic",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"}}),_c('path',{attrs:{"d":"M19 10v2a7 7 0 0 1-14 0v-2"}}),_c('line',{attrs:{"x1":"12","y1":"19","x2":"12","y2":"23"}}),_c('line',{attrs:{"x1":"8","y1":"23","x2":"16","y2":"23"}})])},
  staticRenderFns: []
}
,{
  name: "minimize-2",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-minimize-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"4 14 10 14 10 20"}}),_c('polyline',{attrs:{"points":"20 10 14 10 14 4"}}),_c('line',{attrs:{"x1":"14","y1":"10","x2":"21","y2":"3"}}),_c('line',{attrs:{"x1":"3","y1":"21","x2":"10","y2":"14"}})])},
  staticRenderFns: []
}
,{
  name: "minimize",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-minimize",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"}})])},
  staticRenderFns: []
}
,{
  name: "minus-circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-minus-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"8","y1":"12","x2":"16","y2":"12"}})])},
  staticRenderFns: []
}
,{
  name: "minus-square",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-minus-square",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"8","y1":"12","x2":"16","y2":"12"}})])},
  staticRenderFns: []
}
,{
  name: "minus",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-minus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"5","y1":"12","x2":"19","y2":"12"}})])},
  staticRenderFns: []
}
,{
  name: "monitor",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-monitor",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"2","y":"3","width":"20","height":"14","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"8","y1":"21","x2":"16","y2":"21"}}),_c('line',{attrs:{"x1":"12","y1":"17","x2":"12","y2":"21"}})])},
  staticRenderFns: []
}
,{
  name: "moon",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-moon",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"}})])},
  staticRenderFns: []
}
,{
  name: "more-horizontal",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-more-horizontal",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"1"}}),_c('circle',{attrs:{"cx":"19","cy":"12","r":"1"}}),_c('circle',{attrs:{"cx":"5","cy":"12","r":"1"}})])},
  staticRenderFns: []
}
,{
  name: "more-vertical",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-more-vertical",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"1"}}),_c('circle',{attrs:{"cx":"12","cy":"5","r":"1"}}),_c('circle',{attrs:{"cx":"12","cy":"19","r":"1"}})])},
  staticRenderFns: []
}
,{
  name: "move",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-move",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"5 9 2 12 5 15"}}),_c('polyline',{attrs:{"points":"9 5 12 2 15 5"}}),_c('polyline',{attrs:{"points":"15 19 12 22 9 19"}}),_c('polyline',{attrs:{"points":"19 9 22 12 19 15"}}),_c('line',{attrs:{"x1":"2","y1":"12","x2":"22","y2":"12"}}),_c('line',{attrs:{"x1":"12","y1":"2","x2":"12","y2":"22"}})])},
  staticRenderFns: []
}
,{
  name: "music",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-music",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M9 17H5a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm12-2h-4a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"}}),_c('polyline',{attrs:{"points":"9 17 9 5 21 3 21 15"}})])},
  staticRenderFns: []
}
,{
  name: "navigation-2",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-navigation-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"12 2 19 21 12 17 5 21 12 2"}})])},
  staticRenderFns: []
}
,{
  name: "navigation",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-navigation",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"3 11 22 2 13 21 11 13 3 11"}})])},
  staticRenderFns: []
}
,{
  name: "octagon",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-octagon",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}})])},
  staticRenderFns: []
}
,{
  name: "package",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-package",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"}}),_c('polyline',{attrs:{"points":"2.32 6.16 12 11 21.68 6.16"}}),_c('line',{attrs:{"x1":"12","y1":"22.76","x2":"12","y2":"11"}}),_c('line',{attrs:{"x1":"7","y1":"3.5","x2":"17","y2":"8.5"}})])},
  staticRenderFns: []
}
,{
  name: "paperclip",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-paperclip",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"}})])},
  staticRenderFns: []
}
,{
  name: "pause-circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-pause-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"10","y1":"15","x2":"10","y2":"9"}}),_c('line',{attrs:{"x1":"14","y1":"15","x2":"14","y2":"9"}})])},
  staticRenderFns: []
}
,{
  name: "pause",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-pause",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"6","y":"4","width":"4","height":"16"}}),_c('rect',{attrs:{"x":"14","y":"4","width":"4","height":"16"}})])},
  staticRenderFns: []
}
,{
  name: "percent",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-percent",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"19","y1":"5","x2":"5","y2":"19"}}),_c('circle',{attrs:{"cx":"6.5","cy":"6.5","r":"2.5"}}),_c('circle',{attrs:{"cx":"17.5","cy":"17.5","r":"2.5"}})])},
  staticRenderFns: []
}
,{
  name: "phone-call",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-phone-call",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}})])},
  staticRenderFns: []
}
,{
  name: "phone-forwarded",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-phone-forwarded",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"19 1 23 5 19 9"}}),_c('line',{attrs:{"x1":"15","y1":"5","x2":"23","y2":"5"}}),_c('path',{attrs:{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}})])},
  staticRenderFns: []
}
,{
  name: "phone-incoming",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-phone-incoming",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"16 2 16 8 22 8"}}),_c('line',{attrs:{"x1":"23","y1":"1","x2":"16","y2":"8"}}),_c('path',{attrs:{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}})])},
  staticRenderFns: []
}
,{
  name: "phone-missed",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-phone-missed",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"23","y1":"1","x2":"17","y2":"7"}}),_c('line',{attrs:{"x1":"17","y1":"1","x2":"23","y2":"7"}}),_c('path',{attrs:{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}})])},
  staticRenderFns: []
}
,{
  name: "phone-off",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-phone-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"}}),_c('line',{attrs:{"x1":"23","y1":"1","x2":"1","y2":"23"}})])},
  staticRenderFns: []
}
,{
  name: "phone-outgoing",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-phone-outgoing",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"23 7 23 1 17 1"}}),_c('line',{attrs:{"x1":"16","y1":"8","x2":"23","y2":"1"}}),_c('path',{attrs:{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}})])},
  staticRenderFns: []
}
,{
  name: "phone",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-phone",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}})])},
  staticRenderFns: []
}
,{
  name: "pie-chart",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-pie-chart",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21.21 15.89A10 10 0 1 1 8 2.83"}}),_c('path',{attrs:{"d":"M22 12A10 10 0 0 0 12 2v10z"}})])},
  staticRenderFns: []
}
,{
  name: "play-circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-play-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('polygon',{attrs:{"points":"10 8 16 12 10 16 10 8"}})])},
  staticRenderFns: []
}
,{
  name: "play",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-play",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"5 3 19 12 5 21 5 3"}})])},
  staticRenderFns: []
}
,{
  name: "plus-circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-plus-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"12","y1":"8","x2":"12","y2":"16"}}),_c('line',{attrs:{"x1":"8","y1":"12","x2":"16","y2":"12"}})])},
  staticRenderFns: []
}
,{
  name: "plus-square",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-plus-square",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"12","y1":"8","x2":"12","y2":"16"}}),_c('line',{attrs:{"x1":"8","y1":"12","x2":"16","y2":"12"}})])},
  staticRenderFns: []
}
,{
  name: "plus",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-plus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"12","y1":"5","x2":"12","y2":"19"}}),_c('line',{attrs:{"x1":"5","y1":"12","x2":"19","y2":"12"}})])},
  staticRenderFns: []
}
,{
  name: "pocket",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-pocket",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"}}),_c('polyline',{attrs:{"points":"8 10 12 14 16 10"}})])},
  staticRenderFns: []
}
,{
  name: "power",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-power",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M18.36 6.64a9 9 0 1 1-12.73 0"}}),_c('line',{attrs:{"x1":"12","y1":"2","x2":"12","y2":"12"}})])},
  staticRenderFns: []
}
,{
  name: "printer",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-printer",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"6 9 6 2 18 2 18 9"}}),_c('path',{attrs:{"d":"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}}),_c('rect',{attrs:{"x":"6","y":"14","width":"12","height":"8"}})])},
  staticRenderFns: []
}
,{
  name: "radio",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-radio",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"2"}}),_c('path',{attrs:{"d":"M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"}})])},
  staticRenderFns: []
}
,{
  name: "refresh-ccw",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-refresh-ccw",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"1 4 1 10 7 10"}}),_c('polyline',{attrs:{"points":"23 20 23 14 17 14"}}),_c('path',{attrs:{"d":"M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"}})])},
  staticRenderFns: []
}
,{
  name: "refresh-cw",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-refresh-cw",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"23 4 23 10 17 10"}}),_c('polyline',{attrs:{"points":"1 20 1 14 7 14"}}),_c('path',{attrs:{"d":"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"}})])},
  staticRenderFns: []
}
,{
  name: "repeat",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-repeat",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"17 1 21 5 17 9"}}),_c('path',{attrs:{"d":"M3 11V9a4 4 0 0 1 4-4h14"}}),_c('polyline',{attrs:{"points":"7 23 3 19 7 15"}}),_c('path',{attrs:{"d":"M21 13v2a4 4 0 0 1-4 4H3"}})])},
  staticRenderFns: []
}
,{
  name: "rewind",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-rewind",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"11 19 2 12 11 5 11 19"}}),_c('polygon',{attrs:{"points":"22 19 13 12 22 5 22 19"}})])},
  staticRenderFns: []
}
,{
  name: "rotate-ccw",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-rotate-ccw",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"1 4 1 10 7 10"}}),_c('path',{attrs:{"d":"M3.51 15a9 9 0 1 0 2.13-9.36L1 10"}})])},
  staticRenderFns: []
}
,{
  name: "rotate-cw",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-rotate-cw",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"23 4 23 10 17 10"}}),_c('path',{attrs:{"d":"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"}})])},
  staticRenderFns: []
}
,{
  name: "rss",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-rss",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M4 11a9 9 0 0 1 9 9"}}),_c('path',{attrs:{"d":"M4 4a16 16 0 0 1 16 16"}}),_c('circle',{attrs:{"cx":"5","cy":"19","r":"1"}})])},
  staticRenderFns: []
}
,{
  name: "save",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-save",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"}}),_c('polyline',{attrs:{"points":"17 21 17 13 7 13 7 21"}}),_c('polyline',{attrs:{"points":"7 3 7 8 15 8"}})])},
  staticRenderFns: []
}
,{
  name: "scissors",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-scissors",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"6","cy":"6","r":"3"}}),_c('circle',{attrs:{"cx":"6","cy":"18","r":"3"}}),_c('line',{attrs:{"x1":"20","y1":"4","x2":"8.12","y2":"15.88"}}),_c('line',{attrs:{"x1":"14.47","y1":"14.48","x2":"20","y2":"20"}}),_c('line',{attrs:{"x1":"8.12","y1":"8.12","x2":"12","y2":"12"}})])},
  staticRenderFns: []
}
,{
  name: "search",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-search",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"11","cy":"11","r":"8"}}),_c('line',{attrs:{"x1":"21","y1":"21","x2":"16.65","y2":"16.65"}})])},
  staticRenderFns: []
}
,{
  name: "send",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-send",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"22","y1":"2","x2":"11","y2":"13"}}),_c('polygon',{attrs:{"points":"22 2 15 22 11 13 2 9 22 2"}})])},
  staticRenderFns: []
}
,{
  name: "server",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-server",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"2","y":"2","width":"20","height":"8","rx":"2","ry":"2"}}),_c('rect',{attrs:{"x":"2","y":"14","width":"20","height":"8","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"6","y1":"6","x2":"6","y2":"6"}}),_c('line',{attrs:{"x1":"6","y1":"18","x2":"6","y2":"18"}})])},
  staticRenderFns: []
}
,{
  name: "settings",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-settings",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"3"}}),_c('path',{attrs:{"d":"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"}})])},
  staticRenderFns: []
}
,{
  name: "share-2",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-share-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"18","cy":"5","r":"3"}}),_c('circle',{attrs:{"cx":"6","cy":"12","r":"3"}}),_c('circle',{attrs:{"cx":"18","cy":"19","r":"3"}}),_c('line',{attrs:{"x1":"8.59","y1":"13.51","x2":"15.42","y2":"17.49"}}),_c('line',{attrs:{"x1":"15.41","y1":"6.51","x2":"8.59","y2":"10.49"}})])},
  staticRenderFns: []
}
,{
  name: "share",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-share",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"}}),_c('polyline',{attrs:{"points":"16 6 12 2 8 6"}}),_c('line',{attrs:{"x1":"12","y1":"2","x2":"12","y2":"15"}})])},
  staticRenderFns: []
}
,{
  name: "shield-off",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-shield-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"}}),_c('path',{attrs:{"d":"M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"}}),_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}})])},
  staticRenderFns: []
}
,{
  name: "shield",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-shield",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}})])},
  staticRenderFns: []
}
,{
  name: "shopping-bag",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-shopping-bag",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"}}),_c('line',{attrs:{"x1":"3","y1":"6","x2":"21","y2":"6"}}),_c('path',{attrs:{"d":"M16 10a4 4 0 0 1-8 0"}})])},
  staticRenderFns: []
}
,{
  name: "shopping-cart",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-shopping-cart",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"9","cy":"21","r":"1"}}),_c('circle',{attrs:{"cx":"20","cy":"21","r":"1"}}),_c('path',{attrs:{"d":"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"}})])},
  staticRenderFns: []
}
,{
  name: "shuffle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-shuffle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"16 3 21 3 21 8"}}),_c('line',{attrs:{"x1":"4","y1":"20","x2":"21","y2":"3"}}),_c('polyline',{attrs:{"points":"21 16 21 21 16 21"}}),_c('line',{attrs:{"x1":"15","y1":"15","x2":"21","y2":"21"}}),_c('line',{attrs:{"x1":"4","y1":"4","x2":"9","y2":"9"}})])},
  staticRenderFns: []
}
,{
  name: "sidebar",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-sidebar",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"9","y1":"3","x2":"9","y2":"21"}})])},
  staticRenderFns: []
}
,{
  name: "skip-back",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-skip-back",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"19 20 9 12 19 4 19 20"}}),_c('line',{attrs:{"x1":"5","y1":"19","x2":"5","y2":"5"}})])},
  staticRenderFns: []
}
,{
  name: "skip-forward",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-skip-forward",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"5 4 15 12 5 20 5 4"}}),_c('line',{attrs:{"x1":"19","y1":"5","x2":"19","y2":"19"}})])},
  staticRenderFns: []
}
,{
  name: "slack",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-slack",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22.08 9C19.81 1.41 16.54-.35 9 1.92S-.35 7.46 1.92 15 7.46 24.35 15 22.08 24.35 16.54 22.08 9z"}}),_c('line',{attrs:{"x1":"12.57","y1":"5.99","x2":"16.15","y2":"16.39"}}),_c('line',{attrs:{"x1":"7.85","y1":"7.61","x2":"11.43","y2":"18.01"}}),_c('line',{attrs:{"x1":"16.39","y1":"7.85","x2":"5.99","y2":"11.43"}}),_c('line',{attrs:{"x1":"18.01","y1":"12.57","x2":"7.61","y2":"16.15"}})])},
  staticRenderFns: []
}
,{
  name: "slash",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-slash",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"4.93","y1":"4.93","x2":"19.07","y2":"19.07"}})])},
  staticRenderFns: []
}
,{
  name: "sliders",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-sliders",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"4","y1":"21","x2":"4","y2":"14"}}),_c('line',{attrs:{"x1":"4","y1":"10","x2":"4","y2":"3"}}),_c('line',{attrs:{"x1":"12","y1":"21","x2":"12","y2":"12"}}),_c('line',{attrs:{"x1":"12","y1":"8","x2":"12","y2":"3"}}),_c('line',{attrs:{"x1":"20","y1":"21","x2":"20","y2":"16"}}),_c('line',{attrs:{"x1":"20","y1":"12","x2":"20","y2":"3"}}),_c('line',{attrs:{"x1":"1","y1":"14","x2":"7","y2":"14"}}),_c('line',{attrs:{"x1":"9","y1":"8","x2":"15","y2":"8"}}),_c('line',{attrs:{"x1":"17","y1":"16","x2":"23","y2":"16"}})])},
  staticRenderFns: []
}
,{
  name: "smartphone",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-smartphone",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"5","y":"2","width":"14","height":"20","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"12","y1":"18","x2":"12","y2":"18"}})])},
  staticRenderFns: []
}
,{
  name: "speaker",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-speaker",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"4","y":"2","width":"16","height":"20","rx":"2","ry":"2"}}),_c('circle',{attrs:{"cx":"12","cy":"14","r":"4"}}),_c('line',{attrs:{"x1":"12","y1":"6","x2":"12","y2":"6"}})])},
  staticRenderFns: []
}
,{
  name: "square",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-square",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}})])},
  staticRenderFns: []
}
,{
  name: "star",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-star",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"}})])},
  staticRenderFns: []
}
,{
  name: "stop-circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-stop-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('rect',{attrs:{"x":"9","y":"9","width":"6","height":"6"}})])},
  staticRenderFns: []
}
,{
  name: "sun",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-sun",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"5"}}),_c('line',{attrs:{"x1":"12","y1":"1","x2":"12","y2":"3"}}),_c('line',{attrs:{"x1":"12","y1":"21","x2":"12","y2":"23"}}),_c('line',{attrs:{"x1":"4.22","y1":"4.22","x2":"5.64","y2":"5.64"}}),_c('line',{attrs:{"x1":"18.36","y1":"18.36","x2":"19.78","y2":"19.78"}}),_c('line',{attrs:{"x1":"1","y1":"12","x2":"3","y2":"12"}}),_c('line',{attrs:{"x1":"21","y1":"12","x2":"23","y2":"12"}}),_c('line',{attrs:{"x1":"4.22","y1":"19.78","x2":"5.64","y2":"18.36"}}),_c('line',{attrs:{"x1":"18.36","y1":"5.64","x2":"19.78","y2":"4.22"}})])},
  staticRenderFns: []
}
,{
  name: "sunrise",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-sunrise",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M17 18a5 5 0 0 0-10 0"}}),_c('line',{attrs:{"x1":"12","y1":"2","x2":"12","y2":"9"}}),_c('line',{attrs:{"x1":"4.22","y1":"10.22","x2":"5.64","y2":"11.64"}}),_c('line',{attrs:{"x1":"1","y1":"18","x2":"3","y2":"18"}}),_c('line',{attrs:{"x1":"21","y1":"18","x2":"23","y2":"18"}}),_c('line',{attrs:{"x1":"18.36","y1":"11.64","x2":"19.78","y2":"10.22"}}),_c('line',{attrs:{"x1":"23","y1":"22","x2":"1","y2":"22"}}),_c('polyline',{attrs:{"points":"8 6 12 2 16 6"}})])},
  staticRenderFns: []
}
,{
  name: "sunset",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-sunset",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M17 18a5 5 0 0 0-10 0"}}),_c('line',{attrs:{"x1":"12","y1":"9","x2":"12","y2":"2"}}),_c('line',{attrs:{"x1":"4.22","y1":"10.22","x2":"5.64","y2":"11.64"}}),_c('line',{attrs:{"x1":"1","y1":"18","x2":"3","y2":"18"}}),_c('line',{attrs:{"x1":"21","y1":"18","x2":"23","y2":"18"}}),_c('line',{attrs:{"x1":"18.36","y1":"11.64","x2":"19.78","y2":"10.22"}}),_c('line',{attrs:{"x1":"23","y1":"22","x2":"1","y2":"22"}}),_c('polyline',{attrs:{"points":"16 5 12 9 8 5"}})])},
  staticRenderFns: []
}
,{
  name: "tablet",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-tablet",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"4","y":"2","width":"16","height":"20","rx":"2","ry":"2","transform":"rotate(180 12 12)"}}),_c('line',{attrs:{"x1":"12","y1":"18","x2":"12","y2":"18"}})])},
  staticRenderFns: []
}
,{
  name: "tag",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-tag",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"}}),_c('line',{attrs:{"x1":"7","y1":"7","x2":"7","y2":"7"}})])},
  staticRenderFns: []
}
,{
  name: "target",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-target",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('circle',{attrs:{"cx":"12","cy":"12","r":"6"}}),_c('circle',{attrs:{"cx":"12","cy":"12","r":"2"}})])},
  staticRenderFns: []
}
,{
  name: "terminal",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-terminal",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"4 17 10 11 4 5"}}),_c('line',{attrs:{"x1":"12","y1":"19","x2":"20","y2":"19"}})])},
  staticRenderFns: []
}
,{
  name: "thermometer",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-thermometer",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"}})])},
  staticRenderFns: []
}
,{
  name: "thumbs-down",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-thumbs-down",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"}})])},
  staticRenderFns: []
}
,{
  name: "thumbs-up",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-thumbs-up",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"}})])},
  staticRenderFns: []
}
,{
  name: "toggle-left",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-toggle-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"1","y":"5","width":"22","height":"14","rx":"7","ry":"7"}}),_c('circle',{attrs:{"cx":"8","cy":"12","r":"3"}})])},
  staticRenderFns: []
}
,{
  name: "toggle-right",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-toggle-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"1","y":"5","width":"22","height":"14","rx":"7","ry":"7"}}),_c('circle',{attrs:{"cx":"16","cy":"12","r":"3"}})])},
  staticRenderFns: []
}
,{
  name: "trash-2",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-trash-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"3 6 5 6 21 6"}}),_c('path',{attrs:{"d":"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}}),_c('line',{attrs:{"x1":"10","y1":"11","x2":"10","y2":"17"}}),_c('line',{attrs:{"x1":"14","y1":"11","x2":"14","y2":"17"}})])},
  staticRenderFns: []
}
,{
  name: "trash",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-trash",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"3 6 5 6 21 6"}}),_c('path',{attrs:{"d":"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}})])},
  staticRenderFns: []
}
,{
  name: "trending-down",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-trending-down",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"23 18 13.5 8.5 8.5 13.5 1 6"}}),_c('polyline',{attrs:{"points":"17 18 23 18 23 12"}})])},
  staticRenderFns: []
}
,{
  name: "trending-up",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-trending-up",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"23 6 13.5 15.5 8.5 10.5 1 18"}}),_c('polyline',{attrs:{"points":"17 6 23 6 23 12"}})])},
  staticRenderFns: []
}
,{
  name: "triangle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-triangle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}})])},
  staticRenderFns: []
}
,{
  name: "truck",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-truck",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"1","y":"3","width":"15","height":"13"}}),_c('polygon',{attrs:{"points":"16 8 20 8 23 11 23 16 16 16 16 8"}}),_c('circle',{attrs:{"cx":"5.5","cy":"18.5","r":"2.5"}}),_c('circle',{attrs:{"cx":"18.5","cy":"18.5","r":"2.5"}})])},
  staticRenderFns: []
}
,{
  name: "tv",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-tv",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"2","y":"7","width":"20","height":"15","rx":"2","ry":"2"}}),_c('polyline',{attrs:{"points":"17 2 12 7 7 2"}})])},
  staticRenderFns: []
}
,{
  name: "twitter",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-twitter",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"}})])},
  staticRenderFns: []
}
,{
  name: "type",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-type",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"4 7 4 4 20 4 20 7"}}),_c('line',{attrs:{"x1":"9","y1":"20","x2":"15","y2":"20"}}),_c('line',{attrs:{"x1":"12","y1":"4","x2":"12","y2":"20"}})])},
  staticRenderFns: []
}
,{
  name: "umbrella",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-umbrella",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"}})])},
  staticRenderFns: []
}
,{
  name: "underline",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-underline",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"}}),_c('line',{attrs:{"x1":"4","y1":"21","x2":"20","y2":"21"}})])},
  staticRenderFns: []
}
,{
  name: "unlock",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-unlock",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"11","width":"18","height":"11","rx":"2","ry":"2"}}),_c('path',{attrs:{"d":"M7 11V7a5 5 0 0 1 9.9-1"}})])},
  staticRenderFns: []
}
,{
  name: "upload-cloud",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-upload-cloud",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"16 16 12 12 8 16"}}),_c('line',{attrs:{"x1":"12","y1":"12","x2":"12","y2":"21"}}),_c('path',{attrs:{"d":"M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"}}),_c('polyline',{attrs:{"points":"16 16 12 12 8 16"}})])},
  staticRenderFns: []
}
,{
  name: "upload",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-upload",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}}),_c('polyline',{attrs:{"points":"17 8 12 3 7 8"}}),_c('line',{attrs:{"x1":"12","y1":"3","x2":"12","y2":"15"}})])},
  staticRenderFns: []
}
,{
  name: "user-check",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-user-check",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}}),_c('circle',{attrs:{"cx":"8.5","cy":"7","r":"4"}}),_c('polyline',{attrs:{"points":"17 11 19 13 23 9"}})])},
  staticRenderFns: []
}
,{
  name: "user-minus",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-user-minus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}}),_c('circle',{attrs:{"cx":"8.5","cy":"7","r":"4"}}),_c('line',{attrs:{"x1":"23","y1":"11","x2":"17","y2":"11"}})])},
  staticRenderFns: []
}
,{
  name: "user-plus",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-user-plus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}}),_c('circle',{attrs:{"cx":"8.5","cy":"7","r":"4"}}),_c('line',{attrs:{"x1":"20","y1":"8","x2":"20","y2":"14"}}),_c('line',{attrs:{"x1":"23","y1":"11","x2":"17","y2":"11"}})])},
  staticRenderFns: []
}
,{
  name: "user-x",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-user-x",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}}),_c('circle',{attrs:{"cx":"8.5","cy":"7","r":"4"}}),_c('line',{attrs:{"x1":"18","y1":"8","x2":"23","y2":"13"}}),_c('line',{attrs:{"x1":"23","y1":"8","x2":"18","y2":"13"}})])},
  staticRenderFns: []
}
,{
  name: "user",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-user",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}}),_c('circle',{attrs:{"cx":"12","cy":"7","r":"4"}})])},
  staticRenderFns: []
}
,{
  name: "users",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-users",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}}),_c('circle',{attrs:{"cx":"9","cy":"7","r":"4"}}),_c('path',{attrs:{"d":"M23 21v-2a4 4 0 0 0-3-3.87"}}),_c('path',{attrs:{"d":"M16 3.13a4 4 0 0 1 0 7.75"}})])},
  staticRenderFns: []
}
,{
  name: "video-off",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-video-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"}}),_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}})])},
  staticRenderFns: []
}
,{
  name: "video",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-video",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"23 7 16 12 23 17 23 7"}}),_c('rect',{attrs:{"x":"1","y":"5","width":"15","height":"14","rx":"2","ry":"2"}})])},
  staticRenderFns: []
}
,{
  name: "voicemail",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-voicemail",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"5.5","cy":"11.5","r":"4.5"}}),_c('circle',{attrs:{"cx":"18.5","cy":"11.5","r":"4.5"}}),_c('line',{attrs:{"x1":"5.5","y1":"16","x2":"18.5","y2":"16"}})])},
  staticRenderFns: []
}
,{
  name: "volume-1",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-volume-1",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}}),_c('path',{attrs:{"d":"M15.54 8.46a5 5 0 0 1 0 7.07"}})])},
  staticRenderFns: []
}
,{
  name: "volume-2",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-volume-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}}),_c('path',{attrs:{"d":"M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"}})])},
  staticRenderFns: []
}
,{
  name: "volume-x",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-volume-x",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}}),_c('line',{attrs:{"x1":"23","y1":"9","x2":"17","y2":"15"}}),_c('line',{attrs:{"x1":"17","y1":"9","x2":"23","y2":"15"}})])},
  staticRenderFns: []
}
,{
  name: "volume",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-volume",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}})])},
  staticRenderFns: []
}
,{
  name: "watch",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-watch",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"7"}}),_c('polyline',{attrs:{"points":"12 9 12 12 13.5 13.5"}}),_c('path',{attrs:{"d":"M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"}})])},
  staticRenderFns: []
}
,{
  name: "wifi-off",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-wifi-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}}),_c('path',{attrs:{"d":"M16.72 11.06A10.94 10.94 0 0 1 19 12.55"}}),_c('path',{attrs:{"d":"M5 12.55a10.94 10.94 0 0 1 5.17-2.39"}}),_c('path',{attrs:{"d":"M10.71 5.05A16 16 0 0 1 22.58 9"}}),_c('path',{attrs:{"d":"M1.42 9a15.91 15.91 0 0 1 4.7-2.88"}}),_c('path',{attrs:{"d":"M8.53 16.11a6 6 0 0 1 6.95 0"}}),_c('line',{attrs:{"x1":"12","y1":"20","x2":"12","y2":"20"}})])},
  staticRenderFns: []
}
,{
  name: "wifi",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-wifi",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M5 12.55a11 11 0 0 1 14.08 0"}}),_c('path',{attrs:{"d":"M1.42 9a16 16 0 0 1 21.16 0"}}),_c('path',{attrs:{"d":"M8.53 16.11a6 6 0 0 1 6.95 0"}}),_c('line',{attrs:{"x1":"12","y1":"20","x2":"12","y2":"20"}})])},
  staticRenderFns: []
}
,{
  name: "wind",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-wind",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"}})])},
  staticRenderFns: []
}
,{
  name: "x-circle",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-x-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"15","y1":"9","x2":"9","y2":"15"}}),_c('line',{attrs:{"x1":"9","y1":"9","x2":"15","y2":"15"}})])},
  staticRenderFns: []
}
,{
  name: "x-square",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-x-square",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"9","y1":"9","x2":"15","y2":"15"}}),_c('line',{attrs:{"x1":"15","y1":"9","x2":"9","y2":"15"}})])},
  staticRenderFns: []
}
,{
  name: "x",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-x",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"18","y1":"6","x2":"6","y2":"18"}}),_c('line',{attrs:{"x1":"6","y1":"6","x2":"18","y2":"18"}})])},
  staticRenderFns: []
}
,{
  name: "zap-off",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-zap-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"12.41 6.75 13 2 10.57 4.92"}}),_c('polyline',{attrs:{"points":"18.57 12.91 21 10 15.66 10"}}),_c('polyline',{attrs:{"points":"8 8 3 14 12 14 11 22 16 16"}}),_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}})])},
  staticRenderFns: []
}
,{
  name: "zap",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-zap",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"13 2 3 14 12 14 11 22 21 10 12 10 13 2"}})])},
  staticRenderFns: []
}
,{
  name: "zoom-in",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-zoom-in",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"11","cy":"11","r":"8"}}),_c('line',{attrs:{"x1":"21","y1":"21","x2":"16.65","y2":"16.65"}}),_c('line',{attrs:{"x1":"11","y1":"8","x2":"11","y2":"14"}}),_c('line',{attrs:{"x1":"8","y1":"11","x2":"14","y2":"11"}})])},
  staticRenderFns: []
}
,{
  name: "zoom-out",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-zoom-out",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"11","cy":"11","r":"8"}}),_c('line',{attrs:{"x1":"21","y1":"21","x2":"16.65","y2":"16.65"}}),_c('line',{attrs:{"x1":"8","y1":"11","x2":"14","y2":"11"}})])},
  staticRenderFns: []
}
]

// eslint-disable-next-line
var featherComponents = featherIcons.reduce(function (acc, item) {
  var name = item.name;
  acc[("feather-" + name)] = item;
  item.name = "feather-" + name;
  return acc
}, {});

var Mod21 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.ligature)?_c('i',{class:_vm.iconType,style:({ color: _vm.iconColor, fontSize: _vm.size, verticalAlign: _vm.valign })},[_vm._v(_vm._s(_vm.name))]):(_vm.isSvg)?_c('span',{staticClass:"c-icon"},[_c(_vm.svgName,{tag:"component",style:({verticalAlign: _vm.valign}),attrs:{"width":_vm.size,"height":_vm.size,"stroke":_vm.iconColor}})],1):_c('i',{staticClass:"c-icon",class:_vm.classNames,style:({ color: _vm.iconColor, fontSize: _vm.size, verticalAlign: _vm.valign })})},staticRenderFns: [],
  name: 'c-icon',
  props: {
    type: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String
    },
    size: {
      type: String,
      default: '1em'
    },
    valign: {
      type: String,
      default: 'baseline'
    },
    ligature: {
      type: Boolean,
      default: false
    }
  },

  components: featherComponents,

  data: function data () {
    return {}
  },

  computed: {
    iconType: function iconType () {
      if (!this.type) {
        return this.$clair.icon || 'feather'
      }
      return this.type
    },
    isSvg: function isSvg () {
      return this.iconType === 'feather'
    },
    classNames: function classNames () {
      var prefix = this.iconType !== '' ? ((this.iconType) + "-") : '';
      return ((this.iconType) + " " + prefix + (this.name))
    },
    svgName: function svgName () {
      return this.isSvg ? ("feather-" + (this.name)) : ''
    },
    iconColor: function iconColor () {
      if (!this.color) {
        return this.isSvg ? 'currentColor' : 'inherit'
      }

      return this.color
    }
  }
}

/**
 * Thanks to https://github.com/ant-design/ant-design/
 * SEE: /master/components/input/calculateNodeHeight.tsx
 */

// Thanks to https://github.com/andreypopp/react-textarea-autosize/
/**
 * calculateNodeHeight(uiTextNode, useCache = false)
 */

var HIDDEN_TEXTAREA_STYLE = "\nmin-height:0 !important;\nmax-height:none !important;\nheight:0 !important;\nvisibility:hidden !important;\noverflow:hidden !important;\nposition:absolute !important;\nz-index:-1000 !important;\ntop:0 !important;\nright:0 !important\n";

var SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
];

var computedStyleCache = {};
var hiddenTextarea;

function calculateNodeStyling (node, useCache) {
  if ( useCache === void 0 ) useCache = false;

  var nodeRef = (
    node.getAttribute('id') ||
  node.getAttribute('data-reactid') ||
  node.getAttribute('name')
  );

  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef]
  }

  var style = window.getComputedStyle(node);

  var boxSizing = (
    style.getPropertyValue('box-sizing') ||
      style.getPropertyValue('-moz-box-sizing') ||
      style.getPropertyValue('-webkit-box-sizing')
  );

  var paddingSize = (
    parseFloat(style.getPropertyValue('padding-bottom')) +
      parseFloat(style.getPropertyValue('padding-top'))
  );

  var borderSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) +
      parseFloat(style.getPropertyValue('border-top-width'))
  );

  var sizingStyle = SIZING_STYLE
    .map(function (name) { return (name + ":" + (style.getPropertyValue(name))); })
    .join(';');

  var nodeInfo = {
    sizingStyle: sizingStyle,
    paddingSize: paddingSize,
    borderSize: borderSize,
    boxSizing: boxSizing
  };

  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }

  return nodeInfo
}

function calculateNodeHeight (
  uiTextNode,
  useCache,
  minRows,
  maxRows
) {
  if ( useCache === void 0 ) useCache = false;
  if ( minRows === void 0 ) minRows = null;
  if ( maxRows === void 0 ) maxRows = null;

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  // Fix wrap="off" issue
  // https://github.com/ant-design/ant-design/issues/6577
  if (uiTextNode.getAttribute('wrap')) {
    hiddenTextarea.setAttribute('wrap', uiTextNode.getAttribute('wrap'));
  } else {
    hiddenTextarea.removeAttribute('wrap');
  }

  // Copy all CSS properties that have an impact on the height of the content in
  // the textbox
  var ref = calculateNodeStyling(uiTextNode, useCache);
  var paddingSize = ref.paddingSize;
  var borderSize = ref.borderSize;
  var boxSizing = ref.boxSizing;
  var sizingStyle = ref.sizingStyle;

  // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content
  hiddenTextarea.setAttribute('style',
    (sizingStyle + ";" + HIDDEN_TEXTAREA_STYLE)
  );
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || '';

  var minHeight = -Infinity;
  var maxHeight = Infinity;
  var height = hiddenTextarea.scrollHeight;
  var overflowY;

  if (boxSizing === 'border-box') {
  // border-box: add border, since height = content + padding + border
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
  // remove padding, since height = content
    height = height - paddingSize;
  }

  if (minRows !== null || maxRows !== null) {
  // measure height of a textarea with a single row
    hiddenTextarea.value = '';
    var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      overflowY = height > maxHeight ? '' : 'hidden';
      height = Math.min(maxHeight, height);
    }
  }
  // Remove scroll bar flash when autosize without maxRows
  if (!maxRows) {
    overflowY = 'hidden';
  }
  return {
    height: (height + "px"),
    minHeight: (minHeight + "px"),
    maxHeight: (maxHeight + "px"),
    overflowY: overflowY
  }
}

// SEE https://github.com/jackmoore/autosize
// import autoSize from 'autosize'
var Mod22 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-input-wrap",class:_vm.className},[((_vm.type)==='checkbox'&&(!_vm.multiLine))?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],staticClass:"c-input",attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.inputValue)?_vm._i(_vm.inputValue,null)>-1:(_vm.inputValue)},on:{"input":_vm.onChange,"change":[function($event){var $$a=_vm.inputValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.inputValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.inputValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.inputValue=$$c;}},_vm.onChange]}}):((_vm.type)==='radio'&&(!_vm.multiLine))?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],staticClass:"c-input",attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"type":"radio"},domProps:{"checked":_vm._q(_vm.inputValue,null)},on:{"input":_vm.onChange,"change":[function($event){_vm.inputValue=null;},_vm.onChange]}}):(!_vm.multiLine)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],staticClass:"c-input",attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"type":_vm.type},domProps:{"value":(_vm.inputValue)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.inputValue=$event.target.value;},_vm.onChange],"change":_vm.onChange}}):_vm._e(),(_vm.multiLine)?_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"textArea",staticClass:"c-input",style:(_vm.textAreaStyle),attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"rows":_vm.rows,"cols":_vm.cols,"wrap":_vm.wrap},domProps:{"value":(_vm.inputValue)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.inputValue=$event.target.value;},_vm.onChange],"change":_vm.onChange}}):_vm._e(),(!_vm.validity.valid)?_c('em',{staticClass:"c-error-msg"},[_vm._v(_vm._s(_vm.validity.msg))]):_vm._e()])},staticRenderFns: [],
  name: 'c-input',
  model: {
    event: 'change'
  },
  mixins: [validatable, resettable],
  inject: {
    $form: { default: null }
  },
  props: {
    value: {
      type: [String, Number],
      default: function default$1 () {
        return ''
      }
    },
    placeholder: String,
    size: String,
    width: String,
    readonly: Boolean,
    disabled: Boolean,
    multiLine: Boolean,
    autosize: Array,
    wrap: String,
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    rows: {
      type: Number,
      default: 3
    },
    cols: {
      type: Number,
      default: 60
    },
    maxlength: [Number, String]
  },
  computed: {
    className: function className () {
      var classNames = [];
      if (!this.validity.valid) { classNames.push('c-input--error'); }
      var ref = this;
      var size = ref.size;
      var width = ref.width;
      var $form = ref.$form;
      var actualSize = size || ($form && $form.size);
      var actualWidth = width || ($form && $form.width);
      if (actualSize) { classNames.push(("is-" + actualSize)); }
      if (actualWidth) { classNames.push(("is-" + actualWidth)); }
      return classNames
    }
  },
  data: function data () {
    return {
      origRows: this.rows,
      textAreaStyle: {},
      inputValue: ''
    }
  },

  watch: {
    value: {
      handler: function handler (val) {
        this.inputValue = val;
      },
      immediate: true
    }
  },

  methods: {
    onChange: function onChange (e) {
      this.$emit('change', e.target.value);
      this.resizeTextArea();
    },

    resizeTextArea: function resizeTextArea () {
      var this$1 = this;

      var ref = this;
      var multiLine = ref.multiLine;
      var autosize = ref.autosize;
      if (multiLine && autosize) {
        var ref$1 = this.autosize;
        var minRows = ref$1[0];
        var maxRows = ref$1[1];
        var node = this.$refs.textArea;

        this.$nextTick(function () {
          var style = calculateNodeHeight(node, false, minRows, maxRows);
          this$1.textAreaStyle = style;
        });
      }
    }
  },

  mounted: function mounted () {
    var ref = this;
    var multiLine = ref.multiLine;
    var autosize = ref.autosize;

    if (multiLine && autosize) {
      this.resizeTextArea();
    }
    var ref$1 = this.$clair;
    var defaultThrottleTime = ref$1.defaultThrottleTime;
    this.resizeTextArea = throttle_1(
      this.resizeTextArea.bind(this), defaultThrottleTime);
  }
}

var Mod23 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-menu",class:_vm.classNames,style:(_vm.styles)},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-menu',
  props: {
    mode: {
      type: String,
      default: 'horizontal'
    },
    width: {
      type: String,
      default: '20em'
    },
    collapsed: Boolean,
    theme: String
  },
  provide: function provide () {
    return { $menu: this }
  },
  computed: {
    styles: function styles () {
      if (this.isVertical && !this.collapsed) {
        return {
          width: this.width
        }
      }
    },
    isVertical: function isVertical () {
      return this.mode === 'vertical'
    },
    classNames: function classNames () {
      var classNames = [];
      var ref = this;
      var mode = ref.mode;
      var theme = ref.theme;
      var isVertical = ref.isVertical;
      var collapsed = ref.collapsed;
      if (mode) { classNames.push(("c-menu--" + mode)); }
      if (theme) { classNames.push(("c-menu--" + theme)); }
      if (isVertical && collapsed) { classNames.push('c-menu--collapsed'); }
      return classNames
    }
  },
  data: function data () {
    return {}
  },
  methods: {}
}

var Mod24 = {
  name: 'c-menu-item',
  props: {
    mode: String,
    active: Boolean
  },
  data: function data () {
    return {
      isActive: false
    }
  },
  computed: {
    isLevel1: function isLevel1 () {
      return this.$parent.$options.name === 'c-menu'
    },
    classNames: function classNames () {
      var classNames = [];
      if (this.isActive) { classNames.push('is-active'); }
      return classNames
    }
  },
  mounted: function mounted () {
    if (this.active) { this.isActive = true; }
  },

  /**
   * write render function to avoid duplicate default slots error message
   */
  render: function render (c) {
    var content = this.$slots.default;
    var tips = c('c-tip', {
      attrs: { position: 'right' }
    }, [
      content,
      c('template', {
        slot: 'content'
      }, [content])
    ]);
    var needTips = this.isLevel1 && this.$parent.collapsed;
    var children = [needTips ? tips : content];
    return c('div', {
      staticClass: 'c-menu__item',
      class: this.classNames
    }, children)
  }
}

var Mod25 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-submenu",class:{'is-open': _vm.isOpen}},[_c('div',{staticClass:"c-submenu__title c-menu__item",on:{"click":_vm.toggleSubmenu,"mouseenter":_vm.enterSubMenu,"mouseleave":_vm.leaveSubMenu}},[_vm._t("title",[_vm._v(_vm._s(_vm.title))])],2),_c('div',{staticClass:"c-submenu__popup",on:{"mouseenter":_vm.enterSubMenu,"mouseleave":_vm.leaveSubMenu,"focusin":_vm.openSubMenu,"focusout":_vm.closeSubMenu,"!click":function($event){_vm.clickSubMenu($event);}}},[_vm._t("default")],2)])},staticRenderFns: [],
  name: 'c-submenu',
  props: {
    title: String,
    open: Boolean,
    delay: {
      type: Number,
      default: 200
    }
  },
  inject: ['$menu'],
  watch: {
    open: {
      immediate: true,
      handler: function () {
        if (this.open) { this.isOpen = true; }
      }
    },
    '$menu.collapsed': function (collapsed) {
      if (collapsed) { this.isOpen = false; }
    }
  },
  data: function data () {
    return {
      isOpen: false,
      hideSubMenuTimer: null, // 隐藏子菜单时延时
      showSubMenuTimer: null // hover显示子菜单延时
    }
  },
  methods: {
    toggleSubmenu: function toggleSubmenu () {
      this.isOpen = !this.isOpen;
    },
    enterSubMenu: function enterSubMenu () {
      var this$1 = this;

      if (this.hideSubMenuTimer) { clearTimeout(this.hideSubMenuTimer); }
      var ref = this.$menu;
      var isVertical = ref.isVertical;
      var collapsed = ref.collapsed;
      if (isVertical && !collapsed) { return }
      this.showSubMenuTimer = setTimeout(function (_) {
        this$1.openSubMenu();
      }, this.delay);
    },
    leaveSubMenu: function leaveSubMenu () {
      var this$1 = this;

      if (this.showSubMenuTimer) { clearTimeout(this.showSubMenuTimer); }
      var ref = this.$menu;
      var isVertical = ref.isVertical;
      var collapsed = ref.collapsed;
      if (isVertical && !collapsed) { return }
      this.hideSubMenuTimer = setTimeout(function (_) {
        this$1.closeSubMenu();
      }, this.delay);
    },
    clickSubMenu: function clickSubMenu () {
      if (this.$menu.isVertical && !this.$menu.collapsed) { return }
      this.closeSubMenu();
    },
    openSubMenu: function openSubMenu () {
      this.isOpen = true;
    },
    closeSubMenu: function closeSubMenu () {
      this.isOpen = false;
    }
  }
}

var start = 1992;

var zIndex = {
  next: function next () {
    return start++
  }
}

var slice = Array.prototype.slice;

var Mod26 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('c-portal',{attrs:{"aria-hidden":'' + !_vm.visible}},[_c('transition',{attrs:{"appear":"","name":"modal","mode":"out-in"},on:{"before-enter":_vm.beforeEnter,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],ref:"dom",staticClass:"c-modal",style:({ zIndex: _vm.zIndex }),on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.maskClosable ? _vm.$emit('close') : _vm.noop();}}},[_c('div',{staticClass:"c-modal__wrapper",style:(_vm.styleObj)},[_c('div',{staticClass:"c-modal__header"},[(_vm.closable)?_c('c-button',{staticClass:"c-modal__close",attrs:{"icon":"x","flat":""},on:{"click":function($event){_vm.$emit('close');}}}):_vm._e(),_vm._t("header",[_c('div',[_vm._v(_vm._s(_vm.title))])])],2),_c('div',{staticClass:"c-modal__body"},[_vm._t("default",[_c('div')])],2),_c('div',{staticClass:"c-modal__footer"},[_vm._t("footer",[_c('c-button',{attrs:{"outline":""},on:{"click":function($event){_vm.$emit('cancel');}}},[_vm._v("取消")]),_c('c-button',{attrs:{"primary":""},on:{"click":function($event){_vm.$emit('confirm');}}},[_vm._v("确认")])])],2)])])])],1)},staticRenderFns: [],
  name: 'c-modal',
  props: {
    visible: Boolean,
    maskClosable: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: true
    },
    title: String,
    top: [String, Number],
    width: [String, Number],
    center: Boolean
  },

  data: function data () {
    return {
      bdOvf: '',
      bdPdr: '',
      zIndex: zIndex.next()
    }
  },

  computed: {
    styleObj: function styleObj () {
      var ref = this;
      var top = ref.top;
      var width = ref.width;
      top = typeof top === 'number' ? (top + "px") : top;
      width = typeof width === 'number' ? (width + "px") : width;

      if (!this.center) {
        return { top: top, width: width }
      }

      return {
        width: width,
        top: '50%',
        transform: 'translateY(-50%)'
      }
    }
  },

  methods: {
    noop: function noop () {},

    qsa: function qsa (selectors) {
      var list = this.$refs.dom.querySelectorAll(selectors);
      return slice.call(list)
    },

    handleTab: function handleTab (shiftKey) {
      var selectors = "input, button, textarea, select, a[href]";
      var elems = this.qsa(selectors)
        .filter(function (el) { return !el.disabled && el.type !== 'hidden'; }
        ).filter(function (el) { return el.offsetWidth > 0 && el.offsetHeight > 0; }
        );

      var nextFocusIndex = elems.length - 1;
      var direction = shiftKey ? -1 : 1;
      var activeElem = document.activeElement;

      if (activeElem) {
        var index = elems.indexOf(activeElem);

        if (index > -1) {
          var next = index + direction;
          if (next > -1) {
            nextFocusIndex = next % elems.length;
          }
        }
      }

      var nextElem = elems[nextFocusIndex];
      nextElem && nextElem.focus();
    },

    handleKeydown: function handleKeydown (e) {
      var ref = this;
      var visible = ref.visible;
      var closable = ref.closable;

      if (visible === false) {
        return
      }

      var keyCode = e.keyCode;
      var shiftKey = e.shiftKey;

      if (keyCode === 9) {
        e.preventDefault();
        return this.handleTab(shiftKey)
      }

      if (closable && keyCode === 27) {
        // close modal
        return this.$emit('close')
      }
    },

    beforeEnter: function beforeEnter () {
      var hasScrollbar = document.documentElement.clientWidth < window.innerWidth;
      var style = document.body.style;
      this.bdOvf = style.overflow;
      this.bdPdr = style.paddingRight;

      if (hasScrollbar) {
        style.overflow = 'hidden';
        style.paddingRight = (getScrollBarSize()) + "px";
      }
    },

    afterLeave: function afterLeave () {
      this.reset();
      this.$emit('after-leave');
    },

    reset: function reset () {
      var style = document.body.style;
      style.overflow = this.bdOvf;
      style.paddingRight = this.bdPdr;
    }
  },

  mounted: function mounted () {
    var handleKeydown = this.handleKeydown.bind(this);
    this.handleKeydown = handleKeydown;
    document.addEventListener('keydown', handleKeydown);
  },

  beforeDestroy: function beforeDestroy () {
    this.reset();
    document.removeEventListener('keydown', this.handleKeydown);
  }
}

var Mod27 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-pagination"},[_c('span',{staticClass:"c-pagination__total"},[_vm._t("total",[_vm._v("共"),_c('em',[_vm._v(_vm._s(_vm.total))]),_vm._v("条")])],2),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.pageCount > 1),expression:"pageCount > 1"}],staticClass:"c-pagination__pages"},[_c('a',{staticClass:"c-pagination_prev",class:{'is-disabled': _vm.pageNumber == 1},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(_vm.pageNumber - 1);}}},[_vm._t("prev",[_c('c-icon',{attrs:{"name":"chevron-left","valign":"middle"}})])],2),_c('a',{staticClass:"c-pagination__page",class:{'is-active': _vm.pageNumber == 1},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(1);}}},[_vm._v("1")]),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.spanRange[0] > 2),expression:"spanRange[0] > 2"}],staticClass:"c-pagination__ellipsis"},[_vm._v("⋯")]),_vm._l((_vm.spanRange),function(n){return _c('a',{staticClass:"c-pagination__page",class:{'is-active': n == _vm.pageNumber},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(n);}}},[_vm._v(_vm._s(n))])}),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.showEndEllipse),expression:"showEndEllipse"}],staticClass:"c-pagination__ellipsis"},[_vm._v("⋯")]),_c('a',{staticClass:"c-pagination__page",class:{'is-active': _vm.pageNumber == _vm.pageCount},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(_vm.pageCount);}}},[_vm._v(_vm._s(_vm.pageCount))]),_c('a',{staticClass:"c-pagination_prev",class:{'is-disabled': _vm.pageNumber == _vm.pageCount},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(_vm.pageNumber + 1);}}},[_c('c-icon',{attrs:{"name":"chevron-right","valign":"middle"}})],1)],2)])},staticRenderFns: [],
  name: 'c-pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pn: {
      type: Number,
      default: 1
    },
    ps: {
      type: Number,
      default: 20
    },
    span: {
      type: Number,
      default: 3
    }
  },

  data: function data () {
    return {
      pageNumber: this.pn
    }
  },

  watch: {
    pn: function pn (val) {
      var pn = Number.parseInt(val) || 1;
      this.pageNumber = pn > this.pageCount ? this.pageCount : pn;
    }
  },

  computed: {
    pageCount: function pageCount () {
      return Math.ceil(this.total / this.ps) || 0
    },
    /**
     * 计算要显示的页码，不包括第一页和最后一页
     * e.g. [4,5,6,7,8,9,10]
     */
    spanRange: function spanRange () {
      var range = [];
      var start = Math.max(this.pageNumber - this.span, 2);
      var end = Math.min(this.pageNumber + this.span, this.pageCount - 1);
      for (var i = start; i <= end; i++) {
        range.push(i);
      }
      return range
    },
    showEndEllipse: function showEndEllipse () {
      var lastPageInRange = this.spanRange[this.spanRange.length - 1];
      return lastPageInRange < (this.pageCount - 1)
    }
  },
  methods: {
    /**
     * 切换页码
     * event 点击事件，用以获取target
     */
    goPage: function goPage (page) {
      if (page < 1 || page > this.pageCount) { return }
      this.pageNumber = page;
      this.$emit('change', page);
    }
  }
}

var Mod28 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:_vm.classNames,on:{"change":_vm.onChange}},[_c('input',{attrs:{"type":"radio","name":_vm.name,"disabled":_vm.disabled},domProps:{"value":_vm.value,"checked":_vm.value == _vm.checkedIndex}}),_c('span',{staticClass:"c-radio__box"}),_c('span',{staticClass:"c-radio__label"},[_vm._v(_vm._s(_vm.label))])])},staticRenderFns: [],
  name: 'c-radio',
  model: {
    prop: 'checkedIndex'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    label: String,
    disabled: Boolean,
    button: Boolean,
    checkedIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    classNames: function classNames () {
      var ref = this;
      var button = ref.button;
      var classes = button ? 'c-radio--button' : 'c-radio';
      return classes
    }
  },
  methods: {
    onChange: function onChange (e) {
      this.$emit('input', this.value);
    }
  }
}

var Mod29 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-radio-group",class:_vm.classNames},_vm._l((_vm.options),function(option,index){return _c('c-radio',{attrs:{"name":_vm.name,"value":index,"button":_vm.button,"label":option.label,"disabled":option.disabled},model:{value:(_vm.checkedIndex),callback:function ($$v) {_vm.checkedIndex=$$v;},expression:"checkedIndex"}})}))},staticRenderFns: [],
  name: 'c-radio-group',
  inject: {
    $form: { default: null }
  },
  mixins: [resettable, validatable],
  model: {
    event: 'change'
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [Number, String, Object]
    },
    button: Boolean,
    size: String
  },
  data: function data () {
    return {
      name: randomString(),
      checkedIndex: -1
    }
  },
  computed: {
    classNames: function classNames () {
      var ref = this;
      var size = ref.size;
      var $form = ref.$form;
      var actualSize = size || ($form && $form.size);
      return ("is-" + actualSize)
    }
  },
  created: function created () {
    var this$1 = this;

    this.updateChecked();
    this.$watch('options', this.updateChecked);
    this.$watch('value', this.updateChecked);
    this.$watch('checkedIndex', function (index) {
      var value = index > -1
        ? this$1.options[this$1.checkedIndex].value
        : this$1.value;
      this$1.$emit('change', value);
    });
  },
  methods: {
    updateChecked: function updateChecked () {
      var this$1 = this;

      this.checkedIndex = this.options.findIndex(
        function (option) { return option.value === this$1.value; }
      );
    }
  }
}

/**
 * get absolute position relative to another element
 */
var POSITION = {
  TOP: 'top',
  BOTTOM: 'bottom'
};
function getPosition (el, refEl, pos) {
  if ( pos === void 0 ) pos = POSITION.TOP;

  var refRect = refEl.getBoundingClientRect();
  var refTop = refRect.top + window.pageYOffset;
  var refLeft = refRect.left + window.pageXOffset;
  var left = refLeft;
  var top = pos === POSITION.TOP ? refTop : refTop + refEl.clientHeight;
  return { left: left, top: top }
}

// ensure each option has label and value
var normalizeOptions = function (options) {
  return options.map(function (option) {
    if (typeof option === 'string') { return { label: option, value: option } }
    return option
  })
};

var Mod30 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-select",class:_vm.classNames,attrs:{"role":"combobox","aria-autocomplete":"list","aria-haspopup":"true","aria-expanded":_vm.isOpen,"aria-disabled":"disabled","tabindex":_vm.disabled ? -1 : 0},on:{"keydown":_vm.onKeyDown,"click":_vm.toggleOpen}},[_c('i',{staticClass:"c-select__caret"}),_c('div',{staticClass:"c-select__selection"},[(_vm.showPlaceholder)?_c('div',{staticClass:"c-select__placeholder"},[_vm._v(_vm._s(_vm.placeholder))]):_vm._e(),(!_vm.multiple && _vm.selectedOptions.length)?_c('div',{staticClass:"c-select__value"},[_vm._v(_vm._s(_vm.selectedOptions[0].label))]):_vm._e(),_vm._l((_vm.selectedOptions),function(option){return (_vm.multiple)?_c('div',{staticClass:"c-chip",class:{ 'is-disabled': option.disabled }},[_vm._t("selection",[_c('span',[_vm._v(_vm._s(option.label))])],{option:option}),_c('div',{staticClass:"c-chip__close",on:{"click":function($event){$event.stopPropagation();_vm.unselectOption(option);}}},[_c('c-icon',{attrs:{"name":"x","valign":"middle"}})],1)],2):_vm._e()}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showInput),expression:"showInput"}],staticClass:"c-select__input",class:_vm.multiple ? 'is-multiple' : 'is-single'},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.query),expression:"query"}],attrs:{"autocomplete":"off"},domProps:{"value":(_vm.query)},on:{"click":function($event){$event.stopPropagation();},"blur":function($event){_vm.$el.focus();},"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"delete",[8,46],$event.key)){ return null; }_vm.onDeleteKey($event);},"input":[function($event){if($event.target.composing){ return; }_vm.query=$event.target.value;},_vm.onSearchInput]}})])],2),_c('c-portal',{attrs:{"aria-hidden":'' + !_vm.isOpen}},[_c('transition',{attrs:{"name":"fade-in-down"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen),expression:"isOpen"}],ref:"menu",staticClass:"c-select__menu",class:_vm.size ? 'is-'+_vm.size : '',style:(_vm.menuStyle),attrs:{"role":"menu","aria-activedescendant":""}},[(_vm.autocomplete && !_vm.filteredOptions.length)?_vm._t("no-match",[_c('div',{staticClass:"c-select__empty"},[_vm._v("无匹配选项")])]):_vm._e(),_vm._l((_vm.filteredOptions),function(option,index){return _c('c-option',{ref:"$options",refInFor:true,attrs:{"label":option.label,"isActive":_vm.activeOption == option,"isSelected":_vm.selectedOptions.indexOf(option) > -1,"disabled":option.disabled,"option":option}},[_vm._t("menu-item",null,{label:option.label,isActive:_vm.activeOption == option,isSelected:_vm.selectedOptions.indexOf(option) > -1,disabled:option.disabled,index:index,option:option})],2)})],2)])],1)],1)},staticRenderFns: [],
  name: 'c-select',

  mixins: [resettable, validatable],

  props: {
    value: [Number, String, Object, Array],
    options: Array,
    disabled: Boolean,
    placeholder: {
      type: String,
      default: '请选择...'
    },
    multiple: Boolean,
    combobox: Boolean,
    autocomplete: Boolean,
    size: String,
    width: String,
    filter: {
      type: Function,
      default: function (options, query) {
        var q = query.trim().toLowerCase();
        if (!q) { return options }
        return options
          .filter(function (option) { return option.label.toLowerCase().indexOf(q) > -1; })
      }
    }
  },

  model: {
    event: 'change'
  },

  provide: function provide () {
    return { $select: this }
  },

  inject: {
    $form: { default: null }
  },

  data: function data () {
    return {
      isOpen: false,
      menuStyle: {
        top: 'auto',
        left: 'auto',
        minWidth: 0
      },
      activeOption: null,
      selectedOptions: [],
      filteredOptions: [],
      selectionEl: null,
      menuEl: null,
      query: '',
      promiseId: 0
    }
  },

  computed: {
    normalizedOptions: function normalizedOptions () {
      return normalizeOptions(this.options)
    },
    canInput: function canInput () {
      return this.combobox || this.autocomplete
    },
    showInput: function showInput () {
      return this.canInput && this.isOpen
    },
    classNames: function classNames () {
      var classNames = [
        {
          'is-open': this.isOpen,
          'is-disabled': this.disabled
        }
      ];
      var ref = this;
      var size = ref.size;
      var width = ref.width;
      var $form = ref.$form;
      var actualSize = size || ($form && $form.size);
      var actualWidth = width || ($form && $form.width);
      if (actualSize) { classNames.push(("is-" + actualSize)); }
      if (actualWidth) { classNames.push(("is-" + actualWidth)); }
      return classNames
    },
    selectedValues: function selectedValues () {
      return this.selectedOptions.map(function (option) { return option.value; })
    },
    showPlaceholder: function showPlaceholder () {
      var empty = !this.selectedOptions.length;
      return empty && !this.isOpen
    }
  },

  watch: {
    isOpen: function isOpen () {
      if (this.isOpen) {
        this.menuStyle.minWidth = (this.$el.offsetWidth) + "px";
        this.positionMenu();
        window.addEventListener('click', this.onBodyClick, true);
      } else {
        window.removeEventListener('click', this.onBodyClick, true);
      }
    },

    value: {
      immediate: true,
      handler: function () {
        this.updateSelectedOptions();
      }
    },

    options: {
      immediate: true,
      handler: function () {
        this.updateSelectedOptions();
      }
    },

    selectedOptions: function () {
      if (!this.multiple || this.$isServer) { return }
      this.$nextTick(function () {
        this.positionMenu();
      });
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.menuEl = this.$refs.menu;

    // hover the option
    this.$on('option-activated', function (option) {
      this$1.activeOption = option;
    });

    // reset position on window.resize
    this.__onresize = throttle_1(
      function () {
        if (this$1.isOpen) {
          this$1.positionMenu();
        }
      },
      this.$clair.defaultThrottleTime
    );
    window.addEventListener('resize', this.__onresize);

    // select the option
    this.$on('option-clicked', function (option) { return this$1.selectOption(option); });

    // watch options, query to filter options
    this.$watch(
      function () {
        return [this.normalizedOptions, this.query, this.isOpen]
      },
      function filterOptions () {
        var this$1 = this;

        var ref = this;
        var autocomplete = ref.autocomplete;
        var query = ref.query;
        if (!autocomplete) {
          this.filteredOptions = this.normalizedOptions;
          return
        }
        var filtered = this.filter(this.normalizedOptions, query);
        if (typeof filtered.then === 'function') {
          var promiseId = Date.now();
          this.promiseId = promiseId;
          filtered.then(function (options) {
            if (this$1.promiseId > promiseId) { return }
            this$1.filteredOptions = normalizeOptions(options);
          });
        } else {
          this.filteredOptions = normalizeOptions(filtered);
        }
      }
    );
  },

  beforeDestroy: function beforeDestroy () {
    window.removeEventListener('resize', this.__onresize);
  },

  methods: {
    toggleOpen: function toggleOpen () {
      if (this.disabled) { return }
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    getOption: function getOption (value) {
      var fn = function (option) { return option.value === value; };
      return this.filteredOptions.find(fn) ||
        this.normalizedOptions.find(fn) ||
        this.selectedOptions.find(fn)
    },

    updateSelectedOptions: function updateSelectedOptions () {
      var this$1 = this;

      var ref = this;
      var value = ref.value;
      var multiple = ref.multiple;
      var isEmpty = value === void 0 || value === null;
      if (isEmpty) {
        this.selectedOptions = [];
        return
      }
      if (multiple) {
        var isArray = Array.isArray(value);
        var isEmptyArray = isArray && value.length === 0;
        if (isEmptyArray) { return }
        var valueArr = isArray ? value : [value];
        this.selectedOptions = valueArr
          .map(function (v) { return this$1.getOption(v); })
          .filter(function (option) { return option; });
      } else {
        var option = this.getOption(value);
        this.selectedOptions = option ? [option] : [];
      }
    },

    open: function open () {
      var this$1 = this;

      this.isOpen = true;
      var assign;
      (assign = this.filteredOptions, this.activeOption = assign[0]);
      if (this.showInput) {
        this.query = '';
        this.$nextTick(function (_) {
          this$1.$el.querySelector('input').focus();
        });
      }
    },

    close: function close () {
      this.isOpen = false;
    },

    getNextOption: function getNextOption (current) {
      var currentIndex = this.filteredOptions.indexOf(current);
      var next = this.filteredOptions.find(function (option, index) {
        return index > currentIndex && !option.disabled
      });
      return next || current
    },

    getPreviousOption: function getPreviousOption (current) {
      var this$1 = this;

      var prev = null;
      var currentIndex = this.filteredOptions.indexOf(current);
      for (var i = currentIndex - 1; i >= 0; i--) {
        if (!this$1.filteredOptions[i].disabled) {
          prev = this$1.filteredOptions[i];
          break
        }
      }
      return prev || current
    },

    activateNext: function activateNext () {
      var next = this.getNextOption(this.activeOption);
      this.activeOption = next;
    },

    activatePrevious: function activatePrevious () {
      var prev = this.getPreviousOption(this.activeOption);
      this.activeOption = prev;
    },

    selectPrevious: function selectPrevious () {
      var prev = this.getPreviousOption(this.selectedOptions[0]);
      this.selectOption(prev);
    },

    selectNext: function selectNext () {
      var next = this.getNextOption(this.selectedOptions[0]);
      this.selectOption(next);
    },

    selectOption: function selectOption (option) {
      if (this.multiple) {
        if (this.autocomplete) { this.query = ''; }
        var isSelected = this.selectedOptions.includes(option);
        if (isSelected) { return this.unselectOption(option) }
        this.selectedOptions.push(option);
      } else {
        this.selectedOptions = [option];
        this.close();
      }
      this.emitChange();
    },

    unselectOption: function unselectOption (option) {
      var index = this.selectedOptions.indexOf(option);
      this.selectedOptions.splice(index, 1);
      this.emitChange();
    },

    positionMenu: function positionMenu () {
      var pos = this.canInput ? POSITION.BOTTOM : POSITION.TOP;
      var ref = getPosition(this.menuEl, this.$el, pos);
      var top = ref.top;
      var left = ref.left;
      var ref$1 = this.menuEl;
      var style = ref$1.style;
      style.top = top + "px";
      style.left = left + "px";
      style.zIndex = zIndex.next();
    },

    onBodyClick: function onBodyClick (e) {
      var isInSelect = this.$el.contains(e.target);
      var isInMenu = this.menuEl.contains(e.target);
      if (!isInSelect && !isInMenu) {
        this.close();
        this.$el.focus();
      }
    },

    onDeleteKey: function onDeleteKey (e) {
      if (!this.query) { this.selectedOptions.pop(); }
    },

    onKeyDown: function onKeyDown (e) {
      var keys = {
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      };
      var keyCode = e.keyCode;
      var ref = this;
      var isOpen = ref.isOpen;
      var multiple = ref.multiple;
      var open = ref.open;
      var close = ref.close;
      var selectOption = ref.selectOption;
      var selectPrevious = ref.selectPrevious;
      var selectNext = ref.selectNext;
      var activeOption = ref.activeOption;
      var activateNext = ref.activateNext;
      var activatePrevious = ref.activatePrevious;

      if (Object.values(keys).includes(keyCode)) { e.preventDefault(); }

      // open menu on space, up, down key
      var openTrigger = [
        keys.SPACE,
        keys.ENTER,
        keys.UP,
        keys.DOWN
      ].includes(keyCode);
      if (openTrigger && !isOpen) { return open() }

      // close menu on escape
      if (keyCode === keys.ESC && isOpen) { return close() }

      // press enter to select
      if (keyCode === keys.ENTER && isOpen) { return selectOption(activeOption) }

      // use left, right to navigate on closed state of non-multiple select
      var canSelect = !isOpen && !multiple;
      if (canSelect && keyCode === keys.LEFT) { return selectPrevious() }
      if (canSelect && keyCode === keys.RIGHT) { return selectNext() }

      // use up, down to navigate on open state
      if (isOpen && keyCode === keys.UP) { return activatePrevious() }
      if (isOpen && keyCode === keys.DOWN) { return activateNext() }
    },

    onSearchInput: function onSearchInput (e) {
      this.$emit('searchinput', e.target.value);
    },

    emitChange: function emitChange () {
      var value = this.multiple ? this.selectedValues : this.selectedValues[0];
      this.$emit('change', value);
    }
  }
}

var Mod31 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-select__option",class:_vm.classNames,attrs:{"role":"menuitem","aria-selected":"isSelected"},on:{"mouseenter":_vm.activate,"mouseleave":_vm.deactivate,"mousedown":function($event){$event.preventDefault();},"click":_vm.onClick}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)},staticRenderFns: [],
  name: 'c-option',
  props: {
    label: String,
    disabled: Boolean,
    isActive: Boolean,
    isSelected: Boolean,
    option: Object,
    value: [String, Number, Object]
  },
  inject: ['$select'],
  computed: {
    classNames: function classNames () {
      return {
        'is-hover': this.isActive,
        'is-selected': this.isSelected,
        'is-disabled': this.disabled
      }
    }
  },
  methods: {
    activate: function activate () {
      this.$select.$emit('option-activated', this.option);
    },
    deactivate: function deactivate () {
      this.$select.$emit('option-deactivated', this.option);
    },
    onClick: function onClick (e) {
      e.preventDefault();
      if (this.disabled) { return }
      this.$select.$emit('option-clicked', this.option);
    }
  }
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$2 = objectProto$2.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$2(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike$2(value) ||
      objectToString$2.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

var lodash_isplainobject = isPlainObject;

var ObjProto = Object.prototype;
var toString$1 = ObjProto.toString;
var hasOwn = ObjProto.hasOwnProperty;

var FN_MATCH_REGEXP = /^\s*function (\w+)/;

// https://github.com/vuejs/vue/blob/dev/src/core/util/props.js#L159
var getType = function getType(fn) {
  var type = fn !== null && fn !== undefined ? fn.type ? fn.type : fn : null;
  var match = type && type.toString().match(FN_MATCH_REGEXP);
  return match && match[1];
};

var getNativeType = function getNativeType(value) {
  if (value === null || value === undefined) { return null; }
  var match = value.constructor.toString().match(FN_MATCH_REGEXP);
  return match && match[1];
};

/**
 * No-op function
 */
var noop = function noop() {};

/**
 * Checks for a own property in an object
 *
 * @param {object} obj - Object
 * @param {string} prop - Property to check
 */


/**
 * Determines whether the passed value is an integer. Uses `Number.isInteger` if available
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
 * @param {*} value - The value to be tested for being an integer.
 * @returns {boolean}
 */
var isInteger = Number.isInteger || function (value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

/**
 * Determines whether the passed value is an Array.
 *
 * @param {*} value - The value to be tested for being an array.
 * @returns {boolean}
 */
var isArray = Array.isArray || function (value) {
  return toString$1.call(value) === '[object Array]';
};

/**
 * Checks if a value is a function
 *
 * @param {any} value - Value to check
 * @returns {boolean}
 */
var isFunction = function isFunction(value) {
  return toString$1.call(value) === '[object Function]';
};

/**
 * Adds a `def` method to the object returning a new object with passed in argument as `default` property
 *
 * @param {object} type - Object to enhance
 */
var withDefault = function withDefault(type) {
  Object.defineProperty(type, 'def', {
    value: function value(def) {
      if (def === undefined && !this.default) {
        return this;
      }
      if (!isFunction(def) && !validateType(this, def)) {
        warn(this._vueTypes_name + ' - invalid default value: "' + def + '"', def);
        return this;
      }
      this.default = isArray(def) || lodash_isplainobject(def) ? function () {
        return def;
      } : def;
      return this;
    },

    enumerable: false,
    writable: false
  });
};

/**
 * Adds a `isRequired` getter returning a new object with `required: true` key-value
 *
 * @param {object} type - Object to enhance
 */
var withRequired = function withRequired(type) {
  Object.defineProperty(type, 'isRequired', {
    get: function get() {
      this.required = true;
      return this;
    },

    enumerable: false
  });
};

/**
 * Adds `isRequired` and `def` modifiers to an object
 *
 * @param {string} name - Type internal name
 * @param {object} obj - Object to enhance
 * @returns {object}
 */
var toType = function toType(name, obj) {
  Object.defineProperty(obj, '_vueTypes_name', {
    enumerable: false,
    writable: false,
    value: name
  });
  withRequired(obj);
  withDefault(obj);

  if (isFunction(obj.validator)) {
    obj.validator = obj.validator.bind(obj);
  }
  return obj;
};

/**
 * Validates a given value against a prop type object
 *
 * @param {Object|*} type - Type to use for validation. Either a type object or a constructor
 * @param {*} value - Value to check
 * @param {boolean} silent - Silence warnings
 * @returns {boolean}
 */
var validateType = function validateType(type, value) {
  var typeToCheck = type;
  var valid = true;
  var expectedType = void 0;
  if (!lodash_isplainobject(type)) {
    typeToCheck = { type: type };
  }
  var namePrefix = typeToCheck._vueTypes_name ? typeToCheck._vueTypes_name + ' - ' : '';

  if (hasOwn.call(typeToCheck, 'type') && typeToCheck.type !== null) {
    if (isArray(typeToCheck.type)) {
      valid = typeToCheck.type.some(function (type) {
        return validateType(type, value, true);
      });
      expectedType = typeToCheck.type.map(function (type) {
        return getType(type);
      }).join(' or ');
    } else {
      expectedType = getType(typeToCheck);

      if (expectedType === 'Array') {
        valid = isArray(value);
      } else if (expectedType === 'Object') {
        valid = lodash_isplainobject(value);
      } else if (expectedType === 'String' || expectedType === 'Number' || expectedType === 'Boolean' || expectedType === 'Function') {
        valid = getNativeType(value) === expectedType;
      } else {
        valid = value instanceof typeToCheck.type;
      }
    }
  }

  if (!valid) {
    return false;
  }

  if (hasOwn.call(typeToCheck, 'validator') && isFunction(typeToCheck.validator)) {
    valid = typeToCheck.validator(value);
    return valid;
  }
  return valid;
};

var warn = noop;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var VuePropTypes = {

  get any() {
    return toType('any', {
      type: null
    });
  },

  get func() {
    return toType('function', {
      type: Function
    }).def(currentDefaults.func);
  },

  get bool() {
    return toType('boolean', {
      type: Boolean
    }).def(currentDefaults.bool);
  },

  get string() {
    return toType('string', {
      type: String
    }).def(currentDefaults.string);
  },

  get number() {
    return toType('number', {
      type: Number
    }).def(currentDefaults.number);
  },

  get array() {
    return toType('array', {
      type: Array
    }).def(currentDefaults.array);
  },

  get object() {
    return toType('object', {
      type: Object
    }).def(currentDefaults.object);
  },

  get integer() {
    return toType('integer', {
      type: Number,
      validator: function validator(value) {
        return isInteger(value);
      }
    }).def(currentDefaults.integer);
  },

  get symbol() {
    return toType('symbol', {
      type: null,
      validator: function validator(value) {
        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol';
      }
    });
  },

  custom: function custom(validatorFn) {
    var warnMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'custom validation failed';

    if (typeof validatorFn !== 'function') {
      throw new TypeError('[VueTypes error]: You must provide a function as argument');
    }

    return toType(validatorFn.name || '<<anonymous function>>', {
      validator: function validator() {
        var valid = validatorFn.apply(undefined, arguments);
        if (!valid) { warn(this._vueTypes_name + ' - ' + warnMsg); }
        return valid;
      }
    });
  },
  oneOf: function oneOf(arr) {
    if (!isArray(arr)) {
      throw new TypeError('[VueTypes error]: You must provide an array as argument');
    }
    var msg = 'oneOf - value should be one of "' + arr.join('", "') + '"';
    var allowedTypes = arr.reduce(function (ret, v) {
      if (v !== null && v !== undefined) {
        ret.indexOf(v.constructor) === -1 && ret.push(v.constructor);
      }
      return ret;
    }, []);

    return toType('oneOf', {
      type: allowedTypes.length > 0 ? allowedTypes : null,
      validator: function validator(value) {
        var valid = arr.indexOf(value) !== -1;
        return valid;
      }
    });
  },
  instanceOf: function instanceOf(instanceConstructor) {
    return toType('instanceOf', {
      type: instanceConstructor
    });
  },
  oneOfType: function oneOfType(arr) {
    if (!isArray(arr)) {
      throw new TypeError('[VueTypes error]: You must provide an array as argument');
    }

    var hasCustomValidators = false;

    var nativeChecks = arr.reduce(function (ret, type, i) {
      if (lodash_isplainobject(type)) {
        if (type._vueTypes_name === 'oneOf') {
          return ret.concat(type.type || []);
        }
        if (type.type && !isFunction(type.validator)) {
          if (isArray(type.type)) { return ret.concat(type.type); }
          ret.push(type.type);
        } else if (isFunction(type.validator)) {
          hasCustomValidators = true;
        }
        return ret;
      }
      ret.push(type);
      return ret;
    }, []);

    if (!hasCustomValidators) {
      // we got just native objects (ie: Array, Object)
      // delegate to Vue native prop check
      return toType('oneOfType', {
        type: nativeChecks
      });
    }

    var typesStr = arr.map(function (type) {
      if (type && isArray(type.type)) {
        return type.type.map(getType);
      }
      return getType(type);
    }).reduce(function (ret, type) {
      return ret.concat(isArray(type) ? type : [type]);
    }, []).join('", "');

    return this.custom(function oneOfType(value) {
      var valid = arr.some(function (type) {
        if (type._vueTypes_name === 'oneOf') {
          return type.type ? validateType(type.type, value, true) : true;
        }
        return validateType(type, value, true);
      });
      return valid;
    });
  },
  arrayOf: function arrayOf(type) {
    return toType('arrayOf', {
      type: Array,
      validator: function validator(values) {
        var valid = values.every(function (value) {
          return validateType(type, value);
        });
        if (!valid) { warn('arrayOf - value must be an array of "' + getType(type) + '"'); }
        return valid;
      }
    });
  },
  objectOf: function objectOf(type) {
    return toType('objectOf', {
      type: Object,
      validator: function validator(obj) {
        var valid = Object.keys(obj).every(function (key) {
          return validateType(type, obj[key]);
        });
        if (!valid) { warn('objectOf - value must be an object of "' + getType(type) + '"'); }
        return valid;
      }
    });
  },
  shape: function shape(obj) {
    var keys = Object.keys(obj);
    var requiredKeys = keys.filter(function (key) {
      return obj[key] && obj[key].required === true;
    });

    var type = toType('shape', {
      type: Object,
      validator: function validator(value) {
        var _this = this;

        if (!lodash_isplainobject(value)) {
          return false;
        }
        var valueKeys = Object.keys(value);

        // check for required keys (if any)
        if (requiredKeys.length > 0 && requiredKeys.some(function (req) {
          return valueKeys.indexOf(req) === -1;
        })) {
          warn('shape - at least one of required properties "' + requiredKeys.join('", "') + '" is not present');
          return false;
        }

        return valueKeys.every(function (key) {
          if (keys.indexOf(key) === -1) {
            if (_this._vueTypes_isLoose === true) { return true; }
            return false;
          }
          var type = obj[key];
          return validateType(type, value[key]);
        });
      }
    });

    Object.defineProperty(type, '_vueTypes_isLoose', {
      enumerable: false,
      writable: true,
      value: false
    });

    Object.defineProperty(type, 'loose', {
      get: function get() {
        this._vueTypes_isLoose = true;
        return this;
      },

      enumerable: false
    });

    return type;
  }
};

var typeDefaults = function typeDefaults() {
  return {
    func: noop,
    bool: true,
    string: '',
    number: 0,
    array: function array() {
      return [];
    },
    object: function object() {
      return {};
    },
    integer: 0
  };
};

var currentDefaults = typeDefaults();

Object.defineProperty(VuePropTypes, 'sensibleDefaults', {
  enumerable: false,
  set: function set(value) {
    if (value === false) {
      currentDefaults = {};
    } else if (value === true) {
      currentDefaults = typeDefaults();
    } else if (lodash_isplainobject(value)) {
      currentDefaults = value;
    }
  },
  get: function get() {
    return currentDefaults;
  }
});

var defaultHoverTimeout = 200;

var Mod32 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('c-base-range',{staticClass:"c-slider",class:_vm.className,style:(_vm.height ? { height: _vm.height } : null),attrs:{"direction":_vm.vertical ? 'v' : 'h',"disabled":_vm.disabled},on:{"change":_vm.onRangeChange,"dragstart":function($event){_vm.isDrag = true;},"dragend":function($event){_vm.isDrag = false;}}},[_c('input',{attrs:{"type":"range","min":_vm.min,"max":_vm.max,"step":_vm.step,"disabled":_vm.disabled},domProps:{"value":_vm.nominal}}),_c('div',{staticClass:"c-slider__progress",style:(_vm.progressPos)}),_c('ul',{staticClass:"c-slider__marks"},_vm._l((_vm.normalizedMarks),function(mark){return _c('li',{style:(((_vm.vertical ? 'bottom' : 'left') + ": " + (mark.p)))},[_vm._v(_vm._s(mark.n))])})),_c('div',{staticClass:"c-slider__stops"},_vm._l((_vm.normalizedMarks),function(mark){return _c('span',{style:(((_vm.vertical ? 'bottom' : 'left') + ": " + (mark.p)))})})),_c('div',{staticClass:"c-slider__thumb",class:{ 'c-slider__thumb--hover': !_vm.isDrag && _vm.isHover, 'c-slider__thumb--dragging': _vm.isDrag },style:(_vm.thumbPos),on:{"mouseenter":_vm.onThumbHover,"mouseleave":_vm.onThumbHoverout}},[_c('div',{staticClass:"c-slider__tip",attrs:{"role":"tooltip","aria-hidden":"true"}},[_vm._v(_vm._s(_vm.formmater(this.nominal, 'tip')))])])])},staticRenderFns: [],
  name: 'c-slider',
  components: {
    'c-base-range': baseRange
  },
  model: { event: 'change' },
  mixins: [resettable],
  props: {
    min: VuePropTypes.number.def(0),
    max: VuePropTypes.number.def(100),
    step: VuePropTypes.number.def(1),
    value: VuePropTypes.oneOfType([Number, String]).def(0),
    marks: VuePropTypes.array,
    formmater: VuePropTypes.func.def(function (id) { return id; }),
    vertical: VuePropTypes.bool.def(false),
    disabled: VuePropTypes.bool.def(false),
    height: VuePropTypes.string
  },

  data: function data () {
    return {
      normorlizedValue: 0,
      isHover: false,
      isDrag: false
    }
  },

  computed: {
    className: function className () {
      var ref = this;
      var vertical = ref.vertical;
      var disabled = ref.disabled;
      return [
        ("c-slider--" + (vertical ? 'vertical' : 'horizontal')),
        disabled ? 'c-slider--disabled' : ''
      ]
    },

    precision: function precision () {
      var ref = ("" + (this.step)).split('.');
      var fraction = ref[1];
      return fraction ? fraction.length : 0
    },

    /**
     * nominal value being denormalized
     */
    nominal: function nominal () {
      return this.denormalize(this.normorlizedValue)
    },

    percentage: function percentage () {
      var ref = this;
      var nominal = ref.nominal;
      var proportion = this.normalize(nominal);
      // eslint-disable-next-line
      return ((proportion * 100) + "%")
    },

    thumbPos: function thumbPos () {
      var ref = this;
      var vertical = ref.vertical;
      var percentage = ref.percentage;
      var key = vertical ? 'bottom' : 'left';
      var style = {};
      style[key] = percentage;
      return style
    },

    progressPos: function progressPos () {
      var ref = this;
      var vertical = ref.vertical;
      var percentage = ref.percentage;
      var key = vertical ? 'height' : 'width';
      var style = {};
      style[key] = percentage;
      return style
    },

    normalizedMarks: function normalizedMarks () {
      var this$1 = this;

      var ref = this;
      var marks = ref.marks;
      var min = ref.min;
      var max = ref.max;
      var formmater = ref.formmater;
      var arr = marks || [min, max];
      return arr.map(function (mk) {
        var mark = clamp_1(mk, min, max);

        return {
          // eslint-disable-next-line
          p: ((this$1.normalize(mark) * 100) + "%"),
          n: formmater ? formmater(mark, 'scale') : mark
        }
      })
    }
  },

  methods: {
    normalize: function normalize (val) {
      var ref = this;
      var min = ref.min;
      var max = ref.max;
      var decimal = (val - min) / (max - min);
      return clamp_1(decimal, 0, 1)
    },
    denormalize: function denormalize (val) {
      var ref = this;
      var min = ref.min;
      var max = ref.max;
      var step = ref.step;
      var precision = ref.precision;
      var range = (max - min);
      var nominal = min + Math.round(range * val / step) * step;
      return parseFloat(nominal.toFixed(precision))
    },
    onRangeChange: function onRangeChange (e) {
      this.normorlizedValue = this.vertical ? 1 - e : e;
    },

    onThumbHover: function onThumbHover () {
      var this$1 = this;

      if (this.isDrag) {
        return
      }
      this._hTid = setTimeout(function () {
        this$1.isHover = true;
      }, defaultHoverTimeout);
    },

    onThumbHoverout: function onThumbHoverout () {
      clearTimeout(this._hTid);
      this.isHover = false;
    }
  },

  created: function created () {
    this.normorlizedValue = this.normalize(this.value);
    this.$emit('change', this.nominal);
  },

  watch: {
    value: {
      handler: function handler (newVal) {
        var ref = this;
        var max = ref.max;
        var min = ref.min;
        var val = Number(newVal);

        if (val !== clamp_1(val, min, max)) {
          throw new Error("The value " + val + " exceeded range" +
            " [" + min + ", " + max + "]."
          )
        }

        this.normorlizedValue = this.normalize(val);
      },
      immediate: true
    },
    nominal: function nominal (val) {
      this.$emit('change', this.nominal);
    }
  }
}

var Mod33 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',[(!_vm.onlybody)?_c('thead',_vm._l((_vm.columnsRows),function(column){return _c('tr',_vm._l((column.columns),function(item){return _c('th',{class:_vm.getColumnClassName(item),style:(_vm.getCellStyle(item)),attrs:{"colspan":item.colspan,"rowspan":item.rowspan}},[(item.type === 'selection')?_c('span',{staticClass:"c-table__check"},[_c('c-checkbox',{attrs:{"indeterminate":_vm.checkIndeterminate},on:{"change":_vm.onSelectAllChange},model:{value:(_vm.allSelect),callback:function ($$v) {_vm.allSelect=$$v;},expression:"allSelect"}})],1):_vm._e(),_vm._t(item.key + '-base-th',[_c('span',[_vm._v(_vm._s(item.title))])]),(item.sorter)?_c('span',{staticClass:"c-table__sort"},[_c('div',{staticClass:"c-sort-asc",class:{'sorted': _vm.checkSorted(item.key, 'asc')},on:{"click":function($event){_vm.onSorted(item.key, 'asc');}}},[_c('i',{staticClass:"sort-asc"})]),_c('div',{staticClass:"c-sort-desc",class:{'sorted': _vm.checkSorted(item.key, 'desc')},on:{"click":function($event){_vm.onSorted(item.key, 'desc');}}},[_c('i',{staticClass:"sort-desc"})])]):_vm._e()],2)}))})):_vm._e(),(!_vm.onlyhead)?_c('tbody',[(_vm.dataList.length == 0)?_c('tr',[_c('td',{staticClass:"c-table__noresult",attrs:{"colspan":_vm.columns.length}},[_vm._v("暂无数据")])]):_vm._l((_vm.dataList),function(dataItem,index){return _c('tr',{class:_vm.getRowClassName(_vm.item, index),on:{"mouseenter":function($event){_vm.setCurrentItem(dataItem, index);},"mouseleave":_vm.resetCurrentItem}},_vm._l((_vm.allColumns),function(columnsItem){return _c('td',{class:_vm.getColumnClassName(columnsItem),style:(_vm.getCellStyle(columnsItem))},[_vm._t(columnsItem.key + '-base-td',[(columnsItem.type === 'selection')?_c('span',{staticClass:"c-table__check"},[_c('c-checkbox',{on:{"change":_vm.onSelectChange},model:{value:(dataItem._checked),callback:function ($$v) {_vm.$set(dataItem, "_checked", $$v);},expression:"dataItem._checked"}})],1):_vm._e(),(columnsItem.render)?_c('div',{domProps:{"innerHTML":_vm._s(columnsItem.render(index, dataItem[columnsItem.key], dataItem))}}):_c('span',[_vm._v(_vm._s(dataItem[columnsItem.key]))])],{item:dataItem})],2)}))})],2):_vm._e()])},staticRenderFns: [],
  name: 'c-basetable',
  props: {
    columns: Array,
    datasource: Array,
    allChecked: Boolean,
    indeterminate: Boolean,
    height: [String, Number],
    sortkey: String,
    sortorder: String,
    rowClassName: [String, Function],
    hoverRowIndex: [Number, String],
    onlybody: [String, Boolean],
    onlyhead: [String, Boolean]
  },

  data: function data () {
    return {
      currentItem: {},
      allSelect: false,
      checkIndeterminate: false
    }
  },

  computed: {
    dataList: function dataList () {
      return this.datasource
    },
    columnsRows: function columnsRows () {
      var columns = this.getLeafColumns(this.columns);
      var maxlevel = this.findMaxLevel(columns);
      var columnsrows = this.getColumnsRows(columns, maxlevel);
      return this.getLevelColumns(columnsrows, maxlevel)
    },
    allColumns: function allColumns () {
      return this.getAllColumns(this.columns)
    }
  },

  created: function created () {
    this.allSelect = this.allChecked;
    this.checkIndeterminate = this.indeterminate;
  },

  watch: {
    allChecked: function allChecked (newVal) {
      if (this.allSelect === newVal) { return }
      this.allSelect = newVal;
    },
    indeterminate: function indeterminate (newVal) {
      this.checkIndeterminate = newVal;
    },
    hoverRowIndex: function hoverRowIndex () {
      this.$forceUpdate();
    }
  },

  methods: {
    getRowClassName: function getRowClassName (row, rowIndex) {
      var classes = [];
      var ref = this;
      var rowClassName = ref.rowClassName;
      if (typeof rowClassName === 'string') {
        classes.push(rowClassName);
      } else if (typeof rowClassName === 'function') {
        classes.push(rowClassName({
          row: row,
          rowIndex: rowIndex
        }));
      }

      if (rowIndex === this.hoverRowIndex) {
        classes.push('row-hover');
      }
      return classes.join(' ')
    },
    getColumnClassName: function getColumnClassName (item) {
      return item.hasOwnProperty('className') ? item.className : ''
    },
    setCurrentItem: function setCurrentItem (item, index) {
      this.currentItem = item;
      this.$emit('rowEnter', index);
    },
    resetCurrentItem: function resetCurrentItem () {
      this.currentItem = {};
      this.$emit('rowLeave');
    },
    onSelectAllChange: function onSelectAllChange (status) {
      this.$emit('selectAllChange', status);
    },
    onSelectChange: function onSelectChange (status) {
      this.$emit('selectChange', this.currentItem, status);
    },
    checkSorted: function checkSorted (key, order) {
      return key === this.sortkey && order === this.sortorder
    },
    onSorted: function onSorted (key, order) {
      this.$emit('sort', {key: key, order: order});
    },
    getCellStyle: function getCellStyle (item) {
      var width = typeof item.width === 'number' ? ((item.width) + "px") : item.width;
      return {
        width: item.width ? width : 'auto',
        textAlign: item.align ? item.align : 'left'
      }
    },
    getAllColumnsRows: function getAllColumnsRows (list) {
      var this$1 = this;

      var columns = [];
      list.forEach(function (item) {
        columns.push(item);
        if (item.children && item.children.length > 0) {
          columns.push.apply(columns, this$1.getAllColumnsRows(item.children));
        }
      });
      return columns
    },
    getLevelColumns: function getLevelColumns (list, maxlevel) {
      var allColumns = this.getAllColumnsRows(list);
      var columns = [];
      var loop = function ( i ) {
        columns.push({
          level: i,
          columns: allColumns.filter(function (item) { return item.level === i; })
        });
      };

      for (var i = 1; i <= maxlevel; i++) loop( i );
      return columns
    },

    findMaxLevel: function findMaxLevel (list) {
      var this$1 = this;

      var maxlevel = 0;
      list.forEach(function (item) {
        if (item.children) {
          maxlevel = Math.max(this$1.findMaxLevel(item.children), maxlevel);
        } else {
          maxlevel = Math.max(item.level, maxlevel);
        }
      });
      return maxlevel
    },

    getLevels: function getLevels (item) {
      var this$1 = this;

      item.children.forEach(function (child) {
        child.level = item.level + 1;
        if (child.children) {
          child.children = this$1.getLevels(child);
        }
      });
      return item.children
    },

    getLeafColumns: function getLeafColumns (list) {
      var this$1 = this;

      var columns = [];
      list.forEach(function (item) {
        item.level = 1;
        if (item.children) {
          item.colspan = item.children.length;
          item.children = this$1.getLeafColumns(item.children);
          item.children = this$1.getLevels(item);
        } else {
          item.colspan = 1;
        }
        columns.push(item);
      });
      return columns
    },

    getColumnsRows: function getColumnsRows (list, maxLevel) {
      var this$1 = this;

      list.forEach(function (item) {
        item.rowspan = maxLevel - item.level + 1;
        if (item.children) {
          item.rowspan = 1;
          item.children = this$1.getColumnsRows(item.children, maxLevel);
        }
      });
      return list
    },

    getAllColumns: function getAllColumns (list) {
      var this$1 = this;

      var columns = [];
      list.forEach(function (item, index) {
        var classname = [];
        index === 0 && classname.push('c-table__bl');
        index === list.length - 1 && classname.push('c-table__br');
        classname = classname.join(' ');
        item.className = item.hasOwnProperty('className') ? ((item.className) + " " + classname) : classname;
        if (item.children && item.children.length > 0) {
          columns.push.apply(columns, this$1.getAllColumns(item.children));
        } else {
          columns.push(item);
        }
      });
      return columns
    }

  }
}

/* global window */
var Mod34 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.className},[(_vm.hasFixed)?_c('div',{staticClass:"c-table",class:_vm.withBorderClass},[(_vm.height)?[_c('div',{staticClass:"c-table__wrapper"},[_c('div',{staticClass:"c-table__headwrapper"},[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1)]),_c('div',{staticClass:"c-table__bodywrapper"},[_c('div',{ref:_vm.scrollbody,staticClass:"c-scroll__tbody",style:(_vm.getScrollTbodyStyle),on:{"mouseenter":_vm.setCurrentScrollBox,"mouseleave":_vm.removeCurrentScrollBox}},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1)]),_c('div',{staticClass:"c-fixtable__left",class:{'c-fixed__leftscroll': _vm.isScrollMove},on:{"mouseenter":_vm.setCurrentScrollBox,"mouseleave":_vm.removeCurrentScrollBox}},[(_vm.datasource.length > 0)?[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])}),(!undefined)?_c('div',{ref:"fixedleft",staticClass:"c-table__body",on:{"scroll":_vm.onYscroll}},[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1):_vm._e()]:[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])}),_vm._e()]],2),_c('div',{staticClass:"c-fixtable__right",class:{'c-fixed__rightscroll': _vm.isScrollMove},on:{"mouseenter":_vm.setCurrentScrollBox,"mouseleave":_vm.removeCurrentScrollBox}},[(_vm.datasource.length > 0)?[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])}),(!undefined)?_c('div',{ref:"fixedright",staticClass:"c-table__body",on:{"scroll":_vm.onYscroll}},[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1):_vm._e()]:[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])}),_vm._e()]],2)])]:[(_vm.fixedLeftColumns.length > 0)?_c('div',{staticClass:"c-fixtable__left",class:{'c-fixed__leftscroll': _vm.isScrollMove}},[(_vm.datasource.length > 0)?[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]:[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]],2):_vm._e(),_c('div',{staticClass:"c-scrolltable",on:{"scroll":_vm.onScroll}},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1),(_vm.fixedRightColumns.length > 0)?_c('div',{staticClass:"c-fixtable__right",class:{'c-fixed__rightscroll': _vm.isScrollMove}},[(_vm.datasource.length > 0)?[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]:[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]],2):_vm._e()]],2):_c('div',{staticClass:"c-table",class:_vm.withBorderClass},[(_vm.height)?[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])}),(!undefined)?_c('div',{ref:"scrollBody",staticClass:"c-table__body"},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1):_vm._e()]:[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]],2)])},staticRenderFns: [],
  name: 'c-table',
  props: {
    columns: Array,
    allSelected: Boolean,
    datasource: Array,
    height: [String, Number],
    sortkey: String,
    sortorder: String,
    size: String,
    border: String,
    rowClassName: [String, Function]
  },

  data: function data () {
    return {
      dataList: [],
      selection: [],
      fixedLeftColumns: [],
      fixedRightColumns: [],
      hoverRowIndex: '',
      scrollBarSize: 5,
      scrollBox: '',
      allChecked: false,
      indeterminate: false,
      isScrollMove: false
    }
  },

  computed: {
    getScrollTbodyStyle: function getScrollTbodyStyle () {
      if (this.$el) {
        var theadHeight = this.$el.querySelector('.c-scroll__thead').getClientRects()[0].height;
        return {
          maxHeight: ((this.height - theadHeight) + "px")
        }
      }
      return {}
    },

    withBorderClass: function withBorderClass () {
      if (!this.border || this.border === 'none') {
        return ''
      }
      var classes = this.border.split(' ');
      classes = classes.map(function (item) { return ("c-table__" + item); });
      return classes.join(' ')
    },
    className: function className () {
      return this.size ? ("c-table__" + (this.size)) : ''
    },
    hasFixed: function hasFixed () {
      return Boolean(this.columns.find(function (item) { return Boolean(item.fixed); }))
    }
  },

  created: function created () {
    this.composeData();
    this.getColumnsDetail();
  },

  watch: {
    datasource: {
      handler: function handler (newVal, oldVal) {
        if (newVal === oldVal) { return }
        this.composeData();
        this.getColumnsDetail();
      },
      deep: true
    },
    sortkey: function sortkey () {
      this.composeData();
    },
    sortorder: function sortorder () {
      this.composeData();
    },
    columns: function columns () {
      this.getColumnsDetail();
      this.height && this.getTbodyStyle();
    },
    allSelected: function allSelected (status) {
      this.updateSelectAll(status);
    }
  },

  mounted: function mounted () {
    this.getCurrentScrollBarSize();
    this.height && this.getTbodyStyle();
    if (this.hasFixed) {
      var scrollEl = this.$el.querySelector('.c-scroll__tbody');
      scrollEl && scrollEl.addEventListener('scroll', this.onScroll, false);
    }
  },

  methods: {
    updateSelectAll: function updateSelectAll (status) {
      var this$1 = this;

      this.allChecked = status;
      this.dataList = this.dataList.map(function (item) {
        this$1.$set(item, '_checked', status);
        return item
      });
      if (status) {
        this.selection = this.dataList;
      } else {
        this.selection = [];
      }
    },
    onSelectAllChange: function onSelectAllChange (status) {
      var this$1 = this;

      this.updateSelectAll(status);
      this.$nextTick(function () {
        this$1.$emit('selectChange', this$1.selection);
      });
    },
    onSelectChange: function onSelectChange (currentItem, status) {
      var this$1 = this;

      if (status) {
        this.selection.push(currentItem);
      } else {
        this.selection = this.selection.filter(function (item) { return item._checked; });
      }
      this.$nextTick(function () {
        this$1.allChecked = this$1.selection.length === this$1.dataList.length;
        this$1.indeterminate = this$1.selection.length > 0 &&
          this$1.selection.length < this$1.dataList.length;
        this$1.$emit('selectChange', this$1.selection);
      });
    },
    composeData: function composeData () {
      var this$1 = this;

      this.allChecked = this.allSelected;
      var list = [];
      var selectedList = [];
      this.datasource && this.datasource.map(function (item, index) {
        item._checked = (item.hasOwnProperty('_checked') && item._checked) || this$1.allChecked;
        item._disabled = (item.hasOwnProperty('disabled') && item._disabled) || this$1.allChecked;
        item._checked && selectedList.push(item);
        list.push(item);
      });
      this.dataList = list;
      this.selection = selectedList;
      this.allChecked = this.dataList.length !== 0 && this.selection.length === this.dataList.length;
      this.indeterminate = this.selection.length > 0 &&
        this.selection.length < this.dataList.length;
    },
    setCurrentScrollBox: function setCurrentScrollBox (e) {
      this.scrollBox = e.target.className;
    },
    removeCurrentScrollBox: function removeCurrentScrollBox () {
      this.scrollBox = '';
    },
    getTbodyStyle: function getTbodyStyle () {
      var ref = this.$el.querySelector('table').getClientRects();
      var tableStyle = ref[0];
      var tbodyEl = this.$el.querySelector('.c-scroll__tbody') || this.$el.querySelector('.c-table__body');
      var theadHeight = tableStyle.height;
      var scrollBarHeight = tbodyEl.offsetHeight !== tbodyEl.clientHeight ? this.scrollBarSize : 0;
      var height = (this.height - theadHeight - scrollBarHeight) + "px";

      if (this.hasFixed) {
        if (this.$refs.fixedright) {
          this.$refs.fixedright.style.maxHeight = height;
        }
        if (this.$refs.fixedleft) {
          this.$refs.fixedleft.style.maxHeight = height;
        }
      } else {
        tbodyEl.style.maxHeight = height;
      }
    },
    getCurrentScrollBarSize: function getCurrentScrollBarSize () {
      var ua = window.navigator.userAgent;
      if (ua.indexOf('MSIE') > 0 ||
        Boolean(ua.match(/Trident.*rv:11./))) {
        this.scrollBarSize = getScrollBarSize();
      }
    },
    rowEnter: function rowEnter (index) {
      this.hoverRowIndex = index;
      this.$emit('rowEnter', index);
    },
    rowLeave: function rowLeave () {
      this.hoverRowIndex = '';
      this.$emit('rowLeave');
    },
    onYscroll: function onYscroll (e) {
      if (!this.hasFixed) { return }
      var scrollEl = this.$el.querySelector('.c-scroll__tbody');
      if (!(e.target.parentElement.className).includes(this.scrollBox)) {
        e.target.scrollTop = scrollEl.scrollTop;
        return
      }
      this.$refs.fixedleft.scrollTop = e.target.scrollTop;
      this.$refs.fixedright.scrollTop = e.target.scrollTop;
      scrollEl.scrollTop = e.target.scrollTop;
    },
    onScroll: function onScroll (e) {
      if (!e.target.className.includes(this.scrollBox)) {
        // fix mouseleave but scroll is keeping
        e.target.scrollTop = this.$refs.fixedleft.scrollTop;
        return
      }

      var ref = e.target;
      var scrollLeft = ref.scrollLeft;
      var scrollTop = ref.scrollTop;
      var scrollEl = this.$el.querySelector('.c-scroll__thead');

      this.isScrollMove = scrollLeft > 0;
      if (this.$refs.fixedleft) {
        this.$refs.fixedleft.scrollTop = scrollTop;
      }
      if (this.$refs.fixedright) {
        this.$refs.fixedright.scrollTop = scrollTop;
      }
      if (scrollEl) {
        scrollEl.scrollLeft = scrollLeft;
      }
    },
    sorter: function sorter (ref) {
      var key = ref.key;
      var order = ref.order;

      this.$emit('sort', {key: key, order: order});
    },
    getColumnsDetail: function getColumnsDetail () {
      if (!this.hasFixed) { return }
      var leftColumns = [];
      var rightColumns = [];
      this.columns.map(function (item) {
        if (item.fixed) {
          item.fixed === 'left' && leftColumns.push(item);
          item.fixed === 'right' && rightColumns.push(item);
        }
      });
      this.fixedLeftColumns = leftColumns;
      this.fixedRightColumns = rightColumns;
    }
  }
}

var OPPOSITE_DIRECTION = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
};

var SHOW_MATCH_MAP = {
  hover: 'mouseenter',
  focus: 'focus',
  click: 'click'
};

var HIDE_MATCH_MAP = {
  hover: 'mouseleave',
  focus: 'blur',
  click: 'click'
};

var defaultDelayTime = 100;

var contains = function (elem, target) { return !!elem && elem.contains(target); };

var Mod35 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-tip",on:{"mouseenter":_vm.show,"mouseleave":_vm.hide,"!focus":function($event){_vm.show($event);},"!blur":function($event){_vm.hide($event);},"click":_vm.show}},[_vm._t("default"),_c('c-portal',{attrs:{"role":"tooltip","aria-hidden":'' + !_vm.visible}},[(!_vm.disabled)?_c('transition',{on:{"before-enter":_vm.beforeEnter,"enter":_vm.enter,"after-enter":_vm.afterEnter,"leave":_vm.leave,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],ref:"tip",staticClass:"c-tip__container",class:_vm.theme === 'light' && 'c-tip__container--light',on:{"mouseenter":_vm.show,"mouseleave":_vm.hide}},[_c('i',{staticClass:"c-tip__arrow",class:_vm.arrowClass}),(_vm.content)?_c('div',[_vm._v(_vm._s(_vm.content))]):_vm._e(),_vm._t("content")],2)]):_vm._e()],1)],2)},staticRenderFns: [],
  name: 'c-tip',
  props: {
    theme: VuePropTypes.oneOf(['dark', 'light']).def('dark'),
    trigger: VuePropTypes.oneOf(['hover', 'click', 'focus']).def('hover'),
    disabled: VuePropTypes.bool.def(false),
    content: VuePropTypes.string.def(''),
    maxWidth: VuePropTypes.string.def('300px'),
    showDelay: VuePropTypes.number.def(defaultDelayTime),
    hideDelay: VuePropTypes.number.def(defaultDelayTime),
    position: VuePropTypes.oneOf(['top', 'right', 'bottom', 'left']).def('bottom')
  },

  data: function data () {
    return {
      visible: false,
      tidIn: null,
      tidOut: null
    }
  },

  computed: {
    arrowClass: function arrowClass () {
      var position = OPPOSITE_DIRECTION[this.position];
      return ("c-tip__arrow--" + position)
    }
  },

  methods: {
    show: function show (ref) {
      var type = ref.type;

      if (SHOW_MATCH_MAP[this.trigger] === type) {
        this.clearTimeout();
        this.visible = true;
      }
    },

    hide: function hide (ref) {
      var this$1 = this;
      if ( ref === void 0 ) ref = {};
      var type = ref.type; if ( type === void 0 ) type = 'click';

      if (HIDE_MATCH_MAP[this.trigger] === type) {
        this.clearTimeout();
        this.tidOut = setTimeout(function () {
          this$1.visible = false;
        }, this.hideDelay);
      }
    },

    resize: function resize () {
      this.handleResize(this.$refs.tip);
    },

    beforeEnter: function beforeEnter (ref) {
      var style = ref.style;

      style.display = 'block';
      style.visibility = 'hidden';
      style.zIndex = zIndex.next();
    },

    enter: function enter (ref, done) {
      var this$1 = this;
      var style = ref.style;

      style.opacity = 0;

      this.tidIn = setTimeout(function () {
        style.maxWidth = this$1.maxWidth;
        style.visibility = 'visible';
        style.opacity = 1;
        this$1.$nextTick(done);
      }, this.showDelay);
    },

    afterEnter: function afterEnter (el) {
      this.handleResize(el);
    },

    leave: function leave (ref) {
      var style = ref.style;

      style.opacity = 0;
      style.visibility = 'hidden';
      this.clearTimeout();
    },

    afterLeave: function afterLeave (ref) {
      var style = ref.style;

      style.cssText = '';
      style.display = 'none';
    },

    clearTimeout: function clearTimeout$1 () {
      clearTimeout(this.tidOut);
      clearTimeout(this.tidIn);
    },

    handleResize: function handleResize (el) {
      if (!el || !el.style) {
        return
      }
      var style = el.style;
      var ref = document.documentElement;
      var scrollLeft = ref.scrollLeft;
      var scrollTop = ref.scrollTop;
      var elRect = this.$el.getBoundingClientRect();
      var tipRect = this.$refs.tip.getBoundingClientRect();

      // eslint-disable-next-line
      switch (this.position) {
        case 'top':
          style.top = (scrollTop + elRect.top - tipRect.height) + "px";
          style.left = (scrollLeft + elRect.left + (elRect.width - tipRect.width) / 2) + "px";
          style.marginTop = '-10px';
          style.marginLeft = '';
          return

        case 'bottom':
          style.top = (scrollTop + elRect.top + elRect.height) + "px";
          style.left = (scrollLeft + elRect.left + (elRect.width - tipRect.width) / 2) + "px";
          style.marginTop = '10px';
          style.marginLeft = '';
          return

        case 'left':
          style.top = (scrollTop + elRect.top - (tipRect.height - elRect.height) / 2) + "px";
          style.left = (scrollLeft + elRect.left - tipRect.width) + "px";
          style.marginLeft = '-10px';
          style.marginTop = '';
          return

        case 'right':
          style.top = (scrollTop + elRect.top - (tipRect.height - elRect.height) / 2) + "px";
          style.left = (scrollLeft + elRect.left + elRect.width) + "px";
          style.marginLeft = '10px';
          style.marginTop = '';
      }
    },

    clickOutside: function clickOutside (ref) {
      var target = ref.target;

      var el = this.$el;
      var tip = this.$refs.tip;
      var isOutside = !contains(el, target) && !contains(tip, target);
      if (isOutside && this.visible) {
        this.hide();
      }
    }
  },

  updated: function updated () {
    if (this.visible) {
      this.$nextTick(this.resize);
    }
  },

  mounted: function mounted () {
    this.resize = this.resize.bind(this);
    this.clickOutside = this.clickOutside.bind(this);
    this.winResize = throttle_1(this.resize, this.$clair.defaultThrottleTime);
    window.addEventListener('resize', this.winResize);
    document.body.addEventListener('click', this.clickOutside);
  },

  beforeDestroy: function beforeDestroy () {
    this.clearTimeout();
    window.removeEventListener('resize', this.winResize);
    document.body.removeEventListener('click', this.clickOutside);
  }
}

var Mod36 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-toolbar",class:{'is-primary': _vm.primary},style:(_vm.style)},[_vm._t("default")],2)},staticRenderFns: [],
  props: {
    height: String,
    background: String,
    color: String,
    primary: Boolean
  },
  computed: {
    style: function style () {
      var style = {};
      var ref = this;
      var height = ref.height;
      var background = ref.background;
      var color = ref.color;
      if (height) { style.lineHeight = height; }
      if (background) { style.background = background; }
      if (color) { style.color = color; }
      return style
    }
  },
  name: 'c-toolbar'
}

var Mod37 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-toolbar__item",class:{'is-flex': _vm.flex}},[_vm._t("default")],2)},staticRenderFns: [],
  props: {
    flex: Boolean
  },
  name: 'c-toolbar-item'
}

var NodeLabel = {
  props: {
    node: VuePropTypes.object.isRequired
  },
  inject: ['$tree'],
  render: function render (h) {
    var ref = this;
    var $tree = ref.$tree;
    var node = ref.node;
    var $node = this.$parent;
    if ($tree.$scopedSlots.label) {
      return $tree.$scopedSlots.label({ node: node, $node: $node })
    }
    return h('div', node.label)
  }
}

var TreeNode = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-tree__node"},[_c('div',{staticClass:"c-tree__title",class:{ 'is-leaf': !_vm.hasChildren },on:{"click":_vm.onNodeClick}},[(_vm.hasChildren)?_c('c-icon',{attrs:{"valign":"middle","name":_vm.iconName}}):_vm._e(),(_vm.$tree.checkable)?_c('c-checkbox',{attrs:{"indeterminate":_vm.indeterminate},on:{"change":_vm.checkChange},model:{value:(_vm.checked),callback:function ($$v) {_vm.checked=$$v;},expression:"checked"}}):_vm._e(),_c('div',{staticClass:"c-tree__label"},[_c('c-node-label',{attrs:{"node":_vm.node}})],1)],1),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showChildren),expression:"showChildren"}],staticClass:"c-tree_children"},_vm._l((_vm.node.children),function(child){return _c('c-tree-node',{ref:"children",refInFor:true,attrs:{"node":child,"level":_vm.level + 1}})}))])},staticRenderFns: [],
  name: 'c-tree-node',
  props: {
    node: VuePropTypes.object.isRequired,
    level: VuePropTypes.integer.isRequired
  },
  inject: ['$tree'],
  components: {
    'c-node-label': NodeLabel
  },
  computed: {
    hasChildren: function hasChildren () {
      var ref = this.node;
      var children = ref.children;
      return children && children.length
    },
    showChildren: function showChildren () {
      return this.hasChildren && this.expanded
    },
    iconName: function iconName () {
      return this.expanded ? 'chevron-down' : 'chevron-right'
    },
    id: function id () {
      return this.node[this.$tree.nodeKey]
    }
  },
  data: function data () {
    return {
      indeterminate: false,
      expanded: false,
      checked: false
    }
  },

  created: function created () {
    var this$1 = this;

    var ref = this;
    var $tree = ref.$tree;
    var $parent = ref.$parent;
    var id = ref.id;

    // expanded keys
    this.expanded = this.$tree.defaultExpandAll || $tree.expandedKeys[id];

    // checked status
    this.checked = $parent.checked || $tree.checkedKeys[id];

    // reactive to expandedKeys or checkedKeys change
    if (id !== void 0) {
      if ($parent.checked) { $tree.$emit('checked-change', id, true); }
      this.$watch('$tree.expandedKeys', function (keys) {
        this$1.expanded = keys[id];
      });
      this.$watch('$tree.checkedKeys', function (keys) {
        this$1.checked = keys[id];
      });
    }

    // parent node check changed, notify children
    this.$on('parent-check-change', function (checked) {
      this$1.checked = checked;
      this$1.indeterminate = false;
      this$1.updateChildren(checked);
      this$1.$tree.$emit('checked-change', this$1.id, checked);
    });

    // child check changed, update self
    this.$on('child-check-change', this.childCheckChange);
  },
  methods: {
    getChildren: function getChildren () {
      if (!this.hasChildren) { return [this] }
      return this.$refs.children.reduce(function (arr, child) {
        return arr.concat(child.getChildren())
      }, [this])
    },
    onNodeClick: function onNodeClick () {
      this.setExpanded(!this.expanded);
      this.$emit('node-click', this.node);
    },
    setExpanded: function setExpanded (expanded) {
      this.expanded = expanded;
      if (this.id !== void 0) {
        this.$tree.$emit('expanded-change', this.id, this.expanded);
      }
    },
    checkChange: function checkChange (checked) {
      this.$parent.$emit('child-check-change', checked);
      this.updateChildren(checked);
      this.$tree.$emit('check-change', this.node, this.checked);
    },
    childCheckChange: function childCheckChange (checked) {
      var $children = this.$refs.children;
      var checkedCount = $children.filter(function (c) { return c.checked; }).length;
      var total = $children.length;
      this.checked = checkedCount === total;
      this.indeterminate = checkedCount > 0 && checkedCount < total;
      this.$parent.$emit('child-check-change', this.checked);
      this.$tree.$emit('checked-change', this.id, checked);
    },
    updateChildren: function updateChildren (checked) {
      if (!this.hasChildren) { return }
      this.$refs.children
        .forEach(function (c) { return c.$emit('parent-check-change', checked); });
    }
  }
}

var Mod38 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-tree"},_vm._l((_vm.nodes),function(node){return _c('c-tree-node',{attrs:{"node":node,"level":1}})}))},staticRenderFns: [],
  name: 'c-tree',
  props: {
    nodes: VuePropTypes.arrayOf(Object).isRequired,
    checkable: VuePropTypes.bool.def(false),
    defaultExpandedKeys: VuePropTypes.array,
    defaultExpandAll: VuePropTypes.bool.def(false),
    defaultCheckedKeys: VuePropTypes.array,
    nodeKey: VuePropTypes.string.def('id')
  },
  provide: function provide () {
    return {
      '$tree': this
    }
  },
  components: {
    'c-tree-node': TreeNode
  },
  data: function data () {
    return {
      isRoot: true,
      expandedKeys: {},
      checkedKeys: {}
    }
  },
  watch: {
    defaultExpandedKeys: {
      immediate: true,
      handler: function handler (keys) {
        this.expandedKeys = keys.reduce(function (obj, key) {
          obj[key] = true;
          return obj
        }, {});
      }
    },
    defaultCheckedKeys: {
      immediate: true,
      handler: function handler (keys) {
        console.log('checked keys', keys);
        this.checkedKeys = keys.reduce(function (obj, key) {
          obj[key] = true;
          return obj
        }, {});
      }
    }
  },
  created: function created () {
    var this$1 = this;

    this.$on('expanded-change', function (key, expanded) {
      this$1.expandedKeys[key] = expanded;
    });
    this.$on('checked-change', function (key, checked) {
      if (key === void 0) { return }
      this$1.checkedKeys[key] = checked;
    });
  },
  methods: {
    setExpandedByNode: function setExpandedByNode (node, expanded) {
      this.filterNodes(function ($node) { return $node.node === node; })
        .forEach(function ($node) { return $node.setExpanded(expanded); });
    },
    getCheckedNodes: function getCheckedNodes (leafOnly) {
      var filter = function ($node) {
        var isChecked = $node.checked;
        if (leafOnly) { return !$node.node.children && isChecked }
        return isChecked
      };
      return this.filterNodes(filter).map(function ($node) { return $node.node; })
    },
    filterNodes: function filterNodes (filter) {
      var allNodes = this.$children.reduce(
        function (arr, branch) { return arr.concat(branch.getChildren()); },
        []
      );
      var filtered = allNodes.filter(filter);
      return filtered
    },
    getExpandedNodes: function getExpandedNodes () {
      var filter = function ($node) { return $node.expanded; };
      return this.filterNodes(filter).map(function ($node) { return $node.node; })
    },
    getExpandedKeys: function getExpandedKeys () {
      var this$1 = this;

      return this.getExpandedNodes().map(function (node) { return node[this$1.nodeKey]; })
    }
  }
}

var Components = [
  baseRange,
  Mod1,
  Mod2,
  Mod3,
  Mod4,
  Mod5,
  Mod6,
  Mod7,
  Mod8,
  Mod9,
  Mod10,
  Menu,
  Mod12,
  Mod13,
  Mod14,
  Mod15,
  Mod16,
  Mod17,
  Mod18,
  Mod19,
  Mod20,
  Mod21,
  Mod22,
  Mod23,
  Mod24,
  Mod25,
  Mod26,
  Mod27,
  Mod28,
  Mod29,
  Mod30,
  Mod31,
  Mod32,
  Mod33,
  Mod34,
  Mod35,
  Mod36,
  Mod37,
  Mod38,
  TreeNode
];

var Responsive = {
  install: function install (Vue) {
    var responsive = new Vue({
      data: { media: breakpoints[0] }
    });

    var setMediaAttr = function (media) {
      document.documentElement.setAttribute('media', media);
    };

    // create an element to listen viewport change
    if (typeof window === 'object') {
      var element = document.createElement('div');
      element.className = 'c-responsive-listener';
      document.body.appendChild(element);
      var getMediaType = function (_) {
        return breakpoints[element.clientWidth]
      };
      element.addEventListener('transitionend', function (e) {
        var oldMedia = responsive.media;
        var media = getMediaType();
        if (oldMedia === media) { return } // no media change
        responsive.$emit('change', media, oldMedia);
        responsive.media = media;
        setMediaAttr(media);
      });
      responsive.media = getMediaType();
      setMediaAttr(responsive.media);
    }
    Vue.prototype.$clair.responsive = responsive;
  }
}

var defaultStyle = {
  left: 0,
  position: 'absolute',
  top: 0,
  width: '100%'
};

function install (Vue) {
  var Portal = {
    name: 'c-portal',

    updated: function updated () {
      this.vm.$forceUpdate();
    },

    mounted: function mounted () {
      var self = this;
      var vm = new Vue({
        abstract: true,
        parent: this,
        render: function render (h) {
          var ref = self.$vnode.data;
          var attrs = ref.attrs;
          var staticClass = ref.staticClass;
          var staticStyle = ref.staticStyle;
          var className = ref.class;

          var children = self.$slots.default;
          return h('div', {
            attrs: attrs,
            staticClass: staticClass,
            class: className,
            staticStyle: Object.assign({}, staticStyle, defaultStyle)
          }, children)
        }
      });

      var div = document.createElement('div');
      document.body.appendChild(div);
      vm.$mount(div);
      this.vm = vm;
    },

    beforeDestroy: function beforeDestroy () {
      var ref = this;
      var vm = ref.vm;
      vm.$destroy();
      if (vm.$el) {
        document.body.removeChild(vm.$el);
      }
    },

    // eslint-disable-next-line
    render: function render () {}
  };

  Vue.component(Portal.name, Portal);
}

var PortalComponent = { install: install }

var CModalAlert = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('c-modal',{attrs:{"title":_vm.title,"visible":_vm.visible,"width":"400px"},on:{"close":_vm.onCancel,"after-leave":function($event){_vm.$emit('destroy');}}},[_c('div',[_vm._v(_vm._s(_vm.msg))]),_c('div',{attrs:{"slot":"footer"},slot:"footer"},[_c('c-button',{attrs:{"primary":"","autofocus":""},on:{"click":_vm.onConfirm}},[_vm._v("确定")])],1)])},staticRenderFns: [],
  props: {
    title: String,
    msg: {
      type: String,
      require: true
    }
  },
  data: function data () {
    return {
      visible: true
    }
  },
  methods: {
    onCancel: function onCancel () {
      this.visible = false;
      this.$emit('cancel');
    },
    onConfirm: function onConfirm () {
      this.visible = false;
      this.$emit('confirm');
    }
  }
}

var CModalMessage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('c-modal',{attrs:{"width":"400px","title":_vm.title,"visible":_vm.visible},on:{"close":_vm.onCancel,"after-leave":function($event){_vm.$emit('destroy');}}},[_c('div',{staticClass:"c-modal-message"},[_c('c-icon',{class:_vm.type,attrs:{"type":"feather","name":_vm.icon}}),_c('div',[_vm._v(_vm._s(_vm.msg))])],1),_c('div',{attrs:{"slot":"footer"},slot:"footer"},[_c('c-button',{attrs:{"outline":""},on:{"click":_vm.onCancel}},[_vm._v("取消")]),_c('c-button',{attrs:{"primary":"","autofocus":""},on:{"click":_vm.onConfirm}},[_vm._v("确认")])],1)])},staticRenderFns: [],
  props: {
    title: String,
    msg: {
      type: String,
      require: true
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  data: function data () {
    return { visible: true }
  },
  computed: {
    icon: function icon () {
      switch (this.type) {
        case 'success':
          return 'check-circle'
        case 'warning':
          return 'alert-circle'
        case 'error':
          return 'alert-triangle'
        case 'info':
        default:
          return 'info'
      }
    }
  },
  methods: {
    onCancel: function onCancel () {
      this.visible = false;
      this.$emit('cancel');
    },
    onConfirm: function onConfirm () {
      this.visible = false;
      this.$emit('confirm');
    }
  }
}

var Modal = {
  install: function install (Vue) {
    extendVue(Vue);
  }
}

function extendVue (Vue) {
  var this$1 = this;

  var prototype = Vue.prototype;
  var createModal = function (data, component) {
    var deferred = defer();
    var div = document.createElement('div');
    document.body.appendChild(div);

    var vm = new Vue({
      components: {
        'c-portal-app': component
      },
      mounted: function mounted () {
        // remove comment element
        document.body.removeChild(this.$el);
      },
      render: function render (h) {
        return h('c-portal-app', {
          attrs: data,
          on: {
            cancel: function cancel () {
              deferred.reject();
            },
            confirm: function confirm () {
              deferred.resolve();
            },
            destroy: function destroy () {
              vm.$destroy();
            }
          }
        })
      }
    }).$mount(div);

    return deferred.promise
  };

  prototype.$alert = function (data) {
    // data: { msg, title }
    return createModal(data, CModalAlert)
  };

  prototype.$message = function (data) {
    // data: { msg, title, type }
    return createModal(data, CModalMessage)
  };

  var messageTypes = ['success', 'error', 'info', 'warning'];
  messageTypes.forEach(function (type) {
    prototype.$success = function (ref) {
      var msg = ref.msg;
      var title = ref.title;

      return this$1.$message({ msg: msg, title: title, type: type })
    };
  });
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var arguments$1 = arguments;

	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments$1[s]);

		for (var key in from) {
			if (hasOwnProperty$2.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

if (typeof Object.assign !== 'function') {
  Object.assign = objectAssign;
}

// eslint-disable-next-line
// plugins
var Clair = {
  install: function install (Vue) {
    // inject $clair to Vue prototype
    if (!('$clair' in Vue.prototype)) {
      var $clair = new Vue({
        data: {
          responsive: null,
          icon: 'feather',
          defaultThrottleTime: 150
        }
      });

      Object.defineProperty(Vue.prototype, '$clair', {
        get: function get () { return $clair }
      });
    }

    // register components
    Components.forEach(function (comp) {
      comp.name && Vue.component(comp.name, comp);
    });

    // install plugins
    Vue.use(PortalComponent);
    Vue.use(Modal);
    Vue.use(Responsive);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Clair);
}

return Clair;

})));
