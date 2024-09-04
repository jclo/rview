---
name: 'reference'
title: 'API'
description: '-'
---

# Reference

## RView Static Methods

```
Static Methods                  | Description
```
```
whoami()                        | returns the library name and version,
h(tag, attribute, value)        | converts an hyperscript format to an XML string,
Component(options)              | returns the child component constructor,
render({...})                   | renders the components in the DOM and returns the root component object,
restore(app),                   | restores the DOM to its initial state,
remove(app)                     | removes the RView app from the DOM and delete it (use with care),
plugin({name, ref})             | attaches a plugin,
makeid                          | returns an unique string pattern,
extends                         | returns a component inheriting from a parent,
```

## Component Methods

```
Methods                         | Description
```
```
Empty Methods                   |
$init()                         | executed before rendering the component in the DOM,
events()                        | executed after rendering the component in the DOM (to be phased out),
$listenDOM()                    | executed after rendering the component in the DOM,
$render()                       | returns the HTML template,
$postRender()                   | executed after rendering the component in the DOM,
$onChange                       | called after the component is updated in the DOM,
                                |
Generic Methods                 |
$(sel)                          | returns an object to access to the comp. in the DOM,
$animate()                      | updates state properties from an initial value to a final value,
$append()                       | appends a component as the last child,
$getChild(tag/id/name)          | returns the matching child object,
$removeChild(tag/id/name)       | removes the matching child object,
$getChildren()                  | returns the list of the first level children,
$getIdAndName()                 | returns the component's Id and name,
$hyperscript(args)              | converts an hyperscript format to an XML string,
$setState()                     | updates a state value and updates the DOM accordingly,
$listen(event, handler)         | listens a message,
$listenOnce(event, handler)     | listens a message once,
$emit(event, payload)           | sends a message,
```

## $ Methods

```
Methods                         | Description
```
```
$()                             | selects the View Component and returns this,
$(sel)                          | selects the child element with the attribute 'sel' and returns this,
$().id                          | returns the id of selected element,
$()[0]                          | returns the selected DOM element,

$().select(el)                  | selects the child element with the attribute 'sel' and returns this
$().selectChild(n)              | selects the nth child,
$().parent()                    | selects the parent node,
$().firstParent()               | selects the root parent node if defined,

$().find(sel)                   | returns the NodeList of the matching children,
$().tag()                       | returns the nag name of the selected element,

$(el).innerHTML                 | returns the HTML content of an element,
$(el).outerHTML                 | returns the HTML element and all its content,
$(el).text                      | returns the text content of an element,

$().firstChild()                | returns the first child,
$().children()                  | returns a DOM object with all the node children,
$().childIndex()                | returns the child index (0 for the first child),
$(el).getBoundingClientRect()   | returns the bounding boxes of an element,

$(el).css(style)                | returns the style value,

$(el).getClassList()            | returns a DOMTokenList (getClassList() is a wrapper around classList),
$(el).hasClass('class')         | returns true if the node has the class 'class' or false if not,

$(el).attr(attribute)           | returns the attribute value of the selected element,

$(el).on(event, listener)       | adds an event listener to the selected child and returns this.
$(el).off(event, listener)      | removes the attached event listener from the selected child and returns this.
$(el).trigger()                 | fires the event associated to the selected element,

$().remove()                    | removes the element from the DOM (to handle with care!),
```

--  oOo ---
