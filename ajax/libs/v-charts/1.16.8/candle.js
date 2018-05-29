(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('echarts/lib/echarts'), require('echarts/lib/component/tooltip'), require('echarts/lib/component/legend'), require('echarts/lib/chart/bar'), require('echarts/lib/chart/line'), require('echarts/lib/chart/candlestick'), require('echarts/lib/component/visualMap'), require('echarts/lib/component/dataZoom')) :
	typeof define === 'function' && define.amd ? define(['echarts/lib/echarts', 'echarts/lib/component/tooltip', 'echarts/lib/component/legend', 'echarts/lib/chart/bar', 'echarts/lib/chart/line', 'echarts/lib/chart/candlestick', 'echarts/lib/component/visualMap', 'echarts/lib/component/dataZoom'], factory) :
	(global.VeCandle = factory(global.echarts));
}(this, (function (echarts) { 'use strict';

echarts = 'default' in echarts ? echarts['default'] : echarts;

echarts.registerTheme('ve-chart', {
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

var color = ['#19d4ae', '#5ab1ef', '#fa6e86', '#ffb980', '#0067a6', '#c4b4e4', '#d87a80', '#9cbbff', '#d9d0c7', '#87a997', '#d49ea2', '#5b4947', '#7ba3a8'];

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
  var defaultVal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '-';

  if (val == null || isNaN(val)) return defaultVal;
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















var getType = function getType(v) {
  return Object.prototype.toString.call(v);
};

var toKebab = function toKebab(v) {
  return v.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

var isArray = function isArray(v) {
  return getType(v) === '[object Array]';
};

var isObject = function isObject(v) {
  return getType(v) === '[object Object]';
};

var DEFAULT_MA = [5, 10, 20, 30];
var DEFAULT_K_NAME = '日K';
var DEFAULT_DOWN_COLOR = '#ec0000';
var DEFAULT_UP_COLOR = '#00da3c';
var DEFAULT_START = 50;
var DEFAULT_END = 100;
var SHOW_FALSE = { show: false };

function getCandleLegend(args) {
  var showMA = args.showMA,
      MA = args.MA,
      legendName = args.legendName,
      labelMap = args.labelMap;

  var data = [DEFAULT_K_NAME];
  if (showMA) data = data.concat(MA.map(function (v) {
    return 'MA' + v;
  }));
  if (labelMap) data = data.map(function (v) {
    return labelMap[v] == null ? v : labelMap[v];
  });
  return {
    data: data,
    formatter: function formatter(name) {
      return legendName[name] != null ? legendName[name] : name;
    }
  };
}

function getCandleTooltip(args) {
  var metrics = args.metrics,
      dataType = args.dataType,
      digit = args.digit,
      labelMap = args.labelMap;

  return {
    trigger: 'axis',
    axisPointer: { type: 'cross' },
    position: function position(pos, params, el, elRect, size) {
      var result = { top: 10 };
      var side = pos[0] < size.viewSize[0] / 2 ? 'right' : 'left';
      result[side] = 60;
      return result;
    },
    formatter: function formatter(options) {
      var tpl = [];
      tpl.push(options[0].axisValue + '<br>');
      options.forEach(function (option) {
        var data = option.data,
            seriesName = option.seriesName,
            componentSubType = option.componentSubType,
            color$$1 = option.color;

        var name = labelMap[seriesName] == null ? seriesName : labelMap[seriesName];
        tpl.push(itemPoint(color$$1) + ' ' + name + ': ');
        if (componentSubType === 'candlestick') {
          tpl.push('<br>');
          metrics.slice(0, 4).forEach(function (m, i) {
            var val = getFormated(data[i + 1], dataType, digit);
            tpl.push('- ' + m + ': ' + val + '<br>');
          });
        } else if (componentSubType === 'line') {
          var val = getFormated(data, dataType, digit);
          tpl.push(val + '<br>');
        } else if (componentSubType === 'bar') {
          var _val = getFormated(data[1], dataType, digit);
          tpl.push(_val + '<br>');
        }
      });
      return tpl.join('');
    }
  };
}

function getCandleVisualMap(args) {
  var downColor = args.downColor,
      upColor = args.upColor,
      MA = args.MA,
      showMA = args.showMA;

  return {
    show: false,
    seriesIndex: showMA ? 1 + MA.length : 1,
    dimension: 2,
    pieces: [{ value: 1, color: downColor }, { value: -1, color: upColor }]
  };
}

function getCandleGrid(args) {
  var showVol = args.showVol;

  return [{
    left: '10%',
    right: '8%',
    top: '10%',
    height: showVol ? '50%' : '65%',
    containLabel: false
  }, {
    left: '10%',
    right: '8%',
    top: '65%',
    height: '16%',
    containLabel: false
  }];
}

function getCandleXAxis(args) {
  var data = args.dims;

  var type = 'category';
  var scale = true;
  var boundaryGap = false;
  var splitLine = SHOW_FALSE;
  var axisLine = { onZero: false };
  var axisTick = SHOW_FALSE;
  var axisLabel = SHOW_FALSE;
  var min = 'dataMin';
  var max = 'dataMax';
  var gridIndex = 1;

  return [{ type: type, data: data, scale: scale, boundaryGap: boundaryGap, axisLine: axisLine, splitLine: splitLine, min: min, max: max }, { type: type, gridIndex: gridIndex, data: data, scale: scale, boundaryGap: boundaryGap, axisLine: axisLine, axisTick: axisTick, splitLine: splitLine, axisLabel: axisLabel, min: min, max: max }];
}

function getCandleYAxis(args) {
  var dataType = args.dataType,
      digit = args.digit;

  var scale = true;
  var gridIndex = 1;
  var splitNumber = 2;
  var axisLine = SHOW_FALSE;
  var axisTick = SHOW_FALSE;
  var axisLabel = SHOW_FALSE;
  var splitLine = SHOW_FALSE;
  var formatter = function formatter(val) {
    return getFormated(val, dataType, digit);
  };

  return [{ scale: scale, axisTick: axisTick, axisLabel: { formatter: formatter } }, { scale: scale, gridIndex: gridIndex, splitNumber: splitNumber, axisLine: axisLine, axisTick: axisTick, splitLine: splitLine, axisLabel: axisLabel }];
}

function getCandleDataZoom(args) {
  var start = args.start,
      end = args.end;


  return [{
    type: 'inside',
    xAxisIndex: [0, 1],
    start: start,
    end: end
  }, {
    show: true,
    xAxisIndex: [0, 1],
    type: 'slider',
    top: '85%',
    start: start,
    end: end
  }];
}

function getCandleSeries(args) {
  var values = args.values,
      volumes = args.volumes,
      upColor = args.upColor,
      downColor = args.downColor,
      showMA = args.showMA,
      MA = args.MA,
      showVol = args.showVol,
      labelMap = args.labelMap,
      digit = args.digit,
      itemStyle = args.itemStyle;

  var style = itemStyle || {
    normal: {
      color: upColor,
      color0: downColor,
      borderColor: null,
      borderColor0: null
    }
  };
  var lineStyle = { normal: { opacity: 0.5 } };
  var series = [{
    name: labelMap[DEFAULT_K_NAME] == null ? DEFAULT_K_NAME : labelMap[DEFAULT_K_NAME],
    type: 'candlestick',
    data: values,
    itemStyle: style
  }];

  if (showMA) {
    MA.forEach(function (d) {
      var name = 'MA' + d;
      series.push({
        name: labelMap[name] == null ? name : labelMap[name],
        data: calculateMA(d, values, digit),
        type: 'line',
        lineStyle: lineStyle,
        smooth: true
      });
    });
  }

  if (showVol) {
    series.push({
      name: 'Volume',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: volumes
    });
  }

  return series;
}

function calculateMA(dayCount, data, digit) {
  var result = [];
  data.forEach(function (d, i) {
    if (i < dayCount) {
      result.push('-');
    } else {
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
        sum += data[i - j][1];
      }result.push(+(sum / dayCount).toFixed(digit));
    }
  });
  return result;
}

var candle = function candle(columns, rows, settings, status) {
  var _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$metrics = settings.metrics,
      metrics = _settings$metrics === undefined ? columns.slice(1, 6) : _settings$metrics,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit,
      itemStyle = settings.itemStyle,
      _settings$labelMap = settings.labelMap,
      labelMap = _settings$labelMap === undefined ? {} : _settings$labelMap,
      _settings$legendName = settings.legendName,
      legendName = _settings$legendName === undefined ? {} : _settings$legendName,
      _settings$MA = settings.MA,
      MA = _settings$MA === undefined ? DEFAULT_MA : _settings$MA,
      _settings$showMA = settings.showMA,
      showMA = _settings$showMA === undefined ? false : _settings$showMA,
      _settings$showVol = settings.showVol,
      showVol = _settings$showVol === undefined ? false : _settings$showVol,
      _settings$showDataZoo = settings.showDataZoom,
      showDataZoom = _settings$showDataZoo === undefined ? false : _settings$showDataZoo,
      _settings$downColor = settings.downColor,
      downColor = _settings$downColor === undefined ? DEFAULT_DOWN_COLOR : _settings$downColor,
      _settings$upColor = settings.upColor,
      upColor = _settings$upColor === undefined ? DEFAULT_UP_COLOR : _settings$upColor,
      _settings$start = settings.start,
      start = _settings$start === undefined ? DEFAULT_START : _settings$start,
      _settings$end = settings.end,
      end = _settings$end === undefined ? DEFAULT_END : _settings$end,
      dataType = settings.dataType;
  var tooltipVisible = status.tooltipVisible,
      legendVisible = status.legendVisible;


  var isLiteData = isArray(rows[0]);
  var dims = [];
  var values = [];
  var volumes = [];
  var candleMetrics = metrics.slice(0, 4);
  var volumeMetrics = metrics[4];

  if (isLiteData) {
    rows.forEach(function (row) {
      var itemResult = [];
      dims.push(row[columns.indexOf(dimension)]);
      candleMetrics.forEach(function (item) {
        itemResult.push(row[columns.indexOf(item)]);
      });
      values.push(itemResult);
      if (volumeMetrics) volumes.push(row[columns.indexOf(volumeMetrics)]);
    });
  } else {
    rows.forEach(function (row, index) {
      var itemResult = [];
      dims.push(row[dimension]);
      candleMetrics.forEach(function (item) {
        itemResult.push(row[item]);
      });
      values.push(itemResult);
      if (volumeMetrics) {
        var _status = row[metrics[0]] > row[metrics[1]] ? 1 : -1;
        volumes.push([index, row[volumeMetrics], _status]);
      }
    });
  }

  var legend = legendVisible && getCandleLegend({ showMA: showMA, MA: MA, legendName: legendName, labelMap: labelMap });
  var tooltip = tooltipVisible && getCandleTooltip({ metrics: metrics, dataType: dataType, digit: digit, labelMap: labelMap });
  var visualMap = showVol && getCandleVisualMap({ downColor: downColor, upColor: upColor, MA: MA, showMA: showMA });
  var dataZoom = showDataZoom && getCandleDataZoom({ start: start, end: end });
  var grid = getCandleGrid({ showVol: showVol });
  var xAxis = getCandleXAxis({ dims: dims });
  var yAxis = getCandleYAxis({ dataType: dataType, digit: digit });
  var series = getCandleSeries({
    values: values,
    volumes: volumes,
    upColor: upColor,
    downColor: downColor,
    showMA: showMA,
    MA: MA,
    showVol: showVol,
    labelMap: labelMap,
    digit: digit,
    itemStyle: itemStyle
  });
  var axisPointer = { link: { xAxisIndex: 'all' } };
  return { legend: legend, tooltip: tooltip, visualMap: visualMap, grid: grid, xAxis: xAxis, yAxis: yAxis, dataZoom: dataZoom, series: series, axisPointer: axisPointer };
};

var Loading = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "v-charts-component-loading" }, [_c('div', { staticClass: "loader" }, [_c('div', { staticClass: "loading-spinner" }, [_c('svg', { staticClass: "circular", attrs: { "viewBox": "25 25 50 50" } }, [_c('circle', { staticClass: "path", attrs: { "cx": "50", "cy": "50", "r": "20", "fill": "none" } })])])])]);
  }, staticRenderFns: []
};

var DataEmpty = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "v-charts-data-empty" }, [_vm._v(" 暂无数据 ")]);
  }, staticRenderFns: []
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var Core = {
  render: function render(h) {
    return h('div', {
      class: [toKebab(this.$options.name || this.$options._componentTag)],
      style: this.canvasStyle
    }, [h('div', {
      style: this.canvasStyle,
      ref: 'canvas'
    }), h(Loading, {
      style: { display: this.loading ? '' : 'none' }
    }), h(DataEmpty, {
      style: { display: this.dataEmpty ? '' : 'none' }
    }), this.$slots.default]);
  },


  props: {
    data: { type: [Object, Array], default: function _default() {
        return {};
      }
    },
    settings: { type: Object, default: function _default() {
        return {};
      }
    },
    width: { type: String, default: 'auto' },
    height: { type: String, default: '400px' },
    beforeConfig: { type: Function },
    afterConfig: { type: Function },
    afterSetOption: { type: Function },
    afterSetOptionOnce: { type: Function },
    events: { type: Object },
    grid: { type: [Object, Array] },
    colors: { type: Array },
    tooltipVisible: { type: Boolean, default: true },
    legendVisible: { type: Boolean, default: true },
    legendPosition: { type: String },
    markLine: { type: Object },
    markArea: { type: Object },
    markPoint: { type: Object },
    visualMap: { type: [Object, Array] },
    dataZoom: { type: [Object, Array] },
    toolbox: { type: [Object, Array] },
    initOptions: { type: Object, default: function _default() {
        return {};
      }
    },
    title: Object,
    legend: [Object, Array],
    xAxis: [Object, Array],
    yAxis: [Object, Array],
    radar: Object,
    tooltip: Object,
    axisPointer: Object,
    brush: [Object, Array],
    geo: Object,
    timeline: [Object, Array],
    graphic: [Object, Array],
    series: [Object, Array],
    backgroundColor: [Object, String],
    textStyle: Object,
    animation: Object,
    theme: Object,
    themeName: String,
    loading: Boolean,
    dataEmpty: Boolean,
    extend: Object,
    judgeWidth: { type: Boolean, default: true },
    widthChangeDelay: { type: Number, default: 300 },
    tooltipFormatter: { type: Function }
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
    },

    events: {
      deep: true,
      handler: function handler() {
        this.createEventProxy();
      }
    },

    theme: {
      deep: true,
      handler: function handler(v) {
        this.themeChange(v);
      }
    },

    themeName: function themeName(v) {
      this.themeChange(v);
    }
  },

  computed: {
    canvasStyle: function canvasStyle() {
      return {
        width: this.width,
        height: this.height,
        position: 'relative'
      };
    },
    chartColor: function chartColor() {
      return this.colors || this.theme && this.theme.color || color;
    }
  },

  methods: {
    dataHandler: function dataHandler(data) {
      if (!this.chartHandler) return;
      var _data = data,
          _data$columns = _data.columns,
          columns = _data$columns === undefined ? [] : _data$columns,
          _data$rows = _data.rows,
          rows = _data$rows === undefined ? [] : _data$rows;

      var extra = {
        tooltipVisible: this.tooltipVisible,
        legendVisible: this.legendVisible,
        echarts: this.echarts,
        color: this.chartColor,
        tooltipFormatter: this.tooltipFormatter
      };
      if (this.beforeConfig) data = this.beforeConfig(data);

      var options = this.chartHandler(columns, rows, this.settings, extra);
      if (options) {
        if (typeof options.then === 'function') {
          options.then(this.optionsHandler);
        } else {
          this.optionsHandler(options);
        }
      }
    },
    resize: function resize() {
      this.echarts.resize();
    },
    optionsHandler: function optionsHandler(options) {
      var _this = this;

      if (this.legendPosition && options.legend) {
        options.legend[this.legendPosition] = 10;
        if (~['left', 'right'].indexOf(this.legendPosition)) {
          options.legend.top = 'middle';
          options.legend.orient = 'vertical';
        }
      }
      if (!this.themeName) options.color = this.chartColor;
      var echartsSettings = ['grid', 'dataZoom', 'visualMap', 'toolbox', 'title', 'legend', 'xAxis', 'yAxis', 'radar', 'tooltip', 'axisPointer', 'brush', 'geo', 'timeline', 'graphic', 'series', 'backgroundColor', 'textStyle'];
      echartsSettings.forEach(function (setting) {
        if (_this[setting]) options[setting] = _this[setting];
      });
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
        if (getType(series) === '[object Array]') {
          series.forEach(function (item) {
            _this.addMark(item, marks);
          });
        } else if (getType(series) === '[object Object]') {
          this.addMark(series, marks);
        }
      }

      // extend sub attribute
      if (this.extend) {
        Object.keys(this.extend).forEach(function (attr) {
          if (typeof _this.extend[attr] === 'function') {
            // get callback value
            options[attr] = _this.extend[attr](options[attr]);
          } else {
            // mixin extend value
            if (isArray(options[attr]) && isObject(options[attr][0])) {
              // eg: [{ xx: 1 }, { xx: 2 }]
              options[attr].forEach(function (option, index) {
                options[attr][index] = _extends({}, option, _this.extend[attr]);
              });
            } else if (isObject(options[attr])) {
              // eg: { xx: 1, yy: 2 }
              options[attr] = _extends({}, options[attr], _this.extend[attr]);
            } else {
              options[attr] = _this.extend[attr];
            }
          }
        });
      }

      if (this.afterConfig) options = this.afterConfig(options);
      this.echarts.setOption(options, true);
      this.$emit('ready', this.echarts);
      if (!this._once['ready-once']) {
        this._once['ready-once'] = true;
        this.$emit('ready-once', this.echarts);
      }
      if (this.judgeWidth) this.judgeWidthHandler(options);
      if (this.afterSetOption) this.afterSetOption(this.echarts);
      if (this.afterSetOptionOnce && !this._once['afterSetOptionOnce']) {
        this._once['afterSetOptionOnce'] = this.afterSetOptionOnce(this.echarts);
      }
    },
    judgeWidthHandler: function judgeWidthHandler(options) {
      var _this2 = this;

      var echarts$$1 = this.echarts,
          widthChangeDelay = this.widthChangeDelay;

      if (this.$el.clientWidth) {
        echarts$$1 && echarts$$1.resize();
      } else {
        this.$nextTick(function (_) {
          if (_this2.$el.clientWidth) {
            echarts$$1 && echarts$$1.resize();
          } else {
            setTimeout(function (_) {
              echarts$$1 && echarts$$1.resize();
              if (!_this2.$el.clientWidth) {
                console.warn(' Can\'t get dom width or height ');
              }
            }, widthChangeDelay);
          }
        });
      }
    },
    addMark: function addMark(seriesItem, marks) {
      Object.keys(marks).forEach(function (key) {
        if (marks[key]) {
          seriesItem[key] = marks[key];
        }
      });
    },
    init: function init() {
      if (this.echarts) return;
      var themeName = this.themeName || this.theme || 've-chart';
      this.echarts = this.echartsLib.init(this.$refs.canvas, themeName, this.initOptions);
      if (this.data) this.dataHandler(this.data);
      this.createEventProxy();
      window.addEventListener('resize', this.echarts.resize);
    },
    addWatchToProps: function addWatchToProps() {
      var _this3 = this;

      var watchedVariable = this._watchers.map(function (watcher) {
        return watcher.expression;
      });
      Object.keys(this.$props).forEach(function (prop) {
        if (!~watchedVariable.indexOf(prop)) {
          var opts = {};
          if (getType(_this3.$props[prop]) === '[object Object]') {
            opts.deep = true;
          }
          _this3.$watch(prop, function () {
            _this3.dataHandler(_this3.data);
          }, opts);
        }
      });
    },
    createEventProxy: function createEventProxy() {
      var _this4 = this;

      // 只要用户使用 on 方法绑定的事件都做一层代理，
      // 是否真正执行相应的事件方法取决于该方法是否仍然存在 events 中
      // 实现 events 的动态响应
      var self = this;
      var keys = Object.keys(this.events || {});
      keys.length && keys.forEach(function (ev) {
        if (_this4.registeredEvents.indexOf(ev) === -1) {
          _this4.registeredEvents.push(ev);
          _this4.echarts.on(ev, function (ev) {
            return function () {
              if (ev in self.events) {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                self.events[ev].apply(null, args);
              }
            };
          }(ev));
        }
      });
    },
    themeChange: function themeChange(theme) {
      this.clean();
      this.echarts = null;
      this.init();
    },
    clean: function clean() {
      window.removeEventListener('resize', this.echarts.resize);
      this.echarts.dispose();
    }
  },

  created: function created() {
    this.echarts = null;
    this.registeredEvents = [];
    this._once = {};
    this.addWatchToProps();
  },
  mounted: function mounted() {
    this.init();
  },
  beforeDestroy: function beforeDestroy() {
    this.clean();
  }
};

var index = {
  name: 'VeCandle',
  mixins: [Core],
  created: function created() {
    this.chartHandler = candle;
    this.echartsLib = echarts;
  }
};

return index;

})));
