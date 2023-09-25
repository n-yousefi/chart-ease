---
sidebar_label: "Axes"
sidebar_position: 6
---

# Axes

In Chart Ease, you can add axes to your charts to provide context and reference for your data. Axes are essential for labeling data points and understanding the scale of your chart. This page will guide you on how to use and customize axes effectively.

## Basic Usage of Axes

In Chart Ease, you can use axes lines, grid lines, and axes labels. There are four types of axes available:

- `left-axis`: A vertical axis on the left side of the chart.
- `right-axis`: A vertical axis on the right side of the chart.
- `top-axis`: A horizontal axis at the top of the chart.
- `bottom-axis`: A horizontal axis at the bottom of the chart.

:::caution
You can use one vertical axis and one horizontal axis at a time.
:::

To add axes to your chart, place them directly inside the `<chart-ease>` element:

```html
<chart-ease>
  <left-axis ticks="6" min="0" max="10" width="15"></left-axis>
  <bottom-axis ticks="6" min="0" max="8" height="15"></bottom-axis>
</chart-ease>
```

Here's a breakdown of the attributes you can use with axes:

- `ticks`: Determines the maximum number of ticks for drawing axis ticks, lines, and labels. Chart Ease will distribute ticks equally and may draw fewer ticks if it can't display the exact number.
- `min` and `max`: Specify the minimum and maximum values of the chart axis.
- `width` (for vertical axes) and `height` (for horizontal axes): Set the width or height of the axis line.

## Drawing Axis Lines

To draw the axis lines, you can place a `<line>` element inside the axis tags with the `axis-line` attribute. Here's an example:

```html
<left-axis ticks="6" min="0" max="10" width="15">
  <line axis-line stroke="blue"></line>
</left-axis>
```

In this example, we use a `<line>` element within the `<left-axis>` tag and set the `axis-line` attribute to draw the left axis line.

## Drawing Grid Lines

To draw grid lines along the axis, you can place a `<line>` element inside the axis tags with the `grid-line` attribute. Here's an example:

```html
<left-axis ticks="6" min="0" max="10" width="15">
  <line grid-line stroke="#c8c8c830"></line>
</left-axis>
```

In this example, we use a `<line>` element within the `<left-axis>` tag and set the `grid-line` attribute to draw the vertical grid lines.

## Adding Labels

To add labels to the axis, place a `<text>` element inside the axis tags. You can customize the appearance of labels using various SVG and CSS attributes, such as "fill" for text color, "font-size" for text size, and "font-family" for the font used. Here's an example:

```html
<left-axis ticks="6" min="0" max="10" width="15">
  <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
</left-axis>
```

In this example, we use a `<text>` element within the `<left-axis>` tag and set attributes like "fill" "font-size," and "font-family" to style the axis labels.

## Sample: Customizing Axes with Ticks and Styling

In this sample, we demonstrate how you can fully customize the appearance of axes in Chart Ease while using ticks to guide the placement of axis elements.

```html
<chart-ease width="200" height="200">
  <data-set>
    <path path-type stroke="aqua" fill="none"></path>
    <circle r="5" fill="aliceblue" stroke="aqua"></circle>
  </data-set>
  <left-axis ticks="3" min="0" max="10" width="15">
    <line axis-line stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </left-axis>
  <bottom-axis ticks="3" min="0" max="8" height="15">
    <line axis-line stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </bottom-axis>
</chart-ease>
<chart-ease width="200" height="200">
  <data-set>
    <path path-type stroke="aqua" fill="none"></path>
    <circle r="5" fill="aliceblue" stroke="aqua"></circle>
  </data-set>
  <left-axis ticks="6" min="0" max="10" width="15">
    <line axis-line stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </left-axis>
  <bottom-axis ticks="6" min="0" max="8" height="15">
    <line axis-line stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </bottom-axis>
</chart-ease>
<chart-ease width="200" height="200">
  <data-set>
    <path path-type stroke="aqua" fill="none"></path>
    <circle r="5" fill="aliceblue" stroke="aqua"></circle>
  </data-set>
  <left-axis ticks="10" min="0" max="10" width="15">
    <line axis-line stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </left-axis>
  <bottom-axis ticks="8" min="0" max="8" height="15">
    <line axis-line stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </bottom-axis>
</chart-ease>
```

In the above example, you can clearly see how the `ticks` attribute affects the chart axis.

<iframe src="/samples/axes/complete-sample.html" style={{ width: '700px', height: '250px' }}></iframe>

## Sample: Using Different Axis Positions

In this sample, we explore the flexibility of Chart Ease in terms of axis positioning. You can place axes in various positions to best represent your data and chart layout.

```html
<chart-ease width="200" height="200">
  <data-set>
    <path path-type stroke="aqua" fill="none"></path>
    <circle r="5" fill="aliceblue" stroke="aqua"></circle>
  </data-set>
  <left-axis ticks="6" min="0" max="10" width="15">
    <line axis-line stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </left-axis>
  <bottom-axis ticks="6" min="0" max="10" height="15">
    <line axis-line stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </bottom-axis>
</chart-ease>
<chart-ease width="200" height="200">
  <data-set>
    <path path-type stroke="aqua" fill="none"></path>
    <circle r="5" fill="aliceblue" stroke="aqua"></circle>
  </data-set>
  <right-axis ticks="6" min="0" max="10" width="15">
    <line axis-line stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </right-axis>
  <top-axis ticks="6" min="0" max="10" height="15">
    <line axis-line stroke="blue"></line>
    <line grid-line stroke="#c8c8c830"></line>
    <text fill="#c8c8c8" font-size="14" font-family="Tahoma"></text>
  </top-axis>
</chart-ease>
```

<iframe src="/samples/axes/axis-position.html" style={{ width: '500px', height: '250px' }}></iframe>

By combining these techniques, you can fully customize the appearance of axes in your Chart Ease charts.
