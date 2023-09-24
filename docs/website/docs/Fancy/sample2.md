---
sidebar_label: "Sample 2"
sidebar_position: 3
---

# Sample 2

```html
<chart-ease width="500" height="400" margin="25">
  <data-set id="RedChart">
    <path path-type stroke="#8F96AC" fill="none" stroke-width="15"></path>
    <circle fill="#FF6464" r="15"></circle>
  </data-set>
  <data-set id="GreenChart">
    <path path-type stroke="#AFB9D2" fill="none" stroke-width="15"></path>
    <circle fill="#C3E678" r="15"></circle>
  </data-set>
  <data-set id="barChart">
    <rect fill="#EFF2FA" width="15"></rect>
  </data-set>
  <left-axis ticks="10" min="0" max="8">
    <line axis-line stroke="#C7CFE2" stroke-width="14"></line>
    <rect axis-tick fill="#D7DEED" x-offset="25" width="30" height="15" rx="10" ry="10"></rect>
  </left-axis>
  <bottom-axis ticks="8" min="0" max="8">
    <line axis-line stroke="#C7CFE2" stroke-width="15"></line>
    <rect axis-tick fill="#D7DEED" y-offset="25" width="15" height="30" rx="10" ry="10"></rect>
  </bottom-axis>
</chart-ease>
```

```javascript
const data1 = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 4, y: 1 },
  { x: 6, y: 3 },
  { x: 7, y: 7 },
];
const data2 = [
  { x: 0, y: 5 },
  { x: 2, y: 4 },
  { x: 3, y: 5 },
  { x: 5, y: 2 },
  { x: 8, y: 1 },
];
//const RedChart = document.querySelector("#RedChart");
const margin = 25;
const barWidth = 15;
barChart.ondraw = ({ shape, row }) => {
  shape.setAttribute("width", barWidth);
  shape.setAttribute("x", row.x - barWidth / 2);

  shape.setAttribute("height", row.y - margin);
  shape.setAttribute("y", margin);
};
barChart.data = data1.concat(data2);

const ondraw = ({ shape, row, index }) => {
  if (index == 0) shape.setAttribute("fill", "none");
  shape.setAttribute("cx", row.x);
  shape.setAttribute("cy", row.y);
};
RedChart.ondraw = ondraw;
GreenChart.ondraw = ondraw;
RedChart.data = data1;
GreenChart.data = data2;
```

<iframe src="/samples/fancy/sample2.html" style={{ width: '550px', height: '450px' }}></iframe>
