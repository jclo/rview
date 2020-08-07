/** ************************************************************************
 *
 * Defines the function that extends a child component from Generic and
 * returns the child component constructor.
 *
 * main.js is built upon the Prototypal Instantiation pattern. It
 * returns an object by calling its constructor. It doesn't use the new
 * keyword.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Constructor:
 *  . Component                   returns the child component constructor,
 *
 *
 *
 * Public Static Methods:
 *  . none,
 *
 *
 * Public Methods:
 *  . none,
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
import Generic from './generic';
import Dollar from './$';


// -- Local Constants


// -- Local Variables


// -- Public ---------------------------------------------------------------

/**
 * Returns the child component constructor.
 *
 * This function creates a child component that inherits from the Generic
 * component and extends the Generic component with its own methods.
 * Then, this function returns the child component constructor.
 *
 * @function (arg1)
 * @public
 * @param {Object}          the Child methods,
 * @returns {Function}      returns the child constructor,
 * @since 0.0.0
 */
/* eslint-disable prefer-rest-params */
function Component(methods) {
  let args;
  const Child = function() {
    if (this instanceof Child) {
      return Generic.Construct.apply(this, args);
    }
    args = arguments;
    return new Child();
  };

  // We created our own assign method as Object.assign does not preserve
  // the getters and setters. So, do not use Object.assign here! And, do not
  // do this 'Child.prototype = _.assign(Generic.methods, methods)'! You will
  // copy the references instead of cloning the methods. And all the childs
  // will get the methods of the last created child.
  const p1 = _.assign({}, Generic.methods);
  const p2 = _.assign(p1, { $: Dollar.$ });
  Child.prototype = _.assign(p2, methods || {});
  Child.prototype.constructor = Child;
  return Child;
}
/* eslint-enable prefer-rest-params */


// -- Export
export default { Component };

/* eslint-enable one-var, semi-style, no-underscore-dangle */
