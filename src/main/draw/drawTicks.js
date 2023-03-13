import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawTicks(svg, positions, axesLines, ticks) {
  const g = createSVGElements("g");
  if (axesLines.left && ticks.length > 0) {
    ticks[0].forEach((tick) => {
      const tl = cloneSVGElement(axesLines.left);
      tl.setAttribute("x1", positions.left - 5);
      tl.setAttribute("x2", positions.left + 5);
      tl.setAttribute("y1", tick.position);
      tl.setAttribute("y2", tick.position);
      g.appendChild(tl);
    });
  }
  if (axesLines.top && ticks.length > 1) {
    ticks[1].forEach((tick) => {
      const tl = cloneSVGElement(axesLines.top);
      tl.setAttribute("x1", tick.position);
      tl.setAttribute("x2", tick.position);
      tl.setAttribute("y1", positions.top - 5);
      tl.setAttribute("y2", positions.top + 5);
      g.appendChild(tl);
    });
  }
  if (axesLines.bottom && ticks.length > 1) {
    ticks[1].forEach((tick) => {
      const tl = cloneSVGElement(axesLines.bottom);
      tl.setAttribute("x1", tick.position);
      tl.setAttribute("x2", tick.position);
      tl.setAttribute("y1", positions.bottom - 5);
      tl.setAttribute("y2", positions.bottom + 5);
      g.appendChild(tl);
    });
  }
  if (axesLines.right && ticks.length > 0) {
    ticks[0].forEach((tick) => {
      const tl = cloneSVGElement(axesLines.right);
      tl.setAttribute("x1", positions.right - 5);
      tl.setAttribute("x2", positions.right + 5);
      tl.setAttribute("y1", tick.position);
      tl.setAttribute("y2", tick.position);
      g.appendChild(tl);
    });
  }
  svg.appendChild(g);
}
