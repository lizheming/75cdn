'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var echarts = _interopDefault(require('echarts/lib/echarts'));
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');
require('echarts/lib/chart/pie');

var tipPointStyle = [// TODO: delete
'display: inline-block;', 'width: 10px;', 'height: 10px;', 'border-radius: 50%;', 'margin-right:2px;'].join('');

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

var pieRadius = 100;
var ringRadius = [80, 100];
var pieOffsetY = 200;

var dataHandler = {
  getPieSeries: function getPieSeries(args) {
    var rows = args.rows,
        dataType = args.dataType,
        percentShow = args.percentShow,
        dimension = args.dimension,
        measure = args.measure,
        radius = args.radius,
        offsetY = args.offsetY;


    var series = {
      type: 'pie',
      radius: radius,
      data: [],
      center: ['50%', offsetY]
    };
    if (percentShow) {
      series.label = {
        normal: {
          show: true,
          formatter: function formatter(item) {
            var tpl = [];
            tpl.push(item.name + ':');
            tpl.push(getFormated(item.value, dataType));
            tpl.push('(' + item.percent + '%)');
            return tpl.join(' ');
          }
        }
      };
    }
    series.data = rows.map(function (row) {
      return { name: row[dimension], value: row[measure] };
    });

    return series;
  },
  getPieLegend: function getPieLegend(_ref) {
    var rows = _ref.rows,
        dimension = _ref.dimension,
        legendLimit = _ref.legendLimit;

    var legend = rows.map(function (row) {
      return row[dimension];
    });
    return legend.length ? { data: legend, show: legend.length < legendLimit } : false;
  },
  getPieTooltip: function getPieTooltip(dataType) {
    return {
      formatter: function formatter(item) {
        var tpl = [];
        tpl.push(itemPoint(item.color));
        tpl.push(item.name + ':');
        tpl.push(getFormated(item.value, dataType));
        tpl.push('(' + item.percent + '%)');
        return tpl.join(' ');
      }
    };
  }
};

var pie = function pie(columns, rows, settings, isRing) {
  var _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? 'normal' : _settings$dataType,
      percentShow = settings.percentShow,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$measure = settings.measure,
      measure = _settings$measure === undefined ? columns[1] : _settings$measure,
      _settings$radius = settings.radius,
      radius = _settings$radius === undefined ? isRing ? ringRadius : pieRadius : _settings$radius,
      _settings$offsetY = settings.offsetY,
      offsetY = _settings$offsetY === undefined ? pieOffsetY : _settings$offsetY,
      _settings$legendLimit = settings.legendLimit,
      legendLimit = _settings$legendLimit === undefined ? 30 : _settings$legendLimit;


  var series = dataHandler.getPieSeries({
    rows: rows, dataType: dataType, percentShow: percentShow, dimension: dimension, measure: measure, radius: radius, offsetY: offsetY
  });
  var legend = dataHandler.getPieLegend({ rows: rows, dimension: dimension, legendLimit: legendLimit });
  var tooltip = dataHandler.getPieTooltip(dataType);
  if (!legend) return false;
  var options = { series: series, legend: legend, tooltip: tooltip };
  return options;
};

var ring$1 = function ring(columns, rows, settings) {
  return pie(columns, rows, settings, true);
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

var ring$$1 = {
  render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", style: _vm.canvasStyle });
  },
  staticRenderFns: [],
  name: 'VeRing',
  mixins: [chartMixin],
  created: function created() {
    this.chartHandler = ring$1;
    this.echartsLib = echarts;
  }
};

module.exports = ring$$1;
