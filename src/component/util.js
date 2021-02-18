/** ************************************************************************
 *
 * A set of utility functions for View.Component.
 *
 * util.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _getList                    processes the children list,
 *  . _search                     searches for the matching child,
 *  . _remove                     removes the component's child,
 *
 *
 * Public Static Methods:
 *  . getChildren                 returns the children list,
 *  . getChild                    returns the child matching the given identity,
 *  . removeChild                 removes the component's child,
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
// function _search(co, ident) {
//   if (!co._cList) return null;
//
//   // Processes recursively cList to find a matching child.
//   const keys = Object.keys(co._cList);
//   let key;
//   for (let i = 0; i < keys.length; i++) {
//     key = keys[i];
//     if (ident === co._cList[key]._tag
//       || ident === co._cList[key].id
//       || ident === co._cList[key].name) {
//       return co._cList[key];
//     }
//     const child = _search(co._cList[key], ident);
//     if (child) return child;
//   }
//   return null;
// }
function _search(co, ident) {
  if (!co._cList) return { parent: co, child: null };

  // Processes recursively cList to find a matching child.
  const keys = Object.keys(co._cList);
  let key;
  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    if (ident === co._cList[key]._tag
      || ident === co._cList[key].id
      || ident === co._cList[key].name) {
      return { parent: co, child: co._cList[key] };
    }
    const child = _search(co._cList[key], ident);
    if (child) return child;
  }
  return { parent: co, child: null };
}

/**
 * Removes the passed-in child from the component.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the parent object,
 * @param {String}          the child identity (tag, id or name),
 * @returns {Boolean}       returns true or false,
 * @since 0.0.0
 */
/* eslint-disable no-proto */
function _remove(co, ident) {
  const r = _search(co, ident);
  if (!r.child) return false;

  const tag = r.child._tag;
  const stag = r.child._tag.replace('<', '').replace('/>', '').trim();

  // 1. Remove the component child from DOM:
  r.child.$().remove();

  // 2. Remove all own and inherited properties from the component child:
  Object.getOwnPropertyNames(r.child).forEach((key) => { delete r.child[key]; });
  r.child.__proto__ = {};

  // 3. Remove all own and inherited properties from component child Constructor:
  Object.getOwnPropertyNames(r.parent.children[tag]).forEach((key) => {
    delete r.parent.children[tag][key];
  });
  r.parent.children[tag].__proto__ = {};

  // 4. Remove all traces from parent:
  delete r.parent._cList[stag];
  delete r.parent.children[tag];

  return true;
}
/* eslint-enable no-proto */


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
    return ident && _.isString(ident) ? _search(co, ident).child : null;
  },

  /**
   * Removes the component's child.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        the parent component object,
   * @param {String}        the child identity (tag, id or name),
   * @returns {Boolean}     returns true or false,
   * @since 0.0.0
   */
  removeChild(co, ident) {
    return ident && _.isString(ident) ? _remove(co, ident) : false;
  },
};


// -- Export
export default Util;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
