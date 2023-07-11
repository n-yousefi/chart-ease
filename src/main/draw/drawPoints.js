import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";
import { flip } from "./flip";

export default function drawPoints(svg, pointTypes, data, originalData, ondraw) {
  const g = createSVGElements("g");
  data.forEach((row, index) => {
    pointTypes.forEach((pointType) => {
      const shape = cloneSVGElement(pointType);
      if (!ondraw) setDefaultPosition(shape, row.x, row.y);
      else
        ondraw({
          shape,
          row,
          originalRow: originalData[index],
          index,
        });
      g.appendChild(shape);
      flip(svg, shape);
    });
  });
  svg.prepend(g);
}

function setDefaultPosition(shape, x, y) {
  switch (shape.nodeName) {
    case "rect":
      if (x > 0) {
        const width = Number(shape.getAttribute("width"));
        const adjustWidth = width > 0 ? x - width / 2 : x;
        shape.setAttribute("x", adjustWidth);
      }
      if (y > 0) {
        const height = Number(shape.getAttribute("height"));
        const adjustHeight = height > 0 ? y - height / 2 : x;
        shape.setAttribute("y", adjustHeight);
      }
      break;
    case "circle":
    case "ellipse":
      if (x > 0) shape.setAttribute("cx", x);
      if (y > 0) shape.setAttribute("cy", y);
    default:
      if (x > 0) shape.setAttribute("x", x);
      if (y > 0) shape.setAttribute("y", y);
      break;
  }
}
