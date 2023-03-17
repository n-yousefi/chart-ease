import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawGridLines(svg, axes, gridLines, ticks) {
  const g = createSVGElements("g");
  const hAxisTicks = ticks[0];
  const vAxisTicks = ticks[1];
  if (gridLines.h && ticks.length > 0) {
    vAxisTicks.forEach((tick) => {
      const tl = cloneSVGElement(gridLines.h);
      tl.setAttribute("x1", axes[0].axis.start);
      tl.setAttribute("x2", axes[0].axis.stop);
      tl.setAttribute("y1", tick.position);
      tl.setAttribute("y2", tick.position);
      g.appendChild(tl);
    });
  }
  if (gridLines.v && ticks.length > 1) {
    hAxisTicks.forEach((tick) => {
      const tl = cloneSVGElement(gridLines.v);
      tl.setAttribute("x1", tick.position);
      tl.setAttribute("x2", tick.position);
      tl.setAttribute("y1", axes[1].axis.stop);
      tl.setAttribute("y2", axes[1].axis.start);
      g.appendChild(tl);
    });
  }
  svg.appendChild(g);
}
