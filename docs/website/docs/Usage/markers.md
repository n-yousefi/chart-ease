---
sidebar_label: "Markers"
sidebar_position: 3
---

# Markers

Markers are visual elements that can be added to your chart to represent data points. Chart Ease provides flexibility in defining and customizing markers.

## Default Markers

Chart Ease supports default markers like circles, ellipses, and rectangles, which can be added directly within a `<data-set>` element.

:::tip
To draw complex **markers**, you have the option to utilize the `draw` event for creating intricate markers. This provides you with full control over customizing the marker's shape, position, and styles. Further details on this functionality can be found in the [following section](draw).
:::

### Circle

Use the `<circle>` element to create circular points.

```html
<chart-ease width="200" height="200">
  <data-set>
    <path path-type stroke="aqua" fill="none"></path>
    <circle r="5" fill="aliceblue" stroke="aqua"></circle>
  </data-set>
</chart-ease>
```

```javascript
document.querySelector("data-set").data = [6, 4, 0, 3, 5, 2, 7, 3];
```

<iframe src="/samples/markers/circle.html" style={{ width: '250px', height: '250px' }}></iframe>

### Rectangle

Use the **`<rect>`** element to create rectangular points.

```html
<chart-ease width="200" height="200">
  <data-set>
    <path path-type stroke="aqua" fill="none"></path>
    <rect rx="0" ry="10" width="10" height="10" stroke="aqua" fill="aliceblue" />
  </data-set>
</chart-ease>
```

```javascript
document.querySelector("data-set").data = [6, 4, 0, 3, 5, 2, 7, 3];
```

<iframe src="/samples/markers/rectangle.html" style={{ width: '250px', height: '250px' }}></iframe>

### Ellipse

Use the **`<ellipse>`** element to create elliptical points.

```html
<chart-ease width="200" height="200">
  <data-set>
    <path path-type stroke="aqua" fill="none"></path>
    <ellipse rx="10" ry="4" fill="aliceblue" stroke="aqua" />
  </data-set>
</chart-ease>
```

```javascript
document.querySelector("data-set").data = [6, 4, 0, 3, 5, 2, 7, 3];
```

<iframe src="/samples/markers/ellipse.html" style={{ width: '250px', height: '250px' }}></iframe>
