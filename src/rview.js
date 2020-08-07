/** ************************************************************************
 *
 * Defines the View object and its public method.
 *
 * View is the unique variable of this library that is exported outside
 * the library and thus accessible from the global windows. View implements
 * a method 'noconflict' to return the View variable to a previous owner if
 * any.
 *
 * view.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 *
 * Private Functions:
 *  . none,
 *
 *
 * Private Static Methods:
 *  . _setTestMode                returns the internal objects for testing purpose,
 *
 *
 * Public Static Methods:
 *  . noConflict                  returns a reference to this View object,
 *  . h                           converts the passed-in arguments to an object,
 *  . Component                   returns the extended View component,
 *  . render                      renders a View into the DOM,
 *  . restore                     restores the RView Component to its initial state,
 *  . remove                      removes the web component from the DOM,
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
/* global root */
/* eslint-disable one-var, semi-style, no-underscore-dangle */


// -- Vendor Modules


// -- Local Modules
import C from './component/main';
import R from './renderer/main';
import _ from './lib/_';
import Hyperscript from './component/hyperscript';
import Differ from './component/diffing';


// -- Local Constants
// Saves the previous value of the library variable, so that it can be
// restored later on, if noConflict is used.
const previousRView = root.RView;


// -- Local Variables


const RView = {

  // -- Private Static Methods ---------------------------------------------

  /**
   * Returns the internal objects for testing purpose.
   *
   * @method ()
   * @private
   * @param {}              -,
   * @returns {Array}       returns internal objects,
   * @since 0.0.0
   */
  _setTestMode() {
    return [_, C.Component, Hyperscript, Differ];
  },


  // -- Public Static Methods ----------------------------------------------

  /**
   * Returns a reference to this View object.
   *
   * Nota:
   * Running View in noConflic mode, returns the View variable to
   * its previous owner.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the View object,
   * @since 0.0.0
   */
  /* istanbul ignore next */
  noConflict() {
    /* eslint-disable-next-line no-param-reassign */
    root.RView = previousRView;
    return this;
  },

  /**
   * Converts the passed-in arguments to an object.
   *
   * @method (...args)
   * @public
   * @param {...args}       arguments like { tag, attributes, value },
   * @returns {Object}      returns the object,
   * @since 0.0.0
   */
  h(...args) {
    return Hyperscript.format(...args);
  },

  /**
   * Returns the extended View component.
   *
   * @method (arg1)
   * @public
   * @param {Objects}       the specific properties of the created component,
   * @returns {Object}      returns the extented component function,
   * @since 0.0.0
   */
  Component(methods) {
    return C.Component(methods);
  },

  /**
   * Renders a View into the DOM.
   *
   * @method ([el, components, template])
   * @public
   * @param {}              -,
   * @returns {Object}      returns the root component object,
   * @since 0.0.0
   */
  render(options) {
    // options.el: '# . node', // could be an id, a class or a node element
    // options.components: { 'tag': { fn: ref, state: {}, props: {} } }
    // options.template: 'XMLString',
    return R.render(options);
  },

  /**
   * Restores the View Component to its initial state.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the rview object,
   * @returns {Boolean}     returns true if the restore succeeds,
   * @since 0.0.0
   */
  restore(rview) {
    return R.restore(rview);
  },

  /**
   * Removes the web component from the DOM and destroys the object.
   *
   * @method (arg1)
   * @public
   * @param {String}        the view object,
   * @returns {Boolean}     returns true if it succeeds,
   * @since 0.0.0
   */
  remove(rview) {
    return R.remove(rview);
  },
};

// Attaches a constant to View that provides the version of the lib.
RView.VERSION = '{{lib:version}}';


// -- Export
export default RView;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
