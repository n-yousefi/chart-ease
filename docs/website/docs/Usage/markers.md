---
sidebar_label: "Markers"
sidebar_position: 2
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
    <path path-type stroke="aqua" fill="none"></path>
    <circle r="5" fill="aliceblue" stroke="aqua"></circle>
  </data-set>
</chart-ease>
```

```javascript
dataSet.data = [6, 4, 0, 3, 5, 2, 7, 3];
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
dataSet.data = [6, 4, 0, 3, 5, 2, 7, 3];
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
dataSet.data = [6, 4, 0, 3, 5, 2, 7, 3];
```

<iframe src="/samples/markers/ellipse.html" style={{ width: '250px', height: '250px' }}></iframe>

## Complex markers

To create complex markers, you may need to adjust the position, styles, animations, and more. With the `draw` event, you can access each point and draw it yourself. In the ondraw event handler, you can create different types of charts and customize everything.

`<chart-ease>` fires a draw event for each marker and passes an object containing the following items to the event handler:

- shape: the point element, which can be any SVG element type.
- originalRow: the corresponding row of the data array.
- row: the normalized row of the data array that is computed based on defined or default axes.
- index: the index of the row inside the data array.

```html
<script>
  const chart = document.querySelector("chart-ease");

  chart.ondraw = ({ shape, row, index, originalRow }) => {
    // Customize marker drawing based on data
    // Example: Add text labels or unique markers
    // Modify shape attributes as needed
  };
</script>
```

See these examples:

### Samples 1: Value labels

Drawing the value upon each points using `<text>` element and customize it based on index.

```html
<chart-ease id="textType" width="200" height="200">
  <data-set>
    <path path-type stroke="aqua" stroke-width="2.5" fill="none"></path>
    <text x="0" y="15" fill="black" font-size="10px"></text>
  </data-set>
</chart-ease>
<script src="../../js/chart-ease.js"></script>
<script>
  const textType = document.querySelector("#textType");
  textType.ondraw = ({ shape, row, index, originalRow }) => {
    shape.setAttribute("x", row.x - originalRow.y.toString().length * 2.5);
    shape.setAttribute("y", row.y);
    shape.innerHTML = originalRow.y;
    if (index === 0) shape.setAttribute("opacity", 0.1);
    if (index === 1) shape.setAttribute("opacity", 0.5);
  };
  textType.data = [0.6152156, 0.6152154, 0.6152152, 0.6152153, 0.6152155, 0.6152152, 0.6152157, 0.6152153];
</script>
```

<iframe src="/samples/ondraw/labels.html" style={{ width: '250px', height: '250px' }}></iframe>

### Sample 2: Custom path

```html
<chart-ease id="pathType" width="200" height="200">
  <data-set>
    <path path-type stroke="aqua" stroke-width="2.5" fill="none"></path>
    <path fill="none" stroke="blue" stroke-width="2" />
  </data-set>
</chart-ease>
<script src="../../js/chart-ease.js"></script>
<script>
  const pathType = document.querySelector("#pathType");
  pathType.ondraw = ({ shape, row, index }) => {
    const { x, y } = row;
    shape.setAttribute("d", `M${x - 4},${y - 4} V${y + 4} H${x + 4} V${y - 4} H${x - 4}`);
    if (index === 0) shape.setAttribute("opacity", 0.1);
  };
  pathType.data = [6, 4, 0, 3, 5, 2, 7, 3];
</script>
```

<iframe src="/samples/ondraw/custom-path.html" style={{ width: '250px', height: '250px' }}></iframe>

By using the ondraw event, you have complete control over how markers are drawn, opening up possibilities for highly customized and interactive charts.
