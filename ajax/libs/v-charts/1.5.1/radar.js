'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var echarts = _interopDefault(require('echarts/lib/echarts'));
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/chart/radar');

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

function getRadarLegend(rows, dimension) {
  var legendData = rows.map(function (row) {
    return row[dimension];
  });

  return { data: legendData };
}

function getRadarTooltip(dataType, radar, digit) {
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
      item.data.value.forEach(function (val, index) {
        tpl.push(nameTemp[index] + ': ');
        tpl.push(getFormated(val, typeTemp[index], digit) + '<br />');
      });
      return tpl.join('');
    }
  };
}

function getRadarSetting(rows, metrics) {
  var settingBase = {
    indicator: [],
    shape: 'circle',
    splitNumber: 5
  };
  var indicatorTemp = {};
  rows.forEach(function (items) {
    metrics.forEach(function (item) {
      if (!indicatorTemp[item]) {
        indicatorTemp[item] = [items[item]];
      } else {
        indicatorTemp[item].push(items[item]);
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
}

function getRadarSeries(args) {
  var rows = args.rows,
      dimension = args.dimension,
      metrics = args.metrics,
      radar = args.radar;

  var radarIndexObj = {};
  radar.indicator.forEach(function (item, index) {
    radarIndexObj[item.name] = index;
  });

  var seriesData = rows.map(function (row) {
    var serieData = {
      value: [],
      name: row[dimension]
    };
    Object.keys(row).forEach(function (key) {
      if (~metrics.indexOf(key)) {
        serieData.value[radarIndexObj[key]] = row[key];
      }
    });
    return serieData;
  });
  return [{
    name: dimension,
    type: 'radar',
    data: seriesData
  }];
}

var radar = function radar(columns, rows, settings, extra) {
  var _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? {} : _settings$dataType,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit;
  var tooltipVisible = extra.tooltipVisible,
      legendVisible = extra.legendVisible;

  var metrics = columns.slice();
  if (settings.metrics) {
    metrics = settings.metrics;
  } else {
    metrics.splice(columns.indexOf(dimension), 1);
  }
  var legend = legendVisible && getRadarLegend(rows, dimension);
  var radar = getRadarSetting(rows, metrics);
  var tooltip = tooltipVisible && getRadarTooltip(dataType, radar, digit);
  var series = getRadarSeries({ rows: rows, dimension: dimension, metrics: metrics, radar: radar });
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
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-radar", style: _vm.canvasStyle });
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
