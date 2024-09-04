---
name: 'example-clock2'
title: 'A Start/Stop Clock'
description: '-'
---

# A Start/Stop Clock

Now, we are going to create a **clock** that we can **drive** from outside:

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

As you can see, there are two new methods: **start** and **stop**; a two custom methods.

The **start** method includes the code that was previously in the **$init** method to start the timer. And, the **stop** method stops the timer by stopping the Javascript function **setInterval**.

You have propably noticed that **render** returns a variable. This variable is an object that implement some useful methods.

The method **getChild('<Clock />')** returns the object **clock** that instantiates the **RView Component** **Clock**.

Now, with this object, we have access to the **RView Component** **Clock**. And we can call the methods **start** and **stop**.

That's all!

--  oOo ---
