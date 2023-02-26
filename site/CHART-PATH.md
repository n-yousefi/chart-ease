---
layout: page
title: Path
permalink: /path/
---

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

- [Check live demo hear](https://htmlpreview.github.io/?https://github.com/n-yousefi/chart-ease/blob/main/samples/point-types/line-chart.html)
