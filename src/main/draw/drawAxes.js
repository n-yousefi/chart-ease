import cloneSVGElement from "./cloneSVGElement";

export default function drawAxes(svg, axesLines, ticks) {
  const left = svg.parentElement.margin.left;
  const right = svg.parentElement.width - svg.parentElement.margin.right;
  const bottom = svg.parentElement.margin.bottom;
  const top = svg.parentElement.height - svg.parentElement.margin.top;
  if (axesLines.left) {
    const axis = createAxis(svg, axesLines.left);
    axis.setAttribute("x1", left);
    axis.setAttribute("x2", left);
    axis.setAttribute("y1", bottom);
    axis.setAttribute("y2", top);
    if (ticks.length > 0)
      ticks[0].forEach((tick) => {
        const tl = cloneSVGElement(axesLines.left);
        tl.setAttribute("x1", left - 5);
        tl.setAttribute("x2", right);
        tl.setAttribute("y1", tick.position);
        tl.setAttribute("y2", tick.position);
        svg.appendChild(tl);
      });
  }
  if (axesLines.top) {
    const axis = createAxis(svg, axesLines.top);
    axis.setAttribute("x1", left);
    axis.setAttribute("x2", right);
    axis.setAttribute("y1", top);
    axis.setAttribute("y2", top);
    if (ticks.length > 1)
      ticks[1].forEach((tick) => {
        const tl = cloneSVGElement(axesLines.top);
        tl.setAttribute("x1", tick.position);
        tl.setAttribute("x2", tick.position);
        tl.setAttribute("y1", top - 5);
        tl.setAttribute("y2", top + 5);
        svg.appendChild(tl);
      });
  }
  if (axesLines.bottom) {
    const axis = createAxis(svg, axesLines.bottom);
    axis.setAttribute("x1", left);
    axis.setAttribute("x2", right);
    axis.setAttribute("y1", bottom);
    axis.setAttribute("y2", bottom);
    if (ticks.length > 1)
      ticks[1].forEach((tick) => {
        const tl = cloneSVGElement(axesLines.bottom);
        tl.setAttribute("x1", tick.position);
        tl.setAttribute("x2", tick.position);
        tl.setAttribute("y1", bottom - 5);
        tl.setAttribute("y2", bottom + 5);
        svg.appendChild(tl);
      });
  }
  if (axesLines.right) {
    const axis = createAxis(svg, axesLines.right);
    axis.setAttribute("x1", right);
    axis.setAttribute("x2", right);
    axis.setAttribute("y1", bottom);
    axis.setAttribute("y2", top);
    if (ticks.length > 0)
      ticks[0].forEach((tick) => {
        const tl = cloneSVGElement(axesLines.right);
        tl.setAttribute("x1", right - 5);
        tl.setAttribute("x2", right + 5);
        tl.setAttribute("y1", tick.position);
        tl.setAttribute("y2", tick.position);
        svg.appendChild(tl);
      });
  }
}

function createAxis(svg, axisType) {
  const axis = cloneSVGElement(axisType);
  svg.appendChild(axis);
  return axis;
}
