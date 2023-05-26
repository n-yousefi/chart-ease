import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawTicks(svg, axes) {
  const g = createSVGElements("g");
  if (axes.h && axes.h.ticks?.length > 1) {
    axes.h.ticks.forEach((tick) => {
      const tl = cloneSVGElement(axes.h.type);
      tl.setAttribute("x1", tick.position);
      tl.setAttribute("x2", tick.position);
      tl.setAttribute("y1", axes.h.y - 5);
      tl.setAttribute("y2", axes.h.y + 5);
      g.appendChild(tl);
    });
  }
  if (axes.v && axes.v.ticks?.length > 1) {
    axes.v.ticks.forEach((tick) => {
      const tl = cloneSVGElement(axes.v.type);
      tl.setAttribute("x1", axes.v.x - 5);
      tl.setAttribute("x2", axes.v.x + 5);
      tl.setAttribute("y1", tick.position);
      tl.setAttribute("y2", tick.position);
      g.appendChild(tl);
    });
  }
  svg.appendChild(g);
}
