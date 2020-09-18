/** ************************************************************************
 *
 * Defines the View object and its public method.
 *
 * View is the unique variable of this library that is exported outside
 * the library and thus accessible from the global windows. View implements
 * a method 'noconflict' to return the View variable to a previous owner if
 * any.
 *
 * rview.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Private Static Methods:
 *  . _setTestMode                returns internal objects for testing purpose,
 *
 *
 * Public Static Methods:
 *  . noConflict                  returns a reference to this RView object,
 *  . whoami                      returns the library name and version,
 *  . h                           converts the passed-in arguments to an object,
 *  . Component                   returns the extended View component,
 *  . render                      renders a View into the DOM,
 *  . restore                     restores the RView Component to its initial state,
 *  . remove                      removes the web component from the DOM,
 *  . plugin                      attaches a plugin,
 *  . makeid                      returns a new component id,
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
/* eslint-disable no-underscore-dangle */


// -- Vendor Modules


// -- Local Modules
import C from './component/main';
import R from './renderer/main';
import _ from './lib/_';
import Hyperscript from './component/hyperscript';
import Differ from './component/diffing';
import P from './plugin/main';
import Config from './component/config';


// -- Local Constants
// Saves the previous value of the library variable, so that it can be
// restored later on, if noConflict is used.
const previousRView = root.RView;


// -- Local Variables


// -- Main -----------------------------------------------------------------

const RView = {

  // Useful to retrieve the library name and version when it is
  // embedded in another library as an object:
  _library: { name: '{{lib:name}}', version: '{{lib:version}}' },


  // -- Private Static Methods ---------------------------------------------

  /**
   * Returns the internal objects for testing purpose.
   * (must not be deleted)
   *
   * @method ()
   * @private
   * @param {}              -,
   * @returns {Object}      returns a list of internal objects,
   * @since 0.0.0
   */
  _setTestMode() {
    return [_, C.Component, Hyperscript, Differ];
  },


  // -- Public Static Methods ----------------------------------------------

  /**
   * Returns a reference to this RView object.
   * (must not be deleted)
   *
   * Nota:
   * Running RView in no conflict mode, returns the RView variable to
   * its previous owner.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the RView object,
   * @since 0.0.0
   */
  noConflict() {
    /* eslint-disable-next-line no-param-reassign */
    root.RView = previousRView;
    return this;
  },

  /**
   * Returns the library name and version.
   * (must not be deleted)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the library name and version,
   * @since 0.0.0
   */
  whoami() {
    return this._library;
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

  /**
   * Attaches a plugin library.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the pluginn library,
   * @returns {Boolean}     returns true if it succeeds,
   * @since 0.0.0
   */
  plugin(plug) {
    return P.plugin(plug);
  },

  /**
   * Returns a new component id.
   *
   * @method ([arg1])
   * @public
   * @param {}            -,
   * @returns {String}    returns a random string,
   * @since 0.0.0
   */
  makeid() {
    return _.makeid(Config.idLength);
  },
};

// Attaches constants to RView that provide name and version of the lib.
RView.NAME = '{{lib:name}}';
RView.VERSION = '{{lib:version}}';


// -- Export
export default RView;

/* eslint-enable no-underscore-dangle */
