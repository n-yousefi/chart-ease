---
sidebar_label: "Markers"
sidebar_position: 2
---

## Default markers

You can define any type of SVG element or combination of them as markers. Basic elements are adjusted by default, so you only need to put them inside the same data-set element. Chart-ease will draw them at the corresponding position of each point.

### Circle

Use the `<circle>` element to create circular points.

```html
<chart-ease width="200" height="200">
  <data-set>
    <path path-type stroke="aqua" fill="none"></path>
    <circle r="5" fill="aliceblue" stroke="aqua"></circle>
  </data-set>
</chart-ease>
<script>
  document.querySelector("chart-ease").data = [
    { x: 1, y: 6 },
    { x: 2, y: 4 },
    { x: 3, y: 0 },
    { x: 4, y: 3 },
    { x: 5, y: 5 },
    { x: 6, y: 2 },
    { x: 7, y: 7 },
    { x: 8, y: 3 },
  ];
</script>
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
<script>
  document.querySelector("chart-ease").data = [
    { x: 1, y: 6 },
    { x: 2, y: 4 },
    { x: 3, y: 0 },
    { x: 4, y: 3 },
    { x: 5, y: 5 },
    { x: 6, y: 2 },
    { x: 7, y: 7 },
    { x: 8, y: 3 },
  ];
</script>
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
<script>
  document.querySelector("chart-ease").data = [
    { x: 1, y: 6 },
    { x: 2, y: 4 },
    { x: 3, y: 0 },
    { x: 4, y: 3 },
    { x: 5, y: 5 },
    { x: 6, y: 2 },
    { x: 7, y: 7 },
    { x: 8, y: 3 },
  ];
</script>
```

<iframe src="/samples/markers/ellipse.html" style={{ width: '250px', height: '250px' }}></iframe>

## Complex markers

To create complex markers, you may need to adjust the position, styles, animations, and more. With the `draw` event, you can access each point and draw it yourself. In the ondraw event handler, you can create different types of charts and customize everything.

`<chart-ease>` fires a draw event for each marker and passes an object containing the following items to the event handler:

- shape: the point element, which can be any SVG element type.
- originalRow: the corresponding row of the data array.
- row: the normalized row of the data array that is computed based on defined or default axes.
- index: the index of the row inside the data array.

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
<script>
  const textType = document.querySelector("#textType");
  textType.ondraw = ({ shape, row, index, originalRow }) => {
    shape.setAttribute("x", row.x - originalRow.y.toString().length * 2.5);
    shape.setAttribute("y", row.y);
    shape.innerHTML = originalRow.y;
    if (index === 0) shape.setAttribute("opacity", 0.1);
    if (index === 1) shape.setAttribute("opacity", 0.5);
  };
  textType.data = [
    { x: 1, y: 0.6152156 },
    { x: 2, y: 0.6152154 },
    { x: 3, y: 0.615215 },
    { x: 4, y: 0.6152153 },
    { x: 5, y: 0.6152155 },
    { x: 6, y: 0.6152152 },
    { x: 7, y: 0.6152157 },
    { x: 8, y: 0.6152153 },
  ];
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
<script>
  const pathType = document.querySelector("#pathType");
  pathType.ondraw = ({ shape, row, index }) => {
    const { x, y } = row;
    shape.setAttribute("d", `M${x - 4},${y - 4} V${y + 4} H${x + 4} V${y - 4} H${x - 4}`);
    if (index === 0) shape.setAttribute("opacity", 0.1);
  };
  pathType.data = [
    { x: 1, y: 6 },
    { x: 2, y: 4 },
    { x: 3, y: 0 },
    { x: 4, y: 3 },
    { x: 5, y: 5 },
    { x: 6, y: 2 },
    { x: 7, y: 7 },
    { x: 8, y: 3 },
  ];
</script>
```

<iframe src="/samples/ondraw/custom-path.html" style={{ width: '250px', height: '250px' }}></iframe>
