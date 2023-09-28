---
sidebar_label: "Line chart"
sidebar_position: 1
---

# Line chart

The Line Chart is a fundamental type of chart in Chart Ease that allows you to visualize data points as a series of connected line segments. In this section, we'll explore how to create Line Charts using Chart Ease.

```html
<chart-ease width="200" height="200">
  <data-set>
    <path data-drawn-as="edge" stroke="aqua" fill="none"></path>
  </data-set>
</chart-ease>
```

```html
<chart-ease width="200" height="200">
  <data-set>
    <polyline data-drawn-as="edge" fill="none" stroke="blue"></polyline>
  </data-set>
</chart-ease>
```

<iframe src="/samples/path-types/path-types.html" style={{ width: '500px', height: '250px' }}></iframe>

The above samples demonstrate two ways to create basic Line Charts in Chart Ease. You can choose between using `<path>` or `<polyline>` elements to connect data points.

## SVG Styling Options

Chart Ease by using SVG, provides various styling options to customize the appearance of Line Charts. You can adjust attributes like stroke (line color), stroke-width (line width) and all other SVG styling options. Here's an example of styling a Line Chart:

```html
<chart-ease width="200" height="200">
  <data-set>
    <path data-drawn-as="edge" stroke="aqua" fill="none"></path>
  </data-set>
</chart-ease>
```

<iframe src="/samples/path-types/styling.html" style={{ width: '250px', height: '250px' }}></iframe>
