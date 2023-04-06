import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawAxes(svg, axes) {
  const g = createSVGElements("g");
  if (axes.v && axes.v.type) {
    const axis = cloneSVGElement(axes.v.type);
    axis.setAttribute("x1", axes.v.x);
    axis.setAttribute("x2", axes.v.x);
    axis.setAttribute("y1", axes.v.y1);
    axis.setAttribute("y2", axes.v.y2);
    g.appendChild(axis);
  }

  if (axes.h && axes.h.type) {
    const axis = cloneSVGElement(axes.h.type);
    axis.setAttribute("x1", axes.h.x1);
    axis.setAttribute("x2", axes.h.x2);
    axis.setAttribute("y1", axes.h.y);
    axis.setAttribute("y2", axes.h.y);
    g.appendChild(axis);
  }
  svg.appendChild(g);
}
