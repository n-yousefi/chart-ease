---
sidebar_label: "Bubble chart"
sidebar_position: 4
---

# Bubble chart

Chart Ease allows you to create visually engaging Bubble Charts, a type of chart that combines data points represented as circles (bubbles) on a two-dimensional grid. Each circle's position on the chart corresponds to two data dimensions (X and Y), while the circle's size (radius) represents a third dimension (R).

## Creating a Bubble Chart

To create a Bubble Chart in Chart Ease, you can use the `<circle>` element within the `<data-set>` element. Customize the appearance of the circles using attributes like fill for color and opacity for transparency.

```html
<chart-ease width="200" height="200" margin="40">
  <data-set>
    <circle fill="aqua" opacity=".2" />
  </data-set>
</chart-ease>
```

```javascript
const chart = document.querySelector("chart-ease");
chart.axes = [{ cols: ["r"], length: 50 }];
const dataSet = document.querySelector("data-set");
dataSet.ondraw = ({ shape, row, originalRow }) => {
  shape.setAttribute("cx", row.x);
  shape.setAttribute("cy", row.y);
  shape.setAttribute("r", row.r);
  shape.setAttribute("opacity", 1.1 - originalRow.r / 50);
};
dataSet.data = [
  { y: 6, r: 10 },
  { y: 4, r: 50 },
  { y: 9, r: 20 },
  { y: 3, r: 30 },
  { y: 5, r: 13 },
  { y: 2, r: 34 },
  { y: 7, r: 25 },
  { y: 3, r: 8 },
];
```

<iframe src="/samples/chart-types/bubble-chart.html" style={{ width: '250px', height: '250px' }}></iframe>

In the example above, the `axes` property is utilized to extend dimensions by adding an **r** axis. each circle's position is determined by the **x** and **y** values, while the **r** value represents the radius of the circle. The `ondraw` event handler allows for further customization, such as adjusting opacity based on the radius.

This flexibility allows you to create Bubble Charts that convey data insights through variations in circle position, size, and opacity.
