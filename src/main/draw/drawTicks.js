import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawTicks(axis, group) {
  const g = createSVGElements("g");
  axis.ticks.forEach((tick) => {
    if (!axis.tick) return;
    const tl = cloneSVGElement(axis.tick);
    const height = Number(tl.getAttribute("height") || 0);
    const width = Number(tl.getAttribute("width") || 0);
    const offset = axis.line?.getAttribute("stroke-width") || 0;
    if (axis.isVertical) {
      tl.setAttribute("x", axis.position - offset);
      tl.setAttribute("y", tick.position - height / 2);
    } else {
      tl.setAttribute("x", tick.position - width / 2);
      tl.setAttribute("y", axis.position - offset);
    }
    g.appendChild(tl);
  });

  group.appendChild(g);
}
