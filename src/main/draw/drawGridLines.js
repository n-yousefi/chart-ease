import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";

export default function drawGridLines(svg, gridLines, ticks) {
  const g = createSVGElements("g");
  const left = svg.parentElement.margin.left;
  const right = svg.parentElement.width - svg.parentElement.margin.right;
  const bottom = svg.parentElement.margin.bottom;
  const top = svg.parentElement.height - svg.parentElement.margin.top;
  if (gridLines.h && ticks.length > 0) {
    ticks[0].forEach((tick) => {
      const tl = cloneSVGElement(gridLines.h);
      tl.setAttribute("x1", left);
      tl.setAttribute("x2", right);
      tl.setAttribute("y1", tick.position);
      tl.setAttribute("y2", tick.position);
      g.appendChild(tl);
    });
  }
  if (gridLines.v && ticks.length > 1) {
    ticks[1].forEach((tick) => {
      const tl = cloneSVGElement(gridLines.v);
      tl.setAttribute("x1", tick.position);
      tl.setAttribute("x2", tick.position);
      tl.setAttribute("y1", top);
      tl.setAttribute("y2", bottom);
      g.appendChild(tl);
    });
  }
  svg.appendChild(g);
}
