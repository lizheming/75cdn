import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/funnel';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/map';
import 'echarts/extension/bmap/bmap';

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



var getStackMap = function getStackMap(stack) {
  var stackMap = {};
  Object.keys(stack).forEach(function (item) {
    stack[item].forEach(function (name) {
      stackMap[name] = item;
    });
  });
  return stackMap;
};

var $get = function $get(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(null);
    xhr.onload = function () {
      resolve(JSON.parse(xhr.responseText));
    };
    xhr.onerror = function () {
      reject(JSON.parse(xhr.responseText));
    };
  });
};

var MAP_URL_PREFIX = 'https://unpkg.com/echarts@3.6.2/map/json/';

var getMapJSON = function getMapJSON(position) {
  return $get('' + MAP_URL_PREFIX + position + '.json');
};

var mapPromise = null;

var getBmap = function getBmap(key) {
  if (!mapPromise) {
    mapPromise = new Promise(function (resolve, reject) {
      var callbackName = 'bmap' + Date.now();
      window[callbackName] = resolve;
      var script = document.createElement('script');
      script.src = ['https://api.map.baidu.com/api?v=2.0', 'ak=' + key, 'callback=' + callbackName].join('&');

      document.body.appendChild(script);
    });
  }
  return mapPromise;
};

var clone = function clone(v) {
  return JSON.parse(JSON.stringify(v));
};

var getType = function getType(v) {
  return Object.prototype.toString.call(v);
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

function getBarDimAxis(args) {
  var innerRows = args.innerRows,
      dimAxisName = args.dimAxisName,
      dimension = args.dimension,
      axisVisible = args.axisVisible;

  return dimension.map(function (item) {
    return {
      type: 'category',
      name: dimAxisName,
      nameLocation: 'middle',
      nameGap: 22,
      data: innerRows.map(function (row) {
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
      digit = args.digit,
      scale = args.scale,
      min = args.min,
      max = args.max;

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
      meaAxis[i] = _extends({}, meaAxisBase, {
        axisLabel: {
          formatter: function formatter(val) {
            return getFormated(val, meaAxisType[i], digit);
          }
        }
      });
    } else {
      meaAxis[i] = _extends({}, meaAxisBase);
    }
    meaAxis[i].name = meaAxisName[i] || '';
    meaAxis[i].scale = scale[i] || false;
    meaAxis[i].min = min[i] || null;
    meaAxis[i].max = max[i] || null;
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
      digit = args.digit,
      labelMap = args.labelMap;

  var secondAxis = isHistogram ? axisSite.right : axisSite.top;
  if (labelMap) {
    secondAxis = secondAxis.map(function (item) {
      return labelMap[item] === undefined ? item : labelMap[item];
    });
  }
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
  var innerRows = args.innerRows,
      metrics = args.metrics,
      stack = args.stack,
      axisSite = args.axisSite,
      isHistogram = args.isHistogram,
      labelMap = args.labelMap,
      itemStyle = args.itemStyle,
      label = args.label,
      _args$showLine = args.showLine,
      showLine = _args$showLine === undefined ? [] : _args$showLine;

  var series = [];
  var seriesTemp = {};
  var secondAxis = isHistogram ? axisSite.right : axisSite.top;
  var secondDimAxisIndex = isHistogram ? 'yAxisIndex' : 'xAxisIndex';
  var stackMap = stack && getStackMap(stack);
  metrics.forEach(function (item) {
    seriesTemp[item] = [];
  });
  innerRows.forEach(function (row) {
    metrics.forEach(function (item) {
      seriesTemp[item].push(row[item]);
    });
  });
  series = Object.keys(seriesTemp).map(function (item) {
    var seriesItem = defineProperty({
      name: labelMap && labelMap[item] || item,
      type: ~showLine.indexOf(item) ? 'line' : 'bar',
      data: seriesTemp[item]
    }, secondDimAxisIndex, ~secondAxis.indexOf(item) ? '1' : '0');

    if (stack && stackMap[item]) seriesItem.stack = stackMap[item];

    if (label) seriesItem.label = label;
    if (itemStyle) seriesItem.itemStyle = itemStyle;

    return seriesItem;
  });

  return series.length ? series : false;
}

function getLegend(args) {
  var metrics = args.metrics,
      labelMap = args.labelMap,
      legendName = args.legendName;

  if (!legendName && !labelMap) return { data: metrics };
  var data = labelMap ? metrics.map(function (item) {
    return labelMap[item] == null ? item : labelMap[item];
  }) : metrics;
  return {
    data: data,
    formatter: function formatter(name) {
      return legendName && legendName[name] || name;
    }
  };
}

var bar = function bar(columns, rows, settings, extra) {
  var innerRows = clone(rows);
  var _settings$axisSite = settings.axisSite,
      axisSite = _settings$axisSite === undefined ? { top: [] } : _settings$axisSite,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? [columns[0]] : _settings$dimension,
      _settings$stack = settings.stack,
      stack = _settings$stack === undefined ? {} : _settings$stack,
      _settings$axisVisible = settings.axisVisible,
      axisVisible = _settings$axisVisible === undefined ? true : _settings$axisVisible,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit,
      _settings$dataOrder = settings.dataOrder,
      dataOrder = _settings$dataOrder === undefined ? false : _settings$dataOrder,
      _settings$scale = settings.scale,
      scale = _settings$scale === undefined ? [false, false] : _settings$scale,
      _settings$min = settings.min,
      min = _settings$min === undefined ? [null, null] : _settings$min,
      _settings$max = settings.max,
      max = _settings$max === undefined ? [null, null] : _settings$max,
      legendName = settings.legendName,
      labelMap = settings.labelMap,
      label = settings.label,
      itemStyle = settings.itemStyle,
      showLine = settings.showLine;
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

  if (dataOrder) {
    var _label = dataOrder.label,
        order = dataOrder.order;

    if (!_label || !order) {
      console.warn('Need to provide name and order parameters');
    } else {
      innerRows.sort(function (a, b) {
        if (order === 'desc') {
          return a[_label] - b[_label];
        } else {
          return b[_label] - a[_label];
        }
      });
    }
  }

  var legend = legendVisible && getLegend({ metrics: metrics, labelMap: labelMap, legendName: legendName });
  var yAxis = getBarDimAxis({ innerRows: innerRows, dimAxisName: dimAxisName, dimension: dimension, axisVisible: axisVisible });
  var xAxis = getBarMeaAxis({ meaAxisName: meaAxisName, meaAxisType: meaAxisType, axisVisible: axisVisible, digit: digit, scale: scale, min: min, max: max });
  var series = getBarSeries({ innerRows: innerRows, metrics: metrics, stack: stack, axisSite: axisSite, isHistogram: isHistogram, labelMap: labelMap, itemStyle: itemStyle, label: label, showLine: showLine });
  var tooltipParams = { axisSite: axisSite, isHistogram: isHistogram, meaAxisType: meaAxisType, digit: digit, labelMap: labelMap };
  var tooltip = tooltipVisible && getBarTooltip(tooltipParams);
  var options = { legend: legend, yAxis: yAxis, series: series, xAxis: xAxis, tooltip: tooltip };
  return options;
};

var histogram = function histogram(columns, rows, settings, status) {
  var innerRows = clone(rows);
  var _settings$axisSite2 = settings.axisSite,
      axisSite = _settings$axisSite2 === undefined ? { right: [] } : _settings$axisSite2,
      _settings$dimension2 = settings.dimension,
      dimension = _settings$dimension2 === undefined ? [columns[0]] : _settings$dimension2,
      _settings$stack2 = settings.stack,
      stack = _settings$stack2 === undefined ? {} : _settings$stack2,
      _settings$axisVisible2 = settings.axisVisible,
      axisVisible = _settings$axisVisible2 === undefined ? true : _settings$axisVisible2,
      _settings$digit2 = settings.digit,
      digit = _settings$digit2 === undefined ? 2 : _settings$digit2,
      _settings$dataOrder2 = settings.dataOrder,
      dataOrder = _settings$dataOrder2 === undefined ? false : _settings$dataOrder2,
      _settings$scale2 = settings.scale,
      scale = _settings$scale2 === undefined ? [false, false] : _settings$scale2,
      _settings$min2 = settings.min,
      min = _settings$min2 === undefined ? [null, null] : _settings$min2,
      _settings$max2 = settings.max,
      max = _settings$max2 === undefined ? [null, null] : _settings$max2,
      labelMap = settings.labelMap,
      legendName = settings.legendName,
      label = settings.label,
      itemStyle = settings.itemStyle,
      showLine = settings.showLine;


  if (dataOrder) {
    var _label2 = dataOrder.label,
        order = dataOrder.order;

    if (!_label2 || !order) {
      console.warn('Need to provide name and order parameters');
    } else {
      innerRows.sort(function (a, b) {
        if (order === 'desc') {
          return a[_label2] - b[_label2];
        } else {
          return b[_label2] - a[_label2];
        }
      });
    }
  }

  var tooltipVisible = status.tooltipVisible,
      legendVisible = status.legendVisible;

  var metrics = columns.slice();
  if (settings.metrics) {
    metrics = settings.metrics;
  } else {
    metrics.splice(columns.indexOf(dimension[0]), 1);
  }
  var meaAxisType = settings.yAxisType || ['normal', 'normal'];
  var meaAxisName = settings.yAxisName || [];
  var dimAxisName = settings.xAxisName || '';
  var isHistogram = true;

  var legend = legendVisible && getLegend({ metrics: metrics, labelMap: labelMap, legendName: legendName });
  var xAxis = getBarDimAxis({ innerRows: innerRows, dimAxisName: dimAxisName, dimension: dimension, axisVisible: axisVisible });
  var yAxis = getBarMeaAxis({ meaAxisName: meaAxisName, meaAxisType: meaAxisType, axisVisible: axisVisible, digit: digit, scale: scale, min: min, max: max });
  var series = getBarSeries({ innerRows: innerRows, metrics: metrics, stack: stack, axisSite: axisSite, isHistogram: isHistogram, labelMap: labelMap, itemStyle: itemStyle, label: label, showLine: showLine });
  var tooltipParams = { axisSite: axisSite, isHistogram: isHistogram, meaAxisType: meaAxisType, digit: digit, labelMap: labelMap };
  var tooltip = tooltipVisible && getBarTooltip(tooltipParams);
  var options = { legend: legend, yAxis: yAxis, series: series, xAxis: xAxis, tooltip: tooltip };
  return options;
};

var Core = {
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
    series: [Object, Array],
    backgroundColor: [Object, String],
    textStyle: Object,
    animation: Object,
    theme: Object,
    themeName: String
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
        color: this.chartColor
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
      if (this.afterConfig) options = this.afterConfig(options);
      this.echarts.setOption(options, true);
      if (this.afterSetOption) this.afterSetOption(this.echarts);
      if (this.afterSetOptionOnce && !this._once['afterSetOptionOnce']) {
        this._once['afterSetOptionOnce'] = this.afterSetOptionOnce(this.echarts);
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
      var themeName = this.themeName || (this.theme ? 'outer-theme' : 've-chart');
      this.echarts = this.echartsLib.init(this.$refs.canvas, themeName, this.initOptions);
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
          if (getType(prop) === '[object Object]') {
            opts.deep = true;
          }
          _this3.$watch(prop, function () {
            _this3.dataHandler(_this3.data);
          }, opts);
        }
      });
    },
    registerTheme: function registerTheme() {
      echarts.registerTheme('outer-theme', this.theme);
    }
  },

  created: function created() {
    this.echarts = null;
    this._once = {};
    this.addWatchToProps();
    if (this.theme) this.registerTheme();
  },
  mounted: function mounted() {
    this.init();
    window.addEventListener('resize', this.echarts.resize);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.echarts.resize);
    this.echarts.dispose();
  }
};

var VeBar = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-bar", style: _vm.canvasStyle });
  }, staticRenderFns: [],
  name: 'VeBar',
  mixins: [Core],
  created: function created() {
    this.chartHandler = bar;
    this.echartsLib = echarts;
  }
};

var VeHistogram = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-histogram", style: _vm.canvasStyle });
  }, staticRenderFns: [],
  name: 'VeHistogram',
  mixins: [Core],
  created: function created() {
    this.chartHandler = histogram;
    this.echartsLib = echarts;
  }
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
      nullAddZero = args.nullAddZero,
      labelMap = args.labelMap,
      label = args.label,
      itemStyle = args.itemStyle,
      lineStyle = args.lineStyle,
      areaStyle = args.areaStyle;

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
      name: labelMap && labelMap[item] || item,
      type: 'line',
      data: dataTemp[item]
    };

    if (area) seriesItem.areaStyle = { normal: {} };
    seriesItem.yAxisIndex = ~axisSite.right.indexOf(item) ? 1 : 0;

    if (stack && stackMap[item]) seriesItem.stack = stackMap[item];

    if (label) seriesItem.label = label;
    if (itemStyle) seriesItem.itemStyle = itemStyle;
    if (lineStyle) seriesItem.lineStyle = lineStyle;
    if (areaStyle) seriesItem.areaStyle = areaStyle;

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
      max = args.max,
      digit = args.digit;

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
      yAxis[i] = _extends({}, yAxisBase, {
        axisLabel: {
          formatter: function formatter(val) {
            return getFormated(val, yAxisType[i], digit);
          }
        }
      });
    } else {
      yAxis[i] = _extends({}, yAxisBase);
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

function getLineTooltip(args) {
  var axisSite = args.axisSite,
      yAxisType = args.yAxisType,
      digit = args.digit,
      labelMap = args.labelMap;

  var rightList = labelMap ? axisSite.right.map(function (item) {
    return labelMap[item] === undefined ? item : labelMap[item];
  }) : axisSite.right;
  return {
    trigger: 'axis',
    formatter: function formatter(items) {
      var tpl = [];
      tpl.push(items[0].name + '<br>');
      items.forEach(function (item) {
        var showData = null;
        var type = ~rightList.indexOf(item.seriesName) ? yAxisType[1] : yAxisType[0];
        showData = getFormated(item.data, type, digit);
        tpl.push(itemPoint(item.color));
        tpl.push(item.seriesName + ': ' + showData);
        tpl.push('<br>');
      });
      return tpl.join('');
    }
  };
}

function getLegend$1(args) {
  var metrics = args.metrics,
      legendName = args.legendName,
      labelMap = args.labelMap;

  if (!legendName && !labelMap) return { data: metrics };
  var data = labelMap ? metrics.map(function (item) {
    return labelMap[item] == null ? item : labelMap[item];
  }) : metrics;
  return {
    data: data,
    formatter: function formatter(name) {
      return legendName && legendName[name] || name;
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
      nullAddZero = _settings$nullAddZero === undefined ? false : _settings$nullAddZero,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit,
      legendName = settings.legendName,
      labelMap = settings.labelMap,
      label = settings.label,
      itemStyle = settings.itemStyle,
      lineStyle = settings.lineStyle,
      areaStyle = settings.areaStyle;
  var tooltipVisible = extra.tooltipVisible,
      legendVisible = extra.legendVisible;

  var metrics = columns.slice();

  if (settings.metrics) {
    metrics = settings.metrics;
  } else {
    metrics.splice(columns.indexOf(dimension[0]), 1);
  }

  var legend = legendVisible && getLegend$1({ metrics: metrics, legendName: legendName, labelMap: labelMap });
  var tooltip = tooltipVisible && getLineTooltip({
    axisSite: axisSite,
    yAxisType: yAxisType,
    digit: digit,
    labelMap: labelMap
  });
  var xAxis = getLineXAxis({ dimension: dimension, rows: rows, xAxisName: xAxisName, axisVisible: axisVisible });
  var yAxisParams = {
    yAxisName: yAxisName,
    yAxisType: yAxisType,
    axisVisible: axisVisible,
    scale: scale,
    min: min,
    max: max,
    digit: digit
  };
  var yAxis = getLineYAxis(yAxisParams);
  var seriesParams = {
    rows: rows,
    axisSite: axisSite,
    metrics: metrics,
    area: area,
    stack: stack,
    nullAddZero: nullAddZero,
    labelMap: labelMap,
    label: label,
    itemStyle: itemStyle,
    lineStyle: lineStyle,
    areaStyle: areaStyle
  };
  var series = getLineSeries(seriesParams);
  if (!xAxis || !series) return false;

  var options = { legend: legend, xAxis: xAxis, series: series, yAxis: yAxis, tooltip: tooltip };
  return options;
};

var VeLine = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-line", style: _vm.canvasStyle });
  }, staticRenderFns: [],
  name: 'VeLine',
  mixins: [Core],
  created: function created() {
    this.chartHandler = line;
    this.echartsLib = echarts;
  }
};

var pieRadius = 100;
var ringRadius = [80, 100];
var roseRingRadius = [20, 100];
var pieOffsetY = 200;

function getPieSeries(args) {
  var innerRows = args.innerRows,
      dataType = args.dataType,
      percentShow = args.percentShow,
      dimension = args.dimension,
      metrics = args.metrics,
      radius = args.radius,
      offsetY = args.offsetY,
      selectedMode = args.selectedMode,
      hoverAnimation = args.hoverAnimation,
      digit = args.digit,
      roseType = args.roseType,
      label = args.label,
      level = args.level,
      limitShowNum = args.limitShowNum,
      isRing = args.isRing;


  var series = [];
  var levelTemp = {};
  var rowsTemp = [];
  if (level) {
    level.forEach(function (levelItems, index) {
      levelItems.forEach(function (item) {
        levelTemp[item] = index;
      });
    });
    innerRows.forEach(function (row) {
      var itemLevel = levelTemp[row[dimension]];
      if (itemLevel !== undefined) {
        if (rowsTemp[itemLevel]) {
          rowsTemp[itemLevel].push(row);
        } else {
          rowsTemp[itemLevel] = [row];
        }
      }
    });
  } else {
    rowsTemp.push(innerRows);
  }
  var seriesBase = {
    type: 'pie',
    selectedMode: selectedMode,
    hoverAnimation: hoverAnimation,
    roseType: roseType,
    center: ['50%', offsetY]
  };
  var rowsTempLength = rowsTemp.length;
  rowsTemp.forEach(function (dataRows, index) {
    var seriesItem = _extends({ data: [] }, seriesBase);
    var centerWidth = radius / rowsTempLength;
    if (!index) {
      seriesItem.radius = isRing ? radius : centerWidth;
    } else {
      var outerWidth = centerWidth + radius / (2 * rowsTempLength) * (2 * index - 1);
      var innerWidth = outerWidth + radius / (2 * rowsTempLength);
      seriesItem.radius = [outerWidth, innerWidth];
    }
    if (rowsTempLength > 1 && index === 0) {
      seriesItem.label = {
        normal: { position: 'inner' }
      };
    }
    if (label) seriesItem.label = label;
    if (percentShow) {
      seriesItem.label = {
        normal: {
          show: true,
          position: rowsTempLength > 1 && index === 0 ? 'inner' : 'outside',
          formatter: function formatter(item) {
            var tpl = [];
            tpl.push(item.name + ':');
            tpl.push(getFormated(item.value, dataType, digit));
            tpl.push('(' + item.percent + '%)');
            return tpl.join(' ');
          }
        }
      };
    }
    seriesItem.data = dataRows.map(function (row) {
      return {
        name: row[dimension],
        value: row[metrics]
      };
    });
    series.push(seriesItem);
  });
  if (limitShowNum && limitShowNum < series[0].data.length) {
    var firstData = series[0].data;
    var remainArr = firstData.slice(limitShowNum, firstData.length);
    var sum = 0;
    remainArr.forEach(function (item) {
      sum += item.value;
    });
    series[0].data = firstData.slice(0, limitShowNum);
    series[0].data.push({ name: '其他', value: sum });
  }
  return series;
}

function getPieLegend(args) {
  var innerRows = args.innerRows,
      dimension = args.dimension,
      legendLimit = args.legendLimit,
      level = args.level,
      limitShowNum = args.limitShowNum;

  var legend = [];
  var levelTemp = [];
  if (level) {
    level.forEach(function (levelItem) {
      levelItem.forEach(function (item) {
        levelTemp.push(item);
      });
    });
    legend = levelTemp;
  } else if (limitShowNum && limitShowNum < innerRows.length) {
    for (var i = 0; i < limitShowNum; i++) {
      legend.push(innerRows[i][dimension]);
    }
    legend.push('其他');
  } else {
    legend = innerRows.map(function (row) {
      return row[dimension];
    });
  }
  return legend.length ? { data: legend, show: legend.length < legendLimit } : false;
}

function getPieTooltip(args) {
  var dataType = args.dataType,
      innerRows = args.innerRows,
      limitShowNum = args.limitShowNum,
      digit = args.digit,
      metrics = args.metrics,
      dimension = args.dimension;

  var sum = 0;
  var remainArr = innerRows.map(function (row) {
    sum += row[metrics];
    return {
      name: row[dimension],
      value: row[metrics]
    };
  }).slice(limitShowNum, innerRows.length);
  return {
    formatter: function formatter(item) {
      var tpl = [];
      tpl.push(itemPoint(item.color));
      if (limitShowNum && item.name === '其他') {
        tpl.push('其他:');
        remainArr.forEach(function (_ref) {
          var name = _ref.name,
              value = _ref.value;

          var percent = getFormated(value / sum, 'percent');
          tpl.push('<br>' + name + ':');
          tpl.push(getFormated(value, dataType, digit));
          tpl.push('(' + percent + ')');
        });
      } else {
        tpl.push(item.name + ':');
        tpl.push(getFormated(item.value, dataType, digit));
        tpl.push('(' + item.percent + '%)');
      }
      return tpl.join(' ');
    }
  };
}

var pie = function pie(columns, rows, settings, extra, isRing) {
  var innerRows = clone(rows);
  var _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? 'normal' : _settings$dataType,
      percentShow = settings.percentShow,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$metrics = settings.metrics,
      metrics = _settings$metrics === undefined ? columns[1] : _settings$metrics,
      _settings$roseType = settings.roseType,
      roseType = _settings$roseType === undefined ? false : _settings$roseType,
      _settings$radius = settings.radius,
      radius = _settings$radius === undefined ? isRing ? roseType ? roseRingRadius : ringRadius : pieRadius : _settings$radius,
      _settings$offsetY = settings.offsetY,
      offsetY = _settings$offsetY === undefined ? pieOffsetY : _settings$offsetY,
      _settings$legendLimit = settings.legendLimit,
      legendLimit = _settings$legendLimit === undefined ? 30 : _settings$legendLimit,
      _settings$selectedMod = settings.selectedMode,
      selectedMode = _settings$selectedMod === undefined ? false : _settings$selectedMod,
      _settings$hoverAnimat = settings.hoverAnimation,
      hoverAnimation = _settings$hoverAnimat === undefined ? true : _settings$hoverAnimat,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit,
      _settings$label = settings.label,
      label = _settings$label === undefined ? false : _settings$label,
      _settings$level = settings.level,
      level = _settings$level === undefined ? false : _settings$level,
      _settings$limitShowNu = settings.limitShowNum,
      limitShowNum = _settings$limitShowNu === undefined ? 0 : _settings$limitShowNu;
  var tooltipVisible = extra.tooltipVisible,
      legendVisible = extra.legendVisible;

  if (limitShowNum) innerRows.sort(function (a, b) {
    return b[metrics] - a[metrics];
  });
  var seriesParams = {
    innerRows: innerRows,
    dataType: dataType,
    percentShow: percentShow,
    dimension: dimension,
    metrics: metrics,
    radius: radius,
    offsetY: offsetY,
    selectedMode: selectedMode,
    hoverAnimation: hoverAnimation,
    digit: digit,
    roseType: roseType,
    label: label,
    level: level,
    limitShowNum: limitShowNum,
    isRing: isRing
  };
  var series = getPieSeries(seriesParams);
  var legendParams = {
    innerRows: innerRows,
    dimension: dimension,
    legendLimit: legendLimit,
    level: level,
    limitShowNum: limitShowNum
  };
  var legend = legendVisible && getPieLegend(legendParams);
  var tooltip = tooltipVisible && getPieTooltip({
    dataType: dataType,
    innerRows: innerRows,
    limitShowNum: limitShowNum,
    digit: digit,
    metrics: metrics,
    dimension: dimension
  });
  var options = { series: series, legend: legend, tooltip: tooltip };
  return options;
};

var ring = function ring(columns, rows, settings, extra) {
  return pie(columns, rows, settings, extra, true);
};

var VePie = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-pie", style: _vm.canvasStyle });
  }, staticRenderFns: [],
  name: 'VePie',
  mixins: [Core],
  created: function created() {
    this.chartHandler = pie;
    this.echartsLib = echarts;
  }
};

var VeRing = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-ring", style: _vm.canvasStyle });
  }, staticRenderFns: [],
  name: 'VeRing',
  mixins: [Core],
  created: function created() {
    this.chartHandler = ring;
    this.echartsLib = echarts;
  }
};

function getWaterfallTooltip(dataType, digit) {
  return {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    formatter: function formatter(items) {
      var item = items[1];
      return [item.name + '<br/>' + item.seriesName + ' :', '' + getFormated(item.value, dataType, digit)].join('');
    }
  };
}

function getWaterfallXAxis(args) {
  var dimension = args.dimension,
      rows = args.rows,
      remainStatus = args.remainStatus,
      totalName = args.totalName,
      remainName = args.remainName,
      xAxisName = args.xAxisName,
      axisVisible = args.axisVisible;

  var xAxisData = [totalName].concat(rows.map(function (row) {
    return row[dimension];
  }));
  if (remainStatus === 'have-remain') {
    xAxisData = xAxisData.concat([remainName]);
  }

  return {
    type: 'category',
    name: xAxisName,
    splitLine: { show: false },
    data: xAxisData,
    show: axisVisible
  };
}

function getWaterfallYAxis(args) {
  var dataType = args.dataType,
      yAxisName = args.yAxisName,
      axisVisible = args.axisVisible,
      digit = args.digit;

  return {
    type: 'value',
    name: yAxisName,
    axisTick: { show: false },
    axisLabel: {
      formatter: function formatter(val) {
        return getFormated(val, dataType, digit);
      }
    },
    show: axisVisible
  };
}

function getWaterfallSeries(args) {
  var dataType = args.dataType,
      rows = args.rows,
      metrics = args.metrics,
      totalNum = args.totalNum,
      remainStatus = args.remainStatus,
      dataSum = args.dataSum,
      digit = args.digit;

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

  series.push(_extends({
    name: '辅助',
    itemStyle: {
      normal: { opacity: 0 },
      emphasis: { opacity: 0 }
    },
    data: assistData
  }, seriesBase));

  series.push(_extends({
    name: '数值',
    label: {
      normal: {
        show: true,
        position: 'top',
        formatter: function formatter(item) {
          return getFormated(item.value, dataType, digit);
        }
      }
    },
    data: mainData
  }, seriesBase));
  return series;
}

function getWaterfallRemainStatus(dataSum, totalNum) {
  if (!totalNum) return 'not-total';
  return totalNum > dataSum ? 'have-remain' : 'none-remain';
}

var waterfall = function waterfall(columns, rows, settings, extra) {
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
      xAxisName = _settings$xAxisName === undefined ? dimension : _settings$xAxisName,
      _settings$axisVisible = settings.axisVisible,
      axisVisible = _settings$axisVisible === undefined ? true : _settings$axisVisible,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit;
  var tooltipVisible = extra.tooltipVisible;

  var metricsTemp = columns.slice();
  metricsTemp.splice(metricsTemp.indexOf(dimension), 1);
  var metrics = metricsTemp[0];
  var yAxisName = metrics;
  var tooltip = tooltipVisible && getWaterfallTooltip(dataType, digit);
  var dataSum = parseFloat(rows.reduce(function (pre, cur) {
    return pre + Number(cur[metrics]);
  }, 0).toFixed(digit));
  var remainStatus = getWaterfallRemainStatus(dataSum, totalNum);
  var xAxisParams = {
    dimension: dimension,
    rows: rows,
    remainStatus: remainStatus,
    totalName: totalName,
    remainName: remainName,
    xAxisName: xAxisName,
    axisVisible: axisVisible
  };
  var xAxis = getWaterfallXAxis(xAxisParams);
  var yAxis = getWaterfallYAxis({ dataType: dataType, yAxisName: yAxisName, axisVisible: axisVisible, digit: digit });
  var seriesParams = {
    dataType: dataType,
    rows: rows,
    dimension: dimension,
    metrics: metrics,
    totalNum: totalNum,
    remainStatus: remainStatus,
    dataSum: dataSum,
    digit: digit
  };
  var series = getWaterfallSeries(seriesParams);
  var options = { tooltip: tooltip, xAxis: xAxis, yAxis: yAxis, series: series };
  return options;
};

var VeWaterfall = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-waterfall", style: _vm.canvasStyle });
  }, staticRenderFns: [],
  name: 'VeWaterfall',
  mixins: [Core],
  created: function created() {
    this.chartHandler = waterfall;
    this.echartsLib = echarts;
  }
};

function getFunnelTooltip(dataType, digit) {
  return {
    trigger: 'item',
    formatter: function formatter(item) {
      var tpl = [];
      tpl.push(itemPoint(item.color));
      tpl.push(item.name + ': ' + getFormated(item.data.realValue, dataType, digit));
      return tpl.join('');
    }
  };
}

function getFunnelSeries(args) {
  var dimension = args.dimension,
      metrics = args.metrics,
      rows = args.rows,
      sequence = args.sequence,
      ascending = args.ascending;

  var series = { type: 'funnel' };
  rows.sort(function (a, b) {
    return sequence.indexOf(a[dimension]) - sequence.indexOf(b[dimension]);
  });

  var falseFunnel = false;
  rows.some(function (row, index) {
    if (index && row[metrics] > rows[index - 1][metrics]) {
      falseFunnel = true;
      return true;
    }
  });

  var step = 100 / rows.length;

  if (falseFunnel) {
    series.data = rows.slice().reverse().map(function (row, index) {
      return {
        name: row[dimension],
        value: (index + 1) * step,
        realValue: row[metrics]
      };
    });
  } else {
    series.data = rows.map(function (row) {
      return {
        name: row[dimension],
        value: row[metrics],
        realValue: row[metrics]
      };
    });
  }

  if (ascending) series.sort = 'ascending';
  return series;
}

var funnel = function funnel(outerColumns, outerRows, settings, extra) {
  var columns = outerColumns.slice();
  var rows = outerRows.slice();
  var _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? 'normal' : _settings$dataType,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$sequence = settings.sequence,
      sequence = _settings$sequence === undefined ? rows.map(function (row) {
    return row[dimension];
  }) : _settings$sequence,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit,
      ascending = settings.ascending;
  var tooltipVisible = extra.tooltipVisible,
      legendVisible = extra.legendVisible;

  var metrics = void 0;
  if (settings.metrics) {
    metrics = settings.metrics;
  } else {
    var metricsTemp = columns.slice();
    metricsTemp.splice(columns.indexOf(dimension), 1);
    metrics = metricsTemp[0];
  }

  var tooltip = tooltipVisible && getFunnelTooltip(dataType, digit);
  var legend = legendVisible && { data: sequence };
  var seriesParams = { dimension: dimension, metrics: metrics, rows: rows, sequence: sequence, ascending: ascending };
  var series = getFunnelSeries(seriesParams);
  var options = { tooltip: tooltip, legend: legend, series: series };
  return options;
};

var VeFunnel = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-funnel", style: _vm.canvasStyle });
  }, staticRenderFns: [],
  name: 'VeFunnel',
  mixins: [Core],
  created: function created() {
    this.chartHandler = funnel;
    this.echartsLib = echarts;
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

var VeRadar = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-radar", style: _vm.canvasStyle });
  }, staticRenderFns: [],
  name: 'VeRadar',
  mixins: [Core],
  created: function created() {
    this.chartHandler = radar;
    this.echartsLib = echarts;
  }
};

var VeChart = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-chart", style: _vm.canvasStyle });
  }, staticRenderFns: [],
  name: 'VeChart',
  mixins: [Core],
  created: function created() {
    this.chartLib = {
      bar: bar,
      histogram: histogram,
      line: line,
      pie: pie,
      ring: ring,
      funnel: funnel,
      radar: radar,
      waterfall: waterfall
    };
    this.chartHandler = this.chartLib[this.settings.type];
    this.echartsLib = echarts;
  }
};

function getTooltip(dataType, digit, dataStore, metrics, color$$1) {
  return {
    formatter: function formatter(item) {
      var tpl = [];
      tpl.push(item.name + '<br>');
      metrics.forEach(function (label, index) {
        tpl.push(itemPoint(color$$1[index]) + ' ' + label + ' : ');
        if (dataStore[item.name]) {
          tpl.push(getFormated(dataStore[item.name][label], dataType[label], digit));
        } else {
          tpl.push('-');
        }
        tpl.push('<br>');
      });
      return tpl.join(' ');
    }
  };
}

function getSeries(args) {
  var position = args.position,
      selectData = args.selectData,
      dimension = args.dimension,
      metrics = args.metrics,
      rows = args.rows,
      label = args.label,
      itemStyle = args.itemStyle,
      selectedMode = args.selectedMode,
      roam = args.roam,
      center = args.center,
      aspectScale = args.aspectScale,
      boundingCoords = args.boundingCoords,
      zoom = args.zoom,
      scaleLimit = args.scaleLimit,
      mapGrid = args.mapGrid;

  var result = [];
  var mapBase = {
    type: 'map',
    mapType: position
  };

  metrics.forEach(function (itemName) {
    var itemResult = _extends({
      name: itemName,
      data: [],
      selectedMode: selectedMode,
      roam: roam,
      center: center,
      aspectScale: aspectScale,
      boundingCoords: boundingCoords,
      zoom: zoom,
      scaleLimit: scaleLimit
    }, mapBase);

    if (mapGrid) {
      Object.keys(mapGrid).forEach(function (key) {
        itemResult[key] = mapGrid[key];
      });
    }

    setGeoLabel(itemStyle, itemResult, 'itemStyle');
    setGeoLabel(label, itemResult, 'label');

    rows.forEach(function (row) {
      itemResult.data.push({
        name: row[dimension],
        value: row[itemName],
        selected: selectData
      });
    });
    result.push(itemResult);
  });

  return result;
}

function setGeoLabel(value, target, label) {
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    target[label] = value;
  } else if (value) {
    target[label] = {
      normal: { show: true },
      emphasis: { show: true }
    };
  }
}

var map = function map(columns, rows, settings, extra) {
  var _settings$position = settings.position,
      position = _settings$position === undefined ? 'china' : _settings$position,
      _settings$selectData = settings.selectData,
      selectData = _settings$selectData === undefined ? false : _settings$selectData,
      selectedMode = settings.selectedMode,
      _settings$label = settings.label,
      label = _settings$label === undefined ? true : _settings$label,
      _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? {} : _settings$dataType,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      roam = settings.roam,
      center = settings.center,
      aspectScale = settings.aspectScale,
      boundingCoords = settings.boundingCoords,
      zoom = settings.zoom,
      scaleLimit = settings.scaleLimit,
      mapGrid = settings.mapGrid,
      itemStyle = settings.itemStyle;

  var metrics = columns.slice();
  if (settings.metrics) {
    metrics = settings.metrics;
  } else {
    metrics.splice(columns.indexOf(dimension), 1);
  }
  var tooltipVisible = extra.tooltipVisible,
      legendVisible = extra.legendVisible,
      color$$1 = extra.color;

  var dataStore = {};
  rows.forEach(function (row) {
    dataStore[row[dimension]] = row;
  });
  var tooltip = tooltipVisible && getTooltip(dataType, digit, dataStore, metrics, color$$1);
  var legend = legendVisible && { data: metrics };
  var seriesParams = {
    position: position,
    selectData: selectData,
    label: label,
    itemStyle: itemStyle,
    dimension: dimension,
    metrics: metrics,
    rows: rows,
    selectedMode: selectedMode,
    roam: roam,
    center: center,
    aspectScale: aspectScale,
    boundingCoords: boundingCoords,
    zoom: zoom,
    scaleLimit: scaleLimit,
    mapGrid: mapGrid
  };
  var series = getSeries(seriesParams);

  return getMapJSON(position).then(function (json) {
    echarts.registerMap(position, json);
    return { series: series, tooltip: tooltip, legend: legend };
  });
};

var VeMap = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-map", style: _vm.canvasStyle });
  }, staticRenderFns: [],
  name: 'VeMap',
  mixins: [Core],
  created: function created() {
    this.chartHandler = map;
    this.echartsLib = echarts;
  }
};

var bmap = function bmap(_, __, settings) {
  var key = settings.key,
      bmap = settings.bmap;

  if (!key) console.warn('settings.key must be a string.');

  return getBmap(key).then(function (_) {
    return { bmap: bmap };
  });
};

var VeBmap = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "canvas", staticClass: "ve-bmap", style: _vm.canvasStyle });
  }, staticRenderFns: [],
  name: 'VeBmap',
  mixins: [Core],
  created: function created() {
    this.chartHandler = bmap;
    this.echartsLib = echarts;
  }
};

var components = [VeBar, VeHistogram, VeLine, VePie, VeRing, VeWaterfall, VeFunnel, VeRadar, VeChart, VeMap, VeBmap];

function install(Vue, _) {
  components.forEach(function (component) {
    Vue.component(component.name, component);
  });
}

export { VeBar, VeHistogram, VeRing, VeLine, VePie, VeWaterfall, VeFunnel, VeRadar, VeChart, VeMap, VeBmap, install };
