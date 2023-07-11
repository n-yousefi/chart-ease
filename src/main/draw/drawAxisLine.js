import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawAxisLine(axis) {
  const g = createSVGElements("g");
  if (!axis.line) return;
  const axisLine = cloneSVGElement(axis.line);
  if (axis.isVertical) {
    axisLine.setAttribute("x1", axis.position);
    axisLine.setAttribute("x2", axis.position);
    axisLine.setAttribute("y1", axis.start);
    axisLine.setAttribute("y2", axis.stop);
  } else {
    axisLine.setAttribute("x1", axis.start);
    axisLine.setAttribute("x2", axis.stop);
    axisLine.setAttribute("y1", axis.position);
    axisLine.setAttribute("y2", axis.position);
  }

  g.appendChild(axisLine);
  axis.parentElement.svg.appendChild(g);
}
