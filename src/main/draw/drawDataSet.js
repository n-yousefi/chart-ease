import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";
import drawPath from "./drawPath";
import { flip } from "./flip";

export default function drawDataSet(dataset) {
  let children = dataset.children;
  if (children.length == 1 && children[0].nodeName === "svg") children = children[0].children;
  Array.prototype.slice.call(children).forEach((element) => {
    if (element.hasAttribute("data-drawn-as") && element.getAttribute("data-drawn-as") === "edge")
      drawPath(element, dataset);
    else drawPoints(dataset, element);
  });
}

function drawPoints(dataset, element) {
  const pointGroup = createSVGElements("g");
  dataset.normalizedData.forEach((row, index) => {
    const ondraw = dataset["ondraw"];
    const shape = cloneSVGElement(element);
    if (!ondraw) setDefaultPosition(shape, row.x, row.y);
    else
      ondraw({
        shape,
        row,
        originalRow: dataset.originalData[index],
        index,
      });
    pointGroup.appendChild(shape);
    flip(pointGroup, shape);
  });
  dataset.g.appendChild(pointGroup);
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
