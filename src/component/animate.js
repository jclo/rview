/** ************************************************************************
 *
 * Performs a custom animation on a set of CSS properties.
 *
 * animate.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 *
 * Private Functions:
 *  . _swing                      defines the default easing method,
 *  . _isEasingFunction           checks if the argument is an Easing function,
 *  . _extractArgs                extracts the optional arguments of 'animate',
 *  . _run                        performs the animation,
 *  . _animate                    computes the animation parameters,
 *
 *
 * Public Static Methods:
 *  . animate                     performs a custom animation on a set of CSS
 *                                properties,
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ********************************************************************** */
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle */


// -- Vendor Modules


// -- Local Modules
import _ from '../lib/_';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Defines the default easing method.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {Number}          the current lapse time,
 * @param {Number}          the initial CSS property value,
 * @param {Number}          the difference between the final and the initial value,
 * @param {Number}          the animation duration,
 * @returns {Number}        returns the value of the CSS property at the current
 * @since 0.0.0             lapse time,
 */
/* eslint-disable no-mixed-operators */
function _swing(t, b, c, d) {
  return c * (0.5 - Math.cos(t / d * Math.PI) / 2) + b;
} /* eslint-enable no-mixed-operators */

/**
 * Checks if the passed-in argument is an Easing function.
 *
 * @function (arg1)
 * @private
 * @param {...}             the argument to analyse,
 * @returns {Boolean}       returns true if the argument is an easing function,
 * @since 0.0.0
 */
function _isEasingFunction(fn) {
  if (typeof fn === 'function'
    && (fn.name === 'linear'
        || fn.name === 'swing'
        || fn.name.startsWith('easeIn')
        || fn.name.startsWith('easeOut')
    )
  ) {
    return true;
  }
  return false;
}

/**
 * Extracts the optional arguments of 'animate'.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {?}               duration, easing or callback,
 * @param {?}               easing or callback,
 * @param {Object}          the function to call at completion,
 * @returns {Object}        returns an object with the properties duration,
 *                          easing, and callback,
 * @since 0.0.0
 */
function _extractArgs(...args) {
  const op1 = args[0]
      , op2 = args[1]
      , op3 = args[2]
      ;

  let nargs
    , duration
    , easing
    , callback
    ;

  // How many optional arguments?
  if (!op1 && !op2 && !op3) {
    nargs = 0;
  } else if (op1 && !op2 && !op2) {
    nargs = 1;
  } else if (op1 && op2 && !op3) {
    nargs = 2;
  } else {
    nargs = 3;
  }

  switch (nargs) {
    case 0:
      break;

    case 1:
      if (_.isNumber(op1) || op1 === 'fast' || op1 === 'slow') {
        duration = op1;
      } else if (_.isString(op1) || _isEasingFunction(op1)) {
        easing = op1;
      } else if (_.isFunction(op1)) {
        callback = op1;
      }
      break;

    case 2:
      if (_.isNumber(op1) || op1 === 'fast' || op1 === 'slow') {
        duration = op1;
        if (_.isString(op2) || _isEasingFunction(op2)) {
          easing = op2;
        } else if (_.isFunction(op2)) {
          callback = op2;
        }
      } else if (_.isString(op1) || _isEasingFunction(op1)) {
        easing = op1;
        if (_.isFunction(op2)) {
          callback = op2;
        }
      }
      break;

    case 3:
      if (_.isNumber(op1) || op1 === 'fast' || op1 === 'slow') {
        duration = op1;
      }
      if (_.isString(op2) || _isEasingFunction(op2)) {
        easing = op2;
      }
      if (_.isFunction(op3)) {
        callback = op3;
      }
      break;

    default:
      break;
  }

  return {
    duration,
    easing,
    callback,
  };
}

/**
 * Updates dynamically the CSS properties from their initial value to their final.
 *
 * Nota:
 * By default, the property values number aatached to 'component.state'.
 * Sometimes, the value is deeper in the path (for instance
 * component.state.xxx.yyy). In this case, you need to add a property '$rpath'
 * with the value 'xxx.yyy'. The absolute path is computed by adding this
 * relative path to 'component.state' (component.state[xxx][yyy]).
 *
 * @function (arg1, arg2, arg3, arg4, arg5, arg6)
 * @private
 * @param {Object}          the given node,
 * @param {Object}          the CSS properties to update,
 * @param {Function}        the easing method,
 * @param {Number}          the animation duration,
 * @param {Number}          the animation step,
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _run(component, properties, easing, duration, delay, callback) {
  const keys = Object.keys(properties);
  const rpath = properties.$rpath !== undefined ? properties.$rpath.split('.') : [];
  const index = keys.indexOf('$rpath');
  const props = {};
  const interstate = {};
  let lapseOfTime = 0
    , initial
    , value
    ;

  // Does the property '$rpath' exist?
  if (index > -1) {
    // Ok. remove it from 'keys'
    keys.splice(index, 1);
  }
  // Compute the absolute path to the property with '$rpath'
  let $path = component.state;
  rpath.forEach((item) => { $path = $path[item]; });

  // Compute easing parameters:
  keys.forEach((key) => {
    initial = parseFloat($path[key], 10);
    props[key] = {
      initial: parseFloat($path[key], 10),
      change: parseFloat(properties[key], 10) - initial,
      // suffix: properties[key].replace(/[0-9.]/g, ''),
      suffix: _.isString(properties[key])
        ? properties[key].replace(/[0-9.]/g, '')
        : '',
    };
  });

  // Execute easing:
  const timer = setInterval(() => {
    // easing:
    for (let i = 0; i < keys.length; i++) {
      value = easing(
        lapseOfTime,
        props[keys[i]].initial,
        props[keys[i]].change,
        duration,
      );
      interstate[keys[i]] = value + props[keys[i]].suffix;
    }

    // Reconcile component template and DOM:
    if (index > -1) {
      const ikeys = Object.keys(interstate);
      ikeys.forEach((key) => { $path[key] = interstate[key]; });
      component.$setState({});
    } else {
      component.$setState(interstate);
    }
    lapseOfTime += delay;
    if (lapseOfTime > duration) {
      clearInterval(timer);
      if (callback) callback();
    }
  }, delay);
}

/**
 * computes the animation parameters.
 *
 * @function (properties [, duration ] [, easing ] [, complete ])
 * @private
 * @param {Object}          an object of CSS properties,
 * @param {Number}          define how long the animation run,
 * @param {Easing}          the easing animation method,
 * @param {Function}        the function to call at completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _animate(component, properties, ...args) {
  const DTIME = 400
      , FAST  = 200
      , SLOW  = 600
      , INC   = 10
      , delay = INC
      ;

  // Is the argument properties an object?
  if (!_.isLiteralObject(properties)) {
    return;
  }

  // Extract the optional arguments:
  const argu = _extractArgs(...args);

  // Set the duration:
  const duration = _.isNumber(argu.duration) && argu.duration > 0
    ? argu.duration
    : (function(arg) {
      if (arg === 'fast') return FAST;
      if (arg === 'slow') return SLOW;
      return DTIME;
    }(argu.duration));

  // Set the easing (swing only for the time being):
  const easing = !argu.easing || _.isString(argu.easing) ? _swing : argu.easing;

  // Set the callback:
  const callback = argu.callback ? argu.callback : null;

  // Run the animation:
  _run(component, properties, easing, duration, delay, callback);
}


// -- Public Static Methods ------------------------------------------------

const Anim = {

  /**
   * Performs a custom animation on a set of CSS properties.
   *
   * @method (properties [, duration ] [, easing ] [, complete ])
   * @public
   * @param {Object}        an object of CSS properties,
   * @param {Number}        define how long the animation run,
   * @param {Easing}        the easing animation method,
   * @param {Function}      the function to call at completion,
   * @returns {}            -,
   * @since 0.0.0
   */
  animate(component, properties, ...args) {
    _animate(component, properties, ...args);
  },
};


// -- Export
export default Anim;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
