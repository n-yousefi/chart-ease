---
sidebar_label: "Area chart"
sidebar_position: 3
---

# Area chart

An area chart is a popular type of data visualization used in statistics and data analysis. It is primarily used to represent data trends over time or across categories and is effective in displaying data with multiple series or data sets. Area charts are valuable tools for gaining insights into data patterns, identifying trends, and making data-driven decisions.

## Creating an Area Chart

To create an Area Chart, you can use the `<polyline>` element within the `<data-set>` element. By setting the fill attribute to a specific color, you define the area beneath the chart line. Additionally, you can adjust the opacity attribute to control the transparency of the filled area.

```html
<chart-ease width="500" height="400">
  <data-set id="ds1">
    <path data-drawn-as="edge" stroke="#ff5b00" fill="none" stroke-width="1"></path>
    <polyline data-drawn-as="edge" fill="#ff5b00" opacity="0.9"></polyline>
  </data-set>
  <data-set id="ds2">
    <path data-drawn-as="edge" stroke="#A4D8E8" fill="none" stroke-width="1"></path>
    <polyline data-drawn-as="edge" fill="#A4D8E8" opacity="0.9"></polyline>
  </data-set>
  <left-axis ticks="8" min="0" max="7000" width="30">
    <line axis-line stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </left-axis>
  <bottom-axis ticks="8" min="0" max="8" height="15">
    <line axis-line stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </bottom-axis>
</chart-ease>
```

```javascript
const data1 = [
  { x: 0, y: 0 },
  { x: 1, y: 1000 },
  { x: 4, y: 4000 },
  { x: 6, y: 3000 },
  { x: 8, y: 5000 },
  { x: 8, y: 0 },
];
const data2 = [
  { x: 0, y: 0 },
  { x: 1, y: 5000 },
  { x: 2, y: 4000 },
  { x: 3, y: 5000 },
  { x: 5, y: 2000 },
  { x: 7, y: 3000 },
  { x: 8, y: 0 },
];
const margin = 25;
const barWidth = 15;
document.getElementById("ds1").data = data1;
document.getElementById("ds2").data = data2;
```

<iframe src="/chart-ease/samples/chart-types/area-chart.html" style={{ width: '600px', height: '450px' }}></iframe>

In the example above, we've created two Area Charts using the `<polyline>` elements within the `<data-set>` elements. Each `<polyline>` element defines the filled area beneath the chart line using the fill attribute. You can customize the colors and opacity to suit your visualization needs.
