---
name: 'example-hello3'
title: 'A More Sophisticated Hello'
description: '-'
---

# A More Sophisticated Hello

This is an example that shows how to update a text based on DOM **events**:

```javascript
const App = Component({
  init() {
    this.state.heading = 'Hello World!';
  },

  events() {
    this.$('form').on('submit', (e) => {
      e.preventDefault();
      const { value } = e.target[0];
      this.$setState({ heading: value });
    });
  },

  render(state, props) {
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

Your component has two more methods **init** and **events**.

**init** is called before your component is rendered into the DOM. You can use it to update some parameters.

**events** is called after your component has been rendered into the DOM. You can use it to execute functions that listen for DOM events.

Here we use **init** to add and to initialize the property **heading** of the object **state** (that is an empty object). And, we use **events** to execute a function that listens for DOM events (if you are a bit familiar with **jQuery** you can easily decrypt this function).

**$('form')** selects the DOM child element **form** of your **RView Component** - and only your component, it can't select DOM elements outside the scope of the component you defined. **.on('click', (e) =>)** listens for a click event. And, it calls the callback function, you defined, when this event occurs.

This callback captures the value entered by the user and execute **$setState**. **$setState** updates the value **this.state.heading** and calls a **RView** function that compares your updated template with the DOM element and updates the differences.

--  oOo ---
