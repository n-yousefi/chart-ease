---
sidebar_label: "Edges Types"
sidebar_position: 2
---

# Edges Types

In Chart Ease, you have the flexibility to connect data points using different edge types. These edge types determine how the points are connected and visualized on the chart. Currently, Chart Ease supports two primary edge types: "path" and "polyline."

## `data-drawn-as` attribute

Any element with the`data-drawn-as` attribute equal to **edge** attribute within a `<data-set>` will be used to connect the nodes.

:::note
All other children of a `<data-set>` will be used to draw the nodes.
:::

This flexibility allows you to create a wide range of custom chart designs and styles.

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

<iframe src="/samples/edge-types/path.html" style={{ width: '250px', height: '250px' }}></iframe>

In the example above, we've defined a custom SVG **path** using the `data-drawn-as` attribute equal to **edge**. This creates a line connecting data points, providing a visually engaging way to represent the data.

### Smooth Cubic Bezier Edges

In Chart Ease, you have precise control over the smoothness of edges in your custom charts. To achieve the desired level of edge smoothing, you can utilize the `data-smoothing` attribute, which accepts values ranging from 0 to 1. The higher the value, the more pronounced the curvature of the edges becomes.

```html
<path data-drawn-as="edge" data-smoothing="0.2"></path>
```

<iframe src="/samples/edge-types/path-smooth.html" style={{ width: '250px', height: '250px' }}></iframe>

By modifying the `data-smoothing` attribute with different values, you can fine-tune the appearance of your chart edges. Smaller values result in more angular edges, suitable for emphasizing precise data connections, while larger values create smoothly curved edges, enhancing the overall flow and aesthetics of your custom charts. This feature allows you to strike the perfect balance between aesthetics and data representation in your Chart Ease creations.

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

<iframe src="/samples/edge-types/polyline.html" style={{ width: '250px', height: '250px' }}></iframe>

In this example, we've used the **polyline** type to connect data points with straight line segments. You can adjust the stroke attribute and other styling properties to customize the appearance of the **polyline**.
