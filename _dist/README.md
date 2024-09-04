# RView

[![NPM version][npm-image]][npm-url]
[![GitHub last commit][commit-image]][commit-url]
[![Github workflow][ci-image]][ci-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![npm bundle size][npm-bundle-size-image]][npm-bundle-size-url]
[![License][license-image]](LICENSE.md)

`RView` is a companion View library for building web applications. On the opposite of React, VueJS and Angular, View focuses on the viewing operations only. Besides, `RView` has a very fast learning curve as it doesn't introduce any new directives, pseudo-code, build, etc.

Thus, `RView` is only intended to create web components, insert them into the DOM and update them.

`RView` allows you to create and modify an HTML template. When you apply a change to your template, `RView` checks the differences between your template and its counterpart in the DOM. It updates only the elements that have been modified.


## Quick Startup

You don't have to create a build environment for `RView`. You just need an `HTML` file with a script:

```html
<script src='https://www.unpkg.com/@mobilabs/rview/_dist/lib/rview.min.js'></script>
<script>
  const { h } = RView;
  const { Component } = RView;
  const { render } = RView;

  ...
</script>
```

Or:

```html
<script type=module>
  import { h, Component, render } from 'https://www.unpkg.com/@mobilabs/rview?module';

  ...
</script>
```

Then, you can create your first component:

```html
<script type=module>
  import { h, Component, render } from 'https://www.unpkg.com/@mobilabs/rview?module';

  const C = Component({
    $render() {
      return '<h1>Hi!</h1>';
    },
  });
</script>
```

In its minimalist form, a `rview component` requires just a `$render` method that returns an XMLString.

When your component is ready, you can insert it in the DOM:

```html
<script type=module>
  import { h, Component, render } from 'https://www.unpkg.com/@mobilabs/rview?module';

  const C = Component({
    $render() {
      return '<h1>Hi!</h1>';
    },
  });

  render({
    el: '#app',
    children: { '<C />': C },
    template: `
      <C />
    `,
  });
</script>
```

`render` requires an object with three properties:

  * `el`: it defines the anchor point of your component in the DOM,

  * `children`: it contains an object that makes the link between the HTML tag and the `rview component`,

  * `template`: the HTML template that is rendered in the DOM.

And this is what you get in the DOM:

```html
<div id="app">
  <div id="i67c63gj">
    <div id="i354anrd">
      <h1>Hi!</h1>
    </div>
  </div>
</div>
```

Simple isn't!

But of course, you can do much more. You can encapsulate a component inside another component, you can interact with a component, you can send and receive messages from components, you can create animated components, etc.


## Examples

### A Simple Hello

```javascript
const App = Component({
  $render() {
    return `
      <h1>Hello World</h1>
    `;
  },
});

render({
  el: '#app',
  children: { '<App />': App },
  template: '<App />',
});
```

This isn't really new. You already see a similar example in the previous chapter.


### Another Simple Hello

```javascript
const App = Component({
  $render() {
    return h('h1', { class: 'myclassname' }, 'Hello World');
  },
});

render({
  el: '#app',
  children: { '<App />': App },
  template: '<App />',
});
```

`RView` supports the `hyperscript` language. You can use it to describe your component if you wish.


### A More Sophisticated Hello

This is an example that shows how to update a text based on DOM `events`:

```javascript
const App = Component({
  $init() {
    this.state.heading = 'Hello World!';
  },

  $listenDOM() {
    this.$('form').on('submit', (e) => {
      e.preventDefault();
      const { value } = e.target[0];
      this.$setState({ heading: value });
    });
  },

  $render(state, props) {
    return `
      <div>
        <h1>${state.heading}</h1>
        <form>
          <input type="text" />
          <button type="submit">Update</button>
        </form>
      </div>
    `;
  },
});

render({
  el: '#app',
  children: { '<App />': App },
  template: '<App />',
});
```

Your component has two more methods `$init` and `$listenDOM`.

`$init` is called before your component is rendered into the DOM. You can use it to update some parameters.

`$listenDOM` is called after your component has been rendered into the DOM. You can use it to execute functions that listen for DOM events.

Here we use `$init` to add and to initialize the property `heading` of the object `state` (that is an empty object). And, we use `$listenDOM` to execute a function that listens for DOM events (if you are a bit familiar with `jQuery` you can easily decrypt this function).

`$('form')` selects the DOM child element `form` of your `RView Component` - and only your component, it can't select DOM elements outside the scope of the component you defined. `.on('click', (e) =>)` listens for a click event. And, it calls the callback function, you defined, when this event occurs.

This callback captures the value entered by the user and execute `$setState`. `$setState` updates the value `this.state.heading` and calls a `RView` function that compares your updated template with the DOM element and updates the differences.


### An Interactive Clock

```javascript
const Clock = Component({
  $init() {
    this.state.time = Date.now();
    // update time every second
    this.timer = setInterval(() => {
      this.$setState({ time: Date.now() });
    }, 1000);
  },

  $render(state, props) {
    const time = new Date(state.time).toLocaleTimeString();
    return `
      <div>
        <span>${time}</span>
      </div>
    `;
  },
});

render({
  el: '#app',
  children: { '<Clock />': Clock },
  template: '<Clock />',
});
```

Here we created a clock that is incremented every second. You should easily understand how it works as it doesn't introduce new concepts.


### A Start/Stop Clock

Now, we are going to create a `clock` that we can `drive` from outside:

```javascript
const Clock = Component({
  $init() {
    this.state.time = Date.now();
  },

  start() {
    // update time every second
    this.timer = setInterval(() => {
      this.$setState({ time: Date.now() });
    }, 1000);
  },

  stop() {
    clearInterval(this.timer);
  },

  $render(state, props) {
    const time = new Date(this.state.time).toLocaleTimeString();
    return `
      <div>
        <span>${time}</span>
      </div>
    `;
  },
});

const app = render({
  el: '#app',
  children: { '<Clock />': Clock },
  template: '<Clock />',
});

// Gets the clock web component and then call the custom methods
// 'start' and 'stop'
const clock = app.$getChild('<Clock />');
clock.start();

setTimeout(() => {
  clock.stop();
}, 5000);
```

As you can see, there are two new methods: `start` and `stop`; a two custom methods.

The `start` method includes the code that was previously in the `$init` method to start the timer. And, the `stop` method stops the timer by stopping the Javascript function `setInterval`.

You have propably noticed that `render` returns a variable. This variable is an object that implement some useful methods.

The method `getChild('<Clock />')` returns the object `clock` that instantiates the `RView Component` `Clock`.

Now, with this object, we have access to the `RView Component` `Clock`. And we can call the methods `start` and `stop`.

That's all!


### An animated Rectangle

`RView Component` implements an useful method to move elements. See the code below:

```javascript
const App = Component({
  $init() {
    this.state.top = 0;
    this.state.left = '100px';
    setTimeout(() => {
      this.$animate({ top: '500px', left: '800px' }, 'swing', () => {
        // callback executed when the animation is over.
      });
    }, 1000);
  },

  $render(state) {
    return `
      <div>
        <div class="rect" style="position: absolute; top: ${state.top}; left: ${state.left}; width: 100px; height: 100px; border: 1px solid red;"></div>
      </div>`;
  },
});

render({
  el: '#app',
  children: { '<App />': App },
  template: '<App />',
});
```

Here the `$init` method implements:

```javascript
this.$animate({ top: '500px', left: '800px' }, 1000, 'swing', () => {
  // callback executed when the animation is over.
});
```

The method `$animate` updates `this.state.top` from `0` to `500px` and `this.state.left` from `100px` to `800px`. This operation is done in `1000 ms` and the transition function is `swing` (see Robert Penner's Easing Functions).

And, `RView` takes care to update the style attributes `top` and `left` of the DOM element `rect` when the values of `state.top` and `state.left` change.


### Messages

`RView` implements a mechanism that allows the components to communicate together. Look at the code:


```javascript
const Hello = Component({
  $init() {
    this.state.message = '-';
  },

  $postRender() {
    this.$listen('at:hello:from:hi', (msg) => {
      this.$setState({ message: `I got the message: ${msg}` });
    });
  },

  $render(state, props) {
    return `
      <h1>Hello World</h1>
      <h2>${state.message}</h2>
    `;
  },
});

const Hi = Component({
  $postRender() {
    setTimeout(() => {
      this.$emit('at:hello:from:hi', 'Hi Hello!');
    }, 5000);
  },

  $render() {
    return `
      <h1>Hi!</h1>
    `;
  },
});

render({
  el: '#app',
  children: { '<Hello />': Hello, '<Hi />': Hi },
  template: `
    <Hello />
    <Hi />
  `,
});
```

Here you can see that the component `Hello` implements the method `$listen`. This method is listening for a message with the signature `at:hello:from:hi`. When the message arrives, it updates the property `this.state.message`.

The component `Hi` sends the message `Hi Hello!` 5 seconds after it has been attached to the DOM. The message is sent thanks to the method `$emit`.

Simple isn't it!


## Reference

### RView Static Methods

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

### Component Methods

```
Methods                         | Description
```
```
Empty Methods                   |
init()                          | executed before rendering the component in the DOM (to be phased out),
events()                        | executed after rendering the component in the DOM (to be phased out),
listen()                        | executed after rendering the component in the DOM (to be phased out),
render()                        | returns the HTML template,
postRender()                    | executed after rendering the component in the DOM (to be phased out),
onChange                        | called after the component is updated in the DOM (to be phased out),
                                |
$init()                         | executed before rendering the component in the DOM,
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

### $ Methods

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


## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/@mobilabs/rview.svg?logo=npm&logoColor=fff&label=NPM+package
[release-image]: https://img.shields.io/github/release/jclo/rview.svg?include_prereleases
[commit-image]: https://img.shields.io/github/last-commit/jclo/rview.svg?logo=github
[ci-image]: https://github.com/jclo/rview/actions/workflows/ci.yml/badge.svg
[coveralls-image]: https://img.shields.io/coveralls/jclo/rview/master.svg?&logo=coveralls
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/minzip/@mobilabs/rview.svg
[license-image]: https://img.shields.io/npm/l/@mobilabs/rview.svg

[npm-url]: https://www.npmjs.com/package/@mobilabs/rview
[release-url]: https://github.com/jclo/rview/tags
[commit-url]: https://github.com/jclo/rview/commits/master
[ci-url]: https://github.com/jclo/rview/actions/workflows/ci.yml
[coveralls-url]: https://coveralls.io/github/jclo/rview?branch=master
[npm-bundle-size-url]: https://img.shields.io/bundlephobia/minzip/@mobilabs/rview
[license-url]: http://opensource.org/licenses/MIT
