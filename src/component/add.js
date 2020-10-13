/** ************************************************************************
 *
 * Adds a child to a component.
 *
 * add.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _fireEvents                 executes the component method events,
 *  . _attachMess                 attaches the messenger to the child component,
 *  . _attachChild                attaches a child to the passed-in component,
 *  . _insert                     inserts a child component,
 *
 *
 * Public Static Methods:
 *  . prepend                     adds a component as the first child,
 *  . append                      adds a component as the last child,
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
import R from './render';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Executes the component method events.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the component,
 * @returns {}              -,
 * @since 0.0.0
 */
function _fireEvents(co) {
  co.events();

  // Processes recursively cList to fire child events.
  if (co._cList) {
    const keys = Object.keys(co._cList);
    for (let i = 0; i < keys.length; i++) {
      co._cList[keys[i]].events();
      _fireEvents(co._cList[keys[i]]);
    }
  }
}

/**
 * Attaches the messenger to the child component.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the component,
 * @param {Object}          the messenger,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
function _attachMess(co, mess) {
  if (mess) {
    co._mess = mess;

    if (co._cList) {
      const keys = Object.keys(co._cList);
      for (let i = 0; i < keys.length; i++) {
        co._cList[keys[i]]._mess = mess;
        _attachMess(co._cList[keys[i]], mess);
      }
    }
  }
}
/* eslint-enable no-param-reassign */

/**
 * Attaches a child to the passed-in component.
 *
 * @function (arg1, arg2, arg3, arg4, arg5, arg6)
 * @private
 * @param {Object}          the component,
 * @param {Boolean}         the position of the child component,
 * @param {String}          the child component tag,
 * @param {Function}        the child component,
 * @param {Object}          the child component state properties,
 * @param {Object}          the child component properties,
 * @returns {}              -,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
function _attachChild(co, prepend, tag, child, state, props) {
  const c = child(state, props);
  c._tag = tag;

  if (!co._cList) co._cList = {};
  if (!co.children) co.children = {};
  co._cList[c._tag.replace(/[^a-zA-z0-9]/g, '')] = c;
  co.children[tag] = { fn: child, state, props };
  if (prepend) {
    if (!co._prepend) co._prepend = [];
    co._prepend.push(tag);
  } else {
    if (!co._append) co._append = [];
    co._append.push(tag);
  }
}
/* eslint-enable no-param-reassign */

/**
 * Inserts a child component.
 *
 * @function (arg1, arg2, arg3, arg4, arg5)
 * @private
 * @param {Object}          the component,
 * @param {Boolean}         the position of the child component,
 * @param {String}          the child component tag,
 * @param {Function}        the child component,
 * @param {Object}          the child component state and props properties,
 * @returns {}              -,
 * @since 0.0.0
 */
function _insert(co, prepend, ...args) {
  const [tag, child, opts] = args;

  // Links the child to the parent component.
  _attachChild(co, prepend, tag, child, opts.state, opts.props);

  // Renders the child component and its own childs if any.
  // This operation fills _cList, adds an unique id to the child component
  // and its own children.
  // Attaches the messenger object if any.
  const c = co.$getChild(tag);
  R.render(c);
  _attachMess(c, co._mess);

  // Now that the child component is linked to its parent, we can 'diffs'
  // the component with its DOM counterpart. This operation inserts the
  // child component to the DOM.
  co.$setState({});

  // And finally, we have to run the 'events' methods to attach the DOM
  // events to this child component.
  _fireEvents(c);
}


// -- Public Static Methods ------------------------------------------------

const Add = {

  /**
   * Adds a component as the first child,
   *
   * @method (arg1, ...args)
   * @public
   * @param {Object}        the component,
   * @param {...}           the child parameters,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  prepend(co, ...args) {
    _insert(co, true, ...args);
    return this;
  },

  /**
   * Adds a component as the last child,
   *
   * @method (arg1, ...args)
   * @public
   * @param {Object}        the component,
   * @param {...}           the child parameters,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  append(co, ...args) {
    _insert(co, false, ...args);
    return this;
  },
};


// -- Export
export default Add;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
