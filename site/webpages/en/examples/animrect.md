---
name: 'example-anim-rect'
title: 'A Start/Stop Clock'
description: '-'
---

# An animated Rectangle

**RView Component** implements an useful method to move elements. See the code below:

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

Here the **init** method implements:

```javascript
this.$animate({ top: '500px', left: '800px' }, 1000, 'swing', () => {
  // callback executed when the animation is over.
});
```

The method **$animate** updates **this.state.top** from **0** to **500px** and **this.state.left** from **100px** to **800px**. This operation is done in **1000 ms** and the transition function is **swing** (see Robert Penner's Easing Functions).

And, **RView** takes care to update the style attributes **top** and **left** of the DOM element **rect** when the values of **state.top** and **state.left** change.


--  oOo ---
