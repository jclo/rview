---
name: 'example-hello2'
title: 'Another Simple Hello'
description: '-'
---

# Another Simple Hello

```javascript
const App = Component({
  render() {
    return h('h1', null, 'Hello World');
  },
});

render({
  el: '#app',
  children: { '<App />': App },
  template: '<App />',
});
```

**RView** support the **hyperscript** language. You can use it to describe your component if you wish.

--  oOo ---
