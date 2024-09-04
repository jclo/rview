---
name: 'example-clock'
title: 'An Interactive Clock'
description: '-'
---

# An Interactive Clock

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

--  oOo ---
