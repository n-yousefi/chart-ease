---
sidebar_label: "Candlestic chart"
sidebar_position: 5
---

# Candlestic chart

A Candlestick Chart is a popular chart type widely used in financial markets to visualize price movements of an asset, such as stocks or commodities, over a specified time period. This chart type is particularly valuable for traders and analysts as it provides a clear representation of the open, close, high, and low prices for each time period.

## Creating a Candlestick Chart

In Chart Ease, you can create Candlestick Charts by combining simple SVG elements such as `<line>` and `<rect>`, making it a versatile tool for visualizing financial data.

### Understanding the Vertical Axis Values

In a Candlestick Chart, each candlestick on the vertical axis represents four distinct price values for a specific time period. These values are:

- **Low Price (Low)**: The lowest price reached during the time period.
- **Open Price (Open)**: The price at the beginning of the time period.
- **Close Price (Close)**: The price at the end of the time period.
- **High Price (High)**: The highest price reached during the time period.

By using the `vAxis` attribute with the value **"low,open,close,high"** you configure the vertical axis to display these four price values, allowing you to create Candlestick charts that show the complete price range for each time period.

```html
<chart-ease>
  <data-set vAxis="low,open,close,high">
    <line></line>
    <rect></rect>
  </data-set>
</chart-ease>
```

```javascript
const dataSet = document.querySelector("data-set");
dataSet.ondraw = ({ shape, row }) => {
  const green = row.open < row.close;
  switch (shape.tagName) {
    case "line":
      shape.setAttribute("x1", row.x + 5);
      shape.setAttribute("x2", row.x + 5);
      shape.setAttribute("y1", row.low);
      shape.setAttribute("y2", row.high);
      shape.setAttribute("stroke", green ? "#28A69A" : "#EE5355");
      break;
    case "rect":
      shape.setAttribute("width", 10);
      shape.setAttribute("x", row.x);

      shape.setAttribute("height", Math.abs(row.close - row.open));
      shape.setAttribute("y", green ? row.open : row.close);
      shape.setAttribute("fill", green ? "#28A69A" : "#EE5355");
      break;
  }
};
dataSet.data = [
  { low: 2, open: 5, close: 3, high: 5 },
  { low: 5, open: 6, close: 7, high: 16 },
  { low: 9, open: 9, close: 10, high: 10 },
  { low: 15, open: 15, close: 5, high: 5 },
  { low: 9, open: 10, close: 12, high: 20 },
  { low: 9, open: 11, close: 13, high: 25 },
  { low: 9, open: 12, close: 14, high: 15 },
  { low: 1, open: 13, close: 10, high: 15 },
];
```

<iframe src="/chart-ease/samples/chart-types/candlestick.html" style={{ width: '250px', height: '250px' }}></iframe>

You can use axes for labeling points price values and understanding the scale of your chart.

```html
<chart-ease>
  <data-set vAxis="low,open,close,high">
    <line></line>
    <rect></rect>
  </data-set>
  <bottom-axis ticks="8" min="0" max="9" height="20">
    <line axis-line stroke="blue"></line>
    <rect axis-tick fill="blue" width="1" height="5"></rect>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </bottom-axis>
  <left-axis ticks="6" min="100" max="1600" width="40">
    <line axis-line stroke="blue"></line>
    <line axis-tick stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </left-axis>
</chart-ease>
```

```javascript
const dataSet = document.querySelector("data-set");
dataSet.ondraw = ({ shape, row }) => {
  const green = row.open < row.close;
  switch (shape.tagName) {
    case "line":
      shape.setAttribute("x1", row.x);
      shape.setAttribute("x2", row.x);
      shape.setAttribute("y1", row.low);
      shape.setAttribute("y2", row.high);
      shape.setAttribute("stroke", green ? "#28A69A" : "#EE5355");
      break;
    case "rect":
      shape.setAttribute("width", 10);
      shape.setAttribute("x", row.x - 5);

      shape.setAttribute("height", Math.abs(row.close - row.open));
      shape.setAttribute("y", green ? row.open : row.close);
      shape.setAttribute("fill", green ? "#28A69A" : "#EE5355");
      break;
  }
};
dataSet.data = [
  { low: 1100, open: 1100, close: 1200, high: 1300 },
  { low: 1200, open: 1200, close: 1300, high: 1300 },
  { low: 1300, open: 1300, close: 1400, high: 1500 },
  { low: 1400, open: 1400, close: 1300, high: 1600 },
  { low: 800, open: 1300, close: 1000, high: 1350 },
  { low: 700, open: 1000, close: 700, high: 1100 },
  { low: 500, open: 700, close: 600, high: 710 },
  { low: 500, open: 600, close: 1000, high: 1000 },
];
```

<iframe src="/chart-ease/samples/axes/candlestick-axes.html" style={{ width: '250px', height: '250px' }}></iframe>
