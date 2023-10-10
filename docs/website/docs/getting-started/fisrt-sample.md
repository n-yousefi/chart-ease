---
sidebar_label: "Getting Started"
sidebar_position: 1
---

# Getting Started

### Create your very first chart

Welcome to Chart Ease! This section will guide you through the basics of creating your first chart and introduce you to the fundamental concepts of using this versatile library.

## Step 1: Create a Chart Container

First, you'll need a container in your HTML where the chart will be rendered. Create an HTML element with the `<chart-ease>` tag and set the **width** and **height** attributes to define the chart's dimensions:

```html
<chart-ease width="200" height="200"></chart-ease>
```

## Step 2: Define Data Set

To create a chart, you need to provide data to it. This is done using the `<data-set>` element. Every chart must have at least one data-set child element. However, you can use multiple `<data-set>` elements to draw multiple charts together. After setting the data, any changes you make to the data will be reflected in the chart.

```html
<chart-ease width="200" height="200">
  <data-set> </data-set>
</chart-ease>
```

## Step 3: Define a Path

There is no default line path in `<chart-ease>`. Instead, you can define your own customized path to connect the points together. Simply add a `<path>` element inside the `<data-set>` element and set the `data-drawn-as` attribute to **edge**. This will draw an `path` element as your chart's edges. You can further customize the path by setting attributes like stroke, stroke-width, and fill and etc.

```html
<chart-ease width="200" height="200">
  <data-set>
    <path data-drawn-as="edge" stroke="aqua" fill="none"></path>
  </data-set>
</chart-ease>
```

## Step 4: Set the Chart Data

Now that you've created a data set, you can set the data for your chart. You can do this using JavaScript.

```javascript
const dataSet = document.querySelector("data-set");
dataSet.data = [6, 4, 0, 3, 5, 2, 7, 3];
```

### Congratulations!

You've successfully created your first chart with Chart Ease.

<iframe src="/chart-ease/samples/edge-types/path.html" style={{ width: '250px', height: '250px' }}></iframe>

Now, you can explore further customization options, add markers, and design your charts to convey data effectively. In the following sections, we'll dive deeper into various aspects of using Chart Ease, including data sets, axes configuration, path customization, markers, and more.
