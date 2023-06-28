import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawTicks(axis) {
  const g = createSVGElements("g");
  axis.ticks.forEach((tick) => {
    if (!axis.type) return;
    const tl = cloneSVGElement(axis.type);
    if (axis.isVertical) {
      tl.setAttribute("x1", axis.position - 5);
      tl.setAttribute("x2", axis.position + 5);
      tl.setAttribute("y1", tick.position);
      tl.setAttribute("y2", tick.position);
    } else {
      tl.setAttribute("x1", tick.position);
      tl.setAttribute("x2", tick.position);
      tl.setAttribute("y1", axis.position - 5);
      tl.setAttribute("y2", axis.position + 5);
    }
    g.appendChild(tl);
  });

  axis.parentElement.svg.appendChild(g);
}
