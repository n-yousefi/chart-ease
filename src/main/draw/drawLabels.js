import cloneSVGElement from "./cloneSVGElement";
import createSVGElements from "./createSVGElements";
import { flip } from "./flip";

export default function drawLabels(svg, axes, axesLines, ticks, axesLabels) {
  const hAxisTicks = ticks[0];
  const vAxisTicks = ticks[1];
  const g = createSVGElements("g");
  svg.appendChild(g);
  if (axesLines.left && ticks.length > 0) {
    vAxisTicks.forEach((tick) => {
      const text = cloneSVGElement(axesLabels.left);
      text.innerHTML = tick.value;
      g.appendChild(text);
      const { width, height } = text.getBoundingClientRect();
      text.setAttribute("x", axes[0].axis.start - width - 5);
      text.setAttribute("y", tick.position - height / 3);
      flip(svg, text);
    });
  }
  if (axesLines.top && ticks.length > 1) {
    hAxisTicks.forEach((tick) => {
      const text = cloneSVGElement(axesLabels.top);
      text.innerHTML = tick.value;
      g.appendChild(text);
      const { width, height } = text.getBoundingClientRect();
      text.setAttribute("x", tick.position - width / 2);
      text.setAttribute("y", axes[1].axis.stop + height / 2);
      flip(svg, text);
    });
  }
  if (axesLines.bottom && ticks.length > 1) {
    hAxisTicks.forEach((tick) => {
      const text = cloneSVGElement(axesLabels.bottom);
      text.innerHTML = tick.value;
      g.appendChild(text);
      const { width, height } = text.getBoundingClientRect();
      text.setAttribute("x", tick.position - width / 2);
      text.setAttribute("y", axes[1].axis.start - height);
      flip(svg, text);
    });
  }
  if (axesLines.right && ticks.length > 0) {
    vAxisTicks.forEach((tick) => {
      const text = cloneSVGElement(axesLabels.right);
      text.innerHTML = tick.value;
      g.appendChild(text);
      const { width, height } = text.getBoundingClientRect();
      text.setAttribute("x", axes[0].axis.stop + width);
      text.setAttribute("y", tick.position - height / 3);
      flip(svg, text);
    });
  }
}