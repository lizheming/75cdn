'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var echarts = _interopDefault(require('echarts/lib/echarts'));
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/chart/bar');

if (typeof Object.assign !== 'function') {
  Object.assign = function (target) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

echarts.registerTheme('ve-chart', {
  color: ['#19d4ae', '#5ab1ef', '#fa6e86', '#ffb980', '#0067a6', '#c4b4e4', '#d87a80', '#9cbbff', '#d9d0c7', '#87a997', '#d49ea2', '#5b4947', '#7ba3a8'],
  categoryAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false }
  },
  valueAxis: {
    axisLine: { show: false }
  },
  line: {
    smooth: true
  },
  grid: {
    containLabel: true,
    left: 10,
    right: 10
  }
});

var itemPoint = function itemPoint(color) {
  return ['<span style="', 'background-color:' + color + ';', 'display: inline-block;', 'width: 10px;', 'height: 10px;', 'border-radius: 50%;', 'margin-right:2px;', '"></span>'].join('');
};

var numberFormat = function numberFormat(val) {
  var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (isNaN(+val)) return val;

  var symbolMap = [{ value: 1E18, symbol: 'E' }, { value: 1E15, symbol: 'P' }, { value: 1E12, symbol: 'T' }, { value: 1E9, symbol: 'B' }, { value: 1E6, symbol: 'M' }, { value: 1E3, symbol: 'k' }];

  for (var i = 0; i < symbolMap.length; i++) {
    if (Math.abs(val) >= symbolMap[i].value) {
      return (val / symbolMap[i].value).toFixed(digits) + symbolMap[i].symbol;
    }
  }

  return val.toString();
};

var formatTausends = function formatTausends(num) {
  return String(num).replace(/^(\s+|-)?\d+(?=.?\d*($|\s))/g, function (m) {
    return m.replace(/(?=(?!\b)(\d{3})+$)/g, ',');
  });
};

var getFormated = function getFormated(val, type) {
  var digit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

  switch (type) {
    case 'KMB':
      return numberFormat(val);
    case 'percent':
      return parseFloat((val * 100).toFixed(digit)) + '%';
    case 'normal':
      return formatTausends(val);
    default:
      return val;
  }
};



var getStackMap = function getStackMap(stack) {
  var stackMap = {};
  Object.keys(stack).forEach(function (item) {
    stack[item].forEach(function (name) {
      stackMap[name] = item;
    });
  });
  return stackMap;
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

function getBarDimAxis(args) {
  var rows = args.rows,
      dimAxisName = args.dimAxisName,
      dimension = args.dimension,
      axisVisible = args.axisVisible;

  return dimension.map(function (item) {
    return {
      type: 'category',
      name: dimAxisName,
      nameLocation: 'middle',
      nameGap: 22,
      data: rows.map(function (row) {
        return row[item];
      }),
      axisLabel: {
        formatter: function formatter(v) {
          return String(v);
        }
      },
      show: axisVisible
    };
  });
}

function getBarMeaAxis(args) {
  var meaAxisName = args.meaAxisName,
      meaAxisType = args.meaAxisType,
      axisVisible = args.axisVisible,
      digit = args.digit;

  var meaAxisBase = {
    type: 'value',
    axisTick: {
      show: false
    },
    show: axisVisible
  };
  var meaAxis = [];

  var _loop = function _loop(i) {
    if (meaAxisType[i]) {
      meaAxis[i] = Object.assign({}, meaAxisBase, {
        axisLabel: {
          formatter: function formatter(val) {
            return getFormated(val, meaAxisType[i], digit);
          }
        }
      });
    } else {
      meaAxis[i] = Object.assign({}, meaAxisBase);
    }
    meaAxis[i].name = meaAxisName[i] || '';
  };

  for (var i = 0; i < 2; i++) {
    _loop(i);
  }

  return meaAxis;
}

function getBarTooltip(args) {
  var axisSite = args.axisSite,
      isHistogram = args.isHistogram,
      meaAxisType = args.meaAxisType,
      digit = args.digit;

  var secondAxis = isHistogram ? axisSite.right : axisSite.top;
  return {
    trigger: 'axis',
    formatter: function formatter(items) {
      var tpl = [];
      tpl.push(items[0].name + '<br>');
      items.forEach(function (item) {
        var seriesName = item.seriesName;
        var type = ~secondAxis.indexOf(seriesName) ? meaAxisType[1] : meaAxisType[0];
        tpl.push(itemPoint(item.color));
        tpl.push(seriesName + ': ');
        tpl.push(getFormated(item.value, type, digit));
        tpl.push('<br>');
      });

      return tpl.join('');
    }
  };
}

function getBarSeries(args) {
  var rows = args.rows,
      metrics = args.metrics,
      stack = args.stack,
      axisSite = args.axisSite,
      isHistogram = args.isHistogram;

  var series = [];
  var seriesTemp = {};
  var secondAxis = isHistogram ? axisSite.right : axisSite.top;
  var secondDimAxisIndex = isHistogram ? 'yAxisIndex' : 'xAxisIndex';
  var stackMap = stack && getStackMap(stack);
  metrics.forEach(function (item) {
    seriesTemp[item] = [];
  });
  rows.forEach(function (row) {
    metrics.forEach(function (item) {
      seriesTemp[item].push(row[item]);
    });
  });
  series = Object.keys(seriesTemp).map(function (item) {
    var seriesItem = defineProperty({
      name: item,
      type: 'bar',
      data: seriesTemp[item]
    }, secondDimAxisIndex, ~secondAxis.indexOf(item) ? '1' : '0');

    if (stack && stackMap[item]) seriesItem.stack = stackMap[item];

    return seriesItem;
  });

  return series.length ? series : false;
}

var bar = function bar(columns, rows, settings, extra) {
  var _settings$axisSite = settings.axisSite,
      axisSite = _settings$axisSite === undefined ? { top: [] } : _settings$axisSite,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? [columns[0]] : _settings$dimension,
      _settings$stack = settings.stack,
      stack = _settings$stack === undefined ? {} : _settings$stack,
      _settings$axisVisible = settings.axisVisible,
      axisVisible = _settings$axisVisible === undefined ? true : _settings$axisVisible,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit;
  var tooltipVisible = extra.tooltipVisible,
      legendVisible = extra.legendVisible;

  var metrics = columns.slice();
  if (settings.metrics) {
    metrics = settings.metrics;
  } else {
    metrics.splice(columns.indexOf(dimension[0]), 1);
  }
  var meaAxisType = settings.xAxisType || ['normal', 'normal'];
  var meaAxisName = settings.xAxisName || [];
  var dimAxisName = settings.yAxisName || '';
  var isHistogram = false;

  var legend = legendVisible && { data: metrics };
  var yAxis = getBarDimAxis({ rows: rows, dimAxisName: dimAxisName, dimension: dimension, axisVisible: axisVisible });
  var xAxis = getBarMeaAxis({ meaAxisName: meaAxisName, meaAxisType: meaAxisType, axisVisible: axisVisible, digit: digit });
  var series = getBarSeries({ rows: rows, metrics: metrics, stack: stack, axisSite: axisSite, isHistogram: isHistogram });
  var tooltipParams = { axisSite: axisSite, isHistogram: isHistogram, meaAxisType: meaAxisType, digit: digit };
  var tooltip = tooltipVisible && getBarTooltip(tooltipParams);
  var options = { legend: legend, yAxis: yAxis, series: series, xAxis: xAxis, tooltip: tooltip };
  return options;
};

var chartMixin = {
  props: {
    data: { type: [Object, Array], default: null },
    settings: { type: Object, default: function _default() {
        return {};
      }
    },
    width: { type: String, default: 'auto' },
    height: { type: String, default: '400px' },
    beforeConfig: { type: Function },
    afterConfig: { type: Function },
    events: { type: Object },
    grid: { type: Object },
    colors: { type: Array },
    tooltipVisible: { type: Boolean, default: true },
    legendVisible: { type: Boolean, default: true },
    legendPosition: { type: String },
    markLine: { type: Object },
    markArea: { type: Object },
    markPoint: { type: Object },
    visualMap: { type: [Object, Array] },
    dataZoom: { type: [Object, Array] },
    toolbox: { type: Object },
    initOptions: { type: Object, default: function _default() {
        return {};
      }
    },
    title: Object,
    legend: Object,
    xAxis: Object,
    yAxis: Object,
    radar: Object,
    tooltip: Object,
    axisPointer: Object,
    brush: Object,
    geo: Object,
    timeline: Object,
    graphic: Object,
    series: Object,
    backgroundColor: [Object, String],
    textStyle: Object,
    animation: Object
  },

  watch: {
    data: {
      deep: true,
      handler: function handler(v) {
        if (v) {
          this.dataHandler(v);
        }
      }
    },

    settings: {
      deep: true,
      handler: function handler(v) {
        if (v.type && this.chartLib) this.chartHandler = this.chartLib[v.type];
        this.dataHandler(this.data);
      }
    }
  },

  computed: {
    canvasStyle: function canvasStyle() {
      return {
        width: this.width,
        height: this.height,
        position: 'relative'
      };
    }
  },

  methods: {
    dataHandler: function dataHandler(data) {
      var _this = this;

      if (!this.chartHandler) return;
      if (!data || !Array.isArray(data.columns) || !Array.isArray(data.rows)) return false;
      var _data = data,
          columns = _data.columns,
          rows = _data.rows;

      var extra = {
        tooltipVisible: this.tooltipVisible,
        legendVisible: this.legendVisible
      };
      if (this.beforeConfig) data = this.beforeConfig(data);

      var options = this.chartHandler(columns, rows, this.settings, extra);

      if (options) {
        if (this.legendPosition && options.legend) {
          options.legend[this.legendPosition] = 10;
          if (~['left', 'right'].indexOf(this.legendPosition)) {
            options.legend.top = 'middle';
            options.legend.orient = 'vertical';
          }
        }
        if (this.colors) options.color = this.colors;
        if (this.grid) options.grid = this.grid;
        if (this.dataZoom) options.dataZoom = this.dataZoom;
        if (this.visualMap) options.visualMap = this.visualMap;
        if (this.toolbox) options.toolbox = this.toolbox;
        if (this.title) options.title = this.title;
        if (this.legend) options.legend = this.legend;
        if (this.xAxis) options.xAxis = this.xAxis;
        if (this.yAxis) options.yAxis = this.yAxis;
        if (this.radar) options.radar = this.radar;
        if (this.tooltip) options.tooltip = this.tooltip;
        if (this.axisPointer) options.axisPointer = this.axisPointer;
        if (this.brush) options.brush = this.brush;
        if (this.geo) options.geo = this.geo;
        if (this.timeline) options.timeline = this.timeline;
        if (this.graphic) options.graphic = this.graphic;
        if (this.series) options.series = this.series;
        if (this.backgroundColor) options.backgroundColor = this.backgroundColor;
        if (this.textStyle) options.textStyle = this.textStyle;
        if (this.animation) {
          Object.keys(this.animation).forEach(function (key) {
            options[key] = _this.animation[key];
          });
        }
        if (this.markArea || this.markLine || this.markPoint) {
          var marks = {
            markArea: this.markArea,
            markLine: this.markLine,
            markPoint: this.markPoint
          };
          var series = options.series;
          if (this.getType(series) === '[object Array]') {
            series.forEach(function (item) {
              _this.addMark(item, marks);
            });
          } else if (this.getType(series) === '[object Object]') {
            this.addMark(series, marks);
          }
        }
        if (this.afterConfig) options = this.afterConfig(options);
        this.echarts.setOption(options, true);
      }
    },
    addMark: function addMark(seriesItem, marks) {
      Object.keys(marks).forEach(function (key) {
        if (marks[key]) {
          seriesItem[key] = marks[key];
        }
      });
    },
    getType: function getType(v) {
      return Object.prototype.toString.call(v);
    },
    init: function init() {
      if (this.echarts) return;
      this.echarts = this.echartsLib.init(this.$refs.canvas, 've-chart', this.initOptions);
      if (this.data) this.dataHandler(this.data);
      if (this.events) this.bindEvents();
    },
    bindEvents: function bindEvents() {
      var _this2 = this;

      Object.keys(this.events).forEach(function (event) {
        _this2.echarts.on(event, _this2.events[event]);
      });
    },
    addWatchToProps: function addWatchToProps() {
      var _this3 = this;

      var watchedVariable = this._watchers.map(function (watcher) {
        return watcher.expression;
      });
      Object.keys(this.$props).forEach(function (prop) {
        if (!~watchedVariable.indexOf(prop)) {
          var opts = {};
          if (Object.prototype.toString.call(prop) === '[object Object]') {
            opts.deep = true;
          }
          _this3.$watch(prop, function () {
            _this3.dataHandler(_this3.data);
          }, opts);
        }
      });
    }
  },

  created: function created() {
    this.addWatchToProps();
  },
  mounted: function mounted() {
    this.init();
    window.addEventListener('resize', this.echarts.resize);
  },
  beforeDestory: function beforeDestory() {
    window.removeEventListener('resize', this.echarts.resize);
    this.echarts.dispose();
  }
};

var index = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-bar", style: _vm.canvasStyle });
  },
  staticRenderFns: [],
  name: 'VeBar',
  mixins: [chartMixin],
  created: function created() {
    this.chartHandler = bar;
    this.echartsLib = echarts;
  }
};

module.exports = index;