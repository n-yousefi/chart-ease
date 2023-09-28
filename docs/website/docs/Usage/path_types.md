---
sidebar_label: "Path types"
sidebar_position: 2
---

# Path Types

In Chart Ease, you have the flexibility to connect data points using different path types. These path types determine how the points are connected and visualized on the chart. Currently, Chart Ease supports two primary path types: "path" and "polyline."

## `data-drawn-as` attribute

In Chart Ease, we use every child element of `<chart-ease>` that has a `data-drawn-as="edge"` attribute to connect the points. This means that any element with the "data-drawn-as="edge"" attribute within a `<data-set>` will be used to determine the path type for connecting the data points. This flexibility allows you to create a wide range of custom chart designs and styles.

## `<path>`

The `<path>` is a versatile and customizable way to connect data points. It allows you to define a custom SVG path element that determines the shape of the line connecting the points. With `<path>` type, you have full control over the appearance and style of the line, making it highly customizable.

```html
<chart-ease width="200" height="200">
  <data-set>
    <path data-drawn-as="edge" stroke="aqua" fill="none"></path>
  </data-set>
</chart-ease>
```

```javascript
const dataSet = document.querySelector("data-set");
dataSet.data = [6, 4, 0, 3, 5, 2, 7, 3];
```

<iframe src="/samples/path-types/path.html" style={{ width: '250px', height: '250px' }}></iframe>

In the example above, we've defined a custom SVG **path** using the data-drawn-as="edge" attribute. This creates a line connecting data points, providing a visually engaging way to represent the data.

## `<polyline>`

The `<polyline>` is another option for connecting data points. It creates a line composed of straight line segments that connect the points in the dataset. Like the `<path>`, `<polyline>` is highly customizable, allowing you to change styles and apply CSS animations.

```html
<chart-ease width="200" height="200">
  <data-set>
    <polyline data-drawn-as="edge" fill="none" stroke="aqua"></polyline>
  </data-set>
</chart-ease>
```

```javascript
const dataSet = document.querySelector("data-set");
dataSet.data = [6, 4, 0, 3, 5, 2, 7, 3];
```

<iframe src="/samples/path-types/polyline.html" style={{ width: '250px', height: '250px' }}></iframe>

In this example, we've used the **polyline** type to connect data points with straight line segments. You can adjust the stroke attribute and other styling properties to customize the appearance of the **polyline**.
