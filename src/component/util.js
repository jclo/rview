/** ************************************************************************
 *
 * A set of utility functions for View.Component.
 *
 * util.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 *
 * Private Functions:
 *  . _getList                    processes the children list,
 *  . _search                     searches for the matching child,
 *
 *
 * Public Static Methods:
 *  . getChildren                 returns the children list,
 *  . getChild                    returns the child matching the given identity,
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
 * Processes the children list.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the parent object,
 * @returns {Array}         returns the child list,
 * @since 0.0.0
 */
function _getList(co) {
  const keys = Object.keys(co._cList)
      , list = []
      ;

  for (let i = 0; i < keys.length; i++) {
    list.push({
      id: co._cList[keys[i]].id,
      name: co._cList[keys[i]].name,
    });
  }
  return list;
}

/**
 * Searches for the child having the passed-in identity.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the parent object,
 * @param {String}          the child identity (tag, id or name),
 * @returns {Object}        returns the child object or null,
 * @since 0.0.0
 */
function _search(co, ident) {
  if (!co._cList) return null;

  // Processes recursively cList to find a matching child.
  const keys = Object.keys(co._cList);
  let key;
  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    if (ident === co._cList[key]._tag
      || ident === co._cList[key].id
      || ident === co._cList[key].name) {
      return co._cList[key];
    }
    const child = _search(co._cList[key], ident);
    if (child) return child;
  }
  return null;
}


// -- Public Static Methods ------------------------------------------------

const Util = {

  /**
   * Returns the children list.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the parent component object,
   * @returns {Array}       returns the children list,
   * @since 0.0.0
   */
  getChildren(co) {
    return co._cList ? _getList(co) : null;
  },

  /**
   * Returns the child component matching the passed-in identity.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        the parent component object,
   * @param {String}        the child identity (tag, id or name),
   * @returns {Object}      returns the matching child component,
   * @since 0.0.0
   */
  getChild(co, ident) {
    return ident && _.isString(ident) ? _search(co, ident) : null;
  },
};


// -- Export
export default Util;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
