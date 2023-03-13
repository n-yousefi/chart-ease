import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawGridLines(svg, positions, gridLines, ticks) {
  const g = createSVGElements("g");
  if (gridLines.h && ticks.length > 0) {
    ticks[0].forEach((tick) => {
      const tl = cloneSVGElement(gridLines.h);
      tl.setAttribute("x1", positions.left);
      tl.setAttribute("x2", positions.right);
      tl.setAttribute("y1", tick.position);
      tl.setAttribute("y2", tick.position);
      g.appendChild(tl);
    });
  }
  if (gridLines.v && ticks.length > 1) {
    ticks[1].forEach((tick) => {
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
