(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
typeof define === 'function' && define.amd ? define(['react'], factory) :
(global.RBTable = factory(global.React));
}(this, (function (React) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var printWarning = function() {};

{
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );

        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

var printWarning$1 = function() {};

{
  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning$1(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      printWarning$1('Invalid argument supplied to oneOf, expected an instance of array.');
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.');
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning$1(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
}
});

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule UserAgent_DEPRECATED
 */

/**
 *  Provides entirely client-side User Agent and OS detection. You should prefer
 *  the non-deprecated UserAgent module when possible, which exposes our
 *  authoritative server-side PHP-based detection to the client.
 *
 *  Usage is straightforward:
 *
 *    if (UserAgent_DEPRECATED.ie()) {
 *      //  IE
 *    }
 *
 *  You can also do version checks:
 *
 *    if (UserAgent_DEPRECATED.ie() >= 7) {
 *      //  IE7 or better
 *    }
 *
 *  The browser functions will return NaN if the browser does not match, so
 *  you can also do version compares the other way:
 *
 *    if (UserAgent_DEPRECATED.ie() < 7) {
 *      //  IE6 or worse
 *    }
 *
 *  Note that the version is a float and may include a minor version number,
 *  so you should always use range operators to perform comparisons, not
 *  strict equality.
 *
 *  **Note:** You should **strongly** prefer capability detection to browser
 *  version detection where it's reasonable:
 *
 *    http://www.quirksmode.org/js/support.html
 *
 *  Further, we have a large number of mature wrapper functions and classes
 *  which abstract away many browser irregularities. Check the documentation,
 *  grep for things, or ask on javascript@lists.facebook.com before writing yet
 *  another copy of "event || window.event".
 *
 */

var _populated = false;

// Browsers
var _ie, _firefox, _opera, _webkit, _chrome;

// Actual IE browser for compatibility mode
var _ie_real_version;

// Platforms
var _osx, _windows, _linux, _android;

// Architectures
var _win64;

// Devices
var _iphone, _ipad, _native;

var _mobile;

function _populate() {
  if (_populated) {
    return;
  }

  _populated = true;

  // To work around buggy JS libraries that can't handle multi-digit
  // version numbers, Opera 10's user agent string claims it's Opera
  // 9, then later includes a Version/X.Y field:
  //
  // Opera/9.80 (foo) Presto/2.2.15 Version/10.10
  var uas = navigator.userAgent;
  var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
  var os    = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);

  _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
  _ipad = /\b(iP[ao]d)/.exec(uas);
  _android = /Android/i.exec(uas);
  _native = /FBAN\/\w+;/i.exec(uas);
  _mobile = /Mobile/i.exec(uas);

  // Note that the IE team blog would have you believe you should be checking
  // for 'Win64; x64'.  But MSDN then reveals that you can actually be coming
  // from either x64 or ia64;  so ultimately, you should just check for Win64
  // as in indicator of whether you're in 64-bit IE.  32-bit IE on 64-bit
  // Windows will send 'WOW64' instead.
  _win64 = !!(/Win64/.exec(uas));

  if (agent) {
    _ie = agent[1] ? parseFloat(agent[1]) : (
          agent[5] ? parseFloat(agent[5]) : NaN);
    // IE compatibility mode
    if (_ie && document && document.documentMode) {
      _ie = document.documentMode;
    }
    // grab the "true" ie version from the trident token if available
    var trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
    _ie_real_version = trident ? parseFloat(trident[1]) + 4 : _ie;

    _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
    _opera   = agent[3] ? parseFloat(agent[3]) : NaN;
    _webkit  = agent[4] ? parseFloat(agent[4]) : NaN;
    if (_webkit) {
      // We do not add the regexp to the above test, because it will always
      // match 'safari' only since 'AppleWebKit' appears before 'Chrome' in
      // the userAgent string.
      agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
      _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
    } else {
      _chrome = NaN;
    }
  } else {
    _ie = _firefox = _opera = _chrome = _webkit = NaN;
  }

  if (os) {
    if (os[1]) {
      // Detect OS X version.  If no version number matches, set _osx to true.
      // Version examples:  10, 10_6_1, 10.7
      // Parses version number as a float, taking only first two sets of
      // digits.  If only one set of digits is found, returns just the major
      // version number.
      var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);

      _osx = ver ? parseFloat(ver[1].replace('_', '.')) : true;
    } else {
      _osx = false;
    }
    _windows = !!os[2];
    _linux   = !!os[3];
  } else {
    _osx = _windows = _linux = false;
  }
}

var UserAgent_DEPRECATED = {

  /**
   *  Check if the UA is Internet Explorer.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  ie: function() {
    return _populate() || _ie;
  },

  /**
   * Check if we're in Internet Explorer compatibility mode.
   *
   * @return bool true if in compatibility mode, false if
   * not compatibility mode or not ie
   */
  ieCompatibilityMode: function() {
    return _populate() || (_ie_real_version > _ie);
  },


  /**
   * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
   * only need this because Skype can't handle 64-bit IE yet.  We need to remove
   * this when we don't need it -- tracked by #601957.
   */
  ie64: function() {
    return UserAgent_DEPRECATED.ie() && _win64;
  },

  /**
   *  Check if the UA is Firefox.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  firefox: function() {
    return _populate() || _firefox;
  },


  /**
   *  Check if the UA is Opera.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  opera: function() {
    return _populate() || _opera;
  },


  /**
   *  Check if the UA is WebKit.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  webkit: function() {
    return _populate() || _webkit;
  },

  /**
   *  For Push
   *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
   */
  safari: function() {
    return UserAgent_DEPRECATED.webkit();
  },

  /**
   *  Check if the UA is a Chrome browser.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  chrome : function() {
    return _populate() || _chrome;
  },


  /**
   *  Check if the user is running Windows.
   *
   *  @return bool `true' if the user's OS is Windows.
   */
  windows: function() {
    return _populate() || _windows;
  },


  /**
   *  Check if the user is running Mac OS X.
   *
   *  @return float|bool   Returns a float if a version number is detected,
   *                       otherwise true/false.
   */
  osx: function() {
    return _populate() || _osx;
  },

  /**
   * Check if the user is running Linux.
   *
   * @return bool `true' if the user's OS is some flavor of Linux.
   */
  linux: function() {
    return _populate() || _linux;
  },

  /**
   * Check if the user is running on an iPhone or iPod platform.
   *
   * @return bool `true' if the user is running some flavor of the
   *    iPhone OS.
   */
  iphone: function() {
    return _populate() || _iphone;
  },

  mobile: function() {
    return _populate() || (_iphone || _ipad || _android || _mobile);
  },

  nativeApp: function() {
    // webviews inside of the native apps
    return _populate() || _native;
  },

  android: function() {
    return _populate() || _android;
  },

  ipad: function() {
    return _populate() || _ipad;
  }
};

var UserAgent_DEPRECATED_1 = UserAgent_DEPRECATED;

/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ExecutionEnvironment
 */

var canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners:
    canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

var ExecutionEnvironment_1 = ExecutionEnvironment;

var useHasFeature;
if (ExecutionEnvironment_1.canUseDOM) {
  useHasFeature =
    document.implementation &&
    document.implementation.hasFeature &&
    // always returns true in newer browsers as per the standard.
    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
    document.implementation.hasFeature('', '') !== true;
}

/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported(eventNameSuffix, capture) {
  if (!ExecutionEnvironment_1.canUseDOM ||
      capture && !('addEventListener' in document)) {
    return false;
  }

  var eventName = 'on' + eventNameSuffix;
  var isSupported = eventName in document;

  if (!isSupported) {
    var element = document.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}

var isEventSupported_1 = isEventSupported;

// Reasonable defaults
var PIXEL_STEP  = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;

/**
 * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
 * complicated, thus this doc is long and (hopefully) detailed enough to answer
 * your questions.
 *
 * If you need to react to the mouse wheel in a predictable way, this code is
 * like your bestest friend. * hugs *
 *
 * As of today, there are 4 DOM event types you can listen to:
 *
 *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
 *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
 *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
 *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
 *
 * So what to do?  The is the best:
 *
 *   normalizeWheel.getEventType();
 *
 * In your event callback, use this code to get sane interpretation of the
 * deltas.  This code will return an object with properties:
 *
 *   spinX   -- normalized spin speed (use for zoom) - x plane
 *   spinY   -- " - y plane
 *   pixelX  -- normalized distance (to pixels) - x plane
 *   pixelY  -- " - y plane
 *
 * Wheel values are provided by the browser assuming you are using the wheel to
 * scroll a web page by a number of lines or pixels (or pages).  Values can vary
 * significantly on different platforms and browsers, forgetting that you can
 * scroll at different speeds.  Some devices (like trackpads) emit more events
 * at smaller increments with fine granularity, and some emit massive jumps with
 * linear speed or acceleration.
 *
 * This code does its best to normalize the deltas for you:
 *
 *   - spin is trying to normalize how far the wheel was spun (or trackpad
 *     dragged).  This is super useful for zoom support where you want to
 *     throw away the chunky scroll steps on the PC and make those equal to
 *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
 *     resolve a single slow step on a wheel to 1.
 *
 *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
 *     get the crazy differences between browsers, but at least it'll be in
 *     pixels!
 *
 *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
 *     should translate to positive value zooming IN, negative zooming OUT.
 *     This matches the newer 'wheel' event.
 *
 * Why are there spinX, spinY (or pixels)?
 *
 *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
 *     with a mouse.  It results in side-scrolling in the browser by default.
 *
 *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
 *
 *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
 *     probably is by browsers in conjunction with fancy 3D controllers .. but
 *     you know.
 *
 * Implementation info:
 *
 * Examples of 'wheel' event if you scroll slowly (down) by one step with an
 * average mouse:
 *
 *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
 *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
 *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
 *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
 *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
 *
 * On the trackpad:
 *
 *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
 *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
 *
 * On other/older browsers.. it's more complicated as there can be multiple and
 * also missing delta values.
 *
 * The 'wheel' event is more standard:
 *
 * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
 *
 * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
 * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
 * backward compatibility with older events.  Those other values help us
 * better normalize spin speed.  Example of what the browsers provide:
 *
 *                          | event.wheelDelta | event.detail
 *        ------------------+------------------+--------------
 *          Safari v5/OS X  |       -120       |       0
 *          Safari v5/Win7  |       -120       |       0
 *         Chrome v17/OS X  |       -120       |       0
 *         Chrome v17/Win7  |       -120       |       0
 *                IE9/Win7  |       -120       |   undefined
 *         Firefox v4/OS X  |     undefined    |       1
 *         Firefox v4/Win7  |     undefined    |       3
 *
 */
function normalizeWheel(/*object*/ event) /*object*/ {
  var sX = 0, sY = 0,       // spinX, spinY
      pX = 0, pY = 0;       // pixelX, pixelY

  // Legacy
  if ('detail'      in event) { sY = event.detail; }
  if ('wheelDelta'  in event) { sY = -event.wheelDelta / 120; }
  if ('wheelDeltaY' in event) { sY = -event.wheelDeltaY / 120; }
  if ('wheelDeltaX' in event) { sX = -event.wheelDeltaX / 120; }

  // side scrolling on FF with DOMMouseScroll
  if ( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in event) { pY = event.deltaY; }
  if ('deltaX' in event) { pX = event.deltaX; }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode == 1) {          // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else {                             // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) { sX = (pX < 1) ? -1 : 1; }
  if (pY && !sY) { sY = (pY < 1) ? -1 : 1; }

  return { spinX  : sX,
           spinY  : sY,
           pixelX : pX,
           pixelY : pY };
}


/**
 * The best combination if you prefer spinX + spinY normalization.  It favors
 * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
 * 'wheel' event, making spin speed determination impossible.
 */
normalizeWheel.getEventType = function() /*string*/ {
  return (UserAgent_DEPRECATED_1.firefox())
           ? 'DOMMouseScroll'
           : (isEventSupported_1('wheel'))
               ? 'wheel'
               : 'mousewheel';
};

var normalizeWheel_1 = normalizeWheel;

var normalizeWheel$1 = normalizeWheel_1;

var isIE = navigator.userAgent.match(/Trident/);
var requestFrame = function () {
  var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
    return window.setTimeout(fn, 20);
  };
  return function (fn) {
    return raf(fn);
  };
}();

var cancelFrame = function () {
  var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
  return function (id) {
    return cancel(id);
  };
}();

function resizeListener(e) {
  var win = e.target || e.srcElement;
  if (win.__resizeRAF__) cancelFrame(win.__resizeRAF__);
  win.__resizeRAF__ = requestFrame(function () {
    var trigger = win.__resizeTrigger__;
    trigger.__resizeListeners__.forEach(function (fn) {
      fn.call(trigger, e);
    });
  });
}

function objectLoad() {
  this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
  this.contentDocument.defaultView.addEventListener('resize', resizeListener);
}

function addResizeListener(element, fn) {
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    var obj = element.__resizeTrigger__ = document.createElement('object');
    obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
    obj.__resizeElement__ = element;
    obj.onload = objectLoad;
    obj.type = 'text/html';
    if (isIE) element.appendChild(obj);
    obj.data = 'about:blank';
    if (!isIE) element.appendChild(obj);
  }
  element.__resizeListeners__.push(fn);
}
function removeResizeListener(element, fn) {
  if (!element.__resizeListeners__) return;
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
  if (!element.__resizeListeners__.length) {
    element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', resizeListener);
    element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
  }
}

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function renderSomething(item) {
  for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  if (!item) return;
  if (typeof item === 'string' || typeof item === 'number') return item;
  if (typeof item === 'function') return item.apply(undefined, props);
  if (React.isValidElement(item)) return React.cloneElement(item, { tablecontext: props });
}
function getWidthStyle(r) {
  if (r.width) {
    return { width: r.width };
  }
  return null;
}
function px(value) {
  if (!value) return value;
  return value + 'px';
}
function setWidth(ele, value) {
  ele.style.width = value;
}
function setHeight(ele, value) {
  ele.style.height = value;
}

function clientXY() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      touches = _ref.touches,
      clientX = _ref.clientX,
      clientY = _ref.clientY;

  if (touches && touches.length > 0) {
    var touch = touches[0];
    clientX = touch.clientX;
    clientY = touch.clientY;
  }
  return { clientX: clientX, clientY: clientY };
}

// 遍历 
function forEachChildren(parent, cb) {
  for (var i = 0; i < parent.children.length; i++) {
    cb(parent.children[i], i);
  }
}
function minMaxWidthType(props, propName, componentName) {
  if (props.width && props[propName]) {
    return new Error(componentName + '.column.' + propName + ' will not take effect when column.width is set.');
  }
  if (propName === 'maxWidth' && props.maxWidth < props.minWidth) {
    return new Error(componentName + '.column.maxWidth is smaller then column.minWidth');
  }
}

var RBTable = function (_React$Component) {
  _inherits(RBTable, _React$Component);

  function RBTable(props) {
    _classCallCheck(this, RBTable);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.setTableRef = _this.setTableRef.bind(_this);
    _this.handleResize = _this.handleResize.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    _this.handleClickRow = _this.handleClickRow.bind(_this);
    _this.handleMoveEnd = _this.handleMoveEnd.bind(_this);
    _this.handleMove = _this.handleMove.bind(_this);
    _this.hScrollPanelMouseDown = _this.hScrollPanelMouseDown.bind(_this);
    _this.vScrollPanelMouseDown = _this.vScrollPanelMouseDown.bind(_this);
    _this.horizontalMoveStart = _this.horizontalMoveStart.bind(_this);
    _this.verticalMoveStart = _this.verticalMoveStart.bind(_this);
    _this.touchStart = _this.touchStart.bind(_this);
    _this.touchEnd = _this.touchEnd.bind(_this);
    return _this;
  }

  RBTable.prototype.componentWillUnmount = function componentWillUnmount() {
    addResizeListener(this.table, this.handleResize);
    window.removeEventListener('mousemove', this.handleMove);
    window.removeEventListener('mouseup', this.handleMoveEnd);
  };

  RBTable.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    window.addEventListener('mousemove', this.handleMove);
    window.addEventListener('mouseup', this.handleMoveEnd);
    // 子元素或者兄弟元素可能在之后加载导致当前元素的高度变化，setTimeout hack 这个情况
    setTimeout(function () {
      _this2.reflow();
    });
  };

  RBTable.prototype.setTableRef = function setTableRef(table) {
    if (table) {
      if (this.table) {
        removeResizeListener(this.table, this.handleResize);
      }
      this.table = table;
      addResizeListener(table, this.handleResize);
    }
  };

  RBTable.prototype.componentDidUpdate = function componentDidUpdate() {
    this.reflow();
  };

  RBTable.prototype.handleResize = function handleResize() {
    this.reflow();
  };

  RBTable.prototype.reflow = function reflow() {
    // setTimeout reflow my enter into situation of this component was destroyed immediately
    if (!this.refs.virtualTable || !this.refs.body) return;
    this.alignTable();
    this.scrollByOffset(0, 0);
    this.table.style.visibility = 'visible';
  };

  RBTable.prototype.handleScroll = function handleScroll(e) {
    var _normalizeWheel = normalizeWheel$1(e),
        pixelY = _normalizeWheel.pixelY,
        pixelX = _normalizeWheel.pixelX;

    pixelY = Math.round(pixelY * .5);
    pixelX = Math.round(pixelX * .5);

    var _scrollByOffset = this.scrollByOffset(pixelX, pixelY),
        hasOffset = _scrollByOffset.hasOffset;

    if (hasOffset) {
      if (!this.autoSize) {
        e.preventDefault();
      }
      e.stopPropagation();
    }
  };

  RBTable.prototype.handleClickRow = function handleClickRow(item, i) {
    this.props.onRowClick && this.props.onRowClick(item, i);
  };

  RBTable.prototype.setLocation = function setLocation(_ref2) {
    var clientX = _ref2.clientX,
        clientY = _ref2.clientY;

    this.x = clientX;
    this.y = clientY;
  };

  RBTable.prototype.handleMoveEnd = function handleMoveEnd() {
    this.mouseIsDownRight = false;
    this.mouseIsDownBottom = false;
    this.touchIsStarted = false;
  };

  RBTable.prototype.handleMove = function handleMove(e) {
    var _clientXY = clientXY(e),
        clientX = _clientXY.clientX,
        clientY = _clientXY.clientY;

    if (this.mouseIsDownBottom) {
      this.move({ clientX: clientX, clientY: this.y });
    } else if (this.mouseIsDownRight) {
      this.move({ clientX: this.x, clientY: clientY });
    } else if (this.touchIsStarted) {
      e.preventDefault();
      this.move({ clientX: clientX, clientY: clientY }, -1);
    }
  };

  RBTable.prototype.move = function move(_ref3) {
    var clientX = _ref3.clientX,
        clientY = _ref3.clientY;
    var multi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var offsetX = clientX - this.x;
    var offsetY = clientY - this.y;
    this.setLocation({ clientX: clientX, clientY: clientY });
    this.scrollByOffset(multi * offsetX, multi * offsetY);
  };

  RBTable.prototype.touchStart = function touchStart(e) {
    this.touchIsStarted = true;
    this.setLocation(clientXY(e));
  };

  RBTable.prototype.touchEnd = function touchEnd(e) {
    this.touchIsStarted = false;
  };

  RBTable.prototype.hScrollPanelMouseDown = function hScrollPanelMouseDown(e) {
    if (e.nativeEvent.which > 1) return;
    e.preventDefault();
    e.stopPropagation();

    var _refs$hScrollBar$getB = this.refs.hScrollBar.getBoundingClientRect(),
        left = _refs$hScrollBar$getB.left,
        right = _refs$hScrollBar$getB.right;

    var x = clientXY(e).clientX - (left + right) * .5;
    this.scrollByOffset(x, 0);
  };

  RBTable.prototype.vScrollPanelMouseDown = function vScrollPanelMouseDown(e) {
    if (e.nativeEvent.which > 1) return;
    e.preventDefault();
    e.stopPropagation();

    var _refs$vScrollBar$getB = this.refs.vScrollBar.getBoundingClientRect(),
        top = _refs$vScrollBar$getB.top,
        bottom = _refs$vScrollBar$getB.bottom;

    var y = clientXY(e).clientY - (top + bottom) * .5;
    this.scrollByOffset(0, y);
  };

  RBTable.prototype.horizontalMoveStart = function horizontalMoveStart(e) {
    if (e.nativeEvent.which > 1) return;
    e.preventDefault();
    e.stopPropagation();
    this.mouseIsDownBottom = true;
    this.setLocation(clientXY(e));
  };

  RBTable.prototype.verticalMoveStart = function verticalMoveStart(e) {
    if (e.nativeEvent.which > 1) return;
    e.preventDefault();
    e.stopPropagation();
    this.mouseIsDownRight = true;
    this.setLocation(clientXY(e));
  };

  RBTable.prototype.getHoverClass = function getHoverClass() {
    var prefixCls = this.props.prefixCls;

    var cls = ' ' + prefixCls + '-row--hover';
    if (this.props.onRowClick) {
      cls += prefixCls + '-row--clickable';
    }
    return cls;
  };

  RBTable.prototype.bodies = function bodies() {
    var _refs = this.refs,
        bodyMiddleContent = _refs.bodyMiddleContent,
        bodyLeftContent = _refs.bodyLeftContent,
        bodyRightContent = _refs.bodyRightContent;

    return [bodyMiddleContent, bodyLeftContent, bodyRightContent].filter(function (i) {
      return !!i;
    });
  };

  RBTable.prototype.handleRowEnter = function handleRowEnter(i) {
    var _this3 = this;

    this.bodies().forEach(function (body) {
      return body.children[i].className += _this3.getHoverClass();
    });
  };

  RBTable.prototype.handleRowLeave = function handleRowLeave(i) {
    var _this4 = this;

    this.bodies().forEach(function (body) {
      return body.children[i].className = body.children[i].className.replace(_this4.getHoverClass(), '');
    });
  };

  // 表格宽高布局


  RBTable.prototype.getTableWidthHeight = function getTableWidthHeight() {
    var _refs2 = this.refs,
        virtualTable = _refs2.virtualTable,
        scrollX = _refs2.scrollX;


    var columnWs = [];
    var rowHs = [];

    virtualTable.style.width = '';

    if (virtualTable.offsetWidth < scrollX.clientWidth - this.props.columns.length) {
      // 获取列换的加了1，这个减掉
      virtualTable.style.width = px(scrollX.clientWidth - this.props.columns.length);
    }

    var headerRow = virtualTable.querySelector('thead > tr');
    var colgroup = virtualTable.querySelector('colgroup');

    // 初始化列宽，用来翻页，resize 等情况
    this.props.columns.forEach(function (c, i) {
      colgroup.children[i].style.width = px(c.width || '');
    });

    // 获取列宽
    function getColumnWs() {
      for (var i = 0; i < headerRow.children.length; i++) {
        // add 1 for firfox -mox-max-content use decimal, when offsetWidth is floor will cause column break into 2 lines.
        columnWs[i] = headerRow.children[i].offsetWidth + 1;
      }
    }
    getColumnWs();

    // 如果有 maxWidth 和 minWidth，如果有需要重新 layout table
    this.props.columns.forEach(function (_ref4, i) {
      var width = _ref4.width,
          minWidth = _ref4.minWidth,
          maxWidth = _ref4.maxWidth;

      if (maxWidth || minWidth) {
        width = columnWs[i];
        width = Math.min(maxWidth || width, width);
        width = Math.max(minWidth || width, width);
        colgroup.children[i].style.width = px(width);
      }
    });
    getColumnWs();

    // 获取行高
    virtualTable.querySelectorAll('tbody > tr').forEach(function (tr, i) {
      rowHs[i] = tr.offsetHeight;
    });
    return { columnWs: columnWs, rowHs: rowHs };
  };

  // 对齐表格的，主要是表头固定，左右两列也是固定，都是手动通过代码进行固定


  RBTable.prototype.alignTable = function alignTable() {
    var _this5 = this;

    var _refs3 = this.refs,
        headerLeft = _refs3.headerLeft,
        headerRight = _refs3.headerRight,
        body = _refs3.body;
    var columns = this.props.columns;


    var fixedHeaders = [headerLeft, headerRight].filter(function (i) {
      return !!i;
    });

    // 清空左右fixed header 之前计算的高度，用于处理行高变化的情况
    fixedHeaders.forEach(function (i) {
      setHeight(i.querySelector('tr'), '');
    });

    // 获取 body 行高和列宽，再进行设置，减少渲染提高性能

    var _getTableWidthHeight = this.getTableWidthHeight(),
        columnWs = _getTableWidthHeight.columnWs,
        rowHs = _getTableWidthHeight.rowHs;
    // 获取 header 行高


    var headerBodyHeight = this.refs.virtualTable.querySelector('thead > tr').clientHeight;
    // 获取 table 高度 
    var tableClientHeight = this.table.clientHeight;
    // 获取 hscrollbar 高度
    var hScrollbarHeight = this.refs.hScrollPanel.offsetHeight;

    var bodyColgroupMiddle = this.refs.bodyMiddle.querySelector('colgroup');
    var headerColgroupMiddle = this.refs.headerMiddle.querySelector('colgroup');
    // 设置 列宽 并计算总宽度
    var totalWidth = 0;
    var rightColumnIndex = 0;
    columnWs.forEach(function (w, i) {
      var wpx = px(w);
      totalWidth += w;
      bodyColgroupMiddle.children[i].style.width = wpx;
      headerColgroupMiddle.children[i].style.width = wpx;
      if (!columns[i].width) {
        if (columns[i].fixed === 'left') {
          headerLeft.querySelector('colgroup').children[i].style.width = wpx;
          _this5.refs.bodyLeft.querySelector('colgroup').children[i].style.width = wpx;
        } else if (columns[i].fixed === 'right') {
          headerRight.querySelector('colgroup').children[rightColumnIndex].style.width = wpx;
          _this5.refs.bodyRight.querySelector('colgroup').children[rightColumnIndex].style.width = wpx;
          rightColumnIndex++;
        }
      }
    });
    var scrollXWidth = this.refs.scrollX.clientWidth;
    this.refs.scrollX.style.overflowX = totalWidth <= scrollXWidth ? 'hidden' : 'scroll';
    totalWidth = Math.max(totalWidth, scrollXWidth);
    // 设置 header 宽度 = totalWidth
    setWidth(this.refs.header, px(totalWidth));
    // 设置 body 宽度，用来隐藏滚动条  
    body.style.width = px(this.refs.header.clientWidth + (this.autoSize ? 0 : 300 + body.offsetWidth - body.clientWidth));

    var headerHeight = this.refs.header.offsetHeight;
    this.refs.header.style.height = px(headerHeight);
    // 设置 header 行高
    fixedHeaders.forEach(function (i) {
      setHeight(i.querySelector('tr'), px(headerBodyHeight));
      setHeight(i.parentElement, px(headerHeight));
    });
    // 设置 body 行高
    this.bodies().forEach(function (body) {
      forEachChildren(body, function (tr, i) {
        return setHeight(tr, px(rowHs[i]));
      });
    });

    // 设置高度，形成一个上下布局，上部固定高度，底部（body）占满
    if (tableClientHeight > 99999 || this.autoSize) {
      this.autoSize = true;
      body.style.width = px(this.refs.header.clientWidth);
      this.refs.scrollX.style.paddingBottom = 0;
      this.refs.scrollX.style.overflowX = 'auto';
      this.refs.body.style.paddingRight = 0;
      this.refs.body.style.overflowY = 'hidden';
    } else {
      var height = tableClientHeight - headerHeight - hScrollbarHeight;
      this.refs.body.style.height = px(height);
    }
  };

  RBTable.prototype.scrollByOffset = function scrollByOffset(offsetX, offsetY) {
    var _refs4 = this.refs,
        bodyMiddle = _refs4.bodyMiddle,
        hScrollBar = _refs4.hScrollBar,
        hScrollPanel = _refs4.hScrollPanel,
        vScrollBar = _refs4.vScrollBar,
        vScrollPanel = _refs4.vScrollPanel;

    if (!bodyMiddle) return;
    var bodyWidth = this.refs.scrollX.offsetWidth;
    // body 内容高度，不包含 header
    var bodyHeight = this.refs.body.clientHeight;
    var contentWidth = bodyMiddle.offsetWidth;
    var contentHeight = bodyMiddle.offsetHeight;
    var hOffsetRatio = 1,
        vOffsetRatio = 1;
    if (this.autoSize || contentHeight <= bodyHeight) {
      vScrollPanel.style.visibility = 'hidden';
      vScrollBar = null;
      vScrollPanel = null;
    }
    if (this.autoSize || contentWidth <= bodyWidth) {
      hScrollPanel.style.visibility = 'hidden';
      hScrollBar = null;
      hScrollPanel = null;
    }

    if (hScrollBar) {
      var hScrollPanelWidth = hScrollPanel.offsetWidth;
      var hScrollBarWidth = Math.max(hScrollPanelWidth * bodyWidth / contentWidth, 20);
      hOffsetRatio = (contentWidth - bodyWidth) / (hScrollPanelWidth - hScrollBarWidth);
    }

    if (vScrollBar) {
      var vScrollPanelHeight = vScrollPanel.offsetHeight;
      var vScrollBarHeight = Math.max(vScrollPanelHeight * bodyHeight / contentHeight, 20);
      vOffsetRatio = (contentHeight - bodyHeight) / (vScrollPanelHeight - vScrollBarHeight);
    }

    offsetX = offsetX * hOffsetRatio;
    offsetY = offsetY * vOffsetRatio;

    var left = this.refs.scrollX.scrollLeft + offsetX;
    var top = this.refs.body.scrollTop + offsetY;
    // hasOffset 用来判断 wheel 已经滑到边缘，这样可以不用 preventDefault 和 stopPropagation wheel 的事件，让外层的滚动元素起作用
    var hasOffset = true;
    if (left > contentWidth - bodyWidth) {
      left = contentWidth - bodyWidth;
      hasOffset = false;
    }
    if (left < 0) {
      left = 0;
      hasOffset = false;
    }
    if (top > contentHeight - bodyHeight) {
      top = contentHeight - bodyHeight;
      hasOffset = false;
    }
    if (top < 0) {
      top = 0;
      hasOffset = false;
    }
    this.refs.body.scrollTop = top;
    this.refs.scrollX.scrollLeft = left;
    // 宽度是一个百分比
    if (hScrollBar) {
      hScrollPanel.style.visibility = 'visible';
      hScrollBar.style.width = Math.round(hScrollBarWidth) + 'px';

      var x = Math.round(left / hOffsetRatio);
      hScrollBar.style.transform = 'translateX(' + x + 'px)';
    }

    function handleFixedBlock(ele, value) {
      if (!ele) return;
      if (value === 0 && ele) {
        ele.parentElement.parentElement.style.display = 'none';
      } else {
        ele.parentElement.parentElement.style.display = 'block';
        ele.style.transform = 'translateY(' + -top + 'px)';
      }
    }
    handleFixedBlock(this.refs.bodyLeft, left);
    handleFixedBlock(this.refs.bodyRight, left - contentWidth + bodyWidth);

    if (vScrollBar) {
      var y = Math.round(top / vOffsetRatio);
      vScrollPanel.style.visibility = 'visible';
      vScrollBar.style.height = Math.round(vScrollBarHeight) + 'px';
      vScrollBar.style.transform = 'translateY(' + y + 'px)';
    }
    return { hasOffset: hasOffset };
  };

  RBTable.prototype.renderHeaderSideOf = function renderHeaderSideOf(_ref5) {
    var side = _ref5.side,
        params = _objectWithoutProperties(_ref5, ['side']);

    var sideL = side.toLowerCase();
    var columns = params[sideL + 'Columns'];
    if (columns.length === 0) return null;

    var prefixCls = this.props.prefixCls;

    return React.createElement(
      'table',
      { ref: 'header' + side },
      React.createElement(
        'colgroup',
        null,
        columns.map(function (r, i) {
          return React.createElement('col', { key: i, style: getWidthStyle(r) });
        })
      ),
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          { className: prefixCls + '-row ' + prefixCls + '-row--header' },
          columns.map(function (column, i) {
            return React.createElement(
              'td',
              { key: column.dataIndex || i, className: prefixCls + '-cell ' + prefixCls + '-cell--header ' + (column.headerClassName || ''), style: column.headerStyle },
              renderSomething(column.header, params.data, column)
            );
          })
        )
      )
    );
  };

  RBTable.prototype.renderBodySideOf = function renderBodySideOf(_ref6) {
    var _this6 = this;

    var side = _ref6.side,
        data = _ref6.data,
        params = _objectWithoutProperties(_ref6, ['side', 'data']);

    var sideL = side.toLowerCase();
    var columns = params[sideL + 'Columns'];
    if (columns.length === 0) return null;

    var prefixCls = this.props.prefixCls;

    return React.createElement(
      'table',
      { ref: 'body' + side },
      React.createElement(
        'colgroup',
        null,
        columns.map(function (r, i) {
          return React.createElement('col', { key: i, style: getWidthStyle(r) });
        })
      ),
      React.createElement(
        'tbody',
        { ref: 'body' + side + 'Content' },
        data.map(function (item, i) {
          return React.createElement(
            'tr',
            { key: i,
              className: prefixCls + '-row ' + prefixCls + '-row--body',
              onMouseEnter: function onMouseEnter() {
                return _this6.handleRowEnter(i);
              },
              onMouseLeave: function onMouseLeave() {
                return _this6.handleRowLeave(i);
              },
              onClick: function onClick() {
                return _this6.handleClickRow(item, i);
              }
            },
            columns.map(function (column, j) {
              return React.createElement(
                'td',
                { key: j,
                  style: column.cellStyle,
                  className: prefixCls + '-cell ' + prefixCls + '-cell--body ' + (column.cellClassName || '')
                },
                renderSomething(column.cell, item, data, column)
              );
            })
          );
        })
      )
    );
  };

  RBTable.prototype.renderVirtualTable = function renderVirtualTable(params) {
    var data = params.data,
        columns = params.columns;
    var prefixCls = this.props.prefixCls;

    return React.createElement(
      'table',
      { className: prefixCls + '-hidden-layout', ref: 'virtualTable' },
      React.createElement(
        'colgroup',
        null,
        columns.map(function (r, i) {
          return React.createElement('col', { key: i, style: getWidthStyle(r) });
        })
      ),
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          { className: prefixCls + '-row ' + prefixCls + '-row--header' },
          columns.map(function (column, i) {
            return React.createElement(
              'td',
              { key: column.dataIndex || i, className: prefixCls + '-cell ' + prefixCls + '-cell--header', style: column.headerStyle },
              renderSomething(column.header, params.data, column)
            );
          })
        )
      ),
      React.createElement(
        'tbody',
        { ref: 'virtualTableBody' },
        data.map(function (item, i) {
          return React.createElement(
            'tr',
            { key: i, className: prefixCls + '-row ' + prefixCls + '-row--body' },
            columns.map(function (column, j) {
              return React.createElement(
                'td',
                { key: j,
                  style: column.cellStyle,
                  className: prefixCls + '-cell ' + prefixCls + '-cell--body ' + (column.cellClassName || '')
                },
                renderSomething(column.cell, item, data, column)
              );
            })
          );
        })
      )
    );
  };

  RBTable.prototype.render = function render() {
    var _this7 = this;

    var _props = this.props,
        data = _props.data,
        columns = _props.columns,
        prefixCls = _props.prefixCls,
        style = _props.style,
        className = _props.className;


    var middleColumns = columns.slice();
    var leftColumns = columns.filter(function (i) {
      return i.fixed === 'left';
    });
    var rightColumns = columns.filter(function (i) {
      return i.fixed === 'right';
    });

    var getParams = function getParams(side) {
      return { side: side, columns: columns, leftColumns: leftColumns, rightColumns: rightColumns, middleColumns: middleColumns, data: data };
    };

    return React.createElement(
      'div',
      { className: prefixCls + ' ' + (className || ''),
        key: 'rb-table',
        ref: this.setTableRef,
        onWheel: this.handleScroll,
        onTouchStart: this.touchStart,
        onTouchMove: this.handleMove,
        onTouchEnd: this.touchEnd,
        style: Object.assign({ visibility: 'hidden' }, style)
      },
      React.createElement(
        'div',
        { ref: 'scrollX', className: prefixCls + '-scrollx',
          onScroll: function onScroll() {
            return _this7.scrollByOffset(0, 0);
          }
        },
        React.createElement(
          'div',
          { className: prefixCls + '__header', ref: 'header' },
          this.renderHeaderSideOf(getParams('Middle'))
        ),
        React.createElement(
          'div',
          { className: prefixCls + '__body', ref: 'body',
            onScroll: function onScroll() {
              return _this7.scrollByOffset(0, 0);
            }

          },
          this.renderBodySideOf(getParams('Middle')),
          this.renderVirtualTable(getParams('virtual'))
        )
      ),
      !!leftColumns.length && React.createElement(
        'div',
        { className: prefixCls + '-fixed ' + prefixCls + '-fixed--left' },
        React.createElement(
          'div',
          { className: prefixCls + '-fixed__header' },
          this.renderHeaderSideOf(getParams('Left'))
        ),
        React.createElement(
          'div',
          { className: prefixCls + '-fixed__body' },
          this.renderBodySideOf(getParams('Left'))
        )
      ),
      !!rightColumns.length && React.createElement(
        'div',
        { className: prefixCls + '-fixed ' + prefixCls + '-fixed--right' },
        React.createElement(
          'div',
          { className: prefixCls + '-fixed__header' },
          this.renderHeaderSideOf(getParams('Right'))
        ),
        React.createElement(
          'div',
          { className: prefixCls + '-fixed__body' },
          this.renderBodySideOf(getParams('Right'))
        )
      ),
      React.createElement(
        'div',
        { className: prefixCls + '__vscroll',
          ref: 'vScrollPanel',
          onMouseDown: this.vScrollPanelMouseDown,
          onTouchStart: this.vScrollPanelMouseDown
        },
        React.createElement('div', { ref: 'vScrollBar', className: prefixCls + '__vscroll__bar',
          onMouseDown: this.verticalMoveStart,
          onTouchStart: this.verticalMoveStart,
          onTouchMove: this.handleMove,
          onTouchEnd: this.handleMoveEnd
        })
      ),
      React.createElement(
        'div',
        { className: prefixCls + '__hscroll',
          ref: 'hScrollPanel',
          onMouseDown: this.hScrollPanelMouseDown,
          onTouchStart: this.hScrollPanelMouseDown
        },
        React.createElement('div', { ref: 'hScrollBar', className: prefixCls + '__hscroll__bar',
          onMouseDown: this.horizontalMoveStart,
          onTouchStart: this.horizontalMoveStart,
          onTouchMove: this.handleMove,
          onTouchEnd: this.handleMoveEnd
        })
      ),
      this.props.children
    );
  };

  return RBTable;
}(React.Component);


RBTable.propTypes = {
  columns: propTypes.arrayOf(propTypes.shape({
    header: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.func, propTypes.element]).isRequired,
    cell: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.func, propTypes.element]).isRequired,
    width: propTypes.number,
    minWidth: minMaxWidthType,
    maxWidth: minMaxWidthType,
    fixed: propTypes.oneOf(['left', 'right']),
    headerClassName: propTypes.string,
    cellClassName: propTypes.string,
    headerStyle: propTypes.obj,
    cellStyle: propTypes.obj
  })),
  data: propTypes.array.isRequired,
  prefixCls: propTypes.string.isRequired,
  onRowClick: propTypes.func
};

RBTable.defaultProps = {
  prefixCls: 'rb-table',
  data: []
};

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */
function isCrushed() {}

if (typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed' && typeof console !== 'undefined' && typeof console.error === 'function') {
  console.error('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of rb-component. ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}

return RBTable;

})));
