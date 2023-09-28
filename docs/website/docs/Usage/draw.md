---
sidebar_label: "Draw Event"
sidebar_position: 4
---

# Draw Event

To create complex markers, you may need to adjust the position, styles, animations, and more. With the `draw` event, you can access each point and draw it yourself. In the ondraw event handler, you can create different types of charts and customize everything.

`<chart-ease>` fires a draw event for each marker and passes an object containing the following items to the event handler:

- **index**: the index of the row inside the data array.
- **shape**: the point element, which can be any SVG element type.
- **row**: the normalized row of the data array that is computed based on defined or default axes.
- **originalRow**: the corresponding row of the data array.

```html
<script>
  const dataSet = document.querySelector("data-set");

  dataSet.ondraw = ({ index, shape, row, originalRow }) => {
    // Customize marker drawing based on data
    // Example: Add text labels or unique markers
    // Modify shape attributes as needed
  };
</script>
```

See these example:

### Value labels

Drawing the value upon each points using `<text>` element and customize it based on index.

```html
<chart-ease width="200" height="200">
  <data-set>
    <path data-drawn-as="edge" stroke="aqua" stroke-width="2.5" fill="none"></path>
    <text x="0" y="15" fill="black" font-size="10px"></text>
  </data-set>
</chart-ease>
```

```javascript
const dataSet = document.querySelector("data-set");
dataSet.ondraw = ({ shape, row, index, originalRow }) => {
  // Position the <text> element over each point
  shape.setAttribute("x", row.x - originalRow.y.toString().length * 2.5);
  shape.setAttribute("y", row.y);
  // Assing the <text> element content from each point values
  shape.innerHTML = originalRow.y;
};
dataSet.data = [0.6152156, 0.6152154, 0.6152152, 0.6152153, 0.6152155, 0.6152152, 0.6152157, 0.6152153];
```

<iframe src="/samples/markers/labels.html" style={{ width: '250px', height: '250px' }}></iframe>

By using the ondraw event, you have complete control over how markers are drawn, opening up possibilities for highly customized and interactive charts.
