---
sidebar_label: "Axes"
sidebar_position: 1
---

# Axes

In addition to the main chart area, you can also define your own axes to accompany your chart. By defining your own axes, you have more control over the layout and appearance of your chart.

To define your own axes, you can use the `hAxis` and `vAxis` properties. These properties accept an object with three properties: `cols`, `length`, and `margin`. The `cols` property specifies the columns that the axis represents, `length` specifies the length of the axis, and `margin` specifies the margin between the chart area and the axis.

By default, if no axes are defined, Chart-It will create axes using the x and y columns of your data set. If you wish to define additional axes, you can use the axes property, which takes an array of axis objects with the same cols, length, and margin properties as hAxis and vAxis.

For example, the following code defines an hAxis and a vAxis, as well as an additional axis using the r column:

```json
chart.hAxis = { cols: ["x"], length: 200, margin: 50 };
chart.vAxis = { cols: ["y"], length: 200, margin: 50 };
chart.axes = [{ cols: ["r"], length: 50 }];
```
