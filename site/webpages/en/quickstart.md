---
name: 'quickstart'
title: 'quick startup'
description: '-'
---

# Quick Startup

You don't have to create a build environment for **RView**. You just need an **HTML** file with a script:

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

In its minimalist form, a **rview component** requires just a **$render** method that returns an XMLString.

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

**render** requires an object with three properties:

  * **el**: it defines the anchor point of your component in the DOM,

  * **children**: it contains an object that makes the link between the HTML tag and the **rview component**,

  * **template**: the HTML template that is rendered in the DOM.

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


--  oOo ---
