import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawGridLines(axis) {
  const g = createSVGElements("g");
  if (axis.grid) {
    axis.ticks.forEach((tick) => {
      const tl = cloneSVGElement(axis.grid);
      if (axis.isVertical) {
        tl.setAttribute("x1", tick.position);
        tl.setAttribute("x2", tick.position);
        tl.setAttribute("y1", axis.y1);
        tl.setAttribute("y2", axis.y2);
      } else {
        tl.setAttribute("x1", axis.x1);
        tl.setAttribute("x2", axis.x2);
        tl.setAttribute("y1", tick.position);
        tl.setAttribute("y2", tick.position);
      }
      g.appendChild(tl);
    });
  }
  axis.parentElement.svg.appendChild(g);
}
