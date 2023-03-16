import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawGridLines(svg, positions, gridLines, ticks) {
  const g = createSVGElements("g");
  const hAxisTicks = ticks[0];
  const vAxisTicks = ticks[1];
  if (gridLines.h && ticks.length > 0) {
    vAxisTicks.forEach((tick) => {
      const tl = cloneSVGElement(gridLines.h);
      tl.setAttribute("x1", positions.left);
      tl.setAttribute("x2", positions.right);
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
      tl.setAttribute("y1", positions.top);
      tl.setAttribute("y2", positions.bottom);
      g.appendChild(tl);
    });
  }
  svg.appendChild(g);
}
