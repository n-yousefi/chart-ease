import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawAxes(svg, axesLines) {
  const g = createSVGElements("g");
  const left = svg.parentElement.margin.left;
  const right = svg.parentElement.width - svg.parentElement.margin.right;
  const bottom = svg.parentElement.margin.bottom;
  const top = svg.parentElement.height - svg.parentElement.margin.top;
  if (axesLines.left) {
    const axis = createAxis(g, axesLines.left);
    axis.setAttribute("x1", left);
    axis.setAttribute("x2", left);
    axis.setAttribute("y1", bottom);
    axis.setAttribute("y2", top);
  }
  if (axesLines.top) {
    const axis = createAxis(g, axesLines.top);
    axis.setAttribute("x1", left);
    axis.setAttribute("x2", right);
    axis.setAttribute("y1", top);
    axis.setAttribute("y2", top);
  }
  if (axesLines.bottom) {
    const axis = createAxis(g, axesLines.bottom);
    axis.setAttribute("x1", left);
    axis.setAttribute("x2", right);
    axis.setAttribute("y1", bottom);
    axis.setAttribute("y2", bottom);
  }
  if (axesLines.right) {
    const axis = createAxis(g, axesLines.right);
    axis.setAttribute("x1", right);
    axis.setAttribute("x2", right);
    axis.setAttribute("y1", bottom);
    axis.setAttribute("y2", top);
  }
  svg.appendChild(g);
}

function createAxis(svg, axisType) {
  const axis = cloneSVGElement(axisType);
  svg.appendChild(axis);
  return axis;
}
