(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('echarts/lib/echarts'), require('echarts/lib/component/tooltip'), require('echarts/lib/component/legend'), require('echarts/lib/chart/pie')) :
  typeof define === 'function' && define.amd ? define(['echarts/lib/echarts', 'echarts/lib/component/tooltip', 'echarts/lib/component/legend', 'echarts/lib/chart/pie'], factory) :
  (global.VeRing = factory(global.echarts));
}(this, (function (echarts) { 'use strict';

  echarts = echarts && echarts.hasOwnProperty('default') ? echarts['default'] : echarts;

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

  var ABBR = {
    th: 3,
    mi: 6,
    bi: 9,
    tr: 12
  };

  var DEFAULT_OPTIONS = {
    zeroFormat: null,
    nullFormat: null,
    defaultFormat: '0,0',
    scalePercentBy100: true,
    abbrLabel: {
      th: 'k',
      mi: 'm',
      bi: 'b',
      tr: 't'
    }
  };

  var TRILLION = 1e12;
  var BILLION = 1e9;
  var MILLION = 1e6;
  var THOUSAND = 1e3;

  function numIsNaN(value) {
    return typeof value === 'number' && isNaN(value);
  }

  function toFixed(value, maxDecimals, roundingFunction, optionals) {
    var splitValue = value.toString().split('.');
    var minDecimals = maxDecimals - (optionals || 0);
    var boundedPrecision = splitValue.length === 2 ? Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals) : minDecimals;
    var power = Math.pow(10, boundedPrecision);
    var output = (roundingFunction(value + 'e+' + boundedPrecision) / power).toFixed(boundedPrecision);

    if (optionals > maxDecimals - boundedPrecision) {
      var optionalsRegExp = new RegExp('\\.?0{1,' + (optionals - (maxDecimals - boundedPrecision)) + '}$');
      output = output.replace(optionalsRegExp, '');
    }

    return output;
  }

  function numberToFormat(options, value, format, roundingFunction) {
    var abs = Math.abs(value);
    var negP = false;
    var optDec = false;
    var abbr = '';
    var decimal = '';
    var neg = false;
    var abbrForce = void 0;
    var signed = void 0;
    format = format || '';

    value = value || 0;

    if (~format.indexOf('(')) {
      negP = true;
      format = format.replace(/[(|)]/g, '');
    } else if (~format.indexOf('+') || ~format.indexOf('-')) {
      signed = ~format.indexOf('+') ? format.indexOf('+') : value < 0 ? format.indexOf('-') : -1;
      format = format.replace(/[+|-]/g, '');
    }
    if (~format.indexOf('a')) {
      abbrForce = format.match(/a(k|m|b|t)?/);

      abbrForce = abbrForce ? abbrForce[1] : false;

      if (~format.indexOf(' a')) abbr = ' ';
      format = format.replace(new RegExp(abbr + 'a[kmbt]?'), '');

      if (abs >= TRILLION && !abbrForce || abbrForce === 't') {
        abbr += options.abbrLabel.tr;
        value = value / TRILLION;
      } else if (abs < TRILLION && abs >= BILLION && !abbrForce || abbrForce === 'b') {
        abbr += options.abbrLabel.bi;
        value = value / BILLION;
      } else if (abs < BILLION && abs >= MILLION && !abbrForce || abbrForce === 'm') {
        abbr += options.abbrLabel.mi;
        value = value / MILLION;
      } else if (abs < MILLION && abs >= THOUSAND && !abbrForce || abbrForce === 'k') {
        abbr += options.abbrLabel.th;
        value = value / THOUSAND;
      }
    }
    if (~format.indexOf('[.]')) {
      optDec = true;
      format = format.replace('[.]', '.');
    }
    var int = value.toString().split('.')[0];
    var precision = format.split('.')[1];
    var thousands = format.indexOf(',');
    var leadingCount = (format.split('.')[0].split(',')[0].match(/0/g) || []).length;

    if (precision) {
      if (~precision.indexOf('[')) {
        precision = precision.replace(']', '');
        precision = precision.split('[');
        decimal = toFixed(value, precision[0].length + precision[1].length, roundingFunction, precision[1].length);
      } else {
        decimal = toFixed(value, precision.length, roundingFunction);
      }

      int = decimal.split('.')[0];
      decimal = ~decimal.indexOf('.') ? '.' + decimal.split('.')[1] : '';
      if (optDec && +decimal.slice(1) === 0) decimal = '';
    } else {
      int = toFixed(value, 0, roundingFunction);
    }
    if (abbr && !abbrForce && +int >= 1000 && abbr !== ABBR.trillion) {
      int = '' + +int / 1000;
      abbr = ABBR.million;
    }
    if (~int.indexOf('-')) {
      int = int.slice(1);
      neg = true;
    }
    if (int.length < leadingCount) {
      for (var i = leadingCount - int.length; i > 0; i--) {
        int = '0' + int;
      }
    }

    if (thousands > -1) {
      int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + ',');
    }

    if (!format.indexOf('.')) int = '';

    var output = int + decimal + (abbr || '');

    if (negP) {
      output = (negP && neg ? '(' : '') + output + (negP && neg ? ')' : '');
    } else {
      if (signed >= 0) {
        output = signed === 0 ? (neg ? '-' : '+') + output : output + (neg ? '-' : '+');
      } else if (neg) {
        output = '-' + output;
      }
    }

    return output;
  }

  function extend(target, sub) {
    Object.keys(sub).forEach(function (key) {
      target[key] = sub[key];
    });
  }

  var numeralPercent = {
    regexp: /%/,
    format: function format(value, formatType, roundingFunction, numerify) {
      var space = ~formatType.indexOf(' %') ? ' ' : '';
      var output = void 0;

      if (numerify.options.scalePercentBy100) value = value * 100;

      formatType = formatType.replace(/\s?%/, '');

      output = numerify._numberToFormat(value, formatType, roundingFunction);

      if (~output.indexOf(')')) {
        output = output.split('');
        output.splice(-1, 0, space + '%');
        output = output.join('');
      } else {
        output = output + space + '%';
      }

      return output;
    }
  };

  var options = {};
  var formats = {};

  extend(options, DEFAULT_OPTIONS);

  function format(value, formatType, roundingFunction) {
    formatType = formatType || options.defaultFormat;
    roundingFunction = roundingFunction || Math.round;
    var output = void 0;
    var formatFunction = void 0;

    if (value === 0 && options.zeroFormat !== null) {
      output = options.zeroFormat;
    } else if (value === null && options.nullFormat !== null) {
      output = options.nullFormat;
    } else {
      for (var kind in formats) {
        if (formats[kind] && formatType.match(formats[kind].regexp)) {
          formatFunction = formats[kind].format;
          break;
        }
      }
      formatFunction = formatFunction || numberToFormat.bind(null, options);
      output = formatFunction(value, formatType, roundingFunction, numerify);
    }

    return output;
  }

  function numerify(input, formatType, roundingFunction) {
    var value = void 0;

    if (input === 0 || typeof input === 'undefined') {
      value = 0;
    } else if (input === null || numIsNaN(input)) {
      value = null;
    } else if (typeof input === 'string') {
      if (options.zeroFormat && input === options.zeroFormat) {
        value = 0;
      } else if (options.nullFormat && input === options.nullFormat || !input.replace(/[^0-9]+/g, '').length) {
        value = null;
      }
    } else {
      value = +input || null;
    }

    return format(value, formatType, roundingFunction);
  }

  numerify.options = options;
  numerify._numberToFormat = numberToFormat.bind(null, options);
  numerify.register = function (name, format) {
    formats[name] = format;
  };
  numerify.unregister = function (name) {
    formats[name] = null;
  };
  numerify.setOptions = function (opts) {
    extend(options, opts);
  };
  numerify.reset = function () {
    extend(options, DEFAULT_OPTIONS);
  };

  numerify.register('percentage', numeralPercent);

  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var self = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(self, args);
      }, delay);
    };
  }

  function getType(v) {
    return Object.prototype.toString.call(v);
  }

  function isObject(v) {
    return getType(v) === '[object Object]';
  }

  function isArray(v) {
    return getType(v) === '[object Array]';
  }

  function isFunction(v) {
    return getType(v) === '[object Function]';
  }

  function cloneDeep(v) {
    return JSON.parse(JSON.stringify(v));
  }

  function camelToKebab(s) {
    return s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  var getFormated = function getFormated(val, type, digit) {
    var defaultVal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '-';

    if (isNaN(val)) return defaultVal;
    if (!type) return val;
    if (isFunction(type)) return type(val, numerify);

    digit = isNaN(digit) ? 0 : ++digit;
    var digitStr = '.[' + new Array(digit).join(0) + ']';
    var formatter = type;
    switch (type) {
      case 'KMB':
        formatter = digit ? '0,0' + digitStr + 'a' : '0,0a';
        break;
      case 'normal':
        formatter = digit ? '0,0' + digitStr : '0,0';
        break;
      case 'percent':
        formatter = digit ? '0,0' + digitStr + '%' : '0,0.[00]%';
        break;
    }
    return numerify(val, formatter);
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
        isRing = args.isRing,
        labelLine = args.labelLine,
        itemStyle = args.itemStyle;


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
      if (labelLine) seriesItem.labelLine = labelLine;
      if (itemStyle) seriesItem.itemStyle = itemStyle;
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
        legendName = args.legendName,
        level = args.level,
        limitShowNum = args.limitShowNum;

    var legend$$1 = [];
    var levelTemp = [];
    if (level) {
      level.forEach(function (levelItem) {
        levelItem.forEach(function (item) {
          levelTemp.push(item);
        });
      });
      legend$$1 = levelTemp;
    } else if (limitShowNum && limitShowNum < innerRows.length) {
      for (var i = 0; i < limitShowNum; i++) {
        legend$$1.push(innerRows[i][dimension]);
      }
      legend$$1.push('其他');
    } else {
      legend$$1 = innerRows.map(function (row) {
        return row[dimension];
      });
    }
    if (legend$$1.length) {
      return {
        data: legend$$1,
        show: legend$$1.length < legendLimit,
        formatter: function formatter(name) {
          return legendName[name] != null ? legendName[name] : name;
        }
      };
    } else {
      return false;
    }
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

  var pie$1 = function pie$$1(columns, rows, settings, extra, isRing) {
    var innerRows = cloneDeep(rows);
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
        _settings$legendName = settings.legendName,
        legendName = _settings$legendName === undefined ? {} : _settings$legendName,
        _settings$label = settings.label,
        label = _settings$label === undefined ? false : _settings$label,
        _settings$level = settings.level,
        level = _settings$level === undefined ? false : _settings$level,
        _settings$limitShowNu = settings.limitShowNum,
        limitShowNum = _settings$limitShowNu === undefined ? 0 : _settings$limitShowNu,
        labelLine = settings.labelLine,
        itemStyle = settings.itemStyle;
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
      legendName: legendName,
      limitShowNum: limitShowNum,
      isRing: isRing,
      labelLine: labelLine,
      itemStyle: itemStyle
    };
    var series = getPieSeries(seriesParams);
    var legendParams = {
      innerRows: innerRows,
      dimension: dimension,
      legendLimit: legendLimit,
      legendName: legendName,
      level: level,
      limitShowNum: limitShowNum
    };
    var legend$$1 = legendVisible && getPieLegend(legendParams);
    var tooltip$$1 = tooltipVisible && getPieTooltip({
      dataType: dataType,
      innerRows: innerRows,
      limitShowNum: limitShowNum,
      digit: digit,
      metrics: metrics,
      dimension: dimension
    });
    var options = { series: series, legend: legend$$1, tooltip: tooltip$$1 };
    return options;
  };

  var ring = function ring(columns, rows, settings, extra) {
    return pie$1(columns, rows, settings, extra, true);
  };

  var Loading = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "v-charts-component-loading" }, [_c('div', { staticClass: "loader" }, [_c('div', { staticClass: "loading-spinner" }, [_c('svg', { staticClass: "circular", attrs: { "viewBox": "25 25 50 50" } }, [_c('circle', { staticClass: "path", attrs: { "cx": "50", "cy": "50", "r": "20", "fill": "none" } })])])])]);
    }, staticRenderFns: []
  };

  var DataEmpty = { render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "v-charts-data-empty" }, [_vm._v(" 暂无数据 ")]);
    }, staticRenderFns: []
  };

  var STATIC_PROPS = ['initOptions', 'loading', 'dataEmpty', 'judgeWidth', 'widthChangeDelay'];

  var Core = {
    render: function render(h) {
      return h('div', {
        class: [camelToKebab(this.$options.name || this.$options._componentTag)],
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
      title: [Object, Array],
      legend: [Object, Array],
      xAxis: [Object, Array],
      yAxis: [Object, Array],
      radar: Object,
      tooltip: Object,
      axisPointer: [Object, Array],
      brush: [Object, Array],
      geo: [Object, Array],
      timeline: [Object, Array],
      graphic: [Object, Array],
      series: [Object, Array],
      backgroundColor: [Object, String],
      textStyle: [Object, Array],
      animation: Object,
      theme: Object,
      themeName: String,
      loading: Boolean,
      dataEmpty: Boolean,
      extend: Object,
      judgeWidth: { type: Boolean, default: false },
      widthChangeDelay: { type: Number, default: 300 },
      tooltipFormatter: { type: Function },
      resizeable: { type: Boolean, default: true },
      resizeDelay: { type: Number, default: 200 },
      changeDelay: { type: Number, default: 0 },
      setOptionOpts: { type: [Boolean, Object], default: true }
    },

    watch: {
      data: {
        deep: true,
        handler: function handler(v) {
          if (v) {
            this.changeHandler();
          }
        }
      },

      settings: {
        deep: true,
        handler: function handler(v) {
          if (v.type && this.chartLib) this.chartHandler = this.chartLib[v.type];
          this.changeHandler();
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
      dataHandler: function dataHandler() {
        if (!this.chartHandler) return;
        var data = this.data;
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
          tooltipFormatter: this.tooltipFormatter,
          _once: this._once
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
        this.echarts.setOption(options, this.setOptionOpts);
        this.$emit('ready', this.echarts);
        if (!this._once['ready-once']) {
          this._once['ready-once'] = true;
          this.$emit('ready-once', this.echarts);
        }
        if (this.judgeWidth) this.judgeWidthHandler(options);
        if (this.afterSetOption) this.afterSetOption(this.echarts);
        if (this.afterSetOptionOnce && !this._once['afterSetOptionOnce']) {
          this._once['afterSetOptionOnce'] = true;
          this.afterSetOptionOnce(this.echarts);
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
        if (this.data) this.changeHandler();
        this.createEventProxy();
        if (this.resizeable) window.addEventListener('resize', this.resizeHandler);
      },
      addWatchToProps: function addWatchToProps() {
        var _this3 = this;

        var watchedVariable = this._watchers.map(function (watcher) {
          return watcher.expression;
        });
        Object.keys(this.$props).forEach(function (prop) {
          if (!~watchedVariable.indexOf(prop) && !~STATIC_PROPS.indexOf(prop)) {
            var opts = {};
            if (~['[object Object]', '[object Array]'].indexOf(getType(_this3.$props[prop]))) {
              opts.deep = true;
            }
            _this3.$watch(prop, function () {
              _this3.changeHandler();
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
        if (this.resizeable) window.removeEventListener('resize', this.resizeHandler);
        this.echarts.dispose();
      }
    },

    created: function created() {
      var _this5 = this;

      this.echarts = null;
      this.registeredEvents = [];
      this._once = {};
      this.resizeHandler = debounce(function (_) {
        _this5.echarts && _this5.echarts.resize();
      }, this.resizeDelay);
      this.changeHandler = debounce(function (_) {
        _this5.dataHandler();
      }, this.changeDelay);
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
    name: 'VeRing',
    mixins: [Core],
    created: function created() {
      this.chartHandler = ring;
      this.echartsLib = echarts;
    }
  };

  return index;

})));
