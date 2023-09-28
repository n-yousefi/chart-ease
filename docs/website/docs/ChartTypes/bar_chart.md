---
sidebar_label: "Bar chart"
sidebar_position: 2
---

# Bar chart

With Chart Ease, you can create a variety of bar chart types to effectively visualize your data. This section demonstrates how to draw some common bar chart types. Chart Ease provides you with flexibility, allowing you to configure and customize these chart types according to your unique requirements.

## Simple Bar Chart

In the Simple Bar Chart, each data point is represented as a separate bar. You can use a `<rect>` SVG element for each bar and adjust its position and size in the `draw` event handler:

```html
<chart-ease width="200" height="200" margin="20">
  <data-set>
    <rect fill="red"></rect>
  </data-set>
</chart-ease>
```

```javascript
const data = [6, 4, 0, 3, 5, 2];
const dataSet = document.querySelector("data-set");
dataSet.ondraw = ({ shape, row }) => {
  shape.setAttribute("x", row.x - 10);
  shape.setAttribute("y", 0);

  shape.setAttribute("width", 20);
  shape.setAttribute("height", row.y);
};
dataSet.data = data;
```

<iframe src="/samples/chart-types/bar-chart.html" style={{ width: '250px', height: '250px' }}></iframe>

## Stacked Bar Chart

In the Stacked Bar Chart, multiple data points are stacked on top of each other to create a cumulative bar chart. You can utilize a single `<rect>` element for each data item and stack them accordingly:

```html
<chart-ease width="400" height="200">
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
const dataSet = document.querySelector("data-set");
dataSet.ondraw = ({ shape, row }) => {
  Array.from(shape.children).forEach((bar) => {
    bar.setAttribute("x", row.x);
    bar.setAttribute("y", 0);

    bar.setAttribute("width", 15);
    bar.setAttribute("height", row[bar.getAttribute("for")]);
  });
};
dataSet.data = data;
```

<iframe src="/samples/chart-types/stacked-bar-chart.html" style={{ width: '250px', height: '250px' }}></iframe>

In the this sample, we use three `<rect>` elements for each unit of data, include as **Silver**, **Gold**, and **Platinum**, each with a custom attribute named `for`. This custom attribute plays a crucial role in our `ondraw` event handler. Within the event handler, we dynamically access the data attribute relative to the `for` value, allowing us to precisely position and size each bar segment.

## Grouped Bar Chart

In the Grouped Bar Chart, multiple bars are drawn side by side to represent different data categories. Each bar is drawn individually rather than being stacked. Here's an example of how to create a grouped bar chart:

```html
<chart-ease width="400" height="200">
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
const dataSet = document.querySelector("data-set");
const chartWidth = 400;
const barGap = 0.25;
// Note: barWidth = Round(ChartWidth/BarCount) * (Bar to Gap ratio)
const barWidth = Math.round(400 / data.length) * 0.25;
dataSet.ondraw = ({ shape, row }) => {
  Array.from(shape.children).forEach((bar, index) => {
    bar.setAttribute("x", row.x + index * barWidth);
    bar.setAttribute("y", 0);

    bar.setAttribute("width", barWidth);
    bar.setAttribute("height", row[bar.getAttribute("for")]);
  });
};
dataSet.data = data;
```

<iframe src="/samples/chart-types/grouped-bar-chart.html" style={{ width: '500px', height: '250px' }}></iframe>

Like the Stacked Bar Chart example, the Grouped Bar Chart sample also utilizes three `<rect>` elements per data category. These elements have been enhanced with a custom attribute named "for," which is employed in the ondraw event.

## Bar Line Chart

A Bar Line Chart is a hybrid chart that combines the characteristics of both a bar chart and a line chart. It allows you to represent data points using bars and lines in the same chart. To create a Bar Line Chart, you can use a combination of `<rect>` elements for the bars and a `<path>` element for the line. This allows you to visualize different aspects of your data simultaneously.

```html
<chart-ease width="200" height="200" margin="20">
  <data-set>
    <rect fill="red"></rect>
    <path data-drawn-as="edge" stroke="aqua" stroke-width="2" fill="none"></path>
  </data-set>
</chart-ease>
```

```javascript
const data = [6, 4, 0, 3, 5, 2];
const dataSet = document.querySelector("data-set");
dataSet.ondraw = ({ shape, row }) => {
  shape.setAttribute("width", 20);
  shape.setAttribute("x", row.x - 10);

  shape.setAttribute("height", row.y);
  shape.setAttribute("y", 0);
};
dataSet.data = data;
```

<iframe src="/samples/chart-types/bar-line-chart.html" style={{ width: '250px', height: '250px' }}></iframe>

These examples demonstrate how you can create different types of bar charts using Chart Ease. Feel free to explore and customize these chart types according to your data visualization needs.
