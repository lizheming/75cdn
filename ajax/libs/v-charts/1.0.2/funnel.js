'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var echarts = _interopDefault(require('echarts/lib/echarts'));
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
require('echarts/lib/chart/funnel');

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
      return (val * 100).toFixed(2) + '%';
    case 'normal':
      return formatTausends(val);
    default:
      return val;
  }
};

var dataHandler = {
  getFunnelTooltip: function getFunnelTooltip() {
    return {
      trigger: 'item',
      formatter: function formatter(item) {
        var tpl = [];
        var name = item.name.split(SIGN)[0];
        var type = item.name.split(SIGN)[1];
        tpl.push(itemPoint(item.color));
        tpl.push(name + ': ' + getFormated(item.data.realValue, type));
        return tpl.join('');
      }
    };
  },
  getFunnelLegend: function getFunnelLegend(_ref) {
    var dimension = _ref.dimension,
        measure = _ref.measure,
        rows = _ref.rows,
        sequence = _ref.sequence,
        dataType = _ref.dataType;

    var legendData = sequence.map(function (item) {
      return '' + item + SIGN + dataType;
    });
    var formatter = getLegendName;

    return { data: legendData, formatter: formatter };
  },
  getFunnelSeries: function getFunnelSeries(_ref2) {
    var dimension = _ref2.dimension,
        measure = _ref2.measure,
        rows = _ref2.rows,
        sequence = _ref2.sequence,
        dataType = _ref2.dataType,
        ascending = _ref2.ascending;

    var series = {
      type: 'funnel',
      label: { normal: {
          formatter: function formatter(item) {
            return item.name.split(SIGN)[0];
          }
        } }
    };
    rows.sort(function (a, b) {
      return sequence.indexOf(a[dimension]) - sequence.indexOf(b[dimension]);
    });

    var falseFunnel = false;
    rows.some(function (row, index) {
      if (index && row[measure] > rows[index - 1][measure]) {
        falseFunnel = true;
        return true;
      }
    });

    var step = 100 / rows.length;

    if (falseFunnel) {
      series.data = rows.slice().reverse().map(function (row, index) {
        return {
          name: '' + row[dimension] + SIGN + dataType,
          value: (index + 1) * step,
          realValue: row[measure]
        };
      });
    } else {
      series.data = rows.map(function (row) {
        return {
          name: '' + row[dimension] + SIGN + dataType,
          value: row[measure],
          realValue: row[measure]
        };
      });
    }

    if (ascending) series.sort = 'ascending';
    return series;
  }
};

var funnel = function funnel(columns, rows, settings) {
  var _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? 'normal' : _settings$dataType,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$sequence = settings.sequence,
      sequence = _settings$sequence === undefined ? rows.map(function (row) {
    return row[dimension];
  }) : _settings$sequence,
      ascending = settings.ascending;

  var measure = void 0;
  if (settings.measure) {
    measure = settings.measure;
  } else {
    var measureTemp = columns.slice();
    measureTemp.splice(columns.indexOf(dimension), 1);
    measure = measureTemp[0];
  }

  var tooltip = dataHandler.getFunnelTooltip();
  var legend = dataHandler.getFunnelLegend({ dimension: dimension, measure: measure, rows: rows, sequence: sequence, dataType: dataType });
  var series = dataHandler.getFunnelSeries({ dimension: dimension, measure: measure, rows: rows, sequence: sequence, dataType: dataType, ascending: ascending });
  var options = { tooltip: tooltip, legend: legend, series: series };
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
  name: 'VeFunnel',
  mixins: [chartMixin],
  created: function created() {
    this.chartHandler = funnel;
    this.echartsLib = echarts;
  }
};

module.exports = index;
