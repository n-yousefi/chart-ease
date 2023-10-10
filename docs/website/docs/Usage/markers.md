---
sidebar_label: "Markers"
sidebar_position: 3
---

# Markers

Markers are visual elements that can be added to your chart to represent data points. Chart Ease provides flexibility in defining and customizing markers.

## Default Markers

Chart Ease supports default markers like circles, ellipses, and rectangles, which can be added directly within a `<data-set>` element.

### Circle

Use the `<circle>` element to create circular points.

```html
<chart-ease width="200" height="200">
  <data-set>
    <path data-drawn-as="edge" stroke="aqua" fill="none"></path>
    <circle r="5" fill="aliceblue" stroke="aqua"></circle>
  </data-set>
</chart-ease>
```

```javascript
document.querySelector("data-set").data = [6, 4, 0, 3, 5, 2, 7, 3];
```

<iframe src="/chart-ease/samples/markers/circle.html" style={{ width: '250px', height: '250px' }}></iframe>

### Rectangle

Use the **`<rect>`** element to create rectangular points.

```html
<chart-ease width="200" height="200">
  <data-set>
    <path data-drawn-as="edge" stroke="aqua" fill="none"></path>
    <rect rx="0" ry="10" width="10" height="10" stroke="aqua" fill="aliceblue" />
  </data-set>
</chart-ease>
```

```javascript
document.querySelector("data-set").data = [6, 4, 0, 3, 5, 2, 7, 3];
```

<iframe src="/chart-ease/samples/markers/rectangle.html" style={{ width: '250px', height: '250px' }}></iframe>

### Ellipse

Use the **`<ellipse>`** element to create elliptical points.

```html
<chart-ease width="200" height="200">
  <data-set>
    <path data-drawn-as="edge" stroke="aqua" fill="none"></path>
    <ellipse rx="10" ry="4" fill="aliceblue" stroke="aqua" />
  </data-set>
</chart-ease>
```

```javascript
document.querySelector("data-set").data = [6, 4, 0, 3, 5, 2, 7, 3];
```

<iframe src="/chart-ease/samples/markers/ellipse.html" style={{ width: '250px', height: '250px' }}></iframe>

## Using Multiple Markers

Chart Ease also allows you to use multiple markers simultaneously within the same `<data-set>`. This feature is particularly useful when you want to represent data points using different marker styles or shapes within the same chart.

:::tip
In Chart Ease, markers are not limited to being used with a specific path or polyline. You have the flexibility to use markers independently, even without defining a path. This feature allows you to highlight data points or add visual elements to your chart without connecting them with a line.
:::

Using markers without a path and incorporating multiple markers in your chart provides you with creative freedom and allows you to make your data visualizations more informative and visually appealing.

```html
<chart-ease width="200" height="200" margin="20">
  <data-set>
    <circle r="12" stroke="#c5d3e8" fill="none"></circle>
    <circle r="10" fill="#6b8fc9" stroke="none"></circle>
    <rect rx="0" ry="10" width="10" height="10" stroke="none" fill="white" />
  </data-set>
</chart-ease>
```

<iframe src="/chart-ease/samples/markers/no-path.html" style={{ width: '250px', height: '250px' }}></iframe>

:::info Complex Markers
To draw complex **markers**, you have the option to utilize the `draw` event for creating intricate markers. This provides you with full control over customizing the marker's shape, position, and styles. Further details on this functionality can be found in the [following section](draw).
:::
