/** ************************************************************************
 *
 * Converts an hyperscript object to a node element.
 *
 * hyperscript.js is just a literal object that contains a set of functions.
 * It can't be intantiated.
 *
 *
 * Private Functions:
 *  . _reshuffle                  rebuilds the component tags,
 *  . _stringify                  returns the attribute value converted to a string,
 *  . _render                     converts an hyperscript object to a node element,
 *
 *
 * Public Static Methods:
 *  . format                      converts the passed-in arguments to an object,
 *  . render                      converts an hyperscript object to an XMLString,
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
 * Rebuilds the component tags.
 *
 * Nota:
 * When serialized the component tags become '<cxx></cxx>'. We reformat them
 * as it should be, i.e. '<Cxx />'. Besides, we update 'cList' to link
 * the component tag to the component object ({ '<Cxx />': Cxx }).
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {String}          the serialized node,
 * @param {Object}          the cList object,
 * @param {Object}          the local cList object,
 * @returns {String}        returns the reformatted serialized node,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
function _reshuffle(node, cList, locList) {
  const keys = Object.keys(locList)
      ;

  for (let i = 0; i < keys.length; i++) {
    node = node
      .replace(`</${keys[i].toLowerCase()}>`, '')
      .replace(keys[i].toLowerCase(), `${keys[i]} /`);

    cList[`<${keys[i]} />`] = locList[keys[i]];
  }
  return node;
}
/* eslint-enable no-param-reassign */

/**
 * Returns the attribute value converted to a string.
 *
 * Nota:
 * This function converts a style attribute like this:
 *  . style: { 'font-family': 'helvetica', 'font-size': '20px' }
 *
 * @function (arg1)
 * @private
 * @param {Object}          the attribute value,
 * @returns {String}        returns a string of the attribute value,
 * @since 0.0.0
 */
function _stringify(attr) {
  const keys = Object.keys(attr)
      ;

  let s = '';
  for (let i = 0; i < keys.length; i++) {
    s += i < keys.length - 1
      ? `${keys[i]}: ${attr[keys[i]]}; `
      : `${keys[i]}: ${attr[keys[i]]};`;
  }
  return s;
}

/**
 * Converts an hyperscript object to a node element.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the hyperscript object,
 * @param {Object}          the local version of cList to link a tag to a component,
 * @returns {Object}        the node representation,
 * @since 0.0.0
 */
function _render(vnode, locList) {
  const { nodeName } = vnode
      , { attributes } = vnode
      , { children } = vnode
      ;

  let el
    , keys
    , value
    , obj
    , id
    , i
    ;

  // Checks if vnode is a string. If it is the case, it means that this node
  // is in fact a text node. So, we return the created element text node.
  if (_.isString(vnode)) {
    return document.createTextNode(vnode);
  }

  // nodeName could be an HTML tag, an hyperscript node or a Component.
  switch (typeof nodeName) {
    // nodeName is an HTML tag. We create a node element from this tag and
    // we attach the attributes defined by 'attributes'. The 'attributes'
    // could be a value or an object if this attribute is a style.
    case 'string':
      el = document.createElement(nodeName);
      keys = attributes ? Object.keys(attributes) : [];
      for (i = 0; i < keys.length; i++) {
        value = _.isObject(attributes[keys[i]])
          ? _stringify(attributes[keys[i]])
          : attributes[keys[i]];
        el.setAttribute(keys[i], value);
      }
      break;

    // 'nodeName' is a function. It could be an hyperscript object or a sub
    // 'component'. If the object returned by the executed function nodeName
    // has the method 'render', it is a component otherwise it is an
    // hyperscript object.
    case 'function':
      obj = nodeName();
      if (obj.render) {
        // We do not process subcomponents otherwise they are merged with
        // the current node and we can't access them independently. Thus,
        // we create a tag ('<Cxx />') instead and this Component is processed
        // independently so it inherits of an unique id and a reference in cList.
        // If the name isn't provided, we create an unique identifier for this
        // subcomponent but it becomes then difficult to access it.
        id = attributes && attributes.name
          ? attributes.name
          : `C${Math.random().toString(36).substr(2, 7)}`;
        /* eslint-disable-next-line no-param-reassign */
        locList[id] = {
          fn: nodeName,
          state: attributes.state ? attributes.state : null,
          props: attributes.props ? attributes.props : null,
        };
        el = _render({ nodeName: id, attributes: null, children: [] }, locList);
      } else {
        // We process recursively the hyperscript objects.
        el = _render(obj, locList);
      }
      break;

    default:
      throw new Error(
        `hypserscript._render: nodeName is a ${typeof nodeName} ???`,
      );
  }

  // Recursively processes all of its children:
  for (i = 0; i < children.length; i++) {
    el.appendChild(_render(children[i], locList));
  }

  return el;
}


// -- Public Static Methods ------------------------------------------------

const Hyperscript = {

  /**
   * Converts the passed-in arguments to an object.
   *
   * @method (...args)
   * @public
   * @param {...args}       arguments like { tag, attributes, value },
   * @returns {Object}      returns the object,
   * @since 0.0.0
   */
  format(...args) {
    const [nodeName, attributes, ...children] = args;
    return { nodeName, attributes, children };
  },

  /**
   * Converts an hyperscript object to a node and returns its string representation.
   *
   * @method (arg1, arg2)
   * @public
   * @param {Object}        the hyperscript object,
   * @param {Object}        the cList object,
   * @returns {String}      returns the string represention of the hyperscript object,
   * @since 0.0.0
   */
  render(vnode, cList) {
    const s = new XMLSerializer()
        , locList = {}
        ;

    const node = s.serializeToString(_render(vnode, locList))
      .replace('xmlns="http://www.w3.org/1999/xhtml"', '');
    return _reshuffle(node, cList, locList);
  },
};


// -- Export
export default Hyperscript;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
