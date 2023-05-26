import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawGridLines(svg, axes) {
  const g = createSVGElements("g");
  if (axes.h && axes.h.ticks?.length > 1 && axes.h.grid) {
    axes.v.ticks.forEach((tick) => {
      const tl = cloneSVGElement(axes.h.grid);
      tl.setAttribute("x1", axes.h.x1);
      tl.setAttribute("x2", axes.h.x2);
      tl.setAttribute("y1", tick.position);
      tl.setAttribute("y2", tick.position);
      g.appendChild(tl);
    });
  }
  if (axes.v && axes.v.ticks?.length > 1 && axes.v.grid) {
    axes.h.ticks.forEach((tick) => {
      const tl = cloneSVGElement(axes.v.grid);
      tl.setAttribute("x1", tick.position);
      tl.setAttribute("x2", tick.position);
      tl.setAttribute("y1", axes.v.y1);
      tl.setAttribute("y2", axes.v.y2);
      g.appendChild(tl);
    });
  }
  svg.appendChild(g);
}
