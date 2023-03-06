import cloneSVGElement from "./cloneSVGElement";

export default function drawAxes(parent, axesTypes, axes) {
  const hAxis = axes[0];
  const vAxis = axes[1];
  if (axesTypes.left) {
    const axis = createAxis(parent, axesTypes.left);
    axis.setAttribute("x1", hAxis.lowerAxis);
    axis.setAttribute("x2", hAxis.lowerAxis);
    axis.setAttribute("y1", vAxis.lowerAxis);
    axis.setAttribute("y2", vAxis.upperAxis);
  }
  if (axesTypes.top) {
    const axis = createAxis(parent, axesTypes.top);
    axis.setAttribute("x1", hAxis.lowerAxis);
    axis.setAttribute("x2", hAxis.upperAxis);
    axis.setAttribute("y1", vAxis.upperAxis);
    axis.setAttribute("y2", vAxis.upperAxis);
  }
  if (axesTypes.bottom) {
    const axis = createAxis(parent, axesTypes.bottom);
    axis.setAttribute("x1", hAxis.lowerAxis);
    axis.setAttribute("x2", hAxis.upperAxis);
    axis.setAttribute("y1", vAxis.lowerAxis);
    axis.setAttribute("y2", vAxis.lowerAxis);
  }
  if (axesTypes.right) {
    const axis = createAxis(parent, axesTypes.right);
    axis.setAttribute("x1", hAxis.upperAxis);
    axis.setAttribute("x2", hAxis.upperAxis);
    axis.setAttribute("y1", vAxis.lowerAxis);
    axis.setAttribute("y2", vAxis.upperAxis);
  }
}

function createAxis(parent, axisType) {
  const axis = cloneSVGElement(axisType);
  parent.appendChild(axis);
  return axis;
}
