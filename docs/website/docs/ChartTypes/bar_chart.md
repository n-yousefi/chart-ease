---
sidebar_label: "Bar chart"
sidebar_position: 2
---

# Bar chart

With Chart Ease, you can create a variety of bar chart types to effectively visualize your data. This section demonstrates how to draw three common bar chart types: Simple Bar Chart, Stacked Bar Chart, and Grouped Bar Chart. Chart Ease provides you with flexibility, allowing you to configure and customize these chart types according to your unique requirements.

## Simple Bar Chart

In the Simple Bar Chart, each data point is represented as a separate bar. You can use a `<rect>` SVG element for each bar and adjust its position and size in the `draw` event handler:

```html
<chart-ease id="chart" width="200" height="200" margin="20">
  <data-set>
    <rect fill="red"></rect>
  </data-set>
  <bottom-axis min="0" max="6"> </bottom-axis>
</chart-ease>
```

```javascript
const data = [1, 2, 3, 4, 5, 6];
const bar = document.querySelector("#chart");
bar.ondraw = ({ shape, row }) => {
  shape.setAttribute("x", row.x);
  shape.setAttribute("y", 0);

  shape.setAttribute("width", 20);
  shape.setAttribute("height", row.y);
};
bar.data = data;
```

<iframe src="/samples/chart-types/bar-chart.html" style={{ width: '250px', height: '250px' }}></iframe>

## Stacked Bar Chart

In the Stacked Bar Chart, multiple data points are stacked on top of each other to create a cumulative bar chart. You can utilize a single `<rect>` element for each data item and stack them accordingly:

```html
<chart-ease id="bar" width="400" height="200">
  <data-set hAxis="x" vAxis="Silver,Gold,Platinum">
    <g>
      <rect for="Silver" fill="red"></rect>
      <rect for="Gold" fill="blue"></rect>
      <rect for="Platinum" fill="green"></rect>
    </g>
  </data-set>
  <bottom-axis min="1" max="7"> </bottom-axis>
</chart-ease>
```

```javascript
const data = [
  { Bronze: 1, Silver: 2, Gold: 5 },
  { Bronze: 3, Silver: 4, Gold: 7 },
  { Bronze: 2, Silver: 4, Gold: 9 },
  { Bronze: 2, Silver: 3, Gold: 6 },
  { Bronze: 7, Silver: 12, Gold: 14 },
  { Bronze: 2, Silver: 9, Gold: 10 },
  { Bronze: 1, Silver: 2, Gold: 3 },
  { Bronze: 2, Silver: 5, Gold: 6 },
];
const bar = document.querySelector("#bar");
bar.ondraw = ({ shape, row }) => {
  const setBar = (bar, x, y) => {
    bar.setAttribute("x", x);
    bar.setAttribute("y", 0);

    bar.setAttribute("width", 15);
    bar.setAttribute("height", y);
  };
  Array.from(shape.children).forEach((bar) => {
    setBar(bar, row.x, row[bar.getAttribute("for")]);
  });
};
bar.data = data;
```

<iframe src="/samples/chart-types/stacked-bar-chart.html" style={{ width: '250px', height: '250px' }}></iframe>

## Grouped Bar Chart

In the Grouped Bar Chart, multiple bars are drawn side by side to represent different data categories. Each bar is drawn individually rather than being stacked. Here's an example of how to create a grouped bar chart:

```html
<chart-ease id="bar" width="400" height="200">
  <data-set hAxis="x" vAxis="Silver,Gold,Platinum">
    <g>
      <rect for="Silver" fill="red"></rect>
      <rect for="Gold" fill="blue"></rect>
      <rect for="Platinum" fill="green"></rect>
    </g>
  </data-set>
  <bottom-axis min="1" max="7"> </bottom-axis>
</chart-ease>
```

```javascript
const data = [
  { Silver: 2, Gold: 5, Platinum: 5 },
  { Silver: 5, Gold: 7, Platinum: 6 },
  { Silver: 9, Gold: 3, Platinum: 8 },
  { Silver: 2, Gold: 7, Platinum: 5 },
  { Silver: 9, Gold: 2, Platinum: 2 },
  { Silver: 2, Gold: 9, Platinum: 3 },
];
const bar = document.querySelector("#bar");
const chartWidth = 400;
const barGap = 0.25;
// Note: barWidth = Round(ChartWidth/BarCount) * (Bar to Gap ratio)
const barWidth = Math.round(400 / data.length) * 0.25;
bar.ondraw = ({ shape, row }) => {
  const setBar = (bar, x, y) => {
    bar.setAttribute("x", x);
    bar.setAttribute("y", 0);

    bar.setAttribute("width", barWidth);
    bar.setAttribute("height", y);
  };
  Array.from(shape.children).forEach((bar, index) => {
    setBar(bar, row.x + index * barWidth, row[bar.getAttribute("for")]);
  });
};
bar.data = data;
```

<iframe src="/samples/chart-types/grouped-bar-chart.html" style={{ width: '500px', height: '250px' }}></iframe>
