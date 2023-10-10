---
sidebar_label: "Multisets"
sidebar_position: 5
---

# Multisets

### Multiple Data Sets

Chart Ease allows you to create complex visualizations by using multiple data sets within a single chart. Each data set can represent different datasets, and you can customize them individually. To add multiple data sets to a chart, simply include multiple `<data-set>` elements within the `<chart-ease>` element.

```html
<chart-ease>
  <data-set>
    <!-- Data set 1 data goes here -->
  </data-set>
  <data-set>
    <!-- Data set 2 data goes here -->
  </data-set>
</chart-ease>
```

This code sets data for two data sets in the same chart.

## Example

```html
<chart-ease width="200" height="200">
  <data-set id="set1">
    <path data-drawn-as="edge" stroke="antiquewhite" fill="none"></path>
  </data-set>
  <data-set id="set2">
    <path data-drawn-as="edge" stroke="blue" fill="none"></path>
    <rect rx="0" ry="10" width="2" height="2" stroke="aqua" stroke-width="5" />
  </data-set>
  <data-set id="set3">
    <path data-drawn-as="edge" stroke-linecap="round" stroke="fuchsia" fill="none"></path>
    <circle r="5" fill="fuchsia" fill-opacity=".3" stroke-width="5"></circle>
  </data-set>
</chart-ease>
```

```html
<script>
  document.getElementById("set1").data = [6, 4, 0, 3, 5, 2, 7, 3];
  document.getElementById("set2").data = [2, 5, 3, 1, 0, 3, 9, 12];
  document.getElementById("set3").data = [1, 2, 3, 7, 6, 5, 2, 1];
</script>
```

<iframe src="/chart-ease/samples/multi.html" style={{ width: '250px', height: '250px' }}></iframe>
