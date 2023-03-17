import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawAxes(svg, axes, axesLines) {
  const g = createSVGElements("g");
  if (axesLines.left) {
    const axis = createAxis(g, axesLines.left);
    axis.setAttribute("x1", axes[0].axis.start);
    axis.setAttribute("x2", axes[0].axis.start);
    axis.setAttribute("y1", axes[1].axis.start);
    axis.setAttribute("y2", axes[1].axis.stop);
  }
  if (axesLines.top) {
    const axis = createAxis(g, axesLines.top);
    axis.setAttribute("x1", axes[0].axis.start);
    axis.setAttribute("x2", axes[0].axis.stop);
    axis.setAttribute("y1", axes[1].axis.stop);
    axis.setAttribute("y2", axes[1].axis.stop);
  }
  if (axesLines.bottom) {
    const axis = createAxis(g, axesLines.bottom);
    axis.setAttribute("x1", axes[0].axis.start);
    axis.setAttribute("x2", axes[0].axis.stop);
    axis.setAttribute("y1", axes[1].axis.start);
    axis.setAttribute("y2", axes[1].axis.start);
  }
  if (axesLines.right) {
    const axis = createAxis(g, axesLines.right);
    axis.setAttribute("x1", axes[0].axis.stop);
    axis.setAttribute("x2", axes[0].axis.stop);
    axis.setAttribute("y1", axes[1].axis.start);
    axis.setAttribute("y2", axes[1].axis.stop);
  }
  svg.appendChild(g);
}

function createAxis(svg, axisType) {
  const axis = cloneSVGElement(axisType);
  svg.appendChild(axis);
  return axis;
}
