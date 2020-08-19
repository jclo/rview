/** ************************************************************************
 *
 * Implements the methods to manipulate the DOM.
 *
 * $.js is just an object that contains a set of methods. It implements the
 * factory pattern. Thus, $(sel) returns the selected node and the methods
 * listed below.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Public Variables:
 *  . id                          the id of selected element,
 *  . [0]                         the selected DOM element,
 *  . _root                       the first parent element,
 *
 *
 * Constructor:
 *  . $                           creates the component,
 *
 *
 * Public Methods:
 *  . select                      selects a child element,
 *  . selectChild                 selects the nth child,
 *  . parent                      returns to the parent element,
 *  . firstParent                 returns to the root parent if defined,
 *
 *  . find                        returns the NodeList of the matching children,
 *  . tag                         returns the tag name of the selected element,
 *
 *  . innerHTML                   returns the value of an element as an XMLString,
 *  . outerHTML                   returns an element as an XMLString,
 *  . text                        gets the text contents of the element,
 *
 *  . firstChild                  returns the firstChild element,
 *  . children                    returns the children,
 *  . childIndex                  returns the children position in the parent tree,
 *  . getBoundingClientRect       returns the DOMRect object that bounds,
 *
 *  . css                         gets the style attribute of the element,
 *
 *  . getClassList                returns the DOMTokenList collection,
 *  . hasClass                    checks if the element has the passed-in class,
 *
 *  . attr                        gets the specified attribute,
 *
 *  . on                          attachs an event listener to the current node,
 *  . off                         removes an event listener from the current node,
 *  . trigger                     fires the event associated to the selected node,
 *
 *  . remove                      removes the element from the DOM,
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


// -- Public Methods -------------------------------------------------------

function $(selector) {
  const cid = this.id;
  let el
    , el0
    ;

  /**
   * Select a child element.
   *
   * @method (arg1)
   * @public
   * @param {String}        the selector,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  const select = function(sel) {
    if (typeof sel === 'string' && this[0]) {
      const child = this[0].querySelector(sel);
      if (child) {
        this[0] = child;
      }
    }
    return this;
  };

  /**
   * Selects the specified child if it exists.
   *
   * @method (arg1)
   * @public
   * @param {Number}        the child index,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  const selectChild = function(n) {
    if (Object.prototype.toString.call(n) === '[object Number]') {
      this[0] = this[0].children[n] ? this[0].children[n] : this[0];
    }
    return this;
  };

  /**
   * Returns to the parent element.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  const parent = function() {
    if (this._root) {
      // As a root parent is defined, we stop at it.
      if (this[0] !== this._root) {
        this[0] = this[0].parentNode;
      }
    } else {
      this[0] = this[0].parentNode;
    }
    return this;
  };

  /**
   * Returns to the root parent if defined.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  const firstParent = function() {
    if (this._root) {
      this[0] = this._root;
    }
    return this;
  };

  /**
   * Returns the NodeList of the matching children.
   *
   * @method (arg1)
   * @public
   * @param {String}        the selector,
   * @returns {Array}       returns the NodeList,
   * @since 0.0.0
   */
  const find = function(sel) {
    return this[0].querySelectorAll(sel);
  };

  /**
   * Returns the tag name of the selected element.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {String}      returns the tag name,
   * @since 0.0.0
   */
  const tag = function() {
    if (this[0]) {
      return this[0].tagName;
    }
    return null;
  };

  /**
   * Returns the value of an element as an XMLString.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {String}      returns the XMLString,
   * @since 0.0.0
   */
  const innerHTML = function() {
    return this[0].innerHTML;
  };

  /**
   * Returns an element as an XMLString.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {}            returns the XMLString,
   * @since 0.0.0
   */
  const outerHTML = function() {
    return this[0].outerHTML;
  };

  /**
   * Gets the text contents of the element,
   *
   * @method (arg1)
   * @public
   * @param {String}        the text contents to add,
   * @returns {String}      returns the text contents or this;,
   * @since 0.0.0
   */
  const text = function() {
    return this[0].textContent;
  };

  /**
   * Returns the firstChild.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the firstChild,
   * @since 0.0.0
   */
  const firstChild = function() {
    return this[0].firstElementChild;
  };

  /**
   * Returns the children.
   *
   * @method ()
   * @public
   * @param {}            -,
   * @returns {Object}    returns the children HTMLCollection,
   * @since 0.0.8
   */
  const children = function() {
    return this[0].children;
  };

  /**
   * Returns the children position in the parent tree.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the children position,
   * @since 0.0.8
   */
  const childIndex = function() {
    let child = this[0]
      , index = 0
      ;

    while (child !== null) {
      child = child.previousElementSibling;
      index += 1;
    }
    return index - 1;
  };

  /**
   * Returns the DOMRect object that bounds the contents of the range.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the DOMRect object,
   * @since 0.0.8
   */
  const getBoundingClientRect = function() {
    return this[0] ? this[0].getBoundingClientRect() : null;
  };

  /**
   * Gets/Sets the style attribute of the element,
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the style attribute,
   * @param {String}        the style attribute value,
   * @returns {String}      returns the style attribute value or this,
   * @since 0.0.0
   */
  const css = function(styleAttr) {
    const arr = typeof styleAttr === 'string' ? styleAttr.split('-') : [];
    let attr = '';

    // Convert style attribute name with '-' (ex.: 'font-size' to 'fontSize'):
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        attr += arr[i];
      } else {
        attr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
    }
    return this[0].style[attr];
  };

  /**
   * Returns the DOMTokenList collection of the class attributes of the element.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns the DOMTokenList of the element,
   * @since 0.0.0
   */
  const getClassList = function() {
    return this[0].classList;
  };

  /**
   * Checks if the element has the passed-in class.
   *
   * @method (arg1)
   * @public
   * @param {String}        the class name,
   * @returns {Boolean}     returns true or false,
   * @since 0.0.8
   */
  const hasClass = function(className) {
    const list = this[0].classList.value.split(' ');

    if (Object.prototype.toString.call(className) === '[object String]' && list.indexOf(className) !== -1) {
      return true;
    }
    return false;
  };

  /**
   * Gets the specified attribute.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the attribute name,
   * @param {String}        the attribute value,
   * @returns {String}      returns the attribute value or this,
   * @since 0.0.0
   */
  const attr = function(attribute) {
    return this[0].getAttribute(attribute);
  };

  /**
   * Attachs an event listener to the current node.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the DOM event string,
   * @param {Function}      the listner function,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  const on = function(event, listener) {
    this[0].addEventListener(event, listener);
    return this;
  };

  /**
   * Removes an event listener from the current node.
   *
   * @method (arg1, arg2)
   * @public
   * @param {String}        the DOM event string,
   * @param {Function}      the listner function,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  const off = function(event, listener) {
    this[0].removeEventListener(event, listener);
    return this;
  };

  /**
   * Fires the event associated to the selected node.
   *
   * @method (arg1)
   * @public
   * @param {String}        the event name,
   * @returns {Boolean}     returns false if preventDefault was activated
   * @since 0.0.0           otherwise true,
   */
  const trigger = function(event) {
    return this[0].dispatchEvent(new Event(event));
  };

  /**
   * Removes the element from the DOM.
   * (to handle with care!)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  const remove = function() {
    this[0].parentNode.removeChild(this[0]);
    return this;
  };


  // -- Main
  if (selector) {
    // Selects the first element that matches the selector(s):
    el = document.querySelector(`#${cid}`).querySelector(selector);
  } else {
    // Selects the entire 'web component':
    el = document.querySelector(`#${cid}`);
    el0 = el;
  }

  return {
    0: el,
    id: el ? el.id : null,
    _root: el0,
    // getElement: getElement,
    select,
    selectChild,
    parent,
    firstParent,
    find,
    tag,
    innerHTML,
    outerHTML,
    text,
    firstChild,
    children,
    childIndex,
    getBoundingClientRect,
    css,
    getClassList,
    hasClass,
    attr,
    on,
    off,
    trigger,
    remove,
  };
}


// -- Export
export default { $ };

/* eslint-enable one-var, semi-style, no-underscore-dangle */
