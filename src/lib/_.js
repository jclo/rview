/** ************************************************************************
 *
 * Provides a set of utility functions.
 *
 * _.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 *
 * Private Functions:
 *  . none,
 *
 *
 * Public Static Methods:
 *  . extend                      extends the passed-in object with new methods,
 *  . assign                      extends source with target(s),
 *
 *  . isString                    is a given value a string?
 *  . isNumber                    is a given value a number?
 *  . isObject                    is a given variable an object?
 *  . isLiteralObject             is a given variable a literal object?
 *  . isFunction                  is a given variable a function?
 *  . isArray                     is a given value an array?
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


// -- Local Constants


// -- Local Variables


// -- Public Static Methods ------------------------------------------------

const _ = {

  /**
   * Extends the passed-in object with new methods.
   *
   * Nota: this function mutates object.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        the object to extend,
   * @param {Object}        an object containing a set of methods,
   * @returns {}            -,
   * @since 0.0.0
   */
  extend(object, methods) {
    const keys = Object.keys(methods);

    for (let i = 0; i < keys.length; i++) {
      /* eslint-disable-next-line no-param-reassign */
      object[keys[i]] = methods[keys[i]];
    }
    return object;
  },

  /**
   * Extends source with target(s) while preserving the assessors.
   *
   * Nota:
   * Clones a literal object at the first level while preserving the
   * assessors (get and set). This should be the prefered method to Clones
   * a literal object or a prototype that includes get and set assessors.
   *
   * Example:
   * To clone a function prototype:
   * var a = _.assign({}, fn.prototype);  // clone the original prototype,
   * _.assign(fn2.prototype, a);          // assign it to fn2.prototype,
   *
   * @method (...arg1)
   * @public
   * @param {Object}        the objects to 'fusion',
   * @returns {Object}      returns the reassigned object,
   * @since 0.0.0
   */
  /* eslint-disable no-param-reassign, no-loop-func, prefer-rest-params */
  assign() {
    const target = arguments[0];
    let source
      , descriptors
      , i
      ;

    for (i = 1; i < arguments.length; i++) {
      source = arguments[i];
      descriptors = Object.keys(source).reduce((props, key) => {
        props[key] = Object.getOwnPropertyDescriptor(source, key);
        return props;
      }, {});
    }
    Object.defineProperties(target, descriptors);
    return target;
  },
  /* eslint-enable no-param-reassign, no-loop-func, prefer-rest-params */


  // -- Subset of Overslash ------------------------------------------------

  /**
   * Is a given value a string?
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
  },

  /**
   * Is a given value a number?
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  isNumber(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
  },

  /**
   * Is a given variable an object?
   * (copied from: http://underscorejs.org)
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  isObject(obj) {
    const type = typeof obj;
    return (type === 'function' || type === 'object') && !!obj;
  },

  /**
   * Is a given variable a literal object?
   *
   * @method (arg1)
   * @private
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.3
   */
  isLiteralObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },

  /**
   * Is a given variable a function?
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  },

  /**
   * Is a given value an array?
   * (Delegates to ECMA5's native Array.isArray.)
   * (copied from: http://underscorejs.org)
   *
   * @method (arg1)
   * @public
   * @param {Object}        the object to test,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },
};


// -- Export
export default _;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
