---
sidebar_label: "Data Types"
sidebar_position: 1
---

# Data Types

Chart Ease accommodates various types of data sets, granting you extensive control over chart creation.

## linear array

When you provide a linear array as a dataset, it is automatically distributed equally along the **X-axis**. For example:

```javascript
dataSet.data = [6, 4, 0, 3, 5, 2, 7, 3];
```

This is equivalent to passing the array as objects with 'x' and 'y' properties:

```javascript
dataSet.data = [
  { x: 1, y: 6 },
  { x: 2, y: 4 },
  { x: 3, y: 0 },
  { x: 4, y: 3 },
  { x: 5, y: 5 },
  { x: 6, y: 2 },
  { x: 7, y: 7 },
  { x: 8, y: 3 },
];
```

## Two-dimensional array

You can pass a two-dimensional array:

```javascript
dataSet.data = [
  { x: 91531, y: 6 },
  { x: 91522, y: 4 },
  { x: 91513, y: 0 },
  { x: 91504, y: 3 },
  { x: 91555, y: 5 },
  { x: 91546, y: 2 },
  { x: 91507, y: 7 },
  { x: 91528, y: 3 },
];
```

### By default, 'x' and 'y' are chosen as the horizontal and vertical axes.

## Multi-dimensional array

When working with multi-dimensional arrays, you can take advantage of the **hAxis** and **vAxis** attributes to define custom axes. These attributes accept a comma-separated list of data columns, which will be automatically normalized and provided to you during the **draw** event. This empowers you to craft your desired chart.

For instance, consider a financial chart displaying "low," "open," "close," and "high" values. You can define custom axes like this in your HTML:

```html
<chart-ease width="200" height="200">
  <data-set vAxis="low,open,close,high"></data-set>
</chart-ease>
```

In this example, we haven't explicitly defined the **hAxis** attribute. Consequently, the system will search for the **x** field within the data. If the **x** field is not found, it will automatically distribute data evenly along the **X-axis**.

it's essential to ensure that your data adheres to the correct structure, like this:

```javascript
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

To see this feature in action, refer to the candlestick sample.

Alternatively, you can introduce additional axes to complement the default axes (**x** and **y**). To achieve this, provide an array of axis objects to the **axes** property, specifying the columns you wish to include. Here's an example demonstrating the addition of an extra axis using the **r** column in conjunction with the default **x** and **y** axes:

```javascript
chart.axes = [{ cols: ["r"], length: 50 }];
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

Once again, if the x field is absent in the data, the system will automatically evenly distribute other fields along the **X-axis**.

Additionally, this approach allows you to normalize data columns within a constrained size using the length property.

To explore this approach further, check out the bubble chart sample.
