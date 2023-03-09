import cloneSVGElement from "./cloneSVGElement";

export default function drawAxes(svg, axesTypes) {
  const left = svg.parentElement.margin.left;
  const right = svg.parentElement.width - svg.parentElement.margin.right;
  const bottom = svg.parentElement.margin.bottom;
  const top = svg.parentElement.height - svg.parentElement.margin.top;
  if (axesTypes.left) {
    const axis = createAxis(svg, axesTypes.left);
    axis.setAttribute("x1", left);
    axis.setAttribute("x2", left);
    axis.setAttribute("y1", bottom);
    axis.setAttribute("y2", top);
  }
  if (axesTypes.top) {
    const axis = createAxis(svg, axesTypes.top);
    axis.setAttribute("x1", left);
    axis.setAttribute("x2", right);
    axis.setAttribute("y1", top);
    axis.setAttribute("y2", top);
  }
  if (axesTypes.bottom) {
    const axis = createAxis(svg, axesTypes.bottom);
    axis.setAttribute("x1", left);
    axis.setAttribute("x2", right);
    axis.setAttribute("y1", bottom);
    axis.setAttribute("y2", bottom);
  }
  if (axesTypes.right) {
    const axis = createAxis(svg, axesTypes.right);
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
