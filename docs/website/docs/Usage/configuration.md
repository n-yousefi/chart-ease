---
sidebar_label: "Configuration"
sidebar_position: 0
---

# `<chart-ease>`

To create a chart, you'll begin by adding the `<chart-ease>` element to your HTML file. The `<chart-ease>` element serves as the container for your chart. You can specify its attributes to customize the chart's appearance.

```html
<chart-ease width="400" height="300" margin="20">
  <!-- Your chart content will go here -->
</chart-ease>
```

Here are a few important attributes of `<chart-ease>`:

- **width** and **height**: These attributes define the fixed **width** and **height** of your chart in pixels.
- **margin**: The **margin** attribute sets the margin around your chart in pixels. It provides spacing between the chart and the surrounding elements.

:::note
`<chart-ease>` has an **axes** prop that you will learn more about that in [Data Types section](data_types) for more details.
:::

# Adding a Data Set

Every chart in Chart Ease must have at least one data set. A data set is a container for your data, and it defines how the data will be visualized on the chart.

```html
<chart-ease width="400" height="300">
  <data-set>
    <!-- Your data will go here -->
  </data-set>
</chart-ease>
```

# Preparing and Passing Data

Before you can create a chart, you need to prepare your data. The data you provide should be in a format that Chart Ease can understand. Depending on the type of chart you're creating, you may need different data structures.

For more information on how to prepare your data effectively, refer to the [Data Types section](data_types).

# Drawing Connectors and Markers

To connect the data points in your chart, you can add a `<path>` SVG element or a `<polyline>` element inside the `<data-set>`. These elements define the path that connects the data points.

Additionally, you can create markers for each data point by adding other SVG elements inside the `<data-set>`. This allows you to customize the appearance of individual data points on the chart.

For more details on drawing connectors and markers, refer to the [Path Types section](path_types) and for reading more about drawing markers, refer to the [Marker section](markers)

In the upcoming sections, we'll explore more advanced features of Chart Ease, such as customization options, interactivity, and additional chart elements. Let's continue building your chart and exploring the possibilities!
