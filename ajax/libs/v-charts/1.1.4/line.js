'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var echarts = _interopDefault(require('echarts/lib/echarts'));

var SIGN = '@_@';
var getLegendName = function getLegendName(item) {
  return item.split(SIGN)[0];
};

var itemPoint = function itemPoint(color) {
  return ['<span style="', 'background-color:' + color + ';', 'display: inline-block;', 'width: 10px;', 'height: 10px;', 'border-radius: 50%;', 'margin-right:2px;', '"></span>'].join('');
};

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

var slicedToArray = function () {
  function sliceIterator(arr, i) {
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
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

function getLineLegends(_ref) {
  var metrics = _ref.metrics,
      axisSite = _ref.axisSite,
      yAxisType = _ref.yAxisType;

  var legends = [];

  var formatter = getLegendName;

  metrics.forEach(function (item) {
    var legendItem = ~axisSite.right.indexOf(item) ? '' + item + SIGN + yAxisType[1] : '' + item + SIGN + yAxisType[0];
    legends.push(legendItem);
  });

  return legends.length ? { data: legends, formatter: formatter } : false;
}

function getLineXAxis(_ref2) {
  var dimension = _ref2.dimension,
      rows = _ref2.rows,
      xAxisName = _ref2.xAxisName,
      axisVisible = _ref2.axisVisible;

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

function getLineSeries(_ref3) {
  var rows = _ref3.rows,
      axisSite = _ref3.axisSite,
      yAxisType = _ref3.yAxisType,
      dimension = _ref3.dimension,
      metrics = _ref3.metrics,
      area = _ref3.area,
      stack = _ref3.stack;

  var series = [];
  var dataTemp = {};
  var stackMap = stack && getStackMap(stack);
  metrics.forEach(function (item) {
    dataTemp[item] = [];
  });
  rows.forEach(function (row) {
    metrics.forEach(function (item) {
      dataTemp[item].push(row[item] || 0);
    });
  });
  metrics.forEach(function (item) {
    var seriesItem = {
      name: item,
      type: 'line',
      data: dataTemp[item]
    };

    if (area) seriesItem.areaStyle = { normal: {} };

    if (~axisSite.right.indexOf(item)) {
      seriesItem.yAxisIndex = 1;
      seriesItem.name = '' + item + SIGN + yAxisType[1];
    } else {
      seriesItem.yAxisIndex = 0;
      seriesItem.name = '' + item + SIGN + yAxisType[0];
    }

    if (stack && stackMap[item]) seriesItem.stack = stackMap[item];

    series.push(seriesItem);
  });
  return series.length ? series : false;
}

function getLineYAxis(_ref4) {
  var yAxisName = _ref4.yAxisName,
      yAxisType = _ref4.yAxisType,
      axisVisible = _ref4.axisVisible;

  var yAxisBase = { type: 'value', axisTick: { show: false }, show: axisVisible };
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
  };

  for (var i = 0; i < 2; i++) {
    _loop(i);
  }
  return yAxis;
}

function getLineTooltip() {
  return {
    trigger: 'axis',
    formatter: function formatter(items) {
      var tpl = [];
      tpl.push(items[0].name + '<br>');
      items.forEach(function (item) {
        var showData = void 0;

        var _item$seriesName$spli = item.seriesName.split(SIGN),
            _item$seriesName$spli2 = slicedToArray(_item$seriesName$spli, 2),
            name = _item$seriesName$spli2[0],
            type = _item$seriesName$spli2[1];

        showData = getFormated(item.data, type);
        tpl.push(itemPoint(item.color));
        tpl.push(name + ': ' + showData);
        tpl.push('<br>');
      });
      return tpl.join('');
    }
  };
}

var line = function line(columns, rows, settings, status) {
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
      area = settings.area,
      stack = settings.stack;
  var tooltipVisible = status.tooltipVisible,
      legendVisible = status.legendVisible,
      axisVisible = status.axisVisible;

  var metrics = columns.slice();

  if (settings.metrics) {
    metrics = settings.metrics;
  } else {
    metrics.splice(columns.indexOf(dimension[0]), 1);
  }

  var legend = legendVisible && getLineLegends({ metrics: metrics, axisSite: axisSite, yAxisType: yAxisType });
  var tooltip = tooltipVisible && getLineTooltip();
  var xAxis = getLineXAxis({ dimension: dimension, rows: rows, xAxisName: xAxisName, axisVisible: axisVisible });
  var yAxis = getLineYAxis({ yAxisName: yAxisName, yAxisType: yAxisType, axisVisible: axisVisible });
  var series = getLineSeries({ rows: rows, stack: stack, axisSite: axisSite, yAxisType: yAxisType, dimension: dimension, metrics: metrics, area: area });
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
    scale: { type: Object },
    tooltipVisible: { type: Boolean, default: false },
    legendVisible: { type: Boolean, default: false },
    axisVisible: { type: Boolean, default: true }
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
      return { width: this.width, height: this.height };
    }
  },

  methods: {
    dataHandler: function dataHandler(data) {
      if (!this.chartHandler) return;
      if (!data || !Array.isArray(data.columns) || !Array.isArray(data.rows)) return false;
      var _data = data,
          columns = _data.columns,
          rows = _data.rows;

      var status = {
        tooltipVisible: this.tooltipVisible,
        legendVisible: this.legendVisible,
        axisVisible: this.axisVisible
      };
      if (this.beforeConfig) data = this.beforeConfig(data);

      var options = this.chartHandler(columns, rows, this.settings, status);

      if (this.colors) options.color = this.colors;
      if (this.grid) options.grid = this.grid;
      if (this.scale) {
        options.xAxis.scale = this.scale.x;
        options.yAxis.scale = this.scale.y;
      }
      if (this.afterConfig) options = this.afterConfig(options);
      if (options) this.echarts.setOption(options, true);
    },
    init: function init() {
      if (this.echarts) return;
      this.echarts = this.echartsLib.init(this.$refs.canvas, 've-chart');
      if (this.data) this.dataHandler(this.data);
      if (this.events) this.bindEvents();
    },
    bindEvents: function bindEvents() {
      var _this = this;

      Object.keys(this.events).forEach(function (event) {
        _this.echarts.on(event, _this.events[event]);
      });
    }
  },

  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.init();
      window.addEventListener('resize', _this2.echarts.resize);
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
