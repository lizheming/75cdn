'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var echarts = _interopDefault(require('echarts/lib/echarts'));
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
require('echarts/lib/chart/bar');

var SIGN = '@_@';
var getLabelName = function getLabelName(item) {
  return item.split(SIGN)[0];
}; // TODO: delete
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
      return (val * 100).toFixed(2) + '%';
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

var dataHandler = {
  getBarLegends: function getBarLegends(_ref) {
    var measures = _ref.measures,
        axisSite = _ref.axisSite,
        meaAxisType = _ref.meaAxisType,
        isColumn = _ref.isColumn;

    var legends = [];

    var formatter = getLabelName;
    var secondAxis = isColumn ? axisSite.right : axisSite.top;
    measures.forEach(function (measure) {
      var legendItem = ~secondAxis.indexOf(measure) ? '' + measure + SIGN + meaAxisType[1] : '' + measure + SIGN + meaAxisType[0];
      legends.push(legendItem);
    });

    return legends.length ? { data: legends, formatter: formatter } : false;
  },
  getBarDimAxis: function getBarDimAxis(_ref2) {
    var rows = _ref2.rows,
        dimAxisName = _ref2.dimAxisName,
        dimensions = _ref2.dimensions;

    return dimensions.map(function (dimension) {
      return {
        type: 'category',
        name: dimAxisName,
        nameLocation: 'middle',
        nameGap: 22,
        data: rows.map(function (row) {
          return row[dimension];
        }),
        axisLabel: {
          formatter: function formatter(v) {
            return String(v);
          }
        }
      };
    });
  },
  getBarMeaAxis: function getBarMeaAxis(_ref3) {
    var columns = _ref3.columns,
        meaAxisName = _ref3.meaAxisName,
        measures = _ref3.measures,
        meaAxisType = _ref3.meaAxisType;

    var meaAxisBase = { type: 'value', axisTick: { show: false } };
    var meaAxis = [];

    var _loop = function _loop(i) {
      if (meaAxisType[i]) {
        meaAxis[i] = Object.assign({}, meaAxisBase, {
          axisLabel: {
            formatter: function formatter(val) {
              return getFormated(val, meaAxisType[i]);
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
  },
  getBarTooltip: function getBarTooltip() {
    return {
      trigger: 'axis',
      formatter: function formatter(items) {
        var tpl = [];
        var title = String(items[0].name).split(SIGN)[0];
        tpl.push(title + '<br>');
        items.forEach(function (item) {
          var _item$seriesName$spli = item.seriesName.split(SIGN),
              _item$seriesName$spli2 = slicedToArray(_item$seriesName$spli, 2),
              name = _item$seriesName$spli2[0],
              type = _item$seriesName$spli2[1];

          tpl.push(itemPoint(item.color));
          tpl.push(name + ': ');
          tpl.push(getFormated(item.value, type));
          tpl.push('<br>');
        });

        return tpl.join('');
      }
    };
  },
  getBarSeries: function getBarSeries(_ref4) {
    var rows = _ref4.rows,
        measures = _ref4.measures,
        stack = _ref4.stack,
        axisSite = _ref4.axisSite,
        meaAxisType = _ref4.meaAxisType,
        isColumn = _ref4.isColumn;

    var series = [];
    var seriesTemp = {};
    var secondAxis = isColumn ? axisSite.right : axisSite.top;
    var secondDimAxisIndex = isColumn ? 'yAxisIndex' : 'xAxisIndex';
    var stackMap = stack && getStackMap(stack);
    measures.forEach(function (measure) {
      seriesTemp[measure] = [];
    });
    rows.forEach(function (row) {
      measures.forEach(function (measure) {
        seriesTemp[measure].push(row[measure]);
      });
    });
    series = Object.keys(seriesTemp).map(function (item) {
      var itemName = ~secondAxis.indexOf(item) ? '' + item + SIGN + meaAxisType[1] : '' + item + SIGN + meaAxisType[0];
      var seriesItem = defineProperty({
        name: itemName,
        type: 'bar',
        data: seriesTemp[item]
      }, secondDimAxisIndex, ~secondAxis.indexOf(item) ? '1' : '0');

      if (stack && stackMap[item]) seriesItem.stack = stackMap[item];

      return seriesItem;
    });

    return series.length ? series : false;
  }
};
var bar = function bar(columns, rows, settings) {
  var _settings$axisSite = settings.axisSite,
      axisSite = _settings$axisSite === undefined ? { top: [] } : _settings$axisSite,
      _settings$dimensions = settings.dimensions,
      dimensions = _settings$dimensions === undefined ? [columns[0]] : _settings$dimensions,
      _settings$stack = settings.stack,
      stack = _settings$stack === undefined ? {} : _settings$stack;

  var measures = columns.slice();
  if (settings.measures) {
    measures = settings.measures;
  } else {
    measures.splice(columns.indexOf(dimensions[0]), 1);
  }
  var meaAxisType = settings.xAxisType || ['normal', 'normal'];
  var meaAxisName = settings.xAxisName || [];
  var dimAxisName = settings.yAxisName || '';
  var isColumn = false;

  var legend = dataHandler.getBarLegends({ measures: measures, axisSite: axisSite, meaAxisType: meaAxisType, isColumn: isColumn });
  var yAxis = dataHandler.getBarDimAxis({ rows: rows, dimAxisName: dimAxisName, dimensions: dimensions });
  var xAxis = dataHandler.getBarMeaAxis({ columns: columns, meaAxisName: meaAxisName, measures: measures, meaAxisType: meaAxisType });
  var series = dataHandler.getBarSeries({ rows: rows, measures: measures, stack: stack, axisSite: axisSite, meaAxisType: meaAxisType, isColumn: isColumn });
  var tooltip = dataHandler.getBarTooltip();
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
    events: { type: Object }
  },

  watch: {
    data: function data(v) {
      var dataKeys = Object.keys(v);
      var dataKeyProp = v.key;
      if (dataKeyProp && Array.isArray(dataKeyProp) && dataKeyProp.length || dataKeys.length) {
        this.dataHandler(v);
      }
    },

    settings: {
      deep: true,
      handler: function handler(v) {
        this.chartHandler = this.chartLib[v.type];
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

      if (this.beforeConfig) data = this.beforeConfig(data);
      var options = this.chartHandler(columns, rows, this.settings);

      if (Array.isArray(this.settings.color)) options.color = this.settings.color;
      if (this.settings.grid) options.grid = this.settings.grid;
      if (this.settings.scaleX) options.xAxis.scale = true;
      if (this.settings.scaleY) options.yAxis.scale = true;

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
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", style: _vm.canvasStyle });
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
