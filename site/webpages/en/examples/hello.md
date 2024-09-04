---
name: 'example-hello'
title: 'A Simple Hello'
description: '-'
---

# A Simple Hello

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

--  oOo ---
