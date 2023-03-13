/** ************************************************************************
 *
 * A feature to create inheritance.
 *
 * extends.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _extends                     returns a Component inheriting from a parent,
 *
 *
 * Public Static Methods:
 *  . extends                     returns a Component inheriting from a parent,
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


// -- Private Functions ----------------------------------------------------

/**
 * Returns a new component inheriting from a parent.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Function}      the parent component,
 * @param {Object}        the new or overwriting methods,
 * @returns {Function}    returns the new component,
 * @since 0.0.0
 */
/* eslint-disable prefer-rest-params */
function _extends(parent, methods) {
  if (typeof parent !== 'function' || typeof parent.prototype.$hyperscript !== 'function') {
    return {
      erro_code: 'WrongComponent',
      message: 'the first argument is NOT a RView component!',
    };
  }

  if (Object.prototype.toString.call(methods) !== '[object Object]') {
    return {
      error_code: 'WrongValue',
      message: 'the second argument is NOT a literal object!',
    };
  }

  const Component = function() {
    let argu;
    const Child = function() {
      if (this instanceof Child) {
        return this._init(...argu);
      }
      argu = arguments;
      return new Child();
    };

    Child.prototype = Object.create(parent.prototype);
    Child.prototype.constructor = Child;
    Object.keys(methods).forEach((m) => {
      Child.prototype[m] = methods[m];
    });
    return Child;
  };

  return Component();
}
/* eslint-enable prefer-rest-params */


// -- Public Static Methods ------------------------------------------------

const Ex = {

  /**
   * Returns a new component inheriting from a parent.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Function}      the parent component,
   * @param {Object}        the new or overwriting methods,
   * @returns {Function}    returns the new component,
   * @since 0.0.0
   */
  extends(parent, methods) {
    return _extends(parent, methods);
  },
};


// -- Export
export default Ex;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
