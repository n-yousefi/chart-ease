import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawTicks(svg, axesLines, ticks) {
  const g = createSVGElements("g");
  const left = svg.parentElement.margin.left;
  const right = svg.parentElement.width - svg.parentElement.margin.right;
  const bottom = svg.parentElement.margin.bottom;
  const top = svg.parentElement.height - svg.parentElement.margin.top;
  if (axesLines.left && ticks.length > 0) {
    ticks[0].forEach((tick) => {
      const tl = cloneSVGElement(axesLines.left);
      tl.setAttribute("x1", left - 5);
      tl.setAttribute("x2", left + 5);
      tl.setAttribute("y1", tick.position);
      tl.setAttribute("y2", tick.position);
      g.appendChild(tl);
    });
  }
  if (axesLines.top && ticks.length > 1) {
    ticks[1].forEach((tick) => {
      const tl = cloneSVGElement(axesLines.top);
      tl.setAttribute("x1", tick.position);
      tl.setAttribute("x2", tick.position);
      tl.setAttribute("y1", top - 5);
      tl.setAttribute("y2", top + 5);
      g.appendChild(tl);
    });
  }
  if (axesLines.bottom && ticks.length > 1) {
    ticks[1].forEach((tick) => {
      const tl = cloneSVGElement(axesLines.bottom);
      tl.setAttribute("x1", tick.position);
      tl.setAttribute("x2", tick.position);
      tl.setAttribute("y1", bottom - 5);
      tl.setAttribute("y2", bottom + 5);
      g.appendChild(tl);
    });
  }
  if (axesLines.right && ticks.length > 0) {
    ticks[0].forEach((tick) => {
      const tl = cloneSVGElement(axesLines.right);
      tl.setAttribute("x1", right - 5);
      tl.setAttribute("x2", right + 5);
      tl.setAttribute("y1", tick.position);
      tl.setAttribute("y2", tick.position);
      g.appendChild(tl);
    });
  }
  svg.appendChild(g);
}
