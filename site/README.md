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
