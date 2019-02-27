/*!
 * Clair v0.3.0-alpha.2
 * (c) 2017-present clair-design@75team
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Clair = factory());
}(this, (function () { 'use strict';

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
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
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
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

	if ('assign' in Object === false) {
	  Object.defineProperty(Object, 'assign', {
	    value: objectAssign,
	    configurable: true,
	    enumerable: false,
	    writable: true
	  });
	}

	var $2_0 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-breadcrumb__item"
	    }, [_vm._t("default")], 2);
	  },
	  staticRenderFns: [],
	  name: 'c-breadcrumb-item'
	};

	var $2_1 = {
	  name: 'c-breadcrumb',
	  props: {
	    divider: {
	      type: String,
	      default: '/'
	    }
	  },
	  data: function data() {
	    return {};
	  },
	  methods: {
	    getDivider: function getDivider() {
	      var divider = this.$scopedSlots.divider ? this.$scopedSlots.divider() : this.divider;
	      return this.$createElement('i', {
	        staticClass: 'c-breadcrumb__divider'
	      }, divider);
	    },
	    getChildren: function getChildren() {
	      var _this = this;

	      var children = [];

	      var isItem = function isItem(item) {
	        return item.componentOptions && item.componentOptions.tag === 'c-breadcrumb-item';
	      };

	      var items = (this.$slots.default || []).filter(isItem);
	      var length = items.length;
	      items.forEach(function (item, index) {
	        children.push(item);
	        if (index !== length - 1) children.push(_this.getDivider());
	      });
	      return children;
	    }
	  },
	  render: function render(h) {
	    return h('nav', {
	      staticClass: 'c-breadcrumb'
	    }, this.getChildren());
	  }
	};

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _iterableToArrayLimit(arr, i) {
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

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
	var hasOwnProperty$1 = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty$1.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
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
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

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
	  return (symToStringTag$1 && symToStringTag$1 in Object(value))
	    ? _getRawTag(value)
	    : _objectToString(value);
	}

	var _baseGetTag = baseGetTag;

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

	var _overArg = overArg;

	/** Built-in value references. */
	var getPrototype = _overArg(Object.getPrototypeOf, Object);

	var _getPrototype = getPrototype;

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
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto$2 = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

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
	  if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = _getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty$2.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	var isPlainObject_1 = isPlainObject;

	var ObjProto = Object.prototype;
	var toString = ObjProto.toString;
	var hasOwn = ObjProto.hasOwnProperty;
	var FN_MATCH_REGEXP = /^\s*function (\w+)/; // https://github.com/vuejs/vue/blob/dev/src/core/util/props.js#L177

	var getType = function getType(fn) {
	  var type = fn !== null && fn !== undefined ? fn.type ? fn.type : fn : null;
	  var match = type && type.toString().match(FN_MATCH_REGEXP);
	  return match && match[1];
	};
	var getNativeType = function getNativeType(value) {
	  if (value === null || value === undefined) return null;
	  var match = value.constructor.toString().match(FN_MATCH_REGEXP);
	  return match && match[1];
	};
	/**
	 * No-op function
	 */

	var noop = function noop() {};
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
	  return toString.call(value) === '[object Array]';
	};
	/**
	 * Checks if a value is a function
	 *
	 * @param {any} value - Value to check
	 * @returns {boolean}
	 */

	var isFunction = function isFunction(value) {
	  return toString.call(value) === '[object Function]';
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
	        warn("".concat(this._vueTypes_name, " - invalid default value: \"").concat(def, "\""), def);
	        return this;
	      }

	      if (isArray(def)) {
	        this.default = function () {
	          return _toConsumableArray(def);
	        };
	      } else if (isPlainObject_1(def)) {
	        this.default = function () {
	          return Object.assign({}, def);
	        };
	      } else {
	        this.default = def;
	      }

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
	  var silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  var typeToCheck = type;
	  var valid = true;
	  var expectedType;

	  if (!isPlainObject_1(type)) {
	    typeToCheck = {
	      type: type
	    };
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
	        valid = isPlainObject_1(value);
	      } else if (expectedType === 'String' || expectedType === 'Number' || expectedType === 'Boolean' || expectedType === 'Function') {
	        valid = getNativeType(value) === expectedType;
	      } else {
	        valid = value instanceof typeToCheck.type;
	      }
	    }
	  }

	  if (!valid) {
	    silent === false && warn("".concat(namePrefix, "value \"").concat(value, "\" should be of type \"").concat(expectedType, "\""));
	    return false;
	  }

	  if (hasOwn.call(typeToCheck, 'validator') && isFunction(typeToCheck.validator)) {
	    // swallow warn
	    var oldWarn;

	    if (silent) {
	      oldWarn = warn;
	      warn = noop;
	    }

	    valid = typeToCheck.validator(value);
	    oldWarn && (warn = oldWarn);

	    if (!valid && silent === false) {
	      warn("".concat(namePrefix, "custom validation failed"));
	    }

	    return valid;
	  }

	  return valid;
	};
	var warn = noop;

	var VueTypes = {
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
	        return _typeof(value) === 'symbol';
	      }
	    });
	  },

	  custom: function custom(validatorFn) {
	    var warnMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'custom validation failed';

	    if (typeof validatorFn !== 'function') {
	      throw new TypeError('[VueTypes error]: You must provide a function as argument');
	    }

	    return toType(validatorFn.name || '<<anonymous function>>', {
	      validator: function validator(value) {
	        var valid = validatorFn(value);
	        if (!valid) warn("".concat(this._vueTypes_name, " - ").concat(warnMsg));
	        return valid;
	      }
	    });
	  },
	  oneOf: function oneOf(arr) {
	    if (!isArray(arr)) {
	      throw new TypeError('[VueTypes error]: You must provide an array as argument');
	    }

	    var msg = "oneOf - value should be one of \"".concat(arr.join('", "'), "\"");
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
	        if (!valid) warn(msg);
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
	      if (isPlainObject_1(type)) {
	        if (type._vueTypes_name === 'oneOf') {
	          return ret.concat(type.type || []);
	        }

	        if (type.type && !isFunction(type.validator)) {
	          if (isArray(type.type)) return ret.concat(type.type);
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
	      if (!valid) warn("oneOfType - value type should be one of \"".concat(typesStr, "\""));
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

	        if (!valid) {
	          warn("arrayOf - value must be an array of \"".concat(getType(type), "\""));
	        }

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

	        if (!valid) {
	          warn("objectOf - value must be an object of \"".concat(getType(type), "\""));
	        }

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

	        if (!isPlainObject_1(value)) {
	          return false;
	        }

	        var valueKeys = Object.keys(value); // check for required keys (if any)

	        if (requiredKeys.length > 0 && requiredKeys.some(function (req) {
	          return valueKeys.indexOf(req) === -1;
	        })) {
	          warn("shape - at least one of required properties \"".concat(requiredKeys.join('", "'), "\" is not present"));
	          return false;
	        }

	        return valueKeys.every(function (key) {
	          if (keys.indexOf(key) === -1) {
	            if (_this._vueTypes_isLoose === true) return true;
	            warn("shape - object is missing \"".concat(key, "\" property"));
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
	Object.defineProperty(VueTypes, 'sensibleDefaults', {
	  enumerable: false,
	  set: function set(value) {
	    if (value === false) {
	      currentDefaults = {};
	    } else if (value === true) {
	      currentDefaults = typeDefaults();
	    } else if (isPlainObject_1(value)) {
	      currentDefaults = value;
	    }
	  },
	  get: function get() {
	    return currentDefaults;
	  }
	});
	VueTypes.utils = {
	  validate: function validate(value, type) {
	    return validateType(type, value, true);
	  },
	  toType: toType
	};

	/**
	 * @desc get Vue props definitions from modifier list
	 * @param modifiers {Array}
	 * @return {Object}
	 * @see https://vuejs.org/v2/guide/components.html#Props
	 */

	function toVueProps(modifiers) {
	  return modifiers.reduce(function (props, modifier) {
	    props[modifier] = Boolean;
	    return props;
	  }, {});
	}
	/**
	 * @desc get Vue class binding from `block` and `modifiers`
	 * @param block {String} `block` part of BEM, eg. `.c-button`
	 * @param modifiers {Array} list of `modifier`
	 * @return {Object} Vue class binding object, see
	 * @see https://vuejs.org/v2/guide/class-and-style.html#Object-Syntax
	 * @see https://en.bem.info/methodology/
	 */

	function toClassNames(block, modifiers) {
	  return function () {
	    var _this = this;

	    return modifiers.filter(function (m) {
	      return _this[m];
	    }).map(function (m) {
	      return "".concat(block, "--").concat(m);
	    });
	  };
	}
	/**
	 * return a 6 length random string
	 * warning: uniqueness NOT guaranteed
	 */

	function randomString() {
	  var radix = 36;
	  var length = 6;
	  return Math.random().toString(radix).substr(-length);
	}
	/**
	 * SEE:
	 * https://github.com/react-component/util/blob/master/src/getScrollBarSize.js
	 */

	var cached;
	function getScrollBarSize(fresh) {
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

	  return cached;
	}
	/**
	 * Promise defer
	 */

	function defer() {
	  if (typeof Promise !== 'undefined' && Promise.defer) {
	    return Promise.defer();
	  }

	  var deferred = {};
	  deferred.promise = new Promise(function (resolve, reject) {
	    deferred.resolve = resolve;
	    deferred.reject = reject;
	  });
	  return deferred;
	}
	/**
	 * DOM `contains`
	 */

	function contains(elem, target) {
	  return elem && elem.contains ? elem.contains(target) : false;
	}

	// import css
	var name = 'c-button';
	var block = "c-button";
	var modifiers = ['primary', 'success', 'warning', 'danger', 'round', 'outline', 'flat', 'loading'];
	var props = Object.assign({
	  href: String,
	  size: String,
	  icon: String,
	  type: {
	    type: String,
	    default: 'button'
	  },
	  autofocus: Boolean
	}, toVueProps(modifiers));

	var _classNames = toClassNames(block, modifiers);

	var $2_2 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _vm.href ? _c('router-link', {
	      staticClass: "c-button",
	      class: _vm.classNames,
	      attrs: {
	        "tag": "button",
	        "to": _vm.href
	      }
	    }, [_vm.iconName ? _c('c-icon', {
	      attrs: {
	        "name": _vm.iconName,
	        "valign": "middle"
	      }
	    }) : _vm._e(), _vm.$slots.default ? _c('span', [_vm._t("default")], 2) : _vm._e()], 1) : _c('button', {
	      staticClass: "c-button",
	      class: _vm.classNames,
	      attrs: {
	        "type": _vm.type
	      },
	      on: {
	        "click": _vm.onClick
	      }
	    }, [_vm.iconName ? _c('c-icon', {
	      attrs: {
	        "name": _vm.iconName,
	        "valign": "middle"
	      }
	    }) : _vm._e(), _vm.$slots.default ? _c('span', [_vm._t("default")], 2) : _vm._e()], 1);
	  },
	  staticRenderFns: [],
	  name: name,
	  props: props,
	  inject: {
	    $buttonGroup: {
	      default: null
	    },
	    $form: {
	      default: null
	    }
	  },
	  computed: {
	    iconName: function iconName() {
	      return this.loading ? 'loader' : this.icon;
	    },
	    actualSize: function actualSize() {
	      var size = this.size,
	          $buttonGroup = this.$buttonGroup,
	          $form = this.$form;
	      return size || $buttonGroup && $buttonGroup.size || $form && $form.size;
	    },
	    classNames: function classNames() {
	      var classList = _classNames.call(this);

	      var size = this.actualSize;
	      if (size) classList.push("c-button--".concat(size));
	      return classList;
	    }
	  },
	  methods: {
	    onClick: function onClick(e) {
	      this.$emit('click', e);
	    }
	  },
	  mounted: function mounted() {
	    if (this.autofocus) {
	      this.$el.focus();
	    }
	  }
	};

	var $2_3 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-button-group"
	    }, [_vm._t("default")], 2);
	  },
	  staticRenderFns: [],
	  name: 'c-button-group',
	  props: {
	    size: String
	  },
	  provide: function provide() {
	    return {
	      '$buttonGroup': this
	    };
	  },
	  data: function data() {
	    return {};
	  },
	  methods: {}
	};

	var Mixin = {
	  methods: {
	    fixZero: function fixZero(val) {
	      var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	      return (Array(num).join(0) + val).slice(-num);
	    },
	    updateMonth: function updateMonth(year, month, num, type) {
	      month = type === 'plus' ? parseInt(month) + num : parseInt(month) - num;
	      var maxMonth = 11;
	      var minMonth = 0;

	      if (month < minMonth) {
	        year -= 1;
	      } else if (month > maxMonth) {
	        year += 1;
	      }

	      month = (month + 12) % 12;
	      return [year, month];
	    },
	    isSelectedMonth: function isSelectedMonth(month) {
	      return !(this.year === this.minYear && month < this.minMonth || this.year === this.maxYear && month > this.maxMonth);
	    },
	    prevMonth: function prevMonth() {
	      if (!this.isPreMonthCanSelect) return false;
	      var month = parseInt(this.month) - 1;
	      var maxMonth = 11;
	      var minMonth = 0;

	      if (month < minMonth) {
	        this.$emit('yearchange', this.year - 1);
	      }

	      month = month < minMonth ? maxMonth : month;
	      this.$emit('monthchange', month);
	    },
	    nextMonth: function nextMonth() {
	      if (!this.isNextMonthCanSelect) return false;
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

	};

	Date.prototype.format = function (pattern) {
	  /* eslint-disable no-param-reassign */
	  pattern = pattern || 'yyyy-MM-dd hh:mm:ss';
	  var y = this.getFullYear().toString();
	  var o = {
	    M: this.getMonth() + 1,
	    // month
	    d: this.getDate(),
	    // day
	    h: this.getHours(),
	    // hour
	    m: this.getMinutes(),
	    // minute
	    s: this.getSeconds() // second

	  };
	  pattern = pattern.replace(/(y+)/ig, function (a, b) {
	    return y.substr(4 - Math.min(4, b.length));
	  });
	  /* eslint-disable */

	  var _loop = function _loop(i) {
	    pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function (a, b) {
	      return o[i] < 10 && b.length > 1 ? '0' + o[i] : o[i];
	    });
	  };

	  for (var i in o) {
	    _loop(i);
	  }

	  return pattern;
	};

	var $2_4 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-calendar__header"
	    }, [_c('div', {
	      staticClass: "c-calendar__prev-year",
	      class: {
	        disabled: !_vm.isPreYearCanSelect
	      },
	      on: {
	        "click": _vm.prevYear
	      }
	    }, [_c('c-icon', {
	      attrs: {
	        "type": "feather",
	        "valign": "text-top",
	        "name": "chevrons-left"
	      }
	    })], 1), _c('a', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: !_vm.monthsShow,
	        expression: "!monthsShow"
	      }],
	      staticClass: "c-calendar__prev-month",
	      class: {
	        disabled: !_vm.isPreMonthCanSelect
	      },
	      on: {
	        "click": _vm.prevMonth
	      }
	    }, [_c('c-icon', {
	      attrs: {
	        "type": "feather",
	        "valign": "text-top",
	        "name": "chevron-left"
	      }
	    })], 1), _c('span', {
	      staticClass: "c-calendar__year"
	    }, [_vm._v(_vm._s(this.year))]), _c('span', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: !_vm.monthsShow,
	        expression: "!monthsShow"
	      }],
	      staticClass: "c-calendar__spacer"
	    }, [_vm._v("-")]), _c('span', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: !_vm.monthsShow,
	        expression: "!monthsShow"
	      }],
	      staticClass: "c-calendar__month",
	      on: {
	        "click": _vm.monthtableShow
	      }
	    }, [_vm._v(_vm._s(_vm.fixZero(this.month + 1)))]), _c('a', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: !_vm.monthsShow,
	        expression: "!monthsShow"
	      }],
	      staticClass: "c-calendar__next-month",
	      class: {
	        disabled: !_vm.isNextMonthCanSelect
	      },
	      on: {
	        "click": _vm.nextMonth
	      }
	    }, [_c('c-icon', {
	      attrs: {
	        "type": "feather",
	        "valign": "text-top",
	        "name": "chevron-right"
	      }
	    })], 1), _c('a', {
	      staticClass: "c-calendar__next-year",
	      class: {
	        disabled: !_vm.isNextYearCanSelect
	      },
	      on: {
	        "click": _vm.nextYear
	      }
	    }, [_c('c-icon', {
	      attrs: {
	        "type": "feather",
	        "valign": "text-top",
	        "name": "chevrons-right"
	      }
	    })], 1)]);
	  },
	  staticRenderFns: [],
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
	  data: function data() {
	    return {};
	  },
	  computed: {
	    minYear: function minYear() {
	      return new Date(this.minDate).getFullYear();
	    },
	    maxYear: function maxYear() {
	      return new Date(this.maxDate).getFullYear();
	    },
	    minMonth: function minMonth() {
	      return new Date(this.minDate).getMonth();
	    },
	    maxMonth: function maxMonth() {
	      return new Date(this.maxDate).getMonth();
	    },
	    isPreMonthCanSelect: function isPreMonthCanSelect() {
	      return !(this.year === this.minYear && this.month === this.minMonth);
	    },
	    isNextMonthCanSelect: function isNextMonthCanSelect() {
	      return !(this.year === this.maxYear && this.month === this.maxMonth);
	    },
	    isPreYearCanSelect: function isPreYearCanSelect() {
	      return !(this.year === this.minYear);
	    },
	    isNextYearCanSelect: function isNextYearCanSelect() {
	      return !(this.year === this.maxYear);
	    }
	  },
	  methods: {
	    prevYear: function prevYear() {
	      if (!this.isPreYearCanSelect) return false;
	      this.$emit('yearchange', this.year - 1);
	    },
	    nextYear: function nextYear() {
	      if (!this.isNextYearCanSelect) return false;
	      this.$emit('yearchange', this.year + 1);
	    },
	    monthtableShow: function monthtableShow() {
	      this.$emit('monthshow', true);
	    }
	  }
	};

	var $2_5 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('table', {
	      staticClass: "c-calendar__day-table"
	    }, [_c('thead', [_c('tr', _vm._l(_vm.weeks, function (item) {
	      return _c('th', [_vm._v(_vm._s(item))]);
	    }))]), _c('tbody', _vm._l(_vm.dayRows, function (row, rowIndex) {
	      return _c('tr', _vm._l(row, function (item, itemIndex) {
	        return _c('td', {
	          class: _vm.getCellCls(item),
	          on: {
	            "click": function click($event) {
	              _vm.selectDay(item);
	            },
	            "mouseenter": function mouseenter($event) {
	              _vm.onMouseEnter($event);
	            }
	          }
	        }, [_c('a', {
	          staticClass: "day-cell",
	          attrs: {
	            "data-rowindex": rowIndex,
	            "data-index": itemIndex
	          }
	        }, [_vm._v(_vm._s(item.day))])]);
	      }));
	    }))]);
	  },
	  staticRenderFns: [],
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
	      default: function _default() {
	        return {
	          endDate: '',
	          selecting: false
	        };
	      }
	    }
	  },
	  mixins: [Mixin],
	  data: function data() {
	    return {
	      weeks: ['日', '一', '二', '三', '四', '五', '六']
	    };
	  },
	  computed: {
	    rangeDay: function rangeDay() {
	      var endYear = new Date(this.end).getFullYear();
	      var endMonth = new Date(this.end).getMonth();
	      var endDay = new Date(this.end).getDate();
	      return this.year === endYear && this.month === endMonth ? endDay : '';
	    },
	    minYear: function minYear() {
	      return new Date(this.minDate).getFullYear();
	    },
	    maxYear: function maxYear() {
	      return new Date(this.maxDate).getFullYear();
	    },
	    minMonth: function minMonth() {
	      return new Date(this.minDate).getMonth();
	    },
	    maxMonth: function maxMonth() {
	      return new Date(this.maxDate).getMonth();
	    },
	    minDay: function minDay() {
	      return new Date(this.minDate).getDate();
	    },
	    maxDay: function maxDay() {
	      return new Date(this.maxDate).getDate();
	    },
	    isPreMonthCanSelect: function isPreMonthCanSelect() {
	      return !(this.year === this.minYear && this.month === this.minMonth);
	    },
	    isNextMonthCanSelect: function isNextMonthCanSelect() {
	      return !(this.year === this.maxYear && this.month === this.maxMonth);
	    },
	    isPreYearCanSelect: function isPreYearCanSelect() {
	      return !(this.year === this.minYear);
	    },
	    isNextYearCanSelect: function isNextYearCanSelect() {
	      return !(this.year === this.maxYear);
	    },
	    dayRows: function dayRows() {
	      var lines = 6;
	      var weekDays = 7;
	      var allDays = lines * weekDays;
	      var rows = [];

	      var getRowArr = function getRowArr(N) {
	        var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	        return Array.from(new Array(N), function (val, index) {
	          return index + i;
	        });
	      };

	      var mapDayObj = function mapDayObj(list, classname) {
	        return list.map(function (item) {
	          return {
	            class: classname,
	            day: item
	          };
	        });
	      };

	      var currentMonthDays = new Date(this.year, this.month + 1, 0).getDate();
	      var lastMonthDays = new Date(this.year, this.month, 0).getDate();
	      var startWeek = new Date(this.year, this.month, 1).getDay();
	      var lastMonthDayCount = startWeek || weekDays;
	      var nextMonthDays = allDays - lastMonthDayCount - currentMonthDays;
	      var lastMonthDates = mapDayObj(getRowArr(lastMonthDays).slice(-lastMonthDayCount), 'lastmonth');
	      var currentMonthDates = mapDayObj(getRowArr(currentMonthDays), 'curmonth');
	      var nextMonthDates = mapDayObj(getRowArr(nextMonthDays), 'nextmonth');

	      var allDate = _toConsumableArray(lastMonthDates).concat(_toConsumableArray(currentMonthDates), _toConsumableArray(nextMonthDates));

	      for (var i = 0; i < allDays; i += weekDays) {
	        rows.push(allDate.slice(i, i + weekDays));
	      }

	      return rows;
	    }
	  },
	  methods: {
	    getCellCls: function getCellCls(item) {
	      var clsArr = [item.class];
	      this.isSelectedDate(item) && clsArr.push('active');
	      this.isDateDisabled(item) && clsArr.push('disabled');
	      !this.isSelectedDate(item) && this.rangeObj.selecting && this.isDayInRange(item) && clsArr.push('day-cell-range');
	      return clsArr;
	    },
	    isDayInRange: function isDayInRange(item) {
	      if (item.class !== 'curmonth') return false;
	      var startTime = new Date(this.start).getTime();
	      var endTime = new Date(this.end).getTime();
	      var currentTime = new Date(this.year, this.month, item.day).getTime();
	      var hoverTime = new Date(this.rangeObj.endDate).getTime();

	      if (startTime && endTime) {
	        return currentTime > startTime && currentTime < endTime;
	      } else if (startTime) {
	        return startTime > hoverTime ? currentTime > hoverTime && currentTime < startTime : currentTime > startTime && currentTime < hoverTime;
	      }

	      return false;
	    },
	    onMouseEnter: function onMouseEnter(e) {
	      if (e.target.tagName === 'TD') {
	        var rowIndex = e.target.querySelector('a').getAttribute('data-rowindex');
	        var columnIndex = e.target.querySelector('a').getAttribute('data-index');
	        var dayItem = this.dayRows[rowIndex][columnIndex];
	        /* eslint-disable no-nested-ternary */

	        var type = dayItem.class === 'lastmonth' ? 'sub' : dayItem.class === 'nextmonth' ? 'plus' : '';

	        var _ref = type !== '' ? this.updateMonth(this.year, this.month, 1, type) : [this.year, this.month],
	            _ref2 = _slicedToArray(_ref, 2),
	            year = _ref2[0],
	            month = _ref2[1];

	        this.$emit('rangeChange', {
	          rangeObj: {
	            endDate: new Date(year, month, dayItem.day).format(this.pattern),
	            selecting: true
	          }
	        });
	      }
	    },
	    isDateDisabled: function isDateDisabled(item) {
	      var months = 12;
	      var isPrevMonthValid = item.class === 'lastmonth' && !this.isSelectedMonth((this.month - 1) % months);
	      var isNextMonthValid = item.class === 'nextmonth' && !this.isSelectedMonth((this.month + 1) % months);
	      var isCurMonthValid = item.class === 'curmonth' && (this.year === this.minYear && this.month === this.minMonth && item.day < this.minDay || this.year === this.maxYear && this.month === this.maxMonth && item.day > this.maxDay);
	      return isCurMonthValid || isPrevMonthValid || isNextMonthValid;
	    },
	    isSelectedDate: function isSelectedDate(item) {
	      var isCurMonth = item.class === 'curmonth';
	      var isRange = this.type === 'range';
	      var currentDate = new Date(this.year, this.month, item.day).format(this.pattern);
	      var isSelectedDay = currentDate === new Date(this.year, this.month, this.day).format(this.pattern);
	      var isStart = currentDate === this.start;
	      var isEnd = currentDate === this.end;
	      var isHoverDate = currentDate === this.rangeObj.endDate;
	      return isCurMonth && (!isRange && isSelectedDay || isRange && (isStart || isEnd || !(this.start && this.end) && isHoverDate));
	    },
	    markRange: function markRange(item) {
	      var start = '';
	      var end = '';
	      var selecting = true;
	      var type = item.class === 'lastmonth' ? 'sub' : item.class === 'nextmonth' ? 'plus' : '';

	      var _ref3 = type !== '' ? this.updateMonth(this.year, this.month, 1, type) : [this.year, this.month],
	          _ref4 = _slicedToArray(_ref3, 2),
	          year = _ref4[0],
	          month = _ref4[1];

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
	    selectDay: function selectDay(item) {
	      if (this.isDateDisabled(item)) {
	        return;
	      }

	      var canSelPrevMonthDay = item.class === 'lastmonth' && !(this.prevMonth() === false);
	      var canSelNextMonthDay = item.class === 'nextmonth' && !(this.nextMonth() === false);
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
	};

	var $2_6 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: _vm.show,
	        expression: "show"
	      }],
	      staticClass: "c-calendar",
	      class: _vm.className
	    }, [_c('c-dateheader', {
	      attrs: {
	        "minDate": _vm.minDate,
	        "maxDate": _vm.maxDate,
	        "year": _vm.year,
	        "month": _vm.month,
	        "monthshow": _vm.monthsShow
	      },
	      on: {
	        "monthchange": _vm.monthchange,
	        "yearchange": _vm.yearchange,
	        "monthshow": _vm.monthTableShow
	      }
	    }), _c('div', {
	      staticClass: "c-calendar__body"
	    }, [_vm.monthsShow ? _c('c-monthtable', {
	      attrs: {
	        "minDate": _vm.minDate,
	        "maxDate": _vm.maxDate,
	        "year": _vm.year
	      },
	      on: {
	        "change": _vm.selectMonth
	      }
	    }) : _vm._e(), !_vm.monthsShow ? _c('c-datetable', {
	      attrs: {
	        "minDate": _vm.minDate,
	        "maxDate": _vm.maxDate,
	        "year": _vm.year,
	        "month": _vm.month,
	        "day": _vm.day
	      },
	      on: {
	        "monthchange": _vm.monthchange,
	        "yearchange": _vm.yearchange,
	        "change": _vm.selectDay
	      }
	    }) : _vm._e()], 1)], 1);
	  },
	  staticRenderFns: [],
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
	  data: function data() {
	    return {
	      date: '',
	      year: 1970,
	      month: 1,
	      day: 1,
	      monthsShow: false
	    };
	  },
	  computed: {
	    className: function className() {
	      return this.size ? "is-".concat(this.size) : 'md';
	    }
	  },
	  created: function created() {
	    this.syncDate();
	  },
	  watch: {
	    value: function value() {
	      this.syncDate();
	    },
	    show: function show(newVal) {
	      newVal && this.syncDate();
	    }
	  },
	  methods: {
	    syncDate: function syncDate() {
	      this.date = this.value || this.date || new Date().format(this.pattern);
	      if (new Date(this.date) > new Date(this.maxDate)) this.date = this.maxDate;
	      if (new Date(this.date) < new Date(this.minDate)) this.date = this.minDate;
	      this.date = new Date(this.date).format(this.pattern);
	      var d = new Date(this.date);

	      if (!isNaN(d.getTime())) {
	        this.year = d.getFullYear();
	        this.month = d.getMonth();
	        this.day = d.getDate();
	      }
	    },
	    selectDay: function selectDay(day) {
	      this.day = day;
	      var date = "".concat(this.year, "-").concat(this.fixZero(this.month + 1), "-").concat(this.fixZero(this.day));
	      this.date = new Date(date).format(this.pattern);
	      this.$emit('update', this.date);
	    },
	    selectMonth: function selectMonth(month) {
	      this.monthsShow = false;
	      this.month = month;
	      this.day = '';
	    },
	    monthchange: function monthchange(month) {
	      this.month = month;
	    },
	    yearchange: function yearchange(year) {
	      this.year = year;
	    },
	    monthTableShow: function monthTableShow(show) {
	      this.monthsShow = show;
	    },
	    updateDay: function updateDay(num, type) {
	      this.monthsShow = false;
	      var date = new Date(this.year, this.month, this.day);
	      type === 'plus' && date.setDate(date.getDate() + num);
	      type === 'sub' && date.setDate(date.getDate() - num);
	      if (new Date(date) > new Date(this.maxDate)) date = this.maxDate;
	      if (new Date(date) < new Date(this.minDate)) date = this.minDate;
	      this.$emit('update', new Date(date).format(this.pattern), true);
	    }
	  }
	};

	var $2_7 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('table', {
	      staticClass: "c-calendar__month-table"
	    }, [_c('tbody', _vm._l(_vm.monthRows, function (month) {
	      return _c('tr', _vm._l(month, function (item) {
	        return _c('td', {
	          on: {
	            "click": function click($event) {
	              _vm.selectMonth(item);
	            }
	          }
	        }, [_c('a', {
	          staticClass: "month-cell",
	          class: {
	            'disabled': !_vm.isSelectedMonth(item)
	          }
	        }, [_vm._v(_vm._s(_vm.mapMonth(item)))])]);
	      }));
	    }))]);
	  },
	  staticRenderFns: [],
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
	    monthRows: function monthRows() {
	      var deps = 3;
	      var rows = [];

	      var _loop = function _loop(i) {
	        var getRowArr = function getRowArr(N) {
	          return Array.from(new Array(N), function (val, index) {
	            return index + i;
	          });
	        };

	        rows.push(getRowArr(deps));
	      };

	      for (var i = 0; i < this.months.length; i += deps) {
	        _loop(i);
	      }

	      return rows;
	    },
	    minYear: function minYear() {
	      return new Date(this.minDate).getFullYear();
	    },
	    maxYear: function maxYear() {
	      return new Date(this.maxDate).getFullYear();
	    },
	    minMonth: function minMonth() {
	      return new Date(this.minDate).getMonth();
	    },
	    maxMonth: function maxMonth() {
	      return new Date(this.maxDate).getMonth();
	    }
	  },
	  data: function data() {
	    return {
	      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
	    };
	  },
	  methods: {
	    selectMonth: function selectMonth(month) {
	      if (!this.isSelectedMonth(month)) return;
	      this.$emit('change', month);
	    },
	    mapMonth: function mapMonth(month) {
	      return this.months[month];
	    }
	  }
	};

	var $2_8 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-card",
	      class: {
	        'is-horizontal': _vm.horizontal
	      }
	    }, [_vm.$slots.title ? _c('div', {
	      staticClass: "c-card__title"
	    }, [_vm._t("title")], 2) : _vm._e(), _vm.$slots.media ? _c('div', {
	      staticClass: "c-card__media"
	    }, [_vm._t("media")], 2) : _vm._e(), _vm.$slots.default ? _c('div', {
	      staticClass: "c-card__body"
	    }, [_vm._t("default")], 2) : _vm._e(), _vm.$slots.actions ? _c('div', {
	      staticClass: "c-card__actions"
	    }, [_vm._t("actions")], 2) : _vm._e()]);
	  },
	  staticRenderFns: [],
	  name: 'c-card',
	  props: {
	    horizontal: Boolean
	  },
	  data: function data() {
	    return {};
	  },
	  methods: {}
	};

	var Menu = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', [_c('ul', {
	      staticClass: "cascader-menu"
	    }, _vm._l(_vm.optionList, function (item) {
	      return _c('li', {
	        staticClass: "casecader-menu-item",
	        class: {
	          'active': item.selected,
	          'disabled': item.disabled
	        },
	        attrs: {
	          "title": item[_vm.showkey]
	        },
	        on: {
	          "click": function click($event) {
	            _vm.onMenuClick(item);
	          }
	        }
	      }, [_vm._v(_vm._s(item[_vm.labelKey])), _vm.hasChildren(item) ? _c('span', {
	        staticClass: "cascader-icon"
	      }, [_c('c-icon', {
	        attrs: {
	          "name": "chevron-right"
	        }
	      })], 1) : _vm._e()]);
	    })), _c('div', {
	      staticClass: "c-cascader__childmenu"
	    }, [_vm.childrenOptions.length > 0 ? _c('c-cascader-menu', {
	      attrs: {
	        "parentMenu": _vm.currentParentMenu,
	        "options": _vm.childrenOptions,
	        "labelKey": _vm.labelKey,
	        "valueKey": _vm.valueKey,
	        "childrenKey": _vm.childrenKey,
	        "showAllLevel": _vm.showAllLevel,
	        "changeOnSelect": _vm.changeOnSelect,
	        "loadChildren": _vm.loadChildren,
	        "level": _vm.level + 1
	      }
	    }) : _vm._e()], 1)]);
	  },
	  staticRenderFns: [],
	  _scopeId: 'data-v-125e08b0',
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
	      default: function _default() {
	        return {
	          label: [],
	          value: []
	        };
	      }
	    },
	    options: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    loadChildren: {
	      type: Function,
	      default: null
	    }
	  },
	  inject: ['$cascader'],
	  data: function data() {
	    return {
	      optionList: [],
	      childrenOptions: [],
	      currentParentMenu: {
	        label: [],
	        value: []
	      }
	    };
	  },
	  created: function created() {
	    this.resetOptionSelected();
	    this.currentParentMenu = JSON.parse(JSON.stringify(this.parentMenu));
	  },
	  watch: {
	    parentMenu: function parentMenu() {
	      this.childrenOptions = [];
	    },
	    options: {
	      handler: function handler() {
	        var _this = this;

	        this.resetOptionSelected();

	        if (this.parentMenu.label.length) {
	          this.$nextTick(function (_) {
	            var activeOption = _this.optionList.find(function (option) {
	              return option[_this.labelKey] === _this.parentMenu.label[0];
	            });

	            if (!_this.childrenOptions.length && _this.hasChildren(activeOption) && activeOption[_this.childrenKey]) {
	              _this.childrenOptions = activeOption[_this.childrenKey];
	            }
	          });
	        }
	      },
	      deep: true
	    }
	  },
	  methods: {
	    resetOptionSelected: function resetOptionSelected() {
	      var _this2 = this;

	      var options = JSON.parse(JSON.stringify(this.options));
	      this.optionList = options.map(function (item) {
	        _this2.$set(item, 'selected', false);

	        return item;
	      });

	      if (this.$cascader.value.length) {
	        var selectedItem = this.optionList.find(function (option) {
	          return option[_this2.valueKey] === _this2.$cascader.value[_this2.level];
	        });
	        selectedItem && this.$set(selectedItem, 'selected', true);

	        if (selectedItem && this.hasChildren(selectedItem)) {
	          this.childrenOptions = selectedItem[this.childrenKey];
	        }
	      }
	    },
	    hasChildren: function hasChildren(item) {
	      return item && item.hasOwnProperty(this.childrenKey);
	    },
	    updateShowValue: function updateShowValue(item) {
	      this.$cascader.showValue = this.showAllLevel ? this.currentParentMenu.label.join(this.separator) : item[this.labelKey];
	      this.$cascader.onChange(JSON.parse(JSON.stringify(this.currentParentMenu)));
	    },
	    onMenuClick: function onMenuClick(item) {
	      var _this3 = this;

	      if (item.disabled) return;
	      this.optionList.map(function (item) {
	        _this3.$set(item, 'selected', false);

	        return item;
	      });
	      var _this$parentMenu = this.parentMenu,
	          label = _this$parentMenu.label,
	          value = _this$parentMenu.value;
	      label[this.level] = item[this.labelKey];
	      value[this.level] = item[this.valueKey];
	      this.currentParentMenu = {
	        label: label.slice(0, this.level + 1),
	        value: value.slice(0, this.level + 1)
	      };
	      this.$set(item, 'selected', true);

	      if (this.hasChildren(item) && !item[this.childrenKey].length && this.loadChildren) {
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
	};

	var $2_9 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-cascader",
	      on: {
	        "click": function click($event) {
	          _vm.isOpen = true;
	        }
	      }
	    }, [_c('div', {
	      staticClass: "cascader-context"
	    }, [_c('c-input', {
	      attrs: {
	        "placeholder": _vm.placeholder,
	        "width": "normal",
	        "size": _vm.size,
	        "disabled": _vm.disabled
	      },
	      model: {
	        value: _vm.showValue,
	        callback: function callback($$v) {
	          _vm.showValue = $$v;
	        },
	        expression: "showValue"
	      }
	    }), _c('c-icon', {
	      staticClass: "c-cascader__icon",
	      attrs: {
	        "name": "chevron-down"
	      }
	    })], 1), _c('div', {
	      staticClass: "cascader-dropmenu",
	      class: _vm.className
	    }, [_vm.isOpen ? [_c('c-cascader-menu', {
	      attrs: {
	        "parentMenu": _vm.parentMenu,
	        "options": _vm.optionList,
	        "labelKey": _vm.labelKey,
	        "valueKey": _vm.valueKey,
	        "childrenKey": _vm.childrenKey,
	        "showAllLevel": _vm.showAllLevel,
	        "changeOnSelect": _vm.changeOnSelect,
	        "loadChildren": _vm.loadChildren
	      }
	    })] : _vm._e()], 2)]);
	  },
	  staticRenderFns: [],
	  name: 'c-cascader',
	  components: {
	    'c-cascader-menu': Menu
	  },
	  provide: function provide() {
	    return {
	      '$cascader': this
	    };
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
	      default: function _default() {
	        return [];
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
	    className: function className() {
	      return this.size ? "is-".concat(this.size) : 'md';
	    }
	  },
	  data: function data() {
	    return {
	      parentMenu: {
	        label: [],
	        value: []
	      },
	      optionList: [],
	      cascaderMenu: '',
	      showValue: '',
	      isOpen: false
	    };
	  },
	  created: function created() {
	    this.optionList = _toConsumableArray(this.options);
	  },
	  mounted: function mounted() {
	    if ((typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object') {
	      this.cascaderMenu = document.querySelector('.cascader-dropmenu');
	      document.body.appendChild(this.cascaderMenu);
	      this.resize();
	    }

	    window.addEventListener('resize', this.resize, false);
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.cascaderMenu.remove();
	    window.removeEventListener('resize', this.resize, false);
	  },
	  watch: {
	    options: {
	      handler: function handler() {
	        this.optionList = _toConsumableArray(this.options);
	      },
	      deep: true
	    },
	    value: function value(newVal) {
	      var labels = this.getLabelWithValue(this.value);
	      this.showValue = this.showAllLevel ? labels.join(this.separator) : labels[labels.length - 1];
	    },
	    isOpen: function isOpen() {
	      if (this.isOpen) {
	        this.resize();
	        window.addEventListener('click', this.onBodyClick, true);
	      } else {
	        window.removeEventListener('click', this.onBodyClick, true);
	      }
	    }
	  },
	  methods: {
	    close: function close() {
	      this.isOpen = false;
	    },
	    onChange: function onChange(selectMenu) {
	      this.$emit('input', selectMenu.value);
	      this.$emit('change', selectMenu);
	    },
	    getLabelWithValue: function getLabelWithValue(value) {
	      var _this = this;

	      var labels = [];
	      value.reduce(function (result, item) {
	        var resultTarget = result.find(function (data) {
	          return data[_this.valueKey] === item;
	        });
	        var label = resultTarget.label;
	        var children = resultTarget[_this.childrenKey];
	        labels.push(label);

	        if (children && children.length) {
	          return children;
	        }

	        return result;
	      }, this.optionList);
	      return labels;
	    },
	    onBodyClick: function onBodyClick(e) {
	      var isInCascader = this.$el.contains(e.target);
	      var isInCascaderMenu = this.cascaderMenu.contains(e.target);

	      if (!isInCascader && !isInCascaderMenu) {
	        this.close();
	        this.$el.focus();
	      }
	    },
	    getStyle: function getStyle() {
	      var clientRect = this.$el.getBoundingClientRect();
	      var windowH = window.innerHeight;
	      var marginTop = 2;
	      var scrollBarWidth = 20;
	      var scrollHeight = document.body.scrollWidth > window.innerWidth ? scrollBarWidth : 0;
	      var droplistHeight = this.cascaderMenu.clientHeight;
	      var defaultTop = clientRect.top + clientRect.height + marginTop + window.pageYOffset;
	      var clientHeight = clientRect.height + marginTop;
	      var clientY = clientRect.y;
	      var compTop = windowH - droplistHeight - scrollHeight;
	      var left = clientRect.left + window.pageXOffset;
	      var top = droplistHeight + clientHeight + clientY + scrollHeight > windowH ? compTop : defaultTop;
	      return "\n        position: absolute;\n        top: ".concat(top, "px;\n        left: ").concat(left, "px;\n        z-index: 9;\n      ");
	    },
	    resize: function resize() {
	      var _this2 = this;

	      this.$nextTick(function () {
	        _this2.cascaderMenu.style.cssText = _this2.getStyle();
	      });
	    }
	  }
	};

	/**
	 * 检查值是否为空
	 */
	function isEmpty(value) {
	  if (value === null || value === void 0) return true;

	  if (typeof value === 'string' || Array.isArray(value)) {
	    return value.length === 0;
	  }

	  if (typeof value === 'boolean') return !value;
	  if (typeof value === 'number') return value === 0;
	  if (_typeof(value) === 'object') return Object.keys(value).length === 0;
	}
	/**
	 * 获取变量的字符串值
	 */

	function toString$1(value) {
	  return value === void 0 || value === null ? '' : value.toString().trim();
	}

	var ruleset = {
	  /**
	   * 必填(选)验证
	   */
	  required: function required(value) {
	    var valid = !isEmpty(value);
	    var isCheckable = Array.isArray(value) || typeof value === 'boolean';
	    var errMsg = isCheckable ? '请选择' : '请填写此项';
	    var msg = valid ? '' : errMsg;
	    return {
	      valid: valid,
	      msg: msg
	    };
	  },

	  /**
	   * 最小长度验证
	   * @param param {String} 最少输入多少个字
	   */
	  minlength: function minlength(value, param) {
	    // value需要转换成字符串计算length，不然数字或者0都会是invalid
	    var valid = toString$1(value).length >= parseInt(param);
	    var msg = valid ? '' : "\u8BF7\u6700\u5C11\u586B\u5199".concat(param, "\u4E2A\u5B57");
	    return {
	      valid: valid,
	      msg: msg
	    };
	  },

	  /**
	   * 最大长度验证， 主要针对 IE9 下 textarea 的 maxlength 无效的情况
	   * @param param {String} 最多输入多少个字
	   */
	  maxlength: function maxlength(value, param) {
	    // value需要转换成字符串计算length，不然数字或者0都会是invalid
	    var valid = toString$1(value).length <= parseInt(param);
	    var msg = valid ? '' : "\u6700\u591A\u586B\u5199".concat(param, "\u4E2A\u5B57");
	    return {
	      valid: valid,
	      msg: msg
	    };
	  },

	  /**
	   * 验证输入是否某种指定类型的格式
	   * @param param {String} 类型，比如email、tel等
	   */
	  type: function type(value, param) {
	    var method = "".concat(param, "Type");
	    return ruleset[method](value);
	  },

	  /**
	   * 邮箱格式验证
	   */
	  emailType: function emailType(value) {
	    var pattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
	    var valid = pattern.test(toString$1(value));
	    var msg = valid ? '' : '邮箱格式不正确';
	    return {
	      valid: valid,
	      msg: msg
	    };
	  },

	  /**
	   * 手机号码格式
	   */
	  mobileType: function mobileType(value) {
	    var pattern = /^1[3|4|5|7|8]\d{9}$/;
	    var valid = pattern.test(toString$1(value));
	    var msg = valid ? '' : '手机号码格式不正确';
	    return {
	      valid: valid,
	      msg: msg
	    };
	  },

	  /**
	   * 固定电话格式
	   */
	  telType: function telType(value) {
	    var pattern = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;
	    var valid = pattern.test(toString$1(value));
	    var msg = valid ? '' : '固定电话号码格式不正确';
	    return {
	      valid: valid,
	      msg: msg
	    };
	  },

	  /**
	   * 数字格式
	   */
	  numberType: function numberType(value) {
	    var valid = !isNaN(value);
	    var msg = valid ? '' : '请输入数字';
	    return {
	      valid: valid,
	      msg: msg
	    };
	  },

	  /**
	   * max格式
	   */
	  max: function max(value, param) {
	    var valid = !isNaN(value);
	    var msg = valid ? '' : '请输入数字';
	    if (!valid) return {
	      valid: valid,
	      msg: msg
	    };
	    valid = parseFloat(value) <= parseFloat(param);
	    msg = valid ? '' : "\u8F93\u5165\u503C\u6700\u5927\u4E3A".concat(param);
	    return {
	      valid: valid,
	      msg: msg
	    };
	  },

	  /**
	   * min格式
	   */
	  min: function min(value, param) {
	    var valid = !isNaN(value);
	    var msg = valid ? '' : '请输入数字';
	    if (!valid) return {
	      valid: valid,
	      msg: msg
	    };
	    valid = parseFloat(value) >= parseFloat(param);
	    msg = valid ? '' : "\u8F93\u5165\u503C\u6700\u5C0F\u4E3A".concat(param);
	    return {
	      valid: valid,
	      msg: msg
	    };
	  },

	  /**
	   * 整数格式
	   */
	  integerType: function integerType(value, input) {
	    var pattern = /^\d*$/;
	    var valid = pattern.test(toString$1(value));
	    var msg = valid ? '' : '请输入整数';
	    return {
	      valid: valid,
	      msg: msg
	    };
	  },

	  /**
	   * URL格式
	   */
	  urlType: function urlType(value) {
	    /* eslint-disable max-len, no-useless-escape */
	    var pattern = /^(https?\:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}[\/\?\#]?([\/\?\#][\w|\:|\/|\.|\-|\#|\!|\~|\%|\&|\+|\=|\?|\$]+)?$/i;
	    var valid = pattern.test(toString$1(value));
	    var msg = valid ? '' : 'URL 格式不正确';
	    return {
	      valid: valid,
	      msg: msg
	    };
	  },

	  /**
	   * 自定义正则
	   */
	  pattern: function pattern(value, param) {
	    var valid = param.test(toString$1(value));
	    var msg = valid ? '' : '格式不符合要求';
	    return {
	      valid: valid,
	      msg: msg
	    };
	  }
	};

	var Validator = {
	  validate: validate
	  /**
	   * 验证 value 是否符合规则
	   * @param value {String} 要验证的值
	   * @param rules {Object} 规则
	   * @return {Object} 结果对象，有valid和msg两个字段
	   */

	};

	function validate(value) {
	  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  // msg 为自定义错误信息
	  var msg = rules.msg;
	  var pass = {
	    valid: true
	  };
	  var isValueEmpty = isEmpty(value); // 非必填项且没有填写时，不进行校验

	  if (!rules.required && isValueEmpty) return pass;
	  var results = Object.keys(rules).filter(function (ruleName) {
	    return canValidate(ruleName, rules[ruleName]);
	  }).map(function (ruleName) {
	    return checkSingleRule(ruleName, rules[ruleName], value, msg);
	  });
	  var failedResult = results.find(function (result) {
	    return !result.valid;
	  });
	  return failedResult || pass;
	}
	/**
	 * 验证单条规则
	 */


	function checkSingleRule(ruleName, param, value, msg) {
	  var validFunction = typeof param === 'function' ? param : ruleset[ruleName];
	  var result = validFunction(value, param);

	  if (!result.valid && msg) {
	    // 验证不通过且有自定义消息
	    if (typeof msg === 'string') {
	      // 自定义消息为字符串时直接使用
	      result.msg = msg;
	    } else if (msg[ruleName]) {
	      // 自定义消息为对象时，取出该类错误的消息
	      result.msg = msg[ruleName];
	    }
	  }

	  return result;
	}
	/**
	 * 给出的规则是否可验证
	 * 条件：
	 * 1. 非保留字，'msg' 用来指定自定义提示
	 * 2. 内置或自定义规则
	 */


	function canValidate(ruleName, param) {
	  var isReservedWord = ruleName === 'msg';
	  var isBuiltinRule = typeof ruleset[ruleName] === 'function';
	  var isCustomRule = typeof param === 'function';
	  return !isReservedWord && (isBuiltinRule || isCustomRule);
	}

	var validatable = {
	  props: {
	    rules: {
	      type: Object,
	      default: function _default(_) {
	        return {};
	      }
	    }
	  },
	  data: function data() {
	    return {
	      // store validation result
	      validity: {
	        valid: true,
	        msg: '',
	        dirty: false
	      },
	      isValidatable: true
	    };
	  },
	  inject: {
	    '$form': {
	      default: null
	    },
	    '$formItem': {
	      default: null
	    }
	  },
	  created: function created() {
	    var hasRules = this.$options.props.rules || this.rules;

	    if (!this.$options.props.value || !hasRules) {
	      var msg = "Prop 'value' and 'rules' are required to use 'Validatable'.";
	      throw new Error(msg);
	    }

	    var setDirty = function setDirty() {
	      this.validity.dirty = true;
	    };

	    this.$on('input', setDirty);
	    this.$on('change', setDirty);
	  },
	  mounted: function mounted() {
	    var $form = this.$form,
	        $formItem = this.$formItem;
	    if ($form) $form.$emit('validatable-attached', this);
	    if ($formItem) $formItem.$emit('validatable-attached', this);
	  },
	  beforeDestroy: function beforeDestroy() {
	    var $form = this.$form,
	        $formItem = this.$formItem;
	    if ($form) $form.$emit('validatable-detached', this);
	    if ($formItem) $formItem.$emit('validatable-detached', this);
	  },
	  watch: {
	    value: function value() {
	      if (this.validity.dirty) {
	        Object.assign(this.validity, this.validate());
	      }
	    }
	  },
	  methods: {
	    validate: function validate() {
	      this.validity.dirty = true;
	      var $formItem = this.$formItem;
	      var required = $formItem && $formItem.required;
	      var rules = Object.assign({
	        required: required
	      }, this.rules);
	      if (!rules.msg) rules.msg = {};

	      if (_typeof(rules.msg) === 'object' && !rules.msg.required) {
	        var label = $formItem && $formItem.label ? $formItem.label : '';
	        var action = this.$options.name === 'c-input' ? '填写' : '选择';
	        rules.msg.required = "\u8BF7".concat(action).concat(label.replace(/[:：]/, ''));
	      }

	      return Object.assign(this.validity, Validator.validate(this.value, rules));
	    },
	    resetValidity: function resetValidity() {
	      Object.assign(this.validity, {
	        dirty: false,
	        valid: true,
	        msg: ''
	      });
	    }
	  }
	};

	var name$1 = 'c-checkbox-group';
	var pass = {
	  valid: true,
	  msg: '' // 最少选择X项

	};

	var minItems = function minItems(value) {
	  if (!this.minItems) return pass;
	  var valid = Array.isArray(value) && value.length >= this.minItems;
	  var msg = valid ? '' : "\u8BF7\u81F3\u5C11\u9009\u62E9".concat(this.minItems, "\u9879");
	  return {
	    valid: valid,
	    msg: msg
	  };
	}; // 最多选择X项


	var maxItems = function maxItems(value) {
	  if (!this.maxItems) return pass;
	  var valid = Array.isArray(value) && value.length <= this.maxItems;
	  var msg = valid ? '' : "\u6700\u591A\u53EF\u4EE5\u9009\u62E9".concat(this.maxItems, "\u9879");
	  return {
	    valid: valid,
	    msg: msg
	  };
	};

	var props$1 = {
	  value: {
	    type: Array,
	    default: function _default() {
	      return [];
	    }
	  },
	  minItems: Number,
	  maxItems: Number,
	  options: {
	    type: Array,
	    required: true,
	    default: function _default() {
	      return [];
	    }
	  }
	};
	var $2_11 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-checkbox-group"
	    }, [_vm._l(_vm.optionList, function (option, index) {
	      return _c('c-checkbox', {
	        key: index,
	        attrs: {
	          "label": option.label,
	          "disabled": option.disabled
	        },
	        on: {
	          "change": function change($event) {
	            _vm.onItemChange($event, index);
	          }
	        },
	        model: {
	          value: _vm.isChecked[index],
	          callback: function callback($$v) {
	            _vm.$set(_vm.isChecked, index, $$v);
	          },
	          expression: "isChecked[index]"
	        }
	      });
	    }), !_vm.validity.valid ? _c('em', {
	      staticClass: "c-error-msg"
	    }, [_vm._v(_vm._s(_vm.validity.msg))]) : _vm._e()], 2);
	  },
	  staticRenderFns: [],
	  name: name$1,
	  model: {
	    event: 'change'
	  },
	  props: props$1,
	  mixins: [validatable],
	  inject: {
	    $form: {
	      default: null
	    }
	  },
	  data: function data() {
	    return {
	      isChecked: []
	    };
	  },
	  computed: {
	    optionList: function optionList() {
	      return this.options.map(function (item) {
	        if (typeof item === 'string') {
	          return {
	            value: item,
	            label: item
	          };
	        }

	        if (item && _typeof(item) === 'object') {
	          if (item.hasOwnProperty('label') && item.hasOwnProperty('value')) {
	            return item;
	          }
	        }

	        throw new TypeError('Type of option prop is invalid.');
	      });
	    }
	  },
	  created: function created() {
	    Object.assign(this.rules, {
	      minItems: minItems.bind(this),
	      maxItems: maxItems.bind(this)
	    });
	    this.updateChecked();
	    this.$watch('options', this.updateChecked);
	    this.$watch('value', this.updateChecked);
	  },
	  methods: {
	    updateChecked: function updateChecked() {
	      var _this = this;

	      var isChecked = this.optionList.map(function (option) {
	        return _this.value.indexOf(option.value) > -1;
	      });
	      this.isChecked = isChecked;
	    },
	    onItemChange: function onItemChange(checked, index) {
	      var isChecked = _toConsumableArray(this.isChecked);

	      isChecked[index] = checked;
	      var checkedValues = this.optionList.filter(function (_, i) {
	        return isChecked[i];
	      }).map(function (option) {
	        return option.value;
	      });
	      this.$emit('change', checkedValues);
	    }
	  }
	};

	/**
	 * A Vue.js mixin to add reset functionality to form fields
	 */
	var resettable = {
	  inject: {
	    $form: {
	      default: null
	    }
	  },
	  data: function data() {
	    return {
	      initialValue: void 0,
	      isResettable: true
	    };
	  },
	  created: function created() {
	    var _this = this;

	    // skip inner components
	    if (this.$parent.isResettable) return;
	    var model = this.constructor.extendOptions.model;
	    var prop = model && model.prop || 'value';
	    var event = model && model.event || 'input';
	    this.$prop = prop;
	    this.$event = event; // listen form reset event

	    if (this.$form) {
	      this.$form.$on('reset', function (e) {
	        return _this.reset();
	      });
	    } // remember initial value


	    if (this.initialValue === void 0) {
	      this.initialValue = this[this.$prop];
	    }
	  },
	  methods: {
	    reset: function reset() {
	      this.$emit(this.$event, this.initialValue);
	    }
	  }
	};

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
	var $2_12 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('label', {
	      staticClass: "c-checkbox",
	      class: _vm.classNames,
	      on: {
	        "change": _vm.onChange
	      }
	    }, [_c('input', {
	      ref: "input",
	      attrs: {
	        "type": "checkbox",
	        "name": _vm.name,
	        "disabled": _vm.disabled
	      },
	      domProps: {
	        "checked": _vm.value
	      }
	    }), _c('span', {
	      staticClass: "c-checkbox__box"
	    }), _c('span', {
	      staticClass: "c-checkbox__label"
	    }, [_vm._v(_vm._s(_vm.label))])]);
	  },
	  staticRenderFns: [],
	  name: name$2,
	  model: {
	    event: 'change'
	  },
	  props: props$2,
	  inject: {
	    $form: {
	      default: null
	    }
	  },
	  mixins: [resettable, validatable],
	  computed: {
	    classNames: function classNames() {
	      var size = this.size,
	          $form = this.$form;
	      var actualSize = size || $form && $form.size;
	      return actualSize ? "is-".concat(actualSize) : '';
	    }
	  },
	  watch: {
	    indeterminate: function indeterminate(newVal) {
	      if (this.$refs.input) {
	        this.$refs.input.indeterminate = Boolean(newVal);
	      }
	    }
	  },
	  mounted: function mounted() {
	    if (this.$refs.input) {
	      this.$refs.input.indeterminate = this.indeterminate;
	    }
	  },
	  methods: {
	    onChange: function onChange(e) {
	      this.$emit('change', e.target.checked);
	    }
	  }
	};

	var $2_13 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-chip__wrapper",
	      class: _vm.classNames,
	      style: _vm.styleObj
	    }, [_vm.label ? _c('span', {
	      staticClass: "c-chip__label"
	    }, [_vm._v(_vm._s(_vm.label))]) : _vm._t("default"), _vm.closable ? _c('span', {
	      on: {
	        "click": function click($event) {
	          $event.stopPropagation();

	          _vm.$emit('close');
	        }
	      }
	    }, [_c('c-icon', {
	      attrs: {
	        "name": "x",
	        "valign": "middle"
	      }
	    })], 1) : _vm._e()], 2);
	  },
	  staticRenderFns: [],
	  name: 'c-chip',
	  props: {
	    label: VueTypes.string,
	    size: VueTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).def('md'),
	    color: VueTypes.string,
	    closable: VueTypes.bool.def(false)
	  },
	  data: function data() {
	    return {
	      presetColors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'indigo', 'purple', 'pink', 'dark', 'black']
	    };
	  },
	  computed: {
	    classNames: function classNames() {
	      var classList = "";

	      if (this.color && this.presetColors.indexOf(this.color) >= 0) {
	        classList += " c-chip--".concat(this.color);
	      }

	      if (this.closable) {
	        classList += ' c-chip--closable';
	      }

	      if (this.size) {
	        classList += " c-chip--".concat(this.size);
	      }

	      return classList;
	    },
	    styleObj: function styleObj() {
	      var style = {};

	      if (this.color && this.presetColors.indexOf(this.color) < 0) {
	        style = {
	          'backgroundColor': this.color
	        };
	      }

	      return style;
	    }
	  }
	};

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

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

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
	    throw new TypeError(FUNC_ERROR_TEXT);
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
	        timeWaiting = wait - timeSinceLastCall;

	    return maxing
	      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
	      : timeWaiting;
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
	var FUNC_ERROR_TEXT$1 = 'Expected a function';

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
	    throw new TypeError(FUNC_ERROR_TEXT$1);
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
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	var _listCacheClear = listCacheClear;

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	var eq_1 = eq;

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq_1(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	var _assocIndexOf = assocIndexOf;

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = _assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	var _listCacheDelete = listCacheDelete;

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = _assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	var _listCacheGet = listCacheGet;

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return _assocIndexOf(this.__data__, key) > -1;
	}

	var _listCacheHas = listCacheHas;

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = _assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	var _listCacheSet = listCacheSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = _listCacheClear;
	ListCache.prototype['delete'] = _listCacheDelete;
	ListCache.prototype.get = _listCacheGet;
	ListCache.prototype.has = _listCacheHas;
	ListCache.prototype.set = _listCacheSet;

	var _ListCache = ListCache;

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new _ListCache;
	  this.size = 0;
	}

	var _stackClear = stackClear;

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	var _stackDelete = stackDelete;

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	var _stackGet = stackGet;

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	var _stackHas = stackHas;

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction$1(value) {
	  if (!isObject_1(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = _baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	var isFunction_1 = isFunction$1;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = _root['__core-js_shared__'];

	var _coreJsData = coreJsData;

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	var _isMasked = isMasked;

	/** Used for built-in method references. */
	var funcProto$1 = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString$1 = funcProto$1.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString$1.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	var _toSource = toSource;

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto$2 = Function.prototype,
	    objectProto$3 = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString$2 = funcProto$2.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString$2.call(hasOwnProperty$3).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject_1(value) || _isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(_toSource(value));
	}

	var _baseIsNative = baseIsNative;

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	var _getValue = getValue;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = _getValue(object, key);
	  return _baseIsNative(value) ? value : undefined;
	}

	var _getNative = getNative;

	/* Built-in method references that are verified to be native. */
	var Map$1 = _getNative(_root, 'Map');

	var _Map = Map$1;

	/* Built-in method references that are verified to be native. */
	var nativeCreate = _getNative(Object, 'create');

	var _nativeCreate = nativeCreate;

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
	  this.size = 0;
	}

	var _hashClear = hashClear;

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var _hashDelete = hashDelete;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto$4 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (_nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty$4.call(data, key) ? data[key] : undefined;
	}

	var _hashGet = hashGet;

	/** Used for built-in method references. */
	var objectProto$5 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$5 = objectProto$5.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$5.call(data, key);
	}

	var _hashHas = hashHas;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
	  return this;
	}

	var _hashSet = hashSet;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = _hashClear;
	Hash.prototype['delete'] = _hashDelete;
	Hash.prototype.get = _hashGet;
	Hash.prototype.has = _hashHas;
	Hash.prototype.set = _hashSet;

	var _Hash = Hash;

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new _Hash,
	    'map': new (_Map || _ListCache),
	    'string': new _Hash
	  };
	}

	var _mapCacheClear = mapCacheClear;

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	var _isKeyable = isKeyable;

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return _isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	var _getMapData = getMapData;

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = _getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var _mapCacheDelete = mapCacheDelete;

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return _getMapData(this, key).get(key);
	}

	var _mapCacheGet = mapCacheGet;

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return _getMapData(this, key).has(key);
	}

	var _mapCacheHas = mapCacheHas;

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = _getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	var _mapCacheSet = mapCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = _mapCacheClear;
	MapCache.prototype['delete'] = _mapCacheDelete;
	MapCache.prototype.get = _mapCacheGet;
	MapCache.prototype.has = _mapCacheHas;
	MapCache.prototype.set = _mapCacheSet;

	var _MapCache = MapCache;

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof _ListCache) {
	    var pairs = data.__data__;
	    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new _MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	var _stackSet = stackSet;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new _ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = _stackClear;
	Stack.prototype['delete'] = _stackDelete;
	Stack.prototype.get = _stackGet;
	Stack.prototype.has = _stackHas;
	Stack.prototype.set = _stackSet;

	var _Stack = Stack;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED$2);
	  return this;
	}

	var _setCacheAdd = setCacheAdd;

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	var _setCacheHas = setCacheHas;

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values == null ? 0 : values.length;

	  this.__data__ = new _MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
	SetCache.prototype.has = _setCacheHas;

	var _SetCache = SetCache;

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	var _arraySome = arraySome;

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	var _cacheHas = cacheHas;

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new _SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!_arraySome(other, function(othValue, othIndex) {
	            if (!_cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	var _equalArrays = equalArrays;

	/** Built-in value references. */
	var Uint8Array = _root.Uint8Array;

	var _Uint8Array = Uint8Array;

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	var _mapToArray = mapToArray;

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	var _setToArray = setToArray;

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG$1 = 1,
	    COMPARE_UNORDERED_FLAG$1 = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag$1 = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq_1(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = _mapToArray;

	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
	      convert || (convert = _setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG$1;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag$1:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	var _equalByTag = equalByTag;

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	var _arrayPush = arrayPush;

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray$1 = Array.isArray;

	var isArray_1 = isArray$1;

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
	}

	var _baseGetAllKeys = baseGetAllKeys;

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	var _arrayFilter = arrayFilter;

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	var stubArray_1 = stubArray;

	/** Used for built-in method references. */
	var objectProto$6 = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};

	var _getSymbols = getSymbols;

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	var _baseTimes = baseTimes;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
	}

	var _baseIsArguments = baseIsArguments;

	/** Used for built-in method references. */
	var objectProto$7 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
	  return isObjectLike_1(value) && hasOwnProperty$6.call(value, 'callee') &&
	    !propertyIsEnumerable$1.call(value, 'callee');
	};

	var isArguments_1 = isArguments;

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	var stubFalse_1 = stubFalse;

	var isBuffer_1 = createCommonjsModule(function (module, exports) {
	/** Detect free variable `exports`. */
	var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? _root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse_1;

	module.exports = isBuffer;
	});

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER : length;

	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}

	var _isIndex = isIndex;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER$1 = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
	}

	var isLength_1 = isLength;

	/** `Object#toString` result references. */
	var argsTag$1 = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag$1 = '[object Boolean]',
	    dateTag$1 = '[object Date]',
	    errorTag$1 = '[object Error]',
	    funcTag$1 = '[object Function]',
	    mapTag$1 = '[object Map]',
	    numberTag$1 = '[object Number]',
	    objectTag$1 = '[object Object]',
	    regexpTag$1 = '[object RegExp]',
	    setTag$1 = '[object Set]',
	    stringTag$1 = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag$1 = '[object ArrayBuffer]',
	    dataViewTag$1 = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
	typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] =
	typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
	typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] =
	typedArrayTags[objectTag$1] = typedArrayTags[regexpTag$1] =
	typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike_1(value) &&
	    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
	}

	var _baseIsTypedArray = baseIsTypedArray;

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	var _baseUnary = baseUnary;

	var _nodeUtil = createCommonjsModule(function (module, exports) {
	/** Detect free variable `exports`. */
	var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && _freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule && freeModule.require && freeModule.require('util').types;

	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;
	});

	/* Node.js helper references. */
	var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

	var isTypedArray_1 = isTypedArray;

	/** Used for built-in method references. */
	var objectProto$8 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray_1(value),
	      isArg = !isArr && isArguments_1(value),
	      isBuff = !isArr && !isArg && isBuffer_1(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? _baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty$7.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           _isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _arrayLikeKeys = arrayLikeKeys;

	/** Used for built-in method references. */
	var objectProto$9 = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$9;

	  return value === proto;
	}

	var _isPrototype = isPrototype;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = _overArg(Object.keys, Object);

	var _nativeKeys = nativeKeys;

	/** Used for built-in method references. */
	var objectProto$10 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$8 = objectProto$10.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!_isPrototype(object)) {
	    return _nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty$8.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _baseKeys = baseKeys;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength_1(value.length) && !isFunction_1(value);
	}

	var isArrayLike_1 = isArrayLike;

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
	}

	var keys_1 = keys;

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return _baseGetAllKeys(object, keys_1, _getSymbols);
	}

	var _getAllKeys = getAllKeys;

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG$2 = 1;

	/** Used for built-in method references. */
	var objectProto$11 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$9 = objectProto$11.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
	      objProps = _getAllKeys(object),
	      objLength = objProps.length,
	      othProps = _getAllKeys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty$9.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	var _equalObjects = equalObjects;

	/* Built-in method references that are verified to be native. */
	var DataView = _getNative(_root, 'DataView');

	var _DataView = DataView;

	/* Built-in method references that are verified to be native. */
	var Promise$1 = _getNative(_root, 'Promise');

	var _Promise = Promise$1;

	/* Built-in method references that are verified to be native. */
	var Set = _getNative(_root, 'Set');

	var _Set = Set;

	/* Built-in method references that are verified to be native. */
	var WeakMap = _getNative(_root, 'WeakMap');

	var _WeakMap = WeakMap;

	/** `Object#toString` result references. */
	var mapTag$2 = '[object Map]',
	    objectTag$2 = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag$2 = '[object Set]',
	    weakMapTag$1 = '[object WeakMap]';

	var dataViewTag$2 = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = _toSource(_DataView),
	    mapCtorString = _toSource(_Map),
	    promiseCtorString = _toSource(_Promise),
	    setCtorString = _toSource(_Set),
	    weakMapCtorString = _toSource(_WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = _baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
	    (_Map && getTag(new _Map) != mapTag$2) ||
	    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
	    (_Set && getTag(new _Set) != setTag$2) ||
	    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
	  getTag = function(value) {
	    var result = _baseGetTag(value),
	        Ctor = result == objectTag$2 ? value.constructor : undefined,
	        ctorString = Ctor ? _toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag$2;
	        case mapCtorString: return mapTag$2;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag$2;
	        case weakMapCtorString: return weakMapTag$1;
	      }
	    }
	    return result;
	  };
	}

	var _getTag = getTag;

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG$3 = 1;

	/** `Object#toString` result references. */
	var argsTag$2 = '[object Arguments]',
	    arrayTag$1 = '[object Array]',
	    objectTag$3 = '[object Object]';

	/** Used for built-in method references. */
	var objectProto$12 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$10 = objectProto$12.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray_1(object),
	      othIsArr = isArray_1(other),
	      objTag = objIsArr ? arrayTag$1 : _getTag(object),
	      othTag = othIsArr ? arrayTag$1 : _getTag(other);

	  objTag = objTag == argsTag$2 ? objectTag$3 : objTag;
	  othTag = othTag == argsTag$2 ? objectTag$3 : othTag;

	  var objIsObj = objTag == objectTag$3,
	      othIsObj = othTag == objectTag$3,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer_1(object)) {
	    if (!isBuffer_1(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new _Stack);
	    return (objIsArr || isTypedArray_1(object))
	      ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
	    var objIsWrapped = objIsObj && hasOwnProperty$10.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty$10.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new _Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new _Stack);
	  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	var _baseIsEqualDeep = baseIsEqualDeep;

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
	    return value !== value && other !== other;
	  }
	  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	var _baseIsEqual = baseIsEqual;

	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are compared by strict equality, i.e. `===`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return _baseIsEqual(value, other);
	}

	var isEqual_1 = isEqual;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	var browser = invariant;

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
	var hasOwnProperty$11 = Object.prototype.hasOwnProperty;
	var propIsEnumerable$1 = Object.prototype.propertyIsEnumerable;

	function toObject$1(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative$1() {
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

	var index = shouldUseNative$1() ? Object.assign : function (target, source) {
		var arguments$1 = arguments;

		var from;
		var to = toObject$1(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments$1[s]);

			for (var key in from) {
				if (hasOwnProperty$11.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols$1) {
				symbols = getOwnPropertySymbols$1(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable$1.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	var component = /-?\d+(\.\d+)?%?/g;
	function extractComponents(color) {
	  return color.match(component);
	}

	var extractComponents_1 = extractComponents;

	var extractComponents$1 = /*#__PURE__*/Object.freeze({
	  default: extractComponents_1,
	  __moduleExports: extractComponents_1
	});

	function clamp$1(val, min, max) {
	  return Math.min(Math.max(val, min), max);
	}

	var clamp_1$1 = clamp$1;

	var clamp$2 = /*#__PURE__*/Object.freeze({
	  default: clamp_1$1,
	  __moduleExports: clamp_1$1
	});

	var require$$0 = ( extractComponents$1 && extractComponents_1 ) || extractComponents$1;

	var require$$1 = ( clamp$2 && clamp_1$1 ) || clamp$2;

	var extractComponents$2 = require$$0;
	var clamp$3 = require$$1;

	function parseHslComponent(component, i) {
	  component = parseFloat(component);

	  switch(i) {
	    case 0:
	      return clamp$3(component, 0, 360);
	    case 1:
	    case 2:
	      return clamp$3(component, 0, 100);
	    case 3:
	      return clamp$3(component, 0, 1);
	  }
	}

	function hsl(color) {
	  return extractComponents$2(color).map(parseHslComponent);
	}

	var hsl_1 = hsl;

	var hsl$1 = /*#__PURE__*/Object.freeze({
	  default: hsl_1,
	  __moduleExports: hsl_1
	});

	function expand(hex) {
	  var result = "#";

	  for (var i = 1; i < hex.length; i++) {
	    var val = hex.charAt(i);
	    result += val + val;
	  }

	  return result;
	}

	function hex(hex) {
	  // #RGB or #RGBA
	  if(hex.length === 4 || hex.length === 5) {
	    hex = expand(hex);
	  }

	  var rgb = [
	    parseInt(hex.substring(1,3), 16),
	    parseInt(hex.substring(3,5), 16),
	    parseInt(hex.substring(5,7), 16)
	  ];

	  // #RRGGBBAA
	  if (hex.length === 9) {
	    var alpha = parseFloat((parseInt(hex.substring(7,9), 16) / 255).toFixed(2));
	    rgb.push(alpha);
	  }

	  return rgb;
	}

	var hex_1 = hex;

	var hex$1 = /*#__PURE__*/Object.freeze({
	  default: hex_1,
	  __moduleExports: hex_1
	});

	var extractComponents$3 = require$$0;
	var clamp$4 = require$$1;

	function parseRgbComponent(component, i) {
	  if (i < 3) {
	    if (component.indexOf('%') != -1) {
	      return Math.round(255 * clamp$4(parseInt(component, 10), 0, 100)/100);
	    } else {
	      return clamp$4(parseInt(component, 10), 0, 255);
	    }
	  } else {
	    return clamp$4(parseFloat(component), 0, 1);
	  } 
	}

	function rgb(color) {
	  return extractComponents$3(color).map(parseRgbComponent);
	}

	var rgb_1 = rgb;

	var rgb$1 = /*#__PURE__*/Object.freeze({
	  default: rgb_1,
	  __moduleExports: rgb_1
	});

	function hsl2rgb(hsl) {
	  var h = hsl[0] / 360,
	      s = hsl[1] / 100,
	      l = hsl[2] / 100,
	      t1, t2, t3, rgb, val;

	  if (s == 0) {
	    val = l * 255;
	    return [val, val, val];
	  }

	  if (l < 0.5)
	    { t2 = l * (1 + s); }
	  else
	    { t2 = l + s - l * s; }
	  t1 = 2 * l - t2;

	  rgb = [0, 0, 0];
	  for (var i = 0; i < 3; i++) {
	    t3 = h + 1 / 3 * - (i - 1);
	    t3 < 0 && t3++;
	    t3 > 1 && t3--;

	    if (6 * t3 < 1)
	      { val = t1 + (t2 - t1) * 6 * t3; }
	    else if (2 * t3 < 1)
	      { val = t2; }
	    else if (3 * t3 < 2)
	      { val = t1 + (t2 - t1) * (2 / 3 - t3) * 6; }
	    else
	      { val = t1; }

	    rgb[i] = val * 255;
	  }

	  return rgb;
	}

	var hsl2rgb_1 = hsl2rgb;

	var require$$0$1 = ( hsl$1 && hsl_1 ) || hsl$1;

	var require$$1$1 = ( hex$1 && hex_1 ) || hex$1;

	var require$$2 = ( rgb$1 && rgb_1 ) || rgb$1;

	var hsl$2 = require$$0$1;
	var hex$2 = require$$1$1;
	var rgb$2 = require$$2;
	var hsl2rgb$1 = hsl2rgb_1;

	function hsl2rgbParse(color) {
	  var h = hsl$2(color);
	  var r = hsl2rgb$1(h);

	  // handle alpha since hsl2rgb doesn't know (or care!) about it
	  if(h.length === 4) {
	    r.push(h[3]);
	  }

	  return r;
	}

	var space2parser = {
	  "#" : hex$2,
	  "hsl" : hsl2rgbParse,
	  "rgb" : rgb$2
	};

	function parse(color) {
	  for(var scheme in space2parser) {
	    if(color.indexOf(scheme) === 0) {
	      return space2parser[scheme](color);
	    }
	  }
	}

	parse.rgb = rgb$2;
	parse.hsl = hsl$2;
	parse.hex = hex$2;

	var index$1 = parse;

	function rgb2hsv(rgb) {
	  var r = rgb[0],
	      g = rgb[1],
	      b = rgb[2],
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      delta = max - min,
	      h, s, v;

	  if (max == 0)
	    { s = 0; }
	  else
	    { s = (delta/max * 1000)/10; }

	  if (max == min)
	    { h = 0; }
	  else if (r == max)
	    { h = (g - b) / delta; }
	  else if (g == max)
	    { h = 2 + (b - r) / delta; }
	  else if (b == max)
	    { h = 4 + (r - g) / delta; }

	  h = Math.min(h * 60, 360);

	  if (h < 0)
	    { h += 360; }

	  v = ((max / 255) * 1000) / 10;

	  return [h, s, v];
	}

	var rgb2hsv_1 = rgb2hsv;

	var clamp$5 = require$$1;

	function componentToHex(c) {
	  var value = Math.round(clamp$5(c, 0, 255));
	  var hex   = value.toString(16);

	  return hex.length == 1 ? "0" + hex : hex;
	}

	function rgb2hex(rgb) {
	  var alpha = rgb.length === 4 ? componentToHex(rgb[3] * 255) : "";

	  return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]) + alpha;
	}

	var rgb2hex_1 = rgb2hex;

	function hsv2hsl(hsv) {
	  var h = hsv[0],
	      s = hsv[1] / 100,
	      v = hsv[2] / 100,
	      sl, l;

	  l = (2 - s) * v;
	  sl = s * v;
	  sl /= (l <= 1) ? l : 2 - l;
	  sl = sl || 0;
	  l /= 2;
	  return [h, sl * 100, l * 100];
	}

	var hsv2hsl_1 = hsv2hsl;

	function hsv2rgb(hsv) {
	  var h = hsv[0] / 60,
	      s = hsv[1] / 100,
	      v = hsv[2] / 100,
	      hi = Math.floor(h) % 6;

	  var f = h - Math.floor(h),
	      p = 255 * v * (1 - s),
	      q = 255 * v * (1 - (s * f)),
	      t = 255 * v * (1 - (s * (1 - f))),
	      v = 255 * v;

	  switch(hi) {
	    case 0:
	      return [v, t, p];
	    case 1:
	      return [q, v, p];
	    case 2:
	      return [p, v, t];
	    case 3:
	      return [p, q, v];
	    case 4:
	      return [t, p, v];
	    case 5:
	      return [v, p, q];
	  }
	}

	var hsv2rgb_1 = hsv2rgb;

	var toPrecision = function (num, precision) {
	  var p = precision | 0;
	  return p > 0 ? parseFloat(num.toFixed(p)) : num
	};

	var VueCtrlComponent = {
	  name: 'v-ctrl',
	  abstract: true,
	  props: {
	    direction: {
	      type: String,
	      default: 'h',
	      validator: function validator (val) {
	        return ['v', 'h', 'vh', 'hv'].indexOf(val) > -1
	      }
	    },
	    throttle: {
	      type: Number,
	      default: 80
	    },
	    precision: {
	      type: Number
	    }
	  },

	  methods: {
	    msdown: function msdown (e) {
	      e.preventDefault();
	      document.addEventListener('mousemove', this.msmove);
	      document.addEventListener('mouseup', this.msup);
	      this.next(e);
	    },
	  
	    msmove: function msmove (e) {
	      e.preventDefault();
	      this.next(e);
	    },
	  
	    msup: function msup (e) {
	      this.next(e);
	      document.removeEventListener('mousemove', this.msmove);
	      document.removeEventListener('mouseup', this.msup);
	    },
	  
	    notify: function notify (val) {
	      if (isEqual_1(this.memo, val) === false) {
	        this.memo = val;
	        this.$emit('change', val);
	      }
	    },

	    next: function next (ref) {
	      if ( ref === void 0 ) { ref = {}; }
	      var clientX = ref.clientX; if ( clientX === void 0 ) { clientX = 0; }
	      var clientY = ref.clientY; if ( clientY === void 0 ) { clientY = 0; }

	      var ref$1 = this;
	      var direction = ref$1.direction;
	      var adjust = ref$1.adjust;
	      var rect = this.$el.getBoundingClientRect();

	      var left = rect.left;
	      var width = rect.width;
	      var deltaX = clientX - left;
	      var x = adjust(deltaX / width);

	      if (direction === 'h') {
	        return this.notify(x)
	      }
	  
	      var top = rect.top;
	      var height = rect.height;
	      var deltaY = clientY - top;
	      var y = adjust(deltaY / height);

	      if (direction === 'v') {
	        return this.notify(y)
	      }

	      // both direction
	      this.notify([x, y]);
	    },

	    adjust: function adjust (num) {
	      return toPrecision(clamp_1(num, 0, 1), this.precision)
	    }
	  },

	  render: function render (h) {
	    return this.$slots.default[0]
	  },

	  created: function created () {
	    var ref = this;
	    var msdown = ref.msdown;
	    var msmove = ref.msmove;

	    this.msdown = msdown.bind(this);
	    this.msmove = throttle_1(msmove.bind(this), this.throttle);

	    this.memo = null;
	  },

	  mounted: function mounted () {
	    this.$el.addEventListener('mousedown', this.msdown);
	  },

	  destroyed: function destroyed () {
	    this.$el.removeEventListener('mousedown', this.msdown);
	  },

	  install: function install () {
	    Vue.component(VueCtrlComponent.name, VueCtrlComponent);
	  }
	};

	if (typeof window !== 'undefined' && window.Vue) {
	  Vue.use(VueCtrlComponent);
	}

	var index$2 = { VueCtrlComponent: VueCtrlComponent };

	var colorModes = Object.freeze({
	  rgba: ['r', 'g', 'b', 'a'],
	  hsla: ['h', 's', 'l', 'a'],
	  hex: ['hex']
	});

	var VColorComponent = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cp__wrapper"},[_c('v-ctrl',{attrs:{"direction":"vh","precision":2,"throttle":80},on:{"change":_vm.onSaturationChange}},[_c('div',{staticClass:"cp__v-ctrl cp__saturation"},[_c('div',{staticClass:"msk-hue",style:(_vm.styles.saturationPane)}),_vm._v(" "),_c('div',{staticClass:"msk-white"}),_vm._v(" "),_c('div',{staticClass:"msk-black"}),_vm._v(" "),_c('p',{staticClass:"cp__thumb",style:(_vm.styles.saturationThumb)})])]),_vm._v(" "),_c('div',{staticClass:"cp__ctrl-pane"},[_c('div',[_c('div',{staticClass:"cp__preview"},[_c('div',{style:(_vm.styles.preview)})]),_vm._v(" "),_c('div',{staticClass:"cp__tracks"},[_c('v-ctrl',{attrs:{"direction":"h","precision":2,"throttle":80},on:{"change":_vm.onHueChange}},[_c('div',{staticClass:"cp__v-ctrl cp__ctrl-bar cp__ctrl-hue"},[_c('div',{staticClass:"cp__thumb",style:(_vm.styles.hueThumb)})])]),_vm._v(" "),_c('v-ctrl',{attrs:{"direction":"h","precision":2,"throttle":80},on:{"change":_vm.onAlphaChange}},[_c('div',{staticClass:"cp__v-ctrl cp__ctrl-alpha"},[_c('div',{staticClass:"cp__thumb",style:(_vm.styles.alphaThumb)}),_vm._v(" "),_c('div',{staticClass:"cp__ctrl-bar",style:(_vm.styles.alphaTrack)})])])],1)]),_vm._v(" "),_c('div',{staticStyle:{"margin-top":"10px"}},[_c('div',{staticClass:"cp__fm-fields"},_vm._l((_vm.colorModes[_vm.currentMode]),function(k){return _c('div',{key:k,staticStyle:{"padding-left":"6px","width":"100%"}},[_c('div',{staticStyle:{"position":"relative"}},[_c('input',{attrs:{"type":_vm.constrains[k].type,"maxlength":_vm.constrains[k].maxlength},domProps:{"value":_vm.colorModel[k]},on:{"change":function($event){_vm.handleInput(k, $event);}}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(k))])])])})),_vm._v(" "),_c('div',{staticClass:"cp__fm-switcher"},[_c('div',{on:{"click":function($event){_vm.changecurrentMode();}}},[_c('svg',{attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"fill":"#333","d":"M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"}}),_vm._v(" "),_c('path',{attrs:{"fill":"#333","d":"M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15Z"}})])])])])])],1)},staticRenderFns: [],
	  name: 'color-picker',
	  props: {
	    color: {
	      type: String,
	      default: '#ff0000'
	    }
	  },

	  components: {
	    'v-ctrl': index$2.VueCtrlComponent
	  },

	  data: function data () {
	    var ref = this;
	    var color = ref.color;

	    var commonNumber = {
	      type: 'number',
	      maxlength: 3,
	    };
	    var percentValue = {
	      type: 'string',
	      maxlength: 4
	    };

	    return Object.assign({}, this.digestProp(color),
	      {currentMode: getColorType(color),
	      colorModes: colorModes,
	      colorModel: {
	        hex: '',
	        r: '',
	        g: '',
	        b: '',
	        h: '',
	        s: '',
	        l: '',
	        a: ''
	      },
	      constrains: {
	        r: commonNumber,
	        g: commonNumber,
	        b: commonNumber,
	        h: commonNumber,
	        s: percentValue,
	        l: percentValue,
	        a: {
	          type: 'number',
	          maxlength: 4
	        },
	        hex: {
	          type: 'string',
	          maxlength: 9
	        }
	      }})
	  },

	  watch: {
	    color: {
	      immediate: true,
	      handler: function handler (newVal, oldVal) {
	        if (newVal !== oldVal) {
	          index(this, this.digestProp(newVal));
	        }
	      }
	    },
	    rgba: {
	      immediate: true,
	      handler: function handler (newVal, oldVal) {
	        if (("" + newVal) !== ("" + oldVal)) {
	          this.emitChange();
	        }
	      }
	    }
	  },

	  computed: {
	    hsva: function hsva () {
	      var ref = this;
	      var hue = ref.hue;
	      var alpha = ref.alpha;
	      var ref_saturation = ref.saturation;
	      var x = ref_saturation.x;
	      var y = ref_saturation.y;
	      return [
	        hue * 360,
	        x * 100,
	        (1 - y) * 100,
	        alpha
	      ]
	    },

	    rgba: function rgba () {
	      var ref = this;
	      var alpha = ref.alpha;
	      var hsva = ref.hsva;
	      var ref$1 = hsv2rgb_1(hsva);
	      var r = ref$1[0];
	      var g = ref$1[1];
	      var b = ref$1[2];
	      return [
	        Math.round(r),
	        Math.round(g),
	        Math.round(b),
	        alpha
	      ]
	    },

	    hsla: function hsla () {
	      var ref = this;
	      var alpha = ref.alpha;
	      var hsva = ref.hsva;
	      var ref$1 = hsv2hsl_1(hsva);
	      var h = ref$1[0];
	      var s = ref$1[1];
	      var l = ref$1[2];
	      return [
	        Math.round(h),
	        ((Math.round(s)) + "%"),
	        ((Math.round(l)) + "%"),
	        alpha
	      ]
	    },

	    hex: function hex () {
	      return rgb2hex_1(this.rgba)
	    },

	    previewBorderColor: function previewBorderColor () {
	      var ref = this.rgba;
	      var r = ref[0];
	      var g = ref[1];
	      var b = ref[2];
	      if ((r + g + b) / 3 > 235) {
	        return "rgba(160,160,160,0.8)"
	      }
	      return 'transparent'
	    },

	    styles: function styles () {
	      var ref = this;
	      var rgba = ref.rgba;
	      var alpha = ref.alpha;
	      var hue = ref.hue;
	      var saturation = ref.saturation;
	      var strRGB = rgba.slice(0, 3).join(', ');

	      var strHueRGB = hsl2rgb_1([hue * 360, 100, 50])
	        .map(function (v) { return Math.round(v); })
	        .join(', ');

	      return {
	        preview: {
	          backgroundColor: ("rgba(" + (rgba.join(', ')) + ")"),
	          borderColor: this.previewBorderColor
	        },
	        saturationPane: {
	          backgroundColor: ("rgb(" + strHueRGB + ")")
	        },
	        saturationThumb: {
	          left: toPercent(saturation.x),
	          top: toPercent(saturation.y)
	        },
	        alphaTrack: {
	          backgroundImage: "linear-gradient(to right, " +
	            "rgba(" + strRGB + ", 0) 0%, rgb(" + strRGB + ") 100%)"
	        },
	        alphaThumb: {
	          left: toPercent(alpha)
	        },
	        hueThumb: {
	          left: toPercent(1 - hue)
	        }
	      }
	    }
	  },

	  methods: {
	    digestProp: function digestProp (val) {
	      var rgba = index$1(val);
	      var alpha = rgba[3] == null ? 1 : rgba[3];
	      var ref = rgb2hsv_1(rgba);
	      var hue = ref[0];
	      var saturation = ref[1];
	      var value = ref[2];

	      // format of alpha: `.2f`
	      // according to Chrome DevTool
	      var _alpha = parseFloat(alpha.toFixed(2));

	      return {
	        alpha: _alpha,
	        hue: hue / 360,
	        saturation: {
	          x: saturation / 100,
	          y: 1 - value / 100
	        }
	      }
	    },
	    onSaturationChange: function onSaturationChange (ref) {
	      var x = ref[0];
	      var y = ref[1];

	      this.saturation = { x: x, y: y };
	    },
	    onHueChange: function onHueChange (e) {
	      this.hue = 1 - e;
	    },
	    onAlphaChange: function onAlphaChange (e) {
	      // format of alpha: `.2f`
	      // according to Chrome DevTool
	      this.alpha = parseFloat(e.toFixed(2));
	    },

	    emitChange: function emitChange () {
	      var ref = this;
	      var alpha = ref.alpha;
	      var hex = ref.hex;
	      var rgba = ref.rgba;
	      var hsla = ref.hsla;
	      var hexVal = simplifyHex(
	        alpha === 1 ? hex.slice(0, 7) : hex
	      );

	      this.$emit('change', {
	        rgba: rgba,
	        hsla: hsla,
	        hex: hexVal
	      });

	      // this ensures that every component in
	      // our model is up to date
	      var h = hsla[0];
	      var s = hsla[1];
	      var l = hsla[2];
	      var r = rgba[0];
	      var g = rgba[1];
	      var b = rgba[2];
	      var shortHex = index(this.colorModel, {
	        r: r, g: g, b: b, h: h, s: s, l: l,
	        a: alpha,
	        hex: hexVal
	      });
	    },

	    changecurrentMode: function changecurrentMode () {
	      var modes = Object.keys(this.colorModes);
	      var index$$1 = modes.indexOf(this.currentMode);
	      this.currentMode = modes[(index$$1 + 1) % modes.length];
	    },

	    handleInput: function handleInput (type, event) {
	      var ref = this;
	      var currentMode = ref.currentMode;
	      var colorModel = ref.colorModel;
	      var value = event.target.value;
	      var num = Number(value);
	      var changed = false;

	      switch (type) {
	        case 'a':
	          if (colorModel[type] !== num && !isNaN(num)) {
	            colorModel[type] = clamp_1(num, 0, 1);
	            changed = true;
	          }
	          break

	        case 'r':
	        case 'g':
	        case 'b':
	          if (colorModel[type] !== num && !isNaN(num)) {
	            colorModel[type] = clamp_1(num, 0, 255) | 0;
	            changed = true;
	          }
	          break

	        case 'h':
	          if (colorModel[type] !== num && !isNaN(num)) {
	            colorModel[type] = clamp_1(num, 0, 360) | 0;
	            changed = true;
	          }
	          break

	        case 's':
	        case 'l':
	          if (value.slice(-1) === '%' && colorModel[type] !== value) {
	            num = parseFloat(value);
	            colorModel[type] = (clamp_1(num, 0, 360) | 0) + "%";
	            changed = true;
	          }
	          break

	        case 'hex':
	          if (value[0] === '#') {
	            if (colorModel[type] !== value && index$1(value).every(function (i) { return !isNaN(i); })) {
	              colorModel[type] = simplifyHex(value);
	              changed = true;
	            }
	          }
	          break
	      }

	      if (changed) {
	        var h = colorModel.h;
	        var s = colorModel.s;
	        var l = colorModel.l;
	        var r = colorModel.r;
	        var g = colorModel.g;
	        var b = colorModel.b;
	        var a = colorModel.a;
	        var hex = colorModel.hex;
	        var literal = hex;

	        if (currentMode === 'rgba') {
	          literal = "rgba(" + ([r, g, b, a]) + ")";
	        } else if (currentMode === 'hsla') {
	          literal = "hsla(" + ([h, s, l, a]) + ")";
	        }

	        index(this, this.digestProp(literal));
	      }
	    }
	  },

	  created: function created () {
	    this.handleInput = debounce_1(this.handleInput.bind(this), 50);
	  }
	};

	function toPercent (n, precision) {
	  if ( precision === void 0 ) precision = 3;

	  // eslint-disable-next-line
	  var num = (n * 100).toPrecision(precision | 0);
	  return (num + "%")
	}

	function getColorType (color) {
	  if (color[0] === '#') {
	    return 'hex'
	  }

	  if (color.indexOf('rgb') === 0) {
	    return 'rgba'
	  }

	  if (color.indexOf('hsl') === 0) {
	    return 'hsla'
	  }

	  browser(false, (color + " is not valid color value!"));
	}

	function simplifyHex (val) {
	  return val.replace(/#([0-9a-f])\1([0-9a-f])\2([0-9a-f])\3([0-9a-f]?)\4$/, '#$1$2$3$4')
	}

	VColorComponent.install = function (Vue) {
	  Vue.config.devtools = "production" !== 'production';
	  Vue.component(VColorComponent.name, VColorComponent);
	};

	var start = 1992;
	var zIndex = {
	  next: function next() {
	    return start++;
	  }
	};

	var sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
	var sizeMap = {
	  'xs': 12,
	  'sm': 18,
	  'md': 24,
	  'lg': 28,
	  'xl': 36
	};
	var $2_14 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _vm.inline ? _c('color-picker', {
	      attrs: {
	        "color": _vm.value
	      },
	      on: {
	        "change": _vm.handleChange
	      }
	    }) : _c('div', {
	      staticClass: "color-picker__wrapper"
	    }, [_c('c-portal', [_c('transition', {
	      on: {
	        "before-enter": _vm.beforeEnter,
	        "enter": _vm.enter,
	        "after-enter": _vm.afterEnter,
	        "leave": _vm.leave,
	        "after-leave": _vm.afterLeave
	      }
	    }, [_c('color-picker', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: _vm.panelVisible,
	        expression: "panelVisible"
	      }],
	      ref: "panel",
	      staticClass: "color-picker__pane--portal",
	      attrs: {
	        "color": _vm.value
	      },
	      on: {
	        "change": _vm.handleChange
	      }
	    })], 1)], 1), _c('div', {
	      ref: "trigger",
	      staticClass: "color-picker__trigger",
	      style: _vm.triggerStyle,
	      on: {
	        "click": _vm.showColorPane
	      }
	    })], 1);
	  },
	  staticRenderFns: [],
	  name: 'c-color-picker',
	  props: {
	    value: VueTypes.string.def('#ff0000'),
	    mode: VueTypes.oneOf(['rgb', 'hsl', 'hex']).def('hex'),
	    inline: VueTypes.bool.def(false),
	    size: VueTypes.oneOf(sizes)
	  },
	  inject: {
	    $form: {
	      default: null
	    }
	  },
	  mixins: [resettable],
	  model: {
	    event: 'change'
	  },
	  components: {
	    'color-picker': VColorComponent
	  },
	  data: function data() {
	    return {
	      color: this.value,
	      rgba: [],
	      panelVisible: false,
	      tidIn: null,
	      tidOut: null
	    };
	  },
	  computed: {
	    triggerStyle: function triggerStyle() {
	      var size = this.size,
	          $form = this.$form,
	          literal = this.literal,
	          borderColor = this.borderColor;
	      var sz = size || $form && $form.size || 'md';
	      var s = "".concat(sizeMap[sz], "px");
	      return {
	        width: s,
	        height: s,
	        backgroundColor: literal,
	        borderColor: borderColor
	      };
	    },
	    borderColor: function borderColor() {
	      var _this$rgba = _slicedToArray(this.rgba, 3),
	          r = _this$rgba[0],
	          g = _this$rgba[1],
	          b = _this$rgba[2];

	      if ((r + g + b) / 3 > 235) {
	        return "rgba(160,160,160,0.8)";
	      }

	      return 'transparent';
	    }
	  },
	  watch: {
	    mode: function mode(newVal) {
	      if (this.__val) {
	        this.handleChange(this.__val);
	      }
	    }
	  },
	  methods: {
	    handleChange: function handleChange(e) {
	      var rgba = e.rgba,
	          hex = e.hex,
	          hsla = e.hsla;
	      var mode = this.mode;
	      var val = '';

	      if (mode === 'hex') {
	        val = hex;
	      } else if (mode === 'hsl') {
	        val = "hsla(".concat(hsla.join(', '), ")");
	      } else {
	        val = "rgba(".concat(rgba.join(', '), ")");
	      }

	      this.__val = e;
	      this.rgba = rgba;
	      this.literal = val;
	      this.$emit('change', val);
	    },
	    showColorPane: function showColorPane() {
	      this.clearTimeout();
	      this.panelVisible = true;
	    },
	    hideColorPane: function hideColorPane() {
	      var _this = this;

	      this.clearTimeout();
	      this.tidOut = setTimeout(function () {
	        _this.panelVisible = false;
	      }, 100);
	    },
	    resize: function resize() {
	      if (this.inline === false) {
	        this.handleResize(this.$refs.panel.$el);
	      }
	    },
	    beforeEnter: function beforeEnter(_ref) {
	      var style = _ref.style;
	      style.display = 'block';
	      style.visibility = 'hidden';
	      style.zIndex = zIndex.next();
	    },
	    enter: function enter(_ref2, done) {
	      var _this2 = this;

	      var style = _ref2.style;
	      style.opacity = 0;
	      this.tidIn = setTimeout(function () {
	        style.visibility = 'visible';
	        style.opacity = 1;

	        _this2.$nextTick(done);
	      }, 100);
	    },
	    afterEnter: function afterEnter(el) {
	      this.handleResize(el);
	    },
	    leave: function leave(_ref3) {
	      var style = _ref3.style;
	      style.opacity = 0;
	      style.visibility = 'hidden';
	      this.clearTimeout();
	    },
	    afterLeave: function afterLeave(_ref4) {
	      var style = _ref4.style;
	      style.cssText = '';
	      style.display = 'none';
	    },
	    clearTimeout: function (_clearTimeout) {
	      function clearTimeout() {
	        return _clearTimeout.apply(this, arguments);
	      }

	      clearTimeout.toString = function () {
	        return _clearTimeout.toString();
	      };

	      return clearTimeout;
	    }(function () {
	      clearTimeout(this.tidOut);
	      clearTimeout(this.tidIn);
	    }),
	    handleResize: function handleResize(el) {
	      var style = el.style;

	      var _ref5 = document.scrollingElement || document.body,
	          scrollLeft = _ref5.scrollLeft,
	          scrollTop = _ref5.scrollTop;

	      var trigger = this.$refs.trigger;
	      var triggerRect = trigger.getBoundingClientRect();
	      var left = scrollLeft + triggerRect.left - triggerRect.width / 2;
	      var top = scrollTop + triggerRect.top + triggerRect.height;
	      style.position = 'absolute';
	      style.marginTop = '6px';
	      style.top = "".concat(top, "px");
	      style.left = "".concat(left, "px");
	    },
	    clickOutside: function clickOutside(_ref6) {
	      var target = _ref6.target;

	      if (this.inline || !this.panelVisible) {
	        return;
	      }

	      var _this$$refs = this.$refs,
	          trigger = _this$$refs.trigger,
	          panel = _this$$refs.panel;
	      var isOutside = !contains(trigger, target) && !contains(panel.$el, target);

	      if (isOutside) {
	        this.hideColorPane();
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.resize = this.resize.bind(this);
	    this.clickOutside = this.clickOutside.bind(this);
	    this.winResize = throttle_1(this.resize, this.$clair.defaultThrottleTime);
	    window.addEventListener('resize', this.winResize);
	    document.body.addEventListener('click', this.clickOutside);
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.clearTimeout();
	    window.removeEventListener('resize', this.winResize);
	    document.body.removeEventListener('click', this.clickOutside);
	  }
	};

	var $2_15 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: _vm.show,
	        expression: "show"
	      }],
	      staticClass: "c-datepicker__range",
	      class: _vm.className
	    }, [_c('div', {
	      staticClass: "c-datepicker__content c-calendar"
	    }, [_c('c-dateheader', {
	      attrs: {
	        "minDate": _vm.minDate,
	        "maxDate": _vm.startMaxDate,
	        "year": _vm.startYear,
	        "month": _vm.startMonth,
	        "monthshow": _vm.startMonthsShow
	      },
	      on: {
	        "monthchange": _vm.startMonthChange,
	        "yearchange": _vm.startYearChange,
	        "monthshow": _vm.startMonthTableShow
	      }
	    }), _c('div', {
	      staticClass: "c-calendar__body"
	    }, [_vm.startMonthsShow ? _c('c-monthtable', {
	      attrs: {
	        "minDate": _vm.minDate,
	        "maxDate": _vm.startMaxDate,
	        "year": _vm.startYear
	      },
	      on: {
	        "change": _vm.startSelectMonth
	      }
	    }) : _vm._e(), !_vm.startMonthsShow ? _c('c-datetable', {
	      attrs: {
	        "type": "range",
	        "minDate": _vm.minDate,
	        "maxDate": _vm.maxDate,
	        "year": _vm.startYear,
	        "month": _vm.startMonth,
	        "day": _vm.startDay,
	        "start": _vm.start,
	        "end": _vm.end,
	        "range-obj": _vm.rangeObj
	      },
	      on: {
	        "monthchange": _vm.startMonthChange,
	        "yearchange": _vm.startYearChange,
	        "change": _vm.selectDay,
	        "rangeChange": _vm.onRangeChange
	      }
	    }) : _vm._e()], 1)], 1), _c('div', {
	      staticClass: "c-datepicker__content c-calendar"
	    }, [_c('c-dateheader', {
	      attrs: {
	        "minDate": _vm.endMinDate,
	        "maxDate": _vm.maxDate,
	        "year": _vm.endYear,
	        "month": _vm.endMonth,
	        "monthshow": _vm.endMonthsShow
	      },
	      on: {
	        "monthchange": _vm.endMonthChange,
	        "yearchange": _vm.endYearChange,
	        "monthshow": _vm.endMonthTableShow
	      }
	    }), _c('div', {
	      staticClass: "c-calendar__body"
	    }, [_vm.endMonthsShow ? _c('c-monthtable', {
	      attrs: {
	        "minDate": _vm.endMinDate,
	        "maxDate": _vm.maxDate,
	        "year": _vm.endYear
	      },
	      on: {
	        "change": _vm.endSelectMonth
	      }
	    }) : _vm._e(), !_vm.endMonthsShow ? _c('c-datetable', {
	      attrs: {
	        "type": "range",
	        "minDate": _vm.minDate,
	        "maxDate": _vm.maxDate,
	        "year": _vm.endYear,
	        "month": _vm.endMonth,
	        "day": _vm.endDay,
	        "start": _vm.start,
	        "end": _vm.end,
	        "range-obj": _vm.rangeObj
	      },
	      on: {
	        "monthchange": _vm.endMonthChange,
	        "yearchange": _vm.endYearChange,
	        "change": _vm.selectDay,
	        "rangeChange": _vm.onRangeChange
	      }
	    }) : _vm._e()], 1)], 1), _c('p', {
	      staticClass: "c-datepicker__text"
	    }, [_vm._v(_vm._s(_vm.start) + " 至 " + _vm._s(_vm.end))]), _c('div', {
	      staticClass: "c-datepicker__btns"
	    }, [_c('c-button', {
	      attrs: {
	        "size": "sm",
	        "outline": "",
	        "primary": ""
	      },
	      on: {
	        "click": _vm.confirmRange
	      }
	    }, [_vm._v("确定")]), _c('c-button', {
	      attrs: {
	        "size": "sm",
	        "outline": ""
	      },
	      on: {
	        "click": _vm.cancel
	      }
	    }, [_vm._v("取消")])], 1)]);
	  },
	  staticRenderFns: [],
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
	  data: function data() {
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
	    };
	  },
	  created: function created() {
	    var _this$value = _slicedToArray(this.value, 2),
	        start = _this$value[0],
	        end = _this$value[1];

	    this.start = start || '';
	    this.end = end || '';
	    this.updateDate();
	  },
	  watch: {
	    show: function show(newVal) {
	      this.resetDate();
	    },
	    value: function value(newVal) {
	      this.resetDate();
	    }
	  },
	  computed: {
	    className: function className() {
	      return this.size ? "is-".concat(this.size) : 'md';
	    },
	    startMaxDate: function startMaxDate() {
	      return new Date(this.endYear, this.endMonth, 0).format(this.pattern);
	    },
	    endMinDate: function endMinDate() {
	      return new Date(this.startYear, this.startMonth + 1, 1).format(this.pattern);
	    }
	  },
	  methods: {
	    resetDate: function resetDate() {
	      var _this$value2 = _slicedToArray(this.value, 2),
	          start = _this$value2[0],
	          end = _this$value2[1];

	      this.start = start;
	      this.end = end;
	      this.rangeObj = {
	        endDate: '',
	        selecting: true
	      };
	      this.updateDate();
	    },
	    updateDate: function updateDate() {
	      var _this$syncDate = this.syncDate(this.start),
	          _this$syncDate2 = _slicedToArray(_this$syncDate, 3),
	          startYear = _this$syncDate2[0],
	          startMonth = _this$syncDate2[1],
	          startDay = _this$syncDate2[2];

	      if (!this.start) {
	        this.startYear = new Date().getFullYear();
	        this.startMonth = new Date().getMonth();
	        this.startDay = '';
	      } else {
	        this.startYear = startYear;
	        this.startMonth = startMonth;
	        this.startDay = startDay;
	      }

	      var _this$syncDate3 = this.syncDate(this.end),
	          _this$syncDate4 = _slicedToArray(_this$syncDate3, 3),
	          endYear = _this$syncDate4[0],
	          endMonth = _this$syncDate4[1],
	          endDay = _this$syncDate4[2];

	      this.endYear = endYear || this.startYear;

	      if (endMonth === this.startMonth) {
	        var _this$updateMonth = this.updateMonth(this.endYear, endMonth, 1, 'plus');

	        var _this$updateMonth2 = _slicedToArray(_this$updateMonth, 2);

	        this.endYear = _this$updateMonth2[0];
	        this.endMonth = _this$updateMonth2[1];
	      } else if (!endMonth) {
	        var _this$updateMonth3 = this.updateMonth(this.endYear, this.startMonth, 1, 'plus');

	        var _this$updateMonth4 = _slicedToArray(_this$updateMonth3, 2);

	        this.endYear = _this$updateMonth4[0];
	        this.endMonth = _this$updateMonth4[1];
	      } else {
	        this.endMonth = endMonth;
	      }

	      this.endDay = endYear === this.startYear && endMonth === this.startMonth ? '' : endDay;
	    },
	    onRangeChange: function onRangeChange(obj) {
	      this.rangeObj = obj.rangeObj;
	    },
	    syncDate: function syncDate(time) {
	      var d = new Date(time);

	      if (!isNaN(d.getTime())) {
	        return [d.getFullYear(), d.getMonth(), d.getDate()];
	      }

	      return ['', '', ''];
	    },
	    startMonthChange: function startMonthChange(month) {
	      this.startMonth = month;
	    },
	    startYearChange: function startYearChange(year) {
	      this.startYear = year;
	    },
	    startMonthTableShow: function startMonthTableShow(show) {
	      this.startMonthsShow = show;
	    },
	    startSelectMonth: function startSelectMonth(month) {
	      this.startMonthsShow = false;
	      this.startMonth = month;
	      this.startDay = '';
	    },
	    selectDay: function selectDay(dateObj) {
	      this.start = dateObj.start;
	      this.end = dateObj.end;
	      this.updateDate();
	    },
	    endMonthChange: function endMonthChange(month) {
	      this.endMonth = month;
	    },
	    endYearChange: function endYearChange(year) {
	      this.endYear = year;
	    },
	    endMonthTableShow: function endMonthTableShow(show) {
	      this.endMonthsShow = show;
	    },
	    endSelectMonth: function endSelectMonth(month) {
	      this.endMonthsShow = false;
	      this.endMonth = month;
	      this.endDay = '';
	    },
	    cancel: function cancel() {
	      var _this$value3 = _slicedToArray(this.value, 2);

	      this.start = _this$value3[0];
	      this.end = _this$value3[1];
	      this.$emit('change', this.value);
	    },
	    confirmRange: function confirmRange() {
	      this.end = this.end || this.rangeObj.endDate;
	      this.$emit('change', [this.start, this.end]);
	    }
	  }
	};

	var $2_16 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-datepicker",
	      on: {
	        "click": _vm.open
	      }
	    }, [_c('c-icon', {
	      staticClass: "c-datepicker__icon",
	      attrs: {
	        "name": "calendar"
	      }
	    }), _vm.type == 'daterange' ? _c('c-input', {
	      attrs: {
	        "placeholder": _vm.placeholder,
	        "disabled": _vm.disabled,
	        "width": "normal",
	        "size": _vm.size
	      },
	      on: {
	        "change": _vm.dateChange
	      },
	      nativeOn: {
	        "focusin": function focusin($event) {
	          return _vm.open($event);
	        },
	        "focusout": function focusout($event) {
	          return _vm.onBlur($event);
	        }
	      },
	      model: {
	        value: _vm.daterange,
	        callback: function callback($$v) {
	          _vm.daterange = $$v;
	        },
	        expression: "daterange"
	      }
	    }) : _vm.type == 'date' ? _c('c-input', {
	      attrs: {
	        "size": _vm.size,
	        "width": "normal",
	        "placeholder": _vm.placeholder,
	        "disabled": _vm.disabled
	      },
	      on: {
	        "change": _vm.dateChange
	      },
	      nativeOn: {
	        "focusin": function focusin($event) {
	          return _vm.open($event);
	        },
	        "focusout": function focusout($event) {
	          return _vm.onBlur($event);
	        }
	      },
	      model: {
	        value: _vm.date,
	        callback: function callback($$v) {
	          _vm.date = $$v;
	        },
	        expression: "date"
	      }
	    }) : _vm._e(), _c('div', {
	      staticClass: "c-datepicker__panel"
	    }, [_vm.type == 'date' ? _c('c-calendar', {
	      ref: "calendar",
	      attrs: {
	        "value": _vm.date,
	        "show": _vm.isOpen,
	        "size": _vm.size,
	        "minDate": _vm.minDate,
	        "maxDate": _vm.maxDate
	      },
	      on: {
	        "update": _vm.setDate
	      }
	    }) : _vm._e(), _vm.type == 'daterange' ? _c('div', {
	      staticClass: "c-datepicker__body"
	    }, [_c('c-daterange', {
	      attrs: {
	        "value": _vm.date,
	        "size": _vm.size,
	        "show": _vm.isOpen
	      },
	      on: {
	        "change": _vm.setDateRange
	      }
	    })], 1) : _vm._e()], 1)], 1);
	  },
	  staticRenderFns: [],
	  name: 'c-datepicker',
	  model: {
	    event: 'change'
	  },
	  mixins: [resettable, validatable],
	  props: {
	    value: {
	      type: String | Array,
	      default: function _default() {
	        return '';
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
	    daterange: function daterange() {
	      if (this.type === 'date') return [];

	      var _this$date = _slicedToArray(this.date, 2),
	          start = _this$date[0],
	          end = _this$date[1];

	      return !start && !end ? '' : "".concat(start, " \u81F3 ").concat(end);
	    }
	  },
	  data: function data() {
	    return {
	      date: '',
	      datepickerPanel: '',
	      isOpen: false
	    };
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.datepickerPanel.remove();
	    window.removeEventListener('resize', this.resize, false);
	  },
	  watch: {
	    isOpen: function isOpen() {
	      if (this.isOpen) {
	        this.resize();
	        window.addEventListener('click', this.onBodyClick, true);
	        window.addEventListener('keydown', this.onKeyDown, false);
	      } else {
	        window.removeEventListener('click', this.onBodyClick, true);
	        window.removeEventListener('keydown', this.onKeyDown, false);
	      }
	    },
	    value: function value(newVal) {
	      if (newVal !== this.date) {
	        this.date = newVal;
	      }
	    }
	  },
	  created: function created() {
	    this.date = this.value;
	  },
	  mounted: function mounted() {
	    if ((typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object') {
	      this.datepickerPanel = document.querySelector('.c-datepicker__panel');
	      document.body.appendChild(this.datepickerPanel);
	      this.resize();
	      window.addEventListener('resize', this.resize, false);
	    }
	  },
	  methods: {
	    open: function open() {
	      if (this.disabled) return;
	      this.isOpen = true;
	    },
	    close: function close() {
	      this.isOpen = false;
	    },
	    onBlur: function onBlur(e) {
	      var focused = e.relatedTarget;
	      if (focused) this.close();
	    },
	    onKeyDown: function onKeyDown(e) {
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
	      if (keyCode === keys.ESC) this.close();

	      if (keyCode === keys.ENTER && this.type === 'date') {
	        var calendar = this.$refs.calendar;
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
	    dateChange: function dateChange(value) {
	      this.$emit('change', value);
	    },
	    onBodyClick: function onBodyClick(e) {
	      var isInPicker = this.$el.contains(e.target);
	      var isInPanel = this.datepickerPanel.contains(e.target);

	      if (!isInPicker && !isInPanel) {
	        this.close();
	        this.$el.focus();
	      }
	    },
	    setDateRange: function setDateRange(daterange) {
	      this.date = daterange;
	      this.$emit('change', this.date);
	      this.close();
	    },
	    setDate: function setDate(date, notClose) {
	      this.date = date;
	      this.$emit('change', date);
	      !notClose && this.close();
	    },
	    getStyle: function getStyle() {
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
	      return "\n        position: absolute;\n        top: ".concat(top, "px;\n        left: ").concat(left, "px;\n        z-index: 9;\n      ");
	    },
	    resize: function resize() {
	      var _this = this;

	      this.$nextTick(function () {
	        _this.datepickerPanel.style.cssText = _this.getStyle();
	      });
	    }
	  }
	};

	var $2_17 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-form-item",
	      class: _vm.classNames
	    }, [_vm.label || _vm.$slots.label ? _c('label', {
	      staticClass: "c-form-item__label",
	      style: _vm.labelStyle
	    }, [_vm._t("label", [_vm._v(_vm._s(_vm.label))])], 2) : _vm._e(), _c('div', {
	      staticClass: "c-form-item__control",
	      class: {
	        'has-error': _vm.hasError
	      }
	    }, [_vm._t("default"), _c('div', {
	      staticClass: "c-form-item__error"
	    }, [_vm._v(_vm._s(_vm.errorMsg))])], 2)]);
	  },
	  staticRenderFns: [],
	  name: 'c-form-item',
	  provide: function provide() {
	    return {
	      '$formItem': this
	    };
	  },
	  inject: {
	    $form: {
	      default: null
	    }
	  },
	  props: {
	    label: String,
	    required: Boolean,
	    flex: Boolean,
	    labelWidth: String
	  },
	  data: function data() {
	    return {
	      validatable: null
	    };
	  },
	  computed: {
	    hasError: function hasError() {
	      var validatable = this.validatable;
	      return validatable && !validatable.validity.valid;
	    },
	    errorMsg: function errorMsg() {
	      return this.hasError ? this.validatable.validity.msg : '';
	    },
	    classNames: function classNames() {
	      var classNames = [];
	      if (this.required) classNames.push('is-required');
	      if (this.flex) classNames.push('is-flex');
	      return classNames;
	    },
	    actualLabelWidth: function actualLabelWidth() {
	      if (this.labelWidth) return this.labelWidth;
	      return this.$form && this.$form.labelWidth;
	    },
	    labelStyle: function labelStyle() {
	      return {
	        width: this.actualLabelWidth
	      };
	    }
	  },
	  created: function created() {
	    var _this = this;

	    this.$on('validatable-attached', function (v) {
	      // skip child validatable if parent is validatable
	      if (v.$parent.isValidatable) return;
	      _this.validatable = v;
	    });
	    this.$on('validatable-detached', function (v) {
	      _this.validatable = null;
	    });
	  }
	};

	var block$1 = 'c-form';
	var modifiers$1 = ['inline'];
	var getClassName = toClassNames(block$1, modifiers$1);
	var $2_18 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('form', {
	      staticClass: "c-form",
	      class: _vm.classNames,
	      on: {
	        "submit": _vm.onSubmit
	      }
	    }, [_vm._t("default")], 2);
	  },
	  staticRenderFns: [],
	  name: block$1,
	  props: {
	    inline: Boolean,
	    labelWidth: String,
	    size: String,
	    width: String
	  },
	  provide: function provide() {
	    return {
	      '$form': this
	    };
	  },
	  data: function data() {
	    return {
	      validatables: []
	    };
	  },
	  computed: {
	    classNames: function classNames() {
	      var classes = getClassName.call(this);
	      if (this.size) classes.push("is-".concat(this.size));
	      return classes;
	    }
	  },
	  created: function created() {
	    var _this = this;

	    var validatables = this.validatables;
	    this.$on('validatable-attached', function (v) {
	      return validatables.push(v);
	    });
	    this.$on('validatable-detached', function (v) {
	      var i = validatables.indexOf(v);

	      _this.validatables.splice(i, 1);
	    });
	  },
	  methods: {
	    onSubmit: function onSubmit(e) {
	      this.$emit('submit', e);
	    },
	    isValid: function isValid() {
	      return this.validatables.map(function (v) {
	        return v.validate();
	      }).every(function (result) {
	        return result.valid;
	      });
	    },
	    resetValidity: function resetValidity() {
	      this.validatables.forEach(function (v) {
	        return v.resetValidity();
	      });
	    },
	    reset: function reset() {
	      this.$emit('reset');
	      this.resetValidity();
	    }
	  }
	};

	/**
	 * multiply a quantity (with unit)
	 */
	function multiply(quatity, times) {
	  var _ref = /(-?\d+(?:\.\d+)?)(.*)/.exec(quatity) || [],
	      _ref2 = _slicedToArray(_ref, 3),
	      num = _ref2[1],
	      unit = _ref2[2];

	  var timedNum = parseFloat(num) * times;
	  return "".concat(timedNum).concat(unit);
	}

	var breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

	var props$3 = breakpoints.map(function (bp) {
	  return "".concat(bp, "-only");
	}).concat(breakpoints).concat(['order', 'span', 'offset', 'width', 'narrow']);

	var getClassName$1 = function getClassName(values, media) {
	  if (!values) return [];
	  return values.split(/\s+/).map(function (val) {
	    var prefix = /^offset/.test(val) ? 'has' : 'is';
	    return "".concat(prefix, "-").concat(val, "-").concat(media);
	  });
	};

	var $2_19 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-box__item",
	      class: _vm.classNames,
	      style: _vm.style
	    }, [_vm._t("default")], 2);
	  },
	  staticRenderFns: [],
	  name: 'c-box-item',
	  props: props$3,
	  computed: {
	    /**
	     * get class name list of the box item
	     */
	    classNames: function classNames() {
	      var _this = this;

	      var classNames = breakpoints.reduce(function (classNames, bp) {
	        classNames.push.apply(classNames, _toConsumableArray(getClassName$1(_this[bp], bp)));
	        classNames.push.apply(classNames, _toConsumableArray(getClassName$1(_this["".concat(bp, "Only")], "".concat(bp, "-only"))));
	        return classNames;
	      }, []);
	      if (this.span) classNames.push("is-".concat(this.span));
	      if (this.offset) classNames.push("is-offset-".concat(this.offset));
	      if (this.width || this.narrow !== void 0) classNames.push("is-narrow");
	      return classNames;
	    },

	    /**
	     * set box item gap
	     */
	    style: function style() {
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

	      return style;
	    }
	  },
	  methods: {}
	};

	var $2_20 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-container",
	      class: _vm.classNames
	    }, [_vm._t("default")], 2);
	  },
	  staticRenderFns: [],
	  name: 'c-container',
	  props: {
	    size: String,
	    align: String,
	    noPadding: Boolean
	  },
	  computed: {
	    classNames: function classNames() {
	      var classNames = [];
	      if (this.size) classNames.push("is-".concat(this.size));
	      if (this.align) classNames.push("is-".concat(this.align));
	      if (this.noPadding) classNames.push("is-no-padding");
	      return classNames;
	    }
	  }
	};

	var breakpointProps = breakpoints.map(function (bp) {
	  return "".concat(bp, "Only");
	}).concat(breakpoints).reduce(function (props, bp) {
	  props[bp] = String;
	  return props;
	}, {});
	var $2_21 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-box",
	      class: _vm.classNames,
	      style: _vm.style
	    }, [_vm._t("default")], 2);
	  },
	  staticRenderFns: [],
	  props: Object.assign({
	    gap: String,
	    justify: String,
	    align: String,
	    fillHeight: Boolean
	  }, breakpointProps),
	  name: 'c-box',
	  computed: {
	    style: function style() {
	      var margin = this.gap ? multiply(this.gap, -0.5) : '';
	      return {
	        margin: margin
	      };
	    },
	    classNames: function classNames() {
	      var _this = this;

	      var classNames = [];
	      var justify = this.justify,
	          align = this.align,
	          fillHeight = this.fillHeight;
	      breakpoints.forEach(function (bp) {
	        if (_this[bp]) classNames.push("has-".concat(_this[bp], "-").concat(bp));
	        var prop = "".concat(bp, "Only");
	        if (_this[prop]) classNames.push("has-".concat(_this[prop], "-").concat(bp, "-only"));
	      });
	      if (justify) classNames.push("is-justify-".concat(justify));
	      if (align) classNames.push("is-align-".concat(align));
	      if (fillHeight) classNames.push("is-fill-height");
	      return classNames;
	    }
	  }
	};

	var FeatherActivity = {
	  name: "feather-activity",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-activity",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"22 12 18 12 15 21 9 3 6 12 2 12"}})])}
	};

	var FeatherAirplay = {
	  name: "feather-airplay",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-airplay",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"}}),_c('polygon',{attrs:{"points":"12 15 17 21 7 21 12 15"}})])}
	};

	var FeatherAlertCircle = {
	  name: "feather-alert-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-alert-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"12","y1":"8","x2":"12","y2":"12"}}),_c('line',{attrs:{"x1":"12","y1":"16","x2":"12","y2":"16"}})])}
	};

	var FeatherAlertOctagon = {
	  name: "feather-alert-octagon",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-alert-octagon",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}}),_c('line',{attrs:{"x1":"12","y1":"8","x2":"12","y2":"12"}}),_c('line',{attrs:{"x1":"12","y1":"16","x2":"12","y2":"16"}})])}
	};

	var FeatherAlertTriangle = {
	  name: "feather-alert-triangle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-alert-triangle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}}),_c('line',{attrs:{"x1":"12","y1":"9","x2":"12","y2":"13"}}),_c('line',{attrs:{"x1":"12","y1":"17","x2":"12","y2":"17"}})])}
	};

	var FeatherAlignCenter = {
	  name: "feather-align-center",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-align-center",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"18","y1":"10","x2":"6","y2":"10"}}),_c('line',{attrs:{"x1":"21","y1":"6","x2":"3","y2":"6"}}),_c('line',{attrs:{"x1":"21","y1":"14","x2":"3","y2":"14"}}),_c('line',{attrs:{"x1":"18","y1":"18","x2":"6","y2":"18"}})])}
	};

	var FeatherAlignJustify = {
	  name: "feather-align-justify",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-align-justify",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"21","y1":"10","x2":"3","y2":"10"}}),_c('line',{attrs:{"x1":"21","y1":"6","x2":"3","y2":"6"}}),_c('line',{attrs:{"x1":"21","y1":"14","x2":"3","y2":"14"}}),_c('line',{attrs:{"x1":"21","y1":"18","x2":"3","y2":"18"}})])}
	};

	var FeatherAlignLeft = {
	  name: "feather-align-left",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-align-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"17","y1":"10","x2":"3","y2":"10"}}),_c('line',{attrs:{"x1":"21","y1":"6","x2":"3","y2":"6"}}),_c('line',{attrs:{"x1":"21","y1":"14","x2":"3","y2":"14"}}),_c('line',{attrs:{"x1":"17","y1":"18","x2":"3","y2":"18"}})])}
	};

	var FeatherAlignRight = {
	  name: "feather-align-right",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-align-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"21","y1":"10","x2":"7","y2":"10"}}),_c('line',{attrs:{"x1":"21","y1":"6","x2":"3","y2":"6"}}),_c('line',{attrs:{"x1":"21","y1":"14","x2":"3","y2":"14"}}),_c('line',{attrs:{"x1":"21","y1":"18","x2":"7","y2":"18"}})])}
	};

	var FeatherAnchor = {
	  name: "feather-anchor",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-anchor",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"5","r":"3"}}),_c('line',{attrs:{"x1":"12","y1":"22","x2":"12","y2":"8"}}),_c('path',{attrs:{"d":"M5 12H2a10 10 0 0 0 20 0h-3"}})])}
	};

	var FeatherAperture = {
	  name: "feather-aperture",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-aperture",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"14.31","y1":"8","x2":"20.05","y2":"17.94"}}),_c('line',{attrs:{"x1":"9.69","y1":"8","x2":"21.17","y2":"8"}}),_c('line',{attrs:{"x1":"7.38","y1":"12","x2":"13.12","y2":"2.06"}}),_c('line',{attrs:{"x1":"9.69","y1":"16","x2":"3.95","y2":"6.06"}}),_c('line',{attrs:{"x1":"14.31","y1":"16","x2":"2.83","y2":"16"}}),_c('line',{attrs:{"x1":"16.62","y1":"12","x2":"10.88","y2":"21.94"}})])}
	};

	var FeatherArchive = {
	  name: "feather-archive",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-archive",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"21 8 21 21 3 21 3 8"}}),_c('rect',{attrs:{"x":"1","y":"3","width":"22","height":"5"}}),_c('line',{attrs:{"x1":"10","y1":"12","x2":"14","y2":"12"}})])}
	};

	var FeatherArrowDownCircle = {
	  name: "feather-arrow-down-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-down-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('polyline',{attrs:{"points":"8 12 12 16 16 12"}}),_c('line',{attrs:{"x1":"12","y1":"8","x2":"12","y2":"16"}})])}
	};

	var FeatherArrowDownLeft = {
	  name: "feather-arrow-down-left",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-down-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"17","y1":"7","x2":"7","y2":"17"}}),_c('polyline',{attrs:{"points":"17 17 7 17 7 7"}})])}
	};

	var FeatherArrowDownRight = {
	  name: "feather-arrow-down-right",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-down-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"7","y1":"7","x2":"17","y2":"17"}}),_c('polyline',{attrs:{"points":"17 7 17 17 7 17"}})])}
	};

	var FeatherArrowDown = {
	  name: "feather-arrow-down",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-down",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"12","y1":"5","x2":"12","y2":"19"}}),_c('polyline',{attrs:{"points":"19 12 12 19 5 12"}})])}
	};

	var FeatherArrowLeftCircle = {
	  name: "feather-arrow-left-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-left-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('polyline',{attrs:{"points":"12 8 8 12 12 16"}}),_c('line',{attrs:{"x1":"16","y1":"12","x2":"8","y2":"12"}})])}
	};

	var FeatherArrowLeft = {
	  name: "feather-arrow-left",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"19","y1":"12","x2":"5","y2":"12"}}),_c('polyline',{attrs:{"points":"12 19 5 12 12 5"}})])}
	};

	var FeatherArrowRightCircle = {
	  name: "feather-arrow-right-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-right-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('polyline',{attrs:{"points":"12 16 16 12 12 8"}}),_c('line',{attrs:{"x1":"8","y1":"12","x2":"16","y2":"12"}})])}
	};

	var FeatherArrowRight = {
	  name: "feather-arrow-right",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"5","y1":"12","x2":"19","y2":"12"}}),_c('polyline',{attrs:{"points":"12 5 19 12 12 19"}})])}
	};

	var FeatherArrowUpCircle = {
	  name: "feather-arrow-up-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-up-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('polyline',{attrs:{"points":"16 12 12 8 8 12"}}),_c('line',{attrs:{"x1":"12","y1":"16","x2":"12","y2":"8"}})])}
	};

	var FeatherArrowUpLeft = {
	  name: "feather-arrow-up-left",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-up-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"17","y1":"17","x2":"7","y2":"7"}}),_c('polyline',{attrs:{"points":"7 17 7 7 17 7"}})])}
	};

	var FeatherArrowUpRight = {
	  name: "feather-arrow-up-right",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-up-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"7","y1":"17","x2":"17","y2":"7"}}),_c('polyline',{attrs:{"points":"7 7 17 7 17 17"}})])}
	};

	var FeatherArrowUp = {
	  name: "feather-arrow-up",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-arrow-up",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"12","y1":"19","x2":"12","y2":"5"}}),_c('polyline',{attrs:{"points":"5 12 12 5 19 12"}})])}
	};

	var FeatherAtSign = {
	  name: "feather-at-sign",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-at-sign",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"4"}}),_c('path',{attrs:{"d":"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"}})])}
	};

	var FeatherAward = {
	  name: "feather-award",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-award",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"8","r":"7"}}),_c('polyline',{attrs:{"points":"8.21 13.89 7 23 12 20 17 23 15.79 13.88"}})])}
	};

	var FeatherBarChart2 = {
	  name: "feather-bar-chart-2",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-bar-chart-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"18","y1":"20","x2":"18","y2":"10"}}),_c('line',{attrs:{"x1":"12","y1":"20","x2":"12","y2":"4"}}),_c('line',{attrs:{"x1":"6","y1":"20","x2":"6","y2":"14"}})])}
	};

	var FeatherBarChart = {
	  name: "feather-bar-chart",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-bar-chart",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"12","y1":"20","x2":"12","y2":"10"}}),_c('line',{attrs:{"x1":"18","y1":"20","x2":"18","y2":"4"}}),_c('line',{attrs:{"x1":"6","y1":"20","x2":"6","y2":"16"}})])}
	};

	var FeatherBatteryCharging = {
	  name: "feather-battery-charging",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-battery-charging",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"}}),_c('line',{attrs:{"x1":"23","y1":"13","x2":"23","y2":"11"}}),_c('polyline',{attrs:{"points":"11 6 7 12 13 12 9 18"}})])}
	};

	var FeatherBattery = {
	  name: "feather-battery",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-battery",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"1","y":"6","width":"18","height":"12","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"23","y1":"13","x2":"23","y2":"11"}})])}
	};

	var FeatherBellOff = {
	  name: "feather-bell-off",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-bell-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M8.56 2.9A7 7 0 0 1 19 9v4m-2 4H2a3 3 0 0 0 3-3V9a7 7 0 0 1 .78-3.22M13.73 21a2 2 0 0 1-3.46 0"}}),_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}})])}
	};

	var FeatherBell = {
	  name: "feather-bell",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-bell",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"}})])}
	};

	var FeatherBluetooth = {
	  name: "feather-bluetooth",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-bluetooth",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"}})])}
	};

	var FeatherBold = {
	  name: "feather-bold",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-bold",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"}}),_c('path',{attrs:{"d":"M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"}})])}
	};

	var FeatherBookOpen = {
	  name: "feather-book-open",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-book-open",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"}}),_c('path',{attrs:{"d":"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"}})])}
	};

	var FeatherBook = {
	  name: "feather-book",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-book",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"}}),_c('path',{attrs:{"d":"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"}})])}
	};

	var FeatherBookmark = {
	  name: "feather-bookmark",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-bookmark",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"}})])}
	};

	var FeatherBox = {
	  name: "feather-box",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-box",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"}}),_c('polyline',{attrs:{"points":"2.32 6.16 12 11 21.68 6.16"}}),_c('line',{attrs:{"x1":"12","y1":"22.76","x2":"12","y2":"11"}})])}
	};

	var FeatherBriefcase = {
	  name: "feather-briefcase",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-briefcase",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"2","y":"7","width":"20","height":"14","rx":"2","ry":"2"}}),_c('path',{attrs:{"d":"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}})])}
	};

	var FeatherCalendar = {
	  name: "feather-calendar",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-calendar",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"4","width":"18","height":"18","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"16","y1":"2","x2":"16","y2":"6"}}),_c('line',{attrs:{"x1":"8","y1":"2","x2":"8","y2":"6"}}),_c('line',{attrs:{"x1":"3","y1":"10","x2":"21","y2":"10"}})])}
	};

	var FeatherCameraOff = {
	  name: "feather-camera-off",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-camera-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}}),_c('path',{attrs:{"d":"M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"}})])}
	};

	var FeatherCamera = {
	  name: "feather-camera",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-camera",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"}}),_c('circle',{attrs:{"cx":"12","cy":"13","r":"4"}})])}
	};

	var FeatherCast = {
	  name: "feather-cast",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cast",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"}}),_c('line',{attrs:{"x1":"2","y1":"20","x2":"2","y2":"20"}})])}
	};

	var FeatherCheckCircle = {
	  name: "feather-check-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-check-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22 11.08V12a10 10 0 1 1-5.93-9.14"}}),_c('polyline',{attrs:{"points":"22 4 12 14.01 9 11.01"}})])}
	};

	var FeatherCheckSquare = {
	  name: "feather-check-square",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-check-square",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"9 11 12 14 22 4"}}),_c('path',{attrs:{"d":"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"}})])}
	};

	var FeatherCheck = {
	  name: "feather-check",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-check",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"20 6 9 17 4 12"}})])}
	};

	var FeatherChevronDown = {
	  name: "feather-chevron-down",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevron-down",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"6 9 12 15 18 9"}})])}
	};

	var FeatherChevronLeft = {
	  name: "feather-chevron-left",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevron-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"15 18 9 12 15 6"}})])}
	};

	var FeatherChevronRight = {
	  name: "feather-chevron-right",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevron-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"9 18 15 12 9 6"}})])}
	};

	var FeatherChevronUp = {
	  name: "feather-chevron-up",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevron-up",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"18 15 12 9 6 15"}})])}
	};

	var FeatherChevronsDown = {
	  name: "feather-chevrons-down",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevrons-down",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"7 13 12 18 17 13"}}),_c('polyline',{attrs:{"points":"7 6 12 11 17 6"}})])}
	};

	var FeatherChevronsLeft = {
	  name: "feather-chevrons-left",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevrons-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"11 17 6 12 11 7"}}),_c('polyline',{attrs:{"points":"18 17 13 12 18 7"}})])}
	};

	var FeatherChevronsRight = {
	  name: "feather-chevrons-right",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevrons-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"13 17 18 12 13 7"}}),_c('polyline',{attrs:{"points":"6 17 11 12 6 7"}})])}
	};

	var FeatherChevronsUp = {
	  name: "feather-chevrons-up",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chevrons-up",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"17 11 12 6 7 11"}}),_c('polyline',{attrs:{"points":"17 18 12 13 7 18"}})])}
	};

	var FeatherChrome = {
	  name: "feather-chrome",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-chrome",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('circle',{attrs:{"cx":"12","cy":"12","r":"4"}}),_c('line',{attrs:{"x1":"21.17","y1":"8","x2":"12","y2":"8"}}),_c('line',{attrs:{"x1":"3.95","y1":"6.06","x2":"8.54","y2":"14"}}),_c('line',{attrs:{"x1":"10.88","y1":"21.94","x2":"15.46","y2":"14"}})])}
	};

	var FeatherCircle = {
	  name: "feather-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}})])}
	};

	var FeatherClipboard = {
	  name: "feather-clipboard",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-clipboard",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}}),_c('rect',{attrs:{"x":"8","y":"2","width":"8","height":"4","rx":"1","ry":"1"}})])}
	};

	var FeatherClock = {
	  name: "feather-clock",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-clock",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('polyline',{attrs:{"points":"12 6 12 12 16 14"}})])}
	};

	var FeatherCloudDrizzle = {
	  name: "feather-cloud-drizzle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cloud-drizzle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"8","y1":"19","x2":"8","y2":"21"}}),_c('line',{attrs:{"x1":"8","y1":"13","x2":"8","y2":"15"}}),_c('line',{attrs:{"x1":"16","y1":"19","x2":"16","y2":"21"}}),_c('line',{attrs:{"x1":"16","y1":"13","x2":"16","y2":"15"}}),_c('line',{attrs:{"x1":"12","y1":"21","x2":"12","y2":"23"}}),_c('line',{attrs:{"x1":"12","y1":"15","x2":"12","y2":"17"}}),_c('path',{attrs:{"d":"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"}})])}
	};

	var FeatherCloudLightning = {
	  name: "feather-cloud-lightning",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cloud-lightning",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"}}),_c('polyline',{attrs:{"points":"13 11 9 17 15 17 11 23"}})])}
	};

	var FeatherCloudOff = {
	  name: "feather-cloud-off",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cloud-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"}}),_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}})])}
	};

	var FeatherCloudRain = {
	  name: "feather-cloud-rain",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cloud-rain",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"16","y1":"13","x2":"16","y2":"21"}}),_c('line',{attrs:{"x1":"8","y1":"13","x2":"8","y2":"21"}}),_c('line',{attrs:{"x1":"12","y1":"15","x2":"12","y2":"23"}}),_c('path',{attrs:{"d":"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"}})])}
	};

	var FeatherCloudSnow = {
	  name: "feather-cloud-snow",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cloud-snow",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"}}),_c('line',{attrs:{"x1":"8","y1":"16","x2":"8","y2":"16"}}),_c('line',{attrs:{"x1":"8","y1":"20","x2":"8","y2":"20"}}),_c('line',{attrs:{"x1":"12","y1":"18","x2":"12","y2":"18"}}),_c('line',{attrs:{"x1":"12","y1":"22","x2":"12","y2":"22"}}),_c('line',{attrs:{"x1":"16","y1":"16","x2":"16","y2":"16"}}),_c('line',{attrs:{"x1":"16","y1":"20","x2":"16","y2":"20"}})])}
	};

	var FeatherCloud = {
	  name: "feather-cloud",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cloud",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"}})])}
	};

	var FeatherCode = {
	  name: "feather-code",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-code",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"16 18 22 12 16 6"}}),_c('polyline',{attrs:{"points":"8 6 2 12 8 18"}})])}
	};

	var FeatherCodepen = {
	  name: "feather-codepen",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-codepen",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"}}),_c('line',{attrs:{"x1":"12","y1":"22","x2":"12","y2":"15.5"}}),_c('polyline',{attrs:{"points":"22 8.5 12 15.5 2 8.5"}}),_c('polyline',{attrs:{"points":"2 15.5 12 8.5 22 15.5"}}),_c('line',{attrs:{"x1":"12","y1":"2","x2":"12","y2":"8.5"}})])}
	};

	var FeatherCommand = {
	  name: "feather-command",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-command",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"}})])}
	};

	var FeatherCompass = {
	  name: "feather-compass",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-compass",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('polygon',{attrs:{"points":"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"}})])}
	};

	var FeatherCopy = {
	  name: "feather-copy",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-copy",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"9","y":"9","width":"13","height":"13","rx":"2","ry":"2"}}),_c('path',{attrs:{"d":"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"}})])}
	};

	var FeatherCornerDownLeft = {
	  name: "feather-corner-down-left",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-down-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"9 10 4 15 9 20"}}),_c('path',{attrs:{"d":"M20 4v7a4 4 0 0 1-4 4H4"}})])}
	};

	var FeatherCornerDownRight = {
	  name: "feather-corner-down-right",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-down-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"15 10 20 15 15 20"}}),_c('path',{attrs:{"d":"M4 4v7a4 4 0 0 0 4 4h12"}})])}
	};

	var FeatherCornerLeftDown = {
	  name: "feather-corner-left-down",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-left-down",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"14 15 9 20 4 15"}}),_c('path',{attrs:{"d":"M20 4h-7a4 4 0 0 0-4 4v12"}})])}
	};

	var FeatherCornerLeftUp = {
	  name: "feather-corner-left-up",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-left-up",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"14 9 9 4 4 9"}}),_c('path',{attrs:{"d":"M20 20h-7a4 4 0 0 1-4-4V4"}})])}
	};

	var FeatherCornerRightDown = {
	  name: "feather-corner-right-down",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-right-down",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"10 15 15 20 20 15"}}),_c('path',{attrs:{"d":"M4 4h7a4 4 0 0 1 4 4v12"}})])}
	};

	var FeatherCornerRightUp = {
	  name: "feather-corner-right-up",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-right-up",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"10 9 15 4 20 9"}}),_c('path',{attrs:{"d":"M4 20h7a4 4 0 0 0 4-4V4"}})])}
	};

	var FeatherCornerUpLeft = {
	  name: "feather-corner-up-left",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-up-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"9 14 4 9 9 4"}}),_c('path',{attrs:{"d":"M20 20v-7a4 4 0 0 0-4-4H4"}})])}
	};

	var FeatherCornerUpRight = {
	  name: "feather-corner-up-right",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-corner-up-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"15 14 20 9 15 4"}}),_c('path',{attrs:{"d":"M4 20v-7a4 4 0 0 1 4-4h12"}})])}
	};

	var FeatherCpu = {
	  name: "feather-cpu",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-cpu",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"4","y":"4","width":"16","height":"16","rx":"2","ry":"2"}}),_c('rect',{attrs:{"x":"9","y":"9","width":"6","height":"6"}}),_c('line',{attrs:{"x1":"9","y1":"1","x2":"9","y2":"4"}}),_c('line',{attrs:{"x1":"15","y1":"1","x2":"15","y2":"4"}}),_c('line',{attrs:{"x1":"9","y1":"20","x2":"9","y2":"23"}}),_c('line',{attrs:{"x1":"15","y1":"20","x2":"15","y2":"23"}}),_c('line',{attrs:{"x1":"20","y1":"9","x2":"23","y2":"9"}}),_c('line',{attrs:{"x1":"20","y1":"14","x2":"23","y2":"14"}}),_c('line',{attrs:{"x1":"1","y1":"9","x2":"4","y2":"9"}}),_c('line',{attrs:{"x1":"1","y1":"14","x2":"4","y2":"14"}})])}
	};

	var FeatherCreditCard = {
	  name: "feather-credit-card",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-credit-card",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"1","y":"4","width":"22","height":"16","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"1","y1":"10","x2":"23","y2":"10"}})])}
	};

	var FeatherCrop = {
	  name: "feather-crop",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-crop",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M6.13 1L6 16a2 2 0 0 0 2 2h15"}}),_c('path',{attrs:{"d":"M1 6.13L16 6a2 2 0 0 1 2 2v15"}})])}
	};

	var FeatherCrosshair = {
	  name: "feather-crosshair",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-crosshair",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"22","y1":"12","x2":"18","y2":"12"}}),_c('line',{attrs:{"x1":"6","y1":"12","x2":"2","y2":"12"}}),_c('line',{attrs:{"x1":"12","y1":"6","x2":"12","y2":"2"}}),_c('line',{attrs:{"x1":"12","y1":"22","x2":"12","y2":"18"}})])}
	};

	var FeatherDatabase = {
	  name: "feather-database",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-database",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('ellipse',{attrs:{"cx":"12","cy":"5","rx":"9","ry":"3"}}),_c('path',{attrs:{"d":"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}}),_c('path',{attrs:{"d":"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}})])}
	};

	var FeatherDelete = {
	  name: "feather-delete",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-delete",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"}}),_c('line',{attrs:{"x1":"18","y1":"9","x2":"12","y2":"15"}}),_c('line',{attrs:{"x1":"12","y1":"9","x2":"18","y2":"15"}})])}
	};

	var FeatherDisc = {
	  name: "feather-disc",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-disc",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('circle',{attrs:{"cx":"12","cy":"12","r":"3"}})])}
	};

	var FeatherDollarSign = {
	  name: "feather-dollar-sign",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-dollar-sign",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"12","y1":"1","x2":"12","y2":"23"}}),_c('path',{attrs:{"d":"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"}})])}
	};

	var FeatherDownloadCloud = {
	  name: "feather-download-cloud",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-download-cloud",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"8 17 12 21 16 17"}}),_c('line',{attrs:{"x1":"12","y1":"12","x2":"12","y2":"21"}}),_c('path',{attrs:{"d":"M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"}})])}
	};

	var FeatherDownload = {
	  name: "feather-download",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-download",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}}),_c('polyline',{attrs:{"points":"7 10 12 15 17 10"}}),_c('line',{attrs:{"x1":"12","y1":"15","x2":"12","y2":"3"}})])}
	};

	var FeatherDroplet = {
	  name: "feather-droplet",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-droplet",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"}})])}
	};

	var FeatherEdit2 = {
	  name: "feather-edit-2",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-edit-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"16 3 21 8 8 21 3 21 3 16 16 3"}})])}
	};

	var FeatherEdit3 = {
	  name: "feather-edit-3",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-edit-3",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"14 2 18 6 7 17 3 17 3 13 14 2"}}),_c('line',{attrs:{"x1":"3","y1":"22","x2":"21","y2":"22"}})])}
	};

	var FeatherEdit = {
	  name: "feather-edit",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-edit",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"}}),_c('polygon',{attrs:{"points":"18 2 22 6 12 16 8 16 8 12 18 2"}})])}
	};

	var FeatherExternalLink = {
	  name: "feather-external-link",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-external-link",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}}),_c('polyline',{attrs:{"points":"15 3 21 3 21 9"}}),_c('line',{attrs:{"x1":"10","y1":"14","x2":"21","y2":"3"}})])}
	};

	var FeatherEyeOff = {
	  name: "feather-eye-off",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-eye-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}}),_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}})])}
	};

	var FeatherEye = {
	  name: "feather-eye",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-eye",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}}),_c('circle',{attrs:{"cx":"12","cy":"12","r":"3"}})])}
	};

	var FeatherFacebook = {
	  name: "feather-facebook",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-facebook",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"}})])}
	};

	var FeatherFastForward = {
	  name: "feather-fast-forward",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-fast-forward",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"13 19 22 12 13 5 13 19"}}),_c('polygon',{attrs:{"points":"2 19 11 12 2 5 2 19"}})])}
	};

	var FeatherFeather = {
	  name: "feather-feather",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-feather",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"}}),_c('line',{attrs:{"x1":"16","y1":"8","x2":"2","y2":"22"}}),_c('line',{attrs:{"x1":"17","y1":"15","x2":"9","y2":"15"}})])}
	};

	var FeatherFileMinus = {
	  name: "feather-file-minus",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-file-minus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}}),_c('polyline',{attrs:{"points":"14 2 14 8 20 8"}}),_c('line',{attrs:{"x1":"9","y1":"15","x2":"15","y2":"15"}})])}
	};

	var FeatherFilePlus = {
	  name: "feather-file-plus",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-file-plus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}}),_c('polyline',{attrs:{"points":"14 2 14 8 20 8"}}),_c('line',{attrs:{"x1":"12","y1":"18","x2":"12","y2":"12"}}),_c('line',{attrs:{"x1":"9","y1":"15","x2":"15","y2":"15"}})])}
	};

	var FeatherFileText = {
	  name: "feather-file-text",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-file-text",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}}),_c('polyline',{attrs:{"points":"14 2 14 8 20 8"}}),_c('line',{attrs:{"x1":"16","y1":"13","x2":"8","y2":"13"}}),_c('line',{attrs:{"x1":"16","y1":"17","x2":"8","y2":"17"}}),_c('polyline',{attrs:{"points":"10 9 9 9 8 9"}})])}
	};

	var FeatherFile = {
	  name: "feather-file",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-file",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"}}),_c('polyline',{attrs:{"points":"13 2 13 9 20 9"}})])}
	};

	var FeatherFilm = {
	  name: "feather-film",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-film",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"2","y":"2","width":"20","height":"20","rx":"2.18","ry":"2.18"}}),_c('line',{attrs:{"x1":"7","y1":"2","x2":"7","y2":"22"}}),_c('line',{attrs:{"x1":"17","y1":"2","x2":"17","y2":"22"}}),_c('line',{attrs:{"x1":"2","y1":"12","x2":"22","y2":"12"}}),_c('line',{attrs:{"x1":"2","y1":"7","x2":"7","y2":"7"}}),_c('line',{attrs:{"x1":"2","y1":"17","x2":"7","y2":"17"}}),_c('line',{attrs:{"x1":"17","y1":"17","x2":"22","y2":"17"}}),_c('line',{attrs:{"x1":"17","y1":"7","x2":"22","y2":"7"}})])}
	};

	var FeatherFilter = {
	  name: "feather-filter",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-filter",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"}})])}
	};

	var FeatherFlag = {
	  name: "feather-flag",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-flag",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}}),_c('line',{attrs:{"x1":"4","y1":"22","x2":"4","y2":"15"}})])}
	};

	var FeatherFolderMinus = {
	  name: "feather-folder-minus",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-folder-minus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"}}),_c('line',{attrs:{"x1":"9","y1":"14","x2":"15","y2":"14"}})])}
	};

	var FeatherFolderPlus = {
	  name: "feather-folder-plus",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-folder-plus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"}}),_c('line',{attrs:{"x1":"12","y1":"11","x2":"12","y2":"17"}}),_c('line',{attrs:{"x1":"9","y1":"14","x2":"15","y2":"14"}})])}
	};

	var FeatherFolder = {
	  name: "feather-folder",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-folder",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"}})])}
	};

	var FeatherGift = {
	  name: "feather-gift",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-gift",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"20 12 20 22 4 22 4 12"}}),_c('rect',{attrs:{"x":"2","y":"7","width":"20","height":"5"}}),_c('line',{attrs:{"x1":"12","y1":"22","x2":"12","y2":"7"}}),_c('path',{attrs:{"d":"M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"}}),_c('path',{attrs:{"d":"M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"}})])}
	};

	var FeatherGitBranch = {
	  name: "feather-git-branch",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-git-branch",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"6","y1":"3","x2":"6","y2":"15"}}),_c('circle',{attrs:{"cx":"18","cy":"6","r":"3"}}),_c('circle',{attrs:{"cx":"6","cy":"18","r":"3"}}),_c('path',{attrs:{"d":"M18 9a9 9 0 0 1-9 9"}})])}
	};

	var FeatherGitCommit = {
	  name: "feather-git-commit",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-git-commit",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"4"}}),_c('line',{attrs:{"x1":"1.05","y1":"12","x2":"7","y2":"12"}}),_c('line',{attrs:{"x1":"17.01","y1":"12","x2":"22.96","y2":"12"}})])}
	};

	var FeatherGitMerge = {
	  name: "feather-git-merge",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-git-merge",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"18","cy":"18","r":"3"}}),_c('circle',{attrs:{"cx":"6","cy":"6","r":"3"}}),_c('path',{attrs:{"d":"M6 21V9a9 9 0 0 0 9 9"}})])}
	};

	var FeatherGitPullRequest = {
	  name: "feather-git-pull-request",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-git-pull-request",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"18","cy":"18","r":"3"}}),_c('circle',{attrs:{"cx":"6","cy":"6","r":"3"}}),_c('path',{attrs:{"d":"M13 6h3a2 2 0 0 1 2 2v7"}}),_c('line',{attrs:{"x1":"6","y1":"9","x2":"6","y2":"21"}})])}
	};

	var FeatherGithub = {
	  name: "feather-github",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-github",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}})])}
	};

	var FeatherGitlab = {
	  name: "feather-gitlab",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-gitlab",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"}})])}
	};

	var FeatherGlobe = {
	  name: "feather-globe",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-globe",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"2","y1":"12","x2":"22","y2":"12"}}),_c('path',{attrs:{"d":"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"}})])}
	};

	var FeatherGrid = {
	  name: "feather-grid",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-grid",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"7","height":"7"}}),_c('rect',{attrs:{"x":"14","y":"3","width":"7","height":"7"}}),_c('rect',{attrs:{"x":"14","y":"14","width":"7","height":"7"}}),_c('rect',{attrs:{"x":"3","y":"14","width":"7","height":"7"}})])}
	};

	var FeatherHardDrive = {
	  name: "feather-hard-drive",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-hard-drive",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"22","y1":"12","x2":"2","y2":"12"}}),_c('path',{attrs:{"d":"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}}),_c('line',{attrs:{"x1":"6","y1":"16","x2":"6","y2":"16"}}),_c('line',{attrs:{"x1":"10","y1":"16","x2":"10","y2":"16"}})])}
	};

	var FeatherHash = {
	  name: "feather-hash",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-hash",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"4","y1":"9","x2":"20","y2":"9"}}),_c('line',{attrs:{"x1":"4","y1":"15","x2":"20","y2":"15"}}),_c('line',{attrs:{"x1":"10","y1":"3","x2":"8","y2":"21"}}),_c('line',{attrs:{"x1":"16","y1":"3","x2":"14","y2":"21"}})])}
	};

	var FeatherHeadphones = {
	  name: "feather-headphones",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-headphones",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M3 18v-6a9 9 0 0 1 18 0v6"}}),_c('path',{attrs:{"d":"M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"}})])}
	};

	var FeatherHeart = {
	  name: "feather-heart",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-heart",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"}})])}
	};

	var FeatherHelpCircle = {
	  name: "feather-help-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-help-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('path',{attrs:{"d":"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}}),_c('line',{attrs:{"x1":"12","y1":"17","x2":"12","y2":"17"}})])}
	};

	var FeatherHome = {
	  name: "feather-home",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-home",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}}),_c('polyline',{attrs:{"points":"9 22 9 12 15 12 15 22"}})])}
	};

	var FeatherImage = {
	  name: "feather-image",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-image",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}}),_c('circle',{attrs:{"cx":"8.5","cy":"8.5","r":"1.5"}}),_c('polyline',{attrs:{"points":"21 15 16 10 5 21"}})])}
	};

	var FeatherInbox = {
	  name: "feather-inbox",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-inbox",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"22 12 16 12 14 15 10 15 8 12 2 12"}}),_c('path',{attrs:{"d":"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}})])}
	};

	var FeatherInfo = {
	  name: "feather-info",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-info",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"12","y1":"16","x2":"12","y2":"12"}}),_c('line',{attrs:{"x1":"12","y1":"8","x2":"12","y2":"8"}})])}
	};

	var FeatherInstagram = {
	  name: "feather-instagram",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-instagram",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"2","y":"2","width":"20","height":"20","rx":"5","ry":"5"}}),_c('path',{attrs:{"d":"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}}),_c('line',{attrs:{"x1":"17.5","y1":"6.5","x2":"17.5","y2":"6.5"}})])}
	};

	var FeatherItalic = {
	  name: "feather-italic",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-italic",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"19","y1":"4","x2":"10","y2":"4"}}),_c('line',{attrs:{"x1":"14","y1":"20","x2":"5","y2":"20"}}),_c('line',{attrs:{"x1":"15","y1":"4","x2":"9","y2":"20"}})])}
	};

	var FeatherLayers = {
	  name: "feather-layers",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-layers",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"12 2 2 7 12 12 22 7 12 2"}}),_c('polyline',{attrs:{"points":"2 17 12 22 22 17"}}),_c('polyline',{attrs:{"points":"2 12 12 17 22 12"}})])}
	};

	var FeatherLayout = {
	  name: "feather-layout",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-layout",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"3","y1":"9","x2":"21","y2":"9"}}),_c('line',{attrs:{"x1":"9","y1":"21","x2":"9","y2":"9"}})])}
	};

	var FeatherLifeBuoy = {
	  name: "feather-life-buoy",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-life-buoy",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('circle',{attrs:{"cx":"12","cy":"12","r":"4"}}),_c('line',{attrs:{"x1":"4.93","y1":"4.93","x2":"9.17","y2":"9.17"}}),_c('line',{attrs:{"x1":"14.83","y1":"14.83","x2":"19.07","y2":"19.07"}}),_c('line',{attrs:{"x1":"14.83","y1":"9.17","x2":"19.07","y2":"4.93"}}),_c('line',{attrs:{"x1":"14.83","y1":"9.17","x2":"18.36","y2":"5.64"}}),_c('line',{attrs:{"x1":"4.93","y1":"19.07","x2":"9.17","y2":"14.83"}})])}
	};

	var FeatherLink2 = {
	  name: "feather-link-2",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-link-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"}}),_c('line',{attrs:{"x1":"8","y1":"12","x2":"16","y2":"12"}})])}
	};

	var FeatherLink = {
	  name: "feather-link",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-link",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}}),_c('path',{attrs:{"d":"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}})])}
	};

	var FeatherLinkedin = {
	  name: "feather-linkedin",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-linkedin",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}}),_c('rect',{attrs:{"x":"2","y":"9","width":"4","height":"12"}}),_c('circle',{attrs:{"cx":"4","cy":"4","r":"2"}})])}
	};

	var FeatherList = {
	  name: "feather-list",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-list",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"8","y1":"6","x2":"21","y2":"6"}}),_c('line',{attrs:{"x1":"8","y1":"12","x2":"21","y2":"12"}}),_c('line',{attrs:{"x1":"8","y1":"18","x2":"21","y2":"18"}}),_c('line',{attrs:{"x1":"3","y1":"6","x2":"3","y2":"6"}}),_c('line',{attrs:{"x1":"3","y1":"12","x2":"3","y2":"12"}}),_c('line',{attrs:{"x1":"3","y1":"18","x2":"3","y2":"18"}})])}
	};

	var FeatherLoader = {
	  name: "feather-loader",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-loader",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"12","y1":"2","x2":"12","y2":"6"}}),_c('line',{attrs:{"x1":"12","y1":"18","x2":"12","y2":"22"}}),_c('line',{attrs:{"x1":"4.93","y1":"4.93","x2":"7.76","y2":"7.76"}}),_c('line',{attrs:{"x1":"16.24","y1":"16.24","x2":"19.07","y2":"19.07"}}),_c('line',{attrs:{"x1":"2","y1":"12","x2":"6","y2":"12"}}),_c('line',{attrs:{"x1":"18","y1":"12","x2":"22","y2":"12"}}),_c('line',{attrs:{"x1":"4.93","y1":"19.07","x2":"7.76","y2":"16.24"}}),_c('line',{attrs:{"x1":"16.24","y1":"7.76","x2":"19.07","y2":"4.93"}})])}
	};

	var FeatherLock = {
	  name: "feather-lock",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-lock",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"11","width":"18","height":"11","rx":"2","ry":"2"}}),_c('path',{attrs:{"d":"M7 11V7a5 5 0 0 1 10 0v4"}})])}
	};

	var FeatherLogIn = {
	  name: "feather-log-in",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-log-in",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"}}),_c('polyline',{attrs:{"points":"10 17 15 12 10 7"}}),_c('line',{attrs:{"x1":"15","y1":"12","x2":"3","y2":"12"}})])}
	};

	var FeatherLogOut = {
	  name: "feather-log-out",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-log-out",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}}),_c('polyline',{attrs:{"points":"16 17 21 12 16 7"}}),_c('line',{attrs:{"x1":"21","y1":"12","x2":"9","y2":"12"}})])}
	};

	var FeatherMail = {
	  name: "feather-mail",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-mail",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}}),_c('polyline',{attrs:{"points":"22,6 12,13 2,6"}})])}
	};

	var FeatherMapPin = {
	  name: "feather-map-pin",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-map-pin",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}}),_c('circle',{attrs:{"cx":"12","cy":"10","r":"3"}})])}
	};

	var FeatherMap = {
	  name: "feather-map",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-map",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"}}),_c('line',{attrs:{"x1":"8","y1":"2","x2":"8","y2":"18"}}),_c('line',{attrs:{"x1":"16","y1":"6","x2":"16","y2":"22"}})])}
	};

	var FeatherMaximize2 = {
	  name: "feather-maximize-2",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-maximize-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"15 3 21 3 21 9"}}),_c('polyline',{attrs:{"points":"9 21 3 21 3 15"}}),_c('line',{attrs:{"x1":"21","y1":"3","x2":"14","y2":"10"}}),_c('line',{attrs:{"x1":"3","y1":"21","x2":"10","y2":"14"}})])}
	};

	var FeatherMaximize = {
	  name: "feather-maximize",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-maximize",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"}})])}
	};

	var FeatherMenu = {
	  name: "feather-menu",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-menu",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"3","y1":"12","x2":"21","y2":"12"}}),_c('line',{attrs:{"x1":"3","y1":"6","x2":"21","y2":"6"}}),_c('line',{attrs:{"x1":"3","y1":"18","x2":"21","y2":"18"}})])}
	};

	var FeatherMessageCircle = {
	  name: "feather-message-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-message-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"}})])}
	};

	var FeatherMessageSquare = {
	  name: "feather-message-square",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-message-square",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"}})])}
	};

	var FeatherMicOff = {
	  name: "feather-mic-off",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-mic-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}}),_c('path',{attrs:{"d":"M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"}}),_c('path',{attrs:{"d":"M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"}}),_c('line',{attrs:{"x1":"12","y1":"19","x2":"12","y2":"23"}}),_c('line',{attrs:{"x1":"8","y1":"23","x2":"16","y2":"23"}})])}
	};

	var FeatherMic = {
	  name: "feather-mic",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-mic",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"}}),_c('path',{attrs:{"d":"M19 10v2a7 7 0 0 1-14 0v-2"}}),_c('line',{attrs:{"x1":"12","y1":"19","x2":"12","y2":"23"}}),_c('line',{attrs:{"x1":"8","y1":"23","x2":"16","y2":"23"}})])}
	};

	var FeatherMinimize2 = {
	  name: "feather-minimize-2",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-minimize-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"4 14 10 14 10 20"}}),_c('polyline',{attrs:{"points":"20 10 14 10 14 4"}}),_c('line',{attrs:{"x1":"14","y1":"10","x2":"21","y2":"3"}}),_c('line',{attrs:{"x1":"3","y1":"21","x2":"10","y2":"14"}})])}
	};

	var FeatherMinimize = {
	  name: "feather-minimize",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-minimize",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"}})])}
	};

	var FeatherMinusCircle = {
	  name: "feather-minus-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-minus-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"8","y1":"12","x2":"16","y2":"12"}})])}
	};

	var FeatherMinusSquare = {
	  name: "feather-minus-square",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-minus-square",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"8","y1":"12","x2":"16","y2":"12"}})])}
	};

	var FeatherMinus = {
	  name: "feather-minus",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-minus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"5","y1":"12","x2":"19","y2":"12"}})])}
	};

	var FeatherMonitor = {
	  name: "feather-monitor",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-monitor",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"2","y":"3","width":"20","height":"14","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"8","y1":"21","x2":"16","y2":"21"}}),_c('line',{attrs:{"x1":"12","y1":"17","x2":"12","y2":"21"}})])}
	};

	var FeatherMoon = {
	  name: "feather-moon",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-moon",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"}})])}
	};

	var FeatherMoreHorizontal = {
	  name: "feather-more-horizontal",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-more-horizontal",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"1"}}),_c('circle',{attrs:{"cx":"19","cy":"12","r":"1"}}),_c('circle',{attrs:{"cx":"5","cy":"12","r":"1"}})])}
	};

	var FeatherMoreVertical = {
	  name: "feather-more-vertical",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-more-vertical",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"1"}}),_c('circle',{attrs:{"cx":"12","cy":"5","r":"1"}}),_c('circle',{attrs:{"cx":"12","cy":"19","r":"1"}})])}
	};

	var FeatherMove = {
	  name: "feather-move",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-move",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"5 9 2 12 5 15"}}),_c('polyline',{attrs:{"points":"9 5 12 2 15 5"}}),_c('polyline',{attrs:{"points":"15 19 12 22 9 19"}}),_c('polyline',{attrs:{"points":"19 9 22 12 19 15"}}),_c('line',{attrs:{"x1":"2","y1":"12","x2":"22","y2":"12"}}),_c('line',{attrs:{"x1":"12","y1":"2","x2":"12","y2":"22"}})])}
	};

	var FeatherMusic = {
	  name: "feather-music",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-music",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M9 17H5a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm12-2h-4a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"}}),_c('polyline',{attrs:{"points":"9 17 9 5 21 3 21 15"}})])}
	};

	var FeatherNavigation2 = {
	  name: "feather-navigation-2",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-navigation-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"12 2 19 21 12 17 5 21 12 2"}})])}
	};

	var FeatherNavigation = {
	  name: "feather-navigation",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-navigation",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"3 11 22 2 13 21 11 13 3 11"}})])}
	};

	var FeatherOctagon = {
	  name: "feather-octagon",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-octagon",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}})])}
	};

	var FeatherPackage = {
	  name: "feather-package",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-package",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"}}),_c('polyline',{attrs:{"points":"2.32 6.16 12 11 21.68 6.16"}}),_c('line',{attrs:{"x1":"12","y1":"22.76","x2":"12","y2":"11"}}),_c('line',{attrs:{"x1":"7","y1":"3.5","x2":"17","y2":"8.5"}})])}
	};

	var FeatherPaperclip = {
	  name: "feather-paperclip",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-paperclip",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"}})])}
	};

	var FeatherPauseCircle = {
	  name: "feather-pause-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-pause-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"10","y1":"15","x2":"10","y2":"9"}}),_c('line',{attrs:{"x1":"14","y1":"15","x2":"14","y2":"9"}})])}
	};

	var FeatherPause = {
	  name: "feather-pause",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-pause",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"6","y":"4","width":"4","height":"16"}}),_c('rect',{attrs:{"x":"14","y":"4","width":"4","height":"16"}})])}
	};

	var FeatherPercent = {
	  name: "feather-percent",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-percent",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"19","y1":"5","x2":"5","y2":"19"}}),_c('circle',{attrs:{"cx":"6.5","cy":"6.5","r":"2.5"}}),_c('circle',{attrs:{"cx":"17.5","cy":"17.5","r":"2.5"}})])}
	};

	var FeatherPhoneCall = {
	  name: "feather-phone-call",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-phone-call",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}})])}
	};

	var FeatherPhoneForwarded = {
	  name: "feather-phone-forwarded",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-phone-forwarded",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"19 1 23 5 19 9"}}),_c('line',{attrs:{"x1":"15","y1":"5","x2":"23","y2":"5"}}),_c('path',{attrs:{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}})])}
	};

	var FeatherPhoneIncoming = {
	  name: "feather-phone-incoming",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-phone-incoming",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"16 2 16 8 22 8"}}),_c('line',{attrs:{"x1":"23","y1":"1","x2":"16","y2":"8"}}),_c('path',{attrs:{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}})])}
	};

	var FeatherPhoneMissed = {
	  name: "feather-phone-missed",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-phone-missed",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"23","y1":"1","x2":"17","y2":"7"}}),_c('line',{attrs:{"x1":"17","y1":"1","x2":"23","y2":"7"}}),_c('path',{attrs:{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}})])}
	};

	var FeatherPhoneOff = {
	  name: "feather-phone-off",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-phone-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"}}),_c('line',{attrs:{"x1":"23","y1":"1","x2":"1","y2":"23"}})])}
	};

	var FeatherPhoneOutgoing = {
	  name: "feather-phone-outgoing",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-phone-outgoing",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"23 7 23 1 17 1"}}),_c('line',{attrs:{"x1":"16","y1":"8","x2":"23","y2":"1"}}),_c('path',{attrs:{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}})])}
	};

	var FeatherPhone = {
	  name: "feather-phone",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-phone",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}})])}
	};

	var FeatherPieChart = {
	  name: "feather-pie-chart",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-pie-chart",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21.21 15.89A10 10 0 1 1 8 2.83"}}),_c('path',{attrs:{"d":"M22 12A10 10 0 0 0 12 2v10z"}})])}
	};

	var FeatherPlayCircle = {
	  name: "feather-play-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-play-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('polygon',{attrs:{"points":"10 8 16 12 10 16 10 8"}})])}
	};

	var FeatherPlay = {
	  name: "feather-play",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-play",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"5 3 19 12 5 21 5 3"}})])}
	};

	var FeatherPlusCircle = {
	  name: "feather-plus-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-plus-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"12","y1":"8","x2":"12","y2":"16"}}),_c('line',{attrs:{"x1":"8","y1":"12","x2":"16","y2":"12"}})])}
	};

	var FeatherPlusSquare = {
	  name: "feather-plus-square",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-plus-square",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"12","y1":"8","x2":"12","y2":"16"}}),_c('line',{attrs:{"x1":"8","y1":"12","x2":"16","y2":"12"}})])}
	};

	var FeatherPlus = {
	  name: "feather-plus",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-plus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"12","y1":"5","x2":"12","y2":"19"}}),_c('line',{attrs:{"x1":"5","y1":"12","x2":"19","y2":"12"}})])}
	};

	var FeatherPocket = {
	  name: "feather-pocket",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-pocket",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"}}),_c('polyline',{attrs:{"points":"8 10 12 14 16 10"}})])}
	};

	var FeatherPower = {
	  name: "feather-power",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-power",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M18.36 6.64a9 9 0 1 1-12.73 0"}}),_c('line',{attrs:{"x1":"12","y1":"2","x2":"12","y2":"12"}})])}
	};

	var FeatherPrinter = {
	  name: "feather-printer",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-printer",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"6 9 6 2 18 2 18 9"}}),_c('path',{attrs:{"d":"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}}),_c('rect',{attrs:{"x":"6","y":"14","width":"12","height":"8"}})])}
	};

	var FeatherRadio = {
	  name: "feather-radio",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-radio",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"2"}}),_c('path',{attrs:{"d":"M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"}})])}
	};

	var FeatherRefreshCcw = {
	  name: "feather-refresh-ccw",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-refresh-ccw",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"1 4 1 10 7 10"}}),_c('polyline',{attrs:{"points":"23 20 23 14 17 14"}}),_c('path',{attrs:{"d":"M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"}})])}
	};

	var FeatherRefreshCw = {
	  name: "feather-refresh-cw",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-refresh-cw",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"23 4 23 10 17 10"}}),_c('polyline',{attrs:{"points":"1 20 1 14 7 14"}}),_c('path',{attrs:{"d":"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"}})])}
	};

	var FeatherRepeat = {
	  name: "feather-repeat",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-repeat",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"17 1 21 5 17 9"}}),_c('path',{attrs:{"d":"M3 11V9a4 4 0 0 1 4-4h14"}}),_c('polyline',{attrs:{"points":"7 23 3 19 7 15"}}),_c('path',{attrs:{"d":"M21 13v2a4 4 0 0 1-4 4H3"}})])}
	};

	var FeatherRewind = {
	  name: "feather-rewind",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-rewind",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"11 19 2 12 11 5 11 19"}}),_c('polygon',{attrs:{"points":"22 19 13 12 22 5 22 19"}})])}
	};

	var FeatherRotateCcw = {
	  name: "feather-rotate-ccw",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-rotate-ccw",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"1 4 1 10 7 10"}}),_c('path',{attrs:{"d":"M3.51 15a9 9 0 1 0 2.13-9.36L1 10"}})])}
	};

	var FeatherRotateCw = {
	  name: "feather-rotate-cw",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-rotate-cw",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"23 4 23 10 17 10"}}),_c('path',{attrs:{"d":"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"}})])}
	};

	var FeatherRss = {
	  name: "feather-rss",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-rss",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M4 11a9 9 0 0 1 9 9"}}),_c('path',{attrs:{"d":"M4 4a16 16 0 0 1 16 16"}}),_c('circle',{attrs:{"cx":"5","cy":"19","r":"1"}})])}
	};

	var FeatherSave = {
	  name: "feather-save",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-save",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"}}),_c('polyline',{attrs:{"points":"17 21 17 13 7 13 7 21"}}),_c('polyline',{attrs:{"points":"7 3 7 8 15 8"}})])}
	};

	var FeatherScissors = {
	  name: "feather-scissors",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-scissors",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"6","cy":"6","r":"3"}}),_c('circle',{attrs:{"cx":"6","cy":"18","r":"3"}}),_c('line',{attrs:{"x1":"20","y1":"4","x2":"8.12","y2":"15.88"}}),_c('line',{attrs:{"x1":"14.47","y1":"14.48","x2":"20","y2":"20"}}),_c('line',{attrs:{"x1":"8.12","y1":"8.12","x2":"12","y2":"12"}})])}
	};

	var FeatherSearch = {
	  name: "feather-search",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-search",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"11","cy":"11","r":"8"}}),_c('line',{attrs:{"x1":"21","y1":"21","x2":"16.65","y2":"16.65"}})])}
	};

	var FeatherSend = {
	  name: "feather-send",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-send",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"22","y1":"2","x2":"11","y2":"13"}}),_c('polygon',{attrs:{"points":"22 2 15 22 11 13 2 9 22 2"}})])}
	};

	var FeatherServer = {
	  name: "feather-server",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-server",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"2","y":"2","width":"20","height":"8","rx":"2","ry":"2"}}),_c('rect',{attrs:{"x":"2","y":"14","width":"20","height":"8","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"6","y1":"6","x2":"6","y2":"6"}}),_c('line',{attrs:{"x1":"6","y1":"18","x2":"6","y2":"18"}})])}
	};

	var FeatherSettings = {
	  name: "feather-settings",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-settings",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"3"}}),_c('path',{attrs:{"d":"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"}})])}
	};

	var FeatherShare2 = {
	  name: "feather-share-2",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-share-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"18","cy":"5","r":"3"}}),_c('circle',{attrs:{"cx":"6","cy":"12","r":"3"}}),_c('circle',{attrs:{"cx":"18","cy":"19","r":"3"}}),_c('line',{attrs:{"x1":"8.59","y1":"13.51","x2":"15.42","y2":"17.49"}}),_c('line',{attrs:{"x1":"15.41","y1":"6.51","x2":"8.59","y2":"10.49"}})])}
	};

	var FeatherShare = {
	  name: "feather-share",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-share",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"}}),_c('polyline',{attrs:{"points":"16 6 12 2 8 6"}}),_c('line',{attrs:{"x1":"12","y1":"2","x2":"12","y2":"15"}})])}
	};

	var FeatherShieldOff = {
	  name: "feather-shield-off",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-shield-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"}}),_c('path',{attrs:{"d":"M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"}}),_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}})])}
	};

	var FeatherShield = {
	  name: "feather-shield",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-shield",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}})])}
	};

	var FeatherShoppingBag = {
	  name: "feather-shopping-bag",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-shopping-bag",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"}}),_c('line',{attrs:{"x1":"3","y1":"6","x2":"21","y2":"6"}}),_c('path',{attrs:{"d":"M16 10a4 4 0 0 1-8 0"}})])}
	};

	var FeatherShoppingCart = {
	  name: "feather-shopping-cart",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-shopping-cart",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"9","cy":"21","r":"1"}}),_c('circle',{attrs:{"cx":"20","cy":"21","r":"1"}}),_c('path',{attrs:{"d":"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"}})])}
	};

	var FeatherShuffle = {
	  name: "feather-shuffle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-shuffle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"16 3 21 3 21 8"}}),_c('line',{attrs:{"x1":"4","y1":"20","x2":"21","y2":"3"}}),_c('polyline',{attrs:{"points":"21 16 21 21 16 21"}}),_c('line',{attrs:{"x1":"15","y1":"15","x2":"21","y2":"21"}}),_c('line',{attrs:{"x1":"4","y1":"4","x2":"9","y2":"9"}})])}
	};

	var FeatherSidebar = {
	  name: "feather-sidebar",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-sidebar",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"9","y1":"3","x2":"9","y2":"21"}})])}
	};

	var FeatherSkipBack = {
	  name: "feather-skip-back",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-skip-back",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"19 20 9 12 19 4 19 20"}}),_c('line',{attrs:{"x1":"5","y1":"19","x2":"5","y2":"5"}})])}
	};

	var FeatherSkipForward = {
	  name: "feather-skip-forward",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-skip-forward",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"5 4 15 12 5 20 5 4"}}),_c('line',{attrs:{"x1":"19","y1":"5","x2":"19","y2":"19"}})])}
	};

	var FeatherSlack = {
	  name: "feather-slack",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-slack",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22.08 9C19.81 1.41 16.54-.35 9 1.92S-.35 7.46 1.92 15 7.46 24.35 15 22.08 24.35 16.54 22.08 9z"}}),_c('line',{attrs:{"x1":"12.57","y1":"5.99","x2":"16.15","y2":"16.39"}}),_c('line',{attrs:{"x1":"7.85","y1":"7.61","x2":"11.43","y2":"18.01"}}),_c('line',{attrs:{"x1":"16.39","y1":"7.85","x2":"5.99","y2":"11.43"}}),_c('line',{attrs:{"x1":"18.01","y1":"12.57","x2":"7.61","y2":"16.15"}})])}
	};

	var FeatherSlash = {
	  name: "feather-slash",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-slash",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"4.93","y1":"4.93","x2":"19.07","y2":"19.07"}})])}
	};

	var FeatherSliders = {
	  name: "feather-sliders",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-sliders",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"4","y1":"21","x2":"4","y2":"14"}}),_c('line',{attrs:{"x1":"4","y1":"10","x2":"4","y2":"3"}}),_c('line',{attrs:{"x1":"12","y1":"21","x2":"12","y2":"12"}}),_c('line',{attrs:{"x1":"12","y1":"8","x2":"12","y2":"3"}}),_c('line',{attrs:{"x1":"20","y1":"21","x2":"20","y2":"16"}}),_c('line',{attrs:{"x1":"20","y1":"12","x2":"20","y2":"3"}}),_c('line',{attrs:{"x1":"1","y1":"14","x2":"7","y2":"14"}}),_c('line',{attrs:{"x1":"9","y1":"8","x2":"15","y2":"8"}}),_c('line',{attrs:{"x1":"17","y1":"16","x2":"23","y2":"16"}})])}
	};

	var FeatherSmartphone = {
	  name: "feather-smartphone",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-smartphone",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"5","y":"2","width":"14","height":"20","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"12","y1":"18","x2":"12","y2":"18"}})])}
	};

	var FeatherSpeaker = {
	  name: "feather-speaker",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-speaker",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"4","y":"2","width":"16","height":"20","rx":"2","ry":"2"}}),_c('circle',{attrs:{"cx":"12","cy":"14","r":"4"}}),_c('line',{attrs:{"x1":"12","y1":"6","x2":"12","y2":"6"}})])}
	};

	var FeatherSquare = {
	  name: "feather-square",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-square",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}})])}
	};

	var FeatherStar = {
	  name: "feather-star",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-star",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"}})])}
	};

	var FeatherStopCircle = {
	  name: "feather-stop-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-stop-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('rect',{attrs:{"x":"9","y":"9","width":"6","height":"6"}})])}
	};

	var FeatherSun = {
	  name: "feather-sun",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-sun",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"5"}}),_c('line',{attrs:{"x1":"12","y1":"1","x2":"12","y2":"3"}}),_c('line',{attrs:{"x1":"12","y1":"21","x2":"12","y2":"23"}}),_c('line',{attrs:{"x1":"4.22","y1":"4.22","x2":"5.64","y2":"5.64"}}),_c('line',{attrs:{"x1":"18.36","y1":"18.36","x2":"19.78","y2":"19.78"}}),_c('line',{attrs:{"x1":"1","y1":"12","x2":"3","y2":"12"}}),_c('line',{attrs:{"x1":"21","y1":"12","x2":"23","y2":"12"}}),_c('line',{attrs:{"x1":"4.22","y1":"19.78","x2":"5.64","y2":"18.36"}}),_c('line',{attrs:{"x1":"18.36","y1":"5.64","x2":"19.78","y2":"4.22"}})])}
	};

	var FeatherSunrise = {
	  name: "feather-sunrise",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-sunrise",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M17 18a5 5 0 0 0-10 0"}}),_c('line',{attrs:{"x1":"12","y1":"2","x2":"12","y2":"9"}}),_c('line',{attrs:{"x1":"4.22","y1":"10.22","x2":"5.64","y2":"11.64"}}),_c('line',{attrs:{"x1":"1","y1":"18","x2":"3","y2":"18"}}),_c('line',{attrs:{"x1":"21","y1":"18","x2":"23","y2":"18"}}),_c('line',{attrs:{"x1":"18.36","y1":"11.64","x2":"19.78","y2":"10.22"}}),_c('line',{attrs:{"x1":"23","y1":"22","x2":"1","y2":"22"}}),_c('polyline',{attrs:{"points":"8 6 12 2 16 6"}})])}
	};

	var FeatherSunset = {
	  name: "feather-sunset",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-sunset",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M17 18a5 5 0 0 0-10 0"}}),_c('line',{attrs:{"x1":"12","y1":"9","x2":"12","y2":"2"}}),_c('line',{attrs:{"x1":"4.22","y1":"10.22","x2":"5.64","y2":"11.64"}}),_c('line',{attrs:{"x1":"1","y1":"18","x2":"3","y2":"18"}}),_c('line',{attrs:{"x1":"21","y1":"18","x2":"23","y2":"18"}}),_c('line',{attrs:{"x1":"18.36","y1":"11.64","x2":"19.78","y2":"10.22"}}),_c('line',{attrs:{"x1":"23","y1":"22","x2":"1","y2":"22"}}),_c('polyline',{attrs:{"points":"16 5 12 9 8 5"}})])}
	};

	var FeatherTablet = {
	  name: "feather-tablet",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-tablet",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"4","y":"2","width":"16","height":"20","rx":"2","ry":"2","transform":"rotate(180 12 12)"}}),_c('line',{attrs:{"x1":"12","y1":"18","x2":"12","y2":"18"}})])}
	};

	var FeatherTag = {
	  name: "feather-tag",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-tag",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"}}),_c('line',{attrs:{"x1":"7","y1":"7","x2":"7","y2":"7"}})])}
	};

	var FeatherTarget = {
	  name: "feather-target",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-target",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('circle',{attrs:{"cx":"12","cy":"12","r":"6"}}),_c('circle',{attrs:{"cx":"12","cy":"12","r":"2"}})])}
	};

	var FeatherTerminal = {
	  name: "feather-terminal",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-terminal",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"4 17 10 11 4 5"}}),_c('line',{attrs:{"x1":"12","y1":"19","x2":"20","y2":"19"}})])}
	};

	var FeatherThermometer = {
	  name: "feather-thermometer",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-thermometer",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"}})])}
	};

	var FeatherThumbsDown = {
	  name: "feather-thumbs-down",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-thumbs-down",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"}})])}
	};

	var FeatherThumbsUp = {
	  name: "feather-thumbs-up",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-thumbs-up",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"}})])}
	};

	var FeatherToggleLeft = {
	  name: "feather-toggle-left",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-toggle-left",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"1","y":"5","width":"22","height":"14","rx":"7","ry":"7"}}),_c('circle',{attrs:{"cx":"8","cy":"12","r":"3"}})])}
	};

	var FeatherToggleRight = {
	  name: "feather-toggle-right",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-toggle-right",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"1","y":"5","width":"22","height":"14","rx":"7","ry":"7"}}),_c('circle',{attrs:{"cx":"16","cy":"12","r":"3"}})])}
	};

	var FeatherTrash2 = {
	  name: "feather-trash-2",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-trash-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"3 6 5 6 21 6"}}),_c('path',{attrs:{"d":"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}}),_c('line',{attrs:{"x1":"10","y1":"11","x2":"10","y2":"17"}}),_c('line',{attrs:{"x1":"14","y1":"11","x2":"14","y2":"17"}})])}
	};

	var FeatherTrash = {
	  name: "feather-trash",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-trash",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"3 6 5 6 21 6"}}),_c('path',{attrs:{"d":"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}})])}
	};

	var FeatherTrendingDown = {
	  name: "feather-trending-down",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-trending-down",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"23 18 13.5 8.5 8.5 13.5 1 6"}}),_c('polyline',{attrs:{"points":"17 18 23 18 23 12"}})])}
	};

	var FeatherTrendingUp = {
	  name: "feather-trending-up",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-trending-up",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"23 6 13.5 15.5 8.5 10.5 1 18"}}),_c('polyline',{attrs:{"points":"17 6 23 6 23 12"}})])}
	};

	var FeatherTriangle = {
	  name: "feather-triangle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-triangle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}})])}
	};

	var FeatherTruck = {
	  name: "feather-truck",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-truck",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"1","y":"3","width":"15","height":"13"}}),_c('polygon',{attrs:{"points":"16 8 20 8 23 11 23 16 16 16 16 8"}}),_c('circle',{attrs:{"cx":"5.5","cy":"18.5","r":"2.5"}}),_c('circle',{attrs:{"cx":"18.5","cy":"18.5","r":"2.5"}})])}
	};

	var FeatherTv = {
	  name: "feather-tv",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-tv",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"2","y":"7","width":"20","height":"15","rx":"2","ry":"2"}}),_c('polyline',{attrs:{"points":"17 2 12 7 7 2"}})])}
	};

	var FeatherTwitter = {
	  name: "feather-twitter",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-twitter",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"}})])}
	};

	var FeatherType = {
	  name: "feather-type",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-type",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"4 7 4 4 20 4 20 7"}}),_c('line',{attrs:{"x1":"9","y1":"20","x2":"15","y2":"20"}}),_c('line',{attrs:{"x1":"12","y1":"4","x2":"12","y2":"20"}})])}
	};

	var FeatherUmbrella = {
	  name: "feather-umbrella",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-umbrella",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"}})])}
	};

	var FeatherUnderline = {
	  name: "feather-underline",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-underline",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"}}),_c('line',{attrs:{"x1":"4","y1":"21","x2":"20","y2":"21"}})])}
	};

	var FeatherUnlock = {
	  name: "feather-unlock",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-unlock",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"11","width":"18","height":"11","rx":"2","ry":"2"}}),_c('path',{attrs:{"d":"M7 11V7a5 5 0 0 1 9.9-1"}})])}
	};

	var FeatherUploadCloud = {
	  name: "feather-upload-cloud",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-upload-cloud",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"16 16 12 12 8 16"}}),_c('line',{attrs:{"x1":"12","y1":"12","x2":"12","y2":"21"}}),_c('path',{attrs:{"d":"M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"}}),_c('polyline',{attrs:{"points":"16 16 12 12 8 16"}})])}
	};

	var FeatherUpload = {
	  name: "feather-upload",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-upload",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}}),_c('polyline',{attrs:{"points":"17 8 12 3 7 8"}}),_c('line',{attrs:{"x1":"12","y1":"3","x2":"12","y2":"15"}})])}
	};

	var FeatherUserCheck = {
	  name: "feather-user-check",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-user-check",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}}),_c('circle',{attrs:{"cx":"8.5","cy":"7","r":"4"}}),_c('polyline',{attrs:{"points":"17 11 19 13 23 9"}})])}
	};

	var FeatherUserMinus = {
	  name: "feather-user-minus",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-user-minus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}}),_c('circle',{attrs:{"cx":"8.5","cy":"7","r":"4"}}),_c('line',{attrs:{"x1":"23","y1":"11","x2":"17","y2":"11"}})])}
	};

	var FeatherUserPlus = {
	  name: "feather-user-plus",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-user-plus",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}}),_c('circle',{attrs:{"cx":"8.5","cy":"7","r":"4"}}),_c('line',{attrs:{"x1":"20","y1":"8","x2":"20","y2":"14"}}),_c('line',{attrs:{"x1":"23","y1":"11","x2":"17","y2":"11"}})])}
	};

	var FeatherUserX = {
	  name: "feather-user-x",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-user-x",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}}),_c('circle',{attrs:{"cx":"8.5","cy":"7","r":"4"}}),_c('line',{attrs:{"x1":"18","y1":"8","x2":"23","y2":"13"}}),_c('line',{attrs:{"x1":"23","y1":"8","x2":"18","y2":"13"}})])}
	};

	var FeatherUser = {
	  name: "feather-user",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-user",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}}),_c('circle',{attrs:{"cx":"12","cy":"7","r":"4"}})])}
	};

	var FeatherUsers = {
	  name: "feather-users",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-users",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}}),_c('circle',{attrs:{"cx":"9","cy":"7","r":"4"}}),_c('path',{attrs:{"d":"M23 21v-2a4 4 0 0 0-3-3.87"}}),_c('path',{attrs:{"d":"M16 3.13a4 4 0 0 1 0 7.75"}})])}
	};

	var FeatherVideoOff = {
	  name: "feather-video-off",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-video-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"}}),_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}})])}
	};

	var FeatherVideo = {
	  name: "feather-video",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-video",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"23 7 16 12 23 17 23 7"}}),_c('rect',{attrs:{"x":"1","y":"5","width":"15","height":"14","rx":"2","ry":"2"}})])}
	};

	var FeatherVoicemail = {
	  name: "feather-voicemail",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-voicemail",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"5.5","cy":"11.5","r":"4.5"}}),_c('circle',{attrs:{"cx":"18.5","cy":"11.5","r":"4.5"}}),_c('line',{attrs:{"x1":"5.5","y1":"16","x2":"18.5","y2":"16"}})])}
	};

	var FeatherVolume1 = {
	  name: "feather-volume-1",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-volume-1",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}}),_c('path',{attrs:{"d":"M15.54 8.46a5 5 0 0 1 0 7.07"}})])}
	};

	var FeatherVolume2 = {
	  name: "feather-volume-2",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-volume-2",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}}),_c('path',{attrs:{"d":"M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"}})])}
	};

	var FeatherVolumeX = {
	  name: "feather-volume-x",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-volume-x",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}}),_c('line',{attrs:{"x1":"23","y1":"9","x2":"17","y2":"15"}}),_c('line',{attrs:{"x1":"17","y1":"9","x2":"23","y2":"15"}})])}
	};

	var FeatherVolume = {
	  name: "feather-volume",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-volume",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}})])}
	};

	var FeatherWatch = {
	  name: "feather-watch",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-watch",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"7"}}),_c('polyline',{attrs:{"points":"12 9 12 12 13.5 13.5"}}),_c('path',{attrs:{"d":"M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"}})])}
	};

	var FeatherWifiOff = {
	  name: "feather-wifi-off",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-wifi-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}}),_c('path',{attrs:{"d":"M16.72 11.06A10.94 10.94 0 0 1 19 12.55"}}),_c('path',{attrs:{"d":"M5 12.55a10.94 10.94 0 0 1 5.17-2.39"}}),_c('path',{attrs:{"d":"M10.71 5.05A16 16 0 0 1 22.58 9"}}),_c('path',{attrs:{"d":"M1.42 9a15.91 15.91 0 0 1 4.7-2.88"}}),_c('path',{attrs:{"d":"M8.53 16.11a6 6 0 0 1 6.95 0"}}),_c('line',{attrs:{"x1":"12","y1":"20","x2":"12","y2":"20"}})])}
	};

	var FeatherWifi = {
	  name: "feather-wifi",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-wifi",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M5 12.55a11 11 0 0 1 14.08 0"}}),_c('path',{attrs:{"d":"M1.42 9a16 16 0 0 1 21.16 0"}}),_c('path',{attrs:{"d":"M8.53 16.11a6 6 0 0 1 6.95 0"}}),_c('line',{attrs:{"x1":"12","y1":"20","x2":"12","y2":"20"}})])}
	};

	var FeatherWind = {
	  name: "feather-wind",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-wind",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"}})])}
	};

	var FeatherXCircle = {
	  name: "feather-x-circle",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-x-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('line',{attrs:{"x1":"15","y1":"9","x2":"9","y2":"15"}}),_c('line',{attrs:{"x1":"9","y1":"9","x2":"15","y2":"15"}})])}
	};

	var FeatherXSquare = {
	  name: "feather-x-square",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-x-square",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('rect',{attrs:{"x":"3","y":"3","width":"18","height":"18","rx":"2","ry":"2"}}),_c('line',{attrs:{"x1":"9","y1":"9","x2":"15","y2":"15"}}),_c('line',{attrs:{"x1":"15","y1":"9","x2":"9","y2":"15"}})])}
	};

	var FeatherX = {
	  name: "feather-x",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-x",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('line',{attrs:{"x1":"18","y1":"6","x2":"6","y2":"18"}}),_c('line',{attrs:{"x1":"6","y1":"6","x2":"18","y2":"18"}})])}
	};

	var FeatherYoutube = {
	  name: "feather-youtube",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-youtube",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"}}),_c('polygon',{attrs:{"points":"9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"}})])}
	};

	var FeatherZapOff = {
	  name: "feather-zap-off",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-zap-off",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"12.41 6.75 13 2 10.57 4.92"}}),_c('polyline',{attrs:{"points":"18.57 12.91 21 10 15.66 10"}}),_c('polyline',{attrs:{"points":"8 8 3 14 12 14 11 22 16 16"}}),_c('line',{attrs:{"x1":"1","y1":"1","x2":"23","y2":"23"}})])}
	};

	var FeatherZap = {
	  name: "feather-zap",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-zap",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polygon',{attrs:{"points":"13 2 3 14 12 14 11 22 21 10 12 10 13 2"}})])}
	};

	var FeatherZoomIn = {
	  name: "feather-zoom-in",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-zoom-in",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"11","cy":"11","r":"8"}}),_c('line',{attrs:{"x1":"21","y1":"21","x2":"16.65","y2":"16.65"}}),_c('line',{attrs:{"x1":"11","y1":"8","x2":"11","y2":"14"}}),_c('line',{attrs:{"x1":"8","y1":"11","x2":"14","y2":"11"}})])}
	};

	var FeatherZoomOut = {
	  name: "feather-zoom-out",
	  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-zoom-out",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"11","cy":"11","r":"8"}}),_c('line',{attrs:{"x1":"21","y1":"21","x2":"16.65","y2":"16.65"}}),_c('line',{attrs:{"x1":"8","y1":"11","x2":"14","y2":"11"}})])}
	};

	var index$4 = {
	  'feather-activity': FeatherActivity,
	  'feather-airplay': FeatherAirplay,
	  'feather-alert-circle': FeatherAlertCircle,
	  'feather-alert-octagon': FeatherAlertOctagon,
	  'feather-alert-triangle': FeatherAlertTriangle,
	  'feather-align-center': FeatherAlignCenter,
	  'feather-align-justify': FeatherAlignJustify,
	  'feather-align-left': FeatherAlignLeft,
	  'feather-align-right': FeatherAlignRight,
	  'feather-anchor': FeatherAnchor,
	  'feather-aperture': FeatherAperture,
	  'feather-archive': FeatherArchive,
	  'feather-arrow-down-circle': FeatherArrowDownCircle,
	  'feather-arrow-down-left': FeatherArrowDownLeft,
	  'feather-arrow-down-right': FeatherArrowDownRight,
	  'feather-arrow-down': FeatherArrowDown,
	  'feather-arrow-left-circle': FeatherArrowLeftCircle,
	  'feather-arrow-left': FeatherArrowLeft,
	  'feather-arrow-right-circle': FeatherArrowRightCircle,
	  'feather-arrow-right': FeatherArrowRight,
	  'feather-arrow-up-circle': FeatherArrowUpCircle,
	  'feather-arrow-up-left': FeatherArrowUpLeft,
	  'feather-arrow-up-right': FeatherArrowUpRight,
	  'feather-arrow-up': FeatherArrowUp,
	  'feather-at-sign': FeatherAtSign,
	  'feather-award': FeatherAward,
	  'feather-bar-chart-2': FeatherBarChart2,
	  'feather-bar-chart': FeatherBarChart,
	  'feather-battery-charging': FeatherBatteryCharging,
	  'feather-battery': FeatherBattery,
	  'feather-bell-off': FeatherBellOff,
	  'feather-bell': FeatherBell,
	  'feather-bluetooth': FeatherBluetooth,
	  'feather-bold': FeatherBold,
	  'feather-book-open': FeatherBookOpen,
	  'feather-book': FeatherBook,
	  'feather-bookmark': FeatherBookmark,
	  'feather-box': FeatherBox,
	  'feather-briefcase': FeatherBriefcase,
	  'feather-calendar': FeatherCalendar,
	  'feather-camera-off': FeatherCameraOff,
	  'feather-camera': FeatherCamera,
	  'feather-cast': FeatherCast,
	  'feather-check-circle': FeatherCheckCircle,
	  'feather-check-square': FeatherCheckSquare,
	  'feather-check': FeatherCheck,
	  'feather-chevron-down': FeatherChevronDown,
	  'feather-chevron-left': FeatherChevronLeft,
	  'feather-chevron-right': FeatherChevronRight,
	  'feather-chevron-up': FeatherChevronUp,
	  'feather-chevrons-down': FeatherChevronsDown,
	  'feather-chevrons-left': FeatherChevronsLeft,
	  'feather-chevrons-right': FeatherChevronsRight,
	  'feather-chevrons-up': FeatherChevronsUp,
	  'feather-chrome': FeatherChrome,
	  'feather-circle': FeatherCircle,
	  'feather-clipboard': FeatherClipboard,
	  'feather-clock': FeatherClock,
	  'feather-cloud-drizzle': FeatherCloudDrizzle,
	  'feather-cloud-lightning': FeatherCloudLightning,
	  'feather-cloud-off': FeatherCloudOff,
	  'feather-cloud-rain': FeatherCloudRain,
	  'feather-cloud-snow': FeatherCloudSnow,
	  'feather-cloud': FeatherCloud,
	  'feather-code': FeatherCode,
	  'feather-codepen': FeatherCodepen,
	  'feather-command': FeatherCommand,
	  'feather-compass': FeatherCompass,
	  'feather-copy': FeatherCopy,
	  'feather-corner-down-left': FeatherCornerDownLeft,
	  'feather-corner-down-right': FeatherCornerDownRight,
	  'feather-corner-left-down': FeatherCornerLeftDown,
	  'feather-corner-left-up': FeatherCornerLeftUp,
	  'feather-corner-right-down': FeatherCornerRightDown,
	  'feather-corner-right-up': FeatherCornerRightUp,
	  'feather-corner-up-left': FeatherCornerUpLeft,
	  'feather-corner-up-right': FeatherCornerUpRight,
	  'feather-cpu': FeatherCpu,
	  'feather-credit-card': FeatherCreditCard,
	  'feather-crop': FeatherCrop,
	  'feather-crosshair': FeatherCrosshair,
	  'feather-database': FeatherDatabase,
	  'feather-delete': FeatherDelete,
	  'feather-disc': FeatherDisc,
	  'feather-dollar-sign': FeatherDollarSign,
	  'feather-download-cloud': FeatherDownloadCloud,
	  'feather-download': FeatherDownload,
	  'feather-droplet': FeatherDroplet,
	  'feather-edit-2': FeatherEdit2,
	  'feather-edit-3': FeatherEdit3,
	  'feather-edit': FeatherEdit,
	  'feather-external-link': FeatherExternalLink,
	  'feather-eye-off': FeatherEyeOff,
	  'feather-eye': FeatherEye,
	  'feather-facebook': FeatherFacebook,
	  'feather-fast-forward': FeatherFastForward,
	  'feather-feather': FeatherFeather,
	  'feather-file-minus': FeatherFileMinus,
	  'feather-file-plus': FeatherFilePlus,
	  'feather-file-text': FeatherFileText,
	  'feather-file': FeatherFile,
	  'feather-film': FeatherFilm,
	  'feather-filter': FeatherFilter,
	  'feather-flag': FeatherFlag,
	  'feather-folder-minus': FeatherFolderMinus,
	  'feather-folder-plus': FeatherFolderPlus,
	  'feather-folder': FeatherFolder,
	  'feather-gift': FeatherGift,
	  'feather-git-branch': FeatherGitBranch,
	  'feather-git-commit': FeatherGitCommit,
	  'feather-git-merge': FeatherGitMerge,
	  'feather-git-pull-request': FeatherGitPullRequest,
	  'feather-github': FeatherGithub,
	  'feather-gitlab': FeatherGitlab,
	  'feather-globe': FeatherGlobe,
	  'feather-grid': FeatherGrid,
	  'feather-hard-drive': FeatherHardDrive,
	  'feather-hash': FeatherHash,
	  'feather-headphones': FeatherHeadphones,
	  'feather-heart': FeatherHeart,
	  'feather-help-circle': FeatherHelpCircle,
	  'feather-home': FeatherHome,
	  'feather-image': FeatherImage,
	  'feather-inbox': FeatherInbox,
	  'feather-info': FeatherInfo,
	  'feather-instagram': FeatherInstagram,
	  'feather-italic': FeatherItalic,
	  'feather-layers': FeatherLayers,
	  'feather-layout': FeatherLayout,
	  'feather-life-buoy': FeatherLifeBuoy,
	  'feather-link-2': FeatherLink2,
	  'feather-link': FeatherLink,
	  'feather-linkedin': FeatherLinkedin,
	  'feather-list': FeatherList,
	  'feather-loader': FeatherLoader,
	  'feather-lock': FeatherLock,
	  'feather-log-in': FeatherLogIn,
	  'feather-log-out': FeatherLogOut,
	  'feather-mail': FeatherMail,
	  'feather-map-pin': FeatherMapPin,
	  'feather-map': FeatherMap,
	  'feather-maximize-2': FeatherMaximize2,
	  'feather-maximize': FeatherMaximize,
	  'feather-menu': FeatherMenu,
	  'feather-message-circle': FeatherMessageCircle,
	  'feather-message-square': FeatherMessageSquare,
	  'feather-mic-off': FeatherMicOff,
	  'feather-mic': FeatherMic,
	  'feather-minimize-2': FeatherMinimize2,
	  'feather-minimize': FeatherMinimize,
	  'feather-minus-circle': FeatherMinusCircle,
	  'feather-minus-square': FeatherMinusSquare,
	  'feather-minus': FeatherMinus,
	  'feather-monitor': FeatherMonitor,
	  'feather-moon': FeatherMoon,
	  'feather-more-horizontal': FeatherMoreHorizontal,
	  'feather-more-vertical': FeatherMoreVertical,
	  'feather-move': FeatherMove,
	  'feather-music': FeatherMusic,
	  'feather-navigation-2': FeatherNavigation2,
	  'feather-navigation': FeatherNavigation,
	  'feather-octagon': FeatherOctagon,
	  'feather-package': FeatherPackage,
	  'feather-paperclip': FeatherPaperclip,
	  'feather-pause-circle': FeatherPauseCircle,
	  'feather-pause': FeatherPause,
	  'feather-percent': FeatherPercent,
	  'feather-phone-call': FeatherPhoneCall,
	  'feather-phone-forwarded': FeatherPhoneForwarded,
	  'feather-phone-incoming': FeatherPhoneIncoming,
	  'feather-phone-missed': FeatherPhoneMissed,
	  'feather-phone-off': FeatherPhoneOff,
	  'feather-phone-outgoing': FeatherPhoneOutgoing,
	  'feather-phone': FeatherPhone,
	  'feather-pie-chart': FeatherPieChart,
	  'feather-play-circle': FeatherPlayCircle,
	  'feather-play': FeatherPlay,
	  'feather-plus-circle': FeatherPlusCircle,
	  'feather-plus-square': FeatherPlusSquare,
	  'feather-plus': FeatherPlus,
	  'feather-pocket': FeatherPocket,
	  'feather-power': FeatherPower,
	  'feather-printer': FeatherPrinter,
	  'feather-radio': FeatherRadio,
	  'feather-refresh-ccw': FeatherRefreshCcw,
	  'feather-refresh-cw': FeatherRefreshCw,
	  'feather-repeat': FeatherRepeat,
	  'feather-rewind': FeatherRewind,
	  'feather-rotate-ccw': FeatherRotateCcw,
	  'feather-rotate-cw': FeatherRotateCw,
	  'feather-rss': FeatherRss,
	  'feather-save': FeatherSave,
	  'feather-scissors': FeatherScissors,
	  'feather-search': FeatherSearch,
	  'feather-send': FeatherSend,
	  'feather-server': FeatherServer,
	  'feather-settings': FeatherSettings,
	  'feather-share-2': FeatherShare2,
	  'feather-share': FeatherShare,
	  'feather-shield-off': FeatherShieldOff,
	  'feather-shield': FeatherShield,
	  'feather-shopping-bag': FeatherShoppingBag,
	  'feather-shopping-cart': FeatherShoppingCart,
	  'feather-shuffle': FeatherShuffle,
	  'feather-sidebar': FeatherSidebar,
	  'feather-skip-back': FeatherSkipBack,
	  'feather-skip-forward': FeatherSkipForward,
	  'feather-slack': FeatherSlack,
	  'feather-slash': FeatherSlash,
	  'feather-sliders': FeatherSliders,
	  'feather-smartphone': FeatherSmartphone,
	  'feather-speaker': FeatherSpeaker,
	  'feather-square': FeatherSquare,
	  'feather-star': FeatherStar,
	  'feather-stop-circle': FeatherStopCircle,
	  'feather-sun': FeatherSun,
	  'feather-sunrise': FeatherSunrise,
	  'feather-sunset': FeatherSunset,
	  'feather-tablet': FeatherTablet,
	  'feather-tag': FeatherTag,
	  'feather-target': FeatherTarget,
	  'feather-terminal': FeatherTerminal,
	  'feather-thermometer': FeatherThermometer,
	  'feather-thumbs-down': FeatherThumbsDown,
	  'feather-thumbs-up': FeatherThumbsUp,
	  'feather-toggle-left': FeatherToggleLeft,
	  'feather-toggle-right': FeatherToggleRight,
	  'feather-trash-2': FeatherTrash2,
	  'feather-trash': FeatherTrash,
	  'feather-trending-down': FeatherTrendingDown,
	  'feather-trending-up': FeatherTrendingUp,
	  'feather-triangle': FeatherTriangle,
	  'feather-truck': FeatherTruck,
	  'feather-tv': FeatherTv,
	  'feather-twitter': FeatherTwitter,
	  'feather-type': FeatherType,
	  'feather-umbrella': FeatherUmbrella,
	  'feather-underline': FeatherUnderline,
	  'feather-unlock': FeatherUnlock,
	  'feather-upload-cloud': FeatherUploadCloud,
	  'feather-upload': FeatherUpload,
	  'feather-user-check': FeatherUserCheck,
	  'feather-user-minus': FeatherUserMinus,
	  'feather-user-plus': FeatherUserPlus,
	  'feather-user-x': FeatherUserX,
	  'feather-user': FeatherUser,
	  'feather-users': FeatherUsers,
	  'feather-video-off': FeatherVideoOff,
	  'feather-video': FeatherVideo,
	  'feather-voicemail': FeatherVoicemail,
	  'feather-volume-1': FeatherVolume1,
	  'feather-volume-2': FeatherVolume2,
	  'feather-volume-x': FeatherVolumeX,
	  'feather-volume': FeatherVolume,
	  'feather-watch': FeatherWatch,
	  'feather-wifi-off': FeatherWifiOff,
	  'feather-wifi': FeatherWifi,
	  'feather-wind': FeatherWind,
	  'feather-x-circle': FeatherXCircle,
	  'feather-x-square': FeatherXSquare,
	  'feather-x': FeatherX,
	  'feather-youtube': FeatherYoutube,
	  'feather-zap-off': FeatherZapOff,
	  'feather-zap': FeatherZap,
	  'feather-zoom-in': FeatherZoomIn,
	  'feather-zoom-out': FeatherZoomOut
	};

	var $2_22 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _vm.ligature ? _c('i', {
	      class: _vm.iconType,
	      style: {
	        color: _vm.iconColor,
	        fontSize: _vm.size,
	        verticalAlign: _vm.valign
	      }
	    }, [_vm._v(_vm._s(_vm.name))]) : _vm.isSvg ? _c('span', {
	      staticClass: "c-icon"
	    }, [_vm._v("​"), _c(_vm.svgName, {
	      tag: "component",
	      style: {
	        verticalAlign: _vm.valign
	      },
	      attrs: {
	        "width": _vm.size,
	        "height": _vm.size,
	        "stroke": _vm.iconColor
	      }
	    })], 1) : _c('i', {
	      staticClass: "c-icon",
	      class: _vm.classNames,
	      style: {
	        color: _vm.iconColor,
	        fontSize: _vm.size,
	        verticalAlign: _vm.valign
	      }
	    });
	  },
	  staticRenderFns: [],
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
	  components: index$4,
	  data: function data() {
	    return {};
	  },
	  computed: {
	    iconType: function iconType() {
	      if (!this.type) {
	        return this.$clair.icon || 'feather';
	      }

	      return this.type;
	    },
	    isSvg: function isSvg() {
	      return this.iconType === 'feather';
	    },
	    classNames: function classNames() {
	      var prefix = this.iconType !== '' ? "".concat(this.iconType, "-") : '';
	      return "".concat(this.iconType, " ").concat(prefix).concat(this.name);
	    },
	    svgName: function svgName() {
	      return this.isSvg ? "feather-".concat(this.name) : '';
	    },
	    iconColor: function iconColor() {
	      if (!this.color) {
	        return this.isSvg ? 'currentColor' : 'inherit';
	      }

	      return this.color;
	    }
	  }
	};

	/**
	 * Thanks to https://github.com/ant-design/ant-design/
	 * SEE: /master/components/input/calculateNodeHeight.tsx
	 */
	// Thanks to https://github.com/andreypopp/react-textarea-autosize/

	/**
	 * calculateNodeHeight(uiTextNode, useCache = false)
	 */
	var HIDDEN_TEXTAREA_STYLE = "\nmin-height:0 !important;\nmax-height:none !important;\nheight:0 !important;\nvisibility:hidden !important;\noverflow:hidden !important;\nposition:absolute !important;\nz-index:-1000 !important;\ntop:0 !important;\nright:0 !important\n";
	var SIZING_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];
	var computedStyleCache = {};
	var hiddenTextarea;

	function calculateNodeStyling(node) {
	  var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	  var nodeRef = node.getAttribute('id') || node.getAttribute('data-reactid') || node.getAttribute('name');

	  if (useCache && computedStyleCache[nodeRef]) {
	    return computedStyleCache[nodeRef];
	  }

	  var style = window.getComputedStyle(node);
	  var boxSizing = style.getPropertyValue('box-sizing') || style.getPropertyValue('-moz-box-sizing') || style.getPropertyValue('-webkit-box-sizing');
	  var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));
	  var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));
	  var sizingStyle = SIZING_STYLE.map(function (name) {
	    return "".concat(name, ":").concat(style.getPropertyValue(name));
	  }).join(';');
	  var nodeInfo = {
	    sizingStyle: sizingStyle,
	    paddingSize: paddingSize,
	    borderSize: borderSize,
	    boxSizing: boxSizing
	  };

	  if (useCache && nodeRef) {
	    computedStyleCache[nodeRef] = nodeInfo;
	  }

	  return nodeInfo;
	}

	function calculateNodeHeight(uiTextNode) {
	  var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	  var minRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	  var maxRows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

	  if (!hiddenTextarea) {
	    hiddenTextarea = document.createElement('textarea');
	    document.body.appendChild(hiddenTextarea);
	  } // Fix wrap="off" issue
	  // https://github.com/ant-design/ant-design/issues/6577


	  if (uiTextNode.getAttribute('wrap')) {
	    hiddenTextarea.setAttribute('wrap', uiTextNode.getAttribute('wrap'));
	  } else {
	    hiddenTextarea.removeAttribute('wrap');
	  } // Copy all CSS properties that have an impact on the height of the content in
	  // the textbox


	  var _calculateNodeStyling = calculateNodeStyling(uiTextNode, useCache),
	      paddingSize = _calculateNodeStyling.paddingSize,
	      borderSize = _calculateNodeStyling.borderSize,
	      boxSizing = _calculateNodeStyling.boxSizing,
	      sizingStyle = _calculateNodeStyling.sizingStyle; // Need to have the overflow attribute to hide the scrollbar otherwise
	  // text-lines will not calculated properly as the shadow will technically be
	  // narrower for content


	  hiddenTextarea.setAttribute('style', "".concat(sizingStyle, ";").concat(HIDDEN_TEXTAREA_STYLE));
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
	  } // Remove scroll bar flash when autosize without maxRows


	  if (!maxRows) {
	    overflowY = 'hidden';
	  }

	  return {
	    height: "".concat(height, "px"),
	    minHeight: "".concat(minHeight, "px"),
	    maxHeight: "".concat(maxHeight, "px"),
	    overflowY: overflowY
	  };
	}

	var $2_23 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-input-wrap",
	      class: _vm.className
	    }, [_vm._t("prepend"), _vm.type === 'checkbox' && !_vm.multiLine ? _c('input', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: _vm.inputValue,
	        expression: "inputValue"
	      }],
	      ref: "nativeInput",
	      staticClass: "c-input",
	      attrs: {
	        "name": _vm.name,
	        "placeholder": _vm.placeholder,
	        "readonly": _vm.readonly,
	        "disabled": _vm.disabled,
	        "maxlength": _vm.maxlength,
	        "type": "checkbox"
	      },
	      domProps: {
	        "checked": Array.isArray(_vm.inputValue) ? _vm._i(_vm.inputValue, null) > -1 : _vm.inputValue
	      },
	      on: {
	        "input": _vm.onChange,
	        "change": [function ($event) {
	          var $$a = _vm.inputValue,
	              $$el = $event.target,
	              $$c = $$el.checked ? true : false;

	          if (Array.isArray($$a)) {
	            var $$v = null,
	                $$i = _vm._i($$a, $$v);

	            if ($$el.checked) {
	              $$i < 0 && (_vm.inputValue = $$a.concat([$$v]));
	            } else {
	              $$i > -1 && (_vm.inputValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
	            }
	          } else {
	            _vm.inputValue = $$c;
	          }
	        }, _vm.onChange],
	        "blur": _vm.onBlur
	      }
	    }) : _vm.type === 'radio' && !_vm.multiLine ? _c('input', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: _vm.inputValue,
	        expression: "inputValue"
	      }],
	      ref: "nativeInput",
	      staticClass: "c-input",
	      attrs: {
	        "name": _vm.name,
	        "placeholder": _vm.placeholder,
	        "readonly": _vm.readonly,
	        "disabled": _vm.disabled,
	        "maxlength": _vm.maxlength,
	        "type": "radio"
	      },
	      domProps: {
	        "checked": _vm._q(_vm.inputValue, null)
	      },
	      on: {
	        "input": _vm.onChange,
	        "change": [function ($event) {
	          _vm.inputValue = null;
	        }, _vm.onChange],
	        "blur": _vm.onBlur
	      }
	    }) : !_vm.multiLine ? _c('input', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: _vm.inputValue,
	        expression: "inputValue"
	      }],
	      ref: "nativeInput",
	      staticClass: "c-input",
	      attrs: {
	        "name": _vm.name,
	        "placeholder": _vm.placeholder,
	        "readonly": _vm.readonly,
	        "disabled": _vm.disabled,
	        "maxlength": _vm.maxlength,
	        "type": _vm.type
	      },
	      domProps: {
	        "value": _vm.inputValue
	      },
	      on: {
	        "input": [function ($event) {
	          if ($event.target.composing) {
	            return;
	          }

	          _vm.inputValue = $event.target.value;
	        }, _vm.onChange],
	        "change": _vm.onChange,
	        "blur": _vm.onBlur
	      }
	    }) : _vm._e(), _vm.multiLine ? _c('textarea', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: _vm.inputValue,
	        expression: "inputValue"
	      }],
	      ref: "textArea",
	      staticClass: "c-input",
	      style: _vm.textAreaStyle,
	      attrs: {
	        "name": _vm.name,
	        "placeholder": _vm.placeholder,
	        "readonly": _vm.readonly,
	        "disabled": _vm.disabled,
	        "maxlength": _vm.maxlength,
	        "rows": _vm.rows,
	        "cols": _vm.cols,
	        "wrap": _vm.wrap
	      },
	      domProps: {
	        "value": _vm.inputValue
	      },
	      on: {
	        "input": [function ($event) {
	          if ($event.target.composing) {
	            return;
	          }

	          _vm.inputValue = $event.target.value;
	        }, _vm.onChange],
	        "change": _vm.onChange
	      }
	    }) : _vm._e(), _vm._t("append"), !_vm.validity.valid ? _c('em', {
	      staticClass: "c-error-msg"
	    }, [_vm._v(_vm._s(_vm.validity.msg))]) : _vm._e()], 2);
	  },
	  staticRenderFns: [],
	  name: 'c-input',
	  model: {
	    event: 'change'
	  },
	  mixins: [validatable, resettable],
	  inject: {
	    $form: {
	      default: null
	    }
	  },
	  props: {
	    value: {
	      type: [String, Number],
	      default: function _default() {
	        return '';
	      }
	    },
	    placeholder: String,
	    size: String,
	    width: String,
	    readonly: Boolean,
	    disabled: Boolean,
	    multiLine: Boolean,
	    autosize: Array,
	    autofocus: Boolean,
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
	    className: function className() {
	      var classNames = [];
	      if (!this.validity.valid) classNames.push('c-input--error');
	      var size = this.size,
	          width = this.width,
	          $form = this.$form;
	      var actualSize = size || $form && $form.size;
	      var actualWidth = width || $form && $form.width;
	      if (actualSize) classNames.push("is-".concat(actualSize));
	      if (actualWidth) classNames.push("is-".concat(actualWidth));
	      return classNames;
	    }
	  },
	  data: function data() {
	    return {
	      origRows: this.rows,
	      textAreaStyle: {},
	      inputValue: ''
	    };
	  },
	  watch: {
	    value: {
	      handler: function handler(val) {
	        this.inputValue = val;
	      },
	      immediate: true
	    }
	  },
	  methods: {
	    onChange: function onChange(e) {
	      this.$emit('change', e.target.value);
	      this.resizeTextArea();
	    },
	    onBlur: function onBlur() {
	      this.$emit('blur');
	    },
	    resizeTextArea: function resizeTextArea() {
	      var _this = this;

	      var multiLine = this.multiLine,
	          autosize = this.autosize;

	      if (multiLine && autosize) {
	        var _this$autosize = _slicedToArray(this.autosize, 2),
	            minRows = _this$autosize[0],
	            maxRows = _this$autosize[1];

	        var node = this.$refs.textArea;
	        this.$nextTick(function () {
	          var style = calculateNodeHeight(node, false, minRows, maxRows);
	          _this.textAreaStyle = style;
	        });
	      }
	    }
	  },
	  mounted: function mounted() {
	    var multiLine = this.multiLine,
	        autosize = this.autosize,
	        autofocus = this.autofocus;

	    if (multiLine && autosize) {
	      this.resizeTextArea();
	    }

	    if (autofocus) {
	      this.$refs.nativeInput.focus();
	    }

	    var defaultThrottleTime = this.$clair.defaultThrottleTime;
	    this.resizeTextArea = throttle_1(this.resizeTextArea.bind(this), defaultThrottleTime);
	  }
	};

	var $2_24 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-menu",
	      class: _vm.classNames,
	      style: _vm.styles
	    }, [_vm._t("default")], 2);
	  },
	  staticRenderFns: [],
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
	  provide: function provide() {
	    return {
	      $menu: this
	    };
	  },
	  computed: {
	    styles: function styles() {
	      if (this.isVertical && !this.collapsed) {
	        return {
	          width: this.width
	        };
	      }
	    },
	    isVertical: function isVertical() {
	      return this.mode === 'vertical';
	    },
	    classNames: function classNames() {
	      var classNames = [];
	      var mode = this.mode,
	          theme = this.theme,
	          isVertical = this.isVertical,
	          collapsed = this.collapsed;
	      if (mode) classNames.push("c-menu--".concat(mode));
	      if (theme) classNames.push("c-menu--".concat(theme));
	      if (isVertical && collapsed) classNames.push('c-menu--collapsed');
	      return classNames;
	    }
	  },
	  data: function data() {
	    return {};
	  },
	  methods: {}
	};

	var $2_25 = {
	  name: 'c-menu-item',
	  props: {
	    mode: String,
	    active: Boolean
	  },
	  data: function data() {
	    return {
	      isActive: false
	    };
	  },
	  computed: {
	    isLevel1: function isLevel1() {
	      return this.$parent.$options.name === 'c-menu';
	    },
	    classNames: function classNames() {
	      var classNames = [];
	      if (this.isActive) classNames.push('is-active');
	      return classNames;
	    }
	  },
	  mounted: function mounted() {
	    if (this.active) this.isActive = true;
	  },

	  /**
	   * write render function to avoid duplicate default slots error message
	   */
	  render: function render(c) {
	    var content = this.$slots.default;
	    var tips = c('c-tip', {
	      attrs: {
	        position: 'right'
	      }
	    }, [content, c('template', {
	      slot: 'content'
	    }, [content])]);
	    var needTips = this.isLevel1 && this.$parent.collapsed;
	    var children = [needTips ? tips : content];
	    return c('div', {
	      staticClass: 'c-menu__item',
	      class: this.classNames
	    }, children);
	  }
	};

	var $2_26 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-submenu",
	      class: {
	        'is-open': _vm.isOpen
	      }
	    }, [_c('div', {
	      staticClass: "c-submenu__title c-menu__item",
	      on: {
	        "click": _vm.toggleSubmenu,
	        "mouseenter": _vm.enterSubMenu,
	        "mouseleave": _vm.leaveSubMenu
	      }
	    }, [_vm._t("title", [_vm._v(_vm._s(_vm.title))])], 2), _c('div', {
	      staticClass: "c-submenu__popup",
	      on: {
	        "mouseenter": _vm.enterPopup,
	        "mouseleave": _vm.leavePopup,
	        "focusin": _vm.focusIn,
	        "focusout": _vm.focusOut,
	        "!click": function click($event) {
	          return _vm.clickSubMenu($event);
	        }
	      }
	    }, [_vm._t("default")], 2)]);
	  },
	  staticRenderFns: [],
	  name: 'c-submenu',
	  props: {
	    title: String,
	    open: Boolean,
	    trigger: VueTypes.oneOf(['hover', 'click']),
	    delay: {
	      type: Number,
	      default: 60
	    }
	  },
	  inject: ['$menu'],
	  watch: {
	    open: {
	      immediate: true,
	      handler: function handler() {
	        if (this.open) {
	          this.isOpen = true;
	        }
	      }
	    },
	    '$menu.collapsed': function $menuCollapsed(collapsed) {
	      if (collapsed) {
	        this.isOpen = false;
	      }
	    }
	  },
	  data: function data() {
	    return {
	      isOpen: false,
	      hideSubMenuTimer: null,
	      // 隐藏子菜单时延时
	      showSubMenuTimer: null // hover显示子菜单延时

	    };
	  },
	  computed: {
	    isVerticalExpanding: function isVerticalExpanding() {
	      var _this$$menu = this.$menu,
	          isVertical = _this$$menu.isVertical,
	          collapsed = _this$$menu.collapsed;
	      return isVertical && !collapsed;
	    },
	    innerTrigger: function innerTrigger() {
	      if (this.isVerticalExpanding) {
	        return 'click';
	      } // if not specified in props,
	      // use 'hover' for vertical cases
	      // and 'click' for horizontal cases


	      if (this.trigger == null) {
	        var isVertical = this.$menu.isVertical;
	        return isVertical ? 'hover' : 'click';
	      }

	      return this.trigger;
	    }
	  },
	  methods: {
	    toggleSubmenu: function toggleSubmenu() {
	      if (this.innerTrigger === 'click') {
	        this.isOpen = !this.isOpen;
	      }
	    },
	    enterSubMenu: function enterSubMenu() {
	      if (this.innerTrigger === 'hover') {
	        this.enterPopup();
	      }
	    },
	    leaveSubMenu: function leaveSubMenu() {
	      if (this.innerTrigger === 'hover') {
	        this.leavePopup();
	      }
	    },
	    enterPopup: function enterPopup() {
	      var _this = this;

	      if (this.isVerticalExpanding) {
	        return;
	      }

	      clearTimeout(this.showSubMenuTimer);
	      clearTimeout(this.hideSubMenuTimer);
	      this.showSubMenuTimer = setTimeout(function () {
	        _this.openSubMenu();
	      }, this.delay);
	    },
	    leavePopup: function leavePopup() {
	      var _this2 = this;

	      if (this.isVerticalExpanding) {
	        return;
	      }

	      clearTimeout(this.showSubMenuTimer);
	      clearTimeout(this.hideSubMenuTimer);
	      this.hideSubMenuTimer = setTimeout(function () {
	        _this2.closeSubMenu();
	      }, this.delay);
	    },
	    clickSubMenu: function clickSubMenu() {
	      if (this.isVerticalExpanding) {
	        return;
	      }

	      this.closeSubMenu();
	    },
	    openSubMenu: function openSubMenu() {
	      this.isOpen = true;
	    },
	    closeSubMenu: function closeSubMenu() {
	      this.isOpen = false;
	    },
	    focusIn: function focusIn() {
	      this.openSubMenu();
	    },
	    focusOut: function focusOut() {
	      // do not close submenu if menu is vertical and not collapsed
	      if (this.isVerticalExpanding) {
	        return;
	      }

	      this.closeSubMenu();
	    }
	  }
	};

	var uid = 0;
	var overflowController = {
	  map: {},
	  modalCount: 0,
	  oldOverflow: '',
	  oldPaddingRight: '',
	  start: function start(uid) {
	    this.map[uid] = 1;
	    this.modalCount += 1;

	    if (this.modalCount !== 1) {
	      return;
	    }

	    var hasScrollbar = document.documentElement.clientWidth < window.innerWidth;
	    var style = document.body.style;
	    this.oldOverflow = style.overflow;
	    this.oldPaddingRight = style.paddingRight;

	    if (hasScrollbar) {
	      style.paddingRight = "".concat(getScrollBarSize(), "px");
	    } // always make `body` hidden
	    // when modal shown


	    style.overflow = 'hidden';
	  },
	  reset: function reset(uid) {
	    if (this.map[uid] !== 1) {
	      return;
	    }

	    this.map[uid] = 0;
	    this.modalCount -= 1;

	    if (this.modalCount !== 0) {
	      return;
	    }

	    var style = document.body.style;
	    style.overflow = this.oldOverflow;
	    style.paddingRight = this.oldPaddingRight;
	    this.isHidden = false;
	  }
	};
	var $2_27 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('c-portal', {
	      attrs: {
	        "aria-hidden": '' + !_vm.visible
	      }
	    }, [_c('transition', {
	      attrs: {
	        "appear": "",
	        "name": "modal",
	        "mode": "out-in"
	      },
	      on: {
	        "before-enter": _vm.beforeEnter,
	        "after-leave": _vm.afterLeave
	      }
	    }, [_c('div', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: _vm.visible,
	        expression: "visible"
	      }],
	      ref: "dom",
	      staticClass: "c-modal",
	      style: {
	        zIndex: _vm.zIndex
	      },
	      on: {
	        "click": function click($event) {
	          if ($event.target !== $event.currentTarget) {
	            return null;
	          }

	          _vm.maskClosable ? _vm.$emit('close') : _vm.noop();
	        }
	      }
	    }, [_c('div', {
	      staticClass: "c-modal__wrapper",
	      style: _vm.styleObj
	    }, [_c('div', {
	      staticClass: "c-modal__header"
	    }, [_vm.closable ? _c('c-button', {
	      staticClass: "c-modal__close",
	      attrs: {
	        "icon": "x",
	        "flat": ""
	      },
	      on: {
	        "click": function click($event) {
	          _vm.$emit('close');
	        }
	      }
	    }) : _vm._e(), _vm._t("header", [_c('div', [_vm._v(_vm._s(_vm.title))])])], 2), _c('div', {
	      staticClass: "c-modal__body"
	    }, [_vm._t("default", [_c('div')])], 2), _c('div', {
	      staticClass: "c-modal__footer"
	    }, [_vm._t("footer", [_c('c-button', {
	      attrs: {
	        "outline": ""
	      },
	      on: {
	        "click": function click($event) {
	          _vm.$emit('cancel');
	        }
	      }
	    }, [_vm._v("取消")]), _c('c-button', {
	      attrs: {
	        "primary": ""
	      },
	      on: {
	        "click": function click($event) {
	          _vm.$emit('confirm');
	        }
	      }
	    }, [_vm._v("确认")])])], 2)])])])], 1);
	  },
	  staticRenderFns: [],
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
	  data: function data() {
	    return {
	      uid: uid++,
	      zIndex: zIndex.next()
	    };
	  },
	  computed: {
	    styleObj: function styleObj() {
	      var top = this.top,
	          width = this.width;
	      top = typeof top === 'number' ? "".concat(top, "px") : top;
	      width = typeof width === 'number' ? "".concat(width, "px") : width;

	      if (!this.center) {
	        return {
	          top: top,
	          width: width
	        };
	      }

	      return {
	        width: width,
	        top: '50%',
	        transform: 'translateY(-50%)'
	      };
	    }
	  },
	  methods: {
	    qsa: function qsa(selectors) {
	      var list = this.$refs.dom.querySelectorAll(selectors);
	      return Array.prototype.slice.call(list);
	    },
	    handleTab: function handleTab(shiftKey) {
	      var selectors = "input, button, textarea, select, a[href]";
	      var elems = this.qsa(selectors).filter(function (el) {
	        return !el.disabled && el.type !== 'hidden';
	      }).filter(function (el) {
	        return el.offsetWidth > 0 && el.offsetHeight > 0;
	      });
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
	    handleKeydown: function handleKeydown(e) {
	      var visible = this.visible,
	          closable = this.closable;

	      if (visible === false) {
	        return;
	      }

	      var keyCode = e.keyCode,
	          shiftKey = e.shiftKey; // Tab or Shift+Tab

	      if (keyCode === 9) {
	        e.preventDefault();
	        return this.handleTab(shiftKey);
	      } // ESC


	      if (closable && keyCode === 27) {
	        // close modal
	        return this.$emit('close');
	      }
	    },
	    beforeEnter: function beforeEnter() {
	      overflowController.start(this.uid);
	    },
	    afterLeave: function afterLeave() {
	      overflowController.reset(this.uid); // why?

	      this.$emit('after-leave');
	    }
	  },
	  mounted: function mounted() {
	    this.handleKeydown = this.handleKeydown.bind(this);
	    document.addEventListener('keydown', this.handleKeydown);
	  },
	  beforeDestroy: function beforeDestroy() {
	    overflowController.reset(this.uid);
	    document.removeEventListener('keydown', this.handleKeydown);
	  }
	};

	var $2_28 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('transition', {
	      attrs: {
	        "appear": "",
	        "name": "notification",
	        "mode": "out-in",
	        "type": "transition"
	      },
	      on: {
	        "before-enter": _vm.beforeEnter,
	        "after-leave": _vm.afterLeave
	      }
	    }, [_c('div', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: _vm.visible,
	        expression: "visible"
	      }],
	      staticClass: "c-notice__wrapper",
	      style: _vm.classObj,
	      on: {
	        "mouseenter": _vm.clearTimer,
	        "mouseleave": _vm.startTimer
	      }
	    }, [_vm._t("default"), _c('div', [_c('div', {
	      staticClass: "c-notice__header"
	    }, [_vm.closable ? _c('c-button', {
	      staticClass: "c-notice__close",
	      attrs: {
	        "icon": "x",
	        "flat": ""
	      },
	      on: {
	        "click": function click($event) {
	          $event.stopPropagation();

	          _vm.$emit('close');
	        }
	      }
	    }) : _vm._e(), _c('span', [_vm._v(_vm._s(_vm.title))])], 1), _c('div', {
	      staticClass: "c-notice__body"
	    }, [_vm.dangerouslySetInnerHTML ? _c('div', {
	      domProps: {
	        "innerHTML": _vm._s(_vm.message)
	      }
	    }) : _c('div', [_vm._v(_vm._s(_vm.message))])])])], 2)]);
	  },
	  staticRenderFns: [],
	  name: 'c-notification',
	  props: {
	    visible: VueTypes.bool,
	    title: VueTypes.string,
	    message: VueTypes.string,
	    duration: VueTypes.number.def(4000),
	    closable: VueTypes.bool.def(true),
	    position: VueTypes.oneOf(['topRight', 'bottomRight', 'bottomLeft', 'topLeft']).def('topRight'),
	    type: VueTypes.string,
	    offset: VueTypes.number.def(0),
	    dangerouslySetInnerHTML: VueTypes.bool.def(false)
	  },
	  data: function data() {
	    return {
	      zIndex: zIndex.next(),
	      timer: null
	    };
	  },
	  computed: {
	    classObj: function classObj() {
	      return {
	        zIndex: zIndex,
	        transform: "translateX(".concat(this.position === 'topRight' || this.position === 'bottomRight' ? -this.offset : this.offset, "px)")
	      };
	    }
	  },
	  methods: {
	    beforeEnter: function beforeEnter() {
	      var _this = this;

	      if (this.duration) {
	        // duration未被设置为0
	        this.timer = setTimeout(function (_) {
	          _this.$emit('close');
	        }, this.duration);
	      }
	    },
	    afterLeave: function afterLeave() {
	      this.$emit('after-leave');
	    },
	    clearTimer: function clearTimer() {
	      clearTimeout(this.timer);
	    },
	    startTimer: function startTimer() {
	      var _this2 = this;

	      if (this.duration > 0) {
	        this.timer = setTimeout(function (_) {
	          _this2.$emit('close');
	        }, this.duration);
	      }
	    }
	  },
	  destroyed: function destroyed() {
	    this.clearTimer();
	  }
	};

	var $2_29 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-pagination"
	    }, [_c('span', {
	      staticClass: "c-pagination__total"
	    }, [_vm._t("total", [_vm._v("共"), _c('em', [_vm._v(_vm._s(_vm.total))]), _vm._v("条")])], 2), _c('span', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: _vm.pageCount > 1,
	        expression: "pageCount > 1"
	      }],
	      staticClass: "c-pagination__pages"
	    }, [_c('a', {
	      staticClass: "c-pagination_prev",
	      class: {
	        'is-disabled': _vm.pageNumber == 1
	      },
	      attrs: {
	        "href": "#"
	      },
	      on: {
	        "click": function click($event) {
	          $event.preventDefault();

	          _vm.goPage(_vm.pageNumber - 1);
	        }
	      }
	    }, [_vm._t("prev", [_c('c-icon', {
	      attrs: {
	        "name": "chevron-left",
	        "valign": "middle"
	      }
	    })])], 2), _c('a', {
	      staticClass: "c-pagination__page",
	      class: {
	        'is-active': _vm.pageNumber == 1
	      },
	      attrs: {
	        "href": "#"
	      },
	      on: {
	        "click": function click($event) {
	          $event.preventDefault();

	          _vm.goPage(1);
	        }
	      }
	    }, [_vm._v("1")]), _c('span', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: _vm.spanRange[0] > 2,
	        expression: "spanRange[0] > 2"
	      }],
	      staticClass: "c-pagination__ellipsis"
	    }, [_vm._v("⋯")]), _vm._l(_vm.spanRange, function (n) {
	      return _c('a', {
	        staticClass: "c-pagination__page",
	        class: {
	          'is-active': n == _vm.pageNumber
	        },
	        attrs: {
	          "href": "#"
	        },
	        on: {
	          "click": function click($event) {
	            $event.preventDefault();

	            _vm.goPage(n);
	          }
	        }
	      }, [_vm._v(_vm._s(n))]);
	    }), _c('span', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: _vm.showEndEllipse,
	        expression: "showEndEllipse"
	      }],
	      staticClass: "c-pagination__ellipsis"
	    }, [_vm._v("⋯")]), _c('a', {
	      staticClass: "c-pagination__page",
	      class: {
	        'is-active': _vm.pageNumber == _vm.pageCount
	      },
	      attrs: {
	        "href": "#"
	      },
	      on: {
	        "click": function click($event) {
	          $event.preventDefault();

	          _vm.goPage(_vm.pageCount);
	        }
	      }
	    }, [_vm._v(_vm._s(_vm.pageCount))]), _c('a', {
	      staticClass: "c-pagination_prev",
	      class: {
	        'is-disabled': _vm.pageNumber == _vm.pageCount
	      },
	      attrs: {
	        "href": "#"
	      },
	      on: {
	        "click": function click($event) {
	          $event.preventDefault();

	          _vm.goPage(_vm.pageNumber + 1);
	        }
	      }
	    }, [_c('c-icon', {
	      attrs: {
	        "name": "chevron-right",
	        "valign": "middle"
	      }
	    })], 1)], 2)]);
	  },
	  staticRenderFns: [],
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
	  data: function data() {
	    return {
	      pageNumber: this.pn
	    };
	  },
	  computed: {
	    pageCount: function pageCount() {
	      return Math.ceil(this.total / this.ps) || 0;
	    },

	    /**
	     * 计算要显示的页码，不包括第一页和最后一页
	     * e.g. [4,5,6,7,8,9,10]
	     */
	    spanRange: function spanRange() {
	      var range = [];
	      var start = Math.max(this.pageNumber - this.span, 2);
	      var end = Math.min(this.pageNumber + this.span, this.pageCount - 1);

	      for (var i = start; i <= end; i++) {
	        range.push(i);
	      }

	      return range;
	    },
	    showEndEllipse: function showEndEllipse() {
	      var lastPageInRange = this.spanRange[this.spanRange.length - 1];
	      return lastPageInRange < this.pageCount - 1;
	    }
	  },
	  created: function created() {
	    var _this = this;

	    this.$watch(function (vm) {
	      return [vm.pn, vm.total].join();
	    }, function (_) {
	      var pn = Number.parseInt(_this.pn) || 1;
	      var exceedMax = pn > _this.pageCount;

	      if (exceedMax) {
	        _this.pageNumber = _this.pageCount;

	        _this.$emit('change', _this.pageNumber);
	      } else {
	        _this.pageNumber = pn;
	      }
	    });
	  },
	  methods: {
	    /**
	     * 切换页码
	     * event 点击事件，用以获取target
	     */
	    goPage: function goPage(page) {
	      if (page < 1 || page > this.pageCount) return;
	      this.pageNumber = page;
	      this.$emit('change', page);
	    }
	  }
	};

	var $2_30 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('label', {
	      class: _vm.classNames,
	      on: {
	        "change": _vm.onChange
	      }
	    }, [_c('input', {
	      attrs: {
	        "type": "radio",
	        "name": _vm.name,
	        "disabled": _vm.disabled
	      },
	      domProps: {
	        "value": _vm.value,
	        "checked": _vm.value == _vm.checkedIndex
	      }
	    }), _c('span', {
	      staticClass: "c-radio__box"
	    }), _c('span', {
	      staticClass: "c-radio__label"
	    }, [_vm._v(_vm._s(_vm.label))])]);
	  },
	  staticRenderFns: [],
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
	    classNames: function classNames() {
	      var button = this.button;
	      var classes = button ? 'c-radio--button' : 'c-radio';
	      return classes;
	    }
	  },
	  methods: {
	    onChange: function onChange(e) {
	      this.$emit('input', this.value);
	    }
	  }
	};

	var $2_31 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-radio-group",
	      class: _vm.classNames
	    }, _vm._l(_vm.options, function (option, index) {
	      return _c('c-radio', {
	        key: index,
	        attrs: {
	          "name": _vm.name,
	          "value": index,
	          "button": _vm.button,
	          "label": option.label,
	          "disabled": option.disabled
	        },
	        model: {
	          value: _vm.checkedIndex,
	          callback: function callback($$v) {
	            _vm.checkedIndex = $$v;
	          },
	          expression: "checkedIndex"
	        }
	      });
	    }));
	  },
	  staticRenderFns: [],
	  name: 'c-radio-group',
	  inject: {
	    $form: {
	      default: null
	    }
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
	      type: [Number, String, Object, Boolean]
	    },
	    button: Boolean,
	    size: String
	  },
	  data: function data() {
	    return {
	      name: randomString(),
	      checkedIndex: -1
	    };
	  },
	  computed: {
	    classNames: function classNames() {
	      var size = this.size,
	          $form = this.$form;
	      var actualSize = size || $form && $form.size;
	      return "is-".concat(actualSize);
	    }
	  },
	  created: function created() {
	    var _this = this;

	    this.updateChecked();
	    this.$watch('options', this.updateChecked);
	    this.$watch('value', this.updateChecked);
	    this.$watch('checkedIndex', function (index) {
	      var value = index > -1 ? _this.options[_this.checkedIndex].value : _this.value;

	      _this.$emit('change', value);
	    });
	  },
	  methods: {
	    updateChecked: function updateChecked() {
	      var _this2 = this;

	      this.checkedIndex = this.options.findIndex(function (option) {
	        return option.value === _this2.value;
	      });
	    }
	  }
	};

	/**
	 * get absolute position relative to another element
	 */
	var POSITION = {
	  TOP: 'top',
	  BOTTOM: 'bottom'
	};
	function getPosition(el, refEl) {
	  var pos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : POSITION.TOP;
	  var refRect = refEl.getBoundingClientRect();
	  var refTop = refRect.top + window.pageYOffset;
	  var refLeft = refRect.left + window.pageXOffset;
	  var left = refLeft;
	  var top = pos === POSITION.TOP ? refTop : refTop + refEl.clientHeight;
	  return {
	    left: left,
	    top: top
	  };
	}

	var normalizeOptions = function normalizeOptions() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  return options.map(function (option) {
	    if (typeof option === 'string') return {
	      label: option,
	      value: option
	    };
	    return option;
	  });
	};

	var $2_32 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-select",
	      class: _vm.classNames,
	      attrs: {
	        "role": "combobox",
	        "aria-autocomplete": "list",
	        "aria-haspopup": "true",
	        "aria-expanded": _vm.isOpen,
	        "aria-disabled": "disabled",
	        "tabindex": _vm.disabled ? -1 : 0
	      },
	      on: {
	        "keydown": _vm.onKeyDown,
	        "click": _vm.toggleOpen
	      }
	    }, [_c('i', {
	      staticClass: "c-select__caret"
	    }), _c('div', {
	      staticClass: "c-select__selection"
	    }, [_vm.showPlaceholder ? _c('div', {
	      staticClass: "c-select__placeholder"
	    }, [_vm._v(_vm._s(_vm.placeholder))]) : _vm._e(), !_vm.multiple && _vm.selectedOptions.length ? _c('div', {
	      staticClass: "c-select__value"
	    }, [_vm._v(_vm._s(_vm.selectedOptions[0].label))]) : _vm._e(), _vm._l(_vm.selectedOptions, function (option, index) {
	      return _vm.multiple ? _c('div', {
	        key: index,
	        staticClass: "c-chip",
	        class: {
	          'is-disabled': option.disabled
	        }
	      }, [_vm._t("selection", [_c('span', [_vm._v(_vm._s(option.label))])], {
	        option: option
	      }), _c('div', {
	        staticClass: "c-chip__close",
	        on: {
	          "click": function click($event) {
	            $event.stopPropagation();

	            _vm.unselectOption(option);
	          }
	        }
	      }, [_c('c-icon', {
	        attrs: {
	          "name": "x",
	          "valign": "middle"
	        }
	      })], 1)], 2) : _vm._e();
	    }), _c('div', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: _vm.showInput,
	        expression: "showInput"
	      }],
	      staticClass: "c-select__input",
	      class: _vm.multiple ? 'is-multiple' : 'is-single'
	    }, [_c('input', {
	      directives: [{
	        name: "model",
	        rawName: "v-model",
	        value: _vm.query,
	        expression: "query"
	      }],
	      attrs: {
	        "autocomplete": "off"
	      },
	      domProps: {
	        "value": _vm.query
	      },
	      on: {
	        "click": function click($event) {
	          $event.stopPropagation();
	          return _vm.noop($event);
	        },
	        "blur": function blur($event) {
	          _vm.$el.focus();
	        },
	        "keydown": function keydown($event) {
	          if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46], $event.key, ["Backspace", "Delete"])) {
	            return null;
	          }

	          return _vm.onDeleteKey($event);
	        },
	        "input": [function ($event) {
	          if ($event.target.composing) {
	            return;
	          }

	          _vm.query = $event.target.value;
	        }, _vm.onSearchInput]
	      }
	    })])], 2), _c('c-portal', {
	      attrs: {
	        "aria-hidden": '' + !_vm.isOpen
	      }
	    }, [_c('transition', {
	      attrs: {
	        "name": "fade-in-down"
	      }
	    }, [_c('div', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: _vm.isOpen,
	        expression: "isOpen"
	      }],
	      ref: "menu",
	      staticClass: "c-select__menu",
	      class: _vm.size ? 'is-' + _vm.size : '',
	      style: _vm.menuStyle,
	      attrs: {
	        "role": "menu",
	        "aria-activedescendant": ""
	      }
	    }, [_vm.autocomplete && !_vm.filteredOptions.length ? _vm._t("no-match", [_c('div', {
	      staticClass: "c-select__empty"
	    }, [_vm._v("无匹配选项")])]) : _vm._e(), _vm._l(_vm.filteredOptions, function (option, index) {
	      return _c('c-option', {
	        key: index,
	        ref: "$options",
	        refInFor: true,
	        attrs: {
	          "label": option.label,
	          "isActive": _vm.activeOption == option,
	          "isSelected": _vm.selectedOptions.indexOf(option) > -1,
	          "disabled": option.disabled,
	          "option": option
	        }
	      }, [_vm._t("menu-item", null, {
	        label: option.label,
	        isActive: _vm.activeOption == option,
	        isSelected: _vm.selectedOptions.indexOf(option) > -1,
	        disabled: option.disabled,
	        index: index,
	        option: option
	      })], 2);
	    })], 2)])], 1)], 1);
	  },
	  staticRenderFns: [],
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
	      default: function _default(options, query) {
	        var q = query.trim().toLowerCase();
	        if (!q) return options;
	        return options.filter(function (option) {
	          return option.label.toLowerCase().indexOf(q) > -1;
	        });
	      }
	    }
	  },
	  model: {
	    event: 'change'
	  },
	  provide: function provide() {
	    return {
	      $select: this
	    };
	  },
	  inject: {
	    $form: {
	      default: null
	    }
	  },
	  data: function data() {
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
	    };
	  },
	  computed: {
	    normalizedOptions: function normalizedOptions() {
	      return normalizeOptions(this.options);
	    },
	    canInput: function canInput() {
	      return this.combobox || this.autocomplete;
	    },
	    showInput: function showInput() {
	      return this.canInput && this.isOpen;
	    },
	    classNames: function classNames() {
	      var classNames = [{
	        'is-open': this.isOpen,
	        'is-disabled': this.disabled
	      }];
	      var size = this.size,
	          width = this.width,
	          $form = this.$form;
	      var actualSize = size || $form && $form.size;
	      var actualWidth = width || $form && $form.width;
	      if (actualSize) classNames.push("is-".concat(actualSize));
	      if (actualWidth) classNames.push("is-".concat(actualWidth));
	      return classNames;
	    },
	    selectedValues: function selectedValues() {
	      return this.selectedOptions.map(function (option) {
	        return option.value;
	      });
	    },
	    showPlaceholder: function showPlaceholder() {
	      var empty = !this.selectedOptions.length;
	      return empty && !this.isOpen;
	    }
	  },
	  watch: {
	    isOpen: function isOpen() {
	      if (this.isOpen) {
	        this.menuStyle.minWidth = "".concat(this.$el.offsetWidth, "px");
	        this.positionMenu();
	        window.addEventListener('click', this.onBodyClick, true);
	      } else {
	        window.removeEventListener('click', this.onBodyClick, true);
	      }
	    },
	    value: {
	      immediate: true,
	      handler: function handler() {
	        this.updateSelectedOptions();
	      }
	    },
	    options: {
	      immediate: true,
	      handler: function handler() {
	        this.updateSelectedOptions();
	      }
	    },
	    selectedOptions: function selectedOptions() {
	      if (!this.multiple || this.$isServer) return;
	      this.$nextTick(function () {
	        this.positionMenu();
	      });
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;

	    this.menuEl = this.$refs.menu; // hover the option

	    this.$on('option-activated', function (option) {
	      _this.activeOption = option;
	    }); // reset position on window.resize

	    this.__onresize = throttle_1(function () {
	      if (_this.isOpen) {
	        _this.positionMenu();
	      }
	    }, this.$clair.defaultThrottleTime);
	    window.addEventListener('resize', this.__onresize); // select the option

	    this.$on('option-clicked', function (option) {
	      return _this.selectOption(option);
	    }); // watch options, query to filter options

	    this.$watch(function () {
	      return [this.normalizedOptions, this.query, this.isOpen];
	    }, function filterOptions() {
	      var _this2 = this;

	      var autocomplete = this.autocomplete,
	          query = this.query;

	      if (!autocomplete) {
	        this.filteredOptions = this.normalizedOptions;
	        return;
	      }

	      var filtered = this.filter(this.normalizedOptions, query);

	      if (typeof filtered.then === 'function') {
	        var promiseId = Date.now();
	        this.promiseId = promiseId;
	        filtered.then(function (options) {
	          if (_this2.promiseId > promiseId) return;
	          _this2.filteredOptions = normalizeOptions(options);
	        });
	      } else {
	        this.filteredOptions = normalizeOptions(filtered);
	      }
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    window.removeEventListener('resize', this.__onresize);
	  },
	  methods: {
	    toggleOpen: function toggleOpen() {
	      if (this.disabled) return;

	      if (this.isOpen) {
	        this.close();
	      } else {
	        this.open();
	      }
	    },
	    getOption: function getOption(value) {
	      var fn = function fn(option) {
	        return option.value === value;
	      };

	      return this.filteredOptions.find(fn) || this.normalizedOptions.find(fn) || this.selectedOptions.find(fn);
	    },
	    updateSelectedOptions: function updateSelectedOptions() {
	      var _this3 = this;

	      var value = this.value,
	          multiple = this.multiple;
	      var isEmpty = value === void 0 || value === null;

	      if (isEmpty) {
	        this.selectedOptions = [];
	        return;
	      }

	      if (multiple) {
	        var isArray = Array.isArray(value);
	        var isEmptyArray = isArray && value.length === 0;
	        if (isEmptyArray) return;
	        var valueArr = isArray ? value : [value];
	        this.selectedOptions = valueArr.map(function (v) {
	          return _this3.getOption(v);
	        }).filter(function (option) {
	          return option;
	        });
	      } else {
	        var option = this.getOption(value);
	        this.selectedOptions = option ? [option] : [];
	      }
	    },
	    open: function open() {
	      var _this4 = this;

	      this.isOpen = true;

	      var _this$filteredOptions = _slicedToArray(this.filteredOptions, 1);

	      this.activeOption = _this$filteredOptions[0];

	      if (this.showInput) {
	        this.query = '';
	        this.$nextTick(function (_) {
	          _this4.$el.querySelector('input').focus();
	        });
	      }
	    },
	    close: function close() {
	      this.isOpen = false;
	    },
	    getNextOption: function getNextOption(current) {
	      var currentIndex = this.filteredOptions.indexOf(current);
	      var next = this.filteredOptions.find(function (option, index) {
	        return index > currentIndex && !option.disabled;
	      });
	      return next || current;
	    },
	    getPreviousOption: function getPreviousOption(current) {
	      var prev = null;
	      var currentIndex = this.filteredOptions.indexOf(current);

	      for (var i = currentIndex - 1; i >= 0; i--) {
	        if (!this.filteredOptions[i].disabled) {
	          prev = this.filteredOptions[i];
	          break;
	        }
	      }

	      return prev || current;
	    },
	    activateNext: function activateNext() {
	      var next = this.getNextOption(this.activeOption);
	      this.activeOption = next;
	    },
	    activatePrevious: function activatePrevious() {
	      var prev = this.getPreviousOption(this.activeOption);
	      this.activeOption = prev;
	    },
	    selectPrevious: function selectPrevious() {
	      var prev = this.getPreviousOption(this.selectedOptions[0]);
	      this.selectOption(prev);
	    },
	    selectNext: function selectNext() {
	      var next = this.getNextOption(this.selectedOptions[0]);
	      this.selectOption(next);
	    },
	    selectOption: function selectOption(option) {
	      if (this.multiple) {
	        if (this.autocomplete) this.query = '';
	        var isSelected = this.selectedOptions.includes(option);
	        if (isSelected) return this.unselectOption(option);
	        this.selectedOptions.push(option);
	      } else {
	        this.selectedOptions = [option];
	        this.close();
	      }

	      this.emitChange();
	    },
	    unselectOption: function unselectOption(option) {
	      var index = this.selectedOptions.indexOf(option);
	      this.selectedOptions.splice(index, 1);
	      this.emitChange();
	    },
	    positionMenu: function positionMenu() {
	      var pos = this.canInput ? POSITION.BOTTOM : POSITION.TOP;

	      var _getPosition = getPosition(this.menuEl, this.$el, pos),
	          top = _getPosition.top,
	          left = _getPosition.left;

	      var style = this.menuEl.style;
	      style.top = "".concat(top, "px");
	      style.left = "".concat(left, "px");
	      style.zIndex = zIndex.next();
	    },
	    onBodyClick: function onBodyClick(e) {
	      var isInSelect = this.$el.contains(e.target);
	      var isInMenu = this.menuEl.contains(e.target);

	      if (!isInSelect && !isInMenu) {
	        this.close();
	        this.$el.focus();
	      }
	    },
	    onDeleteKey: function onDeleteKey(e) {
	      if (!this.query) this.selectedOptions.pop();
	    },
	    onKeyDown: function onKeyDown(e) {
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
	      var isOpen = this.isOpen,
	          multiple = this.multiple,
	          open = this.open,
	          close = this.close,
	          selectOption = this.selectOption,
	          selectPrevious = this.selectPrevious,
	          selectNext = this.selectNext,
	          activeOption = this.activeOption,
	          activateNext = this.activateNext,
	          activatePrevious = this.activatePrevious;
	      if (Object.values(keys).includes(keyCode)) e.preventDefault(); // open menu on space, up, down key

	      var openTrigger = [keys.SPACE, keys.ENTER, keys.UP, keys.DOWN].includes(keyCode);
	      if (openTrigger && !isOpen) return open(); // close menu on escape

	      if (keyCode === keys.ESC && isOpen) return close(); // press enter to select

	      if (keyCode === keys.ENTER && isOpen) return selectOption(activeOption); // use left, right to navigate on closed state of non-multiple select

	      var canSelect = !isOpen && !multiple;
	      if (canSelect && keyCode === keys.LEFT) return selectPrevious();
	      if (canSelect && keyCode === keys.RIGHT) return selectNext(); // use up, down to navigate on open state

	      if (isOpen && keyCode === keys.UP) return activatePrevious();
	      if (isOpen && keyCode === keys.DOWN) return activateNext();
	    },
	    onSearchInput: function onSearchInput(e) {
	      this.$emit('searchinput', e.target.value);
	    },
	    emitChange: function emitChange() {
	      var value = this.multiple ? this.selectedValues : this.selectedValues[0];
	      this.$emit('change', value);
	    }
	  }
	};

	var $2_33 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-select__option",
	      class: _vm.classNames,
	      attrs: {
	        "role": "menuitem",
	        "aria-selected": "isSelected"
	      },
	      on: {
	        "mouseenter": _vm.activate,
	        "mouseleave": _vm.deactivate,
	        "mousedown": function mousedown($event) {
	          $event.preventDefault();
	          return _vm.noop($event);
	        },
	        "click": _vm.onClick
	      }
	    }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2);
	  },
	  staticRenderFns: [],
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
	    classNames: function classNames() {
	      return {
	        'is-hover': this.isActive,
	        'is-selected': this.isSelected,
	        'is-disabled': this.disabled
	      };
	    }
	  },
	  methods: {
	    activate: function activate() {
	      this.$select.$emit('option-activated', this.option);
	    },
	    deactivate: function deactivate() {
	      this.$select.$emit('option-deactivated', this.option);
	    },
	    onClick: function onClick(e) {
	      e.preventDefault();
	      if (this.disabled) return;
	      this.$select.$emit('option-clicked', this.option);
	    }
	  }
	};

	var toPrecision$1 = function (num, precision) {
	  var p = precision | 0;
	  return p > 0 ? parseFloat(num.toFixed(p)) : num
	};

	var VueCtrlComponent$1 = {
	  name: 'v-ctrl',
	  abstract: true,
	  props: {
	    direction: {
	      type: String,
	      default: 'h',
	      validator: function validator (val) {
	        return ['v', 'h', 'vh', 'hv'].indexOf(val) > -1
	      }
	    },
	    throttle: {
	      type: Number,
	      default: 80
	    },
	    precision: {
	      type: Number
	    }
	  },

	  methods: {
	    msdown: function msdown (e) {
	      e.preventDefault();
	      document.addEventListener('mousemove', this.msmove);
	      document.addEventListener('mouseup', this.msup);
	      this.next(e);
	    },
	  
	    msmove: function msmove (e) {
	      e.preventDefault();
	      this.next(e);
	    },
	  
	    msup: function msup (e) {
	      this.next(e);
	      document.removeEventListener('mousemove', this.msmove);
	      document.removeEventListener('mouseup', this.msup);
	    },
	  
	    notify: function notify (val) {
	      if (isEqual_1(this.memo, val) === false) {
	        this.memo = val;
	        this.$emit('change', val);
	      }
	    },

	    next: function next (ref) {
	      if ( ref === void 0 ) ref = {};
	      var clientX = ref.clientX; if ( clientX === void 0 ) clientX = 0;
	      var clientY = ref.clientY; if ( clientY === void 0 ) clientY = 0;

	      var ref$1 = this;
	      var direction = ref$1.direction;
	      var adjust = ref$1.adjust;
	      var rect = this.$el.getBoundingClientRect();

	      var left = rect.left;
	      var width = rect.width;
	      var deltaX = clientX - left;
	      var x = adjust(deltaX / width);

	      if (direction === 'h') {
	        return this.notify(x)
	      }
	  
	      var top = rect.top;
	      var height = rect.height;
	      var deltaY = clientY - top;
	      var y = adjust(deltaY / height);

	      if (direction === 'v') {
	        return this.notify(y)
	      }

	      // both direction
	      this.notify([x, y]);
	    },

	    adjust: function adjust (num) {
	      return toPrecision$1(clamp_1(num, 0, 1), this.precision)
	    }
	  },

	  render: function render (h) {
	    return this.$slots.default[0]
	  },

	  created: function created () {
	    var ref = this;
	    var msdown = ref.msdown;
	    var msmove = ref.msmove;

	    this.msdown = msdown.bind(this);
	    this.msmove = throttle_1(msmove.bind(this), this.throttle);

	    this.memo = null;
	  },

	  mounted: function mounted () {
	    this.$el.addEventListener('mousedown', this.msdown);
	  },

	  destroyed: function destroyed () {
	    this.$el.removeEventListener('mousedown', this.msdown);
	  },

	  install: function install () {
	    Vue.component(VueCtrlComponent$1.name, VueCtrlComponent$1);
	  }
	};

	if (typeof window !== 'undefined' && window.Vue) {
	  Vue.use(VueCtrlComponent$1);
	}

	var index$5 = { VueCtrlComponent: VueCtrlComponent$1 };

	var defaultHoverTimeout = 200;
	var $2_34 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('v-ctrl', {
	      staticClass: "c-slider",
	      attrs: {
	        "direction": _vm.vertical ? 'v' : 'h'
	      },
	      on: {
	        "change": _vm.onRangeChange
	      }
	    }, [_c('div', {
	      staticClass: "c-slider",
	      class: _vm.className,
	      style: _vm.height ? {
	        height: _vm.height
	      } : null,
	      on: {
	        "mousedown": _vm.onMousedown
	      }
	    }, [_c('input', {
	      attrs: {
	        "type": "range",
	        "min": _vm.min,
	        "max": _vm.max,
	        "step": _vm.step,
	        "disabled": _vm.disabled
	      },
	      domProps: {
	        "value": _vm.nominal
	      }
	    }), _c('div', {
	      staticClass: "c-slider__progress",
	      style: _vm.progressPos
	    }), _c('ul', {
	      staticClass: "c-slider__marks"
	    }, _vm._l(_vm.normalizedMarks, function (mark) {
	      return _c('li', {
	        style: "".concat(_vm.vertical ? 'bottom' : 'left', ": ").concat(mark.p)
	      }, [_vm._v(_vm._s(mark.n))]);
	    })), _c('div', {
	      staticClass: "c-slider__stops"
	    }, _vm._l(_vm.normalizedMarks, function (mark) {
	      return _c('span', {
	        style: "".concat(_vm.vertical ? 'bottom' : 'left', ": ").concat(mark.p)
	      });
	    })), _c('div', {
	      staticClass: "c-slider__thumb",
	      class: {
	        'c-slider__thumb--hover': !_vm.isDrag && _vm.isHover,
	        'c-slider__thumb--dragging': _vm.isDrag
	      },
	      style: _vm.thumbPos,
	      on: {
	        "mouseenter": _vm.onThumbHover,
	        "mouseleave": _vm.onThumbHoverout
	      }
	    }, [_c('div', {
	      staticClass: "c-slider__tip",
	      attrs: {
	        "role": "tooltip",
	        "aria-hidden": "true"
	      }
	    }, [_vm._v(_vm._s(_vm.formmater(this.nominal, 'tip')))])])])]);
	  },
	  staticRenderFns: [],
	  name: 'c-slider',
	  components: {
	    'v-ctrl': index$5.VueCtrlComponent
	  },
	  model: {
	    event: 'change'
	  },
	  mixins: [resettable],
	  props: {
	    min: VueTypes.number.def(0),
	    max: VueTypes.number.def(100),
	    step: VueTypes.number.def(1),
	    value: VueTypes.oneOfType([Number, String]).def(0),
	    marks: VueTypes.array,
	    formmater: VueTypes.func.def(function (id) {
	      return id;
	    }),
	    vertical: VueTypes.bool.def(false),
	    disabled: VueTypes.bool.def(false),
	    height: VueTypes.string
	  },
	  data: function data() {
	    return {
	      normorlizedValue: 0,
	      isHover: false,
	      isDrag: false
	    };
	  },
	  computed: {
	    className: function className() {
	      var vertical = this.vertical,
	          disabled = this.disabled;
	      return ["c-slider--".concat(vertical ? 'vertical' : 'horizontal'), disabled ? 'c-slider--disabled' : ''];
	    },
	    precision: function precision() {
	      var _$split = "".concat(this.step).split('.'),
	          _$split2 = _slicedToArray(_$split, 2),
	          fraction = _$split2[1];

	      return fraction ? fraction.length : 0;
	    },

	    /**
	       * nominal value being denormalized
	       */
	    nominal: function nominal() {
	      return this.denormalize(this.normorlizedValue);
	    },
	    percentage: function percentage() {
	      var nominal = this.nominal;
	      var proportion = this.normalize(nominal); // eslint-disable-next-line

	      return "".concat(proportion * 100, "%");
	    },
	    thumbPos: function thumbPos() {
	      var vertical = this.vertical,
	          percentage = this.percentage;
	      var key = vertical ? 'bottom' : 'left';
	      var style = {};
	      style[key] = percentage;
	      return style;
	    },
	    progressPos: function progressPos() {
	      var vertical = this.vertical,
	          percentage = this.percentage;
	      var key = vertical ? 'height' : 'width';
	      var style = {};
	      style[key] = percentage;
	      return style;
	    },
	    normalizedMarks: function normalizedMarks() {
	      var _this = this;

	      var marks = this.marks,
	          min = this.min,
	          max = this.max,
	          formmater = this.formmater;
	      var arr = marks || [min, max];
	      return arr.map(function (mk) {
	        var mark = clamp_1(mk, min, max);
	        return {
	          // eslint-disable-next-line
	          p: "".concat(_this.normalize(mark) * 100, "%"),
	          n: formmater ? formmater(mark, 'scale') : mark
	        };
	      });
	    }
	  },
	  methods: {
	    normalize: function normalize(val) {
	      var min = this.min,
	          max = this.max;
	      var decimal = (val - min) / (max - min);
	      return clamp_1(decimal, 0, 1);
	    },
	    denormalize: function denormalize(val) {
	      var min = this.min,
	          max = this.max,
	          step = this.step,
	          precision = this.precision;
	      var range = max - min;
	      var nominal = min + Math.round(range * val / step) * step;
	      return parseFloat(nominal.toFixed(precision));
	    },
	    onRangeChange: function onRangeChange(e) {
	      if (!this.disabled) {
	        this.normorlizedValue = this.vertical ? 1 - e : e;
	      }
	    },
	    onThumbHover: function onThumbHover() {
	      var _this2 = this;

	      if (this.isDrag) {
	        return;
	      }

	      this._hTid = setTimeout(function () {
	        _this2.isHover = true;
	      }, defaultHoverTimeout);
	    },
	    onThumbHoverout: function onThumbHoverout() {
	      clearTimeout(this._hTid);
	      this.isHover = false;
	    },
	    onMousedown: function onMousedown() {
	      this.isDrag = true;
	      document.addEventListener('mouseup', this.onMouseup);
	    },
	    onMouseup: function onMouseup() {
	      this.isDrag = false;
	      document.removeEventListener('mouseup', this.onMouseup);
	    }
	  },
	  created: function created() {
	    this.normorlizedValue = this.normalize(this.value);
	    this.$emit('change', this.nominal);
	    this.onMouseup = this.onMouseup.bind(this);
	  },
	  watch: {
	    value: {
	      handler: function handler(newVal) {
	        var max = this.max,
	            min = this.min;
	        var val = Number(newVal);

	        if (val !== clamp_1(val, min, max)) {
	          throw new Error("The value ".concat(val, " exceeded range") + " [".concat(min, ", ").concat(max, "]."));
	        }

	        this.normorlizedValue = this.normalize(val);
	      },
	      immediate: true
	    },
	    nominal: function nominal(val) {
	      this.$emit('change', this.nominal);
	    }
	  }
	};

	var $2_35 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-steps-container",
	      class: _vm.className,
	      attrs: {
	        "active": _vm.active
	      }
	    }, [_vm._t("default")], 2);
	  },
	  staticRenderFns: [],
	  name: 'c-steps',
	  props: {
	    direction: VueTypes.oneOf(['vertical', 'horizontal']).def('horizontal'),
	    active: VueTypes.number.def(1)
	  },
	  data: function data() {
	    return {
	      steps: []
	    };
	  },
	  computed: {
	    className: function className() {
	      return this.direction === 'vertical' ? 'c-steps-vertical' : 'c-steps-horizontal';
	    }
	  },
	  methods: {},
	  watch: {
	    steps: function steps(_steps) {
	      _steps.forEach(function (child, index) {
	        child.index = index;
	      });
	    }
	  }
	};

	var $2_36 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-step",
	      class: _vm.className
	    }, [_c('div', {
	      staticClass: "c-step-header"
	    }, [_vm.icon ? _c('div', {
	      staticClass: "c-step-icon"
	    }, [_c('c-icon', {
	      attrs: {
	        "type": "feather",
	        "name": _vm.icon
	      }
	    })], 1) : _c('div', {
	      staticClass: "c-step-icon"
	    }, [_vm._v(_vm._s(_vm.index + 1))])]), _c('div', {
	      staticClass: "c-step-content"
	    }, [_c('div', {
	      staticClass: "c-title"
	    }, [_vm._t("default", [_vm._v(_vm._s(_vm.title))])], 2), _vm.description ? _c('div', {
	      staticClass: "c-step-description"
	    }, [_vm._t("default", [_vm._v(_vm._s(_vm.description))])], 2) : _vm._e()])]);
	  },
	  staticRenderFns: [],
	  name: 'c-step',
	  props: {
	    title: VueTypes.string,
	    description: VueTypes.string,
	    icon: VueTypes.string,
	    iconPos: VueTypes.oneOf(['left', 'top']).def('top'),
	    status: VueTypes.oneOf(['loading', 'success', 'warning', 'error', 'default']).def('default')
	  },
	  data: function data() {
	    return {
	      index: -1
	    };
	  },
	  created: function created() {
	    this.index = this.$parent.steps.indexOf(this);
	  },
	  beforeCreate: function beforeCreate() {
	    this.$parent.steps.push(this);
	  },
	  computed: {
	    className: function className() {
	      var classStr = "".concat(this.iconPos);

	      if (this.index === this.$parent.active - 1) {
	        classStr += " active";
	      }

	      if (this.status) {
	        classStr += " ".concat(this.status);
	      }

	      return classStr;
	    }
	  },
	  methods: {}
	};

	var name$3 = 'c-switch';
	var $2_37 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-switch",
	      class: _vm.className,
	      attrs: {
	        "activeColor": _vm.activeColor,
	        "inActiveColor": _vm.inActiveColor
	      }
	    }, [_c('input', {
	      staticClass: "c-switch__checkbox",
	      attrs: {
	        "type": "checkbox",
	        "disabled": _vm.disabled,
	        "name": _vm.name
	      },
	      domProps: {
	        "checked": _vm.checked,
	        "value": _vm.value
	      }
	    }), _c('div', {
	      staticClass: "c-switch__layoutbox",
	      style: _vm.styleObj,
	      on: {
	        "click": function click($event) {
	          $event.stopPropagation();
	          return _vm.toggle($event);
	        }
	      }
	    })]);
	  },
	  staticRenderFns: [],
	  name: name$3,
	  props: {
	    disabled: VueTypes.bool.def(false),
	    checkedColor: VueTypes.string,
	    uncheckedColor: VueTypes.string,
	    checkedValue: VueTypes.any.def(true),
	    uncheckedValue: VueTypes.any.def(false),
	    size: VueTypes.string
	  },
	  data: function data() {
	    return {
	      name: 'c-switch',
	      checked: true,
	      value: null
	    };
	  },
	  created: function created() {
	    this.value = this.checkedValue;
	  },
	  computed: {
	    styleObj: function styleObj() {
	      var obj = {};

	      if (this.checkedColor && this.checked) {
	        obj.backgroundColor = this.checkedColor;
	        obj.borderColor = this.checkedColor;
	      }

	      if (this.uncheckedColor && !this.checked) {
	        obj.backgroundColor = this.uncheckedColor;
	        obj.borderColor = this.uncheckedColor;
	      }

	      return obj;
	    },
	    className: function className() {
	      if (this.size) {
	        return " c-switch--".concat(this.size);
	      }
	    }
	  },
	  methods: {
	    toggle: function toggle() {
	      if (this.disabled) return;
	      this.checked = !this.checked;
	      this.value = this.value === this.checkedValue ? this.uncheckedValue : this.checkedValue;
	      this.$emit('change', this.value);
	    }
	  }
	};

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	var _arrayEach = arrayEach;

	var defineProperty = (function() {
	  try {
	    var func = _getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	var _defineProperty$1 = defineProperty;

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && _defineProperty$1) {
	    _defineProperty$1(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	var _baseAssignValue = baseAssignValue;

	/** Used for built-in method references. */
	var objectProto$13 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$12 = objectProto$13.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty$12.call(object, key) && eq_1(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    _baseAssignValue(object, key, value);
	  }
	}

	var _assignValue = assignValue;

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      _baseAssignValue(object, key, newValue);
	    } else {
	      _assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	var _copyObject = copyObject;

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && _copyObject(source, keys_1(source), object);
	}

	var _baseAssign = baseAssign;

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _nativeKeysIn = nativeKeysIn;

	/** Used for built-in method references. */
	var objectProto$14 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$13 = objectProto$14.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject_1(object)) {
	    return _nativeKeysIn(object);
	  }
	  var isProto = _isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty$13.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _baseKeysIn = baseKeysIn;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn$1(object) {
	  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
	}

	var keysIn_1 = keysIn$1;

	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn(object, source) {
	  return object && _copyObject(source, keysIn_1(source), object);
	}

	var _baseAssignIn = baseAssignIn;

	var _cloneBuffer = createCommonjsModule(function (module, exports) {
	/** Detect free variable `exports`. */
	var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? _root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;
	});

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	var _copyArray = copyArray;

	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return _copyObject(source, _getSymbols(source), object);
	}

	var _copySymbols = copySymbols;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
	  var result = [];
	  while (object) {
	    _arrayPush(result, _getSymbols(object));
	    object = _getPrototype(object);
	  }
	  return result;
	};

	var _getSymbolsIn = getSymbolsIn;

	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn(source, object) {
	  return _copyObject(source, _getSymbolsIn(source), object);
	}

	var _copySymbolsIn = copySymbolsIn;

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
	}

	var _getAllKeysIn = getAllKeysIn;

	/** Used for built-in method references. */
	var objectProto$15 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$14 = objectProto$15.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = new array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty$14.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	var _initCloneArray = initCloneArray;

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
	  return result;
	}

	var _cloneArrayBuffer = cloneArrayBuffer;

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	var _cloneDataView = cloneDataView;

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	var _cloneRegExp = cloneRegExp;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
	}

	var _cloneSymbol = cloneSymbol;

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	var _cloneTypedArray = cloneTypedArray;

	/** `Object#toString` result references. */
	var boolTag$2 = '[object Boolean]',
	    dateTag$2 = '[object Date]',
	    mapTag$3 = '[object Map]',
	    numberTag$2 = '[object Number]',
	    regexpTag$2 = '[object RegExp]',
	    setTag$3 = '[object Set]',
	    stringTag$2 = '[object String]',
	    symbolTag$2 = '[object Symbol]';

	var arrayBufferTag$2 = '[object ArrayBuffer]',
	    dataViewTag$3 = '[object DataView]',
	    float32Tag$1 = '[object Float32Array]',
	    float64Tag$1 = '[object Float64Array]',
	    int8Tag$1 = '[object Int8Array]',
	    int16Tag$1 = '[object Int16Array]',
	    int32Tag$1 = '[object Int32Array]',
	    uint8Tag$1 = '[object Uint8Array]',
	    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
	    uint16Tag$1 = '[object Uint16Array]',
	    uint32Tag$1 = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag$2:
	      return _cloneArrayBuffer(object);

	    case boolTag$2:
	    case dateTag$2:
	      return new Ctor(+object);

	    case dataViewTag$3:
	      return _cloneDataView(object, isDeep);

	    case float32Tag$1: case float64Tag$1:
	    case int8Tag$1: case int16Tag$1: case int32Tag$1:
	    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
	      return _cloneTypedArray(object, isDeep);

	    case mapTag$3:
	      return new Ctor;

	    case numberTag$2:
	    case stringTag$2:
	      return new Ctor(object);

	    case regexpTag$2:
	      return _cloneRegExp(object);

	    case setTag$3:
	      return new Ctor;

	    case symbolTag$2:
	      return _cloneSymbol(object);
	  }
	}

	var _initCloneByTag = initCloneByTag;

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject_1(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	var _baseCreate = baseCreate;

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !_isPrototype(object))
	    ? _baseCreate(_getPrototype(object))
	    : {};
	}

	var _initCloneObject = initCloneObject;

	/** `Object#toString` result references. */
	var mapTag$4 = '[object Map]';

	/**
	 * The base implementation of `_.isMap` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 */
	function baseIsMap(value) {
	  return isObjectLike_1(value) && _getTag(value) == mapTag$4;
	}

	var _baseIsMap = baseIsMap;

	/* Node.js helper references. */
	var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

	/**
	 * Checks if `value` is classified as a `Map` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 * @example
	 *
	 * _.isMap(new Map);
	 * // => true
	 *
	 * _.isMap(new WeakMap);
	 * // => false
	 */
	var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

	var isMap_1 = isMap;

	/** `Object#toString` result references. */
	var setTag$4 = '[object Set]';

	/**
	 * The base implementation of `_.isSet` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 */
	function baseIsSet(value) {
	  return isObjectLike_1(value) && _getTag(value) == setTag$4;
	}

	var _baseIsSet = baseIsSet;

	/* Node.js helper references. */
	var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

	/**
	 * Checks if `value` is classified as a `Set` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 * @example
	 *
	 * _.isSet(new Set);
	 * // => true
	 *
	 * _.isSet(new WeakSet);
	 * // => false
	 */
	var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

	var isSet_1 = isSet;

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;

	/** `Object#toString` result references. */
	var argsTag$3 = '[object Arguments]',
	    arrayTag$2 = '[object Array]',
	    boolTag$3 = '[object Boolean]',
	    dateTag$3 = '[object Date]',
	    errorTag$2 = '[object Error]',
	    funcTag$2 = '[object Function]',
	    genTag$1 = '[object GeneratorFunction]',
	    mapTag$5 = '[object Map]',
	    numberTag$3 = '[object Number]',
	    objectTag$4 = '[object Object]',
	    regexpTag$3 = '[object RegExp]',
	    setTag$5 = '[object Set]',
	    stringTag$3 = '[object String]',
	    symbolTag$3 = '[object Symbol]',
	    weakMapTag$2 = '[object WeakMap]';

	var arrayBufferTag$3 = '[object ArrayBuffer]',
	    dataViewTag$4 = '[object DataView]',
	    float32Tag$2 = '[object Float32Array]',
	    float64Tag$2 = '[object Float64Array]',
	    int8Tag$2 = '[object Int8Array]',
	    int16Tag$2 = '[object Int16Array]',
	    int32Tag$2 = '[object Int32Array]',
	    uint8Tag$2 = '[object Uint8Array]',
	    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
	    uint16Tag$2 = '[object Uint16Array]',
	    uint32Tag$2 = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag$3] = cloneableTags[arrayTag$2] =
	cloneableTags[arrayBufferTag$3] = cloneableTags[dataViewTag$4] =
	cloneableTags[boolTag$3] = cloneableTags[dateTag$3] =
	cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] =
	cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] =
	cloneableTags[int32Tag$2] = cloneableTags[mapTag$5] =
	cloneableTags[numberTag$3] = cloneableTags[objectTag$4] =
	cloneableTags[regexpTag$3] = cloneableTags[setTag$5] =
	cloneableTags[stringTag$3] = cloneableTags[symbolTag$3] =
	cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] =
	cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
	cloneableTags[errorTag$2] = cloneableTags[funcTag$2] =
	cloneableTags[weakMapTag$2] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG,
	      isFlat = bitmask & CLONE_FLAT_FLAG,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG;

	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject_1(value)) {
	    return value;
	  }
	  var isArr = isArray_1(value);
	  if (isArr) {
	    result = _initCloneArray(value);
	    if (!isDeep) {
	      return _copyArray(value, result);
	    }
	  } else {
	    var tag = _getTag(value),
	        isFunc = tag == funcTag$2 || tag == genTag$1;

	    if (isBuffer_1(value)) {
	      return _cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag$4 || tag == argsTag$3 || (isFunc && !object)) {
	      result = (isFlat || isFunc) ? {} : _initCloneObject(value);
	      if (!isDeep) {
	        return isFlat
	          ? _copySymbolsIn(value, _baseAssignIn(result, value))
	          : _copySymbols(value, _baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = _initCloneByTag(value, tag, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new _Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (isSet_1(value)) {
	    value.forEach(function(subValue) {
	      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
	    });

	    return result;
	  }

	  if (isMap_1(value)) {
	    value.forEach(function(subValue, key) {
	      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
	    });

	    return result;
	  }

	  var keysFunc = isFull
	    ? (isFlat ? _getAllKeysIn : _getAllKeys)
	    : (isFlat ? keysIn : keys_1);

	  var props = isArr ? undefined : keysFunc(value);
	  _arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	var _baseClone = baseClone;

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG$1 = 1,
	    CLONE_SYMBOLS_FLAG$1 = 4;

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return _baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1);
	}

	var cloneDeep_1 = cloneDeep;

	var $2_38 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('table', [!_vm.onlybody ? _c('thead', _vm._l(_vm.columnsRows, function (column) {
	      return _c('tr', _vm._l(column.columns, function (item) {
	        return _c('th', {
	          class: _vm.getColumnClassName(item),
	          style: _vm.getTHCellStyle(item),
	          attrs: {
	            "colspan": item.colspan,
	            "rowspan": item.rowspan
	          }
	        }, [item.type === 'selection' ? _c('span', {
	          staticClass: "c-table__check"
	        }, [_c('c-checkbox', {
	          attrs: {
	            "indeterminate": _vm.checkIndeterminate
	          },
	          on: {
	            "change": _vm.onSelectAllChange
	          },
	          model: {
	            value: _vm.allSelect,
	            callback: function callback($$v) {
	              _vm.allSelect = $$v;
	            },
	            expression: "allSelect"
	          }
	        })], 1) : _vm._e(), _vm._t(item.key + '-base-th', [_c('span', [_vm._v(_vm._s(item.title))])]), item.sorter ? _c('span', {
	          staticClass: "c-table__sort"
	        }, [_c('div', {
	          staticClass: "c-sort-asc",
	          class: {
	            'sorted': _vm.checkSorted(item.key, 'asc')
	          },
	          on: {
	            "click": function click($event) {
	              _vm.onSorted(item.key, 'asc');
	            }
	          }
	        }, [_c('i', {
	          staticClass: "sort-asc"
	        })]), _c('div', {
	          staticClass: "c-sort-desc",
	          class: {
	            'sorted': _vm.checkSorted(item.key, 'desc')
	          },
	          on: {
	            "click": function click($event) {
	              _vm.onSorted(item.key, 'desc');
	            }
	          }
	        }, [_c('i', {
	          staticClass: "sort-desc"
	        })])]) : _vm._e()], 2);
	      }));
	    })) : _vm._e(), !_vm.onlyhead ? _c('tbody', [_vm.dataList.length == 0 ? _c('tr', [_c('td', {
	      staticClass: "c-table__noresult",
	      attrs: {
	        "colspan": _vm.columns.length
	      }
	    }, [_vm._v(_vm._s(_vm.noresultMsg))])]) : _vm._l(_vm.dataList, function (dataItem, index) {
	      return _c('tr', {
	        class: _vm.getRowClassName(_vm.item, index),
	        on: {
	          "mouseenter": function mouseenter($event) {
	            _vm.setCurrentItem(dataItem, index);
	          },
	          "mouseleave": _vm.resetCurrentItem
	        }
	      }, _vm._l(_vm.allColumns, function (columnsItem) {
	        return _c('td', {
	          class: _vm.getColumnClassName(columnsItem),
	          style: _vm.getCellStyle(columnsItem)
	        }, [_vm._t(columnsItem.key + '-base-td', [columnsItem.type === 'selection' ? _c('span', {
	          staticClass: "c-table__check"
	        }, [_c('c-checkbox', {
	          attrs: {
	            "disabled": dataItem._disabled
	          },
	          on: {
	            "change": _vm.onSelectChange
	          },
	          model: {
	            value: !dataItem._disabled && dataItem._checked,
	            callback: function callback($$v) {
	              _vm.$set(!dataItem._disabled && dataItem, "_checked", $$v);
	            },
	            expression: "!dataItem._disabled && dataItem._checked"
	          }
	        })], 1) : _vm._e(), columnsItem.render ? _c('div', {
	          domProps: {
	            "innerHTML": _vm._s(columnsItem.render(index, dataItem[columnsItem.key], dataItem))
	          }
	        }) : _c('span', [_vm._v(_vm._s(dataItem[columnsItem.key]))])], {
	          item: dataItem
	        })], 2);
	      }));
	    })], 2) : _vm._e()]);
	  },
	  staticRenderFns: [],
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
	    onlyhead: [String, Boolean],
	    noresultMsg: String
	  },
	  data: function data() {
	    return {
	      currentItem: {},
	      columnsRows: [],
	      allSelect: false,
	      checkIndeterminate: false
	    };
	  },
	  computed: {
	    dataList: function dataList() {
	      return this.datasource;
	    },
	    allColumns: function allColumns() {
	      var columns = cloneDeep_1(this.columns);
	      return this.getAllColumns(columns);
	    }
	  },
	  created: function created() {
	    this.allSelect = this.allChecked;
	    this.checkIndeterminate = this.indeterminate;
	  },
	  mounted: function mounted() {
	    this.getTHWidth(this.columns);
	    var maxlevel = this.findMaxLevel(this.columns);
	    this.columnsRows = this.getLevelColumns(this.columns, maxlevel);
	  },
	  watch: {
	    allChecked: function allChecked(newVal) {
	      if (this.allSelect === newVal) return;
	      this.allSelect = newVal;
	    },
	    indeterminate: function indeterminate(newVal) {
	      this.checkIndeterminate = newVal;
	    },
	    hoverRowIndex: function hoverRowIndex() {
	      this.$forceUpdate();
	    },
	    columns: function columns() {
	      this.getTHWidth(this.columns);
	      var maxlevel = this.findMaxLevel(this.columns);
	      this.columnsRows = this.getLevelColumns(this.columns, maxlevel);
	    }
	  },
	  methods: {
	    getRowClassName: function getRowClassName(row, rowIndex) {
	      var classes = [];
	      var rowClassName = this.rowClassName;

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

	      return classes.join(' ');
	    },
	    getColumnClassName: function getColumnClassName(item) {
	      return item.hasOwnProperty('className') ? item.className : '';
	    },
	    setCurrentItem: function setCurrentItem(item, index) {
	      this.currentItem = item;
	      this.$emit('rowEnter', index);
	    },
	    resetCurrentItem: function resetCurrentItem() {
	      this.currentItem = {};
	      this.$emit('rowLeave');
	    },
	    onSelectAllChange: function onSelectAllChange(status) {
	      this.$emit('selectAllChange', status);
	    },
	    onSelectChange: function onSelectChange(status) {
	      this.$emit('selectChange', this.currentItem, status);
	    },
	    checkSorted: function checkSorted(key, order) {
	      return key === this.sortkey && order === this.sortorder;
	    },
	    onSorted: function onSorted(key, order) {
	      this.$emit('sort', {
	        key: key,
	        order: order
	      });
	    },
	    getCellStyle: function getCellStyle(item) {
	      var width = typeof item.width === 'number' ? "".concat(item.width, "px") : item.width;
	      return {
	        width: item.width ? width : 'auto',
	        textAlign: item.align ? item.align : 'left'
	      };
	    },
	    getTHCellStyle: function getTHCellStyle(item) {
	      var cellStyle = this.getCellStyle(item);
	      var thHeight = 40;
	      cellStyle.height = item.rowspan ? "".concat(item.rowspan * thHeight, "px") : "".concat(thHeight, "px");
	      return cellStyle;
	    },
	    getAllColumnsRows: function getAllColumnsRows(list) {
	      var _this = this;

	      var columns = [];
	      list.forEach(function (item) {
	        columns.push(item);

	        if (item.children && item.children.length > 0) {
	          columns.push.apply(columns, _toConsumableArray(_this.getAllColumnsRows(item.children)));
	        }
	      });
	      return columns;
	    },
	    getLevelColumns: function getLevelColumns(list, maxlevel) {
	      var allColumns = this.getAllColumnsRows(list);
	      var columns = [];

	      var _loop = function _loop(i) {
	        columns.push({
	          level: i,
	          columns: allColumns.filter(function (item) {
	            return item.level === i;
	          })
	        });
	      };

	      for (var i = 1; i <= maxlevel; i++) {
	        _loop(i);
	      }

	      return columns;
	    },
	    findMaxLevel: function findMaxLevel(list) {
	      var _this2 = this;

	      var maxlevel = 0;
	      list.forEach(function (item) {
	        if (item.children) {
	          maxlevel = Math.max(_this2.findMaxLevel(item.children), maxlevel);
	        } else {
	          maxlevel = Math.max(item.level, maxlevel);
	        }
	      });
	      return maxlevel;
	    },
	    getTHWidth: function getTHWidth(list) {
	      var _this3 = this;

	      var width = 0;
	      list.forEach(function (item) {
	        if (item.children) {
	          item.width = _this3.getTHWidth(item.children);
	        }

	        width += item.width ? item.width : 0;
	      });
	      return width || '';
	    },
	    getAllColumns: function getAllColumns(list) {
	      var _this4 = this;

	      var columns = [];
	      list.forEach(function (item, index) {
	        var classname = [];
	        index === 0 && classname.push('c-table__bl');
	        index === list.length - 1 && classname.push('c-table__br');
	        classname = classname.join(' ');
	        item.className = item.hasOwnProperty('className') ? "".concat(item.className, " ").concat(classname) : classname;

	        if (item.children && item.children.length > 0) {
	          columns.push.apply(columns, _toConsumableArray(_this4.getAllColumns(item.children)));
	        } else {
	          columns.push(item);
	        }
	      });
	      return columns;
	    }
	  }
	};

	var $2_39 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      class: _vm.className
	    }, [_vm.hasFixed ? _c('div', {
	      staticClass: "c-table",
	      class: _vm.withBorderClass
	    }, [_vm.height ? [_c('div', {
	      staticClass: "c-table__wrapper"
	    }, [_c('div', {
	      staticClass: "c-table__headwrapper"
	    }, [_c('div', {
	      staticClass: "c-scroll__thead",
	      on: {
	        "scroll": _vm.theadScroll
	      }
	    }, [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.columns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "onlybody": false,
	        "onlyhead": true,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.columns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.columns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })], 1)]), _c('div', {
	      staticClass: "c-table__bodywrapper"
	    }, [_c('div', {
	      ref: _vm.scrollbody,
	      staticClass: "c-scroll__tbody",
	      on: {
	        "mouseenter": _vm.setCurrentScrollBox,
	        "mouseleave": _vm.removeCurrentScrollBox
	      }
	    }, [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.columns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "onlybody": true,
	        "onlyhead": false,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.columns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.columns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })], 1)]), _c('div', {
	      staticClass: "c-fixtable__left",
	      class: {
	        'c-fixed__leftscroll': _vm.isScrollMove
	      },
	      on: {
	        "mouseenter": _vm.setCurrentScrollBox,
	        "mouseleave": _vm.removeCurrentScrollBox
	      }
	    }, [_vm.datasource.length > 0 ? [_c('div', {
	      staticClass: "c-scroll__thead"
	    }, [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.fixedLeftColumns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "onlybody": false,
	        "onlyhead": true,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.fixedLeftColumns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.fixedLeftColumns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })], 1), !undefined ? _c('div', {
	      ref: "fixedleft",
	      staticClass: "c-table__body",
	      on: {
	        "scroll": _vm.onYscroll
	      }
	    }, [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.fixedLeftColumns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "onlybody": true,
	        "onlyhead": false,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.fixedLeftColumns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.fixedLeftColumns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })], 1) : _vm._e()] : [_c('div', {
	      staticClass: "c-scroll__thead"
	    }, [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.fixedLeftColumns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "onlybody": false,
	        "onlyhead": true,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.fixedLeftColumns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.fixedLeftColumns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })], 1), _vm._e()]], 2), _c('div', {
	      staticClass: "c-fixtable__right",
	      class: {
	        'c-fixed__rightscroll': _vm.isScrollMove
	      },
	      on: {
	        "mouseenter": _vm.setCurrentScrollBox,
	        "mouseleave": _vm.removeCurrentScrollBox
	      }
	    }, [_vm.datasource.length > 0 ? [_c('div', {
	      staticClass: "c-scroll__thead"
	    }, [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.fixedRightColumns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "onlybody": false,
	        "onlyhead": true,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.fixedRightColumns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.fixedRightColumns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })], 1), !undefined ? _c('div', {
	      ref: "fixedright",
	      staticClass: "c-table__body",
	      on: {
	        "scroll": _vm.onYscroll
	      }
	    }, [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.fixedRightColumns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "onlybody": true,
	        "onlyhead": false,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.fixedRightColumns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.fixedRightColumns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })], 1) : _vm._e()] : [_c('div', {
	      staticClass: "c-scroll__thead"
	    }, [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.fixedRightColumns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "onlybody": false,
	        "onlyhead": true,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.fixedRightColumns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.fixedRightColumns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })], 1), _vm._e()]], 2)])] : [_vm.fixedLeftColumns.length > 0 ? _c('div', {
	      staticClass: "c-fixtable__left",
	      class: {
	        'c-fixed__leftscroll': _vm.isScrollMove
	      }
	    }, [_vm.datasource.length > 0 ? [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.fixedLeftColumns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.fixedLeftColumns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.fixedLeftColumns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })] : [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.fixedLeftColumns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "onlyhead": true,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.fixedLeftColumns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.fixedLeftColumns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })]], 2) : _vm._e(), _c('div', {
	      staticClass: "c-scrolltable",
	      on: {
	        "scroll": _vm.onScroll
	      }
	    }, [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.columns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.columns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.columns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })], 1), _vm.fixedRightColumns.length > 0 ? _c('div', {
	      staticClass: "c-fixtable__right",
	      class: {
	        'c-fixed__rightscroll': _vm.isScrollMove
	      }
	    }, [_vm.datasource.length > 0 ? [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.fixedRightColumns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.fixedRightColumns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.fixedRightColumns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })] : [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.fixedRightColumns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "onlyhead": true,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.fixedRightColumns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.fixedRightColumns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })]], 2) : _vm._e()]], 2) : _c('div', {
	      staticClass: "c-table",
	      class: _vm.withBorderClass
	    }, [_vm.height ? [_c('div', {
	      staticClass: "c-scroll__thead"
	    }, [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.columns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "onlybody": false,
	        "onlyhead": true,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.columns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.columns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })], 1), !undefined ? _c('div', {
	      ref: "scrollBody",
	      staticClass: "c-table__body",
	      on: {
	        "scroll": _vm.onScroll
	      }
	    }, [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.columns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "onlybody": true,
	        "onlyhead": false,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.columns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.columns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })], 1) : _vm._e()] : [_c('c-basetable', {
	      attrs: {
	        "columns": _vm.columns,
	        "datasource": _vm.dataList,
	        "height": _vm.height,
	        "sortkey": _vm.sortkey,
	        "sortorder": _vm.sortorder,
	        "rowClassName": _vm.rowClassName,
	        "hoverRowIndex": _vm.hoverRowIndex,
	        "allChecked": _vm.allChecked,
	        "indeterminate": _vm.indeterminate,
	        "noresultMsg": _vm.noresultMsg
	      },
	      on: {
	        "sort": _vm.sorter,
	        "selectChange": _vm.onSelectChange,
	        "selectAllChange": _vm.onSelectAllChange,
	        "rowEnter": _vm.rowEnter,
	        "rowLeave": _vm.rowLeave
	      },
	      scopedSlots: _vm._u([_vm._l(_vm.columns, function (item) {
	        return {
	          key: item.key + '-base-th',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-th'] ? [_vm._t(item.key + '-th', null, {
	              item: props
	            })] : undefined;
	          }
	        };
	      }), _vm._l(_vm.columns, function (item) {
	        return {
	          key: item.key + '-base-td',
	          fn: function fn(props) {
	            return _vm.$scopedSlots[item.key + '-td'] ? [_vm._t(item.key + '-td', null, {
	              item: props.item
	            })] : undefined;
	          }
	        };
	      })])
	    })]], 2)]);
	  },
	  staticRenderFns: [],
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
	    rowClassName: [String, Function],
	    noresultMsg: {
	      type: String,
	      default: '暂无数据'
	    }
	  },
	  data: function data() {
	    return {
	      dataList: [],
	      selection: [],
	      fixedLeftColumns: [],
	      fixedRightColumns: [],
	      hoverRowIndex: '',
	      maxLevel: 1,
	      scrollBarSize: 5,
	      scrollBox: '',
	      allChecked: false,
	      indeterminate: false,
	      isScrollMove: false,
	      composeColumns: []
	    };
	  },
	  computed: {
	    withBorderClass: function withBorderClass() {
	      if (!this.border || this.border === 'none') {
	        return '';
	      }

	      var classes = this.border.split(' ');
	      classes = classes.map(function (item) {
	        return "c-table__".concat(item);
	      });
	      return classes.join(' ');
	    },
	    className: function className() {
	      return this.size ? "c-table__".concat(this.size) : '';
	    },
	    hasFixed: function hasFixed() {
	      return Boolean(this.columns.find(function (item) {
	        return Boolean(item.fixed);
	      }));
	    }
	  },
	  created: function created() {
	    this.composeData();
	    this.getColumnsDetail();
	  },
	  watch: {
	    datasource: {
	      handler: function handler(newVal, oldVal) {
	        var _this = this;

	        if (newVal === oldVal) return;
	        this.composeData();
	        this.getColumnsDetail();
	        this.$nextTick(function (_) {
	          _this.height && _this.getTbodyStyle();
	        });
	      },
	      deep: true
	    },
	    sortkey: function sortkey() {
	      this.composeData();
	    },
	    sortorder: function sortorder() {
	      this.composeData();
	    },
	    columns: function columns() {
	      var _this2 = this;

	      this.getColumnsDetail();
	      this.$nextTick(function (_) {
	        _this2.height && _this2.getTbodyStyle();

	        if (_this2.hasFixed) {
	          var scrollEl = _this2.$el.querySelector('.c-scroll__tbody');

	          scrollEl && scrollEl.addEventListener('scroll', _this2.onScroll, false);
	        }
	      });
	    },
	    allSelected: function allSelected(status) {
	      this.updateSelectAll(status);
	    }
	  },
	  mounted: function mounted() {
	    this.getCurrentScrollBarSize();
	    this.height && this.getTbodyStyle();

	    if (this.hasFixed) {
	      var scrollEl = this.$el.querySelector('.c-scroll__tbody');
	      scrollEl && scrollEl.addEventListener('scroll', this.onScroll, false);
	    }
	  },
	  methods: {
	    updateSelectAll: function updateSelectAll(status) {
	      var _this3 = this;

	      this.allChecked = status;
	      this.dataList = this.dataList.map(function (item) {
	        _this3.$set(item, '_checked', status);

	        return item;
	      });

	      if (status) {
	        this.selection = this.dataList.filter(function (item) {
	          return item._checked && !item._disabled;
	        });
	      } else {
	        this.selection = [];
	      }
	    },
	    onSelectAllChange: function onSelectAllChange(status) {
	      var _this4 = this;

	      this.updateSelectAll(status);
	      this.indeterminate = this.selection.length > 0 && this.selection.length < this.dataList.length;
	      this.$nextTick(function () {
	        _this4.$emit('selectChange', _this4.selection);
	      });
	    },
	    onSelectChange: function onSelectChange(currentItem, status) {
	      var _this5 = this;

	      if (status) {
	        this.selection.push(currentItem);
	      }

	      this.selection = this.selection.filter(function (item) {
	        return item._checked && !item._disabled;
	      });
	      this.$nextTick(function () {
	        _this5.allChecked = _this5.selection.length === _this5.dataList.length;
	        _this5.indeterminate = _this5.selection.length > 0 && _this5.selection.length < _this5.dataList.length;

	        _this5.$emit('selectChange', _this5.selection);
	      });
	    },
	    composeData: function composeData() {
	      var _this6 = this;

	      this.allChecked = this.allSelected;
	      var list = [];
	      var selectedList = [];
	      this.datasource && this.datasource.map(function (item, index) {
	        item._checked = item.hasOwnProperty('_checked') && item._checked || _this6.allChecked;
	        item._disabled = item.hasOwnProperty('_disabled') && item._disabled || _this6.allChecked;
	        item._checked && selectedList.push(item);
	        list.push(item);
	      });
	      this.dataList = list;
	      this.selection = selectedList;
	      this.allChecked = this.dataList.length !== 0 && this.selection.length === this.dataList.length;
	      this.indeterminate = this.selection.length > 0 && this.selection.length < this.dataList.length;
	    },
	    setCurrentScrollBox: function setCurrentScrollBox(e) {
	      this.scrollBox = e.target.className;
	    },
	    removeCurrentScrollBox: function removeCurrentScrollBox() {
	      this.scrollBox = '';
	    },
	    getTbodyStyle: function getTbodyStyle() {
	      var _this$$el$querySelect = this.$el.querySelector('table').getClientRects(),
	          _this$$el$querySelect2 = _slicedToArray(_this$$el$querySelect, 1),
	          tableStyle = _this$$el$querySelect2[0];

	      var tbodyEl = this.$el.querySelector('.c-scroll__tbody') || this.$el.querySelector('.c-table__body');
	      var tbodyWrapper = this.$el.querySelector('.c-table__wrapper');
	      var theadHeight = tableStyle.height || this.maxLevel * 40;
	      var scrollBarHeight = tbodyEl.offsetHeight !== tbodyEl.clientHeight ? this.scrollBarSize : 0;
	      var height = "".concat(this.height - theadHeight - scrollBarHeight, "px");

	      if (tbodyWrapper) {
	        tbodyWrapper.style.maxHeight = '';
	      }

	      if (this.hasFixed) {
	        if (this.$refs.fixedright) {
	          this.$refs.fixedright.style.maxHeight = height;
	        }

	        if (this.$refs.fixedleft) {
	          this.$refs.fixedleft.style.maxHeight = height;
	        }
	      }

	      tbodyEl.style.maxHeight = "".concat(this.height - theadHeight, "px");
	    },
	    getCurrentScrollBarSize: function getCurrentScrollBarSize() {
	      var ua = window.navigator.userAgent;

	      if (ua.indexOf('MSIE') > 0 || Boolean(ua.match(/Trident.*rv:11./))) {
	        this.scrollBarSize = getScrollBarSize();
	      }
	    },
	    rowEnter: function rowEnter(index) {
	      this.hoverRowIndex = index;
	      this.$emit('rowEnter', index);
	    },
	    rowLeave: function rowLeave() {
	      this.hoverRowIndex = '';
	      this.$emit('rowLeave');
	    },
	    onYscroll: function onYscroll(e) {
	      if (!this.hasFixed) return;
	      var scrollEl = this.$el.querySelector('.c-scroll__tbody');

	      if (!e.target.parentElement.className.includes(this.scrollBox)) {
	        e.target.scrollTop = scrollEl.scrollTop;
	        return;
	      }

	      this.$refs.fixedleft.scrollTop = e.target.scrollTop;
	      this.$refs.fixedright.scrollTop = e.target.scrollTop;
	      scrollEl.scrollTop = e.target.scrollTop;
	    },
	    onScroll: function onScroll(e) {
	      var maxWidth = e.target.scrollWidth - e.target.offsetWidth;

	      if (!e.target.className.includes(this.scrollBox)) {
	        // fix mouseleave but scroll is keeping
	        e.target.scrollTop = this.$refs.fixedleft.scrollTop;
	        return;
	      }

	      var _e$target = e.target,
	          scrollLeft = _e$target.scrollLeft,
	          scrollTop = _e$target.scrollTop;
	      var scrollEl = this.$el.querySelector('.c-scroll__thead');
	      this.isScrollMove = scrollLeft > 0;

	      if (this.$refs.fixedleft) {
	        this.$refs.fixedleft.scrollTop = scrollTop;
	      }

	      if (this.$refs.fixedright) {
	        this.$refs.fixedright.scrollTop = scrollTop;
	      }

	      if (scrollLeft > maxWidth) {
	        e.target.scrollLeft = maxWidth;
	        return;
	      }

	      if (scrollEl) {
	        scrollEl.scrollLeft = scrollLeft;
	      }
	    },
	    theadScroll: function theadScroll(e) {
	      if (!this.hasFixed) return;
	      var scrollEl = this.$el.querySelector('.c-scroll__tbody');
	      var scrollLeft = e.target.scrollLeft;

	      if (scrollEl) {
	        scrollEl.scrollLeft = scrollLeft;
	      }
	    },
	    sorter: function sorter(_ref) {
	      var key = _ref.key,
	          order = _ref.order;
	      this.$emit('sort', {
	        key: key,
	        order: order
	      });
	    },
	    getLevels: function getLevels(item) {
	      var _this7 = this;

	      item.children.forEach(function (child) {
	        child.level = item.level + 1;

	        if (child.children) {
	          child.children = _this7.getLevels(child);
	        }
	      });
	      return item.children;
	    },
	    getAllColumns: function getAllColumns(list) {
	      var _this8 = this;

	      var columns = [];
	      list.forEach(function (item, index) {
	        var classname = [];
	        index === 0 && classname.push('c-table__bl');
	        index === list.length - 1 && classname.push('c-table__br');
	        classname = classname.join(' ');
	        item.className = item.hasOwnProperty('className') ? "".concat(item.className, " ").concat(classname) : classname;

	        if (item.children && item.children.length > 0) {
	          columns.push.apply(columns, _toConsumableArray(_this8.getAllColumns(item.children)));
	        } else {
	          columns.push(item);
	        }
	      });
	      return columns;
	    },
	    // set colspan
	    getLeafColumns: function getLeafColumns(list) {
	      var _this9 = this;

	      var columns = [];
	      list.forEach(function (item) {
	        item.level = 1;

	        if (item.children) {
	          item.colspan = _this9.getAllColumns(item.children).length;
	          item.children = _this9.getLeafColumns(item.children);
	          item.children = _this9.getLevels(item);
	        } else {
	          item.colspan = 1;
	        }

	        columns.push(item);
	      });
	      return columns;
	    },
	    // set rolspan
	    getColumnsRows: function getColumnsRows(list, maxLevel) {
	      var _this10 = this;

	      list.forEach(function (item) {
	        item.rowspan = maxLevel - item.level + 1;

	        if (item.children) {
	          item.rowspan = 1;
	          item.children = _this10.getColumnsRows(item.children, maxLevel);
	        }
	      });
	      return list;
	    },
	    findMaxLevel: function findMaxLevel(list) {
	      var _this11 = this;

	      var maxlevel = 0;
	      list.forEach(function (item) {
	        if (item.children) {
	          maxlevel = Math.max(_this11.findMaxLevel(item.children), maxlevel);
	        } else {
	          maxlevel = Math.max(item.level, maxlevel);
	        }
	      });
	      return maxlevel;
	    },
	    getAllColumnsRows: function getAllColumnsRows(list) {
	      var _this12 = this;

	      var columns = [];
	      list.forEach(function (item) {
	        columns.push(item);

	        if (item.children && item.children.length > 0) {
	          columns.push.apply(columns, _toConsumableArray(_this12.getAllColumnsRows(item.children)));
	        }
	      });
	      return columns;
	    },
	    getLevelColumns: function getLevelColumns(list, maxlevel) {
	      var allColumns = this.getAllColumnsRows(list);
	      var columns = [];

	      var _loop = function _loop(i) {
	        columns.push({
	          level: i,
	          columns: allColumns.filter(function (item) {
	            return item.level === i;
	          })
	        });
	      };

	      for (var i = 1; i <= maxlevel; i++) {
	        _loop(i);
	      }

	      return columns;
	    },
	    getColumnsDetail: function getColumnsDetail() {
	      var columns = this.getLeafColumns(this.columns);
	      var maxlevel = this.findMaxLevel(this.columns);
	      var columnsrows = this.getColumnsRows(columns, maxlevel);
	      this.composeColumns = this.getLevelColumns(columnsrows, maxlevel);
	      this.maxLevel = maxlevel;
	      if (!this.hasFixed) return;
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
	};

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
	var $2_40 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-tip",
	      on: {
	        "mouseenter": _vm.show,
	        "mouseleave": _vm.hide,
	        "!focus": function focus($event) {
	          return _vm.show($event);
	        },
	        "!blur": function blur($event) {
	          return _vm.hide($event);
	        },
	        "click": _vm.show
	      }
	    }, [_vm._t("default"), _c('c-portal', {
	      attrs: {
	        "role": "tooltip",
	        "aria-hidden": '' + !_vm.visible
	      }
	    }, [!_vm.disabled ? _c('transition', {
	      on: {
	        "before-enter": _vm.beforeEnter,
	        "enter": _vm.enter,
	        "after-enter": _vm.afterEnter,
	        "leave": _vm.leave,
	        "after-leave": _vm.afterLeave
	      }
	    }, [_c('div', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: _vm.visible,
	        expression: "visible"
	      }],
	      ref: "tip",
	      staticClass: "c-tip__container",
	      class: _vm.theme === 'light' && 'c-tip__container--light',
	      on: {
	        "mouseenter": _vm.show,
	        "mouseleave": _vm.hide
	      }
	    }, [_c('i', {
	      staticClass: "c-tip__arrow",
	      class: _vm.arrowClass
	    }), _vm.content ? _c('div', [_vm._v(_vm._s(_vm.content))]) : _vm._e(), _vm._t("content")], 2)]) : _vm._e()], 1)], 2);
	  },
	  staticRenderFns: [],
	  name: 'c-tip',
	  props: {
	    theme: VueTypes.oneOf(['dark', 'light']).def('dark'),
	    trigger: VueTypes.oneOf(['hover', 'click', 'focus']).def('hover'),
	    disabled: VueTypes.bool.def(false),
	    content: VueTypes.string.def(''),
	    maxWidth: VueTypes.string.def('300px'),
	    showDelay: VueTypes.number.def(defaultDelayTime),
	    hideDelay: VueTypes.number.def(defaultDelayTime),
	    position: VueTypes.oneOf(['top', 'right', 'bottom', 'left']).def('bottom')
	  },
	  data: function data() {
	    return {
	      visible: false,
	      tidIn: null,
	      tidOut: null
	    };
	  },
	  computed: {
	    arrowClass: function arrowClass() {
	      var position = OPPOSITE_DIRECTION[this.position];
	      return "c-tip__arrow--".concat(position);
	    }
	  },
	  methods: {
	    show: function show(_ref) {
	      var type = _ref.type;

	      if (SHOW_MATCH_MAP[this.trigger] === type) {
	        this.clearTimeout();
	        this.visible = true;
	      }
	    },
	    hide: function hide() {
	      var _this = this;

	      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref2$type = _ref2.type,
	          type = _ref2$type === void 0 ? 'click' : _ref2$type;

	      if (HIDE_MATCH_MAP[this.trigger] === type) {
	        this.clearTimeout();
	        this.tidOut = setTimeout(function () {
	          _this.visible = false;
	        }, this.hideDelay);
	      }
	    },
	    resize: function resize() {
	      this.handleResize(this.$refs.tip);
	    },
	    beforeEnter: function beforeEnter(_ref3) {
	      var style = _ref3.style;
	      style.display = 'block';
	      style.visibility = 'hidden';
	      style.zIndex = zIndex.next();
	    },
	    enter: function enter(_ref4, done) {
	      var _this2 = this;

	      var style = _ref4.style;
	      style.opacity = 0;
	      this.tidIn = setTimeout(function () {
	        style.maxWidth = _this2.maxWidth;
	        style.visibility = 'visible';
	        style.opacity = 1;

	        _this2.$nextTick(done);
	      }, this.showDelay);
	    },
	    afterEnter: function afterEnter(el) {
	      this.handleResize(el);
	    },
	    leave: function leave(_ref5) {
	      var style = _ref5.style;
	      style.opacity = 0;
	      style.visibility = 'hidden';
	      this.clearTimeout();
	    },
	    afterLeave: function afterLeave(_ref6) {
	      var style = _ref6.style;
	      style.cssText = '';
	      style.display = 'none';
	    },
	    clearTimeout: function (_clearTimeout) {
	      function clearTimeout() {
	        return _clearTimeout.apply(this, arguments);
	      }

	      clearTimeout.toString = function () {
	        return _clearTimeout.toString();
	      };

	      return clearTimeout;
	    }(function () {
	      clearTimeout(this.tidOut);
	      clearTimeout(this.tidIn);
	    }),
	    handleResize: function handleResize(el) {
	      if (!el || !el.style || !this.visible) {
	        return;
	      } // SEE https://imququ.com/post/document-scrollingelement-in-chrome.html


	      var _ref7 = document.scrollingElement || document.body,
	          scrollLeft = _ref7.scrollLeft,
	          scrollTop = _ref7.scrollTop;

	      var elRect = this.$el.getBoundingClientRect();
	      var tipRect = this.$refs.tip.getBoundingClientRect();
	      var style = el.style; // eslint-disable-next-line

	      switch (this.position) {
	        case 'top':
	          style.top = "".concat(scrollTop + elRect.top - tipRect.height, "px");
	          style.left = "".concat(scrollLeft + elRect.left + (elRect.width - tipRect.width) / 2, "px");
	          style.marginTop = '-10px';
	          style.marginLeft = '';
	          return;

	        case 'bottom':
	          style.top = "".concat(scrollTop + elRect.top + elRect.height, "px");
	          style.left = "".concat(scrollLeft + elRect.left + (elRect.width - tipRect.width) / 2, "px");
	          style.marginTop = '10px';
	          style.marginLeft = '';
	          return;

	        case 'left':
	          style.top = "".concat(scrollTop + elRect.top - (tipRect.height - elRect.height) / 2, "px");
	          style.left = "".concat(scrollLeft + elRect.left - tipRect.width, "px");
	          style.marginLeft = '-10px';
	          style.marginTop = '';
	          return;

	        case 'right':
	          style.top = "".concat(scrollTop + elRect.top - (tipRect.height - elRect.height) / 2, "px");
	          style.left = "".concat(scrollLeft + elRect.left + elRect.width, "px");
	          style.marginLeft = '10px';
	          style.marginTop = '';
	      }
	    },
	    clickOutside: function clickOutside(_ref8) {
	      var target = _ref8.target;

	      if (!this.visible) {
	        return;
	      }

	      var el = this.$el;
	      var tip = this.$refs.tip;
	      var isOutside = !contains(el, target) && !contains(tip, target);

	      if (isOutside && this.visible) {
	        this.hide();
	      }
	    }
	  },
	  updated: function updated() {
	    if (this.visible) {
	      this.$nextTick(this.resize);
	    }
	  },
	  mounted: function mounted() {
	    this.resize = this.resize.bind(this);
	    this.clickOutside = this.clickOutside.bind(this);
	    this.winResize = throttle_1(this.resize, this.$clair.defaultThrottleTime);
	    window.addEventListener('resize', this.winResize);
	    document.body.addEventListener('click', this.clickOutside);
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.clearTimeout();
	    window.removeEventListener('resize', this.winResize);
	    document.body.removeEventListener('click', this.clickOutside);
	  }
	};

	var $2_41 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-toolbar",
	      class: {
	        'is-primary': _vm.primary
	      },
	      style: _vm.style
	    }, [_vm._t("default")], 2);
	  },
	  staticRenderFns: [],
	  props: {
	    height: String,
	    background: String,
	    color: String,
	    primary: Boolean
	  },
	  computed: {
	    style: function style() {
	      var style = {};
	      var height = this.height,
	          background = this.background,
	          color = this.color;
	      if (height) style.lineHeight = height;
	      if (background) style.background = background;
	      if (color) style.color = color;
	      return style;
	    }
	  },
	  name: 'c-toolbar'
	};

	var $2_42 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-toolbar__item",
	      class: {
	        'is-flex': _vm.flex
	      }
	    }, [_vm._t("default")], 2);
	  },
	  staticRenderFns: [],
	  props: {
	    flex: Boolean
	  },
	  name: 'c-toolbar-item'
	};

	var NodeLabel = {
	  props: {
	    node: VueTypes.object.isRequired
	  },
	  inject: ['$tree'],
	  render: function render(h) {
	    var $tree = this.$tree,
	        node = this.node;
	    var $node = this.$parent;

	    if ($tree.$scopedSlots.label) {
	      return $tree.$scopedSlots.label({
	        node: node,
	        $node: $node
	      });
	    }

	    return h('div', node.label);
	  }
	};

	var TreeNode = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-tree__node"
	    }, [_c('div', {
	      staticClass: "c-tree__title",
	      class: {
	        'is-leaf': !_vm.hasChildren
	      },
	      on: {
	        "click": _vm.onNodeClick
	      }
	    }, [_vm.hasChildren ? _c('c-icon', {
	      attrs: {
	        "valign": "middle",
	        "name": _vm.iconName
	      }
	    }) : _vm._e(), _vm.$tree.checkable ? _c('c-checkbox', {
	      attrs: {
	        "indeterminate": _vm.indeterminate
	      },
	      on: {
	        "change": _vm.checkChange
	      },
	      model: {
	        value: _vm.checked,
	        callback: function callback($$v) {
	          _vm.checked = $$v;
	        },
	        expression: "checked"
	      }
	    }) : _vm._e(), _c('div', {
	      staticClass: "c-tree__label"
	    }, [_c('c-node-label', {
	      attrs: {
	        "node": _vm.node
	      }
	    })], 1)], 1), _c('div', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: _vm.showChildren,
	        expression: "showChildren"
	      }],
	      staticClass: "c-tree_children"
	    }, _vm._l(_vm.node.children, function (child, index) {
	      return _c('c-tree-node', {
	        key: index,
	        ref: "children",
	        refInFor: true,
	        attrs: {
	          "node": child,
	          "level": _vm.level + 1
	        }
	      });
	    }))]);
	  },
	  staticRenderFns: [],
	  name: 'c-tree-node',
	  props: {
	    node: VueTypes.object.isRequired,
	    level: VueTypes.integer.isRequired
	  },
	  inject: ['$tree'],
	  components: {
	    'c-node-label': NodeLabel
	  },
	  computed: {
	    hasChildren: function hasChildren() {
	      var children = this.node.children;
	      return children && children.length;
	    },
	    showChildren: function showChildren() {
	      return this.hasChildren && this.expanded;
	    },
	    iconName: function iconName() {
	      return this.expanded ? 'chevron-down' : 'chevron-right';
	    },
	    id: function id() {
	      return this.node[this.$tree.nodeKey];
	    }
	  },
	  data: function data() {
	    return {
	      indeterminate: false,
	      expanded: false,
	      checked: false
	    };
	  },
	  created: function created() {
	    var _this = this;

	    var $tree = this.$tree,
	        $parent = this.$parent,
	        id = this.id; // expanded keys

	    this.expanded = this.$tree.defaultExpandAll || $tree.expandedKeys[id]; // checked status

	    this.checked = $parent.checked || $tree.checkedKeys[id]; // reactive to expandedKeys or checkedKeys change

	    if (id !== void 0) {
	      if ($parent.checked) $tree.$emit('checked-change', id, true);
	      this.$watch('$tree.expandedKeys', function (keys) {
	        _this.expanded = keys[id];
	      });
	      this.$watch('$tree.checkedKeys', function (keys) {
	        _this.checked = keys[id];
	      });
	    } // parent node check changed, notify children


	    this.$on('parent-check-change', function (checked) {
	      _this.checked = checked;
	      _this.indeterminate = false;

	      _this.updateChildren(checked);

	      _this.$tree.$emit('checked-change', _this.id, checked);
	    }); // child check changed, update self

	    this.$on('child-check-change', this.childCheckChange);
	  },
	  methods: {
	    getChildren: function getChildren() {
	      if (!this.hasChildren) return [this];
	      return this.$refs.children.reduce(function (arr, child) {
	        return arr.concat(child.getChildren());
	      }, [this]);
	    },
	    onNodeClick: function onNodeClick() {
	      this.setExpanded(!this.expanded);
	      this.$emit('node-click', this.node);
	    },
	    setExpanded: function setExpanded(expanded) {
	      this.expanded = expanded;

	      if (this.id !== void 0) {
	        this.$tree.$emit('expanded-change', this.id, this.expanded);
	      }
	    },
	    checkChange: function checkChange(checked) {
	      this.$parent.$emit('child-check-change', checked);
	      this.updateChildren(checked);
	      this.$tree.$emit('check-change', this.node, this.checked);
	    },
	    childCheckChange: function childCheckChange(checked) {
	      var $children = this.$refs.children;
	      var checkedCount = $children.filter(function (c) {
	        return c.checked;
	      }).length;
	      var total = $children.length;
	      this.checked = checkedCount === total;
	      this.indeterminate = checkedCount > 0 && checkedCount < total;
	      this.$parent.$emit('child-check-change', this.checked);
	      this.$tree.$emit('checked-change', this.id, checked);
	    },
	    updateChildren: function updateChildren(checked) {
	      if (!this.hasChildren) return;
	      this.$refs.children.forEach(function (c) {
	        return c.$emit('parent-check-change', checked);
	      });
	    }
	  }
	};

	var $2_43 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-tree"
	    }, _vm._l(_vm.nodes, function (node, index) {
	      return _c('c-tree-node', {
	        key: index,
	        attrs: {
	          "node": node,
	          "level": 1
	        }
	      });
	    }));
	  },
	  staticRenderFns: [],
	  name: 'c-tree',
	  props: {
	    nodes: VueTypes.arrayOf(Object).isRequired,
	    checkable: VueTypes.bool.def(false),
	    defaultExpandedKeys: VueTypes.array,
	    defaultExpandAll: VueTypes.bool.def(false),
	    defaultCheckedKeys: VueTypes.array,
	    nodeKey: VueTypes.string.def('id')
	  },
	  provide: function provide() {
	    return {
	      '$tree': this
	    };
	  },
	  components: {
	    'c-tree-node': TreeNode
	  },
	  data: function data() {
	    return {
	      isRoot: true,
	      expandedKeys: {},
	      checkedKeys: {}
	    };
	  },
	  watch: {
	    defaultExpandedKeys: {
	      immediate: true,
	      handler: function handler(keys) {
	        this.expandedKeys = keys.reduce(function (obj, key) {
	          obj[key] = true;
	          return obj;
	        }, {});
	      }
	    },
	    defaultCheckedKeys: {
	      immediate: true,
	      handler: function handler(keys) {
	        this.checkedKeys = keys.reduce(function (obj, key) {
	          obj[key] = true;
	          return obj;
	        }, {});
	      }
	    }
	  },
	  created: function created() {
	    var _this = this;

	    this.$on('expanded-change', function (key, expanded) {
	      _this.expandedKeys[key] = expanded;
	    });
	    this.$on('checked-change', function (key, checked) {
	      if (key === void 0) return;
	      _this.checkedKeys[key] = checked;
	    });
	  },
	  methods: {
	    setExpandedByNode: function setExpandedByNode(node, expanded) {
	      this.filterNodes(function ($node) {
	        return $node.node === node;
	      }).forEach(function ($node) {
	        return $node.setExpanded(expanded);
	      });
	    },
	    getCheckedNodes: function getCheckedNodes(leafOnly) {
	      var filter = function filter($node) {
	        var isChecked = $node.checked;
	        if (leafOnly) return !$node.node.children && isChecked;
	        return isChecked;
	      };

	      return this.filterNodes(filter).map(function ($node) {
	        return $node.node;
	      });
	    },
	    filterNodes: function filterNodes(filter) {
	      var allNodes = this.$children.reduce(function (arr, branch) {
	        return arr.concat(branch.getChildren());
	      }, []);
	      var filtered = allNodes.filter(filter);
	      return filtered;
	    },
	    getExpandedNodes: function getExpandedNodes() {
	      var filter = function filter($node) {
	        return $node.expanded;
	      };

	      return this.filterNodes(filter).map(function ($node) {
	        return $node.node;
	      });
	    },
	    getExpandedKeys: function getExpandedKeys() {
	      var _this2 = this;

	      return this.getExpandedNodes().map(function (node) {
	        return node[_this2.nodeKey];
	      });
	    }
	  }
	};

	function getError(action, xhr) {
	  var msg;

	  if (xhr.response) {
	    msg = "".concat(xhr.response.error || xhr.response);
	  } else if (xhr.responseText) {
	    msg = "".concat(xhr.responseText);
	  } else {
	    msg = "fail to post ".concat(action, " ").concat(xhr.status);
	  }

	  var err = new Error(msg); // err.status = xhr.status
	  // err.method = 'post'
	  // err.url = action

	  return err;
	}

	function getBody(xhr) {
	  var text = xhr.responseText || xhr.response;

	  if (!text) {
	    return text;
	  }

	  try {
	    return JSON.parse(text);
	  } catch (e) {
	    return text;
	  }
	}

	function upload(option) {
	  if (typeof XMLHttpRequest === 'undefined') {
	    return;
	  }

	  var xhr = new XMLHttpRequest();
	  var action = option.action;

	  if (xhr.upload) {
	    xhr.upload.onprogress = function progress(e) {
	      if (e.total > 0) {
	        e.percent = e.loaded / e.total * 100;
	      }

	      option.onProgress(e);
	    };
	  }

	  var formData = new FormData();

	  if (option.data) {
	    Object.keys(option.data).forEach(function (key) {
	      formData.append(key, option.data[key]);
	    });
	  }

	  formData.append(option.filename, option.file, option.file.name);

	  xhr.onerror = function error(e) {
	    option.onError(e);
	  };

	  xhr.onload = function onload() {
	    if (xhr.status < 200 || xhr.status >= 300) {
	      return option.onError(getError(action, xhr));
	    }

	    option.onSuccess(getBody(xhr));
	  };

	  xhr.open('post', action, true);

	  if (option.withCredentials && 'withCredentials' in xhr) {
	    xhr.withCredentials = true;
	  }

	  var headers = option.headers || {};

	  for (var item in headers) {
	    if (headers.hasOwnProperty(item) && headers[item] !== null) {
	      xhr.setRequestHeader(item, headers[item]);
	    }
	  }

	  xhr.send(formData);
	  return xhr;
	}

	var $2_45 = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('div', {
	      staticClass: "c-upload is-inline-block"
	    }, [_c('label', {
	      staticClass: "is-inline-block",
	      on: {
	        "click": function click($event) {
	          $event.preventDefault();
	          return _vm.chooseFile($event);
	        }
	      }
	    }, [_vm._t("btn", [_c('c-button', _vm._b({
	      attrs: {
	        "type": "button",
	        "icon": "upload",
	        "loading": _vm.loading
	      }
	    }, 'c-button', _vm.$attrs, false), [_vm._v("上传文件")])]), _vm._t("file-list", _vm._l(_vm.filenames, function (item, index) {
	      return _c('span', {
	        staticClass: "has-padding-left-sm"
	      }, [_vm._v(_vm._s(item))]);
	    }), {
	      filenames: _vm.filenames
	    })], 2), _c('input', {
	      ref: "input",
	      staticClass: "is-none",
	      attrs: {
	        "name": "file",
	        "type": "file",
	        "accept": _vm.accept,
	        "multiple": _vm.multiple
	      },
	      on: {
	        "change": _vm.handleChange
	      }
	    })]);
	  },
	  staticRenderFns: [],
	  name: 'c-upload',
	  props: {
	    limit: Number,
	    defaultFileList: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    multiple: {
	      type: Boolean,
	      default: function _default() {
	        return false;
	      }
	    },
	    autoUpload: {
	      type: Boolean,
	      default: function _default() {
	        return true;
	      }
	    },
	    validator: Function,
	    action: String,
	    accept: String,
	    name: {
	      type: String,
	      default: function _default() {
	        return 'file';
	      }
	    },
	    headers: {
	      type: Object,
	      default: function _default() {
	        return {};
	      }
	    },
	    data: {
	      type: Object,
	      default: function _default() {
	        return {};
	      }
	    }
	  },
	  data: function data() {
	    return {
	      loading: false,
	      tmpIndex: 1,
	      reqs: {},
	      files: [],
	      filenames: [],
	      remoteFilenames: []
	    };
	  },
	  methods: {
	    chooseFile: function chooseFile() {
	      if (this.loading) return;
	      this.$refs.input.value = null;
	      this.$refs.input.click();
	    },
	    handleChange: function handleChange(ev) {
	      var files = ev.target.files;
	      if (!files) return;
	      this.uploadFiles(files);
	    },
	    uploadFiles: function uploadFiles(files) {
	      if (this.limit && this.defaultFileList.length + files.length > this.limit) {
	        this.$emit('exceed', files, this.defaultFileList);
	        return;
	      }

	      var postFiles = Array.from(files);
	      if (postFiles.length === 0) return;

	      if (!this.multiple) {
	        postFiles = postFiles.slice(0, 1);
	      }

	      this.files = postFiles;
	      this.filenames = postFiles.map(function (file) {
	        return file.name;
	      });
	      if (this.autoUpload === false) return;
	      this.submit();
	    },
	    submit: function submit() {
	      var _this = this;

	      this.files.forEach(function (rawFile) {
	        _this.addFid(rawFile);

	        _this.upload(rawFile);
	      });
	    },
	    upload: function upload$$1(rawFile) {
	      if (!this.validator) return this.post(rawFile);
	      var isValid = this.validator(rawFile);
	      if (isValid) this.post(rawFile);
	    },
	    post: function post(rawFile) {
	      var _this2 = this;

	      var fid = rawFile.fid;
	      var options = {
	        headers: this.headers,
	        // withCredentials: this.withCredentials,
	        file: rawFile,
	        data: this.data,
	        filename: this.name,
	        action: this.action,
	        onProgress: function onProgress(e) {
	          if (!_this2.loading) _this2.loading = true;

	          _this2.$emit('progress', e, rawFile);
	        },
	        onSuccess: function onSuccess(res) {
	          _this2.$emit('success', res, rawFile);

	          delete _this2.reqs[fid];
	          _this2.loading = false;
	        },
	        onError: function onError(err) {
	          _this2.$emit('error', err, rawFile);

	          delete _this2.reqs[fid];
	          _this2.loading = false;
	        }
	      };
	      var req = upload(options);
	      this.reqs[fid] = req;
	    },
	    addFid: function addFid(rawFile) {
	      if (!rawFile.fid) {
	        rawFile.fid = Date.now() + this.tmpIndex++;
	      }
	    }
	  }
	};

	// NOTE

	var reqs = function () {
	  var map = {
	    './breadcrumb/breadcrumb-item.vue': $2_0,
	    './breadcrumb/index.vue': $2_1,
	    './button/index.vue': $2_2,
	    './button-group/index.vue': $2_3,
	    './calendar/date-header.vue': $2_4,
	    './calendar/date-table.vue': $2_5,
	    './calendar/index.vue': $2_6,
	    './calendar/month-table.vue': $2_7,
	    './card/index.vue': $2_8,
	    './cascader/index.vue': $2_9,
	    './cascader/menu.vue': Menu,
	    './checkbox/checkbox-group.vue': $2_11,
	    './checkbox/index.vue': $2_12,
	    './chip/index.vue': $2_13,
	    './color-picker/index.vue': $2_14,
	    './datepicker/daterange.vue': $2_15,
	    './datepicker/index.vue': $2_16,
	    './form/form-item.vue': $2_17,
	    './form/index.vue': $2_18,
	    './grid/box-item.vue': $2_19,
	    './grid/container.vue': $2_20,
	    './grid/index.vue': $2_21,
	    './icon/index.vue': $2_22,
	    './input/index.vue': $2_23,
	    './menu/index.vue': $2_24,
	    './menu/menu-item.vue': $2_25,
	    './menu/submenu.vue': $2_26,
	    './modal/index.vue': $2_27,
	    './notification/index.vue': $2_28,
	    './pagination/index.vue': $2_29,
	    './radio/index.vue': $2_30,
	    './radio/radio-group.vue': $2_31,
	    './select/index.vue': $2_32,
	    './select/option.vue': $2_33,
	    './slider/index.vue': $2_34,
	    './steps/index.vue': $2_35,
	    './steps/step.vue': $2_36,
	    './switch/index.vue': $2_37,
	    './table/base-table.vue': $2_38,
	    './table/index.vue': $2_39,
	    './tip/index.vue': $2_40,
	    './toolbar/index.vue': $2_41,
	    './toolbar/toolbar-item.vue': $2_42,
	    './tree/index.vue': $2_43,
	    './tree/tree-node.vue': TreeNode,
	    './upload/index.vue': $2_45
	  };

	  var req = function req(key) {
	    return map[key] || function () {
	      throw new Error("Cannot find module '" + key + "'.");
	    }();
	  };

	  req.keys = function () {
	    return Object.keys(map);
	  };

	  return req;
	}();

	var Components = {
	  install: function install(Vue) {
	    var keys = reqs.keys();

	    for (var i = 0; i < keys.length; i++) {
	      var module = getModule(reqs(keys[i]));
	      module.name && Vue.component(module.name, module);
	    }
	  }
	}; // function importAll (r) {
	//   return reqs.keys().map(key => {
	//     return getModule(reqs(key))
	//   })
	// }

	function getModule(module) {
	  return module.__esModule && module.default || module;
	}

	var Responsive = {
	  install: function install(Vue) {
	    var responsive = new Vue({
	      data: {
	        media: breakpoints[0]
	      }
	    });

	    var setMediaAttr = function setMediaAttr(media) {
	      document.documentElement.setAttribute('media', media);
	    }; // create an element to listen viewport change


	    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
	      var element = document.createElement('div');
	      element.className = 'c-responsive-listener';
	      document.body.appendChild(element);

	      var getMediaType = function getMediaType(_) {
	        return breakpoints[element.clientWidth];
	      };

	      element.addEventListener('transitionend', function (e) {
	        var oldMedia = responsive.media;
	        var media = getMediaType();
	        if (oldMedia === media) return; // no media change

	        responsive.$emit('change', media, oldMedia);
	        responsive.media = media;
	        setMediaAttr(media);
	      });
	      responsive.media = getMediaType();
	      setMediaAttr(responsive.media);
	    }

	    Vue.prototype.$clair.responsive = responsive;
	  }
	};

	var defaultStyle = {
	  left: 0,
	  position: 'absolute',
	  top: 0,
	  width: '100%'
	};

	function install(Vue) {
	  var Portal = {
	    name: 'c-portal',
	    updated: function updated() {
	      this.vm.$forceUpdate();
	    },
	    mounted: function mounted() {
	      var self = this;
	      var vm = new Vue({
	        abstract: true,
	        parent: this,
	        render: function render(h) {
	          var _self$$vnode$data = self.$vnode.data,
	              attrs = _self$$vnode$data.attrs,
	              staticClass = _self$$vnode$data.staticClass,
	              staticStyle = _self$$vnode$data.staticStyle,
	              className = _self$$vnode$data.class;
	          var children = self.$slots.default;
	          return h('div', {
	            attrs: attrs,
	            staticClass: staticClass,
	            class: className,
	            staticStyle: Object.assign({}, staticStyle, defaultStyle)
	          }, children);
	        }
	      });
	      var div = document.createElement('div');
	      document.body.appendChild(div);
	      vm.$mount(div);
	      this.vm = vm;
	    },
	    beforeDestroy: function beforeDestroy() {
	      var vm = this.vm;
	      vm.$destroy();

	      if (vm.$el) {
	        document.body.removeChild(vm.$el);
	      }
	    },
	    // eslint-disable-next-line
	    render: function render() {}
	  };
	  Vue.component(Portal.name, Portal);
	}

	var Portal = {
	  install: install
	};

	var CModalAlert = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('c-modal', {
	      attrs: {
	        "title": _vm.title,
	        "visible": _vm.visible,
	        "width": "400px"
	      },
	      on: {
	        "close": _vm.onCancel,
	        "after-leave": function afterLeave($event) {
	          _vm.$emit('destroy');
	        }
	      }
	    }, [_c('div', [_vm._v(_vm._s(_vm.msg))]), _c('div', {
	      attrs: {
	        "slot": "footer"
	      },
	      slot: "footer"
	    }, [_c('c-button', {
	      attrs: {
	        "primary": "",
	        "autofocus": ""
	      },
	      on: {
	        "click": _vm.onConfirm
	      }
	    }, [_vm._v("确定")])], 1)]);
	  },
	  staticRenderFns: [],
	  props: {
	    title: String,
	    msg: {
	      type: String,
	      require: true
	    }
	  },
	  data: function data() {
	    return {
	      visible: true
	    };
	  },
	  methods: {
	    onCancel: function onCancel() {
	      this.visible = false;
	      this.$emit('cancel');
	    },
	    onConfirm: function onConfirm() {
	      this.visible = false;
	      this.$emit('confirm');
	    }
	  }
	};

	var CModalMessage = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('c-modal', {
	      attrs: {
	        "width": "400px",
	        "title": _vm.title,
	        "visible": _vm.visible
	      },
	      on: {
	        "close": _vm.onCancel,
	        "after-leave": function afterLeave($event) {
	          _vm.$emit('destroy');
	        }
	      }
	    }, [_c('div', {
	      staticClass: "c-modal-message"
	    }, [_c('c-icon', {
	      class: _vm.type,
	      attrs: {
	        "type": "feather",
	        "name": _vm.icon
	      }
	    }), _c('div', [_vm._v(_vm._s(_vm.msg))])], 1), _c('div', {
	      attrs: {
	        "slot": "footer"
	      },
	      slot: "footer"
	    }, [_c('c-button', {
	      attrs: {
	        "outline": ""
	      },
	      on: {
	        "click": _vm.onCancel
	      }
	    }, [_vm._v("取消")]), _c('c-button', {
	      attrs: {
	        "primary": "",
	        "autofocus": ""
	      },
	      on: {
	        "click": _vm.onConfirm
	      }
	    }, [_vm._v("确认")])], 1)]);
	  },
	  staticRenderFns: [],
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
	  data: function data() {
	    return {
	      visible: true
	    };
	  },
	  computed: {
	    icon: function icon() {
	      switch (this.type) {
	        case 'success':
	          return 'check-circle';

	        case 'warning':
	          return 'alert-circle';

	        case 'error':
	          return 'alert-triangle';

	        case 'info':
	        default:
	          return 'info';
	      }
	    }
	  },
	  methods: {
	    onCancel: function onCancel() {
	      this.visible = false;
	      this.$emit('cancel');
	    },
	    onConfirm: function onConfirm() {
	      this.visible = false;
	      this.$emit('confirm');
	    }
	  }
	};

	var Modal = {
	  install: function install(Vue) {
	    extendVue(Vue);
	  }
	};

	function extendVue(Vue) {
	  var _this = this;

	  var prototype = Vue.prototype;

	  var createModal = function createModal(data, component) {
	    var deferred = defer();
	    var div = document.createElement('div');
	    document.body.appendChild(div);
	    var vm = new Vue({
	      components: {
	        'c-portal-app': component
	      },
	      mounted: function mounted() {
	        // remove comment element
	        document.body.removeChild(this.$el);
	      },
	      render: function render(h) {
	        return h('c-portal-app', {
	          attrs: data,
	          on: {
	            cancel: function cancel() {
	              deferred.reject();
	            },
	            confirm: function confirm() {
	              deferred.resolve();
	            },
	            destroy: function destroy() {
	              vm.$destroy();
	            }
	          }
	        });
	      }
	    }).$mount(div);
	    return deferred.promise;
	  };

	  prototype.$alert = function (data) {
	    // data: { msg, title }
	    return createModal(data, CModalAlert);
	  };

	  prototype.$message = function (data) {
	    // data: { msg, title, type }
	    return createModal(data, CModalMessage);
	  };

	  var messageTypes = ['success', 'error', 'info', 'warning'];
	  messageTypes.forEach(function (type) {
	    prototype["$".concat(type)] = function (_ref) {
	      var msg = _ref.msg,
	          title = _ref.title;
	      return _this.$message({
	        msg: msg,
	        title: title,
	        type: type
	      });
	    };
	  });
	}

	var CNotification = {
	  render: function render() {
	    var _vm = this;

	    var _h = _vm.$createElement;

	    var _c = _vm._self._c || _h;

	    return _c('c-notification', {
	      attrs: {
	        "visible": _vm.visible,
	        "title": _vm.title,
	        "message": _vm.message,
	        "position": _vm.position,
	        "duration": _vm.duration,
	        "offset": _vm.offset,
	        "dangerouslySetInnerHTML": _vm.dangerouslySetInnerHTML
	      },
	      on: {
	        "close": _vm.onClose,
	        "after-leave": _vm.afterLeave
	      }
	    }, [_c('div', {
	      staticClass: "c-notification__icon"
	    }, [_vm.type ? _c('c-icon', {
	      class: _vm.type,
	      attrs: {
	        "type": "feather",
	        "name": _vm.icon
	      }
	    }) : _vm._e()], 1)]);
	  },
	  staticRenderFns: [],
	  props: {
	    title: String,
	    message: String,
	    position: {
	      type: String,
	      default: 'topRight'
	    },
	    duration: Number,
	    type: String,
	    offset: Number,
	    dangerouslySetInnerHTML: Boolean
	  },
	  data: function data() {
	    return {
	      visible: true
	    };
	  },
	  computed: {
	    icon: function icon() {
	      switch (this.type) {
	        case 'success':
	          return 'check-circle';

	        case 'warning':
	          return 'alert-circle';

	        case 'error':
	          return 'alert-triangle';

	        case 'info':
	        default:
	          return 'info';
	      }
	    }
	  },
	  methods: {
	    onClose: function onClose() {
	      this.visible = false;
	      this.$emit('close');
	    },
	    afterLeave: function afterLeave() {
	      this.$emit('destroy');
	    }
	  }
	};

	var Notification = {
	  install: function install(Vue) {
	    extendVue$1(Vue);
	  }
	};
	var containers = {
	  topRight: null,
	  bottomRight: null,
	  bottomLeft: null,
	  topLeft: null
	};

	function extendVue$1(Vue) {
	  var prototype = Vue.prototype;

	  var createNotification = function createNotification(data, component) {
	    var mountNode = document.createElement('div');
	    var pos = data.position ? data.position : 'topRight';

	    if (containers[pos] === null) {
	      var el = document.createElement('div');
	      el.className = "c-notification c-notification-".concat(pos);
	      containers[pos] = el;
	      document.body.appendChild(containers[pos]);
	    }

	    containers[pos].appendChild(mountNode);
	    var vm = new Vue({
	      components: {
	        'c-notice-app': component
	      },
	      destroyed: function destroyed() {
	        var elem = this.$el;
	        elem.parentNode.removeChild(elem);
	      },
	      render: function render(h) {
	        return h('c-notice-app', {
	          attrs: data,
	          on: {
	            destroy: function destroy() {
	              vm.$destroy();
	            },
	            close: function close() {
	              // TODO
	              console.log('Close the notification...');
	            }
	          }
	        });
	      }
	    }).$mount(mountNode);
	  };

	  prototype.$notify = function (data) {
	    return createNotification(data, CNotification);
	  };
	}

	var Clair = {
	  install: function install(Vue) {
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
	        get: function get() {
	          return $clair;
	        }
	      });
	      $clair.mixins = {
	        validatable: validatable,
	        resettable: resettable
	      };

	      Vue.prototype.noop = function () {};
	    }

	    Vue.use(Components); // install plugins

	    Vue.use(Portal);
	    Vue.use(Modal);
	    Vue.use(Responsive);
	    Vue.use(Notification);
	  }
	};

	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(Clair);
	}

	return Clair;

})));
