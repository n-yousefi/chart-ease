import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawTicks(axis) {
  const g = createSVGElements("g");
  axis.ticks.forEach((tick) => {
    if (!axis.type) return;
    const tl = cloneSVGElement(axis.type);
    const w = Number(axis.type.getAttribute("stroke-width")) || 5;
    if (axis.isVertical) {
      tl.setAttribute("x1", axis.position - w);
      tl.setAttribute("x2", axis.position + w);
      tl.setAttribute("y1", tick.position);
      tl.setAttribute("y2", tick.position);
    } else {
      tl.setAttribute("x1", tick.position);
      tl.setAttribute("x2", tick.position);
      tl.setAttribute("y1", axis.position - w);
      tl.setAttribute("y2", axis.position + w);
    }
    g.appendChild(tl);
  });

  axis.parentElement.svg.appendChild(g);
}
