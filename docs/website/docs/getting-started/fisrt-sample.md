---
sidebar_label: "Getting Started"
sidebar_position: 1
---

# Getting Started

### Create your very first chart

```html
<chart-ease width="200" height="200">
  <data-set>
    <path path-type stroke="aqua" fill="none"></path>
  </data-set>
</chart-ease>
<script>
  document.querySelector("data-set").data = [
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

<iframe src="/samples/path.html" style={{ width: '250px', height: '250px' }}></iframe>

## Data

To create a chart, you need to provide data to it. This is done using the data-set element. Every chart must have at least one data-set child element. However, you can use multiple data-set elements to draw multiple charts together.

Once you have configured the chart, you should set the data on the data-set element. After setting the data, any changes you make to the data will be reflected in the chart.

## Size

You can set the size of the chart using the width and height attributes on the chart-ease element. You can also set the margin using the margin attribute.

## Path

There is no default line path in `<chart-ease>`. Instead, you can define your own customized path to connect the points together. Simply add a `<path>` element inside the `<data-set>` element and set the is attribute to "path-type". This will draw the `path` element as your chart's path. You can further customize the path by setting attributes like stroke, stroke-width, and fill and etc.
