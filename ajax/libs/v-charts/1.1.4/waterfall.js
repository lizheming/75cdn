'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var echarts = _interopDefault(require('echarts/lib/echarts'));

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

function getWaterfallTooltip(dataType) {
  return {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    formatter: function formatter(items) {
      var item = items[1];
      return [item.name + '<br/>' + item.seriesName + ' :', '' + getFormated(item.value, dataType)].join('');
    }
  };
}

function getWaterfallXAxis(_ref) {
  var dimension = _ref.dimension,
      rows = _ref.rows,
      remainStatus = _ref.remainStatus,
      totalName = _ref.totalName,
      remainName = _ref.remainName,
      xAxisName = _ref.xAxisName,
      axisVisible = _ref.axisVisible;

  var xAxisData = [totalName].concat(rows.map(function (row) {
    return row[dimension];
  }));
  if (remainStatus === 'have-remain') xAxisData = xAxisData.concat([remainName]);

  return {
    type: 'category',
    name: xAxisName,
    splitLine: { show: false },
    data: xAxisData,
    show: axisVisible
  };
}

function getWaterfallYAxis(_ref2) {
  var dataType = _ref2.dataType,
      yAxisName = _ref2.yAxisName,
      axisVisible = _ref2.axisVisible;

  return {
    type: 'value',
    name: yAxisName,
    axisTick: { show: false },
    axisLabel: {
      formatter: function formatter(val) {
        return getFormated(val, dataType);
      }
    },
    show: axisVisible
  };
}

function getWaterfallSeries(_ref3) {
  var dataType = _ref3.dataType,
      rows = _ref3.rows,
      dimension = _ref3.dimension,
      metrics = _ref3.metrics,
      totalNum = _ref3.totalNum,
      remainStatus = _ref3.remainStatus,
      dataSum = _ref3.dataSum;

  var seriesBase = { type: 'bar', stack: '总量' };
  var dataSumTemp = dataSum;
  var totalNumTemp = totalNum;
  var assistData = void 0;
  var mainData = void 0;
  var rowData = rows.map(function (row) {
    return row[metrics];
  });

  if (remainStatus === 'have-remain') {
    assistData = [0].concat(rows.map(function (row) {
      totalNumTemp -= row[metrics];
      return totalNumTemp;
    })).concat([0]);
    mainData = [totalNum].concat(rowData).concat([totalNum - dataSum]);
  } else {
    assistData = [0].concat(rows.map(function (row) {
      dataSumTemp -= row[metrics];
      return dataSumTemp;
    }));
    mainData = [dataSum].concat(rowData);
  }
  var series = [];

  series.push(Object.assign({
    name: '辅助',
    itemStyle: {
      normal: { opacity: 0 },
      emphasis: { opacity: 0 }
    },
    data: assistData
  }, seriesBase));

  series.push(Object.assign({
    name: '数值',
    label: {
      normal: {
        show: true,
        position: 'top',
        formatter: function formatter(item) {
          return getFormated(item.value, dataType);
        }
      }
    },
    data: mainData
  }, seriesBase));
  return series;
}

function getWaterfallRemainStatus(_ref4) {
  var dataSum = _ref4.dataSum,
      totalNum = _ref4.totalNum;

  if (!totalNum) return 'not-total';
  return totalNum > dataSum ? 'have-remain' : 'none-remain';
}

var waterfall = function waterfall(columns, rows, settings, status) {
  var _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? 'normal' : _settings$dataType,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$totalName = settings.totalName,
      totalName = _settings$totalName === undefined ? '总计' : _settings$totalName,
      totalNum = settings.totalNum,
      _settings$remainName = settings.remainName,
      remainName = _settings$remainName === undefined ? '其他' : _settings$remainName,
      _settings$xAxisName = settings.xAxisName,
      xAxisName = _settings$xAxisName === undefined ? dimension : _settings$xAxisName;
  var tooltipVisible = status.tooltipVisible,
      axisVisible = status.axisVisible;

  var metricsTemp = columns.slice();
  metricsTemp.splice(metricsTemp.indexOf(dimension), 1);
  var metrics = metricsTemp[0];
  var yAxisName = metrics;
  var tooltip = tooltipVisible && getWaterfallTooltip(dataType);
  var dataSum = rows.reduce(function (pre, cur) {
    return pre + Number(cur[metrics]);
  }, 0).toFixed(2);
  var remainStatus = getWaterfallRemainStatus({ dataSum: dataSum, dimension: dimension, totalNum: totalNum });
  var xAxis = getWaterfallXAxis({ dimension: dimension, rows: rows, remainStatus: remainStatus, totalName: totalName, remainName: remainName, xAxisName: xAxisName, axisVisible: axisVisible });
  var yAxis = getWaterfallYAxis({ dataType: dataType, yAxisName: yAxisName, axisVisible: axisVisible });
  var series = getWaterfallSeries({ dataType: dataType, rows: rows, dimension: dimension, metrics: metrics, totalNum: totalNum, remainStatus: remainStatus, dataSum: dataSum });
  var options = { tooltip: tooltip, xAxis: xAxis, yAxis: yAxis, series: series };
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
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-waterfall", style: _vm.canvasStyle });
  },
  staticRenderFns: [],
  name: 'VeWaterfall',
  mixins: [chartMixin],
  created: function created() {
    this.chartHandler = waterfall;
    this.echartsLib = echarts;
  }
};

module.exports = index;
