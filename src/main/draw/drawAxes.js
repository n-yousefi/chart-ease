import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawAxes(svg, axes, axesLines) {
  const g = createSVGElements("g");
  const hStart = axes[0].axis.start;
  const vStart = axes[1].axis.start;
  const hStop = axes[0].axis.stop;
  const vStop = axes[1].axis.stop;
  if (axesLines.left) {
    const axis = createAxis(g, axesLines.left);
    axis.setAttribute("x1", hStart);
    axis.setAttribute("x2", hStart);
    axis.setAttribute("y1", vStart);
    axis.setAttribute("y2", vStop);
  }
  if (axesLines.right) {
    const axis = createAxis(g, axesLines.right);
    axis.setAttribute("x1", hStop);
    axis.setAttribute("x2", hStop);
    axis.setAttribute("y1", vStart);
    axis.setAttribute("y2", vStop);
  }
  if (axesLines.top) {
    const axis = createAxis(g, axesLines.top);
    axis.setAttribute("x1", hStart);
    axis.setAttribute("x2", hStop);
    axis.setAttribute("y1", vStop);
    axis.setAttribute("y2", vStop);
  }
  if (axesLines.bottom) {
    const axis = createAxis(g, axesLines.bottom);
    axis.setAttribute("x1", hStart);
    axis.setAttribute("x2", hStop);
    axis.setAttribute("y1", vStart);
    axis.setAttribute("y2", vStart);
  }
  svg.appendChild(g);
}

function createAxis(svg, axisType) {
  const axis = cloneSVGElement(axisType);
  svg.appendChild(axis);
  return axis;
}
