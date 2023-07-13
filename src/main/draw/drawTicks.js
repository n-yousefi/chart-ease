import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawTicks(axis) {
  const g = createSVGElements("g");
  axis.ticks.forEach((tick) => {
    if (!axis.tick) return;
    const tl = cloneSVGElement(axis.tick);
    const xOffset = Number(tl.getAttribute("x-offset") || 0);
    const yOffset = Number(tl.getAttribute("y-offset") || 0);
    const height = Number(tl.getAttribute("height") || 0);
    const width = Number(tl.getAttribute("width") || 0);
    if (axis.isVertical) {
      tl.setAttribute("x", axis.position - xOffset);
      tl.setAttribute("y", tick.position - yOffset - height / 2);
    } else {
      tl.setAttribute("x", tick.position - xOffset - width / 2);
      tl.setAttribute("y", axis.position - yOffset);
    }
    g.appendChild(tl);
  });

  axis.parentElement.svg.appendChild(g);
}
