/*!
 * Clair v0.3.0-alpha.4
 * (c) 2017-present clair-design@75team
 * Released under the MIT License.
 */
import objectAssign from 'object-assign';
import isPlainObject from 'lodash/isPlainObject';
import throttle from 'lodash/throttle';
import ColorPicker from 'v-color';
import featherIcons from 'feather-vue';
import VCtrl from 'v-ctrl';
import clamp from 'lodash/clamp';
import cloneDeep from 'lodash/cloneDeep';

if ('assign' in Object === false) {
  Object.defineProperty(Object, 'assign', {
    value: objectAssign,
    configurable: true,
    enumerable: false,
    writable: true
  });
}

var $1_0 = {
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

var $1_1 = {
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
      } else if (isPlainObject(def)) {
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

  if (!isPlainObject(type)) {
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
        valid = isPlainObject(value);
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
      if (isPlainObject(type)) {
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

        if (!isPlainObject(value)) {
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
    } else if (isPlainObject(value)) {
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

var $1_2 = {
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

var $1_3 = {
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

var $1_4 = {
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

var $1_5 = {
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

var $1_6 = {
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

var $1_7 = {
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

var $1_8 = {
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

var $1_9 = {
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
var $1_11 = {
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
var $1_12 = {
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

var $1_13 = {
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
var $1_14 = {
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
    'color-picker': ColorPicker
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
    this.winResize = throttle(this.resize, this.$clair.defaultThrottleTime);
    window.addEventListener('resize', this.winResize);
    document.body.addEventListener('click', this.clickOutside);
  },
  beforeDestroy: function beforeDestroy() {
    this.clearTimeout();
    window.removeEventListener('resize', this.winResize);
    document.body.removeEventListener('click', this.clickOutside);
  }
};

var $1_15 = {
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

var $1_16 = {
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

var $1_17 = {
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
var $1_18 = {
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

var $1_19 = {
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

var $1_20 = {
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
var $1_21 = {
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

var $1_22 = {
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
  components: featherIcons,
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

var $1_23 = {
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
    this.resizeTextArea = throttle(this.resizeTextArea.bind(this), defaultThrottleTime);
  }
};

var $1_24 = {
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

var $1_25 = {
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

var $1_26 = {
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
var $1_27 = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return !_vm.shouldDestroy ? _c('c-portal', {
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
    }, [_vm._v("确认")])])], 2)])])])], 1) : _vm._e();
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
    center: Boolean,
    destroyAfterClose: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      uid: uid++,
      zIndex: zIndex.next(),
      disappeared: false
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
    },
    shouldDestroy: function shouldDestroy() {
      var visible = this.visible,
          disappeared = this.disappeared,
          destroyAfterClose = this.destroyAfterClose;
      return destroyAfterClose && !visible && disappeared;
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
      this.disappeared = false;
    },
    afterLeave: function afterLeave() {
      overflowController.reset(this.uid);
      this.disappeared = true;
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

var $1_28 = {
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

var $1_29 = {
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

var $1_30 = {
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

var $1_31 = {
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

var $1_32 = {
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

    this.__onresize = throttle(function () {
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

var $1_33 = {
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

var defaultHoverTimeout = 200;
var $1_34 = {
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
    'v-ctrl': VCtrl.VueCtrlComponent
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
        var mark = clamp(mk, min, max);
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
      return clamp(decimal, 0, 1);
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

        if (val !== clamp(val, min, max)) {
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

var $1_35 = {
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

var $1_36 = {
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
var $1_37 = {
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

var $1_38 = {
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
      var columns = cloneDeep(this.columns);
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

var $1_39 = {
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
var $1_40 = {
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
    this.winResize = throttle(this.resize, this.$clair.defaultThrottleTime);
    window.addEventListener('resize', this.winResize);
    document.body.addEventListener('click', this.clickOutside);
  },
  beforeDestroy: function beforeDestroy() {
    this.clearTimeout();
    window.removeEventListener('resize', this.winResize);
    document.body.removeEventListener('click', this.clickOutside);
  }
};

var $1_41 = {
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

var $1_42 = {
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

var $1_43 = {
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

var $1_45 = {
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
    './breadcrumb/breadcrumb-item.vue': $1_0,
    './breadcrumb/index.vue': $1_1,
    './button/index.vue': $1_2,
    './button-group/index.vue': $1_3,
    './calendar/date-header.vue': $1_4,
    './calendar/date-table.vue': $1_5,
    './calendar/index.vue': $1_6,
    './calendar/month-table.vue': $1_7,
    './card/index.vue': $1_8,
    './cascader/index.vue': $1_9,
    './cascader/menu.vue': Menu,
    './checkbox/checkbox-group.vue': $1_11,
    './checkbox/index.vue': $1_12,
    './chip/index.vue': $1_13,
    './color-picker/index.vue': $1_14,
    './datepicker/daterange.vue': $1_15,
    './datepicker/index.vue': $1_16,
    './form/form-item.vue': $1_17,
    './form/index.vue': $1_18,
    './grid/box-item.vue': $1_19,
    './grid/container.vue': $1_20,
    './grid/index.vue': $1_21,
    './icon/index.vue': $1_22,
    './input/index.vue': $1_23,
    './menu/index.vue': $1_24,
    './menu/menu-item.vue': $1_25,
    './menu/submenu.vue': $1_26,
    './modal/index.vue': $1_27,
    './notification/index.vue': $1_28,
    './pagination/index.vue': $1_29,
    './radio/index.vue': $1_30,
    './radio/radio-group.vue': $1_31,
    './select/index.vue': $1_32,
    './select/option.vue': $1_33,
    './slider/index.vue': $1_34,
    './steps/index.vue': $1_35,
    './steps/step.vue': $1_36,
    './switch/index.vue': $1_37,
    './table/base-table.vue': $1_38,
    './table/index.vue': $1_39,
    './tip/index.vue': $1_40,
    './toolbar/index.vue': $1_41,
    './toolbar/toolbar-item.vue': $1_42,
    './tree/index.vue': $1_43,
    './tree/tree-node.vue': TreeNode,
    './upload/index.vue': $1_45
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
    }, [_c('div', [_vm._t("message")], 2), _c('div', {
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
      type: [String, Function],
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
  },
  watch: {
    msg: {
      immediate: true,
      handler: function handler() {
        var msg = this.msg;
        var h = this.$createElement.bind(this);
        var message = typeof msg === 'function' ? msg(h) : h('span', null, msg);
        this.$slots.message = message;
      }
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
    }), _c('div', [_vm._t("message")], 2)], 1), _c('div', {
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
      type: [String, Function],
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
  },
  watch: {
    msg: {
      immediate: true,
      handler: function handler() {
        var msg = this.msg;
        var h = this.$createElement.bind(this);
        var message = typeof msg === 'function' ? msg(h) : h('span', null, msg);
        this.$slots.message = message;
      }
    }
  }
};

var Modal = {
  install: function install(Vue) {
    extendVue(Vue);
  }
};

function extendVue(Vue) {
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
    if (typeof data === 'string') {
      data = {
        title: '提示',
        msg: data
      };
    }

    return createModal(data, CModalAlert);
  };

  prototype.$message = function (data) {
    // data: { msg, title, type }
    return createModal(data, CModalMessage);
  };

  var messageTypes = ['success', 'error', 'info', 'warning'];
  messageTypes.forEach(function (type) {
    prototype["$".concat(type)] = function (data) {
      if (typeof data === 'string') {
        data = {
          title: '提示',
          msg: data
        };
      }

      data.type = type;
      return this.$message(data);
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

export default Clair;
