/** ************************************************************************
 *
 * Defines the generic component. All the created components extend this
 * component.
 *
 * generic.js is built upon the Prototypal Instantiation pattern. It
 * returns an object by calling its constructor. It doesn't use the new
 * keyword.
 *
 *
 * Private Functions:
 *  . none,
 *
 *
 * Constructor:
 *  . Construct                   constructor,
 *
 *
 * Private Variables
 *  . _tag                        constains the tag string of the component,
 *  . _cList                      contains the list of children objects,
 *  . _mess                       the messenger object,
 *
 * Private Methods:
 *  . _init                       executes the private init when the comp. is created,
 *  . _renderer                   renders the component an its children, return XML,
 *
 *
 * Public Variables:
 *  . id                          unique id of the component (read only),
 *  . children                    list of the children components,
 *  . state                       component state properties,
 *  . props                       component properties,
 *  . name                        name of the component,
 *
 *
 * Public Methods:
 *  . $                           returns an object to manipulate the comp. in the DOM,
 *  . $animate                    animates the component,
 *  . $getChild                   returns a component object,
 *  . $getChildren                returns the list of the children,
 *  . $getIdAndName               returns the component's Id and name,
 *  . $hyperscript                returns an XML string of the hyperscript template,
 *  . $setState                   updates state value(s),
 *  . $listen                     listens a message,
 *  . $emit                       sends a message,
 *
 *
 * Empty Public Methods:
 *  . init                        executes the public initializations,
 *  . events                      processes the DOM events,
 *  . render                      returns the component XML string,
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
import A from './animate';
import R from './render';
import H from './hyperscript';
import S from './setstate';
import Util from './util';


// -- Local Constants


// -- Local Variables


// -- Public ---------------------------------------------------------------

/**
 * Defines the Generic Component constructor.
 *
 * @constructor (...args)
 * @public
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function Construct() {
  /* eslint-disable-next-line prefer-spread, prefer-rest-params */
  this._init.apply(this, arguments);
}


const methods = {


  // -- Private Methods ----------------------------------------------------

  /**
   * Does the initializations when the component is created.
   *
   * @method (arg1)
   * @private
   * @param {Object}        the options,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  _init(...args) {
    // init private:
    this._tag = null;
    this._cList = null;
    this._mess = null;

    // init public:
    // Creates an unique id for this component:
    this.id = `i${Math.random().toString(36).substr(2, 7)}`;
    this.children = null;

    const [state, props] = args;
    this.state = _.isLiteralObject(state) ? state : {};
    this.props = _.isLiteralObject(props) ? props : {};
    this.name = 'mynameisnobody';

    // Call the public init:
    this.init();
    return this;
  },

  /**
   * Renders the component and returns its XMLString.
   * (must not be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {XMLString}   returns the component's XMLString,
   * @since 0.0.0
   */
  _renderer() {
    return R.render(this);
  },


  // -- Defined Public Methods ---------------------------------------------

  /**
   * Returns an object to manipulate the component in the DOM.
   * (must not be overwritten - see implementation in $.js)
   *
   * Nota: $ is filled when the View.Component is created
   * (see main.js constructor).
   *
   * @method (arg1)
   * @public
   * @param {String}        the node selector (id or class),
   * @returns {Object}      returns the $ object,
   * @since 0.0.0
   */
  $: null,

  /**
   * Animates the component.
   * (must not be overwritten)
   *
   * @method (...args)
   * @public
   * @param {...args}       properties [, duration ] [, easing ] [, callback ],
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $animate(...args) {
    A.animate(this, ...args);
    return this;
  },

  /**
   * Returns a component object.
   * (must not be overwritten)
   *
   * Nota:
   * the algorithm tests 'ident' in this order: tag, id, name. It
   * explores by parsing entirely the first child branch before parsing the
   * second child branch. I stops as soon as there is a match.
   *
   * So, if a child in the second child branch as the same tag or name as a
   * child in the first child branch, the algorithm returns the child in the
   * first branch only. The matching child on the second branch won't never be
   * retrieved.
   *
   * So, avoid duplicating tag or name.
   *
   * @method (arg1)
   * @public
   * @param {String}        the component identity (could be tag, id or name),
   * @returns {Object}      returns the component object or null,
   * @since 0.0.0
   */
  $getChild(ident) {
    return Util.getChild(this, ident);
  },

  /**
   * Returns the list of children.
   * (must not be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Array}       returns the children list or null,
   * @since 0.0.0
   */
  $getChildren() {
    return Util.getChildren(this);
  },

  /**
   * Returns the component's Id and name.
   * (must not be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the component's id and name,
   * @since 0.0.0
   */
  $getIdAndName() {
    return { id: this.id, name: this.name };
  },

  /**
   * Returns an XMLString representation of the hyperscript template.
   * (must not be overwritten)
   *
   * @method (...args)
   * @public
   * @param {...}           arguments like { tag, attributes, value },
   * @returns {Object}      returns an object containing the node, its attributes
   * @since 0.0.0           and the children,
   */
  $hyperscript(...args) {
    return H.format(...args);
  },

  /**
   * Updates state value(s).
   * (must not be overwritten)
   *
   * @method (arg1)
   * @public
   * @param {Object}        the state object,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $setState(params) {
    if (_.isLiteralObject(params)) {
      S.setState(this, params);
    }
    return this;
  },

  /**
   * Listens for a message from another component.
   * (must not be overwritten)
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the event to listen,
   * @param {Function}      the listener to attach to this event,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $listen(event, listener) {
    if (this._mess) {
      this._mess.subscribe(event, listener);
      return this;
    }
    /* eslint-disable-next-line no-console */
    console.log('$listen: the plugin Messenger is not installed!');
    return this;
  },

  /**
   * sends for a message to another component.
   * (must not be overwritten)
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the event to listen,
   * @param {Object}        the payload to send,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $emit(event, payload) {
    if (this._mess) {
      this._mess.publish(event, payload);
      return this;
    }
    /* eslint-disable-next-line no-console */
    console.log('$emit: the plugin Messenger is not installed!');
    return this;
  },


  // -- Empty Public Methods -----------------------------------------------

  /**
   * Does the initializations when the component is created.
   * (could be overwritten)
   *
   * Nota:
   * 'props.options' are initialized when the component is instantiated. Be
   * careful not to overwrite it.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  init() {
    return this;
  },

  /**
   * Processes the DOM events.
   * (could be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  events() {
    return this;
  },

  /**
   * Returns an XMLString.
   * (could be overwritten)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  render() {
    return '<div></div>';
  },
};


// -- Export
export default { Construct, methods };

/* eslint-enable one-var, semi-style, no-underscore-dangle */
