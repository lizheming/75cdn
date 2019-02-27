/*!
 * Clair v0.5.1
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

var $1_0 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-breadcrumb__item"},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-breadcrumb-item'
}

var $1_1 = {
  name: 'c-breadcrumb',
  props: {
    divider: {
      type: String,
      default: '/'
    }
  },
  data () {
    return {}
  },
  methods: {
    getDivider () {
      const divider = this.$scopedSlots.divider
        ? this.$scopedSlots.divider()
        : this.divider;
      return this.$createElement('i', {
        staticClass: 'c-breadcrumb__divider'
      }, divider)
    },
    getChildren () {
      const children = [];
      const isItem = item => item.componentOptions &&
        item.componentOptions.tag === 'c-breadcrumb-item';
      const items = (this.$slots.default || []).filter(isItem);
      const { length } = items;
      items.forEach((item, index) => {
        children.push(item);
        if (index !== length - 1) children.push(this.getDivider());
      });
      return children
    }
  },

  render (h) {
    return h('nav', {
      staticClass: 'c-breadcrumb'
    }, this.getChildren())
  }
}

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

const name = 'c-button';
const block = `c-button`;
const modifiers = [
  'primary',
  'success',
  'warning',
  'danger',
  'round',
  'outline',
  'flat',
  'loading'
];
const props = Object.assign(
  {
    href: String,
    size: String,
    icon: String,
    type: {
      type: String,
      default: 'button'
    },
    autofocus: Boolean
  },
  toVueProps(modifiers)
);
const classNames = toClassNames(block, modifiers);

var $1_2 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.href)?_c('router-link',{staticClass:"c-button",class:_vm.classNames,attrs:{"tag":"button","to":_vm.href}},[(_vm.iconName)?_c('c-icon',{attrs:{"name":_vm.iconName,"valign":"middle"}}):_vm._e(),(_vm.$slots.default)?_c('span',[_vm._t("default")],2):_vm._e()],1):_c('button',{staticClass:"c-button",class:_vm.classNames,attrs:{"type":_vm.type},on:{"click":_vm.onClick}},[(_vm.iconName)?_c('c-icon',{attrs:{"name":_vm.iconName,"valign":"middle"}}):_vm._e(),(_vm.$slots.default)?_c('span',[_vm._t("default")],2):_vm._e()],1)},staticRenderFns: [],
  name,
  props,
  inject: {
    $buttonGroup: { default: null },
    $form: { default: null }
  },
  computed: {
    iconName () {
      return this.loading ? 'loader' : this.icon
    },
    actualSize () {
      const { size, $buttonGroup, $form } = this;
      return size ||
        ($buttonGroup && $buttonGroup.size) ||
        ($form && $form.size)
    },
    classNames () {
      const classList = classNames.call(this);
      const size = this.actualSize;
      if (size) classList.push(`c-button--${size}`);
      return classList
    }
  },
  methods: {
    onClick (e) {
      this.$emit('click', e);
    }
  },
  mounted () {
    if (this.autofocus) {
      this.$el.focus();
    }
  }
}

var $1_3 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-button-group"},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-button-group',
  props: {
    size: String
  },
  provide () {
    return {
      '$buttonGroup': this
    }
  },

  data () {
    return {}
  },

  methods: {}
}

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

var $1_4 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-calendar__header"},[_c('div',{staticClass:"c-calendar__prev-year",class:{disabled: !_vm.isPreYearCanSelect},on:{"click":_vm.prevYear}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevrons-left"}})],1),_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__prev-month",class:{disabled: !_vm.isPreMonthCanSelect},on:{"click":_vm.prevMonth}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevron-left"}})],1),_c('span',{staticClass:"c-calendar__year"},[_vm._v(_vm._s(this.year))]),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__spacer"},[_vm._v("-")]),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__month",on:{"click":_vm.monthtableShow}},[_vm._v(_vm._s(_vm.fixZero(this.month + 1)))]),_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__next-month",class:{disabled: !_vm.isNextMonthCanSelect},on:{"click":_vm.nextMonth}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevron-right"}})],1),_c('a',{staticClass:"c-calendar__next-year",class:{disabled: !_vm.isNextYearCanSelect},on:{"click":_vm.nextYear}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevrons-right"}})],1)])},staticRenderFns: [],
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
  data () {
    return {}
  },
  computed: {
    minYear () {
      return new Date(this.minDate).getFullYear()
    },
    maxYear () {
      return new Date(this.maxDate).getFullYear()
    },
    minMonth () {
      return new Date(this.minDate).getMonth()
    },
    maxMonth () {
      return new Date(this.maxDate).getMonth()
    },
    isPreMonthCanSelect () {
      return !(this.year === this.minYear && this.month === this.minMonth)
    },
    isNextMonthCanSelect () {
      return !(this.year === this.maxYear && this.month === this.maxMonth)
    },
    isPreYearCanSelect () {
      return !(this.year === this.minYear)
    },
    isNextYearCanSelect () {
      return !(this.year === this.maxYear)
    }
  },
  methods: {
    prevYear () {
      if (!this.isPreYearCanSelect) return false
      this.$emit('yearchange', this.year - 1);
    },
    nextYear () {
      if (!this.isNextYearCanSelect) return false
      this.$emit('yearchange', this.year + 1);
    },
    monthtableShow () {
      this.$emit('monthshow', true);
    }
  }
}

var $1_5 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"c-calendar__day-table"},[_c('thead',[_c('tr',_vm._l((_vm.weeks),function(item){return _c('th',[_vm._v(_vm._s(item))])}))]),_c('tbody',_vm._l((_vm.dayRows),function(row,rowIndex){return _c('tr',_vm._l((row),function(item,itemIndex){return _c('td',{class:_vm.getCellCls(item),on:{"click":function($event){_vm.selectDay(item);},"mouseenter":function($event){_vm.onMouseEnter($event);}}},[_c('a',{staticClass:"day-cell",attrs:{"data-rowindex":rowIndex,"data-index":itemIndex}},[_vm._v(_vm._s(item.day))])])}))}))])},staticRenderFns: [],
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
      default () {
        return {
          endDate: '',
          selecting: false
        }
      }
    }
  },
  mixins: [Mixin],
  data () {
    return {
      weeks: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  computed: {
    rangeDay () {
      const endYear = new Date(this.end).getFullYear();
      const endMonth = new Date(this.end).getMonth();
      const endDay = new Date(this.end).getDate();
      return this.year === endYear && this.month === endMonth ? endDay : ''
    },
    minYear () {
      return new Date(this.minDate).getFullYear()
    },
    maxYear () {
      return new Date(this.maxDate).getFullYear()
    },
    minMonth () {
      return new Date(this.minDate).getMonth()
    },
    maxMonth () {
      return new Date(this.maxDate).getMonth()
    },
    minDay () {
      return new Date(this.minDate).getDate()
    },
    maxDay () {
      return new Date(this.maxDate).getDate()
    },
    isPreMonthCanSelect () {
      return !(this.year === this.minYear && this.month === this.minMonth)
    },
    isNextMonthCanSelect () {
      return !(this.year === this.maxYear && this.month === this.maxMonth)
    },
    isPreYearCanSelect () {
      return !(this.year === this.minYear)
    },
    isNextYearCanSelect () {
      return !(this.year === this.maxYear)
    },
    dayRows () {
      const lines = 6;
      const weekDays = 7;
      const allDays = lines * weekDays;
      const rows = [];
      const getRowArr = (N, i = 1) => {
        return Array.from(new Array(N), (val, index) => index + i)
      };
      const mapDayObj = (list, classname) => {
        return list.map(item => {
          return {
            class: classname,
            day: item
          }
        })
      };
      const currentMonthDays = new Date(this.year, this.month + 1, 0).getDate();
      const lastMonthDays = new Date(this.year, this.month, 0).getDate();
      const startWeek = new Date(this.year, this.month, 1).getDay();
      const lastMonthDayCount = startWeek || weekDays;
      const nextMonthDays = allDays - lastMonthDayCount - currentMonthDays;
      const lastMonthDates = mapDayObj(
        getRowArr(lastMonthDays).slice(-lastMonthDayCount),
        'lastmonth');
      const currentMonthDates = mapDayObj(getRowArr(currentMonthDays),
        'curmonth');
      const nextMonthDates = mapDayObj(getRowArr(nextMonthDays), 'nextmonth');
      const allDate = [
        ...lastMonthDates,
        ...currentMonthDates,
        ...nextMonthDates
      ];
      for (let i = 0; i < allDays; i += weekDays) {
        rows.push(allDate.slice(i, i + weekDays));
      }
      return rows
    }
  },
  methods: {
    getCellCls (item) {
      const clsArr = [item.class];
      this.isSelectedDate(item) && clsArr.push('active');
      this.isDateDisabled(item) && clsArr.push('disabled');
      !this.isSelectedDate(item) && this.rangeObj.selecting && this.isDayInRange(item) && clsArr.push('day-cell-range');
      return clsArr
    },
    isDayInRange (item) {
      if (item.class !== 'curmonth') return false
      const startTime = new Date(this.start).getTime();
      const endTime = new Date(this.end).getTime();
      const currentTime = new Date(this.year, this.month, item.day).getTime();
      const hoverTime = new Date(this.rangeObj.endDate).getTime();
      if (startTime && endTime) {
        return currentTime > startTime && currentTime < endTime
      } else if (startTime) {
        return startTime > hoverTime
          ? currentTime > hoverTime && currentTime < startTime
          : currentTime > startTime && currentTime < hoverTime
      }
      return false
    },
    onMouseEnter (e) {
      if (e.target.tagName === 'TD') {
        const rowIndex = e.target.querySelector('a').getAttribute('data-rowindex');
        const columnIndex = e.target.querySelector('a').getAttribute('data-index');
        const dayItem = this.dayRows[rowIndex][columnIndex];
        /* eslint-disable no-nested-ternary */
        const type = dayItem.class === 'lastmonth' ? 'sub' : dayItem.class === 'nextmonth' ? 'plus' : '';
        const [year, month] = type !== '' ? this.updateMonth(this.year, this.month, 1, type) : [this.year, this.month];

        this.$emit('rangeChange', {
          rangeObj: {
            endDate: new Date(year, month, dayItem.day).format(this.pattern),
            selecting: true
          }
        });
      }
    },
    isDateDisabled (item) {
      const months = 12;
      const isPrevMonthValid = item.class === 'lastmonth' &&
        !this.isSelectedMonth((this.month - 1) % months);
      const isNextMonthValid = item.class === 'nextmonth' &&
        !this.isSelectedMonth((this.month + 1) % months);
      const isCurMonthValid = item.class === 'curmonth' &&
        ((this.year === this.minYear && this.month === this.minMonth &&
        item.day < this.minDay) || (this.year === this.maxYear &&
        this.month === this.maxMonth && item.day > this.maxDay));
      return isCurMonthValid || isPrevMonthValid || isNextMonthValid
    },
    isSelectedDate (item) {
      const isCurMonth = item.class === 'curmonth';
      const isRange = this.type === 'range';
      const currentDate = new Date(this.year, this.month, item.day).format(this.pattern);
      const isSelectedDay = currentDate === new Date(this.year, this.month, this.day).format(this.pattern);
      const isStart = currentDate === this.start;
      const isEnd = currentDate === this.end;
      const isHoverDate = currentDate === this.rangeObj.endDate;
      return isCurMonth && ((!isRange && isSelectedDay) ||
        (isRange && (isStart || isEnd || (!(this.start && this.end) && isHoverDate))))
    },
    markRange (item) {
      let start = '';
      let end = '';
      let selecting = true;
      const type = item.class === 'lastmonth' ? 'sub' : item.class === 'nextmonth' ? 'plus' : '';
      const [year, month] = type !== '' ? this.updateMonth(this.year, this.month, 1, type) : [this.year, this.month];
      const day = item.day;
      if (this.start && this.end) {
        start = new Date(year, month, day).format(this.pattern);
        selecting = false;
      } else if (!this.start && !this.end) {
        start = new Date(year, month, day).format(this.pattern);
      } else if (this.start && !this.end) {
        const startDate = new Date(year, month, day);
        start = new Date(this.start).getTime() > startDate.getTime() ? startDate.format(this.pattern) : this.start;
        end = new Date(this.start).getTime() > startDate.getTime() ? this.start : startDate.format(this.pattern);
      } else if (!this.start && this.end) {
        const endDate = new Date(year, month, day);
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
    selectDay (item) {
      if (this.isDateDisabled(item)) {
        return
      }
      const canSelPrevMonthDay = item.class === 'lastmonth' &&
        !(this.prevMonth() === false);
      const canSelNextMonthDay = item.class === 'nextmonth' &&
        !(this.nextMonth() === false);
      const isCurrentMonth = item.class === 'curmonth';

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

var $1_6 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"c-calendar",class:_vm.className},[_c('c-dateheader',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.year,"month":_vm.month,"monthsShow":_vm.monthsShow},on:{"monthchange":_vm.monthchange,"yearchange":_vm.yearchange,"monthshow":_vm.monthTableShow}}),_c('div',{staticClass:"c-calendar__body"},[(_vm.monthsShow)?_c('c-monthtable',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.year,"month":_vm.month},on:{"change":_vm.selectMonth}}):_vm._e(),(!_vm.monthsShow)?_c('c-datetable',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.year,"month":_vm.month,"day":_vm.day},on:{"monthchange":_vm.monthchange,"yearchange":_vm.yearchange,"change":_vm.selectDay}}):_vm._e()],1)],1)},staticRenderFns: [],
  name: 'c-calendar',
  props: {
    value: String,
    size: String,
    type: String,
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
      type: String
    }
  },
  mixins: [Mixin],
  data () {
    return {
      date: '',
      year: 1970,
      month: 1,
      day: 1,
      monthsShow: false
    }
  },
  computed: {
    className () {
      return this.size ? `is-${this.size}` : 'md'
    },
    format () {
      return this.pattern ? this.pattern : this.type === 'month' ? 'yyyy-MM' : 'yyyy-MM-dd'
    }
  },
  created () {
    this.syncDate();
  },
  watch: {
    value () {
      this.syncDate();
    },
    show (newVal) {
      newVal && this.syncDate();
    },
    type (newVal) {
      this.monthsShow = newVal === 'month';
    }
  },
  methods: {
    syncDate () {
      if (this.type === 'month') {
        this.monthsShow = true;
      }
      this.date = this.value || new Date().format(this.format);
      // this.date = this.value || this.date || new Date().format(this.format)
      if (new Date(this.date) > new Date(this.maxDate)) this.date = this.maxDate;
      if (new Date(this.date) < new Date(this.minDate)) this.date = this.minDate;
      this.date = new Date(this.date).format(this.format);
      const d = new Date(this.date);
      if (!isNaN(d.getTime())) {
        this.year = d.getFullYear();
        this.month = d.getMonth();
        this.day = this.type === 'month' ? '' : d.getDate();
      }
    },
    selectDay (day) {
      this.day = day;
      const date = `${this.year}-${this.fixZero(this.month + 1)}-${this.fixZero(this.day)}`;
      this.date = new Date(date).format(this.format);
      this.$emit('update', this.date);
    },
    selectMonth (month) {
      this.monthsShow = this.type === 'month';
      this.month = month;
      this.day = '';
      if (this.type === 'month') {
        const date = `${this.year}-${this.fixZero(this.month + 1)}`;
        this.date = new Date(date).format(this.format);
        this.$emit('update', this.date);
      }
    },
    monthchange (month) {
      this.month = month;
    },
    yearchange (year) {
      this.year = year;
    },
    monthTableShow (show) {
      this.monthsShow = show;
    },
    updateDay (num, type) {
      this.monthsShow = false;
      let date = new Date(this.year, this.month, this.day);
      type === 'plus' && date.setDate(date.getDate() + num);
      type === 'sub' && date.setDate(date.getDate() - num);
      if (new Date(date) > new Date(this.maxDate)) date = this.maxDate;
      if (new Date(date) < new Date(this.minDate)) date = this.minDate;
      this.$emit('update', new Date(date).format(this.format), true);
    },
    updateMonthBykeydown (num, type) {
      const [year, month] = this.updateMonth(this.year, this.month, num, type);
      this.$emit('update', new Date(year, month).format(this.format), true);
    }
  }
}

var $1_7 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"c-calendar__month-table"},[_c('tbody',_vm._l((_vm.monthRows),function(monthRow){return _c('tr',_vm._l((monthRow),function(item){return _c('td',{on:{"click":function($event){_vm.selectMonth(item);}}},[_c('a',{staticClass:"month-cell",class:{'disabled': !_vm.isSelectedMonth(item), 'active':_vm.isSelectedMonth(item) && item === _vm.month}},[_vm._v(_vm._s(_vm.mapMonth(item)))])])}))}))])},staticRenderFns: [],
  name: 'c-monthtable',
  props: {
    month: [Number, String],
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
    monthRows () {
      const deps = 3;
      const rows = [];
      for (let i = 0; i < this.months.length; i += deps) {
        const getRowArr = (N) => {
          return Array.from(new Array(N), (val, index) => index + i)
        };
        rows.push(getRowArr(deps));
      }
      return rows
    },
    minYear () {
      return new Date(this.minDate).getFullYear()
    },
    maxYear () {
      return new Date(this.maxDate).getFullYear()
    },
    minMonth () {
      return new Date(this.minDate).getMonth()
    },
    maxMonth () {
      return new Date(this.maxDate).getMonth()
    }
  },
  data () {
    return {
      months: [
        '一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
      ]
    }
  },
  methods: {
    selectMonth (month) {
      if (!this.isSelectedMonth(month)) return
      this.$emit('change', month);
    },
    mapMonth (month) {
      return this.months[month]
    }
  }
}

var $1_8 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-card",class:{'is-horizontal': _vm.horizontal}},[(_vm.$slots.title)?_c('div',{staticClass:"c-card__title"},[_vm._t("title")],2):_vm._e(),(_vm.$slots.media)?_c('div',{staticClass:"c-card__media"},[_vm._t("media")],2):_vm._e(),(_vm.$slots.default)?_c('div',{staticClass:"c-card__body"},[_vm._t("default")],2):_vm._e(),(_vm.$slots.actions)?_c('div',{staticClass:"c-card__actions"},[_vm._t("actions")],2):_vm._e()])},staticRenderFns: [],
  name: 'c-card',
  props: {
    horizontal: Boolean
  },
  data () {
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
      default () {
        return {
          label: [],
          value: []
        }
      }
    },
    options: {
      type: Array,
      default () {
        return []
      }
    },
    loadChildren: {
      type: Function,
      default: null
    }
  },
  inject: ['$cascader'],
  data () {
    return {
      optionList: [],
      childrenOptions: [],
      currentParentMenu: {
        label: [],
        value: []
      }
    }
  },
  created () {
    this.resetOptionSelected();
    this.currentParentMenu = JSON.parse(JSON.stringify(this.parentMenu));
  },
  watch: {
    parentMenu () {
      this.childrenOptions = [];
    },
    options: {
      handler () {
        this.resetOptionSelected();
        if (this.parentMenu.label.length) {
          this.$nextTick(_ => {
            const activeOption = this.optionList.find(
              option => option[this.labelKey] === this.parentMenu.label[0]);
            if (!this.childrenOptions.length &&
              this.hasChildren(activeOption) &&
              activeOption[this.childrenKey]) {
              this.childrenOptions = activeOption[this.childrenKey];
            }
          });
        }
      },
      deep: true
    }
  },
  methods: {
    resetOptionSelected () {
      const options = JSON.parse(JSON.stringify(this.options));
      this.optionList = options.map(item => {
        this.$set(item, 'selected', false);
        return item
      });
      if (this.$cascader.value.length) {
        const selectedItem = this.optionList.find(
          option => option[this.valueKey] === this.$cascader.value[this.level]);
        selectedItem && this.$set(selectedItem, 'selected', true);
        if (selectedItem && this.hasChildren(selectedItem)) {
          this.childrenOptions = selectedItem[this.childrenKey];
        }
      }
    },
    hasChildren (item) {
      return item && item.hasOwnProperty(this.childrenKey)
    },
    updateShowValue (item) {
      this.$cascader.showValue = this.showAllLevel
        ? this.currentParentMenu.label.join(this.separator)
        : item[this.labelKey];
      this.$cascader.onChange(JSON.parse(
        JSON.stringify(this.currentParentMenu)));
    },
    onMenuClick (item) {
      if (item.disabled) return
      this.optionList.map(item => {
        this.$set(item, 'selected', false);
        return item
      });
      const { label, value } = this.parentMenu;
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

var $1_9 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-cascader",on:{"click":function($event){_vm.isOpen = true;}}},[_c('div',{staticClass:"cascader-context"},[_c('c-input',{attrs:{"placeholder":_vm.placeholder,"width":"normal","size":_vm.size,"disabled":_vm.disabled},model:{value:(_vm.showValue),callback:function ($$v) {_vm.showValue=$$v;},expression:"showValue"}}),_c('c-icon',{staticClass:"c-cascader__icon",attrs:{"name":"chevron-down"}})],1),_c('div',{staticClass:"cascader-dropmenu",class:_vm.className},[(_vm.isOpen)?[_c('c-cascader-menu',{attrs:{"parentMenu":_vm.parentMenu,"options":_vm.optionList,"labelKey":_vm.labelKey,"valueKey":_vm.valueKey,"childrenKey":_vm.childrenKey,"showAllLevel":_vm.showAllLevel,"changeOnSelect":_vm.changeOnSelect,"loadChildren":_vm.loadChildren}})]:_vm._e()],2)])},staticRenderFns: [],
  name: 'c-cascader',
  components: {
    'c-cascader-menu': Menu
  },
  provide () {
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
      default () {
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
    className () {
      return this.size ? `is-${this.size}` : 'md'
    }
  },
  data () {
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
  created () {
    this.optionList = [...this.options];
  },
  mounted () {
    if (typeof document === 'object') {
      this.cascaderMenu = document.querySelector('.cascader-dropmenu');
      document.body.appendChild(this.cascaderMenu);
      this.resize();
    }
    window.addEventListener('resize', this.resize, false);
  },
  beforeDestroy () {
    this.cascaderMenu.remove();
    window.removeEventListener('resize', this.resize, false);
  },
  watch: {
    options: {
      handler () {
        this.optionList = [...this.options];
      },
      deep: true
    },
    value (newVal) {
      const labels = this.getLabelWithValue(this.value);
      this.showValue = this.showAllLevel
        ? labels.join(this.separator)
        : labels[labels.length - 1];
    },
    isOpen () {
      if (this.isOpen) {
        this.resize();
        window.addEventListener('click', this.onBodyClick, true);
      } else {
        window.removeEventListener('click', this.onBodyClick, true);
      }
    }
  },
  methods: {
    close () {
      this.isOpen = false;
    },
    onChange (selectMenu) {
      this.$emit('input', selectMenu.value);
      this.$emit('change', selectMenu);
    },
    getLabelWithValue (value) {
      const labels = [];
      value.reduce((result, item) => {
        const resultTarget = result.find(data => data[this.valueKey] === item);
        const { label } = resultTarget;
        const children = resultTarget[this.childrenKey];
        labels.push(label);
        if (children && children.length) {
          return children
        }
        return result
      }, this.optionList);
      return labels
    },
    onBodyClick (e) {
      const isInCascader = this.$el.contains(e.target);
      const isInCascaderMenu = this.cascaderMenu.contains(e.target);
      if (!isInCascader && !isInCascaderMenu) {
        this.close();
        this.$el.focus();
      }
    },
    getStyle () {
      const clientRect = this.$el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const marginTop = 2;
      const scrollBarWidth = 20;
      const scrollHeight =
        document.body.scrollWidth > window.innerWidth ? scrollBarWidth : 0;
      const droplistHeight = this.cascaderMenu.clientHeight;
      const defaultTop =
        clientRect.top + clientRect.height + marginTop + window.pageYOffset;
      const clientHeight = clientRect.height + marginTop;

      const clientY = clientRect.y;
      const compTop = windowH - droplistHeight - scrollHeight;
      const left = clientRect.left + window.pageXOffset;
      const top =
        droplistHeight + clientHeight + clientY + scrollHeight > windowH
          ? compTop
          : defaultTop;
      return `
        position: absolute;
        top: ${top}px;
        left: ${left}px;
        z-index: 9;
      `
    },
    resize () {
      this.$nextTick(() => {
        this.cascaderMenu.style.cssText = this.getStyle();
      });
    }
  }
}

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
/**
 * 是否 Promise
 */

function isPromise(p) {
  return _typeof(p) === 'object' && typeof p.then === 'function';
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
   * @param context {Object} 触发验证的Vue组件
   * @return {Object} 结果对象，有valid和msg两个字段
   */

};

function validate(value) {
  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var context = arguments.length > 2 ? arguments[2] : undefined;
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
    return checkSingleRule(ruleName, rules[ruleName], value, msg, context);
  });
  var hasAsync = results.some(isPromise);

  var getResult = function getResult(results) {
    var failedResult = results.find(function (result) {
      return !result.valid;
    });
    return failedResult || pass;
  };

  if (hasAsync) return Promise.all(results).then(getResult);
  return getResult(results);
}
/**
 * 验证单条规则
 */


function checkSingleRule(ruleName, param, value, msg, context) {
  var validFunction = typeof param === 'function' ? param : ruleset[ruleName];
  var result = validFunction.call(context, value, param);

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
    },
    validateThrottle: {
      type: Number,
      default: 0
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
      isValidatable: true,
      // id of the latest validation
      validationId: 0
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
        this.throttledValidate();
      }
    },
    validateThrottle: {
      immediate: true,
      handler: function handler(duration) {
        if (!duration) this.throttledValidate = this.validate;
        this.throttledValidate = throttle(this.validate, duration, {
          trailing: true
        });
      }
    }
  },
  methods: {
    validate: function validate() {
      var _this = this;

      this.validity.dirty = true;
      var $formItem = this.$formItem,
          builtinRules = this.builtinRules;
      var required = $formItem && !this.$parent.isValidatable && $formItem.required;
      var rules = Object.assign({
        required: required
      }, builtinRules, this.rules);
      if (!rules.msg) rules.msg = {};

      if (_typeof(rules.msg) === 'object' && !rules.msg.required) {
        var label = $formItem && $formItem.label ? $formItem.label : '';
        var action = this.$options.name === 'c-input' ? '填写' : '选择';
        rules.msg.required = "\u8BF7".concat(action).concat(label.replace(/[:：]/, ''));
      }

      var result = Validator.validate(this.value, rules, this);

      var setValidity = function setValidity(v) {
        return Object.assign(_this.validity, v);
      };

      var isLatest = function isLatest(id) {
        return _this.validationId === id;
      };

      {
        this.validationId++;
        var validationId = this.validationId;

        if (isPromise(result)) {
          result.then(function (v) {
            if (isLatest(validationId)) setValidity(v);
          });
        } else {
          setValidity(result);
        }
      }
      return result;
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

const name$1 = 'c-checkbox-group';
const pass = { valid: true, msg: '' };

// 最少选择X项
const minItems = function (value) {
  if (!this.minItems) return pass
  const valid = Array.isArray(value) && value.length >= this.minItems;
  const msg = valid ? '' : `请至少选择${this.minItems}项`;
  return { valid, msg }
};

// 最多选择X项
const maxItems = function (value) {
  if (!this.maxItems) return pass
  const valid = Array.isArray(value) && value.length <= this.maxItems;
  const msg = valid ? '' : `最多可以选择${this.maxItems}项`;
  return { valid, msg }
};

const props$1 = {
  value: {
    type: Array,
    default () { return [] }
  },
  minItems: Number,
  maxItems: Number,
  options: {
    type: Array,
    required: true,
    default () { return [] }
  }
};

var $1_11 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-checkbox-group"},[_vm._l((_vm.optionList),function(option,index){return _c('c-checkbox',{key:index,attrs:{"label":option.label,"disabled":option.disabled},on:{"change":function($event){_vm.onItemChange($event, index);}},model:{value:(_vm.isChecked[index]),callback:function ($$v) {_vm.$set(_vm.isChecked, index, $$v);},expression:"isChecked[index]"}})}),(!_vm.validity.valid)?_c('em',{staticClass:"c-error-msg"},[_vm._v(_vm._s(_vm.validity.msg))]):_vm._e()],2)},staticRenderFns: [],
  name: name$1,
  model: {
    event: 'change'
  },
  props: props$1,
  mixins: [validatable],
  inject: {
    $form: { default: null }
  },
  data () {
    return {
      isChecked: []
    }
  },
  computed: {
    optionList () {
      return this.options.map(item => {
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
  created () {
    Object.assign(this.rules, {
      minItems: minItems.bind(this),
      maxItems: maxItems.bind(this)
    });
    this.updateChecked();
    this.$watch('options', this.updateChecked);
    this.$watch('value', this.updateChecked);
  },
  methods: {
    updateChecked () {
      const isChecked = this.optionList.map(option => {
        return this.value.indexOf(option.value) > -1
      });
      this.isChecked = isChecked;
    },

    onItemChange (checked, index) {
      const isChecked = [...this.isChecked];
      isChecked[index] = checked;

      const checkedValues = this.optionList
        .filter((_, i) => isChecked[i])
        .map(option => option.value);

      this.$emit('change', checkedValues);
    }
  }
}

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

const name$2 = 'c-checkbox';
const props$2 = {
  value: Boolean,
  name: String,
  label: String,
  disabled: Boolean,
  size: String,
  indeterminate: Boolean
};

var $1_12 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"c-checkbox",class:_vm.classNames,on:{"change":_vm.onChange}},[_c('input',{ref:"input",attrs:{"type":"checkbox","name":_vm.name,"disabled":_vm.disabled},domProps:{"checked":_vm.value}}),_c('span',{staticClass:"c-checkbox__box"}),_c('span',{staticClass:"c-checkbox__label"},[_vm._v(_vm._s(_vm.label))])])},staticRenderFns: [],
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
    classNames () {
      const { size, $form } = this;
      const actualSize = size || ($form && $form.size);
      return actualSize ? `is-${actualSize}` : ''
    }
  },
  watch: {
    indeterminate (newVal) {
      if (this.$refs.input) {
        this.$refs.input.indeterminate = Boolean(newVal);
      }
    }
  },
  mounted () {
    if (this.$refs.input) {
      this.$refs.input.indeterminate = this.indeterminate;
    }
  },
  methods: {
    onChange (e) {
      this.$emit('change', e.target.checked);
    }
  }
}

var $1_13 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-chip__wrapper",class:_vm.classNames,style:(_vm.styleObj)},[(_vm.label)?_c('span',{staticClass:"c-chip__label"},[_vm._v(_vm._s(_vm.label))]):_vm._t("default"),(_vm.closable)?_c('span',{on:{"click":function($event){$event.stopPropagation();_vm.$emit('close');}}},[_c('c-icon',{attrs:{"name":"x","valign":"middle"}})],1):_vm._e()],2)},staticRenderFns: [],
  name: 'c-chip',
  props: {
    label: VueTypes.string,
    size: VueTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).def('md'),
    color: VueTypes.string,
    closable: VueTypes.bool.def(false)
  },
  data () {
    return {
      presetColors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'indigo', 'purple', 'pink', 'dark', 'black']
    }
  },
  computed: {
    classNames () {
      let classList = ``;
      if (this.color && this.presetColors.indexOf(this.color) >= 0) {
        classList += ` c-chip--${this.color}`;
      }
      if (this.closable) {
        classList += ' c-chip--closable';
      }
      if (this.size) {
        classList += ` c-chip--${this.size}`;
      }
      return classList
    },
    styleObj () {
      let style = {};
      if (this.color && this.presetColors.indexOf(this.color) < 0) {
        style = {
          'backgroundColor': this.color
        };
      }
      return style
    }
  }
}

var start = 1992;
var zIndex = {
  next: function next() {
    return start++;
  }
};

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
const sizeMap = {
  'xs': 12,
  'sm': 18,
  'md': 24,
  'lg': 28,
  'xl': 36
};

var $1_14 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.inline)?_c('color-picker',{attrs:{"color":_vm.value},on:{"change":_vm.handleChange}}):_c('div',{staticClass:"color-picker__wrapper"},[_c('c-portal',[_c('transition',{on:{"before-enter":_vm.beforeEnter,"enter":_vm.enter,"after-enter":_vm.afterEnter,"leave":_vm.leave,"after-leave":_vm.afterLeave}},[_c('color-picker',{directives:[{name:"show",rawName:"v-show",value:(_vm.panelVisible),expression:"panelVisible"}],ref:"panel",staticClass:"color-picker__pane--portal",attrs:{"color":_vm.value},on:{"change":_vm.handleChange}})],1)],1),_c('div',{ref:"trigger",staticClass:"color-picker__trigger",style:(_vm.triggerStyle),on:{"click":_vm.showColorPane}})],1)},staticRenderFns: [],
  name: 'c-color-picker',
  props: {
    value: VueTypes.string.def('#ff0000'),
    mode: VueTypes.oneOf([
      'rgb',
      'hsl',
      'hex'
    ]).def('hex'),
    inline: VueTypes.bool.def(false),
    size: VueTypes.oneOf(sizes)
  },
  inject: {
    $form: { default: null }
  },
  mixins: [resettable],
  model: {
    event: 'change'
  },

  components: {
    'color-picker': ColorPicker
  },

  data () {
    return {
      color: this.value,
      rgba: [],
      panelVisible: false,
      tidIn: null,
      tidOut: null
    }
  },

  computed: {
    triggerStyle () {
      const { size, $form, literal, borderColor } = this;
      const sz = size || ($form && $form.size) || 'md';
      const s = `${sizeMap[sz]}px`;

      return {
        width: s,
        height: s,
        backgroundColor: literal,
        borderColor
      }
    },
    borderColor () {
      const [r, g, b] = this.rgba;
      if ((r + g + b) / 3 > 235) {
        return `rgba(160,160,160,0.8)`
      }
      return 'transparent'
    }
  },

  watch: {
    mode (newVal) {
      if (this.__val) {
        this.handleChange(this.__val);
      }
    }
  },

  methods: {
    handleChange (e) {
      const { rgba, hex, hsla } = e;
      const { mode } = this;
      let val = '';

      if (mode === 'hex') {
        val = hex;
      } else if (mode === 'hsl') {
        val = `hsla(${hsla.join(', ')})`;
      } else {
        val = `rgba(${rgba.join(', ')})`;
      }

      this.__val = e;
      this.rgba = rgba;
      this.literal = val;
      this.$emit('change', val);
    },

    showColorPane () {
      this.clearTimeout();
      this.panelVisible = true;
    },

    hideColorPane () {
      this.clearTimeout();
      this.tidOut = setTimeout(() => {
        this.panelVisible = false;
      }, 100);
    },

    resize () {
      if (this.inline === false) {
        this.handleResize(this.$refs.panel.$el);
      }
    },

    beforeEnter ({ style }) {
      style.display = 'block';
      style.visibility = 'hidden';
      style.zIndex = zIndex.next();
    },

    enter ({ style }, done) {
      style.opacity = 0;

      this.tidIn = setTimeout(() => {
        style.visibility = 'visible';
        style.opacity = 1;
        this.$nextTick(done);
      }, 100);
    },

    afterEnter (el) {
      this.handleResize(el);
    },

    leave ({ style }) {
      style.opacity = 0;
      style.visibility = 'hidden';
      this.clearTimeout();
    },

    afterLeave ({ style }) {
      style.cssText = '';
      style.display = 'none';
    },

    clearTimeout () {
      clearTimeout(this.tidOut);
      clearTimeout(this.tidIn);
    },

    handleResize (el) {
      const { style } = el;
      const { scrollLeft, scrollTop } = document.scrollingElement || document.body;

      const { trigger } = this.$refs;
      const triggerRect = trigger.getBoundingClientRect();

      const left = scrollLeft + triggerRect.left -
        triggerRect.width / 2;
      const top = scrollTop + triggerRect.top + triggerRect.height;

      style.position = 'absolute';
      style.marginTop = '6px';
      style.top = `${top}px`;
      style.left = `${left}px`;
    },

    clickOutside ({ target }) {
      if (this.inline || !this.panelVisible) {
        return
      }

      const { trigger, panel } = this.$refs;
      const isOutside = !contains(trigger, target) &&
        !contains(panel.$el, target);

      if (isOutside) {
        this.hideColorPane();
      }
    }
  },

  mounted () {
    this.resize = this.resize.bind(this);
    this.clickOutside = this.clickOutside.bind(this);
    this.winResize = throttle(this.resize, this.$clair.defaultThrottleTime);
    window.addEventListener('resize', this.winResize);
    document.body.addEventListener('click', this.clickOutside);
  },

  beforeDestroy () {
    this.clearTimeout();
    window.removeEventListener('resize', this.winResize);
    document.body.removeEventListener('click', this.clickOutside);
  }
}

var $1_15 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"c-datepicker__range",class:_vm.className},[_c('div',{staticClass:"c-datepicker__content c-calendar"},[_c('c-dateheader',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.startMaxDate,"year":_vm.startYear,"month":_vm.startMonth,"monthsShow":_vm.startMonthsShow},on:{"monthchange":_vm.startMonthChange,"yearchange":_vm.startYearChange,"monthshow":_vm.startMonthTableShow}}),_c('div',{staticClass:"c-calendar__body"},[(_vm.startMonthsShow)?_c('c-monthtable',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.startMaxDate,"year":_vm.startYear,"month":_vm.startMonth},on:{"change":_vm.startSelectMonth}}):_vm._e(),(!_vm.startMonthsShow)?_c('c-datetable',{attrs:{"type":"range","minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.startYear,"month":_vm.startMonth,"day":_vm.startDay,"start":_vm.start,"end":_vm.end,"range-obj":_vm.rangeObj},on:{"monthchange":_vm.startMonthChange,"yearchange":_vm.startYearChange,"change":_vm.selectDay,"rangeChange":_vm.onRangeChange}}):_vm._e()],1)],1),_c('div',{staticClass:"c-datepicker__content c-calendar"},[_c('c-dateheader',{attrs:{"minDate":_vm.endMinDate,"maxDate":_vm.maxDate,"year":_vm.endYear,"month":_vm.endMonth,"monthsShow":_vm.endMonthsShow},on:{"monthchange":_vm.endMonthChange,"yearchange":_vm.endYearChange,"monthshow":_vm.endMonthTableShow}}),_c('div',{staticClass:"c-calendar__body"},[(_vm.endMonthsShow)?_c('c-monthtable',{attrs:{"minDate":_vm.endMinDate,"maxDate":_vm.maxDate,"year":_vm.endYear,"month":_vm.endMonth},on:{"change":_vm.endSelectMonth}}):_vm._e(),(!_vm.endMonthsShow)?_c('c-datetable',{attrs:{"type":"range","minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.endYear,"month":_vm.endMonth,"day":_vm.endDay,"start":_vm.start,"end":_vm.end,"range-obj":_vm.rangeObj},on:{"monthchange":_vm.endMonthChange,"yearchange":_vm.endYearChange,"change":_vm.selectDay,"rangeChange":_vm.onRangeChange}}):_vm._e()],1)],1),_c('p',{staticClass:"c-datepicker__text"},[_vm._v(_vm._s(_vm.start)+" 至 "+_vm._s(_vm.end))]),_c('div',{staticClass:"c-datepicker__btns"},[_c('c-button',{attrs:{"size":"sm","outline":"","primary":""},on:{"click":_vm.confirmRange}},[_vm._v("确定")]),_c('c-button',{attrs:{"size":"sm","outline":""},on:{"click":_vm.cancel}},[_vm._v("取消")])],1)])},staticRenderFns: [],
  name: 'c-daterange',
  props: {
    value: [Array, String],
    size: String,
    show: Boolean,
    type: {
      type: String,
      default: 'date'
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
      type: String
    }
  },
  mixins: [Mixin],
  data () {
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
      },
      format: ''
    }
  },
  created () {
    const [start, end] = this.value;
    this.start = start || '';
    this.end = end || '';
    this.startMonthsShow = this.isMonthRange;
    this.endMonthsShow = this.isMonthRange;
    this.updateDate();
    this.format = this.pattern ? this.pattern : this.isMonthRange ? 'yyyy-MM' : 'yyyy-MM-dd';
  },
  watch: {
    show (newVal) {
      this.resetDate();
    },
    value (newVal) {
      this.resetDate();
    }
  },
  computed: {
    isMonthRange () {
      return this.type === 'month'
    },
    className () {
      return this.size ? `is-${this.size}` : 'md'
    },
    startMaxDate () {
      return new Date(this.endYear, this.endMonth, 0).format(this.format)
    },
    endMinDate () {
      return new Date(this.startYear, this.startMonth + 1, 1).format(this.format)
    }
  },
  methods: {
    resetDate () {
      const [start, end] = this.value;
      this.start = start;
      this.end = end;
      this.rangeObj = {
        endDate: '',
        selecting: true
      };
      this.updateDate();
    },
    updateDate () {
      const [startYear, startMonth, startDay] = this.syncDate(this.start);
      if (!this.start) {
        this.startYear = new Date().getFullYear();
        this.startMonth = new Date().getMonth();
        this.startDay = '';
      } else {
        this.startYear = startYear;
        this.startMonth = startMonth;
        this.startDay = startDay;
      }
      const [endYear, endMonth, endDay] = this.syncDate(this.end);
      this.endYear = endYear || this.startYear;

      if (endMonth === this.startMonth) {
        [this.endYear, this.endMonth] = this.updateMonth(this.endYear, endMonth, 1, 'plus');
      } else if (!endMonth) {
        [this.endYear, this.endMonth] = this.updateMonth(this.endYear, this.startMonth, 1, 'plus');
      } else {
        this.endMonth = endMonth;
      }

      this.endDay = endYear === this.startYear && endMonth === this.startMonth ? '' : endDay;
    },
    onRangeChange (obj) {
      this.rangeObj = obj.rangeObj;
    },
    syncDate (time) {
      const d = new Date(time);
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
    startMonthChange (month) {
      this.startMonth = month;
    },
    startYearChange (year) {
      this.startYear = year;
    },
    startMonthTableShow (show) {
      this.startMonthsShow = show;
    },
    startSelectMonth (month) {
      this.startMonthsShow = this.isMonthRange;
      this.startMonth = month;
      this.startDay = '';
      if (this.isMonthRange) {
        this.start = new Date(this.startYear, this.startMonth).format(this.format);
        this.updateDate();
      }
    },
    selectDay (dateObj) {
      this.start = dateObj.start;
      this.end = dateObj.end;
      this.updateDate();
    },
    endMonthChange (month) {
      this.endMonth = month;
    },
    endYearChange (year) {
      this.endYear = year;
    },
    endMonthTableShow (show) {
      this.endMonthsShow = show;
    },
    endSelectMonth (month) {
      this.endMonthsShow = this.isMonthRange;
      this.endMonth = month;
      this.endDay = '';
      if (this.isMonthRange) {
        this.end = new Date(this.endYear, this.endMonth).format(this.format);
        this.updateDate();
      }
    },
    cancel () {
      [this.start, this.end] = this.value;
      this.$emit('change', this.value);
    },
    confirmRange () {
      this.end = this.end || this.rangeObj.endDate;
      this.$emit('change', [this.start, this.end]);
    }
  }
}

var $1_16 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-datepicker",on:{"click":_vm.open}},[(_vm.date != '' || _vm.daterange != '')?_c('div',{staticClass:"c-datepicker__icon c-datepicker__hovericon",class:_vm.className,on:{"click":_vm.resetDate}},[_c('c-icon',{attrs:{"name":"x-circle"}})],1):_vm._e(),_c('div',{staticClass:"c-datepicker__icon",attrs:{"clas":_vm.className}},[_c('c-icon',{attrs:{"name":"calendar"}})],1),(_vm.type == 'daterange' || _vm.type == 'monthrange')?_c('c-input',{attrs:{"placeholder":_vm.placeholder,"disabled":_vm.disabled,"width":"normal","size":_vm.size},on:{"change":_vm.dateChange},nativeOn:{"focusin":function($event){return _vm.open($event)},"focusout":function($event){return _vm.onBlur($event)}},model:{value:(_vm.daterange),callback:function ($$v) {_vm.daterange=$$v;},expression:"daterange"}}):(_vm.type == 'date' || _vm.type == 'month')?_c('c-input',{attrs:{"size":_vm.size,"width":"normal","placeholder":_vm.placeholder,"disabled":_vm.disabled},on:{"change":_vm.dateChange},nativeOn:{"focusin":function($event){return _vm.open($event)},"focusout":function($event){return _vm.onBlur($event)},"keydown":function($event){return _vm.onKeyDown($event)}},model:{value:(_vm.date),callback:function ($$v) {_vm.date=$$v;},expression:"date"}}):_vm._e(),_c('div',{staticClass:"c-datepicker__panel"},[(_vm.type == 'date' || _vm.type == 'month')?_c('c-calendar',{ref:"calendar",attrs:{"type":_vm.type,"pattern":_vm.datePattern,"value":_vm.date,"show":_vm.isOpen,"size":_vm.size,"minDate":_vm.minDate,"maxDate":_vm.maxDate},on:{"update":_vm.setDate}}):_vm._e(),(_vm.type == 'daterange')?_c('div',{staticClass:"c-datepicker__body"},[_c('c-daterange',{attrs:{"value":_vm.date,"size":_vm.size,"show":_vm.isOpen},on:{"change":_vm.setDateRange}})],1):_vm._e(),(_vm.type == 'monthrange')?_c('div',{staticClass:"c-datepicker__body"},[_c('c-daterange',{attrs:{"value":_vm.date,"size":_vm.size,"show":_vm.isOpen,"type":"month"},on:{"change":_vm.setDateRange}})],1):_vm._e()],1)],1)},staticRenderFns: [],
  name: 'c-datepicker',
  model: {
    event: 'change'
  },
  mixins: [resettable, validatable],
  props: {
    value: {
      type: [String, Array],
      default () {
        return ''
      }
    },
    pattern: {
      type: String
    },
    size: String,
    disabled: Boolean,
    type: {
      /* date, daterange, month */
      type: String,
      default: 'date'
    },
    placeholder: String,
    minDate: String,
    maxDate: String
  },

  computed: {
    className () {
      return this.size ? `is-size-${this.size}` : ''
    },
    daterange () {
      if (this.type.indexOf('range') === -1) return []
      const [start, end] = this.date;
      return !start && !end ? '' : `${start} 至 ${end}`
    },
    datePattern () {
      return this.pattern ? this.pattern : this.type === 'month' ? 'yyyy-MM' : 'yyyy-MM-dd'
    }
  },

  data () {
    return {
      date: '',
      datepickerPanel: '',
      isOpen: false,
      mousedownInPanel: false
    }
  },

  beforeDestroy () {
    this.datepickerPanel.remove();
    window.removeEventListener('resize', this.resize, false);
  },

  watch: {
    isOpen () {
      if (this.isOpen) {
        this.resize();
        window.addEventListener('mousedown', this.onMouseDown, true);
        window.addEventListener('mouseup', this.onMouseUp, true);
      } else {
        window.removeEventListener('mousedown', this.onMouseDown, true);
        window.removeEventListener('mouseup', this.onMouseUp, true);
      }
    },
    value (newVal) {
      if (newVal !== this.date) {
        this.date = newVal;
      }
    }
  },

  created () {
    this.date = this.value;
  },

  mounted () {
    if (typeof document === 'object') {
      this.datepickerPanel = this.$el.querySelector('.c-datepicker__panel');
      document.body.appendChild(this.datepickerPanel);
      this.resize();
      window.addEventListener('resize', this.resize, false);
    }
  },
  methods: {
    open (e) {
      const hoverIcon = this.$el.querySelector('.c-datepicker__hovericon');
      const isHoverIcon = hoverIcon && hoverIcon.contains(e.target);
      if (this.disabled || isHoverIcon) return
      this.isOpen = true;
    },
    close () {
      this.isOpen = false;
    },
    onBlur (e) {
      const focused = e.relatedTarget;
      if (this.mousedownInPanel) return
      if (focused) this.close();
    },
    onMouseDown (e) {
      const isInPicker = this.$el.contains(e.target);
      const isInPanel = this.datepickerPanel.contains(e.target);
      this.mousedownInPanel = isInPanel || isInPicker;
    },
    onMouseUp (e) {
      this.mousedownInPanel = false;
      this.onBodyClick(e);
    },
    onKeyDown (e) {
      if (this.type === 'daterange') return
      const keys = {
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      };
      const { keyCode } = e;
      if (keyCode === keys.ESC) this.close();
      const { calendar } = this.$refs;
      const date = new Date(calendar.year, calendar.month, calendar.day).format(this.datePattern);
      if (keyCode === keys.ENTER && this.type === 'date') {
        this.setDate(date);
      }
      if (keyCode === keys.UP) {
        this.type === 'date' && this.$refs.calendar.updateDay(7, 'sub');
        this.type === 'month' && this.$refs.calendar.updateMonthBykeydown(3, 'sub');
      } else if (keyCode === keys.DOWN) {
        this.type === 'date' && this.$refs.calendar.updateDay(7, 'plus');
        this.type === 'month' && this.$refs.calendar.updateMonthBykeydown(3, 'plus');
      } else if (keyCode === keys.LEFT) {
        this.type === 'date' && this.$refs.calendar.updateDay(1, 'sub');
        this.type === 'month' && this.$refs.calendar.updateMonthBykeydown(1, 'sub');
      } else if (keyCode === keys.RIGHT) {
        this.type === 'date' && this.$refs.calendar.updateDay(1, 'plus');
        this.type === 'month' && this.$refs.calendar.updateMonthBykeydown(1, 'plus');
      }
    },
    resetDate (e) {
      e.preventDefault();
      this.date = '';
      this.$emit('change', '');
    },
    dateChange (value) {
      this.$emit('change', value);
    },
    onBodyClick (e) {
      const isInPicker = this.$el.contains(e.target);
      const isInPanel = this.datepickerPanel.contains(e.target);
      if (!isInPicker && !isInPanel) {
        this.close();
        this.$el.focus();
      }
    },
    setDateRange (daterange) {
      this.date = daterange;
      this.$emit('change', this.date);
      this.close();
    },
    setDate (date, notClose) {
      this.date = date;
      this.$emit('change', date);
      !notClose && this.close();
    },
    getStyle () {
      const clientRect = this.$el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const marginTop = 2;
      const scrollHeight = document.body.scrollWidth > window.innerWidth ? 20 : 0;
      const droplistHeight = this.datepickerPanel.clientHeight;
      const defaultTop = clientRect.top + clientRect.height + marginTop + window.pageYOffset;
      const clientHeight = clientRect.height + marginTop;

      const clientY = clientRect.y;
      const compTop = windowH - droplistHeight - scrollHeight;
      const left = clientRect.left + window.pageXOffset;
      const top = droplistHeight + clientHeight + clientY + scrollHeight > windowH ? compTop : defaultTop;
      return `
        position: absolute;
        top: ${top}px;
        left: ${left}px;
        z-index: 9;
      `
    },
    resize () {
      this.$nextTick(() => {
        this.datepickerPanel.style.cssText = this.getStyle();
      });
    }
  }
}

var $1_17 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-form-item",class:_vm.classNames},[(_vm.label || _vm.$slots.label)?_c('label',{staticClass:"c-form-item__label",style:(_vm.labelStyle)},[_vm._t("label",[_vm._v(_vm._s(_vm.label))])],2):_vm._e(),_c('div',{staticClass:"c-form-item__control",class:{ 'has-error': _vm.hasError }},[_vm._t("default"),_c('div',{staticClass:"c-form-item__error"},[_vm._v(_vm._s(_vm.errorMsg))])],2)])},staticRenderFns: [],
  name: 'c-form-item',
  provide () {
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
  data () {
    return {
      validatable: null
    }
  },
  computed: {
    hasError () {
      const { validatable } = this;
      return validatable && !validatable.validity.valid
    },
    errorMsg () {
      return this.hasError ? this.validatable.validity.msg : ''
    },
    classNames () {
      const classNames = [];
      if (this.required) classNames.push('is-required');
      if (this.flex) classNames.push('is-flex');
      return classNames
    },
    actualLabelWidth () {
      if (this.labelWidth) return this.labelWidth
      return this.$form && this.$form.labelWidth
    },
    labelStyle () {
      return {
        width: this.actualLabelWidth
      }
    }
  },
  created () {
    const isParentValidatable = v => {
      let parent = v.$parent;
      while (true) {
        if (!parent || parent === this) return false
        if (parent.isValidatable) return true
        parent = parent.$parent;
      }
    };
    this.$on('validatable-attached', v => {
      // skip child validatable if parent is validatable
      if (isParentValidatable(v)) return
      this.validatable = v;
    });
    this.$on('validatable-detached', v => {
      this.validatable = null;
    });
  }
}

const block$1 = 'c-form';
const modifiers$1 = ['inline'];
const getClassName = toClassNames(block$1, modifiers$1);

var $1_18 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{staticClass:"c-form",class:_vm.classNames,on:{"submit":_vm.onSubmit}},[_vm._t("default")],2)},staticRenderFns: [],
  name: block$1,
  props: {
    inline: Boolean,
    labelWidth: String,
    size: String,
    width: String
  },
  provide () {
    return {
      '$form': this
    }
  },
  data () {
    return {
      validatables: []
    }
  },
  computed: {
    classNames () {
      const classes = getClassName.call(this);
      if (this.size) classes.push(`is-${this.size}`);
      return classes
    }
  },
  created () {
    const { validatables } = this;
    this.$on('validatable-attached', v => validatables.push(v));
    this.$on('validatable-detached', v => {
      const i = validatables.indexOf(v);
      this.validatables.splice(i, 1);
    });
  },
  methods: {
    onSubmit (e) {
      this.$emit('submit', e);
    },
    isValid () {
      const results = this.validatables.map(v => v.validate());
      const hasAsync = results.some(isPromise);
      const isAllValid = results => results.every(result => result.valid);
      if (hasAsync) {
        return Promise.all(results).then(isAllValid)
      } else {
        return isAllValid(results)
      }
    },
    resetValidity () {
      this.validatables.forEach(v => v.resetValidity());
    },
    reset () {
      this.$emit('reset');
      this.resetValidity();
    }
  }
}

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

const props$3 = breakpoints
  .map(bp => `${bp}-only`)
  .concat(breakpoints)
  .concat(['order', 'span', 'offset', 'width', 'narrow']);

const getClassName$1 = (values, media) => {
  if (!values) return []
  return values.split(/\s+/)
    .map(val => {
      const prefix = /^offset/.test(val) ? 'has' : 'is';
      return `${prefix}-${val}-${media}`
    })
};

var $1_19 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-box__item",class:_vm.classNames,style:(_vm.style)},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-box-item',
  props: props$3,
  computed: {

    /**
     * get class name list of the box item
     */
    classNames () {
      const classNames = breakpoints
        .reduce((classNames, bp) => {
          classNames.push(...getClassName$1(this[bp], bp));
          classNames.push(...getClassName$1(this[`${bp}Only`], `${bp}-only`));
          return classNames
        }, []);
      if (this.span) classNames.push(`is-${this.span}`);
      if (this.offset) classNames.push(`is-offset-${this.offset}`);
      if (this.width || this.narrow !== void 0) classNames.push(`is-narrow`);
      return classNames
    },

    /**
     * set box item gap
     */
    style () {
      const style = {};
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

var $1_20 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-container",class:_vm.classNames},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-container',
  props: {
    size: String,
    align: String,
    noPadding: Boolean
  },
  computed: {
    classNames () {
      const classNames = [];
      if (this.size) classNames.push(`is-${this.size}`);
      if (this.align) classNames.push(`is-${this.align}`);
      if (this.noPadding) classNames.push(`is-no-padding`);
      return classNames
    }
  }
}

const props$4 = {
  gap: String,
  justify: String,
  align: String,
  fillHeight: Boolean
};
const breakpointProps = breakpoints
  .map(bp => `${bp}Only`)
  .concat(breakpoints)
  .reduce((props, bp) => {
    props[bp] = String;
    return props
  }, {});

Object.assign(props$4, breakpointProps);

var $1_21 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-box",class:_vm.classNames,style:(_vm.style)},[_vm._t("default")],2)},staticRenderFns: [],
  props: props$4,
  name: 'c-box',
  computed: {
    style () {
      const margin = this.gap ? multiply(this.gap, -0.5) : '';
      return { margin }
    },
    classNames () {
      const classNames = [];
      const { justify, align, fillHeight } = this;
      breakpoints.forEach(bp => {
        if (this[bp]) classNames.push(`has-${this[bp]}-${bp}`);
        const prop = `${bp}Only`;
        if (this[prop]) classNames.push(`has-${this[prop]}-${bp}-only`);
      });
      if (justify) classNames.push(`is-justify-${justify}`);
      if (align) classNames.push(`is-align-${align}`);
      if (fillHeight) classNames.push(`is-fill-height`);
      return classNames
    }
  }
}

var $1_22 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.ligature)?_c('i',{class:_vm.iconType,style:({ color: _vm.iconColor, fontSize: _vm.size, verticalAlign: _vm.valign })},[_vm._v(_vm._s(_vm.name))]):(_vm.isSvg)?_c('span',{staticClass:"c-icon"},[_vm._v("​"),_c(_vm.svgName,{tag:"component",style:({verticalAlign: _vm.valign}),attrs:{"width":_vm.size,"height":_vm.size,"stroke":_vm.iconColor}})],1):_c('i',{staticClass:"c-icon",class:_vm.classNames,style:({ color: _vm.iconColor, fontSize: _vm.size, verticalAlign: _vm.valign })})},staticRenderFns: [],
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

  data () {
    return {}
  },

  computed: {
    iconType () {
      if (!this.type) {
        return this.$clair.icon || 'feather'
      }
      return this.type
    },
    isSvg () {
      return this.iconType === 'feather'
    },
    classNames () {
      const prefix = this.iconType !== '' ? `${this.iconType}-` : '';
      return `${this.iconType} ${prefix}${this.name}`
    },
    svgName () {
      return this.isSvg ? `feather-${this.name}` : ''
    },
    iconColor () {
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

var $1_23 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-input-wrap",class:_vm.className},[_vm._t("prepend"),((_vm.type)==='checkbox'&&(!_vm.multiLine))?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"nativeInput",staticClass:"c-input",attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.inputValue)?_vm._i(_vm.inputValue,null)>-1:(_vm.inputValue)},on:{"input":_vm.onChange,"change":[function($event){var $$a=_vm.inputValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.inputValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.inputValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.inputValue=$$c;}},_vm.onChange],"blur":_vm.onBlur}}):((_vm.type)==='radio'&&(!_vm.multiLine))?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"nativeInput",staticClass:"c-input",attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"type":"radio"},domProps:{"checked":_vm._q(_vm.inputValue,null)},on:{"input":_vm.onChange,"change":[function($event){_vm.inputValue=null;},_vm.onChange],"blur":_vm.onBlur}}):(!_vm.multiLine)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"nativeInput",staticClass:"c-input",attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"type":_vm.type},domProps:{"value":(_vm.inputValue)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.inputValue=$event.target.value;},_vm.onChange],"change":_vm.onChange,"blur":_vm.onBlur}}):_vm._e(),(_vm.multiLine)?_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"textArea",staticClass:"c-input",style:(_vm.textAreaStyle),attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"rows":_vm.rows,"cols":_vm.cols,"wrap":_vm.wrap},domProps:{"value":(_vm.inputValue)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.inputValue=$event.target.value;},_vm.onChange],"change":_vm.onChange}}):_vm._e(),_vm._t("append"),(!_vm.validity.valid)?_c('em',{staticClass:"c-error-msg"},[_vm._v(_vm._s(_vm.validity.msg))]):_vm._e()],2)},staticRenderFns: [],
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
      default () {
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
    className () {
      const classNames = [];
      if (!this.validity.valid) classNames.push('c-input--error');
      const { size, width, $form } = this;
      const actualSize = size || ($form && $form.size);
      const actualWidth = width || ($form && $form.width);
      if (actualSize) classNames.push(`is-${actualSize}`);
      if (actualWidth) classNames.push(`is-${actualWidth}`);
      return classNames
    }
  },
  data () {
    return {
      origRows: this.rows,
      textAreaStyle: {},
      inputValue: ''
    }
  },

  watch: {
    value: {
      handler (val) {
        this.inputValue = val;
      },
      immediate: true
    }
  },

  methods: {
    onChange (e) {
      this.$emit('change', e.target.value);
      this.resizeTextArea();
    },

    onBlur () {
      this.$emit('blur');
    },

    resizeTextArea () {
      const { multiLine, autosize } = this;
      if (multiLine && autosize) {
        const [minRows, maxRows] = this.autosize;
        const node = this.$refs.textArea;

        this.$nextTick(() => {
          const style = calculateNodeHeight(node, false, minRows, maxRows);
          this.textAreaStyle = style;
        });
      }
    }
  },

  mounted () {
    const { multiLine, autosize, autofocus } = this;

    if (multiLine && autosize) {
      this.resizeTextArea();
    }
    if (autofocus) {
      this.$refs.nativeInput.focus();
    }

    const { defaultThrottleTime } = this.$clair;
    this.resizeTextArea = throttle(
      this.resizeTextArea.bind(this), defaultThrottleTime);
  }
}

var $1_24 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-menu",class:_vm.classNames,style:(_vm.styles)},[_vm._t("default")],2)},staticRenderFns: [],
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
  provide () {
    return { $menu: this }
  },
  computed: {
    styles () {
      if (this.isVertical && !this.collapsed) {
        return {
          width: this.width
        }
      }
    },
    isVertical () {
      return this.mode === 'vertical'
    },
    classNames () {
      const classNames = [];
      const { mode, theme, isVertical, collapsed } = this;
      if (mode) classNames.push(`c-menu--${mode}`);
      if (theme) classNames.push(`c-menu--${theme}`);
      if (isVertical && collapsed) classNames.push('c-menu--collapsed');
      return classNames
    }
  },
  data () {
    return {}
  },
  methods: {}
}

var $1_25 = {
  name: 'c-menu-item',
  props: {
    mode: String,
    active: Boolean
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    isLevel1 () {
      return this.$parent.$options.name === 'c-menu'
    },
    classNames () {
      const classNames = [];
      if (this.isActive) classNames.push('is-active');
      return classNames
    }
  },
  mounted () {
    if (this.active) this.isActive = true;
  },

  /**
   * write render function to avoid duplicate default slots error message
   */
  render (c) {
    const content = this.$slots.default;
    const tips = c('c-tip', {
      attrs: { position: 'right' }
    }, [
      content,
      c('template', {
        slot: 'content'
      }, [content])
    ]);
    const needTips = this.isLevel1 && this.$parent.collapsed;
    const children = [needTips ? tips : content];
    return c('div', {
      staticClass: 'c-menu__item',
      class: this.classNames
    }, children)
  }
}

var $1_26 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-submenu",class:{'is-open': _vm.isOpen}},[_c('div',{staticClass:"c-submenu__title c-menu__item",on:{"click":_vm.toggleSubmenu,"mouseenter":_vm.enterSubMenu,"mouseleave":_vm.leaveSubMenu}},[_vm._t("title",[_vm._v(_vm._s(_vm.title))])],2),_c('div',{staticClass:"c-submenu__popup",on:{"mouseenter":_vm.enterPopup,"mouseleave":_vm.leavePopup,"focusin":_vm.focusIn,"focusout":_vm.focusOut,"!click":function($event){return _vm.clickSubMenu($event)}}},[_vm._t("default")],2)])},staticRenderFns: [],
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
      handler () {
        if (this.open) {
          this.isOpen = true;
        }
      }
    },
    '$menu.collapsed' (collapsed) {
      if (collapsed) {
        this.isOpen = false;
      }
    }
  },
  data () {
    return {
      isOpen: false,
      hideSubMenuTimer: null, // 隐藏子菜单时延时
      showSubMenuTimer: null // hover显示子菜单延时
    }
  },
  computed: {
    isVerticalExpanding () {
      const { isVertical, collapsed } = this.$menu;
      return isVertical && !collapsed
    },
    innerTrigger () {
      if (this.isVerticalExpanding) {
        return 'click'
      }

      // if not specified in props,
      // use 'hover' for vertical cases
      // and 'click' for horizontal cases
      if (this.trigger == null) {
        const { isVertical } = this.$menu;
        return isVertical ? 'hover' : 'click'
      }

      return this.trigger
    }
  },
  methods: {
    toggleSubmenu () {
      if (this.innerTrigger === 'click') {
        this.isOpen = !this.isOpen;
      }
    },

    enterSubMenu () {
      if (this.innerTrigger === 'hover') {
        this.enterPopup();
      }
    },

    leaveSubMenu () {
      if (this.innerTrigger === 'hover') {
        this.leavePopup();
      }
    },

    enterPopup () {
      if (this.isVerticalExpanding) {
        return
      }

      clearTimeout(this.showSubMenuTimer);
      clearTimeout(this.hideSubMenuTimer);
      this.showSubMenuTimer = setTimeout(() => {
        this.openSubMenu();
      }, this.delay);
    },

    leavePopup () {
      if (this.isVerticalExpanding) {
        return
      }

      clearTimeout(this.showSubMenuTimer);
      clearTimeout(this.hideSubMenuTimer);
      this.hideSubMenuTimer = setTimeout(() => {
        this.closeSubMenu();
      }, this.delay);
    },

    clickSubMenu () {
      if (this.isVerticalExpanding) {
        return
      }
      this.closeSubMenu();
    },

    openSubMenu () {
      this.isOpen = true;
    },

    closeSubMenu () {
      this.isOpen = false;
    },

    focusIn () {
      this.openSubMenu();
    },

    focusOut () {
      // do not close submenu if menu is vertical and not collapsed
      if (this.isVerticalExpanding) {
        return
      }

      this.closeSubMenu();
    }
  }
}

let uid = 0;
const overflowController = {
  map: {},
  modalCount: 0,
  oldOverflow: '',
  oldPaddingRight: '',

  start (uid) {
    this.map[uid] = 1;

    this.modalCount += 1;

    if (this.modalCount !== 1) {
      return
    }

    const hasScrollbar = document.documentElement.clientWidth < window.innerWidth;
    const { style } = document.body;

    this.oldOverflow = style.overflow;
    this.oldPaddingRight = style.paddingRight;

    if (hasScrollbar) {
      style.paddingRight = `${getScrollBarSize()}px`;
    }

    // always make `body` hidden
    // when modal shown
    style.overflow = 'hidden';
  },

  reset (uid) {
    if (this.map[uid] !== 1) {
      return
    }

    this.map[uid] = 0;
    this.modalCount -= 1;

    if (this.modalCount !== 0) {
      return
    }

    const { style } = document.body;
    style.overflow = this.oldOverflow;
    style.paddingRight = this.oldPaddingRight;
    this.isHidden = false;
  }
};

var $1_27 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!_vm.shouldDestroy)?_c('c-portal',{attrs:{"aria-hidden":'' + !_vm.visible}},[_c('transition',{attrs:{"appear":"","name":"modal","mode":"out-in"},on:{"before-enter":_vm.beforeEnter,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],ref:"dom",staticClass:"c-modal",style:({ zIndex: _vm.zIndex }),on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.maskClosable ? _vm.$emit('close') : _vm.noop();}}},[_c('div',{staticClass:"c-modal__wrapper",style:(_vm.styleObj)},[_c('div',{staticClass:"c-modal__header"},[(_vm.closable)?_c('c-button',{staticClass:"c-modal__close",attrs:{"icon":"x","flat":""},on:{"click":function($event){_vm.$emit('close');}}}):_vm._e(),_vm._t("header",[_c('div',[_vm._v(_vm._s(_vm.title))])])],2),_c('div',{staticClass:"c-modal__body"},[_vm._t("default",[_c('div')])],2),_c('div',{staticClass:"c-modal__footer"},[_vm._t("footer",[_c('c-button',{attrs:{"outline":""},on:{"click":function($event){_vm.$emit('cancel');}}},[_vm._v("取消")]),_c('c-button',{attrs:{"primary":""},on:{"click":function($event){_vm.$emit('confirm');}}},[_vm._v("确认")])])],2)])])])],1):_vm._e()},staticRenderFns: [],
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

  data () {
    return {
      uid: uid++,
      zIndex: zIndex.next(),
      disappeared: false
    }
  },

  computed: {
    styleObj () {
      let { top, width } = this;
      top = typeof top === 'number' ? `${top}px` : top;
      width = typeof width === 'number' ? `${width}px` : width;

      if (!this.center) {
        return { top, width }
      }

      return {
        width,
        top: '50%',
        transform: 'translateY(-50%)'
      }
    },
    shouldDestroy () {
      const { visible, disappeared, destroyAfterClose } = this;
      return destroyAfterClose && !visible && disappeared
    }
  },

  methods: {
    qsa (selectors) {
      const list = this.$refs.dom.querySelectorAll(selectors);
      return Array.prototype.slice.call(list)
    },

    handleTab (shiftKey) {
      const selectors = `input, button, textarea, select, a[href]`;
      const elems = this.qsa(selectors)
        .filter(el =>
          !el.disabled && el.type !== 'hidden'
        ).filter(el =>
          el.offsetWidth > 0 && el.offsetHeight > 0
        );

      let nextFocusIndex = elems.length - 1;
      const direction = shiftKey ? -1 : 1;
      const activeElem = document.activeElement;

      if (activeElem) {
        const index = elems.indexOf(activeElem);

        if (index > -1) {
          const next = index + direction;
          if (next > -1) {
            nextFocusIndex = next % elems.length;
          }
        }
      }

      const nextElem = elems[nextFocusIndex];
      nextElem && nextElem.focus();
    },

    handleKeydown (e) {
      const { visible, closable } = this;

      if (visible === false) {
        return
      }

      const { keyCode, shiftKey } = e;

      // Tab or Shift+Tab
      if (keyCode === 9) {
        e.preventDefault();
        return this.handleTab(shiftKey)
      }

      // ESC
      if (closable && keyCode === 27) {
        // close modal
        return this.$emit('close')
      }
    },

    beforeEnter () {
      overflowController.start(this.uid);
      this.disappeared = false;
    },

    afterLeave () {
      overflowController.reset(this.uid);
      this.disappeared = true;
      this.$emit('after-leave');
    }
  },

  mounted () {
    this.handleKeydown = this.handleKeydown.bind(this);
    document.addEventListener('keydown', this.handleKeydown);
  },

  beforeDestroy () {
    overflowController.reset(this.uid);
    document.removeEventListener('keydown', this.handleKeydown);
  }
}

var $1_28 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"appear":"","name":"notification","mode":"out-in","type":"transition"},on:{"before-enter":_vm.beforeEnter,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"c-notice__wrapper",style:(_vm.classObj),on:{"mouseenter":_vm.clearTimer,"mouseleave":_vm.startTimer}},[_vm._t("default"),_c('div',[_c('div',{staticClass:"c-notice__header"},[(_vm.closable)?_c('c-button',{staticClass:"c-notice__close",attrs:{"icon":"x","flat":""},on:{"click":function($event){$event.stopPropagation();_vm.$emit('close');}}}):_vm._e(),_c('span',[_vm._v(_vm._s(_vm.title))])],1),_c('div',{staticClass:"c-notice__body"},[(_vm.dangerouslySetInnerHTML)?_c('div',{domProps:{"innerHTML":_vm._s(_vm.message)}}):_c('div',[_vm._v(_vm._s(_vm.message))])])])],2)])},staticRenderFns: [],
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
  data () {
    return {
      zIndex: zIndex.next(),
      timer: null
    }
  },
  computed: {
    classObj () {
      return {
        zIndex: zIndex,
        transform: `translateX(${this.position === 'topRight' || this.position === 'bottomRight' ? -this.offset : this.offset}px)` }
    }
  },
  methods: {
    beforeEnter () {
      if (this.duration) {
        // duration未被设置为0
        this.timer = setTimeout(_ => {
          this.$emit('close');
        }, this.duration);
      }
    },
    afterLeave () {
      this.$emit('after-leave');
    },
    clearTimer () {
      clearTimeout(this.timer);
    },
    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(_ => {
          this.$emit('close');
        }, this.duration);
      }
    }
  },
  destroyed () {
    this.clearTimer();
  }
}

var $1_29 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-pagination"},[_c('span',{staticClass:"c-pagination__total"},[_vm._t("total",[_vm._v("共"),_c('em',[_vm._v(_vm._s(_vm.total))]),_vm._v("条")])],2),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.pageCount > 1),expression:"pageCount > 1"}],staticClass:"c-pagination__pages"},[_c('a',{staticClass:"c-pagination_prev",class:{'is-disabled': _vm.pageNumber == 1},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(_vm.pageNumber - 1);}}},[_vm._t("prev",[_c('c-icon',{attrs:{"name":"chevron-left","valign":"middle"}})])],2),_c('a',{staticClass:"c-pagination__page",class:{'is-active': _vm.pageNumber == 1},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(1);}}},[_vm._v("1")]),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.spanRange[0] > 2),expression:"spanRange[0] > 2"}],staticClass:"c-pagination__ellipsis"},[_vm._v("⋯")]),_vm._l((_vm.spanRange),function(n){return _c('a',{staticClass:"c-pagination__page",class:{'is-active': n == _vm.pageNumber},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(n);}}},[_vm._v(_vm._s(n))])}),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.showEndEllipse),expression:"showEndEllipse"}],staticClass:"c-pagination__ellipsis"},[_vm._v("⋯")]),_c('a',{staticClass:"c-pagination__page",class:{'is-active': _vm.pageNumber == _vm.pageCount},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(_vm.pageCount);}}},[_vm._v(_vm._s(_vm.pageCount))]),_c('a',{staticClass:"c-pagination_prev",class:{'is-disabled': _vm.pageNumber == _vm.pageCount},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(_vm.pageNumber + 1);}}},[_c('c-icon',{attrs:{"name":"chevron-right","valign":"middle"}})],1)],2)])},staticRenderFns: [],
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

  data () {
    return {
      pageNumber: this.pn
    }
  },

  computed: {
    pageCount () {
      return Math.ceil(this.total / this.ps) || 0
    },
    /**
     * 计算要显示的页码，不包括第一页和最后一页
     * e.g. [4,5,6,7,8,9,10]
     */
    spanRange () {
      const range = [];
      const start = Math.max(this.pageNumber - this.span, 2);
      const end = Math.min(this.pageNumber + this.span, this.pageCount - 1);
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range
    },
    showEndEllipse () {
      const lastPageInRange = this.spanRange[this.spanRange.length - 1];
      return lastPageInRange < (this.pageCount - 1)
    }
  },

  created () {
    this.$watch(vm => [vm.pn, vm.total].join(), _ => {
      const pn = Number.parseInt(this.pn) || 1;
      const exceedMax = pn > this.pageCount;
      if (exceedMax) {
        this.pageNumber = this.pageCount;
        this.$emit('change', this.pageNumber);
      } else {
        this.pageNumber = pn;
      }
    });
  },

  methods: {
    /**
     * 切换页码
     * event 点击事件，用以获取target
     */
    goPage (page) {
      if (page < 1 || page > this.pageCount) return
      this.pageNumber = page;
      this.$emit('change', page);
    }
  }
}

var $1_30 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:_vm.classNames,on:{"change":_vm.onChange}},[_c('input',{attrs:{"type":"radio","name":_vm.name,"disabled":_vm.disabled},domProps:{"value":_vm.value,"checked":_vm.value == _vm.checkedIndex}}),_c('span',{staticClass:"c-radio__box"}),_c('span',{staticClass:"c-radio__label"},[_vm._v(_vm._s(_vm.label))])])},staticRenderFns: [],
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
    classNames () {
      const { button } = this;
      const classes = button ? 'c-radio--button' : 'c-radio';
      return classes
    }
  },
  methods: {
    onChange (e) {
      this.$emit('input', this.value);
    }
  }
}

var $1_31 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-radio-group",class:_vm.classNames},_vm._l((_vm.options),function(option,index){return _c('c-radio',{key:index,attrs:{"name":_vm.name,"value":index,"button":_vm.button,"label":option.label,"disabled":option.disabled},model:{value:(_vm.checkedIndex),callback:function ($$v) {_vm.checkedIndex=$$v;},expression:"checkedIndex"}})}))},staticRenderFns: [],
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
      type: [Number, String, Object, Boolean]
    },
    button: Boolean,
    size: String
  },
  data () {
    return {
      name: randomString(),
      checkedIndex: -1
    }
  },
  computed: {
    classNames () {
      const { size, $form } = this;
      const actualSize = size || ($form && $form.size);
      return `is-${actualSize}`
    }
  },
  created () {
    this.updateChecked();
    this.$watch('options', this.updateChecked);
    this.$watch('value', this.updateChecked);
    this.$watch('checkedIndex', index => {
      const value = index > -1
        ? this.options[this.checkedIndex].value
        : this.value;
      this.$emit('change', value);
    });
  },
  methods: {
    updateChecked () {
      this.checkedIndex = this.options.findIndex(
        option => option.value === this.value
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

// ensure each option has label and value
const normalizeOptions = (options = []) => {
  return options.map(option => {
    if (typeof option === 'string') return { label: option, value: option }
    return option
  })
};

var $1_32 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-select",class:_vm.classNames,attrs:{"role":"combobox","aria-autocomplete":"list","aria-haspopup":"true","aria-expanded":_vm.isOpen,"aria-disabled":"disabled","tabindex":_vm.disabled ? -1 : 0},on:{"keydown":_vm.onKeyDown,"click":_vm.toggleOpen}},[_c('i',{staticClass:"c-select__caret"}),_c('div',{staticClass:"c-select__selection"},[(_vm.showPlaceholder)?_c('div',{staticClass:"c-select__placeholder"},[_vm._v(_vm._s(_vm.placeholder))]):_vm._e(),(!_vm.multiple && _vm.selectedOptions.length)?_c('div',{staticClass:"c-select__value"},[_vm._v(_vm._s(_vm.selectedOptions[0].label))]):_vm._e(),_vm._l((_vm.selectedOptions),function(option,index){return (_vm.multiple && index <= _vm.maxChipCount)?_c('div',{key:index,staticClass:"c-chip",class:{ 'is-disabled': option.disabled, 'is-closeable': index < _vm.maxChipCount }},[_vm._t("selection",[(index < _vm.maxChipCount)?_c('span',[_vm._v(_vm._s(option.label))]):_c('span',[_vm._v(_vm._s(_vm.maxChipText))])],{option:option}),(index < _vm.maxChipCount)?_c('div',{staticClass:"c-chip__close",on:{"click":function($event){$event.stopPropagation();_vm.unselectOption(option);}}},[_c('c-icon',{attrs:{"name":"x","valign":"middle"}})],1):_vm._e()],2):_vm._e()}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showInput),expression:"showInput"}],staticClass:"c-select__input",class:_vm.multiple ? 'is-multiple' : 'is-single'},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.query),expression:"query"}],attrs:{"autocomplete":"off"},domProps:{"value":(_vm.query)},on:{"click":function($event){$event.stopPropagation();return _vm.noop($event)},"blur":function($event){_vm.$el.focus();},"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete"])){ return null; }return _vm.onDeleteKey($event)},"input":[function($event){if($event.target.composing){ return; }_vm.query=$event.target.value;},_vm.onSearchInput]}})])],2),_c('c-portal',{attrs:{"aria-hidden":'' + !_vm.isOpen}},[_c('transition',{attrs:{"name":"fade-in-down"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen),expression:"isOpen"}],ref:"menu",staticClass:"c-select__menu",class:_vm.size ? 'is-'+_vm.size : '',style:(_vm.menuStyle),attrs:{"role":"menu","aria-activedescendant":""}},[(_vm.autocomplete && !_vm.filteredOptions.length)?_vm._t("no-match",[_c('div',{staticClass:"c-select__empty"},[_vm._v("无匹配选项")])]):_vm._e(),_vm._l((_vm.filteredOptions),function(option,index){return _c('c-option',{key:index,ref:"$options",refInFor:true,attrs:{"label":option.label,"isActive":_vm.activeOption == option,"isSelected":_vm.selectedOptions.indexOf(option) > -1,"disabled":option.disabled,"option":option}},[_vm._t("menu-item",null,{label:option.label,isActive:_vm.activeOption == option,isSelected:_vm.selectedOptions.indexOf(option) > -1,disabled:option.disabled,index:index,option:option})],2)})],2)])],1)],1)},staticRenderFns: [],
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
      default: (options, query) => {
        const q = query.trim().toLowerCase();
        if (!q) return options
        return options
          .filter(option => option.label.toLowerCase().indexOf(q) > -1)
      }
    },
    filterThrottle: {
      type: Number,
      default: 0
    },
    maxChipCount: {
      type: Number,
      default: Infinity
    },
    maxChipPlaceholder: {
      type: [String, Function],
      default: ommittedCount => `和其它${ommittedCount}个选项`
    }
  },

  model: {
    event: 'change'
  },

  provide () {
    return { $select: this }
  },

  inject: {
    $form: { default: null }
  },

  data () {
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
    normalizedOptions () {
      return normalizeOptions(this.options)
    },
    canInput () {
      return this.combobox || this.autocomplete
    },
    showInput () {
      return this.canInput && this.isOpen
    },
    classNames () {
      const classNames = [
        {
          'is-open': this.isOpen,
          'is-disabled': this.disabled
        }
      ];
      const { size, width, $form } = this;
      const actualSize = size || ($form && $form.size);
      const actualWidth = width || ($form && $form.width);
      if (actualSize) classNames.push(`is-${actualSize}`);
      if (actualWidth) classNames.push(`is-${actualWidth}`);
      return classNames
    },
    selectedValues () {
      return this.selectedOptions.map(option => option.value)
    },
    showPlaceholder () {
      const empty = !this.selectedOptions.length;
      return empty && !this.isOpen
    },
    exceedMaxChipCount () {
      return this.selectedOptions.length > this.maxChipCount
    },
    maxChipText () {
      if (!this.exceedMaxChipCount) return
      const ommittedCount = this.selectedOptions.length - this.maxChipCount;
      const { maxChipPlaceholder } = this;
      if (typeof maxChipPlaceholder === 'function') {
        return maxChipPlaceholder(ommittedCount)
      }
      return maxChipPlaceholder
    }
  },

  watch: {
    isOpen () {
      if (this.isOpen) {
        this.menuStyle.minWidth = `${this.$el.offsetWidth}px`;
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
      if (!this.multiple || this.$isServer) return
      this.$nextTick(function () {
        this.positionMenu();
      });
    }
  },

  created () {
    // filter function throttled
    this.filterFunction = throttle((options, query) => {
      const filtered = this.filter(options, query);
      if (typeof filtered.then === 'function') {
        const promiseId = Date.now();
        this.promiseId = promiseId;
        filtered.then(options => {
          if (this.promiseId > promiseId) return
          this.filteredOptions = normalizeOptions(options);
        });
      } else {
        this.filteredOptions = normalizeOptions(filtered);
      }
    }, this.filterThrottle, {
      leading: true,
      trailing: true
    });
  },

  mounted () {
    this.menuEl = this.$refs.menu;

    // hover the option
    this.$on('option-activated', option => {
      this.activeOption = option;
    });

    // reset position on window.resize
    this.__onresize = throttle(
      () => {
        if (this.isOpen) {
          this.positionMenu();
        }
      },
      this.$clair.defaultThrottleTime
    );
    window.addEventListener('resize', this.__onresize);

    // select the option
    this.$on('option-clicked', option => this.selectOption(option));

    // watch options, query to filter options
    this.$watch(
      function () {
        return [this.normalizedOptions, this.query, this.isOpen]
      },
      function filterOptions () {
        const { autocomplete, query } = this;
        if (!autocomplete) {
          this.filteredOptions = this.normalizedOptions;
          return
        }
        this.filterFunction(this.normalizedOptions, query);
      }
    );
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.__onresize);
  },

  methods: {
    toggleOpen () {
      if (this.disabled) return
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    getOption (value) {
      const fn = option => option.value === value;
      return this.filteredOptions.find(fn) ||
        this.normalizedOptions.find(fn) ||
        this.selectedOptions.find(fn)
    },

    updateSelectedOptions () {
      const { value, multiple } = this;
      const isEmpty = value === void 0 || value === null;
      if (isEmpty) {
        this.selectedOptions = [];
        return
      }
      if (multiple) {
        const isArray = Array.isArray(value);
        const isEmptyArray = isArray && value.length === 0;
        if (isEmptyArray) return
        const valueArr = isArray ? value : [value];
        this.selectedOptions = valueArr
          .map(v => this.getOption(v))
          .filter(option => option);
      } else {
        const option = this.getOption(value);
        this.selectedOptions = option ? [option] : [];
      }
    },

    open () {
      this.isOpen = true;
      [this.activeOption] = this.filteredOptions;
      if (this.showInput) {
        this.query = '';
        this.$nextTick(_ => {
          this.$el.querySelector('input').focus();
        });
      }
    },

    close () {
      this.isOpen = false;
    },

    getNextOption (current) {
      const currentIndex = this.filteredOptions.indexOf(current);
      const next = this.filteredOptions.find((option, index) => {
        return index > currentIndex && !option.disabled
      });
      return next || current
    },

    getPreviousOption (current) {
      let prev = null;
      const currentIndex = this.filteredOptions.indexOf(current);
      for (let i = currentIndex - 1; i >= 0; i--) {
        if (!this.filteredOptions[i].disabled) {
          prev = this.filteredOptions[i];
          break
        }
      }
      return prev || current
    },

    activateNext () {
      const next = this.getNextOption(this.activeOption);
      this.activeOption = next;
    },

    activatePrevious () {
      const prev = this.getPreviousOption(this.activeOption);
      this.activeOption = prev;
    },

    selectPrevious () {
      const prev = this.getPreviousOption(this.selectedOptions[0]);
      this.selectOption(prev);
    },

    selectNext () {
      const next = this.getNextOption(this.selectedOptions[0]);
      this.selectOption(next);
    },

    selectOption (option) {
      if (this.multiple) {
        if (this.autocomplete) this.query = '';
        const isSelected = this.selectedOptions.includes(option);
        if (isSelected) return this.unselectOption(option)
        this.selectedOptions.push(option);
      } else {
        this.selectedOptions = [option];
        this.close();
      }
      this.emitChange();
    },

    unselectOption (option) {
      const index = this.selectedOptions.indexOf(option);
      this.selectedOptions.splice(index, 1);
      this.emitChange();
    },

    positionMenu () {
      const pos = this.canInput ? POSITION.BOTTOM : POSITION.TOP;
      const { top, left } = getPosition(this.menuEl, this.$el, pos);
      const { style } = this.menuEl;
      style.top = `${top}px`;
      style.left = `${left}px`;
      style.zIndex = zIndex.next();
    },

    onBodyClick (e) {
      const isInSelect = this.$el.contains(e.target);
      const isInMenu = this.menuEl.contains(e.target);
      if (!isInSelect && !isInMenu) {
        this.close();
        this.$el.focus();
      }
    },

    onDeleteKey (e) {
      if (!this.query) this.selectedOptions.pop();
    },

    onKeyDown (e) {
      const keys = {
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      };
      const { keyCode } = e;
      const {
        isOpen,
        multiple,
        open,
        close,
        selectOption,
        selectPrevious,
        selectNext,
        activeOption,
        activateNext,
        activatePrevious
      } = this;

      if (Object.values(keys).includes(keyCode)) e.preventDefault();

      // open menu on space, up, down key
      const openTrigger = [
        keys.SPACE,
        keys.ENTER,
        keys.UP,
        keys.DOWN
      ].includes(keyCode);
      if (openTrigger && !isOpen) return open()

      // close menu on escape
      if (keyCode === keys.ESC && isOpen) return close()

      // press enter to select
      if (keyCode === keys.ENTER && isOpen) return selectOption(activeOption)

      // use left, right to navigate on closed state of non-multiple select
      const canSelect = !isOpen && !multiple;
      if (canSelect && keyCode === keys.LEFT) return selectPrevious()
      if (canSelect && keyCode === keys.RIGHT) return selectNext()

      // use up, down to navigate on open state
      if (isOpen && keyCode === keys.UP) return activatePrevious()
      if (isOpen && keyCode === keys.DOWN) return activateNext()
    },

    onSearchInput (e) {
      this.$emit('searchinput', e.target.value);
    },

    emitChange () {
      const value = this.multiple ? this.selectedValues : this.selectedValues[0];
      this.$emit('change', value);
    }
  }
}

var $1_33 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-select__option",class:_vm.classNames,attrs:{"role":"menuitem","aria-selected":"isSelected"},on:{"mouseenter":_vm.activate,"mouseleave":_vm.deactivate,"mousedown":function($event){$event.preventDefault();return _vm.noop($event)},"click":_vm.onClick}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)},staticRenderFns: [],
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
    classNames () {
      return {
        'is-hover': this.isActive,
        'is-selected': this.isSelected,
        'is-disabled': this.disabled
      }
    }
  },
  methods: {
    activate () {
      this.$select.$emit('option-activated', this.option);
    },
    deactivate () {
      this.$select.$emit('option-deactivated', this.option);
    },
    onClick (e) {
      e.preventDefault();
      if (this.disabled) return
      this.$select.$emit('option-clicked', this.option);
    }
  }
}

const defaultHoverTimeout = 200;

var $1_34 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-ctrl',{staticClass:"c-slider",attrs:{"direction":_vm.vertical ? 'v' : 'h'},on:{"change":_vm.onRangeChange}},[_c('div',{staticClass:"c-slider",class:_vm.className,style:(_vm.height ? { height: _vm.height } : null),on:{"mousedown":_vm.onMousedown}},[_c('input',{attrs:{"type":"range","min":_vm.min,"max":_vm.max,"step":_vm.step,"disabled":_vm.disabled},domProps:{"value":_vm.nominal}}),_c('div',{staticClass:"c-slider__progress",style:(_vm.progressPos)}),_c('ul',{staticClass:"c-slider__marks"},_vm._l((_vm.normalizedMarks),function(mark){return _c('li',{style:(`${_vm.vertical ? 'bottom' : 'left'}: ${mark.p}`)},[_vm._v(_vm._s(mark.n))])})),_c('div',{staticClass:"c-slider__stops"},_vm._l((_vm.normalizedMarks),function(mark){return _c('span',{style:(`${_vm.vertical ? 'bottom' : 'left'}: ${mark.p}`)})})),_c('div',{staticClass:"c-slider__thumb",class:{ 'c-slider__thumb--hover': !_vm.isDrag && _vm.isHover, 'c-slider__thumb--dragging': _vm.isDrag },style:(_vm.thumbPos),on:{"mouseenter":_vm.onThumbHover,"mouseleave":_vm.onThumbHoverout}},[_c('div',{staticClass:"c-slider__tip",attrs:{"role":"tooltip","aria-hidden":"true"}},[_vm._v(_vm._s(_vm.formmater(this.nominal, 'tip')))])])])])},staticRenderFns: [],
  name: 'c-slider',
  components: {
    'v-ctrl': VCtrl.VueCtrlComponent
  },
  model: { event: 'change' },
  mixins: [resettable],
  props: {
    min: VueTypes.number.def(0),
    max: VueTypes.number.def(100),
    step: VueTypes.number.def(1),
    value: VueTypes.oneOfType([Number, String]).def(0),
    marks: VueTypes.array,
    formmater: VueTypes.func.def(id => id),
    vertical: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    height: VueTypes.string
  },

  data () {
    return {
      normorlizedValue: 0,
      isHover: false,
      isDrag: false
    }
  },

  computed: {
    className () {
      const { vertical, disabled } = this;
      return [
        `c-slider--${vertical ? 'vertical' : 'horizontal'}`,
        disabled ? 'c-slider--disabled' : ''
      ]
    },

    precision () {
      const [, fraction] = `${this.step}`.split('.');
      return fraction ? fraction.length : 0
    },

    /**
       * nominal value being denormalized
       */
    nominal () {
      return this.denormalize(this.normorlizedValue)
    },

    percentage () {
      const { nominal } = this;
      const proportion = this.normalize(nominal);
      // eslint-disable-next-line
        return `${ proportion * 100}%`
    },

    thumbPos () {
      const { vertical, percentage } = this;
      const key = vertical ? 'bottom' : 'left';
      const style = {};
      style[key] = percentage;
      return style
    },

    progressPos () {
      const { vertical, percentage } = this;
      const key = vertical ? 'height' : 'width';
      const style = {};
      style[key] = percentage;
      return style
    },

    normalizedMarks () {
      const { marks, min, max, formmater } = this;
      const arr = marks || [min, max];
      return arr.map(mk => {
        const mark = clamp(mk, min, max);

        return {
          // eslint-disable-next-line
            p: `${this.normalize(mark) * 100}%`,
          n: formmater ? formmater(mark, 'scale') : mark
        }
      })
    }
  },

  methods: {
    normalize (val) {
      const { min, max } = this;
      const decimal = (val - min) / (max - min);
      return clamp(decimal, 0, 1)
    },
    denormalize (val) {
      const { min, max, step, precision } = this;
      const range = (max - min);
      const nominal = min + Math.round(range * val / step) * step;
      return parseFloat(nominal.toFixed(precision))
    },
    onRangeChange (e) {
      if (!this.disabled) {
        this.normorlizedValue = this.vertical ? 1 - e : e;
      }
    },

    onThumbHover () {
      if (this.isDrag) {
        return
      }
      this._hTid = setTimeout(() => {
        this.isHover = true;
      }, defaultHoverTimeout);
    },

    onThumbHoverout () {
      clearTimeout(this._hTid);
      this.isHover = false;
    },

    onMousedown () {
      this.isDrag = true;
      document.addEventListener('mouseup', this.onMouseup);
    },
    onMouseup () {
      this.isDrag = false;
      document.removeEventListener('mouseup', this.onMouseup);
    }
  },

  created () {
    this.normorlizedValue = this.normalize(this.value);
    this.$emit('change', this.nominal);

    this.onMouseup = this.onMouseup.bind(this);
  },

  watch: {
    value: {
      handler (newVal) {
        const { max, min } = this;
        const val = Number(newVal);

        if (val !== clamp(val, min, max)) {
          throw new Error(`The value ${val} exceeded range` +
              ` [${min}, ${max}].`
          )
        }

        this.normorlizedValue = this.normalize(val);
      },
      immediate: true
    },
    nominal (val) {
      this.$emit('change', this.nominal);
    }
  }
}

var $1_35 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-steps-container",class:_vm.className,attrs:{"active":_vm.active}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-steps',
  props: {
    direction: VueTypes.oneOf(['vertical', 'horizontal']).def('horizontal'),
    active: VueTypes.number.def(1)
  },
  data () {
    return {
      steps: []
    }
  },
  computed: {
    className () {
      return this.direction === 'vertical' ? 'c-steps-vertical' : 'c-steps-horizontal'
    }
  },
  methods: {},
  watch: {
    steps (steps) {
      steps.forEach((child, index) => {
        child.index = index;
      });
    }
  }
}

var $1_36 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-step",class:_vm.className},[_c('div',{staticClass:"c-step-header"},[(_vm.icon)?_c('div',{staticClass:"c-step-icon"},[_c('c-icon',{attrs:{"type":"feather","name":_vm.icon}})],1):_c('div',{staticClass:"c-step-icon"},[_vm._v(_vm._s(_vm.index + 1))])]),_c('div',{staticClass:"c-step-content"},[_c('div',{staticClass:"c-title"},[_vm._t("default",[_vm._v(_vm._s(_vm.title))])],2),(_vm.description)?_c('div',{staticClass:"c-step-description"},[_vm._t("default",[_vm._v(_vm._s(_vm.description))])],2):_vm._e()])])},staticRenderFns: [],
  name: 'c-step',
  props: {
    title: VueTypes.string,
    description: VueTypes.string,
    icon: VueTypes.string,
    iconPos: VueTypes.oneOf(['left', 'top']).def('top'),
    status: VueTypes.oneOf(['loading', 'success', 'warning', 'error', 'default']).def('default')
  },
  data () {
    return {
      index: -1
    }
  },
  created () {
    this.index = this.$parent.steps.indexOf(this);
  },

  beforeCreate () {
    this.$parent.steps.push(this);
  },

  computed: {
    className () {
      let classStr = `${this.iconPos}`;
      if (this.index === this.$parent.active - 1) {
        classStr += ` active`;
      }
      if (this.status) {
        classStr += ` ${this.status}`;
      }
      return classStr
    }
  },
  methods: {}
}

const name$3 = 'c-switch';

var $1_37 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-switch",class:_vm.className,attrs:{"activeColor":_vm.activeColor,"inActiveColor":_vm.inActiveColor}},[_c('input',{staticClass:"c-switch__checkbox",attrs:{"type":"checkbox","disabled":_vm.disabled,"name":_vm.name},domProps:{"checked":_vm.checked,"value":_vm.value}}),_c('div',{staticClass:"c-switch__layoutbox",style:(_vm.styleObj),on:{"click":function($event){$event.stopPropagation();return _vm.toggle($event)}}})])},staticRenderFns: [],
  name: name$3,
  props: {
    disabled: VueTypes.bool.def(false),
    checkedColor: VueTypes.string,
    uncheckedColor: VueTypes.string,
    checkedValue: VueTypes.any.def(true),
    uncheckedValue: VueTypes.any.def(false),
    value: VueTypes.any.def(false),
    size: VueTypes.string
  },
  mixins: [resettable, validatable],
  data () {
    return {
      name: 'c-switch',
      currentValue: false
    }
  },
  watch: {
    value (val) {
      this.currentValue = val;
    }
  },
  created () {
    this.currentValue = this.value;
  },
  computed: {
    checked () {
      return this.currentValue === this.checkedValue
    },
    styleObj () {
      let obj = {};
      if (this.checkedColor && this.checked) {
        obj.backgroundColor = this.checkedColor;
        obj.borderColor = this.checkedColor;
      }
      if (this.uncheckedColor && !this.checked) {
        obj.backgroundColor = this.uncheckedColor;
        obj.borderColor = this.uncheckedColor;
      }
      return obj
    },
    className () {
      if (this.size) {
        return ` c-switch--${this.size}`
      }
    }
  },
  methods: {
    toggle () {
      if (this.disabled) return
      const value = this.checked ? this.uncheckedValue : this.checkedValue;
      this.currentValue = value;
      this.$emit('input', value);
    }
  }
}

var $1_38 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',[(!_vm.onlybody)?_c('thead',_vm._l((_vm.columnsRows),function(column){return _c('tr',_vm._l((column.columns),function(item){return _c('th',{class:_vm.getColumnClassName(item),style:(_vm.getTHCellStyle(item)),attrs:{"colspan":item.colspan,"rowspan":item.rowspan}},[(item.type === 'selection')?_c('span',{staticClass:"c-table__check"},[_c('c-checkbox',{attrs:{"indeterminate":_vm.checkIndeterminate},on:{"change":_vm.onSelectAllChange},model:{value:(_vm.allSelect),callback:function ($$v) {_vm.allSelect=$$v;},expression:"allSelect"}})],1):_vm._e(),_vm._t(item.key + '-base-th',[_c('span',[_vm._v(_vm._s(item.title))])]),(item.sorter)?_c('span',{staticClass:"c-table__sort"},[_c('div',{staticClass:"c-sort-asc",class:{'sorted': _vm.checkSorted(item.key, 'asc')},on:{"click":function($event){_vm.onSorted(item.key, 'asc');}}},[_c('i',{staticClass:"sort-asc"})]),_c('div',{staticClass:"c-sort-desc",class:{'sorted': _vm.checkSorted(item.key, 'desc')},on:{"click":function($event){_vm.onSorted(item.key, 'desc');}}},[_c('i',{staticClass:"sort-desc"})])]):_vm._e()],2)}))})):_vm._e(),(!_vm.onlyhead)?_c('tbody',[(_vm.dataList.length == 0)?_c('tr',[_c('td',{staticClass:"c-table__noresult",attrs:{"colspan":_vm.columns.length}},[_vm._v(_vm._s(_vm.noresultMsg))])]):_vm._l((_vm.dataList),function(dataItem,index){return _c('tr',{class:_vm.getRowClassName(_vm.item, index),on:{"mouseenter":function($event){_vm.setCurrentItem(dataItem, index);},"mouseleave":_vm.resetCurrentItem}},_vm._l((_vm.allColumns),function(columnsItem){return _c('td',{class:_vm.getColumnClassName(columnsItem),style:(_vm.getCellStyle(columnsItem))},[_vm._t(columnsItem.key + '-base-td',[(columnsItem.type === 'selection')?_c('span',{staticClass:"c-table__check"},[_c('c-checkbox',{attrs:{"disabled":dataItem._disabled},on:{"change":_vm.onSelectChange},model:{value:(!dataItem._disabled && dataItem._checked),callback:function ($$v) {_vm.$set(!dataItem._disabled && dataItem, "_checked", $$v);},expression:"!dataItem._disabled && dataItem._checked"}})],1):_vm._e(),(columnsItem.render)?_c('div',{domProps:{"innerHTML":_vm._s(columnsItem.render(index, dataItem[columnsItem.key], dataItem))}}):_c('span',[_vm._v(_vm._s(dataItem[columnsItem.key]))])],{item:dataItem})],2)}))})],2):_vm._e()])},staticRenderFns: [],
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

  data () {
    return {
      currentItem: {},
      columnsRows: [],
      allSelect: false,
      checkIndeterminate: false
    }
  },

  computed: {
    dataList () {
      return this.datasource
    },
    allColumns () {
      const columns = cloneDeep(this.columns);
      return this.getAllColumns(columns)
    }
  },

  created () {
    this.allSelect = this.allChecked;
    this.checkIndeterminate = this.indeterminate;
  },

  mounted () {
    this.getTHWidth(this.columns);
    const maxlevel = this.findMaxLevel(this.columns);
    this.columnsRows = this.getLevelColumns(this.columns, maxlevel);
  },
  watch: {
    allChecked (newVal) {
      if (this.allSelect === newVal) return
      this.allSelect = newVal;
    },
    indeterminate (newVal) {
      this.checkIndeterminate = newVal;
    },
    hoverRowIndex () {
      this.$forceUpdate();
    },
    columns () {
      this.getTHWidth(this.columns);
      const maxlevel = this.findMaxLevel(this.columns);
      this.columnsRows = this.getLevelColumns(this.columns, maxlevel);
    }
  },

  methods: {
    getRowClassName (row, rowIndex) {
      const classes = [];
      const { rowClassName } = this;
      if (typeof rowClassName === 'string') {
        classes.push(rowClassName);
      } else if (typeof rowClassName === 'function') {
        classes.push(rowClassName({
          row,
          rowIndex
        }));
      }

      if (rowIndex === this.hoverRowIndex) {
        classes.push('row-hover');
      }
      return classes.join(' ')
    },
    getColumnClassName (item) {
      return item.hasOwnProperty('className') ? item.className : ''
    },
    setCurrentItem (item, index) {
      this.currentItem = item;
      this.$emit('rowEnter', index);
    },
    resetCurrentItem () {
      this.currentItem = {};
      this.$emit('rowLeave');
    },
    onSelectAllChange (status) {
      this.$emit('selectAllChange', status);
    },
    onSelectChange (status) {
      this.$emit('selectChange', this.currentItem, status);
    },
    checkSorted (key, order) {
      return key === this.sortkey && order === this.sortorder
    },
    onSorted (key, order) {
      this.$emit('sort', { key, order });
    },
    getCellStyle (item) {
      const width = typeof item.width === 'number' ? `${item.width}px` : item.width;
      return {
        width: item.width ? width : 'auto',
        textAlign: item.align ? item.align : 'left'
      }
    },
    getTHCellStyle (item) {
      const cellStyle = this.getCellStyle(item);
      const thHeight = 40;
      cellStyle.height = item.rowspan ? `${item.rowspan * thHeight}px` : `${thHeight}px`;
      return cellStyle
    },
    getAllColumnsRows (list) {
      const columns = [];
      list.forEach(item => {
        columns.push(item);
        if (item.children && item.children.length > 0) {
          columns.push(...this.getAllColumnsRows(item.children));
        }
      });
      return columns
    },
    getLevelColumns (list, maxlevel) {
      const allColumns = this.getAllColumnsRows(list);
      const columns = [];
      for (let i = 1; i <= maxlevel; i++) {
        columns.push({
          level: i,
          columns: allColumns.filter(item => item.level === i)
        });
      }
      return columns
    },

    findMaxLevel (list) {
      let maxlevel = 0;
      list.forEach(item => {
        if (item.children) {
          maxlevel = Math.max(this.findMaxLevel(item.children), maxlevel);
        } else {
          maxlevel = Math.max(item.level, maxlevel);
        }
      });
      return maxlevel
    },

    getTHWidth (list) {
      let width = 0;
      list.forEach(item => {
        if (item.children) {
          item.width = this.getTHWidth(item.children);
        }
        width += item.width ? item.width : 0;
      });
      return width || ''
    },
    getAllColumns (list) {
      const columns = [];
      list.forEach((item, index) => {
        let classname = [];
        index === 0 && classname.push('c-table__bl');
        index === list.length - 1 && classname.push('c-table__br');
        classname = classname.join(' ');
        item.className = item.hasOwnProperty('className') ? `${item.className} ${classname}` : classname;
        if (item.children && item.children.length > 0) {
          columns.push(...this.getAllColumns(item.children));
        } else {
          columns.push(item);
        }
      });
      return columns
    }

  }
}

var $1_39 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.className},[(_vm.hasFixed)?_c('div',{staticClass:"c-table",class:_vm.withBorderClass},[(_vm.height)?[_c('div',{staticClass:"c-table__wrapper"},[_c('div',{staticClass:"c-table__headwrapper"},[_c('div',{staticClass:"c-scroll__thead",on:{"scroll":_vm.theadScroll}},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1)]),_c('div',{staticClass:"c-table__bodywrapper"},[_c('div',{ref:_vm.scrollbody,staticClass:"c-scroll__tbody",on:{"mouseenter":_vm.setCurrentScrollBox,"mouseleave":_vm.removeCurrentScrollBox}},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1)]),_c('div',{staticClass:"c-fixtable__left",class:{'c-fixed__leftscroll': _vm.isScrollMove},on:{"mouseenter":_vm.setCurrentScrollBox,"mouseleave":_vm.removeCurrentScrollBox}},[(_vm.datasource.length > 0)?[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1),(!undefined)?_c('div',{ref:"fixedleft",staticClass:"c-table__body",on:{"scroll":_vm.onYscroll}},[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1):_vm._e()]:[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1),_vm._e()]],2),_c('div',{staticClass:"c-fixtable__right",class:{'c-fixed__rightscroll': _vm.isScrollMove},on:{"mouseenter":_vm.setCurrentScrollBox,"mouseleave":_vm.removeCurrentScrollBox}},[(_vm.datasource.length > 0)?[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1),(!undefined)?_c('div',{ref:"fixedright",staticClass:"c-table__body",on:{"scroll":_vm.onYscroll}},[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1):_vm._e()]:[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1),_vm._e()]],2)])]:[(_vm.fixedLeftColumns.length > 0)?_c('div',{staticClass:"c-fixtable__left",class:{'c-fixed__leftscroll': _vm.isScrollMove}},[(_vm.datasource.length > 0)?[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]:[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]],2):_vm._e(),_c('div',{staticClass:"c-scrolltable",on:{"scroll":_vm.onScroll}},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1),(_vm.fixedRightColumns.length > 0)?_c('div',{staticClass:"c-fixtable__right",class:{'c-fixed__rightscroll': _vm.isScrollMove}},[(_vm.datasource.length > 0)?[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]:[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]],2):_vm._e()]],2):_c('div',{staticClass:"c-table",class:_vm.withBorderClass},[(_vm.height)?[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1),(!undefined)?_c('div',{ref:"scrollBody",staticClass:"c-table__body",on:{"scroll":_vm.onScroll}},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1):_vm._e()]:[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]],2)])},staticRenderFns: [],
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

  data () {
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
    }
  },

  computed: {
    withBorderClass () {
      if (!this.border || this.border === 'none') {
        return ''
      }
      let classes = this.border.split(' ');
      classes = classes.map(item => `c-table__${item}`);
      return classes.join(' ')
    },
    className () {
      return this.size ? `c-table__${this.size}` : ''
    },
    hasFixed () {
      return Boolean(this.columns.find(item => Boolean(item.fixed)))
    }
  },

  created () {
    this.composeData();
    this.getColumnsDetail();
  },

  watch: {
    datasource: {
      handler (newVal, oldVal) {
        if (newVal === oldVal) return
        this.composeData();
        this.getColumnsDetail();
        this.$nextTick(_ => {
          this.height && this.getTbodyStyle();
        });
      },
      deep: true
    },
    sortkey () {
      this.composeData();
    },
    sortorder () {
      this.composeData();
    },
    columns () {
      this.getColumnsDetail();
      this.$nextTick(_ => {
        this.height && this.getTbodyStyle();
        if (this.hasFixed) {
          const scrollEl = this.$el.querySelector('.c-scroll__tbody');
          scrollEl && scrollEl.addEventListener('scroll', this.onScroll, false);
        }
      });
    },
    allSelected (status) {
      this.updateSelectAll(status);
    }
  },

  mounted () {
    this.getCurrentScrollBarSize();
    this.height && this.getTbodyStyle();
    if (this.hasFixed) {
      const scrollEl = this.$el.querySelector('.c-scroll__tbody');
      scrollEl && scrollEl.addEventListener('scroll', this.onScroll, false);
    }
  },

  methods: {
    updateSelectAll (status) {
      this.allChecked = status;
      this.dataList = this.dataList.map(item => {
        this.$set(item, '_checked', status);
        return item
      });
      if (status) {
        this.selection = this.dataList.filter(item => item._checked && !item._disabled);
      } else {
        this.selection = [];
      }
    },
    onSelectAllChange (status) {
      this.updateSelectAll(status);
      this.indeterminate = this.selection.length > 0 &&
          this.selection.length < this.dataList.length;
      this.$nextTick(() => {
        this.$emit('selectChange', this.selection);
      });
    },
    onSelectChange (currentItem, status) {
      if (status) {
        this.selection.push(currentItem);
      }
      this.selection = this.selection.filter(item => item._checked && !item._disabled);
      this.$nextTick(() => {
        this.allChecked = this.selection.length === this.dataList.length;
        this.indeterminate = this.selection.length > 0 &&
          this.selection.length < this.dataList.length;
        this.$emit('selectChange', this.selection);
      });
    },
    composeData () {
      this.allChecked = this.allSelected;
      const list = [];
      const selectedList = [];
      this.datasource && this.datasource.map((item, index) => {
        item._checked = (item.hasOwnProperty('_checked') && item._checked) || this.allChecked;
        item._disabled = (item.hasOwnProperty('_disabled') && item._disabled) || this.allChecked;
        item._checked && selectedList.push(item);
        list.push(item);
      });
      this.dataList = list;
      this.selection = selectedList;
      this.allChecked = this.dataList.length !== 0 && this.selection.length === this.dataList.length;
      this.indeterminate = this.selection.length > 0 &&
        this.selection.length < this.dataList.length;
    },
    setCurrentScrollBox (e) {
      this.scrollBox = e.target.className;
    },
    removeCurrentScrollBox () {
      this.scrollBox = '';
    },
    getTbodyStyle () {
      const [ tableStyle ] = this.$el.querySelector('table').getClientRects();
      const tbodyEl = this.$el.querySelector('.c-scroll__tbody') || this.$el.querySelector('.c-table__body');
      const tbodyWrapper = this.$el.querySelector('.c-table__wrapper');
      const theadHeight = tableStyle.height || this.maxLevel * 40;
      const scrollBarHeight = tbodyEl.offsetHeight !== tbodyEl.clientHeight ? this.scrollBarSize : 0;
      const height = `${this.height - theadHeight - scrollBarHeight}px`;

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
      tbodyEl.style.maxHeight = `${this.height - theadHeight}px`;
    },
    getCurrentScrollBarSize () {
      const ua = window.navigator.userAgent;
      if (ua.indexOf('MSIE') > 0 ||
        Boolean(ua.match(/Trident.*rv:11./))) {
        this.scrollBarSize = getScrollBarSize();
      }
    },
    rowEnter (index) {
      this.hoverRowIndex = index;
      this.$emit('rowEnter', index);
    },
    rowLeave () {
      this.hoverRowIndex = '';
      this.$emit('rowLeave');
    },
    onYscroll (e) {
      if (!this.hasFixed) return
      const scrollEl = this.$el.querySelector('.c-scroll__tbody');
      if (!(e.target.parentElement.className).includes(this.scrollBox)) {
        e.target.scrollTop = scrollEl.scrollTop;
        return
      }
      this.$refs.fixedleft.scrollTop = e.target.scrollTop;
      this.$refs.fixedright.scrollTop = e.target.scrollTop;
      scrollEl.scrollTop = e.target.scrollTop;
    },
    onScroll (e) {
      const maxWidth = e.target.scrollWidth - e.target.offsetWidth;
      if (!e.target.className.includes(this.scrollBox)) {
        // fix mouseleave but scroll is keeping
        e.target.scrollTop = this.$refs.fixedleft.scrollTop;
        return
      }

      const { scrollLeft, scrollTop } = e.target;
      const scrollEl = this.$el.querySelector('.c-scroll__thead');

      this.isScrollMove = scrollLeft > 0;
      if (this.$refs.fixedleft) {
        this.$refs.fixedleft.scrollTop = scrollTop;
      }
      if (this.$refs.fixedright) {
        this.$refs.fixedright.scrollTop = scrollTop;
      }
      if (scrollLeft > maxWidth) {
        e.target.scrollLeft = maxWidth;
        return
      }
      if (scrollEl) {
        scrollEl.scrollLeft = scrollLeft;
      }
    },
    theadScroll (e) {
      if (!this.hasFixed) return
      const scrollEl = this.$el.querySelector('.c-scroll__tbody');
      const { scrollLeft } = e.target;
      if (scrollEl) {
        scrollEl.scrollLeft = scrollLeft;
      }
    },
    sorter ({ key, order }) {
      this.$emit('sort', { key, order });
    },
    getLevels (item) {
      item.children.forEach(child => {
        child.level = item.level + 1;
        if (child.children) {
          child.children = this.getLevels(child);
        }
      });
      return item.children
    },
    getAllColumns (list) {
      const columns = [];
      list.forEach((item, index) => {
        let classname = [];
        index === 0 && classname.push('c-table__bl');
        index === list.length - 1 && classname.push('c-table__br');
        classname = classname.join(' ');
        item.className = item.hasOwnProperty('className') ? `${item.className} ${classname}` : classname;
        if (item.children && item.children.length > 0) {
          columns.push(...this.getAllColumns(item.children));
        } else {
          columns.push(item);
        }
      });
      return columns
    },
    // set colspan
    getLeafColumns (list) {
      const columns = [];
      list.forEach(item => {
        item.level = 1;
        if (item.children) {
          item.colspan = this.getAllColumns(item.children).length;
          item.children = this.getLeafColumns(item.children);
          item.children = this.getLevels(item);
        } else {
          item.colspan = 1;
        }
        columns.push(item);
      });
      return columns
    },
    // set rolspan
    getColumnsRows (list, maxLevel) {
      list.forEach(item => {
        item.rowspan = maxLevel - item.level + 1;
        if (item.children) {
          item.rowspan = 1;
          item.children = this.getColumnsRows(item.children, maxLevel);
        }
      });
      return list
    },

    findMaxLevel (list) {
      let maxlevel = 0;
      list.forEach(item => {
        if (item.children) {
          maxlevel = Math.max(this.findMaxLevel(item.children), maxlevel);
        } else {
          maxlevel = Math.max(item.level, maxlevel);
        }
      });
      return maxlevel
    },
    getAllColumnsRows (list) {
      const columns = [];
      list.forEach(item => {
        columns.push(item);
        if (item.children && item.children.length > 0) {
          columns.push(...this.getAllColumnsRows(item.children));
        }
      });
      return columns
    },
    getLevelColumns (list, maxlevel) {
      const allColumns = this.getAllColumnsRows(list);
      const columns = [];
      for (let i = 1; i <= maxlevel; i++) {
        columns.push({
          level: i,
          columns: allColumns.filter(item => item.level === i)
        });
      }
      return columns
    },
    getColumnsDetail () {
      const columns = this.getLeafColumns(this.columns);
      const maxlevel = this.findMaxLevel(this.columns);
      const columnsrows = this.getColumnsRows(columns, maxlevel);
      this.composeColumns = this.getLevelColumns(columnsrows, maxlevel);
      this.maxLevel = maxlevel;
      if (!this.hasFixed) return
      const leftColumns = [];
      const rightColumns = [];
      this.columns.map(item => {
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

const OPPOSITE_DIRECTION = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
};

const SHOW_MATCH_MAP = {
  hover: 'mouseenter',
  focus: 'focus',
  click: 'click'
};

const HIDE_MATCH_MAP = {
  hover: 'mouseleave',
  focus: 'blur',
  click: 'click'
};

const defaultDelayTime = 100;

var $1_40 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-tip",on:{"mouseenter":_vm.show,"mouseleave":_vm.hide,"!focus":function($event){return _vm.show($event)},"!blur":function($event){return _vm.hide($event)},"click":_vm.show}},[_vm._t("default"),_c('c-portal',{attrs:{"role":"tooltip","aria-hidden":'' + !_vm.visible}},[(!_vm.disabled)?_c('transition',{on:{"before-enter":_vm.beforeEnter,"enter":_vm.enter,"after-enter":_vm.afterEnter,"leave":_vm.leave,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],ref:"tip",staticClass:"c-tip__container",class:_vm.theme === 'light' && 'c-tip__container--light',on:{"mouseenter":_vm.show,"mouseleave":_vm.hide}},[_c('i',{staticClass:"c-tip__arrow",class:_vm.arrowClass}),(_vm.content)?_c('div',[_vm._v(_vm._s(_vm.content))]):_vm._e(),_vm._t("content")],2)]):_vm._e()],1)],2)},staticRenderFns: [],
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

  data () {
    return {
      visible: false,
      tidIn: null,
      tidOut: null
    }
  },

  computed: {
    arrowClass () {
      const position = OPPOSITE_DIRECTION[this.position];
      return `c-tip__arrow--${position}`
    }
  },

  methods: {
    show ({ type }) {
      if (SHOW_MATCH_MAP[this.trigger] === type) {
        this.clearTimeout();
        this.visible = true;
      }
    },

    hide ({ type = 'click' } = {}) {
      if (HIDE_MATCH_MAP[this.trigger] === type) {
        this.clearTimeout();
        this.tidOut = setTimeout(() => {
          this.visible = false;
        }, this.hideDelay);
      }
    },

    resize () {
      this.handleResize(this.$refs.tip);
    },

    beforeEnter ({ style }) {
      style.display = 'block';
      style.visibility = 'hidden';
      style.zIndex = zIndex.next();
    },

    enter ({ style }, done) {
      style.opacity = 0;

      this.tidIn = setTimeout(() => {
        style.maxWidth = this.maxWidth;
        style.visibility = 'visible';
        style.opacity = 1;
        this.$nextTick(done);
      }, this.showDelay);
    },

    afterEnter (el) {
      this.handleResize(el);
    },

    leave ({ style }) {
      style.opacity = 0;
      style.visibility = 'hidden';
      this.clearTimeout();
    },

    afterLeave ({ style }) {
      style.cssText = '';
      style.display = 'none';
    },

    clearTimeout () {
      clearTimeout(this.tidOut);
      clearTimeout(this.tidIn);
    },

    handleResize (el) {
      if (!el || !el.style || !this.visible) {
        return
      }

      // SEE https://imququ.com/post/document-scrollingelement-in-chrome.html
      const { scrollLeft, scrollTop } = document.scrollingElement || document.body;

      const elRect = this.$el.getBoundingClientRect();
      const tipRect = this.$refs.tip.getBoundingClientRect();
      const { style } = el;

      // eslint-disable-next-line
      switch (this.position) {
        case 'top':
          style.top = `${scrollTop + elRect.top - tipRect.height}px`;
          style.left = `${scrollLeft + elRect.left + (elRect.width - tipRect.width) / 2}px`;
          style.marginTop = '-10px';
          style.marginLeft = '';
          return

        case 'bottom':
          style.top = `${scrollTop + elRect.top + elRect.height}px`;
          style.left = `${scrollLeft + elRect.left + (elRect.width - tipRect.width) / 2}px`;
          style.marginTop = '10px';
          style.marginLeft = '';
          return

        case 'left':
          style.top = `${scrollTop + elRect.top - (tipRect.height - elRect.height) / 2}px`;
          style.left = `${scrollLeft + elRect.left - tipRect.width}px`;
          style.marginLeft = '-10px';
          style.marginTop = '';
          return

        case 'right':
          style.top = `${scrollTop + elRect.top - (tipRect.height - elRect.height) / 2}px`;
          style.left = `${scrollLeft + elRect.left + elRect.width}px`;
          style.marginLeft = '10px';
          style.marginTop = '';
      }
    },

    clickOutside ({ target }) {
      if (!this.visible) {
        return
      }

      const el = this.$el;
      const { tip } = this.$refs;
      const isOutside = !contains(el, target) && !contains(tip, target);
      if (isOutside && this.visible) {
        this.hide();
      }
    }
  },

  updated () {
    if (this.visible) {
      this.$nextTick(this.resize);
    }
  },

  mounted () {
    this.resize = this.resize.bind(this);
    this.clickOutside = this.clickOutside.bind(this);
    this.winResize = throttle(this.resize, this.$clair.defaultThrottleTime);
    window.addEventListener('resize', this.winResize);
    document.body.addEventListener('click', this.clickOutside);
  },

  beforeDestroy () {
    this.clearTimeout();
    window.removeEventListener('resize', this.winResize);
    document.body.removeEventListener('click', this.clickOutside);
  }
}

var $1_41 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-toolbar",class:{'is-primary': _vm.primary},style:(_vm.style)},[_vm._t("default")],2)},staticRenderFns: [],
  props: {
    height: String,
    background: String,
    color: String,
    primary: Boolean
  },
  computed: {
    style () {
      const style = {};
      const { height, background, color } = this;
      if (height) style.lineHeight = height;
      if (background) style.background = background;
      if (color) style.color = color;
      return style
    }
  },
  name: 'c-toolbar'
}

var $1_42 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-toolbar__item",class:{'is-flex': _vm.flex}},[_vm._t("default")],2)},staticRenderFns: [],
  props: {
    flex: Boolean
  },
  name: 'c-toolbar-item'
}

var NodeLabel = {
  props: {
    node: VueTypes.object.isRequired
  },
  inject: ['$tree'],
  render (h) {
    const { $tree, node } = this;
    const $node = this.$parent;
    if ($tree.$scopedSlots.label) {
      return $tree.$scopedSlots.label({ node, $node })
    }
    return h('div', node.label)
  }
}

var TreeNode = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-tree__node"},[_c('div',{staticClass:"c-tree__title",class:{ 'is-leaf': !_vm.hasChildren },on:{"click":_vm.onNodeClick}},[(_vm.hasChildren)?_c('c-icon',{attrs:{"valign":"middle","name":_vm.iconName}}):_vm._e(),(_vm.$tree.checkable)?_c('c-checkbox',{attrs:{"indeterminate":_vm.indeterminate},on:{"change":_vm.checkChange},model:{value:(_vm.checked),callback:function ($$v) {_vm.checked=$$v;},expression:"checked"}}):_vm._e(),_c('div',{staticClass:"c-tree__label"},[_c('c-node-label',{attrs:{"node":_vm.node}})],1)],1),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showChildren),expression:"showChildren"}],staticClass:"c-tree_children"},_vm._l((_vm.node.children),function(child,index){return _c('c-tree-node',{key:index,ref:"children",refInFor:true,attrs:{"node":child,"level":_vm.level + 1}})}))])},staticRenderFns: [],
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
    hasChildren () {
      const { children } = this.node;
      return children && children.length
    },
    showChildren () {
      return this.hasChildren && this.expanded
    },
    iconName () {
      return this.expanded ? 'chevron-down' : 'chevron-right'
    },
    id () {
      return this.node[this.$tree.nodeKey]
    }
  },
  data () {
    return {
      indeterminate: false,
      expanded: false,
      checked: false
    }
  },

  created () {
    const { $tree, $parent, id } = this;

    // expanded keys
    this.expanded = this.$tree.defaultExpandAll || $tree.expandedKeys[id];

    // checked status
    this.checked = $parent.checked || $tree.checkedKeys[id];

    // reactive to expandedKeys or checkedKeys change
    if (id !== void 0) {
      if ($parent.checked) $tree.$emit('checked-change', id, true);
      this.$watch('$tree.expandedKeys', keys => {
        this.expanded = keys[id];
      });
      this.$watch('$tree.checkedKeys', keys => {
        this.checked = keys[id];
      });
    }

    // parent node check changed, notify children
    this.$on('parent-check-change', checked => {
      this.checked = checked;
      this.indeterminate = false;
      this.updateChildren(checked);
      this.$tree.$emit('checked-change', this.id, checked);
    });

    // child check changed, update self
    this.$on('child-check-change', this.childCheckChange);
  },
  methods: {
    getChildren () {
      if (!this.hasChildren) return [this]
      return this.$refs.children.reduce((arr, child) => {
        return arr.concat(child.getChildren())
      }, [this])
    },
    onNodeClick () {
      this.setExpanded(!this.expanded);
      this.$emit('node-click', this.node);
    },
    setExpanded (expanded) {
      this.expanded = expanded;
      if (this.id !== void 0) {
        this.$tree.$emit('expanded-change', this.id, this.expanded);
      }
    },
    checkChange (checked) {
      this.$parent.$emit('child-check-change', checked);
      this.updateChildren(checked);
      this.$tree.$emit('check-change', this.node, this.checked);
    },
    childCheckChange (checked) {
      const $children = this.$refs.children;
      const checkedCount = $children.filter(c => c.checked).length;
      const total = $children.length;
      this.checked = checkedCount === total;
      this.indeterminate = checkedCount > 0 && checkedCount < total;
      this.$parent.$emit('child-check-change', this.checked);
      this.$tree.$emit('checked-change', this.id, checked);
    },
    updateChildren (checked) {
      if (!this.hasChildren) return
      this.$refs.children
        .forEach(c => c.$emit('parent-check-change', checked));
    }
  }
}

var $1_43 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-tree"},_vm._l((_vm.nodes),function(node,index){return _c('c-tree-node',{key:index,attrs:{"node":node,"level":1}})}))},staticRenderFns: [],
  name: 'c-tree',
  props: {
    nodes: VueTypes.arrayOf(Object).isRequired,
    checkable: VueTypes.bool.def(false),
    defaultExpandedKeys: VueTypes.array,
    defaultExpandAll: VueTypes.bool.def(false),
    defaultCheckedKeys: VueTypes.array,
    nodeKey: VueTypes.string.def('id')
  },
  provide () {
    return {
      '$tree': this
    }
  },
  components: {
    'c-tree-node': TreeNode
  },
  data () {
    return {
      isRoot: true,
      expandedKeys: {},
      checkedKeys: {}
    }
  },
  watch: {
    defaultExpandedKeys: {
      immediate: true,
      handler (keys) {
        this.expandedKeys = keys.reduce((obj, key) => {
          obj[key] = true;
          return obj
        }, {});
      }
    },
    defaultCheckedKeys: {
      immediate: true,
      handler (keys) {
        this.checkedKeys = keys.reduce((obj, key) => {
          obj[key] = true;
          return obj
        }, {});
      }
    }
  },
  created () {
    this.$on('expanded-change', (key, expanded) => {
      this.expandedKeys[key] = expanded;
    });
    this.$on('checked-change', (key, checked) => {
      if (key === void 0) return
      this.checkedKeys[key] = checked;
    });
  },
  methods: {
    setExpandedByNode (node, expanded) {
      this.filterNodes($node => $node.node === node)
        .forEach($node => $node.setExpanded(expanded));
    },
    getCheckedNodes (leafOnly) {
      const filter = $node => {
        const isChecked = $node.checked;
        if (leafOnly) return !$node.node.children && isChecked
        return isChecked
      };
      return this.filterNodes(filter).map($node => $node.node)
    },
    filterNodes (filter) {
      const allNodes = this.$children.reduce(
        (arr, branch) => arr.concat(branch.getChildren()),
        []
      );
      const filtered = allNodes.filter(filter);
      return filtered
    },
    getExpandedNodes () {
      const filter = $node => $node.expanded;
      return this.filterNodes(filter).map($node => $node.node)
    },
    getExpandedKeys () {
      return this.getExpandedNodes().map(node => node[this.nodeKey])
    }
  }
}

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

let uploadFileCount = 0;

var $1_45 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-upload is-inline-block"},[_c('label',{staticClass:"is-inline-block",on:{"click":function($event){$event.preventDefault();return _vm.chooseFile($event)}}},[_vm._t("btn",[_c('c-button',_vm._b({attrs:{"type":"button","icon":"upload","loading":_vm.loading}},'c-button',_vm.$attrs,false),[_vm._v("上传文件")])]),_vm._t("file-list",_vm._l((_vm.filenames),function(item,index){return _c('span',{staticClass:"has-padding-left-sm"},[_vm._v(_vm._s(item))])}),{filenames:_vm.filenames})],2),_c('input',{ref:"input",staticClass:"is-none",attrs:{"name":"file","type":"file","accept":_vm.accept,"multiple":_vm.multiple},on:{"change":_vm.handleChange}})])},staticRenderFns: [],
  name: 'c-upload',
  props: {
    limit: Number,
    defaultFileList: {
      type: Array,
      default () {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default () {
        return false
      }
    },
    autoUpload: {
      type: Boolean,
      default () {
        return true
      }
    },
    validator: Function,
    action: String,
    accept: String,
    name: {
      type: String,
      default () {
        return 'file'
      }
    },
    headers: {
      type: Object,
      default () {
        return {}
      }
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    httpRequest: Function
  },

  data () {
    return {
      loading: false,
      tmpIndex: 1,
      reqs: {},
      files: [],
      filenames: [],
      remoteFilenames: []
    }
  },

  methods: {
    chooseFile () {
      if (this.loading) return
      this.$refs.input.value = null;
      this.$refs.input.click();
    },

    handleChange (ev) {
      const { files } = ev.target;

      if (!files) return
      this.uploadFiles(files);
    },

    uploadFiles (files) {
      if (this.limit && this.defaultFileList.length + files.length > this.limit) {
        this.$emit('exceed', files, this.defaultFileList);
        return
      }

      let postFiles = Array.from(files);
      if (postFiles.length === 0) return
      if (!this.multiple) { postFiles = postFiles.slice(0, 1); }
      this.files = postFiles;
      this.filenames = postFiles.map((file) => {
        return file.name
      });

      if (this.autoUpload === false) return
      this.submit();
    },

    submit () {
      this.files.forEach((rawFile) => {
        this.addFid(rawFile);
        this.upload(rawFile);
      });
    },

    upload (rawFile) {
      if (!this.validator) return this.post(rawFile)
      const isValid = this.validator(rawFile);
      if (isValid) this.post(rawFile);
    },

    post (rawFile) {
      this.loading = true;
      uploadFileCount++;
      const { fid } = rawFile;
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: (e) => {
          this.$emit('progress', e, rawFile);
        },
        onSuccess: (res) => {
          this.$emit('success', res, rawFile);
          delete this.reqs[fid];
          uploadFileCount--;
          if (uploadFileCount === 0) this.loading = false;
        },
        onError: (err) => {
          this.$emit('error', err, rawFile);
          delete this.reqs[fid];
          uploadFileCount--;
          if (uploadFileCount === 0) this.loading = false;
        }
      };
      if (this.httpRequest instanceof Function) {
        const { headers, file, data, filename, action } = options;
        this.reqs[fid] = this.httpRequest({
          headers, file, data, filename, action
        })
          .then(options.onSuccess)
          .catch(options.onError);
        return
      }
      const req = upload(options);
      this.reqs[fid] = req;
    },

    addFid (rawFile) {
      if (!rawFile.fid) {
        rawFile.fid = Date.now() + this.tmpIndex++;
      }
    }
  }
}

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

var CModalAlert = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('c-modal',{attrs:{"title":_vm.title,"visible":_vm.visible,"width":"400px"},on:{"close":_vm.onCancel,"after-leave":function($event){_vm.$emit('destroy');}}},[_c('div',[_vm._t("message")],2),_c('div',{attrs:{"slot":"footer"},slot:"footer"},[_c('c-button',{attrs:{"primary":"","autofocus":""},on:{"click":_vm.onConfirm}},[_vm._v("确定")])],1)])},staticRenderFns: [],
  props: {
    title: String,
    msg: {
      type: [String, Function],
      require: true
    }
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    onCancel () {
      this.visible = false;
      this.$emit('cancel');
    },
    onConfirm () {
      this.visible = false;
      this.$emit('confirm');
    }
  },
  watch: {
    msg: {
      immediate: true,
      handler () {
        const { msg } = this;
        const h = this.$createElement.bind(this);
        const message = typeof msg === 'function' ? msg(h) : h('span', null, msg);
        this.$slots.message = message;
      }
    }
  }
}

var CModalMessage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('c-modal',{attrs:{"width":"400px","title":_vm.title,"visible":_vm.visible},on:{"close":_vm.onCancel,"after-leave":function($event){_vm.$emit('destroy');}}},[_c('div',{staticClass:"c-modal-message"},[_c('c-icon',{class:_vm.type,attrs:{"type":"feather","name":_vm.icon}}),_c('div',[_vm._t("message")],2)],1),_c('div',{attrs:{"slot":"footer"},slot:"footer"},[_c('c-button',{attrs:{"outline":""},on:{"click":_vm.onCancel}},[_vm._v("取消")]),_c('c-button',{attrs:{"primary":"","autofocus":""},on:{"click":_vm.onConfirm}},[_vm._v("确认")])],1)])},staticRenderFns: [],
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
  data () {
    return { visible: true }
  },
  computed: {
    icon () {
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
    onCancel () {
      this.visible = false;
      this.$emit('cancel');
    },
    onConfirm () {
      this.visible = false;
      this.$emit('confirm');
    }
  },
  watch: {
    msg: {
      immediate: true,
      handler () {
        const { msg } = this;
        const h = this.$createElement.bind(this);
        const message = typeof msg === 'function' ? msg(h) : h('span', null, msg);
        this.$slots.message = message;
      }
    }
  }
}

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

var CNotification = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('c-notification',{attrs:{"visible":_vm.visible,"title":_vm.title,"message":_vm.message,"position":_vm.position,"duration":_vm.duration,"offset":_vm.offset,"dangerouslySetInnerHTML":_vm.dangerouslySetInnerHTML},on:{"close":_vm.onClose,"after-leave":_vm.afterLeave}},[_c('div',{staticClass:"c-notification__icon"},[(_vm.type)?_c('c-icon',{class:_vm.type,attrs:{"type":"feather","name":_vm.icon}}):_vm._e()],1)])},staticRenderFns: [],
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
  data () {
    return {
      visible: true
    }
  },
  computed: {
    icon () {
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
    onClose () {
      this.visible = false;
      this.$emit('close');
    },
    afterLeave () {
      this.$emit('destroy');
    }
  }
}

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

var mixins = {
  validatable: validatable,
  resettable: resettable
};
var Clair = {
  mixins: mixins,
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
      $clair.mixins = mixins;

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
