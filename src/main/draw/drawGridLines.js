import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawGridLines(axis, group) {
  const g = createSVGElements("g");
  if (axis.grid) {
    axis.ticks.forEach((tick) => {
      if (!axis.grid) return;
      const tl = cloneSVGElement(axis.grid);
      if (axis.isVertical) {
        tl.setAttribute("x1", axis.gridStart);
        tl.setAttribute("x2", axis.gridStop);
        tl.setAttribute("y1", tick.position);
        tl.setAttribute("y2", tick.position);
      } else {
        tl.setAttribute("x1", tick.position);
        tl.setAttribute("x2", tick.position);
        tl.setAttribute("y1", axis.gridStart);
        tl.setAttribute("y2", axis.gridStop);
      }
      g.appendChild(tl);
    });
  }
  group.appendChild(g);
}
