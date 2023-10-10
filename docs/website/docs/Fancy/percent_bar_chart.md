---
sidebar_label: "Percent Bar Chart"
sidebar_position: 2
---

# Percent Bar Chart

```html
<chart-ease width="500" height="400" margin="45">
  <data-set id="dsCountries">
    <rect name="shaddow" fill="#fafafa" rx="30" style="clip-path: inset(30px 0px 0px 0)"></rect>
    <rect fill="#1D46D6" rx="30" style="clip-path: inset(30px 0px 0px 0)"></rect>
    <text name="value" fill="white" font-size="20" font-family="tahoma"></text>
    <text name="labels" fill="#1D46D6" font-size="20" font-family="tahoma"></text>
  </data-set>
  <left-axis ticks="6" min="0" max="80"></left-axis>
</chart-ease>
```

```javascript
const data = [
  { x: 1, y: 30, label: "America", color: "#B5E792" },
  { x: 2, y: 50, label: "Australia", color: "#82D897" },
  { x: 3, y: 70, label: "Canada", color: "#6ED2C8" },
  { x: 4, y: 45, label: "Iran", color: "#A4D8E8" },
  { x: 5, y: 90, label: "Germany", color: "#79AEDB" },
];

dsCountries = document.getElementById("dsCountries");
const margin = 40;
const clipPath = 30;
// Note: barWidth = Round(ChartWidth/BarCount) * (Bar to Gap ratio)
const barWidth = Math.round(500 / data.length) * 0.6;
dsCountries.ondraw = ({ shape, row, originalRow }) => {
  switch (shape.tagName) {
    case "rect":
      shape.setAttribute("width", barWidth);
      shape.setAttribute("x", row.x - barWidth / 2);
      shape.setAttribute("y", margin - clipPath); // margin
      if (shape.getAttribute("name") == "shaddow") {
        shape.setAttribute("height", 400 - clipPath); // y - margin
      } else {
        shape.setAttribute("height", row.y - margin - clipPath); // y - margin
        shape.setAttribute("fill", originalRow.color);
      }
      break;
    case "text":
      if (shape.getAttribute("name") == "value") {
        shape.innerHTML = originalRow.y;
        shape.innerHTML += "%";
        shape.setAttribute("x", row.x - 20);
        shape.setAttribute("y", row.y - margin - clipPath - 30);
      } else {
        shape.innerHTML = originalRow.label;
        shape.setAttribute("x", row.x - originalRow.label.toString().length * 5);
        shape.setAttribute("y", margin / 2);
      }
      break;
  }
};
dsCountries.data = data;
```

<iframe src="/chart-ease/samples/fancy/sample3.html" style={{ width: '550px', height: '450px' }}></iframe>

You can use it with live data:

<iframe src="/chart-ease/samples/fancy/sample3-animated.html" style={{ width: '550px', height: '450px' }}></iframe>
