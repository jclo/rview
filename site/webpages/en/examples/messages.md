---
name: 'example-messages'
title: 'Messages'
description: '-'
---

# Messages

**RView** implements a mechanism that allows the components to communicate together. Look at the code:


```javascript
const Hello = Component({
  init() {
    this.state.message = '-';
  },

  events() {
    this.$listen('at:hello:from:hi', (msg) => {
      this.$setState({ message: `I got the message: ${msg}` });
    });
  },

  render(state, props) {
    return `
      <h1>Hello World</h1>
      <h2>${state.message}</h2>
    `;
  },
});

const Hi = Component({
  events() {
    setTimeout(() => {
      this.$emit('at:hello:from:hi', 'Hi Hello!');
    }, 5000);
  },

  render() {
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

Here you can see that the component **Hello** implements the method **$listen**. This method is listening for a message with the signature **at:hello:from:hi**. When the message arrives, it updates the property **this.state.message**.

The component **Hi** sends the message **Hi Hello!** 5 seconds after it has been attached to the DOM. The message is sent thanks to the method **$emit**.

Simple isn't it!


--  oOo ---
