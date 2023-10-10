---
sidebar_label: "Animation"
sidebar_position: 7
---

# Animation in Chart Ease

Animation is a powerful feature in Chart Ease that allows you to bring your data visualizations to life. You can create dynamic and engaging charts by animating transitions between data points or by applying real-time updates to your charts. This page explores how you can add animation to your charts in Chart Ease.

## CSS Animation

You can add animations to your Charts using CSS. This allows you to create engaging and dynamic data visualizations.

Here's an example of animating a Line Chart using CSS:

```css
path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 4s infinite forwards, hide 4s infinite forwards;
  filter: url(#blurFilter);
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes hide {
  0% {
    opacity: 0;
    filter: url(#blurFilter);
  }
  50% {
    opacity: 1;
    filter: none;
  }
}
```

```html
<chart-ease width="400" height="100">
  <data-set>
    <path data-drawn-as="edge" stroke="red" strok-width="2" fill="none"></path>
  </data-set>
  <defs>
    <filter id="blurFilter">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
    </filter>
  </defs>
</chart-ease>
```

```javascript
dataSet.data = [
  20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 22, 18, 22, 20, 20, 2, 40, 20, 23, 20, 20, 20,
  20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 22, 18, 22, 20, 20, 2, 40, 20, 23, 20, 20, 20, 20, 20, 20,
  20, 20, 20, 20, 20, 20, 20, 20, 20, 22, 18, 22, 20, 20, 2, 40, 20, 23, 20, 20, 20, 20, 20, 20, 20, 20, 20,
  20, 20, 20, 20, 20, 20, 22, 18, 22, 20, 20, 2, 40, 20, 23, 20, 20, 20, 20, 20, 20, 22, 20, 20, 20, 20, 20,
  20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
  20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
  20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
];
```

<iframe src="/chart-ease/samples/animation/css.html" style={{ width: '500px', height: '150px' }}></iframe>

In this example, we're animating the drawing of the Line Chart to simulate _ECG pulse line_. The **stroke-dasharray** and **stroke-dashoffset** properties control the animation effect. You can adjust the animation duration and timing function to achieve the desired effect.

### Animating Data Points

You can also animate individual data points in various chart types, such as Bar Charts or Scatterplots. By applying CSS animations to specific chart elements, you can create attention-grabbing visualizations. For example, you can animate the growth of bars in a Bar Chart or the movement of points in a Scatterplot.

## Real-Time Updates

Another way to add animation to your charts is by providing real-time data updates. This is particularly useful when you want to create live charts that continuously display changing data. To achieve this, you can update the data of your chart dynamically and redraw it at specific intervals.

Here's an example of creating a live Line Chart with real-time data updates:

```html
<chart-ease width="200" height="200">
  <data-set>
    <path data-drawn-as="edge" stroke="aqua" fill="none"></path>
  </data-set>
  <left-axis ticks="10" min="0" max="20" width="15">
    <line axis-line stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </left-axis>
  <bottom-axis ticks="10" min="1" max="10" height="10">
    <line axis-line stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </bottom-axis>
</chart-ease>
```

```javascript
const data = [6, 4, 0, 3, 5, 2, 7, 3, 3, 9];
setInterval(() => {
  data.splice(0, 1);
  data.push(Math.round(Math.random() * 20));
  document.querySelector("data-set").data = data;
}, 500);
```

<iframe src="/chart-ease/samples/animation/live-line-chart.html" style={{ width: '250px', height: '250px' }}></iframe>

In this example, we're updating the data and redrawing the Line Chart every .5 seconds. This creates a dynamic and continuously updating chart.
