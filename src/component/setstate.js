/** ************************************************************************
 *
 * Updates state values and updates the modified DOM elements using 'diff'.
 *
 * setstate.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 *
 * Private Functions:
 *  . _setState                   updates state value(s),
 *
 *
 * Public Static Methods:
 *  . setState                    updates state value(s),
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
import D from './diffing';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Updates state value(s).
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the component object,
 * @param {Object}          the state object,
 * @returns {}              -,
 * @since 0.0.0
 */
function _setState(component, params) {
  const { state } = component
      , keys = Object.keys(params)
      ;

  // Update the state property:
  for (let i = 0; i < keys.length; i++) {
    state[keys[i]] = params[keys[i]];
  }

  // Get component template
  let xml = component.render(component.state, component.props);
  if (component._tdiv) {
    xml = `<div id="${component.id}">${xml}</div>`;
  } else if (component._ttag === 'div') {
    xml = xml.replace(/^\s*<div/, `<div id="${component.id}"`);
  } else if (component._ttag === 'header') {
    xml = xml.replace(/^\s*<header/, `<header id="${component.id}"`);
  } else {
    throw new Error('_setState: gloups, this should never appear!');
  }

  // Parse all the children and see if they are differences and update only
  // the dom elements that need to be updated.
  D.diff(D.stringToHTML(xml), component.$()[0]);
}


// -- Public Static Methods ------------------------------------------------

const State = {

  /**
   * Updates state value(s).
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}          the component object,
   * @param {Object}          the state object,
   * @returns {}              -,
   * @since 0.0.0
   */
  setState(component, params) {
    _setState(component, params);
  },
};


// -- Export
export default State;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
