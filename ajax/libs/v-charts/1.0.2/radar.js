'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var echarts = _interopDefault(require('echarts/lib/echarts'));
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
require('echarts/lib/chart/radar');

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
  getRadarLegend: function getRadarLegend(_ref) {
    var rows = _ref.rows,
        dimension = _ref.dimension;

    var legendData = rows.map(function (row) {
      return row[dimension];
    });

    return { data: legendData };
  },
  getRadarTooltip: function getRadarTooltip(_ref2) {
    var dataType = _ref2.dataType,
        radar = _ref2.radar;

    var typeTemp = [];
    var nameTemp = [];
    radar.indicator.map(function (item, index) {
      typeTemp[index] = dataType[item.name];
      nameTemp[index] = item.name;
    });
    return {
      formatter: function formatter(item) {
        var tpl = [];
        tpl.push(itemPoint(item.color));
        tpl.push(item.seriesName + '<br />');
        item.data.forEach(function (val, index) {
          tpl.push(nameTemp[index] + ': ');
          tpl.push(getFormated(val, typeTemp[index]) + '<br />');
        });
        return tpl.join('');
      }
    };
  },
  getRadarSetting: function getRadarSetting(_ref3) {
    var rows = _ref3.rows,
        dimension = _ref3.dimension,
        measures = _ref3.measures;

    var settingBase = {
      indicator: [],
      shape: 'circle',
      splitNumber: 5
    };
    var indicatorTemp = {};
    rows.forEach(function (items) {
      measures.forEach(function (measure) {
        if (!indicatorTemp[measure]) {
          indicatorTemp[measure] = [items[measure]];
        } else {
          indicatorTemp[measure].push(items[measure]);
        }
      });
    });
    settingBase.indicator = Object.keys(indicatorTemp).map(function (key) {
      return {
        name: key,
        max: Math.max.apply(null, indicatorTemp[key])
      };
    });
    return settingBase;
  },
  getRadarSeries: function getRadarSeries(_ref4) {
    var rows = _ref4.rows,
        dimension = _ref4.dimension,
        measures = _ref4.measures,
        radar = _ref4.radar;

    var radarIndexObj = {};
    radar.indicator.forEach(function (item, index) {
      radarIndexObj[item.name] = index;
    });

    var series = rows.map(function (row) {
      var seriesBase = {
        name: row[dimension],
        type: 'radar',
        data: []
      };
      var dataArr = [];
      Object.keys(row).forEach(function (key) {
        if (~measures.indexOf(key)) dataArr[radarIndexObj[key]] = row[key];
      });
      seriesBase.data.push(dataArr);
      return seriesBase;
    });
    return series;
  }
};

var radar = function radar(columns, rows, settings) {
  var _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? {} : _settings$dataType,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension;

  var measures = columns.slice();
  if (settings.measures) {
    measures = settings.measures;
  } else {
    measures.splice(columns.indexOf(dimension), 1);
  }
  var legend = dataHandler.getRadarLegend({ rows: rows, dimension: dimension });
  var radar = dataHandler.getRadarSetting({ rows: rows, dimension: dimension, measures: measures });
  var tooltip = dataHandler.getRadarTooltip({ dataType: dataType, radar: radar });
  var series = dataHandler.getRadarSeries({ rows: rows, dimension: dimension, measures: measures, radar: radar });
  var options = { legend: legend, tooltip: tooltip, radar: radar, series: series };
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
  name: 'VeRadar',
  mixins: [chartMixin],
  created: function created() {
    this.chartHandler = radar;
    this.echartsLib = echarts;
  }
};

module.exports = index;
