/*!
 * Clair 0.7.14
 * (c) 2017-present clair-design@75team
 * Released under the MIT License.
 */

import isPlainObject from 'lodash/isPlainObject';
import featherIcons from 'feather-vue';
import throttle from 'lodash/throttle';
import ColorPicker from 'v-color';
import VCtrl from 'v-ctrl';
import clamp from 'lodash/clamp';
import cloneDeep from 'lodash/cloneDeep';

/**
 * Copyright github:dwightjack/vue-types
 * Adapted from: https://github.com/dwightjack/vue-types/
 */

var ObjProto = Object.prototype;
var toString = ObjProto.toString;

var hasOwn = ObjProto.hasOwnProperty;

var FN_MATCH_REGEXP = /^\s*function (\w+)/;

// https://github.com/vuejs/vue/blob/dev/src/core/util/props.js#L177
var getType = function (fn) {
  var type = fn !== null && fn !== undefined ? fn.type ? fn.type : fn : null;
  var match = type && type.toString().match(FN_MATCH_REGEXP);
  return match && match[1]
};

var getNativeType = function (value) {
  if (value === null || value === undefined) { return null }
  var match = value.constructor.toString().match(FN_MATCH_REGEXP);
  return match && match[1]
};

/**
 * No-op function
 */
var noop = function () {};

/**
 * Determines whether the passed value is an integer. Uses `Number.isInteger` if available
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
 * @param {*} value - The value to be tested for being an integer.
 * @returns {boolean}
 */
var isInteger =
  Number.isInteger ||
  function (value) {
    return (
      typeof value === 'number' &&
      isFinite(value) &&
      Math.floor(value) === value
    )
  };

/**
 * Determines whether the passed value is an Array.
 *
 * @param {*} value - The value to be tested for being an array.
 * @returns {boolean}
 */
var isArray =
  Array.isArray ||
  function (value) {
    return toString.call(value) === '[object Array]'
  };

/**
 * Checks if a value is a function
 *
 * @param {any} value - Value to check
 * @returns {boolean}
 */
var isFunction = function (value) { return toString.call(value) === '[object Function]'; };

/**
 * Adds a `def` method to the object returning a new object with passed in argument as `default` property
 *
 * @param {object} type - Object to enhance
 */
var withDefault = function (type) {
  Object.defineProperty(type, 'def', {
    value: function value (def) {
      if (def === undefined && !this.default) {
        return this
      }
      if (!isFunction(def) && !validateType(this, def)) {
        warn(((this._vueTypes_name) + " - invalid default value: \"" + def + "\""), def);
        return this
      }
      if (isArray(def)) {
        this.default = function () { return [].concat( def ); };
      } else if (isPlainObject(def)) {
        this.default = function () { return Object.assign({}, def); };
      } else {
        this.default = def;
      }
      return this
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
var withRequired = function (type) {
  Object.defineProperty(type, 'isRequired', {
    get: function get () {
      this.required = true;
      return this
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
var toType = function (name, obj) {
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
  return obj
};

/**
 * Validates a given value against a prop type object
 *
 * @param {Object|*} type - Type to use for validation. Either a type object or a constructor
 * @param {*} value - Value to check
 * @param {boolean} silent - Silence warnings
 * @returns {boolean}
 */
var validateType = function (type, value, silent) {
  if ( silent === void 0 ) silent = false;

  var typeToCheck = type;
  var valid = true;
  var expectedType;
  if (!isPlainObject(type)) {
    typeToCheck = { type: type };
  }
  var namePrefix = typeToCheck._vueTypes_name
    ? typeToCheck._vueTypes_name + ' - '
    : '';

  if (hasOwn.call(typeToCheck, 'type') && typeToCheck.type !== null) {
    if (isArray(typeToCheck.type)) {
      valid = typeToCheck.type.some(function (type) { return validateType(type, value, true); });
      expectedType = typeToCheck.type.map(function (type) { return getType(type); }).join(' or ');
    } else {
      expectedType = getType(typeToCheck);

      if (expectedType === 'Array') {
        valid = isArray(value);
      } else if (expectedType === 'Object') {
        valid = isPlainObject(value);
      } else if (
        expectedType === 'String' ||
        expectedType === 'Number' ||
        expectedType === 'Boolean' ||
        expectedType === 'Function'
      ) {
        valid = getNativeType(value) === expectedType;
      } else {
        valid = value instanceof typeToCheck.type;
      }
    }
  }

  if (!valid) {
    silent === false &&
      warn((namePrefix + "value \"" + value + "\" should be of type \"" + expectedType + "\""));
    return false
  }

  if (
    hasOwn.call(typeToCheck, 'validator') &&
    isFunction(typeToCheck.validator)
  ) {
    // swallow warn
    var oldWarn;
    if (silent) {
      oldWarn = warn;
      warn = noop;
    }

    valid = typeToCheck.validator(value);
    oldWarn && (warn = oldWarn);

    if (!valid && silent === false) {
      warn((namePrefix + "custom validation failed"));
    }
    return valid
  }
  return valid
};

var warn = noop;

/**
 * Copyright github:dwightjack/vue-types
 * Adapted from: https://github.com/dwightjack/vue-types/
 */

var VueTypes = {
  get any () {
    return toType('any', {
      type: null
    })
  },

  get func () {
    return toType('function', {
      type: Function
    }).def(currentDefaults.func)
  },

  get bool () {
    return toType('boolean', {
      type: Boolean
    }).def(currentDefaults.bool)
  },

  get string () {
    return toType('string', {
      type: String
    }).def(currentDefaults.string)
  },

  get number () {
    return toType('number', {
      type: Number
    }).def(currentDefaults.number)
  },

  get array () {
    return toType('array', {
      type: Array
    }).def(currentDefaults.array)
  },

  get object () {
    return toType('object', {
      type: Object
    }).def(currentDefaults.object)
  },

  get integer () {
    return toType('integer', {
      type: Number,
      validator: function validator (value) {
        return isInteger(value)
      }
    }).def(currentDefaults.integer)
  },

  get symbol () {
    return toType('symbol', {
      type: null,
      validator: function validator (value) {
        return typeof value === 'symbol'
      }
    })
  },

  custom: function custom (validatorFn, warnMsg) {
    if ( warnMsg === void 0 ) warnMsg = 'custom validation failed';

    if (typeof validatorFn !== 'function') {
      throw new TypeError(
        '[VueTypes error]: You must provide a function as argument'
      )
    }

    return toType(validatorFn.name || '<<anonymous function>>', {
      validator: function validator (value) {
        var valid = validatorFn(value);
        if (!valid) { warn(((this._vueTypes_name) + " - " + warnMsg)); }
        return valid
      }
    })
  },

  oneOf: function oneOf (arr) {
    if (!isArray(arr)) {
      throw new TypeError(
        '[VueTypes error]: You must provide an array as argument'
      )
    }
    var msg = "oneOf - value should be one of \"" + (arr.join('", "')) + "\"";
    var allowedTypes = arr.reduce(function (ret, v) {
      if (v !== null && v !== undefined) {
        ret.indexOf(v.constructor) === -1 && ret.push(v.constructor);
      }
      return ret
    }, []);

    return toType('oneOf', {
      type: allowedTypes.length > 0 ? allowedTypes : null,
      validator: function validator (value) {
        var valid = arr.indexOf(value) !== -1;
        if (!valid) { warn(msg); }
        return valid
      }
    })
  },

  instanceOf: function instanceOf (instanceConstructor) {
    return toType('instanceOf', {
      type: instanceConstructor
    })
  },

  oneOfType: function oneOfType (arr) {
    if (!isArray(arr)) {
      throw new TypeError(
        '[VueTypes error]: You must provide an array as argument'
      )
    }

    var hasCustomValidators = false;

    var nativeChecks = arr.reduce(function (ret, type, i) {
      if (isPlainObject(type)) {
        if (type._vueTypes_name === 'oneOf') {
          return ret.concat(type.type || [])
        }
        if (type.type && !isFunction(type.validator)) {
          if (isArray(type.type)) { return ret.concat(type.type) }
          ret.push(type.type);
        } else if (isFunction(type.validator)) {
          hasCustomValidators = true;
        }
        return ret
      }
      ret.push(type);
      return ret
    }, []);

    if (!hasCustomValidators) {
      // we got just native objects (ie: Array, Object)
      // delegate to Vue native prop check
      return toType('oneOfType', {
        type: nativeChecks
      })
    }

    var typesStr = arr
      .map(function (type) {
        if (type && isArray(type.type)) {
          return type.type.map(getType)
        }
        return getType(type)
      })
      .reduce(function (ret, type) { return ret.concat(isArray(type) ? type : [type]); }, [])
      .join('", "');

    return this.custom(function oneOfType (value) {
      var valid = arr.some(function (type) {
        if (type._vueTypes_name === 'oneOf') {
          return type.type ? validateType(type.type, value, true) : true
        }
        return validateType(type, value, true)
      });
      if (!valid) { warn(("oneOfType - value type should be one of \"" + typesStr + "\"")); }
      return valid
    })
  },

  arrayOf: function arrayOf (type) {
    return toType('arrayOf', {
      type: Array,
      validator: function validator (values) {
        var valid = values.every(function (value) { return validateType(type, value); });
        if (!valid) {
          warn(("arrayOf - value must be an array of \"" + (getType(type)) + "\""));
        }
        return valid
      }
    })
  },

  objectOf: function objectOf (type) {
    return toType('objectOf', {
      type: Object,
      validator: function validator (obj) {
        var valid = Object.keys(obj).every(function (key) { return validateType(type, obj[key]); }
        );
        if (!valid) {
          warn(("objectOf - value must be an object of \"" + (getType(type)) + "\""));
        }
        return valid
      }
    })
  },

  shape: function shape (obj) {
    var keys = Object.keys(obj);
    var requiredKeys = keys.filter(
      function (key) { return obj[key] && obj[key].required === true; }
    );

    var type = toType('shape', {
      type: Object,
      validator: function validator (value) {
        var this$1 = this;

        if (!isPlainObject(value)) {
          return false
        }
        var valueKeys = Object.keys(value);

        // check for required keys (if any)
        if (
          requiredKeys.length > 0 &&
          requiredKeys.some(function (req) { return valueKeys.indexOf(req) === -1; })
        ) {
          warn(
            ("shape - at least one of required properties \"" + (requiredKeys.join('", "')) + "\" is not present")
          );
          return false
        }

        return valueKeys.every(function (key) {
          if (keys.indexOf(key) === -1) {
            if (this$1._vueTypes_isLoose === true) { return true }
            warn(("shape - object is missing \"" + key + "\" property"));
            return false
          }
          var type = obj[key];
          return validateType(type, value[key])
        })
      }
    });

    Object.defineProperty(type, '_vueTypes_isLoose', {
      enumerable: false,
      writable: true,
      value: false
    });

    Object.defineProperty(type, 'loose', {
      get: function get () {
        this._vueTypes_isLoose = true;
        return this
      },
      enumerable: false
    });

    return type
  }
};

var typeDefaults = function () { return ({
  func: noop,
  bool: true,
  string: '',
  number: 0,
  array: function () { return []; },
  object: function () { return ({}); },
  integer: 0
}); };

var currentDefaults = typeDefaults();

Object.defineProperty(VueTypes, 'sensibleDefaults', {
  enumerable: false,
  set: function set (value) {
    if (value === false) {
      currentDefaults = {};
    } else if (value === true) {
      currentDefaults = typeDefaults();
    } else if (isPlainObject(value)) {
      currentDefaults = value;
    }
  },
  get: function get () {
    return currentDefaults
  }
});

VueTypes.utils = {
  validate: function validate (value, type) {
    return validateType(type, value, true)
  },
  toType: toType
};

var start = 1992;

var zIndex = {
  next: function next () {
    return start++
  },
  setInitialZIndex: function setInitialZIndex (zIndex) {
    start = zIndex;
  }
};

/**
 * pretty simple pascalCase function
 *
 * @param {String} str
 */
function pascalCase (str) {
  return str.replace(/(^|-)([a-z])/g, function (_, __, g2) { return g2.toUpperCase(); })
}

/**
 * @desc get Vue Constructor inside Vue instances
 * @param vm {VueComponent} Vue instance
 */
function getVueCtor (vm) {
  // SEE https://github.com/vuejs/vue/blob/dev/src/core/global-api/extend.js#L43
  return vm.constructor.super
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

    return modifiers.filter(function (m) { return this$1[m]; }).map(function (m) { return (block + "--" + m); })
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
 * DOM `contains`
 */
function contains (elem, target) {
  return elem && elem.contains ? elem.contains(target) : false
}

/**
 *
 */
function getPopupStyle (elem, panel) {
  if (!elem || !panel) {
    return 'position: absolute;'
  }
  var clientRect = elem.getBoundingClientRect();
  var windowH = window.innerHeight;
  var windowW = window.innerWidth;
  var marginTop = 4;
  var scrollBarSize = getScrollBarSize();
  var droplistHeight = panel.clientHeight;
  var droplistWidth = panel.clientWidth;
  var clientHeight = clientRect.height + marginTop;
  var defaultTop = clientRect.top + clientHeight + window.pageYOffset;

  var clientY = clientRect.y;
  var compTop = clientY + window.pageYOffset - droplistHeight - marginTop;
  var left =
    droplistWidth + clientRect.left + scrollBarSize + window.pageXOffset > windowW
      ? windowW - droplistWidth - scrollBarSize
      : clientRect.left + window.pageXOffset;
  var top =
    droplistHeight + clientHeight + clientY + scrollBarSize > windowH
      ? compTop
      : defaultTop;
  var zIndex$$1 = zIndex.next();

  return ("\n        position: absolute;\n        top: " + top + "px;\n        left: " + left + "px;\n        z-index: " + zIndex$$1 + ";\n      ")
}

var $2_0 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-breadcrumb__item"},[_vm._t("default")],2)},staticRenderFns: [],
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
};

var Icon = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.ligature)?_c('i',{class:_vm.iconType,style:({ color: _vm.iconColor, fontSize: _vm.size, verticalAlign: _vm.valign })},[_vm._v(_vm._s(_vm.name))]):(_vm.isSvg)?_c('span',{staticClass:"c-icon"},[_vm._v("​"),_c(_vm.svgName,{tag:"component",style:({verticalAlign: _vm.valign}),attrs:{"width":_vm.size,"height":_vm.size,"stroke":_vm.iconColor}})],1):_c('i',{staticClass:"c-icon",class:_vm.classNames,style:({ color: _vm.iconColor, fontSize: _vm.size, verticalAlign: _vm.valign })})},staticRenderFns: [],
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

  data: function data () {
    return {}
  },

  computed: {
    iconType: function iconType () {
      return this.type || 'feather'
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
};

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
    type: {
      type: String,
      default: 'button'
    },
    autofocus: Boolean
  },
  toVueProps(modifiers)
);
var classNames = toClassNames(block, modifiers);

var CButton = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.href)?_c('router-link',{staticClass:"c-button",class:_vm.classNames,attrs:{"tag":"button","to":_vm.href}},[(_vm.iconName)?_c('c-icon',{attrs:{"name":_vm.iconName,"valign":"middle"}}):_vm._e(),(_vm.$slots.default)?_c('span',[_vm._t("default")],2):_vm._e()],1):_c('button',{staticClass:"c-button",class:_vm.classNames,attrs:{"type":_vm.type},on:{"click":_vm.onClick}},[(_vm.iconName)?_c('c-icon',{attrs:{"name":_vm.iconName,"valign":"middle"}}):_vm._e(),(_vm.$slots.default)?_c('span',[_vm._t("default")],2):_vm._e()],1)},staticRenderFns: [],
  name: name,
  props: props,
  components: {
    'c-icon': Icon
  },
  inject: {
    $form: { default: null }
  },
  computed: {
    iconName: function iconName () {
      return this.loading ? 'loader' : this.icon
    },
    actualSize: function actualSize () {
      var ref = this;
      var size = ref.size;
      var $form = ref.$form;
      return size || ($form && $form.size)
    },
    classNames: function classNames$1 () {
      var classList = classNames.call(this);
      var size = this.actualSize;
      if (size) { classList.push(("is-" + size)); }
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
};

var $2_3 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-button-group",class:_vm.className},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-button-group',
  props: {
    size: String
  },

  data: function data () {
    return {}
  },

  computed: {
    className: function className () {
      var ref = this;
      var size = ref.size;
      return size ? ("is-" + size) : ''
    }
  }
};

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
};

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

var DateHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-calendar__header"},[_c('div',{staticClass:"c-calendar__prev-year",class:{disabled: !_vm.isPreYearCanSelect},on:{"click":_vm.prevYear}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevrons-left"}})],1),_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__prev-month",class:{disabled: !_vm.isPreMonthCanSelect},on:{"click":_vm.prevMonth}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevron-left"}})],1),_c('span',{staticClass:"c-calendar__year"},[_vm._v(_vm._s(this.year))]),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__spacer"},[_vm._v("-")]),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__month",on:{"click":_vm.monthtableShow}},[_vm._v(_vm._s(_vm.fixZero(this.month + 1)))]),_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__next-month",class:{disabled: !_vm.isNextMonthCanSelect},on:{"click":_vm.nextMonth}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevron-right"}})],1),_c('a',{staticClass:"c-calendar__next-year",class:{disabled: !_vm.isNextYearCanSelect},on:{"click":_vm.nextYear}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevrons-right"}})],1)])},staticRenderFns: [],
  name: 'c-dateheader',
  components: {
    'c-icon': Icon
  },
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
};

var DateTable = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"c-calendar__day-table"},[_c('thead',[_c('tr',_vm._l((_vm.weeks),function(item){return _c('th',[_vm._v(_vm._s(item))])}),0)]),_c('tbody',_vm._l((_vm.dayRows),function(row,rowIndex){return _c('tr',_vm._l((row),function(item,itemIndex){return _c('td',{class:_vm.getCellCls(item),on:{"click":function($event){return _vm.selectDay(item)},"mouseenter":function($event){return _vm.onMouseEnter($event)}}},[_c('a',{staticClass:"day-cell",attrs:{"data-rowindex":rowIndex,"data-index":itemIndex}},[_vm._v(_vm._s(item.day))])])}),0)}),0)])},staticRenderFns: [],
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
    minTime: function minTime () {
      return new Date(this.minYear, this.minMonth, this.minDay).getTime()
    },
    maxTime: function maxTime () {
      return new Date(this.maxYear, this.maxMonth, this.maxDay).getTime()
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
      var mapDayObj = function (list, classname, year, month) {
        return list.map(function (item) {
          return {
            class: classname,
            day: item,
            month: month,
            year: year
          }
        })
      };
      var lastDayOfCurrentMonth = new Date(this.year, this.month + 1, 0);
      var dayCountOfCurrentMonth = lastDayOfCurrentMonth.getDate();
      var lastDayOfLastMonth = new Date(this.year, this.month, 0);
      var dayCountOfLastMonth = lastDayOfLastMonth.getDate();
      var yearOfLastMonth = lastDayOfLastMonth.getFullYear();
      var monthOfLastMonth = lastDayOfLastMonth.getMonth();
      var lastDayOfNextMonth = new Date(this.year, this.month + 2, 0);
      var yearOfNextMonth = lastDayOfNextMonth.getFullYear();
      var monthOfNextMonth = lastDayOfNextMonth.getMonth();

      var startWeek = new Date(this.year, this.month, 1).getDay();
      var lastMonthDayCount = startWeek || weekDays;
      var nextMonthDays = allDays - lastMonthDayCount - dayCountOfCurrentMonth;
      var lastMonthDates = mapDayObj(
        getRowArr(dayCountOfLastMonth).slice(-lastMonthDayCount),
        'lastmonth', yearOfLastMonth, monthOfLastMonth);
      var currentMonthDates = mapDayObj(getRowArr(dayCountOfCurrentMonth),
        'curmonth', this.year, this.month);
      var nextMonthDates = mapDayObj(getRowArr(nextMonthDays), 'nextmonth', yearOfNextMonth, monthOfNextMonth);
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
      var curTime = new Date(item.year, item.month, item.day).getTime();
      return curTime < this.minTime || curTime > this.maxTime
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
      if (this.isDateDisabled(item)) {
        return
      }
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
};

var MonthTable = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"c-calendar__month-table"},[_c('tbody',_vm._l((_vm.monthRows),function(monthRow){return _c('tr',_vm._l((monthRow),function(item){return _c('td',{on:{"click":function($event){return _vm.selectMonth(item)}}},[_c('a',{staticClass:"month-cell",class:{'disabled': !_vm.isSelectedMonth(item), 'active':_vm.isSelectedMonth(item) && item === _vm.month}},[_vm._v(_vm._s(_vm.mapMonth(item)))])])}),0)}),0)])},staticRenderFns: [],
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
    monthRows: function monthRows () {
      var this$1 = this;

      var deps = 3;
      var rows = [];
      var loop = function ( i ) {
        var getRowArr = function (N) {
          return Array.from(new Array(N), function (val, index) { return index + i; })
        };
        rows.push(getRowArr(deps));
      };

      for (var i = 0; i < this$1.months.length; i += deps) loop( i );
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
};

var Calendar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"c-calendar",class:_vm.className},[_c('c-dateheader',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.year,"month":_vm.month,"monthsShow":_vm.monthsShow},on:{"monthchange":_vm.monthchange,"yearchange":_vm.yearchange,"monthshow":_vm.monthTableShow}}),_c('div',{staticClass:"c-calendar__body"},[(_vm.monthsShow)?_c('c-monthtable',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.year,"month":_vm.month},on:{"change":_vm.selectMonth}}):_vm._e(),(!_vm.monthsShow)?_c('c-datetable',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.year,"month":_vm.month,"day":_vm.day},on:{"monthchange":_vm.monthchange,"yearchange":_vm.yearchange,"change":_vm.selectDay}}):_vm._e()],1)],1)},staticRenderFns: [],
  name: 'c-calendar',
  components: {
    'c-dateheader': DateHeader,
    'c-datetable': DateTable,
    'c-monthtable': MonthTable
  },
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
    },
    format: function format () {
      return this.pattern ? this.pattern : this.type === 'month' ? 'yyyy-MM' : 'yyyy-MM-dd'
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
    },
    type: function type (newVal) {
      this.monthsShow = newVal === 'month';
    }
  },
  methods: {
    syncDate: function syncDate () {
      if (this.type === 'month') {
        this.monthsShow = true;
      }
      this.date = this.value || new Date().format(this.format);
      // this.date = this.value || this.date || new Date().format(this.format)
      if (new Date(this.date) > new Date(this.maxDate)) { this.date = this.maxDate; }
      if (new Date(this.date) < new Date(this.minDate)) { this.date = this.minDate; }
      this.date = new Date(this.date).format(this.format);
      var d = new Date(this.date);
      if (!isNaN(d.getTime())) {
        this.year = d.getFullYear();
        this.month = d.getMonth();
        this.day = this.type === 'month' ? '' : d.getDate();
      }
    },
    selectDay: function selectDay (day) {
      this.day = day;
      var date = (this.year) + "-" + (this.fixZero(this.month + 1)) + "-" + (this.fixZero(this.day));
      this.date = new Date(date).format(this.format);
      this.$emit('update', this.date);
    },
    selectMonth: function selectMonth (month) {
      this.monthsShow = this.type === 'month';
      this.month = month;
      this.day = '';
      if (this.type === 'month') {
        var date = (this.year) + "-" + (this.fixZero(this.month + 1));
        this.date = new Date(date).format(this.format);
        this.$emit('update', this.date);
      }
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
      this.$emit('update', new Date(date).format(this.format), true);
    },
    updateMonthBykeydown: function updateMonthBykeydown (num, type) {
      var ref = this.updateMonth(this.year, this.month, num, type);
      var year = ref[0];
      var month = ref[1];
      this.$emit('update', new Date(year, month).format(this.format), true);
    }
  }
};

var $2_8 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-card",class:{'is-horizontal': _vm.horizontal}},[(_vm.$slots.title)?_c('div',{staticClass:"c-card__title"},[_vm._t("title")],2):_vm._e(),(_vm.$slots.media)?_c('div',{staticClass:"c-card__media"},[_vm._t("media")],2):_vm._e(),(_vm.$slots.default)?_c('div',{staticClass:"c-card__body"},[_vm._t("default")],2):_vm._e(),(_vm.$slots.actions)?_c('div',{staticClass:"c-card__actions"},[_vm._t("actions")],2):_vm._e()])},staticRenderFns: [],
  name: 'c-card',
  props: {
    horizontal: Boolean
  },
  data: function data () {
    return {}
  },
  methods: {}
};

var Menu = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('ul',{staticClass:"cascader-menu"},_vm._l((_vm.optionList),function(item){return _c('li',{staticClass:"casecader-menu-item",class:{'active': item.selected, 'disabled': item.disabled},attrs:{"title":item[_vm.showkey]},on:{"click":function($event){return _vm.onMenuClick(item)}}},[_vm._v(_vm._s(item[_vm.labelKey])),(_vm.hasChildren(item))?_c('span',{staticClass:"cascader-icon"},[_c('c-icon',{attrs:{"name":"chevron-right"}})],1):_vm._e()])}),0),_c('div',{staticClass:"c-cascader__childmenu"},[(_vm.childrenOptions.length > 0)?_c('c-cascader-menu',{attrs:{"parentMenu":_vm.currentParentMenu,"options":_vm.childrenOptions,"labelKey":_vm.labelKey,"valueKey":_vm.valueKey,"childrenKey":_vm.childrenKey,"showAllLevel":_vm.showAllLevel,"changeOnSelect":_vm.changeOnSelect,"loadChildren":_vm.loadChildren,"level":_vm.level + 1}}):_vm._e()],1)])},staticRenderFns: [],
  name: 'c-cascader-menu',
  components: {
    'c-icon': Icon
  },
  inject: ['$cascader'],
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
};

/**
 * 检查值是否为空
 */
function isEmpty (value) {
  if (value === null || value === void 0) { return true }
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0
  }
  if (typeof value === 'boolean') { return !value }
  if (typeof value === 'number') { return false }
  if (typeof value === 'object') { return Object.keys(value).length === 0 }
}

/**
 * 获取变量的字符串值
 */
function toString$1 (value) {
  return value === void 0 || value === null
    ? ''
    : value.toString().trim()
}

/**
 * 是否 Promise
 */
function isPromise (p) {
  return typeof p === 'object' && typeof p.then === 'function'
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
    var valid = toString$1(value).length >= parseInt(param);
    var msg = valid ? '' : ("请最少填写" + param + "个字");
    return { valid: valid, msg: msg }
  },

  /**
   * 最大长度验证， 主要针对 IE9 下 textarea 的 maxlength 无效的情况
   * @param param {String} 最多输入多少个字
   */
  maxlength: function (value, param) {
    // value需要转换成字符串计算length，不然数字或者0都会是invalid
    var valid = toString$1(value).length <= parseInt(param);
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
    var valid = pattern.test(toString$1(value));
    var msg = valid ? '' : '邮箱格式不正确';
    return { valid: valid, msg: msg }
  },

  /**
   * 手机号码格式
   */
  mobileType: function (value) {
    var pattern = /^1[3|4|5|7|8]\d{9}$/;
    var valid = pattern.test(toString$1(value));
    var msg = valid ? '' : '手机号码格式不正确';
    return { valid: valid, msg: msg }
  },

  /**
   * 固定电话格式
   */
  telType: function (value) {
    var pattern = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})(-[0-9]{1,4})?$/;
    var valid = pattern.test(toString$1(value));
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
    var valid = pattern.test(toString$1(value));
    var msg = valid ? '' : '请输入整数';
    return { valid: valid, msg: msg }
  },

  /**
   * URL格式
   */
  urlType: function (value) {
    /* eslint-disable max-len, no-useless-escape */
    var pattern = /^(https?\:\/\/)?([a-z\d\-]+\.)+[a-z]{2,6}[\/\?\#]?([\/\?\#][\w|\:|\/|\.|\-|\#|\!|\~|\%|\&|\+|\=|\?|\$]+)?$/i;
    var valid = pattern.test(toString$1(value));
    var msg = valid ? '' : 'URL 格式不正确';
    return { valid: valid, msg: msg }
  },

  /**
   * 自定义正则
   */
  pattern: function (value, param) {
    var valid = param.test(toString$1(value));
    var msg = valid ? '' : '格式不符合要求';
    return { valid: valid, msg: msg }
  }
};

var Validator = { validate: validate };

/**
 * 验证 value 是否符合规则
 * @param value {String} 要验证的值
 * @param rules {Object} 规则
 * @param context {Object} 触发验证的Vue组件
 * @return {Object} 结果对象，有valid和msg两个字段
 */
function validate (value, rules, context) {
  if ( rules === void 0 ) rules = {};

  // msg 为自定义错误信息
  var msg = rules.msg;
  var pass = { valid: true };
  var isValueEmpty = isEmpty(value);

  // 非必填项且没有填写时，不进行校验
  if (!rules.required && isValueEmpty) { return pass }

  var results = Object.keys(rules)
    .filter(function (ruleName) { return canValidate(ruleName, rules[ruleName]); })
    .map(function (ruleName) { return checkSingleRule(ruleName, rules[ruleName], value, msg, context); });

  var hasAsync = results.some(isPromise);
  var getResult = function (results) {
    var failedResult = results.find(function (result) { return !result.valid; });
    return failedResult || pass
  };

  if (hasAsync) { return Promise.all(results).then(getResult) }
  return getResult(results)
}

/**
 * 验证单条规则
 */
function checkSingleRule (ruleName, param, value, msg, context) {
  var validFunction = typeof param === 'function' ? param : ruleset[ruleName];
  var result = validFunction.call(context, value, param);
  if (!result.valid && msg) { // 验证不通过且有自定义消息
    if (typeof msg === 'string') { // 自定义消息为字符串时直接使用
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
    },
    validateThrottle: {
      type: Number,
      default: 0
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
      isValidatable: true,
      // id of the latest validation
      validationId: 0
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
        this.throttledValidate();
      }
    },
    validateThrottle: {
      immediate: true,
      handler: function handler (duration) {
        if (!duration) { this.throttledValidate = this.validate; }
        this.throttledValidate = throttle(this.validate, duration, {
          trailing: true
        });
      }
    }
  },

  methods: {
    validate: function validate () {
      var this$1 = this;

      this.validity.dirty = true;
      var ref = this;
      var $formItem = ref.$formItem;
      var builtinRules = ref.builtinRules;
      var required = $formItem && !this.$parent.isValidatable && $formItem.required;
      var rules = Object.assign({ required: required }, builtinRules, this.rules);
      if (!rules.msg) { rules.msg = {}; }
      if (typeof rules.msg === 'object' && !rules.msg.required) {
        var label = $formItem && $formItem.label ? $formItem.label : '';
        var action = this.$options.name === 'c-input' ? '填写' : '选择';
        rules.msg.required = "请" + action + (label.replace(/[:：]/, ''));
      }
      var result = Validator.validate(this.value, rules, this);
      var setValidity = function (v) { return Object.assign(this$1.validity, v); };
      var isLatest = function (id) { return this$1.validationId === id; };
      {
        this.validationId++;
        var ref$1 = this;
        var validationId = ref$1.validationId;
        if (isPromise(result)) {
          result.then(function (v) {
            if (isLatest(validationId)) { setValidity(v); }
          });
        } else {
          setValidity(result);
        }
      }
      return result
    },
    resetValidity: function resetValidity () {
      Object.assign(this.validity, {
        dirty: false,
        valid: true,
        msg: ''
      });
    }
  }
};

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

var Input = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-input-wrap",class:_vm.className},[_vm._t("prepend"),((_vm.type)==='checkbox'&&(!_vm.multiLine))?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"nativeInput",staticClass:"c-input",attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.inputValue)?_vm._i(_vm.inputValue,null)>-1:(_vm.inputValue)},on:{"input":_vm.onChange,"change":[function($event){var $$a=_vm.inputValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.inputValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.inputValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.inputValue=$$c;}},_vm.onChange],"blur":_vm.onBlur}}):((_vm.type)==='radio'&&(!_vm.multiLine))?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"nativeInput",staticClass:"c-input",attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"type":"radio"},domProps:{"checked":_vm._q(_vm.inputValue,null)},on:{"input":_vm.onChange,"change":[function($event){_vm.inputValue=null;},_vm.onChange],"blur":_vm.onBlur}}):(!_vm.multiLine)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"nativeInput",staticClass:"c-input",attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"type":_vm.type},domProps:{"value":(_vm.inputValue)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.inputValue=$event.target.value;},_vm.onChange],"change":_vm.onChange,"blur":_vm.onBlur}}):_vm._e(),(_vm.multiLine)?_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"textArea",staticClass:"c-input",style:(_vm.textAreaStyle),attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"rows":_vm.rows,"cols":_vm.cols,"wrap":_vm.wrap},domProps:{"value":(_vm.inputValue)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.inputValue=$event.target.value;},_vm.onChange],"change":_vm.onChange}}):_vm._e(),_vm._t("append"),(!_vm.validity.valid)?_c('em',{staticClass:"c-error-msg"},[_vm._v(_vm._s(_vm.validity.msg))]):_vm._e()],2)},staticRenderFns: [],
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
      this.$emit('change', e.target.value, e);
      this.resizeTextArea();
    },

    onBlur: function onBlur (e) {
      this.$emit('blur', e.target.value, e);
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
    var autofocus = ref.autofocus;

    if (multiLine && autosize) {
      this.resizeTextArea();
    }
    if (autofocus) {
      this.$refs.nativeInput.focus();
    }

    var ref$1 = this.$clair;
    var defaultThrottleTime = ref$1.defaultThrottleTime;
    this.resizeTextArea = throttle(
      this.resizeTextArea.bind(this), defaultThrottleTime);
  }
};

var $2_9 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-cascader",class:{'is-open': _vm.isOpen},on:{"click":function($event){_vm.isOpen = true;}}},[_c('div',{staticClass:"cascader-context"},[_c('c-input',{attrs:{"placeholder":_vm.placeholder,"width":"normal","size":_vm.size,"disabled":_vm.disabled},model:{value:(_vm.showValue),callback:function ($$v) {_vm.showValue=$$v;},expression:"showValue"}}),_c('i',{staticClass:"c-select__caret"})],1),_c('div',{ref:"dropmenu",staticClass:"cascader-dropmenu",class:_vm.className},[(_vm.isOpen)?[_c('c-cascader-menu',{attrs:{"parentMenu":_vm.parentMenu,"options":_vm.optionList,"labelKey":_vm.labelKey,"valueKey":_vm.valueKey,"childrenKey":_vm.childrenKey,"showAllLevel":_vm.showAllLevel,"changeOnSelect":_vm.changeOnSelect,"loadChildren":_vm.loadChildren}})]:_vm._e()],2)])},staticRenderFns: [],
  name: 'c-cascader',
  components: {
    'c-cascader-menu': Menu,
    'c-icon': Icon,
    'c-input': Input
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
    this.cascaderMenu = this.$refs.dropmenu;
    document.body.appendChild(this.cascaderMenu);
    this.resize();
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
      return getPopupStyle(this.$el, this.cascaderMenu)
    },
    resize: function resize () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.cascaderMenu.style.cssText = this$1.getStyle();
      });
    }
  }
};

var name$1 = 'c-checkbox';
var props$1 = {
  value: Boolean,
  name: String,
  label: [String, Number, Object],
  disabled: Boolean,
  size: String,
  indeterminate: Boolean
};

var Checkbox = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"c-checkbox",class:_vm.classNames,on:{"change":_vm.onChange}},[_c('input',{ref:"input",attrs:{"type":"checkbox","name":_vm.name,"disabled":_vm.disabled},domProps:{"checked":_vm.checked}}),_c('span',{staticClass:"c-checkbox__box"}),_c('span',{staticClass:"c-checkbox__label"},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)])},staticRenderFns: [],
  name: name$1,
  model: {
    event: 'change'
  },
  props: props$1,
  inject: {
    $form: { default: null },
    $checkboxGroup: { default: null }
  },
  mixins: [resettable, validatable],
  data: function data () {
    return {
      checked: false
    }
  },
  computed: {
    classNames: function classNames () {
      var ref = this;
      var size = ref.size;
      var $form = ref.$form;
      var actualSize = size || ($form && $form.size);
      return actualSize ? ("is-" + actualSize) : ''
    },
    groupCheckedValues: function groupCheckedValues () {
      return this.$checkboxGroup ? this.$checkboxGroup.checkedValues : []
    }
  },
  watch: {
    value: {
      handler: function handler (val) {
        this.checked = val;
      },
      immediate: true
    },
    indeterminate: function indeterminate (newVal) {
      if (this.$refs.input) {
        this.$refs.input.indeterminate = Boolean(newVal);
      }
    },
    groupCheckedValues: function groupCheckedValues (newVal, oldVal) {
      if (newVal) {
        this.initChecked();
      }
    }
  },
  mounted: function mounted () {
    if (this.$refs.input) {
      this.$refs.input.indeterminate = this.indeterminate;
    }
    if (this.$checkboxGroup) {
      this.initChecked();
    }
  },
  methods: {
    onChange: function onChange (e) {
      this.$checkboxGroup && this.$checkboxGroup.updateCheckedValues(e.target.checked, this.label);
      this.checked = e.target.checked;
      this.$emit('change', e.target.checked);
    },
    initChecked: function initChecked () {
      var isChecked = this.groupCheckedValues.indexOf(this.label) > -1;
      this.checked = isChecked;
    }
  }
};

var name$2 = 'c-checkbox-group';
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

var props$2 = {
  value: {
    type: Array,
    default: function default$1 () { return [] }
  },
  minItems: Number,
  maxItems: Number,
  options: {
    type: Array,
    required: false,
    default: function default$2 () { return [] }
  }
};

var $2_11 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-checkbox-group"},[_vm._t("default",_vm._l((_vm.optionList),function(option,index){return _c('c-checkbox',{key:index,attrs:{"label":option.value,"disabled":option.disabled}},[_vm._v(_vm._s(option.label))])})),(!_vm.validity.valid)?_c('em',{staticClass:"c-error-msg"},[_vm._v(_vm._s(_vm.validity.msg))]):_vm._e()],2)},staticRenderFns: [],
  name: name$2,
  components: {
    'c-checkbox': Checkbox
  },
  model: {
    event: 'change'
  },
  props: props$2,
  mixins: [validatable],
  provide: function provide () {
    return {
      '$checkboxGroup': this
    }
  },
  inject: {
    $form: { default: null }
  },
  data: function data () {
    return {
      checkedValues: []
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
    this.onPropChange();
    this.$watch('options', this.onPropChange);
    this.$watch('value', this.onPropChange);
  },
  methods: {
    onPropChange: function onPropChange () {
      // todo check options
      this.checkedValues = [].concat( this.value );
    },

    updateCheckedValues: function updateCheckedValues (isChecked, value) {
      if (isChecked) {
        this.checkedValues.push(value);
      } else {
        var index = this.checkedValues.indexOf(value);
        this.checkedValues.splice(index, 1);
      }
      this.$emit('change', this.checkedValues);
    }

  }
};

var sizePreset = ['xs', 'sm', 'md', 'lg', 'xl'];
var isSizeValid = function (value) { return sizePreset.indexOf(value) > -1; };

var colorPresets = [
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'indigo',
  'purple',
  'pink',
  'dark',
  'black'
];

var $2_13 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-chip__wrapper",class:_vm.classNames,style:(_vm.styleObj)},[_vm._t("default",[_c('span',{staticClass:"c-chip__label"},[_vm._v(_vm._s(_vm.label))])]),(_vm.closable)?_c('span',{on:{"click":function($event){$event.stopPropagation();return _vm.$emit('close')}}},[_c('c-icon',{attrs:{"name":"x","valign":"middle"}})],1):_vm._e()],2)},staticRenderFns: [],
  name: 'c-chip',

  components: {
    'c-icon': Icon
  },

  props: {
    size: {
      type: String,
      default: 'md',
      validator: isSizeValid
    },
    label: String,
    color: String,
    closable: Boolean
  },

  computed: {
    classNames: function classNames () {
      var ref = this;
      var color = ref.color;
      var size = ref.size;
      var closable = ref.closable;
      var isPresetColor = color && colorPresets.indexOf(color) > -1;

      return [
        size ? ("is-" + size) : '',
        closable ? 'c-chip--closable' : '',
        isPresetColor ? ("c-chip--" + color) : ''
      ]
    },

    styleObj: function styleObj () {
      var ref = this;
      var color = ref.color;

      if (color && colorPresets.indexOf(color) === -1) {
        return {
          backgroundColor: color
        }
      }
      return null
    }
  }
};

var defaultStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%'
};

var PortalComponent = {
  name: 'c-portal',
  // eslint-disable-next-line
  render: function render () {},

  updated: function updated () {
    this.vm.$forceUpdate();
  },

  beforeDestroy: function beforeDestroy () {
    var ref = this;
    var vm = ref.vm;
    vm.$destroy();

    if (vm.$el) {
      document.body.removeChild(vm.$el);
    }
  },

  mounted: function mounted () {
    var self = this;
    var Vue = getVueCtor(this);

    var vm = new Vue({
      abstract: true,
      parent: this,
      render: function render (h) {
        var ref = self.$vnode;
        var data = ref.data;
        var option = {
          attrs: data.attrs,
          class: data.class,
          staticClass: data.staticClass,
          staticStyle: Object.assign({}, data.staticStyle, defaultStyle)
        };
        return h('div', option, self.$slots.default)
      }
    });

    var div = document.createElement('div');
    document.body.appendChild(div);
    vm.$mount(div);
    this.vm = vm;
  }
};

var sizeMap = {
  'xs': 12,
  'sm': 18,
  'md': 24,
  'lg': 28,
  'xl': 36
};

var $2_14 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.inline)?_c('color-picker',{attrs:{"color":_vm.value},on:{"change":_vm.handleChange}}):_c('div',{staticClass:"color-picker__wrapper"},[_c('c-portal',[_c('transition',{on:{"before-enter":_vm.beforeEnter,"enter":_vm.enter,"after-enter":_vm.afterEnter,"leave":_vm.leave,"after-leave":_vm.afterLeave}},[_c('color-picker',{directives:[{name:"show",rawName:"v-show",value:(_vm.panelVisible),expression:"panelVisible"}],ref:"panel",staticClass:"color-picker__pane--portal",attrs:{"color":_vm.value},on:{"change":_vm.handleChange}})],1)],1),_c('div',{ref:"trigger",staticClass:"color-picker__trigger",style:(_vm.triggerStyle),on:{"click":_vm.showColorPane}})],1)},staticRenderFns: [],
  name: 'c-color-picker',
  props: {
    value: VueTypes.string.def('#ff0000'),
    mode: VueTypes.oneOf([
      'rgb',
      'hsl',
      'hex'
    ]).def('hex'),
    inline: VueTypes.bool.def(false),
    size: VueTypes.oneOf(sizePreset)
  },
  inject: {
    $form: { default: null }
  },
  mixins: [resettable],
  model: {
    event: 'change'
  },

  components: {
    'color-picker': ColorPicker,
    'c-portal': PortalComponent
  },

  data: function data () {
    return {
      color: this.value,
      rgba: [],
      panelVisible: false,
      tidIn: null,
      tidOut: null
    }
  },

  computed: {
    triggerStyle: function triggerStyle () {
      var ref = this;
      var size = ref.size;
      var $form = ref.$form;
      var literal = ref.literal;
      var borderColor = ref.borderColor;
      var sz = size || ($form && $form.size) || 'md';
      var s = (sizeMap[sz]) + "px";

      return {
        width: s,
        height: s,
        backgroundColor: literal,
        borderColor: borderColor
      }
    },
    borderColor: function borderColor () {
      var ref = this.rgba;
      var r = ref[0];
      var g = ref[1];
      var b = ref[2];
      if ((r + g + b) / 3 > 235) {
        return "rgba(160,160,160,0.8)"
      }
      return 'transparent'
    }
  },

  watch: {
    mode: function mode (newVal) {
      if (this.__val) {
        this.handleChange(this.__val);
      }
    }
  },

  methods: {
    handleChange: function handleChange (e) {
      var rgba = e.rgba;
      var hex = e.hex;
      var hsla = e.hsla;
      var ref = this;
      var mode = ref.mode;
      var val = '';

      if (mode === 'hex') {
        val = hex;
      } else if (mode === 'hsl') {
        val = "hsla(" + (hsla.join(', ')) + ")";
      } else {
        val = "rgba(" + (rgba.join(', ')) + ")";
      }

      this.__val = e;
      this.rgba = rgba;
      this.literal = val;
      this.$emit('change', val);
    },

    showColorPane: function showColorPane () {
      this.clearTimeout();
      this.panelVisible = true;
    },

    hideColorPane: function hideColorPane () {
      var this$1 = this;

      this.clearTimeout();
      this.tidOut = setTimeout(function () {
        this$1.panelVisible = false;
      }, 100);
    },

    resize: function resize () {
      if (this.inline === false) {
        this.handleResize(this.$refs.panel.$el);
      }
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
        style.visibility = 'visible';
        style.opacity = 1;
        this$1.$nextTick(done);
      }, 100);
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
      var style = el.style;
      var ref = document.scrollingElement || document.body;
      var scrollLeft = ref.scrollLeft;
      var scrollTop = ref.scrollTop;

      var ref$1 = this.$refs;
      var trigger = ref$1.trigger;
      var triggerRect = trigger.getBoundingClientRect();

      var left = scrollLeft + triggerRect.left -
        triggerRect.width / 2;
      var top = scrollTop + triggerRect.top + triggerRect.height;

      style.position = 'absolute';
      style.marginTop = '6px';
      style.top = top + "px";
      style.left = left + "px";
    },

    clickOutside: function clickOutside (ref) {
      var target = ref.target;

      if (this.inline || !this.panelVisible) {
        return
      }

      var ref$1 = this.$refs;
      var trigger = ref$1.trigger;
      var panel = ref$1.panel;
      var isOutside = !contains(trigger, target) &&
        !contains(panel.$el, target);

      if (isOutside) {
        this.hideColorPane();
      }
    }
  },

  mounted: function mounted () {
    this.resize = this.resize.bind(this);
    this.clickOutside = this.clickOutside.bind(this);
    this.winResize = throttle(this.resize, this.$clair.defaultThrottleTime);
    window.addEventListener('resize', this.winResize);
    document.body.addEventListener('click', this.clickOutside);
  },

  beforeDestroy: function beforeDestroy () {
    this.clearTimeout();
    window.removeEventListener('resize', this.winResize);
    document.body.removeEventListener('click', this.clickOutside);
  }
};

var $2_15 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"c-datepicker__range",class:_vm.className},[_c('div',{staticClass:"c-datepicker__content c-calendar"},[_c('c-dateheader',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.startMaxDate,"year":_vm.startYear,"month":_vm.startMonth,"monthsShow":_vm.startMonthsShow},on:{"monthchange":_vm.startMonthChange,"yearchange":_vm.startYearChange,"monthshow":_vm.startMonthTableShow}}),_c('div',{staticClass:"c-calendar__body"},[(_vm.startMonthsShow)?_c('c-monthtable',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.startMaxDate,"year":_vm.startYear,"month":_vm.startMonth},on:{"change":_vm.startSelectMonth}}):_vm._e(),(!_vm.startMonthsShow)?_c('c-datetable',{attrs:{"type":"range","minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.startYear,"month":_vm.startMonth,"day":_vm.startDay,"start":_vm.start,"end":_vm.end,"range-obj":_vm.rangeObj},on:{"monthchange":_vm.startMonthChange,"yearchange":_vm.startYearChange,"change":_vm.selectDay,"rangeChange":_vm.onRangeChange}}):_vm._e()],1)],1),_c('div',{staticClass:"c-datepicker__content c-calendar"},[_c('c-dateheader',{attrs:{"minDate":_vm.endMinDate,"maxDate":_vm.maxDate,"year":_vm.endYear,"month":_vm.endMonth,"monthsShow":_vm.endMonthsShow},on:{"monthchange":_vm.endMonthChange,"yearchange":_vm.endYearChange,"monthshow":_vm.endMonthTableShow}}),_c('div',{staticClass:"c-calendar__body"},[(_vm.endMonthsShow)?_c('c-monthtable',{attrs:{"minDate":_vm.endMinDate,"maxDate":_vm.maxDate,"year":_vm.endYear,"month":_vm.endMonth},on:{"change":_vm.endSelectMonth}}):_vm._e(),(!_vm.endMonthsShow)?_c('c-datetable',{attrs:{"type":"range","minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.endYear,"month":_vm.endMonth,"day":_vm.endDay,"start":_vm.start,"end":_vm.end,"range-obj":_vm.rangeObj},on:{"monthchange":_vm.endMonthChange,"yearchange":_vm.endYearChange,"change":_vm.selectDay,"rangeChange":_vm.onRangeChange}}):_vm._e()],1)],1),_c('p',{staticClass:"c-datepicker__text"},[_vm._v(_vm._s(_vm.start)+" 至 "+_vm._s(_vm.end))]),_c('div',{staticClass:"c-datepicker__btns"},[_c('c-button',{attrs:{"size":"sm","outline":"","primary":""},on:{"click":_vm.confirmRange}},[_vm._v("确定")]),_c('c-button',{attrs:{"size":"sm","outline":""},on:{"click":_vm.cancel}},[_vm._v("取消")])],1)])},staticRenderFns: [],
  name: 'c-daterange',
  components: {
    'c-button': CButton
  },
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
      },
      format: ''
    }
  },
  created: function created () {
    var ref = this.value;
    var start = ref[0];
    var end = ref[1];
    this.start = start || '';
    this.end = end || '';
    this.startMonthsShow = this.isMonthRange;
    this.endMonthsShow = this.isMonthRange;
    this.updateDate();
    this.format = this.pattern ? this.pattern : this.isMonthRange ? 'yyyy-MM' : 'yyyy-MM-dd';
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
    isMonthRange: function isMonthRange () {
      return this.type === 'month'
    },
    className: function className () {
      return this.size ? ("is-" + (this.size)) : 'md'
    },
    startMaxDate: function startMaxDate () {
      return new Date(this.endYear, this.endMonth, 0).format(this.format)
    },
    endMinDate: function endMinDate () {
      return new Date(this.startYear, this.startMonth + 1, 1).format(this.format)
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
      var assign, assign$1;

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
        (assign = this.updateMonth(this.endYear, endMonth, 1, 'plus'), this.endYear = assign[0], this.endMonth = assign[1]);
      } else if (!endMonth && endMonth !== 0) {
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
      this.startMonthsShow = this.isMonthRange;
      this.startMonth = month;
      this.startDay = '';
      if (this.isMonthRange) {
        this.start = new Date(this.startYear, this.startMonth).format(this.format);
        this.updateDate();
      }
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
      this.endMonthsShow = this.isMonthRange;
      this.endMonth = month;
      this.endDay = '';
      if (this.isMonthRange) {
        this.end = new Date(this.endYear, this.endMonth).format(this.format);
        this.updateDate();
      }
    },
    cancel: function cancel () {
      var assign;

      (assign = this.value, this.start = assign[0], this.end = assign[1]);
      this.$emit('change', this.value);
    },
    confirmRange: function confirmRange () {
      if (this.start && this.end) {
        this.$emit('change', [this.start, this.end]);
      } else {
        this.cancel();
      }
    }
  }
};

var $2_16 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-datepicker",on:{"click":_vm.open}},[(!_vm.disabled && (_vm.date != '' || _vm.daterange != ''))?_c('div',{staticClass:"c-datepicker__icon c-datepicker__hovericon",class:_vm.className,on:{"click":_vm.resetDate}},[_c('c-icon',{attrs:{"name":"x-circle"}})],1):_vm._e(),_c('div',{staticClass:"c-datepicker__icon",class:_vm.className},[_c('c-icon',{attrs:{"name":"calendar"}})],1),(_vm.type == 'daterange' || _vm.type == 'monthrange')?_c('c-input',{attrs:{"value":_vm.daterange,"placeholder":_vm.placeholder,"disabled":_vm.disabled,"width":"normal","size":_vm.size,"readonly":"readonly"},nativeOn:{"focusin":function($event){return _vm.open($event)},"focusout":function($event){return _vm.onBlur($event)}}}):(_vm.type == 'date' || _vm.type == 'month')?_c('c-input',{attrs:{"size":_vm.size,"width":"normal","placeholder":_vm.placeholder,"disabled":_vm.disabled},on:{"change":_vm.dateChange},nativeOn:{"focusin":function($event){return _vm.open($event)},"focusout":function($event){return _vm.onBlur($event)},"keydown":function($event){return _vm.onKeyDown($event)}},model:{value:(_vm.showDate),callback:function ($$v) {_vm.showDate=$$v;},expression:"showDate"}}):_vm._e(),_c('div',{ref:"datepickerPanel",staticClass:"c-datepicker__panel",class:{'withSidebar': (_vm.optionList.length > 0 || _vm.hasSidebarSlot) && _vm.isOpen == true, 'withBorder': _vm.isOpen == true }},[((_vm.hasSidebarSlot || _vm.optionList.length > 0 )&& _vm.isOpen)?_c('div',{staticClass:"c-datepicker__sidebar"},[_vm._t("dateSideBar",[_c('ul',[_vm._l((_vm.optionList),function(option){return [_c('li',{staticClass:"optionbtn",on:{"click":function($event){return _vm.optionClick(option)}}},[_c('a',[_vm._v(_vm._s(option.text))])])]})],2)],{"datepicker":_vm.datepicker})],2):_vm._e(),(_vm.type == 'date' || _vm.type == 'month')?_c('c-calendar',{ref:"calendar",attrs:{"type":_vm.type,"pattern":_vm.datePattern,"value":_vm.date,"show":_vm.isOpen,"size":_vm.size,"minDate":_vm.minDate,"maxDate":_vm.maxDate},on:{"update":_vm.setDate}}):_vm._e(),(_vm.type == 'daterange')?_c('div',{staticClass:"c-datepicker__body"},[_c('c-daterange',{attrs:{"value":_vm.date,"size":_vm.size,"show":_vm.isOpen,"minDate":_vm.minDate,"maxDate":_vm.maxDate,"pattern":_vm.datePattern},on:{"change":_vm.setDateRange}})],1):_vm._e(),(_vm.type == 'monthrange')?_c('div',{staticClass:"c-datepicker__body"},[_c('c-daterange',{attrs:{"value":_vm.date,"size":_vm.size,"show":_vm.isOpen,"type":"month","minDate":_vm.minDate,"maxDate":_vm.maxDate,"pattern":_vm.datePattern},on:{"change":_vm.setDateRange}})],1):_vm._e()],1)],1)},staticRenderFns: [],
  name: 'c-datepicker',
  model: {
    event: 'change'
  },
  mixins: [resettable, validatable],
  components: {
    'c-icon': Icon,
    'c-input': Input,
    'c-calendar': Calendar
  },
  props: {
    value: {
      type: [String, Array],
      default: function default$1 () {
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
    maxDate: String,
    extraOption: Object
  },

  computed: {
    hasSidebarSlot: function hasSidebarSlot () {
      return this.$slots.dateSideBar || this.$scopedSlots.dateSideBar
    },
    datepicker: function datepicker () {
      return this
    },
    className: function className () {
      return [
        this.size ? ("is-size-" + (this.size)) : '',
        this.disabled ? 'disabled' : ''
      ]
    },
    daterange: function daterange () {
      if (this.type.indexOf('range') === -1) { return [] }
      var ref = this.date;
      var start = ref[0];
      var end = ref[1];
      return !start && !end ? '' : (start + " 至 " + end)
    },
    datePattern: function datePattern () {
      return this.pattern ? this.pattern : this.type.indexOf('month') > -1 ? 'yyyy-MM' : 'yyyy-MM-dd'
    },
    optionList: function optionList () {
      return this.extraOption ? this.extraOption.optionList : []
    }
  },

  data: function data () {
    return {
      date: '',
      showDate: '',
      datepickerPanel: '',
      isOpen: false,
      mousedownInPanel: false
    }
  },

  beforeDestroy: function beforeDestroy () {
    if (this.datepickerPanel.remove) {
      this.datepickerPanel.remove();
    } else {
      this.datepickerPanel.parentNode.removeChild(this.datepickerPanel);
    }
    window.removeEventListener('resize', this.resize, false);
  },

  watch: {
    isOpen: function isOpen () {
      if (this.isOpen) {
        this.resize();
        window.addEventListener('mousedown', this.onMouseDown, true);
        window.addEventListener('mouseup', this.onMouseUp, true);
      } else {
        window.removeEventListener('mousedown', this.onMouseDown, true);
        window.removeEventListener('mouseup', this.onMouseUp, true);
      }
    },
    value: function value (newVal) {
      if (newVal !== this.date) {
        this.date = newVal;
        this.showDate = newVal;
      }
    }
  },

  created: function created () {
    this.date = this.value;
    this.showDate = this.value;
  },

  mounted: function mounted () {
    if (typeof document === 'object') {
      this.datepickerPanel = this.$el.querySelector('.c-datepicker__panel');
      document.body.appendChild(this.datepickerPanel);
      this.resize();
      window.addEventListener('resize', this.resize, false);
    }
  },
  methods: {
    optionClick: function optionClick (option) {
      option.onClick(this);
    },
    open: function open (e) {
      var hoverIcon = this.$el.querySelector('.c-datepicker__hovericon');
      var isHoverIcon = hoverIcon && hoverIcon.contains(e.target);
      if (this.disabled || isHoverIcon) { return }
      this.isOpen = true;
    },
    close: function close () {
      this.isOpen = false;
    },
    onBlur: function onBlur (e) {
      var focused = e.relatedTarget;
      if (this.mousedownInPanel) { return }
      if (focused) { this.close(); }
    },
    onMouseDown: function onMouseDown (e) {
      var isInPicker = this.$el.contains(e.target);
      var isInPanel = this.datepickerPanel.contains(e.target);
      this.mousedownInPanel = isInPanel || isInPicker;
    },
    onMouseUp: function onMouseUp (e) {
      this.mousedownInPanel = false;
      this.onBodyClick(e);
    },
    onKeyDown: function onKeyDown (e) {
      if (this.type === 'daterange') { return }
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
      var ref = this.$refs;
      var calendar = ref.calendar;
      var date = new Date(calendar.year, calendar.month, calendar.day).format(this.datePattern);
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
    resetDate: function resetDate (e) {
      e.preventDefault();
      this.date = '';
      this.showDate = '';
      this.$emit('change', '');
    },
    checkDateValid: function checkDateValid (value) {
      var separtor = this.datePattern.replace(/\w/g, '').slice(0, 1);
      var dates = value.split(separtor);
      var reg = new RegExp('^\\d{4}' + separtor + '\\d{2}' + separtor + '\\d{2}$');
      var valueValid = reg.test(value);
      if (valueValid) {
        var year = parseInt(dates[0]);
        var month = parseInt(dates[1]);
        var day = parseInt(dates[2]);
        var yearValid = year > 1987;
        var monthValid = month >= 0 && month < 12;
        var maxDay = year % 4 === 0 && month === 2 ? 29 : 28;
        var dayValid = day >= 0 && day < maxDay;
        return yearValid && monthValid && dayValid
      } else {
        return false
      }
    },
    dateChange: function dateChange (value) {
      var dateValid = this.checkDateValid(value);
      if (dateValid) {
        this.date = value;
      }
    },
    onBodyClick: function onBodyClick (e) {
      var isInPicker = this.$el.contains(e.target);
      var isInPanel = this.datepickerPanel.contains(e.target);
      if (!isInPicker && !isInPanel) {
        this.close();
        this.$el.focus();
        if ((this.type === 'date' || this.type === 'month') && this.checkDateValid(this.showDate)) {
          this.date = this.showDate;
        } else if (this.type === 'date' || this.type === 'month') {
          this.showDate = this.date;
        }
      }
    },
    setDateRange: function setDateRange (daterange) {
      this.date = daterange;
      this.$emit('change', this.date);
      this.close();
    },
    setDate: function setDate (date, notClose) {
      this.showDate = date;
      this.$emit('change', date);
      !notClose && this.close();
    },
    getStyle: function getStyle () {
      return getPopupStyle(this.$el, this.datepickerPanel)
    },
    resize: function resize () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.datepickerPanel.style.cssText = this$1.getStyle();
      });
    }
  }
};

var $2_17 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-form-item",class:_vm.classNames},[(_vm.label || _vm.$slots.label)?_c('label',{staticClass:"c-form-item__label",style:(_vm.labelStyle)},[_vm._t("label",[_vm._v(_vm._s(_vm.label))])],2):_vm._e(),_c('div',{staticClass:"c-form-item__control",class:{ 'has-error': _vm.hasError }},[_vm._t("default"),_c('div',{staticClass:"c-form-item__error"},[_vm._v(_vm._s(_vm.errorMsg))])],2)])},staticRenderFns: [],
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

    var isParentValidatable = function (v) {
      var parent = v.$parent;
      while (true) {
        if (!parent || parent === this$1) { return false }
        if (parent.isValidatable) { return true }
        parent = parent.$parent;
      }
    };
    this.$on('validatable-attached', function (v) {
      // skip child validatable if parent is validatable
      if (isParentValidatable(v)) { return }
      this$1.validatable = v;
    });
    this.$on('validatable-detached', function (v) {
      this$1.validatable = null;
    });
  }
};

var block$1 = 'c-form';
var modifiers$1 = ['inline'];
var getClassName = toClassNames(block$1, modifiers$1);

var $2_18 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{staticClass:"c-form",class:_vm.classNames,on:{"submit":_vm.onSubmit}},[_vm._t("default")],2)},staticRenderFns: [],
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
      var results = this.validatables.map(function (v) { return v.validate(); });
      var hasAsync = results.some(isPromise);
      var isAllValid = function (results) { return results.every(function (result) { return result.valid; }); };
      if (hasAsync) {
        return Promise.all(results).then(isAllValid)
      } else {
        return isAllValid(results)
      }
    },
    resetValidity: function resetValidity () {
      this.validatables.forEach(function (v) { return v.resetValidity(); });
    },
    reset: function reset () {
      this.$emit('reset');
      this.resetValidity();
    }
  }
};

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

var breakpoints = sizePreset;

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

var $2_19 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-box__item",class:_vm.classNames,style:(_vm.style)},[_vm._t("default")],2)},staticRenderFns: [],
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
      if (this.offset) { classNames.push(("has-offset-" + (this.offset))); }
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
};

var $2_20 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-container",class:_vm.classNames},[_vm._t("default")],2)},staticRenderFns: [],
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
};

var props$4 = {
  gap: String,
  justify: String,
  align: String,
  fillHeight: Boolean
};
var breakpointProps = breakpoints
  .map(function (bp) { return (bp + "Only"); })
  .concat(breakpoints)
  .reduce(function (props, bp) {
    props[bp] = String;
    return props
  }, {});

Object.assign(props$4, breakpointProps);

var $2_21 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-box",class:_vm.classNames,style:(_vm.style)},[_vm._t("default")],2)},staticRenderFns: [],
  props: props$4,
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
};

var $2_24 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-menu",class:_vm.classNames,style:(_vm.styles)},[_vm._t("default")],2)},staticRenderFns: [],
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
      return null
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
};

var $2_25 = {
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
};

var $2_26 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-submenu",class:{'is-open': _vm.isOpen}},[_c('div',{staticClass:"c-submenu__title c-menu__item",on:{"click":_vm.toggleSubmenu,"mouseenter":_vm.enterSubMenu,"mouseleave":_vm.leaveSubMenu}},[_vm._t("title",[_vm._v(_vm._s(_vm.title))])],2),_c('div',{staticClass:"c-submenu__popup",on:{"mouseenter":_vm.enterPopup,"mouseleave":_vm.leavePopup,"focusin":_vm.focusIn,"focusout":_vm.focusOut,"!click":function($event){return _vm.clickSubMenu($event)}}},[_vm._t("default")],2)])},staticRenderFns: [],
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
      handler: function handler () {
        if (this.open) {
          this.isOpen = true;
        }
      }
    },
    '$menu.collapsed': function $menu_collapsed (collapsed) {
      if (collapsed) {
        this.isOpen = false;
      }
    }
  },
  data: function data () {
    return {
      isOpen: false,
      hideSubMenuTimer: null, // 隐藏子菜单时延时
      showSubMenuTimer: null // hover显示子菜单延时
    }
  },
  computed: {
    isVerticalExpanding: function isVerticalExpanding () {
      var ref = this.$menu;
      var isVertical = ref.isVertical;
      var collapsed = ref.collapsed;
      return isVertical && !collapsed
    },
    innerTrigger: function innerTrigger () {
      if (this.isVerticalExpanding) {
        return 'click'
      }

      // if not specified in props,
      // use 'hover' for vertical cases
      // and 'click' for horizontal cases
      if (this.trigger == null) {
        var ref = this.$menu;
        var isVertical = ref.isVertical;
        return isVertical ? 'hover' : 'click'
      }

      return this.trigger
    }
  },
  methods: {
    toggleSubmenu: function toggleSubmenu () {
      if (this.innerTrigger === 'click') {
        this.isOpen = !this.isOpen;
      }
    },

    enterSubMenu: function enterSubMenu () {
      if (this.innerTrigger === 'hover') {
        this.enterPopup();
      }
    },

    leaveSubMenu: function leaveSubMenu () {
      if (this.innerTrigger === 'hover') {
        this.leavePopup();
      }
    },

    enterPopup: function enterPopup () {
      var this$1 = this;

      if (this.isVerticalExpanding) {
        return
      }

      clearTimeout(this.showSubMenuTimer);
      clearTimeout(this.hideSubMenuTimer);
      this.showSubMenuTimer = setTimeout(function () {
        this$1.openSubMenu();
      }, this.delay);
    },

    leavePopup: function leavePopup () {
      var this$1 = this;

      if (this.isVerticalExpanding) {
        return
      }

      clearTimeout(this.showSubMenuTimer);
      clearTimeout(this.hideSubMenuTimer);
      this.hideSubMenuTimer = setTimeout(function () {
        this$1.closeSubMenu();
      }, this.delay);
    },

    clickSubMenu: function clickSubMenu () {
      if (this.isVerticalExpanding) {
        return
      }
      this.closeSubMenu();
    },

    openSubMenu: function openSubMenu () {
      this.isOpen = true;
    },

    closeSubMenu: function closeSubMenu () {
      this.isOpen = false;
    },

    focusIn: function focusIn () {
      this.openSubMenu();
    },

    focusOut: function focusOut () {
      // do not close submenu if menu is vertical and not collapsed
      if (this.isVerticalExpanding) {
        return
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

  start: function start (uid) {
    this.map[uid] = 1;

    this.modalCount += 1;

    if (this.modalCount !== 1) {
      return
    }

    var hasScrollbar = document.documentElement.clientWidth < window.innerWidth;
    var ref = document.body;
    var style = ref.style;

    this.oldOverflow = style.overflow;
    this.oldPaddingRight = style.paddingRight;

    if (hasScrollbar) {
      style.paddingRight = (getScrollBarSize()) + "px";
    }

    // always make `body` hidden
    // when modal shown
    style.overflow = 'hidden';
  },

  reset: function reset (uid) {
    if (this.map[uid] !== 1) {
      return
    }

    this.map[uid] = 0;
    this.modalCount -= 1;

    if (this.modalCount !== 0) {
      return
    }

    var ref = document.body;
    var style = ref.style;
    style.overflow = this.oldOverflow;
    style.paddingRight = this.oldPaddingRight;
    this.isHidden = false;
  }
};

var ModalComponent = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!_vm.shouldDestroy)?_c('c-portal',{attrs:{"aria-hidden":'' + !_vm.visible}},[_c('transition',{attrs:{"appear":"","name":"modal","mode":"out-in"},on:{"before-enter":_vm.beforeEnter,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],ref:"dom",staticClass:"c-modal",style:({ zIndex: _vm.zIndex }),on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.maskClosable ? _vm.$emit('close') : _vm.noop();}}},[_c('div',{staticClass:"c-modal__wrapper",style:(_vm.styleObj)},[_c('div',{staticClass:"c-modal__header"},[(_vm.closable)?_c('c-button',{staticClass:"c-modal__close",attrs:{"icon":"x","flat":""},on:{"click":function($event){return _vm.$emit('close')}}}):_vm._e(),_vm._t("header",[_c('div',[_vm._v(_vm._s(_vm.title))])])],2),_c('div',{staticClass:"c-modal__body"},[_vm._t("default",[_c('div')])],2),_c('div',{staticClass:"c-modal__footer"},[_vm._t("footer",[_c('c-button',{attrs:{"outline":""},on:{"click":function($event){return _vm.$emit('cancel')}}},[_vm._v("取消")]),_c('c-button',{attrs:{"primary":""},on:{"click":function($event){return _vm.$emit('confirm')}}},[_vm._v("确认")])])],2)])])])],1):_vm._e()},staticRenderFns: [],
  name: 'c-modal',
  components: {
    'c-portal': PortalComponent
  },

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

  data: function data () {
    return {
      uid: uid++,
      zIndex: zIndex.next(),
      disappeared: false
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
    },
    shouldDestroy: function shouldDestroy () {
      var ref = this;
      var visible = ref.visible;
      var disappeared = ref.disappeared;
      var destroyAfterClose = ref.destroyAfterClose;
      return destroyAfterClose && !visible && disappeared
    }
  },

  methods: {
    qsa: function qsa (selectors) {
      var list = this.$refs.dom.querySelectorAll(selectors);
      return Array.prototype.slice.call(list)
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

    beforeEnter: function beforeEnter () {
      overflowController.start(this.uid);
      this.disappeared = false;
    },

    afterLeave: function afterLeave () {
      overflowController.reset(this.uid);
      this.disappeared = true;
      this.$emit('after-leave');
    }
  },

  mounted: function mounted () {
    this.handleKeydown = this.handleKeydown.bind(this);
    document.addEventListener('keydown', this.handleKeydown);
  },

  beforeDestroy: function beforeDestroy () {
    overflowController.reset(this.uid);
    document.removeEventListener('keydown', this.handleKeydown);
  }
};

var Notification = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"appear":"","name":"notification","mode":"out-in","type":"transition"},on:{"before-enter":_vm.beforeEnter,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"c-notice__wrapper",style:(_vm.classObj),on:{"mouseenter":_vm.clearTimer,"mouseleave":_vm.startTimer}},[_vm._t("default"),_c('div',[_c('div',{staticClass:"c-notice__header"},[(_vm.closable)?_c('c-button',{staticClass:"c-notice__close",attrs:{"icon":"x","flat":""},on:{"click":function($event){$event.stopPropagation();return _vm.$emit('close')}}}):_vm._e(),_c('span',[_vm._v(_vm._s(_vm.title))])],1),_c('div',{staticClass:"c-notice__body"},[(_vm.dangerouslySetInnerHTML)?_c('div',{domProps:{"innerHTML":_vm._s(_vm.message)}}):_c('div',[_vm._v(_vm._s(_vm.message))])])])],2)])},staticRenderFns: [],
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
  data: function data () {
    return {
      zIndex: zIndex.next(),
      timer: null
    }
  },
  computed: {
    classObj: function classObj () {
      return {
        zIndex: zIndex,
        transform: ("translateX(" + (this.position === 'topRight' || this.position === 'bottomRight' ? -this.offset : this.offset) + "px)") }
    }
  },
  methods: {
    beforeEnter: function beforeEnter () {
      var this$1 = this;

      if (this.duration) {
        // duration未被设置为0
        this.timer = setTimeout(function (_) {
          this$1.$emit('close');
        }, this.duration);
      }
    },
    afterLeave: function afterLeave () {
      this.$emit('after-leave');
    },
    clearTimer: function clearTimer () {
      clearTimeout(this.timer);
    },
    startTimer: function startTimer () {
      var this$1 = this;

      if (this.duration > 0) {
        this.timer = setTimeout(function (_) {
          this$1.$emit('close');
        }, this.duration);
      }
    }
  },
  destroyed: function destroyed () {
    this.clearTimer();
  }
};

var $2_29 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-pagination"},[_c('span',{staticClass:"c-pagination__total"},[_vm._t("total",[_vm._v("共"),_c('em',[_vm._v(_vm._s(_vm.total))]),_vm._v("条")])],2),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.pageCount > 1),expression:"pageCount > 1"}],staticClass:"c-pagination__pages"},[_c('a',{staticClass:"c-pagination_prev",class:{'is-disabled': _vm.pageNumber == 1},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.goPage(_vm.pageNumber - 1)}}},[_vm._t("prev",[_c('c-icon',{attrs:{"name":"chevron-left","valign":"middle"}})])],2),_c('a',{staticClass:"c-pagination__page",class:{'is-active': _vm.pageNumber == 1},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.goPage(1)}}},[_vm._v("1")]),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.spanRange[0] > 2),expression:"spanRange[0] > 2"}],staticClass:"c-pagination__ellipsis"},[_vm._v("⋯")]),_vm._l((_vm.spanRange),function(n){return _c('a',{staticClass:"c-pagination__page",class:{'is-active': n == _vm.pageNumber},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.goPage(n)}}},[_vm._v(_vm._s(n))])}),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.showEndEllipse),expression:"showEndEllipse"}],staticClass:"c-pagination__ellipsis"},[_vm._v("⋯")]),_c('a',{staticClass:"c-pagination__page",class:{'is-active': _vm.pageNumber == _vm.pageCount},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.goPage(_vm.pageCount)}}},[_vm._v(_vm._s(_vm.pageCount))]),_c('a',{staticClass:"c-pagination_prev",class:{'is-disabled': _vm.pageNumber == _vm.pageCount},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.goPage(_vm.pageNumber + 1)}}},[_vm._t("next",[_c('c-icon',{attrs:{"name":"chevron-right","valign":"middle"}})])],2)],2)])},staticRenderFns: [],
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

  created: function created () {
    var this$1 = this;

    this.$watch(function (vm) { return [vm.pn, vm.total].join(); }, function (_) {
      var pn = parseInt(this$1.pn) || 1;
      var exceedMax = pn > this$1.pageCount;
      if (exceedMax) {
        this$1.pageNumber = this$1.pageCount;
        this$1.$emit('change', this$1.pageNumber);
      } else {
        this$1.pageNumber = pn;
      }
    });
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

var CTip = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-tip",on:{"mouseenter":_vm.show,"mouseleave":_vm.hide,"!focus":function($event){return _vm.show($event)},"!blur":function($event){return _vm.hide($event)},"click":_vm.show}},[_vm._t("default"),_c('c-portal',{attrs:{"role":"tooltip","aria-hidden":'' + !_vm.visible}},[(!_vm.disabled)?_c('transition',{on:{"before-enter":_vm.beforeEnter,"enter":_vm.enter,"after-enter":_vm.afterEnter,"leave":_vm.leave,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],ref:"tip",staticClass:"c-tip__container",class:_vm.theme === 'light' && 'c-tip__container--light',on:{"mouseenter":_vm.show,"mouseleave":_vm.hide}},[_c('i',{staticClass:"c-tip__arrow",class:_vm.arrowClass}),(_vm.content)?_c('div',[_vm._v(_vm._s(_vm.content))]):_vm._e(),_vm._t("content")],2)]):_vm._e()],1)],2)},staticRenderFns: [],
  name: 'c-tip',

  components: {
    'c-portal': PortalComponent
  },

  props: {
    theme: VueTypes.oneOf(['dark', 'light']).def('dark'),
    trigger: {
      type: [String, Array],
      default: 'hover',
      validator: function validator (val) {
        var validTypes = ['hover', 'click', 'focus'];
        return [].concat(val).every(function (v) { return validTypes.includes(v); })
      }
    },
    disabled: VueTypes.bool.def(false),
    content: VueTypes.string.def(''),
    maxWidth: VueTypes.string.def('300px'),
    showDelay: VueTypes.number.def(defaultDelayTime),
    hideDelay: VueTypes.number.def(defaultDelayTime),
    position: VueTypes.oneOf(['top', 'right', 'bottom', 'left']).def('bottom')
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
    },
    triggers: function triggers () {
      var ref = this;
      var trigger = ref.trigger;
      var triggers = [].concat(trigger);
      return triggers
    }
  },

  methods: {
    show: function show (ref) {
      var type = ref.type; if ( type === void 0 ) type = 'click';

      var ref$1 = this;
      var triggers = ref$1.triggers;
      for (var i = 0; i < triggers.length; i++) {
        if (SHOW_MATCH_MAP[triggers[i]] === type) {
          this.clearTimeout();
          this.visible = true;
          break
        }
      }
    },

    hide: function hide (ref) {
      var this$1 = this;
      if ( ref === void 0 ) ref = {};
      var type = ref.type; if ( type === void 0 ) type = 'click';

      var ref$1 = this;
      var triggers = ref$1.triggers;
      for (var i = 0; i < triggers.length; i++) {
        if (HIDE_MATCH_MAP[triggers[i]] === type) {
          this.clearTimeout();
          this.tidOut = setTimeout(function () {
            this$1.visible = false;
          }, this.hideDelay);
          break
        }
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
      if (!el || !el.style || !this.visible) {
        return
      }

      // SEE https://imququ.com/post/document-scrollingelement-in-chrome.html
      var ref = document.scrollingElement || document.body;
      var scrollLeft = ref.scrollLeft;
      var scrollTop = ref.scrollTop;

      var elRect = this.$el.getBoundingClientRect();
      var tipRect = this.$refs.tip.getBoundingClientRect();
      var style = el.style;

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

      if (!this.visible) {
        return
      }

      var el = this.$el;
      var ref$1 = this.$refs;
      var tip = ref$1.tip;
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
    this.winResize = throttle(this.resize, this.$clair.defaultThrottleTime);
    window.addEventListener('resize', this.winResize);
    document.body.addEventListener('click', this.clickOutside);
  },

  beforeDestroy: function beforeDestroy () {
    this.clearTimeout();
    window.removeEventListener('resize', this.winResize);
    document.body.removeEventListener('click', this.clickOutside);
  }
};

var $2_30 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('c-tip',{ref:"tip",attrs:{"theme":"light","trigger":"click","max-width":"300px","position":_vm.position,"disabled":_vm.disabled}},[_c('div',{staticClass:"c-pop-confirm",attrs:{"slot":"content"},slot:"content"},[_c('div',{staticClass:"c-pop-confirm__body"},[_vm._t("content")],2),_c('div',{staticClass:"c-pop-confirm__footer"},[_c('c-button',{attrs:{"outline":"","size":"sm"},on:{"click":_vm.handleCancel}},[_vm._v(_vm._s(_vm.cancelText))]),_c('c-button',{attrs:{"primary":"","size":"sm"},on:{"click":_vm.handleConfirm}},[_vm._v(_vm._s(_vm.okText))])],1)]),_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-pop-confirm',
  props: {
    disabled: Boolean,
    position: {
      type: String,
      default: 'top'
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  components: { CTip: CTip, CButton: CButton },
  methods: {
    show: function show () {
      this.$refs.tip.show({ type: 'click' });
    },
    hide: function hide () {
      this.$refs.tip.hide({ type: 'click' });
    },
    handleCancel: function handleCancel () {
      this.hide();
      this.$emit('cancel');
    },
    handleConfirm: function handleConfirm () {
      this.hide();
      this.$emit('confirm');
    }
  }
};

var $2_32 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:_vm.classNames,on:{"change":_vm.onChange}},[_c('input',{attrs:{"type":"radio","name":_vm.name,"disabled":_vm.disabled},domProps:{"value":_vm.value,"checked":_vm.value == _vm.checkedIndex}}),_c('span',{staticClass:"c-radio__box"}),_c('span',{staticClass:"c-radio__label"},[_vm._v(_vm._s(_vm.label))])])},staticRenderFns: [],
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
};

var $2_33 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-radio-group",class:_vm.classNames},_vm._l((_vm.options),function(option,index){return _c('c-radio',{key:index,attrs:{"name":_vm.name,"value":index,"button":_vm.button,"label":option.label,"disabled":option.disabled},model:{value:(_vm.checkedIndex),callback:function ($$v) {_vm.checkedIndex=$$v;},expression:"checkedIndex"}})}),1)},staticRenderFns: [],
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
      return actualSize ? ("is-" + actualSize) : ''
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
};

/**
 * get absolute position relative to another element
 */
function getPosition (el, refEl) {
  var ref = refEl.getBoundingClientRect();
  var top = ref.top;
  var left = ref.left;
  var width = ref.width;
  var height = ref.height;
  var refTop = top + window.pageYOffset;
  var refLeft = left + window.pageXOffset;

  return {
    width: width,
    height: height,
    left: refLeft,
    top: refTop
  }
}

// ensure each option has label and value
var normalizeOptions = function (options) {
  if ( options === void 0 ) options = [];

  return options.map(function (option) {
    if (typeof option === 'string') { return { label: option, value: option } }
    return option
  })
};

var $2_34 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-select",class:_vm.classNames,attrs:{"role":"combobox","aria-autocomplete":"list","aria-haspopup":"true","aria-expanded":_vm.isOpen,"aria-disabled":"disabled","tabindex":_vm.disabled ? -1 : 0},on:{"keydown":[_vm.onKeyDown,function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")){ return null; }return _vm.onTabOut($event)}],"click":_vm.toggleOpen}},[_c('i',{staticClass:"c-select__caret"}),_c('div',{staticClass:"c-select__selection"},[(_vm.showPlaceholder)?_c('div',{staticClass:"c-select__placeholder"},[_vm._v(_vm._s(_vm.placeholder))]):_vm._e(),(!_vm.multiple && _vm.selectedOptions.length)?_c('div',{staticClass:"c-select__value"},[_vm._v(_vm._s(_vm.selectedOptions[0].label))]):_vm._e(),_vm._l((_vm.selectedOptions),function(option,index){return (_vm.multiple && index <= _vm.maxChipCount)?_c('div',{key:index,staticClass:"c-chip",class:{ 'is-disabled': option.disabled, 'is-closeable': index < _vm.maxChipCount }},[_vm._t("selection",[(index < _vm.maxChipCount)?_c('span',[_vm._v(_vm._s(option.label))]):_c('span',[_vm._v(_vm._s(_vm.maxChipText))])],{"option":option}),(index < _vm.maxChipCount)?_c('div',{staticClass:"c-chip__close",on:{"click":function($event){$event.stopPropagation();return _vm.unselectOption(option)}}},[_c('c-icon',{attrs:{"name":"x","valign":"middle"}})],1):_vm._e()],2):_vm._e()}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showInput),expression:"showInput"}],staticClass:"c-select__input",class:_vm.multiple ? 'is-multiple' : 'is-single'},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.query),expression:"query"}],ref:"input",attrs:{"autocomplete":"off"},domProps:{"value":(_vm.query)},on:{"click":function($event){$event.stopPropagation();return _vm.noop($event)},"blur":function($event){return _vm.$el.focus()},"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"])){ return null; }return _vm.onDeleteKey($event)},"input":[function($event){if($event.target.composing){ return; }_vm.query=$event.target.value;},_vm.onSearchInput]}})])],2),_c('c-portal',{attrs:{"aria-hidden":'' + !_vm.isOpen}},[_c('transition',{attrs:{"name":"fade-in-down"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen),expression:"isOpen"}],ref:"menu",staticClass:"c-select__menu",class:_vm.size ? 'is-'+_vm.size : '',style:(_vm.menuStyle),attrs:{"role":"menu","aria-activedescendant":""}},[(_vm.autocomplete && !_vm.filteredOptions.length)?_vm._t("no-match",[_c('div',{staticClass:"c-select__empty"},[_vm._v("无匹配选项")])]):_vm._e(),_vm._l((_vm.filteredOptions),function(option,index){return _c('c-option',{key:index,ref:"$options",refInFor:true,attrs:{"label":option.label,"isActive":_vm.activeOption == option,"isSelected":_vm.selectedOptions.indexOf(option) > -1,"disabled":option.disabled,"option":option}},[_vm._t("menu-item",null,{"label":option.label,"isActive":_vm.activeOption == option,"isSelected":_vm.selectedOptions.indexOf(option) > -1,"disabled":option.disabled,"index":index,"option":option})],2)})],2)])],1)],1)},staticRenderFns: [],
  name: 'c-select',

  components: {
    'c-portal': PortalComponent
  },

  mixins: [resettable, validatable],

  props: {
    value: [Number, String, Object, Array],
    options: Array,
    disabled: Boolean,
    placeholder: {
      type: String,
      default: '请选择...'
    },
    shouldMenuOverlap: {
      type: Boolean,
      default: true
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
      default: function (ommittedCount) { return ("和其它" + ommittedCount + "个选项"); }
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
      return empty && !this.showInput
    },
    exceedMaxChipCount: function exceedMaxChipCount () {
      return this.selectedOptions.length > this.maxChipCount
    },
    maxChipText: function maxChipText () {
      if (!this.exceedMaxChipCount) { return }
      var ommittedCount = this.selectedOptions.length - this.maxChipCount;
      var ref = this;
      var maxChipPlaceholder = ref.maxChipPlaceholder;
      if (typeof maxChipPlaceholder === 'function') {
        return maxChipPlaceholder(ommittedCount)
      }
      return maxChipPlaceholder
    }
  },

  watch: {
    isOpen: function isOpen () {
      if (this.isOpen) {
        this.menuStyle.minWidth = (this.$el.offsetWidth) + "px";
        // reset positon to next tick
        // this would fix cases where input element in `<c-select autocomplete />`
        // is expanding (add a new line)
        this.$nextTick(this.positionMenu);
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
      this.$nextTick(this.positionMenu);
    }
  },

  created: function created () {
    var this$1 = this;

    // filter function throttled
    this.filterFunction = throttle(function (options, query) {
      var filtered = this$1.filter(options, query);
      if (typeof filtered.then === 'function') {
        var promiseId = Date.now();
        this$1.promiseId = promiseId;
        filtered.then(function (options) {
          if (this$1.promiseId > promiseId) { return }
          this$1.filteredOptions = normalizeOptions(options);
        });
      } else {
        this$1.filteredOptions = normalizeOptions(filtered);
      }
    }, this.filterThrottle, {
      leading: true,
      trailing: true
    });
  },

  mounted: function mounted () {
    var this$1 = this;

    this.menuEl = this.$refs.menu;

    // hover the option
    this.$on('option-activated', function (option) {
      this$1.activeOption = option;
    });

    // reset position on window.resize
    this.__onresize = throttle(
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
        var ref = this;
        var autocomplete = ref.autocomplete;
        var query = ref.query;
        if (!autocomplete) {
          this.filteredOptions = this.normalizedOptions;
          return
        }
        this.filterFunction(this.normalizedOptions, query);
      }
    );
  },

  beforeDestroy: function beforeDestroy () {
    window.removeEventListener('resize', this.__onresize);
  },

  methods: {
    /**
     * SEE https://github.com/clair-design/clair/issues/40
     * 1. should not focus on `this.$el` if we just clicked another
     *    element that is focusable
     * 2. should not set focus on `this.$el` if it's gone out of screen,
     *    at least, prevent `this.$el` from scrolling into visible area,
     *    which can cause the page jumping/flashing
     *
     * @param {HTMLElement} target the element that may be focused
     */
    setFocusIfPossible: function setFocusIfPossible (target) {
      var activeElement = document.activeElement;
      // https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement
      // "When there is no selection, the active element is the page's <body> or null".
      if (activeElement !== document.body) {
        // SEE https://stackoverflow.com/a/51746983
        if (activeElement.contains(target) || activeElement === target) {
          return
        }
      }
      // SEE https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
      this.$el.focus({ preventScroll: true });
    },

    toggleOpen: function toggleOpen () {
      if (this.disabled) { return }
      if (this.isOpen) {
        this.close();
      } else {
        this.$nextTick(this.open);
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

    focusOnInput: function focusOnInput () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.$refs.input.focus({ preventScroll: true });
      });
    },

    open: function open () {
      var assign;

      this.isOpen = true;
      (assign = this.filteredOptions, this.activeOption = assign[0]);
      if (this.showInput) {
        this.query = '';
        this.focusOnInput();
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
      var prev = null;
      var currentIndex = this.filteredOptions.indexOf(current);
      for (var i = currentIndex - 1; i >= 0; i--) {
        if (!this.filteredOptions[i].disabled) {
          prev = this.filteredOptions[i];
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
      // 输入框重新获得焦点
      this.focusOnInput();
    },

    positionMenu: function positionMenu () {
      var ref = this;
      var shouldMenuOverlap = ref.shouldMenuOverlap;
      var canInput = ref.canInput;
      var menuEl = ref.menuEl;
      var ref$1 = getPosition(menuEl, this.$el);
      var top = ref$1.top;
      var left = ref$1.left;
      var height = ref$1.height;
      var overlap = shouldMenuOverlap && !canInput;

      var offset = 4;
      var menuTop = overlap ? top : (top + height + offset);
      menuEl.style.left = left + "px";
      menuEl.style.top = menuTop + "px";
      menuEl.style.zIndex = zIndex.next();
    },

    onBodyClick: function onBodyClick (ref) {
      var target = ref.target;

      var isInSelect = this.$el.contains(target);
      var isInMenu = this.menuEl.contains(target);
      if (!isInSelect && !isInMenu) {
        this.close();
        this.setFocusIfPossible(target);
      }
    },

    onDeleteKey: function onDeleteKey (e) {
      if (!this.query) { this.selectedOptions.pop(); }
    },

    // 通过 Tab 键跳到下一个焦点
    // 理应关闭弹出菜单
    onTabOut: function onTabOut () {
      this.close();
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
};

var $2_35 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-select__option",class:_vm.classNames,attrs:{"role":"menuitem","aria-selected":"isSelected"},on:{"mouseenter":_vm.activate,"mouseleave":_vm.deactivate,"mousedown":function($event){$event.preventDefault();return _vm.noop($event)},"click":_vm.onClick}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)},staticRenderFns: [],
  name: 'c-option',
  props: {
    label: [String, Number, Boolean],
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
};

var defaultHoverTimeout = 200;

var $2_36 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-ctrl',{staticClass:"c-slider",attrs:{"direction":_vm.vertical ? 'v' : 'h'},on:{"change":_vm.onRangeChange}},[_c('div',{staticClass:"c-slider",class:_vm.className,style:(_vm.height ? { height: _vm.height } : null),on:{"mousedown":_vm.onMousedown}},[_c('input',{attrs:{"type":"range","min":_vm.min,"max":_vm.max,"step":_vm.step,"disabled":_vm.disabled},domProps:{"value":_vm.nominal}}),_c('div',{staticClass:"c-slider__progress",style:(_vm.progressPos)}),_c('ul',{staticClass:"c-slider__marks"},_vm._l((_vm.normalizedMarks),function(mark){return _c('li',{style:(((_vm.vertical ? 'bottom' : 'left') + ": " + (mark.p)))},[_vm._v(_vm._s(mark.n))])}),0),_c('div',{staticClass:"c-slider__stops"},_vm._l((_vm.normalizedMarks),function(mark){return _c('span',{style:(((_vm.vertical ? 'bottom' : 'left') + ": " + (mark.p)))})}),0),_c('div',{staticClass:"c-slider__thumb",class:{ 'c-slider__thumb--hover': !_vm.isDrag && _vm.isHover, 'c-slider__thumb--dragging': _vm.isDrag },style:(_vm.thumbPos),on:{"mouseenter":_vm.onThumbHover,"mouseleave":_vm.onThumbHoverout}},[_c('div',{staticClass:"c-slider__tip",attrs:{"role":"tooltip","aria-hidden":"true"}},[_vm._v(_vm._s(_vm.formmater(this.nominal, 'tip')))])])])])},staticRenderFns: [],
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
    formmater: VueTypes.func.def(function (id) { return id; }),
    vertical: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    height: VueTypes.string
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
        var mark = clamp(mk, min, max);

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
      return clamp(decimal, 0, 1)
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
      if (!this.disabled) {
        this.normorlizedValue = this.vertical ? 1 - e : e;
      }
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
    },

    onMousedown: function onMousedown () {
      this.isDrag = true;
      document.addEventListener('mouseup', this.onMouseup);
    },
    onMouseup: function onMouseup () {
      this.isDrag = false;
      document.removeEventListener('mouseup', this.onMouseup);
    }
  },

  created: function created () {
    this.normorlizedValue = this.normalize(this.value);
    this.$emit('change', this.nominal);

    this.onMouseup = this.onMouseup.bind(this);
  },

  watch: {
    value: {
      handler: function handler (newVal) {
        var ref = this;
        var max = ref.max;
        var min = ref.min;
        var val = Number(newVal);

        if (val !== clamp(val, min, max)) {
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
};

var $2_37 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-steps-container",class:_vm.className,attrs:{"active":_vm.active}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-steps',
  props: {
    direction: VueTypes.oneOf(['vertical', 'horizontal']).def('horizontal'),
    active: VueTypes.number.def(1)
  },
  data: function data () {
    return {
      steps: []
    }
  },
  computed: {
    className: function className () {
      return this.direction === 'vertical' ? 'c-steps-vertical' : 'c-steps-horizontal'
    }
  },
  methods: {},
  watch: {
    steps: function steps (steps$1) {
      steps$1.forEach(function (child, index) {
        child.index = index;
      });
    }
  }
};

var $2_38 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-step",class:_vm.className},[_c('div',{staticClass:"c-step-header"},[(_vm.icon)?_c('div',{staticClass:"c-step-icon"},[_c('c-icon',{attrs:{"type":"feather","name":_vm.icon}})],1):_c('div',{staticClass:"c-step-icon"},[_vm._v(_vm._s(_vm.index + 1))])]),_c('div',{staticClass:"c-step-content"},[_c('div',{staticClass:"c-title"},[_vm._t("default",[_vm._v(_vm._s(_vm.title))])],2),(_vm.description)?_c('div',{staticClass:"c-step-description"},[_vm._t("default",[_vm._v(_vm._s(_vm.description))])],2):_vm._e()])])},staticRenderFns: [],
  name: 'c-step',
  props: {
    title: VueTypes.string,
    description: VueTypes.string,
    icon: VueTypes.string,
    iconPos: VueTypes.oneOf(['left', 'top']).def('top'),
    status: VueTypes.oneOf(['loading', 'success', 'warning', 'error', 'default']).def('default')
  },
  data: function data () {
    return {
      index: -1
    }
  },
  created: function created () {
    this.index = this.$parent.steps.indexOf(this);
  },

  beforeCreate: function beforeCreate () {
    this.$parent.steps.push(this);
  },

  computed: {
    className: function className () {
      var classStr = "" + (this.iconPos);
      if (this.index === this.$parent.active - 1) {
        classStr += " active";
      }
      if (this.status) {
        classStr += " " + (this.status);
      }
      return classStr
    }
  },
  methods: {}
};

var name$3 = 'c-switch';
var $2_39 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-switch",class:_vm.className,attrs:{"activeColor":_vm.activeColor,"inActiveColor":_vm.inActiveColor}},[_c('input',{staticClass:"c-switch__checkbox",attrs:{"type":"checkbox","disabled":_vm.disabled,"name":_vm.name},domProps:{"checked":_vm.checked,"value":_vm.value}}),_c('div',{staticClass:"c-switch__layoutbox",style:(_vm.styleObj),on:{"click":function($event){$event.stopPropagation();return _vm.toggle($event)}}})])},staticRenderFns: [],
  name: name$3,
  model: {
    event: 'change'
  },
  props: {
    disabled: Boolean,
    checkedColor: String,
    uncheckedColor: String,
    checkedValue: {
      default: true
    },
    uncheckedValue: {
      default: false
    },
    value: {
      default: false
    },
    size: {
      type: String,
      validator: function validator (val) {
        if (!val || val === 'small') {
          return true
        }
        // TODO
        // extend different sizes
        throw new Error('Switch: only supports `size=small` for now')
      }
    }
  },
  mixins: [resettable, validatable],
  data: function data () {
    return {
      name: name$3,
      currentValue: false
    }
  },
  watch: {
    value: function value (val) {
      this.currentValue = val;
    }
  },
  created: function created () {
    var ref = this;
    var value = ref.value;
    var checkedValue = ref.checkedValue;
    var uncheckedValue = ref.uncheckedValue;
    this.currentValue = value ? checkedValue : uncheckedValue;
  },
  computed: {
    checked: function checked () {
      return this.currentValue === this.checkedValue
    },
    styleObj: function styleObj () {
      var obj = {};
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
    className: function className () {
      // TODO
      // use standard `xs` `sm` `md` `lg` `xl`
      if (this.size === 'small') {
        return 'is-sm'
      }
      return undefined
    }
  },
  methods: {
    toggle: function toggle () {
      if (this.disabled) { return }
      var value = this.checked ? this.uncheckedValue : this.checkedValue;
      this.currentValue = value;
      this.$emit('change', value);
    }
  }
};

var $2_40 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',[(!_vm.onlybody)?_c('thead',_vm._l((_vm.columnsRows),function(column){return _c('tr',_vm._l((column.columns),function(item){return _c('th',{class:_vm.getColumnClassName(item),style:(_vm.getTHCellStyle(item)),attrs:{"colspan":item.colspan,"rowspan":item.rowspan}},[(item.type === 'selection')?_c('span',{staticClass:"c-table__check"},[_c('c-checkbox',{attrs:{"indeterminate":_vm.checkIndeterminate},on:{"change":_vm.onSelectAllChange},model:{value:(_vm.allSelect),callback:function ($$v) {_vm.allSelect=$$v;},expression:"allSelect"}})],1):_vm._e(),_vm._t(item.key + '-base-th',[_c('span',[_vm._v(_vm._s(item.title))])]),(item.sorter)?_c('span',{staticClass:"c-table__sort"},[_c('div',{staticClass:"c-sort-asc",class:{'sorted': _vm.checkSorted(item.key, 'asc')},on:{"click":function($event){return _vm.onSorted(item.key, 'asc')}}},[_c('i',{staticClass:"sort-asc"})]),_c('div',{staticClass:"c-sort-desc",class:{'sorted': _vm.checkSorted(item.key, 'desc')},on:{"click":function($event){return _vm.onSorted(item.key, 'desc')}}},[_c('i',{staticClass:"sort-desc"})])]):_vm._e()],2)}),0)}),0):_vm._e(),(!_vm.onlyhead)?_c('tbody',[(_vm.dataList.length == 0)?_c('tr',[_c('td',{staticClass:"c-table__noresult",attrs:{"colspan":_vm.columns.length}},[_vm._v(_vm._s(_vm.noresultMsg))])]):_vm._l((_vm.dataList),function(dataItem,index){return [_c('tr',{class:_vm.getRowClassName(dataItem, index),on:{"mouseenter":function($event){return _vm.setCurrentItem(dataItem, index)},"mouseleave":_vm.resetCurrentItem}},_vm._l((_vm.allColumns),function(columnsItem,colIndex){return (_vm.tdSpanMethod(dataItem, _vm.columnItem, index, colIndex).rowspan && _vm.tdSpanMethod(dataItem, _vm.columnItem, index, colIndex).colspan)?_c('td',{class:_vm.getColumnClassName(columnsItem),style:(_vm.getCellStyle(columnsItem)),attrs:{"colspan":_vm.tdSpanMethod(dataItem, _vm.columnItem, index, colIndex).colspan,"rowspan":_vm.tdSpanMethod(dataItem, _vm.columnItem, index, colIndex).rowspan},on:{"click":function($event){return _vm.openExpand(dataItem, columnsItem, index, colIndex)}}},[_vm._t(columnsItem.key + '-base-td',[(columnsItem.type === 'expand')?_c('span',{staticClass:"c-table__expand"},[(dataItem._showExpand)?_c('c-icon',{attrs:{"name":"chevron-down"}}):_c('c-icon',{attrs:{"name":"chevron-right"}})],1):_vm._e(),(columnsItem.type === 'selection')?_c('span',{staticClass:"c-table__check"},[_c('c-checkbox',{attrs:{"disabled":dataItem._disabled},on:{"change":_vm.onSelectChange},model:{value:(dataItem._checked),callback:function ($$v) {_vm.$set(dataItem, "_checked", $$v);},expression:"dataItem._checked"}})],1):_vm._e(),(columnsItem.render)?_c('div',{domProps:{"innerHTML":_vm._s(columnsItem.render(index, dataItem[columnsItem.key], dataItem))}}):_c('span',[_vm._v(_vm._s(dataItem[columnsItem.key]))])],{"item":dataItem,"rowIndex":index})],2):_vm._e()}),0),(_vm.hasExpand && dataItem._showExpand)?_c('tr',[_c('td',{attrs:{"colspan":_vm.allColumns.length}},[_vm._t("expandRow",null,{"row":dataItem})],2)]):_vm._e()]})],2):_vm._e()])},staticRenderFns: [],
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
    noresultMsg: String,
    expand: Boolean,
    spanMethod: Function
  },

  data: function data () {
    return {
      dataList: {},
      currentItem: {},
      columnsRows: [],
      allSelect: false,
      checkIndeterminate: false
    }
  },

  computed: {
    allColumns: function allColumns () {
      var columns = cloneDeep(this.columns);
      return this.getAllColumns(columns)
    },
    hasExpand: function hasExpand () {
      return this.expand
    }
  },

  created: function created () {
    this.allSelect = this.allChecked;
    this.checkIndeterminate = this.indeterminate;
    this.dataList = cloneDeep(this.datasource);
  },

  mounted: function mounted () {
    this.getTHWidth(this.columns);
    var maxlevel = this.findMaxLevel(this.columns);
    this.columnsRows = this.getLevelColumns(this.columns, maxlevel);
  },
  watch: {
    datasource: function datasource (newVal) {
      this.dataList = cloneDeep(newVal);
    },
    allChecked: function allChecked (newVal) {
      if (this.allSelect === newVal) { return }
      this.allSelect = newVal;
    },
    indeterminate: function indeterminate (newVal) {
      this.checkIndeterminate = newVal;
    },
    hoverRowIndex: function hoverRowIndex () {
      this.$forceUpdate();
    },
    columns: function columns () {
      this.getTHWidth(this.columns);
      var maxlevel = this.findMaxLevel(this.columns);
      this.columnsRows = this.getLevelColumns(this.columns, maxlevel);
    }
  },

  methods: {
    tdSpanMethod: function tdSpanMethod (row, column, rowIndex, colIndex) {
      var assign;

      var rowspan = 1;
      var colspan = 1;
      if (this.spanMethod) {
        var spans = this.spanMethod(row, column, rowIndex, colIndex);
        var isArray = spans instanceof Array;
        if (isArray) {
          (assign = spans, rowspan = assign[0], colspan = assign[1]);
        } else if (spans) {
          rowspan = spans.rowspan;
          colspan = spans.colspan;
        }
      }
      return {
        rowspan: rowspan,
        colspan: colspan
      }
    },
    openExpand: function openExpand (dataItem, columnsItem, index, colIndex) {
      if (columnsItem.type !== 'expand') { return }
      dataItem._showExpand = !dataItem._showExpand;
      this.$emit('openExpand', dataItem, index);
    },
    getRowClassName: function getRowClassName (row, rowIndex) {
      var classes = [];
      var ref = this;
      var rowClassName = ref.rowClassName;
      if (typeof rowClassName === 'string') {
        classes.push(rowClassName);
      } else if (typeof rowClassName === 'function') {
        classes.push(rowClassName(
          row,
          rowIndex
        ));
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
      this.$emit('sort', { key: key, order: order });
    },
    getCellStyle: function getCellStyle (item) {
      var width = typeof item.width === 'number' ? ((item.width) + "px") : item.width;
      return {
        width: item.width ? width : 'auto',
        textAlign: item.align ? item.align : 'left'
      }
    },
    getTHCellStyle: function getTHCellStyle (item) {
      var cellStyle = this.getCellStyle(item);
      var thHeight = 40;
      cellStyle.height = item.rowspan ? ((item.rowspan * thHeight) + "px") : (thHeight + "px");
      return cellStyle
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

    getTHWidth: function getTHWidth (list) {
      var this$1 = this;

      var width = 0;
      list.forEach(function (item) {
        if (item.children) {
          item.width = this$1.getTHWidth(item.children);
        }
        width += item.width ? item.width : 0;
      });
      return width || ''
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
};

var $2_41 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.className},[(_vm.hasFixed)?_c('div',{staticClass:"c-table",class:_vm.withBorderClass},[(_vm.height)?[_c('div',{staticClass:"c-table__wrapper"},[_c('div',{staticClass:"c-table__headwrapper"},[_c('div',{staticClass:"c-scroll__thead",on:{"scroll":_vm.theadScroll}},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})],1)]),_c('div',{staticClass:"c-table__bodywrapper"},[_c('div',{ref:_vm.scrollbody,staticClass:"c-scroll__tbody",on:{"mouseenter":_vm.setCurrentScrollBox,"mouseleave":_vm.removeCurrentScrollBox}},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})],1)]),_c('div',{staticClass:"c-fixtable__left",class:{'c-fixed__leftscroll': _vm.isScrollMove},on:{"mouseenter":_vm.setCurrentScrollBox,"mouseleave":_vm.removeCurrentScrollBox}},[(_vm.datasource.length > 0)?[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})],1),_c('div',{ref:"fixedleft",staticClass:"c-table__body",on:{"scroll":_vm.onYscroll}},[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})],1)]:[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})],1),_vm._e()]],2),_c('div',{staticClass:"c-fixtable__right",class:{'c-fixed__rightscroll': _vm.isScrollMove},on:{"mouseenter":_vm.setCurrentScrollBox,"mouseleave":_vm.removeCurrentScrollBox}},[(_vm.datasource.length > 0)?[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})],1),_c('div',{ref:"fixedright",staticClass:"c-table__body",on:{"scroll":_vm.onYscroll}},[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})],1)]:[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})],1),_vm._e()]],2)])]:[_c('div',{staticClass:"c-scrolltable",on:{"scroll":_vm.onScroll}},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})],1),(_vm.fixedLeftColumns.length > 0)?_c('div',{staticClass:"c-fixtable__left",class:{'c-fixed__leftscroll': _vm.isScrollMove}},[(_vm.datasource.length > 0)?[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})]:[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})]],2):_vm._e(),(_vm.fixedRightColumns.length > 0)?_c('div',{staticClass:"c-fixtable__right",class:{'c-fixed__rightscroll': _vm.isScrollMove}},[(_vm.datasource.length > 0)?[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})]:[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})]],2):_vm._e()]],2):_c('div',{staticClass:"c-table",class:_vm.withBorderClass},[(_vm.height)?[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})],1),_c('div',{ref:"scrollBody",staticClass:"c-table__body",on:{"scroll":_vm.onScroll}},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})],1)]:[_c('div',{staticClass:"c-scroll__table"},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg,"expand":_vm.expand,"spanMethod":_vm.spanMethod},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave,"openExpand":_vm.onOpenExpand},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return (_vm.$scopedSlots[item.key+'-th'])?[_vm._t(item.key + '-th',null,{"item":props.item})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return (_vm.$scopedSlots[item.key+'-td'])?[_vm._t(item.key + '-td',null,{"item":props.item,"rowIndex":props.rowIndex})]:undefined}}}),{key:"expandRow",fn:function(props){return [_vm._t("expand",null,{"row":props.row})]}}],null,true)})],1)]],2)])},staticRenderFns: [],
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
    },
    expand: Boolean,
    spanMethod: Function
  },

  data: function data () {
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
        var this$1 = this;

        this.composeData();
        this.getColumnsDetail();
        this.$nextTick(function (_) {
          this$1.height && this$1.getTbodyStyle();
        });
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
      var this$1 = this;

      this.getColumnsDetail();
      this.$nextTick(function (_) {
        this$1.height && this$1.getTbodyStyle();
        if (this$1.hasFixed) {
          var scrollEl = this$1.$el.querySelector('.c-scroll__tbody');
          scrollEl && scrollEl.addEventListener('scroll', this$1.onScroll, false);
        }
      });
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
    onOpenExpand: function onOpenExpand (item, index) {
      this.$emit('openExpand', item, index);
    },
    updateSelectAll: function updateSelectAll (status) {
      var this$1 = this;

      this.allChecked = status;
      this.dataList = this.dataList.map(function (item) {
        if (!item._disabled) {
          this$1.$set(item, '_checked', status);
        }
        return item
      });
      this.selection = this.dataList.filter(function (item) { return item._checked; });
    },
    onSelectAllChange: function onSelectAllChange (status) {
      var this$1 = this;

      this.updateSelectAll(status);
      this.indeterminate = this.selection.length > 0 &&
          this.selection.length < this.dataList.length;
      this.$nextTick(function () {
        this$1.$emit('selectChange', this$1.selection);
      });
    },
    onSelectChange: function onSelectChange (currentItem, status) {
      var this$1 = this;

      if (status) {
        this.selection.push(currentItem);
      } else {
        this.selection = this.selection.filter(function (item) { return item._indexId !== currentItem._indexId; });
      }
      this.selection = this.selection.filter(function (item) { return item._checked; });
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
        item._indexId = index;
        item._checked = (item.hasOwnProperty('_checked') && item._checked) || this$1.allChecked;
        item._disabled = (item.hasOwnProperty('_disabled') && item._disabled) || this$1.allChecked;
        item._showExpand = (item.hasOwnProperty('_showExpand') && item._showExpand);
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
      var tbodyWrapper = this.$el.querySelector('.c-table__wrapper');
      var theadHeight = tableStyle.height || this.maxLevel * 40;
      var scrollBarHeight = tbodyEl.offsetHeight !== tbodyEl.clientHeight ? this.scrollBarSize : 0;
      var height = (this.height - theadHeight - scrollBarHeight) + "px";

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
      tbodyEl.style.maxHeight = (this.height - theadHeight) + "px";
    },
    getCurrentScrollBarSize: function getCurrentScrollBarSize () {
      this.scrollBarSize = getScrollBarSize();
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
    theadScroll: function theadScroll (e) {
      if (!this.hasFixed) { return }
      var scrollEl = this.$el.querySelector('.c-scroll__tbody');
      var ref = e.target;
      var scrollLeft = ref.scrollLeft;
      if (scrollEl) {
        scrollEl.scrollLeft = scrollLeft;
      }
    },
    sorter: function sorter (ref) {
      var key = ref.key;
      var order = ref.order;

      this.$emit('sort', { key: key, order: order });
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
    },
    // set colspan
    getLeafColumns: function getLeafColumns (list) {
      var this$1 = this;

      var columns = [];
      list.forEach(function (item) {
        item.level = 1;
        if (item.children) {
          item.colspan = this$1.getAllColumns(item.children).length;
          item.children = this$1.getLeafColumns(item.children);
          item.children = this$1.getLevels(item);
        } else {
          item.colspan = 1;
        }
        columns.push(item);
      });
      return columns
    },
    // set rolspan
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
    getColumnsDetail: function getColumnsDetail () {
      var columns = this.getLeafColumns(this.columns);
      var maxlevel = this.findMaxLevel(this.columns);
      var columnsrows = this.getColumnsRows(columns, maxlevel);
      this.composeColumns = this.getLevelColumns(columnsrows, maxlevel);
      this.maxLevel = maxlevel;
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
};

var $2_42 = {
  name: 'c-tabs',
  props: {
    mode: VueTypes.string.def('default'),
    position: VueTypes.string.def('top'),
    activeIndex: VueTypes.string.def('1'),
    type: VueTypes.string.def(''),
    color: VueTypes.string.def('')
  },
  provide: function provide () {
    return {
      rootTabs: this
    }
  },
  data: function data () {
    return {
      panes: [],
      currentIndex: +this.activeIndex,
      reset: true,
      focusable: true,
      isFocused: false
    }
  },
  computed: {
    classNames: function classNames () {
      var classNames = ['c-tabs'];
      var ref = this;
      var mode = ref.mode;
      var position = ref.position;
      var color = ref.color;
      if (mode) { classNames.push(("c-tabs--" + mode)); }
      if (position) { classNames.push(("c-tabs--" + position)); }
      if (color) { classNames.push(("c-tabs--" + color)); }
      return classNames
    }
  },
  mounted: function mounted () {
    this.setPanes();
  },
  watch: {
    activeIndex: function activeIndex (value) {
      this.setCurrentIndex(value);
    },
    position: function position () {
      var this$1 = this;

      this.reset = false;
      this.$nextTick(function () {
        this$1.reset = true;
      });
    }
  },
  methods: {
    setPanes: function setPanes () {
      if (this.$slots.default) {
        var paneComponents = this.$slots.default.filter(function (vNode) { return vNode.tag && vNode.componentOptions && vNode.componentOptions.tag === 'c-tab-pane'; });
        var panes = paneComponents.map(function (node) {
          if (node.componentInstance) {
            return node.componentInstance
          }
        });
        this.panes = panes;
      } else if (this.panes.length !== 0) {
        this.panes = [];
      }
    },
    setCurrentIndex: function setCurrentIndex (value, pane) {
      if (pane.componentOptions && pane.componentOptions.propsData && pane.componentOptions.propsData.disabled) { return }
      if (this.currentIndex === value) { return }
      this.currentIndex = value;
      this.$emit('change', value);
    },
    getPaneChildren: function getPaneChildren (pane) {
      if (!pane.componentOptions.children) {
        return pane.componentOptions.propsData.label
      }
      return pane.componentOptions.children.filter(
        function (child) { return child.data && child.data.slot === 'label'; }
      )
    },
    getPaneContent: function getPaneContent (pane) {
      if (!pane.componentOptions.children) {
        return ''
      }
      return pane.componentOptions.children.filter(function (child) {
        return !child.data || child.data.slot !== 'label'
      })
    },
    clickHandler: function clickHandler (value, pane) {
      this.removeFocus();
      this.setCurrentIndex(value, pane);
    },
    keydownHandler: function keydownHandler (e) {
      e.preventDefault();
      var keyCode = e.keyCode;
      var nextIndex;
      var currentIndex, tabList, validTabArray;
      if ([37, 38, 39, 40].indexOf(keyCode) !== -1) {
        tabList = e.currentTarget.querySelectorAll('[role=tab]');
        validTabArray = Array.prototype.slice.call(tabList).filter(function (item) { return +item.getAttribute('tabindex') !== -1; });
        currentIndex = Array.prototype.indexOf.call(validTabArray, e.target);
      } else {
        return
      }
      if (keyCode === 37 || keyCode === 38) {
        if (currentIndex === 0) {
          nextIndex = validTabArray.length - 1;
        } else {
          nextIndex = currentIndex - 1;
        }
      } else {
        if (currentIndex < validTabArray.length - 1) {
          nextIndex = currentIndex + 1;
        } else {
          nextIndex = 0;
        }
      }
      validTabArray[nextIndex].focus();
      validTabArray[nextIndex].click();
      this.setFocus();
    },
    setFocus: function setFocus () {
      if (this.focusable) {
        this.isFocused = true;
      }
    },
    removeFocus: function removeFocus () {
      this.isFocused = false;
    }
  },
  render: function render (h) {
    var this$1 = this;

    var ref = this;
    var clickHandler = ref.clickHandler;
    var currentIndex = ref.currentIndex;
    var classNames = ref.classNames;
    var position = ref.position;
    var keydownHandler = ref.keydownHandler;
    var setFocus = ref.setFocus;
    var removeFocus = ref.removeFocus;
    var panes = this.$slots.default.filter(function (pane) {
      return pane && pane.componentOptions
    });
    var navBar = h(
      'c-tab-bar',
      {
        class: 'c-tab-bar',
        props: {
          activeIndex: currentIndex > panes.length ? 1 : currentIndex,
          position: position
        }
      }
    );

    var navs = panes.map(function (pane, index) {
      var disabled = pane.data && pane.data.attrs && pane.data.attrs.disabled;
      return h(
        pane.componentOptions.tag,
        {
          props: Object.assign(pane.componentOptions.propsData, {
            shownav: true,
            index: index + 1,
            disabled: disabled
          }),
          attrs: {
            role: 'tab',
            tabindex: disabled ? -1 : index
          },
          ref: ("tabs" + index),
          slot: 'label',
          class: ("tabs-nav__item " + (disabled ? 'disabled' : '') + " " + (this$1.isFocused ? 'is-focused' : '')),
          on: {
            tabClicked: function (value) { return clickHandler(value, pane); }
          },
          nativeOn: {
            focus: function () { return setFocus(); },
            blur: function () { return removeFocus(); }
          }
        },
        this$1.getPaneChildren(pane)
      )
    });

    var navOuter = h(
      'div',
      {
        class: 'nav-outer'
      },
      navs
    );

    var navWrapperElem = this.mode === 'default' ? [navOuter, navBar] : [navs];
    var navWrapper = h(
      'div',
      {
        class: 'tabs-nav',
        ref: 'nav',
        attrs: {
          role: 'tablist'
        },
        on: {
          keydown: function (event) { return keydownHandler(event); }
        }
      },
      navWrapperElem
    );

    var contentWrapper = h(
      'div',
      {
        class: 'tab-pane__content'
      },
      panes.map(function (pane, index) {
        var ariaHidden = this$1.currentIndex === index + 1 ? {} : { 'aria-hidden': true };
        return h(
          pane.componentOptions.tag,
          {
            props: Object.assign(pane.componentOptions.propsData, {
              shownav: false,
              index: index + 1
            }),
            attrs: Object.assign({
              id: ("pane-" + (index + 1)),
              role: 'tabpanel',
              'aria-labelledby': ("tab-" + (index + 1))
            }, ariaHidden),
            ref: ("panes" + index),
            slot: 'label'
          },
          this$1.getPaneContent(pane)
        )
      })
    );
    if (this.reset) {
      return h(
        'div',
        {
          class: classNames
        },
        [navWrapper, contentWrapper]
      )
    }

    return null
  }
};

var $2_43 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"bar",staticClass:"nav-bar__active",style:(_vm.barStyle)})},staticRenderFns: [],
  name: 'c-tab-bar',
  inject: ['rootTabs'],
  props: {
    activeIndex: VueTypes.number.def(1),
    position: VueTypes.string.def('top')
  },
  data: function data () {
    return {
      barWidth: 0,
      barOffset: 0,
      barHeight: 0
    }
  },
  mounted: function mounted () {
    this.styleBar(this.activeIndex);
  },
  computed: {
    barStyle: function barStyle () {
      if (['top', 'bottom'].indexOf(this.position) >= 0) {
        return {
          width: ((this.barWidth) + "px"),
          transform: ("translateX(" + (this.barOffset) + "px)")
        }
      }
      if (['left', 'right'].indexOf(this.position) >= 0) {
        return {
          top: 0,
          height: ((this.barHeight) + "px"),
          transform: ("translateY(" + (this.barOffset) + "px)")
        }
      }
      return null
    }
  },

  methods: {
    styleBar: function styleBar (index) {
      if ( index === void 0 ) index = this.activeIndex;

      this.resetBarStyle();
      var horizontal = this.position === 'top' || this.position === 'bottom';
      if (this.$parent.$refs && this.$parent.$refs[("tabs" + (this.activeIndex - 1))]) {
        var curTab = this.$parent.$refs[("tabs" + (this.activeIndex - 1))].$el;
        this.barOffset = horizontal ? curTab.offsetLeft : curTab.offsetTop;
        if (horizontal) {
          this.barWidth = curTab.offsetWidth;
        } else {
          this.barHeight = curTab.offsetHeight;
        }
      }
    },
    resetBarStyle: function resetBarStyle () {
      this.barWidth = this.barHeight = this.barOffset = 0;
    }
  },
  watch: {
    activeIndex: function activeIndex (newIdx) {
      this.styleBar(newIdx);
    }
  }
};

var $2_44 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.shownav)?_c('div',{class:[_vm.active ? 'is-active' : ''],attrs:{"id":_vm.tabIndex,"aria-selected":_vm.active,"aria-controls":_vm.paneIndex},on:{"click":_vm.handleClick}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2):_c('div',[(_vm.active)?_vm._t("default"):_vm._e()],2)},staticRenderFns: [],
  name: 'c-tab-pane',
  props: {
    label: VueTypes.string,
    index: VueTypes.number,
    shownav: Boolean
  },
  computed: {
    active: function active () {
      var active = this.$parent.currentIndex === this.index;
      return active
    },
    tabIndex: function tabIndex () {
      return ("tab-" + (this.index))
    },
    paneIndex: function paneIndex () {
      return ("pane-" + (this.index))
    }
  },
  methods: {
    handleClick: function handleClick () {
      this.$emit('tabClicked', this.index);
    }
  }
};

var $2_45 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"timepicker",staticClass:"c-timepicker"},[(!_vm.disabled)?_c('div',{staticClass:"c-timepicker__icon c-timepicker__hovericon",class:_vm.sizeClassName,on:{"click":_vm.clear}},[_c('c-icon',{attrs:{"name":"x-circle"}})],1):_vm._e(),_c('div',{staticClass:"c-timepicker__icon",class:_vm.sizeClassName,on:{"click":_vm.openTimePanel}},[_c('c-icon',{attrs:{"type":"feather","name":"clock"}})],1),(_vm.timeType == 'timerange')?_c('c-timerange',{attrs:{"value":_vm.value,"readonly":_vm.readonly,"disabled":_vm.disabled,"size":_vm.size,"format":_vm.format},on:{"change":_vm.timerangeChange}}):_vm._e(),(_vm.timeType=='timepicker')?_c('c-input',{attrs:{"placeholder":_vm.placeholder,"disabled":_vm.disabled,"size":_vm.size,"readonly":_vm.readonly},on:{"change":_vm.valueChange},nativeOn:{"click":function($event){return _vm.openTimePanel($event)}},model:{value:(_vm.showValue),callback:function ($$v) {_vm.showValue=$$v;},expression:"showValue"}}):_vm._e(),(_vm.timeType=='timepicker')?_c('div',{ref:"timepickerPanel",staticClass:"c-timepicker__wrap",class:{show: _vm.isOpen}},[_c('c-timepanel',{attrs:{"isShown":_vm.isOpen,"hour":_vm.hour,"minute":_vm.minute,"second":_vm.second,"format":_vm.format,"minTime":_vm.minTime,"maxTime":_vm.maxTime,"secondStep":_vm.secondStep,"minuteStep":_vm.minuteStep,"hourStep":_vm.hourStep,"defaultValue":_vm.defaultValue},on:{"change":_vm.timeChange}})],1):_vm._e()],1)},staticRenderFns: [],
  name: 'c-timepicker',
  props: {
    timeType: {
      type: String,
      default: 'timepicker'
    },
    value: [String, Array],
    minTime: String,
    maxTime: String,
    size: String,
    format: {
      type: String,
      default: 'hh:mm:ss'
    },
    secondStep: Number,
    minuteStep: Number,
    hourStep: Number,
    disabled: Boolean,
    readonly: Boolean,
    placeholder: {
      type: String,
      default: '请输入时间'
    },
    defaultValue: [String, Date]
  },
  data: function data () {
    return {
      timepickerPanel: '',
      showValue: '',
      isOpen: false,
      hour: '',
      minute: '',
      second: ''
    }
  },
  computed: {
    sizeClassName: function sizeClassName () {
      return [
        this.size ? ("is-size-" + (this.size)) : '',
        this.disabled ? 'disabled' : ''
      ]
    },
    hasHour: function hasHour () {
      return this.format.toLowerCase().indexOf('h') > -1
    },
    hasMinute: function hasMinute () {
      return this.format.toLowerCase().indexOf('m') > -1
    },
    hasSecond: function hasSecond () {
      return this.format.toLowerCase().indexOf('s') > -1
    }
  },
  watch: {
    isOpen: function isOpen () {
      if (this.isOpen) {
        this.resize();
        window.addEventListener('mouseup', this.onBodyClick, true);
      } else {
        this.checkValue();
        window.removeEventListener('mouseup', this.onBodyClick, true);
      }
    },
    value: function value (newVal) {
      if (newVal !== this.showValue && this.timeType !== 'timerange') {
        this.showValue = newVal;
        if (this.showValue) {
          this.hour = this.showValue.split(':')[0];
          this.minute = this.showValue.split(':')[1];
          this.second = this.showValue.split(':')[2];
        }
      }
    }
  },
  mounted: function mounted () {
    var assign;

    if (this.timeType === 'timerange') { return }
    this.showValue = this.value;
    if (this.showValue) {
      (assign = this.showValue.split(':'), this.hour = assign[0], this.minute = assign[1], this.second = assign[2]);
    }
    if (typeof document === 'object') {
      this.timepickerPanel = this.$el.querySelector('.c-timepicker__wrap');
      document.body.appendChild(this.timepickerPanel);
      this.resize();
      window.addEventListener('resize', this.resize, false);
    }
  },
  methods: {
    clear: function clear (e) {
      e.preventDefault();
      if (this.timeType === 'timerange') {
        this.$emit('input', ['', '']);
        this.$emit('change', ['', '']);
        return
      }
      this.showValue = '';
      this.hour = '';
      this.minute = '';
      this.second = '';
      this.emitEvent();
    },
    emitEvent: function emitEvent () {
      this.$emit('input', this.showValue);
      this.$emit('change', this.showValue);
    },
    timerangeChange: function timerangeChange (range) {
      this.$emit('input', range);
      this.$emit('change', range);
    },
    valueChange: function valueChange (value) {
      if (/^\d{1,2}:\d{1,2}:\d{2}$/.test(value) && this.checkValue()) {
        this.hour = ("0" + (value.split(':')[0])).slice(-2);
        this.minute = ("0" + (value.split(':')[1])).slice(-2);
        this.second = ("0" + (value.split(':')[2])).slice(-2);
      }
    },
    generateValue: function generateValue () {
      var result = [];
      this.hasHour && result.push(this.hour);
      this.hasMinute && result.push(this.minute);
      this.hasSecond && result.push(this.second);
      return result.join(':')
    },
    updateTime: function updateTime () {
      var valueValid = this.hour || this.minute || this.second;
      this.showValue = valueValid ? this.generateValue() : '';
    },
    checkValue: function checkValue () {
      var ref = this.showValue.split(':');
      var hour = ref[0];
      var minute = ref[1];
      var second = ref[2];
      return !(second > 59 || minute > 59 || hour > 23)
    },
    timeChange: function timeChange (ref) {
      var hour = ref.hour;
      var minute = ref.minute;
      var second = ref.second;

      this.hour = hour;
      this.minute = minute;
      this.second = second;
      this.showValue = this.generateValue();
      this.emitEvent();
    },
    onBodyClick: function onBodyClick (e) {
      var isInPicker = this.$el.contains(e.target);
      var isInPanel = this.timepickerPanel.contains(e.target);
      if (!isInPicker && !isInPanel) {
        this.updateTime();
        this.emitEvent();
        this.close();
        this.$el.focus();
      }
    },
    close: function close () {
      this.isOpen = false;
    },
    openTimePanel: function openTimePanel (e) {
      if (this.disabled) { return }
      this.isOpen = true;
    },
    getStyle: function getStyle () {
      return getPopupStyle(this.$el, this.timepickerPanel)
    },
    resize: function resize () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.timepickerPanel.style.cssText = this$1.getStyle();
      });
    }
  }
};

var $2_46 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isShown),expression:"isShown"}],staticClass:"c-timepicker__panel"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasHour),expression:"hasHour"}],staticClass:"c-timepicker__item"},[_c('ul',{staticClass:"c-hour"},_vm._l((_vm.hours),function(item){return _c('li',{class:{'disabled': !!_vm.isHourDisabled(item)},on:{"click":function($event){return _vm.hourClick($event, item)}}},[_vm._v(_vm._s(item))])}),0)]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasMinute),expression:"hasMinute"}],staticClass:"c-timepicker__item"},[_c('ul',{staticClass:"c-minute"},_vm._l((_vm.minutes),function(item){return _c('li',{class:{'disabled': !!_vm.isMinuteDisabled(item)},on:{"click":function($event){return _vm.minuteClick($event, item)}}},[_vm._v(_vm._s(item))])}),0)]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.hasSecond),expression:"hasSecond"}],staticClass:"c-timepicker__item"},[_c('ul',{staticClass:"c-second"},_vm._l((_vm.seconds),function(item){return _c('li',{class:{'disabled': !!_vm.isSecondDisabled(item)},on:{"click":function($event){return _vm.secondClick($event, item)}}},[_vm._v(_vm._s(item))])}),0)])])},staticRenderFns: [],
  name: 'c-timepanel',
  props: {
    minTime: String,
    maxTime: String,
    isShown: Boolean,
    format: String,
    hour: [Number, String],
    minute: [Number, String],
    second: [Number, String],
    secondStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    hourStep: {
      type: Number,
      default: 1
    },
    defaultValue: String
  },
  computed: {
    hasHour: function hasHour () {
      return this.format.toLowerCase().indexOf('h') > -1
    },
    hasMinute: function hasMinute () {
      return this.format.toLowerCase().indexOf('m') > -1
    },
    hasSecond: function hasSecond () {
      return this.format.toLowerCase().indexOf('s') > -1
    }
  },
  data: function data () {
    return {
      hours: [],
      minutes: [],
      secondes: [],
      selectHour: '',
      selectMinute: '',
      selectSecond: '',
      minHour: 0,
      maxHour: 23,
      minMinute: 0,
      maxMinute: 59,
      minSecond: 0,
      maxSecond: 59
    }
  },
  created: function created () {
    this.hours = this.createArr(24, this.hourStep);
    this.minutes = this.createArr(60, this.minuteStep);
    this.seconds = this.createArr(60, this.secondStep);
  },
  mounted: function mounted () {
    this.initTime();
    this.generateMinTime();
    this.generateMaxTime();
  },
  watch: {
    minTime: function minTime () {
      this.generateMinTime();
    },
    maxTime: function maxTime () {
      this.generateMaxTime();
    },
    hour: function hour (newVal, oldVal) {
      if (newVal === this.selectHour || !newVal) { return }
      this.selectHour = newVal;
      this.addItemActive(this.$el.querySelector('.c-hour'), this.selectHour, this.hourStep);
    },
    minute: function minute (newVal, oldVal) {
      if (newVal === this.selectMinute || !newVal) { return }
      this.selectMinute = newVal;
      this.addItemActive(this.$el.querySelector('.c-minute'), this.selectMinute, this.minuteStep);
    },
    second: function second (newVal, oldVal) {
      if (newVal === this.selectSecond || !newVal) { return }
      this.selectSecond = newVal;
      this.addItemActive(this.$el.querySelector('.c-second'), this.selectSecond, this.secondStep);
    },
    isShown: function isShown (newVal) {
      var this$1 = this;

      if (newVal) {
        this.$nextTick(function () {
          this$1.addItemActive(this$1.$el.querySelector('.c-hour'), this$1.selectHour, this$1.hourStep);
          this$1.addItemActive(this$1.$el.querySelector('.c-minute'), this$1.selectMinute, this$1.minuteStep);
          this$1.addItemActive(this$1.$el.querySelector('.c-second'), this$1.selectSecond, this$1.secondStep);
        });
      }
    }
  },
  methods: {
    generateMinTime: function generateMinTime () {
      var assign;

      if (this.minTime) {
        (assign = this.minTime.split(':'), this.minHour = assign[0], this.minMinute = assign[1], this.minSecond = assign[2]);
      } else {
        this.minHour = 0;
        this.minMinute = 0;
        this.minSecond = 0;
      }
      console.log(this.minHour, this.minMinute, this.minSecond);
    },
    generateMaxTime: function generateMaxTime () {
      var assign;

      if (this.maxTime) {
        (assign = this.maxTime.split(':'), this.maxHour = assign[0], this.maxMinute = assign[1], this.maxSecond = assign[2]);
      } else {
        this.maxHour = 23;
        this.maxMinute = 59;
        this.maxSecond = 59;
      }
    },
    isHourDisabled: function isHourDisabled (hour) {
      return hour < this.minHour || hour > this.maxHour
    },
    isMinuteDisabled: function isMinuteDisabled (minute) {
      var isHourMinMax = this.selectHour === this.minHour || this.selectHour === this.maxHour;
      var minuteUnvalid = minute < this.minMinute || minute > this.maxMinute;
      return isHourMinMax && minuteUnvalid
    },
    isSecondDisabled: function isSecondDisabled (second) {
      var isHourMinMax = this.selectHour === this.minHour || this.selectHour === this.maxHour;
      var isMinuteMinMax = this.selectMinute === this.minMinute || this.selectMinute === this.maxMinute;
      var secondUnvalid = second < this.minSecond || second > this.maxSecond;
      return isHourMinMax && isMinuteMinMax && secondUnvalid
    },
    initTime: function initTime () {
      // defaultValue > step > now
      var hasSteps = this.secondStep > 1 || this.minuteStep > 1 || this.hourStep > 1;
      var ref = this.defaultValue ? this.defaultValue.split(':') : ['', '', ''];
      var hour = ref[0];
      var minute = ref[1];
      var second = ref[2];
      var now = hasSteps ? new Date('2018/01/01') : new Date();
      var defaultHour = hour || now.getHours();
      var defaultMinute = minute || now.getMinutes();
      var defaultSecond = second || now.getSeconds();

      this.selectHour = this.hour || defaultHour;
      this.selectMinute = this.minute || defaultMinute;
      this.selectSecond = this.second || defaultSecond;
    },
    createArr: function createArr (N, step) {
      if ( step === void 0 ) step = 1;

      var length = N / step;
      return Array.from(new Array(length), function (val, index) { return ('0' + (index * step)).slice(-2); })
    },
    removeClass: function removeClass (parentEl, className) {
      if ( className === void 0 ) className = 'active';

      var list = parentEl.children;
      for (var i = 0; i < list.length; i++) {
        list[i].className = list[i].className ? list[i].className.replace(className, '') : '';
      }
    },
    addItemActive: function addItemActive (parentEl, item, step) {
      this.removeClass(parentEl);
      var list = parentEl.children;
      var itemHeight = 28;
      var currentItem = list[parseInt(item) / step];
      currentItem.className = currentItem.className ? currentItem.className + ' active' : 'active';
      parentEl.parentElement.scrollTop = item / step * itemHeight;
    },
    emitChange: function emitChange () {
      this.$emit('change', {
        hour: this.hasHour ? this.selectHour : '',
        minute: this.hasMinute ? this.selectMinute : '',
        second: this.hasSecond ? this.selectSecond : ''
      });
    },
    itemClick: function itemClick (e, item, step) {
      var parentEl = e.target.parentElement;
      this.addItemActive(parentEl, item, step);
    },
    hourClick: function hourClick (e, item) {
      if (this.isHourDisabled(item)) { return }
      this.itemClick(e, item, this.hourStep);
      this.selectHour = item;
      this.emitChange();
    },
    minuteClick: function minuteClick (e, item) {
      if (this.isMinuteDisabled(item)) { return }
      this.itemClick(e, item, this.minuteStep);
      this.selectMinute = item;
      this.emitChange();
    },
    secondClick: function secondClick (e, item) {
      if (this.isSecondDisabled(item)) { return }
      this.itemClick(e, item, this.secondStep);
      this.selectSecond = item;
      this.emitChange();
    }
  }
};

var $2_47 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-timepicker__timerange",on:{"click":_vm.openPanel}},[_c('div',{staticClass:"c-timerange__wrapper",class:_vm.wrapperClassname},[_c('c-input',{attrs:{"placeholder":"开始时间","disabled":_vm.disabled,"readonly":_vm.readonly,"size":_vm.size},on:{"change":_vm.startInputChange},model:{value:(_vm.startTime),callback:function ($$v) {_vm.startTime=$$v;},expression:"startTime"}}),_c('span',[_vm._v("至")]),_c('c-input',{attrs:{"placeholder":"结束时间","disabled":_vm.disabled,"readonly":_vm.readonly,"size":_vm.size},on:{"change":_vm.endInputChange},model:{value:(_vm.endTime),callback:function ($$v) {_vm.endTime=$$v;},expression:"endTime"}})],1),_c('div',{staticClass:"c-timerange__panel",class:{show: _vm.isOpen}},[_c('div',{staticClass:"c-timerange__container"},[_c('div',{staticClass:"c-timepicker__wrap"},[_c('p',[_vm._v("开始时间")]),_c('c-timepanel',{attrs:{"isShown":_vm.isOpen,"hour":_vm.startHour,"minute":_vm.startMinute,"second":_vm.startSecond,"format":_vm.format,"secondStep":_vm.secondStep,"minuteStep":_vm.minuteStep,"hourStep":_vm.hourStep,"maxTime":_vm.endTime},on:{"change":_vm.startTimeChange}})],1),_c('div',{staticClass:"c-timepicker__wrap"},[_c('p',[_vm._v("结束时间")]),_c('c-timepanel',{attrs:{"isShown":_vm.isOpen,"hour":_vm.endHour,"minute":_vm.endMinute,"second":_vm.endSecond,"format":_vm.format,"minTime":_vm.startTime,"secondStep":_vm.secondStep,"minuteStep":_vm.minuteStep,"hourStep":_vm.hourStep},on:{"change":_vm.endTimeChange}})],1)]),_c('div',{staticClass:"c-timerange__btns"},[_c('c-button',{attrs:{"size":"sm","outline":"","primary":""},on:{"click":_vm.confirmRange}},[_vm._v("确定")]),_c('c-button',{attrs:{"size":"sm","outline":""},on:{"click":_vm.cancel}},[_vm._v("取消")])],1)])])},staticRenderFns: [],
  name: 'c-timerange',
  props: {
    value: Array,
    format: String,
    readonly: Boolean,
    disabled: Boolean,
    size: String,
    hourStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    secondStep: {
      type: Number,
      default: 1
    }
  },
  data: function data () {
    return {
      isOpen: false,
      startHour: '',
      startMinute: '',
      startSecond: '',
      endHour: '',
      endMinute: '',
      endSecond: '',
      timerange: '',
      startTime: '',
      endTime: ''
    }
  },
  computed: {
    wrapperClassname: function wrapperClassname () {
      return [
        ("is-size__" + (this.size)),
        this.disabled ? 'disabled' : '',
        this.readonly ? 'readonly' : ''
      ]
    }
  },
  mounted: function mounted () {
    if (typeof document === 'object') {
      this.timerange = this.$el.querySelector('.c-timerange__panel');
      document.body.appendChild(this.timerange);
      this.resize();
      window.addEventListener('resize', this.resize, false);
    }
    this.initTime();
  },
  watch: {
    value: function value (newVal) {
      this.initTime();
    },
    isOpen: function isOpen () {
      if (this.isOpen) {
        this.resize();
        window.addEventListener('mouseup', this.onBodyClick, true);
      } else {
        window.removeEventListener('mouseup', this.onBodyClick, true);
      }
    }
  },
  methods: {
    initTime: function initTime () {
      var assign, assign$1;

      if (this.value.length === 2) {
        this.startTime = this.value[0];
        this.endTime = this.value[1];
      }
      if (this.startTime) {
        (assign = this.startTime.split(':'), this.startHour = assign[0], this.startMinute = assign[1], this.startSecond = assign[2]);
      }
      if (this.endTime) {
        (assign$1 = this.endTime.split(':'), this.endHour = assign$1[0], this.endMinute = assign$1[1], this.endSecond = assign$1[2]);
      }
    },
    confirmRange: function confirmRange () {
      // 验证数据合法性
      if (this.checkValue(this.startTime) && this.checkValue(this.endTime)) {
        this.emitEvent();
        this.close();
      } else {
        this.cancel();
      }
    },
    checkValue: function checkValue (value) {
      if (!value) { return false }
      var ref = value.split(':');
      var hour = ref[0];
      var minute = ref[1];
      var second = ref[2];
      return !(second > 59 || minute > 59 || hour > 23)
    },
    cancel: function cancel () {
      this.initTime();
      this.emitEvent();
      this.close();
    },
    openPanel: function openPanel () {
      if (this.disabled) { return }
      this.isOpen = true;
    },
    close: function close () {
      this.isOpen = false;
    },
    onBodyClick: function onBodyClick (e) {
      var isInPicker = this.$el.contains(e.target);
      var isInPanel = this.timerange.contains(e.target);
      if (!isInPicker && !isInPanel) {
        this.confirmRange();
        this.$el.focus();
      }
    },
    getStyle: function getStyle () {
      return getPopupStyle(this.$parent.$refs.timepicker, this.timerange)
    },
    resize: function resize () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.timerange.style.cssText = this$1.getStyle();
      });
    },
    generateValue: function generateValue (hour, minute, second) {
      var result = [];
      hour && result.push(hour);
      minute && result.push(minute);
      second && result.push(second);
      return result.join(':')
    },
    valueRegValid: function valueRegValid (value) {
      var str = "^" + (this.format.replace(/\w/g, '\\d')) + "$";
      var reg = new RegExp(str);
      return reg.test(value)
    },
    startInputChange: function startInputChange (value) {
      var assign;

      if (this.valueRegValid(value) && this.checkValue(value)) {
        (assign = value.split(':'), this.startHour = assign[0], this.startMinute = assign[1], this.startSecond = assign[2]);
      }
    },
    endInputChange: function endInputChange (value) {
      var assign;

      if (this.valueRegValid(value) && this.checkValue(value)) {
        (assign = value.split(':'), this.endHour = assign[0], this.endMinute = assign[1], this.endSecond = assign[2]);
      }
    },
    startTimeChange: function startTimeChange (ref) {
      var hour = ref.hour;
      var minute = ref.minute;
      var second = ref.second;

      this.startHour = hour;
      this.startMinute = minute;
      this.startSecond = second;
      this.startTime = this.generateValue(hour, minute, second);
    },
    endTimeChange: function endTimeChange (ref) {
      var hour = ref.hour;
      var minute = ref.minute;
      var second = ref.second;

      this.endHour = hour;
      this.endMinute = minute;
      this.endSecond = second;
      this.endTime = this.generateValue(hour, minute, second);
    },
    emitEvent: function emitEvent () {
      this.$emit('change', [this.startTime, this.endTime]);
    }
  }
};

var $2_49 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-toolbar",class:{'is-primary': _vm.primary},style:(_vm.style)},[_vm._t("default")],2)},staticRenderFns: [],
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
};

var $2_50 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-toolbar__item",class:{'is-flex': _vm.flex}},[_vm._t("default")],2)},staticRenderFns: [],
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
};

var TreeNode = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-tree__node"},[_c('div',{staticClass:"c-tree__title",class:{ 'is-leaf': !_vm.hasChildren },on:{"click":_vm.onNodeClick}},[(_vm.hasChildren)?_c('c-icon',{attrs:{"valign":"middle","name":_vm.iconName}}):_vm._e(),(_vm.$tree.checkable)?_c('c-checkbox',{attrs:{"indeterminate":_vm.indeterminate},on:{"change":_vm.checkChange},model:{value:(_vm.checked),callback:function ($$v) {_vm.checked=$$v;},expression:"checked"}}):_vm._e(),_c('div',{staticClass:"c-tree__label"},[_c('c-node-label',{attrs:{"node":_vm.node}})],1)],1),(_vm.hasChildren)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showChildren),expression:"showChildren"}],staticClass:"c-tree_children"},_vm._l((_vm.node.children),function(child,index){return _c('c-tree-node',{key:index,ref:"children",refInFor:true,attrs:{"node":child,"level":_vm.level + 1}})}),1):_vm._e()])},staticRenderFns: [],
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
};

var $2_51 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-tree"},_vm._l((_vm.nodes),function(node,index){return _c('c-tree-node',{key:index,attrs:{"node":node,"level":1}})}),1)},staticRenderFns: [],
  name: 'c-tree',
  props: {
    nodes: VueTypes.arrayOf(Object).isRequired,
    checkable: VueTypes.bool.def(false),
    defaultExpandedKeys: VueTypes.array,
    defaultExpandAll: VueTypes.bool.def(false),
    defaultCheckedKeys: VueTypes.array,
    nodeKey: VueTypes.string.def('id')
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
};

function getError (action, xhr) {
  var msg;
  if (xhr.response) {
    msg = "" + (xhr.response.error || xhr.response);
  } else if (xhr.responseText) {
    msg = "" + (xhr.responseText);
  } else {
    msg = "fail to post " + action + " " + (xhr.status);
  }

  var err = new Error(msg);
  // err.status = xhr.status
  // err.method = 'post'
  // err.url = action
  return err
}

function getBody (xhr) {
  var text = xhr.responseText || xhr.response;
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

function upload (option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return
  }

  var xhr = new XMLHttpRequest();
  var action = option.action;

  if (xhr.upload) {
    xhr.upload.onprogress = function progress (e) {
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

  xhr.onerror = function error (e) {
    option.onError(e);
  };

  xhr.onload = function onload () {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, xhr))
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
  return xhr
}

var uploadFileCount = 0;

var $2_53 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-upload is-inline-block"},[_c('label',{staticClass:"is-inline-block",on:{"click":function($event){$event.preventDefault();return _vm.chooseFile($event)}}},[_vm._t("btn",[_c('c-button',_vm._b({attrs:{"type":"button","icon":"upload","loading":_vm.loading}},'c-button',_vm.$attrs,false),[_vm._v("上传文件")])]),_vm._t("file-list",_vm._l((_vm.filenames),function(item,index){return _c('span',{staticClass:"has-padding-left-sm"},[_vm._v(_vm._s(item))])}),{"filenames":_vm.filenames})],2),_c('input',{ref:"input",staticClass:"is-none",attrs:{"name":"file","type":"file","accept":_vm.accept,"multiple":_vm.multiple},on:{"change":_vm.handleChange}})])},staticRenderFns: [],
  name: 'c-upload',
  props: {
    limit: Number,
    defaultFileList: {
      type: Array,
      default: function default$1 () {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: function default$2 () {
        return false
      }
    },
    autoUpload: {
      type: Boolean,
      default: function default$3 () {
        return true
      }
    },
    validator: Function,
    action: String,
    accept: String,
    name: {
      type: String,
      default: function default$4 () {
        return 'file'
      }
    },
    headers: {
      type: Object,
      default: function default$5 () {
        return {}
      }
    },
    data: {
      type: Object,
      default: function default$6 () {
        return {}
      }
    },
    httpRequest: Function
  },

  data: function data () {
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
    chooseFile: function chooseFile () {
      if (this.loading) { return }
      this.$refs.input.value = null;
      this.$refs.input.click();
    },

    handleChange: function handleChange (ev) {
      var ref = ev.target;
      var files = ref.files;

      if (!files) { return }
      this.uploadFiles(files);
    },

    uploadFiles: function uploadFiles (files) {
      if (this.limit && this.defaultFileList.length + files.length > this.limit) {
        this.$emit('exceed', files, this.defaultFileList);
        return
      }

      var postFiles = Array.from(files);
      if (postFiles.length === 0) { return }
      if (!this.multiple) { postFiles = postFiles.slice(0, 1); }
      this.files = postFiles;
      this.filenames = postFiles.map(function (file) {
        return file.name
      });

      if (this.autoUpload === false) { return }
      this.submit();
    },

    submit: function submit () {
      var this$1 = this;

      this.files.forEach(function (rawFile) {
        this$1.addFid(rawFile);
        this$1.upload(rawFile);
      });
    },

    upload: function upload$$1 (rawFile) {
      if (!this.validator) { return this.post(rawFile) }
      var isValid = this.validator(rawFile);
      if (isValid) { this.post(rawFile); }
    },

    post: function post (rawFile) {
      var this$1 = this;

      this.loading = true;
      uploadFileCount++;
      var fid = rawFile.fid;
      var options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: function (e) {
          this$1.$emit('progress', e, rawFile);
        },
        onSuccess: function (res) {
          this$1.$emit('success', res, rawFile);
          delete this$1.reqs[fid];
          uploadFileCount--;
          if (uploadFileCount === 0) { this$1.loading = false; }
        },
        onError: function (err) {
          this$1.$emit('error', err, rawFile);
          delete this$1.reqs[fid];
          uploadFileCount--;
          if (uploadFileCount === 0) { this$1.loading = false; }
        }
      };
      if (this.httpRequest instanceof Function) {
        var headers = options.headers;
        var file = options.file;
        var data = options.data;
        var filename = options.filename;
        var action = options.action;
        this.reqs[fid] = this.httpRequest({
          headers: headers, file: file, data: data, filename: filename, action: action
        })
          .then(options.onSuccess)
          .catch(options.onError);
        return
      }
      var req = upload(options);
      this.reqs[fid] = req;
    },

    addFid: function addFid (rawFile) {
      if (!rawFile.fid) {
        rawFile.fid = Date.now() + this.tmpIndex++;
      }
    }
  }
};

var reqs = 
  (function() {
    var map = {
      './breadcrumb/breadcrumb-item.vue': $2_0,
'./breadcrumb/index.vue': $2_1,
'./button/index.vue': CButton,
'./button-group/index.vue': $2_3,
'./calendar/date-header.vue': DateHeader,
'./calendar/date-table.vue': DateTable,
'./calendar/index.vue': Calendar,
'./calendar/month-table.vue': MonthTable,
'./card/index.vue': $2_8,
'./cascader/index.vue': $2_9,
'./cascader/menu.vue': Menu,
'./checkbox/checkbox-group.vue': $2_11,
'./checkbox/index.vue': Checkbox,
'./chip/index.vue': $2_13,
'./color-picker/index.vue': $2_14,
'./datepicker/daterange.vue': $2_15,
'./datepicker/index.vue': $2_16,
'./form/form-item.vue': $2_17,
'./form/index.vue': $2_18,
'./grid/box-item.vue': $2_19,
'./grid/container.vue': $2_20,
'./grid/index.vue': $2_21,
'./icon/index.vue': Icon,
'./input/index.vue': Input,
'./menu/index.vue': $2_24,
'./menu/menu-item.vue': $2_25,
'./menu/submenu.vue': $2_26,
'./modal/index.vue': ModalComponent,
'./notification/index.vue': Notification,
'./pagination/index.vue': $2_29,
'./pop-confirm/index.vue': $2_30,
'./portal/index.vue': PortalComponent,
'./radio/index.vue': $2_32,
'./radio/radio-group.vue': $2_33,
'./select/index.vue': $2_34,
'./select/option.vue': $2_35,
'./slider/index.vue': $2_36,
'./steps/index.vue': $2_37,
'./steps/step.vue': $2_38,
'./switch/index.vue': $2_39,
'./table/base-table.vue': $2_40,
'./table/index.vue': $2_41,
'./tabs/index.vue': $2_42,
'./tabs/tab-bar.vue': $2_43,
'./tabs/tab-pane.vue': $2_44,
'./timepicker/index.vue': $2_45,
'./timepicker/timepanel.vue': $2_46,
'./timepicker/timerange.vue': $2_47,
'./tip/index.vue': CTip,
'./toolbar/index.vue': $2_49,
'./toolbar/toolbar-item.vue': $2_50,
'./tree/index.vue': $2_51,
'./tree/tree-node.vue': TreeNode,
'./upload/index.vue': $2_53,

    };
    var req = function req(key) {
      return map[key] || (function() { throw new Error("Cannot find module '" + key + "'.") }());
    };
    req.keys = function() {
      return Object.keys(map);
    };
    return req;
  })();
  

var Components = {
  install: function install (Vue) {
    var keys = reqs.keys();
    for (var i = 0; i < keys.length; i++) {
      var module = getModule(reqs(keys[i]));
      if (typeof module.install === 'function') {
        Vue.use(module);
      } else if (module && module.name) {
        // turn components' names to Pascal Case
        // so that we can use markups like `<CSelect />`
        // which would meet the needs of those PascalCase fans
        // TODO
        // we will turn all `name` fields in SFC into pacal case in the future
        Vue.component(pascalCase(module.name), module);
      }
    }
  }
};

function getModule (module) {
  return (module.__esModule && module.default) || module
}

var CModalAlert = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('c-modal',{attrs:{"title":_vm.title,"visible":_vm.visible,"width":"400px"},on:{"close":_vm.onCancel,"after-leave":function($event){return _vm.$emit('destroy')}}},[_c('div',[_vm._t("message")],2),_c('div',{attrs:{"slot":"footer"},slot:"footer"},[_c('c-button',{attrs:{"primary":"","autofocus":""},on:{"click":_vm.onConfirm}},[_vm._v("确定")])],1)])},staticRenderFns: [],
  components: {
    'c-modal': ModalComponent
  },
  props: {
    title: String,
    msg: {
      type: [String, Function],
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
  },
  watch: {
    msg: {
      immediate: true,
      handler: function handler () {
        var ref = this;
        var msg = ref.msg;
        var h = this.$createElement.bind(this);
        var message = typeof msg === 'function' ? msg(h) : h('span', null, msg);
        this.$slots.message = message;
      }
    }
  }
};

var CModalMessage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('c-modal',{attrs:{"width":"400px","title":_vm.title,"visible":_vm.visible},on:{"close":_vm.onCancel,"after-leave":function($event){return _vm.$emit('destroy')}}},[_c('div',{staticClass:"c-modal-message"},[_c('c-icon',{class:_vm.type,attrs:{"type":"feather","name":_vm.icon}}),_c('div',[_vm._t("message")],2)],1),_c('div',{attrs:{"slot":"footer"},slot:"footer"},[_c('c-button',{attrs:{"outline":""},on:{"click":_vm.onCancel}},[_vm._v("取消")]),_c('c-button',{attrs:{"primary":"","autofocus":""},on:{"click":_vm.onConfirm}},[_vm._v("确认")])],1)])},staticRenderFns: [],
  components: {
    'c-modal': ModalComponent
  },
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
  },
  watch: {
    msg: {
      immediate: true,
      handler: function handler () {
        var ref = this;
        var msg = ref.msg;
        var h = this.$createElement.bind(this);
        var message = typeof msg === 'function' ? msg(h) : h('span', null, msg);
        this.$slots.message = message;
      }
    }
  }
};

function install (Vue) {
  /**
   * @param {Object | String} data title and message
   */
  Vue.prototype.$alert = function (data) {
    if (typeof data === 'string') {
      data = {
        title: '提示',
        msg: data
      };
    }
    return createModal(Vue, data, CModalAlert)
  };

  /**
   * @param {Object} data title, message, type
   */
  Vue.prototype.$message = function (data) {
    return createModal(Vue, data, CModalMessage)
  }

  /**
   * shorthands for `.$message()`
   */
  ;['success', 'error', 'info', 'warning'].forEach(function (type) {
    /**
     * @param {Object | String} data title and message
     */
    Vue.prototype[("$" + type)] = function (data) {
      if (typeof data === 'string') {
        data = {
          title: '提示',
          msg: data
        };
      }

      return this.$message(Object.assign({}, {type: type}, data))
    };
  });
}

/**
 * @param {VueConstructor} Vue VueConstructor
 * @param {Object} attrs attrs for message/alert modal
 * @param {VueComponent} Component reference to message/alert component
 */
function createModal (Vue, attrs, Component) {
  var handlers = {};
  var vm = new Vue({
    components: { 'c-msg-modal': Component },
    render: function render (h) {
      return h('c-msg-modal', { attrs: attrs, on: handlers })
    },
    mounted: function mounted () {
      // remove comment element
      document.body.removeChild(this.$el);
    }
  });

  return new Promise(function (resolve, reject) {
    handlers.cancel = reject;
    handlers.confirm = resolve;
    handlers.destroy = function () { return vm.$destroy(); };

    // TODO: throw error or something
    if (typeof document !== 'undefined' && document.body) {
      var div = document.createElement('div');
      document.body.appendChild(div);
      vm.$mount(div);
    }
  })
}

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
};

var CNotification = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('c-notification',{attrs:{"visible":_vm.visible,"title":_vm.title,"message":_vm.message,"position":_vm.position,"duration":_vm.duration,"offset":_vm.offset,"dangerouslySetInnerHTML":_vm.dangerouslySetInnerHTML},on:{"close":_vm.onClose,"after-leave":_vm.afterLeave}},[_c('div',{staticClass:"c-notification__icon"},[(_vm.type)?_c('c-icon',{class:_vm.type,attrs:{"type":"feather","name":_vm.icon}}):_vm._e()],1)])},staticRenderFns: [],
  components: {
    'c-notification': Notification
  },
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
  data: function data () {
    return {
      visible: true
    }
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
    onClose: function onClose () {
      this.visible = false;
      this.$emit('close');
    },
    afterLeave: function afterLeave () {
      this.$emit('destroy');
    }
  }
};

var Notification$1 = {
  install: function install (Vue) {
    Vue.prototype.$notify = function (data) {
      return createNotification(Vue, data)
    };
  }
};

/**
 * `containers` keeps references to container
 * elements in all directions
 */
var containers = {
  topRight: null,
  bottomRight: null,
  bottomLeft: null,
  topLeft: null
};

var createNotification = function (Vue, data) {
  var pos = data.position || (data.position = 'topRight');

  if (containers[pos] === null) {
    var div = document.createElement('div');
    div.className = "c-notification c-notification-" + pos;
    containers[pos] = div;
    // TODO: check `document.body`
    document.body.appendChild(div);
  }
  var mountingNode = document.createElement('div');
  containers[pos].appendChild(mountingNode);

  var options = {
    components: {
      'notice-app': CNotification
    },
    destroyed: function destroyed () {
      var elem = this.$el;
      elem.parentNode.removeChild(elem);
    },
    render: function render (h) {
      return h('notice-app', {
        attrs: data,
        on: {
          destroy: function destroy () {
            vm.$destroy();
          },
          close: function close () {}
        }
      })
    }
  };

  var vm = new Vue(options);
  vm.$mount(mountingNode);
};

var mixins = { validatable: validatable, resettable: resettable };

var Clair = {
  mixins: mixins,
  install: function install$$1 (Vue, option) {
    if ( option === void 0 ) option = {};

    zIndex.setInitialZIndex(option.zIndex || 1992);

    var VuePrototype = Vue.prototype;
    var defineReadOnly = function (key, val) {
      Object.defineProperty(VuePrototype, key, {
        get: function get () {
          return val
        },
        configurable: "production" !== 'production',
        enumerable: false
      });
    };

    // set a noop utility
    defineReadOnly('noop', function (_) { return _; });

    // inject $clair to Vue prototype
    if (!('$clair' in VuePrototype)) {
      var $clair = new Vue({
        data: {
          responsive: null,
          defaultThrottleTime: 150
        }
      });
      $clair.mixins = mixins;
      defineReadOnly('$clair', $clair);
    }

    // expose featherIcons for convenience
    defineReadOnly('$featherIcons', featherIcons);

    // register components
    Vue.use(Components);

    // install plugins
    Vue.use(install);
    Vue.use(Responsive);
    Vue.use(Notification$1);
  },

  setInitialZIndex: function setInitialZIndex (zIndex$$1) {
    zIndex.setInitialZIndex(Number(zIndex$$1) || 1992);
  }
};

// import './styles/entry.css'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Clair);
}

// version will be replaced by semantic-release
Clair.version = '0.7.14';

export default Clair;
