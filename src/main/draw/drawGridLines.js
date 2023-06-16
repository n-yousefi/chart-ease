import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawGridLines(axis) {
  const g = createSVGElements("g");
  if (axis.grid) {
    axis.ticks.forEach((tick) => {
      const tl = cloneSVGElement(axis.grid);
      if (axis.isVertical) {
        tl.setAttribute("x1", axis.start);
        tl.setAttribute("x2", axis.stop);
        tl.setAttribute("y1", tick.position);
        tl.setAttribute("y2", tick.position);
      } else {
        tl.setAttribute("x1", tick.position);
        tl.setAttribute("x2", tick.position);
        tl.setAttribute("y1", axis.start);
        tl.setAttribute("y2", axis.stop);
      }
      g.appendChild(tl);
    });
  }
  axis.parentElement.svg.appendChild(g);
}
