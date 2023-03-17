import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawTicks(svg, axes, axesLines, ticks) {
  const g = createSVGElements("g");
  const hAxisTicks = ticks[0];
  const vAxisTicks = ticks[1];
  if (axesLines.left && ticks.length > 0) {
    vAxisTicks.forEach((tick) => {
      const tl = cloneSVGElement(axesLines.left);
      tl.setAttribute("x1", axes[0].axis.start - 5);
      tl.setAttribute("x2", axes[0].axis.start + 5);
      tl.setAttribute("y1", tick.position);
      tl.setAttribute("y2", tick.position);
      g.appendChild(tl);
    });
  }
  if (axesLines.top && ticks.length > 1) {
    hAxisTicks.forEach((tick) => {
      const tl = cloneSVGElement(axesLines.top);
      tl.setAttribute("x1", tick.position);
      tl.setAttribute("x2", tick.position);
      tl.setAttribute("y1", axes[1].axis.stop - 5);
      tl.setAttribute("y2", axes[1].axis.stop + 5);
      g.appendChild(tl);
    });
  }
  if (axesLines.bottom && ticks.length > 1) {
    hAxisTicks.forEach((tick) => {
      const tl = cloneSVGElement(axesLines.bottom);
      tl.setAttribute("x1", tick.position);
      tl.setAttribute("x2", tick.position);
      tl.setAttribute("y1", axes[1].axis.start - 5);
      tl.setAttribute("y2", axes[1].axis.start + 5);
      g.appendChild(tl);
    });
  }
  if (axesLines.right && ticks.length > 0) {
    vAxisTicks.forEach((tick) => {
      const tl = cloneSVGElement(axesLines.right);
      tl.setAttribute("x1", axes[0].axis.stop - 5);
      tl.setAttribute("x2", axes[0].axis.stop + 5);
      tl.setAttribute("y1", tick.position);
      tl.setAttribute("y2", tick.position);
      g.appendChild(tl);
    });
  }
  svg.appendChild(g);
}
