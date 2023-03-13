import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawAxes(svg, positions, axesLines) {
  const g = createSVGElements("g");
  if (axesLines.left) {
    const axis = createAxis(g, axesLines.left);
    axis.setAttribute("x1", positions.left);
    axis.setAttribute("x2", positions.left);
    axis.setAttribute("y1", positions.bottom);
    axis.setAttribute("y2", positions.top);
  }
  if (axesLines.top) {
    const axis = createAxis(g, axesLines.top);
    axis.setAttribute("x1", positions.left);
    axis.setAttribute("x2", positions.right);
    axis.setAttribute("y1", positions.top);
    axis.setAttribute("y2", positions.top);
  }
  if (axesLines.bottom) {
    const axis = createAxis(g, axesLines.bottom);
    axis.setAttribute("x1", positions.left);
    axis.setAttribute("x2", positions.right);
    axis.setAttribute("y1", positions.bottom);
    axis.setAttribute("y2", positions.bottom);
  }
  if (axesLines.right) {
    const axis = createAxis(g, axesLines.right);
    axis.setAttribute("x1", positions.right);
    axis.setAttribute("x2", positions.right);
    axis.setAttribute("y1", positions.bottom);
    axis.setAttribute("y2", positions.top);
  }
  svg.appendChild(g);
}

function createAxis(svg, axisType) {
  const axis = cloneSVGElement(axisType);
  svg.appendChild(axis);
  return axis;
}
