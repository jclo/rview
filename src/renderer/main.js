/** ************************************************************************
 *
 * Implements the View methods to render and attach a component to the DOM.
 *
 * main.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _fireEvents                 fires the DOM events,
 *  . _attachMessenger            attaches the messenger object to all childs,
 *  . _format                     returns a formated XMLString (one element only),
 *  . _filter                     filters the parameters passed to View.render(),
 *  . _attachTemplateDOM          attaches the XML string to the DOM,
 *  . _remove                     removes the web component from the DOM,
 *  . _restore                    restores the View Component to its initial state.
 *  . _componenterize             transforms the selected node to a RView Component,
 *  . _render                     attaches the root comp and its childs to the DOM,
 *
 *
 * Public Static Methods:
 *  . render                      attaches the root comp and its childs to the DOM,
 *  . restore                     restores the View Component to its initial state,
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
/* global */
/* eslint-disable one-var, semi-style, no-underscore-dangle */


// -- Vendor Modules
// import Messenger from '@mobilabs/messenger';


// -- Local Modules
import V from '../component/main';
import _ from '../lib/_';
import P from '../plugin/main';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Fires the DOM Events.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the child,
 * @returns {}              -,
 * @since 0.0.0
 */
function _fireEvents(co) {
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
 * Attaches the messenger object to all childs.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the child,
 * @param {Object}          the messenger object,
 * @returns {}              -,
 * @since 0.0.0
 */
function _attachMessenger(co, mess) {
  // Processes recursively cList to attach the messenger object to
  // all the childs.
  if (co._cList) {
    const keys = Object.keys(co._cList);
    for (let i = 0; i < keys.length; i++) {
      /* eslint-disable-next-line no-param-reassign */
      co._cList[keys[i]]._mess = mess;
      _attachMessenger(co._cList[keys[i]], mess);
    }
  }
}

/**
 * Returns an XMLString that contains only one element with or without children.
 *
 * Nota:
 * The XMLString must represent an unique div, header or footer element with
 * childs. If it isn't the case surround the passed-in XMLString by a 'div'
 * and return it.
 *
 * @function (arg1)
 * @private
 * @param {XMLString}       the passed-in XMLString,
 * @param {XMLString}       the formated XMLString,
 * @returns {}              -,
 * @since 0.0.0
 */
function _format(xml) {
  const node = document.createElement('div');
  node.innerHTML = xml;
  if (node.children.length > 1) {
    return `<div>${xml}</div>`;
  }

  const firstChild = node.firstElementChild;
  if (!firstChild) {
    return '<div></div>';
  }

  const tag = firstChild.tagName.toLocaleLowerCase();
  if (tag !== 'div' && tag !== 'header' && tag !== 'footer') {
    return `<div>${xml}</div>`;
  }

  return xml;
}

/**
 * Filters the parameters passed to View.render().
 *
 * @function (arg1)
 * @private
 * @param {Object}          the required parameters,
 * @returns {Object}        the formatted parameters,
 * @since 0.0.0
 */
function _filter(options) {
  const opt = { el: 'body', children: null, template: '<div></div>' };

  // Check if el is an id, a class or a node element:
  if (options.el) {
    if (_.isString(options.el)
      && (options.el.charAt(0) === '#' || options.el.charAt(0) === '.')) {
      opt.el = options.el;
    } else if (_.isObject(options.el) && options.el.namespaceURI) {
      opt.el = options.el;
    } else if (!options.silent) {
      /* eslint-disable-next-line no-console */
      console.log('warning: el must be an id, a class or a node element!');
    }
  }

  // Check if the template is a 'div', 'header' or 'footer' element. If not
  // surround it by a 'div'.
  if (_.isString(options.template)) {
    opt.template = _format(options.template);
  } else if (!options.silent) {
    /* eslint-disable-next-line no-console */
    console.log(
      'warning: template must be an XMLString starting with <div or <header or <footer!',
    );
  }

  // There is no need to check if children is properly formatted or not
  // as it is checked by the method component._renderer() before being
  // processed.
  opt.children = options.children;

  return opt;
}

/**
 * Attaches the XML string to the DOM.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the required parameters,
 * @returns {}              -,
 * @since 0.0.0
 */
function _attachTemplateDOM(opt) {
  const node = _.isString(opt.el) ? document.querySelector(opt.el) : opt.el;

  if (opt.el === 'body') {
    // Append to body:
    node.innerHTML += opt.template;
  } else {
    // Replace el childs if any:
    node.innerHTML = opt.template;
  }
}

/**
 * Removes the web component from the DOM and destroys the object.
 *
 * @function (arg1)
 * @private
 * @param {String}          the view object,
 * @returns {Boolean}       returns true if it succeeds,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign, no-proto */
function _remove(view) {
  view.$().remove();
  Object.keys(view).forEach((key) => { delete view[key]; });
  view.__proto__ = {};
  return true;
}
/* eslint-enable no-param-reassign, no-proto */

/**
 * Restores the View Component to its initial state.
 *
 * @function (arg1)
 * @private
 * @param {String}          the view object,
 * @returns {Boolean}       returns true if it succeeds,
 * @since 0.0.0
 */
function _restore(view) {
  if (view && view._initialXMLNode) {
    const template = document.createElement('template');
    template.innerHTML = view._initialXMLNode;
    const iNode = template.content.firstChild;
    view.$()[0].parentNode.replaceChild(iNode, view.$()[0]);
    return true;
  }
  return false;
}

/**
 * Transforms the selected node to a RView Component.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}          the optional parameters,
 * @param {Object}          the reformatted optional parameters,
 * @returns {}              -,
 * @since 0.0.0
 */
function _componenterize(options, opt) {
  const { methods } = options || {}
      , Messenger   = P.get('messenger')
      ;

  // Check if the node exists in the DOM. if not return null.
  if (opt.el === 'body') return null;

  // Save the current node and retrieve the attributes:
  const node = _.isString(opt.el) ? document.querySelector(opt.el) : opt.el;
  const initialXMLNode = node.outerHTML;
  const id = node.getAttribute('id');
  const classList = node.className;
  const style = node.getAttribute('style');

  // Create a View.Component from the XML string (without id) of the
  // selected node. Then, replace the current node by the new generated
  // node in the DOM.
  // Extend the components methods with the passed-in methods, if any.
  const Comp = V.Component(_.extend(methods, {
    init() {
      this.state.class = classList || '';
      this.state.style = style || '';
      this.state.inside = '';
    },
    render(state) {
      return `
        <div class="${state.class}" style="${state.style}">${state.inside}</div>
      `;
    },
  }));
  const app = Comp();
  const xmlNewNode = app._renderer();
  const template = document.createElement('template');
  template.innerHTML = xmlNewNode;
  const newNode = template.content.firstChild;
  node.parentNode.replaceChild(newNode, node);

  // If the initial node has an id, replace the randowmly generated id by
  // the initial id.
  if (id) {
    newNode.setAttribute('id', id);
    app.id = id;
  }

  // Attach Messenger and the XML string of the initial node to 'app'
  // and return it.
  // The XML string of the initial node is saved because RView provides a
  // method RView.restore to returns the node to its initial state.
  app._mess = Messenger ? Messenger() : null;
  app._initialXMLNode = initialXMLNode;
  return app;
}

/**
 * Attaches the root component and its children to the DOM.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the parameters required to render the root component,
 * @returns {Object}        returns the root component object,
 * @since 0.0.0
 */
function _render(options) {
  const opt       = _filter(options)
      , Messenger = P.get('messenger')
      ;

  if (!options.children && !options.template) {
    // If there is no children and no template, we componenterize the
    // selected node!
    return _componenterize(options, opt);
  }

  if (!opt.children) {
    // No components. Insert template only!
    _attachTemplateDOM(opt);
    return null;
  }

  // Ok. Create the root component and attach it to the DOM:
  const RootComp = V.Component({
    render() {
      this.name = 'firstparent';
      this.children = opt.children;
      return opt.template;
    },
  });
  const rootc = RootComp();
  opt.template = rootc._renderer();
  _attachTemplateDOM(opt);

  // Attach the messenger broker to the firstparent and all childs:
  rootc._mess = Messenger ? Messenger() : null;
  _attachMessenger(rootc, rootc._mess);

  // Now all the components are attached to the DOM, fire the DOM events
  // for each component:
  _fireEvents(rootc);

  // Returns the root component object.
  return rootc;
}


// -- Public Static Methods ------------------------------------------------

const Renderer = {

  /**
   * Attaches the root component and its children to the DOM.
   *
   * @method (arg1)
   * @public
   * @param {Object}        the parameters required to render the root component,
   * @returns {Object}      returns the root component object,
   * @since 0.0.0
   */
  render(params) {
    return _render(params);
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
    return _restore(rview);
  },

  /**
   * Removes the web component from the DOM and destroys the object.
   *
   * @method (arg1)
   * @public
   * @param {String}        the rview object,
   * @returns {Boolean}     returns true if it succeeds,
   * @since 0.0.0
   */
  remove(rview) {
    return _remove(rview);
  },
};


// -- Export
export default Renderer;

/* eslint-enable one-var, semi-style, no-underscore-dangle */
