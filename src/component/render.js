/** ************************************************************************
 *
 * Implements the _renderer method.
 *
 * render.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 *
 * Private Functions:
 *  . _format                     formats the children object,
 *  . _formatTemplate             returns the template converted to an unique el,
 *  . _render                     renders the component and its children,
 *
 *
 * Public Static Methods:
 *  . render                      renders the component and its children,
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
import Hyper from './hyperscript';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Formats the children object.
 *
 * Nota:
 * it returns: { tag1: { fn: function, state: ..., props: ... }, tag2: {...}, ... }
 *
 * @function (arg1)
 * @private
 * @param {Object}          the children object,
 * @returns {Object}        returns the formated children object,
 * @since 0.0.0
 */
function _format(children) {
  if (!_.isLiteralObject(children)) {
    return {};
  }

  const newc = {};
  const childs = Object.keys(children);
  let child;
  for (let i = 0; i < childs.length; i++) {
    child = childs[i];

    if (_.isFunction(children[child])) {
      // is { tag: function }
      newc[child] = {
        fn: children[child],
        state: null,
        props: null,
      };
    } else if (_.isLiteralObject(children[child])
        && _.isFunction(children[child].fn)) {
      // is { tag: { fn: function, state: ..., props: ... }}
      newc[child] = {
        fn: children[child].fn,
        state: _.isLiteralObject(children[child].state)
          ? children[child].state
          : null,
        props: _.isLiteralObject(children[child].props)
          ? children[child].props
          : null,
      };
    } else {
      newc[child] = {
        fn: null,
        state: null,
        props: null,
      };
      /* eslint-disable-next-line no-console */
      console.log('warning: this component list is invalid. key "c" is missing!');
    }
  }

  return newc;
}

/**
 * Returns the template converted to an unique element.
 *
 * @function (arg1, arg2)
 * @private
 * @param {XMLString}       the template of the component,
 * @param {Number}          the id of the component,
 * @returns {Object}        returns the formated template,
 * @since 0.0.0
 */
function _formatTemplate(xml, id) {
  const node = document.createElement('div');
  node.innerHTML = xml;

  if (node.children.length > 1) {
    return [`<div id="${id}">${xml}</div>`, true];
  }

  const firstChild = node.firstElementChild;
  if (!firstChild) {
    return [`<div id="${id}"></div>`, true];
  }

  const tag = firstChild.tagName.toLocaleLowerCase();
  if (tag !== 'div' && tag !== 'header' && tag !== 'footer') {
    return [`<div id="${id}">${xml}</div>`, true];
  }

  if (tag === 'div') {
    return [xml.replace(/^\s*<div/, `<div id="${id}"`), false, 'div'];
  }

  if (tag === 'header') {
    return [xml.replace(/^\s*<header/, `<header id="${id}"`), false, 'header'];
  }

  return [xml.replace(/^\s*<footer/, `<footer id="${id}"`), false, 'footer'];
}

/**
 * Renders the component and its children.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the component object,
 * @returns {XMLString}     returns the XMLString representation,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
function _render(co) {
  let xml
    , t
    ;

  // Render the component and check if it is an hyperscript:
  xml = co.render(co.state, co.props);
  if (_.isLiteralObject(xml) && _.isString(xml.nodeName)) {
    // This is an hyperscript object. We need to convert it to a serialized
    // node:
    co.children = {};
    xml = Hyper.render(xml, co.children);
  }

  // Add an unique id to this component:
  // A template must be an unique div, header, footer element with or without
  // child. If it isn't the case, we surround it by a 'div' element.
  const [s, addDiv, tagName] = _formatTemplate(xml, co.id);
  t = s;
  co._tdiv = addDiv ? 'div' : null;
  co._ttag = tagName || null;

  // Has this component children?
  if (co.children) {
    // This component includes components, render them:
    // Format children as this: { tag : { fn: function, state: ..., props: ... }}
    co.children = _format(co.children);
    co._cList = {};
    const ctags = Object.keys(co.children);
    let tag;
    let c;
    for (let i = 0; i < ctags.length; i++) {
      tag = ctags[i];
      if (_.isFunction(co.children[tag].fn)) {
        // Instantiate the child by passing the state and props:
        c = co.children[tag].fn(co.children[tag].state, co.children[tag].props);
        c._tag = tag;
        // Replace the children tag by its rendered template:
        t = t.replace(tag, c._renderer());
        // Save the children object in a list:
        co._cList[tag.replace(/[^a-zA-z0-9]/g, '')] = c;
      } else {
        /* eslint-disable-next-line no-console */
        console.log(`warning: there is no component associated to this tag: ${tag}!`);
      }
    }
  }

  // Returns the XMLString representation.
  return t;
}
/* eslint-enable no-param-reassign */


// -- Public Static Methods ------------------------------------------------

const Render = {

  /**
   * Renders the component and its children.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the component object,
   * @returns {XMLString}   returns the XMLString representation,
   * @since 0.0.0
   */
  render(co) {
    return _render(co);
  },
};


// -- Export
export default Render;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
