# `<chart-ease>`

`chart-ease` is a customizable and high-performance web component that allows you quickly draw static charts. Due to its focus on speed, it does not support updating data points once the chart has been rendered.

It is highly customizable and supports the creation of many chart types, It normalizes chart data from any range to a specified width/height.

## Installing

Using npm:

[![npm](https://img.shields.io/badge/npm-chart--ease-brightgreen)](https://www.npmjs.com/package/chart-ease/)

```bash
$ npm install chart-ease
```

Then import it:

```html
<script src="./node_modules/chart-ease/dist/chart-ease.js" defer></script>
```

## Usage

### Path type

To draw a path, you can define a `path` element inside a `data-set` element, with `is="path-type"` and style it:

```html
<path is="path-type" stroke="aqua" fill="none"></path>
```

The following sample demonstrates a basic usage of chart-ease. It creates a chart with a path connecting the data points.

```html
<chart-ease width="200" height="200">
  <data-set>
    <path is="path-type" stroke="aqua" fill="none"></path>
  </data-set>
</chart-ease>

<script>
  window.onload = function () {
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
  };
</script>
```

### Basic point types

You can add any types of SVG elements or combination of them as point types. Basic elements adjusted by default and you only need to put them inside the same `data-set`.
`chart-ease` will draw it at the corresponding position of each points.

#### <circle>

```html
<chart-ease width="200" height="200">
  <data-set>
    <path is="path-type" stroke="aqua" fill="none"></path>
    <circle r="5" fill="blue"></circle>
  </data-set>
</chart-ease>
```

- [Check live demo hear](https://htmlpreview.github.io/?https://github.com/n-yousefi/chart-ease/blob/main/samples/pathTypes/simplePath.html)

#### <rect>

```html
<chart-ease width="200" height="200">
  <data-set>
    <path is="path-type" stroke="aqua" fill="none"></path>
    <rect rx="0" ry="10" width="10" height="10" stroke="aqua" />
  </data-set>
</chart-ease>
```

- [Check live demo hear](https://htmlpreview.github.io/?https://github.com/n-yousefi/chart-ease/blob/main/samples/pathTypes/rect.html)

#### <ellipse>

```html
<chart-ease width="200" height="200">
  <data-set>
    <path is="path-type" stroke="aqua" fill="none"></path>
    <ellipse rx="5" ry="10" fill="#F00" opacity="0.7" />
  </data-set>
</chart-ease>
```

## Adjust point types

For complex point types you may need to adjust the position, styles, animations and etc. Using the `draw` event you
can access to the point and draw it yourself. in `ondraw` event handler you can create diffrent type of charts and
customize everythings.

### ondraw

`chart-ease` fires an event named `draw` for each point type elements and pass an object containing the following items to the handler:

- shape: the point element that can be every svg element types.
- originalRow: it's equal to correspondig row of data array.
- row: normalized row of data array that computed based on defined or default axes.
- index: index of the row inside data array

#### samples 1: Value labels

Drawing the value upon each points using `<text>` and customize it based on index.

```html
<chart-ease id="textType" width="200" height="200">
  <data-set>
    <path is="path-type" stroke="aqua" stroke-width="2.5" fill="none"></path>
    <text x="0" y="15" fill="black" font-size="10px"></text>
  </data-set>
</chart-ease>
<script>
  window.onload = function () {
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
  };
</script>
```

#### sample 2: Custom path

```html
<chart-ease id="pathType" width="200" height="200">
  <data-set>
    <path is="path-type" stroke="aqua" stroke-width="2.5" fill="none"></path>
    <path fill="none" stroke="blue" stroke-width="2" />
  </data-set>
</chart-ease>
<script>
  window.onload = function () {
    const pathType = document.querySelector("#pathType");
    pathType.ondraw = ({ shape, row, index }) => {
      const { x, y } = row;
      shape.setAttribute(
        "d",
        `M${x - 4},${y - 4} V${y + 4} H${x + 4} V${y - 4} H${x - 4}`
      );
      if (index === 0) shape.setAttribute("opacity", 0.1);
    };
    pathType.data = data;
  };
</script>
```

#### sample 3: Bar chart

You can create a bar chart using `<chart-ease>`.

```html
<chart-ease id="bar1">
  <data-set>
    <g>
      <rect for="Silver" fill="red"></rect>
      <rect for="Gold" fill="blue"></rect>
      <rect for="Platinum" fill="green"></rect>
    </g>
  </data-set>
</chart-ease>
<script>
  window.onload = function () {
    const data = [
      { x: 1, Silver: 2, Gold: 5, Platinum: 5 },
      { x: 2, Silver: 5, Gold: 7, Platinum: 6 },
      { x: 3, Silver: 9, Gold: 3, Platinum: 8 },
      { x: 4, Silver: 2, Gold: 7, Platinum: 0 },
      { x: 5, Silver: 9, Gold: 2, Platinum: 2 },
      { x: 6, Silver: 2, Gold: 9, Platinum: 3 },
      { x: 7, Silver: 9, Gold: 1, Platinum: 4 },
      { x: 8, Silver: 1, Gold: 3, Platinum: 2 },
    ];
    const bar1 = document.querySelector("#bar1");
    bar1.ondraw = ({ shape, row }) => {
      const setBar = (bar, x, y) => {
        bar.setAttribute("width", 10);
        bar.setAttribute("height", y);
        bar.setAttribute("x", x);
        bar.setAttribute("y", 200 - y);
      };
      Array.from(shape.children).forEach((bar) => {
        setBar(bar, row.x, row[bar.getAttribute("for")]);
      });
    };
    bar1.axes = [
      {
        cols: ["x"],
        lowerBound: 10,
        upperBound: 190,
        length: 200,
      },
      {
        cols: ["Silver", "Gold", "Platinum"],
        lowerBound: 10,
        upperBound: 190,
        length: 200,
      },
    ];
    bar1.data = data;
  };
</script>
```
