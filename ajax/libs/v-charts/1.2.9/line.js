'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var echarts = _interopDefault(require('echarts/lib/echarts'));
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/chart/line');

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
  switch (type) {
    case 'KMB':
      return numberFormat(val);
    case 'percent':
      return parseFloat((val * 100).toFixed(2)) + '%';
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

function getLineXAxis(args) {
  var dimension = args.dimension,
      rows = args.rows,
      xAxisName = args.xAxisName,
      axisVisible = args.axisVisible;

  return dimension.map(function (item, index) {
    return {
      type: 'category',
      nameLocation: 'middle',
      nameGap: 22,
      boundaryGap: false,
      name: xAxisName[index] || '',
      axisTick: { show: true, lineStyle: { color: '#eee' } },
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

function getLineSeries(args) {
  var rows = args.rows,
      axisSite = args.axisSite,
      metrics = args.metrics,
      area = args.area,
      stack = args.stack,
      nullAddZero = args.nullAddZero;

  var series = [];
  var dataTemp = {};
  var stackMap = stack && getStackMap(stack);
  metrics.forEach(function (item) {
    dataTemp[item] = [];
  });
  rows.forEach(function (row) {
    metrics.forEach(function (item) {
      var value = null;
      if (row[item] != null) {
        value = row[item];
      } else if (nullAddZero) {
        value = 0;
      }
      dataTemp[item].push(value);
    });
  });
  metrics.forEach(function (item) {
    var seriesItem = {
      name: item,
      type: 'line',
      data: dataTemp[item]
    };

    if (area) seriesItem.areaStyle = { normal: {} };
    seriesItem.yAxisIndex = ~axisSite.right.indexOf(item) ? 1 : 0;

    if (stack && stackMap[item]) seriesItem.stack = stackMap[item];

    series.push(seriesItem);
  });
  return series.length ? series : false;
}

function getLineYAxis(args) {
  var yAxisName = args.yAxisName,
      yAxisType = args.yAxisType,
      axisVisible = args.axisVisible,
      scale = args.scale,
      min = args.min,
      max = args.max;

  var yAxisBase = {
    type: 'value',
    axisTick: {
      show: false
    },
    show: axisVisible
  };
  var yAxis = [];

  var _loop = function _loop(i) {
    if (yAxisType[i]) {
      yAxis[i] = Object.assign({}, yAxisBase, {
        axisLabel: {
          formatter: function formatter(val) {
            return getFormated(val, yAxisType[i]);
          }
        }
      });
    } else {
      yAxis[i] = Object.assign({}, yAxisBase);
    }
    yAxis[i].name = yAxisName[i] || '';
    yAxis[i].scale = scale[i] || false;
    yAxis[i].min = min[i] || null;
    yAxis[i].max = max[i] || null;
  };

  for (var i = 0; i < 2; i++) {
    _loop(i);
  }
  return yAxis;
}

function getLineTooltip(axisSite, yAxisType) {
  return {
    trigger: 'axis',
    formatter: function formatter(items) {
      var tpl = [];
      tpl.push(items[0].name + '<br>');
      items.forEach(function (item) {
        var showData = void 0;
        var type = ~axisSite.right.indexOf(item.seriesName) ? yAxisType[1] : yAxisType[0];
        showData = getFormated(item.data, type);
        tpl.push(itemPoint(item.color));
        tpl.push(item.seriesName + ': ' + showData);
        tpl.push('<br>');
      });
      return tpl.join('');
    }
  };
}

var line = function line(columns, rows, settings, extra) {
  var _settings$axisSite = settings.axisSite,
      axisSite = _settings$axisSite === undefined ? { right: [] } : _settings$axisSite,
      _settings$yAxisType = settings.yAxisType,
      yAxisType = _settings$yAxisType === undefined ? ['normal', 'normal'] : _settings$yAxisType,
      _settings$yAxisName = settings.yAxisName,
      yAxisName = _settings$yAxisName === undefined ? [] : _settings$yAxisName,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? [columns[0]] : _settings$dimension,
      _settings$xAxisName = settings.xAxisName,
      xAxisName = _settings$xAxisName === undefined ? [] : _settings$xAxisName,
      _settings$axisVisible = settings.axisVisible,
      axisVisible = _settings$axisVisible === undefined ? true : _settings$axisVisible,
      area = settings.area,
      stack = settings.stack,
      _settings$scale = settings.scale,
      scale = _settings$scale === undefined ? [false, false] : _settings$scale,
      _settings$min = settings.min,
      min = _settings$min === undefined ? [null, null] : _settings$min,
      _settings$max = settings.max,
      max = _settings$max === undefined ? [null, null] : _settings$max,
      _settings$nullAddZero = settings.nullAddZero,
      nullAddZero = _settings$nullAddZero === undefined ? false : _settings$nullAddZero;
  var tooltipVisible = extra.tooltipVisible,
      legendVisible = extra.legendVisible;

  var metrics = columns.slice();

  if (settings.metrics) {
    metrics = settings.metrics;
  } else {
    metrics.splice(columns.indexOf(dimension[0]), 1);
  }

  var legend = legendVisible && { data: metrics };
  var tooltip = tooltipVisible && getLineTooltip(axisSite, yAxisType);
  var xAxis = getLineXAxis({ dimension: dimension, rows: rows, xAxisName: xAxisName, axisVisible: axisVisible });
  var yAxisParams = {
    yAxisName: yAxisName,
    yAxisType: yAxisType,
    axisVisible: axisVisible,
    scale: scale,
    min: min,
    max: max
  };
  var yAxis = getLineYAxis(yAxisParams);
  var seriesParams = {
    rows: rows,
    axisSite: axisSite,
    metrics: metrics,
    area: area,
    stack: stack,
    nullAddZero: nullAddZero
  };
  var series = getLineSeries(seriesParams);
  if (!xAxis || !series) return false;

  var options = { legend: legend, xAxis: xAxis, series: series, yAxis: yAxis, tooltip: tooltip };
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
    }
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
        if (this.colors) options.color = this.colors;
        if (this.grid) options.grid = this.grid;
        if (this.legendPosition && options.legend) {
          options.legend[this.legendPosition] = 10;
          if (~['left', 'right'].indexOf(this.legendPosition)) {
            options.legend.top = 'middle';
            options.legend.orient = 'vertical';
          }
        }
        if (this.dataZoom) options.dataZoom = this.dataZoom;
        if (this.visualMap) options.visualMap = this.visualMap;
        if (this.toolbox) options.toolbox = this.toolbox;
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
    }
  },

  mounted: function mounted() {
    var _this3 = this;

    this.$nextTick(function () {
      _this3.init();
      window.addEventListener('resize', _this3.echarts.resize);
    });
  },
  beforeDestory: function beforeDestory() {
    window.removeEventListener('resize', this.echarts.resize);
    this.echarts.dispose();
  }
};

var index = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-line", style: _vm.canvasStyle });
  },
  staticRenderFns: [],
  name: 'VeLine',
  mixins: [chartMixin],
  created: function created() {
    this.chartHandler = line;
    this.echartsLib = echarts;
  }
};

module.exports = index;
