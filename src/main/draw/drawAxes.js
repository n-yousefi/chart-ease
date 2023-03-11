import cloneSVGElement from "./cloneSVGElement";

export default function drawAxes(svg, axesLines) {
  const left = svg.parentElement.margin.left;
  const right = svg.parentElement.width - svg.parentElement.margin.right;
  const bottom = svg.parentElement.margin.bottom;
  const top = svg.parentElement.height - svg.parentElement.margin.top;
  if (axesLines.left) {
    const axis = createAxis(svg, axesLines.left);
    axis.setAttribute("x1", left);
    axis.setAttribute("x2", left);
    axis.setAttribute("y1", bottom);
    axis.setAttribute("y2", top);
  }
  if (axesLines.top) {
    const axis = createAxis(svg, axesLines.top);
    axis.setAttribute("x1", left);
    axis.setAttribute("x2", right);
    axis.setAttribute("y1", top);
    axis.setAttribute("y2", top);
  }
  if (axesLines.bottom) {
    const axis = createAxis(svg, axesLines.bottom);
    axis.setAttribute("x1", left);
    axis.setAttribute("x2", right);
    axis.setAttribute("y1", bottom);
    axis.setAttribute("y2", bottom);
  }
  if (axesLines.right) {
    const axis = createAxis(svg, axesLines.right);
    axis.setAttribute("x1", right);
    axis.setAttribute("x2", right);
    axis.setAttribute("y1", bottom);
    axis.setAttribute("y2", top);
  }
}

function createAxis(svg, axisType) {
  const axis = cloneSVGElement(axisType);
  svg.appendChild(axis);
  return axis;
}
