import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";
import { flip } from "./flip";

export default function drawDataSet(dataset, data, originalData) {
  const g = dataset.parentElement.querySelector('g[name="dataset"]');
  Array.prototype.slice.call(dataset.children).forEach((child) => {
    if (child.hasAttribute("path-type")) drawPath(g, child, data);
    else drawPoints(g, dataset, data, child, originalData);
  });
}

function drawPath(g, pathType, data) {
  if (!pathType) return;
  const path = cloneSVGElement(pathType);
  loadPathData(path, data);
  g.appendChild(path);
}

function loadPathData(path, data) {
  path.setAttribute(
    "d",
    data
      .map((point, index) => (index === 0 ? `M ${point.x} ${point.y}` : ` L ${point.x} ${point.y}`))
      .join(" ")
  );
  path.removeAttribute("is");
}

function drawPoints(g, dataset, data, child, originalData) {
  const element = createSVGElements("g");
  data.forEach((row, index) => {
    const ondraw = dataset["ondraw"];
    const shape = cloneSVGElement(child);
    if (!ondraw) setDefaultPosition(shape, row.x, row.y);
    else
      ondraw({
        shape,
        row,
        originalRow: originalData[index],
        index,
      });
    element.appendChild(shape);
    flip(g, shape);
  });
  g.appendChild(element);
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
