(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Clair = factory());
}(this, (function () { 'use strict';

var Mod0 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-breadcrumb__item"},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-breadcrumb-item'
}

var Mod1 = {
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

var Mod2 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-button-group"},[_vm._t("default")],2)},staticRenderFns: [],
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

/**
 * DOM `contains`
 */
function contains (elem, target) {
  return elem && elem.contains ? elem.contains(target) : false
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
    type: {
      type: String,
      default: 'button'
    },
    autofocus: Boolean
  },
  toVueProps(modifiers)
);
var classNames = toClassNames(block, modifiers);

var Mod3 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.href)?_c('router-link',{staticClass:"c-button",class:_vm.classNames,attrs:{"tag":"button","to":_vm.href}},[(_vm.iconName)?_c('c-icon',{attrs:{"name":_vm.iconName,"valign":"middle"}}):_vm._e(),(_vm.$slots.default)?_c('span',[_vm._t("default")],2):_vm._e()],1):_c('button',{staticClass:"c-button",class:_vm.classNames,attrs:{"type":_vm.type},on:{"click":_vm.onClick}},[(_vm.iconName)?_c('c-icon',{attrs:{"name":_vm.iconName,"valign":"middle"}}):_vm._e(),(_vm.$slots.default)?_c('span',[_vm._t("default")],2):_vm._e()],1)},staticRenderFns: [],
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

var Mod4 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-calendar__header"},[_c('div',{staticClass:"c-calendar__prev-year",class:{disabled: !_vm.isPreYearCanSelect},on:{"click":_vm.prevYear}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevrons-left"}})],1),_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__prev-month",class:{disabled: !_vm.isPreMonthCanSelect},on:{"click":_vm.prevMonth}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevron-left"}})],1),_c('span',{staticClass:"c-calendar__year"},[_vm._v(_vm._s(this.year))]),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__spacer"},[_vm._v("-")]),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__month",on:{"click":_vm.monthtableShow}},[_vm._v(_vm._s(_vm.fixZero(this.month + 1)))]),_c('a',{directives:[{name:"show",rawName:"v-show",value:(!_vm.monthsShow),expression:"!monthsShow"}],staticClass:"c-calendar__next-month",class:{disabled: !_vm.isNextMonthCanSelect},on:{"click":_vm.nextMonth}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevron-right"}})],1),_c('a',{staticClass:"c-calendar__next-year",class:{disabled: !_vm.isNextYearCanSelect},on:{"click":_vm.nextYear}},[_c('c-icon',{attrs:{"type":"feather","valign":"text-top","name":"chevrons-right"}})],1)])},staticRenderFns: [],
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

var Mod5 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"c-calendar__day-table"},[_c('thead',[_c('tr',_vm._l((_vm.weeks),function(item){return _c('th',[_vm._v(_vm._s(item))])}))]),_c('tbody',_vm._l((_vm.dayRows),function(row,rowIndex){return _c('tr',_vm._l((row),function(item,itemIndex){return _c('td',{class:_vm.getCellCls(item),on:{"click":function($event){_vm.selectDay(item);},"mouseenter":function($event){_vm.onMouseEnter($event);}}},[_c('a',{staticClass:"day-cell",attrs:{"data-rowindex":rowIndex,"data-index":itemIndex}},[_vm._v(_vm._s(item.day))])])}))}))])},staticRenderFns: [],
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

var Mod6 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"c-calendar",class:_vm.className},[_c('c-dateheader',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.year,"month":_vm.month,"monthshow":_vm.monthsShow},on:{"monthchange":_vm.monthchange,"yearchange":_vm.yearchange,"monthshow":_vm.monthTableShow}}),_c('div',{staticClass:"c-calendar__body"},[(_vm.monthsShow)?_c('c-monthtable',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.year},on:{"change":_vm.selectMonth}}):_vm._e(),(!_vm.monthsShow)?_c('c-datetable',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.year,"month":_vm.month,"day":_vm.day},on:{"monthchange":_vm.monthchange,"yearchange":_vm.yearchange,"change":_vm.selectDay}}):_vm._e()],1)],1)},staticRenderFns: [],
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

var Mod7 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"c-calendar__month-table"},[_c('tbody',_vm._l((_vm.monthRows),function(month){return _c('tr',_vm._l((month),function(item){return _c('td',{on:{"click":function($event){_vm.selectMonth(item);}}},[_c('a',{staticClass:"month-cell",class:{'disabled': !_vm.isSelectedMonth(item)}},[_vm._v(_vm._s(_vm.mapMonth(item)))])])}))}))])},staticRenderFns: [],
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

var Mod8 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-card",class:{'is-horizontal': _vm.horizontal}},[(_vm.$slots.title)?_c('div',{staticClass:"c-card__title"},[_vm._t("title")],2):_vm._e(),(_vm.$slots.media)?_c('div',{staticClass:"c-card__media"},[_vm._t("media")],2):_vm._e(),(_vm.$slots.default)?_c('div',{staticClass:"c-card__body"},[_vm._t("default")],2):_vm._e(),(_vm.$slots.actions)?_c('div',{staticClass:"c-card__actions"},[_vm._t("actions")],2):_vm._e()])},staticRenderFns: [],
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

var Mod9 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-cascader",on:{"click":function($event){_vm.isOpen = true;}}},[_c('div',{staticClass:"cascader-context"},[_c('c-input',{attrs:{"placeholder":_vm.placeholder,"width":"normal","size":_vm.size,"disabled":_vm.disabled},model:{value:(_vm.showValue),callback:function ($$v) {_vm.showValue=$$v;},expression:"showValue"}}),_c('c-icon',{staticClass:"c-cascader__icon",attrs:{"name":"chevron-down"}})],1),_c('div',{staticClass:"cascader-dropmenu",class:_vm.className},[(_vm.isOpen)?[_c('c-cascader-menu',{attrs:{"parentMenu":_vm.parentMenu,"options":_vm.optionList,"labelKey":_vm.labelKey,"valueKey":_vm.valueKey,"childrenKey":_vm.childrenKey,"showAllLevel":_vm.showAllLevel,"changeOnSelect":_vm.changeOnSelect,"loadChildren":_vm.loadChildren}})]:_vm._e()],2)])},staticRenderFns: [],
  name: 'c-cascader',
  components: {
    'c-cascader-menu': Menu
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

var Mod11 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-checkbox-group"},[_vm._l((_vm.optionList),function(option,index){return _c('c-checkbox',{attrs:{"label":option.label,"disabled":option.disabled},on:{"change":function($event){_vm.onItemChange($event, index);}},model:{value:(_vm.isChecked[index]),callback:function ($$v) {_vm.$set(_vm.isChecked, index, $$v);},expression:"isChecked[index]"}})}),(!_vm.validity.valid)?_c('em',{staticClass:"c-error-msg"},[_vm._v(_vm._s(_vm.validity.msg))]):_vm._e()],2)},staticRenderFns: [],
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

var Mod12 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"c-checkbox",class:_vm.classNames,on:{"change":_vm.onChange}},[_c('input',{ref:"input",attrs:{"type":"checkbox","name":_vm.name,"disabled":_vm.disabled},domProps:{"checked":_vm.value}}),_c('span',{staticClass:"c-checkbox__box"}),_c('span',{staticClass:"c-checkbox__label"},[_vm._v(_vm._s(_vm.label))])])},staticRenderFns: [],
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
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

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
function isObjectLike(value) {
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
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

var lodash_isplainobject = isPlainObject;

/*!
 * Vue.js v2.5.16
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject$2 (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString$2 (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function hasOwn$1 (obj, key) {
  return hasOwnProperty$1.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached$1 (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached$1(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached$1(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached$1(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop$1 (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop$1,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn$1 = noop$1;
/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) { text = ''; }

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    var args = [], len = arguments.length;
    while ( len-- ) { args[ len ] = arguments$1[ len ]; }

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn$1(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject$2(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    return
  }
  if (!hasOwn$1(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn$1(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject$2(toVal) && isPlainObject$2(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "production" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {}
    }
  } else if (isPlainObject$2(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject$2(val)
        ? val
        : { type: val };
    }
  } else {}
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject$2(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject$2(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else {}
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject$2(value)) {
    warn$1(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn$1(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn$1(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn$1(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn$1(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn$1(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn$1(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn$1(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType$1(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType$1 (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType$1(a) === getType$1(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop$1); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached$1(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn$1(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn$1(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop$1, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

var queue = [];
var activatedChildren = [];
var has$1 = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has$1 = {};
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has$1[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has$1[id] == null) {
    has$1[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop$1,
  set: noop$1
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) { loop( key ); }
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject$2(data)) {
    data = {};
    
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (props && hasOwn$1(props, key)) {
      
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop$1,
        noop$1,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {}
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop$1;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop$1;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop$1;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop$1 : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject$2(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject$2(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn$1(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {}
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) { loop( key ); }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject$2(value)) {
      
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString$2;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn$1(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$1 (options) {
  this._init(options);
}

initMixin(Vue$1);
stateMixin(Vue$1);
eventsMixin(Vue$1);
lifecycleMixin(Vue$1);
renderMixin(Vue$1);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component' && isPlainObject$2(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn$1,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$1);

Object.defineProperty(Vue$1.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$1.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue$1, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue$1.version = '2.5.16';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {}
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = {
    value: value.trim()
  };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {}

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached$1(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached$1(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached$1(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    var mode = this.mode;

    // warn invalid mode
    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props$3 = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props$3.mode;

var TransitionGroup = {
  props: props$3,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {}
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$1.config.mustUseProp = mustUseProp;
Vue$1.config.isReservedTag = isReservedTag;
Vue$1.config.isReservedAttr = isReservedAttr;
Vue$1.config.getTagNamespace = getTagNamespace;
Vue$1.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$1.options.directives, platformDirectives);
extend(Vue$1.options.components, platformComponents);

// install platform patch function
Vue$1.prototype.__patch__ = inBrowser ? patch : noop$1;

// public mount method
Vue$1.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue$1);
      } else {}
    }
    
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached$1(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([^]*?)\s+(?:in|of)\s+([^]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached$1(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      if (!root) {
        root = element;
        
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else {}
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else {}
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {}
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        
      }
    } else {
      // literal attribute
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$2
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached$1(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  'delete': ['Backspace', 'Delete']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop$1
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop$1
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn$1;
    delete options.warn;

    /* istanbul ignore if */
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached$1(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$1.prototype.$mount;
Vue$1.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$1.compile = compileToFunctions;

var ObjProto = Object.prototype;
var toString$1 = ObjProto.toString;
var hasOwn = ObjProto.hasOwnProperty;

var FN_MATCH_REGEXP = /^\s*function (\w+)/;

// https://github.com/vuejs/vue/blob/dev/src/core/util/props.js#L177
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
  var silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

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
    silent === false && warn(namePrefix + 'value "' + value + '" should be of type "' + expectedType + '"');
    return false;
  }

  if (hasOwn.call(typeToCheck, 'validator') && isFunction(typeToCheck.validator)) {
    // swallow warn
    var oldWarn = void 0;
    if (silent) {
      oldWarn = warn;
      warn = noop;
    }

    valid = typeToCheck.validator(value);
    oldWarn && (warn = oldWarn);

    if (!valid && silent === false) { warn(namePrefix + 'custom validation failed'); }
    return valid;
  }
  return valid;
};

var warn = noop;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
        if (!valid) { warn(msg); }
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
      if (!valid) { warn('oneOfType - value type should be one of "' + typesStr + '"'); }
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
            warn('shape - object is missing "' + key + '" property');
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
    } else if (lodash_isplainobject(value)) {
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

var Mod13 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-chip__wrapper",class:_vm.classNames,style:(_vm.styleObj)},[(_vm.label)?_c('span',{staticClass:"c-chip__label"},[_vm._v(_vm._s(_vm.label))]):_vm._t("default"),(_vm.closable)?_c('span',{on:{"click":function($event){$event.stopPropagation();_vm.$emit('close');}}},[_c('c-icon',{attrs:{"name":"x","valign":"middle"}})],1):_vm._e()],2)},staticRenderFns: [],
  name: 'c-chip',
  props: {
    label: VueTypes.string,
    size: VueTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).def('md'),
    color: VueTypes.string,
    closable: VueTypes.bool.def(false)
  },
  data: function data () {
    return {
      presetColors: ['red', 'orange', 'yellow', 'green', 'eyan', 'blue', 'indigo', 'purple', 'pink', 'dark', 'black']
    }
  },
  computed: {
    classNames: function classNames () {
      var classList = "";
      if (this.color && this.presetColors.indexOf(this.color) >= 0) {
        classList += " c-chip--" + (this.color);
      }
      if (this.closable) {
        classList += ' c-chip--closable';
      }
      if (this.size) {
        classList += " c-chip--" + (this.size);
      }
      return classList
    },
    styleObj: function styleObj () {
      var style = {};
      if (this.color && this.presetColors.indexOf(this.color) < 0) {
        style = {
          'backgroundColor': this.color
        };
      }
      return style
    }
  }
}

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
function isObject$1(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$1;

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

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

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
  var isOwn = hasOwnProperty$2.call(value, symToStringTag$1),
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
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString$1;

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
function isObjectLike$1(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$1;

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
function toNumber$1(value) {
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

var toNumber_1 = toNumber$1;

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

var clamp_1$1 = clamp;

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
var arrayProto$1 = Array.prototype;

/** Built-in value references. */
var splice = arrayProto$1.splice;

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
  var this$1 = this;

  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this$1.set(entry[0], entry[1]);
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
var asyncTag = '[object AsyncFunction]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';

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
var funcProto$2 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

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
      return funcToString$2.call(func);
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
var funcProto$1 = Function.prototype;
var objectProto$4 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$4.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$5).replace(reRegExpChar, '\\$&')
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
function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue$1;

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
var Map = _getNative(_root, 'Map');

var _Map = Map;

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
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$5.hasOwnProperty;

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
  return hasOwnProperty$6.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$6.hasOwnProperty;

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
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$7.call(data, key);
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
  var this$1 = this;

  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this$1.set(entry[0], entry[1]);
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
  var this$1 = this;

  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this$1.set(entry[0], entry[1]);
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
  var this$1 = this;

  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new _MapCache;
  while (++index < length) {
    this$1.add(values[index]);
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
var COMPARE_PARTIAL_FLAG$1 = 1;
var COMPARE_UNORDERED_FLAG = 2;

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
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1,
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
var COMPARE_PARTIAL_FLAG$2 = 1;
var COMPARE_UNORDERED_FLAG$1 = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var symbolTag$1 = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined;
var symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

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
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
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
var objectProto$8 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$8.propertyIsEnumerable;

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
var argsTag$1 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag$1;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$10 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$10 = objectProto$10.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$10.propertyIsEnumerable;

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
  return isObjectLike_1(value) && hasOwnProperty$10.call(value, 'callee') &&
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
var argsTag$2 = '[object Arguments]';
var arrayTag$1 = '[object Array]';
var boolTag$1 = '[object Boolean]';
var dateTag$1 = '[object Date]';
var errorTag$1 = '[object Error]';
var funcTag$1 = '[object Function]';
var mapTag$1 = '[object Map]';
var numberTag$1 = '[object Number]';
var objectTag$2 = '[object Object]';
var regexpTag$1 = '[object RegExp]';
var setTag$1 = '[object Set]';
var stringTag$1 = '[object String]';
var weakMapTag = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]';
var dataViewTag$1 = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] =
typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] =
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
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$9.hasOwnProperty;

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
    if ((inherited || hasOwnProperty$9.call(value, key)) &&
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
var objectProto$12 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$12;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg$1(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg$1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

/** Used for built-in method references. */
var objectProto$11 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$11 = objectProto$11.hasOwnProperty;

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
    if (hasOwnProperty$11.call(object, key) && key != 'constructor') {
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
var COMPARE_PARTIAL_FLAG$3 = 1;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$7.hasOwnProperty;

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
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
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
    if (!(isPartial ? key in other : hasOwnProperty$8.call(other, key))) {
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
var Set$1 = _getNative(_root, 'Set');

var _Set$1 = Set$1;

/* Built-in method references that are verified to be native. */
var WeakMap = _getNative(_root, 'WeakMap');

var _WeakMap = WeakMap;

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]';
var objectTag$3 = '[object Object]';
var promiseTag = '[object Promise]';
var setTag$2 = '[object Set]';
var weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = _toSource(_DataView);
var mapCtorString = _toSource(_Map);
var promiseCtorString = _toSource(_Promise);
var setCtorString = _toSource(_Set$1);
var weakMapCtorString = _toSource(_WeakMap);

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
    (_Set$1 && getTag(new _Set$1) != setTag$2) ||
    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$3 ? value.constructor : undefined,
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
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';
var arrayTag = '[object Array]';
var objectTag$1 = '[object Object]';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$3.hasOwnProperty;

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
      objTag = objIsArr ? arrayTag : _getTag(object),
      othTag = othIsArr ? arrayTag : _getTag(other);

  objTag = objTag == argsTag ? objectTag$1 : objTag;
  othTag = othTag == argsTag ? objectTag$1 : othTag;

  var objIsObj = objTag == objectTag$1,
      othIsObj = othTag == objectTag$1,
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
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty$4.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$4.call(other, '__wrapped__');

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
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject$1(val) {
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

var index$1$1 = shouldUseNative() ? Object.assign : function (target, source) {
	var arguments$1 = arguments;

	var from;
	var to = toObject$1(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments$1[s]);

		for (var key in from) {
			if (hasOwnProperty$3.call(from, key)) {
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

var clamp_1 = clamp$1;

var clamp$2 = /*#__PURE__*/Object.freeze({
  default: clamp_1,
  __moduleExports: clamp_1
});

var require$$0 = ( extractComponents$1 && extractComponents_1 ) || extractComponents$1;

var require$$1 = ( clamp$2 && clamp_1 ) || clamp$2;

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

function parse$1(color) {
  for(var scheme in space2parser) {
    if(color.indexOf(scheme) === 0) {
      return space2parser[scheme](color);
    }
  }
}

parse$1.rgb = rgb$2;
parse$1.hsl = hsl$2;
parse$1.hex = hex$2;

var index$1$2 = parse$1;

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
      return toPrecision(clamp_1$1(num, 0, 1), this.precision)
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
          index$1$1(this, this.digestProp(newVal));
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
      var rgba = index$1$2(val);
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
      var shortHex = index$1$1(this.colorModel, {
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
            colorModel[type] = clamp_1$1(num, 0, 1);
            changed = true;
          }
          break

        case 'r':
        case 'g':
        case 'b':
          if (colorModel[type] !== num && !isNaN(num)) {
            colorModel[type] = clamp_1$1(num, 0, 255) | 0;
            changed = true;
          }
          break

        case 'h':
          if (colorModel[type] !== num && !isNaN(num)) {
            colorModel[type] = clamp_1$1(num, 0, 360) | 0;
            changed = true;
          }
          break

        case 's':
        case 'l':
          if (value.slice(-1) === '%' && colorModel[type] !== value) {
            num = parseFloat(value);
            colorModel[type] = (clamp_1$1(num, 0, 360) | 0) + "%";
            changed = true;
          }
          break

        case 'hex':
          if (value[0] === '#') {
            if (colorModel[type] !== value && index$1$2(value).every(function (i) { return !isNaN(i); })) {
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

        index$1$1(this, this.digestProp(literal));
      }
    }
  },

  created: function created () {
    this.handleInput = debounce_1(this.handleInput.bind(this), 50);
  }
};

function toPercent (n, precision) {
  if ( precision === void 0 ) { precision = 3; }

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
  next: function next () {
    return start++
  }
}

var sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
var sizeMap = {
  'xs': 12,
  'sm': 18,
  'md': 24,
  'lg': 28,
  'xl': 36
};

var Mod14 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.inline)?_c('color-picker',{attrs:{"color":_vm.value},on:{"change":_vm.handleChange}}):_c('div',{staticClass:"color-picker__wrapper"},[_c('c-portal',[_c('transition',{on:{"before-enter":_vm.beforeEnter,"enter":_vm.enter,"after-enter":_vm.afterEnter,"leave":_vm.leave,"after-leave":_vm.afterLeave}},[_c('color-picker',{directives:[{name:"show",rawName:"v-show",value:(_vm.panelVisible),expression:"panelVisible"}],ref:"panel",staticClass:"color-picker__pane--portal",attrs:{"color":_vm.value},on:{"change":_vm.handleChange}})],1)],1),_c('div',{ref:"trigger",staticClass:"color-picker__trigger",style:(_vm.triggerStyle),on:{"click":_vm.showColorPane}})],1)},staticRenderFns: [],
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
    'color-picker': VColorComponent
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

var Mod15 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"c-datepicker__range",class:_vm.className},[_c('div',{staticClass:"c-datepicker__content c-calendar"},[_c('c-dateheader',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.startMaxDate,"year":_vm.startYear,"month":_vm.startMonth,"monthshow":_vm.startMonthsShow},on:{"monthchange":_vm.startMonthChange,"yearchange":_vm.startYearChange,"monthshow":_vm.startMonthTableShow}}),_c('div',{staticClass:"c-calendar__body"},[(_vm.startMonthsShow)?_c('c-monthtable',{attrs:{"minDate":_vm.minDate,"maxDate":_vm.startMaxDate,"year":_vm.startYear},on:{"change":_vm.startSelectMonth}}):_vm._e(),(!_vm.startMonthsShow)?_c('c-datetable',{attrs:{"type":"range","minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.startYear,"month":_vm.startMonth,"day":_vm.startDay,"start":_vm.start,"end":_vm.end,"range-obj":_vm.rangeObj},on:{"monthchange":_vm.startMonthChange,"yearchange":_vm.startYearChange,"change":_vm.selectDay,"rangeChange":_vm.onRangeChange}}):_vm._e()],1)],1),_c('div',{staticClass:"c-datepicker__content c-calendar"},[_c('c-dateheader',{attrs:{"minDate":_vm.endMinDate,"maxDate":_vm.maxDate,"year":_vm.endYear,"month":_vm.endMonth,"monthshow":_vm.endMonthsShow},on:{"monthchange":_vm.endMonthChange,"yearchange":_vm.endYearChange,"monthshow":_vm.endMonthTableShow}}),_c('div',{staticClass:"c-calendar__body"},[(_vm.endMonthsShow)?_c('c-monthtable',{attrs:{"minDate":_vm.endMinDate,"maxDate":_vm.maxDate,"year":_vm.endYear},on:{"change":_vm.endSelectMonth}}):_vm._e(),(!_vm.endMonthsShow)?_c('c-datetable',{attrs:{"type":"range","minDate":_vm.minDate,"maxDate":_vm.maxDate,"year":_vm.endYear,"month":_vm.endMonth,"day":_vm.endDay,"start":_vm.start,"end":_vm.end,"range-obj":_vm.rangeObj},on:{"monthchange":_vm.endMonthChange,"yearchange":_vm.endYearChange,"change":_vm.selectDay,"rangeChange":_vm.onRangeChange}}):_vm._e()],1)],1),_c('p',{staticClass:"c-datepicker__text"},[_vm._v(_vm._s(_vm.start)+" 至 "+_vm._s(_vm.end))]),_c('div',{staticClass:"c-datepicker__btns"},[_c('c-button',{attrs:{"size":"sm","outline":"","primary":""},on:{"click":_vm.confirmRange}},[_vm._v("确定")]),_c('c-button',{attrs:{"size":"sm","outline":""},on:{"click":_vm.cancel}},[_vm._v("取消")])],1)])},staticRenderFns: [],
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

var Mod16 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-datepicker",on:{"click":_vm.open}},[_c('c-icon',{staticClass:"c-datepicker__icon",attrs:{"name":"calendar"}}),(_vm.type == 'daterange')?_c('c-input',{attrs:{"placeholder":_vm.placeholder,"disabled":_vm.disabled,"width":"normal","size":_vm.size},on:{"change":_vm.dateChange},nativeOn:{"focusin":function($event){return _vm.open($event)},"focusout":function($event){return _vm.onBlur($event)}},model:{value:(_vm.daterange),callback:function ($$v) {_vm.daterange=$$v;},expression:"daterange"}}):(_vm.type == 'date')?_c('c-input',{attrs:{"size":_vm.size,"width":"normal","placeholder":_vm.placeholder,"disabled":_vm.disabled},on:{"change":_vm.dateChange},nativeOn:{"focusin":function($event){return _vm.open($event)},"focusout":function($event){return _vm.onBlur($event)}},model:{value:(_vm.date),callback:function ($$v) {_vm.date=$$v;},expression:"date"}}):_vm._e(),_c('div',{staticClass:"c-datepicker__panel"},[(_vm.type == 'date')?_c('c-calendar',{ref:"calendar",attrs:{"value":_vm.date,"show":_vm.isOpen,"size":_vm.size,"minDate":_vm.minDate,"maxDate":_vm.maxDate},on:{"update":_vm.setDate}}):_vm._e(),(_vm.type == 'daterange')?_c('div',{staticClass:"c-datepicker__body"},[_c('c-daterange',{attrs:{"value":_vm.date,"size":_vm.size,"show":_vm.isOpen},on:{"change":_vm.setDateRange}})],1):_vm._e()],1)],1)},staticRenderFns: [],
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

var Mod17 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-form-item",class:_vm.classNames},[(_vm.label || _vm.$slots.label)?_c('label',{staticClass:"c-form-item__label",style:(_vm.labelStyle)},[_vm._t("label",[_vm._v(_vm._s(_vm.label))])],2):_vm._e(),_c('div',{staticClass:"c-form-item__control",class:{ 'has-error': _vm.hasError }},[_vm._t("default"),_c('div',{staticClass:"c-form-item__error"},[_vm._v(_vm._s(_vm.errorMsg))])],2)])},staticRenderFns: [],
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

var Mod18 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{staticClass:"c-form",class:_vm.classNames,on:{"submit":_vm.onSubmit}},[_vm._t("default")],2)},staticRenderFns: [],
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

var props$4 = breakpoints
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

var Mod19 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-box__item",class:_vm.classNames,style:(_vm.style)},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'c-box-item',
  props: props$4,
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

var Mod20 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-container",class:_vm.classNames},[_vm._t("default")],2)},staticRenderFns: [],
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

var Mod21 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-box",class:_vm.classNames,style:(_vm.style)},[_vm._t("default")],2)},staticRenderFns: [],
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
  name: "archive",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-archive",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"21 8 21 21 3 21 3 8"}}),_c('rect',{attrs:{"x":"1","y":"3","width":"22","height":"5"}}),_c('line',{attrs:{"x1":"10","y1":"12","x2":"14","y2":"12"}})])},
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
  name: "gift",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-gift",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('polyline',{attrs:{"points":"20 12 20 22 4 22 4 12"}}),_c('rect',{attrs:{"x":"2","y":"7","width":"20","height":"5"}}),_c('line',{attrs:{"x1":"12","y1":"22","x2":"12","y2":"7"}}),_c('path',{attrs:{"d":"M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"}}),_c('path',{attrs:{"d":"M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"}})])},
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
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-help-circle",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('circle',{attrs:{"cx":"12","cy":"12","r":"10"}}),_c('path',{attrs:{"d":"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}}),_c('line',{attrs:{"x1":"12","y1":"17","x2":"12","y2":"17"}})])},
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
  name: "youtube",
  render: function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"feather feather-youtube",attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[_c('path',{attrs:{"d":"M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"}}),_c('polygon',{attrs:{"points":"9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"}})])},
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

var Mod22 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.ligature)?_c('i',{class:_vm.iconType,style:({ color: _vm.iconColor, fontSize: _vm.size, verticalAlign: _vm.valign })},[_vm._v(_vm._s(_vm.name))]):(_vm.isSvg)?_c('span',{staticClass:"c-icon"},[_c(_vm.svgName,{tag:"component",style:({verticalAlign: _vm.valign}),attrs:{"width":_vm.size,"height":_vm.size,"stroke":_vm.iconColor}})],1):_c('i',{staticClass:"c-icon",class:_vm.classNames,style:({ color: _vm.iconColor, fontSize: _vm.size, verticalAlign: _vm.valign })})},staticRenderFns: [],
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
var Mod23 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-input-wrap",class:_vm.className},[_vm._t("prepend"),((_vm.type)==='checkbox'&&(!_vm.multiLine))?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"nativeInput",staticClass:"c-input",attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.inputValue)?_vm._i(_vm.inputValue,null)>-1:(_vm.inputValue)},on:{"input":_vm.onChange,"change":[function($event){var $$a=_vm.inputValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.inputValue=$$a.concat([$$v]));}else{$$i>-1&&(_vm.inputValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.inputValue=$$c;}},_vm.onChange],"blur":_vm.onBlur}}):((_vm.type)==='radio'&&(!_vm.multiLine))?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"nativeInput",staticClass:"c-input",attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"type":"radio"},domProps:{"checked":_vm._q(_vm.inputValue,null)},on:{"input":_vm.onChange,"change":[function($event){_vm.inputValue=null;},_vm.onChange],"blur":_vm.onBlur}}):(!_vm.multiLine)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"nativeInput",staticClass:"c-input",attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"type":_vm.type},domProps:{"value":(_vm.inputValue)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.inputValue=$event.target.value;},_vm.onChange],"change":_vm.onChange,"blur":_vm.onBlur}}):_vm._e(),(_vm.multiLine)?_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputValue),expression:"inputValue"}],ref:"textArea",staticClass:"c-input",style:(_vm.textAreaStyle),attrs:{"name":_vm.name,"placeholder":_vm.placeholder,"readonly":_vm.readonly,"disabled":_vm.disabled,"maxlength":_vm.maxlength,"rows":_vm.rows,"cols":_vm.cols,"wrap":_vm.wrap},domProps:{"value":(_vm.inputValue)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.inputValue=$event.target.value;},_vm.onChange],"change":_vm.onChange}}):_vm._e(),_vm._t("append"),(!_vm.validity.valid)?_c('em',{staticClass:"c-error-msg"},[_vm._v(_vm._s(_vm.validity.msg))]):_vm._e()],2)},staticRenderFns: [],
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
      this.$emit('change', e.target.value);
      this.resizeTextArea();
    },

    onBlur: function onBlur () {
      this.$emit('blur');
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
    this.resizeTextArea = throttle_1(
      this.resizeTextArea.bind(this), defaultThrottleTime);
  }
}

var Mod24 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-menu",class:_vm.classNames,style:(_vm.styles)},[_vm._t("default")],2)},staticRenderFns: [],
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

var Mod25 = {
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

var Mod26 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-submenu",class:{'is-open': _vm.isOpen}},[_c('div',{staticClass:"c-submenu__title c-menu__item",on:{"click":_vm.toggleSubmenu,"mouseenter":_vm.enterSubMenu,"mouseleave":_vm.leaveSubMenu}},[_vm._t("title",[_vm._v(_vm._s(_vm.title))])],2),_c('div',{staticClass:"c-submenu__popup",on:{"mouseenter":_vm.enterPopup,"mouseleave":_vm.leavePopup,"focusin":_vm.focusIn,"focusout":_vm.focusOut,"!click":function($event){return _vm.clickSubMenu($event)}}},[_vm._t("default")],2)])},staticRenderFns: [],
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
}

var uid$1$1 = 0;
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

var Mod27 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('c-portal',{attrs:{"aria-hidden":'' + !_vm.visible}},[_c('transition',{attrs:{"appear":"","name":"modal","mode":"out-in"},on:{"before-enter":_vm.beforeEnter,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],ref:"dom",staticClass:"c-modal",style:({ zIndex: _vm.zIndex }),on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.maskClosable ? _vm.$emit('close') : _vm.noop();}}},[_c('div',{staticClass:"c-modal__wrapper",style:(_vm.styleObj)},[_c('div',{staticClass:"c-modal__header"},[(_vm.closable)?_c('c-button',{staticClass:"c-modal__close",attrs:{"icon":"x","flat":""},on:{"click":function($event){_vm.$emit('close');}}}):_vm._e(),_vm._t("header",[_c('div',[_vm._v(_vm._s(_vm.title))])])],2),_c('div',{staticClass:"c-modal__body"},[_vm._t("default",[_c('div')])],2),_c('div',{staticClass:"c-modal__footer"},[_vm._t("footer",[_c('c-button',{attrs:{"outline":""},on:{"click":function($event){_vm.$emit('cancel');}}},[_vm._v("取消")]),_c('c-button',{attrs:{"primary":""},on:{"click":function($event){_vm.$emit('confirm');}}},[_vm._v("确认")])])],2)])])])],1)},staticRenderFns: [],
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
      uid: uid$1$1++,
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
    },

    afterLeave: function afterLeave () {
      overflowController.reset(this.uid);

      // why?
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
}

var Mod28 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"appear":"","name":"notification","mode":"out-in","type":"transition"},on:{"before-enter":_vm.beforeEnter,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"c-notice__wrapper",style:(_vm.classObj),on:{"mouseenter":_vm.clearTimer,"mouseleave":_vm.startTimer}},[_vm._t("default"),_c('div',[_c('div',{staticClass:"c-notice__header"},[(_vm.closable)?_c('c-button',{staticClass:"c-notice__close",attrs:{"icon":"x","flat":""},on:{"click":function($event){$event.stopPropagation();_vm.$emit('close');}}}):_vm._e(),_c('span',[_vm._v(_vm._s(_vm.title))])],1),_c('div',{staticClass:"c-notice__body"},[(_vm.dangerouslySetInnerHTML)?_c('div',{domProps:{"innerHTML":_vm._s(_vm.message)}}):_c('div',[_vm._v(_vm._s(_vm.message))])])])],2)])},staticRenderFns: [],
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
        transform: ("translateX(" + (this.position === 'topRight' || this.position === 'bottomRight' ? -this.offset : this.offset) + "px)")}
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
}

var Mod29 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-pagination"},[_c('span',{staticClass:"c-pagination__total"},[_vm._t("total",[_vm._v("共"),_c('em',[_vm._v(_vm._s(_vm.total))]),_vm._v("条")])],2),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.pageCount > 1),expression:"pageCount > 1"}],staticClass:"c-pagination__pages"},[_c('a',{staticClass:"c-pagination_prev",class:{'is-disabled': _vm.pageNumber == 1},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(_vm.pageNumber - 1);}}},[_vm._t("prev",[_c('c-icon',{attrs:{"name":"chevron-left","valign":"middle"}})])],2),_c('a',{staticClass:"c-pagination__page",class:{'is-active': _vm.pageNumber == 1},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(1);}}},[_vm._v("1")]),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.spanRange[0] > 2),expression:"spanRange[0] > 2"}],staticClass:"c-pagination__ellipsis"},[_vm._v("⋯")]),_vm._l((_vm.spanRange),function(n){return _c('a',{staticClass:"c-pagination__page",class:{'is-active': n == _vm.pageNumber},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(n);}}},[_vm._v(_vm._s(n))])}),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.showEndEllipse),expression:"showEndEllipse"}],staticClass:"c-pagination__ellipsis"},[_vm._v("⋯")]),_c('a',{staticClass:"c-pagination__page",class:{'is-active': _vm.pageNumber == _vm.pageCount},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(_vm.pageCount);}}},[_vm._v(_vm._s(_vm.pageCount))]),_c('a',{staticClass:"c-pagination_prev",class:{'is-disabled': _vm.pageNumber == _vm.pageCount},attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.goPage(_vm.pageNumber + 1);}}},[_c('c-icon',{attrs:{"name":"chevron-right","valign":"middle"}})],1)],2)])},staticRenderFns: [],
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
      var pn = Number.parseInt(this$1.pn) || 1;
      var exceedMax = pn > this$1.pageNumber;
      if (exceedMax) {
        this$1.pageNumber = this$1.pageCount;
        this$1.$emit('change', this$1.pageNumber);
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
}

var Mod30 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:_vm.classNames,on:{"change":_vm.onChange}},[_c('input',{attrs:{"type":"radio","name":_vm.name,"disabled":_vm.disabled},domProps:{"value":_vm.value,"checked":_vm.value == _vm.checkedIndex}}),_c('span',{staticClass:"c-radio__box"}),_c('span',{staticClass:"c-radio__label"},[_vm._v(_vm._s(_vm.label))])])},staticRenderFns: [],
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

var Mod31 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-radio-group",class:_vm.classNames},_vm._l((_vm.options),function(option,index){return _c('c-radio',{attrs:{"name":_vm.name,"value":index,"button":_vm.button,"label":option.label,"disabled":option.disabled},model:{value:(_vm.checkedIndex),callback:function ($$v) {_vm.checkedIndex=$$v;},expression:"checkedIndex"}})}))},staticRenderFns: [],
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

var Mod32 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-select",class:_vm.classNames,attrs:{"role":"combobox","aria-autocomplete":"list","aria-haspopup":"true","aria-expanded":_vm.isOpen,"aria-disabled":"disabled","tabindex":_vm.disabled ? -1 : 0},on:{"keydown":_vm.onKeyDown,"click":_vm.toggleOpen}},[_c('i',{staticClass:"c-select__caret"}),_c('div',{staticClass:"c-select__selection"},[(_vm.showPlaceholder)?_c('div',{staticClass:"c-select__placeholder"},[_vm._v(_vm._s(_vm.placeholder))]):_vm._e(),(!_vm.multiple && _vm.selectedOptions.length)?_c('div',{staticClass:"c-select__value"},[_vm._v(_vm._s(_vm.selectedOptions[0].label))]):_vm._e(),_vm._l((_vm.selectedOptions),function(option){return (_vm.multiple)?_c('div',{staticClass:"c-chip",class:{ 'is-disabled': option.disabled }},[_vm._t("selection",[_c('span',[_vm._v(_vm._s(option.label))])],{option:option}),_c('div',{staticClass:"c-chip__close",on:{"click":function($event){$event.stopPropagation();_vm.unselectOption(option);}}},[_c('c-icon',{attrs:{"name":"x","valign":"middle"}})],1)],2):_vm._e()}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showInput),expression:"showInput"}],staticClass:"c-select__input",class:_vm.multiple ? 'is-multiple' : 'is-single'},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.query),expression:"query"}],attrs:{"autocomplete":"off"},domProps:{"value":(_vm.query)},on:{"click":function($event){$event.stopPropagation();},"blur":function($event){_vm.$el.focus();},"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete"])){ return null; }return _vm.onDeleteKey($event)},"input":[function($event){if($event.target.composing){ return; }_vm.query=$event.target.value;},_vm.onSearchInput]}})])],2),_c('c-portal',{attrs:{"aria-hidden":'' + !_vm.isOpen}},[_c('transition',{attrs:{"name":"fade-in-down"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen),expression:"isOpen"}],ref:"menu",staticClass:"c-select__menu",class:_vm.size ? 'is-'+_vm.size : '',style:(_vm.menuStyle),attrs:{"role":"menu","aria-activedescendant":""}},[(_vm.autocomplete && !_vm.filteredOptions.length)?_vm._t("no-match",[_c('div',{staticClass:"c-select__empty"},[_vm._v("无匹配选项")])]):_vm._e(),_vm._l((_vm.filteredOptions),function(option,index){return _c('c-option',{ref:"$options",refInFor:true,attrs:{"label":option.label,"isActive":_vm.activeOption == option,"isSelected":_vm.selectedOptions.indexOf(option) > -1,"disabled":option.disabled,"option":option}},[_vm._t("menu-item",null,{label:option.label,isActive:_vm.activeOption == option,isSelected:_vm.selectedOptions.indexOf(option) > -1,disabled:option.disabled,index:index,option:option})],2)})],2)])],1)],1)},staticRenderFns: [],
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

var Mod33 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-select__option",class:_vm.classNames,attrs:{"role":"menuitem","aria-selected":"isSelected"},on:{"mouseenter":_vm.activate,"mouseleave":_vm.deactivate,"mousedown":function($event){$event.preventDefault();},"click":_vm.onClick}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)},staticRenderFns: [],
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
      return toPrecision$1(clamp_1$1(num, 0, 1), this.precision)
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

var index$3 = { VueCtrlComponent: VueCtrlComponent$1 };

var defaultHoverTimeout = 200;

var Mod34 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-ctrl',{staticClass:"c-slider",attrs:{"direction":_vm.vertical ? 'v' : 'h'},on:{"change":_vm.onRangeChange}},[_c('div',{staticClass:"c-slider",class:_vm.className,style:(_vm.height ? { height: _vm.height } : null),on:{"mousedown":_vm.onMousedown}},[_c('input',{attrs:{"type":"range","min":_vm.min,"max":_vm.max,"step":_vm.step,"disabled":_vm.disabled},domProps:{"value":_vm.nominal}}),_c('div',{staticClass:"c-slider__progress",style:(_vm.progressPos)}),_c('ul',{staticClass:"c-slider__marks"},_vm._l((_vm.normalizedMarks),function(mark){return _c('li',{style:(((_vm.vertical ? 'bottom' : 'left') + ": " + (mark.p)))},[_vm._v(_vm._s(mark.n))])})),_c('div',{staticClass:"c-slider__stops"},_vm._l((_vm.normalizedMarks),function(mark){return _c('span',{style:(((_vm.vertical ? 'bottom' : 'left') + ": " + (mark.p)))})})),_c('div',{staticClass:"c-slider__thumb",class:{ 'c-slider__thumb--hover': !_vm.isDrag && _vm.isHover, 'c-slider__thumb--dragging': _vm.isDrag },style:(_vm.thumbPos),on:{"mouseenter":_vm.onThumbHover,"mouseleave":_vm.onThumbHoverout}},[_c('div',{staticClass:"c-slider__tip",attrs:{"role":"tooltip","aria-hidden":"true"}},[_vm._v(_vm._s(_vm.formmater(this.nominal, 'tip')))])])])])},staticRenderFns: [],
  name: 'c-slider',
  components: {
    'v-ctrl': index$3.VueCtrlComponent
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
        var mark = clamp_1$1(mk, min, max);

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
      return clamp_1$1(decimal, 0, 1)
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

        if (val !== clamp_1$1(val, min, max)) {
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

var _defineProperty = defineProperty;

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
  if (key == '__proto__' && _defineProperty) {
    _defineProperty(object, key, {
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

/** Built-in value references. */
var getPrototype$1 = _overArg(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype$1;

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
var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined;
var symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : undefined;

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
var boolTag$3 = '[object Boolean]';
var dateTag$3 = '[object Date]';
var mapTag$4 = '[object Map]';
var numberTag$3 = '[object Number]';
var regexpTag$3 = '[object RegExp]';
var setTag$4 = '[object Set]';
var stringTag$3 = '[object String]';
var symbolTag$3 = '[object Symbol]';

var arrayBufferTag$3 = '[object ArrayBuffer]';
var dataViewTag$4 = '[object DataView]';
var float32Tag$2 = '[object Float32Array]';
var float64Tag$2 = '[object Float64Array]';
var int8Tag$2 = '[object Int8Array]';
var int16Tag$2 = '[object Int16Array]';
var int32Tag$2 = '[object Int32Array]';
var uint8Tag$2 = '[object Uint8Array]';
var uint8ClampedTag$2 = '[object Uint8ClampedArray]';
var uint16Tag$2 = '[object Uint16Array]';
var uint32Tag$2 = '[object Uint32Array]';

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
    case arrayBufferTag$3:
      return _cloneArrayBuffer(object);

    case boolTag$3:
    case dateTag$3:
      return new Ctor(+object);

    case dataViewTag$4:
      return _cloneDataView(object, isDeep);

    case float32Tag$2: case float64Tag$2:
    case int8Tag$2: case int16Tag$2: case int32Tag$2:
    case uint8Tag$2: case uint8ClampedTag$2: case uint16Tag$2: case uint32Tag$2:
      return _cloneTypedArray(object, isDeep);

    case mapTag$4:
      return new Ctor;

    case numberTag$3:
    case stringTag$3:
      return new Ctor(object);

    case regexpTag$3:
      return _cloneRegExp(object);

    case setTag$4:
      return new Ctor;

    case symbolTag$3:
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
var mapTag$5 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike_1(value) && _getTag(value) == mapTag$5;
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
var setTag$5 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike_1(value) && _getTag(value) == setTag$5;
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
var CLONE_DEEP_FLAG$1 = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG$1 = 4;

/** `Object#toString` result references. */
var argsTag$3 = '[object Arguments]';
var arrayTag$2 = '[object Array]';
var boolTag$2 = '[object Boolean]';
var dateTag$2 = '[object Date]';
var errorTag$2 = '[object Error]';
var funcTag$2 = '[object Function]';
var genTag$1 = '[object GeneratorFunction]';
var mapTag$3 = '[object Map]';
var numberTag$2 = '[object Number]';
var objectTag$4 = '[object Object]';
var regexpTag$2 = '[object RegExp]';
var setTag$3 = '[object Set]';
var stringTag$2 = '[object String]';
var symbolTag$2 = '[object Symbol]';
var weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$2 = '[object ArrayBuffer]';
var dataViewTag$3 = '[object DataView]';
var float32Tag$1 = '[object Float32Array]';
var float64Tag$1 = '[object Float64Array]';
var int8Tag$1 = '[object Int8Array]';
var int16Tag$1 = '[object Int16Array]';
var int32Tag$1 = '[object Int32Array]';
var uint8Tag$1 = '[object Uint8Array]';
var uint8ClampedTag$1 = '[object Uint8ClampedArray]';
var uint16Tag$1 = '[object Uint16Array]';
var uint32Tag$1 = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag$3] = cloneableTags[arrayTag$2] =
cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] =
cloneableTags[boolTag$2] = cloneableTags[dateTag$2] =
cloneableTags[float32Tag$1] = cloneableTags[float64Tag$1] =
cloneableTags[int8Tag$1] = cloneableTags[int16Tag$1] =
cloneableTags[int32Tag$1] = cloneableTags[mapTag$3] =
cloneableTags[numberTag$2] = cloneableTags[objectTag$4] =
cloneableTags[regexpTag$2] = cloneableTags[setTag$3] =
cloneableTags[stringTag$2] = cloneableTags[symbolTag$2] =
cloneableTags[uint8Tag$1] = cloneableTags[uint8ClampedTag$1] =
cloneableTags[uint16Tag$1] = cloneableTags[uint32Tag$1] = true;
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
      isDeep = bitmask & CLONE_DEEP_FLAG$1,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

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
var CLONE_DEEP_FLAG = 1;
var CLONE_SYMBOLS_FLAG = 4;

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
  return _baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

var cloneDeep_1 = cloneDeep;

var Mod35 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',[(!_vm.onlybody)?_c('thead',_vm._l((_vm.columnsRows),function(column){return _c('tr',_vm._l((column.columns),function(item){return _c('th',{class:_vm.getColumnClassName(item),style:(_vm.getTHCellStyle(item)),attrs:{"colspan":item.colspan,"rowspan":item.rowspan}},[(item.type === 'selection')?_c('span',{staticClass:"c-table__check"},[_c('c-checkbox',{attrs:{"indeterminate":_vm.checkIndeterminate},on:{"change":_vm.onSelectAllChange},model:{value:(_vm.allSelect),callback:function ($$v) {_vm.allSelect=$$v;},expression:"allSelect"}})],1):_vm._e(),_vm._t(item.key + '-base-th',[_c('span',[_vm._v(_vm._s(item.title))])]),(item.sorter)?_c('span',{staticClass:"c-table__sort"},[_c('div',{staticClass:"c-sort-asc",class:{'sorted': _vm.checkSorted(item.key, 'asc')},on:{"click":function($event){_vm.onSorted(item.key, 'asc');}}},[_c('i',{staticClass:"sort-asc"})]),_c('div',{staticClass:"c-sort-desc",class:{'sorted': _vm.checkSorted(item.key, 'desc')},on:{"click":function($event){_vm.onSorted(item.key, 'desc');}}},[_c('i',{staticClass:"sort-desc"})])]):_vm._e()],2)}))})):_vm._e(),(!_vm.onlyhead)?_c('tbody',[(_vm.dataList.length == 0)?_c('tr',[_c('td',{staticClass:"c-table__noresult",attrs:{"colspan":_vm.columns.length}},[_vm._v(_vm._s(_vm.noresultMsg))])]):_vm._l((_vm.dataList),function(dataItem,index){return _c('tr',{class:_vm.getRowClassName(_vm.item, index),on:{"mouseenter":function($event){_vm.setCurrentItem(dataItem, index);},"mouseleave":_vm.resetCurrentItem}},_vm._l((_vm.allColumns),function(columnsItem){return _c('td',{class:_vm.getColumnClassName(columnsItem),style:(_vm.getCellStyle(columnsItem))},[_vm._t(columnsItem.key + '-base-td',[(columnsItem.type === 'selection')?_c('span',{staticClass:"c-table__check"},[_c('c-checkbox',{attrs:{"disabled":dataItem._disabled},on:{"change":_vm.onSelectChange},model:{value:(!dataItem._disabled && dataItem._checked),callback:function ($$v) {_vm.$set(!dataItem._disabled && dataItem, "_checked", $$v);},expression:"!dataItem._disabled && dataItem._checked"}})],1):_vm._e(),(columnsItem.render)?_c('div',{domProps:{"innerHTML":_vm._s(columnsItem.render(index, dataItem[columnsItem.key], dataItem))}}):_c('span',[_vm._v(_vm._s(dataItem[columnsItem.key]))])],{item:dataItem})],2)}))})],2):_vm._e()])},staticRenderFns: [],
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

  data: function data () {
    return {
      currentItem: {},
      columnsRows: [],
      allSelect: false,
      checkIndeterminate: false
    }
  },

  computed: {
    dataList: function dataList () {
      return this.datasource
    },
    allColumns: function allColumns () {
      var columns = cloneDeep_1(this.columns);
      return this.getAllColumns(columns)
    }
  },

  created: function created () {
    this.allSelect = this.allChecked;
    this.checkIndeterminate = this.indeterminate;
  },

  mounted: function mounted () {
    this.getTHWidth(this.columns);
    var maxlevel = this.findMaxLevel(this.columns);
    this.columnsRows = this.getLevelColumns(this.columns, maxlevel);
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
    },
    columns: function columns () {
      this.getTHWidth(this.columns);
      var maxlevel = this.findMaxLevel(this.columns);
      this.columnsRows = this.getLevelColumns(this.columns, maxlevel);
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
}

/* global window */
var Mod36 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.className},[(_vm.hasFixed)?_c('div',{staticClass:"c-table",class:_vm.withBorderClass},[(_vm.height)?[_c('div',{staticClass:"c-table__wrapper"},[_c('div',{staticClass:"c-table__headwrapper"},[_c('div',{staticClass:"c-scroll__thead",on:{"scroll":_vm.theadScroll}},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1)]),_c('div',{staticClass:"c-table__bodywrapper"},[_c('div',{ref:_vm.scrollbody,staticClass:"c-scroll__tbody",on:{"mouseenter":_vm.setCurrentScrollBox,"mouseleave":_vm.removeCurrentScrollBox}},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1)]),_c('div',{staticClass:"c-fixtable__left",class:{'c-fixed__leftscroll': _vm.isScrollMove},on:{"mouseenter":_vm.setCurrentScrollBox,"mouseleave":_vm.removeCurrentScrollBox}},[(_vm.datasource.length > 0)?[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1),(!undefined)?_c('div',{ref:"fixedleft",staticClass:"c-table__body",on:{"scroll":_vm.onYscroll}},[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1):_vm._e()]:[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1),_vm._e()]],2),_c('div',{staticClass:"c-fixtable__right",class:{'c-fixed__rightscroll': _vm.isScrollMove},on:{"mouseenter":_vm.setCurrentScrollBox,"mouseleave":_vm.removeCurrentScrollBox}},[(_vm.datasource.length > 0)?[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1),(!undefined)?_c('div',{ref:"fixedright",staticClass:"c-table__body",on:{"scroll":_vm.onYscroll}},[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1):_vm._e()]:[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1),_vm._e()]],2)])]:[(_vm.fixedLeftColumns.length > 0)?_c('div',{staticClass:"c-fixtable__left",class:{'c-fixed__leftscroll': _vm.isScrollMove}},[(_vm.datasource.length > 0)?[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]:[_c('c-basetable',{attrs:{"columns":_vm.fixedLeftColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedLeftColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]],2):_vm._e(),_c('div',{staticClass:"c-scrolltable",on:{"scroll":_vm.onScroll}},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1),(_vm.fixedRightColumns.length > 0)?_c('div',{staticClass:"c-fixtable__right",class:{'c-fixed__rightscroll': _vm.isScrollMove}},[(_vm.datasource.length > 0)?[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]:[_c('c-basetable',{attrs:{"columns":_vm.fixedRightColumns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.fixedRightColumns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]],2):_vm._e()]],2):_c('div',{staticClass:"c-table",class:_vm.withBorderClass},[(_vm.height)?[_c('div',{staticClass:"c-scroll__thead"},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":false,"onlyhead":true,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1),(!undefined)?_c('div',{ref:"scrollBody",staticClass:"c-table__body",on:{"scroll":_vm.onScroll}},[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"onlybody":true,"onlyhead":false,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})],1):_vm._e()]:[_c('c-basetable',{attrs:{"columns":_vm.columns,"datasource":_vm.dataList,"height":_vm.height,"sortkey":_vm.sortkey,"sortorder":_vm.sortorder,"rowClassName":_vm.rowClassName,"hoverRowIndex":_vm.hoverRowIndex,"allChecked":_vm.allChecked,"indeterminate":_vm.indeterminate,"noresultMsg":_vm.noresultMsg},on:{"sort":_vm.sorter,"selectChange":_vm.onSelectChange,"selectAllChange":_vm.onSelectAllChange,"rowEnter":_vm.rowEnter,"rowLeave":_vm.rowLeave},scopedSlots:_vm._u([_vm._l((_vm.columns),function(item){return {key:item.key + '-base-th',fn:function(props){return _vm.$scopedSlots[item.key+'-th']?[_vm._t(item.key + '-th',null,{item:props})]:undefined}}}),_vm._l((_vm.columns),function(item){return {key:item.key + '-base-td',fn:function(props){return _vm.$scopedSlots[item.key+'-td']?[_vm._t(item.key + '-td',null,{item:props.item})]:undefined}}})])})]],2)])},staticRenderFns: [],
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

        if (newVal === oldVal) { return }
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
    updateSelectAll: function updateSelectAll (status) {
      var this$1 = this;

      this.allChecked = status;
      this.dataList = this.dataList.map(function (item) {
        this$1.$set(item, '_checked', status);
        return item
      });
      if (status) {
        this.selection = this.dataList.filter(function (item) { return item._checked && !item._disabled; });
      } else {
        this.selection = [];
      }
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
      }
      this.selection = this.selection.filter(function (item) { return item._checked && !item._disabled; });
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
        item._disabled = (item.hasOwnProperty('_disabled') && item._disabled) || this$1.allChecked;
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
      var maxWidth = e.target.scrollWidth - e.target.offsetWidth;
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
      if (scrollLeft > maxWidth) {
        e.target.scrollLeft = maxWidth;
        return
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

      this.$emit('sort', {key: key, order: order});
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

var Mod37 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-tip",on:{"mouseenter":_vm.show,"mouseleave":_vm.hide,"!focus":function($event){return _vm.show($event)},"!blur":function($event){return _vm.hide($event)},"click":_vm.show}},[_vm._t("default"),_c('c-portal',{attrs:{"role":"tooltip","aria-hidden":'' + !_vm.visible}},[(!_vm.disabled)?_c('transition',{on:{"before-enter":_vm.beforeEnter,"enter":_vm.enter,"after-enter":_vm.afterEnter,"leave":_vm.leave,"after-leave":_vm.afterLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],ref:"tip",staticClass:"c-tip__container",class:_vm.theme === 'light' && 'c-tip__container--light',on:{"mouseenter":_vm.show,"mouseleave":_vm.hide}},[_c('i',{staticClass:"c-tip__arrow",class:_vm.arrowClass}),(_vm.content)?_c('div',[_vm._v(_vm._s(_vm.content))]):_vm._e(),_vm._t("content")],2)]):_vm._e()],1)],2)},staticRenderFns: [],
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

var Mod38 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-toolbar",class:{'is-primary': _vm.primary},style:(_vm.style)},[_vm._t("default")],2)},staticRenderFns: [],
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

var Mod39 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-toolbar__item",class:{'is-flex': _vm.flex}},[_vm._t("default")],2)},staticRenderFns: [],
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
}

var Mod40 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-tree"},_vm._l((_vm.nodes),function(node){return _c('c-tree-node',{attrs:{"node":node,"level":1}})}))},staticRenderFns: [],
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

var Mod42 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-upload"},[_c('c-input',{on:{"change":_vm.onInput},model:{value:(_vm.inputVal),callback:function ($$v) {_vm.inputVal=$$v;},expression:"inputVal"}}),_c('c-button',{attrs:{"icon":"upload","type":"button","loading":_vm.loading},on:{"click":_vm.startUpload}},[_vm._v("上传")]),_c('input',{ref:"input",staticStyle:{"display":"none"},attrs:{"type":"file"},on:{"change":_vm.onFileSelected}})],1)},staticRenderFns: [],
  name: 'c-upload',
  props: {
    value: String,
    uploadFunction: Function
  },
  data: function data () {
    return {
      inputVal: '',
      loading: false
    }
  },
  created: function created () {
    this.inputVal = this.value;
  },
  methods: {
    onInput: function onInput () {
      this.$emit('change', this.inputVal);
    },
    startUpload: function startUpload () {
      if (this.loading) { return }
      this.$refs.input.click();
    },
    onFileSelected: function onFileSelected (e) {
      var this$1 = this;

      var uploadFn = this.uploadFunction || this.$clair.uploadFunction;
      if (typeof uploadFn !== 'function') {
        console.error('uploadFunction is required to use uploader.');
        return
      }
      if (e.target.files.length === 0) { return }
      this.loading = true;
      uploadFn.call(this, e.target.files).then(function (result) {
        this$1.$emit('change', result);
        this$1.inputVal = result;
        this$1.loading = false;
      }).catch(function (ex) {
        this$1.$emit('error', ex);
        this$1.loading = false;
      });
    }
  }
}

var Components = [
  Mod0,
  Mod1,
  Mod2,
  Mod3,
  Mod4,
  Mod5,
  Mod6,
  Mod7,
  Mod8,
  Mod9,
  Menu,
  Mod11,
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
  Mod39,
  Mod40,
  TreeNode,
  Mod42
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
    prototype[("$" + type)] = function (ref) {
      var msg = ref.msg;
      var title = ref.title;

      return this$1.$message({ msg: msg, title: title, type: type })
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
}

var Notification = {
  install: function install (Vue) {
    extendVue$1(Vue);
  }
}
var containers = {
  topRight: null,
  bottomRight: null,
  bottomLeft: null,
  topLeft: null
};

function extendVue$1 (Vue) {
  var prototype = Vue.prototype;

  var createNotification = function (data, component) {
    var mountNode = document.createElement('div');
    var pos = data.position ? data.position : 'topRight';

    if (containers[pos] === null) {
      var el = document.createElement('div');
      el.className = "c-notification c-notification-" + pos;
      containers[pos] = el;
      document.body.appendChild(containers[pos]);
    }
    containers[pos].appendChild(mountNode);

    var vm = new Vue({
      components: {
        'c-notice-app': component
      },
      destroyed: function destroyed () {
        var elem = this.$el;
        elem.parentNode.removeChild(elem);
      },
      render: function render (h) {
        return h('c-notice-app', {
          attrs: data,
          on: {
            destroy: function destroy () {
              vm.$destroy();
            },
            close: function close () {
              // TODO
              console.log('Close the notification...');
            }
          }
        })
      }
    }).$mount(mountNode);
  };

  prototype.$notify = function (data) {
    return createNotification(data, CNotification)
  };
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
var hasOwnProperty$15 = Object.prototype.hasOwnProperty;
var propIsEnumerable$1 = Object.prototype.propertyIsEnumerable;

function toObject$2(val) {
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

var objectAssign = shouldUseNative$1() ? Object.assign : function (target, source) {
	var arguments$1 = arguments;

	var from;
	var to = toObject$2(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments$1[s]);

		for (var key in from) {
			if (hasOwnProperty$15.call(from, key)) {
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
    Vue.use(Notification);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Clair);
}

return Clair;

})));
